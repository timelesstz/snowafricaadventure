import prisma from "@/lib/prisma";
import { normalizeImageUrl } from "@/lib/utils";

/**
 * Shared data access for the blog archive, used by /blog/ and /blog/page/N/.
 *
 * The archive previously fetched a flat `take: 20` with no pagination, so only
 * the 20 newest of 291 published posts were reachable by a crawler. The rest
 * showed up in Search Console as "Discovered - currently not indexed".
 */

export const POSTS_PER_PAGE = 20;

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  featuredImage: string | null;
  categories: { name: string; slug: string }[];
};

export async function getPublishedPostCount(): Promise<number> {
  try {
    return await prisma.blogPost.count({ where: { isPublished: true } });
  } catch (error) {
    console.error("[Blog] Failed to count posts:", error);
    return 0;
  }
}

export async function getTotalBlogPages(): Promise<number> {
  const count = await getPublishedPostCount();
  return Math.max(1, Math.ceil(count / POSTS_PER_PAGE));
}

/** `page` is 1-based. */
export async function getPostsPage(page: number): Promise<BlogListItem[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      skip: (Math.max(1, page) - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
      include: {
        categories: { include: { category: true } },
      },
    });

    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      author: post.author || "Snow Africa Team",
      publishedAt: post.publishedAt?.toISOString().split("T")[0] || "",
      featuredImage: normalizeImageUrl(post.featuredImage),
      categories: post.categories.map((c) => ({
        name: c.category.name,
        slug: c.category.slug,
      })),
    }));
  } catch (error) {
    console.error("[Blog] Failed to fetch posts:", error);
    return [];
  }
}

export async function getBlogCategories(): Promise<
  { name: string; slug: string; count: number }[]
> {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: "asc" },
    });

    return categories
      .map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        count: cat._count.posts,
      }))
      .filter((cat) => cat.count > 0);
  } catch (error) {
    console.error("[Blog] Failed to fetch categories:", error);
    return [];
  }
}
