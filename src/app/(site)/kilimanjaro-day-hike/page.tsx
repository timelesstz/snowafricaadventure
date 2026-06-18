import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  TreePine,
  Camera,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  MapPin,
  Backpack,
  DollarSign,
  Sun,
  Bird,
  Heart,
  Shield,
  Calendar,
  Footprints,
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
  title: "Kilimanjaro Day Hike: Trek Without the Summit",
  description:
    "Kilimanjaro day hike options: trek through the rainforest to Mandara Hut (2,720m) on Marangu or Shira Plateau on Lemosho. No camping required. From $150 per person.",
  url: "/kilimanjaro-day-hike/",
});

const dayHikeOptions = [
  {
    name: "Marangu Route to Mandara Hut",
    elevation: "1,879m to 2,720m",
    distance: "16 km round trip",
    duration: "5-6 hours",
    difficulty: "Easy to Moderate",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    highlights: [
      "Dense montane rainforest canopy",
      "Colobus monkeys and blue monkeys",
      "Mandara Hut rest stop with lunch",
      "Maundi Crater viewpoint (optional)",
      "Well-maintained trail with gentle gradient",
    ],
    description:
      "The most popular Kilimanjaro day hike. You enter through the Marangu Gate, walk through lush rainforest alive with birdsong and monkey troops, reach Mandara Hut for a hot lunch, and return the same way. The trail is wide, well-maintained, and suitable for families with children aged 8 and above. An optional detour to Maundi Crater adds panoramic views of Moshi and the surrounding plains.",
    bestFor: "Families, first-time hikers, safari add-on",
  },
  {
    name: "Shira Plateau Route",
    elevation: "3,400m to 3,840m",
    distance: "10 km round trip",
    duration: "4-5 hours",
    difficulty: "Moderate",
    difficultyColor: "bg-amber-100 text-amber-700",
    highlights: [
      "High-altitude moorland landscape",
      "Views of Kibo peak and glaciers",
      "Giant heather and unique alpine flora",
      "Shira Cathedral rock formation",
      "Fewer crowds than Marangu",
    ],
    description:
      "A dramatic day hike across the Shira Plateau on Kilimanjaro&apos;s western flank. You drive to 3,400m before starting, which means you are already above the tree line and walking through an otherworldly moorland of giant heather and volcanic rock. The views of Kibo peak and the remaining glaciers are exceptional on clear mornings. This option suits hikers who want a taste of high-altitude Kilimanjaro without the multi-day commitment.",
    bestFor: "Experienced hikers, photographers, acclimatization",
  },
  {
    name: "Rongai Forest Walk",
    elevation: "1,950m to 2,600m",
    distance: "12 km round trip",
    duration: "4-5 hours",
    difficulty: "Easy",
    difficultyColor: "bg-emerald-100 text-emerald-700",
    highlights: [
      "Remote northern rainforest",
      "Black-and-white colobus monkeys",
      "Traditional Chagga farming villages",
      "Pine and cedar forest transition",
      "Very few other hikers",
    ],
    description:
      "The quietest Kilimanjaro day hike option. Starting from the northern Rongai side near the Kenyan border, you walk through pristine forest that sees a fraction of the traffic found on the southern routes. The trail passes through traditional Chagga farming land before entering dense forest rich with birdlife. This is the best option if you want solitude and an authentic encounter with Kilimanjaro&apos;s northern wilderness.",
    bestFor: "Nature lovers, birdwatchers, solitude seekers",
  },
];

