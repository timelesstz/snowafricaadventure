import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Users,
  ArrowRight,
  Heart,
  AlertTriangle,
  Check,
  ThermometerSun,
  MapPin,
  XCircle,
  ChevronDown,
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
import { RelatedGuides, CredentialsBadges, KnowledgeBase, SuccessCalculator } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "How Hard is Kilimanjaro to Climb?",
  description:
    "Honest guide to Kilimanjaro difficulty from guides with 800+ summits. Not technical — no ropes or harnesses needed. The real challenges are altitude, cold, and mental toughness.",
  url: "/how-hard-is-kilimanjaro/",
});

const difficultyFactors = [
  {
    icon: Mountain,
    title: "Altitude",
    rating: "Hard",
    ratingColor: "text-red-600 bg-red-50",
    description:
      "The single biggest challenge. At 5,895m, oxygen levels are roughly 50% of sea level. Altitude sickness affects most climbers to some degree above 3,500m. Proper acclimatization — choosing a 7+ day route — is the key to managing this safely.",
  },
  {
    icon: ThermometerSun,
    title: "Cold & Weather",
    rating: "Moderate-Hard",
    ratingColor: "text-orange-600 bg-orange-50",
    description:
      "Summit night temperatures drop to -15°C to -25°C with wind chill. You'll walk through tropical rainforest, alpine desert, and finally across glaciers and snow fields at the summit. Proper layering makes this manageable.",
  },
  {
    icon: Clock,
    title: "Duration & Endurance",
    rating: "Moderate",
    ratingColor: "text-amber-600 bg-amber-50",
    description:
      "You'll hike 5-8 hours per day for 5-9 days. The summit push is 12-15 hours of continuous walking. This requires cardiovascular fitness and mental stamina — but the pace is slow (pole pole).",
  },
  {
    icon: TrendingUp,
    title: "Technical Difficulty",
    rating: "Easy",
    ratingColor: "text-emerald-600 bg-emerald-50",
    description:
      "Kilimanjaro requires zero technical climbing skills. No ropes, harnesses, crampons, or ice axes needed. The Barranco Wall on the Machame/Lemosho routes involves hands-on scrambling but is not technical. It is a walk-up mountain.",
  },
  {
    icon: Heart,
    title: "Mental Toughness",
    rating: "Hard",
    ratingColor: "text-red-600 bg-red-50",
    description:
      "Summit night is the hardest part — walking uphill in freezing darkness for 6-7 hours with reduced oxygen. Many climbers who fail are physically capable but give up mentally. Preparing for this mental challenge is as important as physical training.",
  },
  {
    icon: Users,
    title: "Physical Fitness Required",
    rating: "Moderate",
    ratingColor: "text-amber-600 bg-amber-50",
    description:
      "You need to be able to hike 6-8 hours with a daypack comfortably. You don't need to be an athlete — regular walkers, runners, and gym-goers can do Kilimanjaro with 2-3 months of focused preparation.",
  },
];

const difficultyByRoute = [
  { route: "Marangu", slug: "6-days-marangu-route", days: "5-6", difficulty: "Moderate", note: "Gentlest gradient, hut accommodation" },
  { route: "Rongai", slug: "6-days-rongai-route", days: "6-7", difficulty: "Moderate", note: "Gradual northern approach, good for beginners" },
  { route: "Machame", slug: "7-days-machame-route", days: "6-7", difficulty: "Challenging", note: "Steeper sections, Barranco Wall scramble" },
  { route: "Lemosho", slug: "8-days-lemosho-route", days: "7-8", difficulty: "Moderate-Challenging", note: "Longer but better acclimatization = easier summit" },
  { route: "Northern Circuit", slug: "7-days-machame-route", days: "9", difficulty: "Moderate", note: "Longest route — easiest on your body" },
  { route: "Umbwe", slug: "6-days-umbwe-route", days: "6-7", difficulty: "Very Challenging", note: "Steepest route — experienced trekkers only" },
];

