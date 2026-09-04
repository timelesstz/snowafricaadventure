import { Metadata } from "next";
import Link from "next/link";
import {
  Mountain,
  MapPin,
  Calendar,
  TrendingUp,
  Thermometer,
  ArrowRight,
  Compass,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  TreePine,
  Route,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { KnowledgeBase, CredentialsBadges } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Mount Kenya Trek & Climb Guide",
  description:
    "Mount Kenya explained — Point Lenana at 4,985m on foot, Batian and Nelion for climbers, the Sirimon, Chogoria and Naro Moru routes, costs, and when to go.",
  url: "/mount-kenya/",
});

const LAST_UPDATED = "September 2026";

const heroStats = [
  {
    label: "Highest Point",
    value: "5,199m",
    subtext: "Batian — 17,057 ft",
    icon: Mountain,
  },
  {
    label: "Trekking Summit",
    value: "4,985m",
    subtext: "Point Lenana, no ropes",
    icon: TrendingUp,
  },
  {
    label: "Typical Trek",
    value: "4–5 days",
    subtext: "To Point Lenana",
    icon: Clock,
  },
  {
    label: "Rank in Africa",
    value: "2nd",
    subtext: "After Kilimanjaro",
    icon: Compass,
  },
];

const toc = [
  { id: "about", label: "About the mountain" },
  { id: "peaks", label: "The three summits" },
  { id: "routes", label: "Trekking routes" },
  { id: "when", label: "When to go" },
  { id: "difficulty", label: "How hard it is" },
  { id: "cost", label: "What it costs" },
  { id: "vs-kilimanjaro", label: "Vs Kilimanjaro" },
  { id: "faq", label: "Frequently asked questions" },
];

const peaks = [
  {
    name: "Batian",
    height: "5,199 m / 17,057 ft",
    access: "Technical rock climb",
    detail:
      "The true summit and the highest point in Kenya. Reaching it means multi-pitch rock climbing on exposed terrain, roped throughout. It is not a walking route at any point and is attempted by a small number of experienced alpinists each year.",
  },
  {
    name: "Nelion",
    height: "5,188 m / 17,021 ft",
    access: "Technical rock climb",
    detail:
      "Eleven metres lower than Batian and separated from it by the Gate of the Mists. The normal route up Nelion is a graded rock climb, usually done over two days with a bivouac near the top. Crossing to Batian afterwards adds another technical section.",
  },
  {
    name: "Point Lenana",
    height: "4,985 m / 16,355 ft",
    access: "Trekking peak — no ropes",
    detail:
      "The reason most people come. Point Lenana is reached on foot by a steep but non-technical path, usually as a pre-dawn push from a high camp. It is the third-highest point on the mountain and the realistic goal for a fit hiker with no climbing experience.",
  },
];

const routes = [
  {
    name: "Sirimon",
    days: "4–5 days",
    character: "Driest and gentlest gradient",
    detail:
      "Approaches from the north-west through open moorland. The gradual profile makes it the strongest choice for acclimatisation, which is why it is often paired as the ascent half of a traverse. Drier underfoot than the western routes.",
  },
  {
    name: "Chogoria",
    days: "4–6 days",
    character: "The scenic one",
    detail:
      "Comes in from the east past the Nithi Falls, Lake Ellis and the Gorges Valley. Widely considered the most beautiful approach on the mountain. Frequently walked in descent, so that the views open up ahead of you on the way down.",
  },
  {
    name: "Naro Moru",
    days: "3–4 days",
    character: "Fastest, steepest, wettest",
    detail:
      "The most direct line to Point Lenana and historically the most used. It crosses the notorious Vertical Bog, which is exactly what it sounds like after rain. The speed of ascent gives it the weakest acclimatisation profile of the three.",
  },
  {
    name: "Chogoria–Sirimon traverse",
    days: "5–6 days",
    character: "The classic combination",
    detail:
      "Up Sirimon for the acclimatisation, over Point Lenana, and down Chogoria for the scenery. Crossing the mountain rather than retracing your steps, this is the itinerary most guides recommend when time allows.",
  },
];

