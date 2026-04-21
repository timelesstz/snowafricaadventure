import { Metadata } from "next";
import Link from "next/link";
import {
  Mountain,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Thermometer,
  ArrowRight,
  Compass,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Activity,
  Heart,
  TreePine,
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
  title: "Mount Kilimanjaro: Complete Climber's Guide (2026)",
  description:
    "Everything on Mount Kilimanjaro — 5,895m height, 7 routes, costs from $2,000, 65%+ success rates, and the best months to climb. From Arusha-based KPAP guides.",
  url: "/mount-kilimanjaro/",
});

const LAST_UPDATED = "April 2026";

const heroStats = [
  {
    label: "Summit Height",
    value: "5,895m",
    subtext: "19,341 ft — Africa's roof",
    icon: Mountain,
  },
  {
    label: "Average Success",
    value: "65%",
    subtext: "90%+ on 8-day routes",
    icon: TrendingUp,
  },
  {
    label: "Climbers / Year",
    value: "~35,000",
    subtext: "From 100+ countries",
    icon: Users,
  },
  {
    label: "UNESCO Status",
    value: "1987",
    subtext: "World Heritage Site",
    icon: Award,
  },
];

const toc = [
  { id: "about", label: "About the mountain" },
  { id: "height", label: "Height & comparison" },
  { id: "routes", label: "The 7 routes" },
  { id: "cost", label: "How much it costs" },
  { id: "when", label: "When to climb" },
  { id: "difficulty", label: "How hard it is" },
  { id: "success", label: "Success rates" },
  { id: "packing", label: "What to pack" },
  { id: "altitude", label: "Altitude sickness" },
  { id: "faq", label: "Frequently asked questions" },
];

