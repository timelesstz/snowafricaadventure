import "dotenv/config";
import { readFileSync } from "fs";
import { resolve } from "path";
import prisma from "../src/lib/prisma";

interface WPRow {
  value: {
    route: string;
    arrivaldate: string;
    departuredate: string;
    priceusd: string;
    tripavailability: string;
  };
}

interface WPExport {
  original_rows: WPRow[];
}

// Route mapping: normalized WordPress name → DB slug
const ROUTE_MAP: Record<string, string> = {
  "6-day rongai route": "6-days-rongai-route",
  "7-day machame route": "7-days-machame-route",
  "8-day lemosho route": "8-days-lemosho-route",
  "8-day lemosho": "8-days-lemosho-route",
};

function cleanRouteName(raw: string): string {
  return raw
    .replace(/<\/?b>/gi, "") // Strip <b> tags
    .replace(/full\s*moon\s*climb?/gi, "") // Remove "Full Moon Climb"
    .replace(/full$/i, "") // Remove trailing "Full" (truncated)
    .trim();
}

function matchRoute(raw: string): string {
  const cleaned = cleanRouteName(raw).toLowerCase();
  for (const [pattern, slug] of Object.entries(ROUTE_MAP)) {
    if (cleaned === pattern || cleaned.startsWith(pattern)) {
      return slug;
    }
  }
  throw new Error(`Unknown route: "${raw}" (cleaned: "${cleaned}")`);
}

function isFullMoon(raw: string): boolean {
  return /full\s*moon/i.test(raw);
}

function parseDate(raw: string): Date {
  // Normalize whitespace and common issues
  let s = raw.trim().replace(/\s+/g, " ");
  // Fix "Sept" → "Sep" for Date.parse
  s = s.replace(/Sept\b/g, "Sep");
  // Fix missing comma: "Oct 01,2026" → "Oct 01, 2026"
  s = s.replace(/,(\d{4})/, ", $1");
  // Fix missing comma after day: "July 5 2026" → "July 5, 2026"
  s = s.replace(/^(\w+ \d{1,2}) (\d{4})$/, "$1, $2");

  const date = new Date(s);
  if (isNaN(date.getTime())) {
    throw new Error(`Cannot parse date: "${raw}" (normalized: "${s}")`);
  }
  return date;
}

function parsePrice(raw: string): number {
  return parseInt(raw.replace(/[$,]/g, ""), 10);
}

function parseSpaces(raw: string): number {
  const match = raw.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 10;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function main() {
  console.log("Seeding 2026 departures from WordPress data...\n");

  // Load WordPress JSON export
  const jsonPath = resolve(
    process.env.USERPROFILE || process.env.HOME || ".",
    "Downloads",
    "kilimanjaro_group_climb_2026-csv.json"
  );
  const data: WPExport = JSON.parse(readFileSync(jsonPath, "utf-8"));
  const rows = data.original_rows;
  console.log(`Found ${rows.length} rows in WordPress export\n`);

  // Look up route IDs
  const routes = await prisma.trekkingRoute.findMany({
    where: {
      slug: { in: Object.values(ROUTE_MAP) },
    },
    select: { id: true, slug: true, title: true },
  });

  const routeIdMap = new Map(routes.map((r) => [r.slug, r.id]));
  console.log("Route ID mapping:");
  for (const r of routes) {
    console.log(`  ${r.slug} → ${r.id} (${r.title})`);
  }

  // Verify all routes exist
  for (const slug of new Set(Object.values(ROUTE_MAP))) {
    if (!routeIdMap.has(slug)) {
      throw new Error(`Route not found in database: ${slug}`);
    }
  }

  // Delete related records first (bookings, invite links), then departures
  const departuresToDelete = await prisma.groupDeparture.findMany({
    where: { year: { in: [2025, 2026] } },
    select: { id: true },
  });
  const depIds = departuresToDelete.map((d) => d.id);

  if (depIds.length > 0) {
    // Find bookings to delete commissions first
    const bookingsToDelete = await prisma.booking.findMany({
      where: { departureId: { in: depIds } },
      select: { id: true },
    });
    const bookingIds = bookingsToDelete.map((b) => b.id);

    if (bookingIds.length > 0) {
      await prisma.commission.deleteMany({
        where: { bookingId: { in: bookingIds } },
      });
    }

    await prisma.booking.deleteMany({
      where: { departureId: { in: depIds } },
    });
    await prisma.inviteLink.deleteMany({
      where: { departureId: { in: depIds } },
    });
  }

  const deleted2025 = await prisma.groupDeparture.deleteMany({
    where: { year: 2025 },
  });
  const deleted2026 = await prisma.groupDeparture.deleteMany({
    where: { year: 2026 },
  });
  console.log(
    `\nDeleted ${deleted2025.count} existing 2025 departures`
  );
  console.log(
    `Deleted ${deleted2026.count} existing 2026 departures\n`
  );

  // Insert new departures
  let created = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].value;
    const routeSlug = matchRoute(row.route);
    const routeId = routeIdMap.get(routeSlug)!;
    const fullMoon = isFullMoon(row.route);
    const arrivalDate = parseDate(row.arrivaldate);
    const endDate = parseDate(row.departuredate);
    const startDate = addDays(arrivalDate, 1);
    const summitDate = addDays(endDate, -1);
    const price = parsePrice(row.priceusd);
    const maxParticipants = parseSpaces(row.tripavailability);
    const year = arrivalDate.getFullYear();
    const month = arrivalDate.getMonth() + 1;

    await prisma.groupDeparture.create({
      data: {
        routeId,
        arrivalDate,
        startDate,
        summitDate,
        endDate,
        price,
        currency: "USD",
        maxParticipants,
        isFullMoon: fullMoon,
        status: "OPEN",
        year,
        month,
      },
    });

    const routeName = cleanRouteName(row.route);
    const dateStr = arrivalDate.toISOString().split("T")[0];
    console.log(
      `  [${i + 1}/${rows.length}] ${routeName}${fullMoon ? " (Full Moon)" : ""} — ${dateStr} — $${price} — ${maxParticipants} spots`
    );
    created++;
  }

  console.log(`\nCreated ${created} departures for 2026`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
