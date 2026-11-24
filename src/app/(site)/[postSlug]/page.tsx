import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { SidebarTrips } from "@/components/blog/SidebarTrips";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generateMetadata as genMeta, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { AUTHOR_PROFILES } from "@/lib/constants";
import { formatDate, normalizeImageUrl, getCategoryFallbackImage } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { processContent, generateTableOfContents, injectInternalLinks } from "@/lib/content-processor";
import { getInternalLinkMap } from "@/lib/internal-link-map";
import { BlogContentClient } from "@/components/blog/BlogContentClient";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PlanYourTrip } from "@/components/blog/PlanYourTrip";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { ArticleTripCard } from "@/components/blog/ArticleTripCard";
import { splitForCard } from "@/lib/featured-trip";
import { KnowledgeBase, CredentialsBadges } from "@/components/kilimanjaro";
import { sanitizeContentHtml } from "@/lib/sanitize-html";
import { safeJsonLd } from "@/lib/safe-json-ld";

// Author names that have a public page. Only real pages are linked; other
// names render as plain text. "Snow Africa Team" is the company itself.
const AUTHOR_PAGES: Record<string, string> = {
  "Snow Africa Team": "/about-us/",
};

// Cached for 5 minutes (ISR); admin blog saves refresh it at once via
// revalidateBlogPages(). A dynamic segment is only cached when it has
// generateStaticParams; the empty list prerenders nothing at build time,
// so each page renders on first visit and is then cached.
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

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

