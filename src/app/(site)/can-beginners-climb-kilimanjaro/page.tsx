import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Check,
  ArrowRight,
  Users,
  Shield,
  Star,
  TrendingUp,
  Heart,
  AlertTriangle,
  Footprints,
  Tent,
  ThermometerSnowflake,
  Brain,
  Quote,
  BookOpen,
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
  title: "Can Beginners Climb Kilimanjaro? Yes — Here's How",
  description:
    "Yes, beginners climb Kilimanjaro every year. No mountaineering experience needed. Choose a 7+ day route, train for 3 months, and use an experienced operator. Guide from 500+ summit team.",
  url: "/can-beginners-climb-kilimanjaro/",
});

const beginnerFriendlyReasons = [
  {
    icon: Mountain,
    title: "No Technical Skills Needed",
    description:
      "Kilimanjaro is a walk-up mountain. There are no ropes, harnesses, crampons, or ice axes required. You walk on established trails from start to finish. The Barranco Wall on some routes involves hands-on scrambling, but no actual climbing skills.",
  },
  {
    icon: Footprints,
    title: "Established, Well-Marked Trails",
    description:
      "Every route on Kilimanjaro follows clearly defined paths maintained by the Kilimanjaro National Park Authority (KINAPA). You won't be bushwhacking through wilderness — these are well-trodden trails used by 35,000+ climbers each year.",
  },
  {
    icon: Users,
    title: "Full Guide & Porter Support",
    description:
      "Tanzanian law requires all Kilimanjaro climbers to have a licensed guide. Your team includes guides, porters (who carry your gear, set up camp, and cook meals), and a summit guide. You only carry a daypack.",
  },
  {
    icon: Tent,
    title: "Camp & Hut Infrastructure",
    description:
      "Designated campsites at every stop have cleared tent platforms, toilet facilities, and ranger stations. The Marangu Route even has dormitory-style huts. You're never truly remote — rescue teams can reach any point within hours.",
  },
  {
    icon: Heart,
    title: "Pole Pole — The Beginner's Advantage",
    description:
      "\"Pole pole\" (po-leh po-leh) means \"slowly, slowly\" in Swahili. The deliberate slow pace required for altitude acclimatization is actually perfect for beginners. There's no rushing — the mountain sets the tempo, and it's gentle.",
  },
];

const difficultyFactors = [
  {
    icon: AlertTriangle,
    title: "Altitude is the Real Challenge",
    description:
      "At 5,895m, oxygen levels are roughly 50% of sea level. Altitude sickness can affect anyone regardless of fitness. Symptoms include headache, nausea, and fatigue. The solution: choose a longer route (7+ days) for gradual acclimatization.",
    severity: "Serious",
    severityColor: "text-red-600 bg-red-50",
  },
  {
    icon: TrendingUp,
    title: "Fitness Matters",
    description:
      "You'll walk 5-8 hours per day for up to 8 days. Summit night is 12-15 hours of continuous walking. You don't need to be an athlete, but you do need cardiovascular endurance and leg strength. Couch-to-summit without training is a recipe for failure.",
    severity: "Important",
    severityColor: "text-amber-600 bg-amber-50",
  },
  {
    icon: Brain,
    title: "The Mental Game",
    description:
      "Summit night is the mental crux. You start at midnight in freezing darkness, climbing for 6-7 hours with reduced oxygen. Many physically capable climbers turn back because they aren't mentally prepared. Knowing what to expect is half the battle.",
    severity: "Serious",
    severityColor: "text-red-600 bg-red-50",
  },
  {
    icon: ThermometerSnowflake,
    title: "Extreme Cold at the Summit",
    description:
      "Summit night temperatures drop to -15 to -25 degrees Celsius with wind chill. Proper layering and cold-weather gear are non-negotiable. This catches many beginners off guard — Africa doesn't mean warm at 5,895m.",
    severity: "Moderate",
    severityColor: "text-amber-600 bg-amber-50",
  },
];

