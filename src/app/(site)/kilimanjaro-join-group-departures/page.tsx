import { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, BadgeCheck, Moon, Star, Users } from "lucide-react";
import { DeparturesBookingSection } from "@/components/departures/DeparturesBookingSection";
import { NextGroupsStrip } from "@/components/departures/NextGroupsStrip";
import { generateMetadata as genMeta, generateEventSchema,generateFAQSchema } from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import prisma from "@/lib/prisma";
import { countBookedSpots, seatDisplayBookingWhere } from "@/lib/booking-spots";
import { activeEarlyBirdPrice, startOfTodayUTC } from "@/lib/departure-rules";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG, PARTNER_INFO } from "@/lib/constants";
import { ShareButtons } from "@/components/social/ShareButtons";
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

// Revalidate every 60 seconds to fetch fresh departure data
export const revalidate = 60;

export const metadata: Metadata = {
  ...genMeta({
    // Kept to 33 chars so the layout's " | Snow Africa Adventure" suffix still
    // fits inside Google's ~60 char title cutoff. The OG/Twitter titles below
    // are not SERP-truncated and keep the fuller "2026-2027" range.
    title: "Kilimanjaro Group Departures 2026",
    description:
      "Join our scheduled Kilimanjaro group climbs with fixed departure dates. Share the adventure with fellow climbers and save. Book your spot today!",
    url: "/kilimanjaro-join-group-departures/",
  }),
  openGraph: {
    title: "Kilimanjaro Group Departures 2026-2027",
    description: "Join scheduled Kilimanjaro group climbs with expert local guides. 93% summit success rate, small groups (max 10), full moon climbs available.",
    url: `${SITE_CONFIG.url}/kilimanjaro-join-group-departures/`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/kilimanjaro-group-climb-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Kilimanjaro Group Climb - Snow Africa Adventure",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kilimanjaro Group Departures 2026-2027",
    description: "Join scheduled Kilimanjaro group climbs. Expert guides, 93% summit success rate, full moon climbs available.",
    images: [`${SITE_CONFIG.url}/images/kilimanjaro-group-climb-og.jpg`],
  },
};

type PageDeparture = Awaited<ReturnType<typeof getDeparturesByYear>>[number];

// Fetch departures from database
async function getDeparturesByYear(year: number) {
  // Only show departures that haven't started yet — the rotation cron marks
  // ended ones COMPLETED, but this filter keeps the page correct even if it stalls.
  // FULL departures are included so they render as "Sold out" rows instead
  // of vanishing from the page.
  const departures = await prisma.groupDeparture.findMany({
    where: {
      year,
      status: { in: ["OPEN", "LIMITED", "GUARANTEED", "FULL"] },
      arrivalDate: { gt: startOfTodayUTC() },
    },
    include: {
      route: {
        select: {
          title: true,
          slug: true,
          durationDays: true,
          physicalRating: true,
          successRate: true,
        },
      },
      bookings: {
        where: seatDisplayBookingWhere(),
        select: {
          totalClimbers: true,
        },
      },
    },
    orderBy: { arrivalDate: "asc" },
  });

  return departures.map((dep) => {
    const bookedSpots = countBookedSpots(dep.bookings);
    // A departure marked FULL by staff is sold out even if seats look free.
    const availableSpots =
      dep.status === "FULL" ? 0 : Math.max(0, dep.maxParticipants - bookedSpots);
    return {
      id: dep.id,
      route: { name: dep.route.title, slug: dep.route.slug },
      routeFacts: {
        durationDays: dep.route.durationDays,
        physicalRating: dep.route.physicalRating,
        successRate: dep.route.successRate,
      },
      arrivalDate: dep.arrivalDate.toISOString().split("T")[0],
      endDate: dep.endDate.toISOString().split("T")[0],
      price: Number(dep.price),
      earlyBirdPrice: activeEarlyBirdPrice(dep),
      maxParticipants: dep.maxParticipants,
      bookedSpots,
      availableSpots,
      isFullMoon: dep.isFullMoon,
      status: dep.status,
    };
  });
}

/**
 * A database error during ISR regeneration must not be cached as an empty
 * page: rethrowing keeps the last good version live. Only the build itself
 * falls back to the empty state, so a database blip can't fail a deploy.
 */
