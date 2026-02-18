import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Mountain, MapPin, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta } from "@/lib/seo";
import { normalizeImageUrl, formatDate, getCategoryFallbackImage } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = genMeta({
  title: "Blog - Tanzania Travel Tips & Safari Stories",
  description:
    "Read our latest articles about climbing Kilimanjaro, Tanzania safaris, and travel tips for your African adventure.",
  url: "/blog/",
});

async function getPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    author: post.author || "Snow Africa Team",
    publishedAt: post.publishedAt?.toISOString().split("T")[0] || "",
    featuredImage: normalizeImageUrl(post.featuredImage),
    categories: post.categories.map((c) => ({
      name: c.category.name,
      slug: c.category.slug,
    })),
  }));
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: cat._count.posts,
  })).filter((cat) => cat.count > 0);
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div>
      {/* Hero */}
      <PageHero pageSlug="blog" />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <Link href={`/${featuredPost.slug}/`} className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="relative aspect-[21/9] md:aspect-[3/1]">
                  <Image
                    src={featuredPost.featuredImage || getCategoryFallbackImage(featuredPost.categories)}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 md:p-10 lg:p-12 max-w-3xl">
                    {featuredPost.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredPost.categories.map((cat) => (
                          <span
                            key={cat.slug}
                            className="text-xs font-medium uppercase tracking-wider bg-[var(--primary)] text-white px-3 py-1 rounded-full"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      {featuredPost.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </span>
                      )}
                      {featuredPost.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {remainingPosts.length === 0 ? (
                <p className="text-[var(--text-muted)]">No more posts found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {remainingPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-[var(--text)] mb-4">Categories</h3>
                  {categories.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)]">No categories yet.</p>
                  ) : (
                    <ul className="space-y-1">
                      {categories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={`/category/${cat.slug}/`}
                            className="flex items-center justify-between py-2 px-3 rounded-lg text-[var(--text)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] transition-colors"
                          >
                            <span>{cat.name}</span>
                            <span className="text-xs bg-[var(--muted)] px-2 py-1 rounded-full text-[var(--text-muted)]">
                              {cat.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Kilimanjaro CTA */}
                <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Mountain className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold">
                      Climb Kilimanjaro
                    </h3>
                  </div>
                  <p className="text-[var(--primary-light)] text-sm mb-5 leading-relaxed">
                    Ready for the adventure of a lifetime? Join our expert guides on Africa&apos;s highest peak.
                  </p>
                  <Link
                    href="/trekking/"
                    className="flex items-center justify-center gap-2 bg-white text-[var(--primary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--primary-light)] transition-colors"
                  >
                    View Routes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Safari CTA */}
                <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold">
                      Tanzania Safari
                    </h3>
                  </div>
                  <p className="text-[var(--secondary-light)] text-sm mb-5 leading-relaxed">
                    Explore the Serengeti, Ngorongoro Crater, and more with our expert-led safaris.
                  </p>
                  <Link
                    href="/tanzania-safaris/"
                    className="flex items-center justify-center gap-2 bg-white text-[var(--secondary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--secondary-light)] transition-colors"
                  >
                    View Safaris
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Group Departures */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] mb-2">
                    Join a Group Climb
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    Fixed departure dates with fellow adventurers from around the world.
                  </p>
                  <Link
                    href="/kilimanjaro-join-group-departures/"
                    className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium group"
                  >
                    View 2026 Dates
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
