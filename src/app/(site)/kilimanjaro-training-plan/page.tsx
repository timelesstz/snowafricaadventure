import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Dumbbell,
  Heart,
  Clock,
  Mountain,
  Calendar,
  Target,
  CheckCircle,
  ArrowRight,
  Footprints,
  Brain,
  Shield,
  AlertTriangle,
  ChevronDown,
  Flame,
  Star,
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
  title: "Kilimanjaro Training Plan: 12-Week Preparation Guide",
  description:
    "12-week Kilimanjaro training plan from guides with 500+ summits. Weekly schedules for hiking, cardio, strength, and mental prep. Works for all fitness levels.",
  url: "/kilimanjaro-training-plan/",
});

const fitnessLevels = [
  {
    level: "Beginner",
    description: "Sedentary or light exercise only",
    color: "bg-blue-600",
    colorLight: "bg-blue-50 border-blue-200 text-blue-700",
    emphasis:
      "Focus heavily on building a walking base in weeks 1-4. Add 4 extra weeks of base conditioning before starting if you cannot walk briskly for 60 minutes. Your Saturday hikes are the most important session each week.",
    adjustments: [
      "Start with 20-minute walks instead of 30-minute jogs",
      "Replace running with brisk walking for the first 6 weeks",
      "Use lighter pack weights (start at 3kg, build to 8kg)",
      "Take an extra rest day per week in Phase 1",
      "Allow 16 weeks total instead of 12",
    ],
  },
  {
    level: "Intermediate",
    description: "Regular exercise 2-3 times per week",
    color: "bg-emerald-600",
    colorLight: "bg-emerald-50 border-emerald-200 text-emerald-700",
    emphasis:
      "The 12-week plan as written is designed for you. Focus on progressive overload — gradually increase hike duration, pack weight, and elevation gain each week. The Saturday long hike is non-negotiable.",
    adjustments: [
      "Follow the plan as written below",
      "Push Saturday hikes to maximum available elevation",
      "Add interval training from week 5 for cardiovascular gains",
      "Practice back-to-back hiking days from week 9",
      "Include stair climbing with a weighted pack twice per week",
    ],
  },
  {
    level: "Advanced",
    description: "Already active and athletic",
    color: "bg-purple-600",
    colorLight: "bg-purple-50 border-purple-200 text-purple-700",
    emphasis:
      "Your cardiovascular base is likely strong. Focus on Kilimanjaro-specific training: long loaded hikes, stair endurance, and mental toughness. Do not skip the plan — fitness does not prevent altitude sickness, and the specific endurance demands are different from most sports.",
    adjustments: [
      "Start Phase 2 intensity from week 1 if your base allows",
      "Push pack weight to 10-12kg by week 8",
      "Add elevation: seek 800m+ gain on Saturday hikes",
      "Include early morning (5 AM) training from week 6",
      "Simulate summit night with an overnight hike in weeks 9-10",
    ],
  },
];

