import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Calendar,
  MapPin,
  Star,
  ChevronDown,
  Binoculars,
  Mountain,
  Waves,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "10-Day Tanzania Itinerary: Safari, Kilimanjaro & Zanzibar (2026/2027)",
  description:
    "Three proven 10-day Tanzania itineraries with day-by-day plans and real prices: Big Five safari + Zanzibar beach, Kilimanjaro climb + safari, or the full Northern Circuit. Built by a local Tanzanian operator.",
  url: "/tanzania-itinerary-10-days/",
});

const itineraryOptions = [
  {
    id: "safari-zanzibar",
    icon: Waves,
    label: "Most Popular",
    title: "Safari + Zanzibar Beach",
    price: "From $3,450",
    summary:
      "Six days chasing the Big Five across the Serengeti and Ngorongoro Crater, then four days of white-sand beaches and turquoise water on Zanzibar. The perfect balance of adventure and relaxation.",
    days: [
      { day: "Day 1", title: "Arrive in Arusha", description: "Airport pickup and overnight at a garden lodge in Arusha. Meet your guide for a safari briefing over dinner." },
      { day: "Day 2", title: "Tarangire National Park", description: "Game drive among giant elephant herds and ancient baobab trees. Overnight at a lodge or tented camp near the park." },
      { day: "Day 3–4", title: "Serengeti National Park", description: "Two full days in the world's most famous park — lion, leopard, cheetah, and (in season) the Great Migration. Overnight inside the park for dawn game drives." },
      { day: "Day 5", title: "Ngorongoro Crater", description: "Descend into the crater at first light for the best chance of seeing all Big Five in a single day, including black rhino. Overnight on the crater rim." },
      { day: "Day 6", title: "Fly to Zanzibar", description: "Morning flight from Arusha to Zanzibar. Transfer to your beach hotel in Nungwi or Kendwa — sunset dhow cruise optional." },
      { day: "Day 7–9", title: "Zanzibar Beach & Stone Town", description: "Three days of beach time, snorkeling at Mnemba Atoll, a spice farm tour, and a guided walk through UNESCO-listed Stone Town." },
      { day: "Day 10", title: "Departure", description: "Transfer to Zanzibar airport for your flight home — tanned, rested, and with a camera full of the Big Five." },
    ],
  },
  {
    id: "kilimanjaro-safari",
    icon: Mountain,
    label: "Adventure",
    title: "Kilimanjaro Climb + Safari",
    price: "From $3,890",
    summary:
      "Summit Africa's highest peak on the scenic 7-day Machame route, then celebrate with a 2-day safari in Tarangire and Ngorongoro. The ultimate Tanzania achievement trip.",
    days: [
      { day: "Day 1", title: "Arrive in Arusha", description: "Airport pickup, gear check with your head guide, and overnight in Arusha before the climb." },
      { day: "Day 2–7", title: "Machame Route Ascent", description: "Six days climbing through rainforest, moorland, and alpine desert via Shira Plateau, Lava Tower, and Barranco Wall — the 'whiskey route' with the best acclimatization profile and 95%+ success rates." },
      { day: "Day 8", title: "Summit Night & Descent", description: "Reach Uhuru Peak (5,895 m) at sunrise — the roof of Africa. Descend to Mweka Camp, then down to the gate and back to Arusha for a well-earned shower and celebration dinner." },
      { day: "Day 9", title: "Tarangire or Lake Manyara Safari", description: "Full-day game drive among elephants and baobabs — a gentle reward for summit legs. Overnight near Karatu." },
      { day: "Day 10", title: "Ngorongoro Crater & Departure", description: "Morning crater game drive with a chance of all Big Five, then transfer to Kilimanjaro Airport for your evening flight." },
    ],
  },
  {
    id: "northern-circuit",
    icon: Binoculars,
    label: "Wildlife Immersion",
    title: "Full Northern Circuit Safari",
    price: "From $3,950",
    summary:
      "Ten uninterrupted days of wildlife across all four northern parks — Tarangire, Lake Manyara, the Serengeti, and Ngorongoro — with time to follow the Great Migration wherever it is.",
    days: [
      { day: "Day 1", title: "Arrive in Arusha", description: "Airport pickup and overnight in Arusha with a full safari briefing." },
      { day: "Day 2–3", title: "Tarangire National Park", description: "Two days with Tanzania's largest elephant herds, tree-climbing pythons, and 550+ bird species along the Tarangire River." },
      { day: "Day 4", title: "Lake Manyara", description: "Groundwater forest, flamingo-lined soda lake, and the park's famous tree-climbing lions. Overnight in Karatu highlands." },
      { day: "Day 5–7", title: "Serengeti (Central & Seasonal Sector)", description: "Three days positioned around the Great Migration — Ndutu calving grounds (Dec–Mar), Western Corridor (May–Jul), or the Mara River crossings (Jul–Oct). Endless predator action year-round in Seronera." },
      { day: "Day 8", title: "Serengeti to Ngorongoro Rim", description: "Final Serengeti morning drive, then across the crater highlands past Olduvai Gorge — the cradle of mankind. Sunset from the crater rim." },
      { day: "Day 9", title: "Ngorongoro Crater", description: "Full-day crater game drive — 25,000 large animals in a 260 km² caldera, including the densest lion population on earth and rare black rhino." },
      { day: "Day 10", title: "Departure", description: "Scenic drive back to Arusha with a coffee-farm lunch stop, then onward transfer to Kilimanjaro Airport." },
    ],
  },
];

