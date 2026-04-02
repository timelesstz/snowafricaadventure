import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  Shield,
  Users,
  Heart,
  Brain,
  Target,
  CheckCircle2,
  ArrowRight,
  Droplets,
  Activity,
  Award,
  Footprints,
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
  title: "Kilimanjaro Success Rates by Route",
  description:
    "Honest Kilimanjaro success rates by route and duration. Overall average: 65%. Best routes: Lemosho 8-day (90%), Northern Circuit (95%). Snow Africa's verified rate: 93%. Data from KINAPA and operator records.",
  url: "/kilimanjaro-success-rates/",
});

const routeSuccessRates = [
  {
    route: "Marangu",
    nickname: "Coca-Cola Route",
    durations: [
      { days: 5, rate: 27, color: "bg-red-500" },
      { days: 6, rate: 44, color: "bg-orange-500" },
    ],
    slug: "5-days-marangu-route",
    notes:
      "The only route with hut accommodation. Its reputation as the 'easy route' attracts underprepared climbers, dragging the average down. The 5-day version has the worst success rate of any route on Kilimanjaro.",
  },
  {
    route: "Machame",
    nickname: "Whiskey Route",
    durations: [
      { days: 6, rate: 44, color: "bg-orange-500" },
      { days: 7, rate: 73, color: "bg-amber-500" },
    ],
    slug: "7-days-machame-route",
    notes:
      "The most popular route on Kilimanjaro. The 7-day version includes a crucial acclimatization day at Lava Tower (4,630m) before descending to Barranco Camp — a textbook climb-high-sleep-low profile that dramatically improves success.",
  },
  {
    route: "Lemosho",
    nickname: "Best Overall",
    durations: [
      { days: 7, rate: 78, color: "bg-amber-500" },
      { days: 8, rate: 90, color: "bg-emerald-500" },
    ],
    slug: "8-days-lemosho-route",
    recommended: true,
    notes:
      "Our most recommended route. The 8-day Lemosho offers an excellent acclimatization profile with gradual altitude gain through the Shira Plateau, a Lava Tower acclimatization day, and an extra rest day before the summit push.",
  },
  {
    route: "Rongai",
    nickname: "North Approach",
    durations: [
      { days: 6, rate: 65, color: "bg-yellow-500" },
      { days: 7, rate: 80, color: "bg-lime-500" },
    ],
    slug: "6-days-rongai-route",
    notes:
      "The only route approaching from the north, near the Kenyan border. Drier conditions and a steady, gradual ascent make it a solid choice for the rainy season. Less scenic than western routes but more consistent weather.",
  },
  {
    route: "Northern Circuit",
    nickname: "Longest Route",
    durations: [{ days: 9, rate: 95, color: "bg-emerald-600" }],
    notes:
      "The longest route on Kilimanjaro and the one with the highest success rate. Nine days of gradual ascent, circumnavigating the mountain, gives your body the maximum possible time to acclimatize. The trade-off is cost — more days means higher park fees.",
  },
  {
    route: "Umbwe",
    nickname: "Steepest Route",
    durations: [
      { days: 5, rate: 50, color: "bg-orange-500" },
      { days: 6, rate: 60, color: "bg-yellow-500" },
    ],
    notes:
      "The steepest and most direct route to the summit. Rapid altitude gain leaves little room for acclimatization. Only recommended for experienced high-altitude trekkers who know how their body responds to altitude. We rarely recommend this route.",
  },
];

