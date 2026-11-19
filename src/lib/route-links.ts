import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export interface TripLink {
  href: string;
  label: string;
}

/**
 * Live Kilimanjaro route pages, shortest first. Used for the footer link
 * group and the in-article route list, so every route page is one hop from
 * every page on the site. Read from the DB (not a hardcoded list) so a route
 * that is unpublished drops out of the links on the next revalidation.
 */
export const getKilimanjaroRouteLinks = unstable_cache(
  async (): Promise<TripLink[]> => {
    try {
      const rows = await prisma.trekkingRoute.findMany({
        where: { isActive: true, mountain: "KILIMANJARO" },
        orderBy: [{ durationDays: "asc" }, { title: "asc" }],
        select: { slug: true, title: true },
      });
      return rows.map((r) => ({ href: `/trekking/${r.slug}/`, label: r.title }));
    } catch (error) {
      // Links are secondary: the page must still render if this fails.
      console.error("[route-links] Failed to fetch Kilimanjaro routes:", error);
      return [];
    }
  },
  ["kilimanjaro-route-links"],
  { revalidate: 3600 }
);

/** Live safari package pages, shortest first. */
export const getSafariPackageLinks = unstable_cache(
  async (): Promise<TripLink[]> => {
    try {
      const rows = await prisma.safariPackage.findMany({
        where: { isActive: true },
        orderBy: [{ durationDays: "asc" }, { title: "asc" }],
        select: { slug: true, title: true },
      });
      return rows.map((r) => ({ href: `/tanzania-safaris/${r.slug}/`, label: r.title }));
    } catch (error) {
      console.error("[route-links] Failed to fetch safari packages:", error);
      return [];
    }
  },
  ["safari-package-links"],
  { revalidate: 3600 }
);
