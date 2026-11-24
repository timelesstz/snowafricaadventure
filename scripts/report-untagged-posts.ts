/**
 * Read-only: lists blog posts with no tags (slug, title, categories) and the
 * full tag vocabulary with usage counts, so tags can be assigned by hand.
 */
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

async function main() {
  const [posts, tags] = await Promise.all([
    prisma.blogPost.findMany({
      where: { tags: { none: {} } },
      select: {
        slug: true,
        title: true,
        isPublished: true,
        categories: { select: { category: { select: { slug: true } } } },
      },
      orderBy: { slug: "asc" },
    }),
    prisma.tag.findMany({
      select: { slug: true, _count: { select: { posts: true } } },
      orderBy: { slug: "asc" },
    }),
  ]);
  for (const p of posts) {
    console.log(
      `${p.isPublished ? "" : "[draft] "}${p.slug} | ${p.title} | ${p.categories.map((c) => c.category.slug).join(",")}`
    );
  }
  console.log(`\nTAGS (${tags.length}): ${tags.map((t) => `${t.slug}:${t._count.posts}`).join(" ")}`);
}

main().finally(() => prisma.$disconnect());
