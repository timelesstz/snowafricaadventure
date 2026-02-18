import { Metadata } from "next";
import Link from "next/link";
import { DeparturesBookingSection } from "@/components/departures/DeparturesBookingSection";
import { generateMetadata as genMeta, generateEventSchema, generateAggregateRatingSchema, generateFAQSchema } from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import prisma from "@/lib/prisma";
import { SITE_CONFIG, PARTNER_INFO } from "@/lib/constants";
import { ShareButtons } from "@/components/social/ShareButtons";
import { PageHero } from "@/components/layout/PageHero";

// Revalidate every 60 seconds to fetch fresh departure data
export const revalidate = 60;

export const metadata: Metadata = {
  ...genMeta({
    title: "Kilimanjaro Join Group Departures 2026-2027",
    description:
      "Join our scheduled Kilimanjaro group climbs with fixed departure dates. Share the adventure with fellow climbers and save. Book your spot today!",
    url: "/kilimanjaro-join-group-departures/",
  }),
  openGraph: {
    title: "Kilimanjaro Group Departures 2026-2027 | Snow Africa Adventure",
    description: "Join scheduled Kilimanjaro group climbs with expert local guides. 95%+ summit success rate, small groups (max 10), full moon climbs available.",
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
    description: "Join scheduled Kilimanjaro group climbs. Expert guides, 95%+ success rate, full moon climbs available.",
    images: [`${SITE_CONFIG.url}/images/kilimanjaro-group-climb-og.jpg`],
  },
};

// Fetch departures from database
async function getDeparturesByYear(year: number) {
  const departures = await prisma.groupDeparture.findMany({
    where: {
      year,
      status: { in: ["OPEN", "LIMITED", "GUARANTEED"] },
    },
    include: {
      route: {
        select: {
          title: true,
          slug: true,
        },
      },
      bookings: {
        where: {
          status: { not: "CANCELLED" },
        },
        select: {
          totalClimbers: true,
        },
      },
    },
    orderBy: { arrivalDate: "asc" },
  });

  return departures.map((dep) => {
    // Sum total climbers from all active bookings (not just count of booking records)
    const bookedSpots = dep.bookings.reduce(
      (sum, booking) => sum + booking.totalClimbers,
      0
    );
    return {
      id: dep.id,
      route: { name: dep.route.title, slug: dep.route.slug },
      arrivalDate: dep.arrivalDate.toISOString().split("T")[0],
      endDate: dep.endDate.toISOString().split("T")[0],
      price: Number(dep.price),
      maxParticipants: dep.maxParticipants,
      bookedSpots,
      availableSpots: dep.maxParticipants - bookedSpots,
      isFullMoon: dep.isFullMoon,
      status: dep.status,
    };
  });
}

