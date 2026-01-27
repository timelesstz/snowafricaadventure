import "dotenv/config";
import prisma from "../src/lib/prisma";

/**
 * Seed Group Departures from Snow Africa Adventure website
 * Data extracted from: https://snowafricaadventure.com/kilimanjaro-join-group-departures/
 */

interface DepartureData {
  route: string;
  arrivalDate: string;
  departureDate: string;
  price: number;
  maxParticipants: number;
  isFullMoon?: boolean;
}

// All departures from the website
const departures2026: DepartureData[] = [
  // January 2026
  { route: "8-day Lemosho", arrivalDate: "2026-01-02", departureDate: "2026-01-11", price: 2680, maxParticipants: 9 },
  { route: "8-day Lemosho", arrivalDate: "2026-01-06", departureDate: "2026-01-15", price: 2680, maxParticipants: 10 },
  { route: "7-day Machame", arrivalDate: "2026-01-08", departureDate: "2026-01-16", price: 2440, maxParticipants: 9 },
  { route: "6-day Rongai", arrivalDate: "2026-01-09", departureDate: "2026-01-16", price: 2390, maxParticipants: 10 },
  { route: "7-day Machame", arrivalDate: "2026-01-12", departureDate: "2026-01-20", price: 2440, maxParticipants: 9 },
  { route: "8-day Lemosho", arrivalDate: "2026-01-15", departureDate: "2026-01-24", price: 2680, maxParticipants: 8 },
  { route: "8-day Lemosho", arrivalDate: "2026-01-27", departureDate: "2026-02-05", price: 2680, maxParticipants: 8, isFullMoon: true },

  // February 2026
  { route: "8-day Lemosho", arrivalDate: "2026-02-05", departureDate: "2026-02-14", price: 2680, maxParticipants: 9 },
  { route: "7-day Machame", arrivalDate: "2026-02-06", departureDate: "2026-02-14", price: 2440, maxParticipants: 9 },
  { route: "6-day Rongai", arrivalDate: "2026-02-07", departureDate: "2026-02-14", price: 2390, maxParticipants: 9 },
  { route: "8-day Lemosho", arrivalDate: "2026-02-14", departureDate: "2026-02-24", price: 2680, maxParticipants: 8 },
  { route: "7-day Machame", arrivalDate: "2026-02-18", departureDate: "2026-02-26", price: 2440, maxParticipants: 9 },
  { route: "8-day Lemosho", arrivalDate: "2026-02-25", departureDate: "2026-03-06", price: 2680, maxParticipants: 8, isFullMoon: true },
  { route: "7-day Machame", arrivalDate: "2026-02-28", departureDate: "2026-03-08", price: 2440, maxParticipants: 9 },

  // March 2026
  { route: "8-day Lemosho", arrivalDate: "2026-03-06", departureDate: "2026-03-15", price: 2680, maxParticipants: 9 },
  { route: "7-day Machame", arrivalDate: "2026-03-07", departureDate: "2026-03-15", price: 2440, maxParticipants: 9 },
  { route: "6-day Rongai", arrivalDate: "2026-03-08", departureDate: "2026-03-15", price: 2390, maxParticipants: 8 },
  { route: "8-day Lemosho", arrivalDate: "2026-03-15", departureDate: "2026-03-24", price: 2680, maxParticipants: 8 },
  { route: "7-day Machame", arrivalDate: "2026-03-20", departureDate: "2026-03-28", price: 2440, maxParticipants: 9 },
  { route: "8-day Lemosho", arrivalDate: "2026-03-25", departureDate: "2026-04-03", price: 2680, maxParticipants: 8 },

  // June 2026
  { route: "8-day Lemosho", arrivalDate: "2026-06-04", departureDate: "2026-06-13", price: 2680, maxParticipants: 10 },
  { route: "7-day Machame", arrivalDate: "2026-06-05", departureDate: "2026-06-13", price: 2440, maxParticipants: 10 },
  { route: "6-day Rongai", arrivalDate: "2026-06-06", departureDate: "2026-06-13", price: 2390, maxParticipants: 10 },
];

