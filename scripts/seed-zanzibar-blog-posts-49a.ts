import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const waterSportsContent = `
<p>Zanzibar isn't just about lying on a beach — the Indian Ocean around these islands offers some of the best water sports in East Africa. From world-class kite surfing in Paje to pristine <a href="/zanzibar-diving-snorkelling/">diving at Mnemba Atoll</a>, whale shark encounters off the north coast, and deep-sea fishing in the Pemba Channel, there's something for every level of adventure. Here's the complete guide from a team that's been arranging water activities for guests across the archipelago for years.</p>

<h2>Kite Surfing</h2>
<p>Paje is East Africa's kite surfing capital — and one of the best spots in the world for learning. The combination of consistent trade winds (15-25 knots), a vast shallow lagoon exposed at low tide, and warm water year-round makes it ideal for beginners and experts alike.</p>

<h3>Wind Seasons</h3>
<table>
<thead><tr><th>Season</th><th>Months</th><th>Wind</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Kaskazi (NE monsoon)</td><td>December–February</td><td>15-22 knots, NE direction</td><td>Beginners to intermediate, warmer</td></tr>
<tr><td>Kusi (SE monsoon)</td><td>June–September</td><td>18-25 knots, SE direction</td><td>Intermediate to advanced, strongest winds</td></tr>
<tr><td>Transition</td><td>March–May, Oct–Nov</td><td>Variable, 8-15 knots</td><td>Light wind sessions, foil kiting</td></tr>
</tbody>
</table>

<h3>Kite Schools in Paje</h3>
<ul>
<li><strong>Kite Centre Zanzibar:</strong> The original school, IKO-certified instructors, equipment rental, courses from beginner to advanced. Beginner lesson: $80 for 2 hours. 3-day course: $280-$350. Equipment rental for experienced riders: $60-$80/day.</li>
<li><strong>Airborne Kite Centre:</strong> German-run school with excellent safety record. Same pricing range. Also offers foil kiting and wing foiling lessons.</li>
<li><strong>One Love Kite:</strong> Locally owned, slightly cheaper ($70 for intro lesson). More relaxed atmosphere, great for budget-conscious learners.</li>
</ul>
<p>Most schools offer equipment storage for multi-day students, so you don't need to carry gear to and from your hotel. Wetsuits are not needed — the water is 25-29°C year-round. Board shorts and a rash guard are sufficient.</p>

<h3>Beyond Paje</h3>
<p>While Paje is the epicentre, experienced riders also kite at Jambiani (similar conditions, fewer people), Michamvi (smaller launch area but less crowded), and Nungwi (cross-shore wind, for advanced riders only). Paje remains the best choice for learners due to the flat, shallow lagoon at low tide.</p>

<h2>Scuba Diving</h2>
<p>Zanzibar's diving ranges from gentle reef dives suitable for beginners to advanced wall dives off Pemba Island that rival anything in the Indo-Pacific. Water visibility averages 15-30 metres, with the best conditions from October to March. Read our comprehensive <a href="/zanzibar-diving-snorkelling/">diving and snorkelling guide</a> for detailed site descriptions.</p>

<h3>Key Dive Sites</h3>
<table>
<thead><tr><th>Site</th><th>Depth</th><th>Level</th><th>Highlights</th></tr></thead>
<tbody>
<tr><td>Mnemba Atoll</td><td>5-30m</td><td>All levels</td><td>Turtles, dolphins, reef fish, coral gardens</td></tr>
<tr><td>Leven Bank</td><td>14-40m</td><td>Advanced</td><td>Pelagics, barracuda, occasional whale sharks</td></tr>
<tr><td>Pange Reef</td><td>8-14m</td><td>Beginner</td><td>Easy reef, nudibranchs, moray eels</td></tr>
<tr><td>Boribi Reef</td><td>10-18m</td><td>Intermediate</td><td>Lionfish, octopus, coral formations</td></tr>
<tr><td>Misali Island (Pemba)</td><td>5-40m</td><td>All levels</td><td>Pristine walls, 300+ fish species, untouched coral</td></tr>
<tr><td>Njao Gap (Pemba)</td><td>20-45m</td><td>Advanced</td><td>Channel drift dive, eagle rays, reef sharks</td></tr>
</tbody>
</table>

<h3>Costs</h3>
<ul>
<li><strong>Single fun dive:</strong> $50-$80 (includes equipment)</li>
<li><strong>Two-dive trip:</strong> $90-$130</li>
<li><strong>PADI Open Water course:</strong> $350-$500 (3-4 days)</li>
<li><strong>PADI Advanced Open Water:</strong> $300-$400 (2 days)</li>
<li><strong>10-dive package:</strong> $400-$600</li>
</ul>
<p>Top dive centres: One Ocean (Nungwi and Stone Town), Scuba Do (Nungwi), Spanish Dancer Divers (Matemwe — closest to Mnemba), Swahili Divers (Pemba). All are PADI-certified with well-maintained equipment.</p>

<h2>Snorkelling</h2>
<p>You don't need a diving certificate to see Zanzibar's underwater world. Snorkelling is accessible, cheap, and spectacular at the right spots.</p>

<h3>Best Snorkelling Spots</h3>
<ul>
<li><strong>Mnemba Atoll:</strong> The best snorkelling in Zanzibar. Crystal-clear water, abundant coral, turtles, tropical fish, and sometimes dolphins. Half-day boat trip from Matemwe, Nungwi, or Kendwa: $30-$50 per person.</li>
<li><strong>Chumbe Island:</strong> Protected coral reef with 200+ species. Full-day trip $100-$120 (limited to 12 visitors/day). The healthiest reef in the western Indian Ocean.</li>
<li><strong>Prison Island:</strong> Decent reef on the island's east side. Combined with giant tortoise visit. Half-day: $30-$50.</li>
<li><strong>Tumbatu Island:</strong> Less visited, good coral, off the northwest coast. Usually combined with Nungwi boat trips.</li>
<li><strong>Blue Lagoon (Michamvi):</strong> Shallow, calm, good for beginners. Part of many Safari Blue excursions.</li>
</ul>
<p>Most hotels rent snorkelling gear for $5-$10/day. Bring your own mask if you're particular about fit — rental masks can fog and leak. Reef-safe sunscreen is essential to protect the coral.</p>

<h2>Deep-Sea Fishing</h2>
<p>The Pemba Channel — the deep-water strait between Zanzibar and Pemba Island — is one of East Africa's premier big-game fishing grounds. The channel drops to over 2,000 metres, creating upwellings that attract massive pelagic species.</p>

<h3>What You Can Catch</h3>
<ul>
<li><strong>Marlin:</strong> Blue, black, and striped marlin. Peak season September-March. Fish over 200kg are caught regularly.</li>
<li><strong>Sailfish:</strong> Year-round, best January-March. Fast, acrobatic fights.</li>
<li><strong>Yellowfin tuna:</strong> Year-round, up to 80kg. Excellent eating.</li>
<li><strong>Wahoo:</strong> July-November. Speed demons — 60mph strikes.</li>
<li><strong>Dorado (mahi-mahi):</strong> Year-round. Beautiful fish and great on the grill.</li>
<li><strong>Giant trevally:</strong> Year-round. Pound-for-pound one of the hardest fighters.</li>
</ul>

<h3>Charter Costs</h3>
<table>
<thead><tr><th>Type</th><th>Duration</th><th>Cost</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Half-day inshore</td><td>4-5 hours</td><td>$300-$500</td><td>Reef fish, trevally, small tuna</td></tr>
<tr><td>Full-day offshore</td><td>8-10 hours</td><td>$700-$1,200</td><td>Marlin, sailfish, big tuna</td></tr>
<tr><td>Full-day premium</td><td>8-10 hours</td><td>$1,200-$1,800</td><td>Large boat, experienced crew, live bait</td></tr>
</tbody>
</table>
<p>Charters typically include crew, tackle, bait, and soft drinks. Shared charters (split cost with other anglers) run $150-$250 per person. Your catch can be prepared at your hotel restaurant or a local restaurant — most are happy to grill your fish for a small fee ($5-$10).</p>

<h2>Kayaking & Stand-Up Paddleboarding</h2>
<p>Most mid-range and luxury resorts include kayaks and SUP boards for guests, or rent them for $10-$20/hour. The best paddling is on the north coast (Nungwi/Kendwa) where tidal variations are minimal. The east coast works at high tide only.</p>
<p>For guided kayaking, mangrove tours from Fumba ($30-$40, 2-3 hours) paddle through calm mangrove channels with birdlife and occasional dolphin sightings. Sunset SUP sessions are offered by several Nungwi operators ($15-$25).</p>

<h2>Dhow Sailing</h2>
<p>Traditional wooden dhows have sailed these waters for over a thousand years, propelled by the same monsoon winds that brought Arab traders. Today, dhow sailing is one of Zanzibar's most iconic experiences:</p>
<ul>
<li><strong>Sunset cruise:</strong> $20-$35 per person (shared), $150-$250 private charter. Depart from Stone Town harbour. Drinks and snacks included.</li>
<li><strong>Safari Blue full-day:</strong> $70-$90 per person. Sail to Menai Bay, snorkel, visit a sandbank, seafood lunch on a deserted island. Zanzibar's most popular excursion.</li>
<li><strong>Overnight dhow cruise:</strong> $150-$300 per person. Sail to a remote island, camp on the beach, return the next morning. Adventurous and unforgettable.</li>
</ul>

<h2>Whale Shark Swimming</h2>
<p>Between October and March, whale sharks — the world's largest fish, up to 12 metres long — gather off Zanzibar's south coast near Mafia Island and occasionally off the north coast near Nungwi. Swimming alongside a whale shark is one of the most awe-inspiring wildlife encounters on earth.</p>
<p>Half-day trips from Nungwi cost $100-$150 per person and include snorkelling gear. Sightings aren't guaranteed (nature doesn't follow schedules), but success rates are 70-80% during peak season (October-February). Operators use ethical guidelines: no touching, minimum distance of 3 metres, no flash photography.</p>

<h2>Jet Skiing & Parasailing</h2>
<p>Available primarily in Nungwi:</p>
<ul>
<li><strong>Jet skiing:</strong> $40-$60 for 30 minutes. Fun but controversial — the noise disturbs marine life and other beachgoers. Several hotels have stopped offering it.</li>
<li><strong>Parasailing:</strong> $50-$70 per person. 10-15 minutes airborne with views of the coastline. Operates from Nungwi beach.</li>
</ul>
<p>These are the most "touristy" water activities in Zanzibar. If you want them, Nungwi is the only real option. Most other beaches don't offer motorised water sports.</p>

<h2>Surfing</h2>
<p>Zanzibar is not a surf destination — the fringing reef protects most beaches from significant waves. However, Matemwe occasionally gets rideable waves during the Kusi season (June-September) when SE swells wrap around the reef. Experienced surfers might find a few sessions, but don't come to Zanzibar specifically for surfing. For East African surf, Dar es Salaam's beaches (Coco Beach area) offer more consistent waves.</p>

<h2>Best Season for Each Sport</h2>
<table>
<thead><tr><th>Sport</th><th>Best Season</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Kite surfing</td><td>Jun-Sep, Dec-Feb</td><td>Strongest winds Jun-Sep (Kusi)</td></tr>
<tr><td>Scuba diving</td><td>Oct-Mar</td><td>Best visibility, warm water</td></tr>
<tr><td>Snorkelling</td><td>Jun-Oct</td><td>Calm seas, good visibility</td></tr>
<tr><td>Deep-sea fishing</td><td>Sep-Mar</td><td>Marlin and sailfish peak</td></tr>
<tr><td>Whale sharks</td><td>Oct-Mar</td><td>Migration season</td></tr>
<tr><td>Kayaking/SUP</td><td>Year-round</td><td>North coast best; east coast at high tide</td></tr>
<tr><td>Dhow sailing</td><td>Year-round</td><td>Avoid Apr-May heavy rain</td></tr>
</tbody>
</table>
<p>For more on seasonal timing, check our <a href="/best-time-visit-zanzibar/">best time to visit guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Paje good for beginner kite surfers?</h3>
<p>Excellent — arguably the best place in the world to learn. The shallow lagoon at low tide means you can stand up if you fall, the water is warm, and the wind is consistent during the two main seasons (June-September and December-February). Three-day courses typically get complete beginners up and riding independently.</p>

<h3>Do I need a diving certificate to dive in Zanzibar?</h3>
<p>For fun dives at established sites, yes — at minimum a PADI Open Water (or equivalent) certification. If you're uncertified, you can take a Discover Scuba Diving experience ($80-$100, pool training + supervised ocean dive) or do the full PADI Open Water course ($350-$500, 3-4 days). Snorkelling requires no certification.</p>

<h3>What's the best snorkelling in Zanzibar?</h3>
<p>Mnemba Atoll for variety and reliability, Chumbe Island for pristine coral, and Prison Island for easy access from Stone Town. Mnemba is the most popular because you're almost guaranteed turtles, and the coral is spectacular.</p>

<h3>Is deep-sea fishing catch and release?</h3>
<p>Your choice. Most operators practise tag-and-release for marlin and sailfish (conservation priority). Tuna, wahoo, dorado, and reef fish are typically kept — you can eat your catch at a restaurant. Discuss your preference with the operator before departure.</p>

<h3>Can I swim with whale sharks in Zanzibar?</h3>
<p>Yes, from October to March. Half-day trips from Nungwi cost $100-$150. Success rates are 70-80% during peak season. These are wild encounters — sightings aren't guaranteed. Choose an operator that follows ethical guidelines (no touching, maintaining distance).</p>

<h3>Is it safe to swim in the ocean in Zanzibar?</h3>
<p>Very safe at the main beaches. No strong currents at tourist beaches, no dangerous sharks in shallow waters (reef sharks are shy and rarely seen while snorkelling). Wear reef shoes on the east coast to avoid sea urchins. Don't swim in boat channels or at night.</p>

<h3>What water sports equipment should I bring?</h3>
<p>A well-fitting snorkel mask (rental masks often leak), reef-safe sunscreen, a rash guard for sun protection, and reef shoes for the east coast. Kite and dive equipment is available for rent at all major schools. If you're a serious kite surfer, bring your own harness — rental harnesses are one-size-fits-all.</p>

<h3>Can kids do water sports in Zanzibar?</h3>
<p>Yes — snorkelling from age 5-6, kayaking from age 4 with an adult, kite surfing intro lessons from age 10-12 (depending on the school), Discover Scuba from age 10 (PADI minimum). The north coast's calm water is safest for children. <a href="/zanzibar-things-to-do/">See our activities guide</a> for more family options.</p>

<h3>How much should I budget for water sports?</h3>
<p>A typical week of water activities: snorkelling trip ($40), sunset dhow cruise ($25), one dive ($65), and a half-day kite lesson ($80) = about $210 per person. Deep-sea fishing and whale shark swims are premium activities that add $100-$1,200 depending on what you choose.</p>

<h3>Where is the best diving in Zanzibar?</h3>
<p>Mnemba Atoll for the main island (accessible from Matemwe and Nungwi). Misali Island on Pemba for the most pristine, uncrowded diving in the archipelago — but it requires a flight or long ferry to reach.</p>
`;