async function loadDepartures(year: number): Promise<{ departures: PageDeparture[]; failed: boolean }> {
  try {
    return { departures: await getDeparturesByYear(year), failed: false };
  } catch (error) {
    console.error(`[GroupDepartures] Failed to fetch ${year} departures:`, error);
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error;
    return { departures: [], failed: true };
  }
}

/** One comparison row per route, priced from the live departures. */
function summariseRoutes(departures: PageDeparture[]) {
  const rows = new Map<
    string,
    {
      slug: string;
      name: string;
      durationDays: number;
      physicalRating: string | null;
      successRate: number | null;
      fromPrice: Map<number, number>;
    }
  >();
  for (const dep of departures) {
    const row =
      rows.get(dep.route.slug) ??
      {
        slug: dep.route.slug,
        name: dep.route.name,
        ...dep.routeFacts,
        fromPrice: new Map<number, number>(),
      };
    const year = Number(dep.arrivalDate.slice(0, 4));
    const price = dep.earlyBirdPrice ?? dep.price;
    row.fromPrice.set(year, Math.min(row.fromPrice.get(year) ?? Infinity, price));
    rows.set(dep.route.slug, row);
  }
  return [...rows.values()].sort((a, b) => a.durationDays - b.durationDays);
}

const ROUTE_NOTES: Record<string, string> = {
  "8-days-lemosho-route":
    "Our most popular route. The extra day helps acclimatisation, and it starts in quiet western rainforest.",
  "7-days-machame-route":
    "The classic \"Whiskey Route\": big scenery and the Barranco Wall scramble.",
  "9-day-northern-circuit-route-kilimanjaro-guide":
    "The longest and quietest route, circling the remote northern slopes.",
};

