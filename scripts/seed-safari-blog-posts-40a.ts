import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const itineraryContent = `
<p>Planning a Tanzania safari means choosing between dozens of possible routes, parks, and durations. After organising thousands of safaris from our base in Moshi, we've refined the four itineraries that consistently deliver the best wildlife sightings, the smoothest logistics, and the highest guest satisfaction. Whether you have three days or ten, one of these plans will fit.</p>

<h2>How to Use These Itineraries</h2>
<p>Each plan below is a proven template — not a rigid schedule. We adjust daily based on migration patterns, road conditions, and what our scouts report from the field. Driving times are realistic estimates (not Google Maps optimism), and cost ranges cover the full spectrum from budget camping to luxury lodges.</p>
<p>All itineraries start and end in Arusha, Tanzania's safari capital. If you're arriving via <a href="/tanzania-safaris/">Kilimanjaro International Airport (JRO)</a>, we'll collect you and overnight in Arusha before your safari begins.</p>

<h2>3-Day Express Safari: Tarangire & Ngorongoro</h2>
<p>Best for travellers with limited time — perhaps combining with a <a href="/tanzania-destinations/">Kilimanjaro climb</a> — this itinerary packs two world-class parks into three intense days.</p>

<h3>Day 1: Arusha → Tarangire National Park</h3>
<p>Depart Arusha at 7:30 AM. The drive to Tarangire takes roughly 2.5 hours via the Dodoma highway. Enter through the main gate and begin your game drive immediately. Tarangire during the dry season is elephant heaven — herds of 200-300 gather along the Tarangire River, the park's lifeline. Ancient baobab trees dot the landscape, some over 800 years old. Keep your eyes open for tree-climbing pythons, fringe-eared oryx, and the endemic ashy starling. Afternoon game drive until the gate closes at 6:30 PM.</p>
<ul>
<li><strong>Budget:</strong> TANAPA public campsite ($35/person) — basic but functional</li>
<li><strong>Mid-range:</strong> Tarangire Safari Lodge ($180-$280/person) — escarpment views</li>
<li><strong>Luxury:</strong> Oliver's Camp ($600-$900/person) — walking safaris included</li>
</ul>

<h3>Day 2: Tarangire → Ngorongoro Conservation Area</h3>
<p>Morning game drive in Tarangire (the early hours are best for predator activity), then depart for Ngorongoro around 10 AM. The drive takes approximately 3 hours via Karatu. Check into your accommodation on the crater rim. If time permits, visit a Maasai boma for a cultural experience. The sunset from the crater rim is extraordinary — 600 metres below, you can sometimes spot elephants and buffalo with binoculars.</p>
<ul>
<li><strong>Budget:</strong> Simba Campsite on the rim ($50/person) — cold but spectacular</li>
<li><strong>Mid-range:</strong> Ngorongoro Farm House in Karatu ($150-$250/person)</li>
<li><strong>Luxury:</strong> &Beyond Ngorongoro Crater Lodge ($1,200-$2,000/person)</li>
</ul>

<h3>Day 3: Ngorongoro Crater → Arusha</h3>
<p>Descend into the crater at first light (6:30 AM). The 19-kilometre-wide caldera holds roughly 25,000 animals including all of the <a href="/big-five-tanzania/">Big Five</a>. Your best chance of seeing the critically endangered black rhino is here — around 26 individuals roam the crater floor. The hippo pool is a guaranteed stop, and flamingos often line Lake Magadi in the centre. Allow 5-6 hours on the crater floor. Ascend by early afternoon and drive back to Arusha, arriving by 5-6 PM.</p>
<p><strong>Total cost range:</strong> $1,200-$2,500 per person (all-inclusive with park fees, vehicle, guide, accommodation, meals)</p>

<h2>5-Day Classic Safari: Tarangire, Ngorongoro & Serengeti</h2>
<p>This is our most popular itinerary and the one we recommend for first-time safari visitors. Five days gives you enough time to experience three distinctly different ecosystems without feeling rushed.</p>

<h3>Day 1: Arusha → Tarangire</h3>
<p>Same as the 3-day plan. Full day game drive in Tarangire with overnight in the park.</p>

<h3>Day 2: Tarangire → Ngorongoro Crater</h3>
<p>Morning game drive, then transfer to Ngorongoro (3 hours). Afternoon at leisure on the crater rim or visit a local coffee plantation in Karatu.</p>

<h3>Day 3: Ngorongoro Crater → Serengeti</h3>
<p>Early crater descent for a 4-hour game drive. After ascending, continue through the Ngorongoro highlands and descend into the Serengeti via the Naabi Hill Gate. The transition is dramatic — highland forest gives way to endless golden plains. Afternoon game drive in the Seronera area (central Serengeti), the year-round wildlife hub where the Seronera River attracts resident populations of lion, leopard, elephant, and hippo.</p>
<ul>
<li><strong>Budget:</strong> Seronera public campsite ($35/person)</li>
<li><strong>Mid-range:</strong> Serengeti Serena Safari Lodge ($300-$450/person)</li>
<li><strong>Luxury:</strong> Four Seasons Safari Lodge ($800-$1,500/person)</li>
</ul>

<h3>Day 4: Full Day in the Serengeti</h3>
<p>Full day exploring different zones of the Serengeti. During migration season (June-October), we drive to the northern Serengeti or western corridor depending on where the herds are. Outside migration season, Seronera delivers reliable big cat sightings — the area has one of the highest densities of leopards in Africa. Pack a picnic lunch to maximise your time in the field. Optional: hot air balloon safari at dawn ($500-$600 per person, includes champagne breakfast on the savanna).</p>

<h3>Day 5: Serengeti → Arusha</h3>
<p>Early morning game drive for final sightings, then transfer back to Arusha. The drive is long (7-8 hours) through the Ngorongoro Conservation Area, but the scenery makes up for it. Alternatively, fly from Seronera airstrip to Arusha ($250-$350 one way, 1.5 hours) to save time and see the Rift Valley from above.</p>
<p><strong>Total cost range:</strong> $2,500-$5,000 per person</p>

<h2>7-Day Ultimate Northern Circuit</h2>
<p>Seven days lets you experience every major park in the northern circuit without rushing. This is our recommended duration for serious wildlife enthusiasts and photographers.</p>

<h3>Day 1: Arusha → Lake Manyara</h3>
<p>Short 2-hour transfer to <a href="/lake-manyara-national-park-guide/">Lake Manyara National Park</a>. Afternoon game drive along the Rift Valley escarpment. Look for the famous tree-climbing lions, massive baboon troops at the park entrance, and flamingo flocks on the alkaline lake. The groundwater forest at the entrance is home to blue monkeys and vervet monkeys. Optional night game drive (extra $50 — one of few parks that offers them).</p>

<h3>Day 2: Lake Manyara → Ngorongoro</h3>
<p>Morning game drive in Manyara, then short transfer to the <a href="/ngorongoro-crater-guide/">Ngorongoro Conservation Area</a> (45 minutes). Afternoon visit to Olduvai Gorge museum — the "Cradle of Mankind" where Louis and Mary Leakey discovered 1.8-million-year-old hominid fossils. Sunset on the crater rim.</p>

<h3>Day 3: Ngorongoro Crater</h3>
<p>Full day dedicated to the crater. Descend at dawn when the light is golden and the animals are most active. The crater floor covers 260 square kilometres — enough for a full day without retracing your route. Highlights: black rhino in the Lerai Forest, lion prides near the Ngoitokitok Spring, hippo pools, and massive buffalo herds. Crater service fee is $295 per vehicle — expensive but worth every shilling.</p>

<h3>Day 4: Ngorongoro → Serengeti</h3>
<p>Depart for the Serengeti after breakfast. The 3-hour drive crosses the short-grass plains where wildebeest calving happens in January-February. Enter through Naabi Hill and drive to your accommodation area — the specific zone depends on the <a href="/serengeti-great-migration-guide/">Great Migration</a> position. Afternoon game drive.</p>

<h3>Days 5-6: Serengeti Exploration</h3>
<p>Two full days in the Serengeti allows exploration of multiple zones. Day 5: concentrate on the Seronera Valley for big cats and river wildlife. Day 6: drive to the northern or western Serengeti based on current animal movements. We receive daily reports from our driver network across the park, so we know where the action is. A second Serengeti day dramatically increases your chances of witnessing a hunt.</p>

<h3>Day 7: Serengeti → Arusha</h3>
<p>Final morning drive, then return to Arusha by road or fly out from Seronera.</p>
<p><strong>Total cost range:</strong> $4,000-$8,000 per person</p>

<h2>10-Day Safari & Beach: Northern Circuit + Zanzibar</h2>
<p>The ultimate Tanzania experience — world-class wildlife followed by tropical beach perfection. This is our top recommendation for honeymoons and once-in-a-lifetime trips.</p>

<h3>Days 1-2: Tarangire & Lake Manyara</h3>
<p>Day 1 in <a href="/tarangire-national-park-guide/">Tarangire</a> for elephants and baobabs. Day 2 in Lake Manyara for tree-climbing lions and birding, then transfer to Ngorongoro.</p>

<h3>Days 3-4: Ngorongoro & Serengeti Transfer</h3>
<p>Day 3: full crater game drive. Day 4: transfer to Serengeti with game driving en route.</p>

<h3>Days 5-6: Serengeti</h3>
<p>Two full days exploring the Serengeti's different ecosystems. Dawn and dusk drives for the best predator activity.</p>

<h3>Day 7: Fly to Zanzibar</h3>
<p>Morning game drive, then fly from Seronera to Zanzibar ($300-$450). Arrive by early afternoon on the spice island. Transfer to your beach resort on the east coast (Nungwi, Kendwa, or Paje).</p>

<h3>Days 8-10: Zanzibar</h3>
<p>Day 8: Stone Town walking tour — UNESCO World Heritage site with winding alleys, the House of Wonders, slave market memorial, and spice market. Day 9: beach day with optional snorkelling at Mnemba Atoll or Chumbe Island (pristine coral reefs). Day 10: spice tour in the morning, afternoon at leisure, evening transfer to Zanzibar airport for departure.</p>
<p><strong>Total cost range:</strong> $5,500-$12,000 per person</p>

<h2>Road Transfer vs Fly-In Safari</h2>
<p>The biggest logistical decision is whether to drive between parks or fly.</p>
<table>
<thead><tr><th>Factor</th><th>Road Transfer</th><th>Fly-In</th></tr></thead>
<tbody>
<tr><td>Arusha → Serengeti</td><td>7-8 hours (game viewing en route)</td><td>1.5 hours</td></tr>
<tr><td>Cost per person</td><td>Included in safari price</td><td>$250-$450 one way</td></tr>
<tr><td>Scenery</td><td>Ngorongoro highlands, Rift Valley</td><td>Aerial views of the crater</td></tr>
<tr><td>Best for</td><td>First-timers, budget, photographers</td><td>Short trips, luxury, repeat visitors</td></tr>
</tbody>
</table>
<p>Our recommendation: drive on your first trip. The overland journey through the Ngorongoro highlands is spectacular and you'll spot wildlife along the way. On return visits or short trips, fly in to maximise your game-drive time.</p>

<h2>Best Time for Each Itinerary</h2>
<p>Timing matters. Here's when each itinerary shines brightest:</p>
<ul>
<li><strong>3-Day Express:</strong> June-October (dry season concentrates animals at water sources in Tarangire and on the crater floor)</li>
<li><strong>5-Day Classic:</strong> Year-round, but July-October for the <a href="/best-time-safari-tanzania/">best Serengeti game viewing</a></li>
<li><strong>7-Day Ultimate:</strong> January-February for calving season, or July-October for river crossings</li>
<li><strong>10-Day Safari + Beach:</strong> June-September (dry season for safari, warm and dry for Zanzibar beaches)</li>
</ul>
<p>Green season (March-May, November) offers 30-40% lower prices, lush landscapes, and fewer tourists. Wildlife viewing is slightly harder as animals disperse across wider areas, but an experienced guide makes a huge difference. Check our <a href="/tanzania-safari-cost/">cost guide</a> for detailed seasonal pricing.</p>

<h2>How to Customise Your Itinerary</h2>
<p>These templates are starting points. Common customisations we arrange:</p>
<ul>
<li><strong>Add a walking safari</strong> in Tarangire or the Ngorongoro highlands (half-day or full-day)</li>
<li><strong>Include a cultural visit</strong> — Maasai boma, Hadzabe hunter-gatherer tribe, or Iraqw community</li>
<li><strong>Extend the Serengeti</strong> — add a mobile camp that follows the migration</li>
<li><strong>Add Lake Eyasi</strong> — for Hadzabe and Datoga cultural immersion (1 day)</li>
<li><strong>Swap Zanzibar for Mafia Island</strong> — better diving, whale sharks (October-March), fewer tourists</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What is the best Tanzania safari itinerary for first-timers?</h3>
<p>The 5-day classic (Tarangire, Ngorongoro, Serengeti) is our most recommended for first-timers. It covers three distinct ecosystems, includes all the Big Five, and balances driving time with wildlife viewing. You'll see elephants in Tarangire, rhinos in the crater, and lions in the Serengeti — a perfect introduction to East African safari.</p>

<h3>How much does a Tanzania safari cost per day?</h3>
<p>Budget camping safaris start at $150-$250 per person per day. Mid-range lodge safaris run $350-$500 per day. Luxury safaris cost $600-$1,500+ per day. All prices typically include park fees, vehicle, professional guide, accommodation, and meals. See our <a href="/tanzania-safari-cost/">complete cost breakdown</a> for details.</p>

<h3>Is 3 days enough for a Tanzania safari?</h3>
<p>Three days gives you a genuine safari experience — enough for Tarangire's elephants and the Ngorongoro Crater. You'll see the Big Five and have meaningful wildlife encounters. However, 5-7 days is significantly better if your schedule allows, as you can add the Serengeti and spend more time in each park.</p>

<h3>Should I fly or drive between safari parks?</h3>
<p>Drive on your first trip — the overland journey through the Ngorongoro highlands is spectacular. Flying saves 5-6 hours but costs $250-$450 per person per flight. For short trips (3-5 days) or return visits, flying to the Serengeti maximises your game-drive time.</p>

<h3>What is the best month for a Tanzania safari?</h3>
<p>July through October offers the best overall game viewing — dry conditions concentrate animals at water sources and the Great Migration crosses the Mara River. January-February is excellent for calving season in the southern Serengeti. Green season (March-May) offers lower prices and lush scenery with fewer tourists.</p>

<h3>Can I combine a safari with Kilimanjaro?</h3>
<p>Absolutely — this is one of our most popular combinations. Climb Kilimanjaro first (5-9 days), rest one day in Arusha, then do a 3-5 day safari. The 3-day express itinerary is perfect for post-climb safaris when you want wildlife without exhausting drives.</p>

<h3>How many parks should I visit on safari?</h3>
<p>For 3 days: 2 parks maximum. For 5 days: 3 parks. For 7+ days: 4 parks plus optional cultural stops. Visiting too many parks means excessive driving and less time actually watching animals. Quality over quantity is the golden rule.</p>

<h3>Is the Serengeti worth the long drive from Arusha?</h3>
<p>Without question. The Serengeti is the world's greatest wildlife arena — 1.5 million wildebeest, the highest density of predators on the continent, and landscapes that define the word "safari." The 7-8 hour drive passes through the Ngorongoro highlands (stunning scenery), and you game drive as soon as you enter the park.</p>

<h3>What should I pack for a Tanzania safari?</h3>
<p>Neutral-coloured clothing (khaki, olive, tan), layering for cold mornings and hot afternoons, a wide-brim hat, sunscreen, binoculars, a camera with zoom lens, and insect repellent. Avoid white, bright colours, and dark blue (attracts tsetse flies). See our <a href="/tanzania-safari-packing-list/">complete packing list</a>.</p>

<h3>Do I need vaccinations for a Tanzania safari?</h3>
<p>Yellow fever vaccination is required if arriving from an endemic country. Recommended: hepatitis A and B, typhoid, and tetanus. Malaria prophylaxis is strongly recommended for all safari areas. Consult your travel doctor 6-8 weeks before departure.</p>

<h3>Are Tanzania safaris safe for solo travellers?</h3>
<p>Very safe. You'll always be with a professional guide, and Tanzania's national parks are well-managed. Solo travellers can join group safaris to reduce costs or book private trips. We regularly host solo travellers from around the world — about 20% of our guests travel alone.</p>

<h3>What is the best safari itinerary for photographers?</h3>
<p>The 7-day ultimate gives photographers the most opportunities. Two full days in the Serengeti means different light conditions and locations. Key photography tips: request a vehicle with a pop-up roof (not just side windows), bring a beanbag for stabilisation, and tell your guide you prioritise photography — we'll spend longer at sightings and position for the best light.</p>
`;

