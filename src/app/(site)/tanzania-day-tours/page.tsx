import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, DollarSign } from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  } catch (error) {
    // Still degrades to the "coming soon" empty state rather than failing —
    // but an outage must at least leave a trace in the logs.
    console.error("[DayTours] Failed to fetch day trips:", error);
    return [];
  }
}

export default async function DayTripsPage() {
  const trips = await getDayTrips();

  return (
    <div>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Tanzania Day Tours", url: "/tanzania-day-tours/" },
        ])}
      />

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
          {trips.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-[var(--text-muted)] text-lg">
                Day trips coming soon. Contact us for custom excursions.
              </p>
              <Link
                href="/contact-us/"
                className="inline-block mt-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white border border-[var(--border)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {trip.featuredImage && (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={trip.featuredImage}
                    alt={trip.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {trip.priceFrom && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-bold text-[var(--primary)]">
                      ${Number(trip.priceFrom)}
                    </span>
                    <span className="text-[var(--text-muted)] text-sm">/person</span>
                  </div>
                  )}
                </div>
                )}

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{trip.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">
                    {trip.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{trip.destination}</span>
                    </div>
                  </div>

                  {trip.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {trip.highlights.slice(0, 3).map((h, i) => (
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
            ))}
          </div>
          )}
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
