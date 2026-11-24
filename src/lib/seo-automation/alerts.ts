import prisma from "@/lib/prisma";
import { NotificationPriority, NotificationType } from "@prisma/client";
import { createNotification } from "@/lib/notifications";
import { sendAdminNotification, escapeHtml } from "@/lib/email";
import { SITE_CONFIG } from "@/lib/constants";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";
import { anchorWindowEnd, loadFreshness } from "@/lib/seo-overview";
import {
  evaluateSeoAlerts,
  type AlertSeverity,
  type AlertSignals,
  type SeoAlert,
} from "./alert-rules";

/** Notification.data.source for every alert this module raises. */
export const SEO_ALERT_SOURCE = "seo-alerts";
export const SEO_ALERTS_LAST_RUN_KEY = "seo_alerts_last_run";

const DAY_MS = 24 * 60 * 60 * 1000;

const PRIORITY: Record<AlertSeverity, NotificationPriority> = {
  urgent: NotificationPriority.URGENT,
  high: NotificationPriority.HIGH,
  normal: NotificationPriority.NORMAL,
};

export interface SeoAlertRunResult {
  ranAt: string;
  evaluated: number;
  raised: number;
  suppressed: number;
  emailed: boolean;
  alerts: Array<Pick<SeoAlert, "key" | "severity" | "title">>;
}

async function collectSignals(now: Date): Promise<AlertSignals> {
  const latest = await prisma.gscPageMetric.aggregate({ _max: { date: true } });
  const end = anchorWindowEnd(latest._max.date ?? null, now);
  const curFrom = new Date(end.getTime() - 7 * DAY_MS);
  const priorFrom = new Date(end.getTime() - 14 * DAY_MS);

  const [freshness, trafficRows, pageRows, snapshots, new404s] = await Promise.all([
    loadFreshness(now),
    latest._max.date
      ? prisma.$queryRaw<
          Array<{
            clicks: bigint | number | null;
            prior_clicks: bigint | number | null;
            impressions: bigint | number | null;
            prior_impressions: bigint | number | null;
          }>
        >`
          SELECT
            SUM(clicks)      FILTER (WHERE date >= ${curFrom})::bigint AS clicks,
            SUM(clicks)      FILTER (WHERE date <  ${curFrom})::bigint AS prior_clicks,
            SUM(impressions) FILTER (WHERE date >= ${curFrom})::bigint AS impressions,
            SUM(impressions) FILTER (WHERE date <  ${curFrom})::bigint AS prior_impressions
          FROM "GscPageMetric"
          WHERE date >= ${priorFrom} AND date < ${end}
        `
      : Promise.resolve([]),
    latest._max.date
      ? prisma.$queryRaw<
          Array<{
            page: string;
            position: number | null;
            prior_position: number | null;
            prior_impressions: bigint | number | null;
          }>
        >`
          SELECT page,
            (SUM(position * impressions) FILTER (WHERE date >= ${curFrom})
              / NULLIF(SUM(impressions) FILTER (WHERE date >= ${curFrom}), 0))::float8 AS position,
            (SUM(position * impressions) FILTER (WHERE date < ${curFrom})
              / NULLIF(SUM(impressions) FILTER (WHERE date < ${curFrom}), 0))::float8 AS prior_position,
            SUM(impressions) FILTER (WHERE date < ${curFrom})::bigint AS prior_impressions
          FROM "GscPageMetric"
          WHERE date >= ${priorFrom} AND date < ${end}
          GROUP BY page
          HAVING SUM(impressions) FILTER (WHERE date < ${curFrom}) >= 100
        `
      : Promise.resolve([]),
    prisma.seoHealthSnapshot.findMany({
      where: { date: { gte: new Date(now.getTime() - 9 * DAY_MS) } },
      orderBy: { date: "asc" },
      select: { date: true, healthScore: true },
    }),
    prisma.notFoundUrl.findMany({
      where: { status: "ACTIVE", firstHitAt: { gte: new Date(now.getTime() - 7 * DAY_MS) } },
      orderBy: { humanHitCount: "desc" },
      take: 20,
      select: { url: true, hitCount: true, humanHitCount: true },
    }),
  ]);

  const t = trafficRows[0];
  const traffic = t
    ? {
        clicks: Number(t.clicks ?? 0),
        priorClicks: Number(t.prior_clicks ?? 0),
        impressions: Number(t.impressions ?? 0),
        priorImpressions: Number(t.prior_impressions ?? 0),
      }
    : null;

  // Compare the newest snapshot with the one closest to 7 days before it.
  let health: AlertSignals["health"] = null;
  if (snapshots.length >= 2) {
    const newest = snapshots[snapshots.length - 1];
    const target = newest.date.getTime() - 7 * DAY_MS;
    const weekAgo = snapshots.reduce((best, s) =>
      Math.abs(s.date.getTime() - target) < Math.abs(best.date.getTime() - target) ? s : best
    );
    if (weekAgo !== newest && newest.date.getTime() - weekAgo.date.getTime() >= 5 * DAY_MS) {
      health = { current: newest.healthScore, weekAgo: weekAgo.healthScore };
    }
  }

  return {
    googleConfigured: isGoogleConfigured(),
    sync: [freshness.gsc, freshness.ga],
    traffic,
    health,
    pageDrops: pageRows
      .filter((r) => r.position !== null && r.prior_position !== null)
      .map((r) => ({
        page: r.page,
        position: Math.round(Number(r.position) * 10) / 10,
        priorPosition: Math.round(Number(r.prior_position) * 10) / 10,
        priorImpressions: Number(r.prior_impressions ?? 0),
      })),
    new404s,
  };
}

