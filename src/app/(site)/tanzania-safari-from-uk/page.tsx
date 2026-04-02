import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ChevronDown,
  Plane,
  Shield,
  PoundSterling,
  Calendar,
  Mountain,
  Palmtree,
  Check,
  Globe,
  Clock,
  Users,
  MapPin,
  Heart,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = genMeta({
  title: "Tanzania Safari from UK",
  description:
    "Plan your Tanzania safari from the UK. Direct flights from London, no visa hassle, GBP pricing guide, best seasons aligned with UK holidays, and expert safari packages from a TATO-licensed local operator.",
  url: "/tanzania-safari-from-uk/",
});

const flightRoutes = [
  {
    airline: "KLM",
    hub: "Amsterdam (AMS)",
    from: "London Heathrow, Manchester, Edinburgh, Birmingham",
    duration: "~12-14 hours total",
    note: "One of the most popular routes for UK travelers. Excellent connections from regional airports.",
  },
  {
    airline: "Turkish Airlines",
    hub: "Istanbul (IST)",
    from: "London Heathrow, Manchester, Edinburgh, Birmingham, Gatwick",
    duration: "~13-15 hours total",
    note: "Competitive fares and good baggage allowance. New Istanbul Airport lounge is superb.",
  },
  {
    airline: "Ethiopian Airlines",
    hub: "Addis Ababa (ADD)",
    from: "London Heathrow",
    duration: "~13-16 hours total",
    note: "Often the cheapest option. Star Alliance member. Note: yellow fever certificate may be required when transiting Ethiopia.",
  },
  {
    airline: "Qatar Airways",
    hub: "Doha (DOH)",
    from: "London Heathrow, Manchester, Edinburgh, Birmingham",
    duration: "~14-16 hours total",
    note: "Premium service and award-winning business class. Good for travelers wanting a more comfortable long-haul journey.",
  },
  {
    airline: "Kenya Airways",
    hub: "Nairobi (NBO)",
    from: "London Heathrow",
    duration: "~13-15 hours total",
    note: "Direct to Nairobi then short hop to Kilimanjaro. Useful if combining Kenya and Tanzania.",
  },
];

const ukHolidaySeasons = [
  {
    period: "February Half-Term",
    months: "Mid February",
    safari: "Calving season in the southern Serengeti. Over 8,000 wildebeest calves born daily. Predator action is non-stop. Warm and green landscapes make for excellent photography.",
    weather: "Hot (28-32°C). Short afternoon showers possible.",
    crowd: "Moderate",
    price: "Mid-range",
  },
  {
    period: "Easter Holidays",
    months: "Late March - Mid April",
    safari: "Green season transitioning into long rains. Fewer tourists, lower prices, lush scenery, and excellent birdwatching with migratory species. Some lodges offer 30-40% discounts.",
    weather: "Warm (25-28°C). Afternoon rain showers likely.",
    crowd: "Low",
    price: "Budget-friendly",
  },
  {
    period: "May Half-Term",
    months: "Late May - Early June",
    safari: "Rains ending, migration herds gathering in the western Serengeti corridor. Grumeti river crossings begin. Excellent value as peak season has not yet started.",
    weather: "Pleasant (24-28°C). Rain tapering off.",
    crowd: "Low to Moderate",
    price: "Great value",
  },
  {
    period: "Summer Holidays",
    months: "July - August",
    safari: "Peak season. The Great Migration is in full swing with dramatic Mara river crossings. This is the most iconic safari period and the best time for first-time visitors from the UK.",
    weather: "Dry and warm (25-30°C). Cool mornings.",
    crowd: "High",
    price: "Peak pricing",
  },
  {
    period: "October Half-Term",
    months: "Late October",
    safari: "Migration herds returning south. Short rains beginning to green the landscape. Excellent game viewing with fewer vehicles. Often the sweet spot for value and experience.",
    weather: "Warm (27-31°C). Light showers starting.",
    crowd: "Moderate",
    price: "Mid-range",
  },
  {
    period: "Christmas & New Year",
    months: "December - Early January",
    safari: "Short rains ending. Herds in southern Serengeti. Calving season approaching. Festive safari dinners under the stars. A magical time but book 6-9 months ahead.",
    weather: "Warm (26-30°C). Occasional showers.",
    crowd: "High",
    price: "Peak pricing",
  },
];

