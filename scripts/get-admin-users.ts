import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");
  const users = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, isActive: true }
  });
  console.log("Admin Users:");
  users.forEach(u => console.log(`- ${u.email} | ${u.name} | Role: ${u.role} | Active: ${u.isActive}`));
  await prisma.$disconnect();
}
main();
