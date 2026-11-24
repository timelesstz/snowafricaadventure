import { getSeoOverview } from "@/lib/seo-overview";
import { getSeoAutomationOverview } from "@/lib/seo-automation/status";
import OverviewDashboard from "./OverviewDashboard";

export const dynamic = "force-dynamic";

export const metadata = { title: "SEO overview" };

export default async function SeoOverviewPage() {
  const [data, automation] = await Promise.all([getSeoOverview(), getSeoAutomationOverview()]);
  return <OverviewDashboard data={data} automation={automation} now={new Date()} />;
}
