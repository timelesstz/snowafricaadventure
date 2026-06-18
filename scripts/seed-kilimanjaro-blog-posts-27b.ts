/**
 * seed-kilimanjaro-blog-posts-27b.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 27b):
 *  1. kilimanjaro-8-day-itinerary
 *  2. kilimanjaro-vs-table-mountain
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-27b.ts
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
/*  Post 1: kilimanjaro-8-day-itinerary                                */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>The 8-day Lemosho route is the itinerary we recommend more than any other on Kilimanjaro, and it is the one we have guided most often across our 800+ expeditions. It delivers the best combination of scenery, acclimatisation, and summit success — our clients on the 8-day Lemosho consistently achieve a 95% summit rate, compared to 65–70% on shorter routes. This is not a marketing claim. It is a function of altitude physiology: an extra day on the mountain gives your body more time to produce red blood cells and adapt to reduced oxygen pressure. Every additional acclimatisation day above 3,000 metres measurably increases your chances of standing on Uhuru Peak.</p>

<p>This guide breaks down every single day of the 8-day Lemosho itinerary — start and end camps, distances, elevation gains and losses, hiking times, terrain, meals, and the practical tips our guides share with climbers at each stage. If you are comparing routes, read our full <a href="/climbing-kilimanjaro/">Kilimanjaro climbing guide</a> first, then come back here for the day-by-day detail. If you have already booked the Lemosho, this is your trail companion — bookmark it and read each day's section the evening before.</p>

<h2>Why the 8-Day Lemosho Is Our Top Recommendation</h2>

<p>Before we walk through each day, it helps to understand why the Lemosho route earns its reputation. Three factors set it apart from the other six routes on Kilimanjaro.</p>

<h3>Superior Acclimatisation Profile</h3>

<p>The Lemosho route approaches from the west, traverses the entire Shira Plateau, and joins the Southern Circuit for the final push to the summit. This west-to-south traverse gives you exposure to a gradual elevation increase across multiple ecological zones. On Day 4, you climb to the Lava Tower at 4,630 metres before descending to Barranco Camp at 3,960 metres — a classic "climb high, sleep low" profile that is the gold standard for <a href="/kilimanjaro-altitude-sickness/">altitude sickness prevention</a>. No other route executes this acclimatisation pattern as effectively.</p>

<h3>Scenic Diversity</h3>

<p>You will pass through every vegetation zone on Kilimanjaro: montane rainforest, heather moorland, alpine desert, and the arctic summit zone. The Shira Plateau crossing on Days 2–3 offers panoramic views that no other route provides — you can see both the Western Breach and the summit glaciers from the open plateau, with Mount Meru floating above the clouds to the west. It is, without question, the most photogenic route on the mountain.</p>

<h3>Lower Traffic</h3>

<p>The Lemosho trailhead at Londorossi Gate receives significantly fewer climbers than Machame or Marangu gates. The first two days on the route are quiet — you may see only your own team on the trail. From Shira 2 onwards, the Lemosho merges with the Machame route, so the upper mountain is busier, but the lower days provide a genuine wilderness experience that the more popular routes cannot match.</p>

<h2>8-Day Lemosho Elevation Profile</h2>

<table>
<thead>
<tr>
<th>Day</th>
<th>Start Camp</th>
<th>End Camp</th>
<th>Start Elev.</th>
<th>End Elev.</th>
<th>Max Elev.</th>
<th>Distance</th>
<th>Time</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>0</strong></td>
<td>Arusha</td>
<td>Arusha Hotel</td>
<td>1,400 m</td>
<td>1,400 m</td>
<td>1,400 m</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td><strong>1</strong></td>
<td>Londorossi Gate</td>
<td>Mti Mkubwa</td>
<td>2,360 m</td>
<td>2,895 m</td>
<td>2,895 m</td>
<td>7 km</td>
<td>3–4 hrs</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>Mti Mkubwa</td>
<td>Shira 1</td>
<td>2,895 m</td>
<td>3,505 m</td>
<td>3,505 m</td>
<td>8 km</td>
<td>5–6 hrs</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>Shira 1</td>
<td>Shira 2</td>
<td>3,505 m</td>
<td>3,850 m</td>
<td>3,850 m</td>
<td>6 km</td>
<td>4–5 hrs</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td>Shira 2</td>
<td>Barranco</td>
<td>3,850 m</td>
<td>3,960 m</td>
<td>4,630 m</td>
<td>10 km</td>
<td>6–7 hrs</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td>Barranco</td>
<td>Karanga</td>
<td>3,960 m</td>
<td>3,995 m</td>
<td>4,200 m</td>
<td>5 km</td>
<td>4–5 hrs</td>
</tr>
<tr>
<td><strong>6</strong></td>
<td>Karanga</td>
<td>Barafu</td>
<td>3,995 m</td>
<td>4,673 m</td>
<td>4,673 m</td>
<td>4 km</td>
<td>3–4 hrs</td>
</tr>
<tr>
<td><strong>7</strong></td>
<td>Barafu</td>
<td>Mweka</td>
<td>4,673 m</td>
<td>3,100 m</td>
<td>5,895 m</td>
<td>17 km</td>
<td>12–16 hrs</td>
</tr>
<tr>
<td><strong>8</strong></td>
<td>Mweka</td>
<td>Mweka Gate</td>
<td>3,100 m</td>
<td>1,640 m</td>
<td>3,100 m</td>
<td>10 km</td>
<td>3–4 hrs</td>
</tr>
</tbody>
</table>

<h2>Day 0: Arrival in Arusha — Briefing and Final Preparation</h2>

