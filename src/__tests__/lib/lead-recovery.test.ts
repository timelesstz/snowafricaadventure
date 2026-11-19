import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    emailLog: { findMany: vi.fn() },
    inquiry: { findUnique: vi.fn(), count: vi.fn() },
    booking: { findUnique: vi.fn(), count: vi.fn() },
  },
}));
vi.mock("@/lib/email/index", () => ({
  sendAdminNotification: vi.fn(),
}));

import { prisma } from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/email/index";
import { retryFailedLeadEmails, countRecentSpamLeads } from "@/lib/email/lead-recovery";

const findLogs = vi.mocked(prisma.emailLog.findMany);
const findInquiry = vi.mocked(prisma.inquiry.findUnique);
const send = vi.mocked(sendAdminNotification);

const now = new Date("2026-11-19T03:00:00Z");
const meta = (leadId: string, extra: Record<string, unknown> = {}) => ({
  kind: "admin-lead",
  leadType: "inquiry",
  leadId,
  ...extra,
});
const log = (status: string, leadId: string, extra: Record<string, unknown> = {}) => ({
  status,
  error: status === "FAILED" ? "ETIMEDOUT" : null,
  metadata: meta(leadId, extra),
  createdAt: new Date("2026-11-18T10:00:00Z"),
});

describe("retryFailedLeadEmails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findInquiry.mockResolvedValue({
      id: "inq_a",
      fullName: "Maria Jensen",
      email: "maria@example.test",
      type: "safari",
      phone: null,
      tripType: null,
      numAdults: 2,
      numChildren: null,
      arrivalDate: null,
      additionalInfo: "Safari in July",
      nationality: null,
    } as never);
    send.mockResolvedValue({ success: true, id: "m1" });
  });

  it("resends a failed lead alert once, tagged as a cron retry", async () => {
    findLogs.mockResolvedValue([log("FAILED", "inq_a"), log("FAILED", "inq_a")] as never);
    const results = await retryFailedLeadEmails(now);

    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][2]).toEqual(meta("inq_a", { cronRetry: true }));
    expect(results).toEqual([expect.objectContaining({ leadId: "inq_a", name: "Maria Jensen", retry: "sent" })]);
  });

  it("is idempotent: a lead already retried by the cron is listed but not resent", async () => {
    findLogs.mockResolvedValue([log("FAILED", "inq_a"), log("FAILED", "inq_a", { cronRetry: true })] as never);
    const results = await retryFailedLeadEmails(now);

    expect(send).not.toHaveBeenCalled();
    expect(results).toEqual([expect.objectContaining({ leadId: "inq_a", retry: "already-retried" })]);
  });

  it("skips a lead whose alert was later sent (inline retry succeeded)", async () => {
    findLogs.mockResolvedValue([log("FAILED", "inq_a"), log("SENT", "inq_a")] as never);
    const results = await retryFailedLeadEmails(now);
    expect(send).not.toHaveBeenCalled();
    expect(results).toEqual([]);
  });

  it("only looks at admin lead alerts from the last 48 hours", async () => {
    findLogs.mockResolvedValue([] as never);
    await retryFailedLeadEmails(now);
    const where = findLogs.mock.calls[0][0]!.where as { createdAt: { gte: Date } };
    expect(where.createdAt.gte).toEqual(new Date("2026-11-17T03:00:00Z"));
    expect(where).toMatchObject({ metadata: { path: ["kind"], equals: "admin-lead" } });
  });
});

describe("countRecentSpamLeads", () => {
  it("adds spam inquiries and bot-flagged bookings from the last 7 days", async () => {
    vi.mocked(prisma.inquiry.count).mockResolvedValue(3 as never);
    vi.mocked(prisma.booking.count).mockResolvedValue(1 as never);
    expect(await countRecentSpamLeads(now)).toBe(4);
    expect(vi.mocked(prisma.inquiry.count).mock.calls[0][0]).toMatchObject({ where: { status: "spam" } });
  });
});
