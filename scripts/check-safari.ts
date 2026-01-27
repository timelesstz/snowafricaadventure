import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE
});

async function checkAllSafaris() {
  const safaris = await prisma.safariPackage.findMany({
    orderBy: { title: 'asc' }
  });

  console.log(`Found ${safaris.length} safari packages\n`);
  console.log("=".repeat(80));

  for (const safari of safaris) {
    const missing: string[] = [];
    if (!safari.overview) missing.push("overview");
    if (!safari.metaTitle) missing.push("metaTitle");
    if (!safari.metaDescription) missing.push("metaDescription");
    if (!safari.featuredImage) missing.push("featuredImage");
    if (!safari.gallery || safari.gallery.length === 0) missing.push("gallery");
    if (!safari.highlights || safari.highlights.length === 0) missing.push("highlights");
    if (!safari.inclusions || safari.inclusions.length === 0) missing.push("inclusions");
    if (!safari.exclusions || safari.exclusions.length === 0) missing.push("exclusions");
    if (!safari.itinerary) missing.push("itinerary");
    if (!safari.priceFrom) missing.push("priceFrom");

    console.log(`\n${safari.title}`);
    console.log(`Slug: ${safari.slug}`);
    console.log(`Type: ${safari.type}`);
    console.log(`Duration: ${safari.duration} (${safari.durationDays} days)`);
    if (missing.length > 0) {
      console.log(`❌ Missing (${missing.length}): ${missing.join(", ")}`);
    } else {
      console.log("✅ All fields populated!");
    }
  }

  await prisma.$disconnect();
}

checkAllSafaris();
