import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag, TrendingUp } from "lucide-react";
import prisma from "@/lib/prisma";
import { pickFeaturedTrip, type PostText } from "@/lib/featured-trip";
import { KILI_SLUGS, SAFARI_SLUGS } from "@/components/blog/PlanYourTrip";
import { TripCardQuote } from "@/components/blog/TripCardQuote";

/**
 * The one trip an article is about, shown in the middle of the article with
 * its own quote form. Readers who reach this point already care about the
 * topic; the card gives them the trip and a way to ask about it in one place.
 */

interface FeaturedTrip {
  href: string;
  title: string;
  image: string | null;
  duration: string;
  detail: string | null;
  summary: string | null;
  tripType: string;
  type: "trekking" | "safari";
}

function safariTripType(slug: string): string {
  if (slug.includes("zanzibar")) return "Wildlife Safari + Zanzibar Beach";
  if (slug.includes("kilimanjaro")) return "Wildlife Safari + Kilimanjaro";
  return "Wildlife Safari";
}

/** First sentence, so the card stays short. */
function firstSentence(text: string | null): string | null {
  if (!text) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? clean;
}

export const getFeaturedTrip = cache(async function getFeaturedTrip(
  kind: "kilimanjaro" | "safari",
  post: PostText
): Promise<FeaturedTrip | null> {
  if (kind === "kilimanjaro") {
    const routes = await prisma.trekkingRoute.findMany({
      where: { isActive: true },
      select: { slug: true, title: true, duration: true, successRate: true, featuredImage: true, metaDescription: true },
    });
    const r = pickFeaturedTrip(post, routes, KILI_SLUGS);
    if (!r) return null;
    return {
      href: `/trekking/${r.slug}/`,
      title: r.title,
      image: r.featuredImage,
      duration: r.duration,
      detail: r.successRate ? `${r.successRate}% summit success` : null,
      summary: firstSentence(r.metaDescription),
      tripType: "Kilimanjaro",
      type: "trekking",
    };
  }
  const safaris = await prisma.safariPackage.findMany({
    where: { isActive: true },
    select: { slug: true, title: true, duration: true, priceFrom: true, featuredImage: true, metaDescription: true },
  });
  const s = pickFeaturedTrip(post, safaris, SAFARI_SLUGS);
  if (!s) return null;
  return {
    href: `/tanzania-safaris/${s.slug}/`,
    title: s.title,
    image: s.featuredImage,
    duration: s.duration,
    detail: s.priceFrom ? `From $${Number(s.priceFrom).toLocaleString("en-US")} pp` : null,
    summary: firstSentence(s.metaDescription),
    tripType: safariTripType(s.slug),
    type: "safari",
  };
});

interface ArticleTripCardProps {
  kind: "kilimanjaro" | "safari";
  post: PostText;
}

export async function ArticleTripCard({ kind, post }: ArticleTripCardProps) {
  let trip: FeaturedTrip | null = null;
  try {
    trip = await getFeaturedTrip(kind, post);
  } catch (error) {
    // The article must still render if this card's query fails.
    console.error("[ArticleTripCard] Failed to fetch trip:", error);
    return null;
  }
  if (!trip) return null;

  const isKili = trip.type === "trekking";

  return (
    <aside
      aria-label={`Featured trip: ${trip.title}`}
      className="@container not-prose my-10 overflow-hidden rounded-2xl bg-[var(--primary-dark)] text-white shadow-md ring-1 ring-black/5"
    >
      <div className="grid @xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Link href={trip.href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] bg-white/10 @xl:aspect-auto">
          {trip.image && (
            <Image
              src={trip.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 90vw, 100vw"
              className="object-cover"
            />
          )}
        </Link>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
            {isKili ? "Climb it with us" : "See it for yourself"}
          </p>
          <p className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl">
            <Link
              href={trip.href}
              className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
            >
              {trip.title}
            </Link>
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {trip.duration}
            </span>
            {trip.detail && (
              <span className="inline-flex items-center gap-1.5">
                {isKili ? <TrendingUp className="h-4 w-4" aria-hidden="true" /> : <Tag className="h-4 w-4" aria-hidden="true" />}
                {trip.detail}
              </span>
            )}
          </div>
          {trip.summary && <p className="mt-3 text-sm leading-relaxed text-white/80">{trip.summary}</p>}
          <Link
            href={trip.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)] underline-offset-4 hover:underline"
          >
            View the day-by-day itinerary
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/15 p-5 sm:p-6">
        <p className="mb-3 text-sm font-semibold">Ask us about this trip</p>
        <TripCardQuote tripTitle={trip.title} tripType={trip.tripType} type={trip.type} postTitle={post.title} />
      </div>
    </aside>
  );
}
