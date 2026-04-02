import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Globe,
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  Calendar,
  ArrowRight,
  BarChart3,
  Heart,
  Thermometer,
  Map,
  Clock,
  TreePine,
  Award,
  Activity,
  BookOpen,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Statistics & Facts 2026",
  description:
    "Comprehensive Kilimanjaro statistics: 35,000+ annual climbers, 65% average success rate, 5,895m summit height, 7 routes, and 50+ verified facts. Updated data from KINAPA and local operators.",
  url: "/kilimanjaro-statistics/",
});

const keyStats = [
  {
    label: "Summit Height",
    value: "5,895m",
    subtext: "19,341 ft",
    icon: Mountain,
    color: "bg-blue-100 text-blue-700",
    iconColor: "text-blue-600",
  },
  {
    label: "Annual Climbers",
    value: "~35,000",
    subtext: "Per year",
    icon: Users,
    color: "bg-emerald-100 text-emerald-700",
    iconColor: "text-emerald-600",
  },
  {
    label: "Overall Success Rate",
    value: "65%",
    subtext: "Industry average",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-600",
  },
  {
    label: "Number of Routes",
    value: "7",
    subtext: "Official routes",
    icon: Map,
    color: "bg-purple-100 text-purple-700",
    iconColor: "text-purple-600",
  },
  {
    label: "Youngest Summiter",
    value: "6 yrs",
    subtext: "Years old",
    icon: Heart,
    color: "bg-pink-100 text-pink-700",
    iconColor: "text-pink-600",
  },
  {
    label: "Oldest Summiter",
    value: "89 yrs",
    subtext: "Years old",
    icon: Award,
    color: "bg-orange-100 text-orange-700",
    iconColor: "text-orange-600",
  },
  {
    label: "Deaths Per Year",
    value: "~10",
    subtext: "0.03% fatality rate",
    icon: Shield,
    color: "bg-red-100 text-red-700",
    iconColor: "text-red-600",
  },
  {
    label: "Days to Summit",
    value: "5-9",
    subtext: "Depending on route",
    icon: Calendar,
    color: "bg-teal-100 text-teal-700",
    iconColor: "text-teal-600",
  },
];

const routeSuccessData = [
  {
    route: "Marangu",
    nickname: "Coca-Cola Route",
    shortDays: 5,
    shortRate: "27%",
    longDays: 6,
    longRate: "44%",
    slug: "5-days-marangu-route",
  },
  {
    route: "Machame",
    nickname: "Whiskey Route",
    shortDays: 6,
    shortRate: "44%",
    longDays: 7,
    longRate: "73%",
    slug: "7-days-machame-route",
  },
  {
    route: "Lemosho",
    nickname: "Most Scenic",
    shortDays: 7,
    shortRate: "78%",
    longDays: 8,
    longRate: "90%",
    slug: "8-days-lemosho-route",
    recommended: true,
  },
  {
    route: "Rongai",
    nickname: "North Approach",
    shortDays: 6,
    shortRate: "65%",
    longDays: 7,
    longRate: "80%",
    slug: "6-days-rongai-route",
  },
  {
    route: "Northern Circuit",
    nickname: "Longest Route",
    shortDays: 9,
    shortRate: "95%",
    longDays: null,
    longRate: null,
    slug: null,
  },
  {
    route: "Umbwe",
    nickname: "Steepest Route",
    shortDays: 6,
    shortRate: "50%",
    longDays: null,
    longRate: null,
    slug: null,
  },
];