const itinerarySteps = [
  {
    time: "6:30 AM",
    title: "Hotel Pick-Up in Moshi or Arusha",
    description:
      "Our driver collects you from your hotel in Moshi (30-minute drive) or Arusha (1.5-hour drive). You receive a packed breakfast for the journey. Your guide briefs you on the day ahead, including what to expect on the trail, safety protocols, and wildlife you may encounter.",
  },
  {
    time: "8:00 AM",
    title: "Arrive at Marangu Gate (1,879m)",
    description:
      "Register at the Kilimanjaro National Park gate. Your guide handles all paperwork and park fee payments. You sign the logbook and receive a brief safety orientation from park rangers. Porters carry your lunch pack and extra water.",
  },
  {
    time: "8:30 AM",
    title: "Begin the Rainforest Trek",
    description:
      "Step into the Kilimanjaro rainforest. The trail is wide and well-graded, climbing gently through dense canopy where sunlight filters through the leaves. Your guide identifies plants, birds, and animals along the way. Listen for the crash of colobus monkeys leaping between branches overhead.",
  },
  {
    time: "10:30 AM",
    title: "Wildlife Spotting Stop",
    description:
      "Pause at a known primate viewing area. Blue monkeys and black-and-white colobus monkeys are frequently spotted here. Your guide knows their favourite trees and feeding patterns. Bring your binoculars for birdwatching — the forest is home to Hartlaub&apos;s turaco, silvery-cheeked hornbills, and dozens of sunbird species.",
  },
  {
    time: "11:30 AM",
    title: "Arrive at Mandara Hut (2,720m)",
    description:
      "Reach Mandara Hut, a cluster of A-frame cabins in a forest clearing at 2,720m. You have gained 841m of elevation. Rest, explore the area, and enjoy a hot packed lunch prepared by our team. If energy permits, take the 20-minute detour to Maundi Crater for views across the plains to Moshi and Lake Chala.",
  },
  {
    time: "12:30 PM",
    title: "Maundi Crater Viewpoint (Optional)",
    description:
      "A short 20-minute walk from Mandara Hut leads to the rim of Maundi Crater. On clear days, the panorama stretches from Moshi town to the Pare Mountains and into Kenya. This is one of the best easily accessible viewpoints on Kilimanjaro and a perfect photo opportunity before you begin your descent.",
  },
  {
    time: "1:00 PM",
    title: "Begin Descent Through the Rainforest",
    description:
      "Retrace your steps down through the forest. The descent is easier and faster than the climb, typically taking 2 to 2.5 hours. Your guide points out plants and wildlife you may have missed on the way up. Afternoon light filters differently through the canopy, creating new photo opportunities.",
  },
  {
    time: "3:30 PM",
    title: "Return to Marangu Gate &amp; Transfer",
    description:
      "Sign out at the park gate and receive your day hike certificate. Your driver meets you for the return transfer to your hotel. You are back in Moshi by 4:30 PM and in Arusha by 5:30 PM — in time for dinner and to share your Kilimanjaro story.",
  },
];

const wildlife = [
  {
    icon: Bird,
    name: "Black-and-White Colobus Monkeys",
    description:
      "Kilimanjaro&apos;s most iconic primates. Troops of 10-30 individuals leap spectacularly between the upper canopy. Their long white tail plumes trail behind them like capes. Found between 1,800m and 2,800m on all forest routes.",
  },
  {
    icon: Bird,
    name: "Blue Monkeys",
    description:
      "Smaller and more elusive than colobus, blue monkeys forage in the mid-canopy. Despite their name, they are greyish-olive with a distinctive blue-grey face. They are curious but shy — your guide knows where to find them.",
  },
  {
    icon: Bird,
    name: "Hartlaub&apos;s Turaco",
    description:
      "A stunning forest bird with iridescent green plumage and crimson flight feathers. You will hear its distinctive call echoing through the canopy before you spot it. Endemic to East African montane forests.",
  },
  {
    icon: TreePine,
    name: "Giant Tree Ferns &amp; Mosses",
    description:
      "The rainforest floor and lower canopy are draped in thick mosses, lichens, and ferns. Giant tree ferns reach heights of 5 metres. Epiphytic orchids cling to branches overhead, some found nowhere else on Earth.",
  },
  {
    icon: Camera,
    name: "Silvery-Cheeked Hornbills",
    description:
      "Large, charismatic birds with oversized casqued bills. Their whooshing wingbeats are audible from 100 metres away. They feed on figs and fruit in the upper canopy and are a highlight for visiting birdwatchers.",
  },
  {
    icon: Sun,
    name: "Waterfall &amp; Stream Crossings",
    description:
      "The Marangu route crosses several small streams fed by glacial melt and rainfall. During the wet season, small waterfalls cascade down mossy rock faces along the trail. The sound of running water accompanies much of the walk.",
  },
];

