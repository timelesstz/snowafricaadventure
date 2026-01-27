import Image from "next/image";
import Link from "next/link";
import { Clock, Compass } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

interface SafariCardProps {
  slug: string;
  title: string;
  duration: string;
  type: string;
  featuredImage?: string;
  overview?: string;
  priceFrom?: number | string;
}

export function SafariCard({
  slug,
  title,
  duration,
  type,
  featuredImage,
  overview,
  priceFrom,
}: SafariCardProps) {
  const typeVariant =
    type === "Luxury" ? "warning" : type === "Budget" ? "info" : "success";

  return (
    <Link
      href={`/tanzania-safaris/${slug}/`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[var(--border)]">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)]">
            <Compass className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={typeVariant} size="sm">
            {type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--primary-dark)] transition-colors line-clamp-2">
          {title}
        </h3>

        {overview && (
          <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-2">{overview}</p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1 text-sm text-[var(--text-light)]">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
          {priceFrom && (
            <span className="font-bold text-[var(--primary)]">
              From {formatPrice(priceFrom)}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-[var(--muted)]">
          <span className="text-[var(--primary)] font-medium group-hover:text-[var(--primary-dark)] flex items-center gap-1">
            View Safari
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
