import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Shield,
  DollarSign,
  Calendar,
  Star,
  ChevronDown,
  Check,
  Globe,
  Phone,
  Heart,
  Mountain,
  Clock,
  Users,
  MapPin,
  ArrowRight,
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
  title: "Climb Kilimanjaro from USA",
  description:
    "Complete guide for Americans climbing Kilimanjaro. Flights from US cities, visa requirements, USD pricing from $1,850, packing tips, and booking with a TATO-licensed local operator.",
  url: "/climb-kilimanjaro-from-usa/",
});

const usaFaqs = [
  {
    question: "Do I need a visa to climb Kilimanjaro as a US citizen?",
    answer:
      "Yes, US citizens need a Tanzania tourist visa. You can obtain a single-entry e-visa online at visa.immigration.go.tz for $50 USD before your trip, or get a visa on arrival at Kilimanjaro International Airport (JRO). The e-visa is recommended to avoid queues — processing takes 3-10 business days. Your passport must be valid for at least 6 months beyond your entry date and have at least 2 blank pages.",
  },
  {
    question:
      "How do I fly from the US to Kilimanjaro?",
    answer:
      "There are no direct flights from the US to Tanzania. The most common routing is through Amsterdam (KLM), Istanbul (Turkish Airlines), Doha (Qatar Airways), or Addis Ababa (Ethiopian Airlines). From the East Coast (JFK/Newark), total travel time is typically 18-22 hours with one connection. From the West Coast (LAX/SFO), expect 22-28 hours. Round-trip flights typically cost $800-$1,500 depending on season and how far in advance you book.",
  },
  {
    question: "Is it safe for Americans to travel to Tanzania?",
    answer:
      "Tanzania is one of the safest countries in East Africa for tourists and receives over 1.5 million international visitors annually. The US State Department rates Tanzania as a Level 2 (Exercise Increased Caution), similar to many popular European destinations. Kilimanjaro National Park is well-regulated by KINAPA (Kilimanjaro National Park Authority), and all climbing teams include certified guides. Our 15+ years of operation have seen zero serious safety incidents.",
  },
  {
    question: "What vaccinations do I need for Tanzania?",
    answer:
      "The CDC recommends the following for Tanzania: Yellow Fever vaccination (required if arriving from a country with yellow fever risk), Hepatitis A, Typhoid, and routine vaccines (MMR, Tetanus, Polio). Malaria prophylaxis is recommended for areas below 1,800m — you will be above this altitude on Kilimanjaro, but may need it for pre/post-climb time in Arusha or on safari. Consult a travel medicine clinic 6-8 weeks before departure.",
  },
  {
    question: "Can I use my US cell phone on Kilimanjaro?",
    answer:
      "US cell phones work in Arusha and Moshi with international roaming, but coverage on Kilimanjaro is spotty above 3,000m and nonexistent above 4,500m. We recommend buying a local Vodacom or Airtel SIM card at the airport ($5-10 for a SIM with data) for use in town. On the mountain, bring a portable battery pack — there are no charging points. Some climbers bring satellite communicators (Garmin inReach) for emergency contact above the treeline.",
  },
  {
    question: "What currency should I bring to Tanzania?",
    answer:
      "The local currency is the Tanzanian Shilling (TZS), but US dollars are widely accepted for tourism services. Bring clean, post-2006 US bills — older or damaged bills are often refused. Your climbing package is priced and payable in USD. For tips, small denominations ($1, $5, $10, $20) are ideal. ATMs in Arusha and Moshi accept US debit cards (Visa/Mastercard), and most hotels accept credit cards with a 3-5% surcharge.",
  },
  {
    question: "How do I handle jet lag before climbing Kilimanjaro?",
    answer:
      "Tanzania is 7-10 hours ahead of US time zones (EST+7, PST+10). We strongly recommend arriving 1-2 days before your climb starts to adjust. Fly overnight from the US to arrive in the morning Tanzanian time, stay hydrated on the flight, and spend your first day outdoors in natural light. Avoid sleeping during the day. Most of our US climbers feel fully adjusted within 24-48 hours — the physical activity of trekking helps reset your body clock quickly.",
  },
  {
    question: "What travel insurance do American climbers need?",
    answer:
      "You need travel insurance that specifically covers high-altitude trekking up to 6,000m, emergency helicopter evacuation, trip cancellation, and medical repatriation. Standard US travel insurance often excludes altitude above 3,000m. Recommended providers for US climbers include World Nomads (Explorer Plan), Allianz Global Assistance, IMG Global, and Global Rescue. Expect to pay $150-$300 for a 2-3 week policy. Insurance is mandatory — we verify coverage before your climb begins.",
  },
  {
    question: "How much should I tip my Kilimanjaro guides and porters?",
    answer:
      "Tipping is customary and expected on Kilimanjaro. The recommended guidelines are: Lead Guide $20-25/day, Assistant Guide(s) $15-20/day each, Cook $10-15/day, and Porters $8-10/day each. For a typical 7-day trek with a team of 2 guides, 1 cook, and 6-8 porters, budget $500-$700 total in tips. Tips are given in cash (USD or TZS) at the end of the trek during a farewell ceremony. We provide tip envelopes and a suggested breakdown.",
  },
  {
    question:
      "Can I combine Kilimanjaro with a safari or Zanzibar beach trip?",
    answer:
      "Absolutely — this is what most American visitors do. After your Kilimanjaro climb, you can add a 3-5 day safari to the Serengeti, Ngorongoro Crater, Tarangire, or Lake Manyara. Zanzibar is a 1-hour flight from Kilimanjaro Airport, perfect for 3-5 days of beach recovery. We offer combo packages that include Kilimanjaro + Safari, Kilimanjaro + Zanzibar, or the full Kilimanjaro + Safari + Zanzibar itinerary at bundled prices.",
  },
];