const whoIsThisFor = [
  {
    icon: Users,
    title: "Families with Children",
    description:
      "The Marangu day hike is suitable for children aged 8 and above who are accustomed to walking. The trail is wide, well-graded, and shaded by forest canopy. There are no exposed ridges or technical sections. Children particularly enjoy the monkey encounters and the sense of achievement at Mandara Hut.",
  },
  {
    icon: Mountain,
    title: "Pre-Climb Acclimatization",
    description:
      "If you are planning a full Kilimanjaro summit attempt, a day hike one or two days before your main climb helps kickstart acclimatization. Walking to 2,720m stimulates your body to begin producing extra red blood cells. Many experienced climbers use this strategy.",
  },
  {
    icon: Calendar,
    title: "Safari Add-On Experience",
    description:
      "Spending a few days on safari in the Serengeti or Ngorongoro? A Kilimanjaro day hike is the perfect addition. You experience Africa&apos;s highest mountain without committing to a multi-day trek, and it fits neatly between safari days or as a final-day activity before your flight.",
  },
  {
    icon: Clock,
    title: "Limited Time Visitors",
    description:
      "Not everyone has 7-9 days for a full summit climb. The day hike gives you a genuine Kilimanjaro experience in just one day. You walk through the iconic rainforest zone, see wildlife, reach a mountain hut, and return with photos and stories — all before dinner.",
  },
];

const whatsIncluded = [
  "Professional English-speaking mountain guide",
  "Kilimanjaro National Park entry fees",
  "Rescue fees and conservation levies",
  "Packed lunch, snacks, and drinking water",
  "Return transport from Moshi or Arusha hotel",
  "Day hike certificate upon completion",
  "First aid kit carried by guide",
  "Binoculars for wildlife viewing",
];

const whatsNotIncluded = [
  "Travel insurance (required)",
  "Personal hiking gear and clothing",
  "Tips for guide and driver (recommended)",
  "Alcoholic beverages",
  "Items of a personal nature",
];

const whatToBring = [
  {
    category: "Footwear &amp; Clothing",
    items: [
      "Sturdy hiking boots with ankle support (broken in)",
      "Moisture-wicking base layer",
      "Lightweight fleece or insulating mid-layer",
      "Waterproof rain jacket (essential year-round)",
      "Comfortable hiking trousers (not jeans)",
      "Warm hat and sun hat",
    ],
  },
  {
    category: "Equipment",
    items: [
      "Daypack (20-30 litres)",
      "1.5-2 litres of water (we provide additional)",
      "Sunscreen SPF 50+",
      "Insect repellent",
      "Binoculars for birdwatching",
      "Camera with charged battery",
    ],
  },
  {
    category: "Personal Items",
    items: [
      "Passport or ID for park registration",
      "Cash for tips (USD or TZS)",
      "Personal medication",
      "Energy snacks (chocolate, trail mix)",
      "Wet wipes and hand sanitiser",
      "Lightweight rain trousers (optional)",
    ],
  },
];

