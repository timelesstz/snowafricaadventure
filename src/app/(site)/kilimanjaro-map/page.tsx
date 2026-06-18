import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Map,
  Compass,
  Navigation,
  ArrowRight,
  MapPin,
  TrendingUp,
  Tent,
  Flag,
  Layers,
  Route,
  Info,
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
  title: "Kilimanjaro Map: Routes, Camps & Gates Guide",
  description:
    "Interactive Kilimanjaro map guide: all 7 routes, 40+ camps, gate locations, summit approaches. Elevation profiles and route comparisons with detailed descriptions.",
  url: "/kilimanjaro-map/",
});

const routeOverview = [
  {
    name: "Marangu Route",
    gate: "Marangu Gate (1,840m)",
    days: "5–6",
    difficulty: "Moderate",
    scenery: "Good",
    successRate: "65–75%",
    slug: "/trekking/6-days-marangu-route/",
    highlight: "Only route with hut accommodation",
  },
  {
    name: "Machame Route",
    gate: "Machame Gate (1,640m)",
    days: "6–7",
    difficulty: "Moderate–Hard",
    scenery: "Excellent",
    successRate: "75–85%",
    slug: "/trekking/7-days-machame-route/",
    highlight: "Most popular route, scenic western approach",
  },
  {
    name: "Lemosho Route",
    gate: "Londorossi Gate (2,100m)",
    days: "7–8",
    difficulty: "Moderate",
    scenery: "Excellent",
    successRate: "90–95%",
    slug: "/trekking/8-days-lemosho-route/",
    highlight: "Best acclimatization profile, our top pick",
    recommended: true,
  },
  {
    name: "Shira Route",
    gate: "Londorossi Gate (2,100m)",
    days: "7–8",
    difficulty: "Moderate–Hard",
    scenery: "Excellent",
    successRate: "85–90%",
    slug: "/trekking/8-days-lemosho-route/",
    highlight: "High-altitude start across Shira Plateau",
  },
  {
    name: "Rongai Route",
    gate: "Rongai Gate (1,950m)",
    days: "6–7",
    difficulty: "Moderate",
    scenery: "Good",
    successRate: "80–85%",
    slug: "/trekking/6-days-rongai-route/",
    highlight: "Only northern approach, drier conditions",
  },
  {
    name: "Umbwe Route",
    gate: "Umbwe Gate (1,630m)",
    days: "5–6",
    difficulty: "Very Hard",
    scenery: "Good",
    successRate: "60–70%",
    slug: "/trekking/6-days-umbwe-route/",
    highlight: "Steepest, most direct — experts only",
  },
  {
    name: "Northern Circuit",
    gate: "Londorossi Gate (2,100m)",
    days: "9–10",
    difficulty: "Moderate",
    scenery: "Outstanding",
    successRate: "95%+",
    slug: "/trekking/9-days-northern-circuit-route/",
    highlight: "Longest route, circumnavigates Kibo cone",
  },
];

const gateLocations = [
  {
    name: "Marangu Gate",
    elevation: "1,840m (6,037ft)",
    routes: "Marangu Route",
    access:
      "Located 43km from Moshi town on the southeastern slope. The most developed gate with a registration office, small museum, and the only gate with portered luggage carts. Tarmac road all the way. This is where Marangu climbers register, have their gear checked, and begin the trail through lush montane forest.",
  },
  {
    name: "Machame Gate",
    elevation: "1,640m (5,380ft)",
    routes: "Machame Route",
    access:
      "Located 30km northwest of Moshi in Machame village. The busiest trailhead on Kilimanjaro — roughly 50% of all climbers start here. The gate sits at the edge of dense rainforest and has a large registration area, porters&apos; weighing station, and parking. The access road is tarmac, making it easily reachable from Moshi or Arusha.",
  },
  {
    name: "Lemosho Glades",
    elevation: "2,100m (6,890ft)",
    routes: "Lemosho Route",
    access:
      "Reached via Londorossi Gate on the western side of the mountain. After registering at Londorossi, you drive an additional hour along a rough forest track to Lemosho Glades where the actual trek begins. The remote starting point means far fewer climbers on the first two days — one of the reasons Lemosho feels more exclusive and peaceful.",
  },
  {
    name: "Londorossi Gate",
    elevation: "2,250m (7,382ft)",
    routes: "Lemosho, Shira &amp; Northern Circuit",
    access:
      "The administrative registration point on the western side of Kilimanjaro, roughly 75km from Moshi via Arusha and Sanya Juu. All western-approach climbers register here before continuing to their respective trailheads. The gate has a registration office, toilet facilities, and a small parking area. Roads are partly tarmac, partly murram.",
  },
  {
    name: "Rongai Gate",
    elevation: "1,950m (6,398ft)",
    routes: "Rongai Route",
    access:
      "The only northern gate, located near the Kenyan border about 82km from Moshi via Marangu and Tarakea. The drive takes approximately 3 hours over mixed road surfaces. This remote, seldom-used gate offers the driest approach to Kilimanjaro — ideal during the March–May rainy season when southern routes can be very wet.",
  },
  {
    name: "Umbwe Gate",
    elevation: "1,630m (5,348ft)",
    routes: "Umbwe Route",
    access:
      "Situated on the southern slopes, 18km from Moshi. The least-visited gate on the mountain, reflecting the extreme difficulty of the Umbwe Route. It has basic registration facilities. The trail begins immediately with a steep ascent through thick, atmospheric forest. Only experienced trekkers with strong fitness should start from here.",
  },
];

