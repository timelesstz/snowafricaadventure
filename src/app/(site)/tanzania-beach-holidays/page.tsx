import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  Sun,
  Fish,
  MapPin,
  Star,
  ChevronDown,
  Calendar,
  Check,
  Anchor,
  Wind,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Tanzania Beach Holidays 2026",
  description:
    "Tanzania beach holidays combine world-class beaches with safari adventures. Zanzibar's turquoise waters, Pemba Island's diving, and Stone Town culture. Package prices from $850. Book with Snow Africa Adventure.",
  url: "/tanzania-beach-holidays/",
});

const beachDestinations = [
  {
    name: "Zanzibar Main Island",
    tagline: "Tanzania's Jewel of the Indian Ocean",
    description:
      "Zanzibar's white-sand beaches and turquoise waters are legendary. Explore UNESCO-listed Stone Town, relax on Nungwi Beach, and discover world-class snorkeling on the coral reefs of Mnemba Atoll.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/zanzibar.jpg",
    highlights: ["Stone Town UNESCO", "Nungwi Beach", "Spice Farms", "Dolphin Tours"],
  },
  {
    name: "Pemba Island",
    tagline: "Africa's Best-Kept Diving Secret",
    description:
      "Pemba Island sits 80km north of Zanzibar and offers some of Africa's finest scuba diving. The island's near-vertical coral walls drop hundreds of metres into the deep blue, teeming with sharks, rays, and colourful reef fish.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    highlights: ["Wall Diving", "Hammerhead Sharks", "Remote Beaches", "Forest Walks"],
  },
  {
    name: "Mafia Island",
    tagline: "Whale Sharks & Untouched Reefs",
    description:
      "Mafia Island Marine Park is Tanzania's best-kept secret — whale shark encounters from October to March, pristine coral reefs, and an atmosphere so relaxed it feels like you have the island to yourself.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    highlights: ["Whale Sharks", "Marine Park", "Mangrove Kayaking", "Baobab Forests"],
  },
];

const zanzibarHighlights = [
  {
    icon: MapPin,
    title: "Stone Town UNESCO",
    description:
      "Wander the labyrinthine alleys of Stone Town, a UNESCO World Heritage Site where Arab, Persian, Indian, and African cultures have blended for centuries. Visit the Old Fort, the House of Wonders, and the vibrant Darajani market.",
  },
  {
    icon: Waves,
    title: "Nungwi Beach",
    description:
      "Nungwi on Zanzibar's northern tip stays calm and swimmable year-round — unlike some southern beaches that become tidal flats. Sunset dhow cruises depart here nightly.",
  },
  {
    icon: Fish,
    title: "Dolphin Tours",
    description:
      "Kizimkazi village on the southern coast is famous for dolphin encounters. Spinner and bottlenose dolphins visit the bay every morning, and swimming alongside them is a bucket-list experience.",
  },
  {
    icon: Sun,
    title: "Spice Farm Tours",
    description:
      "Zanzibar is the 'Spice Island' for good reason — cloves, vanilla, nutmeg, and cinnamon grow in abundance. Half-day spice farm tours include a traditional lunch and fresh coconuts.",
  },
  {
    icon: Anchor,
    title: "Forodhani Night Market",
    description:
      "Every evening the seafront Forodhani Gardens transforms into a street food market. Grilled octopus, Zanzibar pizza, sugarcane juice, and fresh lobster served on the waterfront — all for a few dollars.",
  },
];

const beachTypes = [
  {
    tier: "Budget Beach Stay",
    price: "From $850",
    duration: "4-5 nights",
    description:
      "Comfortable guesthouses and mid-range hotels in Nungwi or Paje. Includes breakfast daily, airport transfers, and spice farm tour.",
    features: ["Guesthouse or budget hotel", "Breakfast included", "Snorkelling excursion", "Spice farm tour", "Airport transfers"],
  },
  {
    tier: "Mid-Range Beach Retreat",
    price: "From $1,800",
    duration: "5-7 nights",
    description:
      "Boutique beach bungalows with private gardens and sea views. Add optional excursions, dolphin tours, and half-board dining.",
    features: ["Boutique beachfront lodge", "Half-board dining", "Dolphin tour", "Stone Town day trip", "Sunset dhow cruise"],
    featured: true,
  },
  {
    tier: "Luxury Beach Resort",
    price: "From $3,500",
    duration: "6-8 nights",
    description:
      "Five-star private beach resorts on Zanzibar's most exclusive stretches, with infinity pools, spa treatments, and private butler service.",
    features: ["5-star beach resort", "Full-board or all-inclusive", "Private excursions", "Spa treatments", "Snorkelling & diving"],
  },
];

