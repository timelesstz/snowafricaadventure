import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Utensils,
  Coffee,
  Flame,
  Droplets,
  Apple,
  Heart,
  Mountain,
  ArrowRight,
  Sun,
  Moon,
  Sandwich,
  AlertTriangle,
  PackageCheck,
  Star,
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
  title: "Kilimanjaro Food & Meals: What You Eat Daily",
  description:
    "What do you eat on Kilimanjaro? Full meal guide: 4,000-5,000 calories daily, hot breakfasts, packed lunches, 3-course dinners. Sample menus from our mountain kitchen.",
  url: "/kilimanjaro-food-meals/",
});

const dailyMeals = [
  {
    icon: Sun,
    time: "6:00 AM",
    title: "Wake-Up",
    items: [
      "Hot tea (black, green, or herbal)",
      "Fresh coffee",
      "Hot cocoa",
      "Warm water with lemon",
    ],
    description:
      "Hot tea, coffee, or cocoa delivered to your tent. A gentle wake-up ritual before the day begins.",
  },
  {
    icon: Coffee,
    time: "6:30 AM",
    title: "Breakfast",
    items: [
      "Porridge with honey and cinnamon",
      "Scrambled eggs or omelette with vegetables",
      "Toast with butter, jam, and peanut butter",
      "Fresh fruit (banana, mango, watermelon, orange)",
      "Pancakes or French toast",
      "Sausages",
      "Tea, coffee, and fresh juice",
    ],
    description:
      "A full hot breakfast prepared fresh each morning, designed to fuel the day's trek.",
  },
  {
    icon: Apple,
    time: "Ongoing",
    title: "Trail Snacks",
    items: [
      "Mixed nuts and dried fruit",
      "Energy bars and granola bars",
      "Dark chocolate",
      "Biscuits and crackers",
      "Glucose sweets",
      "Dried mango and banana chips",
    ],
    description:
      "Carried in your daypack and eaten during rest stops. High-energy foods to maintain blood sugar between meals.",
  },
  {
    icon: Sandwich,
    time: "12:00 PM",
    title: "Packed Lunch",
    items: [
      "Sandwich (chicken, cheese, egg, or tuna)",
      "Boiled egg",
      "Fresh fruit (apple, orange, banana)",
      "Juice box or electrolyte drink",
      "Biscuit or cake slice",
      "Crisps or popcorn",
    ],
    description:
      "A packed lunch box eaten at a designated rest point along the trail.",
  },
  {
    icon: Coffee,
    time: "4:00 PM",
    title: "Afternoon Tea",
    items: [
      "Hot tea, coffee, or cocoa",
      "Freshly popped popcorn",
      "Biscuits or cookies",
      "Cake or muffins",
      "Peanuts",
    ],
    description:
      "Served upon arrival at camp. A warm welcome after the day's trek.",
  },
  {
    icon: Moon,
    time: "6:30 PM",
    title: "Dinner",
    items: [
      "Soup starter (tomato, vegetable, pumpkin, or lentil)",
      "Main course (pasta, rice, stew, grilled chicken, or fish)",
      "Fresh vegetables and salad",
      "Bread rolls",
      "Dessert (fresh fruit, cake, custard, or banana fritters)",
      "Hot drinks (tea, coffee, cocoa, or warm juice)",
    ],
    description:
      "A three-course dinner served in the mess tent. The main social event of the evening.",
  },
];

