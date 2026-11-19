import "dotenv/config";
import { hash } from "bcryptjs";
import prisma from "../src/lib/prisma";
import { AdminRole } from "@prisma/client";

async function main() {
  console.log("🔐 Seeding admin user and partner data...");

  // Super Admin credentials come from the environment, never from source.
  //   ADMIN_EMAIL     (default admin@snowafricaadventure.com)
  //   ADMIN_PASSWORD  (required, at least 12 characters, never printed)
  //   --reset-password  overwrite the password of an existing admin
  const email = (process.env.ADMIN_EMAIL || "admin@snowafricaadventure.com")
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const resetPassword = process.argv.includes("--reset-password");

  if (!password || password.length < 12) {
    console.error(
      "❌ ADMIN_PASSWORD is missing or shorter than 12 characters. Set it in the environment and re-run."
    );
    process.exit(1);
  }

  const passwordHash = await hash(password, 12);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
    select: { id: true },
  });

  await prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: "Admin",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
    // Existing users keep their password unless --reset-password is passed
    update: resetPassword
      ? { role: AdminRole.SUPER_ADMIN, passwordHash }
      : { role: AdminRole.SUPER_ADMIN },
  });

  if (existingAdmin) {
    console.log(`✅ Admin user ${email} already existed; role set to SUPER_ADMIN`);
    console.log(
      resetPassword
        ? "✅ Password reset from ADMIN_PASSWORD"
        : "ℹ️  Password left unchanged (pass --reset-password to overwrite)"
    );
  } else {
    console.log(`✅ Created SUPER_ADMIN user: ${email} (password from ADMIN_PASSWORD)`);
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
