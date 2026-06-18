/**
 * seed-kilimanjaro-blog-posts-23a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 23a):
 *  1. kilimanjaro-vs-mont-blanc
 *  2. kilimanjaro-geology
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-23a.ts
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
/*  Post 1: kilimanjaro-vs-mont-blanc                                  */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>Kilimanjaro and Mont Blanc sit at the top of most mountaineers' bucket lists, yet they demand fundamentally different things from the people who climb them. <a href="/climbing-kilimanjaro/">Kilimanjaro</a> is an altitude trek — a prolonged walk at extreme elevation where the thin air is the enemy and technical skill is irrelevant. Mont Blanc is a technical mountaineering ascent — a shorter, sharper challenge where glaciers, crevasses, steep ice slopes, and rockfall define the experience. One mountain asks whether your body can handle 5,895 metres of altitude. The other asks whether you can move safely on ice and snow at 4,808 metres with an axe in your hand and crampons on your feet. This guide breaks down every meaningful difference between the two climbs so you can decide which mountain is right for you — and which to tackle first.</p>

<h2>Quick Overview: Two Very Different Mountains</h2>

<p>Before diving into the details, here is the essential contrast. Kilimanjaro is taller by over a thousand metres but requires zero technical climbing skill. Mont Blanc is lower but demands real mountaineering ability — glacier travel, crampon technique, ice axe use, and roped movement. The risks are different too: Kilimanjaro's primary danger is altitude sickness; Mont Blanc's primary dangers are falls, rockfall, crevasses, and sudden weather changes.</p>

<ul>
<li><strong>Kilimanjaro:</strong> 5,895m summit, non-technical trek, 6–9 days on the mountain, approximately 65% overall success rate, located in Tanzania</li>
<li><strong>Mont Blanc:</strong> 4,808m summit, technical mountaineering ascent, 2–3 days for the summit push (plus training days), approximately 50% success rate, located on the French-Italian border</li>
</ul>

<h2>Kilimanjaro vs Mont Blanc at a Glance</h2>

<table>
<thead>
<tr><th>Category</th><th>Kilimanjaro</th><th>Mont Blanc</th></tr>
</thead>
<tbody>
<tr><td><strong>Height</strong></td><td>5,895m (19,341 ft)</td><td>4,808m (15,774 ft)</td></tr>
<tr><td><strong>Continent</strong></td><td>Africa</td><td>Europe</td></tr>
<tr><td><strong>Country</strong></td><td>Tanzania</td><td>France / Italy</td></tr>
<tr><td><strong>Technical Difficulty</strong></td><td>Non-technical (walking on trails)</td><td>Technical mountaineering (PD grade)</td></tr>
<tr><td><strong>Duration on Mountain</strong></td><td>6–9 days</td><td>2–3 days summit push (+ training)</td></tr>
<tr><td><strong>Success Rate</strong></td><td>~65% overall (85%+ on 8-day routes)</td><td>~50% (weather-dependent)</td></tr>
<tr><td><strong>Total Cost</strong></td><td>$3,000–$6,500</td><td>€2,500–€5,000</td></tr>
<tr><td><strong>Best Season</strong></td><td>Jan–Mar, Jun–Oct</td><td>Jun–Sep</td></tr>
<tr><td><strong>Fitness Required</strong></td><td>Good aerobic fitness</td><td>High aerobic fitness + mountaineering skills</td></tr>
<tr><td><strong>Altitude Risk</strong></td><td>High (5,895m — severe altitude sickness zone)</td><td>Moderate (4,808m — significant but lower)</td></tr>
<tr><td><strong>Specialist Gear Needed</strong></td><td>Cold-weather trekking gear only</td><td>Crampons, ice axe, harness, rope, helmet</td></tr>
<tr><td><strong>Guide Required?</strong></td><td>Yes — mandatory by Tanzanian law</td><td>Strongly recommended but not legally required</td></tr>
<tr><td><strong>Age Restrictions</strong></td><td>10+ (KINAPA regulation)</td><td>No formal restriction (guides typically require 16+)</td></tr>
<tr><td><strong>Deaths Per Year</strong></td><td>~10 from ~50,000 climbers</td><td>~100 from ~20,000 attempts</td></tr>
</tbody>
</table>

<h2>Difficulty Comparison</h2>

<p>The word "difficulty" means something completely different on these two mountains. On Kilimanjaro, difficulty is almost entirely about altitude. On Mont Blanc, difficulty is about technical mountaineering in a high-mountain environment.</p>

<h3>Kilimanjaro: Altitude Is the Challenge</h3>

<p>At <a href="/mount-kilimanjaro-height/">5,895 metres</a>, Kilimanjaro pushes climbers into the severe altitude zone where atmospheric oxygen pressure is roughly 50% of sea level. The trek itself is walking — there are no ropes, no crampons, no technical moves. Even the steepest sections (the <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a>, the summit scree slopes) are non-technical scrambles that require hands in places but no climbing equipment.</p>

<p>The challenge is physiological. Your body must acclimatize to the progressively thinner air over 6–9 days, and the reality is that some bodies acclimatize well and others do not, regardless of fitness level. <em>Pole pole</em> — "slowly, slowly" in Swahili — is not just a mantra but the single most important tactic on the mountain. The success rate on well-structured 8-day routes like the <a href="/trekking/8-days-lemosho-route/">Lemosho</a> reaches 85–95%, while rushed 5-day itineraries see rates as low as 50–60%.</p>

<h3>Mont Blanc: Technical Mountaineering</h3>

<p>Mont Blanc is 1,087 metres lower than Kilimanjaro, but altitude is only one element of the challenge. The standard Goûter Route — used by the majority of climbers — involves:</p>

