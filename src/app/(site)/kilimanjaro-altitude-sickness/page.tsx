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
  Droplets,
  Wind,
  Stethoscope,
  Users,
  Pill,
  Info,
  X,
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
  title: "Kilimanjaro Altitude Sickness: Prevention & Treatment",
  description:
    "Complete guide to altitude sickness on Kilimanjaro from guides with 500+ summits. Symptoms, prevention, Diamox protocol, acclimatization strategies, and when to descend.",
  url: "/kilimanjaro-altitude-sickness/",
});

const severityTiers = [
  {
    level: "Mild AMS",
    frequency: "COMMON — ~75% of climbers",
    color: "amber",
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    symptoms: [
      "Headache — dull, persistent pressure that worsens with exertion",
      "Nausea or loss of appetite — food becomes unappealing",
      "Fatigue and weakness beyond normal trekking tiredness",
      "Dizziness or light-headedness, especially when standing",
      "Difficulty sleeping — restless nights and shallow breathing",
    ],
    action:
      "Manageable on the mountain. Rest, hydrate (4+ litres/day), take ibuprofen for headache, and monitor with your guide. Most mild AMS resolves within 12-24 hours.",
  },
  {
    level: "Moderate AMS",
    frequency: "LESS COMMON — requires close monitoring",
    color: "orange",
    headerBg: "bg-orange-50",
    headerBorder: "border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
    symptoms: [
      "Severe headache that does not respond to painkillers",
      "Vomiting — unable to keep food or fluids down",
      "Loss of coordination — stumbling, difficulty with balance",
      "Shortness of breath at rest, not just during exertion",
      "Extreme fatigue — unable to keep pace with the group",
    ],
    action:
      "Do not ascend further. Administer Diamox if not already taking it. If symptoms do not improve within 4-6 hours, descend 500-1,000m with a dedicated guide. Many climbers recover and can continue the next day.",
  },
  {
    level: "Severe (HACE / HAPE)",
    frequency: "RARE — fewer than 1-2% of climbers",
    color: "red",
    headerBg: "bg-red-50",
    headerBorder: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    badgeColor: "bg-red-100 text-red-700",
    symptoms: [
      "HACE: Confusion, disorientation, inability to answer simple questions",
      "HACE: Ataxia — cannot walk in a straight line (heel-to-toe test fails)",
      "HAPE: Persistent cough producing frothy or pink sputum",
      "HAPE: Severe breathlessness at rest, gurgling sounds when breathing",
      "Blue or grey lips and fingernails (cyanosis)",
    ],
    action:
      "DESCEND IMMEDIATELY — do not wait for daylight. Administer supplemental oxygen. Dexamethasone for suspected HACE, nifedipine for HAPE. These conditions can be fatal within 24 hours if untreated.",
  },
];

const altitudeZones = [
  {
    range: "1,800 – 2,800m",
    name: "Forest Zone",
    oxygen: "~80% of sea level",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    description:
      "Starting elevation for most routes. No altitude effects. Body functions normally. Lush rainforest with warm, humid conditions.",
  },
  {
    range: "2,800 – 3,500m",
    name: "Heath & Moorland",
    oxygen: "~70% of sea level",
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
    description:
      "Mild AMS symptoms can begin. Headaches and slight nausea are common as your body starts adapting. Most climbers adjust within a day.",
  },
  {
    range: "3,500 – 4,600m",
    name: "Alpine Desert",
    oxygen: "~60% of sea level",
    color: "text-orange-400",
    borderColor: "border-orange-400/30",
    description:
      "The critical acclimatization zone. Most AMS cases develop here. Climb-high-sleep-low days are essential. Proper hydration and slow pace are vital.",
  },
  {
    range: "4,600 – 5,895m",
    name: "Summit Zone",
    oxygen: "~50% of sea level",
    color: "text-red-400",
    borderColor: "border-red-400/30",
    description:
      "Extreme altitude. HACE and HAPE risk is highest. Extended time here is dangerous. Summit night pushes through this zone in 6-8 hours.",
  },
];

