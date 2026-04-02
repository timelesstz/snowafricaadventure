import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  CloudRain,
  Thermometer,
  Users,
  ChevronDown,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Best Time to Climb Kilimanjaro 2026",
  description:
    "The best time to climb Mount Kilimanjaro is during the dry seasons: January–March and June–October. Discover which months offer the clearest skies, best trail conditions, and highest summit success rates.",
  url: "/best-time-to-climb-kilimanjaro/",
  image:
    "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
});

const months = [
  {
    month: "January",
    weather: "Dry & clear",
    trails: "Excellent",
    crowds: "Low–Medium",
    stars: 5,
    highlight: true,
  },
  {
    month: "February",
    weather: "Best month",
    trails: "Perfect",
    crowds: "Medium",
    stars: 5,
    highlight: true,
  },
  {
    month: "March",
    weather: "Start of rains",
    trails: "Good",
    crowds: "Low",
    stars: 3,
    highlight: false,
  },
  {
    month: "April",
    weather: "Long rains",
    trails: "Poor",
    crowds: "Very Low",
    stars: 2,
    highlight: false,
  },
  {
    month: "May",
    weather: "Heavy rains",
    trails: "Poor",
    crowds: "Very Low",
    stars: 2,
    highlight: false,
  },
  {
    month: "June",
    weather: "Drying out",
    trails: "Good",
    crowds: "Low",
    stars: 4,
    highlight: false,
  },
  {
    month: "July",
    weather: "Peak season",
    trails: "Excellent",
    crowds: "High",
    stars: 5,
    highlight: true,
  },
  {
    month: "August",
    weather: "Peak season",
    trails: "Excellent",
    crowds: "High",
    stars: 5,
    highlight: true,
  },
  {
    month: "September",
    weather: "Peak season",
    trails: "Very Good",
    crowds: "Medium–High",
    stars: 5,
    highlight: true,
  },
  {
    month: "October",
    weather: "Shoulder",
    trails: "Good",
    crowds: "Medium",
    stars: 4,
    highlight: false,
  },
  {
    month: "November",
    weather: "Short rains",
    trails: "Fair",
    crowds: "Low",
    stars: 3,
    highlight: false,
  },
  {
    month: "December",
    weather: "Festive season",
    trails: "Good",
    crowds: "High",
    stars: 4,
    highlight: false,
  },
];

const seasonCards = [
  {
    icon: <Sun className="w-7 h-7" />,
    title: "Peak Season",
    period: "July – October",
    color: "bg-amber-100 text-amber-700",
    description:
      "The most reliable window on the mountain. Dry, cold, and clear with excellent visibility. Expect busy trails and higher prices — but the best summit conditions.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Short Dry Season",
    period: "January – March",
    color: "bg-sky-100 text-sky-700",
    description:
      "An excellent alternative with fewer climbers and competitive pricing. January and February are arguably the clearest months for summit views.",
  },
  {
    icon: <CloudRain className="w-7 h-7" />,
    title: "Long Rains",
    period: "April – May",
    color: "bg-slate-100 text-slate-600",
    description:
      "Persistent heavy rainfall makes trails muddy and visibility poor. Summit success rates drop significantly. Only recommended for very experienced trekkers seeking solitude.",
  },
  {
    icon: <CloudRain className="w-7 h-7" />,
    title: "Short Rains",
    period: "November",
    color: "bg-indigo-100 text-indigo-700",
    description:
      "Brief afternoon showers with morning clearings. Trails are green and lush. A feasible option for budget travellers, though summit views can be obscured.",
  },
];

const temperatureData = [
  { zone: "Base Camp (1,800m)", low: "12°C", high: "25°C", note: "Comfortable start" },
  { zone: "Forest Zone (2,800m)", low: "7°C", high: "18°C", note: "Cool evenings" },
  { zone: "Moorland (3,700m)", low: "2°C", high: "12°C", note: "Fleece required at night" },
  { zone: "High Camp (4,700m)", low: "-5°C", high: "5°C", note: "Down jacket essential" },
  { zone: "Summit (5,895m)", low: "-20°C", high: "-5°C", note: "Full summit gear needed" },
];

