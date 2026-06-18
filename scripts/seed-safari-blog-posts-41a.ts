import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const honeymoonContent = `
<p>You've spent months planning the wedding — the flowers, the venue, the seating chart that nearly caused a family feud. Now comes the part you actually want to plan: the honeymoon. And if you're reading this, you're already considering something bolder than a pool lounger in Cancún. Good. A honeymoon safari in Tanzania is the trip that rewrites what you thought a holiday could be — raw wildlife encounters at sunrise, candlelit dinners under a sky with more stars than you've ever seen, and a Zanzibar beach finale that makes the whole thing feel like a film you starred in together.</p>
<p>We've organised honeymoon safaris from our base in Moshi for over fifteen years. We've watched couples propose on kopjes at sunset, arranged private bush dinners where the only other guests were a pride of lions 200 metres away, and fielded the inevitable WhatsApp message three months later: "When can we come back?" This guide covers everything — the lodges worth the splurge, the itinerary that balances adventure with relaxation, and the practical details that make it all work.</p>

<h2>Why Tanzania for a Honeymoon Safari</h2>
<p>Tanzania offers something no other honeymoon destination can match: a world-class wildlife safari and a tropical island beach holiday in a single trip, separated by a 90-minute flight. The Serengeti delivers the drama — lions hunting at dawn, elephants silhouetted against orange sunsets, the Great Migration thundering across the plains. Zanzibar delivers the romance — turquoise water, white sand, candlelit seafood dinners with your toes in the sand.</p>
<p>Beyond the obvious, Tanzania works for honeymooners because of scale. The Serengeti alone is 14,763 square kilometres — larger than Connecticut. At a luxury lodge, you'll share a game drive with nobody except your guide. There's an intimacy to the African bush that surprises couples expecting a zoo-like experience. You sit in silence together, watching a leopard descend a sausage tree in the golden hour, and something shifts. It's not performative romance — it's the real thing, created by a setting so extraordinary it strips away everything except the two of you and this moment.</p>

<h2>Best Honeymoon Safari Lodges in Tanzania</h2>
<p>Not every luxury lodge is honeymoon-appropriate. Some are family-oriented (kids' programmes, family suites). Others are geared toward serious wildlife photographers who want 14-hour game drives. The lodges below are specifically chosen for romance — private spaces, couples-focused experiences, and settings that make you feel like you've stepped into a different world.</p>

<h3>&Beyond Ngorongoro Crater Lodge</h3>
<p>This is the lodge that appears on every "most romantic hotels in Africa" list, and it earns the spot. Three intimate camps perch on the rim of the Ngorongoro Crater, 600 metres above the caldera floor. The design is baroque-meets-Maasai — chandeliers, beaded curtains, stained glass, and roses everywhere. Your butler draws a bath with crater views, rose petals floating on the surface, a glass of Veuve Clicquot on the side. It's theatrical, unapologetic, and utterly unforgettable. Rates: $1,200-$2,000 per person per night.</p>

<h3>Singita Grumeti — Sasakwa Lodge</h3>
<p>Singita operates on a 350,000-acre private concession in the western Serengeti, and Sasakwa Lodge is its crown jewel. Colonial-era grandeur meets the African bush: infinity pool overlooking endless savanna, private villa suites with plunge pools, a wine cellar stocked with South African vintages, and game drives where you're the only vehicle for miles. The concession means off-road driving, night drives, and walking safaris — experiences forbidden in the national park. Rates: $2,500-$4,000 per person per night. Worth every cent for a once-in-a-lifetime honeymoon.</p>

<h3>Four Seasons Safari Lodge Serengeti</h3>
<p>If your partner values the reliability and polish of a global five-star brand, the Four Seasons delivers in the bush exactly as it does in Bali or Paris. The infinity pool overlooks a waterhole where elephants drink at dusk. The spa offers couples treatments with savanna views. Rooms are spacious, modern, and meticulously maintained. It lacks the raw bush intimacy of a tented camp, but for honeymooners who want familiar luxury in an unfamiliar landscape, it's perfect. Rates: $800-$1,500 per person per night.</p>

<h3>The Highlands by Asilia</h3>
<p>For the couple that finds romance in design and adventure rather than chandeliers, The Highlands is extraordinary. Eight geodesic dome suites sit on the slopes of the Olmoti Crater in the Ngorongoro highlands. The architecture is modern, eco-conscious, and unlike anything else in Tanzania. Guided walks to the Olmoti waterfall, crater-rim sundowners, and some of the best stargazing on the continent. It's intimate (only 16 guests maximum) and appeals to couples who want something architecturally striking without the traditional safari-lodge aesthetic. Rates: $500-$800 per person per night.</p>

<h2>Zanzibar Honeymoon Extensions</h2>
<p>The safari is the adventure. Zanzibar is the exhale. After days of early wake-ups and dusty game drives, landing on the spice island feels like entering a different world — warm ocean air, the call to prayer from Stone Town's minarets, the smell of cloves and vanilla. Here's where to stay:</p>

<h3>Mnemba Island by &Beyond</h3>
<p>A private island off Zanzibar's northeast coast. Twelve bandas (beach huts), barefoot luxury, and a surrounding coral reef that's one of the best snorkelling sites in East Africa. No phones, no shoes, no schedule. Rates: $1,500-$2,500 per person per night. It's expensive, but you're paying for an entire island with the privacy to match.</p>

<h3>Baraza Resort & Spa</h3>
<p>Located on Bwejuu beach, Baraza combines Zanzibari architectural heritage with five-star amenities. The Frangipani Spa is one of the best on the island — couples massages, hydrotherapy pools, and treatments using local spices. All-suite property with private plunge pools. Rates: $400-$700 per person per night.</p>

<h3>Zuri Zanzibar</h3>
<p>A newer property on Kendwa beach with a contemporary design that blends Swahili motifs with modern minimalism. Multiple restaurants, an excellent pool, and the advantage of Kendwa's west-facing beach — the only beach in Zanzibar where you can swim at any tide. Rates: $300-$600 per person per night.</p>

<h3>Matemwe Retreat by Asilia</h3>
<p>Intimate and understated. Four suites on the northeast coast, each with a private plunge pool and uninterrupted Indian Ocean views. Matemwe Retreat is for couples who want privacy above all else — no crowds, no entertainment programme, just the two of you and the ocean. Rates: $350-$550 per person per night.</p>

<h2>Romantic Safari Experiences</h2>
<p>The lodge is where you sleep. The experiences are what you'll remember. These are the moments our honeymoon guests talk about for years:</p>

<h3>Private Bush Dinner Under the Stars</h3>
<p>Your guide drives you to a kopje — a rocky outcrop rising from the savanna — where a table for two has been set with white linen, lanterns, and candles. A private chef prepares a four-course meal while the sun sets behind you and the Milky Way materialises overhead. No other guests, no roof, no walls — just the sounds of the bush and a meal you'll never forget. Most luxury lodges include this complimentary or charge $150-$300 per couple.</p>

<h3>Hot Air Balloon Safari with Champagne Breakfast</h3>
<p>Lift off at 6 AM as the first light hits the Serengeti. From 1,000 feet, the scale of the landscape becomes visible — wildebeest herds stretching to the horizon, hippo pods in the rivers below, the shadow of your balloon drifting across the golden plains. The flight lasts about an hour. You land in the middle of the savanna where a table has been set for a champagne breakfast — white tablecloth, silver service, fresh fruit, and eggs cooked to order, all in the bush. $500-$600 per person. Book at least two weeks ahead during peak season.</p>

<h3>Sundowner Cocktails on a Kopje</h3>
<p>Every afternoon around 5 PM, your guide stops at a scenic viewpoint and produces a cooler of gin and tonics, cold beers, and a cheese board. You sit on the warm rocks as the sun drops and the sky cycles through gold, amber, crimson, and violet. It's a daily ritual on luxury safaris, and it's the moment most couples identify as the emotional high point of the trip. Included at all luxury lodges.</p>

<h3>Couples Spa in the Bush</h3>
<p>Singita has a full spa facility with trained therapists, sauna, and hydrotherapy. Four Seasons offers treatments in open-air pavilions overlooking the savanna. Even smaller camps like Oliver's in Tarangire offer bush massages — a therapist sets up a table under an acacia tree and works while birds call overhead. Rates: $80-$200 per person per treatment.</p>

<h3>Private Game Drives</h3>
<p>At luxury lodges, your game drive vehicle is private — no sharing with strangers. This means you control the pace. Want to spend 45 minutes watching a cheetah stalk a gazelle? Done. Want to skip the hippo pool and search for the elusive pangolin your guide heard about? Done. Private game drives transform the safari from a group tour into an intimate exploration. Included at all luxury properties.</p>

<h3>Candlelit Beach Dinner in Zanzibar</h3>
<p>After the bush comes the beach. In Zanzibar, most resorts arrange private beach dinners — a table set at the water's edge, lanterns marking a path across the sand, fresh lobster and grilled octopus, the Indian Ocean lapping a metre from your feet. At Mnemba Island, they'll set it on your private stretch of beach. At Baraza, the beachfront restaurant transforms into a private dining room. $100-$250 per couple at most properties.</p>

<h2>Best Honeymoon Safari Itinerary</h2>
<p>After hundreds of honeymoon trips, this is the itinerary we recommend most. It balances wildlife, romance, and relaxation without cramming in too much.</p>

<h3>Days 1-4: Serengeti Luxury (3-4 Nights)</h3>
<p>Fly from Arusha to the Serengeti (90 minutes). Check into your lodge and begin afternoon game drives. Spend three to four nights exploring different Serengeti zones — the Seronera Valley for big cats, the western corridor for the migration (June-August), and the northern plains for river crossings (August-October). Schedule the bush dinner for night two (you'll have settled in by then), and the balloon safari for your last Serengeti morning.</p>

<h3>Day 5: Ngorongoro Crater Lodge (1 Night)</h3>
<p>Fly or drive from the Serengeti to Ngorongoro. The crater-rim lodge is worth one night for the sunset alone. Descend into the crater at dawn for a 5-hour game drive — all the Big Five in a single day, including the critically endangered black rhino. The butler-drawn bath with crater views is the evening's reward.</p>

<h3>Days 6-10: Zanzibar Beach (4-5 Nights)</h3>
<p>Fly from the Ngorongoro airstrip to Zanzibar (2 hours with a connection in Arusha). Check into your beachfront property and decompress. Day 1: sleep, swim, spa. Day 2: Stone Town walking tour — the Old Fort, the House of Wonders, the spice market, sunset from Forodhani Gardens night market (the best street food in East Africa). Day 3: snorkelling at Mnemba Atoll or a dhow sunset cruise. Day 4-5: beach days with optional spice tour, kayaking, or simply doing nothing.</p>

<h3>Total Duration and Budget</h3>
<p>8-10 days total. Budget: $6,000-$15,000 per couple depending on lodge tier and season. The lower end uses properties like The Highlands and Matemwe Retreat during green season. The upper end uses Singita and Mnemba Island during peak season. Both tiers deliver an extraordinary honeymoon — the difference is in thread count and exclusivity, not in wildlife quality or romance.</p>

<h2>Best Time for a Honeymoon Safari</h2>
<p>Two windows stand out, and our <a href="/best-time-safari-tanzania/">seasonal safari guide</a> covers the details:</p>

<h3>June-October: The Dry Season</h3>
<p>Peak wildlife viewing in the Serengeti and Ngorongoro. Animals concentrate around water sources, making them easier to find. The Great Migration crosses the Mara River (July-October) — the most dramatic wildlife event on Earth. Zanzibar is warm and dry with calm seas. Downside: higher prices and more tourists (though at luxury lodges, you barely notice other guests).</p>

<h3>January-February: The Calving Season</h3>
<p>1.5 million wildebeest give birth on the southern Serengeti plains over a 2-3 week period. The landscape is green, the light is extraordinary for photography, and predator activity peaks as lions and cheetahs target the vulnerable calves. Zanzibar is hot and humid but dry. This is the insider pick — fewer tourists than July-October, slightly lower prices, and a spectacle that rivals the river crossings. It's also peak romance: lush green landscapes look better in photos than brown dust.</p>

<h3>Green Season Savings</h3>
<p>March-May and November offer 30-40% discounts at most luxury properties. April-May is the heaviest rain, but November is a hidden gem — short rains mean afternoon showers that last an hour, mornings are clear, and prices are at their lowest. For budget-conscious honeymooners, November delivers 90% of the dry-season experience at 60% of the cost.</p>

<h2>Proposal Ideas on Safari</h2>
<p>We've helped orchestrate dozens of proposals. If you're planning to pop the question on safari, here's what works:</p>

<h3>Sunset on a Serengeti Kopje</h3>
<p>Tell your guide in advance. They'll drive to a scenic kopje at golden hour, set up sundowners, and find a reason to step away ("I need to check the tyre"). You'll have a 360-degree panorama of the savanna, the sun dropping behind acacia silhouettes, and total privacy. We can arrange a photographer to be discreetly positioned nearby.</p>

<h3>Dhow Cruise in Zanzibar</h3>
<p>Charter a private dhow (traditional sailing vessel) for a sunset cruise along the Stone Town waterfront. The crew serves champagne and canapés as the sun sets behind the old town's rooftops. We'll hide the ring in the cooler and cue the captain to present it at the right moment. Cost: $150-$300 for the private charter.</p>

<h3>Private Bush Dinner</h3>
<p>The bush dinner setup is already the most romantic experience on safari. Add a ring hidden in the dessert (classic but effective), a message written in the sand path to the table, or simply have the guide hand you the ring box when the main course is cleared. The setting does most of the work — you just need to get on one knee.</p>

<h2>What to Pack for a Honeymoon Safari</h2>
<p>Packing for a honeymoon safari means two wardrobes — bush gear for the safari and beach wear for Zanzibar.</p>

<h3>For the Safari</h3>
<ul>
<li>Neutral-coloured clothing (khaki, olive, tan) — 2-3 changes are enough as luxury lodges do same-day laundry</li>
<li>One smart-casual outfit for lodge dinners (linen trousers, a nice shirt — no dress code, but you'll want to feel dressed up for the bush dinner)</li>
<li>Layers for cold mornings (the crater rim drops to 5°C at dawn) — a fleece or light jacket</li>
<li>Wide-brim hat, quality sunglasses, SPF 50 sunscreen</li>
<li>Binoculars (8x42 or 10x42) — your guide has a pair but you'll want your own</li>
<li>Camera with a 70-200mm or 100-400mm zoom lens. Phone cameras are surprisingly good for landscapes but insufficient for wildlife close-ups</li>
<li>Insect repellent with DEET — tsetse flies ignore everything else</li>
</ul>

<h3>For Zanzibar</h3>
<ul>
<li>Light, breathable clothing — linen dresses, shorts, cotton shirts</li>
<li>Swimwear (2-3 sets to rotate)</li>
<li>Reef-safe sunscreen (the coral around Mnemba is fragile)</li>
<li>A modest outfit for Stone Town visits — Zanzibar is predominantly Muslim, so cover shoulders and knees in town</li>
<li>Waterproof phone case for snorkelling photos</li>
</ul>
<p>Full packing details in our <a href="/tanzania-safari-packing-list/">Tanzania safari packing list</a>.</p>

<h2>Adventure Honeymoons: Combining with Kilimanjaro</h2>
<p>For couples who want their honeymoon to include a genuine achievement, climbing Kilimanjaro before the safari adds an unforgettable dimension. Here's how it works:</p>
<p>Climb Kilimanjaro together over 6-8 days (the <a href="/tanzania-safaris/">Lemosho or Northern Circuit routes</a> offer the most scenic and least crowded experience). Summit on day 6-7, descend, and rest one night in Moshi. Then fly to the Serengeti for a 3-4 night luxury safari, followed by Zanzibar. Total trip: 14-18 days.</p>
<p>This is not for every couple. You both need to be reasonably fit and comfortable with altitude. But for adventure-seeking honeymooners, standing on the roof of Africa together and then watching lions hunt at dawn two days later creates a honeymoon narrative that no resort holiday can match.</p>
<p>We organise this combination regularly. The key is building in the rest day between the climb and the safari — your body needs it, and it gives you a chance to do laundry and repack in Moshi before the luxury phase begins. Check our <a href="/tanzania-safari-itinerary/">safari itinerary guide</a> for pairing options.</p>

<h2>Booking Your Honeymoon Safari</h2>
<p>A few practical notes:</p>
<ul>
<li><strong>Book 6-12 months ahead</strong> for peak season (July-October). Top properties like &Beyond Crater Lodge and Singita sell out a year in advance for honeymoon-suitable rooms.</li>
<li><strong>Tell us it's a honeymoon.</strong> Lodges arrange complimentary extras — room upgrades, champagne, cake, flowers, turndown surprises. But only if they know.</li>
<li><strong>Travel insurance is mandatory.</strong> Every luxury operator requires proof of coverage including medical evacuation. A bush-strip evacuation to Nairobi costs $5,000-$15,000 without insurance. Policies with safari coverage run $100-$300 per person.</li>
<li><strong>Internal flights vs driving:</strong> For a honeymoon, fly. The Arusha-Serengeti drive is 7-8 hours. The flight is 90 minutes. Start your honeymoon relaxed, not road-weary.</li>
<li><strong>Visa:</strong> Most nationalities get a visa on arrival at JRO airport ($50 USD). Process takes 15-30 minutes.</li>
</ul>
<p>Ready to start planning? <a href="/tanzania-safaris/">Browse our safari packages</a> or contact us directly. We'll build a custom honeymoon itinerary based on your dates, budget, and what matters most to you — whether that's wildlife, romance, adventure, or all three.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Tanzania a good honeymoon destination?</h3>
<p>Tanzania is one of the best honeymoon destinations in the world because it combines two distinct experiences in one trip — a wildlife safari in the Serengeti and Ngorongoro followed by a tropical beach holiday in Zanzibar. No other destination offers this combination at this quality level. <a href="/luxury-safari-tanzania-guide/">Luxury lodges</a> are designed for romance, and the bush setting creates genuine intimacy.</p>

<h3>How much does a honeymoon safari in Tanzania cost?</h3>
<p>Budget $6,000-$15,000 per couple for 8-10 days including safari, Zanzibar beach extension, internal flights, park fees, and all meals. The lower end uses quality mid-luxury properties during green season. The upper end uses premium lodges like Singita and Mnemba Island during peak season. International flights are additional ($800-$2,000 per person from the US/Europe).</p>

<h3>What is the best time of year for a honeymoon safari?</h3>
<p>June-October for dry season wildlife viewing and warm Zanzibar weather. January-February for calving season, lush landscapes, and slightly lower prices. November offers the best value — 30-40% cheaper with good game viewing and manageable rain.</p>

<h3>How many days do you need for a honeymoon safari?</h3>
<p>8-10 days is the sweet spot: 3-4 nights on safari, 1 night at Ngorongoro Crater, and 4-5 nights in Zanzibar. Shorter trips feel rushed. Longer trips (12-14 days) allow for Kilimanjaro or a more relaxed pace. Going below 7 days means sacrificing either safari depth or beach relaxation.</p>

<h3>Can you combine a honeymoon safari with Zanzibar?</h3>
<p>Absolutely — this is the most popular honeymoon itinerary in East Africa. Fly from the Serengeti or Arusha to Zanzibar (90 minutes to 2 hours). The transition from dusty bush to turquoise ocean is dramatic and exactly the contrast that makes this combination work. We arrange the flights and transfers seamlessly.</p>

<h3>What should I wear on a honeymoon safari?</h3>
<p>Neutral colours (khaki, olive, tan) for game drives, one smart-casual outfit for lodge dinners, and layers for cold mornings on the crater rim. Luxury lodges do same-day laundry, so pack light. For Zanzibar, bring light beach wear and one modest outfit for Stone Town visits. See our <a href="/tanzania-safari-packing-list/">packing list</a> for the full checklist.</p>

<h3>Are honeymoon safaris safe?</h3>
<p>Very safe. You're with a professional guide at all times in the bush, luxury lodges have 24-hour security, and Tanzania's national parks are well-managed. Zanzibar is generally safe for tourists, especially at resort properties. Standard travel precautions apply — travel insurance, malaria prophylaxis, and awareness of your surroundings in Stone Town.</p>

<h3>Do safari lodges offer honeymoon packages?</h3>
<p>Most luxury lodges offer honeymoon extras when notified in advance: room upgrades (subject to availability), champagne on arrival, a complimentary bush dinner or sundowner, flower arrangements, and turndown surprises. Some properties like &Beyond include a complimentary couples spa treatment. Always tell your operator it's a honeymoon — the extras are significant and usually free.</p>

<h3>Should we book a group safari or private safari for our honeymoon?</h3>
<p>Private, without question. A honeymoon safari should be exclusively yours — your vehicle, your guide, your pace. Group joining safaris seat you with 4-6 strangers and follow a fixed schedule. At luxury properties, private game drives are standard. Even at mid-range level, book a private vehicle for the honeymoon premium of $100-$200 per day — it's worth every dollar.</p>

<h3>Is a hot air balloon safari worth it for honeymooners?</h3>
<p>It's the single most memorable experience on a Serengeti honeymoon. Floating above the savanna at sunrise, followed by a champagne breakfast in the bush — the setting is inherently romantic. At $500-$600 per person, it's not cheap, but no honeymoon guest has ever told us they regretted it. Book 2-3 weeks ahead during July-October.</p>

<h3>Can we get married on safari in Tanzania?</h3>
<p>Legal marriages in Tanzania require paperwork filed 21 days in advance, which is logistically difficult for tourists. Most couples opt for a symbolic ceremony on safari — on a kopje at sunset, at a Maasai boma, or on a Zanzibar beach — and handle the legal marriage at home. Several luxury lodges coordinate symbolic ceremonies with decorations, a local officiant, and photography.</p>

<h3>What is the most romantic safari lodge in Tanzania?</h3>
<p>&Beyond Ngorongoro Crater Lodge is the most theatrically romantic — rose petal baths, crater-rim views, baroque-Maasai design. Singita Sasakwa is the most exclusive and elegant. The Highlands by Asilia is the most architecturally unique. For beachfront romance after the safari, Mnemba Island is in a category of its own. The right choice depends on your style as a couple.</p>
`;

