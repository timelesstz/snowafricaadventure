/**
 * Fix ALL Safari Itineraries with detailed descriptions
 *
 * Usage: npx tsx scripts/fix-all-safari-itineraries.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

// ============================================
// 2 DAYS TANZANIA LODGE SAFARI
// ============================================
const twoDay = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your Tanzanian safari adventure begins with a morning pickup from your hotel in Arusha. After meeting your experienced safari guide and a brief orientation, you'll embark on a scenic 2.5-hour drive to Tarangire National Park, one of Africa's most underrated wildlife destinations.

Tarangire is famous for having the highest concentration of elephants in Tanzania - during the dry season, herds of up to 300 elephants gather along the Tarangire River. The park's iconic landscape is dominated by ancient baobab trees, some over 1,000 years old, creating a dramatic backdrop for wildlife photography.

Your afternoon game drive explores the northern section of the park along the Tarangire River. Watch for large elephant herds, giraffes browsing the acacia trees, zebras, wildebeest, and Cape buffalo. The park is also home to elusive predators including lions, leopards, and cheetahs. Birdwatchers will be delighted by over 500 species, including colorful bee-eaters, lilac-breasted rollers, and massive kori bustards.

As the afternoon light turns golden, you'll witness one of Africa's most magical moments - elephants silhouetted against baobab trees at sunset. Continue to your comfortable lodge for a delicious dinner and overnight stay, falling asleep to the sounds of the African bush.`,
    accommodation: "Tarangire Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Massive elephant herds", "Ancient baobab trees", "Tarangire River wildlife", "500+ bird species", "Sunset game drive"],
  },
  {
    day: 2,
    title: "Ngorongoro Crater - Return to Arusha",
    description: `Rise early for a hearty breakfast before embarking on the journey to the Ngorongoro Crater, often called the "Eighth Wonder of the World." The drive takes you through the stunning Ngorongoro Conservation Area, home to Maasai pastoralists who live harmoniously with wildlife.

Arriving at the crater rim, you'll pause to take in the breathtaking panoramic views of this ancient volcanic caldera. The crater floor, 600 meters below, stretches 260 square kilometers and contains an estimated 25,000 large animals - the highest density of wildlife in Africa.

Your guide will navigate the steep descent road to the crater floor, where you'll spend the morning exploring this natural wonder. The Ngorongoro Crater is one of the few places where you have an excellent chance of seeing all of the Big Five in a single morning. The resident lion population is particularly impressive, with several large prides that have made the crater their permanent home.

Watch for endangered black rhinos grazing on the crater floor - only about 25 remain here, carefully protected by armed rangers. Hippos wallow in the Ngoitoktok Springs and the central Makat Lake, while thousands of flamingos paint the alkaline waters pink. Spotted hyenas, jackals, and elephants are commonly seen throughout the day.

After a picnic lunch with views of the hippo pool, continue exploring before ascending the crater walls and beginning your return journey to Arusha, arriving in the late afternoon with incredible memories of your safari experience.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Big Five opportunity", "Black rhino sighting chance", "Crater floor game drive", "Hippo pool", "Flamingo-filled lake"],
    isFeatured: true,
  },
];

// ============================================
// 3 DAYS BUDGET CAMPING SAFARI
// ============================================
const threeDayBudget = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your budget camping safari begins with an early morning pickup from Arusha. The drive to Tarangire National Park takes approximately 2.5 hours, passing through rural Tanzanian landscapes and Maasai villages where cattle herders tend their livestock as they have for centuries.

Tarangire National Park is a hidden gem, often overlooked by tourists heading straight to the Serengeti, but it offers some of Tanzania's most spectacular wildlife viewing. The park is renowned for its massive elephant population - during the dry season, hundreds of elephants congregate along the Tarangire River, creating unforgettable scenes.

Upon arrival, you'll enjoy a packed lunch before beginning your first game drive. The park's unique landscape features ancient baobab trees, some estimated to be over 2,000 years old, providing a stunning backdrop for wildlife photography. The riverine forest along the Tarangire River attracts a diverse array of animals seeking water and shade.

Your experienced guide will navigate the park's dirt tracks in search of wildlife. Look for tree-climbing pythons, large herds of buffalo, graceful impalas, and distinctive fringe-eared oryx. The park is also home to predators including lions, which are often spotted lounging on the branches of large trees during the heat of the day.

As the sun sets, you'll head to your campsite where your camp cook will prepare a delicious dinner under the stars. Fall asleep to the sounds of the African night - hyenas calling, elephants rumbling, and the distant roar of lions.`,
    accommodation: "Tarangire Public Campsite",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Elephant herds along the river", "Ancient baobab trees", "Tree-climbing lions", "Authentic bush camping", "Stunning sunset views"],
  },
  {
    day: 2,
    title: "Tarangire to Lake Manyara National Park",
    description: `After an early breakfast at camp, embark on a final morning game drive through Tarangire. The early morning hours are ideal for wildlife spotting as animals are most active before the heat of the day. Watch for predators returning from their nighttime hunts and herbivores gathering at water sources.

Mid-morning, depart Tarangire and drive to Lake Manyara National Park, a journey of about 1.5 hours. This compact but incredibly diverse park is nestled at the base of the Great Rift Valley escarpment, creating a stunning setting for wildlife viewing.

Lake Manyara is world-famous for its tree-climbing lions - a rare behavior that scientists believe developed due to the park's unique conditions. While not guaranteed, your guide will search the acacia woodlands for these remarkable cats lounging in the branches above.

The park encompasses several distinct ecosystems within its small area. Enter through lush groundwater forest where blue monkeys swing through the canopy and olive baboons forage along the roadside. The forest gives way to open grasslands and acacia woodland before reaching the alkaline lake itself.

Lake Manyara attracts thousands of flamingos when water levels are right, creating a spectacular pink ribbon along the shoreline. Large hippo pods spend their days wallowing in the lake's shallows, while elephants, giraffes, and buffalo roam the surrounding grasslands.

Your evening is spent at a campsite near the park, where you'll enjoy dinner around the campfire and share stories of the day's adventures with fellow travelers.`,
    accommodation: "Lake Manyara Public Campsite",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Tree-climbing lions", "Flamingo flocks", "Groundwater forest", "Rift Valley views", "Diverse ecosystems"],
  },
  {
    day: 3,
    title: "Ngorongoro Crater - Return to Arusha",
    description: `The grand finale of your safari awaits - the legendary Ngorongoro Crater. Rise before dawn to make the journey to the crater rim, stopping briefly to admire the stunning sunrise views over the Great Rift Valley.

The Ngorongoro Crater is a UNESCO World Heritage Site and one of Africa's most spectacular natural wonders. This ancient volcanic caldera, formed when a massive volcano collapsed millions of years ago, now shelters one of the most dense concentrations of wildlife on Earth. The crater floor spans 260 square kilometers and is home to approximately 25,000 large animals.

Your guide will carefully navigate the steep descent road, dropping 600 meters to the crater floor. The change in ecosystem is dramatic - from the cool, forested rim to the warm, grassy plains below. Almost immediately, you'll begin spotting wildlife: zebras and wildebeest graze alongside Thomson's gazelles, while lions survey their territory from atop grassy mounds.

The Ngorongoro Crater offers one of the best chances in Africa to spot the critically endangered black rhino. Only about 25-30 rhinos remain in the crater, protected by armed rangers who monitor them constantly. Your guide will do everything possible to locate these magnificent creatures.

Visit the Ngoitoktok Springs, where hippos spend their days in cool pools surrounded by lush vegetation. The central Makat Lake attracts thousands of flamingos, creating surreal pink reflections against the crater walls. Spotted hyenas are incredibly successful here, and you may witness them in action.

After a picnic lunch with panoramic views, ascend the crater and begin the return journey to Arusha, arriving in the late afternoon with memories to last a lifetime.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Black rhino sighting chance", "All Big Five possible", "Crater floor game drive", "Hippo pools", "Incredible value"],
    isFeatured: true,
  },
];

// ============================================
// 3 DAYS LODGE SAFARI
// ============================================
const threeDayLodge = [
  {
    day: 1,
    title: "Arusha to Lake Manyara National Park",
    description: `Your lodge safari begins with a morning pickup from your Arusha hotel. Your professional safari guide will brief you on the exciting days ahead as you drive toward the Great Rift Valley and Lake Manyara National Park.

The two-hour drive offers glimpses of rural Tanzania - coffee and banana plantations give way to Maasai lands where traditional red-robed herders tend their cattle. As you approach Lake Manyara, the dramatic Rift Valley escarpment rises 600 meters above the lake, creating a stunning backdrop for your safari.

Lake Manyara National Park, though one of Tanzania's smallest parks, packs incredible biodiversity into its compact area. The park stretches from the base of the escarpment to the lake shore, encompassing groundwater forests, acacia woodlands, and the alkaline lake itself.

Upon arrival, enjoy lunch at your lodge before beginning your afternoon game drive. The groundwater forest near the park entrance is home to troops of olive baboons and rare blue monkeys swinging through the canopy. As you emerge onto the open floodplains, watch for elephants, giraffes, and buffalo grazing the rich grasslands.

Lake Manyara is famous for its tree-climbing lions - while not guaranteed, your guide will search the acacia woodlands for these unusual cats. The lake itself attracts thousands of flamingos and other water birds, creating spectacular viewing opportunities.

Return to your comfortable lodge perched on the escarpment rim for dinner with panoramic views over the park and lake below.`,
    accommodation: "Lake Manyara Serena Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Tree-climbing lions", "Flamingo spectacle", "Rift Valley views", "Luxury lodge stay", "Blue monkey sightings"],
  },
  {
    day: 2,
    title: "Lake Manyara to Ngorongoro Conservation Area",
    description: `After breakfast overlooking Lake Manyara, descend to the park for an early morning game drive. The morning hours offer excellent wildlife activity as animals take advantage of the cooler temperatures. Watch for hippos returning to their daytime pools after a night of grazing.

Mid-morning, depart Lake Manyara and drive toward the Ngorongoro Conservation Area. The road climbs through lush highland forests before reaching the Ngorongoro Gate at over 2,000 meters elevation. The air is noticeably cooler here, a refreshing change from the warm lowlands.

Continue to your lodge on the crater rim, one of the most spectacular locations in Africa. The Ngorongoro Crater rim offers unobstructed views into the ancient caldera below, where thousands of animals appear as tiny dots moving across the grasslands 600 meters below.

Spend the afternoon at leisure, perhaps taking a guided walk along the crater rim (with lodge guide) or simply relaxing on your private veranda watching the play of light and shadow across the crater floor. The afternoon clouds often create dramatic scenes as they roll across the highlands.

As evening approaches, watch for elephants and buffalo emerging from the crater rim forests. The sunset from the rim is unforgettable - the crater floor glows golden as the sun dips below the western rim. Enjoy a gourmet dinner at your lodge while sharing stories of upcoming adventures with fellow travelers.

The night brings a symphony of sounds from the crater below - lions roaring, hyenas whooping, and elephants rumbling in the darkness.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Crater rim lodge", "Panoramic crater views", "Highland forests", "Spectacular sunset", "Sounds of wildlife"],
  },
  {
    day: 3,
    title: "Ngorongoro Crater Descent - Return to Arusha",
    description: `Today brings the highlight of your safari - a descent into the Ngorongoro Crater, often called the "Eighth Wonder of the World." Rise early for breakfast with views of the sun illuminating the crater floor below, then pack your camera and prepare for an unforgettable experience.

The descent road winds down the steep crater wall, dropping 600 meters through dense forest before emerging onto the crater floor. Almost immediately, you'll understand why Ngorongoro is considered one of Africa's premier wildlife destinations - the concentration of animals is simply staggering.

The crater floor supports approximately 25,000 large animals, including all of the Big Five. Lion prides control territories across the grasslands, and you'll likely see multiple prides during your visit. The crater is one of the best places in Tanzania to spot the critically endangered black rhino - only about 25 remain here, carefully monitored by rangers.

Your guide will navigate to various habitats within the crater. Visit the Lerai Forest, where elephants browse among yellow-barked fever trees. Stop at the hippo pool, where dozens of hippos spend their days wallowing in cool water. The soda lake at the crater's center attracts thousands of flamingos when conditions are right.

Spotted hyenas are remarkably successful hunters in the crater, and you may witness them pursuing prey or competing with lions at kills. Golden jackals, bat-eared foxes, and serval cats are also present, though more elusive.

After a picnic lunch with views of the crater, continue exploring until mid-afternoon before ascending the crater wall and beginning your return journey to Arusha. The drive takes approximately 4 hours, arriving in the early evening with unforgettable safari memories.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Big Five opportunity", "Black rhino sighting", "Crater floor game drive", "Flamingo-filled lake", "Picnic lunch with views"],
    isFeatured: true,
  },
];

// ============================================
// WALKING SAFARI & NGORONGORO TREKKING
// ============================================
const walkingSafari = [
  {
    day: 1,
    title: "Arusha to Ngorongoro Conservation Area",
    description: `Your unique walking safari adventure begins with a morning departure from Arusha. Unlike traditional vehicle-based safaris, this experience immerses you directly in the African wilderness on foot, offering an intimate connection with nature that vehicles simply cannot provide.

The drive to the Ngorongoro Conservation Area takes approximately 3-4 hours, climbing from the lowlands through coffee and banana plantations into the cool highlands. Stop at the Ngorongoro Gate to complete formalities and receive a briefing about the walking safari protocols.

Continue to your lodge or tented camp on the crater rim, where you'll meet your armed Maasai guide and park ranger who will accompany you throughout the walking portions of your adventure. These experienced guides have intimate knowledge of the landscape, wildlife behavior, and Maasai culture.

After lunch and settling in, take an introductory walk along the crater rim. Your guide will teach you to read animal tracks and signs, identify medicinal plants used by the Maasai, and understand the subtle sounds of the bush. This is walking safari at its finest - learning to see the details that vehicle-based tourists miss.

The rim walk offers stunning views into the crater below while traversing highland forest inhabited by elephants, buffalo, and endemic birds. Watch for augur buzzards soaring on the thermals and listen for the haunting calls of silvery-cheeked hornbills.

Return to your accommodation for dinner as the sun sets over the crater, painting the ancient caldera in shades of gold and purple.`,
    accommodation: "Ngorongoro Crater Rim Lodge or Tented Camp",
    meals: "Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1621414050345-53db43f7e7ab?w=800&q=80",
    highlights: ["Meet your Maasai guide", "Crater rim introduction walk", "Track reading lessons", "Highland forest exploration", "Stunning rim views"],
  },
  {
    day: 2,
    title: "Empakaai Crater Trek",
    description: `Today's adventure takes you to one of Tanzania's hidden gems - Empakaai Crater. This stunning volcanic crater is often overlooked by tourists, offering a pristine wilderness experience far from the crowds.

After an early breakfast, drive approximately 1.5 hours to Empakaai, passing through the Ngorongoro highlands where Maasai communities graze their cattle alongside wildlife. The landscape is dramatically beautiful - rolling green hills dotted with traditional Maasai bomas (villages) and herds of zebra and wildebeest.

At Empakaai, your real adventure begins. The trek descends approximately 300 meters into the crater, following ancient paths used by Maasai herders for generations. The crater walls are covered in dense montane forest, home to blue monkeys, bushbuck, and a remarkable variety of bird species.

The descent takes about 1-2 hours depending on pace and photography stops. As you emerge from the forest, the crater floor reveals a stunning soda lake that covers much of the caldera. Thousands of flamingos feed in the alkaline waters, creating a pink ribbon against the deep blue lake.

Walk along the lake shore, accompanied by your armed ranger and Maasai guide. The solitude here is profound - it's possible to spend hours without seeing another person. Watch for buffalo grazing near the lake and listen for the calls of fish eagles echoing off the crater walls.

After a picnic lunch beside the lake, begin the ascent back to the rim. The climb is challenging but rewarding, with frequent stops to catch your breath and admire the views. Return to your crater rim accommodation tired but exhilarated.`,
    accommodation: "Ngorongoro Crater Rim Lodge or Tented Camp",
    meals: "Breakfast, Lunch, Dinner",
    location: "Empakaai Crater",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    highlights: ["Hidden crater exploration", "300m descent trek", "Thousands of flamingos", "Remote wilderness experience", "Maasai cultural insights"],
    isFeatured: true,
  },
  {
    day: 3,
    title: "Ngorongoro Crater Game Drive - Return to Arusha",
    description: `Your walking safari concludes with a traditional vehicle game drive in the main Ngorongoro Crater - a perfect complement to your foot-based explorations of the previous days. After experiencing the bush intimately on foot, you'll appreciate even more the scale of wildlife in this remarkable caldera.

Rise early for breakfast, then drive to the descent point and enter the crater as the morning sun illuminates the floor below. The descent road drops 600 meters through forest before emerging onto the grasslands where thousands of animals roam.

Having walked through similar terrain over the past two days, you'll now have a deeper appreciation for the wildlife you encounter. Notice how animals behave differently around vehicles versus humans on foot. Your guide will point out tracks and signs similar to those you learned to identify while walking.

The Ngorongoro Crater offers excellent chances of seeing all Big Five in a single morning. Lions are abundant, with several large prides controlling territories across the crater floor. The critically endangered black rhino is also present - only about 25 remain here, carefully protected by rangers.

Visit the Ngoitoktok Springs and hippo pool, where dozens of hippos wallow away the day. The central Makat Lake attracts flamingos, creating scenes reminiscent of your Empakaai experience but on a grander scale. Watch for spotted hyenas, jackals, and the abundant plains game.

After a picnic lunch overlooking the crater, ascend the walls and begin your return journey to Arusha. The drive takes approximately 4 hours, arriving in the early evening. Your walking safari has given you a perspective on African wilderness that few tourists ever experience.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Big Five game drive", "Compare walking vs driving", "Black rhino search", "Crater floor exploration", "Unique safari perspective"],
    isFeatured: true,
  },
];

// ============================================
// 4 DAY SAFARI ADVENTURE
// ============================================
const fourDayAdventure = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your 4-day Tanzanian adventure begins with a morning pickup from your Arusha hotel. After meeting your experienced safari guide and receiving a briefing on the days ahead, you'll head southwest toward Tarangire National Park, approximately 2.5 hours away.

The journey takes you through the Maasai Steppe, where traditional herders tend their cattle alongside wildlife. Watch for zebra, wildebeest, and the occasional giraffe grazing in the acacia scrubland - a preview of the wildlife abundance awaiting you.

Tarangire National Park is named after the Tarangire River that flows through it, serving as a lifeline for wildlife during the dry season. The park is famous for having the largest elephant population in northern Tanzania - during peak season, herds of up to 300 elephants gather along the riverbanks.

After a picnic lunch in the park, begin your first game drive along the Tarangire River. The landscape is dominated by ancient baobab trees, some over 2,000 years old, creating a uniquely African panorama. These massive trees are often frequented by elephants who strip their bark for moisture during dry periods.

Watch for the park's diverse wildlife - buffalo, zebra, wildebeest, giraffe, and various antelope species. Tarangire is also home to predators including lions (which sometimes climb trees here), leopards, and cheetahs. The birdlife is exceptional, with over 500 species recorded including the endemic yellow-collared lovebird.

As the sun sets behind the baobabs, head to your lodge for dinner and overnight stay with the sounds of the African bush as your lullaby.`,
    accommodation: "Tarangire Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Massive elephant herds", "Ancient baobab trees", "Tarangire River wildlife", "500+ bird species", "Tree-climbing lions"],
  },
  {
    day: 2,
    title: "Tarangire to Serengeti National Park",
    description: `Today you'll journey to the legendary Serengeti, often considered the greatest wildlife sanctuary on Earth. After an early breakfast, depart Tarangire and drive northwest toward the Serengeti, a journey of approximately 5-6 hours with spectacular scenery throughout.

The route takes you through the Ngorongoro Conservation Area, climbing to the crater rim where you'll stop for photographs of the stunning caldera below. Continue through the highlands where Maasai communities live alongside wildlife, their colorful shúkàs (robes) visible against the green hills.

Descend to Olduvai Gorge, the "Cradle of Mankind," where the Leakey family made groundbreaking discoveries about human evolution. Visit the small museum to see fossil replicas and learn about the 1.8-million-year history of our ancestors in this region.

As you enter the Serengeti through the Naabi Hill Gate, the landscape transforms dramatically. The name "Serengeti" comes from the Maasai word meaning "endless plains," and you'll understand why as golden grasslands stretch to every horizon. During the Great Migration, up to 2 million wildebeest and zebra traverse these plains - one of nature's most spectacular phenomena.

Your evening game drive in the Serengeti's central Seronera area introduces you to this remarkable ecosystem. The Seronera River attracts wildlife year-round, making it an excellent place to spot lions, leopards, and cheetahs. As darkness falls, the sounds of the Serengeti come alive - lions roaring, hyenas calling, and jackals yipping in the distance.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Ngorongoro Crater views", "Olduvai Gorge visit", "Enter the endless plains", "Seronera game drive", "Big cat territory"],
    isFeatured: true,
  },
  {
    day: 3,
    title: "Full Day in Serengeti National Park",
    description: `Today is dedicated entirely to exploring the wonders of the Serengeti - with over 14,800 square kilometers of protected wilderness, there's always something incredible to discover. Your day begins before dawn, as the early morning hours offer the best opportunities to witness predators in action.

The Serengeti is home to the largest concentration of lions in Africa - an estimated 3,000 individuals organized into over 300 prides. Your guide will search for these magnificent cats at their favorite hunting grounds and resting spots. Watching a pride of lions emerge from the morning mist is an experience you'll never forget.

The Seronera area, where you're based, is famous for leopard sightings. These elusive cats often rest in the branches of sausage trees during the heat of the day - your guide knows exactly where to look. The rocky outcrops known as kopjes are favorite hunting platforms for cheetahs and provide excellent vantage points for wildlife viewing.

After a bush lunch in the shade of an acacia tree, continue your exploration. The afternoon brings different wildlife activity - elephants emerge from the woodlands to drink at waterholes, hippos begin their journey from rivers to nighttime grazing areas, and the predators start to wake from their midday rest.

If you're visiting during the Great Migration (typically July-October), you may witness the dramatic river crossings where wildebeest brave crocodile-infested waters. Even outside migration season, the Serengeti's resident wildlife populations ensure incredible game viewing year-round.

As another magical day draws to a close, position yourself for the famous Serengeti sunset - endless golden plains glowing beneath vast African skies.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    highlights: ["Full day game drives", "Lion pride encounters", "Leopard in the trees", "Cheetah on the kopjes", "Spectacular sunset"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Serengeti to Ngorongoro Crater - Return to Arusha",
    description: `Your final day combines two incredible experiences - a morning in the Serengeti and an afternoon descent into the Ngorongoro Crater. Rise early for a final game drive, perhaps searching for any species you haven't yet encountered or revisiting favorite locations from the previous day.

After breakfast, depart the Serengeti and drive to Ngorongoro. The journey takes approximately 3 hours, passing through the highlands with their dramatic scenery. Arriving at the crater rim, you'll descend the steep road to the caldera floor for an afternoon of wildlife viewing in this natural wonder.

The Ngorongoro Crater is a UNESCO World Heritage Site and one of Africa's most remarkable natural phenomena. This ancient volcanic caldera, measuring 19 kilometers across, shelters approximately 25,000 large animals including all of the Big Five. The high walls prevent most animals from leaving, creating an incredibly dense wildlife population.

Your afternoon game drive explores the crater's diverse habitats. Visit the Lerai Forest where elephants browse among yellow-barked fever trees. Watch for the critically endangered black rhino - only about 25 remain in the crater. The central Makat Lake attracts flamingos, while the Ngoitoktok Springs harbor large hippo populations.

Lions are abundant in the crater, with several large prides controlling territories across the floor. Spotted hyenas are remarkably successful hunters here - you may witness dramatic predator interactions. Golden jackals, bat-eared foxes, and servals are also present though more elusive.

After exploring the crater, ascend to the rim and begin your return journey to Arusha. The drive takes approximately 4 hours, arriving in the evening with memories of an unforgettable 4-day safari adventure.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Final Serengeti drive", "Ngorongoro Crater descent", "Big Five opportunity", "Black rhino search", "Complete safari experience"],
    isFeatured: true,
  },
];

// ============================================
// 4 DAYS SAFARI TO NGORONGORO AND SERENGETI
// ============================================
const fourDayNgorongoroSerengeti = [
  {
    day: 1,
    title: "Arusha to Ngorongoro Conservation Area",
    description: `Your safari adventure begins with a morning departure from Arusha, heading west toward the legendary Ngorongoro Conservation Area. The 3-hour drive takes you through the heart of Maasai country, where traditional pastoralists continue their centuries-old way of life alongside wildlife.

Climbing through the lush highlands, the landscape transforms from dry savanna to green rolling hills. Pass through small villages where life revolves around cattle, banana cultivation, and the daily rhythms that have remained unchanged for generations. Stop at viewpoints to photograph the vast landscape stretching before you.

Enter the Ngorongoro Conservation Area through the Lodoare Gate and continue to your lodge on the crater rim. At over 2,300 meters elevation, the air is crisp and cool - a refreshing change from the warm lowlands. The crater rim offers one of Africa's most spectacular views - the ancient caldera stretches 260 square kilometers below, home to approximately 25,000 large animals.

Spend the afternoon exploring the crater rim area. Take a guided nature walk through the highland forest, home to elephants, buffalo, and a remarkable variety of birds. Your guide will explain the geology of this ancient volcano that collapsed millions of years ago, creating the natural wonder you see today.

As evening approaches, watch the sunset paint the crater in shades of gold and purple. The sounds of wildlife drift up from the floor below - lions roaring, hyenas calling, and elephants rumbling. Enjoy dinner at your lodge while anticipating tomorrow's descent into this remarkable ecosystem.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Maasai highlands drive", "Crater rim views", "Highland forest walk", "Wildlife sounds from below", "Spectacular sunset"],
  },
  {
    day: 2,
    title: "Ngorongoro Crater Game Drive",
    description: `Today brings the highlight many consider the pinnacle of any African safari - a full-day game drive in the Ngorongoro Crater. Rise early to watch the sunrise illuminate the crater floor, then enjoy breakfast before the adventure begins.

The descent road winds down the steep crater wall, dropping 600 meters through dense forest before emerging onto the grasslands below. Almost immediately, the wildlife encounters begin - zebras and wildebeest graze alongside Thomson's gazelles, while lions survey their territory from atop grassy mounds.

The Ngorongoro Crater offers arguably the best Big Five viewing in Africa. Large lion prides control territories across the floor, and sightings are almost guaranteed. Elephants are common though most are solitary bulls - the steep crater walls discourage breeding herds with young calves. Leopards hunt in the Lerai Forest, though they require patience to spot.

The crater is one of the best places in Tanzania to see the critically endangered black rhino. Only about 25-30 individuals remain here, carefully monitored by armed rangers. Your guide will do everything possible to locate these magnificent creatures grazing on the crater floor.

Visit the Ngoitoktok Springs, a lush oasis where hippos wallow in cool pools surrounded by green vegetation. The central Makat Lake attracts thousands of flamingos when conditions are right, painting the waters pink. Spotted hyenas are incredibly successful hunters in the crater - you may witness dramatic predator encounters.

After a picnic lunch with panoramic views, continue exploring until late afternoon. The crater reveals different secrets throughout the day as animals move between feeding areas, water sources, and resting spots. Ascend the crater walls as the sun begins to set, carrying memories of an extraordinary day.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Full crater exploration", "Big Five opportunity", "Black rhino search", "Hippo pools", "Flamingo-filled lake"],
    isFeatured: true,
  },
  {
    day: 3,
    title: "Ngorongoro to Serengeti National Park",
    description: `Today you'll journey from the concentrated wildlife of Ngorongoro to the vast wilderness of the Serengeti. After breakfast, depart the crater rim and drive across the Ngorongoro highlands toward the Serengeti plains.

Stop at Olduvai Gorge, one of the world's most important archaeological sites. This steep-sided ravine in the Great Rift Valley has yielded fossil remains that revolutionized our understanding of human evolution. The Leakey family's discoveries here, including 1.8-million-year-old hominid remains, earned Olduvai the nickname "Cradle of Mankind." Visit the small museum to see fossils and learn about our ancient ancestors.

Continuing toward the Serengeti, the landscape transforms dramatically. As you descend from the highlands, the green hills give way to endless golden plains - the "Siringet" that the Maasai named for its endless expanse. During the Great Migration, up to 2 million wildebeest traverse these plains following the seasonal rains.

Enter the Serengeti through Naabi Hill Gate and immediately begin game viewing. The Serengeti's southern plains are home to large herds of plains game and the predators that follow them. Watch for cheetahs hunting on the open grasslands - they prefer this terrain where their speed gives them advantage.

Your evening game drive explores the central Seronera area, where the Seronera River attracts wildlife year-round. This region is famous for big cat encounters - lions, leopards, and cheetahs are all regularly spotted. As darkness falls, listen to the sounds of Africa's greatest wilderness surrounding your lodge.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    highlights: ["Olduvai Gorge visit", "Enter the endless plains", "Great Migration territory", "Seronera game drive", "Big cat country"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Serengeti - Return to Arusha",
    description: `Your final safari day begins early, maximizing your time in the Serengeti before the journey home. The early morning hours offer the best wildlife viewing as predators are still active from their nighttime hunts and the soft light creates perfect photography conditions.

Your guide will search for any species you haven't yet encountered, or revisit favorite locations from the previous evening. The Serengeti never disappoints - even on your final morning, surprising encounters await. Perhaps a leopard descending from its nighttime perch, a cheetah beginning its morning hunt, or a river crossing by wildebeest during migration season.

After breakfast at your lodge, begin the return journey to Arusha. The drive takes approximately 7-8 hours with stops, but the scenery makes the time pass quickly. Retrace your route through the Serengeti's southern plains, across the Ngorongoro highlands, and down to the warm lowlands around Arusha.

The return drive offers final opportunities for wildlife viewing - animals often surprise you along the route, and your guide will stop for any notable sightings. Watch the landscape transform from golden savanna to green highlands to agricultural lowlands as you return to civilization.

Arrive in Arusha in the late afternoon or early evening. Your guide will drop you at your hotel or continue to Kilimanjaro International Airport for your departure flight. Though your safari has ended, the memories of Ngorongoro's crater, the Serengeti's endless plains, and Tanzania's incredible wildlife will stay with you forever.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Serengeti to Arusha",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Early morning game drive", "Final wildlife encounters", "Scenic return journey", "Ngorongoro highlands", "Lasting memories"],
  },
];

// ============================================
// 5 DAYS LUXURY SAFARI
// ============================================
const fiveDayLuxury = [
  {
    day: 1,
    title: "Arrival in Arusha - Luxury Welcome",
    description: `Your luxury Tanzanian safari begins with a VIP welcome at Kilimanjaro International Airport. Your private guide and vehicle await to transfer you to one of Arusha's finest hotels, where champagne and a personal concierge greet your arrival.

The Arusha Coffee Lodge, set among a working coffee plantation, offers the perfect introduction to Tanzania's legendary hospitality. Your private plantation villa features a veranda overlooking the gardens, creating a serene setting to recover from your journey.

Depending on your arrival time, explore the coffee plantation with a guided tour explaining Tanzania's rich coffee heritage. Learn about the cultivation, harvesting, and processing of some of the world's finest Arabica beans. End with a tasting session featuring freshly roasted coffee from the plantation.

Alternatively, take a walking tour of local Maasai and Meru villages arranged exclusively for lodge guests. These cultural experiences offer authentic insights into traditional life, from handicraft demonstrations to shared meals with local families.

Your evening begins with sundowners overlooking the plantation as the sun sets behind Mount Meru. A gourmet dinner featuring local and international cuisine is served in the elegant restaurant, paired with fine wines selected by the lodge's sommelier. Retire to your villa for a restful night before your safari adventure begins.`,
    accommodation: "Arusha Coffee Lodge or similar (Luxury)",
    meals: "Dinner",
    location: "Arusha",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    highlights: ["VIP airport welcome", "Plantation villa accommodation", "Coffee estate tour", "Cultural village visit", "Gourmet welcome dinner"],
  },
  {
    day: 2,
    title: "Fly to Lake Manyara - Tree Lodge Experience",
    description: `After a leisurely breakfast, transfer to Arusha's domestic airstrip for your scenic flight to Lake Manyara. Flying safari offers a unique perspective on Tanzania's landscapes - watch as the patchwork of farms gives way to the dramatic Rift Valley escarpment and the gleaming waters of Lake Manyara far below.

Landing at Lake Manyara airstrip, you're met by your safari guide and luxury 4x4 vehicle. The drive to your lodge takes you through the park's groundwater forest, where your first wildlife sightings begin - troops of baboons, elegant bushbuck, and perhaps elephants browsing in the cool shade.

Lake Manyara Tree Lodge is one of Tanzania's most exclusive properties, featuring just 10 treehouse suites elevated above the forest floor. Your stilted suite offers private deck, infinity pool, and uninterrupted views into the forest canopy where monkeys play and birds call.

After settling in and lunch at the lodge, depart for your afternoon game drive. Lake Manyara is famous for its tree-climbing lions - your guide will search the acacia woodland for these unusual cats. The park's compact size means diverse ecosystems lie close together: groundwater forest, acacia woodland, open grassland, and the alkaline lake itself.

Return to your treehouse for sundowners on your private deck, watching the forest come alive at dusk. A gourmet dinner featuring locally-sourced ingredients is served under the stars, accompanied by the sounds of the African night.`,
    accommodation: "Lake Manyara Tree Lodge or similar (Luxury)",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Scenic flight over Rift Valley", "Exclusive treehouse lodge", "Private plunge pool", "Tree-climbing lions", "Forest dining experience"],
  },
  {
    day: 3,
    title: "Lake Manyara to Ngorongoro Crater Rim",
    description: `Rise at your leisure for breakfast in your treehouse or the main lodge deck. A final morning game drive explores areas of the park not visited yesterday, perhaps focusing on the lake shore where hippos wallow and flamingos feed.

Late morning, your guide drives you to the Ngorongoro Conservation Area. The route climbs through fertile farmland into the cool highlands, offering spectacular views back over Lake Manyara and the Rift Valley escarpment. Enter through Lodoare Gate and continue across the conservation area to your lodge on the crater rim.

&Beyond Ngorongoro Crater Lodge is considered one of Africa's most iconic safari properties. Perched on the rim of the crater, its baroque stilted suites offer floor-to-ceiling views directly into the caldera 600 meters below. Each suite features a personal butler, indoor and outdoor shower, and luxury amenities throughout.

After settling in, take a guided walk along the crater rim. The highland forest here is home to elephants, buffalo, and endemic birds found nowhere else on Earth. Your guide shares insights into the geology of this ancient volcano and the remarkable ecosystem it supports.

Sunset at Ngorongoro is unforgettable - watch the play of light across the crater floor as thousands of animals become tiny dots in the fading light. Dinner is a memorable affair, served in the dining room with its sweeping crater views, accompanied by fine wines and impeccable service.`,
    accommodation: "Ngorongoro Crater Lodge or similar (Luxury)",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Iconic crater rim lodge", "Personal butler service", "Crater floor views", "Guided rim walk", "World-class dining"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Ngorongoro Crater Exploration",
    description: `Today you'll descend into the Ngorongoro Crater, often called the "Eighth Wonder of the World." After breakfast with views of the sun illuminating the crater floor, your guide prepares your luxury 4x4 for the adventure ahead.

The descent road winds 600 meters down the crater wall, transitioning from cool forest to warm grassland. Unlike other parks where vehicles may be crowded, your luxury safari ensures a private vehicle and flexible schedule - stay as long as you like at each sighting without feeling rushed.

The crater floor supports approximately 25,000 large animals, including all of the Big Five. Lion sightings are virtually guaranteed, with several large prides controlling territories across the grasslands. The crater is one of the best places in Africa to spot endangered black rhino - only about 25 remain here.

Your guide has arranged a special bush breakfast in the crater - a gourmet spread set up beside the hippo pool with white linen, champagne, and cuisine prepared by your lodge's chef. Enjoy this once-in-a-lifetime dining experience surrounded by wildlife.

Continue exploring through the afternoon, visiting the Lerai Forest, the flamingo-filled Makat Lake, and searching for the elusive leopard. Ascend the crater as the sun begins to set, returning to your lodge for sundowners and another memorable dinner on the rim.`,
    accommodation: "Ngorongoro Crater Lodge or similar (Luxury)",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Full crater exploration", "Private luxury vehicle", "Bush champagne breakfast", "Big Five viewing", "Black rhino search"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Ngorongoro to Arusha - Departure",
    description: `Your final morning begins with a leisurely breakfast overlooking the crater - one last opportunity to absorb the magnificence of this natural wonder. Watch for wildlife movement on the floor below as you enjoy fresh pastries, tropical fruits, and Tanzanian coffee.

After breakfast, take a final walk along the crater rim or simply relax in your suite, enjoying the views from your private balcony. Your butler will ensure everything is packed and ready for departure.

Late morning, your guide drives you through the Ngorongoro highlands toward Arusha. The route offers final wildlife sightings - Maasai giraffe, zebra, and perhaps elephants browsing in the highland forests. Stop at scenic viewpoints for photographs and to bid farewell to this remarkable landscape.

Depending on your departure time, options include a visit to a Maasai cultural village for authentic interaction with local communities, a stop at a Tanzanite mine to learn about this rare gemstone found only in Tanzania, or lunch at a acclaimed restaurant in Arusha.

Your guide delivers you to Kilimanjaro International Airport or your Arusha hotel, marking the end of your luxury Tanzanian safari. Though brief, these five days have offered an immersion into Africa's finest wildlife experiences - from treehouse lodges above the forest to crater rim suites overlooking one of Earth's greatest natural wonders.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro to Arusha",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    highlights: ["Leisurely final morning", "Highland scenic drive", "Cultural visit option", "Tanzanite experience", "Seamless departure"],
  },
];

// ============================================
// 6 DAYS BUDGET CAMPING
// ============================================
const sixDayBudget = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your 6-day budget camping adventure begins early with pickup from your Arusha hotel. After meeting your experienced safari guide and cook - essential members of your camping team - you'll head southwest toward Tarangire National Park.

The 2.5-hour drive takes you through the Maasai Steppe, where traditional herders in red shúkàs tend their cattle alongside wildlife. Watch the landscape transform from the green slopes of Mount Meru to the dry acacia savanna that characterizes this region.

Tarangire National Park is often overlooked by tourists rushing to the Serengeti, but it offers some of Tanzania's most spectacular wildlife viewing at a fraction of the cost. The park is famous for having the highest elephant density in Tanzania - during the dry season, hundreds of elephants congregate along the Tarangire River.

After entering the park, enjoy a picnic lunch surrounded by ancient baobab trees, some over 2,000 years old. Your afternoon game drive explores the river corridor where elephants, buffalo, zebra, and giraffe gather. Watch for tree-climbing lions - an unusual behavior also seen at Lake Manyara - and the elusive leopard.

As the sun sets behind the baobabs, head to your campsite just outside the park. Your cook prepares a hearty dinner while you relax around the campfire, sharing stories and spotting stars in the unpolluted African sky. Fall asleep in your tent to the sounds of the bush - hyenas calling, elephants rumbling, and perhaps the distant roar of a lion.`,
    accommodation: "Tarangire Public Campsite",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Elephant paradise", "Ancient baobab trees", "Budget-friendly adventure", "Authentic camping", "Stargazing by campfire"],
  },
  {
    day: 2,
    title: "Tarangire to Lake Manyara National Park",
    description: `After an early breakfast at camp, return to Tarangire for a morning game drive. The cool early hours are prime time for wildlife activity - predators are still active from the night, and herbivores gather at water sources before the heat of day.

Search for any species you missed yesterday, or spend more time with the elephants that make this park so special. Watch for the park's diverse antelope species - eland, kudu, impala, and the peculiar fringe-eared oryx found only in this region.

Mid-morning, pack up camp and drive to Lake Manyara National Park, approximately 1.5 hours north. This compact park punches well above its weight, offering incredible biodiversity in its small area. The drive takes you along the dramatic Rift Valley escarpment, rising 600 meters above the lake.

After lunch at your campsite, enter Lake Manyara for an afternoon game drive. The park begins in lush groundwater forest, home to troops of baboons and rare blue monkeys. Emerging onto the floodplains, you'll encounter elephants, giraffes, buffalo, and zebra grazing the rich grasslands.

Lake Manyara is famous for its tree-climbing lions, though sightings require patience and luck. The alkaline lake attracts thousands of flamingos when water levels are right, creating a spectacular pink ribbon along the shore. Return to camp for dinner and another night under the stars.`,
    accommodation: "Lake Manyara Public Campsite",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Morning Tarangire game drive", "Rift Valley escarpment", "Groundwater forest", "Tree-climbing lions", "Flamingo spectacle"],
  },
  {
    day: 3,
    title: "Lake Manyara to Serengeti National Park",
    description: `Today you'll journey to the legendary Serengeti, Tanzania's crown jewel. After breakfast and breaking camp, the drive takes you up through the Ngorongoro highlands, with stops at the crater rim viewpoint to admire the ancient caldera.

Continue through the highlands where Maasai communities graze their cattle alongside wildlife. Descend to Olduvai Gorge, the "Cradle of Mankind," where discoveries by the Leakey family revolutionized our understanding of human evolution. Visit the museum to see fossil replicas and learn about our ancient ancestors.

Entering the Serengeti through Naabi Hill Gate, the landscape transforms into endless golden plains. The name "Serengeti" comes from the Maasai word meaning "endless plains" - and you'll understand why as grassland stretches to every horizon.

Your evening game drive explores the Seronera area, famous for its big cat population. The Seronera River attracts wildlife year-round, making this region particularly productive for game viewing. Lions, leopards, and cheetahs are all regularly spotted here.

Camp is set up in the Seronera public campsite, located in the heart of the park. There are no fences between you and the wildlife - elephants sometimes wander through camp, and lions can be heard roaring in the darkness. This is the authentic African safari experience.`,
    accommodation: "Serengeti Public Campsite (Seronera)",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Ngorongoro highlands", "Olduvai Gorge visit", "Enter the Serengeti", "Big cat country", "Wild camping experience"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Full Day in Serengeti National Park",
    description: `Today is dedicated entirely to exploring the Serengeti's boundless wilderness. Rise before dawn for an early morning game drive - the best time to witness predators in action before the heat of day drives them into shade.

The Serengeti hosts the highest concentration of large predators in Africa. With an estimated 3,000 lions, seeing these magnificent cats is almost guaranteed. Your guide will search their favorite territories - along river courses, around kopjes (rocky outcrops), and on the open plains where prides stake their claims.

Leopards are more elusive but regularly spotted in the Seronera area, often resting in the branches of sausage trees or yellow fever acacias. Cheetahs prefer the open grasslands where their incredible speed gives them hunting advantage - watching a cheetah sprint at 120 km/h is an unforgettable experience.

After a bush lunch in the shade of an acacia tree, continue exploring. The afternoon brings different wildlife activity as animals emerge from their midday rest. Elephants move to waterholes, hippos begin their journey to nighttime grazing areas, and the endless herds of wildebeest and zebra shift across the plains.

If visiting during the Great Migration (July-October), you may witness the dramatic river crossings that define this spectacle - millions of animals braving crocodile-infested waters in their eternal quest for fresh grazing. Return to camp for dinner around the campfire, trading stories of the day's incredible encounters.`,
    accommodation: "Serengeti Public Campsite (Seronera)",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    highlights: ["All-day game drives", "Big cat tracking", "Kopje exploration", "Migration territory", "Bush lunch"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Serengeti to Ngorongoro Conservation Area",
    description: `Make the most of your final Serengeti morning with an early game drive. The park reveals different secrets each day - today might bring sightings you'll remember forever. Perhaps a leopard with a kill hoisted in a tree, a cheetah teaching cubs to hunt, or a lion pride on the move.

After breakfast and breaking camp, begin the journey to Ngorongoro Conservation Area. The drive takes 3-4 hours, passing through the Serengeti's southern plains and climbing into the cool highlands.

Arriving at the crater rim in the afternoon, you'll camp at Simba Campsite - one of the most spectacular camping locations in Africa. At 2,300 meters elevation, the air is crisp and cool. The campsite sits right on the crater's edge, offering unobstructed views into the caldera 600 meters below.

Spend the late afternoon walking the crater rim (with an armed ranger if venturing far) and photographing the incredible views. The crater floor is home to approximately 25,000 large animals, appearing as tiny dots from this height.

As darkness falls, the stars emerge in their millions - the lack of light pollution makes for spectacular stargazing. Listen for the sounds of wildlife drifting up from the crater floor: hippos grunting, hyenas whooping, and perhaps the distant roar of a lion. Dinner around the campfire with views of the crater is an experience you'll never forget.`,
    accommodation: "Simba Campsite, Ngorongoro Crater Rim",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Final Serengeti drive", "Crater rim camping", "Spectacular views", "Stargazing paradise", "Wildlife sounds below"],
  },
  {
    day: 6,
    title: "Ngorongoro Crater - Return to Arusha",
    description: `The grand finale of your safari adventure begins with an early morning descent into the Ngorongoro Crater. Pack your tent in the pre-dawn darkness, then watch the sunrise illuminate the crater floor as you begin the steep descent.

The Ngorongoro Crater is a UNESCO World Heritage Site and one of Africa's most remarkable natural phenomena. This ancient volcanic caldera, measuring 19 kilometers across, supports the highest density of wildlife in Africa. Almost immediately upon reaching the floor, you'll understand why this is considered one of Earth's greatest natural wonders.

The crater offers excellent chances of seeing all Big Five in a single morning. Lions are abundant, with several large prides controlling territories across the grasslands. The critically endangered black rhino is also present - only about 25 remain here, carefully monitored by rangers. Your guide will do everything possible to locate these magnificent creatures.

Visit the Ngoitoktok Springs and hippo pool, where dozens of hippos spend their days in cool water. The central Makat Lake attracts thousands of flamingos, creating surreal pink reflections against the crater walls. Spotted hyenas are incredibly successful hunters here - you may witness dramatic predator interactions.

After a picnic lunch with panoramic views, continue exploring until early afternoon before ascending the crater walls. The return drive to Arusha takes approximately 4 hours, arriving in the evening with memories of an incredible 6-day adventure - accomplished at a budget that proves world-class safari doesn't require world-class prices.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Sunrise crater descent", "Big Five opportunity", "Black rhino search", "Incredible value", "Unforgettable memories"],
    isFeatured: true,
  },
];

// ============================================
// 6 DAYS MIGRATION SAFARI
// ============================================
const sixDayMigration = [
  {
    day: 1,
    title: "Arrival in Arusha",
    description: `Your Great Migration safari adventure begins with arrival at Kilimanjaro International Airport, where your safari representative greets you with a warm Tanzanian welcome. Transfer to your hotel in Arusha, the safari capital of Tanzania, where you'll meet your expert migration-tracking guide.

Arusha sits at the foot of Mount Meru, Tanzania's second-highest peak, and serves as the gateway to the Northern Safari Circuit. Depending on your arrival time, explore the town or relax at your hotel after your journey.

Your evening includes a comprehensive safari briefing covering the migration patterns, what to expect over the coming days, and essential information about the parks you'll visit. The Great Wildebeest Migration is one of nature's most spectacular phenomena - up to 2 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, move in a continuous cycle following the seasonal rains.

Your guide will explain how migration timing varies by season: December to March sees calving in the southern Serengeti and Ndutu area, with hundreds of thousands of calves born in a few weeks. July to October brings the dramatic river crossings in the northern Serengeti and Kenya's Masai Mara, where crocodiles await the crossing herds.

Enjoy a welcome dinner at your hotel while anticipating the adventures ahead. Tomorrow begins your journey into the heart of one of Earth's greatest wildlife spectacles.`,
    accommodation: "Gran Melia Arusha or similar",
    meals: "Dinner",
    location: "Arusha",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    highlights: ["Airport meet and greet", "Migration specialist guide", "Detailed safari briefing", "Migration timing explained", "Welcome dinner"],
  },
  {
    day: 2,
    title: "Arusha to Lake Manyara National Park",
    description: `After an early breakfast, your migration safari begins with a drive to Lake Manyara National Park. While not on the main migration route, Lake Manyara offers an excellent introduction to Tanzania's wildlife and serves as a perfect warm-up for the days ahead.

The two-hour drive takes you through the lush highlands around Arusha, passing coffee and banana plantations before descending to the dramatic Rift Valley escarpment. Lake Manyara sits at the base of this 600-meter wall, creating a stunning backdrop for your first game drive.

Lake Manyara National Park packs incredible biodiversity into its compact area. Enter through the lush groundwater forest where blue monkeys swing through the canopy and olive baboons forage along the forest floor. The forest gives way to acacia woodland and open floodplains before reaching the alkaline lake.

The park is famous for its tree-climbing lions - a behavior rarely seen elsewhere in Africa. Your guide will search the acacia branches for these unusual cats. Large elephant herds frequent the park, particularly during the dry season when they gather near water sources.

The lake itself attracts thousands of flamingos when conditions are right, creating a pink ribbon along the shore. Hippos wallow in the shallows, while pelicans, cormorants, and fish eagles hunt the waters. Return to your lodge on the escarpment rim for dinner with stunning views over the Rift Valley.`,
    accommodation: "Lake Manyara Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Rift Valley escarpment", "Tree-climbing lions", "Flamingo spectacle", "Groundwater forest", "Escarpment rim lodge"],
  },
  {
    day: 3,
    title: "Lake Manyara to Ndutu Area (Southern Serengeti)",
    description: `Today you enter migration territory as you drive to the Ndutu area in the southern Serengeti ecosystem. This region is the epicenter of the Great Migration calving season from December to March, when hundreds of thousands of wildebeest calves are born in a few short weeks.

The drive takes you through the Ngorongoro Conservation Area, with stops at the crater rim viewpoint to admire the ancient caldera. Continue across the short-grass plains of the Serengeti's southern reaches - during migration season, these plains are covered with wildebeest as far as the eye can see.

The Ndutu area straddles the boundary between the Ngorongoro Conservation Area and Serengeti National Park. The short-grass plains here provide ideal conditions for calving - open terrain allows mothers to spot approaching predators, and the nutritious grass supports lactating females.

Your afternoon game drive searches for migration herds and the predators that follow them. Lions, cheetahs, and hyenas concentrate here during calving season, taking advantage of vulnerable newborns. The drama of predator-prey interactions during this period is unmatched anywhere in Africa.

Even outside calving season, Ndutu offers excellent wildlife viewing. The area's lakes and marshes attract elephants, hippos, and abundant birdlife year-round. Return to your lodge as the sun sets over the endless plains, painting the grasslands in shades of gold and amber.`,
    accommodation: "Ndutu Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ndutu Area, Southern Serengeti",
    image: "https://images.unsplash.com/photo-1534177616064-ef1082e7f8d6?w=800&q=80",
    highlights: ["Enter migration territory", "Calving season epicenter", "Predator-prey action", "Endless wildebeest herds", "Dramatic plains scenery"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Full Day Migration Tracking in Ndutu/Serengeti",
    description: `Today is dedicated to following the Great Migration - your guide's expertise in tracking the herds ensures you're positioned for the best possible wildlife encounters. The migration's location varies daily as the animals follow rain and fresh grazing, making an experienced guide invaluable.

Begin with an early morning game drive, the best time for predator activity. During calving season, the dawn hours often bring dramatic hunting action as lions, cheetahs, and hyenas target the vulnerable young. Watching a cheetah sprint after a fleeing gazelle, or lions working together to take down a wildebeest, are experiences that define the African safari.

The scale of the migration is almost impossible to comprehend until you witness it firsthand. Herds stretching to the horizon, the constant grunting of wildebeest communicating, the dust clouds raised by millions of hooves - these sensory experiences stay with you forever.

Your guide will navigate to wherever the action is happening. Perhaps the herds are concentrated around a particular lake, or predators have made a kill that's attracting scavengers. The migration ecosystem includes not just the wildebeest but zebras, gazelles, and the predators and scavengers that depend on this annual bounty.

After a bush lunch in the field, continue tracking until the golden hour brings perfect photography light. The migration at sunset, with dust motes floating in the amber light and thousands of silhouetted animals against the African sky, creates images worthy of any wildlife documentary.`,
    accommodation: "Ndutu Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ndutu/Southern Serengeti",
    image: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    highlights: ["Expert migration tracking", "Predator hunting action", "Millions of wildebeest", "Bush lunch in the field", "Golden hour photography"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Ndutu to Ngorongoro Conservation Area",
    description: `After a final morning exploring the migration zone, begin your journey to the Ngorongoro Conservation Area. The morning game drive offers last chances to witness the migration's drama - perhaps a river crossing, a dramatic hunt, or simply the awe-inspiring sight of endless herds on the move.

The drive to Ngorongoro takes you across the short-grass plains, through the Ngorongoro Gate, and up into the cool highlands. Watch the landscape transform from golden savanna to green rolling hills as you gain elevation.

Arriving at the crater rim in the afternoon, you'll appreciate the dramatic change in scenery. The Ngorongoro Crater, a UNESCO World Heritage Site, offers a completely different safari experience from the migration's vast plains. Here, wildlife is concentrated in a natural amphitheater - 25,000 large animals in 260 square kilometers.

Spend the afternoon at your lodge on the crater rim, one of Africa's most spectacular locations. Walk along the rim (with guide) to explore the highland forest, home to elephants, buffalo, and endemic birds. The crater floor, visible 600 meters below, teems with wildlife that from this height appears as tiny moving dots.

Sunset at Ngorongoro is unforgettable - watch the shadows lengthen across the crater floor as the light fades. Listen for the sounds of wildlife drifting up from below: lions roaring, hyenas calling, and elephants rumbling. Dinner at your lodge offers final opportunities to reflect on the migration experiences of the past days.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Final migration viewing", "Crater rim arrival", "Highland forest walk", "Spectacular rim views", "Sunset over crater"],
  },
  {
    day: 6,
    title: "Ngorongoro Crater - Return to Arusha",
    description: `Your migration safari concludes with a descent into the Ngorongoro Crater, often called the "Eighth Wonder of the World." After breakfast with views of the crater, begin the steep descent to the caldera floor 600 meters below.

The Ngorongoro Crater offers a perfect counterpoint to the migration's vastness. Here, wildlife is concentrated in an enclosed ecosystem - a natural Eden where nearly every game drive delivers remarkable encounters. The crater floor supports all of the Big Five, with lion sightings virtually guaranteed.

The crater is one of the best places in Tanzania to see the critically endangered black rhino. Only about 25 individuals remain here, carefully monitored by armed rangers. Your guide will do everything possible to locate these magnificent creatures grazing on the crater floor.

Visit the Ngoitoktok Springs and hippo pool, where dozens of hippos wallow away the day. The central Makat Lake attracts flamingos, creating scenes reminiscent of Lake Manyara but in a more dramatic setting. Spotted hyenas are remarkably successful hunters in the crater - you may witness dramatic predator interactions.

After a picnic lunch with panoramic views, continue exploring until early afternoon before ascending the crater walls. The return drive to Arusha takes approximately 4 hours, arriving in the evening. Your migration safari has delivered two of Africa's greatest wildlife experiences - the vast spectacle of millions of animals on the move, and the concentrated wildlife paradise of the Ngorongoro Crater.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Crater floor game drive", "Big Five opportunity", "Black rhino search", "Picnic lunch with views", "Complete migration experience"],
    isFeatured: true,
  },
];

// ============================================
// 6 DAYS LODGE & LUXURY TENTED CAMP
// ============================================
const sixDayLodgeLuxury = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your luxury lodge safari begins with morning pickup from your Arusha hotel. After meeting your experienced guide, you'll travel southwest toward Tarangire National Park, one of Tanzania's hidden gems and home to the country's largest elephant population.

The 2.5-hour drive passes through rural Tanzania, where Maasai herders tend cattle alongside wildlife. The landscape transitions from the green slopes of Mount Meru to the dry acacia savanna characteristic of the Tarangire ecosystem.

Arriving at the park, you'll check into your lodge before lunch. Tarangire Safari Lodge sits on a bluff overlooking the Tarangire River, offering spectacular views of elephants and other wildlife from your private veranda. The lodge combines authentic safari atmosphere with comfortable amenities.

Your afternoon game drive explores the river corridor where Tarangire's famous elephants gather. During the dry season, herds of up to 300 individuals congregate here - one of the greatest elephant concentrations in Africa. Watch these gentle giants at play: bathing in the river, dust bathing to protect against parasites, and caring for their young.

The park's iconic baobab trees, some over 2,000 years old, create a uniquely African landscape. These massive trees are often visited by elephants who strip bark for moisture and nutrients. As the sun sets behind the baobabs, return to your lodge for sundowners and a gourmet dinner overlooking the river.`,
    accommodation: "Tarangire Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Largest elephant population", "Ancient baobab trees", "River-view lodge", "Sundowners overlooking wildlife", "Gourmet dinner"],
  },
  {
    day: 2,
    title: "Tarangire to Lake Manyara National Park",
    description: `After breakfast overlooking the river, enjoy a morning game drive through Tarangire. The early hours are ideal for wildlife activity - elephants move to water sources, predators complete their nighttime hunts, and the soft light creates perfect photography conditions.

Search for species you may have missed yesterday - tree-climbing lions, leopards in the riverine forest, or the rare fringe-eared oryx that makes Tarangire its home. The park's diverse habitats support over 500 bird species, making it a paradise for birders.

Mid-morning, depart for Lake Manyara National Park. The drive takes approximately 1.5 hours, passing along the dramatic Rift Valley escarpment. Check into your lodge perched on the escarpment rim, offering panoramic views over the park and lake 600 meters below.

After lunch, descend to Lake Manyara for an afternoon game drive. This compact park is remarkably diverse, transitioning from groundwater forest to acacia woodland to the alkaline lake shore within a short drive. Blue monkeys and baboons inhabit the forest, while elephants, giraffes, and buffalo roam the grasslands.

Lake Manyara is famous for its tree-climbing lions - a behavior scientists believe developed here due to unique conditions. The lake attracts thousands of flamingos when water levels are right, creating spectacular pink reflections. Return to your lodge for dinner as the sun sets over the Rift Valley.`,
    accommodation: "Lake Manyara Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Lake Manyara National Park",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    highlights: ["Morning Tarangire game drive", "Escarpment rim lodge", "Groundwater forest exploration", "Tree-climbing lions", "Flamingo spectacle"],
  },
  {
    day: 3,
    title: "Lake Manyara to Serengeti National Park",
    description: `Today you'll journey to the legendary Serengeti, often considered the greatest wildlife sanctuary on Earth. After breakfast, the drive takes you up through the Ngorongoro highlands, with a stop at the crater rim for photographs of the ancient caldera.

Continue to Olduvai Gorge, the "Cradle of Mankind," where the Leakey family's discoveries revolutionized our understanding of human evolution. Visit the museum to see fossil replicas and learn about our 1.8-million-year-old ancestors.

Entering the Serengeti through Naabi Hill Gate, the landscape transforms into endless golden plains stretching to every horizon. The Serengeti's vastness is overwhelming - 14,800 square kilometers of protected wilderness supporting the greatest concentration of large mammals on Earth.

Check into your luxury tented camp in the Seronera area, the heart of the Serengeti. These permanent camps offer an authentic safari experience with modern comforts - spacious canvas tents with proper beds, en-suite bathrooms, and private verandas overlooking the African bush.

Your evening game drive explores the Seronera Valley, famous for its resident big cat population. The Seronera River attracts wildlife year-round, and predators concentrate here regardless of migration timing. Watch for lions at sunset, perhaps resting on a kopje (rocky outcrop) surveying their territory as darkness falls.`,
    accommodation: "Serengeti Luxury Tented Camp or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Ngorongoro Crater viewpoint", "Olduvai Gorge visit", "Endless Serengeti plains", "Luxury tented camp", "Seronera big cats"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Full Day in Serengeti National Park",
    description: `Today is dedicated entirely to exploring the Serengeti's wonders. Your day begins before dawn, as the early morning hours offer the best chances of witnessing predators in action. Pack a breakfast to eat in the field - your guide knows the perfect spot.

The Serengeti hosts an estimated 3,000 lions, and your guide will search their favorite territories. Lion prides control areas along river courses, around kopjes, and on the open plains. Watching a pride wake from their nighttime activities, stretching and grooming in the morning light, is a quintessential safari experience.

Leopards are more elusive but regularly spotted in the Seronera area. Your guide knows the trees where they like to rest - sausage trees and fever acacias that provide shade and safety. The Serengeti's open plains are cheetah territory, where these incredible cats use their speed to hunt gazelles and small antelope.

After a bush lunch in the shade of an acacia, continue exploring different areas of the park. The Serengeti's kopjes - ancient granite outcrops rising from the plains - are wildlife magnets. Lions use them as vantage points, hyrax colonies inhabit the crevices, and agama lizards display their colorful markings on sun-warmed rocks.

The afternoon brings different wildlife activity. Elephants emerge from woodlands to drink, hippos leave their daytime pools for nighttime grazing, and the plains game - wildebeest, zebra, gazelles - shift across the landscape. Return to camp for sundowners and dinner under the African stars.`,
    accommodation: "Serengeti Luxury Tented Camp or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    highlights: ["All-day game drives", "Big cat tracking", "Bush breakfast", "Kopje exploration", "Sundowners in the bush"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Serengeti to Ngorongoro Conservation Area",
    description: `Maximize your Serengeti time with a final morning game drive before departing. The park often saves its best surprises for the final hours - perhaps a leopard descending from its nighttime perch, a cheetah beginning its morning hunt, or a massive elephant herd crossing the plains.

After breakfast and farewell to your tented camp, drive to the Ngorongoro Conservation Area. The journey takes approximately 3 hours, climbing from the warm Serengeti plains into the cool highlands. Watch the landscape transform as you gain elevation.

Your lodge sits on the rim of the Ngorongoro Crater, one of Africa's most spectacular locations. The Ngorongoro Serena Safari Lodge offers rooms with private balconies overlooking the crater floor 600 meters below. The views are simply staggering.

Spend the afternoon at leisure or take a guided walk along the crater rim. The highland forest here is home to elephants, buffalo, and endemic birds. The Crater Lodge guides share insights into the geology and ecology of this ancient volcanic caldera.

As evening approaches, watch the shadows lengthen across the crater floor. The sounds of wildlife drift up from below - lions roaring, hyenas calling, elephants rumbling. Dinner in the lodge restaurant, with floor-to-ceiling windows overlooking the crater, is an unforgettable experience.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Final Serengeti game drive", "Crater rim lodge", "Spectacular crater views", "Guided rim walk", "Sunset over crater"],
  },
  {
    day: 6,
    title: "Ngorongoro Crater - Return to Arusha",
    description: `Your safari concludes with a descent into the Ngorongoro Crater, often called the "Eighth Wonder of the World." After breakfast overlooking the crater, drive to the descent point and begin the journey to the floor 600 meters below.

The Ngorongoro Crater is a UNESCO World Heritage Site and one of Africa's most remarkable natural phenomena. The crater floor spans 260 square kilometers and supports approximately 25,000 large animals - the highest density of wildlife in Africa.

Your morning game drive offers excellent chances of seeing all Big Five. Lions are abundant, with several large prides controlling territories across the grasslands. The crater is one of the best places in Tanzania to spot endangered black rhino - only about 25 remain here. Elephants are common, though mostly solitary bulls.

Visit the Ngoitoktok Springs and hippo pool, where dozens of hippos wallow in cool water surrounded by lush vegetation. The central Makat Lake attracts flamingos when conditions are right. Spotted hyenas are remarkably successful hunters in the crater - you may witness dramatic predator interactions.

After a picnic lunch with panoramic crater views, continue exploring until early afternoon. Ascend the crater walls and begin your return journey to Arusha. The 4-hour drive arrives in the early evening, marking the end of a safari that has showcased the finest of Tanzania's wildlife destinations - from Tarangire's elephants to the Serengeti's endless plains to the natural wonder of Ngorongoro.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Crater floor exploration", "Big Five opportunity", "Black rhino search", "Hippo pools", "Complete safari experience"],
    isFeatured: true,
  },
];

// ============================================
// 6 DAYS TARANGIRE NGORONGORO SERENGETI
// ============================================
const sixDayTarangireNgorongoroSerengeti = [
  {
    day: 1,
    title: "Arusha to Tarangire National Park",
    description: `Your Northern Circuit safari adventure begins in Arusha, Tanzania's safari capital. After meeting your experienced guide at your hotel, you'll depart for Tarangire National Park, approximately 2.5 hours southwest.

The drive passes through the Maasai Steppe, where traditional herders in distinctive red clothing tend their cattle alongside wildlife. This is a preview of the seamless coexistence between people and nature that characterizes Tanzania's northern parks.

Tarangire is often overlooked by visitors rushing to the Serengeti, but it offers some of Tanzania's most spectacular wildlife viewing. The park is named after the Tarangire River, a lifeline that draws wildlife from across the region during the dry season.

After entering the park, enjoy a picnic lunch surrounded by the ancient baobab trees that define Tarangire's landscape. These massive trees, some estimated to be over 2,000 years old, create a uniquely African panorama. Watch for elephants approaching the baobabs - they often strip bark for moisture and nutrients.

Your afternoon game drive follows the Tarangire River, where the park's famous elephant herds gather. Tarangire boasts the highest elephant density in Tanzania - during peak season, herds of 300 or more congregate along the riverbanks. Buffalo, zebra, wildebeest, and giraffe share the water sources with their gentle giant neighbors.

As the golden hour approaches, watch for predators becoming active. Tarangire's lions occasionally climb trees, a behavior also seen at Lake Manyara. Return to your lodge as the sun sets behind the baobabs.`,
    accommodation: "Tarangire Safari Lodge or similar",
    meals: "Lunch, Dinner",
    location: "Tarangire National Park",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    highlights: ["Elephant paradise", "Ancient baobab landscape", "Tarangire River wildlife", "Tree-climbing lions", "Sunset game drive"],
  },
  {
    day: 2,
    title: "Tarangire to Ngorongoro Conservation Area",
    description: `Rise early for a morning game drive through Tarangire, when wildlife is most active. The cool dawn hours bring elephants to the river, predators returning from nighttime hunts, and birds in full chorus. Search for any species you missed yesterday - perhaps a leopard in the riverine forest or a cheetah on the open plains.

Mid-morning, depart Tarangire and drive north toward the Ngorongoro Conservation Area. The route takes you through the town of Mto wa Mbu ("River of Mosquitoes"), a vibrant market town where multiple tribes - Maasai, Iraqw, Datooga, and others - live and trade together.

Climb into the Ngorongoro highlands, where the air grows cooler and the vegetation lusher. The forest-clad rim of the Ngorongoro Crater rises ahead, one of the most spectacular sights in Africa. Check into your lodge on the crater rim and enjoy lunch with views into the caldera.

Spend the afternoon exploring the crater rim area. Take a guided nature walk through the highland forest, home to elephants, buffalo, bushbuck, and endemic birds. The forest atmosphere is mystical - giant heather trees draped in old man's beard lichen, colorful turacos flashing through the canopy.

As evening approaches, find a viewpoint to watch the sunset over the crater. The floor, 600 meters below, glows gold in the fading light, while thousands of animals appear as tiny dots moving across the grasslands. Dinner at your lodge offers continued views of this natural wonder.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Conservation Area",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    highlights: ["Morning Tarangire drive", "Mto wa Mbu town", "Highland forest walk", "Crater rim views", "Spectacular sunset"],
  },
  {
    day: 3,
    title: "Ngorongoro Crater Game Drive",
    description: `Today brings the highlight many consider the pinnacle of any African safari - a full game drive in the Ngorongoro Crater. After an early breakfast watching the sun illuminate the crater floor, prepare for an extraordinary day.

The descent road winds 600 meters down the steep crater wall, passing through forest before emerging onto the grasslands below. The transformation is dramatic - from cool, misty heights to warm, wildlife-filled plains within minutes.

The Ngorongoro Crater is a UNESCO World Heritage Site supporting approximately 25,000 large animals - the highest density of wildlife in Africa. This ancient volcanic caldera, measuring 19 kilometers across, is essentially a natural Eden where nearly every species of East African plains game thrives.

Your guide will navigate to the crater's various habitats. The Lerai Forest harbors elephants and leopards among the yellow-barked fever trees. The Ngoitoktok Springs attract hippos and abundant birdlife. The central Makat Lake shimmers with flamingos when conditions are right.

The crater offers excellent chances of seeing all Big Five. Lions are abundant - you'll likely see multiple prides. The critically endangered black rhino is present, with about 25 individuals carefully monitored by rangers. Elephants, though mostly solitary bulls, are regularly seen, while buffalo and leopards complete the list.

After a picnic lunch with crater views, continue exploring until late afternoon. Ascend the crater walls as the shadows lengthen, carrying memories of an extraordinary day.`,
    accommodation: "Ngorongoro Serena Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Ngorongoro Crater",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: ["Full crater exploration", "Big Five opportunity", "Black rhino search", "Flamingo-filled lake", "Hippo pools"],
    isFeatured: true,
  },
  {
    day: 4,
    title: "Ngorongoro to Serengeti National Park",
    description: `After breakfast, depart the crater rim for the legendary Serengeti. The drive takes approximately 3-4 hours, but the scenery makes the time pass quickly. Cross the Ngorongoro highlands where Maasai graze their cattle alongside wildlife, then descend toward the endless Serengeti plains.

Stop at Olduvai Gorge, one of the world's most important archaeological sites. Here, the Leakey family made discoveries that revolutionized our understanding of human evolution. Visit the small museum to see fossil replicas and learn about our 1.8-million-year-old ancestors who walked these same plains.

Entering the Serengeti through Naabi Hill Gate, the landscape transforms dramatically. The name "Serengeti" comes from the Maasai word meaning "endless plains" - and you'll understand why as golden grassland stretches to every horizon. During the Great Migration, up to 2 million wildebeest traverse these plains.

Check into your lodge in the Seronera area, the heart of the Serengeti. This central location offers excellent year-round wildlife viewing, as the Seronera River attracts animals regardless of migration timing.

Your evening game drive explores Seronera's famous big cat territory. This area hosts the highest density of leopards in Africa, and your guide knows where to find them. Lions control territories along the river, while cheetahs hunt the nearby plains. As darkness falls, the sounds of the Serengeti come alive around you.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80",
    highlights: ["Olduvai Gorge visit", "Enter the Serengeti", "Endless plains scenery", "Seronera game drive", "Big cat territory"],
    isFeatured: true,
  },
  {
    day: 5,
    title: "Full Day in Serengeti National Park",
    description: `Today offers a full day to explore the Serengeti's boundless wilderness. Rise before dawn for an early morning game drive - the best time to witness predators at their most active, before the heat of day drives them into shade.

The Serengeti is home to approximately 3,000 lions organized into over 300 prides. Your guide will search their favorite territories - river corridors, kopjes, and open plains where prides stake their claims. Watching a pride of lions in the soft morning light is one of Africa's quintessential experiences.

The Seronera area is famous for leopard sightings. These elusive cats rest in the branches of sausage trees and fever acacias during the day. Your guide knows exactly where to look, and patience often rewards visitors with exceptional viewing. Cheetahs prefer the open grasslands where their speed gives them advantage.

After a bush lunch in the shade of an acacia tree, continue your exploration. The afternoon brings different wildlife activity - elephants emerge from woodland to drink, hippos leave their daytime pools, and the predators begin to stir from their rest.

If visiting during the Great Migration (typically July-October in the northern Serengeti), you may witness dramatic river crossings. Even outside migration season, the Serengeti's resident wildlife ensures incredible viewing. Watch the famous Serengeti sunset paint the endless plains in shades of gold and amber.`,
    accommodation: "Serengeti Safari Lodge or similar",
    meals: "Breakfast, Lunch, Dinner",
    location: "Serengeti National Park",
    image: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80",
    highlights: ["All-day game drives", "Big cat tracking", "Bush lunch", "Migration territory", "Spectacular sunset"],
    isFeatured: true,
  },
  {
    day: 6,
    title: "Serengeti - Return to Arusha",
    description: `Your final day begins with an early morning game drive, making the most of your remaining time in the Serengeti. The park often saves its best surprises for these last hours - perhaps a leopard with a fresh kill, a cheetah beginning its morning hunt, or a river crossing if you're visiting during migration season.

After breakfast at your lodge, begin the return journey to Arusha. The drive takes approximately 7-8 hours with stops, but the scenery makes the time pass quickly. Retrace your route across the Serengeti's southern plains, through the Ngorongoro highlands, and down to the warm lowlands around Arusha.

The return drive offers final opportunities for wildlife sightings. The route passes through prime animal habitat, and your guide will stop for any notable encounters. Watch the landscape transform from golden savanna to green highlands to agricultural lowlands as you return to civilization.

Optional stops along the way include Maasai cultural villages for authentic interactions, viewpoints overlooking the Great Rift Valley, and the bustling markets of local towns. Your guide can tailor the return journey to your interests.

Arrive in Arusha in the late afternoon or early evening. Your guide will deliver you to your hotel or continue to Kilimanjaro International Airport for your departure flight. Your 6-day safari has delivered the finest of Tanzania's Northern Circuit - the elephants of Tarangire, the concentrated wildlife of Ngorongoro, and the endless wonder of the Serengeti.`,
    accommodation: "End of safari",
    meals: "Breakfast, Lunch",
    location: "Serengeti to Arusha",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    highlights: ["Final game drive", "Scenic return journey", "Optional cultural stops", "Rift Valley views", "Complete Northern Circuit"],
  },
];

// Continue with remaining safaris in Part 2...
// For brevity, I'll include the update function and add remaining safaris

const allItineraries: Record<string, any[]> = {
  "2-days-tanzania-lodge-safari": twoDay,
  "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater": threeDayBudget,
  "3-days-tanzania-lodge-safari-tarangire-lake-manyara-ngorongoro-crater": threeDayLodge,
  "walking-safari-trekking-on-ngorongoro": walkingSafari,
  "4-day-safari-adventure-in-tanzania": fourDayAdventure,
  "4-days-safari-to-ngorongoro-and-serengeti": fourDayNgorongoroSerengeti,
  "5-days-tanzania-luxury-safarilake-manyara-serengeti-ngorongoro": fiveDayLuxury,
  "6-days-5-nights-budget-camping-safari-tarangire-lake-manyara-serengeti-and-ngorongoro-crater": sixDayBudget,
  "6-days-tanzania-migration-safari-ndutu-manyara-serengeti-ngorongoro-crater": sixDayMigration,
  "6-days-tanzania-lodge-and-luxury-tented-camp-safaritarangire-lake-manyara-serengeti-ngorongoro-crater": sixDayLodgeLuxury,
  "6-days-safari-to-tarangire-ngorongoro-serengeti-central-north": sixDayTarangireNgorongoroSerengeti,
};

async function updateAllItineraries() {
  console.log("🦁 Updating ALL Safari Itineraries...\n");
  console.log("=".repeat(60));

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const [slug, itinerary] of Object.entries(allItineraries)) {
    try {
      const result = await prisma.safariPackage.updateMany({
        where: { slug },
        data: { itinerary },
      });

      if (result.count > 0) {
        const avgLength = Math.round(
          itinerary.reduce((sum: number, day: any) => sum + (day.description?.length || 0), 0) / itinerary.length
        );
        console.log(`✅ ${slug.substring(0, 50)}...`);
        console.log(`   ${itinerary.length} days, avg ${avgLength} chars/day`);
        updated++;
      } else {
        console.log(`⚠️ Not found: ${slug}`);
        notFound++;
      }
    } catch (error) {
      console.error(`❌ Error: ${slug}`, error);
      errors++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️ Not found: ${notFound}`);
  console.log(`❌ Errors: ${errors}`);

  // Show remaining safaris that need manual update
  const remaining = [
    "7-days-tanzania-tented-camp-safari",
    "7-days-safari-to-tanzania-serval-wildlife",
    "8-days-wonders-of-tanzania-safari",
    "9-days-tanzania-wildlife-safari",
    "10-day-adventure-in-tanzania-safari-zanzibar",
  ];

  console.log(`\n⚠️ Remaining safaris need separate update: ${remaining.length}`);
  remaining.forEach(s => console.log(`   - ${s}`));

  await prisma.$disconnect();
}

updateAllItineraries().catch(console.error);
