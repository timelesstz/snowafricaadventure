/**
 * URL ↔ content matching for the SEO pages.
 *
 * Search Console reports absolute URLs, GA4 reports landing-page paths and the
 * CMS stores slugs. Everything is joined on one key: the pathname with a
 * trailing slash (the site enforces trailing slashes), lower-cased.
 */

import type { ContentKind } from "@/lib/seo-overview";

const PUBLIC_PREFIX: Record<ContentKind, string> = {
  route: "/trekking/",
  safari: "/tanzania-safaris/",
  destination: "/tanzania-destinations/",
  "day-trip": "/tanzania-day-tours/",
  blog: "/",
};

export function publicPathFor(kind: ContentKind, slug: string): string {
  return `${PUBLIC_PREFIX[kind]}${slug}/`;
}

/** Join key for any URL or path: "/a/b/" — no host, query or hash. */
export function pathKey(urlOrPath: string | null | undefined): string {
  if (!urlOrPath) return "/";
  let path = urlOrPath.trim();
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname;
    } catch {
      // keep the raw value
    }
  }
  path = path.split(/[?#]/)[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    // malformed escape; keep as-is
  }
  path = path.toLowerCase();
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path = `${path}/`;
  return path.replace(/\/{2,}/g, "/");
}

export const EDIT_HREF: Record<ContentKind, (id: string) => string> = {
  route: (id) => `/admin/routes/${id}`,
  safari: (id) => `/admin/safaris/${id}`,
  destination: (id) => `/admin/destinations/${id}`,
  "day-trip": (id) => `/admin/day-trips/${id}`,
  blog: (id) => `/admin/blog/${id}`,
};

export const KIND_LABEL: Record<ContentKind, string> = {
  route: "Trekking route",
  safari: "Safari",
  destination: "Destination",
  "day-trip": "Day trip",
  blog: "Blog post",
};

export const CONTENT_KINDS: ContentKind[] = ["route", "safari", "destination", "day-trip", "blog"];

export function isContentKind(value: unknown): value is ContentKind {
  return typeof value === "string" && (CONTENT_KINDS as string[]).includes(value);
}

/** Title tag budget before the " | Snow Africa Adventure" suffix (see lib/seo.ts). */
export const META_TITLE_MAX = 55;
export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 158;
