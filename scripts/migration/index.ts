#!/usr/bin/env npx tsx
/**
 * Master Migration CLI
 * Orchestrates WordPress to Next.js content migration
 *
 * Usage:
 *   npx tsx scripts/migration/index.ts [command] [options]
 *
 * Commands:
 *   routes      - Migrate trekking routes
 *   safaris     - Migrate safari packages
 *   destinations - Migrate destinations
 *   blogs       - Migrate blog posts
 *   daytrips    - Migrate day trips
 *   all         - Run all migrations
 *   verify      - Verify migration integrity
 *   export      - Export WordPress content for review
 *
 * Options:
 *   --dry-run   - Preview changes without writing to database
 *   --force     - Overwrite existing records
 */

import "dotenv/config";
import { Prisma } from "@prisma/client";

const commands = {
  routes: "./migrate-enhanced.ts",
  blogs: "./migrate-blogs.ts",
  pages: "./migrate-pages.ts",
};

async function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║       Snow Africa - WordPress Migration CLI                   ║
╚══════════════════════════════════════════════════════════════╝

Usage: npx tsx scripts/migration/index.ts <command> [options]

COMMANDS:
  routes      Migrate trekking routes from WordPress
  blogs       Migrate blog posts and categories
  pages       Migrate static pages (about, contact, etc.)
  all         Run all migrations in sequence
  verify      Check migration integrity
  export      Export WordPress content to JSON for review

OPTIONS:
  --dry-run   Preview changes without writing to database
  --force     Overwrite existing records
  --verbose   Show detailed progress

EXAMPLES:
  # Preview route migration
  npx tsx scripts/migration/index.ts routes --dry-run

  # Migrate all content
  npx tsx scripts/migration/index.ts all

  # Export WordPress content to JSON
  npx tsx scripts/migration/index.ts export

MIGRATION STATUS:
  ✅ Routes (migrate-enhanced.ts) - Ready
  ✅ Blogs (migrate-blogs.ts) - Ready
  ⏳ Pages (migrate-pages.ts) - Ready

For more details: https://snowafricaadventure.com/docs/migration
`);
}

async function runMigration(command: string, args: string[]) {
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");

  console.log(`\n🚀 Running ${command} migration...`);
  if (dryRun) console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  if (force) console.log("⚠️  FORCE MODE - Existing records will be overwritten\n");

  const scriptPath = commands[command as keyof typeof commands];
  if (!scriptPath) {
    console.error(`Unknown command: ${command}`);
    await showHelp();
    process.exit(1);
  }

  // Import and run the migration script
  const script = await import(scriptPath);
  if (typeof script.main === "function") {
    await script.main(dryRun, force);
  } else {
    console.log(`Running ${scriptPath}...`);
    // The script will run on import if it has top-level execution
  }
}

async function runAllMigrations(args: string[]) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           FULL MIGRATION - ALL CONTENT                        ║
╚══════════════════════════════════════════════════════════════╝
`);

  const migrationOrder = ["routes", "blogs", "pages"];

  for (const migration of migrationOrder) {
    try {
      await runMigration(migration, args);
      console.log(`✅ ${migration} migration complete\n`);
    } catch (error) {
      console.error(`❌ ${migration} migration failed:`, error);
      process.exit(1);
    }
  }

  console.log("\n🎉 All migrations completed successfully!");
}

