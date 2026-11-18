import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { emailLog: { count: vi.fn() } },
}));
vi.mock("@/lib/email", () => ({ sendEmail: vi.fn() }));

import { NextRequest } from "next/server";
import { POST } from "@/app/api/share/email/route";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const count = vi.mocked(prisma.emailLog.count);
const send = vi.mocked(sendEmail);

let ipCounter = 0;
function post(body: Record<string, unknown>) {
  // A fresh IP per request so the in-memory per-IP limiter never interferes.
  ipCounter += 1;
  return POST(
    new NextRequest("http://localhost:3000/api/share/email/", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${ipCounter}` },
      body: JSON.stringify(body),
    })
  );
}

const valid = {
  recipients: ["Friend@Example.com", "friend@example.com"],
  subject: "Join me on Kilimanjaro! 8 Days Lemosho Route - Jan 10 - 17, 2027",
  message: "Hi!\n\nPrice: $2,680 per person. Would you be interested?",
  departureId: "cmabc123",
};

describe("POST /api/share/email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    count.mockResolvedValue(0);
    send.mockResolvedValue({ success: true } as never);
  });

  it("refuses links in the message and subject with a readable reason", async () => {
    const res = await post({ ...valid, message: "Claim it at bit.ly/xyz" });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/leave links out of the message/);
    expect((await post({ ...valid, subject: "Visit scam.com" })).status).toBe(400);
    expect((await post({ ...valid, subject: "Line one\nBcc: x" })).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("stops at the email-log limits without sending", async () => {
    count.mockResolvedValueOnce(0).mockResolvedValueOnce(2); // recipient already got 2 today
    const res = await post(valid);
    expect(res.status).toBe(429);
    expect(send).not.toHaveBeenCalled();
  });

  it("sends once per unique recipient, tagged as a share, with the text escaped", async () => {
    const res = await post({ ...valid, message: "Hi <b>pal</b>" });
    expect(res.status).toBe(200);
    const call = send.mock.calls[0][0];
    expect(call.to).toEqual(["friend@example.com"]);
    expect(call.type).toBe("share");
    expect(call.html).toContain("Hi &lt;b&gt;pal&lt;/b&gt;");
  });
});