const budgetContent = `
<p>Here's the truth most safari companies won't tell you: the lions in the Serengeti don't check your credit card before they hunt. A wildebeest crossing the Mara River looks exactly the same whether you paid $150 a day or $1,500. The wildlife doesn't care about your budget — and with the right planning, neither should you.</p>
<p>We've been running safaris from Moshi at every price point for over fifteen years. We've had guests on $800 three-day camping trips come back with photos identical to those from guests on $8,000 luxury fly-in safaris. The difference is in thread count and champagne, not in animal sightings. This guide shows you how to experience Tanzania's greatest wildlife spectacle without draining your savings — and where cutting costs will actually ruin the trip.</p>

<h2>Budget Tiers: What Your Money Actually Buys</h2>
<p>Before we dive into savings tactics, you need to understand what each price tier actually delivers. "Budget safari" means different things to different people, and the gap between $100/day and $400/day is significant.</p>

<h3>Shoestring: $100-$150 Per Person Per Day</h3>
<p>Group joining safaris with 4-6 other travellers in a shared Land Cruiser or extended safari van. Accommodation in TANAPA public campsites ($35/person/night) or basic guesthouses outside the park gates. Meals are cooked by a camp cook — simple but filling (rice, beans, grilled chicken, fresh fruit). You'll see the same animals as everyone else, but the vehicle may be older, the pop-up roof might stick, and you won't have a say in how long you stay at a sighting. Best for solo travellers and backpackers who want the real deal without the frills.</p>

<h3>Comfortable Budget: $150-$250 Per Person Per Day</h3>
<p>This is the sweet spot. Private vehicle with a dedicated guide (just your group, your pace). Accommodation in mid-range tented camps or budget lodges inside or adjacent to the parks — places like Kati Kati in the Serengeti ($100-$150/night) or Marera Valley Lodge in Karatu ($80-$120/night). Meals are a step up — proper dining rooms, varied menus, and cold drinks available. Your guide has enough experience to find the animals efficiently, and the vehicle is well-maintained with a functional pop-up roof. This tier delivers 90% of the luxury experience at 30% of the price.</p>

<h3>Smart Mid-Range: $250-$400 Per Person Per Day</h3>
<p>Quality lodges with swimming pools, comfortable rooms, and professional service. Properties like Serengeti Serena ($300-$450/night), Ngorongoro Farm House ($150-$250/night), or Maramboi Tented Lodge in Tarangire ($200-$300/night). Private vehicle with a senior guide — someone with 10+ years of experience who knows every lion pride by name. This tier is technically "mid-range" by Tanzania standards, but guests from Europe and the US consistently say it exceeds their expectations. You're comfortable, well-fed, and guided by someone who transforms game drives into a masterclass in ecology.</p>

<h2>How to Save Money on a Tanzania Safari</h2>
<p>These are the legitimate strategies that reduce cost without reducing the quality of your wildlife experience. We use every one of them when building <a href="/tanzania-safari-cost/">budget-conscious itineraries</a> for our guests.</p>

<h3>Travel in Green Season (30-40% Savings)</h3>
<p>March-May is the "long rains" and the cheapest time to safari. Lodge rates drop 30-40%, park roads are quieter, and the landscape is lush and green (great for photography). The catch: afternoon rain is common (1-2 hours), some secondary roads become difficult, and animals disperse across wider areas because water is everywhere. But an experienced guide compensates — they know where animals shelter during rain and where predators hunt in green-season patterns.</p>
<p>November is the better budget pick. The "short rains" are lighter and less consistent than March-May. Prices are nearly as low, wildlife viewing is strong (the migration is often in the southern Serengeti), and you avoid the muddiest roads. If you can travel in November, do it.</p>

<h3>Group Joining Safaris (Share Vehicle Costs)</h3>
<p>A private safari vehicle costs $250-$400 per day to operate (fuel, guide salary, vehicle depreciation, maintenance). On a private safari, your group absorbs that cost alone. On a group joining safari, you share it with 4-6 others — dropping the per-person vehicle cost from $125-$200/day to $40-$65/day. The trade-off: you can't control the pace, departure time, or how long you stay at sightings. But for a first safari, group joining is an excellent way to experience the parks affordably. We match solo travellers and couples with compatible groups.</p>

<h3>Camping Safaris</h3>
<p>TANAPA (Tanzania National Parks Authority) operates public campsites in every major park. The cost is $35 per person per night — compared to $100-$500+ at lodges. Facilities are basic: a cleared area with a long-drop toilet and sometimes a cold shower. You'll need a sleeping bag, sleeping mat, and tolerance for sounds of wildlife around the camp at night (buffalo and hyena are regular visitors to Serengeti campsites). A camp cook prepares meals, and the experience of falling asleep to lion roars 500 metres away is something no lodge can replicate. <a href="/tanzania-camping-safaris/">Our camping safari packages</a> include all equipment except sleeping bags.</p>

<h3>Shorter Trips (Fewer Days = Lower Total Cost)</h3>
<p>A 3-4 day safari covering Tarangire and Ngorongoro costs $800-$1,200 per person all-inclusive. That's a genuine, complete safari — elephants in Tarangire, the Big Five in the crater, ancient baobab forests, and Maasai culture. You miss the Serengeti, which hurts, but if your budget caps at $1,200, three powerful days in two world-class parks beats staying home and dreaming about five.</p>
<p>If you have one extra day, the 4-day version adds Lake Manyara and eliminates the rushed feeling. At $1,000-$1,500, it's the best value safari in Tanzania.</p>

<h3>Skip Internal Flights (Save $250-$400 Per Segment)</h3>
<p>Flying from Arusha to the Serengeti costs $250-$400 per person one way. The drive takes 7-8 hours but passes through the stunning Ngorongoro highlands, and you game-drive as soon as you enter the park — effectively turning the drive into a full day of sightings. For budget travellers, driving is a no-brainer. You save $500-$800 round-trip and gain game-viewing time. The only exception: if you're adding Zanzibar after the safari, the flight from Serengeti to Zanzibar ($300-$450) saves you a 10-hour drive back to Arusha plus a separate flight.</p>

<h3>Book Directly with Local Operators</h3>
<p>International travel agents and online platforms mark up safari prices by 20-40%. They add their commission, their marketing costs, and their profit margin to what the local operator charges. By booking directly with a Tanzania-based company, you cut out the middleman entirely. We quote the same price whether you find us through Google, a referral, or a travel agent — but the travel agent adds $300-$1,500 on top. Ask any operator for a direct quote before booking through an aggregator.</p>

<h2>Budget-Friendly Parks: Where to Get the Most Value</h2>
<p>Not all parks cost the same. TANAPA park fees vary significantly, and some parks deliver disproportionate value for their entry cost.</p>

<h3>Tarangire National Park — $53/Day (Best Value)</h3>
<p>Tarangire is the most underrated park in Tanzania. During the dry season (June-October), it hosts the second-largest animal concentration in the country after the Serengeti. The Tarangire River acts as a lifeline — herds of 200-300 elephants gather along its banks, and the ancient baobab forests provide a dramatic backdrop that photographs beautifully. You'll see elephant, lion, leopard, buffalo, giraffe, zebra, wildebeest, and over 550 bird species. At $53/day in park fees, it's less than half the cost of the Serengeti and delivers comparable (sometimes superior) elephant encounters. For budget safaris, Tarangire is non-negotiable.</p>

<h3>Lake Manyara National Park — $53/Day (Compact and Efficient)</h3>
<p>Lake Manyara is small (330 square kilometres) but packed with diversity. The groundwater forest at the entrance is home to troops of baboons and blue monkeys. The lake attracts flamingos by the thousands. And the tree-climbing lions — while not guaranteed — are a genuine phenomenon found in only two parks in Africa. Because the park is compact, a half-day visit covers it thoroughly, making it ideal as a day trip add-on. Combine with Tarangire for a budget-friendly 2-park circuit.</p>

<h3>Ngorongoro Conservation Area — $82 + $295 Crater Fee (Expensive but Unmissable)</h3>
<p>The Ngorongoro Crater is the most expensive single-day experience in Tanzania: $82 conservation fee plus $295 crater service fee per vehicle. For a group of four, that's $295/vehicle + $328/person total. It's a lot. But the crater is a natural amphitheatre containing roughly 25,000 animals including all of the Big Five and 26 critically endangered black rhinos. There is nowhere else on Earth where you're this likely to see a rhino in the wild. Skip it only if your budget genuinely cannot stretch. If you can afford one splurge day, make it this one.</p>

<h3>Serengeti National Park — $82/Day (Worth Every Penny)</h3>
<p>At $82/day in park fees, the Serengeti is expensive — but it's the Serengeti. The <a href="/best-time-safari-tanzania/">Great Migration</a>, the highest density of predators in Africa, and landscapes that define the word "safari." Budget travellers should plan a minimum of 2 nights (3 days of game driving) to justify the drive-in time and cost. Camping at Seronera public campsite ($35/night) is the most affordable way to experience the world's greatest wildlife arena.</p>

<h2>Where NOT to Cut Costs</h2>
<p>Budget travel requires knowing what to save on and what to protect. These three areas are where cutting costs will genuinely damage your safari experience:</p>

<h3>Never Cheap Out on the Guide</h3>
<p>Your guide makes or breaks the safari. A great guide finds animals you'd drive past, explains the ecology behind what you're seeing, and keeps you safe. A bad guide follows other vehicles, can't identify birds, and checks his phone during game drives. The difference between a $50/day and a $100/day guide is the difference between a mediocre trip and a life-changing one. When comparing safari quotes, ask about guide experience. If the operator can't tell you your guide's name and years of experience, look elsewhere.</p>

<h3>Don't Skip Travel Insurance</h3>
<p>A comprehensive travel insurance policy costs $100-$300 per person and covers medical evacuation, trip cancellation, and emergency treatment. A medical evacuation from the Serengeti to Nairobi by AMREF Flying Doctors costs $5,000-$15,000 without insurance. A broken leg, a burst appendix, a serious allergic reaction — these things happen, and the nearest hospital is hours away by road. Every year, we see at least one guest need emergency evacuation. Every single one who had insurance was grateful. The ones without insurance faced a bill that cost more than the entire safari.</p>

<h3>Avoid Operators Charging Less Than $150/Day</h3>
<p>If a safari quote seems too good to be true, it is. Operators charging below $150 per person per day cut corners that affect your safety and experience: unmaintained vehicles (breakdowns in the bush are not romantic), underpaid guides (who leave for better jobs, so you get the new recruit), skipped park fees (yes, some operators enter parks without paying — if caught, you're ejected), and food quality that risks illness. The $150/day floor exists for a reason: park fees ($53-$82/day), vehicle costs ($40-$60/day), guide salary ($25-$40/day), fuel ($20-$30/day), and food ($15-$25/day) leave almost no margin below that level.</p>

<h2>Sample Budget Safari Itineraries</h2>
<p>These are real itineraries we run regularly, with actual prices. All prices are per person, all-inclusive (park fees, vehicle, guide, accommodation, meals).</p>

<h3>3-Day Tarangire + Ngorongoro: $800-$1,200</h3>
<p>Day 1: Arusha → Tarangire (full day game drive, overnight camping or budget lodge). Day 2: Tarangire → Ngorongoro (morning game drive, afternoon transfer, overnight on crater rim). Day 3: Ngorongoro Crater (full crater game drive, return to Arusha by evening). This is our most popular budget itinerary — two iconic parks, the Big Five, and three days of intensive wildlife viewing.</p>

<h3>4-Day Camping Safari: $1,000-$1,500</h3>
<p>Day 1: Arusha → Lake Manyara (afternoon game drive, overnight at campsite). Day 2: Lake Manyara → Ngorongoro (morning in Manyara, afternoon transfer). Day 3: Ngorongoro Crater (full day, overnight at Simba Campsite on the rim). Day 4: Ngorongoro → Tarangire (morning transfer, full day in Tarangire, return to Arusha). Camping throughout keeps costs low. You'll hear hyenas at Simba Campsite and buffalo at Tarangire — part of the adventure.</p>

<h3>5-Day Budget Classic: $1,500-$2,500</h3>
<p>Day 1: Arusha → Tarangire. Day 2: Tarangire → Ngorongoro. Day 3: Ngorongoro Crater → Serengeti. Day 4: Full day in the Serengeti. Day 5: Serengeti → Arusha. This itinerary covers the three essential parks and is the minimum we recommend for the <a href="/tanzania-safari-itinerary/">full northern circuit experience</a>. At the $1,500 level, you're camping. At $2,500, you're in budget lodges and tented camps. Either way, you see everything.</p>

<h2>Group Joining vs Private Safari</h2>
<p>This is the most important decision for budget travellers. Here's an honest comparison:</p>
<table>
<thead><tr><th>Factor</th><th>Group Joining</th><th>Private Safari</th></tr></thead>
<tbody>
<tr><td>Vehicle</td><td>Shared with 4-6 others</td><td>Exclusive to your group</td></tr>
<tr><td>Schedule</td><td>Fixed departure dates and times</td><td>Flexible — your pace</td></tr>
<tr><td>Cost per person</td><td>$100-$180/day</td><td>$200-$400/day</td></tr>
<tr><td>Sighting time</td><td>Group consensus (majority rules)</td><td>You decide</td></tr>
<tr><td>Guide attention</td><td>Split among all guests</td><td>100% focused on you</td></tr>
<tr><td>Ideal for</td><td>Solo travellers, backpackers, couples on a tight budget</td><td>Families, couples, photographers, anyone who values flexibility</td></tr>
<tr><td>Availability</td><td>Fixed dates (usually daily June-Oct, less frequent Nov-May)</td><td>Any date you choose</td></tr>
</tbody>
</table>
<p>Our recommendation: if you can afford the private safari premium ($50-$100/day more per person), take it. The flexibility to spend 30 minutes with a leopard instead of 5 minutes (because someone in the group is bored) is worth the extra cost. If budget is absolute, group joining safaris deliver genuine, memorable wildlife experiences — you're seeing the same animals in the same parks.</p>

<h2>Booking Tips for Budget Safaris</h2>
<ul>
<li><strong>Book 3-6 months ahead:</strong> Last-minute safaris rarely save money in Tanzania. Park fees are fixed, vehicle costs are fixed, and accommodation rates go up (not down) as availability decreases. Booking 3-6 months ahead locks in rates and guarantees your preferred dates.</li>
<li><strong>Avoid Christmas and New Year:</strong> December 20 - January 5 carries a peak-season premium of 30-50% at most properties. If you can travel the first two weeks of December or after January 10, you'll save significantly with nearly identical weather and wildlife.</li>
<li><strong>Ask about last-minute deals:</strong> While last-minute doesn't save on park fees or vehicle costs, some lodges and tented camps offer discounts to fill empty beds — especially during green season. Ask your operator if any accommodation deals are available for your dates.</li>
<li><strong>Travel with more people:</strong> A private vehicle costs the same whether it carries 2 people or 6. A couple pays $125-$200/day each for the vehicle. A group of 6 pays $40-$65 each. If you can travel with friends or family, the per-person saving is dramatic.</li>
<li><strong>Consider a northern Tanzania + Zanzibar combo:</strong> Adding Zanzibar after a budget safari doesn't have to be expensive. Budget beach lodges on the east coast run $30-$80/night. The ferry from Dar es Salaam to Zanzibar is $35. A post-safari beach break adds $200-$500 to your trip, not $2,000.</li>
</ul>

<h2>Is a Budget Safari Worth It?</h2>
<p>We get this question constantly, usually from people who've been told they need $500/day minimum for a "real" safari. That's marketing, not reality.</p>
<p>A well-run budget safari with a competent guide in a maintained vehicle delivers an extraordinary wildlife experience. You will see lions hunt, elephants at water, the Ngorongoro Crater teeming with life, and sunsets that make you forget to breathe. The animals don't know what you paid.</p>
<p>What you give up at the budget level: thread count, wine lists, private plunge pools, and the exclusivity of having your own vehicle (on group joining trips). What you gain: the same wildlife, the same sunsets, the same once-in-a-lifetime moments, and enough savings to come back and do it again.</p>
<p>Ready to plan? <a href="/tanzania-safaris/">Browse our safari options</a> or contact us for a custom quote. Tell us your dates, group size, and budget — we'll build the best possible itinerary within your numbers. No upselling, no bait-and-switch. Just honest safari planning from a team that runs these routes every single day.</p>

<h2>Frequently Asked Questions</h2>

<h3>What is the cheapest way to go on safari in Tanzania?</h3>
<p>A 3-day group joining camping safari covering Tarangire and Ngorongoro costs $800-$1,200 per person all-inclusive. This is the absolute floor for a legitimate safari experience — park fees, a shared vehicle with guide, basic camping, and all meals. Anything cheaper than $150/day per person raises red flags about vehicle maintenance, guide quality, or unpaid park fees.</p>

<h3>Is $1,000 enough for a Tanzania safari?</h3>
<p>Yes — $1,000 covers a solid 3-day camping safari through Tarangire and Ngorongoro with all park fees, a guide, meals, and accommodation included. You'll see the Big Five, elephants by the hundreds, and one of the most spectacular landscapes on Earth. It won't include the Serengeti (add $500-$800 for 2 extra days), but it's a complete, legitimate safari experience.</p>

<h3>How can I save money on a Tanzania safari?</h3>
<p>The five biggest savings: travel in green season (March-May or November) for 30-40% off lodge rates, join a group safari to share vehicle costs, camp at TANAPA sites ($35/night vs $100-$500 at lodges), skip internal flights and drive between parks, and book directly with a local operator to avoid the 20-40% international agent markup.</p>

<h3>Are cheap safaris in Tanzania safe?</h3>
<p>Safaris priced at $150-$250/day from reputable operators are safe. Below $150/day, safety risks increase: older vehicles with deferred maintenance, undertrained guides, and operators who cut corners on park fees. Check reviews, ask about vehicle age and guide experience, and verify the operator is licensed by the Tanzania Tourist Board. If the price seems impossibly low, something is being compromised.</p>

<h3>What is the best budget safari park in Tanzania?</h3>
<p>Tarangire National Park at $53/day in park fees. It has the second-largest animal concentration in Tanzania during dry season, massive elephant herds (200-300 at a time), ancient baobab forests, and excellent birdwatching (550+ species). It's less than half the cost of Serengeti park fees and delivers comparable wildlife density for elephants, giraffes, and predators.</p>

<h3>Should I do a camping safari or stay in lodges?</h3>
<p>Camping saves $65-$465 per night compared to lodges. TANAPA campsites cost $35/person/night and put you in the middle of the action — you'll hear lions roar and hyenas call. Lodges offer comfort, hot showers, and proper beds. If you enjoy camping and want to save money, it's a no-brainer. If you need a hot shower and a real mattress after a long game drive, budget lodges starting at $80-$120/night are a reasonable compromise.</p>

<h3>Is green season good for safari?</h3>
<p>Green season (March-May, November) offers lush landscapes, dramatic skies, fewer tourists, and 30-40% lower prices. Wildlife viewing is slightly harder as animals disperse with widespread water availability, but an experienced guide compensates. Baby animals are everywhere (calving season is January-March), and the photography is arguably better — green backgrounds and dramatic cloud formations beat dusty brown plains. November is the best green-season month for balancing value and viewing.</p>

<h3>How much do park fees cost in Tanzania?</h3>
<p>Tarangire and Lake Manyara: $53/person/day. Serengeti: $82/person/day. Ngorongoro Conservation Area: $82/person/day plus a $295 crater service fee per vehicle for crater descent. These are government-set fees and non-negotiable — every operator pays the same amount. Park fees typically represent 25-40% of a budget safari's total cost.</p>

<h3>Can I do a self-drive safari in Tanzania?</h3>
<p>Technically yes, but we strongly advise against it. Tanzania's parks require 4x4 vehicles with high clearance, roads are unpaved and poorly marked, there's no mobile phone signal in most parks, and you need to know where to find animals. A guide with 10+ years of experience will show you in 3 days what a self-driver might find in 10. The cost of renting a suitable 4x4 ($100-$150/day) plus park fees often exceeds the cost of a guided budget safari.</p>

<h3>How far in advance should I book a budget safari?</h3>
<p>3-6 months for dry season (June-October), 1-3 months for green season. Group joining safaris during peak season fill up 2-3 months ahead. Budget accommodations inside the parks have limited availability and sell out faster than luxury properties. Booking early doesn't save money (prices are fixed), but it guarantees your dates and preferred accommodation.</p>

<h3>Is it cheaper to book a safari locally in Tanzania?</h3>
<p>Usually, yes. Booking directly with a licensed Tanzanian operator saves the 20-40% markup that international agents add. However, "cheaper" should not mean "cheapest operator you can find on the ground in Arusha." Street touts offering $100/day safaris are the source of most bad safari experiences. Book directly with an established operator, read reviews, and verify licensing before paying.</p>

<h3>What is included in a budget safari price?</h3>
<p>A legitimate all-inclusive budget safari price ($150-$250/day) covers: park entrance fees, a 4x4 vehicle with pop-up roof, a professional English-speaking guide, accommodation (camping or budget lodge), three meals per day plus drinking water, and airport/hotel transfers. Not included: international flights, visa ($50), travel insurance ($100-$300), alcoholic drinks, tips ($15-$25/day for guide), and personal items. Always confirm what's included before booking — hidden extras are the fastest way to blow a budget.</p>
`;

