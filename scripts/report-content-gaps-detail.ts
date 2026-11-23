/**
 * Read-only companion to report-content-gaps.ts: shows how existing content
 * fills the same fields (FAQ shape, gallery sizes, tag usage, category
 * membership, media library matches) so gaps can be filled from real data.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

async function main() {
  const routes = await prisma.trekkingRoute.findMany({
    select: { slug: true, title: true, faqs: true, duration: true },
  });
  const withFaqs = routes.filter((r) => Array.isArray(r.faqs) && r.faqs.length > 0);

  const dests = await prisma.destination.findMany({
    select: { slug: true, name: true, gallery: true },
  });

  const tags = await prisma.tag.findMany({
    select: { slug: true, name: true, _count: { select: { posts: true } } },
    orderBy: { posts: { _count: "desc" } },
    take: 60,
  });

  const catSamples = await prisma.category.findMany({
    select: {
      slug: true,
      posts: { take: 6, select: { post: { select: { slug: true } } } },
    },
  });

  const media = await prisma.media.findMany({
    select: { url: true, filename: true, folder: true, alt: true },
    take: 2000,
  });
  const folders: Record<string, number> = {};
  for (const m of media) folders[m.folder ?? "(none)"] = (folders[m.folder ?? "(none)"] ?? 0) + 1;

  console.log(
    JSON.stringify(
      {
        routesWithFaqs: withFaqs.map((r) => ({
          slug: r.slug,
          duration: r.duration,
          faqCount: (r.faqs as unknown[]).length,
        })),
        sampleFaqs: withFaqs.slice(0, 1).map((r) => ({ slug: r.slug, faqs: r.faqs })),
        galleries: dests.map((d) => ({ slug: d.slug, n: d.gallery.length, first: d.gallery[0] })),
        topTags: tags.map((t) => `${t.slug}:${t._count.posts}`),
        catSamples: catSamples.map((c) => ({ slug: c.slug, posts: c.posts.map((p) => p.post.slug) })),
        mediaTotal: media.length,
        mediaFolders: folders,
      },
      null,
      2
    )
  );
}

main().finally(() => prisma.$disconnect());
