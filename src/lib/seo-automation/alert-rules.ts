/**
 * SEO alert rules — pure, so thresholds are unit-tested without a database.
 *
 * `evaluateSeoAlerts` turns a snapshot of signals into alerts. The runner in
 * `alerts.ts` gathers the signals, drops alerts already raised inside their
 * cooldown, and turns the rest into admin notifications plus one email.
 */

export type AlertSeverity = "urgent" | "high" | "normal";

export interface SeoAlert {
  /** Stable identity used for de-duplication across runs. */
  key: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  href: string;
  /** Do not raise the same key again within this many hours. */
  cooldownHours: number;
}

export interface AlertSignals {
  googleConfigured: boolean;
  sync: Array<{
    source: "GSC" | "GA4";
    status: "COMPLETED" | "FAILED" | "RUNNING" | "NEVER";
    hoursAgo: number | null;
    error: string | null;
  }>;
  /** Last 7 days with data vs the 7 before, sitewide. */
  traffic: {
    clicks: number;
    priorClicks: number;
    impressions: number;
    priorImpressions: number;
  } | null;
  /** Health score now vs about a week ago, from daily snapshots. */
  health: { current: number; weekAgo: number } | null;
  /** Pages whose weighted position worsened, week over week. */
  pageDrops: Array<{
    page: string;
    position: number;
    priorPosition: number;
    priorImpressions: number;
  }>;
  /** Missing URLs first seen in the last 7 days. */
  new404s: Array<{ url: string; humanHitCount: number; hitCount: number }>;
}

export const ALERT_THRESHOLDS = {
  staleSyncHours: 48,
  /** Percentage drop (negative) that raises a traffic alert. */
  trafficDropPct: -30,
  /** Ignore swings on a tiny base: below this, -30% is noise. */
  minPriorClicks: 20,
  minPriorImpressions: 500,
  healthDropPoints: 5,
  healthDropHighPoints: 10,
  /** Positions lost before a page counts as dropped. */
  pageDropPositions: 3,
  minPageImpressions: 100,
  /** Human hits on a new missing URL before we alert on it. */
  new404HumanHits: 3,
} as const;

function pct(curr: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

export function evaluateSeoAlerts(
  signals: AlertSignals,
  t: typeof ALERT_THRESHOLDS = ALERT_THRESHOLDS
): SeoAlert[] {
  const alerts: SeoAlert[] = [];

  if (signals.googleConfigured) {
    for (const s of signals.sync) {
      if (s.status === "FAILED") {
        alerts.push({
          key: `sync-failed:${s.source}`,
          severity: "high",
          title: `${s.source} sync failed`,
          message: s.error
            ? `The last ${s.source} sync failed: ${s.error.slice(0, 200)}`
            : `The last ${s.source} sync did not finish.`,
          href: "/admin/seo/settings",
          cooldownHours: 24,
        });
      } else if (s.status === "COMPLETED" && s.hoursAgo !== null && s.hoursAgo >= t.staleSyncHours) {
        alerts.push({
          key: `sync-stale:${s.source}`,
          severity: "high",
          title: `${s.source} data has not refreshed in ${Math.round(s.hoursAgo / 24)} days`,
          message: `The daily ${s.source} sync last completed ${Math.round(s.hoursAgo)} hours ago. The SEO dashboard is showing old figures.`,
          href: "/admin/seo/settings",
          cooldownHours: 48,
        });
      }
    }
  }

  if (signals.traffic) {
    const { clicks, priorClicks, impressions, priorImpressions } = signals.traffic;
    const clickChange = pct(clicks, priorClicks);
    if (priorClicks >= t.minPriorClicks && clickChange <= t.trafficDropPct) {
      alerts.push({
        key: "traffic:clicks-drop",
        severity: clickChange <= t.trafficDropPct * 1.5 ? "urgent" : "high",
        title: `Search clicks down ${Math.abs(clickChange)}% this week`,
        message: `${clicks} clicks from Google in the last 7 days with data, against ${priorClicks} the week before.`,
        href: "/admin/seo/search-console",
        cooldownHours: 72,
      });
    }
    const imprChange = pct(impressions, priorImpressions);
    if (priorImpressions >= t.minPriorImpressions && imprChange <= t.trafficDropPct) {
      alerts.push({
        key: "traffic:impressions-drop",
        severity: "normal",
        title: `Search impressions down ${Math.abs(imprChange)}% this week`,
        message: `${impressions.toLocaleString()} impressions in the last 7 days with data, against ${priorImpressions.toLocaleString()} the week before.`,
        href: "/admin/seo/search-console",
        cooldownHours: 72,
      });
    }
  }

  if (signals.health) {
    const drop = signals.health.weekAgo - signals.health.current;
    if (drop >= t.healthDropPoints) {
      alerts.push({
        key: "health:drop",
        severity: drop >= t.healthDropHighPoints ? "high" : "normal",
        title: `SEO health score fell ${drop} points`,
        message: `Health score is ${signals.health.current}, down from ${signals.health.weekAgo} a week ago.`,
        href: "/admin/seo",
        cooldownHours: 72,
      });
    }
  }

  const drops = signals.pageDrops
    .filter(
      (p) =>
        p.priorImpressions >= t.minPageImpressions &&
        p.position - p.priorPosition >= t.pageDropPositions
    )
    .sort((a, b) => b.priorImpressions - a.priorImpressions);
  if (drops.length > 0) {
    const list = drops
      .slice(0, 5)
      .map((p) => `${pathOf(p.page)} (#${p.priorPosition} → #${p.position})`)
      .join(", ");
    alerts.push({
      // Keyed on the set of pages so a new page dropping re-alerts.
      key: `rankings:drop:${drops
        .slice(0, 5)
        .map((p) => pathOf(p.page))
        .sort()
        .join("|")}`,
      severity: "normal",
      title:
        drops.length === 1
          ? `${pathOf(drops[0].page)} lost rankings`
          : `${drops.length} pages lost rankings this week`,
      message: `Average position fell by ${t.pageDropPositions}+ places: ${list}.`,
      href: "/admin/seo/search-console",
      cooldownHours: 24 * 7,
    });
  }

  const fresh404s = signals.new404s
    .filter((e) => e.humanHitCount >= t.new404HumanHits)
    .sort((a, b) => b.humanHitCount - a.humanHitCount);
  if (fresh404s.length > 0) {
    alerts.push({
      key: `404:new:${fresh404s
        .slice(0, 5)
        .map((e) => pathOf(e.url))
        .sort()
        .join("|")}`,
      severity: fresh404s.some((e) => e.humanHitCount >= 10) ? "high" : "normal",
      title:
        fresh404s.length === 1
          ? `Visitors are hitting a missing page: ${pathOf(fresh404s[0].url)}`
          : `${fresh404s.length} new missing pages are getting visitors`,
      message: `${fresh404s
        .slice(0, 5)
        .map((e) => `${pathOf(e.url)} (${e.humanHitCount} people)`)
        .join(", ")}. Add redirects so the visits are not lost.`,
      href: "/admin/404-monitor",
      cooldownHours: 24 * 7,
    });
  }

  return alerts;
}
