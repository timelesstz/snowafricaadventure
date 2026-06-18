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
    href: "/trekking/4-days-mount-meru-climbing/",
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

  // Kilimanjaro informational pages
  entries.push(
    { phrase: "altitude sickness", href: "/kilimanjaro-altitude-sickness/", priority: 3 },
    { phrase: "Kilimanjaro training", href: "/kilimanjaro-training-plan/", priority: 3 },
    { phrase: "training plan", href: "/kilimanjaro-training-plan/", priority: 3 },
    { phrase: "Kilimanjaro gear", href: "/kilimanjaro-climbing-gear/", priority: 3 },
    { phrase: "Kilimanjaro prices", href: "/kilimanjaro-prices/", priority: 3 },
    { phrase: "cost of climbing Kilimanjaro", href: "/kilimanjaro-prices/", priority: 3 },
    { phrase: "Kilimanjaro weather", href: "/kilimanjaro-weather/", priority: 3 },
    { phrase: "climate zones", href: "/kilimanjaro-climate-zones/", priority: 3 },
    { phrase: "Kilimanjaro glaciers", href: "/kilimanjaro-glaciers/", priority: 3 },
    { phrase: "Kilimanjaro safety", href: "/kilimanjaro-safety/", priority: 3 },
    { phrase: "Kilimanjaro deaths", href: "/kilimanjaro-deaths/", priority: 3 },
    { phrase: "Kilimanjaro records", href: "/kilimanjaro-records/", priority: 3 },
    { phrase: "Kilimanjaro tipping", href: "/kilimanjaro-tipping-guide/", priority: 3 },
    { phrase: "tipping guide", href: "/kilimanjaro-tipping-guide/", priority: 3 },
    { phrase: "travel insurance", href: "/kilimanjaro-travel-insurance/", priority: 3 },
    { phrase: "Tanzania visa", href: "/kilimanjaro-visa-tanzania/", priority: 3 },
    { phrase: "Kilimanjaro airport", href: "/kilimanjaro-airport-guide/", priority: 3 },
    { phrase: "JRO airport", href: "/kilimanjaro-airport-guide/", priority: 3 },
    { phrase: "Kilimanjaro day hike", href: "/kilimanjaro-day-hike/", priority: 3 },
    { phrase: "women climbing Kilimanjaro", href: "/kilimanjaro-women-climbing/", priority: 3 },
    { phrase: "solo climb", href: "/kilimanjaro-solo-climb/", priority: 3 },
    { phrase: "age limit", href: "/kilimanjaro-age-limits/", priority: 3 },
    { phrase: "Kilimanjaro food", href: "/kilimanjaro-food-meals/", priority: 3 },
    { phrase: "meals on Kilimanjaro", href: "/kilimanjaro-food-meals/", priority: 3 },
    { phrase: "Kilimanjaro map", href: "/kilimanjaro-map/", priority: 3 },
    { phrase: "success rate", href: "/kilimanjaro-success-rates/", priority: 3 },
    { phrase: "success rates", href: "/kilimanjaro-success-rates/", priority: 3 },
    { phrase: "Kilimanjaro statistics", href: "/kilimanjaro-statistics/", priority: 3 },
    { phrase: "Barranco Wall", href: "/kilimanjaro-barranco-wall/", priority: 3 },
    { phrase: "Shira Plateau", href: "/kilimanjaro-shira-plateau/", priority: 3 },
    { phrase: "Kilimanjaro and safari", href: "/kilimanjaro-safari-combo/", priority: 3 },
    { phrase: "safari combo", href: "/kilimanjaro-safari-combo/", priority: 3 },
    { phrase: "beginners climb Kilimanjaro", href: "/can-beginners-climb-kilimanjaro/", priority: 3 },
    { phrase: "best route to climb Kilimanjaro", href: "/best-route-to-climb-kilimanjaro/", priority: 3 },
    { phrase: "best time to climb Kilimanjaro", href: "/best-time-to-climb-kilimanjaro/", priority: 3 },
  );

  // Blog post phrases — natural language triggers
  entries.push(
    { phrase: "meaning of Kilimanjaro", href: "/kilimanjaro-meaning-name-origin/", priority: 3 },
    { phrase: "name Kilimanjaro", href: "/kilimanjaro-meaning-name-origin/", priority: 4 },
    { phrase: "where is Kilimanjaro", href: "/where-is-mount-kilimanjaro/", priority: 3 },
    { phrase: "Kilimanjaro location", href: "/where-is-mount-kilimanjaro/", priority: 3 },
    { phrase: "fun facts about Kilimanjaro", href: "/kilimanjaro-fun-facts/", priority: 3 },
    { phrase: "Kilimanjaro vs Mount Kenya", href: "/kilimanjaro-vs-mount-kenya/", priority: 3 },
    { phrase: "Kilimanjaro vs Meru", href: "/kilimanjaro-vs-mount-meru/", priority: 3 },
    { phrase: "Mount Meru acclimatization", href: "/kilimanjaro-vs-mount-meru/", priority: 3 },
    { phrase: "first person to climb Kilimanjaro", href: "/first-person-to-climb-kilimanjaro/", priority: 3 },
    { phrase: "Hans Meyer", href: "/first-person-to-climb-kilimanjaro/", priority: 3 },
    { phrase: "climbing over 50", href: "/climbing-kilimanjaro-over-50/", priority: 3 },
    { phrase: "over 50", href: "/climbing-kilimanjaro-over-50/", priority: 4 },
    { phrase: "Kilimanjaro safari", href: "/kilimanjaro-safari-combo/", priority: 3 },
    { phrase: "death rate", href: "/kilimanjaro-deaths/", priority: 4 },
    { phrase: "how safe is Kilimanjaro", href: "/kilimanjaro-safety/", priority: 3 },
    { phrase: "Kilimanjaro insurance", href: "/kilimanjaro-travel-insurance/", priority: 3 },
    { phrase: "toilets on Kilimanjaro", href: "/kilimanjaro-hygiene/", priority: 3 },
    { phrase: "Kilimanjaro hygiene", href: "/kilimanjaro-hygiene/", priority: 3 },
    { phrase: "honeymoon Kilimanjaro", href: "/kilimanjaro-honeymoon/", priority: 3 },
    { phrase: "Kilimanjaro paragliding", href: "/kilimanjaro-paragliding/", priority: 3 },
    { phrase: "climbing companies", href: "/kilimanjaro-climbing-companies/", priority: 3 },
    { phrase: "climb from USA", href: "/climb-kilimanjaro-from-usa/", priority: 3 },
    { phrase: "climb from the USA", href: "/climb-kilimanjaro-from-usa/", priority: 3 },
    { phrase: "American climbers", href: "/climb-kilimanjaro-from-usa/", priority: 3 },
    { phrase: "Kilimanjaro difficulty", href: "/how-hard-is-kilimanjaro/", priority: 3 },
    { phrase: "Uhuru Peak", href: "/kilimanjaro-uhuru-peak/", priority: 3 },
    { phrase: "5,895 metres", href: "/mount-kilimanjaro-height/", priority: 4 },
    { phrase: "5,895m", href: "/mount-kilimanjaro-height/", priority: 4 },
    { phrase: "19,341 feet", href: "/mount-kilimanjaro-height/", priority: 4 },
    { phrase: "roof of Africa", href: "/kilimanjaro-uhuru-peak/", priority: 4 },
    { phrase: "packing list", href: "/kilimanjaro-climbing-gear/", priority: 3 },
    { phrase: "gear list", href: "/kilimanjaro-climbing-gear/", priority: 3 },
    { phrase: "summit night", href: "/kilimanjaro-summit-night/", priority: 3 },
    { phrase: "midnight summit push", href: "/kilimanjaro-summit-night/", priority: 3 },
    { phrase: "Kilimanjaro porters", href: "/kilimanjaro-porters/", priority: 3 },
    { phrase: "porters on Kilimanjaro", href: "/kilimanjaro-porters/", priority: 3 },
    { phrase: "acclimatization", href: "/kilimanjaro-acclimatization/", priority: 3 },
    { phrase: "climb high sleep low", href: "/kilimanjaro-acclimatization/", priority: 3 },
    { phrase: "Lemosho vs Machame", href: "/kilimanjaro-lemosho-vs-machame/", priority: 3 },
    { phrase: "Machame vs Lemosho", href: "/kilimanjaro-lemosho-vs-machame/", priority: 3 },
    { phrase: "Machame vs Rongai", href: "/kilimanjaro-machame-vs-rongai/", priority: 3 },
    { phrase: "Rongai vs Machame", href: "/kilimanjaro-machame-vs-rongai/", priority: 3 },
    { phrase: "Northern Circuit", href: "/kilimanjaro-northern-circuit/", priority: 3 },
    { phrase: "camping on Kilimanjaro", href: "/kilimanjaro-camping/", priority: 3 },
    { phrase: "Kilimanjaro camps", href: "/kilimanjaro-camping/", priority: 3 },
    { phrase: "Crater Camp", href: "/kilimanjaro-crater-camp/", priority: 3 },
    { phrase: "crater camp", href: "/kilimanjaro-crater-camp/", priority: 3 },
    { phrase: "full moon climb", href: "/kilimanjaro-full-moon-climb/", priority: 3 },
    { phrase: "full moon summit", href: "/kilimanjaro-full-moon-climb/", priority: 3 },
    { phrase: "Kilimanjaro photography", href: "/kilimanjaro-photography-guide/", priority: 3 },
    { phrase: "fitness test", href: "/kilimanjaro-fitness-test/", priority: 3 },
    { phrase: "fit enough to climb", href: "/kilimanjaro-fitness-test/", priority: 3 },
    { phrase: "Marangu route", href: "/kilimanjaro-marangu-route-guide/", priority: 3 },
    { phrase: "Coca-Cola Route", href: "/kilimanjaro-marangu-route-guide/", priority: 3 },
    { phrase: "Umbwe route", href: "/kilimanjaro-umbwe-route/", priority: 3 },
    { phrase: "Rongai route", href: "/kilimanjaro-rongai-route-guide/", priority: 3 },
    { phrase: "what to expect on Kilimanjaro", href: "/kilimanjaro-what-to-expect/", priority: 3 },
    { phrase: "typical day on Kilimanjaro", href: "/kilimanjaro-what-to-expect/", priority: 3 },
    { phrase: "Kilimanjaro budget", href: "/kilimanjaro-budget-guide/", priority: 3 },
    { phrase: "Kilimanjaro cost breakdown", href: "/kilimanjaro-budget-guide/", priority: 3 },
    { phrase: "group vs private", href: "/kilimanjaro-group-vs-private/", priority: 3 },
    { phrase: "private climb", href: "/kilimanjaro-group-vs-private/", priority: 3 },
    { phrase: "packing mistakes", href: "/kilimanjaro-packing-mistakes/", priority: 3 },
    { phrase: "after the summit", href: "/kilimanjaro-after-summit/", priority: 3 },
    { phrase: "post-summit recovery", href: "/kilimanjaro-after-summit/", priority: 3 },
    { phrase: "Kilimanjaro wildlife", href: "/kilimanjaro-wildlife/", priority: 3 },
    { phrase: "animals on Kilimanjaro", href: "/kilimanjaro-wildlife/", priority: 3 },
    { phrase: "monkeys on Kilimanjaro", href: "/kilimanjaro-wildlife/", priority: 3 },
    { phrase: "Kilimanjaro vs Everest", href: "/kilimanjaro-vs-everest-base-camp/", priority: 3 },
    { phrase: "Everest Base Camp", href: "/kilimanjaro-vs-everest-base-camp/", priority: 3 },
    { phrase: "rainy season", href: "/kilimanjaro-rainy-season/", priority: 4 },
    { phrase: "climbing in the rain", href: "/kilimanjaro-rainy-season/", priority: 3 },
    { phrase: "Kilimanjaro with kids", href: "/kilimanjaro-with-kids/", priority: 3 },
    { phrase: "family Kilimanjaro", href: "/kilimanjaro-with-kids/", priority: 3 },
    { phrase: "children climb Kilimanjaro", href: "/kilimanjaro-with-kids/", priority: 3 },
    { phrase: "drinking water on Kilimanjaro", href: "/kilimanjaro-drinking-water/", priority: 3 },
    { phrase: "hydration on Kilimanjaro", href: "/kilimanjaro-drinking-water/", priority: 3 },
    { phrase: "water purification", href: "/kilimanjaro-drinking-water/", priority: 4 },
    { phrase: "summit certificate", href: "/kilimanjaro-certificates/", priority: 3 },
    { phrase: "Kilimanjaro certificate", href: "/kilimanjaro-certificates/", priority: 3 },
    { phrase: "night sky on Kilimanjaro", href: "/kilimanjaro-night-sky/", priority: 3 },
    { phrase: "stargazing on Kilimanjaro", href: "/kilimanjaro-night-sky/", priority: 3 },
    { phrase: "Milky Way Kilimanjaro", href: "/kilimanjaro-night-sky/", priority: 3 },
    { phrase: "trail running Kilimanjaro", href: "/kilimanjaro-trail-running/", priority: 3 },
    { phrase: "Kilimanjaro speed record", href: "/kilimanjaro-trail-running/", priority: 3 },
    { phrase: "fastest Kilimanjaro climb", href: "/kilimanjaro-trail-running/", priority: 3 },

    // Batch 11
    { phrase: "Kilimanjaro myths", href: "/kilimanjaro-myths/", priority: 3 },
    { phrase: "myths about Kilimanjaro", href: "/kilimanjaro-myths/", priority: 3 },
    { phrase: "Kilimanjaro misconceptions", href: "/kilimanjaro-myths/", priority: 3 },
    { phrase: "phone signal on Kilimanjaro", href: "/kilimanjaro-phone-signal/", priority: 3 },
    { phrase: "cell coverage Kilimanjaro", href: "/kilimanjaro-phone-signal/", priority: 3 },
    { phrase: "charging phone on Kilimanjaro", href: "/kilimanjaro-phone-signal/", priority: 3 },
    { phrase: "satellite communicator", href: "/kilimanjaro-phone-signal/", priority: 4 },
    { phrase: "sleeping on Kilimanjaro", href: "/kilimanjaro-sleeping-tips/", priority: 3 },
    { phrase: "sleep at altitude", href: "/kilimanjaro-sleeping-tips/", priority: 3 },
    { phrase: "periodic breathing", href: "/kilimanjaro-sleeping-tips/", priority: 3 },
    { phrase: "Cheyne-Stokes", href: "/kilimanjaro-sleeping-tips/", priority: 3 },
    { phrase: "weight loss Kilimanjaro", href: "/kilimanjaro-weight-loss/", priority: 3 },
    { phrase: "calories burned Kilimanjaro", href: "/kilimanjaro-weight-loss/", priority: 3 },
    { phrase: "how much weight", href: "/kilimanjaro-weight-loss/", priority: 4 },

    // Batch 12
    { phrase: "charity climb", href: "/kilimanjaro-volunteering/", priority: 3 },
    { phrase: "volunteering Kilimanjaro", href: "/kilimanjaro-volunteering/", priority: 3 },
    { phrase: "fundraising climb", href: "/kilimanjaro-volunteering/", priority: 3 },
    { phrase: "give back Kilimanjaro", href: "/kilimanjaro-volunteering/", priority: 3 },
    { phrase: "propose on Kilimanjaro", href: "/kilimanjaro-proposals/", priority: 3 },
    { phrase: "Kilimanjaro proposal", href: "/kilimanjaro-proposals/", priority: 3 },
    { phrase: "summit proposal", href: "/kilimanjaro-proposals/", priority: 3 },
    { phrase: "mental preparation", href: "/kilimanjaro-mental-preparation/", priority: 3 },
    { phrase: "mental challenge Kilimanjaro", href: "/kilimanjaro-mental-preparation/", priority: 3 },
    { phrase: "Kilimanjaro mindset", href: "/kilimanjaro-mental-preparation/", priority: 3 },
    { phrase: "summit sunrise", href: "/kilimanjaro-summit-sunrise/", priority: 3 },
    { phrase: "Kilimanjaro sunrise", href: "/kilimanjaro-summit-sunrise/", priority: 3 },
    { phrase: "sunrise from Stella Point", href: "/kilimanjaro-summit-sunrise/", priority: 3 },

    // Batch 13
    { phrase: "rescue on Kilimanjaro", href: "/kilimanjaro-rescue-evacuation/", priority: 3 },
    { phrase: "helicopter evacuation", href: "/kilimanjaro-rescue-evacuation/", priority: 3 },
    { phrase: "emergency evacuation Kilimanjaro", href: "/kilimanjaro-rescue-evacuation/", priority: 3 },
    { phrase: "Kilimanjaro plants", href: "/kilimanjaro-flora/", priority: 3 },
    { phrase: "flora on Kilimanjaro", href: "/kilimanjaro-flora/", priority: 3 },
    { phrase: "giant groundsel", href: "/kilimanjaro-flora/", priority: 3 },
    { phrase: "giant lobelia", href: "/kilimanjaro-flora/", priority: 3 },
    { phrase: "Kilimanjaro diary", href: "/kilimanjaro-diary/", priority: 3 },
    { phrase: "day by day Kilimanjaro", href: "/kilimanjaro-diary/", priority: 3 },
    { phrase: "what to expect each day", href: "/kilimanjaro-diary/", priority: 4 },
    { phrase: "Kilimanjaro vs Rainier", href: "/kilimanjaro-vs-rainier/", priority: 3 },
    { phrase: "Mount Rainier comparison", href: "/kilimanjaro-vs-rainier/", priority: 3 },

    // Batch 14
    { phrase: "climbing as a couple", href: "/kilimanjaro-for-couples/", priority: 3 },
    { phrase: "Kilimanjaro for couples", href: "/kilimanjaro-for-couples/", priority: 3 },
    { phrase: "couples climb Kilimanjaro", href: "/kilimanjaro-for-couples/", priority: 3 },
    { phrase: "camera gear Kilimanjaro", href: "/kilimanjaro-photography-gear/", priority: 3 },
    { phrase: "photography gear", href: "/kilimanjaro-photography-gear/", priority: 3 },
    { phrase: "GoPro on Kilimanjaro", href: "/kilimanjaro-photography-gear/", priority: 3 },
    { phrase: "drone on Kilimanjaro", href: "/kilimanjaro-photography-gear/", priority: 3 },
    { phrase: "climbing Kilimanjaro again", href: "/kilimanjaro-returning-climbers/", priority: 3 },
    { phrase: "returning climbers", href: "/kilimanjaro-returning-climbers/", priority: 3 },
    { phrase: "second climb", href: "/kilimanjaro-returning-climbers/", priority: 3 },
    { phrase: "repeat climber", href: "/kilimanjaro-returning-climbers/", priority: 3 },
    { phrase: "corporate team Kilimanjaro", href: "/kilimanjaro-corporate-teams/", priority: 3 },
    { phrase: "team building Kilimanjaro", href: "/kilimanjaro-corporate-teams/", priority: 3 },
    { phrase: "corporate retreat", href: "/kilimanjaro-corporate-teams/", priority: 3 },

    // Batch 15
    { phrase: "oxygen levels on Kilimanjaro", href: "/kilimanjaro-oxygen-levels/", priority: 3 },
    { phrase: "oxygen at altitude", href: "/kilimanjaro-oxygen-levels/", priority: 3 },
    { phrase: "SpO2 on Kilimanjaro", href: "/kilimanjaro-oxygen-levels/", priority: 3 },
    { phrase: "pulse oximeter", href: "/kilimanjaro-oxygen-levels/", priority: 3 },
    { phrase: "supplemental oxygen", href: "/kilimanjaro-oxygen-levels/", priority: 3 },
    { phrase: "luxury Kilimanjaro", href: "/kilimanjaro-luxury-climb/", priority: 3 },
    { phrase: "luxury climb", href: "/kilimanjaro-luxury-climb/", priority: 3 },
    { phrase: "premium Kilimanjaro", href: "/kilimanjaro-luxury-climb/", priority: 3 },
    { phrase: "glamping Kilimanjaro", href: "/kilimanjaro-luxury-climb/", priority: 3 },
    { phrase: "trekking poles", href: "/kilimanjaro-trekking-poles/", priority: 3 },
    { phrase: "walking poles", href: "/kilimanjaro-trekking-poles/", priority: 3 },
    { phrase: "hiking poles Kilimanjaro", href: "/kilimanjaro-trekking-poles/", priority: 3 },
    { phrase: "what to wear on Kilimanjaro", href: "/kilimanjaro-layering-system/", priority: 3 },
    { phrase: "layering system", href: "/kilimanjaro-layering-system/", priority: 3 },
    { phrase: "clothing for Kilimanjaro", href: "/kilimanjaro-layering-system/", priority: 3 },
    { phrase: "base layer", href: "/kilimanjaro-layering-system/", priority: 4 },

    // Batch 16
    { phrase: "headlamp for Kilimanjaro", href: "/kilimanjaro-headlamp-guide/", priority: 3 },
    { phrase: "best headlamp", href: "/kilimanjaro-headlamp-guide/", priority: 4 },
    { phrase: "summit night headlamp", href: "/kilimanjaro-headlamp-guide/", priority: 3 },
    { phrase: "snacks for Kilimanjaro", href: "/kilimanjaro-snacks-energy/", priority: 3 },
    { phrase: "energy food Kilimanjaro", href: "/kilimanjaro-snacks-energy/", priority: 3 },
    { phrase: "what snacks to bring", href: "/kilimanjaro-snacks-energy/", priority: 3 },
    { phrase: "calories on Kilimanjaro", href: "/kilimanjaro-snacks-energy/", priority: 3 },
    { phrase: "descending Kilimanjaro", href: "/kilimanjaro-descent-tips/", priority: 3 },
    { phrase: "Kilimanjaro descent", href: "/kilimanjaro-descent-tips/", priority: 3 },
    { phrase: "knee pain Kilimanjaro", href: "/kilimanjaro-descent-tips/", priority: 3 },
    { phrase: "Mweka route", href: "/kilimanjaro-descent-tips/", priority: 3 },
    { phrase: "stretching for Kilimanjaro", href: "/kilimanjaro-stretching-guide/", priority: 3 },
    { phrase: "Kilimanjaro stretches", href: "/kilimanjaro-stretching-guide/", priority: 3 },
    { phrase: "pre-trek stretching", href: "/kilimanjaro-stretching-guide/", priority: 3 },

    // Batch 17
    { phrase: "hiking boots for Kilimanjaro", href: "/kilimanjaro-boots-guide/", priority: 3 },
    { phrase: "Kilimanjaro boots", href: "/kilimanjaro-boots-guide/", priority: 3 },
    { phrase: "break in boots", href: "/kilimanjaro-boots-guide/", priority: 4 },
    { phrase: "sleeping bag for Kilimanjaro", href: "/kilimanjaro-sleeping-bags/", priority: 3 },
    { phrase: "Kilimanjaro sleeping bag", href: "/kilimanjaro-sleeping-bags/", priority: 3 },
    { phrase: "temperature rating", href: "/kilimanjaro-sleeping-bags/", priority: 4 },
    { phrase: "daypack for Kilimanjaro", href: "/kilimanjaro-backpack-daypack/", priority: 3 },
    { phrase: "Kilimanjaro daypack", href: "/kilimanjaro-backpack-daypack/", priority: 3 },
    { phrase: "what to carry in daypack", href: "/kilimanjaro-backpack-daypack/", priority: 3 },
    { phrase: "porter duffel", href: "/kilimanjaro-backpack-daypack/", priority: 4 },
    { phrase: "sun protection Kilimanjaro", href: "/kilimanjaro-sun-protection/", priority: 3 },
    { phrase: "sunscreen for Kilimanjaro", href: "/kilimanjaro-sun-protection/", priority: 3 },
    { phrase: "UV on Kilimanjaro", href: "/kilimanjaro-sun-protection/", priority: 3 },
    { phrase: "snow blindness", href: "/kilimanjaro-sun-protection/", priority: 4 },

    // Batch 18
    { phrase: "post-climb recovery", href: "/kilimanjaro-post-climb-recovery/", priority: 3 },
    { phrase: "recovery after Kilimanjaro", href: "/kilimanjaro-post-climb-recovery/", priority: 3 },
    { phrase: "recovery after summit", href: "/kilimanjaro-post-climb-recovery/", priority: 4 },
    { phrase: "muscle soreness Kilimanjaro", href: "/kilimanjaro-post-climb-recovery/", priority: 4 },
    { phrase: "black toenails Kilimanjaro", href: "/kilimanjaro-post-climb-recovery/", priority: 4 },
    { phrase: "post-summit blues", href: "/kilimanjaro-post-climb-recovery/", priority: 4 },
    { phrase: "vegan Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 3 },
    { phrase: "vegetarian Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 3 },
    { phrase: "plant-based Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 3 },
    { phrase: "vegan meals on Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 3 },
    { phrase: "vegetarian meals on Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 3 },
    { phrase: "dietary requirements Kilimanjaro", href: "/kilimanjaro-for-vegans/", priority: 4 },
    { phrase: "Christmas Kilimanjaro", href: "/kilimanjaro-christmas-new-year/", priority: 3 },
    { phrase: "New Year Kilimanjaro", href: "/kilimanjaro-christmas-new-year/", priority: 3 },
    { phrase: "climb Kilimanjaro at Christmas", href: "/kilimanjaro-christmas-new-year/", priority: 3 },
    { phrase: "New Year's Eve summit", href: "/kilimanjaro-christmas-new-year/", priority: 3 },
    { phrase: "festive season Kilimanjaro", href: "/kilimanjaro-christmas-new-year/", priority: 4 },
    { phrase: "December Kilimanjaro", href: "/kilimanjaro-christmas-new-year/", priority: 4 },
    { phrase: "Kilimanjaro vs Elbrus", href: "/kilimanjaro-vs-elbrus/", priority: 3 },
    { phrase: "Elbrus vs Kilimanjaro", href: "/kilimanjaro-vs-elbrus/", priority: 3 },
    { phrase: "Mount Elbrus comparison", href: "/kilimanjaro-vs-elbrus/", priority: 4 },
    { phrase: "Seven Summits", href: "/kilimanjaro-vs-elbrus/", priority: 5 },

    // Batch 19
    { phrase: "climbing Kilimanjaro from USA", href: "/kilimanjaro-from-usa/", priority: 3 },
    { phrase: "Kilimanjaro from America", href: "/kilimanjaro-from-usa/", priority: 3 },
    { phrase: "flights to Kilimanjaro", href: "/kilimanjaro-from-usa/", priority: 3 },
    { phrase: "American climbers", href: "/kilimanjaro-from-usa/", priority: 4 },
    { phrase: "US to Kilimanjaro", href: "/kilimanjaro-from-usa/", priority: 4 },
    { phrase: "altitude training", href: "/kilimanjaro-altitude-training/", priority: 3 },
    { phrase: "altitude training for Kilimanjaro", href: "/kilimanjaro-altitude-training/", priority: 3 },
    { phrase: "pre-acclimatization", href: "/kilimanjaro-altitude-training/", priority: 3 },
    { phrase: "altitude simulation", href: "/kilimanjaro-altitude-training/", priority: 4 },
    { phrase: "breathing exercises for altitude", href: "/kilimanjaro-altitude-training/", priority: 3 },
    { phrase: "Diamox protocol", href: "/kilimanjaro-altitude-training/", priority: 4 },
    { phrase: "mountain chef", href: "/kilimanjaro-cooking-mountain-chef/", priority: 3 },
    { phrase: "mountain chefs", href: "/kilimanjaro-cooking-mountain-chef/", priority: 3 },
    { phrase: "cooking on Kilimanjaro", href: "/kilimanjaro-cooking-mountain-chef/", priority: 3 },
    { phrase: "Kilimanjaro chef", href: "/kilimanjaro-cooking-mountain-chef/", priority: 3 },
    { phrase: "camp kitchen", href: "/kilimanjaro-cooking-mountain-chef/", priority: 4 },
    { phrase: "first aid kit for Kilimanjaro", href: "/kilimanjaro-first-aid-kit/", priority: 3 },
    { phrase: "Kilimanjaro first aid", href: "/kilimanjaro-first-aid-kit/", priority: 3 },
    { phrase: "blister treatment", href: "/kilimanjaro-first-aid-kit/", priority: 4 },
    { phrase: "Diamox dosage", href: "/kilimanjaro-first-aid-kit/", priority: 4 },
    { phrase: "medical kit Kilimanjaro", href: "/kilimanjaro-first-aid-kit/", priority: 3 },
    { phrase: "altitude medication", href: "/kilimanjaro-first-aid-kit/", priority: 4 },

    // Batch 20
    { phrase: "climbing Kilimanjaro from UK", href: "/kilimanjaro-from-uk/", priority: 3 },
    { phrase: "Kilimanjaro from Britain", href: "/kilimanjaro-from-uk/", priority: 3 },
    { phrase: "British climbers Kilimanjaro", href: "/kilimanjaro-from-uk/", priority: 3 },
    { phrase: "flights from London to Kilimanjaro", href: "/kilimanjaro-from-uk/", priority: 3 },
    { phrase: "UK to Kilimanjaro", href: "/kilimanjaro-from-uk/", priority: 4 },
    { phrase: "NHS travel clinic", href: "/kilimanjaro-from-uk/", priority: 4 },
    { phrase: "wildlife encounters Kilimanjaro", href: "/kilimanjaro-wildlife-encounters/", priority: 3 },
    { phrase: "animals on each route", href: "/kilimanjaro-wildlife-encounters/", priority: 3 },
    { phrase: "blue monkeys Kilimanjaro", href: "/kilimanjaro-wildlife-encounters/", priority: 3 },
    { phrase: "colobus monkeys Kilimanjaro", href: "/kilimanjaro-wildlife-encounters/", priority: 3 },
    { phrase: "tree hyrax Kilimanjaro", href: "/kilimanjaro-wildlife-encounters/", priority: 4 },
    { phrase: "helicopter rescue Kilimanjaro", href: "/kilimanjaro-helicopter-rescue/", priority: 3 },
    { phrase: "Kilimanjaro helicopter evacuation", href: "/kilimanjaro-helicopter-rescue/", priority: 3 },
    { phrase: "emergency evacuation Kilimanjaro", href: "/kilimanjaro-helicopter-rescue/", priority: 3 },
    { phrase: "AMREF Flying Doctors", href: "/kilimanjaro-helicopter-rescue/", priority: 3 },
    { phrase: "stretcher evacuation", href: "/kilimanjaro-helicopter-rescue/", priority: 4 },
    { phrase: "KINAPA fees", href: "/kilimanjaro-permits-park-fees/", priority: 3 },
    { phrase: "Kilimanjaro park fees", href: "/kilimanjaro-permits-park-fees/", priority: 3 },
    { phrase: "Kilimanjaro permits", href: "/kilimanjaro-permits-park-fees/", priority: 3 },
    { phrase: "conservation fee Kilimanjaro", href: "/kilimanjaro-permits-park-fees/", priority: 3 },
    { phrase: "TANAPA fees", href: "/kilimanjaro-permits-park-fees/", priority: 4 },
    { phrase: "camping fee Kilimanjaro", href: "/kilimanjaro-permits-park-fees/", priority: 4 },

    // Batch 21
    { phrase: "glacier camp Kilimanjaro", href: "/kilimanjaro-glacier-camp/", priority: 3 },
    { phrase: "sleeping beside glaciers", href: "/kilimanjaro-glacier-camp/", priority: 3 },
    { phrase: "Furtwängler Glacier", href: "/kilimanjaro-glacier-camp/", priority: 3 },
    { phrase: "crater overnight", href: "/kilimanjaro-glacier-camp/", priority: 4 },
    { phrase: "highest camp Kilimanjaro", href: "/kilimanjaro-glacier-camp/", priority: 3 },
    { phrase: "clean-up Kilimanjaro", href: "/kilimanjaro-volunteer-clean-up/", priority: 3 },
    { phrase: "Leave No Trace Kilimanjaro", href: "/kilimanjaro-volunteer-clean-up/", priority: 3 },
    { phrase: "waste on Kilimanjaro", href: "/kilimanjaro-volunteer-clean-up/", priority: 3 },
    { phrase: "portable toilet Kilimanjaro", href: "/kilimanjaro-volunteer-clean-up/", priority: 4 },
    { phrase: "environmental impact Kilimanjaro", href: "/kilimanjaro-volunteer-clean-up/", priority: 4 },
    { phrase: "Stella Point", href: "/kilimanjaro-stellas-point/", priority: 3 },
    { phrase: "Stella Point Kilimanjaro", href: "/kilimanjaro-stellas-point/", priority: 3 },
    { phrase: "crater rim Kilimanjaro", href: "/kilimanjaro-stellas-point/", priority: 4 },
    { phrase: "Gilman's Point", href: "/kilimanjaro-stellas-point/", priority: 4 },
    { phrase: "green certificate Kilimanjaro", href: "/kilimanjaro-stellas-point/", priority: 4 },
    { phrase: "acclimatization days", href: "/kilimanjaro-acclimatization-days/", priority: 3 },
    { phrase: "rest days Kilimanjaro", href: "/kilimanjaro-acclimatization-days/", priority: 3 },
    { phrase: "climb high sleep low", href: "/kilimanjaro-acclimatization-days/", priority: 3 },
    { phrase: "acclimatization schedule", href: "/kilimanjaro-acclimatization-days/", priority: 3 },
    { phrase: "SpO2 readings Kilimanjaro", href: "/kilimanjaro-acclimatization-days/", priority: 4 },
    { phrase: "pulse oximeter Kilimanjaro", href: "/kilimanjaro-acclimatization-days/", priority: 4 },

    // Batch 22
    { phrase: "Lava Tower", href: "/kilimanjaro-lava-tower/", priority: 3 },
    { phrase: "Lava Tower Kilimanjaro", href: "/kilimanjaro-lava-tower/", priority: 3 },
    { phrase: "Lava Tower acclimatization", href: "/kilimanjaro-lava-tower/", priority: 3 },
    { phrase: "volcanic plug Kilimanjaro", href: "/kilimanjaro-lava-tower/", priority: 4 },
    { phrase: "Mawenzi Peak", href: "/kilimanjaro-mawenzi-peak/", priority: 3 },
    { phrase: "Mawenzi Tarn", href: "/kilimanjaro-mawenzi-peak/", priority: 3 },
    { phrase: "second summit Kilimanjaro", href: "/kilimanjaro-mawenzi-peak/", priority: 3 },
    { phrase: "three volcanic cones", href: "/kilimanjaro-mawenzi-peak/", priority: 4 },
    { phrase: "the Saddle Kilimanjaro", href: "/kilimanjaro-mawenzi-peak/", priority: 4 },
    { phrase: "Kilimanjaro weather forecast", href: "/kilimanjaro-weather-forecast/", priority: 3 },
    { phrase: "weather forecast Kilimanjaro", href: "/kilimanjaro-weather-forecast/", priority: 3 },
    { phrase: "Kilimanjaro temperature", href: "/kilimanjaro-weather-forecast/", priority: 3 },
    { phrase: "wind chill Kilimanjaro", href: "/kilimanjaro-weather-forecast/", priority: 4 },
    { phrase: "mountain forecast", href: "/kilimanjaro-weather-forecast/", priority: 4 },
    { phrase: "Kilimanjaro gate", href: "/kilimanjaro-gate-to-gate/", priority: 3 },
    { phrase: "Londorossi Gate", href: "/kilimanjaro-gate-to-gate/", priority: 3 },
    { phrase: "Machame Gate", href: "/kilimanjaro-gate-to-gate/", priority: 3 },
    { phrase: "Marangu Gate", href: "/kilimanjaro-gate-to-gate/", priority: 3 },
    { phrase: "Mweka Gate", href: "/kilimanjaro-gate-to-gate/", priority: 3 },
    { phrase: "registration Kilimanjaro", href: "/kilimanjaro-gate-to-gate/", priority: 4 },
    { phrase: "porter weigh-in", href: "/kilimanjaro-gate-to-gate/", priority: 4 },

    // Batch 23
    { phrase: "Kilimanjaro vs Mont Blanc", href: "/kilimanjaro-vs-mont-blanc/", priority: 3 },
    { phrase: "Mont Blanc vs Kilimanjaro", href: "/kilimanjaro-vs-mont-blanc/", priority: 3 },
    { phrase: "Mont Blanc comparison", href: "/kilimanjaro-vs-mont-blanc/", priority: 4 },
    { phrase: "Kilimanjaro or Mont Blanc", href: "/kilimanjaro-vs-mont-blanc/", priority: 3 },
    { phrase: "geology of Kilimanjaro", href: "/kilimanjaro-geology/", priority: 3 },
    { phrase: "Kilimanjaro volcano", href: "/kilimanjaro-geology/", priority: 3 },
    { phrase: "stratovolcano", href: "/kilimanjaro-geology/", priority: 4 },
    { phrase: "volcanic formation Kilimanjaro", href: "/kilimanjaro-geology/", priority: 3 },
    { phrase: "Reusch Crater", href: "/kilimanjaro-geology/", priority: 4 },
    { phrase: "Ash Pit Kilimanjaro", href: "/kilimanjaro-geology/", priority: 4 },
    { phrase: "disabled climbers Kilimanjaro", href: "/kilimanjaro-disabled-climbers/", priority: 3 },
    { phrase: "climbing Kilimanjaro with disability", href: "/kilimanjaro-disabled-climbers/", priority: 3 },
    { phrase: "wheelchair Kilimanjaro", href: "/kilimanjaro-disabled-climbers/", priority: 3 },
    { phrase: "blind climbers Kilimanjaro", href: "/kilimanjaro-disabled-climbers/", priority: 3 },
    { phrase: "inclusive Kilimanjaro", href: "/kilimanjaro-disabled-climbers/", priority: 4 },
    { phrase: "history of Kilimanjaro", href: "/kilimanjaro-history-timeline/", priority: 3 },
    { phrase: "Kilimanjaro history", href: "/kilimanjaro-history-timeline/", priority: 3 },
    { phrase: "Hans Meyer Kilimanjaro", href: "/kilimanjaro-history-timeline/", priority: 3 },
    { phrase: "Chagga people", href: "/kilimanjaro-history-timeline/", priority: 4 },
    { phrase: "Yohani Kinyala Lauwo", href: "/kilimanjaro-history-timeline/", priority: 4 },
    { phrase: "Uhuru Peak history", href: "/kilimanjaro-history-timeline/", priority: 4 },

    // Batch 24
    { phrase: "Arusha city guide", href: "/kilimanjaro-arusha-guide/", priority: 3 },
    { phrase: "hotels in Arusha", href: "/kilimanjaro-arusha-guide/", priority: 3 },
    { phrase: "where to stay in Arusha", href: "/kilimanjaro-arusha-guide/", priority: 3 },
    { phrase: "restaurants in Arusha", href: "/kilimanjaro-arusha-guide/", priority: 4 },
    { phrase: "things to do in Arusha", href: "/kilimanjaro-arusha-guide/", priority: 3 },
    { phrase: "group dynamics Kilimanjaro", href: "/kilimanjaro-group-dynamics/", priority: 3 },
    { phrase: "climbing team Kilimanjaro", href: "/kilimanjaro-group-dynamics/", priority: 3 },
    { phrase: "pace differences Kilimanjaro", href: "/kilimanjaro-group-dynamics/", priority: 4 },
    { phrase: "group size Kilimanjaro", href: "/kilimanjaro-group-dynamics/", priority: 4 },
    { phrase: "drone on Kilimanjaro", href: "/kilimanjaro-drone-rules/", priority: 3 },
    { phrase: "drone rules Kilimanjaro", href: "/kilimanjaro-drone-rules/", priority: 3 },
    { phrase: "fly a drone on Kilimanjaro", href: "/kilimanjaro-drone-rules/", priority: 3 },
    { phrase: "TANAPA filming permit", href: "/kilimanjaro-drone-rules/", priority: 4 },
    { phrase: "charity climb Kilimanjaro", href: "/kilimanjaro-charity-climbs/", priority: 3 },
    { phrase: "fundraising Kilimanjaro", href: "/kilimanjaro-charity-climbs/", priority: 3 },
    { phrase: "charity Kilimanjaro climb", href: "/kilimanjaro-charity-climbs/", priority: 3 },
    { phrase: "fundraising challenge", href: "/kilimanjaro-charity-climbs/", priority: 4 },
    { phrase: "JustGiving Kilimanjaro", href: "/kilimanjaro-charity-climbs/", priority: 4 },

    // Guides page
    { phrase: "our Kilimanjaro guides", href: "/our-kilimanjaro-guides/", priority: 3 },
    { phrase: "Kilimanjaro guide team", href: "/our-kilimanjaro-guides/", priority: 3 },
    { phrase: "WFR-certified guides", href: "/our-kilimanjaro-guides/", priority: 3 },
    { phrase: "porter welfare", href: "/our-kilimanjaro-guides/", priority: 3 },
    { phrase: "guide-to-climber ratio", href: "/our-kilimanjaro-guides/", priority: 4 },

    // Batch 25-26
    { phrase: "Kilimanjaro National Park", href: "/kilimanjaro-national-park/", priority: 2 },
    { phrase: "KINAPA", href: "/kilimanjaro-national-park/", priority: 3 },
    { phrase: "park fees Kilimanjaro", href: "/kilimanjaro-national-park/", priority: 3 },
    { phrase: "UNESCO World Heritage", href: "/kilimanjaro-national-park/", priority: 3 },
    { phrase: "Kilimanjaro entry gates", href: "/kilimanjaro-national-park/", priority: 4 },
    { phrase: "Seven Summits", href: "/kilimanjaro-seven-summits/", priority: 3 },
    { phrase: "seven summits challenge", href: "/kilimanjaro-seven-summits/", priority: 3 },
    { phrase: "Kilimanjaro Seven Summits", href: "/kilimanjaro-seven-summits/", priority: 3 },
    { phrase: "Bass list", href: "/kilimanjaro-seven-summits/", priority: 4 },
    { phrase: "Messner list", href: "/kilimanjaro-seven-summits/", priority: 4 },
    { phrase: "Kilimanjaro climbing season", href: "/kilimanjaro-climbing-season/", priority: 3 },
    { phrase: "best month to climb Kilimanjaro", href: "/kilimanjaro-climbing-season/", priority: 3 },
    { phrase: "dry season Kilimanjaro", href: "/kilimanjaro-climbing-season/", priority: 3 },
    { phrase: "rainy season on Kilimanjaro", href: "/kilimanjaro-climbing-season/", priority: 4 },
    { phrase: "Kilimanjaro vs Aconcagua", href: "/kilimanjaro-vs-aconcagua/", priority: 3 },
    { phrase: "Aconcagua vs Kilimanjaro", href: "/kilimanjaro-vs-aconcagua/", priority: 3 },
    { phrase: "Aconcagua comparison", href: "/kilimanjaro-vs-aconcagua/", priority: 4 },
    { phrase: "preparation checklist", href: "/kilimanjaro-preparation-checklist/", priority: 3 },
    { phrase: "Kilimanjaro checklist", href: "/kilimanjaro-preparation-checklist/", priority: 3 },
    { phrase: "30 days before Kilimanjaro", href: "/kilimanjaro-preparation-checklist/", priority: 4 },
    { phrase: "pre-departure checklist", href: "/kilimanjaro-preparation-checklist/", priority: 4 },
    { phrase: "Kilimanjaro over 60", href: "/kilimanjaro-for-seniors/", priority: 3 },
    { phrase: "seniors climbing Kilimanjaro", href: "/kilimanjaro-for-seniors/", priority: 3 },
    { phrase: "climbing Kilimanjaro at 60", href: "/kilimanjaro-for-seniors/", priority: 3 },
    { phrase: "oldest Kilimanjaro climber", href: "/kilimanjaro-for-seniors/", priority: 4 },
    { phrase: "Kilimanjaro for older climbers", href: "/kilimanjaro-for-seniors/", priority: 3 },
  );

  // Sort by phrase length descending (longest match first)
  entries.sort((a, b) => b.phrase.length - a.phrase.length);

  // Filter out very short phrases (less than 4 characters)
  return entries.filter((entry) => entry.phrase.length >= 4);
});
