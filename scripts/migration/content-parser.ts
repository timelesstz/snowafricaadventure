/**
 * Content parser for extracting structured data from WordPress HTML
 */

import * as cheerio from "cheerio";
import {
  MigratedRoute,
  MigratedSafari,
  MigratedDestination,
  MigratedDayTrip,
  MigratedBlogPost,
  ItineraryDay,
  FAQ,
} from "./types";
import {
  stripHtml,
  extractListItems,
  parseDurationDays,
  determineSafariType,
  determineCircuit,
} from "./wordpress-api";

/**
 * Parse trekking route page content
 */
export function parseRouteContent(
  slug: string,
  html: string,
  title: string,
  metaDescription?: string
): MigratedRoute {
  const $ = cheerio.load(html);

  // Extract overview/description
  const overview = extractOverview($);

  // Extract duration from title or content
  const duration = extractDuration(title, $);
  const durationDays = parseDurationDays(duration);

  // Extract highlights
  const highlights = extractHighlights($);

  // Extract itinerary
  const itinerary = extractItinerary($);

  // Extract inclusions/exclusions
  const { inclusions, exclusions } = extractInclusionsExclusions($);

  // Extract FAQs
  const faqs = extractFAQs($);

  // Extract images
  const images = extractAllImages($);
  const featuredImage = images[0];
  const gallery = images.slice(1);

  // Extract route map
  const routeMapImage = extractRouteMap($);

  // Extract quick facts
  const quickFacts = extractQuickFacts($);

  return {
    slug,
    title: cleanTitle(title),
    metaTitle: title,
    metaDescription,
    duration,
    durationDays,
    maxPeople: quickFacts.maxPeople,
    startPoint: quickFacts.startPoint,
    endPoint: quickFacts.endPoint,
    ageRange: quickFacts.ageRange,
    physicalRating: quickFacts.physicalRating,
    successRate: quickFacts.successRate,
    overview,
    highlights,
    itinerary,
    routeMapImage,
    inclusions,
    exclusions,
    faqs,
    featuredImage,
    gallery,
  };
}

/**
 * Parse safari package page content
 */
export function parseSafariContent(
  slug: string,
  html: string,
  title: string,
  metaDescription?: string
): MigratedSafari {
  const $ = cheerio.load(html);

  const overview = extractOverview($);
  const duration = extractDuration(title, $);
  const durationDays = parseDurationDays(duration);
  const type = determineSafariType(title, html);
  const highlights = extractHighlights($);
  const itinerary = extractItinerary($);
  const { inclusions, exclusions } = extractInclusionsExclusions($);

  const images = extractAllImages($);
  const featuredImage = images[0];
  const gallery = images.slice(1);

  // Extract destinations mentioned
  const destinationSlugs = extractDestinationSlugs($, html);

  // Extract price if available
  const priceFrom = extractPrice($);

  return {
    slug,
    title: cleanTitle(title),
    metaTitle: title,
    metaDescription,
    duration,
    durationDays,
    type,
    overview,
    highlights,
    itinerary,
    inclusions,
    exclusions,
    featuredImage,
    gallery,
    priceFrom,
    destinationSlugs,
  };
}

/**
 * Parse destination page content
 */
export function parseDestinationContent(
  slug: string,
  html: string,
  title: string,
  metaDescription?: string
): MigratedDestination {
  const $ = cheerio.load(html);

  const name = cleanTitle(title).replace(" National Park", "").replace(" Conservation Area", "").replace(" Game Reserve", "");
  const description = extractOverview($);
  const circuit = determineCircuit(name);
  const highlights = extractHighlights($);
  const wildlife = extractWildlife($);
  const bestTime = extractBestTime($);

  const images = extractAllImages($);
  const featuredImage = images[0];
  const gallery = images.slice(1);

  return {
    slug,
    name,
    metaTitle: title,
    metaDescription,
    circuit,
    description,
    highlights,
    wildlife,
    bestTime,
    featuredImage,
    gallery,
  };
}

/**
 * Parse day trip page content
 */
export function parseDayTripContent(
  slug: string,
  html: string,
  title: string,
  metaDescription?: string
): MigratedDayTrip {
  const $ = cheerio.load(html);

  const destination = extractDestinationFromTitle(title);
  const description = extractOverview($);
  const highlights = extractHighlights($);
  const { inclusions, exclusions } = extractInclusionsExclusions($);
  const priceFrom = extractPrice($);

  const images = extractAllImages($);
  const featuredImage = images[0];
  const gallery = images.slice(1);

  return {
    slug,
    title: cleanTitle(title),
    metaTitle: title,
    metaDescription,
    destination,
    description,
    highlights,
    inclusions,
    exclusions,
    featuredImage,
    gallery,
    priceFrom,
  };
}

