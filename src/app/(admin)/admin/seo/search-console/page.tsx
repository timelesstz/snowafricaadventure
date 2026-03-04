"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import DateRangePicker from "@/components/admin/seo/DateRangePicker";
import {
  ExternalLink,
  ArrowUpDown,
  Search,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Eye,
  DollarSign,
  Trophy,
  FilePlus,
  ShieldAlert,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  analyzeQuery,
  generateTopInsights,
  type QueryAdvice,
  type TopInsight,
} from "@/lib/seo-dashboard/query-advisor";

interface QueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topPage?: string | null;
}

interface TimePoint {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchConsoleData {
  queries: QueryRow[];
  total: number;
  timeSeries: TimePoint[];
}

type SortField = "clicks" | "impressions" | "ctr" | "position";

// ─── Icon mapping for insights ───────────────────────────────────────────────

function InsightIcon({ icon }: { icon: string }) {
  const cls = "w-4 h-4";
  switch (icon) {
    case "alert-triangle":
      return <AlertTriangle className={`${cls} text-amber-500`} />;
    case "trending-up":
      return <TrendingUp className={`${cls} text-violet-500`} />;
    case "eye":
      return <Eye className={`${cls} text-red-500`} />;
    case "shield-alert":
      return <ShieldAlert className={`${cls} text-orange-500`} />;
    case "dollar":
      return <DollarSign className={`${cls} text-green-600`} />;
    case "file-plus":
      return <FilePlus className={`${cls} text-slate-500`} />;
    case "trophy":
      return <Trophy className={`${cls} text-emerald-500`} />;
    default:
      return <Target className={`${cls} text-indigo-500`} />;
  }
}

const INSIGHT_BORDER_COLORS: Record<string, string> = {
  amber: "border-l-amber-400",
  violet: "border-l-violet-400",
  red: "border-l-red-400",
  orange: "border-l-orange-400",
  green: "border-l-green-400",
  slate: "border-l-slate-400",
  emerald: "border-l-emerald-400",
};

// ─── CTR Score Bar ───────────────────────────────────────────────────────────

function CtrScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-blue-500"
        : score >= 40
          ? "bg-amber-500"
          : "bg-red-500";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-400 tabular-nums w-6">
        {score}
      </span>
    </div>
  );
}

// ─── Intent Badge ────────────────────────────────────────────────────────────

const INTENT_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  transactional: {
    bg: "bg-green-50",
    text: "text-green-700",
    label: "Transactional",
  },
  informational: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    label: "Informational",
  },
  navigational: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    label: "Navigational",
  },
  branded: { bg: "bg-amber-50", text: "text-amber-700", label: "Branded" },
};

