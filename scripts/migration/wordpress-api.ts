/**
 * WordPress REST API utilities for content migration
 */

import { WPPost, WPPage, WPMedia, WPCategory, WPTag } from "./types";

const WP_BASE_URL = "https://snowafricaadventure.com";
const WP_API_URL = `${WP_BASE_URL}/wp-json/wp/v2`;

// Rate limiting
const DELAY_MS = 500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all posts from WordPress
 */
export async function fetchAllPosts(): Promise<WPPost[]> {
  const posts: WPPost[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `${WP_API_URL}/posts?per_page=100&page=${page}&_embed`
    );

    if (!response.ok) {
      if (response.status === 400) {
        hasMore = false;
        continue;
      }
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      hasMore = false;
    } else {
      posts.push(...data);
      page++;
      await sleep(DELAY_MS);
    }
  }

  console.log(`Fetched ${posts.length} posts from WordPress`);
  return posts;
}

/**
 * Fetch all pages from WordPress
 */
export async function fetchAllPages(): Promise<WPPage[]> {
  const pages: WPPage[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `${WP_API_URL}/pages?per_page=100&page=${page}&_embed`
    );

    if (!response.ok) {
      if (response.status === 400) {
        hasMore = false;
        continue;
      }
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      hasMore = false;
    } else {
      pages.push(...data);
      page++;
      await sleep(DELAY_MS);
    }
  }

  console.log(`Fetched ${pages.length} pages from WordPress`);
  return pages;
}

/**
 * Fetch media by ID
 */
export async function fetchMedia(mediaId: number): Promise<WPMedia | null> {
  try {
    const response = await fetch(`${WP_API_URL}/media/${mediaId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<WPCategory[]> {
  const response = await fetch(`${WP_API_URL}/categories?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch all tags
 */
export async function fetchTags(): Promise<WPTag[]> {
  const response = await fetch(`${WP_API_URL}/tags?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch a specific page by slug
 */
export async function fetchPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const response = await fetch(`${WP_API_URL}/pages?slug=${slug}&_embed`);
    if (!response.ok) return null;
    const pages = await response.json();
    return pages[0] || null;
  } catch {
    return null;
  }
}

/**
 * Fetch page content via direct URL (for Elementor pages)
 */
export async function fetchPageContent(path: string): Promise<string> {
  const url = `${WP_BASE_URL}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return await response.text();
}

/**
 * Extract clean text from HTML
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract list items from HTML
 */
export function extractListItems(html: string): string[] {
  const items: string[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = liRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text) {
      items.push(text);
    }
  }

  return items;
}

/**
 * Extract meta description from page HTML
 */
export function extractMetaDescription(html: string): string | undefined {
  const match = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
  );
  return match?.[1];
}

/**
 * Extract images from HTML content
 */
export function extractImages(html: string): string[] {
  const images: string[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (
      src.includes("snowafricaadventure.com") &&
      !src.includes("placeholder")
    ) {
      images.push(src);
    }
  }

  return [...new Set(images)]; // Remove duplicates
}

/**
 * Parse duration string to days
 */
export function parseDurationDays(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

/**
 * Determine safari type from title/content
 */
export function determineSafariType(title: string, content: string): string {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  if (lowerTitle.includes("luxury") || lowerContent.includes("luxury")) {
    return "Luxury";
  }
  if (lowerTitle.includes("budget") || lowerTitle.includes("camping")) {
    return "Budget";
  }
  return "Mid-range";
}

/**
 * Determine destination circuit
 */
export function determineCircuit(name: string): string {
  const northernParks = [
    "serengeti",
    "ngorongoro",
    "tarangire",
    "manyara",
    "arusha",
    "mkomazi",
  ];
  const southernParks = [
    "selous",
    "ruaha",
    "mikumi",
    "udzungwa",
    "kitulo",
    "nyerere",
  ];
  const westernParks = ["gombe", "mahale", "katavi", "rubondo"];

  const lowerName = name.toLowerCase();

  if (northernParks.some((p) => lowerName.includes(p))) return "Northern";
  if (southernParks.some((p) => lowerName.includes(p))) return "Southern";
  if (westernParks.some((p) => lowerName.includes(p))) return "Western";

  return "Northern"; // Default
}
