import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  X,
  ChevronDown,
  ShoppingBag,
  Info,
  Shirt,
  Footprints,
  BedDouble,
  Backpack,
  HeartPulse,
  FileText,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Packing List & Gear 2026",
  description:
    "Complete Kilimanjaro gear guide: essential clothing layers, boots, sleeping bags, trekking poles, and what NOT to bring. Updated 2026 packing list from experienced Kilimanjaro guides.",
  url: "/kilimanjaro-climbing-gear/",
  image:
    "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
});

const gearCategories = [
  {
    icon: <Shirt className="w-6 h-6" />,
    title: "Clothing",
    color: "bg-amber-100 text-amber-700",
    items: [
      "Moisture-wicking base layer tops × 3",
      "Long thermal underwear × 2",
      "Fleece mid-layer jacket",
      "Down insulation jacket (800-fill minimum)",
      "Waterproof shell jacket (Gore-Tex or equivalent)",
      "Waterproof shell trousers",
      "Trekking trousers × 2",
      "Warm beanie hat",
      "Balaclava for summit night",
      "Liner gloves + waterproof outer gloves",
      "Merino wool hiking socks × 4 pairs",
      "Gaiters (to keep trail debris out of boots)",
    ],
  },
  {
    icon: <Footprints className="w-6 h-6" />,
    title: "Footwear",
    color: "bg-orange-100 text-orange-700",
    items: [
      "Waterproof ankle-supporting hiking boots (broken in before the climb)",
      "Camp sandals or light shoes for evenings",
      "Warm boot liners for summit night",
      "Spare bootlaces",
    ],
  },
  {
    icon: <BedDouble className="w-6 h-6" />,
    title: "Sleeping",
    color: "bg-sky-100 text-sky-700",
    items: [
      "Sleeping bag rated to -15°C (four-season)",
      "Sleeping bag silk or fleece liner for extra warmth",
      "Inflatable or foam camp pillow",
    ],
  },
  {
    icon: <Backpack className="w-6 h-6" />,
    title: "Trekking Essentials",
    color: "bg-green-100 text-green-700",
    items: [
      "Trekking poles × 2 (with spare snow baskets)",
      "Day pack 20–25L (carried by you)",
      "Duffle bag 70–90L (carried by porter, max 15kg)",
      "Waterproof pack cover for both bags",
      "Water bottles × 2 (1L each) or 3L hydration bladder",
      "Headtorch with spare batteries × 2 sets",
      "Trekking map of your chosen route",
    ],
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Health & Safety",
    color: "bg-rose-100 text-rose-700",
    items: [
      "Pulse oximeter (monitor blood-oxygen levels)",
      "Diamox (acetazolamide) — consult a doctor before travel",
      "Ibuprofen and paracetamol",
      "Blister treatment kit (moleskin, needle, antiseptic)",
      "Sunscreen SPF 50+ and lip balm SPF 30+",
      "Hand sanitiser",
      "Diarrhoea and rehydration sachets",
      "Altitude sickness medication (consult doctor)",
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Documents & Tech",
    color: "bg-purple-100 text-purple-700",
    items: [
      "Passport and travel insurance documents (copies)",
      "Camera or phone with protective case",
      "Power bank (20,000mAh minimum)",
      "Universal travel adapter",
      "Earplugs for shared hut accommodation",
      "Notebook and pen",
      "Emergency contact card in local language",
    ],
  },
];

const hireItems = [
  { item: "Trekking poles", note: "Available in Arusha — hire if travelling light" },
  { item: "Sleeping bag (-15°C rated)", note: "Hireable locally — inspect before use" },
  { item: "Gaiters", note: "Often available from outfitters in Arusha town" },
  { item: "Duffle bag", note: "Some operators provide these for porter loads" },
  { item: "Down jacket", note: "Hireable but limited size range — bring your own if possible" },
];

const doNotBring = [
  "Heavy DSLR tripod — weight penalty is too high",
  "Cotton clothing of any kind — cotton kills at altitude when wet",
  "Excessive toiletries — pack travel-sized only",
  "Perfume or strong-scented products — attracts wildlife at lower camps",
  "Laptop or tablet — unnecessary weight and cold can damage devices",
  "Jeans or non-trekking trousers",
  "Bulky travel locks beyond a lightweight cable lock",
  "Alcoholic beverages — alcohol accelerates dehydration at altitude",
];

const faqs = [
  {
    question: "What boots do I need for Kilimanjaro?",
    answer:
      "You need waterproof, ankle-supporting hiking boots that have been broken in before the climb. Stiff-soled boots with good ankle support are preferable over trail runners. The single most common cause of summit failure is blisters from new boots — always wear them on multiple long walks before your climb.",
  },
  {
    question: "Do I need crampons for Kilimanjaro?",
    answer:
      "In most cases, no. Kilimanjaro's glaciers have retreated significantly and crampons are not required on standard routes. Gaiters and trekking poles with snow baskets are sufficient. However, your guide will advise if icy conditions are encountered near the summit crater rim.",
  },
  {
    question: "Can I rent gear in Arusha?",
    answer:
      "Yes. Snow Africa Adventure can arrange gear rental in Arusha for items like trekking poles, sleeping bags, gaiters, and duffle bags. We recommend renting only lower-risk items and bringing your own boots, base layers, and down jacket to ensure a proper fit and quality you can trust.",
  },
  {
    question: "How heavy should my pack be on Kilimanjaro?",
    answer:
      "Your day pack (carried by you throughout each trekking day) should be no heavier than 7–10kg. Your duffle bag (carried by your porter) should not exceed 15kg — this is a regulated limit designed to protect porter welfare. Snow Africa Adventure enforces this limit strictly on all climbs.",
  },
];

export default function KilimanjaroClimbingGearPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Kilimanjaro Climbing Gear", url: "/kilimanjaro-climbing-gear/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Kilimanjaro trekkers with full gear on mountain trail"
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
                2026 Packing Guide
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Kilimanjaro Climbing Gear: Complete Packing List
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Everything you need to pack for a safe, successful Kilimanjaro climb —
              from layering systems and boots to health essentials and what to leave at home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Book Your Climb
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Group Departures
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Why Gear Matters
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Your Kilimanjaro Climbing Gear Can Make or Break Your Summit
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              At 5,895 metres, Kilimanjaro&apos;s summit zone is an arctic environment even
              on a clear summer day. Temperatures can plunge below -20°C at night, oxygen
              levels are roughly half those at sea level, and weather changes rapidly.
              Your kilimanjaro packing list is not optional — the right kilimanjaro equipment
              is the difference between a successful summit and turning back. Many climbers who
              fail do so not because of fitness, but because of inadequate gear.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              The three-layer clothing system is the foundation of every successful Kilimanjaro
              climb: a moisture-wicking base layer to keep sweat off your skin, an insulating
              mid-layer to retain body heat, and a waterproof outer shell to block wind and rain.
              Every item below is chosen with this principle in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Layering System */}
      <section className="py-12 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Clothing System
            </span>
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Kilimanjaro Clothing: The Essential Three-Layer System
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">01</div>
                <h3 className="font-semibold text-lg mb-2">Base Layer</h3>
                <p className="text-white/70 text-sm">
                  Merino wool or synthetic fabric that wicks moisture away from skin. Never wear cotton — it retains sweat and causes dangerous heat loss.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">02</div>
                <h3 className="font-semibold text-lg mb-2">Mid Layer</h3>
                <p className="text-white/70 text-sm">
                  A fleece or down jacket that traps warm air around your body. Down provides superior warmth-to-weight ratio but loses insulation when wet.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">03</div>
                <h3 className="font-semibold text-lg mb-2">Outer Shell</h3>
                <p className="text-white/70 text-sm">
                  A waterproof and windproof jacket and trousers that protect against rain, sleet, and fierce summit winds. Gore-Tex or equivalent is recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Checklist */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
            Packing List
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Complete Kilimanjaro Gear &amp; Equipment Checklist
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Use this kilimanjaro packing list as your definitive starting point. Your Snow Africa Adventure guide will review all kilimanjaro climbing gear before departure and advise on any missing essentials.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gearCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{cat.title}</h3>
                  </div>
                </div>
                <ul className="p-5 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire vs Buy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Gear Hire
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Kilimanjaro Gear Hire in Arusha: What to Rent Locally
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              If you are travelling light or have limited luggage allowance, several pieces of
              Kilimanjaro gear can be hired locally in Arusha. Snow Africa Adventure can arrange
              quality rentals on your behalf before your climb begins.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left px-5 py-3 font-semibold">Item</th>
                    <th className="text-left px-5 py-3 font-semibold">Hire Note</th>
                  </tr>
                </thead>
                <tbody>
                  {hireItems.map((row, i) => (
                    <tr
                      key={row.item}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-5 py-3 font-medium">{row.item}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Recommendation:</strong> Always bring your own boots, base layers, and down
                jacket. These items need to fit perfectly and retain body heat — hiring them introduces
                risk. We strongly advise against hiring boots for Kilimanjaro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What NOT to Bring */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Leave Behind
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What NOT to Pack for Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              Every unnecessary kilo in your kilimanjaro climbing gear costs energy at altitude. Here is what experienced Kilimanjaro guides recommend leaving at home or in your hotel in Arusha:
            </p>
            <div className="space-y-3">
              {doNotBring.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[var(--border)] shadow-sm"
                >
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-[var(--text-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gear Rental CTA Box */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[var(--primary-dark)] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-6 h-6 text-[var(--secondary)]" />
                <h3 className="font-heading text-xl font-bold">Snow Africa Gear Rental</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Not sure whether to buy or hire? Snow Africa Adventure can arrange quality gear
                rental in Arusha before your climb, including sleeping bags, poles, and gaiters.
                Contact us when you book to discuss your requirements.
              </p>
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                Ask About Gear Rental
              </Link>
            </div>
            <div className="shrink-0 hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-[var(--secondary)]" />
              </div>
            </div>
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
              Gear Questions Answered
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
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
            Pack Smart. Climb Strong.
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Our Kilimanjaro specialists are happy to answer any gear questions before your climb.
            Browse our trekking routes and secure your place on Africa&apos;s highest peak.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Book Your Kilimanjaro Trek
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Group Departures
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
