/**
 * Content ideas for treks/routes and safaris/tours.
 *
 * Search Console queries are grouped into clusters by what they are about
 * (a route, a park, Kilimanjaro in general) and what the searcher wants
 * (price, best time, a 7-day itinerary). Each cluster is then matched to the
 * live page that should answer it:
 * - a page exists but ranks below the top five → refresh that page;
 * - no page exists → write one;
 * - a page already ranks in the top five → covered, not shown.
 *
 * Pages are also checked on their own (traffic falling, close to page one,
 * weak snippet, low content score, not updated in a year, no impressions).
 * Everything here is pure: rows in, findings out.
 */

import type { ContentKind } from "@/lib/seo-overview";
import {
  aggregate,
  aggregateBy,
  ctrGap,
  forecastClicks,
  isStrikingDistance,
  KIND_WEIGHT,
  type Agg,
  type QueryPageRow,
} from "./rules";

export type FocusArea = "route" | "tour";

/** Which content kinds belong to each focus tab. */
export const AREA_KINDS: Record<FocusArea, ContentKind[]> = {
  route: ["route"],
  tour: ["safari", "day-trip"],
};

// ─── Topics: what a search is about ──────────────────────────────────────

export interface Topic {
  id: string;
  label: string;
  area: FocusArea;
  /** True when the topic names one route or park, not a whole category. */
  specific: boolean;
  /** Matches a lower-cased query. */
  query: RegExp;
  /** Matches a page's "slug title" text, lower-cased. */
  content: RegExp;
  /** Extra condition on the query (for words shared by two topics). */
  also?: RegExp;
}

const KILI = /kili(manjaro|mandjaro|mandscharo|manyaro)?\b|uhuru/;

/** Order matters: the first match wins, so specific topics come first. */
export const TOPICS: Topic[] = [
  { id: "machame", label: "Machame Route", area: "route", specific: true, query: /machame/, content: /machame/ },
  { id: "lemosho", label: "Lemosho Route", area: "route", specific: true, query: /lemosho/, content: /lemosho/ },
  { id: "marangu", label: "Marangu Route", area: "route", specific: true, query: /marangu/, content: /marangu/ },
  { id: "rongai", label: "Rongai Route", area: "route", specific: true, query: /rongai/, content: /rongai/ },
  { id: "umbwe", label: "Umbwe Route", area: "route", specific: true, query: /umbwe/, content: /umbwe/ },
  {
    id: "northern-circuit-route",
    label: "Northern Circuit Route",
    area: "route",
    specific: true,
    query: /northern circuit/,
    also: /kili|route|trek|climb|hike/,
    content: /northern-circuit-route|northern circuit route/,
  },
  { id: "shira", label: "Shira Route", area: "route", specific: true, query: /shira/, content: /shira/ },
  { id: "meru", label: "Mount Meru", area: "route", specific: true, query: /\bmeru\b/, content: /meru/ },
  { id: "lengai", label: "Ol Doinyo Lengai", area: "route", specific: true, query: /lengai/, content: /lengai/ },
  { id: "kilimanjaro", label: "Kilimanjaro climb", area: "route", specific: false, query: KILI, content: /kilimanjaro|kili\b/ },
  {
    id: "trekking",
    label: "Trekking in Tanzania",
    area: "route",
    specific: false,
    query: /\b(hik|trek|mountain climb)\w*/,
    also: /tanzania|africa|arusha/,
    content: /trek|hik|climb/,
  },
  { id: "serengeti", label: "Serengeti", area: "tour", specific: true, query: /serengeti/, content: /serengeti/ },
  { id: "ngorongoro", label: "Ngorongoro Crater", area: "tour", specific: true, query: /ngorongoro/, content: /ngorongoro/ },
  { id: "tarangire", label: "Tarangire", area: "tour", specific: true, query: /tarangire/, content: /tarangire/ },
  { id: "manyara", label: "Lake Manyara", area: "tour", specific: true, query: /manyara/, content: /manyara/ },
  { id: "zanzibar", label: "Zanzibar", area: "tour", specific: true, query: /zanzibar/, content: /zanzibar/ },
  { id: "arusha", label: "Arusha", area: "tour", specific: true, query: /arusha/, content: /arusha/ },
  { id: "migration", label: "Great Migration", area: "tour", specific: true, query: /migration/, content: /migration/ },
  { id: "big-five", label: "Big Five safari", area: "tour", specific: true, query: /big ?(5|five)/, content: /big-?(5|five)|big (5|five)/ },
  { id: "camping", label: "Camping safari", area: "tour", specific: true, query: /camping|campsite/, content: /camping/ },
  { id: "walking", label: "Walking safari", area: "tour", specific: true, query: /walking/, also: /safari|tour/, content: /walking/ },
  { id: "safari", label: "Tanzania safari", area: "tour", specific: false, query: /safari|sfari|safary|game drive/, content: /safari/ },
  {
    id: "tanzania-tour",
    label: "Tanzania tours",
    area: "tour",
    specific: false,
    query: /\b(tour|tours|trip|trips|holiday|holidays|itinerary|vacation|touroperator)\b/,
    also: /tanzania|east africa/,
    content: /tanzania|safari|tour/,
  },
];