const routes = [
  {
    name: "Lemosho (8 days)",
    slug: "/trekking/8-days-lemosho-route/",
    tagline: "Highest success rate. Our most recommended route.",
    body: "Approaches from the west through remote rainforest, crosses the Shira Plateau, and joins the southern circuit for summit night. The 8-day version gives the acclimatisation most climbers need — we see a 90%+ summit rate on this itinerary versus ~65% on shorter routes. Scenery is the best on the mountain.",
    difficulty: "Moderate — long but gradual",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Machame (7 days)",
    slug: "/trekking/7-days-machame-route/",
    tagline: "The \"Whiskey Route\" — scenic, popular, and great value.",
    body: "Tanzania's most popular route. Seven days gives enough acclimatisation for most fit climbers, and the scenery — Shira Plateau, Lava Tower, the iconic Barranco Wall — is unmatched. Trails are steeper than Lemosho but the views are worth it. Expect busy camps in high season.",
    difficulty: "Moderate to challenging",
    tone: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Marangu (6 days)",
    slug: "/trekking/6-days-marangu-route/",
    tagline: "The \"Coca-Cola Route\" — the only route with hut accommodation.",
    body: "The oldest and most-trafficked route, and the only one where you sleep in bunked huts rather than tents. A 6-day Marangu climb is the shortest standard option, which also means the lowest success rate on the mountain. Good for climbers prioritising comfort over scenery.",
    difficulty: "Easy to moderate (short)",
    tone: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    name: "Rongai (6-7 days)",
    slug: "/trekking/7-days-rongai-route/",
    tagline: "The only approach from the north. Drier and quieter.",
    body: "Starts on the rain-shadow (Kenyan) side of Kilimanjaro, so it gets significantly less rainfall than southern routes. Traffic is light even in peak season. The 7-day version is the one we recommend — summit approach follows Kibo Hut's steep scree, identical to Marangu summit night.",
    difficulty: "Moderate",
    tone: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Umbwe (6 days)",
    slug: "/trekking/6-days-umbwe-route/",
    tagline: "The steepest, shortest, and most demanding route.",
    body: "A direct, aggressive climb up the southern flank. Fit, experienced trekkers only — day two gains 1,200m of elevation. Few operators offer it because acclimatisation is poor and success rates are lower than Lemosho or Machame. Choose it only if you know you acclimatise fast.",
    difficulty: "Hard",
    tone: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    name: "Northern Circuit (9 days)",
    slug: null,
    tagline: "The longest route — highest success, fewest crowds.",
    body: "Loops around the north of the mountain before summit night, adding two extra acclimatisation days over standard Lemosho. Almost no one else uses it. Our records show the highest single-route summit rate (near 95%) with the lowest altitude-sickness rate. Best choice if you have the time and budget.",
    difficulty: "Moderate — long",
    tone: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "Mount Meru (3-4 days)",
    slug: "/mount-meru/",
    tagline: "Not Kilimanjaro — but the perfect acclimatisation climb before it.",
    body: "Tanzania's second-highest peak (4,566m) inside Arusha National Park. A 3-4 day Meru climb before Kilimanjaro increases summit success on Kili by a measurable margin and adds a fantastic wildlife-rich trek with buffalo, giraffe, and colobus monkeys on the lower slopes.",
    difficulty: "Challenging",
    tone: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

const faqs = [
  {
    question: "How tall is Mount Kilimanjaro?",
    answer:
      "Uhuru Peak, Kilimanjaro's highest point, sits at 5,895 metres (19,341 feet) above sea level. It is Africa's highest mountain and the tallest free-standing mountain in the world — meaning it rises directly from the surrounding plains rather than from a larger mountain range.",
  },
  {
    question: "How long does it take to climb Kilimanjaro?",
    answer:
      "Most climbers take 6 to 9 days on the mountain. The 8-day Lemosho route is our most-recommended itinerary because the extra acclimatisation day pushes summit success rates above 90%. Shorter 5-6 day climbs cut cost but also cut success rates to 50-65%.",
  },
  {
    question: "How much does it cost to climb Kilimanjaro?",
    answer:
      "Reputable operators charge between $2,000 and $5,000 per climber. Roughly half goes to Tanzania National Park fees — which are non-negotiable. Anything below $1,800 almost certainly underpays guides and porters. See our full Kilimanjaro pricing breakdown for a route-by-route matrix.",
  },
  {
    question: "Do you need climbing experience to summit Kilimanjaro?",
    answer:
      "No technical climbing experience is required. Kilimanjaro is a trek, not a climb — no ropes, no crampons, no technical skills. What you need is cardiovascular fitness, mental resilience for summit night, and a proper acclimatisation schedule. Most climbers prepare with 2-3 months of hiking and stair training.",
  },
  {
    question: "What is the best time of year to climb Kilimanjaro?",
    answer:
      "The two dry seasons: January-March (warmer, fewer crowds) and June-October (cooler, clearer skies, peak season). Avoid late March through May and November, which are the main rainy seasons — trails are slippery and views disappear into cloud.",
  },
  {
    question: "Is climbing Kilimanjaro dangerous?",
    answer:
      "Kilimanjaro is a serious high-altitude undertaking. The main risks are altitude sickness (mild symptoms affect ~75% of climbers, severe HACE/HAPE affect <1%) and cold exposure on summit night. Fatality rates are roughly 10 deaths per year across 35,000 climbers — about 0.03%. Choosing a longer route with proper acclimatisation and a KPAP-member operator dramatically reduces risk.",
  },
  {
    question: "Which route is the best for first-time climbers?",
    answer:
      "For most first-timers, the 8-day Lemosho route is the best balance of scenery, acclimatisation, and cost. If budget is the main constraint, the 7-day Machame is a close second. If you have time and money, Northern Circuit (9 days) gives the highest success rate on the mountain.",
  },
  {
    question: "Is Mount Kilimanjaro losing its snow?",
    answer:
      "Yes — the glaciers on Kilimanjaro have lost roughly 85% of their mass since 1912, and scientists predict the summit ice field may disappear within 20-30 years. The snow you see on the summit photos today is not guaranteed for the next generation of climbers, which is part of why climbing now matters.",
  },
];

export default function MountKilimanjaroPage() {
  return (
    <>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "https://snowafricaadventure.com/" },
            {
              name: "Mount Kilimanjaro",
              url: "https://snowafricaadventure.com/mount-kilimanjaro/",
            },
          ]),
          generateArticleSchema({
            title: "Mount Kilimanjaro: Complete Climber's Guide (2026)",
            description:
              "Complete guide to Mount Kilimanjaro — height, routes, costs, success rates, and best times to climb Africa's highest peak.",
            url: "/mount-kilimanjaro/",
            publishedTime: "2026-04-21",
            modifiedTime: "2026-04-21",
          }),
          generateFAQSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />

      <Breadcrumbs
        items={[{ label: "Mount Kilimanjaro", href: "/mount-kilimanjaro/" }]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <Mountain className="w-4 h-4" />
              <span>The Complete Guide to Africa&apos;s Highest Peak</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mount Kilimanjaro: Everything You Need Before You Climb
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
              Kilimanjaro rises 5,895 metres out of the Tanzanian savannah —
              Africa&apos;s highest point, the world&apos;s tallest
              free-standing mountain, and one of the few 5,000m+ summits an
              ordinary person can reach on foot. This is the guide we give to
              the 1,500+ climbers we walk up the mountain every year.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] text-[var(--primary-dark)] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors"
              >
                See upcoming group climbs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tailor-made-safari/"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Plan a private climb
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
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 text-sm hover:shadow-md hover:text-[var(--primary)] transition-all border border-[var(--border)]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the mountain */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <TreePine className="w-8 h-8 text-[var(--primary)]" />
              About the mountain
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Kilimanjaro is a dormant stratovolcano in north-east Tanzania,
              about 340 kilometres south of the equator and 300 kilometres from
              the Indian Ocean. It is not part of a mountain range — which is
              what makes it the tallest free-standing mountain on Earth. Rise
              to summit is roughly 4,900 metres; only Denali in Alaska has a
              comparable base-to-peak gain for a dormant stratovolcano.
            </p>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              The mountain has three volcanic cones: <strong>Kibo</strong> —
              the highest and the one climbers summit, holding Uhuru Peak at
              5,895m; <strong>Mawenzi</strong> — jagged, 5,149m, no longer
              climbed as a standard route; and <strong>Shira</strong> — the
              oldest, collapsed into a high plateau you cross on the Lemosho
              and Machame routes. Kibo is classified as dormant, not extinct —
              the last major eruption was ~360,000 years ago, with fumarolic
              activity at the summit crater as recently as the 2000s.
            </p>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              What makes climbing Kilimanjaro so striking is that you walk
              through five distinct ecological zones in under a week — from
              equatorial farmland at the Machame Gate, through dense montane
              rainforest dripping with old-man&apos;s beard, up into heather
              and giant groundsel, across the high-altitude alpine desert, and
              finally onto the glaciated arctic summit. Few places on Earth
              stack climate bands that aggressively.
            </p>
            <p className="text-[var(--text)] leading-relaxed">
              Kilimanjaro National Park has been a{" "}
              <strong>UNESCO World Heritage Site since 1987</strong> and the
              mountain appears on Tanzania&apos;s coat of arms. Its glaciers,
              however, are retreating fast: ice-cover has shrunk by roughly 85%
              since 1912 and glaciologists estimate the summit ice field could
              be gone within 20-30 years. The mountain you see in photos today
              is not guaranteed to look the same a generation from now.
            </p>
          </div>
        </div>
      </section>

      {/* Height & comparison */}
      <section id="height" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Mountain className="w-8 h-8 text-[var(--primary)]" />
              How tall is Kilimanjaro, really?
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Uhuru Peak is officially <strong>5,895 metres (19,341 feet)</strong>
              {" "}above sea level. That makes Kilimanjaro:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  The <strong>highest point in Africa</strong>, one of the
                  Seven Summits
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  The{" "}
                  <strong>
                    tallest free-standing mountain in the world
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  The <strong>fourth-most prominent mountain</strong> on Earth
                  (prominence: 5,885m)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  The <strong>highest volcano outside South America</strong>
                </span>
              </li>
            </ul>
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-6">
              <h3 className="font-heading text-lg font-bold mb-4">
                Kilimanjaro vs the Seven Summits
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span>Everest (Asia)</span>
                  <span className="font-semibold">8,849m</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span>Aconcagua (South America)</span>
                  <span className="font-semibold">6,961m</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span>Denali (North America)</span>
                  <span className="font-semibold">6,190m</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)] bg-[var(--surface)] -mx-6 px-6 font-semibold text-[var(--primary-dark)]">
                  <span>Kilimanjaro (Africa)</span>
                  <span>5,895m</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span>Elbrus (Europe)</span>
                  <span className="font-semibold">5,642m</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span>Vinson Massif (Antarctica)</span>
                  <span className="font-semibold">4,892m</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Kosciuszko (Australia)</span>
                  <span className="font-semibold">2,228m</span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text)] leading-relaxed">
              Everest is 2,954 metres taller than Kilimanjaro — but Everest
              requires technical climbing, 60+ days on the mountain, and costs
              roughly $30,000 to $100,000. Kilimanjaro you can summit in a week
              for ~$2,500 without ropes, crampons, or a single rappel. If
              you&apos;re comparing the two seriously, read our{" "}
              <Link
                href="/kilimanjaro-vs-everest/"
                className="text-[var(--primary)] font-semibold hover:underline"
              >
                full Kilimanjaro vs Everest comparison
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section id="routes" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <Compass className="w-8 h-8 text-[var(--primary)]" />
              The 7 routes up Kilimanjaro
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-10 max-w-3xl">
              Six routes go up the mountain and one goes back down. Which one
              you pick is the single biggest decision in planning a climb — it
              determines your success rate, your scenery, how crowded your
              camps will be, and roughly what you&apos;ll pay. Here&apos;s the
              honest breakdown from an operator that works every one of them.
            </p>
            <div className="space-y-5">
              {routes.map((r) => (
                <article
                  key={r.name}
                  className={`rounded-2xl border p-6 md:p-7 ${r.tone}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-heading text-xl md:text-2xl font-bold">
                      {r.name}
                    </h3>
                    <span className="text-xs font-semibold bg-white/70 backdrop-blur-sm rounded-full px-3 py-1">
                      {r.difficulty}
                    </span>
                  </div>
                  <p className="font-semibold mb-3">{r.tagline}</p>
                  <p className="text-[var(--text)] leading-relaxed mb-4">
                    {r.body}
                  </p>
                  {r.slug ? (
                    <Link
                      href={r.slug}
                      className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    >
                      Full {r.name.split(" (")[0]} itinerary
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold opacity-70">
                      Available as a custom climb — contact us for dates
                    </span>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/best-route-to-climb-kilimanjaro/"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
              >
                Help me pick the right route
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section id="cost" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-[var(--primary)]" />
              How much does it cost?
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Reputable, properly-staffed Kilimanjaro climbs cost between
              <strong> $2,000 and $5,000 per climber</strong>. The variance
              comes from three things: which route you pick (longer = more
              park fees), group size (solo supplements can add 20-30%), and
              whether your operator pays fair porter wages.
            </p>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-6">
              <h3 className="font-heading text-lg font-bold mb-4">
                Where your money actually goes
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tanzania National Park fees</span>
                  <span className="font-semibold">$900 - $1,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Guides, assistant guides, porters (fair wage)</span>
                  <span className="font-semibold">$700 - $1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Meals, tents, equipment, oxygen kit</span>
                  <span className="font-semibold">$300 - $600</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfers, hotel nights in Arusha, logistics</span>
                  <span className="font-semibold">$200 - $400</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--border)] font-semibold text-[var(--primary-dark)]">
                  <span>Operator margin</span>
                  <span>10 - 20%</span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Anything priced below ~$1,800 is cutting corners — usually by
              underpaying porters, skipping emergency oxygen, or running
              short-staffed. The{" "}
              <a
                href="https://kiliporters.org/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] font-semibold hover:underline"
              >
                Kilimanjaro Porters Assistance Project (KPAP)
              </a>{" "}
              publishes a list of member operators who meet fair-wage
              standards; we are one of them.
            </p>
            <Link
              href="/kilimanjaro-prices/"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              See the full Kilimanjaro pricing breakdown
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* When to climb */}
      <section id="when" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[var(--primary)]" />
              When to climb
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Kilimanjaro has two dry seasons and two wet seasons. The dry
              ones are when you climb:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
                  Primary dry season
                </p>
                <p className="font-heading text-xl font-bold mb-2">
                  June to October
                </p>
                <p className="text-sm text-[var(--text)]">
                  Cooler, clearer summit-day skies, busiest camps. Book 6-9
                  months ahead for peak-season dates.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                  Short dry season
                </p>
                <p className="font-heading text-xl font-bold mb-2">
                  January to mid-March
                </p>
                <p className="text-sm text-[var(--text)]">
                  Warmer nights, greener forest, thinner crowds. Our personal
                  favourite window for scenery.
                </p>
              </div>
            </div>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              <strong>Avoid</strong> late March through May (long rains) and
              the second half of November (short rains). Trails turn to mud,
              summit night is colder, and summit views often disappear into
              cloud. Prices are lower but success rates drop too.
            </p>
            <Link
              href="/best-time-to-climb-kilimanjaro/"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              Month-by-month climb guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Difficulty */}
      <section id="difficulty" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-[var(--primary)]" />
              How hard is it really?
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Kilimanjaro is a trek, not a technical climb. There are no ropes,
              no ice axes, no crampons, no vertical rock. It is also, in
              places, brutally hard — which is why success rates are not 100%.
              The difficulty comes from four things working against you at
              once:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)] text-white text-sm font-bold shrink-0">
                  1
                </span>
                <div>
                  <p className="font-semibold">Altitude.</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    At Uhuru Peak the air contains roughly 49% of the oxygen at
                    sea level. Your body cannot fully acclimatise to 5,895m —
                    it can only tolerate it for a limited window.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)] text-white text-sm font-bold shrink-0">
                  2
                </span>
                <div>
                  <p className="font-semibold">Summit night.</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Most routes start summit day at 11pm-midnight, gain
                    1,200-1,300m in 6-8 hours, and descend another 2,000m
                    before lunch. It is the hardest 16-hour day of most people&apos;s
                    lives.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)] text-white text-sm font-bold shrink-0">
                  3
                </span>
                <div>
                  <p className="font-semibold">Cold.</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Summit-night temperatures routinely hit -15°C to -25°C
                    with wind chill, even in peak season.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)] text-white text-sm font-bold shrink-0">
                  4
                </span>
                <div>
                  <p className="font-semibold">Consecutive hard days.</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    5 to 9 days of 4-7 hour daily treks back to back, with
                    disrupted sleep and reduced appetite.
                  </p>
                </div>
              </li>
            </ol>
            <Link
              href="/how-hard-is-kilimanjaro/"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              Full difficulty breakdown
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success rates */}
      <section id="success" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[var(--primary)]" />
              Summit success rates
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              The all-operator industry average for reaching Uhuru Peak is
              around <strong>65%</strong>. That number hides huge variation by
              route length — and that variation is the single most predictable
              factor in whether you summit.
            </p>
            <div className="bg-[var(--surface)] rounded-2xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">5-day Marangu</span>
                  <span className="font-semibold">~45-50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">6-day Marangu / Umbwe</span>
                  <span className="font-semibold">~50-65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">7-day Machame / Rongai</span>
                  <span className="font-semibold">~75-85%</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-50 -mx-6 px-6 py-2 font-semibold text-emerald-700">
                  <span className="text-sm">8-day Lemosho (our recommendation)</span>
                  <span>~90%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">9-day Northern Circuit</span>
                  <span className="font-semibold">~95%</span>
                </div>
              </div>
            </div>
            <p className="text-[var(--text)] leading-relaxed">
              Choosing an 8-9 day itinerary on the right route is worth more
              than any training plan, gear upgrade, or altitude medication you
              can buy.{" "}
              <Link
                href="/kilimanjaro-success-rates/"
                className="text-[var(--primary)] font-semibold hover:underline"
              >
                See our detailed success-rate analysis
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Packing */}
      <section id="packing" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Thermometer className="w-8 h-8 text-[var(--primary)]" />
              What to pack
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              The essentials split into four categories: a quality layering
              system (base layers, insulating mid-layer, down jacket, hardshell),
              broken-in waterproof boots, a -18°C-rated sleeping bag, and a
              summit-night kit (balaclava, mittens, goggles, two headlamps,
              thermos). Every piece has a reason. Summit-night temperatures
              routinely hit -20°C; getting the layering wrong is the most
              common reason fit climbers turn around.
            </p>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Most gear can be rented in Arusha the day before your climb. We
              keep a full inventory and can fit you from the hotel.
            </p>
            <Link
              href="/the-ultimate-kilimanjaro-packing-list/"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              The full 2026 Kilimanjaro packing list
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Altitude */}
      <section id="altitude" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-[var(--primary)]" />
              Altitude sickness
            </h2>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              Roughly three in four Kilimanjaro climbers experience mild
              altitude symptoms — headache, nausea, loss of appetite, broken
              sleep. Those are normal above 3,500m and usually pass with an
              extra rest day or a slower ascent. A much smaller fraction (less
              than 1%) develop severe altitude illness (HACE or HAPE), and
              those require immediate descent and oxygen.
            </p>
            <p className="text-[var(--text)] leading-relaxed mb-4">
              The three things that most influence whether you get altitude
              sickness on Kili:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  <strong>Route choice and pace</strong> — longer routes give
                  your body time to acclimatise
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  <strong>Hydration and food intake</strong> — 4+ litres of
                  water a day; eat even when you&apos;re not hungry
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--text)]">
                  <strong>Diamox (acetazolamide)</strong> prophylaxis — discuss
                  with your doctor; many climbers take it
                </span>
              </li>
            </ul>
            <Link
              href="/kilimanjaro-altitude-sickness/"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
            >
              Full altitude-sickness prevention &amp; treatment guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="bg-white rounded-xl border border-[var(--border)] group"
                >
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

      {/* Related */}
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">
              More Kilimanjaro guides
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link
                href="/kilimanjaro-statistics/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro statistics</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Every verified data point
                </p>
              </Link>
              <Link
                href="/kilimanjaro-vs-everest/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">
                  Kilimanjaro vs Everest
                </p>
                <p className="text-xs text-[var(--text-muted)]">Full comparison</p>
              </Link>
              <Link
                href="/best-kilimanjaro-tour-operators/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Choosing an operator</p>
                <p className="text-xs text-[var(--text-muted)]">
                  What to look for
                </p>
              </Link>
              <Link
                href="/meet-florent/"
                className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Users className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">
                  Meet our lead guide
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Florent &amp; the team
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to stand on the roof of Africa?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            We run small-group and private Kilimanjaro climbs year-round from
            Arusha. KPAP member, TATO-licensed, 15+ years on the mountain.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-flex items-center gap-2 bg-[var(--secondary)] text-[var(--primary-dark)] font-semibold px-8 py-4 rounded-lg hover:bg-white transition-colors"
            >
              See upcoming departures
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
            >
              Plan a private climb
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
