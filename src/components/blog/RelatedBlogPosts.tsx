import { BlogCard } from "@/components/cards/BlogCard";
import { normalizeImageUrl } from "@/lib/utils";
import type { RelatedPost } from "@/lib/related-content";

interface RelatedBlogPostsProps {
  posts: RelatedPost[];
  heading?: string;
}

export function RelatedBlogPosts({
  posts,
  heading = "Related Articles",
}: RelatedBlogPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--surface)] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text)] mb-8 text-center">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              featuredImage={normalizeImageUrl(post.featuredImage)}
              author={post.author}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
