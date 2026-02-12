import "dotenv/config";
import prisma from "../src/lib/prisma";
import { createCommission } from "../src/lib/commission";

async function testPartnerEmail() {
  console.log("🧪 Testing Partner Commission Email\n");

  // 1. Check partner email
  const partner = await prisma.partner.findFirst({
    where: { type: "MARKETING", isActive: true },
  });

  if (!partner) {
    console.log("❌ No active MARKETING partner found!");
    return;
  }

  console.log("📧 Partner Email Configuration:");
  console.log(`   Name: ${partner.name}`);
  console.log(`   Email: ${partner.contactEmail}`);
  console.log(`   CC: business@craftedbytimeless.com (hardcoded)`);

  // 2. Find an available departure
  const departure = await prisma.groupDeparture.findFirst({
    where: { status: "OPEN" },
    include: { route: { select: { title: true } } },
    orderBy: { arrivalDate: "asc" },
  });

  if (!departure) {
    console.log("❌ No open departures found!");
    return;
  }

  console.log(`\n📅 Using Departure: ${departure.route.title}`);
  console.log(`   Date: ${departure.arrivalDate.toISOString().split("T")[0]}`);

  // 3. Create a test booking
  console.log("\n📝 Creating test booking...");

  const totalClimbers = 1;
  const pricePerPerson = Number(departure.price);
  const totalPrice = pricePerPerson * totalClimbers;

  const booking = await prisma.booking.create({
    data: {
      departureId: departure.id,
      leadName: "Email Test User",
      leadEmail: "test@example.com",
      totalClimbers,
      pricePerPerson,
      totalPrice,
      depositAmount: Math.round(totalPrice * 0.3),
      status: "INQUIRY",
      climberDetails: [{ name: "Email Test User", nationality: "Test" }],
      source: "website",
      notes: "TEST BOOKING FOR EMAIL - Safe to delete",
    },
  });

  console.log(`✅ Booking created: ${booking.id}`);
  console.log(`   Total Price: $${totalPrice}`);

  // 4. Create commission (this should trigger the email)
  console.log("\n💰 Creating commission (this will send the email)...");

  const commission = await createCommission({
    bookingId: booking.id,
    bookingAmount: totalPrice,
    tripType: "kilimanjaro",
  });

  if (commission) {
    console.log(`✅ Commission created: $${commission.commissionAmount}`);
    console.log("\n📧 Email should be sent to:");
    console.log(`   - ${partner.contactEmail}`);
    console.log(`   - business@craftedbytimeless.com`);
    console.log("\n⏳ Check your inbox in a few moments...");
  } else {
    console.log("❌ Commission creation failed!");
  }

  // 5. Cleanup instructions
  console.log("\n📝 To clean up test data, run:");
  console.log(`   npx tsx -e "import prisma from './src/lib/prisma'; prisma.booking.delete({ where: { id: '${booking.id}' } }).then(() => console.log('Deleted')).finally(() => prisma.\\$disconnect())"`);
}

testPartnerEmail()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
