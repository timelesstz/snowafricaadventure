/**
 * SEO scoring for admin content lists.
 *
 * Gives editors a fast, non-opinionated read on how "ready to index" a piece
 * of content is. Same rubric regardless of content type, composed from a
 * shared set of check helpers so safaris / routes / destinations / day-trips
 * / blog posts all speak the same language.
 *
 * The thresholds mirror what Google / Ahrefs / SEMrush actually grade on:
 * SERP truncation limits (60-char title, 160-char description), thin-content
 * flags (<300-char body), and structured on-page richness that drives rich
 * snippets and dwell time.
 *
 * Returns a 0-100 score plus a list of check results so the UI can show
 * "why" when the score is low, and aggregate helpers so list pages can show
 * "average 68, 4 poor, 7 need work" headline stats.
 */

export type SeoCheckStatus = "ok" | "warn" | "fail";

export interface SeoCheck {
  label: string;
  status: SeoCheckStatus;
  detail?: string;
  weight: number;
}

export type SeoBand = "excellent" | "good" | "needs-work" | "poor";

export interface SeoScoreResult {
  /** 0-100 */
  score: number;
  band: SeoBand;
  checks: SeoCheck[];
  /** How many checks failed (status === "fail"). */
  failures: number;
}

/**
 * Score boundaries used across the SEO admin (overview "issues" count,
 * content-health backlog filter, etc.). Anything below this is treated as
 * needs-attention. Aligns with the "good" band threshold below.
 */
export const BAD_SCORE_THRESHOLD = 65;

export function bandFor(score: number): SeoBand {
  if (score >= 85) return "excellent";
  if (score >= 65) return "good";
  if (score >= 40) return "needs-work";
  return "poor";
}

// ─── Aggregate helpers ───────────────────────────────────────────────────

export interface AggregateSeoResult {
  count: number;
  average: number;
  bands: Record<SeoBand, number>;
  /** Top failure labels across the whole set, ordered by frequency. */
  topFailures: Array<{ label: string; count: number }>;
}

export function aggregateSeoScores(results: SeoScoreResult[]): AggregateSeoResult {
  if (results.length === 0) {
    return {
      count: 0,
      average: 0,
      bands: { excellent: 0, good: 0, "needs-work": 0, poor: 0 },
      topFailures: [],
    };
  }

  const bands: Record<SeoBand, number> = {
    excellent: 0,
    good: 0,
    "needs-work": 0,
    poor: 0,
  };
  let total = 0;
  const failureCounts = new Map<string, number>();

  for (const r of results) {
    total += r.score;
    bands[r.band]++;
    for (const c of r.checks) {
      if (c.status === "fail") {
        failureCounts.set(c.label, (failureCounts.get(c.label) ?? 0) + 1);
      }
    }
  }

  const topFailures = Array.from(failureCounts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  return {
    count: results.length,
    average: Math.round(total / results.length),
    bands,
    topFailures,
  };
}

// ─── Individual check helpers ────────────────────────────────────────────
// Each helper returns a SeoCheck + the points it awarded (0 .. weight).
// Weights are parameters so per-type scorers can tune them.

interface CheckOutput {
  check: SeoCheck;
  points: number;
}

function checkMetaTitle(value: string | null | undefined, weight = 15): CheckOutput {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return {
      check: {
        label: "Meta title",
        status: "fail",
        detail: "Missing — SERPs will fall back to page title",
        weight,
      },
      points: 0,
    };
  }
  const len = trimmed.length;
  if (len >= 30 && len <= 60) {
    return { check: { label: "Meta title", status: "ok", weight }, points: weight };
  }
  const partial = Math.round(weight * (2 / 3));
  return {
    check: {
      label: "Meta title",
      status: "warn",
      detail:
        len < 30
          ? `Too short (${len}/30 min — Google truncates thin titles)`
          : `Too long (${len}/60 max — will be truncated in SERPs)`,
      weight,
    },
    points: partial,
  };
}

function checkMetaDescription(
  value: string | null | undefined,
  weight = 15
): CheckOutput {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return {
      check: {
        label: "Meta description",
        status: "fail",
        detail: "Missing — Google auto-generates a snippet from page body",
        weight,
      },
      points: 0,
    };
  }
  const len = trimmed.length;
  if (len >= 120 && len <= 160) {
    return {
      check: { label: "Meta description", status: "ok", weight },
      points: weight,
    };
  }
  const partial = Math.round(weight * (2 / 3));
  return {
    check: {
      label: "Meta description",
      status: "warn",
      detail:
        len < 120
          ? `Too short (${len}/120 min — weak SERP click-through)`
          : `Too long (${len}/160 max — will be truncated)`,
      weight,
    },
    points: partial,
  };
}