/** Keys raised recently enough that their cooldown has not expired. */
async function recentAlertKeys(alerts: SeoAlert[], now: Date): Promise<Set<string>> {
  if (alerts.length === 0) return new Set();
  const longest = Math.max(...alerts.map((a) => a.cooldownHours));
  const rows = await prisma.notification.findMany({
    where: {
      type: NotificationType.SYSTEM_ALERT,
      createdAt: { gte: new Date(now.getTime() - longest * 60 * 60 * 1000) },
      data: { path: ["source"], equals: SEO_ALERT_SOURCE },
    },
    select: { data: true, createdAt: true },
  });
  const active = new Set<string>();
  for (const row of rows) {
    const key = (row.data as { alertKey?: string } | null)?.alertKey;
    const alert = key ? alerts.find((a) => a.key === key) : undefined;
    if (alert && now.getTime() - row.createdAt.getTime() < alert.cooldownHours * 60 * 60 * 1000) {
      active.add(alert.key);
    }
  }
  return active;
}

function digestHtml(alerts: SeoAlert[]): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const rows = alerts
    .map(
      (a) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0 0 4px;font-weight:600;color:#0f172a;">${escapeHtml(a.title)}</p>
          <p style="margin:0 0 6px;color:#475569;font-size:14px;">${escapeHtml(a.message)}</p>
          <a href="${base}${a.href}" style="color:#b45309;font-size:14px;">Open in admin</a>
        </td>
      </tr>`
    )
    .join("");
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h2 style="color:#0f172a;margin:0 0 8px;">SEO alerts</h2>
      <p style="color:#475569;margin:0 0 16px;">The daily SEO check found ${alerts.length} new issue${
        alerts.length === 1 ? "" : "s"
      } that need a look.</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;">Each alert is sent once, then held back for a few days unless it changes.</p>
    </div>`;
}

/**
 * Evaluate, de-duplicate, notify. Additive only: it creates notifications and
 * one settings row, and never updates or deletes existing records.
 */
export async function runSeoAlerts(
  options: { now?: Date; sendEmail?: boolean } = {}
): Promise<SeoAlertRunResult> {
  const now = options.now ?? new Date();
  const signals = await collectSignals(now);
  const alerts = evaluateSeoAlerts(signals);
  const suppressedKeys = await recentAlertKeys(alerts, now);
  const fresh = alerts.filter((a) => !suppressedKeys.has(a.key));

  for (const alert of fresh) {
    await createNotification({
      type: NotificationType.SYSTEM_ALERT,
      title: alert.title,
      message: alert.message,
      priority: PRIORITY[alert.severity],
      data: {
        source: SEO_ALERT_SOURCE,
        alertKey: alert.key,
        severity: alert.severity,
        href: alert.href,
      },
      expiresAt: new Date(now.getTime() + 30 * DAY_MS),
    });
  }

  const emailWorthy = fresh.filter((a) => a.severity !== "normal");
  let emailed = false;
  if ((options.sendEmail ?? true) && emailWorthy.length > 0) {
    const result = await sendAdminNotification(
      emailWorthy.length === 1 ? `SEO alert: ${emailWorthy[0].title}` : `${emailWorthy.length} SEO alerts`,
      digestHtml(fresh),
      { type: "seo-alerts", count: fresh.length }
    );
    emailed = result.success;
  }

  const summary: SeoAlertRunResult = {
    ranAt: now.toISOString(),
    evaluated: alerts.length,
    raised: fresh.length,
    suppressed: suppressedKeys.size,
    emailed,
    alerts: fresh.map(({ key, severity, title }) => ({ key, severity, title })),
  };

  await prisma.siteSetting.upsert({
    where: { key: SEO_ALERTS_LAST_RUN_KEY },
    update: { value: JSON.stringify(summary) },
    create: { key: SEO_ALERTS_LAST_RUN_KEY, value: JSON.stringify(summary) },
  });

  return summary;
}

