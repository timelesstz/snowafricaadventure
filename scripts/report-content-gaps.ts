/**
 * Read-only report of the "Most common gaps" on /admin/seo/content-health/:
 * blog posts without categories or tags, destinations without a gallery,
 * trekking routes without FAQs. Writes nothing.
 *
 *   npx tsx scripts/report-content-gaps.ts > gaps.json
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

async function main() {
  const [categories, tags, posts, destinations, routes] = await Promise.all([
    prisma.category.findMany({
      select: { slug: true, name: true, _count: { select: { posts: true } } },
    }),
    prisma.tag.findMany({
      select: { slug: true, name: true, _count: { select: { posts: true } } },
    }),
    prisma.blogPost.findMany({
      select: {
        slug: true,
        title: true,
        isPublished: true,
        categories: { select: { category: { select: { slug: true } } } },
        tags: { select: { tag: { select: { slug: true } } } },
      },
    }),
    prisma.destination.findMany({
      where: { gallery: { isEmpty: true } },
      select: { slug: true, name: true, featuredImage: true, isActive: true },
    }),
    prisma.trekkingRoute.findMany({
      select: { slug: true, title: true, isActive: true, faqs: true },
    }),
  ]);

  const noFaq = routes.filter(
    (r) => !r.faqs || (Array.isArray(r.faqs) && r.faqs.length === 0)
  );

  console.log(
    JSON.stringify(
      {
        categories,
        tags: { count: tags.length, sample: tags.slice(0, 80) },
        postsWithoutCategory: posts
          .filter((p) => p.categories.length === 0)
          .map((p) => ({ slug: p.slug, title: p.title, published: p.isPublished })),
        postsWithoutTagsCount: posts.filter((p) => p.tags.length === 0).length,
        postsTotal: posts.length,
        destinationsWithoutGallery: destinations,
        routesWithoutFaqs: noFaq.map((r) => ({ slug: r.slug, title: r.title, active: r.isActive })),
      },
      null,
      2
    )
  );
}

main().finally(() => prisma.$disconnect());
