import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { formatDate, normalizeImageUrl, getCategoryFallbackImage } from "@/lib/utils";

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  author?: string | null;
  publishedAt?: Date | string | null;
  categories?: { name: string; slug: string }[];
}

export function BlogCard({
  slug,
  title,
  excerpt,
  featuredImage,
  author,
  publishedAt,
  categories,
}: BlogCardProps) {
  return (
    <article className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <Link href={`/${slug}/`} className="block">
        <div className="relative aspect-[16/9] bg-border">
          <Image
            src={normalizeImageUrl(featuredImage) || getCategoryFallbackImage(categories)}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className="text-xs text-[var(--primary)] hover:text-[var(--primary-dark)] uppercase tracking-wide"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/${slug}/`}>
          <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--primary-dark)] transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-3">{excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--muted)] text-sm text-[var(--text-light)]">
          {author && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {author}
            </span>
          )}
          {publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(publishedAt)}
            </span>
          )}
        </div>

        {/* Read More */}
        <Link
          href={`/${slug}/`}
          className="inline-flex items-center gap-1 mt-3 text-[var(--primary)] font-medium hover:text-[var(--primary-dark)]"
        >
          Read More
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  );
}
