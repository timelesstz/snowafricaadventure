import { cache } from "react";
import prisma from "@/lib/prisma";

export type LinkMapEntry = {
  phrase: string;
  href: string;
  priority: number;
};

export const getInternalLinkMap = cache(async function getInternalLinkMap(): Promise<LinkMapEntry[]> {
  const [destinations, trekkingRoutes] = await Promise.all([
    prisma.destination.findMany({
      where: { isActive: true },
      select: { name: true, slug: true },
      orderBy: { name: "desc" },
    }),
    prisma.trekkingRoute.findMany({
      where: { isActive: true },
      select: { title: true, slug: true },
      orderBy: { title: "desc" },
    }),
  ]);

  const entries: LinkMapEntry[] = [];

  // Destinations: use the destination name as the phrase
  for (const dest of destinations) {
    entries.push({
      phrase: dest.name,
      href: `/tanzania-destinations/${dest.slug}/`,
      priority: 1,
    });
  }

  // Trekking routes: extract just the route name (e.g., "Lemosho Route" from "8 Days Lemosho Route")
  for (const route of trekkingRoutes) {
    // Strip leading "X Days " or "X Day " prefix to get the clean route name
    const routeName = route.title.replace(/^\d+\s+Days?\s+/i, "");
    entries.push({
      phrase: routeName,
      href: `/trekking/${route.slug}/`,
      priority: 2,
    });
  }

  // Static entries for key pages
  const routePhrases = new Set(entries.map((e) => e.phrase.toLowerCase()));

  entries.push({
    phrase: "climb Kilimanjaro",
    href: "/trekking/",
    priority: 3,
  });

  if (!routePhrases.has("mount kilimanjaro")) {
    entries.push({
      phrase: "Mount Kilimanjaro",
      href: "/mount-kilimanjaro/",
      priority: 3,
    });
  }

  entries.push({
    phrase: "Tanzania safaris",
    href: "/tanzania-safaris/",
    priority: 3,
  });

  entries.push({
    phrase: "Tanzania safari",
    href: "/tanzania-safaris/",
    priority: 3,
  });

  entries.push({
    phrase: "Great Migration",
    href: "/great-wildebeest-migration/",
    priority: 3,
  });

  entries.push({
    phrase: "group departures",
    href: "/kilimanjaro-join-group-departures/",
    priority: 3,
  });

  entries.push({
    phrase: "group departure",
    href: "/kilimanjaro-join-group-departures/",
    priority: 3,
  });

  // Sort by phrase length descending (longest match first)
  entries.sort((a, b) => b.phrase.length - a.phrase.length);

  // Filter out very short phrases (less than 4 characters)
  return entries.filter((entry) => entry.phrase.length >= 4);
});
