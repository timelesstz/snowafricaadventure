import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getConfigRedirectPaths, normalizePath } from "@/lib/redirect-paths";

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
  "mountain-trekking",
  "climbing-kilimanjaro",
  "best-time-to-climb-kilimanjaro",
  "kilimanjaro-prices",
  "kilimanjaro-climbing-gear",
  "kilimanjaro-climbing-companies",
  "mount-kilimanjaro-height",
  "mount-kenya",
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

    const [routes, safaris, destinations, posts, dayTrips] =
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
      ]);

    // URLs that 301 elsewhere (merged duplicates) must not be listed either.
    const redirects = await prisma.redirect
      .findMany({ where: { isActive: true }, select: { sourceUrl: true } })
      .catch(() => []);

    return {
      routes,
      safaris,
      destinations,
      posts,
      dayTrips,
      redirectedPaths: new Set(redirects.map((r) => normalizePath(r.sourceUrl))),
    };
  } catch (err) {
    console.error("[sitemap] Database fetch failed:", err);
    return {
      routes: [],
      safaris: [],
      destinations: [],
      posts: [],
      dayTrips: [],
      redirectedPaths: new Set<string>(),
    };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const { routes, safaris, destinations, posts, dayTrips, redirectedPaths: dbRedirects } =
    await getContentFromDb();
  // A URL that redirects (database rule or next.config.ts) must not be listed.
  const redirectedPaths = new Set([...dbRedirects, ...(await getConfigRedirectPaths())]);

  // Static pages carry no lastmod: there is no stored edit date for them, and a
  // request-time or hand-typed date is a false signal Google learns to ignore.
  // Hub pages get the newest updatedAt of the records they list (set below).
  // Tag and category archives are left out: they are thin and noindex.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`, // trailing slash, matching the canonical
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/trekking/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tanzania-safaris/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kilimanjaro-join-group-departures/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tanzania-destinations/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zanzibar/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tailor-made-safari/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us/`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us/`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tanzania-day-tours/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-tanzania-tour-operator/`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-kilimanjaro-tour-operators/`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-route-to-climb-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-guides/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mountain-trekking/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/climbing-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-time-to-climb-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kilimanjaro-prices/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-climbing-gear/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-climbing-companies/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mount-kilimanjaro-height/`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-hard-is-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/can-beginners-climb-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-altitude-sickness/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-training-plan/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-safety/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-deaths/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-weather/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-food-meals/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-tipping-guide/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-climate-zones/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-glaciers/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-records/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-travel-insurance/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-visa-tanzania/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-airport-guide/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-day-hike/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-women-climbing/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-solo-climb/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-age-limits/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-hygiene/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-honeymoon/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-paragliding/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kilimanjaro-map/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-statistics/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kilimanjaro-success-rates/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mount-kilimanjaro/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mount-kenya/`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/climb-kilimanjaro-from-usa/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/african-safaris/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/luxury-safaris-tanzania/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-camping-safaris/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-lodge-safaris/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-safari-from-uk/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wildlife-safaris-tanzania/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tanzania-itinerary-10-days/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tanzania-beach-holidays/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // A hub's real last change is the newest edit among the records it lists.
  const newest = (rows: { updatedAt: Date }[]) =>
    rows.length > 0
      ? new Date(Math.max(...rows.map((r) => r.updatedAt.getTime())))
      : undefined;
  const hubLastModified: Record<string, Date | undefined> = {
    [`${baseUrl}/trekking/`]: newest(routes),
    [`${baseUrl}/tanzania-safaris/`]: newest(safaris),
    [`${baseUrl}/tanzania-destinations/`]: newest(destinations),
    [`${baseUrl}/blog/`]: newest(posts),
    [`${baseUrl}/tanzania-day-tours/`]: newest(dayTrips),
  };
  for (const page of staticPages) {
    const lastModified = hubLastModified[page.url];
    if (lastModified) page.lastModified = lastModified;
  }

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

  return [
    ...staticPages,
    ...routeUrls,
    ...safariUrls,
    ...destUrls,
    ...postUrls,
    ...dayTripUrls,
  ].filter((entry) => !redirectedPaths.has(normalizePath(new URL(entry.url).pathname)));
}