// Extract FAQ question-answer pairs from HTML content
function extractFAQs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const faqSectionMatch = html.match(/(?:Frequently Asked Questions|FAQ)<\/h[23]>([\s\S]*?)(?=<h[12][^>]*>|$)/i);
  if (!faqSectionMatch) return faqs;

  const faqContent = faqSectionMatch[1];
  const headingRegex = /<h3[^>]*>([^<]+\??)<\/h3>/gi;
  let match;
  const questions: { question: string; index: number }[] = [];

  while ((match = headingRegex.exec(faqContent)) !== null) {
    questions.push({ question: match[1].trim(), index: match.index + match[0].length });
  }

  for (let i = 0; i < questions.length; i++) {
    const start = questions[i].index;
    const end = i + 1 < questions.length ? faqContent.indexOf(`<h3`, start) : faqContent.length;
    const answerHtml = faqContent.slice(start, end);
    const answer = answerHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (answer.length > 10) {
      faqs.push({ question: questions[i].question, answer });
    }
  }
  return faqs;
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// Fetch post from database with retry for transient errors (cached to deduplicate between generateMetadata and page)
const getPost = cache(async function getPost(slug: string) {
  if (reservedSlugs.includes(slug)) {
    return null;
  }

  // Retry once on transient database errors (e.g. Prisma Accelerate timeouts)
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
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

      // Process content for better formatting and inject internal links
      const processedContent = processContent(post.content);
      const linkMap = await getInternalLinkMap();
      const linkedContent = injectInternalLinks(processedContent, linkMap, slug);
      const tableOfContents = generateTableOfContents(linkedContent);
      const faqs = extractFAQs(post.content);

      return {
        slug: post.slug,
        title: post.title,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        excerpt: post.excerpt || "",
        content: linkedContent,
        rawContent: post.content,
        faqs,
        author: post.author || "Snow Africa Team",
        featuredImage: normalizeImageUrl(post.featuredImage),
        publishedAt: post.publishedAt?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
        // Last edit (updatedAt is set by Prisma on every content or meta change).
        updatedAt: post.updatedAt.toISOString().split("T")[0],
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
    } catch (error) {
      if (attempt === 0) {
        console.warn(`[getPost] Attempt 1 failed for slug "${slug}", retrying...`, error);
        continue;
      }
      // Rethrow rather than return null: null renders the not-found page
      // (noindex), which ISR would cache over a live article. Throwing keeps
      // the last good version cached and gives a 5xx that crawlers retry.
      console.error(`[getPost] All attempts failed for slug "${slug}":`, error);
      throw error;
    }
  }

  return null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  // notFound() here as well as in the page. There is deliberately no
  // loading.tsx above this route: its Suspense shell streamed a 200 before
  // notFound() ran, so unknown slugs were soft 404s.
  if (!post) {
    notFound();
  }

  return genMeta({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    url: `/${post.slug}/`,
    image: post.featuredImage || undefined,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { postSlug } = await params;
  const post = await getPost(postSlug);

  if (!post) {
    notFound();
  }

  // Fetch related posts (same categories first, then recent)
  let relatedPostsData: {
    slug: string;
    title: string;
    excerpt: string | null;
    author: string | null;
    publishedAt: Date | null;
    featuredImage: string | null;
  }[] = [];

  try {
    // Get category slugs for current post to find related content
    const postCategorySlugs = post.categories.map((c) => c.slug);

    // First try to find posts in the same categories
    const relatedQuery = prisma.blogPost.findMany({
      where: {
        slug: { not: post.slug },
        isPublished: true,
        ...(postCategorySlugs.length > 0
          ? {
              categories: {
                some: {
                  category: { slug: { in: postCategorySlugs } },
                },
              },
            }
          : {}),
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
    });

    relatedPostsData = await relatedQuery.then(async (posts) => {
        // If not enough category-matched posts, fill with recent posts
        if (posts.length < 3) {
          const existingSlugs = [post.slug, ...posts.map((p) => p.slug)];
          const filler = await prisma.blogPost.findMany({
            where: {
              slug: { notIn: existingSlugs },
              isPublished: true,
            },
            take: 3 - posts.length,
            orderBy: { publishedAt: "desc" },
            select: {
              slug: true,
              title: true,
              excerpt: true,
              author: true,
              publishedAt: true,
              featuredImage: true,
            },
          });
          return [...posts, ...filler];
        }
        return posts;
      });
  } catch (error) {
    console.error("[BlogPostPage] Failed to fetch related posts:", error);
  }

  const relatedPosts = relatedPostsData.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    author: p.author || "Snow Africa Team",
    publishedAt: p.publishedAt?.toISOString().split("T")[0] || "",
    featuredImage: normalizeImageUrl(p.featuredImage),
  }));

  const kiliKeywords = ["kilimanjaro", "climbing", "trekking", "trek", "summit", "route", "altitude", "porter"];
  const postTextLower = `${post.title} ${post.categories.map(c => c.name).join(" ")} ${post.tags.map(t => t.name).join(" ")}`.toLowerCase();
  const isKilimanjaroPost = kiliKeywords.some((kw) => postTextLower.includes(kw));
  const tripKind = isKilimanjaroPost ? "kilimanjaro" : "safari";
  // The featured-trip card sits between the two halves of the article.
  const contentHalves = splitForCard(post.content);

  return (
    <>
    <article className="bg-[var(--surface)]">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            generateArticleSchema({
              title: post.title,
              description: post.excerpt,
              url: `/${post.slug}/`,
              publishedTime: post.publishedAt,
              modifiedTime: post.updatedAt,
              author: post.author,
              authorRole: AUTHOR_PROFILES[post.author]?.role,
              authorCredentials: AUTHOR_PROFILES[post.author]?.credentials,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog/" },
              { name: post.title, url: `/${post.slug}/` },
            ])
          ),
        }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(generateFAQSchema(post.faqs)),
          }}
        />
      )}

      {/* Hero Section with Featured Image */}
      <section className="relative">
        {/* The hero grows with its content, so long titles never spill out
            of a fixed-height box on small screens. */}
        <div className="relative isolate flex min-h-[420px] items-end md:min-h-[50vh] lg:min-h-[60vh]">
          <Image
            src={post.featuredImage || getCategoryFallbackImage(post.categories)}
            alt={post.title}
            fill
            sizes="100vw"
            className="-z-10 object-cover"
            priority
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

          <div className="container mx-auto grid items-end gap-8 px-4 pb-10 pt-16 md:pb-14 lg:grid-cols-12 lg:gap-10 lg:py-14">
            <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <div className="mb-4">
              <Breadcrumbs
                tone="dark"
                items={[{ label: "Blog", href: "/blog/" }, { label: post.title }]}
              />
            </div>

            {post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}/`}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="max-w-4xl text-balance font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25">
                  <User className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
                <span className="font-medium">
                  By{" "}
                  {AUTHOR_PAGES[post.author] ? (
                    <Link
                      href={AUTHOR_PAGES[post.author]}
                      rel="author"
                      className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                    >
                      {post.author}
                    </Link>
                  ) : (
                    post.author
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white/70" aria-hidden="true" />
                {/* Same value as the Article JSON-LD dateModified. */}
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white/70" aria-hidden="true" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
            </div>

            {/* Quick quote beside the title: three short steps, so a reader
                who already knows what they want can ask without scrolling. */}
            <div id="quick-quote" className="scroll-mt-28 lg:col-span-5 xl:col-span-4">
              <QuickQuoteForm
                relatedTo={post.title}
                defaultTrip={isKilimanjaroPost ? "Kilimanjaro" : "Wildlife Safari"}
                formId="article-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Article Content */}
            {/* min-w-0: without it, wide tables in the article stretch this
                grid column past the phone screen and the whole page scrolls
                sideways. */}
            <div className="min-w-0 lg:col-span-8">
              {/* Excerpt/Intro */}
              {post.excerpt && (
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 font-light border-l-4 border-[var(--primary)] pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Article Body */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 lg:p-12">
                <BlogContentClient />
                {contentHalves ? (
                  <>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizeContentHtml(contentHalves[0]) }} />
                    <ArticleTripCard
                      kind={tripKind}
                      post={{ slug: post.slug, title: post.title, body: post.rawContent }}
                    />
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizeContentHtml(contentHalves[1]) }} />
                  </>
                ) : (
                  <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizeContentHtml(post.content) }} />
                )}
              </div>

              <PlanYourTrip
                kind={isKilimanjaroPost ? "kilimanjaro" : "safari"}
                postTitle={post.title}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-[var(--text-light)]" />
                    <span className="font-semibold text-[var(--text)]">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/tag/${tag.slug}/`}
                        className="text-sm bg-[var(--muted)] text-[var(--text-muted)] px-4 py-2 rounded-full hover:bg-border transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-8">
                <AuthorBio authorName={post.author} />
              </div>

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

            {/* Sidebar: a compact table of contents and one trip card, sized
                to fit inside the sticky area so nothing gets cut off. Phones
                get the Plan-your-trip block under the article instead. */}
            <aside className="hidden lg:col-span-4 lg:block">
              {/* Capped to the screen: the TOC list scrolls inside, the trip
                  card below always stays whole. */}
              <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-5">
                <div className="flex min-h-0 flex-col">

                <ArticleToc items={post.tableOfContents} />
                </div>

                <SidebarTrips kind={isKilimanjaroPost ? "kilimanjaro" : "safari"} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
    {isKilimanjaroPost && (
      <>
        <CredentialsBadges variant="compact" />
        <KnowledgeBase exclude={`/${post.slug}/`} />
      </>
    )}
    </>
  );
}
