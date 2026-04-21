import "dotenv/config";
import prisma from "../src/lib/prisma";

/**
 * Idempotent upsert for the 9-day Northern Circuit route.
 * Safe to re-run — only creates if missing, updates scoped fields otherwise.
 */
async function main() {
  const slug = "9-days-northern-circuit-route";

  const data = {
    slug,
    title: "9 Days Northern Circuit Route",
    metaTitle: "9 Days Northern Circuit Route | Kilimanjaro | Snow Africa Adventure",
    metaDescription:
      "The longest and most scenic Kilimanjaro route. 9-day Northern Circuit with the highest success rate (95%+) and fewest crowds.",
    duration: "9 Days",
    durationDays: 9,
    maxPeople: 10,
    startPoint: "Londorossi Gate (2,100m)",
    endPoint: "Mweka Gate (1,640m)",
    ageRange: "14 - 70+",
    physicalRating: "Moderate",
    successRate: 95,
    overview:
      "The Northern Circuit is Kilimanjaro's longest and newest route, offering the most complete 360° tour of the mountain. With nine days on the mountain, it has the highest summit success rate and takes you through the quiet northern slopes that few climbers ever see.",
    highlights: [
      "Highest success rate on Kilimanjaro (95%+)",
      "Longest route — best acclimatization",
      "Traverses the full 360° of the mountain",
      "Quietest trail — minimal crowds on northern slopes",
      "Starts on Lemosho, circles via Moir and Third Cave",
      "Summit from Kibo via Gilman's Point",
    ],
    inclusions: [
      "Park entrance fees (9 days)",
      "KINAPA-certified mountain guides",
      "Porters and cook (KPAP fair-wage)",
      "All meals on the mountain",
      "Quality 4-season camping equipment",
      "Emergency oxygen + pulse oximeter",
      "Airport transfers (JRO)",
      "2 nights hotel (pre and post trek)",
      "Certificate of completion",
    ],
    exclusions: [
      "International flights",
      "Tanzania visa ($50)",
      "Travel insurance (mandatory)",
      "Personal climbing gear",
      "Tips for crew ($250-350 recommended)",
      "Sleeping bag (rental available)",
    ],
    featuredImage:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/5317393539_b3ff8d1d93_k.jpg",
    isActive: true,
    mountain: "KILIMANJARO" as const,
  };

  const route = await prisma.trekkingRoute.upsert({
    where: { slug },
    update: data,
    create: data,
  });

  console.log(`Upserted route: ${route.slug} (${route.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
