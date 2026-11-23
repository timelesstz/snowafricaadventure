import prisma from "@/lib/prisma";
import { anchorWindowEnd } from "@/lib/seo-overview";
import { pathKey } from "./paths";
import { aggregate, type Agg, type LandingStats, type QueryPageRow } from "./rules";

/**
 * Server loaders for the SEO intelligence pages. All Search Console windows end
 * on the last day that actually has data (GSC lags 2–3 days), and every metric
 * is aggregated in SQL with impression weighting so CTR and position are right.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

export const PERIODS = [7, 28, 90] as const;
export type PeriodDays = (typeof PERIODS)[number];

export function parsePeriod(value: unknown, fallback: PeriodDays = 28): PeriodDays {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return (PERIODS as readonly number[]).includes(n) ? (n as PeriodDays) : fallback;
}

export interface Window {
  start: Date;
  /** Exclusive. */
  end: Date;
  prevStart: Date;
  days: number;
  /** Last day with data, or null when the table is empty. */
  latest: Date | null;
}

function buildWindow(latest: Date | null, days: number, now: Date): Window {
  const end = anchorWindowEnd(latest, now);
  const start = new Date(end.getTime() - days * DAY_MS);
  return { start, end, prevStart: new Date(start.getTime() - days * DAY_MS), days, latest };
}

export async function gscWindow(days: number, now = new Date()): Promise<Window> {
  const agg = await prisma.gscPageMetric.aggregate({ _max: { date: true } });
  return buildWindow(agg._max.date ?? null, days, now);
}

export async function gaWindow(days: number, now = new Date()): Promise<Window> {
  const agg = await prisma.gaOrganicMetric.aggregate({ _max: { date: true } });
  return buildWindow(agg._max.date ?? null, days, now);
}

// ─── Search Console ──────────────────────────────────────────────────────

interface RawSum {
  clicks: number | bigint | null;
  impressions: number | bigint | null;
  pos_w: number | null;
}

const num = (v: number | bigint | null | undefined) => Number(v ?? 0);

function toAgg(r: RawSum): Agg {
  const clicks = num(r.clicks);
  const impressions = num(r.impressions);
  const posW = Number(r.pos_w ?? 0);
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? posW / impressions : 0,
  };
}

/** Query × page rows for one window (the grain cannibalization needs). */
export async function queryPageRows(start: Date, end: Date): Promise<QueryPageRow[]> {
  const rows = await prisma.$queryRaw<Array<RawSum & { query: string; page: string | null }>>`
    SELECT query, page,
           SUM(clicks)::int                     AS clicks,
           SUM(impressions)::int                AS impressions,
           SUM(position * impressions)::float8  AS pos_w
    FROM "GscSearchQuery"
    WHERE date >= ${start} AND date < ${end}
    GROUP BY query, page
  `;
  return rows.map((r) => {
    const agg = toAgg(r);
    return { query: r.query, page: pathKey(r.page), clicks: agg.clicks, impressions: agg.impressions, position: agg.position };
  });
}

/** Page totals for one window, keyed by path. */
export async function pageAggs(start: Date, end: Date): Promise<Map<string, Agg>> {
  const rows = await prisma.$queryRaw<Array<RawSum & { page: string }>>`
    SELECT page,
           SUM(clicks)::int                     AS clicks,
           SUM(impressions)::int                AS impressions,
           SUM(position * impressions)::float8  AS pos_w
    FROM "GscPageMetric"
    WHERE date >= ${start} AND date < ${end}
    GROUP BY page
  `;
  // Several raw URLs (http/https, query strings) can share one path.
  const grouped = new Map<string, Agg[]>();
  for (const r of rows) {
    const key = pathKey(r.page);
    const list = grouped.get(key) ?? [];
    list.push(toAgg(r));
    grouped.set(key, list);
  }
  const out = new Map<string, Agg>();
  for (const [key, list] of grouped) out.set(key, aggregate(list));
  return out;
}

export interface DailyPoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function gscDaily(start: Date, end: Date): Promise<DailyPoint[]> {
  const rows = await prisma.$queryRaw<Array<RawSum & { date: Date }>>`
    SELECT date,
           SUM(clicks)::int                     AS clicks,
           SUM(impressions)::int                AS impressions,
           SUM(position * impressions)::float8  AS pos_w
    FROM "GscPageMetric"
    WHERE date >= ${start} AND date < ${end}
    GROUP BY date
    ORDER BY date
  `;
  return rows.map((r) => ({ date: r.date.toISOString().slice(0, 10), ...toAgg(r) }));
}

