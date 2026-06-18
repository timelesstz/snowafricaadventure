import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  AlertTriangle,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  Activity,
  ArrowRight,
  Users,
  Baby,
  GraduationCap,
  Dumbbell,
  Stethoscope,
  Award,
  Info,
  CheckCircle,
  MapPin,
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
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Age Limits: Minimum & Maximum Age",
  description:
    "Kilimanjaro age requirements: minimum 10 years old (KINAPA rule), no official maximum. Oldest summiter was 89. Age-specific tips for children, teens, and seniors.",
  url: "/kilimanjaro-age-limits/",
});

const ageGroupRoutes = [
  {
    group: "Children (10-15)",
    recommended: ["Marangu 6-Day", "Rongai 7-Day"],
    avoid: ["Umbwe", "Western Breach"],
    notes:
      "Shorter, less technical routes with gradual ascent profiles. Marangu offers hut accommodation which children find more comfortable than camping. Rongai is gentle and less crowded.",
  },
  {
    group: "Teenagers (16-19)",
    recommended: ["Machame 7-Day", "Lemosho 8-Day"],
    avoid: ["Any 5-day route"],
    notes:
      "Teens can handle any standard route. The extra acclimatization day on 7-8 day itineraries is important since adolescent bodies are still developing their altitude response.",
  },
  {
    group: "Adults (20-49)",
    recommended: ["Lemosho 8-Day", "Machame 7-Day", "Northern Circuit 9-Day"],
    avoid: ["Marangu 5-Day"],
    notes:
      "Peak physical years. Any route is suitable, but 7+ days is always recommended for optimal acclimatization regardless of fitness level.",
  },
  {
    group: "Ages 50-69",
    recommended: ["Lemosho 8-Day", "Northern Circuit 9-Day"],
    avoid: ["Any route under 7 days", "Umbwe"],
    notes:
      "Longer routes are strongly recommended. The extra days allow a slower pace, better acclimatization, and more recovery time between hiking days. Our guides adjust the pace to suit the group.",
  },
  {
    group: "Ages 70+",
    recommended: ["Northern Circuit 9-Day", "Lemosho 8-Day"],
    avoid: ["Any route under 8 days", "Umbwe", "Western Breach"],
    notes:
      "The longest available route is the safest choice. Slower daily pace, more rest stops, and maximum acclimatization time. Medical clearance is essential. We recommend a pre-trek altitude test if possible.",
  },
];

const medicalConsiderations = [
  {
    ageRange: "Children (10-15)",
    icon: Baby,
    color: "bg-blue-100 text-blue-600",
    considerations: [
      "Children may not communicate altitude symptoms clearly — guides must monitor proactively",
      "Higher metabolic rate means faster dehydration — enforce strict hydration schedules",
      "Growing bones and joints require proper footwear with ankle support",
      "Altitude affects children similarly to adults, but symptoms can escalate more quickly",
      "Ensure vaccinations are up to date and carry children-appropriate medication doses",
    ],
  },
  {
    ageRange: "Teenagers (16-19)",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
    considerations: [
      "Adolescent invincibility mindset — teens may underreport symptoms to avoid slowing the group",
      "Rapid growth phases can affect coordination on rocky terrain",
      "Hormonal changes can influence altitude response unpredictably",
      "Excellent recovery capacity — teens bounce back quickly from mild AMS",
      "Mental resilience varies — summit night requires psychological preparation",
    ],
  },
  {
    ageRange: "Ages 50-60s",
    icon: Heart,
    color: "bg-amber-100 text-amber-600",
    considerations: [
      "Cardiac screening recommended — ECG and stress test before booking",
      "Joint health assessment — knees bear significant strain during descent",
      "Medications for blood pressure or heart conditions must be altitude-compatible",
      "Recovery between hiking days takes longer — longer routes compensate for this",
      "Pre-existing respiratory conditions need specialist clearance for high altitude",
    ],
  },
  {
    ageRange: "Ages 70+",
    icon: Stethoscope,
    color: "bg-red-100 text-red-600",
    considerations: [
      "Comprehensive medical examination mandatory — heart, lungs, joints, and blood work",
      "Reduced oxygen-carrying capacity means acclimatization takes longer",
      "Higher risk of falls — trekking poles are essential, not optional",
      "Medication interactions at altitude must be reviewed by a doctor familiar with altitude medicine",
      "Emergency evacuation plan should account for slower descent speed",
    ],
  },
];