<ul>
<li><strong>The Goûter Couloir:</strong> A notorious rockfall gully that must be crossed quickly. Falling rocks have killed numerous climbers here, and it is considered the single most dangerous point on the route. Timing the crossing is critical.</li>
<li><strong>Glacier travel:</strong> Extensive walking on glacial ice with crevasse hazard. Climbers must be roped together and know how to self-arrest and perform crevasse rescue.</li>
<li><strong>Crampon and ice axe use:</strong> Steep snow and ice slopes require confident crampon technique and the ability to use an ice axe for balance and self-arrest in case of a fall.</li>
<li><strong>Exposed ridges:</strong> The summit ridge is narrow and exposed, with significant drops on both sides. In poor visibility or high winds, navigation is critical.</li>
<li><strong>Rapid weather changes:</strong> The Alpine weather window is notoriously short. Storms can close in within hours, turning a manageable ascent into a survival situation.</li>
</ul>

<p>The approximately 50% success rate reflects the combination of technical difficulty, weather dependency, and the sheer speed required — the summit push from the Goûter Hut typically begins at 1–2 AM and involves 8–10 hours of sustained effort above 3,800 metres.</p>

<h2>Technical Skills Needed</h2>

<h3>Kilimanjaro: None</h3>

<p>This is not an exaggeration. If you can walk for 6–8 hours a day on uneven terrain, you have the technical skills required for Kilimanjaro. There is no glacier travel, no rope work, no need for crampons or ice axes. The mountain is a trek — a long, high, demanding trek, but a trek nonetheless. What matters is <a href="/kilimanjaro-training-plan/">aerobic fitness</a>, mental resilience, and how well your body tolerates altitude.</p>

<p>The most technically challenging moment on most routes is the Barranco Wall — a steep scramble that looks intimidating but is essentially a hands-and-feet climb on solid rock with good holds. Guides assist from above and below, and the wall has been climbed by tens of thousands of people with zero climbing experience.</p>

<h3>Mont Blanc: Real Mountaineering Skills</h3>

<p>Mont Blanc requires competence in the following before you set foot on the mountain:</p>

<ul>
<li><strong>Crampon walking:</strong> Moving confidently on steep ice and hard snow with 12-point crampons — including ascending, descending, and traversing</li>
<li><strong>Ice axe use:</strong> Self-arrest technique (stopping yourself if you fall on a snow slope), plus using the axe for balance on steep terrain</li>
<li><strong>Roped glacier travel:</strong> Walking roped to a partner across crevassed glaciers, maintaining correct rope spacing and tension</li>
<li><strong>Crevasse rescue basics:</strong> Using pulleys and prussik loops to extract a partner who has fallen into a crevasse</li>
<li><strong>Navigation in poor visibility:</strong> Basic compass and GPS skills for whiteout conditions</li>
</ul>

<p>Most people acquire these skills through a mountaineering training course — typically 2–5 days in the Alps or equivalent mountain range — before attempting Mont Blanc. Going without these skills is genuinely dangerous.</p>

<h2>Cost Comparison</h2>

<p>Both mountains represent significant financial investments, but the cost structures are very different.</p>

<h3>Kilimanjaro Cost Breakdown</h3>

<p>A Kilimanjaro climb is an all-inclusive package experience. Your operator handles permits, guides, porters, food, camping equipment, and logistics. <a href="/kilimanjaro-prices/">Prices</a> vary significantly based on operator quality, route, and duration:</p>

<h3>Mont Blanc Cost Breakdown</h3>

<p>Mont Blanc costs are more fragmented. You pay for a guide, hut accommodation, equipment, and transport separately, and there are often hidden costs that first-timers do not anticipate:</p>

<table>
<thead>
<tr><th>Cost Item</th><th>Kilimanjaro</th><th>Mont Blanc</th></tr>
</thead>
<tbody>
<tr><td><strong>International Flights</strong></td><td>$800–$1,500 (to Kilimanjaro Airport)</td><td>€300–€500 (to Geneva or nearby)</td></tr>
<tr><td><strong>Climb Package / Guide</strong></td><td>$2,000–$5,000 (all-inclusive)</td><td>€1,500–€3,000 (guide fee only)</td></tr>
<tr><td><strong>Accommodation</strong></td><td>Included in package (tents/huts)</td><td>€50–€120/night (mountain huts, 2–3 nights)</td></tr>
<tr><td><strong>Technical Gear</strong></td><td>$0 (no technical gear needed)</td><td>€200–€500 (crampons, axe, harness — rent or buy)</td></tr>
<tr><td><strong>Training Course</strong></td><td>$0 (no training needed)</td><td>€400–€800 (2–3 day mountaineering course)</td></tr>
<tr><td><strong>Food on Mountain</strong></td><td>Included in package</td><td>€30–€60/meal at huts</td></tr>
<tr><td><strong>Tips</strong></td><td>$250–$500 (guides + porters)</td><td>€100–€200 (guide tip)</td></tr>
<tr><td><strong>Estimated Total</strong></td><td><strong>$3,000–$6,500</strong></td><td><strong>€2,500–€5,000</strong></td></tr>
</tbody>
</table>

<p>Mont Blanc appears slightly cheaper on paper, but the hidden costs add up. Hut fees at Goûter Hut (€120+ per night including half board) and meals at mountain refuges are expensive. If you need a training course — and most first-timers do — that adds €400–€800. Gear rental or purchase can add another €200–€500 if you do not already own mountaineering equipment.</p>

<h2>Training Requirements</h2>

<h3>Kilimanjaro: 8–12 Weeks of Fitness Training</h3>

<p>A solid <a href="/kilimanjaro-training-plan/">Kilimanjaro training plan</a> focuses on cardiovascular fitness and leg endurance. No technical training is needed. A typical 12-week programme includes:</p>

<ul>
<li><strong>Weeks 1–4:</strong> Build an aerobic base — hiking 2–3 times per week, gradually increasing distance and elevation gain</li>
<li><strong>Weeks 5–8:</strong> Increase intensity — longer hikes (4–6 hours), hill repeats, stair climbing with a weighted pack</li>
<li><strong>Weeks 9–12:</strong> Peak training — back-to-back long hikes on weekends, simulating consecutive days on the mountain</li>
</ul>