async function verifyMigration() {
  const prisma = (await import("../../src/lib/prisma")).default;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║              MIGRATION VERIFICATION                           ║
╚══════════════════════════════════════════════════════════════╝
`);

  try {
    const counts = {
      routes: await prisma.trekkingRoute.count(),
      safaris: await prisma.safariPackage.count(),
      destinations: await prisma.destination.count(),
      dayTrips: await prisma.dayTrip.count(),
      blogPosts: await prisma.blogPost.count(),
      categories: await prisma.category.count(),
      tags: await prisma.tag.count(),
    };

    console.log("📊 Database Content Summary:\n");
    console.log(`   Trekking Routes:  ${counts.routes}`);
    console.log(`   Safari Packages:  ${counts.safaris}`);
    console.log(`   Destinations:     ${counts.destinations}`);
    console.log(`   Day Trips:        ${counts.dayTrips}`);
    console.log(`   Blog Posts:       ${counts.blogPosts}`);
    console.log(`   Categories:       ${counts.categories}`);
    console.log(`   Tags:             ${counts.tags}`);

    // Check for missing required content
    console.log("\n📋 Content Verification:\n");

    if (counts.routes < 6) {
      console.log("   ⚠️  Expected at least 6 trekking routes");
    } else {
      console.log("   ✅ Trekking routes OK");
    }

    if (counts.destinations < 10) {
      console.log("   ⚠️  Expected at least 10 destinations");
    } else {
      console.log("   ✅ Destinations OK");
    }

    if (counts.blogPosts < 5) {
      console.log("   ⚠️  Expected at least 5 blog posts");
    } else {
      console.log("   ✅ Blog posts OK");
    }

    // Check for routes without itineraries
    const routesWithoutItinerary = await prisma.trekkingRoute.count({
      where: { itinerary: { equals: Prisma.DbNull } },
    });
    if (routesWithoutItinerary > 0) {
      console.log(`   ⚠️  ${routesWithoutItinerary} routes missing itinerary`);
    }

    // Check for safaris without destinations
    const safarisWithoutDest = await prisma.safariPackage.count({
      where: { destinations: { none: {} } },
    });
    if (safarisWithoutDest > 0) {
      console.log(`   ⚠️  ${safarisWithoutDest} safaris without destinations`);
    }

    console.log("\n✅ Verification complete");
  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function exportContent() {
  const fs = await import("fs");
  const path = await import("path");

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║              EXPORT WORDPRESS CONTENT                         ║
╚══════════════════════════════════════════════════════════════╝
`);

  const WP_API = "https://snowafricaadventure.com/wp-json/wp/v2";
  const exportDir = path.join(process.cwd(), "scripts/migration/exports");

  // Create export directory
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Export posts
  console.log("📝 Exporting blog posts...");
  try {
    const postsResponse = await fetch(`${WP_API}/posts?per_page=100&_embed=1`);
    const posts = await postsResponse.json();
    fs.writeFileSync(
      path.join(exportDir, "posts.json"),
      JSON.stringify(posts, null, 2)
    );
    console.log(`   Exported ${posts.length} posts`);
  } catch (error) {
    console.error("   Failed to export posts:", error);
  }

  // Export pages
  console.log("📄 Exporting pages...");
  try {
    const pagesResponse = await fetch(`${WP_API}/pages?per_page=100&_embed=1`);
    const pages = await pagesResponse.json();
    fs.writeFileSync(
      path.join(exportDir, "pages.json"),
      JSON.stringify(pages, null, 2)
    );
    console.log(`   Exported ${pages.length} pages`);
  } catch (error) {
    console.error("   Failed to export pages:", error);
  }

  // Export categories
  console.log("📁 Exporting categories...");
  try {
    const catsResponse = await fetch(`${WP_API}/categories?per_page=100`);
    const categories = await catsResponse.json();
    fs.writeFileSync(
      path.join(exportDir, "categories.json"),
      JSON.stringify(categories, null, 2)
    );
    console.log(`   Exported ${categories.length} categories`);
  } catch (error) {
    console.error("   Failed to export categories:", error);
  }

  // Export tags
  console.log("🏷️  Exporting tags...");
  try {
    const tagsResponse = await fetch(`${WP_API}/tags?per_page=100`);
    const tags = await tagsResponse.json();
    fs.writeFileSync(
      path.join(exportDir, "tags.json"),
      JSON.stringify(tags, null, 2)
    );
    console.log(`   Exported ${tags.length} tags`);
  } catch (error) {
    console.error("   Failed to export tags:", error);
  }

  console.log(`\n✅ Export complete! Files saved to: ${exportDir}`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help" || command === "--help" || command === "-h") {
    await showHelp();
    process.exit(0);
  }

  switch (command) {
    case "all":
      await runAllMigrations(args.slice(1));
      break;
    case "verify":
      await verifyMigration();
      break;
    case "export":
      await exportContent();
      break;
    case "routes":
    case "blogs":
    case "pages":
      await runMigration(command, args.slice(1));
      break;
    default:
      console.error(`Unknown command: ${command}`);
      await showHelp();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