const flightRoutes = [
  {
    city: "New York (JFK/EWR)",
    airlines: "KLM via Amsterdam, Turkish Airlines via Istanbul, Qatar Airways via Doha",
    duration: "18-22 hours",
    priceRange: "$800-$1,200",
  },
  {
    city: "Los Angeles (LAX)",
    airlines: "Turkish Airlines via Istanbul, Qatar Airways via Doha, Ethiopian via Addis Ababa",
    duration: "22-28 hours",
    priceRange: "$900-$1,400",
  },
  {
    city: "Chicago (ORD)",
    airlines: "KLM via Amsterdam, Turkish Airlines via Istanbul, Ethiopian via Addis Ababa",
    duration: "20-24 hours",
    priceRange: "$850-$1,300",
  },
  {
    city: "Atlanta (ATL)",
    airlines: "KLM via Amsterdam, Turkish Airlines via Istanbul, Qatar Airways via Doha",
    duration: "19-23 hours",
    priceRange: "$850-$1,200",
  },
  {
    city: "Miami (MIA)",
    airlines: "Turkish Airlines via Istanbul, Qatar Airways via Doha, Emirates via Dubai",
    duration: "20-24 hours",
    priceRange: "$850-$1,300",
  },
];

const testimonials = [
  {
    name: "Michael R.",
    location: "Denver, Colorado",
    route: "Lemosho Route, 8 Days",
    quote:
      "As someone who has hiked extensively in Colorado and the Rockies, I thought Kilimanjaro would be just another big mountain. It was so much more. The cultural experience, the incredible guides, and watching the sunrise from Uhuru Peak — nothing compares. Snow Africa made the entire process seamless from booking to summit. Worth every penny.",
    rating: 5,
  },
  {
    name: "Sarah & Tom K.",
    location: "Austin, Texas",
    route: "Machame Route, 7 Days",
    quote:
      "We were nervous about booking directly with a Tanzanian company instead of a US tour operator, but it was the best decision we made. The communication was excellent, the guides were professional and genuinely caring, and we saved nearly $2,000 compared to the US agency quotes we got. Both of us summited on our first attempt.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    location: "New York, New York",
    route: "Lemosho Route, 8 Days",
    quote:
      "I climbed Kilimanjaro for my 50th birthday and it was the most meaningful trip of my life. Emmanuel and his team took care of everything — from the airport pickup to the summit champagne. I was worried about altitude sickness as a first-time high-altitude trekker, but the acclimatization schedule was perfect. I felt strong all the way to the top.",
    rating: 5,
  },
];

