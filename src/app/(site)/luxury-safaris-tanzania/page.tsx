import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ChevronDown, Crown, Eye, Sparkles, UserCheck } from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Luxury Tanzania Safari 2026",
  description:
    "Tanzania luxury safaris offer private game drives, 5-star tented camps, gourmet dining, and exclusive wildlife encounters. From $4,000 per person. Book your luxury Tanzania safari with Snow Africa Adventure.",
  url: "/luxury-safaris-tanzania/",
});

const pillars = [
  {
    icon: Crown,
    title: "Exclusivity",
    description:
      "Private camps with fewer than 10 tents, exclusive wildlife concessions, and no sharing of vehicles or guides with other travelers.",
  },
  {
    icon: Eye,
    title: "Private Access",
    description:
      "Off-road driving, night game drives, and access to exclusive private conservancies unavailable to standard safari vehicles.",
  },
  {
    icon: Sparkles,
    title: "World-Class Accommodation",
    description:
      "Handpicked 5-star tented camps and boutique lodges with plunge pools, butler service, and breathtaking wilderness settings.",
  },
  {
    icon: UserCheck,
    title: "Personalised Service",
    description:
      "Private guides, dedicated camp butlers, personalised itineraries, and a seamless journey from first enquiry to final departure.",
  },
];

const highlights = [
  {
    title: "Serengeti Balloon Safari",
    description:
      "Drift silently over the Serengeti plains at sunrise as thousands of wildebeest, zebras, and predators move below. Land for a champagne bush breakfast. A once-in-a-lifetime experience.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
  },
  {
    title: "Private Ngorongoro Access",
    description:
      "Descend into the Ngorongoro Crater before the crowds — with a private vehicle, personal guide, and exclusive access zones for intimate encounters with rhino, lion, and the crater's extraordinary wildlife.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
  },
  {
    title: "Exclusive Bush Dinners",
    description:
      "Dine by candlelight on the Serengeti plains with a private chef, silverware, and the sounds of the African night. Bush breakfasts, sundowner cocktails, and stargazing sessions complete the picture.",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/close-up-wild-lions-serengeti-national-park-scaled.jpg",
  },
];

const accommodationTypes = [
  {
    title: "Luxury Tented Camps",
    price: "From $4,000pp",
    features: [
      "Private plunge pool or outdoor shower",
      "King beds with fine linen",
      "Private butler on call",
      "Fewer than 10 tents per camp",
      "Night game drives available",
      "Located in exclusive wildlife zones",
    ],
    description:
      "The pinnacle of immersive luxury. Canvas walls let in the sounds of the bush while interiors rival the finest boutique hotels — four-poster beds, private terraces, and personalised service.",
  },
  {
    title: "Boutique Lodges",
    price: "From $3,500pp",
    features: [
      "Infinity pool overlooking the plains",
      "Gourmet restaurant",
      "Spa and wellness centre",
      "Private suites with panoramic views",
      "Personalised game drive scheduling",
      "Curated wine cellar",
    ],
    description:
      "Intimate lodges with exceptional design, gourmet kitchens, and a strong sense of place. Each property is individually selected for its unique setting and standards of service.",
  },
  {
    title: "Private Conservancy Camps",
    price: "From $6,000pp",
    features: [
      "Entire private game reserve",
      "No public park crowds",
      "Unlimited off-road driving",
      "Walking safaris with armed guide",
      "Night game drives included",
      "Private helicopter transfers available",
    ],
    description:
      "The ultimate in exclusivity. Private conservancies bordering the major parks offer complete privacy, unlimited off-road access, and wildlife encounters impossible in public parks.",
  },
];

const premiumInclusions = [
  "Private 4x4 vehicle exclusively for your group",
  "Access to exclusive concession areas",
  "Senior private guide with specialist knowledge",
  "All meals, drinks, and sundowner cocktails",
  "Bush breakfast and private bush dinner",
  "Spa treatments (in select properties)",
  "Night game drives",
  "Hot air balloon safari (in select packages)",
  "All national park and concession fees",
  "Private airport transfers",
  "Pre-trip personalised itinerary consultation",
  "24/7 dedicated emergency support",
];

const testimonials = [
  {
    quote:
      "Our private Serengeti camp had just six tents and the wildlife was extraordinary. Waking to lions calling just metres away, our own plunge pool at sunset — it was truly life-defining. Snow Africa handled every single detail perfectly.",
    author: "Richard & Catherine M.",
    location: "United Kingdom",
    trip: "10-Day Private Luxury Serengeti Safari",
  },
  {
    quote:
      "After climbing Kilimanjaro we spent five nights at a luxury camp in the Serengeti as a reward — and it exceeded every expectation. The private bush dinner under the stars was the most memorable meal of my life.",
    author: "James T.",
    location: "United States",
    trip: "Kilimanjaro + Luxury Safari Combination",
  },
];