/**
 * Parse blog post content
 */
export function parseBlogContent(
  slug: string,
  html: string,
  title: string,
  excerpt: string,
  metaDescription?: string,
  publishedAt?: Date,
  categorySlugs: string[] = [],
  tagSlugs: string[] = []
): MigratedBlogPost {
  const $ = cheerio.load(html);

  // Extract clean content
  const content = extractCleanContent($);
  const featuredImage = extractAllImages($)[0];

  return {
    slug,
    title: cleanTitle(title),
    metaTitle: title,
    metaDescription,
    excerpt: stripHtml(excerpt),
    content,
    featuredImage,
    publishedAt,
    categorySlugs,
    tagSlugs,
  };
}

// Helper functions

function extractOverview($: cheerio.CheerioAPI): string {
  // Try to find the first substantial paragraph
  const paragraphs = $("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((p) => p.length > 100);

  if (paragraphs.length > 0) {
    return paragraphs.slice(0, 3).join("\n\n");
  }

  // Fallback to any text content
  const bodyText = $("body").text().trim();
  return bodyText.slice(0, 1000);
}

function extractDuration(title: string, $: cheerio.CheerioAPI): string {
  // Check title first
  const titleMatch = title.match(/(\d+)[- ]?days?/i);
  if (titleMatch) {
    return `${titleMatch[1]} Days`;
  }

  // Look in content
  const text = $("body").text();
  const contentMatch = text.match(/duration[:\s]+(\d+)[- ]?days?/i);
  if (contentMatch) {
    return `${contentMatch[1]} Days`;
  }

  return "Multiple Days";
}

function extractHighlights($: cheerio.CheerioAPI): string[] {
  const highlights: string[] = [];

  // Look for highlights/features sections
  $("h2, h3, h4").each((_, heading) => {
    const headingText = $(heading).text().toLowerCase();
    if (
      headingText.includes("highlight") ||
      headingText.includes("feature") ||
      headingText.includes("why choose")
    ) {
      const list = $(heading).nextAll("ul").first();
      list.find("li").each((_, li) => {
        const text = $(li).text().trim();
        if (text && text.length < 200) {
          highlights.push(text);
        }
      });
    }
  });

  return highlights.slice(0, 10);
}

function extractItinerary($: cheerio.CheerioAPI): ItineraryDay[] {
  const itinerary: ItineraryDay[] = [];

  // Look for day headings
  $("h2, h3, h4").each((_, heading) => {
    const headingText = $(heading).text();
    const dayMatch = headingText.match(/day\s*(\d+)/i);

    if (dayMatch) {
      const day = parseInt(dayMatch[1], 10);
      const title = headingText.replace(/day\s*\d+[:\s-]*/i, "").trim();

      // Get description from following content
      let description = "";
      let nextEl = $(heading).next();
      while (
        nextEl.length &&
        !nextEl.is("h2, h3, h4") &&
        description.length < 500
      ) {
        if (nextEl.is("p")) {
          description += nextEl.text().trim() + " ";
        }
        nextEl = nextEl.next();
      }

      if (title || description) {
        itinerary.push({
          day,
          title: title || `Day ${day}`,
          description: description.trim(),
        });
      }
    }
  });

  return itinerary.sort((a, b) => a.day - b.day);
}

function extractInclusionsExclusions($: cheerio.CheerioAPI): {
  inclusions: string[];
  exclusions: string[];
} {
  const inclusions: string[] = [];
  const exclusions: string[] = [];

  $("h2, h3, h4").each((_, heading) => {
    const headingText = $(heading).text().toLowerCase();

    if (headingText.includes("includ") || headingText.includes("what's included")) {
      const list = $(heading).nextAll("ul").first();
      list.find("li").each((_, li) => {
        const text = $(li).text().trim();
        if (text && text.length < 200) {
          inclusions.push(text);
        }
      });
    }

    if (headingText.includes("exclud") || headingText.includes("not included")) {
      const list = $(heading).nextAll("ul").first();
      list.find("li").each((_, li) => {
        const text = $(li).text().trim();
        if (text && text.length < 200) {
          exclusions.push(text);
        }
      });
    }
  });

  return { inclusions, exclusions };
}

function extractFAQs($: cheerio.CheerioAPI): FAQ[] {
  const faqs: FAQ[] = [];

  // Look for FAQ sections
  $("h2, h3, h4").each((_, heading) => {
    const headingText = $(heading).text().toLowerCase();
    if (headingText.includes("faq") || headingText.includes("frequently asked")) {
      // Look for Q&A patterns
      $(heading)
        .nextAll()
        .each((_, el) => {
          const $el = $(el);
          if ($el.is("h2, h3, h4")) {
            const question = $el.text().trim();
            const answer = $el.nextAll("p").first().text().trim();
            if (question.includes("?") && answer) {
              faqs.push({ question, answer });
            }
          }
        });
    }
  });

  return faqs.slice(0, 10);
}

function extractAllImages($: cheerio.CheerioAPI): string[] {
  const images: string[] = [];

  $("img").each((_, img) => {
    const src =
      $(img).attr("data-src") || $(img).attr("src") || $(img).attr("data-lazy-src");
    if (src && src.includes("snowafricaadventure.com") && !src.includes("150x150")) {
      // Get full size image URL
      const fullSrc = src.replace(/-\d+x\d+\./, ".");
      images.push(fullSrc);
    }
  });

  return [...new Set(images)];
}

function extractRouteMap($: cheerio.CheerioAPI): string | undefined {
  let mapImage: string | undefined;

  $("img").each((_, img) => {
    const src = $(img).attr("src") || "";
    const alt = $(img).attr("alt") || "";
    if (
      src.includes("map") ||
      alt.toLowerCase().includes("map") ||
      alt.toLowerCase().includes("route")
    ) {
      mapImage = src.replace(/-\d+x\d+\./, ".");
    }
  });

  return mapImage;
}

function extractQuickFacts($: cheerio.CheerioAPI): {
  maxPeople?: number;
  startPoint?: string;
  endPoint?: string;
  ageRange?: string;
  physicalRating?: string;
  successRate?: number;
} {
  const facts: Record<string, string | number | undefined> = {};
  const text = $("body").text();

  // Try to extract from structured elements
  $(".elementor-widget-text-editor, .quick-facts, .trip-info").each((_, el) => {
    const content = $(el).text();

    const groupMatch = content.match(/group\s*size[:\s]+(\d+)/i);
    if (groupMatch) facts.maxPeople = parseInt(groupMatch[1], 10);

    const successMatch = content.match(/success\s*rate[:\s]+(\d+)/i);
    if (successMatch) facts.successRate = parseInt(successMatch[1], 10);
  });

  // Physical rating detection
  if (text.toLowerCase().includes("challenging")) {
    facts.physicalRating = "Challenging";
  } else if (text.toLowerCase().includes("difficult")) {
    facts.physicalRating = "Difficult";
  } else if (text.toLowerCase().includes("moderate")) {
    facts.physicalRating = "Moderate";
  }

  return facts as {
    maxPeople?: number;
    startPoint?: string;
    endPoint?: string;
    ageRange?: string;
    physicalRating?: string;
    successRate?: number;
  };
}

function extractDestinationSlugs($: cheerio.CheerioAPI, html: string): string[] {
  const destinations: string[] = [];
  const knownDestinations = [
    "serengeti",
    "ngorongoro",
    "tarangire",
    "lake-manyara",
    "manyara",
    "arusha",
    "mikumi",
    "selous",
    "ruaha",
  ];

  const lowerHtml = html.toLowerCase();
  for (const dest of knownDestinations) {
    if (lowerHtml.includes(dest)) {
      destinations.push(dest.replace("-", "-") + "-national-park");
    }
  }

  return [...new Set(destinations)];
}

function extractWildlife($: cheerio.CheerioAPI): string[] {
  const wildlife: string[] = [];
  const knownAnimals = [
    "lion",
    "elephant",
    "buffalo",
    "leopard",
    "rhino",
    "cheetah",
    "giraffe",
    "zebra",
    "hippo",
    "wildebeest",
    "crocodile",
    "flamingo",
  ];

  const text = $("body").text().toLowerCase();
  for (const animal of knownAnimals) {
    if (text.includes(animal)) {
      wildlife.push(animal.charAt(0).toUpperCase() + animal.slice(1));
    }
  }

  return wildlife;
}

function extractBestTime($: cheerio.CheerioAPI): string | undefined {
  const text = $("body").text();
  const match = text.match(/best\s*time[:\s]+([^.]+)/i);
  return match?.[1]?.trim();
}

function extractPrice($: cheerio.CheerioAPI): number | undefined {
  const text = $("body").text();
  const match = text.match(/\$\s*([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(",", ""), 10);
  }
  return undefined;
}

function extractDestinationFromTitle(title: string): string {
  return title
    .replace(/day\s*trip/i, "")
    .replace(/to\s*/i, "")
    .trim();
}

function extractCleanContent($: cheerio.CheerioAPI): string {
  // Remove Elementor-specific elements
  $(".elementor-widget-container style").remove();
  $("script").remove();
  $("style").remove();

  // Get main content
  const content = $(".elementor-widget-text-editor")
    .map((_, el) => $(el).html())
    .get()
    .join("\n\n");

  return content || $("article").html() || $(".entry-content").html() || "";
}

function cleanTitle(title: string): string {
  return title
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s*\|\s*.+$/, "") // Remove site name from title
    .trim();
}
