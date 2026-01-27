import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  const categories = await prisma.category.findMany();
  console.log("Categories:", categories.length ? categories.map(c => c.slug).join(", ") : "None");

  const routes = await prisma.trekkingRoute.count();
  console.log("Trekking Routes:", routes);

  const departures = await prisma.groupDeparture.count();
  console.log("Departures:", departures);

  if (departures > 0) {
    const sample = await prisma.groupDeparture.findFirst({
      include: { route: { select: { title: true } } }
    });
    console.log("Sample Departure:", sample?.route.title, sample?.arrivalDate);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