const keyCamps = [
  {
    route: "Marangu Route (Hut Route)",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    camps: [
      { name: "Mandara Hut", elevation: "2,720m (8,924ft)", description: "A-frame wooden huts sleeping 60 climbers. Surrounded by montane forest with giant heather. A short side-trip to Maundi Crater offers the first views of Kibo and Mawenzi." },
      { name: "Horombo Hut", elevation: "3,720m (12,205ft)", description: "The largest camp on any route, with huts sleeping up to 120 climbers. Set in the moorland zone with stunning views. The acclimatization day here is critical for success on this route." },
      { name: "Kibo Hut", elevation: "4,703m (15,430ft)", description: "The final camp before summit night. A stone building in the harsh alpine desert. Climbers rest here before the midnight push to Uhuru Peak via Gilman&apos;s Point." },
    ],
  },
  {
    route: "Machame &amp; Lemosho Routes (Southern Circuit)",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    camps: [
      { name: "Machame Camp", elevation: "3,020m (9,908ft)", description: "First camp on the Machame Route, nestled at the upper edge of the rainforest where giant heather begins. Tents are pitched on cleared platforms amid moss-draped trees." },
      { name: "Shira Cave / Shira Camp", elevation: "3,750m (12,303ft)", description: "On the Shira Plateau with panoramic views of Kibo. Lemosho trekkers join here after crossing the plateau. The open, wind-exposed camp requires a good sleeping bag." },
      { name: "Lava Tower", elevation: "4,630m (15,190ft)", description: "Not an overnight camp but a critical acclimatization point. Climbers ascend here for lunch before descending 670m to Barranco — the classic climb-high-sleep-low day." },
      { name: "Barranco Camp", elevation: "3,960m (12,992ft)", description: "One of the most spectacular campsites in Africa. Pitched beneath the towering Barranco Wall with views of the Breach Wall glaciers. The next morning&apos;s scramble up the Barranco Wall is a highlight." },
      { name: "Karanga Camp", elevation: "3,995m (13,107ft)", description: "A valley camp between Barranco and Barafu. On 7-day itineraries this is an overnight stop; on 6-day routes it is a lunch stop. The Karanga Valley has the last reliable water source before the summit." },
      { name: "Barafu Camp", elevation: "4,673m (15,331ft)", description: "The summit base camp for all southern routes. A rocky, exposed ridge with no water and harsh winds. Climbers arrive by early afternoon, rest until midnight, then begin the 6–8 hour summit push." },
    ],
  },
  {
    route: "Rongai Route (Northern Approach)",
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
    camps: [
      { name: "Simba Camp", elevation: "2,625m (8,612ft)", description: "First camp on Rongai, set in pine forest near the Kenyan border. A gentle start with the sound of colobus monkeys overhead. The least crowded first-night camp on the mountain." },
      { name: "Second Cave / Kikelewa Camp", elevation: "3,450m (11,319ft)", description: "Depending on the itinerary, the second night is either at Second Cave (shorter route) or Kikelewa Camp (longer route). Both sit in the moorland zone with growing views of Mawenzi." },
      { name: "Mawenzi Tarn", elevation: "4,330m (14,206ft)", description: "A stunning tarn at the base of Mawenzi&apos;s jagged spires. One of the most dramatic campsites on Kilimanjaro. The acclimatization day here, with a hike toward Mawenzi, is superb." },
      { name: "School Hut", elevation: "4,750m (15,584ft)", description: "The Rongai summit camp on the saddle between Kibo and Mawenzi. Sparse, rocky, and windswept. From here, climbers ascend via the northeastern route to Gilman&apos;s Point and then traverse to Uhuru Peak." },
    ],
  },
];