const preventionStrategies = [
  {
    icon: Mountain,
    title: "Choose a Longer Route (7+ Days)",
    description:
      "The single most impactful decision you can make. Climbers on 8-day routes experience dramatically less AMS than those on 5-day routes. Success rates jump from 65% to 93%+. Extra days give your body time to produce more red blood cells and adjust breathing patterns.",
    link: "/best-route-to-climb-kilimanjaro/",
    linkText: "Compare route acclimatization profiles",
  },
  {
    icon: TrendingUp,
    title: "Climb High, Sleep Low",
    description:
      "The gold standard of acclimatization. Trek to a higher elevation during the day, then descend to a lower camp for sleeping. This trains your body to function with less oxygen. Routes like Lemosho and Machame build this into the itinerary with the Lava Tower acclimatization day (4,630m), then descending to Barranco Camp (3,960m).",
  },
  {
    icon: Droplets,
    title: "Hydrate Aggressively (3-4L/Day)",
    description:
      "Dehydration worsens AMS symptoms and impairs acclimatization. Drink 3 to 4 litres of water daily on the mountain. Do not rely on thirst — by the time you feel thirsty at altitude, you are already dehydrated. Your urine should remain clear to pale yellow throughout the trek.",
  },
  {
    icon: Clock,
    title: "Pole Pole (Slowly, Slowly)",
    description:
      "The most important Swahili phrase you will learn. Walk at a pace where you can comfortably hold a conversation. Never race. Above 3,000m, your net altitude gain should not exceed 300-500m per day. Rushing is the primary cause of preventable altitude sickness on Kilimanjaro.",
  },
  {
    icon: Pill,
    title: "Consider Diamox (Acetazolamide)",
    description:
      "A prescription medication that genuinely aids acclimatization by stimulating faster, deeper breathing. Many altitude medicine specialists recommend it prophylactically. Start 24-48 hours before ascending above 2,500m. Consult your doctor before travel.",
  },
  {
    icon: Heart,
    title: "Eat Well — Carbs Are Your Fuel",
    description:
      "Your body burns significantly more calories at altitude. Eat regular, carbohydrate-rich meals even when your appetite is poor. Carbs require less oxygen to metabolise than fats or proteins, making them the ideal altitude fuel. Our mountain cooks prepare high-carb meals specifically designed for altitude.",
  },
  {
    icon: Users,
    title: "Listen to Your Guides",
    description:
      "Report every symptom, no matter how minor. Our guides carry pulse oximeters and use the Lake Louise scoring system twice daily. They have managed altitude sickness on hundreds of expeditions and can identify warning signs before you notice them yourself. Never hide symptoms to avoid slowing the group.",
    link: "/our-guides/",
    linkText: "Meet our certified guide team",
  },
];

const diamoxInfo = {
  whatItDoes:
    "Acetazolamide (brand name Diamox) is a carbonic anhydrase inhibitor. It works by making your blood slightly more acidic, which tricks your brain into thinking you have too much carbon dioxide. Your body responds by breathing faster and deeper, bringing in more oxygen. The result is better acclimatization — your body adjusts to altitude more quickly than it would on its own.",
  dosage:
    "The standard prophylactic dose is 125mg to 250mg taken twice daily (morning and evening). Most altitude medicine specialists recommend starting with 125mg twice daily, as this lower dose is effective for most people with fewer side effects. Start 24 to 48 hours before ascending above 2,500m and continue until you begin descending or have been at your maximum altitude for 48 hours.",
  sideEffects: [
    "Tingling in fingers, toes, and lips (paraesthesia) — very common and harmless",
    "Increased urination — your body excretes more bicarbonate, pulling water with it",
    "Altered taste — carbonated drinks taste flat or metallic",
    "Mild nausea or loss of appetite in some people",
    "Rare: blurred vision, drowsiness, or allergic reaction (seek medical attention)",
  ],
  warnings: [
    "Diamox is a sulfonamide derivative — do not take if you have a sulfa allergy",
    "It is a prescription medication in most countries — see your doctor before travel",
    "Diamox does not mask symptoms — it genuinely aids acclimatization",
    "It reduces risk but does not eliminate it — acclimatization and route choice still matter",
    "Test it at home before your trip to check for adverse reactions",
  ],
};

