import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
