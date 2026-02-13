import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Camera, Star, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface SafariCardEnhancedProps {
  slug: string;
  title: string;
  duration: string;
  type: string;
  featuredImage?: string | null;
  overview?: string | null;
  priceFrom?: number | string | null;
  gameDrives?: number | null;
  parksCount?: number | null;
  rating?: number | string | null;
  highlights?: string[];
  destinations?: string[];
  variant?: "default" | "featured" | "compact" | "horizontal";
  className?: string;
}

export function SafariCardEnhanced({
  slug,
  title,
  duration,
  type,
  featuredImage,
  overview,
  priceFrom,
  gameDrives,
  parksCount,
  rating,
  highlights,
  destinations,
  variant = "default",
  className,
}: SafariCardEnhancedProps) {
  const typeStyles: Record<string, { bg: string; text: string; border: string }> = {
    Luxury: { bg: "bg-amber-500", text: "text-white", border: "border-amber-500" },
    "Mid-Range": { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-500" },
    Budget: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
  };

  const typeStyle = typeStyles[type] || typeStyles["Mid-Range"];
  const ratingNum = typeof rating === "string" ? parseFloat(rating) : rating;

  if (variant === "featured") {
    return (
      <Link
        href={`/tanzania-safaris/${slug}/`}
        className={cn(
          "group relative block rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)] flex items-center justify-center">
              <Camera className="w-20 h-20 text-white/30" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className={cn("px-4 py-2 rounded-full text-sm font-bold shadow-lg", typeStyle.bg, typeStyle.text)}>
              {type}
            </span>
          </div>

          {/* Rating */}
          {ratingNum && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-sm">{ratingNum.toFixed(1)}</span>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--secondary)] transition-colors">
              {title}
            </h3>
            {overview && (
              <p className="text-white/80 text-sm line-clamp-2 mb-4">{overview}</p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
              {parksCount && parksCount > 0 && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {parksCount} Parks
                </span>
              )}
              {gameDrives && gameDrives > 0 && (
                <span className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  {gameDrives} Game Drives
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="p-5 flex items-center justify-between bg-gradient-to-r from-[var(--surface)] to-white">
          <div>
            {priceFrom && (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">From</span>
                <span className="text-2xl font-bold text-[var(--primary)]">{formatPrice(priceFrom)}</span>
                <span className="text-xs text-[var(--text-muted)]">/ person</span>
              </div>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-[var(--secondary)] font-semibold group-hover:gap-3 transition-all">
            Explore Safari
            <span className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white group-hover:bg-[var(--secondary-dark)] transition-colors">
              →
            </span>
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/tanzania-safaris/${slug}/`}
        className={cn(
          "group flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--border)]",
          className
        )}
      >
        {/* Image */}
        <div className="relative w-72 flex-shrink-0 overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="288px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)] flex items-center justify-center">
              <Camera className="w-12 h-12 text-white/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={cn("px-3 py-1 rounded-full text-xs font-bold", typeStyle.bg, typeStyle.text)}>
              {type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
              {title}
            </h3>
            {ratingNum && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-sm">{ratingNum.toFixed(1)}</span>
              </div>
            )}
          </div>

          {overview && (
            <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">{overview}</p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
            {parksCount && parksCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
                <MapPin className="w-3.5 h-3.5" />
                {parksCount} Parks
              </span>
            )}
            {gameDrives && gameDrives > 0 && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-2 py-1 rounded">
                <Camera className="w-3.5 h-3.5" />
                {gameDrives} Drives
              </span>
            )}
          </div>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {highlights.slice(0, 3).map((h, i) => (
                <span key={i} className="text-xs text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Price & CTA */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--border)]">
            {priceFrom ? (
              <div>
                <span className="text-xs text-[var(--text-muted)]">From</span>
                <span className="text-xl font-bold text-[var(--primary)] ml-1">{formatPrice(priceFrom)}</span>
              </div>
            ) : (
              <span className="text-sm text-[var(--text-muted)]">Contact for pricing</span>
            )}
            <span className="text-[var(--secondary)] font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/tanzania-safaris/${slug}/`}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-dark)] flex items-center justify-center">
            <Camera className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm",
            typeStyle.bg, typeStyle.text
          )}>
            {type}
          </span>
          {ratingNum && (
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-xs">{ratingNum.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Bottom Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3 text-white/90 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
            {parksCount && parksCount > 0 && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {parksCount} Parks
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {overview && (
          <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">{overview}</p>
        )}

        {/* Destinations */}
        {destinations && destinations.length > 0 && (
          <div className="flex items-center gap-1 mb-4 text-xs text-[var(--text-light)]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{destinations.slice(0, 3).join(" • ")}</span>
          </div>
        )}

        {/* Price & CTA */}
        <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between">
          {priceFrom ? (
            <div className="flex flex-col">
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">From</span>
              <span className="text-xl font-bold text-[var(--primary)]">{formatPrice(priceFrom)}</span>
            </div>
          ) : (
            <span className="text-sm text-[var(--text-muted)]">Get Quote</span>
          )}
          <span className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white group-hover:bg-[var(--secondary-dark)] group-hover:scale-110 transition-all shadow-lg">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