function checkTitleLength(title: string, weight = 5): CheckOutput {
  const len = title.trim().length;
  if (len >= 20 && len <= 70) {
    return { check: { label: "Title length", status: "ok", weight }, points: weight };
  }
  return {
    check: {
      label: "Title length",
      status: "warn",
      detail:
        len < 20
          ? `Short (${len} chars — less keyword coverage)`
          : `Very long (${len} chars)`,
      weight,
    },
    points: 0,
  };
}

function checkBodyDepth(
  body: string,
  {
    weight = 15,
    minGreat = 300,
    minOk = 150,
    label = "Overview depth",
  }: { weight?: number; minGreat?: number; minOk?: number; label?: string } = {}
): CheckOutput {
  const len = body.trim().length;
  if (len >= minGreat) {
    return { check: { label, status: "ok", weight }, points: weight };
  }
  if (len >= minOk) {
    const partial = Math.round(weight * 0.55);
    return {
      check: {
        label,
        status: "warn",
        detail: `${len} chars — thin; aim for ${minGreat}+`,
        weight,
      },
      points: partial,
    };
  }
  return {
    check: {
      label,
      status: "fail",
      detail: `${len} chars — Google may flag as thin content`,
      weight,
    },
    points: 0,
  };
}

function checkFeaturedImage(url: string | null | undefined, weight = 10): CheckOutput {
  if (url && url.trim().length > 0) {
    return {
      check: { label: "Featured image", status: "ok", weight },
      points: weight,
    };
  }
  return {
    check: {
      label: "Featured image",
      status: "fail",
      detail: "No OG image — social shares won't render a preview",
      weight,
    },
    points: 0,
  };
}

function checkGallery(
  items: string[] | null | undefined,
  weight = 10,
  minGreat = 3
): CheckOutput {
  const len = items?.length ?? 0;
  if (len >= minGreat) {
    return {
      check: { label: `Gallery (${len} images)`, status: "ok", weight },
      points: weight,
    };
  }
  if (len > 0) {
    return {
      check: {
        label: "Gallery",
        status: "warn",
        detail: `Only ${len} image(s) — add ${minGreat - len} more for visual depth`,
        weight,
      },
      points: Math.round(weight / 2),
    };
  }
  return {
    check: {
      label: "Gallery",
      status: "fail",
      detail: "No gallery images",
      weight,
    },
    points: 0,
  };
}

function checkListField(
  items: string[] | null | undefined,
  {
    label,
    weight,
    minGreat = 3,
    emptyDetail,
  }: { label: string; weight: number; minGreat?: number; emptyDetail: string }
): CheckOutput {
  const len = items?.length ?? 0;
  if (len >= minGreat) {
    return {
      check: { label: `${label} (${len})`, status: "ok", weight },
      points: weight,
    };
  }
  if (len > 0) {
    return {
      check: {
        label,
        status: "warn",
        detail: `Only ${len} — aim for ${minGreat}+`,
        weight,
      },
      points: Math.round(weight / 2),
    };
  }
  return {
    check: { label, status: "fail", detail: emptyDetail, weight },
    points: 0,
  };
}

function checkPresence(
  value: unknown,
  {
    label,
    weight,
    emptyDetail,
  }: { label: string; weight: number; emptyDetail: string }
): CheckOutput {
  const isPresent = Array.isArray(value)
    ? value.length > 0
    : value !== null && value !== undefined && value !== "";
  if (isPresent) {
    return { check: { label, status: "ok", weight }, points: weight };
  }
  return {
    check: { label, status: "fail", detail: emptyDetail, weight },
    points: 0,
  };
}

// ─── Shared assembly ─────────────────────────────────────────────────────

function assemble(outputs: CheckOutput[], extraChecks: SeoCheck[] = []): SeoScoreResult {
  const score = outputs.reduce((sum, o) => sum + o.points, 0);
  const checks = [...outputs.map((o) => o.check), ...extraChecks];
  return {
    score,
    band: bandFor(score),
    checks,
    failures: checks.filter((c) => c.status === "fail").length,
  };
}

// ─── Per-type scorers ────────────────────────────────────────────────────

export interface SafariSeoInput {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  overview: string;
  featuredImage?: string | null;
  gallery?: string[] | null;
  highlights?: string[] | null;
  inclusions?: string[] | null;
  exclusions?: string[] | null;
  itinerary?: unknown;
  destinationCount?: number;
}

/**
 * Safari package rubric — 100 pts.
 * meta title 15 · meta description 15 · title len 5 · overview 15 ·
 * featured 10 · gallery 10 · highlights 10 · inclusions 5 · exclusions 5 ·
 * itinerary 10
 */