const waterActivities = [
  { icon: Fish, title: "Snorkelling", description: "Mnemba Atoll is Tanzania's finest snorkelling site — shallow reefs alive with sea turtles, clownfish, and lionfish." },
  { icon: Anchor, title: "Scuba Diving", description: "PADI-certified dive centres operate on all three islands. Pemba's wall dives are world-class; Mafia's reefs are unspoiled." },
  { icon: Wind, title: "Kite Surfing", description: "Paje on Zanzibar's east coast is East Africa's kite surfing capital, with consistent trade winds from June to October." },
  { icon: Waves, title: "Sunset Dhow Cruise", description: "Sail the Indian Ocean on a traditional wooden dhow as the sun dips below the horizon — a quintessential Zanzibar experience." },
  { icon: Fish, title: "Whale Shark Swimming", description: "Between October and March, snorkel alongside the world's largest fish at Mafia Island — completely non-invasive and guided by marine experts." },
  { icon: Anchor, title: "Deep-Sea Fishing", description: "Tanzania's waters hold marlin, sailfish, yellowfin tuna, and kingfish. Half- and full-day fishing charters are available from Zanzibar Town." },
];

const beachFaqs = [
  {
    question: "What are the best beaches in Tanzania?",
    answer:
      "Nungwi and Kendwa on Zanzibar's north coast are the most popular — calm, clear, and swimmable year-round. Paje on the east coast is perfect for kite surfers. For diving, Pemba Island is exceptional. Mafia Island is the top spot for whale shark encounters between October and March.",
  },
  {
    question: "Can I combine a safari with a beach holiday in Tanzania?",
    answer:
      "Absolutely — this is the most popular Tanzania itinerary. A classic 10-day trip covers the Serengeti and Ngorongoro Crater, then flies to Zanzibar for 3-4 nights of beach relaxation. The contrast of dusty savanna and turquoise sea makes the combination unforgettable.",
  },
  {
    question: "What is the best time to visit Zanzibar?",
    answer:
      "June to October is ideal — dry season with calm seas and consistent sunshine, perfect for beach and diving. November and December offer warm, mostly clear weather. January and February are hot and excellent. Avoid the long rains (March-May) and short rains (November occasionally) if you want guaranteed sunshine.",
  },
  {
    question: "Do I need a visa for Tanzania beach holidays?",
    answer:
      "Yes — most nationalities require a visa to enter Tanzania, including Zanzibar. You can obtain an e-visa online before travel or a visa on arrival at Zanzibar airport. The standard tourist visa costs $50 USD and covers both mainland Tanzania and Zanzibar.",
  },
];

export default async function TanzaniaBeachHolidaysPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Beach Holidays", url: "/tanzania-beach-holidays/" },
          ]),
          generateFAQSchema(beachFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/zanzibar.jpg"
            alt="Tanzania Beach Holidays - Zanzibar Turquoise Waters"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Beach Holidays
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rating &bull; Indian Ocean Experts</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tanzania Beach Holidays
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              White Sand, Turquoise Waters &amp; Swahili Culture
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "Island Options", value: "3" },
                { label: "Year-Round Sunshine", value: "365" },
                { label: "UNESCO Stone Town", value: "✓" },
                { label: "Pristine Coral Reefs", value: "✓" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Waves className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/zanzibar/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Zanzibar Packages
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Plan Custom Trip
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Beach Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Island Destinations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Tanzania&apos;s Beach Destinations
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Three islands, three distinct Tanzania beach holiday experiences — from a Zanzibar beach holiday on cosmopolitan Unguja to the remote coral gardens of Mafia Island. Each offers a unique take on coastal Tanzania.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {beachDestinations.map((dest) => (
              <div
                key={dest.name}
                className="group bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[var(--secondary)] text-white text-xs font-semibold rounded-full">
                      {dest.tagline}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">{dest.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">{dest.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-1 bg-[var(--surface)] text-[var(--text)] text-xs rounded-md border border-[var(--border)]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zanzibar Highlights */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Top Experiences
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            5 Things to Do on Zanzibar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {zanzibarHighlights.map((item, i) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-widest mb-2 block">
                  0{i + 1}
                </span>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari + Beach Combo */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  Most Popular Combo
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Safari + Beach Combination
                </h2>
                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                  The classic Tanzania experience combines the Northern Safari Circuit with a
                  Zanzibar beach extension. Dust and wildlife by day, turquoise seas by night —
                  it is the world&apos;s most complete travel experience.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Days 1-3: Serengeti National Park",
                    "Days 4-5: Ngorongoro Crater",
                    "Day 6: Transfer to Zanzibar",
                    "Days 7-10: Beach relaxation & excursions",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-[var(--text)]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                  <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800">
                    <strong>Recommended duration:</strong> 7-12 days. Best booked as a single package with one guide from start to finish.
                  </p>
                </div>
                <Link
                  href="/tailor-made-safari/"
                  className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Plan Safari + Beach Combo
                </Link>
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
                  alt="Safari and Beach Combination Tanzania"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beach Holiday Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Packages & Pricing
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Beach Holiday Types
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            From budget-friendly guesthouses to five-star resorts — find the right beach holiday for your style and budget.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {beachTypes.map((type) => (
              <div
                key={type.tier}
                className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow ${
                  type.featured
                    ? "bg-[var(--primary-dark)] text-white border-[var(--secondary)]"
                    : "bg-white border-[var(--border)]"
                }`}
              >
                {type.featured && (
                  <span className="block text-xs font-bold text-[var(--secondary)] uppercase tracking-widest mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading font-bold text-xl mb-1">{type.tier}</h3>
                <p className={`text-3xl font-bold mb-1 ${type.featured ? "text-[var(--secondary)]" : "text-[var(--secondary-dark)]"}`}>
                  {type.price}
                </p>
                <p className={`text-sm mb-4 ${type.featured ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                  {type.duration} per person
                </p>
                <p className={`text-sm mb-6 leading-relaxed ${type.featured ? "text-white/80" : "text-[var(--text-muted)]"}`}>
                  {type.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 shrink-0 ${type.featured ? "text-[var(--secondary)]" : "text-emerald-600"}`} />
                      <span className={`text-sm ${type.featured ? "text-white/80" : "text-[var(--text)]"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tailor-made-safari/"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold text-sm transition-colors ${
                    type.featured
                      ? "bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)]"
                      : "bg-[var(--primary-dark)] hover:bg-[var(--primary)] text-white"
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            When to Visit
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Best Time for Tanzania Beaches
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="w-6 h-6 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">Peak Season</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-700 mb-2">June – October</p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Dry, sunny, and calm. Ideal for beaches, diving, and combining with a safari. The busiest and most expensive period.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="w-6 h-6 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Great Season</h3>
              </div>
              <p className="text-2xl font-bold text-amber-700 mb-2">Nov – Feb</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Warm and mostly clear. Excellent for Nungwi Beach and dolphin tours. Whale shark season begins at Mafia Island in October.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Waves className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Rainy Season</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700 mb-2">March – May</p>
              <p className="text-sm text-blue-700 leading-relaxed">
                Long rains — rough seas and heavy downpours. Prices drop significantly and the island is lush and green. Some activities are limited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Water Activities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Ocean Adventures
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Water Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waterActivities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <activity.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {beachFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Feel the Sand Between Your Toes?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            From a quick Zanzibar beach escape to the ultimate safari-and-sea combination — let us plan your perfect Tanzania beach holiday.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/zanzibar/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View Zanzibar Packages
            </Link>
            <Link
              href="/tailor-made-safari/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Plan a Custom Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
