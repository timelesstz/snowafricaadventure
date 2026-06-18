/**
 * seed-kilimanjaro-blog-posts-21b.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 21b):
 *  1. kilimanjaro-stellas-point
 *  2. kilimanjaro-acclimatization-days
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-21b.ts
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
/*  Post 1: kilimanjaro-stellas-point                                  */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>For thousands of Kilimanjaro climbers every year, the moment they step onto the crater rim at Stella Point is the emotional climax of their entire journey. At 5,756 metres above sea level, after eight to twelve hours of climbing through freezing darkness, Stella Point is where the mountain finally relents. The scree stops, the ground levels out, and the sun rises over Mawenzi Peak in a blaze of orange and gold. Many climbers weep. Some collapse. A few simply stand in silence, staring into the volcanic crater they have just reached. Stella Point is not the summit of Kilimanjaro — that honour belongs to Uhuru Peak, 139 metres higher and roughly an hour further along the crater rim — but for a significant number of climbers, Stella Point is as far as they go, and it is far enough.</p>

<p>This guide covers everything about Stella Point: what it is, how it compares to Uhuru Peak and Gilman's Point, why some climbers stop here, which routes approach via Stella Point, what the climb from Barafu Camp actually feels like, and what happens when you arrive.</p>

<h2>What Is Stella Point?</h2>

<p><strong>Stella Point</strong> sits at 5,756 metres (18,885 feet) on the southern rim of Kilimanjaro's volcanic crater. It is named after the wife of Dr. Clement Gillman, who was among the early European explorers of the mountain in the 1920s. Stella Point is the specific location where climbers approaching from the southern side of Kilimanjaro — via Barafu Camp — first reach the crater rim. It is marked by a wooden sign with a plaque confirming the elevation and a KINAPA marker for photographs.</p>

