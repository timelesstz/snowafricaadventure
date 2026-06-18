import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Trophy,
  Clock,
  Users,
  Crown,
  History,
  Flame,
  ArrowRight,
  Star,
  TrendingUp,
  Target,
  Timer,
  Award,
  Heart,
  CalendarDays,
  BarChart3,
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
  title: "Kilimanjaro Records: Fastest Climbs & Firsts",
  description:
    "Kilimanjaro records: fastest ascent (4h 56m), youngest summiter (6 years), oldest (89 years), most summits, first ascent in 1889. Complete records archive.",
  url: "/kilimanjaro-records/",
});

const speedRecords = [
  {
    title: "Fastest Ascent",
    holder: "Karl Egloff",
    nationality: "Swiss-Ecuadorian",
    time: "4h 56m",
    year: 2014,
    detail:
      "Egloff shattered the previous record held by Kilian Jornet (5h 23m, 2010) by running from Umbwe Gate (1,640m) to Uhuru Peak (5,895m) in under five hours. He averaged roughly 14 minutes per kilometre of elevation gain across some of the most demanding terrain on the planet.",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Fastest Round-Trip",
    holder: "Karl Egloff",
    nationality: "Swiss-Ecuadorian",
    time: "6h 42m",
    year: 2014,
    detail:
      "On the same attempt as his ascent record, Egloff continued down and completed the full round-trip from gate to summit and back in 6 hours and 42 minutes. The descent took less than two hours, a pace that would be reckless for anyone without elite trail-running conditioning.",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Fastest Female Ascent",
    holder: "Fernanda Maciel",
    nationality: "Brazilian",
    time: "7h 8m",
    year: 2018,
    detail:
      "Ultra-runner Fernanda Maciel set the women&apos;s speed record via the Umbwe Route, reaching Uhuru Peak in 7 hours and 8 minutes. Maciel is also known for speed records on Aconcagua and Mont Blanc, placing her among the world&apos;s elite mountain athletes.",
    color: "bg-rose-50 border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "Previous Men&apos;s Record",
    holder: "Kilian Jornet",
    nationality: "Spanish",
    time: "5h 23m",
    year: 2010,
    detail:
      "Before Egloff, Spanish ultra-runner Kilian Jornet held the fastest ascent record. Jornet is widely considered the greatest mountain runner in history, holding speed records on peaks including the Matterhorn, Mont Blanc, and Denali.",
    color: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
];

const ageRecords = [
  {
    category: "Youngest Male Summiter",
    holder: "Keats Boyd",
    age: "7 years old",
    year: 2008,
    detail:
      "American Keats Boyd reached Uhuru Peak at the age of seven, making him one of the youngest confirmed male summiters. He climbed with his father via the Machame Route over seven days.",
    icon: Star,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    category: "Youngest Female Summiter",
    holder: "Montannah Kenney",
    age: "7 years old",
    year: 2009,
    detail:
      "Montannah Kenney summited Kilimanjaro at age seven to honour her late grandmother. She climbed the Marangu Route with her mother. Her story was widely covered and inspired young adventurers worldwide.",
    icon: Star,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    category: "Youngest Confirmed Summiter",
    holder: "Coaltan Tanner",
    age: "6 years old",
    year: 2018,
    detail:
      "Coaltan Tanner from Arizona is believed to be the youngest person to reach Uhuru Peak at just six years old. He climbed with his family via the Lemosho Route. Tanzania&apos;s official minimum age requirement is 10, though enforcement has varied over the years.",
    icon: Crown,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    category: "Oldest Male Summiter",
    holder: "Fred Distelhorst",
    age: "88 years old",
    year: 2017,
    detail:
      "American Fred Distelhorst summited Kilimanjaro at 88, making him one of the oldest known male summiters. His climb demonstrated that age alone does not determine summit capability when fitness, acclimatization, and determination align.",
    icon: Award,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    category: "Oldest Female Summiter",
    holder: "Anne Lorimor",
    age: "89 years old",
    year: 2019,
    detail:
      "Anne Lorimor summited Kilimanjaro at the age of 89, setting what is widely recognised as the record for the oldest woman to reach Uhuru Peak. She climbed to raise awareness for education initiatives and proved that passion has no expiry date.",
    icon: Award,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const historicalFirsts = [
  {
    year: 1889,
    event: "First Recorded Ascent",
    detail:
      "German geographer Hans Meyer and Austrian mountaineer Ludwig Purtscheller reached the summit of Kibo (now Uhuru Peak) on 6 October 1889 after two previous failed attempts. They were guided by local Chagga guide Yohani Kinyala Lauwo, whose contribution was largely unrecognised for over a century. Meyer named the summit Kaiser-Wilhelm-Spitze; it was renamed Uhuru (\"freedom\") Peak after Tanzanian independence in 1961.",
  },
  {
    year: 1912,
    event: "First Ascent via Kibo&apos;s Glaciers",
    detail:
      "Fritz Klute and Eduard Oehler made the first ascent of the major glaciers on Kibo, documenting the ice formations that were then far more extensive than what remains today. Their expedition produced some of the earliest scientific records of Kilimanjaro&apos;s glacial coverage.",
  },
  {
    year: 1927,
    event: "First Solo Ascent",
    detail:
      "Sheila MacDonald became one of the first women documented to attempt a solo ascent of Kilimanjaro in the late 1920s. Early female climbing records on Kilimanjaro are incomplete, and several women may have reached the summit before formal record-keeping began.",
  },
  {
    year: 1959,
    event: "First Recorded Tanzanian Summit",
    detail:
      "As Tanzania moved toward independence, local climbers began making documented ascents. Yohani Kinyala Lauwo, the Chagga guide who assisted Hans Meyer in 1889, is the most notable early Tanzanian summiter, though his achievement went formally unrecognised until the Tanzanian government honoured him in the 1990s. He lived to approximately 125 years of age.",
  },
  {
    year: 2005,
    event: "First Blind Summiter",
    detail:
      "Erik Weihenmayer, an American adventurer who lost his sight at age 13, summited Kilimanjaro as part of his quest to climb the Seven Summits. Weihenmayer is the only blind person to have completed all Seven Summits, proving that physical disability is not an absolute barrier to high-altitude mountaineering.",
  },
  {
    year: 2012,
    event: "First Double-Amputee Summiter",
    detail:
      "Kyle Maynard, born with a condition that left him without arms below the elbow or legs below the knee, bear-crawled to the summit of Kilimanjaro without the use of prosthetics. His ascent took 10 days and remains one of the most remarkable achievements in Kilimanjaro&apos;s history.",
  },
];

const enduranceRecords = [
  {
    title: "Most Summits by One Person",
    detail:
      "Tanzanian guide Richard Lyimo has summited Kilimanjaro over 500 times, a record among professional guides. Several other Tanzanian guides have exceeded 300 summits over careers spanning two decades or more. These men know every rock, every weather pattern, and every danger sign on the mountain.",
    icon: TrendingUp,
  },
  {
    title: "First Wheelchair Summit",
    detail:
      "South African Bernard Goosen summited Kilimanjaro in a modified wheelchair in 2007, assisted by a team of porters and support crew. The ascent took six days via the Machame Route and required significant route modifications to navigate rocky terrain and steep sections.",
    icon: Heart,
  },
  {
    title: "First Football Match at Summit",
    detail:
      "In 2017, a group organised by charity staged the highest-altitude football match ever played at Uhuru Peak. The match lasted 90 minutes in thin air at 5,895 metres, raising funds for children&apos;s education programmes in Tanzania. Players dealt with extreme cold, oxygen deprivation, and a distinctly uneven pitch.",
    icon: Target,
  },
  {
    title: "Fastest Summit by a Tanzanian",
    detail:
      "Simon Mtuy, a Tanzanian ultra-runner and guide, set the unsupported round-trip record in 2006, completing the ascent and descent in 9 hours and 21 minutes while carrying all his own supplies. Unlike Egloff&apos;s supported record, Mtuy received no assistance of any kind during his run.",
    icon: Flame,
  },
  {
    title: "Most Consecutive Daily Summits",
    detail:
      "Various attempts have been made to summit Kilimanjaro on consecutive days. The logistics of descending, recovering, and re-ascending make consecutive summits extraordinarily demanding. Most multi-summit records are held by Tanzanian guides who live near the mountain and train on its slopes year-round.",
    icon: CalendarDays,
  },
  {
    title: "First Cricket Match on Kilimanjaro",
    detail:
      "In 2014, a team played cricket at 5,730 metres on the crater rim, setting a Guinness World Record for the highest-altitude cricket match. The event raised over $100,000 for charity. Bowlers struggled with the thin air, and fielding at altitude proved far harder than anyone anticipated.",
    icon: Trophy,
  },
];

const regularClimberStats = [
  {
    stat: "5-9 Days",
    label: "Average Time to Summit",
    description:
      "Regular climbers take between 5 and 9 days depending on the route chosen. Longer routes provide better acclimatization and significantly higher success rates. We recommend a minimum of 7 days.",
    icon: Timer,
  },
  {
    stat: "65%",
    label: "Overall Success Rate",
    description:
      "The average success rate across all routes and durations is approximately 65%. This figure includes short 5-day routes that pull the average down considerably. Longer routes perform dramatically better.",
    icon: BarChart3,
  },
  {
    stat: "93%",
    label: "8-Day Lemosho Success Rate",
    description:
      "The 8-day Lemosho Route achieves a 93%+ summit success rate thanks to its excellent acclimatization profile, including a climb-high-sleep-low day at Lava Tower (4,630m) before descending to Barranco Camp.",
    icon: TrendingUp,
  },
  {
    stat: "35,000+",
    label: "Annual Climbers",
    description:
      "Over 35,000 people attempt Kilimanjaro each year, making it the most climbed high-altitude peak in the world. The mountain generates significant revenue for Tanzania and supports thousands of local jobs.",
    icon: Users,
  },
];

const faqs = [
  {
    question: "What is the fastest Kilimanjaro climb ever?",
    answer:
      "The fastest Kilimanjaro ascent on record is 4 hours and 56 minutes, set by Swiss-Ecuadorian athlete Karl Egloff in August 2014. He ran from Umbwe Gate (1,640m) to Uhuru Peak (5,895m) via the Umbwe Route. His full round-trip time was 6 hours and 42 minutes. This is an elite athletic record — regular trekkers take 5 to 9 days to complete the climb safely with proper acclimatization.",
  },
  {
    question: "Who was the first person to climb Kilimanjaro?",
    answer:
      "The first recorded ascent of Kilimanjaro was by German geographer Hans Meyer and Austrian mountaineer Ludwig Purtscheller on 6 October 1889. They were guided by Yohani Kinyala Lauwo, a local Chagga guide whose contribution went largely unrecognised for over 100 years. Read the full story of the first person to climb Kilimanjaro for the complete history. Meyer named the summit Kaiser-Wilhelm-Spitze, later renamed Uhuru Peak (\"freedom\" in Swahili) after Tanzanian independence in 1961.",
  },
  {
    question: "What is the youngest age to climb Kilimanjaro?",
    answer:
      "The youngest confirmed summiter is believed to be Coaltan Tanner, who reached Uhuru Peak at 6 years old in 2018. Other notable young summiters include Keats Boyd (7 years, 2008) and Montannah Kenney (7 years, 2009). Tanzania officially requires climbers to be at least 10 years old, though enforcement has varied. Most reputable operators enforce this minimum age requirement for safety reasons.",
  },
  {
    question: "What is the oldest age to summit Kilimanjaro?",
    answer:
      "Anne Lorimor summited Kilimanjaro at 89 years old in 2019, making her the oldest known person to reach Uhuru Peak. Among men, Fred Distelhorst summited at 88 years old in 2017. These records demonstrate that age is not an absolute barrier, though they represent exceptional individuals with excellent fitness and strong acclimatization support from experienced guides.",
  },
  {
    question: "How many people have climbed Kilimanjaro?",
    answer:
      "Over 35,000 people attempt Kilimanjaro each year, and this number has grown steadily over the past two decades. Since records began, it is estimated that several hundred thousand people have reached Uhuru Peak. The mountain is the most climbed high-altitude peak in the world, attracting adventurers of all ages and backgrounds from over 100 countries annually.",
  },
  {
    question: "Can you run up Kilimanjaro?",
    answer:
      "Yes, but only elite athletes should attempt it. Speed records are set by professional ultra-runners who train specifically for high-altitude running and have extensive experience with oxygen deprivation. Karl Egloff, Kilian Jornet, and Simon Mtuy are among the athletes who have run the mountain. For regular climbers, running would be extremely dangerous — the risk of severe altitude sickness, injury on technical terrain, and cardiac events increases dramatically at speed.",
  },
  {
    question: "What is the record for most Kilimanjaro summits?",
    answer:
      "Tanzanian guide Richard Lyimo has summited Kilimanjaro over 500 times, the most by any individual. Several other Tanzanian guides have exceeded 300 summits across careers spanning 15 to 25 years. These professional guides typically summit 20 to 40 times per year and possess unmatched knowledge of the mountain&apos;s conditions, weather patterns, and emergency protocols.",
  },
  {
    question: "Has anyone climbed Kilimanjaro in one day?",
    answer:
      "Yes. Karl Egloff completed the round-trip (gate to summit and back) in 6 hours and 42 minutes in 2014. Simon Mtuy did it unsupported in 9 hours and 21 minutes in 2006. However, these are elite athletic feats performed by professional mountain runners. A one-day climb is extremely dangerous for anyone without elite conditioning, as the body has zero time to acclimatize to the altitude. Most deaths on Kilimanjaro are linked to inadequate acclimatization.",
  },
  {
    question: "Who was the first woman to climb Kilimanjaro?",
    answer:
      "There is no definitive record of the first woman to summit Kilimanjaro. Sheila MacDonald is among the earliest women documented attempting the climb in the late 1920s, but comprehensive records from the early 20th century are incomplete. Several European women are believed to have reached the summit during the colonial period, though their names were often omitted from expedition reports. By the mid-20th century, women were regularly summiting Kilimanjaro.",
  },
  {
    question: "Are there any Kilimanjaro records by Tanzanians?",
    answer:
      "Yes, and their contributions are central to Kilimanjaro&apos;s history. Yohani Kinyala Lauwo guided the very first summit in 1889. Simon Mtuy holds the unsupported round-trip record (9h 21m, 2006). Richard Lyimo has summited over 500 times. Tanzanian guides and porters are the backbone of every Kilimanjaro expedition — without their knowledge, strength, and commitment, commercial climbing on the mountain would not be possible.",
  },
];

const relatedGuides = [
  {
    href: "/climbing-kilimanjaro/",
    icon: Mountain,
    title: "Climbing Kilimanjaro",
    subtitle: "Complete guide",
  },
  {
    href: "/kilimanjaro-statistics/",
    icon: BarChart3,
    title: "Kilimanjaro Statistics",
    subtitle: "Data & numbers",
  },
  {
    href: "/kilimanjaro-success-rates/",
    icon: TrendingUp,
    title: "Success Rates",
    subtitle: "By route & duration",
  },
  {
    href: "/how-hard-is-kilimanjaro/",
    icon: Target,
    title: "How Hard Is It?",
    subtitle: "Honest difficulty assessment",
  },
  {
    href: "/can-beginners-climb-kilimanjaro/",
    icon: Heart,
    title: "Beginners Guide",
    subtitle: "First-time climbers",
  },
  {
    href: "/mount-kilimanjaro-height/",
    icon: Mountain,
    title: "Kilimanjaro Height",
    subtitle: "5,895m explained",
  },
  {
    href: "/trekking/",
    icon: Star,
    title: "Trekking Routes",
    subtitle: "All route options",
  },
];

export default function KilimanjaroRecordsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Records" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Records", url: "/kilimanjaro-records/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Records: Fastest Climbs & Firsts",
            description:
              "Kilimanjaro records: fastest ascent (4h 56m), youngest summiter (6 years), oldest (89 years), most summits, first ascent in 1889. Complete records archive.",
            url: "/kilimanjaro-records/",
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
            alt="Climbers at the summit of Kilimanjaro with glaciers and sunrise in the background"
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
              History &amp; Records
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Records</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              From the fastest ascent in under five hours to the oldest summiter at 89 years old — every record, first, and remarkable feat on Africa&apos;s highest peak.
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
                The fastest Kilimanjaro ascent is <strong>4 hours 56 minutes</strong> by Karl Egloff (2014). The youngest confirmed summiter was <strong>6 years old</strong>, the oldest <strong>89</strong>. The <Link href="/first-person-to-climb-kilimanjaro/" className="underline hover:no-underline">first recorded ascent</Link> was by <strong>Hans Meyer and Ludwig Purtscheller in 1889</strong>, guided by Chagga guide Yohani Kinyala Lauwo. Over <strong>35,000 people</strong> now attempt the climb annually, making it the most climbed high-altitude peak on Earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Records */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Speed Records
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              These records belong to elite ultra-runners and professional mountain athletes. Normal climbers take 5-9 days to summit safely — and that is exactly how it should be.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {speedRecords.map((record) => (
              <div
                key={record.title}
                className={`rounded-2xl border-2 ${record.color} p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${record.iconBg} flex items-center justify-center`}>
                    <Clock className={`w-6 h-6 ${record.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{record.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{record.holder} ({record.nationality})</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-[var(--primary)]">{record.time}</span>
                  <span className="text-sm text-[var(--text-muted)]">({record.year})</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {record.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Trophy className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Important context:</strong> Speed records are set by professional athletes who train specifically for high-altitude running and accept risks that would be dangerous for recreational climbers. Attempting to rush Kilimanjaro dramatically increases your risk of severe{" "}
                <Link href="/kilimanjaro-altitude-sickness/" className="underline hover:no-underline">
                  altitude sickness
                </Link>. The safest and most enjoyable way to summit is on a{" "}
                <Link href="/climbing-kilimanjaro/" className="underline hover:no-underline">
                  7+ day guided trek
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Records */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Age Records
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro has been summited by climbers from age 6 to 89, proving that determination and proper preparation matter more than birth year.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ageRecords.map((record) => (
              <div
                key={record.category}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className={`p-5 ${record.bg}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center`}>
                      <record.icon className={`w-5 h-5 ${record.color}`} />
                    </div>
                    <h3 className="font-heading font-bold text-sm">{record.category}</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{record.holder}</span>
                  </div>
                  <p className="text-sm font-semibold mt-1">{record.age} ({record.year})</p>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {record.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Age requirements:</strong> Tanzania National Parks Authority (TANAPA) officially requires climbers to be at least 10 years old. Enforcement has varied, which is why younger summiters appear in the records. Most reputable operators enforce this minimum. For older climbers, there is no upper age limit — a medical clearance and experienced guide team are what matter most.{" "}
                <Link href="/can-beginners-climb-kilimanjaro/" className="underline hover:no-underline">
                  Read our beginners guide
                </Link>{" "}
                for preparation advice at any age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Firsts */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Historical Firsts
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                From the first European-documented summit in 1889 to modern feats of endurance and inclusion, Kilimanjaro&apos;s history is written by those who dared to attempt it.
              </p>
            </div>
            <div className="space-y-1">
              {historicalFirsts.map((item, i) => (
                <div
                  key={item.year}
                  className="flex gap-6 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="shrink-0 text-center">
                    <div className="text-3xl font-bold text-[var(--secondary)]">{item.year}</div>
                    <History className="w-5 h-5 text-white/30 mx-auto mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.event}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Endurance & Unusual Records */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Endurance &amp; Unusual Records
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Beyond speed and age, Kilimanjaro has inspired some truly creative and extraordinary achievements. Here are the records that defy easy categorisation.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enduranceRecords.map((record) => (
              <div
                key={record.title}
                className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <record.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">{record.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {record.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Records That Matter for Regular Climbers */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Records That Matter for Regular Climbers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Speed records make headlines, but these are the numbers that actually determine whether you will reach the summit. Choose the right route, take enough time, and your odds are excellent.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularClimberStats.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 text-center"
              >
                <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">{item.stat}</div>
                <h3 className="font-semibold text-sm mb-3">{item.label}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/kilimanjaro-success-rates/"
              className="text-[var(--primary)] hover:underline font-semibold inline-flex items-center gap-2"
            >
              See detailed success rates by route and duration
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                <details key={i} className="bg-[var(--surface)] rounded-xl border border-[var(--border)] group">
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <guide.icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{guide.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-records/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Write Your Own Kilimanjaro Story
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            You do not need to break a speed record or set an age milestone. Standing on Uhuru Peak at 5,895 metres — watching the sun rise over Africa — is a record-worthy achievement in itself. Let our guides with 200+ summits get you there safely.
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