const ageRecords = [
  {
    title: "Oldest Person to Summit",
    name: "Anne Lorimor",
    age: "89 years old",
    year: "2019",
    detail:
      "American Anne Lorimor summited Uhuru Peak at age 89, setting the record for the oldest person to reach the top of Kilimanjaro. She had previously climbed at age 85.",
  },
  {
    title: "Oldest Man to Summit",
    name: "Fred Distelhorst",
    age: "88 years old",
    year: "2017",
    detail:
      "American doctor Fred Distelhorst reached the summit at age 88, proving that age is no barrier when preparation and determination align with proper medical support.",
  },
  {
    title: "Youngest Official Summiter",
    name: "Coaltan Tanner",
    age: "6 years old",
    year: "2018",
    detail:
      "While KINAPA&apos;s official minimum age is 10, younger children have reached the summit before the rule was strictly enforced. Coaltan Tanner summited at age 6 — though this is not recommended and would not be permitted today.",
  },
  {
    title: "Youngest Under Current Rules",
    name: "Various climbers",
    age: "10 years old",
    year: "Ongoing",
    detail:
      "Under current KINAPA regulations, the youngest permitted climbers are 10 years old. Multiple 10-year-olds have successfully reached Uhuru Peak with proper preparation and experienced guides.",
  },
];

const faqs = [
  {
    question: "What is the minimum age to climb Kilimanjaro?",
    answer:
      "The minimum age to climb Kilimanjaro is 10 years old. This is set by KINAPA (Kilimanjaro National Park Authority) and is strictly enforced at the gate. Children under 10 will not be permitted to enter the park for a summit attempt. Some operators may set their own minimum at 12 or higher based on their experience with younger climbers.",
  },
  {
    question: "Is there a maximum age limit for climbing Kilimanjaro?",
    answer:
      "There is no official maximum age limit for climbing Kilimanjaro. KINAPA does not impose an upper age restriction. The oldest person to summit was 89 years old. As long as you can obtain medical clearance from your doctor confirming you are fit enough for high-altitude trekking, your age alone will not prevent you from attempting the climb.",
  },
  {
    question: "Can a 10 year old climb Kilimanjaro?",
    answer:
      "Yes, a 10-year-old can legally climb Kilimanjaro as this is the minimum age set by KINAPA. However, we recommend that children be at least 12 years old before attempting the summit. At 12, children are better able to communicate altitude symptoms, have more physical stamina for 5-8 hours of daily hiking, and are more psychologically prepared for the challenge of summit night. A parent or legal guardian must accompany any climber under 18.",
  },
  {
    question: "Is climbing Kilimanjaro safe for seniors over 60?",
    answer:
      "Climbing Kilimanjaro is very achievable for fit seniors over 60. Many climbers in their 60s and 70s successfully reach the summit every year. The keys to success for older climbers are: choosing a longer route (8-9 days minimum), obtaining thorough medical clearance including cardiac screening, training consistently for 3-6 months before the climb, and climbing with experienced guides who adjust the pace appropriately. A slower pace and proper acclimatization make all the difference.",
  },
  {
    question: "Does age affect altitude sickness risk on Kilimanjaro?",
    answer:
      "Age alone does not significantly increase your risk of altitude sickness. Research shows that susceptibility to AMS (Acute Mountain Sickness) is primarily genetic — how efficiently your body produces red blood cells and adjusts breathing at altitude. However, older climbers may take slightly longer to acclimatize, which is why we strongly recommend longer routes for climbers over 50. Interestingly, some studies suggest younger climbers are slightly more susceptible to AMS, possibly because they tend to push harder physically.",
  },
  {
    question: "Do I need medical clearance to climb Kilimanjaro?",
    answer:
      "While KINAPA does not require a medical certificate for entry, we strongly recommend medical clearance for all climbers — and consider it essential for anyone over 50 or with pre-existing conditions. Your doctor should assess your cardiovascular health, respiratory function, joint health (especially knees), and review any medications for altitude compatibility. A stress ECG is recommended for climbers over 50. Some travel insurance providers require a doctor's fitness-to-travel letter for high-altitude trekking.",
  },
  {
    question: "Can teenagers climb Kilimanjaro without parents?",
    answer:
      "Climbers under 18 must be accompanied by a parent or legal guardian on Kilimanjaro. This is a KINAPA requirement. The accompanying adult must be registered on the same climbing permit and trek with the same group. We do not accept unaccompanied minors regardless of consent forms. For school or youth group expeditions, a responsible adult must be present for every 3-4 minors in the group.",
  },
  {
    question: "What is the best age to climb Kilimanjaro?",
    answer:
      "There is no single best age — climbers from 10 to 89 have successfully summited. Statistically, the majority of climbers are between 25 and 55, and this age range tends to have the highest summit success rates. However, this likely reflects the fact that these climbers choose optimal routes and prepare well, rather than any inherent age advantage. A well-prepared 65-year-old on an 8-day route will likely outperform an unprepared 25-year-old on a 5-day route.",
  },
  {
    question: "How should older climbers prepare differently for Kilimanjaro?",
    answer:
      "Older climbers (55+) should extend their training period to 4-6 months, focusing on cardio endurance (hiking, cycling, swimming), leg strength (stairs, squats, lunges), and balance work. Include regular hikes with a loaded daypack to condition knees and ankles. Get a comprehensive medical check-up including cardiac stress test and blood work. Choose the longest route available (8-9 days), and consider a pre-acclimatization strategy such as spending a few days at moderate altitude before the climb. Trekking poles are essential, not optional.",
  },
  {
    question: "Are there age-specific discounts for Kilimanjaro park fees?",
    answer:
      "KINAPA charges reduced park fees for children aged 10-15. As of 2026, children pay approximately 50% of the adult conservation and camping fees. This can represent a saving of several hundred dollars. Children under 10 are not permitted on summit attempts. There are no senior discounts — climbers aged 16 and above pay the full adult rate regardless of age.",
  },
];

export default function KilimanjaroAgeLimitsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Age Limits" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Age Limits", url: "/kilimanjaro-age-limits/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Age Limits: Minimum & Maximum Age",
            description:
              "Kilimanjaro age requirements: minimum 10 years old (KINAPA rule), no official maximum. Oldest summiter was 89. Age-specific tips for children, teens, and seniors.",
            url: "/kilimanjaro-age-limits/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            publishedTime: "2026-06-18",
            modifiedTime: "2026-06-18",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Multi-generational group of trekkers ascending Kilimanjaro trail"
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
              Planning &amp; Requirements
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Age Limits</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Minimum age, maximum age, and age-specific guidance for climbing Africa&apos;s highest peak — from children as young as 10 to seniors in their 80s.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                The <strong>minimum age to climb Kilimanjaro is 10 years old</strong>, set by KINAPA (Kilimanjaro National Park Authority). There is <strong>no official maximum age</strong> — the oldest person to summit was <strong>89 years old</strong>. With proper preparation, medical clearance, and an appropriate route choice, Kilimanjaro is accessible to climbers across an extraordinary age range.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Age Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Official Age Requirements
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro&apos;s age policy is set by <strong>KINAPA (Kilimanjaro National Park Authority)</strong>, the government body that manages Tanzania&apos;s highest peak. The rules are straightforward but strictly enforced at every gate.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Baby className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Minimum Age: 10 Years</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Children must be at least 10 years old on the date they enter the park. This is verified at the gate with passport or birth certificate. No exceptions are granted. Children aged 10-15 pay reduced park fees (approximately 50% of adult rates). A parent or legal guardian must accompany any climber under 18.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Maximum Age: None</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  KINAPA does not impose any upper age limit. There is no age at which you are automatically barred from climbing. The oldest person to summit Uhuru Peak was 89 years old. Your doctor&apos;s assessment of your fitness matters far more than your birth year. Many climbers in their 60s and 70s reach the summit every year.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> While KINAPA sets the official minimum at 10, many experienced operators — including ourselves — recommend a minimum age of 12 for summit attempts. At 12, children are better equipped to communicate symptoms, maintain pace on long hiking days, and cope with the mental challenge of summit night. We are happy to discuss individual cases with families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Children on Kilimanjaro (10-15) */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Baby className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Children on Kilimanjaro (Ages 10-15)
                </h2>
                <p className="text-[var(--text-muted)] text-sm">What parents need to know</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Children aged 10 to 15 can and do climb Kilimanjaro successfully. However, climbing with a child requires more careful planning than an adult expedition. <Link href="/kilimanjaro-altitude-sickness/" className="text-[var(--primary)] hover:underline font-semibold">Altitude sickness</Link> affects children in much the same way as adults, but there are critical differences that parents must understand before committing to the climb.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Parent or Guardian Required</h3>
                  <p className="text-sm text-[var(--text-muted)]">KINAPA requires a parent or legal guardian to accompany any climber under 18. The adult must be registered on the same permit and trek with the same group throughout the climb. This is non-negotiable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Altitude Risks in Children</h3>
                  <p className="text-sm text-[var(--text-muted)]">Children experience altitude sickness at similar rates to adults, but the risk is compounded by their reduced ability to articulate symptoms. A 10-year-old may not recognise or describe a headache, nausea, or dizziness the way an adult would. Our guides perform more frequent health checks on younger climbers, using visual and behavioural cues alongside verbal check-ins.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Route Selection for Children</h3>
                  <p className="text-sm text-[var(--text-muted)]">We recommend the Marangu (6-day) or Rongai (7-day) routes for younger climbers. Marangu offers hut accommodation — more comfortable and warmer than camping — while Rongai provides a gentle, gradual ascent. Avoid technically challenging routes like Umbwe or the Western Breach approach.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Summit Night Considerations</h3>
                  <p className="text-sm text-[var(--text-muted)]">Summit night starts around midnight and involves 6-8 hours of hiking in darkness at extreme altitude. This is the most physically and mentally demanding part of the climb. Children under 12 may struggle with the sleep deprivation and sustained effort. Be prepared to turn back if your child shows distress — reaching the summit is never worth risking a child&apos;s health.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Heart className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <div>
                <p className="text-blue-800 text-sm font-semibold mb-1">Our Recommendation</p>
                <p className="text-blue-800 text-sm">
                  While the legal minimum is 10, we recommend children be at least 12 before attempting Kilimanjaro. Between 10 and 12, the physical and psychological demands of summit night are significant. If your child is 10-11 and very motivated, we are happy to discuss their readiness on a case-by-case basis. Every child is different — some 10-year-olds are more capable than some adults.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teenagers (16-19) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Teenagers on Kilimanjaro (Ages 16-19)
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Excellent candidates for the summit</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Teenagers are among the best-suited age groups for climbing Kilimanjaro. They combine youthful energy and rapid recovery with enough maturity to understand and follow safety protocols. Many of our most enthusiastic and successful climbers are in this age bracket — gap-year travellers, school expedition groups, and families with older teenagers regularly achieve the summit. Even <Link href="/can-beginners-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">complete beginners</Link> in this age group perform well with proper preparation.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The <strong>physical advantages</strong> are real: faster cardiovascular adaptation, excellent recovery between hiking days, and the stamina to push through summit night. Teenagers tend to acclimatize well, though some studies suggest younger climbers may be marginally more susceptible to mild AMS — likely because they push harder physically rather than any physiological difference.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The main consideration is <strong>psychological preparation</strong>. Summit night is a grinding, uncomfortable experience — 6 to 8 hours of hiking in darkness, sub-zero temperatures, and extreme altitude. Teens who understand what to expect and are internally motivated (not just climbing because their parents want them to) perform exceptionally well. Those who are unprepared or reluctant may struggle with the mental game more than the physical.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <Dumbbell className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Physical Fitness</p>
                <p className="text-xs text-[var(--text-muted)]">Rapid recovery, high energy, strong endurance for long hiking days</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <Activity className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Acclimatization</p>
                <p className="text-xs text-[var(--text-muted)]">Good adaptation to altitude with proper route selection (7+ days)</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">Motivation</p>
                <p className="text-xs text-[var(--text-muted)]">Self-motivated teens are among our most successful climbers</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              <strong>Note:</strong> Climbers aged 16-17 still require a parent or legal guardian on the climb. At 18, climbers can register independently. For school or charity groups with mixed-age participants, we require one responsible adult per 3-4 minors.
            </p>
          </div>
        </div>
      </section>

      {/* Climbing in Your 20s-40s */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Climbing in Your 20s to 40s
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The 20-to-49 age range represents the <strong>peak demographic on Kilimanjaro</strong>. Approximately 60-70% of all climbers fall within this bracket, and for good reason — this is when most people have the combination of physical capability, financial means, and available time to undertake a major expedition.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Climbers in their 20s and 30s enjoy peak cardiovascular fitness, joint health, and recovery speed. These physical advantages translate to faster acclimatization for most people and the ability to maintain pace on long summit-night pushes. However, fitness alone does not guarantee success — altitude sickness affects fit and unfit climbers at similar rates. A marathon runner on a 5-day route will struggle more than a casual hiker on an 8-day route. <Link href="/how-hard-is-kilimanjaro/" className="text-[var(--primary)] hover:underline">Route selection and acclimatization</Link> always outweigh raw fitness.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Climbers in their 40s remain well within the prime climbing window. The slight decline in VO2 max and recovery speed compared to your 20s is negligible on Kilimanjaro, where the pace is deliberately slow. Many 40-something climbers tell us they are more mentally prepared than they would have been a decade earlier — they are more patient with the &quot;pole pole&quot; (slowly, slowly) approach, less likely to rush, and better at listening to their bodies.
            </p>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3">Key Advice for This Age Group</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Do not let fitness breed overconfidence — <Link href="/kilimanjaro-altitude-sickness/" className="text-[var(--primary)] hover:underline">altitude sickness</Link> does not care about your gym routine</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Choose a 7+ day route even if you feel &quot;fit enough&quot; for shorter options</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Follow a structured <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline">training plan</Link> — hiking fitness is different from gym fitness</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>This is the ideal age to attempt the more challenging routes like Machame or Lemosho if you want variety and scenery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Climbing in Your 50s-60s */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Climbing in Your 50s &amp; 60s
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Climbing Kilimanjaro in your 50s and 60s is <strong>very achievable and increasingly common</strong>. This age group represents a growing segment of our climbers — often experienced hikers who have ticked off other adventures and now want to take on Africa&apos;s highest peak. Many have more time and resources than younger climbers, and they bring a patience and self-awareness that serves them well at altitude. Our dedicated guide to <Link href="/climbing-kilimanjaro-over-50/" className="text-[var(--primary)] hover:underline font-semibold">climbing Kilimanjaro over 50</Link> covers everything this age group needs to know.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The physiological changes that come with age are real but manageable. <strong>VO2 max declines by roughly 10% per decade</strong> after your 30s, which means the physical effort of hiking feels harder at the same absolute intensity. Recovery between stages takes longer. Joints — especially knees — bear the strain of 5-8 hours of daily trekking on uneven terrain. These are not reasons to avoid Kilimanjaro; they are reasons to <strong>choose the right strategy</strong>.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The strategy is simple: <strong>go longer and slower</strong>. We strongly recommend 8-day routes (Lemosho is our top pick) or the 9-day Northern Circuit for climbers over 50. The extra days provide more acclimatization time, shorter daily hiking distances, and built-in recovery — which is why <Link href="/kilimanjaro-success-rates/" className="text-[var(--primary)] hover:underline font-semibold">summit success rates</Link> are significantly higher on longer routes. Our guides naturally adjust pace for this age group — there is no stigma in being the slowest group on the mountain. A solid <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline font-semibold">training plan</Link> started 4-6 months early makes the biggest difference. Pole pole is not just a motto; it is the entire strategy.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-emerald-800">What Works in Your Favour</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Patience — you are less likely to rush or ignore symptoms
                  </li>
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Experience — many 50+ climbers have years of hiking experience
                  </li>
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Mental toughness — you have faced hard things before
                  </li>
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Financial comfort — you can afford the longer, better routes
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-amber-800">What to Plan For</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-amber-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Cardiac screening — ECG and stress test before booking
                  </li>
                  <li className="flex items-start gap-2 text-sm text-amber-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Joint preparation — strengthen knees, bring trekking poles
                  </li>
                  <li className="flex items-start gap-2 text-sm text-amber-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Medication review — ensure altitude compatibility
                  </li>
                  <li className="flex items-start gap-2 text-sm text-amber-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Extended training — start 4-6 months before the climb
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-sm">
              <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline">
                Read our full Kilimanjaro safety guide
              </Link>{" "}
              for more detail on health monitoring and emergency protocols for all age groups.
            </p>
          </div>
        </div>
      </section>

      {/* Climbing Over 70 */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Climbing Over 70
                </h2>
                <p className="text-white/60 text-sm">Possible, proven, and increasingly popular</p>
              </div>
            </div>

            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              Climbing Kilimanjaro after 70 is not a publicity stunt — it is a legitimate achievement that an increasing number of septuagenarians and octogenarians accomplish every year. The oldest person to reach Uhuru Peak was 89 years old. These are not superhuman athletes; they are ordinary people who prepared well, chose the right route, and climbed with experienced guides.
            </p>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              The non-negotiables for climbing over 70 are: <strong>comprehensive medical clearance</strong> (cardiac stress test, pulmonary function test, full blood work, musculoskeletal assessment), the <strong>longest available route</strong> (9-day Northern Circuit or 8-day Lemosho), and a <strong>private guide arrangement</strong> where the pace is set entirely by your comfort level. There is no group to keep up with, no pressure to maintain anyone else&apos;s speed.
            </p>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              Our guides have extensive experience with older climbers and understand the nuances — more frequent rest stops, adjusted summit night timing, enhanced health monitoring, and a willingness to extend summit day if the climber is progressing safely but slowly. We also recommend a pre-acclimatization strategy: spending 2-3 days at moderate altitude (1,500-2,500m) before the climb begins, which gives your body a head start on adaptation.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-[var(--secondary)] mb-1">89</p>
                <p className="text-sm text-white/60">Oldest summiter (Anne Lorimor, 2019)</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-[var(--secondary)] mb-1">9 Days</p>
                <p className="text-sm text-white/60">Recommended minimum route length</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-[var(--secondary)] mb-1">100%</p>
                <p className="text-sm text-white/60">Medical clearance requirement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Records on Kilimanjaro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Age Records on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              From 6 to 89, Kilimanjaro has been summited by an astonishing age range — proof that the mountain is accessible to those who prepare properly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {ageRecords.map((record) => (
              <div
                key={record.title}
                className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">{record.title}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{record.name} &mdash; {record.year}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--primary)] mb-2">{record.age}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{record.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link href="/kilimanjaro-records/" className="text-[var(--primary)] hover:underline">
              See all Kilimanjaro records &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Medical Considerations by Age */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Medical Considerations by Age Group
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every age group has specific health considerations for high-altitude trekking. Understanding yours helps you prepare properly and climb safely.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {medicalConsiderations.map((group) => (
              <div
                key={group.ageRange}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-[var(--border)] flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${group.color.split(" ")[0]} flex items-center justify-center`}>
                    <group.icon className={`w-5 h-5 ${group.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{group.ageRange}</h3>
                </div>
                <ul className="p-5 space-y-3">
                  {group.considerations.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Stethoscope className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Routes by Age Group */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Best Routes by Age Group
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Route selection is the most important decision for any climber — but it becomes even more critical at the extremes of the age spectrum. Longer routes with gradual ascent profiles are safer and more comfortable for both younger and older climbers.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Age Group</th>
                  <th className="text-left px-4 py-3 font-semibold">Recommended Routes</th>
                  <th className="text-left px-4 py-3 font-semibold">Avoid</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {ageGroupRoutes.map((row, i) => (
                  <tr
                    key={row.group}
                    className={`border-t border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{row.group}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.recommended.map((r) => (
                          <span key={r} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.avoid.map((a) => (
                          <span key={a} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                            {a}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link
              href="/trekking/"
              className="text-[var(--primary)] hover:underline"
            >
              Browse all Kilimanjaro routes with detailed itineraries &rarr;
            </Link>
          </p>
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
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Related Guides</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/kilimanjaro-safety/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Safety Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Health &amp; emergency protocols</p>
              </Link>
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
              <Link href="/can-beginners-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Beginners Guide</p>
                <p className="text-xs text-[var(--text-muted)]">First-time climbers</p>
              </Link>
              <Link href="/how-hard-is-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">How Hard Is It?</p>
                <p className="text-xs text-[var(--text-muted)]">Honest difficulty assessment</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Dumbbell className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/kilimanjaro-records/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Award className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Records</p>
                <p className="text-xs text-[var(--text-muted)]">Age, speed &amp; firsts</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-age-limits/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Every Age. One Mountain.
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            From 10 to 89, Kilimanjaro welcomes climbers of all ages. Our guides have led children, teenagers, families, and seniors to Uhuru Peak — with age-appropriate routes, pacing, and medical monitoring for every group. Tell us your age and fitness level, and we&apos;ll recommend the perfect route.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Browse Kilimanjaro Routes
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