<p>Your expedition begins the moment you land at Kilimanjaro International Airport. Our driver will meet you at arrivals and transfer you to your hotel in Arusha — a drive of approximately 45 minutes. Arusha sits at 1,400 metres, which already gives your body a gentle introduction to moderate altitude. Many climbers arrive from sea-level cities, and even this modest elevation will feel different if you pay attention.</p>

<h3>The Pre-Climb Briefing</h3>

<p>That evening, your lead guide will visit the hotel for a comprehensive briefing. This is not a formality — it is one of the most important hours of your entire expedition. Your guide will walk through the day-by-day itinerary, inspect your gear, answer questions about the route, and discuss your medical history and any medications. If you are taking Diamox (acetazolamide) for <a href="/kilimanjaro-altitude-sickness/">altitude sickness prevention</a>, this is when your guide will confirm your dosage and timing protocol.</p>

<p><strong>What to do today:</strong> Rest. Hydrate. Eat a good dinner with complex carbohydrates. Repack your duffel bag — maximum 15 kg, weighed at the gate. Charge all electronics. Review the <a href="/kilimanjaro-climbing-gear/">gear checklist</a> one final time and hand over any items you will not need on the mountain to the hotel for storage.</p>

<h2>Day 1: Londorossi Gate to Mti Mkubwa Camp — The Rainforest</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>7 km</td></tr>
<tr><td><strong>Elevation gain</strong></td><td>+535 m (2,360 m → 2,895 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>3–4 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Dense montane rainforest, muddy trail, tree roots</td></tr>
<tr><td><strong>Meals</strong></td><td>Lunch (packed or at gate), dinner at camp</td></tr>
</tbody>
</table>

<p>The drive from Arusha to Londorossi Gate takes about 3–4 hours, passing through the town of Arusha, then Moshi, and climbing up through coffee and banana plantations to the western side of Kilimanjaro. At Londorossi Gate (2,360 m), you will register with the Tanzania National Parks Authority (TANAPA), your porters will have their loads weighed and checked, and your permit will be validated. This process takes 1–2 hours — use it to apply sunscreen, adjust your daypack, and eat your packed lunch.</p>

<p>The trail enters the montane rainforest immediately. This is Kilimanjaro at its most primal — ancient hardwood trees draped in moss and lichen, colobus monkeys crashing through the canopy above you, and the constant soundtrack of bird calls. The path is well-defined but often muddy, especially during the rainy season. Gaiters are useful here. The gradient is moderate and steady, winding uphill through the forest with occasional switchbacks.</p>

<p><strong>Mti Mkubwa Camp (Big Tree Camp)</strong> sits in a small clearing in the forest at 2,895 metres. The camp is named after an enormous fig tree near the campsite. You will arrive in the late afternoon to find your tent already erected and your dining tent set up. Dinner is hot — typically soup, followed by a main course of chicken or beef with rice and vegetables, and fruit for dessert. Our cooks are among the best on Kilimanjaro, and the quality of the food genuinely surprises most climbers.</p>

<p><strong>Guide tip:</strong> Drink at least 3 litres of water today. The rainforest humidity masks your fluid loss — you are sweating more than you realise. Start your hydration discipline on Day 1 and maintain it for the entire climb.</p>

<h2>Day 2: Mti Mkubwa to Shira 1 Camp — Into the Heath Zone</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>8 km</td></tr>
<tr><td><strong>Elevation gain</strong></td><td>+610 m (2,895 m → 3,505 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>5–6 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Steep forest exit, open heath and moorland</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch (trail), dinner at camp</td></tr>
</tbody>
</table>

<p>Day 2 is the transition day. You start in the upper rainforest and by lunchtime you have emerged into the heath and moorland zone — the shift is dramatic. The forest canopy thins, the trees shrink to stunted heathers and giant groundsels, and the views open up for the first time. On a clear morning, you can see Mount Meru to the east and the vast Shira Plateau stretching out ahead of you to the west.</p>

<p>The morning climb is the steepest section of the day, ascending through the last of the forest on a narrow trail. After 2–3 hours, you cross the forest boundary and enter open moorland. The gradient eases and the trail widens. Lunch is served on the trail — our crew sets up a portable table with a hot meal, which never fails to amaze first-time Kilimanjaro climbers.</p>

<p><strong>Shira 1 Camp</strong> sits at 3,505 metres on the edge of the Shira Plateau. This is your first night above 3,000 metres, and some climbers will notice mild symptoms of altitude — slight headache, reduced appetite, or difficulty sleeping. All of these are normal. Your guide will perform the first of the twice-daily health checks here, measuring your blood oxygen saturation (SpO2) and heart rate with a pulse oximeter.</p>

<p><strong>Guide tip:</strong> Tonight you cross the 3,000-metre threshold where altitude effects begin. Sleep with your head slightly elevated (stuff a jacket under the head end of your sleeping pad). If you have a headache, ibuprofen is fine — but tell your guide so they can monitor you.</p>

<h2>Day 3: Shira 1 to Shira 2 Camp — The Plateau Crossing</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>6 km</td></tr>
<tr><td><strong>Elevation gain</strong></td><td>+345 m (3,505 m → 3,850 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>4–5 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Open moorland plateau, gentle undulations</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch (trail), dinner at camp</td></tr>
</tbody>
</table>

<p>This is the day that makes the Lemosho route special. The Shira Plateau is one of Kilimanjaro's three volcanic cones — it collapsed roughly 500,000 years ago, creating a vast, flat expanse at nearly 4,000 metres. Crossing it feels like walking across another planet. The vegetation is sparse — giant lobelias and senecios punctuate the rocky grassland, and the sky feels enormous above you.</p>

<p>The walking is gentle. The gradient across the plateau rarely exceeds 5%, and the trail is wide and well-marked. This is by design — Day 3 is an active rest day, allowing your body to acclimatise at altitude without the stress of a steep climb. You gain only 345 metres over 6 kilometres, which is deliberately conservative.</p>

<p>To the east, the Kibo cone — the summit — dominates the horizon. The Western Breach and the Arrow Glacier are visible from the plateau on clear days, and you can trace the route that the more technical climbers use to approach the summit from the west. Your route, the standard Lemosho, swings south instead, joining the Machame route at Shira 2.</p>

<p><strong>Shira 2 Camp</strong> at 3,850 metres is a larger campsite, and this is where you may encounter climbers from the Machame route for the first time. The camp has good facilities by Kilimanjaro standards — flat tent platforms, a ranger station, and clean water sources. Sunset from Shira 2 is legendary — the plateau glows orange and the silhouette of Mount Meru appears to float above the cloud layer.</p>

<p><strong>Guide tip:</strong> Use the easy pace of today to focus on eating. Altitude suppresses appetite, but you need calories. Force yourself to eat everything on your plate — your body is burning 4,000–5,000 calories per day at this altitude, and you cannot replace that on trail snacks alone.</p>

<h2>Day 4: Shira 2 to Barranco Camp via Lava Tower — The Acclimatisation Day</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>10 km</td></tr>
<tr><td><strong>Elevation gain/loss</strong></td><td>+780 m / −670 m (3,850 m → 4,630 m → 3,960 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>6–7 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Alpine desert, volcanic rock, steep descent</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch at Lava Tower, dinner at camp</td></tr>
</tbody>
</table>

<p>Day 4 is the most important day of the entire itinerary for acclimatisation, and it is the reason the 8-day Lemosho has such a high summit success rate. You will climb from 3,850 metres to the Lava Tower at 4,630 metres — higher than the summit of Mont Blanc — before descending 670 metres to Barranco Camp at 3,960 metres. This "climb high, sleep low" profile is the single most effective acclimatisation strategy in altitude medicine. Your body gets a controlled dose of high altitude during the day, then recovers at a lower sleeping elevation overnight.</p>

<p>The morning climb across the alpine desert is stark and beautiful. Vegetation disappears almost entirely — you are walking across volcanic rubble and scree with only the hardiest lichens clinging to the rocks. The Lava Tower itself is a 300-foot volcanic plug — a tower of solidified magma that resisted erosion when the surrounding rock wore away. Your crew will serve a hot lunch at the base of the Lava Tower, and this is a popular photo spot.</p>

<p>Pay attention to how you feel at the Lava Tower. At 4,630 metres, you are in genuine high altitude. Headache, nausea, shortness of breath, and fatigue are common — and expected. This is exactly why you are here. Your body is receiving the altitude stimulus it needs to trigger red blood cell production and respiratory adaptation. If symptoms are mild, you are acclimatising well. If symptoms are severe, your guide will assess whether the descent to Barranco will resolve them or whether medical intervention is needed.</p>

<p>The descent from the Lava Tower to Barranco Camp takes 2–3 hours and drops you back into the moorland zone. <strong>Barranco Camp</strong> at 3,960 metres is spectacularly located in a valley beneath the Barranco Wall, with the summit glaciers visible above. Most climbers feel dramatically better after descending — the relief of dropping 670 metres after spending several hours at 4,630 metres is immediate and tangible.</p>

<p><strong>Guide tip:</strong> Do not rush the Lava Tower section. Walk at the slowest pace you have used so far. Breathe deliberately — inhale through your nose for four counts, exhale through your mouth for six counts. If you feel a headache developing, slow down further. The goal is not to reach the Lava Tower quickly — the goal is to spend time at altitude and then sleep low.</p>

<h2>Day 5: Barranco Camp to Karanga Camp — The Barranco Wall</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>5 km</td></tr>
<tr><td><strong>Elevation gain</strong></td><td>+240 m / −200 m (3,960 m → 4,200 m → 3,995 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>4–5 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Rocky scramble (Barranco Wall), alpine desert trail</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch (trail), dinner at camp</td></tr>
</tbody>
</table>

<p>Day 5 begins with the most famous feature on the entire mountain — the Barranco Wall. This 257-metre rock face looks intimidating from below, and climbers often stare up at it the evening before with a mixture of excitement and anxiety. Here is the truth: the Barranco Wall is a scramble, not a technical climb. You use your hands for balance and to pull yourself up over rocky ledges, but at no point are you roped up or using climbing equipment. In our 800+ expeditions, we have guided thousands of climbers up the Barranco Wall, from 12-year-olds to 75-year-olds, and the vast majority describe it as the highlight of the entire trek.</p>

<p>The wall takes 1.5–2 hours to ascend. Your guide will be right behind you, directing your hand and foot placements on the trickier sections. The infamous "Kissing Rock" — a section where you press your body against the rock face while shuffling sideways along a narrow ledge — sounds terrifying but takes about 10 seconds and has a wide, safe ledge to stand on. Once you top out on the Barranco Wall, you are rewarded with sweeping views of the southern glaciers and the Heim Glacier directly ahead.</p>

<p>After the wall, the trail traverses across alpine desert terrain through several small valleys and ridgelines before descending slightly to <strong>Karanga Camp</strong> at 3,995 metres. This is the last water point on the route — all water for summit night and the descent will be carried from here. The afternoon is short, giving you time to rest, eat, and prepare mentally for the final two days.</p>

<p><strong>Guide tip:</strong> On the Barranco Wall, keep your hips close to the rock. The most common mistake is leaning backward — this shifts your centre of gravity away from the wall and makes you feel less stable. Lean in, trust your feet, and follow your guide's hand placements exactly. Also, wear your thinnest gloves — you need finger dexterity for the scramble.</p>

<h2>Day 6: Karanga Camp to Barafu Base Camp — The Final Approach</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>4 km</td></tr>
<tr><td><strong>Elevation gain</strong></td><td>+678 m (3,995 m → 4,673 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>3–4 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Steep scree and rock, exposed ridge</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch at camp, early dinner</td></tr>
</tbody>
</table>

<p>Day 6 is deliberately short. You climb from Karanga at 3,995 metres to Barafu Base Camp at 4,673 metres — a gain of 678 metres over just 4 kilometres. The trail is steep and exposed, crossing rocky ridgelines with views down into the Karanga Valley on one side and the vast southern ice fields above. By the time you reach Barafu, you are higher than the summit of Mont Blanc and deep in the alpine desert zone. Nothing grows here. The landscape is scree, rock, and ice.</p>

<p><strong>Barafu Camp</strong> (meaning "ice" in Swahili) is your launch point for the summit. The camp sits on a rocky ridge with limited flat ground — tent platforms are carved into the scree slope. It is exposed to wind from all directions, and temperatures drop below freezing as soon as the sun sets. You will arrive by lunchtime, eat an early dinner at 6:00 PM, and then attempt to sleep until your guide wakes you between 11:00 PM and midnight for the summit push.</p>

<p><strong>What your guide will tell you at Barafu:</strong> Lay out every piece of clothing you will wear for summit night. Dress in the tent before you step outside — it is too cold and windy to fumble with layers in the dark. Fill your water bottles with warm water (it stays liquid longer) and insulate them inside your pack or inside a sock. Eat as much dinner as you can — you will burn 2,000–3,000 calories between midnight and noon tomorrow.</p>

<p>Prepare your summit pack: headlamp with fresh batteries (plus a spare), warm water, high-energy snacks (chocolate, nuts, energy gels), camera, and your <a href="/kilimanjaro-climbing-gear/">summit-night layering system</a>. Then get into your sleeping bag. You probably will not sleep — the altitude, the excitement, and the cold make sleep nearly impossible at Barafu. That is normal. Rest with your eyes closed, and trust that your body is recovering even if your mind is racing.</p>

<h2>Day 7: Summit Night — Barafu to Uhuru Peak to Mweka Camp</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>5 km up + 12 km down = 17 km</td></tr>
<tr><td><strong>Elevation gain/loss</strong></td><td>+1,222 m / −2,795 m (4,673 m → 5,895 m → 3,100 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>6–8 hrs up + 6–8 hrs down = 12–16 hrs total</td></tr>
<tr><td><strong>Terrain</strong></td><td>Loose scree, switchbacks, glacial zone, steep descent</td></tr>
<tr><td><strong>Meals</strong></td><td>Midnight snack, summit snacks, lunch at Barafu, dinner at Mweka</td></tr>
</tbody>
</table>

<p>This is the day everything has been building toward. Your guide will wake you between 11:00 PM and midnight. You dress in your full summit layering system inside the tent: thermal base layer, fleece mid-layer, insulated down jacket, windproof shell, thermal leggings, waterproof trousers, balaclava, two pairs of gloves (liner + insulated), and your warmest hat. You drink hot tea, eat a few biscuits, strap on your headlamp, and step into the darkness.</p>

<p>The night is cold — typically minus 10 to minus 20 degrees Celsius with wind chill. Your headlamp illuminates a cone of light on the scree path ahead. Above you, a serpentine chain of headlamps from other climbing teams traces the switchbacks up the mountain like a string of stars. The first 3–4 hours are a relentless grind up loose scree — two steps forward, one step sliding back. The pace is painfully slow, deliberately so. Pole pole. Your guide sets a rhythm and you follow it. Do not think about the summit. Think about the next step.</p>

<p>Around 5:00–5:30 AM, you reach <strong>Stella Point</strong> at 5,756 metres — the rim of the volcanic crater. This is the emotional turning point. The sky is lightening in the east, and for the first time you can see where you are. You are standing on the edge of the crater, surrounded by glaciers and a 360-degree horizon. Many climbers cry at Stella Point. Some sit down and need a moment. You have earned this.</p>

<p>From Stella Point to <strong>Uhuru Peak</strong> at 5,895 metres, it is a 45-minute to 1-hour walk along the crater rim. The trail is gentle — a slight uphill across packed volcanic ash and ice. The summit glaciers tower to your left, and the crater drops away to your right. As you approach the iconic Uhuru Peak sign, the sun is rising over the African continent below you. You are standing on the highest point in Africa, 5,895 metres above sea level, the Roof of Africa.</p>

<p>You spend 15–20 minutes at the summit. Photos, tears, celebration, disbelief. Then your guide will firmly but kindly tell you it is time to go down. Staying too long at 5,895 metres is dangerous — every minute at this altitude is depleting your oxygen reserves. The descent to Barafu takes 2–3 hours via the same scree path, which you now ski-slide down in great plunging steps. You collect your gear at Barafu, eat lunch, and continue descending to <strong>Mweka Camp</strong> at 3,100 metres. By the time you reach Mweka in the late afternoon, you will have been hiking for 14–16 hours. You will be more tired than you have ever been in your life. You will also be more proud.</p>

<p><strong>Guide tip:</strong> The mental game on summit night is harder than the physical one. Break it into segments: Barafu to the first rest stop (1.5 hours), rest stop to Stella Point (2.5 hours), Stella Point to Uhuru (1 hour). Do not look up — it makes the distance feel infinite. Look at the ground, match your breathing to your steps, and trust your guide's pace. If you trained according to our <a href="/kilimanjaro-training-plan/">Kilimanjaro training plan</a>, your body is ready. Your mind just needs to stay in the moment.</p>

<h2>Day 8: Mweka Camp to Mweka Gate — The Certificate Ceremony</h2>

<table>
<thead>
<tr><th>Detail</th><th>Info</th></tr>
</thead>
<tbody>
<tr><td><strong>Distance</strong></td><td>10 km</td></tr>
<tr><td><strong>Elevation loss</strong></td><td>−1,460 m (3,100 m → 1,640 m)</td></tr>
<tr><td><strong>Hiking time</strong></td><td>3–4 hours</td></tr>
<tr><td><strong>Terrain</strong></td><td>Steep descent through moorland into rainforest</td></tr>
<tr><td><strong>Meals</strong></td><td>Breakfast, lunch at gate</td></tr>
</tbody>
</table>

<p>The final day is a descent through the southern rainforest to Mweka Gate. Your legs will be stiff, your knees will protest on the downhill, and your energy levels will be depleted — but the walking is straightforward and mostly downhill. The trail drops steeply through the moorland zone, then re-enters the rainforest canopy. The humidity feels luxurious after five days in the dry alpine desert. Birdsong returns. The air thickens with oxygen, and you can feel your lungs filling more deeply with each breath.</p>

<p>At <strong>Mweka Gate</strong> (1,640 m), you sign out of the national park register and receive your summit certificate. Climbers who reached Uhuru Peak (5,895 m) receive a gold certificate. Those who reached Stella Point (5,756 m) receive a green certificate. This is also the moment to tip your crew — guides, porters, cooks, and the camp manager. Tipping is an important part of the Kilimanjaro economy, and our <a href="/kilimanjaro-prices/">pricing page</a> includes guidance on recommended tipping amounts.</p>

<p>After the certificate ceremony and a celebratory lunch at the gate, your driver will transfer you back to your hotel in Arusha. Most climbers go straight to a hot shower, then a cold beer, then sleep for 12 hours. You have just climbed the tallest freestanding mountain on Earth.</p>

<h2>What to Do After the Climb</h2>

<p>Many of our climbers extend their trip with a <a href="/trekking/">Tanzania safari</a> or a few days of rest in Arusha. After eight days on the mountain, your body needs recovery time — we recommend at least one full rest day before flying home or embarking on a safari. Some climbers add a 2-day trip to Tarangire or a 3-day Serengeti extension. After what you have just accomplished, you deserve to see the wildlife that shares this extraordinary landscape with Kilimanjaro.</p>

<p>If you are ready to book your 8-day Lemosho expedition, visit our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing page</a> for current prices, departure dates, and booking details. Our team has guided this route more times than we can count, and we would be honoured to guide you next.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-vs-table-mountain                              */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>Africa has two mountains that transcend geography and become symbols. Kilimanjaro — the snow-capped volcanic giant rising from the Tanzanian plains — and Table Mountain — the flat-topped sentinel guarding Cape Town's harbour. Almost every traveller who visits either country asks the same question: how do they compare? And increasingly, we hear a follow-up: can I do both in one trip? In our 800+ Kilimanjaro expeditions, we have spoken to hundreds of climbers who combined these two mountains into a single African adventure. This guide compares every dimension that matters — height, difficulty, cost, logistics, timing, wildlife, and the experience of standing on top of each one.</p>

<h2>At a Glance: Kilimanjaro vs Table Mountain</h2>

<table>
<thead>
<tr>
<th>Factor</th>
<th>Kilimanjaro</th>
<th>Table Mountain</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Height</strong></td>
<td>5,895 m (19,341 ft)</td>
<td>1,085 m (3,558 ft)</td>
</tr>
<tr>
<td><strong>Location</strong></td>
<td>Northern Tanzania, East Africa</td>
<td>Cape Town, South Africa</td>
</tr>
<tr>
<td><strong>Type</strong></td>
<td>Stratovolcano (dormant)</td>
<td>Sandstone mesa (flat-topped)</td>
</tr>
<tr>
<td><strong>Duration</strong></td>
<td>7–9 days (expedition)</td>
<td>2–4 hours (day hike) or 5-minute cable car</td>
</tr>
<tr>
<td><strong>Difficulty</strong></td>
<td>Strenuous multi-day trek, high altitude</td>
<td>Easy to moderate day hike</td>
</tr>
<tr>
<td><strong>Fitness required</strong></td>
<td>Good aerobic fitness, months of training</td>
<td>Basic fitness, no training needed</td>
</tr>
<tr>
<td><strong>Technical skills</strong></td>
<td>None (walking only)</td>
<td>None (walking / cable car)</td>
</tr>
<tr>
<td><strong>Cost</strong></td>
<td>$1,850–$4,000+ (all-inclusive expedition)</td>
<td>Free (hiking) / ~$20 (cable car round trip)</td>
</tr>
<tr>
<td><strong>Guide required?</strong></td>
<td>Yes, legally mandatory</td>
<td>No, but recommended</td>
</tr>
<tr>
<td><strong>Permits</strong></td>
<td>Park fees ~$800+ (included in package)</td>
<td>Free entry to Table Mountain National Park</td>
</tr>
<tr>
<td><strong>Best months</strong></td>
<td>January–March, June–October</td>
<td>November–March (Southern Hemisphere summer)</td>
</tr>
<tr>
<td><strong>Summit success rate</strong></td>
<td>65–85% (route-dependent)</td>
<td>99%+ (weather-dependent)</td>
</tr>
<tr>
<td><strong>Altitude risk</strong></td>
<td>High (altitude sickness above 3,000 m)</td>
<td>None</td>
</tr>
<tr>
<td><strong>Wildlife</strong></td>
<td>Colobus monkeys, birds, limited mammals</td>
<td>Dassies (rock hyrax), baboons, birds</td>
</tr>
<tr>
<td><strong>UNESCO status</strong></td>
<td>UNESCO World Heritage Site</td>
<td>New7Wonders of Nature</td>
</tr>
</tbody>
</table>

<h2>Height and Geography</h2>

<p>The scale difference is almost absurd. <strong>Kilimanjaro stands at 5,895 metres</strong> — the highest point in Africa, the tallest freestanding mountain on Earth, and one of the Seven Summits. <strong>Table Mountain stands at 1,085 metres</strong> — lower than many European ski resort villages. Kilimanjaro would need to be stacked nearly 5.5 times on top of itself to match Everest, but Table Mountain would need to be stacked more than 5 times to match Kilimanjaro. They exist in completely different categories of elevation.</p>

<p>Geologically, they are just as different. Kilimanjaro is a <strong>dormant stratovolcano</strong> formed roughly 2.5 million years ago through successive eruptions that built three distinct cones: Shira, Mawenzi, and Kibo. Kibo — the summit cone — last erupted about 360,000 years ago, and its crater still contains fumaroles that emit volcanic gases. It is dormant, not extinct. Table Mountain is approximately <strong>600 million years old</strong>, making it one of the oldest mountains on Earth. It is composed of sandstone and was shaped by erosion, not volcanic activity. Its flat top — the "tablecloth" — was once the floor of a shallow sea.</p>

<h2>The Climbing Experience</h2>

<h3>Kilimanjaro: A Multi-Day Expedition</h3>

<p>Climbing Kilimanjaro is not a hike — it is an expedition. You spend 7–9 days on the mountain, sleeping in tents at progressively higher camps, supported by a crew of guides, porters, and cooks. The physical challenge is moderate but sustained: you walk 5–10 kilometres per day across terrain that ranges from rainforest to alpine desert to glacial ice. The real challenge is altitude. Above 4,000 metres, the air contains roughly 40% less oxygen than at sea level. <a href="/kilimanjaro-altitude-sickness/">Altitude sickness</a> is the primary reason climbers fail to summit — not physical fitness, not cold, not distance.</p>

<p>Summit night is the defining moment. You leave base camp at midnight and climb for 6–8 hours through freezing darkness, reaching Uhuru Peak at sunrise. It is the hardest physical and mental effort most people will ever experience. The reward is standing on the Roof of Africa with the curvature of the Earth visible on the horizon and the sun painting the glaciers gold. For a complete guide to routes, preparation, and what to expect, see our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing guide</a>.</p>

<h3>Table Mountain: A Day Hike or Cable Car Ride</h3>

<p>Table Mountain can be experienced in an afternoon. The most popular hiking route — Platteklip Gorge — takes 1.5–2.5 hours to ascend via a steep but well-maintained stone staircase cut into the face of the mountain. The India Venster route is more scenic, traversing the front face through rocky scrambles with views of the Twelve Apostles. Skeleton Gorge on the back side passes through indigenous forest and is shaded and cooler. All routes reach the same flat summit plateau.</p>

<p>Alternatively, you ride the <strong>Table Mountain Aerial Cableway</strong> — a revolving cable car that takes 5 minutes to ascend from the lower station to the top. The cable car rotates 360 degrees during the ascent, giving passengers panoramic views of Cape Town, Robben Island, and the Atlantic Ocean. A return ticket costs approximately 400 South African Rand (roughly $22 USD). For those who want the hike up but prefer to save their knees, a one-way cable car ticket down costs about 290 ZAR.</p>

<p>On the summit plateau, well-maintained walking paths criss-cross the flat top. You can walk the full circuit in 2–3 hours, stopping at various viewpoints that overlook Camps Bay, the Cape Flats, and False Bay. The summit restaurant and cafe serve coffee, meals, and cold drinks. There is mobile phone reception on the summit. It is, in every sense, a civilised mountain experience.</p>

<h2>Difficulty and Fitness</h2>

<p>Kilimanjaro requires serious preparation. We recommend a minimum of <a href="/kilimanjaro-training-plan/">8–12 weeks of structured training</a> before the climb, including cardiovascular fitness, leg strength, and ideally some altitude exposure. The trek itself is not technically difficult — no ropes, crampons, or climbing skills are needed — but the combination of sustained daily hiking, altitude stress, cold temperatures, and sleep deprivation makes it physically and mentally demanding. Summit night alone involves 12–16 hours of continuous effort.</p>

<p>Table Mountain requires basic fitness. If you can walk up stairs for 90 minutes without stopping, you can hike Platteklip Gorge. The India Venster route involves some easy scrambling and requires a moderate level of fitness and confidence on rocky terrain. No route on Table Mountain involves altitude risk, extreme cold, or overnight camping. You walk up, enjoy the view, and walk or ride back down. The cable car requires no fitness at all.</p>

<h2>Cost Comparison</h2>

<p>The cost difference is stark. A Kilimanjaro expedition with a reputable operator — including park fees, crew wages, food, camping equipment, and transfers — costs between <strong>$1,850 and $4,000+</strong> depending on the route, duration, and level of service. The 8-day Lemosho route, our most recommended option, falls in the $2,500–$3,500 range with our company. For a detailed breakdown of what you pay and where the money goes, see our <a href="/kilimanjaro-prices/">Kilimanjaro pricing guide</a>.</p>

<p>Table Mountain costs almost nothing. Hiking is free — there are no park entry fees for day visitors. The cable car costs approximately $22 round trip. A guided hike with a local operator costs $30–$60 per person. Even including lunch at the summit restaurant and a souvenir, you are unlikely to spend more than $80 for the full Table Mountain experience.</p>

<h3>Full Trip Cost Including Flights and Accommodation</h3>

<table>
<thead>
<tr>
<th>Cost Item</th>
<th>Kilimanjaro (Tanzania)</th>
<th>Table Mountain (South Africa)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>International flights</strong></td>
<td>$600–$1,500 (to JRO/KIA)</td>
<td>$500–$1,200 (to CPT)</td>
</tr>
<tr>
<td><strong>Expedition/activity</strong></td>
<td>$1,850–$4,000</td>
<td>$0–$80</td>
</tr>
<tr>
<td><strong>Accommodation</strong></td>
<td>$50–$150/night (Arusha hotel, 2–3 nights)</td>
<td>$80–$300/night (Cape Town hotel)</td>
</tr>
<tr>
<td><strong>Visa</strong></td>
<td>$50 (Tanzania e-visa)</td>
<td>Free for most nationalities</td>
</tr>
<tr>
<td><strong>Gear</strong></td>
<td>$300–$800 (if buying new)</td>
<td>$0–$50 (hiking shoes only)</td>
</tr>
<tr>
<td><strong>Total estimate</strong></td>
<td><strong>$3,000–$6,500</strong></td>
<td><strong>$600–$1,700</strong></td>
</tr>
</tbody>
</table>

<h2>Best Time to Visit</h2>

<p>The optimal timing for each mountain differs because they sit in different hemispheres. <strong>Kilimanjaro's best climbing months</strong> are January to mid-March (dry and warm, coinciding with Tanzania's short dry season) and June to October (the long dry season, colder but clearest skies). The shoulder months of December and late March can work but carry higher rain risk. For detailed month-by-month conditions, check our <a href="/climbing-kilimanjaro/">route guides</a>.</p>

<p><strong>Table Mountain's best months</strong> are November to March — the Southern Hemisphere summer. Days are long (sunset after 8 PM in December), skies are generally clear, and temperatures range from 20–30°C. The cable car operates year-round but closes during high winds, which are more common in winter (June–August). Cape Town's winter brings rain and the famous "tablecloth" cloud that drapes over the summit, obscuring views. If clear views matter to you — and they should — visit in summer.</p>

<h3>Combining Both: The Best Window</h3>

<p>The overlap window for both mountains is <strong>January to early March</strong> and <strong>late November to December</strong>. During these periods, Tanzania is in a dry or shoulder season and Cape Town is in full summer. You can climb Kilimanjaro first (7–9 days), fly from Kilimanjaro Airport (JRO) to Cape Town (CPT) — there are connecting flights through Nairobi, Addis Ababa, or Johannesburg — and hike Table Mountain the following day. Several of our clients have done exactly this, and the contrast between the two experiences makes both more memorable.</p>

<h2>Wildlife</h2>

<p>Kilimanjaro is part of a national park, but the wildlife on the mountain itself is limited. In the lower rainforest zone, you may see <strong>black-and-white colobus monkeys</strong>, blue monkeys, and a variety of birds including Hartlaub's turaco. Above the forest line, wildlife is sparse — occasional eland, buffalo (rarely), and small rodents. The mountain is not a safari destination. However, the greater Kilimanjaro ecosystem — including Amboseli National Park in Kenya, directly across the border — is home to elephants, lions, zebra, and giraffe. Many climbers combine their Kilimanjaro trek with a <a href="/trekking/">Tanzania safari</a> to see the Big Five.</p>

<p>Table Mountain National Park, despite being inside a major city, is home to <strong>dassies (rock hyraxes)</strong> — small, furry mammals that are surprisingly the closest living relative of the elephant. You will see them sunbathing on rocks at the summit. Chacma baboons inhabit the slopes and are notorious for raiding unattended bags. The fynbos vegetation on Table Mountain is part of the <strong>Cape Floristic Region</strong>, one of only six floral kingdoms on Earth and a UNESCO World Heritage Site. It contains more plant species per square kilometre than any rainforest on the planet.</p>

<h2>Accessibility and Logistics</h2>

<h3>Getting to Kilimanjaro</h3>

<p>Most climbers fly into Kilimanjaro International Airport (JRO) or Julius Nyerere International Airport (DAR) in Dar es Salaam, then take a domestic connection or overland transfer. From Arusha — the staging city for Kilimanjaro climbs — the drive to the trailhead takes 2–4 hours depending on the route. You need a valid passport, a Tanzania e-visa ($50), and vaccinations for yellow fever if arriving from an endemic country. Your operator handles all ground logistics — transfers, permits, crew, and equipment.</p>

<h3>Getting to Table Mountain</h3>

<p>Table Mountain is in central Cape Town. Cape Town International Airport (CPT) receives direct flights from major European, Middle Eastern, and African hubs. From the airport to the Table Mountain lower cable car station is a 30-minute drive. From most Cape Town hotels, Table Mountain is a 10–20-minute Uber ride. No permit, visa (for most nationalities), or special equipment is needed. You can decide to hike Table Mountain the morning of, with no advance booking required.</p>

<h2>The Emotional Experience</h2>

<p>This is where numbers stop mattering. Standing on Uhuru Peak at sunrise, at 5,895 metres, after 7 days of effort, cold, exhaustion, and doubt — that moment rewires something in your brain. It is not just a view; it is evidence that you did something you were not sure you could do. Climbers routinely describe it as one of the defining moments of their lives. The challenge is the point. If it were easy, it would not change you.</p>

<p>Table Mountain delivers a different kind of awe. The summit view — Cape Town sprawling below, Robben Island glinting in the Atlantic, the Twelve Apostles marching south along the coast — is one of the most beautiful urban panoramas on Earth. It is not earned through suffering; it is a gift. You hike for two hours (or ride a cable car for five minutes) and receive one of the world's great views. The beauty is effortless and immediate, and that is its own kind of profound.</p>

<p>Many climbers who have done both say the experiences are complementary, not competitive. One is a test. The other is a celebration. And doing them back-to-back — the brutal effort of Kilimanjaro followed by the effortless beauty of Table Mountain — creates a travel memory that is greater than the sum of its parts.</p>

<h2>Can You Do Both in One Trip?</h2>

<p>Absolutely. A Tanzania + South Africa itinerary is one of the most rewarding multi-country trips in Africa. Here is a sample 14-day itinerary that includes both mountains:</p>

<ul>
<li><strong>Days 1–2:</strong> Fly to Kilimanjaro. Arrive in Arusha. Pre-climb briefing and gear check.</li>
<li><strong>Days 3–10:</strong> 8-day <a href="/climbing-kilimanjaro/">Lemosho route</a> on Kilimanjaro.</li>
<li><strong>Day 11:</strong> Rest day in Arusha. Massage, hot shower, celebratory dinner.</li>
<li><strong>Day 12:</strong> Fly JRO → CPT (connecting through NBO or ADD). Arrive Cape Town evening.</li>
<li><strong>Day 13:</strong> Hike Table Mountain via Platteklip Gorge. Cable car down. Sunset drinks at Camps Bay.</li>
<li><strong>Day 14:</strong> Cape Town exploration (Robben Island, V&A Waterfront, Bo-Kaap). Depart.</li>
</ul>

<p>For climbers who want a safari as well, extend the itinerary: add 2–3 days for a Serengeti or Tarangire safari after Kilimanjaro and before flying to Cape Town. A 17–18-day itinerary gives you Kilimanjaro, a Tanzania safari, and Cape Town — three of Africa's greatest experiences in a single trip.</p>

<h2>Which Should You Do First?</h2>

<p>If you are planning to do both mountains on the same trip, <strong>do Kilimanjaro first</strong>. There are practical reasons: Kilimanjaro requires peak fitness and a clear schedule (no distractions, no jet lag, no late nights), so tackle it first while you are freshest. Table Mountain is flexible — you can adjust your hike day based on weather, and a sore body from Kilimanjaro will not prevent you from riding the cable car.</p>

<p>There is an emotional logic too. After 8 days of effort on Kilimanjaro — the cold, the exhaustion, the predawn summit push — arriving in Cape Town feels like stepping into a warm embrace. The contrast between Kilimanjaro's austere, earn-every-metre challenge and Table Mountain's effortless, sun-drenched beauty creates one of the great narrative arcs of adventure travel. You do the hard thing first, then you celebrate.</p>

<h2>The Verdict</h2>

<p>Kilimanjaro and Table Mountain are not competitors. They are two expressions of the same continent — one forged by fire, the other carved by time. Kilimanjaro offers transformation through challenge. Table Mountain offers beauty without conditions. Together, they tell the full story of Africa's mountains: immense, varied, and endlessly worth the journey. If you are ready to start with the challenge, visit our <a href="/climbing-kilimanjaro/">Kilimanjaro climbing page</a> to explore routes, pricing, and departure dates. Africa's two most iconic peaks are waiting.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post metadata array                                                */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-8-day-itinerary",
    title:
      "Kilimanjaro 8-Day Lemosho Itinerary: Day-by-Day Guide",
    excerpt:
      "A complete day-by-day breakdown of the 8-day Lemosho route — camps, distances, elevation, terrain, meals, and guide tips for every stage from Londorossi Gate to Uhuru Peak.",
    content: post1Content,
    metaTitle: "8-Day Lemosho Itinerary: Day-by-Day Kili Guide",
    metaDescription:
      "Complete day-by-day guide to the 8-day Lemosho route on Kilimanjaro. Camps, distances, elevation profiles, meals, and insider tips from 800+ expeditions.",
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Lemosho Route", slug: "lemosho-route" },
      { name: "Itinerary", slug: "itinerary" },
      { name: "Acclimatisation", slug: "acclimatisation" },
    ],
  },
  {
    slug: "kilimanjaro-vs-table-mountain",
    title:
      "Kilimanjaro vs Table Mountain: Africa's Iconic Peaks Compared",
    excerpt:
      "Comprehensive comparison of Africa's two most famous mountains — height, difficulty, cost, duration, wildlife, best time to visit, and how to combine both in one trip.",
    content: post2Content,
    metaTitle: "Kilimanjaro vs Table Mountain: Full Comparison",
    metaDescription:
      "Kilimanjaro (5,895 m) vs Table Mountain (1,085 m) compared: cost, difficulty, duration, best season, wildlife, and a 14-day itinerary combining both peaks.",
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Mountain Comparison", slug: "mountain-comparison" },
      { name: "Table Mountain", slug: "table-mountain" },
      { name: "Travel Planning", slug: "travel-planning" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 27b)...\n");

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
