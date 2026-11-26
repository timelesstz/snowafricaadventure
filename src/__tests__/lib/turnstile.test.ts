import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstile } from "@/lib/turnstile";

const fetchMock = vi.fn();
const reply = (body: unknown, ok = true) => fetchMock.mockResolvedValueOnce({ ok, status: ok ? 200 : 503, json: async () => body });

describe("verifyTurnstile", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("is unchecked when no secret is set", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstile("tok")).toBe("unchecked");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a missing token without calling Cloudflare", async () => {
    expect(await verifyTurnstile(undefined)).toBe("missing");
    expect(await verifyTurnstile("")).toBe("missing");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("passes the token, secret and visitor IP to siteverify", async () => {
    reply({ success: true });
    expect(await verifyTurnstile("tok", "1.2.3.4")).toBe("ok");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const body = init.body as URLSearchParams;
    expect(body.get("secret")).toBe("test-secret");
    expect(body.get("response")).toBe("tok");
    expect(body.get("remoteip")).toBe("1.2.3.4");
  });

  it("grades Cloudflare's answer", async () => {
    reply({ success: false, "error-codes": ["invalid-input-response"] });
    expect(await verifyTurnstile("tok")).toBe("failed");
    reply({ success: false, "error-codes": ["timeout-or-duplicate"] });
    expect(await verifyTurnstile("tok")).toBe("spent");
  });

  it("never blames the visitor for our misconfiguration or a Cloudflare outage", async () => {
    reply({ success: false, "error-codes": ["invalid-input-secret"] });
    expect(await verifyTurnstile("tok")).toBe("unchecked");
    reply({}, false);
    expect(await verifyTurnstile("tok")).toBe("unchecked");
    fetchMock.mockRejectedValueOnce(new Error("ETIMEDOUT"));
    expect(await verifyTurnstile("tok")).toBe("unchecked");
  });
});
