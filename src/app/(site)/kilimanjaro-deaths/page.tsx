import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  AlertTriangle,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  Activity,
  ArrowRight,
  Users,
  BarChart3,
  Thermometer,
  Brain,
  Wind,
  CheckCircle,
  XCircle,
  Info,
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
  title: "Deaths on Kilimanjaro: Statistics & Risk Factors",
  description:
    "Kilimanjaro death statistics: 3-10 fatalities per year among 35,000+ climbers (0.03% rate). Causes, risk factors, and how to minimise danger. Data from KINAPA and local operators.",
  url: "/kilimanjaro-deaths/",
});

const keyStats = [
  {
    label: "Annual Deaths",
    value: "3-10",
    sublabel: "fatalities per year",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    label: "Total Annual Climbers",
    value: "35,000+",
    sublabel: "attempts per year",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Fatality Rate",
    value: "~0.03%",
    sublabel: "of all climbers",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Kilimanjaro vs Everest",
    value: "0.03% vs 1.2%",
    sublabel: "40x safer than Everest",
    icon: Mountain,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    label: "Rescues Requiring Descent",
    value: "~5%",
    sublabel: "of climbers evacuated",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Success Rate (8-Day Route)",
    value: "93%+",
    sublabel: "summit on longer routes",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

const causesOfDeath = [
  {
    cause: "HACE (High Altitude Cerebral Edema)",
    percentage: "~35%",
    icon: Brain,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description:
      "The leading cause of death on Kilimanjaro. HACE occurs when the brain swells due to fluid leakage at extreme altitude. Symptoms include confusion, disorientation, inability to walk in a straight line, and eventually loss of consciousness. HACE can progress from moderate symptoms to life-threatening within 12-24 hours if the climber does not descend. Almost every HACE fatality on Kilimanjaro involved a climber who either hid symptoms from their guide, refused to descend, or was with an operator that lacked the training to recognise the warning signs early enough.",
  },
  {
    cause: "HAPE (High Altitude Pulmonary Edema)",
    percentage: "~25%",
    icon: Wind,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description:
      "HAPE occurs when fluid accumulates in the lungs, preventing effective oxygen exchange. A climber with HAPE develops a persistent cough, breathlessness at rest, gurgling sounds when breathing, and in severe cases, pink or frothy sputum. Like HACE, HAPE is treatable with immediate descent and supplemental oxygen. It becomes fatal when descent is delayed. HAPE tends to develop more gradually than HACE, giving trained guides a window to intervene, but it can accelerate rapidly during the physical exertion of summit night.",
  },
  {
    cause: "Cardiac Events",
    percentage: "~20%",
    icon: Heart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description:
      "Pre-existing cardiac conditions, sometimes undiagnosed, are aggravated by the combination of extreme altitude, cold temperatures, physical exertion, and dehydration. The reduced oxygen at high altitude forces the heart to work significantly harder. Climbers over 50 or those with a family history of heart disease should obtain a thorough cardiac screening, including a stress test, before attempting Kilimanjaro. Several fatalities on the mountain have involved climbers who had underlying conditions they were unaware of.",
  },
  {
    cause: "Hypothermia and Exposure",
    percentage: "~12%",
    icon: Thermometer,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description:
      "Summit night temperatures regularly drop to -15 to -25 degrees Celsius, with wind chill pushing the effective temperature far lower. Climbers who are inadequately equipped, already weakened by altitude sickness, or who become separated from the group face genuine hypothermia risk. Wet clothing, exhaustion, and poor layering compound the danger. Proper gear, experienced guides who monitor climbers throughout the summit push, and the discipline to turn back if conditions deteriorate are the best defences.",
  },
  {
    cause: "Falls",
    percentage: "~8%",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description:
      "Falls are rare on Kilimanjaro compared to technical mountains, but they do occur. Most happen during the descent from the summit, when climbers are exhausted, dehydrated, and operating on minimal sleep. The steep scree sections on routes like Machame and the rocky Barafu descent in the dark require concentration that fatigued climbers may not have. A smaller number occur on the Breach Wall route (Western Breach), which involves some scrambling and has a history of rockfall incidents. This is why KINAPA requires helmets on the Western Breach.",
  },
];

const whyDeathsHappen = [
  {
    reason: "Ignoring or Hiding Symptoms",
    icon: XCircle,
    description:
      "The most common factor in Kilimanjaro fatalities is a climber who felt symptoms of severe altitude sickness but chose not to tell their guide. Some climbers hide symptoms because they do not want to be turned back after investing time and money in the expedition. Others genuinely do not recognise the severity of what they are experiencing. In our 800+ expeditions, we have managed hundreds of altitude cases. Every single case that was reported early was resolved safely. The dangerous ones are the ones climbers try to push through.",
  },
  {
    reason: "Choosing Routes Too Short for Acclimatization",
    icon: Clock,
    description:
      "Five-day routes like the Marangu 5-day itinerary do not give most climbers enough time to acclimatize. The body needs time to produce additional red blood cells, adjust breathing depth, and recalibrate fluid balance. On a 5-day route, climbers reach the summit zone before these adaptations are complete. KINAPA data consistently shows that climbers on shorter routes have higher rates of severe altitude illness and lower summit success rates. We strongly recommend a minimum of 7 days on the mountain, ideally 8.",
  },
  {
    reason: "Budget Operators Without Emergency Protocols",
    icon: AlertTriangle,
    description:
      "Not all Kilimanjaro operators are equal. Budget operators may not carry supplemental oxygen, may not have guides trained in altitude illness recognition, and may lack clear evacuation protocols. Some use fewer guides per climber, meaning individual health monitoring is less thorough. A reputable operator carries emergency oxygen on every expedition, conducts twice-daily health assessments, has trained WFR (Wilderness First Responder) guides, and empowers those guides to initiate descent without hesitation.",
  },
  {
    reason: "Pre-existing Conditions Not Disclosed",
    icon: Heart,
    description:
      "Climbers sometimes fail to disclose pre-existing cardiac conditions, respiratory issues, or medications that could affect their performance at altitude. This prevents guides from adjusting monitoring protocols and recognising warning signs specific to those conditions. A full medical declaration before the climb allows the guide team to provide more tailored and effective monitoring throughout the expedition.",
  },
  {
    reason: "Rushing to the Summit",
    icon: TrendingUp,
    description:
      "Summit night is the most dangerous phase of any Kilimanjaro climb. It involves 6-8 hours of steep ascent through extreme cold and thin air, usually starting at midnight. Climbers who rush, driven by excitement or anxiety, increase their oxygen demand at the worst possible time. The Swahili phrase pole pole (slowly, slowly) exists for a reason. Experienced guides set a deliberate, measured pace that maximises summit success and minimises altitude risk.",
  },
];

const preventionMeasures = [
  {
    title: "Choose a Longer Route (7+ Days)",
    icon: Mountain,
    description:
      "Route duration is the single most impactful safety decision. On an 8-day Lemosho route, the fatality rate drops to near zero because climbers have adequate time to acclimatize. Success rates jump from 65% on 5-day routes to 93%+ on 8-day routes. The extra days are not about comfort. They are about giving your body the time it physiologically requires to adapt to altitude. This is the one decision that has the largest effect on your safety.",
    link: "/best-route-to-climb-kilimanjaro/",
    linkText: "Compare route acclimatization profiles",
  },
  {
    title: "Twice-Daily Health Monitoring",
    icon: Activity,
    description:
      "Professional operators check every climber twice daily using pulse oximeters (measuring blood oxygen saturation and heart rate) and the Lake Louise Acute Mountain Sickness scoring system. These objective measurements reveal early warning signs before the climber may notice anything wrong. A dropping SpO2 trend or a rising Lake Louise score triggers intervention before the situation becomes dangerous. If your operator does not offer this level of monitoring, reconsider your choice.",
  },
  {
    title: "Emergency Oxygen on Every Expedition",
    icon: Wind,
    description:
      "Supplemental oxygen is a lifesaving intervention during HAPE and HACE episodes. It buys critical time during an emergency descent. Every Snow Africa expedition carries emergency oxygen cylinders regardless of route or group size. Many budget operators do not carry oxygen at all. Before booking with any operator, ask directly: do you carry emergency oxygen on every climb? If the answer is no, or if they hesitate, walk away.",
  },
  {
    title: "Clear Turnaround Protocols",
    icon: Shield,
    description:
      "Our guides have full authority to initiate a descent at any time, for any reason. This decision is never questioned, debated, or overruled. We have turned climbers back within 200 metres of the summit when vital signs indicated danger. A dedicated guide accompanies every descent, and emergency evacuation routes are pre-planned for every camp on every route. The guide team is your safety net. Their authority to say no is what keeps you alive.",
  },
  {
    title: "Trained Wilderness First Responder Guides",
    icon: CheckCircle,
    description:
      "Our guides hold Wilderness First Responder (WFR) certification, the gold standard for remote-area medical training. WFR training covers altitude illness recognition, emergency assessment, CPR, wound management, and evacuation decision-making in environments where hospitals are hours away. This is not a one-day course. It is intensive, hands-on, scenario-based training that equips guides to manage genuine medical emergencies on the mountain.",
    link: "/our-guides/",
    linkText: "Meet our certified guide team",
  },
  {
    title: "Emergency Evacuation Procedures",
    icon: AlertTriangle,
    description:
      "For every camp on every route, we have a pre-planned evacuation path that optimises speed of descent. In a critical emergency, we coordinate with KINAPA rescue teams and, where necessary, helicopter evacuation services from Moshi. Our guide-to-client ratio ensures that an emergency descent for one climber does not leave the rest of the group unsupported. We carry satellite communication on every expedition for situations where cellular coverage is unavailable.",
  },
];

const riskComparison = [
  {
    activity: "Kilimanjaro",
    fatalities: "~0.03%",
    notes: "3-10 deaths per 35,000+ climbers/year",
    riskLevel: "Low",
    riskColor: "bg-emerald-100 text-emerald-700",
  },
  {
    activity: "Mount Everest",
    fatalities: "~1.2%",
    notes: "~6 deaths per 500 climbers/year",
    riskLevel: "High",
    riskColor: "bg-red-100 text-red-700",
  },
  {
    activity: "Mont Blanc",
    fatalities: "~0.25%",
    notes: "~100 deaths per 30,000+ climbers/year",
    riskLevel: "Moderate",
    riskColor: "bg-orange-100 text-orange-700",
  },
  {
    activity: "Scuba Diving",
    fatalities: "1.8 per 100,000 dives",
    notes: "Equivalent to ~0.002% per dive session",
    riskLevel: "Low",
    riskColor: "bg-emerald-100 text-emerald-700",
  },
  {
    activity: "Skydiving",
    fatalities: "0.39 per 100,000 jumps",
    notes: "~13 deaths per 3.3 million jumps (US)",
    riskLevel: "Very Low",
    riskColor: "bg-emerald-100 text-emerald-700",
  },
  {
    activity: "Driving (Global)",
    fatalities: "1.22 per 100,000 population",
    notes: "~1.35 million deaths globally per year",
    riskLevel: "Moderate",
    riskColor: "bg-amber-100 text-amber-700",
  },
];

const atRiskGroups = [
  {
    group: "Climbers with Undiagnosed Cardiac Conditions",
    icon: Heart,
    description:
      "Altitude places immense stress on the cardiovascular system. Reduced oxygen forces the heart to pump harder and faster. Climbers with undetected coronary artery disease, arrhythmias, or structural heart conditions face a significantly elevated risk. We strongly recommend a full cardiac evaluation, including a stress ECG, for climbers over 45 and anyone with a family history of heart disease. Several Kilimanjaro fatalities involved climbers whose post-mortem revealed pre-existing cardiac conditions they did not know about.",
  },
  {
    group: "Those on Short Routes (5-Day Itineraries)",
    icon: Clock,
    description:
      "Data from KINAPA and multiple operator databases consistently shows that climbers on 5-day routes face higher rates of severe altitude illness. A 5-day itinerary provides insufficient time for the physiological adaptations required to safely reach 5,895 metres. The body cannot be rushed through acclimatization. Every additional day on the mountain reduces your risk measurably. The difference between a 5-day and an 8-day route is not just comfort. It is safety.",
  },
  {
    group: "Climbers Who Ignore Guide Advice",
    icon: XCircle,
    description:
      "Guides on Kilimanjaro are not making suggestions. When a guide recommends descent, that recommendation is based on objective vital sign data and years of altitude illness experience. Climbers who override guide advice, hide symptoms, or refuse to descend when told to do so are placing themselves in danger. In the vast majority of Kilimanjaro fatalities, the climber either ignored symptoms, refused to report them, or rejected the guide&apos;s recommendation to descend.",
  },
  {
    group: "Budget Operator Clients Without Emergency Oxygen",
    icon: AlertTriangle,
    description:
      "The price difference between a budget operator and a professional one is often a few hundred dollars. That difference typically buys: emergency oxygen, trained WFR guides, proper guide-to-client ratios, functioning pulse oximeters, and clear evacuation protocols. Budget operators cut costs by reducing exactly the safety measures that prevent fatalities. Choosing an operator on price alone is a false economy when the thing you are economising on is your life.",
  },
];

const snowAfricaSafety = [
  {
    stat: "800+",
    label: "Successful Expeditions",
    description:
      "Over 500 guided Kilimanjaro expeditions with zero client fatalities. Our safety record is built on strict protocols, not luck.",
  },
  {
    stat: "93%+",
    label: "Summit Success Rate",
    description:
      "On our recommended 8-day routes, more than 93% of our clients reach Uhuru Peak. High success rates and safety are not competing goals. They are the same goal.",
  },
  {
    stat: "1:2",
    label: "Guide-to-Client Ratio",
    description:
      "Every two climbers have a dedicated guide. This ensures individualised health monitoring, personalised pace management, and immediate response to any safety concern.",
  },
  {
    stat: "100%",
    label: "Emergency Oxygen Coverage",
    description:
      "Emergency oxygen is carried on every single expedition we run, regardless of route, group size, or budget. This is non-negotiable.",
  },
];

const faqs: { question: string; answer: string; link?: string }[] = [
  {
    question: "How many people die on Kilimanjaro each year?",
    answer:
      "Approximately 3 to 10 climbers die on Mount Kilimanjaro each year, according to KINAPA (Kilimanjaro National Park Authority) data and reports from local operators. This is out of roughly 35,000 climbers who attempt the summit annually, giving a fatality rate of approximately 0.03%. The number varies from year to year. Some years see as few as 3 deaths, while others record up to 10. These figures include all causes: altitude illness, cardiac events, hypothermia, and falls. For context, this makes Kilimanjaro statistically one of the safest major mountains in the world to climb.",
  },
  {
    question: "What is the main cause of death on Kilimanjaro?",
    answer:
      "High Altitude Cerebral Edema (HACE) is the leading cause of death on Kilimanjaro, followed closely by High Altitude Pulmonary Edema (HAPE). Together, these altitude-related conditions account for approximately 60% of fatalities. Cardiac events triggered by altitude stress account for roughly 20%. Hypothermia and falls make up the remainder. The critical point is that HACE and HAPE are both treatable conditions if recognised early and responded to with immediate descent and supplemental oxygen. Most altitude-related deaths involve delayed recognition, delayed descent, or inadequate emergency equipment.",
  },
  {
    question: "Is Kilimanjaro more dangerous than Everest?",
    answer:
      "No. Kilimanjaro is approximately 40 times safer than Everest by fatality rate. Kilimanjaro has a fatality rate of roughly 0.03% compared to Everest at approximately 1.2%. Kilimanjaro is a non-technical trek that requires no ropes, crampons, or mountaineering experience. Everest involves technical climbing through the Khumbu Icefall, exposed ridges, and the Death Zone above 8,000 metres. Kilimanjaro is also significantly lower (5,895m versus 8,849m), meaning the altitude stress is considerably less extreme. This comparison is important because many prospective climbers overestimate the danger of Kilimanjaro based on its name recognition.",
  },
  {
    question: "Has anyone died on Kilimanjaro recently?",
    answer:
      "Deaths on Kilimanjaro are reported each year. KINAPA does not always publish individual incident reports publicly, but local operators and media outlets do report fatalities when they occur. In recent years, reported deaths have included climbers from various countries who succumbed to altitude sickness, cardiac events, or exposure. Each incident reinforces the same lessons: choose a longer route, climb with a reputable operator, carry emergency oxygen, listen to your guides, and report every symptom immediately.",
  },
  {
    question: "Can altitude sickness kill you on Kilimanjaro?",
    answer:
      "Yes, severe altitude sickness (HACE or HAPE) can be fatal if not treated promptly. However, deaths from altitude sickness on Kilimanjaro are rare when climbers are with professional operators who carry emergency oxygen, conduct twice-daily health monitoring, and have clear turnaround protocols. Altitude sickness progresses through recognisable stages: mild symptoms (headache, nausea), moderate symptoms (severe headache, vomiting, coordination loss), and severe symptoms (confusion, ataxia, breathlessness at rest). When caught at the mild or moderate stage and managed with rest, hydration, medication, or descent, it is almost never fatal. The danger comes from ignoring symptoms or climbing with operators who lack the training to respond.",
    link: "/kilimanjaro-altitude-sickness/",
  },
  {
    question: "What is the safest route on Kilimanjaro?",
    answer:
      "The 8-day Lemosho Route and the 9-day Northern Circuit are widely considered the safest routes on Kilimanjaro because they offer the best acclimatization profiles. The Lemosho Route includes a climb-high-sleep-low day at Lava Tower (4,630m) before descending to Barranco Camp (3,960m), which dramatically improves acclimatization. The Northern Circuit adds an extra day traversing the mountain at altitude, giving the body even more time to adapt. Both routes have summit success rates above 90%. The least safe option is the 5-day Marangu Route, which provides insufficient acclimatization time and has the highest rates of altitude illness.",
    link: "/best-route-to-climb-kilimanjaro/",
  },
  {
    question: "Do porters die on Kilimanjaro?",
    answer:
      "Porter deaths do occur on Kilimanjaro, though KINAPA does not publish comprehensive data on porter fatalities separately from climber fatalities. Porters face many of the same altitude risks as climbers but are often less well equipped and less closely monitored. The Kilimanjaro Porters Assistance Project (KPAP) has advocated for better working conditions, including proper clothing, food, shelter, and health monitoring for porters. Ethical operators like Snow Africa provide proper gear, fair wages, adequate food, and health monitoring for all crew members. When choosing your operator, ask about their porter welfare policies.",
  },
  {
    question: "What happens if someone dies on Kilimanjaro?",
    answer:
      "In the event of a death on Kilimanjaro, the guide team secures the area and contacts KINAPA rangers and rescue teams immediately. The body is evacuated by the guide team and KINAPA personnel, typically carried down on a stretcher by a team of porters and rangers. KINAPA conducts an investigation and files a report. The climber&apos;s embassy is notified, and arrangements are made for repatriation of the remains. The rest of the group is supported by the remaining guide team, who ensure safe descent. This is one of the reasons adequate guide-to-client ratios matter: the team must be able to manage both the emergency and the remaining group simultaneously.",
  },
  {
    question: "Is Kilimanjaro safe for beginners?",
    answer:
      "Yes, Kilimanjaro is safe for beginners who prepare properly and climb with a professional operator. It is a non-technical trek that requires no prior mountaineering experience, ropes, or specialised climbing skills. What it does require is reasonable cardiovascular fitness, a route of 7 or more days for proper acclimatization, adequate gear for extreme cold on summit night, and a willingness to listen to your guides. Beginners actually have one advantage: they tend to be more open to following guide advice because they do not carry the overconfidence that sometimes accompanies more experienced climbers.",
    link: "/can-beginners-climb-kilimanjaro/",
  },
  {
    question: "How do I reduce my risk of dying on Kilimanjaro?",
    answer:
      "The five most impactful things you can do: (1) Choose a 7+ day route, ideally 8 days on the Lemosho Route. (2) Book with a licensed, reputable operator that carries emergency oxygen, employs WFR-certified guides, and conducts twice-daily health monitoring. (3) Report every symptom to your guide, no matter how minor. Never hide symptoms. (4) Get a thorough medical check-up before your climb, including cardiac screening if you are over 45 or have risk factors. (5) Follow the pole pole (slowly, slowly) principle. Do not rush. The mountain is not going anywhere. With these precautions, your risk is extremely low.",
  },
  {
    question: "Should I worry about dying on Kilimanjaro?",
    answer:
      "No. Concern is healthy. Worry is counterproductive. A 0.03% fatality rate means that 99.97% of climbers come home safely. That rate drops even further when you exclude climbers on budget operators without safety protocols and those on dangerously short routes. If you choose a reputable operator, climb a 7+ day route, and report symptoms honestly, your risk is vanishingly small. You face more statistical danger on the drive from Kilimanjaro Airport to Moshi than you do on the mountain itself. Respect the mountain, prepare properly, and trust your guides. That is the path to a safe and successful summit.",
  },
];

export default function KilimanjaroDeathsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Deaths on Kilimanjaro" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Deaths on Kilimanjaro", url: "/kilimanjaro-deaths/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Deaths on Kilimanjaro: Statistics & Risk Factors",
            description:
              "Kilimanjaro death statistics: 3-10 fatalities per year among 35,000+ climbers (0.03% rate). Causes, risk factors, and how to minimise danger. Data from KINAPA and local operators.",
            url: "/kilimanjaro-deaths/",
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
            alt="Trekkers ascending Kilimanjaro with professional guides monitoring safety"
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
              Safety Data &amp; Analysis
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Deaths on <span className="text-[var(--secondary)]">Kilimanjaro</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Honest statistics, causes, and risk factors from an operator with 800+ expeditions and zero client fatalities. Data sourced from KINAPA reports and 15+ years of on-mountain experience.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Approximately <strong>3-10 climbers die on Kilimanjaro each year</strong> out of 35,000+ attempts, a fatality rate of roughly <strong>0.03%</strong>. For context, that makes Kilimanjaro safer than many activities people consider routine. Most deaths are <strong>preventable</strong> with proper acclimatization, experienced guides, and timely descent. The climbers who die are overwhelmingly those who ignored symptoms, chose dangerously short routes, or climbed with operators lacking emergency protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Kilimanjaro Death Statistics
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The numbers paint a clear picture. Kilimanjaro is not a death trap. It is a serious mountain that demands respect, proper preparation, and professional guidance, but its fatality rate is remarkably low compared to other mountains and even many routine activities.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className={`${stat.bgColor} border ${stat.borderColor} rounded-2xl p-6 text-center`}
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-[var(--text-muted)]">{stat.sublabel}</div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-10">
            <p className="text-[var(--text-muted)] leading-relaxed">
              These statistics are drawn from KINAPA (Kilimanjaro National Park Authority) records, local operator data, and published research on high-altitude trekking fatalities. The exact number of annual deaths varies because not all incidents are publicly reported, and KINAPA does not always release comprehensive annual statistics. However, multiple independent sources, including peer-reviewed studies published in the <em>High Altitude Medicine &amp; Biology</em> journal, consistently place the figure between 3 and 10 deaths per year.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mt-4">
              To put the 0.03% fatality rate into perspective: you face a greater statistical risk during the drive from Kilimanjaro International Airport to Moshi than you do on the mountain itself. This does not mean Kilimanjaro should be taken lightly. It means that with proper preparation — including a solid <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline font-semibold">training plan</Link> and appropriate <Link href="/kilimanjaro-travel-insurance/" className="text-[var(--primary)] hover:underline font-semibold">travel insurance</Link> — the right operator, and adequate acclimatization time, it is an objectively safe undertaking.
            </p>
          </div>
        </div>
      </section>

      {/* Causes of Death */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Causes of Death on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Understanding what kills climbers on Kilimanjaro is the first step toward ensuring it does not happen to you. The causes are well documented and, in most cases, preventable.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {causesOfDeath.map((cause) => (
              <div
                key={cause.cause}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${cause.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                      <cause.icon className={`w-6 h-6 ${cause.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading font-bold text-lg">{cause.cause}</h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cause.bgColor} ${cause.color}`}>
                          {cause.percentage} of fatalities
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {cause.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>The common thread:</strong> Nearly every Kilimanjaro fatality involves either delayed recognition of symptoms, delayed descent, or lack of emergency equipment. When altitude sickness is caught early and responded to promptly with descent and oxygen, it is almost never fatal. This is why operator choice and guide quality are the most important safety decisions you can make. Read more about altitude illness in our{" "}
                <Link href="/kilimanjaro-altitude-sickness/" className="underline font-semibold">
                  altitude sickness guide
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Deaths Happen */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Deaths Happen on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The mountain itself is not the primary danger. Human decisions are — starting with <Link href="/kilimanjaro-climbing-companies/" className="text-[var(--primary)] hover:underline font-semibold">which climbing company you choose</Link>. Every factor listed below is within the climber&apos;s control before or during the expedition.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {whyDeathsHappen.map((item, i) => (
              <div
                key={item.reason}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{item.reason}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Deaths Are Prevented */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How Deaths Are Prevented
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The good news is that Kilimanjaro fatalities are almost entirely preventable. The following measures, implemented by professional operators, reduce your risk to near zero.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {preventionMeasures.map((measure) => (
              <div
                key={measure.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center shrink-0">
                    <measure.icon className="w-6 h-6 text-[var(--secondary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{measure.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {measure.description}
                    </p>
                    {measure.link && (
                      <Link
                        href={measure.link}
                        className="text-sm text-[var(--secondary)] hover:text-white mt-2 inline-flex items-center gap-1 transition-colors"
                      >
                        {measure.linkText}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Risk Comparison: Kilimanjaro vs Other Activities
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Context matters. Comparing Kilimanjaro&apos;s fatality rate to other mountains and common activities helps calibrate the actual level of risk involved.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Activity</th>
                  <th className="text-left px-4 py-3 font-semibold">Fatality Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">Risk Level</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {riskComparison.map((item, i) => (
                  <tr
                    key={item.activity}
                    className={`border-t border-[var(--border)] ${
                      item.activity === "Kilimanjaro"
                        ? "bg-emerald-50"
                        : i % 2 === 0
                        ? "bg-white"
                        : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {item.activity}
                      {item.activity === "Kilimanjaro" && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          This Mountain
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold">{item.fatalities}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.riskColor}`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4 max-w-2xl mx-auto">
            Note: Fatality rate comparisons across activities are inherently imperfect because the denominators differ (per climber, per dive, per jump, per population). They are provided for general context, not precise equivalence. The core takeaway is that Kilimanjaro&apos;s risk is low by any reasonable standard.
          </p>
        </div>
      </section>

      {/* Who Is Most at Risk */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Who Is Most at Risk?
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro does not discriminate by fitness level. However, certain groups face elevated risk based on their choices and circumstances.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {atRiskGroups.map((item) => (
              <div
                key={item.group}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">{item.group}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Snow Africa Does Differently */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Snow Africa Does Differently
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Safety is not a marketing claim for us. It is the foundation of every expedition we run. Our founder, Emmanuel Moshi, has summited Kilimanjaro over 200 times and built our protocols from hard-won mountain experience.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {snowAfricaSafety.map((item) => (
              <div
                key={item.label}
                className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 text-center"
              >
                <div className="text-3xl font-bold text-[var(--primary)] mb-2">{item.stat}</div>
                <h3 className="font-heading font-bold text-sm mb-2">{item.label}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3 text-emerald-800">Our Safety Protocol on Every Expedition</h3>
              <ul className="space-y-3">
                {[
                  "Twice-daily health assessments using pulse oximeters and the Lake Louise AMS scoring system",
                  "Emergency oxygen carried on every single climb, regardless of route or group size",
                  "WFR-certified (Wilderness First Responder) lead guides on every expedition",
                  "1:2 guide-to-client ratio for individualised monitoring",
                  "Pre-planned evacuation routes from every camp on every route",
                  "Satellite communication equipment for areas without cellular coverage",
                  "Full medical declaration and screening review before departure",
                  "Clear turnaround protocol: guides have absolute authority to initiate descent",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
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
                <details key={i} className="bg-white rounded-xl border border-[var(--border)] group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                    <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                    {faq.link && (
                      <Link
                        href={faq.link}
                        className="text-[var(--primary)] hover:underline mt-2 inline-block text-sm"
                      >
                        Read our full guide &rarr;
                      </Link>
                    )}
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <AlertTriangle className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
              <Link href="/kilimanjaro-success-rates/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <BarChart3 className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Success Rates</p>
                <p className="text-xs text-[var(--text-muted)]">Route-by-route data</p>
              </Link>
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all routes</p>
              </Link>
              <Link href="/can-beginners-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Beginners Guide</p>
                <p className="text-xs text-[var(--text-muted)]">First-time climbers</p>
              </Link>
              <Link href="/how-hard-is-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">How Hard Is It?</p>
                <p className="text-xs text-[var(--text-muted)]">Honest difficulty assessment</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/kilimanjaro-statistics/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <BarChart3 className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Statistics</p>
                <p className="text-xs text-[var(--text-muted)]">Facts &amp; figures</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-deaths/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb Kilimanjaro Safely
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With 800+ expeditions and zero client fatalities, WFR-certified guides, emergency oxygen on every climb, and twice-daily health monitoring, Snow Africa provides the safety margin that makes the difference.
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
