/**
 * SEO playbook §7 + §5 — internal linking pass.
 *
 * Five top-impression informational blog posts currently trap their
 * authority inside the post. This script:
 *
 *   1. For each of those posts, looks for specific unlinked anchor
 *      phrases in the post body and wraps them in an <a href>.
 *   2. Appends a small "Ready to climb / plan your safari" CTA block
 *      near the end of the post body (before closing </article>
 *      markup if present, else appended).
 *
 * Plus the playbook §5 "tanzanian food" triage fix: inside
 * /weather-in-tanzania/, add one internal link to
 * /traditional-tanzanian-cuisine/ so Google re-associates that query
 * with the cuisine page.
 *
 * IDEMPOTENT — if the anchor or CTA block is already in the body the
 * script skips that operation. Safe to re-run.
 *
 * Run with: npx tsx scripts/add-internal-links-to-blog.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

interface LinkRule {
  // Phrase to search for in the content (first unlinked match only).
  phrase: string;
  // URL the phrase should link to.
  href: string;
  // Optional: replace with a different anchor text than the phrase.
  anchorText?: string;
}

interface PostUpdate {
  slug: string;
  rules: LinkRule[];
  ctaBlock: string;
  ctaMarker: string;
}

const CTA_KILI = `
<div class="sa-internal-cta" data-internal-cta="mount-kilimanjaro" style="margin:2.5rem 0;padding:1.5rem;border-left:4px solid #2563eb;background:#f8fafc;border-radius:0.5rem;">
  <p style="margin:0 0 0.75rem 0;font-weight:700;font-size:1.05rem;">Ready to climb Kilimanjaro yourself?</p>
  <p style="margin:0 0 1rem 0;">We run KPAP-member small-group and private climbs year-round from Arusha.</p>
  <p style="margin:0;">
    <a href="/mount-kilimanjaro/">Complete Kilimanjaro climbing guide</a> ·
    <a href="/kilimanjaro-join-group-departures/">Upcoming group departures</a> ·
    <a href="/kilimanjaro-prices/">Pricing breakdown</a>
  </p>
</div>
`.trim();

const CTA_SAFARI = `
<div class="sa-internal-cta" data-internal-cta="tanzania-safaris" style="margin:2.5rem 0;padding:1.5rem;border-left:4px solid #ea580c;background:#fff7ed;border-radius:0.5rem;">
  <p style="margin:0 0 0.75rem 0;font-weight:700;font-size:1.05rem;">Ready to plan a Tanzania safari?</p>
  <p style="margin:0 0 1rem 0;">We design small-group and tailor-made safaris through the Serengeti, Ngorongoro, Tarangire and beyond.</p>
  <p style="margin:0;">
    <a href="/tanzania-safaris/">Safari packages</a> ·
    <a href="/tanzania-itinerary-10-days/">10-day Tanzania itinerary</a> ·
    <a href="/tailor-made-safari/">Build a custom trip</a>
  </p>
</div>
`.trim();

const posts: PostUpdate[] = [
  {
    slug: "kilimanjaro-vs-everest",
    rules: [
      { phrase: "plan your Kilimanjaro climb", href: "/mount-kilimanjaro/" },
      { phrase: "8-day Lemosho route", href: "/trekking/8-days-lemosho-route/" },
      { phrase: "Kilimanjaro pricing breakdown", href: "/kilimanjaro-prices/" },
    ],
    ctaBlock: CTA_KILI,
    ctaMarker: 'data-internal-cta="mount-kilimanjaro"',
  },
  {
    slug: "is-there-snow-in-africa-mountains",
    rules: [
      { phrase: "summit Kilimanjaro yourself", href: "/mount-kilimanjaro/" },
      {
        phrase: "best months to see snow on Kili",
        href: "/best-time-to-climb-kilimanjaro/",
      },
      {
        phrase: "join a group departure",
        href: "/kilimanjaro-join-group-departures/",
      },
    ],
    ctaBlock: CTA_KILI,
    ctaMarker: 'data-internal-cta="mount-kilimanjaro"',
  },
  {
    slug: "hunting-strategy-of-the-lions",
    rules: [
      { phrase: "Serengeti safari packages", href: "/tanzania-safaris/" },
      {
        phrase: "Tanzania safari itineraries",
        href: "/tanzania-itinerary-10-days/",
      },
      { phrase: "plan a Tanzania safari", href: "/tailor-made-safari/" },
    ],
    ctaBlock: CTA_SAFARI,
    ctaMarker: 'data-internal-cta="tanzania-safaris"',
  },
  {
    slug: "how-tall-is-mount-kilimanjaro",
    rules: [
      { phrase: "climb to the 5,895m summit", href: "/mount-kilimanjaro/" },
      { phrase: "8-day Lemosho route", href: "/trekking/8-days-lemosho-route/" },
      { phrase: "how hard Kilimanjaro is", href: "/how-hard-is-kilimanjaro/" },
    ],
    ctaBlock: CTA_KILI,
    ctaMarker: 'data-internal-cta="mount-kilimanjaro"',
  },
  {
    slug: "amazing-teamwork-of-lions",
    rules: [
      {
        phrase: "watch lion prides on a Serengeti safari",
        href: "/tanzania-safaris/",
      },
      { phrase: "plan your Tanzania safari", href: "/tailor-made-safari/" },
      {
        phrase: "10-day Tanzania itinerary",
        href: "/tanzania-itinerary-10-days/",
      },
    ],
    ctaBlock: CTA_SAFARI,
    ctaMarker: 'data-internal-cta="tanzania-safaris"',
  },
  // Playbook §5 triage: /weather-in-tanzania/ is ranking for "tanzanian food"
  // because no strong page-to-query signal exists from the cuisine post's
  // topic cluster. Add an explicit internal link from weather → cuisine.
  {
    slug: "weather-in-tanzania",
    rules: [
      {
        phrase: "Tanzanian cuisine",
        href: "/traditional-tanzanian-cuisine/",
      },
      {
        phrase: "traditional Tanzanian food",
        href: "/traditional-tanzanian-cuisine/",
        anchorText: "traditional Tanzanian food",
      },
    ],
    ctaBlock: "",
    ctaMarker: "",
  },
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Try to replace the first unlinked instance of `phrase` in `html`
 * with an <a href>. Skips if the phrase is already inside an <a>.
 * Returns the new HTML (unchanged if no safe replacement was possible)
 * and a boolean indicating whether it mutated.
 */
