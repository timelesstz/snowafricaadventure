import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

// ─── POST 1: Safari and Zanzibar Combo ───────────────────────────────────────

const zanzibarComboContent = `
<p>Every week, at least a dozen travellers ask us the same question: "Can we add Zanzibar after our safari?" The answer is always yes — and we always tell them they should. Tanzania is one of a handful of countries on Earth where you can witness a million wildebeest crossing a crocodile-infested river on Tuesday and be snorkelling over pristine coral on Thursday. We've been arranging safari-and-Zanzibar combos from our office in Moshi for over a decade, and it remains the single most popular trip format we sell.</p>

<h2>Why Combine Safari and Zanzibar?</h2>
<p>Kenya has a coast. South Africa has beaches. But neither comes close to what Zanzibar offers as a post-safari wind-down. The Zanzibar Archipelago sits 35 kilometres off the Tanzanian mainland — close enough that flights are short, far enough that it feels like a different world. White sand, turquoise water, UNESCO heritage architecture, and spice plantations wrapped in Swahili culture. After days of dusty game drives, early wake-up calls, and adrenaline-spiked wildlife encounters, Zanzibar is the exhale.</p>
<p>The practical argument is strong too. You're already in Tanzania. Flights from the Serengeti or Arusha to Zanzibar are 1.5 to 2 hours. You don't need a separate visa, a separate currency exchange, or a separate set of logistics. One country, two radically different experiences.</p>

<h2>Getting from Safari to Zanzibar</h2>
<p>There are three ways to make the transfer, and the right one depends on your budget and where your safari ends.</p>

<h3>Option 1: Fly from the Serengeti (Best for Most Travellers)</h3>
<p>If your <a href="/tanzania-safaris/">Tanzania safari</a> ends in the Serengeti, you can fly directly to Zanzibar via Arusha or Dar es Salaam. Coastal Aviation and Auric Air operate daily scheduled flights from Serengeti airstrips (Seronera, Kogatende, Grumeti) connecting through Arusha. Total travel time is 3-4 hours door-to-door. One-way fares run $350-$450 per person depending on the season and how far in advance you book.</p>

<h3>Option 2: Fly from Arusha or Kilimanjaro Airport</h3>
<p>If your safari ends in Arusha — the standard finish point for northern circuit safaris — you can fly to Zanzibar from either Arusha Airport or Kilimanjaro International (JRO). Multiple airlines serve this route: Precision Air, Fastjet, and Air Tanzania. Flights take 1.5 hours. One-way tickets range from $150-$300. Book directly on airline websites for the best fares — third-party sites often inflate prices by 40-60%.</p>

<h3>Option 3: Overland via Dar es Salaam + Ferry (Budget Option)</h3>
<p>Drive from Arusha to Dar es Salaam (8-9 hours by shuttle bus, $30-$50) and take the Azam Marine fast ferry to Zanzibar (2 hours, $35 economy / $50 business class). Total cost under $100, but total travel time is 10-12 hours. We only recommend this if you're on a strict budget and have a flexible schedule. The ferry departs at 7 AM, 9:30 AM, 12:30 PM, and 3:30 PM from Dar es Salaam. Book your ferry ticket online at azammarine.com at least two days ahead — the 7 AM departure sells out regularly.</p>

<h2>When to Go: Timing Your Combo Trip</h2>
<p>Getting the timing right matters more than most guides admit. You need weather that works for both safari and beach — they don't always align.</p>

<h3>June to October: The Sweet Spot</h3>
<p>Dry season on the mainland means excellent game viewing — animals concentrate around water sources and the <a href="/serengeti-great-migration-guide/">Great Migration</a> is in the northern Serengeti or western corridor. Zanzibar is warm (27-30°C), dry, and the ocean is calm. Trade winds are gentle. This is peak season for both, so book 4-6 months ahead.</p>

<h3>January to February: Calving Season + Warm Beaches</h3>
<p>The <a href="/best-time-safari-tanzania/">wildebeest calving season</a> in the southern Serengeti is one of nature's greatest spectacles — 8,000 calves born every day for three weeks. Zanzibar is hot (30-33°C) with occasional short showers that clear within an hour. Excellent diving visibility. Slightly fewer crowds than June-October.</p>

<h3>March to May: Avoid if Possible</h3>
<p>The long rains hit both the mainland and Zanzibar. Some safari lodges close entirely. Zanzibar beaches get heavy rain, the sea is rough, and many dive centres scale back operations. You can save 30-40% on accommodation, but the experience suffers significantly.</p>

<h3>November to December: The Short Rains Gamble</h3>
<p>Short rains bring afternoon showers that usually last 30-60 minutes. Safari is still good — the landscape is green, baby animals are everywhere, and prices drop 20-30%. Zanzibar gets occasional rain but the ocean remains warm. A solid option for budget-conscious travellers who don't mind some unpredictability.</p>

<h2>How Many Days for Each?</h2>
<p>We've tested every combination over the years. Here's what actually works versus what sounds good on paper.</p>

<table>
<thead>
<tr><th>Trip Length</th><th>Safari Days</th><th>Zanzibar Days</th><th>Our Verdict</th></tr>
</thead>
<tbody>
<tr><td>5-6 days</td><td>2-3</td><td>2-3</td><td>Too rushed — you'll feel like you saw nothing properly</td></tr>
<tr><td>7-8 days</td><td>3-4</td><td>3-4</td><td>Functional minimum — works if time is tight</td></tr>
<tr><td>10-11 days</td><td>5-6</td><td>4-5</td><td>The sweet spot — enough time to relax into both</td></tr>
<tr><td>14+ days</td><td>7-8</td><td>6-7</td><td>The ultimate — full northern circuit + unhurried beach</td></tr>
</tbody>
</table>

<p>Our strong recommendation: give the safari at least 5 days and Zanzibar at least 4. Anything less and you're paying international airfare to rush through two experiences that deserve time.</p>

<h2>What to Do in Zanzibar</h2>
<p>Zanzibar is not a one-trick beach destination. There's enough to fill two weeks if you're curious. Here's what we steer our guests toward, roughly in order of priority.</p>

<h3>Stone Town</h3>
<p>Start here. Stone Town is a UNESCO World Heritage Site and one of the most atmospheric old towns in East Africa. Narrow alleyways open into hidden courtyards. Carved wooden doors — over 500 of them, some dating to the 18th century — tell the story of the island's Omani, Indian, and Swahili heritage. Walk the waterfront at sunset. Visit the Old Fort, the former slave market at the Anglican Cathedral, and the spice-scented Darajani Market. Budget a full day. Guided walking tours cost $20-$30 per person and are worth it — the stories bring the architecture to life.</p>

<h3>Beaches: Where to Base Yourself</h3>
<p>The beach you choose defines your Zanzibar experience. They're not interchangeable.</p>
<ul>
<li><strong>Nungwi and Kendwa (North Coast):</strong> The best swimming beaches. Minimal tidal variation means you can swim at any time. Nungwi is livelier with beach bars and restaurants; Kendwa is quieter with a more resort feel. Best sunsets on the island.</li>
<li><strong>Paje (East Coast):</strong> Kite surfing capital of East Africa. Consistent trade winds from June to October make this a magnet for kite surfers. Wide beach, but significant tidal range — at low tide, the ocean retreats hundreds of metres and local women harvest seaweed. Beautiful in a different, more raw way.</li>
<li><strong>Matemwe (Northeast Coast):</strong> Quiet, authentic, and our personal favourite. Fewer tourists, traditional fishing culture, and the closest launching point for Mnemba Atoll snorkelling trips. The beach is stunning but swimming is tide-dependent.</li>
<li><strong>Jambiani (Southeast Coast):</strong> The backpacker and budget traveller hub. Long, palm-lined beach, affordable guesthouses, and genuine village atmosphere. Seaweed farming visible at low tide.</li>
</ul>

<h3>Snorkelling and Diving</h3>
<p>Zanzibar's underwater world is genuinely world-class. Mnemba Atoll — a tiny private island 3 kilometres off the northeast coast — is the headline act. The reef surrounding the island hosts over 600 species of fish, sea turtles, dolphins, and occasional whale sharks (November-March). Snorkelling boat trips from Matemwe or Nungwi cost $35-$60 per person. Two-tank scuba dives run $80-$120. Chumbe Island, south of Stone Town, has one of the best-preserved coral reefs in the western Indian Ocean — a marine sanctuary with guided snorkelling that costs $100 including the boat, guide, and lunch. PADI Open Water certification is available at multiple dive centres for $450-$550.</p>

<h3>Spice Tour</h3>
<p>Zanzibar was once the world's largest clove producer, and spices remain central to the island's identity. A half-day spice tour ($25-$40 per person) takes you through plantations where you'll smell, taste, and identify cloves, nutmeg, cinnamon, black pepper, cardamom, vanilla, lemongrass, and turmeric growing in their natural state. Most tours include a Swahili cooking demonstration. Genuinely one of the most sensory experiences in East Africa.</p>

<h3>Jozani Forest</h3>
<p>The island's only national park and the last stronghold of the Zanzibar red colobus monkey — a subspecies found nowhere else on Earth. About 6,000 remain. The forest walk takes 1-2 hours and you're virtually guaranteed sightings — the monkeys are habituated to visitors. Entry is $12 per person. Combine with a mangrove boardwalk on the same visit.</p>

<h3>Sunset Dhow Cruise</h3>
<p>Board a traditional wooden dhow off Stone Town's waterfront and sail north along the coast as the sun drops into the Indian Ocean. Most cruises include seafood, fruit, and drinks. $30-$50 per person for a 2-hour sunset cruise. Do this on your first or last evening in Stone Town.</p>

<h3>Prison Island (Changuu)</h3>
<p>A 20-minute boat ride from Stone Town brings you to Prison Island, home to a colony of Aldabra giant tortoises — some over 190 years old. The island was never actually used as a prison despite its name. Boat transfer and entry fee total about $30-$40 per person. Combine with snorkelling on the reef surrounding the island.</p>

<h2>Where to Stay in Zanzibar</h2>
<p>Accommodation in Zanzibar ranges from $30 guesthouses to $2,000-per-night private villas. Here's what we book most frequently for our safari-combo guests.</p>

<h3>Stone Town</h3>
<ul>
<li><strong>Budget:</strong> Tembo House Hotel ($80-$120/night) — waterfront location, rooftop restaurant, solid value</li>
<li><strong>Mid-range:</strong> Emerson Spice ($150-$250/night) — restored merchant house, extraordinary rooftop dining, every room unique</li>
<li><strong>Luxury:</strong> Park Hyatt Zanzibar ($350-$600/night) — occupying a historic building on the waterfront, pool, spa, flawless service</li>
</ul>

<h3>North Coast (Nungwi/Kendwa)</h3>
<ul>
<li><strong>Budget:</strong> Flame Tree Cottages ($60-$100/night) — clean, friendly, 5 minutes from Nungwi beach</li>
<li><strong>Mid-range:</strong> Z Hotel Nungwi ($200-$350/night) — adults-only, infinity pool, beachfront, superb restaurant</li>
<li><strong>Luxury:</strong> Essque Zalu Zanzibar ($300-$500/night) — private villas, massive pool, stunning architecture</li>
</ul>

<h3>East Coast (Paje/Jambiani)</h3>
<ul>
<li><strong>Budget:</strong> Mr Kahawa ($40-$70/night) — boutique guesthouse, great breakfast, warm hosts</li>
<li><strong>Mid-range:</strong> Baraza Resort & Spa ($250-$400/night) — all-inclusive, Arabic-inspired design, world-class spa</li>
<li><strong>Luxury:</strong> The Residence Zanzibar ($400-$700/night) — butler service, private pool villas, one of the finest properties on the island</li>
</ul>

<h2>Sample Itineraries with Costs</h2>
<p>These are real itineraries we've run for guests in the last 12 months. <a href="/tanzania-safari-cost/">Costs are per person</a> sharing and include accommodation, meals, park fees, transfers, and activities.</p>

<h3>7-Day Express: 3 Safari + 4 Zanzibar ($2,500-$5,000)</h3>
<ul>
<li><strong>Days 1-3:</strong> Tarangire and Ngorongoro Crater safari (budget camping to mid-range lodge)</li>
<li><strong>Day 3 evening:</strong> Fly Arusha → Zanzibar ($200-$300)</li>
<li><strong>Day 4:</strong> Stone Town exploration, spice tour</li>
<li><strong>Days 5-6:</strong> Beach (Nungwi or Kendwa), snorkelling at Mnemba Atoll</li>
<li><strong>Day 7:</strong> Departure from Zanzibar</li>
</ul>

<h3>10-Day Classic: 6 Safari + 4 Zanzibar ($4,000-$8,000)</h3>
<ul>
<li><strong>Days 1-2:</strong> Tarangire National Park</li>
<li><strong>Day 3:</strong> Ngorongoro Crater</li>
<li><strong>Days 4-6:</strong> Serengeti (central + migration zone)</li>
<li><strong>Day 6 afternoon:</strong> Fly Serengeti → Zanzibar ($400-$450)</li>
<li><strong>Day 7:</strong> Stone Town, sunset dhow cruise</li>
<li><strong>Days 8-9:</strong> Beach, diving, Jozani Forest</li>
<li><strong>Day 10:</strong> Departure</li>
</ul>
<p>This is our most-booked combo itinerary. Six days on safari covers the full northern circuit, and four days in Zanzibar is enough to decompress without getting bored.</p>

<h3>14-Day Ultimate: 7 Safari + 7 Zanzibar ($5,500-$12,000)</h3>
<ul>
<li><strong>Days 1-7:</strong> Full northern circuit — Lake Manyara, Ngorongoro, Serengeti (3 nights, including migration tracking)</li>
<li><strong>Day 7:</strong> Fly Serengeti → Zanzibar</li>
<li><strong>Days 8-9:</strong> Stone Town (walking tour, slave market, spice tour, sunset dhow)</li>
<li><strong>Days 10-12:</strong> Beach resort (Nungwi, Kendwa, or Matemwe), diving at Mnemba, kite surfing in Paje</li>
<li><strong>Day 13:</strong> Chumbe Island day trip or Prison Island + cooking class</li>
<li><strong>Day 14:</strong> Departure from Zanzibar</li>
</ul>
<p>The <a href="/luxury-safari-tanzania-guide/">luxury version</a> of this itinerary — with lodges like Four Seasons Serengeti, &Beyond Ngorongoro, and The Residence Zanzibar — runs $10,000-$12,000 per person. The mid-range version with solid 3-4 star properties comes in at $5,500-$7,000.</p>

<h2>Budget Breakdown: The Zanzibar Portion</h2>
<p>Here's what the Zanzibar leg actually costs, so you can plan realistically.</p>

<table>
<thead>
<tr><th>Category</th><th>Budget</th><th>Mid-Range</th><th>Luxury</th></tr>
</thead>
<tbody>
<tr><td>Accommodation (per night)</td><td>$40-$80</td><td>$150-$300</td><td>$400-$700</td></tr>
<tr><td>Meals (per day)</td><td>$15-$25</td><td>$30-$60</td><td>Included</td></tr>
<tr><td>Airport transfer</td><td>$20 (shared)</td><td>$40-$60 (private)</td><td>$60-$80 (private)</td></tr>
<tr><td>Stone Town tour</td><td>$20-$30</td><td>$30-$50</td><td>$50-$80 (private)</td></tr>
<tr><td>Mnemba snorkelling</td><td>$35-$50</td><td>$50-$70</td><td>$80-$120 (private boat)</td></tr>
<tr><td>Spice tour</td><td>$25</td><td>$35</td><td>$50 (private)</td></tr>
<tr><td>Dhow cruise</td><td>$30</td><td>$40</td><td>$80 (private)</td></tr>
<tr><td>4-Night Total</td><td>$380-$550</td><td>$900-$1,500</td><td>$2,200-$3,500</td></tr>
</tbody>
</table>

<h2>Practical Tips for the Zanzibar Leg</h2>

<h3>Currency and Payments</h3>
<p>Zanzibar uses Tanzanian Shillings (TZS), same as the mainland. US dollars are widely accepted at hotels, tour operators, and tourist restaurants. ATMs are available in Stone Town and Nungwi but unreliable in rural areas. Carry cash — many smaller restaurants and shops are cash-only. Visa and Mastercard accepted at mid-range and luxury hotels.</p>

<h3>Dress Code</h3>
<p>Zanzibar is predominantly Muslim. In Stone Town and villages, cover your shoulders and knees — this is respectful, not optional. Women don't need to cover their hair. On resort beaches, swimwear is completely normal. The contrast between Stone Town and beach resort areas is significant — pack a light sarong or linen trousers for town visits.</p>

<h3>Safety</h3>
<p>Zanzibar is generally safe for tourists. Standard precautions apply: don't walk alone in Stone Town after midnight, don't leave valuables on the beach, use hotel safes. The biggest actual risk is traffic — mopeds and bajaji (three-wheelers) don't always observe lane discipline. Beach boys (touts offering tours and activities) can be persistent in Nungwi and Stone Town but are not aggressive. A firm "no thank you" works.</p>

<h3>Health</h3>
<p>Zanzibar is a malaria zone. Continue antimalarials throughout your beach stay — many travellers make the mistake of stopping medication after their safari. Drink bottled water. Sunscreen and reef-safe sunblock are expensive on the island — bring your own.</p>

<h2>How We Arrange Your Combo Trip</h2>
<p>When you book a <a href="/tanzania-safari-itinerary/">safari-and-Zanzibar combination</a> through Snow Africa Adventure, we handle everything end-to-end: your safari itinerary, the inter-island flight booking, Zanzibar accommodation, airport transfers, and activity reservations. One point of contact, one invoice, no coordination headaches. We work with trusted Zanzibar partners we've vetted personally — guides, hotels, and boat operators we've used for years.</p>
<p>Our advice? Don't leave Zanzibar as an afterthought. Tell us your total budget and trip length upfront, and we'll design a combo that gives both halves the time they deserve.</p>

<h2>Frequently Asked Questions</h2>

<h3>How many days do I need for a safari and Zanzibar combo?</h3>
<p>We recommend a minimum of 7 days (3 safari + 4 Zanzibar), but 10-11 days is the sweet spot. This gives you 5-6 days on safari to cover the full northern circuit and 4-5 days in Zanzibar to explore Stone Town, relax on the beach, and do water activities without rushing.</p>

<h3>How do I get from the safari to Zanzibar?</h3>
<p>The fastest option is a flight from Arusha or the Serengeti to Zanzibar (1.5-2 hours, $150-$450 depending on origin). Budget travellers can take a shuttle bus to Dar es Salaam and then the Azam Marine fast ferry (total 10-12 hours, under $100).</p>

<h3>What is the best time of year for a safari and Zanzibar trip?</h3>
<p>June to October is ideal — dry season for safari and warm, calm weather in Zanzibar. January-February is also excellent, combining calving season in the Serengeti with hot beach weather. Avoid April-May when heavy rains affect both destinations.</p>

<h3>How much does a safari and Zanzibar combo cost?</h3>
<p>Budget on $2,500-$5,000 per person for a 7-day trip, $4,000-$8,000 for 10 days, and $5,500-$12,000 for 14 days. The range depends primarily on accommodation level — camping vs lodge vs luxury. Read our full <a href="/tanzania-safari-cost/">Tanzania safari cost guide</a> for detailed breakdowns.</p>

<h3>Do I need a separate visa for Zanzibar?</h3>
<p>No. Zanzibar is part of Tanzania, so your Tanzania visa covers the entire trip. Most nationalities get a visa on arrival at Kilimanjaro Airport or can apply for an e-visa in advance ($50 single entry).</p>

<h3>Is Zanzibar safe for tourists?</h3>
<p>Yes. Zanzibar is one of the safer tourist destinations in East Africa. Standard precautions apply — use hotel safes, avoid walking alone late at night in Stone Town, and be aware of traffic. Beach touts can be persistent but are not dangerous.</p>

<h3>Should I do the safari first or Zanzibar first?</h3>
<p>Safari first, Zanzibar second. Almost always. After days of early starts, long drives, and dust, the beach is a perfect decompression. Going the other way — beach first, then safari — means you're relaxed but then have to readjust to 5:30 AM wake-up calls. Start active, end relaxed.</p>

<h3>What should I pack for a safari and Zanzibar combo?</h3>
<p>Two wardrobes in one bag. Safari: neutral colours, layers for cold mornings, closed shoes, binoculars. Zanzibar: light clothing, swimwear, modest cover-ups for Stone Town, reef shoes for snorkelling. A sarong works as a beach cover, Stone Town wrap, and safari dust shield. Check our <a href="/tanzania-safari-packing-list/">complete packing list</a> for details.</p>

<h3>Can I see the Big Five on safari and then go to Zanzibar?</h3>
<p>Absolutely. A 5-6 day northern circuit safari covering Ngorongoro Crater (rhino, lion, buffalo, elephant) and the Serengeti (leopard) gives you strong chances at all <a href="/big-five-tanzania/">Big Five species</a>. Then fly to Zanzibar the same afternoon.</p>

<h3>Is the ferry from Dar es Salaam to Zanzibar safe?</h3>
<p>The Azam Marine fast ferries are modern, well-maintained catamarans with life jackets, safety briefings, and regulated capacity. They're safe and reliable. Avoid unregistered or overloaded boats — only use the established ferry companies (Azam Marine is the gold standard). The crossing takes 2 hours and the sea is generally calm, though it can be choppy during the southeast monsoon (June-September).</p>

<h3>What water activities can I do in Zanzibar?</h3>
<p>Snorkelling at Mnemba Atoll (world-class reef, sea turtles, dolphins), scuba diving (PADI courses available, $450-$550), kite surfing in Paje (lessons from $60/hour), sunset dhow cruises ($30-$50), deep sea fishing ($350-$500 for a half day), paddleboarding, and kayaking. Whale shark swims are possible November-March near Mafia Island, a short flight from Zanzibar.</p>

<h3>Do I need malaria medication in Zanzibar?</h3>
<p>Yes. Zanzibar is a malaria zone. Continue your antimalarial medication throughout your beach stay — this is the most common mistake travellers make. Mosquitoes are less prevalent in coastal breeze areas (Nungwi, Kendwa) but still present, especially at dawn and dusk. Use DEET-based repellent and sleep under a treated net if your room doesn't have screens.</p>
`;

