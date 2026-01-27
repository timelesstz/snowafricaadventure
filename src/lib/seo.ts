import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

/**
 * Generate metadata for pages
 */
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps): Metadata {
  const siteTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name;
  const siteDescription = description || SITE_CONFIG.description;
  const siteUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
  const siteImage = image || `${SITE_CONFIG.url}/og-image.jpg`;

  return {
    title: siteTitle,
    description: siteDescription,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

/**
 * Generate TourOperator schema
 */
export function generateTourOperatorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TourOperator",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: "TZ",
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
    ],
  };
}

/**
 * Generate TouristTrip schema for routes/safaris
 */
export function generateTripSchema(trip: {
  name: string;
  description: string;
  url: string;
  image?: string;
  duration?: string;
  price?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.description,
    url: `${SITE_CONFIG.url}${trip.url}`,
    touristType: "Adventure",
    ...(trip.image && { image: trip.image }),
    ...(trip.duration && { duration: trip.duration }),
    ...(trip.price && {
      offers: {
        "@type": "Offer",
        price: trip.price,
        priceCurrency: "USD",
      },
    }),
    provider: {
      "@type": "TourOperator",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_CONFIG.url}${article.url}`,
    ...(article.image && { image: article.image }),
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      "@type": "Person",
      name: article.author || SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generate Event schema for group departures
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  location?: string;
  price: number;
  availability: "InStock" | "SoldOut" | "LimitedAvailability";
  image?: string;
  maxAttendees?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    url: `${SITE_CONFIG.url}${event.url}`,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location || "Mount Kilimanjaro",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Moshi",
        addressRegion: "Kilimanjaro",
        addressCountry: "TZ",
      },
    },
    ...(event.image && { image: event.image }),
    ...(event.maxAttendees && { maximumAttendeeCapacity: event.maxAttendees }),
    offers: {
      "@type": "Offer",
      price: event.price,
      priceCurrency: "USD",
      availability: `https://schema.org/${event.availability}`,
      validFrom: new Date().toISOString(),
      url: `${SITE_CONFIG.url}${event.url}`,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    performer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };
}

/**
 * Generate Product schema for tour packages
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price: number;
  priceValidUntil?: string;
  sku?: string;
  reviewCount?: number;
  ratingValue?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${SITE_CONFIG.url}${product.url}`,
    ...(product.image && { image: product.image }),
    ...(product.sku && { sku: product.sku }),
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      ...(product.priceValidUntil && { priceValidUntil: product.priceValidUntil }),
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
    ...(product.reviewCount &&
      product.ratingValue && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.ratingValue,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

/**
 * Generate AggregateRating schema for reviews
 */
export function generateAggregateRatingSchema(data: {
  ratingValue: number;
  reviewCount: number;
  itemName: string;
  itemType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": data.itemType || "TourOperator",
    name: data.itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.ratingValue,
      reviewCount: data.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/**
 * Generate Review schema
 */
export function generateReviewSchema(review: {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
  itemReviewed: {
    name: string;
    type?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": review.itemReviewed.type || "TourOperator",
      name: review.itemReviewed.name,
    },
  };
}

/**
 * Generate WebSite schema with SearchAction for sitelinks searchbox
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate LocalBusiness schema (complementary to TourOperator)
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#business`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    priceRange: "$$$",
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: "TZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -3.3869,
      longitude: 36.6830,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
    ],
  };
}

/**
 * Generate ItemList schema for collections (routes, safaris, etc.)
 */
export function generateItemListSchema(items: {
  name: string;
  url: string;
  description?: string;
  image?: string;
  position?: number;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position || index + 1,
      item: {
        "@type": "TouristTrip",
        name: item.name,
        url: `${SITE_CONFIG.url}${item.url}`,
        ...(item.description && { description: item.description }),
        ...(item.image && { image: item.image }),
      },
    })),
  };
}