const faqs = [
  {
    question: "Is Kilimanjaro harder than Everest Base Camp?",
    answer:
      "Kilimanjaro summit (5,895m) is significantly higher than Everest Base Camp (5,364m), making altitude a bigger factor. However, EBC requires 12-14 days of trekking versus 5-9 for Kilimanjaro. The terrain on Kilimanjaro is generally easier — no glacier crossings or technical sections. Overall, reaching Kilimanjaro's summit is harder due to altitude, while EBC is longer and more remote.",
  },
  {
    question: "Can an unfit person climb Kilimanjaro?",
    answer:
      "An untrained person is unlikely to summit Kilimanjaro. While you don't need to be an athlete, you do need a reasonable level of cardiovascular fitness and the ability to hike for 6-8 hours. We recommend at least 8-12 weeks of training including regular hiking, cardio, and leg strengthening. The fitter you are, the more you'll enjoy the experience.",
  },
  {
    question: "What is the hardest part of climbing Kilimanjaro?",
    answer:
      "Summit night is universally regarded as the hardest part. You start at midnight from base camp (4,700m) and climb for 6-7 hours in freezing darkness with reduced oxygen to reach Uhuru Peak (5,895m) by sunrise. The combination of extreme cold, fatigue, altitude effects, and darkness makes this mentally and physically the most demanding part of the trek.",
  },
  {
    question: "How many people fail to summit Kilimanjaro?",
    answer:
      "The mountain-wide average summit success rate is approximately 65%, meaning about 35% of all climbers don't reach the top. However, this average is skewed by short 5-day routes with very low success rates. On 7+ day routes with experienced operators like Snow Africa Adventure, success rates are 85-95%. Route choice is the biggest factor in summit success.",
  },
  {
    question: "Is Kilimanjaro dangerous?",
    answer:
      "Kilimanjaro is not inherently dangerous when climbed with an experienced, licensed operator. The main risks are altitude sickness (manageable with proper acclimatization and monitoring), cold exposure (manageable with proper gear), and falling (rare — the trails are well-maintained). Fatalities are extremely rare — estimated at approximately 3-7 per year out of 35,000+ annual climbers.",
  },
  {
    question: "Do I need climbing experience for Kilimanjaro?",
    answer:
      "No. Kilimanjaro requires zero climbing experience. There are no ropes, harnesses, crampons, or technical gear needed. You will walk on trails the entire way. The Barranco Wall on the Machame and Lemosho routes involves some hands-on rock scrambling, but no climbing skills are required. Previous hiking experience is helpful but not essential.",
  },
  {
    question: "What's the easiest route up Kilimanjaro?",
    answer:
      "The Marangu Route has the gentlest gradient and is the only route with hut accommodation. However, it has the lowest success rate due to insufficient acclimatization on the 5-day version. The Northern Circuit (9 days) is paradoxically the 'easiest' in terms of summit success because the extra days allow superior acclimatization, making summit night significantly less demanding.",
  },
  {
    question: "How cold does it get on Kilimanjaro?",
    answer:
      "Summit night temperatures range from -15°C to -25°C with wind chill. At base camp (4,700m), nighttime temperatures are typically -5°C to -10°C. During the day, lower altitudes (2,000-3,500m) can be warm (15-25°C). You need layered clothing designed for this extreme temperature range. We provide a detailed gear list when you book.",
  },
  {
    question: "Can a 60-year-old climb Kilimanjaro?",
    answer:
      "Yes. We have guided climbers in their 60s and 70s to the summit. Age is less important than fitness and preparation. Older climbers should choose a longer route (7-8 days) for better acclimatisation, train for at least 12 weeks, and get a thorough medical check-up. The oldest person to summit Kilimanjaro was 89 years old. With realistic expectations and proper preparation, age alone is not a barrier.",
  },
  {
    question: "What fitness level do you need for Kilimanjaro?",
    answer:
      "You should be able to hike 6-8 hours with a daypack comfortably and do so on consecutive days. A good benchmark: if you can walk 15-20 km on hilly terrain without significant fatigue, you have a solid base. We recommend 8-12 weeks of training including hiking, cardio (running, cycling, swimming), and leg exercises (squats, lunges, stair climbing). You don't need to be an elite athlete — consistent preparation matters more than peak fitness.",
  },
  {
    question: "How long does it take to climb Kilimanjaro?",
    answer:
      "Most routes take 5 to 9 days. The shortest option is 5 days on the Marangu route, but success rates are low (~65%). We recommend 7-8 day routes (like Lemosho or Machame) which provide better acclimatisation and push success rates to 85-95%. The Northern Circuit is the longest at 9 days and offers the best acclimatisation. Factor in 1-2 travel days on either side for flights and transfers.",
  },
];

export default function HowHardIsKilimanjaroPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Trekking Routes", href: "/trekking/" },
            { label: "How Hard is Kilimanjaro?" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking Routes", url: "/trekking/" },
            { name: "How Hard is Kilimanjaro?", url: "/how-hard-is-kilimanjaro/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "How Hard is It to Climb Kilimanjaro? An Honest Assessment",
            description: "Honest guide to Kilimanjaro difficulty from guides with 800+ summits.",
            url: "/how-hard-is-kilimanjaro/",
            image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-04",
            modifiedTime: "2026-06-16",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: ["200+ Kilimanjaro Summits", "15+ Years Guiding Experience", "TATO Licensed Guide", "Wilderness First Responder"],
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Trekkers on Kilimanjaro assessing the difficulty of the climb"
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
              Honest Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              How Hard is It to Climb <span className="text-[var(--secondary)]">Kilimanjaro</span>?
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              The honest answer from guides who&apos;ve led 800+ summits: it&apos;s not technical, but it is genuinely hard. Here&apos;s what makes it challenging and how to prepare.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Short Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Kilimanjaro is a <strong>physically demanding, non-technical high-altitude trek</strong>. You don&apos;t need climbing skills — no ropes or harnesses. The real challenges are <strong>altitude (50% oxygen at the summit)</strong>, <strong>extreme cold (-20°C on summit night)</strong>, and <strong>mental determination during the midnight summit push</strong>. With proper preparation and a 7+ day route, most fit adults can reach the top. Our summit success rate is 93%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Factors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The 6 Difficulty Factors
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro&apos;s difficulty isn&apos;t one thing — it&apos;s a combination of factors. Here&apos;s how each one rates.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {difficultyFactors.map((factor) => (
              <div key={factor.title} className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center">
                    <factor.icon className="w-6 h-6 text-[var(--secondary)]" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${factor.ratingColor}`}>
                    {factor.rating}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{factor.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age & Fitness */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Age &amp; Fitness: Who Can Climb Kilimanjaro?
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-8 max-w-2xl mx-auto">
              Kilimanjaro welcomes climbers from 10 to 80+. Age matters less than preparation — here&apos;s what each age bracket should know.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
                <thead className="bg-[var(--primary-dark)] text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Age Range</th>
                    <th className="text-left px-4 py-3 font-semibold">Training</th>
                    <th className="text-left px-4 py-3 font-semibold">Recommended Route</th>
                    <th className="text-left px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 font-semibold">18–30</td>
                    <td className="px-4 py-3">8 weeks</td>
                    <td className="px-4 py-3">Any 6–8 day route</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Good baseline fitness usually sufficient; don&apos;t underestimate altitude</td>
                  </tr>
                  <tr className="border-t border-[var(--border)] bg-[var(--surface)]">
                    <td className="px-4 py-3 font-semibold">30–50</td>
                    <td className="px-4 py-3">10 weeks</td>
                    <td className="px-4 py-3">7–8 day (Lemosho, Machame)</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Focus on cardio and leg strength; extra acclimatisation days help</td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 font-semibold">50–65</td>
                    <td className="px-4 py-3">12 weeks</td>
                    <td className="px-4 py-3">8+ day (Lemosho, Northern Circuit)</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Medical check-up essential; longer routes strongly recommended</td>
                  </tr>
                  <tr className="border-t border-[var(--border)] bg-[var(--surface)]">
                    <td className="px-4 py-3 font-semibold">65+</td>
                    <td className="px-4 py-3">12–16 weeks</td>
                    <td className="px-4 py-3">8–9 day (Northern Circuit)</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Absolutely achievable — the oldest summiter was 89. Prioritise acclimatisation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">
              The minimum age to climb Kilimanjaro is 10 years old (KINAPA regulation). Children 10–17 must be accompanied by an adult.
            </p>
          </div>
        </div>
      </section>

      {/* Summit Night - The Hardest Part */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Summit Night: The Real Test</h2>
                <p className="text-white/60 text-sm">This is what separates summit from turnaround</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Summit night is the hardest 12 hours of the trek. You wake at 11 PM at Barafu Camp (4,700m) and begin climbing in total darkness. The <Link href="/kilimanjaro-weather/" className="text-[var(--secondary)] hover:underline">temperature drops to -15°C to -25°C</Link> with wind chill. Oxygen is at roughly 50% of sea level. You climb for 6-7 hours through <Link href="/is-there-snow-in-africa-mountains/" className="text-[var(--secondary)] hover:underline">snow and ice fields</Link> to reach Stella Point (5,756m), then another 45 minutes to Uhuru Peak (5,895m).
                </p>
                <p className="text-white/80 leading-relaxed">
                  The pace is extremely slow — one step every few seconds. Many climbers experience nausea, headaches, and extreme fatigue. This is where <strong className="text-white">mental preparation matters as much as physical fitness</strong>. Our guides are <Link href="/kilimanjaro-safety/" className="text-[var(--secondary)] hover:underline">trained in wilderness first response</Link> to keep you motivated, monitor your health, and make the right call if conditions become unsafe. Learn more about <Link href="/kilimanjaro-deaths/" className="text-[var(--secondary)] hover:underline">Kilimanjaro fatality statistics</Link> for full context on risk.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-1">Departure Time</p>
                  <p className="text-white/60 text-sm">11:00 PM – midnight</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-1">Duration to Summit</p>
                  <p className="text-white/60 text-sm">6-8 hours ascending</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-1">Temperature</p>
                  <p className="text-white/60 text-sm">-15°C to -25°C with wind chill</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-1">Oxygen Level</p>
                  <p className="text-white/60 text-sm">~50% of sea level</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-1">Total Summit Day</p>
                  <p className="text-white/60 text-sm">12-15 hours (summit + descent to camp)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty by Route */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Difficulty by Route
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Longer routes are paradoxically easier to summit because better acclimatization reduces altitude sickness.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">Physical Difficulty</th>
                  <th className="text-left px-4 py-3 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {difficultyByRoute.map((r, i) => (
                  <tr key={r.route} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}>
                    <td className="px-4 py-3">
                      <Link href={`/trekking/${r.slug}/`} className="font-semibold text-[var(--primary)] hover:underline">
                        {r.route}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{r.days}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        r.difficulty.includes("Very") ? "bg-red-100 text-red-700" :
                        r.difficulty.includes("Challenging") ? "bg-orange-100 text-orange-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {r.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline">
              See our full route comparison guide →
            </Link>
          </p>
        </div>
      </section>

      {/* How to Make It Easier */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              How to Make Kilimanjaro Easier
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Choose a 7+ day route", desc: "More days = better acclimatization = easier summit. Success rates jump from 65% (5-day) to 95% (8-day).", link: "/best-route-to-climb-kilimanjaro/" },
                { title: "Train for 8-12 weeks", desc: "Cardio, hiking with a pack, leg strength. The fitter you are, the more enjoyable the trek.", link: "/kilimanjaro-training-plan/" },
                { title: "Get proper gear", desc: "Quality boots (broken in), layering system for -25°C to +25°C, warm sleeping bag.", link: "/kilimanjaro-climbing-gear/" },
                { title: "Climb with experienced guides", desc: "KINAPA-certified, Wilderness First Responder guides who monitor your health twice daily.", link: "/our-guides/" },
                { title: "Hydrate constantly", desc: "Drink 3-4 litres per day. Dehydration worsens altitude sickness symptoms significantly.", link: "/kilimanjaro-food-meals/" },
                { title: "Go slow (pole pole)", desc: "The golden rule of Kilimanjaro. Walking slowly preserves energy and helps your body adapt to altitude." },
                { title: "Join a group climb", desc: "Group climbs provide built-in motivation on summit night and save 15–30% vs private climbs.", link: "/kilimanjaro-group-climbs/" },
              ].map((tip) => (
                <div key={tip.title} className="flex gap-4 bg-[var(--surface)] rounded-xl p-5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{tip.desc}</p>
                    {tip.link && (
                      <Link href={tip.link} className="text-sm text-[var(--primary)] hover:underline mt-1 inline-block">
                        Learn more →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with Other Treks */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Kilimanjaro vs Other Famous Treks
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
                <thead className="bg-[var(--primary-dark)] text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Trek</th>
                    <th className="text-left px-4 py-3 font-semibold">Max Altitude</th>
                    <th className="text-left px-4 py-3 font-semibold">Days</th>
                    <th className="text-left px-4 py-3 font-semibold">Technical?</th>
                    <th className="text-left px-4 py-3 font-semibold">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-amber-50 border-t border-[var(--border)]">
                    <td className="px-4 py-3 font-semibold">Kilimanjaro</td>
                    <td className="px-4 py-3">5,895m</td>
                    <td className="px-4 py-3">5-9</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-bold">Challenging</span></td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3">Everest Base Camp</td>
                    <td className="px-4 py-3">5,364m</td>
                    <td className="px-4 py-3">12-14</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold">Moderate</span></td>
                  </tr>
                  <tr className="bg-[var(--surface)] border-t border-[var(--border)]">
                    <td className="px-4 py-3">Inca Trail</td>
                    <td className="px-4 py-3">4,215m</td>
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold">Moderate</span></td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3">Mont Blanc</td>
                    <td className="px-4 py-3">4,808m</td>
                    <td className="px-4 py-3">2-3</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-bold">Challenging</span></td>
                  </tr>
                  <tr className="bg-[var(--surface)] border-t border-[var(--border)]">
                    <td className="px-4 py-3">Aconcagua</td>
                    <td className="px-4 py-3">6,961m</td>
                    <td className="px-4 py-3">18-20</td>
                    <td className="px-4 py-3">No (normal route)</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-bold">Very Hard</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[var(--text-muted)] leading-relaxed">
              The most common comparison is <Link href="/kilimanjaro-vs-everest/" className="text-[var(--secondary)] font-semibold hover:underline">Mount Kilimanjaro vs Mount Everest</Link>. While Kilimanjaro is actually higher than Everest Base Camp, the full Everest summit is in an entirely different league. Read our detailed comparison to understand the differences in cost, training, and difficulty.
            </p>
          </div>
        </div>
      </section>

      {/* The Hardest Day on Each Route */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The Hardest Day on Each Route
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Every route has a crux day — the single toughest stretch that tests everything you&apos;ve got. Here&apos;s what to expect on the hardest day of each Kilimanjaro route.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  route: "Marangu Route",
                  slug: "6-days-marangu-route",
                  day: "Day 4: Kibo Hut to Uhuru Peak &amp; descent",
                  elevation: "4,700m → 5,895m (+1,195m gain)",
                  hours: "12–15 hours total (7h up, 5–8h down to Horombo)",
                  challenge: "The Marangu summit push is brutal because of the steep scree slopes above Kibo Hut. You ascend 1,195m in freezing darkness on loose volcanic gravel — two steps forward, one step sliding back. With only 5 days of acclimatization on the standard itinerary, altitude hits harder here than on longer routes. After summiting, you descend all the way to Horombo Hut (3,720m), making this an exhausting 15-hour day.",
                  badgeColor: "bg-orange-100 text-orange-700",
                },
                {
                  route: "Machame Route",
                  slug: "7-days-machame-route",
                  day: "Day 5: Barafu Camp to Summit &amp; descent",
                  elevation: "4,673m → 5,895m (+1,222m gain)",
                  hours: "12–15 hours total (7h up, 5–8h down to Mweka Camp)",
                  challenge: "Summit night on Machame starts at midnight from Barafu Camp. The approach follows a steep switchback trail up volcanic scree in -20°C darkness with roughly 50% oxygen. What makes Machame&apos;s summit day especially draining is that you descend past Barafu all the way to Mweka Camp (3,100m) afterward — a total elevation loss of nearly 2,800m in a single day. Your knees will remember this descent.",
                  badgeColor: "bg-orange-100 text-orange-700",
                },
                {
                  route: "Lemosho Route",
                  slug: "8-days-lemosho-route",
                  day: "Day 6: Barafu Camp to Summit &amp; descent",
                  elevation: "4,673m → 5,895m (+1,222m gain)",
                  hours: "12–14 hours total",
                  challenge: "The Lemosho summit night follows the same Barafu approach as Machame, but with a crucial difference: you&apos;ve had 2 extra acclimatization days. This means less nausea, fewer headaches, and significantly more energy for the push. The climb itself is still grueling — hours of slow switchbacks on scree in freezing darkness — but your body is better prepared. This is why Lemosho has one of the highest success rates despite the same summit route.",
                  badgeColor: "bg-amber-100 text-amber-700",
                },
                {
                  route: "Rongai Route",
                  slug: "6-days-rongai-route",
                  day: "Day 5: Kibo Hut to Summit &amp; descent",
                  elevation: "4,700m → 5,895m (+1,195m gain)",
                  hours: "12–15 hours total",
                  challenge: "Rongai approaches from the north, arriving at Kibo Hut for the summit push. The ascent follows the same steep scree path as Marangu above the hut — Gilman&apos;s Point first, then the crater rim to Uhuru Peak. The challenge is amplified by the route&apos;s gentle northern approach: your legs aren&apos;t conditioned for steep terrain because the previous days were gradual. The sudden steepness on summit night catches some climbers off guard.",
                  badgeColor: "bg-orange-100 text-orange-700",
                },
                {
                  route: "Northern Circuit",
                  slug: "7-days-machame-route",
                  day: "Day 8: School Hut to Summit &amp; descent",
                  elevation: "4,800m → 5,895m (+1,095m gain)",
                  hours: "10–13 hours total",
                  challenge: "The Northern Circuit summit night starts from School Hut (4,800m) — 100m higher than Barafu — so the actual climb is shorter: roughly 1,095m of gain. After 7 days of gradual acclimatization circling the mountain, your body has adapted better than on any other route. The physical challenge remains significant (freezing cold, thin air, steep scree), but this is statistically the &quot;easiest&quot; summit night because altitude symptoms are minimized.",
                  badgeColor: "bg-emerald-100 text-emerald-700",
                },
                {
                  route: "Umbwe Route",
                  slug: "6-days-umbwe-route",
                  day: "Day 3: Barranco Camp to Lava Tower &amp; beyond",
                  elevation: "3,900m → 4,600m (+700m) via steep ridgeline",
                  hours: "6–8 hours of steep, exposed hiking",
                  challenge: "Unlike other routes where summit night is the crux, Umbwe&apos;s hardest day comes earlier. Day 3 forces a relentless steep ascent through the Barranco area with significant exposure on narrow ridgelines. The gradient is the steepest of any Kilimanjaro route — you gain altitude dangerously fast, which is why altitude sickness hits harder and earlier on Umbwe. This route is only for experienced trekkers who have done high-altitude hikes before.",
                  badgeColor: "bg-red-100 text-red-700",
                },
              ].map((item) => (
                <div key={item.route} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Link href={`/trekking/${item.slug}/`} className="font-heading text-lg font-bold text-[var(--primary)] hover:underline">
                      {item.route}
                    </Link>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.badgeColor}`}>
                      {item.day}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                      <span className="text-[var(--text-muted)]"><strong>Elevation:</strong> {item.elevation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                      <span className="text-[var(--text-muted)]"><strong>Duration:</strong> {item.hours}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.challenge}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              <Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline">
                Compare all routes side by side →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Why Climbers Turn Back */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Why Climbers Turn Back: The 5 Most Common Reasons
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                About 35% of all Kilimanjaro climbers don&apos;t reach the summit. Here are the five reasons — and how to avoid every one of them.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  number: 1,
                  title: "Altitude sickness from choosing too short a route",
                  explanation: "The number one reason climbers fail is acute mountain sickness (AMS) caused by insufficient acclimatization. Climbers who pick a 5-day route give their body half the adjustment time of those on an 8-day route. Symptoms — severe headache, vomiting, disorientation — force guides to evacuate for safety.",
                  prevention: "Choose a 7+ day route. The extra days let your body produce more red blood cells and adjust to reduced oxygen gradually.",
                  link: "/kilimanjaro-altitude-sickness/",
                  linkText: "Read our altitude sickness prevention guide",
                },
                {
                  number: 2,
                  title: "Inadequate physical preparation",
                  explanation: "Kilimanjaro isn&apos;t technical, but it demands sustained endurance — hiking 6-8 hours daily for a week, then a 12-15 hour summit push. Climbers who don&apos;t train find their legs giving out by Day 3, and summit night becomes impossible. The mountain doesn&apos;t care about motivation alone.",
                  prevention: "Follow a structured 8-12 week training plan with progressive hiking, cardio, and leg strengthening. Arrive fit enough to enjoy it, not just survive it.",
                  link: "/kilimanjaro-training-plan/",
                  linkText: "Get the 12-week training plan",
                },
                {
                  number: 3,
                  title: "Wrong gear causing cold injury or blisters",
                  explanation: "We&apos;ve seen climbers arrive with running shoes, cotton base layers, or jackets rated to 0°C for a -25°C summit night. Blisters from un-broken-in boots force turnarounds by Day 2. Cold hands and feet on summit night make the mental battle infinitely harder.",
                  prevention: "Follow a proper gear checklist. Break in your boots with at least 50km of hiking before the trip. Invest in quality thermal layers — your summit night comfort depends on it.",
                  link: "/kilimanjaro-climbing-gear/",
                  linkText: "See the complete gear checklist",
                },
                {
                  number: 4,
                  title: "Mental breakdown on summit night",
                  explanation: "Summit night is a psychological war. Walking uphill in total darkness at -20°C for 6-7 hours while nauseated and oxygen-deprived breaks many climbers who are physically capable of summiting. The darkness feels endless. Every step feels futile. Some simply sit down and say &quot;I can&apos;t.&quot;",
                  prevention: "Prepare mentally as seriously as physically. Visualize summit night. Have a personal mantra. Know that the darkness ends — sunrise at Stella Point is the reward. Climbing with a group provides critical motivation.",
                  link: "/kilimanjaro-solo-climb/",
                  linkText: "Solo vs group: what helps on summit night",
                },
                {
                  number: 5,
                  title: "Pre-existing health condition not disclosed",
                  explanation: "Climbers with uncontrolled asthma, heart conditions, or severe anaemia face elevated risk at altitude. When these conditions aren&apos;t disclosed to guides beforehand, emergency evacuations happen mid-trek. Altitude amplifies every underlying issue.",
                  prevention: "Get a thorough medical check-up before booking. Disclose all conditions to your operator — this isn&apos;t about gatekeeping, it&apos;s about safety planning. Most conditions can be managed with the right preparation and route choice.",
                  link: "/kilimanjaro-safety/",
                  linkText: "Full safety guide and medical advice",
                },
              ].map((reason) => (
                <div key={reason.number} className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <span className="text-red-700 font-bold text-sm">{reason.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold mb-3">{reason.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">{reason.explanation}</p>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-emerald-800"><strong>How to avoid it:</strong> {reason.prevention}</p>
                        </div>
                      </div>
                      <Link href={reason.link} className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1">
                        {reason.linkText} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-[var(--text-muted)]">
              <Link href="/kilimanjaro-women-climbing/" className="text-[var(--primary)] hover:underline">Women climbing Kilimanjaro</Link> {" | "}
              <Link href="/kilimanjaro-age-limits/" className="text-[var(--primary)] hover:underline">Age limits &amp; requirements</Link> {" | "}
              <Link href="/kilimanjaro-deaths/" className="text-[var(--primary)] hover:underline">Death statistics in context</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Day-by-Day Difficulty Rating */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Day-by-Day Difficulty Rating
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Here&apos;s what a typical 7-day <Link href="/trekking/8-days-lemosho-route/" className="text-[var(--primary)] hover:underline">Lemosho Route</Link> climb feels like day by day. This is our most recommended route for its balance of scenery and acclimatization.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  day: "Day 1",
                  name: "Londorossi Gate → Mti Mkubwa Camp",
                  altitude: "2,100m → 2,895m",
                  hours: "3-4 hours",
                  difficulty: "Easy",
                  badgeColor: "bg-emerald-100 text-emerald-700",
                  barWidth: "w-[20%]",
                  barColor: "bg-emerald-500",
                  description: "Gentle forest walk through lush montane rainforest. Muddy trails, birdsong, colobus monkeys overhead. Feels like a nature hike. Most climbers feel great — the altitude is barely noticeable.",
                },
                {
                  day: "Day 2",
                  name: "Mti Mkubwa → Shira 2 Camp",
                  altitude: "2,895m → 3,850m",
                  hours: "5-7 hours",
                  difficulty: "Easy–Moderate",
                  badgeColor: "bg-emerald-100 text-emerald-700",
                  barWidth: "w-[35%]",
                  barColor: "bg-emerald-500",
                  description: "Transition into open moorland with incredible views of Shira Plateau. Longer day with noticeable altitude gain. Some climbers get their first mild headache — drink extra water and walk slowly.",
                },
                {
                  day: "Day 3",
                  name: "Shira 2 → Lava Tower → Barranco Camp",
                  altitude: "3,850m → 4,630m → 3,960m",
                  hours: "5-7 hours",
                  difficulty: "Moderate",
                  badgeColor: "bg-amber-100 text-amber-700",
                  barWidth: "w-[50%]",
                  barColor: "bg-amber-500",
                  description: "The key acclimatization day — climb high, sleep low. You ascend to Lava Tower (4,630m) where many feel altitude effects for the first time, then descend to Barranco Camp. This strategy trains your body to handle the altitude. Expect some fatigue and mild headache at the high point.",
                },
                {
                  day: "Day 4",
                  name: "Barranco Camp → Karanga Camp",
                  altitude: "3,960m → 3,995m",
                  hours: "4-5 hours",
                  difficulty: "Moderate–Hard",
                  badgeColor: "bg-orange-100 text-orange-700",
                  barWidth: "w-[65%]",
                  barColor: "bg-orange-500",
                  description: "Starts with the famous Barranco Wall — a 257m rock scramble that looks intimidating but is non-technical. Hands-on climbing with exposure (don&apos;t look down). Exhilarating, not dangerous, but physically demanding. Short day after the wall, which gives your body time to recover.",
                },
                {
                  day: "Day 5",
                  name: "Karanga Camp → Barafu Camp",
                  altitude: "3,995m → 4,673m",
                  hours: "3-4 hours",
                  difficulty: "Moderate",
                  badgeColor: "bg-amber-100 text-amber-700",
                  barWidth: "w-[50%]",
                  barColor: "bg-amber-500",
                  description: "Short day through alpine desert to Barafu base camp. The landscape is barren and lunar. You arrive early, eat, hydrate, and try to sleep before the midnight wake-up call. Nerves kick in. The tension at camp is palpable — everyone knows what&apos;s coming.",
                },
                {
                  day: "Day 6",
                  name: "Barafu → Uhuru Peak → Mweka Camp",
                  altitude: "4,673m → 5,895m → 3,100m",
                  hours: "12-15 hours total",
                  difficulty: "Very Hard",
                  badgeColor: "bg-red-100 text-red-700",
                  barWidth: "w-[95%]",
                  barColor: "bg-red-500",
                  description: "Summit night. Midnight start, -20°C, 50% oxygen, 6-7 hours of uphill in total darkness on steep volcanic scree. The hardest thing most climbers will ever do. Sunrise at Stella Point makes it worth every step. After summit photos at Uhuru Peak, you descend 2,800m to Mweka Camp — knees will ache.",
                },
                {
                  day: "Day 7",
                  name: "Mweka Camp → Mweka Gate",
                  altitude: "3,100m → 1,640m",
                  hours: "2-3 hours",
                  difficulty: "Easy",
                  badgeColor: "bg-emerald-100 text-emerald-700",
                  barWidth: "w-[15%]",
                  barColor: "bg-emerald-500",
                  description: "Gentle descent through rainforest back to the gate. Your legs are tired but your spirit is soaring. Certificate ceremony at the gate. The oxygen-rich air at low altitude feels like breathing for the first time. Celebratory lunch and transfer to your hotel.",
                },
              ].map((item) => (
                <div key={item.day} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-heading font-bold text-lg">{item.day}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.badgeColor}`}>
                      {item.difficulty}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] ml-auto hidden sm:block">{item.hours}</span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{item.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{item.altitude}</p>
                  {/* Difficulty bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className={`${item.barColor} h-2 rounded-full ${item.barWidth} transition-all`} />
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                <strong>Note:</strong> Difficulty ratings assume reasonable fitness and proper acclimatization. The <Link href="/kilimanjaro-food-meals/" className="text-[var(--primary)] hover:underline">food and nutrition on the mountain</Link> also plays a role — eating well keeps your energy stable. <Link href="/kilimanjaro-weather/" className="text-[var(--primary)] hover:underline">Weather conditions</Link> can shift any day&apos;s difficulty up by one level, especially during the rainy season.
              </p>
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
      <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 6 routes</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention & treatment</p>
              </Link>
              <Link href="/climbing-kilimanjaro/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Star className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Complete Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Everything you need</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summit Success Calculator */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Estimate Your Summit Success Rate
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Answer four questions and get a personalised estimate based on data from 1,200+ Snow Africa expeditions.
            </p>
          </div>
          <SuccessCalculator />
        </div>
      </section>

      <KnowledgeBase exclude="/how-hard-is-kilimanjaro/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            It&apos;s Hard — But You Can Do It
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With the right route, proper preparation, and experienced guides, Kilimanjaro is achievable for most determined adults. Our 93% success rate speaks for itself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trekking/" className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Explore All Routes
            </Link>
            <Link href="/kilimanjaro-join-group-departures/" className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Join a Group Departure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
