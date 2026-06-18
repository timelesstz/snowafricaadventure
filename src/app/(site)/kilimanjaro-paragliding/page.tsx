import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Wind,
  Shield,
  Clock,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Plane,
  FileCheck,
  Thermometer,
  Users,
  Camera,
  Info,
  Star,
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
  title: "Kilimanjaro Paragliding: Fly From the Summit",
  description:
    "Can you paraglide off Kilimanjaro? Yes — experienced pilots have launched from near the summit. Requirements, logistics, permits, and how to arrange this extreme adventure.",
  url: "/kilimanjaro-paragliding/",
});

const flightDetails = [
  {
    label: "Launch Elevation",
    value: "5,700 – 5,895m",
    icon: Mountain,
    description: "Stella Point or near Uhuru Peak",
  },
  {
    label: "Landing Elevation",
    value: "~1,800m",
    icon: MapPin,
    description: "Designated landing zones near base",
  },
  {
    label: "Flight Duration",
    value: "30 – 60 min",
    icon: Clock,
    description: "Versus 2 days descending on foot",
  },
  {
    label: "Altitude Drop",
    value: "~4,000m",
    icon: Wind,
    description: "Through all five climate zones",
  },
];

const requirements = [
  {
    icon: Star,
    title: "Advanced Paragliding Experience",
    description:
      "This is not a flight for beginners or intermediate pilots. You need a minimum USHPA P3 (Intermediate) rating or BHPA Club Pilot equivalent, with significant high-altitude and cross-country flying experience. Most pilots who have successfully launched from Kilimanjaro hold P4 (Advanced) ratings and have logged 200+ hours. Mountain flying — with its rotor, turbulence, and unpredictable thermals — is a different discipline from coastal soaring.",
  },
  {
    icon: FileCheck,
    title: "TANAPA Special Activity Permit",
    description:
      "Tanzania National Parks Authority (TANAPA) must issue a Special Activity Permit for any paragliding flight within the national park boundary. This is separate from your standard climbing permit and must be applied for at least 6 months in advance through an authorised Tanzanian operator. Permits are reviewed case by case and are not guaranteed. TANAPA may impose specific conditions regarding launch windows, landing zones, and safety requirements.",
  },
  {
    icon: Plane,
    title: "Your Own Equipment",
    description:
      "There is no paragliding equipment available for hire on Kilimanjaro. You must bring your own wing, harness, reserve parachute, helmet, variometer, and radio. Equipment must be rated for high-altitude flight where thinner air affects wing performance and stall speeds increase. Porters will carry your equipment to the summit — expect an additional 8-12 kg beyond standard climbing gear.",
  },
  {
    icon: DollarSign,
    title: "Additional Guide &amp; Porter Fees",
    description:
      "Your climbing operator will charge supplementary fees for the specialised logistics: additional porters to carry paragliding equipment, a guide experienced in supporting paragliding departures, extended summit-day scheduling to accommodate weather windows, and coordination with TANAPA rangers. Expect $800-$1,500 in additional guide and porter fees on top of standard climbing costs.",
  },
  {
    icon: Thermometer,
    title: "Suitable Weather Window",
    description:
      "Successful launches require specific conditions: wind speed below 15 km/h at the summit, minimal cloud cover below the launch point, stable air without aggressive thermals or rotors, and visibility sufficient to identify landing zones from altitude. These conditions may only present for 1-2 hours on any given morning, and some summit days offer no safe window at all. You must be prepared to descend on foot if conditions do not cooperate.",
  },
  {
    icon: Shield,
    title: "Specialised Insurance Coverage",
    description:
      "Standard travel insurance and even most adventure sports policies exclude paragliding above 4,000m. You need a policy that explicitly covers high-altitude paragliding in East Africa. Providers like Global Rescue, World Nomads (with adventure sports add-on), or specialist aviation underwriters can provide appropriate coverage. Without this, a rescue or medical evacuation could cost $10,000-$50,000 out of pocket.",
  },
];

const costBreakdown = [
  { item: "Standard Kilimanjaro climb (7-8 days)", cost: "$2,800 – $4,500", note: "Operator, guides, permits, camping" },
  { item: "TANAPA Special Activity Permit", cost: "$500 – $1,000", note: "Varies; reviewed case by case" },
  { item: "Additional porter fees (equipment)", cost: "$300 – $500", note: "8-12 kg extra gear weight" },
  { item: "Guide supplement &amp; coordination", cost: "$500 – $1,000", note: "Extended summit schedule, TANAPA liaison" },
  { item: "Specialised insurance", cost: "$200 – $500", note: "High-altitude paragliding cover" },
  { item: "Equipment transport to Tanzania", cost: "$200 – $500", note: "Oversize baggage, airline fees" },
];

