import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Droplets,
  ShowerHead,
  HandMetal,
  Sparkles,
  Tent,
  Heart,
  PackageCheck,
  ArrowRight,
  Info,
  CheckCircle,
  Users,
  Backpack,
  Shield,
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
  title: "Kilimanjaro Hygiene: Toilets, Showers & Staying Clean",
  description:
    "What are toilets like on Kilimanjaro? Guide to hygiene on the mountain: toilet types, washing, hand sanitiser, dental care, and staying clean during your 5-9 day trek.",
  url: "/kilimanjaro-hygiene/",
});

const hygienePackingList = [
  "Antibacterial hand sanitiser (200ml minimum — you will use it constantly)",
  "Biodegradable wet wipes (2-3 packs of 40 for a 7-day trek)",
  "Travel-size toothbrush and toothpaste",
  "Small quick-dry microfibre towel (for wash basin use)",
  "Dry shampoo or no-rinse shampoo cap",
  "Biodegradable, unscented deodorant",
  "Lip balm with SPF (lips crack badly at altitude)",
  "Moisturiser (altitude and wind dry skin rapidly)",
  "Toilet paper (1 roll — camps sometimes run out)",
  "Small ziplock bags for used wipes and waste (pack it out)",
  "Menstrual products if needed (plus extra ziplock bags)",
  "Travel-size hand soap or soap sheets",
  "Fresh underwear for each day (merino wool recommended)",
  "Spare base layer tops (merino wool dries faster and resists odour)",
  "Sunscreen SPF 50+ (reapply frequently above the tree line)",
];

const campToiletInfo = [
  {
    camp: "Gate & Lower Camps",
    type: "Permanent long-drop",
    condition: "Concrete or wooden structures, basic but functional",
    notes:
      "Busier routes like Machame and Marangu have maintained permanent structures at the gate and first camps. These are cleaned regularly by KINAPA staff but can be heavily used during peak season.",
  },
  {
    camp: "Mid-Mountain Camps",
    type: "Wooden long-drop",
    condition: "Variable — ranges from acceptable to unpleasant",
    notes:
      "Shared by all climbers at the camp. Conditions deteriorate during peak months (January-March, June-October) when hundreds of trekkers share the same facilities. No lighting — bring a head torch.",
  },
  {
    camp: "High Camps (Barafu, Kibo)",
    type: "Basic long-drop or pit latrine",
    condition: "Often the most basic on the mountain",
    notes:
      "High-altitude camps have the most rudimentary facilities. Wind, cold, and heavy usage make these the least pleasant. This is where a private portable toilet becomes genuinely worthwhile.",
  },
  {
    camp: "Summit Night",
    type: "No facilities for 8-12 hours",
    condition: "Open mountain above the last camp",
    notes:
      "There are no toilet facilities between your high camp and the summit. Climbers step off the trail and use rocks for privacy. Carry toilet paper and a ziplock bag to pack out waste.",
  },
];

