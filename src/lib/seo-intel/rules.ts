/**
 * Pure SEO rules shared by the content-health, search-console, analytics and
 * page-analyzer pages. No database access here — every function takes rows and
 * returns findings, so each rule is unit-tested in isolation.
 *
 * Conventions:
 * - CTR is a 0–1 fraction (clicks / impressions), never an average of daily CTRs.
 * - Position is impression-weighted: Σ(position × impressions) / Σ impressions.
 * - GA4 bounce rate is stored as a 0–1 fraction.
 */

import { getExpectedCtr } from "@/lib/seo-dashboard/query-advisor";
import type { ContentKind } from "@/lib/seo-overview";

// ─── Aggregation ─────────────────────────────────────────────────────────

export interface MetricRow {
  clicks: number;
  impressions: number;
  position: number;
}

export interface Agg {
  clicks: number;
  impressions: number;
  /** clicks / impressions, 0–1. */
  ctr: number;
  /** Impression-weighted average position (0 when no impressions). */
  position: number;
}

export const EMPTY_AGG: Agg = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

export function aggregate(rows: Iterable<MetricRow>): Agg {
  let clicks = 0;
  let impressions = 0;
  let posWeight = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    posWeight += r.position * r.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? posWeight / impressions : 0,
  };
}

/** Group rows by a key and aggregate each group with weighted metrics. */
export function aggregateBy<T extends MetricRow>(
  rows: Iterable<T>,
  keyOf: (row: T) => string | null | undefined
): Map<string, Agg> {
  const groups = new Map<string, MetricRow[]>();
  for (const r of rows) {
    const key = keyOf(r);
    if (!key) continue;
    const list = groups.get(key);
    if (list) list.push(r);
    else groups.set(key, [r]);
  }
  const out = new Map<string, Agg>();
  for (const [key, list] of groups) out.set(key, aggregate(list));
  return out;
}

/** Relative change in percent; null when there is no baseline. */
export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

/** Expected CTR (0–1 fraction) at a weighted position. */
export function expectedCtr(position: number): number {
  return getExpectedCtr(position) / 100;
}

// ─── Movers (period over period) ─────────────────────────────────────────

export type MoverKind = "new" | "lost" | "rising" | "falling";

export interface Mover {
  key: string;
  kind: MoverKind;
  current: Agg;
  previous: Agg;
  /** previous.position − current.position: positive = moved up. */
  positionDelta: number;
  clicksDelta: number;
  impressionsDelta: number;
}

export interface MoverOptions {
  /** Minimum impressions in the period that counts, to ignore noise. */
  minImpressions?: number;
  /** Positions gained/lost before a key counts as rising/falling. */
  minPositionChange?: number;
}

export function findMovers(
  current: Map<string, Agg>,
  previous: Map<string, Agg>,
  { minImpressions = 20, minPositionChange = 2 }: MoverOptions = {}
): Mover[] {
  const keys = new Set([...current.keys(), ...previous.keys()]);
  const out: Mover[] = [];
  for (const key of keys) {
    const cur = current.get(key) ?? EMPTY_AGG;
    const prev = previous.get(key) ?? EMPTY_AGG;
    const base = {
      key,
      current: cur,
      previous: prev,
      clicksDelta: cur.clicks - prev.clicks,
      impressionsDelta: cur.impressions - prev.impressions,
    };
    if (prev.impressions === 0 && cur.impressions >= minImpressions) {
      out.push({ ...base, kind: "new", positionDelta: 0 });
      continue;
    }
    if (cur.impressions === 0 && prev.impressions >= minImpressions) {
      out.push({ ...base, kind: "lost", positionDelta: 0 });
      continue;
    }
    if (cur.impressions < minImpressions || prev.impressions < minImpressions) continue;
    const positionDelta = prev.position - cur.position;
    if (positionDelta >= minPositionChange) out.push({ ...base, kind: "rising", positionDelta });
    else if (positionDelta <= -minPositionChange) out.push({ ...base, kind: "falling", positionDelta });
  }
  // Biggest traffic swing first.
  return out.sort(
    (a, b) =>
      Math.abs(b.clicksDelta) - Math.abs(a.clicksDelta) ||
      Math.abs(b.impressionsDelta) - Math.abs(a.impressionsDelta)
  );
}

// ─── Cannibalization (one query, several of our pages) ──────────────────

export interface QueryPageRow extends MetricRow {
  query: string;
  page: string;
}

