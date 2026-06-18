/**
 * seed-kilimanjaro-blog-posts-25a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 25a):
 *  1. kilimanjaro-national-park
 *  2. kilimanjaro-seven-summits
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-25a.ts
 */

import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

/* ------------------------------------------------------------------ */
/*  Post 1: kilimanjaro-national-park                                  */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>Kilimanjaro National Park is one of Africa's most iconic protected areas and the gateway to the continent's highest summit. Established in 1973 and inscribed as a <strong>UNESCO World Heritage Site in 1987</strong>, the park protects the entire mountain ecosystem above the tree line, including the glaciers, alpine desert, moorland, and montane forest that make Kilimanjaro one of the most ecologically diverse mountains on Earth. In our 800+ expeditions through this park, we have watched the landscape shift with the seasons, seen elephant herds crossing the lower forest belt, and guided climbers through every gate the park offers. This guide covers everything you need to know about Kilimanjaro National Park — its history, UNESCO status, KINAPA regulations, entry gates, 2026 park fees, ecological zones, conservation challenges, and practical rules every visitor must follow.</p>

<h2>History of Kilimanjaro National Park</h2>

<p>The story of Kilimanjaro as a protected area begins long before the park was formally gazetted. German colonial authorities declared the mountain a forest reserve in 1921, recognising the critical role the montane forest plays in regional water supply. After Tanganyika gained independence in 1961, the new government maintained these protections. In <strong>1973</strong>, the Tanzanian government officially established Kilimanjaro National Park, encompassing the mountain above the 2,700-metre contour — approximately <strong>1,688 square kilometres</strong> of protected wilderness. The half-mile forest strip below the park boundary was designated as a forest reserve, creating a buffer zone between the park and the intensively farmed Chagga homeland that surrounds the mountain's lower slopes.</p>

<p>In <strong>1987</strong>, UNESCO inscribed Kilimanjaro National Park as a <strong>World Heritage Site under natural criteria (vii)</strong>, recognising the mountain as a "superlative natural phenomenon" — an isolated volcanic massif rising 4,877 metres above the surrounding plains to reach 5,895 metres at Uhuru Peak. The inscription specifically cited the mountain's snow-capped summit, its extraordinary vertical zonation from tropical to arctic conditions, and its status as the highest point on the African continent.</p>

<p>In <strong>2005</strong>, the park boundary was extended downward to include the montane forest belt, expanding the protected area to approximately <strong>1,828 square kilometres</strong>. This expansion was critical — the forest zone is the mountain's water tower, feeding rivers that supply millions of people in the Kilimanjaro and Arusha regions. Without the forest, the mountain's glaciers and streams would have no catchment system. The extension also brought additional wildlife corridors under protection, improving connectivity with nearby conservation areas.</p>

<h2>UNESCO World Heritage Status</h2>

<p>Kilimanjaro's UNESCO World Heritage listing under <strong>Criterion (vii) — superlative natural phenomena</strong> — places it alongside sites like the Grand Canyon, Victoria Falls, and the Great Barrier Reef. The designation is not merely ceremonial. It means the Tanzanian government has committed to international standards of protection, monitoring, and reporting. UNESCO conducts periodic reviews of all World Heritage Sites, and Kilimanjaro has faced scrutiny over glacial retreat and encroachment pressures on the forest belt.</p>

<p>The listing specifically highlights three features that make Kilimanjaro globally exceptional:</p>

<ul>
<li><strong>The highest free-standing mountain in the world:</strong> Rising from plains at approximately 900 metres to 5,895 metres at Uhuru Peak, the vertical relief is unmatched by any other non-range mountain on Earth.</li>
<li><strong>Equatorial glaciers:</strong> At just 3 degrees south of the equator, Kilimanjaro's summit glaciers are a climatic anomaly. They have persisted for over 11,000 years, though they are now retreating at an alarming rate — a visible indicator of global climate change.</li>
<li><strong>Vertical ecological zonation:</strong> The mountain compresses five distinct climate zones into a single ascent, from tropical cultivation zone to arctic summit — an ecological transect that would normally require travelling thousands of kilometres of latitude.</li>
</ul>

<p>If you are <a href="/climbing-kilimanjaro/">planning to climb Kilimanjaro</a>, you are entering one of only 1,199 UNESCO World Heritage Sites globally and one of just 227 natural heritage sites. That status carries responsibilities — which is why KINAPA enforces strict rules on waste management, group sizes, and route usage.</p>

<h2>KINAPA: Kilimanjaro National Park Authority</h2>

<p>The park is managed by the <strong>Kilimanjaro National Park Authority (KINAPA)</strong>, a division of the Tanzania National Parks Authority (TANAPA). KINAPA is responsible for all aspects of park administration: trail maintenance, ranger patrols, rescue operations, gate management, fee collection, and enforcement of park regulations. The authority employs over 500 staff, including rangers, rescue teams, gate officers, and administrative personnel.</p>

<p>KINAPA's mandate extends beyond tourism management. The authority conducts ecological monitoring, anti-poaching patrols in the forest belt, fire prevention and response (forest fires are a recurring threat), and community outreach programmes with villages bordering the park. Revenue from park fees — which exceeded <strong>$50 million USD annually</strong> in recent years — funds both park operations and broader TANAPA conservation programmes across Tanzania's national park network.</p>

