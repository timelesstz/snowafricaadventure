import { config } from "dotenv";
config({ path: ".env.local" });

/**
 * Seed 2027 group departures from the "Kilimanjaro Join Group Departures 2027" document.
 *
 * ADDITIVE ONLY — skips any departure that already exists for the same
 * route + arrival date. Never deletes or overwrites.
 *
 * Four typos in the source document were corrected so departure dates match
 * each route's duration (Lemosho +9, Machame +8, Northern Circuit +10):
 * - Lemosho FM Jan 15: ends Jan 24, 2027 (doc said Feb 24)
 * - Lemosho Feb 25: ends Mar 6, 2027 (doc said Feb 6)
 * - Machame May 26: ends Jun 3, 2027 (doc said Jun 3, 2026)
 * - Lemosho FM Aug 10: ends Aug 19, 2027 (doc said Sept 19)
 */

const ROUTES = {
  LEMOSHO: { slug: "8-days-lemosho-route", price: 2860 },
  MACHAME: { slug: "7-days-machame-route", price: 2580 },
  // Existing NC departures point at this route record (not 9-days-northern-circuit-route)
  NORTHERN: { slug: "9-day-northern-circuit-route-kilimanjaro-guide", price: 3100 },
} as const;

type RouteKey = keyof typeof ROUTES;

// [route, isFullMoon, arrivalYear, arrivalMonth, arrivalDay, endYear, endMonth, endDay]
// Months are 1-based.
const DEPARTURES: [RouteKey, boolean, number, number, number, number, number, number][] = [
  ["LEMOSHO", false, 2027, 1, 2, 2027, 1, 11],
  ["MACHAME", false, 2027, 1, 8, 2027, 1, 16],
  ["NORTHERN", true, 2027, 1, 14, 2027, 1, 24],
  ["LEMOSHO", true, 2027, 1, 15, 2027, 1, 24],
  ["MACHAME", false, 2027, 1, 24, 2027, 2, 1],
  ["LEMOSHO", false, 2027, 1, 30, 2027, 2, 8],
  ["LEMOSHO", false, 2027, 2, 5, 2027, 2, 14],
  ["MACHAME", false, 2027, 2, 10, 2027, 2, 18],
  ["LEMOSHO", true, 2027, 2, 13, 2027, 2, 22],
  ["MACHAME", true, 2027, 2, 14, 2027, 2, 22],
  ["LEMOSHO", false, 2027, 2, 25, 2027, 3, 6],
  ["MACHAME", false, 2027, 3, 10, 2027, 3, 18],
  ["LEMOSHO", false, 2027, 3, 20, 2027, 3, 29],
  ["LEMOSHO", true, 2027, 3, 25, 2027, 4, 3],
  ["MACHAME", true, 2027, 3, 26, 2027, 4, 3],
  ["MACHAME", false, 2027, 5, 26, 2027, 6, 3],
  ["LEMOSHO", false, 2027, 6, 4, 2027, 6, 13],
  ["NORTHERN", true, 2027, 6, 11, 2027, 6, 21],
  ["MACHAME", true, 2027, 6, 13, 2027, 6, 21],
  ["LEMOSHO", false, 2027, 6, 25, 2027, 7, 4],
  ["MACHAME", false, 2027, 7, 3, 2027, 7, 11],
  ["NORTHERN", true, 2027, 7, 10, 2027, 7, 20],
  ["LEMOSHO", true, 2027, 7, 11, 2027, 7, 20],
  ["MACHAME", false, 2027, 7, 18, 2027, 7, 26],
  ["LEMOSHO", false, 2027, 7, 25, 2027, 8, 3],
  ["MACHAME", false, 2027, 8, 5, 2027, 8, 13],
  ["NORTHERN", true, 2027, 8, 9, 2027, 8, 19],
  ["LEMOSHO", true, 2027, 8, 10, 2027, 8, 19],
  ["MACHAME", false, 2027, 8, 15, 2027, 8, 23],
  ["LEMOSHO", false, 2027, 8, 25, 2027, 9, 3],
  ["MACHAME", false, 2027, 9, 5, 2027, 9, 13],
  ["NORTHERN", true, 2027, 9, 7, 2027, 9, 17],
  ["LEMOSHO", true, 2027, 9, 8, 2027, 9, 17],
  ["MACHAME", false, 2027, 9, 14, 2027, 9, 22],
  ["LEMOSHO", false, 2027, 9, 25, 2027, 10, 4],
  ["LEMOSHO", false, 2027, 10, 4, 2027, 10, 13],
  ["NORTHERN", true, 2027, 10, 7, 2027, 10, 17],
  ["LEMOSHO", true, 2027, 10, 8, 2027, 10, 17],
  ["MACHAME", false, 2027, 10, 15, 2027, 10, 23],
  ["LEMOSHO", false, 2027, 10, 20, 2027, 10, 29],
  ["MACHAME", false, 2027, 11, 20, 2027, 11, 28],
  ["NORTHERN", true, 2027, 12, 5, 2027, 12, 15],
  ["LEMOSHO", true, 2027, 12, 6, 2027, 12, 15],
  ["MACHAME", true, 2027, 12, 7, 2027, 12, 15],
  ["LEMOSHO", false, 2027, 12, 15, 2027, 12, 24],
  ["MACHAME", false, 2027, 12, 20, 2027, 12, 28],
  ["LEMOSHO", false, 2027, 12, 25, 2028, 1, 3],
  ["MACHAME", false, 2027, 12, 28, 2028, 1, 5],
];

function utcDate(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");

  const routes = await prisma.trekkingRoute.findMany({
    where: { slug: { in: Object.values(ROUTES).map((r) => r.slug) } },
    select: { id: true, slug: true, title: true },
  });
  const routeIdMap = new Map(routes.map((r) => [r.slug, r.id]));
  for (const { slug } of Object.values(ROUTES)) {
    if (!routeIdMap.has(slug)) throw new Error(`Route not found: ${slug}`);
  }

  let created = 0;
  let skipped = 0;

  for (const [key, fullMoon, ay, am, ad, ey, em, ed] of DEPARTURES) {
    const route = ROUTES[key];
    const routeId = routeIdMap.get(route.slug)!;
    const arrivalDate = utcDate(ay, am, ad);
    const endDate = utcDate(ey, em, ed);

    const existing = await prisma.groupDeparture.findFirst({
      where: { routeId, arrivalDate },
      select: { id: true },
    });

    const label = `${key}${fullMoon ? " (Full Moon)" : ""} — ${arrivalDate.toISOString().split("T")[0]} → ${endDate.toISOString().split("T")[0]} — $${route.price}`;

    if (existing) {
      console.log(`  SKIP (exists): ${label}`);
      skipped++;
      continue;
    }

    await prisma.groupDeparture.create({
      data: {
        routeId,
        arrivalDate,
        startDate: addDays(arrivalDate, 1),
        summitDate: addDays(endDate, -1),
        endDate,
        price: route.price,
        currency: "USD",
        maxParticipants: 10,
        isFullMoon: fullMoon,
        isGuaranteed: true,
        status: "GUARANTEED",
        year: ay,
        month: am,
      },
    });
    console.log(`  CREATED: ${label}`);
    created++;
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped} (of ${DEPARTURES.length}).`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
