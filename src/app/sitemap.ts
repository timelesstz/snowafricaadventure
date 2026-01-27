import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

// Dynamic import to handle build-time when DB isn't available
async function getContentFromDb() {
  try {
    const { prisma } = await import("@/lib/prisma");

    const [routes, safaris, destinations, posts, dayTrips, categories] =
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
        prisma.category.findMany({
          select: { slug: true, updatedAt: true },
        }),
      ]);

    return { routes, safaris, destinations, posts, dayTrips, categories };
  } catch {
    // Return empty arrays if database is not available (build time)
    return {
      routes: [],
      safaris: [],
      destinations: [],
      posts: [],
      dayTrips: [],
      categories: [],
    };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Fetch all content from database
  const { routes, safaris, destinations, posts, dayTrips, categories } =
    await getContentFromDb();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
      url: `${baseUrl}/tanzania-destinations/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zanzibar/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kilimanjaro-join-group-departures/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tailor-made-safari/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/day-trips/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-conditions/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Trekking routes
  const routeUrls: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}/trekking/${route.slug}/`,
    lastModified: route.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Safari packages
  const safariUrls: MetadataRoute.Sitemap = safaris.map((safari) => ({
    url: `${baseUrl}/tanzania-safaris/${safari.slug}/`,
    lastModified: safari.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Destinations
  const destUrls: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${baseUrl}/tanzania-destinations/${dest.slug}/`,
    lastModified: dest.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog posts - IMPORTANT: These live at ROOT level!
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Day trips
  const dayTripUrls: MetadataRoute.Sitemap = dayTrips.map((trip) => ({
    url: `${baseUrl}/day-trips/${trip.slug}/`,
    lastModified: trip.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Categories
  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: cat.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...routeUrls,
    ...safariUrls,
    ...destUrls,
    ...postUrls,
    ...dayTripUrls,
    ...categoryUrls,
  ];
}