const sampleMenu = [
  {
    day: "Day 1",
    breakfast: "Porridge, scrambled eggs, toast, fresh fruit, juice",
    lunch: "Chicken sandwich, boiled egg, apple, juice, biscuit",
    dinner:
      "Pumpkin soup, spaghetti bolognese, garlic bread, banana fritters",
    highlight: "Welcome dinner at Machame Gate camp",
  },
  {
    day: "Day 2",
    breakfast: "Pancakes with honey, sausages, toast, tea",
    lunch: "Tuna wrap, crisps, orange, energy bar",
    dinner:
      "Tomato soup, grilled chicken with rice and vegetables, fruit salad",
    highlight: "First night in the heath zone",
  },
  {
    day: "Day 3",
    breakfast: "French toast, omelette, fresh fruit, coffee",
    lunch: "Egg sandwich, banana, juice box, chocolate",
    dinner:
      "Lentil soup, beef stew with mashed potatoes, custard with fruit",
    highlight: "Acclimatization day — extra snacks provided",
  },
  {
    day: "Day 4",
    breakfast: "Porridge, boiled eggs, toast with peanut butter, tea",
    lunch: "Cheese sandwich, boiled egg, apple, popcorn",
    dinner: "Vegetable soup, fish curry with coconut rice, cake",
    highlight: "High-altitude cooking starts",
  },
  {
    day: "Day 5",
    breakfast: "Omelette with peppers, sausages, pancakes, juice",
    lunch: "Chicken wrap, crisps, mango, biscuit",
    dinner: "Pumpkin soup, pasta with meat sauce, garlic bread, fruit",
    highlight: "Carb-loading before summit push",
  },
  {
    day: "Day 6",
    breakfast: "Porridge with dried fruit, scrambled eggs, toast",
    lunch: "Tuna sandwich, banana, energy bar, juice",
    dinner:
      "Tomato soup, lamb stew with chapati, banana fritters",
    highlight: "Pre-summit dinner — eat everything you can",
  },
  {
    day: "Day 7",
    breakfast:
      "Biscuits and hot tea at midnight, hot chocolate at summit",
    lunch: "Celebration lunch at Mweka Camp — special feast",
    dinner:
      "Final dinner — roast chicken, pilau rice, cake, speeches",
    highlight: "Summit day — thermos and snacks for the push",
  },
  {
    day: "Day 8",
    breakfast: "Full English-style breakfast at Mweka Camp",
    lunch: "Packed lunch for final descent",
    dinner: "—",
    highlight: "Descent day — hearty farewell breakfast",
  },
];

const dietaryOptions = [
  {
    icon: Apple,
    title: "Vegetarian & Vegan",
    description:
      "Fully supported with advance notice. Our cooks prepare dedicated vegetarian and vegan meals — lentil curries, vegetable stir-fries, bean stews, fruit-based desserts, and plant-based protein at every meal. Many of our standard dishes are naturally vegetarian, drawing on Tanzanian culinary traditions where vegetables, legumes, and grains are staples.",
  },
  {
    icon: AlertTriangle,
    title: "Gluten-Free",
    description:
      "Accommodated with advance notice. We substitute bread and pasta with rice, potatoes, and naturally gluten-free grains. Our cooks are briefed on cross-contamination risks and prepare gluten-free meals separately. Soups are thickened with potato rather than flour.",
  },
  {
    icon: Heart,
    title: "Halal & Kosher",
    description:
      "All our meat is sourced from halal-certified suppliers in Tanzania — the default for most East African meat markets. Kosher requirements need more advance planning, but we work with our suppliers to accommodate specific needs when notified at least four weeks before the climb.",
  },
  {
    icon: AlertTriangle,
    title: "Food Allergies",
    description:
      "We take allergies seriously. Notify us at least four weeks before your climb with specific details. Our cooks are briefed individually on every allergy in the group. Common accommodations include nut-free, dairy-free, and shellfish-free meal plans. We carry an ingredient list for every dish prepared on the mountain.",
  },
];

const kitchenFacts = [
  {
    icon: Flame,
    title: "Portable Gas Stoves",
    description:
      "Our cooks carry lightweight, high-efficiency gas stoves rated for altitude use. At 4,000 metres and above, water boils at approximately 86 degrees Celsius rather than 100, so our pressure cookers become essential for cooking rice and beans properly. Every stove is tested before departure.",
  },
  {
    icon: Droplets,
    title: "Fresh Water",
    description:
      "Water is sourced from mountain streams and purified using a combination of filtration and chemical treatment. All drinking water and cooking water goes through this process. We carry backup purification tablets and UV treatment devices. You will never need to drink untreated water on our expeditions.",
  },
  {
    icon: PackageCheck,
    title: "Food Transport",
    description:
      "Porters carry all food supplies in sealed containers and insulated boxes. Fresh vegetables and fruit are packed for the first three to four days. Proteins are carefully managed — chicken and fish for early days, preserved and dried proteins for higher camps. Nothing is left to chance.",
  },
  {
    icon: Star,
    title: "Hygiene Standards",
    description:
      "Our kitchen crew follows strict hygiene protocols: handwashing stations at every camp, separate cutting boards for raw and cooked food, regular temperature checks on stored food, and a dedicated wash tent for dishes. We carry antibacterial soap and sanitiser. Food safety incidents on our expeditions are essentially zero.",
  },
];

