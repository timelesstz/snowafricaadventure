/**
 * AI-powered SEO Query Advisor
 *
 * Analyzes GSC metrics (clicks, impressions, CTR, position) for each query
 * and generates specific, actionable advice. No LLM needed — uses expert
 * SEO rules calibrated to real CTR benchmarks by position.
 */

export type AdvisorTag =
  | "quick-win"
  | "almost-there"
  | "defend"
  | "wasted"
  | "opportunity"
  | "low-priority"
  | "strong";

export interface QueryAdvice {
  tag: AdvisorTag;
  label: string;
  advice: string;
  priority: number; // 1 = highest
  color: string; // tailwind bg class
  textColor: string;
}

interface QueryMetrics {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // already as percentage (e.g. 3.5 = 3.5%)
  position: number;
  topPage?: string | null;
}

// Expected CTR by position (Google organic, approximate 2024-2026 benchmarks)
const EXPECTED_CTR: Record<number, number> = {
  1: 28,
  2: 15,
  3: 11,
  4: 8,
  5: 6.5,
  6: 5,
  7: 4,
  8: 3.2,
  9: 2.8,
  10: 2.5,
};

function getExpectedCtr(position: number): number {
  const rounded = Math.round(position);
  if (rounded <= 0) return 28;
  if (rounded <= 10) return EXPECTED_CTR[rounded] || 2.5;
  if (rounded <= 20) return 1.5;
  return 0.5;
}

export function analyzeQuery(q: QueryMetrics): QueryAdvice {
  const pos = q.position;
  const ctr = q.ctr;
  const clicks = q.clicks;
  const impressions = q.impressions;
  const expectedCtr = getExpectedCtr(pos);

  // === Position 1-3: You're winning ===
  if (pos <= 3 && impressions >= 50) {
    if (ctr >= expectedCtr * 0.7) {
      return {
        tag: "strong",
        label: "Performing Well",
        advice: `Ranking #${pos.toFixed(1)} with healthy CTR. Defend this position: keep content fresh, maintain internal links, and monitor for competitor changes.`,
        priority: 5,
        color: "bg-emerald-50",
        textColor: "text-emerald-700",
      };
    }
    return {
      tag: "quick-win",
      label: "Fix Title/Meta",
      advice: `You're #${pos.toFixed(1)} but CTR is ${ctr}% (expected ~${expectedCtr}%). Your title tag or meta description isn't compelling enough. Rewrite with a stronger hook, numbers, or a clear benefit. Consider adding FAQ schema for more SERP real estate.`,
      priority: 1,
      color: "bg-amber-50",
      textColor: "text-amber-700",
    };
  }

  // === Position 4-10: Page 1, room to grow ===
  if (pos <= 10) {
    if (impressions >= 100 && ctr < expectedCtr * 0.5) {
      return {
        tag: "quick-win",
        label: "CTR Too Low",
        advice: `Page 1 (#${pos.toFixed(1)}) with ${impressions.toLocaleString()} impressions but only ${ctr}% CTR. Your snippet is losing clicks to competitors. Rewrite title to include the exact query, add a compelling meta description with a CTA, and implement FAQ or HowTo schema for rich snippets.`,
        priority: 1,
        color: "bg-red-50",
        textColor: "text-red-700",
      };
    }
    if (impressions >= 50 && ctr >= expectedCtr * 0.7) {
      return {
        tag: "defend",
        label: "Protect Position",
        advice: `Solid #${pos.toFixed(1)} ranking with good CTR. To push higher: add 2-3 internal links from high-authority pages, expand content depth, and update with fresh data or examples.`,
        priority: 3,
        color: "bg-blue-50",
        textColor: "text-blue-700",
      };
    }
    return {
      tag: "opportunity",
      label: "Push Higher",
      advice: `Ranking #${pos.toFixed(1)} — close to top 3 where most clicks happen. Add comprehensive FAQ section, improve content depth, build 3+ internal links pointing here, and ensure page speed is optimal.`,
      priority: 2,
      color: "bg-indigo-50",
      textColor: "text-indigo-700",
    };
  }

  // === Position 11-20: Page 2, the "almost there" zone ===
  if (pos <= 20) {
    if (impressions >= 100) {
      return {
        tag: "almost-there",
        label: "Push to Page 1",
        advice: `#${pos.toFixed(1)} with ${impressions.toLocaleString()} impressions — Google sees this page as relevant but not authoritative enough. Action: add 500+ words of expert content, build 5+ internal links, add schema markup, and ensure the title includes the exact search query.`,
        priority: 2,
        color: "bg-violet-50",
        textColor: "text-violet-700",
      };
    }
    return {
      tag: "almost-there",
      label: "Strengthen Content",
      advice: `Ranking #${pos.toFixed(1)} on page 2. To break into page 1: ensure your H1 and title match the query closely, add detailed sections competitors don't cover, include original images/data, and build internal links from related content.`,
      priority: 3,
      color: "bg-violet-50",
      textColor: "text-violet-700",
    };
  }

  // === Position 21+: Deep rankings ===
  if (impressions >= 200 && clicks === 0) {
    return {
      tag: "wasted",
      label: "Zero Clicks",
      advice: `${impressions.toLocaleString()} impressions but zero clicks at position #${pos.toFixed(1)}. This page appears in results but nobody clicks. Either create a dedicated page targeting this exact query, or if the current page doesn't match intent, write new content specifically for "${q.query}".`,
      priority: 2,
      color: "bg-red-50",
      textColor: "text-red-700",
    };
  }

  if (impressions >= 50) {
    return {
      tag: "opportunity",
      label: "Needs Dedicated Content",
      advice: `Position #${pos.toFixed(1)} — too deep for clicks but Google shows this page for the query. Consider creating a dedicated, comprehensive page targeting "${q.query}" as the primary keyword with 1000+ words, proper heading structure, and internal linking.`,
      priority: 4,
      color: "bg-slate-50",
      textColor: "text-slate-600",
    };
  }

  return {
    tag: "low-priority",
    label: "Monitor",
    advice: `Low visibility (position #${pos.toFixed(1)}, ${impressions} impressions). Not worth optimizing right now unless this is a high-value keyword. Focus resources on your page 1 and page 2 queries first.`,
    priority: 6,
    color: "bg-slate-50",
    textColor: "text-slate-500",
  };
}

