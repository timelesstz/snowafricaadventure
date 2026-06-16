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

  entries.push({
    phrase: "Tanzania weather",
    href: "/weather-in-tanzania/",
    priority: 3,
  });

  entries.push({
    phrase: "Kilimanjaro height",
    href: "/mount-kilimanjaro-height/",
    priority: 3,
  });

  entries.push({
    phrase: "height of Kilimanjaro",
    href: "/mount-kilimanjaro-height/",
    priority: 3,
  });

  entries.push({
    phrase: "Kilimanjaro elevation",
    href: "/mount-kilimanjaro-height/",
    priority: 3,
  });

  entries.push({
    phrase: "Kilimanjaro difficulty",
    href: "/how-hard-is-kilimanjaro/",
    priority: 3,
  });

  entries.push({
    phrase: "best time for safari",
    href: "/best-time-to-go-on-safari-in-africa/",
    priority: 3,
  });

  entries.push({
    phrase: "best time to visit Tanzania",
    href: "/best-time-to-visit-tanzania-for-safari/",
    priority: 3,
  });

  entries.push({
    phrase: "Mount Meru",
    href: "/climbing-mount-meru/",
    priority: 3,
  });

  entries.push({
    phrase: "wildebeest migration",
    href: "/great-wildebeest-migration/",
    priority: 3,
  });

  entries.push({
    phrase: "Kilimanjaro routes",
    href: "/kilimanjaro-climbing-routes/",
    priority: 3,
  });

  entries.push({
    phrase: "Kilimanjaro packing list",
    href: "/the-ultimate-kilimanjaro-packing-list/",
    priority: 3,
  });

  entries.push({
    phrase: "what to pack for Kilimanjaro",
    href: "/the-ultimate-kilimanjaro-packing-list/",
    priority: 3,
  });

  entries.push({
    phrase: "Lemosho route",
    href: "/kilimanjaro-lemosho-route-8-days-guide/",
    priority: 3,
  });

  entries.push({
    phrase: "Tanzania national parks",
    href: "/tanzania-national-parks-guide/",
    priority: 3,
  });

  entries.push({
    phrase: "beach holidays in Tanzania",
    href: "/tanzania-beach-holidays/",
    priority: 3,
  });

  // Sort by phrase length descending (longest match first)
  entries.sort((a, b) => b.phrase.length - a.phrase.length);

  // Filter out very short phrases (less than 4 characters)
  return entries.filter((entry) => entry.phrase.length >= 4);
});