const altitudeFood = [
  {
    altitude: "Below 3,000m",
    challenge: "Normal appetite — most climbers eat well",
    strategy:
      "Eat heartily and enjoy the variety. Build energy reserves for higher camps.",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
  },
  {
    altitude: "3,000m – 4,000m",
    challenge: "Appetite starts to decrease for some climbers",
    strategy:
      "Eat regular meals even if portions feel large. Snack frequently between meals. Stay hydrated.",
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
  },
  {
    altitude: "4,000m – 5,000m",
    challenge: "Significant appetite loss common. Nausea possible.",
    strategy:
      "Focus on carbohydrates — they require less oxygen to digest. Eat small amounts frequently. Hot soups and warm drinks are easier to consume than solid food.",
    color: "text-orange-400",
    borderColor: "border-orange-400/30",
  },
  {
    altitude: "Above 5,000m (Summit Push)",
    challenge:
      "Most climbers have minimal appetite. Cold and exhaustion suppress hunger.",
    strategy:
      "Thermos of hot sweet tea, biscuits, chocolate bars, energy gels. Eat small bites every 30 minutes. Your body needs fuel even when your stomach says no.",
    color: "text-red-400",
    borderColor: "border-red-400/30",
  },
];

const extraSnacks = [
  "Energy gels (caffeinated and non-caffeinated)",
  "Your favourite chocolate bars",
  "Electrolyte powder packets (Nuun, Liquid IV, or similar)",
  "Beef or turkey jerky",
  "Trail mix from home",
  "Peanut butter sachets",
  "Dried fruit you actually enjoy",
  "Hard sweets or throat lozenges",
  "Instant coffee sachets (if you are particular about your coffee)",
  "Protein bars",
];

const avoidList = [
  "Alcohol — impairs acclimatization and dehydrates you",
  "Excessive junk food — it takes up pack space and provides poor nutrition",
  "Perishable foods — no refrigeration on the mountain",
  "Heavily spiced or unfamiliar foods — your stomach is already under stress at altitude",
  "Fizzy drinks — carbonation feels awful at altitude",
];

const budgetComparison = [
  {
    aspect: "Menu Variety",
    budget: "Rice and beans daily with minimal variation",
    quality:
      "Different main course every night, rotating soups, multiple breakfast options",
  },
  {
    aspect: "Fresh Ingredients",
    budget: "Limited fresh food — mostly dried and canned",
    quality:
      "Fresh fruit and vegetables for first 3-4 days, quality proteins throughout",
  },
  {
    aspect: "Dietary Needs",
    budget: "Vegetarian only, no other accommodations",
    quality:
      "Full dietary accommodation — vegan, gluten-free, halal, allergies",
  },
  {
    aspect: "Cooking Equipment",
    budget: "Basic charcoal stoves, no pressure cooker",
    quality:
      "Altitude-rated gas stoves, pressure cookers, proper utensils",
  },
  {
    aspect: "Portions",
    budget: "Adequate but not generous",
    quality:
      "Abundant — seconds always available, extra snacks provided",
  },
  {
    aspect: "Trained Cooks",
    budget: "General porters doubling as cooks",
    quality:
      "Dedicated, trained mountain cooks with years of experience",
  },
  {
    aspect: "Hygiene",
    budget: "Basic handwashing, shared equipment",
    quality:
      "Handwashing stations, separate prep areas, antibacterial protocols",
  },
  {
    aspect: "Snacks",
    budget: "Minimal — basic biscuits only",
    quality:
      "Trail mix, energy bars, chocolate, dried fruit, popcorn at tea time",
  },
];

