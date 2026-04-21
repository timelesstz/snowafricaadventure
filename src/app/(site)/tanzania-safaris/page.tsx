import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
  generateItemListSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import prisma from "@/lib/prisma";
import { getExperienceYears } from "@/lib/settings";
import { SITE_CONFIG } from "@/lib/constants";
import { SafarisPageClient } from "./SafarisPageClient";
import { SafariInquiryForm } from "@/components/forms/SafariInquiryForm";
import {
  MapPin,
  Camera,
  Shield,
  Star,
  Users,
  Compass,
  ArrowRight,
  CheckCircle,
  Binoculars,
  Tent,
  Hotel,
  Crown,
  Flame,
  Bath,
  UtensilsCrossed,
  Waves,
  Gem,
  Car,
  ConciergeBell,
  Phone,
  MessageCircle,
  BookOpen,
  Quote,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari Packages 2026-2027",
  description:
    "Explore Tanzania's incredible wildlife with our safari packages. From budget camping to luxury lodges, experience the Serengeti, Ngorongoro Crater, Tarangire and more. Book your dream African safari today.",
  url: "/tanzania-safaris/",
});

const LAST_UPDATED = "April 2026";

const TOC_ITEMS = [
  { id: "packages", label: "Browse safari packages" },
  { id: "styles", label: "Choose your safari style" },
  { id: "parks", label: "Parks in focus" },
  { id: "guide", label: "Planning guide" },
  { id: "inquire", label: "Get a custom quote" },
  { id: "faq", label: "Frequently asked questions" },
];

const TESTIMONIALS = [
  {
    quote:
      "Our 7-day Serengeti and Ngorongoro safari was the trip of a lifetime. Our guide spotted everything from the Big Five to a rare serval cat in three days. Everything was handled — airport transfers, park fees, meals — nothing to worry about.",
    author: "Sarah M.",
    location: "United Kingdom",
    trip: "7-day Northern Circuit",
  },
  {
    quote:
      "We combined a 5-day safari with our Kilimanjaro climb and it was perfectly balanced. The team at Snow Africa knew every park, every lodge, and every backroad. Communication before the trip was fast, detailed and honest.",
    author: "Michael K.",
    location: "Germany",
    trip: "5-day Tarangire + Serengeti",
  },
  {
    quote:
      "Locally owned really shows. Our guide was born near the Serengeti and the stories he told made every sighting richer. Booking was transparent — no hidden fees — and the lodge choices exceeded what we expected for the price.",
    author: "Jennifer & David L.",
    location: "United States",
    trip: "8-day Luxury Safari",
  },
];

const PARKS_IN_FOCUS = [
  {
    name: "Serengeti National Park",
    slug: "serengeti-national-park",
    hook: "14,763 km² of endless plains, home to the Great Migration and massive lion prides. Year-round game viewing with legendary Mara River crossings July–October.",
    icon: Sparkles,
    highlight: "The Great Migration",
  },
  {
    name: "Ngorongoro Crater",
    slug: "ngorongoro-crater",
    hook: "A UNESCO World Heritage Site — the world's largest intact volcanic caldera, 260 km² holding ~25,000 large mammals including the endangered black rhino.",
    icon: Binoculars,
    highlight: "Big Five in a day",
  },
  {
    name: "Tarangire National Park",
    slug: "tarangire-national-park",
    hook: "Famous for its ancient baobab trees, the largest elephant herds in northern Tanzania, and over 550 recorded bird species along the Tarangire River.",
    icon: Compass,
    highlight: "Elephants & baobabs",
  },
  {
    name: "Lake Manyara National Park",
    slug: "lake-manyara-national-park",
    hook: "Compact, diverse, and famous for tree-climbing lions. Flamingo-lined alkaline lake, lush groundwater forest, and one of the few parks with night game drives.",
    icon: Waves,
    highlight: "Tree-climbing lions",
  },
  {
    name: "Arusha National Park",
    slug: "arusha-national-park",
    hook: "Often overlooked but excellent for walking safaris, canoeing on Momella Lakes, and views of Mount Meru. An ideal first-day safari close to town.",
    icon: Camera,
    highlight: "Walking safaris",
  },
];