<p>In our experience working with KINAPA over the past two decades, the authority has steadily professionalised. Rescue response times have improved significantly since the installation of radio communication systems and the establishment of ranger stations at key altitude points. The mandatory briefing system at each gate ensures every climber understands the rules before entering the park. KINAPA also enforces the requirement that all climbers must be accompanied by a licensed guide — you cannot enter the park independently.</p>

<h2>Entry Gates</h2>

<p>Kilimanjaro National Park has <strong>six entry gates</strong>, each serving different <a href="/trekking/">trekking routes</a>. The gate you use depends on which route you have chosen. Each gate has registration facilities, ranger briefing rooms, and basic amenities. Here is a complete overview:</p>

<h3>Londorossi Gate (2,250 m)</h3>

<p>Located on the western side of the mountain, <strong>Londorossi Gate</strong> is the registration point for the <a href="/trekking/lemosho-route/">Lemosho Route</a> and the Northern Circuit. It is the most remote gate, reached via a 3–4 hour drive from Moshi through the town of Londorossi. After registering here, climbers drive an additional 45 minutes to the actual trailhead at Lemosho Glades (2,385 m). The remoteness is part of the appeal — the western slopes see fewer climbers, especially in the first two days, creating a more wilderness-oriented experience. Londorossi also serves as the registration point for the rarely used Shira Route.</p>

<h3>Machame Gate (1,640 m)</h3>

<p>The busiest gate on the mountain, <strong>Machame Gate</strong> serves the immensely popular <a href="/trekking/machame-route/">Machame Route</a> (the "Whiskey Route"). Located approximately 30 minutes from Moshi town, the gate sits at the edge of the rainforest belt. On peak season mornings, the car park fills with dozens of vehicles and hundreds of porters sorting loads. Despite the crowds at the gate, the Machame Route spreads climbers across multiple campsites, so the trail itself does not feel overly congested. The gate has improved facilities including a covered briefing area and porter weigh station.</p>

<h3>Mweka Gate (1,640 m)</h3>

<p><strong>Mweka Gate</strong> is a descent-only gate — no routes start here. It serves as the exit point for climbers descending from the Machame, Lemosho, Umbwe, and Northern Circuit routes. The final descent through the rainforest to Mweka Gate is approximately 3–4 hours from Mweka Camp. At the gate, climbers receive their summit certificates (green certificates for Uhuru Peak, brown for Stella Point, blue for other points). The drive back to Moshi from Mweka Gate takes approximately 45 minutes.</p>

<h3>Marangu Gate (1,860 m)</h3>

<p>The starting and ending point for the <a href="/trekking/marangu-route/">Marangu Route</a> (the "Coca-Cola Route"), <strong>Marangu Gate</strong> is the most developed entry point. It has a small museum displaying the history of Kilimanjaro climbing, a gift shop, well-maintained toilets, and a monument to Hans Meyer — the first European to reach the summit in 1889. Marangu is the only gate that serves as both entry and exit for the same route. Located approximately 40 minutes from Moshi, the gate area is surrounded by lush rainforest and Chagga farming communities.</p>

<h3>Rongai Gate (1,950 m)</h3>

<p>Located on the northeastern side of the mountain near the Kenyan border, <strong>Rongai Gate</strong> (sometimes called Nalemoru Gate) serves the <a href="/trekking/rongai-route/">Rongai Route</a>. It is the most remote starting point, requiring a 3-hour drive from Moshi through Marangu town and around the eastern side of the mountain. The drive itself passes through rural Chagga villages and offers glimpses of the mountain from angles most tourists never see. The gate facilities are basic compared to Machame or Marangu — a simple registration hut and porter weigh station. Rongai is the driest approach to Kilimanjaro, making it the preferred route during the rainy seasons.</p>

<h3>Umbwe Gate (1,400 m)</h3>

<p>The least-used entry point, <strong>Umbwe Gate</strong> serves the challenging Umbwe Route — the steepest and most direct ascent to the Southern Glaciers. Located approximately 30 minutes from Moshi, the gate sits at a lower altitude than most other entry points, which means a longer ascent through the rainforest belt. The Umbwe Route has the lowest success rate of all Kilimanjaro routes due to its rapid altitude gain and limited acclimatisation opportunities. We recommend it only for experienced high-altitude trekkers or as an approach to the Western Breach. Facilities at the gate are basic.</p>

<h2>2026 Park Fees</h2>

<p>Kilimanjaro National Park fees are set by TANAPA and represent a significant portion of the total <a href="/kilimanjaro-prices/">cost of climbing Kilimanjaro</a>. Fees are structured per person per day and differ for adults, children (5–15 years), and Tanzanian residents. All fees are paid in advance by the tour operator — climbers do not pay at the gate. Here is the current fee structure for 2026:</p>

<table style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
<thead>
<tr style="background:#1a3c34; color:#fff;">
<th style="padding:12px; text-align:left; border:1px solid #ddd;">Fee Category</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Non-Resident Adult</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Non-Resident Child</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">EA Resident Adult</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Conservation Fee</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$70 / day</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$20 / day</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">TSh 17,700 / day</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Camping Fee</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$50 / night</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$10 / night</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">TSh 11,800 / night</td>
</tr>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Hut Fee (Marangu only)</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$50 / night</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$10 / night</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">TSh 11,800 / night</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Rescue Fee</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$20 / trip</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$20 / trip</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">TSh 5,900 / trip</td>
</tr>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Professional / Guide Fee</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$2 / day</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$2 / day</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$2 / day</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>VAT (18%)</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Applied to all fees</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Applied to all fees</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Applied to all fees</td>
</tr>
</tbody>
</table>

