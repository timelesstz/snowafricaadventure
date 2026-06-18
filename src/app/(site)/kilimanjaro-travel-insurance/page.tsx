import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mountain,
  ArrowRight,
  Heart,
  DollarSign,
  FileText,
  Phone,
  Plane,
  Search,
  Clock,
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
  title: "Kilimanjaro Travel Insurance: What You Need",
  description:
    "Essential Kilimanjaro travel insurance guide: coverage for 6,000m altitude, emergency evacuation, trip cancellation. What to look for and recommended providers.",
  url: "/kilimanjaro-travel-insurance/",
});

const coverageChecklist = [
  {
    icon: Mountain,
    title: "High-Altitude Trekking to 6,000m+",
    description:
      "This is the most critical item. Many standard adventure policies cap altitude cover at 3,000m or 4,000m. Kilimanjaro's summit is 5,895m. If your policy does not explicitly state coverage to at least 6,000m, you are not covered for the summit push — the exact point where you are most likely to need help.",
    critical: true,
  },
  {
    icon: Plane,
    title: "Emergency Helicopter Evacuation",
    description:
      "Helicopter evacuation from Kilimanjaro costs $3,000 to $5,000 or more depending on the pickup location and conditions. Your policy must cover emergency air evacuation without sub-limits or caps that fall below the actual cost. Some policies cover evacuation but only to a local hospital — ensure yours covers evacuation to your home country if needed.",
    critical: true,
  },
  {
    icon: Heart,
    title: "Medical Expenses (at Least $100,000)",
    description:
      "Tanzania has limited high-altitude medical infrastructure. Serious altitude illness may require treatment at Kilimanjaro Christian Medical Centre (KCMC) in Moshi, or transfer to Nairobi or even repatriation to your home country. Ensure your policy covers at least $100,000 in medical expenses — $250,000 or more is preferable for peace of mind.",
  },
  {
    icon: DollarSign,
    title: "Trip Cancellation &amp; Interruption",
    description:
      "A Kilimanjaro climb represents a significant financial investment — typically $2,000 to $6,000+ depending on the route and operator. Trip cancellation cover reimburses non-refundable costs if you cannot travel due to illness, injury, family emergency, or other covered reasons. Trip interruption covers the unused portion if you must leave the mountain early.",
  },
  {
    icon: FileText,
    title: "Personal Gear &amp; Equipment",
    description:
      "Kilimanjaro trekking gear — quality boots, down jacket, sleeping bag, trekking poles — can easily total $1,000 to $2,000. Gear cover protects against loss, theft, or damage during transit and on the mountain. Check whether your policy covers rental equipment as well, particularly if you have rented a sleeping bag rated for extreme cold.",
  },
  {
    icon: Plane,
    title: "Repatriation",
    description:
      "In the worst-case scenario, repatriation cover ensures your body or remains are transported home. It also covers the cost of a medical escort if you are evacuated but cannot travel alone. Repatriation from Tanzania to Europe or North America can cost $10,000 to $30,000 without insurance.",
  },
  {
    icon: Search,
    title: "Search &amp; Rescue",
    description:
      "While rare on Kilimanjaro thanks to well-established trail systems and mandatory guides, search and rescue operations can be triggered if a climber becomes separated from their group. Some policies specifically exclude SAR costs — check that yours includes them.",
  },
];

const exclusions = [
  {
    title: "Altitude Cap Below 6,000m",
    description:
      "The single most common issue. Budget travel insurance and many mainstream adventure policies cap altitude coverage at 3,000m, 4,000m, or 5,000m. Since Kilimanjaro's summit sits at 5,895m, you need a policy that explicitly covers trekking to at least 6,000m. If the policy says 'hiking' or 'trekking' without specifying an altitude limit, call the insurer and get written confirmation.",
    severity: "critical",
  },
  {
    title: "Professional Mountaineering Exclusion",
    description:
      "Some adventure policies distinguish between 'trekking' and 'mountaineering.' Kilimanjaro is a trek — no ropes, technical climbing, or specialist equipment required — but some insurers classify anything above 5,000m as mountaineering. Read the fine print carefully. If the policy excludes 'professional mountaineering,' confirm that non-technical high-altitude trekking is covered.",
    severity: "high",
  },
  {
    title: "Pre-Existing Medical Conditions",
    description:
      "Many policies exclude claims related to pre-existing conditions unless you declare them at the time of purchase and pay an additional premium. This is especially important for climbers with asthma, heart conditions, diabetes, or any respiratory illness. Failure to disclose a pre-existing condition can void your entire policy — not just altitude-related claims.",
    severity: "high",
  },
  {
    title: "Adventure Sports Exclusion",
    description:
      "Standard travel insurance typically lists 'adventure sports' as an exclusion or an optional add-on. Kilimanjaro trekking almost always falls under this category. If your base policy does not include adventure sports, you will need to purchase an add-on or upgrade to an adventure-specific policy.",
    severity: "medium",
  },
  {
    title: "Country &amp; Region Exclusions",
    description:
      "A small number of policies exclude certain countries or regions. While Tanzania is rarely excluded, it is worth checking — particularly with policies from providers who primarily serve domestic or European markets. Also confirm that your policy covers you for the entire trip, including any connecting stops in Kenya, Ethiopia, or other transit countries.",
    severity: "medium",
  },
];