const faqs = [
  {
    question: "What makes a safari 'luxury' in Tanzania?",
    answer:
      "A luxury safari means private vehicles (no sharing with strangers), exclusive camps with fewer than 10 tents, gourmet meals prepared by a private chef, personal butlers, off-road access in private concessions, and details like champagne breakfasts, bush dinners, and spa treatments. The entire experience is tailored exclusively to you.",
  },
  {
    question: "How much does a luxury safari in Tanzania cost?",
    answer:
      "Budget $4,000–$10,000+ per person for 7 nights, all-inclusive. This includes park fees, internal flights, luxury accommodation, all meals and drinks, and private guided game drives. The variation depends on the camp standard, season, and whether private conservancy access is included.",
  },
  {
    question: "Are luxury safaris in Tanzania worth it?",
    answer:
      "Absolutely. You get exclusive wildlife access in private concessions unavailable to standard vehicles, gourmet dining under the stars, personalised service from the moment you arrive, and the knowledge that every detail has been perfected. Many of our guests describe it as the most transformative travel experience of their lives.",
  },
  {
    question: "Can I combine a luxury safari with Kilimanjaro?",
    answer:
      "Yes — this is one of our most popular combinations. Many travelers summit Kilimanjaro and then reward themselves with 5–7 nights at a luxury Serengeti camp. The contrast between the raw challenge of the mountain and the indulgence of a private luxury camp is extraordinary. We specialise in designing these combination journeys.",
  },
];

export default function LuxurySafarisTanzaniaPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Luxury Safaris Tanzania", url: "/luxury-safaris-tanzania/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="Luxury Safari Tanzania — private camps and exclusive wildlife experiences"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Premium Experiences
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">5-Star Tented Camps &bull; Private Guides</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Luxury Safaris Tanzania
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              Uncompromising Excellence in the African Wild
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Private game drives at dawn. A candlelit dinner on the Serengeti plains. Your own plunge
              pool overlooking the endless African horizon. Tanzania&apos;s finest luxury safaris — crafted
              for those who refuse to compromise.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "From $4,000pp", sub: "7 Nights" },
                { label: "Private", sub: "Game Drives" },
                { label: "5★ Camps", sub: "Handpicked" },
                { label: "Michelin-Quality", sub: "Bush Dining" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-xl font-bold text-[var(--secondary)]">{stat.label}</p>
                  <p className="text-sm text-white/70">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tailor-made-safari/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Plan My Luxury Safari
              </Link>
              <Link
                href="/contact-us/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Speak to an Expert
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              The Luxury Difference
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              What Makes a Luxury Safari in Tanzania?
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              True luxury Tanzania safaris are not simply about expensive accommodation. They deliver
              exclusivity — private game drives in luxury tented camps Tanzania, personalised service,
              and access to 5-star safari experiences unavailable to standard travellers. A private
              safari Tanzania brings you closer to wildlife without the crowds.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Signature Experiences
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Luxury Safari Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Where You Stay
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Luxury Accommodation Types
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {accommodationTypes.map((acc) => (
              <div
                key={acc.title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{acc.title}</h3>
                  <span className="text-sm font-bold text-[var(--secondary)] shrink-0 ml-2">{acc.price}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">{acc.description}</p>
                <ul className="space-y-1.5">
                  {acc.features.map((f) => (
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

      {/* Premium Inclusions */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            All Inclusive
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What Every Luxury Safari Includes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {premiumInclusions.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-lg"
              >
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kilimanjaro + Luxury Combination */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
                  alt="Kilimanjaro trek combined with luxury Tanzania safari"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  The Ultimate Combination
                </span>
                <h2 className="font-heading text-3xl font-bold mb-4 mt-2">
                  Kilimanjaro + Luxury Safari
                </h2>
                <p className="text-[var(--text-muted)] mb-4">
                  Conquer Africa&apos;s highest peak, then reward yourself with days of indulgent luxury in
                  the Serengeti. This iconic combination — raw physical achievement followed by total
                  relaxation — is one of the most profound travel experiences imaginable.
                </p>
                <p className="text-[var(--text-muted)] mb-6">
                  We design seamless itineraries moving from Kilimanjaro base camp directly to your
                  private luxury camp. From summit sweat to sundowners in two days.
                </p>
                <Link
                  href="/tailor-made-safari/"
                  className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Plan My Kili + Safari
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            From Our Luxury Travelers
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] mb-4 italic leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="font-semibold">{test.author}</p>
                  <p className="text-sm text-[var(--text-muted)]">{test.location}</p>
                  <p className="text-sm text-[var(--secondary-dark)] font-medium">{test.trip}</p>
                </div>
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
              Luxury Safari Questions
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
            Your Extraordinary Safari Awaits
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            No two luxury safaris are the same. Tell us your vision and we will craft an experience
            that exceeds every expectation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Design My Luxury Safari
            </Link>
            <Link
              href="/contact-us/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
