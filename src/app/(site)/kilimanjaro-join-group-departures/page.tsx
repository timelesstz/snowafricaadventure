import { Metadata } from "next";
import Link from "next/link";
import { DeparturesBookingSection } from "@/components/departures/DeparturesBookingSection";
import { generateMetadata as genMeta, generateEventSchema, generateAggregateRatingSchema, generateFAQSchema } from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import prisma from "@/lib/prisma";
import { SITE_CONFIG, PARTNER_INFO } from "@/lib/constants";
import { ShareButtons } from "@/components/social/ShareButtons";

// Revalidate every 60 seconds to fetch fresh departure data
export const revalidate = 60;

export const metadata: Metadata = {
  ...genMeta({
    title: "Kilimanjaro Group Departures 2026-2027",
    description:
      "Join our scheduled Kilimanjaro group climbs with fixed departure dates. Share the adventure with fellow climbers and save. Book your spot today!",
    url: "/kilimanjaro-join-group-departures/",
  }),
  openGraph: {
    title: "Kilimanjaro Group Departures 2026-2027",
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
  try {
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
  } catch (error) {
    console.error("[GroupDepartures] Failed to fetch departures:", error);
    return [];
  }
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
        "A 10% deposit secures your spot. The remaining balance is due 2 weeks before your departure date.",
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
        "Our group departures achieve a 95%+ summit success rate across all routes. This is significantly higher than the industry average of 65-70%, thanks to our experienced guides, proper acclimatization schedules, and small group sizes that allow individual attention.",
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
      <JsonLd data={ratingSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section
        className="text-white py-16 md:py-20"
        style={{
          background: "linear-gradient(to bottom right, var(--primary-dark), var(--primary-dark))",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[var(--secondary)] text-sm font-semibold uppercase tracking-wider">
              2026–2027 Season
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-4">
              Kilimanjaro Group Departures
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Join our scheduled group climbs with fixed departure dates. Share the adventure with fellow climbers from around the world.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
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
            <div className="mt-6">
              <a
                href="#departures"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                View Departure Dates & Prices
              </a>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm text-white/70">Share this page:</span>
              <ShareButtons variant="icons-only" size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Brief */}
      <section className="py-8 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-1">Choose Your Date</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Browse departures below and pick a date
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-1">Book Your Spot</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Secure with 10% deposit. Balance due 60 days before
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-1">Join Your Group</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Meet fellow climbers and summit together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Departures + Booking Form — PRIMARY CONTENT */}
      <div id="departures">
        {departures2026.length > 0 && (
          <DeparturesBookingSection departures={departures2026} year={2026} />
        )}
      </div>

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

      {/* Why Join a Group Climb — SEO Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Why Join a Kilimanjaro Group Climb?
            </h2>
            <div className="prose prose-slate prose-lg max-w-none space-y-4 text-[var(--text-muted)]">
              <p>
                Climbing Mount Kilimanjaro — Africa&apos;s highest peak at 5,895 metres above sea level — is one of the most transformative experiences a traveller can undertake. Whether you&apos;re a seasoned trekker or embarking on your first high-altitude adventure, joining one of Snow Africa Adventure&apos;s scheduled group departures offers an unbeatable combination of value, camaraderie, and expert support that makes your Kilimanjaro dream both achievable and unforgettable.
              </p>
              <p>
                Group climbing is ideal for solo travellers, couples, and small groups of friends who want the full Kilimanjaro experience without the premium cost of a private expedition. By sharing logistics, guides, and camping equipment with a small group of like-minded adventurers, you dramatically reduce the per-person cost while gaining something money can&apos;t buy: the shared energy, motivation, and friendship that comes from tackling Africa&apos;s greatest challenge together. Read our full <Link href="/kilimanjaro-group-climbs/" className="text-[var(--secondary)] font-semibold hover:underline">Kilimanjaro group climbs guide</Link> for a detailed breakdown of costs, routes, and what to expect.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                The Social Advantage of Group Climbing
              </h3>
              <p>
                Many of our climbers arrive as strangers and leave as lifelong friends. There is something uniquely bonding about the shared experience of altitude sickness, pre-dawn summit pushes, and the indescribable emotion of standing at Uhuru Peak with the African continent spread out far below. Group departures create an instant community — a team of people who push each other forward on hard days and celebrate together on summit morning.
              </p>
              <p>
                Solo travellers in particular benefit enormously from the group dynamic. Rather than facing the mountain&apos;s psychological challenges alone, you&apos;re embedded in a small team with your own guides, porters, and cook. The mountain becomes a shared project, and your fellow climbers become your support network for the days ahead. Past clients regularly tell us that the friendships made on Kilimanjaro became some of the most meaningful relationships of their travels.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Expert Guides with a 95%+ Summit Success Rate
              </h3>
              <p>
                Every Snow Africa Adventure group departure is led by KINAPA-certified professional guides with a minimum of five years&apos; experience on Kilimanjaro. Our lead guides carry emergency oxygen, wilderness first aid certification, and comprehensive knowledge of every route&apos;s acclimatization profile. Our 95%+ summit success rate across all group departures is among the highest in the industry — a testament to our guides&apos; ability to manage pace, monitor altitude symptoms, and make smart decisions under pressure.
              </p>
              <p>
                Our guide-to-climber ratio ensures individual attention throughout the climb. No one gets left behind or rushed ahead. Our guides adjust the pace each day to the needs of the group, following the core acclimatization principle of &quot;climb high, sleep low.&quot; We also carry pulse oximeters for every climber, monitoring oxygen saturation at each camp to catch any altitude-related issues early.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                What Is Included in Every Group Departure?
              </h3>
              <p>
                Our group departure price is all-inclusive, covering everything you need from the moment you land in Arusha to the moment we drop you back at the airport. Included in every departure: two nights&apos; pre-climb accommodation in Arusha, all Kilimanjaro National Park fees (which have increased significantly in recent years), professional lead guides and assistant guides, a full portering team, a mountain cook preparing three hot meals per day plus snacks, all camping equipment (tents, sleeping mats, dining tent, toilet tent), emergency oxygen, and private airport transfers.
              </p>
              <p>
                The only items not included are your personal trekking gear, flights, visa, travel insurance, and tips for the mountain crew. We provide a comprehensive pre-departure gear list and can advise on rental options in Arusha for items like trekking poles, sleeping bags, and gaiters if you prefer not to purchase.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Who Are Group Departures Ideal For?
              </h3>
              <p>
                Group departures are perfectly suited for solo adventurers looking to share costs and connect with other climbers, couples wanting a structured adventure without the logistics of planning a private expedition, friends or colleagues in groups of two to four who want to join a larger team, and budget-conscious travellers who want a premium experience at a significantly lower price point than a private climb.
              </p>
              <p>
                Our groups are deliberately small — a maximum of ten climbers per departure — ensuring an intimate experience that feels nothing like the large commercial groups sometimes seen on popular routes like Marangu. With a maximum of ten people, you get the benefits of group pricing while maintaining the personal attention and flexibility of a near-private experience.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Full Moon Climbs: Summit Under the Stars
              </h3>
              <p>
                Among our most popular group departures are our Full Moon climbs, where the summit push coincides with a full or near-full moon. Reaching Stella Point and Uhuru Peak by moonlight — with the glaciers glowing silver and the curvature of the Earth visible on the horizon — is an experience that transcends description. We schedule several full moon departures each year across both the Lemosho and Machame routes. Check the departure calendar for upcoming full moon dates and book early, as these sell out months in advance.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Flexible Booking and Payment
              </h3>
              <p>
                Securing your spot on a group departure requires only a 10% deposit, with the remaining balance due 60 days before your arrival date. This makes it easy to commit to your Kilimanjaro adventure well in advance while keeping your cash flow flexible. We accept international bank transfers, credit cards, and other secure payment methods. If you need to change your departure date after booking, we will do our best to accommodate you on another available departure, subject to availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Overview */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              What to Expect: Your Kilimanjaro Group Climb Journey
            </h2>
            <div className="prose prose-slate prose-lg max-w-none space-y-4 text-[var(--text-muted)]">
              <p>
                From the moment you arrive in Arusha to the day you descend from the mountain, every detail of your group climb is managed by our team. Here is what a typical group departure looks like:
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Arrival & Pre-Climb Briefing
              </h3>
              <p>
                You arrive in Arusha and we transfer you to your hotel, where you meet your fellow climbers over dinner. The following morning, our lead guide conducts a thorough gear check and briefing, covering everything from altitude awareness to daily schedules and summit night expectations. This is your chance to ask questions, finalize any gear rentals, and get to know the team who will be by your side for the next week.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                On the Mountain: Daily Routine
              </h3>
              <p>
                Each morning begins with a wake-up call, hot drinks, and breakfast in the dining tent. After packing, you hike for 5-8 hours at a gentle pace — &quot;pole pole&quot; (slowly slowly) in Swahili — with regular rest stops for water, snacks, and photography. Your porters move ahead to set up the next camp, so when you arrive you&apos;re welcomed with popcorn, tea, and hot wash water. Evenings are spent sharing stories, playing cards, and watching the stars at altitude before an early night.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Summit Night: The Final Push
              </h3>
              <p>
                The summit attempt begins around midnight from the high camp. You&apos;ll climb through the darkness with your headlamp illuminating the trail, stopping frequently for hot drinks and rest. As dawn approaches, the sky begins to glow and the first rays of sunrise hit the glaciers — an unforgettable sight. By 6-8 AM, you reach Uhuru Peak at 5,895m. After celebrating, photographs, and soaking in the views, you begin the long descent to your base camp, arriving by late afternoon.
              </p>

              <h3 className="font-heading text-2xl font-bold text-[var(--text)] mt-8 mb-3">
                Post-Climb Celebration
              </h3>
              <p>
                After descending to the final gate, you receive your official summit certificate and celebrate with your team — tipping ceremony, group photos, and the satisfaction of having conquered Africa&apos;s highest peak. We transfer you back to your Arusha hotel for a well-earned hot shower and celebration dinner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
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
              <p className="text-[var(--primary-light)] text-sm">
                — Sarah M., United Kingdom (January 2025)
              </p>
            </div>
            <div>
              <blockquote className="text-lg italic mb-3">
                &quot;I joined as a solo traveller and left with friends for life. The group dynamic was the highlight — we pushed each other through the tough moments and celebrated together at the summit.&quot;
              </blockquote>
              <p className="text-[var(--primary-light)] text-sm">
                — Marcus K., Germany (March 2025)
              </p>
            </div>
            <div>
              <blockquote className="text-lg italic mb-3">
                &quot;At 58, I wasn&apos;t sure I could do it. Emmanuel and the team believed in me when I didn&apos;t believe in myself. Standing on Uhuru Peak was the proudest moment of my life.&quot;
              </blockquote>
              <p className="text-[var(--primary-light)] text-sm">
                — Linda T., Australia (July 2025)
              </p>
            </div>
          </div>
          <a href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-1 text-[var(--secondary)] text-2xl hover:opacity-80 transition-opacity">
            ★★★★★
            <span className="text-white text-base ml-2">
              4.9/5 on TripAdvisor
            </span>
          </a>
        </div>
      </section>

      {/* Route Comparison */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-8">
            Route Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow text-sm">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="px-3 py-2 text-left">Route</th>
                  <th className="px-3 py-2 text-left">Duration</th>
                  <th className="px-3 py-2 text-left">Difficulty</th>
                  <th className="px-3 py-2 text-left">Success Rate</th>
                  <th className="px-3 py-2 text-left">Price (PP)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-medium">
                    <Link
                      href="/trekking/8-days-lemosho-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      8-Day Lemosho
                    </Link>
                  </td>
                  <td className="px-3 py-2">8 Days</td>
                  <td className="px-3 py-2">Moderate</td>
                  <td className="px-3 py-2 text-[var(--primary)] font-semibold">95%</td>
                  <td className="px-3 py-2 font-semibold">$2,680</td>
                </tr>
                <tr className="border-b bg-[var(--surface)]">
                  <td className="px-3 py-2 font-medium">
                    <Link
                      href="/trekking/7-days-machame-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      7-Day Machame
                    </Link>
                  </td>
                  <td className="px-3 py-2">7 Days</td>
                  <td className="px-3 py-2">Challenging</td>
                  <td className="px-3 py-2 text-[var(--primary)] font-semibold">93%</td>
                  <td className="px-3 py-2 font-semibold">$2,440</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">
                    <Link
                      href="/trekking/6-days-rongai-route/"
                      className="text-[var(--primary)] hover:underline"
                    >
                      6-Day Rongai
                    </Link>
                  </td>
                  <td className="px-3 py-2">6 Days</td>
                  <td className="px-3 py-2">Moderate</td>
                  <td className="px-3 py-2 text-[var(--primary)] font-semibold">90%</td>
                  <td className="px-3 py-2 font-semibold">$2,390</td>
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
                Our group departures achieve a 95%+ summit success rate across all routes. This is significantly higher than the industry average of 65-70%, thanks to our experienced guides, proper acclimatization schedules, and small group sizes that allow individual attention.
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