const insuranceTypes = [
  {
    name: "World Nomads",
    type: "Adventure Travel Insurance",
    bestFor: "General adventure travellers and trekkers",
    notes:
      "One of the most popular options for Kilimanjaro climbers. Offers altitude trekking cover as part of their adventure activities list. Available to purchase after you have already left home. Check the specific altitude limit on your plan — the Explorer plan typically covers higher altitudes than the Standard plan.",
  },
  {
    name: "Global Rescue",
    type: "Evacuation &amp; Rescue Specialist",
    bestFor: "Climbers who want best-in-class evacuation cover",
    notes:
      "Specialises in emergency evacuation and field rescue. They coordinate the entire evacuation chain — from the mountain to the hospital to your home. Often recommended by expedition companies for high-altitude treks. Their advisory membership provides 24/7 access to military-grade evacuation coordination.",
  },
  {
    name: "BMC (British Mountaineering Council)",
    type: "Mountaineering-Specific Insurance",
    bestFor: "UK-based climbers and mountaineers",
    notes:
      "Purpose-built for mountain activities with no altitude cap issues. Available to BMC members (membership is open to all, not just UK residents). Covers trekking, mountaineering, and climbing worldwide. One of the most straightforward policies for Kilimanjaro as high-altitude trekking is their core business.",
  },
  {
    name: "IMG (International Medical Group)",
    type: "International Medical &amp; Travel Insurance",
    bestFor: "US-based climbers and longer trips",
    notes:
      "Offers comprehensive international medical insurance with adventure sport add-ons. Strong medical expense cover and evacuation benefits. Particularly well-suited for US-based travellers who need robust medical cover in East Africa. Check their iTravelInsured product line for adventure-specific cover.",
  },
];

const evacuationSteps = [
  {
    step: 1,
    title: "Guide Makes the Call",
    description:
      "Your lead guide assesses the situation using pulse oximetry, the Lake Louise scoring system, and their years of field experience. When a climber's condition requires evacuation — severe AMS symptoms, suspected HACE or HAPE, a serious injury, or any condition that is not improving with on-mountain treatment — the guide initiates the evacuation protocol. This decision is never delayed and never overruled.",
  },
  {
    step: 2,
    title: "Stretcher Descent to Pickup Point",
    description:
      "The mountain crew carries the climber by stretcher to the nearest evacuation-accessible point. Each route has pre-identified helicopter landing zones and vehicle access points. On most routes, this means descending to a lower camp or clearing where a helicopter can safely land. Our porters and assistant guides are trained in stretcher evacuation techniques and can cover ground quickly even on rough terrain.",
  },
  {
    step: 3,
    title: "Helicopter Evacuation (Weather Permitting)",
    description:
      "A helicopter is dispatched from Moshi or Arusha to the designated pickup point. Flight time is typically 15 to 30 minutes depending on location. However, helicopter evacuation is weather-dependent — cloud cover, high winds, or darkness can delay pickup. In these cases, the stretcher descent continues to a lower altitude or to the gate. This is one reason why having guides who can manage a patient during an extended descent is critical.",
  },
  {
    step: 4,
    title: "Transfer to KCMC Hospital",
    description:
      "The climber is transferred to Kilimanjaro Christian Medical Centre (KCMC) in Moshi — the nearest hospital with the facilities and expertise to treat altitude-related illness. KCMC has an emergency department, intensive care, and specialist physicians experienced with altitude cases. For conditions beyond their capabilities, onward transfer to Nairobi or medical repatriation is arranged.",
  },
  {
    step: 5,
    title: "Insurance Handles the Costs",
    description:
      "With proper travel insurance, the costs — helicopter ($3,000-$5,000+), hospital treatment, potential repatriation — are covered by your insurer. Most good policies operate an emergency assistance hotline that coordinates directly with the hospital and evacuation providers. Without insurance, you or your family will need to guarantee payment upfront before treatment or evacuation can proceed. This is not a situation anyone wants to navigate from a hospital bed in a foreign country.",
  },
];