function addLink(
  html: string,
  rule: LinkRule
): { html: string; changed: boolean } {
  const anchor = rule.anchorText ?? rule.phrase;

  // Already linked? (any <a> wrapping the phrase)
  const alreadyLinkedRe = new RegExp(
    `<a[^>]*href=["']${escapeRegExp(rule.href)}["'][^>]*>[^<]*${escapeRegExp(
      rule.phrase
    )}`,
    "i"
  );
  if (alreadyLinkedRe.test(html)) {
    return { html, changed: false };
  }

  // Find first occurrence of the phrase that is NOT already inside an <a>.
  // Simple heuristic: replace only if the phrase appears outside any
  // <a>...</a> span. We split on <a> tags and walk the non-anchor chunks.
  const parts = html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/i);
  for (let i = 0; i < parts.length; i++) {
    // Anchor blocks are at odd indices by the split pattern — skip them.
    if (/^<a\b/i.test(parts[i])) continue;
    const idx = parts[i].indexOf(rule.phrase);
    if (idx === -1) continue;
    const before = parts[i].slice(0, idx);
    const after = parts[i].slice(idx + rule.phrase.length);
    parts[i] =
      before + `<a href="${rule.href}">${anchor}</a>` + after;
    return { html: parts.join(""), changed: true };
  }
  return { html, changed: false };
}

async function main() {
  console.log("Internal linking pass — playbook §7 + §5\n");

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
      select: { id: true, content: true },
    });
    if (!existing) {
      console.log(`  SKIP: ${post.slug} not found`);
      continue;
    }

    let html = existing.content;
    let linksAdded = 0;
    let linksSkipped = 0;

    for (const rule of post.rules) {
      const result = addLink(html, rule);
      if (result.changed) {
        html = result.html;
        linksAdded++;
      } else {
        linksSkipped++;
      }
    }

    let ctaAdded = false;
    if (post.ctaBlock && post.ctaMarker && !html.includes(post.ctaMarker)) {
      html = html + "\n\n" + post.ctaBlock;
      ctaAdded = true;
    }

    if (linksAdded === 0 && !ctaAdded) {
      console.log(
        `  OK (no-op): ${post.slug} — already has all links and CTA`
      );
      continue;
    }

    await prisma.blogPost.update({
      where: { slug: post.slug },
      data: { content: html },
    });

    console.log(
      `  OK: ${post.slug} — +${linksAdded} link(s), ${linksSkipped} skipped${
        ctaAdded ? ", +CTA block" : ""
      }`
    );
  }

  console.log("\nDone.");
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
