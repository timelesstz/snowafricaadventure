/**
 * Enhanced WordPress Migration Script
 * Uses REST API + manual content mapping for Elementor sites
 *
 * Usage: npx tsx scripts/migration/migrate-enhanced.ts [--dry-run]
 */

import "dotenv/config";
import prisma from "../../src/lib/prisma";

const WP_API = "https://snowafricaadventure.com/wp-json/wp/v2";
const DELAY_MS = 500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Pre-defined route data (extracted from WordPress with manual review)
const ROUTES_DATA = [
  {
    slug: "7-days-machame-route",
    title: "7-Day Machame Route",
    duration: "7 Days",
    durationDays: 7,
    physicalRating: "Challenging",
    successRate: 93,
    startPoint: "Machame Gate (1,800m)",
    endPoint: "Mweka Gate (1,640m)",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "The Machame Route, known as the 'Whiskey Route', is the most popular path to Kilimanjaro's summit. This 7-day itinerary offers excellent acclimatization through the 'climb high, sleep low' approach, traversing diverse ecosystems from rainforest to alpine desert.",
    highlights: [
      "Most scenic route on Kilimanjaro",
      "93% summit success rate",
      "Excellent acclimatization profile",
      "Diverse landscapes and vegetation zones",
      "Spectacular views of Kibo and Mawenzi peaks",
    ],
    inclusions: [
      "Park entrance fees and rescue fees",
      "Professional English-speaking mountain guide",
      "Assistant guides and porters (3:1 ratio)",
      "Quality camping equipment",
      "All meals on the mountain",
      "Emergency oxygen and first aid kit",
      "Airport transfers",
      "1 night hotel in Moshi (pre-trek)",
      "Climbing certificate",
    ],
    exclusions: [
      "International flights",
      "Travel insurance (required)",
      "Visa fees",
      "Tips for guides and porters",
      "Personal hiking gear",
      "Items of personal nature",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Arrive at Kilimanjaro International Airport. Transfer to hotel for briefing and gear check.", elevation: "1,400m" },
      { day: 2, title: "Machame Gate to Machame Camp", description: "Drive to Machame Gate. Trek through rainforest to Machame Camp.", elevation: "1,800m - 3,000m", distance: "11km" },
      { day: 3, title: "Machame Camp to Shira Camp", description: "Ascend through moorland with views of Shira Plateau.", elevation: "3,000m - 3,840m", distance: "5km" },
      { day: 4, title: "Shira Camp to Barranco Camp", description: "Climb to Lava Tower for acclimatization, descend to Barranco.", elevation: "3,840m - 3,950m", distance: "10km" },
      { day: 5, title: "Barranco Camp to Karanga Camp", description: "Scale the famous Barranco Wall, continue to Karanga Camp.", elevation: "3,950m - 4,200m", distance: "5km" },
      { day: 6, title: "Karanga Camp to Barafu Camp", description: "Trek to high camp. Rest and prepare for summit night.", elevation: "4,200m - 4,673m", distance: "4km" },
      { day: 7, title: "Summit Day - Uhuru Peak", description: "Midnight start. Reach Uhuru Peak at sunrise. Descend to Mweka Camp.", elevation: "4,673m - 5,895m - 3,100m", distance: "17km" },
    ],
    faqs: [
      { question: "What is the success rate?", answer: "The 7-day Machame Route has a 93% success rate due to excellent acclimatization." },
      { question: "How difficult is it?", answer: "Rated challenging due to steep sections and the Barranco Wall. No technical climbing required." },
      { question: "Best time to climb?", answer: "January-March and June-October during dry seasons. We offer year-round climbs." },
    ],
  },
  {
    slug: "6-days-machame-route",
    title: "6-Day Machame Route",
    duration: "6 Days",
    durationDays: 6,
    physicalRating: "Challenging",
    successRate: 85,
    startPoint: "Machame Gate (1,800m)",
    endPoint: "Mweka Gate (1,640m)",
    maxPeople: 10,
    ageRange: "18 - 65",
    overview: "A faster version of the classic Machame Route for experienced trekkers. This 6-day itinerary follows the same scenic path but with less acclimatization time.",
    highlights: [
      "Popular scenic route",
      "Diverse landscapes",
      "Barranco Wall scramble",
      "Good for fit trekkers",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional guides and porters",
      "Camping equipment",
      "All meals on mountain",
      "Airport transfers",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal gear",
      "Tips for crew",
    ],
    itinerary: [
      { day: 1, title: "Machame Gate to Machame Camp", description: "Trek through rainforest.", elevation: "1,800m - 3,000m" },
      { day: 2, title: "Machame Camp to Shira Camp", description: "Ascend through moorland.", elevation: "3,000m - 3,840m" },
      { day: 3, title: "Shira Camp to Barranco Camp", description: "Via Lava Tower for acclimatization.", elevation: "3,840m - 3,950m" },
      { day: 4, title: "Barranco Camp to Barafu Camp", description: "Scale Barranco Wall, trek to high camp.", elevation: "3,950m - 4,673m" },
      { day: 5, title: "Summit Day", description: "Summit attempt and descent.", elevation: "4,673m - 5,895m - 3,100m" },
      { day: 6, title: "Mweka Camp to Gate", description: "Final descent through rainforest.", elevation: "3,100m - 1,640m" },
    ],
  },
  {
    slug: "8-days-lemosho-route",
    title: "8-Day Lemosho Route",
    duration: "8 Days",
    durationDays: 8,
    physicalRating: "Moderate-Challenging",
    successRate: 95,
    startPoint: "Londorossi Gate",
    endPoint: "Mweka Gate",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "The Lemosho Route is considered the most scenic and offers the highest success rate on Kilimanjaro. Starting from the west, you'll traverse the entire mountain through pristine wilderness with excellent acclimatization.",
    highlights: [
      "Highest success rate (95%)",
      "Most scenic wilderness route",
      "Excellent acclimatization",
      "Less crowded first days",
      "Wildlife sightings possible",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional mountain guides",
      "Porters and cook",
      "All meals on the mountain",
      "Quality camping equipment",
      "Emergency oxygen",
      "Airport transfers",
      "2 nights hotel (pre and post trek)",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal climbing gear",
      "Tips for crew",
      "Visa fees",
    ],
    itinerary: [
      { day: 1, title: "Arrival Day", description: "Arrive Kilimanjaro Airport, transfer to hotel.", elevation: "1,400m" },
      { day: 2, title: "Londorossi Gate to Mti Mkubwa", description: "Drive to gate, trek through rainforest.", elevation: "2,100m - 2,750m" },
      { day: 3, title: "Mti Mkubwa to Shira 1 Camp", description: "Ascend through heather zone to Shira Plateau.", elevation: "2,750m - 3,500m" },
      { day: 4, title: "Shira 1 to Shira 2 Camp", description: "Cross Shira Plateau with views of Kibo.", elevation: "3,500m - 3,840m" },
      { day: 5, title: "Shira 2 to Barranco Camp", description: "Via Lava Tower for acclimatization.", elevation: "3,840m - 3,950m" },
      { day: 6, title: "Barranco to Karanga Camp", description: "Scale Barranco Wall.", elevation: "3,950m - 4,200m" },
      { day: 7, title: "Karanga to Barafu Camp", description: "Trek to high camp.", elevation: "4,200m - 4,673m" },
      { day: 8, title: "Summit Day", description: "Summit and full descent.", elevation: "4,673m - 5,895m - 1,640m" },
    ],
  },
  {
    slug: "5-days-marangu-route",
    title: "5-Day Marangu Route",
    duration: "5 Days",
    durationDays: 5,
    physicalRating: "Moderate",
    successRate: 65,
    startPoint: "Marangu Gate",
    endPoint: "Marangu Gate",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "The Marangu Route, known as the 'Coca-Cola Route', is the only route with hut accommodation. This 5-day version is shorter and recommended for fit climbers.",
    highlights: [
      "Hut accommodation (beds provided)",
      "Same ascent and descent route",
      "Most gradual slopes",
      "Well-maintained trail",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional guides",
      "Hut accommodation",
      "All meals",
      "Porters for gear",
    ],
    exclusions: [
      "International flights",
      "Insurance",
      "Personal items",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate to Mandara Hut", description: "Trek through rainforest.", elevation: "1,860m - 2,700m" },
      { day: 2, title: "Mandara Hut to Horombo Hut", description: "Ascend through moorland.", elevation: "2,700m - 3,720m" },
      { day: 3, title: "Horombo Hut to Kibo Hut", description: "Cross alpine desert to high camp.", elevation: "3,720m - 4,700m" },
      { day: 4, title: "Summit Day", description: "Summit attempt via Gilman's Point to Uhuru Peak.", elevation: "4,700m - 5,895m - 3,720m" },
      { day: 5, title: "Horombo to Marangu Gate", description: "Final descent.", elevation: "3,720m - 1,860m" },
    ],
  },
  {
    slug: "6-days-marangu-route",
    title: "6-Day Marangu Route",
    duration: "6 Days",
    durationDays: 6,
    physicalRating: "Moderate",
    successRate: 80,
    startPoint: "Marangu Gate",
    endPoint: "Marangu Gate",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "Extended version of the Marangu Route with an extra acclimatization day at Horombo Hut, significantly improving summit success rates.",
    highlights: [
      "Hut accommodation",
      "Extra acclimatization day",
      "Higher success rate",
      "Comfortable sleeping arrangements",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional guides",
      "Hut accommodation",
      "All meals",
      "Porters for gear",
    ],
    exclusions: [
      "International flights",
      "Insurance",
      "Personal items",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate to Mandara Hut", description: "Trek through rainforest.", elevation: "1,860m - 2,700m" },
      { day: 2, title: "Mandara Hut to Horombo Hut", description: "Ascend through moorland.", elevation: "2,700m - 3,720m" },
      { day: 3, title: "Acclimatization Day", description: "Day hike to Mawenzi Hut and back.", elevation: "3,720m - 4,200m - 3,720m" },
      { day: 4, title: "Horombo Hut to Kibo Hut", description: "Cross alpine desert.", elevation: "3,720m - 4,700m" },
      { day: 5, title: "Summit Day", description: "Summit and descent to Horombo.", elevation: "4,700m - 5,895m - 3,720m" },
      { day: 6, title: "Horombo to Marangu Gate", description: "Final descent.", elevation: "3,720m - 1,860m" },
    ],
  },
  {
    slug: "6-days-rongai-route",
    title: "6-Day Rongai Route",
    duration: "6 Days",
    durationDays: 6,
    physicalRating: "Moderate",
    successRate: 80,
    startPoint: "Rongai Gate",
    endPoint: "Marangu Gate",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "The Rongai Route approaches Kilimanjaro from the north near the Kenyan border. It's the only route approaching from this direction, offering wilderness experience and unique views.",
    highlights: [
      "Only route from the north",
      "Less crowded",
      "Wilderness experience",
      "Gentle gradients",
      "Views of Kenya",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional guides and porters",
      "Camping equipment",
      "All meals",
      "Airport transfers",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal gear",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Rongai Gate to Simba Camp", description: "Trek through pine forest.", elevation: "1,950m - 2,600m" },
      { day: 2, title: "Simba Camp to Kikelewa Camp", description: "Through moorland with caves.", elevation: "2,600m - 3,600m" },
      { day: 3, title: "Kikelewa to Mawenzi Tarn", description: "Ascend to Mawenzi Tarn.", elevation: "3,600m - 4,330m" },
      { day: 4, title: "Mawenzi Tarn to Kibo Hut", description: "Cross saddle to high camp.", elevation: "4,330m - 4,700m" },
      { day: 5, title: "Summit Day", description: "Summit and descend to Horombo.", elevation: "4,700m - 5,895m - 3,720m" },
      { day: 6, title: "Horombo to Marangu Gate", description: "Final descent.", elevation: "3,720m - 1,860m" },
    ],
  },
  {
    slug: "7-days-rongai-route",
    title: "7-Day Rongai Route",
    duration: "7 Days",
    durationDays: 7,
    physicalRating: "Moderate",
    successRate: 85,
    startPoint: "Rongai Gate",
    endPoint: "Marangu Gate",
    maxPeople: 10,
    ageRange: "12 - 70+",
    overview: "Extended Rongai Route with additional acclimatization for better summit success. The quietest route on Kilimanjaro.",
    highlights: [
      "Extended acclimatization",
      "Quietest route",
      "Wilderness setting",
      "Views of Mawenzi peak",
    ],
    inclusions: [
      "Park entrance fees",
      "Professional guides and porters",
      "Camping equipment",
      "All meals",
      "Airport transfers",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal gear",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Rongai Gate to Simba Camp", description: "Trek through forest.", elevation: "1,950m - 2,600m" },
      { day: 2, title: "Simba Camp to Second Cave", description: "Through moorland.", elevation: "2,600m - 3,450m" },
      { day: 3, title: "Second Cave to Kikelewa Camp", description: "Ascend with acclimatization.", elevation: "3,450m - 3,600m" },
      { day: 4, title: "Kikelewa to Mawenzi Tarn", description: "Hike to Mawenzi.", elevation: "3,600m - 4,330m" },
      { day: 5, title: "Mawenzi Tarn to Kibo Hut", description: "Cross saddle.", elevation: "4,330m - 4,700m" },
      { day: 6, title: "Summit Day", description: "Summit attempt.", elevation: "4,700m - 5,895m - 3,720m" },
      { day: 7, title: "Horombo to Marangu Gate", description: "Final descent.", elevation: "3,720m - 1,860m" },
    ],
  },
  {
    slug: "6-days-umbwe-route",
    title: "6-Day Umbwe Route",
    duration: "6 Days",
    durationDays: 6,
    physicalRating: "Difficult",
    successRate: 70,
    startPoint: "Umbwe Gate",
    endPoint: "Mweka Gate",
    maxPeople: 8,
    ageRange: "18 - 60",
    overview: "The Umbwe Route is the most direct and challenging path to Kilimanjaro's summit. Recommended for experienced high-altitude trekkers seeking a physical challenge.",
    highlights: [
      "Most direct route",
      "Challenging and adventurous",
      "Less crowded",
      "Stunning forest sections",
    ],
    inclusions: [
      "Park entrance fees",
      "Expert guides and porters",
      "Camping equipment",
      "All meals",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal gear",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Umbwe Gate to Umbwe Cave", description: "Steep climb through forest.", elevation: "1,700m - 2,940m" },
      { day: 2, title: "Umbwe Cave to Barranco Camp", description: "Continue steep ascent.", elevation: "2,940m - 3,950m" },
      { day: 3, title: "Barranco to Karanga Camp", description: "Via Barranco Wall.", elevation: "3,950m - 4,200m" },
      { day: 4, title: "Karanga to Barafu Camp", description: "Trek to high camp.", elevation: "4,200m - 4,673m" },
      { day: 5, title: "Summit Day", description: "Summit and descent.", elevation: "4,673m - 5,895m - 3,100m" },
      { day: 6, title: "Mweka Camp to Gate", description: "Final descent.", elevation: "3,100m - 1,640m" },
    ],
  },
  {
    slug: "4-days-mount-meru-climbing",
    title: "4-Day Mount Meru Climb",
    duration: "4 Days",
    durationDays: 4,
    physicalRating: "Moderate-Challenging",
    successRate: 90,
    startPoint: "Momella Gate",
    endPoint: "Momella Gate",
    maxPeople: 12,
    ageRange: "12 - 70+",
    overview: "Mount Meru is Tanzania's second-highest peak and an excellent acclimatization climb before Kilimanjaro. Located in Arusha National Park with abundant wildlife.",
    highlights: [
      "Tanzania's second-highest peak",
      "Excellent Kilimanjaro preparation",
      "Wildlife encounters",
      "Stunning crater views",
    ],
    inclusions: [
      "Park entrance fees",
      "Armed ranger",
      "Mountain guides and porters",
      "Hut accommodation",
      "All meals",
    ],
    exclusions: [
      "Transport to park",
      "Travel insurance",
      "Personal gear",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Momella Gate to Miriakamba Hut", description: "Trek through forest with wildlife.", elevation: "1,500m - 2,514m" },
      { day: 2, title: "Miriakamba to Saddle Hut", description: "Ascend with crater views.", elevation: "2,514m - 3,566m" },
      { day: 3, title: "Summit Day", description: "Summit Socialist Peak and descend to Miriakamba.", elevation: "3,566m - 4,566m - 2,514m" },
      { day: 4, title: "Miriakamba to Momella Gate", description: "Final descent through forest.", elevation: "2,514m - 1,500m" },
    ],
  },
  {
    slug: "3-days-oldoinyo-lengai",
    title: "3-Day Ol Doinyo Lengai Climb",
    duration: "3 Days",
    durationDays: 3,
    physicalRating: "Challenging",
    successRate: 85,
    startPoint: "Lake Natron",
    endPoint: "Lake Natron",
    maxPeople: 8,
    ageRange: "18 - 60",
    overview: "Ol Doinyo Lengai, the 'Mountain of God' in Maasai, is an active volcano with unique carbonatite lava. Night climb to summit at sunrise.",
    highlights: [
      "Active volcano experience",
      "Unique carbonatite lava",
      "Sunrise summit",
      "Maasai cultural experience",
      "Lake Natron flamingos",
    ],
    inclusions: [
      "Professional guides",
      "Camping equipment",
      "All meals",
      "Transport from Arusha",
    ],
    exclusions: [
      "Travel insurance",
      "Personal gear",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Arusha to Lake Natron", description: "Drive through Maasai land to Lake Natron.", elevation: "Sea level - 600m" },
      { day: 2, title: "Summit Ol Doinyo Lengai", description: "Night climb starting at midnight, summit at sunrise.", elevation: "600m - 2,962m - 600m" },
      { day: 3, title: "Lake Natron to Arusha", description: "Optional waterfall visit, return to Arusha.", elevation: "600m" },
    ],
  },
];

