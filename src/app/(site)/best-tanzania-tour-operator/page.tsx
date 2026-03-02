import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Shield,
  Users,
  MapPin,
  Check,
  ChevronDown,
  Award,
  Mountain,
  Compass,
  Globe,
  Heart,
  Clock,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Best Tanzania Tour Operator 2026",
  description:
    "Snow Africa Adventure is ranked among Tanzania's best tour operators — TATO licensed, 15+ years experience, 4.9★ TripAdvisor rating, 5,000+ happy travelers. Compare what makes us different.",
  url: "/best-tanzania-tour-operator/",
});

const operatorCriteria = [
  {
    icon: Award,
    title: "Local Expertise",
    description:
      "The best Tanzania tour operators are based in Arusha or Moshi, not operating from a call centre overseas. Local expertise means real-time knowledge of park conditions, migration patterns, and road access.",
  },
  {
    icon: Shield,
    title: "Safety Standards",
    description:
      "Licensed operators follow Tanzania National Parks Authority (TANAPA) regulations, employ certified guides, and carry comprehensive safari insurance. Ask to see licenses before booking.",
  },
  {
    icon: Heart,
    title: "Ethical Operations",
    description:
      "Ethical tour operators pay porters fairly, follow Leave No Trace principles in national parks, and invest in community conservation programs. KPAP partnership is a key indicator.",
  },
  {
    icon: Globe,
    title: "Value for Money",
    description:
      "The lowest price is rarely the best deal. The best operators include all park fees, quality vehicles, professional guides, and genuine accommodation — not budget workarounds that compromise your experience.",
  },
];

const credentials = [
  { label: "TATO Member", description: "Tanzania Association of Tour Operators — the industry's primary licensing body" },
  { label: "KPAP Partner", description: "Kilimanjaro Porters Assistance Project — ethical porter welfare, fair wages, proper equipment" },
  { label: "KINAPA Certified", description: "Kilimanjaro National Park Authority certified mountain guides — highest qualification" },
  { label: "15+ Years Operating", description: "Founded and operated from Arusha — real local knowledge, not a booking platform" },
  { label: "Emmanuel Moshi, Founder", description: "15 years guiding, 200+ Kilimanjaro summit successes, personal involvement in every trip" },
  { label: "Based in Arusha", description: "MEC House, Arusha — visit us in person before you book if you're already in Tanzania" },
];

const services = [
  {
    icon: Mountain,
    title: "Kilimanjaro Treks",
    description: "6 routes, 5-9 days, 93% summit success rate. Lemosho, Machame, Rongai, Marangu, Umbwe, and Northern Circuit.",
    link: "/trekking/",
  },
  {
    icon: Compass,
    title: "Tanzania Safaris",
    description: "Private game drives in the Serengeti, Ngorongoro, Tarangire, Lake Manyara, and Ruaha. Budget to luxury.",
    link: "/tanzania-safaris/",
  },
  {
    icon: Globe,
    title: "Zanzibar Holidays",
    description: "Beach packages, safari-and-beach combinations, Stone Town tours, and island hopping to Pemba and Mafia.",
    link: "/zanzibar/",
  },
  {
    icon: MapPin,
    title: "Day Tours",
    description: "Arusha city tours, coffee farm visits, cultural Maasai experiences, and day trips from the northern circuit.",
    link: "/tanzania-day-tours/",
  },
  {
    icon: Users,
    title: "Group Departures",
    description: "Join scheduled group departures for Kilimanjaro climbs at budget-friendly rates. Solo travelers welcome.",
    link: "/kilimanjaro-join-group-departures/",
  },
  {
    icon: Star,
    title: "Tailor-Made",
    description: "Fully custom itineraries designed around your dates, interests, budget, and group size. No off-the-shelf packages.",
    link: "/tailor-made-safari/",
  },
];

const testimonials = [
  {
    quote:
      "Snow Africa Adventure guided me to the summit of Kilimanjaro via the Lemosho route. Emmanuel's team were professional, caring, and incredibly knowledgeable. I could not have done it without them.",
    author: "Daniel M.",
    location: "United States",
    trip: "8-Day Lemosho Route",
    rating: 5,
  },
  {
    quote:
      "We booked a 10-day safari and Zanzibar combination through Snow Africa. Every detail was perfectly organised — the guides were exceptional and our lodge choices were spot on for the budget.",
    author: "Sophie & Mark T.",
    location: "United Kingdom",
    trip: "10-Day Safari & Zanzibar",
    rating: 5,
  },
  {
    quote:
      "As solo female traveler I was nervous, but the team made me feel completely safe throughout. 24/7 support, incredible guides, and the Serengeti exceeded every expectation I had.",
    author: "Anika R.",
    location: "Germany",
    trip: "7-Day Northern Circuit Safari",
    rating: 5,
  },
];

const operatorFaqs = [
  {
    question: "What is the best way to choose a Tanzania tour operator?",
    answer:
      "Look for TATO (Tanzania Association of Tour Operators) membership, KINAPA-certified guides for Kilimanjaro, genuine reviews on TripAdvisor and Google, a physical presence in Arusha or Moshi, transparent all-inclusive pricing, and KPAP partnership for ethical porter practices. Avoid operators who cannot provide license numbers or whose prices seem too low to be realistic.",
  },
  {
    question: "Is it better to book a Tanzania safari locally or internationally?",
    answer:
      "Booking locally with a Tanzania-based operator cuts out middlemen and agency commissions — meaning you get better value for money and far more personalised service. Local operators have real-time knowledge of park conditions, can adapt itineraries on the fly, and provide genuine in-country support during your trip. International booking platforms typically resell local operator packages at a significant markup.",
  },
  {
    question: "How long has Snow Africa Adventure been operating?",
    answer:
      "Snow Africa Adventure has been operating for over 15 years. The company was founded by Emmanuel Moshi, who has personally guided more than 200 successful Kilimanjaro summit attempts and has extensive knowledge of all of Tanzania's national parks and trekking routes.",
  },
  {
    question: "What makes Snow Africa Adventure different from other Tanzania tour operators?",
    answer:
      "Several things set us apart: our KPAP partnership ensures all Kilimanjaro porters receive fair wages, proper equipment, and health insurance — something many operators ignore. All our mountain guides are KINAPA-certified. We provide 24/7 in-country support during every trip. Emmanuel Moshi personally oversees every itinerary. And because we are locally based in Arusha, we have no middlemen — every dollar you spend goes directly towards your experience.",
  },
];

export default async function BestTanzaniaTourOperatorPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Best Tanzania Tour Operator", url: "/best-tanzania-tour-operator/" },
          ]),
          generateFAQSchema(operatorFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="Best Tour Operator in Tanzania - Snow Africa Adventure"
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
                TATO Licensed
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 TripAdvisor &bull; 5,000+ Travelers</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Best Tour Operator in Tanzania
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Why 5,000+ Travelers Choose Snow Africa Adventure
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: Star, value: "4.9★", label: "TripAdvisor" },
                { icon: Clock, value: "15+", label: "Years Experience" },
                { icon: Shield, value: "TATO", label: "Licensed" },
                { icon: Users, value: "5,000+", label: "Travelers" },
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
                href="/tailor-made-safari/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Plan Your Safari
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* What Makes a Great Operator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            What to Look For
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What Makes a Great Tanzania Tour Operator?
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Not all Tanzania tour operators are created equal. Whether you want to book a safari in Tanzania or trek Kilimanjaro with the best Arusha safari company, use these four criteria to evaluate any TATO licensed operator before you book.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatorCriteria.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snow Africa Credentials */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  Our Credentials
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Why Snow Africa Adventure?
                </h2>
                <p className="text-white/80 leading-relaxed mb-8">
                  We are not a booking platform or an international agency reselling Tanzania packages.
                  Snow Africa Adventure is a fully licensed, locally-owned operator based in Arusha —
                  the gateway to Kilimanjaro and the Northern Safari Circuit. Every trip is personally
                  overseen by founder Emmanuel Moshi.
                </p>
                <div className="space-y-4">
                  {credentials.map((cred) => (
                    <div key={cred.label} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-8 h-8 bg-[var(--secondary)]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[var(--secondary)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--secondary)]">{cred.label}</p>
                        <p className="text-white/70 text-sm mt-0.5">{cred.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
                    alt="Snow Africa Adventure Kilimanjaro Guide Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Emmanuel Moshi</p>
                      <p className="text-white/70 text-sm">Founder &amp; Lead Guide</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    &ldquo;Every trip we operate carries my personal commitment to your safety, experience,
                    and the wellbeing of every porter and guide on your team.&rdquo;
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--secondary)]">200+</p>
                      <p className="text-xs text-white/60">Kilimanjaro Summits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--secondary)]">15+</p>
                      <p className="text-xs text-white/60">Years Guiding</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--secondary)]">KINAPA</p>
                      <p className="text-xs text-white/60">Certified Guide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.link}
                className="group bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-[var(--secondary)]"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <service.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--secondary-dark)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{service.description}</p>
                <span className="block mt-4 text-sm font-semibold text-[var(--secondary)]">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Local vs International
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Why Book with a Local Tanzanian Operator?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "No Middlemen, Better Prices",
                  description:
                    "International booking platforms add 20-40% commission to every safari. Booking direct with a local operator means more of your money goes towards your actual experience.",
                },
                {
                  title: "Real-Time Conditions Knowledge",
                  description:
                    "Local operators know where the wildebeest migration is today, which park roads flooded overnight, and which camp has a lion pride nearby. International agencies cannot offer this.",
                },
                {
                  title: "Personalised Service",
                  description:
                    "You work directly with the people who will be on your trip — not a sales team in another country. Adjustments, special requests, and last-minute changes are handled instantly.",
                },
                {
                  title: "Community Investment",
                  description:
                    "Local operators reinvest in Tanzania — employing local guides, sourcing food locally, and contributing to conservation programs. Your money directly benefits the communities you visit.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            What Our Travelers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] mb-4 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-[var(--text-muted)]">{t.location}</p>
                  <p className="text-sm text-[var(--secondary-dark)] font-medium">{t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide to Choosing */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              Buyer&apos;s Guide
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">
              How to Choose a Tanzania Tour Operator
            </h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Verify TATO Membership", detail: "Ask for their TATO license number and verify it on the TATO website. Unlicensed operators have no legal accountability." },
                { step: "2", title: "Check Guide Certifications", detail: "For Kilimanjaro, guides must hold KINAPA certification. Ask to see guide ID cards before confirming your booking." },
                { step: "3", title: "Read Recent Reviews", detail: "Focus on TripAdvisor and Google Reviews from the last 12 months. Look for patterns in positive and negative comments." },
                { step: "4", title: "Confirm What Is Included", detail: "Get a detailed written quote specifying all park fees, accommodation, meals, transfers, and guide costs. Hidden extras are a major red flag." },
                { step: "5", title: "Ask About Porter Welfare", detail: "KPAP partnership is a sign of an ethical operator. Ask how porters are compensated, equipped, and insured on Kilimanjaro trips." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 bg-[var(--primary-dark)] text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
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
              {operatorFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
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
            Ready to Book with Tanzania&apos;s Best?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Talk directly with our team in Arusha — no call centres, no middlemen. We answer within 24 hours, seven days a week.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us Now
            </Link>
            <Link
              href="/tailor-made-safari/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Plan Your Safari
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
