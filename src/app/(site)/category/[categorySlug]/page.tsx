import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/cards/BlogCard";
import { generateMetadata as genMeta } from "@/lib/seo";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

async function getCategory(slug: string) {
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
}

// Placeholder categories for development
const placeholderCategories: Record<
  string,
  {
    id: string;
    name: string;
    slug: string;
    description: string;
    posts: {
      id: string;
      title: string;
      slug: string;
      excerpt: string;
      featuredImage: string;
      publishedAt: string;
      author: { name: string };
    }[];
  }
> = {
  "kilimanjaro-guides": {
    id: "1",
    name: "Kilimanjaro Guides",
    slug: "kilimanjaro-guides",
    description:
      "Expert guides, tips, and information for climbing Mount Kilimanjaro. From route selection to packing lists, we cover everything you need for a successful summit.",
    posts: [
      {
        id: "1",
        title: "Best Time to Climb Kilimanjaro: Month by Month Guide",
        slug: "best-time-climb-kilimanjaro",
        excerpt:
          "Discover the optimal months for climbing Kilimanjaro based on weather patterns, crowd levels, and your personal preferences.",
        featuredImage: "/images/blog/best-time-kili.jpg",
        publishedAt: "2025-01-10",
        author: { name: "Joseph Moshi" },
      },
      {
        id: "2",
        title: "Kilimanjaro Packing List: What to Bring",
        slug: "kilimanjaro-packing-list",
        excerpt:
          "A comprehensive packing list for your Kilimanjaro climb, from technical gear to personal items.",
        featuredImage: "/images/blog/packing-list.jpg",
        publishedAt: "2025-01-05",
        author: { name: "Grace Kimaro" },
      },
      {
        id: "3",
        title: "Machame vs Lemosho: Which Route is Right for You?",
        slug: "machame-vs-lemosho-route-comparison",
        excerpt:
          "A detailed comparison of two of Kilimanjaro's most popular routes to help you decide.",
        featuredImage: "/images/blog/route-comparison.jpg",
        publishedAt: "2024-12-20",
        author: { name: "Joseph Moshi" },
      },
    ],
  },
  "safari-tips": {
    id: "2",
    name: "Safari Tips",
    slug: "safari-tips",
    description:
      "Make the most of your Tanzania safari with our expert tips on wildlife spotting, photography, best seasons, and what to expect.",
    posts: [
      {
        id: "4",
        title: "Great Migration: When and Where to See It",
        slug: "great-migration-guide",
        excerpt:
          "Track the annual wildebeest migration through Tanzania and Kenya with our month-by-month guide.",
        featuredImage: "/images/blog/migration.jpg",
        publishedAt: "2025-01-08",
        author: { name: "Emmanuel Ole" },
      },
      {
        id: "5",
        title: "Safari Photography Tips for Beginners",
        slug: "safari-photography-tips",
        excerpt:
          "Essential tips for capturing stunning wildlife photos on your first safari adventure.",
        featuredImage: "/images/blog/photography.jpg",
        publishedAt: "2024-12-15",
        author: { name: "Grace Kimaro" },
      },
    ],
  },
  "tanzania-travel": {
    id: "3",
    name: "Tanzania Travel",
    slug: "tanzania-travel",
    description:
      "General travel information about Tanzania including visa requirements, health tips, cultural insights, and destination guides.",
    posts: [
      {
        id: "6",
        title: "Tanzania Visa Requirements 2025: Complete Guide",
        slug: "tanzania-visa-requirements",
        excerpt:
          "Everything you need to know about getting a visa for Tanzania, including the new e-visa system.",
        featuredImage: "/images/blog/visa.jpg",
        publishedAt: "2025-01-12",
        author: { name: "Grace Kimaro" },
      },
      {
        id: "7",
        title: "Best Time to Visit Tanzania",
        slug: "best-time-visit-tanzania",
        excerpt:
          "A comprehensive guide to Tanzania's seasons and the best times for different activities.",
        featuredImage: "/images/blog/tanzania-seasons.jpg",
        publishedAt: "2024-12-28",
        author: { name: "Joseph Moshi" },
      },
    ],
  },
  "zanzibar": {
    id: "4",
    name: "Zanzibar",
    slug: "zanzibar",
    description:
      "Discover the magic of Zanzibar - from Stone Town's history to the best beaches, spice tours, and island activities.",
    posts: [
      {
        id: "8",
        title: "Top 10 Things to Do in Zanzibar",
        slug: "things-to-do-zanzibar",
        excerpt:
          "From Stone Town to the beaches, discover the best experiences Zanzibar has to offer.",
        featuredImage: "/images/blog/zanzibar-things.jpg",
        publishedAt: "2024-12-22",
        author: { name: "Grace Kimaro" },
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategory(categorySlug);
  const placeholder = placeholderCategories[categorySlug];

  const cat = category || placeholder;
  if (!cat) return {};

  return genMeta({
    title: cat.name,
    description: cat.description || `Articles about ${cat.name}`,
    url: `/category/${categorySlug}/`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const dbCategory = await getCategory(categorySlug);
  const placeholder = placeholderCategories[categorySlug];

  const category = dbCategory || placeholder;

  if (!category) {
    notFound();
  }

  // Handle both junction table results (from DB) and direct posts (from placeholder)
  const rawPosts = category.posts || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = rawPosts.map((item: any) =>
    'post' in item && item.post ? item.post : item
  ) as Array<{
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    publishedAt?: Date | string | null;
    author?: { name: string } | null;
  }>;

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
                    excerpt={post.excerpt || ""}
                    featuredImage={post.featuredImage}
                    publishedAt={post.publishedAt}
                    author={post.author?.name || "Snow Africa Team"}
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
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold mb-6">
            Explore Other Topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.values(placeholderCategories)
              .filter((c) => c.slug !== categorySlug)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}/`}
                  className="bg-white border border-[var(--border)] hover:border-[var(--primary)] px-4 py-2 rounded-lg transition-colors"
                >
                  {cat.name}
                  <span className="text-[var(--text-light)] ml-2 text-sm">
                    ({cat.posts.length})
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

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
