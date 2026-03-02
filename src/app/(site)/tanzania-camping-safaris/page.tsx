import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Tent, Users, Calendar, MapPin, Star, ChevronDown, Shield, Utensils, Binoculars } from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Tanzania Budget Camping Safari 2026",
  description:
    "Experience Tanzania's wilderness on a camping safari — sleep under the stars in national parks, wake to lion roars, and see the Big Five from just $1,200. Book your Tanzania camping safari with Snow Africa Adventure.",
  url: "/tanzania-camping-safaris/",
});

const campingTypes = [
  {
    title: "Public Campsite Safari",
    label: "Budget",
    price: "From $1,200",
    description:
      "Stay at established public campsites within Tanzania's national parks. Share facilities with fellow travelers and enjoy the authentic bush atmosphere at the most affordable price point.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    features: ["Dome tents provided", "Shared facilities", "Camp cook included", "Most affordable"],
  },
  {
    title: "Mobile Tented Camp",
    label: "Mid-Range",
    price: "From $2,200",
    description:
      "Semi-permanent tented camps set up in prime wildlife areas. Comfortable canvas tents with proper beds, private bathrooms, and a mess tent for dining under the stars.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    features: ["Proper beds", "Private bathrooms", "Mess tent dining", "Prime locations"],
  },
  {
    title: "Fly Camping",
    label: "Premium",
    price: "From $3,500",
    description:
      "The ultimate wilderness experience. Walk deep into the bush with a fly camp setup — lightweight tents, campfire cooking, and a walking guide for dawn game walks. Truly off the beaten path.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    features: ["Remote locations", "Walking safaris", "Expert armed guide", "Exclusive access"],
  },
];

const topParks = [
  {
    name: "Serengeti National Park",
    icon: "🦁",
    highlight: "Great Migration & Big Five",
    description:
      "The crown jewel of Tanzania. Camp within the world's most famous wildlife reserve and wake to the sounds of the African bush. Predator action year-round.",
  },
  {
    name: "Ngorongoro Conservation Area",
    icon: "🦏",
    highlight: "Black Rhino & Dense Wildlife",
    description:
      "Descend into the world's largest intact volcanic caldera, home to an incredible concentration of wildlife including the rare black rhino.",
  },
  {
    name: "Tarangire National Park",
    icon: "🐘",
    highlight: "Elephant Herds & Baobabs",
    description:
      "Famous for its giant elephant herds and ancient baobab trees. The Tarangire River attracts extraordinary concentrations of wildlife in the dry season.",
  },
  {
    name: "Lake Manyara National Park",
    icon: "🦩",
    highlight: "Flamingos & Tree-Climbing Lions",
    description:
      "A compact park packing an extraordinary variety of habitats. Famous for its tree-climbing lions and vast flamingo colonies on the soda lake.",
  },
];

const included = [
  "Quality camping tents with sleeping bags",
  "Sleeping mats and pillows",
  "All meals cooked by camp cook",
  "Experienced English-speaking guide",
  "Private 4x4 Land Cruiser safari vehicle",
  "All national park entry fees",
  "Camp setup and takedown",
  "Drinking water and purification",
  "Airport and hotel transfers",
  "24/7 emergency support",
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arusha Arrival & Briefing",
    description:
      "Arrive in Arusha and meet your guide for a detailed safari briefing. Overnight at a local guesthouse before the adventure begins.",
  },
  {
    day: "Day 2-3",
    title: "Tarangire National Park",
    description:
      "Drive to Tarangire and set up camp. Two full days of game drives among elephant herds and ancient baobab trees. Campfire dinners under the stars.",
  },
  {
    day: "Day 4",
    title: "Central Serengeti",
    description:
      "Early morning drive to the Serengeti. Afternoon game drive in the Seronera Valley — the best area for year-round predator sightings. First camp night in the Serengeti.",
  },
  {
    day: "Day 5",
    title: "Ngorongoro Crater Descent",
    description:
      "Descend into the Ngorongoro Crater for a full day game drive. See all Big Five in a single day. Camp on the crater rim with spectacular sunset views.",
  },
  {
    day: "Day 6",
    title: "Departure",
    description:
      "Morning game drive en route to Arusha. Depart with unforgettable memories and a camera full of incredible wildlife photographs.",
  },
];

const faqs = [
  {
    question: "Is camping safe on a Tanzania safari?",
    answer:
      "Yes — camps are fenced with wildlife barriers, guides are trained rangers, and wildlife encounters are carefully managed. Thousands of travelers camp safely in Tanzania every year. Your guide will brief you on camp protocols before each night.",
  },
  {
    question: "What is the difference between a camping and lodge safari?",
    answer:
      "Camping is more authentic and affordable, placing you directly in the heart of the wilderness. Lodges offer greater comfort — beds, en-suite bathrooms, restaurants, and sometimes a pool — but at a significantly higher price. Both offer excellent wildlife experiences.",
  },
  {
    question: "Can I do a Tanzania camping safari solo?",
    answer:
      "Yes — we run both private and group camping departures. Solo travelers can join scheduled group departures to share costs, or book a private camping safari exclusively for themselves with a dedicated guide and vehicle.",
  },
  {
    question: "What should I pack for a camping safari?",
    answer:
      "Light layers for cool mornings and evenings, sun protection (hat, SPF 50+), insect repellent with DEET, a headlamp, comfortable walking shoes, and a camera. We provide tents, sleeping bags, bedding, and all camp equipment — you just bring your personal items.",
  },
];

export default function TanzaniaCampingSafarisPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Camping Safaris", url: "/tanzania-camping-safaris/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="Tanzania Camping Safari — sleeping under the stars in the Serengeti"
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
                Budget Adventure
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.8 Rating &bull; Authentic Experience</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Tanzania Camping Safari
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              Sleep Under African Stars — The Ultimate Bush Experience
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Wake to lion roars outside your tent. Watch elephants pass at dawn. Experience
              Tanzania&apos;s raw, unfiltered wilderness on a camping safari — the most authentic
              way to explore Africa.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "From $1,200", sub: "Per Person" },
                { label: "3-14 Days", sub: "Flexible Duration" },
                { label: "Big Five", sub: "Wildlife" },
                { label: "Authentic", sub: "Experience" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold text-[var(--secondary)]">{stat.label}</p>
                  <p className="text-sm text-white/70">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tailor-made-safari/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Plan My Camping Safari
              </Link>
              <Link
                href="/tanzania-safaris/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View All Safaris
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* What is a Camping Safari */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              The Camping Difference
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              What is a Tanzania Camping Safari?
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              A camping safari places you at the heart of Africa&apos;s wilderness — not behind
              lodge walls but directly under the canopy of the African sky. You sleep where the
              animals roam, eat beside crackling campfires, and experience nature without any barrier
              between you and the wild.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Tent className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Authentic</h3>
              <p className="text-sm text-[var(--text-muted)]">
                No resort buffers. Sleep where lions and elephants roam freely in their natural habitat.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Affordable</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Camping eliminates costly lodge overheads, making an incredible Tanzania safari accessible from $1,200.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Binoculars className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Immersive</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Dawn game walks, campfire storytelling, and a connection to the landscape that lodges simply cannot replicate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Camping Safari Types */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Choose Your Style
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Camping Safari Types
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            From budget public campsites to exclusive fly camping deep in the wilderness — choose
            the camping style that matches your adventure level.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {campingTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[var(--secondary)] text-white rounded-full text-xs font-semibold">
                      {type.label}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{type.title}</h3>
                    <span className="text-sm font-bold text-[var(--secondary)]">{type.price}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{type.description}</p>
                  <ul className="space-y-1.5">
                    {type.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Parks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Best Destinations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Top Parks for Camping Safaris
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topParks.map((park) => (
              <div
                key={park.name}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{park.icon}</div>
                <h3 className="font-semibold text-base mb-1">{park.name}</h3>
                <p className="text-xs font-semibold text-[var(--secondary)] mb-3 uppercase tracking-wide">
                  {park.highlight}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{park.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Sample Itinerary
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            5-Day Tanzania Camping Safari
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {itinerary.map((day, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
              >
                <div className="shrink-0 w-16 text-center">
                  <span className="text-sm font-bold text-[var(--secondary)]">{day.day}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{day.title}</h3>
                  <p className="text-white/70 text-sm">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Customize This Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            All Inclusive
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What&apos;s Included in Every Camping Safari
          </h2>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {included.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[var(--border)] shadow-sm"
              >
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-[var(--text)] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camping vs Lodge Comparison */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Make Your Choice
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Camping vs Lodge Safari
          </h2>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="py-4 px-6 text-left font-semibold">Feature</th>
                  <th className="py-4 px-6 text-center font-semibold">Camping Safari</th>
                  <th className="py-4 px-6 text-center font-semibold">Lodge Safari</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  ["Price", "From $1,200", "From $2,500"],
                  ["Authenticity", "Maximum", "Moderate"],
                  ["Comfort", "Basic–Moderate", "High–Luxury"],
                  ["Wildlife Proximity", "Exceptional", "Very Good"],
                  ["Flexibility", "High", "Moderate"],
                  ["Best For", "Adventure travelers", "Comfort seekers"],
                ].map(([feature, camping, lodge]) => (
                  <tr key={feature} className="hover:bg-[var(--surface)] transition-colors">
                    <td className="py-3 px-6 font-medium text-sm">{feature}</td>
                    <td className="py-3 px-6 text-center text-sm text-[var(--text-muted)]">{camping}</td>
                    <td className="py-3 px-6 text-center text-sm text-[var(--text-muted)]">{lodge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Camping Safari Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)]">{faq.answer}</p>
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
            Ready to Sleep Under the Stars?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Let us design your perfect Tanzania camping safari — budget-friendly, wildlife-rich, and
            completely unforgettable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Plan My Camping Safari
            </Link>
            <Link
              href="/contact-us/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