const pricingGuide = [
  {
    level: "Budget Safari",
    usd: "$1,500 - $2,500",
    gbp: "\u00a31,200 - \u00a32,000",
    perDay: "\u00a3170 - \u00a3285/day",
    includes: "Basic lodges or camping, shared vehicle, all park fees, meals, airport transfers",
    best: "Solo travelers, backpackers, budget-conscious couples",
  },
  {
    level: "Mid-Range Safari",
    usd: "$2,500 - $4,500",
    gbp: "\u00a32,000 - \u00a33,600",
    perDay: "\u00a3285 - \u00a3510/day",
    includes: "Quality lodges and tented camps, private vehicle and guide, all meals, park fees, airport transfers",
    best: "Couples, families, first-time safari travelers",
  },
  {
    level: "Luxury Safari",
    usd: "$4,500 - $8,000+",
    gbp: "\u00a33,600 - \u00a36,400+",
    perDay: "\u00a3510 - \u00a3900+/day",
    includes: "Premium lodges and luxury tented camps, private 4x4, expert guide, all meals and drinks, bush dinners, balloon safaris",
    best: "Honeymooners, special occasions, luxury travelers",
  },
];

const comboPackages = [
  {
    icon: Mountain,
    title: "Kilimanjaro + Safari",
    duration: "12-16 days",
    description:
      "Summit Africa's highest peak then celebrate with a wildlife safari through the Serengeti and Ngorongoro Crater. The ultimate Tanzania adventure combining two bucket-list experiences in a single trip. Most UK travelers take a rest day in Arusha between the climb and safari.",
    price: "From \u00a33,200",
    highlights: ["7-8 day Kilimanjaro trek", "4-5 day northern circuit safari", "All Big Five parks", "Rest day in Arusha"],
  },
  {
    icon: Palmtree,
    title: "Safari + Zanzibar Beach",
    duration: "10-14 days",
    description:
      "Combine the thrill of Big Five game drives with the white-sand beaches and turquoise waters of Zanzibar. Fly from the Serengeti or Arusha to Zanzibar in under 2 hours. Perfect for couples and families wanting adventure and relaxation in one trip.",
    price: "From \u00a32,800",
    highlights: ["5-7 day wildlife safari", "4-5 days Zanzibar beach", "Stone Town tour", "Snorkelling or diving"],
  },
  {
    icon: Globe,
    title: "Kilimanjaro + Safari + Zanzibar",
    duration: "18-22 days",
    description:
      "The ultimate Tanzania triple. Climb Kilimanjaro, recover with world-class game drives, then unwind on Zanzibar's pristine beaches. This is the trip UK travelers dream about taking once in a lifetime, and the one they talk about for decades after.",
    price: "From \u00a34,500",
    highlights: ["7-8 day Kilimanjaro summit", "4-5 day safari", "4-5 days Zanzibar", "Internal flights included"],
  },
];

const ukTestimonials = [
  {
    quote:
      "We flew from Manchester via Amsterdam and were met at Kilimanjaro Airport by the Snow Africa team. Everything was seamless from start to finish. The Serengeti exceeded every expectation we had. We saw a leopard on our very first game drive.",
    author: "James & Sarah P.",
    location: "Manchester, UK",
    trip: "10-Day Safari & Zanzibar",
    rating: 5,
  },
  {
    quote:
      "As a solo female traveler from London, I was a bit nervous about booking directly with a local operator. But Emmanuel and his team were incredibly professional. The communication before the trip was excellent and the safari itself was life-changing.",
    author: "Charlotte M.",
    location: "London, UK",
    trip: "7-Day Northern Circuit Safari",
    rating: 5,
  },
  {
    quote:
      "We took the kids during October half-term and it was absolutely perfect. The weather was great, the parks were quieter than summer, and the children were mesmerised by the animals. Snow Africa made sure every detail was sorted so we could just enjoy the experience.",
    author: "The Henderson Family",
    location: "Edinburgh, UK",
    trip: "8-Day Family Safari",
    rating: 5,
  },
  {
    quote:
      "I climbed Kilimanjaro via the Lemosho route then did a 5-day safari. The transition from mountain to savannah was incredible. The guides were world-class and the whole trip cost less than what UK agencies were quoting me for safari alone.",
    author: "David R.",
    location: "Bristol, UK",
    trip: "14-Day Kilimanjaro + Safari",
    rating: 5,
  },
];