const luxuryContent = `
<p>A luxury safari in Tanzania is not a holiday — it's a collection of moments so vivid they rewrite what you thought was possible. Champagne sundowners overlooking the Serengeti. A private chef preparing a bush breakfast while lions roar in the distance. Your own vehicle, your own guide, your own schedule. After fifteen years operating safaris at every price point, we can tell you exactly what separates a $200-per-night experience from a $2,000 one — and when the premium is worth every dollar.</p>

<h2>What Makes a Safari "Luxury"</h2>
<p>Luxury in the African bush is defined differently than in a city hotel. A five-star safari lodge might have no air conditioning, no television, and no minibar. Instead, luxury here means:</p>
<ul>
<li><strong>Exclusivity:</strong> Private vehicle and guide (no sharing with 5 strangers), camps limited to 10-12 guests, conservancy access where only 2-3 vehicles operate</li>
<li><strong>Guiding quality:</strong> Senior guides with 15-20+ years of experience, specialist knowledge (ornithology, botany, tracking), often multi-lingual</li>
<li><strong>Dining:</strong> Multi-course gourmet meals using local ingredients, bush breakfasts set up under acacia trees, candlelit dinners under the Milky Way, wine lists curated from South African estates</li>
<li><strong>Service ratio:</strong> 2-3 staff per guest (vs 1:4 at mid-range lodges), butler service, laundry returned same day pressed and folded</li>
<li><strong>Location:</strong> Premium positions — crater rim with caldera views, riverfront in the migration corridor, hilltop with 360-degree savanna panoramas</li>
</ul>

<h2>Top Luxury Lodges by Destination</h2>

<h3>Serengeti</h3>
<p>The Serengeti has the highest concentration of luxury properties in Tanzania, from permanent lodges to mobile camps that follow the migration.</p>
<ul>
<li><strong>Singita Grumeti:</strong> The gold standard. Three properties across 350,000 acres of private concession. Sasakwa Lodge (colonial grandeur, pool villas from $2,500/night), Faru Faru (contemporary design on the Grumeti River), and Sabora (tented camp, 1920s safari aesthetic). Private game drives, walking safaris, off-road driving — things impossible in the main park.</li>
<li><strong>Four Seasons Safari Lodge:</strong> $800-$1,500/night. Infinity pool overlooking a waterhole (elephants drink while you swim), spa, kids club, and the reliability of a global luxury brand. Central Seronera location means year-round game viewing.</li>
<li><strong>&Beyond Serengeti Under Canvas:</strong> $700-$1,200/night. Mobile tented camp that relocates 3-4 times per year following the migration. You're always where the action is. En-suite tents with hot bucket showers and flush toilets.</li>
<li><strong>One Nature Nyaruswiga:</strong> $600-$900/night. Boutique camp in central Serengeti, 9 tents only. Excellent guiding and a more intimate feel than the larger lodges.</li>
</ul>

<h3>Ngorongoro</h3>
<ul>
<li><strong>&Beyond Ngorongoro Crater Lodge:</strong> $1,200-$2,000/night. Three camps perched on the crater rim with floor-to-ceiling views of the caldera 600 metres below. Baroque-meets-Maasai design — chandeliers, roses, and beaded curtains. Butler-drawn baths with crater views. Often called the most beautiful lodge in Africa.</li>
<li><strong>The Highlands by Asilia:</strong> $500-$800/night. Geodesic dome structures on the Olmoti Crater slopes. Modern, eco-conscious design. Guided walks to Olmoti waterfall. A refreshing alternative to traditional lodge architecture.</li>
<li><strong>Neptune Ngorongoro:</strong> $350-$600/night. Farm-style luxury in Karatu with coffee plantation tours, organic garden, and excellent food. Good value for the quality.</li>
</ul>

<h3>Tarangire</h3>
<ul>
<li><strong>Chem Chem Lodge:</strong> $900-$1,500/night. Set between Tarangire and <a href="/lake-manyara-national-park-guide/">Lake Manyara</a> in a private concession. Eight spacious tents, walking safaris, fly camping, horseback safaris. The concession is private — no other vehicles.</li>
<li><strong>Sanctuary Swala:</strong> $500-$800/night. Deep inside Tarangire's southern section, far from the main entrance crowds. Twelve tents overlooking a permanent waterhole. Elephants regularly visit camp.</li>
<li><strong>Tarangire Treetops:</strong> $400-$700/night. Treehouses built into ancient baobab and marula trees. Unique and memorable — guests sleep 6 metres above the ground with wildlife moving below.</li>
</ul>

<h3>Lake Manyara</h3>
<ul>
<li><strong>&Beyond Lake Manyara Tree Lodge:</strong> $600-$1,000/night. Ten tree house suites in a mahogany forest on the lakeshore. The only luxury property inside the park — all other lodges are on the escarpment above. Intimate, exclusive, and unforgettable.</li>
</ul>

<h2>Luxury Tented Camps vs Lodges</h2>
<p>First-time visitors often picture camping when they hear "tented camp." Let us be clear: a luxury tented camp is often more expensive than a lodge. The difference is style, not quality.</p>
<table>
<thead><tr><th>Feature</th><th>Luxury Lodge</th><th>Luxury Tented Camp</th></tr></thead>
<tbody>
<tr><td>Structure</td><td>Permanent building (stone, wood, glass)</td><td>Canvas tent on raised platform</td></tr>
<tr><td>Bathroom</td><td>Full en-suite with plumbing</td><td>En-suite with flush toilet, hot shower</td></tr>
<tr><td>Atmosphere</td><td>Hotel-like comfort and privacy</td><td>Closer to nature — hear animals at night</td></tr>
<tr><td>Location</td><td>Often fixed, prime hilltop/rim positions</td><td>Can be deeper in wilderness, mobile camps move</td></tr>
<tr><td>Price range</td><td>$400-$2,000/night</td><td>$500-$2,500/night</td></tr>
<tr><td>Best for</td><td>Families, first-timers wanting familiar comfort</td><td>Repeat visitors, adventure-seekers, authenticity</td></tr>
</tbody>
</table>

<h2>Unique Luxury Experiences</h2>

<h3>Private Mobile Camping</h3>
<p>The ultimate safari experience. A fully staffed camp — complete with chef, butler, guide, and camp crew — set up exclusively for you in a location chosen based on current wildlife activity. The camp moves as the migration moves. You sleep in walk-in canvas tents with proper beds, en-suite bush bathroom with a hot bucket shower, and a dining tent with a multi-course dinner. Cost: $800-$1,500 per person per night, minimum 2 nights. We set up these camps in the Serengeti's remote northern and western zones where permanent camps can't reach.</p>

<h3>Hot Air Balloon Safari</h3>
<p>Lift off at dawn over the Serengeti as the sun paints the savanna gold. From 1,000 feet, the scale of the migration becomes visible — thousands of wildebeest stretching to the horizon. The flight lasts about an hour, followed by a champagne breakfast served on white linen in the middle of the bush. $500-$600 per person. Book weeks in advance during peak season (July-October).</p>

<h3>Helicopter Safari</h3>
<p>For the ultimate aerial perspective, charter a helicopter for transfers between parks. Fly over the Ngorongoro Crater, spot elephants from above in Tarangire, and land on remote Serengeti airstrips inaccessible to fixed-wing aircraft. Cost: $2,000-$4,000 per hour. Best for multi-park itineraries where you want to eliminate driving entirely.</p>

<h3>Bush Dining Experiences</h3>
<p>Many luxury lodges arrange private dining in extraordinary settings: dinner on a kopje (rocky outcrop) with 360-degree views, breakfast by a hippo pool, or sundowners on the crater rim. Singita's bush dinner experience includes a full kitchen set up in the wild with a private chef. These are usually complimentary at top-tier lodges or $100-$200 as an add-on at mid-range properties.</p>

<h3>Walking Safaris with Armed Rangers</h3>
<p>Experience the bush on foot with an armed ranger and experienced guide. Walking safaris change your perspective entirely — you notice animal tracks, dung beetle behaviour, medicinal plants, and bird calls that you'd miss from a vehicle. Available in Tarangire, the Ngorongoro highlands, and select Serengeti concessions. Half-day walks from $50-$150 per person; multi-day walking safaris from $300-$500 per person per day.</p>

<h2>Honeymoon Safari Features</h2>
<p>Tanzania is one of Africa's top honeymoon destinations, and luxury lodges know how to set the mood:</p>
<ul>
<li><strong>Private plunge pools:</strong> Several Serengeti and Ngorongoro lodges offer rooms with private pools overlooking the wilderness</li>
<li><strong>Rose petal baths:</strong> &Beyond Ngorongoro Crater Lodge is famous for drawing baths with views of the caldera, scattered with rose petals and flanked by champagne</li>
<li><strong>Champagne sundowners:</strong> Private vehicle stops at a scenic kopje at sunset, table set with cheese, wine, and a front-row seat to the African sky</li>
<li><strong>Couples spa:</strong> Bush spa treatments — massage under the stars or by a waterhole. Singita and Four Seasons have dedicated spa facilities</li>
<li><strong>Turndown surprises:</strong> Expect personalised touches — handwritten notes, local crafts, special menu requests honoured</li>
</ul>
<p>Our recommended honeymoon itinerary: 3 nights Serengeti (luxury lodge) + 1 night Ngorongoro Crater Lodge + 4 nights Zanzibar (beachfront villa). Budget: $8,000-$15,000 per couple for 8 nights.</p>

<h2>The Green Season Secret</h2>
<p>Here's what most operators won't tell you: green season (November-May) at a <a href="/luxury-safaris-tanzania/">luxury lodge</a> is the insider move. Rates drop 30-40% — that $1,500/night Singita suite becomes $900. The landscapes are lush and photogenic instead of dry and dusty. Fewer vehicles mean more exclusive sightings. Baby animals are everywhere (calving season is January-March). The only trade-off is occasional afternoon rain — which usually lasts 1-2 hours and the light afterwards is magical for photography.</p>
<p>At luxury properties, the quality of guiding, food, and service is identical year-round. You're paying for the same experience at a significant discount. We book more repeat guests during green season than any other period.</p>

<h2>Fly-In Safaris</h2>
<p>Luxury travellers increasingly choose fly-in safaris to eliminate long drives. Small bush planes (Cessna Caravans, typically 12 seats) land at airstrips throughout the Serengeti, Tarangire, and Ruaha. Advantages:</p>
<ul>
<li>Save 5-7 hours of driving per transfer</li>
<li>Scenic flights over the Rift Valley and Ngorongoro Crater</li>
<li>Arrive fresh and ready for an afternoon game drive</li>
<li>Access remote camps in the southern and western Serengeti</li>
</ul>
<p>Typical costs: Arusha → Serengeti $250-$400 one way. Serengeti → Zanzibar $350-$500. <a href="/tanzania-lodge-safaris/">Lodge-based safaris</a> paired with fly-in transfers are the most time-efficient way to experience Tanzania.</p>

<h2>Cost Breakdown: What You Pay For</h2>
<p>At $600-$1,500+ per person per night, luxury safari pricing can seem steep. Here's where the money goes:</p>
<ul>
<li><strong>Park fees:</strong> Serengeti ($82/day), Ngorongoro ($82 + $295 crater fee), Tarangire ($53/day) — these are government fees, non-negotiable</li>
<li><strong>Concession fees:</strong> Private conservancies charge $50-$200/person/day for exclusive access</li>
<li><strong>Vehicle & guide:</strong> A Land Cruiser costs $200-$350/day to operate. Luxury safaris use newer vehicles with charging ports, fridges, and pop-up roofs</li>
<li><strong>Staff:</strong> A luxury camp employs 40-60 staff for 10-20 guests — chefs, housekeepers, security, guides, mechanics, management</li>
<li><strong>Conservation:</strong> Many luxury operators contribute $50-$150 per guest-night to community and conservation projects</li>
<li><strong>Logistics:</strong> Remote locations mean everything — food, fuel, supplies — arrives by road or air at significant cost</li>
</ul>
<p>Compare this with a <a href="/tanzania-safari-cost/">budget camping safari at $150-$250/day</a>: the wildlife is identical, but the comfort, exclusivity, and service are in different categories entirely.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is a luxury safari worth the extra cost?</h3>
<p>It depends on what you value. If exclusivity (private vehicle, no crowds), gourmet dining, premium locations, and personalised service matter to you, then yes — the difference between a mid-range and luxury safari is dramatic. If you primarily want to see wildlife and are comfortable with simpler accommodation, a well-run mid-range safari delivers excellent game viewing for half the cost.</p>

<h3>What is the most luxurious safari lodge in Tanzania?</h3>
<p>Singita Grumeti (Sasakwa Lodge) is widely regarded as the most luxurious, with rates from $2,500/night and a private 350,000-acre concession. &Beyond Ngorongoro Crater Lodge is the most visually stunning with its crater-rim position and baroque-Maasai design. Four Seasons Safari Lodge Serengeti offers the most familiar five-star hotel experience in a bush setting.</p>

<h3>How much does a luxury Tanzania safari cost?</h3>
<p>Plan on $600-$1,500 per person per night all-inclusive (accommodation, meals, drinks, game drives, laundry). A typical 5-night luxury safari costs $4,000-$8,000 per person. Ultra-luxury (Singita, private mobile camps) runs $10,000-$20,000 per person for a week. These prices include everything except international flights, visa ($50), and tips ($20-$30/day for guide).</p>

<h3>When is the cheapest time for a luxury safari?</h3>
<p>Green season (November-May, excluding Christmas/New Year) offers 30-40% discounts at most luxury properties. April-May has the deepest discounts. The experience quality is nearly identical — same guides, same food, same service — with lusher landscapes and fewer guests.</p>

<h3>Do luxury lodges have Wi-Fi?</h3>
<p>Most do, but manage expectations. Satellite internet in the Serengeti is slow by urban standards — fine for emails and WhatsApp, frustrating for video calls and streaming. Some lodges deliberately limit connectivity to encourage disconnection. &Beyond and Singita have the most reliable connections; more remote camps may have common-area-only Wi-Fi.</p>

<h3>Are luxury safaris suitable for children?</h3>
<p>Many luxury lodges welcome families, but some have minimum age requirements (typically 6-10 years). Four Seasons and Singita have dedicated kids' programmes. &Beyond allows children of all ages at select properties. <a href="/family-safari-tanzania/">Family safaris</a> work well at luxury level — larger family tents, flexible schedules, and engaging guides who specialise in keeping young ones excited.</p>

<h3>What should I wear on a luxury safari?</h3>
<p>Smart casual for lodge evenings (linen trousers, a nice shirt — no dress code at bush lodges), neutral safari colours for game drives. No need for formal wear anywhere. Most luxury lodges do complimentary laundry, so pack light. See our <a href="/tanzania-safari-packing-list/">packing guide</a> for the complete list.</p>

<h3>What is the difference between a luxury tented camp and a lodge?</h3>
<p>A luxury tented camp uses canvas walls on a raised wooden or concrete platform, with full en-suite bathrooms (flush toilet, hot shower), proper beds, and electricity. A lodge is a permanent structure. Tented camps offer a more immersive bush experience — you hear animals at night, feel the breeze, and connect with nature. Lodges offer more sound insulation and climate control. Both are equally comfortable at the luxury level.</p>

<h3>Can I do a luxury safari on a budget?</h3>
<p>Yes — through green season travel (30-40% off), booking directly with local operators like us rather than through international agents (saving the middleman markup), and choosing newer luxury properties that are still building their reputation (they offer lower rates with equivalent quality). A smart booking in April at a top-tier property can cost less than peak season at a mid-range lodge.</p>

<h3>Do I need travel insurance for a luxury safari?</h3>
<p>Mandatory. Every luxury operator requires proof of travel insurance that covers medical evacuation. Bush airstrips are remote — if you need hospital care, you'll be evacuated by AMREF Flying Doctors to Nairobi ($5,000-$15,000 without insurance). Policies with safari and adventure coverage run $100-$300 for a 2-week trip. Non-negotiable.</p>

<h3>What is a private conservancy and why does it matter?</h3>
<p>A private conservancy is land adjacent to a national park, leased from local communities, where only guests of specific lodges can drive. This means: off-road driving allowed (illegal in national parks), night game drives, walking safaris, bush meals set up anywhere, and a maximum of 2-3 vehicles at a sighting (vs 20+ in the main Serengeti). The exclusivity premium is $50-$200/person/day, but the experience is incomparably better.</p>

<h3>How far in advance should I book a luxury safari?</h3>
<p>6-12 months for peak season (July-October), especially for top properties like Singita and &Beyond Ngorongoro Crater Lodge which sell out a year ahead. Green season bookings can often be made 2-3 months in advance. Christmas and New Year require 12+ months' notice at popular lodges.</p>
`;