/** Per-day totals for one path (page analyzer, change impact). */
export async function pageDaily(path: string, start: Date, end: Date): Promise<DailyPoint[]> {
  const rows = await prisma.$queryRaw<Array<RawSum & { date: Date; page: string }>>`
    SELECT date, page,
           SUM(clicks)::int                     AS clicks,
           SUM(impressions)::int                AS impressions,
           SUM(position * impressions)::float8  AS pos_w
    FROM "GscPageMetric"
    WHERE date >= ${start} AND date < ${end}
      AND page ILIKE ${"%" + path + "%"}
    GROUP BY date, page
    ORDER BY date
  `;
  const byDay = new Map<string, Agg[]>();
  for (const r of rows) {
    if (pathKey(r.page) !== path) continue;
    const d = r.date.toISOString().slice(0, 10);
    byDay.set(d, [...(byDay.get(d) ?? []), toAgg(r)]);
  }
  return [...byDay].map(([date, list]) => ({ date, ...aggregate(list) }));
}

/** Top queries for one path in a window (AI context, page analyzer). */
export async function topQueriesForPath(path: string, start: Date, end: Date, limit = 15) {
  const rows = await prisma.$queryRaw<Array<RawSum & { query: string; page: string | null }>>`
    SELECT query, page,
           SUM(clicks)::int                     AS clicks,
           SUM(impressions)::int                AS impressions,
           SUM(position * impressions)::float8  AS pos_w
    FROM "GscSearchQuery"
    WHERE date >= ${start} AND date < ${end}
      AND page ILIKE ${"%" + path + "%"}
    GROUP BY query, page
  `;
  const byQuery = new Map<string, Agg[]>();
  for (const r of rows) {
    if (pathKey(r.page) !== path) continue;
    byQuery.set(r.query, [...(byQuery.get(r.query) ?? []), toAgg(r)]);
  }
  return [...byQuery]
    .map(([query, list]) => ({ query, ...aggregate(list) }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

// ─── GA4 organic ─────────────────────────────────────────────────────────

interface RawLanding {
  sessions: number | bigint | null;
  users: number | bigint | null;
  new_users: number | bigint | null;
  conversions: number | bigint | null;
  bounce_w: number | null;
  dur_w: number | null;
}

function toLanding(r: RawLanding): LandingStats & { newUsers: number } {
  const sessions = num(r.sessions);
  return {
    sessions,
    users: num(r.users),
    newUsers: num(r.new_users),
    conversions: num(r.conversions),
    bounceRate: sessions > 0 ? Number(r.bounce_w ?? 0) / sessions : 0,
    avgSessionDuration: sessions > 0 ? Number(r.dur_w ?? 0) / sessions : 0,
  };
}

export async function landingAggs(start: Date, end: Date): Promise<Map<string, LandingStats>> {
  const rows = await prisma.$queryRaw<Array<RawLanding & { landing: string | null }>>`
    SELECT "landingPage" AS landing,
           SUM(sessions)::int                          AS sessions,
           SUM(users)::int                             AS users,
           SUM("newUsers")::int                        AS new_users,
           SUM(conversions)::int                       AS conversions,
           SUM("bounceRate" * sessions)::float8        AS bounce_w,
           SUM("avgSessionDuration" * sessions)::float8 AS dur_w
    FROM "GaOrganicMetric"
    WHERE date >= ${start} AND date < ${end}
    GROUP BY "landingPage"
  `;
  const out = new Map<string, LandingStats>();
  for (const r of rows) {
    if (!r.landing) continue;
    const key = pathKey(r.landing);
    const cur = toLanding(r);
    const prev = out.get(key);
    if (!prev) {
      out.set(key, cur);
      continue;
    }
    const sessions = prev.sessions + cur.sessions;
    out.set(key, {
      sessions,
      users: prev.users + cur.users,
      conversions: prev.conversions + cur.conversions,
      bounceRate: sessions > 0 ? (prev.bounceRate * prev.sessions + cur.bounceRate * cur.sessions) / sessions : 0,
      avgSessionDuration:
        sessions > 0 ? (prev.avgSessionDuration * prev.sessions + cur.avgSessionDuration * cur.sessions) / sessions : 0,
    });
  }
  return out;
}

export interface LandingDaily {
  date: string;
  sessions: number;
  users: number;
  newUsers: number;
  conversions: number;
  bounceRate: number;
}

export async function gaDaily(start: Date, end: Date): Promise<LandingDaily[]> {
  const rows = await prisma.$queryRaw<Array<RawLanding & { date: Date }>>`
    SELECT date,
           SUM(sessions)::int                          AS sessions,
           SUM(users)::int                             AS users,
           SUM("newUsers")::int                        AS new_users,
           SUM(conversions)::int                       AS conversions,
           SUM("bounceRate" * sessions)::float8        AS bounce_w,
           SUM("avgSessionDuration" * sessions)::float8 AS dur_w
    FROM "GaOrganicMetric"
    WHERE date >= ${start} AND date < ${end}
    GROUP BY date
    ORDER BY date
  `;
  return rows.map((r) => {
    const l = toLanding(r);
    return {
      date: r.date.toISOString().slice(0, 10),
      sessions: l.sessions,
      users: l.users,
      newUsers: l.newUsers,
      conversions: l.conversions,
      bounceRate: l.bounceRate,
    };
  });
}

export async function gaTotals(start: Date, end: Date) {
  const [row] = await prisma.$queryRaw<RawLanding[]>`
    SELECT SUM(sessions)::int                          AS sessions,
           SUM(users)::int                             AS users,
           SUM("newUsers")::int                        AS new_users,
           SUM(conversions)::int                       AS conversions,
           SUM("bounceRate" * sessions)::float8        AS bounce_w,
           SUM("avgSessionDuration" * sessions)::float8 AS dur_w
    FROM "GaOrganicMetric"
    WHERE date >= ${start} AND date < ${end}
  `;
  return toLanding(row ?? { sessions: 0, users: 0, new_users: 0, conversions: 0, bounce_w: 0, dur_w: 0 });
}

// ─── Page audits ─────────────────────────────────────────────────────────

/** Latest audit per URL (excluding local dev audits), worst score first. */
export async function latestAudits(limit = 200) {
  return prisma.$queryRaw<
    Array<{ id: string; url: string; score: number; createdAt: Date; title: string | null; runs: number }>
  >`
    SELECT a.id, a.url, a.score, a."createdAt", a.title, c.runs
    FROM (
      SELECT DISTINCT ON (url) id, url, score, "createdAt", title
      FROM "SeoPageAudit"
      WHERE url NOT ILIKE '%localhost%' AND url NOT ILIKE '%127.0.0.1%'
      ORDER BY url, "createdAt" DESC
    ) a
    JOIN (
      SELECT url, COUNT(*)::int AS runs FROM "SeoPageAudit" GROUP BY url
    ) c ON c.url = a.url
    ORDER BY a.score ASC, a."createdAt" DESC
    LIMIT ${limit}
  `;
}

// ─── Meta change log + impact ────────────────────────────────────────────

export interface ChangeWithImpact {
  id: string;
  path: string;
  contentKind: string;
  contentId: string;
  field: string;
  before: string | null;
  after: string | null;
  source: string;
  userEmail: string | null;
  createdAt: Date;
  daysAfter: number;
  beforeAgg: Agg;
  afterAgg: Agg;
}

/**
 * Recent meta changes with equal-length GSC windows either side of the change
 * (up to 14 days, capped by how much data exists after it).
 */
export async function recentChangesWithImpact(limit = 12, now = new Date()): Promise<ChangeWithImpact[]> {
  const [changes, latestAgg] = await Promise.all([
    prisma.seoContentChange.findMany({ orderBy: { createdAt: "desc" }, take: limit }).catch((error: unknown) => {
      // P2021: the SeoContentChange table has not been pushed to this database yet.
      if ((error as { code?: string })?.code === "P2021") {
        console.warn("[seo-intel] SeoContentChange table missing; run db:push to enable the change log");
        return [];
      }
      throw error;
    }),
    prisma.gscPageMetric.aggregate({ _max: { date: true } }),
  ]);
  if (changes.length === 0) return [];
  const dataEnd = anchorWindowEnd(latestAgg._max.date ?? null, now);

  return Promise.all(
    changes.map(async (c) => {
      const changeDay = new Date(c.createdAt);
      changeDay.setUTCHours(0, 0, 0, 0);
      const afterStart = new Date(changeDay.getTime() + DAY_MS);
      const daysAfter = Math.max(0, Math.min(14, Math.floor((dataEnd.getTime() - afterStart.getTime()) / DAY_MS)));
      const span = Math.max(daysAfter, 7);
      const beforeStart = new Date(changeDay.getTime() - span * DAY_MS);
      const [before, after] = await Promise.all([
        pageDaily(c.path, beforeStart, changeDay),
        daysAfter > 0 ? pageDaily(c.path, afterStart, new Date(afterStart.getTime() + daysAfter * DAY_MS)) : [],
      ]);
      return {
        id: c.id,
        path: c.path,
        contentKind: c.contentKind,
        contentId: c.contentId,
        field: c.field,
        before: c.before,
        after: c.after,
        source: c.source,
        userEmail: c.userEmail,
        createdAt: c.createdAt,
        daysAfter,
        beforeAgg: aggregate(before),
        afterAgg: aggregate(after),
      };
    })
  );
}
