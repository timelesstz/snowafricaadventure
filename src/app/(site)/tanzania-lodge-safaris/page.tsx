import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ChevronDown, Wifi, UtensilsCrossed, Waves, MapPin } from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Tanzania Lodge Safari Packages 2026",
  description:
    "Tanzania lodge safaris combine comfortable accommodation with incredible wildlife. Stay in premium lodges and tented camps while exploring the Serengeti, Ngorongoro, and Tarangire. Prices from $2,500.",
  url: "/tanzania-lodge-safaris/",
});

const lodgeTypes = [
  {
    label: "3-Star",
    title: "Standard Lodges",
    price: "From $2,500",
    description:
      "Clean, comfortable rooms with en-suite bathrooms, hot water, and buffet meals. Reliable safari vehicles and experienced guides. Excellent value for money.",
    features: ["En-suite bathroom", "Hot water", "Buffet meals", "Reliable vehicles"],
  },
  {
    label: "4-Star",
    title: "Premium Lodges",
    price: "From $3,800",
    description:
      "Spacious rooms or tents with elevated amenities — private terraces, a la carte dining, swimming pools, and outstanding views over the bush or crater.",
    features: ["Private terraces", "A la carte dining", "Swimming pool", "Bush views"],
  },
  {
    label: "4-Star+",
    title: "Luxury Tented Camps",
    price: "From $4,500",
    description:
      "Canvas tents with all the luxury of a boutique hotel. King beds, private outdoor showers, camp butler service, and the immersive sounds of the African bush.",
    features: ["King-size beds", "Private outdoor shower", "Butler service", "Intimate atmosphere"],
  },
  {
    label: "5-Star",
    title: "Luxury Lodges",
    price: "From $6,500",
    description:
      "The very finest accommodation in Tanzania — private plunge pools, gourmet restaurants, spa facilities, and exclusive concession access for off-road game drives.",
    features: ["Private plunge pool", "Spa & wellness", "Exclusive concessions", "Gourmet dining"],
  },
];

const circuits = [
  {
    name: "Northern Circuit",
    parks: "Serengeti, Ngorongoro, Tarangire, Lake Manyara",
    duration: "5–10 nights",
    highlight: "Tanzania's most iconic wildlife destinations in one epic journey",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
  },
  {
    name: "Southern Circuit",
    parks: "Ruaha, Nyerere (Selous), Mikumi",
    duration: "5–8 nights",
    highlight: "Tanzania's wild south — fewer crowds, larger game concentrations",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
  },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arusha Arrival",
    description: "Welcome briefing, overnight at a comfortable Arusha lodge before your safari departs.",
  },
  {
    day: "Day 2",
    title: "Tarangire National Park",
    description: "Morning drive to Tarangire. Afternoon game drive among elephant herds. Overnight at a park boundary lodge.",
  },
  {
    day: "Day 3-4",
    title: "Central Serengeti",
    description: "Two full days exploring the Seronera Valley — the epicentre of predator activity. Stay at a Serengeti lodge with infinity pool views over the plains.",
  },
  {
    day: "Day 5",
    title: "Northern Serengeti",
    description: "Drive north for the river crossing zones. Overnight at a luxury tented camp on the Mara River.",
  },
  {
    day: "Day 6-7",
    title: "Ngorongoro Crater",
    description: "Descend into the crater for a full day game drive. Stay at a crater rim lodge with sweeping caldera views. Dawn crater descent on day 7.",
  },
  {
    day: "Day 8",
    title: "Departure",
    description: "Transfer to Arusha or Kilimanjaro International Airport. Optional Zanzibar beach extension.",
  },
];

const featuredLodges = [
  {
    title: "Serengeti Boundary Lodge",
    description:
      "Perched on the edge of the Serengeti ecosystem, this lodge offers panoramic savanna views with an infinity pool facing the endless plains. Game drives begin the moment you step outside.",
    highlights: ["Infinity pool", "Plains views", "Game drive access at dawn"],
  },
  {
    title: "Ngorongoro Crater Rim Lodge",
    description:
      "Situated on the volcanic rim of the world's largest intact caldera, guests wake to mist rising from the crater floor 600 metres below. Extraordinary views, outstanding service.",
    highlights: ["Crater rim location", "Panoramic views", "Close to crater access"],
  },
  {
    title: "Tarangire Tented Camp",
    description:
      "Luxury canvas tents set beneath ancient tamarind trees beside the Tarangire River. Elephants visit the waterhole at dusk while guests dine in the open-air mess tent.",
    highlights: ["Waterhole setting", "Elephant sightings from camp", "Bush dining"],
  },
];

