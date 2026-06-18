import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Heart,
  Shield,
  Users,
  ArrowRight,
  Star,
  Backpack,
  Droplets,
  Sparkles,
  Award,
  MapPin,
  UserCheck,
  Info,
  CheckCircle,
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
  title: "Women Climbing Kilimanjaro: Complete Guide 2026",
  description:
    "Everything women need to know about climbing Kilimanjaro: safety, fitness tips, what to pack, hygiene on the mountain, solo female travel, and women-only group departures.",
  url: "/kilimanjaro-women-climbing/",
});

const womenSpecificGear = [
  {
    item: "High-Support Sports Bras",
    description:
      "Bring at least three high-impact sports bras with moisture-wicking fabric. You will be trekking 5-8 hours daily over uneven terrain, and a supportive, comfortable bra is essential. Avoid underwire styles that can chafe at altitude. Compression-style bras dry faster and pack smaller.",
  },
  {
    item: "Menstrual Products",
    description:
      "Pack your preferred menstrual products plus extras — altitude and physical exertion can cause irregular periods, even if you are not expecting yours. Menstrual cups are popular among female trekkers because they are reusable, lightweight, and can be worn for up to 12 hours. Bring disposal bags for used products — do not leave anything on the mountain.",
  },
  {
    item: "Pee Funnel / Female Urination Device",
    description:
      "A lightweight female urination device (such as a Shewee or pStyle) allows you to urinate standing up — a genuine game-changer on summit night when it is minus 15 degrees Celsius and removing layers is the last thing you want to do. Practice using it at home before your climb.",
  },
  {
    item: "Moisture-Wicking Underwear",
    description:
      "Pack 5-7 pairs of synthetic or merino wool underwear. Cotton traps moisture and increases the risk of chafing and yeast infections at altitude. Merino wool is naturally anti-bacterial and can be worn for multiple days if needed. Anti-chafing balm or powder is also worth packing.",
  },
  {
    item: "High-SPF Skincare &amp; Lip Balm",
    description:
      "UV radiation increases by approximately 10-12% for every 1,000 metres of elevation gain. At Kilimanjaro&apos;s summit, UV exposure is nearly 50% stronger than at sea level. Bring SPF 50+ sunscreen, SPF lip balm, and a rich moisturiser — the dry mountain air strips moisture from your skin rapidly.",
  },
  {
    item: "Headlamp with Red Light Mode",
    description:
      "Essential for summit night and any trips to the toilet tent after dark. Choose a headlamp with a red light mode so you do not blind your tent-mate. Keep it in your sleeping bag at night so the battery stays warm — cold batteries drain faster at altitude.",
  },
];

const hygieneTopics = [
  {
    icon: Droplets,
    title: "Toilet Facilities on the Mountain",
    description:
      "Every camp has toilet facilities — either a toilet tent with a portable chemical toilet (on private climbs) or long-drop pit latrines (on public routes). Our private toilet tent is cleaned daily and set up at every camp before you arrive. It is not glamorous, but it is private and functional. On summit night, there are no facilities — you will use the darkness and distance from the trail. This is where a female urination device earns its place in your pack.",
  },
  {
    icon: Sparkles,
    title: "Washing &amp; Staying Clean",
    description:
      "Each evening, our porters bring a basin of warm water to your tent for washing. You will not shower for the duration of your climb (5-9 days depending on your route), but daily basin washes, wet wipes, and dry shampoo keep you surprisingly comfortable. Pack biodegradable wet wipes — they are your best friend on the mountain. Baby wipes work perfectly for a full-body wipe-down.",
  },
  {
    icon: Heart,
    title: "Managing Periods at Altitude",
    description:
      "Altitude and intense physical exertion can make your period arrive early, late, or with different flow than usual — even if you track your cycle precisely. Many women choose to use hormonal contraception to skip their period during the climb (consult your doctor well in advance). If you do menstruate on the mountain, menstrual cups work well at altitude because you can wear them longer, and there is less waste to carry. Bring sealable bags for used products. Your guides are professional and discreet — do not feel embarrassed about anything related to your cycle.",
  },
  {
    icon: Shield,
    title: "Privacy on the Mountain",
    description:
      "You will have your own tent (unless you choose to share with a travel companion). Changing clothes, washing, and managing personal hygiene all happen in the privacy of your tent. Our guides always announce themselves before approaching, and the toilet tent is positioned away from the main camp for privacy. On women-only departures, the entire group dynamic shifts — conversations about periods, toileting, and hygiene happen openly and supportively.",
  },
];