const policyChoiceSteps = [
  {
    step: 1,
    title: "Check the Altitude Coverage",
    description:
      "This is the non-negotiable first step. Search the policy document for altitude, elevation, or height limits. You need explicit coverage to at least 6,000 metres (19,685 feet). If the policy mentions 'trekking' without a number, call the insurer. Get written confirmation — verbal assurances are worthless when you are filing a claim from a hospital in Moshi.",
  },
  {
    step: 2,
    title: "Verify Emergency Evacuation Is Included",
    description:
      "Look for emergency evacuation, emergency transportation, or medical transport in the policy benefits. Check the benefit limit — it should be at least $50,000, though $100,000 or more is better. Confirm that helicopter evacuation is specifically included, not just ambulance transfer. Some policies limit evacuation to the 'nearest adequate medical facility' — ensure this includes air evacuation if required.",
  },
  {
    step: 3,
    title: "Read the Adventure Sports Fine Print",
    description:
      "Find the activities list or adventure sports schedule in the policy. Kilimanjaro trekking should be explicitly listed, or 'high-altitude trekking above 5,000m' should be covered. If your activity is not on the list, you are not covered — regardless of what the marketing materials suggest. Some policies require you to add adventure sports as a paid upgrade.",
  },
  {
    step: 4,
    title: "Declare Pre-Existing Conditions",
    description:
      "Be completely honest about your medical history. Undeclared pre-existing conditions are the most common reason insurers deny altitude-related claims. This includes conditions you may consider minor — controlled asthma, mild hypertension, past heart issues, anxiety or depression on medication. The small additional premium is insignificant compared to an uncovered $50,000 evacuation bill.",
  },
  {
    step: 5,
    title: "Keep Policy Documents Accessible",
    description:
      "Save your policy number, emergency assistance phone number, and a digital copy of your full policy on your phone, in your email, and in your daypack. Give a copy to your travel companion and to your guide. On Kilimanjaro, mobile reception is intermittent — do not rely solely on a cloud-stored document. Your guide needs to be able to provide the insurer's details when coordinating an evacuation.",
  },
];