// ─── Intents: what the searcher wants ────────────────────────────────────

export type IntentId =
  | "comparison"
  | "price"
  | "best-time"
  | "itinerary"
  | "operator"
  | "packing"
  | "difficulty"
  | "dates"
  | "trip-style"
  | "activities"
  | "facts"
  | "general";

export interface Intent {
  id: IntentId;
  label: string;
  query: RegExp;
  /** Page text that shows the page answers this intent. Null = any page on the topic. */
  content: RegExp | null;
  /** Informational intents are best answered by a guide (blog post). */
  informational: boolean;
  refresh: string;
  create: (topic: string, days: number | null) => string;
}

const MONTHS = "january|february|march|april|may|june|july|august|september|october|november|december";

export const INTENTS: Intent[] = [
  {
    id: "comparison",
    label: "Comparison",
    query: /\bvs\.?\b|versus|compare|comparison|which .*(route|safari|park|is best)|\bor\b.+\?/,
    content: /-vs-|\bvs\b|versus|compar|choose|best-route|which/,
    informational: true,
    refresh: "Add a comparison table: days, difficulty, scenery, success rate and price, with a clear recommendation.",
    create: (t) => `Comparison guide: ${t} options side by side`,
  },
  {
    id: "price",
    label: "Cost & prices",
    query: /\b(cost|costs|price|prices|pricing|how much|budget|cheap|cheapest|affordable|kosten|prix|precio|preis)\b/,
    content: /cost|price|how-much|how much|budget/,
    informational: true,
    refresh: "Add a price section: per-person price by group size, what is included, park fees and tips.",
    create: (t) => `Price guide: what ${t} costs`,
  },
  {
    id: "best-time",
    label: "Best time",
    query: new RegExp(`best time|when to|weather|season|rainy|dry season|\\b(${MONTHS})\\b`),
    content: new RegExp(`best-time|best time|weather|season|${MONTHS}`),
    informational: true,
    refresh: "Add a month-by-month section: weather, crowds, wildlife and what that means for booking.",
    create: (t) => `Best time guide: ${t} month by month`,
  },
  {
    id: "itinerary",
    label: "Itinerary",
    query: /\b\d{1,2}\s*-?\s*(day|days|dag|dagen|tage|jours|dias|nights?)\b|itinerary|day by day/,
    content: null,
    informational: false,
    refresh: "Show the day-by-day itinerary near the top: distances, altitudes or drive times, camps and meals.",
    create: (t, days) => (days ? `New itinerary page: ${days}-day ${t}` : `Itinerary page: ${t} day by day`),
  },
  {
    id: "operator",
    label: "Choosing an operator",
    query: /\b(company|companies|operator|operators|touroperator|agency|agencies|outfitter|outfitters|recommend|reviews?)\b/,
    content: /why-choose|why choose|operator|company|companies/,
    informational: false,
    refresh: "Add proof that wins the comparison: guide qualifications, summit or sighting record, porter welfare, real reviews.",
    create: (t) => `Landing page: choosing a ${t} operator`,
  },
  {
    id: "packing",
    label: "Packing list",
    query: /pack|packing|gear|what to (bring|wear|take)|kit list|equipment/,
    content: /pack|gear|what-to-wear|what to wear/,
    informational: true,
    refresh: "Keep one complete packing list and link to it from every related page.",
    create: (t) => `Packing list: ${t}`,
  },
  {
    id: "difficulty",
    label: "Difficulty & fitness",
    query: /difficult|how hard|hardest|easiest|success rate|fitness|altitude|sickness|acclimati|training/,
    content: /difficult|hard|fitness|altitude|acclimati|training|success/,
    informational: true,
    refresh: "Answer difficulty directly: altitude profile, acclimatisation days, success rate and the fitness needed.",
    create: (t) => `Guide: how hard is ${t}?`,
  },
  {
    id: "dates",
    label: "Dates & group departures",
    query: /\b20\d\d\b|departure|departures|dates|join a group|group climb|group trek|group tour/,
    content: /20\d\d|departure|dates|group/,
    informational: false,
    refresh: "List upcoming departure dates with prices and seats left, and link to the booking form.",
    create: (t) => `Departure dates page: ${t}`,
  },
  {
    id: "trip-style",
    label: "Trip style",
    query: /private|luxury|charity|honeymoon|family|families|solo|women|vegan|ethical|porter|sustainable|budget friendly|\buk\b|\busa\b/,
    content: /private|luxury|charity|honeymoon|family|solo|vegan|ethical|porter|sustainab/,
    informational: false,
    refresh: "Add a section for this trip style (private, luxury, charity, ethical), or link to the page that covers it.",
    create: (t) => `Trip-style page: ${t} for this audience`,
  },
  {
    id: "activities",
    label: "Things to do",
    query: /things to do|activities|attractions|what to do|excursion/,
    content: /things-to-do|things to do|activit|attraction|excursion/,
    informational: true,
    refresh: "List the activities with time needed and price, linking to the day trips that include them.",
    create: (t) => `Guide: things to do in ${t}`,
  },
  {
    id: "facts",
    label: "Facts & questions",
    query: /where is|height|how tall|how high|facts|located|location|map|history|meaning|\bwho\b|\bwhat is\b|are there|is there|\bdoes .+ have\b/,
    content: /where-is|where is|facts|height|meaning|history|what-is/,
    informational: true,
    refresh: "Answer the question in the first paragraph, then link to the routes or tours.",
    create: (t) => `Guide: answer the common questions about ${t}`,
  },
  {
    id: "general",
    label: "General",
    query: /.*/,
    content: null,
    informational: false,
    refresh: "Answer the search in the opening lines, add FAQs, and link to this page from related posts.",
    create: (t) => `Main page for ${t}`,
  },
];

