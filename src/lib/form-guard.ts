/**
 * Form spam check: a signed, timestamped token each public form fetches when
 * it loads (GET /api/form-token/) and sends back with the submission.
 *
 * A script that posts straight to the API has no token; a bot that loads the
 * page and submits at once is faster than any person can fill a form; a
 * replayed token has been used before. Humans never trip these.
 *
 * Results split in two:
 *  - "hard" (invalid, too-fast, reused): filed as spam.
 *  - "soft" (missing, expired): could be a real visitor whose token request
 *    failed or whose tab sat open for days, so the lead is triaged like a
 *    tripped honeypot and kept when it looks human.
 */
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

/** Fastest plausible time from form load to submit. */
export const MIN_FILL_MS = 3_000;
/** Oldest token accepted. The client refreshes its token well before this. */
export const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000;

/** Written into a kept lead whose token was missing or expired. */
export const FORM_TOKEN_FLAG = "[Spam check token missing — verify]";

export type FormGuardResult = "ok" | "missing" | "expired" | "invalid" | "too-fast" | "reused";

export function isHardFail(result: FormGuardResult): boolean {
  return result === "invalid" || result === "too-fast" || result === "reused";
}

export function isSoftFail(result: FormGuardResult): boolean {
  return result === "missing" || result === "expired";
}

function getSecret(): string | null {
  return process.env.FORM_GUARD_SECRET || process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(`form-guard:${payload}`).digest("base64url");
}

export function createFormToken(now = Date.now()): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload = `${now}.${randomBytes(12).toString("base64url")}`;
  return `${payload}.${sign(payload, secret)}`;
}

// Used nonces, kept until their token would expire anyway. Per server
// instance, so replay protection is best-effort across instances.
const usedNonces = new Map<string, number>();

function pruneUsed(now: number) {
  for (const [nonce, expiresAt] of usedNonces) if (expiresAt <= now) usedNonces.delete(nonce);
}

export function checkFormToken(token: unknown, now = Date.now()): FormGuardResult {
  const secret = getSecret();
  // No secret configured (local dev without env): the check is off.
  if (!secret) return "ok";
  if (typeof token !== "string" || token.length === 0) return "missing";

  const parts = token.split(".");
  if (parts.length !== 3) return "invalid";
  const [issued, nonce, sig] = parts;
  const expected = Buffer.from(sign(`${issued}.${nonce}`, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";

  const issuedAt = Number(issued);
  if (!Number.isFinite(issuedAt)) return "invalid";
  const age = now - issuedAt;
  if (age > MAX_TOKEN_AGE_MS) return "expired";
  if (age < MIN_FILL_MS) return "too-fast";

  pruneUsed(now);
  if (usedNonces.has(nonce)) return "reused";
  return "ok";
}

/** Marks a token as used. Call only once the lead is saved, so a visitor who
 * fixes a validation error can resubmit with the same token. */
export function consumeFormToken(token: unknown): void {
  if (typeof token !== "string") return;
  const parts = token.split(".");
  if (parts.length !== 3) return;
  const issuedAt = Number(parts[0]);
  if (!Number.isFinite(issuedAt)) return;
  usedNonces.set(parts[1], issuedAt + MAX_TOKEN_AGE_MS);
}

/** Test helper. */
export function __resetFormGuard() {
  usedNonces.clear();
}
