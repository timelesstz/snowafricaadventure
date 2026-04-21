import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Mountain,
  Compass,
  MapPin,
  Sun,
  FileText,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import {
  scoreSafariSeo,
  scoreRouteSeo,
  scoreDestinationSeo,
  scoreDayTripSeo,
  scoreBlogSeo,
  aggregateSeoScores,
  type SeoScoreResult,
  type SeoBand,
} from "@/lib/seo-score";

/**
 * Global SEO content-health page.
 *
 * Loads every piece of content across the 5 scored types, computes its SEO
 * score once, and produces:
 *   1. A platform-wide aggregate (avg score, band counts, top failures).
 *   2. A backlog: content below 65 ("good") threshold, grouped by
 *      content type so editors can batch fixes.
 *   3. A cross-cutting "top gaps" view counting how many items share each
 *      failure label (e.g. "Meta description: 14 items missing") so
 *      campaigns like a meta-description sprint can be prioritized.
 */

type ContentTypeKey = "route" | "safari" | "destination" | "daytrip" | "blog";

interface HealthItem {
  id: string;
  title: string;
  type: ContentTypeKey;
  typeLabel: string;
  result: SeoScoreResult;
  editHref: string;
  publicHref?: string;
  isPublished: boolean;
}

const TYPE_META: Record<
  ContentTypeKey,
  { label: string; icon: typeof Mountain; color: string }
> = {
  route: { label: "Trekking Route", icon: Mountain, color: "text-emerald-600" },
  safari: { label: "Safari Package", icon: Compass, color: "text-amber-600" },
  destination: { label: "Destination", icon: MapPin, color: "text-blue-600" },
  daytrip: { label: "Day Trip", icon: Sun, color: "text-orange-600" },
  blog: { label: "Blog Post", icon: FileText, color: "text-purple-600" },
};

async function loadHealthData(): Promise<HealthItem[]> {
  const [routes, safaris, destinations, dayTrips, blogPosts] = await Promise.all([
    prisma.trekkingRoute.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.safariPackage.findMany({
      orderBy: { createdAt: "desc" },
      include: { destinations: true },
    }),
    prisma.destination.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { safaris: true } } },
    }),
    prisma.dayTrip.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { categories: true, tags: true } },
      },
    }),
  ]);

  const items: HealthItem[] = [];

  for (const r of routes) {
    items.push({
      id: r.id,
      title: r.title,
      type: "route",
      typeLabel: TYPE_META.route.label,
      result: scoreRouteSeo({
        title: r.title,
        metaTitle: r.metaTitle,
        metaDescription: r.metaDescription,
        overview: r.overview,
        featuredImage: r.featuredImage,
        gallery: r.gallery,
        highlights: r.highlights,
        inclusions: r.inclusions,
        exclusions: r.exclusions,
        itinerary: r.itinerary,
        faqs: r.faqs,
        guideName: r.guideName,
      }),
      editHref: `/admin/routes/${r.id}`,
      publicHref: `/trekking/${r.slug}/`,
      isPublished: r.isActive,
    });
  }

  for (const s of safaris) {
    items.push({
      id: s.id,
      title: s.title,
      type: "safari",
      typeLabel: TYPE_META.safari.label,
      result: scoreSafariSeo({
        title: s.title,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        overview: s.overview,
        featuredImage: s.featuredImage,
        gallery: s.gallery,
        highlights: s.highlights,
        inclusions: s.inclusions,
        exclusions: s.exclusions,
        itinerary: s.itinerary,
        destinationCount: s.destinations.length,
      }),
      editHref: `/admin/safaris/${s.id}`,
      publicHref: `/tanzania-safaris/${s.slug}/`,
      isPublished: s.isActive,
    });
  }

  for (const d of destinations) {
    items.push({
      id: d.id,
      title: d.name,
      type: "destination",
      typeLabel: TYPE_META.destination.label,
      result: scoreDestinationSeo({
        name: d.name,
        metaTitle: d.metaTitle,
        metaDescription: d.metaDescription,
        description: d.description,
        featuredImage: d.featuredImage,
        gallery: d.gallery,
        highlights: d.highlights,
        wildlife: d.wildlife,
        bestTime: d.bestTime,
        safariCount: d._count.safaris,
      }),
      editHref: `/admin/destinations/${d.id}`,
      publicHref: `/tanzania-destinations/${d.slug}/`,
      isPublished: d.isActive,
    });
  }

  for (const t of dayTrips) {
    items.push({
      id: t.id,
      title: t.title,
      type: "daytrip",
      typeLabel: TYPE_META.daytrip.label,
      result: scoreDayTripSeo({
        title: t.title,
        metaTitle: t.metaTitle,
        metaDescription: t.metaDescription,
        description: t.description,
        featuredImage: t.featuredImage,
        gallery: t.gallery,
        highlights: t.highlights,
        inclusions: t.inclusions,
        exclusions: t.exclusions,
        destination: t.destination,
      }),
      editHref: `/admin/day-trips/${t.id}`,
      publicHref: `/tanzania-day-tours/${t.slug}/`,
      isPublished: t.isActive,
    });
  }

  for (const p of blogPosts) {
    items.push({
      id: p.id,
      title: p.title,
      type: "blog",
      typeLabel: TYPE_META.blog.label,
      result: scoreBlogSeo({
        title: p.title,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        excerpt: p.excerpt,
        content: p.content,
        featuredImage: p.featuredImage,
        author: p.author,
        categoryCount: p._count.categories,
        tagCount: p._count.tags,
        isPublished: p.isPublished,
      }),
      editHref: `/admin/blog/${p.id}`,
      publicHref: p.isPublished ? `/${p.slug}/` : undefined,
      isPublished: p.isPublished,
    });
  }

  return items;
}