const successFactors = [
  {
    icon: Clock,
    title: "Route Choice and Duration",
    importance: "Most Important",
    importanceColor: "bg-emerald-100 text-emerald-700",
    description:
      "This is the single biggest factor. Choosing a 7+ day route instead of a 5-day route can nearly triple your success rate — from 27% to 78% or higher. Every extra day on the mountain gives your body approximately 10-15% better odds of reaching the summit. The difference between a 5-day Marangu climb and an 8-day Lemosho climb is not just comfort — it is the difference between a coin flip and near-certainty. Budget operators push shorter routes because they are cheaper, but the savings come at the cost of your summit chances.",
  },
  {
    icon: Footprints,
    title: "Physical Preparation",
    importance: "Very Important",
    importanceColor: "bg-amber-100 text-amber-700",
    description:
      "Kilimanjaro is not technically difficult, but it is physically demanding. You will trek 6-8 hours per day for a week, carrying a daypack, over uneven terrain, at altitude. A 12-week training programme focusing on cardiovascular endurance, leg strength, and back-to-back long hikes is essential. Fit climbers handle the physical demands more comfortably, which means their bodies can focus energy on acclimatization rather than physical recovery. The fitter you are, the more reserves you have for summit night — a gruelling 12-16 hour push starting at midnight.",
  },
  {
    icon: Brain,
    title: "Acclimatization Profile",
    importance: "Important — Partially Genetic",
    importanceColor: "bg-blue-100 text-blue-700",
    description:
      "How efficiently your body produces red blood cells and adjusts breathing patterns in response to lower oxygen is partly determined by genetics. Some people acclimatize quickly and feel strong at 5,000m. Others struggle at 4,000m despite identical preparation. You cannot change your genetics, but you can give your body the best possible chance by choosing a route with a strong climb-high-sleep-low profile. If you have no high-altitude experience, assume you are an average acclimatizer and choose a longer route.",
  },
  {
    icon: Users,
    title: "Guide Quality and Experience",
    importance: "Very Important",
    importanceColor: "bg-amber-100 text-amber-700",
    description:
      "An experienced guide does not just show you the trail — they manage your acclimatization, monitor your health twice daily with pulse oximetry, recognise early signs of Acute Mountain Sickness before you notice them, set the correct pace (pole pole), and make the critical call on whether you continue or descend. Budget operators often use junior, unlicensed guides with minimal altitude medicine training. The difference between a guide with 20 summits and one with 200+ summits can be the difference between a safe summit and a dangerous situation.",
  },
  {
    icon: Heart,
    title: "Mental Preparation",
    importance: "Important",
    importanceColor: "bg-purple-100 text-purple-700",
    description:
      "Summit night is where most climbers fail — and it is as much a mental challenge as a physical one. You start at midnight, climb for 6-8 hours in freezing darkness, and every step above 5,500m feels like walking through treacle. Many physically capable climbers turn around simply because they lose the mental battle. Knowing what to expect, having a personal 'why' that keeps you moving, and trusting your guide's judgement are all critical. Climbers who have researched what summit night feels like are significantly less likely to panic and quit.",
  },
];

const maximizeTips = [
  {
    icon: Mountain,
    title: "Choose a 7+ Day Route",
    description:
      "This is non-negotiable if you want serious summit odds. The data is unambiguous: 7-day routes have success rates above 73%, 8-day routes above 90%. If budget allows, choose the 8-day Lemosho (90%) or 9-day Northern Circuit (95%). If cost is a concern, the 7-day Machame (73%) offers the best value-to-success ratio.",
    link: "/best-route-to-climb-kilimanjaro/",
    linkText: "Compare all routes and success rates",
  },
  {
    icon: Activity,
    title: "Train for 12 Weeks Minimum",
    description:
      "Start three months before your climb date. Focus on cardiovascular fitness (running, cycling, swimming), leg strength (squats, lunges, step-ups), and back-to-back long hikes with a weighted pack. By week 10, you should be comfortably hiking 15-20km with 1,000m+ elevation gain. The goal is not to arrive as an athlete — it is to arrive with enough physical reserves that your body can focus on acclimatizing rather than surviving the daily trek.",
    link: "/kilimanjaro-training-plan/",
    linkText: "Follow our 12-week training plan",
  },
  {
    icon: Droplets,
    title: "Hydrate Aggressively — 3 to 4 Litres Per Day",
    description:
      "Dehydration worsens every altitude sickness symptom and impairs acclimatization. At altitude, you lose moisture rapidly through increased respiration and dry air. Do not wait until you are thirsty — by then, you are already dehydrated. Drink steadily throughout each trekking day and add electrolyte tablets to replace lost salts. Your urine should remain clear to pale yellow at all times.",
  },
  {
    icon: Shield,
    title: "Consider Diamox (Discuss With Your Doctor)",
    description:
      "Acetazolamide (Diamox) genuinely aids acclimatization by stimulating faster, deeper breathing. Many altitude medicine specialists recommend it prophylactically, especially for first-time high-altitude trekkers. The standard dose is 125-250mg twice daily, starting 24-48 hours before ascending above 2,500m. It is a prescription medication — consult your doctor before travel and test it at home first to check for side effects.",
    link: "/kilimanjaro-altitude-sickness/",
    linkText: "Read our complete Diamox guide",
  },
  {
    icon: Users,
    title: "Listen to Your Guide — They Have Seen It All",
    description:
      "Your guide has managed altitude sickness on hundreds of expeditions. When they say 'pole pole' (slowly, slowly), they mean it. When they tell you to drink more water, drink. When they express concern about your SpO2 readings, take it seriously. The most dangerous climber is the one who hides symptoms to avoid slowing the group. Report every headache, every wave of nausea, every moment of dizziness. Early intervention prevents most altitude emergencies.",
  },
  {
    icon: Footprints,
    title: "Do Not Rush — Pole Pole Is Not a Suggestion",
    description:
      "Walk at a pace where you can comfortably hold a conversation. If you are breathing hard, you are going too fast. Above 3,000m, your net altitude gain should not exceed 300-500m per day. The cheapest route is the shortest route, and the shortest route has the worst success rate. There is a direct, measurable relationship between time spent acclimatizing and summit success. Rushing is the single most preventable cause of failure on Kilimanjaro.",
  },
];

