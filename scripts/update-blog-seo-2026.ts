/**
 * Updates blog post meta titles/descriptions from 2025 to 2026 for freshness signals
 * Also updates titles where appropriate
 *
 * Run with: npx tsx scripts/update-blog-seo-2026.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

interface BlogUpdate {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  title?: string;
  excerpt?: string;
}

const updates: BlogUpdate[] = [
  {
    slug: "2025-best-time-to-climb-mount-kilimanjaro",
    metaTitle: "Best Time to Climb Kilimanjaro 2026-2027 | Season Guide",
    metaDescription:
      "Updated 2026-2027 Kilimanjaro climbing seasons. Dry seasons (Jan-Mar, Jun-Oct) offer 90%+ success rates. Weather data, crowd levels & booking tips.",
    title: "Best Time to Climb Kilimanjaro 2026-2027 | Season Guide",
    excerpt:
      "Plan your 2026-2027 Kilimanjaro climb with updated weather patterns, best months for clear skies, and insider tips on avoiding peak crowds.",
  },
  {
    slug: "kilimanjaro-climbing-2025",
    metaTitle: "Kilimanjaro Climbing 2026 | New Routes, Prices & Regulations",
    metaDescription:
      "2026 Kilimanjaro updates: new park fees, route changes, and booking requirements. Plan ahead with current prices and availability from $2,200.",
    title: "Kilimanjaro Climbing 2026 | New Routes, Prices & Regulations",
    excerpt:
      "Stay informed about Kilimanjaro climbing in 2026 - updated park fees, route conditions, and what's new for climbers this year.",
  },
  {
    slug: "top-kilimanjaro-adventure-packages-2025",
    metaTitle: "Kilimanjaro Packages 2026 | Best Routes & All-Inclusive Deals",
    title: "Top Kilimanjaro Adventure Packages 2026",
  },
  {
    slug: "kilimanjaro-climbing-predictions-2025",
    metaTitle: "Kilimanjaro 2026-2027: Weather Forecasts & Climbing Trends",
    metaDescription:
      "Expert predictions for Kilimanjaro climbing seasons 2026-2027. Weather patterns, glacier changes, and booking trends. Plan your climb strategically.",
    title: "Kilimanjaro Climbing Predictions 2026-2027",
    excerpt:
      "Get ahead with Kilimanjaro predictions for 2026-2027 - weather forecasts, expected conditions, and emerging trends in climbing.",
  },
  {
    slug: "kilimanjaro-celebrations-2025",
    metaTitle:
      "Celebrate on Kilimanjaro: Birthdays, Proposals & Special Climbs 2026",
    title: "Kilimanjaro Celebrations 2026: Birthdays, Proposals & Special Climbs",
  },
  {
    slug: "kilimanjaro-wildlife-forecast-2025",
    metaTitle: "Kilimanjaro Wildlife Guide 2026: Animals You'll See on Your Climb",
    title: "Kilimanjaro Wildlife Forecast 2026: Animals You'll See on Your Climb",
  },
  {
    slug: "mount-kilimanjaro-packing-list-2025",
    metaTitle: "Kilimanjaro Packing List 2026: Updated Gear Guide",
    title: "Mount Kilimanjaro Packing List 2026: Updated Gear Guide",
  },
  {
    slug: "epic-kilimanjaro-sunrises-2025",
    metaTitle:
      "Kilimanjaro Sunrise 2026: Summit Day Photo Guide & Best Views",
    title: "Epic Kilimanjaro Sunrises 2026: Best Spots to Watch the Dawn Break",
  },
  // Update packing list page metaTitle (already ranking #7)
  {
    slug: "the-ultimate-kilimanjaro-packing-list",
    metaTitle: "Kilimanjaro Packing List 2026: Complete Gear Checklist",
    metaDescription:
      "The definitive Kilimanjaro packing list for 2026. Essential gear, clothing layers, summit night items, and what NOT to bring. Downloadable checklist included.",
  },
  // Update climbing guide metaTitle (target keyword: "climbing kilimanjaro")
  {
    slug: "climbing-kilimanjaro",
    metaTitle: "Climbing Kilimanjaro: Complete 2026 Guide | Routes, Cost & Tips",
    metaDescription:
      "Everything you need to know about climbing Kilimanjaro in 2026. 7 routes compared, costs from $2,000, training plans, and expert tips from 500+ summits.",
  },
  // Update climbing guide metaTitle for 2026
  {
    slug: "climbing-mount-kilimanjaro-2026",
    metaTitle: "Climbing Kilimanjaro 2026: What's New & How to Prepare",
    metaDescription:
      "Latest updates for climbing Kilimanjaro in 2026. New park fees, route conditions, weather forecasts, and preparation guide from local experts.",
  },
];

async function main() {
  console.log("Updating blog post meta data from 2025 to 2026...\n");

  let updated = 0;
  let notFound = 0;

  for (const update of updates) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug: update.slug },
        select: { id: true, title: true, metaTitle: true },
      });

      if (!post) {
        console.log(`  SKIP: "${update.slug}" not found in database`);
        notFound++;
        continue;
      }

      const data: Record<string, string> = {};
      if (update.metaTitle) data.metaTitle = update.metaTitle;
      if (update.metaDescription) data.metaDescription = update.metaDescription;
      if (update.title) data.title = update.title;
      if (update.excerpt) data.excerpt = update.excerpt;

      await prisma.blogPost.update({
        where: { slug: update.slug },
        data,
      });

      console.log(`  OK: "${update.slug}"`);
      if (update.metaTitle) {
        console.log(
          `       metaTitle: "${post.metaTitle}" → "${update.metaTitle}"`
        );
      }
      updated++;
    } catch (error) {
      console.error(`  ERROR updating "${update.slug}":`, error);
    }
  }

  console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