export interface CannibalPage {
  page: string;
  agg: Agg;
  /** Share of the query's impressions, 0–1. */
  share: number;
}

export interface Cannibalization {
  query: string;
  total: Agg;
  pages: CannibalPage[];
  /** high: two or more competing pages on page one. */
  severity: "high" | "medium";
}

export function detectCannibalization(
  rows: Iterable<QueryPageRow>,
  { minImpressions = 30, minShare = 0.1, maxPosition = 30 } = {}
): Cannibalization[] {
  const byQuery = new Map<string, QueryPageRow[]>();
  for (const r of rows) {
    const list = byQuery.get(r.query);
    if (list) list.push(r);
    else byQuery.set(r.query, [r]);
  }
  const out: Cannibalization[] = [];
  for (const [query, list] of byQuery) {
    const total = aggregate(list);
    if (total.impressions < minImpressions) continue;
    const pages = [...aggregateBy(list, (r) => r.page)]
      .map(([page, agg]) => ({ page, agg, share: agg.impressions / total.impressions }))
      .filter((p) => p.share >= minShare && p.agg.position > 0 && p.agg.position <= maxPosition)
      .sort((a, b) => b.agg.impressions - a.agg.impressions);
    if (pages.length < 2) continue;
    const onPageOne = pages.filter((p) => p.agg.position <= 10).length;
    out.push({ query, total, pages, severity: onPageOne >= 2 ? "high" : "medium" });
  }
  return out.sort((a, b) => b.total.impressions - a.total.impressions);
}

// ─── CTR gaps and ranking forecasts ──────────────────────────────────────

export interface CtrGap {
  expected: number;
  actual: number;
  /** Clicks per period the snippet is losing against the expected CTR. */
  missedClicks: number;
}

/**
 * A page-one result whose CTR is well under the curve for its position — the
 * title or description is losing the click, not the ranking.
 */
export function ctrGap(agg: Agg, { minImpressions = 50, threshold = 0.6 } = {}): CtrGap | null {
  if (agg.impressions < minImpressions || agg.position <= 0 || agg.position > 10) return null;
  const expected = expectedCtr(agg.position);
  if (agg.ctr >= expected * threshold) return null;
  return {
    expected,
    actual: agg.ctr,
    missedClicks: Math.round(agg.impressions * (expected - agg.ctr)),
  };
}

/**
 * Clicks a query or page would earn per period at `targetPosition`, using the
 * same CTR curve. Striking-distance (positions 8–20) is where this pays most.
 */
export function forecastClicks(agg: Agg, targetPosition = 3): number {
  if (agg.impressions === 0) return 0;
  const target = Math.round(agg.impressions * expectedCtr(targetPosition));
  return Math.max(0, target - agg.clicks);
}

export function isStrikingDistance(agg: Agg): boolean {
  return agg.position >= 8 && agg.position <= 20 && agg.impressions >= 20;
}

// ─── Content priority ────────────────────────────────────────────────────

/** Money pages first: a weak trekking route costs more than a weak blog post. */
export const KIND_WEIGHT: Record<ContentKind, number> = {
  route: 1.4,
  safari: 1.3,
  "day-trip": 1.1,
  destination: 1.0,
  blog: 0.8,
};

/**
 * How urgently a piece of content needs work: the score gap weighted by page
 * type and search exposure, plus the clicks a weak snippet is already losing.
 */
export function contentPriority(
  score: number,
  kind: ContentKind,
  impressions: number,
  missedClicks = 0
): number {
  const gap = Math.max(0, 100 - score);
  const w = KIND_WEIGHT[kind];
  const onPage = gap * w * Math.log10(impressions + 10);
  const snippet = missedClicks > 0 ? w * Math.log10(missedClicks + 1) * 20 : 0;
  return Math.round((onPage + snippet) * 10) / 10;
}

// ─── Landing-page (GA4) diagnoses ────────────────────────────────────────

export interface LandingStats {
  sessions: number;
  users: number;
  conversions: number;
  /** Session-weighted, 0–1. */
  bounceRate: number;
  /** Session-weighted, seconds. */
  avgSessionDuration: number;
}

