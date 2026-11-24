import prisma from "@/lib/prisma";
import {
  scoreBlogSeo,
  scoreDayTripSeo,
  scoreDestinationSeo,
  scoreRouteSeo,
  scoreSafariSeo,
  type SeoScoreResult,
} from "@/lib/seo-score";
import type { ContentKind } from "@/lib/seo-overview";
import { EDIT_HREF, pathKey, publicPathFor } from "./paths";

/**
 * Every scored piece of content, once: score, failing checks, current meta and
 * the public path it is served at (the join key to Search Console and GA4).
 */
export interface ContentRecord {
  id: string;
  kind: ContentKind;
  title: string;
  slug: string;
  path: string;
  editHref: string;
  isLive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  updatedAt: Date;
  result: SeoScoreResult;
}

export async function loadContentIndex(): Promise<ContentRecord[]> {
  const [routes, safaris, destinations, dayTrips, posts] = await Promise.all([
    prisma.trekkingRoute.findMany({}),
    prisma.safariPackage.findMany({ include: { destinations: true } }),
    prisma.destination.findMany({ include: { _count: { select: { safaris: true } } } }),
    prisma.dayTrip.findMany({}),
    prisma.blogPost.findMany({ include: { _count: { select: { categories: true, tags: true } } } }),
  ]);

  const out: ContentRecord[] = [];
  const push = (
    kind: ContentKind,
    row: {
      id: string;
      slug: string;
      metaTitle: string | null;
      metaDescription: string | null;
      updatedAt: Date;
    },
    title: string,
    isLive: boolean,
    result: SeoScoreResult
  ) =>
    out.push({
      id: row.id,
      kind,
      title,
      slug: row.slug,
      path: pathKey(publicPathFor(kind, row.slug)),
      editHref: EDIT_HREF[kind](row.id),
      isLive,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      updatedAt: row.updatedAt,
      result,
    });

  for (const r of routes) {
    push("route", r, r.title, r.isActive, scoreRouteSeo({
      title: r.title,
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      overview: r.overview,
      featuredImage: r.featuredImage,
      gallery: r.gallery,
      highlights: r.highlights,
      inclusions: r.inclusions,
      exclusions: r.exclusions,
      itinerary: r.itinerary,
      faqs: r.faqs,
      guideName: r.guideName,
    }));
  }
  for (const s of safaris) {
    push("safari", s, s.title, s.isActive, scoreSafariSeo({
      title: s.title,
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      overview: s.overview,
      featuredImage: s.featuredImage,
      gallery: s.gallery,
      highlights: s.highlights,
      inclusions: s.inclusions,
      exclusions: s.exclusions,
      itinerary: s.itinerary,
      destinationCount: s.destinations.length,
    }));
  }
  for (const d of destinations) {
    push("destination", d, d.name, d.isActive, scoreDestinationSeo({
      name: d.name,
      metaTitle: d.metaTitle,
      metaDescription: d.metaDescription,
      description: d.description,
      featuredImage: d.featuredImage,
      gallery: d.gallery,
      highlights: d.highlights,
      wildlife: d.wildlife,
      bestTime: d.bestTime,
      safariCount: d._count.safaris,
    }));
  }
  for (const t of dayTrips) {
    push("day-trip", t, t.title, t.isActive, scoreDayTripSeo({
      title: t.title,
      metaTitle: t.metaTitle,
      metaDescription: t.metaDescription,
      description: t.description,
      featuredImage: t.featuredImage,
      gallery: t.gallery,
      highlights: t.highlights,
      inclusions: t.inclusions,
      exclusions: t.exclusions,
      destination: t.destination,
    }));
  }
  for (const p of posts) {
    push("blog", p, p.title, p.isPublished, scoreBlogSeo({
      title: p.title,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      excerpt: p.excerpt,
      content: p.content,
      featuredImage: p.featuredImage,
      author: p.author,
      categoryCount: p._count.categories,
      tagCount: p._count.tags,
      isPublished: p.isPublished,
    }));
  }
  return out;
}

/** Failing checks, heaviest first. */
export function failedChecks(result: SeoScoreResult): string[] {
  return result.checks
    .filter((c) => c.status === "fail")
    .sort((a, b) => b.weight - a.weight)
    .map((c) => c.label);
}

export function indexByPath(records: ContentRecord[]): Map<string, ContentRecord> {
  const map = new Map<string, ContentRecord>();
  for (const r of records) map.set(r.path, r);
  return map;
}