export default async function GroupDeparturesPage() {
  // Fetch real data from database
  const departures2026 = await getDeparturesByYear(2026);

  // Generate Event schemas for featured departures
  const allDepartures = departures2026;
  const eventSchemas = allDepartures.slice(0, 10).map((dep) =>
    generateEventSchema({
      name: `${dep.route.name} - Kilimanjaro Group Climb`,
      description: `Join our scheduled ${dep.route.name} group climb. Share the adventure with fellow climbers from around the world.`,
      url: `/kilimanjaro-join-group-departures/`,
      startDate: dep.arrivalDate,
      endDate: dep.endDate,
      price: dep.price,
      availability:
        dep.availableSpots === 0
          ? "SoldOut"
          : dep.availableSpots <= 3
          ? "LimitedAvailability"
          : "InStock",
      maxAttendees: dep.maxParticipants,
    })
  );

  // Aggregate rating for the company
  const ratingSchema = generateAggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 156,
    itemName: SITE_CONFIG.name,
    itemType: "TourOperator",
  });

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
        "A 10% deposit secures your spot. The remaining balance is due 60 days before your departure date.",
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
  ]);

  return (
    <div>
      {/* Schema markup */}
      <MultiJsonLd schemas={eventSchemas} />
      <JsonLd data={ratingSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <PageHero pageSlug="kilimanjaro-join-group-departures">
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/10 px-4 py-2 rounded text-sm">
            {String.fromCodePoint(0x1F315)} Full Moon climbs available
          </div>
          <div className="bg-white/10 px-4 py-2 rounded text-sm">
            {String.fromCodePoint(0x1F465)} Small groups (max 10)
          </div>
          <div className="bg-white/10 px-4 py-2 rounded text-sm">
            {String.fromCodePoint(0x2713)} Expert local guides
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-white/70">Share this page:</span>
          <ShareButtons variant="icons-only" size="sm" />
        </div>
      </PageHero>

      {/* How It Works */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            How Group Departures Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Your Date</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Browse our scheduled departures and pick a date that works for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Book Your Spot</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Secure your place with a deposit. Full payment due 60 days before
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Join Your Group</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Meet fellow climbers and share the adventure to the summit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">
            What Our Climbers Say
          </h2>
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-xl italic mb-4">
              &quot;An incredible experience! The group was amazing and our guides
              made sure everyone reached the summit safely. Highly recommend the
              Lemosho route.&quot;
            </blockquote>
            <p className="text-[var(--primary-light)]">
              — Sarah M., United Kingdom (January 2025)
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-1 text-[var(--secondary)] text-2xl">
            ★★★★★
            <span className="text-white text-base ml-2">
              4.9/5 on TripAdvisor
            </span>
          </div>
        </div>
      </section>

      {/* 2026 Departures + Booking Form */}
      {departures2026.length > 0 && (
        <DeparturesBookingSection departures={departures2026} year={2026} />
      )}

      {/* 2027 Departures - Coming Soon */}
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
            href="#booking-form"
            className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Register Your Interest
          </Link>
        </div>
      </section>

      {/* Route Comparison */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Route Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="p-4 text-left">Route</th>
                  <th className="p-4 text-left">Duration</th>
                  <th className="p-4 text-left">Difficulty</th>
                  <th className="p-4 text-left">Success Rate</th>
                  <th className="p-4 text-left">Price (PP)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">
                    <Link
                      href="/trekking/8-days-lemosho-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      8-Day Lemosho
                    </Link>
                  </td>
                  <td className="p-4">8 Days</td>
                  <td className="p-4">Moderate</td>
                  <td className="p-4 text-[var(--primary)] font-semibold">95%</td>
                  <td className="p-4 font-semibold">$2,680</td>
                </tr>
                <tr className="border-b bg-[var(--surface)]">
                  <td className="p-4 font-medium">
                    <Link
                      href="/trekking/7-days-machame-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      7-Day Machame
                    </Link>
                  </td>
                  <td className="p-4">7 Days</td>
                  <td className="p-4">Challenging</td>
                  <td className="p-4 text-[var(--primary)] font-semibold">93%</td>
                  <td className="p-4 font-semibold">$2,440</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">
                    <Link
                      href="/trekking/6-days-rongai-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      6-Day Rongai
                    </Link>
                  </td>
                  <td className="p-4">6 Days</td>
                  <td className="p-4">Moderate</td>
                  <td className="p-4 text-[var(--primary)] font-semibold">90%</td>
                  <td className="p-4 font-semibold">$2,390</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Route Descriptions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold mb-3">
                8-Day Lemosho Route
              </h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Our most popular route for group climbs. The extra day allows
                excellent acclimatization, resulting in our highest success rate.
                Scenic approach through pristine rainforest.
              </p>
              <Link
                href="/trekking/8-days-lemosho-route/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
              >
                Learn More →
              </Link>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold mb-3">
                7-Day Machame Route
              </h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                The classic &quot;Whiskey Route&quot; known for its stunning scenery
                and the famous Barranco Wall. A challenging but rewarding climb
                with diverse landscapes.
              </p>
              <Link
                href="/trekking/7-days-machame-route/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
              >
                Learn More →
              </Link>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold mb-3">
                6-Day Rongai Route
              </h3>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Approach from the quieter north side near the Kenyan border. Less
                crowded with a gradual ascent. Ideal for those seeking a more
                remote wilderness experience.
              </p>
              <Link
                href="/trekking/6-days-rongai-route/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
              >
                Learn More →
              </Link>
            </div>
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
                A 10% deposit secures your spot. The remaining balance is due 60
                days before your departure date.
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