const ukInsuranceProviders = [
  { name: "World Nomads", note: "Popular with adventure travelers. Covers safari activities and Kilimanjaro trekking up to 6,000m." },
  { name: "Staysure", note: "Good for older travelers and those with pre-existing conditions. Safari cover included." },
  { name: "True Traveller", note: "Excellent value. Adventure sports add-on covers Kilimanjaro. Highly rated by UK backpackers." },
  { name: "Alpha Travel Insurance", note: "Specialist safari cover. Single-trip and annual multi-trip options." },
  { name: "Coverwise", note: "Budget-friendly option with solid medical cover. Good for straightforward safari trips." },
];

const ukFaqs = [
  {
    question: "Do UK citizens need a visa for Tanzania?",
    answer:
      "Yes. UK passport holders require a tourist visa to enter Tanzania. The easiest option is the Tanzania e-visa, which costs approximately $50 (around \u00a340). Apply online at visa.immigration.go.tz at least 2 weeks before travel. Processing typically takes 3-10 business days. You can also obtain a visa on arrival at Kilimanjaro International Airport, but the e-visa avoids queuing after a long flight. Your passport must have at least 6 months validity from your date of entry and at least 2 blank pages.",
  },
  {
    question: "How long is the flight from London to Tanzania?",
    answer:
      "There are no direct flights from the UK to Tanzania. The fastest connections take approximately 10-12 hours with one stop. KLM via Amsterdam and Turkish Airlines via Istanbul are the most popular routes, with total journey times of 12-15 hours including the layover. Most flights arrive at Kilimanjaro International Airport (JRO), which is the closest airport to both Arusha (the safari capital) and Mount Kilimanjaro. Some travelers fly into Dar es Salaam (DAR) if heading straight to Zanzibar.",
  },
  {
    question: "What is the best time of year for a UK traveler to visit Tanzania?",
    answer:
      "The best time depends on what you want to see and when you can travel. For the Great Migration river crossings, July-August aligns perfectly with UK summer holidays. October half-term offers excellent game viewing with fewer crowds and better prices. February half-term coincides with the calving season in the Serengeti. Christmas holidays are magical but expensive and must be booked well in advance. The only period to approach with caution is April-May during the long rains, though even then, the southern parks and Zanzibar remain accessible.",
  },
  {
    question: "How much does a Tanzania safari cost from the UK in pounds?",
    answer:
      "A mid-range Tanzania safari typically costs \u00a32,000-\u00a33,600 per person for a 7-day trip, not including international flights. Budget safaris start from around \u00a31,200, while luxury experiences can exceed \u00a36,400. Return flights from London to Kilimanjaro range from \u00a3400-\u00a3800 depending on the season and how far in advance you book. All our safari prices include park fees, accommodation, meals, a private vehicle with guide, and airport transfers. There are no hidden costs.",
  },
  {
    question: "Is it safe to book directly with a Tanzanian tour operator?",
    answer:
      "Yes, provided you choose a licensed operator. Snow Africa Adventure is a registered member of TATO (Tanzania Association of Tour Operators) and a KPAP partner (Kilimanjaro Porters Assistance Project). We have a 4.9-star rating on TripAdvisor with over 115 reviews and a 5.0 rating on SafariBookings. Booking directly with a local operator saves you 20-40% compared to UK travel agencies who act as intermediaries. You also get direct communication with the team managing your safari, which means faster responses and more personalised service.",
  },
  {
    question: "Do I need a yellow fever vaccination to visit Tanzania from the UK?",
    answer:
      "If you are flying directly from the UK (via a non-endemic transit country like the Netherlands, Turkey, or Qatar), a yellow fever certificate is NOT required for Tanzania entry. However, if your flight transits through a yellow fever endemic country such as Ethiopia or Kenya for more than 12 hours, you may be asked to show a yellow fever vaccination certificate at immigration. It is advisable to check current NHS travel health advice before departure. Other recommended vaccinations include hepatitis A, typhoid, and anti-malaria prophylaxis.",
  },
  {
    question: "What currency should I bring to Tanzania?",
    answer:
      "US dollars are the most widely accepted foreign currency in Tanzania and are used for park fees, accommodation, and most tourism services. We recommend bringing crisp, undamaged US dollar notes printed after 2006 (older notes are often rejected). You can exchange GBP at Kilimanjaro Airport or in Arusha, but rates are better for USD. ATMs in Arusha and larger towns dispense Tanzanian shillings. For tips and small purchases at local markets, Tanzanian shillings are preferred. Credit cards are accepted at larger hotels and lodges but not at smaller establishments or in parks.",
  },
  {
    question: "Can I combine a Kilimanjaro climb with a safari?",
    answer:
      "Absolutely. This is one of the most popular combinations for UK travelers visiting Tanzania. A typical Kilimanjaro + safari itinerary is 12-16 days: 7-8 days for the climb, a rest day in Arusha, then 4-5 days on safari. Both activities depart from Arusha, so there is no additional travel between destinations. Many UK travelers also add 4-5 days in Zanzibar at the end for beach recovery. We handle all logistics including internal flights, accommodation between activities, and equipment storage during your safari.",
  },
  {
    question: "What should I pack for a Tanzania safari from the UK?",
    answer:
      "Pack light, neutral-coloured clothing (khaki, olive, beige) as bright colours can disturb wildlife. Bring layers for cool mornings and evenings, especially in the Ngorongoro Crater where temperatures can drop to 10°C. Essential items include: a good pair of binoculars, sunscreen (SPF 50+), insect repellent with DEET, a wide-brimmed hat, a lightweight rain jacket, comfortable walking shoes, and a camera with a zoom lens (200mm minimum). UK plug adapters are needed as Tanzania uses Type D and Type G sockets. Most safari lodges provide laundry service, so you do not need to pack for every day.",
  },
  {
    question: "How far in advance should I book my Tanzania safari?",
    answer:
      "We recommend booking at least 3-6 months in advance for most travel dates. For peak periods aligned with UK school holidays (July-August, Christmas, February half-term), book 6-9 months ahead as the best lodges and camps sell out quickly. Last-minute bookings (4-8 weeks) are sometimes possible during green season (April-May) when demand is lower, but availability is limited and you may not get your preferred accommodation. Early booking also secures the best flight prices from the UK.",
  },
];

