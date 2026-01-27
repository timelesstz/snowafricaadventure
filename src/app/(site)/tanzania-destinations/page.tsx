import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Tanzania Destinations",
  description:
    "Explore Tanzania's most iconic destinations - Serengeti, Ngorongoro Crater, Tarangire, Lake Manyara, and more. Plan your perfect safari adventure.",
  url: "/tanzania-destinations/",
});

async function getDestinations() {
  try {
    const destinations = await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return destinations;
  } catch {
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  // Placeholder data for development
  const placeholderDestinations = [
    {
      id: "1",
      name: "Serengeti National Park",
      slug: "serengeti-national-park",
      shortDescription:
        "The endless plains of Serengeti host the Great Migration and offer unparalleled wildlife viewing year-round.",
      heroImage: "/images/destinations/serengeti.jpg",
      highlights: ["Great Migration", "Big Five", "Endless Plains"],
    },
    {
      id: "2",
      name: "Ngorongoro Crater",
      slug: "ngorongoro-crater",
      shortDescription:
        "The world's largest intact volcanic caldera, home to an incredible concentration of wildlife.",
      heroImage: "/images/destinations/ngorongoro.jpg",
      highlights: ["UNESCO World Heritage", "Big Five", "Crater Floor"],
    },
    {
      id: "3",
      name: "Tarangire National Park",
      slug: "tarangire-national-park",
      shortDescription:
        "Famous for its giant baobab trees and large elephant herds, especially during the dry season.",
      heroImage: "/images/destinations/tarangire.jpg",
      highlights: ["Elephant Herds", "Baobab Trees", "Bird Watching"],
    },
    {
      id: "4",
      name: "Lake Manyara National Park",
      slug: "lake-manyara-national-park",
      shortDescription:
        "A compact park known for tree-climbing lions, flamingos, and diverse ecosystems.",
      heroImage: "/images/destinations/manyara.jpg",
      highlights: ["Tree-climbing Lions", "Flamingos", "Hot Springs"],
    },
    {
      id: "5",
      name: "Mount Kilimanjaro",
      slug: "mount-kilimanjaro",
      shortDescription:
        "Africa's highest peak and the world's tallest free-standing mountain at 5,895m.",
      heroImage: "/images/destinations/kilimanjaro.jpg",
      highlights: ["Uhuru Peak", "Glaciers", "5 Climate Zones"],
    },
    {
      id: "6",
      name: "Zanzibar Island",
      slug: "zanzibar-island",
      shortDescription:
        "The Spice Island offers pristine beaches, historic Stone Town, and rich Swahili culture.",
      heroImage: "/images/destinations/zanzibar.jpg",
      highlights: ["Stone Town", "Spice Tours", "Beach Paradise"],
    },
  ];

  const displayDestinations =
    destinations.length > 0 ? destinations : placeholderDestinations;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Tanzania Destinations
          </h1>
          <p className="text-xl text-[var(--secondary-light)] max-w-2xl">
            From the endless plains of Serengeti to the beaches of Zanzibar,
            discover Tanzania&apos;s most spectacular destinations.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Explore East Africa&apos;s Crown Jewels
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Tanzania is blessed with an extraordinary diversity of landscapes
              and wildlife. Our safaris take you through the famous Northern
              Circuit, home to some of the world&apos;s most celebrated national
              parks and conservation areas.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDestinations.map((destItem) => {
              // Handle both DB and placeholder structures
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const dest = destItem as any;
              return (
                <DestinationCard
                  key={dest.id}
                  name={dest.name}
                  slug={dest.slug}
                  circuit={dest.circuit || "Northern"}
                  description={dest.description || dest.shortDescription || ""}
                  featuredImage={dest.featuredImage || dest.heroImage || "/images/placeholder-destination.jpg"}
                  wildlife={dest.wildlife || dest.highlights || ["Various wildlife"]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4">
                The Northern Safari Circuit
              </h2>
              <p className="text-[var(--primary-light)] mb-6">
                The Northern Circuit is Tanzania&apos;s most popular safari
                region, offering easy access to world-renowned parks including
                the Serengeti, Ngorongoro Crater, Tarangire, and Lake Manyara.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>All parks within 3-4 hours of Arusha</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Year-round wildlife viewing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Great Migration from December to July</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                  <span>Combine with Kilimanjaro or Zanzibar</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-[var(--primary-light)]">Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Best Time to Visit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>☀️</span> Dry Season
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">June - October</p>
              <p className="text-[var(--text-muted)] text-sm">
                Best for wildlife viewing. Animals gather at water sources.
                Clear skies for Kilimanjaro.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🌱</span> Green Season
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">November - May</p>
              <p className="text-[var(--text-muted)] text-sm">
                Lush landscapes, newborn animals, fewer crowds, and lower
                prices. Great for bird watching.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🦁</span> Migration
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">Year-round</p>
              <p className="text-[var(--text-muted)] text-sm">
                The Great Migration is always moving. Calving season in
                Jan-March. River crossings in Jul-Oct.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🏔️</span> Kilimanjaro
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">Jan-March, Jun-Oct</p>
              <p className="text-[var(--text-muted)] text-sm">
                Best climbing months with clearer skies and drier conditions.
                Full moon climbs are magical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Explore Tanzania?
          </h2>
          <p className="text-[var(--text-muted)] mb-6 max-w-2xl mx-auto">
            Let us help you plan your perfect safari adventure. Our team knows
            these destinations inside out and will create an itinerary tailored
            to your interests.
          </p>
          <Link
            href="/contact-us/"
            className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Planning Your Safari
          </Link>
        </div>
      </section>
    </div>
  );
}
