import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Users, Plus, Search, Edit, Mountain, Award, UserCircle } from "lucide-react";

async function getGuides(params: { status?: string; search?: string }) {
  const { status, search } = params;

  const where = {
    ...(status === "active" && { isActive: true }),
    ...(status === "inactive" && { isActive: false }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { role: { contains: search, mode: "insensitive" as const } },
        { bio: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  // Guide lists are small enough that ordering by the manual `order` field and
  // returning everything is simpler than paginating.
  return prisma.guide.findMany({
    where,
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

async function getGuideStats() {
  const [total, active, missingPhoto] = await Promise.all([
    prisma.guide.count(),
    prisma.guide.count({ where: { isActive: true } }),
    prisma.guide.count({ where: { isActive: true, image: null } }),
  ]);

  return { total, active, missingPhoto };
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;

  const [guides, stats] = await Promise.all([
    getGuides({ status, search }),
    getGuideStats(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guides</h1>
          <p className="text-slate-600 mt-1">
            Manage your team profiles shown on the Our Guides page
          </p>
        </div>
        <Link
          href="/admin/guides/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <Plus className="w-4 h-4" />
          Add Guide
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-sm text-slate-600">Total guides</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
              <p className="text-sm text-slate-600">Live on site</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <UserCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.missingPhoto}</p>
              <p className="text-sm text-slate-600">Missing a photo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Search by name, role, or bio..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
          <select
            name="status"
            defaultValue={status || ""}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
          >
            Filter
          </button>
        </form>
      </div>

      {/* List */}
      {guides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600">No guides found.</p>
          <Link
            href="/admin/guides/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add your first guide
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col"
            >
              <div className="flex items-start gap-4 p-5">
                <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-slate-100">
                  {guide.image ? (
                    <Image
                      src={guide.image}
                      alt={guide.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 truncate">{guide.name}</h3>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${
                        guide.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {guide.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{guide.role}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {guide.isFounder && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                        <Award className="w-3 h-3" />
                        Founder
                      </span>
                    )}
                    {guide.isMountainGuide && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                        <Mountain className="w-3 h-3" />
                        Kilimanjaro
                      </span>
                    )}
                    {guide.summits && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600">
                        {guide.summits} summits
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="px-5 text-sm text-slate-600 line-clamp-3 flex-1">{guide.bio}</p>

              <div className="flex items-center justify-between px-5 py-4 mt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Order: {guide.order}</span>
                <Link
                  href={`/admin/guides/${guide.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
