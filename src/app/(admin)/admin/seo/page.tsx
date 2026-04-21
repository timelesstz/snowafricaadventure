import { getSeoOverview } from "@/lib/seo-overview";
import OverviewDashboard from "./OverviewDashboard";

export const dynamic = "force-dynamic";

export default async function SeoOverviewPage() {
  const data = await getSeoOverview();
  return <OverviewDashboard data={data} />;
}