const faqs = [
  {
    question: "How high is Mount Kenya?",
    answer:
      "Mount Kenya's highest point is Batian at 5,199 metres (17,057 feet), making it the second-highest mountain in Africa after Kilimanjaro. Nelion, the second peak, is 5,188 metres. Point Lenana — the summit most trekkers aim for — is 4,985 metres.",
  },
  {
    question: "Can you climb Mount Kenya without technical climbing skills?",
    answer:
      "Yes, to Point Lenana at 4,985 metres. That summit is reached on a steep walking path and needs no ropes or climbing experience, only reasonable fitness and proper acclimatisation. The two higher peaks, Batian and Nelion, are genuine rock climbs and require alpine skills, equipment and a qualified climbing guide.",
  },
  {
    question: "How long does it take to climb Mount Kenya?",
    answer:
      "Most Point Lenana treks run 4 to 5 days. Three-day itineraries exist on the Naro Moru route but compress acclimatisation and lower your chances of summiting comfortably. The Chogoria–Sirimon traverse takes 5 to 6 days and is the itinerary most guides recommend.",
  },
  {
    question: "When is the best time to trek Mount Kenya?",
    answer:
      "The two dry windows are mid-January to late February and late August through September into early October. These months give the clearest skies and the most stable trail conditions. The long rains from late March to May and the short rains in November make the moorland sections wet and the views unreliable.",
  },
  {
    question: "Is Mount Kenya harder than Kilimanjaro?",
    answer:
      "Point Lenana is lower than Kilimanjaro's Uhuru Peak by around 900 metres, so the altitude challenge is smaller. But the trails are steeper and rougher underfoot, the trek is shorter so there is less time to acclimatise, and the infrastructure is more basic. Batian and Nelion are far harder than anything on Kilimanjaro, because they are technical climbs rather than walks.",
  },
  {
    question: "Do you need a guide to trek Mount Kenya?",
    answer:
      "Kenya Wildlife Service requires trekkers to be accompanied, and in practice everyone goes with a licensed guide. Beyond the rules, the upper mountain has unmarked sections, rapidly changing weather and a real altitude risk, so a guide who knows the route is a safety measure rather than a formality.",
  },
  {
    question: "How much does it cost to trek Mount Kenya?",
    answer:
      "A guided Point Lenana trek typically falls somewhere between roughly $600 and $1,300 per person, depending on route, group size and standard of service. Park fees payable to Kenya Wildlife Service are a significant part of that. Technical ascents of Batian or Nelion cost considerably more because they need specialist climbing guides. Treat any figure as indicative and confirm current park fees when you book.",
  },
];

