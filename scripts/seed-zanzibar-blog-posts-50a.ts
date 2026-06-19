import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const soloTravelContent = `
<p>Zanzibar is one of the best solo travel destinations in East Africa — small enough to navigate easily, safe enough to explore independently, and social enough that you'll never feel isolated. Whether you're backpacking on $40 a day or treating yourself to a boutique hotel on the beach, the island rewards solo visitors with a mix of cultural depth, natural beauty, and the kind of spontaneous encounters that only happen when you're on your own. Here's everything you need to know.</p>

<h2>Is Zanzibar Safe for Solo Travellers?</h2>
<p>Yes — Zanzibar is one of the safest destinations in East Africa for solo travellers. Violent crime against tourists is rare. The main risks are the same as any tropical island destination: petty theft, overcharging, and beach boy hassle.</p>

<h3>Safety by Area</h3>
<table>
<thead><tr><th>Area</th><th>Safety Level</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Stone Town</td><td>Generally safe</td><td>Narrow alleys can feel disorienting at night. Stick to main routes after dark. Keep valuables out of sight.</td></tr>
<tr><td>Nungwi</td><td>Very safe</td><td>Tourist-heavy, well-lit beach strip. Good for solo socializing. Some beach boy persistence.</td></tr>
<tr><td>Kendwa</td><td>Very safe</td><td>Small, resort-dominated. Very relaxed. Good for solo travellers who want peace.</td></tr>
<tr><td>Paje</td><td>Very safe</td><td>Backpacker-friendly kite surfing hub. Social hostels. Easy to meet people.</td></tr>
<tr><td>Jambiani</td><td>Safe</td><td>Quieter, more local. Good for cultural immersion. Fewer tourists to connect with.</td></tr>
<tr><td>Matemwe</td><td>Safe</td><td>Remote east coast. Peaceful but limited dining/socializing options outside your hotel.</td></tr>
</tbody>
</table>

<h3>Essential Safety Tips</h3>
<ul>
<li><strong>Don't walk on empty beaches at night</strong> — this is the #1 safety rule. Even popular beaches like Nungwi are best avoided after dark unless you're at a beach bar.</li>
<li><strong>Use taxis at night in Stone Town</strong> — the alleys are a maze and poorly lit. Your hotel can call a reliable driver.</li>
<li><strong>Keep valuables locked up</strong> — use your hotel safe. Don't carry your passport, extra cash, or expensive jewellery while exploring.</li>
<li><strong>Dress modestly in Stone Town and villages</strong> — shoulders and knees covered (both men and women). Beachwear is fine at the beach but not in town.</li>
<li><strong>Negotiate prices before services</strong> — boat trips, spice tours, taxis. Agree on price before you get in or set off.</li>
<li><strong>Trust your instincts</strong> — if something feels off, it probably is. Zanzibar is friendly, but not every friendly approach is genuine.</li>
</ul>

<h2>Solo Travel for Women</h2>
<p>Zanzibar receives thousands of solo female travellers every year. It's generally safe, but there are specific dynamics to be aware of.</p>
<p><strong>Beach boys:</strong> Young men who hang around tourist beaches offering tours, boat trips, spice tours, and sometimes romantic companionship. They can be persistent but are rarely threatening. A firm "no thank you" repeated 2-3 times usually works. Don't engage in long conversations if you're not interested — it's interpreted as an opening.</p>
<p><strong>Dress code:</strong> Zanzibar is 95% Muslim. In Stone Town, Jambiani, and villages, covering shoulders and knees is expected. On tourist beaches (Nungwi, Kendwa, Paje), bikinis and beachwear are normal. The contrast is stark — pack both modest clothes and swimwear.</p>
<p><strong>Accommodation:</strong> Choose well-reviewed hotels with good security. Many solo female travellers recommend Paje for its social hostel scene and Kendwa for its resort safety. Stone Town is best in a reputable hotel within the central tourist zone.</p>
<p><strong>Evening activities:</strong> Rooftop bars in Stone Town (Africa House, Emerson Spice) are comfortable for solo women. <a href="/zanzibar-nightlife-guide/">Nungwi's beach bars</a> are social and generally safe. Avoid walking alone on beaches or through dark alleys at night.</p>

<h2>Best Areas for Solo Travellers</h2>

<h3>Paje — Best for Social Backpackers</h3>
<p>Paje is Zanzibar's unofficial solo traveller headquarters. The kite surfing community creates a ready-made social scene: international, active, and welcoming. Hostels like Paje by Night have communal areas where meeting people is effortless. The beach is stunning, there are affordable restaurants, and the vibe is young and relaxed.</p>
<p><strong>Best for:</strong> Budget travellers, kite surfers, solo travellers who want to meet people easily.<br>
<strong>Budget:</strong> $15-$25/night (hostel dorm), $30-$60/night (private room).<br>
<strong>Solo score:</strong> 9/10 — it's hard to be lonely in Paje.</p>

<h3>Stone Town — Best for Culture Seekers</h3>
<p>If you came to Zanzibar for <a href="/zanzibar-history-guide/">history</a>, architecture, and cultural immersion, Stone Town is where you should base yourself. The UNESCO World Heritage labyrinth of alleys, markets, and mosques is endlessly explorable on foot. Walking tours, <a href="/zanzibar-spice-tour-guide/">spice tours</a>, and the <a href="/zanzibar-food-guide/">Forodhani night food market</a> are all easy to do solo.</p>
<p><strong>Best for:</strong> Culture lovers, history buffs, food enthusiasts, photographers.<br>
<strong>Budget:</strong> $20-$40/night (budget hotel), $60-$150/night (boutique).<br>
<strong>Solo score:</strong> 7/10 — rich experience but less social than Paje or Nungwi.</p>

<h3>Nungwi — Best for Beach + Socializing</h3>
<p>Nungwi combines <a href="/zanzibar-best-beaches/">beautiful beaches</a> with a social bar scene. It's more developed and touristy than Paje, with a wider range of restaurants and activities. The sunset dhow cruises are popular with solo travellers, and the beach bars (Z Bar, Cholo's) are easy places to strike up conversation.</p>
<p><strong>Best for:</strong> Solo travellers who want beach + nightlife + activities.<br>
<strong>Budget:</strong> $25-$50/night (mid-range), $80-$200/night (resort).<br>
<strong>Solo score:</strong> 8/10 — social, safe, and with plenty to do.</p>

<h2>Solo Travel Budget Breakdown</h2>
<table>
<thead><tr><th>Category</th><th>Budget ($30-$50/day)</th><th>Mid-Range ($60-$120/day)</th><th>Comfort ($120-$250/day)</th></tr></thead>
<tbody>
<tr><td>Accommodation</td><td>Hostel dorm $10-$20</td><td>Private room $30-$60</td><td>Boutique hotel $80-$150</td></tr>
<tr><td>Food</td><td>Local restaurants $8-$15</td><td>Mix local + tourist $15-$30</td><td>Hotel restaurants $30-$50</td></tr>
<tr><td>Transport</td><td>Dalla dalla (local bus) $0.50-$1</td><td>Shared taxi $5-$15</td><td>Private taxi $15-$30</td></tr>
<tr><td>Activities</td><td>Beach + walking $0-$10</td><td>1 activity/day $20-$40</td><td>Premium activities $40-$80</td></tr>
</tbody>
</table>
<p>See our full <a href="/zanzibar-budget-travel/">budget guide</a> for detailed cost breakdowns.</p>

<h2>Best Solo Activities</h2>

<h3>Activities You Can Do Alone</h3>
<ul>
<li><strong>Stone Town walking tour</strong> — Join a group tour ($15-$25) or wander solo with a guidebook. The alleys are the attraction.</li>
<li><strong>Spice tour</strong> — Half-day group tour ($20-$30). You'll be with other visitors. Easy to book through your hotel.</li>
<li><strong>Forodhani night market</strong> — Wander, eat, watch the sunset. Perfectly comfortable solo.</li>
<li><strong>Jozani Forest</strong> — Red colobus monkey habitat. Guided tours run regularly ($12-$15). You'll join a group.</li>
<li><strong>Kite surfing lessons</strong> — Paje has multiple schools. Lessons are individual ($60-$80/session). Great way to meet other travellers.</li>
<li><strong>Prison Island boat trip</strong> — Group boats leave from Stone Town ($25-$35). Giant tortoises, snorkelling, and easy socializing.</li>
<li><strong>Mnemba Island snorkelling</strong> — Group boat trips from Nungwi ($30-$45). You'll be with other tourists.</li>
<li><strong>Sunset dhow cruise</strong> — Group or private from Nungwi or Stone Town ($15-$30). Romantic for couples but equally enjoyable solo.</li>
</ul>

<h3>Activities Better with Company</h3>
<ul>
<li><strong>Private boat hire</strong> — Expensive solo ($150-$300). Find other travellers to split the cost.</li>
<li><strong>Safari Blue day trip</strong> — Group trip but the per-person cost ($80-$100) doesn't change solo vs couple.</li>
<li><strong>Diving</strong> — <a href="/zanzibar-diving-guide/">Dive centres</a> run group trips. PADI courses pair you with other students.</li>
</ul>

<h2>Meeting Other Travellers</h2>
<ul>
<li><strong>Hostels</strong> — Paje by Night, Lost & Found (Stone Town), Jambo (Nungwi). Social by design.</li>
<li><strong>Kite schools</strong> — The kite surfing community in Paje is tight-knit and welcoming.</li>
<li><strong>Cooking classes</strong> — Several Stone Town restaurants offer Zanzibari cooking classes ($25-$40). Small groups, conversational.</li>
<li><strong>Full Moon party</strong> — Kendwa Rocks' monthly party is the easiest place to meet people on the island.</li>
<li><strong>Group tours</strong> — Spice tours, snorkelling trips, and walking tours automatically put you with other visitors.</li>
<li><strong>Beach bars at sunset</strong> — Africa House (Stone Town), Z Bar (Nungwi). Sit at the bar, not a table.</li>
</ul>

<h2>Practical Tips for Solo Travellers</h2>
<ul>
<li><strong>SIM card:</strong> Buy a Vodacom or Airtel SIM at the airport ($5-$10 with data). Essential for maps, translation, and emergency contact.</li>
<li><strong>Cash:</strong> Zanzibar runs on cash. ATMs exist in Stone Town and Nungwi but not everywhere. Carry enough ($50-$100/day in small bills).</li>
<li><strong>Transport:</strong> Dalla dallas (local minibuses) are cheap ($0.50-$1) but chaotic. Taxis are safer and more reliable ($15-$30 between major areas).</li>
<li><strong>WhatsApp:</strong> Everything in Zanzibar is organized via WhatsApp — hotel bookings, tour guides, taxi drivers. Save useful numbers.</li>
<li><strong>Language:</strong> Basic Swahili goes a long way: "Jambo" (hello), "Asante" (thank you), "Habari?" (how are you?), "Pole pole" (slowly, gently). English is widely spoken in tourist areas.</li>
<li><strong>Power:</strong> Zanzibar uses UK-style three-pin plugs (Type G). Bring an adapter. Power outages happen — carry a portable charger.</li>
<li><strong>Water:</strong> Don't drink tap water. Bottled water is cheap ($0.50-$1). Stay hydrated — the equatorial heat is deceptive.</li>
</ul>

<h2>Sample Solo Itineraries</h2>

<h3>5 Days — Culture + Beach (Budget: $200-$350)</h3>
<p><strong>Days 1-2:</strong> Stone Town — walking tour, slave market memorial, Forodhani night market, rooftop sunset.<br>
<strong>Day 3:</strong> Spice tour morning, transfer to Paje afternoon.<br>
<strong>Days 4-5:</strong> Paje — beach, kite surfing lesson, meet travellers at hostel, explore Jambiani village.</p>

<h3>7 Days — Complete Solo Experience (Budget: $400-$700)</h3>
<p><strong>Days 1-2:</strong> Stone Town — cultural immersion, history, food.<br>
<strong>Day 3:</strong> Jozani Forest + transfer to Paje.<br>
<strong>Days 4-5:</strong> Paje — kite surfing, beach, socializing.<br>
<strong>Day 6:</strong> Transfer to Nungwi, Mnemba snorkelling, sunset drinks.<br>
<strong>Day 7:</strong> Nungwi beach day, departure.</p>

<h3>10 Days — Deep Dive (Budget: $600-$1,200)</h3>
<p><strong>Days 1-3:</strong> Stone Town — walking tours, spice tour, cooking class, Forodhani, <a href="/zanzibar-things-to-do/">Prison Island</a>.<br>
<strong>Days 4-5:</strong> Jambiani — local village life, seaweed farming, quiet beaches.<br>
<strong>Days 6-7:</strong> Paje — kite surfing, social scene, east coast exploring.<br>
<strong>Days 8-9:</strong> Nungwi — beach, snorkelling, <a href="/zanzibar-nightlife-guide/">sunset bars</a>, dhow cruise.<br>
<strong>Day 10:</strong> Kendwa morning, departure.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Zanzibar good for solo travellers?</h3>
<p>Yes — it's one of the best solo destinations in East Africa. The island is small and easy to navigate, there's a well-established backpacker scene (especially in Paje), and group activities (tours, diving, kite surfing) make it easy to meet people. Solo travellers of all ages and budgets visit successfully.</p>

<h3>Is Zanzibar safe for solo female travellers?</h3>
<p>Yes, with normal precautions. Thousands of solo women visit Zanzibar every year. The main annoyance is beach boy attention — persistent but rarely threatening. Stay in well-reviewed accommodation, don't walk on empty beaches at night, dress modestly in Stone Town and villages, and trust your instincts.</p>

<h3>What's the best area for solo travellers in Zanzibar?</h3>
<p>Paje for social backpackers and kite surfers. Nungwi for beach + nightlife. Stone Town for culture and history. Each has a distinct character — choose based on what matters most to you. Many solo travellers split their time between two or three areas.</p>

<h3>How much does a solo trip to Zanzibar cost?</h3>
<p>Budget: $30-$50/day (hostel, local food, dalla dalla transport, free beach time). Mid-range: $60-$120/day (private room, mix of local and tourist restaurants, one paid activity per day). Comfortable: $120-$250/day (boutique hotel, good restaurants, premium activities). Flights from Dar es Salaam are $60-$120 return; the ferry is $35 each way.</p>

<h3>Will I feel lonely travelling solo in Zanzibar?</h3>
<p>Unlikely — unless you actively seek solitude (Jambiani, Matemwe). Paje's hostels and Nungwi's beach bars are built for socializing. Group tours (spice, snorkelling, walking) put you with other travellers automatically. The Full Moon party at Kendwa is impossible to feel alone at.</p>

<h3>Do I need to book tours in advance?</h3>
<p>For most activities, no — you can book through your hotel 1-2 days before (or same-day for popular tours). Exception: PADI dive courses should be booked a few days ahead. The Full Moon party doesn't need booking. During peak season (July-August, December-January), popular hotels should be booked in advance.</p>

<h3>How do I get from the airport to my hotel?</h3>
<p>Most hotels offer airport transfers ($15-$40 depending on distance). Otherwise, taxis wait outside the airport. Negotiate before getting in: Stone Town $15-$20, Nungwi $35-$45, Paje $30-$40. There are no ride-hailing apps in Zanzibar.</p>

<h3>Is it easy to combine Zanzibar with a safari?</h3>
<p>Very easy — it's the classic <a href="/zanzibar-safari-combo/">Tanzania combo</a>. Fly Arusha/Kilimanjaro → Zanzibar (1.5 hours) or Dar es Salaam → Zanzibar (20 minutes flight / 2 hours ferry). Most travellers do safari first, then Zanzibar for beach recovery.</p>

<h3>What should I pack for solo travel in Zanzibar?</h3>
<p>Light, breathable clothing. Modest outfits for Stone Town/villages (covering shoulders and knees). Swimwear for beaches. Reef shoes for rocky shores. Sunscreen (expensive on the island). Insect repellent. A good padlock for hostel lockers. Portable charger. Universal adapter (UK-style plugs).</p>

<h3>Can I use credit cards in Zanzibar?</h3>
<p>Large hotels and some restaurants accept cards, but Zanzibar is primarily a cash economy. ATMs are available in Stone Town and Nungwi (Barclays, CRDB) but can be unreliable. Bring USD as backup — widely accepted and easy to exchange. Small bills ($1, $5, $10) are useful for day-to-day expenses.</p>
`;

