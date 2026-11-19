import { SITE_CONFIG } from "@/lib/constants";

/**
 * /llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants.
 *
 * Built from the same database rows as the sitemap, so a trip that is added,
 * renamed or switched off shows up here on the next revalidation instead of
 * going stale in a hand-written file.
 */
export const revalidate = 86400;

type Entry = { title: string; path: string; note?: string | null };

/** First sentence of a meta description, trimmed for a one-line note. */
function shortNote(text: string | null | undefined): string | null {
  if (!text) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  const sentence = clean.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? clean;
  return sentence.length > 160 ? `${sentence.slice(0, 157).trimEnd()}...` : sentence;
}

/** "Lemosho Route (8 Days)", unless the title already states its length. */
function withDuration(title: string, duration: string): string {
  return /\d+\s*days?/i.test(title) ? title : `${title} (${duration})`;
}

function section(heading: string, entries: Entry[]): string {
  if (entries.length === 0) return "";
  const lines = entries.map((e) => {
    const url = `${SITE_CONFIG.url}${e.path}`;
    return e.note ? `- [${e.title}](${url}): ${e.note}` : `- [${e.title}](${url})`;
  });
  return `## ${heading}\n\n${lines.join("\n")}\n`;
}

const GUIDES: Entry[] = [
  { title: "Kilimanjaro prices", path: "/kilimanjaro-prices/", note: "What a climb costs and what the price includes." },
  { title: "Best route to climb Kilimanjaro", path: "/best-route-to-climb-kilimanjaro/" },
  { title: "Best time to climb Kilimanjaro", path: "/best-time-to-climb-kilimanjaro/" },
  { title: "How hard is Kilimanjaro?", path: "/how-hard-is-kilimanjaro/" },
  { title: "Kilimanjaro success rates", path: "/kilimanjaro-success-rates/" },
  { title: "Kilimanjaro altitude sickness", path: "/kilimanjaro-altitude-sickness/" },
  { title: "Kilimanjaro training plan", path: "/kilimanjaro-training-plan/" },
  { title: "Kilimanjaro climbing gear", path: "/kilimanjaro-climbing-gear/" },
  { title: "Kilimanjaro tipping guide", path: "/kilimanjaro-tipping-guide/" },
  { title: "Tanzania wildlife: where to see it", path: "/wildlife-safaris-tanzania/" },
  { title: "Tanzania 10-day itinerary", path: "/tanzania-itinerary-10-days/" },
  { title: "Luxury safaris in Tanzania", path: "/luxury-safaris-tanzania/" },
  { title: "Tanzania camping safaris", path: "/tanzania-camping-safari/" },
];

const COMPANY: Entry[] = [
  { title: "About us", path: "/about-us/" },
  { title: "Our guides", path: "/our-guides/" },
  { title: "FAQ", path: "/tanzania-safari-faqs/" },
  { title: "Contact", path: "/contact-us/", note: `${SITE_CONFIG.email}, ${SITE_CONFIG.phone}` },
  { title: "Terms and conditions", path: "/terms-and-conditions/" },
];

async function getTrips() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const [routes, safaris, destinations, dayTrips] = await Promise.all([
      prisma.trekkingRoute.findMany({
        where: { isActive: true },
        select: { slug: true, title: true, duration: true, metaDescription: true },
        orderBy: { durationDays: "asc" },
      }),
      prisma.safariPackage.findMany({
        where: { isActive: true },
        select: { slug: true, title: true, duration: true, metaDescription: true },
        orderBy: { durationDays: "asc" },
      }),
      prisma.destination.findMany({
        where: { isActive: true },
        select: { slug: true, name: true, circuit: true, metaDescription: true },
        orderBy: { name: "asc" },
      }),
      prisma.dayTrip.findMany({
        where: { isActive: true },
        select: { slug: true, title: true, metaDescription: true },
        orderBy: { title: "asc" },
      }),
    ]);
    return { routes, safaris, destinations, dayTrips };
  } catch (err) {
    console.error("[llms.txt] Database fetch failed:", err);
    return { routes: [], safaris: [], destinations: [], dayTrips: [] };
  }
}

export async function GET() {
  const { routes, safaris, destinations, dayTrips } = await getTrips();

  const body = [
    `# ${SITE_CONFIG.name}\n`,
    `> Tour operator based in ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.country}. We run Kilimanjaro climbs, Tanzania wildlife safaris, Zanzibar beach stays and day tours.\n`,
    `Each trip page has the day-by-day itinerary, what is included and an enquiry form. Group climbs run on fixed dates listed on the departures page. For a private or custom trip, use the tailor-made form.\n`,
    section("Start here", [
      { title: "Kilimanjaro climbs", path: "/trekking/", note: "All routes, with duration and itinerary." },
      { title: "Kilimanjaro group departures", path: "/kilimanjaro-join-group-departures/", note: "Fixed-date group climbs you can join." },
      { title: "Tanzania safaris", path: "/tanzania-safaris/", note: "All safari packages." },
      { title: "Tailor-made safari", path: "/tailor-made-safari/", note: "Request a private, custom itinerary." },
      { title: "Tanzania destinations", path: "/tanzania-destinations/" },
      { title: "Zanzibar", path: "/zanzibar/" },
      { title: "Day tours", path: "/tanzania-day-tours/" },
    ]),
    section(
      "Kilimanjaro routes",
      routes.map((r) => ({ title: withDuration(r.title, r.duration), path: `/trekking/${r.slug}/`, note: shortNote(r.metaDescription) }))
    ),
    section(
      "Safari packages",
      safaris.map((s) => ({ title: withDuration(s.title, s.duration), path: `/tanzania-safaris/${s.slug}/`, note: shortNote(s.metaDescription) }))
    ),
    section(
      "Destinations",
      destinations.map((d) => ({ title: `${d.name} (${d.circuit} circuit)`, path: `/tanzania-destinations/${d.slug}/`, note: shortNote(d.metaDescription) }))
    ),
    section(
      "Day tours",
      dayTrips.map((t) => ({ title: t.title, path: `/tanzania-day-tours/${t.slug}/`, note: shortNote(t.metaDescription) }))
    ),
    section("Planning guides", GUIDES),
    section("Company", COMPANY),
    `## Optional\n\n- [Blog](${SITE_CONFIG.url}/blog/): Longer reads on Kilimanjaro, wildlife and Tanzania travel.\n- [Sitemap](${SITE_CONFIG.url}/sitemap.xml)\n`,
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
