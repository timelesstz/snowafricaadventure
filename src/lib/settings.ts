import prisma from "@/lib/prisma";

/**
 * Fetch the "Years Experience" value from admin settings.
 * Configured at /admin/homepage → Statistics → Experience Value.
 * Falls back to "15+" if not set.
 */
const TRIPADVISOR_DEFAULTS = {
  rating: 4.9,
  reviews: 115,
  url: "https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html",
};

/**
 * TripAdvisor rating, review count and listing URL from admin settings
 * (/admin/homepage), with the same fallbacks the homepage uses.
 */
export async function getTripAdvisorStats(): Promise<typeof TRIPADVISOR_DEFAULTS> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["homepage.tripadvisor.rating", "homepage.tripadvisor.reviews", "homepage.tripadvisor.url"] } },
    });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      rating: parseFloat(map["homepage.tripadvisor.rating"]) || TRIPADVISOR_DEFAULTS.rating,
      reviews: parseInt(map["homepage.tripadvisor.reviews"], 10) || TRIPADVISOR_DEFAULTS.reviews,
      url: map["homepage.tripadvisor.url"] || TRIPADVISOR_DEFAULTS.url,
    };
  } catch (error) {
    console.error("[Settings] Failed to fetch TripAdvisor stats:", error);
    return TRIPADVISOR_DEFAULTS;
  }
}

const SITE_STAT_DEFAULTS = {
  experience: "15+",
  travelers: "5,000+",
  success: "93%",
};

/**
 * Headline stats from admin settings (/admin/homepage → Statistics), with the
 * homepage's fallbacks, so every page shows the same numbers.
 */
export async function getSiteStats(): Promise<typeof SITE_STAT_DEFAULTS> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: ["homepage.stats.experience", "homepage.stats.travelers", "homepage.stats.success"] } },
    });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      experience: map["homepage.stats.experience"] || SITE_STAT_DEFAULTS.experience,
      travelers: map["homepage.stats.travelers"] || SITE_STAT_DEFAULTS.travelers,
      success: map["homepage.stats.success"] || SITE_STAT_DEFAULTS.success,
    };
  } catch (error) {
    console.error("[Settings] Failed to fetch site stats:", error);
    return SITE_STAT_DEFAULTS;
  }
}

export async function getExperienceYears(): Promise<string> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "homepage.stats.experience" },
    });
    return setting?.value || "15+";
  } catch (error) {
    console.error("[Settings] Failed to fetch experience years:", error);
    return "15+";
  }
}