const weeklySchedule = [
  {
    week: 1,
    phase: 1,
    focus: "Base building",
    monday: "30 min brisk walk or light jog",
    tuesday: "Rest or gentle yoga / stretching",
    wednesday: "30 min cycling or swimming",
    thursday: "Bodyweight squats 3x15, lunges 3x12 each leg, calf raises 3x20",
    friday: "30 min brisk walk or light jog",
    saturday: "1-2 hour easy hike (flat terrain, light daypack)",
    sunday: "Rest",
  },
  {
    week: 2,
    phase: 1,
    focus: "Base building",
    monday: "35 min jog at conversational pace",
    tuesday: "Stair climbing 20 min + stretching",
    wednesday: "35 min cycling or swimming",
    thursday: "Squats 3x15, lunges 3x12, step-ups 3x10 each leg, plank 3x30s",
    friday: "35 min jog or brisk walk",
    saturday: "2 hour hike with 5kg daypack",
    sunday: "Rest",
  },
  {
    week: 3,
    phase: 1,
    focus: "Base building",
    monday: "40 min jog at conversational pace",
    tuesday: "Stair climbing 25 min + core work",
    wednesday: "40 min cycling, swimming, or elliptical",
    thursday: "Squats 3x15, lunges 3x15, step-ups 3x12, wall sits 3x45s",
    friday: "40 min jog or brisk walk",
    saturday: "2.5 hour hike with 5-7kg daypack, include some hills",
    sunday: "Rest or 30 min recovery walk",
  },
  {
    week: 4,
    phase: 1,
    focus: "Base building",
    monday: "40 min jog at conversational pace",
    tuesday: "Stair climbing 30 min + stretching",
    wednesday: "40 min cross-training (cycling, swimming, or rowing)",
    thursday:
      "Squats 4x15, lunges 3x15, step-ups 3x12, calf raises 3x25, plank 3x45s",
    friday: "40 min jog",
    saturday: "3 hour hike with 7kg daypack on hilly terrain",
    sunday: "Rest",
  },
  {
    week: 5,
    phase: 2,
    focus: "Build intensity",
    monday: "45 min run (include 5 x 1 min faster efforts)",
    tuesday: "Stair climbing 30 min with 5kg pack",
    wednesday: "45 min cycling with hill intervals",
    thursday:
      "Weighted squats 4x12, walking lunges 3x15, step-ups with pack 3x12, deadlifts 3x10",
    friday: "45 min jog at steady pace",
    saturday: "4 hour hike with 8kg pack, include 500m+ elevation gain",
    sunday: "Rest or 30 min recovery walk",
  },
  {
    week: 6,
    phase: 2,
    focus: "Build intensity",
    monday: "45 min run with hill repeats (6 x 2 min uphill)",
    tuesday: "Stair climbing 35 min with pack + core work",
    wednesday: "45 min cross-training",
    thursday:
      "Weighted squats 4x12, Bulgarian split squats 3x10, step-ups with pack 3x15, calf raises 4x20",
    friday: "45 min run",
    saturday: "5 hour hike (15km+) with 8kg pack",
    sunday: "Rest",
  },
  {
    week: 7,
    phase: 2,
    focus: "Build intensity",
    monday: "50 min run with intervals",
    tuesday: "Stair climbing 40 min with 7kg pack",
    wednesday: "50 min cycling or swimming",
    thursday:
      "Full leg circuit: squats, lunges, step-ups, calf raises, wall sits (4 rounds)",
    friday: "50 min run at steady pace",
    saturday: "6 hour hike (18km+) with 8-10kg pack, hilly terrain",
    sunday: "Rest or 30 min gentle walk",
  },
  {
    week: 8,
    phase: 2,
    focus: "Build intensity",
    monday: "50 min run with hill repeats",
    tuesday: "Stair climbing 40 min with 8kg pack + core",
    wednesday: "50 min cross-training",
    thursday:
      "Heavy leg day: weighted squats 4x10, walking lunges 4x15, box step-ups 4x12, deadlifts 3x10",
    friday: "50 min run",
    saturday:
      "6-7 hour hike (20km) with 10kg pack, maximum elevation gain available",
    sunday: "Rest",
  },
  {
    week: 9,
    phase: 3,
    focus: "Peak training",
    monday: "50 min run with intervals",
    tuesday: "Stair climbing 45 min with 8kg pack",
    wednesday: "50 min cross-training",
    thursday: "Full leg and core circuit (4 rounds, heavier weights)",
    friday: "50 min run",
    saturday:
      "7-8 hour hike with full daypack weight (10kg), back-to-back with Sunday",
    sunday: "4-5 hour hike (simulate consecutive trekking days)",
  },
  {
    week: 10,
    phase: 3,
    focus: "Peak training",
    monday: "50 min run",
    tuesday: "Early morning stair session (5 AM start) with pack, 45 min",
    wednesday: "50 min cross-training",
    thursday:
      "Leg circuit with pack: weighted step-ups, lunges, squats (4 rounds)",
    friday: "50 min run with final hill repeats",
    saturday:
      "Longest hike: 8+ hours with 10kg pack, back-to-back with Sunday",
    sunday: "5-6 hour hike (simulate summit recovery day)",
  },
  {
    week: 11,
    phase: 3,
    focus: "Taper begins",
    monday: "40 min easy run",
    tuesday: "Stair climbing 30 min with light pack",
    wednesday: "40 min easy cycling or swimming",
    thursday:
      "Light leg session: bodyweight squats 3x15, lunges 3x12, stretching",
    friday: "40 min easy jog",
    saturday: "4-5 hour moderate hike with 7kg pack",
    sunday: "Rest",
  },
  {
    week: 12,
    phase: 3,
    focus: "Taper and rest",
    monday: "30 min easy walk or light jog",
    tuesday: "Gentle yoga or stretching (30 min)",
    wednesday: "30 min easy walk",
    thursday: "Light stretching and mobility work",
    friday: "20 min easy walk",
    saturday: "1-2 hour gentle walk (stay active, keep legs moving)",
    sunday: "Rest — ready for Kilimanjaro",
  },
];

