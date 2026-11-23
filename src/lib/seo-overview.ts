import prisma from "@/lib/prisma";
import {
  aggregateSeoScores,
  type SeoScoreResult,
  type AggregateSeoResult,
} from "@/lib/seo-score";
import {
  computeHealthScore,
  type HealthScoreComponent,
} from "@/lib/seo-health-score";
import {
  buildActionQueue,
  estimateQuickWinGain,
  type SeoAction,
} from "@/lib/seo-action-queue";
import { failedChecks, loadContentIndex } from "@/lib/seo-intel/content-index";

export { computeHealthScore };
export type { HealthScoreComponent };

/**
 * Single source of truth for the /admin/seo overview dashboard.
 *
 * Replaces the duplicated computations that previously lived in both
 * `src/app/(admin)/admin/seo/page.tsx` and `src/app/api/admin/seo/overview/route.ts`.
 *
 * Design principles:
 *   1. No silent fallbacks — when a data source is missing, we return null
 *      and renormalize the health-score weights instead of substituting a
 *      neutral 50.
 *   2. Impression-weighted CTR and position (matches Google's reporting),
 *      not the simple mean of per-row averages.
 *   3. One round-trip per logical concern — content-health is derived from
 *      five Prisma queries we already make, GSC summary from raw aggregations.
 *   4. Includes a daily snapshot trend so the UI can show "score is up 4
 *      points vs 30 days ago" without recomputing history on every request.
 */

// ─── Types ───────────────────────────────────────────────────────────────

export type SeoDataSourceKey = "GSC" | "GA4";

export type ContentKind = "route" | "safari" | "destination" | "day-trip" | "blog";

export interface SyncFreshness {
  source: SeoDataSourceKey;
  status: "COMPLETED" | "FAILED" | "RUNNING" | "NEVER";
  completedAt: string | null;
  hoursAgo: number | null;
  recordCount: number;
  error: string | null;
}

export interface GscSummary {
  totalClicks: number;
  totalImpressions: number;
  /** Impression-weighted CTR, expressed as a percentage (e.g. 2.4 not 0.024). */
  weightedCtr: number;
  /** Impression-weighted average position. */
  weightedPosition: number;
  clicksTrend: number;
  impressionsTrend: number;
  ctrTrend: number;
  /** Lower position is better, so positive trend means improvement. */
  positionTrend: number;
  hasData: boolean;
}

export interface Ga4Summary {
  sessions: number;
  users: number;
  newUsers: number;
  conversions: number;
  /** As percentage (e.g. 42.5 not 0.425). */
  bounceRate: number;
  sessionsTrend: number;
  usersTrend: number;
  conversionsTrend: number;
  hasData: boolean;
}