export default async function GroupDeparturesPage() {
  // Fetch real data from database
  const [result2026, result2027] = await Promise.all([
    loadDepartures(2026),
    loadDepartures(2027),
  ]);
  const departures2026 = result2026.departures;
  const departures2027 = result2027.departures;
  const loadFailed = result2026.failed || result2027.failed;

  const allDepartures = [...departures2026, ...departures2027];
  const routeRows = summariseRoutes(allDepartures);
  const priceYears = [...new Set(allDepartures.map((d) => Number(d.arrivalDate.slice(0, 4))))].sort();
  const maxGroupSize = allDepartures.length
    ? Math.max(...allDepartures.map((d) => d.maxParticipants))
    : 10;

  // Event schema for every listed departure, at the price a climber pays today.
  const eventSchemas = allDepartures.map((dep) =>
    generateEventSchema({
      name: `${dep.route.name} - Kilimanjaro Group Climb`,
      description: `Join our scheduled ${dep.route.name} group climb. Share the adventure with fellow climbers from around the world.`,
      url: `/kilimanjaro-join-group-departures/`,
      startDate: dep.arrivalDate,
      endDate: dep.endDate,
      price: dep.earlyBirdPrice ?? dep.price,
      availability:
        dep.availableSpots === 0
          ? "SoldOut"
          : dep.availableSpots <= 3
          ? "LimitedAvailability"
          : "InStock",
      maxAttendees: dep.maxParticipants,
    })
  );

  // FAQ Schema for the page
  const faqSchema = generateFAQSchema([
    {
      question: "What is included in the group departure price?",
      answer:
        "All group departures include: 2 nights hotel in Arusha, all park fees, professional guides and porters, camping equipment, all meals on the mountain, emergency oxygen, and airport transfers.",
    },
    {
      question: "What is the deposit and payment schedule?",
      answer:
        "A 20% deposit secures your spot. The remaining balance is due 2 weeks before your departure date.",
    },
    {
      question: "What happens if a departure doesn't reach minimum numbers?",
      answer:
        "If minimum numbers aren't reached 30 days before departure, we offer the choice of joining another date or a full refund.",
    },
    {
      question: "Can I do a private climb instead?",
      answer:
        "Yes! We offer private departures on any date for individuals, couples, or your own group. View our routes for private climb options.",
    },
    {
      question: "How fit do I need to be for a group climb?",
      answer:
        "You should be in reasonable cardiovascular fitness — able to hike 6-8 hours on varied terrain. We recommend starting a training programme at least 12 weeks before your departure. Most group climbers are regular hikers or gym-goers, not elite athletes. Our guides set a pace that the whole group can manage comfortably.",
    },
    {
      question: "What is the summit success rate for group departures?",
      answer:
        "93% of our climbers reach the summit across all routes, against an industry average of 65-70%. Longer routes do better: see the route comparison above for each route. The difference comes from experienced guides, proper acclimatization schedules, and small groups that allow individual attention.",
    },
    {
      question: "Can I join a group climb as a solo traveller?",
      answer:
        "Absolutely — roughly 40% of our group climbers are solo travellers. Group departures are one of the best ways to experience Kilimanjaro as a solo traveller, as you'll be embedded in a small team of like-minded adventurers with shared goals. Many of our solo climbers leave with lifelong friendships.",
    },
    {
      question: "What happens on summit night?",
      answer:
        "Summit night typically begins at midnight from the high camp. You'll hike through the night with your headlamp, guided by your team. The ascent takes 6-8 hours to reach Uhuru Peak at 5,895m. You'll arrive for sunrise at the summit — one of the most rewarding moments of any climber's life. After summit photos, you descend to base camp the same day.",
    },
    {
      question: "What altitude sickness precautions are taken?",
      answer:
        "Our guides carry pulse oximeters and monitor every climber twice daily. We follow strict acclimatization protocols including 'climb high, sleep low' profiles. Emergency oxygen is carried on every climb. If a climber shows signs of moderate or severe altitude sickness, our guides will initiate a safe descent immediately.",
    },
    {
      question: "Do I need travel insurance?",
      answer:
        "Yes — comprehensive travel insurance with high-altitude trekking cover (minimum 6,000m) is mandatory for all climbers. The policy must include emergency helicopter evacuation and medical expenses. We can recommend trusted providers if needed.",
    },
  ]);

  return (
    <div>
      {/* Schema markup */}
      <MultiJsonLd schemas={eventSchemas} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-[var(--primary-dark)] text-white pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <span className="text-[var(--secondary)] text-sm font-semibold uppercase tracking-wider">
                {priceYears.length > 1 ? `${priceYears[0]}–${priceYears[priceYears.length - 1]}` : priceYears[0] ?? "2026–2027"} season
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">
                Kilimanjaro Group Departures
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Fixed dates and small teams. Pick a date, join climbers from around the world, and summit together.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
                <li className="inline-flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                  Groups of {maxGroupSize} or fewer
                </li>
                <li className="inline-flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                  Full moon summit dates
                </li>
                <li className="inline-flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[var(--secondary)]" aria-hidden="true" />
                  Expert local guides
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href="#departures"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--secondary-foreground)] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                See all dates and prices
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/70">Share:</span>
                <ShareButtons variant="icons-only" size="sm" />
              </div>
            </div>
          </div>

          <NextGroupsStrip departures={allDepartures} />
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* How It Works — Brief */}
      <section className="py-8 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-[var(--primary)]">1</span>
              </div>
              <h3 className="font-semibold mb-1">Choose Your Date</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Browse departures below and pick a date
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-[var(--primary)]">2</span>
              </div>
              <h3 className="font-semibold mb-1">Request Your Spot</h3>
              <p className="text-sm text-[var(--text-muted)]">
                No payment today. After we confirm, a 20% deposit holds it
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-[var(--primary)]">3</span>
              </div>
              <h3 className="font-semibold mb-1">Join Your Group</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Meet fellow climbers and summit together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 + 2027 Departures + Booking Form — PRIMARY CONTENT */}
      <div id="departures">
        {allDepartures.length > 0 ? (
          <DeparturesBookingSection
            yearGroups={[
              { year: 2026, departures: departures2026 },
              { year: 2027, departures: departures2027 },
            ].filter((group) => group.departures.length > 0)}
          />
        ) : (
          <section className="py-12" id="booking-form">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white border border-[var(--border)] rounded-xl p-8 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                  {loadFailed ? "Departure dates are loading slowly" : "New dates are being scheduled"}
                </h2>
                <p className="text-[var(--text-muted)] mb-6">
                  {loadFailed
                    ? "We couldn't load the live departure list just now. Tell us your preferred month and route and we'll send you the open dates and prices."
                    : "There are no open group dates right now. Tell us your preferred month and route and we'll send you dates as soon as they're published."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/contact-us/"
                    className="inline-flex items-center min-h-11 px-6 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--secondary-foreground)] font-semibold transition-colors"
                  >
                    Ask for dates
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-11 px-6 rounded-lg border border-[var(--border)] font-semibold hover:border-[var(--secondary)] transition-colors"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 2027 Departures - Coming Soon (only until 2027 dates are published) */}
      {departures2027.length === 0 && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              2027 Departures — Coming Soon!
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
              We&apos;re finalizing our 2027 Kilimanjaro group climb schedule.
              Contact us to express your interest and be the first to know when dates are released.
            </p>
            <Link
              href="/contact-us/"
              className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Register Your Interest
            </Link>
          </div>
        </section>
      )}

      {/* Reviews Section — trust signal right after the booking table */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-8">
            What Our Climbers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <blockquote className="text-lg italic mb-3">
                &quot;An incredible experience! The crew was amazing and our guides made sure everyone reached the summit safely. Highly recommend the Lemosho route.&quot;
              </blockquote>
              <p className="text-white/80 text-sm">
                — Sarah M., United Kingdom (January 2025)
              </p>
            </div>
            <div>
              <blockquote className="text-lg italic mb-3">
                &quot;I joined as a solo traveller and left with friends for life. The group dynamic was the highlight — we pushed each other through the tough moments and celebrated together at the summit.&quot;
              </blockquote>
              <p className="text-white/80 text-sm">
                — Marcus K., Germany (March 2025)
              </p>
            </div>
            <div>
              <blockquote className="text-lg italic mb-3">
                &quot;At 58, I wasn&apos;t sure I could do it. Emmanuel and the team believed in me when I didn&apos;t believe in myself. Standing on Uhuru Peak was the proudest moment of my life.&quot;
              </blockquote>
              <p className="text-white/80 text-sm">
                — Linda T., Australia (July 2025)
              </p>
            </div>
          </div>
          <a href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-1 text-[var(--secondary)] text-2xl hover:opacity-80 transition-opacity">
            <span className="inline-flex gap-0.5" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
              ))}
            </span>
            <span className="text-white text-base ml-2">
              4.9/5 on TripAdvisor
            </span>
          </a>
        </div>
      </section>

      {routeRows.length > 0 && (
      <>
      {/* Route Comparison — each route's one-line highlight folded into the
          table itself instead of a separate, redundant card grid below it */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Route Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Group departure routes with duration, difficulty, summit success rate and starting price per person
              </caption>
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th scope="col" className="px-3 py-2 text-left">Route</th>
                  <th scope="col" className="px-3 py-2 text-left">Duration</th>
                  <th scope="col" className="px-3 py-2 text-left">Difficulty</th>
                  <th scope="col" className="px-3 py-2 text-left">Success Rate</th>
                  {priceYears.map((year) => (
                    <th key={year} scope="col" className="px-3 py-2 text-left">
                      {year} from (pp)
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routeRows.map((row, i) => (
                  <tr
                    key={row.slug}
                    className={`border-b border-[var(--border)] last:border-0 ${i % 2 ? "bg-[var(--surface)]" : ""}`}
                  >
                    <td className="px-3 py-2 font-medium">
                      <Link href={`/trekking/${row.slug}/`} className="text-[var(--primary)] hover:underline">
                        {row.name}
                      </Link>
                      {ROUTE_NOTES[row.slug] && (
                        <p className="font-normal text-xs text-[var(--text-muted)] mt-0.5">
                          {ROUTE_NOTES[row.slug]}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">{row.durationDays} days</td>
                    <td className="px-3 py-2">{row.physicalRating ?? "—"}</td>
                    <td className="px-3 py-2 font-semibold">
                      {row.successRate != null ? `${row.successRate}%` : "—"}
                    </td>
                    {priceYears.map((year) => {
                      const price = row.fromPrice.get(year);
                      return (
                        <td key={year} className="px-3 py-2 font-semibold whitespace-nowrap">
                          {price != null ? formatPrice(price) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      </>
      )}

      {/* Why Join a Group Climb — SEO Content. Trimmed to what the FAQ below
          doesn't already cover (inclusions, payment, success rate live there). */}
      <section className="py-12 md:py-14" aria-labelledby="why-group-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 id="why-group-heading" className="font-heading text-2xl md:text-3xl font-bold">
                Why Join a Kilimanjaro Group Climb?
              </h2>
              <p className="mt-3 text-[var(--text-muted)] leading-relaxed">
                You get the full climb to Uhuru Peak (5,895 m) for less than a private trip, because
                guides, crew and camping gear are shared across the team. Our{" "}
                <Link
                  href="/kilimanjaro-group-climbs/"
                  className="font-medium text-[var(--text)] underline decoration-[var(--secondary)] decoration-2 underline-offset-4 hover:decoration-[var(--text)]"
                >
                  group climbs guide
                </Link>{" "}
                covers costs and routes in detail.
              </p>
            </div>

            <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-3 border-t border-[var(--border)] pt-6">
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold text-[var(--text)]">
                  <Users className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  A team on the hard days
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Many climbers arrive as strangers and leave as friends. The group pushes each other
                  through the long days and summit night. Solo climbers aren&apos;t alone with the
                  mountain, and still have their own guides, porters and cook.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold text-[var(--text)]">
                  <BadgeCheck className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  Who it suits
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Solo travellers sharing costs, couples who don&apos;t want to plan a private
                  trip, and two to four friends joining a bigger team. Groups stop at{" "}
                  {maxGroupSize} climbers, so it still feels close to private.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-heading font-semibold text-[var(--text)]">
                  <Moon className="w-4 h-4 text-[var(--text-muted)]" aria-hidden="true" />
                  Full moon summits
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Some dates time summit night with a full or near-full moon, so you reach Stella
                  Point and Uhuru by moonlight. We run them on Lemosho, Machame and the Northern
                  Circuit. They fill first, so book early.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Day-by-Day Overview */}
      <section className="py-12 md:py-14 bg-[var(--surface)]" aria-labelledby="expect-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 id="expect-heading" className="font-heading text-2xl md:text-3xl font-bold">
                What to Expect: Your Kilimanjaro Group Climb Journey
              </h2>
              <p className="mt-3 text-[var(--text-muted)] leading-relaxed">
                Our team handles every detail from the day you land in Arusha to the day you come
                down. A typical group departure runs like this.
              </p>
            </div>

            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Arrival and briefing",
                  text: "We collect you in Arusha and you meet the group over dinner. Next morning the lead guide checks your gear and walks you through altitude, the daily plan and summit night. Rent anything you're missing then.",
                },
                {
                  title: "Days on the mountain",
                  text: "Breakfast in the dining tent, then 5 to 8 hours of walking “pole pole” (slowly, slowly) with breaks for water and photos. Porters go ahead, so camp is up with tea, popcorn and hot wash water when you arrive.",
                },
                {
                  title: "Summit night",
                  text: "You leave high camp around midnight by headlamp, stopping often for hot drinks. Sunrise lights the glaciers, and most climbers reach Uhuru Peak (5,895 m) between 6 and 8 AM, then descend to camp by late afternoon.",
                },
                {
                  title: "Back in Arusha",
                  text: "At the gate you get your summit certificate, then the tipping ceremony and group photos. We drive you back to your hotel for a hot shower and a celebration dinner.",
                },
              ].map((step, i) => (
                <li key={step.title} className="border-t-2 border-[var(--text)] pt-4">
                  <span className="font-heading text-sm font-semibold text-[var(--text-muted)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-heading font-semibold text-[var(--text)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Packing Essentials */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            What to Pack for Your Group Climb
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-[var(--text-muted)] text-center mb-8">
              We provide all camping and climbing equipment. You only need personal gear. Here are the essentials:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Clothing column */}
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-heading text-lg font-bold mb-4">Clothing Layers</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• Moisture-wicking base layers</li>
                  <li>• Insulated mid-layer (fleece or down)</li>
                  <li>• Waterproof outer shell jacket</li>
                  <li>• Waterproof trousers</li>
                  <li>• Warm summit gloves (2 pairs)</li>
                  <li>• Thermal beanie and balaclava</li>
                  <li>• Sunhat and sunglasses</li>
                </ul>
              </div>
              {/* Footwear column */}
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-heading text-lg font-bold mb-4">Footwear & Accessories</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• Broken-in hiking boots (waterproof)</li>
                  <li>• Gaiters for scree and dust</li>
                  <li>• Camp shoes or sandals</li>
                  <li>• 3-4 pairs hiking socks (merino wool)</li>
                  <li>• Trekking poles (recommended)</li>
                  <li>• 30-40L daypack</li>
                  <li>• Headlamp with spare batteries</li>
                </ul>
              </div>
              {/* Health & Other column */}
              <div className="bg-white border border-[var(--border)] rounded-lg p-6">
                <h3 className="font-heading text-lg font-bold mb-4">Health & Essentials</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• SPF 50+ sunscreen</li>
                  <li>• Lip balm with SPF</li>
                  <li>• Personal first aid kit</li>
                  <li>• Diamox (consult your doctor)</li>
                  <li>• 2-3 litre water bottles/bladder</li>
                  <li>• Snacks (energy bars, nuts, chocolate)</li>
                  <li>• Portable phone charger</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] text-center mt-6">
              We send a comprehensive packing list after booking. Gear rental available in Arusha for sleeping bags, trekking poles, and down jackets.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What is included in the group departure price?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                All group departures include: 2 nights hotel in Arusha, all park
                fees, professional guides and porters, camping equipment, all
                meals on the mountain, emergency oxygen, and airport transfers.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What is the deposit and payment schedule?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                A 20% deposit secures your spot. The remaining balance is due 2
                weeks before your departure date.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What happens if a departure doesn&apos;t reach minimum numbers?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                If minimum numbers aren&apos;t reached 30 days before departure, we
                offer the choice of joining another date or a full refund.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                Can I do a private climb instead?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                Yes! We offer private departures on any date for individuals,
                couples, or your own group.{" "}
                <Link href="/trekking/" className="text-[var(--primary)] hover:underline">
                  View our routes
                </Link>{" "}
                for private climb options.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                How fit do I need to be for a group climb?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                You should be in reasonable cardiovascular fitness — able to hike 6-8 hours on varied terrain. We recommend starting a training programme at least 12 weeks before your departure. Most group climbers are regular hikers or gym-goers, not elite athletes. Our guides set a pace that the whole group can manage comfortably.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What is the summit success rate for group departures?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                93% of our climbers reach the summit across all routes, against an industry average of 65-70%. Longer routes do better: see the route comparison above for each route. The difference comes from experienced guides, proper acclimatization schedules, and small groups that allow individual attention.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                Can I join a group climb as a solo traveller?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                Absolutely — roughly 40% of our group climbers are solo travellers. Group departures are one of the best ways to experience Kilimanjaro as a solo traveller, as you&apos;ll be embedded in a small team of like-minded adventurers with shared goals. Many of our solo climbers leave with lifelong friendships.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What happens on summit night?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                Summit night typically begins at midnight from the high camp. You&apos;ll hike through the night with your headlamp, guided by your team. The ascent takes 6-8 hours to reach Uhuru Peak at 5,895m. You&apos;ll arrive for sunrise at the summit — one of the most rewarding moments of any climber&apos;s life. After summit photos, you descend to base camp the same day.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                What altitude sickness precautions are taken?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                Our guides carry pulse oximeters and monitor every climber twice daily. We follow strict acclimatization protocols including &quot;climb high, sleep low&quot; profiles. Emergency oxygen is carried on every climb. If a climber shows signs of moderate or severe altitude sickness, our guides will initiate a safe descent immediately.
              </div>
            </details>
            <details className="bg-[var(--surface)] rounded-lg group">
              <summary className="p-4 cursor-pointer font-medium">
                Do I need travel insurance?
              </summary>
              <div className="px-4 pb-4 text-[var(--text-muted)]">
                Yes — comprehensive travel insurance with high-altitude trekking cover (minimum 6,000m) is mandatory for all climbers. The policy must include emergency helicopter evacuation and medical expenses. We can recommend trusted providers if needed.
              </div>
            </details>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-join-group-departures/" />

      {/* Related Reading */}
      <section className="py-10 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-lg font-bold mb-4">Continue Reading</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/kilimanjaro-vs-everest/" className="bg-[var(--surface)] px-4 py-2 rounded-full hover:bg-[var(--primary-dark)] hover:text-white transition-colors">
                Kilimanjaro vs Everest
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] px-4 py-2 rounded-full hover:bg-[var(--primary-dark)] hover:text-white transition-colors">
                Best Route Guide
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-[var(--surface)] px-4 py-2 rounded-full hover:bg-[var(--primary-dark)] hover:text-white transition-colors">
                Kilimanjaro Prices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Attribution */}
      <div className="py-4 text-center border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-light)]">
          Website by{" "}
          <a
            href={PARTNER_INFO.marketing.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-muted)] transition-colors"
          >
            {PARTNER_INFO.marketing.shortName}
          </a>
        </p>
      </div>
    </div>
  );
}
