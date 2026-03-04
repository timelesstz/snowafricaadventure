import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Star,
  ChevronDown,
  Check,
  Calendar,
  Users,
  Shield,
  Compass,
  Zap,
  Clock,
  TrendingUp,
  Wind,
} from "lucide-react";
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema, generateItemListSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = genMeta({
  title: "Climbing Kilimanjaro Guide 2026",
  description:
    "Everything you need to know about climbing Kilimanjaro: 6 routes, training tips, gear requirements, best seasons, success rates, and costs. Plan your Kilimanjaro climb with Snow Africa Adventure — 93% summit success rate.",
  url: "/climbing-kilimanjaro/",
});

const quickFacts = [
  { label: "Height", value: "5,895m", sublabel: "19,341 feet above sea level" },
  { label: "Location", value: "Tanzania", sublabel: "Kilimanjaro National Park" },
  { label: "Routes", value: "6 Main", sublabel: "Ranging from 5 to 9 days" },
  { label: "Skill Required", value: "None", sublabel: "No technical climbing" },
  { label: "Best Season", value: "Jun–Oct", sublabel: "Also Jan–Feb" },
];

const whyClimb = [
  {
    icon: Mountain,
    title: "World's Highest Free-Standing Mountain",
    description:
      "Kilimanjaro rises dramatically from the African plains with no mountain range supporting it — a solitary giant. Standing at the summit means standing on the roof of Africa.",
  },
  {
    icon: Users,
    title: "Accessible to Fit Hikers",
    description:
      "Unlike Everest or Denali, Kilimanjaro requires no technical climbing skills, ropes, or harnesses. Any fit, determined person can attempt the summit with proper preparation.",
  },
  {
    icon: Compass,
    title: "Five Distinct Ecosystems",
    description:
      "In 5-9 days you walk through rainforest, heath and moorland, alpine desert, and arctic glacier — experiencing more climate zones than almost any other trek on Earth.",
  },
  {
    icon: Zap,
    title: "Life-Defining Achievement",
    description:
      "Reaching Uhuru Peak is one of the great personal achievements available to travellers. The sunrise from the summit, above the clouds, over the African continent, is unforgettable.",
  },
];

const routes = [
  { name: "Marangu", slug: "6-days-marangu-route", days: "5-6 days", difficulty: "Moderate", successRate: "65-80%", price: "From $1,850", notes: "Hut accommodation. Only route with dormitory-style huts. Called the 'Coca-Cola route'." },
  { name: "Machame", slug: "7-days-machame-route", days: "6-7 days", difficulty: "Challenging", successRate: "80-90%", price: "From $2,100", notes: "Most scenic route. 'Whiskey route.' Ridge walks and lava tower acclimatization.", featured: true },
  { name: "Rongai", slug: "6-days-rongai-route", days: "6-7 days", difficulty: "Moderate", successRate: "85-90%", price: "From $2,200", notes: "Approaches from the north. Drier, quieter, good for the dry season." },
  { name: "Lemosho", slug: "8-days-lemosho-route", days: "7-8 days", difficulty: "Mod–Challenging", successRate: "90-95%", price: "From $2,500", notes: "Best acclimatization profile. Joins Machame high route. Recommended for most climbers.", featured: true },
  { name: "Umbwe", slug: "6-days-umbwe-route", days: "6-7 days", difficulty: "Very Challenging", successRate: "70-80%", price: "From $2,200", notes: "Steepest, shortest route. Very fast ascent — not recommended for first-timers." },
  { name: "Northern Circuit", slug: "7-days-machame-route", days: "9 days", difficulty: "Moderate", successRate: "90-95%", price: "From $3,200", notes: "Longest route, best acclimatization. Traverses the entire mountain. Most scenic." },
];

