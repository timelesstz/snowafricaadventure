import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/seo";
import prisma from "@/lib/prisma";
import { SafarisPageClient } from "./SafarisPageClient";
import {
  MapPin,
  Camera,
  Shield,
  Star,
  Users,
  Compass,
  ArrowRight,
  CheckCircle,
  Binoculars
} from "lucide-react";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari Packages | Wildlife Adventures 2025-2026",
  description:
    "Explore Tanzania's incredible wildlife with our safari packages. From budget camping to luxury lodges, experience the Serengeti, Ngorongoro Crater, Tarangire and more. Book your dream African safari today.",
  url: "/tanzania-safaris/",
});

// Fetch safaris from database with all relevant fields
async function getSafaris() {
  const safaris = await prisma.safariPackage.findMany({
    where: {
      isActive: true,
    },
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
      rating: true,
      highlights: true,
      destinations: {
        select: {
          destination: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      durationDays: "asc",
    },
  });

  return safaris.map((safari) => ({
    ...safari,
    priceFrom: safari.priceFrom ? Number(safari.priceFrom) : null,
    rating: safari.rating ? Number(safari.rating) : null,
    destinations: safari.destinations.map((d) => d.destination.name),
  }));
}

// Get unique safari types
async function getSafariTypes() {
  const types = await prisma.safariPackage.findMany({
    where: { isActive: true },
    select: { type: true },
    distinct: ["type"],
  });
  return types.map((t) => t.type);
}

export default async function SafarisPage() {
  const [safaris, types] = await Promise.all([getSafaris(), getSafariTypes()]);

  const featuredSafari = safaris.find((s) => s.type === "Mid-Range") || safaris[0];

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Hero Section - Immersive */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg"
            alt="Tanzania Safari Wildlife"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                2025-2026 Season
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rating • 115+ Reviews</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tanzania Safari <br />
              <span className="text-[var(--secondary)]">Packages</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              From the endless plains of the Serengeti to the wildlife-rich Ngorongoro Crater,
              experience Africa&apos;s most spectacular safari destinations with Tanzania&apos;s
              trusted local operator.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{safaris.length}+</p>
                  <p className="text-sm text-white/70">Safari Options</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-white/70">National Parks</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-white/70">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#safaris" className="btn btn-primary">
                Explore Safaris
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/tailor-made-safari/" className="btn btn-outline-white">
                Design Your Own Safari
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-6 border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-semibold">TATO Licensed</p>
                <p className="text-xs text-[var(--text-muted)]">Tour Operator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Users className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-semibold">5,000+</p>
                <p className="text-xs text-[var(--text-muted)]">Happy Travelers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Star className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-semibold">4.9/5</p>
                <p className="text-xs text-[var(--text-muted)]">TripAdvisor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Binoculars className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-semibold">Big Five</p>
                <p className="text-xs text-[var(--text-muted)]">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Client-Side Filtering */}
      <section id="safaris" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<SafarisSkeleton />}>
            <SafarisPageClient safaris={safaris} types={types} />
          </Suspense>
        </div>
      </section>

      {/* Safari Types Explained */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">Choose Your Style</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Safari Accommodation Types
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              We offer three distinct safari experiences to match your preferences and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Budget */}
            <div className="group relative bg-[var(--surface)] rounded-2xl p-8 border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="absolute -top-4 left-6">
                <span className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-bold">
                  Budget
                </span>
              </div>
              <div className="text-5xl mb-4 mt-2">⛺</div>
              <h3 className="font-heading text-xl font-bold mb-3">Camping Safari</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Sleep under the stars in quality tents at public campsites. Perfect for
                adventurers seeking an authentic bush experience.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Public campsites</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Dome tents provided</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Shared facilities</span>
                </li>
              </ul>
            </div>

            {/* Mid-Range - Featured */}
            <div className="group relative bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 border-2 border-emerald-500 shadow-xl transform md:-translate-y-4">
              <div className="absolute -top-4 left-6 flex items-center gap-2">
                <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-sm font-bold">
                  Mid-Range
                </span>
                <span className="px-3 py-1 bg-white text-emerald-600 rounded-full text-xs font-semibold border border-emerald-200">
                  Most Popular
                </span>
              </div>
              <div className="text-5xl mb-4 mt-2">🏨</div>
              <h3 className="font-heading text-xl font-bold mb-3">Lodge Safari</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Comfortable lodges and tented camps with en-suite facilities. The perfect
                balance of comfort and value.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>En-suite bathrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Restaurant dining</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Swimming pools</span>
                </li>
              </ul>
            </div>

            {/* Luxury */}
            <div className="group relative bg-[var(--surface)] rounded-2xl p-8 border-2 border-transparent hover:border-amber-500 transition-all">
              <div className="absolute -top-4 left-6">
                <span className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-sm font-bold">
                  Luxury
                </span>
              </div>
              <div className="text-5xl mb-4 mt-2">✨</div>
              <h3 className="font-heading text-xl font-bold mb-3">Luxury Safari</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Premium lodges with world-class amenities, gourmet dining, and exclusive
                experiences for discerning travelers.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500" />
                  <span>5-star lodges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500" />
                  <span>Private game drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500" />
                  <span>Butler service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We specialize in tailor-made safaris designed around your interests, schedule, and budget.
            Let our experts create your perfect Tanzania adventure.
          </p>
          <Link href="/tailor-made-safari/" className="btn btn-primary inline-flex">
            Design Your Custom Safari
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Tanzania Safari Experience</h2>
            <p>
              Tanzania offers some of the world&apos;s most spectacular wildlife viewing opportunities.
              Home to the legendary Serengeti, the stunning Ngorongoro Crater, and the elephant-rich
              Tarangire, a Tanzania safari is the ultimate African adventure.
            </p>

            <h3>The Great Migration</h3>
            <p>
              Witness nature&apos;s greatest spectacle as millions of wildebeest and zebra traverse
              the Serengeti plains. This annual migration offers unforgettable sightings and
              dramatic river crossings.
            </p>

            <h3>The Big Five</h3>
            <p>
              Tanzania is one of the best destinations to see all of the Big Five: lion, leopard,
              elephant, buffalo, and rhinoceros. Our experienced guides know exactly where to find them.
            </p>

            <h3>Why Choose Snow Africa Adventure?</h3>
            <ul>
              <li>Locally owned and operated since 2010</li>
              <li>Expert guides with 10+ years experience</li>
              <li>Small group sizes for intimate experiences</li>
              <li>Customizable itineraries to match your preferences</li>
              <li>24/7 support during your safari</li>
              <li>Competitive pricing with no hidden fees</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function SafarisSkeleton() {
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
