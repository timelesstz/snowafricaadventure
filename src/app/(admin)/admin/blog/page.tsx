import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  User,
  Tag,
  FolderOpen,
  ImageIcon,
  ExternalLink,
  Clock,
} from "lucide-react";

async function getBlogPosts(params: {
  status?: string;
  search?: string;
  category?: string;
  page?: number;
}) {
  const { status, search, category, page = 1 } = params;
  const limit = 12;

  const where = {
    ...(status === "published" && { isPublished: true }),
    ...(status === "draft" && { isPublished: false }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { excerpt: { contains: search, mode: "insensitive" as const } },
        { author: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(category && {
      categories: {
        some: { categoryId: category },
      },
    }),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
}

async function getBlogStats() {
  const [total, published, drafts, withImages, categories] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.blogPost.count({ where: { isPublished: false } }),
    prisma.blogPost.count({ where: { featuredImage: { not: null } } }),
    prisma.category.count(),
  ]);

  return { total, published, drafts, withImages, categories };
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { posts: true } },
    },
  });
}

function formatDate(date: Date | null) {
  if (!date) return "Not published";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const category = params.category;
  const page = params.page ? parseInt(params.page) : 1;

  const [{ posts, total, totalPages }, stats, categories] = await Promise.all([
    getBlogPosts({ status, search, category, page }),
    getBlogStats(),
    getCategories(),
  ]);

  const statuses = [
    { value: "all", label: "All Posts" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Drafts" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-600 mt-1">
            Manage blog posts and articles
          </p>
        </div>
        <Link
          href="/admin/blog/new/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-600" />
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
              <p className="text-xs text-slate-500 uppercase tracking-wide">Published</p>
              <p className="text-xl font-bold text-green-600">{stats.published}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Drafts</p>
              <p className="text-xl font-bold text-yellow-600">{stats.drafts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">With Images</p>
              <p className="text-xl font-bold text-blue-600">{stats.withImages}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Categories</p>
              <p className="text-xl font-bold text-purple-600">{stats.categories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <form method="GET" className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search posts by title, excerpt, or author..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              name="status"
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
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-slate-400" />
            <select
              name="category"
              defaultValue={category || ""}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat._count.posts})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
          >
            Filter
          </button>
          {(search || status || category) && (
            <Link
              href="/admin/blog/"
              className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              Clear
            </Link>
          )}
        </form>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No posts found
          </h3>
          <p className="text-slate-500 mb-4">
            {search || status || category ? "Try adjusting your filters" : "Create your first blog post"}
          </p>
          <Link
            href="/admin/blog/new/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-slate-600">
            <p>
              Showing <span className="font-medium">{(page - 1) * 12 + 1}</span> to{" "}
              <span className="font-medium">{Math.min(page * 12, total)}</span> of{" "}
              <span className="font-medium">{total}</span> posts
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-amber-300 transition-all group"
              >
                <div className="flex">
                  {/* Featured Image */}
                  <div className="w-48 h-48 relative flex-shrink-0 bg-slate-100">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mb-2" />
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                    {/* Status Badge Overlay */}
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${
                        post.isPublished
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}>
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col min-w-0">
                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-grow">
                      {post.excerpt || "No excerpt provided"}
                    </p>

                    {/* Categories & Tags */}
                    {(post.categories.length > 0 || post.tags.length > 0) && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.categories.slice(0, 2).map((pc) => (
                          <span
                            key={pc.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded"
                          >
                            <FolderOpen className="w-3 h-3" />
                            {pc.category.name}
                          </span>
                        ))}
                        {post.tags.slice(0, 2).map((pt) => (
                          <span
                            key={pt.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
                          >
                            <Tag className="w-3 h-3" />
                            {pt.tag.name}
                          </span>
                        ))}
                        {(post.categories.length > 2 || post.tags.length > 2) && (
                          <span className="text-xs text-slate-400">
                            +{post.categories.length + post.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadingTime(post.content)} min read
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <Link
                        href={`/admin/blog/${post.id}/`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      {post.isPublished && (
                        <a
                          href={`/${post.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {page > 1 && (
                <Link
                  href={`/admin/blog/?page=${page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
                  className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Previous
                </Link>
              )}

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .map((p, idx, arr) => (
                    <span key={p} className="flex items-center">
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="px-2 text-slate-400">...</span>
                      )}
                      <Link
                        href={`/admin/blog/?page=${p}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
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
                  href={`/admin/blog/?page=${page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`}
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