const climateZones = [
  {
    name: "Cultivation Zone",
    range: "800 - 1,800m",
    rainfall: "~1,000mm/year",
    temp: "20-30°C",
    description:
      "The lowest slopes of Kilimanjaro are intensively farmed. Banana, coffee, and maize plantations dominate the landscape. This zone acts as a buffer between the surrounding savanna and the mountain forest. Most trekkers pass through it quickly on the drive to the gate, though the Marangu and Rongai routes give glimpses of local agriculture.",
    color: "bg-lime-100 text-lime-800",
    borderColor: "border-lime-300",
  },
  {
    name: "Rainforest Zone",
    range: "1,800 - 2,800m",
    rainfall: "~2,300mm/year",
    temp: "12-20°C",
    description:
      "Dense montane cloud forest with towering trees, mosses, ferns, and epiphytes. This is the wettest zone on the mountain and home to the greatest biodiversity: blue monkeys, colobus monkeys, bush pigs, duikers, and over 170 bird species. The canopy traps moisture from clouds, creating a perpetually damp environment with muddy trails.",
    color: "bg-emerald-100 text-emerald-800",
    borderColor: "border-emerald-300",
  },
  {
    name: "Heath & Moorland",
    range: "2,800 - 4,000m",
    rainfall: "~1,000mm/year",
    temp: "5-15°C",
    description:
      "The forest thins into heather, giant lobelias, and tussock grass. Visibility opens dramatically with panoramic views across the Tanzanian plains. Temperatures begin to drop sharply at night. This is where most climbers first feel the altitude and where the iconic giant groundsels (Dendrosenecio kilimanjari) appear, growing up to 6 metres tall.",
    color: "bg-amber-100 text-amber-800",
    borderColor: "border-amber-300",
  },
  {
    name: "Alpine Desert",
    range: "4,000 - 5,000m",
    rainfall: "<250mm/year",
    temp: "-5 to 10°C",
    description:
      "A barren, rocky landscape resembling a lunar surface. Almost no vegetation survives here. Extreme temperature swings — scorching sun during the day and sub-zero freezing at night. UV radiation is intense. The air is dry and thin, containing roughly 60% of the oxygen found at sea level. Most high camps (Barafu, Kibo Hut, School Hut) sit in this zone.",
    color: "bg-orange-100 text-orange-800",
    borderColor: "border-orange-300",
  },
  {
    name: "Arctic / Summit Zone",
    range: "5,000 - 5,895m",
    rainfall: "<100mm/year",
    temp: "-15 to -5°C",
    description:
      "Permanent ice and glaciers — though shrinking rapidly. Oxygen levels are roughly 50% of sea level. Wind chill can drive temperatures below -25°C on summit night. No plant or animal life exists at this altitude. The summit zone includes three volcanic cones: Kibo (the highest, dormant), Mawenzi (5,149m, eroded), and Shira (3,962m, collapsed).",
    color: "bg-sky-100 text-sky-800",
    borderColor: "border-sky-300",
  },
];

const ageDistribution = [
  { range: "Under 25", percentage: 8, color: "bg-blue-500" },
  { range: "25-34", percentage: 35, color: "bg-emerald-500" },
  { range: "35-44", percentage: 25, color: "bg-amber-500" },
  { range: "45-54", percentage: 20, color: "bg-orange-500" },
  { range: "55+", percentage: 12, color: "bg-red-500" },
];

const topNationalities = [
  { country: "United States", share: "~25%" },
  { country: "United Kingdom", share: "~15%" },
  { country: "Germany", share: "~10%" },
  { country: "Australia", share: "~8%" },
  { country: "Canada", share: "~7%" },
  { country: "France", share: "~5%" },
  { country: "Netherlands", share: "~4%" },
  { country: "Other", share: "~26%" },
];

const costBreakdown = [
  {
    tier: "Budget",
    range: "$1,850 - $2,200",
    includes:
      "Basic camping, larger group sizes, shorter routes (5-6 days), less experienced guides",
    color: "bg-amber-50 border-amber-200",
    labelColor: "bg-amber-100 text-amber-700",
  },
  {
    tier: "Mid-Range",
    range: "$2,500 - $3,500",
    includes:
      "Quality camping gear, experienced guides, 7-8 day routes, smaller groups, better food",
    color: "bg-emerald-50 border-emerald-200",
    labelColor: "bg-emerald-100 text-emerald-700",
    recommended: true,
  },
  {
    tier: "Premium",
    range: "$3,500 - $5,000+",
    includes:
      "Private climbs, top-tier equipment, gourmet meals, private toilet tent, best guides, 8-9 days",
    color: "bg-blue-50 border-blue-200",
    labelColor: "bg-blue-100 text-blue-700",
  },
];