<h3>Total Park Fees by Route Duration</h3>

<p>The total park fees vary significantly by route duration. Here is what a single non-resident adult can expect to pay in park fees alone (excluding VAT):</p>

<ul>
<li><strong>5-day Marangu Route:</strong> $70 x 5 (conservation) + $50 x 4 (hut) + $20 (rescue) + $2 x 5 (guide) = $580</li>
<li><strong>6-day Machame Route:</strong> $70 x 6 (conservation) + $50 x 5 (camping) + $20 (rescue) + $2 x 6 (guide) = $702</li>
<li><strong>7-day Lemosho Route:</strong> $70 x 7 (conservation) + $50 x 6 (camping) + $20 (rescue) + $2 x 7 (guide) = $824</li>
<li><strong>8-day Lemosho/Northern Circuit:</strong> $70 x 8 (conservation) + $50 x 7 (camping) + $20 (rescue) + $2 x 8 (guide) = $946</li>
<li><strong>9-day Northern Circuit:</strong> $70 x 9 (conservation) + $50 x 8 (camping) + $20 (rescue) + $2 x 9 (guide) = $1,068</li>
</ul>

<p>With the 18% VAT applied, a 7-day Lemosho climb costs approximately <strong>$972 in park fees alone</strong> per person. These fees are non-negotiable and are the primary reason why budget Kilimanjaro climbs below $1,500 are simply not possible — the park fees alone exceed half that amount. For a full breakdown of what your climb costs should include, see our <a href="/kilimanjaro-prices/">Kilimanjaro pricing guide</a>.</p>

<h2>Ecological Zones of Kilimanjaro</h2>

<p>One of the features that earned Kilimanjaro its UNESCO status is the remarkable <strong>vertical ecological zonation</strong> — five distinct climate and vegetation zones compressed into a single mountain ascent. Walking from the gate to the summit is the ecological equivalent of travelling from the equator to the Antarctic.</p>

<h3>Cultivation Zone (800–1,800 m)</h3>

<p>The lowest zone is not technically within the national park but surrounds it entirely. The Chagga people have farmed the fertile volcanic slopes for centuries, growing coffee, bananas, maize, and beans in an intensive agroforestry system. This zone receives the highest rainfall on the mountain — up to 2,000 mm annually. The farming belt extends right up to the park boundary, which creates ongoing tension between agricultural expansion and forest conservation.</p>

<h3>Montane Forest (1,800–2,800 m)</h3>

<p>The rainforest belt is the mountain's most biodiverse zone and its most important ecological asset. Towering camphor trees, fig trees, and podocarpus create a dense canopy that traps moisture from the clouds. Epiphytes, ferns, and mosses drape every surface. This zone is home to <strong>blue monkeys, colobus monkeys, bushbuck, duiker, and over 180 bird species</strong>. The forest also harbours elephants and buffalo, though sightings are rare due to the dense vegetation. For climbers, the forest zone is the wettest section — expect muddy trails and frequent rain, especially on the southern and western routes.</p>

<h3>Heather and Moorland (2,800–4,000 m)</h3>

<p>Above the forest canopy, the vegetation transitions to a heather-moorland landscape dominated by giant heathers (Erica arborea), which can grow up to 10 metres tall. As altitude increases, the heathers give way to moorland — a landscape of tussock grass, wildflowers, and the iconic <strong>giant lobelias and senecios</strong> (giant groundsels). These prehistoric-looking plants are found only on the high mountains of East Africa and have adapted to extreme conditions — freezing nights, intense UV radiation, and drastic temperature swings. The moorland zone offers some of the most stunning views on the mountain, with clear sight lines across the Shira Plateau and down to the plains below.</p>

<h3>Alpine Desert (4,000–5,000 m)</h3>

<p>Above 4,000 metres, conditions become too harsh for most plant life. The alpine desert is a stark, moon-like landscape of volcanic rock, scree, and dust. Rainfall is minimal — less than 250 mm annually. Temperatures swing dramatically, from scorching sun during the day to well below freezing at night. Despite the apparent barrenness, hardy mosses and lichens cling to sheltered rock surfaces. This is the zone where altitude sickness becomes a serious concern for climbers. The air contains roughly <strong>60% of the oxygen available at sea level</strong>. Proper acclimatisation is essential — which is why we recommend routes of <a href="/best-time-to-climb-kilimanjaro/">7 days or more</a> that allow extra time in this critical zone.</p>

<h3>Arctic Summit (5,000–5,895 m)</h3>

<p>The summit zone is a world of ice and rock. The remaining glaciers — the Northern Icefield, Southern Icefield, Eastern Ice Field, and the iconic Rebmann and Furtwängler glaciers — are remnants of an ice cap that once covered the entire summit. Night-time temperatures drop to <strong>-20°C to -30°C</strong>. Virtually no plant or animal life exists here. The summit night push from base camp to Uhuru Peak is the most physically and mentally demanding section of the entire climb, conducted in darkness, extreme cold, and thin air. Yet the reward — watching the sun rise from the roof of Africa — is one of the great experiences in mountaineering.</p>

<h2>Conservation Challenges</h2>

<p>Despite its protected status, Kilimanjaro National Park faces several serious conservation threats that KINAPA and TANAPA must address.</p>