const threePeaks = [
  {
    name: "Kibo",
    elevation: "5,895m (19,341ft)",
    status: "Dormant (last eruption ~360,000 years ago)",
    description:
      "The central and highest cone, home to Uhuru Peak — Africa&apos;s highest point. Kibo&apos;s caldera is 2.4km wide and contains the inner Reusch Crater and the ash pit at its centre. The remnant glaciers on Kibo — including the Furtwangler Glacier and the Southern Ice Field — are retreating rapidly and may disappear by 2040. All trekking routes converge on Kibo&apos;s slopes for the final summit push.",
  },
  {
    name: "Mawenzi",
    elevation: "5,149m (16,893ft)",
    status: "Extinct — heavily eroded",
    description:
      "The eastern peak, separated from Kibo by the 3.5km-wide Saddle. Mawenzi is a jagged, heavily eroded volcanic plug that requires technical rock climbing to summit — it is not part of any standard trekking route. The dramatic spires are best viewed from the Rongai Route or from Horombo Hut on Marangu. Hans Meyer Peak, the highest point, was first summited in 1912.",
  },
  {
    name: "Shira",
    elevation: "4,005m (13,140ft)",
    status: "Extinct — collapsed caldera",
    description:
      "The oldest and most eroded of the three cones, located to the west. Shira collapsed long ago, leaving a broad, high-altitude plateau at around 3,800m. The Lemosho, Shira, and Northern Circuit routes all traverse this dramatic plateau. Johnsell Point (4,005m) marks the highest point on the Shira Ridge. The plateau&apos;s exposed, wind-swept landscape is hauntingly beautiful.",
  },
];

const elevationProfiles = [
  {
    route: "Marangu Route",
    profile:
      "A steady, gradual ascent from the southeast. Day 1 climbs from 1,840m to 2,720m through rainforest. Day 2 continues to 3,720m through moorland. An optional acclimatization day at Horombo keeps you at the same elevation. The final approach climbs from 3,720m to Kibo Hut at 4,703m before the summit night push to 5,895m — a brutal 1,192m gain overnight. The descent retraces the ascent route.",
  },
  {
    route: "Machame Route",
    profile:
      "A more aggressive climb-high-sleep-low profile. Day 1 ascends steeply through rainforest from 1,640m to 3,020m. Day 2 reaches the Shira Plateau at 3,750m. Day 3 features the critical acclimatization day — ascending to Lava Tower at 4,630m before descending to Barranco at 3,960m (a 670m drop that aids acclimatization enormously). Days 4–5 traverse over the Barranco Wall and through Karanga to Barafu at 4,673m. Summit night gains 1,222m to Uhuru Peak. Descent is via Mweka.",
  },
  {
    route: "Lemosho Route",
    profile:
      "The gentlest and most gradual profile of any major route. Starting at 2,100m, the first two days cross the Shira Plateau with modest elevation gains. The route then follows the Machame path from Shira Camp onward, including the Lava Tower acclimatization day. The extra days at moderate altitude before hitting the steep sections give your body significantly more time to adjust. This profile is the primary reason Lemosho achieves 90–95% summit success rates.",
  },
  {
    route: "Rongai Route",
    profile:
      "A steady, consistent ascent from the north with no major dips or climb-high-sleep-low days. The gradient is gentler than Machame or Umbwe but lacks the active acclimatization profile of Lemosho. Elevation gain is spread evenly: 1,950m to 2,625m, then 3,450m, 4,330m, and finally 4,750m at School Hut. Summit night adds 1,145m. The route descends via Marangu, offering a traverse of the mountain.",
  },
  {
    route: "Northern Circuit",
    profile:
      "The longest and most gradual profile. It follows the Lemosho approach to the Shira Plateau, then circumnavigates the entire northern side of Kibo — a section no other route covers. This adds 2–3 days at 3,800–4,200m before the final ascent, providing unmatched acclimatization. The northern traverse is remote, uncrowded, and offers 360-degree views of the mountain. Summit approach is via the northeastern route to School Hut and then Gilman&apos;s Point.",
  },
  {
    route: "Umbwe Route",
    profile:
      "The steepest profile on Kilimanjaro. From 1,630m, the route climbs relentlessly through forest and along a narrow ridge. By Day 2, you are at Barranco Camp (3,960m) — the same elevation that takes Machame climbers 3 days to reach. The rapid altitude gain gives your body minimal time to adjust, which is why Umbwe has the lowest success rate and is recommended only for experienced, well-acclimatized trekkers.",
  },
];

