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
