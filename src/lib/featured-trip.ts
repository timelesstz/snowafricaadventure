/**
 * Picks the one trip an article is about, and where in the article to show it.
 *
 * Pure functions (no DB) so they can be unit tested. The blog post page loads
 * the candidate trips and renders the card.
 */

/**
 * Words that name a specific trip. A trip scores on a word only when the word
 * is in its slug, so generic words ("tanzania", "safari", "days") never decide.
 */
const TRIP_WORDS: { word: string; slug: string }[] = [
  // Mountains and routes
  { word: "lemosho", slug: "lemosho" },
  { word: "machame", slug: "machame" },
  { word: "marangu", slug: "marangu" },
  { word: "rongai", slug: "rongai" },
  { word: "umbwe", slug: "umbwe" },
  { word: "northern circuit", slug: "northern-circuit" },
  { word: "meru", slug: "meru" },
  { word: "lengai", slug: "lengai" },
  // Parks and safari styles
  { word: "migration", slug: "migration" },
  { word: "serengeti", slug: "serengeti" },
  { word: "ngorongoro", slug: "ngorongoro" },
  { word: "tarangire", slug: "tarangire" },
  { word: "manyara", slug: "manyara" },
  { word: "zanzibar", slug: "zanzibar" },
  { word: "walking safari", slug: "walking" },
  { word: "camping", slug: "camping" },
  { word: "tented", slug: "tented" },
  { word: "luxury", slug: "luxury" },
  { word: "budget", slug: "budget" },
  { word: "day hike", slug: "day-hike" },
];

/** A word in the post title or slug counts this much more than one in the body. */
const TITLE_WEIGHT = 10;
/** Body mentions are capped so one long list doesn't outweigh the title. */
const MAX_BODY_MENTIONS = 5;

export interface PostText {
  slug: string;
  title: string;
  /** Plain text or HTML of the article body. */
  body: string;
}

function countMentions(haystack: string, word: string): number {
  const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
  return haystack.match(re)?.length ?? 0;
}

/** How strongly the post points at each trip word (0 = not mentioned). */
function wordWeights(post: PostText): Map<string, number> {
  const head = `${post.title} ${post.slug.replace(/-/g, " ")}`;
  const body = post.body.replace(/<[^>]+>/g, " ");
  const weights = new Map<string, number>();
  for (const { word, slug } of TRIP_WORDS) {
    const w =
      (countMentions(head, word) > 0 ? TITLE_WEIGHT : 0) +
      Math.min(countMentions(body, word), MAX_BODY_MENTIONS);
    if (w > 0) weights.set(slug, (weights.get(slug) ?? 0) + w);
  }
  return weights;
}

/**
 * The trip that matches the post best: the trip whose strongest slug word the
 * post leans on most. Scoring on the best single word, not the sum, stops long
 * combo slugs ("machame-...-northern-circuit") winning just by naming more.
 * Ties go to `preferred` order (the trips guests book most), then the summed
 * score, then list order.
 */
export function pickFeaturedTrip<T extends { slug: string }>(
  post: PostText,
  candidates: T[],
  preferred: string[] = []
): T | null {
  if (candidates.length === 0) return null;
  const weights = wordWeights(post);
  const rank = (slug: string) => {
    const i = preferred.indexOf(slug);
    return i === -1 ? preferred.length : i;
  };
  const scored = candidates.map((trip, index) => {
    let best = 0;
    let total = 0;
    for (const [slugWord, w] of weights) {
      if (trip.slug.includes(slugWord)) {
        best = Math.max(best, w);
        total += w;
      }
    }
    return { trip, best, total, index };
  });
  scored.sort(
    (a, b) =>
      b.best - a.best || rank(a.trip.slug) - rank(b.trip.slug) || b.total - a.total || a.index - b.index
  );
  return scored[0].trip;
}

/**
 * Splits article HTML in two so a card can sit between the halves.
 *
 * Uses the h2 nearest the middle, so readers meet the card while they are
 * still reading (the plan-your-trip block already sits at the end). The card
 * never goes after the FAQ heading, and a split point must leave every <div>
 * in the first half closed, so both halves render as valid HTML. Returns null
 * when there is no safe point; the page then shows no in-article card.
 */
export function splitForCard(html: string): [string, string] | null {
  const faq = html.search(/<h2\b[^>]*>\s*(?:Frequently Asked Questions|FAQs?)\b/i);
  const end = faq === -1 ? html.length : faq;
  const isBalanced = (i: number) => {
    const head = html.slice(0, i);
    return (head.match(/<div\b/gi)?.length ?? 0) === (head.match(/<\/div>/gi)?.length ?? 0);
  };
  // Not in the opening fifth: the reader hasn't read anything yet.
  const candidates = [...html.matchAll(/<h2\b/gi)]
    .map((m) => m.index!)
    .filter((i) => i > html.length * 0.2 && i <= end && isBalanced(i));
  if (candidates.length === 0) return null;

  const middle = html.length / 2;
  const point = candidates.reduce((a, b) => (Math.abs(b - middle) < Math.abs(a - middle) ? b : a));
  return [html.slice(0, point), html.slice(point)];
}