<p>Geologically, Stella Point sits on the edge of the Reusch Crater, the inner volcanic cone of Kibo (Kilimanjaro's main peak). From Stella Point, you can look down into the ash pit of the crater, see the remnants of the Furtwängler Glacier clinging to the inner walls, and gaze across the crater rim toward Uhuru Peak to the west. On a clear morning, the views are staggering — the crater floor 200 metres below, Mawenzi Peak (5,149m) rising sharply to the east, and the plains of Tanzania and Kenya stretching to the horizon in every direction.</p>

<h2>Stella Point vs Uhuru Peak vs Gilman's Point</h2>

<p>Kilimanjaro has three recognised summit points, each at a different elevation on the crater rim. Understanding the differences is important because your <a href="/kilimanjaro-certificates/">Kilimanjaro certificate</a> depends on which point you reach.</p>

<table>
<thead>
<tr>
<th>Point</th>
<th>Elevation</th>
<th>Certificate Colour</th>
<th>Distance from Barafu Camp</th>
<th>Typical Time from Barafu</th>
<th>Difficulty</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Gilman's Point</strong></td>
<td>5,681m (18,638ft)</td>
<td>Brown / Green</td>
<td>~5.5km (via Marangu/Rongai)</td>
<td>6–8 hours</td>
<td>Steep scree, exposed ridge</td>
</tr>
<tr>
<td><strong>Stella Point</strong></td>
<td>5,756m (18,885ft)</td>
<td>Green</td>
<td>~5km</td>
<td>6–8 hours</td>
<td>Steep scree switchbacks</td>
</tr>
<tr>
<td><strong>Uhuru Peak</strong></td>
<td>5,895m (19,341ft)</td>
<td>Gold</td>
<td>~6.5km</td>
<td>7–9 hours</td>
<td>Crater rim traverse after Stella</td>
</tr>
</tbody>
</table>

<p><strong>Gilman's Point</strong> (5,681m) is where climbers on the <a href="/kilimanjaro-marangu-route/">Marangu</a> and <a href="/kilimanjaro-rongai-route/">Rongai</a> routes first reach the crater rim, approaching from the east. From Gilman's Point, climbers traverse the crater rim westward, passing through Stella Point on their way to Uhuru Peak.</p>

<p><strong>Stella Point</strong> (5,756m) is the crater rim arrival point for all southern routes — <a href="/kilimanjaro-machame-route/">Machame</a>, <a href="/kilimanjaro-lemosho-route/">Lemosho</a>, Umbwe, Northern Circuit, and Shira — all of which approach via Barafu Camp.</p>

<p><strong>Uhuru Peak</strong> (5,895m) is the true summit of Kilimanjaro and the highest point in Africa. It sits on the western rim of the crater, approximately 1.5km from Stella Point along a relatively gentle traverse. Reaching <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a> earns you the gold certificate.</p>

<h2>Why Some Climbers Stop at Stella Point</h2>

<p>Roughly 10–15% of climbers who reach Stella Point do not continue to Uhuru Peak. This is not failure — reaching 5,756m on Africa's highest mountain is an extraordinary achievement. There are several legitimate reasons why climbers stop at the crater rim.</p>

<h3>Exhaustion After Summit Night</h3>

<p>By the time you reach Stella Point, you have been climbing for 6–8 hours, mostly in darkness, through some of the most physically and mentally demanding terrain on the mountain. <a href="/kilimanjaro-summit-night/">Summit night</a> typically begins between 11:00 PM and midnight from Barafu Camp (4,673m). You have gained over 1,000 metres of elevation on steep, loose volcanic scree in freezing temperatures (-10°C to -20°C) with 50% of the oxygen available at sea level. Some climbers simply have nothing left in the tank when they reach the crater rim. The remaining 1.5km to Uhuru Peak — while relatively flat — feels impossible when your legs are shaking, your head is pounding, and every step requires conscious effort.</p>

<h3>Altitude Sickness Symptoms Worsening</h3>

<p>The final 200 metres of elevation gain before Stella Point is the zone where <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a> hits hardest. Climbers who have been managing mild symptoms — headache, nausea, fatigue — throughout the climb may find those symptoms escalating rapidly above 5,500m. If a climber is vomiting, severely dizzy, or showing signs of confusion, their guide will not allow them to continue. The risk of HACE (High Altitude Cerebral Edema) increases significantly above 5,500m, and an experienced guide will turn a climber around rather than risk a medical emergency on the crater rim.</p>

<h3>Running Out of Time</h3>

<p>Guides set turnaround times for summit night. If you have not reached Stella Point by approximately 7:00–8:00 AM, most guides will not allow you to continue to Uhuru Peak because you will not have enough time and energy for the long descent. The descent from the summit to Barafu Camp takes 2–3 hours, and from Barafu you descend further to Millennium Camp or Mweka Camp (another 3–4 hours). If you reach Stella Point at 8:00 AM, attempting the additional hour to Uhuru means you will not start descending until 9:00–10:00 AM, putting your total day at 20+ hours.</p>

<h3>Weather Deterioration</h3>

<p>Kilimanjaro's weather window for summit night is narrow. Clear, calm conditions at midnight can deteriorate into gale-force winds, whiteout conditions, or blowing snow by mid-morning. If the weather turns while you are at Stella Point, your guide may instruct you to begin descending immediately rather than pressing toward Uhuru Peak in deteriorating visibility and wind chill that can drop temperatures to -30°C.</p>

<h3>Personal Decision</h3>

<p>Some climbers reach Stella Point, take in the sunrise, look into the crater, and decide they are satisfied. Stella Point IS on the crater rim. You have climbed to within 139 metres of the highest point in Africa. For some — especially those climbing for personal reasons, overcoming health challenges, or completing a bucket-list goal — Stella Point is enough. There is no shame in this. Every guide on Kilimanjaro will tell you: the summit is wherever your body and your heart tell you to stop.</p>

<h2>Do You Still Get a Certificate at Stella Point?</h2>

<p>Yes. KINAPA issues three different <a href="/kilimanjaro-certificates/">Kilimanjaro certificates</a> based on the highest point reached:</p>

<ul>
<li><strong>Gold certificate:</strong> Uhuru Peak (5,895m) — the true summit</li>
<li><strong>Green certificate:</strong> Stella Point (5,756m) — the crater rim via southern routes</li>
<li><strong>Brown/Green certificate:</strong> Gilman's Point (5,681m) — the crater rim via eastern routes</li>
</ul>

<p>All three certificates are official KINAPA documents with your name, the date, and the altitude achieved. They are valid recognition of your climb. You can request your certificate from the park gate office on the day you descend.</p>

<h2>Which Routes Reach the Crater via Stella Point?</h2>

<p>The route you choose determines whether you arrive at the crater rim at Stella Point or Gilman's Point.</p>

<h3>Routes via Stella Point (Southern Approach from Barafu Camp)</h3>

<ul>
<li><strong><a href="/kilimanjaro-machame-route/">Machame Route</a></strong> (6–7 days) — the most popular route on Kilimanjaro, nicknamed the "Whiskey Route"</li>
<li><strong><a href="/kilimanjaro-lemosho-route/">Lemosho Route</a></strong> (7–8 days) — considered the most scenic route with the best acclimatisation profile</li>
<li><strong>Umbwe Route</strong> (5–6 days) — the steepest and most direct route, not recommended for most climbers</li>
<li><strong>Northern Circuit</strong> (9 days) — the longest route, circumnavigating the mountain before approaching from the south</li>
<li><strong>Shira Route</strong> (7 days) — similar to Lemosho but with a higher starting point and vehicle access</li>
</ul>

<p>All five routes converge at Barafu Camp (4,673m) for the summit attempt. From Barafu, the ascent heads northeast up the steep volcanic scree to Stella Point.</p>

<h3>Routes via Gilman's Point (Eastern Approach)</h3>

<ul>
<li><strong><a href="/kilimanjaro-marangu-route/">Marangu Route</a></strong> (5–6 days) — the only route with hut accommodation, approaching from Kibo Hut</li>
<li><strong><a href="/kilimanjaro-rongai-route/">Rongai Route</a></strong> (6–7 days) — approaches from the north, merging with Marangu's summit trail for the final push</li>
</ul>

<p>Both routes summit from Kibo Hut (4,703m), reaching the crater rim at Gilman's Point before traversing to Stella Point and on to Uhuru Peak.</p>

<h2>The Approach to Stella Point from Barafu Camp</h2>

<p>The climb from Barafu Camp to Stella Point is the hardest section of any Kilimanjaro route. There is no way to sugarcoat it. Here is what it actually involves.</p>

<h3>Midnight Start</h3>

<p>You wake at 11:00 PM after attempting to sleep for a few hours at Barafu Camp. Sleep is almost impossible at 4,673m — the air is thin, the cold is biting, and the anxiety of summit night keeps most climbers awake. Your guide brings hot tea or coffee to your tent. You dress in every layer you have: thermal base layer, fleece mid-layer, down jacket, waterproof shell, insulated gloves, balaclava, and headlamp. You eat a few biscuits or a piece of bread, fill your water bottles with warm water (to prevent freezing), and step into the darkness.</p>

<h3>The Switchbacks (4,673m to 5,500m)</h3>

<p>The first 3–4 hours follow steep, zigzagging switchbacks up loose volcanic scree. The trail is a series of endless S-curves carved into the mountainside, and in the darkness your world shrinks to the circle of your headlamp and the boots of the climber ahead of you. The scree is loose and frustrating — for every two steps up, you slide back one. The gradient averages 30–35 degrees but feels steeper because of the altitude. You walk at an agonisingly slow pace: <em>pole pole</em> ("slowly slowly" in Swahili). At this altitude, even the fittest climbers move at a fraction of their normal speed.</p>

<h3>The Final Push (5,500m to 5,756m)</h3>

<p>The last 250 metres of elevation gain before Stella Point is the steepest and most demanding section. The scree becomes larger and more unstable. In places, you use your hands to steady yourself on rocks. The switchbacks tighten. You can see headlamps of climbers above you — strings of light zigzagging up the mountainside like a slow-motion procession — but the rim never seems to get closer. This is the mental crux of the climb. Your body is screaming to stop. Your breathing is ragged and laboured. Every ten steps require a rest. The air contains roughly half the oxygen available at sea level.</p>

<p>And then, suddenly, the ground levels out. The scree gives way to flat rock. You see the Stella Point sign. You are on the crater rim.</p>

<h2>What Happens at Stella Point</h2>

<p>Arriving at Stella Point is one of the most emotional moments on any mountain anywhere in the world. After hours of suffering in darkness, you step onto the crater rim just as the sun begins to rise. Here is what the experience is like.</p>

<p>The first thing you notice is that the ground is flat. After hours of steep uphill, the sudden absence of gradient feels surreal — almost disorienting. You can walk without gasping. Your guide congratulates you and points to the wooden sign marking Stella Point, 5,756m. Most climbers immediately sit down. Some cry. The relief of reaching the crater rim, combined with altitude-induced emotional volatility, produces powerful reactions.</p>

<p>If you arrive at the right time — typically between 5:30 AM and 6:30 AM — you witness the <a href="/kilimanjaro-summit-sunrise/">sunrise over Mawenzi Peak</a>. The sky shifts from black to deep blue to orange, and Mawenzi's jagged spires are silhouetted against the light. To your left, the volcanic crater drops away — a vast, barren moonscape of ash and ice. The Furtwängler Glacier, one of Kilimanjaro's last remaining ice fields, glows pink in the dawn light.</p>

<p>Your guide will assess your condition. If you are alert, hydrated, and able to walk steadily, they will encourage you to continue to Uhuru Peak. If you are showing signs of severe altitude sickness — confusion, inability to stand unaided, persistent vomiting — they will begin your descent immediately. This decision is made on the spot, and it is the guide's call.</p>

<h2>The Walk from Stella Point to Uhuru Peak</h2>

<p>If you decide to continue — and approximately 85–90% of climbers who reach Stella Point do — the walk to <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a> is a relative gift compared to what you have just endured.</p>

<p>The crater rim traverse from Stella Point to Uhuru Peak is approximately 1.5km and takes 45–60 minutes. The terrain is mostly flat or gently undulating, with a few short uphill sections. You walk along the crater rim with the ash pit to your right and the outer slopes of Kilimanjaro falling away to your left. You pass the retreating edges of the Rebmann Glacier, one of the signature ice formations that once covered the summit. The glacier is shrinking rapidly — scientists estimate Kilimanjaro's glaciers will disappear entirely by 2040.</p>

<p>The final approach to Uhuru Peak involves a gentle uphill of about 50 metres of elevation gain over 200 metres of distance. And then you are there — 5,895 metres, the Roof of Africa, the highest point on the continent. The famous wooden sign reads: "CONGRATULATIONS! YOU ARE NOW AT UHURU PEAK, TANZANIA, 5895M."</p>

<h2>Summit Night Timeline from Barafu Camp</h2>

<p>Here is the typical timeline for summit night when approaching Stella Point from Barafu Camp. Times are approximate and vary based on fitness, weather, and group size.</p>

<table>
<thead>
<tr>
<th>Time</th>
<th>Activity</th>
<th>Elevation</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>11:00 PM</td>
<td>Wake up, hot drinks, dress in summit layers</td>
<td>4,673m</td>
<td>Sleep is minimal; most climbers doze at best</td>
</tr>
<tr>
<td>12:00 AM – 1:00 AM</td>
<td>Begin ascent from Barafu Camp</td>
<td>4,673m</td>
<td>Headlamps on; move slowly through camp</td>
</tr>
<tr>
<td>1:00 AM – 4:00 AM</td>
<td>Switchbacks on volcanic scree</td>
<td>4,673m – 5,300m</td>
<td>Steep, loose terrain; pole pole pace</td>
</tr>
<tr>
<td>4:00 AM – 6:00 AM</td>
<td>Upper scree section — steepest terrain</td>
<td>5,300m – 5,756m</td>
<td>Hands-on scrambling in places; frequent rests</td>
</tr>
<tr>
<td>5:30 AM – 7:00 AM</td>
<td>Arrive at Stella Point — sunrise</td>
<td>5,756m</td>
<td>Rest, photos, guide assessment; 10–20 min stop</td>
</tr>
<tr>
<td>6:30 AM – 8:00 AM</td>
<td>Crater rim traverse to Uhuru Peak</td>
<td>5,756m – 5,895m</td>
<td>Relatively flat; 45–60 minutes</td>
</tr>
<tr>
<td>7:00 AM – 9:00 AM</td>
<td>Arrive at Uhuru Peak — summit photos</td>
<td>5,895m</td>
<td>10–15 minutes maximum at the top</td>
</tr>
<tr>
<td>7:30 AM – 9:30 AM</td>
<td>Begin descent to Barafu Camp</td>
<td>5,895m → 4,673m</td>
<td>Scree running; 2–3 hours down</td>
</tr>
<tr>
<td>10:00 AM – 12:00 PM</td>
<td>Arrive at Barafu Camp — rest, eat, pack</td>
<td>4,673m</td>
<td>1–2 hour rest before continuing descent</td>
</tr>
<tr>
<td>12:00 PM – 4:00 PM</td>
<td>Descend to Millennium Camp or Mweka Camp</td>
<td>3,820m – 3,100m</td>
<td>Sleep camp for the final night</td>
</tr>
</tbody>
</table>

<p>Total summit day is 15–18 hours of movement. It is the longest and hardest day of the entire climb by a significant margin. Adequate <a href="/kilimanjaro-acclimatization/">acclimatisation</a> in the days before summit night is what makes the difference between reaching the crater rim and turning back. Read more about what to expect in our <a href="/kilimanjaro-summit-night/">summit night guide</a>.</p>

<h2>Photography at Stella Point</h2>

<p>Stella Point offers some of the best photography opportunities on Kilimanjaro, particularly if you arrive at sunrise. Here is what to shoot and how to handle the challenging conditions.</p>

<h3>What to Photograph</h3>

<ul>
<li><strong>Sunrise behind Mawenzi:</strong> The most iconic shot from Stella Point. Mawenzi Peak (5,149m) rises sharply to the east, and the sunrise behind its jagged spires creates a dramatic silhouette. Time it right and you get layers of colour — orange, pink, purple — behind the peak.</li>
<li><strong>The crater:</strong> Looking west from Stella Point, you can see the volcanic crater floor, the Furtwängler Glacier, and the gentle rise toward Uhuru Peak. In early morning light, the crater has an otherworldly, lunar quality.</li>
<li><strong>Glacier views:</strong> The Rebmann and Decken Glaciers are visible from Stella Point, clinging to the crater rim. These are disappearing rapidly and will likely be gone within 15 years — your photos may be among the last to capture them.</li>
<li><strong>The Stella Point sign:</strong> The obligatory photo with the summit sign. Queue for this — everyone wants one.</li>
<li><strong>Climbers arriving:</strong> The procession of headlamps below you, slowly zigzagging up the scree, is a powerful image, especially in the pre-dawn blue hour.</li>
</ul>

<h3>Camera Tips for Summit Altitude</h3>

<ul>
<li><strong>Battery life:</strong> Cold temperatures destroy battery life. Keep spare batteries inside your jacket, close to your body, and swap them frequently. A fully charged battery can die in 20 minutes at -15°C.</li>
<li><strong>Gloves:</strong> Touchscreen-compatible gloves are essential. You cannot operate a camera with bare hands at these temperatures without risking frostbite.</li>
<li><strong>Exposure:</strong> The snow and ice on the crater rim will fool your camera's meter. Overexpose by +1 to +1.5 stops to keep snow looking white rather than grey.</li>
<li><strong>Sunrise settings:</strong> For the Mawenzi sunrise, use a low ISO (100–400), wide aperture (f/2.8–f/5.6), and adjust shutter speed for the rapidly changing light. Shoot in RAW if possible — the dynamic range of a Kilimanjaro sunrise exceeds what JPEG can capture.</li>
<li><strong>Phone cameras:</strong> Modern smartphone cameras handle altitude surprisingly well. Keep the phone warm inside your jacket and pull it out only for shots. The computational photography of recent iPhones and Pixel phones produces excellent results in dawn light.</li>
</ul>

<h2>Preparing for the Stella Point Push</h2>

<p>Success at Stella Point is not decided on summit night — it is decided in the days and weeks before. Here is how to prepare.</p>

<ul>
<li><strong>Choose a longer route:</strong> Routes with better acclimatisation profiles — <a href="/kilimanjaro-lemosho-route/">Lemosho</a> (8 days), Northern Circuit (9 days) — have significantly higher success rates than shorter routes. The extra days allow your body to adapt to altitude gradually.</li>
<li><strong>Train for endurance:</strong> Summit night is a 6–8 hour uphill slog at altitude. Train with long, slow hikes of 4–6 hours on hilly terrain. Stair climbing, incline treadmill, and elevation hiking are all effective. Read our <a href="/how-hard-is-kilimanjaro/">how hard is Kilimanjaro</a> guide for realistic expectations.</li>
<li><strong>Practice night hiking:</strong> Do at least two training hikes in the dark with a headlamp. The disorientation of hiking in darkness is a significant factor on summit night, and experience reduces anxiety.</li>
<li><strong>Hydrate aggressively:</strong> Drink 3–4 litres of water per day on the mountain. Dehydration accelerates altitude sickness and reduces your body's ability to perform. By summit night, you should have been hydrating consistently for 4–6 days.</li>
<li><strong>Eat even when you do not want to:</strong> Appetite decreases at altitude. Force yourself to eat calorie-dense foods — nuts, chocolate, energy bars, chapati with peanut butter — throughout the climb. Your body needs fuel for summit night.</li>
</ul>

<h2>Final Thoughts</h2>

<p>Stella Point at 5,756 metres is the gateway to the summit of Kilimanjaro. Whether you stop here or continue to Uhuru Peak, reaching the crater rim is an achievement that places you among a select group of people who have stood at the top of Africa's highest mountain. The climb from <a href="/kilimanjaro-barranco-wall/">Barafu Camp</a> to Stella Point is the hardest thing most climbers will ever do physically — and the most rewarding. The sunrise, the crater views, the glaciers, and the raw emotion of arrival make Stella Point a moment that stays with you for life.</p>

<p>For more on summit day, explore our guides to <a href="/kilimanjaro-summit-night/">summit night</a>, <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a>, and <a href="/kilimanjaro-summit-sunrise/">the summit sunrise</a>. To understand how difficult the climb really is, read <a href="/how-hard-is-kilimanjaro/">how hard is Kilimanjaro</a>.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-acclimatization-days                           */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>Acclimatisation days are the secret weapon of successful Kilimanjaro climbers. The data is unambiguous: routes with dedicated rest days have significantly higher summit success rates than routes without them. The 5-day Marangu route — the shortest option — has a summit rate of roughly 50–60%. The 8-day Lemosho route, which includes proper acclimatisation time, pushes above 90%. The difference is not fitness, not willpower, not gear — it is time. Time for your body to adapt to the progressively thinner air, produce more red blood cells, and stabilise at each new elevation band before pushing higher. Acclimatisation days give you that time.</p>

<p>This guide explains exactly what acclimatisation is, how the "climb high, sleep low" strategy works, which routes include dedicated rest days, what you actually do on an acclimatisation day, and how to maximise your body's adaptation on any route.</p>

<h2>What Is Acclimatisation?</h2>

<p><strong>Acclimatisation</strong> is your body's physiological adaptation to reduced oxygen at altitude. At sea level, the air contains approximately 21% oxygen and atmospheric pressure pushes that oxygen into your lungs and bloodstream efficiently. As you gain elevation, the percentage of oxygen remains the same, but the atmospheric pressure drops — which means each breath delivers less oxygen to your body. At the summit of Kilimanjaro (5,895m), atmospheric pressure is roughly half of sea level, so each breath provides about 50% of the oxygen you are accustomed to.</p>

<p>Your body responds to this oxygen deficit with a cascade of physiological changes:</p>

<ul>
<li><strong>Increased breathing rate:</strong> Your respiratory system speeds up to take in more air per minute, compensating for lower oxygen density</li>
<li><strong>Increased heart rate:</strong> Your heart pumps faster to circulate the available oxygen more quickly</li>
<li><strong>Red blood cell production:</strong> Your kidneys release erythropoietin (EPO), which stimulates your bone marrow to produce more red blood cells. More red blood cells means more haemoglobin to carry oxygen. This process takes 3–5 days to produce measurable results.</li>
<li><strong>Blood pH adjustment:</strong> Hyperventilation at altitude blows off carbon dioxide, making your blood more alkaline. Your kidneys gradually excrete bicarbonate to restore normal blood pH, which takes 24–48 hours at each elevation band.</li>
<li><strong>Capillary growth:</strong> Over time, your body develops additional capillaries in muscle tissue to improve oxygen delivery at the cellular level</li>
</ul>

<p>These adaptations do not happen instantly. They require <strong>time</strong> — which is precisely what acclimatisation days provide.</p>

<h2>The "Climb High, Sleep Low" Principle</h2>

<p>The most effective acclimatisation strategy in mountaineering is <strong>"climb high, sleep low."</strong> The principle is simple: during the day, hike to a higher elevation to expose your body to altitude stress and trigger adaptation. Then descend to a lower elevation to sleep, where the higher oxygen levels allow your body to recover and consolidate its adaptations.</p>

<p>On Kilimanjaro, this looks like a rest day where you hike 200–500 metres above your camp in the morning, spend an hour or two at the higher elevation, then descend to camp for lunch and an afternoon of rest. You sleep at the same elevation as the previous night, but your body has been "shown" the altitude above and begins preparing for it.</p>

<p>The science behind this is well-established. Exposure to higher altitude triggers EPO release and respiratory adaptation. Sleeping at a lower altitude reduces the stress on your body while these adaptations take hold. The combination accelerates acclimatisation far more effectively than simply ascending continuously. This is why Kilimanjaro routes that incorporate "climb high, sleep low" days have dramatically higher summit success rates.</p>

<h2>How Long Acclimatisation Takes</h2>

<p>Your body begins adapting to altitude within hours of arrival at a new elevation, but meaningful adaptation — the kind that prevents <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a> and enables summit success — takes days. Here is how the body's response unfolds over time.</p>

<table>
<thead>
<tr>
<th>Time at Altitude</th>
<th>Physiological Changes</th>
<th>Common Symptoms</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>0–6 hours</strong></td>
<td>Breathing rate increases; heart rate rises; mild hypoxia begins</td>
<td>Mild breathlessness on exertion; slight headache</td>
</tr>
<tr>
<td><strong>6–24 hours</strong></td>
<td>Kidneys begin releasing EPO; ventilatory response increases; blood pH shifts alkaline</td>
<td>Headache, fatigue, reduced appetite, difficulty sleeping</td>
</tr>
<tr>
<td><strong>24–48 hours</strong></td>
<td>Bicarbonate excretion begins; respiratory alkalosis partially corrected; red blood cell production begins</td>
<td>Symptoms may peak then begin to improve; sleep quality may worsen then recover</td>
</tr>
<tr>
<td><strong>48–72 hours</strong></td>
<td>Measurable increase in red blood cells; ventilatory response stabilises; exercise capacity begins improving</td>
<td>Most symptoms resolve if acclimatisation is proceeding normally</td>
</tr>
<tr>
<td><strong>3–5 days</strong></td>
<td>Significant haemoglobin increase; blood pH normalised; capillary density beginning to increase</td>
<td>Feeling "normal" at the current elevation; appetite returns; sleep improves</td>
</tr>
<tr>
<td><strong>1–2 weeks</strong></td>
<td>Near-complete acclimatisation to current elevation band; optimal red blood cell volume</td>
<td>Comfortable at current altitude; ready for higher elevation</td>
</tr>
</tbody>
</table>

<p>The key takeaway: your body needs 2–3 days at each significant elevation band to acclimatise adequately. On a typical Kilimanjaro climb, you pass through three major bands — 2,500–3,500m (forest zone), 3,500–4,500m (moorland/alpine desert), and 4,500–5,895m (arctic/summit zone). Routes that give your body time at each band produce dramatically better outcomes than those that rush through them.</p>

<h2>Which Routes Have Dedicated Acclimatisation Days?</h2>

<p>Not all Kilimanjaro routes are equal when it comes to acclimatisation. Here is how each route handles altitude adaptation, and which ones include dedicated rest days.</p>

<table>
<thead>
<tr>
<th>Route</th>
<th>Days</th>
<th>Dedicated Acclimatisation Days</th>
<th>Max Altitude Before Summit</th>
<th>Summit Success Rate</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Marangu</strong></td>
<td>5</td>
<td>None</td>
<td>4,703m (Kibo Hut)</td>
<td>50–60%</td>
</tr>
<tr>
<td><strong>Marangu</strong></td>
<td>6</td>
<td>1 (rest day at Horombo Hut)</td>
<td>4,703m (Kibo Hut)</td>
<td>65–75%</td>
</tr>
<tr>
<td><strong>Machame</strong></td>
<td>6</td>
<td>None (but good altitude profile)</td>
<td>4,673m (Barafu)</td>
<td>70–80%</td>
</tr>
<tr>
<td><strong>Machame</strong></td>
<td>7</td>
<td>1 (extra day at Karanga)</td>
<td>4,673m (Barafu)</td>
<td>80–85%</td>
</tr>
<tr>
<td><strong>Lemosho</strong></td>
<td>7</td>
<td>Built-in via gradual ascent</td>
<td>4,673m (Barafu)</td>
<td>85–90%</td>
</tr>
<tr>
<td><strong>Lemosho</strong></td>
<td>8</td>
<td>1 (extra day at Shira or Karanga)</td>
<td>4,673m (Barafu)</td>
<td>90–95%</td>
</tr>
<tr>
<td><strong>Rongai</strong></td>
<td>6</td>
<td>None</td>
<td>4,703m (Kibo Hut)</td>
<td>65–75%</td>
</tr>
<tr>
<td><strong>Rongai</strong></td>
<td>7</td>
<td>1 (extra day at Mawenzi Tarn)</td>
<td>4,703m (Kibo Hut)</td>
<td>80–85%</td>
</tr>
<tr>
<td><strong>Northern Circuit</strong></td>
<td>9</td>
<td>Multiple (natural via length)</td>
<td>4,673m (Barafu)</td>
<td>90–95%</td>
</tr>
<tr>
<td><strong>Umbwe</strong></td>
<td>6</td>
<td>None</td>
<td>4,673m (Barafu)</td>
<td>60–70%</td>
</tr>
</tbody>
</table>

<h3>Marangu 6-Day: Rest Day at Horombo Hut</h3>

<p>The <a href="/kilimanjaro-marangu-route/">Marangu route</a> offers a 6-day option that includes a rest day at Horombo Hut (3,720m). On this day, you hike from Horombo to Mawenzi Ridge at approximately 4,200m — a gain of about 480 metres — then return to Horombo for lunch and an afternoon of rest. This is a classic "climb high, sleep low" day that gives your body an extra 24 hours to acclimatise before pushing to Kibo Hut (4,703m) the following day. The 6-day Marangu adds approximately 15% to the summit success rate compared to the 5-day version.</p>

<h3>Lemosho 8-Day: The Gold Standard</h3>

<p>The 8-day <a href="/kilimanjaro-lemosho-route/">Lemosho route</a> is widely considered the best route on Kilimanjaro for acclimatisation. It starts low (2,100m at Londorossi Gate), ascends gradually through the forest to Shira Plateau, and includes an extra acclimatisation day — either at Shira Camp (3,840m) with a hike to Shira Cathedral (~4,100m) or at Karanga Camp (3,963m) with a hike toward Barafu and back. The slow, gradual ascent combined with the dedicated rest day means your body has 6–7 days to adapt before summit night. The result: summit success rates above 90%.</p>

<h3>Northern Circuit 9-Day: Natural Acclimatisation Through Length</h3>

<p>The Northern Circuit is the longest route on Kilimanjaro, and its acclimatisation advantage comes from sheer duration rather than specific rest days. The route spends multiple days traversing the northern slopes at 3,800–4,200m before ascending to Barafu Camp. This extended time at moderate altitude allows thorough acclimatisation without a formal "rest day." It is the route with the highest <a href="/kilimanjaro-success-rates/">summit success rate</a> — approaching 95% with experienced operators.</p>

<h3>Rongai 7-Day: Mawenzi Tarn Rest Day</h3>

<p>The 7-day <a href="/kilimanjaro-rongai-route/">Rongai route</a> includes an extra acclimatisation day at Mawenzi Tarn (4,330m). On this day, you hike toward the base of Mawenzi Peak, reaching approximately 4,600m before descending back to camp. The Mawenzi Tarn area is one of the most dramatic locations on Kilimanjaro — the tarn (a small alpine lake) sits in a cirque beneath Mawenzi's imposing rock towers. The acclimatisation hike doubles as one of the most scenic walks on the mountain.</p>

<h2>What You Do on an Acclimatisation Day</h2>

<p>Acclimatisation days are not "rest days" in the sense of lying in your tent doing nothing. They follow a structured pattern designed to maximise altitude adaptation while minimising fatigue.</p>

<h3>Morning: Hike High</h3>

<p>After breakfast (typically 7:00–8:00 AM), you set out on an acclimatisation hike with your guide. The hike heads uphill to a point 200–500 metres above your camp elevation. The pace is relaxed — this is not about physical exertion, it is about altitude exposure. Your guide will monitor your breathing, watch for signs of altitude sickness, and check your SpO2 with a pulse oximeter at the high point. The hike typically takes 2–3 hours round trip.</p>

<h3>Midday: Return to Camp</h3>

<p>You descend to camp for lunch, usually arriving between 11:00 AM and 12:00 PM. Lunch on Kilimanjaro is typically a hot meal — soup, sandwiches, pasta, or rice with vegetables. This is an important fuelling opportunity. Eat well, even if your appetite is reduced.</p>

<h3>Afternoon: Rest and Recover</h3>

<p>The afternoon is yours. Most climbers rest in their tents, read, journal, play cards with other climbers, or simply sit outside and absorb the scenery. This is also the time to focus on hydration — aim to drink at least 1.5–2 litres between lunch and dinner. The forced inactivity feels odd when you have been hiking for days, but it is doing exactly what your body needs: consolidating altitude adaptations without additional physical stress.</p>

<h3>Evening: Sleep at the Same Elevation</h3>

<p>You sleep at the same camp as the previous night. This is the "sleep low" part of the strategy. Your body has been exposed to the altitude stress of the higher point, and now it recovers at a lower, more comfortable elevation. By morning, your acclimatisation will have advanced measurably — many climbers report feeling noticeably better after an acclimatisation day.</p>

<h2>Why 5-Day Routes Have Lower Success Rates</h2>

<p>The correlation between route duration and summit success is not coincidental — it is causal. Five-day routes (Marangu 5-day, short Umbwe) push climbers through elevation bands faster than the body can adapt. Here is the fundamental problem.</p>

<p>On a 5-day Marangu route, your elevation profile looks like this:</p>

<ul>
<li><strong>Day 1:</strong> Gate (1,840m) → Mandara Hut (2,720m) — gain: 880m</li>
<li><strong>Day 2:</strong> Mandara → Horombo Hut (3,720m) — gain: 1,000m</li>
<li><strong>Day 3:</strong> Horombo → Kibo Hut (4,703m) — gain: 983m</li>
<li><strong>Day 4:</strong> Kibo → Summit (5,895m) → Horombo — gain: 1,192m then descent</li>
<li><strong>Day 5:</strong> Horombo → Gate — descent</li>
</ul>

<p>You gain almost 3,000 metres in three days, with no rest day. On Day 3, you jump from 3,720m to 4,703m — a near-1,000m gain — and then attempt to summit (5,895m) the very next morning. That is a 2,175m push over two days at extreme altitude, with zero acclimatisation time at the 4,000m band. Your body has had less than 24 hours to adjust to 4,703m before you are asking it to perform at 5,895m.</p>

<p>Compare this with the 8-day Lemosho route, where you spend two days between 3,800m and 4,200m, an acclimatisation day to push toward 4,600m and return, and then advance to Barafu (4,673m) with your body already adapted to that elevation band. The summit push feels entirely different.</p>

<h2>The Barafu Problem</h2>

<p>Regardless of route, almost all Kilimanjaro climbers face the same challenge at the end: the jump from approximately 4,000m to Barafu Camp (4,673m), followed immediately by a summit attempt at 5,895m. That is a 1,895m push with minimal time to adjust.</p>

<p>Routes handle this differently. The 7-day Machame route spends the day before summit at Karanga Camp (3,963m) then moves to Barafu (4,673m) — arriving in the early afternoon and attempting the summit that same night. You have roughly 8–10 hours at 4,673m before climbing to 5,895m. The 8-day Lemosho arrives at Barafu a full day earlier, giving you a full night of sleep at Barafu elevation before summit night — an extra 12–16 hours of acclimatisation that can make the difference between reaching Stella Point and turning back.</p>

<h2>How to Maximise Acclimatisation on Any Route</h2>

<p>Even if you choose a shorter route, there are proven strategies to improve your acclimatisation and increase your summit chances.</p>

<ol>
<li><strong>Walk slowly — pole pole:</strong> The single most important piece of advice on Kilimanjaro. Walking slowly reduces oxygen demand, lowers heart rate, and allows your body to adapt more gradually. Your guide will set the pace. Trust them — it will feel absurdly slow on Day 1 and perfectly appropriate by Day 4.</li>
<li><strong>Drink 3–4 litres of water per day:</strong> Dehydration thickens your blood, reduces oxygen delivery, and worsens every symptom of altitude sickness. Carry a water bladder in your daypack and sip constantly. Your urine should be pale yellow — if it is dark, you are not drinking enough.</li>
<li><strong>Eat regularly even when appetite decreases:</strong> Altitude suppresses appetite in most climbers. Fight through it. Eat calorie-dense foods — nuts, chocolate, cheese, dried fruit, energy bars — between meals. Your body needs approximately 4,000–5,000 calories per day at altitude to fuel both climbing and acclimatisation.</li>
<li><strong>Avoid alcohol:</strong> Alcohol dehydrates you, disrupts sleep at altitude, and masks symptoms of altitude sickness. Save the celebratory beer for the descent.</li>
<li><strong>Control your pace on steep sections:</strong> Do not race uphill. On steep terrain, take smaller steps and rest every 10–15 steps if needed. There is no prize for arriving at camp first, and climbing too fast is one of the primary causes of acute mountain sickness.</li>
<li><strong>Consider Diamox (acetazolamide):</strong> If your doctor recommends it, Diamox can accelerate acclimatisation by promoting bicarbonate excretion and stimulating breathing. It is not a substitute for proper acclimatisation — it is an aid. Common side effects include tingling in the fingers and increased urination. Discuss it with your doctor before the climb.</li>
<li><strong>Sleep with your head slightly elevated:</strong> Prop your head up with extra clothing or your daypack. This slightly reduces intracranial pressure and can improve sleep quality at altitude.</li>
</ol>

<h2>Signs Your Acclimatisation Is Working</h2>

<p>How do you know if your body is adapting properly? Look for these positive indicators:</p>

<ul>
<li><strong>Improving appetite:</strong> After an initial decrease on Days 1–2, your appetite returns and you feel hungry at mealtimes</li>
<li><strong>Better sleep:</strong> You transition from restless, fragmented sleep to longer, deeper sleep periods (note: Cheyne-Stokes periodic breathing — bursts of breathing followed by pauses — is common and harmless at altitude)</li>
<li><strong>Fewer headaches:</strong> Headaches that were persistent on arrival at a new elevation diminish or resolve within 24–48 hours</li>
<li><strong>Stable SpO2 readings:</strong> Your guide measures blood oxygen saturation (SpO2) with a pulse oximeter. Readings that stabilise or improve at a given elevation indicate acclimatisation is proceeding normally</li>
<li><strong>Normal energy levels:</strong> You feel capable of hiking without excessive breathlessness or fatigue at the current elevation</li>
</ul>

<h2>Signs You Need More Time</h2>

<p>Conversely, these warning signs indicate your body is struggling to adapt and you may need an extra rest day or a slower ascent rate:</p>

<ul>
<li><strong>Persistent headache:</strong> A headache that does not respond to paracetamol and rest after 12–24 hours at the same elevation</li>
<li><strong>Nausea or vomiting:</strong> Especially if it prevents you from eating or drinking adequately</li>
<li><strong>Insomnia:</strong> Not the normal restlessness of altitude, but complete inability to sleep for multiple nights</li>
<li><strong>Dropping SpO2:</strong> Blood oxygen levels that continue to fall or do not stabilise after 24 hours at a given elevation — readings below 80% at any camp below Barafu are concerning</li>
<li><strong>Worsening symptoms with ascent:</strong> If every camp feels worse than the last, your body is not keeping up with the rate of ascent</li>
</ul>

<p>If you experience these symptoms, tell your guide immediately. An experienced guide will adjust the plan — slowing the pace, adding a rest day, or beginning a descent if necessary. Attempting to push through worsening symptoms is how altitude sickness escalates to life-threatening HACE or HAPE.</p>

<h2>SpO2 Readings by Elevation</h2>

<p>Your guide will measure your blood oxygen saturation (SpO2) with a pulse oximeter at each camp. Here are the expected ranges and what they mean.</p>

<table>
<thead>
<tr>
<th>Elevation</th>
<th>Normal SpO2 Range</th>
<th>Concern Level</th>
<th>Action Required</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Sea Level</strong></td>
<td>95–100%</td>
<td>None</td>
<td>Baseline reading</td>
</tr>
<tr>
<td><strong>2,500–3,000m</strong></td>
<td>90–95%</td>
<td>None</td>
<td>Monitor; normal drop from baseline</td>
</tr>
<tr>
<td><strong>3,000–3,500m</strong></td>
<td>85–92%</td>
<td>Low</td>
<td>Monitor; hydrate well; watch for headache</td>
</tr>
<tr>
<td><strong>3,500–4,000m</strong></td>
<td>82–90%</td>
<td>Moderate</td>
<td>Monitor closely; rest if symptoms present</td>
</tr>
<tr>
<td><strong>4,000–4,500m</strong></td>
<td>78–88%</td>
<td>Moderate</td>
<td>Rest day if reading below 80% with symptoms</td>
</tr>
<tr>
<td><strong>4,500–5,000m</strong></td>
<td>72–85%</td>
<td>Elevated</td>
<td>Below 75% with symptoms: consider descent</td>
</tr>
<tr>
<td><strong>5,000–5,895m</strong></td>
<td>60–80%</td>
<td>High</td>
<td>Expected during summit push; below 60%: descend</td>
</tr>
</tbody>
</table>

<p>Important: SpO2 readings are one data point, not the whole picture. Some climbers perform well with readings in the low 70s; others struggle at 85%. Your guide uses SpO2 alongside symptom assessment, heart rate, and overall condition to make decisions. Do not panic over a single low reading — trend matters more than any individual number.</p>

<h2>Diamox and Acclimatisation</h2>

<p><strong>Acetazolamide (Diamox)</strong> is the most commonly used medication for altitude sickness prevention on Kilimanjaro. Understanding what it does — and what it does not do — is important.</p>

<p>Diamox works by inhibiting an enzyme called carbonic anhydrase in your kidneys. This causes your kidneys to excrete more bicarbonate, which makes your blood slightly more acidic. The mild acidosis stimulates your respiratory centre to breathe more deeply and frequently, increasing the amount of oxygen you inhale. In effect, Diamox accelerates one of your body's natural acclimatisation mechanisms.</p>

<p><strong>What Diamox does:</strong></p>
<ul>
<li>Reduces the risk of acute mountain sickness (AMS) by 50–75% in clinical studies</li>
<li>Improves sleep quality at altitude (reduces periodic breathing)</li>
<li>Speeds up acclimatisation — does not replace it</li>
</ul>

<p><strong>What Diamox does not do:</strong></p>
<ul>
<li>It does not cure altitude sickness — if you have symptoms, you still need to manage them</li>
<li>It does not replace proper acclimatisation through gradual ascent and rest days</li>
<li>It does not prevent HACE or HAPE in climbers who ascend too fast</li>
<li>It is not a performance enhancer — it does not give you more energy or strength</li>
</ul>

<p>Common side effects include tingling in the fingers and toes, increased urination, and altered taste (carbonated beverages taste flat). The typical dosage is 125–250mg twice daily, starting 24 hours before ascent. Diamox is a prescription medication — you must consult your doctor before taking it. People with sulfa allergies should not take Diamox.</p>

<p>Read more about altitude medications and prevention strategies in our <a href="/kilimanjaro-altitude-sickness/">altitude sickness guide</a> and learn how to prepare physically with our <a href="/kilimanjaro-altitude-training/">altitude training guide</a>.</p>

<h2>Pre-Acclimatisation: Does It Help?</h2>

<p>Some climbers attempt to pre-acclimatise before arriving in Tanzania — sleeping in altitude tents, training at elevation, or spending time at high-altitude locations. The evidence is mixed:</p>

<ul>
<li><strong>Altitude tents (hypoxic tents):</strong> These can produce measurable increases in red blood cells when used consistently for 2–4 weeks before the climb. However, they are expensive ($2,000–$5,000 to purchase, $200–$400/month to rent), uncomfortable to sleep in, and the acclimatisation benefit fades within days of stopping. They may provide a marginal advantage but are not a substitute for on-mountain acclimatisation.</li>
<li><strong>Pre-climb at Mount Meru:</strong> Climbing Mount Meru (4,566m) 2–3 days before Kilimanjaro is a popular pre-acclimatisation strategy. Meru is a serious climb in its own right — 3–4 days — and it provides genuine altitude exposure. The downside: it adds physical fatigue, so you arrive at Kilimanjaro with tired legs. The upside: your body has already adapted to 4,500m, which is a significant head start.</li>
<li><strong>Arriving early:</strong> Spending 2–3 days in Moshi or Arusha (1,400m) before the climb provides minimal acclimatisation benefit — the elevation is too low. However, it allows you to recover from jet lag, adjust to the heat, and start hydrating properly.</li>
</ul>

<h2>Final Thoughts</h2>

<p>Acclimatisation days are not wasted days. They are the days that get you to the summit. Every extra day on the mountain increases your body's oxygen-carrying capacity, reduces your risk of altitude sickness, and improves your chances of standing on Uhuru Peak. If you are choosing between a shorter and a longer route, choose the longer one. If your operator offers an extra acclimatisation day as an option, take it. The cost of one additional day — $150–$300 in park fees and camping fees — is trivial compared to the cost of flying halfway around the world and failing to reach the summit because your body did not have enough time to adapt.</p>

<p>For more on altitude management, explore our guides to <a href="/kilimanjaro-acclimatization/">acclimatisation on Kilimanjaro</a>, <a href="/kilimanjaro-altitude-sickness/">altitude sickness prevention</a>, <a href="/kilimanjaro-altitude-training/">altitude training</a>, <a href="/kilimanjaro-success-rates/">summit success rates by route</a>, <a href="/kilimanjaro-oxygen-levels/">oxygen levels on Kilimanjaro</a>, and our comprehensive <a href="/how-hard-is-kilimanjaro/">how hard is Kilimanjaro</a> guide.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-stellas-point",
    title: "Stella Point on Kilimanjaro: The Gateway to the Summit",
    metaTitle: "Stella Point Kilimanjaro — Is It the Real Summit?",
    metaDescription:
      "Everything about Stella Point (5,756m) on Kilimanjaro: what it is, why some climbers stop here, the final push to Uhuru Peak, certificate differences, and route approaches to Stella Point.",
    excerpt:
      "Stella Point at 5,756m is the crater rim — for many climbers, reaching Stella Point is the emotional climax of their Kilimanjaro journey. Learn what it is, how it compares to Uhuru Peak, and why some climbers stop here.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Stella Point", slug: "stella-point" },
      { name: "Summit", slug: "summit" },
      { name: "Crater", slug: "crater" },
    ],
  },
  {
    slug: "kilimanjaro-acclimatization-days",
    title:
      "Acclimatization Days on Kilimanjaro: Why Rest Days Make or Break Your Summit",
    metaTitle: "Kilimanjaro Acclimatization Days — Why They Matter",
    metaDescription:
      "Why acclimatization days are critical for Kilimanjaro summit success. How they work, which routes include them, what you do on rest days, and how climb-high-sleep-low strategy prevents altitude sickness.",
    excerpt:
      "Acclimatisation days are the secret weapon of successful Kilimanjaro climbers — routes with dedicated rest days have significantly higher summit rates. Learn how they work, which routes include them, and how to maximise your adaptation.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Acclimatization", slug: "acclimatization" },
      { name: "Rest Days", slug: "rest-days" },
      { name: "Altitude", slug: "altitude" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 21b)...\n");

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
        author: "Hamisi Mnaro",
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
