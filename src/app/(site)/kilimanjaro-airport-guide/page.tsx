import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  CreditCard,
  Wifi,
  Smartphone,
  ShieldCheck,
  Users,
  Luggage,
  Globe,
  AlertTriangle,
  Info,
  Building,
  Car,
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
  title: "Kilimanjaro Airport Guide: JRO Arrivals & Transfers",
  description:
    "Complete Kilimanjaro International Airport (JRO) guide: airlines, arrival process, visa on arrival, airport transfers to Moshi and Arusha, and what to expect.",
  url: "/kilimanjaro-airport-guide/",
});

const airlines = [
  {
    name: "KLM Royal Dutch Airlines",
    hub: "Amsterdam (AMS)",
    frequency: "Daily",
    note: "Most popular route from Europe. Direct overnight flight, arriving early morning.",
  },
  {
    name: "Ethiopian Airlines",
    hub: "Addis Ababa (ADD)",
    frequency: "Daily",
    note: "Best connectivity from North America, Asia, and across Africa. Multiple daily connections through Addis Ababa.",
  },
  {
    name: "Turkish Airlines",
    hub: "Istanbul (IST)",
    frequency: "4-5x weekly",
    note: "Strong connections from Europe, Middle East, and Central Asia. Overnight flight arriving morning.",
  },
  {
    name: "Qatar Airways",
    hub: "Doha (DOH)",
    frequency: "3-4x weekly",
    note: "Premium option with connections from Asia, Australia, and the Middle East.",
  },
  {
    name: "Kenya Airways",
    hub: "Nairobi (NBO)",
    frequency: "Daily",
    note: "Short 45-minute hop from Nairobi. Useful for combining Kenya and Tanzania safaris.",
  },
  {
    name: "Precision Air",
    hub: "Dar es Salaam (DAR)",
    frequency: "Daily",
    note: "Tanzania&apos;s domestic carrier. Connects JRO with Dar es Salaam, Zanzibar, and other local airports.",
  },
  {
    name: "RwandAir",
    hub: "Kigali (KGL)",
    frequency: "3-4x weekly",
    note: "Good option if combining Tanzania with gorilla trekking in Rwanda.",
  },
  {
    name: "Fastjet / Air Tanzania",
    hub: "Dar es Salaam (DAR)",
    frequency: "Several weekly",
    note: "Budget domestic options connecting major Tanzanian cities to JRO.",
  },
];

const arrivalSteps = [
  {
    step: 1,
    title: "Disembark &amp; Walk to the Terminal",
    icon: Plane,
    description:
      "JRO is a small airport — you walk across the tarmac from the aircraft to the terminal building. There are no jet bridges. The terminal is a single-storey building and you will see it immediately after stepping off the plane. Follow the crowd towards immigration.",
  },
  {
    step: 2,
    title: "Immigration &amp; Visa on Arrival",
    icon: ShieldCheck,
    description:
      "Most nationalities can obtain a visa on arrival at JRO. The standard single-entry tourist visa costs $50 USD (payable in cash or card). US citizens pay $100 for a multiple-entry visa. Have your passport (valid 6+ months), return flight details, and accommodation address ready. Processing takes 10-30 minutes depending on the queue. Your operator&apos;s details count as accommodation proof.",
  },
  {
    step: 3,
    title: "Baggage Claim",
    icon: Luggage,
    description:
      "After immigration, proceed to the small baggage claim area. JRO typically has only one or two carousels operating at any time. Luggage usually appears within 15-20 minutes. If your bags are delayed or lost, report it to the airline desk immediately — they are located right next to the carousel area. Keep your baggage tags from check-in.",
  },
  {
    step: 4,
    title: "Customs Declaration",
    icon: CheckCircle,
    description:
      "Walk through the customs checkpoint. Unless you are carrying items to declare (large quantities of electronics, alcohol above duty-free limits, or commercial goods), you proceed through the green &apos;Nothing to Declare&apos; channel. Customs officers may ask about your itinerary but rarely inspect tourist luggage thoroughly.",
  },
  {
    step: 5,
    title: "Arrivals Hall &amp; Meeting Your Driver",
    icon: Users,
    description:
      "You emerge into a small arrivals hall where drivers hold name boards. If you have booked with Snow Africa Adventure, your driver will be waiting with a clearly marked sign bearing your name. Our drivers carry a company ID and are reachable by phone. If you do not see your driver immediately, do not worry — check outside the main exit where additional drivers wait.",
  },
];