const keyExercises = [
  {
    icon: Footprints,
    name: "Hiking with Weighted Pack",
    color: "bg-emerald-100 text-emerald-700",
    why: "The single most specific exercise for Kilimanjaro. Nothing replicates the sustained effort of trekking with a daypack better than actually doing it.",
    how: "Start with 5kg and build to 10kg over 12 weeks. Increase distance from 2 hours to 7-8 hours. Choose hilly terrain whenever possible. Wear the same boots you will use on the mountain.",
  },
  {
    icon: TrendingUp,
    name: "Stair Climbing with Pack",
    color: "bg-blue-100 text-blue-700",
    why: "Mimics the repetitive uphill movement of summit night and high-altitude trekking. Builds the specific quad and calf endurance you need for the 1,200m summit ascent.",
    how: "Use a staircase, stadium steps, or a stair machine. Add a weighted pack from week 5. Aim for 30-45 minutes continuously. For summit prep, try a 5 AM stair session to simulate early morning exertion.",
  },
  {
    icon: Dumbbell,
    name: "Squats and Lunges",
    color: "bg-amber-100 text-amber-700",
    why: "Your quads, glutes, and calves do the heavy lifting on Kilimanjaro — particularly during the Barranco Wall scramble and the long summit night ascent through loose scree.",
    how: "Start bodyweight, progress to weighted. Squats 3-4x12-15, walking lunges 3x15 each leg, Bulgarian split squats 3x10 each leg. Add a weighted pack for step-ups from week 5.",
  },
  {
    icon: Heart,
    name: "Running or Cycling (Cardio Base)",
    color: "bg-rose-100 text-rose-700",
    why: "Builds the aerobic base that allows your body to operate efficiently when oxygen is limited at altitude. Stronger cardiovascular fitness means your body copes better above 4,000m.",
    how: "Run 3-4 times per week at a conversational pace (you should be able to talk while running). Include one interval session per week from week 5. Cycling and swimming are excellent low-impact alternatives.",
  },
  {
    icon: Flame,
    name: "Core Strength (Planks, Dead Bugs)",
    color: "bg-purple-100 text-purple-700",
    why: "A strong core stabilises your body over uneven terrain and reduces lower back fatigue when carrying a pack for hours. Core endurance prevents the posture collapse that causes pain on long trekking days.",
    how: "Planks (front and side) 3x30-60s, dead bugs 3x10 each side, bird dogs 3x10 each side, bicycle crunches 3x20. Perform 2-3 times per week after strength sessions.",
  },
  {
    icon: Mountain,
    name: "Incline Treadmill Walking",
    color: "bg-teal-100 text-teal-700",
    why: "When you cannot access hills or trails, a treadmill at 10-15% incline with a weighted pack is the best indoor substitute for uphill hiking. Excellent for building calf and glute endurance.",
    how: "Set the treadmill to 10-15% gradient at a slow pace (4-5 km/h). Walk for 30-60 minutes. Add a daypack from week 3. This is not about speed — it is about sustained uphill effort at a pace you can maintain for hours.",
  },
  {
    icon: Target,
    name: "Step-Ups with Weighted Pack",
    color: "bg-orange-100 text-orange-700",
    why: "Targets the single-leg strength needed for stepping up over rocks, roots, and uneven terrain. The Barranco Wall and summit scree both demand strong, stable single-leg push.",
    how: "Use a sturdy bench or step (40-50cm high). Step up and down alternating legs. Start bodyweight 3x10 each leg, progress to 4x12 with a 5-10kg pack. Control the descent — eccentric strength matters for downhill hiking.",
  },
];

