/**
 * WordPress to Prisma Migration Script
 *
 * Usage: npx tsx scripts/migration/migrate.ts [--dry-run] [--type=routes|safaris|destinations|daytrips|blog]
 */

import "dotenv/config";
import prisma from "../../src/lib/prisma";
import {
  fetchPageContent,
  extractMetaDescription,
} from "./wordpress-api";
import {
  parseRouteContent,
  parseSafariContent,
  parseDestinationContent,
  parseDayTripContent,
  parseBlogContent,
} from "./content-parser";

// WordPress sitemap data (from page-sitemap.xml)
const WORDPRESS_CONTENT = {
  trekkingRoutes: [
    { slug: "7-days-machame-route", path: "/trekking/7-days-machame-route/" },
    { slug: "6-days-machame-route", path: "/trekking/6-days-machame-route/" },
    { slug: "8-days-lemosho-route", path: "/trekking/8-days-lemosho-route/" },
    { slug: "6-days-marangu-route", path: "/trekking/6-days-marangu-route/" },
    { slug: "5-days-marangu-route", path: "/trekking/5-days-marangu-route/" },
    { slug: "6-days-rongai-route", path: "/trekking/6-days-rongai-route/" },
    { slug: "7-days-rongai-route", path: "/trekking/7-days-rongai-route/" },
    { slug: "6-days-umbwe-route", path: "/trekking/6-days-umbwe-route/" },
    { slug: "4-days-mount-meru-climbing", path: "/trekking/4-days-mount-meru-climbing/" },
    { slug: "3-days-2-nights-oldoinyo-lengai-climbing", path: "/trekking/3-days-2-nights-oldoinyo-lengai-climbing/" },
  ],
  safaris: [
    { slug: "2-days-tanzania-lodge-safari", path: "/tanzania-safaris/2-days-tanzania-lodge-safari/" },
    { slug: "3-days-tanzania-lodge-safari", path: "/tanzania-safaris/3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater/" },
    { slug: "3-days-tanzania-budget-camping-safari", path: "/tanzania-safaris/3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater/" },
    { slug: "4-day-safari-adventure", path: "/tanzania-safaris/4-day-safari-adventure-in-tanzania/" },
    { slug: "4-days-safari-ngorongoro-serengeti", path: "/tanzania-safaris/4-days-safari-to-ngorongoro-and-serengeti/" },
    { slug: "5-days-budget-camping-safari", path: "/tanzania-safaris/5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro/" },
    { slug: "5-days-tanzania-luxury-safari", path: "/tanzania-safaris/5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro/" },
    { slug: "6-days-budget-camping-safari", path: "/tanzania-safaris/6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater/" },
    { slug: "6-days-safari-tarangire-ngorongoro-serengeti", path: "/tanzania-safaris/6-days-safari-to-tarangire-ngorongoro-serengeti-central-north/" },
    { slug: "6-days-tanzania-lodge-safari", path: "/tanzania-safaris/6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater/" },
    { slug: "6-days-migration-safari", path: "/tanzania-safaris/6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater/" },
    { slug: "7-days-tanzania-tented-camp-safari", path: "/tanzania-safaris/7-days-tanzania-tented-camp-safari/" },
    { slug: "7-days-serval-wildlife-safari", path: "/tanzania-safaris/7-days-safari-to-tanzania-serval-wildlife/" },
    { slug: "8-days-wonders-of-tanzania", path: "/tanzania-safaris/8-days-wonders-of-tanzania-safari/" },
    { slug: "9-days-tanzania-wildlife-safari", path: "/tanzania-safaris/9-days-tanzania-wildlife-safari/" },
    { slug: "10-day-safari-zanzibar", path: "/tanzania-safaris/10-day-adventure-in-tanzania-safari-zanzibar/" },
    { slug: "walking-safari-ngorongoro", path: "/tanzania-safaris/walking-safari-trekking-on-ngorongoro/" },
  ],
  destinations: [
    { slug: "arusha-national-park", path: "/tanzania-destinations/arusha-national-park/" },
    { slug: "gombe-stream-national-park", path: "/tanzania-destinations/gombe-stream-national-park/" },
    { slug: "katavi-national-park", path: "/tanzania-destinations/katavi-national-park/" },
    { slug: "kitulo-national-park", path: "/tanzania-destinations/kitulo-national-park/" },
    { slug: "lake-manyara-national-park", path: "/tanzania-destinations/lake-manyara-national-park/" },
    { slug: "mahale-national-park", path: "/tanzania-destinations/mahale-national-park/" },
    { slug: "mikumi-national-park", path: "/tanzania-destinations/mikumi-national-park/" },
    { slug: "mkomazi-national-park", path: "/tanzania-destinations/mkomazi-national-park/" },
    { slug: "ngorongoro-conservation-area", path: "/tanzania-destinations/ngorongoro-conservation-area/" },
    { slug: "ruaha-national-park", path: "/tanzania-destinations/ruaha-national-park/" },
    { slug: "rubondo-island-national-park", path: "/tanzania-destinations/rubondo-island-national-park/" },
    { slug: "selous-game-reserve", path: "/tanzania-destinations/selous-game-reserve/" },
    { slug: "serengeti-national-park", path: "/tanzania-destinations/serengeti-national-park/" },
    { slug: "tarangire-national-park", path: "/tanzania-destinations/tarangire-national-park/" },
    { slug: "udzungwa-national-park", path: "/tanzania-destinations/udzungwa-national-park/" },
  ],
  dayTrips: [
    { slug: "arusha-city-day-trip", path: "/day-trips/arusha-city-day-trip/" },
    { slug: "arusha-national-park-day-trip", path: "/day-trips/arusha-national-park-day-trip/" },
    { slug: "lake-manyara-day-trip", path: "/day-trips/lake-manyara-day-trip/" },
    { slug: "ngorongoro-crater-day-trip", path: "/day-trips/ngorongoro-crater-day-trip/" },
    { slug: "tarangire-national-park-day-trip", path: "/day-trips/tarangire-national-park-day-trip/" },
  ],
  blogPosts: [
    { slug: "how-tall-is-mount-kilimanjaro", path: "/how-tall-is-mount-kilimanjaro/" },
    { slug: "climbing-kilimanjaro", path: "/climbing-kilimanjaro/" },
    { slug: "best-tour-operator-in-tanzania", path: "/best-tour-operator-in-tanzania/" },
    { slug: "tanzania-beach-holidays", path: "/tanzania-beach-holidays/" },
    { slug: "tanzania-tour-operators", path: "/tanzania-tour-operators/" },
  ],
};