const faqs = [
  {
    question: "Can you do a Kilimanjaro day hike without summiting?",
    answer:
      "Yes. Kilimanjaro National Park permits day hikes on several routes without any requirement to attempt the summit. The most popular option is the Marangu Route day hike from the gate (1,879m) to Mandara Hut (2,720m) and back. You experience the spectacular rainforest zone, encounter wildlife, and return to your hotel the same afternoon. No camping, no multi-day commitment, and no extreme altitude exposure.",
  },
  {
    question: "Do you need a guide for a Kilimanjaro day hike?",
    answer:
      "Yes. Kilimanjaro National Park regulations require all hikers to be accompanied by a licensed guide, even for day hikes. This is non-negotiable and enforced at the park gate. Your guide handles registration, carries a first aid kit, identifies wildlife and plants, and ensures your safety on the trail. Attempting to enter the park without a guide is not permitted.",
  },
  {
    question: "How fit do you need to be for the Kilimanjaro day hike?",
    answer:
      "The Marangu day hike to Mandara Hut requires a moderate level of fitness — equivalent to being able to walk 16 km over 5-6 hours on an undulating trail. You gain 841m of elevation, which is comparable to a hilly countryside walk. If you can walk for 3 hours without stopping, you can do this hike. No prior mountaineering experience or technical skill is needed. The Shira Plateau route requires slightly more fitness due to the higher starting altitude.",
  },
  {
    question: "Can children do the Kilimanjaro day hike?",
    answer:
      "Children aged 8 and above can do the Marangu day hike to Mandara Hut. The trail is wide, well-graded, and shaded, with no exposed or technically difficult sections. Children enjoy the monkey sightings and the adventure of walking on Africa's highest mountain. For children under 10, we recommend starting early and allowing extra time. Kilimanjaro National Park does not permit children under 10 to go above the day hike zones.",
  },
  {
    question: "How much does a Kilimanjaro day hike cost?",
    answer:
      "A Kilimanjaro day hike costs from $150 per person for the Marangu Route option, including park fees, guide, lunch, and return transport from Moshi. The Shira Plateau route costs from $180 per person due to the longer drive to the higher starting point. Group discounts are available for 4 or more hikers. Park fees alone account for approximately $70-80 of the total cost.",
  },
  {
    question: "What is the best time of year for a Kilimanjaro day hike?",
    answer:
      "Kilimanjaro day hikes are available year-round, but the best conditions are during the dry seasons: January to mid-March and June to October. During these months, rainfall is lower, trails are drier, and views are clearer. The rainforest is beautiful in all seasons — the wet months (April-May and November) bring lush greenery and more active wildlife, but trails can be muddy and slippery.",
  },
  {
    question: "Will I get altitude sickness on a Kilimanjaro day hike?",
    answer:
      "Altitude sickness is extremely unlikely on the Marangu day hike. You only reach 2,720m, which is well below the altitude where most people experience symptoms (typically above 3,000-3,500m). The Shira Plateau route reaches 3,840m, where some hikers may feel mild breathlessness or a light headache — these resolve quickly upon descent. Neither day hike option poses a significant altitude risk for healthy individuals.",
  },
  {
    question: "Can I combine a Kilimanjaro day hike with a safari?",
    answer:
      "Absolutely — and we strongly recommend it. A Kilimanjaro day hike fits perfectly before or after a northern Tanzania safari circuit (Serengeti, Ngorongoro, Tarangire, Lake Manyara). Many of our guests do a day hike on their arrival day in Moshi or as a final activity before flying home from Kilimanjaro Airport. We handle all logistics and transfers so the transition is seamless.",
  },
  {
    question: "What wildlife will I see on a Kilimanjaro day hike?",
    answer:
      "The rainforest zone is Kilimanjaro's most biodiverse. You are very likely to see black-and-white colobus monkeys and blue monkeys — sightings occur on over 90% of day hikes. Birdlife is exceptional: Hartlaub's turaco, silvery-cheeked hornbills, mountain buzzards, and numerous sunbird species. You may also spot chameleons, giant tree ferns, and orchids. Your guide knows the best viewing spots and animal behaviour patterns.",
  },
  {
    question: "Do I need to book in advance or can I walk in?",
    answer:
      "We recommend booking at least 48 hours in advance. While Kilimanjaro National Park does accept walk-in registrations, having a pre-booked guide and arranged transport ensures a smooth, early start. During peak season (July-September and December-January), the park can be busy and guides may not be available at short notice. Advance booking also allows us to prepare your packed lunch and arrange hotel transfers.",
  },
];

