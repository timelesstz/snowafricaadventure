/**
 * Recovery for admin lead alerts that never reached the inbox.
 *
 * Every admin alert about a new inquiry or booking is tagged in EmailLog
 * metadata ({ kind: "admin-lead", leadType, leadId }). The daily lead-followup
 * cron calls retryFailedLeadEmails() to list leads whose alert failed in the
 * last 48 hours and resend each alert once. A resend is tagged cronRetry so a
 * lead is never retried twice, and a lead with any SENT alert is skipped.
 */

import { prisma } from "@/lib/prisma";
import { EmailStatus } from "@prisma/client";
import { BOT_FLAG_PREFIX } from "@/lib/booking-spots";
import { sendAdminNotification } from "./index";
import { ADMIN_LEAD_EMAIL_KIND, adminLeadEmailMetadata } from "./send";
import { adminNewBooking, adminNewInquiry } from "./templates";

export const FAILED_LEAD_WINDOW_HOURS = 48;
export const SPAM_WINDOW_DAYS = 7;
const MAX_RETRIES_PER_RUN = 10;

export interface FailedLeadEmail {
  leadType: "inquiry" | "booking";
  leadId: string;
  name: string;
  error: string | null;
  failedAt: Date;
  /** Outcome of this run: "sent", "failed", "already-retried" or "lead-missing". */
  retry: "sent" | "failed" | "already-retried" | "lead-missing";
}

type LogMeta = { kind?: unknown; leadType?: unknown; leadId?: unknown; cronRetry?: unknown };

const DATE_OPTS: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
};

async function resendInquiryAlert(leadId: string): Promise<{ name: string; ok: boolean } | null> {
  const inquiry = await prisma.inquiry.findUnique({ where: { id: leadId } });
  if (!inquiry) return null;
  const result = await sendAdminNotification(
    `Retry: Inquiry from ${inquiry.fullName} (first alert failed)`,
    adminNewInquiry({
      inquiryId: inquiry.id,
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone || undefined,
      type: inquiry.type,
      tripType: inquiry.tripType || undefined,
      numAdults: inquiry.numAdults || undefined,
      numChildren: inquiry.numChildren || undefined,
      arrivalDate: inquiry.arrivalDate
        ? inquiry.arrivalDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : undefined,
      message: inquiry.additionalInfo || undefined,
      nationality: inquiry.nationality || undefined,
    }),
    adminLeadEmailMetadata("inquiry", inquiry.id, { cronRetry: true })
  );
  return { name: inquiry.fullName, ok: result.success };
}

async function resendBookingAlert(leadId: string): Promise<{ name: string; ok: boolean } | null> {
  const booking = await prisma.booking.findUnique({
    where: { id: leadId },
    include: { departure: { include: { route: { select: { title: true } } } } },
  });
  if (!booking) return null;
  const climbers = Array.isArray(booking.climberDetails)
    ? (booking.climberDetails as Array<{ name?: string; nationality?: string }>)
        .filter((c) => c && typeof c.name === "string")
        .map((c) => ({ name: c.name as string, nationality: c.nationality }))
    : undefined;
  const result = await sendAdminNotification(
    `Retry: Booking ${booking.departure.route.title} - ${booking.leadName} (first alert failed)`,
    adminNewBooking({
      bookingId: booking.id,
      leadName: booking.leadName,
      leadEmail: booking.leadEmail,
      routeTitle: booking.departure.route.title,
      departureDate: booking.departure.arrivalDate.toLocaleDateString("en-US", DATE_OPTS),
      summitDate: booking.departure.summitDate.toLocaleDateString("en-US", DATE_OPTS),
      totalClimbers: booking.totalClimbers,
      totalPrice: Number(booking.totalPrice),
      depositAmount: Number(booking.depositAmount ?? 0),
      status: booking.status,
      climbers,
    }),
    adminLeadEmailMetadata("booking", booking.id, { cronRetry: true })
  );
  return { name: booking.leadName, ok: result.success };
}

/**
 * Lists leads whose admin alert failed in the last 48h with no later SENT
 * alert, and resends each alert once (idempotent across cron runs).
 */
export async function retryFailedLeadEmails(now: Date = new Date()): Promise<FailedLeadEmail[]> {
  const since = new Date(now.getTime() - FAILED_LEAD_WINDOW_HOURS * 3_600_000);
  const logs = await prisma.emailLog.findMany({
    where: {
      createdAt: { gte: since },
      metadata: { path: ["kind"], equals: ADMIN_LEAD_EMAIL_KIND },
    },
    select: { status: true, error: true, metadata: true, createdAt: true },
    orderBy: { createdAt: "asc" },
    take: 500,
  });

  const groups = new Map<
    string,
    { leadType: "inquiry" | "booking"; leadId: string; sent: boolean; retried: boolean; failedAt: Date | null; error: string | null }
  >();
  for (const log of logs) {
    const meta = (log.metadata ?? {}) as LogMeta;
    if (meta.kind !== ADMIN_LEAD_EMAIL_KIND || typeof meta.leadId !== "string") continue;
    if (meta.leadType !== "inquiry" && meta.leadType !== "booking") continue;
    const key = `${meta.leadType}:${meta.leadId}`;
    const group =
      groups.get(key) ??
      { leadType: meta.leadType, leadId: meta.leadId, sent: false, retried: false, failedAt: null, error: null };
    if (log.status === EmailStatus.SENT) group.sent = true;
    if (meta.cronRetry === true) group.retried = true;
    if (log.status === EmailStatus.FAILED) {
      group.failedAt ??= log.createdAt;
      group.error = log.error;
    }
    groups.set(key, group);
  }

  const results: FailedLeadEmail[] = [];
  let attempts = 0;
  for (const group of groups.values()) {
    if (group.sent || !group.failedAt) continue;

    const base = {
      leadType: group.leadType,
      leadId: group.leadId,
      name: group.leadId,
      error: group.error,
      failedAt: group.failedAt,
    };

    if (group.retried || attempts >= MAX_RETRIES_PER_RUN) {
      results.push({ ...base, retry: "already-retried" });
      continue;
    }

    attempts++;
    try {
      const outcome =
        group.leadType === "inquiry"
          ? await resendInquiryAlert(group.leadId)
          : await resendBookingAlert(group.leadId);
      if (!outcome) {
        results.push({ ...base, retry: "lead-missing" });
      } else {
        results.push({ ...base, name: outcome.name, retry: outcome.ok ? "sent" : "failed" });
      }
    } catch (error) {
      console.error(`[LeadRecovery] Retry for ${group.leadType} ${group.leadId} threw:`, error);
      results.push({ ...base, retry: "failed" });
    }
  }

  return results;
}

/** Leads filtered as spam in the last 7 days (inquiries + bot-flagged bookings). */
export async function countRecentSpamLeads(now: Date = new Date()): Promise<number> {
  const since = new Date(now.getTime() - SPAM_WINDOW_DAYS * 86_400_000);
  const [inquiries, bookings] = await Promise.all([
    prisma.inquiry.count({ where: { status: "spam", createdAt: { gte: since } } }),
    prisma.booking.count({ where: { notes: { startsWith: BOT_FLAG_PREFIX }, createdAt: { gte: since } } }),
  ]);
  return inquiries + bookings;
}
