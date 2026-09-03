/**
 * Shorten over-length blog post <title> tags.
 *
 * The root layout appends " | Snow Africa Adventure" (24 chars) via the
 * metadata title template, so the page part must stay <= 36 chars to keep the
 * rendered <title> under Google's ~60 char / 580px truncation point.
 *
 * Additive only — every write targets a single record by slug and touches the
 * metaTitle field alone. Each fix verifies the current value first and skips
 * if it has already been corrected or edited to something unexpected, so the
 * script is safe to re-run.
 *
 * Usage: npx tsx scripts/fix-long-meta-titles.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

/** Length of " | Snow Africa Adventure" added by the layout title template. */
const BRAND_SUFFIX_LENGTH = 24;
const MAX_RENDERED_TITLE = 60;

const META_TITLE_FIXES = [
  {
    slug: "kilimanjaro-corporate-teams",
    from: "Corporate Team Building on Kilimanjaro: Planning Guide",
    to: "Kilimanjaro Corporate Team Building",
  },
  {
    slug: "kilimanjaro-diary",
    from: "Kilimanjaro Day-by-Day Diary: Lemosho Route Guide",
    to: "Kilimanjaro Lemosho Day-by-Day Diary",
  },
  {
    slug: "kilimanjaro-flora",
    from: "Kilimanjaro Plants & Flora: Guide to Five Climate Zones",
    to: "Kilimanjaro Plants & Flora by Zone",
  },
  {
    slug: "kilimanjaro-for-couples",
    from: "Climbing Kilimanjaro as a Couple: Tips & Preparation",
    to: "Climbing Kilimanjaro as a Couple",
  },
  {
    slug: "kilimanjaro-oxygen-levels",
    from: "Oxygen Levels on Kilimanjaro: Elevation & Effects",
    to: "Kilimanjaro Oxygen Levels & Altitude",
  },
  {
    slug: "kilimanjaro-photography-gear",
    from: "Best Camera Gear for Kilimanjaro: Phone, Camera & GoPro",
    to: "Best Camera Gear for Kilimanjaro",
  },
  {
    slug: "kilimanjaro-returning-climbers",
    from: "Climbing Kilimanjaro Again: Guide for Returning Climbers",
    to: "Climbing Kilimanjaro Again: A Guide",
  },
];

/**
 * Second batch: the remaining published posts whose rendered <title> ran over
 * 60 chars. Several also carried their own " | " separator, which the layout
 * template doubled into "... | ... | Snow Africa Adventure" — those are
 * rewritten to a single separator.
 */
const META_TITLE_FIXES_2 = [
  { slug: "2025-best-time-to-climb-mount-kilimanjaro", from: "Best Time to Climb Kilimanjaro 2026-2027 | Season Guide", to: "Best Time to Climb Kilimanjaro 2026" },
  { slug: "amazing-teamwork-of-lions", from: "How Lion Prides Hunt Together (Explained)", to: "How Lion Prides Hunt Together" },
  { slug: "climbing-kilimanjaro-in-december", from: "Climbing Kilimanjaro in December: Guide", to: "Climbing Kilimanjaro in December" },
  { slug: "climbing-kilimanjaro-in-june", from: "Climbing Kilimanjaro in June: Best Value", to: "Climbing Kilimanjaro in June" },
  { slug: "climbing-kilimanjaro-in-may", from: "Climbing Kilimanjaro in May: Honest Guide", to: "Climbing Kilimanjaro in May" },
  { slug: "climbing-mount-meru-why-you-should-climb-it-before-climbing-kilimanjaro", from: "Why Climb Mount Meru Before Kilimanjaro | Acclimatization Guide", to: "Climb Mount Meru Before Kilimanjaro" },
  { slug: "first-person-to-climb-kilimanjaro", from: "First to Climb Kilimanjaro: Full History", to: "First Person to Climb Kilimanjaro" },
  { slug: "how-much-to-climb-kilimanjaro", from: "Kilimanjaro Cost 2026: Real Prices from $1,800 to $6,000+", to: "Kilimanjaro Cost 2026: Real Prices" },
  { slug: "kilimanjaro-acclimatization", from: "Kilimanjaro Acclimatization Guide (2026)", to: "Kilimanjaro Acclimatization Guide" },
  { slug: "kilimanjaro-crater-camp", from: "Kilimanjaro Crater Camp: Sleep at 5,729m", to: "Kilimanjaro Crater Camp at 5,729m" },
  { slug: "kilimanjaro-first-aid-kit", from: "Kilimanjaro First Aid Kit Checklist 2026", to: "Kilimanjaro First Aid Kit Checklist" },
  { slug: "kilimanjaro-group-climbing", from: "Kilimanjaro Group Climbing | Shared Adventures & Lower Costs", to: "Kilimanjaro Group Climbing" },
  { slug: "kilimanjaro-lemosho-route-guide", from: "Kilimanjaro Lemosho Route: Complete Guide", to: "Kilimanjaro Lemosho Route Guide" },
  { slug: "kilimanjaro-packing-mistakes", from: "15 Kilimanjaro Packing Mistakes to Avoid", to: "15 Kilimanjaro Packing Mistakes" },
  { slug: "kilimanjaro-uhuru-peak", from: "Uhuru Peak: Africa's Highest Point Guide", to: "Uhuru Peak: Africa's Highest Point" },
  { slug: "kilimanjaro-umbwe-route", from: "Umbwe Route: Kilimanjaro's Steepest Route", to: "Umbwe Route: Kilimanjaro's Steepest" },
  { slug: "kilimanjaro-vs-aconcagua", from: "Kilimanjaro vs Aconcagua: Full Comparison", to: "Kilimanjaro vs Aconcagua Compared" },
  { slug: "lake-manyara-national-park-guide", from: "Lake Manyara National Park Guide (2026)", to: "Lake Manyara National Park Guide" },
  { slug: "serengeti-great-migration-guide", from: "Serengeti Great Migration Guide (2026)", to: "Serengeti Great Migration Guide" },
  { slug: "tanzania-beach-holidays", from: "Tanzania Beach Holidays: Zanzibar, Mafia & Coastal Escapes", to: "Tanzania Beach Holidays & Zanzibar" },
  { slug: "tanzania-safari-packing-list", from: "Safari Packing List | What to Bring (2026 Guide)", to: "Tanzania Safari Packing List" },
  { slug: "top-kilimanjaro-adventure-packages-2025", from: "Kilimanjaro Packages 2026 | Best Routes & All-Inclusive Deals", to: "Best Kilimanjaro Packages 2026" },
  { slug: "zanzibar-diving-snorkelling", from: "Zanzibar Diving & Snorkelling Guide 2026", to: "Zanzibar Diving & Snorkelling Guide" },
  { slug: "zanzibar-family-holiday", from: "Zanzibar with Kids | Family Holiday Guide", to: "Zanzibar with Kids: Family Holidays" },
  { slug: "zanzibar-food-guide", from: "Zanzibar Food Guide | What & Where to Eat", to: "Zanzibar Food Guide: What to Eat" },
  { slug: "zanzibar-things-to-do", from: "Things to Do in Zanzibar | 20 Best 2026", to: "20 Best Things to Do in Zanzibar" },
];


