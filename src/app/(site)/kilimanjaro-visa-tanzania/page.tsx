import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Plane,
  CreditCard,
  Users,
  Mountain,
  Camera,
  Stamp,
  Info,
  BookOpen,
  Syringe,
} from "lucide-react";
import {
  generateMetadata as genMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateAggregateRatingSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CredentialsBadges, KnowledgeBase } from "@/components/kilimanjaro";

export const metadata: Metadata = genMeta({
  title: "Tanzania Visa for Kilimanjaro: Requirements 2026",
  description:
    "Tanzania visa guide for Kilimanjaro climbers: e-Visa application, $50 fee, requirements by nationality, visa on arrival options. Step-by-step application process.",
  url: "/kilimanjaro-visa-tanzania/",
});

const visaTypes = [
  {
    type: "Ordinary Tourist Visa",
    duration: "Up to 90 days",
    fee: "$50 USD",
    bestFor: "Most Kilimanjaro climbers",
    color: "emerald",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
    description:
      "The standard visa for tourists visiting Tanzania. Valid for a single entry and allows stays of up to 90 days. This is the visa type you need for climbing Kilimanjaro, going on safari, or visiting Zanzibar. Available as an e-Visa or on arrival at major entry points.",
  },
  {
    type: "Transit Visa",
    duration: "Up to 7 days",
    fee: "$30 USD",
    bestFor: "Passing through Tanzania only",
    color: "amber",
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    description:
      "For travellers transiting through Tanzania en route to another country. Valid for up to 7 days. Not suitable for Kilimanjaro climbers, as most treks take 5-9 days before accounting for travel days. Only consider this if you are genuinely passing through Tanzania without plans to stay.",
  },
  {
    type: "Multiple Entry Visa",
    duration: "Up to 12 months",
    fee: "$100 USD",
    bestFor: "Repeat visitors or multi-country trips",
    color: "blue",
    headerBg: "bg-blue-50",
    headerBorder: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    description:
      "Allows multiple entries over a 12-month period. Useful if you plan to combine Kilimanjaro with visits to neighbouring Kenya or Uganda and return to Tanzania. Also ideal if you plan to climb Kilimanjaro and return later in the year for a safari or Zanzibar holiday.",
  },
];

const eVisaSteps = [
  {
    step: 1,
    title: "Visit the Official e-Visa Portal",
    icon: Globe,
    description:
      "Go to visa.immigration.go.tz — the only official Tanzania e-Visa website. Beware of third-party websites that charge inflated fees. The official portal is managed by the Tanzania Immigration Department. Bookmark it before you start, as you may need to return to check your application status.",
  },
  {
    step: 2,
    title: "Create an Account",
    icon: Users,
    description:
      "Register with your email address and create a password. You will receive a verification email — click the link to activate your account. Use an email address you check regularly, as all visa correspondence will be sent there. Keep your login credentials safe, as you will need them to track your application.",
  },
  {
    step: 3,
    title: "Complete the Application Form",
    icon: FileText,
    description:
      "Fill in your personal details, passport information, travel dates, and purpose of visit. Select \"Tourism\" as your purpose and \"Ordinary Visa\" as the visa type. For your accommodation address in Tanzania, enter your hotel in Moshi or Arusha where you will stay before and after the climb. You do not need to list your mountain camps.",
  },
  {
    step: 4,
    title: "Upload Required Documents",
    icon: Camera,
    description:
      "Upload a passport-style photograph (white background, recent, clear face), a scan of your passport bio page (showing your photo, name, and expiry date), and your return flight booking or onward travel itinerary. Documents must be in JPEG or PDF format. Keep file sizes under 500KB for smooth uploading.",
  },
  {
    step: 5,
    title: "Pay the Visa Fee Online",
    icon: CreditCard,
    description:
      "Pay the $50 USD fee (for a single-entry tourist visa) using Visa, MasterCard, or other accepted payment methods. The payment portal is secure and encrypted. You will receive a payment confirmation receipt — save this as proof of payment. The fee is non-refundable, even if your visa is denied.",
  },
  {
    step: 6,
    title: "Receive Your e-Visa Approval",
    icon: CheckCircle,
    description:
      "Processing typically takes 3-10 business days, though most applications are approved within 5 days. You will receive an email notification when your visa is ready. Log back into the portal to download your e-Visa approval letter. Print two copies — one for immigration at the airport and one as a backup. Present this letter along with your passport on arrival in Tanzania.",
  },
];

