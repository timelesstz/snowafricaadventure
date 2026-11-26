import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  checkFormToken,
  consumeFormToken,
  createFormToken,
  isHardFail,
  isSoftFail,
  MAX_TOKEN_AGE_MS,
  MIN_FILL_MS,
  __resetFormGuard,
} from "@/lib/form-guard";

describe("form-guard", () => {
  const now = 1_800_000_000_000;

  beforeEach(() => {
    process.env.FORM_GUARD_SECRET = "test-secret";
    __resetFormGuard();
  });
  afterEach(() => {
    delete process.env.FORM_GUARD_SECRET;
  });

  it("accepts a token sent after a human fill time", () => {
    const token = createFormToken(now - 20_000);
    expect(checkFormToken(token, now)).toBe("ok");
  });

  it("flags a token sent faster than a person can fill the form", () => {
    const token = createFormToken(now - (MIN_FILL_MS - 500));
    expect(checkFormToken(token, now)).toBe("too-fast");
  });

  it("flags a forged or tampered token", () => {
    const token = createFormToken(now - 20_000)!;
    const [, nonce, sig] = token.split(".");
    expect(checkFormToken(`${now - 60_000}.${nonce}.${sig}`, now)).toBe("invalid");
    expect(checkFormToken("abc.def.ghi", now)).toBe("invalid");
    expect(checkFormToken("garbage", now)).toBe("invalid");
  });

  it("flags a replayed token only after the lead was saved", () => {
    const token = createFormToken(now - 20_000);
    expect(checkFormToken(token, now)).toBe("ok");
    expect(checkFormToken(token, now)).toBe("ok"); // validation error, resent
    consumeFormToken(token);
    expect(checkFormToken(token, now)).toBe("reused");
  });

  it("reports missing and expired tokens as soft failures", () => {
    expect(checkFormToken(undefined, now)).toBe("missing");
    expect(checkFormToken(null, now)).toBe("missing");
    expect(checkFormToken(createFormToken(now - MAX_TOKEN_AGE_MS - 1000), now)).toBe("expired");
    expect(isSoftFail("missing") && isSoftFail("expired")).toBe(true);
    expect(isHardFail("invalid") && isHardFail("too-fast") && isHardFail("reused")).toBe(true);
    expect(isHardFail("missing") || isSoftFail("ok")).toBe(false);
  });

  it("is off when no secret is configured", () => {
    delete process.env.FORM_GUARD_SECRET;
    const nextAuth = process.env.NEXTAUTH_SECRET;
    const authSecret = process.env.AUTH_SECRET;
    delete process.env.NEXTAUTH_SECRET;
    delete process.env.AUTH_SECRET;
    try {
      expect(createFormToken(now)).toBeNull();
      expect(checkFormToken(undefined, now)).toBe("ok");
    } finally {
      if (nextAuth !== undefined) process.env.NEXTAUTH_SECRET = nextAuth;
      if (authSecret !== undefined) process.env.AUTH_SECRET = authSecret;
    }
  });
});
