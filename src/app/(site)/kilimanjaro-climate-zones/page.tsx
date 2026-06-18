import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  TreePine,
  Leaf,
  Cloud,
  Wind,
  Snowflake,
  Camera,
  Layers,
  Thermometer,
  ArrowRight,
  Globe,
  Backpack,
  Bird,
  Sun,
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
  title: "Kilimanjaro Climate Zones: 5 Worlds in One Mountain",
  description:
    "Kilimanjaro's 5 climate zones from tropical rainforest to arctic summit. Temperature, wildlife, vegetation, and what to expect in each zone. Detailed elevation guide.",
  url: "/kilimanjaro-climate-zones/",
});

const climateZones = [
  {
    name: "Cultivation Zone",
    elevation: "800 – 1,800m",
    temperature: "25 – 30°C",
    rainfall: "1,000mm/year",
    color: "emerald",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
    borderAccent: "border-emerald-400/30",
    textAccent: "text-emerald-400",
    icon: Leaf,
    nickname: "The Farmlands",
    description:
      "The lowest slope of Kilimanjaro is a belt of fertile farmland cultivated by the Chagga people for centuries. Rich volcanic soil supports banana groves, coffee plantations, maize, beans, and tropical fruit orchards. This zone is warm and humid year-round, with temperatures between 25 and 30°C. Most trekkers pass through it quickly on the drive to the gate, but those starting on the Marangu or Rongai routes walk through Chagga villages and witness the agricultural terracing that defines life on Kilimanjaro’s lower slopes.",
    vegetation: [
      "Banana and plantain groves",
      "Arabica coffee plantations",
      "Maize, beans, and millet fields",
      "Avocado, mango, and papaya trees",
      "Flowering gardens around homesteads",
    ],
    wildlife: [
      "Domestic livestock (cattle, goats)",
      "Tropical birds including sunbirds and weavers",
      "Vervet monkeys near forest edges",
      "Chameleons and geckos in gardens",
    ],
    challenge:
      "No physical challenge here. The main consideration is adjusting to the humid heat before entering the cooler forest. Most climbers begin their trek at the upper boundary of this zone.",
    photoTip:
      "Capture the patchwork of Chagga farms with Kilimanjaro’s snow cap rising behind them. Early morning offers the clearest summit views from the lowlands. Use a wide-angle lens to show the scale of the mountain towering above the cultivation.",
  },
  {
    name: "Rainforest Zone",
    elevation: "1,800 – 2,800m",
    temperature: "15 – 25°C",
    rainfall: "2,000mm/year",
    color: "green",
    headerBg: "bg-green-50",
    headerBorder: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-700",
    borderAccent: "border-green-400/30",
    textAccent: "text-green-400",
    icon: TreePine,
    nickname: "The Jungle",
    description:
      "The montane rainforest is the wettest and most biodiverse zone on Kilimanjaro. A dense canopy of camphor, fig, and podocarpus trees blocks much of the sunlight, creating a cool, humid understorey dripping with moss, ferns, and lichens. Over 1,000 plant species thrive here, and the air is thick with moisture — annual rainfall exceeds 2,000mm. Trails can be muddy and slippery, and rain is common in the afternoon regardless of season. This is the zone that gives Kilimanjaro its reputation as a living ecosystem, not just a mountain to climb.",
    vegetation: [
      "Camphor, fig, and podocarpus trees forming dense canopy",
      "Hanging moss and old man’s beard (Usnea lichen)",
      "Tree ferns reaching 5 metres tall",
      "Impatiens kilimanjari — a flower found only on Kilimanjaro",
      "Over 1,000 flowering plant species",
    ],
    wildlife: [
      "Blue monkeys swinging through the canopy",
      "Black-and-white colobus monkeys in troops of 10-20",
      "Bushbuck and duiker on forest trails",
      "Hartlaub’s turaco with crimson wing feathers",
      "Silvery-cheeked hornbills",
      "Chameleons, tree frogs, and countless insect species",
    ],
    challenge:
      "Slippery, muddy trails require careful footing and gaiters. Rain is almost guaranteed in the afternoon. The thick canopy limits visibility, and the constant moisture means everything in your pack needs waterproofing. Altitude is not yet a concern, but the physical exertion of climbing through root-tangled terrain is real.",
    photoTip:
      "The rainforest is dark — use a fast lens or raise your ISO. The best shots are the shafts of sunlight breaking through the canopy, moss-covered branches, and colobus monkeys framed against the green. A macro lens reveals an entire world of insects, fungi, and orchids that most trekkers walk past.",
  },
  {
    name: "Heath & Moorland Zone",
    elevation: "2,800 – 4,000m",
    temperature: "5 – 15°C",
    rainfall: "1,000mm/year",
    color: "violet",
    headerBg: "bg-violet-50",
    headerBorder: "border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badgeColor: "bg-violet-100 text-violet-700",
    borderAccent: "border-violet-400/30",
    textAccent: "text-violet-400",
    icon: Cloud,
    nickname: "The Moorlands",
    description:
      "Emerging from the rainforest canopy, the landscape transforms dramatically into an open, misty moorland. Giant heather trees — up to 10 metres tall — give way to tussock grasses, wildflowers, and the first of Kilimanjaro’s iconic giant plants: Lobelia deckenii and Dendrosenecio kilimanjari (giant groundsel). Mist and cloud roll in frequently, reducing visibility and creating an otherworldly atmosphere. Temperatures swing between a pleasant 15°C during the day and near-freezing at night. This is the zone where altitude sickness can begin, and where acclimatization becomes critical.",
    vegetation: [
      "Giant heather (Erica arborea) growing up to 10m tall",
      "Lobelia deckenii — spiky rosettes that can live for decades",
      "Giant groundsel (Dendrosenecio kilimanjari) — unique to Kilimanjaro",
      "Tussock grasses, everlasting flowers, and protea",
      "Mosses and lichens coating rocks and branches",
    ],
    wildlife: [
      "Eland — Africa’s largest antelope, occasionally spotted",
      "White-necked ravens circling above camp",
      "Augur buzzards hunting rodents in the moorland",
      "Four-striped grass mice around campsites",
      "Scarlet-tufted malachite sunbird feeding on lobelia nectar",
    ],
    challenge:
      "Temperature swings catch unprepared trekkers off guard — warm sun gives way to cold mist within minutes. Altitude sickness symptoms typically begin here, with headaches and nausea affecting some climbers by 3,500m. Proper layering and hydration become essential. Many trekkers underestimate this zone because the terrain looks gentle, but the reduced oxygen is already at around 70% of sea-level.",
    photoTip:
      "This zone is a photographer’s paradise. The giant groundsels and lobelias against misty backdrops create surreal, almost prehistoric compositions. Golden hour light through the moorland fog is extraordinary. Shoot the giant plants with a person for scale — they look alien without a size reference.",
  },
  {
    name: "Alpine Desert Zone",
    elevation: "4,000 – 5,000m",
    temperature: "0 – 10°C day / -15°C night",
    rainfall: "Less than 250mm/year",
    color: "orange",
    headerBg: "bg-orange-50",
    headerBorder: "border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
    borderAccent: "border-orange-400/30",
    textAccent: "text-orange-400",
    icon: Wind,
    nickname: "The Lunar Landscape",
    description:
      "Above 4,000m, the moorland gives way to a barren, windswept landscape that resembles the surface of Mars more than Africa. Almost no vegetation survives here — the combination of extreme UV radiation, freezing nights, minimal rainfall (under 250mm per year), and thin air creates a hostile environment. The ground is loose volcanic scree and rock. Daytime temperatures hover between 0 and 10°C in the sun, but plummet to -15°C or lower after dark. The sky is immense and relentlessly blue. The sun burns intensely through the thin atmosphere, making high-SPF sunscreen and UV-blocking sunglasses non-negotiable. This is where the mountain tests your resolve.",
    vegetation: [
      "Scattered tussock grasses clinging to rock crevices",
      "Hardy mosses and lichens on protected rock faces",
      "Virtually no flowering plants above 4,500m",
      "Dried remnants of groundsels at the lower edge",
    ],
    wildlife: [
      "White-necked ravens scavenging around camps",
      "Occasional lammergeier (bearded vulture) soaring on thermals",
      "Hardy spiders and insects in rock crevices",
      "Almost no mammal life at this elevation",
    ],
    challenge:
      "This is the critical acclimatization zone. Most altitude sickness cases develop between 4,000 and 5,000m. Oxygen is down to roughly 60% of sea level. Extreme UV exposure, dehydration from the dry air, and bitter cold at night combine to push climbers to their limits. Sleep quality deteriorates significantly. The climb-high-sleep-low strategy is most important here — routes that include Lava Tower (4,630m) before descending to Barranco Camp (3,960m) build this naturally into the itinerary.",
    photoTip:
      "The alpine desert delivers Kilimanjaro’s most dramatic landscape shots. The vast emptiness with a lone trekker crossing the volcanic terrain is iconic. Sunset and sunrise paint the rocks in red and gold. Night photography is spectacular — the thin atmosphere and zero light pollution produce star fields that rival the best observatories. A wide-angle lens and tripod are essential.",
  },
  {
    name: "Arctic / Summit Zone",
    elevation: "5,000 – 5,895m",
    temperature: "-15 to -25°C",
    rainfall: "Virtually none",
    color: "sky",
    headerBg: "bg-sky-50",
    headerBorder: "border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    badgeColor: "bg-sky-100 text-sky-700",
    borderAccent: "border-sky-400/30",
    textAccent: "text-sky-400",
    icon: Snowflake,
    nickname: "The Roof of Africa",
    description:
      "The final zone is a world of ice, rock, and thin air. Temperatures drop as low as -25°C with wind chill, and the air contains only about 50% of the oxygen found at sea level. Glaciers — remnants of a once-massive ice cap — cling to the crater rim, though they are retreating rapidly due to climate change and may disappear entirely by 2040. No vegetation grows here. No animals live here permanently. The landscape is stark, silent, and profoundly beautiful. Summit night begins around midnight from base camp (either Kibo Hut at 4,720m or Barafu Camp at 4,673m), and climbers push through this zone in 6 to 8 hours of darkness before reaching Uhuru Peak (5,895m) at dawn.",
    vegetation: [
      "No vegetation whatsoever",
      "Ice and permanent snow fields",
      "Glaciers: Northern Icefield, Southern Icefield, Furtwangler Glacier",
      "Bare volcanic rock and ash",
    ],
    wildlife: [
      "No permanent animal residents",
      "Occasional frozen insects blown up from lower zones",
      "Rare sighting of ravens at Stella Point",
      "The famous frozen leopard from Hemingway’s story remains a mystery",
    ],
    challenge:
      "Everything about the summit zone is extreme. The cold is biting, the wind can be fierce, and each step at this altitude requires enormous effort. Many climbers experience nausea, headaches, and extreme fatigue. The mental challenge of walking in darkness for hours — seeing only the headlamp of the person ahead — is as difficult as the physical one. Success depends on the acclimatization work done in the days before. This is where 7+ day routes pay their dividend.",
    photoTip:
      "Summit sunrise is the defining image of any Kilimanjaro climb. Position yourself at Stella Point or Uhuru Peak as the sun breaks the horizon — the glaciers glow pink and orange against the deep blue sky. Bring a spare battery in your jacket pocket; cold kills camera batteries in minutes. Your phone may shut down entirely. A compact camera with a charged battery in a warm pocket is more reliable than a DSLR at -20°C.",
  },
];