const INTENT_BY_ID = new Map(INTENTS.map((i) => [i.id, i]));
export const intentById = (id: IntentId): Intent => INTENT_BY_ID.get(id)!;

const BRAND = /snow[\s-]*africa[\s-]*adventure|^snow africa$/;
const DAYS = /\b(\d{1,2})\s*-?\s*(?:day|days|dag|dagen|tage|jours|dias)\b/;

export interface QueryClass {
  topic: Topic;
  intent: Intent;
  /** Trip length named in the query (itinerary intent only). */
  days: number | null;
}

export function classifyQuery(raw: string): QueryClass | null {
  const q = raw.toLowerCase().replace(/\s+/g, " ").trim();
  if (!q || BRAND.test(q)) return null;
  const topic = TOPICS.find((t) => t.query.test(q) && (!t.also || t.also.test(q)));
  if (!topic) return null;
  const intent = INTENTS.find((i) => i.query.test(q))!;
  let days: number | null = null;
  if (intent.id === "itinerary") {
    const m = q.match(DAYS);
    const n = m ? Number(m[1]) : NaN;
    days = n >= 1 && n <= 30 ? n : null;
  }
  return { topic, intent, days };
}

// ─── Clusters ────────────────────────────────────────────────────────────

export interface ClusterQuery {
  query: string;
  agg: Agg;
}

export interface ClusterPage {
  path: string;
  agg: Agg;
}

export interface IdeaCluster {
  key: string;
  topic: Topic;
  intent: Intent;
  days: number | null;
  agg: Agg;
  /** Biggest first. */
  queries: ClusterQuery[];
  /** Our pages Google showed for these queries, most impressions first. */
  pages: ClusterPage[];
}

