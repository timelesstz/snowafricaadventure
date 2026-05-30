import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta } from "@/lib/seo";

interface Props {
  params: Promise<{ tagSlug: string }>;
}

const getTag = cache(async function getTag(slug: string) {
  try {
    const tag = await prisma.tag.findUnique({
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
    return tag;
  } catch {
    return null;
  }
});

const getOtherTags = cache(async function getOtherTags(excludeSlug: string) {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        slug: { not: excludeSlug },
        posts: {
          some: {
            post: { isPublished: true },
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            posts: {
              where: {
                post: { isPublished: true },
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return tags;
  } catch {
    return [];
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tagSlug } = await params;
  const tag = await getTag(tagSlug);

  if (!tag) return {};

  const publishedPostCount = tag.posts.length;

  return genMeta({
    title: `${tag.name} Articles`,
    description: `Browse ${publishedPostCount} article${publishedPostCount !== 1 ? "s" : ""} tagged with "${tag.name}" — guides, tips, and insights from Snow Africa Adventure.`,
    url: `/tag/${tagSlug}/`,
    noIndex: publishedPostCount < 3,
  });
}

export default async function TagPage({ params }: Props) {
  const { tagSlug } = await params;
  const tag = await getTag(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = tag.posts.map((item) => item.post);
  const otherTags = await getOtherTags(tagSlug);

  return (
    <div>
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
            <span className="text-white">Tag: {tag.name}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {tag.name}
          </h1>
          <p className="text-xl text-[var(--text-light)] max-w-2xl">
            {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with
            &ldquo;{tag.name}&rdquo;
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <p className="text-[var(--text-muted)] mb-8">
                {posts.length} article{posts.length !== 1 ? "s" : ""} with this
                tag
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt || ""}
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
                No articles found with this tag yet.
              </p>
              <Link
                href="/blog/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
              >
                &larr; Back to all articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Tags */}
      {otherTags.length > 0 && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold mb-6">
              Explore Other Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherTags.map((t) => (
                <Link
                  key={t.id}
                  href={`/tag/${t.slug}/`}
                  className="bg-white border border-[var(--border)] hover:border-[var(--primary)] px-4 py-2 rounded-lg transition-colors"
                >
                  {t.name}
                  <span className="text-[var(--text-light)] ml-2 text-sm">
                    ({t._count.posts})
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
