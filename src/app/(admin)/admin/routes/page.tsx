import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Plus,
  Search,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

async function getRoutes(params: {
  status?: string;
  search?: string;
  page?: number;
}) {
  const { status, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(status === "active" && { isActive: true }),
    ...(status === "inactive" && { isActive: false }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { overview: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [routes, total] = await Promise.all([
    prisma.trekkingRoute.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { departures: true },
        },
      },
    }),
    prisma.trekkingRoute.count({ where }),
  ]);

  return { routes, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getRouteStats() {
  const [total, active, inactive, totalDepartures] = await Promise.all([
    prisma.trekkingRoute.count(),
    prisma.trekkingRoute.count({ where: { isActive: true } }),
    prisma.trekkingRoute.count({ where: { isActive: false } }),
    prisma.groupDeparture.count(),
  ]);

  return { total, active, inactive, totalDepartures };
}

export default async function RoutesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ routes, total, totalPages }, stats] = await Promise.all([
    getRoutes({ status, search, page }),
    getRouteStats(),
  ]);

  const statuses = [
    { value: "all", label: "All Routes" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kilimanjaro Routes</h1>
          <p className="text-slate-600 mt-1">
            Manage trekking routes and itineraries
          </p>
        </div>
        <Link
          href="/admin/routes/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Route
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Mountain className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Routes</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Active</p>
              <p className="text-xl font-bold text-slate-900">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Inactive</p>
              <p className="text-xl font-bold text-slate-900">{stats.inactive}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Departures</p>
              <p className="text-xl font-bold text-slate-900">{stats.totalDepartures}</p>
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
                placeholder="Search routes..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
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
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Routes List */}
      {routes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Mountain className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No routes found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || status ? "Try adjusting your filters" : "Add your first trekking route"}
          </p>
          <Link
            href="/admin/routes/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add Route
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex gap-4">
                  {route.featuredImage && (
                    <div className="w-40 h-28 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={route.featuredImage}
                        alt={route.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {route.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                          {route.overview}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {route.duration}
                          </span>
                          {route.successRate && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <TrendingUp className="w-4 h-4" />
                              {route.successRate}% success
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-slate-600">
                            <Users className="w-4 h-4" />
                            {route._count.departures} departures
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            route.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {route.isActive ? "Active" : "Inactive"}
                          </span>
                          {route.physicalRating && (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                              {route.physicalRating}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {route.isActive && (
                          <a
                            href={`/trekking/${route.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-slate-600"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/routes/${route.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} routes
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/routes?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
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
                    href={`/admin/routes?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
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