<h3>Glacial Retreat</h3>

<p>Kilimanjaro's glaciers have lost over <strong>85% of their surface area since 1912</strong>. Scientific studies estimate that the glaciers could disappear entirely within the next two decades. The causes are complex — while global climate change plays a role, reduced precipitation and increased solar radiation due to deforestation on the lower slopes are also contributing factors. The loss of the glaciers would be catastrophic for the mountain's water systems and would fundamentally alter its iconic snow-capped appearance that draws climbers from around the world.</p>

<h3>Forest Fires</h3>

<p>In October 2020, a massive fire burned for over a week on Kilimanjaro's southern slopes, consuming approximately <strong>95 square kilometres of moorland and forest</strong>. Another significant fire occurred in 2022. These fires are typically caused by honey hunters, charcoal burners, or campfires from illegal activities in the forest reserve. KINAPA has increased ranger patrols and installed fire breaks, but the dry season remains a period of heightened risk. The fires destroy decades of ecological recovery and release significant carbon stores.</p>

<h3>Waste Management</h3>

<p>With over <strong>50,000 climbers annually</strong> (plus guides, porters, and cooks — bringing the total mountain population to over 200,000 per year), waste management is a constant challenge. KINAPA has implemented a strict pack-it-in, pack-it-out policy, and all climbing groups must carry their waste off the mountain. Porter weigh stations at each gate check that waste bags are accounted for on descent. Despite these measures, legacy waste from decades of climbing remains buried in some campsites, and enforcement can be inconsistent during peak season.</p>

<h2>Park Rules and Regulations</h2>

<p>KINAPA enforces a comprehensive set of rules that every climber must follow. Violations can result in fines, expulsion from the park, or prosecution. In our experience, the rules exist for good reason — they protect both the mountain environment and the climbers themselves.</p>

<ul>
<li><strong>Licensed guide required:</strong> Every climber must be accompanied by a KINAPA-registered guide. Solo or unguided climbing is illegal. Guides must hold a valid mountain guide licence issued by KINAPA.</li>
<li><strong>Stay on designated trails:</strong> Off-trail hiking is prohibited. Trails are clearly marked, and deviation can damage fragile alpine vegetation and create erosion channels.</li>
<li><strong>Camp only at designated sites:</strong> Camping is restricted to official campsites. Wild camping is not permitted anywhere in the park.</li>
<li><strong>No open fires:</strong> Campfires are strictly prohibited at all altitudes. All cooking must use portable stoves with fuel carried in and out.</li>
<li><strong>Pack it in, pack it out:</strong> All waste must be removed from the mountain. Groups are required to carry designated waste bags, which are weighed at the exit gate.</li>
<li><strong>No feeding wildlife:</strong> Interaction with wildlife — particularly the blue monkeys and colobus monkeys in the forest zone — is prohibited. This includes leaving food scraps at campsites.</li>
<li><strong>Maximum group size:</strong> Groups are limited in size, and KINAPA may restrict access to certain routes during peak periods to prevent overcrowding.</li>
<li><strong>No drones:</strong> Drone flying is prohibited within the national park without special TANAPA authorisation, which is rarely granted.</li>
<li><strong>No removal of natural materials:</strong> Collecting rocks, plants, or any natural material is illegal. This includes volcanic rock samples and alpine flowers.</li>
</ul>

<h2>How to Visit Kilimanjaro National Park</h2>

<p>The vast majority of visitors enter the park to <a href="/climbing-kilimanjaro/">climb Kilimanjaro</a>, but there are alternatives for those who want to experience the mountain without a multi-day summit attempt.</p>

<h3>Day Walks</h3>

<p>KINAPA offers guided day walks on the lower slopes — typically entering at Marangu Gate and walking through the forest zone to Mandara Hut (2,720 m) and back. These walks are an excellent option for visitors who want to experience the rainforest ecosystem without committing to a full climb. Day walk fees are lower than climbing fees, and walks take approximately 5–6 hours.</p>

<h3>Full Summit Climbs</h3>

<p>The primary activity is a multi-day trek to Uhuru Peak. Routes range from 5 to 9 days, with longer routes offering significantly better acclimatisation and higher success rates. We strongly recommend a minimum of 7 days for first-time high-altitude trekkers. For a complete comparison of all routes, visit our <a href="/trekking/">trekking routes page</a>.</p>

<h3>Combining with Safari</h3>

<p>Many visitors combine their Kilimanjaro climb with a safari in the nearby national parks — Serengeti, Ngorongoro Crater, Tarangire, and Lake Manyara are all within a day's drive of Moshi. We typically recommend doing the safari after the climb, when you can relax and enjoy the wildlife without worrying about the physical challenge ahead.</p>

<p>Kilimanjaro National Park is more than a mountain to climb — it is a globally significant ecosystem, a UNESCO treasure, and a testament to what conservation can achieve when properly funded and managed. Whether you come for the summit or the forest, the park rewards every visitor with an experience that stays with them for life. <a href="/climbing-kilimanjaro/">Start planning your Kilimanjaro expedition today</a>.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-seven-summits                                  */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>If you have ever heard someone talk about the "Seven Summits," you have heard them describe one of the great challenges in mountaineering — standing on the highest point of every continent on Earth. And if you are reading this, there is a good chance you already know that <strong>Kilimanjaro is the African representative on both versions of the list</strong>. At 5,895 metres, Uhuru Peak is not only the highest point in Africa but also the most accessible of all Seven Summits, requiring no technical climbing equipment, no ropes, no crampons in most conditions, and no previous mountaineering experience. In our 800+ Kilimanjaro expeditions, we have guided dozens of climbers who were ticking off their first — or their last — of the Seven Summits. This guide explains the challenge, compares all seven mountains, and shows you why Kilimanjaro is the perfect place to start.</p>

