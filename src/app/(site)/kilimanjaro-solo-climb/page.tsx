import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mountain,
  Users,
  Shield,
  Heart,
  Globe,
  DollarSign,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Map,
  UserCheck,
  Calendar,
  Backpack,
  Phone,
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
  title: "Climbing Kilimanjaro Solo: Guide for Solo Trekkers",
  description:
    "Can you climb Kilimanjaro solo? Not unguided — but solo travellers thrive on group departures. Costs, safety, meeting fellow climbers, and booking as a single traveller.",
  url: "/kilimanjaro-solo-climb/",
});

const groupVsPrivate = [
  {
    aspect: "Cost (7-day Lemosho)",
    group: "From $2,150 per person",
    private: "From $3,200+ per person",
    note: "Group climbs share fixed costs (guide fees, park fees, camp logistics) across more people",
  },
  {
    aspect: "Companions",
    group: "4-12 climbers from around the world",
    private: "Just you and your guide team",
    note: "Group climbs are the top choice for solo travellers wanting to meet people",
  },
  {
    aspect: "Flexibility",
    group: "Fixed itinerary and pace",
    private: "Fully customisable schedule",
    note: "Private climbs let you choose your start date and pace",
  },
  {
    aspect: "Social Experience",
    group: "Built-in community, shared meals, summit night bonding",
    private: "Solitary experience with your guide team",
    note: "Many solo travellers form lasting friendships on group climbs",
  },
  {
    aspect: "Guide Attention",
    group: "Shared across the group (1 guide per 2-3 climbers)",
    private: "Dedicated to you",
    note: "Both options include full safety monitoring and support",
  },
];

const soloTravelBenefits = [
  {
    icon: Heart,
    title: "Complete Freedom",
    description:
      "No compromising on dates, routes, or pace. You choose the itinerary that works best for your schedule and fitness level. Want to add a safari before your climb? A Zanzibar extension afterwards? When you travel solo, every decision is yours.",
  },
  {
    icon: Globe,
    title: "Meet People from Every Continent",
    description:
      "Solo travellers on Kilimanjaro group departures regularly meet climbers from 6-10 different countries. The mountain attracts an incredible mix of people — teachers from Australia, engineers from Germany, nurses from Canada, students from Japan. These connections often outlast the trip itself.",
  },
  {
    icon: UserCheck,
    title: "Personal Growth and Confidence",
    description:
      "There is something profoundly transformative about taking on Africa&apos;s highest peak on your own terms. Solo travellers consistently report that summiting Kilimanjaro was a turning point in their self-confidence. You planned it, you trained for it, you did it — nobody else made the decision for you.",
  },
  {
    icon: Mountain,
    title: "Deeper Connection with the Mountain",
    description:
      "Without the distraction of managing group dynamics among friends, solo travellers often describe a more mindful, immersive experience. You are free to walk in silence when you need to, to take in the views at your own pace, and to fully absorb one of the most remarkable landscapes on Earth.",
  },
  {
    icon: Calendar,
    title: "Easier Scheduling",
    description:
      "Coordinating a Kilimanjaro trip with friends or family can take months of back-and-forth on dates and budgets. As a solo traveller, you pick a departure date that works for you and book it. Our group departures run monthly, giving you plenty of options.",
  },
];

const bestRoutesForSolo = [
  {
    route: "Lemosho 8-Day",
    soloRating: "Best",
    ratingColor: "bg-emerald-100 text-emerald-700",
    reason:
      "Most popular premium route — attracts the most group departures and fellow travellers. Excellent acclimatization profile with 93% success rate. Our top recommendation for solo climbers.",
    slug: "8-days-lemosho-route",
    recommended: true,
  },
  {
    route: "Machame 7-Day",
    soloRating: "Excellent",
    ratingColor: "bg-emerald-100 text-emerald-700",
    reason:
      "The most popular route on Kilimanjaro — you will encounter many other groups on the trail. Known as the Whiskey Route for its challenging and rewarding profile. Great for meeting fellow climbers.",
    slug: "7-days-machame-route",
  },
  {
    route: "Marangu 6-Day",
    soloRating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    reason:
      "The only route with hut accommodation, which means shared dining halls where you naturally meet other climbers. Less physically demanding but lower summit success rate.",
  },
  {
    route: "Rongai 7-Day",
    soloRating: "Good",
    ratingColor: "bg-amber-100 text-amber-700",
    reason:
      "Quieter, northern approach — fewer people on the trail but a more intimate group experience. Good choice if you prefer a peaceful trek over a social one.",
    slug: "6-days-rongai-route",
  },
  {
    route: "Northern Circuit 9-Day",
    soloRating: "Moderate",
    ratingColor: "bg-orange-100 text-orange-700",
    reason:
      "The longest and most remote route with fewer group departures. Best acclimatization on the mountain (95% success rate) but fewer opportunities to meet other groups on the trail.",
  },
];

