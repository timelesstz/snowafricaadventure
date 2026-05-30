import { cache } from "react";
import prisma from "@/lib/prisma";

export type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  author: string | null;
};

const selectFields = {
  slug: true,
  title: true,
  excerpt: true,
  featuredImage: true,
  publishedAt: true,
  author: true,
} as const;

/**
 * Find blog posts related to a given set of keywords.
 *
 * Searches post titles for any of the provided keywords (case-insensitive).
 * If fewer than `limit` results are found, fills remaining slots with
 * recent published posts.
 */
export const findRelatedBlogPosts = cache(async function findRelatedBlogPosts(
  keywords: string[],
  excludeSlugs: string[] = [],
  limit: number = 3
): Promise<RelatedPost[]> {
  // Build OR conditions for keyword matching on title
  const keywordFilters = keywords
    .filter((kw) => kw.trim().length > 0)
    .map((kw) => ({
      title: { contains: kw, mode: "insensitive" as const },
    }));

  let matched: RelatedPost[] = [];

  if (keywordFilters.length > 0) {
    matched = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        slug: { notIn: excludeSlugs },
        OR: keywordFilters,
      },
      select: selectFields,
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  }

  // If we have enough results, return them
  if (matched.length >= limit) {
    return matched;
  }

  // Fill remaining slots with recent published posts
  const remaining = limit - matched.length;
  const alreadyFoundSlugs = [
    ...excludeSlugs,
    ...matched.map((p) => p.slug),
  ];

  const filler = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      slug: { notIn: alreadyFoundSlugs },
    },
    select: selectFields,
    orderBy: { publishedAt: "desc" },
    take: remaining,
  });

  return [...matched, ...filler];
});
