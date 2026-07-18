import { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mountain, MapPin, Clock, ChevronRight } from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RouteCard } from "@/components/cards/RouteCard";

// Routes are editable in the admin, so revalidate rather than serving a
// build-time snapshot indefinitely.
export const revalidate = 300;

export const metadata: Metadata = genMeta({
  title: "Mountain Trekking in Tanzania — Mount Meru & Ol Doinyo Lengai",
  description:
    "Trek Tanzania's other great mountains. Climb Mount Meru (4,562m), the country's second-highest peak, or summit the active volcano Ol Doinyo Lengai. Expert local guides from Arusha.",
  url: "/mountain-trekking/",
});

// Each non-Kilimanjaro mountain gets its own group so the page reads as a
// guide to the peaks rather than a flat list of packages.
const MOUNTAINS = [
  {
    key: "MERU" as const,
    name: "Mount Meru",
    height: "4,562 m (14,968 ft)",
    location: "Arusha National Park",
    blurb:
      "Tanzania's second-highest peak and one of Africa's most rewarding treks. Meru is often climbed as acclimatisation before Kilimanjaro, but its knife-edge summit ridge and wildlife-rich lower slopes make it a superb objective in its own right — you walk the first day with an armed ranger through buffalo and giraffe country.",
  },
  {
    key: "LENGAI" as const,
    name: "Ol Doinyo Lengai",
    height: "2,962 m (9,718 ft)",
    location: "Lake Natron, Rift Valley",
    blurb:
      "The Maasai call it the Mountain of God, and it is the only active carbonatite volcano on Earth. The climb starts around midnight so you reach the crater rim at sunrise, looking out over the Rift Valley and Lake Natron. Steep, demanding, and completely unlike anything on Kilimanjaro.",
  },
];

type TrekRoute = {
  slug: string;
  title: string;
  duration: string;
  physicalRating: string | null;
  maxPeople: number | null;
  featuredImage: string | null;
  overview: string;
  summitHeight: string | null;
  mountain: "KILIMANJARO" | "MERU" | "LENGAI";
};

const getRoutes = cache(async function getRoutes(): Promise<TrekRoute[]> {
  try {
    return await prisma.trekkingRoute.findMany({
      where: {
        isActive: true,
        mountain: { not: "KILIMANJARO" },
      },
      select: {
        slug: true,
        title: true,
        duration: true,
        physicalRating: true,
        maxPeople: true,
        featuredImage: true,
        overview: true,
        summitHeight: true,
        mountain: true,
      },
      orderBy: { durationDays: "asc" },
    });
  } catch (error) {
    console.error("[MountainTrekking] Failed to fetch routes:", error);
    return [];
  }
});

export default async function MountainTrekkingPage() {
  const routes = await getRoutes();

  const groups = MOUNTAINS.map((m) => ({
    ...m,
    routes: routes.filter((r) => r.mountain === m.key),
  })).filter((g) => g.routes.length > 0);

  const heroImage =
    routes.find((r) => r.featuredImage)?.featuredImage ??
    "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Trekking", href: "/trekking/" },
            { label: "Mountain Trekking" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Mountain Trekking", url: "/mountain-trekking/" },
          ]),
          generateItemListSchema(
            routes.map((route) => ({
              name: route.title,
              url: `/trekking/${route.slug}/`,
              description: route.overview || undefined,
              image: route.featuredImage || undefined,
            }))
          ),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt="Trekking Tanzania's mountains beyond Kilimanjaro"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold mb-6">
              <Mountain className="w-4 h-4" /> Beyond Kilimanjaro
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Mountain Trekking in Tanzania
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
              Kilimanjaro is not the only summit worth your boots. Climb Mount Meru&apos;s
              spectacular crater rim or stand on the ash cone of Ol Doinyo Lengai, the only
              active carbonatite volcano on Earth.
            </p>
          </div>
        </div>
      </section>

      {/* Mountain groups */}
      {groups.length === 0 ? (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Mountain className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-muted)]">
              No mountain treks are currently available. Please check back soon.
            </p>
            <Link
              href="/trekking/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:opacity-90"
            >
              View Kilimanjaro routes
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      ) : (
        groups.map((group, index) => (
          <section
            key={group.key}
            className={index % 2 === 0 ? "py-16" : "py-16 bg-white"}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold">
                      {group.name}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm font-medium">
                      <Mountain className="w-3.5 h-3.5 text-[var(--secondary)]" />
                      {group.height}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[var(--secondary)]" />
                      {group.location}
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">{group.blurb}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.routes.map((route) => (
                    <RouteCard
                      key={route.slug}
                      slug={route.slug}
                      title={route.title}
                      duration={route.duration}
                      physicalRating={route.physicalRating}
                      maxPeople={route.maxPeople}
                      featuredImage={route.featuredImage}
                      overview={route.overview}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))
      )}

      {/* Cross-link back to Kilimanjaro */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Climbing Kilimanjaro too?
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Mount Meru is the classic acclimatisation trek before Kilimanjaro — four days on
              Meru dramatically improves your odds on Uhuru Peak. We can combine both into a
              single itinerary.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/trekking/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white font-semibold rounded-lg hover:opacity-90"
              >
                <Clock className="w-4 h-4" />
                View Kilimanjaro routes
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10"
              >
                Plan a combined trek
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