const included = [
  "Accommodation as selected (full board)",
  "All meals: breakfast, lunch, and dinner",
  "Private 4x4 Land Cruiser",
  "Expert English-speaking guide",
  "All national park entry fees",
  "Airport and hotel transfers",
  "Drinking water in vehicle",
  "24/7 emergency support",
];

const faqs = [
  {
    question: "What is the difference between a lodge safari and camping safari?",
    answer:
      "Lodges offer beds, en-suite bathrooms, restaurants, and often a swimming pool — comfort and convenience after long game drives. Camping is more basic and affordable, placing you directly in the bush. Both offer excellent wildlife experiences; the choice comes down to budget and comfort preference.",
  },
  {
    question: "Do Tanzania safari lodges have WiFi?",
    answer:
      "Most lodges have limited WiFi in communal areas such as reception and the dining room. Room coverage is often inconsistent or unavailable. Many travelers find that disconnecting from technology is part of the experience — and a very welcome one.",
  },
  {
    question: "Are meals included in lodge safaris?",
    answer:
      "Typically yes — full board (breakfast, lunch, and dinner) is standard in most lodge safari packages. Some premium lodges also include afternoon tea, sundowner drinks, and complimentary beverages. Confirm inclusions with us when booking.",
  },
  {
    question: "How much does a Tanzania lodge safari cost?",
    answer:
      "Prices range from $2,500 to $8,000+ per person for a standard 7-night safari depending on lodge grade and the circuit chosen. Standard lodges start at approximately $2,500 pp while luxury 5-star options can exceed $8,000 pp. Contact us for a custom quote.",
  },
];

export default function TanzaniaLodgeSafarisPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Lodge Safaris", url: "/tanzania-lodge-safaris/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg"
            alt="Tanzania Lodge Safari — Ngorongoro Crater accommodation"
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
                Comfort in the Wild
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rating &bull; All Meals Included</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Tanzania Lodge Safaris
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              Comfort Meets the Wild — Premium Lodge Safari Experiences
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Return from thrilling game drives to comfortable beds, gourmet meals, and sundowner
              cocktails on the terrace. Tanzania&apos;s finest lodges place you in the heart of the
              wilderness without sacrificing a single comfort.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "From $2,500", sub: "Per Person" },
                { label: "5-14 Days", sub: "Flexible Duration" },
                { label: "4-5★ Lodges", sub: "Accommodation" },
                { label: "All Meals", sub: "Full Board" },
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
                Plan My Lodge Safari
              </Link>
              <Link
                href="/tanzania-safaris/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Why Choose Lodge Safari */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              Why Lodge Safaris
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              Why Choose a Tanzania Lodge Safari?
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              After an exhilarating morning game drive at Tanzania&apos;s finest safari lodges, there
              is nothing quite like returning to a beautiful lodge, a hot shower, and lunch overlooking
              the African plains. Tanzania lodge safari packages deliver exceptional wildlife experiences
              with the comfort to truly savour each moment — the ideal balance between adventure and relaxation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Waves className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comfort After Game Drives</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Return to en-suite rooms, real beds, and refreshing swimming pools after days in the bush.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">World-Class Cuisine</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Full board dining with international and local dishes, sundowner drinks, and bush breakfasts.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Spa & Pool Options</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Premium lodges offer spa treatments, infinity pools, and sunset terraces to unwind between drives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lodge Types */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Accommodation Grades
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Tanzania Safari Lodge Types & Price Ranges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lodgeTypes.map((lodge) => (
              <div
                key={lodge.title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold">
                    {lodge.label}
                  </span>
                  <span className="text-sm font-bold text-[var(--secondary)]">{lodge.price}</span>
                </div>
                <h3 className="font-semibold text-base mb-2">{lodge.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{lodge.description}</p>
                <ul className="space-y-1.5">
                  {lodge.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text)]">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Circuits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Safari Circuits
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Top Lodge Safari Circuits
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {circuits.map((circuit) => (
              <div
                key={circuit.name}
                className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={circuit.image}
                    alt={circuit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{circuit.name}</h3>
                    <span className="text-sm text-[var(--secondary)] font-semibold shrink-0 ml-2">
                      {circuit.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                    <p className="text-xs text-[var(--text-muted)]">{circuit.parks}</p>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{circuit.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Night Itinerary */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Sample Itinerary
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            7-Night Northern Circuit Lodge Safari
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
              Customise This Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Lodges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Featured Properties
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Lodge Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredLodges.map((lodge, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{lodge.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{lodge.description}</p>
                <ul className="space-y-1.5">
                  {lodge.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-[var(--text)]">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            All Inclusive
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
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

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Lodge Safari Questions
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
            Experience Tanzania in Comfort
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Let us design your perfect lodge safari — exceptional wildlife, beautiful accommodation,
            and memories that last a lifetime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Plan My Lodge Safari
            </Link>
            <Link
              href="/tanzania-safaris/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse Safari Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