const soloChecklist = [
  {
    category: "Before Booking",
    items: [
      "Research routes — Lemosho and Machame offer the best group sizes for solo travellers",
      "Choose a group departure date that suits your schedule (our departures run monthly)",
      "Budget for the climb plus flights, travel insurance, visa, tips, and gear",
      "Take out comprehensive travel insurance that covers high-altitude trekking to 6,000m",
      "Book early — popular departure dates fill 2-3 months in advance",
    ],
  },
  {
    category: "Preparation",
    items: [
      "Follow a 12-week training plan focusing on cardio and hill walking",
      "Visit your doctor for a fitness assessment and Diamox prescription",
      "Purchase or rent quality trekking gear — layering system is essential",
      "Join the WhatsApp group for your departure date to connect with fellow climbers",
      "Share your itinerary and emergency contacts with someone at home",
    ],
  },
  {
    category: "On the Mountain",
    items: [
      "Introduce yourself to your group on day one — everyone appreciates a friendly face",
      "Share meals at the communal dining table rather than eating alone in your tent",
      "Walk with different people each day — you will hear incredible stories",
      "Stay hydrated (3-4 litres daily) and report any symptoms to your guide immediately",
      "On summit night, look after your group mates — the shared struggle creates lifelong bonds",
    ],
  },
  {
    category: "Safety Essentials",
    items: [
      "Register your trip with your country&apos;s embassy in Tanzania",
      "Carry photocopies of your passport and insurance documents separately from originals",
      "Keep a fully charged power bank — communication is essential for solo travellers",
      "Know your guide&apos;s name and phone number, and your operator&apos;s emergency contact",
      "Share your daily itinerary with someone at home via WhatsApp each evening",
    ],
  },
];