const snowAfricaAdvantages = [
  {
    icon: Users,
    stat: "1:2",
    label: "Guide-to-Climber Ratio",
    description:
      "One certified guide for every two climbers — far above the industry norm of 1:4 or 1:6. This means personalised health monitoring, pace management, and immediate response if any climber shows signs of altitude illness.",
  },
  {
    icon: Activity,
    stat: "2x Daily",
    label: "Health Monitoring",
    description:
      "Pulse oximetry and Lake Louise AMS scoring at every camp arrival and before dinner. We track trends over the entire trek, not just spot-checking. A sudden drop in SpO2 or rising AMS score triggers our escalation protocol before symptoms become serious.",
  },
  {
    icon: Shield,
    stat: "On Every Climb",
    label: "Emergency Equipment",
    description:
      "Every expedition carries a pulse oximeter, supplemental oxygen cylinders, and a portable Gamow bag (hyperbaric chamber). Many budget operators carry none of these. We also carry a comprehensive first aid kit and our lead guides hold Wilderness First Responder certification.",
  },
  {
    icon: Clock,
    stat: "7+ Days",
    label: "Recommended Minimum",
    description:
      "We recommend a minimum of 7 days on the mountain to all climbers and actively steer first-time climbers toward 8-day routes. We would rather lose a booking than send an underprepared climber on a route that gives them poor odds. Our 93% rate exists because we refuse to cut corners on acclimatization.",
  },
];