const DELAY_MS = 1000; // 1 second between requests
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function migrateRoutes(dryRun: boolean) {
  console.log("\n📍 Migrating Trekking Routes...\n");

  // Create Kilimanjaro category if not exists
  let category = await prisma.category.findUnique({
    where: { slug: "kilimanjaro-routes" },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: "kilimanjaro-routes",
        name: "Kilimanjaro Routes",
        description: "All Kilimanjaro climbing routes",
      },
    });
  }

  for (const item of WORDPRESS_CONTENT.trekkingRoutes) {
    try {
      console.log(`  Fetching: ${item.path}`);
      const html = await fetchPageContent(item.path);
      const metaDesc = extractMetaDescription(html);

      // Extract title from HTML
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, "") : item.slug;

      const route = parseRouteContent(item.slug, html, title, metaDesc);

      if (dryRun) {
        console.log(`  [DRY RUN] Would create route: ${route.title}`);
        console.log(`    Duration: ${route.duration}`);
        console.log(`    Highlights: ${route.highlights.length}`);
        console.log(`    Itinerary days: ${route.itinerary?.length || 0}`);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const routeData = route as any;
        await prisma.trekkingRoute.upsert({
          where: { slug: item.slug },
          create: {
            ...routeData,
            categoryId: category.id,
            isActive: true,
          },
          update: {
            ...routeData,
            categoryId: category.id,
          },
        });
        console.log(`  ✅ Migrated: ${route.title}`);
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`  ❌ Error migrating ${item.slug}:`, error);
    }
  }
}

async function migrateSafaris(dryRun: boolean) {
  console.log("\n🦁 Migrating Safari Packages...\n");

  for (const item of WORDPRESS_CONTENT.safaris) {
    try {
      console.log(`  Fetching: ${item.path}`);
      const html = await fetchPageContent(item.path);
      const metaDesc = extractMetaDescription(html);

      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, "") : item.slug;

      const safari = parseSafariContent(item.slug, html, title, metaDesc);

      if (dryRun) {
        console.log(`  [DRY RUN] Would create safari: ${safari.title}`);
        console.log(`    Duration: ${safari.duration}, Type: ${safari.type}`);
        console.log(`    Highlights: ${safari.highlights.length}`);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const safariData = safari as any;
        await prisma.safariPackage.upsert({
          where: { slug: item.slug },
          create: {
            slug: safariData.slug,
            title: safariData.title,
            metaTitle: safariData.metaTitle,
            metaDescription: safariData.metaDescription,
            duration: safariData.duration,
            durationDays: safariData.durationDays,
            type: safariData.type,
            overview: safariData.overview,
            highlights: safariData.highlights,
            itinerary: safariData.itinerary,
            inclusions: safariData.inclusions,
            exclusions: safariData.exclusions,
            featuredImage: safariData.featuredImage,
            gallery: safariData.gallery,
            priceFrom: safariData.priceFrom,
            isActive: true,
          },
          update: {
            title: safariData.title,
            metaTitle: safariData.metaTitle,
            metaDescription: safariData.metaDescription,
            duration: safariData.duration,
            durationDays: safariData.durationDays,
            type: safariData.type,
            overview: safariData.overview,
            highlights: safariData.highlights,
            itinerary: safariData.itinerary,
            inclusions: safariData.inclusions,
            exclusions: safariData.exclusions,
            featuredImage: safariData.featuredImage,
            gallery: safariData.gallery,
            priceFrom: safariData.priceFrom,
          },
        });
        console.log(`  ✅ Migrated: ${safari.title}`);
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`  ❌ Error migrating ${item.slug}:`, error);
    }
  }
}