const nationalityRequirements = [
  {
    nationality: "United States",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "United Kingdom",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "Canada",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "Australia",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "Germany",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "France",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "Netherlands",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
  {
    nationality: "South Africa",
    visaRequired: "No",
    fee: "Free",
    eVisaEligible: "N/A",
    voaEligible: "N/A",
    notes: "Visa-exempt. 90-day stay permitted on arrival.",
  },
  {
    nationality: "Kenya",
    visaRequired: "No",
    fee: "Free",
    eVisaEligible: "N/A",
    voaEligible: "N/A",
    notes: "EAC member state. Free movement permitted.",
  },
  {
    nationality: "India",
    visaRequired: "Yes",
    fee: "$50",
    eVisaEligible: "Yes",
    voaEligible: "Yes",
    notes: "Standard tourist visa. Single entry, 90 days.",
  },
];

const requiredDocuments = [
  {
    icon: FileText,
    document: "Valid Passport",
    details:
      "Must be valid for at least 6 months beyond your intended date of departure from Tanzania. Must have at least 2 blank pages for visa stamps. If your passport expires within 6 months of your return date, renew it before applying.",
  },
  {
    icon: Camera,
    document: "Passport-Style Photograph",
    details:
      "Recent photograph with a white background, taken within the last 6 months. Must show your full face, ears visible, no glasses, no head covering unless for religious reasons. Digital format (JPEG) required for e-Visa applications.",
  },
  {
    icon: Plane,
    document: "Return or Onward Flight Booking",
    details:
      "A confirmed return flight ticket or onward travel itinerary showing you will leave Tanzania before your visa expires. Immigration officers may ask to see this on arrival. A booking confirmation email or printed itinerary is sufficient.",
  },
  {
    icon: BookOpen,
    document: "Accommodation Details",
    details:
      "Hotel booking confirmation for your pre- and post-climb accommodation in Moshi or Arusha. If you have booked through a tour operator like Snow Africa Adventure, your operator can provide a confirmation letter listing your accommodation details.",
  },
  {
    icon: CreditCard,
    document: "Proof of Sufficient Funds",
    details:
      "While not always requested, immigration officers may ask for evidence that you can support yourself during your stay. A recent bank statement or credit card statement showing adequate funds is recommended. For Kilimanjaro climbers, your tour booking confirmation typically suffices.",
  },
  {
    icon: Syringe,
    document: "Yellow Fever Certificate (If Applicable)",
    details:
      "Required if you are travelling from or transiting through a yellow fever endemic country. This includes Kenya, Uganda, Ethiopia, and many other African and South American countries. The certificate must be the International Certificate of Vaccination or Prophylaxis (ICVP) — commonly known as the yellow card.",
  },
];

const commonMistakes = [
  {
    mistake: "Applying Through Unofficial Websites",
    explanation:
      "Dozens of third-party websites mimic the official Tanzania e-Visa portal and charge $80-$150 instead of $50. Some are outright scams. The only official site is visa.immigration.go.tz. If the URL does not end in .go.tz, it is not the official government website.",
  },
  {
    mistake: "Passport Validity Too Short",
    explanation:
      "Your passport must be valid for at least 6 months after your planned departure from Tanzania. If you are climbing Kilimanjaro in July and returning home in August, your passport must be valid until at least February of the following year. Climbers are turned away at the airport for this every year.",
  },
  {
    mistake: "Applying Too Late",
    explanation:
      "While e-Visa processing typically takes 3-10 business days, delays can occur during peak travel season (June-October and December-February). Apply at least 3-4 weeks before your travel date. Last-minute applications create unnecessary stress before what should be an exciting trip.",
  },
  {
    mistake: "Not Printing the e-Visa Approval Letter",
    explanation:
      "You must print your e-Visa approval letter and carry it with you. While Tanzania is modernising its immigration systems, not all entry points can verify electronic documents reliably. Print two copies — one for immigration and one backup in your luggage.",
  },
  {
    mistake: "Forgetting Yellow Fever Vaccination Certificate",
    explanation:
      "If you are connecting through Nairobi (Kenya), Addis Ababa (Ethiopia), or any yellow fever endemic country, you must carry your yellow fever vaccination certificate. Travellers without this certificate when required can be denied entry or forced to receive a vaccination at the airport.",
  },
  {
    mistake: "Assuming Your Nationality Is Visa-Exempt",
    explanation:
      "Only a limited number of nationalities — primarily East African Community and some Southern African Development Community member states — are exempt from Tanzania visa requirements. Do not assume you are exempt based on outdated information. Verify your specific nationality on the official e-Visa portal before travelling.",
  },
];

const faqs = [
  {
    question: "How much does a Tanzania visa cost for Kilimanjaro?",
    answer:
      "A single-entry tourist visa for Tanzania costs $50 USD, regardless of whether you apply online (e-Visa) or on arrival. This is the standard fee for most nationalities including US, UK, Canadian, Australian, and EU citizens. A multiple-entry visa costs $100 USD. The transit visa is $30 USD. Payment is made online via credit card for e-Visa or in cash (USD) for visa on arrival.",
  },
  {
    question: "How long does it take to get a Tanzania e-Visa?",
    answer:
      "Tanzania e-Visa processing typically takes 3-10 business days, with most applications approved within 5 business days. During peak travel season (June-October and December-February), processing may take closer to 10 days. We recommend applying at least 3-4 weeks before your travel date to account for any delays. You will receive an email notification when your visa is approved.",
  },
  {
    question: "Can I get a Tanzania visa on arrival at the airport?",
    answer:
      "Yes, most nationalities can obtain a visa on arrival at Kilimanjaro International Airport (JRO), Julius Nyerere International Airport (DAR), and other major entry points. You will need your passport, a completed arrival form, proof of return flights, and $50 USD in cash (clean, undamaged bills). However, we strongly recommend applying for an e-Visa in advance to avoid potentially long queues, especially during peak season when multiple international flights arrive simultaneously.",
  },
  {
    question: "Do I need a yellow fever vaccination for Tanzania?",
    answer:
      "A yellow fever vaccination certificate is required if you are travelling from or transiting through a yellow fever endemic country. This includes popular connecting hubs like Nairobi (Kenya), Addis Ababa (Ethiopia), and Kigali (Rwanda). If you are flying directly from a non-endemic country like the US, UK, or most of Europe, it is not legally required. However, many travel health specialists recommend the yellow fever vaccine for East Africa regardless, as it provides lifetime protection and eliminates any potential entry issues.",
  },
  {
    question: "Can I extend my Tanzania visa if I want to stay longer?",
    answer:
      "Yes, you can extend a single-entry tourist visa for an additional 90 days at the Immigration Office in Dar es Salaam or regional immigration offices. The extension fee is approximately $50-$100 USD. You must apply before your current visa expires. Most Kilimanjaro climbers who combine their trek with a safari and Zanzibar trip find that the initial 90-day visa provides more than enough time.",
  },
  {
    question: "Do I need a multiple-entry visa for Kilimanjaro and Kenya?",
    answer:
      "If your itinerary involves entering Tanzania, visiting Kenya (for example, Masai Mara), and then re-entering Tanzania, you will need either a multiple-entry visa ($100 USD) or two single-entry visas ($50 each). The multiple-entry visa is more cost-effective and convenient. Alternatively, you can apply for the East Africa Tourist Visa ($100 USD), which allows movement between Kenya, Uganda, and Rwanda for 90 days.",
  },
  {
    question: "What happens if my Tanzania visa is refused?",
    answer:
      "Tanzania visa refusals are uncommon for tourists but can occur if your application is incomplete, your passport does not meet the validity requirements, or there are discrepancies in your documents. The visa fee is non-refundable if refused. If denied, you can reapply with corrected information. Common reasons for refusal include insufficient passport validity (less than 6 months), unclear passport photos, or missing return flight documentation. Apply carefully the first time.",
  },
  {
    question: "Is the e-Visa better than visa on arrival?",
    answer:
      "We recommend the e-Visa for several reasons: you avoid queues at the airport (which can exceed 45 minutes during peak hours), you know your visa is confirmed before you fly, and you do not need to carry $50 in cash. The e-Visa is the same price and provides the same visa — the only difference is convenience. Visa on arrival is a valid backup if you forgot to apply in advance or if your e-Visa is still processing.",
  },
  {
    question: "What currency should I use to pay for visa on arrival?",
    answer:
      "The visa fee must be paid in US dollars (USD) if paying on arrival. Notes must be clean, undamaged, and printed after 2006 — older bills are often rejected in East Africa. Exact change is preferred, as immigration counters may not have change for large denominations. Some airports now accept card payments for visa on arrival, but do not rely on this — carry cash as a backup.",
  },
  {
    question: "Do children need a separate Tanzania visa?",
    answer:
      "Yes, every traveller — including children and infants — requires their own visa to enter Tanzania. Children must have their own passport (not simply be listed on a parent&apos;s passport). The visa fee for children is the same as for adults: $50 USD for a single-entry tourist visa. Apply through the e-Visa portal using the child&apos;s passport details. For family Kilimanjaro treks, ensure every member of the group has their own visa approved before travel.",
  },
];

export default function KilimanjaroVisaTanzaniaPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Tanzania Visa" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Tanzania Visa", url: "/kilimanjaro-visa-tanzania/" },
          ]),
          generateFAQSchema(faqs),
          generateHowToSchema({
            name: "How to Apply for a Tanzania e-Visa for Kilimanjaro",
            description: "Step-by-step guide to obtaining your Tanzania tourist e-Visa online for climbing Mount Kilimanjaro. Costs $50 USD and takes 3-10 business days.",
            totalTime: "PT20M",
            estimatedCost: { currency: "USD", value: 50 },
            steps: [
              { name: "Visit the Official e-Visa Portal", text: "Go to visa.immigration.go.tz and create an account. This is the only official Tanzania e-Visa website — do not use third-party sites that charge inflated fees." },
              { name: "Complete the Application Form", text: "Fill in your personal details, passport information, travel dates, and accommodation address in Tanzania (your hotel in Moshi or Arusha). Select 'Ordinary Visa' as the visa type." },
              { name: "Upload Required Documents", text: "Upload a passport-sized photo (white background), a scan of your passport bio page, your return flight itinerary, and proof of accommodation. Files must be JPEG or PDF, under 300KB each." },
              { name: "Pay the $50 USD Fee", text: "Pay the visa fee online using Visa, Mastercard, or other accepted payment methods. Keep your payment receipt as proof of application." },
              { name: "Wait for Processing", text: "Processing takes 3-10 business days. You will receive your approved e-Visa via email. Print a copy to present at immigration on arrival at Kilimanjaro International Airport (JRO)." },
            ],
          }),
          generateArticleSchema({
            title: "Tanzania Visa for Kilimanjaro: Requirements 2026",
            description:
              "Tanzania visa guide for Kilimanjaro climbers: e-Visa application, $50 fee, requirements by nationality, visa on arrival options. Step-by-step application process.",
            url: "/kilimanjaro-visa-tanzania/",
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
            alt="Trekkers arriving in Tanzania for Kilimanjaro climb with visa documents ready"
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
              Travel Logistics Guide
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Tanzania <span className="text-[var(--secondary)]">Visa for Kilimanjaro</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Everything you need to know about Tanzania visa requirements, e-Visa applications, fees, and entry procedures for Kilimanjaro climbers in 2026.
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
                Most nationalities need a <strong>tourist visa to enter Tanzania</strong>, costing <strong>$50 USD</strong> for a single-entry visa valid for 90 days. The <strong>e-Visa is the recommended option</strong> — apply online at the official portal (visa.immigration.go.tz) at least 3-4 weeks before your{" "}
                <Link href="/climbing-kilimanjaro/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro climb</Link>. Visa on arrival is available at{" "}
                <Link href="/kilimanjaro-airport-guide/" className="text-[var(--primary)] hover:underline font-semibold">Kilimanjaro International Airport</Link>{" "}as a backup, but queues can be long during peak season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Tanzania Visa Types
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Tanzania offers three visa categories for foreign visitors. The vast majority of Kilimanjaro climbers need the Ordinary Tourist Visa — here is how each type compares.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
            {visaTypes.map((visa) => (
              <div
                key={visa.type}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                <div className={`p-5 border-b ${visa.headerBorder} ${visa.headerBg}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl ${visa.iconBg} flex items-center justify-center`}>
                      <Stamp className={`w-5 h-5 ${visa.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-lg">{visa.type}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${visa.badgeColor}`}>
                      {visa.fee}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{visa.duration}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                    {visa.description}
                  </p>
                  <p className="text-xs font-semibold text-[var(--primary)]">
                    Best for: {visa.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* e-Visa Application Step-by-Step */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              e-Visa Application: Step-by-Step
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              The Tanzania e-Visa is the most convenient way to obtain your visa before arrival. The entire process takes about 20 minutes to complete online. Here is exactly how to do it.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {eVisaSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]/20">{item.step}</span>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <p className="text-blue-800 text-sm">
                <strong>Pro tip:</strong> Apply for your e-Visa as soon as you book your Kilimanjaro climb — ideally 4-6 weeks in advance. This gives you plenty of buffer time and means one less thing to worry about as your departure date approaches. Use the waiting time to sort your{" "}
                <Link href="/kilimanjaro-travel-insurance/" className="text-blue-700 hover:underline font-semibold">travel insurance</Link> and{" "}
                <Link href="/kilimanjaro-climbing-gear/" className="text-blue-700 hover:underline font-semibold">gear list</Link>. If your e-Visa is still processing when you fly, you can obtain a visa on arrival as a backup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa on Arrival */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Plane className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Visa on Arrival
                </h2>
                <p className="text-[var(--text-muted)] text-sm">Available at major airports and border crossings</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Tanzania offers visa on arrival (VOA) at all major international airports, including <strong>Kilimanjaro International Airport (JRO)</strong>, Julius Nyerere International Airport (DAR), and Zanzibar&apos;s Abeid Amani Karume International Airport. Most nationalities are eligible, though we recommend checking the official Tanzania Immigration website for your specific country.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                  <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Advantages
                  </h3>
                  <ul className="space-y-2 text-sm text-emerald-800">
                    <li>No advance planning required</li>
                    <li>Same $50 fee as e-Visa</li>
                    <li>Available even if e-Visa is still processing</li>
                    <li>Good backup option if your e-Visa was not approved in time</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Drawbacks
                  </h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>Queues can exceed 45-60 minutes during peak season</li>
                    <li>Requires $50 USD in clean, undamaged cash</li>
                    <li>Bills must be printed after 2006</li>
                    <li>Some travel insurance policies require a pre-approved visa</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> If you are arriving at Kilimanjaro International Airport (JRO) on an evening flight during peak season (June-September), visa on arrival queues can be especially long as multiple international flights land within the same hour. Having an e-Visa means you skip this queue entirely and go straight to passport control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements by Nationality */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Visa Requirements by Nationality
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Most nationalities require a visa to enter Tanzania. A handful of countries — primarily East African Community member states — enjoy visa-free entry. Here are the requirements for the most common Kilimanjaro climber nationalities.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Nationality</th>
                  <th className="text-left px-4 py-3 font-semibold">Visa Required</th>
                  <th className="text-left px-4 py-3 font-semibold">Fee</th>
                  <th className="text-left px-4 py-3 font-semibold">e-Visa</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {nationalityRequirements.map((row, i) => (
                  <tr
                    key={row.nationality}
                    className={`border-t border-[var(--border)] ${
                      row.visaRequired === "No" ? "bg-emerald-50" : i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{row.nationality}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        row.visaRequired === "No"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {row.visaRequired}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.fee}</td>
                    <td className="px-4 py-3">{row.eVisaEligible}</td>
                    <td className="px-4 py-3 text-xs text-[var(--text-muted)] hidden md:table-cell">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-4">
            For nationalities not listed, check the official Tanzania e-Visa portal at visa.immigration.go.tz for current requirements.
          </p>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Required Documents
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Gather these documents before starting your e-Visa application or arriving at the airport. Having everything ready prevents delays and rejected applications.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc) => (
              <div
                key={doc.document}
                className="flex gap-4 bg-[var(--surface)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <doc.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-2">{doc.document}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{doc.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Passport Requirements */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Passport Requirements
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Your passport is the most critical document for your Tanzania visa and Kilimanjaro trip. These requirements are strictly enforced — airlines will not board you and immigration will not admit you if your passport does not comply.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-[var(--secondary)] mb-1">
                  6+ Months Validity
                </div>
                <h3 className="font-semibold mb-1">Beyond Your Departure Date</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Your passport must be valid for at least 6 months beyond the date you plan to leave Tanzania. If you are climbing Kilimanjaro in September 2026 and departing Tanzania on September 20, your passport must be valid until at least March 2027. Check your expiry date now — passport renewals take 4-8 weeks in most countries.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">
                  2 Blank Pages
                </div>
                <h3 className="font-semibold mb-1">For Visa Stamps</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  You need at least 2 completely blank pages in your passport for visa stamps. Tanzania immigration stamps take up a significant portion of a page. If you are combining Kilimanjaro with visits to Kenya or other East African countries, you will need additional blank pages for each country&apos;s entry and exit stamps.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  Good Condition
                </div>
                <h3 className="font-semibold mb-1">No Damage or Wear</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Your passport must be in good condition — no water damage, torn pages, or obscured text. The biometric data page (photo page) must be clearly readable. If your passport is damaged, renew it before travelling. Airlines and immigration officers have the right to refuse travel documents that are not in acceptable condition.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  Biometric Passport
                </div>
                <h3 className="font-semibold mb-1">Machine-Readable Recommended</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  While not strictly required, a biometric (machine-readable) passport speeds up immigration processing considerably. Most passports issued after 2010 are biometric — look for the small camera icon on the front cover. If your passport pre-dates this, consider renewing before your Kilimanjaro trip for smoother border crossings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yellow Fever Vaccination */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Syringe className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Yellow Fever Vaccination
                </h2>
                <p className="text-[var(--text-muted)] text-sm">An essential entry requirement for many travellers</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                Tanzania requires a <strong>yellow fever vaccination certificate</strong> from travellers arriving from or transiting through yellow fever endemic countries. This is not optional — you can be denied entry without it. The certificate is known as the <strong>International Certificate of Vaccination or Prophylaxis (ICVP)</strong>, commonly called the &quot;yellow card.&quot;
              </p>

              <div>
                <h3 className="font-semibold text-lg mb-3">Who Needs It?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Travellers arriving from Kenya (including Nairobi transit connections)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Travellers arriving from Ethiopia (including Addis Ababa transit connections)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Travellers arriving from Rwanda, Uganda, or any other yellow fever endemic country
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    Travellers who have transited (even for a few hours) through an endemic country in the past 12 months
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Who Does Not Need It?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Travellers flying directly from the US, UK, or continental Europe (non-endemic countries)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    Travellers connecting through non-endemic hubs like Dubai, Doha, or Istanbul
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <p className="text-emerald-800 text-sm font-semibold mb-1">Our Recommendation</p>
                  <p className="text-emerald-800 text-sm">
                    Even if you are flying directly from a non-endemic country and the yellow fever vaccine is not technically required, many travel health specialists recommend getting vaccinated before visiting East Africa. The vaccine provides lifetime protection, eliminates any border complications if your itinerary changes, and protects you against a serious disease. Get vaccinated at least 10 days before travel, as the certificate is only valid from 10 days after vaccination. For more health preparation, read our{" "}
                  <Link href="/kilimanjaro-altitude-sickness/" className="text-emerald-700 hover:underline font-semibold">altitude sickness guide</Link> and{" "}
                  <Link href="/kilimanjaro-training-plan/" className="text-emerald-700 hover:underline font-semibold">training plan</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes to Avoid */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Common Mistakes to Avoid
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              We see these visa mistakes every climbing season. Each one is entirely preventable — read through this list before you start your application and you will avoid the issues that delay or derail other travellers.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {commonMistakes.map((item, i) => (
              <div
                key={item.mistake}
                className="flex gap-5 bg-white rounded-xl p-6 border border-[var(--border)]"
              >
                <div className="flex items-start gap-4 shrink-0">
                  <span className="text-2xl font-bold text-red-200">{i + 1}</span>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{item.mistake}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
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
              <Link href="/kilimanjaro-prices/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <CreditCard className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)]">Cost breakdown</p>
              </Link>
              <Link href="/kilimanjaro-travel-insurance/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Shield className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Travel Insurance</p>
                <p className="text-xs text-[var(--text-muted)]">Coverage essentials</p>
              </Link>
              <Link href="/kilimanjaro-airport-guide/" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                <Plane className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Airport Guide</p>
                <p className="text-xs text-[var(--text-muted)]">JRO airport arrival</p>
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

      <KnowledgeBase exclude="/kilimanjaro-visa-tanzania/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Mountain className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Climb Kilimanjaro?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            We handle the logistics so you can focus on the adventure. Our team assists with visa guidance, airport transfers, accommodation, and everything between your arrival in Tanzania and standing on the roof of Africa. Check{" "}
              <Link href="/kilimanjaro-prices/" className="text-[var(--secondary)] hover:underline font-semibold">what it costs</Link> and{" "}
              <Link href="/best-time-to-climb-kilimanjaro/" className="text-[var(--secondary)] hover:underline font-semibold">when to go</Link>.
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
