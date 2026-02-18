import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface DestinationCardProps {
  slug: string;
  name: string;
  circuit: string;
  featuredImage?: string;
  description?: string;
  wildlife?: string[];
}

export function DestinationCard({
  slug,
  name,
  circuit,
  featuredImage,
  description,
  wildlife,
}: DestinationCardProps) {
  return (
    <Link
      href={`/tanzania-destinations/${slug}/`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-border">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700">
            <MapPin className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="default" size="sm">
            {circuit} Circuit
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[var(--text)] group-hover:text-[var(--primary-dark)] transition-colors">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-2">{description}</p>
        )}

        {/* Wildlife highlights */}
        {wildlife && wildlife.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {wildlife.slice(0, 4).map((animal) => (
              <span
                key={animal}
                className="text-xs bg-[var(--muted)] text-[var(--text-muted)] px-2 py-0.5 rounded"
              >
                {animal}
              </span>
            ))}
            {wildlife.length > 4 && (
              <span className="text-xs text-[var(--text-light)]">
                +{wildlife.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-[var(--muted)]">
          <span className="text-[var(--primary)] font-medium group-hover:text-[var(--primary-dark)] flex items-center gap-1">
            Explore
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