const guideMonitoring = [
  {
    icon: Activity,
    title: "Twice-Daily Pulse Oximetry",
    description:
      "Our guides carry medical-grade pulse oximeters and check every climber's blood oxygen saturation (SpO2) and heart rate at camp arrival and before dinner. Readings are logged so we can track trends. A SpO2 below 80% at rest, or a sudden drop of more than 10 points from the previous day, triggers our safety protocol.",
  },
  {
    icon: Stethoscope,
    title: "Lake Louise AMS Scoring",
    description:
      "Every morning and evening, our guide conducts a structured health assessment using the Lake Louise scoring system — the international standard for AMS evaluation. It scores headache, gastrointestinal symptoms, fatigue, dizziness, and sleep quality. Scores above 5 require closer monitoring; scores above 8 trigger descent.",
  },
  {
    icon: Shield,
    title: "Clear Turnaround Protocol",
    description:
      "Our guides have full authority to initiate a descent at any time. This decision is never questioned or overruled. We have turned climbers back within 200 metres of the summit when vital signs indicated danger. A dedicated guide accompanies every descent, and emergency evacuation routes are pre-planned for every camp on every route.",
  },
  {
    icon: Wind,
    title: "Emergency Oxygen on Every Climb",
    description:
      "We carry supplemental oxygen cylinders on every expedition, regardless of route or group size. Bottled oxygen provides immediate relief during a HAPE or HACE episode and buys critical time during an emergency descent. Many budget operators do not carry oxygen — we consider it non-negotiable.",
  },
];

const routeAcclimatization = [
  {
    route: "Marangu 5-Day",
    days: 5,
    profile: "Poor",
    profileColor: "bg-red-100 text-red-700",
    successRate: "65%",
    notes: "No climb-high-sleep-low profile. Insufficient acclimatization time.",
  },
  {
    route: "Machame 6-Day",
    days: 6,
    profile: "Fair",
    profileColor: "bg-orange-100 text-orange-700",
    successRate: "75%",
    notes: "Includes Lava Tower acclimatization day but still fast for many.",
  },
  {
    route: "Rongai 7-Day",
    days: 7,
    profile: "Good",
    profileColor: "bg-amber-100 text-amber-700",
    successRate: "85%",
    slug: "6-days-rongai-route",
    notes: "Gradual ascent from the north. Good for steady acclimatizers.",
  },
  {
    route: "Machame 7-Day",
    days: 7,
    profile: "Good",
    profileColor: "bg-amber-100 text-amber-700",
    successRate: "85%",
    slug: "7-days-machame-route",
    notes: "Extra acclimatization day makes a significant difference.",
  },
  {
    route: "Lemosho 8-Day",
    days: 8,
    profile: "Excellent",
    profileColor: "bg-emerald-100 text-emerald-700",
    successRate: "93%",
    slug: "8-days-lemosho-route",
    notes: "Best climb-high-sleep-low profile. Our top recommendation.",
    recommended: true,
  },
  {
    route: "Northern Circuit 9-Day",
    days: 9,
    profile: "Best",
    profileColor: "bg-emerald-100 text-emerald-700",
    successRate: "95%",
    notes: "Longest route — best acclimatization of any Kilimanjaro route.",
  },
];