export interface DailyMetric {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TopPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface QuickWin {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
  ctr: number;
  /** The page that earns most of this query's impressions. */
  page: string | null;
  /** Extra clicks over 28 days if it reached #3 (see CTR_AT_POSITION_3). */
  estimatedGain: number;
}

export interface IssueBreakdown {
  needsAttentionContent: number;
  active404s: number;
  missingMetaDescription: number;
  missingSchema: number;
  total: number;
}

export interface HealthScore {
  score: number;
  components: HealthScoreComponent[];
  /** 30-day trend: array of { date, score } for sparkline. */
  trend: Array<{ date: string; score: number }>;
  /** Score N days ago, where N = trend.length - 1. Null if no history. */
  scoreThirtyDaysAgo: number | null;
  delta: number | null;
}

export interface SeoOverviewData {
  gsc: GscSummary;
  ga: Ga4Summary;
  contentHealth: AggregateSeoResult;
  issues: IssueBreakdown;
  freshness: { gsc: SyncFreshness; ga: SyncFreshness };
  topQueries: TopQuery[];
  topPages: TopPage[];
  quickWins: QuickWin[];
  dailyMetrics: DailyMetric[];
  health: HealthScore;
  /** The dates each summary actually covers (inclusive), after lag anchoring. */
  period: {
    rangeDays: number;
    gsc: { from: string; to: string } | null;
    ga: { from: string; to: string } | null;
  };
  /** Latest audit per URL. */
  audit: {
    pagesAudited: number;
    avgScore: number | null;
    missingSchema: number;
    lastAuditAt: string | null;
  };
  /** Ranked "fix next" list. */
  actions: SeoAction[];
}

// ─── Internal helpers ────────────────────────────────────────────────────

function pctChange(curr: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function hoursBetween(then: Date | null, now: Date): number | null {
  if (!then) return null;
  return Math.round(((now.getTime() - then.getTime()) / (1000 * 60 * 60)) * 10) / 10;
}

interface WeightedAggregateRow {
  total_clicks: bigint | number | null;
  total_impressions: bigint | number | null;
  weighted_position_sum: number | null;
}

async function aggregateGsc(from: Date, to?: Date) {
  const upper = to ?? new Date();
  // SUM(position * impressions) gives weighted-position sum;
  // divide by SUM(impressions) for the weighted mean.
  const rows = await prisma.$queryRaw<WeightedAggregateRow[]>`
    SELECT
      SUM(clicks)::bigint                              AS total_clicks,
      SUM(impressions)::bigint                         AS total_impressions,
      SUM(position * impressions)::float8              AS weighted_position_sum
    FROM "GscPageMetric"
    WHERE date >= ${from} AND date < ${upper}
  `;
  const row = rows[0] ?? { total_clicks: 0, total_impressions: 0, weighted_position_sum: 0 };
  const clicks = Number(row.total_clicks ?? 0);
  const impressions = Number(row.total_impressions ?? 0);
  const positionSum = Number(row.weighted_position_sum ?? 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position = impressions > 0 ? positionSum / impressions : 0;
  return { clicks, impressions, ctr, position };
}

async function dailyGscMetrics(from: Date, to: Date): Promise<DailyMetric[]> {
  const rows = await prisma.$queryRaw<
    Array<{
      date: Date;
      clicks: bigint | number | null;
      impressions: bigint | number | null;
      weighted_position_sum: number | null;
    }>
  >`
    SELECT
      date,
      SUM(clicks)::bigint                  AS clicks,
      SUM(impressions)::bigint             AS impressions,
      SUM(position * impressions)::float8  AS weighted_position_sum
    FROM "GscPageMetric"
    WHERE date >= ${from} AND date < ${to}
    GROUP BY date
    ORDER BY date ASC
  `;
  return rows.map((r) => {
    const clicks = Number(r.clicks ?? 0);
    const impressions = Number(r.impressions ?? 0);
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const position = impressions > 0 ? Number(r.weighted_position_sum ?? 0) / impressions : 0;
    return {
      date: r.date.toISOString().split("T")[0],
      clicks,
      impressions,
      ctr: Math.round(ctr * 10000) / 100,
      position: Math.round(position * 10) / 10,
    };
  });
}

async function aggregateGa4(from: Date, to?: Date) {
  const upper = to ?? new Date();
  const result = await prisma.gaOrganicMetric.aggregate({
    where: { date: { gte: from, lt: upper } },
    _sum: { sessions: true, users: true, newUsers: true, conversions: true },
    _avg: { bounceRate: true },
  });
  return {
    sessions: result._sum.sessions ?? 0,
    users: result._sum.users ?? 0,
    newUsers: result._sum.newUsers ?? 0,
    conversions: result._sum.conversions ?? 0,
    bounceRate: result._avg.bounceRate ?? 0,
  };
}

export async function loadFreshness(now: Date = new Date()): Promise<{ gsc: SyncFreshness; ga: SyncFreshness }> {
  const [gscLog, gaLog] = await Promise.all([
    prisma.seoSyncLog.findFirst({
      where: { source: "GSC" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
    prisma.seoSyncLog.findFirst({
      where: { source: "GA4" },
      orderBy: { startedAt: "desc" },
      select: { status: true, completedAt: true, recordCount: true, error: true },
    }),
  ]);

  const buildFreshness = (
    source: SeoDataSourceKey,
    log: typeof gscLog
  ): SyncFreshness => {
    if (!log) {
      return {
        source,
        status: "NEVER",
        completedAt: null,
        hoursAgo: null,
        recordCount: 0,
        error: null,
      };
    }
    return {
      source,
      status: log.status as SyncFreshness["status"],
      completedAt: log.completedAt ? log.completedAt.toISOString() : null,
      hoursAgo: hoursBetween(log.completedAt ?? null, now),
      recordCount: log.recordCount,
      error: log.error,
    };
  };

  return {
    gsc: buildFreshness("GSC", gscLog),
    ga: buildFreshness("GA4", gaLog),
  };
}

// ─── Content-health loader (mirrors content-health/page.tsx) ─────────────

export interface ContentScoreItem {
  id: string;
  kind: ContentKind;
  title: string;
  editHref: string;
  /** Inactive / unpublished items are scored but never queued as actions. */
  isLive: boolean;
  score: number;
  band: SeoScoreResult["band"];
  /** Labels of failed checks, most important first (scorer order). */
  failedChecks: string[];
}

export async function loadContentScores(): Promise<{
  results: SeoScoreResult[];
  items: ContentScoreItem[];
  missingMetaDescription: number;
}> {
  const records = await loadContentIndex();
  return {
    results: records.map((r) => r.result),
    items: records.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      editHref: r.editHref,
      isLive: r.isLive,
      score: r.result.score,
      band: r.result.band,
      failedChecks: failedChecks(r.result),
    })),
    missingMetaDescription: records.filter((r) => !r.metaDescription?.trim()).length,
  };
}

// ─── Public entry point ──────────────────────────────────────────────────

interface GetSeoOverviewOptions {
  /** Window for GSC/GA summary metrics. Defaults to 7. */
  rangeDays?: number;
  /** Now() override for tests. */
  now?: Date;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Search Console data lands 2-3 days late, so a window ending "now" holds
 * two or three empty days and every week-over-week trend reads as a drop.
 * Anchor each window to the last day that actually has data instead.
 *
 * Returns the exclusive upper bound (start of the day after `latest`), or
 * `now` when there is no data at all.
 */
export function anchorWindowEnd(latest: Date | null, now: Date): Date {
  if (!latest) return now;
  const end = new Date(latest);
  end.setUTCHours(0, 0, 0, 0);
  const exclusive = new Date(end.getTime() + DAY_MS);
  return exclusive.getTime() > now.getTime() ? now : exclusive;
}

function isoDay(d: Date): string {
  return d.toISOString().split("T")[0];
}

/** Latest audit per URL — history rows must not inflate counts or averages. */
async function latestAuditSummary() {
  const rows = await prisma.$queryRaw<
    Array<{
      pages: number | bigint | null;
      avg_score: number | null;
      missing_schema: number | bigint | null;
      last_audit: Date | null;
    }>
  >`
    SELECT
      COUNT(*)::int                                   AS pages,
      AVG(score)::float8                              AS avg_score,
      COUNT(*) FILTER (WHERE NOT "hasSchema")::int    AS missing_schema,
      MAX("createdAt")                                AS last_audit
    FROM (
      SELECT DISTINCT ON (url) url, score, "hasSchema", "createdAt"
      FROM "SeoPageAudit"
      -- Audits of a local dev server describe no real page.
      WHERE url NOT LIKE 'http://localhost%' AND url NOT LIKE 'http://127.0.0.1%'
      ORDER BY url, "createdAt" DESC
    ) latest
  `;
  const row = rows[0];
  return {
    pagesAudited: Number(row?.pages ?? 0),
    avgScore: row?.avg_score === null || row?.avg_score === undefined ? null : Number(row.avg_score),
    missingSchema: Number(row?.missing_schema ?? 0),
    lastAuditAt: row?.last_audit ?? null,
  };
}

export async function getSeoOverview(
  options: GetSeoOverviewOptions = {}
): Promise<SeoOverviewData> {
  const now = options.now ?? new Date();
  const rangeDays = options.rangeDays ?? 7;

  const [gscBounds, gaBounds] = await Promise.all([
    prisma.gscPageMetric.aggregate({ _max: { date: true } }),
    prisma.gaOrganicMetric.aggregate({ _max: { date: true } }),
  ]);
  const gscEnd = anchorWindowEnd(gscBounds._max.date ?? null, now);
  const gaEnd = anchorWindowEnd(gaBounds._max.date ?? null, now);

  const currentFrom = new Date(gscEnd.getTime() - rangeDays * DAY_MS);
  const priorFrom = new Date(gscEnd.getTime() - rangeDays * 2 * DAY_MS);
  const gaCurrentFrom = new Date(gaEnd.getTime() - rangeDays * DAY_MS);
  const gaPriorFrom = new Date(gaEnd.getTime() - rangeDays * 2 * DAY_MS);
  const quickWinFrom = new Date(gscEnd.getTime() - 28 * DAY_MS);

  const [
    gscCurrent,
    gscPrior,
    gaCurrent,
    gaPrior,
    daily,
    topQueriesRaw,
    topPagesRaw,
    quickWinsRaw,
    contentScores,
    audit,
    active404Count,
    top404s,
    freshness,
    snapshotsRaw,
  ] = await Promise.all([
    aggregateGsc(currentFrom, gscEnd),
    aggregateGsc(priorFrom, currentFrom),
    aggregateGa4(gaCurrentFrom, gaEnd),
    aggregateGa4(gaPriorFrom, gaCurrentFrom),
    dailyGscMetrics(currentFrom, gscEnd),
    prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where: { date: { gte: currentFrom, lt: gscEnd } },
      _sum: { clicks: true, impressions: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 10,
    }),
    prisma.gscPageMetric.groupBy({
      by: ["page"],
      where: { date: { gte: currentFrom, lt: gscEnd } },
      _sum: { clicks: true, impressions: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 10,
    }),
    // Quick wins: queries in positions 4-10 with >= 100 impressions over the
    // 28 days ending on the last day with data, plus the page that ranks.
    prisma.$queryRaw<
      Array<{
        query: string;
        clicks: bigint | number | null;
        impressions: bigint | number | null;
        weighted_position: number | null;
        top_page: string | null;
      }>
    >`
      WITH q AS (
        SELECT
          query,
          SUM(clicks)::bigint                                                 AS clicks,
          SUM(impressions)::bigint                                            AS impressions,
          (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
        FROM "GscSearchQuery"
        WHERE date >= ${quickWinFrom} AND date < ${gscEnd}
        GROUP BY query
        HAVING SUM(impressions) >= 100
          AND (SUM(position * impressions) / NULLIF(SUM(impressions), 0)) BETWEEN 4 AND 10
        ORDER BY SUM(impressions) DESC
        LIMIT 10
      ),
      p AS (
        SELECT DISTINCT ON (s.query) s.query, s.page
        FROM "GscSearchQuery" s
        JOIN q ON q.query = s.query
        WHERE s.date >= ${quickWinFrom} AND s.date < ${gscEnd} AND s.page IS NOT NULL
        GROUP BY s.query, s.page
        ORDER BY s.query, SUM(s.impressions) DESC
      )
      SELECT q.*, p.page AS top_page
      FROM q LEFT JOIN p ON p.query = q.query
      ORDER BY q.impressions DESC
    `,
    loadContentScores(),
    latestAuditSummary(),
    prisma.notFoundUrl.count({
      where: { status: "ACTIVE", hitCount: { gte: 5 } },
    }),
    prisma.notFoundUrl.findMany({
      where: { status: "ACTIVE", hitCount: { gte: 5 } },
      orderBy: [{ humanHitCount: "desc" }, { hitCount: "desc" }],
      take: 3,
      select: { url: true, hitCount: true, humanHitCount: true },
    }),
    loadFreshness(now),
    prisma.seoHealthSnapshot.findMany({
      where: { date: { gte: new Date(now.getTime() - 30 * DAY_MS) } },
      orderBy: { date: "asc" },
      select: { date: true, healthScore: true },
    }),
  ]);

  const contentAggregate = aggregateSeoScores(contentScores.results);

  // GSC summary
  const gsc: GscSummary = {
    totalClicks: gscCurrent.clicks,
    totalImpressions: gscCurrent.impressions,
    weightedCtr: Math.round(gscCurrent.ctr * 10000) / 100,
    weightedPosition: Math.round(gscCurrent.position * 10) / 10,
    clicksTrend: pctChange(gscCurrent.clicks, gscPrior.clicks),
    impressionsTrend: pctChange(gscCurrent.impressions, gscPrior.impressions),
    ctrTrend: pctChange(gscCurrent.ctr, gscPrior.ctr),
    // Raw delta (current - prior). Lower is better, so the UI passes
    // invertTrend so a negative number reads as green.
    positionTrend:
      gscPrior.position === 0
        ? 0
        : Math.round((gscCurrent.position - gscPrior.position) * 10) / 10,
    hasData: gscCurrent.impressions > 0 || gscCurrent.clicks > 0,
  };

  // GA4 summary
  const ga: Ga4Summary = {
    sessions: gaCurrent.sessions,
    users: gaCurrent.users,
    newUsers: gaCurrent.newUsers,
    conversions: gaCurrent.conversions,
    bounceRate: Math.round(gaCurrent.bounceRate * 1000) / 10,
    sessionsTrend: pctChange(gaCurrent.sessions, gaPrior.sessions),
    usersTrend: pctChange(gaCurrent.users, gaPrior.users),
    conversionsTrend: pctChange(gaCurrent.conversions, gaPrior.conversions),
    hasData: gaCurrent.sessions > 0 || gaCurrent.users > 0,
  };

  // Top queries / pages — weighted position per group needs the raw rows,
  // which a Prisma groupBy cannot express, so fetch it for the top-N only.
  const queryNames = topQueriesRaw.map((q) => q.query);
  const queryStats = queryNames.length
    ? await prisma.$queryRaw<Array<{ query: string; weighted_position: number | null }>>`
        SELECT query,
          (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
        FROM "GscSearchQuery"
        WHERE date >= ${currentFrom} AND date < ${gscEnd}
          AND query = ANY(${queryNames}::text[])
        GROUP BY query
      `
    : [];
  const queryPosMap = new Map(queryStats.map((q) => [q.query, Number(q.weighted_position ?? 0)]));

  const topQueries: TopQuery[] = topQueriesRaw.map((q) => {
    const clicks = q._sum.clicks ?? 0;
    const impressions = q._sum.impressions ?? 0;
    const position = queryPosMap.get(q.query) ?? 0;
    return {
      query: q.query,
      clicks,
      impressions,
      ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
      position: Math.round(position * 10) / 10,
    };
  });

  const pagePaths = topPagesRaw.map((p) => p.page);
  const pageStats = pagePaths.length
    ? await prisma.$queryRaw<Array<{ page: string; weighted_position: number | null }>>`
        SELECT page,
          (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
        FROM "GscPageMetric"
        WHERE date >= ${currentFrom} AND date < ${gscEnd}
          AND page = ANY(${pagePaths}::text[])
        GROUP BY page
      `
    : [];
  const pagePosMap = new Map(pageStats.map((p) => [p.page, Number(p.weighted_position ?? 0)]));

  const topPages: TopPage[] = topPagesRaw.map((p) => {
    const clicks = p._sum.clicks ?? 0;
    const impressions = p._sum.impressions ?? 0;
    const position = pagePosMap.get(p.page) ?? 0;
    return {
      page: p.page,
      clicks,
      impressions,
      ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
      position: Math.round(position * 10) / 10,
    };
  });

  const quickWins: QuickWin[] = quickWinsRaw.map((q) => {
    const clicks = Number(q.clicks ?? 0);
    const impressions = Number(q.impressions ?? 0);
    const position = Number(q.weighted_position ?? 0);
    return {
      query: q.query,
      clicks,
      impressions,
      position: Math.round(position * 10) / 10,
      ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
      page: q.top_page,
      estimatedGain: estimateQuickWinGain(impressions, clicks),
    };
  });

  // Issue breakdown
  const needsAttention =
    contentAggregate.bands.poor + contentAggregate.bands["needs-work"];
  const issues: IssueBreakdown = {
    needsAttentionContent: needsAttention,
    active404s: active404Count,
    missingMetaDescription: contentScores.missingMetaDescription,
    missingSchema: audit.missingSchema,
    total:
      needsAttention +
      active404Count +
      contentScores.missingMetaDescription +
      audit.missingSchema,
  };

  // Health score with renormalized components
  const { score: healthScore, components } = computeHealthScore({
    contentHealthScore: contentAggregate.average,
    weightedCtr: gsc.hasData ? gscCurrent.ctr : null,
    weightedPosition: gsc.hasData ? gscCurrent.position : null,
    active404s: active404Count,
    auditAvg: audit.avgScore,
    contentCount: contentAggregate.count,
  });

  const trend = snapshotsRaw.map((s) => ({
    date: isoDay(s.date),
    score: s.healthScore,
  }));
  // A delta against a snapshot taken hours ago (or under an older formula on
  // the same day) is noise; only report change over at least a week.
  const oldest = snapshotsRaw[0];
  const hasHistory = oldest !== undefined && now.getTime() - oldest.date.getTime() >= 7 * DAY_MS;
  const scoreThirtyDaysAgo = hasHistory ? oldest.healthScore : null;
  const delta = scoreThirtyDaysAgo === null ? null : healthScore - scoreThirtyDaysAgo;

  const daysSinceLastAudit = audit.lastAuditAt
    ? Math.floor((now.getTime() - audit.lastAuditAt.getTime()) / DAY_MS)
    : null;

  const actions = buildActionQueue({
    freshness: [freshness.gsc, freshness.ga],
    weakContent: contentScores.items.filter(
      (i) => i.isLive && (i.band === "poor" || i.band === "needs-work")
    ),
    quickWins,
    top404s,
    audit: {
      pagesAudited: audit.pagesAudited,
      missingSchema: audit.missingSchema,
      daysSinceLastAudit,
    },
  });

  return {
    gsc,
    ga,
    contentHealth: contentAggregate,
    issues,
    freshness,
    topQueries,
    topPages,
    quickWins,
    dailyMetrics: daily,
    health: {
      score: healthScore,
      components,
      trend,
      scoreThirtyDaysAgo,
      delta,
    },
    period: {
      rangeDays,
      gsc: gscBounds._max.date
        ? { from: isoDay(currentFrom), to: isoDay(new Date(gscEnd.getTime() - DAY_MS)) }
        : null,
      ga: gaBounds._max.date
        ? { from: isoDay(gaCurrentFrom), to: isoDay(new Date(gaEnd.getTime() - DAY_MS)) }
        : null,
    },
    audit: {
      pagesAudited: audit.pagesAudited,
      avgScore: audit.avgScore === null ? null : Math.round(audit.avgScore),
      missingSchema: audit.missingSchema,
      lastAuditAt: audit.lastAuditAt ? audit.lastAuditAt.toISOString() : null,
    },
    actions,
  };
}
