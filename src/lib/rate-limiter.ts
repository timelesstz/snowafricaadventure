/**
 * Edge-compatible in-memory rate limiter
 * Uses a simple sliding window counter per IP
 *
 * Note: On Vercel Edge, the Map is per-isolate (not global across regions).
 * This is acceptable as a first-line defense.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

let lastCleanup = 0;
const CLEANUP_INTERVAL = 60_000;
const MAX_ENTRIES = 10_000;

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const RATE_LIMITS = {
  /** Standard limit for normal visitors */
  normal: { windowMs: 60_000, maxRequests: 100 } as RateLimitConfig,
  /** Page loads by normal visitors in the middleware. Link prefetches are not
   * counted (see isPrefetchRequest), but client navigations still fetch each
   * page's data, so this sits well above what a fast reader can click. */
  pageViews: { windowMs: 60_000, maxRequests: 300 } as RateLimitConfig,
  /** Aggressive limit for no-UA or unknown bots */
  suspicious: { windowMs: 60_000, maxRequests: 20 } as RateLimitConfig,
  /** Form submission limit — 10 per 10 minutes per IP (generous enough for
   * groups behind a shared hotel/office NAT while still stopping floods) */
  formSubmission: { windowMs: 600_000, maxRequests: 10 } as RateLimitConfig,
};

/**
 * True for requests the browser or the Next.js router makes in the background
 * to preload a linked page. One scrolled homepage visit makes ~90 of these, so
 * counting them toward a visitor's page limit blocks real people.
 */
export function isPrefetchRequest(headers: Headers): boolean {
  if (headers.get("next-router-prefetch") === "1") return true;
  const purpose = `${headers.get("sec-purpose") ?? ""} ${headers.get("purpose") ?? ""}`;
  return /\bprefetch\b/i.test(purpose);
}

/**
 * Check if an IP should be rate limited.
 * Returns true if the request should be blocked.
 */
export function isRateLimited(ip: string, config: RateLimitConfig): boolean {
  const now = Date.now();

  if (now - lastCleanup > CLEANUP_INTERVAL) {
    cleanup(now);
    lastCleanup = now;
  }

  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + config.windowMs });
    return false;
  }

  entry.count++;
  return entry.count > config.maxRequests;
}

function cleanup(now: number): void {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size > MAX_ENTRIES) {
    const entries = Array.from(rateLimitStore.entries());
    entries.sort((a, b) => a[1].resetAt - b[1].resetAt);
    const toRemove = entries.slice(0, Math.floor(entries.length / 2));
    for (const [key] of toRemove) {
      rateLimitStore.delete(key);
    }
  }
}