const spiceTourContent = `
<p>Zanzibar has been called the Spice Island for centuries — and that's not a tourism slogan. For hundreds of years, this archipelago was the world's largest producer of cloves, and it still grows nutmeg, cinnamon, black pepper, turmeric, vanilla, cardamom, and lemongrass in quantities that perfume the entire island. A spice tour is one of the most unique <a href="/zanzibar-things-to-do/">activities in Zanzibar</a> — and one of the few experiences you genuinely can't get anywhere else on earth.</p>

<h2>A Brief History of Zanzibar's Spice Trade</h2>
<p>Zanzibar's spice story begins in the early 19th century when Sultan Seyyid Said of Oman moved his capital from Muscat to <a href="/stone-town-guide/">Stone Town</a> in 1832. He saw the island's tropical climate — hot, humid, with reliable rainfall — as ideal for clove cultivation, which had previously been monopolised by the Dutch in the Moluccas (modern Indonesia). He ordered clove trees planted across Zanzibar and Pemba Island, and within decades, Zanzibar was producing over 90% of the world's cloves.</p>
<p>The spice trade transformed Zanzibar from a regional trading post into one of the wealthiest cities in East Africa. Stone Town's ornate merchant houses, with their famous carved doors, were built on spice wealth. The trade also, tragically, drove the slave trade — enslaved people from the African mainland were forced to work the clove plantations.</p>
<p>Today, Zanzibar is no longer the world's largest clove producer (Indonesia reclaimed that title), but cloves remain the archipelago's most important agricultural export. Pemba Island alone produces roughly 70% of Tanzania's clove harvest. The spice farms that tourists visit today are working plantations that have been growing these crops for over 150 years.</p>

<h2>What You'll See on a Spice Tour</h2>
<p>A typical spice tour visits a working plantation where guides walk you through groves of spice trees, picking fresh samples for you to smell, taste, and identify. Here's what you'll encounter:</p>

<h3>Cloves</h3>
<p>Zanzibar's signature spice. Clove trees grow up to 12 metres tall with dark green leaves. The "cloves" you buy in jars are actually dried flower buds — picked by hand before they bloom, then sun-dried until they turn the familiar dark brown. One tree produces 3-5 kg of dried cloves per harvest. The scent is overwhelming when you crush a fresh bud between your fingers — nothing like the stale powder in your kitchen at home.</p>

<h3>Nutmeg & Mace</h3>
<p>These come from the same fruit — nutmeg is the seed, mace is the red webbing (aril) around it. The fruit itself looks like a small peach and smells incredible when cracked open. Your guide will slice one open so you can smell the fresh nutmeg — it's a revelation compared to pre-ground supermarket nutmeg.</p>

<h3>Cinnamon</h3>
<p>Not the cassia bark most Westerners are familiar with — Zanzibar grows true Ceylon cinnamon (Cinnamomum verum), which has a more delicate, complex flavour. The guide will peel bark directly from a young branch and roll it into a cinnamon stick right in front of you.</p>

<h3>Black Pepper</h3>
<p>Grows on climbing vines that wrap around tree trunks. The peppercorns start green, turn red when ripe, and are dried to produce the familiar black pepper. Fresh green peppercorns have a bright, sharp flavour completely different from dried — taste one if you get the chance.</p>

<h3>Vanilla</h3>
<p>The vanilla orchid is surprisingly unassuming — a climbing vine with thick green leaves. The pods take 9 months to mature after hand pollination (each flower blooms for only 24 hours). Fresh vanilla pod, sliced open to reveal the tiny seeds, has an aroma so intense it's almost narcotic. Real Zanzibar vanilla costs $3-$5 per pod on the farm — a fraction of European prices.</p>

<h3>Turmeric</h3>
<p>Looks like ginger (they're related) but with a vibrant orange-yellow interior. Your guide will slice a root open and the colour is startlingly bright. It stains everything it touches — wear dark clothing on spice tour days. Fresh turmeric has a warm, earthy, slightly peppery flavour that dried turmeric can only approximate.</p>

<h3>Cardamom</h3>
<p>Both green and black cardamom grow in Zanzibar. Green pods grow in clusters near the base of tall, leafy plants. Crack one open and the scent is floral, eucalyptus-like, and unmistakable. Used in Zanzibar's famous spice coffee and in pilau rice.</p>

<h3>Lemongrass</h3>
<p>Grows in thick clumps with long, blade-like leaves. The guide will strip a stalk, crush it, and the citrus scent is instant and strong. Used in teas, soups, and as a natural insect repellent. You'll likely be offered fresh lemongrass tea during the tour — it's exceptional.</p>

<h2>Tropical Fruits</h2>
<p>Spice tours always include a tropical fruit tasting, and this is often the highlight for visitors:</p>
<ul>
<li><strong>Jackfruit:</strong> The world's largest tree fruit — up to 35 kg. Sweet, chewy flesh with a flavour between pineapple and mango. A guide will hack one open with a machete.</li>
<li><strong>Rambutan:</strong> Hairy red exterior, sweet translucent flesh inside. Related to lychee. Pop one open and eat it straight from the tree.</li>
<li><strong>Soursop:</strong> White, creamy flesh with a sweet-tart flavour. Makes incredible juice. Also called custard apple.</li>
<li><strong>Starfruit (carambola):</strong> Slice it crosswise and each piece is a perfect star shape. Refreshing, mildly sweet, juicy.</li>
<li><strong>Passion fruit:</strong> Both purple and yellow varieties. Cut in half, scoop out the seeds with a spoon. The tart, aromatic flavour is addictive.</li>
<li><strong>Breadfruit:</strong> Starchy when cooked, similar to potato. Roasted over charcoal, it's a local staple.</li>
<li><strong>Durian:</strong> The infamous "king of fruits" — loved for its rich, custard-like flesh, loathed for its powerful smell. Not all farms have it, but if yours does, you have to try it. You'll either love it or never forget the experience.</li>
</ul>

<h2>Best Spice Farms to Visit</h2>

<h3>Kidichi Spice Farm</h3>
<p>The most visited and well-organised farm, located about 15 km north of Stone Town near the Kidichi Persian Baths (built by Sultan Said in 1850 for his Persian wife — worth a quick stop). Professional guides, good variety of spices and fruits, handicraft market at the end. Some visitors find it overly touristy, but the quality of the guides and the range of plants is genuinely excellent.</p>

<h3>Kizimbani Spice Farm</h3>
<p>More rustic and less touristed than Kidichi. Originally a Persian agricultural settlement. The guides here tend to be more knowledgeable about the agricultural aspects — how spices are harvested, processed, and exported. Better for visitors genuinely interested in agriculture rather than just the Instagram photos.</p>

<h3>Tangawizi Spice Farm</h3>
<p>A community-run farm that puts more money directly into local hands. Smaller scale, more intimate experience. The cooking class option here is excellent — you prepare a full Swahili lunch using the spices you've just picked.</p>

<h2>Tour Logistics</h2>
<table>
<thead><tr><th>Detail</th><th>Info</th></tr></thead>
<tbody>
<tr><td>Duration</td><td>3-4 hours (half day)</td></tr>
<tr><td>Cost</td><td>$25-$40 per person (group), $40-$60 private</td></tr>
<tr><td>Includes</td><td>Transport from Stone Town, guided walk, fruit tasting, lunch (most tours)</td></tr>
<tr><td>Best time</td><td>Year-round (avoid heavy rain April-May mornings)</td></tr>
<tr><td>Departure</td><td>Usually 9:00-9:30 AM from Stone Town hotels</td></tr>
<tr><td>What to wear</td><td>Closed-toe shoes (trails can be muddy), dark clothing (turmeric stains)</td></tr>
<tr><td>Tip</td><td>$3-$5 per person for your guide is appreciated</td></tr>
</tbody>
</table>

<h3>With Cooking Class</h3>
<p>The best spice tours include a Swahili cooking class ($40-$60 per person). After the plantation walk, you'll prepare a traditional lunch — typically pilau rice (with the cloves, cardamom, and cinnamon you've just smelled), coconut bean curry, chapati, and a fresh juice. Cooking together in an outdoor kitchen, surrounded by the spices you picked, is one of Zanzibar's most memorable experiences. Highly recommended for couples and food lovers. See our <a href="/zanzibar-food-guide/">food guide</a> for more culinary experiences.</p>

<h2>Buying Spices</h2>
<p>Every spice tour ends at a small market where you can buy spices and spice products. Tips for getting good value:</p>
<ul>
<li><strong>Buy whole spices, not ground:</strong> Whole cloves, cinnamon sticks, cardamom pods, and peppercorns retain their flavour for months. Ground spices start losing potency within weeks.</li>
<li><strong>Fair prices:</strong> A bag of cloves (100g): $2-$3. Cinnamon sticks (bundle): $2-$3. Vanilla pods (3-pack): $5-$8. Spice gift set: $10-$15. If prices are dramatically higher, you're being overcharged.</li>
<li><strong>Spice oils:</strong> Clove oil ($3-$5), lemongrass oil ($3-$5), and cinnamon oil ($5-$8) are popular souvenirs. Used for cooking, aromatherapy, and natural remedies.</li>
<li><strong>Spice soap and body products:</strong> Locally made soaps with embedded spices ($2-$4 each). Nice gifts but check they're actually handmade, not factory-produced.</li>
<li><strong>Don't buy at the airport:</strong> Prices at Zanzibar airport are 3-5x farm prices. Buy at the farm or in Stone Town's Darajani Market.</li>
</ul>

<h2>Spices in Zanzibari Cooking</h2>
<p>The spices you see on the tour aren't just agricultural products — they're the backbone of Zanzibar's extraordinary cuisine:</p>
<ul>
<li><strong>Pilau:</strong> Rice cooked with whole cloves, cardamom, cinnamon, and cumin. The signature dish of Zanzibar, eaten at every celebration.</li>
<li><strong>Biryani:</strong> Indian-influenced layered rice dish with meat, saffron, and a complex spice blend. A legacy of centuries of Indian Ocean trade.</li>
<li><strong>Zanzibar coffee:</strong> Coffee brewed with cardamom and ginger. Sold by street vendors for $0.25 a cup. Transformatively different from plain coffee.</li>
<li><strong>Urojo (Zanzibar mix soup):</strong> A tangy soup with fritters, mango, lime, and a blend of spices including turmeric (which gives it the yellow colour).</li>
<li><strong>Chai masala:</strong> Spiced tea with ginger, cardamom, cinnamon, and cloves. Available everywhere.</li>
</ul>
<p>For more on Zanzibar's food scene, see our detailed <a href="/zanzibar-food-guide/">food guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is a spice tour worth it?</h3>
<p>Absolutely — it's one of the most unique experiences in Zanzibar and something you genuinely can't do elsewhere. Even if you're not a "foodie," walking through a plantation where cloves, cinnamon, and vanilla grow on living trees, smelling and tasting everything fresh, is a sensory experience unlike anything else. Plus, the fruit tasting alone is worth the trip.</p>

<h3>How long does a spice tour take?</h3>
<p>3-4 hours including transport from Stone Town. With a cooking class, allow 5-6 hours. Most tours depart at 9:00-9:30 AM and return by 1:00-2:00 PM.</p>

<h3>How much does a spice tour cost?</h3>
<p>$25-$40 per person for a group tour including transport, guided walk, fruit tasting, and usually lunch. Private tours run $40-$60. With a cooking class, expect $40-$60 per person. Book through your hotel or a licensed operator.</p>

<h3>What should I wear?</h3>
<p>Closed-toe shoes (trails can be muddy after rain), comfortable clothing in dark colours (turmeric stains are nearly permanent on white fabric), and modest attire if visiting a rural village area. Bring insect repellent — the plantations are lush and can have mosquitoes.</p>

<h3>Can I do a spice tour from Nungwi or Paje?</h3>
<p>Yes, but most farms are in the interior near Stone Town, so you'll have a longer drive (45-60 minutes from Nungwi, 30-40 minutes from Paje). Some operators offer combined day trips: spice tour + Stone Town walking tour + lunch, which makes the drive worthwhile.</p>

<h3>Are spice tours suitable for children?</h3>
<p>Yes — children love the fruit tasting and seeing spices growing on trees. The walking is easy (flat terrain, 1-2 hours). Kids under 5 may lose interest during the longer explanations, but the hands-on elements (smelling, tasting, seeing a guide climb a palm tree) keep most children engaged.</p>

<h3>Which spice farm is best?</h3>
<p>Kidichi for the most professional, well-organised experience. Kizimbani for more in-depth agricultural knowledge. Tangawizi for a community-run, intimate experience with the best cooking class. All three are good — the guide matters more than the farm.</p>

<h3>Can I buy good spices outside the tour?</h3>
<p>Yes — Darajani Market in <a href="/stone-town-guide/">Stone Town</a> sells spices at local prices. Look for vendors with high turnover (fresher stock). The Zanzibar Spice Company in Stone Town sells premium packaged spices if you want gift-ready products. Avoid airport shops — prices are 3-5x higher.</p>

<h3>What is the Spice Island?</h3>
<p>Zanzibar. The nickname dates to the 19th century when the Sultanate of Oman turned Zanzibar into the world's largest clove producer. At its peak, Zanzibar supplied over 90% of the world's cloves and was a major exporter of nutmeg, cinnamon, and black pepper. The name stuck, and spice cultivation remains central to Zanzibar's economy and culture today.</p>

<h3>Do I need to book in advance?</h3>
<p>Not usually — your hotel can arrange a spice tour with 1-day notice. During peak season (July-August, Christmas), popular operators may fill up, so booking 2-3 days ahead is wise. For cooking class tours specifically, 2-3 days advance booking is recommended as these have limited capacity.</p>
`;

