import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Thermometer,
  CloudRain,
  Sun,
  Wind,
  Snowflake,
  ArrowRight,
  Layers,
  Shirt,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Weather: Month-by-Month Forecast",
  description:
    "Kilimanjaro weather by month: temperatures from 25°C at the gate to -20°C at the summit. Rainfall data, best months to climb, and what to pack for each season.",
  url: "/kilimanjaro-weather/",
});

const monthlyWeather = [
  {
    month: "January",
    tempBase: "20-25°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Low",
    crowds: "Medium",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Clear skies, cold summit nights",
  },
  {
    month: "February",
    tempBase: "20-25°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Low",
    crowds: "Medium",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Driest month, excellent visibility",
  },
  {
    month: "March",
    tempBase: "18-23°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Increasing",
    crowds: "Low",
    recommendation: "Good",
    recColor: "bg-amber-100 text-amber-700",
    note: "Rains begin late March",
  },
  {
    month: "April",
    tempBase: "16-20°C",
    tempSummit: "-5 to -10°C",
    rainfall: "Heavy",
    crowds: "Very Low",
    recommendation: "Avoid",
    recColor: "bg-red-100 text-red-700",
    note: "Long rains, trails muddy",
  },
  {
    month: "May",
    tempBase: "16-20°C",
    tempSummit: "-5 to -10°C",
    rainfall: "Heavy",
    crowds: "Very Low",
    recommendation: "Avoid",
    recColor: "bg-red-100 text-red-700",
    note: "Wettest month",
  },
  {
    month: "June",
    tempBase: "18-22°C",
    tempSummit: "-7 to -15°C",
    rainfall: "Low",
    crowds: "Medium",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Dry season begins",
  },
  {
    month: "July",
    tempBase: "18-22°C",
    tempSummit: "-7 to -20°C",
    rainfall: "Very Low",
    crowds: "High",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Peak season, coldest summit",
  },
  {
    month: "August",
    tempBase: "18-22°C",
    tempSummit: "-7 to -20°C",
    rainfall: "Very Low",
    crowds: "High",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Peak season",
  },
  {
    month: "September",
    tempBase: "20-24°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Low",
    crowds: "High",
    recommendation: "Best",
    recColor: "bg-emerald-100 text-emerald-700",
    note: "Excellent conditions",
  },
  {
    month: "October",
    tempBase: "20-25°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Increasing",
    crowds: "Medium",
    recommendation: "Good",
    recColor: "bg-amber-100 text-amber-700",
    note: "Short rains begin late Oct",
  },
  {
    month: "November",
    tempBase: "18-23°C",
    tempSummit: "-5 to -10°C",
    rainfall: "Moderate",
    crowds: "Low",
    recommendation: "Fair",
    recColor: "bg-orange-100 text-orange-700",
    note: "Short rains, fewer crowds",
  },
  {
    month: "December",
    tempBase: "18-23°C",
    tempSummit: "-5 to -15°C",
    rainfall: "Moderate",
    crowds: "Medium",
    recommendation: "Good",
    recColor: "bg-amber-100 text-amber-700",
    note: "Holiday season, rains easing",
  },
];