const beginnerRoutes = [
  {
    name: "Lemosho Route (8 Days)",
    slug: "8-days-lemosho-route",
    days: 8,
    successRate: "90-95%",
    difficulty: "Moderate-Challenging",
    difficultyColor: "bg-amber-100 text-amber-700",
    recommendation: "Our Top Pick for Beginners",
    recommendationColor: "bg-emerald-600",
    pros: [
      "Best acclimatization profile of any route",
      "Spectacular scenery through 5 climate zones",
      "Low traffic on early days",
      "Highest summit success rate",
    ],
    cons: [
      "Slightly more expensive due to 8-day duration",
      "Includes the Barranco Wall scramble (manageable)",
    ],
    description:
      "The Lemosho is our most recommended route for first-time climbers. Eight days gives your body the best chance to acclimatize, and the gradual western approach is scenic and uncrowded. Our summit success rate on this route is 95%.",
  },
  {
    name: "Machame Route (7 Days)",
    slug: "7-days-machame-route",
    days: 7,
    successRate: "85-90%",
    difficulty: "Challenging",
    difficultyColor: "bg-orange-100 text-orange-700",
    recommendation: "Best Value for Beginners",
    recommendationColor: "bg-blue-600",
    pros: [
      "Excellent acclimatization on 7-day version",
      "\"Walk high, sleep low\" profile aids altitude adaptation",
      "Outstanding scenery and varied terrain",
      "Good balance of challenge and accessibility",
    ],
    cons: [
      "More crowded than Lemosho",
      "Steeper sections require decent fitness",
      "Includes Barranco Wall scramble",
    ],
    description:
      "Known as the \"Whiskey Route\" for its reputation as a tougher alternative to Marangu. The 7-day version provides solid acclimatization and is a fantastic option for beginners who have trained properly.",
  },
  {
    name: "Marangu Route (6 Days)",
    slug: "6-days-marangu-route",
    days: 6,
    successRate: "70-75%",
    difficulty: "Moderate",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    recommendation: "Easiest Terrain, But Fewer Days",
    recommendationColor: "bg-amber-600",
    pros: [
      "Gentlest gradient of all routes",
      "Only route with dormitory-style hut accommodation",
      "No camping required — good for those who dislike tents",
      "Straightforward, non-technical trail",
    ],
    cons: [
      "Fewer acclimatization days = lower success rate",
      "Most crowded route on the mountain",
      "Less scenic variety than western routes",
    ],
    description:
      "The \"Coca-Cola Route\" has the easiest terrain but a lower success rate because the standard 5-day version doesn't allow enough acclimatization. We only offer the 6-day version, which adds a crucial extra acclimatization day at Horombo Hut.",
  },
];

const checklist = [
  {
    title: "Choose a 7+ day route",
    description:
      "Success rates jump from 65% on 5-day routes to 90-95% on 8-day routes. More days means better acclimatization.",
  },
  {
    title: "Hire a reputable, licensed operator",
    description:
      "Look for TATO-licensed operators with certified guides, proper porter welfare, and transparent pricing. Your guides are your safety net.",
  },
  {
    title: "Start training 3 months early",
    description:
      "Cardio, hiking with a daypack, stair climbing, and leg strengthening. You don't need to be an athlete — just consistent.",
  },
  {
    title: "Get properly fitted boots",
    description:
      "Buy waterproof, ankle-supporting hiking boots at least 6 weeks before your trek. Break them in with regular walks. Blisters end treks.",
  },
  {
    title: "Invest in quality layering",
    description:
      "You'll experience temperatures from +25 degrees Celsius in the rainforest to -25 degrees Celsius at the summit. A proper base-mid-outer layering system is essential.",
  },
  {
    title: "Learn about altitude sickness",
    description:
      "Understand the symptoms (headache, nausea, dizziness), how to prevent it (hydration, slow pace, proper acclimatization), and when to descend.",
  },
  {
    title: "Plan your hydration strategy",
    description:
      "Drink 3-4 litres of water per day on the mountain. Bring water purification tablets or a filter as backup. Dehydration worsens altitude symptoms.",
  },
  {
    title: "Prepare mentally for summit night",
    description:
      "Know what to expect: midnight start, freezing cold, 6-7 hours of uphill in darkness. Mental preparation is as important as physical fitness.",
  },
  {
    title: "Get travel insurance with altitude coverage",
    description:
      "Ensure your policy covers trekking above 5,000m and emergency helicopter evacuation. Standard travel insurance often excludes high-altitude activities.",
  },
  {
    title: "Consult your doctor",
    description:
      "Discuss altitude medication (Diamox/acetazolamide) with your physician. Get a general health check. Disclose any pre-existing conditions to your operator.",
  },
];

