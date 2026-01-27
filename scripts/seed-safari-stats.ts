/**
 * Update Safari Package Stats (parks, game drives, rating)
 *
 * Usage: npx tsx scripts/seed-safari-stats.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

// Safari stats data - parks visited, estimated game drives, and rating
const safariStats: Record<string, { parksCount: number; gameDrives: number; rating: number }> = {
  // 2-day safari: Lake Manyara + Ngorongoro
  "2-days-tanzania-lodge-safari": {
    parksCount: 2,
    gameDrives: 3,
    rating: 4.8,
  },
  // 3-day budget: Tarangire, Lake Manyara, Ngorongoro
  "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater": {
    parksCount: 3,
    gameDrives: 5,
    rating: 4.7,
  },
  // 3-day lodge: Tarangire, Lake Manyara, Ngorongoro
  "3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater": {
    parksCount: 3,
    gameDrives: 5,
    rating: 4.8,
  },
  // 4-day adventure: Lake Manyara, Serengeti, Ngorongoro
  "4-day-safari-adventure-in-tanzania": {
    parksCount: 3,
    gameDrives: 7,
    rating: 4.9,
  },
  // 4-day Ngorongoro + Serengeti
  "4-days-safari-to-ngorongoro-and-serengeti": {
    parksCount: 2,
    gameDrives: 7,
    rating: 4.9,
  },
  // 5-day budget: Lake Manyara, Serengeti, Ngorongoro
  "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro": {
    parksCount: 3,
    gameDrives: 9,
    rating: 4.7,
  },
  // 5-day luxury: Lake Manyara, Serengeti, Ngorongoro
  "5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro": {
    parksCount: 3,
    gameDrives: 9,
    rating: 5.0,
  },
  // 6-day budget: Tarangire, Lake Manyara, Serengeti, Ngorongoro
  "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater": {
    parksCount: 4,
    gameDrives: 11,
    rating: 4.8,
  },
  // 6-day migration: Lake Manyara, Ndutu/Serengeti, Ngorongoro
  "6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater": {
    parksCount: 3,
    gameDrives: 10,
    rating: 4.9,
  },
  // 6-day lodge luxury: Tarangire, Lake Manyara, Serengeti, Ngorongoro
  "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater": {
    parksCount: 4,
    gameDrives: 11,
    rating: 4.9,
  },
  // 6-day Tarangire, Ngorongoro, Serengeti
  "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north": {
    parksCount: 3,
    gameDrives: 11,
    rating: 4.9,
  },
  // 7-day tented camp
  "7-days-tanzania-tented-camp-safari": {
    parksCount: 4,
    gameDrives: 13,
    rating: 4.9,
  },
  // 7-day serval wildlife
  "7-days-safari-to-tanzania-serval-wildlife": {
    parksCount: 4,
    gameDrives: 13,
    rating: 4.8,
  },
  // 8-day wonders
  "8-days-wonders-of-tanzania-safari": {
    parksCount: 5,
    gameDrives: 15,
    rating: 4.9,
  },
  // 9-day wildlife
  "9-days-tanzania-wildlife-safari": {
    parksCount: 5,
    gameDrives: 17,
    rating: 5.0,
  },
  // 10-day safari + Zanzibar
  "10-day-adventure-in-tanzania-safari-zanzibar": {
    parksCount: 4,
    gameDrives: 12,
    rating: 5.0,
  },
  // Walking safari / Ngorongoro trekking
  "walking-safari-trekking-on-ngorongoro": {
    parksCount: 1,
    gameDrives: 2,
    rating: 4.9,
  },
};

async function seedSafariStats() {
  console.log("🦁 Updating Safari Package Stats...\n");
  console.log("=".repeat(60));

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const [slug, stats] of Object.entries(safariStats)) {
    try {
      const result = await prisma.safariPackage.updateMany({
        where: { slug },
        data: {
          parksCount: stats.parksCount,
          gameDrives: stats.gameDrives,
          rating: stats.rating,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated: ${slug}`);
        console.log(`   Parks: ${stats.parksCount} | Drives: ${stats.gameDrives} | Rating: ${stats.rating}`);
        updated++;
      } else {
        console.log(`⚠️ Not found: ${slug}`);
        notFound++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
      errors++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️ Not found: ${notFound}`);
  console.log(`❌ Errors: ${errors}`);
  console.log("Safari stats update complete!");

  await prisma.$disconnect();
}

seedSafariStats().catch(console.error);