const photographyContent = `
<p>Zanzibar is absurdly photogenic — turquoise water, white sand, spice-coloured sunsets, carved wooden doors, dhow sails against the horizon, and Stone Town's layered textures of coral stone, rust, and peeling paint. Whether you're shooting on a phone or a full-frame mirrorless, here's how to capture the island at its best.</p>

<h2>Best Photography Locations</h2>

<h3>Stone Town</h3>
<p>The most photographically rich square kilometre in East Africa. Every alley reveals a composition: carved doorways (over 500 in the old town, each unique), laundry hanging between coral stone walls, children playing in golden light, cats on windowsills, fruit vendors, minarets against blue sky.</p>
<ul>
<li><strong>Best time:</strong> Early morning (6:30-8:00am) for soft light and empty alleys. Late afternoon (4:00-6:00pm) for golden light penetrating the narrow streets.</li>
<li><strong>Top spots:</strong> The carved doors along Kenyatta Road. The waterfront with dhows at sunset. The Old Fort exterior. The narrow alleys behind the Anglican Cathedral. The Darajani Market (indoor market — arrive early for the fish auction).</li>
<li><strong>What to shoot:</strong> Details (door carvings, brass studs, iron chains). Street life (vendors, children, cats). Architecture (mashrabiya balconies, coral stone textures). The contrast between decay and beauty.</li>
<li><strong>Tips:</strong> Ask before photographing people. Most are happy to be photographed but it's respectful to ask. A "Jambo! Picha?" (Hello! Photo?) with a smile usually gets a yes. Some vendors expect a small tip ($0.50-$1) for photos — fair exchange.</li>
</ul>

<h3>Beaches</h3>
<p>Zanzibar's <a href="/zanzibar-best-beaches/">beaches</a> are among the most photogenic in the Indian Ocean. The key is timing — the tidal range on the east coast is massive (up to 4 metres), completely transforming the landscape twice a day.</p>
<ul>
<li><strong>Nungwi:</strong> Best for sunset photos. The beach faces west, so the sun drops directly into the ocean. Dhow silhouettes at golden hour are the classic shot. Best position: near the lighthouse (southern end of the beach).</li>
<li><strong>Paje:</strong> Best for kite surfing action shots and tidal flat reflections. At low tide, the exposed sand creates mirror-like pools. Shoot from the beach looking east for morning light.</li>
<li><strong>Kendwa:</strong> Similar sunset to Nungwi but with a cleaner beach (no rocks). Good for minimalist seascape compositions.</li>
<li><strong>Jambiani:</strong> Best for local life shots — seaweed farmers working the tidal flats, fishermen launching boats, children playing in shallow water. More authentic, less posed.</li>
<li><strong>Michamvi Peninsula:</strong> Dramatic rocky coastline on the southeast tip. Good for long exposures with waves crashing on coral rock.</li>
</ul>

<h3>Dhow Boats</h3>
<p>The traditional wooden sailing boats (dhows) are Zanzibar's visual signature. They're everywhere — but the best photography opportunities are:</p>
<ul>
<li><strong>Stone Town waterfront at sunset:</strong> Multiple dhows moored and sailing, backlit by the setting sun. Classic silhouette territory.</li>
<li><strong>Nungwi harbour:</strong> Dhow builders at work (morning). Active fishing dhows launching and returning.</li>
<li><strong>Jambiani at dawn:</strong> Fishermen setting out in dhows against a pastel sky. Arrive by 6:00am.</li>
</ul>

<h3>Spice Farms</h3>
<p>The interior of the island is lush, green, and full of macro photography opportunities. <a href="/zanzibar-spice-tour-guide/">Spice tours</a> give you access to working farms where you can photograph:</p>
<ul>
<li>Clove, cinnamon, cardamom, nutmeg, and vanilla plants up close</li>
<li>Farm workers harvesting and processing spices</li>
<li>Tropical fruit (jackfruit, breadfruit, starfruit) on the tree</li>
<li>Lush jungle paths and canopy light</li>
</ul>
<p><strong>Lens choice:</strong> A macro lens (or macro mode on phone) is essential for spice detail shots. A wide-angle captures the farm environment.</p>

<h3>Jozani Forest</h3>
<p>Home to the endangered red colobus monkey — a Zanzibar endemic species found nowhere else on earth. The monkeys are habituated to humans and will approach closely, making them relatively easy to photograph.</p>
<ul>
<li><strong>Best time:</strong> Early morning (forest opens at 7:30am). Monkeys are most active and the light filtering through the canopy is beautiful.</li>
<li><strong>Tips:</strong> Use a telephoto or zoom (70-200mm equivalent). Don't use flash — it distresses the monkeys. Shoot at high ISO if needed — forest light is dim. Focus on the eyes.</li>
<li><strong>What else:</strong> The mangrove boardwalk behind the main forest is excellent for atmospheric wide shots.</li>
</ul>

<h2>Camera Settings & Techniques</h2>

<h3>Tropical Light Challenges</h3>
<p>Zanzibar sits 6 degrees south of the equator. The light is intense, high-contrast, and can be harsh between 10am and 3pm. This means:</p>
<ul>
<li><strong>Golden hour is king:</strong> 6:00-7:30am and 5:00-6:30pm. The equatorial sun rises and sets fast — you have about 30 minutes of truly golden light, not the 90 minutes you'd get at higher latitudes.</li>
<li><strong>Midday:</strong> Seek shade. Stone Town's alleys are ideal for midday shooting because the narrow streets block direct sun and create dramatic light shafts.</li>
<li><strong>Expose for highlights:</strong> In bright sun, it's easier to recover shadow detail than blown highlights. Underexpose by 1/3 to 2/3 stop on bright beach days.</li>
<li><strong>Polarising filter:</strong> Essential for beach and ocean photography. It cuts glare, deepens the blue sky, and reveals the turquoise colour of the water that your eye sees but the camera doesn't capture without it.</li>
</ul>

<h3>Recommended Settings</h3>
<table>
<thead><tr><th>Scenario</th><th>Mode</th><th>Aperture</th><th>ISO</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Beach/ocean</td><td>A/Av</td><td>f/8-f/11</td><td>100-200</td><td>Polariser on. Expose for sky.</td></tr>
<tr><td>Sunset silhouettes</td><td>M</td><td>f/8</td><td>100</td><td>Meter off the sky, not the subject.</td></tr>
<tr><td>Stone Town alleys</td><td>A/Av</td><td>f/4-f/5.6</td><td>400-800</td><td>High enough ISO for sharp handheld in shade.</td></tr>
<tr><td>Door details</td><td>A/Av</td><td>f/5.6-f/8</td><td>200-400</td><td>Focus on carved details. Step back for context.</td></tr>
<tr><td>Market scenes</td><td>A/Av</td><td>f/2.8-f/4</td><td>800-1600</td><td>Indoor markets are dark. Wide aperture needed.</td></tr>
<tr><td>Wildlife (monkeys)</td><td>S/Tv</td><td>Auto</td><td>Auto (max 3200)</td><td>1/250s minimum for moving animals.</td></tr>
<tr><td>Dhow silhouettes</td><td>M</td><td>f/11</td><td>100</td><td>Meter off bright sky. Let boats go black.</td></tr>
<tr><td>Star trails/night sky</td><td>M</td><td>f/2.8</td><td>1600-3200</td><td>20-second exposures. Remote shutter essential.</td></tr>
</tbody>
</table>

<h3>Phone Photography Tips</h3>
<p>Most visitors shoot on phones, and modern phones do remarkably well in Zanzibar's bright conditions. Specific tips:</p>
<ul>
<li><strong>Use the 0.5x ultra-wide</strong> for Stone Town alleys and beach panoramas. The narrow streets are perfect for ultra-wide perspectives.</li>
<li><strong>Portrait mode</strong> for door details and spice close-ups — the blur separates the subject beautifully.</li>
<li><strong>Tap to expose on the sky</strong> when shooting sunsets — the phone's auto-exposure will try to brighten the whole scene, washing out the colours.</li>
<li><strong>HDR on</strong> for high-contrast scenes (shade + sun, indoor markets with bright windows).</li>
<li><strong>Clean your lens</strong> — salt air, sunscreen, and sand will smear it. Wipe before every shot session.</li>
<li><strong>Night mode</strong> in Stone Town after dark — the dimly lit alleys with occasional light create moody, atmospheric images.</li>
</ul>

<h2>Photography Etiquette</h2>
<p>Zanzibar is 95% Muslim. Photography etiquette matters.</p>
<ul>
<li><strong>Always ask before photographing people.</strong> "Picha?" with a questioning gesture is universally understood. Most people say yes — especially market vendors who are proud of their stalls, children who love seeing themselves on screen, and fishermen who've been photographed a thousand times.</li>
<li><strong>Don't photograph women in buibui (full black covering) without permission.</strong> Many will decline, and that's their right.</li>
<li><strong>Don't photograph inside mosques</strong> unless explicitly invited and given permission.</li>
<li><strong>Expect requests for money</strong> from some subjects, especially in tourist areas. $0.50-$1 is fair if you've taken multiple photos. It's not a scam — it's a transaction. You got a photo, they got a tip.</li>
<li><strong>Show people the photo on your screen.</strong> This simple gesture (showing the photo you just took) breaks barriers instantly. People love seeing themselves and it builds trust for more photos.</li>
<li><strong>Don't photograph the slave chambers at the memorial.</strong> Or if you do, be deeply respectful — it's a place of suffering, not a content opportunity.</li>
</ul>

<h2>What Gear to Bring</h2>

<h3>Dedicated Camera Kit</h3>
<table>
<thead><tr><th>Item</th><th>Why</th><th>Priority</th></tr></thead>
<tbody>
<tr><td>24-70mm f/2.8 (or 24-105mm)</td><td>Covers 90% of Zanzibar photography — alleys, beaches, people, food</td><td>Essential</td></tr>
<tr><td>70-200mm f/2.8 (or f/4)</td><td>Wildlife (monkeys, birds), dhow details from shore, compressed beach shots</td><td>Recommended</td></tr>
<tr><td>Macro lens or extension tubes</td><td>Spice farm details, carved door patterns, insect macro</td><td>Nice to have</td></tr>
<tr><td>Circular polariser</td><td>Cuts glare on water, deepens sky — essential for beach work</td><td>Essential</td></tr>
<tr><td>ND filter (6-stop)</td><td>Long exposures of waves on rock, silky water effects</td><td>Nice to have</td></tr>
<tr><td>Waterproof bag / dry bag</td><td>Boat trips, beach spray, sudden rain. Non-negotiable.</td><td>Essential</td></tr>
<tr><td>Spare batteries (2+)</td><td>Heat drains batteries fast. No reliable camera shops on the island.</td><td>Essential</td></tr>
<tr><td>Microfibre cloths (3+)</td><td>Salt spray, humidity, fingerprints. You'll clean your lens constantly.</td><td>Essential</td></tr>
<tr><td>Silica gel packets</td><td>Zanzibar's humidity can fog lenses and damage sensors. Store camera with silica gel overnight.</td><td>Recommended</td></tr>
</tbody>
</table>

<h3>Gear Hazards in Zanzibar</h3>
<ul>
<li><strong>Salt air:</strong> Corrodes metal contacts and lens coatings. Wipe gear down daily. Store in a sealed bag with silica gel.</li>
<li><strong>Sand:</strong> Gets into everything — lens barrels, hot shoes, card slots. Be careful changing lenses on the beach.</li>
<li><strong>Humidity:</strong> 70-90% humidity year-round. Fungus can grow on lens elements if stored damp. Use silica gel.</li>
<li><strong>Theft:</strong> Don't leave gear visible in vehicles or unattended on the beach. Use a bag that doesn't scream "camera" — a backpack is better than a branded camera bag.</li>
<li><strong>Heat:</strong> Don't leave gear in direct sun. Car interiors can exceed 60°C. Electronics don't survive that.</li>
</ul>

<h2>Drone Photography</h2>
<p>Zanzibar is spectacular from the air — the turquoise shallows, sandbanks, and dhow patterns are drone photography gold. But the rules are strict:</p>
<ul>
<li><strong>Registration required:</strong> You must register your drone with the Tanzania Civil Aviation Authority (TCAA) before flying. The process takes 1-2 weeks and costs around $50-$100. Apply before you travel.</li>
<li><strong>No-fly zones:</strong> Stone Town, airports, military installations, and government buildings are no-fly zones. Most of the interesting coastline is legal, but check local regulations.</li>
<li><strong>Altitude limit:</strong> 120m (400ft) maximum.</li>
<li><strong>Commercial use:</strong> Requires a separate permit. If you're shooting for a brand, publication, or commercial project, get the commercial permit in advance.</li>
<li><strong>Enforcement:</strong> Variable. Some areas ignore drones entirely; others (Stone Town, near military) will confiscate them. Don't risk it.</li>
<li><strong>Best drone spots:</strong> The sandbanks at Nakupenda (accessible by boat from Stone Town), Mnemba Atoll reef patterns, Nungwi beach from above, the mangrove channels near Jozani, and the seaweed farms at Jambiani.</li>
</ul>

<h2>Instagram-Worthy Shots</h2>
<p>The shots that define Zanzibar on social media — and how to get them:</p>
<ul>
<li><strong>The Door:</strong> Hundreds of ornately carved wooden doors throughout Stone Town. The most famous is the carved door at the Old Dispensary (Beit el-Amani). Best in morning light when the sun is low enough to illuminate the carvings.</li>
<li><strong>Dhow silhouette at sunset:</strong> Nungwi or Stone Town waterfront. Shoot from the beach, expose for the sky, let the boat go dark.</li>
<li><strong>Turquoise water aerial:</strong> Drone shot of the shallows near Mnemba or Nakupenda sandbank. The colour gradient from white sand to deep blue is extraordinary.</li>
<li><strong>Spice in hand:</strong> Close-up of fresh vanilla, cinnamon bark, or cloves held in a palm. Spice farm tour provides the setup.</li>
<li><strong>Seaweed farmer:</strong> Women working the tidal flats at Jambiani. Low angle, backlit by morning sun, with the ocean behind them.</li>
<li><strong>Rock Restaurant:</strong> The famous restaurant perched on a rock in the Indian Ocean at Michamvi. Photograph from the beach at high tide when water surrounds it.</li>
<li><strong>Forodhani fire:</strong> The smoke and flames of the night food market grill masters, with Stone Town's waterfront buildings glowing behind them.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What's the best camera for Zanzibar?</h3>
<p>A modern phone handles 80% of what Zanzibar offers. If you're bringing a dedicated camera, a mirrorless body with a 24-70mm lens covers most situations. Add a 70-200mm for wildlife. The key is a circular polariser — it transforms beach and ocean shots.</p>

<h3>Can I fly a drone in Zanzibar?</h3>
<p>Yes, but you must register with the Tanzania Civil Aviation Authority (TCAA) in advance. Allow 1-2 weeks. No-fly zones include Stone Town, airports, and military areas. Unregistered drone use risks confiscation.</p>

<h3>Is it safe to carry camera gear in Zanzibar?</h3>
<p>Yes — use a non-branded backpack, keep gear close, don't leave it visible in vehicles, and use your hotel safe for spare bodies and lenses. Petty theft is the risk, not robbery. Be more careful in Stone Town than at beach resorts.</p>

<h3>When is the best time for photography in Zanzibar?</h3>
<p>The dry season (June-October) has the clearest skies and best light. July-August has the most dramatic clouds for sunset shots. The short rains (November-December) produce spectacular storm light and empty beaches. <a href="/zanzibar-best-time-to-visit/">Full seasonal guide here.</a></p>

<h3>Can I photograph people in Zanzibar?</h3>
<p>Always ask first. Most people are happy to be photographed — especially children, market vendors, and fishermen. Some will expect a small tip ($0.50-$1). Don't photograph women in conservative dress without permission. Show the photo on your screen afterward — it builds goodwill.</p>

<h3>Where can I get photos printed or backed up in Zanzibar?</h3>
<p>Limited options. A few shops in Stone Town can print basic photos. There are no professional print labs. For backup, bring enough memory cards (at least 2x your expected usage) and back up to your phone or a portable drive nightly. WiFi speeds are unreliable for cloud backup of large files.</p>

<h3>Do I need a waterproof camera?</h3>
<p>For snorkelling and <a href="/zanzibar-water-sports/">water sports</a>, yes — either a waterproof action camera (GoPro) or a waterproof phone case. For general beach photography, a regular camera with a dry bag for transport is fine. <a href="/zanzibar-diving-guide/">Diving photography</a> requires dedicated underwater housing.</p>

<h3>What editing software works best for Zanzibar photos?</h3>
<p>Lightroom Mobile (free) handles most editing on the go. For the turquoise water to look right, boost Aqua/Cyan saturation slightly and pull Blues toward teal. For Stone Town, warm up the colour temperature and add slight contrast to emphasise texture. Don't over-saturate — Zanzibar's colours are naturally vivid.</p>

<h3>Are there professional photography tours in Zanzibar?</h3>
<p>A few photographers offer guided photo walks in Stone Town ($50-$100 for 2-3 hours). These are worth it — the guide knows the best light, the most photogenic alleys, and can introduce you to willing portrait subjects. Ask at your hotel or search "Stone Town photography tour" before your trip.</p>

<h3>How do I protect my camera from humidity?</h3>
<p>Zanzibar's humidity (70-90%) is the silent killer of camera gear. Store your camera with silica gel packets in a sealed bag overnight. Wipe down metal parts with a dry cloth daily. Don't change lenses in humid air more than necessary. If you see condensation inside your lens, stop shooting and let the camera acclimatise in a dry space for several hours.</p>
`;

