import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Plus,
  Search,
  Edit,
  Eye,
  Calendar,
  DollarSign,
  Filter,
  MapPin,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { scoreSafariSeo, aggregateSeoScores } from "@/lib/seo-score";
import { SeoScoreBadge } from "@/components/admin/SeoScoreBadge";
import { SeoSummaryCard } from "@/components/admin/SeoSummaryCard";

type SafariQuery = {
  status?: string;
  type?: string;
  search?: string;
  destination?: string;
  duration?: string;
  priceRange?: string;
  sort?: string;
  page?: number;
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
  { value: "duration-asc", label: "Duration: short → long" },
  { value: "duration-desc", label: "Duration: long → short" },
  { value: "title-asc", label: "Title: A → Z" },
] as const;

const DURATION_BUCKETS: Record<string, { gte: number; lte?: number; label: string }> = {
  "1-3": { gte: 1, lte: 3, label: "1–3 days" },
  "4-7": { gte: 4, lte: 7, label: "4–7 days" },
  "8-14": { gte: 8, lte: 14, label: "8–14 days" },
  "15+": { gte: 15, label: "15+ days" },
};

const PRICE_BUCKETS: Record<string, { gte?: number; lte?: number; label: string }> = {
  "under-1000": { lte: 999.99, label: "Under $1,000" },
  "1000-2500": { gte: 1000, lte: 2499.99, label: "$1,000 – $2,500" },
  "2500-5000": { gte: 2500, lte: 4999.99, label: "$2,500 – $5,000" },
  "5000+": { gte: 5000, label: "$5,000+" },
};

function buildOrderBy(sort: string | undefined) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };
    case "price-asc":
      return { priceFrom: "asc" as const };
    case "price-desc":
      return { priceFrom: "desc" as const };
    case "duration-asc":
      return { durationDays: "asc" as const };
    case "duration-desc":
      return { durationDays: "desc" as const };
    case "title-asc":
      return { title: "asc" as const };
    case "newest":
    default:
      return { createdAt: "desc" as const };
  }
}

