/**
 * Fix malformed safari package content.
 *
 * Additive only — every write targets a single record by slug and touches
 * named fields. No deletes, no upserts, no bulk writes. Each fix verifies the
 * current value first and skips if it has already been corrected or edited to
 * something unexpected, so the script is safe to re-run.
 *
 * Usage: npx tsx scripts/fix-safari-titles.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

/** Title typos: exact replacement, guarded on the current value. */
const TITLE_FIXES = [
  {
    slug: "3-days-tanzania-lodge-safari",
    from: "3 DaysTanzania Lodge Safari",
    to: "3 Days Tanzania Lodge Safari",
  },
];

/**
 * Overview typos. The itinerary for this package has 12 entries and duration
 * is "12 Days 11 Nights", so "11-day" conflates nights with days.
 */
const OVERVIEW_FIXES = [
  {
    slug: "walking-safari-trekking-in-ngorongoro",
    from: "This 11-day expedition",
    to: "This 12-day expedition",
  },
];

/**
 * parksCount corrections. Both walking safaris claimed 10 parks while only
 * visiting the Ngorongoro Conservation Area and Serengeti National Park —
 * the Olmoti and Empakaai craters are inside the NCA, not separate parks.
 */
const PARKS_COUNT_FIXES = [
  { slug: "walking-safari-trekking-on-ngorongoro", from: 10, to: 2 },
  { slug: "walking-safari-trekking-in-ngorongoro", from: 10, to: 2 },
];

async function fixTitles() {
  for (const fix of TITLE_FIXES) {
    const existing = await prisma.safariPackage.findUnique({
      where: { slug: fix.slug },
      select: { title: true },
    });

    if (!existing) {
      console.log(`⏭  ${fix.slug} — not found, skipping`);
      continue;
    }
    if (existing.title === fix.to) {
      console.log(`✅ ${fix.slug} — title already correct`);
      continue;
    }
    if (existing.title !== fix.from) {
      console.log(
        `⚠️  ${fix.slug} — unexpected title ${JSON.stringify(existing.title)}, skipping`
      );
      continue;
    }

    await prisma.safariPackage.update({
      where: { slug: fix.slug },
      data: { title: fix.to },
    });
    console.log(`✅ ${fix.slug} — title → ${JSON.stringify(fix.to)}`);
  }
}

async function fixOverviews() {
  for (const fix of OVERVIEW_FIXES) {
    const existing = await prisma.safariPackage.findUnique({
      where: { slug: fix.slug },
      select: { overview: true },
    });

    if (!existing) {
      console.log(`⏭  ${fix.slug} — not found, skipping`);
      continue;
    }
    if (existing.overview.includes(fix.to)) {
      console.log(`✅ ${fix.slug} — overview already correct`);
      continue;
    }
    if (!existing.overview.includes(fix.from)) {
      console.log(
        `⚠️  ${fix.slug} — overview no longer contains ${JSON.stringify(fix.from)}, skipping`
      );
      continue;
    }

    await prisma.safariPackage.update({
      where: { slug: fix.slug },
      data: { overview: existing.overview.replace(fix.from, fix.to) },
    });
    console.log(`✅ ${fix.slug} — overview ${JSON.stringify(fix.from)} → ${JSON.stringify(fix.to)}`);
  }
}

async function fixParksCount() {
  for (const fix of PARKS_COUNT_FIXES) {
    const existing = await prisma.safariPackage.findUnique({
      where: { slug: fix.slug },
      select: { parksCount: true },
    });

    if (!existing) {
      console.log(`⏭  ${fix.slug} — not found, skipping`);
      continue;
    }
    if (existing.parksCount === fix.to) {
      console.log(`✅ ${fix.slug} — parksCount already ${fix.to}`);
      continue;
    }
    if (existing.parksCount !== fix.from) {
      console.log(
        `⚠️  ${fix.slug} — unexpected parksCount ${existing.parksCount}, skipping`
      );
      continue;
    }

    await prisma.safariPackage.update({
      where: { slug: fix.slug },
      data: { parksCount: fix.to },
    });
    console.log(`✅ ${fix.slug} — parksCount ${fix.from} → ${fix.to}`);
  }
}

async function main() {
  try {
    await fixTitles();
    await fixOverviews();
    await fixParksCount();
  } catch (error) {
    console.error("❌ Error fixing safari content:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
