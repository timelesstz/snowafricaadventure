import { prisma } from "@/lib/prisma";
import { DepartureForm } from "@/components/admin/departures/DepartureForm";

async function getRoutes() {
  return prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      slug: true,
      duration: true,
      durationDays: true,
    },
    orderBy: { title: "asc" },
  });
}

export default async function NewDeparturePage() {
  const routes = await getRoutes();

  return <DepartureForm routes={routes} mode="create" />;
}
