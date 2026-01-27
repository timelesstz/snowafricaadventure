import "dotenv/config";
import prisma from "../src/lib/prisma";

async function updatePartnerEmail() {
  console.log("📧 Updating Partner Email...\n");

  const result = await prisma.partner.updateMany({
    where: { name: "Timeless International" },
    data: { contactEmail: "info@craftedbytimeless.com" },
  });

  console.log(`Updated ${result.count} partner(s)`);

  const partner = await prisma.partner.findFirst({
    where: { name: "Timeless International" },
  });

  if (partner) {
    console.log("\n✅ Partner Details:");
    console.log(`   Name: ${partner.name}`);
    console.log(`   Email: ${partner.contactEmail}`);
    console.log(`   Type: ${partner.type}`);
  }
}

updatePartnerEmail()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
