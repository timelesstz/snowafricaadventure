import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronDown,
  MapPin,
  Camera,
  Binoculars,
  Calendar,
  Users,
  Check,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "African Safaris Tanzania 2026",
  description:
    "Experience the best African safaris in Tanzania — home of the Serengeti, Ngorongoro Crater, and the Great Migration. Budget to luxury options. Expert local guides. Book your African safari adventure today.",
  url: "/african-safaris/",
});

const whyTanzania = [
  {
    icon: Binoculars,
    title: "The Great Migration",
    description:
      "Over 1.5 million wildebeest cross the Serengeti plains in the world's greatest wildlife spectacle. Witness dramatic river crossings between July and October.",
  },
  {
    icon: MapPin,
    title: "Most Diverse Wildlife",
    description:
      "Tanzania's parks are home to all Big Five, cheetah, wild dog, giraffe, zebra, 500+ bird species, and more wildlife per square kilometre than almost anywhere on Earth.",
  },
  {
    icon: Check,
    title: "Pristine Parks",
    description:
      "The Serengeti, Ngorongoro, Tarangire, and Ruaha are among the least disturbed wilderness areas in Africa. No fences, no overcrowding, just raw nature.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description:
      "Our guides are born and raised in Tanzania. They know every animal behaviour, track, and seasonal movement pattern — and they genuinely love sharing it with you.",
  },
];

const destinations = [
  {
    name: "Serengeti National Park",
    tagline: "14,763 km² of endless plains",
    description:
      "Tanzania's most iconic park is world-famous for the Great Migration but rewarding year-round. Expect lion prides, cheetah on termite mounds, and vast open savanna.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    tag: "Most Popular",
  },
  {
    name: "Ngorongoro Crater",
    tagline: "The world's largest intact caldera",
    description:
      "Over 25,000 animals live permanently inside this collapsed volcano. One of the best places in Africa to see black rhino, alongside lion, elephant, and flamingo.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    tag: "UNESCO World Heritage",
  },
  {
    name: "Tarangire National Park",
    tagline: "Africa's elephant paradise",
    description:
      "Famous for the highest elephant density in northern Tanzania, plus ancient baobab trees and excellent dry-season game viewing when animals congregate around the Tarangire River.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    tag: "Best for Elephants",
  },
  {
    name: "Lake Manyara",
    tagline: "Tree-climbing lions & flamingos",
    description:
      "A compact but extraordinary park where lions lounge in fever trees and hundreds of pink flamingos paint the alkaline lake shore. Perfect as a day trip or overnight stop.",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    tag: "Tree-Climbing Lions",
  },
];

const safariTypes = [
  {
    icon: Binoculars,
    title: "Classic Wildlife Safari",
    description:
      "Open-sided 4x4 game drives through Tanzania's northern circuit parks. Morning and afternoon drives with an experienced guide. Perfect for first-time safari travelers.",
    duration: "4–10 days",
    priceFrom: "$950",
  },
  {
    icon: Camera,
    title: "Great Migration Safari",
    description:
      "Timed to the annual wildebeest migration. Catch the dramatic Mara river crossings in July–October or the calving season in the southern Serengeti in January–March.",
    duration: "6–10 days",
    priceFrom: "$1,400",
  },
  {
    icon: Camera,
    title: "Photography Safari",
    description:
      "Dedicated photography game drives with flexible timing around golden hour. Vehicles configured for camera gear with adapted seats and stabilization equipment.",
    duration: "7–12 days",
    priceFrom: "$1,800",
  },
];

const bigFive = [
  { animal: "Lion", nickname: "The King", description: "Best seen in the Serengeti and Ngorongoro Crater. Prides of 20+ lions are common. The Serengeti has the world's largest lion population." },
  { animal: "Leopard", nickname: "The Ghost", description: "Elusive but present in all major parks. Tarangire and the Serengeti's kopjes are excellent spots. Look for them draped over acacia branches." },
  { animal: "Elephant", nickname: "The Giant", description: "Tanzania has over 60,000 elephants. Tarangire offers the most concentrated elephant viewing in the north, with herds of 200+ during dry season." },
  { animal: "Buffalo", nickname: "The Old Man", description: "Enormous herds of 500–2,000 buffalo cross the Serengeti. In Ngorongoro, they're a daily sight and a favourite for lions and hyenas." },
  { animal: "Rhino", nickname: "The Ancient", description: "Tanzania's black rhinos are critically endangered. Ngorongoro Crater is the most reliable place to see them — around 26 individuals roam the crater floor." },
];

const bestTimes = [
  { period: "Jan–Feb", name: "Calving Season", description: "Wildebeest calves born in Ndutu. Predators are hyper-active. Excellent Big Five." },
  { period: "Mar–May", name: "Green Season", description: "Low season with fewer tourists. Lush landscapes and migratory birds. Best photography light." },
  { period: "Jun–Aug", name: "Migration Begins", description: "Herds move north. Dramatic Grumeti river crossings. Hot-air balloon safaris popular." },
  { period: "Sep–Oct", name: "Peak Migration", description: "Mara river crossings at their most dramatic. Highest demand — book well ahead." },
  { period: "Nov–Dec", name: "Short Rains", description: "Herds return south. Wildebeest in the Serengeti again. Excellent value and smaller crowds." },
];

