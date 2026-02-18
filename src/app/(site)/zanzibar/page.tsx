import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sun, Waves, Building, Compass } from "lucide-react";
import { ZanzibarInquiryForm } from "@/components/forms/ZanzibarInquiryForm";
import { generateMetadata as genMeta } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = genMeta({
  title: "Zanzibar Beach Holidays",
  description:
    "Complete your Tanzania adventure with a Zanzibar beach extension. Pristine beaches, historic Stone Town, spice tours, and water activities await.",
  url: "/zanzibar/",
});

const beaches = [
  {
    name: "Nungwi Beach",
    description:
      "Northern tip of Zanzibar with stunning sunsets and vibrant nightlife.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/zan.png",
  },
  {
    name: "Kendwa Beach",
    description:
      "Calm waters perfect for swimming at any tide, with boutique resorts.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Kwale-Island-q3hixrn6vumez8p4r8n0xtnsqincj7k0dg7q485hi8.jpg",
  },
  {
    name: "Paje Beach",
    description:
      "Kite surfing paradise on the east coast with laid-back atmosphere.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/east-africa-safari-zanzibar.jpg",
  },
  {
    name: "Jambiani Beach",
    description:
      "Traditional fishing village feel with seaweed farming and local culture.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/zan.png",
  },
];

const activities = [
  {
    title: "Stone Town Walking Tour",
    description:
      "Explore the UNESCO World Heritage Site with its winding alleys, ornate doors, and rich history.",
    icon: Building,
    duration: "Half Day",
  },
  {
    title: "Spice Tour",
    description:
      "Visit local spice farms to see, smell, and taste cloves, vanilla, cinnamon, and more.",
    icon: Compass,
    duration: "Half Day",
  },
  {
    title: "Snorkeling & Diving",
    description:
      "Discover vibrant coral reefs and marine life around Mnemba Atoll and other dive sites.",
    icon: Waves,
    duration: "Full Day",
  },
  {
    title: "Sunset Dhow Cruise",
    description:
      "Sail on a traditional wooden dhow while watching the sun set over the Indian Ocean.",
    icon: Sun,
    duration: "Evening",
  },
];

const packages = [
  {
    name: "3-Day Beach Escape",
    nights: 3,
    price: 450,
    highlights: ["Beach Resort", "Stone Town Tour", "Airport Transfers"],
  },
  {
    name: "5-Day Island Explorer",
    nights: 5,
    price: 750,
    highlights: [
      "Beach Resort",
      "Stone Town Tour",
      "Spice Tour",
      "Snorkeling Trip",
    ],
  },
  {
    name: "7-Day Ultimate Zanzibar",
    nights: 7,
    price: 1100,
    highlights: [
      "Premium Resort",
      "All Tours Included",
      "Sunset Dhow Cruise",
      "Private Transfers",
    ],
  },
];

export default function ZanzibarPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero pageSlug="zanzibar" />

      {/* Intro */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              The Spice Island Awaits
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Just a short flight from Arusha or the Serengeti, Zanzibar offers
              the perfect contrast to your safari adventure. Relax on powder-white
              beaches, explore the historic Stone Town, dive crystal-clear waters,
              and immerse yourself in the island&apos;s unique blend of African,
              Arab, and Indian cultures.
            </p>
          </div>
        </div>
      </section>

      {/* Beach Areas */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Where to Stay
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beaches.map((beach) => (
              <div
                key={beach.name}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={beach.image}
                    alt={beach.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{beach.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{beach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Things to Do
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="flex gap-4 p-6 bg-white border border-[var(--border)] rounded-lg"
              >
                <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center shrink-0">
                  <activity.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{activity.title}</h3>
                    <span className="text-xs bg-[var(--muted)] text-[var(--text-muted)] px-2 py-0.5 rounded">
                      {activity.duration}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-12 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Beach Extension Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`rounded-lg p-6 ${
                  index === 1
                    ? "bg-white text-[var(--text)] ring-4 ring-[var(--secondary)]"
                    : "bg-white/10"
                }`}
              >
                {index === 1 && (
                  <span className="inline-block bg-[var(--secondary)] text-[var(--primary-dark)] text-xs font-bold px-2 py-1 rounded mb-3">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-semibold text-xl mb-2">{pkg.name}</h3>
                <p
                  className={`text-sm mb-4 ${
                    index === 1 ? "text-[var(--text-muted)]" : "text-[var(--primary-light)]"
                  }`}
                >
                  {pkg.nights} Nights
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span
                    className={`text-sm ${
                      index === 1 ? "text-[var(--text-muted)]" : "text-[var(--primary-light)]"
                    }`}
                  >
                    /person
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className={`text-sm flex items-center gap-2 ${
                        index === 1 ? "text-[var(--text-muted)]" : "text-[var(--primary-light)]"
                      }`}
                    >
                      <span className="text-[var(--secondary)]">✓</span> {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#inquiry-form"
                  className={`block text-center py-2 rounded font-semibold transition-colors ${
                    index === 1
                      ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                      : "bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)]"
                  }`}
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-[var(--primary-light)] text-sm">
            All packages can be customized. Prices based on double occupancy,
            mid-range accommodation.
          </p>
        </div>
      </section>

      {/* Stone Town */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/09/Zanzibar_Island_Stone_Town_02.jpg"
                alt="Stone Town"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4">
                Stone Town - A UNESCO World Heritage Site
              </h2>
              <p className="text-[var(--text-muted)] mb-4">
                The historic heart of Zanzibar, Stone Town is a labyrinth of
                narrow streets, ancient buildings, and carved wooden doors that
                tell stories of centuries of trade and cultural exchange.
              </p>
              <p className="text-[var(--text-muted)] mb-6">
                Walk through the old slave market, visit the Sultan&apos;s Palace,
                haggle in the bustling Darajani Market, and watch the sunset from
                the famous Forodhani Gardens food market.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="text-[var(--primary)]">✓</span>
                  UNESCO World Heritage Site since 2000
                </li>
                <li className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="text-[var(--primary)]">✓</span>
                  Over 1,000 years of history
                </li>
                <li className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="text-[var(--primary)]">✓</span>
                  Famous ornate carved doors
                </li>
                <li className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="text-[var(--primary)]">✓</span>
                  Birthplace of Freddie Mercury
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Combine with Safari */}
      <section className="py-12 bg-[var(--muted)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Safari + Beach = Perfect Combo
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-8">
            Many of our guests combine their Tanzania safari with a few relaxing
            days in Zanzibar. We&apos;ll handle all the logistics - just tell us
            your dates and preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tanzania-safaris/"
              className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Safari Packages
            </Link>
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--primary-dark)] hover:bg-[var(--text)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Kilimanjaro + Zanzibar
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 bg-gradient-to-b from-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Plan Your Zanzibar Getaway
              </h2>
              <p className="text-[var(--text-muted)]">
                Tell us about your dream beach holiday and we&apos;ll create
                the perfect Zanzibar experience for you.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              <ZanzibarInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