const faqs = [
  {
    question: "What is the overall success rate for climbing Kilimanjaro?",
    answer:
      "The overall success rate across all routes and all operators is approximately 65%. This figure includes every climber — from those on poorly-acclimatized 5-day budget treks to well-prepared climbers on 8-9 day routes with experienced operators. The 65% average is heavily dragged down by the high failure rate on short-duration routes (5-6 days), which still account for a significant proportion of total climbers. Well-prepared climbers on 7+ day routes with reputable operators typically see success rates of 85-95%.",
  },
  {
    question: "Which Kilimanjaro route has the highest success rate?",
    answer:
      "The 9-day Northern Circuit has the highest success rate at approximately 95%. It is the longest route on Kilimanjaro, circumnavigating the mountain and providing the maximum possible acclimatization time. The 8-day Lemosho Route is a close second at approximately 90%, and is our most recommended route because it offers an excellent balance of success rate, scenic variety, and value. Both routes include strong climb-high-sleep-low profiles.",
  },
  {
    question: "Why do some operators claim 98-99% success rates?",
    answer:
      "There is no independent body that audits or verifies operator success rate claims. KINAPA (Kilimanjaro National Park Authority) does not publish operator-specific data. Some operators inflate their numbers by excluding climbers who 'chose' to turn back (rather than being forced to), counting Stella Point (5,756m) as a successful summit instead of Uhuru Peak (5,895m), or simply using unverifiable round numbers. Honest, experienced operators report success rates between 85% and 95%. Any claim above 97% should be viewed with scepticism.",
  },
  {
    question: "Does physical fitness affect success rate?",
    answer:
      "Physical fitness affects your comfort and stamina on the mountain but does not directly prevent altitude sickness. Ultra-fit marathon runners get AMS just as often as moderately fit hikers — susceptibility is primarily genetic. However, being physically fit means your body has more reserves for the demanding summit night push (12-16 hours of trekking), and you recover faster between trekking days, leaving more energy for acclimatization. We recommend 12 weeks of training focusing on cardiovascular endurance and long hikes with elevation gain.",
  },
  {
    question: "How does Snow Africa calculate its 93% success rate?",
    answer:
      "Our 93% success rate is calculated as (number of climbers who reached Uhuru Peak / total number of climbers who attempted the summit) x 100, using our booking and expedition records. We count only Uhuru Peak (5,895m) — not Stella Point or Gilman's Point. Climbers who turned back for any reason — including illness, personal choice, or guide decision — are counted as unsuccessful. We do not exclude any attempts. This is the honest, verifiable number from our operational records.",
  },
  {
    question: "What is the success rate for 5-day vs 7-day climbs?",
    answer:
      "The difference is dramatic. A 5-day Marangu Route climb has a success rate of approximately 27% — barely one in four climbers reach the summit. A 7-day Machame Route climb has a success rate of approximately 73% — nearly three in four climbers summit. That extra two days of acclimatization nearly triples your odds. For an 8-day Lemosho Route, the rate jumps to 90%. Every extra day on the mountain provides approximately 10-15% better odds of success.",
  },
  {
    question: "Can I increase my success rate by hiring a private guide?",
    answer:
      "A private guide does not directly increase your success rate, but the conditions that come with a private climb — personalised pace setting, more attentive health monitoring, flexible schedule adjustments, and the ability to add an extra acclimatization day if needed — can significantly improve your odds. Private climbs also eliminate the pressure to keep pace with a group, which is a common cause of overexertion and subsequent altitude sickness.",
  },
  {
    question: "What time of year has the highest success rate?",
    answer:
      "Success rates tend to be slightly higher during the two peak climbing seasons — January to mid-March and June to October — when weather conditions are most stable. Clear weather means warmer summit nights (relatively speaking), better trail conditions, and less risk of storm-related turnarounds. That said, the difference is modest (perhaps 5-10%) because route choice and duration remain the dominant factors. We operate year-round and achieve strong success rates in all seasons.",
  },
  {
    question: "What happens if I fail to summit?",
    answer:
      "If you do not reach the summit, you still complete the descent and the trek itself remains a remarkable experience — most of Kilimanjaro's beauty is below the summit. From a practical standpoint, park fees are non-refundable, but many operators (Snow Africa included) will discuss options for a future attempt at a reduced rate. The most important thing is your safety — turning back is always the right call when your health is at risk. Many climbers who fail on a short route return for a longer route and summit successfully.",
  },
  {
    question: "Is Stella Point considered a successful summit?",
    answer:
      "Stella Point (5,756m) is on the crater rim and is often the point where exhausted climbers stop. Some operators count reaching Stella Point as a 'summit' to inflate their success rates. The true summit of Kilimanjaro is Uhuru Peak (5,895m), which is approximately 45 minutes to 1 hour further along the crater rim from Stella Point. At Snow Africa, we only count Uhuru Peak as a successful summit. If you reach Stella Point, your guide will encourage you to continue to Uhuru if your health allows — the additional 139m of elevation is the difference between 'almost' and 'summit'.",
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
    href: "/best-route-to-climb-kilimanjaro/",
    icon: Target,
    title: "Best Route Guide",
    subtitle: "Compare all 6 routes",
  },
  {
    href: "/kilimanjaro-altitude-sickness/",
    icon: AlertTriangle,
    title: "Altitude Sickness",
    subtitle: "Prevention & treatment",
  },
  {
    href: "/kilimanjaro-training-plan/",
    icon: Activity,
    title: "Training Plan",
    subtitle: "12-week programme",
  },
  {
    href: "/kilimanjaro-prices/",
    icon: BarChart3,
    title: "Kilimanjaro Prices",
    subtitle: "Cost breakdown",
  },
  {
    href: "/kilimanjaro-join-group-departures/",
    icon: Users,
    title: "Group Departures",
    subtitle: "Fixed-date climbs",
  },
];

export default function KilimanjaroSuccessRatesPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Success Rates" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            {
              name: "Success Rates",
              url: "/kilimanjaro-success-rates/",
            },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Success Rates: The Honest Numbers",
            description:
              "Honest Kilimanjaro success rates by route and duration. Overall average: 65%. Best routes: Lemosho 8-day (90%), Northern Circuit (95%). Snow Africa's verified rate: 93%.",
            url: "/kilimanjaro-success-rates/",
            image:
              "https://cdn.snowafricaadventure.com/kilimanjaro-summit-uhuru-peak.webp",
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
            src="https://cdn.snowafricaadventure.com/kilimanjaro-summit-uhuru-peak.webp"
            alt="Climbers celebrating at Uhuru Peak, the true summit of Kilimanjaro at 5,895m"
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
              Data-Backed Research
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro Success Rates:{" "}
              <span className="text-[var(--secondary)]">The Honest Numbers</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              No inflated claims. No marketing spin. Real success rate data by
              route and duration — sourced from KINAPA records, operator data,
              and our own verified expedition logs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">
                The Quick Answer
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                The overall Kilimanjaro success rate is approximately{" "}
                <strong>65%</strong>. This rate varies dramatically by route and
                duration — from <strong>27%</strong> (5-day Marangu) to{" "}
                <strong>95%</strong> (9-day Northern Circuit). An extra
                acclimatization day can increase your chances by{" "}
                <strong>10-15%</strong>. Well-prepared climbers on 7+ day routes
                with experienced operators achieve <strong>85-95%</strong> summit
                rates. Snow Africa&apos;s verified rate across all routes:{" "}
                <strong>93%</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Success Rate — Why 65%? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Overall Success Rate — Why 65%?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              You will find various success rate figures quoted online, ranging
              from 45% to 85%. The 65% figure is the most widely accepted
              estimate and represents the <strong>average across all routes,
              all operators, and all durations</strong>. Here is why it matters
              — and why it is simultaneously alarming and misleading.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              <strong>KINAPA (Kilimanjaro National Park Authority)</strong> does
              not publish official, up-to-date success rate data broken down by
              route or operator. The figures that circulate are derived from
              older KINAPA records, academic studies, and aggregated operator
              data. This lack of official, audited numbers is exactly what
              allows some operators to claim implausible 98-99% rates without
              consequence.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              The 65% average is heavily skewed by several factors that do not
              apply to well-prepared climbers who choose their route wisely:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Short-Duration Routes Drag the Average Down
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    A significant proportion of climbers still choose 5-6 day
                    routes, often because they are the cheapest option. These
                    routes have success rates of 27-44%. When thousands of
                    climbers fail on short routes every year, the overall
                    average drops dramatically. If you remove 5-day climbs from
                    the data, the overall success rate jumps above 75%.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Budget Operators With Inexperienced Guides
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Budget operators often employ junior guides with minimal
                    altitude medicine training. They may not carry pulse
                    oximeters, supplemental oxygen, or emergency equipment.
                    Without proper health monitoring, early signs of Acute
                    Mountain Sickness go unrecognised, and climbers who could
                    have been managed safely are instead evacuated or turn back.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Underprepared Climbers
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Kilimanjaro&apos;s reputation as a &quot;walk-up&quot;
                    mountain attracts many climbers who underestimate the
                    challenge. Some arrive with little training, no research on
                    acclimatization, and unrealistic expectations. These
                    climbers — especially on short routes — account for a
                    disproportionate share of failures.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    The Real Number for Prepared Climbers
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    If you choose a 7+ day route, train for 12 weeks, climb
                    with an experienced licensed operator, and follow
                    acclimatization best practices, your success rate is not
                    65%. It is <strong>85-95%</strong>. The overall average is a
                    statistical artefact that includes every shortcut and every
                    underprepared attempt. Your actual odds are determined by
                    the decisions you make.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Rate by Route — The Complete Data */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Success Rate by Route — The Complete Data
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every major route on Kilimanjaro, with success rates broken down
              by duration. The pattern is clear: more days equals dramatically
              higher success.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {routeSuccessRates.map((route) => (
              <div
                key={route.route}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                  route.recommended
                    ? "border-emerald-300 ring-2 ring-emerald-100"
                    : "border-[var(--border)]"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-xl">
                      {route.slug ? (
                        <Link
                          href={`/trekking/${route.slug}/`}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {route.route} Route
                        </Link>
                      ) : (
                        <>{route.route} Route</>
                      )}
                    </h3>
                    {route.recommended && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
                        Our Top Pick
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-5">
                    {route.nickname}
                  </p>

                  {/* Visual Rate Bars */}
                  <div className="space-y-3 mb-5">
                    {route.durations.map((d) => (
                      <div key={d.days} className="flex items-center gap-4">
                        <span className="text-sm font-semibold w-16 shrink-0">
                          {d.days} days
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                          <div
                            className={`${d.color} h-full rounded-full flex items-center transition-all duration-500`}
                            style={{ width: `${d.rate}%` }}
                          >
                            <span className="text-white text-sm font-bold pl-3 whitespace-nowrap">
                              {d.rate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {route.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Table (Mobile-Friendly) */}
          <div className="max-w-4xl mx-auto mt-12 overflow-x-auto">
            <h3 className="font-heading text-xl font-bold mb-4 text-center">
              At-a-Glance Summary
            </h3>
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Days
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Success Rate
                  </th>
                  <th className="text-center px-4 py-3 font-semibold hidden md:table-cell">
                    Verdict
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    route: "Marangu",
                    days: "5",
                    rate: "27%",
                    rateColor: "text-red-600",
                    verdict: "Not recommended",
                    verdictColor: "bg-red-100 text-red-700",
                  },
                  {
                    route: "Marangu",
                    days: "6",
                    rate: "44%",
                    rateColor: "text-orange-600",
                    verdict: "Below average",
                    verdictColor: "bg-orange-100 text-orange-700",
                  },
                  {
                    route: "Machame",
                    days: "6",
                    rate: "44%",
                    rateColor: "text-orange-600",
                    verdict: "Below average",
                    verdictColor: "bg-orange-100 text-orange-700",
                  },
                  {
                    route: "Machame",
                    days: "7",
                    rate: "73%",
                    rateColor: "text-amber-600",
                    verdict: "Good value",
                    verdictColor: "bg-amber-100 text-amber-700",
                  },
                  {
                    route: "Rongai",
                    days: "6",
                    rate: "65%",
                    rateColor: "text-yellow-600",
                    verdict: "Average",
                    verdictColor: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    route: "Rongai",
                    days: "7",
                    rate: "80%",
                    rateColor: "text-lime-600",
                    verdict: "Good",
                    verdictColor: "bg-lime-100 text-lime-700",
                  },
                  {
                    route: "Lemosho",
                    days: "7",
                    rate: "78%",
                    rateColor: "text-lime-600",
                    verdict: "Good",
                    verdictColor: "bg-lime-100 text-lime-700",
                  },
                  {
                    route: "Lemosho",
                    days: "8",
                    rate: "90%",
                    rateColor: "text-emerald-600",
                    verdict: "Excellent",
                    verdictColor: "bg-emerald-100 text-emerald-700",
                    highlight: true,
                  },
                  {
                    route: "Northern Circuit",
                    days: "9",
                    rate: "95%",
                    rateColor: "text-emerald-600",
                    verdict: "Best available",
                    verdictColor: "bg-emerald-100 text-emerald-700",
                    highlight: true,
                  },
                  {
                    route: "Umbwe",
                    days: "5",
                    rate: "50%",
                    rateColor: "text-orange-600",
                    verdict: "Experts only",
                    verdictColor: "bg-red-100 text-red-700",
                  },
                  {
                    route: "Umbwe",
                    days: "6",
                    rate: "60%",
                    rateColor: "text-yellow-600",
                    verdict: "Experts only",
                    verdictColor: "bg-red-100 text-red-700",
                  },
                ].map((row, i) => (
                  <tr
                    key={`${row.route}-${row.days}`}
                    className={`border-t border-[var(--border)] ${
                      row.highlight
                        ? "bg-emerald-50"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{row.route}</td>
                    <td className="px-4 py-3 text-center">{row.days}</td>
                    <td
                      className={`px-4 py-3 text-center font-bold ${row.rateColor}`}
                    >
                      {row.rate}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${row.verdictColor}`}
                      >
                        {row.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Duration Matters More Than Route */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Why Duration Matters More Than Route
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                The data reveals a pattern that overrides everything else: the
                number of days on the mountain is a stronger predictor of
                success than the specific route you choose.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">
                  10-15%
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  Extra Success Per Day
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Each additional day on the mountain adds approximately 10-15
                  percentage points to your success rate. This holds true
                  across every route. A 6-day Machame (44%) versus a 7-day
                  Machame (73%) is a 29-point swing from a single extra day.
                  That one day costs a few hundred dollars more in park fees
                  but nearly doubles your odds of standing on the summit.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">
                  Acclimatization
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  The #1 Factor in Summit Success
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Your body needs time to adapt to reduced oxygen levels. At
                  the summit, each breath delivers only 50% of the oxygen
                  available at sea level. Your body responds by producing more
                  red blood cells, adjusting breathing patterns, and
                  increasing cardiac output — but these changes take days, not
                  hours. Rushing this process is the single most common cause
                  of failure on Kilimanjaro.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">
                  Pole Pole
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  Slowly, Slowly — Altitude Needs Time
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  &quot;Pole pole&quot; (Swahili for &quot;slowly,
                  slowly&quot;) is not just a cultural greeting on the
                  mountain — it is the most effective altitude management
                  strategy. Walking slowly reduces oxygen demand, lowers
                  cardiac stress, and gives your body a chance to acclimatize
                  as you ascend. Guides who push a fast pace to &quot;stay on
                  schedule&quot; are prioritising logistics over your health
                  and your summit chances.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">
                  27% vs 95%
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  The Cheapest Route Has the Worst Rate
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The 5-day Marangu Route is the cheapest option on
                  Kilimanjaro — and it has a 27% success rate. The 9-day
                  Northern Circuit costs more but has a 95% rate. The
                  correlation between price and success is not coincidental:
                  cheaper means fewer days, fewer days means less
                  acclimatization, less acclimatization means more failures.
                  The &quot;savings&quot; on a short route often translate to
                  wasted park fees and a failed summit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beware of Inflated Success Rate Claims */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Beware of Inflated Claims
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Why 98-99% success rate claims are not credible
                </p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              If you research Kilimanjaro operators online, you will encounter
              companies claiming success rates of 98%, 99%, or even 100%.
              These numbers are <strong>not credible</strong>, and here is
              why:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-semibold text-red-800 mb-2">
                  No Independent Verification Exists
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  KINAPA does not publish operator-specific success rate data.
                  There is no independent auditing body. Any operator can
                  claim any number without consequence. When you see a 98.9%
                  success rate on a website, ask: who verified this? The
                  answer is invariably: no one.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-semibold text-red-800 mb-2">
                  Selective Counting Methods
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  Some operators inflate their numbers by counting Stella
                  Point (5,756m) as a successful summit instead of Uhuru Peak
                  (5,895m). Others exclude climbers who &quot;chose&quot; to
                  turn back — as if turning back due to splitting headaches
                  and vomiting is a voluntary lifestyle decision. Some only
                  count their longest-duration routes and ignore the shorter
                  ones. Strip away these counting tricks and their real rate
                  is 80-90% at best.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-semibold text-red-800 mb-2">
                  The Mathematics Are Implausible
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  A 98.9% success rate means only 1 failure in every 90
                  climbers. Over a season of 500 climbers, that is 5-6
                  failures total. Anyone who has spent time on Kilimanjaro
                  knows that altitude affects people unpredictably — genetics
                  play a major role, and no amount of guide quality eliminates
                  the 5-10% of people who simply do not acclimatize well
                  enough. The best operators in the world, running 8-9 day
                  routes exclusively, still see 5-10% failure rates.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                What Honest Operators Report
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Reputable, experienced operators who count only Uhuru Peak
                summits and include all attempts report success rates between{" "}
                <strong>85% and 95%</strong>. This is the credible range.
                Higher than the 65% overall average (because good operators
                use longer routes and experienced guides) but lower than the
                implausible 98-99% claims.
              </p>
              <div className="bg-white rounded-xl p-5 border border-emerald-200">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6 text-[var(--secondary)]" />
                  <span className="font-bold text-lg">
                    Snow Africa&apos;s Rate: 93%
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Our 93% success rate is calculated as{" "}
                  <strong>
                    (successful Uhuru Peak summits / total summit attempts)
                    &times; 100
                  </strong>
                  , verified from our booking and expedition records. We count
                  only Uhuru Peak — not Stella Point or Gilman&apos;s Point.
                  We do not exclude any attempts for any reason. This is our
                  honest, verifiable number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Factors That Determine YOUR Success */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              5 Factors That Determine YOUR Success
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Your personal success rate is not 65%. It is determined by five
              controllable factors — four of which are entirely within your
              power to optimise.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {successFactors.map((factor, i) => (
              <div
                key={factor.title}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">
                    {i + 1}
                  </span>
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                    <factor.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-heading font-bold text-lg">
                      {factor.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold ${factor.importanceColor}`}
                    >
                      {factor.importance}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Maximize Your Success */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How to Maximize Your Success
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Six evidence-based strategies that will move your personal
              success rate from the 65% average into the 90%+ range.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {maximizeTips.map((tip, i) => (
              <div
                key={tip.title}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-[var(--primary)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">
                  {tip.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {tip.description}
                </p>
                {tip.link && (
                  <Link
                    href={tip.link}
                    className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                  >
                    {tip.linkText}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snow Africa's 93% Success Rate */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Snow Africa&apos;s 93% Success Rate
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our success rate is not a marketing number. It is the result of
              specific, measurable operational practices that we apply to
              every single climb.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Large Stat Display */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-10 py-8">
                <div>
                  <div className="text-6xl md:text-7xl font-bold text-[var(--secondary)]">
                    93%
                  </div>
                  <p className="text-white/50 text-sm mt-1">
                    Verified summit rate
                  </p>
                </div>
                <div className="w-px h-20 bg-white/20" />
                <div className="text-left">
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                    Calculated from our expedition records. Uhuru Peak only.
                    All attempts included. No exclusions.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Achieve It */}
            <div className="grid md:grid-cols-2 gap-6">
              {snowAfricaAdvantages.map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-[var(--secondary)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--secondary)]">
                        {item.stat}
                      </div>
                      <p className="text-white/50 text-xs">{item.label}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3">
                Why We Do Not Claim 98% or 99%
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                We could inflate our number. There is no one to stop us. But
                we believe that honesty builds trust, and trust is the
                foundation of a business that sends people to 5,895 metres.
                Our 93% rate means approximately 7 out of every 100 climbers
                do not reach Uhuru Peak. Some are affected by altitude despite
                our best protocols. Some develop illness unrelated to
                altitude. Some make the personal choice to turn back. We
                respect every one of those outcomes and we count every one of
                them honestly.
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                A 93% rate from an operator who counts honestly is more
                meaningful — and more trustworthy — than a 99% rate from one
                who does not explain their methodology.
              </p>
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

      {/* Related Guides */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {guide.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the 93%?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Choose a 7+ day route with experienced guides, proper
            acclimatization protocols, and twice-daily health monitoring.
            Give yourself the best possible odds of standing on Uhuru Peak.
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