const whyBookDirect = [
  {
    icon: PoundSterling,
    title: "Save 20-40% vs UK Agencies",
    description:
      "UK travel agencies and safari brokers add a markup of 20-40% on top of the local operator's price. When you book directly with Snow Africa Adventure, you pay the local rate with no intermediary fees. That saving can fund an extra 2-3 days on safari or a Zanzibar beach extension.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description:
      "No middlemen, no lost-in-translation emails. You communicate directly with our team in Arusha who will manage every detail of your trip. WhatsApp, email, video calls — we are available on your schedule, including evenings and weekends UK time.",
  },
  {
    icon: Shield,
    title: "TATO Licensed & Insured",
    description:
      "Snow Africa Adventure is a fully licensed member of TATO (Tanzania Association of Tour Operators) and operates under TANAPA (Tanzania National Parks Authority) regulations. All our vehicles are insured and our guides are KINAPA-certified for Kilimanjaro.",
  },
  {
    icon: Star,
    title: "4.9 TripAdvisor, 5.0 SafariBookings",
    description:
      "Over 115 verified reviews from travelers worldwide, including dozens from the UK. Our ratings speak for themselves: 4.9 stars on TripAdvisor and a perfect 5.0 on SafariBookings. Read what other British travelers say about their experience.",
  },
  {
    icon: Heart,
    title: "Ethical & Responsible",
    description:
      "We are a KPAP partner ensuring fair wages and proper equipment for all Kilimanjaro porters. Our safari guides are local Tanzanians who support their communities. Every booking contributes directly to the Tanzanian economy — not to a London office overhead.",
  },
  {
    icon: Clock,
    title: "Flexible Payment Terms",
    description:
      "Pay a 30% deposit to confirm your booking, with the balance due 60 days before travel. We accept bank transfers in GBP, USD, or EUR, as well as credit card payments. No surcharges for card payments.",
  },
];

export default function TanzaniaSafariFromUKPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tanzania Safaris", url: "/tanzania-safaris/" },
            { name: "Tanzania Safari from UK", url: "/tanzania-safari-from-uk/" },
          ]),
          generateFAQSchema(ukFaqs),
          generateArticleSchema({
            title: "Tanzania Safari from the UK — Complete Planning Guide",
            description:
              "Everything UK travelers need to know about planning a Tanzania safari: flights, visas, GBP pricing, best seasons aligned with school holidays, and why booking direct saves 20-40%.",
            url: "/tanzania-safari-from-uk/",
            image: "https://cdn.snowafricaadventure.com/serengeti-sunset-safari.webp",
            publishedTime: "2025-01-15",
            modifiedTime: "2026-03-11",
          }),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tanzania Safaris", href: "/tanzania-safaris/" },
          { label: "Tanzania Safari from UK" },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.snowafricaadventure.com/serengeti-sunset-safari.webp"
            alt="Serengeti sunset safari — golden hour game drive in Tanzania"
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
                UK Traveler Guide
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">4.9 Rated &bull; 115+ Reviews</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tanzania Safari{" "}
              <span className="text-[var(--secondary)]">from the UK</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Your complete guide to planning the perfect Tanzania safari holiday from
              the United Kingdom. Flights, visas, GBP pricing, and expert local
              knowledge — everything you need in one place.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: "10-12 hrs", label: "Flight Time" },
                { value: "\u00a31,600+", label: "From (pp)" },
                { value: "No Jabs", label: "Required*" },
                { value: "20-40%", label: "Saved vs Agents" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tanzania-safaris/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                View Safari Packages
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Request Custom Itinerary
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
          <div className="max-w-3xl mx-auto bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-emerald-900">
              Quick Answer: Tanzania Safari from the UK
            </h2>
            <div className="space-y-3 text-emerald-800">
              <p>
                <strong>Flights:</strong> No direct flights from the UK. The fastest route is London
                Heathrow to Kilimanjaro International Airport (JRO) via Amsterdam (KLM) or Istanbul
                (Turkish Airlines), taking approximately 10-12 hours with one stop. Flights also
                available from Manchester, Edinburgh, and Birmingham.
              </p>
              <p>
                <strong>Visa:</strong> UK citizens need a Tanzania e-visa, costing approximately $50
                (\u00a340). Apply online 2+ weeks before travel. Passport must have 6+ months validity.
              </p>
              <p>
                <strong>Cost:</strong> Safari packages range from $2,000-$5,000 (\u00a31,600-\u00a34,000)
                per person for 7 days, depending on accommodation level. Return flights from London
                cost \u00a3400-\u00a3800.
              </p>
              <p>
                <strong>Best Time:</strong> July-August for the Great Migration (aligns with UK
                summer holidays). October half-term for fewer crowds and great value. February
                half-term for the calving season.
              </p>
              <p>
                <strong>Key Tip:</strong> Book directly with a local TATO-licensed operator like Snow
                Africa Adventure and save 20-40% compared to UK travel agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Getting There
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Flights from the UK to Tanzania
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            There are no direct flights from the UK to Tanzania, but several excellent one-stop
            connections make the journey straightforward. Most UK travelers fly into Kilimanjaro
            International Airport (JRO), the gateway to both safaris and Kilimanjaro treks.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {flightRoutes.map((route) => (
              <div
                key={route.airline}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Plane className="w-5 h-5 text-[var(--secondary)]" />
                      <h3 className="font-semibold text-lg">{route.airline}</h3>
                      <span className="text-sm text-[var(--text-muted)]">via {route.hub}</span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">
                      <strong>Departing from:</strong> {route.from}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">{route.note}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Clock className="w-4 h-4 text-[var(--secondary)]" />
                      <span className="text-sm font-semibold">{route.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-8 bg-white border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-3">Flight Booking Tips for UK Travelers</h3>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>Book 3-6 months in advance for the best fares. Peak season (July-August, Christmas) flights sell out fast.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>Return flights from London to Kilimanjaro typically cost \u00a3400-\u00a3600 in low season and \u00a3600-\u00a3800 in peak season.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>Use Google Flights or Skyscanner to track prices and set alerts. Midweek departures are usually cheaper.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>Check baggage allowance carefully. Safari luggage in light aircraft is often limited to 15kg in soft bags.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                <span>If connecting via Nairobi, ensure your transit is under 24 hours to avoid needing a Kenyan visa.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Visa & Entry */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Entry Requirements
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Visa &amp; Entry Requirements for UK Citizens
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Tanzania&apos;s visa process is straightforward for British passport holders.
            Here is everything you need to know before you travel.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Tanzania E-Visa</h3>
              <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Apply online at <strong>visa.immigration.go.tz</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Cost: $50 (approximately \u00a340)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Processing time: 3-10 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Valid for 90 days from date of issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Single entry — covers Zanzibar as part of Tanzania</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Passport &amp; Health Requirements</h3>
              <ul className="space-y-2 text-[var(--text-muted)] text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Passport valid for 6+ months from entry date</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>At least 2 blank passport pages required</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Yellow fever certificate if transiting through an endemic country (e.g., Ethiopia, Kenya 12+ hrs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Anti-malaria prophylaxis recommended (consult your GP or travel clinic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Check NHS Fit for Travel and FCDO advice before departure</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Visa on arrival is also available at Kilimanjaro International
              Airport ($50, card or cash), but queues can be long after international flights. We
              strongly recommend applying for the e-visa in advance to save time on arrival.
            </p>
          </div>
        </div>
      </section>

      {/* GBP Pricing Guide */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Pricing in Pounds
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Tanzania Safari Costs in GBP
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Safari pricing is typically quoted in US dollars, but here is a clear breakdown in
            British pounds so you know exactly what to budget. All prices are per person based on
            two sharing.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingGuide.map((tier) => (
              <div
                key={tier.level}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-xl font-bold mb-1">{tier.level}</h3>
                <p className="text-2xl font-bold text-[var(--secondary-dark)] mb-1">{tier.gbp}</p>
                <p className="text-sm text-[var(--text-muted)] mb-4">{tier.perDay} &bull; 7-day trip</p>
                <p className="text-sm text-[var(--text-muted)] mb-4">{tier.includes}</p>
                <div className="pt-3 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)]">
                    <strong>Best for:</strong> {tier.best}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-8 bg-white border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-3">What&apos;s Included in Our Prices</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-emerald-700 mb-2">Included</h4>
                <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>All national park entrance fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Private 4x4 safari vehicle with pop-up roof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Professional English-speaking guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>All accommodation as specified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Full board meals and drinking water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Airport transfers (JRO/ARK)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-500 mb-2">Not Included</h4>
                <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>International flights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>Tanzania visa ($50 / \u00a340)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>Travel insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>Tips for guides and staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>Optional activities (balloon safari, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 shrink-0">&mdash;</span>
                    <span>Alcoholic beverages and personal items</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time for UK Travelers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Seasonal Guide
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Best Time to Visit Tanzania from the UK
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Tanzania is a year-round safari destination, but timing your trip around UK school
            holidays means you can enjoy both excellent wildlife viewing and time off work. Here
            is how each holiday period aligns with safari seasons.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ukHolidaySeasons.map((season) => (
              <div
                key={season.period}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-[var(--secondary)]" />
                  <h3 className="font-semibold text-lg">{season.period}</h3>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-3">{season.months}</p>
                <p className="text-sm text-[var(--text-muted)] mb-4">{season.safari}</p>
                <div className="space-y-1.5 pt-3 border-t border-[var(--border)]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Weather</span>
                    <span className="font-medium">{season.weather}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Crowds</span>
                    <span className="font-medium">{season.crowd}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Price</span>
                    <span className="font-medium text-[var(--secondary-dark)]">{season.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari + Kilimanjaro Combos */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Combination Trips
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Safari + Kilimanjaro + Zanzibar Combos
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            One of the biggest advantages of visiting Tanzania is the ability to combine multiple
            bucket-list experiences in a single trip. If you are flying all the way from the UK,
            it makes sense to experience as much as possible.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {comboPackages.map(({ icon: Icon, title, duration, description, price, highlights }) => (
              <div
                key={title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-1">{title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-[var(--text-muted)]">{duration}</span>
                  <span className="text-sm font-bold text-[var(--secondary-dark)]">{price}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">{description}</p>
                <div className="pt-3 border-t border-[var(--border)]">
                  <ul className="space-y-1">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Design Your Combo Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Safari + Zanzibar Beach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Beach Extension
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Safari + Zanzibar Beach Holiday
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Zanzibar is just a 90-minute flight from the Serengeti or a 60-minute flight from
            Arusha. Adding a beach extension to your Tanzania safari is one of the most popular
            choices for UK travelers, and with good reason.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-4">Why UK Travelers Love This Combination</h3>
              <ul className="space-y-3 text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span>
                    <strong>Contrast of experiences</strong> — transition from dusty game drives to
                    white-sand beaches and turquoise Indian Ocean waters. The shift in scenery is
                    extraordinary and gives your trip a natural rhythm of adventure followed by
                    relaxation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span>
                    <strong>No additional visa</strong> — Zanzibar is part of Tanzania, so your
                    existing e-visa covers the entire trip. No extra paperwork or costs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span>
                    <strong>Cultural immersion</strong> — explore Stone Town, a UNESCO World Heritage
                    Site with centuries of Arab, Persian, Indian, and European influence. Spice tours,
                    night food markets, and dhow sailing add depth beyond the beach.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                  <span>
                    <strong>Water activities</strong> — snorkelling, diving, kitesurfing, sunset
                    cruises, dolphin tours, and deep-sea fishing. The Mnemba Atoll offers some of
                    the best diving in the Indian Ocean.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-4">Sample 12-Day Itinerary</h3>
              <div className="space-y-4">
                {[
                  { days: "Day 1", desc: "Arrive Kilimanjaro Airport. Transfer to Arusha. Overnight at lodge." },
                  { days: "Days 2-3", desc: "Tarangire National Park. Elephant herds, baobab forests, and big cats." },
                  { days: "Days 4-5", desc: "Serengeti National Park. Great Migration, Big Five, endless plains." },
                  { days: "Day 6", desc: "Ngorongoro Crater. Full day in the caldera. All Big Five possible." },
                  { days: "Day 7", desc: "Fly Arusha to Zanzibar. Afternoon at leisure on Nungwi Beach." },
                  { days: "Days 8-10", desc: "Zanzibar beach. Snorkelling, Stone Town tour, spice plantation visit." },
                  { days: "Day 11", desc: "Final beach day or optional diving at Mnemba Atoll." },
                  { days: "Day 12", desc: "Transfer to Zanzibar Airport. Fly home via Dar es Salaam or Nairobi." },
                ].map((item) => (
                  <div key={item.days} className="flex gap-3">
                    <span className="text-xs font-bold text-[var(--secondary)] whitespace-nowrap mt-0.5 w-16 shrink-0">
                      {item.days}
                    </span>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--secondary-dark)]">From \u00a32,800 per person</p>
                <p className="text-xs text-[var(--text-muted)]">Based on 2 sharing, mid-range accommodation</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/zanzibar/"
              className="inline-block border-2 border-[var(--border)] hover:border-[var(--secondary)] text-[var(--text)] hover:text-[var(--secondary)] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Zanzibar Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Book Direct &amp; Save
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Why Book Direct with a Local Operator?
          </h2>
          <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto">
            Most UK travelers who book through a British travel agency or safari broker do not
            realise they are paying a 20-40% markup. The agency sells you the exact same safari
            that we operate, but charges you significantly more for the privilege of being an
            intermediary. Here is why booking directly with Snow Africa Adventure is a better choice.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {whyBookDirect.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-white/10 border border-white/20 rounded-xl p-6 text-center">
            <h3 className="font-heading text-xl font-bold mb-2">The Maths Speaks for Itself</h3>
            <p className="text-white/80 mb-4">
              A typical 7-day mid-range safari that costs \u00a32,500 when booked directly with us
              would cost \u00a33,250-\u00a33,500 through a UK travel agency. That \u00a3750-\u00a31,000
              saving could pay for 3 extra days on safari, a Zanzibar beach extension, or a
              Kilimanjaro day hike. Same vehicles, same lodges, same guides — just less money
              going to middlemen in London.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Insurance */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Stay Protected
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Travel Insurance for UK Safari Travelers
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Travel insurance is essential for any Tanzania safari. Medical facilities in remote
            safari areas are limited, and emergency evacuation by air ambulance can cost upwards
            of \u00a330,000. Here are reputable UK-based providers that cover safari activities.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {ukInsuranceProviders.map((provider) => (
              <div
                key={provider.name}
                className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{provider.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-8 bg-white border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-3">What Your Safari Insurance Should Cover</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Emergency medical treatment (minimum \u00a32 million)",
                "Emergency evacuation and repatriation",
                "Trip cancellation and curtailment",
                "Baggage loss and delay",
                "Safari and game drive activities",
                "Kilimanjaro trekking (if applicable, up to 6,000m)",
                "Flight delay and missed connections",
                "Personal liability cover",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              <strong>FCDO Advice:</strong> Always check the latest Foreign, Commonwealth &amp;
              Development Office (FCDO) travel advice for Tanzania before departing. Your insurance
              may be invalidated if you travel against FCDO guidance.
            </p>
          </div>
        </div>
      </section>

      {/* What UK Travelers Say */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            UK Traveler Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What UK Travelers Say About Us
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Dozens of travelers from across the United Kingdom have trusted Snow Africa Adventure
            to deliver their dream Tanzania safari. Here is what some of them had to say.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ukTestimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] mb-4 italic leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="font-semibold">{test.author}</p>
                  <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{test.location}</span>
                  </div>
                  <p className="text-sm text-[var(--secondary-dark)] font-medium">{test.trip}</p>
                </div>
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
              Tanzania Safari from the UK: Your Questions Answered
            </h2>
            <div className="space-y-4">
              {ukFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white border border-[var(--border)] rounded-xl shadow-sm"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold hover:text-[var(--secondary)] transition-colors">
                    <span itemProp="name">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div
                    className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Continue Reading
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            Related Tanzania Guides
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { title: "Tanzania Safaris", href: "/tanzania-safaris/", desc: "Browse all safari packages" },
              { title: "Zanzibar Holidays", href: "/zanzibar/", desc: "Beach and island escapes" },
              { title: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/", desc: "Routes, costs, and tips" },
              { title: "Kilimanjaro Prices", href: "/kilimanjaro-prices/", desc: "Full cost breakdown" },
              { title: "Tanzania Destinations", href: "/tanzania-destinations/", desc: "Parks and places to visit" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[var(--secondary)] transition-all text-center group"
              >
                <h3 className="font-semibold group-hover:text-[var(--secondary)] transition-colors mb-1">
                  {guide.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Tanzania Safari from the UK?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Tell us your dates, budget, and interests and we will design a bespoke Tanzania
            safari just for you. No obligation, no agency markup — just expert local advice
            from the team who will actually guide your trip.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tanzania-safaris/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Safari Packages
            </Link>
            <Link
              href="/tailor-made-safari/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request a Free Quote
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-6">
            TATO Licensed &bull; KPAP Partner &bull; 4.9 TripAdvisor &bull; 5.0 SafariBookings &bull; 15+ Years Experience
          </p>
        </div>
      </section>
    </div>
  );
}
