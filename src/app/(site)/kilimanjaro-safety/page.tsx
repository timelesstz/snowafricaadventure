import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  AlertTriangle,
  Heart,
  Shield,
  TrendingUp,
  Activity,
  ArrowRight,
  Users,
  CheckCircle,
  XCircle,
  Stethoscope,
  ThermometerSun,
  Map,
  FileCheck,
  Syringe,
  BadgeCheck,
  Radio,
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
  title: "Is Kilimanjaro Safe? Complete Safety Guide 2026",
  description:
    "Is climbing Kilimanjaro safe? With experienced guides, proper acclimatization, and emergency protocols, the fatality rate is just 0.03%. Full safety breakdown from 800+ summit expeditions.",
  url: "/kilimanjaro-safety/",
});

const safetyStats = [
  {
    stat: "~0.03%",
    label: "Fatality Rate",
    detail:
      "Approximately 3-10 deaths per ~35,000 climbers annually. Lower than the fatality rate for driving a car in most countries.",
    color: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    stat: "~5%",
    label: "Rescue Rate",
    detail:
      "About 5% of climbers require some form of descent assistance, usually due to altitude sickness symptoms that do not resolve with rest.",
    color: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    stat: "93%+",
    label: "Success Rate (8-Day Routes)",
    detail:
      "The overall average is 65%, but climbers on 8-day routes with reputable operators achieve summit rates above 93%.",
    color: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    stat: "~75%",
    label: "Mild Altitude Symptoms",
    detail:
      "Three-quarters of climbers experience some mild altitude symptoms — headache, nausea, fatigue. These are normal and manageable.",
    color: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    stat: "Zero",
    label: "Technical Climbing Required",
    detail:
      "No ropes, no ice axes, no technical climbing equipment needed on any standard route. Kilimanjaro is a trek, not a technical climb.",
    color: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const realRisks = [
  {
    icon: Activity,
    title: "Altitude Sickness (HACE/HAPE)",
    severity: "PRIMARY RISK",
    severityColor: "bg-red-100 text-red-700",
    description:
      "The number one risk on Kilimanjaro is altitude sickness. At 5,895m, the air contains roughly half the oxygen available at sea level. Your body must adapt, and when it cannot keep up with the rate of ascent, Acute Mountain Sickness (AMS) develops. In rare cases, this progresses to High Altitude Cerebral Edema (HACE) or High Altitude Pulmonary Edema (HAPE), both of which can be fatal if not treated immediately. The solution is straightforward: choose a longer route, ascend slowly, hydrate aggressively, and climb with guides who monitor your vitals twice daily.",
    link: "/kilimanjaro-altitude-sickness/",
    linkText: "Read our complete altitude sickness guide",
  },
  {
    icon: ThermometerSun,
    title: "Weather Exposure",
    severity: "MODERATE RISK",
    severityColor: "bg-orange-100 text-orange-700",
    description:
      "Kilimanjaro spans five climate zones, from tropical rainforest at the base to arctic conditions at the summit. Summit night temperatures regularly drop to -15 to -25 degrees Celsius with wind chill. Hypothermia is a genuine risk for climbers who are poorly equipped or exhausted. Below the summit, afternoon rainstorms in the rainforest and heath zones can soak unprepared trekkers. We provide detailed packing lists and conduct gear checks before departure. In our 800+ expeditions, every case of significant cold exposure we have seen involved climbers who ignored gear recommendations or chose a budget operator that cut corners on equipment.",
    link: "/kilimanjaro-climbing-gear/",
    linkText: "See our recommended gear list",
  },
  {
    icon: Mountain,
    title: "Falls on Steep Terrain",
    severity: "LOW-MODERATE RISK",
    severityColor: "bg-amber-100 text-amber-700",
    description:
      "While Kilimanjaro is not a technical climb, certain sections demand careful footing. The Barranco Wall is a scramble that involves using your hands — it looks intimidating but is straightforward with guide assistance. The summit descent via scree slopes on routes like Mweka can be slippery, especially when fatigued. Loose volcanic gravel on the descent from Stella Point to Barafu Camp catches tired climbers off guard. Our guides position themselves above and below the group on exposed sections and use trekking poles to assist balance. Serious falls are rare but do occur, almost always linked to fatigue and dehydration.",
  },
  {
    icon: Heart,
    title: "Pre-Existing Medical Conditions",
    severity: "VARIABLE RISK",
    severityColor: "bg-orange-100 text-orange-700",
    description:
      "Kilimanjaro places enormous physiological stress on your cardiovascular and respiratory systems. Undiagnosed heart conditions, severe asthma, or uncontrolled high blood pressure can become dangerous at altitude. We require all climbers to complete a health declaration before departure, and we strongly recommend a pre-trip medical examination, especially for climbers over 50. Diabetes, epilepsy, and moderate asthma do not automatically disqualify you, but your doctor needs to understand the altitude profile and advise accordingly.",
  },
  {
    icon: XCircle,
    title: "Budget Operators Cutting Corners",
    severity: "PREVENTABLE RISK",
    severityColor: "bg-red-100 text-red-700",
    description:
      "This is the most preventable risk on Kilimanjaro, and it accounts for a disproportionate number of incidents. Budget operators — those advertising climbs at $1,200-1,500 — frequently cut corners that directly compromise safety: no emergency oxygen, no pulse oximetry, undertrained guides, insufficient food and water, and worn-out tents and sleeping bags. When something goes wrong at 5,000m, the quality of your operator becomes the difference between a managed descent and a tragedy. We have witnessed this firsthand when assisting climbers abandoned by budget crews at high camps.",
    link: "/kilimanjaro-climbing-companies/",
    linkText: "How to choose a safe operator",
  },
];

const safetyProtocols = [
  {
    icon: Activity,
    title: "Twice-Daily Health Monitoring",
    description:
      "Every morning and evening, our guides measure your blood oxygen saturation (SpO2) and heart rate using medical-grade pulse oximeters. We log readings to track trends across the expedition. We also conduct a structured health interview using the Lake Louise Acute Mountain Sickness scoring system — the international standard for altitude illness assessment. A declining SpO2 trend or a Lake Louise score above 5 triggers heightened monitoring. A score above 8 initiates our descent protocol.",
  },
  {
    icon: Shield,
    title: "Emergency Oxygen on Every Expedition",
    description:
      "We carry supplemental oxygen cylinders on every single expedition, regardless of route or group size. Bottled oxygen provides immediate relief during a HACE or HAPE episode and buys critical time during an emergency descent. Many budget operators do not carry oxygen because it adds weight and cost. We consider it non-negotiable — in our years of guiding, emergency oxygen has prevented at least a dozen situations from escalating into medical evacuations.",
  },
  {
    icon: Map,
    title: "Pre-Planned Evacuation Routes",
    description:
      "Before every expedition, our lead guide reviews the emergency evacuation plan for each camp on the route. Every campsite has a designated descent corridor — the fastest safe path to a lower altitude. We carry a stretcher and splints for immobilising injuries. In extreme cases, helicopter evacuation from Kilimanjaro is available and can reach most camps within 60-90 minutes during daylight hours. We maintain current contact details for rescue services and the nearest hospital in Moshi.",
  },
  {
    icon: Users,
    title: "Proper Guide-to-Climber Ratios",
    description:
      "We maintain a maximum ratio of 1 guide for every 2-3 climbers. This ensures that if a climber needs to descend, a dedicated guide can accompany them without leaving the rest of the group unattended. Budget operators commonly run ratios of 1 guide per 6-8 climbers, which means a single illness forces a difficult choice between abandoning the sick climber and leaving the group without a guide. Our ratio is not a luxury — it is a safety requirement.",
  },
  {
    icon: BadgeCheck,
    title: "WFR-Certified Guide Team",
    description:
      "Our lead guides hold Wilderness First Responder (WFR) certification — the gold standard for medical training in remote environments. WFR training covers altitude illness recognition and management, wound care, fracture stabilisation, improvised evacuation, and critical decision-making when hospital access is hours away. This certification requires 80+ hours of hands-on training and recertification every two years. Combined with 15+ years of Kilimanjaro-specific experience, our guides have managed hundreds of altitude incidents.",
    link: "/our-guides/",
    linkText: "Meet our certified guide team",
  },
  {
    icon: Radio,
    title: "Satellite Communication Equipment",
    description:
      "Every expedition carries a satellite phone for communication in areas without mobile coverage. Above the forest zone, mobile signal is unreliable to non-existent on most routes. Our satellite phone allows us to contact rescue services, coordinate helicopter evacuation if needed, and communicate with our base operations team in Moshi who can arrange ambulance and hospital admission. We also carry backup batteries and a GPS locator.",
  },
];

const routeSafetyComparison = [
  {
    route: "Marangu",
    days: "5-6",
    difficulty: "Moderate",
    safetyRating: "Fair",
    ratingColor: "bg-orange-100 text-orange-700",
    hazards:
      "Poor acclimatization on 5-day option. Shared hut accommodation limits flexibility. Steep summit approach.",
  },
  {
    route: "Machame",
    days: "6-7",
    difficulty: "Moderate-Hard",
    safetyRating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    slug: "7-days-machame-route",
    hazards:
      "Barranco Wall scramble requires care. High traffic can cause bottlenecks. 7-day option significantly safer than 6-day.",
  },
  {
    route: "Lemosho",
    days: "7-8",
    difficulty: "Moderate",
    safetyRating: "Excellent",
    ratingColor: "bg-emerald-100 text-emerald-700",
    slug: "8-days-lemosho-route",
    hazards:
      "Best acclimatization profile. Low traffic on early stages. Barranco Wall on day 4-5 when climbers are well-adjusted.",
    recommended: true,
  },
  {
    route: "Rongai",
    days: "6-7",
    difficulty: "Moderate",
    safetyRating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    slug: "6-days-rongai-route",
    hazards:
      "Gradual ascent from the north. Drier conditions. Less technical terrain. Limited escape routes on lower sections.",
  },
  {
    route: "Northern Circuit",
    days: "9",
    difficulty: "Moderate",
    safetyRating: "Best",
    ratingColor: "bg-emerald-100 text-emerald-700",
    hazards:
      "Longest route with best acclimatization. Very low traffic. Remote — evacuation takes longer from the north side.",
  },
  {
    route: "Umbwe",
    days: "6-7",
    difficulty: "Hard",
    safetyRating: "Poor",
    ratingColor: "bg-red-100 text-red-700",
    hazards:
      "Steepest, most direct route. Rapid altitude gain. No acclimatization days. Not recommended for most climbers.",
  },
];

const operatorChecklist = {
  greenFlags: [
    "TATO (Tanzania Association of Tour Operators) membership — legally required, often ignored by fly-by-night operators",
    "KPAP (Kilimanjaro Porters Assistance Project) registered — ensures fair treatment of porters",
    "Guides with Wilderness First Responder or equivalent medical training",
    "Emergency oxygen carried on every expedition as standard",
    "Pulse oximetry and Lake Louise scoring conducted twice daily",
    "Clear, written emergency evacuation protocol",
    "Guide-to-climber ratio of 1:3 or better",
    "Transparent pricing that includes park fees, tips, and all meals",
    "Willing to provide references from recent climbers",
  ],
  redFlags: [
    "Prices significantly below $2,000 for a 7-day climb — they are cutting safety corners somewhere",
    "No emergency oxygen — the single biggest indicator of a dangerous operator",
    "No health monitoring — no pulse oximeter, no daily health checks",
    "Vague answers about guide qualifications or certifications",
    "Pushing 5-day routes as 'the standard' — prioritising cost over safety",
    "No written cancellation or safety policy",
    "Reluctance to share TATO licence number or KPAP registration",
    "Guides who double as porters — overworked staff cannot monitor your health",
  ],
};

const medicalPreparation = [
  {
    icon: Stethoscope,
    title: "Pre-Trip Doctor Visit",
    items: [
      "Schedule a medical examination 8-12 weeks before departure",
      "Discuss the altitude profile: 5 days from 1,800m to 5,895m with limited medical access",
      "Get an ECG if over 50 or if you have any cardiovascular history",
      "Request a Diamox (acetazolamide) prescription — 125-250mg twice daily starting 24-48 hours before ascent",
      "Disclose all current medications and discuss interactions with altitude",
      "Obtain a fitness-to-climb medical clearance letter for your records",
    ],
  },
  {
    icon: Syringe,
    title: "Vaccinations for Tanzania",
    items: [
      "Yellow Fever — required if arriving from an endemic country, recommended for all travellers",
      "Hepatitis A and B — recommended for all travellers to East Africa",
      "Typhoid — recommended, especially if eating outside tourist hotels",
      "Tetanus-Diphtheria booster if not current",
      "Malaria prophylaxis — essential for time spent below 1,800m (Moshi, safari, Zanzibar)",
      "COVID-19 — check current Tanzania entry requirements closer to departure",
    ],
  },
  {
    icon: FileCheck,
    title: "Travel Insurance Requirements",
    items: [
      "Coverage must explicitly include trekking up to 6,000m altitude — standard travel insurance excludes this",
      "Must include emergency helicopter evacuation — a Kilimanjaro helicopter rescue costs $3,000-5,000",
      "Medical repatriation coverage — if hospitalised in Tanzania, you may need air ambulance home",
      "Trip cancellation coverage — protect against illness, injury, or flight disruption",
      "Providers we recommend: World Nomads, Global Rescue, IMG (International Medical Group)",
      "Carry a printed copy of your policy and emergency contact number on the mountain",
    ],
  },
];

const faqs = [
  {
    question: "Is Kilimanjaro safe for beginners?",
    answer:
      "Yes, Kilimanjaro is safe for beginners who prepare properly. It is a trek, not a technical climb — no ropes, no ice axes, no prior mountaineering experience needed. The key for beginners is choosing a longer route (7-8 days) for better acclimatization, training with regular hiking and cardio for 8-12 weeks before departure, and climbing with an experienced operator who provides twice-daily health monitoring. In our 800+ expeditions, we have guided hundreds of first-time trekkers to the summit safely. Beginners actually have one advantage: they tend to listen to their guides more carefully than experienced hikers who overestimate their ability to push through altitude symptoms.",
  },
  {
    question: "Can you die climbing Kilimanjaro?",
    answer:
      "Deaths on Kilimanjaro do occur but are rare — approximately 3-10 per year among roughly 35,000 annual climbers, giving a fatality rate of approximately 0.03%. For context, this is lower than the annual fatality rate for recreational cycling. Almost all deaths are caused by severe altitude sickness (HACE or HAPE) that was not recognised or treated early enough, often involving budget operators who lacked emergency oxygen, trained guides, or health monitoring protocols. With an experienced, licensed operator, a 7+ day route, and twice-daily health monitoring, the risk is extremely low.",
  },
  {
    question: "Do you need ropes to climb Kilimanjaro?",
    answer:
      "No. Kilimanjaro is classified as a non-technical trek on all standard routes. You will not need ropes, ice axes, crampons, or any technical climbing equipment. The most challenging section is the Barranco Wall — a rock scramble that involves using your hands for balance, but it is not exposed or dangerous when guided properly. Summit night is a long, steep hike on scree and rock, but it is walking, not climbing. Trekking poles are highly recommended for balance and to reduce knee strain on the descent.",
  },
  {
    question: "What is the most dangerous part of Kilimanjaro?",
    answer:
      "The most dangerous period is summit night — the push from high camp (typically Barafu Camp at 4,673m or Kibo Hut at 4,703m) to Uhuru Peak at 5,895m. You ascend over 1,200 vertical metres in 6-8 hours through the night in sub-zero temperatures with roughly half the oxygen available at sea level. This is when altitude sickness is most likely to become severe, when hypothermia risk is highest, and when fatigue-related falls are most common. Our guides are most vigilant during this phase, conducting additional SpO2 checks at Stella Point (5,756m) and turning back any climber whose vitals indicate danger.",
  },
  {
    question: "Is Kilimanjaro safe for older climbers?",
    answer:
      "Kilimanjaro has been summited by climbers in their 70s and 80s. Age alone does not disqualify you. However, older climbers should obtain thorough medical clearance including an ECG and stress test, choose the longest route available (8-9 days) for maximum acclimatization time, and climb with an operator that provides comprehensive health monitoring. The physical demands are significant — 5-8 hours of hiking daily for a week — so cardiovascular fitness matters more than age. We recommend climbers over 60 consult with a doctor experienced in altitude medicine and consider a private climb with a dedicated guide rather than a group departure.",
  },
  {
    question: "Do I need travel insurance for Kilimanjaro?",
    answer:
      "Absolutely — and not just any travel insurance. Standard travel policies exclude trekking above 2,500-4,000m, meaning they will not cover you on Kilimanjaro. You need a policy that explicitly covers trekking up to 6,000m altitude, includes emergency helicopter evacuation (a Kilimanjaro helicopter rescue costs $3,000-5,000), and provides medical repatriation. A helicopter evacuation without insurance will cost you out of pocket and may be delayed while payment is arranged. We require all climbers to carry proof of appropriate insurance before departure. Providers like World Nomads, Global Rescue, and IMG offer suitable high-altitude trekking policies.",
  },
  {
    question: "What medical conditions prevent climbing Kilimanjaro?",
    answer:
      "There are no absolute medical disqualifications, but certain conditions significantly increase risk: unstable angina or recent heart attack, severe uncontrolled asthma, pulmonary hypertension, sickle cell disease, and uncontrolled seizure disorders. Conditions that require careful management but do not necessarily prevent a climb include well-controlled diabetes (insulin management changes at altitude), moderate asthma (carry a rescue inhaler), and controlled hypertension. Anyone with a pre-existing condition should consult a doctor experienced in altitude medicine — not just a general practitioner — at least 8 weeks before departure.",
  },
  {
    question: "Is Kilimanjaro safe during rainy season?",
    answer:
      "Kilimanjaro can be climbed year-round, but the two rainy seasons (March-May and November) present additional challenges: slippery trails, reduced visibility, cold wet conditions that increase hypothermia risk, and more cloud cover obscuring summit views. The mountain is not inherently more dangerous during rain — the altitude and acclimatization challenges are the same. However, wet conditions make the Barranco Wall scramble slipperier and the summit approach more uncomfortable. We still guide climbs during the shoulder season (November and early March) when conditions are manageable, but we advise against climbing during the peak of the long rains (April-May) when trails become waterlogged and conditions are consistently miserable.",
  },
  {
    question: "How do guides handle emergencies on Kilimanjaro?",
    answer:
      "Our emergency protocol follows a clear escalation path. At the first sign of trouble, the guide conducts an immediate assessment using pulse oximetry and Lake Louise scoring. For mild symptoms, we administer fluids, pain relief, and rest while increasing monitoring frequency. If symptoms worsen or do not respond to treatment within 4-6 hours, we initiate a managed descent — a dedicated guide accompanies the affected climber to a lower camp while the rest of the group continues with the remaining guide team. For severe altitude illness (HACE or HAPE), we administer emergency oxygen, initiate immediate descent regardless of time of day, and activate satellite phone contact with rescue services. In extreme cases, helicopter evacuation can reach most camps within 60-90 minutes during daylight.",
  },
  {
    question: "Is it safe to climb Kilimanjaro solo?",
    answer:
      "You cannot climb Kilimanjaro without a licensed guide — solo, unguided ascents are prohibited by Kilimanjaro National Park regulations. However, you can book a private climb as a solo traveller with your own guide team. This is actually a safe and popular option. You receive personalised attention, the pace is entirely adapted to your acclimatization, and your guide monitors only you. The cost per person is higher than a group departure, but the experience and flexibility are superior. Alternatively, joining a scheduled group departure provides the safety of numbers — if one person needs to descend, the group still has adequate guide coverage.",
  },
  {
    question: "What safety equipment do guides carry on Kilimanjaro?",
    answer:
      "Our standard safety equipment on every expedition includes: medical-grade pulse oximeters (minimum two per group), supplemental oxygen cylinders with delivery masks, a comprehensive first aid kit with altitude-specific medications (Diamox, Dexamethasone, Nifedipine), a portable stretcher for evacuating immobile climbers, splints for fracture immobilisation, a satellite phone with backup battery, a GPS locator, emergency bivouac shelter, and spare warm clothing. Our guides also carry personal first aid kits. All equipment is inspected before every expedition and replaced on a regular maintenance schedule.",
  },
  {
    question: "How does Kilimanjaro compare to other high-altitude treks in safety?",
    answer:
      "Kilimanjaro is one of the safest high-altitude mountains in the world. Its fatality rate of approximately 0.03% compares favourably with Everest Base Camp trek (approximately 0.05%), Mont Blanc (approximately 0.04%), and is dramatically safer than technical peaks like Denali (approximately 0.3%) or K2 (approximately 4%). The key factors in Kilimanjaro&apos;s favour are: no technical climbing, well-maintained trails, mandatory guide requirement, established rescue infrastructure, and proximity to Kilimanjaro International Airport and hospitals in Moshi. The mountain is well-understood after over a century of guided ascents, and the risks are well-managed by experienced operators.",
  },
];

export default function KilimanjaroSafetyPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Safety Guide" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Safety Guide", url: "/kilimanjaro-safety/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Is Kilimanjaro Safe? Complete Safety Guide 2026",
            description:
              "Is climbing Kilimanjaro safe? With experienced guides, proper acclimatization, and emergency protocols, the fatality rate is just 0.03%. Full safety breakdown from 800+ summit expeditions.",
            url: "/kilimanjaro-safety/",
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
            alt="Kilimanjaro trekkers ascending safely with experienced guides monitoring the group"
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
              Safety &amp; Health Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Is Kilimanjaro <span className="text-[var(--secondary)]">Safe?</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              A complete safety breakdown from guides who have managed risk on 800+ Kilimanjaro summits — covering fatality rates, real risks, emergency protocols, and how to choose an operator that will not cut corners with your life.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                <strong>Yes, Kilimanjaro is safe</strong> when you climb with experienced guides, choose a <strong>7+ day route</strong>, and follow proper acclimatization protocols. The fatality rate is approximately <strong>0.03%</strong> — lower than driving a car. No ropes, no ice axes, no technical climbing required. With twice-daily health monitoring, emergency oxygen on every expedition, and Wilderness First Responder certified guides, the mountain is well-managed and should not deter you from climbing. We strongly recommend starting a <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline font-semibold">structured training plan</Link> 8-12 weeks before departure and securing <Link href="/kilimanjaro-travel-insurance/" className="text-[var(--primary)] hover:underline font-semibold">travel insurance that covers high-altitude trekking</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety by the Numbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Kilimanjaro Safety by the Numbers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Hard data from Kilimanjaro National Park records, the Kilimanjaro Christian Medical Centre, and our own expedition logs spanning 800+ guided climbs.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyStats.map((item) => (
              <div
                key={item.label}
                className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 text-center"
              >
                <div className={`inline-block text-3xl md:text-4xl font-bold px-4 py-2 rounded-xl mb-3 ${item.color}`}>
                  {item.stat}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Real Risks */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The Real Risks on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              We do not sugarcoat risk. After guiding climbers on this mountain for over 15 years, we know exactly what can go wrong, how often it happens, and — most importantly — how to prevent it. Here are the genuine risks, ranked by severity.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-5">
            {realRisks.map((risk) => (
              <div
                key={risk.title}
                className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center shrink-0">
                    <risk.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-lg">{risk.title}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${risk.severityColor}`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {risk.description}
                    </p>
                    {risk.link && (
                      <Link
                        href={risk.link}
                        className="text-sm text-[var(--primary)] hover:underline mt-3 inline-flex items-center gap-1"
                      >
                        {risk.linkText} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Keep You Safe */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How We Keep You Safe
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Safety is not a selling point — it is our operational standard. Every protocol below is followed on every expedition, regardless of route, group size, or price. No exceptions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {safetyProtocols.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="text-sm text-[var(--secondary)] hover:text-white mt-3 inline-flex items-center gap-1 transition-colors"
                  >
                    {item.linkText} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choosing a Safe Operator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Choosing a Safe Operator
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Your choice of operator is the single most impactful safety decision you will make. A reputable operator does not just improve your summit chances — they could save your life. Here is exactly what to look for.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Green Flags */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">What to Look For</h3>
                </div>
                <ul className="space-y-3">
                  {operatorChecklist.greenFlags.map((flag) => (
                    <li key={flag} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flags */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">Red Flags to Avoid</h3>
                </div>
                <ul className="space-y-3">
                  {operatorChecklist.redFlags.map((flag) => (
                    <li key={flag} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Why Local Operators Matter</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                International travel agencies that sell Kilimanjaro treks almost always subcontract to a local Tanzanian operator. You pay a premium, and the agency takes a 30-50% commission before a single dollar reaches the mountain. This means less money for guide wages, food quality, equipment maintenance, and safety provisions.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Booking directly with a licensed local operator like Snow Africa Adventure means 100% of your fee goes to the team on the ground — better-paid guides who stay longer, better food that fuels your climb, newer equipment that keeps you warm, and safety provisions that are not sacrificed to feed a commission chain. Our guides are not contractors — they are full-time team members who have climbed with us for years and know each other&apos;s strengths in an emergency.
              </p>
              <Link
                href="/best-kilimanjaro-tour-operators/"
                className="text-sm text-[var(--primary)] hover:underline mt-3 inline-flex items-center gap-1"
              >
                Compare Kilimanjaro tour operators <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Route Safety Comparison */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Route Safety Comparison
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Not all routes carry the same risk. Longer routes with better acclimatization profiles are fundamentally safer. The data from our 800+ expeditions confirms this consistently.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">Difficulty</th>
                  <th className="text-left px-4 py-3 font-semibold">Safety Rating</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Key Hazards</th>
                </tr>
              </thead>
              <tbody>
                {routeSafetyComparison.map((route, i) => (
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
                    <td className="px-4 py-3">{route.difficulty}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${route.ratingColor}`}>
                        {route.safetyRating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {route.hazards}
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

      {/* Medical Preparation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Medical Preparation
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Proper medical preparation starts 8-12 weeks before your departure. Do not leave these items to the last minute — some vaccinations require multiple doses and Diamox should be tested at home before your trip.
              </p>
            </div>
            <div className="space-y-6">
              {medicalPreparation.map((section) => (
                <div
                  key={section.title}
                  className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-heading font-bold text-lg">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <div>
                <p className="text-amber-800 text-sm font-semibold mb-1">Diamox Consideration</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Diamox (acetazolamide) genuinely aids acclimatization by stimulating faster, deeper breathing. Many altitude medicine specialists recommend it prophylactically for Kilimanjaro. It is a prescription medication — discuss it with your doctor before travel. From our experience, climbers who take Diamox tend to report fewer and milder altitude symptoms and maintain higher blood oxygen readings throughout the trek.{" "}
                  <Link href="/kilimanjaro-altitude-sickness/" className="text-amber-900 underline font-semibold">
                    Read our complete altitude sickness &amp; Diamox guide &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Kilimanjaro Safer Than Most High-Altitude Mountains */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What Makes Kilimanjaro Safer Than Most High-Altitude Mountains
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Kilimanjaro&apos;s safety record is not accidental. Several structural factors make it inherently safer than comparable high-altitude objectives, and understanding these factors should give you confidence in your decision to climb.
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Non-Technical Terrain</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Unlike Mont Blanc, Denali, or any Himalayan peak, Kilimanjaro requires zero technical climbing skill. No glacial travel, no crevasse rescue, no rope work. The trails are well-maintained and clearly marked. The most technical section — the Barranco Wall — is a moderate scramble that our guides have navigated thousands of times.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Mandatory Guide Requirement</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Tanzania requires all Kilimanjaro climbers to be accompanied by a licensed guide. This regulation eliminates the solo, unsupported attempts that cause deaths on unregulated mountains. Every climber has trained eyes watching for trouble. <Link href="/our-guides/" className="text-[var(--primary)] hover:underline font-semibold">Our guide team</Link> holds Wilderness First Responder certification and has managed hundreds of altitude incidents across 800+ expeditions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Proximity to Medical Facilities</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Moshi and Arusha — both with hospitals experienced in altitude-related emergencies — are within 2-3 hours of any trailhead. Kilimanjaro Christian Medical Centre (KCMC) is one of East Africa&apos;s leading teaching hospitals. Compare this with Everest Base Camp, which is a 10-day trek from the nearest road, or Denali, which requires bush plane access.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Established Rescue Infrastructure</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The mountain has helicopter rescue capability, ranger stations, and well-established evacuation corridors. Park rangers conduct regular patrols and maintain communication networks. In an emergency, help is hours away, not days.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2">Over a Century of Guided Climbing History</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The first recorded summit was in 1889, and the mountain has been guided commercially since the early 1900s. This means the routes, weather patterns, altitude challenges, and rescue protocols are exceptionally well-understood. Local guides like our team have generations of accumulated mountain knowledge passed from mentor to apprentice.
                </p>
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
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
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
              <Link href="/kilimanjaro-climbing-gear/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Gear</p>
                <p className="text-xs text-[var(--text-muted)]">Essential packing list</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Map className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 6 routes</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-safety/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb Kilimanjaro with Confidence
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            TATO licensed. Wilderness First Responder certified guides. Twice-daily health monitoring. Emergency oxygen on every climb. 93%+ summit success rate on 8-day routes. Over 500 safe summits and counting.
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