<p>The goal is to be comfortable walking 6–8 hours per day on uneven terrain with a daypack. You do not need to be an elite athlete — many people in their 50s and 60s summit successfully — but you do need a solid cardiovascular base.</p>

<h3>Mont Blanc: 3–6 Months Including Technical Training</h3>

<p>Mont Blanc preparation has two components: fitness training (similar to Kilimanjaro but with more emphasis on sustained steep climbing) and technical skills training. A typical timeline:</p>

<ul>
<li><strong>Months 1–2:</strong> Aerobic fitness — trail running, steep hiking, gym sessions focusing on leg strength and cardiovascular endurance</li>
<li><strong>Month 3:</strong> Mountaineering skills course — a 2–5 day course in the Alps covering crampon technique, ice axe use, roped glacier travel, and crevasse rescue</li>
<li><strong>Months 4–5:</strong> Practice climbs — at least 1–2 guided ascents of lower Alpine peaks (Breithorn, Gran Paradiso, or similar 4,000m peaks) to apply your skills in a real mountain environment</li>
<li><strong>Month 6:</strong> Mont Blanc attempt</li>
</ul>

<p>The technical training is non-negotiable. Attempting Mont Blanc without crampon and rope skills is irresponsible and potentially fatal.</p>

<h2>Best Time to Climb</h2>

<h3>Kilimanjaro: January–March and June–October</h3>

<p>Kilimanjaro has two main climbing seasons that coincide with the dry periods:</p>

<ul>
<li><strong>June–October:</strong> The primary dry season. Clear skies, cold temperatures, most popular period. July and August are peak months with the highest traffic.</li>
<li><strong>January–March:</strong> The secondary dry season. Slightly warmer, fewer climbers, excellent conditions. Late February through early March is often considered the sweet spot — good weather with lower crowds.</li>
</ul>

<p>The mountain can be climbed year-round, but the rainy seasons (April–May and November) bring challenging conditions with lower success rates due to poor visibility, wet trails, and cold precipitation at altitude.</p>

<h3>Mont Blanc: June–September</h3>

<p>Mont Blanc's climbing season is much shorter and entirely weather-dependent:</p>

<ul>
<li><strong>June:</strong> Season opens but snow coverage is still heavy, some routes not fully accessible</li>
<li><strong>July–August:</strong> Peak season. Longest days, most stable weather windows, but also the most crowded</li>
<li><strong>September:</strong> Season winds down. Can offer excellent conditions with fewer people, but weather windows become less frequent</li>
</ul>

<p>Even within the season, attempts are entirely dependent on weather forecasts. A typical guided Mont Blanc trip includes 1–2 "weather waiting" days in Chamonix before the summit push. If no weather window opens during your trip, you do not climb.</p>

<h2>Risk and Safety</h2>

<p>This is where the two mountains diverge most dramatically.</p>

<h3>Kilimanjaro: Low Objective Danger</h3>

<p>Kilimanjaro sees approximately <strong>10 deaths per year from roughly 50,000 climbers</strong> — a fatality rate of about 0.02%. The vast majority of deaths are caused by altitude sickness (specifically high-altitude pulmonary edema or cerebral edema) in climbers who ignored symptoms and continued ascending. Other causes include heart attacks (often in older climbers with undiagnosed cardiac conditions) and rare cases of falls on the descent.</p>

<p>The key point: Kilimanjaro's risks are largely <strong>manageable</strong>. Proper acclimatization (choosing a 7–8 day route), listening to your body, following your guide's advice, and descending at the first sign of severe <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a> reduces the risk to very low levels. There are no objective hazards like rockfall, avalanche, or crevasses on the standard trekking routes.</p>

<h3>Mont Blanc: Significant Objective Danger</h3>

<p>Mont Blanc sees approximately <strong>100 deaths per year from roughly 20,000 attempts</strong> — a fatality rate of about 0.5%, making it <strong>25 times more dangerous per attempt</strong> than Kilimanjaro. Death causes include:</p>

<ul>
<li><strong>Falls on steep terrain:</strong> Slipping on ice or snow and sliding into rocks or off cliffs — the most common cause of death</li>
<li><strong>Rockfall in the Goûter Couloir:</strong> The Grand Couloir is an active rockfall zone that has killed dozens of climbers. Timing the crossing is critical, and even experienced climbers are exposed to risk from above.</li>
<li><strong>Weather-related deaths:</strong> Sudden storms, whiteouts, and extreme cold causing hypothermia, disorientation, and falls</li>
<li><strong>Crevasse falls:</strong> Falling into hidden crevasses on the glacier sections</li>
<li><strong>Avalanche:</strong> Less common but a risk on certain slopes and in certain conditions</li>
<li><strong>Altitude sickness:</strong> Less frequent than on Kilimanjaro due to lower elevation, but still a factor</li>
</ul>

<p>Many of these are <strong>objective hazards</strong> — dangers that exist regardless of your skill level. You cannot train away the risk of a rock falling on you in the Goûter Couloir or a sudden storm pinning you on the summit ridge. This is fundamentally different from Kilimanjaro, where nearly all risk can be managed through proper planning and behaviour.</p>

<h2>Which Mountain Should You Climb First?</h2>

<p>If you are choosing between the two and have no previous high-altitude or mountaineering experience, <strong>Kilimanjaro is the better first mountain</strong>. Here is why:</p>

<ul>
<li><strong>No technical skills needed:</strong> You can focus entirely on the physical and mental challenge of altitude without worrying about technical competence on ice and rock</li>
<li><strong>Longer acclimatization:</strong> A 7–8 day Kilimanjaro itinerary gives your body days to adapt. Mont Blanc's rapid ascent profile offers little acclimatization time.</li>
<li><strong>Full guide support:</strong> On Kilimanjaro, you have a lead guide, assistant guides, a cook, and porters — a complete support team that handles logistics so you can focus on walking</li>
<li><strong>Lower objective danger:</strong> No crevasses, no rockfall, no glacier travel. The mountain is a controlled environment by mountaineering standards.</li>
<li><strong>Higher success rates:</strong> On well-chosen routes, Kilimanjaro success rates reach 85–95%. Mont Blanc's 50% rate means you have a coin-flip chance of summiting.</li>
<li><strong>Incredible standalone experience:</strong> Standing on the roof of Africa at 5,895 metres, above the clouds, with glaciers at your feet — it is a profound experience in its own right, not just a stepping stone to harder climbs</li>
</ul>

