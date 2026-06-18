import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Heart,
  Users,
  Camera,
  Sunrise,
  Calendar,
  DollarSign,
  Compass,
  ArrowRight,
  Star,
  Tent,
  Palmtree,
  MapPin,
  Sparkles,
  CheckCircle,
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
  title: "Kilimanjaro Honeymoon: Summit Together in 2026",
  description:
    "Plan a Kilimanjaro honeymoon adventure: romantic summit experience, private treks for couples, safari combo packages, best routes for couples, and Zanzibar extension.",
  url: "/kilimanjaro-honeymoon/",
});

const whyKiliHoneymoon = [
  {
    icon: Heart,
    title: "A Shared Challenge That Bonds You",
    description:
      "Climbing Kilimanjaro together is nothing like a poolside holiday. You will push through exhaustion, encourage each other at 4 AM on summit night, and share an achievement that fewer than 0.01% of couples ever experience. That shared struggle creates a bond that no resort holiday can replicate. Couples who have climbed with us consistently tell us it was the most meaningful experience of their relationship.",
  },
  {
    icon: Star,
    title: "A Truly Unique Alternative to the Beach",
    description:
      "Every couple honeymooning in East Africa visits Zanzibar or the Maldives. Very few stand together on the roof of Africa at 5,895 metres. A Kilimanjaro honeymoon gives you a story that is entirely yours — not a carbon copy of everyone else’s tropical holiday. It signals who you are as a couple: adventurous, resilient, and willing to do something extraordinary together.",
  },
  {
    icon: Sunrise,
    title: "Summit Sunrise Together",
    description:
      "Reaching Uhuru Peak at dawn and watching the sun rise over the African continent while standing next to your partner is a moment that defies description. The sky shifts from deep indigo to fiery orange, glaciers glow pink, and the shadow of Kilimanjaro stretches across the plains below. You will hold each other at the highest point in Africa as the world wakes up beneath you.",
  },
  {
    icon: Camera,
    title: "Incredible Photos You Will Treasure Forever",
    description:
      "From rainforest canopy shots on day one to above-the-clouds summit portraits, a Kilimanjaro honeymoon delivers photographs that are genuinely jaw-dropping. The landscapes change dramatically every day — lush jungle, otherworldly moorland, alpine desert, glacial ice — giving you a visual narrative of your journey together that no studio could ever recreate.",
  },
];

const honeymoonExtras = [
  {
    title: "Private Trek (Just the Two of You)",
    description:
      "Your own dedicated guide team, porters, and cook. You set the pace, choose when to rest, and enjoy the mountain without sharing camp schedules with strangers. Every meal is prepared for two. Your guide adjusts the daily plan around your energy levels and preferences.",
  },
  {
    title: "Upgraded Tents & Sleeping Arrangements",
    description:
      "We provide a larger two-person expedition tent with extra-thick sleeping mats, a double-width sleeping setup, and a private dining tent for evening meals. These are not the cramped standard-issue tents — you will have genuine space and comfort at every camp.",
  },
  {
    title: "Celebration Dinner at Summit Camp",
    description:
      "The night before your summit push, our mountain chef prepares a special celebration dinner. Think hearty stew, freshly baked bread, hot chocolate, and a surprise dessert — all served in your private dining tent at Barafu or Kosovo Camp. It is a calm, intimate moment before the biggest day of your trek.",
  },
  {
    title: "Champagne Toast at Uhuru Peak",
    description:
      "We carry a bottle of sparkling wine to the summit (securely packed and insulated) so you can toast your achievement at 5,895 metres. Your guide captures the moment on camera. This is a tradition among our honeymoon couples and it never gets old — the looks on climbers’ faces around you are priceless.",
  },
];

const safariCombo = [
  {
    destination: "Serengeti National Park",
    days: "2–3 days",
    highlight:
      "Witness the Great Migration, big cat sightings, and vast golden plains. A private safari vehicle means you can linger at sightings as long as you wish without a group itinerary dictating your time.",
  },
  {
    destination: "Ngorongoro Crater",
    days: "1 day",
    highlight:
      "The world’s largest intact volcanic caldera, home to 25,000+ animals in a 260 km² natural amphitheatre. You will spot the Big Five in a single day. Pair it with a crater-rim lodge for a romantic evening overlooking the caldera.",
  },
  {
    destination: "Tarangire National Park",
    days: "1–2 days",
    highlight:
      "Massive elephant herds, ancient baobab trees, and far fewer tourists than the Serengeti. Ideal for couples who value exclusivity and quieter game drives.",
  },
];

