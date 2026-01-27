/**
 * Pages Migration Script
 * Fetches all pages from WordPress REST API and migrates them to Prisma
 */

import "dotenv/config";
import prisma from "../../src/lib/prisma";

const WP_API = "https://snowafricaadventure.com/wp-json/wp/v2";
const DELAY_MS = 300;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  parent: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

// Pages to skip (already migrated as routes/safaris/destinations)
const SKIP_SLUGS = [
  // Routes - already migrated
  "7-days-machame-route", "6-days-machame-route", "8-days-lemosho-route",
  "6-days-marangu-route", "5-days-marangu-route", "6-days-rongai-route",
  "7-days-rongai-route", "6-days-umbwe-route", "4-days-mount-meru-climbing",
  "3-days-2-nights-oldoinyo-lengai-climbing",
  // Destinations - already migrated
  "serengeti-national-park", "ngorongoro-conservation-area", "tarangire-national-park",
  "lake-manyara-national-park", "arusha-national-park", "selous-game-reserve",
  "ruaha-national-park", "mikumi-national-park", "katavi-national-park",
  "mahale-national-park", "gombe-stream-national-park", "rubondo-island-national-park",
  "udzungwa-national-park", "kitulo-national-park", "mkomazi-national-park",
  // E-commerce pages - not needed
  "cart", "checkout", "shop", "my-account",
  // Home
  "home", "",
];

// Safari package pages - already migrated
const SAFARI_SLUGS = [
  "2-days-tanzania-lodge-safari",
  "3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater",
  "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater",
  "4-day-safari-adventure-in-tanzania",
  "4-days-safari-to-ngorongoro-and-serengeti",
  "5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro",
  "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro",
  "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater",
  "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater",
  "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north",
  "6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater",
  "7-days-safari-to-tanzania-serval-wildlife",
  "7-days-tanzania-tented-camp-safari",
  "8-days-wonders-of-tanzania-safari",
  "9-days-tanzania-wildlife-safari",
  "10-day-adventure-in-tanzania-safari-zanzibar",
  "walking-safari-trekking-on-ngorongoro",
];

// Day trip pages - already migrated
const DAYTRIP_SLUGS = [
  "arusha-national-park-day-trip",
  "lake-manyara-day-trip",
  "tarangire-national-park-day-trip",
  "ngorongoro-crater-day-trip",
  "arusha-city-day-trip",
];

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanContent(html: string): string {
  return html
    .replace(/class="[^"]*elementor[^"]*"/g, "")
    .replace(/data-[a-z-]+="[^"]*"/g, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchAllPages(): Promise<WPPage[]> {
  const allPages: WPPage[] = [];
  let page = 1;
  let hasMore = true;

  console.log("  Fetching pages from WordPress API...");

  while (hasMore) {
    try {
      const url = `${WP_API}/pages?per_page=100&page=${page}&_embed=1`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const pages: WPPage[] = await response.json();

      if (pages.length === 0) {
        hasMore = false;
      } else {
        allPages.push(...pages);
        console.log(`    Page ${page}: ${pages.length} pages (total: ${allPages.length})`);
        page++;
        await sleep(DELAY_MS);
      }
    } catch (error) {
      console.error(`  Error fetching page ${page}:`, error);
      hasMore = false;
    }
  }

  return allPages;
}

function determineTemplate(slug: string, link: string): string {
  if (link.includes("/trekking/kilimanjaro-guide/")) return "kilimanjaro-guide";
  if (link.includes("/trekking/")) return "trekking-info";
  if (link.includes("/tanzania-safaris/")) return "safari-info";
  if (link.includes("/tanzania-destinations/")) return "destination-info";
  if (link.includes("/day-trips/")) return "daytrip-info";
  if (slug === "about-us") return "about";
  if (slug === "contact-us") return "contact";
  if (slug === "zanzibar") return "destination";
  return "default";
}

async function migratePages(dryRun: boolean) {
  console.log("\n📄 Migrating Pages...\n");

  const pages = await fetchAllPages();
  console.log(`\n  Found ${pages.length} pages total\n`);

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  const allSkipSlugs = [...SKIP_SLUGS, ...SAFARI_SLUGS, ...DAYTRIP_SLUGS];

  for (const page of pages) {
    const slug = page.slug;

    // Skip pages that are already migrated as other content types
    if (allSkipSlugs.includes(slug)) {
      skipped++;
      continue;
    }

    // Skip parent listing pages (we handle them separately)
    if (["trekking", "tanzania-safaris", "tanzania-destinations", "day-trips"].includes(slug)) {
      skipped++;
      continue;
    }

    const title = stripHtml(page.title.rendered);
    const content = cleanContent(page.content.rendered);
    const excerpt = stripHtml(page.excerpt.rendered);
    const template = determineTemplate(slug, page.link);

    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${title.slice(0, 50)}... (${template})`);
      migrated++;
      continue;
    }

    try {
      // Check if page already exists
      const existing = await prisma.page.findUnique({
        where: { slug },
      });

      if (existing) {
        // Update existing page
        await prisma.page.update({
          where: { slug },
          data: {
            title,
            metaTitle: `${title} | Snow Africa Adventure`,
            metaDescription: excerpt.slice(0, 160) || title,
            content,
            template,
            isPublished: true,
          },
        });
        console.log(`  ✅ Updated: ${title.slice(0, 50)}...`);
      } else {
        await prisma.page.create({
          data: {
            slug,
            title,
            metaTitle: `${title} | Snow Africa Adventure`,
            metaDescription: excerpt.slice(0, 160) || title,
            content,
            template,
            isPublished: true,
          },
        });
        console.log(`  ✅ Created: ${title.slice(0, 50)}...`);
      }

      migrated++;
      await sleep(50);
    } catch (error) {
      console.error(`  ❌ Error migrating ${slug}:`, error);
      errors++;
    }
  }

  console.log(`\n  Summary: ${migrated} migrated, ${skipped} skipped (already migrated), ${errors} errors`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("🚀 WordPress Pages Migration");
  console.log("============================");
  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  }

  try {
    await migratePages(dryRun);
    console.log("\n✅ Pages migration complete!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
