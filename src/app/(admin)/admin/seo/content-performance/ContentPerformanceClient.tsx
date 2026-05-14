"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Mountain,
  Compass,
  MapPin,
  Sun,
  FileText,
  ExternalLink,
  Pencil,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SearchX,
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { clsx } from "clsx";
import type { ContentItem, DateRange } from "./page";

type ContentTypeKey = ContentItem["type"];
type SortKey =
  | "title"
  | "wordCount"
  | "clicks"
  | "impressions"
  | "ctr"
  | "avgPosition"
  | "sessions"
  | "seoScore"
  | "status";

const PAGE_SIZE = 25;

const RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: 7, label: "7 days" },
  { value: 30, label: "30 days" },
  { value: 90, label: "90 days" },
];

const TYPE_TABS: {
  key: ContentTypeKey | "all";
  label: string;
  icon: typeof FileText;
  color: string;
}[] = [
  { key: "all", label: "All", icon: FileText, color: "text-slate-600" },
  { key: "blog", label: "Blog", icon: FileText, color: "text-purple-600" },
  { key: "safari", label: "Safaris", icon: Compass, color: "text-amber-600" },
  {
    key: "route",
    label: "Trekking",
    icon: Mountain,
    color: "text-emerald-600",
  },
  {
    key: "destination",
    label: "Destinations",
    icon: MapPin,
    color: "text-blue-600",
  },
  { key: "daytrip", label: "Day Trips", icon: Sun, color: "text-orange-600" },
];

const TYPE_BADGE: Record<ContentTypeKey, { label: string; classes: string }> = {
  blog: { label: "Blog", classes: "bg-purple-50 text-purple-700" },
  safari: { label: "Safari", classes: "bg-amber-50 text-amber-700" },
  route: { label: "Route", classes: "bg-emerald-50 text-emerald-700" },
  destination: {
    label: "Destination",
    classes: "bg-blue-50 text-blue-700",
  },
  daytrip: { label: "Day Trip", classes: "bg-orange-50 text-orange-700" },
};

const STATUS_BADGE: Record<
  ContentItem["status"],
  { label: string; classes: string }
> = {
  good: { label: "Good", classes: "bg-green-100 text-green-700" },
  "needs-attention": {
    label: "Needs Work",
    classes: "bg-amber-100 text-amber-700",
  },
  poor: { label: "Poor", classes: "bg-red-100 text-red-700" },
};

const STATUS_ORDER: Record<ContentItem["status"], number> = {
  poor: 0,
  "needs-attention": 1,
  good: 2,
};

function pctChange(current: number, previous: number): number | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 100);
}

function DeltaInline({ current, previous }: { current: number; previous: number }) {
  const delta = pctChange(current, previous);
  if (delta === null) return null;
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600 text-[10px] font-medium ml-1">
        <TrendingUp className="w-2.5 h-2.5" />+{delta}%
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-600 text-[10px] font-medium ml-1">
        <TrendingDown className="w-2.5 h-2.5" />
        {delta}%
      </span>
    );
  }
  return null;
}

