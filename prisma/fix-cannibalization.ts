/**
 * Fix keyword cannibalization between blog posts and trekking route pages.
 *
 * Problem: Multiple blog posts compete with route pages for the same keywords,
 * confusing Google about which page to rank.
 *
 * Strategy:
 * 1. Update metaTitle/metaDescription on KEEP blog posts to target INFORMATIONAL intent
 *    (guides, tips, what to expect) while route pages keep TRANSACTIONAL intent (book, price).
 * 2. Create 301 redirects for thin/duplicate blog posts to their corresponding route pages.
 *
 * Usage: npx tsx prisma/fix-cannibalization.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Blog post meta updates — differentiate to INFORMATIONAL intent
// ─────────────────────────────────────────────────────────────────────────────

interface BlogMetaUpdate {
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

const blogMetaUpdates: BlogMetaUpdate[] = [
  // Lemosho cluster — comprehensive guide angle
  {
    slug: "8-day-lemosho-route-kilimanjaro-guide",
    metaTitle:
      "8-Day Lemosho Route Guide: Day-by-Day Itinerary & What to Expect",
    metaDescription:
      "Complete day-by-day walkthrough of the 8-day Lemosho Route on Kilimanjaro. Camps, altitude profiles, packing tips, and what each day feels like from a trekker's perspective.",
  },
  // Lemosho cluster — summit success rates angle
  {
    slug: "lemosho-route-summit-success-8-day-trek",
    metaTitle:
      "Lemosho Route Summit Success Rate: Why 8 Days Gives You the Best Odds",
    metaDescription:
      "Lemosho Route summit success rates explained — why the 8-day itinerary reaches 95%+ and how acclimatization, fitness, and pacing affect your chances on Kilimanjaro.",
  },
  // Rongai cluster — trekker's guide angle
  {
    slug: "6-day-rongai-route-kilimanjaro-guide",
    metaTitle:
      "6-Day Rongai Route Guide: Kilimanjaro's Quietest Trail Explained",
    metaDescription:
      "Everything you need to know about the 6-day Rongai Route — the quietest approach to Kilimanjaro. Trail conditions, daily stages, difficulty level, and insider tips from guides.",
  },
  // Machame cluster — 6 vs 7 day comparison angle
  {
    slug: "kilimanjaro-machame-route-6-days",
    metaTitle:
      "Machame Route: 6 vs 7 Days — Which Itinerary Should You Choose?",
    metaDescription:
      "Comparing the 6-day and 7-day Machame Route itineraries on Kilimanjaro. Acclimatization differences, success rates, difficulty, and which option suits your fitness level.",
  },
  // Mount Meru cluster — verify no clash (informational climbing guide)
  {
    slug: "climbing-mount-meru",
    metaTitle:
      "Climbing Mount Meru: A Trekker's Guide to Tanzania's Second Peak",
    metaDescription:
      "What it's really like to climb Mount Meru — trail difficulty, wildlife encounters, altitude sickness tips, and why many trekkers use it as Kilimanjaro acclimatization.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. Redirects — thin/duplicate blog posts → route pages (301 permanent)
// ─────────────────────────────────────────────────────────────────────────────

interface RedirectEntry {
  sourceUrl: string;
  destinationUrl: string;
  notes: string;
}

const redirects: RedirectEntry[] = [
  {
    sourceUrl: "/kilimanjaro-lemosho-route-8-days-guide/",
    destinationUrl: "/trekking/8-days-lemosho-route/",
    notes:
      "Cannibalization fix: thin blog (926 words, pos 56.4) → route page",
  },
  {
    sourceUrl: "/lemosho-route-kilimanjaro/",
    destinationUrl: "/trekking/8-days-lemosho-route/",
    notes:
      "Cannibalization fix: zero-impression blog (628 words) → route page",
  },
  {
    sourceUrl: "/kilimanjaro-rongai-route-6-days/",
    destinationUrl: "/trekking/6-days-rongai-route/",
    notes:
      "Cannibalization fix: thin blog (789 words, pos 32.2) → route page",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Execute
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Fix Keyword Cannibalization ===\n");

  // --- Part 1: Update blog post meta ---
  console.log("--- Part 1: Update blog post meta for informational intent ---\n");

  for (const update of blogMetaUpdates) {
    const post = await prisma.blogPost.findUnique({
      where: { slug: update.slug },
      select: { id: true, slug: true, metaTitle: true, metaDescription: true },
    });

    if (!post) {
      console.log(`  SKIP: Blog post "${update.slug}" not found`);
      continue;
    }

    console.log(`  Updating: ${update.slug}`);
    console.log(`    Old title: ${post.metaTitle || "(none)"}`);
    console.log(`    New title: ${update.metaTitle}`);

    await prisma.blogPost.update({
      where: { slug: update.slug },
      data: {
        metaTitle: update.metaTitle,
        metaDescription: update.metaDescription,
      },
    });

    console.log(`    Done.\n`);
  }

  // --- Part 2: Create redirects ---
  console.log("--- Part 2: Create 301 redirects for thin/duplicate posts ---\n");

  for (const redirect of redirects) {
    // Check if redirect already exists
    const existing = await prisma.redirect.findUnique({
      where: { sourceUrl: redirect.sourceUrl },
    });

    if (existing) {
      console.log(
        `  SKIP: Redirect already exists: ${redirect.sourceUrl} → ${existing.destinationUrl}`
      );
      continue;
    }

    const created = await prisma.redirect.create({
      data: {
        sourceUrl: redirect.sourceUrl,
        destinationUrl: redirect.destinationUrl,
        type: "PERMANENT",
        isActive: true,
        notes: redirect.notes,
        createdBy: "fix-cannibalization-script",
      },
    });

    console.log(
      `  Created redirect: ${created.sourceUrl} → ${created.destinationUrl}`
    );

    // Link to NotFoundUrl if one exists for this source
    const notFoundUrl = await prisma.notFoundUrl.findFirst({
      where: {
        url: {
          in: [redirect.sourceUrl, redirect.sourceUrl.replace(/\/$/, "")],
        },
        redirectId: null,
      },
    });

    if (notFoundUrl) {
      await prisma.notFoundUrl.update({
        where: { id: notFoundUrl.id },
        data: { redirectId: created.id },
      });
      console.log(`    Linked to existing NotFoundUrl record`);
    }
  }

  // --- Part 3: Unpublish redirected blog posts ---
  console.log(
    "\n--- Part 3: Unpublish redirected blog posts (they now redirect) ---\n"
  );

  const redirectSlugs = [
    "kilimanjaro-lemosho-route-8-days-guide",
    "lemosho-route-kilimanjaro",
    "kilimanjaro-rongai-route-6-days",
  ];

  for (const slug of redirectSlugs) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true, slug: true, isPublished: true },
    });

    if (!post) {
      console.log(`  SKIP: Blog post "${slug}" not found`);
      continue;
    }

    if (!post.isPublished) {
      console.log(`  SKIP: "${slug}" already unpublished`);
      continue;
    }

    await prisma.blogPost.update({
      where: { slug },
      data: { isPublished: false },
    });

    console.log(`  Unpublished: ${slug}`);
  }

  console.log("\n=== Done ===");
}

main()
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
