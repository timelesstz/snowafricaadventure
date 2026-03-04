import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Target,
  Clock,
  Users,
  Star,
  ArrowRight,
  Shield,
  ChevronRight,
  Award,
  Heart,
  TrendingUp,
  Map,
  Sun,
  Compass,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateItemListSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = genMeta({
  title: "Best Route to Climb Kilimanjaro",
  description:
    "Compare all 7 Kilimanjaro routes side-by-side. Success rates, difficulty, cost, scenery, and expert recommendations from guides with 500+ summits. Find your perfect route.",
  url: "/best-route-to-climb-kilimanjaro/",
});

const allRoutes = [
  {
    name: "Lemosho Route",
    slug: "8-days-lemosho-route",
    days: "7-8",
    standardDays: 8,
    difficulty: "Moderate-Challenging",
    successRate: "90-95%",
    successNum: 93,
    traffic: "Low-Medium",
    scenery: 5,
    price: "From $2,500",
    priceNum: 2500,
    approach: "West (Londorossi Gate)",
    accommodation: "Camping",
    bestFor: "Best overall choice",
    verdict: "Top Pick",
    description:
      "The Lemosho Route is widely considered the best route on Kilimanjaro. It approaches from the remote western side through pristine rainforest, offers outstanding panoramic views, and has the best acclimatization profile of the commonly used routes. The first two days see very few other trekkers, giving a true wilderness feel before joining the Machame high route.",
    pros: [
      "Highest success rate of standard routes (90-95%)",
      "Most scenic — panoramic views from multiple sides",
      "Excellent acclimatization with 'climb high, sleep low'",
      "Low traffic on first 2 days — true wilderness feel",
      "Passes through all 5 climate zones",
    ],
    cons: [
      "Higher cost than shorter routes",
      "Joins Machame route mid-mountain (more traffic from day 3)",
      "Requires good fitness for 8 days of trekking",
    ],
  },
  {
    name: "Machame Route",
    slug: "7-days-machame-route",
    days: "6-7",
    standardDays: 7,
    difficulty: "Challenging",
    successRate: "80-90%",
    successNum: 85,
    traffic: "High",
    scenery: 5,
    price: "From $2,100",
    priceNum: 2100,
    approach: "South (Machame Gate)",
    accommodation: "Camping",
    bestFor: "Most popular route",
    verdict: "Best Scenery",
    description:
      "The Machame Route, nicknamed the 'Whiskey Route' for its challenging nature, is the most popular route on Kilimanjaro. It features dramatic scenery including the famous Barranco Wall scramble, Lava Tower acclimatization, and sweeping ridge walks. The 7-day version has significantly higher success rates than the 6-day.",
    pros: [
      "Spectacular scenery — Barranco Wall, Lava Tower, ridge walks",
      "Good acclimatization with Lava Tower day",
      "Well-established route with excellent infrastructure",
      "Lower cost than Lemosho while maintaining good success rates",
    ],
    cons: [
      "Busiest route on the mountain — expect crowds",
      "Steeper sections require reasonable fitness",
      "6-day version has significantly lower success rate",
    ],
  },
  {
    name: "Rongai Route",
    slug: "6-days-rongai-route",
    days: "6-7",
    standardDays: 7,
    difficulty: "Moderate",
    successRate: "85-90%",
    successNum: 87,
    traffic: "Low",
    scenery: 3,
    price: "From $2,200",
    priceNum: 2200,
    approach: "North (Rongai Gate, near Kenya)",
    accommodation: "Camping",
    bestFor: "Rainy season / quieter trek",
    verdict: "Best for Rain",
    description:
      "The Rongai Route is the only route that approaches Kilimanjaro from the north, near the Kenyan border. The northern slopes are drier and less affected by rainfall, making this the best choice during the rainy seasons. It sees far fewer trekkers than Machame or Marangu, offering a more solitary experience.",
    pros: [
      "Driest route — best for rainy season climbing",
      "Very low traffic — often just your group",
      "Gradual ascent suitable for beginners",
      "Unique northern approach with different vegetation",
    ],
    cons: [
      "Less scenic than Machame or Lemosho",
      "Less dramatic landscape variety",
      "Longer drive to trailhead from Moshi (3+ hours)",
    ],
  },
  {
    name: "Northern Circuit",
    slug: "7-days-machame-route",
    days: "9",
    standardDays: 9,
    difficulty: "Moderate",
    successRate: "90-95%",
    successNum: 95,
    traffic: "Very Low",
    scenery: 5,
    price: "From $3,200",
    priceNum: 3200,
    approach: "West (Londorossi Gate)",
    accommodation: "Camping",
    bestFor: "Ultimate Kilimanjaro experience",
    verdict: "Highest Success",
    description:
      "The Northern Circuit is the longest and newest route on Kilimanjaro. It circumnavigates the entire mountain over 9 days, providing unmatched acclimatization and the highest success rates. The northern slopes are virtually deserted, offering complete solitude and panoramic views from angles most trekkers never see.",
    pros: [
      "Highest success rate of any route (95%+)",
      "Best acclimatization — 9 days gives your body maximum time",
      "Almost complete solitude on northern slopes",
      "360-degree views of the mountain over the full trek",
      "Lowest risk of altitude sickness",
    ],
    cons: [
      "Most expensive route",
      "Longest trek — requires 9+ days including travel",
      "Northern slopes can be windy and cold",
    ],
  },
  {
    name: "Marangu Route",
    slug: "6-days-marangu-route",
    days: "5-6",
    standardDays: 6,
    difficulty: "Moderate",
    successRate: "65-80%",
    successNum: 72,
    traffic: "High",
    scenery: 3,
    price: "From $1,850",
    priceNum: 1850,
    approach: "Southeast (Marangu Gate)",
    accommodation: "Hut (dormitory)",
    bestFor: "Budget / hut accommodation",
    verdict: "Budget Pick",
    description:
      "The Marangu Route, known as the 'Coca-Cola Route,' is the oldest and most established route on Kilimanjaro. It is the only route offering sleeping huts with dormitory-style bunk beds, mattresses, and dining halls instead of camping. The 5-day version has the lowest success rate on the mountain due to insufficient acclimatization; the 6-day version is significantly better.",
    pros: [
      "Only route with hut accommodation — no tents needed",
      "Most affordable route",
      "Well-maintained path with gradual gradient",
      "Same descent route — familiar terrain on the way down",
    ],
    cons: [
      "Lowest success rate (65% for 5-day, ~80% for 6-day)",
      "Shared dormitory huts — less privacy",
      "Less varied scenery — same route up and down",
      "High traffic — very popular with budget operators",
    ],
  },
  {
    name: "Umbwe Route",
    slug: "6-days-umbwe-route",
    days: "6-7",
    standardDays: 6,
    difficulty: "Very Challenging",
    successRate: "70-80%",
    successNum: 75,
    traffic: "Very Low",
    scenery: 4,
    price: "From $2,200",
    priceNum: 2200,
    approach: "South (Umbwe Gate)",
    accommodation: "Camping",
    bestFor: "Experienced trekkers only",
    verdict: "Most Challenging",
    description:
      "The Umbwe Route is the steepest and most direct route to Kilimanjaro's summit. It ascends through dense forest on a steep, often muddy trail with exposed tree roots and some scrambling sections. The rapid altitude gain means less time for acclimatization. We recommend this route only for experienced high-altitude trekkers with proven fitness.",
    pros: [
      "Most dramatic and challenging route",
      "Very low traffic — often completely alone",
      "Direct route through stunning forest",
      "Sense of achievement for experienced trekkers",
    ],
    cons: [
      "Steep, demanding ascent from day one",
      "Poor acclimatization — rapid altitude gain",
      "Lower success rate due to insufficient altitude adjustment",
      "Not suitable for beginners or first-time trekkers",
    ],
  },
];