function exportCsv(items: ContentItem[], range: DateRange) {
  const headers = [
    "Title",
    "Type",
    "Slug",
    "Published",
    "Words",
    "Clicks",
    "Prev Clicks",
    "Impressions",
    "Prev Impressions",
    "CTR %",
    "Avg Position",
    "Sessions",
    "Prev Sessions",
    "SEO Score",
    "Status",
    "Warnings",
  ];
  const rows = items.map((item) => [
    `"${item.title.replace(/"/g, '""')}"`,
    item.typeLabel,
    item.slug,
    item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString("en-US")
      : "",
    item.wordCount,
    item.clicks,
    item.prevClicks,
    item.impressions,
    item.prevImpressions,
    item.ctr,
    item.avgPosition,
    item.sessions,
    item.prevSessions,
    item.seoScore ?? "",
    item.status,
    `"${item.warnings.join("; ")}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `content-performance-${range}d-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ContentPerformanceClient({
  content,
  range,
}: {
  content: ContentItem[];
  range: DateRange;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<ContentTypeKey | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("clicks");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function changeRange(newRange: DateRange) {
    router.push(`${pathname}?range=${newRange}`);
  }

  const filtered = useMemo(() => {
    let items = content;
    if (activeTab !== "all") {
      items = items.filter((c) => c.type === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
      );
    }
    return items;
  }, [content, activeTab, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "wordCount":
          cmp = a.wordCount - b.wordCount;
          break;
        case "clicks":
          cmp = a.clicks - b.clicks;
          break;
        case "impressions":
          cmp = a.impressions - b.impressions;
          break;
        case "ctr":
          cmp = a.ctr - b.ctr;
          break;
        case "avgPosition":
          cmp = a.avgPosition - b.avgPosition;
          break;
        case "sessions":
          cmp = a.sessions - b.sessions;
          break;
        case "seoScore":
          cmp = (a.seoScore ?? -1) - (b.seoScore ?? -1);
          break;
        case "status":
          cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // Reset page when filters change
  const filterKey = `${activeTab}-${search}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    if (page !== 1) setPage(1);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "title" ? "asc" : "desc");
    }
  }

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: content.length };
    for (const c of content) {
      counts[c.type] = (counts[c.type] ?? 0) + 1;
    }
    return counts;
  }, [content]);

  return (
    <div className="space-y-4">
      {/* Toolbar: Type tabs + date range + search + CSV export */}
      <div className="flex flex-col gap-3">
        {/* Row 1: Type tabs */}
        <div className="flex flex-wrap gap-1.5">
          {TYPE_TABS.map((tab) => {
            const Icon = tab.icon;
            const count = tabCounts[tab.key] ?? 0;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
              >
                <Icon
                  className={clsx(
                    "w-3.5 h-3.5",
                    isActive ? "text-white" : tab.color
                  )}
                />
                {tab.label}
                <span
                  className={clsx(
                    "text-xs tabular-nums",
                    isActive ? "text-slate-300" : "text-slate-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Date range + search + export */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Date range picker */}
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2.5" />
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => changeRange(opt.value)}
                className={clsx(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  range === opt.value
                    ? "bg-amber-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content..."
              className="w-full sm:w-56 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />

            {/* CSV export */}
            <button
              type="button"
              onClick={() => exportCsv(sorted, range)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
              title="Export filtered data as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <SearchX className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">No content found</p>
            <p className="text-xs mt-1">
              {search
                ? "Try a different search term"
                : "No published content in this category yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <SortHeader
                    label="Title"
                    sortKey="title"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    align="left"
                    className="px-4 py-3 min-w-[280px]"
                  />
                  <SortHeader
                    label="Words"
                    sortKey="wordCount"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="Clicks"
                    sortKey="clicks"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="Impr."
                    sortKey="impressions"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="CTR"
                    sortKey="ctr"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="Pos."
                    sortKey="avgPosition"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="Sessions"
                    sortKey="sessions"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="SEO"
                    sortKey="seoScore"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <SortHeader
                    label="Status"
                    sortKey="status"
                    current={sortKey}
                    dir={sortDir}
                    onSort={toggleSort}
                    className="px-3 py-3"
                  />
                  <th className="px-3 py-3 text-xs font-medium text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((item) => {
                  const badge = TYPE_BADGE[item.type];
                  const status = STATUS_BADGE[item.status];
                  return (
                    <tr
                      key={`${item.type}-${item.id}`}
                      className="hover:bg-slate-50/50 group"
                    >
                      {/* Title + type badge + slug + warnings */}
                      <td className="px-4 py-3 max-w-xs">
                        <div className="min-w-0">
                          <span className="font-medium text-slate-900 truncate block">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={clsx(
                                "inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide shrink-0",
                                badge.classes
                              )}
                            >
                              {badge.label}
                            </span>
                            <span className="text-xs text-slate-400 truncate">
                              /{item.slug}/
                            </span>
                          </div>
                          {/* Inline SEO warnings */}
                          {item.warnings.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.warnings.map((w) => (
                                <span
                                  key={w}
                                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-medium"
                                >
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  {w}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Word count */}
                      <td className="text-right px-3 py-3 text-slate-600 tabular-nums">
                        {item.wordCount.toLocaleString()}
                      </td>

                      {/* Clicks + delta */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        <span className="font-medium text-slate-900">
                          {item.clicks.toLocaleString()}
                        </span>
                        <DeltaInline
                          current={item.clicks}
                          previous={item.prevClicks}
                        />
                      </td>

                      {/* Impressions + delta */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        <span className="text-slate-500">
                          {item.impressions.toLocaleString()}
                        </span>
                        <DeltaInline
                          current={item.impressions}
                          previous={item.prevImpressions}
                        />
                      </td>

                      {/* CTR */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        <span
                          className={clsx(
                            item.ctr >= 5
                              ? "text-green-600"
                              : item.ctr >= 2
                                ? "text-slate-700"
                                : "text-slate-400"
                          )}
                        >
                          {item.impressions > 0 ? `${item.ctr}%` : "-"}
                        </span>
                      </td>

                      {/* Position */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        {item.avgPosition > 0 ? (
                          <span
                            className={clsx(
                              item.avgPosition <= 10
                                ? "text-green-600 font-medium"
                                : item.avgPosition <= 20
                                  ? "text-amber-600"
                                  : "text-slate-500"
                            )}
                          >
                            #{item.avgPosition}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Sessions + delta */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        <span className="text-slate-600">
                          {item.sessions > 0
                            ? item.sessions.toLocaleString()
                            : "-"}
                        </span>
                        {item.sessions > 0 && (
                          <DeltaInline
                            current={item.sessions}
                            previous={item.prevSessions}
                          />
                        )}
                      </td>

                      {/* SEO Score */}
                      <td className="text-right px-3 py-3 tabular-nums">
                        {item.seoScore !== null ? (
                          <span
                            className={clsx(
                              "font-medium",
                              item.seoScore >= 80
                                ? "text-green-600"
                                : item.seoScore >= 60
                                  ? "text-amber-600"
                                  : "text-red-600"
                            )}
                          >
                            {item.seoScore}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="text-center px-3 py-3">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
                            status.classes
                          )}
                        >
                          {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="text-right px-3 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={item.editHref}
                            className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          {item.publicHref && (
                            <a
                              href={item.publicHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                              title="View on site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer: pagination + info */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing {sorted.length > 0 ? (safePage - 1) * PAGE_SIZE + 1 : 0}
          &ndash;{Math.min(safePage * PAGE_SIZE, sorted.length)} of{" "}
          {sorted.length} items &middot; Data from last {range} days (vs
          previous {range}d)
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-md border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                if (totalPages <= 7) return true;
                if (p === 1 || p === totalPages) return true;
                if (Math.abs(p - safePage) <= 1) return true;
                return false;
              })
              .map((p, i, arr) => {
                const showEllipsis = i > 0 && p - arr[i - 1] > 1;
                return (
                  <span key={p} className="inline-flex items-center">
                    {showEllipsis && (
                      <span className="px-1 text-slate-400">&hellip;</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(p)}
                      className={clsx(
                        "w-7 h-7 rounded-md text-xs font-medium transition-colors",
                        p === safePage
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-md border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SortHeader({
  label,
  sortKey: key,
  current,
  dir,
  onSort,
  align = "right",
  className = "",
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: "asc" | "desc";
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
  className?: string;
}) {
  const isActive = current === key;
  return (
    <th
      className={clsx(
        "text-xs font-medium text-slate-500 select-none cursor-pointer hover:text-slate-700",
        align === "left" ? "text-left" : "text-right",
        className
      )}
      onClick={() => onSort(key)}
    >
      <span className="inline-flex items-center gap-1">
        {align === "right" && <SortIcon active={isActive} dir={dir} />}
        {label}
        {align === "left" && <SortIcon active={isActive} dir={dir} />}
      </span>
    </th>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  if (!active) return <ArrowUpDown className="w-3 h-3 text-slate-300" />;
  return dir === "asc" ? (
    <ChevronUp className="w-3 h-3 text-amber-600" />
  ) : (
    <ChevronDown className="w-3 h-3 text-amber-600" />
  );
}