async function migrateDestinations(dryRun: boolean) {
  console.log("\n🌍 Migrating Destinations...\n");

  for (const item of WORDPRESS_CONTENT.destinations) {
    try {
      console.log(`  Fetching: ${item.path}`);
      const html = await fetchPageContent(item.path);
      const metaDesc = extractMetaDescription(html);

      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, "") : item.slug;

      const destination = parseDestinationContent(item.slug, html, title, metaDesc);

      if (dryRun) {
        console.log(`  [DRY RUN] Would create destination: ${destination.name}`);
        console.log(`    Circuit: ${destination.circuit}`);
        console.log(`    Wildlife: ${destination.wildlife.join(", ")}`);
      } else {
        await prisma.destination.upsert({
          where: { slug: item.slug },
          create: {
            ...destination,
            isActive: true,
          },
          update: destination,
        });
        console.log(`  ✅ Migrated: ${destination.name}`);
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`  ❌ Error migrating ${item.slug}:`, error);
    }
  }
}

async function migrateDayTrips(dryRun: boolean) {
  console.log("\n☀️ Migrating Day Trips...\n");

  for (const item of WORDPRESS_CONTENT.dayTrips) {
    try {
      console.log(`  Fetching: ${item.path}`);
      const html = await fetchPageContent(item.path);
      const metaDesc = extractMetaDescription(html);

      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, "") : item.slug;

      const dayTrip = parseDayTripContent(item.slug, html, title, metaDesc);

      if (dryRun) {
        console.log(`  [DRY RUN] Would create day trip: ${dayTrip.title}`);
        console.log(`    Destination: ${dayTrip.destination}`);
      } else {
        await prisma.dayTrip.upsert({
          where: { slug: item.slug },
          create: {
            ...dayTrip,
            isActive: true,
          },
          update: dayTrip,
        });
        console.log(`  ✅ Migrated: ${dayTrip.title}`);
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`  ❌ Error migrating ${item.slug}:`, error);
    }
  }
}

async function migrateBlogPosts(dryRun: boolean) {
  console.log("\n📝 Migrating Blog Posts...\n");

  for (const item of WORDPRESS_CONTENT.blogPosts) {
    try {
      console.log(`  Fetching: ${item.path}`);
      const html = await fetchPageContent(item.path);
      const metaDesc = extractMetaDescription(html);

      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, "") : item.slug;

      const post = parseBlogContent(
        item.slug,
        html,
        title,
        "", // excerpt
        metaDesc,
        new Date()
      );

      if (dryRun) {
        console.log(`  [DRY RUN] Would create post: ${post.title}`);
      } else {
        await prisma.blogPost.upsert({
          where: { slug: item.slug },
          create: {
            slug: post.slug,
            title: post.title,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.featuredImage,
            isPublished: true,
            publishedAt: new Date(),
          },
          update: {
            title: post.title,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.featuredImage,
          },
        });
        console.log(`  ✅ Migrated: ${post.title}`);
      }

      await sleep(DELAY_MS);
    } catch (error) {
      console.error(`  ❌ Error migrating ${item.slug}:`, error);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const typeArg = args.find((a) => a.startsWith("--type="));
  const contentType = typeArg?.split("=")[1];

  console.log("🚀 WordPress to Prisma Migration");
  console.log("================================");
  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made");
  }

  try {
    if (!contentType || contentType === "routes") {
      await migrateRoutes(dryRun);
    }
    if (!contentType || contentType === "safaris") {
      await migrateSafaris(dryRun);
    }
    if (!contentType || contentType === "destinations") {
      await migrateDestinations(dryRun);
    }
    if (!contentType || contentType === "daytrips") {
      await migrateDayTrips(dryRun);
    }
    if (!contentType || contentType === "blog") {
      await migrateBlogPosts(dryRun);
    }

    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
