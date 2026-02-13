import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");
  const routes = await prisma.trekkingRoute.findMany({
    select: { id: true, title: true, slug: true, duration: true }
  });
  console.log("Routes:");
  routes.forEach(r => console.log(`- ${r.title} | ${r.slug} | ${r.duration} days | ID: ${r.id}`));
  await prisma.$disconnect();
}
main();