const safetyPoints = [
  {
    icon: Users,
    title: "Group Climbs Offer Built-In Safety",
    description:
      "Joining a group departure means you climb with a team of fellow trekkers and a full crew of guides, porters, and a cook. You are never alone on the mountain. Our group departures typically have 6-12 climbers, providing both camaraderie and security. Many solo female travellers tell us that the group becomes a close-knit family by summit night.",
    link: "/kilimanjaro-join-group-departures/",
    linkText: "View upcoming group departures",
  },
  {
    icon: UserCheck,
    title: "Professional Guide Teams",
    description:
      "Every Snow Africa expedition is led by TATO-licensed guides with Wilderness First Responder certification and years of experience. Our senior guides have led hundreds of summits, including all-women groups. They are trained to create a supportive, safe environment for all climbers. Female assistant guides are available on request for women-only departures.",
  },
  {
    icon: Shield,
    title: "Tanzania Is Safe for Women Travellers",
    description:
      "Tanzania is one of the most popular destinations in Africa for solo female travellers. The tourism industry is well-established and professional. Tanzanian culture is warm and welcoming. On the mountain itself, you are surrounded by your guide team at all times — safety is rarely a concern once your climb begins. In towns like Moshi and Arusha, standard travel precautions apply: avoid walking alone at night, use reputable transport, and keep valuables secure.",
  },
  {
    icon: MapPin,
    title: "Pre- &amp; Post-Climb Safety",
    description:
      "We arrange airport transfers, hotel accommodation in Moshi, and all ground transport — you are looked after from arrival to departure. Our local team is available by phone throughout your trip. Many of our female clients arrive a day early to adjust to the time zone and explore Moshi&apos;s coffee farms and local markets with a guide.",
  },
];

const notableWomen = [
  {
    name: "Angela Vorobeva",
    achievement: "Fastest female ascent — reached Uhuru Peak in 10 hours 6 minutes in 2015.",
  },
  {
    name: "Anne Lorimor",
    achievement: "Oldest woman to summit Kilimanjaro — reached the top at age 89 in 2019.",
  },
  {
    name: "Montannah Kenney",
    achievement: "Youngest girl to summit — climbed Kilimanjaro at age 7 in 2018, raising funds for clean water in Tanzania.",
  },
  {
    name: "Leah Crane",
    achievement: "British grandmother who summited Kilimanjaro at age 85, proving that age is not a barrier.",
  },
  {
    name: "Tanzanian Women Porters",
    achievement: "A growing movement of Tanzanian women working as porters and guides on Kilimanjaro — breaking barriers in a traditionally male-dominated profession. Several women-led porter organisations now operate on the mountain.",
  },
];

const routeRecommendations = [
  {
    route: "Lemosho 8-Day",
    days: 8,
    profile: "Excellent",
    profileColor: "bg-emerald-100 text-emerald-700",
    successRate: "93%",
    slug: "8-days-lemosho-route",
    notes: "Best acclimatization profile. Scenic western approach. Our top recommendation for all climbers, including first-time women trekkers.",
    recommended: true,
  },
  {
    route: "Machame 7-Day",
    days: 7,
    profile: "Good",
    profileColor: "bg-amber-100 text-amber-700",
    successRate: "85%",
    slug: "7-days-machame-route",
    notes: "Popular and scenic. Extra acclimatization day makes a significant difference over the 6-day version.",
  },
  {
    route: "Northern Circuit 9-Day",
    days: 9,
    profile: "Best",
    profileColor: "bg-emerald-100 text-emerald-700",
    successRate: "95%",
    notes: "Longest route with the best acclimatization of any Kilimanjaro route. Quietest trail. Ideal if time allows.",
  },
  {
    route: "Rongai 7-Day",
    days: 7,
    profile: "Good",
    profileColor: "bg-amber-100 text-amber-700",
    successRate: "85%",
    slug: "6-days-rongai-route",
    notes: "Gradual ascent from the drier north side. Less crowded. Good option for those who prefer a quieter experience.",
  },
];