async function getSafaris(params: SafariQuery) {
  const {
    status,
    type,
    search,
    destination,
    duration,
    priceRange,
    sort,
    page = 1,
  } = params;
  const limit = 20;

  const durationFilter = duration ? DURATION_BUCKETS[duration] : undefined;
  const priceFilter = priceRange ? PRICE_BUCKETS[priceRange] : undefined;

  const where = {
    ...(status === "active" && { isActive: true }),
    ...(status === "inactive" && { isActive: false }),
    ...(type && type !== "all" && { type }),
    ...(destination && {
      destinations: { some: { destinationId: destination } },
    }),
    ...(durationFilter && {
      durationDays: {
        gte: durationFilter.gte,
        ...(durationFilter.lte !== undefined && { lte: durationFilter.lte }),
      },
    }),
    ...(priceFilter && {
      priceFrom: {
        ...(priceFilter.gte !== undefined && { gte: priceFilter.gte }),
        ...(priceFilter.lte !== undefined && { lte: priceFilter.lte }),
      },
    }),
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
      orderBy: buildOrderBy(sort),
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

async function getDestinations() {
  return prisma.destination.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

function formatPrice(price: number | null) {
  if (!price) return "N/A";
  return `$${price.toLocaleString()}`;
}

export default async function SafarisPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    type?: string;
    search?: string;
    destination?: string;
    duration?: string;
    priceRange?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const type = params.type;
  const search = params.search;
  const destination = params.destination;
  const duration = params.duration;
  const priceRange = params.priceRange;
  const sort = params.sort;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ safaris, total, totalPages }, stats, destinations] = await Promise.all([
    getSafaris({ status, type, search, destination, duration, priceRange, sort, page }),
    getSafariStats(),
    getDestinations(),
  ]);

  const seoResults = safaris.map((s) =>
    scoreSafariSeo({
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
    })
  );
  const seoAggregate = aggregateSeoScores(seoResults);
  const seoByIndex = new Map(safaris.map((s, i) => [s.id, seoResults[i]]));

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

  const hasActiveFilters = Boolean(
    search || (status && status !== "all") || (type && type !== "all") ||
    destination || duration || priceRange || (sort && sort !== "newest")
  );

  function buildPageUrl(targetPage: number) {
    const usp = new URLSearchParams();
    if (status && status !== "all") usp.set("status", status);
    if (type && type !== "all") usp.set("type", type);
    if (search) usp.set("search", search);
    if (destination) usp.set("destination", destination);
    if (duration) usp.set("duration", duration);
    if (priceRange) usp.set("priceRange", priceRange);
    if (sort && sort !== "newest") usp.set("sort", sort);
    usp.set("page", String(targetPage));
    return `/admin/safaris/?${usp.toString()}`;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

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
          href="/admin/safaris/new/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Safari
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Total</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Active</p>
              <p className="text-xl font-bold text-green-600">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Budget</p>
              <p className="text-xl font-bold text-blue-600">{stats.budget}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Mid-range</p>
              <p className="text-xl font-bold text-amber-600">{stats.midRange}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Luxury</p>
              <p className="text-xl font-bold text-purple-600">{stats.luxury}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by title or overview..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="status"
              aria-label="Filter by status"
              defaultValue={status || "all"}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
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
            aria-label="Filter by type"
            defaultValue={type || "all"}
            className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <select
              name="destination"
              aria-label="Filter by destination"
              defaultValue={destination || ""}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
            >
              <option value="">All Destinations</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <select
              name="duration"
              aria-label="Filter by duration"
              defaultValue={duration || ""}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
            >
              <option value="">Any duration</option>
              {Object.entries(DURATION_BUCKETS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <select
              name="priceRange"
              aria-label="Filter by price range"
              defaultValue={priceRange || ""}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
            >
              <option value="">Any price</option>
              {Object.entries(PRICE_BUCKETS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              name="sort"
              aria-label="Sort order"
              defaultValue={sort || "newest"}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
          >
            Apply
          </button>
          {hasActiveFilters && (
            <Link
              href="/admin/safaris/"
              className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              Clear
            </Link>
          )}
        </form>
      </div>

      {/* SEO aggregate summary */}
      {safaris.length > 0 && <SeoSummaryCard aggregate={seoAggregate} />}

      {/* Safaris List */}
      {safaris.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Compass className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No safaris found
          </h3>
          <p className="text-slate-500 mb-4">
            {hasActiveFilters ? "Try adjusting your filters" : "Add your first safari package"}
          </p>
          <Link
            href="/admin/safaris/new/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add Safari
          </Link>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>
              Showing <span className="font-medium">{(page - 1) * 20 + 1}</span> to{" "}
              <span className="font-medium">{Math.min(page * 20, total)}</span> of{" "}
              <span className="font-medium">{total}</span> safaris
            </p>
          </div>

          <div className="grid gap-4">
            {safaris.map((safari) => {
              const seoResult = seoByIndex.get(safari.id)!;
              return (
                <div
                  key={safari.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md hover:border-amber-300 transition-all"
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
                              title="View published safari"
                              aria-label={`View ${safari.title} on public site`}
                              className="p-2 text-slate-400 hover:text-slate-600"
                            >
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                          <Link
                            href={`/admin/safaris/${safari.id}/`}
                            title="Edit safari"
                            aria-label={`Edit ${safari.title}`}
                            className="p-2 text-slate-400 hover:text-amber-600"
                          >
                            <Edit className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SeoScoreBadge
                    result={seoResult}
                    editHref={`/admin/safaris/${safari.id}/`}
                  />
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {page > 1 && (
                <Link
                  href={buildPageUrl(page - 1)}
                  className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Previous
                </Link>
              )}

              <div className="flex items-center gap-1">
                {pageNumbers.map((p, idx, arr) => (
                  <span key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-2 text-slate-400">...</span>
                    )}
                    <Link
                      href={buildPageUrl(p)}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                        p === page
                          ? "bg-amber-600 text-white"
                          : "border border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </Link>
                  </span>
                ))}
              </div>

              {page < totalPages && (
                <Link
                  href={buildPageUrl(page + 1)}
                  className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