export function clusterQueries(rows: QueryPageRow[], { minImpressions = 30 } = {}): IdeaCluster[] {
  const groups = new Map<string, { cls: QueryClass; rows: QueryPageRow[] }>();
  for (const row of rows) {
    const cls = classifyQuery(row.query);
    if (!cls) continue;
    const key = `${cls.topic.id}:${cls.intent.id}${cls.days ? `:${cls.days}` : ""}`;
    const g = groups.get(key);
    if (g) g.rows.push(row);
    else groups.set(key, { cls, rows: [row] });
  }
  const out: IdeaCluster[] = [];
  for (const [key, { cls, rows: list }] of groups) {
    const agg = aggregate(list);
    if (agg.impressions < minImpressions) continue;
    const byQuery = aggregateBy(list, (r) => r.query.toLowerCase().trim());
    const byPage = aggregateBy(list, (r) => r.page);
    out.push({
      key,
      ...cls,
      agg,
      queries: [...byQuery].map(([query, a]) => ({ query, agg: a })).sort((a, b) => b.agg.impressions - a.agg.impressions),
      pages: [...byPage].map(([path, a]) => ({ path, agg: a })).sort((a, b) => b.agg.impressions - a.agg.impressions),
    });
  }
  return out.sort((a, b) => b.agg.impressions - a.agg.impressions);
}

// ─── Matching clusters to pages ──────────────────────────────────────────

export interface IdeaContent {
  id: string;
  kind: ContentKind;
  title: string;
  slug: string;
  path: string;
  isLive: boolean;
}

/**
 * The page an idea points at. Search Console also ranks pages that are not in
 * the CMS (guides built in code, such as /kilimanjaro-prices/), so a target
 * can be a path with no editable record behind it.
 */
export interface IdeaTarget {
  path: string;
  title: string;
  content: IdeaContent | null;
}

const words = (s: string) => s.toLowerCase().replace(/[/-]+/g, " ").trim();
const textOf = (c: IdeaContent) => `${words(c.slug)} ${c.slug.toLowerCase()} ${c.title.toLowerCase()}`;
const pathText = (path: string) => `${words(path)} ${path.toLowerCase()}`;

/** "8 days", "8-day" or "8 day" in a slug or title. */
const daysPattern = (days: number) => new RegExp(`\\b${days}[\\s-]*days?\\b`);

function matches(cluster: IdeaCluster, text: string): boolean {
  if (!cluster.topic.content.test(text)) return false;
  if (cluster.days && !daysPattern(cluster.days).test(text)) return false;
  if (cluster.intent.content && !cluster.intent.content.test(text)) return false;
  return true;
}

/** An itinerary or general search for one route or park wants the bookable page, not a post. */
const wantsBookable = (cluster: IdeaCluster, content: IdeaContent[]) =>
  cluster.topic.specific &&
  !cluster.intent.informational &&
  cluster.intent.content === null &&
  // Only when a bookable page exists; with none, a guide is the best answer.
  content.some((c) => c.isLive && AREA_KINDS[cluster.topic.area].includes(c.kind) && matches(cluster, textOf(c)));

/** Live CMS pages about this cluster's topic and intent, best match first. */
export function candidatePages(cluster: IdeaCluster, content: IdeaContent[]): IdeaContent[] {
  const { topic, intent } = cluster;
  const bookableOnly = wantsBookable(cluster, content);
  const preferred: ContentKind[] = intent.informational ? ["blog", ...AREA_KINDS[topic.area]] : [...AREA_KINDS[topic.area], "blog"];
  const kindRank = (k: ContentKind) => (preferred.includes(k) ? preferred.indexOf(k) : preferred.length);
  // A match in the slug is stronger than one in the title.
  const strength = (c: IdeaContent) => {
    const slug = words(c.slug);
    return (topic.content.test(slug) ? 2 : 0) + (intent.content?.test(slug) ? 2 : 0);
  };
  return content
    .filter((c) => c.isLive && matches(cluster, textOf(c)) && !(bookableOnly && c.kind === "blog"))
    .sort((a, b) => strength(b) - strength(a) || kindRank(a.kind) - kindRank(b.kind) || a.slug.length - b.slug.length);
}

export type IdeaStatus = "refresh" | "new" | "covered";

