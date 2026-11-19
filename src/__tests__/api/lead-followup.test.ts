import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    inquiry: { findMany: vi.fn() },
    booking: { findMany: vi.fn() },
    siteSetting: { findUnique: vi.fn() },
  },
}));
vi.mock("@/lib/email", () => ({ sendAdminNotificationWithRetry: vi.fn() }));
vi.mock("@/lib/notifications", () => ({
  SystemNotifications: { alert: vi.fn() },
  cleanupOldNotifications: vi.fn().mockResolvedValue({ deleted: 0 }),
}));
vi.mock("@/lib/email/lead-recovery", () => ({
  retryFailedLeadEmails: vi.fn(),
  countRecentSpamLeads: vi.fn(),
  FAILED_LEAD_WINDOW_HOURS: 48,
  SPAM_WINDOW_DAYS: 7,
}));

import { GET } from "@/app/api/cron/lead-followup/route";
import { prisma } from "@/lib/prisma";
import { sendAdminNotificationWithRetry } from "@/lib/email";
import { retryFailedLeadEmails, countRecentSpamLeads } from "@/lib/email/lead-recovery";

const send = vi.mocked(sendAdminNotificationWithRetry);

function request() {
  return new NextRequest("http://localhost:3000/api/cron/lead-followup/", {
    headers: { authorization: "Bearer test-secret" },
  });
}

describe("GET /api/cron/lead-followup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CRON_SECRET = "test-secret";
    vi.mocked(prisma.siteSetting.findUnique).mockResolvedValue(null as never);
    vi.mocked(prisma.inquiry.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.booking.findMany).mockResolvedValue([] as never);
    send.mockResolvedValue({ success: true });
  });

  it("sends the digest with the spam count and failed lead alerts even with no stale leads", async () => {
    vi.mocked(countRecentSpamLeads).mockResolvedValue(5);
    vi.mocked(retryFailedLeadEmails).mockResolvedValue([
      {
        leadType: "inquiry",
        leadId: "inq_a",
        name: "Maria Jensen",
        error: "ETIMEDOUT",
        failedAt: new Date(),
        retry: "sent",
      },
    ]);

    const res = await GET(request());
    const body = await res.json();

    expect(body).toMatchObject({ success: true, spamFiltered: 5, failedLeadEmails: 1, leadEmailsResent: 1 });
    expect(send).toHaveBeenCalledTimes(1);
    const html = send.mock.calls[0][1];
    expect(html).toContain("5 messages were filtered as spam");
    expect(html).toContain("review in admin");
    expect(html).toContain("Maria Jensen");
    expect(html).toContain("Resent now");
  });

  it("skips the digest when there is nothing to report", async () => {
    vi.mocked(countRecentSpamLeads).mockResolvedValue(0);
    vi.mocked(retryFailedLeadEmails).mockResolvedValue([]);
    const res = await GET(request());
    expect((await res.json()).spamFiltered).toBe(0);
    expect(send).not.toHaveBeenCalled();
  });
});