const faqs = [
  {
    question: "Is Kilimanjaro safe for women to climb?",
    answer:
      "Absolutely. Kilimanjaro is one of the safest high-altitude treks in the world, and thousands of women summit every year. Approximately 40% of all Kilimanjaro climbers are women. You climb with a full team of licensed guides, porters, and a cook — you are never alone. Tanzania is one of Africa&apos;s most popular destinations for solo female travellers, and the mountain itself is a well-managed national park with established safety protocols.",
  },
  {
    question: "How do I manage my period on Kilimanjaro?",
    answer:
      "Many women successfully manage their periods on Kilimanjaro. Options include menstrual cups (popular because they are reusable and can be worn for up to 12 hours), tampons, or pads. Some women choose to use hormonal contraception to skip their period during the climb — consult your doctor well in advance if this interests you. Altitude and exertion can make your cycle unpredictable, so pack menstrual products regardless of timing. Bring sealable disposal bags for used products. Your guides are professional and discreet — this is completely normal.",
  },
  {
    question: "Can I climb Kilimanjaro solo as a woman?",
    answer:
      "Yes, many women climb Kilimanjaro as solo travellers. You are not truly alone — you join a group departure with other trekkers or book a private climb with your own dedicated guide team. Many of our solo female clients say the group becomes like family. We arrange airport transfers, hotel accommodation, and all ground transport, so you are supported from arrival to departure. Solo female travel in Tanzania is common and safe with standard precautions.",
  },
  {
    question: "Do you offer women-only group departures?",
    answer:
      "Yes, we offer women-only group departures throughout the climbing season. These are led by our most experienced guides, with female assistant guides available on request. Women-only groups create a uniquely supportive atmosphere — conversations about hygiene, fitness concerns, and personal challenges happen more openly. Check our group departures page for upcoming women-only dates, or contact us to arrange a private women-only climb for your group.",
  },
  {
    question: "What are the toilet facilities like for women?",
    answer:
      "Every camp has toilet facilities. On our private climbs, we provide a toilet tent with a portable chemical toilet that is cleaned daily and set up before you arrive at camp. On public routes, long-drop pit latrines are available. A female urination device (such as a Shewee) is highly recommended for summit night, when temperatures drop to minus 15 degrees Celsius and removing layers is extremely unpleasant. Your own toilet tent provides privacy throughout the climb.",
  },
  {
    question: "What fitness level do women need for Kilimanjaro?",
    answer:
      "The same fitness level as men — Kilimanjaro does not require different preparation for women. You should be able to hike 6-8 hours per day over multiple consecutive days and feel comfortable on steep, uneven terrain. A 12-week training programme focused on cardiovascular endurance, leg strength, and back-to-back long hikes is ideal. Physical fitness does not prevent altitude sickness (that is genetic), but being fit means your body has more reserves to handle the demands of the climb.",
  },
  {
    question: "What should women pack differently for Kilimanjaro?",
    answer:
      "The core gear list is the same for everyone, but women should also pack: high-support sports bras (at least three), moisture-wicking synthetic or merino wool underwear (5-7 pairs — avoid cotton), menstrual products plus extras, a female urination device, anti-chafing balm, high-SPF sunscreen and lip balm, and a rich moisturiser for the dry mountain air. See our full gear guide for the complete packing list.",
  },
  {
    question: "Are there female guides on Kilimanjaro?",
    answer:
      "Yes, and their numbers are growing. While the majority of Kilimanjaro guides are still male, a new generation of Tanzanian women is entering the profession. Several women-led porter and guide organisations now operate on the mountain, and the industry is actively working to increase female representation. We can arrange female assistant guides for women-only departures on request. All our guides, regardless of gender, are TATO-licensed and trained to support female climbers.",
  },
  {
    question: "Is altitude sickness different for women?",
    answer:
      "Research suggests that women may experience altitude sickness at similar or slightly lower rates than men, though the difference is not significant enough to change preparation strategies. Hormonal fluctuations can influence how you feel at altitude, and some women report that symptoms are worse during certain phases of their menstrual cycle. The prevention strategies are identical: choose a 7+ day route, hydrate aggressively (3-4 litres per day), ascend slowly, and consider prophylactic Diamox. Our guides monitor all climbers with twice-daily pulse oximetry.",
  },
  {
    question: "Can I climb Kilimanjaro while pregnant?",
    answer:
      "No. Medical guidelines strongly advise against high-altitude trekking during pregnancy. The reduced oxygen levels above 2,500 metres can affect foetal development, and the physical demands of a multi-day trek combined with altitude sickness risk make it unsafe. Additionally, emergency evacuation from the mountain is slow — hours, not minutes — which is unacceptable when pregnancy complications can arise. We recommend completing your Kilimanjaro climb before or after pregnancy. Consult your doctor for personalised advice.",
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
    href: "/kilimanjaro-training-plan/",
    icon: Heart,
    title: "Training Plan",
    subtitle: "12-week preparation",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: Backpack,
    title: "Gear Checklist",
    subtitle: "What to pack",
  },
  {
    href: "/kilimanjaro-safety/",
    icon: Shield,
    title: "Safety Guide",
    subtitle: "Health & safety on the mountain",
  },
  {
    href: "/can-beginners-climb-kilimanjaro/",
    icon: Star,
    title: "Beginners Guide",
    subtitle: "First-time climbers",
  },
  {
    href: "/kilimanjaro-join-group-departures/",
    icon: Users,
    title: "Group Departures",
    subtitle: "Join a scheduled climb",
  },
];

export default function KilimanjaroWomenClimbingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Women Climbing Kilimanjaro" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            {
              name: "Women Climbing Kilimanjaro",
              url: "/kilimanjaro-women-climbing/",
            },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Women Climbing Kilimanjaro: Complete Guide 2026",
            description:
              "Everything women need to know about climbing Kilimanjaro: safety, fitness tips, what to pack, hygiene on the mountain, solo female travel, and women-only group departures.",
            url: "/kilimanjaro-women-climbing/",
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
            alt="Women trekkers ascending Kilimanjaro with guide team on a clear morning"
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
              Women&apos;s Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Women Climbing{" "}
              <span className="text-[var(--secondary)]">Kilimanjaro</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Everything you need to know — safety, fitness, packing, hygiene,
              solo travel, and women-only departures. From a team that has guided
              hundreds of women to Uhuru Peak.
            </p>
          </div>
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Quick Answer Box */}
      <section className="py-12 bg-white border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-bold mb-4">
                The Quick Answer
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Kilimanjaro is{" "}
                <strong>incredibly popular with women climbers</strong> —
                approximately <strong>40% of all Kilimanjaro trekkers are women</strong>,
                and that number is growing every year. It is safe, it is
                achievable, and it does not require superhuman fitness. The
                mountain does not care about your gender — the same preparation,
                acclimatization, and determination that get men to the summit
                work equally well for women. You belong on this mountain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Women on Kilimanjaro: The Reality */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Women on Kilimanjaro: The Reality
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Let us be direct: climbing Kilimanjaro as a woman is{" "}
              <strong>not fundamentally different from climbing it as a man</strong>.
              The altitude affects everyone. The training requirements are the
              same. The routes are the same. The summit success rates are the
              same. The mountain does not discriminate.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              What is different is the practical detail — and that is exactly what
              this guide covers. Managing your period at 4,600 metres, using a
              toilet tent in sub-zero temperatures, packing the right sports bra,
              understanding <Link href="/kilimanjaro-hygiene/" className="text-[var(--primary)] hover:underline font-semibold">hygiene and privacy arrangements</Link>, and knowing what to expect as a
              solo female traveller in Tanzania. These are legitimate questions
              that deserve honest, specific answers.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The women we guide come from every background — corporate
              executives, teachers, students, retirees, mothers, grandmothers.
              Some are experienced hikers; others have never slept in a tent. Ages
              range from 18 to 75+. Many travel <Link href="/kilimanjaro-solo-climb/" className="text-[var(--primary)] hover:underline font-semibold">solo to climb Kilimanjaro</Link> and find the experience even more empowering. What they share is a decision to do something
              extraordinary. On our expeditions, we have watched women push
              through summit night with more grit than anyone around them — and
              break down in joyful tears at Uhuru Peak.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro is{" "}
              <strong>
                one of the most empowering experiences a woman can have
              </strong>
              . There is something profound about standing at the highest point in
              Africa, above the clouds, knowing that every step was earned by your
              own two feet. No helicopters, no shortcuts, no tricks — just you,
              the mountain, and the sunrise over the African continent.
            </p>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)]">
                    ~40%
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    of Kilimanjaro climbers are women
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)]">
                    50,000+
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    climbers attempt Kilimanjaro annually
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)]">
                    93%
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    summit success on 8-day routes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Preparation */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Physical Preparation
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The training programme for women climbing Kilimanjaro is{" "}
              <strong>identical to the programme for men</strong>. There is no
              need for a gender-specific approach. Your body needs to be
              prepared for 5-8 hours of daily hiking over consecutive days at
              altitude, carrying a small daypack on steep, uneven terrain.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              A 12-week training plan focused on three pillars works best:{" "}
              <strong>cardiovascular endurance</strong> (hiking, running, cycling),{" "}
              <strong>leg and core strength</strong> (squats, lunges, step-ups),
              and <strong>back-to-back long hikes</strong> to condition your
              body for consecutive days of trekking. The single most important
              training session is a long hike on consecutive weekend days — this
              simulates the cumulative fatigue of multi-day trekking far better
              than any gym session.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Remember: physical fitness does not prevent altitude sickness.
              Marathon runners and ultra-fit athletes get AMS at the same rate
              as moderately fit hikers. Fitness helps you cope with the physical
              demands so your body can focus its energy on acclimatization.
              Train for the trek, but rely on route choice and proper <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline font-semibold">safety and acclimatization protocols</Link> for the altitude.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/kilimanjaro-training-plan/"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
              >
                View Our 12-Week Training Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/can-beginners-climb-kilimanjaro/"
                className="inline-flex items-center gap-2 border border-[var(--border)] px-5 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
              >
                Can Beginners Climb Kilimanjaro?
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack: Women-Specific Gear */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What to Pack: Women-Specific Gear
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The core{" "}
              <Link
                href="/kilimanjaro-climbing-gear/"
                className="text-[var(--primary)] hover:underline"
              >
                Kilimanjaro packing list
              </Link>{" "}
              is the same for everyone. These are the additional items women
              should bring.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
            {womenSpecificGear.map((gear) => (
              <div
                key={gear.item}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Backpack className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="font-heading font-bold">{gear.item}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {gear.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link
              href="/kilimanjaro-climbing-gear/"
              className="text-[var(--primary)] hover:underline font-semibold inline-flex items-center gap-1"
            >
              View the complete Kilimanjaro gear checklist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* Hygiene on the Mountain */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Hygiene on the Mountain
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              One of the most common concerns for women considering Kilimanjaro.
              Here is the honest truth about staying clean and managing personal
              hygiene at altitude.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {hygieneTopics.map((topic) => (
              <div
                key={topic.title}
                className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <topic.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety for Solo Female Climbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Safety for Solo Female Climbers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Climbing Kilimanjaro alone as a woman? Here is why you can do it
              with confidence — and what we do to keep you safe every step of
              the way.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {safetyPoints.map((point) => (
              <div
                key={point.title}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {point.description}
                </p>
                {point.link && (
                  <Link
                    href={point.link}
                    className="text-sm text-[var(--primary)] hover:underline mt-3 inline-flex items-center gap-1"
                  >
                    {point.linkText}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Women-Only Group Departures */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Women-Only Group Departures
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Climb Kilimanjaro in the company of like-minded women — an
                experience that transforms a trek into a lifelong bond.
              </p>
            </div>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                We offer <strong className="text-white">dedicated women-only group departures</strong>{" "}
                throughout the climbing season on our most popular routes.
                These expeditions are led by our most experienced guides,
                with female assistant guides available on request.
              </p>
              <p>
                Women-only groups create a uniquely supportive dynamic. When
                every member of the group shares similar concerns — about
                toileting, periods, fitness anxieties, and personal space — the
                conversations happen openly and without awkwardness. Women
                encourage each other, share tips, and form friendships that last
                long after the summit photo.
              </p>
              <p>
                The benefits extend to the practical: no competition to hide
                discomfort, no pressure to keep pace with someone else&apos;s
                schedule, and a shared understanding that looking after yourself
                is not weakness — it is what gets you to the top.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <Users className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="font-semibold text-sm">6-12 Women Per Group</p>
                <p className="text-xs text-white/50 mt-1">
                  Small enough to bond, large enough to celebrate
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <Shield className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="font-semibold text-sm">
                  Experienced Female Guides
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Female assistant guides available on request
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <Heart className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <p className="font-semibold text-sm">Supportive Atmosphere</p>
                <p className="text-xs text-white/50 mt-1">
                  Open, honest, and encouraging
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                View Upcoming Group Departures
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Female Guides on Kilimanjaro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Female Guides on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro guiding has been a male-dominated profession for
              decades, but that is changing. A growing number of{" "}
              <strong>Tanzanian women are training and working as mountain guides
              and porters</strong>, breaking barriers and inspiring the next
              generation.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Organisations like the Kilimanjaro Porters Assistance Project
              (KPAP) have been instrumental in supporting women in the mountain
              tourism industry. Female porters carry the same loads as their
              male counterparts, and female guides lead expeditions with the
              same skill and authority. Their presence on the mountain is
              growing, and we actively support this shift.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              For women-only departures, we can arrange{" "}
              <strong>female assistant guides</strong> who understand the
              specific needs and concerns of female climbers from personal
              experience. Having a female guide on your team adds another layer
              of comfort and relatability — someone who has managed her own
              period at 4,600 metres, who knows exactly which sports bra works
              best, and who can speak to the physical and emotional challenges
              of the climb from a woman&apos;s perspective.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <p className="text-emerald-800 text-sm">
                <strong>Supporting women in mountain tourism:</strong> When you
                climb with Snow Africa, a portion of your trek fee supports
                local community initiatives, including programmes that train and
                employ women in the mountain tourism industry. Your climb
                contributes to a more equitable future for Kilimanjaro&apos;s
                guiding community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration: Notable Women on Kilimanjaro */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Inspiration: Notable Women on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Women have been setting records and breaking barriers on
              Kilimanjaro for decades. Here are some who prove that the summit
              belongs to everyone.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {notableWomen.map((woman) => (
              <div
                key={woman.name}
                className="bg-white rounded-xl p-6 border border-[var(--border)] shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{woman.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {woman.achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Recommendations for Women */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Route Recommendations for Women
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The best route for women is the{" "}
              <strong>same as the best route for men</strong> — whichever gives
              you the most days on the mountain for proper acclimatization. We
              recommend a minimum of 7 days.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Acclimatization
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Success Rate
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {routeRecommendations.map((route, i) => (
                  <tr
                    key={route.route}
                    className={`border-t border-[var(--border)] ${
                      route.recommended
                        ? "bg-emerald-50"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {route.slug ? (
                        <Link
                          href={`/trekking/${route.slug}/`}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {route.route}
                        </Link>
                      ) : (
                        route.route
                      )}
                      {route.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{route.days}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${route.profileColor}`}
                      >
                        {route.profile}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700">
                      {route.successRate}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {route.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link
              href="/climbing-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              See our complete Kilimanjaro guide for detailed route comparisons
              &rarr;
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
      <section className="py-12 bg-white border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
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

      <KnowledgeBase exclude="/kilimanjaro-women-climbing/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Join the thousands of women who have stood at Africa&apos;s highest
            point. With experienced guides, women-only departures, and a 93%
            summit success rate on our recommended routes — your Kilimanjaro
            journey starts here.
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
