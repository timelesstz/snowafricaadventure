import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about Kilimanjaro treks, Tanzania safaris, Zanzibar holidays, booking, payments, and more.",
  url: "/faq/",
});

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Booking & Planning",
    faqs: [
      {
        question: "How far in advance should I book my trip?",
        answer:
          "We recommend booking 3-6 months in advance, especially for peak seasons (June-October and December-February). Popular Kilimanjaro routes and safari lodges fill up quickly. However, we can sometimes accommodate last-minute bookings if availability permits.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Free cancellation up to 60 days before departure with full refund. Cancellations 30-59 days before receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations within 30 days of departure. We strongly recommend travel insurance.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers (SWIFT), credit/debit cards (Visa, Mastercard), PayPal, and mobile money (M-Pesa for local payments). A 30% deposit secures your booking, with the balance due 30 days before departure.",
      },
      {
        question: "Can I customize my itinerary?",
        answer:
          "Absolutely! We specialize in tailor-made adventures. Whether you want to combine a Kilimanjaro climb with a safari, extend your trip to Zanzibar, or have specific accommodation preferences, we'll create a personalized itinerary just for you.",
      },
      {
        question: "Do I need travel insurance?",
        answer:
          "Yes, comprehensive travel insurance is mandatory for all Kilimanjaro climbs and highly recommended for safaris. Your policy must cover emergency medical evacuation, trip cancellation, and adventure activities up to 6,000m altitude.",
      },
    ],
  },
  {
    title: "Kilimanjaro Climbing",
    faqs: [
      {
        question: "Which Kilimanjaro route is best for me?",
        answer:
          "For first-time climbers, we recommend the Lemosho (7-8 days) or Machame (6-7 days) routes for their excellent acclimatization profiles and scenic variety. The Marangu route offers hut accommodation, while the Northern Circuit (9 days) is ideal for those seeking solitude and the highest success rates.",
      },
      {
        question: "What is your summit success rate?",
        answer:
          "Our overall summit success rate is 95%+, significantly higher than the industry average of 65%. This is due to our experienced guides, proper acclimatization schedules, and high guide-to-climber ratios. We prioritize safety and proper pacing.",
      },
      {
        question: "Do I need prior climbing experience?",
        answer:
          "No technical climbing experience is required. Kilimanjaro is a trekking peak, meaning you'll be walking, not climbing with ropes. However, good physical fitness is essential. We recommend regular cardio exercise and hiking in the months before your climb.",
      },
      {
        question: "What about altitude sickness?",
        answer:
          "Altitude sickness can affect anyone regardless of fitness level. Our guides are trained in altitude illness recognition and treatment. We follow 'climb high, sleep low' principles, carry emergency oxygen, and our longer routes allow for better acclimatization. We include Diamox recommendations in our pre-trip information.",
      },
      {
        question: "What is included in the Kilimanjaro climb price?",
        answer:
          "Our packages include: park fees, camping/hut fees, professional guides and porters, all meals on the mountain, quality camping equipment, airport transfers, pre/post climb hotel accommodation, rescue fees registration, and certificates. You only need to bring personal gear and tips.",
      },
      {
        question: "What should I tip the crew?",
        answer:
          "Tipping is customary and greatly appreciated. We recommend $20-25 per day for the lead guide, $15-20 for assistant guides, $10-15 for the cook, and $8-10 per porter per day. Tips are typically given at the end of the climb in an envelope.",
      },
      {
        question: "What gear do I need to bring?",
        answer:
          "Essential items include: waterproof hiking boots (broken in!), layered clothing for temperatures from -20°C to +30°C, sleeping bag rated to -15°C, headlamp, sunglasses, sunscreen, and personal medications. We provide a detailed packing list upon booking.",
      },
    ],
  },
  {
    title: "Tanzania Safaris",
    faqs: [
      {
        question: "When is the best time for a safari?",
        answer:
          "Tanzania offers year-round wildlife viewing. The dry season (June-October) provides the best game viewing as animals gather at water sources. The Great Migration in Serengeti is spectacular from July-October (river crossings) and January-March (calving season). Green season (November-May) offers lush landscapes and fewer crowds.",
      },
      {
        question: "What is the difference between budget, mid-range, and luxury safaris?",
        answer:
          "Budget safaris use shared vehicles, basic campsites or budget lodges. Mid-range safaris offer private vehicles, comfortable lodges with ensuite facilities. Luxury safaris feature exclusive camps, gourmet dining, and premium locations. All tiers provide excellent wildlife viewing with professional guides.",
      },
      {
        question: "Is it safe to go on safari?",
        answer:
          "Yes, Tanzania is one of Africa's safest safari destinations. You'll always be accompanied by experienced guides who understand animal behavior. Vehicles are designed for safe wildlife viewing. We follow strict safety protocols and our guides are trained in first aid.",
      },
      {
        question: "Can children go on safari?",
        answer:
          "Absolutely! Safaris are magical for families. Most lodges welcome children, and many offer family rooms and kid-friendly activities. For game drives, we recommend children be at least 6 years old. Some exclusive camps have minimum age requirements of 12+.",
      },
      {
        question: "What wildlife will I see?",
        answer:
          "Tanzania is home to the Big Five (lion, leopard, elephant, buffalo, rhino) plus cheetahs, giraffes, zebras, hippos, crocodiles, and hundreds of bird species. The Serengeti hosts the Great Migration with over 2 million wildebeest and zebras. Ngorongoro Crater offers the highest density of predators in Africa.",
      },
    ],
  },
  {
    title: "Zanzibar & Beach Holidays",
    faqs: [
      {
        question: "What is the best time to visit Zanzibar?",
        answer:
          "Zanzibar is beautiful year-round. The best weather is during the dry seasons: June-October and December-February. The long rains (April-May) bring lower prices and fewer tourists. Water visibility for diving/snorkeling is best from August to March.",
      },
      {
        question: "What activities are available in Zanzibar?",
        answer:
          "Popular activities include: snorkeling and diving, Stone Town walking tours, spice farm visits, sunset dhow cruises, swimming with dolphins, kitesurfing, Jozani Forest (red colobus monkeys), and simply relaxing on pristine beaches.",
      },
      {
        question: "How do I get to Zanzibar?",
        answer:
          "You can fly directly to Zanzibar (ZNZ) from many international hubs or connect via Dar es Salaam or Nairobi. Alternatively, take a short flight from Arusha/Kilimanjaro Airport after your safari or climb. Ferries also run from Dar es Salaam (2 hours).",
      },
    ],
  },
  {
    title: "Practical Information",
    faqs: [
      {
        question: "Do I need a visa for Tanzania?",
        answer:
          "Most nationalities require a visa. E-visas can be obtained online before travel (recommended) or visas on arrival are available at major entry points. US, UK, and EU citizens pay $50 for a single-entry tourist visa valid for 90 days. Check current requirements for your nationality.",
      },
      {
        question: "What vaccinations do I need?",
        answer:
          "Yellow fever vaccination is required if traveling from an endemic country. Recommended vaccinations include Hepatitis A & B, Typhoid, and ensuring routine vaccinations are up to date. Malaria prophylaxis is strongly recommended. Consult your travel clinic 6-8 weeks before departure.",
      },
      {
        question: "What currency is used in Tanzania?",
        answer:
          "The Tanzanian Shilling (TZS) is the local currency, but US Dollars are widely accepted for tourism services. ATMs are available in major towns. Credit cards are accepted at hotels and lodges but not for small purchases. Bring some cash for tips and markets.",
      },
      {
        question: "Is Tanzania safe for tourists?",
        answer:
          "Tanzania is generally very safe for tourists. Tanzanians are welcoming and tourism is vital to the economy. Standard precautions apply: avoid displaying expensive items, use hotel safes, and be aware in crowded areas. Our team provides support throughout your trip.",
      },
      {
        question: "What language is spoken?",
        answer:
          "Swahili and English are both official languages. English is widely spoken in tourism areas, hotels, and by guides. Learning a few Swahili phrases (Jambo = Hello, Asante = Thank you, Hakuna Matata = No worries) is appreciated by locals!",
      },
    ],
  },
];

function FAQAccordion({ faq, index }: { faq: FAQItem; index: number }) {
  return (
    <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-slate-50 transition-colors">
        <h3 className="font-medium text-slate-900 pr-4">{faq.question}</h3>
        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 pt-0">
        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
      </div>
    </details>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Help Center
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Find answers to common questions about Kilimanjaro climbs, Tanzania safaris,
              Zanzibar holidays, and planning your adventure.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12 last:mb-0">
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQAccordion
                      key={faqIndex}
                      faq={faq}
                      index={faqIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-slate-600 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help
              you plan your perfect Tanzanian adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 rounded-lg text-white font-medium hover:bg-amber-600 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