const safariTestimonials = [
  {
    quote:
      "We saw all Big Five on day one. The guides from Snow Africa Adventure were extraordinary — their knowledge and enthusiasm made every game drive unforgettable.",
    author: "Michael & Anna",
    location: "Germany",
    trip: "8-Day Northern Circuit Safari",
  },
  {
    quote:
      "The Ngorongoro Crater took our breath away. We spotted a black rhino within 20 minutes of descending — something our guide said doesn't happen every day!",
    author: "The Thompson Family",
    location: "Canada",
    trip: "7-Day Classic Safari",
  },
];

const safariLandFaqs = [
  {
    question: "Where is the best African safari destination?",
    answer:
      "Tanzania is widely considered the world's top safari destination, home to the Serengeti — the world's best wildlife reserve — the Ngorongoro Crater, and the annual Great Migration involving 1.5 million wildebeest. Its parks are vast, well-managed, and offer unmatched biodiversity.",
  },
  {
    question: "What is the difference between a budget and luxury safari in Africa?",
    answer:
      "Budget safaris use shared camping and group vehicles, costing from $150–$250 per person per day. Luxury safaris use private lodges or tented camps with gourmet meals, private vehicles, and exclusive game drives — from $500 to $1,500+ per person per day. Both can offer exceptional wildlife experiences.",
  },
  {
    question: "What animals will I see on an African safari in Tanzania?",
    answer:
      "Tanzania offers all Big Five (lion, leopard, elephant, buffalo, rhino), plus cheetah, giraffe, zebra, hippo, crocodile, wild dog, hyena, jackal, over 500 bird species, and seasonal wildebeest and zebra migrations. The variety is unmatched on the continent.",
  },
  {
    question: "How long should an African safari be?",
    answer:
      "A minimum of 5–7 days is recommended for a meaningful safari experience covering 2–3 parks. To properly explore the Serengeti, Ngorongoro, Tarangire, and Lake Manyara, plan for 9–12 days. Combine with Kilimanjaro or Zanzibar for a 14–21 day Tanzania adventure.",
  },
];

export default function AfricanSafarisPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "African Safaris", url: "/african-safaris/" },
          ]),
          generateFAQSchema(safariLandFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="African safari in the Serengeti, Tanzania"
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
                Tanzania&apos;s Finest Wildlife
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rated &bull; 115+ Reviews</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              African Safaris —{" "}
              <span className="text-[var(--secondary)]">Tanzania&apos;s Wildlife Wilderness</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Home of the Serengeti, Ngorongoro Crater, and the Great Migration.
              Experience Africa&apos;s greatest wildlife show with expert local guides.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: "14,763 km²", label: "Serengeti" },
                { value: "1.5M+", label: "Wildebeest" },
                { value: "Big Five", label: "Guaranteed" },
                { value: "4.9 ★", label: "Rated" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tanzania-safaris/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                View Safari Packages
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Custom Itinerary
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Why Tanzania */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Why Tanzania
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Why Tanzania for African Safaris?
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Tanzania consistently tops lists of the best african safari destinations on Earth.
            Africa safari packages from Snow Africa Adventure are built around four core pillars that no other country can match.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {whyTanzania.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Safari Destinations */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Top Destinations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Tanzania&apos;s Best Safari Parks
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Each park offers a unique landscape and wildlife experience. Most itineraries combine
            2–4 parks for maximum variety.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="group bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[var(--secondary)] text-white text-xs font-semibold rounded-full">
                    {dest.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-sm text-[var(--secondary-dark)] font-medium mb-2">{dest.tagline}</p>
                  <p className="text-sm text-[var(--text-muted)]">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tanzania-destinations/"
              className="inline-block border-2 border-[var(--border)] hover:border-[var(--secondary)] text-[var(--text)] hover:text-[var(--secondary)] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Safari Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Safari Styles
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Types of African Safaris
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Every safari has its own character. Choose based on your goals — whether it&apos;s witnessing
            the migration, capturing the perfect photograph, or simply experiencing raw African nature.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {safariTypes.map(({ icon: Icon, title, description, duration, priceFrom }) => (
              <div
                key={title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <span className="text-xs text-[var(--text-muted)]">{duration}</span>
                  <span className="text-sm font-bold text-[var(--secondary-dark)]">From {priceFrom}/pp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Five */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Wildlife Encounters
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Meet the Big Five
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {bigFive.map((animal) => (
              <div
                key={animal.animal}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{animal.animal}</h3>
                  <span className="text-xs text-[var(--secondary)] italic">{animal.nickname}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{animal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Seasonal Guide
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Best Time for African Safaris in Tanzania
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {bestTimes.map((t) => (
              <div key={t.period} className="bg-white border border-[var(--border)] rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4 text-[var(--secondary)] mr-1.5" />
                  <span className="text-xs font-bold text-[var(--secondary)] uppercase">{t.period}</span>
                </div>
                <p className="font-semibold text-sm mb-1">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Traveler Stories
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {safariTestimonials.map((test, i) => (
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
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              African Safari Questions
            </h2>
            <div className="space-y-4">
              {safariLandFaqs.map((faq, i) => (
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
            Start Planning Your African Safari
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Browse our curated packages or tell us what you&apos;re dreaming of and we&apos;ll
            build a custom Tanzania safari just for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tanzania-safaris/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Safari Packages
            </Link>
            <Link
              href="/tailor-made-safari/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Custom Safari Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