const alternatives = [
  {
    title: "Paragliding Near Moshi",
    description:
      "Several operators offer paragliding flights from the hills surrounding Moshi town at 1,500-2,000m elevation. These flights provide spectacular views of Kilimanjaro without the extreme altitude risks, complex permit requirements, or months of advance planning. Flights typically last 20-30 minutes and are available year-round.",
    suitable: "All experience levels (tandem available)",
    cost: "$150 – $300 per flight",
  },
  {
    title: "Tandem Paragliding Flights",
    description:
      "If you want the thrill of paragliding near Kilimanjaro but lack the solo experience, tandem flights with a certified pilot are available at lower altitudes around Moshi and Arusha. You fly as a passenger while the pilot handles everything. No experience required — just a willingness to run off a hillside.",
    suitable: "Complete beginners welcome",
    cost: "$180 – $350 per flight",
  },
  {
    title: "Scenic Flights Over Kilimanjaro",
    description:
      "Charter a light aircraft or helicopter from Arusha for a scenic flyover of Kilimanjaro. You will see the glaciers, the crater rim, and the Western Breach from above without setting foot on the mountain. Flights depart from Arusha Airport and last 45-90 minutes depending on the route chosen.",
    suitable: "Anyone — no fitness required",
    cost: "$400 – $1,200 per person",
  },
];

const risks = [
  {
    title: "Reduced Wing Performance at Altitude",
    description:
      "At 5,895m, air density is roughly half that at sea level. Your wing generates less lift, stall speed increases by approximately 30%, and handling becomes sluggish. The margin between controlled flight and a stall narrows dramatically. Pilots accustomed to sea-level flying may find their wing behaves very differently at extreme altitude.",
  },
  {
    title: "Unpredictable Mountain Thermals",
    description:
      "Kilimanjaro creates its own weather systems. Thermals can be violent and unpredictable, particularly on the southern slopes where solar heating creates strong updrafts by mid-morning. Rotor turbulence behind ridgelines and sudden wind shifts at altitude transitions between climate zones add further complexity. Weather can change within minutes.",
  },
  {
    title: "Limited Emergency Landing Zones",
    description:
      "The upper slopes of Kilimanjaro are volcanic scree, ice fields, and rocky terrain — none of which are suitable for emergency landings. Below the summit zone, dense vegetation in the heath and forest zones makes emergency put-downs dangerous. Your flight path must be planned to reach designated clear landing areas, with contingency options at each altitude band.",
  },
  {
    title: "Altitude-Impaired Decision Making",
    description:
      "At summit altitude, your cognitive function is reduced by 20-30%. Reaction times slow, judgement becomes impaired, and spatial awareness diminishes. These are the same conditions that contribute to HACE. Launching a paraglider — which demands rapid, precise decision-making — while hypoxic adds a layer of risk that does not exist at lower altitudes.",
  },
  {
    title: "Rescue Complexity",
    description:
      "If you land in an unplanned location on Kilimanjaro, rescue is neither quick nor simple. Helicopter rescue above 4,000m is unreliable due to thin air affecting rotor performance. Ground rescue teams may need hours or days to reach you depending on terrain. Your radio and GPS must work, and your operator must have a rescue plan filed with TANAPA before launch.",
  },
];

