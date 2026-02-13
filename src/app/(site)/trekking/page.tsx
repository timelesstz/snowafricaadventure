import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
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
  title: "Kilimanjaro Trekking Routes | Climb Africa's Highest Peak",
  description:
    "Explore our Kilimanjaro climbing routes. From the popular Machame Route to the scenic Lemosho, find your perfect path to Africa's highest peak. 93% success rate, expert guides.",
  url: "/trekking/",
});

// Fetch routes from database with all relevant fields
async function getRoutes() {
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
}

// Get unique difficulty ratings
async function getDifficulties() {
  const difficulties = await prisma.trekkingRoute.findMany({
    where: { isActive: true },
    select: { physicalRating: true },
    distinct: ["physicalRating"],
  });
  return difficulties.map((d) => d.physicalRating).filter(Boolean) as string[];
}

// Get featured departure
async function getFeaturedDeparture() {
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Star className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-semibold">4.9/5 Rating</p>
                <p className="text-xs text-[var(--text-muted)]">TripAdvisor</p>
              </div>
            </div>
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
                <Link href="/trekking/marangu-route/" className="block text-emerald-600 font-medium hover:underline">
                  Marangu Route →
                </Link>
                <Link href="/trekking/rongai-route/" className="block text-emerald-600 font-medium hover:underline">
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
                <Link href="/trekking/machame-route/" className="block text-amber-600 font-medium hover:underline">
                  Machame Route →
                </Link>
                <Link href="/trekking/lemosho-route/" className="block text-amber-600 font-medium hover:underline">
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
                <Link href="/trekking/lemosho-route/" className="block text-blue-600 font-medium hover:underline">
                  Lemosho Route →
                </Link>
                <Link href="/trekking/northern-circuit-route/" className="block text-blue-600 font-medium hover:underline">
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
                <Link href="/trekking/umbwe-route/" className="block text-purple-600 font-medium hover:underline">
                  Umbwe Route →
                </Link>
                <Link href="/trekking/western-breach-route/" className="block text-purple-600 font-medium hover:underline">
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

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Climbing Mount Kilimanjaro with Snow Africa Adventure</h2>
            <p>
              Mount Kilimanjaro stands at 5,895 meters (19,341 feet) as the highest peak in Africa
              and the tallest free-standing mountain in the world. Our experienced guides have led
              thousands of successful summit attempts across all routes.
            </p>

            <h3>Choosing the Right Route</h3>
            <p>
              Each Kilimanjaro route has its own character. The <strong>Machame Route</strong> is
              our most popular choice, offering excellent scenery and a high success rate. The{" "}
              <strong>Lemosho Route</strong> provides the best acclimatization with 8 days on the
              mountain. For a quieter experience, consider the <strong>Rongai Route</strong>{" "}
              approaching from the north.
            </p>

            <h3>What&apos;s Included in Every Trek</h3>
            <ul>
              <li>Professional KINAPA-certified guides</li>
              <li>All park fees and permits</li>
              <li>Quality camping equipment</li>
              <li>Nutritious meals prepared by our mountain chef</li>
              <li>Emergency oxygen and first aid kit</li>
              <li>Airport transfers and hotel accommodation</li>
              <li>Pulse oximeters for altitude monitoring</li>
              <li>Satellite phone for emergencies</li>
            </ul>

            <h3>Our Safety Standards</h3>
            <p>
              Safety is our top priority. All our guides are trained in wilderness first aid and
              carry emergency oxygen, pulse oximeters, and satellite phones. We follow strict
              acclimatization protocols and maintain a guide-to-climber ratio that ensures
              personalized attention.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

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