const dayByDay = [
  { day: "Day 1", title: "Gate to Forest Camp", altitude: "1,640m → 2,800m", description: "Drive from Arusha to the Lemosho Glades trailhead. Enter the montane rainforest and trek 4-5 hours to Big Tree Camp. Giant heather, colobus monkeys, and lush green surrounds." },
  { day: "Day 2", title: "Forest Camp to Shira Camp", altitude: "2,800m → 3,840m", description: "Climb through heath and moorland onto the Shira Plateau. Wide open landscapes with Kilimanjaro's glaciers visible ahead. 5-6 hours walking." },
  { day: "Day 3", title: "Acclimatization Day", altitude: "3,840m → 4,600m (return to 3,840m)", description: "Hike high to the Lava Tower at 4,600m for acclimatization, then descend to Barranco Camp at 3,900m. This 'climb high, sleep low' profile significantly increases summit success rates." },
  { day: "Day 4", title: "Barranco Wall & Karanga Camp", altitude: "3,900m → 4,035m", description: "The famous Barranco Wall — a scramble up a near-vertical cliff face that looks impossible from below. It takes 1-2 hours and requires hands and feet but no ropes. One of the trek's highlights." },
  { day: "Day 5", title: "Karanga to Base Camp", altitude: "4,035m → 4,700m", description: "Ascend the alpine desert to Barafu Base Camp. Rest in the afternoon in preparation for the midnight summit push. Temperature drops sharply." },
  { day: "Day 6", title: "Summit Night & Descent", altitude: "4,700m → 5,895m → 3,100m", description: "Depart at midnight for the 5-7 hour summit push in cold, dark, and thin air. Reach Stella Point (5,756m) at dawn, then Uhuru Peak (5,895m) at sunrise. Descend all the way to Millennium Camp for the night." },
  { day: "Day 7", title: "Descent to Gate", altitude: "3,100m → 1,640m", description: "Final descent through the rainforest to the Mweka Gate. Certificate presentation, farewell to your guides and porters, and transfer back to Arusha." },
];

const kilimanjaroFaqs = [
  {
    question: "Is climbing Kilimanjaro difficult?",
    answer:
      "Kilimanjaro is a challenging high-altitude trek, but it is not technical climbing — there are no ropes, harnesses, or vertical ice faces. The main challenges are altitude sickness, cold temperatures (especially at summit night), and the mental determination required during the long summit push in the early hours. Most fit, healthy adults can attempt Kilimanjaro with proper preparation. Routes with more acclimatization days like the 8-day Lemosho Route have the highest success rates at 95%.",
  },
  {
    question: "Do you need special equipment to climb Kilimanjaro?",
    answer:
      "You do not need ropes, harnesses, or technical climbing gear. You do need good waterproof hiking boots (broken in before the trip), warm layering systems (temperatures at the summit can drop to -20°C at night), trekking poles (highly recommended), a sleeping bag rated to -10°C or below, and sun protection. A detailed packing list is provided when you book.",
  },
  {
    question: "What is the success rate for climbing Kilimanjaro?",
    answer:
      "Success rates vary significantly by route and duration. The Marangu 5-day route has the lowest rates at around 65% due to insufficient acclimatization time. Longer routes like Lemosho (7-8 days) and the Northern Circuit (9 days) achieve 90-95% success rates. Snow Africa Adventure's overall summit success rate is 93%, well above the industry average of around 65%.",
  },
  {
    question: "How fit do you need to be to climb Kilimanjaro?",
    answer:
      "You should be able to hike comfortably for 6-8 hours with a daypack before attempting Kilimanjaro. A 3-month training programme should include 3-4 cardio sessions per week (running, cycling, swimming), regular hiking on varied terrain, and some stair or hill work for leg strength. You do not need to be an athlete — but the fitter you are, the more you will enjoy the experience.",
  },
  {
    question: "Can older adults climb Kilimanjaro?",
    answer:
      "Many people in their 60s and 70s successfully summit Kilimanjaro. Age matters far less than fitness, determination, and proper preparation. The oldest person to summit was in their 80s. The key is giving yourself enough time on the mountain (choose a 7+ day route) and listening to your body and guides on the way up.",
  },
  {
    question: "What is the Kilimanjaro altitude sickness risk?",
    answer:
      "Altitude sickness (Acute Mountain Sickness, AMS) affects many climbers on Kilimanjaro. Mild symptoms — headache, nausea, and fatigue — are very common above 3,500m. The best prevention is slow ascent with good acclimatization days built into your route. Our guides carry supplemental oxygen and a pulse oximeter on every climb and monitor each climber daily. Serious AMS requiring descent is rare on our longer routes.",
  },
  {
    question: "Which is the best route to climb Kilimanjaro?",
    answer:
      "The best route depends on your priorities. The Lemosho Route (8 days) offers the best balance of scenery, acclimatization, and success rate (95%). The Machame Route (7 days) is the most popular for its dramatic scenery. The Northern Circuit (9 days) has the highest success rate with the best acclimatization. For budget-conscious climbers, the Marangu Route (5-6 days) is the most affordable with hut accommodation.",
  },
  {
    question: "How much does it cost to climb Kilimanjaro?",
    answer:
      "Kilimanjaro climbing costs range from $1,850 to $3,200+ per person depending on route, duration, and group size. This includes park fees ($70/day + $60 camping/night), guides, porters, all meals, camping equipment, emergency oxygen, and airport transfers. Solo travellers pay more than groups. The 8-day Lemosho Route starts at $2,500 per person for group climbs.",
  },
  {
    question: "What is the best time of year to climb Kilimanjaro?",
    answer:
      "The best months are June to October (dry season, clearest skies, coldest nights) and January to mid-March (short dry season, less crowded, warmer). Avoid April-May (heavy rain) and November (short rains). Full moon summit nights in the dry season are especially magical — climbers can often summit by moonlight without headlamps.",
  },
  {
    question: "Can beginners climb Kilimanjaro?",
    answer:
      "Yes. Kilimanjaro requires no technical climbing skills — no ropes, harnesses, or ice climbing. The biggest challenge is altitude, not technical difficulty. Beginners should choose a longer route (7-8 days) for better acclimatization, start a fitness training programme 2-3 months before the trek, and hire an experienced local operator with certified guides.",
  },
  {
    question: "What should I pack for Kilimanjaro?",
    answer:
      "Essential items include waterproof hiking boots (broken in), layered clothing for -20°C to +30°C, a 4-season sleeping bag rated to -10°C, trekking poles, headlamp with spare batteries, sunscreen and sunglasses, a 3-litre water bladder or bottles, and altitude medication (Diamox) as prescribed by your doctor. We provide a detailed packing list when you book.",
  },
  {
    question: "Do I need travel insurance for Kilimanjaro?",
    answer:
      "Yes, comprehensive travel insurance covering high-altitude trekking up to 6,000m is mandatory. Your policy should include emergency evacuation and repatriation, trip cancellation, medical expenses, and helicopter rescue coverage. Many standard travel insurance policies exclude altitude above 3,000m — you need a specialist adventure policy.",
  },
  {
    question: "How do I get to Kilimanjaro?",
    answer:
      "Fly into Kilimanjaro International Airport (JRO), located between Arusha and Moshi. Major airlines connecting through Nairobi, Addis Ababa, or Dar es Salaam serve JRO. We arrange airport pickup and transfer to your pre-climb hotel in Arusha or Moshi, included in all our packages. A Tanzania tourist visa ($50 USD) can be obtained on arrival or online in advance.",
  },
  {
    question: "What is the summit success rate for Snow Africa Adventure?",
    answer:
      "Our overall summit success rate is 93%, significantly above the mountain-wide average of approximately 65%. This higher rate is due to our experienced KINAPA-certified guides, strict acclimatization protocols, daily health monitoring with pulse oximeters, and our recommendation of 7+ day routes. The 8-day Lemosho and 9-day Northern Circuit routes achieve 95%+ success rates with our teams.",
  },
];

export default async function ClimbingKilimanjaroPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
          ]),
          generateFAQSchema(kilimanjaroFaqs),
          generateArticleSchema({
            title: "Climbing Kilimanjaro: Complete Guide to Routes, Costs & Training",
            description: "Everything you need to know about climbing Kilimanjaro: 6 routes, training tips, gear requirements, best seasons, success rates, and costs.",
            url: "/climbing-kilimanjaro/",
            image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2024-07-15",
            modifiedTime: "2026-03-01",
            author: "Emmanuel Moshi",
            authorRole: "Founder & Lead Guide",
            authorCredentials: ["200+ Kilimanjaro Summits", "15+ Years Guiding Experience", "TATO Licensed Guide", "Wilderness First Responder"],
          }),
          generateItemListSchema(routes.map((route, i) => ({
            name: route.name,
            url: `/trekking/${route.slug}/`,
            description: route.notes,
            position: i + 1,
          }))),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Climbing Kilimanjaro - Trekkers on Africa's Highest Peak"
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
                Kilimanjaro Treks
              </span>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm">93% Summit Success &bull; KINAPA Certified</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Climbing Kilimanjaro
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Africa&apos;s Highest Peak — 5,895m — No Technical Skill Required
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: TrendingUp, value: "93%", label: "Success Rate" },
                { icon: Compass, value: "6", label: "Routes" },
                { icon: Calendar, value: "5-9", label: "Days" },
                { icon: Mountain, value: "500+", label: "Summits Guided" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-white">
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
                View All Routes
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

      {/* Quick Facts */}
      <section className="py-12 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-widest mb-1">{fact.label}</p>
                <p className="text-2xl font-bold mb-0.5">{fact.value}</p>
                <p className="text-xs text-white/60">{fact.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Climb Kilimanjaro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            The Experience
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Why Climb Kilimanjaro?
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Kilimanjaro is one of the world&apos;s great trekking experiences — and one of the few places on Earth where you can reach a 5,895m summit without technical mountaineering skills.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyClimb.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes Table */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            All 6 Routes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Kilimanjaro Route
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            Each route offers a different experience — from scenic ridges to remote wilderness. Choose based on your timeline, budget, and fitness level.
          </p>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Route</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Duration</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Difficulty</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Success Rate</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Price From</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, i) => (
                  <tr
                    key={route.name}
                    className={`border-t border-[var(--border)] ${
                      route.featured ? "bg-amber-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/trekking/${route.slug}/`} className="font-semibold text-[var(--primary)] hover:text-[var(--secondary-dark)] hover:underline transition-colors">
                          {route.name}
                        </Link>
                        {route.featured && (
                          <span className="px-2 py-0.5 bg-[var(--secondary)] text-white text-xs rounded-full font-semibold">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xs">{route.notes}</p>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">{route.days}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          route.difficulty === "Very Challenging"
                            ? "bg-red-100 text-red-700"
                            : route.difficulty === "Challenging" || route.difficulty === "Mod–Challenging"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {route.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: route.successRate.split("-")[1] || route.successRate.replace("%", "") }}
                          />
                        </div>
                        <span className="text-sm font-medium text-emerald-700">{route.successRate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-[var(--secondary-dark)]">{route.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            Prices are per person based on 2 people. Solo travellers and groups of 4+ have different rates.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              See Detailed Route Pages
            </Link>
          </div>
        </div>
      </section>

      {/* Training & Fitness */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                  Preparation
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Training &amp; Fitness
                </h2>
                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                  Kilimanjaro does not require technical mountaineering skills, but it does demand
                  genuine physical fitness. Most people who fail to summit do so because of
                  insufficient preparation, not lack of ability.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    { phase: "3 Months Out", title: "Base Fitness", tasks: ["3 cardio sessions per week (run, cycle, swim)", "Regular hiking with a loaded daypack", "Build to 15-20km hikes comfortably"] },
                    { phase: "6 Weeks Out", title: "Strength & Endurance", tasks: ["Add leg strength work (squats, lunges)", "Hike on varied terrain with elevation", "Practice using trekking poles"] },
                    { phase: "2 Weeks Out", title: "Taper & Rest", tasks: ["Reduce intensity, maintain fitness", "Finalise gear and packing", "Review acclimatization strategies"] },
                  ].map((phase) => (
                    <div key={phase.phase} className="bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-[var(--primary-dark)] text-white text-xs font-bold rounded-full">{phase.phase}</span>
                        <h3 className="font-semibold">{phase.title}</h3>
                      </div>
                      <ul className="space-y-1">
                        {phase.tasks.map((task) => (
                          <li key={task} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-[var(--primary-dark)] text-white rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wind className="w-6 h-6 text-[var(--secondary)]" />
                    <h3 className="font-semibold text-lg">Altitude Sickness</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    Above 3,000m, reduced oxygen levels cause Acute Mountain Sickness (AMS) in many climbers.
                    Mild symptoms — headache, nausea, fatigue — are very common and manageable. Severe AMS
                    requiring descent is rare on our guided climbs.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Ascend slowly — never rush above 300m per day",
                      "Hydrate constantly (3-4 litres per day)",
                      "Never ascend with unresolved AMS symptoms",
                      "Guides carry oxygen and pulse oximeters",
                      "Acetazolamide (Diamox) available on prescription",
                    ].map((tip) => (
                      <li key={tip} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-800">Best Season to Climb</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-800">June – October</p>
                        <p className="text-amber-700">Dry, clear, cold. Best summit conditions. Peak season — book early.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-800">January – February</p>
                        <p className="text-amber-700">Short dry season. Less crowded than June-October. Good conditions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-800">March – May</p>
                        <p className="text-amber-700">Long rains. Slippery trails, cloudy views. Not recommended.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day by Day */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            Sample Itinerary
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            What to Expect — Day by Day
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            A typical 7-day Lemosho route climb — our most recommended option for first-time climbers.
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            {dayByDay.map((day, i) => (
              <div
                key={day.day}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 text-center shrink-0">
                  <span className="block text-xs font-bold text-[var(--secondary)] uppercase tracking-widest">Day</span>
                  <span className="text-3xl font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{day.title}</h3>
                    <span className="text-xs px-2 py-1 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full">
                      {day.altitude}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{day.description}</p>
                </div>
              </div>
            ))}
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
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {kilimanjaroFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">{faq.answer}</p>
                </div>
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
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With a 93% summit success rate and KINAPA-certified guides, Snow Africa Adventure gives you the
            best possible chance of reaching Uhuru Peak. Browse all 6 routes or join a group departure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              See All Kilimanjaro Routes
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