const faqs = [
  {
    question: "Where exactly is Mount Kilimanjaro?",
    answer:
      "Mount Kilimanjaro is located in northeastern Tanzania at coordinates 3°04′S 37°21′E, approximately 330km south of the equator. It sits within Kilimanjaro National Park, about 50km from the town of Moshi and 80km from Arusha. Despite common misconceptions, Kilimanjaro is entirely within Tanzania — not on the border with Kenya. The mountain is visible from Amboseli National Park in Kenya, which may contribute to the confusion.",
  },
  {
    question: "How many routes are there on Kilimanjaro?",
    answer:
      "There are 7 official trekking routes on Kilimanjaro: Marangu, Machame, Lemosho, Shira, Rongai, Umbwe, and the Northern Circuit. All are managed by Kilimanjaro National Park (KINAPA) and require licensed guides. Six routes approach from the south and west; only Rongai approaches from the north. All routes converge near the summit, either at Barafu Camp or Kibo Hut, before the final push to Uhuru Peak.",
  },
  {
    question: "Which gate is closest to Moshi?",
    answer:
      "Umbwe Gate is the closest to Moshi at just 18km away, followed by Machame Gate at 30km and Marangu Gate at 43km. However, proximity to Moshi should not be a major factor in route selection — acclimatization profile, success rate, and scenery are far more important. The drive time difference between gates is typically only 30 to 60 minutes.",
  },
  {
    question: "Can you see all routes on one map?",
    answer:
      "Yes. Kilimanjaro National Park publishes an official trail map that shows all 7 routes, gate locations, camps, and summit approaches on a single sheet. You can also find detailed topographic maps from cartographers like Wielochowski and the Austrian Alpine Club (Alpenvereinskarte) that overlay all routes on contour maps. Our guides carry laminated copies of these maps on every expedition.",
  },
  {
    question: "Do I need a physical map on Kilimanjaro?",
    answer:
      "You do not strictly need one — your licensed guide knows every metre of the trail. However, carrying a map enhances the experience: you can track your progress, identify surrounding peaks and glaciers, and understand the terrain ahead. We recommend the 1:50,000 Kilimanjaro topographic map by EWP or the Alpenvereinskarte Kilimanjaro. Both are available in Moshi or can be ordered online before your trip.",
  },
  {
    question: "Is GPS allowed on Kilimanjaro?",
    answer:
      "Yes, you are permitted to carry GPS devices and use GPS-enabled watches on Kilimanjaro. Many trekkers use Garmin watches or smartphone apps like Maps.me (with offline maps downloaded beforehand) to track their route and elevation. GPS is useful for recording your trek but should never replace an experienced guide. Mobile phone signal is available intermittently on the mountain, primarily on the southern slopes.",
  },
  {
    question: "Where do all routes converge?",
    answer:
      "All southern and western routes (Machame, Lemosho, Shira, Umbwe, Northern Circuit) converge at Barafu Camp (4,673m) for the summit approach. The Marangu and Rongai routes converge at the Kibo Hut area on the eastern side. Both groups meet at Stella Point (5,756m) on the crater rim, from where it is a 45-minute ridge walk to Uhuru Peak (5,895m).",
  },
  {
    question: "What is the best map of Kilimanjaro?",
    answer:
      "The two most respected Kilimanjaro maps are the Alpenvereinskarte (Austrian Alpine Club) at 1:50,000 scale and the EWP (East and West Publications) map at the same scale. Both show accurate contour lines, all routes, camp locations, and water sources. For digital use, the OpenStreetMap Kilimanjaro layer is excellent and free. Google Earth also provides good satellite imagery overlaid with trail data. Our favourite for trekking is the EWP map — it is waterproof and pocket-sized.",
  },
  {
    question: "How long does it take to climb Kilimanjaro?",
    answer:
      "Treks range from 5 to 10 days depending on the route. The shortest option is the 5-day Marangu Route, though its 65% success rate reflects insufficient acclimatization time. We strongly recommend a minimum of 7 days. The 8-day Lemosho Route offers the best balance of acclimatization and experience, with a 90–95% success rate. The 9-day Northern Circuit provides the most thorough acclimatization of any route.",
  },
  {
    question: "Which Kilimanjaro route has the best scenery?",
    answer:
      "The Lemosho Route and Northern Circuit are widely regarded as the most scenic. Lemosho crosses the Shira Plateau with panoramic views, traverses the dramatic Barranco Wall, and passes through every climate zone. The Northern Circuit adds a full traverse of the remote northern slopes with unobstructed views of Kibo and Mawenzi. Machame is also highly scenic and often called the Whiskey Route for its challenging, rewarding terrain.",
  },
];