const routeFaqs = [
  {
    question: "What is the best route to climb Kilimanjaro for first-timers?",
    answer:
      "For first-time climbers, we recommend the 8-day Lemosho Route. It offers the best balance of scenery, acclimatization, and success rate (90-95%). The gradual ascent gives your body maximum time to adjust to altitude. If budget is a concern, the 7-day Machame Route is an excellent alternative with dramatic scenery and an 85-90% success rate.",
  },
  {
    question: "Which Kilimanjaro route has the highest success rate?",
    answer:
      "The Northern Circuit (9 days) has the highest success rate at 95%+ due to its extended acclimatization period. The 8-day Lemosho Route is a close second at 90-95%. In general, longer routes have higher success rates because they give your body more time to adapt to altitude — this is the single most important factor in summit success.",
  },
  {
    question: "Which is the cheapest route to climb Kilimanjaro?",
    answer:
      "The Marangu Route (5-6 days) is the most affordable at around $1,850 per person for a group climb. However, the 5-day version has the lowest success rate (65%). We recommend spending slightly more on a 7-day Machame ($2,100) or 7-day Rongai ($2,200) for significantly better summit chances. The extra cost is worth the investment.",
  },
  {
    question: "Which Kilimanjaro route is the most scenic?",
    answer:
      "The Lemosho Route and Machame Route are considered the most scenic. Lemosho offers panoramic views from the remote western approach and passes through all 5 climate zones. Machame is famous for the Barranco Wall scramble, Lava Tower, and dramatic ridge walks. The Northern Circuit also provides stunning 360-degree views but requires 9 days.",
  },
  {
    question: "Which route is best during the rainy season?",
    answer:
      "The Rongai Route is the best choice during rainy season (March-May and November). It approaches from the north, which is the driest side of the mountain and receives less rainfall than southern routes like Machame and Lemosho. The trail conditions on Rongai are also less affected by rain.",
  },
  {
    question: "How many days should I spend climbing Kilimanjaro?",
    answer:
      "We recommend a minimum of 7 days for the best chance of reaching the summit. Routes of 7+ days have success rates of 85-95%, compared to 65% for 5-day routes. The extra days allow better acclimatization, which is the single most important factor in avoiding altitude sickness and reaching Uhuru Peak. Our most popular options are 7-day Machame, 8-day Lemosho, and 9-day Northern Circuit.",
  },
  {
    question: "Can I climb Kilimanjaro via the Western Breach route?",
    answer:
      "The Western Breach is an alternative summit approach available on the Lemosho and Northern Circuit routes. Instead of the standard Barafu summit route, it ascends directly through the crater rim. It is steeper and more exposed, with a history of rockfall incidents. We only recommend it for experienced trekkers who specifically request it, and we require additional safety briefings.",
  },
  {
    question: "Which route is quietest with the fewest other trekkers?",
    answer:
      "The Northern Circuit sees the fewest trekkers of any route — you may not see another group for the entire northern traverse. The Rongai Route is also very quiet, especially mid-week. The Umbwe Route sees very few trekkers but is only suitable for experienced climbers. Machame and Marangu are the busiest routes.",
  },
  {
    question: "Is the Lemosho Route worth the extra cost over Machame?",
    answer:
      "Yes, in our experience the Lemosho Route is worth the additional investment. The extra day provides significantly better acclimatization (90-95% vs 80-90% success rate), the western approach offers remote wilderness trekking for the first two days, and the views are arguably the best on the mountain. For a once-in-a-lifetime experience, the extra $400-500 makes a meaningful difference.",
  },
  {
    question: "Do all routes reach the same summit point?",
    answer:
      "Yes. All routes converge near the summit and reach the same point: Uhuru Peak at 5,895m (19,341 feet). Most routes approach the summit via Barafu Camp, ascending through Stella Point (5,756m) to Uhuru Peak. The difference is in the journey — each route provides a unique experience through different landscapes and climate zones.",
  },
];

