/**
 * Failure-based throttling for authentication endpoints.
 *
 * In-memory (per server instance). There is no Redis or lockout table in this
 * project, so this is a best-effort brake on brute force: each warm serverless
 * instance enforces the limits independently. Limits:
 *   - 5 failed attempts per 15 minutes per account (email)
 *   - 20 failed attempts per 15 minutes per client IP
 */

const WINDOW_MS = 15 * 60 * 1000;
export const AUTH_LIMITS = {
  perEmail: 5,
  perIp: 20,
} as const;

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
const MAX_ENTRIES = 10_000;

function prune(now: number) {
  if (store.size < MAX_ENTRIES) return;
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) store.delete(key);
  }
  if (store.size >= MAX_ENTRIES) {
    // Drop the oldest half if still full
    const keys = Array.from(store.keys()).slice(0, Math.floor(store.size / 2));
    for (const k of keys) store.delete(k);
  }
}

function get(key: string, now: number): Entry | undefined {
  const entry = store.get(key);
  if (entry && now >= entry.resetAt) {
    store.delete(key);
    return undefined;
  }
  return entry;
}

function bump(key: string, now: number) {
  const entry = get(key, now);
  if (entry) {
    entry.count++;
  } else {
    prune(now);
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
  }
}

function normaliseEmail(email: string | null | undefined): string {
  return (email ?? "").trim().toLowerCase();
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(
  headers: Headers | { get(name: string): string | null } | undefined | null
): string {
  if (!headers) return "unknown";
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim() || "unknown";
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * True when either the account or the IP has used up its failure budget.
 * `scope` separates counters per flow (login, reset-pin, ...).
 */
export function isAuthThrottled(
  scope: string,
  email: string | null | undefined,
  ip: string
): boolean {
  const now = Date.now();
  const e = normaliseEmail(email);
  const emailEntry = e ? get(`${scope}:email:${e}`, now) : undefined;
  const ipEntry = get(`${scope}:ip:${ip}`, now);
  return (
    (emailEntry?.count ?? 0) >= AUTH_LIMITS.perEmail ||
    (ipEntry?.count ?? 0) >= AUTH_LIMITS.perIp
  );
}

/** Record one failed attempt against both the account and the IP. */
export function recordAuthFailure(
  scope: string,
  email: string | null | undefined,
  ip: string
): void {
  const now = Date.now();
  const e = normaliseEmail(email);
  if (e) bump(`${scope}:email:${e}`, now);
  bump(`${scope}:ip:${ip}`, now);
}

/** Clear the account counter after a successful attempt (IP counter is kept). */
export function clearAuthFailures(
  scope: string,
  email: string | null | undefined
): void {
  const e = normaliseEmail(email);
  if (e) store.delete(`${scope}:email:${e}`);
}

/** Test helper. */
export function __resetAuthRateLimit(): void {
  store.clear();
}