const faqs = [
  {
    question: "Can you die from altitude sickness on Kilimanjaro?",
    answer:
      "Deaths on Kilimanjaro are rare — approximately 3-7 per year among 50,000+ annual climbers. Almost all fatalities are related to severe altitude sickness (HACE or HAPE) that was not recognised or treated early enough. Climbing with an experienced, licensed operator whose guides are trained in altitude illness recognition and carry emergency oxygen is the single most important safety decision you can make. With proper acclimatization on a 7+ day route and twice-daily health monitoring, the risk of a fatal altitude event is extremely low.",
  },
  {
    question: "Should I take Diamox for Kilimanjaro?",
    answer:
      "Many experienced Kilimanjaro guides and altitude medicine specialists recommend Diamox (acetazolamide) for climbers, especially those with no prior high-altitude experience. It genuinely aids acclimatization by stimulating faster, deeper breathing. The standard dose is 125-250mg twice daily, starting 24-48 hours before ascending above 2,500m. It is a prescription medication — consult your doctor before your trip. From our experience guiding 500+ summits, climbers who take Diamox prophylactically tend to report fewer and milder AMS symptoms and maintain higher SpO2 readings.",
  },
  {
    question: "How do you prevent altitude sickness on Kilimanjaro?",
    answer:
      "The most effective prevention strategies are: choose a 7+ day route for proper acclimatization (success rates jump from 65% on 5-day routes to 93% on 8-day routes), stay hydrated with 3-4 litres of water daily, ascend slowly (pole pole), choose routes with climb-high-sleep-low profiles like Lemosho or Machame, consider prophylactic Diamox, eat carbohydrate-rich meals, avoid alcohol and sleeping pills, and climb with experienced guides who monitor your health twice daily with pulse oximetry and the Lake Louise scoring system.",
  },
  {
    question: "At what altitude do symptoms start on Kilimanjaro?",
    answer:
      "Altitude sickness can begin at any elevation above 2,500m (8,200ft), though most climbers start noticing symptoms between 3,000m and 3,500m. On Kilimanjaro, this typically corresponds to the second or third day of trekking as you transition from the rainforest into the heath and moorland zone. The critical acclimatization zone is 3,500-4,600m where most AMS cases develop. The summit zone above 5,000m carries the highest risk of severe illness.",
  },
  {
    question: "What is the best route to avoid altitude sickness on Kilimanjaro?",
    answer:
      "The 8-day Lemosho Route offers the best combination of acclimatization profile and summit success rate (93%). It includes an excellent climb-high-sleep-low day at Lava Tower (4,630m) before descending to Barranco Camp (3,960m). The 9-day Northern Circuit has the absolute best acclimatization (95% success rate) but is longer and more expensive. Both routes give your body significantly more time to adjust than shorter options. We strongly recommend a minimum of 7 days on the mountain.",
  },
  {
    question: "Can you train for altitude sickness?",
    answer:
      "Physical fitness does not prevent altitude sickness. This is one of the most persistent myths — ultra-fit marathon runners get AMS just as often as moderately fit hikers. Susceptibility is primarily genetic, relating to how efficiently your body produces red blood cells and adjusts breathing rate in response to lower oxygen. However, being physically fit helps with the trekking demands (6-8 hours of daily hiking), which means you can devote more of your body's resources to acclimatization rather than physical recovery. Train for fitness, but rely on acclimatization for altitude.",
  },
  {
    question: "What happens if I get sick on Kilimanjaro?",
    answer:
      "Mild AMS (headache, nausea, fatigue) is managed on the mountain with rest, increased fluids, pain relief, and monitoring. Your guide assesses you using the Lake Louise scoring system. If symptoms persist or worsen despite treatment, you descend to a lower camp with a dedicated guide. In rare cases of severe AMS (HACE or HAPE), immediate descent is mandatory — supplemental oxygen is administered and you descend with a full guide team. Our emergency protocols are pre-planned for every camp on every route. Most climbers with mild-to-moderate AMS recover with descent and continue their trek.",
  },
  {
    question: "How long does altitude sickness last on Kilimanjaro?",
    answer:
      "Mild AMS symptoms typically resolve within 12-24 hours if you rest at the same altitude, hydrate well, and allow your body to acclimatize. Many climbers feel their worst on day 2-3 and then improve as their body adapts. If you descend due to moderate AMS, symptoms usually improve significantly within a few hours of reaching a lower elevation. Severe altitude sickness (HACE/HAPE) requires immediate descent and can take days to fully resolve, often requiring medical attention at a lower-altitude hospital.",
  },
];

export default function KilimanjaroAltitudeSicknessPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Altitude Sickness" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Altitude Sickness", url: "/kilimanjaro-altitude-sickness/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Altitude Sickness: Prevention & Treatment",
            description:
              "Complete guide to altitude sickness on Kilimanjaro from guides with 500+ summits. Symptoms, prevention, Diamox protocol, acclimatization strategies, and when to descend.",
            url: "/kilimanjaro-altitude-sickness/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-04",
            modifiedTime: "2026-03-04",
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
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Trekkers ascending Kilimanjaro with guide monitoring for altitude sickness symptoms"
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
              Health &amp; Safety Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Altitude Sickness</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Prevention, symptoms, and treatment — from guides who have managed altitude illness on 500+ summits and hold Wilderness First Responder certification.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                About <strong>75% of climbers experience some altitude symptoms</strong> on Kilimanjaro. Most are mild — headache, nausea, fatigue. <strong>Serious illness (HACE/HAPE) is rare</strong> when you choose a <strong>7+ day route</strong> and listen to your guides. With proper acclimatization, hydration, and experienced guide monitoring, altitude sickness is manageable and should not deter you from climbing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Altitude Sickness? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What Is Altitude Sickness?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Altitude sickness — medically known as <strong>Acute Mountain Sickness (AMS)</strong> — is your body&apos;s reaction to reduced oxygen at higher elevations. At sea level, each breath delivers a full dose of oxygen. At Kilimanjaro&apos;s summit (5,895m), the air pressure is roughly half that at sea level, meaning each breath delivers only about <strong>50% of the oxygen</strong> your body is accustomed to.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              This oxygen deficit triggers a cascade of physiological responses: faster breathing, increased heart rate, altered fluid balance. Your brain — the organ most sensitive to oxygen deprivation — can begin to swell, causing the headaches and confusion associated with severe AMS.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              There are three forms of altitude illness, each progressively more serious:
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AMS (Acute Mountain Sickness)</h3>
                  <p className="text-sm text-[var(--text-muted)]">The most common form. Headache, nausea, fatigue. Uncomfortable but manageable with rest and acclimatization.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">HACE (High Altitude Cerebral Edema)</h3>
                  <p className="text-sm text-[var(--text-muted)]">The brain swells from fluid leakage. Causes confusion, ataxia, and loss of consciousness. Life-threatening — requires immediate descent.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold">HAPE (High Altitude Pulmonary Edema)</h3>
                  <p className="text-sm text-[var(--text-muted)]">Fluid accumulates in the lungs, preventing oxygen exchange. Causes breathlessness at rest, cough with pink sputum. Life-threatening — requires immediate descent.</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> Altitude sickness does not discriminate by fitness level. Marathon runners and elite athletes are just as susceptible as occasional hikers. Your genetic predisposition — how your body responds to reduced oxygen — is the primary factor. This is why slow acclimatization and route choice matter far more than physical fitness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms by Severity */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Symptoms by Severity
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Recognising symptoms early is the key to managing altitude sickness. Our guides are trained to identify these signs before you may notice them yourself.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
            {severityTiers.map((tier) => (
              <div
                key={tier.level}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className={`p-5 border-b ${tier.headerBorder} ${tier.headerBg}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl ${tier.iconBg} flex items-center justify-center`}>
                      <AlertTriangle className={`w-5 h-5 ${tier.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-lg">{tier.level}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.frequency}
                  </span>
                </div>
                <ul className="p-5 space-y-3">
                  {tier.symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <X className={`w-4 h-4 ${tier.iconColor} shrink-0 mt-0.5`} />
                      {symptom}
                    </li>
                  ))}
                </ul>
                <div className={`mx-5 mb-5 p-3 rounded-lg ${tier.headerBg}`}>
                  <p className="text-xs font-semibold">{tier.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Altitude Zones on Kilimanjaro */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Altitude Zones on Kilimanjaro
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Understanding what happens to your body at each elevation band helps you prepare for what lies ahead.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {altitudeZones.map((zone) => (
                <div
                  key={zone.range}
                  className={`bg-white/5 rounded-xl p-6 border ${zone.borderColor}`}
                >
                  <div className={`text-2xl font-bold ${zone.color} mb-1`}>
                    {zone.range}
                  </div>
                  <h3 className="font-semibold mb-1">{zone.name}</h3>
                  <p className="text-xs text-white/50 mb-3">Oxygen: {zone.oxygen}</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              7 Prevention Strategies That Work
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              You cannot eliminate altitude sickness risk entirely, but these evidence-based strategies dramatically reduce the likelihood and severity of AMS.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {preventionStrategies.map((strategy, i) => (
              <div
                key={strategy.title}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <strategy.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{strategy.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {strategy.description}
                  </p>
                  {strategy.link && (
                    <Link
                      href={strategy.link}
                      className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
                    >
                      {strategy.linkText} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamox (Acetazolamide) Guide */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Pill className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Diamox (Acetazolamide) Guide
                </h2>
                <p className="text-[var(--text-muted)] text-sm">What every Kilimanjaro climber should know</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">How Diamox Works</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {diamoxInfo.whatItDoes}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Recommended Dosage</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {diamoxInfo.dosage}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Side Effects</h3>
                <ul className="space-y-2">
                  {diamoxInfo.sideEffects.map((effect) => (
                    <li key={effect} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Prescription &amp; Warnings</h3>
                <ul className="space-y-2">
                  {diamoxInfo.warnings.map((warning) => (
                    <li key={warning} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-800 text-sm font-semibold mb-1">Our Guides&apos; Perspective</p>
                  <p className="text-emerald-800 text-sm">
                    From our experience guiding 500+ Kilimanjaro summits, climbers who take Diamox prophylactically tend to report fewer and milder AMS symptoms, sleep better at altitude, and maintain higher SpO2 readings. We do not push Diamox on anyone — it is a personal decision best made with your doctor — but we encourage climbers to at least obtain a prescription and carry it as a backup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Guides Monitor You */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How Our Guides Monitor You
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our altitude sickness management protocol goes well beyond what most operators provide. Every expedition carries the equipment and expertise to handle altitude emergencies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {guideMonitoring.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/our-guides/"
              className="inline-flex items-center gap-2 text-[var(--secondary)] hover:text-white font-semibold transition-colors"
            >
              Meet our certified guide team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Route Choice & Altitude Sickness */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Route Choice &amp; Altitude Sickness
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The number of days on the mountain is the single biggest factor in preventing altitude sickness. More days means more time for your body to acclimatize. The data is unambiguous.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">Acclimatization</th>
                  <th className="text-left px-4 py-3 font-semibold">Success Rate</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {routeAcclimatization.map((route, i) => (
                  <tr
                    key={route.route}
                    className={`border-t border-[var(--border)] ${
                      route.recommended ? "bg-emerald-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {route.slug ? (
                        <Link href={`/trekking/${route.slug}/`} className="text-[var(--primary)] hover:underline">
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
                    <td className="px-4 py-3">{route.days}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${route.profileColor}`}>
                        {route.profile}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700">{route.successRate}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {route.notes}
                    </td>
                  </tr>
                ))}
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/how-hard-is-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">How Hard Is It?</p>
                <p className="text-xs text-[var(--text-muted)]">Honest difficulty assessment</p>
              </Link>
              <Link href="/can-beginners-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Beginners Guide</p>
                <p className="text-xs text-[var(--text-muted)]">First-time climbers</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 6 routes</p>
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
            Climb Kilimanjaro Safely
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With Wilderness First Responder certified guides, twice-daily health monitoring, emergency oxygen on every climb, and a 93% summit success rate — choose a 7+ day route for the safest possible Kilimanjaro experience.
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
