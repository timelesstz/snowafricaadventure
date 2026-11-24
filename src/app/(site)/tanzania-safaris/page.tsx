import type { Metadata } from "next";
import { Suspense, cache } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import prisma from "@/lib/prisma";
import { getExperienceYears } from "@/lib/settings";
import { SITE_CONFIG } from "@/lib/constants";
import { SafarisPageClient } from "./SafarisPageClient";
import { SafariInquiryForm } from "@/components/forms/SafariInquiryForm";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  MapPin,
  MessageCircle,
  Star,
  Truck,
  Users,
} from "lucide-react";

// Cached for 5 minutes (ISR). Admin safari saves call revalidateSafariPages(),
// so pricing, activation and new tours still appear at once.
export const revalidate = 300;

/** Bump when the guide copy below is reviewed. */
const LAST_REVIEWED = { label: "November 2026", iso: "2026-11-18" };

const PAGE_PATH = "/tanzania-safaris/";
const PAGE_URL = `${SITE_CONFIG.url}${PAGE_PATH}`;
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html";
const whatsappHref = `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`;

const linkClass =
  "font-medium text-[var(--text)] underline decoration-[var(--secondary)] decoration-2 underline-offset-4 hover:decoration-[var(--text)]";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/**
 * Cached per request so generateMetadata and the page share one query.
 * Errors are rethrown: an empty list would render a 200 page with no packages
 * and an empty ItemList, which Google could index as a legitimately empty page.
 */
const getSafaris = cache(async () => {
  try {
    const safaris = await prisma.safariPackage.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        title: true,
        duration: true,
        durationDays: true,
        type: true,
        overview: true,
        priceFrom: true,
        featuredImage: true,
        gameDrives: true,
        parksCount: true,
        // `rating` is left out on purpose: every package holds the same 4.9
        // default, not a score from real reviews of that trip.
        highlights: true,
        destinations: {
          select: { destination: { select: { name: true } } },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { durationDays: "asc" },
    });

    return safaris.map((safari) => ({
      ...safari,
      priceFrom: safari.priceFrom ? Number(safari.priceFrom) : null,
      destinations: safari.destinations.map((d) => d.destination.name),
    }));
  } catch (error) {
    console.error("[Safaris] Failed to fetch safaris:", error);
    throw error;
  }
});

type Safari = Awaited<ReturnType<typeof getSafaris>>[number];

/** The three package types in the database, each with its own spoke page. */
const STYLES = [
  {
    type: "Budget",
    name: "Camping safari",
    href: "/tanzania-camping-safaris/",
    sleep: "Dome tents at public campsites inside or beside the parks, with a camp cook.",
  },
  {
    type: "Mid-range",
    name: "Lodge safari",
    href: "/tanzania-lodge-safaris/",
    sleep: "Lodges and tented camps with private bathrooms and full-board dining.",
  },
  {
    type: "Luxury",
    name: "Luxury safari",
    href: "/luxury-safaris-tanzania/",
    sleep: "High-end lodges and tented camps in quieter locations, with more space and better food.",
  },
] as const;

interface StyleStats {
  count: number;
  from: number | null;
  perDayMin: number | null;
  perDayMax: number | null;
}

function statsFor(list: Safari[]): StyleStats {
  const priced = list.filter((s) => s.priceFrom && s.durationDays > 0);
  const perDay = priced.map((s) => Math.round((s.priceFrom as number) / s.durationDays));
  return {
    count: list.length,
    from: priced.length ? Math.min(...priced.map((s) => s.priceFrom as number)) : null,
    perDayMin: perDay.length ? Math.min(...perDay) : null,
    perDayMax: perDay.length ? Math.max(...perDay) : null,
  };
}

