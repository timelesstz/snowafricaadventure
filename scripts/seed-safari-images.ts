/**
 * Update Safari Package Images with proper Unsplash URLs
 *
 * Usage: npx tsx scripts/seed-safari-images.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

// Safari images - high quality Unsplash photos
const safariImages: Record<string, { featuredImage: string; gallery: string[] }> = {
  "2-days-tanzania-lodge-safari": {
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    ],
  },
  "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater": {
    featuredImage: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater": {
    featuredImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "4-day-safari-adventure-in-tanzania": {
    featuredImage: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "4-days-safari-to-ngorongoro-and-serengeti": {
    featuredImage: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro": {
    featuredImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    ],
  },
  "5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro": {
    featuredImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    ],
  },
  "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater": {
    featuredImage: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater": {
    featuredImage: "https://images.unsplash.com/photo-1534177616064-ef1082e7f8d6?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    ],
  },
  "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater": {
    featuredImage: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north": {
    featuredImage: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "7-days-tanzania-tented-camp-safari": {
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
      "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    ],
  },
  "7-days-safari-to-tanzania-serval-wildlife": {
    featuredImage: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
  "8-days-wonders-of-tanzania-safari": {
    featuredImage: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
      "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    ],
  },
  "9-days-tanzania-wildlife-safari": {
    featuredImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
      "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    ],
  },
  "10-day-adventure-in-tanzania-safari-zanzibar": {
    featuredImage: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80",
    ],
  },
  "walking-safari-trekking-on-ngorongoro": {
    featuredImage: "https://images.unsplash.com/photo-1621414050345-53db43f7e7ab?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    ],
  },
};

async function seedSafariImages() {
  console.log("🖼️ Updating Safari Package Images...\n");
  console.log("=".repeat(60));

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const [slug, images] of Object.entries(safariImages)) {
    try {
      const result = await prisma.safariPackage.updateMany({
        where: { slug },
        data: {
          featuredImage: images.featuredImage,
          gallery: images.gallery,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated: ${slug.substring(0, 50)}...`);
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
  console.log("Safari images update complete!");

  await prisma.$disconnect();
}

seedSafariImages().catch(console.error);