const faqs = [
  {
    question: "Do I need travel insurance for Kilimanjaro?",
    answer:
      "Yes — travel insurance is essential and we require proof of cover from every climber before the trek begins. Kilimanjaro is a high-altitude environment where altitude sickness, injuries, and weather-related incidents can occur. Emergency helicopter evacuation costs $3,000 to $5,000+, and hospital treatment in Tanzania is not free for foreign nationals. Without insurance, you bear these costs entirely out-of-pocket. Beyond medical emergencies, insurance protects your financial investment in the trip itself through cancellation and interruption cover.",
  },
  {
    question: "Does normal travel insurance cover Kilimanjaro?",
    answer:
      "No — standard travel insurance almost never covers Kilimanjaro. Most basic policies exclude adventure sports entirely, or cap altitude coverage at 3,000m to 4,000m. Kilimanjaro's summit is 5,895m, well above these limits. You need a specialist adventure travel insurance policy or a mountaineering policy that explicitly covers high-altitude trekking to at least 6,000m. Always check the altitude limit, adventure sports clause, and evacuation benefits before purchasing.",
  },
  {
    question: "How much does Kilimanjaro travel insurance cost?",
    answer:
      "Adventure travel insurance for Kilimanjaro typically costs between $80 and $300 for a two-week trip, depending on your age, country of residence, trip duration, and the level of cover you choose. Higher medical expense limits, better evacuation cover, and trip cancellation benefits increase the premium. This is a small fraction of the total trip cost ($2,000-$6,000+ for the climb alone) and provides essential financial protection. Prices change regularly — compare quotes from multiple providers for current rates.",
  },
  {
    question: "What altitude coverage do I need for Kilimanjaro?",
    answer:
      "You need a policy that covers trekking to at least 6,000 metres (19,685 feet). Kilimanjaro's summit — Uhuru Peak — sits at 5,895m. A 6,000m coverage limit provides a small buffer and is the standard threshold for Kilimanjaro-appropriate insurance. Some climbers opt for policies covering up to 7,000m or higher, which also covers future treks to destinations like Everest Base Camp (5,364m) or Aconcagua (6,961m). Policies capped at 5,000m or below will not cover you during the summit push.",
  },
  {
    question: "Does insurance cover helicopter evacuation on Kilimanjaro?",
    answer:
      "Yes, if your policy includes emergency evacuation benefits — but you must check the specific terms. Some policies cover evacuation to the nearest hospital only, while others cover evacuation to your home country. Helicopter evacuation on Kilimanjaro typically involves flying the patient from a landing zone on the mountain to Moshi or Arusha, then transferring to KCMC hospital. The cost runs $3,000 to $5,000+ depending on the pickup altitude and conditions. Ensure your policy's evacuation benefit limit covers this amount.",
  },
  {
    question: "What if I have a pre-existing medical condition?",
    answer:
      "You must declare all pre-existing conditions when purchasing your policy. Most adventure insurers will cover pre-existing conditions for an additional premium — the cost depends on the condition and its severity. Failing to declare a condition can void your entire policy, not just claims related to that condition. Common conditions that require declaration include asthma, diabetes, heart conditions, hypertension, and any condition for which you take regular medication. Even if your condition is well-controlled, declare it. The additional premium is minimal compared to the risk of an uncovered claim.",
  },
  {
    question: "Can I buy insurance after booking my climb?",
    answer:
      "Yes — you can purchase travel insurance at any time before your trip, though buying sooner is better. If you buy within 14 to 21 days of your initial trip deposit, many policies offer enhanced cancellation benefits (including 'cancel for any reason' upgrades). Trip cancellation cover typically only applies to events that occur after the policy purchase date, so buying early maximises your protection window. Some providers like World Nomads allow you to buy or extend cover even after you have already left home.",
  },
  {
    question: "What is the Flying Doctor service?",
    answer:
      "The Flying Doctor Service is an emergency air evacuation service operated by AMREF (African Medical and Research Foundation) in East Africa. They provide emergency air ambulance services across Tanzania and Kenya, including helicopter evacuation from remote locations like Kilimanjaro. Snow Africa Adventure includes Flying Doctor registration with every climb — this provides an additional layer of evacuation support alongside your personal travel insurance. It covers emergency evacuation to the nearest appropriate medical facility.",
  },
  {
    question: "What happens if my climb is cancelled due to weather?",
    answer:
      "Weather-related cancellations on Kilimanjaro are extremely rare — the mountain is trekked year-round and climbs very rarely need to be called off entirely due to weather. If severe weather does force a cancellation or early descent, your trip interruption insurance should cover the unused portion of your trip. If the entire trip is cancelled before departure due to a natural disaster or government travel advisory, trip cancellation cover applies. Note that 'I do not want to climb in the rain' is not a covered reason — cancellation cover applies to unforeseen events beyond your control.",
  },
  {
    question: "Do I need insurance if I am trekking with a guide company?",
    answer:
      "Absolutely — in fact, reputable guide companies require it. Trekking with an experienced operator like Snow Africa reduces risk significantly through professional guides, health monitoring, emergency oxygen, and established evacuation protocols. However, no operator can prevent all medical emergencies. Your guide company's responsibility is safe guiding and emergency management — the financial cost of evacuation, hospital treatment, trip cancellation, and repatriation is your responsibility, covered by your personal insurance policy. We require proof of adequate insurance before every climb.",
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
    href: "/kilimanjaro-safety/",
    icon: Shield,
    title: "Kilimanjaro Safety",
    subtitle: "Safety protocols",
  },
  {
    href: "/kilimanjaro-altitude-sickness/",
    icon: Heart,
    title: "Altitude Sickness",
    subtitle: "Prevention & treatment",
  },
  {
    href: "/kilimanjaro-prices/",
    icon: DollarSign,
    title: "Kilimanjaro Prices",
    subtitle: "Cost breakdown",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: FileText,
    title: "Climbing Gear",
    subtitle: "Packing list",
  },
  {
    href: "/best-route-to-climb-kilimanjaro/",
    icon: Search,
    title: "Best Route Guide",
    subtitle: "Compare all routes",
  },
  {
    href: "/trekking/",
    icon: Users,
    title: "Trekking Routes",
    subtitle: "All Kilimanjaro routes",
  },
];

export default function KilimanjaroTravelInsurancePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Travel Insurance" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Travel Insurance", url: "/kilimanjaro-travel-insurance/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Travel Insurance: What You Need",
            description:
              "Essential Kilimanjaro travel insurance guide: coverage for 6,000m altitude, emergency evacuation, trip cancellation. What to look for and recommended providers.",
            url: "/kilimanjaro-travel-insurance/",
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
            alt="Trekkers ascending Kilimanjaro with guide — proper travel insurance is essential for high-altitude climbing"
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
              Essential Planning Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Travel Insurance</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              What your policy must cover, common exclusions to avoid, and how to choose the right insurance for a 5,895m altitude trek — from a team that has managed hundreds of mountain emergencies.
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
                Travel insurance is essential for Kilimanjaro — <strong>we require it for all climbers</strong>. You need a policy that covers <strong>high-altitude trekking to at least 6,000m</strong>, emergency helicopter evacuation, trip cancellation, and medical expenses. <strong>Standard travel insurance does NOT cover Kilimanjaro</strong> — you need a specific adventure or mountaineering policy. Budget $80 to $300 for a comprehensive policy that could save you $50,000+ in an emergency. Already sorted? Start planning your{" "}
                <Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">route</Link> and{" "}
                <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline font-semibold">training</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need Kilimanjaro Insurance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Why You Need Kilimanjaro Travel Insurance
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro travel insurance is not optional — it is a fundamental part of responsible climb preparation. We have seen what happens when climbers arrive without adequate cover, and it creates unnecessary stress, delays, and financial hardship at the worst possible moment.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Emergency helicopter evacuation from Kilimanjaro costs <strong>$3,000 to $5,000 or more</strong>, depending on the pickup altitude and weather conditions. Hospital treatment at Kilimanjaro Christian Medical Centre (KCMC) in Moshi is not free for foreign nationals. A multi-day hospital stay with specialist treatment can run into thousands of dollars. Medical repatriation to Europe or North America — flying home with a medical escort — can cost <strong>$10,000 to $30,000</strong>.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Beyond medical emergencies, your Kilimanjaro trip represents a significant financial investment. Between flights, the climb itself, accommodation, and{" "}
                <Link href="/kilimanjaro-climbing-gear/" className="text-[var(--primary)] hover:underline font-semibold">gear</Link>, most climbers have $4,000 to $10,000 committed. See our{" "}
                <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline font-semibold">full cost breakdown</Link>{" "}for a realistic budget. Trip cancellation insurance protects that investment if illness, injury, a family emergency, or other unforeseen events prevent you from travelling.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <p className="text-red-800 text-sm">
                <strong>We require proof of adequate travel insurance from every climber before the trek begins.</strong> This is not a suggestion — it is a condition of climbing with Snow Africa Adventure. Climbers without insurance that meets our minimum requirements will not be permitted to start the trek. This policy exists to protect you and your fellow climbers.
              </p>
            </div>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              For a comprehensive overview of the risks and how we manage them on the mountain, read our{" "}
              <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline font-semibold">
                Kilimanjaro safety guide
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* What Your Policy Must Cover */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Your Policy Must Cover
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Not all travel insurance is created equal. For Kilimanjaro, your policy needs to include every item on this checklist — missing even one can leave you exposed.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {coverageChecklist.map((item, i) => (
              <div
                key={item.title}
                className={`flex gap-5 rounded-xl p-6 border ${
                  item.critical
                    ? "bg-amber-50 border-amber-200"
                    : "bg-white border-[var(--border)]"
                }`}
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.critical ? "bg-amber-100" : "bg-emerald-100"
                  }`}>
                    <item.icon className={`w-6 h-6 ${
                      item.critical ? "text-amber-600" : "text-emerald-600"
                    }`} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                    {item.critical && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                        Critical
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Policy Exclusions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Common Policy Exclusions to Watch For
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              These are the exclusions that catch Kilimanjaro climbers off guard. Read your policy document carefully — not just the marketing summary — and look specifically for these red flags.
            </p>
            <div className="space-y-4">
              {exclusions.map((exclusion) => (
                <div
                  key={exclusion.title}
                  className={`rounded-xl p-6 border ${
                    exclusion.severity === "critical"
                      ? "bg-red-50 border-red-200"
                      : exclusion.severity === "high"
                      ? "bg-orange-50 border-orange-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle className={`w-5 h-5 shrink-0 ${
                      exclusion.severity === "critical"
                        ? "text-red-600"
                        : exclusion.severity === "high"
                        ? "text-orange-600"
                        : "text-amber-600"
                    }`} />
                    <h3 className="font-heading font-bold text-lg">{exclusion.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      exclusion.severity === "critical"
                        ? "bg-red-100 text-red-700"
                        : exclusion.severity === "high"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {exclusion.severity === "critical"
                        ? "Most Common Issue"
                        : exclusion.severity === "high"
                        ? "High Risk"
                        : "Check This"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {exclusion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Insurance Types */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Recommended Insurance Providers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              These providers are well-known among Kilimanjaro climbers and mountaineers. We do not endorse any specific provider — always compare quotes and read the policy documents yourself. Prices and coverage terms change regularly.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {insuranceTypes.map((provider) => (
              <div
                key={provider.name}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-[var(--border)] bg-emerald-50">
                  <h3 className="font-heading font-bold text-xl mb-1">{provider.name}</h3>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {provider.type}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    <strong>Best for:</strong> {provider.bestFor}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {provider.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="bg-white border border-[var(--border)] rounded-xl p-5 inline-block max-w-2xl">
              <p className="text-sm text-[var(--text-muted)]">
                <strong>Important:</strong> We do not receive commissions from any insurance provider. These recommendations are based on our experience with hundreds of climbers over 15+ years. Always compare multiple quotes, read the full policy wording, and confirm altitude coverage in writing before purchasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens If You Need Evacuation */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                What Happens If You Need Evacuation
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Understanding the evacuation process helps you appreciate why insurance is non-negotiable. For more on how our team handles emergencies, see our{" "}
                <Link href="/kilimanjaro-safety/" className="text-[var(--secondary)] hover:underline font-semibold">safety protocols</Link> and{" "}
                <Link href="/kilimanjaro-altitude-sickness/" className="text-[var(--secondary)] hover:underline font-semibold">altitude sickness guide</Link>. Here is exactly what happens when a climber needs to be evacuated from Kilimanjaro.
              </p>
            </div>
            <div className="space-y-4">
              {evacuationSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-5"
                >
                  <div className="w-12 h-12 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-[var(--secondary)] font-bold text-xl">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flying Doctor Service */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Plane className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Flying Doctor Service
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Included with every Snow Africa climb</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Snow Africa Adventure includes registration with the <strong>AMREF Flying Doctor Service</strong> on every Kilimanjaro climb at no additional cost. AMREF operates the largest air ambulance network in East Africa, providing emergency air evacuation across Tanzania and Kenya.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The Flying Doctor Service provides an additional layer of evacuation support alongside your personal travel insurance. If you need emergency air evacuation, AMREF can deploy a fixed-wing air ambulance or helicopter to transfer you to the nearest appropriate medical facility — typically KCMC in Moshi or a specialist hospital in Nairobi.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-semibold mb-1">Emergency Air Evacuation</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Fixed-wing and helicopter evacuation to the nearest appropriate medical facility in Tanzania or Kenya.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-semibold mb-1">24/7 Emergency Coordination</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Round-the-clock operations centre that coordinates with our guides, local hospitals, and your insurance provider.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-semibold mb-1">East Africa Coverage</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Covers the entire duration of your time in Tanzania and Kenya, including safari extensions and Zanzibar travel.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-semibold mb-1">Complements Your Insurance</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Works alongside your personal travel insurance — not a replacement. Provides the physical evacuation capability that your insurance pays for.
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <div>
                <p className="text-emerald-800 text-sm font-semibold mb-1">Important Note</p>
                <p className="text-emerald-800 text-sm">
                  The Flying Doctor Service is a valuable safety net, but it is <strong>not a substitute for personal travel insurance</strong>. AMREF covers emergency evacuation logistics, but your travel insurance covers the broader costs: hospital treatment, ongoing medical care, trip cancellation, repatriation, gear loss, and personal liability. You need both. For other logistics, see our{" "}
                  <Link href="/kilimanjaro-visa-tanzania/" className="text-emerald-700 hover:underline font-semibold">Tanzania visa guide</Link> and{" "}
                  <Link href="/kilimanjaro-airport-guide/" className="text-emerald-700 hover:underline font-semibold">airport arrival guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose the Right Policy */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How to Choose the Right Policy
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Follow these five steps to ensure your policy actually covers what you need on Kilimanjaro. Do not skip any of them — we have seen claims denied for each of these oversights.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {policyChoiceSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-700 font-bold text-xl">{item.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[var(--surface)] rounded-xl border border-[var(--border)] group">
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
      <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{guide.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-travel-insurance/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb Kilimanjaro With Confidence
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With Flying Doctor Service included on every climb, experienced guides carrying emergency oxygen, and twice-daily health monitoring — choose Snow Africa for the safest possible Kilimanjaro experience. Just make sure your insurance is sorted before you arrive.
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
