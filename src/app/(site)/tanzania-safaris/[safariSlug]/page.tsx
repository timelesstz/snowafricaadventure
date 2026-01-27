import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SafariDetailHero,
  QuickNav,
  TourOverview,
  HighlightsStrip,
  DayByDayTimeline,
  TourInclusionsSection,
  FinalCTA,
} from "@/components/tours";
import type { DayItinerary } from "@/components/tours/types";
import { generateMetadata as genMeta, generateTripSchema, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{ safariSlug: string }>;
}

// Fetch safari from database
async function getSafari(slug: string) {
  const safari = await prisma.safariPackage.findUnique({
    where: { slug },
    include: {
      destinations: {
        include: {
          destination: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return safari;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { safariSlug } = await params;
  const safari = await getSafari(safariSlug);

  if (!safari) {
    return { title: "Safari Not Found" };
  }

  return genMeta({
    title: safari.title,
    description: safari.overview.slice(0, 160),
    url: `/tanzania-safaris/${safari.slug}/`,
  });
}

export default async function SafariPage({ params }: PageProps) {
  const { safariSlug } = await params;
  const safari = await getSafari(safariSlug);

  if (!safari) {
    notFound();
  }

  // Parse JSON fields
  const rawItinerary = (safari.itinerary as { day: number; title: string; description: string; accommodation?: string; meals?: string }[] | null) || [];
  const priceFrom = safari.priceFrom ? Number(safari.priceFrom) : 0;

  // Transform itinerary to our format
  const itinerary: DayItinerary[] = rawItinerary.map((day, index) => ({
    day: day.day,
    title: day.title,
    description: day.description,
    accommodation: day.accommodation,
    meals: day.meals,
    highlights: extractHighlights(day.description),
    isFeatured: index === 3, // Mark day 4 as featured (Serengeti arrival typically)
    image: getItineraryImage(day.title, index),
  }));

  // Use durationDays from database
  const durationDays = safari.durationDays;

  // Use stats from database (handle Prisma Decimal type)
  const parksCount = safari.parksCount;
  const gameDrives = safari.gameDrives;
  const rating = safari.rating ? parseFloat(safari.rating.toString()) : 4.9;

  // Generate badges
  const badges = [
    safari.type === 'Luxury' ? 'Luxury Lodges' : safari.type,
    'Best Seller',
    'Big Five Guaranteed'
  ].filter(Boolean);

  // Generate schemas
  const tripSchema = generateTripSchema({
    name: safari.title,
    description: safari.overview,
    url: `/tanzania-safaris/${safari.slug}/`,
    duration: `P${durationDays}D`,
    price: priceFrom,
  });

  const productSchema = generateProductSchema({
    name: safari.title,
    description: safari.overview.slice(0, 300),
    url: `/tanzania-safaris/${safari.slug}/`,
    price: priceFrom,
    ratingValue: 4.9,
    reviewCount: 47,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tanzania Safaris", url: "/tanzania-safaris/" },
    { name: safari.title, url: `/tanzania-safaris/${safari.slug}/` },
  ]);

  // Split overview into lead and body
  const overviewSentences = safari.overview.split('. ');
  const leadText = overviewSentences.slice(0, 2).join('. ') + '.';
  const bodyText = overviewSentences.length > 2
    ? [overviewSentences.slice(2).join('. ')]
    : [];

  return (
    <div>
      {/* Schema markup */}
      <MultiJsonLd schemas={[tripSchema, productSchema, breadcrumbSchema]} />

      {/* Hero */}
      <SafariDetailHero
        title={safari.title}
        subtitle={safari.overview.slice(0, 200)}
        heroImage={safari.featuredImage || "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"}
        badges={badges}
        duration={durationDays}
        parks={parksCount}
        gameDrives={gameDrives}
        rating={rating}
        safariSlug={safari.slug}
      />

      {/* Quick Navigation */}
      <QuickNav />

      {/* Overview Section */}
      <TourOverview
        leadText={leadText}
        bodyText={bodyText}
        quote="Watching a leopard descend from an acacia tree at sunset, with the Serengeti stretching endlessly behind - that's a moment that stays with you forever."
      />

      {/* Highlights Strip */}
      <HighlightsStrip />

      {/* Day by Day Timeline */}
      {itinerary.length > 0 && (
        <DayByDayTimeline itinerary={itinerary} />
      )}

      {/* Inclusions */}
      <TourInclusionsSection
        inclusions={safari.inclusions || defaultInclusions}
        exclusions={safari.exclusions || defaultExclusions}
      />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}

// Helper function to extract highlights from description
function extractHighlights(description: string): string[] {
  // Look for common safari keywords
  const keywords = [
    'lion', 'elephant', 'leopard', 'rhino', 'buffalo',
    'wildebeest', 'zebra', 'giraffe', 'hippo', 'flamingo',
    'crater', 'migration', 'sunset', 'sunrise', 'game drive',
    'picnic', 'sundowner', 'lodge', 'camp', 'airport'
  ];

  const highlights: string[] = [];
  const lowerDesc = description.toLowerCase();

  keywords.forEach(keyword => {
    if (lowerDesc.includes(keyword) && highlights.length < 3) {
      // Capitalize first letter
      highlights.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });

  return highlights.length > 0 ? highlights : ['Game drive', 'Wildlife viewing', 'Scenic views'];
}

// Helper function to get itinerary images
function getItineraryImage(title: string, index: number): string {
  const images = [
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80', // Arusha
    'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80', // Tarangire
    'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80', // Ngorongoro
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', // Serengeti
    'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80', // Migration
    'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80', // Lake Manyara
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', // Departure
  ];

  return images[index % images.length];
}

// Default inclusions if not set
const defaultInclusions = [
  'All national park entrance fees',
  'Professional English-speaking safari guide',
  'Private 4x4 Land Cruiser with pop-up roof',
  'Luxury lodge accommodation',
  'All meals (full board)',
  'Unlimited bottled water during drives',
  'Airport transfers (JRO/ARK)',
  'Flying Doctor emergency evacuation',
];

// Default exclusions if not set
const defaultExclusions = [
  'International flights',
  'Travel insurance (required)',
  'Tanzania visa fees ($50 USD)',
  'Tips for guide and lodge staff',
  'Alcoholic beverages',
  'Items of personal nature',
];