<h2>Can You Do Both?</h2>

<p>Absolutely — and many mountaineers do. The natural progression is:</p>

<ol>
<li><strong>Kilimanjaro first:</strong> Proves you can handle extreme altitude, gives you confidence in multi-day mountain expeditions, and provides a reference point for how your body responds to elevation</li>
<li><strong>Mountaineering training:</strong> Take a skills course in the Alps to learn crampon, ice axe, and rope techniques</li>
<li><strong>A practice 4,000m peak:</strong> Climb Gran Paradiso (4,061m), Breithorn (4,164m), or a similar Alpine peak to apply your skills in a lower-stakes environment</li>
<li><strong>Mont Blanc:</strong> With altitude experience from Kilimanjaro and technical skills from training, you approach Mont Blanc as a prepared mountaineer rather than a novice</li>
</ol>

<p>This progression typically takes 1–3 years depending on how quickly you can schedule the training and practice climbs. It is a well-trodden path — many European mountaineering clubs recommend exactly this sequence for members progressing from trekking to alpine climbing.</p>

<h2>Which Mountain Is Right for You?</h2>

<table>
<thead>
<tr><th>Your Situation</th><th>Recommended Mountain</th><th>Why</th></tr>
</thead>
<tbody>
<tr><td>First big mountain, no mountaineering experience</td><td><strong>Kilimanjaro</strong></td><td>No technical skills needed, full guide support, manageable risk</td></tr>
<tr><td>Want the highest altitude challenge</td><td><strong>Kilimanjaro</strong></td><td>Over 1,000m higher than Mont Blanc — a true high-altitude experience</td></tr>
<tr><td>Experienced mountaineer seeking a technical challenge</td><td><strong>Mont Blanc</strong></td><td>Glacier travel, crampon work, exposed ridge — real mountaineering</td></tr>
<tr><td>Short on time (under a week)</td><td><strong>Mont Blanc</strong></td><td>Summit push is 2–3 days; Kilimanjaro needs 6–9 days minimum</td></tr>
<tr><td>Travelling from Europe on a budget</td><td><strong>Mont Blanc</strong></td><td>No international flights — drive or take a short flight to Geneva/Chamonix</td></tr>
<tr><td>Travelling from North America, Asia, or elsewhere</td><td><strong>Kilimanjaro</strong></td><td>If you are already flying long-haul, Kilimanjaro offers a more unique experience</td></tr>
<tr><td>Want a safari + mountain combo</td><td><strong>Kilimanjaro</strong></td><td>Combine with a Serengeti or Ngorongoro safari before or after the climb</td></tr>
<tr><td>Training for Himalayan expeditions</td><td><strong>Both</strong></td><td>Kilimanjaro for altitude tolerance, Mont Blanc for technical skills</td></tr>
<tr><td>Want the safest possible experience</td><td><strong>Kilimanjaro</strong></td><td>25x lower fatality rate than Mont Blanc per attempt</td></tr>
<tr><td>Want bragging rights among mountaineers</td><td><strong>Mont Blanc</strong></td><td>Technically harder; respected as a genuine mountaineering achievement</td></tr>
</tbody>
</table>

<h2>How These Mountains Compare to Others</h2>

<p>Kilimanjaro and Mont Blanc are just two peaks on the progression chart. If you are thinking about which mountains to climb in what order, here is where they fit relative to other popular objectives:</p>

<ul>
<li><strong>Easier than Kilimanjaro:</strong> Mount Meru (4,566m), Mount Kenya Point Lenana (4,985m), Mount Toubkal (4,167m)</li>
<li><strong>Comparable to Kilimanjaro:</strong> <a href="/kilimanjaro-vs-everest-base-camp/">Everest Base Camp</a> trek (5,364m), <a href="/kilimanjaro-vs-rainier/">Mount Rainier</a> (4,392m, but technically harder)</li>
<li><strong>Comparable to Mont Blanc:</strong> <a href="/kilimanjaro-vs-elbrus/">Mount Elbrus</a> (5,642m), Aconcagua Normal Route (6,961m)</li>
<li><strong>Harder than both:</strong> Denali (6,190m), Island Peak + Everest Base Camp, any Himalayan 8,000m peak</li>
</ul>

<h2>Final Verdict</h2>

<p>Kilimanjaro and Mont Blanc are both extraordinary mountains, but they test different things. Kilimanjaro tests your body's ability to function at extreme altitude over a sustained period. Mont Blanc tests your mountaineering competence in a high-consequence Alpine environment. Neither is "better" — they are different challenges that appeal to different people at different stages of their mountain careers.</p>

