import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  X,
  ChevronDown,
  ShoppingBag,
  Info,
  Shirt,
  Footprints,
  BedDouble,
  Backpack,
  HeartPulse,
  FileText,
  ArrowRight,
  Mountain,
  Thermometer,
  Weight,
  DollarSign,
  Star,
  Moon,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateAggregateRatingSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RelatedGuides, CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Kilimanjaro Packing List & Gear 2026",
  description:
    "Complete Kilimanjaro gear guide: essential clothing layers, boots, sleeping bags, trekking poles, and what NOT to bring. Updated 2026 packing list from experienced Kilimanjaro guides.",
  url: "/kilimanjaro-climbing-gear/",
  image:
    "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
});

const gearCategories = [
  {
    icon: <Shirt className="w-6 h-6" />,
    title: "Clothing",
    color: "bg-amber-100 text-amber-700",
    items: [
      "Moisture-wicking base layer tops × 3",
      "Long thermal underwear × 2",
      "Fleece mid-layer jacket",
      "Down insulation jacket (800-fill minimum)",
      "Waterproof shell jacket (Gore-Tex or equivalent)",
      "Waterproof shell trousers",
      "Trekking trousers × 2",
      "Warm beanie hat",
      "Balaclava for summit night",
      "Liner gloves + waterproof outer gloves",
      "Merino wool hiking socks × 4 pairs",
      "Gaiters (to keep trail debris out of boots)",
    ],
  },
  {
    icon: <Footprints className="w-6 h-6" />,
    title: "Footwear",
    color: "bg-orange-100 text-orange-700",
    items: [
      "Waterproof ankle-supporting hiking boots (broken in before the climb)",
      "Camp sandals or light shoes for evenings",
      "Warm boot liners for summit night",
      "Spare bootlaces",
    ],
  },
  {
    icon: <BedDouble className="w-6 h-6" />,
    title: "Sleeping",
    color: "bg-sky-100 text-sky-700",
    items: [
      "Sleeping bag rated to -15°C (four-season)",
      "Sleeping bag silk or fleece liner for extra warmth",
      "Inflatable or foam camp pillow",
    ],
  },
  {
    icon: <Backpack className="w-6 h-6" />,
    title: "Trekking Essentials",
    color: "bg-green-100 text-green-700",
    items: [
      "Trekking poles × 2 (with spare snow baskets)",
      "Day pack 20–25L (carried by you)",
      "Duffle bag 70–90L (carried by porter, max 15kg)",
      "Waterproof pack cover for both bags",
      "Water bottles × 2 (1L each) or 3L hydration bladder",
      "Headtorch with spare batteries × 2 sets",
      "Trekking map of your chosen route",
    ],
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Health & Safety",
    color: "bg-rose-100 text-rose-700",
    items: [
      "Pulse oximeter (monitor blood-oxygen levels)",
      "Diamox (acetazolamide) — consult a doctor before travel",
      "Ibuprofen and paracetamol",
      "Blister treatment kit (moleskin, needle, antiseptic)",
      "Sunscreen SPF 50+ and lip balm SPF 30+",
      "Hand sanitiser",
      "Diarrhoea and rehydration sachets",
      "Altitude sickness medication (consult doctor)",
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Documents & Tech",
    color: "bg-purple-100 text-purple-700",
    items: [
      "Passport and travel insurance documents (copies)",
      "Camera or phone with protective case",
      "Power bank (20,000mAh minimum)",
      "Universal travel adapter",
      "Earplugs for shared hut accommodation",
      "Notebook and pen",
      "Emergency contact card in local language",
    ],
  },
];

const hireItems = [
  { item: "Trekking poles", note: "Available in Arusha — hire if travelling light" },
  { item: "Sleeping bag (-15°C rated)", note: "Hireable locally — inspect before use" },
  { item: "Gaiters", note: "Often available from outfitters in Arusha town" },
  { item: "Duffle bag", note: "Some operators provide these for porter loads" },
  { item: "Down jacket", note: "Hireable but limited size range — bring your own if possible" },
];

const doNotBring = [
  "Heavy DSLR tripod — weight penalty is too high",
  "Cotton clothing of any kind — cotton kills at altitude when wet",
  "Excessive toiletries — pack travel-sized only",
  "Perfume or strong-scented products — attracts wildlife at lower camps",
  "Laptop or tablet — unnecessary weight and cold can damage devices",
  "Jeans or non-trekking trousers",
  "Bulky travel locks beyond a lightweight cable lock",
  "Alcoholic beverages — alcohol accelerates dehydration at altitude",
];

const climateZones = [
  {
    zone: "Rainforest",
    elevation: "1,800–2,800m",
    temp: "15–25°C",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    gear: [
      "Lightweight moisture-wicking base layer",
      "Rain jacket — daily afternoon showers are guaranteed",
      "Light trekking trousers (zip-off legs are ideal)",
      "Waterproof gaiters to keep mud out of boots",
      "Insect repellent for lower camp mosquitoes",
    ],
    note: "Warm, humid, and wet. You will sweat heavily — cotton is already dangerous here.",
  },
  {
    zone: "Moorland",
    elevation: "2,800–4,000m",
    temp: "5–15°C",
    color: "bg-lime-100 text-lime-800 border-lime-200",
    gear: [
      "Fleece mid-layer or lightweight insulation jacket",
      "Wind-resistant shell layer",
      "Long trekking trousers (no more shorts)",
      "Warm beanie for cold mornings and evenings",
      "Sunscreen — UV increases sharply at this altitude",
    ],
    note: "Temperature drops quickly at dusk. Most climbers add their first insulating layer here.",
  },
  {
    zone: "Alpine Desert",
    elevation: "4,000–5,000m",
    temp: "-5°C to 5°C",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    gear: [
      "Down jacket for camp evenings and cold starts",
      "Warm hat covering ears",
      "Liner gloves at minimum",
      "Neck gaiter or buff for wind and dust protection",
      "Sunglasses — UV is intense with no vegetation cover",
    ],
    note: "Dry, barren, and bitterly cold at night. Your down jacket becomes a daily essential here.",
  },
  {
    zone: "Summit Zone",
    elevation: "5,000–5,895m",
    temp: "-15°C to -25°C",
    color: "bg-sky-100 text-sky-800 border-sky-200",
    gear: [
      "Full summit kit: every layer you own",
      "Balaclava covering all exposed skin",
      "Inner liner gloves + waterproof insulated outer gloves",
      "Hand warmers and toe warmers as backup",
      "Headtorch with fresh batteries (you start in darkness)",
      "Thermos flask with hot drink prepared by crew",
    ],
    note: "The midnight summit push is the coldest, hardest stretch. Gear failures at this point are summit-ending.",
  },
];

const summitNightGear = [
  { item: "Balaclava", detail: "Covers face and neck — frostbite risk is real above 5,000m" },
  { item: "Inner liner gloves + insulated outer gloves", detail: "Double-glove system prevents frozen fingers during the 6–8 hour push" },
  { item: "Headtorch with fresh batteries", detail: "Cold drains batteries fast — insert fresh ones at Barafu and carry spares in your inner pocket" },
  { item: "Thermos with hot drink", detail: "Sweet tea, coffee, or hot chocolate prepared by your crew before departure. Vital for morale and warmth." },
  { item: "High-energy snacks in inner pockets", detail: "Chocolate bars, energy gels, nuts — keep them inside your jacket so they don&apos;t freeze solid" },
  { item: "Chemical hand warmers + toe warmers", detail: "Inexpensive insurance against numb extremities. Pack 2–4 pairs." },
  { item: "Maximum layering: all insulation layers worn together", detail: "Base layer + fleece + down jacket + shell. No holding back — summit night uses everything." },
  { item: "Waterproof outer shell", detail: "Wind at Stella Point can exceed 50km/h. Your shell blocks the wind chill factor." },
  { item: "Warm boot liners or extra thick socks", detail: "Feet are the first casualty of cold. Double up on socks or use insulated liners." },
  { item: "Trekking poles", detail: "Steep scree slopes in the dark are exhausting without poles for balance and propulsion" },
];

const gearWeights = [
  { item: "Sleeping bag (-15°C)", weight: "1.5kg", category: "Sleeping" },
  { item: "Sleeping bag liner", weight: "200g", category: "Sleeping" },
  { item: "Camp pillow", weight: "100g", category: "Sleeping" },
  { item: "Down jacket (800-fill)", weight: "500–700g", category: "Clothing" },
  { item: "Waterproof shell jacket", weight: "400–600g", category: "Clothing" },
  { item: "Fleece mid-layer", weight: "400g", category: "Clothing" },
  { item: "Base layers (3 tops + 2 bottoms)", weight: "800g", category: "Clothing" },
  { item: "Hiking boots (per pair)", weight: "1.6–1.8kg", category: "Footwear" },
  { item: "Camp sandals", weight: "300g", category: "Footwear" },
  { item: "Trekking poles (pair)", weight: "500–600g", category: "Equipment" },
  { item: "Headtorch + spare batteries", weight: "150g", category: "Equipment" },
  { item: "Water bottles (2 × 1L, full)", weight: "2.0kg", category: "Equipment" },
  { item: "Power bank (20,000mAh)", weight: "400g", category: "Tech" },
  { item: "Camera + case", weight: "300–800g", category: "Tech" },
  { item: "First aid kit + medications", weight: "300g", category: "Health" },
  { item: "Sunscreen + lip balm", weight: "150g", category: "Health" },
];

const rentalPrices = [
  { item: "Sleeping bag (-15°C rated)", price: "$30–$50 per trek", note: "Inspect zips and insulation before accepting" },
  { item: "Trekking poles (pair)", price: "$10–$15 per trek", note: "Check locking mechanism and snow basket attachment" },
  { item: "Gaiters", price: "$5–$10 per trek", note: "Elastic and velcro should be intact" },
  { item: "Down jacket", price: "$20–$40 per trek", note: "Limited sizes — try before you commit" },
  { item: "Waterproof trousers", price: "$10–$15 per trek", note: "Check seam taping is intact" },
  { item: "Duffle bag (70–90L)", price: "Often provided free", note: "Most operators include this with your booking" },
];

const brandRecommendations = [
  {
    category: "Down Jacket",
    icon: <Shirt className="w-5 h-5" />,
    brands: ["Rab Microlight Alpine", "Mountain Equipment Earthrise", "Patagonia Down Sweater"],
    spec: "800+ fill power, lightweight, packable. This is your most important insulation piece.",
  },
  {
    category: "Hiking Boots",
    icon: <Footprints className="w-5 h-5" />,
    brands: ["Scarpa Terra GTX", "La Sportiva Trango", "Salomon X Ultra 4 GTX"],
    spec: "Waterproof (Gore-Tex), ankle-supporting, stiff sole. Must be broken in over 50+ km before your climb.",
  },
  {
    category: "Base Layers",
    icon: <Thermometer className="w-5 h-5" />,
    brands: ["Icebreaker Merino 200 Oasis", "Smartwool Classic Thermal", "Helly Hansen Lifa"],
    spec: "Merino wool or advanced synthetic. Avoid cotton at all costs — it retains moisture and causes dangerous heat loss.",
  },
  {
    category: "Waterproof Shell",
    icon: <Mountain className="w-5 h-5" />,
    brands: ["Arc&apos;teryx Beta LT", "Rab Downpour Eco", "Mountain Equipment Odyssey"],
    spec: "Gore-Tex or eVent membrane. Must be fully waterproof (not water-resistant). Sealed seams essential.",
  },
  {
    category: "Sleeping Bag",
    icon: <BedDouble className="w-5 h-5" />,
    brands: ["Rab Neutrino 400", "Mountain Equipment Glacier 700", "Sea to Summit Trek TkII"],
    spec: "Comfort rating -10°C to -15°C minimum. Down fill preferred for warmth-to-weight ratio.",
  },
  {
    category: "Trekking Poles",
    icon: <Mountain className="w-5 h-5" />,
    brands: ["Black Diamond Trail Ergo", "Leki Makalu", "Komperdell Explorer"],
    spec: "Collapsible, with cork or foam grips and removable snow baskets. Carbon fibre is lighter but aluminium is tougher.",
  },
];

const faqs = [
  {
    question: "What boots do I need for Kilimanjaro?",
    answer:
      "You need waterproof, ankle-supporting hiking boots that have been broken in before the climb. Stiff-soled boots with good ankle support are preferable over trail runners. The single most common cause of summit failure is blisters from new boots — always wear them on multiple long walks before your climb.",
  },
  {
    question: "Do I need crampons for Kilimanjaro?",
    answer:
      "In most cases, no. Kilimanjaro’s glaciers have retreated significantly and crampons are not required on standard routes. Gaiters and trekking poles with snow baskets are sufficient. However, your guide will advise if icy conditions are encountered near the summit crater rim.",
  },
  {
    question: "Can I rent gear in Arusha?",
    answer:
      "Yes. Snow Africa Adventure can arrange gear rental in Arusha for items like trekking poles, sleeping bags, gaiters, and duffle bags. We recommend renting only lower-risk items and bringing your own boots, base layers, and down jacket to ensure a proper fit and quality you can trust.",
  },
  {
    question: "How heavy should my pack be on Kilimanjaro?",
    answer:
      "Your day pack (carried by you throughout each trekking day) should be no heavier than 7–8kg. Your duffle bag (carried by your porter) should not exceed 15kg — this is a KINAPA-regulated limit designed to protect porter welfare. Snow Africa Adventure enforces this limit strictly on all climbs.",
  },
  {
    question: "What sleeping bag temperature rating do I need for Kilimanjaro?",
    answer:
      "A four-season sleeping bag rated to at least -10°C comfort (ideally -15°C) is essential. Summit camp temperatures can drop to -20°C or colder. A fleece or silk liner adds 5–10°C of extra warmth and is strongly recommended. If renting in Arusha, always check the temperature rating on the label before accepting.",
  },
  {
    question: "Should I bring trekking poles for Kilimanjaro?",
    answer:
      "Absolutely. Trekking poles reduce knee strain by up to 25% on steep descents and provide crucial balance on loose scree during the summit push. They also help maintain rhythm on long uphill sections. Collapsible poles are best for travel. If you don’t own a pair, they are one of the easiest items to rent in Arusha for $10–$15.",
  },
  {
    question: "What camera gear should I bring on Kilimanjaro?",
    answer:
      "A smartphone with a protective case handles most photography needs and saves significant weight. If you bring a mirrorless or compact camera, keep it inside your jacket to protect the battery from cold (cold drains lithium batteries rapidly). Carry spare batteries in an inner pocket. Leave heavy DSLR tripods at home — the weight penalty is not worth it at altitude.",
  },
  {
    question: "Do I need a sleeping mat for Kilimanjaro?",
    answer:
      "Snow Africa Adventure provides foam sleeping mats on all our climbs. If you prefer extra comfort, you can bring a lightweight inflatable mat (such as a Therm-a-Rest NeoAir), but this is optional and adds weight to your porter load. The provided mats are sufficient for insulation from the cold ground.",
  },
  {
    question: "What about sunglasses for Kilimanjaro?",
    answer:
      "High-quality UV-blocking sunglasses (Category 3 or 4) are essential, especially above 4,000m where there is no vegetation to block UV radiation. Snow reflection near the summit can cause snow blindness without protection. Wraparound styles work best to block light from the sides. A retaining strap prevents loss on windy ridges.",
  },
  {
    question: "Can I charge electronic devices on the mountain?",
    answer:
      "There are no charging facilities on Kilimanjaro. Bring a 20,000mAh power bank (or larger) to keep your phone and camera charged throughout the trek. Keep the power bank in your sleeping bag at night — cold temperatures reduce battery capacity. Switch your phone to aeroplane mode when not taking photos to conserve power.",
  },
  {
    question: "What is the best way to pack my duffle bag?",
    answer:
      "Use dry bags or heavy-duty bin liners inside your duffle to waterproof everything. Pack sleeping bag at the bottom, then clothing layers, with items you need at camp on top. Keep summit night gear in a separate stuff sack for easy access. Label your duffle clearly — porters carry multiple bags and yours needs to be identifiable.",
  },
];

export default function KilimanjaroClimbingGearPage() {
  return (
    <div>
      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Trekking", url: "/trekking/" },
            { name: "Kilimanjaro Climbing Gear", url: "/kilimanjaro-climbing-gear/" },
          ]),
          generateFAQSchema(faqs),
          generateHowToSchema({
            name: "How to Pack for Kilimanjaro: Complete Gear Checklist",
            description: "Step-by-step guide to packing the right gear for a Kilimanjaro climb, covering base layers to summit night essentials.",
            steps: [
              { name: "Start With Your Base Layers", text: "Pack 3-4 moisture-wicking base layers (merino wool or synthetic). Avoid cotton — it retains sweat and loses insulation when wet. Include thermal base layers for summit night." },
              { name: "Add Insulation Layers", text: "Bring a fleece jacket (mid-weight), a down or synthetic insulated jacket (rated to -10°C minimum), and insulated trousers for summit night. The layering system lets you adjust to temperatures from 30°C at the gate to -20°C at the summit." },
              { name: "Prepare Your Outer Shell", text: "Pack a waterproof, breathable rain jacket and rain trousers. These protect against rain in the forest zone and wind at altitude. A hardshell jacket with a hood is essential." },
              { name: "Choose the Right Boots", text: "Wear broken-in, waterproof hiking boots with ankle support. They must be comfortable for 5-9 days of trekking across varied terrain. Break them in over at least 4-6 weeks of hiking before your climb." },
              { name: "Pack Summit Night Essentials", text: "Headlamp with spare batteries, balaclava, insulated gloves (liner + outer), hand and toe warmers, thermos flask for hot drinks, and energy snacks. Summit night temperatures can drop to -20°C with wind chill." },
              { name: "Sort Your Sleeping System", text: "Bring a 4-season sleeping bag rated to at least -10°C (comfort rating, not extreme). Add a sleeping bag liner for extra warmth. A foam or inflatable sleeping mat significantly improves comfort and insulation from the cold ground." },
            ],
          }),
          generateArticleSchema({
            title: "Kilimanjaro Packing List & Gear 2026",
            description:
              "Complete Kilimanjaro gear guide: essential clothing layers, boots, sleeping bags, trekking poles, and what NOT to bring. Updated 2026 packing list from experienced Kilimanjaro guides.",
            url: "/kilimanjaro-climbing-gear/",
            image:
              "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",
            author: "Hamisi Mnaro",
            authorRole: "Director Timeless International",
            authorCredentials: [
              "200+ Kilimanjaro Summits",
              "15+ Years Guiding Experience",
              "TATO Licensed Guide",
              "Wilderness First Responder",
            ],
            publishedTime: "2026-03-04",
            modifiedTime: "2026-06-18",
          }),
          generateAggregateRatingSchema({ ratingValue: 4.9, reviewCount: 387, itemName: "Snow Africa Adventure — Kilimanjaro Climbing" }),
        ]}
      />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Trekking Routes", href: "/trekking/" },
            { label: "Climbing Gear" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp"
            alt="Kilimanjaro trekkers with full gear on mountain trail"
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
                2026 Packing Guide
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Kilimanjaro Climbing Gear: Complete Packing List
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Everything you need to pack for a safe, successful Kilimanjaro climb —
              from layering systems and boots to health essentials and what to leave at home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Book Your Climb
              </Link>
              <Link
                href="/kilimanjaro-join-group-departures/"
                className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Group Departures
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      <CredentialsBadges variant="compact" />

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Why Gear Matters
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Your Kilimanjaro Climbing Gear Can Make or Break Your Summit
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              At 5,895 metres, Kilimanjaro&apos;s summit zone is an arctic environment even
              on a clear summer day. Temperatures can plunge below -20&deg;C at night, oxygen
              levels are roughly half those at sea level, and weather changes rapidly.
              Your kilimanjaro packing list is not optional — the right kilimanjaro equipment
              is the difference between a successful summit and turning back. Many climbers who
              fail do so not because of fitness, but because of inadequate gear.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The three-layer clothing system is the foundation of every successful Kilimanjaro
              climb: a moisture-wicking base layer to keep sweat off your skin, an insulating
              mid-layer to retain body heat, and a waterproof outer shell to block wind and rain.
              Every item below is chosen with this principle in mind.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Kilimanjaro passes through{" "}
              <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)]">
                five distinct climate zones
              </Link>
              , from equatorial rainforest at the gate to arctic conditions at the summit.
              Your gear needs change dramatically as you ascend, which is why proper layering
              and versatile equipment are non-negotiable. Understanding the{" "}
              <Link href="/kilimanjaro-weather/" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)]">
                weather patterns on Kilimanjaro
              </Link>
              {" "}will help you pack smarter and lighter.
            </p>
          </div>
        </div>
      </section>

      {/* Layering System */}
      <section className="py-12 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Clothing System
            </span>
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Kilimanjaro Clothing: The Essential Three-Layer System
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">01</div>
                <h3 className="font-semibold text-lg mb-2">Base Layer</h3>
                <p className="text-white/70 text-sm">
                  Merino wool or synthetic fabric that wicks moisture away from skin. Never wear cotton — it retains sweat and causes dangerous heat loss.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">02</div>
                <h3 className="font-semibold text-lg mb-2">Mid Layer</h3>
                <p className="text-white/70 text-sm">
                  A fleece or down jacket that traps warm air around your body. Down provides superior warmth-to-weight ratio but loses insulation when wet.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-[var(--secondary)] mb-2">03</div>
                <h3 className="font-semibold text-lg mb-2">Outer Shell</h3>
                <p className="text-white/70 text-sm">
                  A waterproof and windproof jacket and trousers that protect against rain, sleet, and fierce summit winds. Gore-Tex or equivalent is recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Checklist */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
            Packing List
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Complete Kilimanjaro Gear &amp; Equipment Checklist
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
            Use this kilimanjaro packing list as your definitive starting point. Your Snow Africa Adventure guide will review all kilimanjaro climbing gear before departure and advise on any missing essentials.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gearCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{cat.title}</h3>
                  </div>
                </div>
                <ul className="p-5 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear by Climate Zone */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2 text-center">
              Altitude Gear Guide
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Gear by Climate Zone: What You Need at Each Altitude
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
              Kilimanjaro passes through{" "}
              <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)]">
                four major climate zones
              </Link>
              {" "}from gate to summit. Your gear requirements shift dramatically with each zone.
              Understanding what to wear and when is essential for comfort and safety.
            </p>
            <div className="space-y-6">
              {climateZones.map((zone, i) => (
                <div
                  key={zone.zone}
                  className={`rounded-xl border p-6 ${zone.color}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl font-bold opacity-60">0{i + 1}</div>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{zone.zone} Zone</h3>
                      <p className="text-sm font-medium opacity-80">
                        {zone.elevation} &middot; Typical temps: {zone.temp}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {zone.gear.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium italic opacity-80">
                    {zone.note}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/kilimanjaro-climate-zones/"
                className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:text-[var(--primary-dark)] transition-colors"
              >
                Read our full Kilimanjaro climate zones guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summit Night Gear Checklist */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Moon className="w-6 h-6 text-[var(--secondary)]" />
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Summit Night
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Summit Night Gear Checklist
            </h2>
            <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto">
              The midnight summit push (typically starting at 11pm&ndash;midnight from Barafu or Kibo Camp) is the most
              physically and mentally demanding stretch of your entire climb. Temperatures plunge to -15&deg;C to -25&deg;C,
              winds can be ferocious, and you are trekking in complete darkness. A single gear failure here
              — frozen water, dead headtorch batteries, inadequate gloves — can be summit-ending.
            </p>
            <div className="space-y-3">
              {summitNightGear.map((item) => (
                <div
                  key={item.item}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--secondary)] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.item}</h3>
                      <p className="text-white/60 text-sm">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-100 text-sm">
                  <strong>Pro tip from our guides:</strong> Prepare all summit night gear the evening
                  before and pack it in the top of your day pack. Lay out your clothing layers in order
                  so you can dress quickly in the dark tent. Your crew will wake you with hot drinks
                  around 11pm — you want to be moving within 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Recommendations */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Star className="w-6 h-6 text-[var(--secondary)]" />
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Trusted Brands
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Brand Recommendations for Kilimanjaro Gear
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
              After guiding 200+ climbs, these are the brands our team sees perform consistently on the mountain.
              These are suggestions, not requirements — any equivalent-quality gear works.
              The key is function and fit, not brand loyalty.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {brandRecommendations.map((rec) => (
                <div
                  key={rec.category}
                  className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-dark)] text-white flex items-center justify-center">
                      {rec.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold">{rec.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1 bg-[var(--surface)] text-sm font-medium rounded-full border border-[var(--border)]"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                  <p className="text-[var(--text-muted)] text-sm">{rec.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gear Weight Budget */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Weight className="w-6 h-6 text-[var(--secondary)]" />
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Weight Budget
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Kilimanjaro Gear Weight Budget
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-6 max-w-2xl mx-auto">
              Every gram matters at altitude. Here are the weight targets and approximate weights for key items
              to help you plan your packing. Good preparation means{" "}
              <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)]">
                physical training
              </Link>
              {" "}and smart weight management working together.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--primary-dark)] text-white rounded-xl p-6 text-center">
                <Backpack className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[var(--secondary)]">7&ndash;8 kg</div>
                <p className="text-white/70 text-sm mt-1">Day pack target (carried by you)</p>
              </div>
              <div className="bg-[var(--primary-dark)] text-white rounded-xl p-6 text-center">
                <ShoppingBag className="w-8 h-8 text-[var(--secondary)] mx-auto mb-2" />
                <div className="text-3xl font-bold text-[var(--secondary)]">15 kg max</div>
                <p className="text-white/70 text-sm mt-1">Duffle bag limit (KINAPA porter regulation)</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left px-5 py-3 font-semibold">Item</th>
                    <th className="text-left px-5 py-3 font-semibold">Approx. Weight</th>
                    <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {gearWeights.map((row, i) => (
                    <tr
                      key={row.item}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-5 py-3 font-medium">{row.item}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">{row.weight}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden sm:table-cell">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Porter welfare:</strong> The 15kg duffle limit is a KINAPA regulation enforced to protect
                porter health and safety. Your duffle will be weighed at the gate. If it exceeds 15kg, you will
                need to remove items or arrange an additional porter at extra cost. Pack smart, and your porters
                will thank you. Learn more about{" "}
                <Link href="/kilimanjaro-prices/" className="text-amber-800 underline hover:text-amber-900">
                  Kilimanjaro trek costs and what&apos;s included
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hire vs Buy */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Gear Hire
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Kilimanjaro Gear Hire in Arusha: What to Rent Locally
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              If you are travelling light or have limited luggage allowance, several pieces of
              Kilimanjaro gear can be hired locally in Arusha. Snow Africa Adventure can arrange
              quality rentals on your behalf before your climb begins.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left px-5 py-3 font-semibold">Item</th>
                    <th className="text-left px-5 py-3 font-semibold">Hire Note</th>
                  </tr>
                </thead>
                <tbody>
                  {hireItems.map((row, i) => (
                    <tr
                      key={row.item}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-5 py-3 font-medium">{row.item}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Recommendation:</strong> Always bring your own boots, base layers, and down
                jacket. These items need to fit perfectly and retain body heat — hiring them introduces
                risk. We strongly advise against hiring boots for Kilimanjaro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Rental Prices in Arusha */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-[var(--secondary)]" />
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Rental Costs
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              Gear Rental Prices in Arusha
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-8 max-w-2xl mx-auto">
              These are approximate rental costs from reputable outfitters in Arusha as of 2026.
              Snow Africa Adventure can arrange rental gear on your behalf at competitive rates.
              Prices are per trek (not per day).
            </p>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)] shadow-sm mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left px-5 py-3 font-semibold">Item</th>
                    <th className="text-left px-5 py-3 font-semibold">Approx. Cost</th>
                    <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalPrices.map((row, i) => (
                    <tr
                      key={row.item}
                      className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]"}
                    >
                      <td className="px-5 py-3 font-medium">{row.item}</td>
                      <td className="px-5 py-3 text-[var(--secondary)] font-semibold">{row.price}</td>
                      <td className="px-5 py-3 text-[var(--text-muted)] hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[var(--text-muted)] text-sm text-center">
              These are estimates and may vary by operator and season. For a full cost breakdown including
              park fees, crew tips, and accommodation, see our{" "}
              <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)]">
                Kilimanjaro prices guide
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* What NOT to Bring */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              Leave Behind
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What NOT to Pack for Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] mb-8 text-lg">
              Every unnecessary kilo in your kilimanjaro climbing gear costs energy at altitude. Here is what experienced Kilimanjaro guides recommend leaving at home or in your hotel in Arusha:
            </p>
            <div className="space-y-3">
              {doNotBring.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[var(--border)] shadow-sm"
                >
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-[var(--text-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gear Rental CTA Box */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[var(--primary-dark)] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-6 h-6 text-[var(--secondary)]" />
                <h3 className="font-heading text-xl font-bold">Snow Africa Gear Rental</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Not sure whether to buy or hire? Snow Africa Adventure can arrange quality gear
                rental in Arusha before your climb, including sleeping bags, poles, and gaiters.
                Contact us when you book to discuss your requirements. We also provide detailed
                gear advice as part of your{" "}
                <Link href="/kilimanjaro-food-meals/" className="text-[var(--secondary)] underline hover:text-[var(--secondary-dark)]">
                  pre-climb preparation briefing
                </Link>.
              </p>
              <Link
                href="/trekking/"
                className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                Ask About Gear Rental
              </Link>
            </div>
            <div className="shrink-0 hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-[var(--secondary)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              Kilimanjaro Gear Questions Answered
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
      <RelatedGuides currentPath="/kilimanjaro-climbing-gear/" />

      <KnowledgeBase exclude="/kilimanjaro-climbing-gear/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pack Smart. Climb Strong.
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Our Kilimanjaro specialists are happy to answer any gear questions before your climb.
            Browse our trekking routes and secure your place on Africa&apos;s highest peak.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trekking/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Book Your Kilimanjaro Trek
            </Link>
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Group Departures
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
