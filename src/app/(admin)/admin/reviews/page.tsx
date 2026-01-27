import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Star,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
} from "lucide-react";

async function getReviews(params: {
  source?: string;
  featured?: string;
  search?: string;
  page?: number;
}) {
  const { source, featured, search, page = 1 } = params;
  const limit = 20;

  const where = {
    ...(source && source !== "all" && { source }),
    ...(featured === "true" && { isFeatured: true }),
    ...(search && {
      OR: [
        { authorName: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where }),
  ]);

  return { reviews, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getReviewStats() {
  const [total, featured, tripadvisor, google, manual] = await Promise.all([
    prisma.review.count(),
    prisma.review.count({ where: { isFeatured: true } }),
    prisma.review.count({ where: { source: "tripadvisor" } }),
    prisma.review.count({ where: { source: "google" } }),
    prisma.review.count({ where: { source: "manual" } }),
  ]);

  return { total, featured, tripadvisor, google, manual };
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; featured?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const source = params.source;
  const featured = params.featured;
  const search = params.search;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ reviews, total, totalPages }, stats] = await Promise.all([
    getReviews({ source, featured, search, page }),
    getReviewStats(),
  ]);

  const sources = [
    { value: "all", label: "All Sources" },
    { value: "tripadvisor", label: "TripAdvisor" },
    { value: "google", label: "Google" },
    { value: "manual", label: "Manual" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews & Testimonials</h1>
          <p className="text-slate-600 mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Reviews</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Featured</p>
              <p className="text-xl font-bold text-slate-900">{stats.featured}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">TripAdvisor</p>
              <p className="text-xl font-bold text-slate-900">{stats.tripadvisor}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Google</p>
              <p className="text-xl font-bold text-slate-900">{stats.google}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Manual</p>
              <p className="text-xl font-bold text-slate-900">{stats.manual}</p>
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
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="source"
              defaultValue={source || "all"}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              {sources.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={featured === "true"}
              className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-slate-600">Featured only</span>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Reviews Table */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Star className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No reviews found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || source ? "Try adjusting your filters" : "Add your first review to get started"}
          </p>
          <Link
            href="/admin/reviews/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Author
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Rating
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Content
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Source
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">
                    Date
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
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{review.authorName}</p>
                      {review.tripType && (
                        <p className="text-sm text-slate-500">{review.tripType}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-slate-600 truncate">{review.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        review.source === "tripadvisor"
                          ? "bg-green-100 text-green-700"
                          : review.source === "google"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {review.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(review.publishedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {review.isFeatured && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                            Featured
                          </span>
                        )}
                        {review.verified && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/reviews/${review.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
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
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} reviews
              </p>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/reviews?page=${page - 1}${source ? `&source=${source}` : ""}${search ? `&search=${search}` : ""}`}
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
                    href={`/admin/reviews?page=${page + 1}${source ? `&source=${source}` : ""}${search ? `&search=${search}` : ""}`}
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