export interface ContentIdea {
  cluster: IdeaCluster;
  status: IdeaStatus;
  title: string;
  advice: string;
  /** The page to improve (refresh), or null when a new page is needed. */
  target: IdeaTarget | null;
  /** Target's weighted position for these queries (0 = Google does not show it). */
  targetPosition: number;
  /** Our page Google shows most for these queries, when it is not the target. */
  googlePage: ClusterPage | null;
  /** Other pages Google splits these searches across. */
  competing: ClusterPage[];
  /** Bookable route or tour page the target should link to, when the target is a guide. */
  linkTo: IdeaContent | null;
  /** Extra clicks per period if the topic reached position 3. */
  gain: number;
}

/** Top-five rankings that take most of the searches count as covered. */
export const COVERED_POSITION = 5;
/** Share of a cluster's impressions before a page counts as "shown" for it. */
const SHOWN_SHARE = 0.1;

export function buildIdea(cluster: IdeaCluster, content: IdeaContent[]): ContentIdea {
  const { topic, intent, days } = cluster;
  const byPath = new Map(content.map((c) => [c.path, c]));
  const total = cluster.agg.impressions || 1;
  const shown = cluster.pages.filter((p) => p.agg.impressions / total >= SHOWN_SHARE);
  const candidates = candidatePages(cluster, content);
  const bookableOnly = wantsBookable(cluster, content);
  const toTarget = (path: string): IdeaTarget => {
    const c = byPath.get(path) ?? null;
    return { path, title: c?.title ?? path, content: c };
  };

  // 1. The on-topic page Google already ranks best for these searches.
  const rankedMatch = shown
    .filter((p) => {
      const c = byPath.get(p.path);
      if (c && !c.isLive) return false;
      if (c && bookableOnly && c.kind === "blog") return false;
      const text = c ? textOf(c) : pathText(p.path);
      // A broad topic ("Tanzania safari") can be answered by any page on the intent.
      const intentOnly = !topic.specific && intent.content !== null && intent.content.test(text);
      return matches(cluster, text) || intentOnly || candidates.some((x) => x.path === p.path);
    })
    .sort((a, b) => a.agg.position - b.agg.position)[0];
  // 2. Otherwise the best-matching CMS page.
  const target = rankedMatch ? toTarget(rankedMatch.path) : candidates[0] ? toTarget(candidates[0].path) : null;
  const targetRank = target ? cluster.pages.find((p) => p.path === target.path) : undefined;
  const targetPosition = targetRank?.agg.position ?? 0;

  const top = cluster.pages[0] ?? null;
  const googlePage = top && top.path !== target?.path ? top : null;
  const competing = shown.filter((p) => p.path !== target?.path && p.path !== googlePage?.path).slice(0, 3);

  // A guide ranking for one route or park should send readers to the bookable page.
  const bookable = AREA_KINDS[topic.area];
  const linkTo =
    topic.specific && target && !(target.content && bookable.includes(target.content.kind))
      ? (content.find((c) => c.isLive && bookable.includes(c.kind) && topic.content.test(textOf(c)) &&
          (!days || daysPattern(days).test(textOf(c)))) ?? null)
      : null;

  const covered =
    target !== null && targetPosition > 0 && targetPosition <= COVERED_POSITION && (targetRank?.agg.impressions ?? 0) / total >= 0.3;
  const subject = days && intent.id === "itinerary" ? `${days}-day ${topic.label}` : topic.label;
  return {
    cluster,
    status: covered ? "covered" : target ? "refresh" : "new",
    title: `${subject} · ${intent.label}`,
    advice: target ? intent.refresh : intent.create(topic.label, days),
    target,
    targetPosition,
    googlePage,
    competing,
    linkTo,
    gain: forecastClicks(cluster.agg, 3),
  };
}

export function buildIdeas(clusters: IdeaCluster[], content: IdeaContent[]): ContentIdea[] {
  return clusters
    .map((c) => buildIdea(c, content))
    .sort((a, b) => b.gain - a.gain || b.cluster.agg.impressions - a.cluster.agg.impressions);
}

// ─── Page refresh reasons ────────────────────────────────────────────────

export type RefreshCode = "falling" | "query-gap" | "striking" | "snippet" | "weak" | "stale" | "invisible";

