import "dotenv/config";
import prisma from "../src/lib/prisma";

/**
 * Seed April & May 2026 Kilimanjaro Group Departures
 * Adds new departures without deleting existing ones.
 */

interface DepartureData {
  route: string;
  arrivalDate: string;
  departureDate: string;
  price: number;
  maxParticipants: number;
}

const newDepartures: DepartureData[] = [
  // April 2026
  { route: "8-day Lemosho", arrivalDate: "2026-04-08", departureDate: "2026-04-17", price: 2680, maxParticipants: 10 },
  { route: "7-day Machame", arrivalDate: "2026-04-22", departureDate: "2026-04-30", price: 2440, maxParticipants: 10 },

  // May 2026
  { route: "8-day Lemosho", arrivalDate: "2026-05-05", departureDate: "2026-05-14", price: 2680, maxParticipants: 10 },
  { route: "8-day Lemosho", arrivalDate: "2026-05-17", departureDate: "2026-05-26", price: 2680, maxParticipants: 10 },
  { route: "7-day Machame", arrivalDate: "2026-05-26", departureDate: "2026-06-03", price: 2440, maxParticipants: 10 },
];

const routeSlugs: Record<string, string> = {
  "8-day Lemosho": "8-days-lemosho-route",
  "7-day Machame": "7-days-machame-route",
};

async function seed() {
  console.log("🏔️ Seeding April & May 2026 Kilimanjaro Departures...\n");

  // Look up route IDs
  const routeIds: Record<string, string> = {};
  for (const [name, slug] of Object.entries(routeSlugs)) {
    const route = await prisma.trekkingRoute.findUnique({ where: { slug } });
    if (!route) {
      console.error(`❌ Route not found: ${name} (${slug}). Run main seed first.`);
      process.exit(1);
    }
    routeIds[name] = route.id;
    console.log(`✅ Found route: ${name} (${route.id})`);
  }

  console.log("\n📅 Creating departures...\n");

  let created = 0;
  for (const dep of newDepartures) {
    const routeId = routeIds[dep.route];
    const arrivalDate = new Date(dep.arrivalDate);
    const endDate = new Date(dep.departureDate);

    const startDate = new Date(arrivalDate);
    startDate.setDate(startDate.getDate() + 1);

    const summitDate = new Date(endDate);
    summitDate.setDate(summitDate.getDate() - 1);

    // Skip if a departure with same route + arrival date already exists
    const existing = await prisma.groupDeparture.findFirst({
      where: { routeId, arrivalDate },
    });
    if (existing) {
      console.log(`  ⏭️  Skipped (already exists): ${dep.route} ${dep.arrivalDate}`);
      continue;
    }

    await prisma.groupDeparture.create({
      data: {
        routeId,
        arrivalDate,
        startDate,
        summitDate,
        endDate,
        price: dep.price,
        maxParticipants: dep.maxParticipants,
        status: "OPEN",
        isFullMoon: false,
        isGuaranteed: false,
        year: arrivalDate.getFullYear(),
        month: arrivalDate.getMonth() + 1,
      },
    });

    console.log(`  📅 ${dep.route}: ${dep.arrivalDate} → ${dep.departureDate} | $${dep.price} | ${dep.maxParticipants} spots`);
    created++;
  }

  console.log(`\n🎉 Created ${created} new departures!`);
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