<h2>What Are the Seven Summits?</h2>

<p>The Seven Summits are the highest mountains on each of the seven continents. The concept was popularised in the 1980s by American businessman <strong>Dick Bass</strong>, who became the first person to climb all seven in 1985. However, the exact list has been debated ever since, because the definition of the boundary between Asia and Oceania — and therefore which peak represents that continent — differs depending on which geographical model you follow.</p>

<h3>The Bass List (1985)</h3>

<p>Dick Bass's original list uses <strong>Mount Kosciuszko (2,228 m)</strong> in Australia as the Oceania representative. Kosciuszko is the highest point on the Australian mainland and can be hiked in a few hours with no technical difficulty. The Bass List is sometimes considered the "easier" version because Kosciuszko is essentially a walk-up.</p>

<h3>The Messner List (1986)</h3>

<p>Italian mountaineering legend <strong>Reinhold Messner</strong> argued that if you define Oceania to include the islands of Australasia (not just the Australian mainland), then the highest peak is <strong>Carstensz Pyramid (Puncak Jaya, 4,884 m)</strong> in Papua, Indonesia. Carstensz is a serious technical rock climb in a remote tropical jungle — a far cry from the gentle slopes of Kosciuszko. The Messner List is generally considered the "harder" and more legitimate version among serious mountaineers.</p>

<p><strong>Kilimanjaro appears on both lists.</strong> There is no debate about which mountain represents Africa — Uhuru Peak at 5,895 metres is the undisputed highest point on the continent, standing over 500 metres taller than the second-highest African peak (Mount Kenya at 5,199 m).</p>

<h2>The Seven Summits Compared</h2>

<p>To understand where Kilimanjaro fits in the challenge, here is a detailed comparison of all seven mountains across both lists. The table uses the Messner List (Carstensz) as the primary reference, with Kosciuszko noted where the Bass List differs.</p>

<table style="width:100%; border-collapse:collapse; margin:1.5rem 0;">
<thead>
<tr style="background:#1a3c34; color:#fff;">
<th style="padding:12px; text-align:left; border:1px solid #ddd;">Mountain</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Continent</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Elevation</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Difficulty</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Typical Cost</th>
<th style="padding:12px; text-align:center; border:1px solid #ddd;">Duration</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Everest</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Asia</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">8,849 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Extreme</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$30,000–$100,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">60–70 days</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Aconcagua</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">South America</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">6,961 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Hard</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$5,000–$12,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">18–22 days</td>
</tr>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Denali</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">North America</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">6,190 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Very Hard</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$8,000–$15,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">17–21 days</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Kilimanjaro</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Africa</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">5,895 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Moderate</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$2,000–$5,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">5–9 days</td>
</tr>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Elbrus</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Europe</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">5,642 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Moderate–Hard</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$3,000–$6,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">7–10 days</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Vinson</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Antarctica</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">4,892 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Moderate (logistics extreme)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$40,000–$55,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">12–18 days</td>
</tr>
<tr>
<td style="padding:10px; border:1px solid #ddd;"><strong>Carstensz Pyramid</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Oceania (Messner)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">4,884 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Hard (technical rock)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">$15,000–$25,000</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">10–14 days</td>
</tr>
<tr style="background:#f7f7f7;">
<td style="padding:10px; border:1px solid #ddd;"><strong>Kosciuszko</strong></td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Oceania (Bass)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">2,228 m</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">Easy (walk-up)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">~$100 (self-guided)</td>
<td style="padding:10px; text-align:center; border:1px solid #ddd;">1 day</td>
</tr>
</tbody>
</table>

<h2>Why Kilimanjaro Is the Most Popular Starting Point</h2>

<p>Among serious Seven Summiters and casual aspirants alike, Kilimanjaro is overwhelmingly the first summit attempted. There are several compelling reasons for this, and they go beyond the mountain being the "easiest" of the serious peaks.</p>

<h3>No Technical Climbing Required</h3>

<p>Kilimanjaro is a <strong>non-technical trek</strong>. There are no ropes, no harnesses, no ice axes (on standard routes), no crevasse crossings, and no need for previous mountaineering experience. You walk to the summit. This does not make it easy — the altitude and length of the trek are genuine challenges — but it means anyone with reasonable fitness and determination can attempt it. Compare this to Denali (glacier travel, crevasse rescue skills required), Everest (fixed ropes, ladders, supplemental oxygen), or Carstensz (technical rock climbing grades up to 5.8). Kilimanjaro is the only one of the Seven Summits where the primary challenge is altitude rather than technical difficulty.</p>

<h3>Accessible and Affordable</h3>

<p>At <strong>$2,000–$5,000</strong> for a fully guided expedition including park fees, accommodation, meals, and transfers, Kilimanjaro is by far the most affordable of the Seven Summits. Vinson Massif costs $40,000+ just for the logistics of getting to Antarctica. Everest starts at $30,000 for the most basic expedition. Even Aconcagua — often considered the second most accessible — costs $5,000–$12,000 and requires 18–22 days. Kilimanjaro can be climbed in 7 days, meaning less time off work and lower total trip costs. For a detailed breakdown, see our <a href="/kilimanjaro-prices/">Kilimanjaro pricing guide</a>.</p>

