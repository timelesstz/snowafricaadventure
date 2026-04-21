/**
 * SEO Playbook §2.2 + supplement §1.4 — CTR rescue pass 2.
 *
 * Second-pass metaTitle / metaDescription rewrites for three blog posts
 * still under-performing their benchmark CTR after the first pass in
 * commit ec5fbd0:
 *
 *  - how-tall-is-mount-kilimanjaro: lead with exact height number
 *    (kilimanjaro height query crashed #6.7 → #57.6 — snippet wasn't
 *    answering the query)
 *  - weather-in-tanzania: add 2026 freshness signal
 *  - tanzania-itinerary-10-days: ranks #1 with 0 clicks — needs year
 *    + specificity to unlock CTR
 *
 * Also updates traditional-tanzanian-cuisine metaTitle to reclaim the
 * `tanzanian food` query that crashed #1 → #21.6 (now being served by
 * /weather-in-tanzania/ instead — see Commit 5 for the internal-link
 * side of this fix).
 *
 * Run with: npx tsx scripts/update-blog-ctr-pass2.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

interface BlogUpdate {
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

const updates: BlogUpdate[] = [
  {
    slug: "how-tall-is-mount-kilimanjaro",
    metaTitle: "How Tall Is Kilimanjaro? 5,895m (19,341ft) — Exact Height",
    metaDescription:
      "Kilimanjaro stands 5,895m / 19,341ft — Africa's highest peak and the world's tallest free-standing mountain. Height by route, glacier retreat, 2026 summit timeline.",
  },
  {
    slug: "weather-in-tanzania",
    metaTitle: "Tanzania Weather by Month (2026) — Safari & Kili Windows",
    metaDescription:
      "Month-by-month Tanzania weather: rainfall, temps, wildlife, and the peak Kilimanjaro + Serengeti windows. Planned by Arusha guides who work the mountain year-round.",
  },
  {
    slug: "tanzania-itinerary-10-days",
    metaTitle: "10 Days in Tanzania (2026): Safari + Zanzibar Itinerary",
    metaDescription:
      "Day-by-day 10-day Tanzania itinerary from Arusha guides: Serengeti Great Migration, Ngorongoro, Tarangire + Zanzibar beaches. Costs, logistics, best months.",
  },
  {
    slug: "traditional-tanzanian-cuisine",
    metaTitle: "Tanzanian Food Guide (2026): 12 Traditional Dishes to Try",
    metaDescription:
      "Taste Tanzania: ugali, nyama choma, pilau, mandazi, coastal seafood and 7 more. What to order, where to eat, and dishes to try on every safari day.",
  },
];

async function main() {
  console.log("CTR pass 2 — updating 4 blog posts (playbook §2.2 + §5)\n");

  let updated = 0;
  let notFound = 0;

  for (const update of updates) {
    const post = await prisma.blogPost.findUnique({
      where: { slug: update.slug },
      select: { id: true, metaTitle: true, metaDescription: true },
    });

    if (!post) {
      console.log(`  SKIP: "${update.slug}" not found`);
      notFound++;
      continue;
    }

    await prisma.blogPost.update({
      where: { slug: update.slug },
      data: {
        metaTitle: update.metaTitle,
        metaDescription: update.metaDescription,
      },
    });

    console.log(`  OK: ${update.slug}`);
    console.log(`       metaTitle: "${post.metaTitle}"`);
    console.log(`              → "${update.metaTitle}"`);
    updated++;
  }

  console.log(`\nDone — updated ${updated}, not found ${notFound}`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
