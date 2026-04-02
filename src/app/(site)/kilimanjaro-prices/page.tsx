import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  X,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Users,
  Mountain,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Prices & Cost Guide 2026",
  description:
    "Kilimanjaro climbing costs from $1,850 to $4,500+ depending on route, duration, and operator. Compare prices for all 6 routes, understand what's included, and get an instant quote from Snow Africa Adventure.",
  url: "/kilimanjaro-prices/",
});

const priceTiers = [
  {
    label: "Budget",
    range: "$1,850 – $2,500",
    icon: DollarSign,
    color: "bg-blue-100 text-blue-700",
    description:
      "5–6 day Marangu or Rongai routes with shared group departures. Standard tents, group meals, and experienced guides.",
    features: ["Shared group vehicle", "Standard camping", "Group meals", "English guide"],
  },
  {
    label: "Mid-Range",
    range: "$2,500 – $3,500",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-700",
    description:
      "7-day Machame or Rongai routes. Private or semi-private departures, upgraded tents, and a higher guide-to-climber ratio.",
    features: ["Semi-private group", "Upgraded camping gear", "Enhanced meals", "Senior guide"],
    highlighted: true,
  },
  {
    label: "Premium",
    range: "$3,500 – $4,500+",
    icon: Mountain,
    color: "bg-emerald-100 text-emerald-700",
    description:
      "8–9 day Lemosho or Northern Circuit routes. Fully private expedition, luxury equipment, and dedicated personal guide.",
    features: ["Fully private tour", "Luxury camping gear", "Private chef", "Lead guide + assistant"],
  },
];

const routeTable = [
  { route: "Marangu Route", days: "5 Days", difficulty: "Moderate", priceFrom: "$1,850", success: "65%" },
  { route: "Machame Route", days: "6 Days", difficulty: "Challenging", priceFrom: "$2,100", success: "80%" },
  { route: "Rongai Route", days: "6 Days", difficulty: "Moderate", priceFrom: "$2,200", success: "85%" },
  { route: "Machame Route", days: "7 Days", difficulty: "Challenging", priceFrom: "$2,400", success: "90%" },
  { route: "Rongai Route", days: "7 Days", difficulty: "Moderate", priceFrom: "$2,500", success: "90%" },
  { route: "Lemosho Route", days: "8 Days", difficulty: "Moderate–Challenging", priceFrom: "$2,850", success: "95%" },
];

const included = [
  "Park fees (KINAPA)",
  "Camping fees",
  "Rescue fees",
  "All guides and assistant guides",
  "Licensed porters",
  "Mountain cook",
  "Tents and sleeping pads (camping routes)",
  "All meals on the mountain",
  "Airport transfers (Kilimanjaro Airport)",
  "Pre-climb briefing",
];

const notIncluded = [
  "International flights",
  "Tanzania tourist visa",
  "Travel & medical insurance",
  "Gratuities / tips",
  "Personal hiking gear",
  "Pre/post-climb hotel stays",
];

const costBreakdown = [
  { item: "KINAPA Park Fees", amount: "$848–$1,135", note: "Varies by route duration (5-9 days)" },
  { item: "Camping Fees", amount: "$295–$530", note: "Per night on the mountain" },
  { item: "Rescue Fees", amount: "$20", note: "Mandatory per climber" },
  { item: "Guide & Porter Wages", amount: "$400–$700", note: "Based on crew size and route days" },
  { item: "Mountain Meals", amount: "$150–$250", note: "3 meals + snacks daily, prepared by mountain cook" },
  { item: "Equipment & Gear", amount: "$100–$300", note: "Tents, sleeping pads, dining tent, toilet tent" },
  { item: "Airport Transfers", amount: "$50–$80", note: "Round-trip Kilimanjaro Airport to Moshi/Arusha" },
  { item: "Company Operations", amount: "$200–$400", note: "Office, vehicles, safety equipment, insurance" },
];

