import { describe, it, expect } from "vitest";
import { isPrefetchRequest, isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";

describe("isPrefetchRequest", () => {
  it("detects Next.js router link prefetches", () => {
    expect(isPrefetchRequest(new Headers({ "next-router-prefetch": "1", rsc: "1" }))).toBe(true);
  });

  it("detects browser prefetch and prerender hints", () => {
    expect(isPrefetchRequest(new Headers({ "sec-purpose": "prefetch" }))).toBe(true);
    expect(isPrefetchRequest(new Headers({ "sec-purpose": "prefetch;prerender" }))).toBe(true);
    expect(isPrefetchRequest(new Headers({ purpose: "prefetch" }))).toBe(true);
  });

  it("treats page loads and client navigations as real requests", () => {
    expect(isPrefetchRequest(new Headers())).toBe(false);
    expect(isPrefetchRequest(new Headers({ rsc: "1" }))).toBe(false);
    expect(isPrefetchRequest(new Headers({ "sec-purpose": "" }))).toBe(false);
  });
});

describe("RATE_LIMITS.pageViews", () => {
  it("lets a visitor load 300 pages a minute and blocks the next one", () => {
    const ip = `test-pageviews-${Date.now()}`;
    for (let i = 0; i < RATE_LIMITS.pageViews.maxRequests; i++) {
      expect(isRateLimited(ip, RATE_LIMITS.pageViews)).toBe(false);
    }
    expect(isRateLimited(ip, RATE_LIMITS.pageViews)).toBe(true);
  });

  it("stays stricter for unknown bots", () => {
    expect(RATE_LIMITS.suspicious.maxRequests).toBeLessThan(RATE_LIMITS.pageViews.maxRequests);
  });
});
