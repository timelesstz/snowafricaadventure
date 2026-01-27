import { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta } from "@/lib/seo";
import prisma from "@/lib/prisma";

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
    featuredImage: post.featuredImage,
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

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--text)] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-[var(--text-light)] max-w-2xl">
            Travel tips, safari stories, and Kilimanjaro guides from our team of
            local experts. {posts.length} articles to explore.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <p className="text-[var(--text-muted)]">No posts found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-[var(--surface)] rounded-lg p-5">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  {categories.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)]">No categories yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat.slug}>
                          <Link
                            href={`/category/${cat.slug}/`}
                            className="flex items-center justify-between text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                          >
                            <span>{cat.name}</span>
                            <span className="text-sm text-[var(--text-muted)]">
                              ({cat.count})
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Featured Routes */}
                <div className="bg-[var(--primary-light)] rounded-lg p-5">
                  <h3 className="font-semibold text-[var(--primary-dark)] mb-3">
                    Popular Routes
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/trekking/7-days-machame-route/"
                        className="text-[var(--text)] hover:text-[var(--primary)]"
                      >
                        7-Days Machame Route
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/trekking/8-days-lemosho-route/"
                        className="text-[var(--text)] hover:text-[var(--primary)]"
                      >
                        8-Days Lemosho Route
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/trekking/6-days-rongai-route/"
                        className="text-[var(--text)] hover:text-[var(--primary)]"
                      >
                        6-Days Rongai Route
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Featured Safaris */}
                <div className="bg-[var(--secondary-light)] rounded-lg p-5">
                  <h3 className="font-semibold text-[var(--secondary-dark)] mb-3">
                    Popular Safaris
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/tanzania-safaris/3-days-tanzania-lodge-safari/"
                        className="text-[var(--text)] hover:text-[var(--secondary-dark)]"
                      >
                        3-Days Lodge Safari
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tanzania-safaris/5-days-tanzania-luxury-safari/"
                        className="text-[var(--text)] hover:text-[var(--secondary-dark)]"
                      >
                        5-Days Luxury Safari
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tanzania-safaris/7-days-tanzania-lodge-safari/"
                        className="text-[var(--text)] hover:text-[var(--secondary-dark)]"
                      >
                        7-Days Lodge Safari
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