const priceFactors = [
  {
    title: "Route & Duration",
    description:
      "Longer routes cost more because of additional park fees, extra staff days, and more food. The Lemosho 8-day route costs more than the 5-day Marangu, but has a 95% success rate vs 65%.",
  },
  {
    title: "Group vs Private",
    description:
      "Joining a group departure spreads costs across several climbers. A private climb means you pay all staff costs yourself, but enjoy greater flexibility and exclusivity.",
  },
  {
    title: "Season",
    description:
      "Peak seasons (January–March, June–October) are slightly more expensive due to high demand. Shoulder seasons may offer small discounts.",
  },
  {
    title: "Accommodation Type",
    description:
      "The Marangu route uses huts (included in park fee). All other routes use tents — quality ranges from basic camping to luxury glamping setups depending on the package tier.",
  },
];

const priceFaqs = [
  {
    question: "How much does it cost to climb Kilimanjaro in 2026?",
    answer:
      "Budget packages start from $1,850 per person for a 5-day Marangu group climb. Mid-range 7-day private options cost $2,400–$3,500. Premium 8-day Lemosho expeditions with luxury equipment range from $3,500 to $4,500 or more.",
  },
  {
    question: "What does the Kilimanjaro price include?",
    answer:
      "All reputable operators include park fees (KINAPA), camping fees, rescue fees, licensed guides, porters and a cook, tents and sleeping pads for camping routes, all meals on the mountain, and airport transfers. Flights, visa, travel insurance, and tips are not included.",
  },
  {
    question: "Are there cheaper ways to climb Kilimanjaro?",
    answer:
      "Yes — joining a group departure is the best way to reduce cost. By sharing guide and porter costs across 4–8 climbers, you can climb from $1,850. Snow Africa Adventure offers scheduled group departures throughout the year.",
  },
  {
    question: "Why do prices vary so much between operators?",
    answer:
      "Price differences reflect staff ratios (guides per climber), equipment quality, meal quality, guide experience, and whether park fees are properly included. Very cheap operators often cut corners on safety, staffing, or porter welfare — red flags that should raise concern.",
  },
  {
    question: "Is tipping included in the price?",
    answer:
      "No. Tipping is customary in Tanzania and is an important part of your crew's income. Budget approximately $150–$250 per person in total tips, distributed among your guide, assistant guides, porters, and cook at the end of the climb.",
  },
];

