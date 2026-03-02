import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Star, Binoculars, Footprints, Moon, Calendar } from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Wildlife Safaris Tanzania 2026 - See the Big Five & Great Migration",
  description:
    "Tanzania wildlife safaris offer unmatched biodiversity — 4 million animals, the Great Migration, the Big Five, and 1,100 bird species. Expert naturalist guides. Prices from $1,800. Book now.",
  url: "/wildlife-safaris-tanzania/",
});

const statsBoxes = [
  { stat: "4M+", label: "Wild Animals", sub: "Across all parks" },
  { stat: "14", label: "National Parks", sub: "World-class ecosystems" },
  { stat: "500+", label: "Bird Species", sub: "In the Serengeti alone" },
  { stat: "1.5M", label: "Wildebeest", sub: "In the Great Migration" },
];

const bigFive = [
  {
    animal: "Lion",
    emoji: "🦁",
    description:
      "Tanzania hosts over 7,000 lions — the largest population in Africa. The Serengeti's Seronera Valley is one of the best places on Earth for reliable lion sightings, often within minutes of entering the park.",
    bestPark: "Serengeti",
  },
  {
    animal: "Leopard",
    emoji: "🐆",
    description:
      "Elusive and solitary, leopards are the most challenging Big Five animal to spot. The riverine forest of Lake Manyara and the kopjes of the Serengeti are your best opportunities. Patient guides make the difference.",
    bestPark: "Lake Manyara / Serengeti",
  },
  {
    animal: "African Elephant",
    emoji: "🐘",
    description:
      "Tarangire National Park hosts some of Africa's largest elephant herds — over 2,500 individuals in the dry season. Watch multi-generational family groups at waterholes and along the Tarangire River.",
    bestPark: "Tarangire",
  },
  {
    animal: "Cape Buffalo",
    emoji: "🐃",
    description:
      "One of Africa's most dangerous animals and a formidable sight in large herds. The Serengeti's open grasslands and the Ngorongoro Crater floor host enormous buffalo aggregations year-round.",
    bestPark: "Serengeti / Ngorongoro",
  },
  {
    animal: "Black Rhino",
    emoji: "🦏",
    description:
      "Critically endangered and among the rarest sights in Africa. The Ngorongoro Crater is home to one of Tanzania's last wild black rhino populations — sightings are genuinely thrilling and humbling.",
    bestPark: "Ngorongoro Crater",
  },
];

const parks = [
  {
    name: "Serengeti National Park",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    highlight: "Great Migration & Big Five",
    description:
      "The world's most famous wildlife ecosystem. 25,000 km² of rolling grassland, riverine forest, and granite kopjes hosting the greatest wildlife concentration on Earth. Year-round predator action, lions, cheetah, and of course — the Migration.",
    bestTime: "Year-round; Migration July–Oct",
  },
  {
    name: "Ngorongoro Conservation Area",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/ngorongoro-crater-ngorongoro-conservation-area.jpg",
    highlight: "Black Rhino & Dense Wildlife",
    description:
      "Descend 600 metres into the world's largest intact volcanic caldera. The enclosed ecosystem traps an extraordinary concentration of wildlife — over 25,000 animals in 260 km² — making it the world's greatest natural game reserve.",
    bestTime: "Year-round",
  },
  {
    name: "Tarangire National Park",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    highlight: "Elephant Herds & Baobabs",
    description:
      "The Tarangire River is a magnet for wildlife during the dry season, drawing thousands of elephants, wildebeest, and buffalo. Iconic ancient baobab trees create a dramatic landscape unlike anywhere else in Tanzania.",
    bestTime: "June–October (dry season)",
  },
  {
    name: "Lake Manyara National Park",
    image:
      "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    highlight: "Flamingos & Tree-Climbing Lions",
    description:
      "Famous worldwide for its tree-climbing lions — a unique behaviour seen nowhere else — and vast flocks of flamingos that turn the soda lake pink. The groundwater forest also harbours large baboon and elephant populations.",
    bestTime: "November–June (wet season flamingos)",
  },
];

