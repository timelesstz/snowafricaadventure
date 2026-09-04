import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Mountain, MapPin, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, getCategoryFallbackImage } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";
import {
  getPostsPage,
  getBlogCategories,
  getTotalBlogPages,
} from "@/lib/blog-listing";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari Blog & Travel Tips",
  description:
    "Read our latest articles about climbing Kilimanjaro, Tanzania safaris, and travel tips for your African adventure.",
  url: "/blog/",
});

export const revalidate = 300;

export default async function BlogPage() {
  const [posts, categories, totalPages] = await Promise.all([
    getPostsPage(1),
    getBlogCategories(),
    getTotalBlogPages(),
  ]);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div>
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog/" },
      ])} />

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
              <BlogPagination currentPage={1} totalPages={totalPages} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar categories={categories} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