// Pre-defined destination data (Tanzania National Parks & Reserves)
const DESTINATIONS_DATA = [
  {
    slug: "serengeti-national-park",
    name: "Serengeti National Park",
    circuit: "Northern",
    description: "The Serengeti is Tanzania's most famous national park and a UNESCO World Heritage Site. Spanning over 14,750 square kilometers, it's home to the greatest wildlife spectacle on Earth - the Great Migration, where over 2 million wildebeest, zebras, and gazelles make their annual journey across the endless plains.",
    highlights: [
      "Witness the Great Wildebeest Migration",
      "See all Big Five in their natural habitat",
      "Experience the endless Serengeti plains",
      "World-class predator sightings",
      "Hot air balloon safaris available",
    ],
    wildlife: ["Lion", "Leopard", "Elephant", "Buffalo", "Rhino", "Cheetah", "Wildebeest", "Zebra", "Giraffe", "Hippo", "Crocodile"],
    bestTime: "June to October for migration river crossings, December to March for calving season",
  },
  {
    slug: "ngorongoro-crater",
    name: "Ngorongoro Crater",
    circuit: "Northern",
    description: "The Ngorongoro Crater is the world's largest intact volcanic caldera and a UNESCO World Heritage Site. This natural wonder is home to approximately 25,000 large animals living in a 260 square kilometer crater floor, creating one of the most unique ecosystems on the planet.",
    highlights: [
      "World's largest intact volcanic caldera",
      "Home to critically endangered black rhinos",
      "See Big Five in a single day",
      "Stunning crater rim views",
      "Meet Maasai communities",
    ],
    wildlife: ["Black Rhino", "Lion", "Elephant", "Buffalo", "Leopard", "Hippo", "Flamingo", "Hyena", "Wildebeest"],
    bestTime: "Year-round, best game viewing June to September",
  },
  {
    slug: "tarangire-national-park",
    name: "Tarangire National Park",
    circuit: "Northern",
    description: "Tarangire is famous for its large elephant herds, ancient baobab trees, and the Tarangire River which attracts wildlife during the dry season. The park covers 2,850 square kilometers and offers excellent game viewing away from the crowds.",
    highlights: [
      "Largest elephant population in northern Tanzania",
      "Iconic ancient baobab trees",
      "Excellent bird watching (550+ species)",
      "Less crowded than Serengeti",
      "Night game drives available",
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Buffalo", "Giraffe", "Zebra", "Wildebeest", "Python", "Oryx"],
    bestTime: "June to October (dry season) when animals concentrate around the river",
  },
  {
    slug: "lake-manyara-national-park",
    name: "Lake Manyara National Park",
    circuit: "Northern",
    description: "Lake Manyara National Park is a compact gem in the Great Rift Valley, famous for its tree-climbing lions and large flocks of flamingos. The park stretches along the base of the Rift Valley escarpment and includes diverse habitats from dense groundwater forest to alkaline lake shore.",
    highlights: [
      "Famous tree-climbing lions",
      "Thousands of pink flamingos",
      "Dramatic Rift Valley scenery",
      "Groundwater forest ecosystem",
      "Excellent for day trips from Arusha",
    ],
    wildlife: ["Lion", "Elephant", "Buffalo", "Hippo", "Giraffe", "Baboon", "Blue Monkey", "Flamingo"],
    bestTime: "June to October for game viewing, November to June for flamingos",
  },
  {
    slug: "arusha-national-park",
    name: "Arusha National Park",
    circuit: "Northern",
    description: "Arusha National Park is a small but scenic park encompassing Mount Meru, Tanzania's second-highest mountain. Despite its compact size, the park features diverse habitats including montane forest, crater lakes, and alpine meadows. It's perfect for day trips and Mount Meru climbs.",
    highlights: [
      "Mount Meru trekking",
      "Ngurdoto Crater (mini-Ngorongoro)",
      "Momella Lakes with flamingos",
      "Walking safaris with armed ranger",
      "Close to Kilimanjaro Airport",
    ],
    wildlife: ["Buffalo", "Giraffe", "Colobus Monkey", "Blue Monkey", "Elephant", "Hippo", "Flamingo", "Waterbuck"],
    bestTime: "Year-round, June to February best for Mount Meru climbing",
  },
  {
    slug: "selous-game-reserve",
    name: "Selous Game Reserve",
    circuit: "Southern",
    description: "The Selous (now Nyerere National Park) is Africa's largest protected wildlife area, covering over 50,000 square kilometers. This UNESCO World Heritage Site offers a true wilderness experience with boat safaris on the Rufiji River and excellent walking safaris.",
    highlights: [
      "Africa's largest protected area",
      "Boat safaris on Rufiji River",
      "Walking safaris available",
      "Large population of African wild dogs",
      "Remote wilderness experience",
    ],
    wildlife: ["Lion", "Elephant", "Buffalo", "Wild Dog", "Crocodile", "Hippo", "Sable Antelope", "Giraffe"],
    bestTime: "June to October (dry season), closed mid-March to May",
  },
  {
    slug: "ruaha-national-park",
    name: "Ruaha National Park",
    circuit: "Southern",
    description: "Ruaha is Tanzania's largest national park and one of the most untouched wilderness areas in East Africa. The Great Ruaha River attracts incredible wildlife during the dry season, and the park is known for large pride of lions and significant elephant populations.",
    highlights: [
      "Tanzania's largest national park",
      "Excellent lion and elephant populations",
      "Remote and uncrowded",
      "Kudu and sable antelope",
      "Stunning baobab landscape",
    ],
    wildlife: ["Lion", "Elephant", "Leopard", "Cheetah", "Wild Dog", "Kudu", "Sable Antelope", "Hippo", "Crocodile"],
    bestTime: "June to November for best game viewing",
  },
  {
    slug: "mikumi-national-park",
    name: "Mikumi National Park",
    circuit: "Southern",
    description: "Mikumi is the fourth largest national park in Tanzania and the most accessible part of the vast Selous ecosystem. Often called 'Little Serengeti' for its open grasslands, it offers excellent wildlife viewing and is perfect for short safaris from Dar es Salaam.",
    highlights: [
      "Easy access from Dar es Salaam",
      "Open plains similar to Serengeti",
      "Good Big Five sightings",
      "Budget-friendly option",
      "Connected to Selous ecosystem",
    ],
    wildlife: ["Lion", "Elephant", "Buffalo", "Giraffe", "Zebra", "Wildebeest", "Hippo", "Wild Dog"],
    bestTime: "Year-round, best June to October during dry season",
  },
  {
    slug: "katavi-national-park",
    name: "Katavi National Park",
    circuit: "Western",
    description: "Katavi is one of Africa's most remote and pristine wilderness areas. Located in western Tanzania, this untouched park features seasonal lakes and floodplains that attract massive concentrations of hippos, crocodiles, and buffalo during the dry season.",
    highlights: [
      "Most remote park in Tanzania",
      "Massive hippo and crocodile concentrations",
      "Huge buffalo herds",
      "True wilderness experience",
      "Very few tourists",
    ],
    wildlife: ["Hippo", "Crocodile", "Buffalo", "Lion", "Leopard", "Elephant", "Topi", "Roan Antelope"],
    bestTime: "August to October when animals concentrate around shrinking water sources",
  },
  {
    slug: "mahale-mountains-national-park",
    name: "Mahale Mountains National Park",
    circuit: "Western",
    description: "Mahale Mountains is one of the world's best places to see wild chimpanzees in their natural habitat. Located on the shores of Lake Tanganyika, this remote park combines primate tracking with stunning mountain scenery and crystal-clear lake beaches.",
    highlights: [
      "World-class chimpanzee tracking",
      "Pristine Lake Tanganyika beaches",
      "Stunning mountain scenery",
      "Remote and exclusive",
      "Swimming and snorkeling in the lake",
    ],
    wildlife: ["Chimpanzee", "Red Colobus Monkey", "Bush Pig", "Bushbuck", "Blue Duiker"],
    bestTime: "May to October (dry season) for chimp tracking",
  },
  {
    slug: "gombe-stream-national-park",
    name: "Gombe Stream National Park",
    circuit: "Western",
    description: "Gombe is Tanzania's smallest national park but world-famous as the site of Jane Goodall's pioneering chimpanzee research since 1960. This forest-clad valley along Lake Tanganyika offers intimate chimpanzee encounters and rich biodiversity.",
    highlights: [
      "Jane Goodall's research site",
      "Habituated chimpanzee families",
      "Beautiful Lake Tanganyika shore",
      "Historic scientific importance",
      "Intimate wildlife experience",
    ],
    wildlife: ["Chimpanzee", "Olive Baboon", "Red-tailed Monkey", "Bushbuck", "Vervet Monkey"],
    bestTime: "July to October for best chimp viewing",
  },
  {
    slug: "saadani-national-park",
    name: "Saadani National Park",
    circuit: "Coastal",
    description: "Saadani is the only wildlife sanctuary in East Africa bordering the Indian Ocean. This unique park offers a blend of beach and bush, where elephants roam on beaches and you can combine safari game drives with beach relaxation.",
    highlights: [
      "Only park bordering Indian Ocean",
      "Beach and bush combination",
      "Sea turtle nesting sites",
      "Boat safaris on Wami River",
      "Dolphins and whale watching",
    ],
    wildlife: ["Elephant", "Lion", "Buffalo", "Giraffe", "Hippo", "Crocodile", "Dolphin", "Sea Turtle"],
    bestTime: "January to February and June to August (dry seasons)",
  },
  {
    slug: "lake-natron",
    name: "Lake Natron",
    circuit: "Northern",
    description: "Lake Natron is a highly alkaline lake in northern Tanzania, famous as the only breeding ground for the lesser flamingo in East Africa. The lake's otherworldly landscape and nearby Ol Doinyo Lengai active volcano create a surreal and unforgettable experience.",
    highlights: [
      "Millions of lesser flamingos",
      "Ol Doinyo Lengai active volcano",
      "Dramatic lunar landscape",
      "Remote Maasai communities",
      "Engare Sero waterfalls",
    ],
    wildlife: ["Lesser Flamingo", "Greater Flamingo", "Fringe-eared Oryx", "Gerenuk", "Grant's Gazelle"],
    bestTime: "June to November for flamingo breeding",
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    circuit: "Coastal",
    description: "Zanzibar is a tropical archipelago off the coast of Tanzania, famous for its pristine beaches, historic Stone Town, and aromatic spice plantations. The islands offer the perfect beach extension to any Tanzania safari with world-class diving and snorkeling.",
    highlights: [
      "UNESCO World Heritage Stone Town",
      "White sand beaches and turquoise waters",
      "World-class diving and snorkeling",
      "Spice plantation tours",
      "Swimming with dolphins",
    ],
    wildlife: ["Dolphin", "Sea Turtle", "Whale Shark", "Red Colobus Monkey", "Tropical Fish"],
    bestTime: "June to October and December to February for beach weather",
  },
  {
    slug: "mkomazi-national-park",
    name: "Mkomazi National Park",
    circuit: "Northern",
    description: "Mkomazi is a semi-arid savanna park in northeast Tanzania, adjoining Kenya's Tsavo National Park. The park is known for its rhino sanctuary, African wild dog breeding program, and excellent birding opportunities.",
    highlights: [
      "Black rhino sanctuary",
      "African wild dog conservation",
      "Part of Tsavo ecosystem",
      "Excellent birding (450+ species)",
      "Scenic Pare and Usambara Mountain backdrop",
    ],
    wildlife: ["Black Rhino", "Wild Dog", "Elephant", "Lion", "Lesser Kudu", "Gerenuk", "Oryx"],
    bestTime: "June to February (avoid March to May rains)",
  },
];

// Pre-defined safari packages data
const SAFARIS_DATA = [
  {
    slug: "2-days-tanzania-lodge-safari",
    title: "2-Day Tanzania Lodge Safari",
    duration: "2 Days 1 Night",
    durationDays: 2,
    type: "Mid-range",
    overview: "Perfect introduction to Tanzania's wildlife, this 2-day safari takes you to Lake Manyara and Ngorongoro Crater. Experience tree-climbing lions, flamingo-lined shores, and the incredible wildlife of the world's largest intact volcanic caldera.",
    highlights: [
      "Explore Lake Manyara's diverse ecosystems",
      "Game drive in Ngorongoro Crater",
      "Comfortable lodge accommodation",
      "Possible Big Five sightings",
      "Expert English-speaking guide",
    ],
    itinerary: [
      { day: 1, title: "Lake Manyara National Park", description: "Morning pickup from Arusha, drive to Lake Manyara. Afternoon game drive exploring the park's groundwater forest, lake shore with flamingos, and acacia woodlands. Look for tree-climbing lions, elephants, and hippos. Overnight at a lodge on the crater rim." },
      { day: 2, title: "Ngorongoro Crater", description: "After breakfast, descend into Ngorongoro Crater for a half-day game drive. This natural amphitheater is home to the Big Five and over 25,000 large animals. Picnic lunch in the crater before ascending and returning to Arusha." },
    ],
    inclusions: ["Park entrance fees", "Professional safari guide", "4x4 safari vehicle", "Lodge accommodation", "All meals during safari", "Bottled water", "Airport/hotel transfers"],
    exclusions: ["International flights", "Visa fees", "Travel insurance", "Alcoholic beverages", "Tips for guide and staff", "Personal expenses"],
    priceFrom: 650,
    destinationSlugs: ["lake-manyara-national-park", "ngorongoro-crater"],
  },
  {
    slug: "3-days-tanzania-lodge-safari",
    title: "3-Day Tanzania Lodge Safari",
    duration: "3 Days 2 Nights",
    durationDays: 3,
    type: "Mid-range",
    overview: "Experience the highlights of Northern Tanzania on this 3-day safari covering Tarangire, Lake Manyara, and Ngorongoro Crater. Enjoy comfortable lodge accommodation and expert guiding as you explore diverse ecosystems teeming with wildlife.",
    highlights: [
      "Tarangire's famous elephant herds",
      "Lake Manyara's tree-climbing lions",
      "Ngorongoro Crater game drive",
      "Diverse landscapes and ecosystems",
      "Comfortable lodge stays",
    ],
    itinerary: [
      { day: 1, title: "Tarangire National Park", description: "Drive from Arusha to Tarangire National Park, famous for its ancient baobab trees and large elephant herds. Full day game drive exploring the Tarangire River ecosystem. Overnight at a safari lodge." },
      { day: 2, title: "Lake Manyara National Park", description: "Morning drive to Lake Manyara. Game drive in this compact park known for tree-climbing lions, large baboon troops, and thousands of flamingos. Evening drive to Ngorongoro area for overnight." },
      { day: 3, title: "Ngorongoro Crater", description: "Descend into the crater for a full morning game drive. Excellent chances to see black rhino, lions, elephants, and numerous other species. Picnic lunch in the crater before returning to Arusha." },
    ],
    inclusions: ["All park fees", "Safari guide", "4x4 vehicle", "Lodge accommodation", "All meals", "Water", "Transfers"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips", "Personal items"],
    priceFrom: 890,
    destinationSlugs: ["tarangire-national-park", "lake-manyara-national-park", "ngorongoro-crater"],
  },
  {
    slug: "3-days-tanzania-budget-camping-safari",
    title: "3-Day Budget Camping Safari",
    duration: "3 Days 2 Nights",
    durationDays: 3,
    type: "Budget",
    overview: "An affordable way to experience Tanzania's incredible wildlife. This camping safari visits Lake Manyara and Ngorongoro Crater with comfortable camping accommodation and all meals included.",
    highlights: [
      "Budget-friendly safari option",
      "Authentic camping experience",
      "Professional camp cook",
      "All camping equipment provided",
      "Expert safari guide",
    ],
    itinerary: [
      { day: 1, title: "Arusha to Lake Manyara", description: "Morning departure from Arusha. Game drive in Lake Manyara National Park, known for tree-climbing lions and flamingos. Evening at campsite with dinner prepared by our camp cook." },
      { day: 2, title: "Lake Manyara to Ngorongoro", description: "Morning game drive in Lake Manyara before heading to Ngorongoro. Afternoon exploration of the crater rim. Camping with hot dinner under the stars." },
      { day: 3, title: "Ngorongoro Crater", description: "Early descent into the crater for a full game drive. Pack lunch in the crater. Afternoon return to Arusha." },
    ],
    inclusions: ["Park fees", "Safari guide", "Vehicle", "Camping gear", "All meals", "Cook", "Water"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips", "Sleeping bag rental"],
    priceFrom: 495,
    destinationSlugs: ["lake-manyara-national-park", "ngorongoro-crater"],
  },
  {
    slug: "4-day-safari-adventure-in-tanzania",
    title: "4-Day Safari Adventure",
    duration: "4 Days 3 Nights",
    durationDays: 4,
    type: "Mid-range",
    overview: "Immerse yourself in Tanzania's wildlife on this 4-day adventure covering Tarangire, Serengeti, and Ngorongoro. Perfect balance of game viewing and comfortable accommodation with excellent chances of seeing the Big Five.",
    highlights: [
      "Serengeti National Park game drives",
      "Ngorongoro Crater exploration",
      "Tarangire elephants and baobabs",
      "Big Five sighting opportunities",
      "Professional naturalist guide",
    ],
    itinerary: [
      { day: 1, title: "Tarangire National Park", description: "Drive to Tarangire and enjoy game drives among massive elephant herds and ancient baobabs. Full day exploring the park's diverse habitats. Overnight at safari lodge." },
      { day: 2, title: "Tarangire to Serengeti", description: "Morning drive to Serengeti via Ngorongoro Conservation Area. Enter the Serengeti for afternoon game drive on the endless plains. Overnight in the Serengeti." },
      { day: 3, title: "Serengeti National Park", description: "Full day exploring Serengeti. Morning and afternoon game drives seeking lions, leopards, cheetahs, and more. During migration season, witness massive herds of wildebeest." },
      { day: 4, title: "Serengeti to Ngorongoro to Arusha", description: "Early morning game drive in Serengeti before departing to Ngorongoro. Descend into the crater for game drive, then return to Arusha by evening." },
    ],
    inclusions: ["All park fees", "Guide", "Vehicle", "Accommodation", "Meals", "Water", "Transfers"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 1450,
    destinationSlugs: ["tarangire-national-park", "serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "5-days-tanzania-luxury-safari",
    title: "5-Day Luxury Safari",
    duration: "5 Days 4 Nights",
    durationDays: 5,
    type: "Luxury",
    overview: "Experience Tanzania's wilderness in ultimate comfort. This luxury safari features premium lodges, gourmet meals, and exclusive game viewing experiences in Tarangire, Serengeti, and Ngorongoro Crater.",
    highlights: [
      "Luxury lodge accommodation",
      "Gourmet cuisine throughout",
      "Private vehicle and guide",
      "Exclusive game viewing",
      "Premium wildlife destinations",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Tarangire", description: "VIP transfer from airport to luxury lodge in Tarangire. Afternoon game drive to see elephant herds. Sundowner cocktails and gourmet dinner." },
      { day: 2, title: "Tarangire to Serengeti", description: "Scenic flight to Serengeti. Afternoon game drive with expert guide. Luxury tented camp in the heart of the wilderness." },
      { day: 3, title: "Full Day Serengeti", description: "Dawn and dusk game drives when predators are most active. Private bush breakfast. Search for Big Cats and witness the drama of the plains." },
      { day: 4, title: "Serengeti to Ngorongoro", description: "Morning game drive before driving to Ngorongoro. Afternoon at leisure at crater rim lodge. Sunset views over the caldera." },
      { day: 5, title: "Ngorongoro & Departure", description: "Descend into the crater in your private vehicle. Champagne bush lunch. Afternoon return to Arusha or Kilimanjaro Airport." },
    ],
    inclusions: ["All park fees", "Luxury accommodation", "All gourmet meals", "Premium drinks", "Private guide & vehicle", "Internal flight", "Airstrip transfers", "Laundry service"],
    exclusions: ["International flights", "Visa", "Travel insurance", "Premium imported spirits", "Gratuities"],
    priceFrom: 3950,
    destinationSlugs: ["tarangire-national-park", "serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "6-days-tanzania-camping-safari",
    title: "6-Day Tanzania Camping Safari",
    duration: "6 Days 5 Nights",
    durationDays: 6,
    type: "Budget",
    overview: "An adventurous camping safari covering all the Northern Circuit highlights. Experience authentic bush camping while exploring Tarangire, Serengeti, Ngorongoro, and Lake Manyara.",
    highlights: [
      "Authentic camping experience",
      "Comprehensive Northern Circuit",
      "Professional camp cook",
      "All equipment provided",
      "Maximum wildlife exposure",
    ],
    itinerary: [
      { day: 1, title: "Tarangire National Park", description: "Drive to Tarangire for full day game drive. Evening at campsite with dinner under the stars." },
      { day: 2, title: "Tarangire to Serengeti", description: "Cross Ngorongoro Conservation Area to Serengeti. Afternoon game drive. Bush camping in Serengeti." },
      { day: 3, title: "Serengeti Full Day", description: "Full day exploring the Serengeti plains. Picnic lunch in the bush. Evening campfire and stargazing." },
      { day: 4, title: "Central Serengeti", description: "Morning and afternoon game drives in different areas. Camp near Seronera." },
      { day: 5, title: "Serengeti to Ngorongoro", description: "Early game drive, then drive to Ngorongoro. Camp on the crater rim." },
      { day: 6, title: "Ngorongoro Crater & Return", description: "Descend into crater for game drive. Packed lunch. Return to Arusha by evening." },
    ],
    inclusions: ["Park fees", "Camping gear", "Professional guide & cook", "Vehicle", "All meals", "Water"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips", "Sleeping bag rental"],
    priceFrom: 1150,
    destinationSlugs: ["tarangire-national-park", "serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "7-days-tanzania-lodge-safari",
    title: "7-Day Tanzania Lodge Safari",
    duration: "7 Days 6 Nights",
    durationDays: 7,
    type: "Mid-range",
    overview: "The ultimate Northern Tanzania safari experience. Spend quality time in Tarangire, Lake Manyara, Serengeti, and Ngorongoro with comfortable lodge accommodation throughout.",
    highlights: [
      "Comprehensive wildlife experience",
      "Multiple days in Serengeti",
      "All major Northern parks",
      "Comfortable lodge stays",
      "Optimal game viewing time",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Tarangire", description: "Airport pickup, drive to Tarangire. Afternoon game drive. Lodge overnight." },
      { day: 2, title: "Lake Manyara", description: "Morning drive to Lake Manyara. Full day game drive. Lodge on crater rim." },
      { day: 3, title: "Ngorongoro to Serengeti", description: "Scenic drive through Ngorongoro to Serengeti. Afternoon game drive." },
      { day: 4, title: "Serengeti Central", description: "Full day in central Serengeti around Seronera. Big cat country." },
      { day: 5, title: "Serengeti North/South", description: "Drive to migration area depending on season. Full day game drives." },
      { day: 6, title: "Serengeti to Ngorongoro", description: "Morning game drive, afternoon drive to Ngorongoro rim." },
      { day: 7, title: "Ngorongoro Crater", description: "Full crater tour with picnic lunch. Return to Arusha." },
    ],
    inclusions: ["All park fees", "Lodge accommodation", "All meals", "Guide & vehicle", "Transfers", "Water"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 2350,
    destinationSlugs: ["tarangire-national-park", "lake-manyara-national-park", "serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "8-days-best-of-tanzania-safari",
    title: "8-Day Best of Tanzania Safari",
    duration: "8 Days 7 Nights",
    durationDays: 8,
    type: "Mid-range",
    overview: "Experience the very best of Tanzania's wildlife and landscapes on this comprehensive 8-day safari. From elephant-filled Tarangire to the endless Serengeti plains and the iconic Ngorongoro Crater.",
    highlights: [
      "Extended Serengeti experience",
      "All Northern Circuit parks",
      "Migration viewing (seasonal)",
      "Cultural village visit",
      "Maximum wildlife diversity",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Airport transfer to Arusha lodge. Safari briefing." },
      { day: 2, title: "Tarangire", description: "Full day in Tarangire with elephant herds and baobabs." },
      { day: 3, title: "Lake Manyara", description: "Game drive in Lake Manyara. Evening at crater rim." },
      { day: 4, title: "To Serengeti", description: "Drive through Ngorongoro to Serengeti. Afternoon game drive." },
      { day: 5, title: "Central Serengeti", description: "Full day around Seronera area. Big cat focus." },
      { day: 6, title: "Serengeti Migration Area", description: "Drive to current migration location." },
      { day: 7, title: "Serengeti to Ngorongoro", description: "Morning game drive, afternoon drive to crater." },
      { day: 8, title: "Ngorongoro & Departure", description: "Crater game drive, return to Arusha." },
    ],
    inclusions: ["All park fees", "Accommodation", "Meals", "Guide", "Vehicle", "Transfers", "Water"],
    exclusions: ["International flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 2890,
    destinationSlugs: ["tarangire-national-park", "lake-manyara-national-park", "serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "10-days-northern-circuit-safari",
    title: "10-Day Northern Circuit Safari",
    duration: "10 Days 9 Nights",
    durationDays: 10,
    type: "Mid-range",
    overview: "The definitive Northern Tanzania safari covering all major parks with ample time for wildlife viewing. Includes Tarangire, Lake Manyara, Serengeti, Ngorongoro, and Lake Natron for a complete East African experience.",
    highlights: [
      "All Northern Circuit destinations",
      "Lake Natron flamingos",
      "Extended Serengeti time",
      "Comprehensive wildlife viewing",
      "Maasai cultural experience",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Welcome to Tanzania. Transfer to Arusha hotel." },
      { day: 2, title: "Lake Manyara", description: "Drive to Lake Manyara. Full day game drive." },
      { day: 3, title: "Ngorongoro Crater", description: "Full day exploring the crater floor." },
      { day: 4, title: "To Serengeti", description: "Drive to Serengeti with game viewing en route." },
      { day: 5, title: "Central Serengeti", description: "Full day in Seronera area." },
      { day: 6, title: "Serengeti", description: "Game drives in different Serengeti sectors." },
      { day: 7, title: "Serengeti to Lake Natron", description: "Drive to Lake Natron via Loliondo." },
      { day: 8, title: "Lake Natron", description: "Flamingos, waterfall visit, optional Lengai hike." },
      { day: 9, title: "Tarangire", description: "Drive to Tarangire for elephant viewing." },
      { day: 10, title: "Departure", description: "Morning game drive, return to Arusha." },
    ],
    inclusions: ["All park fees", "Accommodation", "Meals", "Guide", "Vehicle", "Transfers"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 3650,
    destinationSlugs: ["lake-manyara-national-park", "ngorongoro-crater", "serengeti-national-park", "lake-natron", "tarangire-national-park"],
  },
  {
    slug: "5-days-southern-tanzania-safari",
    title: "5-Day Southern Tanzania Safari",
    duration: "5 Days 4 Nights",
    durationDays: 5,
    type: "Mid-range",
    overview: "Discover the wild south of Tanzania with this safari to Mikumi and Selous (Nyerere National Park). Experience boat safaris, walking safaris, and game drives in uncrowded wilderness.",
    highlights: [
      "Boat safari on Rufiji River",
      "Walking safari option",
      "Less touristy than northern circuit",
      "Wild dog sightings",
      "Fly-in option available",
    ],
    itinerary: [
      { day: 1, title: "Dar to Mikumi", description: "Drive from Dar es Salaam to Mikumi. Afternoon game drive." },
      { day: 2, title: "Mikumi National Park", description: "Full day game drive in Mikumi's open plains." },
      { day: 3, title: "Mikumi to Selous", description: "Drive to Selous Game Reserve. Afternoon boat safari." },
      { day: 4, title: "Selous Game Reserve", description: "Morning walking safari, afternoon game drive." },
      { day: 5, title: "Selous to Dar", description: "Morning game drive, return to Dar es Salaam." },
    ],
    inclusions: ["Park fees", "Accommodation", "Meals", "Guide", "Vehicle", "Boat safari", "Walking safari"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 1450,
    destinationSlugs: ["mikumi-national-park", "selous-game-reserve"],
  },
  {
    slug: "7-days-southern-circuit-safari",
    title: "7-Day Southern Circuit Safari",
    duration: "7 Days 6 Nights",
    durationDays: 7,
    type: "Mid-range",
    overview: "Explore the untouched wilderness of southern Tanzania including Mikumi, Ruaha, and Selous. This off-the-beaten-track safari offers exceptional wildlife viewing without the crowds.",
    highlights: [
      "Three major southern parks",
      "Remote wilderness experience",
      "Excellent lion populations",
      "Wild dog territory",
      "Boat and walking safaris",
    ],
    itinerary: [
      { day: 1, title: "Dar to Mikumi", description: "Drive to Mikumi with afternoon game drive." },
      { day: 2, title: "Mikumi to Ruaha", description: "Drive to Ruaha National Park. Evening game drive." },
      { day: 3, title: "Ruaha National Park", description: "Full day exploring Ruaha's wilderness." },
      { day: 4, title: "Ruaha", description: "Morning and afternoon game drives in different areas." },
      { day: 5, title: "Ruaha to Selous", description: "Fly or drive to Selous. Afternoon boat safari." },
      { day: 6, title: "Selous", description: "Walking safari and game drives." },
      { day: 7, title: "Return", description: "Morning activity, return to Dar es Salaam." },
    ],
    inclusions: ["Park fees", "Accommodation", "Meals", "Guide", "Vehicle", "Special activities"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 2250,
    destinationSlugs: ["mikumi-national-park", "ruaha-national-park", "selous-game-reserve"],
  },
  {
    slug: "4-days-serengeti-safari",
    title: "4-Day Serengeti Safari",
    duration: "4 Days 3 Nights",
    durationDays: 4,
    type: "Mid-range",
    overview: "Focused safari experience in the world-famous Serengeti National Park with Ngorongoro Crater. Maximum time in prime wildlife areas for exceptional game viewing.",
    highlights: [
      "Maximum Serengeti time",
      "Great Migration (seasonal)",
      "Ngorongoro Crater",
      "Big cat sightings",
      "Endless plains experience",
    ],
    itinerary: [
      { day: 1, title: "Arusha to Serengeti", description: "Drive through Ngorongoro to Serengeti. Afternoon game drive." },
      { day: 2, title: "Serengeti Full Day", description: "Full day game drives. Dawn and dusk safaris." },
      { day: 3, title: "Serengeti", description: "Morning game drive, midday transfer to Ngorongoro." },
      { day: 4, title: "Ngorongoro & Return", description: "Crater game drive, return to Arusha." },
    ],
    inclusions: ["Park fees", "Accommodation", "Meals", "Guide", "Vehicle", "Transfers"],
    exclusions: ["Flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 1350,
    destinationSlugs: ["serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "6-days-great-migration-safari",
    title: "6-Day Great Migration Safari",
    duration: "6 Days 5 Nights",
    durationDays: 6,
    type: "Mid-range",
    overview: "Witness nature's greatest spectacle - the Great Wildebeest Migration. This safari is timed to maximize your chances of seeing the massive herds and dramatic river crossings.",
    highlights: [
      "Great Migration viewing",
      "Mara River crossings (July-Oct)",
      "Calving season (Jan-Mar)",
      "Predator action",
      "Extended Serengeti time",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Ngorongoro", description: "Airport pickup, drive to Ngorongoro area." },
      { day: 2, title: "To Serengeti", description: "Drive to Serengeti migration area." },
      { day: 3, title: "Migration Viewing", description: "Full day with the migration herds." },
      { day: 4, title: "Serengeti", description: "Continue following the herds." },
      { day: 5, title: "Serengeti to Ngorongoro", description: "Drive to Ngorongoro rim." },
      { day: 6, title: "Crater & Departure", description: "Crater game drive, return to Arusha." },
    ],
    inclusions: ["All park fees", "Accommodation", "Meals", "Expert guide", "Vehicle", "Transfers"],
    exclusions: ["International flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 1850,
    destinationSlugs: ["serengeti-national-park", "ngorongoro-crater"],
  },
  {
    slug: "8-days-tanzania-zanzibar-combo",
    title: "8-Day Safari & Zanzibar Beach",
    duration: "8 Days 7 Nights",
    durationDays: 8,
    type: "Mid-range",
    overview: "The perfect combination of safari adventure and beach relaxation. Explore Tanzania's wildlife in Serengeti and Ngorongoro, then unwind on Zanzibar's pristine beaches.",
    highlights: [
      "Best of both worlds",
      "Serengeti & Ngorongoro wildlife",
      "Zanzibar beach relaxation",
      "Stone Town tour",
      "Spice plantation visit",
    ],
    itinerary: [
      { day: 1, title: "Arusha", description: "Arrival and overnight in Arusha." },
      { day: 2, title: "To Serengeti", description: "Drive to Serengeti via Ngorongoro." },
      { day: 3, title: "Serengeti", description: "Full day game drives." },
      { day: 4, title: "Ngorongoro", description: "Drive to Ngorongoro, afternoon at leisure." },
      { day: 5, title: "Crater & Fly", description: "Morning crater tour, afternoon flight to Zanzibar." },
      { day: 6, title: "Zanzibar Beach", description: "Beach day at leisure." },
      { day: 7, title: "Zanzibar", description: "Optional Stone Town tour or water activities." },
      { day: 8, title: "Departure", description: "Transfer to airport for departure." },
    ],
    inclusions: ["Safari park fees", "All accommodation", "Safari meals", "Beach B&B", "Guide", "Vehicle", "Zanzibar flight", "Transfers"],
    exclusions: ["International flights", "Visa", "Insurance", "Lunches in Zanzibar", "Tips", "Water activities"],
    priceFrom: 2650,
    destinationSlugs: ["serengeti-national-park", "ngorongoro-crater", "zanzibar"],
  },
  {
    slug: "5-days-chimpanzee-safari",
    title: "5-Day Chimpanzee Safari",
    duration: "5 Days 4 Nights",
    durationDays: 5,
    type: "Mid-range",
    overview: "Track wild chimpanzees in their natural habitat at Gombe Stream National Park, made famous by Jane Goodall. Combine with Lake Tanganyika beach time for a unique Tanzania experience.",
    highlights: [
      "Chimpanzee tracking",
      "Jane Goodall's research site",
      "Lake Tanganyika beaches",
      "Unique primate experience",
      "Remote wilderness",
    ],
    itinerary: [
      { day: 1, title: "To Kigoma", description: "Fly from Arusha to Kigoma. Boat to Gombe." },
      { day: 2, title: "Gombe - Chimp Tracking", description: "Morning chimp tracking, afternoon forest walk." },
      { day: 3, title: "Gombe", description: "Second chimp trek, beach time, snorkeling." },
      { day: 4, title: "Kigoma", description: "Return to Kigoma. Ujiji historic site." },
      { day: 5, title: "Departure", description: "Fly back to Arusha for departure." },
    ],
    inclusions: ["Domestic flights", "Boat transfers", "Park fees", "Chimp permits", "Accommodation", "Meals", "Guide"],
    exclusions: ["International flights", "Visa", "Insurance", "Drinks", "Tips"],
    priceFrom: 2350,
    destinationSlugs: ["gombe-stream-national-park"],
  },
  {
    slug: "12-days-ultimate-tanzania-safari",
    title: "12-Day Ultimate Tanzania Safari",
    duration: "12 Days 11 Nights",
    durationDays: 12,
    type: "Luxury",
    overview: "The ultimate Tanzania experience covering both Northern and Southern circuits. From Serengeti to Selous, experience the full diversity of Tanzania's wildlife in style.",
    highlights: [
      "Complete Tanzania experience",
      "Both Northern and Southern circuits",
      "Luxury accommodation throughout",
      "Private vehicle and guide",
      "Internal flights included",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "VIP arrival, Arusha luxury hotel." },
      { day: 2, title: "Tarangire", description: "Full day with elephants and baobabs." },
      { day: 3, title: "Ngorongoro", description: "Drive to crater rim, afternoon at leisure." },
      { day: 4, title: "Crater", description: "Full day in the crater." },
      { day: 5, title: "Serengeti", description: "Drive to Serengeti, afternoon game drive." },
      { day: 6, title: "Serengeti", description: "Full day exploring different areas." },
      { day: 7, title: "Serengeti", description: "Morning game drive, afternoon balloon optional." },
      { day: 8, title: "Fly to Ruaha", description: "Charter to Ruaha, afternoon game drive." },
      { day: 9, title: "Ruaha", description: "Full day in Ruaha wilderness." },
      { day: 10, title: "Fly to Selous", description: "Charter to Selous, boat safari." },
      { day: 11, title: "Selous", description: "Walking safari and game drives." },
      { day: 12, title: "Departure", description: "Fly to Dar for departure." },
    ],
    inclusions: ["All park fees", "Luxury lodges", "All meals & drinks", "Private guide & vehicle", "All internal flights", "Special activities"],
    exclusions: ["International flights", "Visa", "Travel insurance", "Premium drinks", "Gratuities"],
    priceFrom: 8500,
    destinationSlugs: ["tarangire-national-park", "ngorongoro-crater", "serengeti-national-park", "ruaha-national-park", "selous-game-reserve"],
  },
];

// Pre-defined day trip data
const DAY_TRIPS_DATA = [
  {
    slug: "day-trip-to-arusha-national-park",
    title: "Day Trip to Arusha National Park",
    destination: "Arusha National Park",
    description: "Explore Arusha National Park on this exciting day trip from Arusha or Moshi. Visit the Momella Lakes, Ngurdoto Crater, and walk among giraffes and buffalos with an armed ranger.",
    highlights: [
      "Walking safari with armed ranger",
      "Momella Lakes with flamingos",
      "Ngurdoto Crater views",
      "Colobus monkey sightings",
      "Views of Mount Meru",
    ],
    inclusions: ["Park entrance fees", "Professional guide", "4x4 vehicle", "Picnic lunch", "Bottled water", "Hotel pickup/dropoff"],
    exclusions: ["Tips for guide", "Personal expenses", "Travel insurance"],
    priceFrom: 180,
  },
  {
    slug: "day-trip-to-lake-manyara",
    title: "Day Trip to Lake Manyara",
    destination: "Lake Manyara National Park",
    description: "Spend a day exploring Lake Manyara National Park's diverse ecosystems. From groundwater forests to the alkaline lake shore, look for tree-climbing lions, elephants, and thousands of flamingos.",
    highlights: [
      "Tree-climbing lions",
      "Flamingo-lined lake shore",
      "Groundwater forest",
      "Elephant herds",
      "Baboon troops",
    ],
    inclusions: ["Park fees", "Guide", "Vehicle", "Lunch box", "Water", "Transfers"],
    exclusions: ["Tips", "Personal expenses", "Insurance"],
    priceFrom: 220,
  },
  {
    slug: "day-trip-to-tarangire",
    title: "Day Trip to Tarangire National Park",
    destination: "Tarangire National Park",
    description: "Experience Tarangire's famous elephant herds and ancient baobab trees on this full-day safari. The park offers excellent game viewing especially during the dry season when animals gather around the river.",
    highlights: [
      "Large elephant herds",
      "Ancient baobab trees",
      "Diverse wildlife",
      "Bird watching paradise",
      "Less crowded than Serengeti",
    ],
    inclusions: ["Park entrance fees", "Safari guide", "4x4 vehicle", "Packed lunch", "Drinking water", "Hotel transfers"],
    exclusions: ["Gratuities", "Personal items", "Travel insurance"],
    priceFrom: 230,
  },
  {
    slug: "ngorongoro-crater-day-trip",
    title: "Ngorongoro Crater Day Trip",
    destination: "Ngorongoro Crater",
    description: "Descend into the world's largest intact volcanic caldera on this unforgettable day trip. The crater floor is home to the Big Five and offers some of the best wildlife viewing in Africa.",
    highlights: [
      "Big Five in one day",
      "World Heritage Site",
      "Stunning crater views",
      "Black rhino sightings",
      "25,000+ animals in the crater",
    ],
    inclusions: ["Crater fees", "Conservation fees", "Guide", "Vehicle", "Lunch", "Water", "Transfers"],
    exclusions: ["Tips", "Personal expenses", "Insurance"],
    priceFrom: 350,
  },
  {
    slug: "materuni-waterfalls-coffee-tour",
    title: "Materuni Waterfalls & Coffee Tour",
    destination: "Materuni Village",
    description: "Visit the stunning Materuni Waterfalls near Kilimanjaro and learn about traditional coffee cultivation with the Chagga people. Swim in the waterfall pool and enjoy fresh-roasted local coffee.",
    highlights: [
      "80-meter Materuni Waterfall",
      "Traditional coffee experience",
      "Chagga cultural immersion",
      "Kilimanjaro views",
      "Swim in natural pool",
    ],
    inclusions: ["Village fees", "Local guide", "Transport", "Coffee tour", "Traditional lunch", "Swimming opportunity"],
    exclusions: ["Tips for guides", "Personal expenses", "Swimwear"],
    priceFrom: 95,
  },
];

// Pre-defined blog post data
const BLOG_POSTS_DATA = [
  {
    slug: "best-time-to-climb-kilimanjaro",
    title: "Best Time to Climb Kilimanjaro: Complete Guide",
    excerpt: "Discover the optimal months for climbing Mount Kilimanjaro, weather patterns, and how to choose the best time for your trek based on crowds, costs, and conditions.",
    content: `<h2>When is the Best Time to Climb Kilimanjaro?</h2>
<p>Mount Kilimanjaro can be climbed year-round, but certain months offer better conditions than others. The best times to climb are during the dry seasons: <strong>January to mid-March</strong> and <strong>June to October</strong>.</p>

<h3>Peak Season (June to October)</h3>
<p>This is the most popular time to climb Kilimanjaro. The weather is generally dry and stable, with clear skies offering spectacular views. July and August see the highest number of climbers.</p>

<h3>Secondary Season (January to mid-March)</h3>
<p>The second dry season offers excellent climbing conditions with fewer crowds. This period is warmer at lower elevations but can have occasional afternoon showers.</p>

<h3>Shoulder Seasons</h3>
<p>Late March to May (long rains) and November to mid-December (short rains) are the wet seasons. While climbing is still possible, you should expect rain, clouds, and potentially snow at higher elevations.</p>

<h3>Full Moon Climbs</h3>
<p>Many climbers prefer to summit during a full moon for the magical experience of climbing under moonlight. We offer special full moon departure dates throughout the year.</p>`,
    author: "Snow Africa Team",
    categorySlugs: ["kilimanjaro-climbing"],
    tagSlugs: ["kilimanjaro", "trekking", "planning"],
  },
  {
    slug: "serengeti-great-migration-guide",
    title: "Serengeti Great Migration: Complete Guide",
    excerpt: "Everything you need to know about witnessing the Great Wildebeest Migration in the Serengeti, including timing, locations, and best safari options.",
    content: `<h2>Understanding the Great Migration</h2>
<p>The Great Migration is nature's most spectacular wildlife event, involving over <strong>2 million wildebeest, zebras, and gazelles</strong> making their annual circular journey through the Serengeti-Mara ecosystem.</p>

<h3>Migration Calendar</h3>
<p><strong>December to March:</strong> The herds are in the southern Serengeti and Ndutu area for the calving season. Over 500,000 wildebeest calves are born during February.</p>

<p><strong>April to May:</strong> The herds begin moving northwest through the Serengeti as they follow the rains.</p>

<p><strong>June to July:</strong> The herds reach the Western Corridor and begin the dangerous Grumeti River crossings.</p>

<p><strong>August to October:</strong> The most dramatic period with the famous Mara River crossings in the northern Serengeti and Masai Mara.</p>

<p><strong>November:</strong> The herds begin their return journey south following the short rains.</p>

<h3>Best Time to Visit</h3>
<p>For river crossings, visit between July and October. For the calving season, February is optimal. The migration is always somewhere in the Serengeti year-round.</p>`,
    author: "Snow Africa Team",
    categorySlugs: ["safari-tips"],
    tagSlugs: ["serengeti", "migration", "safari"],
  },
  {
    slug: "what-to-pack-for-kilimanjaro",
    title: "Kilimanjaro Packing List: Essential Gear Guide",
    excerpt: "Complete packing list for climbing Mount Kilimanjaro. Learn what gear to bring, what's provided, and expert tips for your trek.",
    content: `<h2>Essential Kilimanjaro Packing List</h2>
<p>Proper gear is crucial for a successful Kilimanjaro climb. Here's our comprehensive packing list based on years of guiding experience.</p>

<h3>Clothing Layers</h3>
<ul>
<li>Moisture-wicking base layers (3 sets)</li>
<li>Insulating mid-layers (fleece or down)</li>
<li>Waterproof outer shell (jacket and pants)</li>
<li>Down jacket for summit night</li>
<li>Hiking pants and shorts</li>
</ul>

<h3>Footwear</h3>
<ul>
<li>Broken-in hiking boots</li>
<li>Gaiters for scree sections</li>
<li>Camp shoes/sandals</li>
<li>Multiple pairs of hiking socks</li>
</ul>

<h3>Accessories</h3>
<ul>
<li>Warm hat and sun hat</li>
<li>Gloves (liner and insulated)</li>
<li>Sunglasses and goggles</li>
<li>Buff or balaclava</li>
</ul>

<h3>Equipment</h3>
<ul>
<li>Daypack (20-30L)</li>
<li>Headlamp with extra batteries</li>
<li>Trekking poles</li>
<li>Water bottles and hydration system</li>
</ul>

<h3>What We Provide</h3>
<p>Snow Africa provides: sleeping bag, sleeping mat, dining tent, toilet tent, camping chairs, and all cooking equipment.</p>`,
    author: "Snow Africa Team",
    categorySlugs: ["kilimanjaro-climbing"],
    tagSlugs: ["kilimanjaro", "packing", "gear"],
  },
  {
    slug: "choosing-kilimanjaro-route",
    title: "How to Choose the Right Kilimanjaro Route",
    excerpt: "Compare all Kilimanjaro routes including Machame, Lemosho, Marangu, Rongai, and Umbwe. Find the perfect route for your experience level and preferences.",
    content: `<h2>Kilimanjaro Route Comparison</h2>
<p>Choosing the right route is one of the most important decisions for your Kilimanjaro climb. Each route offers unique experiences and challenges.</p>

<h3>Machame Route (6-7 days)</h3>
<p>The most popular route, known as the "Whiskey Route." Offers excellent acclimatization and stunning scenery. Recommended for those with some trekking experience.</p>

<h3>Lemosho Route (7-8 days)</h3>
<p>Considered the most beautiful route with the highest success rate (95%). Starts from the west with remote wilderness experience. Our top recommendation.</p>

<h3>Marangu Route (5-6 days)</h3>
<p>The only route with hut accommodation, known as the "Coca-Cola Route." More comfortable sleeping but lower success rate due to shorter duration.</p>

<h3>Rongai Route (6-7 days)</h3>
<p>Approaches from the north, the only route from this direction. Less scenic but less crowded and good for rainy season.</p>

<h3>Umbwe Route (6 days)</h3>
<p>The most challenging route with steep, direct ascent. Only recommended for experienced high-altitude trekkers.</p>

<h3>Which Route Should You Choose?</h3>
<p>For first-time climbers, we recommend the <strong>7-day Machame</strong> or <strong>8-day Lemosho</strong> routes for the best balance of success rate, scenery, and experience.</p>`,
    author: "Snow Africa Team",
    categorySlugs: ["kilimanjaro-climbing"],
    tagSlugs: ["kilimanjaro", "routes", "planning"],
  },
  {
    slug: "tanzania-safari-for-first-timers",
    title: "Tanzania Safari for First-Timers: Complete Guide",
    excerpt: "Planning your first Tanzania safari? Learn everything about choosing parks, best times to visit, what to expect, and how to plan your perfect wildlife adventure.",
    content: `<h2>Your First Tanzania Safari</h2>
<p>Tanzania offers some of the world's best safari experiences. Here's everything you need to know to plan your first wildlife adventure.</p>

<h3>Top Parks to Visit</h3>
<p><strong>Serengeti National Park:</strong> Africa's most famous park, home to the Great Migration and incredible predator sightings.</p>
<p><strong>Ngorongoro Crater:</strong> The world's largest intact caldera with excellent Big Five viewing.</p>
<p><strong>Tarangire National Park:</strong> Famous for elephant herds and baobab trees.</p>

<h3>Best Time to Visit</h3>
<p>Tanzania is a year-round destination. Dry season (June-October) offers best game viewing. Wet season (November-May) has lush landscapes and fewer tourists.</p>

<h3>Safari Types</h3>
<ul>
<li><strong>Budget camping:</strong> Authentic experience, affordable prices</li>
<li><strong>Mid-range lodges:</strong> Comfortable accommodation, good value</li>
<li><strong>Luxury lodges:</strong> Premium service, exclusive experiences</li>
</ul>

<h3>What to Pack</h3>
<p>Neutral-colored clothing, camera with zoom lens, binoculars, sunscreen, insect repellent, and comfortable walking shoes.</p>

<h3>Health & Safety</h3>
<p>Consult your doctor about vaccinations and malaria prophylaxis. Tanzania is a safe destination with excellent wildlife safety protocols.</p>`,
    author: "Snow Africa Team",
    categorySlugs: ["safari-tips"],
    tagSlugs: ["safari", "tanzania", "planning"],
  },
];

async function migrateRoutes(dryRun: boolean) {
  console.log("\n📍 Migrating Trekking Routes...\n");

  // Create category
  let category = await prisma.category.findUnique({
    where: { slug: "kilimanjaro-routes" },
  });

  if (!category && !dryRun) {
    category = await prisma.category.create({
      data: {
        slug: "kilimanjaro-routes",
        name: "Kilimanjaro Routes",
        description: "Kilimanjaro climbing routes and other mountain treks",
      },
    });
  }

  for (const route of ROUTES_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${route.title}`);
      console.log(`    Duration: ${route.duration}, Success: ${route.successRate || "N/A"}%`);
      console.log(`    Itinerary: ${route.itinerary?.length || 0} days`);
    } else {
      try {
        await prisma.trekkingRoute.upsert({
          where: { slug: route.slug },
          create: {
            slug: route.slug,
            title: route.title,
            metaTitle: `${route.title} | Snow Africa Adventure`,
            metaDescription: route.overview.slice(0, 160),
            duration: route.duration,
            durationDays: route.durationDays,
            maxPeople: route.maxPeople,
            startPoint: route.startPoint,
            endPoint: route.endPoint,
            ageRange: route.ageRange,
            physicalRating: route.physicalRating,
            successRate: route.successRate,
            overview: route.overview,
            highlights: route.highlights || [],
            itinerary: route.itinerary,
            inclusions: route.inclusions || [],
            exclusions: route.exclusions || [],
            faqs: route.faqs,
            isActive: true,
            categoryId: category?.id,
          },
          update: {
            title: route.title,
            metaTitle: `${route.title} | Snow Africa Adventure`,
            metaDescription: route.overview.slice(0, 160),
            duration: route.duration,
            durationDays: route.durationDays,
            maxPeople: route.maxPeople,
            startPoint: route.startPoint,
            endPoint: route.endPoint,
            ageRange: route.ageRange,
            physicalRating: route.physicalRating,
            successRate: route.successRate,
            overview: route.overview,
            highlights: route.highlights || [],
            itinerary: route.itinerary,
            inclusions: route.inclusions || [],
            exclusions: route.exclusions || [],
            faqs: route.faqs,
            categoryId: category?.id,
          },
        });
        console.log(`  ✅ Migrated: ${route.title}`);
      } catch (error) {
        console.error(`  ❌ Error migrating ${route.slug}:`, error);
      }
    }
  }

  console.log(`\n  Total: ${ROUTES_DATA.length} routes`);
}

async function migrateDestinations(dryRun: boolean) {
  console.log("\n🏞️  Migrating Destinations...\n");

  for (const dest of DESTINATIONS_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${dest.name}`);
      console.log(`    Circuit: ${dest.circuit}`);
    } else {
      try {
        await prisma.destination.upsert({
          where: { slug: dest.slug },
          create: {
            slug: dest.slug,
            name: dest.name,
            metaTitle: `${dest.name} | Tanzania Safari Destination`,
            metaDescription: dest.description.slice(0, 160),
            circuit: dest.circuit,
            description: dest.description,
            highlights: dest.highlights,
            wildlife: dest.wildlife,
            bestTime: dest.bestTime,
            isActive: true,
          },
          update: {
            name: dest.name,
            metaTitle: `${dest.name} | Tanzania Safari Destination`,
            metaDescription: dest.description.slice(0, 160),
            circuit: dest.circuit,
            description: dest.description,
            highlights: dest.highlights,
            wildlife: dest.wildlife,
            bestTime: dest.bestTime,
          },
        });
        console.log(`  ✅ Migrated: ${dest.name}`);
      } catch (error) {
        console.error(`  ❌ Error migrating ${dest.slug}:`, error);
      }
    }
  }

  console.log(`\n  Total: ${DESTINATIONS_DATA.length} destinations`);
}

async function migrateSafaris(dryRun: boolean) {
  console.log("\n🦁 Migrating Safari Packages...\n");

  for (const safari of SAFARIS_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${safari.title}`);
      console.log(`    Type: ${safari.type}, Duration: ${safari.duration}`);
      console.log(`    Destinations: ${safari.destinationSlugs.join(", ")}`);
    } else {
      try {
        // First create or update the safari
        const createdSafari = await prisma.safariPackage.upsert({
          where: { slug: safari.slug },
          create: {
            slug: safari.slug,
            title: safari.title,
            metaTitle: `${safari.title} | Snow Africa Adventure`,
            metaDescription: safari.overview.slice(0, 160),
            duration: safari.duration,
            durationDays: safari.durationDays,
            type: safari.type,
            overview: safari.overview,
            highlights: safari.highlights,
            itinerary: safari.itinerary,
            inclusions: safari.inclusions,
            exclusions: safari.exclusions,
            priceFrom: safari.priceFrom,
            isActive: true,
          },
          update: {
            title: safari.title,
            metaTitle: `${safari.title} | Snow Africa Adventure`,
            metaDescription: safari.overview.slice(0, 160),
            duration: safari.duration,
            durationDays: safari.durationDays,
            type: safari.type,
            overview: safari.overview,
            highlights: safari.highlights,
            itinerary: safari.itinerary,
            inclusions: safari.inclusions,
            exclusions: safari.exclusions,
            priceFrom: safari.priceFrom,
          },
        });

        // Link destinations
        // First, delete existing links
        await prisma.safariDestination.deleteMany({
          where: { safariId: createdSafari.id },
        });

        // Then create new links
        for (let i = 0; i < safari.destinationSlugs.length; i++) {
          const destSlug = safari.destinationSlugs[i];
          const destination = await prisma.destination.findUnique({
            where: { slug: destSlug },
          });

          if (destination) {
            await prisma.safariDestination.create({
              data: {
                safariId: createdSafari.id,
                destinationId: destination.id,
                order: i,
              },
            });
          }
        }

        console.log(`  ✅ Migrated: ${safari.title} (${safari.destinationSlugs.length} destinations)`);
      } catch (error) {
        console.error(`  ❌ Error migrating ${safari.slug}:`, error);
      }
    }
  }

  console.log(`\n  Total: ${SAFARIS_DATA.length} safari packages`);
}

async function migrateDayTrips(dryRun: boolean) {
  console.log("\n🌄 Migrating Day Trips...\n");

  for (const trip of DAY_TRIPS_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${trip.title}`);
      console.log(`    Destination: ${trip.destination}`);
    } else {
      try {
        await prisma.dayTrip.upsert({
          where: { slug: trip.slug },
          create: {
            slug: trip.slug,
            title: trip.title,
            metaTitle: `${trip.title} | Snow Africa Adventure`,
            metaDescription: trip.description.slice(0, 160),
            destination: trip.destination,
            description: trip.description,
            highlights: trip.highlights,
            inclusions: trip.inclusions,
            exclusions: trip.exclusions,
            priceFrom: trip.priceFrom,
            isActive: true,
          },
          update: {
            title: trip.title,
            metaTitle: `${trip.title} | Snow Africa Adventure`,
            metaDescription: trip.description.slice(0, 160),
            destination: trip.destination,
            description: trip.description,
            highlights: trip.highlights,
            inclusions: trip.inclusions,
            exclusions: trip.exclusions,
            priceFrom: trip.priceFrom,
          },
        });
        console.log(`  ✅ Migrated: ${trip.title}`);
      } catch (error) {
        console.error(`  ❌ Error migrating ${trip.slug}:`, error);
      }
    }
  }

  console.log(`\n  Total: ${DAY_TRIPS_DATA.length} day trips`);
}

async function migrateBlogPosts(dryRun: boolean) {
  console.log("\n📝 Migrating Blog Posts...\n");

  // First ensure categories exist
  const categoryMap: Record<string, string> = {};
  const tagMap: Record<string, string> = {};

  const categorySlugs = [...new Set(BLOG_POSTS_DATA.flatMap(p => p.categorySlugs))];
  const tagSlugs = [...new Set(BLOG_POSTS_DATA.flatMap(p => p.tagSlugs))];

  if (!dryRun) {
    // Create categories
    for (const slug of categorySlugs) {
      const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const cat = await prisma.category.upsert({
        where: { slug },
        create: { slug, name },
        update: { name },
      });
      categoryMap[slug] = cat.id;
    }

    // Create tags
    for (const slug of tagSlugs) {
      const name = slug.charAt(0).toUpperCase() + slug.slice(1);
      const tag = await prisma.tag.upsert({
        where: { slug },
        create: { slug, name },
        update: { name },
      });
      tagMap[slug] = tag.id;
    }
  }

  for (const post of BLOG_POSTS_DATA) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would create: ${post.title}`);
      console.log(`    Categories: ${post.categorySlugs.join(", ")}`);
      console.log(`    Tags: ${post.tagSlugs.join(", ")}`);
    } else {
      try {
        // Create blog post
        const createdPost = await prisma.blogPost.upsert({
          where: { slug: post.slug },
          create: {
            slug: post.slug,
            title: post.title,
            metaTitle: `${post.title} | Snow Africa Adventure Blog`,
            metaDescription: post.excerpt.slice(0, 160),
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            isPublished: true,
            publishedAt: new Date(),
          },
          update: {
            title: post.title,
            metaTitle: `${post.title} | Snow Africa Adventure Blog`,
            metaDescription: post.excerpt.slice(0, 160),
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            isPublished: true,
          },
        });

        // Link categories
        await prisma.postCategory.deleteMany({
          where: { postId: createdPost.id },
        });
        for (const catSlug of post.categorySlugs) {
          if (categoryMap[catSlug]) {
            await prisma.postCategory.create({
              data: {
                postId: createdPost.id,
                categoryId: categoryMap[catSlug],
              },
            });
          }
        }

        // Link tags
        await prisma.postTag.deleteMany({
          where: { postId: createdPost.id },
        });
        for (const tagSlug of post.tagSlugs) {
          if (tagMap[tagSlug]) {
            await prisma.postTag.create({
              data: {
                postId: createdPost.id,
                tagId: tagMap[tagSlug],
              },
            });
          }
        }

        console.log(`  ✅ Migrated: ${post.title}`);
      } catch (error) {
        console.error(`  ❌ Error migrating ${post.slug}:`, error);
      }
    }
  }

  console.log(`\n  Total: ${BLOG_POSTS_DATA.length} blog posts`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const type = args.find(a => a.startsWith("--type="))?.split("=")[1];

  console.log("🚀 Enhanced WordPress Migration");
  console.log("================================");
  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No changes will be made\n");
  }

  try {
    if (!type || type === "all") {
      // Migrate in correct order: destinations first (for safari relations), then others
      await migrateDestinations(dryRun);
      await migrateRoutes(dryRun);
      await migrateSafaris(dryRun);
      await migrateDayTrips(dryRun);
      await migrateBlogPosts(dryRun);
    } else {
      switch (type) {
        case "routes":
          await migrateRoutes(dryRun);
          break;
        case "destinations":
          await migrateDestinations(dryRun);
          break;
        case "safaris":
          await migrateSafaris(dryRun);
          break;
        case "daytrips":
          await migrateDayTrips(dryRun);
          break;
        case "blog":
          await migrateBlogPosts(dryRun);
          break;
        default:
          console.error(`Unknown type: ${type}`);
          process.exit(1);
      }
    }
    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