<p>If you are starting out, <a href="/climbing-kilimanjaro/">climb Kilimanjaro first</a>. It will give you altitude experience, expedition confidence, and one of the great mountain memories of a lifetime. If you catch the mountaineering bug — and most people do — Mont Blanc will be waiting when you are ready for the next step.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-geology                                        */
/* ------------------------------------------------------------------ */
const post2Content = `
<p><a href="/mount-kilimanjaro/">Mount Kilimanjaro</a> is a stratovolcano — a massive volcanic mountain that rose from the flat East African savanna over the course of roughly 2.5 million years through repeated eruptions, lava flows, and ash deposits. It is not a single volcano but a complex of three distinct volcanic cones: Shira, Mawenzi, and Kibo. The youngest cone, Kibo, holds the summit at <a href="/mount-kilimanjaro-height/">5,895 metres</a> and is classified as <strong>dormant, not extinct</strong> — meaning it has not erupted in recent history but retains the geological potential to do so. Fumarolic activity (volcanic gas emissions) was detected inside the summit crater as recently as the 2000s. Understanding the geology of Kilimanjaro transforms the climbing experience: every rock formation, every plateau, every volcanic plug on the mountain tells a story that spans millions of years of Earth's history.</p>

<h2>The Great Rift Valley Connection</h2>

<p>Kilimanjaro owes its existence to one of the most dramatic geological processes on Earth: the splitting of the African continent. The <strong>East African Rift System</strong> is a tectonic boundary where the African Plate is slowly tearing apart — the Somali Plate is pulling away from the Nubian Plate at a rate of roughly 6–7 millimetres per year. This rifting began approximately 25–30 million years ago and has created a chain of geological features stretching from the Afar Triangle in Ethiopia to Mozambique: rift valleys, lakes (Tanganyika, Malawi, Turkana), and — critically — volcanoes.</p>

<p>As the crust thins along the rift, hot mantle rock rises toward the surface, partially melts, and creates magma that erupts to form volcanoes. Kilimanjaro sits approximately 80 kilometres east of the eastern branch of the rift, on a zone of crustal weakness created by the same tectonic forces. The volcano is not directly on the rift itself but on a related fracture zone — a splay fault where magma found pathways to the surface through pre-existing weaknesses in the East African basement rock (ancient metamorphic and granitic rocks that are over 600 million years old).</p>

<p>This geological setting explains why Kilimanjaro exists where it does: the combination of rifting-related magma generation and favourable crustal fracture zones created the plumbing system through which enormous volumes of volcanic material were delivered to the surface over millions of years, building the massive volcanic complex we see today.</p>

<h2>Timeline of Formation</h2>

<p>Kilimanjaro's geological history spans approximately 2.5 million years of volcanic activity. The following timeline is based on radiometric dating of volcanic rocks and geological mapping of the mountain's structure:</p>

<table>
<thead>
<tr><th>Date (Approximate)</th><th>Event</th><th>Cone</th></tr>
</thead>
<tbody>
<tr><td>~2.5 million years ago</td><td>Volcanic activity begins in the Kilimanjaro area as the East African Rift System creates magma pathways</td><td>Pre-Kilimanjaro</td></tr>
<tr><td>~1.9 million years ago</td><td>Shira cone forms — the oldest of the three cones, built through repeated eruptions of basaltic and phonolitic lavas</td><td>Shira</td></tr>
<tr><td>~1 million years ago</td><td>Mawenzi cone forms east of Shira, building a separate volcanic peak through eruptions of a slightly different magma composition</td><td>Mawenzi</td></tr>
<tr><td>~750,000 years ago</td><td>Kibo cone begins forming between Shira and Mawenzi, eventually growing to become the tallest of the three</td><td>Kibo</td></tr>
<tr><td>~500,000 years ago</td><td>Shira's magma chamber empties and the cone collapses inward, forming the broad Shira Plateau (caldera)</td><td>Shira</td></tr>
<tr><td>~360,000 years ago</td><td>Major Kibo eruption creates the current summit caldera — the 2.5km-wide crater visible today</td><td>Kibo</td></tr>
<tr><td>~200,000 years ago</td><td>Last major eruption of Kibo — large lava flows reshape the summit area</td><td>Kibo</td></tr>
<tr><td>~100,000 years ago</td><td>Mawenzi ceases volcanic activity and begins the erosional process that creates its current jagged profile</td><td>Mawenzi</td></tr>
<tr><td>~10,000 years ago</td><td>Most recent volcanic activity — minor eruptions and fumarolic activity inside the Kibo crater</td><td>Kibo</td></tr>
<tr><td>2000s</td><td>Fumarolic activity (sulphur gas emissions) detected in the Reusch Crater, confirming Kibo's dormant status</td><td>Kibo</td></tr>
</tbody>
</table>

<h2>The Three Volcanic Cones</h2>

<p>Kilimanjaro is not one volcano but three — a volcanic complex formed by three separate eruption centres that grew close enough together to merge into a single massif. Each cone has its own character, history, and geological significance.</p>

<h3>Shira (4,005m) — The Oldest Cone</h3>

<p>Shira is the oldest and westernmost of Kilimanjaro's three cones. Formed approximately 1.9 million years ago, it was once a full-sized volcanic peak — geological evidence suggests it may have reached heights of 4,900 metres or more before its collapse. Roughly 500,000 years ago, Shira's magma chamber emptied and the summit cone collapsed inward, creating the broad, flat <strong><a href="/kilimanjaro-shira-plateau/">Shira Plateau</a></strong> that is one of the most distinctive features of the mountain today.</p>

<p>The Shira Plateau is essentially a caldera floor — the remnant of the collapsed volcanic cone, filled with volcanic debris and weathered over hundreds of thousands of years into a rolling, moorland-covered highland at approximately 3,800–4,000 metres. Climbers on the Lemosho, Machame, and Shira routes walk across this plateau, often without realizing they are walking inside a collapsed volcano. The plateau edges — particularly the Shira Cathedral and Shira Needle formations — are remnants of the original crater rim.</p>

<p>Shira is classified as <strong>extinct</strong>. Its volcanic plumbing is completely inactive, and there is no geological evidence of any activity for at least 500,000 years.</p>

<h3>Mawenzi (5,149m) — The Eroded Spire</h3>

<p><a href="/kilimanjaro-mawenzi-peak/">Mawenzi</a> is the second-oldest cone, formed approximately 1 million years ago east of the already-existing Shira. At its peak, Mawenzi may have rivalled Kibo in height — some estimates suggest a summit elevation of 5,500–6,000 metres before erosion took its toll. Today, its highest point (Hans Meyer Peak) stands at 5,149 metres, making it the third-highest point in Africa.</p>

<p>What makes Mawenzi geologically remarkable is its extreme state of erosion. Because volcanic activity ceased much earlier on Mawenzi than on Kibo, the peak has been exposed to erosion — glacial carving, freeze-thaw weathering, rockfall — for approximately 500,000 years longer. The result is a dramatically sculpted mountain that looks nothing like Kibo's smooth dome. Mawenzi's spires, pinnacles, and deep gullies are the exposed volcanic core — the harder basalt and phonolite of the original magma conduits, left standing after the softer outer layers of ash and tuff weathered away.</p>

<p>Mawenzi is classified as <strong>extinct</strong>.</p>

<h3>Kibo (5,895m) — The Dormant Giant</h3>

<p>Kibo is the youngest, tallest, and most geologically active of the three cones. It began forming approximately 750,000 years ago and continued erupting until roughly 10,000 years ago (with possible minor activity even more recently). Kibo's relative youth explains its smooth, dome-shaped profile — unlike the heavily eroded Mawenzi, Kibo has not had time for erosion to significantly reshape its form.</p>

<p>The summit of Kibo contains a nested series of volcanic features:</p>

<ul>
<li><strong>The summit caldera:</strong> A roughly 2.5-kilometre-wide crater formed by a major eruption approximately 360,000 years ago. The rim of this caldera includes Uhuru Peak (5,895m), Stella Point (5,756m), and Gilman's Point (5,681m) — the three main summit points climbers aim for.</li>
<li><strong>The Reusch Crater:</strong> A smaller crater (approximately 900 metres wide) within the main caldera, named after Pastor Richard Reusch who explored it in the 1920s. This inner crater represents a later phase of volcanic activity.</li>
<li><strong>The Ash Pit:</strong> The innermost crater within the Reusch Crater — a deep, steep-walled pit approximately 350 metres across and 120 metres deep. The Ash Pit is the most recent volcanic feature on Kilimanjaro and is the location of ongoing fumarolic activity.</li>
</ul>

<h2>Is Kilimanjaro Still Active?</h2>

<p>This is one of the most common geological questions about the mountain, and the answer is nuanced. Kilimanjaro — specifically the Kibo cone — is classified as <strong>dormant</strong>, which means it is not currently erupting but has not been definitively ruled out for future eruptions.</p>

<p>The evidence for ongoing geological activity includes:</p>

<ul>
<li><strong>Fumarolic activity:</strong> Volcanic gas emissions (primarily sulphur dioxide and carbon dioxide) have been detected in the Reusch Crater and Ash Pit. These emissions were measurable as recently as the 2000s, indicating that heat from a magma source deep beneath the mountain is still reaching the surface.</li>
<li><strong>The Ash Pit:</strong> The steep-walled inner crater shows relatively fresh volcanic deposits — loose ash and pumice that have not been significantly weathered, suggesting they are geologically recent (thousands rather than hundreds of thousands of years old).</li>
<li><strong>Geothermal heat:</strong> The inner crater area shows elevated ground temperatures compared to the surrounding terrain, indicating subsurface heat sources.</li>
</ul>

<p>However, the risk of a major eruption is considered extremely low. There is no evidence of magma movement at shallow depths, no seismic swarms (earthquake clusters that typically precede eruptions), and no ground deformation detected by satellite monitoring. If Kilimanjaro were to show signs of reawakening, volcanologists would expect months to years of precursory activity before any eruption — plenty of time for evacuation and route closures.</p>

<p>The scientific consensus: Kibo is a potentially active volcano that could theoretically erupt again on geological timescales, but there is no evidence of any imminent volcanic threat. For climbers, the volcanic hazard is effectively zero.</p>

<h2>Rock Types Found on Kilimanjaro</h2>

<p>As you climb Kilimanjaro, you walk over a variety of volcanic rock types, each telling a different part of the mountain's eruption history. The dominant rock types change with elevation and location:</p>

<table>
<thead>
<tr><th>Elevation Zone</th><th>Dominant Rock Types</th><th>Appearance</th><th>How It Formed</th></tr>
</thead>
<tbody>
<tr><td><strong>Rainforest (1,800–2,800m)</strong></td><td>Weathered basalt, volcanic soil</td><td>Dark soil, heavily weathered rock hidden under vegetation</td><td>Ancient lava flows, deeply weathered by tropical rainfall and biological activity over millions of years</td></tr>
<tr><td><strong>Moorland (2,800–4,000m)</strong></td><td>Basalt, phonolite, volcanic ash</td><td>Dark grey to black angular rock, scattered boulders</td><td>Lava flows and pyroclastic deposits from all three volcanic cones</td></tr>
<tr><td><strong>Alpine desert (4,000–5,000m)</strong></td><td>Trachyte, phonolite, volcanic scree</td><td>Lighter grey rock, loose scree fields, angular fragments</td><td>Higher-altitude lava flows, more silica-rich magma compositions</td></tr>
<tr><td><strong>Summit zone (5,000m+)</strong></td><td>Volcanic ash, pumice, lava, glacial moraine</td><td>Fine grey-brown ash, white pumice fragments, dark lava, glacial debris</td><td>Most recent eruptions, ash fall deposits, glacial transport of rock material</td></tr>
</tbody>
</table>

<h3>Key Rock Types Explained</h3>

<ul>
<li><strong>Basalt:</strong> The most common rock on Kilimanjaro. A dark, fine-grained volcanic rock formed when magma with relatively low silica content erupts and cools quickly. Basalt forms the foundation of all three volcanic cones and is visible throughout the mountain.</li>
<li><strong>Phonolite:</strong> A lighter-coloured volcanic rock with a distinctive ringing sound when struck (the name comes from the Greek <em>phonē</em>, meaning "sound"). Phonolite is formed from magma with intermediate silica content and is particularly common on Mawenzi and the upper slopes of Kibo.</li>
<li><strong>Trachyte:</strong> A light grey volcanic rock found at higher elevations, formed from more evolved (silica-rich) magma. Trachyte is less common than basalt but visible in the alpine desert zone.</li>
<li><strong>Volcanic ash and pumice:</strong> Lightweight, porous volcanic material ejected during explosive eruptions. The summit crater area of Kibo contains significant deposits of loose ash and pumice, particularly around the Ash Pit.</li>
<li><strong>Glacial moraine:</strong> Not volcanic rock itself, but material transported and deposited by glaciers. Moraine deposits — mixed piles of rock, gravel, and sand — are visible near the <a href="/kilimanjaro-glaciers/">retreating glaciers</a> on Kibo, marking where ice has advanced and retreated over thousands of years.</li>
</ul>

<h2>Geological Features You Will See on the Climb</h2>

<p>One of the remarkable things about climbing Kilimanjaro is that the mountain's geological history is written in the landscape around you. Here are the major geological features you will encounter and what they represent:</p>

<h3>Shira Plateau — A Collapsed Caldera</h3>

<p>The broad, flat <a href="/kilimanjaro-shira-plateau/">Shira Plateau</a> at approximately 3,800–4,000 metres is the floor of a collapsed volcanic caldera. When Shira's magma chamber emptied roughly 500,000 years ago, the summit cone collapsed inward, leaving this broad, gently undulating highland. The plateau edges — including the Shira Cathedral rock formation — are remnants of the original crater rim. Walking across the Shira Plateau on the Lemosho or Machame routes, you are literally walking inside a dead volcano.</p>

<h3>Lava Tower — A Volcanic Plug</h3>

<p><a href="/kilimanjaro-lava-tower/">Lava Tower</a> at 4,630 metres is a <strong>volcanic plug</strong> — a formation created when magma solidified inside a volcanic vent, and the surrounding softer rock subsequently eroded away, leaving the harder igneous core standing alone. The tower rises approximately 90 metres from its base and is composed of dense basalt that resisted the erosion that removed the surrounding material. It marks the location of a parasitic vent — a secondary volcanic conduit on the flank of the main volcano.</p>

<h3>Barranco Wall — Columnar Basalt</h3>

<p>The Barranco Wall is a 257-metre near-vertical cliff face in the Great Barranco Valley. The wall exposes <strong>columnar basalt</strong> — vertical columns of basalt formed when a thick lava flow cooled slowly and cracked into hexagonal (and sometimes pentagonal or irregular) columns. This formation is created by thermal contraction as lava cools from the outside in, creating stress fractures that propagate through the rock in a regular geometric pattern. The same process created the Giant's Causeway in Northern Ireland and Devils Postpile in California.</p>

<h3>The Saddle — An Alpine Desert Between Two Volcanoes</h3>

<p>The broad, flat area between Kibo and Mawenzi at approximately 4,200–4,600 metres is known as the Saddle. This vast expanse of volcanic ash and sparse rubble is one of the largest areas of high-altitude tundra in Africa. The Saddle formed from ash and pyroclastic deposits ejected by both Kibo and Mawenzi, creating a flat infill between the two cones. Its lunar appearance — fine grey-brown volcanic ash with almost no vegetation — gives a tangible sense of Kilimanjaro's volcanic nature.</p>

<h3>Summit Crater — A Living Volcanic Caldera</h3>

<p>The summit of Kibo contains a 2.5-kilometre-wide caldera with nested craters inside it. The outermost caldera rim includes Uhuru Peak, Stella Point, and Gilman's Point. Within it, the Reusch Crater (900m wide) contains the Ash Pit (350m wide, 120m deep) — the most recent volcanic feature, with visible fumarolic deposits (yellow sulphur staining) on its walls.</p>

<h3>Breach Wall — The Crater's Western Wall</h3>

<p>The Breach Wall is the western face of Kibo's summit caldera — a steep, 800-metre rock and ice face that drops from the crater rim to the western glaciers. The wall exposes a cross-section of Kibo's volcanic history, with visible layers of lava flows, ash deposits, and ice. The Western Breach route ascends through this wall and was historically used as a climbing route, though it has been subject to rockfall incidents due to the retreating ice that previously cemented the loose volcanic rock in place.</p>

<h2>Erosion and Weathering: How the Mountain Changes</h2>

<p>Kilimanjaro is not static — it is being actively reshaped by multiple erosional processes:</p>

<ul>
<li><strong>Glacial erosion:</strong> The <a href="/kilimanjaro-glaciers/">glaciers on Kibo</a> have carved cirques, moraines, and U-shaped valleys into the volcanic rock. As glaciers retreat (they have lost over 80% of their coverage since 1912), they expose fresh rock to other forms of erosion.</li>
<li><strong>Freeze-thaw weathering:</strong> Water seeps into rock fractures, freezes at night (expanding by 9% in volume), and gradually prises rock apart. This is the dominant weathering process above 4,000 metres and is responsible for the loose scree slopes that characterise the alpine desert and summit zones.</li>
<li><strong>Water erosion:</strong> Rainfall and snowmelt carve gullies and ravines into the volcanic slopes, particularly on the wetter southern and eastern faces. The deep valleys of Kilimanjaro's lower slopes (Barranco Valley, Umbwe Valley) were carved primarily by water erosion.</li>
<li><strong>Biological weathering:</strong> In the lower zones (rainforest and moorland), plant roots penetrate rock fractures and gradually widen them. Lichens and mosses produce organic acids that chemically dissolve rock surfaces.</li>
</ul>

<p>The net result is that Kilimanjaro is slowly losing height. Geological estimates suggest the summit may be eroding at a rate of centimetres per century — imperceptible on a human timescale but significant over geological time. Mawenzi, with its much longer exposure to erosion, has likely lost hundreds of metres of height since its volcanic peak.</p>

<h2>Comparison with Other East African Volcanoes</h2>

<p>Kilimanjaro is the highest volcano in Africa, but it sits within a remarkable chain of volcanic features along the East African Rift System. Understanding its neighbours provides context for Kilimanjaro's place in the broader geological story:</p>

<table>
<thead>
<tr><th>Volcano</th><th>Height</th><th>Status</th><th>Last Eruption</th><th>Type</th></tr>
</thead>
<tbody>
<tr><td><strong>Mount Kilimanjaro (Kibo)</strong></td><td>5,895m</td><td>Dormant</td><td>~10,000 years ago (minor activity)</td><td>Stratovolcano</td></tr>
<tr><td><strong>Mount Meru</strong></td><td>4,566m</td><td>Active</td><td>1910</td><td>Stratovolcano</td></tr>
<tr><td><strong>Mount Kenya</strong></td><td>5,199m</td><td>Extinct</td><td>~2.6 million years ago</td><td>Stratovolcano (eroded plug)</td></tr>
<tr><td><strong>Ol Doinyo Lengai</strong></td><td>2,962m</td><td>Active</td><td>2007–2008 (ongoing minor activity)</td><td>Stratovolcano (natrocarbonatite)</td></tr>
<tr><td><strong>Mount Elgon</strong></td><td>4,321m</td><td>Extinct</td><td>~12 million years ago</td><td>Shield volcano</td></tr>
<tr><td><strong>Nyiragongo</strong></td><td>3,470m</td><td>Active</td><td>2021</td><td>Stratovolcano (lava lake)</td></tr>
<tr><td><strong>Erta Ale</strong></td><td>613m</td><td>Active</td><td>Continuous</td><td>Shield volcano (lava lake)</td></tr>
</tbody>
</table>

<p>Two of these neighbours deserve special mention:</p>

<h3>Mount Meru (4,566m)</h3>

<p>Meru is Kilimanjaro's closest volcanic neighbour, visible from several points on the Kilimanjaro climb. It is an <strong>active volcano</strong> that last erupted in 1910, creating the distinctive horseshoe-shaped caldera visible today. Meru is geologically younger and more active than Kilimanjaro, and its dramatic collapse crater (created by a massive lateral eruption that blew out the eastern face) provides a vivid example of the destructive power of volcanic eruptions — a reminder that Kilimanjaro's own cones experienced similar events in their past.</p>

<h3>Ol Doinyo Lengai (2,962m)</h3>

<p>Visible from Kilimanjaro on exceptionally clear days, Ol Doinyo Lengai ("Mountain of God" in Maasai) is one of the most geologically significant volcanoes on Earth. It is the only volcano in the world that erupts <strong>natrocarbonatite lava</strong> — a bizarre, sodium- and carbonate-rich lava that erupts at temperatures of only 500–600°C (compared to 1,000–1,200°C for basaltic lava). This lava is black when fresh, turns white within hours of exposure to moisture, and is cool enough to flow around scientists' boots without setting them on fire. Ol Doinyo Lengai's unique chemistry provides insights into the exotic magma processes occurring deep beneath the East African Rift.</p>

<h2>What the Geology Means for Climbers</h2>

<p>Understanding Kilimanjaro's geology enriches the climbing experience in practical ways:</p>

<ul>
<li><strong>The <a href="/kilimanjaro-climate-zones/">climate zones</a> are geologically controlled:</strong> The volcanic soils at different elevations support different vegetation types, creating the five distinct ecological zones (cultivation, rainforest, moorland, alpine desert, arctic) that make Kilimanjaro such a unique trek.</li>
<li><strong>Route selection relates to geology:</strong> The western routes (Lemosho, Machame) traverse the Shira Plateau and Lava Tower — geological features that also serve as the mountain's best acclimatization opportunities.</li>
<li><strong>The summit crater is a volcanic experience:</strong> Reaching Uhuru Peak and looking down into the caldera, the Reusch Crater, and the Ash Pit is not just a physical achievement — it is a direct encounter with the volcanic forces that built the mountain.</li>
<li><strong>The retreating glaciers tell a climate story:</strong> The shrinking of Kilimanjaro's glaciers — from 12 km² in 1912 to less than 1.5 km² today — is visible in the moraine deposits and trimlines that mark where ice once stood. This is geology and climate science happening in real time.</li>
</ul>

<p>Kilimanjaro is not just a high point to reach — it is a geological journey through 2.5 million years of volcanic history, from the collapsed caldera of Shira to the dormant summit crater of Kibo. Every step on the mountain takes you across a landscape shaped by fire, ice, and time.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-vs-mont-blanc",
    title: "Kilimanjaro vs Mont Blanc: Which Mountain Should You Climb?",
    metaTitle: "Kilimanjaro vs Mont Blanc — Which to Climb First?",
    metaDescription:
      "Kilimanjaro vs Mont Blanc comparison: difficulty, cost, duration, altitude, technical skills needed, success rates, and which mountain is right for your experience level.",
    excerpt:
      "Kilimanjaro and Mont Blanc are both bucket-list mountains, but they demand fundamentally different skills. Kilimanjaro is a 5,895m altitude trek requiring no technical ability. Mont Blanc is a 4,808m technical mountaineering ascent involving glaciers, crampons, and ice axes. This guide compares difficulty, cost, training, risk, and which mountain to climb first.",
    content: post1Content,
    categoryName: "Kilimanjaro",
    categorySlug: "kilimanjaro",
    tags: [
      { name: "Mont Blanc", slug: "mont-blanc" },
      { name: "Comparison", slug: "comparison" },
      { name: "Mountaineering", slug: "mountaineering" },
    ],
  },
  {
    slug: "kilimanjaro-geology",
    title:
      "The Geology of Kilimanjaro: How Africa's Highest Mountain Was Formed",
    metaTitle: "Kilimanjaro Geology — How the Mountain Was Formed",
    metaDescription:
      "The geological history of Mount Kilimanjaro: volcanic formation, three cones (Kibo, Mawenzi, Shira), the Great Rift Valley connection, rock types, and why Kibo could erupt again.",
    excerpt:
      "Mount Kilimanjaro is a 2.5-million-year-old stratovolcano with three cones — Shira, Mawenzi, and Kibo — created by the same tectonic forces splitting Africa apart along the East African Rift. Learn about its formation timeline, volcanic rock types, geological features visible on the climb, and why Kibo is classified as dormant, not extinct.",
    content: post2Content,
    categoryName: "Kilimanjaro",
    categorySlug: "kilimanjaro",
    tags: [
      { name: "Geology", slug: "geology" },
      { name: "Science", slug: "science" },
      { name: "Volcano", slug: "volcano" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 23a)...\n");

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

    console.log(`  Upserted: ${result.slug}`);
  }

  console.log(`\nDone — ${posts.length} blog posts upserted.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