const faqs = [
  {
    question: "Are there toilets on Kilimanjaro?",
    answer:
      "Yes. Every established camp on Kilimanjaro has shared long-drop pit latrines maintained by the Kilimanjaro National Park Authority (KINAPA). These are basic wooden or concrete structures over a deep pit. They are functional but not luxurious — think hole in the ground with a roof and walls. During peak season they can become heavily used and unpleasant. For a more comfortable experience, we offer a private portable toilet with a dedicated toilet tent that travels with your group.",
  },
  {
    question: "Can you shower on Kilimanjaro?",
    answer:
      "No, there are no showers anywhere on Kilimanjaro. Bathing on the mountain is limited to a warm water wash using a basin. Each morning and evening, our crew heats water and provides a washing bowl in your tent vestibule or a private washing area. You can clean your face, hands, feet, and key areas. Most climbers supplement this with biodegradable wet wipes for a more thorough clean. You will not feel properly clean until you return to your hotel after the trek — and that first shower is genuinely one of the best you will ever have.",
  },
  {
    question: "How much does a private portable toilet cost on Kilimanjaro?",
    answer:
      "A private portable toilet with a dedicated toilet tent and a porter to carry and maintain it typically costs between $80 and $150 for the entire trek, depending on the route length and operator. We include this as an optional add-on when you book. The cost covers the chemical toilet, a private tent, daily cleaning and waste management by a designated porter. Most climbers who upgrade to the private toilet say it was the single best decision they made for their trek comfort.",
  },
  {
    question: "Do the toilets on Kilimanjaro smell?",
    answer:
      "The shared long-drop latrines can be unpleasant, particularly at busy camps during peak season and at higher-altitude camps where conditions are more basic. Wind and cold at higher elevations actually reduce odour somewhat compared to lower, warmer camps. Using the facilities in the early morning before the camp fully wakes is one strategy for avoiding the worst conditions. If odour and cleanliness are a concern, the private portable toilet option eliminates this issue entirely.",
  },
  {
    question: "How do you stay clean on Kilimanjaro for 7 days?",
    answer:
      "Staying clean on Kilimanjaro is about managing expectations and using the right products. Each day: wash your face, hands, and key areas with the warm water basin provided by your crew; use biodegradable wet wipes for a more thorough wipe-down; apply deodorant; change into fresh underwear and a clean base layer if possible; use dry shampoo every 2-3 days; and brush your teeth twice daily. Hand hygiene is the most important — use sanitiser before every meal and after every toilet visit. You will not feel shower-fresh, but you can stay reasonably comfortable.",
  },
  {
    question: "Do I need to bring my own toilet paper on Kilimanjaro?",
    answer:
      "Yes, bring at least one roll of toilet paper. While our crew provides toilet paper, the shared camp latrines rarely have any supplied by the park authority. Keep a partial roll in your daypack at all times — you may need it during the trekking day, not just at camp. Carry used paper in a ziplock bag for disposal at camp, as burning or leaving paper on the mountain is prohibited and harmful to the environment.",
  },
  {
    question: "How do you wash your hands on Kilimanjaro?",
    answer:
      "Hand washing on Kilimanjaro happens in two ways: our crew provides a hand-washing station with warm water and soap at camp before every meal, and you should carry a personal supply of antibacterial hand sanitiser (at least 200ml for a 7-day trek) for use throughout the day, especially after using the toilet and before eating snacks on the trail. Hand hygiene is the single most important health practice on the mountain — gastrointestinal illness from poor hand hygiene is a more common cause of failed summits than altitude sickness.",
  },
  {
    question: "What do women do about periods on Kilimanjaro?",
    answer:
      "Menstruation on Kilimanjaro is manageable with preparation. Bring your preferred menstrual products — tampons, pads, or a menstrual cup — plus extra ziplock bags for disposal. A menstrual cup is the most practical option as it requires less frequent changing and creates less waste. If you use the private portable toilet option, you have complete privacy for changing products. Altitude and physical exertion can sometimes delay or alter your cycle, so bring supplies even if your period is not expected during the trek. Our female guides are experienced and approachable if you need any support.",
  },
  {
    question: "Is there a risk of getting sick from poor hygiene on Kilimanjaro?",
    answer:
      "Gastrointestinal illness (diarrhoea, vomiting) is actually more common than severe altitude sickness on Kilimanjaro, and poor hand hygiene is the primary cause. Bacteria and viruses spread easily in the shared camp environment — touching contaminated surfaces and then eating without washing hands is the typical transmission route. Prevent illness by: sanitising hands before every meal and after every toilet visit, not sharing water bottles, eating only food prepared by your crew (never from other groups), and avoiding touching your face. Our crew follows strict food handling protocols to minimise risk.",
  },
  {
    question: "Can I use biodegradable wet wipes on Kilimanjaro?",
    answer:
      "Yes, biodegradable wet wipes are essential for Kilimanjaro hygiene. Use them for daily body wipe-downs, after toilet visits, and for freshening up before sleep. However, even biodegradable wipes must be packed out, not buried or left on the mountain — the decomposition process takes months at high altitude. Carry ziplock bags specifically for used wipes and dispose of them in the waste bins at camp or carry them down to the gate. Bring 2-3 packs of 40 wipes for a 7-day trek.",
  },
];

