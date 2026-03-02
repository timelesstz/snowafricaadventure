import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  AlertTriangle,
  ChevronDown,
  Shield,
  Award,
  Star,
  Users,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Climbing Companies 2026",
  description:
    "Choosing the right Kilimanjaro climbing company is the most important decision for your climb. Learn what separates great operators from bad ones, red flags to avoid, and why Snow Africa Adventure is the trusted choice.",
  url: "/kilimanjaro-climbing-companies/",
});

const checklist = [
  {
    title: "TATO Membership",
    description:
      "The Tanzania Association of Tour Operators (TATO) vets and licenses legitimate operators. Membership signals accountability and compliance with industry standards.",
  },
  {
    title: "KINAPA Registration",
    description:
      "Only companies registered with the Kilimanjaro National Park Authority (KINAPA) are legally permitted to operate climbs on the mountain.",
  },
  {
    title: "KPAP Partnership",
    description:
      "The Kilimanjaro Porters Assistance Project (KPAP) partners with operators committed to fair wages, proper equipment, and porter welfare.",
  },
  {
    title: "Climber-to-Guide Ratio",
    description:
      "A responsible operator maintains at minimum a 1:5 guide-to-climber ratio. Better companies go further — 1:2 or 1:3 on challenging routes.",
  },
  {
    title: "Emergency Oxygen & Pulse Oximeters",
    description:
      "All credible operators include emergency supplemental oxygen and pulse oximeters to monitor acclimatization. This is non-negotiable safety equipment.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Reputable companies provide itemized quotes that clearly include park fees, rescue fees, and camping fees — not as hidden extras.",
  },
  {
    title: "Verified Reviews",
    description:
      "Check TripAdvisor and Google — look for consistent, recent, detailed reviews. Beware of a burst of generic 5-star reviews with no detail.",
  },
];

const redFlags = [
  {
    flag: "Unusually Low Prices",
    detail:
      "If a 7-day climb is priced under $1,200, critical fees or staff wages are likely being cut. The minimum legitimate cost for a 6-day climb with park fees alone exceeds $700.",
  },
  {
    flag: "No Physical Office in Arusha",
    detail:
      "Any company operating Kilimanjaro climbs should have a registered, physical address in Arusha or Moshi. No office means no accountability.",
  },
  {
    flag: "No Reviews or Fake Reviews",
    detail:
      "A company with zero reviews or a suspicious cluster of vague identical reviews is a serious warning sign. Request contact details of past climbers.",
  },
  {
    flag: "Refusing to Share Staff Wage Policy",
    detail:
      "Ethical operators are proud to share how they pay porters. Evasiveness on this topic is a red flag for poor porter treatment.",
  },
  {
    flag: "Porters Carrying Over 20kg",
    detail:
      "KINAPA regulations limit porter loads to 20kg. Overloaded porters suffer injuries and indicates an operator who ignores regulations.",
  },
];

const comparisonRows = [
  { aspect: "Guide-to-Climber Ratio", budget: "1:8 or more", midRange: "1:5", premium: "1:2 to 1:3" },
  { aspect: "Emergency Oxygen", budget: "Not always included", midRange: "Included", premium: "Always included" },
  { aspect: "Meal Quality", budget: "Basic camp food", midRange: "3 meals + snacks", premium: "Chef-cooked, varied menu" },
  { aspect: "Tents & Gear", budget: "Shared, basic tents", midRange: "Standard private tents", premium: "Luxury expedition tents" },
  { aspect: "Porter Welfare", budget: "Varies — verify", midRange: "KPAP compliant", premium: "KPAP partner, certified" },
  { aspect: "Acclimatization Monitoring", budget: "Informal checks", midRange: "Daily pulse ox", premium: "Medical-grade daily checks" },
  { aspect: "Verified Reviews", budget: "Few or unknown", midRange: "Mixed to good", premium: "500+ verified reviews" },
];

const companyFaqs = [
  {
    question: "How do I choose a Kilimanjaro climbing company?",
    answer:
      "Start by verifying TATO membership and KINAPA registration — these confirm legal standing. Then check guide-to-climber ratios, whether emergency oxygen is included, and read at least 20 recent TripAdvisor or Google reviews. A transparent, itemized quote is also a good sign of an honest operator.",
  },
  {
    question: "What is a Kilimanjaro outfitter?",
    answer:
      "A Kilimanjaro outfitter (or climbing company) is a licensed operator that provides all the logistics for your climb: licensed guides, porters, a mountain cook, all camping equipment, permits, and park fees. They handle everything so you can focus on the climb.",
  },
  {
    question: "What is KPAP and why does it matter?",
    answer:
      "The Kilimanjaro Porters Assistance Project is an initiative that partners with operators who meet strict standards for porter welfare — fair wages, proper clothing, and load limits. Booking with a KPAP partner ensures your climb doesn't come at the expense of the mountain crew.",
  },
  {
    question: "Should I book directly with a local company?",
    answer:
      "Yes. Booking directly with a local Arusha-based company like Snow Africa Adventure cuts out international middlemen (travel agencies, aggregators), resulting in lower prices and a direct relationship with the people who run your climb. You also get faster communication and more flexibility.",
  },
];

export default function KilimanjaroClimbingCompaniesPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Kilimanjaro Climbing Companies", url: "/kilimanjaro-climbing-companies/" },
          ]),
          generateFAQSchema(companyFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Licensed Kilimanjaro climbing company — certified mountain guides leading group trek"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                TATO Licensed
              </span>
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold">
                KPAP Partner
              </span>
              <span className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold">
                KINAPA Certified
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kilimanjaro Climbing Companies —{" "}
              <span className="text-[var(--secondary)]">How to Choose Wisely</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              The company you choose determines whether you summit safely or turn back. Here&apos;s
              everything you need to know before booking.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Book with Snow Africa
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View Group Climbs
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Your Most Important Decision
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Your Choice of Kilimanjaro Climbing Company Matters
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Kilimanjaro is the world&apos;s highest free-standing mountain. Over 30,000 people attempt
              the summit each year — and roughly 50% don&apos;t make it. Studies show that up to 93% of
              summit success is linked to the quality of your kilimanjaro outfitter: proper acclimatization
              pacing, guide experience, safety equipment, and porter welfare. Choosing the wrong
              kilimanjaro climbing company doesn&apos;t just risk your money — it risks your health.
            </p>
          </div>
        </div>
      </section>

      {/* 7 Things Checklist */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Due Diligence Checklist
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            7 Things to Check Before Booking
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Use this checklist when evaluating any Kilimanjaro climbing company. A trustworthy
            operator will pass all seven without hesitation.
          </p>
          <div className="max-w-3xl mx-auto space-y-4">
            {checklist.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-red-500 uppercase tracking-wider text-center mb-2">
            Warning Signs
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Red Flags to Avoid
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {redFlags.map((item) => (
              <div
                key={item.flag}
                className="bg-white border border-red-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-[var(--text)]">{item.flag}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Snow Africa Adventure */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Our Credentials
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Why Choose Snow Africa Adventure?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "15+ Years of Experience",
                  description:
                    "Founded in Arusha, Tanzania, Snow Africa Adventure has operated Kilimanjaro climbs for over 15 years. Our team knows every route, weather pattern, and logistical challenge intimately.",
                },
                {
                  icon: Award,
                  title: "500+ Successful Summits",
                  description:
                    "We have guided over 500 climbers to the Uhuru Peak summit. Our careful acclimatization approach and experienced guides deliver one of the highest success rates in the industry.",
                },
                {
                  icon: Users,
                  title: "Porter Welfare First",
                  description:
                    "We are proud KPAP partners. Every porter we employ receives fair wages, proper clothing, and load limits well below the KINAPA maximum. Ethical climbing is non-negotiable for us.",
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Side by Side
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Operator Comparison
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Not all Kilimanjaro companies are equal. Here&apos;s what separates budget,
            mid-range, and premium operators — and where Snow Africa Adventure stands.
          </p>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="text-left px-5 py-4 font-semibold">What to Expect</th>
                  <th className="text-left px-5 py-4 font-semibold">Budget Operators</th>
                  <th className="text-left px-5 py-4 font-semibold">Mid-Range</th>
                  <th className="text-left px-5 py-4 font-semibold text-[var(--secondary)]">
                    Snow Africa (Premium)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text)]">{row.aspect}</td>
                    <td className="px-5 py-4 text-[var(--text-muted)]">{row.budget}</td>
                    <td className="px-5 py-4 text-[var(--text-muted)]">{row.midRange}</td>
                    <td className="px-5 py-4 font-medium text-emerald-700">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Verified &amp; Certified
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Our Certifications &amp; Memberships
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "TATO", sublabel: "Tanzania Association of Tour Operators", color: "bg-blue-50 border-blue-200 text-blue-800" },
              { label: "KINAPA", sublabel: "Kilimanjaro National Park Authority", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
              { label: "KPAP", sublabel: "Kilimanjaro Porters Assistance Project", color: "bg-amber-50 border-amber-200 text-amber-800" },
              { label: "4.9 ★", sublabel: "Google & TripAdvisor Verified Rating", color: "bg-rose-50 border-rose-200 text-rose-800" },
            ].map((cert) => (
              <div
                key={cert.label}
                className={`border rounded-xl p-5 text-center ${cert.color}`}
              >
                <p className="text-2xl font-bold mb-1">{cert.label}</p>
                <p className="text-xs leading-snug">{cert.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Common Questions About Kilimanjaro Companies
            </h2>
            <div className="space-y-4">
              {companyFaqs.map((faq, i) => (
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
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb with a Company You Can Trust
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            TATO licensed, KPAP certified, 15+ years experience, 500+ summits. Let us plan your
            Kilimanjaro climb from start to finish.
          </p>
          <Link
            href="/contact-us/"
            className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