const faqs = [
  {
    question: "Can anyone paraglide off Kilimanjaro?",
    answer:
      "No. This is exclusively for experienced, certified paraglider pilots with significant high-altitude flying hours. You need a minimum P3/Intermediate rating (P4/Advanced strongly recommended), mountain flying experience, and the physical fitness to summit Kilimanjaro while carrying additional equipment. Tandem flights from the summit are not available — the logistics, weight, and risk make them impractical at this altitude.",
  },
  {
    question: "How much does it cost to paraglide off Kilimanjaro?",
    answer:
      "Budget $5,000 to $8,000 or more for the complete experience. This includes the standard climbing package ($2,800-$4,500), TANAPA Special Activity Permit ($500-$1,000), additional porter and guide fees ($800-$1,500), specialised high-altitude paragliding insurance ($200-$500), and equipment transport costs ($200-$500). Costs vary by operator, route length, and group size.",
  },
  {
    question: "Do you need a special permit to paraglide on Kilimanjaro?",
    answer:
      "Yes. Tanzania National Parks Authority (TANAPA) must issue a Special Activity Permit for any paragliding within the national park. This is separate from the standard climbing permit and must be applied for at least 6 months in advance through a licensed Tanzanian operator. Permits are reviewed individually and approval is not guaranteed. TANAPA may attach specific conditions regarding timing, safety equipment, and landing zones.",
  },
  {
    question: "Is paragliding off Kilimanjaro legal?",
    answer:
      "Yes, it is legal with proper authorisation. TANAPA has approved paragliding flights from Kilimanjaro on multiple occasions. However, flying without a Special Activity Permit is illegal and could result in prosecution, fines, confiscation of equipment, and a ban from Tanzanian national parks. Always work through an authorised operator who manages the permit process.",
  },
  {
    question: "How long is the paragliding flight from the summit?",
    answer:
      "Flights typically last 30 to 60 minutes depending on conditions, thermal activity, and the pilot&apos;s chosen flight path. By comparison, the standard descent from the summit on foot takes approximately 5-7 hours to reach high camp, and a full additional day to reach the gate. The paragliding descent covers the same 4,000m altitude drop in under an hour.",
  },
  {
    question: "Can you do a tandem paragliding flight from the summit?",
    answer:
      "Tandem flights from the summit are not practically available. The additional weight of a passenger, the larger tandem wing required, the complexity of a tandem launch on steep volcanic scree at extreme altitude, and the increased risk profile make tandem flights from near Uhuru Peak impractical. Tandem paragliding is available at lower altitudes near Moshi and Arusha for those who want a paragliding experience near Kilimanjaro.",
  },
  {
    question: "What is the best time of year for Kilimanjaro paragliding?",
    answer:
      "The best windows are during the dry seasons: January to mid-March and June to October. These months offer the most stable weather, clearest skies, and most predictable wind patterns. July through September tends to provide the most consistent summit-day conditions. Avoid the rainy seasons (March-May and November) when cloud cover, precipitation, and unpredictable thermals make safe launches extremely unlikely.",
  },
  {
    question: "What happens if conditions are not safe to launch?",
    answer:
      "You descend on foot, just like every other climber. Weather windows at the summit are unpredictable, and there is no guarantee that conditions will be suitable for paragliding on your summit day. Experienced Kilimanjaro paragliders plan for this contingency — mentally and logistically. Your porters carry your equipment down, and you walk. This is why mental flexibility and realistic expectations are essential for this adventure.",
  },
  {
    question: "Has anyone died paragliding off Kilimanjaro?",
    answer:
      "There are no widely documented fatalities from permitted paragliding flights off Kilimanjaro. However, the number of completed flights is very small — likely fewer than 50 documented successful launches in the mountain&apos;s history. The low fatality count reflects extreme selectivity (only the most experienced pilots attempt it) and TANAPA&apos;s cautious permitting approach, not an absence of risk. The dangers are real and serious.",
  },
  {
    question: "Do I need to carry my own paragliding equipment up the mountain?",
    answer:
      "You bring your own equipment to Tanzania, but porters carry it up the mountain. Your paragliding kit (wing, harness, reserve, helmet, instruments) adds approximately 8-12 kg to the expedition load. You will need additional porters — typically 1-2 extra — dedicated to carrying this equipment. The gear is transported in protective bags and you should personally inspect it at each camp to ensure nothing has been damaged in transit.",
  },
];