const faqs = [
  {
    question: "What food do you eat on Kilimanjaro?",
    answer:
      "You eat three hot meals a day plus snacks, consuming between 4,000 and 5,000 calories daily. Breakfasts include porridge with honey, scrambled eggs or omelettes, toast with peanut butter, fresh fruit, pancakes, and sausages. Packed lunches feature sandwiches (chicken, tuna, cheese, or egg), boiled eggs, fruit, juice, and biscuits. Dinners are three-course affairs starting with soup (tomato, pumpkin, lentil, or vegetable), followed by a main course such as spaghetti bolognese, grilled chicken with rice, beef stew with mashed potatoes, or fish curry with coconut rice. Dessert rounds things off — fresh fruit, banana fritters, cake, or custard. Between meals, you snack on trail mix, energy bars, dark chocolate, and dried fruit. Hot tea, coffee, and cocoa are available at every meal and on arrival at camp. The food is surprisingly good and varied — nothing like the freeze-dried packets many climbers expect.",
  },
  {
    question: "Can you get vegetarian food on Kilimanjaro?",
    answer:
      "Yes — vegetarian and vegan diets are fully supported on Kilimanjaro with advance notice. Tanzanian cuisine is naturally rich in vegetable dishes, legumes, and grains, so our cooks draw on a deep culinary tradition. Typical vegetarian meals include lentil curry with rice, vegetable stir-fry with noodles, bean stew with chapati, stuffed peppers, vegetable pasta, and coconut vegetable soup. Fresh fruit is abundant in the early days, and plant-based proteins appear at every meal. Vegan climbers receive dedicated preparations — no dairy, no eggs, no honey in their dishes. We ask for at least four weeks notice so our cooks can plan menus and source specific ingredients. From our experience, vegetarian climbers eat just as well as everyone else on the mountain, and many meat-eaters end up trying the vegetarian options because they look so good.",
  },
  {
    question: "How many calories do you need on Kilimanjaro?",
    answer:
      "Most climbers need between 4,000 and 5,000 calories per day on Kilimanjaro — roughly 50 to 100 percent more than their normal daily intake. At altitude, your body burns significantly more energy: increased breathing rate, thermogenesis to stay warm in sub-zero temperatures, and the physical demands of trekking 6 to 8 hours daily over rough terrain all drive caloric demand upward. Carbohydrates should form the bulk of your intake because they require less oxygen to metabolise than fats or proteins — a critical advantage when oxygen is scarce. Our mountain kitchen is designed around this principle, loading meals with pasta, rice, bread, porridge, and potatoes. Even if your appetite drops at higher elevations, it is essential to keep eating. Small, frequent snacks between meals help maintain energy levels when full meals feel overwhelming.",
  },
  {
    question: "Is the water safe to drink on Kilimanjaro?",
    answer:
      "All drinking water on Kilimanjaro is purified by your operator — you should never drink directly from mountain streams, no matter how clean they look. Our purification process combines mechanical filtration to remove sediment and parasites with chemical treatment (chlorine or iodine tablets) to kill bacteria and viruses. We also carry UV purification devices as backup. All water used for cooking goes through the same treatment. You will receive 3 to 4 litres of purified water daily, and your water bottles are refilled at every camp and during lunch stops. We recommend bringing water purification tablets as a personal backup, but in over 15 years of guiding we have never had a climber fall ill from our water supply. If you dislike the taste of treated water, bring flavoured electrolyte powder to mix in.",
  },
  {
    question: "What if I lose my appetite at altitude?",
    answer:
      "Appetite loss at altitude is extremely common — it affects the majority of climbers above 4,000 metres and is a normal physiological response to reduced oxygen. The key is to keep eating regardless. Focus on carbohydrates, which are easier to digest at altitude than fats or proteins. Hot soups are often the easiest food to consume when solid meals feel impossible. Eat small amounts frequently rather than forcing down large meals. Snack every 30 minutes during the trek — even a few biscuits or a handful of trail mix keeps your blood sugar stable. Hot sweet tea with sugar provides quick energy and hydration simultaneously. Our guides monitor food intake as part of their health assessments and will encourage you to eat even when you do not feel hungry. Most climbers find their appetite returns within hours of descending from high altitude.",
  },
  {
    question: "Do you bring your own food on Kilimanjaro?",
    answer:
      "No — your operator provides all meals, snacks, and drinking water on the mountain. This is included in your climb package price. Our mountain kitchen carries everything needed to prepare three hot meals daily plus snacks for every climber. However, we strongly recommend bringing your own favourite snacks as supplements. Familiar comfort food from home — your preferred chocolate bars, energy gels, trail mix, or beef jerky — provides a psychological boost as much as a nutritional one. Pack these in ziplock bags to keep them dry and accessible in your daypack. You do not need to bring any main meal items, cooking equipment, or water purification. Everything from the first breakfast to the final farewell lunch is handled by our experienced kitchen crew.",
  },
  {
    question: "What do you eat on summit night?",
    answer:
      "Summit night begins around midnight with a light snack — typically biscuits, a boiled egg, and hot tea or cocoa. You will not want a heavy meal before the 6 to 8 hour push to Uhuru Peak. Your guides prepare thermoses of hot sweet tea and hot chocolate for the ascent, which you carry in your daypack. Along with the thermos, pack chocolate bars, energy gels, glucose sweets, and biscuits in your jacket pockets where they stay accessible and relatively warm. Eat small bites every 30 minutes — your body needs fuel even though your appetite will be nearly nonexistent at 5,000 metres and above. After reaching the summit and descending to a lower camp, a hot celebratory lunch awaits — and most climbers discover they are absolutely ravenous after the summit push. This is one of the best meals of the entire trek.",
  },
  {
    question: "Can you bring snacks from home?",
    answer:
      "Yes, and we highly recommend it. While our mountain kitchen provides ample food and snacks, having your personal favourites from home is a significant morale boost — especially on tough days or at high altitude when standard food loses its appeal. Recommended items include energy gels, your favourite chocolate bars, electrolyte powder, beef or turkey jerky, trail mix, peanut butter sachets, dried fruit, hard sweets, instant coffee sachets, and protein bars. Pack everything in ziplock bags to protect against moisture and altitude pressure changes. Keep daily snacks accessible in your daypack rather than buried in your duffel bag. A good rule of thumb is to bring enough personal snacks for two to three items per trekking day. Avoid perishable foods, anything that melts easily, or heavily spiced items that might upset your stomach at altitude.",
  },
  {
    question: "How is food cooked on Kilimanjaro?",
    answer:
      "Our mountain kitchen operates with portable gas stoves designed for high-altitude use. These lightweight, efficient stoves provide consistent heat even in strong winds and low temperatures. At elevations above 4,000 metres, water boils at approximately 86 degrees Celsius rather than 100, which means cooking times increase and certain foods — particularly rice and beans — need pressure cookers to prepare properly. Our cooks carry altitude-rated pressure cookers for exactly this purpose. The kitchen setup at each camp includes a dedicated cooking tent with preparation surfaces, separate areas for raw and cooked food, and a wash station. Fresh ingredients are carried for the first three to four days, with dried and preserved foods supplementing at higher camps. Our cooks are trained professionals with years of mountain cooking experience — not porters given a stove. The transformation they achieve with basic equipment at extreme altitude is genuinely impressive.",
  },
  {
    question: "Are there any foods to avoid before climbing?",
    answer:
      "In the week before your climb, eat clean and simple. Avoid alcohol entirely — it impairs acclimatization and dehydrates you before you even reach the mountain. Steer clear of heavy, greasy, or fried foods that stress your digestive system. Avoid unfamiliar spicy foods, especially if you are travelling in Tanzania before the climb — a stomach upset on day one is a miserable start. Stick to foods you know your body handles well. Focus on complex carbohydrates (pasta, rice, bread, potatoes), lean proteins, fruits, and vegetables. Stay well hydrated in the days leading up to the climb. On the mountain itself, avoid bringing fizzy drinks — carbonation feels terrible at altitude and provides no nutritional benefit. Do not bring alcohol on the mountain under any circumstances. Our pre-climb briefing covers nutrition in detail, and our guides are happy to answer specific dietary questions.",
  },
  {
    question: "What do porters and guides eat on Kilimanjaro?",
    answer:
      "Our porters and guides eat the same quality food prepared by the same kitchen crew — this is a non-negotiable part of our ethical commitment. On too many Kilimanjaro operations, porters survive on basic ugali and beans while clients eat three-course dinners. We consider this unacceptable. Our team receives three meals daily with adequate protein, carbohydrates, and fresh vegetables. They eat in a dedicated dining area with proper seating. We also provide our team with snacks and hot drinks throughout the day. Well-fed porters and guides are stronger, healthier, safer, and more motivated — which directly benefits your climb experience. When choosing an operator, ask specifically about crew meals. It is one of the clearest indicators of whether a company treats its team ethically. Our porter welfare standards meet or exceed KPAP (Kilimanjaro Porters Assistance Project) guidelines.",
  },
];

export default function KilimanjaroFoodMealsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Climbing Kilimanjaro", href: "/climbing-kilimanjaro/" },
            { label: "Food & Meals" },
          ]}
        />
      </div>

      <MultiJsonLd
        schemas={[
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Climbing Kilimanjaro", url: "/climbing-kilimanjaro/" },
            { name: "Food & Meals", url: "/kilimanjaro-food-meals/" },
          ]),
          generateFAQSchema(faqs),
          generateArticleSchema({
            title: "Kilimanjaro Food & Meals: What You Eat Daily",
            description:
              "What do you eat on Kilimanjaro? Full meal guide: 4,000-5,000 calories daily, hot breakfasts, packed lunches, 3-course dinners. Sample menus from our mountain kitchen.",
            url: "/kilimanjaro-food-meals/",
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
            alt="Mountain cook preparing meals in the Kilimanjaro kitchen tent at high camp"
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
              Nutrition &amp; Mountain Life
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Kilimanjaro <span className="text-[var(--secondary)]">Food &amp; Meals</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              What you eat on Africa&apos;s highest peak — from guides who have served over 1,000 mountain meals and fuelled 800+ successful summits.
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
                You eat <strong>surprisingly well on Kilimanjaro</strong>. Our mountain cooks prepare <strong>3 hot meals daily plus snacks</strong> — 4,000 to 5,000 calories to fuel your climb. Breakfasts include porridge, eggs, toast, and fresh fruit. Lunches are packed boxes with sandwiches, fruit, and energy bars. Dinners are 3-course affairs with soup, a main course, and dessert. All drinking water is purified. <strong>Vegetarian, vegan, gluten-free, and halal diets</strong> are fully accommodated with advance notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Food Matters at Altitude */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Why Food Matters at Altitude
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Your body burns <strong>50 to 100 percent more calories at altitude</strong> than it does at sea level. The reasons are compounding: increased breathing rate, a heart working harder to circulate oxygen-depleted blood, thermogenesis to maintain core temperature in sub-zero conditions, and the sheer physical demand of trekking six to eight hours daily over rough terrain as you ascend through Kilimanjaro&apos;s distinct <Link href="/kilimanjaro-climate-zones/" className="text-[var(--primary)] hover:underline font-semibold">climate zones</Link>. At 5,000 metres, you are breathing roughly twice as fast as normal, your heart rate is elevated even at rest, and your body is generating extra heat just to survive nights that regularly drop to minus fifteen degrees Celsius.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Proper nutrition directly correlates with summit success. Underfed climbers fatigue faster, acclimatize poorly, and become significantly more susceptible to <Link href="/kilimanjaro-altitude-sickness/" className="text-[var(--primary)] hover:underline">altitude sickness</Link>. One of the earliest and most common symptoms at high elevation is appetite loss — the cruel irony of altitude is that your body needs more fuel precisely when your stomach wants less. This is why our mountain kitchen is built around calorie-dense, easily digestible meals that climbers can eat even when their appetite is suppressed.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              Not all calories are equal on the mountain. Carbohydrates are the altitude fuel of choice because they require approximately <strong>8 to 10 percent less oxygen to metabolize</strong> than fats. When every breath delivers only half the oxygen your body expects, this metabolic efficiency becomes a genuine advantage. Our cooks load every meal with pasta, rice, bread, potatoes, and porridge for exactly this reason.
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-6 leading-relaxed">
              If you are preparing for your climb, building a solid nutritional base before you arrive is equally important. A good <Link href="/kilimanjaro-training-plan/" className="text-[var(--primary)] hover:underline">pre-climb training plan</Link> should include dietary preparation — increasing your carbohydrate intake, practising eating on the move, and identifying which high-energy snacks your stomach tolerates well under exertion.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>Carbs vs fats at altitude:</strong> At altitude, carbohydrates are king. They require approximately 8 to 10 percent less oxygen to convert into energy compared with fats. This is why our mountain kitchen loads every meal with pasta, rice, bread, potatoes, and porridge. When oxygen is scarce above 4,000 metres, every metabolic advantage matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Typical Day of Meals */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              A Typical Day of Meals on Kilimanjaro
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              From your 6 AM wake-up call to your 3-course dinner, here is exactly what a day of eating looks like on the mountain.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyMeals.map((meal) => (
              <div key={meal.title} className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <meal.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{meal.time}</span>
                      <h3 className="font-heading font-bold text-lg">{meal.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{meal.description}</p>
                  <ul className="space-y-1.5">
                    {meal.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <Utensils className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Menu for an 8-Day Climb */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Sample Menu for an 8-Day Climb
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Every day brings different dishes. Here is a realistic menu from a recent Lemosho Route expedition — your actual menu will vary but the quality and variety are representative.
            </p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Day</th>
                  <th className="text-left px-4 py-3 font-semibold">Breakfast</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Lunch</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Dinner</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Highlight</th>
                </tr>
              </thead>
              <tbody>
                {sampleMenu.map((day, i) => (
                  <tr key={day.day} className={`border-t border-white/10 ${i % 2 === 0 ? "bg-white/5" : ""}`}>
                    <td className="px-4 py-3 font-bold text-[var(--secondary)]">{day.day}</td>
                    <td className="px-4 py-3 text-white/80">{day.breakfast}</td>
                    <td className="px-4 py-3 text-white/80 hidden md:table-cell">{day.lunch}</td>
                    <td className="px-4 py-3 text-white/80 hidden md:table-cell">{day.dinner}</td>
                    <td className="px-4 py-3 text-white/60 text-xs hidden lg:table-cell">{day.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dietary Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Dietary Requirements
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Whatever your dietary needs, our mountain kitchen accommodates them. Just let us know at least four weeks before your climb.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {dietaryOptions.map((option) => (
              <div key={option.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <option.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{option.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <p className="text-amber-800 text-sm">
                <strong>How to notify us:</strong> Include your dietary requirements when you submit your booking inquiry, or email us directly at least four weeks before your climb date. The more specific you are, the better our cooks can prepare. We have successfully accommodated every dietary requirement we have encountered in 15 years of guiding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Mountain Kitchen */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              The Mountain Kitchen: Unsung Heroes
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
              The mountain cooks are among the most impressive professionals on Kilimanjaro. Every day, they arrive at camp before you do, set up a full kitchen in minutes, and produce hot meals for an entire group — at altitudes where water boils at 86 degrees, winds batter the cooking tent, and temperatures drop below freezing. They carry heavy equipment, manage limited ingredients creatively, and maintain strict <Link href="/kilimanjaro-hygiene/" className="text-[var(--primary)] hover:underline font-semibold">hygiene standards</Link> in an environment that makes cooking genuinely difficult.
            </p>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Our head cook, who has been preparing mountain meals for over a decade, can turn basic ingredients into dishes that would not embarrass a restaurant kitchen. The level of skill required to cook a three-course dinner for 12 people at 4,600 metres with portable gas stoves and no running water is something most climbers do not fully appreciate until they see it happening. <Link href="/kilimanjaro-tipping-guide/" className="text-[var(--primary)] hover:underline font-semibold">Tipping your kitchen crew generously</Link> at the end of the climb is one of the most deserved gratuities you will ever give.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {kitchenFacts.map((fact) => (
              <div key={fact.title} className="bg-white border border-[var(--border)] rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <fact.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{fact.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Altitude */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Food &amp; Altitude: What Changes as You Climb
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Your relationship with food transforms as you gain elevation. Understanding these changes helps you prepare mentally and eat strategically.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {altitudeFood.map((zone) => (
                <div key={zone.altitude} className={`bg-[var(--surface)] rounded-xl p-6 border ${zone.borderColor}`}>
                  <div className={`text-xl font-bold ${zone.color} mb-1`}>{zone.altitude}</div>
                  <p className="text-sm font-semibold mb-2">{zone.challenge}</p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{zone.strategy}</p>
                </div>
              ))}
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl mb-3">Summit Night Food Strategy</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Summit night is the ultimate test of eating discipline. You depart camp around midnight after a light snack — biscuits, a boiled egg, and hot tea. Your guides prepare thermoses of hot sweet tea and cocoa for the ascent. Pack chocolate bars, energy gels, and glucose sweets in your inner jacket pockets where body heat keeps them from freezing solid. Force yourself to eat small bites every 30 minutes, even when the thought of food is revolting. The climbers who summit successfully are almost always the ones who keep fuelling their bodies despite having zero appetite. After summiting and descending, a hot celebratory lunch awaits — and the return of appetite at lower altitude makes it one of the most memorable meals of your life.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-3">The Post-Summit Feast</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  The celebration dinner after summit day is a Kilimanjaro tradition. Our cooks pull out all the stops — roast chicken, pilau rice, fresh salad, cake, and plenty of hot drinks. The kitchen crew often prepares a special speech, and tips are distributed. After days of eating through sheer willpower at high altitude, the combination of lower elevation, success endorphins, and genuinely excellent food makes this the best meal of the entire expedition. Many climbers describe it as the most satisfying dinner they have ever eaten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hydration on Kilimanjaro */}
      <section className="py-16 bg-[var(--primary-dark)] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">Hydration on Kilimanjaro</h2>
                <p className="text-white/60 text-sm">The most underrated factor in summit success</p>
              </div>
            </div>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Hydration is arguably as important as food on Kilimanjaro — and far easier to neglect. At altitude, you lose moisture at an accelerated rate through increased respiration (you breathe faster and harder, exhaling more water vapour), lower humidity in the alpine and summit zones, and the physical exertion of trekking 6 to 8 hours daily. Most climbers need <strong className="text-white">3 to 4 litres of water per day</strong> on the mountain — significantly more than the 2 litres typically recommended at sea level.
              </p>
              <p>
                Dehydration worsens <Link href="/kilimanjaro-altitude-sickness/" className="text-[var(--secondary)] hover:text-white underline">altitude sickness symptoms</Link> and impairs your body&apos;s ability to acclimatize. Headaches, fatigue, dizziness, and nausea — the hallmarks of AMS — are all amplified by insufficient fluid intake. Your guides will remind you constantly to drink, and they monitor hydration by checking that your urine remains clear to pale yellow throughout the trek. Dark urine is an immediate red flag.
              </p>
              <p>
                All drinking water on our expeditions is purified through a combination of mechanical filtration and chemical treatment. We fill your water bottles at every camp and during lunch stops. Hot drinks — tea, coffee, cocoa, and warm juice — count toward your daily fluid intake and are often easier to consume in cold conditions than cold water. Many climbers find that adding electrolyte powder to their water improves both taste and absorption, especially above 4,000 metres where mineral loss through sweat and respiration increases.
              </p>
              <p>
                Avoid alcohol completely on the mountain. It is a diuretic that accelerates dehydration, impairs judgment, disrupts sleep quality, and directly interferes with acclimatization. Even a single beer at camp can measurably worsen your body&apos;s response to altitude the following day. Save the celebrations for your return to Moshi — the cold Kilimanjaro Lager at the hotel after your climb will taste better than any drink you have ever had.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring: Extra Snacks */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What to Bring: Extra Snacks &amp; What to Avoid
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              While we provide all meals and snacks, bringing your personal favourites from home is one of the best things you can do for morale and energy. Here is what works — and what does not.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-600" />
                Recommended Snacks to Bring
              </h3>
              <ul className="space-y-2.5">
                {extraSnacks.map((snack) => (
                  <li key={snack} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-emerald-500 font-bold shrink-0">&#10003;</span>
                    {snack}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-red-200 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                What NOT to Bring
              </h3>
              <ul className="space-y-2.5">
                {avoidList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-red-500 font-bold shrink-0">&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            For a complete packing list, see our{" "}
            <Link href="/kilimanjaro-climbing-gear/" className="text-[var(--primary)] hover:underline">
              Kilimanjaro climbing gear guide
            </Link>.
          </p>
        </div>
      </section>

      {/* Budget vs Quality Operators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Budget vs Quality Operators: The Food Difference
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
              Food quality is one of the clearest and most immediate indicators of operator quality on Kilimanjaro. A budget operator cutting costs on food is almost certainly cutting costs on guide training, safety equipment, porter welfare, and everything else that matters for your safety and experience. When you see a Kilimanjaro climb offered at an unusually low price, the mountain kitchen is one of the first places corners get cut.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              We encourage every climber to ask prospective operators specific questions about their food: How many cooks do you bring? What does a typical dinner look like? Do you accommodate dietary requirements? What do your porters eat? The answers — or lack of them — tell you everything you need to know. For more on choosing the right operator, see our guides on{" "}
              <Link href="/kilimanjaro-climbing-companies/" className="text-[var(--primary)] hover:underline">Kilimanjaro climbing companies</Link>{" "}and{" "}
              <Link href="/kilimanjaro-prices/" className="text-[var(--primary)] hover:underline">Kilimanjaro prices</Link>.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm text-sm">
              <thead className="bg-[var(--primary-dark)] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Aspect</th>
                  <th className="text-left px-4 py-3 font-semibold">Budget Operator</th>
                  <th className="text-left px-4 py-3 font-semibold">Quality Operator</th>
                </tr>
              </thead>
              <tbody>
                {budgetComparison.map((row, i) => (
                  <tr key={row.aspect} className={`border-t border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface)]"}`}>
                    <td className="px-4 py-3 font-medium">{row.aspect}</td>
                    <td className="px-4 py-3 text-red-600">{row.budget}</td>
                    <td className="px-4 py-3 text-emerald-700">{row.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <Link href="/climbing-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Kilimanjaro</p>
                <p className="text-xs text-[var(--text-muted)]">Complete guide</p>
              </Link>
              <Link href="/kilimanjaro-altitude-sickness/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Altitude Sickness</p>
                <p className="text-xs text-[var(--text-muted)]">Prevention &amp; treatment</p>
              </Link>
              <Link href="/kilimanjaro-climbing-gear/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <PackageCheck className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Climbing Gear</p>
                <p className="text-xs text-[var(--text-muted)]">Complete packing list</p>
              </Link>
              <Link href="/kilimanjaro-training-plan/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Training Plan</p>
                <p className="text-xs text-[var(--text-muted)]">12-week preparation</p>
              </Link>
              <Link href="/best-route-to-climb-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Mountain className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Best Route Guide</p>
                <p className="text-xs text-[var(--text-muted)]">Compare all routes</p>
              </Link>
              <Link href="/how-hard-is-kilimanjaro/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Star className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">How Hard Is It?</p>
                <p className="text-xs text-[var(--text-muted)]">Honest difficulty assessment</p>
              </Link>
              <Link href="/kilimanjaro-prices/" className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow">
                <Info className="w-6 h-6 text-[var(--secondary)] mb-2" />
                <p className="font-semibold text-sm">Kilimanjaro Prices</p>
                <p className="text-xs text-[var(--text-muted)]">Cost breakdown</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeBase exclude="/kilimanjaro-food-meals/" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Utensils className="w-12 h-12 text-[var(--secondary)] mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Taste the Kilimanjaro Experience
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Our mountain kitchen serves 3 hot meals daily, accommodates all dietary needs, and has fuelled over 500 successful summits. From your first breakfast at the gate to the celebration dinner after the summit — you will eat well on Kilimanjaro.
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