const faqs = [
  {
    question: "What is the best month to climb Kilimanjaro?",
    answer:
      "January, February, July, August, and September are consistently the best months to climb Kilimanjaro. These months fall within Tanzania's two dry seasons, offering clear skies, firm trail conditions, and the highest summit success rates.",
  },
  {
    question: "Can you climb Kilimanjaro in the rainy season?",
    answer:
      "Yes, but it is not recommended for most trekkers. The long rains (April–May) bring persistent heavy rainfall, slippery trails, cloud cover at altitude, and significantly lower summit success rates. If you must climb during this period, choose the Marangu route as it has covered huts.",
  },
  {
    question: "Is it cold on Kilimanjaro?",
    answer:
      "Summit temperatures can plunge to -20°C at night, even during the warmest months. At the Barafu high camp (4,673m), temperatures regularly drop below -10°C. Proper layering — base layer, fleece, and a quality down jacket — is essential regardless of the season.",
  },
  {
    question: "How long does it take to climb Kilimanjaro?",
    answer:
      "Most trekkers take between 5 and 9 days to climb Kilimanjaro, depending on the route chosen. We recommend at least 7 days to allow for proper acclimatisation, which significantly improves your chances of reaching Uhuru Peak.",
  },
  {
    question: "Should I climb Kilimanjaro in January or July?",
    answer:
      "Both are excellent choices. January offers fewer crowds, more competitive pricing, and superb clarity after the short rains clear. July falls in the peak season with guaranteed dry conditions but busier trails. For first-time climbers who prefer quieter routes, January and February are ideal.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= count ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function BestTimeToClimbKilimanjaroPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Best Time to Climb Kilimanjaro", url: "/best-time-to-climb-kilimanjaro/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Best time to climb Kilimanjaro — trekkers on dry season mountain trail in Tanzania"
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
                2026 Guide
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Best Time to Climb Kilimanjaro
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Month-by-month breakdown of weather, trail conditions, crowds, and summit success
              rates to help you choose the perfect window for your climb.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                View Routes &amp; Dates
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Group Departures
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-10 bg-[var(--secondary)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-4">
            <Calendar className="w-10 h-10 text-[var(--primary-dark)] shrink-0" />
            <div>
              <p className="font-heading text-xl font-bold text-[var(--primary-dark)]">
                Quick Answer: Best Months to Climb Kilimanjaro
              </p>
              <p className="text-[var(--primary-dark)]/80">
                <strong>January–March</strong> and <strong>June–October</strong> — Tanzania&apos;s dry seasons offer the clearest skies, driest trails, and highest summit success rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Month-by-Month Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Month-by-Month
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Kilimanjaro Climbing Calendar
            </h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--primary-dark)] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Month</th>
                    <th className="text-left px-4 py-3 font-semibold">Weather</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Trail Conditions</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Crowds</th>
                    <th className="text-left px-4 py-3 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((m, i) => (
                    <tr
                      key={m.month}
                      className={
                        m.highlight
                          ? "bg-amber-50 border-l-4 border-[var(--secondary)]"
                          : i % 2 === 0
                          ? "bg-white"
                          : "bg-[var(--muted)]"
                      }
                    >
                      <td className="px-4 py-3 font-semibold">{m.month}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{m.weather}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{m.trails}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)] hidden sm:table-cell">{m.crowds}</td>
                      <td className="px-4 py-3">
                        <StarRating count={m.stars} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Highlighted rows indicate recommended climbing months.
            </p>
          </div>
        </div>
      </section>

      {/* Two Seasons */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Seasons Explained
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Kilimanjaro&apos;s Two Dry Seasons
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 text-lg">
              Tanzania has two distinct dry seasons that both offer excellent climbing conditions, each with its own character and advantages.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Short Dry Season</h3>
                    <p className="text-sm text-[var(--secondary)] font-medium">January – March</p>
                  </div>
                </div>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Clear skies — often the best summit visibility of the year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Fewer climbers than July–September peak
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    More competitive pricing on routes and lodges
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Coincides with Great Migration calving season in Ngorongoro
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Main Dry Season</h3>
                    <p className="text-sm text-[var(--secondary)] font-medium">June – October</p>
                  </div>
                </div>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Most reliable dry conditions of the year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Warmest daytime temperatures on the mountain
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Best combined with a Northern Circuit safari
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">✓</span>
                    Coincides with peak Great Migration river crossings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
            What to Expect
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center">
            Climbing Conditions by Season
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {seasonCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
                >
                  {card.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                <p className="text-sm text-[var(--secondary)] font-medium mb-3">{card.period}</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temperature Guide */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Temperature Guide
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Summit Temperature by Altitude
            </h2>
            <p className="text-white/70 text-center mb-8">
              Temperatures drop approximately 6–7°C for every 1,000m of elevation gain. Always pack for the summit, not the base.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/10">
                    <th className="text-left px-5 py-3 font-semibold">Elevation Zone</th>
                    <th className="text-left px-5 py-3 font-semibold">Night Low</th>
                    <th className="text-left px-5 py-3 font-semibold">Day High</th>
                    <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Gear Note</th>
                  </tr>
                </thead>
                <tbody>
                  {temperatureData.map((row, i) => (
                    <tr
                      key={row.zone}
                      className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                    >
                      <td className="px-5 py-3 font-medium text-[var(--secondary)]">{row.zone}</td>
                      <td className="px-5 py-3 text-white/80">{row.low}</td>
                      <td className="px-5 py-3 text-white/80">{row.high}</td>
                      <td className="px-5 py-3 text-white/60 hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <Thermometer className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm">
                Summit night temperatures can reach -20°C in winter months (June–August). A sleeping bag rated to at least -15°C is essential for all climbers regardless of season.
              </p>
            </div>
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
              Questions About Timing Your Climb
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Kilimanjaro Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 6 routes</p>
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Calendar className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)]">Full cost breakdown</p>
              </Link>
              <Link href="/kilimanjaro-vs-everest/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro vs Everest</p>
                <p className="text-xs text-[var(--text-muted)]">Which to climb first?</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Found Your Perfect Window?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Whether you want a quiet January climb or a peak-season July adventure, our team is
            ready to secure your spot. Browse available routes or join a group departure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View Group Departures
            </Link>
            <Link
              href="/trekking/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              All Kilimanjaro Routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
