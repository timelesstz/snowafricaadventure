import prisma from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import { SEO_ALERT_SOURCE, SEO_ALERTS_LAST_RUN_KEY, type SeoAlertRunResult } from "./alerts";

export type AutomationKey = "sync" | "snapshot" | "alerts" | "audit";

export interface AutomationStatus {
  key: AutomationKey;
  label: string;
  description: string;
  /** When it last finished (ISO), or null if it never has. */
  lastRunAt: string | null;
  state: "ok" | "failed" | "running" | "never";
  summary: string | null;
  /** Can be triggered from the dashboard. */
  runnable: boolean;
}

export interface RecentSeoAlert {
  id: string;
  title: string;
  message: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  isRead: boolean;
  createdAt: string;
  href: string | null;
}

export interface SeoAutomationOverview {
  automations: AutomationStatus[];
  recentAlerts: RecentSeoAlert[];
  /** Human-readable schedule of the daily run (Vercel cron, UTC). */
  schedule: string;
}

function parseLastAlertRun(value: string | undefined): SeoAlertRunResult | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as SeoAlertRunResult;
  } catch {
    return null;
  }
}

export async function getSeoAutomationOverview(): Promise<SeoAutomationOverview> {
  const [gscLog, crawlLog, snapshot, alertRun, alerts] = await Promise.all([
    prisma.seoSyncLog.findFirst({
      where: { source: "GSC" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
    prisma.seoSyncLog.findFirst({
      where: { source: "CRAWL" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
    prisma.seoHealthSnapshot.findFirst({
      orderBy: { date: "desc" },
      select: { date: true, createdAt: true, healthScore: true },
    }),
    prisma.siteSetting.findUnique({ where: { key: SEO_ALERTS_LAST_RUN_KEY } }),
    prisma.notification.findMany({
      where: {
        type: NotificationType.SYSTEM_ALERT,
        data: { path: ["source"], equals: SEO_ALERT_SOURCE },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, title: true, message: true, priority: true, isRead: true, createdAt: true, data: true },
    }),
  ]);

  const logState = (log: typeof gscLog): AutomationStatus["state"] =>
    !log ? "never" : log.status === "FAILED" ? "failed" : log.status === "RUNNING" ? "running" : "ok";

  const lastAlerts = parseLastAlertRun(alertRun?.value);
  const plural = (n: number, word: string) => `${n.toLocaleString()} ${word}${n === 1 ? "" : "s"}`;

  const automations: AutomationStatus[] = [
    {
      key: "sync",
      label: "Google data sync",
      description: "Pulls Search Console and GA4 figures into the dashboard.",
      lastRunAt: gscLog?.completedAt?.toISOString() ?? null,
      state: logState(gscLog),
      summary: gscLog
        ? gscLog.status === "FAILED"
          ? gscLog.error?.slice(0, 120) ?? "Failed"
          : `${plural(gscLog.recordCount, "Search Console row")}`
        : null,
      runnable: false,
    },
    {
      key: "snapshot",
      label: "Health snapshot",
      description: "Records the health score each day so the trend can be charted.",
      lastRunAt: snapshot?.createdAt.toISOString() ?? null,
      state: snapshot ? "ok" : "never",
      summary: snapshot
        ? `Score ${snapshot.healthScore} for ${snapshot.date.toISOString().split("T")[0]}`
        : null,
      runnable: true,
    },
    {
      key: "alerts",
      label: "SEO alerts",
      description: "Watches for traffic drops, lost rankings, new 404s and broken syncs.",
      lastRunAt: lastAlerts?.ranAt ?? null,
      state: lastAlerts ? "ok" : "never",
      summary: lastAlerts
        ? lastAlerts.raised === 0
          ? "No new issues"
          : `${plural(lastAlerts.raised, "new alert")}${lastAlerts.emailed ? ", emailed" : ""}`
        : null,
      runnable: true,
    },
    {
      key: "audit",
      label: "Page audits",
      description: "Re-checks the pages Google shows most, on the live site, about weekly.",
      lastRunAt: crawlLog?.completedAt?.toISOString() ?? null,
      state: logState(crawlLog),
      summary: crawlLog
        ? crawlLog.status === "FAILED"
          ? crawlLog.error?.slice(0, 120) ?? "Failed"
          : `${plural(crawlLog.recordCount, "page")} audited`
        : null,
      runnable: true,
    },
  ];

  return {
    automations,
    recentAlerts: alerts.map((a) => {
      const href = (a.data as { href?: unknown } | null)?.href;
      return {
        id: a.id,
        title: a.title,
        message: a.message,
        priority: a.priority,
        isRead: a.isRead,
        createdAt: a.createdAt.toISOString(),
        href: typeof href === "string" && href.startsWith("/admin/") ? href : null,
      };
    }),
    schedule: "Daily at 07:00 UTC (10:00 in Arusha)",
  };
}
