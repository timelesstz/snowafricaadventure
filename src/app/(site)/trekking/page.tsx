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
  Calendar,
  Utensils,
  Plane,
  Hotel,
  Backpack,
  Activity,
  type LucideIcon,
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
        mountain: "KILIMANJARO",
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
      where: { isActive: true, mountain: "KILIMANJARO" },
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

      {/* Route Comparison Guide — Moved before routes to help users decide */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label justify-center">How To Choose</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Which Route Is Right for You?
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Not sure where to start? Pick your climbing style and we&apos;ll point you to the best route.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-shadow">
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

            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 hover:shadow-lg transition-shadow">
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

            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
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
                <Link href="/trekking/9-day-northern-circuit-route-kilimanjaro-guide/" className="block text-blue-600 font-medium hover:underline">
                  Northern Circuit →
                </Link>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
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

      {/* Main Content with Client-Side Filtering */}
      <section id="routes" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<RoutesSkeleton />}>
            <TrekkingPageClient routes={routes} difficulties={sortedDifficulties} />
          </Suspense>
        </div>
      </section>

      {/* CTA Section — Convert browsers into inquiries */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Climb Kilimanjaro?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Tell us your preferred dates and route. We&apos;ll craft a personalized itinerary
              with transparent pricing — no hidden fees.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/inquire/" className="btn btn-secondary">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="btn btn-outline-white">
                Join a Group Departure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included — Visual cards instead of prose */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">All-Inclusive</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What&apos;s Included in Every Trek
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Our packages cover everything so you can focus entirely on the climb.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {INCLUSIONS.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="w-11 h-11 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Prepare — Numbered steps */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">Get Ready</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How to Prepare for Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Start training 2-3 months before your climb. Here&apos;s your roadmap.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {PREPARATION_STEPS.map((step, index) => (
              <div key={step.title} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="bg-white rounded-xl p-5 flex-1 border border-[var(--border)]">
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label justify-center">Compare</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Kilimanjaro Route Comparison
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--primary)] text-white">
                    <th className="text-left p-4 font-semibold">Route</th>
                    <th className="text-left p-4 font-semibold">Days</th>
                    <th className="text-left p-4 font-semibold">Difficulty</th>
                    <th className="text-left p-4 font-semibold">Success Rate</th>
                    <th className="text-left p-4 font-semibold">Traffic</th>
                    <th className="text-left p-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr className="hover:bg-[var(--surface)] transition-colors"><td className="p-4 font-medium">Machame</td><td className="p-4">7</td><td className="p-4">Moderate-Hard</td><td className="p-4 text-emerald-600 font-semibold">90%+</td><td className="p-4">High</td><td className="p-4">Most climbers</td></tr>
                  <tr className="hover:bg-[var(--surface)] transition-colors bg-emerald-50/50"><td className="p-4 font-medium">Lemosho</td><td className="p-4">8</td><td className="p-4">Moderate</td><td className="p-4 text-emerald-600 font-semibold">95%+</td><td className="p-4">Low-Medium</td><td className="p-4">Best acclimatization</td></tr>
                  <tr className="hover:bg-[var(--surface)] transition-colors"><td className="p-4 font-medium">Rongai</td><td className="p-4">7</td><td className="p-4">Moderate</td><td className="p-4 text-emerald-600 font-semibold">85%+</td><td className="p-4">Low</td><td className="p-4">Rainy season / beginners</td></tr>
                  <tr className="hover:bg-[var(--surface)] transition-colors bg-emerald-50/50"><td className="p-4 font-medium">Northern Circuit</td><td className="p-4">9</td><td className="p-4">Moderate</td><td className="p-4 text-emerald-600 font-semibold">95%+</td><td className="p-4">Very Low</td><td className="p-4">Ultimate experience</td></tr>
                  <tr className="hover:bg-[var(--surface)] transition-colors"><td className="p-4 font-medium">Marangu</td><td className="p-4">5-6</td><td className="p-4">Moderate</td><td className="p-4">65%</td><td className="p-4">High</td><td className="p-4">Hut accommodation</td></tr>
                  <tr className="hover:bg-[var(--surface)] transition-colors"><td className="p-4 font-medium">Umbwe</td><td className="p-4">6-7</td><td className="p-4">Hard</td><td className="p-4">70%</td><td className="p-4">Very Low</td><td className="p-4">Experienced trekkers</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Zones + Best Time — Side by side cards */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Climate Zones */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <h3 className="font-heading text-2xl font-bold mb-6">Kilimanjaro Climate Zones</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                You&apos;ll pass through five distinct zones on your way to the summit:
              </p>
              <div className="space-y-4">
                {CLIMATE_ZONES.map((zone) => (
                  <div key={zone.name} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{zone.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{zone.name} <span className="text-[var(--text-muted)] font-normal">({zone.altitude})</span></p>
                      <p className="text-xs text-[var(--text-muted)]">{zone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Time to Climb */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <h3 className="font-heading text-2xl font-bold mb-6">Best Time to Climb</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Kilimanjaro can be climbed year-round, but dry seasons offer the best conditions.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="font-semibold text-amber-800 mb-1">January to mid-March</p>
                  <p className="text-sm text-amber-700">Less crowded, warmer nights. Great visibility.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">June to October</p>
                  <p className="text-sm text-blue-700">Peak season. Clearest skies. Best weather overall.</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="font-semibold text-red-800 mb-1">Avoid: April &amp; November</p>
                  <p className="text-sm text-red-700">Heavy rain months. Lower success rates.</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-6">
                Full moon summit nights are magical — summit by moonlight without a headlamp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Climbing Mount Kilimanjaro — Visual, two-column intro + 4-card safety grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Intro: text + image */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
              <div>
                <span className="section-label">About the Mountain</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-5">
                  Climbing Mount Kilimanjaro with Snow Africa Adventure
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Mount Kilimanjaro stands at <strong className="text-[var(--text)]">5,895 m (19,341 ft)</strong> as
                  the highest peak in Africa and the tallest free-standing mountain in the world. Located
                  in northeastern Tanzania near the town of Moshi, it is a dormant stratovolcano and one
                  of the Seven Summits. Unlike most peaks of comparable height, Kilimanjaro requires no
                  technical climbing skills — making it accessible to determined trekkers with proper
                  preparation.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Our experienced guides have led thousands of successful summit attempts across every
                  route since <strong className="text-[var(--text)]">2008</strong>. As a locally owned
                  company based in Arusha, we maintain direct relationships with Kilimanjaro National
                  Park (KINAPA), ensure fair wages for all porters through our KPAP partnership, and
                  provide the personalized attention that larger operators cannot match.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[5/6] shadow-xl">
                <Image
                  src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
                  alt="Snow Africa Adventure Kilimanjaro guides and climbers"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[var(--text)] text-xs font-semibold shadow">
                    5,895 m Summit
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[var(--text)] text-xs font-semibold shadow">
                    Climbing Since 2008
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/95 text-white text-xs font-semibold shadow">
                    93% Success Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Standards */}
            <div>
              <div className="text-center mb-10">
                <span className="section-label justify-center">Safety First</span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mt-3 mb-3">
                  Our Safety Standards
                </h3>
                <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                  Safety is our top priority on every climb. These four pillars keep our climbers — and
                  our mountain crew — protected from gate to summit.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SAFETY_STANDARDS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <h4 className="font-semibold text-base mb-2">{item.title}</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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

      {/* Other Mountains — Bottom upsell */}
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
              <Mountain className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-white mb-2">Mount Meru</h3>
              <p className="text-white/70 mb-2">4,566m &bull; 4 Days</p>
              <p className="text-sm text-white/50">
                Tanzania&apos;s second highest peak. Perfect acclimatization before Kilimanjaro.
              </p>
              <span className="inline-block mt-4 text-[var(--secondary)] font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link href="/ol-doinyo-lengai/" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <Mountain className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-white mb-2">Ol Doinyo Lengai</h3>
              <p className="text-white/70 mb-2">2,962m &bull; 2 Days</p>
              <p className="text-sm text-white/50">
                Africa&apos;s only active natrocarbonatite volcano. Night summit experience.
              </p>
              <span className="inline-block mt-4 text-[var(--secondary)] font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link href="/mount-kenya/" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <Mountain className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-white mb-2">Mount Kenya</h3>
              <p className="text-white/70 mb-2">5,199m &bull; 5 Days</p>
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
    </div>
  );
}

const INCLUSIONS: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Award, title: "KINAPA-Certified Guides", description: "Experienced, English-speaking mountain guides trained in wilderness first aid." },
  { icon: Shield, title: "All Park Fees & Permits", description: "Kilimanjaro National Park entry, camping/hut fees, and rescue fees included." },
  { icon: Backpack, title: "Quality Equipment", description: "4-season tents, sleeping mats, dining tent with tables and chairs." },
  { icon: Utensils, title: "Nutritious Meals", description: "Three hot meals daily plus trail snacks and beverages, by our mountain chef." },
  { icon: Activity, title: "Emergency Oxygen & First Aid", description: "Pulse oximeters and emergency oxygen carried on every single climb." },
  { icon: Plane, title: "Airport Transfers", description: "Pickup from Kilimanjaro Airport (JRO) and return transfer." },
  { icon: Hotel, title: "Hotel Accommodation", description: "One night pre-climb and one night post-climb in Moshi or Arusha." },
  { icon: Users, title: "Porters & Cook", description: "Full support team to carry equipment and prepare meals on the mountain." },
  { icon: Heart, title: "KPAP Partner", description: "Fair wages, proper equipment, and adequate food for all porters." },
];

const PREPARATION_STEPS = [
  { title: "Build Cardiovascular Fitness", description: "Hike, run, cycle, or swim 3-4 times per week. Focus on sustained effort over 2-4 hours." },
  { title: "Practice Hiking with Elevation", description: "Hike hills or stairs with a loaded daypack (8-10 kg) to simulate trail conditions." },
  { title: "Strengthen Your Legs", description: "Squats, lunges, and step-ups help with the long descents. Focus on endurance over power." },
  { title: "Build Mental Resilience", description: "Summit night is as much mental as physical. Practice pushing through discomfort during training." },
  { title: "Get Proper Gear", description: "We provide a packing list after booking. Key items: layered clothing, broken-in boots, and a -10°C sleeping bag." },
];

const SAFETY_STANDARDS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Shield,
    title: "KINAPA-Certified Guides",
    description:
      "All our guides are KINAPA-certified and trained in wilderness first aid — a guide-to-climber ratio that ensures personalized attention at altitude.",
  },
  {
    icon: Activity,
    title: "Pulse Oximeters & Oxygen",
    description:
      "Mandatory health checks twice daily with pulse oximeters, plus emergency oxygen and comprehensive first aid kits carried on every single climb.",
  },
  {
    icon: Mountain,
    title: "Climb High, Sleep Low",
    description:
      "Strict acclimatization protocols on every route, giving your body the time it needs to adjust safely before the final summit push.",
  },
  {
    icon: Heart,
    title: "KPAP Porter Welfare",
    description:
      "As a KPAP partner, every porter receives fair wages, proper equipment, adequate food, and loads within the KINAPA weight limit — a happier team supports a stronger climb.",
  },
];

const CLIMATE_ZONES = [
  { emoji: "🌾", name: "Cultivation Zone", altitude: "800-1,800m", description: "Farmland and banana plantations at the mountain base." },
  { emoji: "🌿", name: "Rainforest Zone", altitude: "1,800-2,800m", description: "Dense tropical forest with colobus monkeys and exotic birds." },
  { emoji: "🌸", name: "Heath & Moorland", altitude: "2,800-4,000m", description: "Giant heather, lobelia, and groundsel in an otherworldly landscape." },
  { emoji: "🏜️", name: "Alpine Desert", altitude: "4,000-5,000m", description: "Barren, Mars-like terrain with extreme temperature swings." },
  { emoji: "🏔️", name: "Arctic Zone", altitude: "5,000-5,895m", description: "Glaciers and ice fields. Temperatures drop to -20°C on summit night." },
];

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
