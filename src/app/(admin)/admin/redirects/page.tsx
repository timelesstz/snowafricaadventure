import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  TrendingUp,
  Clock,
} from "lucide-react";
import { RedirectType } from "@prisma/client";
import { RedirectTypeBadge } from "@/components/admin/redirects/RedirectTypeBadge";
import { RedirectDeleteButton } from "@/components/admin/redirects/RedirectDeleteButton";

async function getRedirects(params: {
  search?: string;
  isActive?: string;
  type?: string;
  page?: number;
}) {
  const { search, isActive, type, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(search && {
      OR: [
        { sourceUrl: { contains: search, mode: "insensitive" as const } },
        { destinationUrl: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(isActive && isActive !== "all" && { isActive: isActive === "true" }),
    ...(type && type !== "all" && { type: type as RedirectType }),
  };

  const [redirects, total] = await Promise.all([
    prisma.redirect.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        notFoundUrl: {
          select: {
            id: true,
            hitCount: true,
          },
        },
      },
    }),
    prisma.redirect.count({ where }),
  ]);

  return {
    redirects,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function getRedirectStats() {
  const [totalRedirects, activeRedirects, permanentRedirects, totalHits] =
    await Promise.all([
      prisma.redirect.count(),
      prisma.redirect.count({ where: { isActive: true } }),
      prisma.redirect.count({ where: { type: "PERMANENT" } }),
      prisma.redirect.aggregate({ _sum: { hitCount: true } }),
    ]);

  return {
    totalRedirects,
    activeRedirects,
    permanentRedirects,
    totalHits: totalHits._sum.hitCount || 0,
  };
}

function formatDateTime(date: Date | null) {
  if (!date) return "Never";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function RedirectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    isActive?: string;
    type?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search;
  const isActive = params.isActive;
  const type = params.type;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ redirects, total, totalPages }, stats] = await Promise.all([
    getRedirects({ search, isActive, type, page }),
    getRedirectStats(),
  ]);

  const statusFilters = [
    { value: "all", label: "All Status" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  const typeFilters = [
    { value: "all", label: "All Types" },
    { value: "PERMANENT", label: "301 Permanent" },
    { value: "TEMPORARY", label: "302 Temporary" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Redirects</h1>
          <p className="text-slate-600 mt-1">
            Manage URL redirects for broken or changed links
          </p>
        </div>
        <Link
          href="/admin/redirects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Redirect
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Redirects</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.totalRedirects}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.activeRedirects}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Permanent (301)</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.permanentRedirects}
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
              <p className="text-sm text-slate-600">Total Hits</p>
              <p className="text-xl font-bold text-slate-900">
                {stats.totalHits.toLocaleString()}
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
                placeholder="Search by source or destination URL..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="isActive"
              defaultValue={isActive || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              {statusFilters.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="type"
              defaultValue={type || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              {typeFilters.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
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

      {/* Redirects Table */}
      {redirects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <ArrowRightLeft className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No redirects found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || isActive || type
              ? "Try adjusting your filters"
              : "Create your first redirect to fix broken links"}
          </p>
          <Link
            href="/admin/redirects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Redirect
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Source
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Destination
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Hits
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
                {redirects.map((redirect) => (
                  <tr key={redirect.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <code className="text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded max-w-xs truncate inline-block">
                        {redirect.sourceUrl}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <code className="text-sm text-emerald-700 bg-emerald-50 px-2 py-1 rounded max-w-xs truncate inline-block">
                          {redirect.destinationUrl}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <RedirectTypeBadge type={redirect.type} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-900">
                        {redirect.hitCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDateTime(redirect.lastHitAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          redirect.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {redirect.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/redirects/new?edit=${redirect.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-amber-600"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <RedirectDeleteButton
                          id={redirect.id}
                          sourceUrl={redirect.sourceUrl}
                        />
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
                {total} redirects
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/redirects?page=${page - 1}${search ? `&search=${search}` : ""}${isActive ? `&isActive=${isActive}` : ""}${type ? `&type=${type}` : ""}`}
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
                    href={`/admin/redirects?page=${page + 1}${search ? `&search=${search}` : ""}${isActive ? `&isActive=${isActive}` : ""}${type ? `&type=${type}` : ""}`}
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