<h3>Short Duration</h3>

<p>A Kilimanjaro expedition takes <strong>5–9 days</strong> depending on the route. Including travel days to and from Tanzania, most climbers are away for 10–14 days total. Compare this to Everest (2 months), Denali (3 weeks), or Aconcagua (3 weeks). This makes Kilimanjaro feasible for people with normal jobs, limited holiday time, and family commitments — you do not need to take a sabbatical to climb it.</p>

<h3>High Success Rates</h3>

<p>On well-managed, longer routes like the <a href="/trekking/lemosho-route/">Lemosho Route</a> (7–8 days), summit success rates exceed <strong>90%</strong>. This compares favourably to Denali (approximately 50%), Aconcagua (60%), and Everest (30–40% for all climbers, higher for guided expeditions). The high success rate on Kilimanjaro gives aspiring Seven Summiters a confidence-building first summit — the psychological boost of standing on your first continental high point is enormous.</p>

<h3>World-Class Infrastructure</h3>

<p>Kilimanjaro has the best support infrastructure of any of the Seven Summits. Well-maintained trails, established campsites, ranger stations, a proven rescue system, and an army of experienced guides and porters mean you are never truly on your own. Kilimanjaro International Airport (JRO) has direct flights from Europe and the Middle East, and the mountain is only a 90-minute drive from the airport. No other summit on the list is this logistically simple to reach.</p>

<h2>The Seven Summits: Mountain by Mountain</h2>

<p>Understanding each mountain helps you appreciate where Kilimanjaro fits and what comes after it on the Seven Summits journey.</p>

<h3>1. Mount Everest (8,849 m) — Asia</h3>

<p>The ultimate mountaineering objective. Everest is climbed primarily via the South Col route from Nepal or the Northeast Ridge from Tibet. The expedition takes approximately 2 months, including acclimatisation rotations. Above 8,000 metres (the "death zone"), supplemental oxygen is used by most climbers. The objective dangers — avalanches, icefalls, crevasses, extreme weather — are real and cannot be fully mitigated. Over 300 climbers have died on Everest. The cost ranges from $30,000 for budget operators to $100,000+ for premium guided expeditions. Many aspiring Seven Summiters save Everest for last.</p>

<h3>2. Aconcagua (6,961 m) — South America</h3>

<p>The highest peak outside Asia, Aconcagua stands in the Argentine Andes near the Chilean border. The Normal Route is technically straightforward — a trek similar in nature to Kilimanjaro but at significantly higher altitude and in harsher conditions. The main challenges are extreme cold, high winds, and altitude. The summit day is longer and more gruelling than Kilimanjaro's. Many Seven Summiters climb Aconcagua second, after Kilimanjaro, as a stepping stone to higher altitude experience. Permit costs alone are $800–$1,000, and the total expedition runs 18–22 days.</p>

<h3>3. Denali (6,190 m) — North America</h3>

<p>Formerly known as Mount McKinley, Denali in Alaska is considered by many mountaineers to be the hardest of the Seven Summits relative to its height. The reason: Denali sits at <strong>63 degrees north latitude</strong>, meaning the effective altitude (how your body perceives the thin air) is higher than its actual elevation suggests — roughly equivalent to a 7,000 m peak in the Himalayas. Climbers must carry heavy packs (no porters), pull sleds across glaciers, navigate crevasses, and endure storms with wind chills below -40°C. The West Buttress route takes 17–21 days. Success rate is approximately 50%.</p>

<h3>4. Kilimanjaro (5,895 m) — Africa</h3>

<p>You are reading about it right now. The non-technical nature, affordable cost, short duration, and high success rate make Kilimanjaro the gateway summit. But do not underestimate it — altitude sickness does not care about your fitness level, and summit night at -20°C in darkness at 5,800 metres is a genuine test. In our experience, the climbers who succeed are the ones who choose the right route, prepare properly, and take acclimatisation seriously. Start with our <a href="/climbing-kilimanjaro/">complete Kilimanjaro climbing guide</a> to understand the options.</p>

<h3>5. Mount Elbrus (5,642 m) — Europe</h3>

<p>The highest peak in Europe (by the conventional Europe-Asia boundary at the Greater Caucasus watershed), Elbrus is a dormant volcano in southern Russia. The standard route from the south uses a cable car and snow cat to reach the Pastukhov Rocks at 4,700 m, from where climbers make a summit push on a snow and ice slope. Elbrus requires crampons, ice axes, and roped travel — making it technically harder than Kilimanjaro. Weather can be fierce, with sudden storms descending without warning. Despite the relative ease of the standard route, Elbrus has a surprisingly high fatality rate, largely due to inexperienced climbers being caught in whiteout conditions. Geopolitical access has fluctuated in recent years.</p>

<h3>6. Vinson Massif (4,892 m) — Antarctica</h3>

<p>At just 4,892 metres, Vinson is the shortest of the Seven Summits (excluding Kosciuszko). The climbing is moderate — glacier travel with crampons and rope teams, similar in difficulty to a moderately crevassed glacier route. The challenge is <strong>logistics and cost</strong>. Getting to Vinson requires a flight from Punta Arenas, Chile, to Union Glacier camp in Antarctica aboard a specialised charter aircraft, then a ski-equipped Twin Otter to Vinson base camp. This logistics chain costs $40,000–$55,000 per person and is operated by a single company (Antarctic Logistics & Expeditions). Weather delays are common, and the window for climbing is limited to November–January. Despite its moderate technical difficulty, Vinson is often the second-to-last summit attempted — simply because of the cost and logistics.</p>