export default function KilimanjaroMapPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Map" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Map", url: "/kilimanjaro-map/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Map: Routes, Camps & Gates Guide",
            description:
              "Interactive Kilimanjaro map guide: all 7 routes, 40+ camps, gate locations, summit approaches. Elevation profiles and route comparisons with detailed descriptions.",
            url: "/kilimanjaro-map/",
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
            alt="Trekkers navigating Kilimanjaro routes with mountain summit visible"
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
              Routes &amp; Navigation
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Map</span>: Routes, Camps &amp; Gates
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Every route, every camp, every gate — mapped and explained by guides who have walked these trails on 800+ expeditions across all 7 Kilimanjaro routes.
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
                Kilimanjaro has <strong>7 official trekking routes</strong>, all managed by KINAPA (Kilimanjaro National Park Authority). Six approach from the south and west; one (Rongai) from the north. All routes <strong>converge near the summit</strong> — either at Barafu Camp or Kibo Hut — before the final push to <strong>Uhuru Peak at 5,895m</strong>. The mountain has <strong>6 entry gates</strong>, <strong>40+ named camps and huts</strong>, and sits within a UNESCO World Heritage Site covering 753 km&sup2;.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kilimanjaro Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Kilimanjaro Overview
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Mount Kilimanjaro stands at <strong><Link href="/mount-kilimanjaro-height/" className="text-[var(--primary)] hover:underline font-semibold">5,895 metres (19,341 feet)</Link></strong> — the highest point in Africa and the tallest freestanding mountain on Earth. Located at coordinates 3&deg;04&apos;S 37&deg;21&apos;E in northeastern Tanzania, it rises from the surrounding plains at around 900m to nearly 6,000m, creating one of the most dramatic elevation gains of any mountain on the planet.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Kilimanjaro is a massive stratovolcano composed of <strong>three distinct volcanic cones</strong>: Kibo (the highest, 5,895m), Mawenzi (5,149m), and Shira (4,005m). The mountain sits within <strong>Kilimanjaro National Park</strong>, a UNESCO World Heritage Site established in 1973 and covering 1,688 km&sup2; including the surrounding forest reserve.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The mountain passes through <strong>five distinct <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] hover:underline font-semibold">climate zones</Link></strong> — from cultivated farmland and tropical rainforest at the base, through heath and moorland, alpine desert, and finally the arctic summit zone with its remnant glaciers. This vertical transect of ecosystems is one of the reasons Kilimanjaro is so extraordinary: you experience the equivalent of travelling from the equator to the Arctic in a matter of days.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Climate zones in detail:</strong> Understanding the zones helps you read any Kilimanjaro map. Each zone corresponds to a specific elevation band with distinct vegetation, weather, and trekking conditions.{" "}
                <Link href="/kilimanjaro-climate-zones/" className="underline font-semibold">
                  Read our full climate zones guide &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Routes at a Glance */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The 7 Routes at a Glance
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every Kilimanjaro map shows the same 7 official routes. Each has a different character, difficulty, and success rate. Choosing the <Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">best route to climb Kilimanjaro</Link> depends on your fitness, schedule, and priorities. Here is how they compare side by side.
            </p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Start Gate</th>
                  <th className="text-left px-4 py-3 font-semibold">Days</th>
                  <th className="text-left px-4 py-3 font-semibold">Difficulty</th>
                  <th className="text-left px-4 py-3 font-semibold">Scenery</th>
                  <th className="text-left px-4 py-3 font-semibold">Success</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Highlight</th>
                </tr>
              </thead>
              <tbody>
                {routeOverview.map((route, i) => (
                  <tr
                    key={route.name}
                    className={`border-t border-[var(--border)] ${
                      route.recommended ? "bg-emerald-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link href={route.slug} className="text-[var(--primary)] hover:underline">
                        {route.name}
                      </Link>
                      {route.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          Top Pick
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{route.gate}</td>
                    <td className="px-4 py-3">{route.days}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{route.difficulty}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{route.scenery}</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">{route.successRate}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden lg:table-cell">{route.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            <Link
              href="/best-route-to-climb-kilimanjaro/"
              className="text-[var(--primary)] hover:underline"
            >
              See our detailed route comparison guide &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Gate Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Gate Locations
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every Kilimanjaro climb begins at one of 6 entry gates, each serving different routes. Gates are where you register with KINAPA, have your gear checked, and meet your full mountain crew.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {gateLocations.map((gate) => (
              <div
                key={gate.name}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Navigation className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{gate.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{gate.elevation} &middot; {gate.routes}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{gate.access}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Camps & Huts */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Key Camps &amp; Huts
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Over 40 named camps and huts dot the mountain. Here are the major stops organised by route, with elevations and descriptions to help you read any Kilimanjaro trail map.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            {keyCamps.map((routeGroup) => (
              <div key={routeGroup.route}>
                <h3 className={`font-heading font-bold text-xl mb-4 ${routeGroup.color}`}>
                  {routeGroup.route}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {routeGroup.camps.map((camp) => (
                    <div
                      key={camp.name}
                      className={`bg-white/5 rounded-xl p-5 border ${routeGroup.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Tent className="w-4 h-4 text-white/50" />
                        <h4 className="font-semibold">{camp.name}</h4>
                      </div>
                      <p className="text-xs text-white/50 mb-2">{camp.elevation}</p>
                      <p className="text-sm text-white/70 leading-relaxed">{camp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summit Approaches */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Summit Approaches
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Regardless of which route you take, all paths converge for the final summit push. There are two main approach corridors, and both lead to the same destination: <strong>Uhuru Peak at 5,895m</strong>.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">Southern Approach (Barafu Camp)</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Used by Machame, Lemosho, Shira, Umbwe, and Northern Circuit routes. Climbers depart Barafu Camp (4,673m) around midnight, ascending steep scree slopes in darkness. The route climbs northwest toward <strong>Stella Point (5,756m)</strong> on the crater rim — approximately 6 hours of climbing. From Stella Point, a 45-minute ridge walk along the crater rim leads to Uhuru Peak. This is the most common summit approach, used by roughly 80% of all Kilimanjaro climbers.
                </p>
              </div>

              <div className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">Eastern Approach (Kibo Hut)</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Used by Marangu and Rongai routes. Climbers depart Kibo Hut (4,703m) around midnight, ascending the rocky zigzag path toward <strong>Gilman&apos;s Point (5,685m)</strong> on the eastern crater rim — approximately 5–6 hours. From Gilman&apos;s Point, a longer ridge walk (about 1.5 hours) traverses past Stella Point to reach Uhuru Peak. This approach gains slightly less elevation but the ridge walk to Uhuru is longer.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Key landmarks on any summit map:</strong> Stella Point (5,756m) and Gilman&apos;s Point (5,685m) are both on the crater rim and both issue certificates. However, only <strong>Uhuru Peak (5,895m)</strong> is the true summit of Kilimanjaro and the highest point in Africa.{" "}
                <Link href="/mount-kilimanjaro-height/" className="underline font-semibold">
                  Read about Kilimanjaro&apos;s height and summit points &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Peaks */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The Three Volcanic Cones
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro is not a single peak but a massive volcanic complex with three distinct cones. Understanding them is key to reading any map of the mountain.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {threePeaks.map((peak) => (
              <div
                key={peak.name}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[var(--primary-dark)] rounded-xl flex items-center justify-center">
                      <Mountain className="w-6 h-6 text-[var(--secondary)]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">{peak.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{peak.elevation}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold">
                    {peak.status}
                  </span>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-4">
                    {peak.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elevation Profiles by Route */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Elevation Profiles by Route
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Understanding the climb profile helps you choose the right route. Here is how each major route gains and loses elevation from gate to summit.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {elevationProfiles.map((item, i) => (
              <div
                key={item.route}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">{item.route}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.profile}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Read a Kilimanjaro Map */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <Map className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  How to Read a Kilimanjaro Map
                </h2>
                <p className="text-white/50 text-sm">What to look for and where to get maps</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Contour Lines &amp; Elevation</h3>
                <p className="text-white/70 leading-relaxed">
                  On a topographic Kilimanjaro map, contour lines connect points of equal elevation. Lines packed tightly together indicate steep terrain — you will see this clearly on the Barranco Wall and on Umbwe&apos;s direct approach. Widely spaced contours mean gentle slopes, such as the Shira Plateau or the Saddle between Kibo and Mawenzi. Most Kilimanjaro maps use 100m contour intervals. The concentric circles near the summit represent Kibo&apos;s caldera and inner Reusch Crater. Pairing your map with an understanding of <Link href="/kilimanjaro-weather/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro weather patterns</Link> will help you anticipate conditions at each elevation band.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Scale &amp; Distance</h3>
                <p className="text-white/70 leading-relaxed">
                  The most useful Kilimanjaro maps are at 1:50,000 scale, meaning 1 centimetre on the map equals 500 metres on the ground. At this scale, the entire mountain fits comfortably on a single sheet while still showing trail detail. Be aware that horizontal distance on a map does not reflect the actual walking distance on steep terrain — a trail that appears 2km on the map might be 3km of actual hiking with switchbacks and elevation gain.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">What to Look For</h3>
                <p className="text-white/70 leading-relaxed">
                  Key features to identify on any Kilimanjaro map include: gate locations (marked with symbols or labels at each trailhead), camp sites (usually marked with tent symbols or named labels), route trails (typically coloured lines — each route in a different colour), water sources (crucial for understanding where camps are positioned), glacier boundaries (shown as blue/white areas near the summit), and the crater rim with Stella Point, Gilman&apos;s Point, and Uhuru Peak clearly labelled.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Where to Get Maps</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="font-semibold text-sm">EWP Kilimanjaro Map (1:50,000)</p>
                    <p className="text-xs text-white/50">Our top recommendation. Waterproof, pocket-sized, with all routes, camps, and contours. Available in Moshi bookshops and online.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="font-semibold text-sm">Alpenvereinskarte (Austrian Alpine Club)</p>
                    <p className="text-xs text-white/50">The gold standard for topographic accuracy. Excellent contour detail. Available from alpine clubs and specialist retailers.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="font-semibold text-sm">OpenStreetMap / Maps.me (Digital)</p>
                    <p className="text-xs text-white/50">Free digital option with offline capability. Download the Tanzania map before your trip. GPS-enabled tracking works well on the mountain.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="font-semibold text-sm">KINAPA Official Map</p>
                    <p className="text-xs text-white/50">Available at park gates. Basic but useful for orientation. Shows all routes, gates, and major camps on a single sheet.</p>
                  </div>
                </div>
              </div>
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
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Route className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 7 routes</p>
              </Link>
              <Link href="/mount-kilimanjaro-height/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Height</p>
                <p className="text-xs text-[var(--text-muted)]">Summit elevation facts</p>
              </Link>
              <Link href="/kilimanjaro-climate-zones/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Layers className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climate Zones</p>
                <p className="text-xs text-[var(--text-muted)]">5 zones explained</p>
              </Link>
              <Link href="/kilimanjaro-statistics/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Compass className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Statistics</p>
                <p className="text-xs text-[var(--text-muted)]">Data &amp; success rates</p>
              </Link>
              <Link href="/trekking/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Tent className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">All Trekking Routes</p>
                <p className="text-xs text-[var(--text-muted)]">Browse &amp; book</p>
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Flag className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Group Departures</p>
                <p className="text-xs text-[var(--text-muted)]">Fixed-date climbs</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-map/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Walk These Routes?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Our guides have walked every metre of every route on this map. With 800+ summits, a 93% success rate on the Lemosho Route, and Wilderness First Responder certification — let us guide you to the Roof of Africa.
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