const historicalTimeline = [
  {
    year: "1889",
    event: "First Recorded Summit",
    detail:
      "German geographer Hans Meyer and Austrian mountaineer Ludwig Purtscheller became the first Europeans confirmed to reach Uhuru Peak on October 6, 1889. Their third attempt succeeded after two prior failures in 1887 and earlier in 1889. Local guide Yohani Kinyala Lauwo, then approximately 18 years old, was instrumental in guiding them to the top.",
  },
  {
    year: "1912",
    event: "First Glacial Survey",
    detail:
      "The first systematic survey of Kilimanjaro's glaciers was conducted, documenting approximately 12.1 square kilometres of ice cover. This survey serves as the baseline for all subsequent glacial loss measurements. At that time, the summit was covered in an almost continuous ice cap.",
  },
  {
    year: "1927",
    event: "First Ascent via Marangu Route",
    detail:
      "The Marangu route was established as the first standard trekking path up the mountain, making Kilimanjaro accessible to non-technical climbers for the first time. Huts were gradually built along this route, giving it the only permanent shelter structures on the mountain.",
  },
  {
    year: "1932",
    event: "First Woman to Summit",
    detail:
      "Sheila G. MacDonald became the first woman confirmed to have reached the summit of Kilimanjaro, an achievement that would not be widely repeated for decades. Today, women make up approximately 40% of all Kilimanjaro climbers.",
  },
  {
    year: "1973",
    event: "Kilimanjaro National Park Established",
    detail:
      "Tanzania formally established Kilimanjaro National Park, bringing the mountain under national protection. The park initially covered 756 square kilometres above the treeline. This designation brought regulated climbing, fee structures, and conservation measures that persist today.",
  },
  {
    year: "1987",
    event: "UNESCO World Heritage Site",
    detail:
      "Kilimanjaro National Park was inscribed as a UNESCO World Heritage Site, recognising its outstanding natural value. The designation highlighted the mountain's unique ecological zones, its significance as Africa's highest point, and the iconic glaciers that were already beginning to show signs of retreat.",
  },
  {
    year: "1991",
    event: "Forest Belt Added to Park",
    detail:
      "The park boundary was extended downslope to include the montane forest belt, expanding total park area to approximately 1,688 square kilometres. This critical addition protected the biodiversity-rich rainforest zone and the watersheds that serve millions of people in surrounding regions.",
  },
  {
    year: "2000",
    event: "Northern Circuit Route Opened",
    detail:
      "The Northern Circuit became the newest and longest route on Kilimanjaro, circumnavigating the northern slopes before summiting from the east. At 9 days, it offers the best acclimatization profile (95% success rate) and the quietest trails on the mountain, as it sees fewer than 5% of total climbers.",
  },
  {
    year: "2014",
    event: "Fastest Ascent Record Set",
    detail:
      "Swiss-Ecuadorian trail runner Karl Egloff set the current speed record on August 13, 2014, ascending from Umbwe Gate (1,640m) to Uhuru Peak (5,895m) in just 4 hours and 56 minutes and descending in 1 hour and 46 minutes, for a total round-trip time of 6 hours and 42 minutes. The previous record, held by Kilian Jornet since 2010, was 5 hours and 23 minutes for the ascent alone.",
  },
  {
    year: "2019",
    event: "Record Annual Climber Numbers",
    detail:
      "An estimated 50,000+ trekkers attempted Kilimanjaro, making it the busiest year on record before the COVID-19 pandemic temporarily halted tourism. Visitor numbers have since recovered, with approximately 35,000-40,000 climbers annually as of 2025.",
  },
];