<h3>7. Carstensz Pyramid (4,884 m) — Oceania (Messner List)</h3>

<p>The most unusual of the Seven Summits. Carstensz Pyramid (Puncak Jaya) is a <strong>limestone spire</strong> rising from the tropical jungle of Papua, Indonesia. The summit is reached via a technical rock climb with fixed ropes, requiring genuine rock climbing skills (grades up to 5.8 / UIAA V). The approach trek through dense jungle takes 4–5 days and involves river crossings, muddy trails, and interactions with local indigenous communities. Access permits are politically complex and expensive. For those following the Bass List, Kosciuszko replaces Carstensz — a gentle 13-kilometre walk in New South Wales that takes a few hours and requires no mountaineering skill whatsoever.</p>

<h2>Famous Seven Summiters</h2>

<p>The Seven Summits challenge has inspired remarkable achievements. Here are some of the most notable completions:</p>

<ul>
<li><strong>Dick Bass (1985):</strong> The first person to complete the Seven Summits (Bass List), reaching the top of Everest at age 55 after climbing the other six peaks. His 1986 book "Seven Summits" popularised the challenge.</li>
<li><strong>Reinhold Messner (1986):</strong> The legendary South Tyrolean mountaineer completed his version of the list (with Carstensz Pyramid instead of Kosciuszko) shortly after Bass. Messner had already made the first solo ascent of Everest without supplemental oxygen.</li>
<li><strong>Junko Tabei (1992):</strong> The first woman to summit Everest (1975) later became the first woman to complete the Seven Summits. Tabei continued climbing until shortly before her death in 2016.</li>
<li><strong>Jordan Romero (2011):</strong> At just 15 years old, the American became the youngest person to complete the Seven Summits (Bass List), having already climbed Kilimanjaro at age 10.</li>
<li><strong>Vanessa O'Brien (2013):</strong> Set the Guinness World Record for the fastest female completion of the Seven Summits — 10 months for both the Bass and Messner Lists.</li>
<li><strong>Steve Plain (2018):</strong> Set the overall speed record at 117 days for all Seven Summits (Messner List), averaging one summit every 17 days.</li>
</ul>

<p>Every one of these climbers stood on the summit of Kilimanjaro. For most of them, it was either the first or second summit in their journey. The mountain holds a unique place in the Seven Summits pantheon — it is the peak that makes the challenge feel possible.</p>

<h2>How to Start Your Seven Summits Journey with Kilimanjaro</h2>

<p>If the Seven Summits challenge appeals to you — whether as a lifetime goal or simply as a framework for planning your next big adventures — Kilimanjaro is the logical starting point. Here is how we recommend approaching it:</p>

<h3>Choose the Right Route</h3>

<p>For a Seven Summits aspirant, we recommend the <a href="/trekking/lemosho-route/">Lemosho Route (7–8 days)</a>. It offers the best acclimatisation profile, traverses the most scenic sections of the mountain, and has a summit success rate exceeding 90%. The extra days on the mountain give you time to learn how your body responds to altitude — invaluable information for planning your subsequent summits. Alternatively, the Northern Circuit (9 days) offers even more acclimatisation time and a circumnavigation of the entire mountain.</p>

<h3>Build Fitness Gradually</h3>

<p>You do not need to be an elite athlete to climb Kilimanjaro, but you do need a solid base of cardiovascular fitness and leg strength. Start training 3–4 months before your climb with regular hiking, stair climbing, and cardio. The best training for altitude is spending time at altitude — if you live near mountains, hike high whenever possible. On the mountain itself, your main job is to walk slowly, breathe deeply, and drink constantly.</p>

<h3>Invest in Good Gear</h3>

<p>Kilimanjaro introduces you to the gear systems you will need on higher peaks. Your down sleeping bag, layering system, mountaineering boots, and headlamp will all serve you on future summits. Buy quality gear for Kilimanjaro and it will last through multiple expeditions. Your summit night on Kilimanjaro — trudging through scree at -20°C in darkness — will teach you exactly which layers work and which fail under pressure.</p>

<h3>Learn from the Experience</h3>

<p>Pay attention to how you acclimatise. Do you get headaches at 4,000 m? Does your appetite disappear above 5,000 m? How does your sleep change at altitude? This data is invaluable for planning your Aconcagua or Denali expedition. Kilimanjaro is not just a summit — it is a high-altitude laboratory where you learn about your own body.</p>

<h3>Plan the Sequence</h3>

<p>The most common Seven Summits sequence after Kilimanjaro is:</p>

<ol>
<li><strong>Kilimanjaro (5,895 m)</strong> — Start here. Build confidence and altitude experience.</li>
<li><strong>Elbrus (5,642 m)</strong> — Similar altitude, introduces snow and ice skills.</li>
<li><strong>Aconcagua (6,961 m)</strong> — Higher altitude, tests endurance and cold tolerance.</li>
<li><strong>Denali (6,190 m)</strong> — Full expedition mountaineering with self-sufficiency.</li>
<li><strong>Carstensz Pyramid (4,884 m)</strong> — Technical rock climbing in remote conditions.</li>
<li><strong>Vinson Massif (4,892 m)</strong> — Antarctic logistics and glacier travel.</li>
<li><strong>Everest (8,849 m)</strong> — The ultimate objective, attempted last with maximum experience.</li>
</ol>