const successStories = [
  {
    name: "Sarah",
    age: 52,
    background: "Retired Teacher from London",
    story:
      "Sarah had never climbed a mountain in her life. Her highest point before Kilimanjaro was a hill walk in the Lake District. She trained for 14 weeks with regular walks and gym sessions, chose the Lemosho 8-day route, and summited on her first attempt. Her advice: \"Pole pole isn't just about walking — it's a mindset. Take everything one step at a time.\"",
    route: "Lemosho 8-Day",
    routeSlug: "8-days-lemosho-route",
  },
  {
    name: "James & Priya",
    age: 34,
    background: "Software Engineers from Toronto",
    story:
      "Neither had any hiking experience beyond weekend nature walks. They booked the Machame 7-day route for their honeymoon adventure and followed a structured training plan for 12 weeks. Both reached Uhuru Peak at sunrise. James says: \"The guides made all the difference. They knew exactly when to push us and when to slow us down.\"",
    route: "Machame 7-Day",
    routeSlug: "7-days-machame-route",
  },
  {
    name: "Robert",
    age: 67,
    background: "Retired Engineer from Melbourne",
    story:
      "Robert wanted to climb Kilimanjaro for his 67th birthday. He had a hip replacement two years prior and was told by friends he was \"too old.\" He trained carefully for 16 weeks under a physiotherapist's guidance, chose the Lemosho 8-day route for maximum acclimatization time, and reached the summit. He told our team: \"Age is just a number. Preparation is everything.\"",
    route: "Lemosho 8-Day",
    routeSlug: "8-days-lemosho-route",
  },
];

const faqs = [
  {
    question: "Do I need climbing experience to climb Kilimanjaro?",
    answer:
      "No. Kilimanjaro requires zero mountaineering or rock climbing experience. There are no ropes, harnesses, crampons, or technical gear involved. The entire trek follows established walking trails. Previous hiking experience is helpful but not essential — many first-time hikers summit successfully every year with proper preparation.",
  },
  {
    question: "What is the easiest route up Kilimanjaro for beginners?",
    answer:
      "The Marangu Route has the gentlest terrain and hut accommodation, making it the easiest physically. However, we recommend the Lemosho 8-day route for beginners because the extra acclimatization days dramatically increase your summit success rate (90-95% vs 70% on Marangu). The 'easiest' route is the one that gives you the best chance of reaching the top.",
  },
  {
    question: "Can I climb Kilimanjaro with no training?",
    answer:
      "Technically possible, but strongly inadvisable. Climbers who don't train have significantly lower summit success rates and much higher rates of altitude sickness, injury, and an overall miserable experience. We recommend a minimum of 8-12 weeks of cardiovascular training, regular hiking, and leg strengthening exercises. The fitter you are, the more you'll enjoy the trek.",
  },
  {
    question: "What age can you climb Kilimanjaro?",
    answer:
      "The minimum age set by Kilimanjaro National Park is 10 years old. There is no official maximum age — climbers in their 70s and 80s have summited successfully. Fitness and preparation matter far more than age. Our oldest successful summiteer was 74 years old. We recommend anyone over 60 get a thorough medical check and follow a structured training program.",
  },
  {
    question: "Is Kilimanjaro dangerous for beginners?",
    answer:
      "Kilimanjaro is not inherently dangerous when climbed with a reputable, licensed operator. The main risk is altitude sickness, which is manageable with proper acclimatization (choosing a 7+ day route), hydration, and experienced guides who monitor your health. Fatalities are extremely rare — approximately 3-7 per year out of 35,000+ climbers. Our guides carry pulse oximeters and are Wilderness First Responder certified.",
  },
  {
    question: "How fit do you need to be to climb Kilimanjaro?",
    answer:
      "You need to be able to walk 6-8 hours per day with a daypack for multiple consecutive days. You should be able to climb stairs for 30 minutes without stopping. You don't need to be an athlete — regular walkers, casual joggers, and gym-goers can do Kilimanjaro with 2-3 months of focused training. The key benchmarks: brisk walking for 2 hours, hiking with a pack for 4-6 hours, and basic cardiovascular fitness.",
  },
  {
    question: "Do I need to hire a guide to climb Kilimanjaro?",
    answer:
      "Yes — it is a legal requirement. Kilimanjaro National Park regulations mandate that all climbers must be accompanied by a licensed guide. You cannot attempt the mountain independently. This is actually an advantage for beginners: your guide team handles navigation, camp setup, cooking, and health monitoring, allowing you to focus entirely on the trek.",
  },
  {
    question: "What is the success rate for first-time climbers on Kilimanjaro?",
    answer:
      "The overall mountain-wide success rate is approximately 65%, but this average is skewed by short 5-day routes with very low success rates. First-time climbers on 7+ day routes with experienced operators typically achieve 85-95% summit success. With Snow Africa Adventure on an 8-day Lemosho route, first-time climbers have a 95% success rate. The key factors are route length, acclimatization, and guide experience.",
  },
];