export function scoreSafariSeo(input: SafariSeoInput): SeoScoreResult {
  const outputs: CheckOutput[] = [
    checkMetaTitle(input.metaTitle),
    checkMetaDescription(input.metaDescription),
    checkTitleLength(input.title),
    checkBodyDepth(input.overview),
    checkFeaturedImage(input.featuredImage),
    checkGallery(input.gallery),
    checkListField(input.highlights, {
      label: "Highlights",
      weight: 10,
      emptyDetail: "No highlights listed",
    }),
    checkListField(input.inclusions, {
      label: "Inclusions",
      weight: 5,
      minGreat: 1,
      emptyDetail: "No inclusions listed",
    }),
    checkListField(input.exclusions, {
      label: "Exclusions",
      weight: 5,
      minGreat: 1,
      emptyDetail: "No exclusions listed",
    }),
    checkPresence(input.itinerary, {
      label: "Itinerary",
      weight: 10,
      emptyDetail: "No day-by-day itinerary",
    }),
  ];
  const extras: SeoCheck[] = [];
  if ((input.destinationCount ?? 0) === 0) {
    extras.push({
      label: "Destinations",
      status: "warn",
      detail: "No destinations linked — weakens internal linking",
      weight: 0,
    });
  }
  return assemble(outputs, extras);
}

export interface RouteSeoInput {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  overview: string;
  featuredImage?: string | null;
  gallery?: string[] | null;
  highlights?: string[] | null;
  inclusions?: string[] | null;
  exclusions?: string[] | null;
  itinerary?: unknown;
  faqs?: unknown;
  guideName?: string | null;
}

/**
 * Trekking route rubric — 100 pts.
 * Adds FAQs (5) as a structured-snippet signal, and guide author (5) as an
 * E-E-A-T signal. Shaves the gallery weight to compensate.
 *
 * meta title 15 · meta description 15 · title 5 · overview 15 ·
 * featured 10 · gallery 5 · highlights 10 · inclusions 5 · exclusions 5 ·
 * itinerary 10 · FAQs 5 · guide attribution 5
 */
export function scoreRouteSeo(input: RouteSeoInput): SeoScoreResult {
  const outputs: CheckOutput[] = [
    checkMetaTitle(input.metaTitle),
    checkMetaDescription(input.metaDescription),
    checkTitleLength(input.title),
    checkBodyDepth(input.overview),
    checkFeaturedImage(input.featuredImage),
    checkGallery(input.gallery, 5),
    checkListField(input.highlights, {
      label: "Highlights",
      weight: 10,
      emptyDetail: "No highlights listed",
    }),
    checkListField(input.inclusions, {
      label: "Inclusions",
      weight: 5,
      minGreat: 1,
      emptyDetail: "No inclusions listed",
    }),
    checkListField(input.exclusions, {
      label: "Exclusions",
      weight: 5,
      minGreat: 1,
      emptyDetail: "No exclusions listed",
    }),
    checkPresence(input.itinerary, {
      label: "Itinerary",
      weight: 10,
      emptyDetail: "No day-by-day itinerary",
    }),
    checkPresence(input.faqs, {
      label: "FAQs",
      weight: 5,
      emptyDetail: "No FAQs — misses rich-snippet eligibility",
    }),
    checkPresence(input.guideName, {
      label: "Guide attribution",
      weight: 5,
      emptyDetail: "No guide credited — weakens E-E-A-T",
    }),
  ];
  return assemble(outputs);
}

export interface DestinationSeoInput {
  name: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  description: string;
  featuredImage?: string | null;
  gallery?: string[] | null;
  highlights?: string[] | null;
  wildlife?: string[] | null;
  bestTime?: string | null;
  safariCount?: number;
}

/**
 * Destination rubric — 100 pts. No itinerary/inclusions; adds wildlife (10)
 * and "best time" (5) which are distinctive to destination landing pages,
 * plus internal linking (5) via `safariCount`.
 *
 * meta title 15 · meta description 15 · name length 5 · description 20 ·
 * featured 10 · gallery 10 · highlights 10 · wildlife 10 · best time 5 ·
 * internal links (safaris) 0 (bonus)
 */