const relatedGuides = [
  {
    href: "/climbing-kilimanjaro/",
    icon: Mountain,
    title: "Climbing Kilimanjaro",
    subtitle: "Complete summit guide",
  },
  {
    href: "/can-beginners-climb-kilimanjaro/",
    icon: Heart,
    title: "Beginners Guide",
    subtitle: "First-time climbers",
  },
  {
    href: "/kilimanjaro-climate-zones/",
    icon: TreePine,
    title: "Climate Zones",
    subtitle: "5 ecological zones",
  },
  {
    href: "/kilimanjaro-climbing-gear/",
    icon: Backpack,
    title: "Climbing Gear",
    subtitle: "What to pack",
  },
  {
    href: "/tanzania-safaris/",
    icon: Camera,
    title: "Tanzania Safaris",
    subtitle: "Combine with a safari",
  },
  {
    href: "/trekking/",
    icon: Footprints,
    title: "Trekking Routes",
    subtitle: "All Kilimanjaro routes",
  },
  {
    href: "/kilimanjaro-join-group-departures/",
    icon: Users,
    title: "Group Departures",
    subtitle: "Join a scheduled climb",
  },
];

export default function KilimanjaroDayHikePage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Day Hike" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Day Hike", url: "/kilimanjaro-day-hike/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Day Hike: Trek Without the Summit",
            description:
              "Kilimanjaro day hike options: trek through the rainforest to Mandara Hut (2,720m) on Marangu or Shira Plateau on Lemosho. No camping required. From $150 per person.",
            url: "/kilimanjaro-day-hike/",
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
            alt="Hikers walking through the Kilimanjaro rainforest on a day hike to Mandara Hut"
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
              Day Trip Experience
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Day Hike</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Trek through Africa&apos;s most spectacular rainforest, spot colobus monkeys, and reach 2,720m on Kilimanjaro &mdash; all in a single day. No camping. No summit. No multi-day commitment. From $150 per person.
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
                <strong>Yes, you can day-hike Kilimanjaro without summiting.</strong> The most popular option is the Marangu Route from the park gate (1,879m) to Mandara Hut (2,720m) and back &mdash; a 16 km round trip through pristine rainforest that takes 5-6 hours. You will see colobus monkeys, exotic birds, giant ferns, and walk on the lower slopes of Africa&apos;s highest mountain. <strong>No camping required, no extreme altitude, and suitable for families with children aged 8+.</strong> Return to your hotel in time for dinner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day Hike Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Three Kilimanjaro Day Hike Options
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Each route offers a different experience of Kilimanjaro. The Marangu route is the most popular and family-friendly. The Shira Plateau is for those wanting high-altitude scenery. The Rongai forest walk is the quietest option.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-6">
            {dayHikeOptions.map((option, i) => (
              <div
                key={option.name}
                className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{option.name}</h3>
                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {option.elevation}
                          </span>
                          <span className="flex items-center gap-1">
                            <Footprints className="w-4 h-4" /> {option.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {option.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${option.difficultyColor}`}>
                      {option.difficulty}
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    {option.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Highlights</h4>
                      <ul className="space-y-1.5">
                        {option.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-[var(--border)]">
                      <h4 className="font-semibold text-sm mb-1">Best For</h4>
                      <p className="text-sm text-[var(--text-muted)]">{option.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Marangu Itinerary */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Marangu Day Hike: Hour-by-Hour Itinerary
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Here is exactly what to expect on the most popular Kilimanjaro day hike &mdash; from hotel pick-up to return, with every stop and highlight along the way.
              </p>
            </div>
            <div className="space-y-0">
              {itinerarySteps.map((step, i) => (
                <div key={step.time} className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {step.time.split(" ")[0]}
                    </div>
                    {i < itinerarySteps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[var(--primary)]/20 my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-heading font-bold text-lg">{step.title}</h3>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-medium">{step.time}</span>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What You&apos;ll See on the Trail
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The Kilimanjaro rainforest zone is the mountain&apos;s most biodiverse area. Over 90% of day hikers spot primates, and the birdlife is spectacular year-round.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildlife.map((item) => (
              <div
                key={item.name}
                className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Who Is the Kilimanjaro Day Hike For?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Whether you are a family, a first-time visitor to Tanzania, or a climber preparing for a full summit attempt, the day hike offers something valuable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whoIsThisFor.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included & Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                What&apos;s Included &amp; Pricing
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Included */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  What&apos;s Included
                </h3>
                <ul className="space-y-2.5">
                  {whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6">
                <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[var(--text-muted)]" />
                  Not Included
                </h3>
                <ul className="space-y-2.5">
                  {whatsNotIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-xs text-[var(--text-muted)]">&mdash;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-[var(--primary-dark)] text-white rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[var(--secondary)]" />
                  Pricing
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/60">Marangu Day Hike</p>
                    <p className="text-2xl font-bold text-[var(--secondary)]">From $150</p>
                    <p className="text-xs text-white/50">per person</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/60">Shira Plateau Hike</p>
                    <p className="text-2xl font-bold text-[var(--secondary)]">From $180</p>
                    <p className="text-xs text-white/50">per person</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/60">Rongai Forest Walk</p>
                    <p className="text-2xl font-bold text-[var(--secondary)]">From $160</p>
                    <p className="text-xs text-white/50">per person</p>
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Group discounts available for 4+ hikers. Prices include all park fees, guide, lunch, and transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                What to Bring on Your Day Hike
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                You do not need specialist mountaineering equipment for a Kilimanjaro day hike. Good hiking boots, a rain jacket, and a daypack are the essentials. Here is the complete packing list.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {whatToBring.map((group) => (
                <div key={group.category} className="bg-white rounded-xl border border-[var(--border)] p-6">
                  <h3 className="font-heading font-bold mb-4">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <Backpack className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-6">
              Need gear advice for a full summit climb?{" "}
              <Link
                href="/kilimanjaro-climbing-gear/"
                className="text-[var(--primary)] hover:underline"
              >
                See our complete Kilimanjaro gear guide &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Combining with Safari or Full Climb */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Combining Your Day Hike with a Safari or Full Climb
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
              A Kilimanjaro day hike works brilliantly as part of a broader Tanzania itinerary. Most of our guests combine it with one of these experiences:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Camera className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Safari + Day Hike Combination</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    The classic combination. Spend 3-5 days on safari in the Serengeti, Ngorongoro Crater, or Tarangire, then add a Kilimanjaro day hike on your final day before flying home from Kilimanjaro Airport. You experience the best of both worlds: big game wildlife and Africa&apos;s highest mountain. We schedule the day hike to ensure you are back in time for evening flights.
                  </p>
                  <Link
                    href="/tanzania-safaris/"
                    className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
                  >
                    Browse our Tanzania safari packages &rarr;
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mountain className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Pre-Climb Acclimatization Hike</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Many experienced climbers do a day hike one or two days before their full summit attempt. Walking to 2,720m on the Marangu route &mdash; or even 3,840m on the Shira Plateau &mdash; gives your body a head start on acclimatization. This is especially valuable if you are flying in from sea level and starting your climb within 24-48 hours of arrival in Tanzania. Your body begins producing extra red blood cells sooner, giving you an edge on summit day.
                  </p>
                  <Link
                    href="/climbing-kilimanjaro/"
                    className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
                  >
                    Read our complete Kilimanjaro climbing guide &rarr;
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">Family &amp; Group Activity Day</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Travelling with family members who cannot or do not want to summit? The day hike gives everyone a Kilimanjaro experience. While the climbers in your group tackle the full multi-day route, families, older travellers, or those with limited time can do the day hike independently and still say they walked on Kilimanjaro. We have had guests aged 8 to 78 complete the Mandara Hut day hike.
                  </p>
                  <Link
                    href="/can-beginners-climb-kilimanjaro/"
                    className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
                  >
                    Can beginners climb Kilimanjaro? &rarr;
                  </Link>
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

      <KnowledgeBase exclude="/kilimanjaro-day-hike/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Book Your Kilimanjaro Day Hike
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Walk through Kilimanjaro&apos;s spectacular rainforest, spot colobus monkeys, reach Mandara Hut at 2,720m, and return to your hotel in time for dinner. From $150 per person, all-inclusive.
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