export interface RefreshReason {
  code: RefreshCode;
  text: string;
  /** Estimated extra clicks per period; 0 when it can't be estimated. */
  gain: number;
}

export interface RefreshInput {
  agg: Agg;
  previous: Agg;
  score: number;
  fails: string[];
  updatedAt: Date;
  isLive: boolean;
  /** Ideas whose target is this page (status "refresh"). */
  ideas: ContentIdea[];
  days: number;
  hasSearchData: boolean;
}

const DAY_MS = 86_400_000;
export const STALE_DAYS = 365;

const round1 = (n: number) => Math.round(n * 10) / 10;

export function refreshReasons(input: RefreshInput, now = new Date()): RefreshReason[] {
  const { agg, previous, score, fails, updatedAt, isLive, ideas, days, hasSearchData } = input;
  if (!isLive) return [];
  const out: RefreshReason[] = [];

  if (hasSearchData) {
    if (previous.clicks >= 5 && agg.clicks <= previous.clicks * 0.7) {
      out.push({
        code: "falling",
        text: `Clicks fell from ${previous.clicks} to ${agg.clicks} versus the previous ${days} days.`,
        gain: previous.clicks - agg.clicks,
      });
    } else if (previous.impressions >= 50 && agg.impressions >= 50 && agg.position - previous.position >= 3) {
      out.push({
        code: "falling",
        text: `Average position dropped from ${round1(previous.position)} to ${round1(agg.position)}.`,
        gain: Math.max(0, previous.clicks - agg.clicks),
      });
    }

    for (const idea of ideas.slice(0, 3)) {
      const q = idea.cluster.queries[0]?.query ?? idea.cluster.topic.label;
      const where = idea.targetPosition > 0 ? `ranks ${round1(idea.targetPosition)}` : "is not shown";
      const instead = idea.googlePage
        ? ` Google shows ${idea.googlePage.path} (position ${round1(idea.googlePage.agg.position)}) instead: link it to this page.`
        : "";
      out.push({
        code: "query-gap",
        text: `${idea.cluster.agg.impressions.toLocaleString("en-GB")} searches like “${q}” and this page ${where}.${instead} ${idea.advice}`,
        gain: idea.gain,
      });
    }

    if (isStrikingDistance(agg) && agg.impressions >= 50) {
      out.push({
        code: "striking",
        text: `Position ${round1(agg.position)}, close to the top of page one. A stronger page could win the top three.`,
        gain: forecastClicks(agg, 3),
      });
    }

    const gap = ctrGap(agg);
    if (gap) {
      out.push({
        code: "snippet",
        text: `Ranks ${round1(agg.position)} but gets ${(gap.actual * 100).toFixed(1)}% of clicks against about ${(gap.expected * 100).toFixed(1)}% expected. Rewrite the title and description.`,
        gain: gap.missedClicks,
      });
    }

    if (agg.impressions === 0) {
      out.push({
        code: "invisible",
        text: `No Google impressions in ${days} days. Check it is indexed, in the sitemap, and linked from related pages.`,
        gain: 0,
      });
    }
  }

  if (score < 60) {
    out.push({
      code: "weak",
      text: `Content score ${score}/100${fails.length ? `: ${fails.slice(0, 3).join(", ").toLowerCase()}` : ""}.`,
      gain: 0,
    });
  }

  const ageDays = Math.floor((now.getTime() - updatedAt.getTime()) / DAY_MS);
  if (ageDays >= STALE_DAYS) {
    const months = Math.floor(ageDays / 30);
    out.push({
      code: "stale",
      text: `Not updated in ${months} months. Check prices, dates and the itinerary are still right.`,
      gain: 0,
    });
  }
  return out;
}

/** Sort key: estimated clicks first, then exposure and content gaps, weighted by page type. */
export function refreshPriority(kind: ContentKind, reasons: RefreshReason[], score: number, impressions: number): number {
  if (reasons.length === 0) return 0;
  const gain = reasons.reduce((s, r) => s + r.gain, 0);
  const flags = reasons.filter((r) => r.code === "stale" || r.code === "invisible").length;
  const content = (Math.max(0, 100 - score) / 10) * Math.log10(impressions + 10);
  return round1(KIND_WEIGHT[kind] * (gain * 3 + content + flags * 4));
}
