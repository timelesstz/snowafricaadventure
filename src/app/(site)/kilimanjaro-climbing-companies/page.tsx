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
  ArrowRight,
  DollarSign,
  Heart,
  HelpCircle,
  MessageCircleQuestion,
  Globe,
  Scale,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RelatedGuides, CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

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

const questionsToAsk = [
  {
    question: "How many summits have your guides completed?",
    why: "Experience is the single best predictor of summit success. A guide with 100+ summits has encountered every possible scenario — altitude emergencies, sudden weather changes, injured climbers. Ask for specific numbers, not vague answers like \"many.\"",
  },
  {
    question: "What is your climber-to-guide ratio?",
    why: "The industry minimum is 1 guide per 5 climbers, but premium operators staff 1:2 or 1:3. On summit night, you want a guide close enough to notice if you’re struggling — not 50 metres behind managing a group of 10.",
  },
  {
    question: "Do you carry emergency oxygen on every climb?",
    why: "Supplemental oxygen is not for helping you summit — it’s for stabilizing a climber in a medical emergency while they descend. Any operator that doesn’t carry it is gambling with your life to save $50 on equipment.",
  },
  {
    question: "What meals do you serve on the mountain?",
    why: "At altitude, appetite drops and nutrition becomes critical. Good operators employ trained mountain cooks who serve hot breakfasts, packed lunches, multi-course dinners, and unlimited snacks. Ask to see a sample menu — if they can’t produce one, expect basic rice and beans.",
  },
  {
    question: "Are you a KPAP partner?",
    why: "The Kilimanjaro Porters Assistance Project audits operators for fair wages, load limits, and working conditions. A KPAP partnership is verified and public — you can check their directory. Operators who claim ethical practices but aren’t KPAP-listed are unverified.",
  },
  {
    question: "What happens if I get altitude sickness?",
    why: "A clear answer reveals preparation. Good operators carry pulse oximeters, check vitals twice daily, have written evacuation protocols, and employ guides trained in Wilderness First Response. Vague answers like \"we take you down\" show a lack of protocol.",
  },
  {
    question: "Can I speak with or contact past climbers?",
    why: "Legitimate operators are happy to connect you with previous clients. If a company refuses or deflects, they’re likely hiding poor reviews. Also check TripAdvisor and Google for independent verification.",
  },
  {
    question: "Do you have a physical office in Arusha or Moshi?",
    why: "A registered office means accountability. You can visit before your climb, meet the team, and inspect equipment. Operators that exist only online with a generic email address can disappear overnight — and your deposit with them.",
  },
  {
    question: "What is your cancellation and refund policy?",
    why: "Cancellation terms vary wildly. Some operators keep 100% of your deposit regardless of timing. Others offer full refunds up to 60 days out. Get the cancellation policy in writing before you pay anything.",
  },
  {
    question: "What exactly is included vs excluded in the price?",
    why: "The advertised price should include park fees ($70/day for adults), rescue fees, camping fees, guide and porter wages, meals, and equipment. If park fees are listed as \"extra,\" the real price is $500-$700 higher than quoted.",
  },
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
      "The Kilimanjaro Porters Assistance Project is an initiative that partners with operators who meet strict standards for porter welfare — fair wages, proper clothing, and load limits. Booking with a KPAP partner ensures your climb doesn’t come at the expense of the mountain crew.",
  },
  {
    question: "Should I book directly with a local company?",
    answer:
      "Yes. Booking directly with a local Arusha-based company like Snow Africa Adventure cuts out international middlemen (travel agencies, aggregators), resulting in lower prices and a direct relationship with the people who run your climb. You also get faster communication and more flexibility.",
  },
  {
    question: "How much should a Kilimanjaro climb cost?",
    answer:
      "A legitimate 6-7 day Kilimanjaro climb costs between $2,000 and $5,000+ depending on the route, group size, and service level. Budget operators under $1,500 cut corners on safety, food, and porter wages. Mid-range ($2,500-$3,500) offers a solid experience. Premium ($3,500-$5,000+) includes private toilets, better tents, smaller groups, and top-tier guides. Be wary of prices that seem too good to be true.",
  },
  {
    question: "What is the difference between a tour operator and an outfitter?",
    answer:
      "In the Kilimanjaro context, the terms are often used interchangeably. A \"tour operator\" is the broader term — a licensed company that organizes travel services. An \"outfitter\" specifically refers to the company that equips and staffs your climb. The important distinction is between a direct outfitter (local company that runs the climb) and a reseller (international agency that subcontracts to a local outfitter, adding markup).",
  },
  {
    question: "Are all Kilimanjaro guides licensed?",
    answer:
      "All guides must be licensed by KINAPA to lead climbs on Kilimanjaro. However, not all licensed guides are equal. Ask how many summits your guide has completed, whether they hold Wilderness First Responder certification, and how many years they have been guiding. A licensed guide with 10 summits is very different from one with 200+.",
  },
  {
    question: "How far in advance should I book my Kilimanjaro climb?",
    answer:
      "For peak season (January-March and June-October), book 3-6 months in advance to secure your preferred dates and route. For group departures, 2-3 months is usually sufficient. Last-minute bookings are sometimes possible during shoulder season but limit your route and date choices. Private climbs can often be arranged with 4-6 weeks notice.",
  },
  {
    question: "Can I change my route after booking?",
    answer:
      "Most operators allow route changes up to 30-60 days before your climb date, though policies vary. Changes closer to your start date may incur fees due to permit applications already submitted to KINAPA. Always confirm the change policy in writing before booking, and note that switching to a longer route (e.g., Marangu to Lemosho) will increase the total cost.",
  },
  {
    question: "What happens if I need to evacuate from the mountain?",
    answer:
      "If you develop severe altitude sickness or an injury, your guide will initiate an immediate descent to a lower camp. From there, stretcher evacuation or helicopter rescue can be arranged depending on severity and location. Helicopter evacuations cost $3,000-$5,000, which is covered by most travel insurance policies. This is why we strongly recommend purchasing comprehensive travel insurance before your climb.",
  },
];

export default function KilimanjaroClimbingCompaniesPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Climbing Companies", url: "/kilimanjaro-climbing-companies/" },
          ]),
          generateFAQSchema(companyFaqs),
          generateArticleSchema({
            title: "Kilimanjaro Climbing Companies — How to Choose Wisely in 2026",
            description:
              "Choosing the right Kilimanjaro climbing company is the most important decision for your climb. Learn what separates great operators from bad ones, red flags to avoid, and why Snow Africa Adventure is the trusted choice.",
            url: "/kilimanjaro-climbing-companies/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-04",
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
          generateAggregateRatingSchema({
            ratingValue: 4.9,
            reviewCount: 387,
            itemName: "Snow Africa Adventure — Kilimanjaro Climbing Company",
            itemType: "TourOperator",
          }),
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
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
                { label: "Climbing Companies" },
              ]}
            />
          </div>

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

      <CredentialsBadges variant="compact" />

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

      {/* 10 Questions to Ask */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Before You Book
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            10 Questions to Ask Any Operator Before Booking
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Email these questions to any operator you&apos;re considering. A reputable company will answer
            every one confidently and in detail. Evasive or vague responses are a warning sign.
          </p>
          <div className="max-w-3xl mx-auto space-y-5">
            {questionsToAsk.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[var(--primary-dark)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)] mb-2 text-lg">&ldquo;{item.question}&rdquo;</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)]">Why it matters:</span> {item.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 bg-[var(--surface)]">
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

      {/* How Much Should You Pay */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Pricing Guide
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            How Much Should a Kilimanjaro Climb Cost?
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Price is one of the most common questions — and one of the easiest ways to spot an
            unethical operator. Here&apos;s what each tier actually looks like.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Budget */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Budget</h3>
                  <p className="text-2xl font-bold text-red-600">$1,500 – $2,000</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Corners cut on safety equipment</li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Large groups (8-12 climbers per guide)</li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Basic meals, limited variety</li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Porter welfare often questionable</li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> Hidden fees common (park fees, tips)</li>
              </ul>
              <p className="mt-4 text-xs text-red-600 font-semibold uppercase">High risk — not recommended</p>
            </div>

            {/* Mid-Range */}
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Mid-Range</h3>
                  <p className="text-2xl font-bold text-blue-600">$2,500 – $3,500</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Emergency oxygen &amp; pulse oximeters</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> 1:4 or 1:5 guide-to-climber ratio</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> 3 hot meals plus snacks daily</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> KPAP compliant porter treatment</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> All park fees included in price</li>
              </ul>
              <p className="mt-4 text-xs text-blue-600 font-semibold uppercase">Good balance of value &amp; quality</p>
            </div>

            {/* Premium */}
            <div className="bg-white border-2 border-[var(--secondary)] rounded-xl p-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--secondary)] text-[var(--primary-dark)] text-xs font-bold rounded-full uppercase">
                Snow Africa
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Premium</h3>
                  <p className="text-2xl font-bold text-emerald-600">$3,500 – $5,000+</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 1:2 or 1:3 guide ratio, senior lead guide</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Chef-cooked meals, dietary accommodations</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Private portable toilet &amp; luxury tents</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Medical-grade acclimatization monitoring</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> KPAP partner, above-minimum porter wages</li>
              </ul>
              <p className="mt-4 text-xs text-emerald-600 font-semibold uppercase">Best summit odds &amp; experience</p>
            </div>
          </div>
          <p className="text-center mt-8 text-[var(--text-muted)]">
            For a full cost breakdown including park fees, route-by-route pricing, and what&apos;s included, see our{" "}
            <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] font-semibold hover:underline">
              complete Kilimanjaro pricing guide
            </Link>.
          </p>
        </div>
      </section>

      {/* Booking Direct vs Through an Agent */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Save Money, Get Better Service
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Booking Direct vs Through an International Agent
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Many climbers don&apos;t realize that international travel agents and booking platforms
            don&apos;t run the climb themselves — they subcontract to local Tanzanian operators and add
            a 30-50% markup for the referral.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Direct Booking */}
            <div className="bg-white border-2 border-emerald-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-emerald-800">Book Direct with a Local Company</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>30-50% lower price</strong> — no middleman markup. You pay the operator directly, so every dollar goes toward your climb.</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Direct communication</strong> — email or WhatsApp the actual team organizing your climb. No game of telephone through a third party.</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Full flexibility</strong> — change dates, routes, or add a safari extension without agent approval delays.</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Support the local economy</strong> — your money stays in Tanzania, funding guide salaries, porter wages, and community development.</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Accountability</strong> — you know exactly who is responsible for your climb and can visit their office in Arusha.</span>
                </li>
              </ul>
            </div>

            {/* Through Agent */}
            <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Scale className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-xl text-red-800">Book Through an International Agent</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>30-50% markup</strong> — agents add their commission on top of the operator&apos;s price. A $3,000 climb becomes $4,000-$4,500.</span>
                </li>
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Communication delays</strong> — your questions pass through a middleman who may not know the mountain firsthand.</span>
                </li>
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Less flexibility</strong> — changes require agent coordination, adding days to simple requests.</span>
                </li>
                <li className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>No operator choice</strong> — agents subcontract to whichever local operator gives them the best margin, not the best climb.</span>
                </li>
                <li className="flex gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Language support</strong> — the one potential benefit is assistance in your native language, though most Tanzanian operators communicate fluently in English.</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-8 text-[var(--text-muted)] max-w-2xl mx-auto">
            Snow Africa Adventure is based in Arusha, Tanzania. When you book with us, you deal directly
            with our team — no agents, no middlemen, no hidden commissions.{" "}
            <Link href="/contact-us/" className="text-[var(--primary)] font-semibold hover:underline">
              Contact us directly
            </Link>.
          </p>
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
                  title: "800+ Successful Summits",
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

      {/* Porter Welfare */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Ethical Climbing
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
              Porter Welfare: Why It Matters
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
              Every Kilimanjaro climb depends on porters — the men and women who carry your gear, food,
              tents, and water up the mountain. How a company treats its porters tells you everything about
              their values.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-rose-500" />
                  <h3 className="font-heading font-bold text-lg">KPAP Standards</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  The Kilimanjaro Porters Assistance Project sets the benchmark for ethical porter treatment.
                  KPAP-certified operators agree to regular, unannounced audits and must meet strict standards across
                  wages, equipment, load limits, and food quality.
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Only about 40% of Kilimanjaro operators are KPAP partners. Choosing a KPAP partner is one of
                  the most meaningful decisions you can make when selecting a climbing company.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Weight Limits: 20kg Maximum",
                    detail:
                      "KINAPA regulations cap porter loads at 20kg (44 lbs), including their own belongings. Budget operators routinely overload porters to 25-30kg to save on hiring additional staff. Overloading causes musculoskeletal injuries and exhaustion.",
                  },
                  {
                    title: "Fair Wages",
                    detail:
                      "KPAP recommends a minimum daily wage of $10-$12 for porters. Some budget operators pay as little as $3-$5 per day — below subsistence level. Snow Africa pays above KPAP minimums.",
                  },
                  {
                    title: "Proper Clothing &amp; Gear",
                    detail:
                      "Porters need waterproof jackets, warm sleeping bags, and sturdy boots. Unethical operators send porters up in sandals and thin clothing. We provide complete cold-weather gear to every crew member.",
                  },
                  {
                    title: "Quality Food for Crew",
                    detail:
                      "Your porters eat three meals a day on the mountain. Budget operators cut costs by providing only ugali and beans. Our mountain cook prepares balanced meals for climbers and crew alike.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-[var(--border)] rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-8 text-[var(--text-muted)]">
              Learn about fair tipping practices in our{" "}
              <Link href="/kilimanjaro-tipping-guide/" className="text-[var(--primary)] font-semibold hover:underline">
                Kilimanjaro tipping guide
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[var(--surface)]">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Common Questions About Kilimanjaro Companies
            </h2>
            <div className="space-y-3">
              {companyFaqs.map((faq, i) => (
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

      {/* Internal Links / Further Reading */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Continue Your Research
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">
              Essential Kilimanjaro Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Kilimanjaro Safety Guide",
                  description: "Fatality rates, altitude risks, emergency protocols, and how to stay safe on the mountain.",
                  href: "/kilimanjaro-safety/",
                },
                {
                  title: "Kilimanjaro Prices &amp; Costs",
                  description: "Full cost breakdown by route, what’s included, park fees, and how to budget.",
                  href: "/kilimanjaro-prices/",
                },
                {
                  title: "Kilimanjaro Tipping Guide",
                  description: "Who to tip, how much, and when — for guides, porters, and cooks.",
                  href: "/kilimanjaro-tipping-guide/",
                },
                {
                  title: "Kilimanjaro Food &amp; Meals",
                  description: "What you’ll eat on the mountain, dietary options, and hydration strategies.",
                  href: "/kilimanjaro-food-meals/",
                },
                {
                  title: "Travel Insurance for Kilimanjaro",
                  description: "What your policy must cover, helicopter evacuation, and recommended providers.",
                  href: "/kilimanjaro-travel-insurance/",
                },
                {
                  title: "Best Route to Climb Kilimanjaro",
                  description: "Compare all 7 routes by difficulty, scenery, success rate, and crowd levels.",
                  href: "/best-route-to-climb-kilimanjaro/",
                },
              ].map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white border border-[var(--border)] rounded-xl p-5 hover:shadow-md transition-shadow group flex items-start gap-3"
                >
                  <MessageCircleQuestion className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-1">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">{guide.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-climbing-companies/" />

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
            TATO licensed, KPAP certified, 15+ years experience, 800+ summits. Let us plan your
            Kilimanjaro climb from start to finish.
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
              View Upcoming Departures
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <RelatedGuides currentPath="/kilimanjaro-climbing-companies/" />
    </div>
  );
}
