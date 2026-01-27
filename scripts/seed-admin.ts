import "dotenv/config";
import { hash } from "bcryptjs";
import prisma from "../src/lib/prisma";
import { AdminRole } from "@prisma/client";

async function main() {
  console.log("🔐 Seeding admin user and partner data...");

  // Create Super Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: "admin@snowafricaadventure.com" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists");
    // Update role to SUPER_ADMIN if it exists
    await prisma.adminUser.update({
      where: { email: "admin@snowafricaadventure.com" },
      data: { role: AdminRole.SUPER_ADMIN },
    });
    console.log("✅ Updated admin user role to SUPER_ADMIN");
  } else {
    const passwordHash = await hash("SnowAfrica2025!", 12);
    await prisma.adminUser.create({
      data: {
        email: "admin@snowafricaadventure.com",
        passwordHash,
        name: "Admin",
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });
    console.log("✅ Created admin user: admin@snowafricaadventure.com");
    console.log("✅ Role: SUPER_ADMIN (full access)");
    console.log("⚠️  Default password: SnowAfrica2025! (change immediately!)");
  }

  // Create Timeless International Partner
  const existingPartner = await prisma.partner.findFirst({
    where: { name: "Timeless International" },
  });

  if (existingPartner) {
    console.log("✅ Timeless International partner already exists");
  } else {
    const partner = await prisma.partner.create({
      data: {
        name: "Timeless International",
        type: "MARKETING",
        contactName: "Development Team",
        contactEmail: "info@craftedbytimeless.com",
        payoutFrequency: "MONTHLY",
        isActive: true,
        notes:
          "Website developer and marketer. Commission applies to all website-generated bookings.",
        commissionRates: {
          create: [
            {
              tripType: "kilimanjaro",
              commissionRate: 15.0,
              isActive: true,
            },
            {
              tripType: "safari",
              commissionRate: 12.0,
              isActive: true,
            },
            {
              tripType: "daytrip",
              commissionRate: 10.0,
              isActive: true,
            },
            {
              tripType: "zanzibar",
              commissionRate: 12.0,
              isActive: true,
            },
          ],
        },
      },
    });
    console.log(`✅ Created partner: ${partner.name} (MARKETING type)`);
    console.log("   Commission rates:");
    console.log("   - Kilimanjaro: 15%");
    console.log("   - Safari: 12%");
    console.log("   - Day trips: 10%");
    console.log("   - Zanzibar: 12%");
  }

  // Update existing partner to MARKETING type if it's DEVELOPER
  const partnerToUpdate = await prisma.partner.findFirst({
    where: { name: "Timeless International", type: "DEVELOPER" },
  });
  if (partnerToUpdate) {
    await prisma.partner.update({
      where: { id: partnerToUpdate.id },
      data: { type: "MARKETING" },
    });
    console.log("✅ Updated Timeless International type from DEVELOPER to MARKETING");
  }

  console.log("\n🎉 Admin seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Admin seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