const faqs = [
  {
    question: "How long should I train for Kilimanjaro?",
    answer:
      "You need a minimum of 8-12 weeks of dedicated training before climbing Kilimanjaro. The 12-week plan above is designed for someone with a moderate baseline fitness level. If you are starting from a sedentary base, allow 16 weeks by adding 4 weeks of gentle base conditioning (walking, light cycling, bodyweight exercises) before starting the plan. The fitter you are before you start training, the more you will enjoy the trek itself.",
  },
  {
    question: "Can I climb Kilimanjaro without training?",
    answer:
      "Technically, you can attempt it — but your summit chances drop dramatically, and you are far more likely to suffer injury, exhaustion, and severe altitude sickness. Trained climbers have a 15-20% higher summit success rate than untrained climbers. Without preparation, summit night (12-15 hours of continuous effort at -15 to -20 degrees C with 50% oxygen) will be overwhelming. Our guides with 500+ summits strongly recommend training for every climber.",
  },
  {
    question: "What exercises are best for Kilimanjaro training?",
    answer:
      "Hiking with a weighted backpack is the single best exercise — it replicates the exact demands of the trek. Complement this with stair climbing (for sustained uphill endurance), running or cycling (for cardiovascular base), squats and lunges (for leg strength), and planks (for core stability under a pack). See the key exercises section above for detailed instructions on each.",
  },
  {
    question: "Do I need to run to train for Kilimanjaro?",
    answer:
      "No, you do not need to run. Running is an efficient way to build cardiovascular fitness, but brisk walking, cycling, swimming, rowing, and using an elliptical are equally effective alternatives. The key is sustained cardiovascular effort at a conversational pace for 30-50 minutes, 3-4 times per week. What you cannot skip is the weekly long hike with a weighted pack — that is the most Kilimanjaro-specific training you can do.",
  },
  {
    question: "How do I train for altitude at sea level?",
    answer:
      "Most successful Kilimanjaro climbers train entirely at sea level. Focus on building cardiovascular fitness so your body uses oxygen efficiently. Stair climbing with a weighted pack and incline treadmill walking are the best altitude-specific exercises at sea level. Choosing a longer route (7-8 days) with proper acclimatization days is far more important than pre-climb altitude exposure. Altitude tents exist but are not necessary.",
  },
  {
    question: "Should I do practice hikes before Kilimanjaro?",
    answer:
      "Absolutely — practice hikes are the most important part of your training. Start with short, flat hikes and progressively build to full-day hikes (6-8 hours) with a 10kg daypack on hilly terrain. In weeks 9-10, do back-to-back hiking days to simulate consecutive trekking days on the mountain. These long hikes also serve as gear testing opportunities: break in your boots, test your layering system, and practice with trekking poles.",
  },
  {
    question: "How much should I walk per day in training?",
    answer:
      "During Phase 1 (weeks 1-4), aim for 30-40 minutes of cardio on training days plus one 1-3 hour hike per week. During Phase 2 (weeks 5-8), increase to 45-50 minutes of cardio with 5-7 hour Saturday hikes. During Phase 3 (weeks 9-10), your peak weeks include 50 minutes of daily cardio and 7-8 hour hikes on weekends. The total weekly activity builds from roughly 4 hours in week 1 to 12+ hours in week 10.",
  },
  {
    question: "Can I train at the gym instead of hiking?",
    answer:
      "The gym is an excellent complement to outdoor hiking but cannot fully replace it. Use the stair machine or treadmill at maximum incline for sustained uphill simulation. Leg press, squats, lunges, and calf raises build lower body strength. Core work (planks, dead bugs) improves stability under a pack. However, you should still do at least one long outdoor hike per week — the uneven terrain, weather exposure, and mental endurance of real hiking cannot be replicated indoors.",
  },
];

export default function KilimanjaroTrainingPlanPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Training Plan" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Training Plan", url: "/kilimanjaro-training-plan/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Training Plan: 12-Week Preparation Guide",
            description:
              "12-week Kilimanjaro training plan from guides with 500+ summits. Weekly schedules for hiking, cardio, strength, and mental prep. Works for all fitness levels.",
            url: "/kilimanjaro-training-plan/",
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
            alt="Trekkers training on the slopes of Mount Kilimanjaro"
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
              12-Week Training Plan
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Training Plan</span>: 12-Week Guide
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              A proven week-by-week training programme from guides who have led 500+ summits. Build the fitness, strength, and mental resilience to reach Uhuru Peak at 5,895m.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Short Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Start training <strong>12 weeks before your climb</strong>. Focus on <strong>hiking with elevation gain</strong>, <strong>cardiovascular fitness</strong>, and <strong>leg/core strength</strong>. You don&apos;t need to be an athlete — <strong>consistency beats intensity</strong>. The goal is to comfortably hike 6-8 hours with a 7-10kg daypack on consecutive days. Our guides have seen thousands of climbers succeed with this approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Training Matters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Training Matters for Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
              Kilimanjaro is not a casual hike. At 5,895m, your body faces extreme conditions that proper training directly prepares you for.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">15-20% Higher Success Rate</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Trained climbers have a 15-20% higher summit success rate than untrained climbers. The mountain-wide average is approximately 65% — but with proper training and a 7+ day route, our clients achieve 93%. Your training directly determines whether you reach Uhuru Peak.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Prevents Injury & Illness</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Strong legs reduce knee and ankle injuries on uneven terrain. Cardiovascular fitness helps your body acclimatize more effectively — a tired, deconditioned body is significantly more susceptible to altitude sickness. Training also prevents the cumulative fatigue that derails climbers from day 3 onwards.
              </p>
            </div>
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Builds Mental Toughness</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Summit night is 12-15 hours of continuous effort in freezing darkness with 50% oxygen. Experienced guides say it is 60% mental. Training in uncomfortable conditions — early mornings, cold weather, fatigue — builds the psychological resilience that gets you through the hardest night of the trek.
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-[var(--primary)]">5-8 hrs</div>
                  <div className="text-sm text-[var(--text-muted)]">Daily hiking for 5-9 days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--primary)]">12-15 hrs</div>
                  <div className="text-sm text-[var(--text-muted)]">Summit night duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--primary)]">4,200m+</div>
                  <div className="text-sm text-[var(--text-muted)]">Cumulative elevation gain</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--primary)]">-15 to -25°C</div>
                  <div className="text-sm text-[var(--text-muted)]">Summit night temperatures</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Assessment */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Fitness Assessment: Where Do You Start?
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                The plan works for all fitness levels — but your starting point determines how you approach it. Identify your level and adjust accordingly.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {fitnessLevels.map((level) => (
                <div
                  key={level.level}
                  className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
                >
                  <div className={`${level.color} text-white p-5`}>
                    <h3 className="font-heading text-xl font-bold">{level.level}</h3>
                    <p className="text-sm text-white/80 mt-1">{level.description}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {level.emphasis}
                    </p>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--secondary)] mb-3">
                      Your Adjustments
                    </h4>
                    <ul className="space-y-2">
                      {level.adjustments.map((adj) => (
                        <li key={adj} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{adj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 12-Week Plan — Phase Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The 12-Week Kilimanjaro Training Plan
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                Three progressive phases, each building on the last. Follow the week-by-week schedule below for a structured path from your current fitness to summit-ready.
              </p>
            </div>

            {/* Phase Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="bg-blue-600 text-white p-5">
                  <div className="text-sm font-semibold opacity-80 mb-1">Phase 1</div>
                  <h3 className="font-heading text-xl font-bold">Foundation</h3>
                  <div className="text-sm opacity-80 mt-1">Weeks 1-4 &middot; 3-4 days/week</div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Walking/hiking 30-60 min sessions</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Weekly hikes building from 1-2 to 3 hours</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Start with 5-7kg daypack on hikes</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Light bodyweight strength 2x per week</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Break in your hiking boots</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="bg-orange-600 text-white p-5">
                  <div className="text-sm font-semibold opacity-80 mb-1">Phase 2</div>
                  <h3 className="font-heading text-xl font-bold">Building</h3>
                  <div className="text-sm opacity-80 mt-1">Weeks 5-8 &middot; 4-5 days/week</div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Longer hikes: 2-4 hours with 8-10kg pack</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Add stair climbing with weighted pack</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Weighted squats, lunges, and step-ups</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Core work after strength sessions</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Cardio sessions at 45-50 minutes</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="bg-emerald-600 text-white p-5">
                  <div className="text-sm font-semibold opacity-80 mb-1">Phase 3</div>
                  <h3 className="font-heading text-xl font-bold">Peak</h3>
                  <div className="text-sm opacity-80 mt-1">Weeks 9-12 &middot; 5 days/week</div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Long hikes: 4-6 hours with 10kg weighted pack</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Back-to-back hiking days simulating trek</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Early morning (5 AM) training sessions</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mental preparation and visualisation</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Taper weeks 11-12: reduce volume 40-50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Week-by-Week Schedule */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Week-by-Week Training Schedule
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Each week builds on the previous one with progressive overload — gradually increasing duration, distance, pack weight, and intensity.
              </p>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((phase) => {
                const phaseWeeks = weeklySchedule.filter(
                  (w) => w.phase === phase
                );
                const phaseColors = {
                  1: {
                    bg: "bg-blue-600",
                    label: "Phase 1: Foundation (Weeks 1-4)",
                    border: "border-blue-200",
                  },
                  2: {
                    bg: "bg-orange-600",
                    label: "Phase 2: Building (Weeks 5-8)",
                    border: "border-orange-200",
                  },
                  3: {
                    bg: "bg-emerald-600",
                    label: "Phase 3: Peak (Weeks 9-12)",
                    border: "border-emerald-200",
                  },
                }[phase]!;

                return (
                  <div key={phase}>
                    <h3
                      className={`inline-block ${phaseColors.bg} text-white text-sm font-semibold px-4 py-2 rounded-t-lg`}
                    >
                      {phaseColors.label}
                    </h3>
                    <div
                      className={`overflow-x-auto rounded-b-xl rounded-tr-xl border ${phaseColors.border} shadow-sm`}
                    >
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white">
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Week
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Focus
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Mon
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Tue
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Wed
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Thu
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Fri
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Sat
                            </th>
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                              Sun
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {phaseWeeks.map((week, i) => (
                            <tr
                              key={week.week}
                              className={
                                i % 2 === 0
                                  ? "bg-white"
                                  : "bg-[var(--surface)]"
                              }
                            >
                              <td className="px-4 py-3 font-semibold whitespace-nowrap">
                                Wk {week.week}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] whitespace-nowrap">
                                {week.focus}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[150px]">
                                {week.monday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[150px]">
                                {week.tuesday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[150px]">
                                {week.wednesday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[150px]">
                                {week.thursday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[150px]">
                                {week.friday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[180px] font-medium">
                                {week.saturday}
                              </td>
                              <td className="px-4 py-3 text-[var(--text-muted)] min-w-[120px]">
                                {week.sunday}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Exercises */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The 7 Key Exercises for Kilimanjaro
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                These exercises form the core of your training. Every week should include most of them in some form.
              </p>
            </div>
            <div className="space-y-6">
              {keyExercises.map((exercise) => (
                <div
                  key={exercise.name}
                  className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${exercise.color}`}
                      >
                        <exercise.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">
                        {exercise.name}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                          Why It Matters
                        </h4>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                          {exercise.why}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)] mb-2">
                          How to Do It
                        </h4>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                          {exercise.how}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mental Preparation */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-[var(--secondary)]" />
              <span className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                The Mental Game
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Mental Preparation: The Pole Pole Philosophy
            </h2>
            <p className="text-white/70 text-lg text-center mb-10 max-w-2xl mx-auto">
              Summit night is 12-15 hours of continuous effort — starting at midnight in freezing darkness with half the oxygen you are used to. Your body can do it. The question is whether your mind will let it.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg mb-4">What to Expect on Summit Night</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>You wake at 11:30 PM after barely sleeping at 4,700m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Temperatures are -15 to -25 degrees C with wind chill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>You can only see a few metres ahead in your headtorch beam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Every breath feels shallow — oxygen is roughly 50% of normal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>The scree slope feels endless — two steps forward, one slide back</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>It lasts 5-7 hours before you reach Stella Point at dawn</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg mb-4">How to Prepare Your Mind</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Visualise success.</strong> Spend 5 minutes each week imagining yourself reaching Uhuru Peak at sunrise
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Break it into small goals.</strong> Do not think about the summit — focus on the next cairn, the next rest stop, the next 10 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Embrace &quot;pole pole.&quot;</strong> Swahili for &quot;slowly, slowly&quot; — the golden rule of Kilimanjaro. Walking slowly preserves energy and helps your body adapt to altitude
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Train in discomfort.</strong> Do early morning sessions in cold weather. Hike when tired. Get comfortable being uncomfortable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Develop a mantra.</strong> &quot;One step at a time,&quot; &quot;I can do hard things,&quot; or simply &quot;pole pole&quot; — something to repeat when the mind wants to quit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Know your why.</strong> When everything hurts, a clear personal reason for being there is what keeps you moving forward
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Training */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Gear Training: Break It In Before the Mountain
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                Your training hikes are not just about fitness — they are your opportunity to test and break in every piece of gear you will use on Kilimanjaro.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Footprints className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Break In Your Boots</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Walk a minimum of <strong>50km in your hiking boots</strong> before the trek. Blisters on Kilimanjaro are preventable — but only if your boots are fully broken in. Start wearing them from week 1 on every training hike. Your feet will thank you at 4,700m.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Mountain className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Practice with Trekking Poles</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Trekking poles reduce strain on your knees by up to 25% on descents. Practice on training hikes from week 4 onwards so the technique feels natural. Learn to adjust pole length for uphill (shorter) and downhill (longer) sections.
                </p>
              </div>
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Dumbbell className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Wear Your Daypack</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Train with the <strong>same daypack you will carry on Kilimanjaro</strong>, progressively loaded from 5kg to 10kg. By week 12, the pack should feel like an extension of your body. Adjust the hip belt, shoulder straps, and sternum strap until the fit is perfect.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/kilimanjaro-climbing-gear/"
                className="text-[var(--primary)] hover:underline font-semibold text-sm"
              >
                See our complete Kilimanjaro gear and packing list →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Week Before the Climb */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold">The Week Before Your Climb</h2>
                <p className="text-[var(--text-muted)] text-sm">Taper, rest, and arrive ready</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-8">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
                The final week is about <strong>rest and recovery</strong>, not last-minute fitness gains. Your body needs to arrive in Arusha fresh, hydrated, and energised. Any training you do in the last 7 days will not improve your fitness — it can only tire you out.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: CheckCircle,
                    text: "No intense exercise in the final 5-7 days",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Light 20-30 minute walks to stay loose",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Drink 2-3 litres of water per day",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Eat well — carbohydrates and protein",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Sleep as much as possible before travel",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Do not try any new exercises or activities",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Gentle stretching and yoga are fine",
                    color: "text-emerald-500",
                  },
                  {
                    icon: CheckCircle,
                    text: "Pack and check all gear two days before departure",
                    color: "text-emerald-500",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0 mt-0.5`} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-[var(--text-muted)]">
                  <strong>Important:</strong> If you arrive in Arusha the day before your trek starts, use that day to rest, hydrate, and acclimatize to the East African timezone. Our team will brief you on the climb, check your gear, and answer any last questions.
                </p>
              </div>
            </div>
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
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
              <Link
                href="/climbing-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Complete planning guide
                </p>
              </Link>
              <Link
                href="/how-hard-is-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">How Hard is Kilimanjaro?</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Honest difficulty assessment
                </p>
              </Link>
              <Link
                href="/can-beginners-climb-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Star className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Can Beginners Climb?</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Guide for first-timers
                </p>
              </Link>
              <Link
                href="/kilimanjaro-altitude-sickness/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Prevention & treatment
                </p>
              </Link>
              <Link
                href="/best-route-to-climb-kilimanjaro/"
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <Calendar className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Compare all 6 routes
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
            Train Smart. Climb Strong. Summit Kilimanjaro.
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Start training today and climb with a team that has guided 500+ successful summits. Snow Africa Adventure provides expert guides, proper acclimatization schedules, and 24/7 support from Arusha to Uhuru Peak.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Explore All Routes
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
