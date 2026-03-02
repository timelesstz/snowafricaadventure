import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Thermometer,
  ChevronDown,
  TrendingUp,
  MapPin,
  Info,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "How High is Kilimanjaro? 5,895m Explained",
  description:
    "Mount Kilimanjaro stands at 5,895 metres (19,341 feet) above sea level — Africa's highest peak and the world's tallest free-standing mountain. Learn about its geography, climate zones, and how to climb it.",
  url: "/mount-kilimanjaro-height/",
  image:
    "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
});

const keyFacts = [
  { label: "Summit", value: "Uhuru Peak", sub: "5,895m / 19,341ft" },
  { label: "Base Elevation", value: "~1,800m", sub: "5,906ft" },
  { label: "Prominence", value: "5,885m", sub: "19,308ft" },
];

const heightComparisons = [
  { mountain: "Mont Blanc (Alps)", height: "4,808m", comparison: "Kilimanjaro is 1,087m taller" },
  { mountain: "Mount Elbrus (Europe)", height: "5,642m", comparison: "Kilimanjaro is 253m taller" },
  { mountain: "Mount Everest", height: "8,849m", comparison: "Kilimanjaro is ~66% of Everest's height" },
  { mountain: "Denali (North America)", height: "6,190m", comparison: "Kilimanjaro is 295m shorter" },
  { mountain: "Mount Kenya", height: "5,199m", comparison: "Kilimanjaro is 696m taller" },
];

const climateZones = [
  {
    icon: <Mountain className="w-5 h-5" />,
    name: "Cultivated Zone",
    elevation: "800 – 1,800m",
    description:
      "Farmland and villages surround the mountain's lower slopes. Coffee and banana plantations dominate this warm, humid belt.",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    name: "Montane Forest",
    elevation: "1,800 – 2,800m",
    description:
      "Dense rainforest with towering trees, mosses, and diverse wildlife. Colobus monkeys and buffalo inhabit this zone.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    name: "Heath & Moorland",
    elevation: "2,800 – 4,000m",
    description:
      "Giant heather and surreal giant groundsels define the landscape. Temperatures begin to drop significantly.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    name: "Alpine Desert",
    elevation: "4,000 – 5,000m",
    description:
      "Sparse vegetation in a stark, rocky landscape. Extreme temperature swings between day and night. Acclimatisation is essential here.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: <Mountain className="w-5 h-5" />,
    name: "Arctic Summit",
    elevation: "5,000 – 5,895m",
    description:
      "Ice, glaciers, and sub-zero temperatures characterise the summit zone. Uhuru Peak crowns this otherworldly environment.",
    color: "bg-blue-100 text-blue-700",
  },
];

const summitPoints = [
  { name: "Uhuru Peak", height: "5,895m (19,341ft)", note: "Highest point in Africa — the true summit" },
  { name: "Stella Point", height: "5,756m (18,885ft)", note: "Reached on the crater rim — certificate awarded" },
  { name: "Gilman's Point", height: "5,685m (18,652ft)", note: "First major goal on Marangu & Rongai routes" },
  { name: "Hans Meyer Point", height: "5,183m (17,005ft)", note: "Minor sub-peak on the southern slopes" },
];

const faqs = [
  {
    question: "How high is Mount Kilimanjaro in metres?",
    answer:
      "Mount Kilimanjaro stands at 5,895 metres (19,341 feet) above sea level at its highest point, Uhuru Peak on the Kibo crater rim.",
  },
  {
    question: "Is Kilimanjaro the highest mountain in Africa?",
    answer:
      "Yes, Mount Kilimanjaro is the highest peak on the African continent, towering above all other mountains including Mount Kenya (5,199m) and the Rwenzori range.",
  },
  {
    question: "How tall is Kilimanjaro compared to Everest?",
    answer:
      "Mount Kilimanjaro is 5,895m while Mount Everest reaches 8,849m — making Kilimanjaro approximately 66% of Everest's height. Despite this, Kilimanjaro remains one of the most challenging climbs due to rapid altitude gain.",
  },
  {
    question: "What is the height of Kilimanjaro in feet?",
    answer:
      "Kilimanjaro's summit, Uhuru Peak, stands at 19,341 feet (5,895 metres) above sea level, making it the highest free-standing mountain in the world.",
  },
  {
    question: "Do you need climbing experience to reach the summit?",
    answer:
      "No technical climbing skills are required to climb Kilimanjaro. It is a high-altitude trek that demands physical fitness, mental determination, and proper acclimatisation. With a reputable guide company, most reasonably fit people can attempt the summit.",
  },
  {
    question: "What percentage of climbers reach the top?",
    answer:
      "Summit success rates vary significantly by route and duration: approximately 65% on the Marangu 5-day route, rising to 85–95% on the Lemosho 8-day route. Longer itineraries allow better acclimatisation and dramatically improve your chances.",
  },
];

export default function MountKilimanjaroHeightPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Mount Kilimanjaro Height", url: "/mount-kilimanjaro-height/" },
          ]),
          generateFAQSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Climbers approaching the summit of Mount Kilimanjaro"
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
                Africa&apos;s Highest Peak
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              How High is Mount Kilimanjaro?
            </h1>
            <p className="text-2xl font-semibold text-[var(--secondary)] mb-6">
              Africa&apos;s Highest Peak — 5,895m (19,341 ft)
            </p>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Kilimanjaro rises from the Tanzanian plains to an icy summit at 5,895 metres,
              making it the world&apos;s highest free-standing mountain and one of the Seven Summits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Book Your Kilimanjaro Climb
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

      {/* Key Facts */}
      <section className="py-12 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="text-center bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <p className="text-sm text-white/60 uppercase tracking-wider mb-1">{fact.label}</p>
                <p className="font-heading text-3xl font-bold text-[var(--secondary)] mb-1">
                  {fact.value}
                </p>
                <p className="text-white/70 text-sm">{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Height in Numbers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Global Perspective
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Mount Kilimanjaro&apos;s Altitude Compared to the World&apos;s Highest Peaks
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              At 5,895 metres (19,341 ft), the kilimanjaro peak height places it among Earth&apos;s elite summits. As Africa&apos;s highest mountain with a prominence of 5,885m, mt kilimanjaro height surpasses the Alps and most of Europe. Here is how the mount kilimanjaro height compares to other notable mountains:
            </p>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left px-5 py-3 font-semibold">Mountain</th>
                    <th className="text-left px-5 py-3 font-semibold">Height</th>
                    <th className="text-left px-5 py-3 font-semibold">Comparison</th>
                  </tr>
                </thead>
                <tbody>
                  {heightComparisons.map((row, i) => (
                    <tr
                      key={row.mountain}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-5 py-3 font-medium">{row.mountain}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">{row.height}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">{row.comparison}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Zones */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Altitude Ecosystems
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Five Climate Zones of Mount Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 text-lg">
              Climbing Kilimanjaro is like travelling from the equator to the Arctic — the mountain&apos;s altitude spans five distinct ecological zones, each with unique flora, fauna, and weather conditions.
            </p>
            <div className="space-y-4">
              {climateZones.map((zone) => (
                <div
                  key={zone.name}
                  className="flex gap-4 bg-white rounded-xl p-5 border border-[var(--border)] shadow-sm"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${zone.color}`}
                  >
                    {zone.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{zone.name}</h3>
                      <span className="text-sm text-[var(--text-muted)] bg-[var(--muted)] px-2 py-0.5 rounded-full">
                        {zone.elevation}
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)]">{zone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Kilimanjaro is Special */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Geography
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Mount Kilimanjaro is the World&apos;s Most Accessible High-Altitude Summit
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Mountain className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Free-Standing Mountain</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Unlike Everest, which belongs to a range, Kilimanjaro rises in dramatic isolation from the surrounding savannah — a full 5,885m of topographic prominence.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fastest Elevation Gain</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Trekkers gain nearly 4,000m in elevation over 5–8 days — one of the steepest altitude gains of any high-altitude trek on Earth, making acclimatisation critical.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Technical Skills Needed</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Kilimanjaro is accessible to non-technical climbers. No ropes, ice axes, or specialist training are required — making it the most achievable of the Seven Summits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summit Points Table */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Summit Reference
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              Kilimanjaro Summit Points &amp; Peak Heights
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/10">
                    <th className="text-left px-5 py-3 font-semibold">Summit Point</th>
                    <th className="text-left px-5 py-3 font-semibold">Height</th>
                    <th className="text-left px-5 py-3 font-semibold">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {summitPoints.map((pt, i) => (
                    <tr
                      key={pt.name}
                      className={i % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                    >
                      <td className="px-5 py-3 font-medium text-[var(--secondary)]">{pt.name}</td>
                      <td className="px-5 py-3 text-white/80">{pt.height}</td>
                      <td className="px-5 py-3 text-white/60">{pt.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Common Questions About Kilimanjaro&apos;s Height
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
            Ready to Stand on Africa&apos;s Roof?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Our expert guides have led thousands of trekkers to Uhuru Peak. Choose your route,
            pick your dates, and let us handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Book Your Kilimanjaro Climb
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
