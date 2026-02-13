import { config } from "dotenv";
config({ path: ".env.local" });

// Route IDs from database
const ROUTES = {
  "7-day-machame": "cmlkt99us000ufkyelwsy2mia",
  "8-day-lemosho": "cmlkt9a59000vfkyertcq8kjw",
  "6-day-rongai": "cmlkt9b0o000yfkyethl36zv9",
};

// Today's date for filtering past departures
const TODAY = new Date("2026-02-13");

interface DepartureData {
  route: keyof typeof ROUTES;
  arrivalDate: string;
  endDate: string;
  price: number;
  isFullMoon: boolean;
}

// All departures from screenshots
const departures: DepartureData[] = [
  // January 2026
  { route: "8-day-lemosho", arrivalDate: "2026-01-02", endDate: "2026-01-11", price: 2680, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-01-06", endDate: "2026-01-15", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-01-08", endDate: "2026-01-16", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-01-09", endDate: "2026-01-16", price: 2390, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-01-12", endDate: "2026-01-20", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-01-15", endDate: "2026-01-24", price: 2680, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-01-27", endDate: "2026-02-05", price: 2680, isFullMoon: true },

  // February 2026
  { route: "8-day-lemosho", arrivalDate: "2026-02-05", endDate: "2026-02-14", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-02-06", endDate: "2026-02-14", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-02-07", endDate: "2026-02-14", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-02-14", endDate: "2026-02-24", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-02-18", endDate: "2026-02-26", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-02-25", endDate: "2026-03-06", price: 2680, isFullMoon: true },
  { route: "7-day-machame", arrivalDate: "2026-02-28", endDate: "2026-03-08", price: 2440, isFullMoon: false },

  // March 2026
  { route: "7-day-machame", arrivalDate: "2026-03-06", endDate: "2026-03-15", price: 2440, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-03-07", endDate: "2026-03-15", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-03-08", endDate: "2026-03-15", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-03-15", endDate: "2026-03-24", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-03-20", endDate: "2026-03-28", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-03-25", endDate: "2026-04-03", price: 2680, isFullMoon: false },

  // June 2026
  { route: "8-day-lemosho", arrivalDate: "2026-06-04", endDate: "2026-06-13", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-06-05", endDate: "2026-06-13", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-06-06", endDate: "2026-06-13", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-06-10", endDate: "2026-06-19", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-06-18", endDate: "2026-06-26", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-06-24", endDate: "2026-07-03", price: 2680, isFullMoon: true },
  { route: "8-day-lemosho", arrivalDate: "2026-06-25", endDate: "2026-07-04", price: 2680, isFullMoon: false },

  // July 2026
  { route: "8-day-lemosho", arrivalDate: "2026-07-03", endDate: "2026-07-12", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-07-04", endDate: "2026-07-12", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-07-05", endDate: "2026-07-12", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-07-10", endDate: "2026-07-19", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-07-16", endDate: "2026-07-24", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-07-20", endDate: "2026-07-27", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-07-23", endDate: "2026-08-01", price: 2680, isFullMoon: true },
  { route: "7-day-machame", arrivalDate: "2026-07-28", endDate: "2026-08-05", price: 2440, isFullMoon: false },

  // August 2026
  { route: "8-day-lemosho", arrivalDate: "2026-08-02", endDate: "2026-08-11", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-08-03", endDate: "2026-08-11", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-08-04", endDate: "2026-08-11", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-08-08", endDate: "2026-08-17", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-08-14", endDate: "2026-08-22", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-08-18", endDate: "2026-08-25", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-08-22", endDate: "2026-08-31", price: 2680, isFullMoon: true },

  // September 2026
  { route: "7-day-machame", arrivalDate: "2026-09-01", endDate: "2026-09-09", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-09-02", endDate: "2026-09-09", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-09-10", endDate: "2026-09-19", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-09-15", endDate: "2026-09-23", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-09-20", endDate: "2026-09-29", price: 2680, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-09-26", endDate: "2026-10-05", price: 2680, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-09-30", endDate: "2026-10-09", price: 2680, isFullMoon: false },

  // October 2026
  { route: "7-day-machame", arrivalDate: "2026-10-01", endDate: "2026-10-09", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-10-02", endDate: "2026-10-09", price: 2390, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-10-10", endDate: "2026-10-19", price: 2680, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-10-24", endDate: "2026-10-29", price: 2680, isFullMoon: true },
  { route: "8-day-lemosho", arrivalDate: "2026-10-24", endDate: "2026-11-02", price: 2680, isFullMoon: false },

  // November 2026
  { route: "7-day-machame", arrivalDate: "2026-11-05", endDate: "2026-11-13", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-11-18", endDate: "2026-11-27", price: 2680, isFullMoon: true },
  { route: "8-day-lemosho", arrivalDate: "2026-11-28", endDate: "2026-12-07", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-11-29", endDate: "2026-12-07", price: 2440, isFullMoon: false },
  { route: "6-day-rongai", arrivalDate: "2026-11-30", endDate: "2026-12-07", price: 2390, isFullMoon: false },

  // December 2026
  { route: "8-day-lemosho", arrivalDate: "2026-12-06", endDate: "2026-12-15", price: 2680, isFullMoon: false },
  { route: "7-day-machame", arrivalDate: "2026-12-10", endDate: "2026-12-18", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-12-18", endDate: "2026-12-27", price: 2680, isFullMoon: true },
  { route: "7-day-machame", arrivalDate: "2026-12-24", endDate: "2027-01-01", price: 2440, isFullMoon: false },
  { route: "8-day-lemosho", arrivalDate: "2026-12-28", endDate: "2027-01-06", price: 2680, isFullMoon: false },
];

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");

  // Delete in order of foreign key dependencies
  try {
    const deletedCommissions = await prisma.commission.deleteMany({});
    console.log(`Deleted ${deletedCommissions.count} existing commissions`);
  } catch (e) { console.log("No commissions to delete"); }

  try {
    const deletedBookings = await prisma.booking.deleteMany({});
    console.log(`Deleted ${deletedBookings.count} existing bookings`);
  } catch (e) { console.log("No bookings to delete"); }

  try {
    const deletedInviteLinks = await prisma.departureInviteLink.deleteMany({});
    console.log(`Deleted ${deletedInviteLinks.count} existing invite links`);
  } catch (e) { console.log("No invite links to delete"); }

  // Delete existing departures
  const deleted = await prisma.groupDeparture.deleteMany({});
  console.log(`Deleted ${deleted.count} existing departures`);

  let created = 0;
  let skipped = 0;

  for (const dep of departures) {
    const arrivalDate = new Date(dep.arrivalDate);
    const endDate = new Date(dep.endDate);

    // Skip past departures
    if (arrivalDate < TODAY) {
      console.log(`Skipping past: ${dep.route} ${dep.arrivalDate}`);
      skipped++;
      continue;
    }

    const routeId = ROUTES[dep.route];
    if (!routeId) {
      console.log(`Unknown route: ${dep.route}`);
      continue;
    }

    // Calculate summit date (usually 1-2 days before end)
    const summitDate = new Date(endDate);
    summitDate.setDate(summitDate.getDate() - 1);

    // Calculate start date (1 day after arrival for hotel night)
    const startDate = new Date(arrivalDate);
    startDate.setDate(startDate.getDate() + 1);

    const year = arrivalDate.getFullYear();
    const month = arrivalDate.getMonth() + 1;

    await prisma.groupDeparture.create({
      data: {
        routeId,
        arrivalDate,
        startDate,
        summitDate,
        endDate,
        price: dep.price,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        isFullMoon: dep.isFullMoon,
        isGuaranteed: true, // All departures are guaranteed
        isFeatured: dep.isFullMoon, // Feature full moon climbs
        status: "GUARANTEED", // Changed from OPEN to GUARANTEED
        year,
        month,
      },
    });

    created++;
    console.log(`Created: ${dep.route} | ${dep.arrivalDate} → ${dep.endDate} | $${dep.price}${dep.isFullMoon ? " 🌕" : ""}`);
  }

  console.log(`\n=== Summary ===`);
  console.log(`Created: ${created}`);
  console.log(`Skipped (past): ${skipped}`);

  // Verify
  const total = await prisma.groupDeparture.count();
  console.log(`Total in database: ${total}`);

  await prisma.$disconnect();
}

main().catch(console.error);
