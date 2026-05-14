import { prisma } from "@/lib/prisma";
import {
  FileText,
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Eye,
  Search,
  Users,
  Minus,
} from "lucide-react";
import ContentPerformanceClient from "./ContentPerformanceClient";

export const dynamic = "force-dynamic";

type ContentTypeKey = "blog" | "safari" | "route" | "destination" | "daytrip";

export type DateRange = 7 | 30 | 90;

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: ContentTypeKey;
  typeLabel: string;
  publishedAt: string | null;
  isPublished: boolean;
  wordCount: number;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  sessions: number;
  seoScore: number | null;
  status: "good" | "needs-attention" | "poor";
  hasMetaTitle: boolean;
  hasMetaDesc: boolean;
  editHref: string;
  publicHref: string | null;
  warnings: string[];
  prevClicks: number;
  prevImpressions: number;
  prevSessions: number;
}

const TYPE_META: Record<ContentTypeKey, { label: string }> = {
  blog: { label: "Blog Post" },
  safari: { label: "Safari" },
  route: { label: "Trekking Route" },
  destination: { label: "Destination" },
  daytrip: { label: "Day Trip" },
};

function computeWordCount(html: string): number {
  return html
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function computeStatus(
  wordCount: number,
  hasMetaTitle: boolean,
  hasMetaDesc: boolean,
  impressions: number,
  clicks: number,
  avgPosition: number
): "good" | "needs-attention" | "poor" {
  if (wordCount < 300 || (!hasMetaDesc && !hasMetaTitle)) return "poor";
  if (impressions > 100 && clicks < 3) return "needs-attention";
  if (avgPosition > 20 && impressions < 50) return "needs-attention";
  return "good";
}

function computeWarnings(
  hasMetaTitle: boolean,
  hasMetaDesc: boolean,
  wordCount: number,
  seoScore: number | null
): string[] {
  const w: string[] = [];
  if (!hasMetaTitle) w.push("No meta title");
  if (!hasMetaDesc) w.push("No meta description");
  if (wordCount < 300) w.push("Thin content (<300 words)");
  if (seoScore !== null && seoScore < 40) w.push("SEO score critical");
  return w;
}

function buildMatchFn<T>(
  map: Map<string, T>,
  fallback: T
): (slug: string) => T {
  return (slug: string) => {
    for (const [page, data] of map) {
      if (page.includes(`/${slug}/`) || page.endsWith(`/${slug}`)) {
        return data;
      }
    }
    return fallback;
  };
}

async function fetchGscMap(dateFrom: Date) {
  const gscMetrics = await prisma.gscPageMetric.groupBy({
    by: ["page"],
    where: { date: { gte: dateFrom } },
    _sum: { clicks: true, impressions: true },
    _avg: { position: true },
  });
  return new Map(
    gscMetrics.map((m) => [
      m.page,
      {
        clicks: m._sum.clicks || 0,
        impressions: m._sum.impressions || 0,
        avgPosition: Math.round((m._avg.position || 0) * 10) / 10,
      },
    ])
  );
}

async function fetchGscMapRange(dateFrom: Date, dateTo: Date) {
  const gscMetrics = await prisma.gscPageMetric.groupBy({
    by: ["page"],
    where: { date: { gte: dateFrom, lt: dateTo } },
    _sum: { clicks: true, impressions: true },
  });
  return new Map(
    gscMetrics.map((m) => [
      m.page,
      {
        clicks: m._sum.clicks || 0,
        impressions: m._sum.impressions || 0,
      },
    ])
  );
}

async function fetchGaMap(dateFrom: Date) {
  const gaMetrics = await prisma.gaOrganicMetric.groupBy({
    by: ["landingPage"],
    where: { date: { gte: dateFrom } },
    _sum: { sessions: true },
  });
  return new Map(
    gaMetrics
      .filter((m) => m.landingPage)
      .map((m) => [m.landingPage!, m._sum.sessions || 0])
  );
}

async function fetchGaMapRange(dateFrom: Date, dateTo: Date) {
  const gaMetrics = await prisma.gaOrganicMetric.groupBy({
    by: ["landingPage"],
    where: { date: { gte: dateFrom, lt: dateTo } },
    _sum: { sessions: true },
  });
  return new Map(
    gaMetrics
      .filter((m) => m.landingPage)
      .map((m) => [m.landingPage!, m._sum.sessions || 0])
  );
}

async function getContentPerformance(range: DateRange): Promise<ContentItem[]> {
  const now = Date.now();
  const ms = range * 24 * 60 * 60 * 1000;
  const currentFrom = new Date(now - ms);
  const prevFrom = new Date(now - ms * 2);
  const prevTo = currentFrom;

  const [blogPosts, safaris, routes, destinations, dayTrips] =
    await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedAt: true,
          content: true,
          metaTitle: true,
          metaDescription: true,
          isPublished: true,
        },
        orderBy: { publishedAt: "desc" },
      }),
      prisma.safariPackage.findMany({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          overview: true,
          metaTitle: true,
          metaDescription: true,
          isActive: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.trekkingRoute.findMany({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          overview: true,
          metaTitle: true,
          metaDescription: true,
          isActive: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.destination.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          isActive: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.dayTrip.findMany({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          isActive: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const [gscCurrent, gscPrev, gaCurrent, gaPrev, audits] = await Promise.all([
    fetchGscMap(currentFrom),
    fetchGscMapRange(prevFrom, prevTo),
    fetchGaMap(currentFrom),
    fetchGaMapRange(prevFrom, prevTo),
    prisma.seoPageAudit.findMany({
      orderBy: { createdAt: "desc" },
      distinct: ["url"],
      select: { url: true, score: true },
    }),
  ]);

  const auditByUrl = new Map(audits.map((a) => [a.url, a.score]));
  const matchGsc = buildMatchFn(gscCurrent, {
    clicks: 0,
    impressions: 0,
    avgPosition: 0,
  });
  const matchGscPrev = buildMatchFn(gscPrev, { clicks: 0, impressions: 0 });
  const matchGa = buildMatchFn(gaCurrent, 0);
  const matchGaPrev = buildMatchFn(gaPrev, 0);
  const matchAudit = buildMatchFn(auditByUrl, null as number | null);

  function buildItem(
    id: string,
    title: string,
    slug: string,
    type: ContentTypeKey,
    publishedAt: string | null,
    isPublished: boolean,
    html: string,
    metaTitle: string | null,
    metaDescription: string | null,
    editHref: string,
    publicHref: string | null
  ): ContentItem {
    const wordCount = computeWordCount(html);
    const gsc = matchGsc(slug);
    const prev = matchGscPrev(slug);
    const sessions = matchGa(slug);
    const prevSessions = matchGaPrev(slug);
    const seoScore = matchAudit(slug);
    const hasMT = !!metaTitle;
    const hasMD = !!metaDescription;
    const ctr =
      gsc.impressions > 0
        ? Math.round((gsc.clicks / gsc.impressions) * 1000) / 10
        : 0;

    return {
      id,
      title,
      slug,
      type,
      typeLabel: TYPE_META[type].label,
      publishedAt,
      isPublished,
      wordCount,
      clicks: gsc.clicks,
      impressions: gsc.impressions,
      ctr,
      avgPosition: gsc.avgPosition,
      sessions,
      seoScore,
      status: computeStatus(
        wordCount,
        hasMT,
        hasMD,
        gsc.impressions,
        gsc.clicks,
        gsc.avgPosition
      ),
      hasMetaTitle: hasMT,
      hasMetaDesc: hasMD,
      editHref,
      publicHref,
      warnings: computeWarnings(hasMT, hasMD, wordCount, seoScore),
      prevClicks: prev.clicks,
      prevImpressions: prev.impressions,
      prevSessions,
    };
  }

  const items: ContentItem[] = [];

  for (const p of blogPosts) {
    items.push(
      buildItem(
        p.id,
        p.title,
        p.slug,
        "blog",
        p.publishedAt?.toISOString() ?? null,
        p.isPublished,
        p.content,
        p.metaTitle,
        p.metaDescription,
        `/admin/blog/${p.id}`,
        `/${p.slug}/`
      )
    );
  }
  for (const s of safaris) {
    items.push(
      buildItem(
        s.id,
        s.title,
        s.slug,
        "safari",
        s.createdAt.toISOString(),
        s.isActive,
        s.overview,
        s.metaTitle,
        s.metaDescription,
        `/admin/safaris/${s.id}`,
        `/tanzania-safaris/${s.slug}/`
      )
    );
  }
  for (const r of routes) {
    items.push(
      buildItem(
        r.id,
        r.title,
        r.slug,
        "route",
        r.createdAt.toISOString(),
        r.isActive,
        r.overview,
        r.metaTitle,
        r.metaDescription,
        `/admin/routes/${r.id}`,
        `/trekking/${r.slug}/`
      )
    );
  }
  for (const d of destinations) {
    items.push(
      buildItem(
        d.id,
        d.name,
        d.slug,
        "destination",
        d.createdAt.toISOString(),
        d.isActive,
        d.description,
        d.metaTitle,
        d.metaDescription,
        `/admin/destinations/${d.id}`,
        `/tanzania-destinations/${d.slug}/`
      )
    );
  }
  for (const t of dayTrips) {
    items.push(
      buildItem(
        t.id,
        t.title,
        t.slug,
        "daytrip",
        t.createdAt.toISOString(),
        t.isActive,
        t.description,
        t.metaTitle,
        t.metaDescription,
        `/admin/day-trips/${t.id}`,
        `/tanzania-day-tours/${t.slug}/`
      )
    );
  }

  return items.sort((a, b) => b.clicks - a.clicks);
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function ContentPerformancePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const rangeParam = parseInt(params.range || "30", 10);
  const range: DateRange = [7, 30, 90].includes(rangeParam)
    ? (rangeParam as DateRange)
    : 30;

  const content = await getContentPerformance(range);

  const totalClicks = content.reduce((s, c) => s + c.clicks, 0);
  const totalImpressions = content.reduce((s, c) => s + c.impressions, 0);
  const totalSessions = content.reduce((s, c) => s + c.sessions, 0);
  const prevTotalClicks = content.reduce((s, c) => s + c.prevClicks, 0);
  const prevTotalImpressions = content.reduce(
    (s, c) => s + c.prevImpressions,
    0
  );
  const prevTotalSessions = content.reduce((s, c) => s + c.prevSessions, 0);

  const avgCtr =
    totalImpressions > 0
      ? Math.round((totalClicks / totalImpressions) * 1000) / 10
      : 0;
  const prevAvgCtr =
    prevTotalImpressions > 0
      ? Math.round((prevTotalClicks / prevTotalImpressions) * 1000) / 10
      : 0;

  const goodCount = content.filter((c) => c.status === "good").length;
  const attentionCount = content.filter(
    (c) => c.status === "needs-attention"
  ).length;
  const poorCount = content.filter((c) => c.status === "poor").length;

  const clicksDelta = pctChange(totalClicks, prevTotalClicks);
  const impressionsDelta = pctChange(totalImpressions, prevTotalImpressions);
  const sessionsDelta = pctChange(totalSessions, prevTotalSessions);
  const ctrDelta = pctChange(avgCtr * 10, prevAvgCtr * 10);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <SummaryCard
          icon={<FileText className="w-4 h-4" />}
          label="Total Content"
          value={content.length}
          color="slate"
        />
        <SummaryCard
          icon={<MousePointerClick className="w-4 h-4" />}
          label={`Clicks (${range}d)`}
          value={totalClicks.toLocaleString()}
          delta={clicksDelta}
          color="blue"
        />
        <SummaryCard
          icon={<Eye className="w-4 h-4" />}
          label="Impressions"
          value={totalImpressions.toLocaleString()}
          delta={impressionsDelta}
          color="indigo"
        />
        <SummaryCard
          icon={<Search className="w-4 h-4" />}
          label="Avg CTR"
          value={`${avgCtr}%`}
          delta={ctrDelta}
          color="violet"
        />
        <SummaryCard
          icon={<Users className="w-4 h-4" />}
          label="Organic Sessions"
          value={totalSessions.toLocaleString()}
          delta={sessionsDelta}
          color="cyan"
        />
        <SummaryCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Health"
          value={
            <span className="flex items-center gap-1.5 text-sm">
              <span className="text-green-600">{goodCount}</span>
              <span className="text-slate-300">/</span>
              <span className="text-amber-600">{attentionCount}</span>
              <span className="text-slate-300">/</span>
              <span className="text-red-600">{poorCount}</span>
            </span>
          }
          color="emerald"
        />
      </div>

      <ContentPerformanceClient content={content} range={range} />
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta === null)
    return <Minus className="w-3 h-3 text-slate-300 inline" />;
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600 text-xs font-medium">
        <TrendingUp className="w-3 h-3" />+{delta}%
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-600 text-xs font-medium">
        <TrendingDown className="w-3 h-3" />
        {delta}%
      </span>
    );
  }
  return <Minus className="w-3 h-3 text-slate-300 inline" />;
}

function SummaryCard({
  icon,
  label,
  value,
  delta,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delta?: number | null;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    slate: "bg-slate-50 text-slate-600",
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    violet: "bg-violet-50 text-violet-600",
    cyan: "bg-cyan-50 text-cyan-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`w-7 h-7 rounded-md flex items-center justify-center ${bgMap[color] ?? bgMap.slate}`}
        >
          {icon}
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2 pl-9">
        <span className="text-lg font-bold text-slate-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {delta !== undefined && <DeltaBadge delta={delta} />}
      </div>
    </div>
  );
}
