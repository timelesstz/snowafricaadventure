import { describe, it, expect, beforeEach } from "vitest";
import {
  __resetAuthRateLimit,
  AUTH_LIMITS,
  clearAuthFailures,
  getClientIp,
  isAuthThrottled,
  recordAuthFailure,
} from "@/lib/auth-rate-limit";
import { generateThemeCSS, DEFAULT_THEME } from "@/lib/theme";
import { isAllowedAssetUrl } from "@/lib/asset-url";
import { safeJsonLd } from "@/lib/safe-json-ld";

describe("auth rate limit", () => {
  beforeEach(() => __resetAuthRateLimit());

  it("allows attempts under the per-email limit and blocks at it", () => {
    for (let i = 0; i < AUTH_LIMITS.perEmail - 1; i++) {
      recordAuthFailure("login", "a@b.com", "1.1.1.1");
    }
    expect(isAuthThrottled("login", "a@b.com", "1.1.1.1")).toBe(false);
    recordAuthFailure("login", "A@B.com ", "1.1.1.1");
    expect(isAuthThrottled("login", "a@b.com", "9.9.9.9")).toBe(true);
    // other accounts from another IP are unaffected
    expect(isAuthThrottled("login", "c@d.com", "9.9.9.9")).toBe(false);
  });

  it("blocks an IP after the per-IP limit across many emails", () => {
    for (let i = 0; i < AUTH_LIMITS.perIp; i++) {
      recordAuthFailure("login", `u${i}@x.com`, "2.2.2.2");
    }
    expect(isAuthThrottled("login", "fresh@x.com", "2.2.2.2")).toBe(true);
    expect(isAuthThrottled("login", "fresh@x.com", "3.3.3.3")).toBe(false);
  });

  it("keeps scopes separate and clears the account counter on success", () => {
    for (let i = 0; i < AUTH_LIMITS.perEmail; i++) {
      recordAuthFailure("reset-pin", "a@b.com", "4.4.4.4");
    }
    expect(isAuthThrottled("login", "a@b.com", "5.5.5.5")).toBe(false);
    expect(isAuthThrottled("reset-pin", "a@b.com", "5.5.5.5")).toBe(true);
    clearAuthFailures("reset-pin", "a@b.com");
    expect(isAuthThrottled("reset-pin", "a@b.com", "5.5.5.5")).toBe(false);
  });

  it("reads the first x-forwarded-for address", () => {
    expect(getClientIp(new Headers({ "x-forwarded-for": "8.8.8.8, 10.0.0.1" }))).toBe("8.8.8.8");
    expect(getClientIp(new Headers())).toBe("unknown");
    expect(getClientIp(undefined)).toBe("unknown");
  });
});

describe("generateThemeCSS", () => {
  it("drops values that could break out of the style tag", () => {
    const css = generateThemeCSS({
      ...DEFAULT_THEME,
      primaryColor: "red}</style><script>alert(1)</script>",
      secondaryColor: "#000; background:url(x)",
    });
    expect(css).not.toContain("</style");
    expect(css).not.toContain("<script");
    expect(css).toContain(`--primary: ${DEFAULT_THEME.primaryColor};`);
    expect(css).toContain(`--secondary: ${DEFAULT_THEME.secondaryColor};`);
  });

  it("keeps valid values", () => {
    const css = generateThemeCSS({ ...DEFAULT_THEME, accentColor: "rgba(1, 2, 3, 0.5)" });
    expect(css).toContain("--accent: rgba(1, 2, 3, 0.5);");
  });
});

describe("isAllowedAssetUrl", () => {
  it("accepts CDN URLs, relative paths and empty string", () => {
    expect(isAllowedAssetUrl("https://cdn.snowafricaadventure.com/logo.png")).toBe(true);
    expect(isAllowedAssetUrl("/images/logo.svg")).toBe(true);
    expect(isAllowedAssetUrl("")).toBe(true);
  });

  it("rejects other hosts, protocol-relative and script URLs", () => {
    expect(isAllowedAssetUrl("https://evil.example/logo.png")).toBe(false);
    expect(isAllowedAssetUrl("https://cdn.snowafricaadventure.com.evil.example/x.png")).toBe(false);
    expect(isAllowedAssetUrl("//evil.example/x.png")).toBe(false);
    expect(isAllowedAssetUrl("javascript:alert(1)")).toBe(false);
    expect(isAllowedAssetUrl('/x.png" onerror="y')).toBe(false);
    expect(isAllowedAssetUrl(42)).toBe(false);
  });
});

describe("safeJsonLd", () => {
  it("escapes < so </script> cannot close the tag", () => {
    const out = safeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