// ─── POST 2: Photography Safari Tanzania ─────────────────────────────────────

const photographyContent = `
<p>We've driven photographers through the Serengeti with rigs worth more than our Land Cruiser, and we've watched smartphone users capture images that stopped us in our tracks. Great safari photography is about understanding light, animal behaviour, and vehicle positioning far more than it's about owning expensive gear. After years of guiding photographers across the northern circuit, here's everything we know about capturing Tanzania's wildlife — whether you're shooting with an iPhone or a Canon R5.</p>

<h2>Camera Gear for Safari: What Actually Matters</h2>
<p>The internet is full of gear lists that read like a photography store catalogue. Here's what we see working — and not working — in the field every week.</p>

<h3>Smartphones: Better Than You Think</h3>
<p>Modern smartphones are legitimate safari cameras. The iPhone 15 Pro and Samsung Galaxy S24 Ultra have telephoto lenses that reach 5x and 10x optical zoom respectively — enough to fill the frame with a lion at 20 metres. Tips that separate a decent phone photo from a great one:</p>
<ul>
<li><strong>Use burst mode</strong> — hold the shutter button and the phone fires 10 frames per second. Essential for action shots (a cheetah launching, birds taking flight).</li>
<li><strong>Clean your lens.</strong> Seriously. After a morning on dusty roads, your lens has a film of fine dirt that kills sharpness. Wipe it with a microfibre cloth before every sighting.</li>
<li><strong>Use the volume button as a shutter</strong> — it gives you a physical button to press, reducing camera shake compared to tapping the screen.</li>
<li><strong>Shoot in RAW</strong> (iPhone: enable Apple ProRAW; Samsung: use Pro mode). RAW files let you recover shadows and highlights that JPEGs destroy, especially in the harsh midday light.</li>
<li><strong>Avoid digital zoom past 10x</strong> — the image quality degrades rapidly. If the animal is too far, enjoy the moment with your eyes instead.</li>
</ul>

<h3>Compact Cameras: The Smart Middle Ground</h3>
<p>If you want better results than a phone without the bulk of an interchangeable-lens system, a high-end compact is the answer. The <strong>Sony RX100 VII</strong> ($1,300) is the best safari compact we've seen — 24-200mm equivalent zoom, 20fps burst shooting, and it fits in a cargo pocket. The <strong>Canon PowerShot G7 X Mark III</strong> ($750) is a solid budget alternative with excellent video. Compacts struggle in low light (small sensors) and can't reach animals beyond about 50 metres, but for general safari documentation they're outstanding.</p>

<h3>Mirrorless Cameras: The New Standard</h3>
<p>Mirrorless has overtaken DSLRs for safari photography. The bodies are lighter, the autofocus is faster (especially eye-tracking AF on animals), and electronic viewfinders show you the exposure in real time — critical when light changes every few seconds on the savanna.</p>
<ul>
<li><strong>Sony A7 IV</strong> ($2,500 body) — 33MP, excellent animal eye-AF, superb low-light performance. Our most-seen camera among serious amateurs.</li>
<li><strong>Canon EOS R6 Mark II</strong> ($2,500 body) — 24MP, blazing 40fps electronic shutter, best-in-class animal tracking AF. Phenomenal for action.</li>
<li><strong>Nikon Z8</strong> ($4,000 body) — 45MP, 20fps, built like a tank. The choice for photographers who also print large.</li>
<li><strong>Sony A1</strong> ($6,500 body) — 50MP at 30fps. Overkill for most, but if you're selling images or shooting for publication, nothing touches it.</li>
</ul>

<h3>DSLRs: Still Capable</h3>
<p>If you already own a DSLR, don't buy a mirrorless system just for safari. The <strong>Nikon D850</strong> and <strong>Canon 5D Mark IV</strong> are proven safari workhorses. Their optical viewfinders have zero lag (an advantage in fast action), battery life is double what mirrorless offers, and the lens ecosystems are mature. A D850 with a 200-500mm f/5.6 is still one of the most effective wildlife rigs in existence.</p>

<h3>Lenses: Where the Real Investment Goes</h3>
<p>On safari, lenses matter more than bodies. An average camera with a great lens beats a great camera with a mediocre lens every time.</p>
<ul>
<li><strong>70-200mm f/2.8:</strong> Your workhorse for close-to-medium encounters — lion portraits, elephant families at water, camp wildlife. The f/2.8 aperture creates beautiful background blur and handles low light at dawn and dusk.</li>
<li><strong>100-400mm f/4.5-5.6:</strong> The most versatile safari lens. Covers everything from vehicle-side encounters to animals 80 metres away. The Canon RF 100-400 ($650) and Sigma 100-400mm ($700) are remarkable values.</li>
<li><strong>200-600mm f/5.6-6.3:</strong> Essential for birds and distant subjects. The Sony 200-600mm ($2,000) is the gold standard — internal zoom, fast AF, and relatively light for its reach. Tamron 150-500mm ($1,400) is a strong alternative.</li>
<li><strong>Wide angle (16-35mm or 24-70mm):</strong> Don't forget this. Landscapes, camp life, vehicle interior shots, and dramatic close encounters (an elephant walking past your Land Cruiser at 5 metres) all need wide coverage.</li>
</ul>

<h2>Stabilisation: Forget the Tripod</h2>
<p>Tripods are useless on safari. You're shooting from a moving vehicle, changing position constantly, and a tripod's legs have nowhere to go. What works:</p>
<ul>
<li><strong>Beanbag:</strong> The single most useful safari photography accessory. Rest it on the vehicle door frame, roof hatch edge, or window sill and place your lens on top. It absorbs vibration, provides stable support, and weighs nothing. Buy one pre-filled with plastic beads (1 kg) or bring an empty bag and fill it with rice or dried beans in Arusha. Cost: $15-$40.</li>
<li><strong>Monopod:</strong> Useful for walking safaris in Tarangire or the Ngorongoro highlands. A carbon fibre travel monopod ($50-$150) folds down to 40 cm and supports long lenses at waist height.</li>
<li><strong>Image stabilisation:</strong> Enable it. Modern in-body and in-lens stabilisation gives you 4-6 extra stops of handheld capability. The Sony A7 IV with a stabilised lens lets you handhold a 600mm lens at 1/125s — something that was impossible five years ago.</li>
</ul>

<h2>Best Parks for Photography</h2>
<p>Every park in the <a href="/tanzania-safaris/">northern circuit</a> offers different photographic opportunities. Here's what we tell photographers who want to maximise their portfolio.</p>

<h3>Serengeti National Park</h3>
<p>The Serengeti is photography's promised land. The endless plains create clean, uncluttered backgrounds that make every animal pop. Golden hour — the 30 minutes after sunrise and before sunset — turns the savanna into liquid gold. The central Serengeti around Seronera has the highest density of leopards in Africa, and they're habituated enough to allow close approach. During the <a href="/serengeti-great-migration-guide/">Great Migration</a> (June-October in the north, January-March in the south), the visual scale is almost impossible to process — a million wildebeest stretched across the horizon. River crossings at the Mara River are the most dramatic wildlife photography events on Earth, but they require patience: we've sat at crossing points for 6 hours with nothing happening, then captured 20 minutes of chaos.</p>

<h3>Ngorongoro Crater</h3>
<p>The crater is a photographer's dream for one reason: proximity. The caldera walls funnel 25,000 animals into 260 square kilometres, so encounters are close and frequent. Wide-angle shots here are exceptional — you can frame a lion pride with the entire crater wall rising behind them. The challenge is the light: the crater floor is often hazy before 9 AM as morning mist burns off, and the rim casts shadows in late afternoon. The sweet spot is 9:30-11:00 AM and 3:00-4:30 PM. Black rhino photography opportunities are the best in Tanzania — roughly 26 individuals roam the crater, and your guide will know where they've been seen that morning.</p>

<h3>Tarangire National Park</h3>
<p>Tarangire produces the most iconic compositions in Tanzania. Massive elephant herds (200-300 animals during dry season) framed against ancient baobab trees is a shot that defines East African safari. The Tarangire River draws animals from surrounding areas, creating concentrated scenes along its banks. Tree-climbing pythons, fringe-eared oryx, and gerenuk provide subjects you won't find in the Serengeti. Afternoon light in Tarangire is exceptional — the baobab trunks glow amber against a deep blue sky.</p>

<h3>Lake Manyara National Park</h3>
<p>Smaller than the others but photographically distinct. The Rift Valley escarpment provides a dramatic backdrop for every shot. Tree-climbing lions draped over acacia branches make for surreal compositions. Flamingo flocks on the alkaline lake — thousands of pink bodies against grey-blue water — are best shot with a 200-600mm lens from the lakeshore viewpoint. The groundwater forest at the park entrance is one of the few places where you'll photograph blue monkeys in dappled forest light.</p>

<h2>Photography Tips by Subject</h2>

<h3>Big Cats: Patience Is the Technique</h3>
<p>Lions sleep 18-20 hours a day. If you arrive at a pride and they're sleeping, don't leave — ask your guide to wait. In our experience, sitting with a lion pride for 2+ hours dramatically increases your chances of capturing a yawn, a stretch, cubs playing, or a hunt sequence. Shoot low — through the window, not from the roof — to get eye-level perspective. Eye-level transforms a snapshot into a portrait. For leopards, afternoon light filtering through acacia canopy creates a painterly quality. Cheetahs hunt in early morning; if you spot one scanning the horizon, stay quiet, engine off, and be ready for explosive acceleration at any moment.</p>

<h3>Elephants: Get Low, Shoot Wide</h3>
<p>Elephants are large enough that you can photograph them effectively with any lens. The mistake most photographers make is always shooting tight portraits. Step back — use your 24-70mm when a herd crosses in front of your vehicle. Include the landscape, the dust, the baobab tree. These contextual shots are the ones you'll frame. For close encounters, shoot through the vehicle's lower windows to get a low angle that emphasises the elephant's size. Backlit elephants at golden hour — ears translucent, dust particles glowing — is one of safari photography's defining images.</p>

<h3>Birds: Speed and Anticipation</h3>
<p>Tanzania has over 1,100 bird species. A 200-600mm lens is essential. Settings: shutter speed minimum 1/2000s (1/4000s for flight shots), continuous autofocus with the widest AF area your camera offers, and burst mode. The key skill is anticipation — watch for pre-flight behaviour (a bird crouching, spreading wings slightly, looking at the sky). Lilac-breasted rollers are the most photogenic bird in Tanzania and sit on exposed perches obligingly. Martial eagles, secretary birds, and crowned cranes provide dramatic subjects. The best bird photography location in the northern circuit is Lake Manyara.</p>

<h3>Migration: Scale and Drama</h3>
<p>Migration photography demands two approaches. For scale, use a wide-angle or short telephoto (70-200mm) from an elevated position — a kopje or hillside — to capture thousands of wildebeest stretching to the horizon. Include foreground elements (a lone acacia, a rocky outcrop) to give the eye an anchor. For drama, position yourself at a river crossing with a 100-400mm lens. Focus on a single animal mid-leap, mid-splash, or mid-encounter with a crocodile. The compression of a telephoto lens stacks the animals together, creating a sense of overwhelming density.</p>

<h3>Landscapes: Dawn, Dusk, and an Animal</h3>
<p>Serengeti landscape shots need one thing to become extraordinary: a foreground animal. A lone acacia silhouetted against an orange sky is beautiful. Add a single giraffe and it becomes iconic. Always look for opportunities to frame a landscape with a living element — a herd in the distance, a bird on a branch, an elephant against a thundercloud. Shoot exclusively at dawn and dusk. Midday African light is harsh, flat, and unflattering — use those hours for lunch, rest, and reviewing your images.</p>

<h2>Vehicle Setup for Photographers</h2>
<p>The vehicle you ride in determines 60% of your photographic success. When booking with us, mention that you're a photographer. Here's what matters:</p>
<ul>
<li><strong>Pop-up roof:</strong> Essential. Side-window vehicles severely limit your shooting angles. Our 4x4 Land Cruisers have pop-up roofs with 360-degree rotation. Stand up, rest your beanbag on the rim, and shoot in any direction.</li>
<li><strong>Seating position:</strong> Sit in the middle row for roof access. The front passenger seat (next to the driver) seems like the premium spot but doesn't have roof hatch access on most safari vehicles.</li>
<li><strong>Maximum 4 guests per vehicle:</strong> This gives everyone a window and roof position. Six passengers in a vehicle means constant jostling and blocked angles. We cap our photography-focused safaris at 4 per vehicle.</li>
<li><strong>Dark cloth:</strong> Bring a dark-coloured scarf or bandana. Drape it over your lens and the vehicle frame to eliminate reflections in side windows and reduce glare on your LCD screen.</li>
</ul>

<h2>Tell Your Guide You're a Photographer</h2>
<p>This is the single most important piece of advice in this article. A good Tanzanian safari guide who knows you're serious about photography will:</p>
<ul>
<li><strong>Position the vehicle with the sun behind you</strong> — front-lit subjects with clean catchlights in the eyes</li>
<li><strong>Wait at sightings longer</strong> — a regular tourist guide moves on after 10 minutes; a photography-aware guide will sit for an hour</li>
<li><strong>Turn off the engine</strong> to eliminate vibration</li>
<li><strong>Know the best locations for specific light conditions</strong> — which kopje catches golden hour, which waterhole faces east for morning light</li>
<li><strong>Communicate with other guides</strong> to find subjects before you arrive, giving you time to prepare settings</li>
</ul>
<p>Our guides at Snow Africa Adventure have worked with professional photographers from National Geographic, BBC Wildlife, and various photography tour operators. They understand composition, light direction, and patience. Tell us you're a photographer when you book, and we'll assign a guide who speaks your language.</p>

<h2>Editing in the Field</h2>
<p>After a full day of shooting, you'll have 500-2,000 images. Managing them matters.</p>

<h3>Backup Strategy</h3>
<p>Always shoot on two memory cards if your camera has dual slots — one as primary, one as backup. At the end of each day, back up to a portable SSD (Samsung T7 or SanDisk Extreme are popular among our guests). We've seen three memory cards fail in the field over the years — every one of those photographers lost the entire day because they had no backup.</p>

<h3>Laptop vs Tablet</h3>
<p>A laptop (MacBook Air is the most common choice) lets you run Lightroom, do basic editing, and cull images properly. An iPad with Lightroom Mobile is lighter and works well for reviewing and starring your best shots. The decision depends on whether you want to edit during the trip or wait until you're home. Our recommendation: bring the iPad, do basic culling each evening, save serious editing for home.</p>

<h3>Cloud Upload</h3>
<p>Most safari lodges and tented camps have Wi-Fi, but it's often slow — 1-5 Mbps on a good day. Uploading hundreds of RAW files is impractical. Upload your 10-20 best JPEGs daily to the cloud as insurance. iCloud, Google Photos, and Dropbox all have automatic upload features. Don't rely on camp Wi-Fi as your backup strategy — it's supplementary at best.</p>

<h2>Photography Safaris vs Regular Safaris</h2>
<p>A regular safari and a photography safari visit the same parks but operate differently. Photography-specific departures feature:</p>
<ul>
<li><strong>Dedicated photo vehicles</strong> with camera mounts, bean bag rails, and sometimes vehicle-mounted hides</li>
<li><strong>Flexible scheduling</strong> — you stay at sightings as long as the light is good, not until the group gets restless</li>
<li><strong>Photographer guides</strong> who understand composition, exposure, and can advise on settings</li>
<li><strong>Small groups</strong> — typically 3-4 guests maximum</li>
<li><strong>Early departures and late returns</strong> — you leave camp at first light and come back after sunset, maximising golden hour time</li>
</ul>
<p>We arrange dedicated photography safaris on request. These cost 15-25% more than regular safaris due to the smaller group sizes and specialised guides, but the difference in photographic output is dramatic. Contact us with your dates and experience level, and we'll design an itinerary optimised for your camera.</p>

<h2>Ethical Wildlife Photography</h2>
<p>A few non-negotiable rules that protect the animals and your reputation:</p>
<ul>
<li><strong>Never use flash.</strong> Flash disturbs nocturnal animals and can temporarily blind them. It's also prohibited in all Tanzanian national parks.</li>
<li><strong>Don't pressure your guide to get closer.</strong> Minimum approach distances exist for a reason — stressed animals change behaviour, abandon kills, and in extreme cases, charge vehicles. A respectful distance with a long lens always produces better images than a panicked close-up.</li>
<li><strong>Never bait animals.</strong> Throwing food or using calls to attract wildlife is illegal in Tanzanian parks and ecologically harmful.</li>
<li><strong>Silence is golden.</strong> Turn off your phone sounds, speak in whispers, and avoid sudden movements. Animals that feel safe produce natural behaviour — which is what makes a photograph extraordinary.</li>
<li><strong>Share the sighting.</strong> If other vehicles are waiting, don't monopolise the best position for 30 minutes. Rotate. The bush code of conduct makes the whole experience better for everyone.</li>
</ul>

<h2>What We Recommend for First-Timers</h2>
<p>If you're heading on your first <a href="/tanzania-safaris/">Tanzania safari</a> and want good photos without paralysis by equipment choice:</p>
<ul>
<li><strong>Bring your phone + one dedicated camera</strong> (mirrorless or DSLR) with a 100-400mm lens</li>
<li><strong>Pack a beanbag</strong> — it costs $20 and improves your hit rate by 50%</li>
<li><strong>Shoot in aperture priority mode</strong> with auto-ISO. Set your minimum shutter speed to 1/1000s. The camera handles the rest.</li>
<li><strong>Focus on moments, not megapixels.</strong> A lion yawning at sunrise beats a tack-sharp portrait of a sleeping lion every time.</li>
<li><strong>Bring twice the memory cards you think you need.</strong> We've never had a guest say they brought too many.</li>
</ul>
<p>Read our <a href="/tanzania-safari-packing-list/">complete packing list</a> for the full safari gear breakdown, and check the <a href="/best-time-safari-tanzania/">best time to visit</a> to align your trip with the most photogenic seasons.</p>

<h2>Frequently Asked Questions</h2>

<h3>What camera gear do I need for a Tanzania safari?</h3>
<p>At minimum, a camera with a 100-400mm zoom lens and a beanbag for stabilisation. Smartphones with 5x+ optical zoom (iPhone 15 Pro, Samsung S24 Ultra) produce surprisingly good safari images. For serious photography, a mirrorless body (Sony A7 IV, Canon R6 II) with a 100-400mm and a 70-200mm f/2.8 covers 90% of situations.</p>

<h3>Is a beanbag really better than a tripod on safari?</h3>
<p>Absolutely. Tripods can't be set up in a vehicle, and you spend 95% of your safari shooting from inside a Land Cruiser. A beanbag moulds to the vehicle door frame or roof hatch, absorbs engine vibration, and provides rock-solid support. It weighs under 1 kg and costs $15-$40. It's the single best investment for safari photography.</p>

<h3>Which Tanzania park is best for wildlife photography?</h3>
<p>The Serengeti for variety and golden light, Ngorongoro Crater for close-range encounters and wide-angle habitat shots, and Tarangire for iconic elephant-and-baobab compositions. A 5-day safari covering all three is the ideal photography itinerary. Each park offers completely different photographic opportunities.</p>

<h3>What camera settings should I use on safari?</h3>
<p>Start with aperture priority (A/Av mode), auto ISO with a 6400 maximum, and a minimum shutter speed of 1/1000s. For action (running predators, birds in flight), switch to shutter priority at 1/2000s-1/4000s. Use continuous autofocus with animal eye-tracking if your camera supports it. Shoot RAW for maximum editing flexibility.</p>

<h3>Can I take good safari photos with just a smartphone?</h3>
<p>Yes. The iPhone 15 Pro (5x zoom) and Samsung Galaxy S24 Ultra (10x zoom) capture excellent safari images at close-to-medium range (up to 30-40 metres). Use burst mode for action, clean your lens regularly, shoot in RAW, and avoid digital zoom past 10x. Your smartphone won't replace a dedicated camera for distant or low-light subjects, but it will surprise you with what it can do.</p>

<h3>How do I photograph birds on safari?</h3>
<p>You need reach — a 200-600mm lens is ideal. Set shutter speed to 1/2000s minimum (1/4000s for flight shots), use continuous autofocus with the widest AF area, and shoot in burst mode. Anticipate takeoff by watching for pre-flight behaviour: crouching, wing spreading, head turning. Lilac-breasted rollers and crowned cranes are the most photogenic and cooperative species. Lake Manyara is the best park for bird photography in the northern circuit.</p>

<h3>What is a photography safari and how is it different?</h3>
<p>A photography safari uses dedicated photo vehicles (camera mounts, beanbag rails), limits group size to 3-4, employs photography-trained guides who understand light and composition, and follows a flexible schedule dictated by light conditions rather than a fixed timetable. They cost 15-25% more than regular safaris but produce dramatically better photographic results.</p>

<h3>How do I protect my camera gear from dust on safari?</h3>
<p>Dust is the biggest threat to camera equipment on safari. Keep gear in a padded camera bag when not shooting. Use a rain cover or even a plastic bag over your lens between sightings. Change lenses inside the vehicle with windows closed. Clean your sensor every evening with a blower (not compressed air). Bring a microfibre cloth for the front element. A UV or clear filter on your lens protects the front element from scratches and dust abrasion.</p>

<h3>Should I bring a drone for safari photography?</h3>
<p>No. Drones are prohibited in all Tanzanian national parks and conservation areas (Serengeti, Ngorongoro, Tarangire, Lake Manyara). Flying a drone will result in confiscation of the drone, a significant fine, and potential arrest. The ban exists because drones disturb wildlife, particularly birds and nesting animals. Leave it at home.</p>

<h3>What is the best time of year for safari photography in Tanzania?</h3>
<p>June-October (dry season) offers the <a href="/best-time-safari-tanzania/">best photography conditions</a>: clear skies, golden grass, animals concentrated at water sources, and the Great Migration in the northern Serengeti. January-March is excellent for calving season action and green-season landscapes with dramatic storm clouds. The light is good year-round, but dry season delivers more reliable conditions.</p>

<h3>How many photos should I expect to take on safari?</h3>
<p>Serious photographers shoot 500-2,000 images per day on safari. Over a 5-day trip, expect 3,000-10,000 photos. Bring at least 128 GB of memory card storage (we recommend 256 GB+), and back up to a portable SSD every evening. Battery-wise, bring 3 batteries minimum for mirrorless cameras (they drain faster than DSLRs) or 2 for DSLRs.</p>

<h3>Can I charge camera batteries at safari lodges and camps?</h3>
<p>All lodges and most permanent tented camps have charging facilities — either in-room sockets or a central charging station. Basic bush camps and mobile camps may run on solar or generators that operate limited hours (typically 6-10 PM). Bring a multi-plug adapter (UK 3-pin is the Tanzania standard) and charge every battery every night regardless. A car charger for your vehicle's 12V socket is useful backup.</p>
`;

