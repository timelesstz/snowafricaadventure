import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const afterCallbacks: Array<() => Promise<void>> = [];

vi.mock("@/lib/prisma", () => ({ prisma: { inquiry: { create: vi.fn() } } }));
vi.mock("next/server", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/server")>()),
  after: vi.fn((cb: () => Promise<void>) => {
    afterCallbacks.push(cb);
  }),
}));
vi.mock("@/lib/email/send", () => ({ sendInquiryReceivedEmails: vi.fn() }));
vi.mock("@/lib/notifications", () => ({
  InquiryNotifications: { newInquiry: vi.fn().mockResolvedValue({ success: true }) },
  LeadNotifications: { emailFailed: vi.fn().mockResolvedValue({ success: true }) },
}));
vi.mock("@/lib/visitor-tracking", () => ({ extractVisitorData: () => ({}) }));
vi.mock("@/lib/rate-limiter", () => ({ isRateLimited: () => false, RATE_LIMITS: { formSubmission: {} } }));

import { POST } from "@/app/api/inquiries/route";
import { prisma } from "@/lib/prisma";
import { sendInquiryReceivedEmails } from "@/lib/email/send";
import { InquiryNotifications, LeadNotifications } from "@/lib/notifications";
import { HONEYPOT_AUTOFILL_FLAG } from "@/lib/notifications/lead-safety";

const createInquiry = vi.mocked(prisma.inquiry.create);
const sendEmails = vi.mocked(sendInquiryReceivedEmails);

function request(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/inquiries/", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4" },
    body: JSON.stringify({
      fullName: "Maria Jensen",
      email: "maria@example.test",
      type: "safari",
      additionalInfo: "We would like a 6-day safari in July for two adults.",
      ...body,
    }),
  });
}

async function runAfter() {
  for (const cb of afterCallbacks.splice(0)) await cb();
}

describe("POST /api/inquiries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    afterCallbacks.length = 0;
    createInquiry.mockImplementation((async ({ data }: { data: Record<string, unknown> }) => ({
      id: "inq_1",
      ...data,
    })) as never);
  });

  it("creates the in-app notification first and alerts when the email throws", async () => {
    sendEmails.mockRejectedValue(new Error("SMTP connection failed: ETIMEDOUT"));
    const res = await POST(request({}));
    expect(res.status).toBe(200);
    await runAfter();

    expect(InquiryNotifications.newInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ inquiryId: "inq_1", fullName: "Maria Jensen" })
    );
    expect(LeadNotifications.emailFailed).toHaveBeenCalledWith({
      leadType: "inquiry",
      leadId: "inq_1",
      name: "Maria Jensen",
      error: "SMTP connection failed: ETIMEDOUT",
    });
    const newOrder = vi.mocked(InquiryNotifications.newInquiry).mock.invocationCallOrder[0];
    const sendOrder = sendEmails.mock.invocationCallOrder[0];
    expect(newOrder).toBeLessThan(sendOrder);
  });

  it("alerts when the admin email fails after its retry", async () => {
    sendEmails.mockResolvedValue({ customer: { success: true }, admin: { success: false, error: "550 rejected" } });
    await POST(request({}));
    await runAfter();
    expect(LeadNotifications.emailFailed).toHaveBeenCalledWith(
      expect.objectContaining({ leadId: "inq_1", error: "550 rejected" })
    );
  });

  it("does not raise the failure alert when the admin email is sent", async () => {
    sendEmails.mockResolvedValue({ customer: { success: true }, admin: { success: true } });
    await POST(request({}));
    await runAfter();
    expect(LeadNotifications.emailFailed).not.toHaveBeenCalled();
  });

  it("saves a human-looking honeypot lead as new with the verify flag and notifies", async () => {
    sendEmails.mockResolvedValue({ customer: { success: true }, admin: { success: true } });
    await POST(request({ website: "https://maria.example" }));

    const data = createInquiry.mock.calls[0][0].data as unknown as Record<string, string>;
    expect(data.status).toBe("new");
    expect(data.additionalInfo.startsWith(HONEYPOT_AUTOFILL_FLAG)).toBe(true);
    expect(data.additionalInfo).toContain("6-day safari");

    await runAfter();
    expect(InquiryNotifications.newInquiry).toHaveBeenCalledWith(
      expect.objectContaining({ verifyNote: HONEYPOT_AUTOFILL_FLAG })
    );
    // Customer sees their own words, not the internal flag
    expect(sendEmails.mock.calls[0][0].message).not.toContain(HONEYPOT_AUTOFILL_FLAG);
  });

  it("files an obvious pitch (URL + SEO) as spam without notifying", async () => {
    await POST(
      request({
        website: "x",
        fullName: "Digital Growth",
        additionalInfo: "We can boost your SEO ranking. See https://growth.example/offer",
      })
    );
    const data = createInquiry.mock.calls[0][0].data as unknown as Record<string, string>;
    expect(data.status).toBe("spam");
    expect(afterCallbacks).toHaveLength(0);
    expect(InquiryNotifications.newInquiry).not.toHaveBeenCalled();
  });
});
