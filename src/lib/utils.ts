import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const R2_BASE = "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize image URLs to use R2 CDN directly.
 * Rewrites WordPress-era URLs (snowafricaadventure.com/wp-content/uploads/...)
 * and relative paths (/wp-content/uploads/...) to the R2 public bucket URL.
 * Returns null for empty/invalid URLs.
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) return null;

  let normalized = url.trim();

  // Relative /wp-content/uploads/ paths → R2
  if (normalized.startsWith("/wp-content/uploads/")) {
    return `${R2_BASE}${normalized}`;
  }

  // Rewrite snowafricaadventure.com (with or without www) wp-content paths → R2
  normalized = normalized.replace(
    /^https?:\/\/(?:www\.)?snowafricaadventure\.com\/wp-content\/uploads\//,
    `${R2_BASE}/wp-content/uploads/`
  );

  return normalized;
}

/**
 * Format a date for display
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", options);
}

/**
 * Format price with currency
 */
export function formatPrice(
  price: number | string,
  currency: string = "USD"
): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Calculate available spots for a departure
 */
export function calculateAvailability(
  maxParticipants: number,
  bookedSpots: number
): {
  available: number;
  percentage: number;
  status: "open" | "limited" | "full";
} {
  const available = Math.max(0, maxParticipants - bookedSpots);
  const percentage = (bookedSpots / maxParticipants) * 100;

  let status: "open" | "limited" | "full" = "open";
  if (available === 0) status = "full";
  else if (available <= 3) status = "limited";

  return { available, percentage, status };
}

/**
 * Get full moon dates for a year range
 * Pre-calculated for performance
 */
export function getFullMoonDates(startYear: number, endYear: number): Date[] {
  // Full moon dates for 2025-2027 (pre-calculated)
  const fullMoons: Record<number, string[]> = {
    2025: [
      "2025-01-13",
      "2025-02-12",
      "2025-03-14",
      "2025-04-13",
      "2025-05-12",
      "2025-06-11",
      "2025-07-10",
      "2025-08-09",
      "2025-09-07",
      "2025-10-07",
      "2025-11-05",
      "2025-12-04",
    ],
    2026: [
      "2026-01-03",
      "2026-02-01",
      "2026-03-03",
      "2026-04-01",
      "2026-05-01",
      "2026-05-31",
      "2026-06-29",
      "2026-07-29",
      "2026-08-28",
      "2026-09-26",
      "2026-10-26",
      "2026-11-24",
      "2026-12-24",
    ],
    2027: [
      "2027-01-22",
      "2027-02-20",
      "2027-03-22",
      "2027-04-20",
      "2027-05-20",
      "2027-06-18",
      "2027-07-18",
      "2027-08-17",
      "2027-09-15",
      "2027-10-15",
      "2027-11-13",
      "2027-12-13",
    ],
  };

  const dates: Date[] = [];
  for (let year = startYear; year <= endYear; year++) {
    if (fullMoons[year]) {
      dates.push(...fullMoons[year].map((d) => new Date(d)));
    }
  }

  return dates;
}

/**
 * Get a category-based fallback image when no featured image is set.
 * Uses existing R2 CDN assets that match the content topic.
 */
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "kilimanjaro-climbing-guide": `${R2_BASE}/wp-content/uploads/2023/03/49c04fa0-2704-4624-aaf4-59db6de1f1f5.jpg`,
  "mount-kilimanjaro": `${R2_BASE}/wp-content/uploads/2025/09/kilimanjaro-342702_1280.jpg`,
  "safari-tours": `${R2_BASE}/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg`,
  "tanzania-destinations": `${R2_BASE}/wp-content/uploads/2023/03/Serengeri-National-Park.jpg`,
  "day-trip": `${R2_BASE}/wp-content/uploads/2023/03/Day-trips.jpg`,
  "blog": `${R2_BASE}/wp-content/uploads/2025/09/safari-3242983_1280.jpg`,
};

const DEFAULT_BLOG_IMAGE = `${R2_BASE}/wp-content/uploads/2025/09/kilimanjaro-342702_1280.jpg`;

export function getCategoryFallbackImage(categories?: { slug: string }[]): string {
  if (categories && categories.length > 0) {
    for (const cat of categories) {
      if (CATEGORY_FALLBACK_IMAGES[cat.slug]) {
        return CATEGORY_FALLBACK_IMAGES[cat.slug];
      }
    }
  }
  return DEFAULT_BLOG_IMAGE;
}

/**
 * Check if a date is near a full moon (within N days)
 */
export function isNearFullMoon(date: Date, withinDays: number = 2): boolean {
  const fullMoons = getFullMoonDates(date.getFullYear(), date.getFullYear());
  const msPerDay = 24 * 60 * 60 * 1000;

  return fullMoons.some((fm) => {
    const diff = Math.abs(date.getTime() - fm.getTime());
    return diff <= withinDays * msPerDay;
  });
}
