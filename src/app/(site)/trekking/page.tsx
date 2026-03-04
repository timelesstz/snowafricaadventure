import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateVideoSchema, generateItemListSchema, generateHowToSchema } from "@/lib/seo";
import { JsonLd, MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import prisma from "@/lib/prisma";
import { TrekkingPageClient } from "./TrekkingPageClient";
import {
  Mountain,
  Target,
  Clock,
  Users,
  Shield,
  Star,
  ArrowRight,
  Award,
  Heart,
  Thermometer,
  Calendar
} from "lucide-react";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Trek Packages & Routes",
  description:
    "Explore our Kilimanjaro climbing routes. From the popular Machame Route to the scenic Lemosho, find your perfect path to Africa's highest peak. 93% success rate, expert guides.",
  url: "/trekking/",
});

// Fetch routes from database with all relevant fields
async function getRoutes() {
  try {
    const routes = await prisma.trekkingRoute.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        title: true,
        duration: true,
        durationDays: true,
        physicalRating: true,
        maxPeople: true,
        overview: true,
        successRate: true,
        featuredImage: true,
        highlights: true,
        startPoint: true,
        endPoint: true,
      },
      orderBy: {
        durationDays: "asc",
      },
    });

    return routes;
  } catch (error) {
    console.error("[Trekking] Failed to fetch routes:", error);
    return [];
  }
}

// Get unique difficulty ratings
async function getDifficulties() {
  try {
    const difficulties = await prisma.trekkingRoute.findMany({
      where: { isActive: true },
      select: { physicalRating: true },
      distinct: ["physicalRating"],
    });
    return difficulties.map((d) => d.physicalRating).filter(Boolean) as string[];
  } catch (error) {
    console.error("[Trekking] Failed to fetch difficulties:", error);
    return [];
  }
}

// Get featured departure
async function getFeaturedDeparture() {
  try {
    const departure = await prisma.groupDeparture.findFirst({
      where: {
        status: "OPEN",
        startDate: { gte: new Date() },
        isFeatured: true,
      },
      include: {
        route: { select: { title: true, slug: true } },
      },
      orderBy: { startDate: "asc" },
    });
    return departure;
  } catch (error) {
    console.error("[Trekking] Failed to fetch featured departure:", error);
    return null;
  }
}

