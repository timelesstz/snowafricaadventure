import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE
});

// Detailed itineraries for remaining 7-10 day safaris
const safariItineraries: Record<string, any[]> = {
  "7-days-tanzania-tented-camp-safari": [
    {
      day: 1,
      title: "Arrival in Arusha – Gateway to Safari",
      description: `Your Tanzanian adventure begins as you arrive at Kilimanjaro International Airport, where the distant silhouette of Africa's highest peak welcomes you to this land of extraordinary wildlife. Your professional safari guide greets you with a warm "Karibu" – welcome in Swahili – and escorts you to your comfortable vehicle for the scenic drive to Arusha.

As you travel through the lush countryside, your guide shares insights about the week ahead, the parks you'll explore, and the incredible wildlife encounters that await. The drive offers glimpses of local life – Maasai herders with their cattle, bustling markets, and small farms growing coffee and bananas on the fertile volcanic slopes.

Arriving at your lodge, set against the backdrop of Mount Meru, you settle into your room and enjoy your first taste of Tanzanian hospitality. The afternoon is yours to relax by the pool, explore the beautiful gardens, or simply rest from your journey. In the evening, gather for a safari briefing over dinner, where your guide explains what to expect and answers your questions about the adventures ahead.`,
      location: "Arusha",
      accommodation: "Arusha Safari Lodge",
      meals: "Dinner",
      highlights: ["Airport pickup", "Mount Meru views", "Safari briefing", "Welcome dinner"],
      isFeatured: false
    },
    {
      day: 2,
      title: "Tarangire National Park – Land of Giants",
      description: `After an early breakfast, you depart for Tarangire National Park, a two-hour drive through colorful Maasai villages and sweeping savanna landscapes. As you enter the park, the first thing that captures your attention is the sheer number of elephants – Tarangire hosts one of the largest elephant populations in Africa.

Your morning game drive follows the Tarangire River, the park's lifeline that draws thousands of animals during the dry season. Watch as massive elephant herds gather at the riverbank, spraying themselves with mud and water while young calves play nearby. The ancient baobab trees, some over 1,000 years old, create an otherworldly backdrop to the wildlife scenes.

Continue exploring through acacia woodlands where giraffes browse on thorny leaves, their long purple tongues expertly avoiding the sharp spines. Lions often rest in the shade of these trees, conserving energy for evening hunts. Keep watch for leopards draped over branches – Tarangire offers excellent leopard sightings.

After a picnic lunch under the shade of a massive baobab, your afternoon game drive explores different areas of the park. The swamps attract buffalo, waterbuck, and reedbuck, while the open plains are home to zebra, wildebeest, and the gorgeous fringe-eared oryx. As the golden afternoon light bathes the landscape, you exit the park and drive to your tented camp in the surrounding area.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Safari Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Elephant herds", "Ancient baobabs", "Big cats", "Picnic lunch"],
      isFeatured: true
    },
    {
      day: 3,
      title: "Lake Manyara National Park – Tree-Climbing Lions",
      description: `Leaving Tarangire behind, you travel along the Great Rift Valley escarpment to Lake Manyara National Park. The journey offers spectacular views across the valley floor, where the soda lake shimmers in the distance and flamingos create pink borders along its edges.

Entering the park through lush groundwater forest, the dramatic change in vegetation is immediate. Huge mahogany trees draped with vines create a cool canopy, and blue monkeys swing through the branches while olive baboons forage on the forest floor. This is one of the few places where you might spot the shy bushbuck.

The forest gives way to acacia woodland, where Lake Manyara's famous tree-climbing lions are sometimes spotted lounging in the branches – a behavior still not fully understood by scientists. Your guide knows the best spots to search for these unusual felines, and the excitement of spotting a lion in a tree is unforgettable.

At the lakeshore, the scenery transforms again. Thousands of flamingos wade in the shallows, their pink feathers creating a stunning contrast against the blue water. Hippos wallow near the shore, and pelicans glide overhead. The lake also attracts impressive numbers of elephants, especially during the afternoon.

After a full day of exploration, you drive up the escarpment to your tented camp near the village of Mto wa Mbu, where the evening unfolds with traditional dinner and stories under the stars.`,
      location: "Lake Manyara National Park",
      accommodation: "Lake Manyara Tented Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Tree-climbing lions", "Flamingo flocks", "Groundwater forest", "Rift Valley views"],
      isFeatured: false
    },
    {
      day: 4,
      title: "Serengeti National Park – Endless Plains",
      description: `Today marks the beginning of your Serengeti adventure. After breakfast, you drive through the Ngorongoro Conservation Area, stopping at the crater rim for breathtaking views before descending into the Serengeti ecosystem. The name Serengeti comes from the Maasai word "siringet," meaning endless plains – and as the landscape opens before you, you understand why.

The drive to your tented camp is a game drive in itself. Keep your camera ready as you cross the short-grass plains where cheetahs hunt Thomson's gazelles, secretary birds stride through the grass, and bat-eared foxes peer from their burrows. If you're visiting during the Great Migration season, you may witness thousands upon thousands of wildebeest and zebra moving across the plains in one of nature's greatest spectacles.

Arriving at your tented camp in the central Serengeti (Seronera), you settle into your canvas accommodation – complete with comfortable beds, en-suite facilities, and a private veranda overlooking the savanna. After lunch and a brief rest, your afternoon game drive focuses on the Seronera River Valley, known as the "Big Cat Capital" for its exceptional lion and leopard populations.

The Seronera Valley's acacia forests and kopjes (rocky outcrops) provide perfect habitat for predators. Lions lounge on the warm rocks, leopards rest in the fig trees along the river, and cheetahs scan the plains from termite mounds. As the sun sets, painting the sky in shades of orange and gold, you return to camp for dinner around the campfire.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Tented Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Endless plains", "Big cat sightings", "Migration herds", "Sundowner"],
      isFeatured: true
    },
    {
      day: 5,
      title: "Full Day Serengeti Exploration",
      description: `A full day in the Serengeti offers the opportunity to explore different ecosystems and maximize your wildlife encounters. With a packed breakfast, you set off before sunrise to catch the predators at their most active – this is prime time for witnessing hunts and enjoying the magical golden light of early morning.

Your guide navigates based on the latest animal sightings and movements. Perhaps you'll follow a coalition of male lions as they patrol their territory, or watch a cheetah mother teaching her cubs to hunt. The Serengeti's open plains make for exceptional game viewing, as animals are easily spotted across the vast landscape.

Mid-morning brings activity around waterholes, where elephants, buffalo, and antelope come to drink. Crocodiles lurk in the rivers, and hippos create their own traffic jams in the deeper pools. Birds are everywhere – from tiny bee-eaters to massive martial eagles, from colorful lilac-breasted rollers to the prehistoric-looking secretary bird.

Enjoy a picnic lunch at a scenic spot – perhaps overlooking a kopje where hyraxes sunbathe and agama lizards display their bright colors. The afternoon continues with more game viewing, potentially exploring different areas like the Western Corridor (famous for river crossings) or the northern reaches where the migration often moves.

As the day winds down, find the perfect spot for sundowners – drinks and snacks while watching the African sunset. The evening sky fills with stars as you return to camp for a delicious dinner and the sounds of the bush: hyenas calling, lions roaring, and hippos grunting in the distance.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Tented Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Sunrise game drive", "Predator activity", "Hippo pools", "Bush sundowners"],
      isFeatured: false
    },
    {
      day: 6,
      title: "Ngorongoro Crater – The Eden of Africa",
      description: `Leaving the Serengeti, you drive to the Ngorongoro Conservation Area, watching the landscape transition from savanna to highland forest. Arriving at your lodge on the crater rim, the view that greets you is simply staggering – a vast caldera stretching 19 kilometers across, its floor dotted with lakes, forests, and grasslands where an estimated 25,000 large animals make their home.

After lunch and a brief rest to acclimate to the cooler highland temperatures, spend the afternoon on the crater rim. The lodge offers spectacular views, and you might spot buffalo, elephants, and bushbuck in the forest that clings to the steep walls. The sunset from the rim, with the crater floor far below catching the last golden light, is one of Africa's most memorable sights.

Dinner is accompanied by stories of the crater's formation – a massive volcano that collapsed 2.5 million years ago to create this natural amphitheater. The Maasai people have grazed their cattle here for centuries, living in harmony with the wildlife. Tomorrow, you'll descend into this extraordinary place, but for now, enjoy the anticipation and the night sounds drifting up from below.

The crater rim's cool temperatures and fresh air make for excellent sleeping, and the morning will bring your descent into what many consider the most perfect wildlife sanctuary on Earth. Rest well – tomorrow promises to be extraordinary.`,
      location: "Ngorongoro Conservation Area",
      accommodation: "Ngorongoro Crater Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Crater rim views", "Highland forest", "Spectacular sunset", "Lodge experience"],
      isFeatured: false
    },
    {
      day: 7,
      title: "Ngorongoro Crater Floor – Departure",
      description: `Wake before dawn for a very early breakfast – you want to be among the first vehicles descending into the crater. The winding road drops 600 meters from the rim to the floor, and as you descend, the temperature rises and the wildlife becomes more visible. By the time you reach the bottom, the early morning light is perfect for photography.

The crater floor is a condensed version of all East African habitats and wildlife. Lions are abundant and relatively easy to spot, often resting after a night of hunting. The endangered black rhino finds sanctuary here – Ngorongoro has one of the last viable populations of these magnificent creatures. Elephants, buffalo, and hippos are common, as are hyenas, jackals, and a remarkable variety of antelope.

Lake Magadi, a soda lake at the crater's center, attracts thousands of flamingos whose pink masses create stunning photographic opportunities. The Ngoitokitok Spring is a favorite spot for picnic lunch – a pool surrounded by hippos and giant fig trees where elephants often come to drink.

Your morning in the crater is intensive game viewing at its finest. By early afternoon, you ascend from this natural wonder and begin the drive back to Arusha. The journey takes you through Maasai country, with opportunities to stop at viewpoints and craft markets.

Arriving in Arusha in the late afternoon, you transfer to the airport for your evening flight, or to your hotel if you're extending your stay. You depart Tanzania with a memory card full of photographs and a heart full of unforgettable experiences from this extraordinary safari.`,
      location: "Ngorongoro Crater / Arusha",
      accommodation: "End of Safari",
      meals: "Breakfast, Lunch",
      highlights: ["Black rhino", "Crater floor game drive", "Flamingo lake", "Farewell"],
      isFeatured: true
    }
  ],

  "7-days-safari-to-tanzania-serval-wildlife": [
    {
      day: 1,
      title: "Arrival in Arusha – Safari Preparations",
      description: `Your wildlife adventure begins with your arrival at Kilimanjaro International Airport, where the majestic peak of Africa's highest mountain often greets travelers through the clouds. Your experienced safari guide welcomes you with genuine warmth and assists with your luggage before beginning the scenic 45-minute drive to Arusha.

The drive takes you through coffee plantations and small villages where daily life unfolds at a relaxed pace. Children wave from the roadside, farmers tend their crops, and the fertile volcanic soil supports abundant greenery. Your guide points out Mount Meru, Tanzania's second-highest peak, which dominates the Arusha skyline.

Arriving at your lodge, nestled in beautifully landscaped gardens, you check into your room and take time to freshen up after your journey. The lodge offers a perfect introduction to Tanzanian hospitality – attentive service, comfortable accommodations, and delicious cuisine.

The afternoon is yours to explore the grounds, take a dip in the pool, or rest before dinner. In the evening, join your guide for a comprehensive briefing about the safari ahead. Over a delicious meal featuring both international and local dishes, learn about the parks you'll visit, the animals you might encounter, and what to expect from your week of wildlife exploration. The excitement builds as you prepare for the adventure of a lifetime.`,
      location: "Arusha",
      accommodation: "Arusha Coffee Lodge",
      meals: "Dinner",
      highlights: ["Airport transfer", "Safari briefing", "Welcome dinner", "Mount Meru views"],
      isFeatured: false
    },
    {
      day: 2,
      title: "Lake Manyara National Park – Intimate Wilderness",
      description: `After an early breakfast, you set off for Lake Manyara National Park, a gem of the northern safari circuit that packs remarkable biodiversity into its compact size. The two-hour drive takes you along the Great Rift Valley escarpment, with dramatic views across the valley floor.

Entering the park, you're immediately immersed in a groundwater forest of towering mahogany and fig trees. Troops of olive baboons occupy the road, mothers carrying babies on their backs, while dominant males sit watchfully. Blue monkeys leap through the canopy, and if you're lucky, you might spot the rare Sykes' monkey.

The forest transitions to acacia woodland, where Lake Manyara's famous tree-climbing lions occasionally drape themselves over branches. This unusual behavior, seen in only a few places in Africa, remains something of a mystery to scientists. Your guide knows the best spots to search for these remarkable felines.

At the lake's edge, thousands of flamingos create a pink ribbon along the shore. The alkaline waters support these beautiful birds, along with pelicans, storks, and countless other waterfowl. Hippos wallow in the shallows, their eyes and ears just above the water surface.

After a picnic lunch with views of the lake, your afternoon game drive explores the park's diverse habitats. Elephants are common here, often crossing the road with impressive nonchalance. As the day cools, exit the park and drive to your tented camp overlooking the Rift Valley.`,
      location: "Lake Manyara National Park",
      accommodation: "Manyara Tented Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Tree-climbing lions", "Flamingo flocks", "Forest primates", "Hippos"],
      isFeatured: false
    },
    {
      day: 3,
      title: "Tarangire National Park – Elephant Haven",
      description: `Today's destination is Tarangire National Park, famous for its massive elephant herds and iconic baobab trees. The drive from Lake Manyara takes you through rural Tanzania, past Maasai bomas and small villages, before entering this wildlife-rich park.

The Tarangire River is the park's beating heart, and during the dry season, it draws incredible concentrations of wildlife. Elephant herds numbering 100 or more gather at its banks – mothers teaching calves to drink, bulls testing their strength, and matriarchs leading their families to the best spots. The sound of elephants communicating through deep rumbles adds to the magical atmosphere.

The landscape is dotted with ancient baobab trees, their massive trunks standing like natural monuments. Some of these trees are estimated to be over 1,000 years old, having witnessed countless wildlife migrations and human histories. Lions often rest in the shade of these giants, while leopards use their branches as vantage points.

Your morning game drive explores the river valley, where you'll encounter zebra, wildebeest, buffalo, and a remarkable variety of antelope including the beautiful fringe-eared oryx. Predators are active – cheetahs scan the plains from termite mounds, and wild dogs are sometimes spotted.

After lunch at a scenic picnic site, continue exploring different sections of the park. The swamps attract different species, including waterbuck and reedbuck, while the kopjes (rocky outcrops) are favored by lions and klipspringers. As the sun sets, drive to your tented camp within the park's boundaries.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Treetops Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Elephant herds", "Baobab trees", "Predator sightings", "River wildlife"],
      isFeatured: true
    },
    {
      day: 4,
      title: "Serengeti National Park – Into the Endless Plains",
      description: `This morning begins with early game viewing in Tarangire before departing for the legendary Serengeti. The journey takes you through the Ngorongoro Conservation Area, with a stop at the crater rim for breathtaking views of one of the world's natural wonders.

Descending into the Serengeti, the landscape transforms into seemingly endless grasslands. The Maasai name "siringet" means "endless plains," and as the horizon stretches infinitely before you, you understand how this name came to be. This is Africa as you've imagined it – vast, wild, and teeming with life.

Your drive to the central Serengeti is a game drive in itself. Lions rest in the shade of acacia trees, cheetahs perch on termite mounds scanning for prey, and herds of zebra and wildebeest dot the landscape. If the Great Migration is passing through, you might witness thousands upon thousands of animals moving across the plains.

Arriving at your tented camp in the Seronera Valley, you settle into your canvas accommodation. Despite its rustic appearance, the tent offers genuine comfort – proper beds, en-suite bathroom, and a veranda overlooking the savanna where wildlife might pass at any time.

Your afternoon game drive explores the Seronera area, known for exceptional predator sightings. The kopjes (rocky outcrops) are favorite resting spots for lions, and the riverine forest along the Seronera River hosts resident leopards. Return to camp as the sun sets, and enjoy dinner under a canopy of stars while listening to the sounds of the African night.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Safari Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Migration herds", "Big cats", "Endless plains", "Bush camp experience"],
      isFeatured: true
    },
    {
      day: 5,
      title: "Full Day Serengeti Adventure",
      description: `A full day in the Serengeti allows for extensive exploration of this magnificent ecosystem. Rising before dawn, you head out for an early morning game drive when predators are most active and the light is perfect for photography. The golden hour transforms the landscape into a magical scene.

The Seronera area is renowned for its lion prides, and your guide knows where to find them. Watch as lions wake from their slumber, cubs playing around lounging adults, or witness the intense focus of a hunting coalition. Cheetahs are also commonly seen here, and there's nothing quite like watching the world's fastest land animal sprint after prey.

Following the morning game drive, enjoy a bush breakfast in a scenic spot – perhaps overlooking a hippo pool or beside a kopje where hyraxes sunbathe. The leisurely meal allows wildlife to approach, and vervet monkeys may attempt to join your breakfast.

Midday is spent at camp or in the shade of an acacia tree, as the heat sends most animals into rest mode. The afternoon game drive explores new areas, perhaps venturing to the Western Corridor with its dramatic riverine scenery, or north toward the Lobo region.

Sundowners in the bush – drinks and snacks as the sun sets over the Serengeti – is a safari tradition not to be missed. Watch the sky turn orange and pink, listen to the calls of hyenas beginning their evening activities, and feel the special energy of the African twilight. Dinner back at camp is accompanied by tales of the day's sightings.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Safari Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Dawn game drive", "Bush breakfast", "Predator encounters", "Sundowner experience"],
      isFeatured: false
    },
    {
      day: 6,
      title: "Ngorongoro Crater Rim – Preparing for the Crater",
      description: `Leaving the Serengeti's vast plains, you drive toward the Ngorongoro Conservation Area, but the journey is filled with wildlife encounters. Exit the park through the Naabi Hill Gate, watching for cheetahs and servals that frequent this area.

The ascent to the crater rim brings dramatic changes in scenery and temperature. The highland forests are lush and cool, home to elephant, buffalo, and the colorful Hartlaub's turaco. As you approach the crater rim, glimpses of the caldera below hint at tomorrow's adventure.

Your lodge sits on the crater's edge, offering what many consider the most spectacular view in Africa. The crater floor stretches 19 kilometers across, 600 meters below, where you can see tiny dots that are actually elephants, buffalo, and rhino. The scale is almost impossible to comprehend until you descend tomorrow.

After lunch, spend the afternoon exploring the crater rim. Walking trails wind through the highland forest, where troops of black-and-white colobus monkeys swing through the moss-draped branches. The flora here is unique – giant heathers, lobelias, and other species adapted to the cool, misty conditions.

Evening brings crisp temperatures and star-filled skies. From your lodge, watch the sunset paint the crater in shades of gold and orange, then observe as lights appear far below – perhaps Maasai fires or the glow of a safari camp. Dinner features locally-sourced ingredients and the anticipation of tomorrow's descent.`,
      location: "Ngorongoro Conservation Area",
      accommodation: "Ngorongoro Serena Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Crater rim views", "Highland forest", "Colobus monkeys", "Sunset over crater"],
      isFeatured: false
    },
    {
      day: 7,
      title: "Ngorongoro Crater Descent – Departure",
      description: `The final day of your safari brings the crown jewel of Tanzanian wildlife experiences – a descent into Ngorongoro Crater. After an early breakfast, you're among the first vehicles to wind down the steep access road as the morning mist lifts from the crater floor.

The crater is a self-contained ecosystem supporting approximately 25,000 large animals. Lions are abundant and relatively easy to spot, often hunting by daylight given the enclosed nature of their hunting ground. The critically endangered black rhino finds sanctuary here – Ngorongoro protects one of Tanzania's last viable populations of this magnificent creature.

Your game drive explores the crater floor's diverse habitats. The Lerai Forest is home to elephants and buffalo, while the central grasslands support vast herds of wildebeest and zebra alongside Grant's and Thomson's gazelles. Lake Magadi, a soda lake, attracts thousands of flamingos whose pink masses create stunning photographic opportunities.

The Ngoitokitok Spring, a pool fed by underground springs, is a perfect spot for your picnic lunch. Hippos wallow in the cool water, and elephants often visit to drink. The surrounding area is excellent for bird watching, with species ranging from tiny sunbirds to massive Kori bustards.

By early afternoon, you ascend from the crater and begin the drive back to Arusha. The journey offers final views of the Rift Valley and opportunities to stop at craft markets. Arriving in Arusha, transfer to the airport for your departure flight, or to your hotel if continuing your Tanzania journey. You leave with memories that will last a lifetime.`,
      location: "Ngorongoro Crater / Arusha",
      accommodation: "End of Safari",
      meals: "Breakfast, Lunch",
      highlights: ["Black rhino", "Crater game drive", "Flamingo lake", "Big Five viewing"],
      isFeatured: true
    }
  ],

  "8-days-wonders-of-tanzania-safari": [
    {
      day: 1,
      title: "Arrival in Tanzania – Welcome to Africa",
      description: `Your incredible Tanzanian journey begins as your aircraft descends toward Kilimanjaro International Airport. If weather permits, you'll catch your first glimpse of Mount Kilimanjaro, its snow-capped peak rising impossibly high above the African plains – an awe-inspiring welcome to this magnificent continent.

Your professional safari guide awaits you in the arrivals hall, easily recognizable with your welcome sign. After warm greetings and assistance with your luggage, you step outside into the pleasant Tanzanian air and begin the scenic drive to Arusha. The landscape unfolds as a tapestry of green – coffee plantations, banana groves, and small farms stretch toward the horizon.

The drive passes through small villages where daily life continues as it has for generations. Children wave enthusiastically from the roadside, women balance impossibly heavy loads on their heads with effortless grace, and farmers tend their fields. Your guide shares insights into local customs and points out various trees and plants, beginning your education about Tanzanian ecosystems.

Arriving at your lodge in Arusha, set in lush gardens with views of Mount Meru, you're welcomed with refreshing drinks and cool towels. After settling into your comfortable room, the afternoon is yours to unwind – perhaps by the pool, with a book in the gardens, or exploring the lodge grounds where butterflies flutter and birds sing.

Evening brings your welcome dinner, where your guide reviews the adventure ahead. Over delicious cuisine, learn about the parks you'll visit, the wildlife you might encounter, and the cultural experiences that await. Sleep comes easily, accompanied by anticipation of the wonders to come.`,
      location: "Arusha",
      accommodation: "Mount Meru Hotel",
      meals: "Dinner",
      highlights: ["Kilimanjaro views", "Cultural introduction", "Safari briefing", "Welcome dinner"],
      isFeatured: false
    },
    {
      day: 2,
      title: "Tarangire National Park – River of Life",
      description: `After an early breakfast, your safari begins in earnest with a drive to Tarangire National Park. The journey takes approximately two hours, passing through Maasai country where red-robed herders guide their cattle across the dry landscape. The terrain gradually becomes more wild as you approach the park.

Entering Tarangire, the first impression is of space and ancient trees. Massive baobabs dot the landscape, their thick trunks and gnarled branches creating a prehistoric atmosphere. Some of these trees are over 1,000 years old – silent witnesses to countless migrations and the passage of human history.

The Tarangire River is the park's lifeline, especially during the dry season when it becomes one of the only water sources in the region. This draws extraordinary concentrations of wildlife. Elephant herds numbering 50, 100, even 200 individuals gather at the riverbanks – mothers with tiny calves, teenagers play-fighting, and massive bulls whose tusks nearly touch the ground.

Your morning game drive follows the river, where wildlife viewing is exceptional. Lions often rest in the riverine forest, leopards lounge in the branches of large fig trees, and cheetahs scan the surrounding plains from termite mounds. The diversity of antelope is remarkable – impala, waterbuck, eland, fringe-eared oryx, and lesser kudu.

A picnic lunch under the shade of a giant baobab provides a moment to absorb the experience. Superb starlings may visit your table, their iridescent feathers catching the light. The afternoon continues with more game viewing before exiting the park and driving to your tented camp in the surrounding conservation area.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Elephant herds", "Ancient baobabs", "River wildlife", "Predator sightings"],
      isFeatured: true
    },
    {
      day: 3,
      title: "Lake Manyara – Forest to Flamingos",
      description: `Leaving Tarangire, you travel along the base of the Great Rift Valley escarpment to Lake Manyara National Park. This compact park offers remarkable biodiversity, with ecosystems ranging from groundwater forest to alkaline lake, all visible in a single game drive.

Entering through the park's main gate, you're immediately enveloped in lush forest. Giant mahogany trees create a cool canopy, their roots drawing from the groundwater that seeps from the escarpment. Olive baboons are everywhere – grooming each other, mothers nursing babies, juveniles playing chase. Blue monkeys are more elusive, requiring sharp eyes to spot in the high branches.

The forest gradually opens to acacia woodland, where Lake Manyara's famous tree-climbing lions sometimes rest on branches. This unusual behavior is seen in only a few places worldwide, and while sightings aren't guaranteed, the search is exciting. Your guide knows the favored trees and the signs to look for.

Emerging onto the floodplains, the lake comes into view – a sheet of silver water bordered by pink. Thousands of lesser flamingos wade in the shallows, their synchronized feeding creating mesmerizing patterns. Greater flamingos stand taller among them, and pelicans cruise the deeper water. Hippos wallow near the shore, occasionally opening their massive jaws in yawning displays.

After a picnic lunch with lake views, your afternoon explores more of the park. Elephants are common here, often crossing the road with complete disregard for vehicles. Buffalo herds graze the short grass, and giraffes browse the acacia. As the day cools, you exit the park and climb the escarpment to your lodge, where dinner overlooks the Rift Valley.`,
      location: "Lake Manyara National Park",
      accommodation: "Lake Manyara Serena Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Tree-climbing lions", "Flamingo spectacle", "Forest primates", "Rift Valley views"],
      isFeatured: false
    },
    {
      day: 4,
      title: "Ngorongoro Crater – Descent into Eden",
      description: `Today brings one of Africa's most extraordinary experiences – a descent into Ngorongoro Crater. After breakfast, you drive to the crater rim, where the view stops visitors in their tracks. The vast caldera stretches 19 kilometers across, its floor a patchwork of grassland, forest, swamp, and lake, all surrounded by walls rising 600 meters.

The winding road down to the crater floor is an adventure itself, with each turn revealing new perspectives on the world below. At the bottom, you find yourself in what many consider the world's largest unbroken caldera, home to an estimated 25,000 large animals. The concentration of wildlife here is unlike anywhere else on Earth.

Lions are perhaps the crater's most charismatic residents. Several prides call the crater home, and their morning activities often include hunting attempts as the cool temperatures favor activity. The crater's enclosed nature means you can often watch complete hunting sequences unfold.

The critically endangered black rhino finds sanctuary here. Ngorongoro is one of the few places where these magnificent creatures can still be found in reasonable numbers, and your guide will search diligently for sightings. Spotting a rhino in this primordial landscape is an unforgettable experience.

Lake Magadi, a soda lake at the crater's center, attracts thousands of flamingos. The surrounding grasslands support huge herds of wildebeest and zebra, while the Lerai Forest shelters elephants and buffalo. Hippos wallow in the Ngoitokitok Spring, where you stop for a picnic lunch in this remarkable setting.

Afternoon game viewing continues until it's time to ascend. The climb out offers final views of this natural wonder before you drive to your highland lodge.`,
      location: "Ngorongoro Crater",
      accommodation: "Ngorongoro Sopa Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Crater descent", "Black rhino", "Lion prides", "Flamingo lake"],
      isFeatured: true
    },
    {
      day: 5,
      title: "Journey to the Serengeti – Endless Plains Await",
      description: `After breakfast with views over the crater, you begin your journey to the legendary Serengeti. The drive descends through the Ngorongoro Conservation Area, passing Maasai bomas where traditional life continues, and crossing the Malanja Depression where seasonal lakes attract flamingos.

The transition to the Serengeti is gradual but unmistakable. The forests of the highlands give way to scattered acacias, then to vast open grasslands stretching to every horizon. This is the landscape that defines African safari imagery – endless golden grass under enormous blue skies.

Your drive is a continuous game viewing experience. The Serengeti supports Africa's largest populations of lions and spotted hyenas, and you may encounter both species before reaching camp. Cheetahs favor this open terrain where their speed advantage is maximized. Thompson's and Grant's gazelles bound away at your approach, their black tail-flicking providing easy identification.

Arriving at your camp in the central Serengeti, you settle into your tented accommodation. These spacious canvas tents offer genuine comfort – proper beds with quality linens, en-suite bathrooms with hot showers, and private verandas overlooking the savanna. Wildlife may pass by at any time, adding excitement to even quiet moments.

Your afternoon game drive explores the famous Seronera Valley. The kopjes (rocky outcrops) here are favored resting spots for lions, and the riverine forest along the Seronera River hosts resident leopards. As the sun sets over the endless plains, you return to camp for dinner under a spectacular canopy of stars.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Serena Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Endless plains", "Big cat country", "Kopje lions", "Bush camp experience"],
      isFeatured: true
    },
    {
      day: 6,
      title: "Full Day Serengeti Exploration",
      description: `A full day in the Serengeti allows for comprehensive exploration of different ecosystems and habitats. Rising before dawn, you head out when predators are most active. The early morning light paints the savanna gold, and the cooler temperatures mean animals are on the move.

Lions are often seen at this hour, either returning from night hunts or beginning to stir for the day. Watch cubs tumble and play, observe the social dynamics of the pride, or if lucky, witness a hunt in progress. The Serengeti's open terrain allows you to follow action from a respectful distance.

After morning game viewing, enjoy a bush breakfast in a scenic location. Perhaps your guide chooses a spot overlooking a hippo pool, where you can watch these massive creatures while enjoying eggs and coffee. The midday heat drives most animals to rest, and you return to camp for lunch and relaxation.

Your afternoon drive explores different areas, guided by recent sightings and your interests. The Western Corridor's rivers are famous for the dramatic wildebeest crossings during migration, while the kopjes of the central plains offer reliable predator viewing year-round. Your guide's knowledge ensures you see the best the Serengeti has to offer.

As the day ends, experience a classic sundowner – drinks and snacks as the sun sets over the plains. The changing light turns the landscape into art, and the sounds of the awakening night add a soundtrack to the visual spectacle. Return to camp for dinner and perhaps a campfire, where stories of the day's sightings are shared.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Serena Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Dawn game drive", "Bush breakfast", "Varied ecosystems", "Sundowner"],
      isFeatured: false
    },
    {
      day: 7,
      title: "Northern Serengeti or Migration Follow",
      description: `Today's exploration takes you deeper into the Serengeti, potentially following the Great Migration if it's in the area, or exploring the northern reaches with their different character. Your guide adjusts the itinerary based on current wildlife movements and conditions.

If the migration is nearby, witnessing hundreds of thousands of wildebeest and zebras moving across the plains is one of nature's greatest spectacles. The air fills with dust and the sound of hooves, and predators follow the herds, creating dramatic hunting opportunities. River crossings, if occurring, offer incredible (if sometimes intense) wildlife viewing.

The northern Serengeti offers different but equally rewarding experiences. The Mara River flows through this region, its waters hosting large crocodiles and pods of hippos. The woodlands here support good leopard populations, and the terrain creates scenic variety.

Your game driving continues throughout the day, with stops for refreshments and lunch in scenic locations. The Serengeti never disappoints – even when the migration is elsewhere, the permanent populations of wildlife ensure excellent viewing. Buffalo herds, elephant families, and countless antelope are always present.

The final evening in the Serengeti is special. Your camp may arrange a bush dinner, dining under the stars with the sounds of the wild as accompaniment. Or perhaps a night drive (where permitted) reveals the nocturnal creatures – genet cats, aardvarks, and the glowing eyes of hunting lions. Tomorrow you leave, so savor these final Serengeti moments.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Safari Camp",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Migration viewing", "Northern landscapes", "Mara River", "Bush dinner"],
      isFeatured: false
    },
    {
      day: 8,
      title: "Final Game Drive – Departure",
      description: `Your final morning in the Serengeti offers one last opportunity to experience this extraordinary ecosystem. Rising early, you set out on a dawn game drive, maximizing your time in the wilderness. The early light is perfect for photography, and animals are active before the heat builds.

Perhaps you'll have a final encounter with a lion pride, or watch a cheetah scan the plains for breakfast. Every moment in the Serengeti holds potential for the unexpected, and this final drive often produces memorable sightings. Your guide knows that last impressions matter, and they'll work hard to make this morning special.

After the game drive, return to camp for a leisurely breakfast before packing. The drive out of the Serengeti offers more wildlife viewing opportunities – you're on safari until you exit the gate. The landscape gradually changes as you leave the plains behind and enter the highlands of the Ngorongoro Conservation Area.

A stop at Olduvai Gorge provides fascinating context for your wildlife experiences. This site, one of the most important paleoanthropological sites in the world, has yielded fossils crucial to understanding human evolution. A small museum explains the significance of discoveries made here by Louis and Mary Leakey.

Continuing to Arusha, the drive offers final views of the Great Rift Valley and Maasai country. Arriving in the late afternoon, you transfer to the airport for your evening flight, or to your hotel if extending your stay. You leave Tanzania with memories that will last forever – the endless plains, the magnificent wildlife, and the warmth of the Tanzanian people.`,
      location: "Serengeti / Arusha",
      accommodation: "End of Safari",
      meals: "Breakfast, Lunch",
      highlights: ["Final game drive", "Olduvai Gorge", "Scenic drive", "Farewell"],
      isFeatured: false
    }
  ],

  "9-days-tanzania-wildlife-safari": [
    {
      day: 1,
      title: "Arrival in Arusha – Safari Capital",
      description: `Your comprehensive Tanzania wildlife safari begins with your arrival at Kilimanjaro International Airport. The airport sits between Africa's two most famous mountains – Kilimanjaro and Mount Meru – and on clear days, both giants are visible, their peaks rising above the surrounding plains in an unforgettable welcome.

Your professional guide meets you in the arrivals hall, handling the formalities of transfer while sharing initial impressions of Tanzania and its wildlife. The drive to Arusha takes you through a landscape of surprising greenery, with coffee and banana plantations thriving in the fertile volcanic soil.

Arusha serves as the safari capital of Tanzania, and the city buzzes with an energy unique to places where adventure begins. Your lodge sits in landscaped grounds on the outskirts, offering a peaceful retreat from the bustle. After checking in, take time to refresh after your journey – the pool invites, the gardens beckon, and comfortable chairs on your veranda offer quiet contemplation.

The remainder of the day is yours to relax and acclimate. The altitude here (about 1,400 meters) is noticeable, and the slower pace allows your body to adjust. Explore the lodge grounds, where resident birds might include sunbirds, weavers, and perhaps a turaco.

Evening brings your welcome dinner and detailed safari briefing. Your guide explains the itinerary, shares knowledge about the parks ahead, and answers questions about wildlife, culture, and photography. This safari offers nine days of exploration – time enough to experience Tanzania's diverse ecosystems in depth. Sleep well; adventure awaits.`,
      location: "Arusha",
      accommodation: "Arusha Coffee Lodge",
      meals: "Dinner",
      highlights: ["Kilimanjaro views", "Cultural introduction", "Safari briefing", "Acclimation day"],
      isFeatured: false
    },
    {
      day: 2,
      title: "Tarangire National Park – Kingdom of Elephants",
      description: `The safari begins with a drive to Tarangire National Park, a landscape dominated by ancient baobab trees and home to one of Africa's largest elephant populations. The two-hour drive passes through Maasai country, offering glimpses of traditional life – cattle herds, distinctive bomas (villages), and the iconic red-robed Maasai themselves.

Entering the park, the first baobabs appear – massive trees with twisted trunks and branches reaching skyward like roots. These ancient giants, some over a millennium old, create a landscape unlike anywhere else in Africa. They also provide food and shelter for countless creatures, from elephants that strip their bark to birds that nest in their hollows.

The Tarangire River draws wildlife from miles around, especially during the dry season. Elephant herds congregate here in extraordinary numbers – families led by wise matriarchs, playful youngsters learning to use their trunks, and massive bulls whose tusks sweep almost to the ground. Watching elephants drink, bathe, and socialize is endlessly fascinating.

Your morning game drive follows the river valley, where wildlife density rivals anywhere in Africa. Lions rest in the riverine forest, leopards lounge on large branches, and cheetahs scan from termite mounds. The variety of antelope is remarkable – waterbuck, lesser kudu, eland, fringe-eared oryx, and impala.

After a picnic lunch under a spreading acacia, afternoon game viewing explores different areas. The swamps attract different species, and the open plains allow for long-range sighting of predators. As the day cools, you exit the park and drive to your tented camp, where dinner awaits under the stars.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Treetops",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Elephant herds", "Ancient baobabs", "River wildlife", "Bush camp"],
      isFeatured: true
    },
    {
      day: 3,
      title: "Tarangire Exploration – Hidden Corners",
      description: `A second day in Tarangire allows for deeper exploration of this underrated park. After an early breakfast, you set off into areas of the park that day-visitors rarely reach, accessing the wilderness that makes extended safari stays so rewarding.

The early morning hours are prime time for predator activity. Lions have often hunted during the night and may still be finishing their meal. Cheetahs prefer the cooler hours for hunting, and you might witness the incredible speed and agility of a chase. Leopards, though usually nocturnal, are sometimes spotted in the early light before retreating to their daytime rest.

The park's northern areas offer different scenery and wildlife. Here, the terrain becomes hillier, and seasonal rivers create green ribbons through the golden grass. Gerenuk – the "giraffe gazelle" – is occasionally seen, standing on hind legs to browse on acacia leaves. Python-inhabited caves dot some of the kopjes.

Midday brings a return to camp for lunch and rest during the hottest hours. This is traditional safari rhythm, matching your schedule to that of the animals. Use the time to review photographs, watch wildlife from your veranda, or simply absorb the sounds and smells of the African bush.

Your afternoon game drive explores yet more of Tarangire's diverse habitats. The silhouettes of baobabs against the setting sun create photography opportunities, and the golden light brings out the rich colors of the landscape. Return to camp as stars emerge, and share stories of the day over dinner.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Treetops",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Remote areas", "Predator viewing", "Photographic light", "Full day exploration"],
      isFeatured: false
    },
    {
      day: 4,
      title: "Lake Manyara – Ecological Diversity",
      description: `Leaving Tarangire, you travel to Lake Manyara National Park, a small but remarkably diverse park squeezed between the Rift Valley escarpment and the lake shore. The drive offers beautiful views across the valley, with the soda lake shimmering in the distance.

Lake Manyara's groundwater forest is the first habitat you encounter – a lush, cathedral-like environment of towering mahogany, fig, and tamarind trees. Olive baboons are common here, their troops dominating the road. Blue monkeys swing through the high canopy, and the attentive visitor might spot the rare Sykes' monkey or even the secretive bushbuck.

Emerging from the forest, the vegetation transitions to acacia woodland, where Lake Manyara's famous tree-climbing lions occasionally drape themselves over branches. This unusual behavior, seen in only a handful of locations worldwide, makes every lion sighting especially exciting. Your guide knows the favored trees and will search diligently.

The lake shore is a world apart. Thousands of flamingos feed in the shallow alkaline water, their pink masses creating stunning visual effects. Hippos wallow near the shore, occasionally opening massive jaws in gaping yawns. Pelicans cruise the deeper water, and fish eagles call from the trees.

After a picnic lunch with lake views, continue exploring the park's diversity. Elephants are common here, and buffalo herds graze the short grass near the water. As the afternoon progresses, exit the park and climb the escarpment to your lodge, where dinner overlooks the entire Rift Valley.`,
      location: "Lake Manyara National Park",
      accommodation: "Lake Manyara Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Tree-climbing lions", "Flamingo spectacle", "Groundwater forest", "Escarpment views"],
      isFeatured: false
    },
    {
      day: 5,
      title: "Ngorongoro Crater – World Heritage Wonder",
      description: `Today brings one of the world's most extraordinary wildlife experiences – a descent into Ngorongoro Crater. After an early breakfast, you drive to the crater rim, where the view that greets you ranks among Africa's most spectacular. The vast caldera stretches 19 kilometers across, its floor a mosaic of grassland, swamp, forest, and lake, surrounded by walls rising 600 meters.

The descent road winds down the crater wall, and with each turn, the scale becomes clearer. At the bottom, you find yourself in what many consider the world's largest intact volcanic caldera, supporting the highest density of wildlife in Africa. An estimated 25,000 large animals call this place home.

Lions are the crater's most visible predators, with several prides hunting the abundant wildebeest and zebra. The enclosed nature of the crater means you can often observe complete hunting sequences and the social dynamics of prides. Morning is prime time for lion activity, as the cooler temperatures allow for extended movement.

The critically endangered black rhino finds sanctuary here. Ngorongoro supports one of Tanzania's largest populations of this magnificent species, and sightings are more likely here than almost anywhere else. Your guide will search carefully, knowing the animals' preferred areas and patterns.

Lake Magadi, at the crater's center, attracts thousands of flamingos, their pink reflecting in the alkaline water. The Ngoitokitok Spring provides a scenic lunch spot, where hippos wallow and elephants come to drink. Afternoon game viewing continues until you ascend to your lodge on the rim for dinner with crater views.`,
      location: "Ngorongoro Crater",
      accommodation: "Ngorongoro Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Crater descent", "Black rhino", "Lion prides", "Flamingo lake"],
      isFeatured: true
    },
    {
      day: 6,
      title: "To the Serengeti – Endless Horizons",
      description: `After a final breakfast overlooking the crater, you journey to the legendary Serengeti. The drive crosses the Ngorongoro Conservation Area, where Maasai pastoralists graze their cattle alongside wild animals, before descending into the Serengeti ecosystem.

The transition is gradual but unmistakable. Highland forest gives way to scattered acacias, then to vast open plains. The Maasai called this place "siringet" – the endless plains – and as the horizon stretches infinitely in every direction, you understand perfectly. This is the Africa of imagination and dreams.

Your drive is a continuous game viewing experience. The short-grass plains support enormous herds of wildebeest and zebra, especially during the wet season. Predators follow – lions lounging in the grass, cheetahs perched on termite mounds, hyenas trotting purposefully. Thomson's gazelles bounce away at your approach, their distinctive black side stripe flashing.

Arriving at your camp in the central Serengeti, you settle into your accommodation. The camps here range from comfortable to luxurious, but all offer the essential experience – sleeping in the bush, listening to hyenas whoop and lions roar, knowing that wildlife surrounds you.

Your afternoon game drive explores the famous Seronera Valley, heart of the Serengeti. The kopjes (rocky outcrops) provide lion resting spots, the rivers host hippos and crocodiles, and the acacia woodland shelters leopards. As the sun sets over the endless plains, you return to camp for dinner and the symphony of the African night.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Endless plains", "Big cat territory", "Migration herds", "Bush camp"],
      isFeatured: true
    },
    {
      day: 7,
      title: "Full Day Serengeti – Big Cat Territory",
      description: `A full day in the Serengeti provides time for comprehensive exploration. Rising before dawn, you set off when predators are most active and the light is magical. The golden hour transforms the savanna into a photographer's paradise, every animal silhouetted against the warming sky.

The Serengeti supports Africa's largest lion population, and the Seronera area is particularly productive. You might encounter a pride on a kill, cubs playing around lounging adults, or males patrolling their territory. Each pride has its own character and dynamics, and observing lion behavior never grows old.

Cheetahs favor the open plains, where their incredible speed gives them advantage over prey. Early morning is prime hunting time, and you might witness a chase – the acceleration, the pursuit, the outcome. Leopards are more difficult but not impossible, especially in the riverine forest along the Seronera River.

After morning game driving, enjoy a bush breakfast in a scenic spot. Perhaps beside a kopje where hyraxes sunbathe, or overlooking a hippo pool. The leisurely meal allows wildlife to come to you, and vervet monkeys may attempt to join.

The midday heat sends most animals into rest mode, and you return to camp to match their rhythm. Afternoon brings renewed activity, and your game drive explores new areas. The Serengeti's diversity means each direction offers different experiences. Sundowners as the sun sets over the plains complete a perfect day.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Dawn game drive", "Lion prides", "Cheetah hunting", "Bush breakfast"],
      isFeatured: false
    },
    {
      day: 8,
      title: "Serengeti Exploration – Following Wildlife",
      description: `Your third day in the Serengeti allows for extended exploration based on current wildlife movements and your interests. The Serengeti's 14,763 square kilometers offer infinite possibilities, and your guide's knowledge ensures you see the best the season has to offer.

If the Great Migration is in the area, today might include following the massive herds. The sight of hundreds of thousands of wildebeest and zebras moving across the plains is one of nature's greatest spectacles. The sound of hooves, the dust, the attendant predators – it's overwhelming in the best possible way.

Alternatively, you might explore the Western Corridor, where the Grumeti River attracts large crocodiles and provides dramatic scenery. Or venture north toward the Lobo region, where the landscape becomes hillier and woodland more prevalent. Each area has its character and its wildlife.

Game driving continues throughout the day, with breaks for refreshment and photography. The Serengeti never disappoints – even in quieter moments, the landscape itself is a marvel. Elephants move across the plains, giraffes browse the scattered acacias, and birds of every description fill the air.

Your final evening in the Serengeti is special. Perhaps a bush dinner under the stars, or simply enjoying the sunset from a perfect vantage point. The sounds of the night – hyenas calling, lions roaring, hippos grunting – create a symphony you'll never forget. Tomorrow you leave, so savor every moment.`,
      location: "Serengeti National Park",
      accommodation: "Serengeti Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Migration tracking", "Western Corridor", "Extended exploration", "Bush dinner"],
      isFeatured: false
    },
    {
      day: 9,
      title: "Final Game Drive – Departure",
      description: `Your final morning offers one last opportunity to experience the Serengeti's magic. Rising early, you set out for a dawn game drive, the golden light perfect for photography and the animals active before the day's heat builds.

Last-day sightings often prove memorable – as if the Serengeti offers a farewell gift. Perhaps a leopard crossing the road, or a cheetah with cubs, or a massive elephant bull silhouetted against the sunrise. Your guide works hard to make these final hours count, knowing how important last impressions can be.

After the game drive, return to camp for breakfast and packing. The drive out of the Serengeti continues the safari experience – you're game viewing until you exit the park. The landscape gradually changes as you leave the plains and enter the Ngorongoro highlands.

A stop at Olduvai Gorge provides fascinating context for your wildlife experiences. This paleoanthropological site has yielded some of humanity's most important fossils, and a small museum explains the Leakeys' discoveries and their significance. Understanding human origins adds depth to the safari experience.

Continuing to Arusha, the drive offers final views of Tanzania's magnificent scenery. The Great Rift Valley, Maasai country, and Mount Meru provide the backdrop for reflection on all you've experienced. Arriving in Arusha, you transfer to the airport for your departure flight, or to your hotel if extending your stay. Nine days of adventure conclude, but the memories endure forever.`,
      location: "Serengeti / Arusha",
      accommodation: "End of Safari",
      meals: "Breakfast, Lunch",
      highlights: ["Final game drive", "Olduvai Gorge", "Scenic journey", "Farewell"],
      isFeatured: false
    }
  ],

  "10-day-adventure-in-tanzania-safari-zanzibar": [
    {
      day: 1,
      title: "Arrival in Tanzania – Adventure Begins",
      description: `Your epic ten-day Tanzanian adventure begins with your arrival at Kilimanjaro International Airport. Named for Africa's highest peak, the airport sits in the shadow of this legendary mountain, and on clear days, Kilimanjaro's snow-capped summit provides an unforgettable first impression of Tanzania.

Your experienced safari guide awaits in the arrivals hall, ready to handle the logistics while you absorb first impressions. The drive to Arusha takes you through classic East African scenery – coffee plantations climbing the slopes of Mount Meru, small farms where families work the rich volcanic soil, and glimpses of wildlife even before the safari officially begins.

Arusha, the safari capital of Tanzania, buzzes with energy. Vehicles loaded with camping gear depart for the parks, excited travelers exchange stories, and the sense of adventure is palpable. Your lodge, set in peaceful gardens on the city's outskirts, offers a calm retreat where you can decompress from travel.

The afternoon is yours to relax and acclimate to the Tanzanian pace. The swimming pool offers refreshment, the gardens invite exploration, and the comfortable rooms provide a perfect base for rest. Some guests choose to explore Arusha town, visiting the cultural heritage center or local markets.

Evening brings your welcome dinner and comprehensive safari briefing. Your guide explains the week ahead – the parks you'll visit, the wildlife you'll encounter, and the rhythms of safari life. This adventure includes both safari and beach, offering the best of Tanzania. Rest well; extraordinary experiences await.`,
      location: "Arusha",
      accommodation: "Gran Melia Arusha",
      meals: "Dinner",
      highlights: ["Kilimanjaro views", "Safari briefing", "Cultural introduction", "Welcome dinner"],
      isFeatured: false
    },
    {
      day: 2,
      title: "Tarangire National Park – Elephant Paradise",
      description: `Your safari begins with a drive to Tarangire National Park, entering a world dominated by massive baobab trees and extraordinary elephant herds. The two-hour journey passes through Maasai country, where traditional life continues alongside the modern world.

Entering Tarangire, the ancient baobabs immediately capture attention. These trees, some over a thousand years old, have witnessed countless wildlife migrations and human histories. Their massive trunks and dramatic silhouettes create a landscape unique in Africa, providing the backdrop for remarkable wildlife viewing.

The Tarangire River draws wildlife from miles around, especially during the dry season. Elephants gather here in numbers rarely seen elsewhere – herds of 100, even 200 individuals. Watch as families socialize, calves learn to drink and dust-bathe, and massive bulls display their impressive tusks. The sounds and smells of elephant herds surround you.

Your morning game drive follows the river valley, where wildlife concentrations rival the most famous parks. Lions rest in the riverine forest, leopards lounge in the branches of fig trees, and cheetahs scan the plains from termite mounds. The diversity of antelope includes waterbuck, lesser kudu, eland, and the distinctive fringe-eared oryx.

After a picnic lunch under a spreading acacia, afternoon game viewing explores different habitats. The swamps attract different species, and the open plains offer long-range views. As the day cools, exit the park and drive to your tented camp for dinner under the stars.`,
      location: "Tarangire National Park",
      accommodation: "Tarangire Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Elephant herds", "Ancient baobabs", "River wildlife", "Predators"],
      isFeatured: true
    },
    {
      day: 3,
      title: "Lake Manyara National Park – Diverse Ecosystems",
      description: `Leaving Tarangire, you travel along the Great Rift Valley escarpment to Lake Manyara National Park. This compact park packs remarkable biodiversity into its small area, with ecosystems ranging from groundwater forest to alkaline lake.

Entering through dense forest, the change from savanna is dramatic. Giant mahogany trees create a cool canopy, and troops of olive baboons occupy the road. Blue monkeys swing through the high branches, while bushbuck occasionally appear in the undergrowth. This forest, fed by groundwater seeping from the escarpment, supports unique wildlife communities.

The forest transitions to acacia woodland, where Lake Manyara's famous tree-climbing lions sometimes rest on branches. This unusual behavior, seen in only a few places worldwide, makes every lion sighting potentially special. Your guide knows the favored trees and searches diligently.

At the lake shore, the scene transforms completely. Thousands of flamingos wade in the shallows, their pink creating stunning contrast against the blue water. Hippos wallow near the shore, and pelicans cruise the deeper water. The variety of waterfowl is remarkable – kingfishers, herons, storks, and the magnificent fish eagle.

After a picnic lunch overlooking the lake, continue exploring. Elephants are common here, often approaching vehicles with calm curiosity. Buffalo herds graze the short grass, and giraffes browse the acacia. As afternoon progresses, exit the park and climb the escarpment to your lodge, where dinner comes with Rift Valley views.`,
      location: "Lake Manyara National Park",
      accommodation: "Lake Manyara Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Tree-climbing lions", "Flamingo flocks", "Forest primates", "Escarpment views"],
      isFeatured: false
    },
    {
      day: 4,
      title: "Ngorongoro Crater – The Eden of Africa",
      description: `Today brings one of Africa's most extraordinary experiences – a descent into Ngorongoro Crater. After breakfast, you drive to the crater rim, where the view stops visitors in their tracks. The vast caldera stretches 19 kilometers across, its floor supporting the highest wildlife density in Africa.

The winding road down the crater wall is an adventure itself. At the bottom, you find yourself in a world unlike any other – a self-contained ecosystem where approximately 25,000 large animals live permanently. The walls create a natural amphitheater, and the viewing is consistently exceptional.

Lions are the crater's most visible predators. Several prides call this place home, and morning is prime time for activity. Watch cubs play, observe pride dynamics, or if fortune favors, witness a hunt. The crater's enclosed nature allows extended observation impossible in larger parks.

The critically endangered black rhino finds sanctuary here. Ngorongoro supports one of Tanzania's last viable populations, and sightings are more likely here than almost anywhere else. Your guide knows the animals' patterns and will search carefully. Seeing a rhino in this primordial landscape is unforgettable.

Lake Magadi attracts flamingos by the thousands, and the Ngoitokitok Spring provides a scenic lunch spot amid hippos and elephants. Afternoon game viewing continues until you ascend to your lodge on the rim, where dinner comes with views across this natural wonder as the sun sets and stars emerge.`,
      location: "Ngorongoro Crater",
      accommodation: "Ngorongoro Serena Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Crater descent", "Black rhino", "Lion prides", "Flamingo lake"],
      isFeatured: true
    },
    {
      day: 5,
      title: "Serengeti National Park – Entering the Endless Plains",
      description: `After a final breakfast with crater views, you journey to the legendary Serengeti. The drive descends through the Ngorongoro Conservation Area, past Maasai villages and through the Malanja Depression, before the landscape opens into the famous endless plains.

The transition is unforgettable. Forest gives way to scattered acacias, then to vast grassland stretching to every horizon. The Maasai called this "siringet" – endless plains – and as you scan the infinite horizon, you understand why this place captures imaginations worldwide.

Your drive is continuous game viewing. The Serengeti supports Africa's largest lion population, and sightings begin immediately. Cheetahs favor the open terrain, perching on termite mounds to scan for prey. Hyenas trot purposefully, and jackals search for opportunities. The prey species – wildebeest, zebra, gazelle – number in the hundreds of thousands.

Arriving at your camp in the central Serengeti, you settle into your accommodation. The tented camps here offer genuine comfort – proper beds, en-suite facilities, and private verandas – while maintaining the authentic bush experience of sleeping surrounded by wildlife.

Your afternoon game drive explores the famous Seronera Valley. The kopjes (rocky outcrops) are favored lion resting spots, and the riverine forest along the Seronera River hosts leopards. As sunset paints the sky in oranges and pinks, you return to camp for dinner under a canopy of stars.`,
      location: "Serengeti National Park",
      accommodation: "Four Seasons Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Endless plains", "Big cat territory", "Migration herds", "Luxury camp"],
      isFeatured: true
    },
    {
      day: 6,
      title: "Full Day Serengeti Exploration",
      description: `A full day in the Serengeti offers time for extensive exploration. Rising before dawn, you head out when predators are most active. The golden light transforms the savanna into art, and the cooler temperatures mean animals are on the move.

The morning's focus is predator viewing. Lions often make their kills in early morning, and you might witness the tension of a hunt or the chaos of a feeding. Cheetah mothers teach their cubs to hunt at this hour, providing remarkable behavioral observations. Leopards, though more elusive, sometimes appear before retreating to their daytime rest.

After morning game driving, enjoy bush breakfast in a scenic location – perhaps beside a kopje or overlooking a hippo pool. The leisurely meal becomes a wildlife experience as animals move around you. Vervet monkeys are bold visitors, and various birds investigate the food.

Midday is rest time, matching the rhythm of the animals. Return to camp for lunch and relaxation, perhaps watching wildlife from your veranda. The heat sends most creatures into the shade, and the wise safari-goer follows their example.

Afternoon game driving explores different areas, guided by recent sightings and seasonal patterns. The Western Corridor, the kopjes of the Moru area, or the woodlands toward Lobo – each direction offers different experiences. Sundowners as the sun sets complete a perfect day, the changing light turning the landscape magical.`,
      location: "Serengeti National Park",
      accommodation: "Four Seasons Safari Lodge",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Dawn predators", "Bush breakfast", "Extended exploration", "Sundowner"],
      isFeatured: false
    },
    {
      day: 7,
      title: "Final Serengeti Morning – Flight to Zanzibar",
      description: `Your final Serengeti morning offers one last chance to experience the magic. Rising early, a dawn game drive captures the special light and active predators of early morning. Your guide works hard to find memorable sightings for this farewell drive.

The drive might yield anything – a leopard crossing the road, a cheetah with cubs, a massive elephant bull silhouetted against the sunrise. The Serengeti never fails to surprise, and last-day sightings often prove most memorable. Soak in the sights, sounds, and smells of this extraordinary ecosystem.

After the game drive, return to camp for breakfast and packing. The drive to the Serengeti airstrip offers final wildlife viewing – you're on safari until you board the plane. The small aircraft takes you across the Serengeti, providing a bird's-eye view of the endless plains before turning east toward the Indian Ocean.

The flight to Zanzibar takes approximately two hours, crossing the agricultural heartland of Tanzania before reaching the coast. As the aircraft descends, the turquoise waters of the Indian Ocean come into view, along with the white sand beaches and historic buildings of Zanzibar.

Landing at Zanzibar International Airport, you're met and transferred to your beach resort. The contrast with the bush is immediate – the salt air, the sound of waves, the palm trees swaying in the coastal breeze. After checking in to your oceanfront accommodation, the afternoon is yours to begin unwinding on the beach.`,
      location: "Serengeti / Zanzibar",
      accommodation: "Zanzibar Beach Resort",
      meals: "Breakfast, Lunch, Dinner",
      highlights: ["Final game drive", "Scenic flight", "Beach arrival", "Ocean views"],
      isFeatured: false
    },
    {
      day: 8,
      title: "Zanzibar – Beach and Exploration",
      description: `Wake to the sound of waves and the sight of the Indian Ocean stretching to the horizon. Zanzibar, the "Spice Island," offers the perfect contrast to safari – azure waters, white sand beaches, and a fascinating cultural heritage that blends African, Arab, and Indian influences.

Your morning can be spent as you choose. The beach beckons with pristine sand and warm, crystal-clear water. Snorkeling reveals colorful coral reefs and tropical fish. Or simply relax with a book under a palm tree, letting the rhythm of the waves wash away any remaining tension.

For those wanting cultural immersion, a tour of Stone Town reveals Zanzibar's rich history. This UNESCO World Heritage site features narrow alleys, ornate doors, and buildings that tell stories of the spice trade, sultanates, and the darker history of slavery. The House of Wonders, the Old Fort, and the Anglican Cathedral are highlights.

Alternatively, explore Zanzibar's spice heritage on a guided tour. Visit plantations where cloves, vanilla, nutmeg, and countless other spices grow. Learn about the crops that made Zanzibar famous, taste exotic fruits, and return with aromatic souvenirs.

The afternoon offers more beach time or water activities. Dhow cruises, diving excursions, and fishing trips can be arranged. Evening brings spectacular sunsets over the ocean, perhaps enjoyed with cocktails on the beach. Dinner features fresh seafood and the unique flavors of Zanzibari cuisine.`,
      location: "Zanzibar",
      accommodation: "Zanzibar Beach Resort",
      meals: "Breakfast, Dinner",
      highlights: ["Beach relaxation", "Stone Town option", "Spice tour option", "Sunset"],
      isFeatured: false
    },
    {
      day: 9,
      title: "Zanzibar – Water Adventures",
      description: `Another day in paradise offers opportunities for more active pursuits or continued relaxation. The turquoise waters of the Indian Ocean invite exploration, and Zanzibar's marine environment rivals its terrestrial attractions.

Snorkeling or diving at nearby reefs reveals an underwater wonderland. Coral gardens support countless fish species, from tiny clownfish to elegant angelfish. Green and hawksbill turtles are commonly spotted, and if you're fortunate, dolphins may appear. The water is warm and visibility excellent.

For non-divers, a glass-bottom boat tour provides reef viewing without getting wet. Or visit the natural swimming pools that form at low tide on the east coast, where warm water fills natural rock basins. The phenomenon is uniquely Zanzibari and incredibly relaxing.

Deep-sea fishing charters target marlin, sailfish, and tuna in the deeper waters offshore. Even if you don't land the big one, the ocean scenery and the thrill of the chase make for an exciting day. Catch can be prepared at your resort for an ultra-fresh dinner.

Alternatively, spend the day simply enjoying the beach. The sand is powder-soft, the water perfect for swimming, and the palm-shaded loungers invite long hours of reading and daydreaming. Massages and spa treatments offer ultimate relaxation. Whatever you choose, the day ends with another magnificent sunset and the sounds of the tropical night.`,
      location: "Zanzibar",
      accommodation: "Zanzibar Beach Resort",
      meals: "Breakfast, Dinner",
      highlights: ["Snorkeling/diving", "Marine life", "Beach relaxation", "Sunset"],
      isFeatured: false
    },
    {
      day: 10,
      title: "Departure from Paradise",
      description: `Your final morning in Zanzibar offers a last opportunity to enjoy the beach. Wake early for a sunrise walk along the shore, the sky turning pink and gold over the calm ocean. Breakfast overlooking the water is a peaceful conclusion to this incredible journey.

Depending on your flight schedule, you might have time for one more swim, a final snorkel, or simply sitting on the beach absorbing the view. Pack slowly, savoring the memories of both safari adventure and beach relaxation.

Transfer to Zanzibar International Airport for your departure flight. The drive passes through rural Zanzibar, with glimpses of village life, spice plantations, and the island's unique architecture. The airport formalities are straightforward, leaving time to browse the duty-free shops for final souvenirs.

Your flight home begins, whether direct or via Dar es Salaam or other hub. Look out the window as Zanzibar recedes – the blue waters, the white beaches, and the green interior of this extraordinary island. Beyond, the East African coast stretches, hinting at the vast wilderness where you spent the first part of your journey.

Ten days have taken you from the endless plains of the Serengeti to the beaches of Zanzibar, from tracking lions to swimming with tropical fish, from the dust of the savanna to the salt of the ocean. Tanzania has shared its treasures generously. The adventure ends, but the memories – of wildlife encountered, landscapes witnessed, and experiences shared – endure forever.`,
      location: "Zanzibar / Departure",
      accommodation: "End of Safari",
      meals: "Breakfast",
      highlights: ["Final beach time", "Island farewell", "Journey home", "Lasting memories"],
      isFeatured: false
    }
  ]
};

async function fixItineraries() {
  console.log("🦁 Fixing remaining 5 safari itineraries (7-10 day safaris)...\n");

  const slugs = Object.keys(safariItineraries);
  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const slug of slugs) {
    const itinerary = safariItineraries[slug];

    try {
      const result = await prisma.safariPackage.updateMany({
        where: { slug },
        data: { itinerary }
      });

      if (result.count > 0) {
        const avgLength = Math.round(
          itinerary.reduce((sum: number, day: any) => sum + (day.description?.length || 0), 0) / itinerary.length
        );
        console.log(`✅ ${slug}`);
        console.log(`   Days: ${itinerary.length} | Avg desc length: ${avgLength} chars\n`);
        updated++;
      } else {
        console.log(`⚠️ Not found: ${slug}\n`);
        notFound++;
      }
    } catch (error) {
      console.log(`❌ Error updating ${slug}:`, error);
      errors++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Updated: ${updated}`);
  console.log(`⚠️ Not found: ${notFound}`);
  console.log(`❌ Errors: ${errors}`);

  await prisma.$disconnect();
}

fixItineraries();
