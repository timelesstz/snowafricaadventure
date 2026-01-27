import "dotenv/config";
import prisma from "../src/lib/prisma";
import { createCommission } from "../src/lib/commission";

async function createTestBooking() {
  console.log("🧪 Creating Test Booking to Verify Commission System\n");

  // 1. Find an available departure
  const departure = await prisma.groupDeparture.findFirst({
    where: { status: "OPEN" },
    include: { route: { select: { title: true, slug: true } } },
    orderBy: { arrivalDate: "asc" },
  });

  if (!departure) {
    console.log("❌ No open departures found!");
    return;
  }

  console.log("📅 Selected Departure:");
  console.log(`   Route: ${departure.route.title}`);
  console.log(`   Date: ${departure.arrivalDate.toISOString().split("T")[0]}`);
  console.log(`   Price: $${departure.price}/person`);

  // 2. Create a test booking
  const totalClimbers = 2;
  const pricePerPerson = Number(departure.price);
  const totalPrice = pricePerPerson * totalClimbers;

  const booking = await prisma.booking.create({
    data: {
      departureId: departure.id,
      leadName: "Test Climber",
      leadEmail: "test@example.com",
      leadPhone: "+1234567890",
      leadNationality: "United States",
      totalClimbers,
      pricePerPerson,
      totalPrice,
      depositAmount: Math.round(totalPrice * 0.3),
      status: "INQUIRY",
      climberDetails: [
        { name: "Test Climber", nationality: "United States" },
        { name: "Test Partner", nationality: "United States" },
      ],
      source: "website",
      notes: "TEST BOOKING - Safe to delete",
    },
  });

  console.log("\n✅ Booking Created:");
  console.log(`   ID: ${booking.id}`);
  console.log(`   Lead: ${booking.leadName}`);
  console.log(`   Climbers: ${booking.totalClimbers}`);
  console.log(`   Total Price: $${booking.totalPrice}`);

  // 3. Create commission (simulating what the API does)
  console.log("\n💰 Creating Commission...");

  const commission = await createCommission({
    bookingId: booking.id,
    bookingAmount: totalPrice,
    tripType: "kilimanjaro",
  });

  if (commission) {
    console.log("\n✅ Commission Created:");
    console.log(`   ID: ${commission.id}`);
    console.log(`   Booking Amount: $${commission.bookingAmount}`);
    console.log(`   Commission Rate: ${commission.commissionRate}%`);
    console.log(`   Commission Amount: $${commission.commissionAmount}`);
    console.log(`   Trip Type: ${commission.tripType}`);
    console.log(`   Status: ${commission.status}`);
  } else {
    console.log("❌ Commission creation failed!");
  }

  // 4. Verify in database
  console.log("\n🔍 Verifying in Database...");

  const verifyBooking = await prisma.booking.findUnique({
    where: { id: booking.id },
    include: { commission: true },
  });

  if (verifyBooking?.commission) {
    console.log("✅ Commission linked to booking correctly!");
    console.log(`   Commission ID: ${verifyBooking.commission.id}`);
  } else {
    console.log("❌ Commission not linked to booking!");
  }

  // 5. Check partner earnings
  const partner = await prisma.partner.findFirst({
    where: { type: "MARKETING", isActive: true },
    include: {
      commissions: {
        where: { status: { in: ["PENDING", "ELIGIBLE"] } },
      },
    },
  });

  if (partner) {
    const totalPending = partner.commissions.reduce(
      (sum, c) => sum + Number(c.commissionAmount),
      0
    );
    console.log(`\n📊 Partner "${partner.name}" Earnings:`);
    console.log(`   Pending Commissions: ${partner.commissions.length}`);
    console.log(`   Total Pending Amount: $${totalPending.toFixed(2)}`);
  }

  console.log("\n🎉 Test Complete!");
  console.log("\n📝 To clean up, run:");
  console.log(`   npx tsx -e "import prisma from './src/lib/prisma'; prisma.booking.delete({ where: { id: '${booking.id}' } }).then(() => console.log('Deleted')).finally(() => prisma.\\$disconnect())"`);
}

createTestBooking()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
