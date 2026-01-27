import { prisma } from "@/lib/prisma";
import { BulkCreateWizard } from "@/components/admin/departures/BulkCreateWizard";

async function getRoutes() {
  return prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      duration: true,
      durationDays: true,
    },
    orderBy: { title: "asc" },
  });
}

export default async function BulkCreatePage() {
  const routes = await getRoutes();

  return <BulkCreateWizard routes={routes} />;
}