const climateZones = [
  {
    name: "Cultivation Zone",
    range: "800 - 1,800m",
    temp: "20-30°C",
    icon: Sun,
    color: "text-lime-400",
    borderColor: "border-lime-400/30",
    description:
      "The lowest slopes of Kilimanjaro are home to banana plantations, coffee farms, and small Chagga villages. The air is warm and humid, with temperatures averaging 25°C. Most climbers pass through this zone quickly on the drive to the trailhead, though the Marangu and Rongai routes begin within it. Expect lush green scenery, red earth roads, and the sounds of everyday Tanzanian life.",
  },
  {
    name: "Rainforest Zone",
    range: "1,800 - 2,800m",
    temp: "15-20°C",
    icon: CloudRain,
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    description:
      "Dense, humid montane forest that receives the most rainfall on the mountain — up to 2,000mm annually. Temperatures are mild but the canopy traps moisture, making it feel damp. This is where most rain gear gets its first test. You will hear colobus monkeys crashing through the branches and see moss-draped trees towering overhead. The trail is often muddy and rooted. In our 800+ expeditions, the rainforest day is where we remind climbers: this mountain has five worlds.",
  },
  {
    name: "Heath & Moorland",
    range: "2,800 - 4,000m",
    temp: "5-15°C",
    icon: Wind,
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
    description:
      "Above the tree line, the landscape opens into rolling moorland dotted with giant heather, lobelia, and groundsel — plants found nowhere else on Earth. Morning mist rolls through, and temperatures swing dramatically: warm in the sun, cold in the shade. Clouds often form below you by midday, creating the surreal experience of walking above a white sea. This is the critical acclimatization zone where altitude symptoms typically begin.",
  },
  {
    name: "Alpine Desert",
    range: "4,000 - 5,000m",
    temp: "0-10°C day / -10°C night",
    icon: Thermometer,
    color: "text-orange-400",
    borderColor: "border-orange-400/30",
    description:
      "A stark, barren moonscape with almost no vegetation. Daytime temperatures can reach 10°C in direct sun but plummet below freezing after dark. The air is thin and dry — your lips will crack, your throat will feel parched, and every step requires more effort. Rainfall is rare here; less than 200mm per year. The UV radiation is intense at this altitude, making high-SPF sunscreen and quality sunglasses essential even on overcast days.",
  },
  {
    name: "Arctic / Summit Zone",
    range: "5,000 - 5,895m",
    temp: "-15 to -25°C",
    icon: Snowflake,
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    description:
      "The roof of Africa. Glaciers, ice fields, and scree dominate this zone. Temperatures regularly drop to -20°C and below, with wind chill pushing the perceived temperature to -30°C or colder. Oxygen levels are roughly 50% of what you breathe at sea level. The famous glaciers of Kilimanjaro — Furtwangler, Rebmann, and the Southern Icefield — occupy this zone, though they are retreating rapidly. Summit night takes you through this zone in 6-8 hours of darkness.",
  },
];

const packingEssentials = [
  {
    category: "Base Layers",
    items: [
      "Moisture-wicking thermal tops (merino wool or synthetic)",
      "Thermal leggings for cold camps and summit night",
      "Quick-dry hiking shirts for lower zones",
    ],
  },
  {
    category: "Mid Layers",
    items: [
      "Fleece jacket (200-300 weight) for camps and cold mornings",
      "Softshell jacket for wind protection during the day",
      "Down or synthetic insulated jacket (rated to -20°C) for summit night",
    ],
  },
  {
    category: "Outer Shell",
    items: [
      "Waterproof, breathable rain jacket (Gore-Tex or equivalent)",
      "Waterproof rain trousers — essential for the rainforest zone",
      "Windproof shell for summit night wind protection",
    ],
  },
  {
    category: "Extremities",
    items: [
      "Warm gloves plus waterproof outer mitts for summit night",
      "Balaclava or neck gaiter for wind and cold protection",
      "Warm beanie hat and sun hat with brim",
      "Quality hiking socks (merino wool) — bring 4-5 pairs",
    ],
  },
];

const routeWeatherNotes = [
  {
    route: "Machame Route",
    approach: "Western",
    slug: "7-days-machame-route",
    weather:
      "The western approach catches more moisture from prevailing weather systems, making the rainforest section wetter than most routes. Days 1-2 see the heaviest rainfall. However, the Barranco Wall and subsequent traverse offer dramatic views when skies clear. From our base in Moshi, we advise Machame climbers during the dry season to expect at least one full rain day in the forest, even in July-August.",
    icon: CloudRain,
  },
  {
    route: "Rongai Route",
    approach: "Northern",
    slug: "6-days-rongai-route",
    weather:
      "The driest approach to Kilimanjaro. Starting from the Kenyan border on the north side, Rongai sits in the rain shadow of the mountain and receives significantly less precipitation. This makes it the best choice during the shoulder seasons (March, November) when other routes are wetter. The trade-off: less dramatic scenery in the lower zones and a more gradual, less varied landscape.",
    icon: Sun,
  },
  {
    route: "Lemosho Route",
    approach: "Western",
    slug: "8-days-lemosho-route",
    weather:
      "Starts with two days through pristine rainforest on the western Shira Plateau approach. The western start means more rain in the forest, but the 8-day itinerary provides excellent acclimatization that more than compensates. By day 3-4, you are above the cloud line in the heath and moorland, where conditions are typically dry and clear. Our most recommended route overall — the extra days give your body time to adjust and increase your summit success rate to 93%.",
    icon: Layers,
    recommended: true,
  },
];