/**
 * Build a cross-cutting "top gaps" view — count how many items share each
 * failure label, with a breakdown by content type.
 */
function computeTopGaps(items: HealthItem[]) {
  type GapRow = {
    label: string;
    total: number;
    byType: Partial<Record<ContentTypeKey, number>>;
  };
  const gaps = new Map<string, GapRow>();
  for (const item of items) {
    for (const check of item.result.checks) {
      if (check.status !== "fail") continue;
      const existing = gaps.get(check.label) ?? {
        label: check.label,
        total: 0,
        byType: {},
      };
      existing.total++;
      existing.byType[item.type] = (existing.byType[item.type] ?? 0) + 1;
      gaps.set(check.label, existing);
    }
  }
  return Array.from(gaps.values()).sort((a, b) => b.total - a.total);
}

function BandDot({ band }: { band: SeoBand }) {
  const styles: Record<SeoBand, string> = {
    excellent: "bg-emerald-500",
    good: "bg-lime-500",
    "needs-work": "bg-amber-500",
    poor: "bg-red-500",
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${styles[band]}`} />;
}

export default async function SeoContentHealthPage() {
  const items = await loadHealthData();
  const aggregate = aggregateSeoScores(items.map((i) => i.result));
  const backlog = items
    .filter((i) => i.result.band === "needs-work" || i.result.band === "poor")
    .sort((a, b) => a.result.score - b.result.score);
  const backlogByType = new Map<ContentTypeKey, HealthItem[]>();
  for (const item of backlog) {
    const arr = backlogByType.get(item.type) ?? [];
    arr.push(item);
    backlogByType.set(item.type, arr);
  }
  const topGaps = computeTopGaps(items);

  return (
    <div className="space-y-6">
      <p className="text-slate-600 -mt-2">
        Every piece of scored content across the site, ranked by what most
        needs attention.
      </p>

      {/* Platform-wide summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryTile
          label="Average score"
          value={`${aggregate.average}`}
          detail={`across ${aggregate.count} items`}
          color={
            aggregate.average >= 85
              ? "emerald"
              : aggregate.average >= 65
                ? "lime"
                : aggregate.average >= 40
                  ? "amber"
                  : "red"
          }
          icon={TrendingUp}
        />
        <SummaryTile
          label="Excellent"
          value={`${aggregate.bands.excellent}`}
          detail="85-100"
          color="emerald"
          icon={CheckCircle2}
        />
        <SummaryTile
          label="Good"
          value={`${aggregate.bands.good}`}
          detail="65-84"
          color="lime"
          icon={TrendingUp}
        />
        <SummaryTile
          label="Needs work"
          value={`${aggregate.bands["needs-work"]}`}
          detail="40-64"
          color="amber"
          icon={AlertTriangle}
        />
        <SummaryTile
          label="Poor"
          value={`${aggregate.bands.poor}`}
          detail="under 40"
          color="red"
          icon={AlertCircle}
        />
      </div>

      {/* Top cross-cutting gaps */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Most common gaps
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {topGaps.length === 0 ? (
            <p className="p-6 text-sm text-slate-500 text-center">
              No failing checks — content is healthy across the platform.
            </p>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fix
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Breakdown
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topGaps.slice(0, 10).map((gap) => (
                  <tr key={gap.label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {gap.label}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        {gap.total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      <div className="flex flex-wrap gap-2">
                        {(Object.entries(gap.byType) as [ContentTypeKey, number][])
                          .sort((a, b) => b[1] - a[1])
                          .map(([type, count]) => {
                            const meta = TYPE_META[type];
                            const Icon = meta.icon;
                            return (
                              <span
                                key={type}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100"
                              >
                                <Icon
                                  className={`w-3 h-3 ${meta.color}`}
                                  aria-hidden="true"
                                />
                                {count} {meta.label.toLowerCase()}
                                {count === 1 ? "" : "s"}
                              </span>
                            );
                          })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Backlog grouped by type */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Backlog — {backlog.length} item{backlog.length === 1 ? "" : "s"} below
          &quot;good&quot;
        </h2>
        {backlog.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-3" />
            <p className="text-slate-700 font-medium">
              Nothing to triage — every item scores 65+.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(Object.keys(TYPE_META) as ContentTypeKey[]).map((typeKey) => {
              const rows = backlogByType.get(typeKey) ?? [];
              if (rows.length === 0) return null;
              const meta = TYPE_META[typeKey];
              const Icon = meta.icon;
              return (
                <div
                  key={typeKey}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${meta.color}`} aria-hidden="true" />
                    <h3 className="font-semibold text-slate-900">
                      {meta.label}s
                    </h3>
                    <span className="text-sm text-slate-500">
                      · {rows.length} item{rows.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {rows.map((item) => (
                      <li key={item.id} className="px-4 py-3 hover:bg-slate-50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <BandDot band={item.result.band} />
                              <Link
                                href={item.editHref}
                                className="font-medium text-slate-900 hover:text-amber-600 truncate"
                              >
                                {item.title}
                              </Link>
                              {!item.isPublished && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700">
                                  {typeKey === "blog" ? "Draft" : "Inactive"}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 text-xs">
                              {item.result.checks
                                .filter((c) => c.status === "fail")
                                .slice(0, 4)
                                .map((c, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-700"
                                  >
                                    <AlertCircle
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                    />
                                    {c.label}
                                  </span>
                                ))}
                              {item.result.checks.filter((c) => c.status === "fail")
                                .length > 4 && (
                                <span className="text-slate-500">
                                  + more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`text-lg font-bold tabular-nums ${
                                item.result.band === "poor"
                                  ? "text-red-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {item.result.score}
                            </span>
                            {item.publicHref && item.isPublished && (
                              <a
                                href={item.publicHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View on public site"
                                aria-label={`View ${item.title} on public site`}
                                className="p-1.5 text-slate-400 hover:text-slate-600"
                              >
                                <ExternalLink
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  detail,
  color,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  color: "emerald" | "lime" | "amber" | "red";
  icon: typeof Mountain;
}) {
  const bg = {
    emerald: "bg-emerald-50 text-emerald-700",
    lime: "bg-lime-50 text-lime-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  }[color];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{detail}</p>
        </div>
      </div>
    </div>
  );
}