const faqs = [
  {
    question: "How many people climb Kilimanjaro each year?",
    answer:
      "Approximately 35,000 to 40,000 people attempt to climb Kilimanjaro each year, based on data from the Kilimanjaro National Park Authority (KINAPA). Pre-pandemic peak numbers reached an estimated 50,000+ in 2019. Each climber is supported by an average of 3-4 support staff (guides, porters, cooks), meaning 100,000 to 150,000 people are on the mountain annually in total. The peak months are January-March and June-October, with July-August being the busiest.",
  },
  {
    question: "What is the success rate on Kilimanjaro?",
    answer:
      "The overall success rate across all routes and durations is approximately 65%. However, this figure is heavily skewed by budget operators running 5-day climbs with poor acclimatization. Success rates vary dramatically by route and duration: 5-day Marangu has just a 27% success rate, while 8-day Lemosho achieves 90% and 9-day Northern Circuit hits 95%. At Snow Africa, our success rate across all routes is 93%, achieved through longer itineraries, experienced guides, and proper acclimatization protocols.",
  },
  {
    question: "How many people die on Kilimanjaro each year?",
    answer:
      "Approximately 10 people die on Kilimanjaro each year, representing a fatality rate of roughly 0.03%. This makes Kilimanjaro significantly safer than technical peaks like Everest (1-2% fatality rate) or K2 (~4%). Most deaths are attributed to altitude sickness (HACE or HAPE) that was not recognized or treated early enough, cardiac events in climbers with undiagnosed conditions, or hypothermia. Climbing with a licensed operator whose guides carry pulse oximeters, supplemental oxygen, and are trained in wilderness first response dramatically reduces risk.",
  },
  {
    question: "How tall is Kilimanjaro in feet and metres?",
    answer:
      "Kilimanjaro's highest point, Uhuru Peak on the Kibo volcanic cone, stands at 5,895 metres (19,341 feet) above sea level. This makes it Africa's tallest mountain, the world's tallest free-standing mountain (not part of a mountain range), and the highest volcano outside South America. The vertical gain from the typical trailhead to the summit is approximately 4,100 metres, and the total base-to-summit elevation gain is 4,900 metres.",
  },
  {
    question: "What is the best month to climb Kilimanjaro?",
    answer:
      "The two peak climbing seasons are January to mid-March and June to October. July and August offer the driest conditions and clearest skies but are also the busiest months. January and February provide excellent weather with slightly fewer crowds. The shoulder months of June and October offer a balance of good weather and quieter trails. April, May, and November are the wet seasons with higher rainfall, muddier trails, and reduced visibility, though some operators offer discounted rates during these months.",
  },
  {
    question: "How much does it cost to climb Kilimanjaro?",
    answer:
      "The total cost of climbing Kilimanjaro ranges from approximately $1,850 to $5,000+ depending on route length, operator quality, and group size. KINAPA park fees alone account for $70 per day per person (ages 16+), meaning park fees for a 7-day climb are $490. Additional costs include operator fees, guide and porter wages, camping fees ($50/night), rescue fees ($20), VAT (18%), gear rental, tips (budget $200-350 total for the crew), and international flights. The mid-range sweet spot of $2,500-$3,500 provides experienced guides, quality food, and proper safety equipment on a 7-8 day route.",
  },
  {
    question: "Are Kilimanjaro's glaciers really disappearing?",
    answer:
      "Yes. Kilimanjaro has lost approximately 85% of its glacial ice since the first survey in 1912. The ice fields covered roughly 12.1 square kilometres in 1912 and had shrunk to approximately 1.76 square kilometres by 2022. Scientists estimate the glaciers are losing approximately 1% of their remaining volume each year. Multiple peer-reviewed studies project that Kilimanjaro's glaciers could disappear entirely between 2030 and 2040. While the exact timeline is debated, the trend is unmistakable and has accelerated in recent decades. If seeing the glaciers is important to you, earlier is better.",
  },
  {
    question: "Do I need supplemental oxygen on Kilimanjaro?",
    answer:
      "No. Unlike Everest and other 8,000m peaks, Kilimanjaro is climbed without supplemental oxygen. The standard approach relies entirely on natural acclimatization — ascending slowly over multiple days to allow your body to adapt to decreasing oxygen levels. However, reputable operators carry emergency bottled oxygen on every climb for use in HACE or HAPE emergencies, providing critical support during an emergency descent. This emergency oxygen is administered by the guide and is not available for general use during the trek.",
  },
  {
    question: "How fit do I need to be to climb Kilimanjaro?",
    answer:
      "Kilimanjaro does not require technical climbing skills or extreme fitness. You should be able to hike 6-8 hours per day for consecutive days carrying a light daypack (3-5kg). A solid base of cardiovascular fitness — regular hiking, jogging, cycling, or swimming for at least 12 weeks before your climb — is recommended. However, physical fitness does not prevent altitude sickness. Ultra-fit marathon runners experience AMS at the same rates as moderately fit hikers. Your route choice and acclimatization strategy matter far more than your VO2 max.",
  },
  {
    question: "What is the fastest anyone has climbed Kilimanjaro?",
    answer:
      "The current speed record is held by Swiss-Ecuadorian runner Karl Egloff, who completed the round trip from Umbwe Gate to Uhuru Peak and back in 6 hours and 42 minutes on August 13, 2014. His ascent time was 4 hours and 56 minutes and his descent took 1 hour and 46 minutes. For context, most trekkers take 5-9 days to complete the same journey. Speed records on Kilimanjaro are verified by KINAPA and require continuous GPS tracking.",
  },
];