export default function KilimanjaroParaglidingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Paragliding" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Paragliding", url: "/kilimanjaro-paragliding/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Paragliding: Fly From the Summit",
            description:
              "Can you paraglide off Kilimanjaro? Yes — experienced pilots have launched from near the summit. Requirements, logistics, permits, and how to arrange this extreme adventure.",
            url: "/kilimanjaro-paragliding/",
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
              "Extreme Adventure Specialist",
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
            alt="Paraglider launching from near the summit of Mount Kilimanjaro with glaciers visible"
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
              Extreme Adventure
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Paragliding</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Fly from the roof of Africa. A handful of experienced pilots have launched from near Uhuru Peak and soared 4,000 metres down through five climate zones — the most dramatic descent on the planet.
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
                <strong>Yes, you can paraglide off Kilimanjaro</strong> — but it is exceptionally rare and demands serious preparation. Fewer than 50 documented flights have been completed from near the summit. You need <strong>advanced paragliding certification</strong>, a <strong>TANAPA Special Activity Permit</strong> applied for 6+ months ahead, your own high-altitude rated equipment, and a budget of <strong>$5,000-$8,000+</strong>. The flight itself lasts 30-60 minutes and replaces a gruelling 2-day descent on foot. It is a once-in-a-lifetime experience — but only for pilots who genuinely have the skills, preparation, and risk tolerance to attempt it safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History of Kilimanjaro Paragliding */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              History of Kilimanjaro Paragliding
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Paragliding from Kilimanjaro is not a new concept, but it remains extraordinarily uncommon. The first documented paragliding descents from the mountain date back to the early 2000s, when a small number of European pilots — most with extensive Alpine flying experience and a rigorous <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline font-semibold">physical training plan</Link> — obtained special permission from Tanzanian authorities to attempt flights from the summit zone.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              In 2005, a team of Austrian pilots completed one of the earliest widely reported flights, launching from Stella Point (5,756m) and landing near the Marangu Gate after approximately 45 minutes of flight. Their footage, showing the transition from glacial ice fields through alpine desert, moorland, and rainforest, brought international attention to the possibility.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Since then, a handful of pilots have repeated the feat. In 2012, a French expedition launched from close to Uhuru Peak itself, achieving what is believed to be the highest paragliding launch point on the mountain. More recently, pilots have used the flight to set personal records or raise funds for conservation causes — the dramatic footage proving irresistible for documentary filmmakers and sponsors.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              What has not changed is the rarity. TANAPA treats each application individually, the weather window is narrow, and the pilot qualifications required are genuinely elite. In any given year, the number of successful paragliding descents from Kilimanjaro can likely be counted on one hand — if any occur at all. This is not an activity that has been commercialised or made routine, and that exclusivity is part of its appeal.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Notable record:</strong> Kilimanjaro paragliding flights have been featured in multiple adventure documentaries and are considered among the most challenging non-competitive paragliding flights in the world due to the combination of extreme altitude launch, rapidly changing air density, and the sheer vertical descent involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              How Kilimanjaro Paragliding Works
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The process combines a standard Kilimanjaro summit climb with a paragliding departure on summit day. You climb the mountain exactly as every other trekker does — spending 7-8 days ascending through the rainforest, moorland, alpine desert, and arctic zones. Your porters carry your paragliding equipment alongside the usual camping and climbing gear.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              On summit night, you depart for the peak between midnight and 2 AM, just like every other climber. You reach the summit — typically Stella Point (5,756m) or Uhuru Peak (5,895m) — at dawn. This is where your experience diverges from the standard itinerary.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Instead of beginning the long walk down, you assess conditions. If the wind, visibility, and thermals are favourable, you unpack your wing, lay it out on the volcanic scree, clip into your harness, and launch. The launch site is steep and exposed — volcanic loose rock at nearly 6,000 metres. There is no flat runway. You inflate your wing and run downhill until the air catches.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Once airborne, you fly south or south-east, descending through all five of Kilimanjaro&apos;s climate zones in a single continuous flight. The glaciers and crater rim fall away behind you. The scree gives way to desert, then moorland, then dense forest canopy below your feet. You land in a pre-designated clearing near the base of the mountain, where a vehicle and your team are waiting. The entire flight — covering what takes other climbers two full days of painful downhill trekking — is over in 30 to 60 minutes.
            </p>

            {/* Flight Stats */}
            <div className="grid sm:grid-cols-2 gap-4">
              {flightDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="bg-white rounded-xl border border-[var(--border)] p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <detail.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">{detail.label}</p>
                      <p className="font-bold text-lg">{detail.value}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What You Need to Paraglide Off Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              This is not a booking-and-go adventure. Every requirement below is non-negotiable, and skipping any one of them will result in your flight being cancelled — or worse.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {requirements.map((req, i) => (
              <div
                key={req.title}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <req.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{req.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Flight */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The Flight: Summit to Base
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                A descent that takes two days on foot, compressed into under an hour of flight through five climate zones.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 text-[var(--secondary)]">Phase 1: The Launch (5,700-5,895m)</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  You lay out your wing on volcanic scree at the summit. The air is thin — roughly 50% of sea-level density — and your wing feels sluggish during inflation. You run downhill on loose rock, each step uncertain, until the wing catches enough air to lift you. The first few seconds are the most critical: commit fully or abort. There is no halfway. Once airborne, the crater rim and the remnants of Kilimanjaro&apos;s glaciers spread out behind you. The silence — after hours of gasping up the mountain — is surreal.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 text-[var(--secondary)]">Phase 2: The Alpine Desert (4,000-5,700m)</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  As you descend, air density increases and your wing comes alive. Control authority improves noticeably every few hundred metres. Below you, the barren grey-brown scree of the alpine desert stretches in every direction. Thermals begin to form as the morning sun heats the dark volcanic rock. You must navigate these carefully — catching the right thermal can extend your flight magnificently, but an unexpected column of rising air can collapse your wing if you enter it unprepared.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 text-[var(--secondary)]">Phase 3: Moorland &amp; Forest (1,800-4,000m)</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The transition is visible and dramatic. Grey rock gives way to green — first the giant heathers and lobelias of the moorland, then the dense canopy of the montane rainforest. The air is thicker, warmer, more humid. Your wing is now flying at near-normal performance. Below, you can see the trails you spent days hiking — tiny dots of colour that are other trekkers. The landing zone emerges: a cleared area near the base, possibly a field or a designated clearing where your ground team is visible. You set up your approach, manage your airspeed, and land.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics & Planning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Logistics &amp; Planning
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Arranging a Kilimanjaro paragliding expedition is nothing like booking a standard trek. The planning timeline is measured in months, not weeks, and the coordination between your climbing operator, TANAPA, and your own preparation requires meticulous attention.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-heading font-bold text-lg mb-3">6+ Months Before: Permit Application</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Your Tanzanian operator submits the TANAPA Special Activity Permit application on your behalf. This requires your paragliding qualifications, flight log, insurance documentation, equipment specifications, proposed launch and landing sites, and a detailed safety plan. TANAPA reviews each application individually. Begin this process as early as possible — 8-12 months is not excessive. Rejections or requests for additional information are common and can add weeks to the timeline.
                </p>
              </div>

              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-heading font-bold text-lg mb-3">3-4 Months Before: Route &amp; Logistics</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Choose a 7-8 day route with the best summit-day weather probability. The <Link href="/climbing-kilimanjaro/" className="text-[var(--primary)] hover:underline">Lemosho</Link> and Machame routes are preferred because their south-side approach aligns with prevailing wind patterns for launch. Confirm additional porters, coordinate equipment transport logistics, and finalise your ground-team plan for the landing zone. Your operator handles vehicle positioning and radio communication protocols.
                </p>
              </div>

              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-heading font-bold text-lg mb-3">1-2 Months Before: Equipment &amp; Insurance</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Service your wing and harness. Replace any lines or components that are not in perfect condition — you will not have access to repair facilities on the mountain. Confirm your insurance policy explicitly names high-altitude paragliding in Tanzania. Arrange oversize baggage with your airline. Pack your equipment in protective bags that can withstand being carried on porters&apos; heads through five days of trekking.
                </p>
              </div>

              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-heading font-bold text-lg mb-3">Summit Day: Weather Contingency</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  You must be psychologically prepared to descend on foot. <Link href="/kilimanjaro-weather/" className="text-[var(--primary)] hover:underline">Weather on Kilimanjaro</Link> is never guaranteed, and summit-day conditions suitable for paragliding are a bonus, not a certainty. Your guide and TANAPA ranger have final authority on whether the launch proceeds. If conditions are marginal, do not push it — the mountain will be there for another attempt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risks & Safety */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Risks &amp; Safety
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Paragliding from Kilimanjaro combines the risks of extreme-altitude mountaineering with the risks of paragliding in unpredictable mountain conditions. Neither set of risks should be minimised.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {risks.map((risk) => (
              <div
                key={risk.title}
                className="bg-white rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">{risk.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {risk.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <div>
                <p className="text-red-800 text-sm font-semibold mb-1">Insurance Is Non-Negotiable</p>
                <p className="text-red-800 text-sm">
                  Your <Link href="/kilimanjaro-travel-insurance/" className="underline font-semibold">travel insurance</Link> must explicitly cover paragliding at altitudes above 5,000m in Tanzania. Standard adventure sports policies typically exclude this. Contact specialist providers like Global Rescue or speak directly with underwriters to confirm your coverage. A rescue from Kilimanjaro&apos;s upper slopes could cost $20,000-$50,000 without appropriate insurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Cost Breakdown
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Paragliding off Kilimanjaro is a premium experience. Budget $5,000-$8,000+ for the complete expedition including the climb, permits, equipment logistics, and insurance.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Expense</th>
                  <th className="text-left px-4 py-3 font-semibold">Estimated Cost</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`border-t border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <td className="px-4 py-3 font-medium">{row.item}</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">{row.cost}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[var(--primary)] bg-emerald-50">
                  <td className="px-4 py-3 font-bold">Total Estimated Budget</td>
                  <td className="px-4 py-3 font-bold text-emerald-700 text-lg">$5,000 – $8,000+</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">Varies by operator, route, group size</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            This does not include international flights to Tanzania, personal paragliding equipment, or pre-trip training costs. For a full breakdown of standard climbing costs, see our <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro prices guide</Link>.
          </p>
        </div>
      </section>

      {/* Alternatives */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Alternatives to Summit Paragliding
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              If launching from near 6,000 metres is beyond your experience level or risk tolerance, there are excellent paragliding and aerial options near Kilimanjaro that still deliver spectacular experiences.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {alternatives.map((alt) => (
              <div
                key={alt.title}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Wind className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-3">{alt.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {alt.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-[var(--text-muted)]">{alt.suitable}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-700">{alt.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is It Worth It? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Is Kilimanjaro Paragliding Worth It?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              If you have the skills, the patience for the logistics, and the budget — this is among the most extraordinary adventure experiences available on Earth. Flying from the summit of Africa&apos;s highest peak through five distinct climate zones, covering a 4,000-metre altitude drop in under an hour, produces footage and memories that no other experience can match.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The view from a paraglider at 5,800 metres is fundamentally different from the view at the summit on foot. You see the mountain from above, the glaciers retreating behind you, the curvature of the crater rim, and the vast plains of Tanzania stretching to the horizon. The silence — broken only by the whisper of wind through your lines — contrasts viscerally with the gasping, exhausting final hours of the summit push.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              You also skip the descent. Two days of knee-punishing, toe-bruising downhill walking — the part of Kilimanjaro that every climber dreads — replaced by 30-60 minutes of flight. For experienced paragliders, this alone justifies the additional cost and complexity.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              But be honest with yourself. If you hold a P2 rating and 50 hours of flying time, this is not the flight to push your boundaries. If you have never flown above 3,000 metres, Kilimanjaro is not the place to find out how you handle thin air. If you cannot afford the insurance, you cannot afford the risk. This experience rewards those who approach it with respect, preparation, and the genuine ability to execute safely. For those pilots — it is absolutely worth it.
            </p>
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <Camera className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <div>
                <p className="text-emerald-800 text-sm font-semibold mb-1">The Footage Is Incredible</p>
                <p className="text-emerald-800 text-sm">
                  Mount a GoPro on your helmet or wing, and you will capture footage that no amount of money can buy through any other means. The transition from glacial ice to tropical forest in a single continuous shot is visually stunning and has powered multiple award-winning adventure documentaries. For content creators and filmmakers, this angle on Kilimanjaro is unmatched.
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
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/kilimanjaro-safety/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Safety Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Risk &amp; preparation</p>
              </Link>
              <Link href="/kilimanjaro-weather/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Wind className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Weather Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Conditions &amp; seasons</p>
              </Link>
              <Link href="/kilimanjaro-travel-insurance/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <FileCheck className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Travel Insurance</p>
                <p className="text-xs text-[var(--text-muted)]">Coverage essentials</p>
              </Link>
              <Link href="/kilimanjaro-records/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Star className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Records &amp; Firsts</p>
                <p className="text-xs text-[var(--text-muted)]">Notable achievements</p>
              </Link>
              <Link href="/trekking/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <MapPin className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Trekking Routes</p>
                <p className="text-xs text-[var(--text-muted)]">All route options</p>
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Group Departures</p>
                <p className="text-xs text-[var(--text-muted)]">Scheduled climbs</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-paragliding/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Plan Your Kilimanjaro Adventure
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Whether you are planning a paragliding descent or a standard summit trek, our guides have 800+ summits of experience. Start with choosing the right route — the foundation of every successful Kilimanjaro expedition.
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