export default async function TrekkingPage() {
  const [routes, difficulties, featuredDeparture] = await Promise.all([
    getRoutes(),
    getDifficulties(),
    getFeaturedDeparture(),
  ]);

  // Sort difficulties by intensity
  const difficultyOrder = ["Easy", "Moderate", "Challenging", "Difficult", "Strenuous"];
  const sortedDifficulties = difficulties.sort(
    (a, b) => difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b)
  );

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Trekking Routes" }]} />
      </div>
      <MultiJsonLd schemas={[
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Kilimanjaro Trekking Routes", url: "/trekking/" },
        ]),
        generateItemListSchema(routes.map((route) => ({
          name: route.title,
          url: `/trekking/${route.slug}/`,
          description: route.overview || undefined,
          image: route.featuredImage || undefined,
        }))),
        generateHowToSchema({
          name: "How to Prepare for Climbing Kilimanjaro",
          description: "Complete preparation guide for climbing Mount Kilimanjaro, from physical training to gear and logistics.",
          totalTime: "P90D",
          estimatedCost: { currency: "USD", value: 2500 },
          steps: [
            { name: "Get a Medical Check-up", text: "Visit your doctor 3-6 months before your climb. Discuss altitude sickness risks, get required vaccinations, and ensure you are physically fit for high-altitude trekking." },
            { name: "Start Physical Training", text: "Begin a training program at least 3 months before. Focus on cardiovascular fitness (hiking, running, cycling), leg strength exercises, and stair climbing with a weighted backpack." },
            { name: "Choose Your Route", text: "Select a route based on your fitness level and time available. The 7-day Machame or 8-day Lemosho routes offer the best acclimatization and highest success rates." },
            { name: "Book With a Licensed Operator", text: "Choose a KINAPA-licensed operator based in Tanzania. Ensure the package includes experienced guides, porters, quality equipment, meals, park fees, and emergency oxygen." },
            { name: "Get Your Gear Ready", text: "Essential gear includes layered clothing for -20°C to +30°C, waterproof hiking boots broken in over several weeks, a 4-season sleeping bag, headlamp, trekking poles, and sun protection." },
            { name: "Arrange Travel Logistics", text: "Book flights to Kilimanjaro International Airport (JRO). Arrange a Tanzania tourist visa ($50). Pack altitude sickness medication (Diamox) as prescribed by your doctor." },
          ],
        }),
      ]} />

      {/* Hero Section - Immersive */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Mount Kilimanjaro Summit"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                5,895m Summit
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">93% Success Rate</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Kilimanjaro <br />
              <span className="text-[var(--secondary)]">Trekking Routes</span>
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Choose your path to the Roof of Africa. Each route offers a unique experience
              with different scenery, challenge levels, and summit success rates.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                  <Mountain className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{routes.length}</p>
                <p className="text-sm text-white/60">Routes</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">5-10</p>
                <p className="text-sm text-white/60">Days</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                  <Target className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-white">93%</p>
                <p className="text-sm text-white/60">Success</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-white/60">Summits</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#routes" className="btn btn-primary">
                Explore Routes
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/kilimanjaro-join-group-departures/" className="btn btn-outline-white">
                View Group Departures
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
          <Mountain className="w-6 h-6" />
        </div>
      </section>

      {/* Featured Departure Banner */}
      {featuredDeparture && (
        <section className="bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] py-4">
          <div className="container mx-auto px-4">
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="flex flex-wrap items-center justify-center gap-4 text-white hover:opacity-90 transition-opacity"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <strong>Next Group Departure:</strong>
              </span>
              <span>
                {featuredDeparture.route.title} -{" "}
                {new Date(featuredDeparture.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="bg-white py-6 border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-semibold">KINAPA Certified</p>
                <p className="text-xs text-[var(--text-muted)]">Guides</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-semibold">KPAP Partner</p>
                <p className="text-xs text-[var(--text-muted)]">Porter Welfare</p>
              </div>
            </div>
            <a href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Star className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-semibold">4.9/5 Rating</p>
                <p className="text-xs text-[var(--text-muted)]">TripAdvisor</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-semibold">Pulse Oximeters</p>
                <p className="text-xs text-[var(--text-muted)]">Safety First</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Client-Side Filtering */}
      <section id="routes" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<RoutesSkeleton />}>
            <TrekkingPageClient routes={routes} difficulties={sortedDifficulties} />
          </Suspense>
        </div>
      </section>

      {/* Route Comparison Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">How To Choose</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choosing the Right Route
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Each route has its own character. Here&apos;s what to consider when choosing your path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* For Beginners */}
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">For Beginners</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                First-time climbers with moderate fitness
              </p>
              <div className="space-y-2">
                <Link href="/trekking/6-days-marangu-route/" className="block text-emerald-600 font-medium hover:underline">
                  Marangu Route →
                </Link>
                <Link href="/trekking/7-days-rongai-route/" className="block text-emerald-600 font-medium hover:underline">
                  Rongai Route →
                </Link>
              </div>
            </div>

            {/* Most Popular */}
            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Most Popular</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Best scenery and acclimatization
              </p>
              <div className="space-y-2">
                <Link href="/trekking/7-days-machame-route/" className="block text-amber-600 font-medium hover:underline">
                  Machame Route →
                </Link>
                <Link href="/trekking/8-days-lemosho-route/" className="block text-amber-600 font-medium hover:underline">
                  Lemosho Route →
                </Link>
              </div>
            </div>

            {/* Highest Success */}
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Highest Success</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Best acclimatization profiles
              </p>
              <div className="space-y-2">
                <Link href="/trekking/8-days-lemosho-route/" className="block text-blue-600 font-medium hover:underline">
                  Lemosho Route →
                </Link>
                <Link href="/trekking/" className="block text-blue-600 font-medium hover:underline">
                  Northern Circuit →
                </Link>
              </div>
            </div>

            {/* For Adventurers */}
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">For Adventurers</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Less crowded, technical challenge
              </p>
              <div className="space-y-2">
                <Link href="/trekking/6-days-umbwe-route/" className="block text-purple-600 font-medium hover:underline">
                  Umbwe Route →
                </Link>
                <Link href="/trekking/8-days-lemosho-route/" className="block text-purple-600 font-medium hover:underline">
                  Western Breach →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Mountains */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center text-[var(--secondary)]">Beyond Kilimanjaro</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Other Mountains to Climb
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Looking for alternatives? We also guide treks on Tanzania&apos;s other peaks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/mount-meru/" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">🏔️</div>
              <h3 className="font-bold text-xl text-white mb-2">Mount Meru</h3>
              <p className="text-white/70 mb-2">4,566m • 4 Days</p>
              <p className="text-sm text-white/50">
                Tanzania&apos;s second highest peak. Perfect acclimatization before Kilimanjaro.
              </p>
              <span className="inline-block mt-4 text-[var(--secondary)] font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link href="/ol-doinyo-lengai/" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">🌋</div>
              <h3 className="font-bold text-xl text-white mb-2">Ol Doinyo Lengai</h3>
              <p className="text-white/70 mb-2">2,962m • 2 Days</p>
              <p className="text-sm text-white/50">
                Africa&apos;s only active natrocarbonatite volcano. Night summit experience.
              </p>
              <span className="inline-block mt-4 text-[var(--secondary)] font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link href="/mount-kenya/" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">⛰️</div>
              <h3 className="font-bold text-xl text-white mb-2">Mount Kenya</h3>
              <p className="text-white/70 mb-2">5,199m • 5 Days</p>
              <p className="text-sm text-white/50">
                Africa&apos;s second highest peak. Technical climbing available.
              </p>
              <span className="inline-block mt-4 text-[var(--secondary)] font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content — Expanded for depth */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Climbing Mount Kilimanjaro with Snow Africa Adventure</h2>
            <p>
              Mount Kilimanjaro stands at 5,895 meters (19,341 feet) as the highest peak in Africa
              and the tallest free-standing mountain in the world. Located in northeastern Tanzania near
              the town of Moshi, Kilimanjaro is a dormant stratovolcano and one of the Seven Summits —
              the highest peaks on each continent. Unlike most mountains of comparable height, Kilimanjaro
              requires no technical climbing skills, making it accessible to determined trekkers with
              proper preparation.
            </p>
            <p>
              Our experienced guides have led thousands of successful summit attempts across all routes
              since 2008. As a locally owned company based in Arusha, we maintain direct relationships
              with Kilimanjaro National Park (KINAPA), ensure fair wages for all porters through our
              KPAP partnership, and provide the personalized attention that larger operators cannot match.
            </p>

            <h3>Choosing the Right Route</h3>
            <p>
              Each Kilimanjaro route has its own character, scenery, and challenge level. Your choice
              should depend on your fitness level, available time, and what kind of experience you want.
            </p>
            <p>
              The <strong>Machame Route</strong> (7 days) is our most popular choice, nicknamed the
              &quot;Whiskey Route&quot; for its challenging terrain. It offers stunning scenery through
              five distinct climate zones — from rainforest to alpine desert — and has a high success
              rate of 90%+ when done over 7 days.
            </p>
            <p>
              The <strong>Lemosho Route</strong> (8 days) is widely considered the best route on
              Kilimanjaro. It approaches from the remote western side through pristine rainforest,
              offers the best acclimatization profile, and has our highest success rate at 95%+.
              It&apos;s less crowded than Machame for the first few days, giving a more wilderness feel.
            </p>
            <p>
              The <strong>Rongai Route</strong> (7 days) approaches from the north near the Kenyan
              border. It&apos;s the driest route, making it a good choice during rainy seasons, and
              sees fewer trekkers. The gradual ascent makes it suitable for beginners, though the
              scenery is less varied than Machame or Lemosho.
            </p>
            <p>
              The <strong>Northern Circuit Route</strong> (9 days) is the longest and newest route,
              circumnavigating the entire mountain. It provides the best acclimatization of any route
              and virtually guarantees solitude on the northern slopes. We recommend this for trekkers
              who want the ultimate Kilimanjaro experience.
            </p>
            <p>
              The <strong>Marangu Route</strong> (5-6 days) is the only route with hut accommodation
              instead of camping. Known as the &quot;Coca-Cola Route,&quot; it&apos;s the most
              straightforward but has a lower success rate due to its shorter duration.
            </p>

            <h3>Kilimanjaro Route Comparison</h3>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Route</th>
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Days</th>
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Difficulty</th>
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Success Rate</th>
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Traffic</th>
                    <th className="text-left p-3 font-semibold border border-[var(--border)]">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-3 border border-[var(--border)]">Machame</td><td className="p-3 border border-[var(--border)]">7</td><td className="p-3 border border-[var(--border)]">Moderate-Hard</td><td className="p-3 border border-[var(--border)]">90%+</td><td className="p-3 border border-[var(--border)]">High</td><td className="p-3 border border-[var(--border)]">Most climbers</td></tr>
                  <tr><td className="p-3 border border-[var(--border)]">Lemosho</td><td className="p-3 border border-[var(--border)]">8</td><td className="p-3 border border-[var(--border)]">Moderate</td><td className="p-3 border border-[var(--border)]">95%+</td><td className="p-3 border border-[var(--border)]">Low-Medium</td><td className="p-3 border border-[var(--border)]">Best acclimatization</td></tr>
                  <tr><td className="p-3 border border-[var(--border)]">Rongai</td><td className="p-3 border border-[var(--border)]">7</td><td className="p-3 border border-[var(--border)]">Moderate</td><td className="p-3 border border-[var(--border)]">85%+</td><td className="p-3 border border-[var(--border)]">Low</td><td className="p-3 border border-[var(--border)]">Rainy season / beginners</td></tr>
                  <tr><td className="p-3 border border-[var(--border)]">Northern Circuit</td><td className="p-3 border border-[var(--border)]">9</td><td className="p-3 border border-[var(--border)]">Moderate</td><td className="p-3 border border-[var(--border)]">95%+</td><td className="p-3 border border-[var(--border)]">Very Low</td><td className="p-3 border border-[var(--border)]">Ultimate experience</td></tr>
                  <tr><td className="p-3 border border-[var(--border)]">Marangu</td><td className="p-3 border border-[var(--border)]">5-6</td><td className="p-3 border border-[var(--border)]">Moderate</td><td className="p-3 border border-[var(--border)]">65%</td><td className="p-3 border border-[var(--border)]">High</td><td className="p-3 border border-[var(--border)]">Hut accommodation</td></tr>
                  <tr><td className="p-3 border border-[var(--border)]">Umbwe</td><td className="p-3 border border-[var(--border)]">6-7</td><td className="p-3 border border-[var(--border)]">Hard</td><td className="p-3 border border-[var(--border)]">70%</td><td className="p-3 border border-[var(--border)]">Very Low</td><td className="p-3 border border-[var(--border)]">Experienced trekkers</td></tr>
                </tbody>
              </table>
            </div>

            <h3>What&apos;s Included in Every Trek</h3>
            <p>
              Every Kilimanjaro trek with Snow Africa Adventure is fully inclusive so you can focus
              entirely on the climb. Our packages cover everything from the moment you arrive at
              Kilimanjaro International Airport:
            </p>
            <ul>
              <li><strong>Professional KINAPA-certified guides</strong> — experienced, English-speaking mountain guides trained in wilderness first aid</li>
              <li><strong>All park fees and permits</strong> — Kilimanjaro National Park entry fees, camping/hut fees, rescue fees</li>
              <li><strong>Quality camping equipment</strong> — 4-season tents, sleeping mats, dining tent with tables and chairs</li>
              <li><strong>Nutritious meals</strong> — three hot meals daily plus trail snacks and hot beverages, prepared by our mountain chef</li>
              <li><strong>Emergency oxygen and first aid</strong> — carried on every climb as standard equipment</li>
              <li><strong>Airport transfers</strong> — pickup from Kilimanjaro Airport (JRO) and return</li>
              <li><strong>Hotel accommodation</strong> — one night pre-climb and one night post-climb in Moshi or Arusha</li>
              <li><strong>Pulse oximeters</strong> — for monitoring blood oxygen at altitude, checked twice daily</li>
              <li><strong>Porters and cook</strong> — a full support team to carry equipment and prepare meals</li>
            </ul>

            <h3>How to Prepare for Kilimanjaro</h3>
            <p>
              Physical preparation significantly increases your chances of reaching the summit. We
              recommend starting training 2-3 months before your climb:
            </p>
            <ol>
              <li><strong>Build cardiovascular fitness</strong> — hike, run, cycle, or swim 3-4 times per week. Focus on sustained effort over 2-4 hours.</li>
              <li><strong>Practice hiking with elevation</strong> — if possible, hike hills or stairs with a loaded daypack (8-10 kg).</li>
              <li><strong>Strengthen your legs</strong> — squats, lunges, and step-ups help with the long descents.</li>
              <li><strong>Build mental resilience</strong> — summit night is as much mental as physical. Practice pushing through discomfort during training.</li>
              <li><strong>Get proper gear</strong> — we provide a comprehensive packing list after booking. Key items include layered clothing, quality boots (broken in), and a warm sleeping bag rated to -10°C.</li>
            </ol>

            <h3>Our Safety Standards</h3>
            <p>
              Safety is our top priority. All our guides are KINAPA-certified and trained in wilderness
              first aid. They carry emergency oxygen, pulse oximeters, and comprehensive first aid kits
              on every single climb.
            </p>
            <p>
              We follow strict acclimatization protocols including the &quot;climb high, sleep low&quot;
              principle, mandatory health checks twice daily, and a guide-to-climber ratio that ensures
              personalized attention. Our guides monitor every trekker&apos;s blood oxygen levels and
              heart rate, and we maintain clear protocols for when to descend if altitude sickness
              becomes concerning.
            </p>
            <p>
              As a KPAP (Kilimanjaro Porters Assistance Project) partner, we ensure all porters receive
              fair wages, proper equipment, adequate food, and loads within the KINAPA weight limit.
              Ethical treatment of mountain crew isn&apos;t just the right thing to do — it means a
              happier, more motivated team supporting your climb.
            </p>

            <h3>Kilimanjaro Climate Zones</h3>
            <p>
              One of Kilimanjaro&apos;s most remarkable features is that you pass through five distinct
              climate zones on your way to the summit:
            </p>
            <ol>
              <li><strong>Cultivation Zone (800-1,800m)</strong> — farmland and banana plantations surrounding the mountain base.</li>
              <li><strong>Rainforest Zone (1,800-2,800m)</strong> — dense tropical forest with colobus monkeys, exotic birds, and misty trails.</li>
              <li><strong>Heath &amp; Moorland (2,800-4,000m)</strong> — giant heather, lobelia, and groundsel plants in an otherworldly landscape.</li>
              <li><strong>Alpine Desert (4,000-5,000m)</strong> — barren, Mars-like terrain with extreme temperature swings between day and night.</li>
              <li><strong>Arctic Zone (5,000-5,895m)</strong> — glaciers and ice fields at the summit. Temperatures drop to -20°C on summit night.</li>
            </ol>

            <h3>Best Time to Climb Kilimanjaro</h3>
            <p>
              Kilimanjaro can be climbed year-round, but the best conditions are during the dry seasons:
              <strong> January to mid-March</strong> (less crowded, warmer nights) and{" "}
              <strong>June to October</strong> (peak season, clearest skies). The full moon summit
              nights are especially magical — you can often summit by moonlight without a headlamp.
              We recommend avoiding the heavy rain months of April and November.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label justify-center">Common Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Kilimanjaro Trekking FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {KILIMANJARO_FAQS.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl border border-[var(--border)] group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <MultiJsonLd schemas={[
          generateFAQSchema(KILIMANJARO_FAQS),
          generateVideoSchema({
            name: "Climbing Mount Kilimanjaro - Summit to Uhuru Peak",
            description: "Watch our team summit Africa's highest peak via the Machame Route. Experience the five climate zones, from tropical rainforest to arctic glaciers at 5,895 metres.",
            thumbnailUrl: "https://cdn.snowafricaadventure.com/images/kilimanjaro-summit-thumbnail.jpg",
            uploadDate: "2025-06-15",
            duration: "PT8M30S",
          }),
        ]} />
      </section>
    </div>
  );
}