async function main() {
  console.log("Seeding 2 Zanzibar blog posts (water sports + spice tour)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });

  const tagZanzibar = await prisma.tag.upsert({ where: { slug: "zanzibar" }, update: { name: "Zanzibar" }, create: { slug: "zanzibar", name: "Zanzibar" } });
  const tagWaterSports = await prisma.tag.upsert({ where: { slug: "water-sports" }, update: { name: "Water Sports" }, create: { slug: "water-sports", name: "Water Sports" } });
  const tagKiteSurfing = await prisma.tag.upsert({ where: { slug: "kite-surfing" }, update: { name: "Kite Surfing" }, create: { slug: "kite-surfing", name: "Kite Surfing" } });
  const tagDiving = await prisma.tag.upsert({ where: { slug: "diving" }, update: { name: "Diving" }, create: { slug: "diving", name: "Diving" } });
  const tagSpiceTour = await prisma.tag.upsert({ where: { slug: "spice-tour" }, update: { name: "Spice Tour" }, create: { slug: "spice-tour", name: "Spice Tour" } });
  const tagSpiceIsland = await prisma.tag.upsert({ where: { slug: "spice-island" }, update: { name: "Spice Island" }, create: { slug: "spice-island", name: "Spice Island" } });
  const tagCulturalTours = await prisma.tag.upsert({ where: { slug: "cultural-tours" }, update: { name: "Cultural Tours" }, create: { slug: "cultural-tours", name: "Cultural Tours" } });

  const post1 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-water-sports" },
    update: {
      title: "Zanzibar Water Sports: Kite Surfing, Diving, Snorkelling & More",
      excerpt: "Complete guide to Zanzibar water sports — kite surfing in Paje, scuba diving, snorkelling at Mnemba, deep-sea fishing, whale sharks, dhow sailing, and more with prices.",
      content: waterSportsContent,
      metaTitle: "Zanzibar Water Sports | Kite, Dive & Snorkel Guide",
      metaDescription: "Every water sport in Zanzibar: kite surfing Paje, diving Mnemba, deep-sea fishing, whale sharks, dhow sailing. Prices, schools, and seasons from a local operator.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-water-sports",
      title: "Zanzibar Water Sports: Kite Surfing, Diving, Snorkelling & More",
      excerpt: "Complete guide to Zanzibar water sports — kite surfing in Paje, scuba diving, snorkelling at Mnemba, deep-sea fishing, whale sharks, dhow sailing, and more with prices.",
      content: waterSportsContent,
      metaTitle: "Zanzibar Water Sports | Kite, Dive & Snorkel Guide",
      metaDescription: "Every water sport in Zanzibar: kite surfing Paje, diving Mnemba, deep-sea fishing, whale sharks, dhow sailing. Prices, schools, and seasons from a local operator.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post1.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagWaterSports, tagKiteSurfing, tagDiving]) {
    await prisma.postTag.create({ data: { postId: post1.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-water-sports");

  const post2 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-spice-tour-guide" },
    update: {
      title: "Zanzibar Spice Tour: The Complete Guide to the Spice Island",
      excerpt: "Everything about Zanzibar spice tours — which farms to visit, what spices you'll see, costs, cooking classes, buying tips, and the history of the Spice Island.",
      content: spiceTourContent,
      metaTitle: "Zanzibar Spice Tour Guide | Farms & Prices",
      metaDescription: "Plan your Zanzibar spice tour: best farms, what you'll see (cloves, cinnamon, vanilla), cooking classes, costs, and buying tips from a local Tanzania operator.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-spice-tour-guide",
      title: "Zanzibar Spice Tour: The Complete Guide to the Spice Island",
      excerpt: "Everything about Zanzibar spice tours — which farms to visit, what spices you'll see, costs, cooking classes, buying tips, and the history of the Spice Island.",
      content: spiceTourContent,
      metaTitle: "Zanzibar Spice Tour Guide | Farms & Prices",
      metaDescription: "Plan your Zanzibar spice tour: best farms, what you'll see (cloves, cinnamon, vanilla), cooking classes, costs, and buying tips from a local Tanzania operator.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post2.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagSpiceTour, tagSpiceIsland, tagCulturalTours]) {
    await prisma.postTag.create({ data: { postId: post2.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-spice-tour-guide");

  console.log("\nDone — 2 Zanzibar blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
