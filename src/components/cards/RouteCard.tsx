import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Mountain } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface RouteCardProps {
  slug: string;
  title: string;
  duration: string;
  physicalRating?: string | null;
  maxPeople?: number | null;
  featuredImage?: string | null;
  overview?: string | null;
}

export function RouteCard({
  slug,
  title,
  duration,
  physicalRating,
  maxPeople,
  featuredImage,
  overview,
}: RouteCardProps) {
  return (
    <Link
      href={`/trekking/${slug}/`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-border">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
            <Mountain className="w-16 h-16 text-white/50" />
          </div>
        )}
        {physicalRating && (
          <div className="absolute top-3 right-3">
            <Badge
              variant={
                physicalRating === "Challenging" || physicalRating === "Difficult"
                  ? "warning"
                  : "success"
              }
              size="sm"
            >
              {physicalRating}
            </Badge>
          </div>
        )}
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
        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-light)]">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
          {maxPeople && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Max {maxPeople}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-[var(--muted)]">
          <span className="text-[var(--primary)] font-medium group-hover:text-[var(--primary-dark)] flex items-center gap-1">
            View Details
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