const KILIMANJARO_FAQS = [
  {
    question: "How much does it cost to climb Kilimanjaro?",
    answer: "Climbing Kilimanjaro typically costs between $2,000 and $5,000 per person depending on the route, duration, and group size. This includes park fees, guides, porters, camping equipment, meals, and airport transfers. Our 7-day Machame Route starts at $2,350 per person for group climbs.",
  },
  {
    question: "What is the best time to climb Kilimanjaro?",
    answer: "The best months are January to mid-March and June to October when skies are clearest and conditions are driest. June-October is peak season with the best weather. January-March offers fewer crowds with good conditions. Full moon summit nights are especially popular.",
  },
  {
    question: "How fit do I need to be to climb Kilimanjaro?",
    answer: "You don't need technical climbing experience, but good overall fitness is important. We recommend regular cardio training (hiking, running, cycling) for 2-3 months before your trek. The biggest challenge is altitude, not technical difficulty. Walking 8-10 km with elevation gain is typical daily exertion.",
  },
  {
    question: "What is the success rate for reaching the summit?",
    answer: "Our overall summit success rate is 93%, well above the mountain average of 65%. Success rates vary by route: the Lemosho and Northern Circuit routes have the highest success (95%+) due to better acclimatization. Longer routes (7-9 days) consistently outperform shorter ones.",
  },
  {
    question: "Which Kilimanjaro route is best for beginners?",
    answer: "The Marangu Route (known as the 'Coca-Cola Route') is the most straightforward with hut accommodation instead of camping. However, we recommend the 7-day Machame Route for most first-time climbers — it has better acclimatization, stunning scenery, and a higher success rate than the shorter Marangu option.",
  },
  {
    question: "How dangerous is altitude sickness on Kilimanjaro?",
    answer: "Altitude sickness affects most climbers to some degree, but serious cases are rare with proper acclimatization. Our guides carry pulse oximeters to monitor blood oxygen levels twice daily, emergency oxygen on every trek, and are trained in wilderness first aid. We follow a 'climb high, sleep low' protocol on all routes.",
  },
  {
    question: "What is included in a Kilimanjaro trek package?",
    answer: "Our all-inclusive packages cover: KINAPA-certified mountain guides and porters, all national park entry fees, quality camping equipment (tents, sleeping mats), three nutritious meals daily plus snacks, emergency oxygen and first aid, airport transfers from Kilimanjaro Airport, and pre/post-climb hotel accommodation in Moshi or Arusha.",
  },
  {
    question: "Can I combine a Kilimanjaro trek with a safari?",
    answer: "Yes, this is one of our most popular combinations. Many climbers add a 3-5 day safari to the Serengeti and Ngorongoro Crater after their Kilimanjaro trek. We also offer Kilimanjaro + Zanzibar beach holiday packages. Contact us for combination package pricing.",
  },
  {
    question: "Do I need a guide to climb Kilimanjaro?",
    answer: "Yes, climbing Kilimanjaro without a licensed guide is prohibited by Tanzanian law. All climbers must be accompanied by a registered guide and support team. This regulation ensures safety at high altitude and provides employment for local communities.",
  },
  {
    question: "How long does it take to climb Kilimanjaro?",
    answer: "Routes range from 5 to 10 days depending on the path chosen. We strongly recommend routes of 7 days or longer for the best acclimatization and highest summit success rates. The most popular options are the 7-day Machame Route, 8-day Lemosho Route, and 9-day Northern Circuit Route.",
  },
];

function RoutesSkeleton() {
  return (
    <div className="space-y-8">
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
