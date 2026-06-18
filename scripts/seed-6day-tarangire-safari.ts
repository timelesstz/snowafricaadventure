/**
 * Seed 6 Days Safari to Tarangire, Ngorongoro & Serengeti
 * Creates or updates this safari package in the production database.
 *
 * Usage: npx tsx scripts/seed-6day-tarangire-safari.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const SLUG = "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north";

const itinerary = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your Northern Circuit safari adventure begins in Arusha, Tanzania's safari capital. After meeting your experienced guide at your hotel, you'll depart for Tarangire National Park, approximately 2.5 hours southwest.

The drive passes through the Maasai Steppe, where traditional herders in distinctive red clothing tend their cattle alongside wildlife. This is a preview of the seamless coexistence between people and nature that characterizes Tanzania's northern parks.

Tarangire is often overlooked by visitors rushing to the Serengeti, but it offers some of Tanzania's most spectacular wildlife viewing. The park is named after the Tarangire River, a lifeline that draws wildlife from across the region during the dry season.

After entering the park, enjoy a picnic lunch surrounded by the ancient baobab trees that define Tarangire's landscape. These massive trees, some estimated to be over 2,000 years old, create a uniquely African panorama. Watch for elephants approaching the baobabs — they often strip bark for moisture and nutrients.

Your afternoon game drive follows the Tarangire River, where the park's famous elephant herds gather. Tarangire boasts the highest elephant density in Tanzania — during peak season, herds of 300 or more congregate along the riverbanks. Buffalo, zebra, wildebeest, and giraffe share the water sources with their gentle giant neighbors.

As the golden hour approaches, watch for predators becoming active. Tarangire's lions occasionally climb trees, a behavior also seen at Lake Manyara. Return to your lodge as the sun sets behind the baobabs.`,
    accommodation: "Tarangire Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Tarangire-National-Park.jpg",
    highlights: ["Elephant paradise", "Ancient baobab landscape", "Tarangire River wildlife", "Tree-climbing lions", "Sunset game drive"],
  },
  {
    day: 2,
    title: "Tarangire to Ngorongoro Conservation Area",
    description: `Rise early for a morning game drive through Tarangire, when wildlife is most active. The cool dawn hours bring elephants to the river, predators returning from nighttime hunts, and birds in full chorus. Search for any species you missed yesterday — perhaps a leopard in the riverine forest or a cheetah on the open plains.

Mid-morning, depart Tarangire and drive north toward the Ngorongoro Conservation Area. The route takes you through the town of Mto wa Mbu ("River of Mosquitoes"), a vibrant market town where multiple tribes — Maasai, Iraqw, Datooga, and others — live and trade together.

Climb into the Ngorongoro highlands, where the air grows cooler and the vegetation lusher. The forest-clad rim of the Ngorongoro Crater rises ahead, one of the most spectacular sights in Africa. Check into your lodge on the crater rim and enjoy lunch with views into the caldera.

Spend the afternoon exploring the crater rim area. Take a guided nature walk through the highland forest, home to elephants, buffalo, bushbuck, and endemic birds. The forest atmosphere is mystical — giant heather trees draped in old man's beard lichen, colorful turacos flashing through the canopy.

As evening approaches, find a viewpoint to watch the sunset over the crater. The floor, 600 meters below, glows gold in the fading light, while thousands of animals appear as tiny dots moving across the grasslands. Dinner at your lodge offers continued views of this natural wonder.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg",
    highlights: ["Morning Tarangire drive", "Mto wa Mbu town", "Highland forest walk", "Crater rim views", "Spectacular sunset"],
  },
  {
    day: 3,
    title: "Ngorongoro Crater Game Drive",
    description: `Today brings the highlight many consider the pinnacle of any African safari — a full game drive in the Ngorongoro Crater. After an early breakfast watching the sun illuminate the crater floor, prepare for an extraordinary day.

The descent road winds 600 meters down the steep crater wall, passing through forest before emerging onto the grasslands below. The transformation is dramatic — from cool, misty heights to warm, wildlife-filled plains within minutes.

The Ngorongoro Crater is a UNESCO World Heritage Site supporting approximately 25,000 large animals — the highest density of wildlife in Africa. This ancient volcanic caldera, measuring 19 kilometers across, is essentially a natural Eden where nearly every species of East African plains game thrives.

Your guide will navigate to the crater's various habitats. The Lerai Forest harbors elephants and leopards among the yellow-barked fever trees. The Ngoitoktok Springs attract hippos and abundant birdlife. The central Makat Lake shimmers with flamingos when conditions are right.

The crater offers excellent chances of seeing all Big Five. Lions are abundant — you'll likely see multiple prides. The critically endangered black rhino is present, with about 25 individuals carefully monitored by rangers. Elephants, though mostly solitary bulls, are regularly seen, while buffalo and leopards complete the list.

After a picnic lunch with crater views, continue exploring until late afternoon. Ascend the crater walls as the shadows lengthen, carrying memories of an extraordinary day.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Crater",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/39339368385_20d92a678c_k.jpg",
    highlights: ["Full crater exploration", "Big Five opportunity", "Black rhino search", "Flamingo-filled lake", "Hippo pools"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Ngorongoro to Serengeti National Park",
    description: `After breakfast, depart the crater rim for the legendary Serengeti. The drive takes approximately 3-4 hours, but the scenery makes the time pass quickly. Cross the Ngorongoro highlands where Maasai graze their cattle alongside wildlife, then descend toward the endless Serengeti plains.

Stop at Olduvai Gorge, one of the world's most important archaeological sites. Here, the Leakey family made discoveries that revolutionized our understanding of human evolution. Visit the small museum to see fossil replicas and learn about our 1.8-million-year-old ancestors who walked these same plains.

Entering the Serengeti through Naabi Hill Gate, the landscape transforms dramatically. The name "Serengeti" comes from the Maasai word meaning "endless plains" — and you'll understand why as golden grassland stretches to every horizon. During the Great Migration, up to 2 million wildebeest traverse these plains.

Check into your lodge in the Seronera area, the heart of the Serengeti. This central location offers excellent year-round wildlife viewing, as the Seronera River attracts animals regardless of migration timing.

Your evening game drive explores Seronera's famous big cat territory. This area hosts the highest density of leopards in Africa, and your guide knows where to find them. Lions control territories along the river, while cheetahs hunt the nearby plains. As darkness falls, the sounds of the Serengeti come alive around you.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/Serengeri-National-Park.jpg",
    highlights: ["Olduvai Gorge visit", "Enter the Serengeti", "Endless plains scenery", "Seronera game drive", "Big cat territory"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Full Day in Serengeti National Park",
    description: `Today offers a full day to explore the Serengeti's boundless wilderness. Rise before dawn for an early morning game drive — the best time to witness predators at their most active, before the heat of day drives them into shade.

The Serengeti is home to approximately 3,000 lions organized into over 300 prides. Your guide will search their favorite territories — river corridors, kopjes, and open plains where prides stake their claims. Watching a pride of lions in the soft morning light is one of Africa's quintessential experiences.

The Seronera area is famous for leopard sightings. These elusive cats rest in the branches of sausage trees and fever acacias during the day. Your guide knows exactly where to look, and patience often rewards visitors with exceptional viewing. Cheetahs prefer the open grasslands where their speed gives them advantage.

After a bush lunch in the shade of an acacia tree, continue your exploration. The afternoon brings different wildlife activity — elephants emerge from woodland to drink, hippos leave their daytime pools, and the predators begin to stir from their rest.

If visiting during the Great Migration (typically July-October in the northern Serengeti), you may witness dramatic river crossings. Even outside migration season, the Serengeti's resident wildlife ensures incredible viewing. Watch the famous Serengeti sunset paint the endless plains in shades of gold and amber.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/32535628638_2be6219332_k-2.jpg",
    highlights: ["All-day game drives", "Big cat tracking", "Bush lunch", "Migration territory", "Spectacular sunset"],
    isFeatured: true,
  },
  {
    day: 6,
    title: "Serengeti — Return to Arusha",
    description: `Your final day begins with an early morning game drive, making the most of your remaining time in the Serengeti. The park often saves its best surprises for these last hours — perhaps a leopard with a fresh kill, a cheetah beginning its morning hunt, or a river crossing if you're visiting during migration season.

After breakfast at your lodge, begin the return journey to Arusha. The drive takes approximately 7-8 hours with stops, but the scenery makes the time pass quickly. Retrace your route across the Serengeti's southern plains, through the Ngorongoro highlands, and down to the warm lowlands around Arusha.

The return drive offers final opportunities for wildlife sightings. The route passes through prime animal habitat, and your guide will stop for any notable encounters. Watch the landscape transform from golden savanna to green highlands to agricultural lowlands as you return to civilization.

Optional stops along the way include Maasai cultural villages for authentic interactions, viewpoints overlooking the Great Rift Valley, and the bustling markets of local towns. Your guide can tailor the return journey to your interests.

Arrive in Arusha in the late afternoon or early evening. Your guide will deliver you to your hotel or continue to Kilimanjaro International Airport for your departure flight. Your 6-day safari has delivered the finest of Tanzania's Northern Circuit — the elephants of Tarangire, the concentrated wildlife of Ngorongoro, and the endless wonder of the Serengeti.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Serengeti to Arusha",
    image: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2023/03/28939626580_da4be2e4b1_k.jpg",
    highlights: ["Final game drive", "Scenic return journey", "Optional cultural stops", "Rift Valley views", "Complete Northern Circuit"],
  },
];

const metadata = {
  title: "6 Days Safari to Tarangire, Ngorongoro & Serengeti",
  metaTitle: "6-Day Northern Circuit Safari — Tarangire, Ngorongoro Crater & Serengeti | Tanzania",
  metaDescription: "Comprehensive 6-day Northern Circuit safari covering Tarangire elephants, Ngorongoro Crater Big Five, and Central Serengeti game drives. From $2,750 per person.",
  duration: "6 Days 5 Nights",
  durationDays: 6,
  type: "Mid-range",
  overview: `A comprehensive Northern Circuit safari exploring both Central and North Serengeti, plus Tarangire's elephants and Ngorongoro Crater. Starting with Tarangire's elephants, descending into Ngorongoro Crater, and then spending quality time in both central and northern Serengeti, this safari offers diverse landscapes and wildlife experiences.

The northern extension brings you closer to the Kenya border and the famous Mara River crossing points during migration season. This itinerary is specially designed to maximize wildlife encounters across Tanzania's most prolific parks, covering three distinct ecosystems.

Best Time: Year-round; June-October for migration. Accommodation: Mid-range lodges. Start/End: Arusha.`,
  highlights: [
    "Central & Northern Serengeti",
    "Ngorongoro Crater Big Five",
    "Tarangire elephant herds",
    "Extended Serengeti time",
    "Great Migration routes",
    "Diverse ecosystems",
  ],
  inclusions: [
    "All national park entrance fees",
    "Professional English-speaking safari guide",
    "Private 4x4 Land Cruiser with pop-up roof",
    "Mid-range lodge accommodation",
    "All meals (full board)",
    "Unlimited bottled water during drives",
    "Airport transfers (JRO/ARK)",
    "Flying Doctor emergency evacuation",
  ],
  exclusions: [
    "International flights",
    "Travel insurance (required)",
    "Tanzania visa fees ($50 USD)",
    "Tips for guide and lodge staff",
    "Alcoholic beverages",
    "Items of personal nature",
  ],
};

async function seedSafari() {
  console.log("🦁 Seeding 6 Days Safari to Tarangire, Ngorongoro & Serengeti...\n");

  try {
    const result = await prisma.safariPackage.upsert({
      where: { slug: SLUG },
      create: {
        slug: SLUG,
        ...metadata,
        itinerary: itinerary as any,
        featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg",
        priceFrom: 2750,
        isActive: true,
        parksCount: 3,
        gameDrives: 11,
        rating: 4.9,
      },
      update: {
        ...metadata,
        itinerary: itinerary as any,
        featuredImage: "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/05/Ngorongoro_Crater_Maasai_herding_mating_lion_couple-1.jpg",
        priceFrom: 2750,
        isActive: true,
        parksCount: 3,
        gameDrives: 11,
        rating: 4.9,
      },
    });

    console.log(`✅ Safari package upserted successfully (ID: ${result.id})`);
    console.log(`\n📋 Summary:`);
    console.log(`   Title: ${metadata.title}`);
    console.log(`   Duration: ${metadata.duration}`);
    console.log(`   Days in itinerary: ${itinerary.length}`);
    console.log(`   Price from: $${2750}`);
    console.log(`   Parks: 3 | Game Drives: 11 | Rating: 4.9`);
  } catch (error) {
    console.error("❌ Error seeding safari:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSafari();