const budgetBreakdown = [
  {
    item: "Private Lemosho 8-Day for 2 Climbers",
    price: "$5,800 – $7,200 per person",
    notes:
      "Includes all park fees, professional guide team, meals, camping equipment, and transfers. The per-person cost is higher for private treks because fixed costs (guide team, cook, permits) are shared between only two people instead of a larger group.",
  },
  {
    item: "Join a Group Departure (2 Climbers)",
    price: "$2,800 – $3,800 per person",
    notes:
      "Share the mountain with 4–10 other climbers. Lower cost but less privacy. You can still share a tent as a couple. Some group departures have a romantic, social energy that honeymoon couples enjoy.",
  },
  {
    item: "Honeymoon Add-On Package",
    price: "$300 – $500 per couple",
    notes:
      "Upgraded tent, private dining tent, celebration dinner, champagne toast at summit, and a small honeymoon gift. Available on any private trek.",
  },
  {
    item: "Post-Climb Safari (3–5 Days)",
    price: "$1,500 – $3,500 per person",
    notes:
      "Depends on duration, parks visited, and accommodation level (luxury lodge vs. tented camp). Serengeti + Ngorongoro is the most popular combination for honeymoon couples.",
  },
  {
    item: "Zanzibar Extension (3–5 Days)",
    price: "$800 – $2,500 per person",
    notes:
      "Depends on hotel category. Budget beach hotels from $80/night, mid-range from $150/night, and luxury resorts from $400/night. Internal flight Kilimanjaro to Zanzibar costs approximately $150–$250 per person.",
  },
];

const bestTimes = [
  {
    period: "January – March",
    rating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    description:
      "Warm and relatively dry on the mountain, though occasional short rains are possible in March. Fewer crowds than peak season. A solid choice for couples who want quieter trails. Combine with Serengeti calving season for incredible wildlife.",
  },
  {
    period: "June – October",
    rating: "Best",
    ratingColor: "bg-emerald-100 text-emerald-700",
    description:
      "The primary dry season. Clear skies, stable weather, and the best summit views. July and August are the busiest months, so book well in advance. September and October offer the same conditions with fewer climbers — ideal for honeymoon couples seeking solitude.",
  },
  {
    period: "Late December",
    rating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    description:
      "Popular with couples taking advantage of Christmas and New Year holiday breaks. Weather is generally good between the short and long rains. Summit on New Year’s Day for a truly unforgettable start to married life.",
  },
];

const coupleTips = [
  {
    title: "Pace Yourselves — Walk Together, Not Competitively",
    description:
      "Altitude affects everyone differently, regardless of fitness. One of you may feel strong while the other struggles. Walk at the pace of the slower partner. This is not a race — it is a shared journey. On a private trek, your guide adjusts the pace to suit both of you, so there is no pressure from a group schedule.",
  },
  {
    title: "Separate Sleeping Bags, Shared Tent",
    description:
      "You will each need your own sleeping bag rated to -15°C or below. At high camp, temperatures drop to -10°C and sharing a sleeping bag is not practical at altitude — your body needs insulation from every angle. Our upgraded honeymoon tents give you more space so you can zip bags together on warmer nights at lower camps.",
  },
  {
    title: "Summit Night Is an Individual Effort",
    description:
      "The summit push from midnight to dawn is the hardest physical and mental challenge of the trek. At 5,000+ metres, each step demands focus. You may not be able to hold hands or talk much — and that is normal. Stay close, check in with each other, but understand that you will each be in your own personal battle. The reunion at Uhuru Peak makes it all worthwhile.",
  },
  {
    title: "Support Each Other Through the Hard Days",
    description:
      "Day three or four often brings the worst altitude symptoms. Headaches, nausea, and exhaustion can test your patience. Be kind to each other. Carry your partner’s water bottle when they are struggling. Share a snack. A quiet word of encouragement at the right moment can be the difference between a partner wanting to turn back and pushing through to the summit.",
  },
  {
    title: "Communicate Honestly About How You Feel",
    description:
      "Never hide symptoms to avoid worrying your partner. Altitude sickness is a medical issue, not a sign of weakness. Tell your guide everything. Tell your partner everything. Transparency on the mountain keeps both of you safe. Our guides monitor both climbers independently, but your own honesty is the first line of defence.",
  },
  {
    title: "Celebrate Every Milestone, Not Just the Summit",
    description:
      "Take photos at every camp. Mark each altitude gain with a moment together. Reaching Lava Tower at 4,630m is an achievement. Arriving at Barranco Wall is an achievement. If you focus only on Uhuru Peak, you will miss the magic of the journey itself — and the journey is where most of your honeymoon memories will live.",
  },
];