/**
 * Generate a prioritized summary of the top opportunities across all queries
 */
export function generateTopInsights(
  queries: QueryMetrics[]
): { title: string; description: string; queries: string[]; priority: number }[] {
  const analyzed = queries.map((q) => ({ ...q, advice: analyzeQuery(q) }));
  const insights: { title: string; description: string; queries: string[]; priority: number }[] = [];

  // Quick wins: Page 1 but CTR below expected
  const quickWins = analyzed.filter(
    (a) => a.advice.tag === "quick-win" && a.impressions >= 50
  );
  if (quickWins.length > 0) {
    insights.push({
      title: "Fix These Titles — You're Ranking But Not Getting Clicks",
      description: `${quickWins.length} queries rank on page 1 but have below-average CTR. Rewriting titles and meta descriptions could immediately increase traffic without improving rankings.`,
      queries: quickWins.slice(0, 5).map((q) => q.query),
      priority: 1,
    });
  }

  // Almost there: Page 2 with decent impressions
  const almostThere = analyzed.filter(
    (a) => a.advice.tag === "almost-there" && a.impressions >= 50
  );
  if (almostThere.length > 0) {
    insights.push({
      title: "Page 2 Queries — Small Push Needed for Page 1",
      description: `${almostThere.length} queries are on page 2 with significant impressions. Adding content depth, internal links, and schema markup could push them to page 1 where 95% of clicks happen.`,
      queries: almostThere.slice(0, 5).map((q) => q.query),
      priority: 2,
    });
  }

  // Zero clicks with high impressions
  const wasted = analyzed.filter((a) => a.advice.tag === "wasted");
  if (wasted.length > 0) {
    insights.push({
      title: "Wasted Impressions — Visible But Zero Clicks",
      description: `${wasted.length} queries get significant impressions but zero clicks. Create dedicated content pages targeting these exact queries to capture this lost traffic.`,
      queries: wasted.slice(0, 5).map((q) => q.query),
      priority: 2,
    });
  }

  // Strong performers to protect
  const strong = analyzed.filter(
    (a) => a.advice.tag === "strong" || a.advice.tag === "defend"
  );
  if (strong.length > 0) {
    insights.push({
      title: "Protect These Rankings — Your Best Performers",
      description: `${strong.length} queries are performing well. Keep content updated, maintain internal links, and monitor for competitors moving in.`,
      queries: strong.slice(0, 5).map((q) => q.query),
      priority: 4,
    });
  }

  return insights.sort((a, b) => a.priority - b.priority);
}