export interface LandingRow {
  sessions: number;
  users: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export function aggregateLanding(rows: Iterable<LandingRow>): LandingStats {
  let sessions = 0;
  let users = 0;
  let conversions = 0;
  let bounceW = 0;
  let durW = 0;
  for (const r of rows) {
    sessions += r.sessions;
    users += r.users;
    conversions += r.conversions;
    bounceW += r.bounceRate * r.sessions;
    durW += r.avgSessionDuration * r.sessions;
  }
  return {
    sessions,
    users,
    conversions,
    bounceRate: sessions > 0 ? bounceW / sessions : 0,
    avgSessionDuration: sessions > 0 ? durW / sessions : 0,
  };
}

export type LandingDiagnosisCode = "high-bounce" | "no-conversions" | "traffic-decay" | "short-visits";

export interface LandingDiagnosis {
  code: LandingDiagnosisCode;
  severity: "high" | "medium";
  message: string;
}

export function diagnoseLanding(
  current: LandingStats,
  previous: LandingStats | null,
  kind: ContentKind | null
): LandingDiagnosis[] {
  const out: LandingDiagnosis[] = [];
  const money = kind === "route" || kind === "safari" || kind === "day-trip";
  if (current.sessions >= 20 && current.bounceRate >= 0.7) {
    out.push({
      code: "high-bounce",
      severity: current.bounceRate >= 0.85 ? "high" : "medium",
      message: `${Math.round(current.bounceRate * 100)}% of visitors leave without a second action. Check that the first screen answers the search and shows the price or next step.`,
    });
  }
  if (money && current.sessions >= 30 && current.conversions === 0) {
    out.push({
      code: "no-conversions",
      severity: "high",
      message: `${current.sessions} organic sessions and no enquiries. Make the enquiry form or WhatsApp button visible without scrolling.`,
    });
  }
  if (previous && previous.sessions >= 20) {
    const change = pctChange(current.sessions, previous.sessions);
    if (change !== null && change <= -30) {
      out.push({
        code: "traffic-decay",
        severity: change <= -50 ? "high" : "medium",
        message: `Organic sessions fell ${Math.abs(Math.round(change))}% against the previous period. Check its rankings in Search Console.`,
      });
    }
  }
  if (current.sessions >= 20 && current.avgSessionDuration > 0 && current.avgSessionDuration < 20) {
    out.push({
      code: "short-visits",
      severity: "medium",
      message: `Visits last ${Math.round(current.avgSessionDuration)}s on average, which suggests the page doesn't match what the searcher wanted.`,
    });
  }
  return out;
}

// ─── Page audits ─────────────────────────────────────────────────────────

export interface AuditIssueLike {
  severity: string;
  field: string;
  message: string;
}

export interface AuditDiff {
  fixed: AuditIssueLike[];
  introduced: AuditIssueLike[];
  scoreDelta: number;
}

const isProblem = (i: AuditIssueLike) => i.severity === "critical" || i.severity === "warning";

/** What changed between two audits of the same URL, matched on field + severity. */
export function diffAudits(
  previous: { score: number; issues: AuditIssueLike[] },
  current: { score: number; issues: AuditIssueLike[] }
): AuditDiff {
  const sig = (i: AuditIssueLike) => `${i.field}:${i.severity}`;
  const prev = new Map(previous.issues.filter(isProblem).map((i) => [sig(i), i]));
  const cur = new Map(current.issues.filter(isProblem).map((i) => [sig(i), i]));
  return {
    fixed: [...prev].filter(([k]) => !cur.has(k)).map(([, i]) => i),
    introduced: [...cur].filter(([k]) => !prev.has(k)).map(([, i]) => i),
    scoreDelta: current.score - previous.score,
  };
}

export function parseAuditIssues(value: unknown): AuditIssueLike[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (i): i is AuditIssueLike =>
      !!i &&
      typeof i === "object" &&
      typeof (i as AuditIssueLike).severity === "string" &&
      typeof (i as AuditIssueLike).field === "string" &&
      typeof (i as AuditIssueLike).message === "string"
  );
}

// ─── Change impact ───────────────────────────────────────────────────────

export type ImpactVerdict = "improved" | "worse" | "flat" | "too-early";

/**
 * Compare equal windows before and after a meta change. Needs at least seven
 * days of after-data and some impressions before it says anything.
 */
export function changeImpact(before: Agg, after: Agg, daysAfter: number): ImpactVerdict {
  if (daysAfter < 7 || before.impressions + after.impressions < 50) return "too-early";
  const ctrChange = pctChange(after.ctr, before.ctr);
  const clickChange = pctChange(after.clicks, before.clicks);
  const signal = ctrChange ?? clickChange ?? 0;
  if (signal >= 15) return "improved";
  if (signal <= -15) return "worse";
  return "flat";
}