const faqs = [
  {
    question: "What is the temperature at the top of Kilimanjaro?",
    answer:
      "At Uhuru Peak (5,895m), temperatures typically range from -15°C to -25°C. Wind chill can make it feel like -30°C or colder, especially during summit night when you are exposed on the crater rim. In our 800+ expeditions, we have recorded temperatures as low as -29°C at the summit in July. The key to surviving these temperatures is proper layering — a base layer, insulated mid layer, and windproof outer shell are essential. Most climbers are surprised by how cold it gets, given that Kilimanjaro sits just 3 degrees south of the equator.",
  },
  {
    question: "Does it rain on Kilimanjaro?",
    answer:
      "Yes, and often heavily. Kilimanjaro receives significant rainfall, particularly in the rainforest zone (1,800-2,800m) which can see up to 2,000mm per year. The mountain has two rainy seasons: the long rains (March-May) and the short rains (November). However, rain is almost entirely confined to the lower zones. Above 4,000m, precipitation falls as snow or ice, and the alpine desert receives less than 200mm annually. A quality waterproof jacket and rain trousers are non-negotiable items on your packing list.",
  },
  {
    question: "What is the best month to climb Kilimanjaro?",
    answer:
      "The best months are January, February, and June through September. February is statistically the driest month with excellent visibility. July and August offer the most reliable dry conditions but are also the busiest and coldest at the summit. For a balance of good weather, fewer crowds, and lower prices, we recommend January-February or September. These months offer clear skies and manageable temperatures without the peak-season congestion of July-August.",
  },
  {
    question: "Can you climb Kilimanjaro in the rainy season?",
    answer:
      "You can, but we advise against climbing in April and May when the long rains are at their heaviest. Trails become extremely muddy, visibility is poor, and the experience is significantly diminished. However, the shoulder months — March, November, and December — are viable options with some rain but also some clear windows. The Rongai Route from the north is the best choice during wetter months, as it sits in the rain shadow and receives less precipitation than western and southern approaches.",
  },
  {
    question: "How cold is Kilimanjaro summit night?",
    answer:
      "Summit night is the coldest part of any Kilimanjaro climb. You depart camp around midnight and trek for 6-8 hours through temperatures ranging from -15°C to -25°C. Wind chill on the exposed crater rim can push the perceived temperature to -30°C. The combination of extreme cold, thin air, fatigue, and darkness makes summit night the most challenging part of the climb. Your down jacket, balaclava, insulated gloves, and hand warmers are all essential for this push. Most climbers warm up significantly after sunrise as they traverse the crater to Uhuru Peak.",
  },
  {
    question: "Does it snow on Kilimanjaro?",
    answer:
      "Yes. Snowfall occurs regularly above 5,000m, especially during and after the rainy seasons. The summit glaciers — Furtwangler, Rebmann, and the Southern Icefield — are remnants of much larger ice formations that have been retreating since the early 1900s. Fresh snow can dust the summit cone at any time of year, creating stunning photographic conditions. However, heavy snowfall can make the summit approach more difficult, particularly on the steep scree sections. The glaciers are expected to disappear entirely by 2040-2050, making Kilimanjaro's snowy summit an increasingly rare sight.",
  },
  {
    question: "What should I wear on Kilimanjaro?",
    answer:
      "Kilimanjaro demands a layering system that covers a 50°C temperature range — from 25°C at the gate to -25°C at the summit. You need moisture-wicking base layers, insulating mid layers (fleece and down jacket), and a waterproof, windproof outer shell. For your extremities: warm gloves plus waterproof mitts, a balaclava, thermal socks, and a warm hat. Quality hiking boots that have been broken in are essential. We provide a detailed gear list to every climber after booking.",
  },
  {
    question: "Is Kilimanjaro warmer than Everest?",
    answer:
      "Significantly warmer. Kilimanjaro's summit at 5,895m reaches -15 to -25°C, while Everest's summit at 8,849m can plunge below -40°C with wind chill reaching -60°C. More importantly, Kilimanjaro's equatorial location means stronger solar radiation during the day, which warms you considerably when the sun is out. At lower camps on Kilimanjaro, temperatures are genuinely comfortable. Everest Base Camp (5,364m) is often colder than Kilimanjaro's summit because of its latitude and weather systems.",
  },
  {
    question: "What are the climate zones on Kilimanjaro?",
    answer:
      "Kilimanjaro has five distinct climate zones, each with its own weather, temperature range, and ecosystem. From bottom to top: Cultivation Zone (800-1,800m, 20-30°C, tropical farmland), Rainforest Zone (1,800-2,800m, 15-20°C, dense humid forest), Heath and Moorland (2,800-4,000m, 5-15°C, open moorland with giant heather), Alpine Desert (4,000-5,000m, 0-10°C day and -10°C night, barren and dry), and Arctic Summit Zone (5,000-5,895m, -15 to -25°C, glaciers and ice). This extraordinary range of ecosystems is what makes Kilimanjaro unique among the world's great mountains.",
  },
  {
    question: "Can weather cancel a Kilimanjaro climb?",
    answer:
      "Extreme weather events are rare on Kilimanjaro, and complete cancellations almost never happen. The mountain is climbable year-round. However, unusually heavy snow at the summit, severe storms, or dangerous trail conditions can occasionally delay a summit attempt by a few hours. Our guides monitor weather patterns closely and may adjust departure times on summit night to find the best weather window. In our 15+ years of guiding, we have never had to cancel a full expedition due to weather — though we have delayed summit attempts and adjusted itineraries when conditions demanded it.",
  },
  {
    question: "Is the weather predictable on Kilimanjaro?",
    answer:
      "Kilimanjaro's weather follows broad seasonal patterns that are reasonably predictable — the dry and rainy seasons are well established. However, day-to-day weather on the mountain itself can change rapidly. You might start a morning in brilliant sunshine and be in thick cloud by noon. Afternoon showers in the rainforest zone are common even during the dry season. Above 4,000m, the weather tends to be more stable and predictable: cold, dry, and clear. From our base in Moshi, we track forecasts daily and brief our climbers on expected conditions before departure.",
  },
];

