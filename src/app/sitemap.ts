import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

// Slugs that are static routes — blog posts with these slugs would shadow them
const RESERVED_SLUGS = new Set([
  "about-us",
  "contact-us",
  "blog",
  "trekking",
  "tanzania-safaris",
  "tanzania-destinations",
  "tanzania-day-tours",
  "zanzibar",
  "faq",
  "search",
  "kilimanjaro-join-group-departures",
  "tailor-made-safari",
  "best-route-to-climb-kilimanjaro",
  "best-tanzania-tour-operator",
  "best-kilimanjaro-tour-operators",
  "our-guides",
  "climbing-kilimanjaro",
  "best-time-to-climb-kilimanjaro",
  "kilimanjaro-prices",
  "kilimanjaro-climbing-gear",
  "kilimanjaro-climbing-companies",
  "mount-kilimanjaro-height",
  "how-hard-is-kilimanjaro",
  "can-beginners-climb-kilimanjaro",
  "kilimanjaro-altitude-sickness",
  "kilimanjaro-training-plan",
  "kilimanjaro-safety",
  "kilimanjaro-deaths",
  "kilimanjaro-weather",
  "kilimanjaro-food-meals",
  "kilimanjaro-tipping-guide",
  "kilimanjaro-climate-zones",
  "kilimanjaro-glaciers",
  "kilimanjaro-records",
  "kilimanjaro-travel-insurance",
  "kilimanjaro-visa-tanzania",
  "kilimanjaro-airport-guide",
  "kilimanjaro-day-hike",
  "kilimanjaro-women-climbing",
  "kilimanjaro-solo-climb",
  "kilimanjaro-age-limits",
  "kilimanjaro-hygiene",
  "kilimanjaro-honeymoon",
  "kilimanjaro-paragliding",
  "kilimanjaro-map",
  "kilimanjaro-statistics",
  "kilimanjaro-success-rates",
  "mount-kilimanjaro",
  "climb-kilimanjaro-from-usa",
  "african-safaris",
  "luxury-safaris-tanzania",
  "tanzania-camping-safaris",
  "tanzania-lodge-safaris",
  "tanzania-safari-from-uk",
  "wildlife-safaris-tanzania",
  "tanzania-beach-holidays",
  "tanzania-itinerary-10-days",
  "meet-florent",
  "terms-conditions",
  "terms-and-conditions",
  "privacy-policy",
  "thank-you",
  "admin",
  "api",
  "sitemap",
  "robots",
  "p",
]);

async function getContentFromDb() {
  try {
    const { prisma } = await import("@/lib/prisma");

    const [routes, safaris, destinations, posts, dayTrips, categories, tags] =
      await Promise.all([
        prisma.trekkingRoute.findMany({
          where: { isActive: true },
          select: { slug: true, updatedAt: true },
        }),
        prisma.safariPackage.findMany({
          where: { isActive: true },
          select: { slug: true, updatedAt: true },
        }),
        prisma.destination.findMany({
          where: { isActive: true },
          select: { slug: true, updatedAt: true },
        }),
        prisma.blogPost.findMany({
          where: { isPublished: true },
          select: { slug: true, updatedAt: true },
        }),
        prisma.dayTrip.findMany({
          where: { isActive: true },
          select: { slug: true, updatedAt: true },
        }),
        // Only categories that have at least one published post
        prisma.category.findMany({
          where: {
            posts: {
              some: {
                post: { isPublished: true },
              },
            },
          },
          select: { slug: true, updatedAt: true },
        }),
        // Only tags that have at least one published post
        prisma.tag.findMany({
          where: {
            posts: {
              some: {
                post: { isPublished: true },
              },
            },
          },
          select: { slug: true, updatedAt: true },
        }),
      ]);

    return { routes, safaris, destinations, posts, dayTrips, categories, tags };
  } catch (err) {
    console.error("[sitemap] Database fetch failed:", err);
    return {
      routes: [],
      safaris: [],
      destinations: [],
      posts: [],
      dayTrips: [],
      categories: [],
      tags: [],
    };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const { routes, safaris, destinations, posts, dayTrips, categories, tags } =
    await getContentFromDb();

  // Static pages with accurate lastModified dates.
  // Listing pages (blog/, trekking/, etc.) use new Date() because they reflect
  // the latest DB content on every render. Content-stable pages use fixed dates.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/trekking/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tanzania-safaris/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kilimanjaro-join-group-departures/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tanzania-destinations/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zanzibar/`,
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tailor-made-safari/`,
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us/`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us/`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search/`,
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tanzania-day-tours/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-tanzania-tour-operator/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-kilimanjaro-tour-operators/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-route-to-climb-kilimanjaro/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-guides/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/climbing-kilimanjaro/`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-time-to-climb-kilimanjaro/`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kilimanjaro-prices/`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-climbing-gear/`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-climbing-companies/`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mount-kilimanjaro-height/`,
      lastModified: new Date("2025-10-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-hard-is-kilimanjaro/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/can-beginners-climb-kilimanjaro/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-altitude-sickness/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-training-plan/`,
      lastModified: new Date("2026-03-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-safety/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-deaths/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-weather/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-food-meals/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-tipping-guide/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-climate-zones/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-glaciers/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-records/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-travel-insurance/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-visa-tanzania/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-airport-guide/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-day-hike/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-women-climbing/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-solo-climb/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-age-limits/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-hygiene/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-honeymoon/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-paragliding/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-map/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-statistics/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-success-rates/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mount-kilimanjaro/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/climb-kilimanjaro-from-usa/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/african-safaris/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/luxury-safaris-tanzania/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-camping-safaris/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-lodge-safaris/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-safari-from-uk/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wildlife-safaris-tanzania/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-itinerary-10-days/`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tanzania-beach-holidays/`,
      lastModified: new Date("2026-06-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions/`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const routeUrls: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}/trekking/${route.slug}/`,
    lastModified: route.updatedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const safariUrls: MetadataRoute.Sitemap = safaris.map((safari) => ({
    url: `${baseUrl}/tanzania-safaris/${safari.slug}/`,
    lastModified: safari.updatedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const destUrls: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${baseUrl}/tanzania-destinations/${dest.slug}/`,
    lastModified: dest.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Filter out any blog post whose slug collides with a static route
  const postUrls: MetadataRoute.Sitemap = posts
    .filter((post) => !RESERVED_SLUGS.has(post.slug))
    .map((post) => ({
      url: `${baseUrl}/${post.slug}/`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const dayTripUrls: MetadataRoute.Sitemap = dayTrips.map((trip) => ({
    url: `${baseUrl}/tanzania-day-tours/${trip.slug}/`,
    lastModified: trip.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: cat.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}/`,
    lastModified: tag.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...routeUrls,
    ...safariUrls,
    ...destUrls,
    ...postUrls,
    ...dayTripUrls,
    ...categoryUrls,
    ...tagUrls,
  ];
}
