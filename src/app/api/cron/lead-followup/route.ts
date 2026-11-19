import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { sendAdminNotificationWithRetry } from "@/lib/email";
import { SystemNotifications, cleanupOldNotifications } from "@/lib/notifications";
import { SITE_CONFIG } from "@/lib/constants";
import {
  retryFailedLeadEmails,
  countRecentSpamLeads,
  FAILED_LEAD_WINDOW_HOURS,
  SPAM_WINDOW_DAYS,
  type FailedLeadEmail,
} from "@/lib/email/lead-recovery";

// Verify cron secret
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === process.env.CRON_SECRET;
}

async function getNumericSetting(key: string, fallback: number): Promise<number> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  const parsed = Number(row.value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function ageLabel(from: Date, now: Date): string {
  const hours = Math.floor((now.getTime() - from.getTime()) / 3_600_000);
  if (hours < 48) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Thresholds configurable via SiteSetting (hours for inquiries, days for deposits)
  const [newInquiryHours, depositDays] = await Promise.all([
    getNumericSetting("lead_followup_new_hours", 24),
    getNumericSetting("lead_followup_deposit_days", 3),
  ]);

  const now = new Date();
  const inquiryCutoff = new Date(now.getTime() - newInquiryHours * 3_600_000);
  const depositCutoff = new Date(now.getTime() - depositDays * 86_400_000);

  try {
    const [staleInquiries, unpaidDeposits] = await Promise.all([
      // Inquiries nobody has responded to
      prisma.inquiry.findMany({
        where: {
          status: "new",
          createdAt: { lt: inquiryCutoff },
        },
        orderBy: { createdAt: "asc" },
        take: 25,
        select: {
          id: true,
          fullName: true,
          email: true,
          type: true,
          tripType: true,
          createdAt: true,
        },
      }),
      // Booking-form leads / confirmed bookings with no deposit for an
      // upcoming departure
      prisma.booking.findMany({
        where: {
          depositPaid: false,
          status: {
            in: [
              BookingStatus.INQUIRY,
              BookingStatus.PENDING,
              BookingStatus.CONFIRMED,
            ],
          },
          createdAt: { lt: depositCutoff },
          departure: { arrivalDate: { gte: now } },
        },
        orderBy: { createdAt: "asc" },
        take: 25,
        select: {
          id: true,
          leadName: true,
          leadEmail: true,
          status: true,
          totalPrice: true,
          createdAt: true,
          departure: {
            select: {
              arrivalDate: true,
              route: { select: { title: true } },
            },
          },
        },
      }),
    ]);

    // Admin lead alerts that failed recently get one resend; spam-filtered
    // leads are counted so nothing the filters caught is invisible. Both are
    // isolated so a failure here never blocks the digest itself.
    let failedLeadEmails: FailedLeadEmail[] = [];
    try {
      failedLeadEmails = await retryFailedLeadEmails(now);
    } catch (error) {
      console.error("[LeadFollowup] Failed-email retry errored:", error);
    }
    let spamCount = 0;
    try {
      spamCount = await countRecentSpamLeads(now);
    } catch (error) {
      console.error("[LeadFollowup] Spam count errored:", error);
    }

    // Housekeeping: prune read notifications older than 30 days (nothing else
    // schedules this cleanup)
    const cleanup = await cleanupOldNotifications(30);

    const retrySummary = {
      failedLeadEmails: failedLeadEmails.length,
      leadEmailsResent: failedLeadEmails.filter((f) => f.retry === "sent").length,
      spamFiltered: spamCount,
    };

    if (
      staleInquiries.length === 0 &&
      unpaidDeposits.length === 0 &&
      failedLeadEmails.length === 0 &&
      spamCount === 0
    ) {
      return NextResponse.json({
        success: true,
        staleInquiries: 0,
        unpaidDeposits: 0,
        ...retrySummary,
        notificationsCleaned: cleanup.deleted,
      });
    }

    const adminUrl = SITE_CONFIG.url;
    const inquiryRows = staleInquiries
      .map(
        (i) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(i.fullName)}<br/><span style="color:#64748b;font-size:12px;">${escapeHtml(i.email)}</span></td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(i.tripType || i.type)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#dc2626;font-weight:600;">${ageLabel(i.createdAt, now)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><a href="${adminUrl}/admin/inquiries/${i.id}" style="color:#d97706;">Reply</a></td>
          </tr>`
      )
      .join("");

    const depositRows = unpaidDeposits
      .map(
        (b) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(b.leadName)}<br/><span style="color:#64748b;font-size:12px;">${escapeHtml(b.leadEmail)}</span></td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(b.departure.route.title)}<br/><span style="color:#64748b;font-size:12px;">${b.departure.arrivalDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span></td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">$${Number(b.totalPrice).toLocaleString()}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#dc2626;font-weight:600;">${ageLabel(b.createdAt, now)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><a href="${adminUrl}/admin/bookings/${b.id}" style="color:#d97706;">Open</a></td>
          </tr>`
      )
      .join("");

    const retryLabel: Record<FailedLeadEmail["retry"], string> = {
      sent: "Resent now",
      failed: "Resend failed",
      "already-retried": "Already resent once",
      "lead-missing": "Lead not found",
    };
    const failedRows = failedLeadEmails
      .map(
        (f) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(f.name)}<br/><span style="color:#64748b;font-size:12px;">${f.leadType}</span></td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:12px;">${escapeHtml((f.error || "Unknown error").slice(0, 120))}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${retryLabel[f.retry]}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><a href="${adminUrl}/admin/${f.leadType === "inquiry" ? "inquiries" : "bookings"}/${f.leadId}" style="color:#d97706;">Open</a></td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
        <h2 style="color:#b45309;">Daily Lead Follow-up Digest</h2>
        <p>Leads that need attention as of ${now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}:</p>
        ${
          staleInquiries.length > 0
            ? `<h3 style="margin-bottom:4px;">Unanswered inquiries (&gt;${newInquiryHours}h): ${staleInquiries.length}</h3>
               <table style="border-collapse:collapse;width:100%;font-size:14px;">
                 <tr style="background:#f8fafc;text-align:left;"><th style="padding:8px 12px;">Lead</th><th style="padding:8px 12px;">Trip</th><th style="padding:8px 12px;">Age</th><th style="padding:8px 12px;"></th></tr>
                 ${inquiryRows}
               </table>`
            : ""
        }
        ${
          unpaidDeposits.length > 0
            ? `<h3 style="margin:20px 0 4px;">Bookings awaiting deposit (&gt;${depositDays}d): ${unpaidDeposits.length}</h3>
               <table style="border-collapse:collapse;width:100%;font-size:14px;">
                 <tr style="background:#f8fafc;text-align:left;"><th style="padding:8px 12px;">Lead</th><th style="padding:8px 12px;">Departure</th><th style="padding:8px 12px;">Value</th><th style="padding:8px 12px;">Age</th><th style="padding:8px 12px;"></th></tr>
                 ${depositRows}
               </table>`
            : ""
        }
        ${
          failedLeadEmails.length > 0
            ? `<h3 style="margin:20px 0 4px;color:#dc2626;">Lead alerts that failed to send (last ${FAILED_LEAD_WINDOW_HOURS}h): ${failedLeadEmails.length}</h3>
               <table style="border-collapse:collapse;width:100%;font-size:14px;">
                 <tr style="background:#f8fafc;text-align:left;"><th style="padding:8px 12px;">Lead</th><th style="padding:8px 12px;">Error</th><th style="padding:8px 12px;">Retry</th><th style="padding:8px 12px;"></th></tr>
                 ${failedRows}
               </table>`
            : ""
        }
        ${
          spamCount > 0
            ? `<p style="margin-top:20px;">${spamCount} ${spamCount === 1 ? "message was" : "messages were"} filtered as spam in the last ${SPAM_WINDOW_DAYS} days — <a href="${adminUrl}/admin/inquiries?status=spam" style="color:#d97706;">review in admin</a>.</p>`
            : ""
        }
        <p style="margin-top:24px;"><a href="${adminUrl}/admin/inquiries?status=new" style="color:#d97706;">Open admin dashboard →</a></p>
      </div>`;

    const emailResult = await sendAdminNotificationWithRetry(
      `Follow-up needed: ${staleInquiries.length} unanswered ${staleInquiries.length === 1 ? "inquiry" : "inquiries"}, ${unpaidDeposits.length} unpaid ${unpaidDeposits.length === 1 ? "deposit" : "deposits"}${failedLeadEmails.length > 0 ? `, ${failedLeadEmails.length} failed lead ${failedLeadEmails.length === 1 ? "alert" : "alerts"}` : ""}`,
      html
    );

    await SystemNotifications.alert({
      title: "Leads need follow-up",
      message: `${staleInquiries.length} unanswered ${staleInquiries.length === 1 ? "inquiry" : "inquiries"} (>${newInquiryHours}h) and ${unpaidDeposits.length} unpaid ${unpaidDeposits.length === 1 ? "deposit" : "deposits"} (>${depositDays}d)${failedLeadEmails.length > 0 ? `; ${failedLeadEmails.length} lead email(s) failed` : ""}${spamCount > 0 ? `; ${spamCount} filtered as spam (${SPAM_WINDOW_DAYS}d)` : ""}`,
    });

    return NextResponse.json({
      success: true,
      staleInquiries: staleInquiries.length,
      unpaidDeposits: unpaidDeposits.length,
      ...retrySummary,
      digestEmailSent: emailResult.success,
      notificationsCleaned: cleanup.deleted,
    });
  } catch (error) {
    console.error("Lead follow-up cron error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
