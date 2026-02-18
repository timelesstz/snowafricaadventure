import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Tag, ChevronRight, Mountain, MapPin, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generateMetadata as genMeta, generateArticleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { processContent, generateTableOfContents } from "@/lib/content-processor";
import { BlogContentClient } from "@/components/blog/BlogContentClient";

interface PageProps {
  params: Promise<{ postSlug: string }>;
}

// List of reserved slugs that are NOT blog posts
const reservedSlugs = [
  "trekking",
  "tanzania-safaris",
  "tanzania-destinations",
  "tanzania-day-tours",
  "zanzibar",
  "kilimanjaro-join-group-departures",
  "tailor-made-safari",
  "contact-us",
  "about-us",
  "terms-conditions",
  "terms-and-conditions",
  "privacy-policy",
  "shop",
  "product",
  "blog",
  "category",
  "admin",
];

// Calculate reading time
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Fetch post from database
async function getPost(slug: string) {
  if (reservedSlugs.includes(slug)) {
    return null;
  }

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: {
      categories: {
        include: { category: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });

  if (!post) return null;

  // Process content for better formatting
  const processedContent = processContent(post.content);
  const tableOfContents = generateTableOfContents(processedContent);

  return {
    slug: post.slug,
    title: post.title,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    excerpt: post.excerpt || "",
    content: processedContent,
    rawContent: post.content,
    author: post.author || "Snow Africa Team",
    featuredImage: post.featuredImage,
    publishedAt: post.publishedAt?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
    readingTime: calculateReadingTime(post.content),
    tableOfContents,
    categories: post.categories.map((c) => ({
      name: c.category.name,
      slug: c.category.slug,
    })),
    tags: post.tags.map((t) => ({
      name: t.tag.name,
      slug: t.tag.slug,
    })),
  };
}

// Fetch categories with post counts
async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { posts: true } },
    },
    orderBy: { name: "asc" },
  });

  return categories
    .filter((cat) => cat._count.posts > 0)
    .map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      count: cat._count.posts,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return genMeta({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    url: `/${post.slug}/`,
    type: "article",
    publishedTime: post.publishedAt,
    author: post.author,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    notFound();
  }

  // Fetch related posts and categories in parallel
  const [relatedPostsData, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        slug: { not: post.slug },
        isPublished: true,
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        publishedAt: true,
        featuredImage: true,
      },
    }),
    getCategories(),
  ]);

  const relatedPosts = relatedPostsData.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    author: p.author || "Snow Africa Team",
    publishedAt: p.publishedAt?.toISOString().split("T")[0] || "",
    featuredImage: p.featuredImage,
  }));

  return (
    <article className="bg-[var(--surface)]">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.title,
              description: post.excerpt,
              url: `/${post.slug}/`,
              publishedTime: post.publishedAt,
              author: post.author,
            })
          ),
        }}
      />

      {/* Hero Section with Featured Image */}
      <section className="relative">
        {/* Featured Image Background */}
        <div className="relative h-[40vh] min-h-[400px] md:h-[50vh] lg:h-[60vh]">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--text)]" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8 md:pb-12">
              {/* Breadcrumbs */}
              <div className="mb-4">
                <Breadcrumbs
                  items={[{ label: "Blog", href: "/blog/" }, { label: post.title }]}
                />
              </div>

              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}/`}
                      className="text-xs font-medium uppercase tracking-wider bg-[var(--primary)] text-white px-3 py-1 rounded-full hover:bg-[var(--primary-dark)] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-white/70">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article Content */}
            <div className="lg:col-span-8">
              {/* Excerpt/Intro */}
              {post.excerpt && (
                <p className="text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed mb-8 font-light border-l-4 border-[var(--primary)] pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Article Body */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 lg:p-12">
                <BlogContentClient />
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-[var(--text-light)]" />
                    <span className="font-semibold text-[var(--text)]">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.slug}
                        className="text-sm bg-[var(--muted)] text-[var(--text-muted)] px-4 py-2 rounded-full hover:bg-[var(--border)] transition-colors"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex justify-between items-center">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Blog
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">
                    Continue Reading
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/${related.slug}/`}
                        className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                      >
                        <div className="aspect-[4/3] relative bg-gradient-to-br from-[var(--primary)] to-[var(--text)]">
                          {related.featuredImage && (
                            <Image
                              src={related.featuredImage}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-2">
                            {formatDate(related.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {post.tableOfContents.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--muted)]">
                    <h3 className="font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                      </span>
                      In This Article
                    </h3>
                    <nav className="space-y-1">
                      {post.tableOfContents.map((item, index) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-start gap-3 py-2 px-3 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] transition-colors group"
                        >
                          {item.number && (
                            <span className="flex-shrink-0 w-6 h-6 bg-[var(--muted)] group-hover:bg-[var(--primary-light)] rounded text-xs font-medium flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--primary)]">
                              {item.number}
                            </span>
                          )}
                          <span className="line-clamp-2">{item.text}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA Card */}
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
                    className="block text-center bg-white text-[var(--primary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--primary-light)] transition-colors"
                  >
                    View Routes
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[var(--muted)] rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-[var(--text-muted)]" />
                    </span>
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/category/${cat.slug}/`}
                          className="flex items-center justify-between py-2 px-3 rounded-lg text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] transition-colors group"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs bg-[var(--muted)] group-hover:bg-[var(--primary-light)] px-2 py-1 rounded-full">
                            {cat.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
                    className="block text-center bg-white text-[var(--secondary-dark)] px-5 py-3 rounded-xl font-semibold hover:bg-[var(--secondary-light)] transition-colors"
                  >
                    View Safaris
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
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