<p>This sequence builds skills progressively — from trekking to snow travel to expedition mountaineering to technical climbing to extreme altitude. Each summit prepares you for the next.</p>

<h2>The Cost of the Seven Summits</h2>

<p>Completing all Seven Summits is a significant financial commitment. Here is a realistic budget estimate for the Messner List:</p>

<ul>
<li><strong>Kilimanjaro:</strong> $2,500–$5,000</li>
<li><strong>Elbrus:</strong> $3,000–$6,000</li>
<li><strong>Aconcagua:</strong> $5,000–$12,000</li>
<li><strong>Denali:</strong> $8,000–$15,000</li>
<li><strong>Carstensz Pyramid:</strong> $15,000–$25,000</li>
<li><strong>Vinson Massif:</strong> $40,000–$55,000</li>
<li><strong>Everest:</strong> $35,000–$100,000</li>
<li><strong>Total (Messner List):</strong> $108,500–$218,000</li>
</ul>

<p>These estimates include expedition fees, permits, flights, gear, and basic travel costs. They do not include training, practice expeditions, or the opportunity cost of time away from work (ranging from 4 months to over a year of accumulated expedition time). The Bass List is cheaper — replacing Carstensz ($15,000–$25,000) with Kosciuszko (essentially free).</p>

<p>Kilimanjaro represents just <strong>2–3% of the total Seven Summits budget</strong>. It is the lowest-cost, lowest-risk, highest-reward entry point into the challenge. Whether you complete all seven or stop at one, the experience of standing on the roof of Africa is worth it on its own. And if you do catch the Seven Summits bug, you will look back on your Kilimanjaro summit and recognise it as the moment everything began.</p>

<p>Ready to start your Seven Summits journey? <a href="/climbing-kilimanjaro/">Explore our Kilimanjaro climbing packages</a> and find the route that fits your schedule and ambition. The <a href="/best-time-to-climb-kilimanjaro/">best time to climb</a> is during the dry seasons — January to mid-March and June to October — when summit success rates are highest.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-national-park",
    title: "Kilimanjaro National Park: Complete UNESCO Heritage Guide",
    metaTitle: "Kilimanjaro National Park — UNESCO Heritage Guide",
    metaDescription:
      "Complete guide to Kilimanjaro National Park: UNESCO status, KINAPA rules, 2026 park fees, entry gates, ecological zones, conservation efforts, and how to visit.",
    excerpt:
      "Kilimanjaro National Park protects Africa's highest peak within a UNESCO World Heritage Site established in 1973. This guide covers KINAPA regulations, all six entry gates, the 2026 park fee structure, five ecological zones from rainforest to arctic summit, conservation challenges including glacial retreat, and practical rules every climber must follow.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "National Parks", slug: "national-parks" },
      { name: "UNESCO", slug: "unesco" },
      { name: "Conservation", slug: "conservation" },
    ],
  },
  {
    slug: "kilimanjaro-seven-summits",
    title:
      "Is Kilimanjaro One of the Seven Summits? The Complete Guide",
    metaTitle: "Kilimanjaro & the Seven Summits — Complete Guide",
    metaDescription:
      "Kilimanjaro is the Africa summit on both Seven Summits lists. Compare all 7 peaks by difficulty, cost, and duration — and why Kili is the best starting point.",
    excerpt:
      "Kilimanjaro is the African representative on both the Bass and Messner versions of the Seven Summits. This guide explains the challenge, compares all seven mountains by difficulty, cost, and duration, profiles famous Seven Summiters, and shows why Kilimanjaro is the most accessible and popular starting point for the ultimate mountaineering challenge.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Seven Summits", slug: "seven-summits" },
      { name: "Mountaineering", slug: "mountaineering" },
      { name: "Adventure", slug: "adventure" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 25a)...\n");

  for (const post of posts) {
    // 1. Upsert category
    const category = await prisma.category.upsert({
      where: { slug: post.categorySlug },
      update: { name: post.categoryName },
      create: { slug: post.categorySlug, name: post.categoryName },
    });

    // 2. Upsert tags
    const tagRecords = [];
    for (const tag of post.tags) {
      const tagRecord = await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: { name: tag.name },
        create: { slug: tag.slug, name: tag.name },
      });
      tagRecords.push(tagRecord);
    }

    // 3. Upsert blog post
    const result = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.trim(),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.trim(),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        featuredImage: FEATURED_IMAGE,
        isPublished: true,
        author: "Emmanuel Moshi",
        publishedAt: new Date("2026-06-18"),
      },
    });

    // 4. Link category via join table (ignore if already linked)
    await prisma.postCategory
      .create({
        data: { postId: result.id, categoryId: category.id },
      })
      .catch(() => {}); // Ignore duplicate

    // 5. Link tags via join table (ignore if already linked)
    for (const tagRecord of tagRecords) {
      await prisma.postTag
        .create({
          data: { postId: result.id, tagId: tagRecord.id },
        })
        .catch(() => {}); // Ignore duplicate
    }

    console.log(`  Upserted: ${post.slug}`);
  }

  console.log(`\nDone — ${posts.length} blog posts upserted.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