const jroFacilities = [
  {
    icon: CreditCard,
    title: "ATMs &amp; Currency Exchange",
    description:
      "There are two ATMs in the arrivals hall (CRDB and NMB banks) that accept Visa and Mastercard. Withdrawal limits are typically 400,000-800,000 TZS per transaction (roughly $150-$300 USD). A forex bureau is located near the exit — rates are acceptable but not the best. We recommend withdrawing cash here for tips and small purchases, but your main expenses will be covered by your tour package.",
  },
  {
    icon: Smartphone,
    title: "SIM Cards &amp; Mobile Data",
    description:
      "Vodacom and Airtel kiosks are located in the arrivals hall. A tourist SIM with 5-10GB of data costs around 20,000-30,000 TZS ($8-$12 USD). Vodacom generally has the best coverage around Kilimanjaro and on the mountain (you can get signal at some camps). Bring your passport — registration is required by law. The process takes about 10 minutes.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi &amp; Connectivity",
    description:
      "JRO does not offer reliable free Wi-Fi. Connectivity in the terminal is limited. If you need internet access immediately, purchasing a local SIM card with data is your best option. Alternatively, wait until you reach your hotel in Moshi or Arusha where Wi-Fi is available at virtually every accommodation.",
  },
  {
    icon: Building,
    title: "Shops &amp; Food",
    description:
      "Facilities at JRO are basic compared to major international airports. There is a small duty-free shop (more useful on departure), a coffee shop, and a few souvenir stalls. Do not expect restaurants or lounges. If you are hungry, your transfer driver can stop at a restaurant en route to Moshi or Arusha — there are excellent local options along the highway.",
  },
];

const arrivalTips = [
  {
    title: "Carry Small USD Bills",
    description:
      "Bring crisp, post-2006 US dollar bills in small denominations ($1, $5, $10, $20) for visa fees, tips, and small purchases. Many vendors and services quote in USD. Worn or pre-2006 bills are often refused in Tanzania. Your visa fee ($50 or $100) can be paid by card at immigration, but cash speeds up the process.",
  },
  {
    title: "Be Patient at Immigration",
    description:
      "When multiple international flights arrive simultaneously, the immigration queue can stretch to 45-60 minutes. There are limited counters. Stay calm, have your documents ready (passport, visa fee, return ticket info, hotel/tour operator name), and avoid the common mistake of joining the wrong queue — there are separate lines for visa on arrival and pre-approved e-visas.",
  },
  {
    title: "Buy a SIM Card at the Airport",
    description:
      "Getting a SIM at JRO is significantly easier than trying to find a phone shop in Moshi later. The airport kiosks handle tourist registrations daily and speak English. Request a data-heavy plan — you will want to share photos and stay connected during your trip. Vodacom is recommended for the best Kilimanjaro-area coverage.",
  },
  {
    title: "Confirm Your Transfer in Advance",
    description:
      "Before you land, confirm your airport transfer arrangement with your tour operator. Share your flight number and arrival time so your driver can track any delays. All Snow Africa Adventure transfers include flight monitoring — we track your flight in real time and adjust pickup accordingly, so you are never left waiting.",
  },
  {
    title: "Do Not Accept Unsolicited Help",
    description:
      "Unofficial porters and taxi touts may approach you in the arrivals area offering to carry your bags or provide transport. Politely decline unless you need assistance. Your pre-arranged transfer is waiting for you. If you did not book a transfer, negotiate a fair taxi fare before getting in (expect $40-$60 to Moshi, $25-$35 to Arusha).",
  },
  {
    title: "Dress for the Climate",
    description:
      "JRO sits at approximately 900 metres elevation. Daytime temperatures range from 25-32 degrees Celsius year-round. If you are arriving from a cold climate, you will step off the plane into warm, sometimes humid air. Wear comfortable, breathable clothing for the transfer. Your climbing gear stays in your bag until trek day.",
  },
];

