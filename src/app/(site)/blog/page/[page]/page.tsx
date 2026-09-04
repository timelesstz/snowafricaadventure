import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";
import {
  getPostsPage,
  getBlogCategories,
  getTotalBlogPages,
} from "@/lib/blog-listing";

/**
 * Paginated blog archive: /blog/page/2/, /blog/page/3/, …
 *
 * Page 1 stays at /blog/ so the existing URL and its links are untouched.
 * These pages exist mainly so a crawler can reach all 291 published posts —
 * previously only the newest 20 were linked from anywhere.
 */

export const revalidate = 300;

interface Props {
  params: Promise<{ page: string }>;
}

function parsePage(raw: string): number | null {
  if (!/^[1-9][0-9]*$/.test(raw)) return null;
  return Number(raw);
}

// Cached so generateMetadata and the page body share one count query.
const totalPages = cache(getTotalBlogPages);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePage(raw);
  // Out-of-range pages render the not-found UI, so the title must match it
  // rather than advertise a page that does not exist.
  if (!page || page === 1 || page > (await totalPages())) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  return genMeta({
    title: `Tanzania Safari Blog — Page ${page}`,
    description: `Page ${page} of our articles on climbing Kilimanjaro, Tanzania safaris, and travel tips for your African adventure.`,
    url: `/blog/page/${page}/`,
  });
}

export default async function BlogArchivePage({ params }: Props) {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page) notFound();

  const pageCount = await totalPages();
  // Page 1 lives at /blog/; anything past the end is a 404 rather than a blank grid.
  if (page === 1 || page > pageCount) notFound();

  const [posts, categories] = await Promise.all([
    getPostsPage(page),
    getBlogCategories(),
  ]);

  if (posts.length === 0) notFound();

  return (
    <div>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog/" },
          { name: `Page ${page}`, url: `/blog/page/${page}/` },
        ])}
      />

      <PageHero pageSlug="blog" />

      <section className="py-8 md:py-12 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Page {page} of {pageCount}
          </p>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              <BlogPagination currentPage={page} totalPages={pageCount} />
            </div>

            <div className="lg:col-span-1">
              <BlogSidebar categories={categories} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