async function main() {
  console.log("Seeding 2 Tanzania Safari blog posts (honeymoon + budget)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "safari" },
    update: { name: "Safari" },
    create: { slug: "safari", name: "Safari" },
  });

  // Post 1 tags
  const tagHoneymoonSafari = await prisma.tag.upsert({
    where: { slug: "honeymoon-safari" },
    update: { name: "Honeymoon Safari" },
    create: { slug: "honeymoon-safari", name: "Honeymoon Safari" },
  });
  const tagTanzaniaSafari = await prisma.tag.upsert({
    where: { slug: "tanzania-safari" },
    update: { name: "Tanzania Safari" },
    create: { slug: "tanzania-safari", name: "Tanzania Safari" },
  });
  const tagLuxurySafari = await prisma.tag.upsert({
    where: { slug: "luxury-safari" },
    update: { name: "Luxury Safari" },
    create: { slug: "luxury-safari", name: "Luxury Safari" },
  });
  const tagRomanticTravel = await prisma.tag.upsert({
    where: { slug: "romantic-travel" },
    update: { name: "Romantic Travel" },
    create: { slug: "romantic-travel", name: "Romantic Travel" },
  });

  // Post 2 tags
  const tagBudgetSafari = await prisma.tag.upsert({
    where: { slug: "budget-safari" },
    update: { name: "Budget Safari" },
    create: { slug: "budget-safari", name: "Budget Safari" },
  });
  const tagSafariPlanning = await prisma.tag.upsert({
    where: { slug: "safari-planning" },
    update: { name: "Safari Planning" },
    create: { slug: "safari-planning", name: "Safari Planning" },
  });
  const tagAffordableSafari = await prisma.tag.upsert({
    where: { slug: "affordable-safari" },
    update: { name: "Affordable Safari" },
    create: { slug: "affordable-safari", name: "Affordable Safari" },
  });

  // Post 1: Honeymoon Safari Tanzania
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "honeymoon-safari-tanzania" },
    update: {
      title: "Honeymoon Safari Tanzania: Romantic Getaway Guide",
      excerpt:
        "Complete honeymoon safari guide for Tanzania. Best romantic lodges, Zanzibar beach extensions, private bush dinners, balloon safaris, proposal ideas, and 8-10 day itineraries from $6,000 per couple.",
      content: honeymoonContent,
      metaTitle: "Honeymoon Safari Tanzania | Romantic Guide 2026",
      metaDescription:
        "Plan a honeymoon safari in Tanzania. Romantic lodges, Zanzibar extensions, private bush dinners, and itineraries from $6,000 per couple. Local operator guide.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "honeymoon-safari-tanzania",
      title: "Honeymoon Safari Tanzania: Romantic Getaway Guide",
      excerpt:
        "Complete honeymoon safari guide for Tanzania. Best romantic lodges, Zanzibar beach extensions, private bush dinners, balloon safaris, proposal ideas, and 8-10 day itineraries from $6,000 per couple.",
      content: honeymoonContent,
      metaTitle: "Honeymoon Safari Tanzania | Romantic Guide 2026",
      metaDescription:
        "Plan a honeymoon safari in Tanzania. Romantic lodges, Zanzibar extensions, private bush dinners, and itineraries from $6,000 per couple. Local operator guide.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagHoneymoonSafari, tagTanzaniaSafari, tagLuxurySafari, tagRomanticTravel]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: honeymoon-safari-tanzania");

  // Post 2: Budget Safari Tanzania
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "budget-safari-tanzania" },
    update: {
      title: "Budget Safari Tanzania: Affordable Wildlife Adventures",
      excerpt:
        "Honest budget safari guide for Tanzania. Three price tiers ($100-$400/day), money-saving strategies, budget-friendly parks, sample itineraries from $800, and where NOT to cut costs.",
      content: budgetContent,
      metaTitle: "Budget Safari Tanzania | Affordable Guide 2026",
      metaDescription:
        "Budget Tanzania safari guide with real prices. Camping safaris from $800, group joining options, park fee breakdown, and tips from a Moshi-based operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "budget-safari-tanzania",
      title: "Budget Safari Tanzania: Affordable Wildlife Adventures",
      excerpt:
        "Honest budget safari guide for Tanzania. Three price tiers ($100-$400/day), money-saving strategies, budget-friendly parks, sample itineraries from $800, and where NOT to cut costs.",
      content: budgetContent,
      metaTitle: "Budget Safari Tanzania | Affordable Guide 2026",
      metaDescription:
        "Budget Tanzania safari guide with real prices. Camping safaris from $800, group joining options, park fee breakdown, and tips from a Moshi-based operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagBudgetSafari, tagTanzaniaSafari, tagSafariPlanning, tagAffordableSafari]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: budget-safari-tanzania");

  console.log("\nDone — 2 safari blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
