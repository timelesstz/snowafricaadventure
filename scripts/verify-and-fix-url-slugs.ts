/**
 * Verify bad slugs exist in DB and print their current state.
 * Run with: npx tsx scripts/verify-and-fix-url-slugs.ts
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const accelerateUrl = process.env.DATABASE_URL_ACCELERATE;
if (!accelerateUrl) throw new Error("DATABASE_URL_ACCELERATE not set");

const prisma = new PrismaClient({ accelerateUrl });

const SLUG_FIXES = [
  {
    type: "blogPost" as const,
    oldSlug: "go-next-door-ofelephants-big-cats-wildebeests-and-many-more-opt-for-tanzania-safari",
    newSlug: "tanzania-safari-wildlife",
  },
  {
    type: "safariPackage" as const,
    oldSlug: "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater",
    newSlug: "6-day-lodge-safari-northern-circuit",
  },
  {
    type: "blogPost" as const,
    oldSlug: "the-smartest-packing-list-for-kilimanjaro-climbing-increase-your-trekking-experience-up-to-100",
    newSlug: "kilimanjaro-trekking-packing-list",
  },
  {
    type: "trekkingRoute" as const,
    oldSlug: "3-days-2-nights-oldoinyo-lengai-climbing",
    newSlug: "3-days-oldoinyo-lengai-climbing",
  },
];

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  console.log(isDryRun ? "\n🔍 DRY RUN — no changes will be saved\n" : "\n🔧 APPLYING CHANGES\n");

  for (const fix of SLUG_FIXES) {
    console.log(`\n--- ${fix.type} ---`);
    console.log(`OLD: ${fix.oldSlug}`);
    console.log(`NEW: ${fix.newSlug}`);

    if (fix.type === "blogPost") {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: fix.oldSlug },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        console.log("  ❌ Not found in DB — skip");
        continue;
      }

      // Check new slug isn't already taken
      const conflict = await prisma.blogPost.findUnique({
        where: { slug: fix.newSlug },
        select: { id: true, title: true },
      });

      if (conflict) {
        console.log(`  ⚠️  New slug already taken by: "${conflict.title}" (${conflict.id})`);
        continue;
      }

      console.log(`  ✅ Found: "${existing.title}"`);

      if (!isDryRun) {
        await prisma.blogPost.update({
          where: { id: existing.id },
          data: { slug: fix.newSlug },
        });
        console.log(`  ✅ Updated slug → ${fix.newSlug}`);
      }
    }

    if (fix.type === "safariPackage") {
      const existing = await prisma.safariPackage.findUnique({
        where: { slug: fix.oldSlug },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        console.log("  ❌ Not found in DB — skip");
        continue;
      }

      const conflict = await prisma.safariPackage.findUnique({
        where: { slug: fix.newSlug },
        select: { id: true, title: true },
      });

      if (conflict) {
        console.log(`  ⚠️  New slug already taken by: "${conflict.title}"`);
        continue;
      }

      console.log(`  ✅ Found: "${existing.title}"`);

      if (!isDryRun) {
        await prisma.safariPackage.update({
          where: { id: existing.id },
          data: { slug: fix.newSlug },
        });
        console.log(`  ✅ Updated slug → ${fix.newSlug}`);
      }
    }

    if (fix.type === "trekkingRoute") {
      const existing = await prisma.trekkingRoute.findUnique({
        where: { slug: fix.oldSlug },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        console.log("  ❌ Not found in DB — skip");
        continue;
      }

      const conflict = await prisma.trekkingRoute.findUnique({
        where: { slug: fix.newSlug },
        select: { id: true, title: true },
      });

      if (conflict) {
        console.log(`  ⚠️  New slug already taken by: "${conflict.title}"`);
        continue;
      }

      console.log(`  ✅ Found: "${existing.title}"`);

      if (!isDryRun) {
        await prisma.trekkingRoute.update({
          where: { id: existing.id },
          data: { slug: fix.newSlug },
        });
        console.log(`  ✅ Updated slug → ${fix.newSlug}`);
      }
    }
  }

  await prisma.$disconnect();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
