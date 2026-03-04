/**
 * AI-powered SEO Query Advisor v2
 *
 * Analyzes GSC metrics and generates specific, actionable advice using:
 * - Position-based CTR benchmarks (2024-2026 data)
 * - Search intent classification (informational/transactional/navigational/branded)
 * - Traffic potential estimation (clicks you'd gain by improving)
 * - Keyword cannibalization detection
 * - Numbered action steps per query
 * - CTR performance scoring vs benchmark
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type AdvisorTag =
  | "quick-win"
  | "almost-there"
  | "defend"
  | "wasted"
  | "opportunity"
  | "cannibalized"
  | "branded"
  | "low-priority"
  | "strong";

export type SearchIntent = "informational" | "transactional" | "navigational" | "branded";

export interface QueryAdvice {
  tag: AdvisorTag;
  label: string;
  advice: string;
  actions: string[]; // numbered action steps
  priority: number; // 1 = highest
  color: string;
  textColor: string;
  borderColor: string;
  intent: SearchIntent;
  ctrScore: number; // 0-100, how your CTR compares to benchmark
  trafficPotential: number; // estimated additional clicks/month if optimized
  expectedCtr: number; // benchmark CTR for this position
}

export interface QueryMetrics {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // percentage (e.g. 3.5 = 3.5%)
  position: number;
  topPage?: string | null;
}

export interface TopInsight {
  title: string;
  description: string;
  queries: string[];
  priority: number;
  icon: string; // icon key for frontend
  estimatedGain: number; // total estimated click gain
  color: string;
}

// ─── CTR Benchmarks ──────────────────────────────────────────────────────────

// Google organic CTR by position (Backlinko/AWR/Sistrix 2024 average)
const EXPECTED_CTR: Record<number, number> = {
  1: 27.6,
  2: 15.8,
  3: 11.0,
  4: 8.4,
  5: 6.3,
  6: 4.9,
  7: 3.9,
  8: 3.3,
  9: 2.7,
  10: 2.4,
};

function getExpectedCtr(position: number): number {
  const rounded = Math.min(Math.max(Math.round(position), 1), 100);
  if (rounded <= 10) return EXPECTED_CTR[rounded] || 2.4;
  if (rounded <= 15) return 1.8;
  if (rounded <= 20) return 1.2;
  if (rounded <= 30) return 0.6;
  if (rounded <= 50) return 0.3;
  return 0.1;
}

// CTR score: 0-100 representing how your CTR performs vs expected
function computeCtrScore(actualCtr: number, expectedCtr: number): number {
  if (expectedCtr <= 0) return 50;
  const ratio = actualCtr / expectedCtr;
  // ratio >= 1.2 = 100, ratio 1.0 = 80, ratio 0.5 = 40, ratio 0 = 0
  return Math.min(100, Math.max(0, Math.round(ratio * 80)));
}

// Estimate additional monthly clicks if optimized
function estimateTrafficPotential(q: QueryMetrics, expectedCtr: number): number {
  const currentClicks = q.clicks;
  let targetCtr: number;

  if (q.position <= 3) {
    // Already top 3: aim for expected CTR
    targetCtr = expectedCtr;
  } else if (q.position <= 10) {
    // Page 1: aim for position 3 CTR
    targetCtr = 11.0;
  } else if (q.position <= 20) {
    // Page 2: aim for position 8 CTR (realistic page 1 entry)
    targetCtr = 3.3;
  } else {
    // Deep: aim for position 15 CTR
    targetCtr = 1.8;
  }

  const potentialClicks = Math.round((q.impressions * targetCtr) / 100);
  return Math.max(0, potentialClicks - currentClicks);
}

// ─── Intent Classification ───────────────────────────────────────────────────

const BRAND_TERMS = [
  "snow africa",
  "snowafrica",
  "snow african",
  "snowafricaadventure",
];

const TRANSACTIONAL_SIGNALS = [
  "book", "booking", "price", "cost", "how much", "package", "tour",
  "hire", "buy", "deal", "cheap", "budget", "affordable", "luxury",
  "discount", "offer", "rate", "quote", "inquiry", "departure",
  "group join", "join group",
];

const NAVIGATIONAL_SIGNALS = [
  "login", "contact", "address", "phone", "email", "location",
  "directions", "office", "review", "tripadvisor", "trustpilot",
];

function classifyIntent(query: string): SearchIntent {
  const q = query.toLowerCase();

  if (BRAND_TERMS.some((b) => q.includes(b))) return "branded";
  if (NAVIGATIONAL_SIGNALS.some((s) => q.includes(s))) return "navigational";
  if (TRANSACTIONAL_SIGNALS.some((s) => q.includes(s))) return "transactional";
  return "informational";
}

const INTENT_LABELS: Record<SearchIntent, string> = {
  branded: "Branded",
  transactional: "Transactional",
  navigational: "Navigational",
  informational: "Informational",
};

// ─── Cannibalization Detection ───────────────────────────────────────────────

export function detectCannibalization(
  queries: QueryMetrics[]
): Map<string, string[]> {
  // Group by topPage URL — if multiple queries go to the same page
  // that's not cannibalization. Cannibalization is when the SAME query
  // maps to multiple pages. We detect it from the data we have:
  // queries with very similar text pointing to different pages.
  // Since we only have topPage (1 per query), we look for pages
  // that rank for overlapping keyword clusters.
  const pageQueries = new Map<string, string[]>();

  for (const q of queries) {
    if (!q.topPage) continue;
    const page = q.topPage;
    const existing = pageQueries.get(page) || [];
    existing.push(q.query);
    pageQueries.set(page, existing);
  }

  // Flag pages ranking for 5+ queries — they might be too broad
  const overloaded = new Map<string, string[]>();
  for (const [page, qs] of pageQueries) {
    if (qs.length >= 5) {
      overloaded.set(page, qs);
    }
  }
  return overloaded;
}

// ─── Main Analysis ───────────────────────────────────────────────────────────

export function analyzeQuery(q: QueryMetrics): QueryAdvice {
  const pos = q.position;
  const ctr = q.ctr;
  const clicks = q.clicks;
  const impressions = q.impressions;
  const expectedCtr = getExpectedCtr(pos);
  const ctrScore = computeCtrScore(ctr, expectedCtr);
  const trafficPotential = estimateTrafficPotential(q, expectedCtr);
  const intent = classifyIntent(q.query);

  const base = { ctrScore, trafficPotential, expectedCtr, intent };

  // ── Branded queries get special treatment ──
  if (intent === "branded") {
    if (pos <= 3) {
      return {
        ...base,
        tag: "strong",
        label: "Brand #1",
        advice: `Branded query ranking #${pos.toFixed(1)}. This is expected — your brand should own position 1. CTR is ${ctr}% (benchmark ~${expectedCtr.toFixed(1)}%).`,
        actions: [
          "Ensure sitelinks appear by having clear site structure",
          "Add Organization schema with logo and social profiles",
          "Claim and optimize Google Business Profile",
        ],
        priority: 6,
        color: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
      };
    }
    return {
      ...base,
      tag: "quick-win",
      label: "Brand Not #1",
      advice: `Your own brand query "${q.query}" is at position #${pos.toFixed(1)} — you should be #1. This is unusual and needs immediate attention.`,
      actions: [
        "Check if your homepage title includes your brand name",
        "Ensure consistent NAP (Name, Address, Phone) across all platforms",
        "Build more branded content: about page, press mentions, social profiles",
        "Check Google Search Console for manual actions or penalties",
      ],
      priority: 1,
      color: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    };
  }

  // ── Position 1-3: Top of page 1 ──
  if (pos <= 3 && impressions >= 20) {
    if (ctrScore >= 70) {
      return {
        ...base,
        tag: "strong",
        label: "Top Performer",
        advice: `#${pos.toFixed(1)} with ${ctr}% CTR (${ctrScore >= 90 ? "excellent" : "good"} vs ${expectedCtr.toFixed(1)}% benchmark). ${clicks} clicks from ${impressions.toLocaleString()} impressions.`,
        actions: [
          "Keep content fresh — update dates, stats, and examples quarterly",
          "Monitor competitor SERP features (FAQ, video, featured snippets)",
          "Add internal links FROM this page to lower-performing content",
          intent === "transactional"
            ? "A/B test your CTA and booking form placement on this page"
            : "Add related blog posts section to keep users on site",
        ],
        priority: 5,
        color: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
      };
    }
    // Top 3 but poor CTR
    const ctrGap = expectedCtr - ctr;
    return {
      ...base,
      tag: "quick-win",
      label: "Fix Snippet",
      advice: `#${pos.toFixed(1)} but CTR is ${ctr}% — that's ${ctrGap.toFixed(1)}pp below the ${expectedCtr.toFixed(1)}% benchmark. You're leaving ~${trafficPotential} clicks/period on the table.`,
      actions: [
        `Rewrite title to include "${q.query}" naturally with a compelling hook`,
        "Write meta description (150-160 chars) with clear value proposition and CTA",
        "Add FAQ schema to win more SERP space and push competitors down",
        pos === 1
          ? "Target featured snippet: add a clear definition/answer in first paragraph"
          : "Add HowTo or Review schema for rich snippet eligibility",
        impressions >= 200
          ? `Potential gain: ~${trafficPotential} more clicks/period with benchmark CTR`
          : "Build impression volume through internal linking and content freshness",
      ],
      priority: 1,
      color: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
    };
  }

  // ── Position 4-7: Mid page 1 ──
  if (pos <= 7) {
    if (impressions >= 50 && ctrScore < 50) {
      return {
        ...base,
        tag: "quick-win",
        label: "CTR Crisis",
        advice: `Page 1 (#${pos.toFixed(1)}) with ${impressions.toLocaleString()} impressions but only ${ctr}% CTR (expected ~${expectedCtr.toFixed(1)}%). Your snippet is losing to competitors above and below you.`,
        actions: [
          `Make your title irresistible: include "${q.query}" + a number or year (e.g., "2026 Guide")`,
          "Study top 3 competitors' titles and write something better, not similar",
          "Add review stars, FAQ, or price schema for visual SERP differentiation",
          intent === "transactional"
            ? "Include price range or \"Book Now\" in meta description"
            : "Include a specific number (\"7 routes\", \"5 tips\") in the title",
          `Fix this and gain ~${trafficPotential} clicks/period`,
        ],
        priority: 1,
        color: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
      };
    }
    return {
      ...base,
      tag: "opportunity",
      label: "Push to Top 3",
      advice: `#${pos.toFixed(1)} on page 1 — top 3 gets ${(27.6 + 15.8 + 11.0).toFixed(0)}% of all clicks. You're close but need more authority signals.`,
      actions: [
        "Add 3-5 internal links from your highest-traffic pages to this one",
        "Expand content: add sections competitors cover but you don't",
        "Add expert quotes, original data, or case studies (E-E-A-T signals)",
        intent === "informational"
          ? "Add a comprehensive FAQ section (5+ questions) with schema"
          : "Add social proof: reviews, testimonials, trust badges near CTAs",
        "Ensure page speed: LCP < 2.5s, CLS < 0.1, INP < 200ms",
      ],
      priority: 2,
      color: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-200",
    };
  }

  // ── Position 8-10: Bottom of page 1 ──
  if (pos <= 10) {
    if (ctrScore >= 60) {
      return {
        ...base,
        tag: "defend",
        label: "Defend Page 1",
        advice: `Bottom of page 1 (#${pos.toFixed(1)}) with decent CTR of ${ctr}%. Good click performance for this position, but you risk dropping to page 2.`,
        actions: [
          "Priority: add 3+ internal links to prevent page 2 drop",
          "Update content with fresh data, images, and current-year references",
          "Add a unique angle competitors miss (local expertise, original photos)",
          "Improve page speed and Core Web Vitals",
        ],
        priority: 3,
        color: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
      };
    }
    return {
      ...base,
      tag: "opportunity",
      label: "At Risk",
      advice: `#${pos.toFixed(1)} at the bottom of page 1 with ${ctr}% CTR (below ${expectedCtr.toFixed(1)}% benchmark). At risk of dropping to page 2 where visibility drops 90%.`,
      actions: [
        "Urgently improve title tag — it must stand out at position 8-10",
        "Add schema markup (FAQ, HowTo, or Review) for rich snippets",
        "Build 5+ internal links from topically related pages",
        "Expand content by 30%+ with unique expert insights",
        `If dropped to page 2, you'd lose ~${clicks} clicks/period`,
      ],
      priority: 2,
      color: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
    };
  }

  // ── Position 11-15: Top of page 2 ──
  if (pos <= 15) {
    return {
      ...base,
      tag: "almost-there",
      label: "Page 1 Ready",
      advice: `#${pos.toFixed(1)} — just ${(pos - 10).toFixed(1)} positions from page 1. Google already considers this page relevant. With focused effort, this can reach page 1 for ~${trafficPotential} additional clicks.`,
      actions: [
        `Ensure title starts with or closely matches "${q.query}"`,
        "Add 500+ words of unique expert content (not generic filler)",
        "Build 5+ internal links from your top-traffic pages",
        "Add comprehensive FAQ schema (5-8 questions about this topic)",
        intent === "transactional"
          ? "Add comparison table, pricing section, and clear booking CTA"
          : "Add original images, data tables, or infographics",
        "Check and improve Core Web Vitals on this specific page",
      ],
      priority: 2,
      color: "bg-violet-50",
      textColor: "text-violet-700",
      borderColor: "border-violet-200",
    };
  }

  // ── Position 16-20: Bottom of page 2 ──
  if (pos <= 20) {
    if (impressions >= 100) {
      return {
        ...base,
        tag: "almost-there",
        label: "Needs Content Boost",
        advice: `#${pos.toFixed(1)} with ${impressions.toLocaleString()} impressions — Google ranks you but the content isn't strong enough for page 1 yet. Estimated ${trafficPotential} click gain if pushed to page 1.`,
        actions: [
          "Major content upgrade: aim for the most comprehensive page on this topic",
          "Study the top 3 ranking pages — cover everything they cover plus more",
          "Add structured data: FAQ, HowTo, or TouristTrip schema",
          "Build internal link hub: link from 5+ related pages",
          "Add original media: photos, videos, downloadable resources",
          "Consider creating a supporting blog post that links to this page",
        ],
        priority: 3,
        color: "bg-violet-50",
        textColor: "text-violet-700",
        borderColor: "border-violet-200",
      };
    }
    return {
      ...base,
      tag: "almost-there",
      label: "Build Authority",
      advice: `Page 2 (#${pos.toFixed(1)}) with limited impressions. The content exists but needs more topical authority.`,
      actions: [
        "Ensure H1 and title closely match the search query",
        "Add detailed subsections with H2/H3 headings covering related subtopics",
        "Build 3+ internal links from semantically related pages",
        "Add images with descriptive alt text matching the query",
      ],
      priority: 4,
      color: "bg-slate-100",
      textColor: "text-slate-600",
      borderColor: "border-slate-200",
    };
  }

  // ── Position 21-50: Page 3+ but Google indexes it ──
  if (impressions >= 100 && clicks === 0) {
    return {
      ...base,
      tag: "wasted",
      label: "Zero Clicks",
      advice: `${impressions.toLocaleString()} impressions at #${pos.toFixed(1)} with zero clicks. Google shows your page but it's invisible to users at this depth.`,
      actions: [
        `Create a NEW dedicated page targeting "${q.query}" as the primary keyword`,
        "Structure the new page: exact-match H1, 1500+ words, 5+ subheadings",
        "Add FAQ schema with 5+ questions searchers commonly ask about this topic",
        "Build an internal link cluster: 3+ pages linking to the new content",
        "Consider if this query represents a content gap you should fill",
      ],
      priority: 2,
      color: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    };
  }

  if (impressions >= 30) {
    return {
      ...base,
      tag: "opportunity",
      label: "Content Gap",
      advice: `Position #${pos.toFixed(1)} — Google partially associates your site with "${q.query}" but no page targets it well.`,
      actions: [
        `Evaluate: is "${q.query}" worth a dedicated page? Check search volume`,
        "If yes: create a comprehensive page targeting this exact query",
        "If no: add a section about this topic to your closest existing page",
        "Add internal links from related content",
      ],
      priority: 4,
      color: "bg-slate-50",
      textColor: "text-slate-600",
      borderColor: "border-slate-200",
    };
  }

  // ── Position 50+ or very low impressions ──
  return {
    ...base,
    tag: "low-priority",
    label: "Monitor",
    advice: `Low visibility (#${pos.toFixed(1)}, ${impressions} impressions). Not actionable right now — focus on your page 1 and page 2 queries first for maximum ROI.`,
    actions: [
      "Deprioritize — work on higher-position queries first",
      "Revisit in 30 days to see if position improves naturally",
      "If this is a high-value keyword, consider a long-term content strategy",
    ],
    priority: 6,
    color: "bg-slate-50",
    textColor: "text-slate-400",
    borderColor: "border-slate-100",
  };
}

// ─── Top Insights Generator ──────────────────────────────────────────────────

export function generateTopInsights(queries: QueryMetrics[]): TopInsight[] {
  const analyzed = queries.map((q) => ({ ...q, advice: analyzeQuery(q) }));
  const insights: TopInsight[] = [];

  // 1. Quick wins: CTR below benchmark on page 1
  const quickWins = analyzed.filter(
    (a) => a.advice.tag === "quick-win" && a.impressions >= 20
  );
  if (quickWins.length > 0) {
    const totalGain = quickWins.reduce((sum, q) => sum + q.advice.trafficPotential, 0);
    insights.push({
      title: "Fix These Snippets — Ranking Well But Losing Clicks",
      description: `${quickWins.length} queries rank on page 1 but get below-average CTR. Rewriting titles and meta descriptions alone could gain ~${totalGain} clicks without any ranking improvements needed.`,
      queries: quickWins
        .sort((a, b) => b.advice.trafficPotential - a.advice.trafficPotential)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 1,
      icon: "alert-triangle",
      estimatedGain: totalGain,
      color: "amber",
    });
  }

  // 2. Almost there: Page 2 queries close to page 1
  const almostThere = analyzed.filter(
    (a) => a.advice.tag === "almost-there" && a.impressions >= 20
  );
  if (almostThere.length > 0) {
    const totalGain = almostThere.reduce((sum, q) => sum + q.advice.trafficPotential, 0);
    insights.push({
      title: "Page 2 to Page 1 — Your Biggest Growth Opportunity",
      description: `${almostThere.length} queries sit on page 2 where only 5% of searchers look. Pushing these to page 1 could gain ~${totalGain} clicks. Focus on content depth and internal linking.`,
      queries: almostThere
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 2,
      icon: "trending-up",
      estimatedGain: totalGain,
      color: "violet",
    });
  }

  // 3. Wasted impressions — getting seen but no clicks
  const wasted = analyzed.filter((a) => a.advice.tag === "wasted");
  if (wasted.length > 0) {
    const totalGain = wasted.reduce((sum, q) => sum + q.advice.trafficPotential, 0);
    insights.push({
      title: "Wasted Visibility — Impressions With Zero Clicks",
      description: `${wasted.length} queries get ${wasted.reduce((s, q) => s + q.impressions, 0).toLocaleString()} total impressions but zero clicks. Create dedicated content pages to capture this untapped traffic.`,
      queries: wasted
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 2,
      icon: "eye",
      estimatedGain: totalGain,
      color: "red",
    });
  }

  // 4. At-risk page 1 positions (bottom of page 1)
  const atRisk = analyzed.filter(
    (a) =>
      a.position >= 8 && a.position <= 10 && a.advice.ctrScore < 60 && a.impressions >= 20
  );
  if (atRisk.length > 0) {
    insights.push({
      title: "At-Risk Rankings — Could Drop to Page 2",
      description: `${atRisk.length} queries rank at positions 8-10 with weak CTR. These are vulnerable to dropping to page 2, which would cut visibility by ~90%.`,
      queries: atRisk
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 3,
      icon: "shield-alert",
      estimatedGain: atRisk.reduce((s, q) => s + q.clicks, 0),
      color: "orange",
    });
  }

  // 5. Transactional queries not in top 5 (revenue keywords)
  const revenueQueries = analyzed.filter(
    (a) => a.advice.intent === "transactional" && a.position > 5 && a.impressions >= 10
  );
  if (revenueQueries.length > 0) {
    const totalGain = revenueQueries.reduce((sum, q) => sum + q.advice.trafficPotential, 0);
    insights.push({
      title: "Revenue Keywords Not in Top 5",
      description: `${revenueQueries.length} transactional queries (booking/pricing intent) rank below position 5. These are your money keywords — each click is a potential booking.`,
      queries: revenueQueries
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 2,
      icon: "dollar",
      estimatedGain: totalGain,
      color: "green",
    });
  }

  // 6. Content gaps (position 21+ with decent impressions)
  const contentGaps = analyzed.filter(
    (a) => a.advice.tag === "opportunity" && a.position > 20 && a.impressions >= 30
  );
  if (contentGaps.length > 0) {
    insights.push({
      title: "Content Gaps — Queries You Don't Target",
      description: `${contentGaps.length} queries show your site in deep results, meaning Google sees relevance but you lack dedicated content. Creating targeted pages could capture this traffic.`,
      queries: contentGaps
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 4,
      icon: "file-plus",
      estimatedGain: contentGaps.reduce((s, q) => s + q.advice.trafficPotential, 0),
      color: "slate",
    });
  }

  // 7. Strong performers to celebrate/protect
  const strong = analyzed.filter(
    (a) => (a.advice.tag === "strong" || a.advice.tag === "defend") && a.advice.intent !== "branded"
  );
  if (strong.length > 0) {
    insights.push({
      title: "Your Strongest Performers — Keep These Fresh",
      description: `${strong.length} queries perform well with healthy CTR. These drive ${strong.reduce((s, q) => s + q.clicks, 0)} clicks. Protect them by keeping content updated and monitoring competitors.`,
      queries: strong
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .map((q) => q.query),
      priority: 5,
      icon: "trophy",
      estimatedGain: 0,
      color: "emerald",
    });
  }

  return insights.sort((a, b) => a.priority - b.priority);
}
