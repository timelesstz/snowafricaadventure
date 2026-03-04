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
  title: "How Hard is Kilimanjaro to Climb?",
  description:
    "Honest guide to Kilimanjaro difficulty from guides with 500+ summits. Not technical — no ropes or harnesses needed. The real challenges are altitude, cold, and mental toughness.",
  url: "/how-hard-is-kilimanjaro/",
});

const difficultyFactors = [
  {
    icon: Mountain,
    title: "Altitude",
    rating: "Hard",
    ratingColor: "text-red-600 bg-red-50",
    description:
      "The single biggest challenge. At 5,895m, oxygen levels are roughly 50% of sea level. Altitude sickness affects most climbers to some degree above 3,500m. Proper acclimatization (choosing a 7+ day route) is the key to managing this.",
  },
  {
    icon: ThermometerSun,
    title: "Cold & Weather",
    rating: "Moderate-Hard",
    ratingColor: "text-orange-600 bg-orange-50",
    description:
      "Summit night temperatures drop to -15°C to -25°C with wind chill. You'll experience everything from tropical heat in the rainforest to arctic conditions at the summit. Proper layering makes this manageable.",
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
            description: "Honest guide to Kilimanjaro difficulty from guides with 500+ summits.",
            url: "/how-hard-is-kilimanjaro/",
            image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-04",
            modifiedTime: "2026-03-04",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: ["200+ Kilimanjaro Summits", "15+ Years Guiding Experience", "TATO Licensed Guide", "Wilderness First Responder"],
          }),
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
              The honest answer from guides who&apos;ve led 500+ summits: it&apos;s not technical, but it is genuinely hard. Here&apos;s what makes it challenging and how to prepare.
            </p>
          </div>
        </div>
      </section>

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
                  Summit night is the hardest 12 hours of the trek. You wake at 11 PM at Barafu Camp (4,700m) and begin climbing in total darkness. The temperature is -15°C to -25°C with wind chill. Oxygen is at roughly 50% of sea level. You climb for 6-7 hours to reach Stella Point (5,756m), then another 45 minutes to Uhuru Peak (5,895m).
                </p>
                <p className="text-white/80 leading-relaxed">
                  The pace is extremely slow — one step every few seconds. Many climbers experience nausea, headaches, and extreme fatigue. This is where <strong className="text-white">mental preparation matters as much as physical fitness</strong>. Our guides are trained to keep you motivated, monitor your health, and make the right call if conditions become unsafe.
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
                { title: "Hydrate constantly", desc: "Drink 3-4 litres per day. Dehydration worsens altitude sickness symptoms significantly." },
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

      {/* FAQ */}
      <section className="py-16 bg-white">
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