const faqs = [
  {
    question: "Can I climb Kilimanjaro completely alone without a guide?",
    answer:
      "No. Kilimanjaro National Park (KINAPA) regulations require every climber to be accompanied by a licensed guide. You cannot enter the park gates without a registered operator, a certified guide, and the required support team (porters, cook). This is a strict safety regulation — solo unguided climbing is illegal on Kilimanjaro. However, you can absolutely book as a solo traveller and join a group departure or arrange a private climb with just you and your guide team.",
  },
  {
    question: "Is it safe to climb Kilimanjaro as a solo traveller?",
    answer:
      "Yes — solo travellers are arguably safer than private groups because you are climbing with an established operator on a scheduled departure with a full guide team. You benefit from the same safety protocols as every other climber: twice-daily health monitoring with pulse oximetry, emergency oxygen on every expedition, and guides trained in altitude illness recognition. Your guide team includes a lead guide, assistant guides, porters, and a cook. You are never truly alone on the mountain.",
  },
  {
    question: "How much does it cost to climb Kilimanjaro as a solo traveller?",
    answer:
      "Joining a group departure as a solo traveller is the most affordable option, starting from around $2,150 for a 7-day Lemosho route. This includes park fees, guide team, meals, camping equipment, and airport transfers. A private solo climb costs significantly more — typically $3,200+ for the same route — because all fixed costs (guide fees, vehicle, cook) are borne by one person instead of being shared. Some operators charge a single supplement of $100-200 for a private tent on group departures.",
  },
  {
    question: "Is there a single supplement for solo climbers?",
    answer:
      "On most of our group departures, solo travellers automatically receive their own tent at no extra charge — we do not charge a single supplement for camping. You will have your own sleeping tent for privacy while sharing communal dining and social spaces with the group. On the Marangu route, which uses hut accommodation, you may share a room with another climber of the same gender unless you request a private room (subject to availability and a small supplement).",
  },
  {
    question: "Will I meet other climbers on a group departure?",
    answer:
      "Absolutely. Our group departures typically include 4-12 climbers from around the world, and many are solo travellers just like you. Before the trip, we create a WhatsApp group so you can introduce yourself and connect with your fellow climbers. On the mountain, you share meals, trek together, and support each other on summit night. Many of our solo travellers tell us the friendships they formed on Kilimanjaro are the highlight of their trip.",
  },
  {
    question: "Can I book a private climb just for myself?",
    answer:
      "Yes. A private solo climb gives you a dedicated guide team (lead guide, assistant guide, porters, cook) exclusively for you. You choose your start date, pace, and any customisations to the itinerary. This is the premium option — expect to pay $3,200+ for a 7-day route. Some solo travellers prefer the privacy and flexibility, while others prefer the social experience and cost savings of a group departure. We are happy to help you decide which option suits you best.",
  },
  {
    question: "What is the best route for solo travellers?",
    answer:
      "The 8-day Lemosho route is our top recommendation for solo travellers. It has the most group departures (meaning more companions to trek with), an excellent acclimatization profile with a 93% summit success rate, and stunning scenery across five climate zones. The 7-day Machame route is another excellent choice — it is the most popular route on Kilimanjaro, so you will encounter many other groups on the trail even beyond your own.",
  },
  {
    question: "How do I meet fellow climbers before the trip?",
    answer:
      "Once you book a group departure, we add you to a WhatsApp group with your fellow climbers. This is where introductions happen, gear questions get answered, and excitement builds. Many groups arrange to meet in Moshi the evening before the climb for a pre-trek dinner. On the mountain, shared meals at the communal dining table are the natural social hub. By day two, you will know everyone by name.",
  },
  {
    question: "Is Kilimanjaro a good first solo travel experience?",
    answer:
      "Kilimanjaro is one of the best first solo travel experiences you can have. Everything is organised for you — airport transfers, accommodation, the climb itself, meals, and equipment. You do not need to navigate unfamiliar cities, arrange local transport, or find food. Your guide team handles all logistics. All you need to do is show up, trek, and enjoy. The structured nature of a Kilimanjaro climb removes the anxiety that often accompanies solo travel in East Africa.",
  },
  {
    question: "Should I add a safari or Zanzibar as a solo traveller?",
    answer:
      "Many solo travellers combine their Kilimanjaro climb with a 3-5 day Tanzania safari or a Zanzibar beach extension. Safari group departures work the same way — you join a small group and share the vehicle and costs. Zanzibar is extremely solo-traveller friendly with a well-established tourism infrastructure. We can package your climb with either or both, handling all transfers and logistics so you never feel stranded between activities.",
  },
];

export default function KilimanjaroSoloClimbPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Solo Climb Guide" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Solo Climb Guide", url: "/kilimanjaro-solo-climb/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Climbing Kilimanjaro Solo: Guide for Solo Trekkers",
            description:
              "Can you climb Kilimanjaro solo? Not unguided — but solo travellers thrive on group departures. Costs, safety, meeting fellow climbers, and booking as a single traveller.",
            url: "/kilimanjaro-solo-climb/",
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
            alt="Solo traveller trekking Kilimanjaro with a group of fellow climbers and guides"
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
              Solo Traveller Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Climbing Kilimanjaro <span className="text-[var(--secondary)]">Solo</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              You cannot climb Kilimanjaro without a guide — but solo travellers thrive on group departures. Everything you need to know about costs, safety, meeting fellow climbers, and booking as a single traveller.
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
                <strong>You cannot climb Kilimanjaro without a licensed guide</strong> — it is illegal under KINAPA (Kilimanjaro National Park) regulations. But &quot;climbing solo&quot; does not mean climbing alone. It means <strong>booking as an individual traveller</strong> and joining a scheduled group departure with 4-12 other climbers from around the world. It is the most popular and affordable way to climb Kilimanjaro, and <strong>many of our climbers are solo travellers</strong> who form lasting friendships on the mountain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Can You Climb Kilimanjaro Alone? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Can You Climb Kilimanjaro Alone?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The short answer is no — not unguided. Kilimanjaro National Park Authority (KINAPA) requires every climber to be accompanied by a <strong>licensed guide and registered tour operator</strong>. You cannot enter the park gates without them. This is a strict safety regulation, not a suggestion, and it applies to every person on the mountain regardless of experience.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The longer answer is more encouraging. When people search for &quot;climbing Kilimanjaro solo,&quot; they almost always mean one of two things: either they want to climb without hiring a guide (which is not possible), or they want to <strong>book the trip as an individual traveller</strong> without needing to bring friends or family along. The second scenario is not only possible — it is one of the most common ways people climb Kilimanjaro. <Link href="/kilimanjaro-women-climbing/" className="text-[var(--primary)] hover:underline font-semibold">Solo female travellers</Link> are especially well represented among our individual bookings.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Every month, we welcome solo travellers from around the world who join our <Link href="/kilimanjaro-join-group-departures/" className="text-[var(--primary)] hover:underline font-medium">scheduled group departures</Link>. You arrive as a single booking and leave as part of a team that has shared one of the most challenging and rewarding experiences of their lives. The mountain has a way of turning strangers into friends remarkably quickly.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <p className="text-emerald-800 text-sm">
                <strong>Your guide team includes:</strong> A certified lead guide, 1-2 assistant guides (depending on group size), a cook, and approximately 3 porters per climber. On a group departure, the full support team can be 20-30+ people. You are never truly alone on Kilimanjaro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Private vs Group Climb for Solo Travellers */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Private vs Group Climb for Solo Travellers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              As a solo traveller, you have two options: join a scheduled group departure (most popular and affordable) or book a private climb with a dedicated guide team.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Aspect</th>
                  <th className="text-left px-4 py-3 font-semibold">Group Departure</th>
                  <th className="text-left px-4 py-3 font-semibold">Private Climb</th>
                </tr>
              </thead>
              <tbody>
                {groupVsPrivate.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={`border-t border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}
                  >
                    <td className="px-4 py-3 font-medium">{row.aspect}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{row.group}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{row.private}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            Most solo travellers choose group departures for the social experience and lower cost.{" "}
            <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline">
              See our full pricing breakdown &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Benefits of Solo Kilimanjaro Travel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Benefits of Climbing Kilimanjaro Solo
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Far from being a disadvantage, travelling solo to climb Kilimanjaro opens doors that group travel with friends sometimes closes.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {soloTravelBenefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="flex gap-5 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{i + 1}</span>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Joining a Group Departure */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Joining a Group Departure as a Solo Climber
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Here is exactly how it works when you book a Kilimanjaro group departure as an individual traveller.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-[var(--secondary)] mb-1">Step 1</div>
                <h3 className="font-semibold mb-2">Choose Your Departure Date</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Browse our <Link href="/kilimanjaro-join-group-departures/" className="text-[var(--secondary)] hover:underline">scheduled group departures</Link> and pick a date that works for you. We run departures monthly on the Lemosho, Machame, and Rongai routes. Each departure has a maximum of 12 climbers to keep the experience personal.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-[var(--secondary)] mb-1">Step 2</div>
                <h3 className="font-semibold mb-2">Book &amp; Join the Group Chat</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Secure your spot with a deposit. Once booked, we add you to a WhatsApp group with your fellow climbers. This is where introductions happen, gear questions get answered, and the excitement starts building weeks before you arrive in Tanzania.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-[var(--secondary)] mb-1">Step 3</div>
                <h3 className="font-semibold mb-2">Arrive in Moshi</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  We arrange your <Link href="/kilimanjaro-airport-guide/" className="text-[var(--secondary)] hover:underline">airport transfer</Link> to your hotel in Moshi. Many groups meet the evening before for a pre-trek dinner — your first chance to put faces to the names from the WhatsApp group. Your lead guide conducts a briefing covering the route, safety, and gear check.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-[var(--secondary)] mb-1">Step 4</div>
                <h3 className="font-semibold mb-2">Trek Together, Summit Together</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  For the next 6-9 days, you trek as a team. Shared meals, shared struggles, shared sunrises. By summit night, the strangers from the WhatsApp group are the people you are cheering for at Uhuru Peak. Typical group size is 4-12 climbers — small enough to know everyone, large enough to feel the energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost for Solo Climbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Cost for Solo Climbers
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              One of the biggest concerns for solo travellers is cost. The good news: joining a <Link href="/kilimanjaro-join-group-departures/" className="text-[var(--primary)] hover:underline font-semibold">group departure</Link> is the <strong>most affordable way to climb Kilimanjaro</strong>. Fixed costs — guide team salaries, vehicle hire, cooking equipment, park gate fees — are shared across the group rather than shouldered by one person. For a full breakdown, see our <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro pricing guide</Link>.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Group Departure</h3>
                <p className="text-2xl font-bold text-emerald-700 mb-2">From $2,150</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Per person for a 7-day Lemosho route. Includes park fees, guide team, all meals, camping gear, and airport transfers. No hidden costs.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-heading font-bold text-lg mb-2">Private Solo Climb</h3>
                <p className="text-2xl font-bold text-blue-700 mb-2">From $3,200+</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Same inclusions as a group climb, but with a dedicated guide team exclusively for you. Choose any start date and customise the itinerary.
                </p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The difference in price reflects the reality of cost-sharing. A lead guide, cook, and vehicle cost the same whether they serve 1 climber or 10. On a group departure, those fixed costs are divided — which is why solo travellers save $1,000+ by joining a group rather than booking privately.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Single supplement:</strong> On most of our group departures, solo travellers receive their own tent at no extra charge. We do not charge a single supplement for camping. On the Marangu route (hut accommodation), you may share a room with another climber of the same gender unless you request a private room.
              </p>
            </div>
            <p className="text-center mt-6">
              <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline font-medium">
                View our complete Kilimanjaro pricing guide &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Safety as a Solo Climber */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Safety as a Solo Climber
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Solo travellers on Kilimanjaro are not less safe — in many ways, they are <strong>safer</strong> than private groups. When you join a group departure, you benefit from a full, professional guide team experienced in managing groups on high-altitude terrain. The <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline font-semibold">safety infrastructure</Link> is identical to what any group receives, regardless of how you booked.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <Shield className="w-8 h-8 text-[var(--secondary)] mb-3" />
                <h3 className="font-semibold mb-2">Full Guide Team</h3>
                <p className="text-sm text-[var(--text-muted)]">Lead guide, assistant guides (1 per 2-3 climbers), cook, and porters. Every member is trained in altitude illness recognition and emergency procedures.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <Phone className="w-8 h-8 text-[var(--secondary)] mb-3" />
                <h3 className="font-semibold mb-2">Communication Equipment</h3>
                <p className="text-sm text-[var(--text-muted)]">Our guides carry satellite phones and two-way radios on every expedition. Emergency evacuation can be coordinated from any point on any route.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <Heart className="w-8 h-8 text-[var(--secondary)] mb-3" />
                <h3 className="font-semibold mb-2">Health Monitoring</h3>
                <p className="text-sm text-[var(--text-muted)]">Twice-daily pulse oximetry and Lake Louise AMS scoring for every climber. Our guides carry emergency oxygen on every expedition — non-negotiable.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
                <Users className="w-8 h-8 text-[var(--secondary)] mb-3" />
                <h3 className="font-semibold mb-2">Strength in Numbers</h3>
                <p className="text-sm text-[var(--text-muted)]">Group members look out for each other. If one person struggles, others notice. The group dynamic adds an extra layer of vigilance beyond what the guides provide.</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              The greatest safety risk on Kilimanjaro is altitude sickness, not being a solo traveller. Whether you book alone or with a group of friends, the safety protocols are identical. What matters is choosing a <Link href="/kilimanjaro-safety/" className="text-[var(--primary)] hover:underline font-medium">reputable operator</Link> with certified guides, proper equipment, and a clear emergency protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Fellow Climbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Meeting Fellow Climbers
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              The social experience is one of the top reasons solo travellers choose Kilimanjaro. The mountain attracts an incredible diversity of people — retirees ticking off a bucket list, university graduates celebrating a milestone, couples, friends, charity fundraisers, and seasoned trekkers chasing their next summit. What unites them is the shared challenge.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Before the Climb: WhatsApp Group</h3>
                  <p className="text-sm text-[var(--text-muted)]">Once booked, you join a WhatsApp group with your fellow climbers. Introductions, gear tips, and shared anticipation start weeks before the trek. Many people arrive in Moshi already feeling like they know the group.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">On the Trail: Shared Meals &amp; Stories</h3>
                  <p className="text-sm text-[var(--text-muted)]">The communal dining tent is where bonds form. After a day of trekking, you sit down together over hot soup and share stories. Walking with different group members each day means you hear about lives from every corner of the world.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Mountain className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Summit Night: The Unbreakable Bond</h3>
                  <p className="text-sm text-[var(--text-muted)]">Starting at midnight, you climb together through the coldest, darkest hours toward the sunrise at Uhuru Peak. This shared struggle — the exhaustion, the cold, the doubt, and then the overwhelming joy of the summit — creates connections that simply cannot be manufactured any other way.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--surface)] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">After the Climb: Friends for Life</h3>
                  <p className="text-sm text-[var(--text-muted)]">The WhatsApp group stays active long after the climb. People share photos, plan reunions, and visit each other across continents. We have seen solo travellers from our groups meet up in five different countries within a year of their Kilimanjaro summit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Routes for Solo Travellers */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Best Routes for Solo Travellers
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Popular routes have more group departures, which means more companions and more social energy on the trail. Here is how each route rates for the solo traveller experience.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Route</th>
                  <th className="text-left px-4 py-3 font-semibold">Solo Rating</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Why</th>
                </tr>
              </thead>
              <tbody>
                {bestRoutesForSolo.map((route, i) => (
                  <tr
                    key={route.route}
                    className={`border-t border-[var(--border)] ${
                      route.recommended ? "bg-emerald-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {route.slug ? (
                        <Link href={`/trekking/${route.slug}/`} className="text-[var(--primary)] hover:underline">
                          {route.route}
                        </Link>
                      ) : (
                        route.route
                      )}
                      {route.recommended && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                          Top Pick
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${route.ratingColor}`}>
                        {route.soloRating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {route.reason}
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
              Browse all Kilimanjaro routes with full itineraries &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Solo Traveller Checklist */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Solo Traveller Checklist
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              A practical checklist covering everything a solo traveller needs to plan, prepare for, and make the most of their Kilimanjaro climb.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {soloChecklist.map((section) => (
              <div
                key={section.category}
                className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                  <Backpack className="w-5 h-5 text-[var(--secondary)]" />
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              <Link href="/kilimanjaro-safety/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Safety Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Staying safe on the mountain</p>
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <DollarSign className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Prices &amp; Costs</p>
                <p className="text-xs text-[var(--text-muted)]">Full pricing breakdown</p>
              </Link>
              <Link href="/kilimanjaro-join-group-departures/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Group Departures</p>
                <p className="text-xs text-[var(--text-muted)]">Join a scheduled climb</p>
              </Link>
              <Link href="/kilimanjaro-women-climbing/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Women Climbing</p>
                <p className="text-xs text-[var(--text-muted)]">Guide for women travellers</p>
              </Link>
              <Link href="/can-beginners-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Map className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Beginners Guide</p>
                <p className="text-xs text-[var(--text-muted)]">First-time climbers</p>
              </Link>
              <Link href="/trekking/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Globe className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">All Routes</p>
                <p className="text-xs text-[var(--text-muted)]">Compare every route</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-solo-climb/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro Solo?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Join solo travellers from around the world on our scheduled group departures. No single supplement, no compromise on safety, and friendships that last a lifetime. Your Kilimanjaro adventure starts with a single booking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kilimanjaro-join-group-departures/"
              className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Browse Group Departures
            </Link>
            <Link
              href="/trekking/"
              className="inline-block border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View All Routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