const included = [
  "All airport and hotel transfers",
  "Private 4x4 Land Cruiser with pop-up roof",
  "Professional English-speaking driver-guide",
  "All national park and crater fees",
  "All accommodation (lodge, tented camp, or beach hotel)",
  "All meals on safari and the mountain",
  "Domestic flight Arusha–Zanzibar (option 1)",
  "KPAP-standard porter welfare on Kilimanjaro (option 2)",
  "Unlimited drinking water in the vehicle",
  "24/7 local support — we are based in Arusha",
];

const faqs = [
  {
    question: "Is 10 days enough for Tanzania?",
    answer:
      "Yes — 10 days is the sweet spot. It comfortably fits a full northern-circuit safari, or a safari plus Zanzibar, or a Kilimanjaro climb plus a short safari, without the rushed feel of a 7-day trip. Anything longer adds depth; anything shorter forces hard choices between the Serengeti, the mountain, and the beach.",
  },
  {
    question: "How much does a 10-day Tanzania trip cost?",
    answer:
      "Realistic 2026 prices per person: $3,000–4,000 for a mid-range lodge safari + Zanzibar, $3,500–4,500 for Kilimanjaro + safari, and $2,400–3,000 for a camping-based safari. Budget camping itineraries start around $2,200; luxury lodges run $6,000+. All our prices include park fees, which alone are $70–80 per person per day.",
  },
  {
    question: "When is the best time for this itinerary?",
    answer:
      "June to October is the dry season — the best game viewing, Mara River crossings (Jul–Oct), and the clearest Kilimanjaro summit weather. December to February is excellent too: calving season in Ndutu with dramatic predator action, warm Zanzibar water, and fewer crowds. Avoid the long rains of April–May if beaches matter to you.",
  },
  {
    question: "Safari first or Zanzibar first?",
    answer:
      "Safari first. Early game drives start before dawn, so ending your trip on the beach means you fly home rested rather than exhausted. The Arusha–Zanzibar flight takes about 90 minutes, making the transition seamless mid-trip.",
  },
  {
    question: "Can this itinerary be customized?",
    answer:
      "Completely. These three itineraries are proven starting points — we build every trip to order. Add days in the Serengeti, swap Manyara for a Maasai cultural visit, upgrade to luxury lodges, or combine all three elements in 14 days. Tell us your dates and interests and we'll send a tailored plan within 24 hours.",
  },
  {
    question: "Why book with a local Tanzanian operator?",
    answer:
      "Booking direct with a local operator removes the 20–30% markup international agencies add, and your guides, vehicles, and support team are our own staff — not subcontractors. Snow Africa Adventure is based in Arusha, licensed by TALA, and a KPAP partner for ethical porter treatment on Kilimanjaro.",
  },
];