const faqs = [
  {
    question: "How far is Kilimanjaro Airport (JRO) from Moshi?",
    answer:
      "Kilimanjaro International Airport is approximately 40 kilometres (25 miles) from Moshi town centre. The drive takes 45-55 minutes via the main A23 highway, depending on traffic. The road is well-paved and the journey is straightforward. Most tour operators, including Snow Africa Adventure, include this airport transfer in your climbing or safari package at no extra cost.",
  },
  {
    question: "How far is JRO from Arusha?",
    answer:
      "JRO is approximately 46 kilometres (29 miles) from Arusha city centre. The drive takes 50-70 minutes depending on traffic, which can be heavier approaching Arusha. The airport sits roughly midway between Moshi and Arusha along the A23 highway. If you are heading to Arusha for a safari, the transfer is equally convenient.",
  },
  {
    question: "Is there Wi-Fi at Kilimanjaro Airport?",
    answer:
      "JRO does not offer reliable free Wi-Fi. The airport is small and facilities are basic. Your best option for internet connectivity is purchasing a local SIM card with a data plan from the Vodacom or Airtel kiosks in the arrivals hall. A tourist SIM with 5-10GB of data costs approximately $8-$12 USD and takes about 10 minutes to set up. Bring your passport for registration.",
  },
  {
    question: "Can I get a SIM card at JRO airport?",
    answer:
      "Yes. Vodacom and Airtel have kiosks in the arrivals hall at JRO. The process takes about 10 minutes and requires your passport for registration (Tanzanian law). A tourist SIM with 5-10GB data costs around 20,000-30,000 TZS ($8-$12 USD). We recommend Vodacom for the best coverage in the Kilimanjaro region — you can even get signal at some camps on the mountain.",
  },
  {
    question: "Do I need cash at Kilimanjaro Airport?",
    answer:
      "Cash is helpful but not strictly necessary. Visa on arrival can be paid by card (Visa/Mastercard), though cash often speeds up the process. There are two ATMs in the arrivals hall (CRDB and NMB) for withdrawing Tanzanian shillings. Carry crisp, post-2006 US dollar bills in small denominations for tips and small purchases. Your main trip expenses are typically covered by your tour package payment.",
  },
  {
    question: "How much does an airport transfer from JRO to Moshi cost?",
    answer:
      "Pre-arranged private transfers from JRO to Moshi typically cost $40-$60 USD. Shared shuttles (when available) cost around $15-$20 per person. Most reputable tour operators, including Snow Africa Adventure, include the airport transfer in your trekking or safari package at no additional charge. We recommend always booking your transfer in advance rather than negotiating with taxi drivers at the airport.",
  },
  {
    question: "Can I get a visa on arrival at JRO?",
    answer:
      "Yes. Most nationalities can obtain a visa on arrival at Kilimanjaro International Airport. A standard single-entry tourist visa costs $50 USD. US citizens require a multiple-entry visa costing $100 USD. You need a passport valid for at least 6 months, proof of return travel, and your accommodation or tour operator details. Processing typically takes 10-30 minutes. You can also apply for an e-visa in advance at eservices.immigration.go.tz to save time.",
  },
  {
    question: "What time do most international flights arrive at JRO?",
    answer:
      "Most long-haul international flights arrive at JRO in the early morning (between 5:00 AM and 10:00 AM) or late evening (between 8:00 PM and midnight). The KLM flight from Amsterdam and Ethiopian Airlines connections typically arrive between 7:00-9:00 AM, which is ideal — you clear immigration, collect your bags, and reach Moshi or Arusha by late morning with the full day ahead of you.",
  },
  {
    question: "Is Kilimanjaro Airport safe?",
    answer:
      "Yes, JRO is a safe and well-managed airport. It is small, which actually makes it less chaotic than larger African airports. Security is present throughout the terminal. The main thing to watch out for is unofficial porters and taxi touts who may approach you aggressively in the arrivals area. Stay with your pre-arranged driver and politely decline unsolicited offers. Inside the terminal, you are completely safe.",
  },
  {
    question: "Should I fly into JRO or Arusha Airport (ARK)?",
    answer:
      "Fly into JRO (Kilimanjaro International Airport), not ARK (Arusha Airport). JRO is the main international airport serving the region and receives all major international flights. Arusha Airport (ARK) is a small domestic airstrip mainly used for regional flights and charter planes to safari destinations. ARK does not handle international arrivals. If you are climbing Kilimanjaro, JRO is your only practical option for international arrival.",
  },
];

