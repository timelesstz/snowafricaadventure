import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  AlertTriangle,
  Bot,
  User,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Eye,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { NotFoundStatus } from "@prisma/client";
import { NotFoundStatusBadge } from "@/components/admin/404-monitor/NotFoundStatusBadge";

async function get404Urls(params: {
  status?: string;
  search?: string;
  page?: number;
}) {
  const { status, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(status && status !== "all" && { status: status as NotFoundStatus }),
    ...(search && {
      url: { contains: search, mode: "insensitive" as const },
    }),
  };

  const [notFoundUrls, total] = await Promise.all([
    prisma.notFoundUrl.findMany({
      where,
      orderBy: { lastHitAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        redirect: {
          select: {
            id: true,
            destinationUrl: true,
            type: true,
            isActive: true,
          },
        },
      },
    }),
    prisma.notFoundUrl.count({ where }),
  ]);

  return {
    notFoundUrls,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function get404Stats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const [
    totalActive,
    totalIgnored,
    totalRedirected,
    hitsToday,
    hitsThisWeek,
    totalBotHits,
    totalHumanHits,
  ] = await Promise.all([
    prisma.notFoundUrl.count({ where: { status: "ACTIVE" } }),
    prisma.notFoundUrl.count({ where: { status: "IGNORED" } }),
    prisma.notFoundUrl.count({ where: { status: "REDIRECTED" } }),
    prisma.notFoundHit.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.notFoundHit.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.notFoundHit.count({ where: { isBot: true } }),
    prisma.notFoundHit.count({ where: { isBot: false } }),
  ]);

  const botPercentage =
    totalBotHits + totalHumanHits > 0
      ? Math.round((totalBotHits / (totalBotHits + totalHumanHits)) * 100)
      : 0;

  return {
    totalActive,
    totalIgnored,
    totalRedirected,
    hitsToday,
    hitsThisWeek,
    botPercentage,
  };
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function NotFoundMonitorPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ notFoundUrls, total, totalPages }, stats] = await Promise.all([
    get404Urls({ status, search, page }),
    get404Stats(),
  ]);

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "ACTIVE", label: "Active" },
    { value: "IGNORED", label: "Ignored" },
    { value: "REDIRECTED", label: "Redirected" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">404 Monitor</h1>
          <p className="text-slate-600 mt-1">
            Track broken URLs and create redirects
          </p>
        </div>
        <Link
          href="/admin/redirects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          Create Redirect
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active 404s</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.totalActive}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Hits Today</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.hitsToday}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Hits This Week</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.hitsThisWeek}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Bot Traffic</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.botPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by URL..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="status"
              defaultValue={status || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* 404 URLs Table */}
      {notFoundUrls.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No 404 URLs found
          </h3>
          <p className="text-slate-500">
            {search || status
              ? "Try adjusting your filters"
              : "404 hits will appear here once visitors encounter broken links"}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    URL
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Hits
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Bot/Human
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Last Hit
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {notFoundUrls.map((notFound) => (
                  <tr key={notFound.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded max-w-md truncate">
                          {notFound.url}
                        </code>
                        {notFound.redirect && (
                          <span
                            className="text-xs text-emerald-600"
                            title={`Redirects to: ${notFound.redirect.destinationUrl}`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      {notFound.lastReferer && (
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span className="truncate max-w-xs">
                            {notFound.lastReferer}
                          </span>
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-semibold text-slate-900">
                        {notFound.hitCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="flex items-center gap-1 text-purple-600">
                          <Bot className="w-3 h-3" />
                          {notFound.botHitCount}
                        </span>
                        <span className="flex items-center gap-1 text-sky-600">
                          <User className="w-3 h-3" />
                          {notFound.humanHitCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDateTime(notFound.lastHitAt)}
                    </td>
                    <td className="px-6 py-4">
                      <NotFoundStatusBadge status={notFound.status} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/404-monitor/${notFound.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                        {notFound.status === "ACTIVE" && !notFound.redirect && (
                          <Link
                            href={`/admin/redirects/new?source=${encodeURIComponent(notFound.url)}&notFoundId=${notFound.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg"
                          >
                            <ArrowRight className="w-4 h-4" />
                            Redirect
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of{" "}
                {total} URLs
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/404-monitor?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-3 py-1 text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/admin/404-monitor?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
