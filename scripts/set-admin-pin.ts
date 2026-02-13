import { config } from "dotenv";
config({ path: ".env.local" });

import { hash } from "bcryptjs";

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");

  // Set PIN to 2626 for admin user
  const pin = "2626";
  const pinHash = await hash(pin, 10);

  const user = await prisma.adminUser.update({
    where: { email: "admin@snowafricaadventure.com" },
    data: { pin: pinHash },
    select: { id: true, email: true, name: true, role: true }
  });

  console.log("PIN set successfully!");
  console.log(`User: ${user.email}`);
  console.log(`PIN: ${pin}`);
  console.log("\nYou can now login using Quick PIN on the login page.");

  await prisma.$disconnect();
}

main().catch(console.error);