async function main() {
  console.log("Seeding 2 Tanzania Safari blog posts (itinerary + luxury)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "safari" },
    update: { name: "Safari" },
    create: { slug: "safari", name: "Safari" },
  });

  // Post 1 tags
  const tagItinerary = await prisma.tag.upsert({
    where: { slug: "safari-itinerary" },
    update: { name: "Safari Itinerary" },
    create: { slug: "safari-itinerary", name: "Safari Itinerary" },
  });
  const tagTanzaniaSafari = await prisma.tag.upsert({
    where: { slug: "tanzania-safari" },
    update: { name: "Tanzania Safari" },
    create: { slug: "tanzania-safari", name: "Tanzania Safari" },
  });
  const tagSafariPlanning = await prisma.tag.upsert({
    where: { slug: "safari-planning" },
    update: { name: "Safari Planning" },
    create: { slug: "safari-planning", name: "Safari Planning" },
  });
  const tagNorthernCircuit = await prisma.tag.upsert({
    where: { slug: "northern-circuit" },
    update: { name: "Northern Circuit" },
    create: { slug: "northern-circuit", name: "Northern Circuit" },
  });

  // Post 2 tags
  const tagLuxurySafari = await prisma.tag.upsert({
    where: { slug: "luxury-safari" },
    update: { name: "Luxury Safari" },
    create: { slug: "luxury-safari", name: "Luxury Safari" },
  });
  const tagSafariLodges = await prisma.tag.upsert({
    where: { slug: "safari-lodges" },
    update: { name: "Safari Lodges" },
    create: { slug: "safari-lodges", name: "Safari Lodges" },
  });
  const tagPremiumSafari = await prisma.tag.upsert({
    where: { slug: "premium-safari" },
    update: { name: "Premium Safari" },
    create: { slug: "premium-safari", name: "Premium Safari" },
  });

  // Post 1: Tanzania Safari Itinerary
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "tanzania-safari-itinerary" },
    update: {
      title: "Tanzania Safari Itinerary: 3, 5, 7 & 10-Day Sample Plans",
      excerpt:
        "Proven Tanzania safari itineraries from 3 to 10 days. Detailed daily plans with driving times, accommodation options at every budget, park fees, and insider tips from our Moshi-based team.",
      content: itineraryContent,
      metaTitle: "Tanzania Safari Itinerary | 3 to 10-Day Plans",
      metaDescription:
        "Proven Tanzania safari itineraries from 3 to 10 days. Daily plans, driving times, costs, and accommodation picks from a local operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "tanzania-safari-itinerary",
      title: "Tanzania Safari Itinerary: 3, 5, 7 & 10-Day Sample Plans",
      excerpt:
        "Proven Tanzania safari itineraries from 3 to 10 days. Detailed daily plans with driving times, accommodation options at every budget, park fees, and insider tips from our Moshi-based team.",
      content: itineraryContent,
      metaTitle: "Tanzania Safari Itinerary | 3 to 10-Day Plans",
      metaDescription:
        "Proven Tanzania safari itineraries from 3 to 10 days. Daily plans, driving times, costs, and accommodation picks from a local operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagTanzaniaSafari, tagItinerary, tagSafariPlanning, tagNorthernCircuit]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: tanzania-safari-itinerary");

  // Post 2: Luxury Safari Tanzania
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "luxury-safari-tanzania-guide" },
    update: {
      title: "Luxury Safari Tanzania: Premium Experiences & Lodges",
      excerpt:
        "Complete guide to luxury safaris in Tanzania. Top lodges by destination, private mobile camping, fly-in safaris, honeymoon features, and the green season secret that saves 30-40%.",
      content: luxuryContent,
      metaTitle: "Luxury Safari Tanzania | Lodges & Experiences",
      metaDescription:
        "Guide to luxury Tanzania safaris. Top lodges, private camps, fly-in options, honeymoon features, and green season discounts from a local operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "luxury-safari-tanzania-guide",
      title: "Luxury Safari Tanzania: Premium Experiences & Lodges",
      excerpt:
        "Complete guide to luxury safaris in Tanzania. Top lodges by destination, private mobile camping, fly-in safaris, honeymoon features, and the green season secret that saves 30-40%.",
      content: luxuryContent,
      metaTitle: "Luxury Safari Tanzania | Lodges & Experiences",
      metaDescription:
        "Guide to luxury Tanzania safaris. Top lodges, private camps, fly-in options, honeymoon features, and green season discounts from a local operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagLuxurySafari, tagTanzaniaSafari, tagSafariLodges, tagPremiumSafari]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: luxury-safari-tanzania-guide");

  console.log("\nDone — 2 safari blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