// WhatsApp href: strip everything non-digit, prefix with wa.me/
const whatsappHref = `https://wa.me/${SITE_CONFIG.phone.replace(/\D/g, "")}`;
const telHref = `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;

// Fetch safaris from database with all relevant fields
async function getSafaris() {
  try {
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
  } catch (error) {
    console.error("[Safaris] Failed to fetch safaris:", error);
    return [];
  }
}

// Get unique safari types
async function getSafariTypes() {
  try {
    const types = await prisma.safariPackage.findMany({
      where: { isActive: true },
      select: { type: true },
      distinct: ["type"],
    });
    return types.map((t) => t.type);
  } catch (error) {
    console.error("[Safaris] Failed to fetch safari types:", error);
    return [];
  }
}

export default async function SafarisPage() {
  const [safaris, types, experienceYears] = await Promise.all([getSafaris(), getSafariTypes(), getExperienceYears()]);

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Tanzania Safari Packages" }]} />
      </div>
      <MultiJsonLd schemas={[
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Tanzania Safari Packages", url: "/tanzania-safaris/" },
        ]),
        generateItemListSchema(safaris.map((safari) => ({
          name: safari.title,
          url: `/tanzania-safaris/${safari.slug}/`,
          description: safari.overview || undefined,
          image: safari.featuredImage || undefined,
          price: safari.priceFrom || undefined,
        }))),
        generateAggregateRatingSchema({
          ratingValue: 4.9,
          reviewCount: 115,
          itemName: SITE_CONFIG.name,
          itemType: "TourOperator",
        }),
      ]} />

      {/* Hero Section - Immersive */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/safaritanzania.jpg"
            alt="Lions resting on the Serengeti plains at sunrise — Tanzania safari with Snow Africa Adventure"
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
                2026-2027 Season
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
                  <p className="text-2xl font-bold">{experienceYears}</p>
                  <p className="text-sm text-white/70">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#inquire" className="btn btn-primary">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/tailor-made-safari/" className="btn btn-outline-white">
                Design Your Own Safari
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold transition-colors backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                {SITE_CONFIG.phone}
              </a>
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
            <a href="https://www.tripadvisor.com/Attraction_Review-g297913-d15336338-Reviews-Snow_Africa_Adventures-Arusha_Arusha_Region.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                <Star className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <div>
                <p className="font-semibold">4.9/5</p>
                <p className="text-xs text-[var(--text-muted)]">TripAdvisor</p>
              </div>
            </a>
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

      {/* Testimonial Strip */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.author}
                className="bg-[var(--surface)] rounded-2xl p-6 relative"
              >
                <Quote className="w-8 h-8 text-[var(--secondary)]/30 absolute top-4 right-4" />
                <div className="flex items-center gap-1 mb-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[var(--text)] leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-[var(--text-muted)]">{t.location} · {t.trip}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-10 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4">
              <BookOpen className="w-4 h-4" />
              On this page
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 text-sm hover:shadow-md hover:text-[var(--primary)] transition-all border border-[var(--border)]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Client-Side Filtering */}
      <section id="packages" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<SafarisSkeleton />}>
            <SafarisPageClient safaris={safaris} types={types} />
          </Suspense>
        </div>
      </section>

      {/* Safari Styles — clickable spoke links */}
      <section id="styles" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">Choose Your Style</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Browse Safaris by Style
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Four ways to experience Tanzania — each with its own price point, comfort level, and character. Tap any style for a full list of matching packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Camping */}
            <Link
              href="/tanzania-camping-safaris/"
              className="group relative bg-[var(--surface)] rounded-2xl p-8 border-2 border-transparent hover:border-sky-400 transition-all hover:shadow-lg flex flex-col"
            >
              <div className="absolute -top-4 left-6">
                <span className="px-4 py-1.5 bg-sky-500 text-white rounded-full text-sm font-bold shadow-sm">
                  Budget
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center mb-5 mt-2 group-hover:bg-sky-100 transition-colors">
                <Tent className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Camping Safari</h3>
              <p className="text-[var(--text-muted)] mb-5 leading-relaxed text-sm">
                Fall asleep to the sounds of the wild in quality tents at scenic public campsites — the most authentic bush experience.
              </p>
              <ul className="space-y-2 text-sm mb-5">
                <li className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Campfire evenings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Tent className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Quality dome tents</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Shared campsite facilities</span>
                </li>
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-sky-600 group-hover:gap-2 transition-all">
                Browse camping safaris
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Lodge - Featured */}
            <Link
              href="/tanzania-lodge-safaris/"
              className="group relative bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border-2 border-teal-500 shadow-xl transform md:-translate-y-4 flex flex-col"
            >
              <div className="absolute -top-4 left-6 flex items-center gap-2">
                <span className="px-4 py-1.5 bg-teal-500 text-white rounded-full text-sm font-bold shadow-sm">
                  Mid-Range
                </span>
                <span className="px-3 py-1 bg-white text-teal-600 rounded-full text-xs font-semibold border border-teal-200 shadow-sm">
                  Most Popular
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mb-5 mt-2 group-hover:bg-teal-100 transition-colors">
                <Hotel className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Lodge Safari</h3>
              <p className="text-[var(--text-muted)] mb-5 leading-relaxed text-sm">
                Comfortable lodges and tented camps with en-suite facilities — the ideal blend of comfort, nature, and value.
              </p>
              <ul className="space-y-2 text-sm mb-5">
                <li className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Private en-suite bathrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Full-board restaurant dining</span>
                </li>
                <li className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>Swimming pools &amp; lounges</span>
                </li>
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all">
                Browse lodge safaris
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Luxury */}
            <Link
              href="/luxury-safaris-tanzania/"
              className="group relative bg-[var(--surface)] rounded-2xl p-8 border-2 border-transparent hover:border-amber-400 transition-all hover:shadow-lg flex flex-col"
            >
              <div className="absolute -top-4 left-6">
                <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm font-bold shadow-sm">
                  Luxury
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-5 mt-2 group-hover:bg-amber-100 transition-colors">
                <Crown className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Luxury Safari</h3>
              <p className="text-[var(--text-muted)] mb-5 leading-relaxed text-sm">
                Five-star lodges with world-class amenities, gourmet cuisine, and exclusive wildlife encounters.
              </p>
              <ul className="space-y-2 text-sm mb-5">
                <li className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Five-star lodges &amp; villas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Private game drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <ConciergeBell className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Dedicated butler service</span>
                </li>
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-amber-600 group-hover:gap-2 transition-all">
                Browse luxury safaris
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Tailor-Made */}
            <Link
              href="/tailor-made-safari/"
              className="group relative bg-[var(--surface)] rounded-2xl p-8 border-2 border-transparent hover:border-purple-400 transition-all hover:shadow-lg flex flex-col"
            >
              <div className="absolute -top-4 left-6">
                <span className="px-4 py-1.5 bg-purple-500 text-white rounded-full text-sm font-bold shadow-sm">
                  Tailor-Made
                </span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-5 mt-2 group-hover:bg-purple-100 transition-colors">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Custom Safari</h3>
              <p className="text-[var(--text-muted)] mb-5 leading-relaxed text-sm">
                Built around your interests, dates, and budget. Ideal for families, honeymoons, photography trips, and multi-country itineraries.
              </p>
              <ul className="space-y-2 text-sm mb-5">
                <li className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Private vehicle &amp; guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Any accommodation level</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Combine safari + beach + climb</span>
                </li>
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-purple-600 group-hover:gap-2 transition-all">
                Design your own
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Parks in Focus */}
      <section id="parks" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label justify-center">Northern Circuit</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Parks in Focus
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every Tanzania safari builds on a handful of world-class national parks. Here&apos;s what each one is known for — and what you&apos;ll see there.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PARKS_IN_FOCUS.map((park) => (
              <Link
                key={park.slug}
                href={`/tanzania-destinations/${park.slug}/`}
                className="group bg-white rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--secondary)] hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    <park.icon className="w-6 h-6 text-[var(--secondary)]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--secondary)]">
                    {park.highlight}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{park.name}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {park.hook}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] group-hover:gap-2 transition-all">
                  Explore {park.name.split(" ")[0]}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            See all parks on our <Link href="/tanzania-destinations/" className="text-[var(--primary)] font-semibold hover:underline">Tanzania destinations guide</Link>.
          </p>
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

      {/* SEO Content — Planning Guide */}
      <section id="guide" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Tanzania Safari Planning Guide</h2>
            <p>
              Tanzania offers some of the world&apos;s most spectacular wildlife viewing opportunities.
              With 22 national parks, 33 game reserves, and 44 game-controlled areas covering nearly a
              third of the country, Tanzania protects one of the highest concentrations of wildlife on
              Earth. Home to the legendary{" "}
              <Link href="/tanzania-destinations/serengeti-national-park/">Serengeti</Link>, the stunning{" "}
              <Link href="/tanzania-destinations/ngorongoro-crater/">Ngorongoro Crater</Link>, and
              the elephant-rich{" "}
              <Link href="/tanzania-destinations/tarangire-national-park/">Tarangire</Link>, a Tanzania
              safari is the ultimate African adventure.
            </p>

            <h3>The Great Migration</h3>
            <p>
              Witness nature&apos;s greatest spectacle as over 1.5 million wildebeest, 400,000 zebra,
              and 200,000 gazelle traverse the Serengeti-Mara ecosystem in a continuous clockwise cycle.
              This annual migration covers approximately 800 kilometers and offers some of the most
              dramatic wildlife encounters on the planet.
            </p>
            <p>
              The migration follows a predictable pattern: <strong>January-March</strong> sees the
              calving season in the southern Serengeti, where over 500,000 wildebeest calves are born
              in just a few weeks, attracting predators for spectacular hunting action.{" "}
              <strong>April-June</strong> sees the herds moving northwest through the western corridor
              with dramatic Grumeti River crossings. <strong>July-October</strong> brings the famous
              Mara River crossings in the northern Serengeti — arguably the most iconic wildlife event
              on Earth. <strong>November-December</strong> sees the herds begin their return south.
            </p>

            <h3>The Big Five</h3>
            <p>
              Tanzania is one of the best destinations in Africa to see all of the Big Five: lion,
              leopard, elephant, Cape buffalo, and rhinoceros. The Ngorongoro Crater is particularly
              renowned — it&apos;s one of the few places where you have a realistic chance of seeing
              all five in a single day. The crater&apos;s enclosed ecosystem supports approximately
              25,000 large mammals in just 260 square kilometers.
            </p>
            <p>
              The Serengeti is home to one of the largest lion populations in Africa (over 3,000) and
              is the best place in East Africa to spot leopards, particularly in the Seronera area.
              Tarangire National Park is famous for its enormous elephant herds — up to 300 elephants
              gathering at the Tarangire River during the dry season.
            </p>

            <h3>Safari Pricing Guide</h3>
            <p>
              Tanzania safari costs vary based on accommodation type, season, group size, and parks visited.
              Here&apos;s what to expect per person per day (all-inclusive with park fees, transport, meals,
              and accommodation):
            </p>
            <ul>
              <li><Link href="/tanzania-camping-safaris/"><strong>Budget camping safari</strong></Link>: $250-$350/day — quality tents at public campsites, campfire meals</li>
              <li><Link href="/tanzania-lodge-safaris/"><strong>Mid-range lodge safari</strong></Link>: $350-$500/day — comfortable lodges with en-suite bathrooms, restaurant dining</li>
              <li><Link href="/luxury-safaris-tanzania/"><strong>Luxury safari</strong></Link>: $500-$800+/day — exclusive tented camps and lodges with gourmet cuisine, private guides</li>
            </ul>
            <p>
              Park fees make up a significant portion of the cost (approximately $70-$82 per person per day
              for major parks). Longer safaris offer better value per day since transport costs are
              amortized. Group departures and shared safaris offer savings of 15-25% compared to
              private trips.
            </p>

            <h3>Best Time for a Tanzania Safari</h3>
            <p>
              Tanzania offers excellent game viewing year-round, but the experience varies by season:
            </p>
            <ul>
              <li><strong>Peak dry season (July-October):</strong> Best overall wildlife viewing as animals concentrate around water sources. Excellent for the Great Migration river crossings. Higher prices and more visitors.</li>
              <li><strong>Short dry season (January-February):</strong> Excellent for calving season, predator action, and bird watching. Fewer crowds than peak season.</li>
              <li><strong>Green season (March-May):</strong> Lowest prices, fewest tourists, lush landscapes. Some remote areas may be harder to access. Excellent photography conditions.</li>
              <li><strong>Short rains (November-December):</strong> Brief afternoon showers, green scenery, migratory birds arrive. Good value season with excellent game viewing.</li>
            </ul>

            <h3>Combining Your Safari</h3>
            <p>
              Most travellers pair their safari with at least one other Tanzania experience, since
              everything is close. The three classic combinations we build all the time:
            </p>
            <ul>
              <li>
                <strong>Safari + <Link href="/mount-kilimanjaro/">Kilimanjaro</Link></strong>: climb first, then recover on safari. A 7-day Kilimanjaro climb plus a 4-5 day Northern Circuit safari is our most popular longer itinerary.
              </li>
              <li>
                <strong>Safari + <Link href="/zanzibar/">Zanzibar beach</Link></strong>: end your trip with 3-5 nights on the coast — direct flights from the Serengeti or Arusha. The perfect decompression after dawn-to-dusk game drives.
              </li>
              <li>
                <strong>Safari + cultural experience</strong>: add 1-2 days with a Maasai community, a Hadzabe bushman walk at Lake Eyasi, or a coffee farm tour outside Arusha. These are the trips guests tell us they remember most.
              </li>
            </ul>

            <h3>Why Choose Snow Africa Adventure?</h3>
            <p>
              Since 2008, Snow Africa Adventure has been providing authentic, personalized safari
              experiences across Tanzania. Here&apos;s what sets us apart:
            </p>
            <ul>
              <li><strong>100% locally owned and operated</strong> — founded by Florent and Caroline, your money supports Tanzanian families and communities directly</li>
              <li><strong>Expert guides with {experienceYears} years experience</strong> — our guides are TATO-certified, English-speaking naturalists who know every park intimately</li>
              <li><strong>Small group sizes</strong> — maximum 6 per vehicle for intimate wildlife encounters and flexibility</li>
              <li><strong>Fully customizable itineraries</strong> — every safari tailored to your interests, timeline, and budget</li>
              <li><strong>24/7 support during your safari</strong> — our operations team is always reachable by phone</li>
              <li><strong>Competitive pricing with no hidden fees</strong> — transparent quotes with all park fees, meals, and transfers included</li>
              <li><strong>4.9/5 on TripAdvisor</strong> with 115+ verified reviews and a Travelers&apos; Choice award</li>
              <li><strong>TATO licensed</strong> (Tanzania Association of Tour Operators) and KPAP partner ensuring ethical porter treatment</li>
            </ul>

            <p className="text-sm text-[var(--text-muted)] italic mt-10 pt-6 border-t border-[var(--border)]">
              Last updated: {LAST_UPDATED}. Prices and park fee figures reflect the 2026-2027 season.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquire" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="section-label justify-center">Get a Quote</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
                Get a Custom Safari Quote
              </h2>
              <p className="text-[var(--text-muted)]">
                Tell us what you&apos;re looking for — we&apos;ll reply with a detailed, priced itinerary within 24 hours. No obligation.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border)]">
              <SafariInquiryForm variant="inline" />
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Prefer to talk? Call <a href={telHref} className="text-[var(--primary)] font-semibold hover:underline">{SITE_CONFIG.phone}</a> or message us on <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">WhatsApp</a>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label justify-center">Common Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Tanzania Safari FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {SAFARI_FAQS.map((faq, index) => (
                <details key={index} className="bg-[var(--surface)] rounded-xl border border-[var(--border)] group">
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
          generateFAQSchema(SAFARI_FAQS),
          generateVideoSchema({
            name: "Tanzania Safari Experience - Serengeti & Ngorongoro Crater",
            description: "Experience the magic of a Tanzania safari with Snow Africa Adventure. Watch the Great Migration in the Serengeti, explore the Ngorongoro Crater, and encounter the Big Five up close.",
            thumbnailUrl: "https://cdn.snowafricaadventure.com/images/tanzania-safari-thumbnail.jpg",
            uploadDate: "2025-08-20",
            duration: "PT6M45S",
          }),
        ]} />
      </section>
    </div>
  );
}

const SAFARI_FAQS = [
  {
    question: "How much does a Tanzania safari cost?",
    answer: "Tanzania safari prices range from $250-$800 per person per day depending on accommodation level. A budget camping safari starts around $250/day, mid-range lodge safaris from $350-$500/day, and luxury safaris from $500-$800/day. A typical 5-day safari costs $1,500-$4,000 per person including park fees, transport, meals, and accommodation.",
  },
  {
    question: "What is the best time to go on safari in Tanzania?",
    answer: "The dry season (June-October) offers the best wildlife viewing as animals gather around water sources and vegetation is thinner. The Great Migration river crossings happen July-October. January-March is calving season in the Serengeti with excellent predator action. The green season (November-May) offers lower prices, fewer crowds, and lush landscapes.",
  },
  {
    question: "Can I see the Big Five on a Tanzania safari?",
    answer: "Yes, Tanzania is one of the best countries to see all Big Five animals: lion, leopard, elephant, buffalo, and rhinoceros. The Ngorongoro Crater offers the best chance of seeing all five in a single day. The Serengeti is renowned for its lion and leopard populations, while Tarangire is famous for its large elephant herds.",
  },
  {
    question: "Which park is best for the Big Five?",
    answer: "Ngorongoro Crater is the single best park for Big Five in one day — its enclosed 260 km² caldera supports approximately 25,000 large mammals, including one of Tanzania's few black rhino populations. The Serengeti is the best for lion and leopard numbers (3,000+ lions, highest leopard density in East Africa), while Tarangire offers the highest chance of seeing large elephant herds. Most of our guests see all five on a 5-7 day Northern Circuit safari.",
  },
  {
    question: "How many days do I need for a Tanzania safari?",
    answer: "We recommend a minimum of 3 days, but 5-7 days allows you to visit multiple parks and have a richer experience. A classic 5-day itinerary covers the Serengeti and Ngorongoro Crater. For a comprehensive Northern Circuit experience including Tarangire and Lake Manyara, plan for 7 days. You can combine a safari with Kilimanjaro trekking or a Zanzibar beach holiday.",
  },
  {
    question: "What is the difference between camping and lodge safaris?",
    answer: "Camping safaris use quality dome tents at public campsites — more affordable and adventurous, with campfire evenings under the stars. Lodge safaris provide comfortable rooms with private bathrooms, restaurants, and often swimming pools. Luxury safaris offer exclusive tented camps or lodges with gourmet dining and personalized service. All options include the same game drives and parks.",
  },
  {
    question: "Can I combine a safari with Kilimanjaro?",
    answer: "Yes — this is our most popular longer trip. Most climbers summit Kilimanjaro first (6-9 days, depending on route) and then recover on a 4-5 day Northern Circuit safari. Some prefer the reverse order. See our full Mount Kilimanjaro guide for route options. A combined Kilimanjaro + safari itinerary typically runs 10-16 days.",
  },
  {
    question: "Can I add Zanzibar to my safari?",
    answer: "Absolutely. Most travellers end their safari with 3-5 nights on Zanzibar's beaches — direct flights operate from the Serengeti and Arusha to Zanzibar in under 2 hours. It is the perfect decompression after long game-drive days. We handle the transfers, flights, and beach accommodation as one seamless package.",
  },
  {
    question: "Are family safaris with children available?",
    answer: "Yes. We run many family safaris each season and adjust the itinerary for the age and energy of children: shorter game drives, child-friendly lodges with pools, interactive activities (Maasai village visits, guide-led tracking lessons), and flexible meal times. Park fees for children aged 5-15 are discounted (typically $23 vs $70 for adults). Children under 5 are usually free for park entry but may have age restrictions at luxury lodges.",
  },
  {
    question: "Is Tanzania safe for safari tourists?",
    answer: "Yes, Tanzania is one of the safest African countries for tourism. Safari areas and national parks are well-managed with ranger patrols. Our experienced guides ensure your safety at all times during game drives. As with any travel, we recommend standard precautions with valuables and following your guide's instructions around wildlife.",
  },
  {
    question: "What should I pack for a Tanzania safari?",
    answer: "Essential items include neutral-colored clothing (khaki, olive, beige), a warm jacket for early morning drives, comfortable closed-toe shoes, sunscreen, insect repellent, binoculars, a camera with a zoom lens, and a hat. We provide a detailed packing list after booking. Avoid bright colors and camouflage patterns (camouflage is restricted in Tanzania).",
  },
  {
    question: "When is the Great Migration in the Serengeti?",
    answer: "The Great Migration is a year-round cycle. January-March: calving season in the southern Serengeti with over 500,000 wildebeest born. April-June: herds move northwest through the western corridor. July-October: dramatic river crossings at the Mara River. November-December: herds return south. We can plan your safari to coincide with the most spectacular phase.",
  },
  {
    question: "Can I combine a safari with other activities?",
    answer: "Absolutely. Our most popular combinations are: Safari + Kilimanjaro climb (typically safari after the climb as recovery), Safari + Zanzibar beach holiday (3-5 days on the coast after safari), and Safari + cultural visits to Maasai villages. We specialize in tailor-made itineraries that combine multiple experiences into one seamless trip.",
  },
  {
    question: "Do I need vaccinations for Tanzania?",
    answer: "Yellow fever vaccination is required if arriving from an endemic country and recommended for all visitors. Other recommended vaccinations include hepatitis A, typhoid, and routine boosters. Malaria prophylaxis is strongly recommended for safari areas. Consult your travel doctor 6-8 weeks before your trip for personalized medical advice.",
  },
];

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