async function main() {
  console.log("Seeding safari blog posts (batch 41b)...");

  // ── Category ──────────────────────────────────────────────────────────────
  const category = await prisma.category.upsert({
    where: { slug: "safari" },
    update: { name: "Safari" },
    create: { slug: "safari", name: "Safari" },
  });
  console.log(`Category: ${category.name} (${category.id})`);

  // ── Tags ──────────────────────────────────────────────────────────────────
  const tagZanzibar = await prisma.tag.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });

  const tagTanzaniaSafari = await prisma.tag.upsert({
    where: { slug: "tanzania-safari" },
    update: { name: "Tanzania Safari" },
    create: { slug: "tanzania-safari", name: "Tanzania Safari" },
  });

  const tagSafariBeach = await prisma.tag.upsert({
    where: { slug: "safari-beach" },
    update: { name: "Safari Beach" },
    create: { slug: "safari-beach", name: "Safari Beach" },
  });

  const tagTravelPlanning = await prisma.tag.upsert({
    where: { slug: "travel-planning" },
    update: { name: "Travel Planning" },
    create: { slug: "travel-planning", name: "Travel Planning" },
  });

  const tagWildlifePhotography = await prisma.tag.upsert({
    where: { slug: "wildlife-photography" },
    update: { name: "Wildlife Photography" },
    create: { slug: "wildlife-photography", name: "Wildlife Photography" },
  });

  const tagSafariTips = await prisma.tag.upsert({
    where: { slug: "safari-tips" },
    update: { name: "Safari Tips" },
    create: { slug: "safari-tips", name: "Safari Tips" },
  });

  const tagPhotography = await prisma.tag.upsert({
    where: { slug: "photography" },
    update: { name: "Photography" },
    create: { slug: "photography", name: "Photography" },
  });

  console.log("Tags upserted.");

  // ── Post 1: Safari and Zanzibar Combo ─────────────────────────────────────
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-safari-combo" },
    update: {
      title: "Safari and Zanzibar: The Ultimate Tanzania Combo Trip",
      metaTitle: "Safari & Zanzibar Combo Trip | Complete Guide 2026",
      metaDescription:
        "Plan the perfect safari and Zanzibar combo trip. Flight logistics, best beaches, itineraries from 7-14 days, costs, and insider tips from our team in Moshi.",
      excerpt:
        "Tanzania is one of the few countries where world-class wildlife and tropical beaches exist side by side. Here's exactly how to combine a northern circuit safari with a Zanzibar beach holiday — logistics, timing, costs, and our tested itineraries.",
      content: zanzibarComboContent,
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
    },
    create: {
      slug: "zanzibar-safari-combo",
      title: "Safari and Zanzibar: The Ultimate Tanzania Combo Trip",
      metaTitle: "Safari & Zanzibar Combo Trip | Complete Guide 2026",
      metaDescription:
        "Plan the perfect safari and Zanzibar combo trip. Flight logistics, best beaches, itineraries from 7-14 days, costs, and insider tips from our team in Moshi.",
      excerpt:
        "Tanzania is one of the few countries where world-class wildlife and tropical beaches exist side by side. Here's exactly how to combine a northern circuit safari with a Zanzibar beach holiday — logistics, timing, costs, and our tested itineraries.",
      content: zanzibarComboContent,
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });
  console.log(`Post 1 upserted: ${post1.slug} (${post1.id})`);

  // Link post 1 to category
  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});

  // Link post 1 to tags
  for (const tag of [tagZanzibar, tagTanzaniaSafari, tagSafariBeach, tagTravelPlanning]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("Post 1 linked to category and tags.");

  // ── Post 2: Photography Safari Tanzania ───────────────────────────────────
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "photography-safari-tanzania" },
    update: {
      title: "Photography Safari Tanzania: Capture Africa's Greatest Wildlife",
      metaTitle: "Photography Safari Tanzania | Expert Camera Guide",
      metaDescription:
        "Expert photography safari guide for Tanzania. Camera gear, best parks, shooting techniques by subject, vehicle setup, and ethical wildlife photography tips.",
      excerpt:
        "From smartphones to professional DSLR rigs, this is everything we know about photographing Tanzania's wildlife after years of guiding photographers through the Serengeti, Ngorongoro, and Tarangire.",
      content: photographyContent,
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
    },
    create: {
      slug: "photography-safari-tanzania",
      title: "Photography Safari Tanzania: Capture Africa's Greatest Wildlife",
      metaTitle: "Photography Safari Tanzania | Expert Camera Guide",
      metaDescription:
        "Expert photography safari guide for Tanzania. Camera gear, best parks, shooting techniques by subject, vehicle setup, and ethical wildlife photography tips.",
      excerpt:
        "From smartphones to professional DSLR rigs, this is everything we know about photographing Tanzania's wildlife after years of guiding photographers through the Serengeti, Ngorongoro, and Tarangire.",
      content: photographyContent,
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });
  console.log(`Post 2 upserted: ${post2.slug} (${post2.id})`);

  // Link post 2 to category
  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});

  // Link post 2 to tags
  for (const tag of [tagWildlifePhotography, tagTanzaniaSafari, tagSafariTips, tagPhotography]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("Post 2 linked to category and tags.");

  console.log("\nDone! 2 safari blog posts seeded successfully.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
