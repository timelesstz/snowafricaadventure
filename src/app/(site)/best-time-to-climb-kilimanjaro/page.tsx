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
  ArrowRight,
  Moon,
  Mountain,
  Binoculars,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RelatedGuides, CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

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

const weatherData = [
  { month: "January", gateTemp: 18, summitTemp: -7, rainfall: 80, clearDays: 20, crowd: "Medium" },
  { month: "February", gateTemp: 18, summitTemp: -7, rainfall: 60, clearDays: 22, crowd: "Medium" },
  { month: "March", gateTemp: 17, summitTemp: -8, rainfall: 150, clearDays: 15, crowd: "Low" },
  { month: "April", gateTemp: 16, summitTemp: -8, rainfall: 300, clearDays: 8, crowd: "Very Low" },
  { month: "May", gateTemp: 15, summitTemp: -9, rainfall: 250, clearDays: 10, crowd: "Very Low" },
  { month: "June", gateTemp: 14, summitTemp: -10, rainfall: 30, clearDays: 25, crowd: "Low–Medium" },
  { month: "July", gateTemp: 13, summitTemp: -12, rainfall: 15, clearDays: 28, crowd: "High" },
  { month: "August", gateTemp: 13, summitTemp: -12, rainfall: 15, clearDays: 28, crowd: "High" },
  { month: "September", gateTemp: 14, summitTemp: -10, rainfall: 20, clearDays: 26, crowd: "Medium–High" },
  { month: "October", gateTemp: 16, summitTemp: -8, rainfall: 50, clearDays: 22, crowd: "Medium" },
  { month: "November", gateTemp: 17, summitTemp: -7, rainfall: 150, clearDays: 15, crowd: "Low" },
  { month: "December", gateTemp: 18, summitTemp: -7, rainfall: 120, clearDays: 18, crowd: "Medium–High" },
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
      "January, February, July, August, and September are consistently the best months to climb Kilimanjaro. These months fall within Tanzania’s two dry seasons, offering clear skies, firm trail conditions, and the highest summit success rates.",
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
  {
    question: "Does it rain on the summit?",
    answer:
      "Precipitation at the summit (5,895m) typically falls as snow or sleet rather than rain. Above 4,500m the air is too cold and dry for significant rainfall. However, during the rainy seasons (April–May and November), snow flurries are more frequent and can reduce visibility. The lower forest and moorland zones receive the heaviest rainfall, not the summit itself.",
  },
  {
    question: "What is the warmest month on Kilimanjaro?",
    answer:
      "January, February, and December are the warmest months at the gate (around 18°C), while summit temperatures remain frigid year-round. At Uhuru Peak, expect -7°C to -12°C regardless of season. The warmest summit conditions occur during January–March when solar radiation is strongest, but summit night temperatures still drop well below freezing.",
  },
  {
    question: "Can I combine Kilimanjaro with a safari?",
    answer:
      "Absolutely — and we strongly recommend it. A Kilimanjaro climb pairs perfectly with a 3–5 day Tanzania safari. January–March lets you witness the Great Migration calving season in the Ngorongoro Crater area, while June–October coincides with dramatic river crossings in the Serengeti. Most climbers add a safari after their descent to celebrate and recover.",
  },
  {
    question: "Is December a good time to climb?",
    answer:
      "December is a viable climbing month, especially the second half after the short rains taper off. It coincides with the festive season, so trails can be busy around Christmas and New Year. Expect occasional afternoon showers in early December, but overall conditions are good. It’s a popular choice for those who want to summit on New Year’s Eve or celebrate Christmas on the mountain.",
  },
  {
    question: "How cold is summit night?",
    answer:
      "Summit night is the coldest part of any Kilimanjaro climb. Temperatures at Stella Point (5,756m) and Uhuru Peak (5,895m) typically range from -15°C to -25°C between midnight and 7am. Wind chill can make it feel even colder. You’ll need insulated gloves, a balaclava, a heavy down jacket, and hand warmers. Most climbers start the summit push around midnight from high camp, reaching the crater rim at sunrise when temperatures begin to rise.",
  },
  {
    question: "When is the cheapest time to climb Kilimanjaro?",
    answer:
      "The most affordable months are typically April, May, and November — the shoulder and rainy seasons when operator demand drops. January–March also offers more competitive pricing than the peak July–September season. However, lower prices during wet months come with reduced summit success rates and less comfortable conditions, so the value equation favours the short dry season (January–February) for budget-conscious climbers.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= count ? "text-amber-400" : "text-gray-300"}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

function CrowdBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    "Very Low": "bg-emerald-100 text-emerald-700",
    "Low": "bg-green-100 text-green-700",
    "Low–Medium": "bg-lime-100 text-lime-700",
    "Medium": "bg-amber-100 text-amber-700",
    "Medium–High": "bg-orange-100 text-orange-700",
    "High": "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorMap[level] || "bg-gray-100 text-gray-700"}`}>
      {level}
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
          generateArticleSchema({
            title: "Best Time to Climb Kilimanjaro 2026",
            description:
              "The best time to climb Mount Kilimanjaro is during the dry seasons: January–March and June–October. Discover which months offer the clearest skies, best trail conditions, and highest summit success rates.",
            url: "/best-time-to-climb-kilimanjaro/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
            publishedTime: "2026-03-04",
            modifiedTime: "2026-06-18",
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Trekking Routes", href: "/trekking/" },
            { label: "Best Time to Climb" },
          ]}
        />
      </div>

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

      <CredentialsBadges variant="compact" />

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
                <strong>January&ndash;March</strong> and <strong>June&ndash;October</strong> &mdash; Tanzania&apos;s dry seasons offer the clearest skies, driest trails, and highest summit success rates.
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

      {/* Monthly Weather Data */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Climate Data
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Monthly Weather Data
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-8 max-w-2xl mx-auto">
              Detailed temperature, rainfall, and visibility data for each month. Gate temperatures are measured at 1,800m (Machame or Marangu Gate) and summit temperatures at Uhuru Peak (5,895m). Understanding Kilimanjaro&apos;s <Link href="/kilimanjaro-climate-zones/" className="text-[var(--secondary)] hover:underline">five distinct climate zones</Link> helps you prepare for the dramatic temperature shifts.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--primary-dark)] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Month</th>
                    <th className="text-left px-4 py-3 font-semibold">Gate Temp</th>
                    <th className="text-left px-4 py-3 font-semibold">Summit Temp</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Rainfall</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Clear Days</th>
                    <th className="text-left px-4 py-3 font-semibold">Crowds</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.map((row, i) => (
                    <tr
                      key={row.month}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-4 py-3 font-semibold">{row.month}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.gateTemp}&deg;C</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.summitTemp}&deg;C</td>
                      <td className="px-4 py-3 text-[var(--text-muted)] hidden sm:table-cell">{row.rainfall}mm</td>
                      <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{row.clearDays}</td>
                      <td className="px-4 py-3">
                        <CrowdBadge level={row.crowd} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-3 bg-white rounded-xl p-4 border border-[var(--border)]">
              <Thermometer className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
              <p className="text-[var(--text-muted)] text-sm">
                For a deeper look at conditions at every elevation, read our full <Link href="/kilimanjaro-weather/" className="text-[var(--secondary)] hover:underline">Kilimanjaro weather guide</Link>. Summit temperatures remain below freezing year-round, and Kilimanjaro&apos;s iconic <Link href="/kilimanjaro-glaciers/" className="text-[var(--secondary)] hover:underline">glaciers</Link> are a stark reminder of the extreme cold at altitude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Seasons */}
      <section className="py-16">
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
                    <p className="text-sm text-[var(--secondary)] font-medium">January &ndash; March</p>
                  </div>
                </div>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Clear skies &mdash; often the best summit visibility of the year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Fewer climbers than July&ndash;September peak
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    More competitive pricing on routes and lodges
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
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
                    <p className="text-sm text-[var(--secondary)] font-medium">June &ndash; October</p>
                  </div>
                </div>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Most reliable dry conditions of the year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Warmest daytime temperatures on the mountain
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Best combined with a Northern Circuit safari
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Coincides with peak Great Migration river crossings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Cards */}
      <section className="py-16 bg-[var(--surface)]">
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
              Temperatures drop approximately 6&ndash;7&deg;C for every 1,000m of elevation gain. Always pack for the summit, not the base.
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
                Summit night temperatures can reach -20&deg;C in winter months (June&ndash;August). A sleeping bag rated to at least -15&deg;C is essential for all climbers regardless of season. Kilimanjaro&apos;s <Link href="/kilimanjaro-glaciers/" className="text-[var(--secondary)] hover:underline">glaciers and snow fields</Link> are visible year-round but fresh snowfall is most common during the rainy seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kilimanjaro + Safari Combo Timing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Climb &amp; Safari
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Kilimanjaro + Safari Combo Timing
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 text-lg">
              Many travellers combine a Kilimanjaro climb with a <Link href="/tanzania-safaris/" className="text-[var(--secondary)] hover:underline">Tanzania safari</Link> &mdash; and timing both correctly maximises your experience. Our <Link href="/kilimanjaro-safari-combo/" className="text-[var(--secondary)] hover:underline">Kilimanjaro safari combo guide</Link> covers how to plan the perfect combination trip.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                  <Binoculars className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="font-semibold text-lg mb-1">January &ndash; March</h3>
                <p className="text-sm text-[var(--secondary)] font-medium mb-3">Calving Season</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  The Great Migration calving season centres on the Ngorongoro Conservation Area and southern Serengeti. Over 8,000 wildebeest calves are born daily during February. Combine your climb with a visit to the <Link href="/tanzania-destinations/" className="text-[var(--secondary)] hover:underline">Ngorongoro Crater</Link> &mdash; one of Africa&apos;s most wildlife-dense destinations. The dry climbing conditions on Kilimanjaro during this window make it an ideal pairing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Mountain className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-1">June &ndash; October</h3>
                <p className="text-sm text-[var(--secondary)] font-medium mb-3">River Crossings</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  The dramatic Mara River crossings in the northern Serengeti typically peak from July through September. This coincides with Kilimanjaro&apos;s main dry season, making it the ultimate Tanzania combination trip. Climb Kilimanjaro first, then head to the <Link href="/tanzania-safaris/" className="text-[var(--secondary)] hover:underline">Serengeti</Link> to witness one of nature&apos;s most spectacular events. Park fees and lodge rates are highest during this window.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-1">December &ndash; January</h3>
                <p className="text-sm text-[var(--secondary)] font-medium mb-3">Green Season Value</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  The green season offers lush landscapes, fewer tourists, and more competitive pricing across both Kilimanjaro and safari <Link href="/tanzania-destinations/" className="text-[var(--secondary)] hover:underline">destinations</Link>. Bird migration peaks during this period, and the scenery is at its most photogenic. A great option for budget-conscious travellers who don&apos;t mind occasional afternoon showers on safari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Moon Summit Nights */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Moon className="w-8 h-8 text-[var(--secondary)]" />
            </div>
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Summit Strategy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Full Moon Summit Nights
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-8 text-lg">
              Some climbers specifically time their summit push to coincide with a full moon &mdash; and there are good reasons why.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  Why Target a Full Moon
                </h3>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Natural moonlight illuminates the entire scree slope, reducing reliance on head torches
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    The <Link href="/kilimanjaro-glaciers/" className="text-[var(--secondary)] hover:underline">glaciers</Link> glow under full moonlight &mdash; an unforgettable sight
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    Better depth perception on uneven terrain during the midnight ascent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--secondary)] mt-0.5">&#10003;</span>
                    A psychologically uplifting experience during the hardest part of the climb
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  What to Consider
                </h3>
                <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#9888;</span>
                    Full moon dates attract more climbers, meaning busier summit trails
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#9888;</span>
                    Cloud cover can negate the benefit entirely &mdash; clear skies are never guaranteed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#9888;</span>
                    Popular routes like Machame and Lemosho will be more congested at the crater rim
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">&#9888;</span>
                    Limiting yourself to full moon dates reduces your scheduling flexibility
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-[var(--border)] shadow-sm">
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                <strong className="text-[var(--primary-dark)]">Our recommendation:</strong> If a full moon aligns with your preferred travel window during a dry season month, it&apos;s a wonderful bonus. But don&apos;t sacrifice ideal <Link href="/kilimanjaro-weather/" className="text-[var(--secondary)] hover:underline">weather conditions</Link> just to chase a full moon. A clear, moonless summit night with stars is equally breathtaking &mdash; and often less crowded.
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
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-[var(--border)] rounded-xl shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-semibold text-sm md:text-base">{faq.question}</h3>
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <RelatedGuides currentPath="/best-time-to-climb-kilimanjaro/" />

      <KnowledgeBase exclude="/best-time-to-climb-kilimanjaro/" />

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