const packingByZone = [
  {
    zone: "Cultivation & Rainforest",
    elevation: "800 – 2,800m",
    items: [
      "Moisture-wicking base layer",
      "Waterproof rain jacket and rain trousers",
      "Gaiters for muddy trails",
      "Light hiking boots with ankle support",
      "Insect repellent for the lower forest",
      "Waterproof dry bags for electronics",
    ],
  },
  {
    zone: "Heath & Moorland",
    elevation: "2,800 – 4,000m",
    items: [
      "Fleece mid-layer for temperature swings",
      "Warm hat and lightweight gloves",
      "Sunscreen (UV increases with altitude)",
      "Layering system — add and remove as mist rolls in",
      "Trekking poles for uneven terrain",
    ],
  },
  {
    zone: "Alpine Desert",
    elevation: "4,000 – 5,000m",
    items: [
      "Down or synthetic insulated jacket",
      "UV-blocking sunglasses (category 3-4)",
      "High-SPF sunscreen and lip balm with SPF",
      "Warm sleeping bag (-15°C comfort rating)",
      "Buff or balaclava for wind protection",
      "Headlamp with spare batteries",
    ],
  },
  {
    zone: "Arctic / Summit",
    elevation: "5,000 – 5,895m",
    items: [
      "Heavyweight insulated summit jacket",
      "Insulated summit gloves plus liner gloves",
      "Thermal base layers (top and bottom)",
      "Balaclava or face covering for wind chill",
      "Hand and toe warmers as backup",
      "Thermos with hot drink for summit night",
    ],
  },
];