const relatedGuides = [
  {
    title: "Complete Kilimanjaro Climbing Guide",
    description: "Everything you need to know about climbing Africa's highest peak — routes, training, gear, and more.",
    href: "/climbing-kilimanjaro/",
    icon: Mountain,
  },
  {
    title: "Kilimanjaro Prices & Cost Breakdown",
    description: "Understand exactly what you pay for — park fees, guide wages, equipment, and how to compare operators.",
    href: "/kilimanjaro-prices/",
    icon: DollarSign,
  },
  {
    title: "Best Time to Climb Kilimanjaro",
    description: "Month-by-month guide to weather, crowds, and summit conditions throughout the year.",
    href: "/best-time-to-climb-kilimanjaro/",
    icon: Calendar,
  },
  {
    title: "Kilimanjaro Gear & Packing List",
    description: "The complete packing list with gear recommendations, weights, and what your operator provides.",
    href: "/kilimanjaro-climbing-gear/",
    icon: Shield,
  },
  {
    title: "Best Route to Climb Kilimanjaro",
    description: "Compare all 7 routes side-by-side with success rates, difficulty, cost, and scenery ratings.",
    href: "/best-route-to-climb-kilimanjaro/",
    icon: MapPin,
  },
];

export default async function ClimbKilimanjaroFromUSAPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Climb Kilimanjaro from USA", url: "/climb-kilimanjaro-from-usa/" },
          ]),
          generateFAQSchema(usaFaqs),
          generateArticleSchema({
            title: "Climb Kilimanjaro from the USA: Complete Guide for American Travelers",
            description:
              "Complete guide for Americans climbing Kilimanjaro. Flights from US cities, visa requirements, USD pricing, packing tips, and booking with a TATO-licensed local operator.",
            url: "/climb-kilimanjaro-from-usa/",
            image: "https://cdn.snowafricaadventure.com/kilimanjaro-summit-sunrise.webp",
            publishedTime: "2026-03-11",
            modifiedTime: "2026-03-11",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Operator",
              "Wilderness First Responder",
            ],
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh]">
        <div className="absolute inset-0">
          <Image
            src="https://cdn.snowafricaadventure.com/kilimanjaro-summit-sunrise.webp"
            alt="American climbers reaching the summit of Mount Kilimanjaro at sunrise"
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
                { label: "Trekking Routes", href: "/trekking/" },
                { label: "Climb Kilimanjaro from USA" },
              ]}
            />

            <div className="flex items-center gap-2 mb-4 mt-4">
              <span className="px-4 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-semibold">
                US Travelers Guide
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">
                  4.9 TripAdvisor &bull; 93% Summit Success
                </span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Climb Kilimanjaro from the USA
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              The complete guide for American travelers — flights, visas, USD
              pricing, and how to book directly with a TATO-licensed Tanzanian
              operator at local rates.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: Plane, value: "18-28h", label: "Travel Time" },
                { icon: DollarSign, value: "$1,850+", label: "Climb Cost" },
                { icon: Globe, value: "$50", label: "Visa Fee" },
                { icon: Mountain, value: "5,895m", label: "Summit" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-white"
                >
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
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                View All Routes & Prices
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Join a Group Departure
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Quick Answer Box — Featured Snippet Target */}
      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white border-2 border-emerald-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-emerald-900 mb-3">
                  Quick Answer: How to Climb Kilimanjaro from the USA
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Fly from any major US airport to Kilimanjaro International
                  Airport (JRO) via Amsterdam (KLM), Istanbul (Turkish Airlines),
                  or Doha (Qatar Airways). Total travel time is 18-28 hours with
                  one connection. Round-trip flights cost{" "}
                  <strong>$800-$1,500</strong>. The climb itself costs{" "}
                  <strong>$1,850-$4,500</strong> depending on route and duration,
                  with all park fees, guides, porters, meals, and transfers
                  included. US citizens need a{" "}
                  <strong>$50 Tanzania e-visa</strong> and a passport valid for
                  6+ months.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <Check className="w-4 h-4" /> No direct flights — 1 layover
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <Check className="w-4 h-4" /> Visa on arrival or e-visa
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <Check className="w-4 h-4" /> All prices in USD
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <Check className="w-4 h-4" /> No technical skills needed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Getting There — Flights from the US */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Getting There
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Flights from the US to Kilimanjaro
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            There are no direct flights from the United States to Tanzania.
            Every routing involves one connection — typically in Europe or the
            Middle East. Here is what to expect from the five most common US
            departure cities.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {flightRoutes.map((route) => (
              <div
                key={route.city}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 md:w-1/4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Plane className="w-5 h-5 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-lg">{route.city}</h3>
                  </div>
                  <div className="md:w-2/4">
                    <p className="text-sm text-[var(--text-muted)]">
                      {route.airlines}
                    </p>
                  </div>
                  <div className="flex gap-6 md:w-1/4 md:justify-end">
                    <div className="text-center">
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        Duration
                      </p>
                      <p className="font-semibold text-sm">{route.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        Cost
                      </p>
                      <p className="font-semibold text-sm text-[var(--primary)]">
                        {route.priceRange}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Flight Booking Tips for US Travelers
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Book 3-6 months ahead</strong> for the best fares.
                  Peak season (June-August, December-January) flights sell out
                  early and cost more.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Consider a long layover</strong> in Amsterdam,
                  Istanbul, or Doha to break up the journey. Some airlines allow
                  free stopovers of 12-24 hours.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Fly into JRO, not DAR.</strong> Kilimanjaro
                  International Airport (JRO) is 45 minutes from Moshi and 90
                  minutes from Arusha. Dar es Salaam (DAR) is a domestic flight
                  or 8-hour drive away.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Use Google Flights or Skyscanner</strong> to set fare
                  alerts. Prices fluctuate significantly — a $200+ saving is
                  common if you watch for deals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Pack a carry-on with essentials.</strong> Checked bags
                  sometimes arrive a day late on multi-connection flights. Keep
                  your hiking boots, medications, and one change of clothes in
                  your carry-on.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Visa & Entry Requirements */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Entry Requirements
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Visa & Entry Requirements for US Citizens
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Tanzania has straightforward entry requirements for American
            passport holders. Here is everything you need to know before you
            fly.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Tanzania Tourist Visa</h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Cost:</strong> $50 USD for single-entry tourist visa
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>E-visa:</strong> Apply online at
                    visa.immigration.go.tz — processing takes 3-10 business days
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Visa on arrival:</strong> Available at JRO airport
                    (bring exact change in USD)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Validity:</strong> 90 days from date of entry
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Recommendation:</strong> Apply for the e-visa 2-3
                    weeks before your trip to avoid airport queues
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Passport Requirements</h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Validity:</strong> At least 6 months beyond your
                    entry date into Tanzania
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Blank pages:</strong> At least 2 blank pages required
                    for visa stamps
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Condition:</strong> Must be undamaged — no torn or
                    water-damaged pages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Copies:</strong> Bring 2 photocopies and a digital
                    photo stored in your email or cloud
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Renewal:</strong> If your passport expires within 8
                    months, renew it before booking flights
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Health & Vaccinations
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Yellow Fever:</strong> Required if arriving from an
                    endemic country (not required from the US directly)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Recommended:</strong> Hepatitis A, Typhoid, Tetanus
                    booster, routine vaccines (MMR, Polio)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Malaria:</strong> Prophylaxis recommended for
                    pre/post-climb time below 1,800m
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Diamox:</strong> Ask your doctor about altitude
                    medication (Acetazolamide) — many US climbers take it
                    preventatively
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Timeline:</strong> Visit a travel medicine clinic 6-8
                    weeks before departure
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Money & Currency Tips
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>USD widely accepted</strong> for tourism services,
                    hotels, and tour operators
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Bring clean, post-2006 bills</strong> — older or
                    damaged US bills are often refused in Tanzania
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>ATMs available</strong> in Arusha and Moshi (Visa and
                    Mastercard accepted)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Tip budget:</strong> Bring $500-$700 in small bills
                    ($1, $5, $10, $20) for guide and porter tips
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Notify your bank</strong> before traveling to avoid
                    card blocks on international transactions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: USD Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Transparent USD Pricing
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What&apos;s Included in Your Kilimanjaro Climb
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            All our Kilimanjaro packages are priced in US dollars with no hidden
            fees. Here is exactly what your money covers — and how it compares
            to booking through a US-based tour agency.
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                tier: "Budget",
                price: "$1,850 - $2,200",
                routes: "Marangu (5-6 days), Rongai (6 days)",
                color: "bg-blue-50 border-blue-200",
                accent: "text-blue-700",
                features: [
                  "All KINAPA park fees",
                  "Certified mountain guides",
                  "Licensed porters (3:1 ratio)",
                  "3 meals daily + snacks",
                  "Camping equipment",
                  "Emergency oxygen",
                  "Airport transfers",
                  "Pre-climb hotel night",
                ],
              },
              {
                tier: "Most Popular",
                price: "$2,200 - $3,200",
                routes: "Machame (7 days), Lemosho (8 days)",
                color: "bg-amber-50 border-amber-200",
                accent: "text-amber-700",
                features: [
                  "Everything in Budget, plus:",
                  "Higher guide-to-climber ratio",
                  "Upgraded sleeping tents",
                  "Dining tent with tables & chairs",
                  "Enhanced menu with variety",
                  "Portable toilet tent",
                  "Daily health monitoring",
                  "Pulse oximeter checks",
                ],
                highlighted: true,
              },
              {
                tier: "Premium",
                price: "$3,200 - $4,500",
                routes: "Lemosho (8 days), Northern Circuit (9 days)",
                color: "bg-emerald-50 border-emerald-200",
                accent: "text-emerald-700",
                features: [
                  "Everything in Most Popular, plus:",
                  "Private expedition (your group only)",
                  "Dedicated personal guide",
                  "Private chef",
                  "Luxury camping gear",
                  "Extra acclimatization days",
                  "Post-climb hotel night",
                  "Complimentary summit certificate",
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.tier}
                className={`relative border-2 rounded-2xl p-6 ${pkg.color} ${
                  pkg.highlighted
                    ? "ring-2 ring-[var(--secondary)] shadow-lg scale-[1.02]"
                    : "hover:shadow-md"
                } transition-all`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--secondary)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                <h3
                  className={`font-heading text-lg font-bold mb-1 ${pkg.accent}`}
                >
                  {pkg.tier}
                </h3>
                <p className="text-3xl font-bold mb-1">{pkg.price}</p>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {pkg.routes}
                </p>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3 text-amber-900">
              How US Agency Pricing Compares
            </h3>
            <p className="text-sm text-amber-800 mb-4">
              Many American travelers first discover Kilimanjaro through
              US-based tour agencies like REI Adventures, Intrepid Travel, or
              G Adventures. These companies add a significant markup —
              typically 40-80% above the local operator rate — because they
              subcontract the actual climb to a Tanzanian company like ours.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-amber-200">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  Through a US Agency
                </p>
                <p className="text-2xl font-bold text-red-600 mb-1">
                  $4,000 - $7,500+
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Same climb, same mountain, same guides — with agency markup
                  and overhead added
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-amber-200">
                <p className="text-sm font-semibold text-amber-900 mb-2">
                  Direct with Snow Africa
                </p>
                <p className="text-2xl font-bold text-emerald-600 mb-1">
                  $1,850 - $4,500
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Book directly — no middleman, no markup, same quality, TATO
                  licensed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Best Time for Americans */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Timing Your Trip
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Best Time for Americans to Climb Kilimanjaro
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Kilimanjaro&apos;s climbing seasons align well with American
            vacation schedules. The mountain is climbable year-round, but these
            windows offer the best combination of weather and time off work.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                season: "Summer Break",
                months: "June - August",
                icon: Calendar,
                color: "bg-amber-100 text-amber-700",
                weather: "Dry season — clear skies, cold nights",
                pros: [
                  "Peak dry season with best weather",
                  "Ideal for families with school-age kids",
                  "Long daylight hours on the mountain",
                  "Combine with Great Migration safari",
                ],
                cons: [
                  "Busiest period — book 4-6 months ahead",
                  "Higher flight costs from the US",
                ],
                verdict: "Best overall for most Americans",
              },
              {
                season: "Winter Break",
                months: "December - February",
                icon: Mountain,
                color: "bg-blue-100 text-blue-700",
                weather: "Short dry season — warm, occasional showers",
                pros: [
                  "Short dry season with good conditions",
                  "Warmer temperatures than June-Aug",
                  "Holiday vacation time from work",
                  "New Year summit — unforgettable milestone",
                ],
                cons: [
                  "Brief afternoon showers possible in Feb",
                  "Christmas/New Year dates book early",
                ],
                verdict: "Great for holiday travelers",
              },
              {
                season: "Thanksgiving Week",
                months: "Late November",
                icon: Clock,
                color: "bg-emerald-100 text-emerald-700",
                weather: "End of short rains — clearing skies",
                pros: [
                  "Only need 2-3 days off work",
                  "Lower crowds than peak season",
                  "Good availability and rates",
                  "Green, lush lower slopes",
                ],
                cons: [
                  "Tail end of short rains — possible showers",
                  "Slightly less reliable weather",
                ],
                verdict: "Hidden gem for flexible travelers",
              },
            ].map((period) => (
              <div
                key={period.season}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${period.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <period.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-1">
                  {period.season}
                </h3>
                <p className="text-sm text-[var(--secondary)] font-semibold mb-2">
                  {period.months}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {period.weather}
                </p>
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
                    Advantages
                  </p>
                  <ul className="space-y-1.5">
                    {period.pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2">
                    Considerations
                  </p>
                  <ul className="space-y-1.5">
                    {period.cons.map((con) => (
                      <li
                        key={con}
                        className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                      >
                        <span className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0">
                          &bull;
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-[var(--border)]">
                  <p className="text-sm font-semibold text-[var(--primary)]">
                    {period.verdict}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-8 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              Prefer a different time? Kilimanjaro is climbable year-round. Only
              April and early May (heavy long rains) should be avoided. We run
              departures every month — check our{" "}
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="text-[var(--primary)] hover:text-[var(--secondary-dark)] underline font-medium"
              >
                group departure calendar
              </Link>{" "}
              for available dates.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Why Book with a Local Operator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Why Book Direct
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Why American Climbers Book with a Local Operator
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Every US-based tour company that offers Kilimanjaro treks
            subcontracts the actual climb to a local Tanzanian operator. When
            you book directly, you get the same experience for less — and your
            money goes directly to the people on the mountain.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Save 40-80% vs US Agencies",
                description:
                  "US tour companies charge $4,000-$7,500 for the same climb we offer at $1,850-$4,500. They outsource 100% of the on-ground operation to companies like ours. Cut out the middleman and save thousands.",
              },
              {
                icon: Shield,
                title: "TATO Licensed & Insured",
                description:
                  "Snow Africa Adventure is fully licensed by the Tanzania Association of Tour Operators (TATO) — the same licensing required of every operator on Kilimanjaro. Our TATO license number is verifiable on their official registry.",
              },
              {
                icon: Star,
                title: "4.9 TripAdvisor Rating",
                description:
                  "With hundreds of verified reviews from international travelers including many Americans, our 4.9-star TripAdvisor rating reflects consistent quality. Read real reviews from US climbers who booked directly.",
              },
              {
                icon: Users,
                title: "93% Summit Success Rate",
                description:
                  "Our overall summit success rate of 93% is well above the mountain-wide average of 65%. This comes from experienced KINAPA-certified guides, proper acclimatization protocols, and daily health monitoring with pulse oximeters.",
              },
              {
                icon: Phone,
                title: "Direct Communication",
                description:
                  "Talk directly with our team in Tanzania — no third-party relay. We respond to WhatsApp messages within hours and conduct video calls to discuss your trip. You know exactly who will be guiding you on the mountain.",
              },
              {
                icon: Heart,
                title: "Your Money Stays Local",
                description:
                  "When you book through a US agency, up to 60% of your payment stays in the US for marketing and overhead. Booking directly means more money goes to Tanzanian guides, porters, cooks, and their families.",
              },
            ].map((reason) => (
              <div
                key={reason.title}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: What American Climbers Say */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Real Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What American Climbers Say
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Hear from US travelers who booked directly with Snow Africa
            Adventure and summited Kilimanjaro.
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-[var(--secondary)] font-medium mt-1">
                    {testimonial.route}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Travel Insurance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Essential Coverage
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Travel Insurance for US Climbers
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Travel insurance covering high-altitude trekking is mandatory for
            all Kilimanjaro climbers. Standard US travel insurance typically
            excludes altitude above 3,000m — you need a specialist adventure
            policy.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[var(--primary-dark)] text-white p-6">
                <h3 className="font-heading text-xl font-bold mb-2">
                  What Your Policy Must Cover
                </h3>
                <p className="text-sm text-white/80">
                  Ensure your insurance policy includes all of the following
                  before your climb. We verify coverage at the pre-climb
                  briefing.
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      requirement: "High-altitude trekking to 6,000m",
                      detail:
                        "Must explicitly state coverage altitude — many policies cap at 3,000m or 4,000m",
                    },
                    {
                      requirement: "Emergency helicopter evacuation",
                      detail:
                        "Mountain rescue and helicopter evacuation from remote areas on Kilimanjaro",
                    },
                    {
                      requirement: "Medical expenses abroad",
                      detail:
                        "Minimum $100,000 coverage for hospitalization and treatment in Tanzania or Kenya",
                    },
                    {
                      requirement: "Medical repatriation",
                      detail:
                        "Emergency medical flight back to the United States if needed",
                    },
                    {
                      requirement: "Trip cancellation",
                      detail:
                        "Covers your non-refundable costs if you cannot travel due to illness, injury, or emergency",
                    },
                    {
                      requirement: "Trip interruption",
                      detail:
                        "Covers additional expenses if your trip is cut short — including rebooking flights",
                    },
                  ].map((item) => (
                    <div key={item.requirement} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">
                          {item.requirement}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  provider: "World Nomads",
                  plan: "Explorer Plan",
                  price: "$150-$250",
                  note: "Most popular with US adventure travelers",
                },
                {
                  provider: "Allianz Global",
                  plan: "OneTrip Premier",
                  price: "$120-$200",
                  note: "Good value, verify altitude coverage",
                },
                {
                  provider: "IMG Global",
                  plan: "iTravelInsured Travel SE",
                  price: "$180-$300",
                  note: "Strong medical evacuation coverage",
                },
                {
                  provider: "Global Rescue",
                  plan: "Travel Insurance + Membership",
                  price: "$200-$350",
                  note: "Includes advisory services and rescue ops",
                },
              ].map((ins) => (
                <div
                  key={ins.provider}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
                >
                  <p className="font-semibold text-sm mb-1">{ins.provider}</p>
                  <p className="text-xs text-[var(--secondary)] font-medium mb-1">
                    {ins.plan}
                  </p>
                  <p className="text-lg font-bold mb-1">{ins.price}</p>
                  <p className="text-xs text-[var(--text-muted)]">{ins.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Step-by-Step Booking Process */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Booking from the US: Step by Step
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            From your first inquiry to standing on the summit, here is exactly
            how the process works when you book directly from the United States.
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: 1,
                title: "Choose Your Route & Dates",
                description:
                  "Browse our route options, check the group departure calendar, or tell us your preferred dates and group size. We will recommend the best route based on your fitness level, budget, and time available. Most Americans choose the 7-day Machame or 8-day Lemosho route.",
              },
              {
                step: 2,
                title: "Receive Your Custom Quote",
                description:
                  "Within 24 hours of your inquiry, you receive a detailed quote in USD with a full breakdown of what is included. No hidden fees, no surprises. Ask questions via email or WhatsApp — we are happy to jump on a video call if you prefer.",
              },
              {
                step: 3,
                title: "Secure Your Spot with a Deposit",
                description:
                  "Pay a 30% deposit by bank transfer, credit card, or PayPal to confirm your booking. The remaining 70% is due 60 days before your climb start date. We send a detailed confirmation email with your itinerary, packing list, and training guide.",
              },
              {
                step: 4,
                title: "Prepare — Flights, Visa, Training",
                description:
                  "Book your flights to JRO, apply for your Tanzania e-visa, arrange travel insurance, and follow our 12-week training plan. We send a pre-departure checklist 30 days before your climb with everything you need to do before departure.",
              },
              {
                step: 5,
                title: "Arrive in Tanzania",
                description:
                  "Our driver meets you at Kilimanjaro International Airport with a name board and transfers you to your hotel in Arusha or Moshi. That evening, you meet your lead guide for a briefing on the route, weather, and what to expect. Rest well — the adventure begins tomorrow.",
              },
              {
                step: 6,
                title: "Summit Kilimanjaro",
                description:
                  "Your experienced, KINAPA-certified guide leads you through five climate zones to the roof of Africa. Daily health checks, excellent mountain meals, and a dedicated team of porters and cooks support you every step. On summit night, you reach Uhuru Peak — 5,895 meters above sea level.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shrink-0 font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            FAQ: Climbing Kilimanjaro from the USA
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Answers to the most common questions American travelers ask before
            booking their Kilimanjaro climb.
          </p>

          <div className="max-w-3xl mx-auto space-y-3">
            {usaFaqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-sm hover:bg-[var(--surface)] transition-colors [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Grid */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Continue Reading
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Related Kilimanjaro Guides
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Dive deeper into planning your Kilimanjaro climb with these
            detailed guides.
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white border border-[var(--border)] rounded-2xl p-6 hover:shadow-md transition-all hover:border-[var(--secondary)]"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <guide.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--secondary-dark)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] group-hover:text-[var(--secondary-dark)] transition-colors">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of American travelers who have summited Africa&apos;s
            highest peak with Snow Africa Adventure. Get a personalized quote in
            USD within 24 hours — no commitment, no agency markup.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { value: "93%", label: "Summit Success Rate" },
              { value: "4.9/5", label: "TripAdvisor Rating" },
              { value: "500+", label: "Successful Summits" },
              { value: "15+", label: "Years Operating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              View Routes & Get a Quote
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse Group Departures
            </Link>
          </div>

          <p className="text-sm text-white/60 mt-6">
            TATO Licensed &bull; KINAPA Certified Guides &bull; All Prices in
            USD &bull; No Hidden Fees
          </p>
        </div>
      </section>
    </div>
  );
}