const relatedGuides = [
  {
    href: "/climbing-kilimanjaro/",
    icon: Mountain,
    title: "Complete Kilimanjaro Guide",
    subtitle: "Everything you need to know",
  },
  {
    href: "/best-route-to-climb-kilimanjaro/",
    icon: Star,
    title: "Best Route Comparison",
    subtitle: "All 7 routes side-by-side",
  },
  {
    href: "/how-hard-is-kilimanjaro/",
    icon: TrendingUp,
    title: "How Hard is Kilimanjaro?",
    subtitle: "Honest difficulty assessment",
  },
  {
    href: "/kilimanjaro-training-plan/",
    icon: Heart,
    title: "Training Plan",
    subtitle: "12-week preparation guide",
  },
  {
    href: "/kilimanjaro-altitude-sickness/",
    icon: Shield,
    title: "Altitude Sickness Guide",
    subtitle: "Prevention & treatment",
  },
  {
    href: "/kilimanjaro-group-climbs/",
    icon: Users,
    title: "Group Climbs Guide",
    subtitle: "Join a group & save 15–30%",
  },
];

export default function CanBeginnersClimbKilimanjaroPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Can Beginners Climb Kilimanjaro?" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            {
              name: "Can Beginners Climb Kilimanjaro?",
              url: "/can-beginners-climb-kilimanjaro/",
            },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Can Beginners Climb Kilimanjaro? Yes — Here's How",
            description:
              "Yes, beginners climb Kilimanjaro every year. No mountaineering experience needed. Choose a 7+ day route, train for 3 months, and use an experienced operator.",
            url: "/can-beginners-climb-kilimanjaro/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-03-04",
            modifiedTime: "2026-03-04",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Group of beginner trekkers celebrating on Kilimanjaro"
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
              Beginner&apos;s Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Can Beginners Climb{" "}
              <span className="text-[var(--secondary)]">Kilimanjaro</span>?
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              The answer from a team with 500+ summits: absolutely yes. Here&apos;s
              everything a first-timer needs to know — the honest truth, the best
              routes, and how to prepare.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer / Featured Snippet Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">
                The Short Answer: Yes
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                <strong>
                  Yes — Kilimanjaro is not a technical climb. No ropes, no
                  mountaineering skills needed.
                </strong>{" "}
                About 65% of beginners who choose proper routes summit
                successfully. Kilimanjaro is the highest mountain in Africa
                (5,895m) and one of the few ultra-high-altitude peaks in the world
                that requires zero climbing experience. Thousands of first-time
                trekkers reach the summit every year. The keys to success: choose a{" "}
                <strong>7+ day route</strong>, train for{" "}
                <strong>2-3 months</strong>, and climb with an{" "}
                <strong>experienced, licensed operator</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Kilimanjaro Beginner-Friendly */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Makes Kilimanjaro Beginner-Friendly
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Unlike Everest, K2, or Denali, Kilimanjaro doesn&apos;t require any
              mountaineering skills. See our full{" "}
              <Link href="/kilimanjaro-vs-everest/" className="text-[var(--secondary)] font-semibold hover:underline">Kilimanjaro vs Everest comparison</Link>{" "}
              for a detailed breakdown. Here&apos;s why it&apos;s the world&apos;s most
              accessible high-altitude summit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {beginnerFriendlyReasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-[var(--secondary)]" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Beginners Should Know */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Beginners Should Know
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro is achievable for beginners, but it&apos;s not easy. Here
              are the real challenges — and being honest about them is how you
              prepare to overcome them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {difficultyFactors.map((factor) => (
              <div
                key={factor.title}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center">
                    <factor.icon className="w-6 h-6 text-[var(--secondary)]" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${factor.severityColor}`}
                  >
                    {factor.severity}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">
                  {factor.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Routes for Beginners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Best Routes for Beginners
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Not all routes are equal for first-timers. These three offer the best
              balance of acclimatization, safety, and summit success for beginners.
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {beginnerRoutes.map((route) => (
              <div
                key={route.slug}
                className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="flex items-center justify-between bg-[var(--surface)] px-6 py-4 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-xl font-bold">
                        {route.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${route.recommendationColor}`}
                      >
                        {route.recommendation}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[var(--text-muted)]">
                      <span>{route.days} days</span>
                      <span>Success rate: {route.successRate}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${route.difficultyColor}`}
                      >
                        {route.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--text-muted)] leading-relaxed mb-5">
                    {route.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold text-sm text-emerald-700 mb-2">
                        Pros
                      </p>
                      <ul className="space-y-2">
                        {route.pros.map((pro) => (
                          <li
                            key={pro}
                            className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                          >
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-amber-700 mb-2">
                        Considerations
                      </p>
                      <ul className="space-y-2">
                        {route.cons.map((con) => (
                          <li
                            key={con}
                            className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={`/trekking/${route.slug}/`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
                    >
                      View full {route.name.split(" (")[0]} itinerary
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link
              href="/best-route-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              Compare all 7 Kilimanjaro routes side-by-side →
            </Link>
          </p>
        </div>
      </section>

      {/* 3-Month Beginner Training Plan */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[var(--secondary)]/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">
                  3-Month Beginner Training Plan
                </h2>
                <p className="text-white/60 text-sm">
                  Start training 12 weeks before your trek date
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-[var(--secondary)] text-sm font-bold mb-2">
                  Weeks 1-4: Build Base
                </p>
                <h3 className="font-semibold text-lg mb-3">Foundation Phase</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Walk 30-45 minutes, 4-5 days per week</li>
                  <li>Gradually add elevation gain (stairs, hills)</li>
                  <li>Begin bodyweight leg exercises (squats, lunges)</li>
                  <li>Core strengthening 2-3 times per week</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-[var(--secondary)] text-sm font-bold mb-2">
                  Weeks 5-8: Build Endurance
                </p>
                <h3 className="font-semibold text-lg mb-3">Endurance Phase</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Weekend hikes of 3-5 hours with a daypack</li>
                  <li>Add pack weight gradually (start at 5kg)</li>
                  <li>Stair climbing sessions: 30-45 minutes</li>
                  <li>Cardio: jogging, cycling, or swimming 3x/week</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-[var(--secondary)] text-sm font-bold mb-2">
                  Weeks 9-12: Peak Training
                </p>
                <h3 className="font-semibold text-lg mb-3">Peak Phase</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Back-to-back hiking days (Saturday + Sunday)</li>
                  <li>One long hike per week (5-8 hours)</li>
                  <li>Practice walking in your actual trekking gear</li>
                  <li>Taper in final week — rest, hydrate, prepare</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/kilimanjaro-training-plan/"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                Read the Full Training Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Checklist */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Beginner&apos;s Kilimanjaro Checklist
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Follow this 10-point checklist and you&apos;ll be prepared for summit
              day. Every successful beginner on our team has ticked these boxes.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {checklist.map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-4 bg-[var(--surface)] rounded-xl p-5"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-emerald-700">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real Beginner Success Stories */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Real Beginner Success Stories
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              These climbers had zero mountaineering experience before
              Kilimanjaro. Their stories prove that preparation, not experience,
              determines summit success.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {successStories.map((story) => (
              <div
                key={story.name}
                className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm"
              >
                <Quote className="w-8 h-8 text-[var(--secondary)] mb-4 opacity-40" />
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold">
                    {story.name}, {story.age}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {story.background}
                  </p>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {story.story}
                </p>
                <div className="pt-4 border-t border-[var(--border)]">
                  <Link
                    href={`/trekking/${story.routeSlug}/`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] hover:underline"
                  >
                    <Mountain className="w-4 h-4" />
                    {story.route}
                  </Link>
                </div>
              </div>
            ))}
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
                <details
                  key={i}
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

      {/* Related Guides */}
      <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {guide.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Your First Summit Starts Here
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Thousands of beginners have stood on Uhuru Peak with our team. With the
            right route, proper preparation, and our experienced guides, you can
            too. Our 95% summit success rate on the Lemosho route speaks for
            itself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Explore Beginner-Friendly Routes
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
