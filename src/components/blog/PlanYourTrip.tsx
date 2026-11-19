import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag, TrendingUp } from "lucide-react";
import prisma from "@/lib/prisma";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getKilimanjaroRouteLinks, getSafariPackageLinks, type TripLink } from "@/lib/route-links";

// Shown under the article body. The most-read articles had no path to a
// package or a quote form, so readers left without enquiring.
export const KILI_SLUGS = ["8-days-lemosho-route", "7-days-machame-route", "6-days-marangu-route"];
export const SAFARI_SLUGS = [
  "9-days-tanzania-wildlife-safari-migration",
  "6-days-tanzania-migration-serengeti-ngorongoro-crater-tarangire",
  "4-days-safari-to-ngorongoro-and-serengeti",
];

export interface TripCard {
  href: string;
  title: string;
  image: string | null;
  duration: string;
  detail: string | null;
}

function orderBySlug<T extends { slug: string }>(rows: T[], slugs: string[]): T[] {
  return [...rows].sort((a, b) => {
    const ia = slugs.indexOf(a.slug);
    const ib = slugs.indexOf(b.slug);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

// cache(): the sidebar card and this block ask for the same trips in one
// request, so the query runs once.
export const getTrips = cache(async function getTrips(kind: "kilimanjaro" | "safari"): Promise<TripCard[]> {
  if (kind === "kilimanjaro") {
    const rows = await prisma.trekkingRoute.findMany({
      where: { isActive: true, mountain: "KILIMANJARO" },
      select: { slug: true, title: true, duration: true, successRate: true, featuredImage: true },
    });
    return orderBySlug(rows, KILI_SLUGS)
      .slice(0, 3)
      .map((r) => ({
        href: `/trekking/${r.slug}/`,
        title: r.title,
        image: r.featuredImage,
        duration: r.duration,
        detail: r.successRate ? `${r.successRate}% summit success` : null,
      }));
  }
  const rows = await prisma.safariPackage.findMany({
    where: { isActive: true },
    select: { slug: true, title: true, duration: true, priceFrom: true, featuredImage: true },
  });
  return orderBySlug(rows, SAFARI_SLUGS)
    .slice(0, 3)
    .map((s) => ({
      href: `/tanzania-safaris/${s.slug}/`,
      title: s.title,
      image: s.featuredImage,
      duration: s.duration,
      detail: s.priceFrom ? `From $${Number(s.priceFrom).toLocaleString("en-US")} pp` : null,
    }));
});

interface PlanYourTripProps {
  kind: "kilimanjaro" | "safari";
  postTitle: string;
}

export async function PlanYourTrip({ kind, postTitle }: PlanYourTripProps) {
  let trips: TripCard[] = [];
  try {
    trips = await getTrips(kind);
  } catch (error) {
    // The article must still render if this block's query fails.
    console.error("[PlanYourTrip] Failed to fetch trips:", error);
    return null;
  }
  if (trips.length === 0) return null;

  const isKili = kind === "kilimanjaro";

  // Compact text links to the other live trips of this kind, named by trip,
  // so the article links more than the three cards above.
  const cardHrefs = new Set(trips.map((t) => t.href));
  const moreLinks: TripLink[] = (
    await (isKili ? getKilimanjaroRouteLinks() : getSafariPackageLinks())
  )
    .filter((l) => !cardHrefs.has(l.href))
    .slice(0, 8);
  const allHref = isKili ? "/trekking/" : "/tanzania-safaris/";

  return (
    <section
      aria-labelledby="plan-your-trip"
      className="mt-8 overflow-hidden rounded-2xl bg-[var(--primary-dark)] text-white shadow-sm"
    >
      <div className="p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
          {isKili ? "Climb it with us" : "See it for yourself"}
        </p>
        <h2 id="plan-your-trip" className="mt-2 scroll-mt-28 font-heading text-2xl font-bold md:text-3xl">
          {isKili ? "Plan your Kilimanjaro climb" : "Plan your Tanzania safari"}
        </h2>
        <p className="mt-2 max-w-2xl text-white/75">
          {isKili
            ? "These are the routes our guides lead most often. Pick one, or tell us your dates and we'll suggest the right one."
            : "These are the safaris guests book most often. Pick one, or tell us your dates and we'll plan it around you."}
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {trips.map((trip) => (
            <li key={trip.href}>
              <Link
                href={trip.href}
                className="group flex h-full overflow-hidden sm:flex-col rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
              >
                <div className="relative w-28 shrink-0 bg-white/10 sm:aspect-[16/10] sm:w-auto">
                  {trip.image && (
                    <Image
                      src={trip.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 112px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading font-semibold leading-snug">{trip.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {trip.duration}
                    </span>
                    {trip.detail && (
                      <span className="inline-flex items-center gap-1">
                        {isKili ? (
                          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {trip.detail}
                      </span>
                    )}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-[var(--secondary)]">
                    View itinerary
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {moreLinks.length > 0 && (
          <nav aria-labelledby="more-trips" className="mt-6">
            <h3 id="more-trips" className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
              {isKili ? "Kilimanjaro routes" : "More safari packages"}
            </h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {moreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Link
          href={allHref}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
        >
          {isKili ? "Compare all Kilimanjaro routes" : "See all safari packages"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <div className="mt-8">
          <InquiryForm
            variant="hero"
            relatedTo={postTitle}
            tripType={isKili ? "Kilimanjaro" : "Safari"}
            heroTitle={isKili ? "Get a free climb quote" : "Get a free safari quote"}
            heroSubtitle="Tell us your dates and group size. We reply within 24 hours."
          />
        </div>
      </div>
    </section>
  );
}