const wildlifeSummary = [
  {
    zone: "Cultivation Zone",
    animals: "Vervet monkeys, tropical birds, chameleons, domestic livestock",
    highlight: "Sunbirds and weavers around flowering gardens",
    icon: Bird,
  },
  {
    zone: "Rainforest Zone",
    animals: "Blue monkeys, colobus monkeys, bushbuck, duiker, hornbills, turacos",
    highlight: "Black-and-white colobus monkeys — Kilimanjaro’s most photographed wildlife",
    icon: TreePine,
  },
  {
    zone: "Heath & Moorland",
    animals: "Eland, ravens, buzzards, malachite sunbirds, grass mice",
    highlight: "Scarlet-tufted malachite sunbird feeding on giant lobelia",
    icon: Bird,
  },
  {
    zone: "Alpine Desert",
    animals: "Ravens, occasional lammergeier, hardy insects and spiders",
    highlight: "Lammergeier (bearded vulture) soaring on thermals — rare but unforgettable",
    icon: Wind,
  },
  {
    zone: "Arctic / Summit",
    animals: "No permanent residents",
    highlight: "Hemingway’s frozen leopard — still a mystery after nearly a century",
    icon: Snowflake,
  },
];

const faqs = [
  {
    question: "How many climate zones does Kilimanjaro have?",
    answer:
      "Kilimanjaro has five distinct climate zones: Cultivation Zone (800-1,800m), Rainforest Zone (1,800-2,800m), Heath and Moorland Zone (2,800-4,000m), Alpine Desert Zone (4,000-5,000m), and Arctic/Summit Zone (5,000-5,895m). Each zone has its own unique vegetation, wildlife, weather patterns, and challenges. Walking through all five in a single trek is often described as travelling from the equator to the poles in less than a week.",
  },
  {
    question: "Which climate zone is the hardest?",
    answer:
      "The Alpine Desert (4,000-5,000m) and Arctic/Summit Zone (5,000-5,895m) are the most challenging. The alpine desert is where most altitude sickness cases develop — oxygen drops to 60% of sea level, temperatures swing from 10°C to -15°C, and UV radiation is intense. The summit zone is the ultimate test: -25°C with wind chill, 50% oxygen, and a gruelling 6-8 hour push through darkness to reach Uhuru Peak. The rainforest is physically demanding due to slippery, muddy trails, but altitude makes the upper zones significantly harder.",
  },
  {
    question: "Can you see wildlife on Kilimanjaro?",
    answer:
      "Yes, particularly in the lower two zones. The rainforest is home to blue monkeys, black-and-white colobus monkeys, bushbuck, duiker, and spectacular birds like Hartlaub’s turaco and silvery-cheeked hornbills. The heath and moorland zone supports eland, ravens, buzzards, and the beautiful scarlet-tufted malachite sunbird. Above 4,000m, wildlife becomes scarce — mostly ravens and occasional raptors. The summit zone has no permanent animal residents. The best wildlife viewing is on Day 1-2 of your trek in the rainforest zone.",
  },
  {
    question: "Why does Kilimanjaro have so many climate zones?",
    answer:
      "Kilimanjaro’s five climate zones exist because of its extreme vertical rise — from 800m at the base to 5,895m at the summit — combined with its location near the equator at 3° South latitude. Temperature drops approximately 6.5°C for every 1,000m gained in elevation. This 5,000m altitude range compresses the same climate variation you would experience travelling from the tropics to the Arctic into a single mountain. Its isolated position rising from flat plains (rather than being part of a mountain range) creates distinct ecological bands with sharp boundaries between zones.",
  },
  {
    question: "What is the rainforest zone like on Kilimanjaro?",
    answer:
      "The rainforest zone (1,800-2,800m) is a dense, humid montane forest with a thick canopy of camphor, fig, and podocarpus trees draped in moss and lichens. Annual rainfall exceeds 2,000mm, making it the wettest zone. Temperatures range from 15 to 25°C. The air is thick with moisture and the trails are often muddy and slippery. Over 1,000 plant species thrive here, including tree ferns, orchids, and Impatiens kilimanjari (found only on Kilimanjaro). It is the most biodiverse zone and home to blue monkeys, colobus monkeys, and dozens of bird species.",
  },
  {
    question: "How cold does the alpine desert get?",
    answer:
      "The alpine desert zone (4,000-5,000m) experiences daytime temperatures between 0 and 10°C when the sun is shining, but temperatures plummet to -15°C or lower after sunset. The extreme temperature swing — sometimes 25°C in a single day — is one of the zone’s defining characteristics. Wind chill can make it feel even colder. The thin, dry air (under 250mm of annual rainfall) intensifies both the cold and the UV radiation. A high-quality insulated jacket, warm sleeping bag rated to -15°C, and proper layering are essential for this zone.",
  },
  {
    question: "What plants grow on Kilimanjaro?",
    answer:
      "Kilimanjaro supports over 2,500 plant species across its five climate zones. The cultivation zone has banana, coffee, and tropical fruit trees. The rainforest contains camphor trees, tree ferns, orchids, and over 1,000 flowering species. The heath and moorland features giant heather (up to 10m), giant lobelia, giant groundsel (Dendrosenecio kilimanjari, unique to Kilimanjaro), and everlasting flowers. The alpine desert has only scattered tussock grasses and lichens. The summit zone has no plant life. The giant groundsel and lobelia are the most photographed — they look like plants from another planet.",
  },
  {
    question: "Is there snow on Kilimanjaro?",
    answer:
      "Yes, Kilimanjaro still has glaciers and snow in the summit zone, though they are shrinking rapidly. The Northern Icefield, Southern Icefield, and Furtwangler Glacier remain, but scientists estimate they could disappear entirely by 2040 due to climate change and reduced precipitation at high altitude. Fresh snowfall can occur year-round above 5,000m and occasionally dusts the alpine desert zone. Climbers on summit night often walk through snow and ice near the crater rim. The glaciers are one of Kilimanjaro’s most iconic features — and one of the most compelling reasons to climb before they vanish.",
  },
  {
    question: "Which route shows the most climate diversity?",
    answer:
      "The Lemosho Route (8 days) offers the best climate zone experience. It begins on the western side of the mountain at Londorossi Gate, passing through pristine rainforest that sees fewer trekkers than the southern routes. The longer itinerary means more time in each zone rather than rushing through. The Machame Route (7 days) is another excellent option, with dramatic transitions between zones and the iconic Barranco Wall scramble in the moorland-to-desert transition. The Marangu Route passes through all zones but in fewer days, leaving less time to appreciate each one.",
  },
  {
    question: "How do climate zones affect acclimatization?",
    answer:
      "The climate zones directly correspond to altitude bands, and acclimatization becomes critical from the heath and moorland zone (2,800m) upward. The transition from moorland to alpine desert (3,500-4,500m) is where most altitude sickness develops. Routes that include climb-high-sleep-low days in this transition — such as trekking to Lava Tower at 4,630m then descending to Barranco Camp at 3,960m — significantly improve acclimatization. Longer routes (7-8 days) give your body more time in each zone, which is why summit success rates jump from 65% on 5-day routes to 93% on 8-day routes.",
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
    href: "/kilimanjaro-altitude-sickness/",
    icon: Thermometer,
    title: "Altitude Sickness",
    subtitle: "Prevention & treatment",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: Backpack,
    title: "Climbing Gear",
    subtitle: "Complete packing list",
  },
  {
    href: "/best-route-to-climb-kilimanjaro/",
    icon: Layers,
    title: "Best Route Guide",
    subtitle: "Compare all 6 routes",
  },
  {
    href: "/kilimanjaro-weather/",
    icon: Cloud,
    title: "Kilimanjaro Weather",
    subtitle: "Monthly breakdown",
  },
  {
    href: "/mount-kilimanjaro-height/",
    icon: Mountain,
    title: "Kilimanjaro Height",
    subtitle: "Elevation explained",
  },
  {
    href: "/trekking/",
    icon: Globe,
    title: "All Trekking Routes",
    subtitle: "Browse itineraries",
  },
];

export default function KilimanjaroClimateZonesPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Climate Zones" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Climate Zones", url: "/kilimanjaro-climate-zones/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Climate Zones: 5 Worlds in One Mountain",
            description:
              "Kilimanjaro's 5 climate zones from tropical rainforest to arctic summit. Temperature, wildlife, vegetation, and what to expect in each zone. Detailed elevation guide.",
            url: "/kilimanjaro-climate-zones/",
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
            alt="Trekkers ascending through Kilimanjaro climate zones from moorland to alpine desert"
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
              Nature &amp; Science Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Climate Zones</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Five worlds stacked on one mountain &mdash; from tropical rainforest to arctic ice. Walk through every climate zone on Earth in a single trek.
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
              <h2 className="font-heading text-2xl font-bold mb-4">The Quick Answer</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                Kilimanjaro spans <strong>5 distinct climate zones</strong> &mdash; you walk from tropical rainforest to arctic ice in just 5-9 days. Each zone has unique vegetation, wildlife, temperatures, and challenges. It&apos;s often called <strong>&quot;five worlds in one mountain&quot;</strong> because climbing Kilimanjaro is the ecological equivalent of travelling from the equator to the North Pole. No other place on Earth lets you experience this range of climates on foot in under a week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Climate Zones - Overview */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                The 5 Climate Zones at a Glance
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Each zone occupies a distinct altitude band with its own temperature, rainfall, vegetation, and wildlife. The transitions between zones are among the most dramatic landscape changes you will ever walk through.
              </p>
            </div>
            <div className="space-y-4">
              {climateZones.map((zone) => (
                <div
                  key={zone.name}
                  className={`bg-white/5 rounded-xl p-6 border ${zone.borderAccent}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`text-2xl font-bold ${zone.textAccent} shrink-0 min-w-[160px]`}>
                      {zone.elevation}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{zone.name}</h3>
                      <p className="text-xs text-white/50">{zone.nickname} &middot; {zone.temperature} &middot; Rainfall: {zone.rainfall}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Zone Sections */}
      {climateZones.map((zone, i) => (
        <section
          key={zone.name}
          className={`py-16 ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Zone Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-14 h-14 rounded-xl ${zone.iconBg} flex items-center justify-center shrink-0`}>
                  <zone.icon className={`w-7 h-7 ${zone.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold">
                      {zone.name}
                    </h2>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${zone.badgeColor}`}>
                      {zone.elevation}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {zone.nickname} &middot; {zone.temperature} &middot; Rainfall: {zone.rainfall}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8">
                {zone.description}
              </p>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Vegetation */}
                <div className={`${zone.headerBg} rounded-xl p-6 border ${zone.headerBorder}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <TreePine className={`w-5 h-5 ${zone.iconColor}`} />
                    <h3 className="font-heading font-bold">Vegetation</h3>
                  </div>
                  <ul className="space-y-2">
                    {zone.vegetation.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <Leaf className={`w-4 h-4 ${zone.iconColor} shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wildlife */}
                <div className={`${zone.headerBg} rounded-xl p-6 border ${zone.headerBorder}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Bird className={`w-5 h-5 ${zone.iconColor}`} />
                    <h3 className="font-heading font-bold">Wildlife</h3>
                  </div>
                  <ul className="space-y-2">
                    {zone.wildlife.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <ArrowRight className={`w-4 h-4 ${zone.iconColor} shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Challenge & Photo Tips */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mountain className="w-5 h-5 text-amber-600" />
                    <h3 className="font-heading font-bold text-amber-900">Challenge</h3>
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {zone.challenge}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <h3 className="font-heading font-bold text-blue-900">Photography Tip</h3>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {zone.photoTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why Kilimanjaro's Climate Zones Are Unique */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Why Kilimanjaro&apos;s Climate Zones Are Unique
              </h2>
            </div>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Kilimanjaro is the only place on Earth where you can walk through <strong className="text-white">every major climate zone</strong> in a single week-long trek. The mountain rises from tropical plains at 800m to an arctic summit at 5,895m &mdash; a vertical range of over 5,000 metres that compresses the full spectrum of Earth&apos;s ecosystems into one continuous ascent.
              </p>
              <p>
                The ecological equivalent of this climb would be travelling from the equator to the Arctic Circle &mdash; a journey of roughly 6,000 kilometres compressed into fewer than 60 kilometres of trail. Temperature drops approximately 6.5&deg;C for every 1,000 metres gained, transforming lush 30&deg;C rainforest into -25&deg;C glacial wasteland.
              </p>
              <p>
                What makes Kilimanjaro particularly remarkable is its <strong className="text-white">isolation</strong>. Unlike the Himalayas or Andes, Kilimanjaro stands alone &mdash; a massive volcanic cone rising abruptly from flat savanna. This isolation creates sharply defined ecological boundaries between zones rather than gradual transitions. You do not slowly leave the rainforest; you step out of dense canopy into open moorland &mdash; and onto landmarks like the vast <Link href="/kilimanjaro-shira-plateau/" className="text-[var(--secondary)] hover:underline">Shira Plateau</Link> &mdash; within a few hundred metres.
              </p>
              <p>
                This ecological diversity is also why Kilimanjaro was designated a <strong className="text-white">UNESCO World Heritage Site</strong> in 1987 and remains one of the most studied mountains in the world for climate and ecological research. Scientists monitor the glaciers, vegetation bands, and wildlife populations as indicators of global climate change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Pack for Each Zone */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What to Pack for Each Zone
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro&apos;s climate zones demand a layering strategy that covers tropical humidity to arctic cold. Here is what you need for each stage of the climb.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {packingByZone.map((zone) => (
              <div
                key={zone.zone}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Backpack className="w-6 h-6 text-[var(--secondary)]" />
                  <div>
                    <h3 className="font-heading font-bold">{zone.zone}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{zone.elevation}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {zone.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            <Link
              href="/kilimanjaro-climbing-gear/"
              className="text-[var(--primary)] hover:underline"
            >
              See our complete Kilimanjaro packing list &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Wildlife by Zone */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Wildlife by Zone
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Kilimanjaro is not just a mountain &mdash; it is a vertical wildlife corridor. The diversity decreases with altitude, but every zone has its own residents and surprises.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {wildlifeSummary.map((zone) => (
              <div
                key={zone.zone}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <zone.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">{zone.zone}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{zone.animals}</p>
                  <p className="text-sm text-emerald-700 font-medium">
                    Highlight: {zone.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography Tips Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Camera className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Photography Tips by Zone
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  How to capture each climate zone at its best
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Kilimanjaro&apos;s five climate zones offer five completely different photographic environments. The challenge is that conditions change rapidly &mdash; the humidity that fogs your lens in the rainforest gives way to blinding UV in the alpine desert, and cold that kills batteries at the summit.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 text-blue-900">Essential Gear</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-blue-800">
                    <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    Carry spare batteries in a warm inner pocket &mdash; cold drains them fast above 4,000m
                  </li>
                  <li className="flex items-start gap-2 text-sm text-blue-800">
                    <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    A waterproof camera bag or dry bag is essential for the rainforest zone
                  </li>
                  <li className="flex items-start gap-2 text-sm text-blue-800">
                    <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    Wide-angle lens for landscapes, fast lens (f/2.8 or wider) for dark rainforest
                  </li>
                  <li className="flex items-start gap-2 text-sm text-blue-800">
                    <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    Lightweight tripod for night sky photography in the alpine desert
                  </li>
                  <li className="flex items-start gap-2 text-sm text-blue-800">
                    <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    UV filter to protect your lens from intense high-altitude sunlight
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
                <Sun className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-800 text-sm font-semibold mb-1">Our Guides&apos; Tip</p>
                  <p className="text-emerald-800 text-sm">
                    The best photographs on Kilimanjaro come from the first and last light of each day. We time our departures and camp arrivals to give you the best chances for golden hour shooting. Tell your guide you are a keen photographer &mdash; they know exactly where to stop for the most powerful compositions in each zone.
                  </p>
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
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

      <KnowledgeBase exclude="/kilimanjaro-climate-zones/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Experience All 5 Climate Zones
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Walk from tropical rainforest to arctic summit with experienced guides who know every zone intimately. Choose a 7+ day route for the most immersive journey through Kilimanjaro&apos;s five worlds.
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
