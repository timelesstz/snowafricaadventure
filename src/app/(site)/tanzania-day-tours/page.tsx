import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, DollarSign } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = genMeta({
  title: "Tanzania Day Tours from Arusha",
  description:
    "Explore Tanzania's highlights in a single day. Day tours to Arusha National Park, Materuni Waterfalls, Ngorongoro Crater, Maasai villages, coffee tours, and more.",
  url: "/tanzania-day-tours/",
});

async function getDayTrips() {
  try {
    const trips = await prisma.dayTrip.findMany({
      where: { isActive: true },
      orderBy: { title: "asc" },
    });
    return trips;
  } catch {
    return [];
  }
}

// Placeholder data
const placeholderTrips = [
  {
    id: "1",
    name: "Arusha National Park Day Safari",
    slug: "arusha-national-park-day-safari",
    shortDescription:
      "Game drive and walking safari in the shadow of Mount Meru, with diverse wildlife and stunning scenery.",
    price: 180,
    duration: "Full Day (8-9 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Arusha-National-Park-Day-trip.jpg",
    highlights: ["Walking Safari", "Game Drive", "Momella Lakes", "Mount Meru Views"],
    groupSize: "2-6 people",
  },
  {
    id: "2",
    name: "Materuni Waterfalls & Coffee Tour",
    slug: "materuni-waterfalls-coffee-tour",
    shortDescription:
      "Hike through lush Chagga village to stunning waterfalls and learn about traditional coffee production.",
    price: 120,
    duration: "Half Day (5-6 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Day-trips.jpg",
    highlights: ["80m Waterfall", "Coffee Farm", "Chagga Culture", "Swimming"],
    groupSize: "2-8 people",
  },
  {
    id: "3",
    name: "Maasai Village & Cultural Experience",
    slug: "maasai-village-cultural-experience",
    shortDescription:
      "Immerse yourself in the traditions of the Maasai people with a guided village visit.",
    price: 95,
    duration: "Half Day (4-5 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Arusha-City-Day-Trip.jpg",
    highlights: ["Traditional Boma", "Dance & Song", "Beadwork", "Cattle Herding"],
    groupSize: "2-10 people",
  },
  {
    id: "4",
    name: "Lake Manyara Day Safari",
    slug: "lake-manyara-day-safari",
    shortDescription:
      "Full-day game drive to see tree-climbing lions, flamingos, and diverse wildlife at Lake Manyara.",
    price: 250,
    duration: "Full Day (10-11 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Lake-manyara-day-trip.jpg",
    highlights: ["Tree-climbing Lions", "Flamingos", "Hot Springs", "Baboons"],
    groupSize: "2-6 people",
  },
  {
    id: "5",
    name: "Ngorongoro Crater Day Trip",
    slug: "ngorongoro-crater-day-trip",
    shortDescription:
      "Descend into the world-famous Ngorongoro Crater for an unforgettable wildlife experience.",
    price: 350,
    duration: "Full Day (12-13 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro-Crater-day-trip.jpg",
    highlights: ["Big Five", "Crater Floor", "UNESCO Site", "Lunch Included"],
    groupSize: "2-6 people",
  },
  {
    id: "6",
    name: "Kilimanjaro Day Hike to Mandara Hut",
    slug: "kilimanjaro-day-hike-mandara",
    shortDescription:
      "Experience Kilimanjaro without the full climb - hike through rainforest to Mandara Hut.",
    price: 200,
    duration: "Full Day (8-9 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/49c04fa0-2704-4624-aaf4-59db6de1f1f5.jpg",
    highlights: ["Rainforest Trek", "Maundi Crater", "Colobus Monkeys", "Park Entry"],
    groupSize: "2-8 people",
  },
  {
    id: "7",
    name: "Hot Springs & Chemka Blue Lagoon",
    slug: "chemka-hot-springs",
    shortDescription:
      "Swim in crystal-clear natural hot springs surrounded by lush tropical forest.",
    price: 110,
    duration: "Half Day (5-6 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Day-trips.jpg",
    highlights: ["Natural Hot Springs", "Swimming", "Picnic Lunch", "Relaxation"],
    groupSize: "2-10 people",
  },
  {
    id: "8",
    name: "Tarangire Day Safari",
    slug: "tarangire-day-safari",
    shortDescription:
      "See massive elephant herds and ancient baobab trees on this popular day safari.",
    price: 280,
    duration: "Full Day (10-11 hours)",
    heroImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-national-park-day-trip.jpg",
    highlights: ["Elephant Herds", "Baobab Trees", "Bird Watching", "Picnic Lunch"],
    groupSize: "2-6 people",
  },
];

export default async function DayTripsPage() {
  const dbTrips = await getDayTrips();
  const trips = dbTrips.length > 0 ? dbTrips : placeholderTrips;

  return (
    <div>
      {/* Hero */}
      <PageHero pageSlug="tanzania-day-tours" />

      {/* Intro */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Tanzania in a Day
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Whether you have a layover in Arusha, want to break up a long
              journey, or simply prefer shorter excursions, our day trips offer
              authentic Tanzanian experiences without the commitment of a
              multi-day safari.
            </p>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((tripItem) => {
              // Handle both DB and placeholder structures
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const trip = tripItem as any;
              const name = trip.title || trip.name;
              const image = trip.featuredImage || trip.heroImage || "/images/placeholder-trip.jpg";
              const price = trip.priceFrom || trip.price;
              const desc = trip.description || trip.shortDescription;
              return (
              <div
                key={trip.id}
                className="bg-white border border-[var(--border)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-[var(--primary)]">
                      ${Number(price)}
                    </span>
                    <span className="text-[var(--text-muted)] text-sm">/person</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{name}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">
                    {desc}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {"duration" in trip ? trip.duration : "Full Day"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {"groupSize" in trip ? trip.groupSize : "2-6 people"}
                      </span>
                    </div>
                  </div>

                  {"highlights" in trip && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {trip.highlights.slice(0, 3).map((h: string, i: number) => (
                        <span
                          key={i}
                          className="bg-[var(--muted)] text-[var(--text-muted)] px-2 py-0.5 rounded text-xs"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/tanzania-day-tours/${trip.slug}/`}
                    className="block text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-2 rounded font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Trips */}
      <section className="py-12 bg-[var(--secondary-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Looking for Something Different?
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              We can arrange custom day trips based on your interests - bird
              watching, photography, local markets, city tours, and more. Just
              tell us what you&apos;d like to experience.
            </p>
            <Link
              href="/contact-us/"
              className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Custom Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold mb-2">Hotel Pickup</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Free pickup from Arusha or Moshi hotels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold mb-2">Expert Guide</h3>
              <p className="text-sm text-[var(--text-muted)]">
                English-speaking professional guide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold mb-2">All Fees</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Park fees, activities, and lunch included
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Times</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Early starts and flexible scheduling
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready for an Adventure?
          </h2>
          <p className="text-[var(--primary-light)] mb-6 max-w-2xl mx-auto">
            Most day trips can be arranged with just 24 hours notice. Contact us
            to check availability and book your excursion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/255123456789"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact-us/"
              className="inline-block bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--surface)] transition-colors"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