async function main() {
  console.log("Seeding 2 Zanzibar blog posts (solo travel + photography)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });

  const tagZanzibar = await prisma.tag.upsert({ where: { slug: "zanzibar" }, update: { name: "Zanzibar" }, create: { slug: "zanzibar", name: "Zanzibar" } });
  const tagSoloTravel = await prisma.tag.upsert({ where: { slug: "solo-travel" }, update: { name: "Solo Travel" }, create: { slug: "solo-travel", name: "Solo Travel" } });
  const tagBudgetTravel = await prisma.tag.upsert({ where: { slug: "budget-travel" }, update: { name: "Budget Travel" }, create: { slug: "budget-travel", name: "Budget Travel" } });
  const tagSafety = await prisma.tag.upsert({ where: { slug: "safety" }, update: { name: "Safety" }, create: { slug: "safety", name: "Safety" } });
  const tagPhotography = await prisma.tag.upsert({ where: { slug: "photography" }, update: { name: "Photography" }, create: { slug: "photography", name: "Photography" } });
  const tagCameraGear = await prisma.tag.upsert({ where: { slug: "camera-gear" }, update: { name: "Camera Gear" }, create: { slug: "camera-gear", name: "Camera Gear" } });
  const tagDrone = await prisma.tag.upsert({ where: { slug: "drone-photography" }, update: { name: "Drone Photography" }, create: { slug: "drone-photography", name: "Drone Photography" } });

  const post1 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-solo-travel" },
    update: {
      title: "Solo Travel in Zanzibar: Complete Safety & Planning Guide",
      excerpt: "Everything solo travellers need to know about Zanzibar — safety tips, best areas, costs, activities, meeting people, itineraries, and advice for solo women.",
      content: soloTravelContent,
      metaTitle: "Solo Travel Zanzibar | Safety & Budget Guide",
      metaDescription: "Solo travel guide to Zanzibar: safety tips, best areas for solo travellers, daily budgets, activities, meeting people, and advice for solo women travellers.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-solo-travel",
      title: "Solo Travel in Zanzibar: Complete Safety & Planning Guide",
      excerpt: "Everything solo travellers need to know about Zanzibar — safety tips, best areas, costs, activities, meeting people, itineraries, and advice for solo women.",
      content: soloTravelContent,
      metaTitle: "Solo Travel Zanzibar | Safety & Budget Guide",
      metaDescription: "Solo travel guide to Zanzibar: safety tips, best areas for solo travellers, daily budgets, activities, meeting people, and advice for solo women travellers.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post1.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagSoloTravel, tagBudgetTravel, tagSafety]) {
    await prisma.postTag.create({ data: { postId: post1.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-solo-travel");

  const post2 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-photography-guide" },
    update: {
      title: "Zanzibar Photography Guide: Best Spots, Settings & Etiquette",
      excerpt: "Complete photography guide to Zanzibar — best locations, camera settings, drone rules, gear protection, phone tips, and cultural photography etiquette.",
      content: photographyContent,
      metaTitle: "Zanzibar Photography Guide | Spots & Settings",
      metaDescription: "Zanzibar photography guide: best locations, camera settings for tropical light, drone rules, gear protection tips, and cultural etiquette for photographing people.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-photography-guide",
      title: "Zanzibar Photography Guide: Best Spots, Settings & Etiquette",
      excerpt: "Complete photography guide to Zanzibar — best locations, camera settings, drone rules, gear protection, phone tips, and cultural photography etiquette.",
      content: photographyContent,
      metaTitle: "Zanzibar Photography Guide | Spots & Settings",
      metaDescription: "Zanzibar photography guide: best locations, camera settings for tropical light, drone rules, gear protection tips, and cultural etiquette for photographing people.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post2.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagPhotography, tagCameraGear, tagDrone]) {
    await prisma.postTag.create({ data: { postId: post2.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-photography-guide");

  console.log("\nDone — 2 Zanzibar blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
