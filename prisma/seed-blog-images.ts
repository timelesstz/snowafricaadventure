/**
 * Blog Featured Images Migration Script
 * Assigns category-appropriate featured images to blog posts that are missing them.
 * Uses existing R2 CDN assets. Only updates posts where featuredImage is null.
 * Run with: npx tsx prisma/seed-blog-images.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const R2_BASE = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev";

// Kilimanjaro-themed images (rotating set)
const KILIMANJARO_IMAGES = [
  `${R2_BASE}/wp-content/uploads/2025/09/kilimanjaro-342702_1280.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/49c04fa0-2704-4624-aaf4-59db6de1f1f5.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/5317393539_b3ff8d1d93_k.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/5-days-Marangu-route.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/24832324111_bf15191b09_b.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/7001549021_6bc1968982_k.jpg`,
];

// Safari/wildlife-themed images (rotating set)
const SAFARI_IMAGES = [
  `${R2_BASE}/wp-content/uploads/2025/09/safari-3242983_1280.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg`,
  `${R2_BASE}/wp-content/uploads/2024/05/safaritanzania.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/39339368385_20d92a678c_k.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/5382086978_c0f124a067_k.jpg`,
  `${R2_BASE}/wp-content/uploads/2024/05/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg`,
];

// Destination-themed images
const DESTINATION_IMAGES = [
  `${R2_BASE}/wp-content/uploads/2023/03/Serengeri-National-Park.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/Ngorongoro-conservation-area.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/Tarangire-National-Park.jpg`,
];

// Day trip images
const DAY_TRIP_IMAGES = [
  `${R2_BASE}/wp-content/uploads/2023/03/Day-trips.jpg`,
  `${R2_BASE}/wp-content/uploads/2023/03/Arusha-National-Park-Day-trip.jpg`,
];

// Category slug → image pool mapping
const CATEGORY_IMAGE_POOLS: Record<string, string[]> = {
  "kilimanjaro-climbing-guide": KILIMANJARO_IMAGES,
  "mount-kilimanjaro": KILIMANJARO_IMAGES,
  "safari-tours": SAFARI_IMAGES,
  "tanzania-destinations": DESTINATION_IMAGES,
  "day-trip": DAY_TRIP_IMAGES,
  "blog": SAFARI_IMAGES,
};

async function main() {
  console.log("🖼️  Starting Blog Featured Images Migration...\n");

  // Get all blog posts missing featured images, with their categories
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { featuredImage: null },
        { featuredImage: "" },
      ],
    },
    include: {
      categories: {
        include: { category: true },
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  console.log(`📝 Found ${posts.length} posts missing featured images\n`);

  if (posts.length === 0) {
    console.log("✅ All posts already have featured images!");
    return;
  }

  // Track usage counters per pool to rotate images
  const poolCounters: Record<string, number> = {};

  let updated = 0;
  let errors = 0;

  for (const post of posts) {
    try {
      // Determine which image pool to use based on categories
      const categorySlugs = post.categories.map((c) => c.category.slug);
      let imagePool = SAFARI_IMAGES; // default

      for (const slug of categorySlugs) {
        if (CATEGORY_IMAGE_POOLS[slug]) {
          imagePool = CATEGORY_IMAGE_POOLS[slug];
          break;
        }
      }

      // Pick a rotating image from the pool
      const poolKey = imagePool === KILIMANJARO_IMAGES ? "kili" :
                      imagePool === SAFARI_IMAGES ? "safari" :
                      imagePool === DESTINATION_IMAGES ? "dest" : "day";
      const counter = poolCounters[poolKey] || 0;
      const image = imagePool[counter % imagePool.length];
      poolCounters[poolKey] = counter + 1;

      await prisma.blogPost.update({
        where: { id: post.id },
        data: { featuredImage: image },
      });

      updated++;
      console.log(`✅ ${post.slug} → ${image.split("/").pop()}`);
    } catch (error) {
      errors++;
      console.log(`❌ Error updating ${post.slug}:`, error);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Featured Images Migration Summary");
  console.log("=".repeat(50));
  console.log(`✅ Successfully updated: ${updated} posts`);
  console.log(`❌ Errors: ${errors} posts`);

  // Verify
  const stillMissing = await prisma.blogPost.count({
    where: {
      OR: [
        { featuredImage: null },
        { featuredImage: "" },
      ],
    },
  });
  console.log(`\n📈 Posts still missing images: ${stillMissing}`);
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