function IntentBadge({ intent }: { intent: string }) {
  const style = INTENT_STYLES[intent] || INTENT_STYLES.informational;
  return (
    <span
      className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SearchConsolePage() {
  const [days, setDays] = useState(28);
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortField>("clicks");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [tab, setTab] = useState<"queries" | "pages">("queries");
  const [pageData, setPageData] = useState<{
    pages: QueryRow[];
    total: number;
  } | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showAdvisor, setShowAdvisor] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        days: days.toString(),
        sort,
        order,
        search,
        limit: "100",
      });
      const res = await fetch(`/api/admin/seo/search-queries?${params}`);
      if (res.ok) setData(await res.json());

      const pRes = await fetch(
        `/api/admin/seo/page-metrics?days=${days}&search=${search}&limit=100`
      );
      if (pRes.ok) setPageData(await pRes.json());
    } catch (error) {
      console.error("Failed to fetch search console data:", error);
    }
    setLoading(false);
  }, [days, sort, order, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const insights = useMemo(() => {
    if (!data?.queries || data.queries.length === 0) return [];
    return generateTopInsights(data.queries);
  }, [data?.queries]);

  const adviceMap = useMemo(() => {
    const map = new Map<number, QueryAdvice>();
    if (data?.queries) {
      data.queries.forEach((q, i) => {
        map.set(i, analyzeQuery(q));
      });
    }
    return map;
  }, [data?.queries]);

  // Summary stats
  const summaryStats = useMemo(() => {
    if (!data?.queries) return null;
    const totalPotential = Array.from(adviceMap.values()).reduce(
      (sum, a) => sum + a.trafficPotential,
      0
    );
    const quickWins = Array.from(adviceMap.values()).filter(
      (a) => a.tag === "quick-win"
    ).length;
    const strongCount = Array.from(adviceMap.values()).filter(
      (a) => a.tag === "strong" || a.tag === "defend"
    ).length;
    return { totalPotential, quickWins, strongCount };
  }, [data?.queries, adviceMap]);

  const handleSort = (field: SortField) => {
    if (sort === field) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setSort(field);
      setOrder("desc");
    }
  };

  const SortHeader = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  const rows = tab === "queries" ? data?.queries : pageData?.pages;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTab("queries")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                tab === "queries"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Queries
            </button>
            <button
              type="button"
              onClick={() => setTab("pages")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                tab === "pages"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Pages
            </button>
          </div>
          <DateRangePicker value={days} onChange={setDays} />
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-48"
          />
        </div>
      </div>

      {/* Quick Stats Bar */}
      {tab === "queries" && summaryStats && summaryStats.totalPotential > 0 && (
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-800">
              ~{summaryStats.totalPotential} untapped clicks
            </span>
          </div>
          {summaryStats.quickWins > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-medium text-red-700">
                {summaryStats.quickWins} quick wins
              </span>
            </div>
          )}
          {summaryStats.strongCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-700">
                {summaryStats.strongCount} strong performers
              </span>
            </div>
          )}
        </div>
      )}

      {/* AI Advisor Panel */}
      {tab === "queries" && insights.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-indigo-50 rounded-xl border border-amber-200/60 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvisor(!showAdvisor)}
            className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-amber-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-slate-900">
                  SEO Advisor
                </h3>
                <p className="text-xs text-slate-500">
                  {insights.length} prioritized insight
                  {insights.length !== 1 ? "s" : ""} &middot; Click to{" "}
                  {showAdvisor ? "collapse" : "expand"}
                </p>
              </div>
            </div>
            {showAdvisor ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showAdvisor && (
            <div className="px-5 pb-5 space-y-3">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-lg border border-slate-100 border-l-4 ${INSIGHT_BORDER_COLORS[insight.color] || "border-l-slate-400"} p-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <InsightIcon icon={insight.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-900">
                          {insight.title}
                        </h4>
                        {insight.estimatedGain > 0 && (
                          <span className="shrink-0 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            +{insight.estimatedGain} clicks
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {insight.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {insight.queries.map((q, j) => (
                          <span
                            key={j}
                            className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                          >
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Time Series Chart */}
      {data?.timeSeries && data.timeSeries.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Clicks & Impressions Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  labelFormatter={(d) =>
                    new Date(d).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={false}
                  name="Clicks"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impressions"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                  name="Impressions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            Loading...
          </div>
        ) : !rows || rows.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            No data available. Sync data from Settings first.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500">
                    {tab === "queries" ? "Query" : "Page"}
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="clicks" label="Clicks" />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="impressions" label="Impr." />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="ctr" label="CTR" />
                  </th>
                  <th className="text-right px-3 py-3">
                    <SortHeader field="position" label="Pos." />
                  </th>
                  {tab === "queries" && (
                    <>
                      <th className="text-center px-2 py-3 text-xs font-medium text-slate-500">
                        CTR Score
                      </th>
                      <th className="text-center px-3 py-3 text-xs font-medium text-slate-500">
                        <div className="flex items-center justify-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          Advice
                        </div>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, i) => {
                  const isQuery = tab === "queries";
                  const label = isQuery
                    ? row.query
                    : (() => {
                        try {
                          return new URL(
                            row.query ||
                              (row as unknown as { page: string }).page
                          ).pathname;
                        } catch {
                          return (
                            row.query ||
                            (row as unknown as { page: string }).page
                          );
                        }
                      })();
                  const pageUrl = isQuery
                    ? row.topPage
                    : (row as unknown as { page: string }).page;
                  const advice = isQuery ? adviceMap.get(i) : null;
                  const isExpanded = expandedRow === i && isQuery;

                  return (
                    <tr
                      key={i}
                      className={`transition-colors ${isQuery ? "cursor-pointer hover:bg-slate-50" : "hover:bg-slate-50"} ${isExpanded ? "bg-slate-50" : ""}`}
                      onClick={() => {
                        if (isQuery) setExpandedRow(isExpanded ? null : i);
                      }}
                    >
                      <td className="px-5 py-3 max-w-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium text-slate-900">
                              {label}
                            </span>
                            {isQuery && advice && (
                              <IntentBadge intent={advice.intent} />
                            )}
                            {pageUrl && (
                              <a
                                href={pageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-amber-600 shrink-0"
                                onClick={(e) => e.stopPropagation()}
                                title="Open page"
                                aria-label="Open page in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          {isQuery && pageUrl && (
                            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">
                              {(() => {
                                try {
                                  return new URL(pageUrl).pathname;
                                } catch {
                                  return pageUrl;
                                }
                              })()}
                            </p>
                          )}

                          {/* Expanded advice panel */}
                          {isExpanded && advice && (
                            <div
                              className={`mt-3 p-4 rounded-lg ${advice.color} border ${advice.borderColor}`}
                            >
                              {/* Header with label + traffic potential */}
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`text-xs font-bold ${advice.textColor} uppercase tracking-wide`}
                                >
                                  {advice.label}
                                </span>
                                {advice.trafficPotential > 0 && (
                                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                                    +{advice.trafficPotential} potential clicks
                                  </span>
                                )}
                              </div>

                              {/* Analysis summary */}
                              <p
                                className={`text-xs leading-relaxed ${advice.textColor} mb-3`}
                              >
                                {advice.advice}
                              </p>

                              {/* CTR benchmark comparison */}
                              <div className="flex items-center gap-4 mb-3 text-xs text-slate-600">
                                <span>
                                  Your CTR:{" "}
                                  <strong className={advice.textColor}>
                                    {row.ctr}%
                                  </strong>
                                </span>
                                <span>
                                  Benchmark:{" "}
                                  <strong>{advice.expectedCtr.toFixed(1)}%</strong>
                                </span>
                                <span>
                                  Score:{" "}
                                  <strong
                                    className={
                                      advice.ctrScore >= 70
                                        ? "text-emerald-600"
                                        : advice.ctrScore >= 40
                                          ? "text-amber-600"
                                          : "text-red-600"
                                    }
                                  >
                                    {advice.ctrScore}/100
                                  </strong>
                                </span>
                              </div>

                              {/* Numbered action steps */}
                              <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  Action Steps
                                </p>
                                {advice.actions.map((action, j) => (
                                  <div
                                    key={j}
                                    className="flex items-start gap-2 text-xs text-slate-700"
                                  >
                                    <span className="shrink-0 w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 mt-0.5">
                                      {j + 1}
                                    </span>
                                    <span className="leading-relaxed">
                                      {action}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700 font-medium tabular-nums">
                        {row.clicks.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500 tabular-nums">
                        {row.impressions.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-500 tabular-nums">
                        {row.ctr}%
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700 font-medium tabular-nums">
                        {row.position > 0 ? `#${row.position}` : "-"}
                      </td>
                      {isQuery && advice && (
                        <>
                          <td className="text-center px-2 py-3">
                            <CtrScoreBar score={advice.ctrScore} />
                          </td>
                          <td className="text-center px-3 py-3">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${advice.color} ${advice.textColor} border ${advice.borderColor}`}
                            >
                              {advice.label}
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
