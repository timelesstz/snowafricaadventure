// WordPress REST API response types

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: { url: string }[];
  };
  rank_math_title?: string;
  rank_math_description?: string;
}

export interface WPPage extends WPPost {
  parent: number;
  template: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
}

// Migration data structures
export interface MigratedRoute {
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
  itinerary?: ItineraryDay[];
  routeMapImage?: string;
  inclusions: string[];
  exclusions: string[];
  faqs?: FAQ[];
  featuredImage?: string;
  gallery: string[];
  categorySlug?: string;
}

export interface MigratedSafari {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  duration: string;
  durationDays: number;
  type: string;
  overview: string;
  highlights: string[];
  itinerary?: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  featuredImage?: string;
  gallery: string[];
  priceFrom?: number;
  destinationSlugs: string[];
}

export interface MigratedDestination {
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
  gallery: string[];
}

export interface MigratedDayTrip {
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
  gallery: string[];
  priceFrom?: number;
}

export interface MigratedBlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author?: string;
  publishedAt?: Date;
  categorySlugs: string[];
  tagSlugs: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation?: string;
  distance?: string;
  time?: string;
  meals?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Content extraction patterns
export const URL_PATTERNS = {
  trekkingRoutes: /^\/trekking\/(?!kilimanjaro-guide)([^/]+)\/?$/,
  safaris: /^\/tanzania-safaris\/([^/]+)\/?$/,
  destinations: /^\/tanzania-destinations\/([^/]+)\/?$/,
  dayTrips: /^\/day-trips\/([^/]+)\/?$/,
  blogPosts: /^\/([^/]+)\/?$/, // Root level posts
};
