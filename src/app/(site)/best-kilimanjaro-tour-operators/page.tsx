import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Award,
  Star,
  Users,
  Check,
  ChevronDown,
  AlertTriangle,
  Mountain,
  DollarSign,
  Search,
  Heart,
  ClipboardCheck,
  Stethoscope,
  MessageCircle,
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
  title: "Best Kilimanjaro Tour Operators 2026",
  description:
    "How to choose the best Kilimanjaro tour operator. 7 criteria that matter: TATO license, KPAP membership, success rates, reviews, transparent pricing, guide ratios, and emergency equipment.",
  url: "/best-kilimanjaro-tour-operators/",
});

const criteria = [
  {
    icon: Shield,
    number: "01",
    title: "TATO License",
    subtitle: "Tanzania Association of Tour Operators",
    description:
      "TATO membership is the minimum legal requirement for any tour operator in Tanzania. It proves the company is registered with the government, carries proper insurance, and meets baseline industry standards. An operator without a TATO license is operating illegally — full stop. Always ask for the license number and verify it independently. Legitimate operators display their license number on their website, in email footers, and on printed materials. If an operator hesitates or cannot produce a TATO number, walk away immediately.",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Heart,
    number: "02",
    title: "KPAP Membership",
    subtitle: "Kilimanjaro Porters Assistance Project",
    description:
      "The Kilimanjaro Porters Assistance Project monitors how operators treat their porters — the men and women who carry your gear, set up camp, cook your meals, and make the entire climb possible. KPAP partners commit to fair wages (above the KINAPA minimum), proper clothing and sleeping equipment for porters, load limits under 20kg, and access to medical care. Your climb should never come at the cost of someone else's wellbeing. Operators who are not KPAP members may pay porters as little as $3-5 per day — far below a living wage.",
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
  },
  {
    icon: Mountain,
    number: "03",
    title: "KINAPA Registration",
    subtitle: "Kilimanjaro National Park Authority",
    description:
      "Only operators registered with KINAPA are legally authorized to conduct climbs on Mount Kilimanjaro. KINAPA registration means the operator's guides have completed mountain-specific training, passed examinations on altitude sickness management, and hold valid guide identification cards. KINAPA-certified guides understand acclimatization protocols, emergency descent procedures, and mountain-specific first aid. An unregistered operator may send uncertified guides who lack the training to recognize and respond to altitude emergencies — putting your life at risk.",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Award,
    number: "04",
    title: "Verified Success Rate",
    subtitle: "Realistic rates between 85-95%",
    description:
      "A legitimate operator will quote a summit success rate between 85% and 95%, depending on the route and duration. The Machame and Lemosho routes typically see 85-90% on 7-day itineraries and 90-95% on 8+ day itineraries. Any operator claiming a 98% or 99% success rate is almost certainly inflating their numbers. The overall Kilimanjaro success rate across all operators is approximately 65% — so a rate above 90% already indicates excellent guiding. Be skeptical of perfection. Ask how they calculate their success rate: do they count turnarounds due to weather? Do they include Stella Point as a summit, or only Uhuru Peak?",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    icon: Star,
    number: "05",
    title: "Review Quality & Volume",
    subtitle: "TripAdvisor, SafariBookings, Google Reviews",
    description:
      "Reviews are the most transparent indicator of an operator's real performance. Look for operators with at least 50 reviews across multiple platforms — TripAdvisor, SafariBookings, and Google. Read the detailed reviews, not just the star rating. Pay attention to mentions of guide quality, food quality, equipment condition, communication before the trip, and how problems were handled. A cluster of short, generic five-star reviews posted in a short time period is a red flag for purchased reviews. Genuine reviews are detailed, mention specific guides by name, and describe both positives and minor negatives honestly.",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    icon: DollarSign,
    number: "06",
    title: "Transparent Pricing",
    subtitle: "Itemized costs, no hidden fees",
    description:
      "A trustworthy operator provides a fully itemized quote that clearly breaks down park fees, rescue fees, camping fees, crew wages, food, equipment, transfers, and any other costs. Hidden fees are one of the most common complaints in the industry — you book at one price, then discover additional charges for oxygen, porter tips, hotel nights, or airport transfers. The best operators publish their pricing openly on their website and include everything except personal gear and optional tips. If an operator cannot provide a written, itemized breakdown before you pay a deposit, that is a serious warning sign.",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    icon: Users,
    number: "07",
    title: "Guide-to-Climber Ratio",
    subtitle: "1 guide per 2-3 climbers is ideal",
    description:
      "The guide-to-climber ratio directly affects your safety and summit chances. With a 1:2 ratio, your guide can monitor your condition closely, adjust pace individually, and respond immediately to altitude sickness symptoms. Budget operators often run 1:8 or even 1:10 ratios — meaning a single guide is responsible for monitoring ten climbers at different fitness levels in extreme altitude conditions. That is not safe. The ideal ratio is 1:2 for challenging routes like Umbwe and the Western Breach, and 1:3 for standard routes like Machame and Lemosho. Always confirm the ratio before booking.",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
];

const redFlags = [
  {
    flag: "No TATO License Number on Website",
    detail:
      "Legitimate operators display their TATO license prominently. If you cannot find it on their website, in their email signature, or in their booking materials, there is a good chance they are not licensed at all. This is the single most important verification step you can take.",
  },
  {
    flag: "Anonymous Ownership",
    detail:
      "A company that does not name its founders, guides, or management team on its website is hiding something. The best operators are proud to put faces and names to their business. Anonymous ownership makes it impossible to verify experience or hold anyone accountable if something goes wrong.",
  },
  {
    flag: "Success Rates Over 98%",
    detail:
      "Kilimanjaro is a serious mountain. Weather, altitude sickness, and individual fitness mean that even the best operators will have some clients who do not summit. A 98%+ claim is almost certainly fabricated. Honest operators report rates between 85% and 95% depending on route and duration.",
  },
  {
    flag: "No Physical Office in Tanzania",
    detail:
      "Any company operating Kilimanjaro climbs should have a physical, verifiable address in Arusha or Moshi. Companies that only have a website and a WhatsApp number — with no physical presence — have no accountability if something goes wrong during your climb.",
  },
  {
    flag: "Prices Below $1,500 for a 6+ Day Climb",
    detail:
      "Park fees alone for a 6-day Machame route climb cost approximately $700 per person. Add crew wages, food, equipment, and transport, and the minimum legitimate cost is well above $1,500. Operators charging less are cutting corners on safety equipment, food quality, or — most commonly — porter wages.",
  },
  {
    flag: "No Emergency Evacuation Plan",
    detail:
      "Ask specifically: what emergency equipment do you carry? What is the evacuation protocol if a climber develops severe altitude sickness at 5,000m? Operators who cannot answer these questions clearly and specifically are not prepared for emergencies that happen on Kilimanjaro every single week.",
  },
  {
    flag: "Pressure to Book Immediately",
    detail:
      "High-pressure sales tactics — limited-time discounts, claims that dates are almost full, or insistence on immediate deposits — are hallmarks of operators who rely on impulse bookings rather than reputation. A confident, established operator will give you time to research and compare without pressure.",
  },
];

const reviewTips = [
  {
    title: "Look for Specific Details",
    description:
      "The best reviews mention guide names, specific meals, equipment quality, and day-by-day experiences. Generic reviews that say 'great trip, highly recommend' without any detail are less useful — and more likely to be fabricated.",
  },
  {
    title: "Check for Safety Mentions",
    description:
      "Read negative reviews carefully. Are there mentions of missing safety equipment, untrained guides, overloaded porters, or inadequate food? A single negative review about safety is worth more than fifty positive reviews about scenery.",
  },
  {
    title: "Find Reviewers Like You",
    description:
      "Filter for reviews from people with similar demographics — age, fitness level, and climbing experience. A 25-year-old marathon runner and a 55-year-old first-time hiker will have very different experiences with the same operator.",
  },
  {
    title: "Cross-Reference Platforms",
    description:
      "Check TripAdvisor, SafariBookings, Google Reviews, and Trustpilot. An operator with 500 TripAdvisor reviews but zero Google reviews, or vice versa, deserves scrutiny. Genuine operators accumulate reviews organically across all platforms over time.",
  },
];

const snowAfricaCredentials = [
  { label: "TATO License", value: "034263", description: "Verified and active — you can confirm this directly with TATO" },
  { label: "KPAP Member", value: "Yes", description: "Committed to fair porter wages, proper equipment, and load limits" },
  { label: "KINAPA Registered", value: "Yes", description: "All guides hold KINAPA mountain guide certification" },
  { label: "Summit Success Rate", value: "93%", description: "Honest, verified across all routes — calculated from Uhuru Peak summits only" },
  { label: "TripAdvisor Rating", value: "4.9/5", description: "115+ reviews with zero negative reviews" },
  { label: "SafariBookings Rating", value: "5.0/5", description: "75 reviews — one of the highest-rated operators on the platform" },
  { label: "Guide Ratio", value: "1:2", description: "One guide for every two climbers on all routes, every climb" },
  { label: "Founded By", value: "Florent", description: "Co-Founder & Safari Expert — locally owned and operated from Arusha" },
];

const emergencyEquipment = [
  "Pulse oximeter for twice-daily blood oxygen monitoring",
  "Emergency supplemental oxygen (carried on every climb above 4,000m)",
  "Portable Gamow bag (hyperbaric chamber) for severe altitude sickness",
  "Comprehensive first aid kit with altitude-specific medication",
  "Helicopter evacuation protocol with pre-arranged rescue contacts",
  "Satellite phone for communication in areas without cell coverage",
  "All guides trained in mountain-specific first aid and emergency descent",
];

const costComparison = [
  {
    tier: "Budget Operators",
    range: "$1,500 - $2,000",
    color: "border-orange-200 bg-orange-50",
    headerColor: "bg-orange-100 text-orange-800",
    items: [
      "Basic shared camping equipment — often old or worn tents",
      "Minimal food variety — basic carbohydrates, limited fresh ingredients",
      "High guide-to-climber ratios (1:6 to 1:10)",
      "Emergency oxygen not always included",
      "Porter welfare often below KPAP standards",
      "Limited or no acclimatization monitoring equipment",
      "Communication gaps — slow response times before and during climb",
    ],
    verdict:
      "Budget operators serve a market, but the cost savings come directly from safety, food, equipment, and — most critically — porter welfare. If you are spending $1,500 on a once-in-a-lifetime climb, the additional $500-1,000 for a reputable operator is the best investment you can make.",
  },
  {
    tier: "Mid-Range Operators",
    range: "$2,000 - $3,000",
    color: "border-blue-200 bg-blue-50",
    headerColor: "bg-blue-100 text-blue-800",
    items: [
      "Quality private tents and sleeping mats",
      "Three meals per day plus snacks and hot drinks",
      "Reasonable guide ratios (1:3 to 1:5)",
      "Emergency oxygen and pulse oximeters included",
      "KPAP compliant porter treatment",
      "Daily acclimatization checks with pulse oximeter",
      "Responsive communication — typically reply within 24 hours",
    ],
    verdict:
      "This is the sweet spot for most climbers. A well-run mid-range operator provides everything you need for a safe, comfortable climb without luxury extras. Snow Africa Adventure operates in this range, delivering premium-level safety and service at mid-range pricing because we are a local operator with no middleman markup.",
  },
  {
    tier: "Premium Operators",
    range: "$3,500 - $5,000+",
    color: "border-emerald-200 bg-emerald-50",
    headerColor: "bg-emerald-100 text-emerald-800",
    items: [
      "Luxury expedition tents with camp furniture",
      "Chef-prepared multi-course meals with dietary accommodations",
      "1:1 or 1:2 guide ratios with assistant guides",
      "Full medical kit with portable hyperbaric chamber",
      "Private toilet tent and washing facilities",
      "Comprehensive medical monitoring with trained paramedic",
      "Dedicated trip coordinator — concierge-level service",
    ],
    verdict:
      "Premium operators add luxury and comfort to the mountain experience. The core safety elements — qualified guides, emergency equipment, acclimatization protocols — are the same as a good mid-range operator. The premium price pays for comfort extras and a more exclusive experience.",
  },
  {
    tier: "International Agencies",
    range: "20-40% Markup",
    color: "border-gray-200 bg-gray-50",
    headerColor: "bg-gray-100 text-gray-800",
    items: [
      "Market the trip from overseas, outsource the climb to a local operator",
      "Add 20-40% commission on top of the local operator's price",
      "Communication goes through an intermediary — not the actual climbing team",
      "Less flexibility for itinerary changes or special requests",
      "Your money is split between the agency and the operator who actually runs your climb",
      "Quality depends entirely on which local operator they subcontract to",
      "You lose the direct relationship with the people on the mountain",
    ],
    verdict:
      "International agencies can be a convenient booking option, but you pay a significant premium for that convenience. The same climb, with the same local operator, costs 20-40% less when you book directly. You also get a direct relationship with the team who will actually guide you on the mountain.",
  },
];

const questionsToAsk = [
  {
    question: "What is your TATO license number?",
    why: "This verifies they are legally registered. No license number means no legal accountability.",
  },
  {
    question: "How many climbers per guide on my climb?",
    why: "A ratio better than 1:4 is good. 1:2 is ideal. Anything worse than 1:6 is a safety concern.",
  },
  {
    question: "What emergency equipment do you carry?",
    why: "At minimum: pulse oximeter, supplemental oxygen, first aid kit. Premium operators also carry a Gamow bag.",
  },
  {
    question: "What is your actual summit success rate?",
    why: "Ask how they calculate it. Does it count Stella Point or only Uhuru Peak? Is it across all routes or just the easiest?",
  },
  {
    question: "How much do you pay your porters per day?",
    why: "KPAP recommends a minimum daily wage. Ethical operators are transparent about porter compensation.",
  },
  {
    question: "Can I see your reviews on TripAdvisor and SafariBookings?",
    why: "An operator who directs you to their reviews is confident in their reputation. Evasion is a red flag.",
  },
  {
    question: "Are all park fees included in the quoted price?",
    why: "Park fees, rescue fees, and camping fees should be included. Hidden fees after booking are a common complaint.",
  },
  {
    question: "What happens if I need to descend early due to altitude sickness?",
    why: "This reveals their emergency protocols. Good operators have clear descent plans and evacuation contacts ready.",
  },
  {
    question: "What meals are provided and can you accommodate dietary requirements?",
    why: "Nutrition at altitude is critical for summit success. Good operators provide varied, energy-dense meals.",
  },
  {
    question: "Will I meet my guide before the climb starts?",
    why: "Reputable operators arrange a pre-climb briefing where you meet your guide and go through the itinerary together.",
  },
];

const faqs = [
  {
    question: "What is the best Kilimanjaro tour operator?",
    answer:
      "The best Kilimanjaro tour operator is one that holds a TATO license, is a KPAP member for ethical porter treatment, has KINAPA-registered guides, maintains a realistic summit success rate (85-95%), has strong verified reviews across multiple platforms, provides transparent pricing with no hidden fees, and maintains a guide-to-climber ratio of 1:2 or 1:3. Price alone is not a reliable indicator of quality — focus on credentials, safety standards, and genuine reviews.",
  },
  {
    question: "How much does it cost to climb Kilimanjaro with a reputable operator?",
    answer:
      "A reputable Kilimanjaro operator typically charges between $2,000 and $3,500 for a 6-8 day climb, depending on the route and group size. This should include all park fees, rescue fees, camping fees, crew wages, all meals, camping equipment, transfers, and emergency oxygen. Prices below $1,500 usually indicate corners being cut on safety or porter welfare. International agencies charge 20-40% more than local operators for the same climb because of middleman commissions.",
  },
  {
    question: "Is it safe to book directly with a local Kilimanjaro operator?",
    answer:
      "Yes — booking directly with a TATO-licensed, locally-based operator is both safe and recommended. You get lower prices (no agency commission), a direct relationship with the team who will guide your climb, faster communication, and more flexibility for itinerary adjustments. The key is verifying credentials: TATO license, KPAP membership, KINAPA registration, and genuine reviews on TripAdvisor and Google.",
  },
  {
    question: "What is TATO and why does it matter for Kilimanjaro?",
    answer:
      "TATO (Tanzania Association of Tour Operators) is the primary industry body that licenses and regulates tour operators in Tanzania. TATO membership confirms that an operator is legally registered, carries proper insurance, and meets minimum industry standards. Climbing with an unlicensed operator means you have no legal recourse if something goes wrong — and your travel insurance may not cover incidents with unlicensed operators.",
  },
  {
    question: "What is KPAP and should my operator be a member?",
    answer:
      "KPAP (Kilimanjaro Porters Assistance Project) is an organization that monitors how operators treat their porters. KPAP members commit to fair daily wages, proper clothing and sleeping equipment, load limits under 20kg per porter, and access to medical care. Yes, your operator should be a KPAP member — it is the clearest indicator that they operate ethically and treat their mountain crew with dignity.",
  },
  {
    question: "What is a good summit success rate for Kilimanjaro?",
    answer:
      "A good summit success rate for a reputable operator is 85-95%, depending on the route and trip duration. The overall success rate across all operators is approximately 65%. Longer routes (7-9 days) have higher success rates due to better acclimatization. Be skeptical of any operator claiming rates above 97% — these are almost certainly inflated or calculated using non-standard methods such as counting Stella Point rather than Uhuru Peak.",
  },
  {
    question: "Should I choose the cheapest Kilimanjaro operator?",
    answer:
      "No. The cheapest operator is rarely the best choice. Park fees alone cost approximately $700 per person for a 6-day climb. When an operator charges $1,200-1,500 total, the money for crew wages, food, equipment, and safety gear is minimal. Budget operators typically cut costs by underpaying porters, using worn-out equipment, providing basic food, running high guide-to-climber ratios, and skipping emergency equipment like supplemental oxygen.",
  },
  {
    question: "How do I verify a Kilimanjaro operator's reviews are real?",
    answer:
      "Check reviews across multiple platforms — TripAdvisor, Google, SafariBookings, and Trustpilot. Genuine reviews are detailed, mention specific guides by name, describe day-by-day experiences, and include both positives and minor negatives. A burst of short, generic five-star reviews posted within a few weeks is a red flag for purchased reviews. Also look at the reviewer's profile — do they have other reviews, or was the account created solely for that one review?",
  },
  {
    question: "What emergency equipment should a Kilimanjaro operator carry?",
    answer:
      "At minimum, a reputable operator should carry a pulse oximeter for daily blood oxygen monitoring, emergency supplemental oxygen, a comprehensive first aid kit, and have a clear evacuation plan. Premium operators also carry a portable Gamow bag (hyperbaric chamber) and satellite phone. All guides should be trained in altitude sickness recognition and emergency descent procedures. Ask your operator to list their emergency equipment before you book.",
  },
  {
    question: "Can I climb Kilimanjaro without a tour operator?",
    answer:
      "No. Independent, unguided climbing on Kilimanjaro is not permitted by KINAPA (Kilimanjaro National Park Authority). All climbers must be accompanied by a registered guide from a licensed tour operator. This regulation exists for safety — Kilimanjaro's extreme altitude and rapidly changing weather conditions make professional guiding essential. The only choice is which operator to climb with, not whether to use one.",
  },
];

const relatedGuides = [
  {
    title: "Kilimanjaro Prices: Complete Cost Breakdown",
    href: "/kilimanjaro-prices/",
    description: "Detailed breakdown of what Kilimanjaro climbs cost in 2026, including park fees, crew costs, and route-by-route pricing.",
  },
  {
    title: "Best Route to Climb Kilimanjaro",
    href: "/best-route-to-climb-kilimanjaro/",
    description: "Compare all 7 Kilimanjaro routes by success rate, difficulty, scenery, and crowd levels to find your ideal route.",
  },
  {
    title: "Can Beginners Climb Kilimanjaro?",
    href: "/can-beginners-climb-kilimanjaro/",
    description: "Everything first-time climbers need to know about fitness requirements, training plans, and route selection.",
  },
  {
    title: "Kilimanjaro Altitude Sickness",
    href: "/kilimanjaro-altitude-sickness/",
    description: "Symptoms, prevention, and treatment of altitude sickness on Kilimanjaro — and how your operator's protocols matter.",
  },
  {
    title: "Kilimanjaro Climbing Gear List",
    href: "/kilimanjaro-climbing-gear/",
    description: "Complete packing list for Kilimanjaro with recommendations on what to buy, what to rent, and what your operator provides.",
  },
  {
    title: "Kilimanjaro Training Plan",
    href: "/kilimanjaro-training-plan/",
    description: "12-week training plan to prepare your body for high-altitude trekking on Mount Kilimanjaro.",
  },
];

export default function BestKilimanjaroTourOperatorsPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Best Kilimanjaro Tour Operators", url: "/best-kilimanjaro-tour-operators/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "How to Choose the Best Kilimanjaro Tour Operator",
            description:
              "Data-driven guide to choosing the best Kilimanjaro tour operator. 7 criteria, red flags, cost comparison, and questions to ask before booking.",
            url: "/best-kilimanjaro-tour-operators/",
            image: "https://cdn.snowafricaadventure.com/kilimanjaro-guide-team.webp",
            publishedTime: "2025-01-15",
            modifiedTime: "2026-03-01",
          }),
          generateItemListSchema(
            criteria.map((c, i) => ({
              name: c.title,
              url: `/best-kilimanjaro-tour-operators/#criterion-${i + 1}`,
              description: c.subtitle,
              position: i + 1,
            }))
          ),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.snowafricaadventure.com/kilimanjaro-guide-team.webp"
            alt="Licensed Kilimanjaro tour operator guide team leading climbers on the mountain"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <Breadcrumbs
              items={[
                { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
                { label: "Best Tour Operators" },
              ]}
            />

            <div className="flex flex-wrap items-center gap-2 mb-4 mt-4">
              <span className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                Updated March 2026
              </span>
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold">
                Data-Driven Guide
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How to Choose the Best Kilimanjaro Tour Operator
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Your choice of operator determines whether you summit safely or turn back at
              4,500m. This guide covers the 7 criteria that actually matter, red flags to avoid,
              and what to ask before you book.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: Shield, value: "7", label: "Key Criteria" },
                { icon: AlertTriangle, value: "7", label: "Red Flags" },
                { icon: ClipboardCheck, value: "10", label: "Questions to Ask" },
                { icon: Search, value: "10", label: "FAQs Answered" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Talk to Our Team
              </Link>
              <Link
                href="/trekking/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View Kilimanjaro Routes
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-emerald-900 mb-3">
                  Quick Answer: What Makes the Best Kilimanjaro Tour Operator?
                </h2>
                <p className="text-emerald-800 leading-relaxed">
                  The best Kilimanjaro tour operator has a <strong>TATO license</strong>,{" "}
                  <strong>KPAP membership</strong>, a <strong>90%+ summit success rate</strong>,{" "}
                  <strong>transparent pricing</strong> with no hidden fees, and{" "}
                  <strong>real verified reviews</strong> across multiple platforms. Price alone is not a
                  reliable indicator of quality — the cheapest operators often cut corners on safety
                  equipment, food quality, and porter welfare. Focus on credentials, safety standards,
                  and genuine reviews from past climbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Criteria That Matter Most */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Due Diligence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            7 Criteria That Matter Most
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Use these seven criteria to evaluate any Kilimanjaro tour operator before you book.
            A trustworthy operator will meet all seven without hesitation — if they fail even
            one, proceed with caution.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {criteria.map((item, i) => (
              <div
                key={item.title}
                id={`criterion-${i + 1}`}
                className={`border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow ${item.color}`}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Criterion {item.number}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--text-muted)] mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags to Avoid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-red-500 uppercase tracking-wider text-center mb-2">
            Warning Signs
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Red Flags to Avoid
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            If you encounter any of these warning signs during your research, consider it a
            serious reason to look elsewhere. These red flags consistently correlate with poor
            experiences, safety issues, and unethical treatment of mountain crews.
          </p>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {redFlags.map((item) => (
              <div
                key={item.flag}
                className="bg-white border border-red-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-lg text-[var(--text)]">{item.flag}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Look for in Reviews */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Research Tips
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
              What to Look for in Reviews
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
              Reviews are the most transparent window into an operator&apos;s actual performance.
              But not all reviews are created equal — here is how to read them effectively.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {reviewTips.map((tip) => (
                <div
                  key={tip.title}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Search className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Snow Africa Adventure — Our Credentials */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  Our Credentials
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Snow Africa Adventure — How We Measure Up
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  We wrote this guide to be genuinely useful — not as a sales page. But we also believe
                  that transparency is the best marketing. Here is exactly how Snow Africa Adventure
                  measures against every criterion on this page.
                </p>
                <p className="text-white/80 leading-relaxed mb-8">
                  We are not a booking platform or an international travel agency. Snow Africa Adventure
                  is a locally-owned, Arusha-based operator that has been guiding climbers on Kilimanjaro
                  for over 15 years. Every climb is planned and overseen by our team on the ground in
                  Tanzania — not by a call centre overseas.
                </p>

                <div className="space-y-3">
                  {snowAfricaCredentials.map((cred) => (
                    <div
                      key={cred.label}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="w-8 h-8 bg-[var(--secondary)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[var(--secondary)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[var(--secondary)]">{cred.label}</p>
                          <span className="text-white font-bold">{cred.value}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-0.5">{cred.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://cdn.snowafricaadventure.com/kilimanjaro-guide-team.webp"
                    alt="Snow Africa Adventure guide team on Mount Kilimanjaro"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Emergency Equipment */}
                <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Emergency Equipment</p>
                      <p className="text-white/70 text-sm">Carried on every climb</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {emergencyEquipment.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison by Operator Type */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Price Guide
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Cost Comparison by Operator Type
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Kilimanjaro operators fall into four broad categories. Understanding what each price
            tier includes — and what it does not — helps you make an informed decision that
            balances budget with safety and experience quality.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {costComparison.map((tier) => (
              <div
                key={tier.tier}
                className={`border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${tier.color}`}
              >
                <div className={`px-6 py-4 ${tier.headerColor}`}>
                  <h3 className="font-heading text-lg font-bold">{tier.tier}</h3>
                  <p className="text-sm font-semibold opacity-80">{tier.range}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-4">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="text-[var(--text-muted)] shrink-0 mt-0.5">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="text-sm text-[var(--text)] leading-relaxed">
                      <strong>Bottom line:</strong> {tier.verdict}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions to Ask Before Booking */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Pre-Booking Checklist
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
              10 Questions to Ask Before Booking
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
              Copy this checklist and send it to any operator you are considering. A reputable
              company will answer every question openly. Evasiveness or vague responses on any
              of these questions is a red flag.
            </p>

            <div className="space-y-4">
              {questionsToAsk.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-[var(--primary-dark)] text-white rounded-full flex items-center justify-center shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">&ldquo;{item.question}&rdquo;</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      <strong>Why it matters:</strong> {item.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 mb-1">
                    Snow Africa&apos;s answers to all 10 questions
                  </p>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    TATO License: 034263. Guide ratio: 1:2 on all climbs. Emergency equipment:
                    pulse oximeter, oxygen, Gamow bag, satellite phone, helicopter evacuation
                    protocol. Success rate: 93% (Uhuru Peak only). Porter wages: above KPAP
                    minimum, with proper gear and insurance. Reviews: 4.9/5 on TripAdvisor
                    (115+ reviews), 5.0/5 on SafariBookings (75 reviews). All park fees
                    included — our quotes are fully itemized with no hidden charges. Early
                    descent protocol: guided descent with dedicated guide, no additional charge,
                    with evacuation contacts pre-arranged.
                  </p>
                </div>
              </div>
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
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-[var(--border)] rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold list-none [&::-webkit-details-marker]:hidden">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Continue Reading
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Related Kilimanjaro Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-[var(--secondary)]"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--secondary-dark)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {guide.description}
                </p>
                <span className="text-sm font-semibold text-[var(--secondary)]">
                  Read guide &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Book with a Trusted Local Operator
          </h2>
          <p className="text-white/70 mb-4 max-w-2xl mx-auto text-lg">
            TATO licensed (034263), KPAP member, KINAPA registered. 93% summit success rate
            across all routes. 4.9/5 on TripAdvisor with 115+ reviews. Locally owned and
            operated from Arusha, Tanzania.
          </p>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Talk directly with our team — no call centres, no middlemen, no commission markup.
            We respond within 24 hours, seven days a week.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us Today
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Group Departures
            </Link>
            <Link
              href="/trekking/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Explore All Routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