export default function KilimanjaroPricesPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Kilimanjaro Prices", url: "/kilimanjaro-prices/" },
          ]),
          generateFAQSchema(priceFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Kilimanjaro prices and climbing packages — trekkers ascending mountain trail"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                2026 Price Guide
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kilimanjaro Prices &amp;{" "}
              <span className="text-[var(--secondary)]">Climbing Costs 2026</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Transparent, all-inclusive pricing for every route and budget.
              No hidden fees. No surprises at the summit.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: "From $1,850", label: "Budget Packages" },
                { value: "6 Routes", label: "Available" },
                { value: "5–9 Days", label: "Duration" },
                { value: "93%", label: "Avg Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Get a Custom Quote
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View Group Departures
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Price Tier Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Price Overview
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Kilimanjaro Price Tiers: Which Package is Right for You?
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            How much does it cost to climb Kilimanjaro? Kilimanjaro climbing costs vary based on route length, group size, and accommodation standard. Here is a breakdown of the three main Kilimanjaro climbing package price tiers for 2026.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {priceTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.label}
                  className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    tier.highlighted
                      ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="text-center mb-3">
                      <span className="px-3 py-1 bg-[var(--secondary)] text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tier.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-1">{tier.label}</h3>
                  <p className="text-2xl font-bold text-[var(--secondary)] mb-3">{tier.range}</p>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Route Price Table */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Route Comparison
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Kilimanjaro Route Prices at a Glance
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Prices are per person, based on a group of 2+ climbers. Private rates available on request.
          </p>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="text-left px-5 py-4 font-semibold">Route</th>
                  <th className="text-left px-5 py-4 font-semibold">Days</th>
                  <th className="text-left px-5 py-4 font-semibold">Difficulty</th>
                  <th className="text-left px-5 py-4 font-semibold">Price From</th>
                  <th className="text-left px-5 py-4 font-semibold">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {routeTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[var(--border)] ${
                      i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    } hover:bg-amber-50 transition-colors`}
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text)]">{row.route}</td>
                    <td className="px-5 py-4 text-[var(--text-muted)]">{row.days}</td>
                    <td className="px-5 py-4 text-[var(--text-muted)]">{row.difficulty}</td>
                    <td className="px-5 py-4 font-bold text-[var(--secondary-dark)]">{row.priceFrom}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        {row.success}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            Prices valid for 2026. Subject to change based on group size and season.
          </p>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Where Your Money Goes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Kilimanjaro Cost Breakdown: What You&apos;re Actually Paying For
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Over 60% of the cost goes directly to park fees and crew wages. Here&apos;s exactly where your money goes when you climb Kilimanjaro.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
              {costBreakdown.map((row, i) => (
                <div
                  key={row.item}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-4 ${
                    i % 2 === 0 ? "" : "bg-[var(--surface)]"
                  } ${i < costBreakdown.length - 1 ? "border-b border-[var(--border)]" : ""}`}
                >
                  <div className="flex-1">
                    <span className="font-medium text-[var(--text)]">{row.item}</span>
                    <span className="block sm:inline sm:ml-2 text-xs text-[var(--text-muted)]">
                      {row.note}
                    </span>
                  </div>
                  <span className="font-bold text-[var(--secondary-dark)] whitespace-nowrap">{row.amount}</span>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-4 bg-[var(--primary-dark)] text-white">
                <span className="flex-1 font-bold">Total Range</span>
                <span className="font-bold text-[var(--secondary)] text-lg">$1,850 – $4,500+</span>
              </div>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              Costs vary based on route, duration, group size, and package tier. <Link href="/contact-us/" className="text-[var(--secondary)] hover:underline">Get an exact quote</Link> for your climb.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Transparency First
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What&apos;s Included in the Price
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                Included in All Packages
              </h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white border border-[var(--border)] rounded-lg p-3 shadow-sm">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-[var(--text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                Not Included
              </h3>
              <ul className="space-y-3">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white border border-[var(--border)] rounded-lg p-3 shadow-sm">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Price Factors */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Understanding Costs
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What Affects Kilimanjaro Prices?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {priceFactors.map((factor) => (
              <div
                key={factor.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2 text-[var(--secondary)]">{factor.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Warning */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-amber-900">
              Warning: Why Very Cheap Kilimanjaro Climbs Are Risky
            </h2>
            <p className="text-amber-800 mb-4">
              If you see Kilimanjaro packages below $1,500, proceed with caution. Park fees alone
              cost $848+ for a 5-day climb. Operators offering rock-bottom prices typically cut costs by:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Underpaying porters and guides (below minimum wage standards)",
                "Skipping proper safety equipment like pulse oximeters and emergency oxygen",
                "Using inadequate tents and sleeping gear for high-altitude conditions",
                "Reducing food quality and quantity on the mountain",
                "Employing unqualified guides without wilderness first aid certification",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-amber-800 text-sm">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-amber-800 text-sm">
              Snow Africa Adventure is a{" "}
              <strong>KPAP-certified operator</strong> that ensures fair wages, proper equipment, and
              safe climbing conditions. Our prices reflect ethical, sustainable tourism — not shortcuts.
            </p>
          </div>
        </div>
      </section>

      {/* Group Climbing Discounts */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Save with a Group
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Join a Group &amp; Share the Costs
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              Our scheduled group departures let you experience Kilimanjaro at budget-friendly prices — from just
              $1,850 per person — without compromising on safety or quality. All group climbs include a
              professional guide, licensed porters, and full support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5" />
                Browse Group Departures
              </Link>
              <Link
                href="/contact-us/"
                className="inline-block border-2 border-[var(--border)] hover:border-[var(--secondary)] text-[var(--text)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Private Climb Quote
              </Link>
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
              Kilimanjaro Price Questions
            </h2>
            <div className="space-y-4">
              {priceFaqs.map((faq, i) => (
                <div key={i} className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Your Custom Quote?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Tell us your preferred route, travel dates, and group size and we&apos;ll send you a
            detailed, no-obligation quote within 24 hours. Or <Link href="/kilimanjaro-group-climbs/" className="text-white underline hover:text-[var(--secondary)]">join a group climb</Link> to save 15–30%. See how <Link href="/kilimanjaro-vs-everest/" className="text-white underline hover:text-[var(--secondary)]">Kilimanjaro costs compare to Everest</Link> — you might be surprised.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact-us/"
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Request a Free Quote
          </Link>
          <Link
            href="/kilimanjaro-group-climbs/"
            className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Group Climbs Guide
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
