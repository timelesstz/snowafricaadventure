/**
 * Comprehensive Safari Package Details Seed Script
 *
 * This script populates all missing details for safari packages including:
 * - overview (description)
 * - priceFrom
 * - gallery, highlights, inclusions, exclusions
 * - itinerary (complete day-by-day)
 *
 * Usage: npx tsx scripts/seed-safari-details.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

// Common included items for most safaris
const commonInclusions = [
  "Airport pickup and drop-off",
  "Professional English-speaking safari guide",
  "4x4 Land Cruiser with pop-up roof for game viewing",
  "All park entrance fees",
  "All accommodation as per itinerary",
  "All meals as specified (B=Breakfast, L=Lunch, D=Dinner)",
  "Unlimited bottled drinking water during safari",
  "Game drives as per itinerary",
  "Flying Doctors emergency evacuation insurance",
];

const luxuryInclusions = [
  ...commonInclusions,
  "Domestic flights where specified",
  "All house wines, local beers, and soft drinks at lodges",
  "Laundry service at lodges",
  "Private safari vehicle",
];

const budgetInclusions = [
  "Airport pickup and drop-off",
  "Professional English-speaking safari guide",
  "4x4 safari vehicle with pop-up roof",
  "All park entrance fees",
  "Camping fees and equipment (tents, sleeping mats)",
  "All meals prepared by camp cook",
  "Unlimited bottled drinking water",
  "Game drives as per itinerary",
];

// Common excluded items
const commonExclusions = [
  "International flights",
  "Visa fees ($50 USD for most nationalities)",
  "Travel insurance (mandatory)",
  "Personal expenses and souvenirs",
  "Tips and gratuities for guides and staff",
  "Optional activities not mentioned in itinerary",
  "Alcoholic beverages (unless specified)",
  "Balloon safari ($599 per person)",
];

const budgetExclusions = [
  ...commonExclusions,
  "Sleeping bags (can be rented for $15/trip)",
  "Accommodation upgrades",
];

// Safari package complete data
interface SafariData {
  slug: string;
  overview: string;
  priceFrom: number;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  // Hero stats
  parksCount: number;
  gameDrives: number;
  rating: number;
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
    meals?: string;
    location?: string;
    image?: string;
    highlights?: string[];
    isFeatured?: boolean;
  }[];
}

const safariData: SafariData[] = [
  // 1. 6 Days Tanzania Migration Safari
  {
    slug: "6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater",
    overview: `Experience the greatest wildlife spectacle on Earth - the Great Wildebeest Migration. This 6-day safari is specially designed to follow the migration herds through the Serengeti ecosystem, with a focus on the Ndutu area where millions of wildebeest and zebra gather during calving season.

Witness the drama of predator-prey interactions as lions, cheetahs, and hyenas follow the massive herds. Visit Lake Manyara known for its tree-climbing lions and flamingo-filled shores, and descend into the Ngorongoro Crater, a UNESCO World Heritage Site with the highest concentration of wildlife in Africa.

This migration-focused safari offers the best opportunities to witness river crossings, predator action, and the sheer spectacle of over 2 million animals on the move. Our expert guides know exactly where to position you for the best wildlife encounters.

Best Time: December to March for calving season, June to October for river crossings.
Accommodation: Mid-range lodges and tented camps.
Start/End: Arusha.`,
    priceFrom: 2850,
    featuredImage: "/images/safaris/migration-safari-hero.jpg",
    gallery: [
      "/images/safaris/migration-crossing.jpg",
      "/images/safaris/ndutu-calving.jpg",
      "/images/safaris/serengeti-lions.jpg",
      "/images/safaris/ngorongoro-crater.jpg",
      "/images/safaris/lake-manyara-flamingos.jpg",
      "/images/safaris/wildebeest-herd.jpg",
    ],
    highlights: [
      "Witness the Great Wildebeest Migration",
      "Calving season in Ndutu (Dec-Mar)",
      "Predator-prey action",
      "Ngorongoro Crater Big Five",
      "Lake Manyara tree-climbing lions",
      "Expert migration-tracking guides",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport where our representative will meet you. Transfer to your hotel in Arusha for overnight stay and safari briefing. Meet your guide and prepare for the adventure ahead.",
        accommodation: "Gran Melia Arusha or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/arusha-arrival.jpg",
        highlights: ["Airport meet and greet", "Safari briefing", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Arusha to Lake Manyara National Park",
        description: "After breakfast, drive to Lake Manyara National Park. This compact yet diverse park features groundwater forests, acacia woodlands, and the alkaline lake that attracts thousands of flamingos. Famous for its tree-climbing lions and large elephant herds.",
        accommodation: "Lake Manyara Serena Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara National Park",
        image: "/images/safaris/lake-manyara-flamingos.jpg",
        highlights: ["Tree-climbing lions", "Flamingo spectacle", "Elephant herds"],
      },
      {
        day: 3,
        title: "Lake Manyara to Ndutu (Southern Serengeti)",
        description: "Drive to the Ndutu area in the southern Serengeti, the epicenter of the calving season. From December to March, over 500,000 wildebeest calves are born here. Watch predators including lions, cheetahs, and hyenas hunting the vulnerable newborns.",
        accommodation: "Ndutu Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ndutu Area, Southern Serengeti",
        image: "/images/safaris/ndutu-calving.jpg",
        highlights: ["Calving season epicenter", "Predator action", "Massive herds"],
        isFeatured: true,
      },
      {
        day: 4,
        title: "Full Day Migration Tracking in Ndutu",
        description: "Full day following the migration herds. Your expert guide will track the movements of the wildebeest and zebra, positioning you for the best wildlife encounters. Watch incredible predator-prey interactions and the miracle of new life on the plains.",
        accommodation: "Ndutu Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ndutu Area, Southern Serengeti",
        image: "/images/safaris/migration-hunt.jpg",
        highlights: ["Full day game drives", "Predator hunting", "Wildlife photography"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Ndutu to Ngorongoro Conservation Area",
        description: "Morning game drive in Ndutu before driving to the Ngorongoro Conservation Area. Arrive at your lodge perched on the crater rim with spectacular views into the caldera below. Evening at leisure to enjoy the sunset over the crater.",
        accommodation: "Ngorongoro Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/ngorongoro-rim.jpg",
        highlights: ["Final Ndutu game drive", "Crater rim views", "Sunset over crater"],
      },
      {
        day: 6,
        title: "Ngorongoro Crater - Departure",
        description: "Early morning descent into the Ngorongoro Crater, often called the 'Eighth Wonder of the World'. This UNESCO World Heritage Site hosts the highest density of wildlife in Africa including all of the Big Five. After a picnic lunch in the crater, drive back to Arusha for your departure.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-floor.jpg",
        highlights: ["Crater floor game drive", "Big Five opportunity", "Black rhino sightings"],
        isFeatured: true,
      },
    ],
  },

  // 2. 4 Day Safari Adventure
  {
    slug: "4-day-safari-adventure-in-tanzania",
    overview: `Discover the best of Northern Tanzania in just 4 days. This perfectly crafted safari takes you through three of Africa's most iconic wildlife destinations: Tarangire National Park, Lake Manyara National Park, and the world-famous Ngorongoro Crater.

Experience the ancient baobab forests of Tarangire with its massive elephant herds, the flamingo-lined shores of Lake Manyara with its famous tree-climbing lions, and the wildlife-packed caldera of Ngorongoro where you can see all Big Five in a single day.

This safari is ideal for travelers with limited time who want to experience the highlights of Tanzania's Northern Circuit without compromise.

Best Time: Year-round, best June to October (dry season) and December to February.
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 1650,
    featuredImage: "/images/safaris/4-day-safari-hero.jpg",
    gallery: [
      "/images/safaris/tarangire-elephants.jpg",
      "/images/safaris/lake-manyara-lions.jpg",
      "/images/safaris/ngorongoro-crater.jpg",
      "/images/safaris/baobab-sunset.jpg",
      "/images/safaris/flamingos.jpg",
    ],
    highlights: [
      "Tarangire elephant herds",
      "Ancient baobab forests",
      "Lake Manyara tree-climbing lions",
      "Ngorongoro Crater Big Five",
      "Flamingo spectacle",
      "Maasai village visit option",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arusha to Tarangire National Park",
        description: "After breakfast, depart Arusha and drive to Tarangire National Park, famous for its large elephant herds and ancient baobab trees. Enjoy a full day game drive spotting lions, leopards, zebras, wildebeest, and over 500 bird species.",
        accommodation: "Tarangire Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tarangire-elephants.jpg",
        highlights: ["Giant elephant herds", "Ancient baobab trees", "500+ bird species"],
        isFeatured: true,
      },
      {
        day: 2,
        title: "Tarangire to Lake Manyara National Park",
        description: "Morning game drive in Tarangire before heading to Lake Manyara National Park. This compact park is known for its tree-climbing lions, flamingos on the alkaline lake, and diverse habitats from groundwater forests to the Rift Valley escarpment.",
        accommodation: "Lake Manyara Serena Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara National Park",
        image: "/images/safaris/lake-manyara-flamingos.jpg",
        highlights: ["Tree-climbing lions", "Pink flamingos", "Diverse ecosystems"],
      },
      {
        day: 3,
        title: "Lake Manyara to Ngorongoro Crater",
        description: "Descend 600 meters into the Ngorongoro Crater, often called the 'Eighth Wonder of the World'. This UNESCO World Heritage Site hosts the highest density of wildlife in Africa, including the Big Five. Excellent chances to spot the endangered black rhino.",
        accommodation: "Ngorongoro Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/ngorongoro-crater.jpg",
        highlights: ["UNESCO World Heritage Site", "All Big Five possible", "Black rhino sightings"],
        isFeatured: true,
      },
      {
        day: 4,
        title: "Ngorongoro to Arusha - Departure",
        description: "Enjoy an early morning crater tour or optional Maasai village visit. After brunch, drive back to Arusha with stops at local craft markets. Arrive in time for your onward journey or flight.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro to Arusha",
        image: "/images/safaris/maasai-village.jpg",
        highlights: ["Optional Maasai village", "Craft market shopping", "Scenic drive"],
      },
    ],
  },

  // 3. 9 Days Tanzania Wildlife Safari
  {
    slug: "9-days-tanzania-wildlife-safari",
    overview: `The ultimate Tanzania wildlife experience. This comprehensive 9-day safari covers the complete Northern Circuit, from the elephant paradise of Tarangire to the endless plains of the Serengeti and the wildlife-packed Ngorongoro Crater.

Spend quality time in each destination, allowing for in-depth wildlife observation and photography. Track the Great Migration across the Serengeti, explore both central and northern regions, and witness the dramatic Mara River crossings during migration season.

This safari is designed for wildlife enthusiasts who want to see it all - from the Big Five to the Great Migration, from ancient baobabs to volcanic craters.

Best Time: Year-round; June-October for dry season and migration crossings.
Accommodation: Mid-range to luxury lodges and tented camps.
Start/End: Arusha.`,
    priceFrom: 4250,
    featuredImage: "/images/safaris/9-day-safari-hero.jpg",
    gallery: [
      "/images/safaris/serengeti-migration.jpg",
      "/images/safaris/mara-river-crossing.jpg",
      "/images/safaris/tarangire-baobabs.jpg",
      "/images/safaris/ngorongoro-rhino.jpg",
      "/images/safaris/serengeti-lions.jpg",
      "/images/safaris/maasai-culture.jpg",
    ],
    highlights: [
      "Extended Serengeti exploration",
      "Central and Northern Serengeti",
      "Mara River crossings (seasonal)",
      "Tarangire elephant herds",
      "Ngorongoro Big Five",
      "Maasai cultural visit",
      "Olduvai Gorge museum",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport. Meet our representative and transfer to your hotel in Arusha. Evening briefing about your upcoming safari adventure.",
        accommodation: "Arusha Coffee Lodge or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/arusha-arrival.jpg",
        highlights: ["Airport meet and greet", "Safari briefing", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        description: "Drive to Tarangire, home to Tanzania's largest elephant population. Game drive through baobab-studded savannah, watching elephants, lions, and hundreds of bird species.",
        accommodation: "Tarangire Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tarangire-elephants.jpg",
        highlights: ["Largest elephant population", "Ancient baobab forest", "500+ bird species"],
        isFeatured: true,
      },
      {
        day: 3,
        title: "Full Day in Tarangire",
        description: "Full day exploring Tarangire's diverse ecosystems. Track lion prides, leopards in acacia trees, and massive elephant herds at the Tarangire River.",
        accommodation: "Tarangire Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tarangire-lions.jpg",
        highlights: ["Lion pride tracking", "Leopard sightings", "Elephant herds at river"],
      },
      {
        day: 4,
        title: "Tarangire to Serengeti via Ngorongoro",
        description: "Drive through the Ngorongoro Conservation Area to the Serengeti. Stop at Olduvai Gorge, the 'Cradle of Mankind'. Enter the endless plains of the Serengeti for afternoon game drive.",
        accommodation: "Serengeti Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/olduvai-gorge.jpg",
        highlights: ["Olduvai Gorge museum", "Cradle of Mankind", "Serengeti endless plains"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Full Day in Central Serengeti",
        description: "Full day game drives in the Serengeti. Follow predators on the hunt, witness river crossings during migration season, and explore kopjes where lions rest.",
        accommodation: "Serengeti Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-migration.jpg",
        highlights: ["Predator tracking", "Migration herds", "Lions on kopjes"],
        isFeatured: true,
      },
      {
        day: 6,
        title: "Central to Northern Serengeti",
        description: "Drive to the northern Serengeti, closer to migration routes. Visit the Mara River area, famous for dramatic wildebeest crossings. Evening sundowner.",
        accommodation: "Serengeti Migration Camp or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Northern Serengeti",
        image: "/images/safaris/mara-river-crossing.jpg",
        highlights: ["Mara River crossings", "Wildebeest migration", "Sundowner drinks"],
        isFeatured: true,
      },
      {
        day: 7,
        title: "Northern Serengeti to Ngorongoro",
        description: "Morning game drive before departing for Ngorongoro. Afternoon visit to a Maasai boma to learn about traditional culture.",
        accommodation: "Ngorongoro Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/maasai-boma.jpg",
        highlights: ["Final Serengeti game drive", "Maasai village visit", "Cultural immersion"],
      },
      {
        day: 8,
        title: "Ngorongoro Crater Floor",
        description: "Descend into the crater for a full day game drive. Spot all Big Five in this concentrated wildlife haven. Picnic lunch by the hippo pool.",
        accommodation: "Ngorongoro Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-crater.jpg",
        highlights: ["All Big Five", "Black rhino sightings", "Hippo pool picnic"],
        isFeatured: true,
      },
      {
        day: 9,
        title: "Ngorongoro to Arusha - Departure",
        description: "Morning crater rim walk or final game viewing. Drive back to Arusha with stops at craft markets. Transfer to airport for departure.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro to Arusha",
        image: "/images/safaris/crater-rim-walk.jpg",
        highlights: ["Crater rim walk", "Craft market shopping", "Airport transfer"],
      },
    ],
  },

  // 4. 6 Days Lodge Safari
  {
    slug: "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater",
    overview: `Experience the best of Tanzania in comfort and style. This 6-day lodge safari combines the iconic wildlife destinations of the Northern Circuit with quality accommodation in lodges and luxury tented camps.

From the elephant-rich Tarangire to the tree-climbing lions of Lake Manyara, from the endless Serengeti plains to the wildlife-packed Ngorongoro Crater, this safari delivers the complete Tanzania experience with the comfort of permanent lodges.

Perfect for travelers who want authentic safari experiences without compromising on comfort.

Best Time: Year-round; June-October for dry season.
Accommodation: Mid-range lodges and luxury tented camps.
Start/End: Arusha.`,
    priceFrom: 2650,
    featuredImage: "/images/safaris/6-day-lodge-hero.jpg",
    gallery: [
      "/images/safaris/lodge-room.jpg",
      "/images/safaris/tarangire-elephants.jpg",
      "/images/safaris/serengeti-sunrise.jpg",
      "/images/safaris/ngorongoro-view.jpg",
      "/images/safaris/lake-manyara-hippo.jpg",
    ],
    highlights: [
      "Quality lodge accommodation",
      "Four iconic parks",
      "Tarangire elephants",
      "Serengeti Big Five",
      "Ngorongoro Crater",
      "Lake Manyara tree-climbing lions",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival - Arusha",
        description: "Arrive at Kilimanjaro Airport and transfer to your lodge in Arusha. Meet your guide for safari briefing and overnight stay.",
        accommodation: "Arusha Coffee Lodge or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/arusha-coffee-lodge.jpg",
        highlights: ["Luxury lodge welcome", "Safari briefing", "Rest and preparation"],
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        description: "Morning departure to Tarangire National Park. Game drive among giant baobabs and elephant herds. Watch lions, leopards, and countless birds.",
        accommodation: "Tarangire Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tarangire-baobabs.jpg",
        highlights: ["Giant baobab trees", "Elephant herds", "Big cat sightings"],
        isFeatured: true,
      },
      {
        day: 3,
        title: "Tarangire to Lake Manyara",
        description: "Drive to Lake Manyara National Park. Afternoon game drive to see tree-climbing lions, hippos, flamingos, and the diverse forest ecosystem.",
        accommodation: "Lake Manyara Serena Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara National Park",
        image: "/images/safaris/lake-manyara-lions.jpg",
        highlights: ["Tree-climbing lions", "Flamingo colonies", "Groundwater forest"],
      },
      {
        day: 4,
        title: "Lake Manyara to Serengeti",
        description: "Cross the Ngorongoro Highlands to the Serengeti. Stop at Olduvai Gorge. Afternoon game drive on the endless plains.",
        accommodation: "Serengeti Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-plains.jpg",
        highlights: ["Olduvai Gorge visit", "Endless Serengeti plains", "Big cat territory"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro",
        description: "Morning game drive in the Serengeti before driving to Ngorongoro. Afternoon at leisure enjoying crater rim views.",
        accommodation: "Ngorongoro Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/ngorongoro-rim.jpg",
        highlights: ["Final Serengeti game drive", "Spectacular crater views", "Luxury rim lodge"],
      },
      {
        day: 6,
        title: "Ngorongoro Crater - Departure",
        description: "Early descent into Ngorongoro Crater for game drive. Picnic lunch in the crater. Drive back to Arusha for departure.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater to Arusha",
        image: "/images/safaris/ngorongoro-floor.jpg",
        highlights: ["Crater floor game drive", "Big Five sightings", "Picnic lunch"],
        isFeatured: true,
      },
    ],
  },

  // 5. 3 Days Lodge Safari
  {
    slug: "3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater",
    overview: `The perfect introduction to Tanzania's wildlife. This 3-day lodge safari covers the essential highlights of the Northern Circuit - Tarangire's elephants, Lake Manyara's tree-climbing lions, and the world-famous Ngorongoro Crater.

Ideal for travelers with limited time or those looking to add a short safari to their Kilimanjaro climb or Zanzibar beach holiday. Despite the compact duration, you'll experience three distinct ecosystems and have excellent chances of seeing the Big Five.

Best Time: Year-round.
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 1150,
    featuredImage: "/images/safaris/3-day-lodge-hero.jpg",
    gallery: [
      "/images/safaris/tarangire-elephants.jpg",
      "/images/safaris/lake-manyara-flamingos.jpg",
      "/images/safaris/ngorongoro-crater.jpg",
      "/images/safaris/lodge-dinner.jpg",
    ],
    highlights: [
      "Three parks in three days",
      "Comfortable lodge stays",
      "Tarangire elephants",
      "Lake Manyara tree-climbing lions",
      "Ngorongoro Crater Big Five",
      "Perfect add-on to Kilimanjaro or Zanzibar",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arusha to Tarangire & Lake Manyara",
        description: "Depart Arusha for Tarangire National Park. Game drive among elephants and baobabs. Continue to Lake Manyara area for overnight.",
        accommodation: "Lake Manyara Serena Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire & Lake Manyara",
        image: "/images/safaris/tarangire-elephants.jpg",
        highlights: ["Elephant encounters", "Baobab landscapes", "Two parks in one day"],
        isFeatured: true,
      },
      {
        day: 2,
        title: "Lake Manyara to Ngorongoro",
        description: "Morning game drive at Lake Manyara. Drive to Ngorongoro Conservation Area. Optional Maasai village visit. Sunset views of the crater.",
        accommodation: "Ngorongoro Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara & Ngorongoro",
        image: "/images/safaris/lake-manyara-flamingos.jpg",
        highlights: ["Tree-climbing lions", "Maasai village", "Crater sunset views"],
      },
      {
        day: 3,
        title: "Ngorongoro Crater - Departure",
        description: "Descend into the crater for a full morning game drive. Spot rhinos, lions, elephants, and buffalos. Return to Arusha.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-rhino.jpg",
        highlights: ["Black rhino sightings", "Big Five possible", "UNESCO World Heritage"],
        isFeatured: true,
      },
    ],
  },

  // 6. 6 Days Budget Camping Safari
  {
    slug: "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater",
    overview: `Experience authentic African safari camping at an affordable price. This 6-day budget camping safari takes you through all the major parks of the Northern Circuit while camping in public campsites under the African stars.

Wake up to the sounds of wildlife, enjoy freshly prepared meals by your camp cook, and experience the true essence of safari life. Despite the budget-friendly price, you'll visit the same incredible parks as luxury safaris - Tarangire, Lake Manyara, Serengeti, and Ngorongoro Crater.

Perfect for adventurous travelers and backpackers who want the authentic safari experience.

Best Time: Year-round; June-October for dry season.
Accommodation: Public campsites with dome tents.
Start/End: Arusha.`,
    priceFrom: 1450,
    featuredImage: "/images/safaris/camping-safari-hero.jpg",
    gallery: [
      "/images/safaris/camping-tent.jpg",
      "/images/safaris/camp-dinner.jpg",
      "/images/safaris/serengeti-camping.jpg",
      "/images/safaris/campfire-night.jpg",
      "/images/safaris/safari-vehicle.jpg",
    ],
    highlights: [
      "Authentic camping experience",
      "Budget-friendly",
      "Four major parks",
      "Camp cook prepared meals",
      "Starlit nights",
      "Serengeti & Ngorongoro included",
    ],
    inclusions: budgetInclusions,
    exclusions: budgetExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arusha to Tarangire National Park",
        description: "Depart Arusha and drive to Tarangire. Full day game viewing among elephants, lions, and ancient baobab trees. Camp setup and dinner under the stars.",
        accommodation: "Tarangire Public Campsite",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/camping-tarangire.jpg",
        highlights: ["Budget-friendly camping", "Elephant encounters", "Authentic bush experience"],
        isFeatured: true,
      },
      {
        day: 2,
        title: "Tarangire to Lake Manyara",
        description: "Morning game drive, then proceed to Lake Manyara National Park. Afternoon game drive to see tree-climbing lions and flamingos.",
        accommodation: "Lake Manyara Public Campsite",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara National Park",
        image: "/images/safaris/lake-manyara-hippos.jpg",
        highlights: ["Tree-climbing lions", "Flamingo flocks", "Hippo pools"],
      },
      {
        day: 3,
        title: "Lake Manyara to Serengeti",
        description: "Drive through the highlands to the Serengeti. Visit Olduvai Gorge. Evening game drive as predators become active.",
        accommodation: "Serengeti Public Campsite",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-sunset.jpg",
        highlights: ["Olduvai Gorge history", "Evening predator activity", "Bush camping"],
        isFeatured: true,
      },
      {
        day: 4,
        title: "Full Day in Serengeti",
        description: "Full day exploring the Serengeti's diverse ecosystems. Search for the Big Five and witness the endless plains.",
        accommodation: "Serengeti Public Campsite",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-lions.jpg",
        highlights: ["Big Five search", "Endless plains", "Predator tracking"],
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro",
        description: "Morning game drive before driving to Ngorongoro Conservation Area. Afternoon cultural visit or crater rim walk.",
        accommodation: "Simba Campsite, Ngorongoro",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/simba-campsite.jpg",
        highlights: ["Crater rim camping", "Cultural experience", "Star-filled nights"],
      },
      {
        day: 6,
        title: "Ngorongoro Crater - Departure",
        description: "Early morning crater descent for game drive. Return to Arusha in the afternoon.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-crater.jpg",
        highlights: ["Crater floor wildlife", "Big Five sightings", "UNESCO heritage"],
        isFeatured: true,
      },
    ],
  },

  // 7. 7 Days Tented Camp Safari
  {
    slug: "7-days-tanzania-tented-camp-safari",
    overview: `Experience the magic of Tanzania's wilderness from the comfort of luxury tented camps. This 7-day safari combines exceptional wildlife viewing with the romance of classic African safari camping.

Stay in permanent tented camps with proper beds, en-suite bathrooms, and all modern amenities while being immersed in nature. Fall asleep to the sounds of the African bush and wake up to stunning sunrise views over the savannah.

From Tarangire's elephants to the Serengeti's great migration and Ngorongoro's Big Five, this safari offers the complete Tanzania experience.

Best Time: Year-round; June-October for dry season.
Accommodation: Luxury tented camps.
Start/End: Arusha.`,
    priceFrom: 2950,
    featuredImage: "/images/safaris/tented-camp-hero.jpg",
    gallery: [
      "/images/safaris/luxury-tent.jpg",
      "/images/safaris/tented-camp-view.jpg",
      "/images/safaris/camp-sundowner.jpg",
      "/images/safaris/serengeti-tented.jpg",
      "/images/safaris/ngorongoro-tent.jpg",
    ],
    highlights: [
      "Luxury tented camps",
      "En-suite facilities",
      "Classic safari experience",
      "Serengeti wildlife",
      "Ngorongoro Crater",
      "Sundowner experiences",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Welcome to Tanzania! Transfer from Kilimanjaro Airport to your Arusha accommodation. Evening briefing with your safari guide.",
        accommodation: "Arusha Planet Lodge or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/arusha-arrival.jpg",
        highlights: ["Warm welcome", "Safari briefing", "Rest and preparation"],
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        description: "Drive to Tarangire, famous for huge elephant herds and iconic baobab trees. Full day of game viewing.",
        accommodation: "Tarangire Tented Camp",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tented-camp-tarangire.jpg",
        highlights: ["Luxury tented camping", "Huge elephant herds", "Iconic baobabs"],
        isFeatured: true,
      },
      {
        day: 3,
        title: "Tarangire to Serengeti National Park",
        description: "Journey through the Ngorongoro Conservation Area to the Serengeti. Stop at Olduvai Gorge. Afternoon game drive.",
        accommodation: "Serengeti Tented Camp",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-tented.jpg",
        highlights: ["Scenic highlands drive", "Olduvai Gorge", "Serengeti arrival"],
      },
      {
        day: 4,
        title: "Full Day in Serengeti",
        description: "Explore the Serengeti from dawn to dusk. Follow the great migration, track big cats, and enjoy the endless plains.",
        accommodation: "Serengeti Tented Camp",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-migration.jpg",
        highlights: ["Great Migration", "Big cat tracking", "Dawn to dusk game drives"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Serengeti Exploration",
        description: "Continue exploring different areas of the Serengeti for varied wildlife experiences. Evening sundowner drinks.",
        accommodation: "Serengeti Tented Camp",
        meals: "Breakfast, Lunch, Dinner",
        location: "Central Serengeti",
        image: "/images/safaris/serengeti-sundowner.jpg",
        highlights: ["Varied landscapes", "Sundowner experience", "New wildlife areas"],
      },
      {
        day: 6,
        title: "Serengeti to Ngorongoro",
        description: "Final morning game drive, then drive to Ngorongoro Crater rim. Spectacular views into the crater.",
        accommodation: "Ngorongoro Tented Camp",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/ngorongoro-rim-tent.jpg",
        highlights: ["Crater rim views", "Tented comfort", "Wildlife silhouettes"],
      },
      {
        day: 7,
        title: "Ngorongoro Crater - Departure",
        description: "Descend into the crater for a half-day game drive. Return to Arusha for your departure flight.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-floor.jpg",
        highlights: ["Crater floor game drive", "Big Five finale", "Departure transfer"],
        isFeatured: true,
      },
    ],
  },

  // 8. 5 Days Luxury Safari
  {
    slug: "5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro",
    overview: `Indulge in the finest Tanzania has to offer. This 5-day luxury safari features exclusive accommodations, private game drives, and exceptional service throughout.

Stay at some of Africa's most prestigious lodges including Four Seasons Safari Lodge Serengeti and &Beyond Lake Manyara Tree Lodge. Enjoy gourmet cuisine, fine wines, and personalized attention from world-class staff.

This safari is designed for discerning travelers who appreciate the finer things in life while experiencing the raw beauty of African wilderness.

Best Time: Year-round.
Accommodation: Ultra-luxury lodges (Four Seasons, &Beyond).
Start/End: Arusha.`,
    priceFrom: 5950,
    featuredImage: "/images/safaris/luxury-safari-hero.jpg",
    gallery: [
      "/images/safaris/four-seasons-pool.jpg",
      "/images/safaris/luxury-suite.jpg",
      "/images/safaris/champagne-bush.jpg",
      "/images/safaris/hot-air-balloon.jpg",
      "/images/safaris/private-dining.jpg",
    ],
    highlights: [
      "Four Seasons Serengeti",
      "&Beyond Tree Lodge",
      "Private safari vehicle",
      "Hot air balloon option",
      "Champagne experiences",
      "Butler service",
    ],
    inclusions: luxuryInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "VIP arrival at Kilimanjaro Airport. Private transfer to luxury accommodation in Arusha. Welcome dinner with wine pairing.",
        accommodation: "The Arusha Hotel or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/luxury-arrival.jpg",
        highlights: ["VIP airport welcome", "Luxury accommodation", "Wine-paired dinner"],
      },
      {
        day: 2,
        title: "Arusha to Lake Manyara",
        description: "Private game drive at Lake Manyara. Seek out tree-climbing lions and flocks of flamingos. Sundowner drinks at the lodge.",
        accommodation: "&Beyond Lake Manyara Tree Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Lake Manyara National Park",
        image: "/images/safaris/lake-manyara-treehouse.jpg",
        highlights: ["Tree Lodge experience", "Private game drive", "Sundowner drinks"],
        isFeatured: true,
      },
      {
        day: 3,
        title: "Lake Manyara to Serengeti",
        description: "Scenic flight to the Serengeti (optional) or private drive. Afternoon game drive following the Big Five.",
        accommodation: "Four Seasons Safari Lodge Serengeti or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/four-seasons-serengeti.jpg",
        highlights: ["Optional scenic flight", "Four Seasons luxury", "Big Five tracking"],
        isFeatured: true,
      },
      {
        day: 4,
        title: "Full Day in Serengeti",
        description: "Private full-day safari with exclusive picnic lunch on the plains. Hot air balloon safari optional (additional cost).",
        accommodation: "Four Seasons Safari Lodge Serengeti or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/hot-air-balloon.jpg",
        highlights: ["Hot air balloon option", "Exclusive picnic lunch", "Private safari vehicle"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro - Departure",
        description: "Fly or drive to Ngorongoro for a private crater tour. Champagne lunch in the crater. Transfer to Arusha/Kilimanjaro Airport.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/champagne-crater.jpg",
        highlights: ["Champagne crater lunch", "Private crater tour", "VIP departure"],
        isFeatured: true,
      },
    ],
  },

  // 9. 3 Days Budget Camping Safari
  {
    slug: "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater",
    overview: `The most affordable way to experience Tanzania's incredible wildlife. This 3-day budget camping safari covers the essential highlights while keeping costs low through public campsite accommodation.

Perfect for backpackers and budget-conscious travelers who don't want to miss out on safari experiences. You'll visit Tarangire, Lake Manyara, and the Ngorongoro Crater while camping under African skies.

All meals are freshly prepared by your camp cook, and you'll travel in a comfortable 4x4 safari vehicle with pop-up roof for game viewing.

Best Time: Year-round.
Accommodation: Public campsites.
Start/End: Arusha.`,
    priceFrom: 750,
    featuredImage: "/images/safaris/budget-camping-hero.jpg",
    gallery: [
      "/images/safaris/camping-setup.jpg",
      "/images/safaris/budget-safari-vehicle.jpg",
      "/images/safaris/campfire.jpg",
      "/images/safaris/camp-breakfast.jpg",
    ],
    highlights: [
      "Most affordable option",
      "Three parks in three days",
      "Authentic camping",
      "Camp-cooked meals",
      "Ngorongoro included",
      "Perfect for backpackers",
    ],
    inclusions: budgetInclusions,
    exclusions: budgetExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arusha to Tarangire & Lake Manyara",
        description: "Morning game drive in Tarangire among elephants. Afternoon at Lake Manyara seeing tree-climbing lions and flamingos.",
        accommodation: "Lake Manyara Public Campsite",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire & Lake Manyara",
        image: "/images/safaris/budget-camping.jpg",
        highlights: ["Two parks in one day", "Elephant encounters", "Budget camping"],
        isFeatured: true,
      },
      {
        day: 2,
        title: "Lake Manyara to Ngorongoro",
        description: "Drive to Ngorongoro Conservation Area. Afternoon visit to a Maasai village or crater rim walk.",
        accommodation: "Simba Campsite, Ngorongoro",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/maasai-cultural.jpg",
        highlights: ["Maasai village visit", "Crater rim walk", "Authentic camping"],
      },
      {
        day: 3,
        title: "Ngorongoro Crater - Departure",
        description: "Early morning crater descent. Half-day game drive seeking rhinos and lions. Return to Arusha.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Ngorongoro Crater",
        image: "/images/safaris/ngorongoro-rhino.jpg",
        highlights: ["Black rhino search", "Crater wildlife", "Big Five opportunity"],
        isFeatured: true,
      },
    ],
  },

  // 10. 6 Days Safari to Tarangire, Ngorongoro & Serengeti
  {
    slug: "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north",
    overview: `A comprehensive 6-day safari covering both central and northern Serengeti regions. This itinerary is specially designed to maximize wildlife encounters across Tanzania's most prolific parks.

Starting with Tarangire's elephants, descending into Ngorongoro Crater, and then spending quality time in both central and northern Serengeti, this safari offers diverse landscapes and wildlife experiences.

The northern extension brings you closer to the Kenya border and the famous Mara River crossing points during migration season.

Best Time: Year-round; June-October for migration.
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 2750,
    featuredImage: "/images/safaris/6-day-serengeti-hero.jpg",
    gallery: [
      "/images/safaris/tarangire-safari.jpg",
      "/images/safaris/ngorongoro-panorama.jpg",
      "/images/safaris/central-serengeti.jpg",
      "/images/safaris/northern-serengeti.jpg",
      "/images/safaris/mara-river.jpg",
    ],
    highlights: [
      "Central & Northern Serengeti",
      "Ngorongoro Crater",
      "Tarangire elephants",
      "Extended Serengeti time",
      "Migration routes",
      "Diverse ecosystems",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro Airport. Transfer to Arusha for overnight and safari briefing.",
        accommodation: "Arusha Coffee Lodge or similar",
        meals: "Dinner",
        location: "Arusha",
        image: "/images/safaris/arusha-lodge.jpg",
        highlights: ["Airport transfer", "Safari briefing", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Arusha to Tarangire",
        description: "Full day game drive in Tarangire National Park. Large elephant herds and baobab trees create iconic African scenes.",
        accommodation: "Tarangire Sopa Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Tarangire National Park",
        image: "/images/safaris/tarangire-elephants.jpg",
        highlights: ["Large elephant herds", "Iconic baobabs", "Full day game drive"],
        isFeatured: true,
      },
      {
        day: 3,
        title: "Tarangire to Ngorongoro",
        description: "Drive to Ngorongoro Conservation Area. Afternoon crater rim walk and sunset views.",
        accommodation: "Ngorongoro Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Ngorongoro Conservation Area",
        image: "/images/safaris/ngorongoro-sunset.jpg",
        highlights: ["Crater rim walk", "Spectacular sunsets", "Luxury lodge"],
      },
      {
        day: 4,
        title: "Ngorongoro to Serengeti",
        description: "Early crater descent for game drive. Picnic lunch in the crater. Continue to Serengeti via Olduvai Gorge.",
        accommodation: "Serengeti Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/ngorongoro-floor.jpg",
        highlights: ["Crater floor game drive", "Olduvai Gorge", "Serengeti arrival"],
        isFeatured: true,
      },
      {
        day: 5,
        title: "Full Day in Serengeti",
        description: "Full day exploring the Serengeti's central and northern areas. Search for migration herds and big cats.",
        accommodation: "Serengeti Serena Safari Lodge or similar",
        meals: "Breakfast, Lunch, Dinner",
        location: "Serengeti National Park",
        image: "/images/safaris/serengeti-cats.jpg",
        highlights: ["Migration herds", "Big cat territory", "Central & northern areas"],
        isFeatured: true,
      },
      {
        day: 6,
        title: "Serengeti to Arusha - Departure",
        description: "Morning game drive before flying or driving back to Arusha. Transfer to airport.",
        accommodation: "End of safari",
        meals: "Breakfast, Lunch",
        location: "Serengeti to Arusha",
        image: "/images/safaris/serengeti-sunrise.jpg",
        highlights: ["Final game drive", "Flight option", "Airport transfer"],
      },
    ],
  },

  // 11. 8 Days Wonders of Tanzania
  {
    slug: "8-days-wonders-of-tanzania-safari",
    overview: `Discover all the wonders of Tanzania on this comprehensive 8-day safari. From the elephant paradise of Tarangire to the tree-climbing lions of Lake Manyara, from the endless Serengeti plains to the Northern Serengeti's migration crossings, and finally to the wildlife-packed Ngorongoro Crater.

This safari provides extended time in each destination, allowing for in-depth wildlife observation and photography opportunities. The northern Serengeti extension brings you closer to the famous Mara River.

Ideal for wildlife enthusiasts who want a thorough exploration of Tanzania's Northern Circuit.

Best Time: Year-round; June-October for migration crossings.
Accommodation: Mid-range to luxury lodges.
Start/End: Arusha.`,
    priceFrom: 3650,
    featuredImage: "/images/safaris/8-day-wonders-hero.jpg",
    gallery: [
      "/images/safaris/tarangire-landscape.jpg",
      "/images/safaris/lake-manyara-birds.jpg",
      "/images/safaris/serengeti-kopje.jpg",
      "/images/safaris/northern-serengeti.jpg",
      "/images/safaris/ngorongoro-panorama.jpg",
    ],
    highlights: [
      "All major parks",
      "Northern Serengeti",
      "8 days of wildlife",
      "Maasai culture",
      "Mara River area",
      "Complete Tanzania experience",
    ],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Welcome to Tanzania! Transfer from airport to hotel. Evening safari briefing.", accommodation: "Mount Meru Hotel or similar", meals: "Dinner", location: "Arusha", image: "/images/safaris/mount-meru-hotel.jpg", highlights: ["Warm welcome", "Safari briefing", "Mount Meru views"] },
      { day: 2, title: "Arusha to Tarangire", description: "Drive to Tarangire. Full day game viewing among elephant herds and ancient baobabs.", accommodation: "Tarangire Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Tarangire National Park", image: "/images/safaris/tarangire-elephants.jpg", highlights: ["Massive elephant herds", "Ancient baobab trees", "Full day game drive"], isFeatured: true },
      { day: 3, title: "Tarangire to Lake Manyara", description: "Morning game drive, then transfer to Lake Manyara. Afternoon game drive to see tree-climbing lions.", accommodation: "Lake Manyara Serena Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Lake Manyara National Park", image: "/images/safaris/lake-manyara-lions.jpg", highlights: ["Tree-climbing lions", "Flamingo colonies", "Diverse habitats"] },
      { day: 4, title: "Lake Manyara to Serengeti", description: "Cross the Ngorongoro Highlands. Visit Olduvai Gorge. Enter the Serengeti for evening game drive.", accommodation: "Serengeti Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/olduvai-gorge.jpg", highlights: ["Olduvai Gorge history", "Highland scenery", "Serengeti arrival"], isFeatured: true },
      { day: 5, title: "Full Day in Central Serengeti", description: "Explore Seronera Valley, the heart of the Serengeti. Prime predator territory with river crossings.", accommodation: "Serengeti Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Central Serengeti", image: "/images/safaris/seronera-valley.jpg", highlights: ["Seronera Valley predators", "River crossings", "Heart of Serengeti"], isFeatured: true },
      { day: 6, title: "Northern Serengeti Extension", description: "Drive to northern Serengeti. Visit Mara River area during migration season. Remote wilderness experience.", accommodation: "Serengeti Migration Camp or similar", meals: "Breakfast, Lunch, Dinner", location: "Northern Serengeti", image: "/images/safaris/mara-river.jpg", highlights: ["Mara River drama", "Migration season", "Remote wilderness"], isFeatured: true },
      { day: 7, title: "Serengeti to Ngorongoro", description: "Final Serengeti game drive before heading to Ngorongoro. Maasai cultural visit.", accommodation: "Ngorongoro Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/maasai-village.jpg", highlights: ["Final Serengeti safari", "Maasai culture", "Crater rim views"] },
      { day: 8, title: "Ngorongoro Crater - Departure", description: "Descend into the crater for game viewing. Return to Arusha for departure.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Ngorongoro Crater", image: "/images/safaris/ngorongoro-floor.jpg", highlights: ["Crater floor game drive", "Big Five opportunity", "Farewell Tanzania"], isFeatured: true },
    ],
  },

  // 12. 4 Days Safari to Ngorongoro and Serengeti
  {
    slug: "4-days-safari-to-ngorongoro-and-serengeti",
    overview: `Focus on Tanzania's two most iconic destinations - the Ngorongoro Crater and the Serengeti. This 4-day safari maximizes time in these world-renowned parks.

Descend into the Ngorongoro Crater, a UNESCO World Heritage Site with the highest concentration of wildlife in Africa. Then explore the endless plains of the Serengeti, tracking big cats and witnessing the great migration herds.

Perfect for travelers who want to experience the best of Tanzania without the extended itinerary.

Best Time: Year-round.
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 1750,
    featuredImage: "/images/safaris/4-day-ngorongoro-serengeti-hero.jpg",
    gallery: ["/images/safaris/ngorongoro-crater.jpg", "/images/safaris/serengeti-lions.jpg", "/images/safaris/olduvai-gorge.jpg", "/images/safaris/serengeti-sunset.jpg"],
    highlights: ["Two iconic destinations", "Ngorongoro Crater Big Five", "Serengeti endless plains", "Olduvai Gorge visit", "Quality time in each park", "Great for first-timers"],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { day: 1, title: "Arusha to Ngorongoro", description: "Drive to Ngorongoro Conservation Area. Afternoon visit to Maasai village. Sunset views of the crater.", accommodation: "Ngorongoro Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/ngorongoro-sunset.jpg", highlights: ["Maasai village visit", "Crater sunset views", "Cultural immersion"] },
      { day: 2, title: "Ngorongoro to Serengeti", description: "Early descent into Ngorongoro Crater for game drive. Picnic lunch. Continue to Serengeti via Olduvai Gorge.", accommodation: "Serengeti Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/ngorongoro-descent.jpg", highlights: ["Crater game drive", "Olduvai Gorge museum", "Serengeti plains"], isFeatured: true },
      { day: 3, title: "Full Day in Serengeti", description: "Full day game drives following predators, migration herds, and the endless plains.", accommodation: "Serengeti Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/serengeti-cheetah.jpg", highlights: ["Predator tracking", "Migration herds", "Endless plains"], isFeatured: true },
      { day: 4, title: "Serengeti to Arusha - Departure", description: "Morning game drive. Drive or fly back to Arusha. Transfer to airport.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Serengeti to Arusha", image: "/images/safaris/serengeti-sunrise.jpg", highlights: ["Final game drive", "Flight option available", "Airport transfer"] },
    ],
  },

  // 13. 2 Days Lodge Safari
  {
    slug: "2-days-tanzania-lodge-safari",
    overview: `The shortest safari option with quality lodge accommodation. This 2-day safari visits Lake Manyara and the Ngorongoro Crater, providing an excellent wildlife experience for travelers with very limited time.

Perfect as an add-on to a Kilimanjaro climb, a Zanzibar beach holiday, or a business trip.

Best Time: Year-round.
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 750,
    featuredImage: "/images/safaris/2-day-lodge-hero.jpg",
    gallery: ["/images/safaris/lake-manyara-game-drive.jpg", "/images/safaris/ngorongoro-crater.jpg", "/images/safaris/lodge-room.jpg"],
    highlights: ["Shortest safari option", "Lodge accommodation", "Two parks in two days", "Big Five possible", "Perfect add-on", "Ngorongoro included"],
    inclusions: commonInclusions,
    exclusions: commonExclusions,
    itinerary: [
      { day: 1, title: "Arusha to Lake Manyara", description: "Drive to Lake Manyara National Park. Full day game drive to see tree-climbing lions, elephants, giraffes, and pink flamingos.", accommodation: "Lake Manyara Serena Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Lake Manyara National Park", image: "/images/safaris/lake-manyara-game-drive.jpg", highlights: ["Tree-climbing lions", "Pink flamingos", "Elephants and giraffes"], isFeatured: true },
      { day: 2, title: "Lake Manyara to Ngorongoro - Departure", description: "Drive to Ngorongoro Crater. Descend into the crater for a half-day game drive seeking rhinos, lions, and elephants. Return to Arusha.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Ngorongoro Crater", image: "/images/safaris/ngorongoro-crater.jpg", highlights: ["Crater floor wildlife", "Black rhino sightings", "Big Five opportunity"], isFeatured: true },
    ],
  },

  // 14. 5 Days Budget Camping Safari
  {
    slug: "5-days-4-nights-budget-camping-safari-lake-manyara-serengeti-and-ngorongoro",
    overview: `A 5-day budget camping safari that includes the Serengeti! This affordable option takes you through Lake Manyara, the Serengeti, and Ngorongoro Crater while camping under the stars.

Experience authentic bush camping, freshly prepared meals by your camp cook, and incredible wildlife encounters - all at a fraction of the cost of lodge safaris.

Best Time: Year-round.
Accommodation: Public campsites.
Start/End: Arusha.`,
    priceFrom: 1250,
    featuredImage: "/images/safaris/5-day-camping-hero.jpg",
    gallery: ["/images/safaris/serengeti-camping.jpg", "/images/safaris/campfire-cooking.jpg", "/images/safaris/camping-wildlife.jpg", "/images/safaris/simba-campsite.jpg"],
    highlights: ["Serengeti included", "Budget-friendly", "Authentic camping", "Full Serengeti day", "Ngorongoro Crater", "Great value"],
    inclusions: budgetInclusions,
    exclusions: budgetExclusions,
    itinerary: [
      { day: 1, title: "Arusha to Lake Manyara", description: "Depart Arusha for Lake Manyara National Park. Afternoon game drive among tree-climbing lions and flamingos.", accommodation: "Lake Manyara Public Campsite", meals: "Breakfast, Lunch, Dinner", location: "Lake Manyara National Park", image: "/images/safaris/lake-manyara-camping.jpg", highlights: ["Budget camping adventure", "Tree-climbing lions", "Flamingo flocks"] },
      { day: 2, title: "Lake Manyara to Serengeti", description: "Drive to Serengeti through Ngorongoro. Visit Olduvai Gorge. Evening game drive on the plains.", accommodation: "Serengeti Public Campsite", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/serengeti-camping.jpg", highlights: ["Olduvai Gorge", "Evening game drive", "Bush camping"], isFeatured: true },
      { day: 3, title: "Full Day in Serengeti", description: "Full day exploring the Serengeti. Track big cats, elephants, and witness the endless herds.", accommodation: "Serengeti Public Campsite", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/serengeti-wildlife.jpg", highlights: ["Big cat tracking", "Elephant herds", "Endless plains"], isFeatured: true },
      { day: 4, title: "Serengeti to Ngorongoro", description: "Morning game drive. Drive to Ngorongoro Conservation Area for overnight at crater rim.", accommodation: "Simba Campsite, Ngorongoro", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/simba-campsite.jpg", highlights: ["Crater rim camping", "Stargazing", "Wildlife sounds"] },
      { day: 5, title: "Ngorongoro Crater - Departure", description: "Early descent into the crater. Game drive seeking all Big Five. Return to Arusha.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Ngorongoro Crater", image: "/images/safaris/ngorongoro-floor.jpg", highlights: ["All Big Five possible", "Crater floor game drive", "Amazing value"], isFeatured: true },
    ],
  },

  // 15. Walking Safari
  {
    slug: "walking-safari-trekking-on-ngorongoro",
    overview: `Experience wildlife on foot with this unique walking safari in the Ngorongoro Conservation Area. Unlike traditional vehicle safaris, walking safaris bring you closer to nature.

Walk with armed rangers and Maasai guides through the crater floor, experiencing wildlife encounters in a completely different way. Trek to the rarely visited Empakaai Crater with its flamingo-filled lake.

Best Time: June to October (dry season best for walking).
Accommodation: Mid-range lodges.
Start/End: Arusha.`,
    priceFrom: 1350,
    featuredImage: "/images/safaris/walking-safari-hero.jpg",
    gallery: ["/images/safaris/walking-safari.jpg", "/images/safaris/empakaai-crater.jpg", "/images/safaris/maasai-guide.jpg", "/images/safaris/lengai-view.jpg"],
    highlights: ["Walk among wildlife", "Maasai guides", "Empakaai Crater trek", "Ol Doinyo Lengai views", "Off-beaten-path", "Unique experience"],
    inclusions: [...commonInclusions, "Armed ranger escort", "Maasai walking guides", "Walking safari permits"],
    exclusions: commonExclusions,
    itinerary: [
      { day: 1, title: "Arusha to Ngorongoro", description: "Drive to Ngorongoro Conservation Area. Afternoon orientation walk on the crater rim with armed ranger.", accommodation: "Ngorongoro Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/ngorongoro-rim-walk.jpg", highlights: ["Crater rim walking", "Armed ranger escort", "Caldera views"] },
      { day: 2, title: "Crater Floor Walking Safari", description: "Descend into the crater for a unique walking safari with Maasai guides and armed rangers. Walk among zebras, wildebeest, and if lucky, rhinos.", accommodation: "Ngorongoro Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Crater", image: "/images/safaris/walking-safari.jpg", highlights: ["Walking among wildlife", "Maasai guides", "Unique crater experience"], isFeatured: true },
      { day: 3, title: "Empakaai Crater Trek - Departure", description: "Drive to Empakaai Crater. Trek down to the crater lake filled with flamingos. Stunning views of Ol Doinyo Lengai. Return to Arusha.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Empakaai Crater", image: "/images/safaris/empakaai-crater.jpg", highlights: ["Empakaai flamingos", "Ol Doinyo Lengai views", "Off-beaten-path trek"], isFeatured: true },
    ],
  },

  // 16. 7 Days Serval Wildlife Safari
  {
    slug: "7-days-safari-to-tanzania-serval-wildlife",
    overview: `A specialized safari for wildlife enthusiasts seeking rare and elusive species. This 7-day itinerary focuses on finding servals, African wild cats, honey badgers, aardvarks, and other rarely seen animals alongside the Big Five.

Our expert guides are specifically trained to track nocturnal and secretive species. The itinerary includes night drives in Tarangire (where permitted).

Best Time: Year-round; dry season (June-October) best for wildlife concentration.
Accommodation: Lodges with night drive options.
Start/End: Arusha.`,
    priceFrom: 3250,
    featuredImage: "/images/safaris/serval-safari-hero.jpg",
    gallery: ["/images/safaris/serval-sighting.jpg", "/images/safaris/african-wild-cat.jpg", "/images/safaris/night-drive.jpg", "/images/safaris/honey-badger.jpg", "/images/safaris/rare-wildlife.jpg"],
    highlights: ["Serval tracking", "Night game drives", "Rare species focus", "Expert naturalist guides", "African wild dog search", "Specialized itinerary"],
    inclusions: [...commonInclusions, "Specialist wildlife guide", "Night drive permits", "Spotlight equipment"],
    exclusions: commonExclusions,
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Arrive at Kilimanjaro Airport. Transfer to Arusha. Safari briefing focusing on rare wildlife sightings.", accommodation: "The African Tulip Hotel or similar", meals: "Dinner", location: "Arusha", image: "/images/safaris/african-tulip.jpg", highlights: ["Specialist briefing", "Rare wildlife focus", "Expert guides"] },
      { day: 2, title: "Arusha to Tarangire", description: "Drive to Tarangire. Specialized game drive seeking servals, African wild cats, and rare antelope species.", accommodation: "Tarangire Treetops or similar", meals: "Breakfast, Lunch, Dinner", location: "Tarangire National Park", image: "/images/safaris/tarangire-serval.jpg", highlights: ["Serval sightings", "African wild cats", "Rare antelope"], isFeatured: true },
      { day: 3, title: "Tarangire Full Day with Night Drive", description: "Full day exploring Tarangire's varied habitats. Night drive to spot nocturnal predators including servals.", accommodation: "Tarangire Treetops or similar", meals: "Breakfast, Lunch, Dinner", location: "Tarangire National Park", image: "/images/safaris/night-drive.jpg", highlights: ["Night game drive", "Nocturnal predators", "Unique experience"], isFeatured: true },
      { day: 4, title: "Tarangire to Serengeti", description: "Drive to Serengeti. Focus on finding rare species like aardvark, honey badger, and African wild dog.", accommodation: "Serengeti Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/wild-dog.jpg", highlights: ["African wild dog search", "Honey badger", "Rare sightings"] },
      { day: 5, title: "Serengeti - Specialized Wildlife", description: "Expert-guided game drives focusing on predator behavior and rare wildlife. Early morning and late evening drives.", accommodation: "Serengeti Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/predator-behavior.jpg", highlights: ["Predator behavior study", "Dawn and dusk drives", "Expert naturalist"], isFeatured: true },
      { day: 6, title: "Serengeti to Ngorongoro", description: "Morning game drive. Drive to Ngorongoro. Crater rim walk at dusk seeking spotted hyenas.", accommodation: "Ngorongoro Serena Safari Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/spotted-hyena.jpg", highlights: ["Spotted hyena tracking", "Dusk rim walk", "Unique behaviors"] },
      { day: 7, title: "Ngorongoro Crater - Departure", description: "Dawn crater descent. Last chance for black rhino and golden jackal sightings. Return to Arusha.", accommodation: "End of safari", meals: "Breakfast, Lunch", location: "Ngorongoro Crater", image: "/images/safaris/black-rhino.jpg", highlights: ["Black rhino sightings", "Golden jackal", "Wildlife specialist finale"], isFeatured: true },
    ],
  },

  // 17. 10 Day Safari & Zanzibar
  {
    slug: "10-day-adventure-in-tanzania-safari-zanzibar",
    overview: `The ultimate Tanzania adventure combining world-class wildlife safari with the pristine beaches of Zanzibar. This 10-day journey starts with the best of the Northern Circuit safari parks and concludes with relaxation on the white sand beaches of the Spice Island.

Experience elephant herds in Tarangire, big cats in the Serengeti, the Big Five in Ngorongoro Crater, then fly to Zanzibar for beach relaxation, Stone Town exploration, and spice tours.

Best Time: Year-round; June-October for safari, avoid April-May for Zanzibar.
Accommodation: Mid-range safari lodges + beach resort.
Start: Arusha / End: Zanzibar.`,
    priceFrom: 4250,
    featuredImage: "/images/safaris/safari-zanzibar-hero.jpg",
    gallery: ["/images/safaris/serengeti-safari.jpg", "/images/safaris/ngorongoro-crater.jpg", "/images/safaris/zanzibar-beach.jpg", "/images/safaris/stone-town.jpg", "/images/safaris/spice-tour.jpg", "/images/safaris/zanzibar-snorkeling.jpg"],
    highlights: ["Safari & beach combo", "Serengeti Big Five", "Ngorongoro Crater", "Zanzibar beaches", "Stone Town UNESCO", "Spice tour", "Water sports"],
    inclusions: [...commonInclusions, "Domestic flight Arusha to Zanzibar", "Zanzibar transfers", "Stone Town tour", "Spice tour"],
    exclusions: [...commonExclusions, "Water sports and activities in Zanzibar", "Additional Zanzibar excursions"],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Welcome to Tanzania! Transfer from Kilimanjaro Airport to your Arusha hotel. Rest and safari briefing.", accommodation: "Mount Meru Hotel or similar", meals: "Dinner", location: "Arusha", image: "/images/safaris/arusha-welcome.jpg", highlights: ["Tanzania welcome", "Safari briefing", "Mount Meru views"] },
      { day: 2, title: "Arusha to Tarangire", description: "Drive to Tarangire National Park. Game drive among giant elephants and ancient baobab trees.", accommodation: "Tarangire Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Tarangire National Park", image: "/images/safaris/tarangire-elephants.jpg", highlights: ["Giant elephants", "Ancient baobabs", "Incredible birdlife"], isFeatured: true },
      { day: 3, title: "Tarangire to Serengeti", description: "Journey to the Serengeti via Ngorongoro highlands and Olduvai Gorge. Afternoon game drive.", accommodation: "Serengeti Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/olduvai-gorge.jpg", highlights: ["Olduvai Gorge history", "Highland scenery", "Serengeti plains"] },
      { day: 4, title: "Full Day in Serengeti", description: "Full day exploring the endless plains. Follow migration herds and big cats.", accommodation: "Serengeti Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Serengeti National Park", image: "/images/safaris/serengeti-migration.jpg", highlights: ["Migration herds", "Big cat tracking", "Endless plains"], isFeatured: true },
      { day: 5, title: "Serengeti to Ngorongoro", description: "Morning game drive. Transfer to Ngorongoro for sunset views over the crater.", accommodation: "Ngorongoro Sopa Lodge or similar", meals: "Breakfast, Lunch, Dinner", location: "Ngorongoro Conservation Area", image: "/images/safaris/ngorongoro-sunset.jpg", highlights: ["Final Serengeti drive", "Crater sunset", "Spectacular views"] },
      { day: 6, title: "Ngorongoro to Zanzibar", description: "Early crater descent for game drive. Drive to Arusha and fly to Zanzibar. Beach relaxation.", accommodation: "Zanzibar Beach Resort or similar", meals: "Breakfast, Lunch, Dinner", location: "Zanzibar", image: "/images/safaris/zanzibar-arrival.jpg", highlights: ["Crater game drive", "Flight to Zanzibar", "Beach paradise awaits"], isFeatured: true },
      { day: 7, title: "Zanzibar - Beach & Spice Tour", description: "Morning spice tour in the plantations. Afternoon at leisure on pristine beaches.", accommodation: "Zanzibar Beach Resort or similar", meals: "Breakfast, Dinner", location: "Zanzibar", image: "/images/safaris/zanzibar-spice-tour.jpg", highlights: ["Famous spice tour", "Pristine beaches", "Island relaxation"] },
      { day: 8, title: "Zanzibar - Stone Town", description: "Tour UNESCO World Heritage Stone Town. Visit the old slave market, Sultan's Palace, and labyrinthine streets.", accommodation: "Zanzibar Beach Resort or similar", meals: "Breakfast, Dinner", location: "Zanzibar", image: "/images/safaris/stone-town.jpg", highlights: ["UNESCO World Heritage", "Historic architecture", "Cultural immersion"], isFeatured: true },
      { day: 9, title: "Zanzibar - Beach Day", description: "Full day at leisure. Optional water sports, dolphin tour, or snorkeling at Mnemba Atoll.", accommodation: "Zanzibar Beach Resort or similar", meals: "Breakfast, Dinner", location: "Zanzibar", image: "/images/safaris/zanzibar-beach.jpg", highlights: ["Mnemba snorkeling", "Dolphin tours", "Water sports"] },
      { day: 10, title: "Zanzibar - Departure", description: "Morning at leisure. Transfer to Zanzibar airport for departure flight.", accommodation: "End of trip", meals: "Breakfast", location: "Zanzibar", image: "/images/safaris/zanzibar-farewell.jpg", highlights: ["Final beach time", "Island memories", "Safari & beach complete"] },
    ],
  },
];

// Main seeding function
async function seedSafariDetails() {
  console.log("🦁 Seeding Safari Package Details...\n");
  console.log("=".repeat(60));

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const data of safariData) {
    try {
      const safari = await prisma.safariPackage.findFirst({
        where: { slug: data.slug },
      });

      if (safari) {
        await prisma.safariPackage.update({
          where: { id: safari.id },
          data: {
            overview: data.overview,
            priceFrom: data.priceFrom,
            featuredImage: data.featuredImage,
            gallery: data.gallery,
            highlights: data.highlights,
            inclusions: data.inclusions,
            exclusions: data.exclusions,
            itinerary: data.itinerary,
          },
        });
        console.log(`✅ Updated: ${safari.title}`);
        updated++;
      } else {
        console.log(`⚠️ Not found: ${data.slug}`);
        notFound++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${data.slug}:`, error);
      errors++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️ Not found: ${notFound}`);
  console.log(`❌ Errors: ${errors}`);
  console.log("Safari details seeding complete!");
}

// Run the seeding
seedSafariDetails()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
