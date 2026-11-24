import type { SeoOverviewData } from "@/lib/seo-overview";
import type { SeoAutomationOverview } from "@/lib/seo-automation/status";
import HealthHero from "@/components/admin/seo/overview/HealthHero";
import ActionQueue from "@/components/admin/seo/overview/ActionQueue";
import AutomationPanel from "@/components/admin/seo/overview/AutomationPanel";
import {
  AnalyticsKpis,
  ContentHealthCard,
  QuickWinsTable,
  SearchKpis,
  TopLists,
} from "@/components/admin/seo/overview/Sections";
import { formatRange, relativeTime } from "@/components/admin/seo/overview/format";

interface Props {
  data: SeoOverviewData;
  automation: SeoAutomationOverview;
  now: Date;
}

/**
 * /admin/seo overview. Server-rendered; only the action list, automation
 * panel and charts hydrate.
 *
 * Reading order: how healthy are we → what to fix next → is the machinery
 * running → the numbers behind it.
 */
export default function OverviewDashboard({ data, automation, now }: Props) {
  const gscRange = formatRange(data.period.gsc);
  const gaRange = formatRange(data.period.ga);

  return (
    <div className="space-y-6">
      <HealthHero health={data.health} issueTotal={data.issues.total} periodLabel={gscRange} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] gap-6 items-start">
        <ActionQueue actions={data.actions} />
        <AutomationPanel
          schedule={automation.schedule}
          automations={automation.automations.map((a) => ({
            ...a,
            lastRunLabel: relativeTime(a.lastRunAt, now),
          }))}
          recentAlerts={automation.recentAlerts.map((al) => ({
            ...al,
            createdLabel: relativeTime(al.createdAt, now) ?? "",
          }))}
        />
      </div>

      <SearchKpis data={data} periodLabel={gscRange} />
      <AnalyticsKpis data={data} periodLabel={gaRange} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <ContentHealthCard data={data} />
        <QuickWinsTable data={data} />
      </div>

      <TopLists data={data} />
    </div>
  );
}
