/**
 * Production Seed Script
 * Migrates content from WordPress to match live site URLs
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";
import fs from "fs";
import path from "path";

// Load JSON data files
const dataDir = path.join(__dirname, "migrations/data");

function loadJson<T>(filename: string): T {
  const filepath = path.join(dataDir, filename);
  const content = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(content) as T;
}

interface CategoryData {
  slug: string;
  name: string;
  description: string;
}

interface RouteData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  duration: string;
  durationDays: number;
  maxPeople?: number;
  startPoint?: string;
  endPoint?: string;
  ageRange?: string;
  physicalRating?: string;
  successRate?: number;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  featuredImage?: string;
  isActive: boolean;
}

interface DestinationData {
  slug: string;
  name: string;
  metaTitle?: string;
  metaDescription?: string;
  circuit: string;
  description: string;
  highlights: string[];
  wildlife: string[];
  bestTime?: string;
  featuredImage?: string;
  isActive: boolean;
}

interface SafariData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  duration: string;
  durationDays: number;
  type: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  featuredImage?: string;
  priceFrom?: number;
  isActive: boolean;
}

interface DayTripData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  destination: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  featuredImage?: string;
  priceFrom?: number;
  isActive: boolean;
}

async function main() {
  console.log("🚀 Starting production seed...\n");

  // ============================================
  // CLEAR EXISTING DATA (in correct order)
  // ============================================
  console.log("🗑️  Clearing existing data...");

  await prisma.postTag.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.safariDestination.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.groupDeparture.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.trekkingRoute.deleteMany();
  await prisma.safariPackage.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.dayTrip.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  console.log("✅ Cleared existing data\n");

  // ============================================
  // SEED CATEGORIES
  // ============================================
  console.log("📁 Seeding categories...");
  const categoriesData = loadJson<CategoryData[]>("categories.json");

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      },
    });
    categories[cat.slug] = created.id;
  }
  console.log(`✅ Created ${categoriesData.length} categories\n`);

  // ============================================
  // SEED TREKKING ROUTES
  // ============================================
  console.log("🏔️  Seeding trekking routes...");
  const routesData = loadJson<RouteData[]>("trekking-routes.json");

  const routes: Record<string, string> = {};
  for (const route of routesData) {
    const created = await prisma.trekkingRoute.create({
      data: {
        slug: route.slug,
        title: route.title,
        metaTitle: route.metaTitle,
        metaDescription: route.metaDescription,
        duration: route.duration,
        durationDays: route.durationDays,
        maxPeople: route.maxPeople,
        startPoint: route.startPoint,
        endPoint: route.endPoint,
        ageRange: route.ageRange,
        physicalRating: route.physicalRating,
        successRate: route.successRate,
        overview: route.overview,
        highlights: route.highlights,
        inclusions: route.inclusions,
        exclusions: route.exclusions,
        featuredImage: route.featuredImage,
        isActive: route.isActive,
        categoryId: categories["mount-kilimanjaro"],
      },
    });
    routes[route.slug] = created.id;
  }
  console.log(`✅ Created ${routesData.length} trekking routes\n`);

  // ============================================
  // SEED DESTINATIONS
  // ============================================
  console.log("🗺️  Seeding destinations...");
  const destinationsData = loadJson<DestinationData[]>("destinations.json");

  const destinations: Record<string, string> = {};
  for (const dest of destinationsData) {
    const created = await prisma.destination.create({
      data: {
        slug: dest.slug,
        name: dest.name,
        metaTitle: dest.metaTitle,
        metaDescription: dest.metaDescription,
        circuit: dest.circuit,
        description: dest.description,
        highlights: dest.highlights,
        wildlife: dest.wildlife,
        bestTime: dest.bestTime,
        featuredImage: dest.featuredImage,
        isActive: dest.isActive,
      },
    });
    destinations[dest.slug] = created.id;
  }
  console.log(`✅ Created ${destinationsData.length} destinations\n`);

  // ============================================
  // SEED SAFARI PACKAGES
  // ============================================
  console.log("🦁 Seeding safari packages...");
  const safarisData = loadJson<SafariData[]>("safari-packages.json");

  for (const safari of safarisData) {
    await prisma.safariPackage.create({
      data: {
        slug: safari.slug,
        title: safari.title,
        metaTitle: safari.metaTitle,
        metaDescription: safari.metaDescription,
        duration: safari.duration,
        durationDays: safari.durationDays,
        type: safari.type,
        overview: safari.overview,
        highlights: safari.highlights,
        inclusions: safari.inclusions,
        exclusions: safari.exclusions,
        featuredImage: safari.featuredImage,
        priceFrom: safari.priceFrom,
        isActive: safari.isActive,
      },
    });
  }
  console.log(`✅ Created ${safarisData.length} safari packages\n`);

  // ============================================
  // SEED DAY TRIPS
  // ============================================
  console.log("🚗 Seeding day trips...");
  const dayTripsData = loadJson<DayTripData[]>("day-trips.json");

  for (const trip of dayTripsData) {
    await prisma.dayTrip.create({
      data: {
        slug: trip.slug,
        title: trip.title,
        metaTitle: trip.metaTitle,
        metaDescription: trip.metaDescription,
        destination: trip.destination,
        description: trip.description,
        highlights: trip.highlights,
        inclusions: trip.inclusions,
        exclusions: trip.exclusions,
        featuredImage: trip.featuredImage,
        priceFrom: trip.priceFrom,
        isActive: trip.isActive,
      },
    });
  }
  console.log(`✅ Created ${dayTripsData.length} day trips\n`);

  // ============================================
  // SEED BLOG POSTS (Essential ones first)
  // ============================================
  console.log("📝 Seeding blog posts...");

  // Core blog posts that match live site URLs
  const blogPosts = [
    // Top Kilimanjaro posts
    {
      slug: "climbing-kilimanjaro",
      title: "Climbing Kilimanjaro: Complete Guide",
      excerpt: "Everything you need to know about climbing Mount Kilimanjaro, from routes to preparation.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "how-tall-is-mount-kilimanjaro",
      title: "How Tall is Mount Kilimanjaro?",
      excerpt: "Learn about Africa's highest peak at 5,895 meters above sea level.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "best-time-to-climb-mount-kilimanjaro",
      title: "Best Time to Climb Mount Kilimanjaro",
      excerpt: "Discover the optimal months for climbing Kilimanjaro based on weather and conditions.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "kilimanjaro-climbing-routes",
      title: "Kilimanjaro Climbing Routes Compared",
      excerpt: "Compare all Kilimanjaro routes: Machame, Lemosho, Marangu, Rongai, and more.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "the-ultimate-kilimanjaro-packing-list",
      title: "The Ultimate Kilimanjaro Packing List",
      excerpt: "Complete gear list for climbing Kilimanjaro. What to bring and what to leave.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "kilimanjaro-vs-everest",
      title: "Kilimanjaro vs Everest: Comparison",
      excerpt: "How does climbing Kilimanjaro compare to climbing Everest?",
      categorySlug: "mount-kilimanjaro",
    },
    // Safari posts
    {
      slug: "serengeti-national-park",
      title: "Serengeti National Park Guide",
      excerpt: "Complete guide to Tanzania's most famous national park.",
      categorySlug: "safari-tours",
    },
    {
      slug: "great-wildebeest-migration",
      title: "Great Wildebeest Migration Guide",
      excerpt: "When and where to see the Great Migration in Tanzania.",
      categorySlug: "safari-tours",
    },
    {
      slug: "wildlife-safaris-tanzania",
      title: "Wildlife Safaris in Tanzania",
      excerpt: "Guide to the best wildlife safari experiences in Tanzania.",
      categorySlug: "safari-tours",
    },
    {
      slug: "ngorongoro-crater-safari",
      title: "Ngorongoro Crater Safari Guide",
      excerpt: "Everything you need to know about visiting Ngorongoro Crater.",
      categorySlug: "safari-tours",
    },
    {
      slug: "tanzania-luxury-safaris",
      title: "Tanzania Luxury Safaris",
      excerpt: "Experience Tanzania in ultimate luxury with our premium safari packages.",
      categorySlug: "safari-tours",
    },
    {
      slug: "best-time-to-go-on-safari-in-africa",
      title: "Best Time to Go on Safari in Africa",
      excerpt: "When is the best time to visit Africa for a safari adventure?",
      categorySlug: "safari-tours",
    },
    {
      slug: "best-time-to-visit-tanzania-for-safari",
      title: "Best Time to Visit Tanzania for Safari",
      excerpt: "Seasonal guide for planning your Tanzania safari.",
      categorySlug: "safari-tours",
    },
    // Tanzania travel posts
    {
      slug: "tanzania-festival",
      title: "Tanzania Festivals and Cultural Events",
      excerpt: "Discover Tanzania's vibrant festivals and cultural celebrations.",
      categorySlug: "blog",
    },
    {
      slug: "zanzibar-beach-escapes",
      title: "Zanzibar Beach Escapes",
      excerpt: "Discover the pristine beaches and tropical paradise of Zanzibar.",
      categorySlug: "blog",
    },
    {
      slug: "maasai-tribes-of-tanzania",
      title: "Maasai Tribes of Tanzania",
      excerpt: "Learn about the Maasai people, their culture and traditions.",
      categorySlug: "blog",
    },
    {
      slug: "climbing-mount-meru",
      title: "Climbing Mount Meru Guide",
      excerpt: "Guide to climbing Tanzania's second highest peak.",
      categorySlug: "mount-kilimanjaro",
    },
    // Additional popular posts
    {
      slug: "kilimanjaro-group-climbs",
      title: "Kilimanjaro Group Climbs",
      excerpt: "Join a group departure to climb Kilimanjaro with other adventurers.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "kilimanjaro-climbing-tips",
      title: "Kilimanjaro Climbing Tips",
      excerpt: "Expert tips for a successful Kilimanjaro summit.",
      categorySlug: "kilimanjaro-climbing-guide",
    },
    {
      slug: "tanzania-national-parks-guide",
      title: "Tanzania National Parks Guide",
      excerpt: "Complete guide to all of Tanzania's national parks.",
      categorySlug: "tanzania-destinations",
    },
    {
      slug: "responsible-tourism-in-tanzania",
      title: "Responsible Tourism in Tanzania",
      excerpt: "How to travel responsibly and sustainably in Tanzania.",
      categorySlug: "blog",
    },
    {
      slug: "first-person-to-climb-kilimanjaro",
      title: "First Person to Climb Kilimanjaro",
      excerpt: "The history of the first Kilimanjaro summit and Hans Meyer.",
      categorySlug: "mount-kilimanjaro",
    },
    {
      slug: "your-tipping-guide-for-tanzania",
      title: "Your Tipping Guide for Tanzania",
      excerpt: "Complete guide to tipping etiquette in Tanzania for safaris and treks.",
      categorySlug: "blog",
    },
    {
      slug: "can-you-climb-kilimanjaro-with-asthma",
      title: "Can You Climb Kilimanjaro with Asthma?",
      excerpt: "Medical advice for climbing Kilimanjaro with respiratory conditions.",
      categorySlug: "kilimanjaro-climbing-guide",
    },
    {
      slug: "how-difficult-is-the-umbwe-route-to-climb-kilimanjaro",
      title: "How Difficult is the Umbwe Route?",
      excerpt: "Detailed guide to Kilimanjaro's most challenging route.",
      categorySlug: "kilimanjaro-climbing-guide",
    },
    {
      slug: "kilimanjaro-lemosho-route-8-days-guide",
      title: "Kilimanjaro Lemosho Route 8 Days Guide",
      excerpt: "Day-by-day guide to the 8-day Lemosho Route.",
      categorySlug: "kilimanjaro-climbing-guide",
    },
    {
      slug: "climbing-mount-kilimanjaro-guide",
      title: "Climbing Mount Kilimanjaro Guide",
      excerpt: "Comprehensive guide to climbing Africa's highest peak.",
      categorySlug: "kilimanjaro-climbing-guide",
    },
  ];

  let postCount = 0;
  for (const post of blogPosts) {
    const created = await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: `# ${post.title}\n\n${post.excerpt}\n\n[Content to be migrated from WordPress]`,
        isPublished: true,
        publishedAt: new Date(),
        author: "Snow Africa Team",
      },
    });

    // Link to category
    if (post.categorySlug && categories[post.categorySlug]) {
      await prisma.postCategory.create({
        data: {
          postId: created.id,
          categoryId: categories[post.categorySlug],
        },
      });
    }
    postCount++;
  }
  console.log(`✅ Created ${postCount} blog posts\n`);

  // ============================================
  // SEED GROUP DEPARTURES (Sample 2025-2026)
  // ============================================
  console.log("📅 Seeding group departures...");

  const machameRouteId = routes["7-days-machame-route"];
  const lemoshoRouteId = routes["8-days-lemosho-route"];

  const departures = [
    // February 2025
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2025-02-14"),
      startDate: new Date("2025-02-15"),
      summitDate: new Date("2025-02-20"),
      endDate: new Date("2025-02-22"),
      price: 2150,
      isFullMoon: true,
      isFeatured: true,
      status: "OPEN" as const,
      year: 2025,
      month: 2,
      publicNotes: "Full Moon Summit - Limited spots!",
    },
    // March 2025
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2025-03-08"),
      startDate: new Date("2025-03-09"),
      summitDate: new Date("2025-03-14"),
      endDate: new Date("2025-03-16"),
      price: 2150,
      isGuaranteed: true,
      status: "GUARANTEED" as const,
      year: 2025,
      month: 3,
      publicNotes: "Guaranteed departure - will run!",
    },
    // June 2025 - Lemosho
    {
      routeId: lemoshoRouteId,
      arrivalDate: new Date("2025-06-14"),
      startDate: new Date("2025-06-15"),
      summitDate: new Date("2025-06-21"),
      endDate: new Date("2025-06-23"),
      price: 2450,
      isFullMoon: true,
      status: "OPEN" as const,
      year: 2025,
      month: 6,
    },
    // July 2025
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2025-07-12"),
      startDate: new Date("2025-07-13"),
      summitDate: new Date("2025-07-18"),
      endDate: new Date("2025-07-20"),
      price: 2150,
      status: "OPEN" as const,
      year: 2025,
      month: 7,
    },
    // August 2025
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2025-08-09"),
      startDate: new Date("2025-08-10"),
      summitDate: new Date("2025-08-15"),
      endDate: new Date("2025-08-17"),
      price: 2150,
      status: "OPEN" as const,
      year: 2025,
      month: 8,
    },
    // September 2025 - Lemosho
    {
      routeId: lemoshoRouteId,
      arrivalDate: new Date("2025-09-13"),
      startDate: new Date("2025-09-14"),
      summitDate: new Date("2025-09-20"),
      endDate: new Date("2025-09-22"),
      price: 2450,
      isFullMoon: true,
      isFeatured: true,
      status: "OPEN" as const,
      year: 2025,
      month: 9,
    },
    // October 2025
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2025-10-11"),
      startDate: new Date("2025-10-12"),
      summitDate: new Date("2025-10-17"),
      endDate: new Date("2025-10-19"),
      price: 2150,
      status: "OPEN" as const,
      year: 2025,
      month: 10,
    },
    // January 2026
    {
      routeId: machameRouteId,
      arrivalDate: new Date("2026-01-10"),
      startDate: new Date("2026-01-11"),
      summitDate: new Date("2026-01-16"),
      endDate: new Date("2026-01-18"),
      price: 2200,
      status: "OPEN" as const,
      year: 2026,
      month: 1,
    },
    // February 2026 - Full Moon
    {
      routeId: lemoshoRouteId,
      arrivalDate: new Date("2026-02-14"),
      startDate: new Date("2026-02-15"),
      summitDate: new Date("2026-02-21"),
      endDate: new Date("2026-02-23"),
      price: 2500,
      isFullMoon: true,
      isFeatured: true,
      status: "OPEN" as const,
      year: 2026,
      month: 2,
      publicNotes: "Valentine's Full Moon Summit!",
    },
  ];

  for (const dep of departures) {
    await prisma.groupDeparture.create({
      data: {
        routeId: dep.routeId,
        arrivalDate: dep.arrivalDate,
        startDate: dep.startDate,
        summitDate: dep.summitDate,
        endDate: dep.endDate,
        price: dep.price,
        currency: "USD",
        minParticipants: 2,
        maxParticipants: 10,
        isFullMoon: dep.isFullMoon || false,
        isGuaranteed: dep.isGuaranteed || false,
        isFeatured: dep.isFeatured || false,
        status: dep.status,
        year: dep.year,
        month: dep.month,
        publicNotes: dep.publicNotes,
      },
    });
  }
  console.log(`✅ Created ${departures.length} group departures\n`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log("═".repeat(50));
  console.log("🎉 Production seed completed successfully!\n");
  console.log("Summary:");
  console.log(`  📁 Categories: ${categoriesData.length}`);
  console.log(`  🏔️  Trekking Routes: ${routesData.length}`);
  console.log(`  🗺️  Destinations: ${destinationsData.length}`);
  console.log(`  🦁 Safari Packages: ${safarisData.length}`);
  console.log(`  🚗 Day Trips: ${dayTripsData.length}`);
  console.log(`  📝 Blog Posts: ${postCount}`);
  console.log(`  📅 Group Departures: ${departures.length}`);
  console.log("");
  console.log("⚠️  Note: Remaining blog posts need manual content migration");
  console.log("═".repeat(50));
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
