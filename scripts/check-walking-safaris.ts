/**
 * Read-only inspection of the walking-safari packages.
 *
 * Usage: npx tsx scripts/check-walking-safaris.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

async function main() {
  try {
    const safaris = await prisma.safariPackage.findMany({
      where: { title: { contains: "Walking Safari", mode: "insensitive" } },
      select: {
        slug: true,
        title: true,
        duration: true,
        durationDays: true,
        parksCount: true,
        gameDrives: true,
        type: true,
        priceFrom: true,
        isActive: true,
        overview: true,
        itinerary: true,
        destinations: {
          select: { destination: { select: { name: true } } },
          orderBy: { order: "asc" },
        },
      },
    });

    for (const s of safaris) {
      const itin = Array.isArray(s.itinerary) ? s.itinerary : null;
      console.log("─".repeat(70));
      console.log(`slug         : ${s.slug}`);
      console.log(`title        : ${s.title}`);
      console.log(`duration     : ${s.duration}`);
      console.log(`durationDays : ${s.durationDays}`);
      console.log(`parksCount   : ${s.parksCount}   (destinations: ${s.destinations.length})`);
      console.log(`gameDrives   : ${s.gameDrives}`);
      console.log(`type         : ${s.type}`);
      console.log(`priceFrom    : ${s.priceFrom}`);
      console.log(`isActive     : ${s.isActive}`);
      console.log(`itinerary    : ${itin ? `${itin.length} days` : "none"}`);
      console.log(`destinations : ${s.destinations.map((d) => d.destination.name).join(", ")}`);
      console.log(`overview     :\n${s.overview}`);
    }
    console.log("─".repeat(70));
    console.log(`${safaris.length} matching package(s)`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
