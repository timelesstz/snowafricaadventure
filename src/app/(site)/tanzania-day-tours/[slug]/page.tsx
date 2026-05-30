import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Check, X, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateMetadata as genMeta, generateTripSchema, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { findRelatedBlogPosts } from "@/lib/related-content";
import { RelatedBlogPosts } from "@/components/blog/RelatedBlogPosts";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ViewItemTracker } from "@/components/analytics/ViewItemTracker";
import { PublicGallery } from "@/components/ui/PublicGallery";
import type { DayTrip } from "@prisma/client";

interface Props {
  params: Promise<{ slug: string }>;
}

const getDayTrip = cache(async function getDayTrip(slug: string): Promise<DayTrip | null> {
  try {
    const trip = await prisma.dayTrip.findUnique({
      where: { slug },
    });
    return trip;
  } catch {
    return null;
  }
});

async function getOtherDayTrips(currentSlug: string) {
  try {
    return await prisma.dayTrip.findMany({
      where: { slug: { not: currentSlug }, isActive: true },
      take: 3,
      select: { title: true, slug: true, featuredImage: true, priceFrom: true, destination: true },
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getDayTrip(slug);

  if (!trip) return {};

  return genMeta({
    title: trip.metaTitle || trip.title,
    description: trip.metaDescription || trip.description.slice(0, 160),
    url: `/tanzania-day-tours/${slug}/`,
  });
}

export default async function DayTripDetailPage({ params }: Props) {
  const { slug } = await params;
  const trip = await getDayTrip(slug);

  if (!trip) {
    notFound();
  }

  const price = trip.priceFrom ? Number(trip.priceFrom) : 0;
  const heroImage = trip.featuredImage || "/images/placeholder-trip.jpg";
  const galleryImages: string[] = trip.gallery.length > 0 ? trip.gallery : [];
  const galleryAlts = (trip.galleryAlts as Record<string, { alt?: string; caption?: string }> | null) ?? null;

  // Fetch related blog posts and other day trips
  const [relatedPosts, otherTrips] = await Promise.all([
    findRelatedBlogPosts(
      [trip.title, trip.destination].filter(Boolean),
      [],
      3
    ),
    getOtherDayTrips(slug),
  ]);

  return (
    <div>
      <MultiJsonLd schemas={[
        generateTripSchema({
          name: trip.title,
          description: trip.description.slice(0, 200),
          url: `/tanzania-day-tours/${slug}/`,
          duration: "P1D",
          image: heroImage,
        }),
        generateProductSchema({
          name: trip.title,
          description: trip.description.slice(0, 200),
          url: `/tanzania-day-tours/${slug}/`,
          image: heroImage,
          price,
          ratingValue: 5,
          reviewCount: 12,
        }),
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Day Tours", url: "/tanzania-day-tours/" },
          { name: trip.title, url: `/tanzania-day-tours/${slug}/` },
        ]),
      ]} />

      {/* Analytics: Track item view */}
      <ViewItemTracker
        itemId={trip.id}
        itemName={trip.title}
        itemCategory="daytrip"
        price={price}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={heroImage}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <nav className="text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/tanzania-day-tours/" className="hover:text-white">
                Tanzania Day Tours
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{trip.title}</span>
            </nav>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              {trip.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {trip.destination}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Bar */}
      {price > 0 && (
        <section className="bg-[var(--primary)] text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[var(--primary-light)] text-sm">Price per person</span>
                <div className="text-3xl font-bold">${price} USD</div>
              </div>
              <div className="flex gap-4">
                <a
                  href="#booking-form"
                  className="bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book This Trip
                </a>
                <a
                  href="https://wa.me/255123456789"
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-bold mb-4">
                  About This Trip
                </h2>
                <div className="prose prose-slate max-w-none">
                  {trip.description.split("\n").map((p: string, i: number) =>
                    p.trim() ? <p key={i}>{p.trim()}</p> : null
                  )}
                </div>
              </div>

              {/* Highlights */}
              {trip.highlights.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-2xl font-bold mb-4">
                    Trip Highlights
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {trip.highlights.map((h: string, i: number) => (
                      <span
                        key={i}
                        className="bg-[var(--primary-light)] text-[var(--primary)] px-4 py-2 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions/Exclusions */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {trip.inclusions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-[var(--primary)]" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-2">
                      {trip.inclusions.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[var(--text-muted)]"
                        >
                          <Check className="w-4 h-4 text-[var(--primary)] mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trip.exclusions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trip.exclusions.map((item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[var(--text-muted)]"
                        >
                          <X className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div
                id="booking-form"
                className="sticky top-24 bg-[var(--surface)] rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--primary)]" />
                  Book This Trip
                </h3>
                <InquiryForm
                  variant="sidebar"
                  relatedTo={trip.title}
                  tripType="day-trip"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <PublicGallery
          title={`${trip.title} — Gallery`}
          images={galleryImages}
          alts={galleryAlts}
          fallbackAltPrefix={trip.title}
        />
      )}

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <RelatedBlogPosts posts={relatedPosts} heading={`Articles About ${trip.title.split(' ').slice(-2).join(' ')}`} />
      )}

      {/* Other Trips */}
      {otherTrips.length > 0 && (
        <section className="py-12 bg-[var(--muted)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-8">
              More Day Trips
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherTrips.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tanzania-day-tours/${t.slug}/`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={t.featuredImage || "/images/placeholder-trip.jpg"}
                      alt={t.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {t.priceFrom && (
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-[var(--primary)]">
                        ${Number(t.priceFrom)}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{t.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{t.destination || "Tanzania"}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tanzania-day-tours/"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
              >
                View All Day Tours →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