// Route configurations
const routeConfigs: Record<string, { slug: string; duration: string; durationDays: number }> = {
  "8-day Lemosho": { slug: "8-days-lemosho-route", duration: "8 Days", durationDays: 8 },
  "7-day Machame": { slug: "7-days-machame-route", duration: "7 Days", durationDays: 7 },
  "6-day Rongai": { slug: "6-days-rongai-route", duration: "6 Days", durationDays: 6 },
};

async function seedGroupDepartures() {
  console.log("🏔️ Seeding Group Departures from Snow Africa Adventure...\n");

  // Get the Kilimanjaro category
  const category = await prisma.category.findFirst({
    where: { slug: "kilimanjaro-routes" },
  });

  if (!category) {
    console.error("❌ Kilimanjaro routes category not found. Run main seed first.");
    return;
  }

  // Create/update routes and store their IDs
  const routeIds: Record<string, string> = {};

  for (const [routeName, config] of Object.entries(routeConfigs)) {
    const route = await prisma.trekkingRoute.upsert({
      where: { slug: config.slug },
      update: {
        title: `${routeName} Route`,
        duration: config.duration,
        durationDays: config.durationDays,
      },
      create: {
        slug: config.slug,
        title: `${routeName} Route`,
        duration: config.duration,
        durationDays: config.durationDays,
        overview: `The ${routeName} route is one of Kilimanjaro's most popular climbing routes.`,
        highlights: [],
        inclusions: [
          "Park entrance fees",
          "Professional guides",
          "Porters and cook team",
          "All meals on mountain",
          "Camping equipment",
          "Emergency oxygen",
        ],
        exclusions: [
          "International flights",
          "Visa fees",
          "Travel insurance",
          "Personal gear",
          "Tips for crew",
        ],
        isActive: true,
        categoryId: category.id,
      },
    });

    routeIds[routeName] = route.id;
    console.log(`✅ Route: ${routeName} (${route.id})`);
  }

  // Delete existing departures for these routes
  for (const routeId of Object.values(routeIds)) {
    await prisma.groupDeparture.deleteMany({
      where: { routeId },
    });
  }

  console.log("\n📅 Creating departures...\n");

  // Create all departures
  let createdCount = 0;
  for (const dep of departures2026) {
    const routeId = routeIds[dep.route];
    if (!routeId) {
      console.warn(`⚠️ Route not found: ${dep.route}`);
      continue;
    }

    const config = routeConfigs[dep.route];
    const arrivalDate = new Date(dep.arrivalDate);
    const endDate = new Date(dep.departureDate);

    // Calculate startDate (day after arrival) and summitDate (day before end for most routes)
    const startDate = new Date(arrivalDate);
    startDate.setDate(startDate.getDate() + 1);

    const summitDate = new Date(endDate);
    summitDate.setDate(summitDate.getDate() - 1);

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
        isFullMoon: dep.isFullMoon || false,
        isGuaranteed: false,
        year: arrivalDate.getFullYear(),
        month: arrivalDate.getMonth() + 1,
      },
    });

    const fullMoonTag = dep.isFullMoon ? " 🌕 Full Moon" : "";
    console.log(`  📅 ${dep.route}: ${dep.arrivalDate} → ${dep.departureDate} | $${dep.price} | ${dep.maxParticipants} spots${fullMoonTag}`);
    createdCount++;
  }

  console.log(`\n🎉 Created ${createdCount} group departures!`);
  console.log("\n📊 Summary by route:");

  for (const [routeName, routeId] of Object.entries(routeIds)) {
    const count = await prisma.groupDeparture.count({
      where: { routeId },
    });
    console.log(`   ${routeName}: ${count} departures`);
  }
}

seedGroupDepartures()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
