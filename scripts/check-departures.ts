import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { default: prisma } = await import("../src/lib/prisma");

  const departures = await prisma.groupDeparture.findMany({
    select: {
      id: true,
      arrivalDate: true,
      year: true,
      status: true,
      maxParticipants: true,
      route: { select: { title: true } }
    },
    orderBy: { arrivalDate: "asc" }
  });

  console.log("Total departures:", departures.length);
  console.log("\nAll departures:");
  departures.forEach(d => {
    console.log(`- ${d.route.title} | ${d.arrivalDate.toISOString().split('T')[0]} | Year: ${d.year} | Status: ${d.status}`);
  });

  // Count by year
  const by2026 = departures.filter(d => d.year === 2026);
  const by2027 = departures.filter(d => d.year === 2027);
  console.log(`\n2026 departures: ${by2026.length}`);
  console.log(`2027 departures: ${by2027.length}`);

  // Count by status
  const openOnes = departures.filter(d => ["OPEN", "LIMITED", "GUARANTEED"].includes(d.status));
  console.log(`\nOpen/Limited/Guaranteed: ${openOnes.length}`);

  await prisma.$disconnect();
}

main().catch(console.error);