const decisionMatrix = [
  { scenario: "First-time climber, good fitness, 8 days available", route: "Lemosho Route", slug: "8-days-lemosho-route", reason: "Best acclimatization, highest success rate, stunning scenery" },
  { scenario: "Experienced trekker, want a challenge", route: "Machame Route", slug: "7-days-machame-route", reason: "Dramatic terrain, Barranco Wall, great scenery" },
  { scenario: "Travelling during rainy season (Mar-May / Nov)", route: "Rongai Route", slug: "6-days-rongai-route", reason: "Driest route, northern approach less affected by rain" },
  { scenario: "Want the highest possible success rate", route: "Northern Circuit", slug: "7-days-machame-route", reason: "9 days = best acclimatization, 95%+ success rate" },
  { scenario: "Limited budget, prefer hut accommodation", route: "Marangu Route", slug: "6-days-marangu-route", reason: "Most affordable, dormitory-style huts (no camping)" },
  { scenario: "Experienced high-altitude trekker, want solitude", route: "Umbwe Route", slug: "6-days-umbwe-route", reason: "Steepest route, virtually no other trekkers" },
  { scenario: "Have 7 days, want best value", route: "Machame Route", slug: "7-days-machame-route", reason: "Best scenery-to-price ratio, 85-90% success" },
  { scenario: "Want ultimate Kilimanjaro experience, time/budget no issue", route: "Northern Circuit", slug: "7-days-machame-route", reason: "Full mountain circumnavigation, maximum acclimatization" },
];

export default function BestRouteToClimbKilimanjaroPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Trekking Routes", href: "/trekking/" },
            { label: "Best Route to Climb Kilimanjaro" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking Routes", url: "/trekking/" },
            { name: "Best Route to Climb Kilimanjaro", url: "/best-route-to-climb-kilimanjaro/" },
          ]),
          generateFAQSchema(routeFaqs),
          generateArticleSchema({
            title: "Best Route to Climb Kilimanjaro: Complete Route Comparison Guide 2026",
            description: "Compare all 7 Kilimanjaro routes side-by-side. Success rates, difficulty, cost, scenery, and expert recommendations.",
            url: "/best-route-to-climb-kilimanjaro/",
            image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-01",
            modifiedTime: "2026-03-04",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: ["200+ Kilimanjaro Summits", "15+ Years Guiding Experience", "TATO Licensed Guide", "Wilderness First Responder"],
          }),
          generateItemListSchema(
            allRoutes.map((route, i) => ({
              name: route.name,
              url: `/trekking/${route.slug}/`,
              description: route.description.slice(0, 200),
              position: i + 1,
            }))
          ),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Kilimanjaro trekkers choosing the best route to the summit"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Route Guide 2026
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Written by guides with 500+ summits</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Best Route to Climb <span className="text-[var(--secondary)]">Kilimanjaro</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Compare all 6 Kilimanjaro routes side-by-side — success rates, difficulty, cost, and scenery — from guides who&apos;ve led 500+ summits across every route.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#comparison" className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                Compare Routes <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#decision-guide" className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Which Route is Right for Me?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Box — targets featured snippet */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-3">Quick Answer: The Best Route is the Lemosho Route (8 Days)</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    Based on our experience guiding 500+ summits across every route, the <strong>8-day Lemosho Route</strong> is the best overall choice for most climbers. It offers the ideal combination of scenery (panoramic views from the remote western approach), acclimatization (climb high, sleep low profile), and success rate (90-95%). The first two days see very few other trekkers, giving a true wilderness feel.
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span><strong>90-95%</strong> Success Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span><strong>8 Days</strong> Duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-600" />
                      <span><strong>5/5</strong> Scenery Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Low-Medium Traffic</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/trekking/8-days-lemosho-route/" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:underline">
                      View Full Lemosho Route Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section id="comparison" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Side-by-Side Comparison
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              All Kilimanjaro Routes Compared
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every route reaches the same summit — Uhuru Peak at 5,895m. The difference is in the journey. Compare all 6 routes across key factors.
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">Difficulty</th>
                  <th className="text-left px-4 py-3 font-semibold">Success Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">Traffic</th>
                  <th className="text-left px-4 py-3 font-semibold">Scenery</th>
                  <th className="text-left px-4 py-3 font-semibold">Accommodation</th>
                  <th className="text-left px-4 py-3 font-semibold">Price From</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {allRoutes.map((route, i) => (
                  <tr
                    key={route.name}
                    className={`border-t border-[var(--border)] ${route.verdict === "Top Pick" ? "bg-emerald-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <td className="px-4 py-4">
                      <Link href={`/trekking/${route.slug}/`} className="font-semibold text-[var(--primary)] hover:text-[var(--secondary-dark)] hover:underline">
                        {route.name}
                      </Link>
                      {route.verdict === "Top Pick" && (
                        <span className="block mt-1 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-semibold w-fit">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium">{route.days}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          route.difficulty === "Very Challenging"
                            ? "bg-red-100 text-red-700"
                            : route.difficulty === "Challenging" || route.difficulty === "Moderate-Challenging"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {route.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${route.successNum}%` }} />
                        </div>
                        <span className="font-medium text-emerald-700">{route.successRate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs">{route.traffic}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= route.scenery ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs">{route.accommodation}</td>
                    <td className="px-4 py-4 font-bold text-[var(--secondary-dark)]">{route.price}</td>
                    <td className="px-4 py-4 text-xs text-[var(--text-muted)]">{route.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4 max-w-2xl mx-auto">
            Prices are per person based on 2 people. Success rates are based on our own guiding data across 500+ summits.
            Solo travellers and larger groups have different rates. <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline">See full pricing</Link>.
          </p>
        </div>
      </section>

      {/* Key Insight: Why Route Duration Matters */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[var(--secondary)]/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">The #1 Factor in Summit Success: Duration</h2>
                <p className="text-white/60 text-sm">Based on our guiding data from 500+ summits</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-8 text-lg">
              The single most important factor in reaching the summit is <strong className="text-white">how many days you spend on the mountain</strong>. More days means better acclimatization, which directly reduces altitude sickness risk. Our data shows:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-red-400 mb-2">65%</p>
                <p className="text-white/70">5-day routes</p>
                <p className="text-xs text-white/50 mt-1">Insufficient acclimatization</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-amber-400 mb-2">85%</p>
                <p className="text-white/70">7-day routes</p>
                <p className="text-xs text-white/50 mt-1">Good acclimatization</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-emerald-400 mb-2">95%</p>
                <p className="text-white/70">8-9 day routes</p>
                <p className="text-xs text-white/50 mt-1">Excellent acclimatization</p>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-6 text-center">
              We strongly recommend routes of 7+ days. The additional cost is a small investment for a significantly better chance of reaching Uhuru Peak.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Route Profiles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Detailed Analysis
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Each Route in Detail
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Our honest assessment of every route, including pros and cons, based on 15+ years of guiding experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {allRoutes.map((route) => (
              <div
                key={route.name}
                id={route.name.toLowerCase().replace(/\s+/g, "-")}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
                  route.verdict === "Top Pick" ? "border-emerald-300 ring-2 ring-emerald-100" : "border-[var(--border)]"
                }`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-2xl font-bold">{route.name}</h3>
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold ${
                            route.verdict === "Top Pick"
                              ? "bg-emerald-100 text-emerald-700"
                              : route.verdict === "Best Scenery"
                              ? "bg-amber-100 text-amber-700"
                              : route.verdict === "Highest Success"
                              ? "bg-blue-100 text-blue-700"
                              : route.verdict === "Most Challenging"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {route.verdict}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {route.days} days</span>
                        <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {route.successRate}</span>
                        <span className="flex items-center gap-1"><Map className="w-4 h-4" /> {route.approach}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {route.traffic} traffic</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--secondary-dark)]">{route.price}</p>
                      <p className="text-xs text-[var(--text-muted)]">per person (group of 2)</p>
                    </div>
                  </div>

                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">{route.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Pros
                      </h4>
                      <ul className="space-y-2">
                        {route.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                              <ArrowRight className="w-3 h-3 text-emerald-600" />
                            </span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                        <Compass className="w-4 h-4" /> Cons
                      </h4>
                      <ul className="space-y-2">
                        {route.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                              <ArrowRight className="w-3 h-3 text-red-600" />
                            </span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-4">
                    <Link
                      href={`/trekking/${route.slug}/`}
                      className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      View Full {route.name} Details <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/kilimanjaro-join-group-departures/"
                      className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      See Departures
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section id="decision-guide" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Decision Guide
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Which Route is Right for You?
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Find your best match based on your situation, fitness, and goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
              <div className="bg-[var(--primary-dark)] text-white px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold">
                  <div className="col-span-5">Your Situation</div>
                  <div className="col-span-3">Recommended Route</div>
                  <div className="col-span-4">Why</div>
                </div>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {decisionMatrix.map((row, i) => (
                  <div
                    key={row.scenario}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center text-sm ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <div className="col-span-5 font-medium">{row.scenario}</div>
                    <div className="col-span-3">
                      <Link href={`/trekking/${row.slug}/`} className="text-[var(--primary)] font-semibold hover:underline">
                        {row.route}
                      </Link>
                    </div>
                    <div className="col-span-4 text-[var(--text-muted)]">{row.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Recommendation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Heart className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Our Honest Recommendation</h2>
                <p className="text-[var(--text-muted)] text-sm">From Emmanuel Moshi, Founder — 200+ personal summits</p>
              </div>
            </div>
            <div className="prose prose-slate max-w-none">
              <p>
                After 15 years of guiding on Kilimanjaro and more than 200 personal summit expeditions, my recommendation is always the same: <strong>choose the longest route your time and budget allow</strong>.
              </p>
              <p>
                For most climbers, the <Link href="/trekking/8-days-lemosho-route/">8-day Lemosho Route</Link> is the best choice. It offers the ideal balance of scenery, acclimatization, and value. The first two days through remote western rainforest are magical — you feel like the only people on the mountain.
              </p>
              <p>
                If you have 9 days and a larger budget, the <strong>Northern Circuit</strong> is the ultimate Kilimanjaro experience — 360-degree views, almost no other trekkers, and the highest success rate we record. If you have 7 days, the <Link href="/trekking/7-days-machame-route/">Machame Route</Link> is excellent value with breathtaking scenery.
              </p>
              <p>
                Whatever route you choose, the most important thing is giving yourself enough days on the mountain. I have seen hundreds of fit, strong climbers turn back at 5,200m because they chose a 5-day route. Give yourself 7+ days and your chance of reaching Uhuru Peak increases dramatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
                Common Questions
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Kilimanjaro Route FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {routeFaqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl border border-[var(--border)] group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Content Links */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Kilimanjaro Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:bg-[var(--primary-dark)] hover:text-white transition-colors group">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)] group-hover:text-white/60">Complete climbing guide</p>
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-[var(--surface)] rounded-xl p-4 hover:bg-[var(--primary-dark)] hover:text-white transition-colors group">
                <Sun className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)] group-hover:text-white/60">Full cost breakdown</p>
              </Link>
              <Link href="/best-time-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:bg-[var(--primary-dark)] hover:text-white transition-colors group">
                <Sun className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Time to Climb</p>
                <p className="text-xs text-[var(--text-muted)] group-hover:text-white/60">Month-by-month guide</p>
              </Link>
              <Link href="/kilimanjaro-climbing-gear/" className="bg-[var(--surface)] rounded-xl p-4 hover:bg-[var(--primary-dark)] hover:text-white transition-colors group">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Gear & Packing List</p>
                <p className="text-xs text-[var(--text-muted)] group-hover:text-white/60">What to bring</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Choose Your Route?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Browse all route packages with detailed day-by-day itineraries, pricing tiers, and upcoming group departures. Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View All Route Packages
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Join a Group Departure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
