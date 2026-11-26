/**
 * Server-side Cloudflare Turnstile check for the public lead forms.
 * Off unless TURNSTILE_SECRET_KEY is set.
 *
 * Results follow the same rule as lib/form-guard.ts:
 *  - "failed": Cloudflare judged the token bad (forged, wrong site, failed
 *    challenge). Filed as spam.
 *  - "missing" / "spent": no token, or one already used or expired (a visitor
 *    retrying after an error can hit this). Triaged: kept when it looks human.
 *  - "ok" / "unchecked": passed, or the check is off or Cloudflare could not
 *    be reached. A Cloudflare outage must never turn real leads into spam.
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5_000;

export type TurnstileResult = "ok" | "unchecked" | "missing" | "spent" | "failed";

/** Written into a kept lead whose Turnstile check did not pass. */
export const TURNSTILE_FLAG = "[Turnstile check not passed — verify]";

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: unknown, remoteIp?: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unchecked";
  if (typeof token !== "string" || token.length === 0) return "missing";
  if (token.length > 2048) return "failed";

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[Turnstile] siteverify HTTP ${res.status}`);
      return "unchecked";
    }
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return "ok";
    const codes = data["error-codes"] ?? [];
    if (codes.includes("timeout-or-duplicate")) return "spent";
    // A bad secret is our own misconfiguration, not the visitor's fault
    if (codes.some((c) => c.includes("secret") || c === "internal-error")) {
      console.error(`[Turnstile] check skipped: ${codes.join(", ")}`);
      return "unchecked";
    }
    return "failed";
  } catch (error) {
    console.error("[Turnstile] siteverify unreachable:", error instanceof Error ? error.message : error);
    return "unchecked";
  }
}
