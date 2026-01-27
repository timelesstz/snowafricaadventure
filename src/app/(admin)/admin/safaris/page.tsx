import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Plus,
  Search,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  Filter,
} from "lucide-react";

async function getSafaris(params: {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
}) {
  const { status, type, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(status === "active" && { isActive: true }),
    ...(status === "inactive" && { isActive: false }),
    ...(type && type !== "all" && { type }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { overview: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [safaris, total] = await Promise.all([
    prisma.safariPackage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        destinations: {
          include: {
            destination: {
              select: { name: true },
            },
          },
        },
      },
    }),
    prisma.safariPackage.count({ where }),
  ]);

  return { safaris, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getSafariStats() {
  const [total, active, budget, midRange, luxury] = await Promise.all([
    prisma.safariPackage.count(),
    prisma.safariPackage.count({ where: { isActive: true } }),
    prisma.safariPackage.count({ where: { type: "Budget" } }),
    prisma.safariPackage.count({ where: { type: "Mid-range" } }),
    prisma.safariPackage.count({ where: { type: "Luxury" } }),
  ]);

  return { total, active, budget, midRange, luxury };
}

function formatPrice(price: number | null) {
  if (!price) return "N/A";
  return `$${price.toLocaleString()}`;
}

export default async function SafarisPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const type = params.type;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ safaris, total, totalPages }, stats] = await Promise.all([
    getSafaris({ status, type, search, page }),
    getSafariStats(),
  ]);

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "Budget", label: "Budget" },
    { value: "Mid-range", label: "Mid-range" },
    { value: "Luxury", label: "Luxury" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safari Packages</h1>
          <p className="text-slate-600 mt-1">
            Manage Tanzania safari packages
          </p>
        </div>
        <Link
          href="/admin/safaris/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Safari
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Safaris</p>
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
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Budget</p>
              <p className="text-xl font-bold text-slate-900">{stats.budget}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Mid-range</p>
              <p className="text-xl font-bold text-slate-900">{stats.midRange}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Luxury</p>
              <p className="text-xl font-bold text-slate-900">{stats.luxury}</p>
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
                placeholder="Search safaris..."
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
          <select
            name="type"
            defaultValue={type || "all"}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
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

      {/* Safaris List */}
      {safaris.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Compass className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No safaris found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || status || type ? "Try adjusting your filters" : "Add your first safari package"}
          </p>
          <Link
            href="/admin/safaris/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add Safari
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {safaris.map((safari) => (
              <div
                key={safari.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex gap-4">
                  {safari.featuredImage && (
                    <div className="w-40 h-28 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={safari.featuredImage}
                        alt={safari.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {safari.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                          {safari.overview}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {safari.duration}
                          </span>
                          {safari.priceFrom && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <DollarSign className="w-4 h-4" />
                              From {formatPrice(Number(safari.priceFrom))}
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            safari.type === "Budget"
                              ? "bg-blue-100 text-blue-700"
                              : safari.type === "Mid-range"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-purple-100 text-purple-700"
                          }`}>
                            {safari.type}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            safari.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {safari.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        {safari.destinations.length > 0 && (
                          <p className="text-sm text-slate-500 mt-2">
                            Destinations: {safari.destinations.map(d => d.destination.name).join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {safari.isActive && (
                          <a
                            href={`/tanzania-safaris/${safari.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-slate-600"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/safaris/${safari.id}`}
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
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} safaris
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/safaris?page=${page - 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}${search ? `&search=${search}` : ""}`}
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
                    href={`/admin/safaris?page=${page + 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}${search ? `&search=${search}` : ""}`}
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
