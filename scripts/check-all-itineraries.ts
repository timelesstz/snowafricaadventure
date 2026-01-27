import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE
});

async function check() {
  const safaris = await prisma.safariPackage.findMany({
    select: {
      slug: true,
      title: true,
      durationDays: true,
      itinerary: true
    },
    orderBy: { durationDays: "asc" }
  });

  console.log("SAFARI ITINERARY LENGTH CHECK\n");
  console.log("=".repeat(80));

  for (const safari of safaris) {
    const itinerary = safari.itinerary as any[];
    if (!Array.isArray(itinerary) || itinerary.length === 0) {
      console.log(`\n❌ ${safari.title} - NO ITINERARY`);
      continue;
    }

    const avgLength = Math.round(
      itinerary.reduce((sum, day) => sum + (day.description?.length || 0), 0) / itinerary.length
    );

    const status = avgLength > 500 ? "✅" : "⚠️ NEEDS FIX";
    console.log(`\n${status} ${safari.title}`);
    console.log(`   Days: ${itinerary.length} | Avg desc length: ${avgLength} chars`);

    if (avgLength <= 500) {
      itinerary.forEach((day: any) => {
        console.log(`   Day ${day.day}: ${day.description?.length || 0} chars`);
      });
    }
  }

  await prisma.$disconnect();
}

check();
