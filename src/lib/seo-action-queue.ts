/**
 * "Fix next" queue for the /admin/seo overview.
 *
 * Pure (no Prisma) so the ranking rules are unit-tested. The overview loader
 * gathers the inputs; this decides what an editor should do first.
 *
 * Ranking: severity first (high > medium > low), then estimated impact within
 * a severity. Money pages (routes, safaris) outrank blog posts at equal score
 * because they are where bookings start.
 */

import type { ContentKind } from "@/lib/seo-overview";

export type ActionSeverity = "high" | "medium" | "low";
export type ActionCategory = "data" | "errors" | "rankings" | "content" | "technical";

export interface SeoAction {
  id: string;
  severity: ActionSeverity;
  category: ActionCategory;
  title: string;
  detail: string;
  href: string;
  cta: string;
  /** Higher sorts first within a severity. Unitless. */
  impact: number;
}

export interface ActionQueueInput {
  freshness: Array<{
    source: "GSC" | "GA4";
    status: "COMPLETED" | "FAILED" | "RUNNING" | "NEVER";
    hoursAgo: number | null;
    error: string | null;
  }>;
  /** Live items scoring below the "good" band, any order. */
  weakContent: Array<{
    id: string;
    kind: ContentKind;
    title: string;
    editHref: string;
    score: number;
    failedChecks: string[];
  }>;
  quickWins: Array<{
    query: string;
    impressions: number;
    clicks: number;
    position: number;
    page: string | null;
  }>;
  top404s: Array<{ url: string; hitCount: number; humanHitCount: number }>;
  audit: { pagesAudited: number; missingSchema: number; daysSinceLastAudit: number | null };
}

/** Assumed CTR at position 3 for the quick-win estimate (travel SERPs, conservative). */
export const CTR_AT_POSITION_3 = 0.1;
const STALE_SYNC_HOURS = 48;
const MAX_CONTENT_ACTIONS = 5;
const MAX_QUICK_WIN_ACTIONS = 4;
const MAX_404_ACTIONS = 3;

const KIND_WEIGHT: Record<ContentKind, number> = {
  route: 1.5,
  safari: 1.5,
  destination: 1.2,
  "day-trip": 1.1,
  blog: 1,
};

const KIND_LABEL: Record<ContentKind, string> = {
  route: "Trekking route",
  safari: "Safari",
  destination: "Destination",
  "day-trip": "Day trip",
  blog: "Blog post",
};

const SEVERITY_RANK: Record<ActionSeverity, number> = { high: 0, medium: 1, low: 2 };

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

/** Extra clicks over the window if the query reached position 3. Never negative. */
export function estimateQuickWinGain(impressions: number, clicks: number): number {
  return Math.max(0, Math.round(impressions * CTR_AT_POSITION_3 - clicks));
}

