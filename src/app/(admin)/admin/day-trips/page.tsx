import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Sun,
  Plus,
  Search,
  Edit,
  Eye,
  DollarSign,
} from "lucide-react";

async function getDayTrips(params: {
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
        { destination: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [dayTrips, total] = await Promise.all([
    prisma.dayTrip.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.dayTrip.count({ where }),
  ]);

  return { dayTrips, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getDayTripStats() {
  const [total, active] = await Promise.all([
    prisma.dayTrip.count(),
    prisma.dayTrip.count({ where: { isActive: true } }),
  ]);

  return { total, active };
}

function formatPrice(price: number | null) {
  if (!price) return "N/A";
  return `$${price.toLocaleString()}`;
}

export default async function DayTripsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ dayTrips, total, totalPages }, stats] = await Promise.all([
    getDayTrips({ status, search, page }),
    getDayTripStats(),
  ]);

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Day Trips</h1>
          <p className="text-slate-600 mt-1">
            Manage Tanzania day trip experiences
          </p>
        </div>
        <Link
          href="/admin/day-trips/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Day Trip
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Day Trips</p>
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
                placeholder="Search day trips..."
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

      {/* Day Trips Grid */}
      {dayTrips.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Sun className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No day trips found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || status ? "Try adjusting your filters" : "Add your first day trip"}
          </p>
          <Link
            href="/admin/day-trips/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add Day Trip
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dayTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:border-amber-300 transition-colors"
              >
                {trip.featuredImage && (
                  <div className="h-40 relative">
                    <Image
                      src={trip.featuredImage}
                      alt={trip.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{trip.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                      trip.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {trip.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                    {trip.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                        {trip.destination}
                      </span>
                      {trip.priceFrom && (
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <DollarSign className="w-3.5 h-3.5" />
                          {formatPrice(Number(trip.priceFrom))}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {trip.isActive && (
                        <a
                          href={`/day-trips/${trip.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-600"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        href={`/admin/day-trips/${trip.id}`}
                        className="p-2 text-slate-400 hover:text-amber-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
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
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} day trips
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/day-trips?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
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
                    href={`/admin/day-trips?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
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
