import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { generateMetadata as genMeta, generateTouristDestinationSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { SafariCard } from "@/components/cards/SafariCard";
import { PublicGallery } from "@/components/ui/PublicGallery";
import { findRelatedBlogPosts } from "@/lib/related-content";
import { RelatedBlogPosts } from "@/components/blog/RelatedBlogPosts";

interface Props {
  params: Promise<{ destSlug: string }>;
}

const getDestination = cache(async function getDestination(slug: string) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        safaris: {
          where: { safari: { isActive: true } },
          take: 3,
          include: { safari: true },
        },
      },
    });
    return destination;
  } catch {
    return null;
  }
});

async function getFallbackSafaris() {
  try {
    return await prisma.safariPackage.findMany({
      where: { isActive: true },
      take: 3,
      select: { title: true, slug: true, duration: true, type: true, priceFrom: true, featuredImage: true, overview: true },
    });
  } catch { return []; }
}

async function getOtherDestinations(currentSlug: string) {
  try {
    return await prisma.destination.findMany({
      where: { slug: { not: currentSlug }, isActive: true },
      take: 4,
      select: { name: true, slug: true, featuredImage: true },
    });
  } catch { return []; }
}

type DestinationResult = NonNullable<Awaited<ReturnType<typeof getDestination>>>;
type LinkedSafari = DestinationResult["safaris"][number]["safari"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);

  if (!destination) return {};

  const metaDesc = destination.metaDescription || destination.description.slice(0, 160);

  return genMeta({
    title: destination.name,
    description: metaDesc,
    url: `/tanzania-destinations/${destSlug}/`,
  });
}

export default async function DestinationDetailPage({ params }: Props) {
  const { destSlug } = await params;
  const destination = await getDestination(destSlug);

  if (!destination) {
    notFound();
  }

  const {
    name,
    description,
    featuredImage,
    highlights,
    bestTime,
    circuit,
    wildlife,
    gallery,
    galleryAlts,
  } = destination;

  const heroImage = featuredImage || "/images/placeholder-destination.jpg";
  const bestTimeToVisit = bestTime || "Year-round";
  const location = circuit || "Tanzania";

  // Extract real linked safaris from the DB join table
  const linkedSafaris: LinkedSafari[] = destination.safaris
    .map((s) => s.safari)
    .filter(Boolean);
  const displaySafaris = linkedSafaris.length > 0 ? linkedSafaris : await getFallbackSafaris();

  // Fetch other destinations from DB
  const otherDestinations = await getOtherDestinations(destSlug);

  // Fetch related blog posts
  const blogKeywords = [name, ...wildlife.slice(0, 3)];
  const relatedPosts = await findRelatedBlogPosts(blogKeywords, [], 3);

  const galleryAltsTyped = galleryAlts as Record<string, { alt?: string; caption?: string }> | null;

  return (
    <div>
      <MultiJsonLd schemas={[
        generateTouristDestinationSchema({
          name,
          description: description.slice(0, 300),
          url: `/tanzania-destinations/${destSlug}/`,
          image: heroImage,
        }),
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/tanzania-destinations/" },
          { name, url: `/tanzania-destinations/${destSlug}/` },
        ]),
      ]} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={heroImage}
          alt={name}
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
              <Link href="/tanzania-destinations/" className="hover:text-white">
                Destinations
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {name}
            </h1>
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-[var(--primary)] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--secondary)]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--secondary)]" />
              <span>Best: {bestTimeToVisit.split(";")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--secondary)]" />
              <span>Must-Visit Destination</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl font-bold mb-6">
                About {name}
              </h2>
              <div className="prose prose-slate prose-lg max-w-none">
                {description.split("\n").map((paragraph, i) =>
                  paragraph.trim() ? <p key={i}>{paragraph.trim()}</p> : null
                )}
              </div>

              {/* Wildlife */}
              {wildlife.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Wildlife You&apos;ll See
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {wildlife.map((animal, i) => (
                      <span
                        key={i}
                        className="bg-[var(--muted)] text-[var(--text)] px-4 py-2 rounded-full text-sm"
                      >
                        {animal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Best Time */}
              <div className="bg-[var(--secondary-light)] border border-[var(--secondary)] rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--secondary-dark)]" />
                  Best Time to Visit
                </h3>
                <p className="text-[var(--text-muted)]">{bestTimeToVisit}</p>
              </div>

              {/* Inquiry CTA */}
              <div className="bg-[var(--primary)] text-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Plan Your Visit to {name}
                </h3>
                <p className="text-[var(--primary-light)] text-sm mb-4">
                  Let us create a custom safari itinerary featuring this
                  incredible destination.
                </p>
                <Link
                  href="/contact-us/"
                  className="block text-center bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded font-semibold transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts
        posts={relatedPosts}
        heading={`Articles About ${name}`}
      />

      {/* Photo Gallery */}
      {gallery.length > 0 && (
        <PublicGallery
          title={`${name} — Gallery`}
          images={gallery}
          alts={galleryAltsTyped}
          fallbackAltPrefix={name}
          className="bg-[var(--surface)]"
        />
      )}

      {/* Related Safaris */}
      {displaySafaris.length > 0 && (
        <section className="py-12 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-10">
              Safaris Featuring {name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {displaySafaris.map((safari, i) => (
                <SafariCard
                  key={safari.slug || i}
                  title={safari.title}
                  slug={safari.slug}
                  duration={safari.duration}
                  type={safari.type}
                  priceFrom={safari.priceFrom != null ? Number(safari.priceFrom) : undefined}
                  featuredImage={safari.featuredImage ?? undefined}
                  overview={safari.overview ?? undefined}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tanzania-safaris/"
                className="inline-block text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
              >
                View All Safari Packages →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Destinations */}
      {otherDestinations.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-10">
              Explore More Destinations
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {otherDestinations.map((od) => (
                <Link
                  key={od.slug}
                  href={`/tanzania-destinations/${od.slug}/`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <Image
                      src={od.featuredImage || "/images/placeholder-destination.jpg"}
                      alt={od.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{od.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