export default function KilimanjaroStatisticsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Statistics" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            {
              name: "Kilimanjaro Statistics",
              url: "/kilimanjaro-statistics/",
            },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Statistics & Facts 2026",
            description:
              "Comprehensive Kilimanjaro statistics: 35,000+ annual climbers, 65% average success rate, 5,895m summit height, 7 routes, and 50+ verified facts.",
            url: "/kilimanjaro-statistics/",
            image:
              "https://cdn.snowafricaadventure.com/kilimanjaro-aerial-view.webp",
            publishedTime: "2026-03-11",
            modifiedTime: "2026-03-11",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.snowafricaadventure.com/kilimanjaro-aerial-view.webp"
            alt="Aerial view of Mount Kilimanjaro showing glaciers, volcanic cone, and surrounding landscape"
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
              The Definitive Kilimanjaro Data Resource
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro{" "}
              <span className="text-[var(--secondary)]">
                Statistics &amp; Facts
              </span>{" "}
              2026
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              50+ verified statistics from KINAPA park records, peer-reviewed
              research, and 15 years of operational data from our guides on the
              mountain. The most comprehensive Kilimanjaro data page on the
              internet.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Kilimanjaro at a Glance
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Mount Kilimanjaro stands at{" "}
                <strong>5,895 metres (19,341 feet)</strong> — Africa&apos;s
                tallest peak and the world&apos;s tallest free-standing
                mountain. Approximately{" "}
                <strong>35,000 people attempt it annually</strong> with an
                overall success rate of <strong>65%</strong>, though rates on
                longer routes reach <strong>90-95%</strong>. The mountain has{" "}
                <strong>7 official trekking routes</strong>, 5 distinct climate
                zones, and glaciers that have{" "}
                <strong>lost 85% of their ice since 1912</strong>. It requires
                no technical climbing skills and has been summited by climbers
                aged 6 to 89.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Key Kilimanjaro Statistics
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The essential numbers every prospective climber, travel writer, and
              researcher should know.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-muted)] mb-1">
                  {stat.subtext}
                </div>
                <div className="text-sm font-semibold text-[var(--text)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic & Physical Stats */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Geographic &amp; Physical Statistics
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Location, dimensions, and physical characteristics
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Location &amp; Coordinates
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between">
                    <span>Coordinates</span>
                    <span className="font-semibold text-[var(--text)]">
                      3.0674°S, 37.3556°E
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Region</span>
                    <span className="font-semibold text-[var(--text)]">
                      Kilimanjaro, Tanzania
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Distance from Equator</span>
                    <span className="font-semibold text-[var(--text)]">
                      330km south
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Nearest city</span>
                    <span className="font-semibold text-[var(--text)]">
                      Moshi (30km)
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Nearest airport</span>
                    <span className="font-semibold text-[var(--text)]">
                      JRO (Kilimanjaro Intl)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Physical Dimensions
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between">
                    <span>Summit elevation</span>
                    <span className="font-semibold text-[var(--text)]">
                      5,895m / 19,341ft
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Base-to-summit gain</span>
                    <span className="font-semibold text-[var(--text)]">
                      4,900m vertical
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Crater diameter</span>
                    <span className="font-semibold text-[var(--text)]">
                      2.4km
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Base diameter</span>
                    <span className="font-semibold text-[var(--text)]">
                      ~60km
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mountain type</span>
                    <span className="font-semibold text-[var(--text)]">
                      Stratovolcano (dormant)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Volcanic Cones
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between">
                    <span>Kibo (highest)</span>
                    <span className="font-semibold text-[var(--text)]">
                      5,895m — dormant
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mawenzi</span>
                    <span className="font-semibold text-[var(--text)]">
                      5,149m — eroded
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Shira</span>
                    <span className="font-semibold text-[var(--text)]">
                      3,962m — collapsed
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Last eruption</span>
                    <span className="font-semibold text-[var(--text)]">
                      ~360,000 years ago
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fumaroles present</span>
                    <span className="font-semibold text-[var(--text)]">
                      Yes (Kibo crater)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Glacial Statistics
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between">
                    <span>Ice cover (1912)</span>
                    <span className="font-semibold text-[var(--text)]">
                      12.1 km²
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ice cover (2022)</span>
                    <span className="font-semibold text-[var(--text)]">
                      ~1.76 km²
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ice lost since 1912</span>
                    <span className="font-semibold text-red-600">~85%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Annual ice loss rate</span>
                    <span className="font-semibold text-[var(--text)]">
                      ~1% per year
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Projected ice-free</span>
                    <span className="font-semibold text-red-600">
                      2030-2040
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-semibold mb-4 text-lg">
                Park &amp; Conservation
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-[var(--text-muted)]">
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    National Park area
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    1,688 km²
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    Park established
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    1973
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    UNESCO designation
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    1987
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    Climate zones
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    5 distinct zones
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    Annual rainfall (forest)
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    2,300mm
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)]">
                    Water sources
                  </span>
                  <span className="font-semibold text-[var(--text)]">
                    5+ along most routes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Zones */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                5 Climate Zones of Kilimanjaro
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Kilimanjaro is often called &ldquo;a trek from the equator to
                the Arctic&rdquo; because climbers pass through five distinct
                ecological zones — each with dramatically different weather,
                vegetation, and conditions.
              </p>
            </div>
            <div className="space-y-4">
              {climateZones.map((zone) => (
                <div
                  key={zone.name}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-heading font-bold text-lg">
                      {zone.name}
                    </h3>
                    <span className="text-sm text-[var(--secondary)] font-semibold">
                      {zone.range}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-white/50 mb-3">
                    <span>Rainfall: {zone.rainfall}</span>
                    <span>Temperature: {zone.temp}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Rate by Route */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Success Rate by Route &amp; Duration
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Route choice and number of days are the two biggest factors
              determining summit success. The data below is compiled from KINAPA
              records and aggregated operator reports.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Nickname
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Shorter Option
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Longer Option
                  </th>
                </tr>
              </thead>
              <tbody>
                {routeSuccessData.map((route, i) => (
                  <tr
                    key={route.route}
                    className={`border-t border-[var(--border)] ${
                      route.recommended
                        ? "bg-emerald-50"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {route.slug ? (
                        <Link
                          href={`/trekking/${route.slug}/`}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {route.route}
                        </Link>
                      ) : (
                        route.route
                      )}
                      {route.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">
                      {route.nickname}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold">{route.shortRate}</span>
                      <span className="text-xs text-[var(--text-muted)] ml-1">
                        ({route.shortDays} days)
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {route.longRate ? (
                        <>
                          <span className="font-bold text-emerald-700">
                            {route.longRate}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] ml-1">
                            ({route.longDays} days)
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)]">
                          N/A
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[var(--primary)] bg-[var(--primary-dark)] text-white">
                  <td className="px-4 py-3 font-bold" colSpan={2}>
                    Snow Africa Average (all routes)
                  </td>
                  <td
                    className="px-4 py-3 text-center font-bold text-[var(--secondary)] text-lg"
                    colSpan={2}
                  >
                    93%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link
              href="/best-route-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              See our full route comparison guide &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Climber Demographics */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Climber Demographics
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Who climbs Kilimanjaro? Age, gender, nationality, and group
                  data
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Age Distribution */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Age Distribution
                </h3>
                <div className="space-y-3">
                  {ageDistribution.map((age) => (
                    <div key={age.range}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[var(--text-muted)]">
                          {age.range}
                        </span>
                        <span className="font-bold">{age.percentage}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface)] rounded-full h-3">
                        <div
                          className={`${age.color} h-3 rounded-full`}
                          style={{ width: `${age.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-4">
                  The 25-34 age group is the largest segment, though Kilimanjaro
                  attracts a remarkably broad age range. The youngest confirmed
                  summiter was 6 years old and the oldest was 89.
                </p>
              </div>

              {/* Gender & Group Stats */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <h3 className="font-semibold mb-4 text-lg">
                    Gender Breakdown
                  </h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[var(--text-muted)]">Male</span>
                        <span className="font-bold">~60%</span>
                      </div>
                      <div className="w-full bg-[var(--surface)] rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full w-[60%]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[var(--text-muted)]">
                          Female
                        </span>
                        <span className="font-bold">~40%</span>
                      </div>
                      <div className="w-full bg-[var(--surface)] rounded-full h-3">
                        <div className="bg-pink-500 h-3 rounded-full w-[40%]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    The gender gap has narrowed significantly over the past
                    decade. In the early 2000s, fewer than 25% of climbers were
                    women. Today, the split is approaching parity on many
                    departures.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <h3 className="font-semibold mb-4 text-lg">
                    Group Composition
                  </h3>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    <li className="flex justify-between">
                      <span>Solo travelers joining groups</span>
                      <span className="font-semibold text-[var(--text)]">
                        ~30%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Pre-formed groups</span>
                      <span className="font-semibold text-[var(--text)]">
                        ~70%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>First-time high-altitude climbers</span>
                      <span className="font-semibold text-[var(--text)]">
                        ~80%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Average group size</span>
                      <span className="font-semibold text-[var(--text)]">
                        4-8 climbers
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Top Nationalities */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] md:col-span-2">
                <h3 className="font-semibold mb-4 text-lg">
                  Top Nationalities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {topNationalities.map((nat) => (
                    <div
                      key={nat.country}
                      className="bg-[var(--surface)] rounded-lg p-3 text-center"
                    >
                      <div className="font-bold text-lg text-[var(--primary)]">
                        {nat.share}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {nat.country}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-4">
                  The United States contributes the largest single nationality
                  group, followed by the United Kingdom and Germany. Together,
                  English-speaking countries account for over 55% of all
                  climbers. A growing number of climbers from East Asia
                  (particularly China, South Korea, and Japan) have emerged in
                  recent years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Cost Statistics
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  What does it actually cost to climb Kilimanjaro in 2026?
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {costBreakdown.map((tier) => (
                <div
                  key={tier.tier}
                  className={`rounded-xl p-6 border-2 ${tier.color} relative`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-4">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${tier.labelColor}`}
                  >
                    {tier.tier}
                  </span>
                  <div className="text-2xl font-bold mt-3 mb-2">
                    {tier.range}
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    {tier.includes}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-semibold mb-4 text-lg">
                Fee Breakdown &amp; Tipping
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    KINAPA Park Fees (2026)
                  </h4>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    <li className="flex justify-between">
                      <span>Conservation fee (16+ years)</span>
                      <span className="font-semibold text-[var(--text)]">
                        $70/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Conservation fee (5-15 years)</span>
                      <span className="font-semibold text-[var(--text)]">
                        $20/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Camping fee</span>
                      <span className="font-semibold text-[var(--text)]">
                        $50/night
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Rescue fee</span>
                      <span className="font-semibold text-[var(--text)]">
                        $20 (one-time)
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>VAT</span>
                      <span className="font-semibold text-[var(--text)]">
                        18%
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    Recommended Tipping Guide
                  </h4>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    <li className="flex justify-between">
                      <span>Lead guide</span>
                      <span className="font-semibold text-[var(--text)]">
                        $20-25/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Assistant guide</span>
                      <span className="font-semibold text-[var(--text)]">
                        $15-20/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cook</span>
                      <span className="font-semibold text-[var(--text)]">
                        $10-15/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Porter</span>
                      <span className="font-semibold text-[var(--text)]">
                        $8-10/day
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total tips (7-day, 2 pax)</span>
                      <span className="font-semibold text-[var(--text)]">
                        $200-350
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              <Link
                href="/kilimanjaro-prices/"
                className="text-[var(--primary)] hover:underline"
              >
                See our detailed Kilimanjaro pricing breakdown &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Health & Safety Statistics */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <Activity className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Health &amp; Safety Statistics
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Altitude sickness rates, fatalities, evacuation data, and risk
                  factors
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Altitude Sickness
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between">
                    <span>Mild AMS symptoms</span>
                    <span className="font-semibold text-amber-600">
                      ~75% of climbers
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Severe AMS requiring descent</span>
                    <span className="font-semibold text-orange-600">
                      5-10%
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>HACE or HAPE cases</span>
                    <span className="font-semibold text-red-600">
                      &lt;1-2%
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Deaths per year</span>
                    <span className="font-semibold text-red-600">
                      ~10 (0.03%)
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Evacuation rate</span>
                    <span className="font-semibold text-[var(--text)]">
                      1-2%
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--text-muted)] mt-4">
                  The most common reason for failing to summit is altitude
                  sickness — not physical fitness. An extra acclimatization day
                  increases success rates by 10-15%.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-semibold mb-4 text-lg">
                  Comparative Fatality Rates
                </h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  <li className="flex justify-between items-center">
                    <span>Kilimanjaro (5,895m)</span>
                    <span className="font-semibold text-emerald-600">
                      0.03%
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Mont Blanc (4,809m)</span>
                    <span className="font-semibold text-amber-600">0.15%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Denali (6,190m)</span>
                    <span className="font-semibold text-amber-600">0.3%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Everest (8,849m)</span>
                    <span className="font-semibold text-orange-600">
                      1-2%
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>K2 (8,611m)</span>
                    <span className="font-semibold text-red-600">~4%</span>
                  </li>
                </ul>
                <p className="text-xs text-[var(--text-muted)] mt-4">
                  Kilimanjaro is statistically one of the safest high-altitude
                  mountains in the world, owing largely to its non-technical
                  nature and established infrastructure.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[var(--border)] md:col-span-2">
                <h3 className="font-semibold mb-4 text-lg">
                  Risk Reduction Factors
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">
                      +15%
                    </div>
                    <p className="text-sm text-emerald-800">
                      Success rate increase from adding 1 extra acclimatization
                      day
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">
                      93%
                    </div>
                    <p className="text-sm text-emerald-800">
                      Our success rate with 7+ day routes and twice-daily health
                      monitoring
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">
                      3-4L
                    </div>
                    <p className="text-sm text-emerald-800">
                      Daily water intake recommended to aid acclimatization and
                      reduce AMS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              <Link
                href="/kilimanjaro-altitude-sickness/"
                className="text-[var(--primary)] hover:underline"
              >
                Read our complete altitude sickness prevention guide &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Statistics */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Environmental Statistics
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Kilimanjaro&apos;s ecosystem is under pressure from climate
                change, increasing visitor numbers, and deforestation on the
                lower slopes. These are the numbers that define the
                environmental challenge.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Thermometer className="w-8 h-8 text-red-400 mb-3" />
                <div className="text-2xl font-bold text-red-400 mb-1">
                  85%
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  Glacial Ice Lost Since 1912
                </h3>
                <p className="text-xs text-white/60">
                  From 12.1 km² in 1912 to approximately 1.76 km² in 2022.
                  Scientists project the remaining glaciers will disappear
                  entirely between 2030 and 2040.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-amber-400 mb-3" />
                <div className="text-2xl font-bold text-amber-400 mb-1">
                  ~1%
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  Annual Glacier Volume Loss
                </h3>
                <p className="text-xs text-white/60">
                  The rate of glacial retreat has accelerated in recent decades.
                  Between 2000 and 2022, the ice shrank faster than at any point
                  in the previous century.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Shield className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  20kg
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  KPAP Porter Weight Limit
                </h3>
                <p className="text-xs text-white/60">
                  The Kilimanjaro Porters Assistance Project (KPAP) enforces a
                  20kg maximum carry weight per porter. Ethical operators weigh
                  bags at the gate.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <TreePine className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  2,300mm
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  Annual Rainfall (Forest Zone)
                </h3>
                <p className="text-xs text-white/60">
                  The montane forest belt receives the highest rainfall on the
                  mountain, sustaining a biodiversity hotspot with over 170 bird
                  species and multiple primate species.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  3-4x
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  Support Staff Ratio
                </h3>
                <p className="text-xs text-white/60">
                  Each climber is supported by 3-4 mountain crew members
                  (guides, porters, cooks). A group of 8 climbers may have 25-30
                  support staff, highlighting the mountain&apos;s economic
                  importance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <BarChart3 className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  $50M+
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  Estimated Annual Revenue
                </h3>
                <p className="text-xs text-white/60">
                  Kilimanjaro generates over $50 million annually in park fees,
                  operator revenue, and related tourism spending, making it one
                  of Tanzania&apos;s most valuable tourism assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Historical Timeline
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Key milestones in Kilimanjaro&apos;s climbing and conservation
                  history
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />

              <div className="space-y-6">
                {historicalTimeline.map((event) => (
                  <div key={event.year} className="relative flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold">
                      {event.year}
                    </div>
                    <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)] flex-1">
                      <h3 className="font-semibold mb-2">{event.event}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {event.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                <details
                  key={i}
                  className="bg-white rounded-xl border border-[var(--border)] group"
                >
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

      {/* Sources & Methodology */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl font-bold mb-6">
              Sources &amp; Methodology
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              The statistics on this page are compiled from the following
              sources. Where exact figures are unavailable (KINAPA does not
              publish all data publicly), we use aggregated estimates from
              multiple licensed operators, including our own 15 years of
              operational records.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    KINAPA (Kilimanjaro National Park Authority)
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Park fee structures, visitor numbers, climbing regulations,
                    and official route designations. KINAPA is the governing body
                    for all activities within Kilimanjaro National Park.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    KPAP (Kilimanjaro Porters Assistance Project)
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Porter welfare data, weight regulations, fair wage
                    guidelines, and partner operator compliance records.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Peer-Reviewed Research
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Glacial data from Thompson et al. (Ohio State University),
                    altitude medicine studies from the Wilderness Medical
                    Society, WHO altitude sickness prevalence data, and Hackett &
                    Roach altitude illness research published in the New England
                    Journal of Medicine.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Operator Data (Aggregated)
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Success rates, demographic breakdowns, cost ranges, and
                    tipping norms are derived from our own operational data
                    (1,500+ guided climbers) cross-referenced with published
                    data from TATO (Tanzania Association of Tour Operators)
                    member companies.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-lg p-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    UNESCO &amp; IUCN Reports
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    World Heritage Site documentation, conservation status
                    assessments, and ecosystem monitoring reports for Kilimanjaro
                    National Park.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-6 italic">
              Last updated: March 2026. Statistics are reviewed and updated
              annually. If you are a journalist or researcher and require
              specific data citations, please{" "}
              <Link
                href="/contact/"
                className="text-[var(--primary)] hover:underline"
              >
                contact us
              </Link>{" "}
              and we will provide source references.
            </p>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link
                href="/climbing-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Complete guide
                </p>
              </Link>
              <Link
                href="/best-route-to-climb-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Map className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Compare all routes
                </p>
              </Link>
              <Link
                href="/kilimanjaro-altitude-sickness/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Prevention &amp; treatment
                </p>
              </Link>
              <Link
                href="/kilimanjaro-prices/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <DollarSign className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Full cost breakdown
                </p>
              </Link>
              <Link
                href="/best-time-to-climb-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Clock className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Time to Climb</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Month-by-month guide
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Become a Kilimanjaro Statistic?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Join the 35,000 climbers who attempt Kilimanjaro every year — with a
            93% success rate, experienced guides, and 7-9 day routes designed
            for proper acclimatization. Choose your route and make the numbers
            work in your favour.
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