/**
 * Tour-model fixes. The safari, trekking, and day-trip detail routes all feed
 * `metaTitle || title` through the same genMeta helper, so they inherit the
 * same 36-char budget. Destination pages render `name` (not metaTitle) and are
 * already within budget; the Page model is legacy WordPress import data with
 * no public route, so it is deliberately left alone.
 */
const SAFARI_FIXES = [
  { slug: "walking-safari-trekking-on-ngorongoro", from: "Walking Safari on Ngorongoro Highlands", to: "Ngorongoro Highlands Walking Safari" },
  { slug: "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro", from: "5 Days Budget Camping Safari Tanzania", to: "5-Day Tanzania Camping Safari" },
  { slug: "6-days-safari-to-tarangire-ngorongoro-serengeti", from: "6 Days Northern Circuit Safari Tanzania", to: "6-Day Northern Circuit Safari" },
  { slug: "10-day-adventure-in-tanzania-safari-zanzibar", from: "10 Days Tanzania Safari & Zanzibar Beach", to: "10-Day Tanzania Safari & Zanzibar" },
];

const TREKKING_FIXES = [
  { slug: "9-day-northern-circuit-route-kilimanjaro-guide", from: "9 Days Northern Circuit route Kilimanjaro", to: "9-Day Northern Circuit Kilimanjaro" },
];

const DAYTRIP_FIXES = [
  { slug: "kilimanjaro-trek-day-trip", from: "Kilimanjaro trek day trip shira route", to: "Kilimanjaro Shira Route Day Trek" },
  { slug: "tarangire-national-park-day-trip", from: "Tarangire Day Safari | Elephant Herds", to: "Tarangire Day Safari" },
  { slug: "arusha-city-day-trip", from: "Arusha City Tour | Day Trip from Moshi", to: "Arusha City Tour from Moshi" },
];

type Fix = { slug: string; from: string; to: string };

/**
 * The five content models below expose identical `slug` + `metaTitle` shapes,
 * so one fixer serves them all. Only the two delegate methods it actually
 * calls are described here.
 */
type MetaTitleModel = {
  findUnique(args: {
    where: { slug: string };
    select: { metaTitle: true };
  }): Promise<{ metaTitle: string | null } | null>;
  update(args: {
    where: { slug: string };
    data: { metaTitle: string };
  }): Promise<unknown>;
};

async function fixMetaTitles(
  fixes: Fix[],
  model: MetaTitleModel = prisma.blogPost,
  label = "blogPost",
) {
  for (const fix of fixes) {
    const rendered = fix.to.length + BRAND_SUFFIX_LENGTH;
    if (rendered > MAX_RENDERED_TITLE) {
      console.log(`✗  [${label}] ${fix.slug} — replacement renders at ${rendered} chars, aborting`);
      continue;
    }

    const existing = await model.findUnique({
      where: { slug: fix.slug },
      select: { metaTitle: true },
    });

    if (!existing) {
      console.log(`⏭  [${label}] ${fix.slug} — not found, skipping`);
      continue;
    }

    if (existing.metaTitle === fix.to) {
      console.log(`✓  [${label}] ${fix.slug} — already fixed`);
      continue;
    }

    if (existing.metaTitle !== fix.from) {
      console.log(`⏭  [${label}] ${fix.slug} — unexpected value "${existing.metaTitle}", skipping`);
      continue;
    }

    await model.update({
      where: { slug: fix.slug },
      data: { metaTitle: fix.to },
    });

    console.log(`✔  [${label}] ${fix.slug} — "${fix.to}" (${rendered} chars rendered)`);
  }
}

async function main() {
  await fixMetaTitles(META_TITLE_FIXES);
  await fixMetaTitles(META_TITLE_FIXES_2);
  await fixMetaTitles(SAFARI_FIXES, prisma.safariPackage, "safariPackage");
  await fixMetaTitles(TREKKING_FIXES, prisma.trekkingRoute, "trekkingRoute");
  await fixMetaTitles(DAYTRIP_FIXES, prisma.dayTrip, "dayTrip");
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