function summarise(safaris: Safari[]) {
  const days = safaris.map((s) => s.durationDays);
  return {
    total: statsFor(safaris),
    minDays: days.length ? Math.min(...days) : 0,
    maxDays: days.length ? Math.max(...days) : 0,
    byStyle: STYLES.map((style) => ({
      ...style,
      ...statsFor(safaris.filter((s) => s.type === style.type)),
    })),
    byLength: [
      { label: "2 to 3 days", count: safaris.filter((s) => s.durationDays <= 3).length },
      {
        label: "4 to 6 days",
        count: safaris.filter((s) => s.durationDays >= 4 && s.durationDays <= 6).length,
      },
      { label: "7 days or more", count: safaris.filter((s) => s.durationDays >= 7).length },
    ],
  };
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export async function generateMetadata(): Promise<Metadata> {
  const safaris = await getSafaris();
  const { total, minDays, maxDays } = summarise(safaris);
  return genMeta({
    // The layout appends " | Snow Africa Adventure", so this stays under 36 characters.
    title: "Tanzania Safari Packages & Prices",
    description: `${safaris.length} Tanzania safari packages from ${
      total.from ? usd(total.from) : "a few hundred dollars"
    } per person, ${minDays} to ${maxDays} days. Serengeti, Ngorongoro and Tarangire, camping to luxury, from a local Arusha operator.`,
    url: PAGE_PATH,
  });
}

// ---------------------------------------------------------------------------
// Static guide content
// ---------------------------------------------------------------------------

const PARKS = [
  {
    name: "Serengeti National Park",
    slug: "serengeti-national-park",
    known: "The Great Migration",
    text: "14,763 km² of open plains with big lion prides and good leopard country around Seronera. Game viewing is strong all year; the herds' position decides which area you stay in.",
  },
  {
    name: "Ngorongoro Crater",
    slug: "ngorongoro-conservation-area",
    known: "Big Five in a day",
    text: "A UNESCO World Heritage Site and the world's largest intact volcanic caldera. Around 25,000 large mammals live in its 260 km², including black rhino.",
  },
  {
    name: "Tarangire National Park",
    slug: "tarangire-national-park",
    known: "Elephants and baobabs",
    text: "Huge elephant herds gather along the Tarangire River in the dry season, among old baobab trees. More than 550 bird species have been recorded here.",
  },
  {
    name: "Lake Manyara National Park",
    slug: "lake-manyara-national-park",
    known: "Tree-climbing lions",
    text: "Small and varied: groundwater forest, a soda lake with flamingos, and one of the few parks that allows night game drives.",
  },
  {
    name: "Arusha National Park",
    slug: "arusha-national-park",
    known: "Walking safaris",
    text: "Close to town and often skipped. Walk with a ranger, canoe on the Momella Lakes and see Mount Meru. A good first or last day.",
  },
];

const SEASONS = [
  {
    months: "Late June to October",
    name: "Long dry season",
    good: "The easiest game viewing, as animals gather at water. Mara River crossings in the north.",
    trade: "Highest prices and the busiest parks. Book early.",
  },
  {
    months: "November to December",
    name: "Short rains",
    good: "Short afternoon showers, green plains and migrant birds arriving.",
    trade: "Some showers, but prices drop and parks are quieter.",
  },
  {
    months: "January to February",
    name: "Short dry season",
    good: "Calving season in the southern Serengeti, with a lot of predator action.",
    trade: "A popular window, so the southern camps fill early.",
  },
  {
    months: "March to May",
    name: "Long rains",
    good: "The lowest prices, very few vehicles and lush landscapes for photography.",
    trade: "Heavy rain some days; a few remote camps close in April and May.",
  },
];

const MIGRATION = [
  { months: "December to March", where: "Southern Serengeti and Ndutu", what: "Calving, peaking in February, with predators close behind." },
  { months: "April to May", where: "Central Serengeti", what: "The herds drift north-west through the long rains." },
  { months: "June to July", where: "Western corridor", what: "Crossings of the Grumeti River." },
  { months: "July to October", where: "Northern Serengeti", what: "Mara River crossings, the scene most people picture." },
  { months: "November", where: "Moving south", what: "The herds head back towards the short-grass plains." },
];

function buildFaqs(s: ReturnType<typeof summarise>) {
  const styleLine = s.byStyle
    .filter((st) => st.perDayMin)
    .map((st) =>
      st.perDayMin === st.perDayMax
        ? `${st.name.toLowerCase()}s about ${usd(st.perDayMin as number)}`
        : `${st.name.toLowerCase()}s ${usd(st.perDayMin as number)} to ${usd(st.perDayMax as number)}`
    )
    .join(", ");

  return [
    {
      question: "How much does a Tanzania safari cost?",
      answer: `Our ${s.total.count} packages start at ${
        s.total.from ? usd(s.total.from) : "a few hundred dollars"
      } per person for a short trip. Per person per day, ${styleLine}. Prices include park fees, transport in a safari vehicle, meals and accommodation. Park fees alone are roughly $70 to $82 per person per day in the main parks, which is why longer trips work out cheaper per day.`,
    },
    {
      question: "When is the best time to go on safari in Tanzania?",
      answer:
        "Late June to October is the easiest time to see wildlife, because the land is dry and animals gather at water. It is also the busiest and most expensive time. January and February bring calving season in the southern Serengeti. March to May is the cheapest and quietest, with heavy rain on some days.",
    },
    {
      question: "How many days do I need for a Tanzania safari?",
      answer:
        "Three days covers Tarangire, Lake Manyara and the Ngorongoro Crater. Adding the Serengeti needs at least four or five days, because it is a long drive from Arusha. Six to seven days lets you cover the Northern Circuit without rushing.",
    },
    {
      question: "Can I see the Big Five on a Tanzania safari?",
      answer:
        "Yes. The Ngorongoro Crater gives you the best chance of seeing lion, leopard, elephant, buffalo and rhino in one day, because its black rhino live on the open crater floor. Most guests on a five to seven day Northern Circuit trip see all five, but wildlife is never guaranteed.",
    },
    {
      question: "When and where is the Great Migration?",
      answer:
        "The herds move all year. December to March they calve in the southern Serengeti and Ndutu. April to May they move north-west through the central Serengeti. June and July they cross the Grumeti River in the western corridor. July to October they cross the Mara River in the northern Serengeti. In November they head south again. Timing shifts with the rains each year.",
    },
    {
      question: "What is the difference between a camping, lodge and luxury safari?",
      answer:
        "The parks, game drives and guides are the same. What changes is where you sleep and eat. Camping uses dome tents at public campsites with a camp cook. Lodge safaris use lodges and tented camps with private bathrooms. Luxury safaris use high-end camps in quieter spots with more space and better food.",
    },
    {
      question: "Can I combine a safari with Kilimanjaro or Zanzibar?",
      answer:
        "Yes, and most of our guests do. Climbers usually summit Kilimanjaro first and then rest on a four or five day safari. Zanzibar is a short flight from Arusha or the Serengeti, so three to five nights on the beach is an easy way to end the trip. We book the transfers and flights as one itinerary.",
    },
    {
      question: "Can we do a family safari with children?",
      answer:
        "Yes. We plan shorter game drives, choose lodges with pools and space for children, and add things children enjoy, such as a Maasai village visit. Park fees are lower for children. Some luxury lodges set a minimum age, so tell us their ages when you ask for a quote.",
    },
    {
      question: "Is Tanzania safe for a safari?",
      answer:
        "Tanzania is one of the most visited safari countries in Africa, and the parks are well managed and patrolled by rangers. Your guide is with you on every game drive. Take the normal care with valuables in towns, and follow your guide's instructions around animals.",
    },
    {
      question: "Do I need vaccinations for Tanzania?",
      answer:
        "You need a yellow fever certificate if you arrive from, or transit through, a country with yellow fever. Hepatitis A, typhoid and routine boosters are commonly advised, and malaria tablets are recommended for the safari areas. See a travel doctor six to eight weeks before you fly.",
    },
    {
      question: "What should I pack for a safari?",
      answer:
        "Pack neutral colours (khaki, olive, beige), a warm layer for early drives, a hat, sunscreen, insect repellent and binoculars. Leave camouflage clothing at home; it is not allowed in Tanzania. We send a full packing list after you book.",
    },
  ];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SafarisPage() {
  const [safaris, experienceYears] = await Promise.all([getSafaris(), getExperienceYears()]);
  const types = [...new Set(safaris.map((s) => s.type))];
  const summary = summarise(safaris);
  const faqs = buildFaqs(summary);

  const itemList = generateItemListSchema(
    safaris.map((safari) => ({
      name: safari.title,
      url: `/tanzania-safaris/${safari.slug}/`,
      description: safari.overview || undefined,
      image: safari.featuredImage || undefined,
      price: safari.priceFrom || undefined,
    }))
  );

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Tanzania Safari Packages & Prices",
    inLanguage: "en",
    dateModified: LAST_REVIEWED.iso,
    isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url, name: SITE_CONFIG.name },
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    about: { "@type": "Country", name: "Tanzania" },
    primaryImageOfPage: SAFARI_HERO_IMAGE,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: safaris.length,
      itemListElement: itemList.itemListElement.map((entry) => ({
        ...entry,
        item: { ...entry.item, provider: { "@id": `${SITE_CONFIG.url}/#organization` } },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Safari Packages", url: PAGE_PATH },
          ]),
          collectionPage,
          generateFAQSchema(faqs),
        ]}
      />

      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Tanzania Safari Packages" }]} />
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--primary-dark)]" aria-labelledby="safaris-heading">
        <Image
          src={SAFARI_HERO_IMAGE}
          alt="Zebra herd grazing on the Tanzanian savanna under a cloudy sky"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-2xl">
            <h1
              id="safaris-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            >
              Tanzania Safari Packages &amp; Prices
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-white/90">
              {safaris.length} safaris through the Serengeti, Ngorongoro Crater and Tarangire, from{" "}
              {summary.minDays} to {summary.maxDays} days. Camping, lodges or luxury camps, with our
              own guides and vehicles from Arusha.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg border-t border-white/20 pt-5 text-white">
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/70">Packages</dt>
                <dd className="mt-1 font-heading text-2xl font-bold">{safaris.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/70">Length</dt>
                <dd className="mt-1 font-heading text-xl sm:text-2xl font-bold whitespace-nowrap">
                  {summary.minDays}–{summary.maxDays} days
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/70">From</dt>
                <dd className="mt-1 font-heading text-2xl font-bold">
                  {summary.total.from ? usd(summary.total.from) : "On request"}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#inquire" className="btn btn-primary">
                Get a free quote
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>

            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            >
              <Star className="w-4 h-4 fill-[var(--secondary)] text-[var(--secondary)]" aria-hidden="true" />
              Rated 4.9 on TripAdvisor. Read the reviews
            </a>
          </div>
        </div>
      </section>

      {/* In-page navigation */}
      <nav aria-label="On this page" className="border-b border-[var(--border)] bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex gap-6 overflow-x-auto py-3 text-sm font-medium text-[var(--text-muted)] [scrollbar-width:none]">
            {[
              ["#packages", "Packages"],
              ["#cost", "Prices"],
              ["#parks", "Parks"],
              ["#when", "When to go"],
              ["#plan", "How many days"],
              ["#inquire", "Get a quote"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <li key={href} className="shrink-0">
                <a href={href} className="hover:text-[var(--text)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 py-12 md:py-14 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <Suspense fallback={<SafarisSkeleton />}>
            <SafarisPageClient safaris={safaris} types={types} />
          </Suspense>
        </div>
      </section>

      {/* Cost by style */}
      <section id="cost" className="scroll-mt-24 py-12 md:py-14" aria-labelledby="cost-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 id="cost-heading" className="font-heading text-2xl md:text-3xl font-bold">
                How much does a Tanzania safari cost?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Our packages start at{" "}
                <strong className="text-[var(--text)]">
                  {summary.total.from ? usd(summary.total.from) : "a few hundred dollars"} per person
                </strong>
                . Every style visits the same parks with the same guides. The price changes with where
                you sleep and how many days you stay. Park fees, transport, meals and accommodation
                are included.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {summary.byStyle.map((style) => (
                <li
                  key={style.type}
                  className="flex flex-col rounded-2xl border border-[var(--border)] border-t-4 border-t-[var(--secondary)] bg-white p-5"
                >
                  <h3 className="font-heading text-lg font-semibold">
                    <Link href={style.href} className={linkClass}>
                      {style.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{style.sleep}</p>
                  <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-4 mt-5">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">From</dt>
                      <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
                        {style.from ? usd(style.from) : "On request"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Per day</dt>
                      <dd className="mt-1 text-sm font-semibold tabular-nums">
                        {style.perDayMin
                          ? style.perDayMin === style.perDayMax
                            ? `about ${usd(style.perDayMin)}`
                            : `${usd(style.perDayMin)}–${usd(style.perDayMax as number)}`
                          : "–"}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-[var(--text-light)]">
                    {style.count} {style.count === 1 ? "package" : "packages"}
                  </p>
                </li>
              ))}
              <li className="flex flex-col rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="font-heading text-lg font-semibold">
                  <Link href="/tailor-made-safari/" className={linkClass}>
                    Tailor-made
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Any mix of the above, with a private vehicle and your own dates.
                </p>
                <p className="mt-auto pt-5 text-sm font-semibold">Priced on request</p>
              </li>
            </ul>
            <p className="mt-4 text-xs text-[var(--text-light)]">
              Per person sharing, from today&apos;s package prices. Park fees alone are roughly $70 to
              $82 per person per day in the main parks, so longer trips cost less per day.
            </p>
          </div>
        </div>
      </section>

      {/* Parks */}
      <section id="parks" className="scroll-mt-24 py-12 md:py-14 bg-[var(--surface)]" aria-labelledby="parks-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 id="parks-heading" className="font-heading text-2xl md:text-3xl font-bold">
                Which parks will you visit?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Most trips run on the Northern Circuit, a loop of parks within a day&apos;s drive of
                Arusha. Tanzania has 22 national parks; these five are where most of our packages go.
              </p>
            </div>

            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 border-t border-[var(--border)] pt-6">
              {PARKS.map((park) => (
                <div key={park.slug}>
                  <dt>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--secondary-ink)]">
                      {park.known}
                    </span>
                    <Link
                      href={`/tanzania-destinations/${park.slug}/`}
                      className="mt-1 inline-block font-heading text-lg font-semibold text-[var(--text)] hover:underline underline-offset-4"
                    >
                      {park.name}
                    </Link>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{park.text}</dd>
                </div>
              ))}
              <div className="flex items-end">
                <Link href="/tanzania-destinations/" className={`${linkClass} text-sm`}>
                  All Tanzania destinations
                </Link>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* When to go */}
      <section id="when" className="scroll-mt-24 py-12 md:py-14" aria-labelledby="when-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 id="when-heading" className="font-heading text-2xl md:text-3xl font-bold">
                When is the best time for a Tanzania safari?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                There is good game viewing all year. Late June to October is the easiest, because
                the bush is dry and animals stay close to water. It is also the busiest and most
                expensive time. The rainy months are quieter and cheaper.
              </p>
            </div>

            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {SEASONS.map((season) => (
                <li key={season.name} className="border-t-2 border-[var(--text)] pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {season.months}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{season.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">{season.good}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{season.trade}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 font-heading text-xl font-semibold">
              Where the Great Migration is, month by month
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              Around 1.5 million wildebeest, with zebra and gazelle, move in a loop between the
              Serengeti and Kenya&apos;s Maasai Mara. The timing shifts with the rains each year, so
              we place your camp where the herds are when you travel.
            </p>
            <ol className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {MIGRATION.map((row) => (
                <li key={row.months} className="rounded-xl border border-[var(--border)] bg-white p-4">
                  <p className="font-heading text-sm font-semibold">{row.months}</p>
                  <p className="mt-1 text-sm font-medium">{row.where}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{row.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How many days and combining */}
      <section id="plan" className="scroll-mt-24 py-12 md:py-14 bg-[var(--surface)]" aria-labelledby="plan-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-2">
            <div>
              <h2 id="plan-heading" className="font-heading text-2xl md:text-3xl font-bold">
                How many days do you need?
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Three days covers Tarangire, Lake Manyara and the Ngorongoro Crater. The Serengeti is
                a long drive from Arusha, so plan at least four or five days to include it. Six or
                seven days covers the Northern Circuit without rushing.
              </p>
              <ul className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {summary.byLength.map((bucket) => (
                  <li key={bucket.label} className="flex items-baseline justify-between py-3 text-sm">
                    <span className="font-medium">{bucket.label}</span>
                    <span className="tabular-nums text-[var(--text-muted)]">
                      {bucket.count} {bucket.count === 1 ? "package" : "packages"}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="#packages" className={`${linkClass} mt-4 inline-block text-sm`}>
                Filter the packages by length
              </a>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                Add Kilimanjaro or Zanzibar
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Most of our guests add something to their safari, and both of these are close by.
              </p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-heading font-semibold">
                    <Link href="/climbing-kilimanjaro/" className={linkClass}>
                      Safari and Kilimanjaro
                    </Link>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    Climb first, then rest on a four or five day safari. A combined trip usually runs
                    10 to 16 days.
                  </dd>
                </div>
                <div>
                  <dt className="font-heading font-semibold">
                    <Link href="/zanzibar/" className={linkClass}>
                      Safari and Zanzibar
                    </Link>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    Fly from Arusha or the Serengeti and finish with three to five nights on the
                    beach.
                  </dd>
                </div>
                <div>
                  <dt className="font-heading font-semibold">
                    <Link href="/tanzania-day-tours/" className={linkClass}>
                      Day trips around Arusha
                    </Link>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    A Maasai village visit, a coffee farm tour or a hike, for the day before or after
                    your safari.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax CTA band */}
      <section className="parallax-band text-white" aria-labelledby="safari-cta-heading">
        <div className="parallax-band__media" aria-hidden="true">
          <Image src={SAFARI_HERO_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/45" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <h2 id="safari-cta-heading" className="font-heading text-3xl md:text-4xl font-bold leading-tight">
            Ready to see the Serengeti?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/90">
            Tell us your dates and group size. We reply within 24 hours with a plan built around your trip.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a href="#inquire" className="btn btn-primary">Get a free quote</a>
            <Link
              href="/tailor-made-safari/"
              className="btn bg-white/10 border border-white/60 text-white hover:bg-white/20"
            >
              Build a tailor-made safari
            </Link>
          </div>
        </div>
      </section>

      {/* Why book with us */}
      <section className="py-12 md:py-14" aria-labelledby="why-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="why-heading" className="font-heading text-2xl md:text-3xl font-bold max-w-2xl">
              Why book with Snow Africa Adventure?
            </h2>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--border)] pt-6">
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold">
                  <MapPin className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  Based in Arusha
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A local team led by{" "}
                  <Link href="/meet-florent/" className={linkClass}>
                    Florent
                  </Link>
                  , with {experienceYears} years of running safaris and climbs.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold">
                  <Truck className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  Our own vehicles and guides
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Our guides drive you from Arusha and back. Up to six guests per vehicle, so
                  everyone gets a window seat.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold">
                  <BadgeCheck className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  Licensed by TATO
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Members of the Tanzania Association of Tour Operators. Every quote lists what is
                  included: park fees, meals, accommodation and transfers.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold">
                  <Users className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  What guests say
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Rated 4.9 on TripAdvisor.{" "}
                  <a href={TRIPADVISOR_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Read the reviews
                  </a>{" "}
                  or see{" "}
                  <Link href="/best-tanzania-tour-operator/" className={linkClass}>
                    how to choose an operator
                  </Link>
                  .
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="inquire" className="scroll-mt-24 py-12 md:py-14 bg-[var(--surface)]" aria-labelledby="inquire-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 id="inquire-heading" className="font-heading text-2xl md:text-3xl font-bold text-center">
              Get a safari quote
            </h2>
            <p className="mt-3 text-center text-[var(--text-muted)]">
              Tell us your dates, group and budget. We reply with a priced day-by-day itinerary
              within 24 hours, with no obligation.
            </p>
            <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 border border-[var(--border)]">
              <SafariInquiryForm variant="inline" />
            </div>
            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Prefer to talk? Call{" "}
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className={linkClass}>
                {SITE_CONFIG.phone}
              </a>{" "}
              or{" "}
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-12 md:py-14" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="font-heading text-2xl md:text-3xl font-bold">
              Tanzania safari questions
            </h2>
            <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-base md:text-lg font-semibold hover:text-[var(--primary)] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown
                      className="w-5 h-5 shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-[var(--text-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-xs text-[var(--text-light)]">
              Guide reviewed{" "}
              <time dateTime={LAST_REVIEWED.iso}>{LAST_REVIEWED.label}</time>. Package prices update
              live from our current safaris.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const SAFARI_HERO_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg";

function SafarisSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="h-24 bg-white rounded-2xl animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-[var(--surface)] animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-4 bg-[var(--surface)] rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-[var(--surface)] rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