export default function TanzaniaItinerary10DaysPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "10-Day Tanzania Itinerary", url: "/tanzania-itinerary-10-days/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg"
            alt="10-day Tanzania itinerary — Serengeti safari, Kilimanjaro and Zanzibar"
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
                2026 / 2027 Dates
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">Local Arusha-Based Operator</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              10-Day Tanzania Itinerary
            </h1>
            <p className="text-xl text-[var(--secondary)] font-semibold mb-4">
              Safari, Kilimanjaro &amp; Zanzibar — Three Proven Plans With Real Prices
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Ten days is the perfect length for Tanzania. Below are the three
              itineraries we run most, planned day by day by our team in Arusha —
              pick one as-is, or use it as the starting point for your own trip.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { label: "From $3,450", sub: "Per Person" },
                { label: "10 Days", sub: "Ideal Duration" },
                { label: "Big Five", sub: "Serengeti & Crater" },
                { label: "24h", sub: "Custom Quote" },
              ].map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-2xl font-bold text-[var(--secondary)]">{stat.label}</p>
                  <p className="text-sm text-white/70">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tailor-made-safari/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Get My Free Itinerary Quote
              </Link>
              <Link
                href="#itineraries"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Compare the 3 Plans
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Three itineraries */}
      <section className="py-16" id="itineraries">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
              Three Ways to Spend 10 Days
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 mt-2">
              Pick Your Perfect Tanzania Itinerary
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Every plan below includes park fees, private vehicle and guide, all
              accommodation, and airport transfers — no hidden extras when the
              invoice arrives.
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {itineraryOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 md:p-8 border-b border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                        <option.icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider">
                          {option.label}
                        </span>
                        <h3 className="font-heading text-2xl font-bold">
                          {option.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[var(--secondary)]">
                      {option.price}
                    </p>
                  </div>
                  <p className="text-[var(--text-muted)] mt-4">{option.summary}</p>
                </div>
                <div className="p-6 md:p-8">
                  <ol className="space-y-4">
                    {option.days.map((d) => (
                      <li key={`${option.id}-${d.day}`} className="flex gap-4">
                        <span className="shrink-0 w-20 text-sm font-semibold text-[var(--secondary)] pt-0.5">
                          {d.day}
                        </span>
                        <div>
                          <p className="font-semibold">{d.title}</p>
                          <p className="text-sm text-[var(--text-muted)]">
                            {d.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 pt-6 border-t border-[var(--border)] flex flex-wrap gap-3">
                    <Link
                      href="/tailor-made-safari/"
                      className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Get a Quote for This Itinerary
                    </Link>
                    {option.id === "kilimanjaro-safari" && (
                      <Link
                        href="/kilimanjaro-join-group-departures/"
                        className="inline-block border border-[var(--border)] hover:border-[var(--secondary)] px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        See Group Climb Dates
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                No Hidden Costs
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2">
                Every 10-Day Itinerary Includes
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white border border-[var(--border)] rounded-lg px-4 py-3"
                >
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best time */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Timing Your Trip
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2">
                Best Time for a 10-Day Tanzania Trip
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-[var(--primary-dark)] text-white">
                    <th className="py-4 px-6 text-left font-semibold">Season</th>
                    <th className="py-4 px-6 text-left font-semibold">Months</th>
                    <th className="py-4 px-6 text-left font-semibold">Why Go</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    ["Dry season", "June – October", "Peak game viewing, Mara River crossings, best Kilimanjaro weather"],
                    ["Calving season", "December – March", "Migration calving in Ndutu, dramatic predator action, warm Zanzibar water"],
                    ["Green season", "November & late May", "Lower prices, lush scenery, fewer vehicles at sightings"],
                    ["Long rains", "April – May", "Cheapest rates, but some camps close and beach time is risky"],
                  ].map(([season, months, why]) => (
                    <tr key={season} className="hover:bg-[var(--surface)] transition-colors">
                      <td className="py-3 px-6 font-medium text-sm">{season}</td>
                      <td className="py-3 px-6 text-sm text-[var(--text-muted)]">{months}</td>
                      <td className="py-3 px-6 text-sm text-[var(--text-muted)]">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              Unsure about your month? Climbing?{" "}
              <Link href="/best-time-to-climb-kilimanjaro/" className="text-[var(--secondary)] font-semibold hover:underline">
                See the best months for Kilimanjaro
              </Link>{" "}
              — or{" "}
              <Link href="/contact-us/" className="text-[var(--secondary)] font-semibold hover:underline">
                ask us directly
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local &amp; Direct</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We are based in Arusha — booking direct means no international
                agency markup and a team on the ground before, during, and after
                your trip.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Built Around You</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Every itinerary on this page can be reshaped — dates, lodges,
                parks, pace. A tailored plan with exact pricing lands in your
                inbox within 24 hours.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ethical by Default</h3>
              <p className="text-sm text-[var(--text-muted)]">
                KPAP partner for porter welfare on Kilimanjaro, fair guide pay,
                and community-owned lodges wherever possible.
              </p>
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
              10-Day Tanzania Itinerary Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
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
            Ready to Plan Your 10 Days in Tanzania?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Tell us your travel dates and which of the three plans caught your
            eye — we&apos;ll send a personalized day-by-day itinerary with exact
            pricing within 24 hours. No obligation, no deposit to ask.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Planning My Trip
            </Link>
            <Link
              href="/contact-us/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Ask a Question First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
