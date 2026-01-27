import "dotenv/config";
import prisma from "../src/lib/prisma";

async function checkCommissionSystem() {
  console.log("🔍 Checking Commission System Status\n");

  // Check partner
  const partner = await prisma.partner.findFirst({
    where: { type: "MARKETING", isActive: true },
    include: {
      commissionRates: { where: { isActive: true } },
      _count: { select: { commissions: true } },
    },
  });

  if (partner) {
    console.log("✅ Marketing Partner Found:");
    console.log(`   Name: ${partner.name}`);
    console.log(`   Type: ${partner.type}`);
    console.log(`   Active: ${partner.isActive}`);
    console.log(`   Total Commissions: ${partner._count.commissions}`);
    console.log("\n   Commission Rates:");
    partner.commissionRates.forEach((rate) => {
      console.log(`   - ${rate.tripType}: ${rate.commissionRate}%`);
    });
  } else {
    console.log("❌ No active MARKETING partner found!");
  }

  // Check recent commissions
  const commissions = await prisma.commission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      booking: {
        select: { leadName: true, totalPrice: true },
      },
    },
  });

  console.log(`\n📊 Recent Commissions (${commissions.length} found):`);
  if (commissions.length === 0) {
    console.log("   No commissions yet. Create a booking to generate one.");
  } else {
    commissions.forEach((c) => {
      console.log(`   - ${c.booking.leadName}: $${c.commissionAmount} (${c.status}) - ${c.tripType || "N/A"}`);
    });
  }

  // Check bookings
  const bookingCount = await prisma.booking.count();
  const bookingsWithCommission = await prisma.booking.count({
    where: { commission: { isNot: null } },
  });

  console.log(`\n📋 Booking Stats:`);
  console.log(`   Total Bookings: ${bookingCount}`);
  console.log(`   With Commission: ${bookingsWithCommission}`);
  console.log(`   Without Commission: ${bookingCount - bookingsWithCommission}`);

  // Check departures
  const departureCount = await prisma.groupDeparture.count({
    where: { status: "OPEN" },
  });
  console.log(`\n🏔️ Open Departures: ${departureCount}`);

  console.log("\n✅ Commission system check complete!");
}

checkCommissionSystem()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