const relatedGuides = [
  {
    href: "/climbing-kilimanjaro/",
    icon: Mountain,
    title: "Climbing Kilimanjaro",
    subtitle: "Complete guide",
  },
  {
    href: "/best-time-to-climb-kilimanjaro/",
    icon: Calendar,
    title: "Best Time to Climb",
    subtitle: "Season guide",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: Shirt,
    title: "Gear & Packing List",
    subtitle: "What to bring",
  },
  {
    href: "/kilimanjaro-altitude-sickness/",
    icon: AlertTriangle,
    title: "Altitude Sickness",
    subtitle: "Prevention & treatment",
  },
  {
    href: "/best-route-to-climb-kilimanjaro/",
    icon: MapPin,
    title: "Best Route Guide",
    subtitle: "Compare all routes",
  },
  {
    href: "/kilimanjaro-training-plan/",
    icon: TrendingUp,
    title: "Training Plan",
    subtitle: "12-week preparation",
  },
  {
    href: "/kilimanjaro-success-rates/",
    icon: CheckCircle,
    title: "Success Rates",
    subtitle: "Route-by-route data",
  },
];

export default function KilimanjaroWeatherPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Weather Guide" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Weather Guide", url: "/kilimanjaro-weather/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Weather: Month-by-Month Forecast",
            description:
              "Kilimanjaro weather by month: temperatures from 25°C at the gate to -20°C at the summit. Rainfall data, best months to climb, and what to pack for each season.",
            url: "/kilimanjaro-weather/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-06-18",
            modifiedTime: "2026-06-18",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Trekkers on Kilimanjaro with dramatic weather conditions across the mountain zones"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
              Weather &amp; Climate Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Weather</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Month-by-month temperatures, rainfall data, and climate zone breakdowns from guides with 800+ summits and 15 years on the mountain.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Kilimanjaro can be climbed year-round, but the <strong>best weather windows are January-March</strong> (dry, cold) and <strong>June-October</strong> (dry, warm). Temperatures range from <strong>25&deg;C at the gate to -20&deg;C at the summit</strong>. You will pass through <strong>5 climate zones</strong> &mdash; from tropical rainforest to arctic summit &mdash; experiencing a 50&deg;C temperature swing in just 5 days of trekking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Kilimanjaro Weather */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Understanding Kilimanjaro&apos;s Weather
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro sits just 3 degrees south of the equator in northern Tanzania, yet its summit is permanently below freezing. This extraordinary range &mdash; from equatorial heat to arctic cold &mdash; is what makes Kilimanjaro&apos;s weather unique among the world&apos;s great mountains. Unlike the Himalayas or Andes, where weather systems can shut down an entire mountain for weeks, Kilimanjaro&apos;s equatorial position means it does not experience the prolonged storms or jet-stream disruptions that plague higher-latitude peaks.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Instead, Kilimanjaro&apos;s weather is governed by two primary factors: <strong>altitude</strong> and <strong>seasonality</strong>. As you climb, the temperature drops by approximately 6.5&deg;C for every 1,000 metres of elevation gained. This means you lose roughly 33&deg;C between the gate (1,800m) and the summit (5,895m). Seasonality determines rainfall: Tanzania has two rainy seasons &mdash; the <strong>long rains</strong> (masika) from March to May, and the <strong>short rains</strong> (vuli) in November.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              In our 800+ expeditions over 15 years, we have observed that altitude &mdash; not the calendar &mdash; is the primary weather variable. A climber on any given day will experience tropical warmth, temperate mist, alpine chill, and arctic cold within a single trek. The month you choose determines how much rain you encounter in the lower zones, but the cold at the summit is a constant year-round reality.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Key insight:</strong> Kilimanjaro creates its own weather. The mountain forces warm, moist air upward, causing it to cool and release moisture as rain in the forest zone. By the time air reaches the alpine desert above 4,000m, it is dry. This is why the upper mountain is almost always clear, even when clouds smother the lower slopes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Month-by-Month Weather Table */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Month-by-Month Weather Forecast
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Temperature, rainfall, and crowd data for every month of the year, based on 15 years of observations from our guide team.
            </p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Month</th>
                  <th className="text-left px-4 py-3 font-semibold">Gate Temp</th>
                  <th className="text-left px-4 py-3 font-semibold">Summit Temp</th>
                  <th className="text-left px-4 py-3 font-semibold">Rainfall</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Crowds</th>
                  <th className="text-left px-4 py-3 font-semibold">Rating</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {monthlyWeather.map((m, i) => (
                  <tr
                    key={m.month}
                    className={`border-t border-[var(--border)] ${
                      m.recommendation === "Best"
                        ? "bg-emerald-50/50"
                        : i % 2 === 0
                        ? "bg-white"
                        : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{m.month}</td>
                    <td className="px-4 py-3">{m.tempBase}</td>
                    <td className="px-4 py-3">{m.tempSummit}</td>
                    <td className="px-4 py-3">{m.rainfall}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{m.crowds}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${m.recColor}`}>
                        {m.recommendation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden lg:table-cell">
                      {m.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link
              href="/best-time-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              Read our detailed best time to climb guide &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Climate Zones */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                5 Climate Zones on Kilimanjaro
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Kilimanjaro is often called &ldquo;a trek from the equator to the Arctic.&rdquo; Each climate zone has its own distinct weather, temperature range, and ecosystem. Understanding what lies ahead helps you pack and prepare for every condition.
              </p>
            </div>
            <div className="space-y-4">
              {climateZones.map((zone) => (
                <div
                  key={zone.name}
                  className={`bg-white/5 rounded-xl p-6 border ${zone.borderColor}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <zone.icon className={`w-6 h-6 ${zone.color}`} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-heading font-bold text-lg">{zone.name}</h3>
                        <span className="text-xs text-white/50">{zone.range}</span>
                      </div>
                      <p className={`text-sm font-semibold ${zone.color} mb-2`}>{zone.temp}</p>
                      <p className="text-sm text-white/70 leading-relaxed">{zone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summit Night Weather */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Snowflake className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  What to Expect on Summit Night
                </h2>
                <p className="text-[var(--text-muted)] text-sm">The coldest hours of your climb</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Summit night is the defining weather experience on Kilimanjaro. You depart camp between 11 PM and midnight, stepping into darkness and biting cold. The temperature at Barafu Camp (4,673m) or Kibo Hut (4,720m) at departure is typically <strong>-10 to -15&deg;C</strong>. As you ascend through the night, temperatures drop further, reaching <strong>-15 to -25&deg;C</strong> at the crater rim (5,685m) and Uhuru Peak (5,895m).
            </p>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Wind is the hidden variable. Even a moderate 20 km/h breeze at -20&deg;C creates a wind chill of approximately -30&deg;C. On the exposed sections of the crater rim, between Stella Point and Uhuru Peak, there is no shelter from the wind. In our experience, this 45-minute traverse is the coldest part of any Kilimanjaro expedition.
            </p>

            <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] mb-6">
              <h3 className="font-heading font-bold text-lg mb-4">Summit Night Layering Strategy</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Base Layer</p>
                    <p className="text-sm text-[var(--text-muted)]">Thermal top and bottoms (merino wool preferred). Moisture management is critical &mdash; sweat that freezes will make you colder.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">Insulation Layer</p>
                    <p className="text-sm text-[var(--text-muted)]">Heavy fleece plus down jacket (rated to -20&deg;C minimum). This is your primary warmth source. Do not start with the down jacket on &mdash; you will overheat on the steep sections and then freeze when you stop.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Shell Layer</p>
                    <p className="text-sm text-[var(--text-muted)]">Windproof and waterproof outer jacket. Wind protection is more important than insulation at the summit. A Gore-Tex shell blocks the wind that strips heat from your body.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-semibold">Extremities</p>
                    <p className="text-sm text-[var(--text-muted)]">Balaclava, thick gloves with waterproof mitts over the top, two pairs of thermal socks, and chemical hand warmers in your gloves. Your fingers and toes lose heat fastest.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>From our guides:</strong> The most common mistake on summit night is starting with too many layers. You will generate significant body heat on the steep switchbacks to Stella Point. Start with your base layer and fleece, keeping the down jacket in the top of your pack. Add the down jacket when you stop for a break or when you reach the crater rim. Starting too warm leads to sweating, which leads to dangerous chilling when you stop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packing for Kilimanjaro Weather */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Packing for Kilimanjaro Weather
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Your clothing system must handle a 50&deg;C temperature range &mdash; from 25&deg;C at the gate to -25&deg;C at the summit. Layering is the only strategy that works.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {packingEssentials.map((category) => (
              <div
                key={category.category}
                className="bg-white rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shirt className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link
              href="/kilimanjaro-climbing-gear/"
              className="text-[var(--primary)] hover:underline"
            >
              See our complete Kilimanjaro gear and packing list &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Best Time to Climb */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Best Time to Climb Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro has two primary dry seasons that offer the best climbing conditions. The choice between them comes down to your priorities: weather, crowds, and budget.
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-heading font-bold text-lg">Dry Season 1: January &ndash; March</h3>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Cold and dry. February is statistically the driest month on Kilimanjaro with the clearest skies and best visibility. Summit temperatures are cold but manageable (-5 to -15&deg;C). Crowds are moderate &mdash; fewer climbers than the July-August peak but enough to feel the trail is alive. This is an excellent window for photography, with clean air and dramatic ice formations on the glaciers. The rains begin arriving in late March, so early March is better than late March.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-heading font-bold text-lg">Dry Season 2: June &ndash; October</h3>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  The classic Kilimanjaro climbing season. June marks the start of the long dry season, with very low rainfall through September. July and August are the <Link href="/kilimanjaro-statistics/" className="text-[var(--primary)] hover:underline">busiest months</Link> on the mountain and also the coldest at the summit (-7 to -20&deg;C). September and early October offer a sweet spot: dry conditions, slightly warmer summit temperatures, and thinning crowds. This is the window most of our guided groups target.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Budget Tip
                </h4>
                <p className="text-sm text-[var(--text-muted)]">
                  November offers <strong>fewer crowds and lower prices</strong>. The short rains bring some afternoon showers in the lower zones, but above 4,000m the weather is often fine. If you choose the <Link href="/trekking/6-days-rongai-route/" className="text-[var(--primary)] hover:underline">Rongai Route</Link> from the drier north side, November can be an excellent value option.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Book Early
                </h4>
                <p className="text-sm text-[var(--text-muted)]">
                  July and August <Link href="/kilimanjaro-join-group-departures/" className="text-[var(--primary)] hover:underline">group departures</Link> fill months in advance. If you plan to climb during peak season, book at least 3-4 months ahead to secure your preferred dates and route. Our <Link href="/trekking/8-days-lemosho-route/" className="text-[var(--primary)] hover:underline">Lemosho 8-day</Link> departures fill fastest.
                </p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              For a deeper analysis of every month with pricing data, crowd levels, and route recommendations, see our <Link href="/best-time-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">complete best time to climb Kilimanjaro guide</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* How Weather Affects Different Routes */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How Weather Affects Different Routes
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Not all routes experience Kilimanjaro&apos;s weather equally. The direction of approach and altitude profile determine how much rain, wind, and cold you encounter.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {routeWeatherNotes.map((route) => (
              <div
                key={route.route}
                className={`bg-white rounded-xl border ${
                  route.recommended ? "border-emerald-300 ring-1 ring-emerald-200" : "border-[var(--border)]"
                } p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${
                    route.recommended ? "bg-emerald-100" : "bg-blue-100"
                  } rounded-xl flex items-center justify-center shrink-0`}>
                    <route.icon className={`w-6 h-6 ${
                      route.recommended ? "text-emerald-600" : "text-blue-600"
                    }`} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-lg">{route.route}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--surface)] text-[var(--text-muted)] font-semibold">
                        {route.approach} Approach
                      </span>
                      {route.recommended && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-2">
                      {route.weather}
                    </p>
                    <Link
                      href={`/trekking/${route.slug}/`}
                      className="text-sm text-[var(--primary)] hover:underline"
                    >
                      View {route.route} itinerary &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link
              href="/best-route-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              Compare all Kilimanjaro routes side by side &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Kilimanjaro Glaciers & Climate Change */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Kilimanjaro&apos;s Glaciers &amp; Climate Change
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              When Hans Meyer made the first recorded ascent of Kilimanjaro in 1889, the summit was covered by an estimated 12 square kilometres of ice. Today, less than 1.5 square kilometres remain. The glaciers &mdash; Furtwangler, Rebmann, Decken, and the Southern Icefield &mdash; have lost over 85% of their mass, and scientists project they will disappear entirely between 2040 and 2050.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              For climbers, this means two things. First, the iconic ice walls and glacier formations that appear in classic Kilimanjaro photographs are shrinking every year. Climbing Kilimanjaro now, while glaciers still frame the summit, offers a view that future generations will never see. Second, the retreat of glaciers is changing local weather patterns. Less ice means less moisture recycling at the summit, contributing to drier conditions in the alpine desert zone.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              From our base in Moshi, where the mountain dominates the skyline, the change is visible decade over decade. The snow cap that once persisted year-round now comes and goes with the seasons. Our guides who have climbed for 15+ years describe summit ice formations that no longer exist. If seeing Kilimanjaro&apos;s glaciers is part of your motivation for climbing, the best time is now.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-[var(--border)] group">
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

      {/* Related Guides */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{guide.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-weather/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With 800+ successful summits, certified guides who know every weather pattern on the mountain, and a 93% summit success rate on our recommended routes &mdash; your Kilimanjaro adventure starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Browse Kilimanjaro Routes
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