const faqs = [
  {
    question: "Can couples share a tent on Kilimanjaro?",
    answer:
      "Yes, absolutely. On a private trek, you will share a two-person tent at every camp. We provide upgraded, larger tents for honeymoon couples with extra-thick sleeping mats and more internal space than standard expedition tents. On group departures, couples can also share a tent — just let us know when booking. You will each need your own sleeping bag, but you can zip them together on warmer nights at lower elevations.",
  },
  {
    question: "Is climbing Kilimanjaro actually romantic?",
    answer:
      "It is romantic in a deeply meaningful way — not in a champagne-and-roses way (though we do bring champagne to the summit). The romance comes from shared vulnerability, mutual encouragement through exhaustion, and standing together at the highest point in Africa at sunrise. Couples who have climbed with us describe it as the most bonding experience of their relationship. The romance is earned, not served — and that makes it more powerful than any luxury resort experience.",
  },
  {
    question: "How much does a Kilimanjaro honeymoon cost for two people?",
    answer:
      "A private 8-day Lemosho trek for two costs $5,800–$7,200 per person, including park fees, guide team, meals, and equipment. The honeymoon add-on package (upgraded tent, private dining, celebration dinner, champagne toast) adds $300–$500 per couple. A post-climb safari adds $1,500–$3,500 per person depending on parks and accommodation. Zanzibar adds $800–$2,500 per person. Total all-inclusive honeymoon: roughly $10,000–$20,000 per couple for climb + safari + beach. Group departures bring the climbing portion down to $2,800–$3,800 per person.",
  },
  {
    question: "What is the best route for a honeymoon climb?",
    answer:
      "We recommend the 8-day Lemosho Route for honeymoon couples. It offers the best combination of scenery, acclimatization (93% summit success rate), and exclusivity (quieter first few days through pristine rainforest). The gradual ascent profile means less physical stress, giving you more energy to enjoy the experience rather than just surviving it. The route also passes through every ecological zone on Kilimanjaro, providing the most varied and photogenic journey.",
  },
  {
    question: "Can we combine Kilimanjaro with a beach honeymoon?",
    answer:
      "Yes — and most honeymoon couples do. The classic combination is Kilimanjaro climb (7–8 days) followed by a flight to Zanzibar (3–5 days of beach relaxation). The contrast is extraordinary: from snow and glaciers at 5,895m to white sand beaches and turquoise water within 24 hours. We arrange the internal flight from Kilimanjaro Airport to Zanzibar and can book your beach accommodation. Alternatively, add a 3–5 day Serengeti and Ngorongoro safari between the climb and the beach for the ultimate East African honeymoon.",
  },
  {
    question: "Do we need to be very fit to climb Kilimanjaro as a couple?",
    answer:
      "You need a reasonable base fitness level — the ability to hike 6–8 hours per day for consecutive days. You do not need to be athletes. Many honeymoon couples are recreational hikers or gym-goers who follow a 12-week training plan before their trip. The key is consistency: regular cardio, some hill training, and a few long hikes with a loaded daypack. Altitude affects fit and unfit people equally, so route choice and acclimatization matter far more than your VO2 max.",
  },
  {
    question: "What if one of us cannot make it to the summit?",
    answer:
      "On a private trek, our guide team includes enough guides to split if needed. If one partner needs to descend due to altitude sickness or exhaustion, a dedicated guide accompanies them safely back to a lower camp while the other partner continues to the summit with the lead guide. This scenario is uncommon but we plan for it on every expedition. No one is ever left alone on the mountain.",
  },
  {
    question: "Is there a honeymoon package or special celebration on the mountain?",
    answer:
      "Yes. Our honeymoon add-on package includes an upgraded two-person tent with extra sleeping mats, a private dining tent, a celebration dinner at summit camp the night before summit day, a bottle of sparkling wine carried to Uhuru Peak for a summit toast, and a small honeymoon gift. Our guides also decorate your tent on arrival nights at lower camps. The package costs $300–$500 per couple and is available on any private trek.",
  },
  {
    question: "When is the best time to climb Kilimanjaro for a honeymoon?",
    answer:
      "The best months are June through October (dry season) for the most reliable weather and clearest summit views. September and early October are particularly good for honeymoon couples as the trails are quieter than the July–August peak. January to early March is another good window, especially if you want to combine with Serengeti calving season. Late December is popular with couples taking Christmas or New Year holiday breaks. Avoid April, May, and November — these are the rainy seasons.",
  },
  {
    question: "How do we book a Kilimanjaro honeymoon with Snow Africa?",
    answer:
      "Contact us through our enquiry form or email with your preferred dates, route preference, and any add-ons (safari, Zanzibar, honeymoon package). We will build a custom itinerary around your honeymoon timeline and budget. A 30% deposit secures your booking, with the balance due 60 days before your climb date. We handle everything: airport transfers, hotel in Moshi, park permits, equipment, guides, porters, and any post-climb extensions. Most couples book 4–6 months in advance to secure their preferred dates.",
  },
];

export default function KilimanjaroHoneymoonPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Kilimanjaro Honeymoon" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Kilimanjaro Honeymoon", url: "/kilimanjaro-honeymoon/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Honeymoon: Summit Together in 2026",
            description:
              "Plan a Kilimanjaro honeymoon adventure: romantic summit experience, private treks for couples, safari combo packages, best routes for couples, and Zanzibar extension.",
            url: "/kilimanjaro-honeymoon/",
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
              "Honeymoon Trek Specialist",
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
            alt="Couple trekking together on Kilimanjaro with glaciers in the background"
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
              Couples &amp; Honeymoon
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Honeymoon</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Summit Africa&apos;s highest peak together. A private climb for two, a champagne toast at 5,895m, and a honeymoon story that no one else will have.
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
                A Kilimanjaro honeymoon is the <strong>ultimate alternative to a traditional beach holiday</strong>. You and your partner climb Africa&apos;s highest mountain together on a <strong>private trek with your own guide team</strong>, share upgraded tents, enjoy a celebration dinner at summit camp, and toast with champagne at Uhuru Peak at sunrise. Most couples combine it with a <strong>3&ndash;5 day safari</strong> and a <strong>Zanzibar beach extension</strong> for the complete East African honeymoon. The <Link href="/best-route-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">best route</Link> for couples is the <strong>8-day Lemosho</strong> (93% summit success rate), and the <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline font-semibold">total cost</Link> for two people ranges from <strong>$10,000&ndash;$20,000</strong> depending on add-ons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kilimanjaro for Your Honeymoon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Kilimanjaro for Your Honeymoon?
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Forget the same all-inclusive resort that every couple books. A Kilimanjaro honeymoon delivers something no luxury hotel ever can: a shared achievement that defines who you are together.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {whyKiliHoneymoon.map((reason) => (
              <div
                key={reason.title}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3">{reason.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Route for Couples */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Best Route for Couples: Lemosho 8-Day
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              We recommend the <strong>8-day Lemosho Route</strong> for almost every honeymoon couple. Here is why it stands above the other options:
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">93% Summit Success Rate</h3>
                  <p className="text-sm text-[var(--text-muted)]">The highest success rate of any standard route. Eight days give your bodies ample time to acclimatize, dramatically reducing the risk of altitude sickness forcing a turnaround. On a honeymoon climb, reaching the summit together is everything &mdash; and the Lemosho route gives you the best chance of making that happen.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Most Scenic Route on Kilimanjaro</h3>
                  <p className="text-sm text-[var(--text-muted)]">Lemosho passes through every ecological zone: dense rainforest, heather moorland, alpine desert, and glacial summit. The variety means stunning, constantly changing backdrops for your honeymoon photos. The Shira Plateau and Barranco Wall are particularly photogenic.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Quiet First Few Days</h3>
                  <p className="text-sm text-[var(--text-muted)]">The Lemosho starting point has low traffic, meaning the first two to three days feel genuinely remote and private. You will often have the trail to yourselves &mdash; perfect for a honeymoon. The route merges with the busier Machame trail only on day four or five.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Private Departure Flexibility</h3>
                  <p className="text-sm text-[var(--text-muted)]">On a private trek, your guide team tailors the daily schedule to you. Want to spend an extra 30 minutes at a viewpoint? Done. Need a slower pace today? No problem. A private Lemosho departure means the mountain adapts to your honeymoon, not the other way around.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/best-route-to-climb-kilimanjaro/"
                className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                Compare all 6 Kilimanjaro routes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/trekking/"
                className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                View Lemosho itinerary &amp; pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What a Honeymoon Climb Looks Like */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What a Honeymoon Climb Looks Like
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              A honeymoon trek is not a standard group climb with &ldquo;honeymoon&rdquo; stamped on the invoice. Every detail is designed around the two of you.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {honeymoonExtras.map((extra, i) => (
              <div
                key={i}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{extra.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {extra.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kilimanjaro + Safari Combo */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Kilimanjaro + Safari Combo
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                After 7&ndash;8 days on the mountain, a 3&ndash;5 day private safari is the perfect way to decompress. You have earned it. Swap hiking boots for a safari vehicle, and trade altitude for wildlife.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {safariCombo.map((safari) => (
                <div
                  key={safari.destination}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="w-10 h-10 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5 text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{safari.destination}</h3>
                  <p className="text-xs text-white/50 mb-3">{safari.days}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{safari.highlight}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tanzania-safaris/"
                className="inline-flex items-center gap-2 text-[var(--secondary)] hover:text-white font-semibold transition-colors"
              >
                Browse our safari packages
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kilimanjaro + Zanzibar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center">
                <Palmtree className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Kilimanjaro + Zanzibar
                </h2>
                <p className="text-[var(--text-muted)] text-sm">The ultimate contrast: glaciers to beach</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The classic East African honeymoon combination: climb the highest mountain on the continent, then fly to the white sand beaches of Zanzibar. Within 24 hours, you go from snow and glaciers at 5,895 metres to turquoise Indian Ocean water and swaying palm trees. The physical and sensory contrast is extraordinary &mdash; and your body will thank you for the recovery time.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Most honeymoon couples spend <strong>3&ndash;5 days on Zanzibar</strong> after their climb. The island offers everything you would want from a beach honeymoon: world-class snorkelling and diving, spice plantation tours, Stone Town&apos;s historic alleyways, sunset dhow cruises, and some of the most beautiful boutique hotels in East Africa. After the intensity of Kilimanjaro, lying on a beach reading a book while your muscles recover feels like absolute paradise.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              We arrange the <strong>internal flight from Kilimanjaro Airport to Zanzibar</strong> (about 1 hour) and can book your beach accommodation to match your budget and style &mdash; from charming budget guesthouses to ultra-luxury private-pool villas. The flight costs approximately $150&ndash;$250 per person.
            </p>
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-600 shrink-0 mt-1" />
              <p className="text-cyan-800 text-sm">
                <strong>Pro Tip:</strong> If budget allows, add a 2&ndash;3 day Serengeti safari <em>between</em> Kilimanjaro and Zanzibar. The sequence becomes: summit &rarr; safari &rarr; beach. Three completely different experiences in one honeymoon. Most couples who do this tell us it was the best trip of their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget for a Honeymoon Climb */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Budget for a Honeymoon Climb
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Honest pricing for every component of a Kilimanjaro honeymoon. No hidden fees. All park fees, guides, meals, and equipment are included in our climb prices.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Component</th>
                  <th className="text-left px-4 py-3 font-semibold">Price Range</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {budgetBreakdown.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`border-t border-[var(--border)] ${
                      i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{row.item}</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">{row.price}</td>
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
              href="/kilimanjaro-prices/"
              className="text-[var(--primary)] hover:underline"
            >
              See our full Kilimanjaro pricing breakdown &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Best Time for a Honeymoon Climb */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Best Time for a Honeymoon Climb
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Timing your Kilimanjaro honeymoon around the dry seasons gives you the best weather, clearest views, and safest conditions. For a detailed month-by-month breakdown, see our <Link href="/best-time-to-climb-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">best time to climb Kilimanjaro</Link> guide. Avoid April, May, and November &mdash; these are the rainy seasons when trails are muddy, cloud cover hides the views, and summit success rates drop.
            </p>
            <div className="space-y-4">
              {bestTimes.map((time) => (
                <div
                  key={time.period}
                  className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-lg">{time.period}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${time.ratingColor}`}>
                        {time.rating}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {time.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Climbing as a Couple */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Tips for Climbing Kilimanjaro as a Couple
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Practical advice from our guides who have led dozens of honeymoon couples to the summit. The mountain has its own rules &mdash; respect them and you will have an unforgettable experience together.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {coupleTips.map((tip, i) => (
              <div
                key={tip.title}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/kilimanjaro-training-plan/"
              className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1"
            >
              Get our 12-week Kilimanjaro training plan <ArrowRight className="w-4 h-4" />
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/climbing-kilimanjaro/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Compass className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all 6 routes</p>
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <DollarSign className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)]">Full cost breakdown</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Group Departures</p>
                <p className="text-xs text-[var(--text-muted)]">Join a scheduled climb</p>
              </Link>
              <Link href="/tanzania-safaris/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <MapPin className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Tanzania Safaris</p>
                <p className="text-xs text-[var(--text-muted)]">Post-climb safari packages</p>
              </Link>
              <Link href="/trekking/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Trekking Routes</p>
                <p className="text-xs text-[var(--text-muted)]">All routes &amp; itineraries</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-honeymoon/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Plan Your Kilimanjaro Honeymoon
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Private treks for two, upgraded camping, celebration dinners, champagne at the summit, and seamless safari and Zanzibar extensions. Tell us your dates and we will build your dream honeymoon itinerary.
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