const relatedGuides = [
  {
    href: "/climbing-kilimanjaro/",
    icon: Globe,
    title: "Climbing Kilimanjaro",
    subtitle: "Complete guide",
  },
  {
    href: "/kilimanjaro-visa-tanzania/",
    icon: ShieldCheck,
    title: "Tanzania Visa Guide",
    subtitle: "Requirements & process",
  },
  {
    href: "/kilimanjaro-travel-insurance/",
    icon: ShieldCheck,
    title: "Travel Insurance",
    subtitle: "What you need covered",
  },
  {
    href: "/kilimanjaro-prices/",
    icon: CreditCard,
    title: "Kilimanjaro Prices",
    subtitle: "Cost breakdown",
  },
  {
    href: "/trekking/",
    icon: MapPin,
    title: "Trekking Routes",
    subtitle: "Compare all routes",
  },
];

export default function KilimanjaroAirportGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Airport Guide" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Airport Guide", url: "/kilimanjaro-airport-guide/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Airport Guide: JRO Arrivals & Transfers",
            description:
              "Complete Kilimanjaro International Airport (JRO) guide: airlines, arrival process, visa on arrival, airport transfers to Moshi and Arusha, and what to expect.",
            url: "/kilimanjaro-airport-guide/",
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
              "Local Moshi Resident",
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
            alt="Travellers arriving at Kilimanjaro International Airport ready for their Tanzania adventure"
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
              Travel Logistics Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro Airport <span className="text-[var(--secondary)]">JRO Guide</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Everything you need to know about arriving at Kilimanjaro International Airport — from airlines and visas to transfers and SIM cards, written by locals who meet climbers at JRO every week.
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
                <strong>Kilimanjaro International Airport (JRO)</strong> is the gateway to Mount Kilimanjaro and northern Tanzania&apos;s safari circuit. It is a small, single-terminal airport located between Moshi and Arusha. <strong>Moshi is 45 minutes away</strong> (40 km) and <strong>Arusha is about 1 hour</strong> (46 km). Most tour operators include airport transfers in your package. Visa on arrival costs <strong>$50 USD</strong> ($100 for US citizens).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Kilimanjaro International Airport Overview
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro International Airport — IATA code <strong>JRO</strong> — is northern Tanzania&apos;s main international gateway. Despite serving one of Africa&apos;s most famous destinations, JRO remains a small, manageable airport. There is <strong>one terminal building</strong> handling both international and domestic flights. The airport sits on a plateau at approximately 900 metres elevation, roughly midway between Moshi (the main base for Kilimanjaro climbs) and Arusha (the safari capital of Tanzania). For a broader look at <Link href="/where-is-mount-kilimanjaro/" className="text-[var(--primary)] hover:underline">where Mount Kilimanjaro is located</Link> and its geographic context, see our dedicated guide.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Do not confuse JRO with Arusha Airport (ARK), which is a smaller domestic airstrip located closer to Arusha town. All major international flights land at JRO. The airport was built in the 1970s and expanded in recent years, but it retains its characteristically low-key, no-frills atmosphere. This is not Heathrow or Dubai — and most travellers find that refreshing. You will walk across the tarmac to the terminal, clear immigration in a straightforward process, collect your bags, and be on the road within an hour of landing.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The airport is named after Kilimanjaro but the mountain is not visible from the runway or terminal. On a clear day during your transfer towards Moshi, however, you will get your first breathtaking view of Kilimanjaro&apos;s snow-capped summit rising above the clouds — a moment that never gets old, even for our guides who have seen it thousands of times.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <Plane className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="text-2xl font-bold">JRO</p>
                <p className="text-sm text-[var(--text-muted)]">IATA Airport Code</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <MapPin className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="text-2xl font-bold">40 km</p>
                <p className="text-sm text-[var(--text-muted)]">Distance to Moshi</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <Building className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-[var(--text-muted)]">Terminal Building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airlines Flying to JRO */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Airlines Flying to Kilimanjaro (JRO)
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              JRO is well connected to major global hubs. Most climbers arrive on one of these airlines, typically routing through a single connection point.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
            {airlines.map((airline) => (
              <div
                key={airline.name}
                className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg">{airline.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold shrink-0 ml-2">
                    {airline.frequency}
                  </span>
                </div>
                <p className="text-sm text-[var(--secondary)] font-semibold mb-2">
                  Hub: {airline.hub}
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {airline.note}
                </p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Booking tip:</strong> Ethiopian Airlines via Addis Ababa consistently offers the best value for flights from North America, with seamless connections and generous baggage allowances (2 x 23kg checked bags on most routes). For European travellers, the KLM direct flight from Amsterdam is the most convenient option — a single overnight flight landing at JRO in the early morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arrival Process Step-by-Step */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Arrival Process: Step by Step
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              What happens from the moment your plane lands to meeting your driver. The entire process typically takes 45-90 minutes.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {arrivalSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-3xl font-bold text-[var(--primary)]/20">{item.step}</span>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport to Moshi Transfer */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  Airport to Moshi Transfer
                </h2>
                <p className="text-white/80 text-lg mb-4 leading-relaxed">
                  Moshi is the primary base town for Kilimanjaro climbs and is where most trekking operators are headquartered. The transfer from JRO to Moshi is <strong>40 kilometres on a well-paved highway</strong>, taking approximately <strong>45-55 minutes</strong>.
                </p>
                <p className="text-white/80 mb-4 leading-relaxed">
                  The drive takes you along the A23 highway through flat, semi-arid scrubland that gradually gives way to the lush greenery around Moshi as you approach the foothills of Kilimanjaro. On a clear day, the mountain dominates the entire skyline ahead of you — an incredible first impression.
                </p>
                <p className="text-white/80 mb-6 leading-relaxed">
                  All Snow Africa Adventure <Link href="/trekking/" className="text-[var(--secondary)] hover:underline">trekking packages</Link> include complimentary airport transfers. Your driver meets you at the arrivals hall with a name board, helps with your luggage, and drives you directly to your pre-climb hotel in Moshi. We monitor your flight in real time, so even if your arrival is delayed, your driver will be there when you walk out.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                    <p className="text-2xl font-bold text-[var(--secondary)]">40 km</p>
                    <p className="text-xs text-white/60">Distance</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                    <p className="text-2xl font-bold text-[var(--secondary)]">45-55 min</p>
                    <p className="text-xs text-white/60">Drive Time</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                    <p className="text-2xl font-bold text-[var(--secondary)]">Included</p>
                    <p className="text-xs text-white/60">In Our Packages</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Car className="w-10 h-10 text-[var(--secondary)] mb-4" />
                <h3 className="font-semibold text-lg mb-3">Transfer Options to Moshi</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Tour operator transfer (recommended):</strong> Included in your package. Private vehicle, driver waiting at arrivals, direct to hotel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Pre-booked private taxi:</strong> $40-$60 USD. Arrange through your hotel or a reputable transfer company.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Shared shuttle:</strong> $15-$20 USD per person. Less frequent, waits for multiple passengers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Airport taxi (not recommended):</strong> Negotiate firmly. Drivers may quote inflated prices to tourists. Expect $50-$80 if you must take one.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airport to Arusha Transfer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Airport to Arusha Transfer
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Arusha is the safari capital of northern Tanzania and the departure point for trips to the Serengeti, Ngorongoro Crater, Tarangire, and Lake Manyara. The transfer from JRO to Arusha covers <strong>46 kilometres</strong> and takes approximately <strong>50-70 minutes</strong>, slightly longer than Moshi due to heavier traffic approaching the city.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              If your itinerary starts with a <Link href="/climbing-kilimanjaro/" className="text-[var(--primary)] hover:underline">Kilimanjaro climb</Link>, you will transfer to Moshi first. If you are heading straight on a <Link href="/african-safaris/" className="text-[var(--primary)] hover:underline">safari</Link>, your driver will take you to Arusha instead. Many travellers do both — climbing Kilimanjaro first (based in Moshi) and then transferring to Arusha for their safari. We handle all inter-city transfers seamlessly.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-[var(--primary)]">46 km</p>
                <p className="text-sm text-[var(--text-muted)]">Distance from JRO</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-[var(--primary)]">50-70 min</p>
                <p className="text-sm text-[var(--text-muted)]">Drive Time</p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-[var(--primary)]">$25-$35</p>
                <p className="text-sm text-[var(--text-muted)]">Taxi (if not included)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect at JRO */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What to Expect at JRO
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              JRO is small and basic — think friendly and functional rather than flashy. Here is what is available in the terminal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jroFacilities.map((facility) => (
              <div
                key={facility.title}
                className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <facility.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2" dangerouslySetInnerHTML={{ __html: facility.title }} />
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for a Smooth Arrival */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Tips for a Smooth Arrival
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Practical advice from our team who meet climbers and safari guests at JRO every week. These tips save time, money, and stress.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {arrivalTips.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
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

      {/* Departure from JRO */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Departing from Kilimanjaro Airport
            </h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              Your departure experience at JRO is just as straightforward as arriving. We provide a return transfer from your hotel to the airport, timed to your flight. Here is what to know for a stress-free departure.
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--secondary)]" />
                  Check-in Times
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Arrive at JRO <strong>3 hours before</strong> your international departure. The airport is small, but check-in queues, security, and immigration can move slowly when multiple flights depart simultaneously. For domestic flights, 2 hours is sufficient. Our drivers factor in the drive time and will collect you from your hotel with plenty of buffer.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[var(--secondary)]" />
                  Departure Tax &amp; Fees
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The departure tax is included in your airline ticket price — you do not need to pay anything separately at the airport. There are no additional airport fees on departure.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-[var(--secondary)]" />
                  Duty-Free &amp; Last-Minute Shopping
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The departure lounge has a small duty-free shop selling Tanzanian coffee, Kilimanjaro-branded souvenirs, tanzanite jewellery, and basic travel essentials. Selection is limited — buy your main souvenirs in Moshi or Arusha where you will have far more choice and better prices. There is a small cafe for coffee and snacks while waiting for your flight.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[var(--secondary)]" />
                  Immigration on Departure
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Departure immigration is quick — officers check your passport and exit stamp, and you proceed to the gate. Ensure your visa has not overstayed. The standard tourist visa allows a 90-day stay. If you have exceeded your visa duration, you may face a fine at the immigration counter.
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
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{guide.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-airport-guide/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Plane className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Your Kilimanjaro Adventure Starts at JRO
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Every Snow Africa Adventure package includes complimentary airport transfers, pre-climb hotel accommodation in Moshi, and a dedicated team ready to welcome you the moment you land. Focus on the adventure — we handle the logistics.
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