export function buildActionQueue(input: ActionQueueInput): SeoAction[] {
  const actions: SeoAction[] = [];

  for (const f of input.freshness) {
    if (f.status === "FAILED") {
      actions.push({
        id: `sync-failed:${f.source}`,
        severity: "high",
        category: "data",
        title: `${f.source} sync failed`,
        detail: f.error
          ? `Last error: ${f.error.slice(0, 140)}`
          : "The last sync did not finish. Figures below may be out of date.",
        href: "/admin/seo/settings",
        cta: "Open settings",
        impact: 1000,
      });
    } else if (f.status === "COMPLETED" && f.hoursAgo !== null && f.hoursAgo >= STALE_SYNC_HOURS) {
      actions.push({
        id: `sync-stale:${f.source}`,
        severity: "high",
        category: "data",
        title: `${f.source} data is ${Math.round(f.hoursAgo / 24)} days old`,
        detail: "The daily sync has not completed recently. Run it from settings.",
        href: "/admin/seo/settings",
        cta: "Run sync",
        impact: 900,
      });
    }
  }

  for (const e of input.top404s.slice(0, MAX_404_ACTIONS)) {
    actions.push({
      id: `404:${e.url}`,
      severity: e.humanHitCount >= 10 ? "high" : "medium",
      category: "errors",
      title: `Redirect ${pathOf(e.url)}`,
      detail: `${e.hitCount} hits on a missing page (${e.humanHitCount} from people). Add a 301 to the closest live page.`,
      href: "/admin/404-monitor",
      cta: "Add redirect",
      impact: e.humanHitCount * 10 + e.hitCount,
    });
  }

  // One action per ranking page: ten queries on the same article are one job.
  const groups = new Map<string, ActionQueueInput["quickWins"]>();
  for (const q of input.quickWins) {
    const key = q.page ? pathOf(q.page) : `query:${q.query}`;
    groups.set(key, [...(groups.get(key) ?? []), q]);
  }
  const quickWinActions = [...groups.entries()]
    .map(([key, qs]) => {
      const gain = qs.reduce((sum, q) => sum + estimateQuickWinGain(q.impressions, q.clicks), 0);
      const impressions = qs.reduce((sum, q) => sum + q.impressions, 0);
      const lead = [...qs].sort((a, b) => b.impressions - a.impressions)[0];
      const isPage = !key.startsWith("query:");
      return {
        id: `quick-win:${key}`,
        severity: (gain >= 20 ? "medium" : "low") as ActionSeverity,
        category: "rankings" as const,
        title: isPage
          ? qs.length === 1
            ? `Push ${key} into the top 3 for "${lead.query}"`
            : `Push ${key} into the top 3 for ${qs.length} queries`
          : `Push "${lead.query}" into the top 3`,
        detail:
          qs.length === 1
            ? `Ranks #${lead.position} with ${lead.impressions.toLocaleString()} impressions in 28 days. Reaching #3 is worth about ${gain} more clicks a month.`
            : `Ranks #4–10 for "${lead.query}" and ${qs.length - 1} similar queries (${impressions.toLocaleString()} impressions in 28 days). Reaching #3 is worth about ${gain} more clicks a month.`,
        href: `/admin/seo/search-console?query=${encodeURIComponent(lead.query)}`,
        cta: "See queries",
        impact: gain,
      };
    })
    .filter((a) => a.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, MAX_QUICK_WIN_ACTIONS);
  actions.push(...quickWinActions);

  const content = [...input.weakContent]
    .map((c) => ({ ...c, weighted: (100 - c.score) * KIND_WEIGHT[c.kind] }))
    .sort((a, b) => b.weighted - a.weighted)
    .slice(0, MAX_CONTENT_ACTIONS);
  for (const c of content) {
    const money = c.kind === "route" || c.kind === "safari";
    actions.push({
      id: `content:${c.kind}:${c.id}`,
      severity: c.score < 40 && money ? "high" : c.score < 40 || money ? "medium" : "low",
      category: "content",
      title: `Improve ${c.title}`,
      detail: `${KIND_LABEL[c.kind]} scores ${c.score}/100.${
        c.failedChecks.length ? ` Missing: ${c.failedChecks.slice(0, 3).join(", ")}.` : ""
      }`,
      href: c.editHref,
      cta: "Edit",
      impact: c.weighted,
    });
  }

  if (input.audit.pagesAudited === 0) {
    actions.push({
      id: "audit:none",
      severity: "low",
      category: "technical",
      title: "No pages audited yet",
      detail: "Run the page audit automation to check titles, headings, schema and alt text on live pages.",
      href: "/admin/seo/page-analyzer",
      cta: "Open analyzer",
      impact: 1,
    });
  } else if (input.audit.missingSchema > 0) {
    actions.push({
      id: "audit:schema",
      severity: "low",
      category: "technical",
      title: `${input.audit.missingSchema} audited page${input.audit.missingSchema === 1 ? "" : "s"} without structured data`,
      detail: "Pages with no JSON-LD lose rich results. Check each in the page analyzer.",
      href: "/admin/seo/page-analyzer",
      cta: "Review",
      impact: input.audit.missingSchema,
    });
  }

  return actions.sort(
    (a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] || b.impact - a.impact
  );
}
