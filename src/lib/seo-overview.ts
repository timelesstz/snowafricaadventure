import prisma from "@/lib/prisma";
import {
  scoreSafariSeo,
  scoreRouteSeo,
  scoreDestinationSeo,
  scoreDayTripSeo,
  scoreBlogSeo,
  aggregateSeoScores,
  type SeoScoreResult,
  type AggregateSeoResult,
} from "@/lib/seo-score";
import {
  computeHealthScore,
  type HealthScoreComponent,
} from "@/lib/seo-health-score";

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

async function dailyGscMetrics(from: Date): Promise<DailyMetric[]> {
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
    WHERE date >= ${from}
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

async function loadFreshness(now: Date): Promise<{ gsc: SyncFreshness; ga: SyncFreshness }> {
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

export async function loadContentScores(): Promise<{
  results: SeoScoreResult[];
  missingMetaDescription: number;
}> {
  const [routes, safaris, destinations, dayTrips, blogPosts] = await Promise.all([
    prisma.trekkingRoute.findMany({}),
    prisma.safariPackage.findMany({ include: { destinations: true } }),
    prisma.destination.findMany({ include: { _count: { select: { safaris: true } } } }),
    prisma.dayTrip.findMany({}),
    prisma.blogPost.findMany({ include: { _count: { select: { categories: true, tags: true } } } }),
  ]);

  const results: SeoScoreResult[] = [];
  let missingMeta = 0;

  const tally = (metaDescription: string | null | undefined) => {
    if (!metaDescription || !metaDescription.trim()) missingMeta++;
  };

  for (const r of routes) {
    tally(r.metaDescription);
    results.push(
      scoreRouteSeo({
        title: r.title,
        metaTitle: r.metaTitle,
        metaDescription: r.metaDescription,
        overview: r.overview,
        featuredImage: r.featuredImage,
        gallery: r.gallery,
        highlights: r.highlights,
        inclusions: r.inclusions,
        exclusions: r.exclusions,
        itinerary: r.itinerary,
        faqs: r.faqs,
        guideName: r.guideName,
      })
    );
  }
  for (const s of safaris) {
    tally(s.metaDescription);
    results.push(
      scoreSafariSeo({
        title: s.title,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        overview: s.overview,
        featuredImage: s.featuredImage,
        gallery: s.gallery,
        highlights: s.highlights,
        inclusions: s.inclusions,
        exclusions: s.exclusions,
        itinerary: s.itinerary,
        destinationCount: s.destinations.length,
      })
    );
  }
  for (const d of destinations) {
    tally(d.metaDescription);
    results.push(
      scoreDestinationSeo({
        name: d.name,
        metaTitle: d.metaTitle,
        metaDescription: d.metaDescription,
        description: d.description,
        featuredImage: d.featuredImage,
        gallery: d.gallery,
        highlights: d.highlights,
        wildlife: d.wildlife,
        bestTime: d.bestTime,
        safariCount: d._count.safaris,
      })
    );
  }
  for (const t of dayTrips) {
    tally(t.metaDescription);
    results.push(
      scoreDayTripSeo({
        title: t.title,
        metaTitle: t.metaTitle,
        metaDescription: t.metaDescription,
        description: t.description,
        featuredImage: t.featuredImage,
        gallery: t.gallery,
        highlights: t.highlights,
        inclusions: t.inclusions,
        exclusions: t.exclusions,
        destination: t.destination,
      })
    );
  }
  for (const p of blogPosts) {
    tally(p.metaDescription);
    results.push(
      scoreBlogSeo({
        title: p.title,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        excerpt: p.excerpt,
        content: p.content,
        featuredImage: p.featuredImage,
        author: p.author,
        categoryCount: p._count.categories,
        tagCount: p._count.tags,
        isPublished: p.isPublished,
      })
    );
  }

  return { results, missingMetaDescription: missingMeta };
}

// ─── Public entry point ──────────────────────────────────────────────────

interface GetSeoOverviewOptions {
  /** Window for GSC/GA summary metrics. Defaults to 7. */
  rangeDays?: number;
  /** Now() override for tests. */
  now?: Date;
}

export async function getSeoOverview(
  options: GetSeoOverviewOptions = {}
): Promise<SeoOverviewData> {
  const now = options.now ?? new Date();
  const rangeDays = options.rangeDays ?? 7;

  const currentFrom = new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000);
  const priorFrom = new Date(now.getTime() - rangeDays * 2 * 24 * 60 * 60 * 1000);

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
    auditAvg,
    active404Count,
    missingSchemaCount,
    freshness,
    snapshotsRaw,
  ] = await Promise.all([
    aggregateGsc(currentFrom, now),
    aggregateGsc(priorFrom, currentFrom),
    aggregateGa4(currentFrom, now),
    aggregateGa4(priorFrom, currentFrom),
    dailyGscMetrics(currentFrom),
    prisma.gscSearchQuery.groupBy({
      by: ["query"],
      where: { date: { gte: currentFrom } },
      _sum: { clicks: true, impressions: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 10,
    }),
    prisma.gscPageMetric.groupBy({
      by: ["page"],
      where: { date: { gte: currentFrom } },
      _sum: { clicks: true, impressions: true },
      orderBy: { _sum: { clicks: "desc" } },
      take: 10,
    }),
    // Quick wins: queries in positions 4-10 with >= 100 impressions over 28 days,
    // ordered by impressions desc.
    prisma.$queryRaw<
      Array<{
        query: string;
        clicks: bigint | number | null;
        impressions: bigint | number | null;
        weighted_position: number | null;
      }>
    >`
      SELECT
        query,
        SUM(clicks)::bigint                                                AS clicks,
        SUM(impressions)::bigint                                           AS impressions,
        (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
      FROM "GscSearchQuery"
      WHERE date >= ${new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000)}
      GROUP BY query
      HAVING SUM(impressions) >= 100
        AND (SUM(position * impressions) / NULLIF(SUM(impressions), 0)) BETWEEN 4 AND 10
      ORDER BY SUM(impressions) DESC
      LIMIT 10
    `,
    loadContentScores(),
    prisma.seoPageAudit.aggregate({ _avg: { score: true }, _count: { _all: true } }),
    prisma.notFoundUrl.count({
      where: { status: "ACTIVE", hitCount: { gte: 5 } },
    }),
    prisma.seoPageAudit.count({ where: { hasSchema: false } }),
    loadFreshness(now),
    prisma.seoHealthSnapshot.findMany({
      where: { date: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } },
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

  // Top queries / pages — recompute weighted CTR/position per group from raw sums.
  // The Prisma groupBy has summed clicks & impressions; we can't easily get
  // weighted position from a single groupBy, so for top-N we query the raw
  // weighted figures separately.
  const queryNames = topQueriesRaw.map((q) => q.query);
  const queryStats = queryNames.length
    ? await prisma.$queryRaw<
        Array<{
          query: string;
          weighted_position: number | null;
        }>
      >`
        SELECT query,
          (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
        FROM "GscSearchQuery"
        WHERE date >= ${currentFrom}
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
    ? await prisma.$queryRaw<
        Array<{
          page: string;
          weighted_position: number | null;
        }>
      >`
        SELECT page,
          (SUM(position * impressions) / NULLIF(SUM(impressions), 0))::float8 AS weighted_position
        FROM "GscPageMetric"
        WHERE date >= ${currentFrom}
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
    };
  });

  // Issue breakdown
  const needsAttention =
    contentAggregate.bands.poor + contentAggregate.bands["needs-work"];
  const issues: IssueBreakdown = {
    needsAttentionContent: needsAttention,
    active404s: active404Count,
    missingMetaDescription: contentScores.missingMetaDescription,
    missingSchema: missingSchemaCount,
    total:
      needsAttention +
      active404Count +
      contentScores.missingMetaDescription +
      missingSchemaCount,
  };

  // Health score with renormalized components
  const { score: healthScore, components } = computeHealthScore({
    contentHealthScore: contentAggregate.average,
    weightedCtr: gsc.hasData ? gscCurrent.ctr : null,
    weightedPosition: gsc.hasData ? gscCurrent.position : null,
    active404s: active404Count,
    auditAvg: auditAvg._count._all > 0 ? auditAvg._avg.score : null,
    contentCount: contentAggregate.count,
  });

  const trend = snapshotsRaw.map((s) => ({
    date: s.date.toISOString().split("T")[0],
    score: s.healthScore,
  }));
  const scoreThirtyDaysAgo = trend.length > 0 ? trend[0].score : null;
  const delta = scoreThirtyDaysAgo === null ? null : healthScore - scoreThirtyDaysAgo;

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
  };
}
