import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");

  // Get all departures with year 2025
  const departures = await prisma.groupDeparture.findMany({
    where: { year: 2025 },
    select: {
      id: true,
      arrivalDate: true,
      startDate: true,
      summitDate: true,
      endDate: true,
      year: true,
      route: { select: { title: true } }
    }
  });

  console.log(`Found ${departures.length} departures with year 2025`);

  // Update each departure: add 1 year to all dates and update year field
  for (const dep of departures) {
    const newArrivalDate = new Date(dep.arrivalDate);
    newArrivalDate.setFullYear(newArrivalDate.getFullYear() + 1);

    const newStartDate = new Date(dep.startDate);
    newStartDate.setFullYear(newStartDate.getFullYear() + 1);

    const newSummitDate = dep.summitDate ? new Date(dep.summitDate) : null;
    if (newSummitDate) newSummitDate.setFullYear(newSummitDate.getFullYear() + 1);

    const newEndDate = new Date(dep.endDate);
    newEndDate.setFullYear(newEndDate.getFullYear() + 1);

    const newYear = newArrivalDate.getFullYear();

    await prisma.groupDeparture.update({
      where: { id: dep.id },
      data: {
        arrivalDate: newArrivalDate,
        startDate: newStartDate,
        summitDate: newSummitDate,
        endDate: newEndDate,
        year: newYear,
        month: newArrivalDate.getMonth() + 1
      }
    });

    console.log(`Updated: ${dep.route.title} | ${dep.arrivalDate.toISOString().split('T')[0]} → ${newArrivalDate.toISOString().split('T')[0]} | Year: ${newYear}`);
  }

  // Verify
  const updated = await prisma.groupDeparture.findMany({
    select: { arrivalDate: true, year: true, status: true, route: { select: { title: true } } },
    orderBy: { arrivalDate: "asc" }
  });

  console.log("\n=== All departures after update ===");
  updated.forEach(d => {
    console.log(`- ${d.route.title} | ${d.arrivalDate.toISOString().split('T')[0]} | Year: ${d.year} | Status: ${d.status}`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
