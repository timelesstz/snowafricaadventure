import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  DollarSign,
  Users,
  Heart,
  Banknote,
  ArrowRight,
  HandCoins,
  Info,
  Wallet,
  Award,
  TrendingUp,
  Shield,
  Clock,
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
  title: "Kilimanjaro Tipping Guide: How Much to Tip",
  description:
    "How much to tip on Kilimanjaro: $200-$250 per climber recommended. Breakdown for guides, assistant guides, cooks, and porters. Tipping etiquette and ceremony.",
  url: "/kilimanjaro-tipping-guide/",
});

const tippingRates = [
  {
    role: "Lead Guide",
    dailyRange: "$20 - $25",
    description:
      "Your lead guide is responsible for the safety of the entire group, makes all route decisions, monitors weather and health, and coordinates the crew. They hold KINAPA certification and typically have years of summit experience.",
    icon: Award,
    color: "bg-amber-100 text-amber-700",
  },
  {
    role: "Assistant Guide",
    dailyRange: "$15 - $18",
    description:
      "Assistant guides walk with the group, carry first aid kits and emergency oxygen, help with daily health checks, and ensure no climber falls behind. Most expeditions have 1-2 assistant guides depending on group size.",
    icon: Shield,
    color: "bg-blue-100 text-blue-700",
  },
  {
    role: "Cook",
    dailyRange: "$10 - $15",
    description:
      "The cook prepares three meals a day plus snacks at altitude, working in challenging conditions with limited equipment. A good mountain cook is the unsung hero of every successful climb — proper nutrition is critical above 4,000m.",
    icon: Heart,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    role: "Porter",
    dailyRange: "$8 - $10",
    description:
      "Porters carry up to 20kg each — your gear, camping equipment, food, and water. A typical climb requires 3-4 porters per climber. They trek the same mountain you do, often moving faster to set up camp before you arrive.",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
];

const exampleBudget = {
  routeDays: 8,
  crewBreakdown: [
    { role: "1 Lead Guide", rate: "$22/day", days: 8, total: "$176" },
    { role: "2 Assistant Guides", rate: "$16/day each", days: 8, total: "$256" },
    { role: "1 Cook", rate: "$12/day", days: 8, total: "$96" },
    { role: "4 Porters", rate: "$9/day each", days: 8, total: "$288" },
  ],
  totalPerGroup: "$816",
  perClimberSolo: "$816",
  perClimberGroupOf4: "~$204",
  note: "In a group of 4 climbers sharing one crew, each person contributes approximately $200-$210. Solo climbers or pairs pay the full amount.",
};

const cashTips = [
  {
    icon: DollarSign,
    title: "US Dollars Preferred",
    description:
      "Tip in US dollars. The mountain crew prefers USD because it holds value better than Tanzanian shillings and is easier to exchange. Bring crisp, post-2006 bills — older notes are sometimes rejected by currency exchanges in Tanzania.",
  },
  {
    icon: Banknote,
    title: "Small Bills Only",
    description:
      "Bring $1, $5, $10, and $20 bills. Large denominations ($50 and $100 notes) are difficult to break on the mountain and in smaller towns. Your crew members will need to exchange or spend these bills locally, where change for large notes is scarce.",
  },
  {
    icon: Wallet,
    title: "Where to Get Cash",
    description:
      "Withdraw USD before arriving in Tanzania if possible. ATMs in Moshi and Arusha dispense Tanzanian shillings, not dollars. If you arrive without USD, exchange at a reputable bureau de change in Arusha or Moshi — your hotel can recommend one. Avoid airport exchange counters, which offer poor rates.",
  },
  {
    icon: Info,
    title: "Plan Ahead",
    description:
      "Set aside your tip money in a separate envelope before the climb begins. Keep it in your daypack or a secure pocket — not in the duffel bag your porters carry. Running short on cash at the end of the trek is uncomfortable for everyone.",
  },
];

const divisionSteps = [
  {
    step: 1,
    title: "Prepare Individual Envelopes",
    description:
      "Before the tipping ceremony, divide your total tip into separate envelopes labelled by role: Lead Guide, Assistant Guide(s), Cook, and Porters. If you are in a group, coordinate with fellow climbers so everyone contributes their share into a pooled set of envelopes.",
  },
  {
    step: 2,
    title: "Label Each Envelope Clearly",
    description:
      "Write the recipient&apos;s role (and name, if you know it) on each envelope. This avoids confusion during the ceremony and ensures the right person receives the right amount. Your lead guide can help you with crew names if needed.",
  },
  {
    step: 3,
    title: "Tip Directly or Through the Lead Guide",
    description:
      "You can hand envelopes directly to each crew member during the ceremony, or give them to your lead guide for distribution. Both approaches are acceptable. Direct handover feels more personal; distribution through the lead guide is simpler for large groups.",
  },
  {
    step: 4,
    title: "Group Pooling for Porters",
    description:
      "Porter tips are almost always pooled and divided equally among all porters. Rather than tipping each porter individually (you may not know them all), place the total porter tip in one envelope and hand it to the head porter or lead guide, who distributes it fairly.",
  },
];

const faqs = [
  {
    question: "How much should I tip my Kilimanjaro guide?",
    answer:
      "The recommended tip for a lead guide on Kilimanjaro is $20 to $25 per day. For an 8-day climb, that works out to $160 to $200 for the lead guide alone. Assistant guides should receive $15 to $18 per day each. These rates are consistent with KPAP (Kilimanjaro Porters Assistance Project) guidelines and reflect the level of responsibility guides carry for your safety on the mountain.",
  },
  {
    question: "Is tipping mandatory on Kilimanjaro?",
    answer:
      "Tipping is not legally mandatory, but it is a deeply established custom and a critical part of the mountain crew&apos;s income. Base wages for porters and assistant guides are modest — tips can double or even triple their take-home pay for a climb. Not tipping would be a serious breach of etiquette and would negatively impact people who worked hard to support your expedition. Budget $200 to $250 per climber as a standard part of your climb cost.",
  },
  {
    question: "When do you tip on Kilimanjaro?",
    answer:
      "Tips are given during a tipping ceremony held on the last day of the trek, typically at the final camp (usually Mweka Camp or Millennium Camp) before descending to the gate. The ceremony happens after breakfast, before the final descent. Your lead guide will organise the ceremony and gather the full crew. It is a celebratory event — the crew often sings and dances, and climbers have a chance to thank their team personally.",
  },
  {
    question: "Should I tip in USD or Tanzanian shillings?",
    answer:
      "US dollars are strongly preferred. The mountain crew prefers USD because it holds its value better than Tanzanian shillings and is easier to exchange at favourable rates. Bring small bills ($1, $5, $10, $20) — large denominations like $50 and $100 notes are difficult to break in local towns. Make sure your bills are crisp and printed after 2006, as older or damaged notes may be rejected by currency exchanges.",
  },
  {
    question: "How many porters will carry my gear?",
    answer:
      "A typical Kilimanjaro climb uses 3 to 4 porters per climber. Each porter carries up to 20kg, which includes your personal gear (up to 15kg in your duffel bag), plus shared equipment like tents, cooking gear, food, and water. On longer routes or luxury climbs with more amenities, you may have 5 or more porters per climber. Your operator will confirm the exact crew size before your climb, which helps you calculate your total tip budget.",
  },
  {
    question: "Do porters share tips equally?",
    answer:
      "Yes, porter tips are pooled and divided equally among all porters on the expedition. This is the standard practice on Kilimanjaro. You place the total porter tip in a single envelope and hand it to the head porter or lead guide during the tipping ceremony. They distribute it fairly after the climb. This system ensures all porters — including those you may not have interacted with directly — receive their fair share.",
  },
  {
    question: "What if the service was poor?",
    answer:
      "If you experienced genuinely poor service, you can reduce tips slightly, but avoid withholding them entirely. The porters and cook rarely cause service problems — issues are almost always with the operator or guide. If your lead guide was inattentive or the food was poor, address the issue with your tour operator after the climb for a partial refund. Reducing porter tips penalises the hardest-working and lowest-paid members of the crew for problems they did not cause.",
  },
  {
    question: "Can I tip with a credit card?",
    answer:
      "No. Tips on Kilimanjaro are always given in cash. There are no card payment facilities on the mountain or at the park gates. Some tour operators offer to include tips in your pre-paid package, but this is not recommended — you have no guarantee the full amount reaches the crew, and it removes the personal element of the tipping ceremony. Always bring cash and hand it over directly.",
  },
  {
    question: "Should I tip hotel staff in Moshi?",
    answer:
      "Yes, tipping hotel staff in Moshi and Arusha is customary. Porters (hotel bellhops) typically receive $1 to $2 per bag, housekeeping staff $1 to $2 per day, and restaurant servers 5% to 10% of the bill if service charge is not included. These are separate from your mountain crew tips. Also budget small tips for your airport transfer driver ($5 to $10) and any additional guides on day trips or safaris after your climb.",
  },
  {
    question: "How do tips compare to porter wages?",
    answer:
      "Porters earn a base wage set by Kilimanjaro National Park (KINAPA) — currently around 10,000 to 15,000 Tanzanian shillings per day (roughly $4 to $6 USD). Tips of $8 to $10 per day per climber effectively double or triple their daily income. For a porter on an 8-day climb carrying gear for 4 climbers, tips can total $250 to $320 — a significant sum in the local economy. This is why tipping matters so much and why organisations like KPAP advocate for fair tipping practices.",
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
    href: "/kilimanjaro-prices/",
    icon: DollarSign,
    title: "Kilimanjaro Prices",
    subtitle: "Full cost breakdown",
  },
  {
    href: "/kilimanjaro-climbing-companies/",
    icon: Users,
    title: "Climbing Companies",
    subtitle: "How to choose",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: Shield,
    title: "Climbing Gear",
    subtitle: "Packing list",
  },
  {
    href: "/best-route-to-climb-kilimanjaro/",
    icon: TrendingUp,
    title: "Best Route Guide",
    subtitle: "Compare all routes",
  },
  {
    href: "/trekking/",
    icon: Mountain,
    title: "All Kilimanjaro Routes",
    subtitle: "Browse itineraries",
  },
  {
    href: "/kilimanjaro-join-group-departures/",
    icon: Users,
    title: "Group Departures",
    subtitle: "Join a scheduled climb",
  },
];

export default function KilimanjaroTippingGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Tipping Guide" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Tipping Guide", url: "/kilimanjaro-tipping-guide/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Tipping Guide: How Much to Tip",
            description:
              "How much to tip on Kilimanjaro: $200-$250 per climber recommended. Breakdown for guides, assistant guides, cooks, and porters. Tipping etiquette and ceremony.",
            url: "/kilimanjaro-tipping-guide/",
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
            alt="Kilimanjaro mountain crew and trekkers during a tipping ceremony on the mountain"
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
              Practical Planning Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Tipping Guide</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              How much to tip your guides, porters, and cook on Kilimanjaro — with a full breakdown, ceremony etiquette, and cash planning advice from <Link href="/our-guides/" className="text-white hover:underline font-semibold">our team</Link> with 200+ summits.
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
                Budget <strong>$200 to $250 per climber</strong> for tips. This is split among your lead guide, assistant guides, cook, and porters. Tips are given in a <strong>ceremony on the last day</strong> of the trek and are a <strong>significant part of the crew&apos;s income</strong> — for porters, tips can double or triple their base wage. Bring <strong>small US dollar bills</strong> ($1, $5, $10, $20) and prepare envelopes labelled by role before the ceremony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Tipping Amounts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Recommended Tipping Amounts
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              These rates are consistent with KPAP (Kilimanjaro Porters Assistance Project) fair-wage guidelines and reflect standard practice among reputable operators.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {tippingRates.map((rate) => (
              <div
                key={rate.role}
                className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${rate.color.split(" ")[0]} flex items-center justify-center`}>
                    <rate.icon className={`w-6 h-6 ${rate.color.split(" ")[1]}`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{rate.role}</h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${rate.color}`}>
                      {rate.dailyRange} per day
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {rate.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Budget Table */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Example: 8-Day Climb Tip Budget
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                A realistic breakdown for a typical 8-day Lemosho Route climb with a standard crew. Rates shown are mid-range of the recommended amounts.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
                <thead className="bg-[var(--primary-dark)] text-white">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Crew Member</th>
                    <th className="text-left px-5 py-3 font-semibold">Daily Rate</th>
                    <th className="text-left px-5 py-3 font-semibold">Days</th>
                    <th className="text-left px-5 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleBudget.crewBreakdown.map((item, i) => (
                    <tr
                      key={item.role}
                      className={`border-t border-[var(--border)] ${
                        i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium">{item.role}</td>
                      <td className="px-5 py-3">{item.rate}</td>
                      <td className="px-5 py-3">{item.days}</td>
                      <td className="px-5 py-3 font-bold text-emerald-700">{item.total}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[var(--primary)] bg-emerald-50">
                    <td className="px-5 py-4 font-bold text-lg" colSpan={3}>
                      Total for Entire Crew
                    </td>
                    <td className="px-5 py-4 font-bold text-lg text-emerald-700">
                      {exampleBudget.totalPerGroup}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Group climbers:</strong> {exampleBudget.note} Most operators provide the crew roster and headcount before the climb so you can calculate your exact share. When climbing with Snow Africa Adventure, we send you a detailed tipping guide with crew names and roles before departure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tipping Matters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Why Tipping Matters on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The mountain crew who carry your gear, <Link href="/kilimanjaro-food-meals/" className="text-[var(--primary)] hover:underline font-semibold">cook your meals</Link>, set up your camps, and keep you safe are the backbone of every Kilimanjaro expedition. Understanding why tips matter so much helps frame this as what it truly is — not an afterthought, but a fundamental part of the climb&apos;s economics.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Banknote className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Modest Base Wages</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Porters earn a base wage set by Kilimanjaro National Park (KINAPA) of approximately 10,000 to 15,000 Tanzanian shillings per day — roughly $4 to $6 USD. This covers basic compensation but is not enough to support a family in the Kilimanjaro region. Tips are not a bonus; they are an essential income supplement that the entire tipping system is built around.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <HandCoins className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Tips Double Their Income</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    A porter on an 8-day climb carrying for 4 climbers can earn $250 to $320 in tips alone — more than their base wage for the same period. For guides and cooks, the effect is similar. This tip income supports families, funds children&apos;s education, and sustains livelihoods in the communities around Kilimanjaro. Your generosity has a direct, tangible impact on real lives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">KPAP &amp; Fair Wage Advocacy</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    The <strong>Kilimanjaro Porters Assistance Project (KPAP)</strong> works to improve conditions for mountain crew. They monitor porter treatment, verify fair wages and tips are being paid, and certify ethical operators. Snow Africa Adventure is a KPAP partner operator — we ensure every tip you give reaches the intended recipient. When choosing a <Link href="/kilimanjaro-climbing-companies/" className="text-[var(--primary)] hover:underline">climbing company</Link>, ask about their KPAP status.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Cultural Significance</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Tipping on Kilimanjaro is more than a financial transaction — it is a recognition of shared effort. The mountain crew and climbers form a temporary community over the course of a week, enduring the same weather, the same altitude, and the same exhaustion. Having the right <Link href="/kilimanjaro-climbing-gear/" className="text-[var(--primary)] hover:underline font-semibold">climbing gear</Link> helps you focus on the experience rather than discomfort. The tipping ceremony is the culmination of that shared experience, a moment of genuine gratitude and celebration that many climbers describe as one of the most emotional parts of their journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Tipping Ceremony */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The Tipping Ceremony
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                One of the most memorable moments of any Kilimanjaro climb — here is exactly what to expect and how it works.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">When It Happens</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The tipping ceremony takes place on the final morning of the trek, usually at the last camp (Mweka Camp or Millennium Camp) after breakfast and before the final descent to the gate. Your lead guide will let you know the timing the evening before so you can prepare your envelopes.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The entire crew gathers together — guides, cook, porters, and the head porter. The lead guide introduces each person by name and role. Climbers then hand over the tip envelopes, often with a few words of thanks. The crew responds with songs, dancing, and cheering. It is joyful, loud, and deeply genuine.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">The Emotional Moment</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Expect tears. After days of shared hardship, altitude challenges, and the summit push, the ceremony is a release of emotion for both climbers and crew. Many climbers say the tipping ceremony was as memorable as reaching Uhuru Peak. It is a human moment that transcends the transaction.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <HandCoins className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Group vs Individual</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  In group climbs, the tips are pooled from all climbers and presented together. One person (or the group together) hands over the envelopes on behalf of the group. For solo climbers or small groups, you hand your envelopes directly. Either way, the ceremony feels personal — the crew sees you, not just the money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cash & Currency */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Cash &amp; Currency: What to Bring
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Getting your tip money sorted before the climb is essential. Here is everything you need to know about cash preparation.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {cashTips.map((tip) => (
              <div
                key={tip.title}
                className="flex gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <tip.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Divide Tips */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                How to Divide Your Tips
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Follow these four steps the evening before your tipping ceremony to ensure everything runs smoothly.
              </p>
            </div>
            <div className="space-y-4">
              {divisionSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
                >
                  <div className="flex items-start shrink-0">
                    <span className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </span>
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
        </div>
      </section>

      {/* Budget vs Luxury Operators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Budget vs Luxury Operators: Tipping Differences
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The per-day tipping rate stays the same regardless of which operator you choose — a porter on a budget climb deserves the same tip as a porter on a luxury climb. However, the <strong>total tip amount changes</strong> because luxury operators use larger crews.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-heading font-bold text-lg mb-3">Budget Operator</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold mt-0.5">-</span>
                    Smaller crew: 1 guide, 1 assistant, 1 cook, 3 porters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold mt-0.5">-</span>
                    Total tip for 7-day climb: ~$550-$650
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold mt-0.5">-</span>
                    Per climber (group of 4): ~$140-$165
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold mt-0.5">-</span>
                    Fewer amenities, basic camping equipment
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
                <h3 className="font-heading font-bold text-lg mb-3">Premium Operator</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">-</span>
                    Larger crew: 1 guide, 2 assistants, 1 cook, 5-6 porters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">-</span>
                    Total tip for 8-day climb: ~$800-$900
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">-</span>
                    Per climber (group of 4): ~$200-$225
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">-</span>
                    Better equipment, more comfort, higher safety standards
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Key point:</strong> The per-day, per-person tip rate is the same regardless of operator tier. What changes is the crew size. A premium operator with more porters and assistant guides means a higher total tip, but each crew member receives the same fair rate. Never reduce individual rates to save money — adjust your overall climb budget to account for the crew your operator provides. See our <Link href="/kilimanjaro-prices/" className="text-blue-600 hover:underline font-semibold">Kilimanjaro price breakdown</Link> for full cost planning.
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

      <KnowledgeBase exclude="/kilimanjaro-tipping-guide/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Choose an operator that treats its crew fairly. With Snow Africa Adventure, every porter is paid above KPAP minimum wages, carries no more than 20kg, and receives your tips directly — guaranteed.
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