const safariTypes = [
  {
    icon: Binoculars,
    title: "Classic Game Drive",
    description:
      "The quintessential wildlife safari experience. Explore national parks in a purpose-built 4x4 Land Cruiser with a pop-top roof for 360-degree game viewing. Morning and afternoon drives maximise wildlife encounters.",
    duration: "Half day or full day",
  },
  {
    icon: Footprints,
    title: "Walking Safari",
    description:
      "Experience Tanzania's wilderness at ground level with an armed guide. Walking safaris reveal the smaller wonders — tracks, insects, medicinal plants — while offering the adrenaline of encountering big game on foot.",
    duration: "2–4 hours",
  },
  {
    icon: Moon,
    title: "Night Safari",
    description:
      "After dark, the bush comes alive. Night safaris with spotlights reveal nocturnal hunters — leopard, hyena, aardvark, porcupine, and bushbaby — in behaviour never seen during daylight hours.",
    duration: "2–3 hours after dusk",
  },
];

const seasons = [
  {
    season: "Jan – Feb",
    label: "Short Dry",
    rating: 4,
    notes: "Calving season in southern Serengeti; baby animals draw predators",
  },
  {
    season: "Mar – May",
    label: "Long Rains",
    rating: 3,
    notes: "Lush landscapes; fewer crowds; some road closures; good birding",
  },
  {
    season: "Jun – Oct",
    label: "Peak Dry",
    rating: 5,
    notes: "Best game viewing; Migration river crossings (Jul–Sep); busy season",
  },
  {
    season: "Nov – Dec",
    label: "Short Rains",
    rating: 3,
    notes: "Migratory birds arrive; green landscapes; quieter parks; good value",
  },
];

const faqs = [
  {
    question: "What wildlife can I see in Tanzania?",
    answer:
      "Tanzania offers all Big Five (lion, leopard, elephant, buffalo, black rhino) plus cheetah, wild dog, spotted hyena, giraffe, plains zebra, hippo, crocodile, and over 1,100 bird species. The Serengeti alone hosts 500+ bird species. Wildlife diversity in Tanzania is genuinely unmatched anywhere on Earth.",
  },
  {
    question: "Where is the best wildlife in Tanzania?",
    answer:
      "The Serengeti ecosystem — covering 25,000 km² including the Ngorongoro Conservation Area — hosts the greatest concentration of wildlife on Earth. For elephants specifically, Tarangire is exceptional. For rhino, Ngorongoro Crater is your best chance. For tree-climbing lions and flamingos, Lake Manyara is unmissable.",
  },
  {
    question: "What is the Great Migration in Tanzania?",
    answer:
      "The Great Migration is the annual circular movement of approximately 1.5 million wildebeest, 500,000 zebras, and 200,000 gazelles through the Serengeti ecosystem. The animals follow the rains and fresh grass, crossing the Mara River in dramatic fashion (July–September) before returning south to calve (January–February). It is the largest land migration on Earth.",
  },
  {
    question: "Do I need a special vehicle for wildlife safaris in Tanzania?",
    answer:
      "Yes — we use purpose-built 4x4 Toyota Land Cruisers with pop-top roofs that open fully for 360-degree photography and game viewing. These vehicles are essential for off-road access and elevated sightlines. All our vehicles are maintained to high mechanical standards and carry first aid kits and communication equipment.",
  },
];

export default function WildlifeSafarisTanzaniaPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Wildlife Safaris Tanzania", url: "/wildlife-safaris-tanzania/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/06/close-up-wild-lions-serengeti-national-park-scaled.jpg"
            alt="Wildlife Safari Tanzania — lions in the Serengeti National Park"
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
                Expert Naturalist Guides
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rating &bull; 14 National Parks</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Wildlife Safaris Tanzania
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              4 Million Animals. 1,100 Bird Species. One Extraordinary Destination.
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Tanzania hosts the greatest concentration of wildlife on Earth. From the Big Five to the
              Great Migration to 1,100 species of birds — no other destination on the planet comes close.
              Expert naturalist guides unlock every detail of this living, breathing wilderness.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "Big Five", sub: "All Guaranteed" },
                { label: "Great Migration", sub: "Annual Spectacle" },
                { label: "1,100+ Birds", sub: "Species" },
                { label: "From $1,800", sub: "Per Person" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-xl font-bold text-[var(--secondary)]">{stat.label}</p>
                  <p className="text-sm text-white/70">{stat.sub}</p>
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

      {/* Stats */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-8">
            Tanzania by the Numbers
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {statsBoxes.map((box) => (
              <div key={box.stat} className="text-center bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-4xl font-bold text-[var(--secondary)] mb-1">{box.stat}</p>
                <p className="font-semibold text-white mb-1">{box.label}</p>
                <p className="text-xs text-white/60">{box.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Five */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Iconic Wildlife
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Tanzania&apos;s Big Five
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            All five of Africa&apos;s most legendary animals roam freely across Tanzania&apos;s game reserves and national parks.
            Our wildlife safari Tanzania game drives deliver expert-guided encounters — we know exactly where to find the Big Five and how to get you close.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bigFive.map((animal) => (
              <div
                key={animal.animal}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{animal.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{animal.animal}</h3>
                    <p className="text-xs text-[var(--secondary)] font-semibold uppercase tracking-wide">
                      Best seen: {animal.bestPark}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{animal.description}</p>
              </div>
            ))}
            {/* 5 animals in a 3-col grid: last card is centered on its own row */}
          </div>
        </div>
      </section>

      {/* Great Migration */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  Nature&apos;s Greatest Spectacle
                </span>
                <h2 className="font-heading text-3xl font-bold mb-4 mt-2">
                  The Great Migration
                </h2>
                <p className="text-[var(--text-muted)] mb-4">
                  Every year, 1.5 million wildebeest, 500,000 zebras, and 200,000 gazelles make a
                  circular journey through the Serengeti ecosystem — following the rains and fresh
                  grass in a 1,200-kilometre loop.
                </p>
                <p className="text-[var(--text-muted)] mb-4">
                  The most dramatic moment: river crossings at the Mara River (July–September), where
                  thousands of wildebeest plunge into crocodile-filled waters in a frenzied, chaotic
                  spectacle that has earned its title as the greatest wildlife show on Earth.
                </p>
                <p className="text-[var(--text-muted)] mb-6">
                  The calving season (January–February) in the southern Serengeti brings its own drama
                  — thousands of baby wildebeest born daily attracting cheetah, lion, and hyena in
                  intense predator-prey encounters.
                </p>
                <Link
                  href="/tailor-made-safari/"
                  className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Plan My Migration Safari
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg"
                  alt="Great Migration wildebeest in the Serengeti"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Parks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Top Destinations
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Top Wildlife Viewing Parks
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {parks.map((park) => (
              <div
                key={park.name}
                className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={park.image}
                    alt={park.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 bg-[var(--secondary)] text-white rounded-full text-xs font-semibold">
                      {park.highlight}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{park.name}</h3>
                    <span className="text-xs text-[var(--text-muted)] shrink-0 ml-2">{park.bestTime}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{park.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Types */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Ways to See Wildlife
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Wildlife Safari Types
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {safariTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                  <p className="text-xs text-[var(--secondary)] font-semibold mb-3 uppercase tracking-wide">
                    {type.duration}
                  </p>
                  <p className="text-white/70 text-sm">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Seasons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              When to Go
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Best Wildlife Viewing Seasons
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {seasons.map((s) => (
                <div
                  key={s.season}
                  className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-[var(--secondary)]" />
                    <span className="font-bold text-sm">{s.season}</span>
                  </div>
                  <p className="text-xs text-[var(--secondary)] font-semibold uppercase tracking-wide mb-2">
                    {s.label}
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < s.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{s.notes}</p>
                </div>
              ))}
            </div>
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
              Wildlife Safari Questions
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
            Witness Tanzania&apos;s Wildlife for Yourself
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            No documentary or photograph prepares you for the reality. Book your Tanzania wildlife
            safari and experience the greatest wildlife destination on Earth.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
              Custom Wildlife Safari
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
