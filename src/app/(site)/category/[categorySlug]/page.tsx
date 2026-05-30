import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

const getCategory = cache(async function getCategory(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        posts: {
          where: { post: { isPublished: true } },
          orderBy: { post: { publishedAt: "desc" } },
          include: {
            post: true,
          },
        },
      },
    });
    return category;
  } catch {
    return null;
  }
});

const getOtherCategories = cache(async function getOtherCategories(
  currentSlug: string
) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        slug: { not: currentSlug },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            posts: {
              where: { post: { isPublished: true } },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return categories;
  } catch {
    return [];
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategory(categorySlug);

  if (!category) return {};

  return genMeta({
    title: category.name,
    description: category.description || `Articles about ${category.name}`,
    url: `/category/${categorySlug}/`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = await getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = category.posts.map((item) => item.post);
  const otherCategories = await getOtherCategories(categorySlug);

  return (
    <div>
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog/" },
        { name: category.name, url: `/category/${categorySlug}/` },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--text)] text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-[var(--text-light)] mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog/" className="hover:text-white">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-[var(--text-light)] max-w-2xl">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <p className="text-[var(--text-muted)] mb-8">
                {posts.length} article{posts.length !== 1 ? "s" : ""} in this
                category
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    featuredImage={post.featuredImage}
                    publishedAt={post.publishedAt}
                    author={post.author || "Snow Africa Team"}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--text-muted)] mb-4">
                No articles found in this category yet.
              </p>
              <Link
                href="/blog/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
              >
                ← Back to all articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      {otherCategories.length > 0 && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold mb-6">
              Explore Other Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}/`}
                  className="bg-white border border-[var(--border)] hover:border-[var(--primary)] px-4 py-2 rounded-lg transition-colors"
                >
                  {cat.name}
                  <span className="text-[var(--text-light)] ml-2 text-sm">
                    ({cat._count.posts})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-xl mx-auto">
            Our team is ready to help you plan the perfect Tanzania experience.
          </p>
          <Link
            href="/contact-us/"
            className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