export default function MountKenyaPage() {
  return (
    <>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "https://snowafricaadventure.com/" },
            {
              name: "Mount Kenya",
              url: "https://snowafricaadventure.com/mount-kenya/",
            },
          ]),
          generateArticleSchema({
            title: "Mount Kenya Trek & Climb Guide",
            description:
              "A complete guide to Mount Kenya — the three summits, the Sirimon, Chogoria and Naro Moru routes, costs, difficulty and the best months to go.",
            url: "/mount-kenya/",
            publishedTime: "2026-09-04",
            modifiedTime: "2026-09-04",
          }),
          generateFAQSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />

      <Breadcrumbs items={[{ label: "Mount Kenya", href: "/mount-kenya/" }]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <Mountain className="w-4 h-4" />
              <span>Africa&apos;s Second-Highest Mountain</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mount Kenya: Trekking and Climbing Guide
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
              Mount Kenya is the harder, quieter, more technical sibling of
              Kilimanjaro. Its true summit is a rock climb, not a walk — but
              Point Lenana at 4,985 metres is within reach of any fit hiker.
              This guide covers the three peaks, the routes up them, and what
              the mountain actually asks of you.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="#routes"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] text-[var(--primary-dark)] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors"
              >
                Compare the routes
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Ask us to plan a trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="bg-[var(--surface)] rounded-2xl p-5 text-center"
              >
                <s.icon className="w-8 h-8 mx-auto mb-3 text-[var(--primary)]" />
                <p className="text-3xl font-bold text-[var(--primary-dark)]">
                  {s.value}
                </p>
                <p className="text-sm font-semibold mt-1">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {s.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-10 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4">
              <BookOpen className="w-4 h-4" />
              On this page
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              About the mountain
            </h2>
            <div className="space-y-4 text-[var(--text)] leading-relaxed">
              <p>
                Mount Kenya sits roughly 150 kilometres north-east of Nairobi,
                straddling the equator. It is an extinct stratovolcano — what
                you climb today is the eroded plug of a volcano that was once
                far taller, worn down over millions of years into the jagged
                rock towers that give the mountain its distinctive skyline.
              </p>
              <p>
                That erosion is the key to understanding the place. Kilimanjaro
                kept its broad volcanic dome, so its summit is a walk. Mount
                Kenya lost its cone entirely, leaving hard rock spires behind.
                The highest points are climbs; the walkers&apos; summit sits
                just below them.
              </p>
              <p>
                Mount Kenya National Park is a{" "}
                <strong>UNESCO World Heritage Site</strong>, listed for both its
                landscape and its unusual afro-alpine plant life. The upper
                slopes carry giant lobelia and giant groundsel — plants that
                grow nowhere but on East Africa&apos;s high mountains. Lower
                down, the forest belt holds elephant, buffalo and colobus
                monkey, which is part of why walking unaccompanied is not
                permitted.
              </p>
              <p>
                The mountain still carries small glaciers, the largest being the
                Lewis Glacier, though they have retreated sharply within living
                memory and continue to shrink.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peaks */}
      <section id="peaks" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-3">
              The three summits
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              This is the single most important thing to understand before
              booking — &ldquo;climbing Mount Kenya&rdquo; means two completely
              different undertakings depending on which peak you mean.
            </p>
            <div className="space-y-4">
              {peaks.map((p) => (
                <div
                  key={p.name}
                  className="bg-white rounded-2xl p-6 border border-[var(--border)]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-heading text-xl font-bold">{p.name}</h3>
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {p.height}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] bg-[var(--surface)] rounded-full px-3 py-1 mb-3">
                    <Mountain className="w-3.5 h-3.5" />
                    {p.access}
                  </div>
                  <p className="text-[var(--text)] leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-3">
              Trekking routes to Point Lenana
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              Three main routes reach the mountain, and the best itineraries
              combine two of them.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {routes.map((r) => (
                <div
                  key={r.name}
                  className="bg-[var(--surface)] rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Route className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="font-heading text-lg font-bold">{r.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold mb-3">
                    <span className="text-[var(--primary)]">{r.days}</span>
                    <span className="text-[var(--text-muted)]">
                      {r.character}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text)] leading-relaxed">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When */}
      <section id="when" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              When to go
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-6 border-l-4 border-[var(--primary)]">
                <Calendar className="w-6 h-6 text-[var(--primary)] mb-3" />
                <h3 className="font-heading font-bold mb-2">
                  Mid-Jan to late Feb
                </h3>
                <p className="text-sm text-[var(--text)]">
                  The driest and clearest window of the year. Cold nights, but
                  stable trails and reliable summit views.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border-l-4 border-[var(--primary)]">
                <Calendar className="w-6 h-6 text-[var(--primary)] mb-3" />
                <h3 className="font-heading font-bold mb-2">
                  Late Aug to early Oct
                </h3>
                <p className="text-sm text-[var(--text)]">
                  The second dry season, and the more popular of the two.
                  Conditions are good and it pairs naturally with a safari.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-[var(--secondary)] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold mb-2">
                  Months to avoid
                </h3>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  The long rains from late March through May turn the moorland
                  — the Vertical Bog on Naro Moru especially — into deep mud,
                  and cloud cover often hides the peaks entirely. November&apos;s
                  short rains are less severe but still unreliable. Treks run in
                  these months, but you are gambling on the weather.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty */}
      <section id="difficulty" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              How hard it is
            </h2>
            <div className="space-y-4 text-[var(--text)] leading-relaxed">
              <p>
                For Point Lenana, the honest answer is: harder underfoot than
                Kilimanjaro, easier on the lungs. You are going about 900 metres
                less high, which matters a great deal at altitude. But the paths
                are steeper, rockier and less engineered, the summit push
                involves scrambling on loose ground in the dark, and the shorter
                itineraries leave less room to acclimatise.
              </p>
              <p>
                Altitude sickness remains the main reason people turn back.
                Nearly 5,000 metres is high enough to cause serious problems,
                and a three-day itinerary gives your body very little time to
                adjust. If you have the days available, take the longer
                traverse — it is the single biggest thing you can do to improve
                your odds.
              </p>
              <p>
                For Batian and Nelion the answer is different in kind, not
                degree. These are technical rock climbs at altitude. They
                require prior multi-pitch climbing experience, specialist
                equipment and a qualified climbing guide. No amount of hiking
                fitness substitutes for that.
              </p>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: CheckCircle2, label: "Point Lenana", note: "Fit hikers, no technical skill" },
                { icon: AlertTriangle, label: "Nelion", note: "Roped rock climb, 2 days" },
                { icon: AlertTriangle, label: "Batian", note: "Alpinists only" },
              ].map((d) => (
                <div key={d.label} className="bg-[var(--surface)] rounded-xl p-4">
                  <d.icon className="w-5 h-5 text-[var(--primary)] mb-2" />
                  <p className="font-semibold text-sm">{d.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {d.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section id="cost" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              What it costs
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-6">
              A guided Point Lenana trek generally lands somewhere between
              roughly <strong>$600 and $1,300 per person</strong>. Where you
              fall in that range depends on the route, how many days you take,
              group size, and whether you are in huts or tents. Park fees paid
              to Kenya Wildlife Service make up a meaningful share of the total
              and are charged per day in the park.
            </p>
            <p className="text-[var(--text)] leading-relaxed mb-6">
              Technical ascents of Nelion or Batian cost substantially more,
              because they need a certified climbing guide, a lower
              guide-to-client ratio and technical equipment.
            </p>
            <div className="bg-white rounded-2xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-[var(--secondary)] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Treat these figures as indicative rather than quoted. Park fees
                are set by Kenya Wildlife Service and change from time to time,
                so confirm the current rate at the point of booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vs Kilimanjaro */}
      <section id="vs-kilimanjaro" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6">
              Mount Kenya vs Kilimanjaro
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left p-3 font-semibold">&nbsp;</th>
                    <th className="text-left p-3 font-semibold">Mount Kenya</th>
                    <th className="text-left p-3 font-semibold">Kilimanjaro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Highest point", "Batian, 5,199 m", "Uhuru Peak, 5,895 m"],
                    ["Walkers' summit", "Point Lenana, 4,985 m", "Uhuru Peak — the true summit"],
                    ["Typical duration", "4–5 days", "6–9 days"],
                    ["Terrain", "Steeper, rockier, scrambling", "Long walking gradients"],
                    ["Crowds", "Far quieter", "~35,000 climbers a year"],
                    ["Country", "Kenya", "Tanzania"],
                  ].map(([k, a, b]) => (
                    <tr key={k} className="border-b border-[var(--border)]">
                      <td className="p-3 font-semibold">{k}</td>
                      <td className="p-3">{a}</td>
                      <td className="p-3">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[var(--text)] leading-relaxed mt-6">
              The essential difference: on Kilimanjaro you can walk to the
              actual summit of the mountain. On Mount Kenya you cannot — the top
              belongs to climbers, and trekkers stop at Point Lenana. Which one
              suits you depends on whether reaching the true high point matters
              to you, and how much technical ground you are prepared to cover.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/kilimanjaro-vs-mount-kenya/"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
              >
                Read the full comparison
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="bg-white rounded-2xl p-6">
                  <h3 className="font-heading font-bold mb-2">{f.question}</h3>
                  <p className="text-[var(--text)] leading-relaxed text-sm">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold mb-6 text-center">
              Related reading
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Link
                href="/kilimanjaro-vs-mount-kenya/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro vs Kenya</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Full comparison
                </p>
              </Link>
              <Link
                href="/mount-kilimanjaro/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Compass className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Mount Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Complete guide
                </p>
              </Link>
              <Link
                href="/trekking/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <MapPin className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Our Treks</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Routes we operate
                </p>
              </Link>
              <Link
                href="/is-there-snow-in-africa-mountains/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Thermometer className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Snow in Africa</p>
                <p className="text-xs text-[var(--text-muted)]">
                  8 peaks with ice
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CredentialsBadges />

      <KnowledgeBase exclude="/mount-kenya/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <TreePine className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Planning an East Africa mountain trip?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            We are an Arusha-based operator running Kilimanjaro and Mount Meru
            climbs and Tanzania safaris. Tell us what you have in mind and we
            will put an itinerary together.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/tailor-made-safari/"
              className="inline-flex items-center gap-2 bg-[var(--secondary)] text-[var(--primary-dark)] font-semibold px-8 py-4 rounded-lg hover:bg-white transition-colors"
            >
              Plan a trip with us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
            >
              Ask a question
              <MapPin className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-white/60 text-xs mt-10 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>
    </>
  );
}