export function scoreDestinationSeo(input: DestinationSeoInput): SeoScoreResult {
  const outputs: CheckOutput[] = [
    checkMetaTitle(input.metaTitle),
    checkMetaDescription(input.metaDescription),
    checkTitleLength(input.name),
    checkBodyDepth(input.description, { weight: 20, label: "Description depth" }),
    checkFeaturedImage(input.featuredImage),
    checkGallery(input.gallery),
    checkListField(input.highlights, {
      label: "Highlights",
      weight: 10,
      emptyDetail: "No highlights listed",
    }),
    checkListField(input.wildlife, {
      label: "Wildlife",
      weight: 10,
      emptyDetail: "No wildlife listed — key search-intent field for destinations",
    }),
    checkPresence(input.bestTime, {
      label: "Best time to visit",
      weight: 5,
      emptyDetail: "No 'best time' — common destination query",
    }),
  ];
  const extras: SeoCheck[] = [];
  if ((input.safariCount ?? 0) === 0) {
    extras.push({
      label: "Linked safaris",
      status: "warn",
      detail: "No safaris use this destination — weak internal linking",
      weight: 0,
    });
  }
  return assemble(outputs, extras);
}

export interface DayTripSeoInput {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  description: string;
  featuredImage?: string | null;
  gallery?: string[] | null;
  highlights?: string[] | null;
  inclusions?: string[] | null;
  exclusions?: string[] | null;
  destination?: string | null;
}

/**
 * Day trip rubric — 100 pts. Lighter than safari/route because day trips
 * have no itinerary, but still needs the commerce-style structure
 * (inclusions/exclusions, pricing cues).
 *
 * meta title 15 · meta description 15 · title 5 · description 20 ·
 * featured 10 · gallery 10 · highlights 10 · inclusions 10 · exclusions 5
 */
export function scoreDayTripSeo(input: DayTripSeoInput): SeoScoreResult {
  const outputs: CheckOutput[] = [
    checkMetaTitle(input.metaTitle),
    checkMetaDescription(input.metaDescription),
    checkTitleLength(input.title),
    checkBodyDepth(input.description, { weight: 20, label: "Description depth" }),
    checkFeaturedImage(input.featuredImage),
    checkGallery(input.gallery),
    checkListField(input.highlights, {
      label: "Highlights",
      weight: 10,
      emptyDetail: "No highlights listed",
    }),
    checkListField(input.inclusions, {
      label: "Inclusions",
      weight: 10,
      minGreat: 2,
      emptyDetail: "No inclusions listed",
    }),
    checkListField(input.exclusions, {
      label: "Exclusions",
      weight: 5,
      minGreat: 1,
      emptyDetail: "No exclusions listed",
    }),
  ];
  const extras: SeoCheck[] = [];
  if (!input.destination) {
    extras.push({
      label: "Destination",
      status: "warn",
      detail: "No destination label — weakens geo relevance",
      weight: 0,
    });
  }
  return assemble(outputs, extras);
}

export interface BlogSeoInput {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  author?: string | null;
  categoryCount?: number;
  tagCount?: number;
  isPublished?: boolean;
}

/**
 * Blog post rubric — 100 pts. Very different shape from tours: content
 * depth dominates because long-form blog content is the ranking driver.
 *
 * meta title 15 · meta description 15 · title 5 · excerpt 10 ·
 * content depth 25 (long-form target 1200+) · featured 10 ·
 * author 5 (E-E-A-T) · categories 5 · tags 5 · published-date cue 5
 */
export function scoreBlogSeo(input: BlogSeoInput): SeoScoreResult {
  const outputs: CheckOutput[] = [
    checkMetaTitle(input.metaTitle),
    checkMetaDescription(input.metaDescription),
    checkTitleLength(input.title),
    checkPresence(input.excerpt, {
      label: "Excerpt",
      weight: 10,
      emptyDetail: "No excerpt — used in feeds, category pages, and social cards",
    }),
    checkBodyDepth(input.content, {
      weight: 25,
      minGreat: 1200,
      minOk: 600,
      label: "Content depth",
    }),
    checkFeaturedImage(input.featuredImage),
    checkPresence(input.author, {
      label: "Author byline",
      weight: 5,
      emptyDetail: "No author — weakens E-E-A-T",
    }),
    checkListField(
      // categoryCount is a number; reuse checkListField by synthesizing an array
      (input.categoryCount ?? 0) > 0
        ? Array(input.categoryCount).fill("")
        : [],
      {
        label: "Categories",
        weight: 5,
        minGreat: 1,
        emptyDetail: "No categories — weak internal linking",
      }
    ),
    checkListField(
      (input.tagCount ?? 0) > 0 ? Array(input.tagCount).fill("") : [],
      {
        label: "Tags",
        weight: 5,
        minGreat: 2,
        emptyDetail: "No tags",
      }
    ),
    checkPresence(input.isPublished, {
      label: "Published",
      weight: 5,
      emptyDetail: "Draft — will not be indexed",
    }),
  ];
  return assemble(outputs);
}