export default function KilimanjaroHygienePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Hygiene on Kilimanjaro" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Hygiene on Kilimanjaro", url: "/kilimanjaro-hygiene/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Hygiene: Toilets, Showers & Staying Clean",
            description:
              "What are toilets like on Kilimanjaro? Guide to hygiene on the mountain: toilet types, washing, hand sanitiser, dental care, and staying clean during your 5-9 day trek.",
            url: "/kilimanjaro-hygiene/",
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
            alt="Trekkers on Kilimanjaro with camp facilities and mountain hygiene setup"
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
              Mountain Life Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Hygiene</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Toilets, showers, washing, and staying clean on Africa&apos;s highest mountain — the honest, practical guide from crews who have managed camp hygiene on 800+ expeditions.
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
                Hygiene on Kilimanjaro is <strong>basic but manageable</strong>. Every camp has shared long-drop toilets. There are <strong>no showers</strong> — you wash with a warm water basin provided by your crew each morning and evening. <strong>Wet wipes and hand sanitiser are essential</strong>. You will not feel properly clean for 5-9 days, but with the right products and routine, you can stay comfortable. A <strong>private portable toilet</strong> is the single best comfort upgrade you can add to your trek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toilet Facilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Tent className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Toilet Facilities on Kilimanjaro
                </h2>
                <p className="text-[var(--text-muted)] text-sm">What to expect at each camp level</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Let&apos;s address the question everyone asks but few travel companies answer honestly: <strong>what are the toilets actually like on Kilimanjaro?</strong> Every established camp has shared pit latrines maintained by the Kilimanjaro National Park Authority (KINAPA). These are long-drop toilets — essentially a deep hole in the ground with a wooden or concrete structure around it for privacy. There is no flushing mechanism, no running water, and no lighting.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              The quality and cleanliness of these shared facilities varies dramatically depending on the camp, the route, the season, and how many trekkers are sharing them. During peak season on the Machame and Marangu routes, hundreds of climbers may share the same small number of latrines at a single camp. Lower-traffic routes like Lemosho and Rongai — which pass through quieter <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] hover:underline font-semibold">climate zones</Link> — tend to have less-used and therefore cleaner facilities.
            </p>

            <div className="space-y-4 mb-8">
              {campToiletInfo.map((camp) => (
                <div
                  key={camp.camp}
                  className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{camp.camp}</h3>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold shrink-0 ml-3">
                      {camp.type}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-2 italic">{camp.condition}</p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{camp.notes}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Head torch essential:</strong> Camp latrines have no lighting. If you need to use the facilities at night — and you almost certainly will, since altitude increases urination frequency — you will need a head torch. Keep it beside your sleeping bag, along with your boots and toilet paper, so you are not fumbling in the dark at 2 AM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Washing & Showers */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Washing &amp; Showers
                </h2>
                <p className="text-[var(--text-muted)] text-sm">No showers — but you can still stay clean</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              There are <strong>no showers on Kilimanjaro</strong> — not at any camp, on any route, at any price point. This surprises some climbers, particularly those who have trekked in regions with more developed infrastructure. On Kilimanjaro, every drop of water must be carried up the mountain or collected from streams and purified.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              What our crew provides instead is a <strong>warm water washing basin</strong> — a bowl of heated water delivered to your tent vestibule each morning and evening. This is your opportunity to wash your face, hands, neck, feet, and underarms. It is not a shower, but it is surprisingly refreshing after a long day of trekking. Many climbers describe the evening wash as one of the small luxuries they look forward to at camp.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              To supplement the basin wash, <strong>biodegradable wet wipes are the single most important hygiene item</strong> in your pack — include them alongside the essentials on your <Link href="/kilimanjaro-climbing-gear/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro gear checklist</Link>. Use them for a full body wipe-down in the privacy of your tent. They remove sweat, sunscreen, and trail dust far more effectively than the basin alone. Budget 5-6 wipes per day for a thorough clean, and pack used wipes into ziplock bags for proper disposal.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Morning Wash Routine
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Warm water basin delivered to your tent
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Wash face, hands, and neck
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Apply sunscreen and lip balm
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Fresh deodorant and base layer
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Evening Wash Routine
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Warm water basin for face, hands, feet
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Full body wipe-down with wet wipes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Change into clean sleeping clothes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Moisturise hands and face (altitude dries skin)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Pro tip:</strong> That first shower after descending the mountain — back at your hotel in Moshi or Arusha — is universally described as one of the best showers of your life. Seven days of mountain grime washing away is genuinely euphoric. Something to look forward to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hand Hygiene */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <HandMetal className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Hand Hygiene — The Most Important Rule
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Preventing illness matters more than smelling fresh</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              If you take one thing from this guide, make it this: <strong>hand hygiene is the single most critical health practice on Kilimanjaro</strong>. Gastrointestinal illness — diarrhoea, vomiting, stomach cramps — is actually more common than severe altitude sickness and is a more frequent cause of failed summit attempts. The culprit is almost always <strong>faecal-oral transmission</strong> from inadequate hand washing after using the shared latrines.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Our crew sets up a <strong>hand-washing station with warm water and soap</strong> at camp before every <Link href="/kilimanjaro-food-meals/" className="text-[var(--primary)] hover:underline font-semibold">meal on the mountain</Link>. Use it every single time — no exceptions. Between meals and on the trail, use antibacterial hand sanitiser with at least 60% alcohol content. Apply it after every toilet visit, before eating trail snacks, after blowing your nose, and after touching shared surfaces like cabin doors on the Marangu route.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Bring at least <strong>200ml of hand sanitiser</strong> for a 7-day trek — more than you think you need. Decant it into a small bottle that clips to your daypack harness so it is always within reach. Do not share water bottles with other climbers, and avoid touching your face on the trail. These simple habits are more protective than any medication you can carry.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> If you develop diarrhoea or vomiting on Kilimanjaro, tell your guide immediately. Dehydration from GI illness at altitude is dangerous — your body is already working harder to process limited oxygen, and fluid loss compounds the problem rapidly. Our guides carry oral rehydration salts and can adjust your schedule to allow recovery time. Do not try to tough it out in silence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dental Care */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Dental Care on the Mountain
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Dental hygiene is easy to neglect when you are exhausted at the end of a trekking day, but brushing your teeth twice daily is important — not just for oral health, but because a <strong>clean mouth reduces the bacterial load</strong> that can contribute to respiratory infections at altitude. Cold, dry air already irritates your throat and airways; a mouth full of bacteria makes this worse.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Use a small amount of the warm water from your basin to brush. Spit toothpaste away from water sources and trails — the Leave No Trace principle applies to dental care too. At higher camps where water is more precious and temperatures drop below freezing at night, keep your toothbrush and toothpaste inside your sleeping bag to prevent them from freezing solid.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              If you wear a retainer or mouthguard at night, bring it. Altitude sleep is already disrupted — familiar comfort items help. If you have any dental concerns, visit your dentist before your trip. A toothache at 4,600 metres with no dental care available is a genuinely miserable experience, and it has caused climbers to descend early.
            </p>
          </div>
        </div>
      </section>

      {/* Staying Fresh */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Staying Fresh for 5-9 Days
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Practical tips that actually work on the mountain</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Let&apos;s be honest: you will not smell great on Kilimanjaro. Neither will anyone else. After the first two days, everyone on the mountain has accepted this reality, and it ceases to matter. But there are practical strategies that make a genuine difference to how <strong>comfortable</strong> you feel, even if you cannot achieve true cleanliness.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Fresh Underwear Daily</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    This is the single biggest comfort factor. Pack a clean pair of underwear for each day of the trek. <strong>Merino wool is ideal</strong> — it resists odour, wicks moisture, dries quickly, and regulates temperature. Synthetic underwear develops odour rapidly. Cotton retains moisture and chafes. After wearing, seal used underwear in a ziplock bag to contain odour in your duffel.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dry Shampoo Every 2-3 Days</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Dry shampoo absorbs oil and sweat from your hair without water. Apply it at night, work it into your roots, and brush or shake out in the morning. Alternatively, no-rinse shampoo caps (used in hospitals) are a more thorough option. Either way, your hair will be one of the first things you wash in that glorious post-trek shower.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Biodegradable Deodorant</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Apply deodorant each morning after your basin wash. Choose an unscented, biodegradable option — strong fragrances can attract insects at lower elevations. Roll-on or stick deodorant works better than spray at altitude, where aerosol cans may not function properly in the cold and low pressure.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-700 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Rotate Base Layers</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Bring at least two merino wool base layer tops and alternate them daily. Hang the worn one on the outside of your daypack during the day — UV light and dry mountain air help reduce bacteria and odour. Merino wool can be worn for 3-4 days before becoming truly unpleasant, compared to synthetic fabrics which develop odour after one day.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-purple-700 font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Foot Care Is Hygiene Too</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Wash your feet with the evening basin water and dry them thoroughly, especially between the toes. Change into fresh, dry socks at camp. If you develop blisters, clean and dress them properly — infection at altitude heals slowly. Bring foot powder to reduce moisture during the day, and air your boots out at camp whenever possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Toilet Option */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The Private Portable Toilet Option
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                The single most popular comfort upgrade — and the one climbers consistently say they&apos;re most glad they chose.
              </p>
            </div>

            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              We offer a <strong>private portable chemical toilet</strong> as an add-on for any Kilimanjaro trek. This is a proper toilet seat mounted on a portable base with a chemical holding tank, housed in its own <strong>dedicated privacy tent</strong> that is set up and taken down at each camp by a designated porter.
            </p>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              How it works: a porter carries the toilet and tent as part of the group&apos;s equipment. When you arrive at camp, the toilet tent is erected near your sleeping tent but at a respectful distance from the dining area. The chemical tank is emptied and cleaned daily by the designated porter using environmentally safe chemicals. The toilet tent has a zip-close door and is exclusively for your use (or your group&apos;s use if you are travelling together).
            </p>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              The cost is typically <strong>$80-$150 for the entire trek</strong>, depending on the number of days and the route. This covers the equipment, the porter&apos;s wage, and all waste management. Relative to the total cost of a Kilimanjaro trek, it is a modest upgrade that delivers an outsized improvement in comfort — particularly during freezing nights at high camps when the alternative is a 100-metre walk to a shared latrine in the dark.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center">
                <Tent className="w-8 h-8 text-[var(--secondary)] mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Private Tent</h3>
                <p className="text-sm text-white/60">Your own toilet tent set up at every camp, zipped for complete privacy</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center">
                <Sparkles className="w-8 h-8 text-[var(--secondary)] mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Cleaned Daily</h3>
                <p className="text-sm text-white/60">Dedicated porter empties, cleans, and maintains the toilet each day</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center">
                <Shield className="w-8 h-8 text-[var(--secondary)] mx-auto mb-3" />
                <h3 className="font-semibold mb-1">$80-$150 Total</h3>
                <p className="text-sm text-white/60">For the entire trek — the best value comfort upgrade available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Hygiene */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center">
                <Heart className="w-7 h-7 text-pink-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Women&apos;s Hygiene on Kilimanjaro
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Practical advice for female climbers</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Managing menstruation on Kilimanjaro is straightforward with preparation. The most important thing to know is that <strong>altitude and intense physical exertion can disrupt your menstrual cycle</strong> — periods may arrive early, late, be heavier than normal, or skip entirely. Bring supplies regardless of your expected timing.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              A <strong>menstrual cup</strong> is the most practical option for the mountain. It can be worn for up to 12 hours, creates no waste, requires only a rinse with clean water (which you can request from the crew), and eliminates the need to carry and dispose of used products. If you prefer pads or tampons, bring more than you think you need and carry ziplock bags for used products — there are no waste bins in the latrines.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The <strong>private portable toilet</strong> is particularly valuable for women managing their periods, as it provides complete privacy for changing menstrual products without the time pressure and discomfort of shared latrines. Our female guides have extensive experience supporting women on the mountain and are approachable about any concerns — nothing surprises them, and nothing is too personal to ask.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              For more detailed advice on climbing Kilimanjaro as a woman — covering fitness, clothing, safety, and the social experience — see our dedicated{" "}
              <Link
                href="/kilimanjaro-women-climbing/"
                className="text-[var(--primary)] hover:underline font-semibold"
              >
                women&apos;s guide to climbing Kilimanjaro
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* What to Pack for Hygiene */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Backpack className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Hygiene Packing Checklist
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Everything you need to stay clean on the mountain</p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Pack these items in a dedicated waterproof bag within your duffel. Keep hand sanitiser, toilet paper, and a small pack of wet wipes in your daypack for access during the trekking day. For a complete gear list beyond hygiene, see our full{" "}
              <Link
                href="/kilimanjaro-climbing-gear/"
                className="text-[var(--primary)] hover:underline font-semibold"
              >
                Kilimanjaro climbing gear guide
              </Link>
              .
            </p>

            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm">
              <ul className="space-y-3">
                {hygienePackingList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3 mt-6">
              <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <div>
                <p className="text-emerald-800 text-sm font-semibold mb-1">Weight consideration</p>
                <p className="text-emerald-800 text-sm">
                  All hygiene items combined should weigh under 1kg. Do not over-pack — travel-size everything. Your porter carries your duffel (max 15kg), so hygiene supplies are a negligible weight addition for a significant comfort improvement.
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
              <Link href="/climbing-kilimanjaro/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/kilimanjaro-climbing-gear/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Backpack className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Gear Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Full packing list</p>
              </Link>
              <Link href="/kilimanjaro-food-meals/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <PackageCheck className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Food &amp; Meals</p>
                <p className="text-xs text-[var(--text-muted)]">What you eat on the mountain</p>
              </Link>
              <Link href="/kilimanjaro-women-climbing/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Women&apos;s Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Female climbers&apos; advice</p>
              </Link>
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
              <Link href="/trekking/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Trekking Routes</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all routes</p>
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Group Departures</p>
                <p className="text-xs text-[var(--text-muted)]">Join a scheduled climb</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-hygiene/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Climb Kilimanjaro in Comfort
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            With warm water basins, hand-washing stations, experienced camp crews, and the option of a private portable toilet — we handle the logistics so you can focus on the summit.
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
