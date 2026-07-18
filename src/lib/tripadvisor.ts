/**
 * TripAdvisor Content API client.
 *
 * Uses the OFFICIAL Content API (https://tripadvisor-content-api.readme.io/),
 * NOT scraping — scraping TripAdvisor violates their terms, is blocked from
 * datacenter IPs, and breaks constantly. The API returns the location's real
 * rating, total review count, and up to 5 recent review snippets.
 *
 * Setup (one-time, done by the site owner):
 *   1. Register at https://www.tripadvisor.com/developers and create an API key.
 *   2. Restrict the key to the site's domain (referer allow-list) — the cron
 *      sends a Referer header of SITE_CONFIG.url so it passes that check.
 *   3. Set env vars: TRIPADVISOR_API_KEY, and optionally TRIPADVISOR_LOCATION_ID
 *      (defaults to the Snow Africa Arusha listing, 15336338).
 *
 * Attribution: when displaying this data you must show TripAdvisor branding and
 * link back to the listing — the homepage already renders the TripAdvisor badge
 * and links to tripAdvisor.url, satisfying this.
 */

import { SITE_CONFIG } from "@/lib/constants";

const API_BASE = "https://api.content.tripadvisor.com/api/v1";
const DEFAULT_LOCATION_ID = "15336338";

export interface TripAdvisorReview {
  externalId: string;
  authorName: string;
  authorImage: string | null;
  rating: number;
  title: string | null;
  text: string;
  publishedAt: Date;
  tripType: string | null;
  url: string | null;
}

export interface TripAdvisorLocation {
  ratingDecimal: number; // e.g. 4.9
  reviewCount: number; // total reviews on TripAdvisor
  webUrl: string | null;
}

export function isTripAdvisorConfigured(): boolean {
  return Boolean(process.env.TRIPADVISOR_API_KEY);
}

function locationId(): string {
  return process.env.TRIPADVISOR_LOCATION_ID || DEFAULT_LOCATION_ID;
}

async function taFetch(path: string): Promise<unknown> {
  const key = process.env.TRIPADVISOR_API_KEY;
  if (!key) throw new Error("TRIPADVISOR_API_KEY is not set");

  const sep = path.includes("?") ? "&" : "?";
  const url = `${API_BASE}${path}${sep}key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      // TripAdvisor keys are typically referer-restricted to the owner's domain.
      Referer: SITE_CONFIG.url,
    },
    // Never cache — the cron wants fresh data, and keys are rate-limited.
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `TripAdvisor API ${res.status} for ${path}: ${body.slice(0, 200)}`
    );
  }
  return res.json();
}

export async function fetchLocationDetails(): Promise<TripAdvisorLocation> {
  const data = (await taFetch(
    `/location/${locationId()}/details?language=en&currency=USD`
  )) as {
    rating?: string | number;
    num_reviews?: string | number;
    web_url?: string;
  };

  const ratingDecimal = Number(data.rating);
  const reviewCount = parseInt(String(data.num_reviews ?? "0"), 10);

  return {
    ratingDecimal: Number.isFinite(ratingDecimal) ? ratingDecimal : 0,
    reviewCount: Number.isFinite(reviewCount) ? reviewCount : 0,
    webUrl: data.web_url ?? null,
  };
}

interface RawReview {
  id?: string | number;
  published_date?: string;
  rating?: number;
  title?: string;
  text?: string;
  trip_type?: string;
  url?: string;
  user?: {
    username?: string;
    avatar?: {
      small?: { url?: string };
      large?: { url?: string };
    };
  };
}

export async function fetchLocationReviews(): Promise<TripAdvisorReview[]> {
  const data = (await taFetch(
    `/location/${locationId()}/reviews?language=en`
  )) as { data?: RawReview[] };

  const rows = Array.isArray(data.data) ? data.data : [];
  const reviews: TripAdvisorReview[] = [];

  for (const r of rows) {
    const rating = Number(r.rating);
    const text = (r.text ?? "").trim();
    const published = r.published_date ? new Date(r.published_date) : null;
    if (!text || !Number.isFinite(rating) || !published || isNaN(published.getTime())) {
      continue;
    }
    reviews.push({
      externalId: String(r.id ?? `${r.user?.username ?? "anon"}-${r.published_date}`),
      authorName: r.user?.username?.trim() || "TripAdvisor traveler",
      authorImage:
        r.user?.avatar?.large?.url || r.user?.avatar?.small?.url || null,
      rating: Math.round(rating),
      title: r.title?.trim() || null,
      text,
      publishedAt: published,
      tripType: r.trip_type?.trim() || null,
      url: r.url ?? null,
    });
  }

  return reviews;
}
