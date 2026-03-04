/**
 * Update Walking Safari & Trekking on Ngorongoro
 * Updates both metadata and itinerary for the 11-day walking safari.
 *
 * Usage: npx tsx scripts/update-walking-safari.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const SLUG = "walking-safari-trekking-on-ngorongoro";

const itinerary = [
  {
    day: 1,
    title: "Arrival in Arusha",
    description: `Arrive at Kilimanjaro International Airport, where a Snow Africa driver will be waiting to greet you and transfer you to Arusha City, a scenic 50-minute drive through lush Tanzanian countryside at the foot of Mount Meru.

Check in at Arusha Planet Lodge, a tranquil retreat renowned for its comfortable beds, inviting swimming pool, and serene atmosphere. Take the rest of the day to relax, unwind from your journey, and soak in the warm African atmosphere. Your guide will brief you on the adventure ahead — from highland treks through volcanic craters to world-class game drives across the Serengeti plains.

Arusha serves as the safari capital of Tanzania and the gateway to the Northern Circuit's most celebrated parks. Nestled between Mount Kilimanjaro and Mount Meru, this vibrant city offers the perfect starting point for the extraordinary journey that awaits.`,
    accommodation: "Arusha Planet Lodge",
    meals: "Breakfast",
    location: "Arusha",
    highlights: [
      "Airport pickup and transfer",
      "Arusha Planet Lodge check-in",
      "Swimming pool and relaxation",
      "Safari briefing",
      "Gateway to Northern Circuit",
    ],
  },
  {
    day: 2,
    title: "Ngorongoro Crater Game Drive",
    description: `After a hearty breakfast, set out on a scenic three-hour drive to the Ngorongoro Conservation Area — a UNESCO World Heritage Site and one of Africa's most spectacular natural wonders. The road climbs steadily from the lowlands into the cool highlands, passing Maasai homesteads and sweeping farmland.

Upon reaching the crater rim, descend into the world's largest unbroken volcanic caldera for a thrilling full-day game drive. The Ngorongoro Crater floor spans 260 square kilometres and shelters an astonishing density of wildlife — over 25,000 large animals call this natural amphitheatre home year-round.

Expect close encounters with massive elephant bulls, pods of wallowing hippos, the critically endangered black rhino, large herds of Cape buffalo, zebra, and wildebeest. Lions rule the crater floor with several large prides, while spotted hyenas, jackals, and flamingo-fringed soda lakes complete this unforgettable wildlife spectacle.

After an exhilarating day of game viewing, ascend the crater walls and enjoy an evening drive through the highlands to Nainokanoka campsite, your base for the first trekking nights ahead.`,
    accommodation: "Nainokanoka Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Crater",
    highlights: [
      "UNESCO World Heritage crater",
      "Big Five game drive",
      "Black rhino sighting opportunity",
      "25,000+ resident wildlife",
      "Nainokanoka highland camp",
    ],
    isFeatured: true,
  },
  {
    day: 3,
    title: "Olmoti Crater Trek & Maasai Boma Visit",
    description: `Today marks the beginning of your walking safari as you trade the vehicle for your own two feet. After breakfast at Nainokanoka Camp, lace up your hiking boots and set off with your armed ranger and Maasai guide toward the seldom-visited Olmoti Crater.

The trek ascends through dense montane rainforest draped in hanging moss and alive with birdcalls. As you reach the rim of Olmoti Crater, panoramic views unfold across the Ngorongoro Highlands — a vast green tapestry of rolling hills, volcanic peaks, and distant Maasai settlements. Descend into the crater to discover lush grasslands and a stunning waterfall where the Munge River plunges off the crater wall, feeding the streams that eventually flow down to the Ngorongoro Crater floor.

Return to camp for a hot lunch prepared by your dedicated trek chef. In the afternoon, visit a traditional Maasai boma — an authentic cultural experience where you'll learn about the Maasai people's centuries-old way of life, their pastoral traditions, warrior dances, and deep connection to this remarkable landscape. Overnight at Nainokanoka Camp surrounded by the cool highland air.`,
    accommodation: "Nainokanoka Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Olmoti Crater, Ngorongoro Highlands",
    highlights: [
      "Olmoti Crater rim trek",
      "Munge River waterfall",
      "Montane rainforest hiking",
      "Traditional Maasai boma visit",
      "Cultural immersion experience",
    ],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Trek to Bulati Village",
    description: `After breakfast, shoulder your daypack and embark on the day's main trek — a rewarding five to six-hour hike from Nainokanoka to Bulati Village through the heart of the Ngorongoro Highlands. This 15-kilometre trail is one of East Africa's most scenic walking routes, crossing open grasslands, forested ridgelines, and traditional Maasai grazing lands.

The landscape shifts dramatically as you walk. Dense montane forest gives way to sweeping highland meadows dotted with wildflowers, and the trail passes through small Maasai villages where curious children wave and herders guide their cattle along ancient paths. Your Maasai guide shares stories of the land, pointing out medicinal plants, animal tracks, and the volcanic geology that shaped these highlands.

Arrive at Bulati Village in the afternoon and experience the warm hospitality of the local community. Your trek chef will have a hot lunch waiting, followed by time to explore the village and rest your legs. As evening falls over the highlands, enjoy dinner under the stars at Bulati Village campsite with views across the vast Ngorongoro Conservation Area.`,
    accommodation: "Bulati Village Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Bulati Village, Ngorongoro Highlands",
    highlights: [
      "15 km highland trek",
      "Maasai village encounters",
      "Open grassland scenery",
      "Local community hospitality",
      "Remote wilderness camping",
    ],
  },
  {
    day: 5,
    title: "Trek to Empakaai Crater",
    description: `Today's trek leads you from Bulati Village to one of Tanzania's most breathtaking hidden gems — Empakaai Crater. The 11-kilometre hike takes four to five hours, crossing diverse terrain from open grasslands into dense montane forest as you approach the crater rim.

Empakaai is a collapsed volcanic caldera harbouring a deep soda lake that glimmers turquoise and pink depending on the light and the flamingo population. Arrive at camp on the southern rim of the crater in the afternoon, where your chef has prepared a hot lunch with commanding views across the caldera.

After lunch, descend into the crater itself — a surreal experience as the trail drops through thick forest before opening onto the lake shore. Thousands of flamingos wade through the shallow alkaline waters, painting the lake in brilliant pink. The crater walls rise steeply around you, creating a natural amphitheatre of extraordinary beauty. Ascend back to the rim camp for dinner and overnight stay. The western rim reaches 3,200 metres, while the southern camp sits at a comfortable 2,639 metres.`,
    accommodation: "Empakaai Crater Rim Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Empakaai Crater",
    highlights: [
      "11 km scenic trek",
      "Empakaai Crater descent",
      "Thousands of flamingos",
      "Soda lake exploration",
      "Crater rim camping at 2,639m",
    ],
    isFeatured: true,
  },
  {
    day: 6,
    title: "Trek to Acacia Camp",
    description: `After breakfast on the Empakaai Crater rim with its spectacular morning views, set off on the day's 13-kilometre trek to Acacia Camp. This five to six-hour hike takes you through some of the most varied scenery of the entire walking safari — transitioning from dense montane rainforest around the crater to open grasslands with panoramic views of the Great Rift Valley.

The trail descends gradually from the Empakaai rim, weaving through patches of highland forest where colobus monkeys swing through the canopy and exotic birds flit between the branches. As the forest thins, the landscape opens into rolling acacia-dotted savannah — the classic East African scenery that has inspired explorers and photographers for generations.

Your Maasai guide navigates the trail with quiet confidence, sharing knowledge of the plants and wildlife along the way. Arrive at Acacia Camp in the afternoon where your team has set up a comfortable campsite beneath spreading acacia trees. Enjoy a hot lunch, rest, and take in the golden evening light as another remarkable day on the Ngorongoro Highlands draws to a close.`,
    accommodation: "Acacia Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Highlands",
    highlights: [
      "13 km varied terrain trek",
      "Montane forest to savannah",
      "Great Rift Valley views",
      "Acacia woodland camping",
      "Wildlife spotting along trail",
    ],
  },
  {
    day: 7,
    title: "Trek to Lake Natron",
    description: `Today's trek brings the highland walking safari to a dramatic finale as you descend from the cool Ngorongoro Highlands to the shores of Lake Natron — one of East Africa's most otherworldly landscapes. The 11-kilometre hike takes four to five hours and drops from 2,600 metres to just 1,100 metres above sea level, revealing a stunning transformation in scenery.

As you descend, the montane forest and grasslands give way to arid volcanic terrain. The imposing silhouette of Oldoinyo Lengai — Tanzania's only active volcano and sacred to the Maasai as the "Mountain of God" — dominates the horizon. The alkaline Lake Natron stretches below, its rust-red and white mineral flats shimmering in the heat.

Arrive at Africa Safari Lake Natron Luxury Camp in the afternoon for a well-earned rest. This marks the end of the trekking portion of your adventure — your dedicated chef and porters will say their farewells after days of outstanding service on the trail. Settle into the comfort of the luxury tented camp, cool off, and savour the extraordinary landscape around you.`,
    accommodation: "Africa Safari Lake Natron Luxury Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Natron",
    highlights: [
      "11 km descent trek",
      "Oldoinyo Lengai volcano views",
      "Highland-to-lowland transition",
      "Lake Natron arrival",
      "Luxury tented camp",
    ],
    isFeatured: true,
  },
  {
    day: 8,
    title: "Lake Natron Exploration",
    description: `Enjoy a full day exploring the surreal landscapes around Lake Natron — a place unlike anywhere else on Earth. This shallow alkaline lake is one of the most important breeding grounds for East Africa's lesser flamingos, with up to 2.5 million birds nesting along its caustic shores during peak breeding season.

After breakfast, head out to the lakeshore to witness the flamingo colonies up close. The birds thrive in the extreme alkaline conditions that would be inhospitable to most wildlife, creating one of nature's most remarkable spectacles. The mineral-rich waters produce vivid red and orange hues that make for extraordinary photography.

In the afternoon, after a hot lunch back at camp, embark on a refreshing hike to the nearby waterfalls — one of the top activities at Lake Natron. Cool off in the natural pools fed by freshwater streams cutting through the volcanic rock, surrounded by lush vegetation in stark contrast to the arid landscape below. Return to Africa Safari Lake Natron Luxury Camp for a relaxing evening beneath the stars.`,
    accommodation: "Africa Safari Lake Natron Luxury Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Natron",
    highlights: [
      "Flamingo colony visit",
      "Lake Natron's alkaline landscapes",
      "Waterfall hike and natural pools",
      "Volcanic scenery photography",
      "Full day of relaxation",
    ],
  },
  {
    day: 9,
    title: "Serengeti National Park via Klein's Gate",
    description: `Leave Lake Natron behind and embark on a scenic five-hour drive to the legendary Serengeti National Park, entering through the remote Klein's Gate on the park's northeastern boundary. This lesser-used entrance offers an exclusive introduction to the Serengeti, far from the busier southern gates.

The drive itself is an adventure — winding through traditional Maasai lands where colourful settlements dot the landscape, cattle herds graze on golden plains, and the vastness of the East African savannah stretches to the horizon. Watch for wildlife along the route as the terrain transitions from the dry Rift Valley floor into the lush Serengeti ecosystem.

Upon entering the park, begin your first Serengeti game drive as you make your way to Kimbilio Tented Camp in the Lobo area of northern Serengeti. The Lobo region is renowned for its rocky kopjes — granite outcrops where lions lounge and leopards hide — and for being a key corridor during the Great Wildebeest Migration. Settle into your tented camp surrounded by the sights and sounds of the Serengeti wilderness.`,
    accommodation: "Kimbilio Tented Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park (Lobo Area)",
    highlights: [
      "Scenic drive through Maasai lands",
      "Klein's Gate exclusive entry",
      "First Serengeti game drive",
      "Lobo area kopjes",
      "Great Migration corridor",
    ],
  },
  {
    day: 10,
    title: "Serengeti Game Drive — Lobo to Central Serengeti",
    description: `Embark on a full-day game drive through the Serengeti — widely regarded as the greatest wildlife spectacle on the planet. Today's route takes you from the rocky kopjes of the Lobo area in northern Serengeti southward into the iconic Central Serengeti, covering some of the park's richest wildlife territory.

The Serengeti's endless golden plains are home to an estimated three million large mammals. Search for the Big Five — lion, leopard, elephant, buffalo, and rhino — as your experienced guide reads the landscape and tracks animal movements. Cheetahs sprint across the open grasslands, enormous Nile crocodiles bask along river banks, and vast herds of wildebeest and zebra create scenes straight from a wildlife documentary.

The Central Serengeti's Seronera Valley is considered one of the best year-round game viewing areas in all of Africa, with permanent water sources drawing a constant parade of predators and prey. Arrive at Tukaone Mwaloni Tented Camp in the heart of the Central Serengeti for dinner and overnight stay.`,
    accommodation: "Tukaone Mwaloni Tented Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park (Central)",
    highlights: [
      "Full-day Serengeti game drive",
      "Big Five wildlife search",
      "Lobo to Central Serengeti route",
      "Seronera Valley game viewing",
      "3 million large mammals",
    ],
    isFeatured: true,
  },
  {
    day: 11,
    title: "Central Serengeti Game Drive",
    description: `Spend another full day immersed in the wildlife-rich Central Serengeti — one of the most productive game-viewing regions in Africa. With a full day at your disposal, your guide can explore deeper into the network of tracks that crisscross the Seronera Valley and surrounding grasslands.

Early morning is prime time for predator action. Lions often hunt at dawn, leopards retreat to their favourite fig trees, and cheetahs scan the plains from atop termite mounds. The light during the golden hour creates magical conditions for wildlife photography, with the Serengeti's flat horizon offering dramatic backdrops.

As the day progresses, explore riverine habitats along the Seronera River where hippos wallow and elephants come to drink. Watch for the acrobatic displays of martial eagles and secretary birds, while colourful agama lizards bask on sun-warmed rocks. The afternoon brings renewed wildlife activity as temperatures cool and animals emerge from midday shade. Return to Tukaone Mwaloni Tented Camp for your final Serengeti evening.`,
    accommodation: "Tukaone Mwaloni Tented Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park (Central)",
    highlights: [
      "Full-day game drive",
      "Dawn predator activity",
      "Seronera River wildlife",
      "Wildlife photography opportunities",
      "Extended Central Serengeti exploration",
    ],
  },
  {
    day: 12,
    title: "Serengeti to Arusha & Departure",
    description: `Embark on a morning game drive in Serengeti National Park en route to Arusha. After checking out of the park, enjoy the scenic five to six-hour drive back to Arusha via the Ngorongoro Conservation Area — retracing the highlands you trekked through earlier in the journey, now viewed from the comfort of your vehicle. The route passes through some of Tanzania's most beautiful highland scenery, with opportunities to spot wildlife along the way.

Upon arrival in Arusha in the evening, check back in at Arusha Planet Lodge. The following morning, depending on your flight time, your driver will pick you up from the lodge and transfer you to Kilimanjaro International Airport for your onward journey.

This concludes your extraordinary walking safari and Serengeti adventure. From the depths of Ngorongoro Crater and the highlands of Olmoti and Empakaai, through the remote wilderness of Lake Natron, to the legendary plains of the Serengeti — thank you for choosing Snow Africa Adventure. We look forward to welcoming you back to Tanzania.`,
    accommodation: "Arusha Planet Lodge",
    meals: "Breakfast",
    location: "Serengeti to Arusha",
    highlights: [
      "Final Serengeti morning game drive",
      "Scenic drive through Ngorongoro highlands",
      "Return to Arusha Planet Lodge",
      "Airport transfer included",
      "Full-circle journey",
    ],
  },
];

const metadata = {
  title: "Walking Safari on Ngorongoro Highlands & Serengeti",
  metaTitle:
    "Walking Safari on Ngorongoro Highlands",
  metaDescription:
    "11-day walking safari on Ngorongoro Highlands with Serengeti game drives. Trek Olmoti & Empakaai Craters, visit Lake Natron, and spot the Big Five. From $950.",
  duration: "11 Days 10 Nights",
  durationDays: 11,
  type: "Adventure",
  overview:
    "Embark on the ultimate Tanzanian adventure — a 6-day walking safari that takes you deep into the Ngorongoro Highlands on foot before culminating with thrilling Serengeti game drives. Trek through volcanic craters, visit authentic Maasai villages, descend into the flamingo-filled Empakaai Crater, and camp under the stars at Lake Natron with views of Oldoinyo Lengai, Tanzania's only active volcano. This extraordinary journey combines highland trekking with world-class wildlife viewing across some of East Africa's most iconic landscapes.",
  highlights: [
    "Ngorongoro Crater Game Drive",
    "Olmoti Crater Trek & Waterfall",
    "Maasai Cultural Visit",
    "Empakaai Crater Flamingos",
    "Lake Natron & Oldoinyo Lengai Views",
    "Serengeti Big Five Game Drives",
    "Highland Trekking with Porters & Chef",
  ],
  inclusions: [
    "Roundtrip airport transfers",
    "English-speaking professional safari guide",
    "4x4 open-sided pop-up roof safari vehicle",
    "Ranger fees for Ngorongoro trekking",
    "Donkeys, porters, and chef for Ngorongoro trekking",
    "Wildlife Management Area (WMA) and village fees",
    "Drinking water throughout",
    "All current government park fees",
    "Accommodation as specified in itinerary",
    "All meals as specified in itinerary",
    "Portable private toilet, tents, table, and seats for hiking",
    "Sleeping pads and mattresses for hiking",
    "Sleeping bags",
  ],
  exclusions: [
    "Drinks at hotels unless otherwise specified",
    "Personal items such as souvenirs, travel insurance, and visa fees",
    "Tips and gratuities",
    "International flights",
    "Personal hiking gear (boots, walking poles, clothing)",
    "Extra nights in town",
    "Soft and alcoholic beverages",
    "Dinner in town",
  ],
};

async function updateWalkingSafari() {
  console.log("🥾 Updating Walking Safari & Trekking on Ngorongoro...\n");

  try {
    const existing = await prisma.safariPackage.findUnique({
      where: { slug: SLUG },
    });

    if (!existing) {
      console.log("⚠️  Safari not found in database. Creating new entry...");
      await prisma.safariPackage.create({
        data: {
          slug: SLUG,
          ...metadata,
          itinerary: itinerary as any,
          featuredImage:
            "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2025/03/Ngorongoro-Walking-Safari-ways-african-safaris.jpg",
          priceFrom: 950,
          isActive: true,
        },
      });
      console.log("✅ Created new safari package with full itinerary.");
    } else {
      await prisma.safariPackage.update({
        where: { slug: SLUG },
        data: {
          ...metadata,
          itinerary: itinerary as any,
        },
      });
      console.log("✅ Updated safari package metadata and itinerary.");
    }

    console.log(`\n📋 Summary:`);
    console.log(`   Title: ${metadata.title}`);
    console.log(`   Duration: ${metadata.duration}`);
    console.log(`   Days in itinerary: ${itinerary.length}`);
    console.log(`   Inclusions: ${metadata.inclusions.length} items`);
    console.log(`   Exclusions: ${metadata.exclusions.length} items`);
    console.log(
      `   Highlights: ${metadata.highlights.join(", ")}`
    );

    const avgLength = Math.round(
      itinerary.reduce((sum, day) => sum + day.description.length, 0) /
        itinerary.length
    );
    console.log(`   Avg description length: ${avgLength} chars/day`);
  } catch (error) {
    console.error("❌ Error updating safari:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWalkingSafari();
