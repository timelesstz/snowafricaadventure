/**
 * seed-kilimanjaro-blog-posts-17a.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 17a):
 *  61. kilimanjaro-boots-guide
 *  62. kilimanjaro-sleeping-bags
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-17a.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const post1Content = `
<p>Of everything on your <a href="/the-ultimate-kilimanjaro-packing-list/">Kilimanjaro packing list</a>, your boots are the single most important decision you will make. Not your jacket, not your sleeping bag, not your backpack — your boots. Over seven days you will walk roughly 70 kilometres across terrain that shifts from humid rainforest, through moorland mud, over alpine desert rock, up loose volcanic scree, and back down a knee-punishing descent through dripping cloud forest. Our guides have watched thousands of climbers attempt the summit, and the ones who suffer most are almost never undone by altitude or cold — they are undone by boots that blister, leak, slip, or collapse at the ankle when it matters most.</p>

<p>This guide covers everything: boot types, the features that actually matter at altitude, our tested recommendations across price ranges, how to break boots in properly, the sock system that prevents blisters, and whether renting boots in Moshi is a viable option. We want you standing on Uhuru Peak thinking about the sunrise, not about the agony in your feet.</p>

<h2>Why Boots Are the Most Critical Gear Decision</h2>

<p>Your feet absorb every step of the roughly 35,000-40,000 steps per day you take on Kilimanjaro. Unlike a jacket you can swap at camp or a headlamp with spare batteries, your boots are non-replaceable once you leave the gate. If they fail on Day 3, you have four more days of pain ahead with no alternative. We have evacuated climbers who developed such severe blisters from poor-fitting boots that they could not walk — on a mountain where walking out is the only exit.</p>

<p>The terrain demands more from boots than a typical day hike. The Barranco Wall requires scrambling up near-vertical rock where ankle support prevents rolled joints. The scree slopes above Barafu Camp at 4,700m shift under your feet on every step, demanding aggressive sole grip. The <a href="/kilimanjaro-descent-tips/">Mweka descent route</a> drops 3,000m through slippery mud and exposed roots where toe-box room prevents blackened toenails. No single pair of trainers, approach shoes, or low-cut hiking shoes handles all of these conditions adequately.</p>

<h2>Boot Types: What Works on Kilimanjaro</h2>

<h3>Leather vs Synthetic</h3>

<p>Traditional full-leather boots (like the classic Scarpa SL) offer outstanding durability, naturally mould to your foot over time, and resist abrasion from volcanic rock. The trade-off is weight (typically 800-1,000g per boot) and a longer break-in period — four to eight weeks minimum. Full-leather boots also dry slowly when soaked, which matters on Kilimanjaro where rain is common in the rainforest and moorland zones.</p>

<p>Synthetic and hybrid boots (synthetic upper with leather reinforcements) are lighter (600-800g per boot), dry faster, require less break-in, and are generally less expensive. The downside is reduced durability — synthetic uppers wear faster on abrasive volcanic scree — and a less personalised fit compared to leather that moulds over time. For a single Kilimanjaro climb, synthetic boots are an excellent and often superior choice. For climbers who plan multiple mountaineering expeditions, leather repays the investment.</p>

<h3>Mid-Cut vs High-Cut</h3>

<p>Mid-cut boots (ankle bone height) are lighter, more flexible, and popular with fast-and-light hikers. For Kilimanjaro, we strongly recommend high-cut boots that extend 2-3cm above the ankle bone. The reasons are specific to this mountain:</p>

<ul>
<li><strong>Ankle support on scree:</strong> The upper slopes are loose volcanic gravel. Every step can shift, and a high cuff prevents the ankle rolling that mid-cuts allow.</li>
<li><strong>Barranco Wall scrambling:</strong> This 250m rock scramble requires precise foot placement. High-cut boots lock the ankle in position during lateral moves on rock ledges.</li>
<li><strong>Mweka descent stability:</strong> The long descent through muddy, root-crossed trail punishes ankles. After six days of climbing, your ankles are fatigued and vulnerable — high-cut boots provide the stability your muscles no longer can.</li>
<li><strong>Debris protection:</strong> Volcanic grit, mud, and water enter mid-cut boots far more easily. High-cut boots combined with <a href="/kilimanjaro-climate-zones/">gaiters in the rainforest zone</a> keep your feet clean and dry longer.</li>
</ul>

<p><strong>Our recommendation:</strong> High-cut, waterproof, synthetic or hybrid hiking boots. This is what 90% of successful summiteers on our teams wear.</p>

<h2>Key Features That Matter at Altitude</h2>

<h3>Ankle Support</h3>

<p>A stiff ankle collar with padding that wraps the ankle bone without creating pressure points. Test this in the shop: lace the boots, walk downhill on the shop ramp, and check for heel lift. If your heel rises inside the boot, you will get blisters on every descent. The boot should hold your heel firmly without squeezing the Achilles tendon.</p>

<h3>Waterproofing: Gore-Tex Is the Standard</h3>

<p>Kilimanjaro receives significant rainfall in the rainforest zone (1,800-2,300m) and can deliver rain, sleet, or wet snow at any elevation up to 4,500m. A waterproof membrane is non-negotiable. Gore-Tex (GTX) remains the industry standard — it blocks water from entering while allowing moisture vapour from sweat to escape. Alternatives like OutDry (Columbia) and eVent work well too, but Gore-Tex has the longest proven track record in mountaineering.</p>

<p>Be aware that waterproofing degrades over time with use. If your boots are more than two years old, re-treat them with a DWR (Durable Water Repellent) spray before the climb. Nikwax TX.Direct or Grangers Footwear Repel are reliable options. Apply the spray, let it dry for 24 hours, and test by dripping water on the boot — it should bead and roll off.</p>

<h3>Vibram Sole</h3>

<p>Vibram outsoles are the gold standard for mountaineering grip. The rubber compound is engineered for friction on wet rock, and the lug pattern channels mud and water away from the contact surface. On Kilimanjaro, you need aggressive 5mm+ lugs for the muddy rainforest, the wet rock of the Barranco Wall, and the loose scree above 4,500m. Generic rubber soles from budget brands lose grip when it matters most — on wet rock at 4,000m when a slip means a fall.</p>

<h3>Toe Box Room for Descents</h3>

<p>This is where most climbers get boot sizing wrong. On flat ground, your boots might feel perfect with a snug toe box. On the 3,000m Mweka descent, your foot slides forward with every downhill step. If your toes hit the front of the boot for 20,000+ descending steps, you will lose toenails — a painful and entirely preventable injury.</p>

<p>The rule: buy boots at least one full size larger than your street shoes. When laced and standing on a downhill slope, you should be able to wiggle all toes freely and fit one finger between your heel and the back of the boot. Our guides see blackened toenails on virtually every climb, and it is almost always from boots that were the "right" street-shoe size. Your feet also swell at altitude and after days of hiking — the extra room accommodates this.</p>

<h2>Top Boot Recommendations</h2>

<p>Our guides and returning clients have tested dozens of boot models on Kilimanjaro. These are the ones we consistently recommend, covering a range of budgets and foot shapes:</p>

<table>
<thead>
<tr>
<th>Boot</th>
<th>Weight (per pair)</th>
<th>Waterproofing</th>
<th>Ankle Support</th>
<th>Price Range</th>
</tr>
</thead>
<tbody>
<tr>
<td>Salomon X Ultra 4 Mid GTX</td>
<td>890g</td>
<td>Gore-Tex</td>
<td>High — Advanced Chassis</td>
<td>$160-$190</td>
</tr>
<tr>
<td>La Sportiva Nucleo High II GTX</td>
<td>980g</td>
<td>Gore-Tex</td>
<td>High — Flex system</td>
<td>$200-$240</td>
</tr>
<tr>
<td>SCARPA Zodiac Plus GTX</td>
<td>1,280g</td>
<td>Gore-Tex</td>
<td>Very High — Stiff collar</td>
<td>$250-$300</td>
</tr>
<tr>
<td>Merrell Moab 3 Mid WP</td>
<td>860g</td>
<td>Merrell Waterproof</td>
<td>Moderate — Bellows tongue</td>
<td>$130-$155</td>
</tr>
<tr>
<td>Columbia Newton Ridge Plus II WP</td>
<td>880g</td>
<td>Omni-Tech</td>
<td>Moderate — Padded collar</td>
<td>$80-$110</td>
</tr>
</tbody>
</table>

<h3>Salomon X Ultra 4 Mid GTX — Best All-Rounder</h3>

<p>The Salomon X Ultra 4 Mid GTX is the boot we recommend most often for Kilimanjaro first-timers. It combines trail-running agility with mountaineering support. The Advanced Chassis between the outsole and midsole provides torsional rigidity without making the boot feel like a cement block. Gore-Tex keeps feet dry in the rainforest, the Contagrip MA outsole grips on wet rock, and the SensiFit cradle locks the midfoot in place during lateral movements on the Barranco Wall. At 890g for the pair, it is light enough for long days without fatiguing your legs. Break-in time is minimal — two to three weeks of day hikes is usually sufficient.</p>

<h3>La Sportiva Nucleo High II GTX — Best for Technical Terrain</h3>

<p>If you want extra confidence on the Barranco Wall and the rocky sections of the Machame or Lemosho routes, the Nucleo High II delivers. La Sportiva's climbing heritage shows in the precise edging capability and aggressive Vibram Nano outsole. The Flex system in the collar allows natural ankle articulation on uphill sections while stiffening on descents. It is slightly heavier than the Salomon but significantly more capable on technical ground. Excellent for climbers who plan to tackle other mountains after Kilimanjaro.</p>

<h3>SCARPA Zodiac Plus GTX — Best for Heavy Loads and Long Routes</h3>

<p>The Zodiac Plus is a proper mountaineering boot dressed as a trekking boot. The full rubber rand protects the leather-synthetic upper from volcanic rock abrasion, the stiff sole handles crampon-compatible terrain (relevant if you cross glacial sections on the Northern Circuit), and the high collar provides the most ankle support in this list. It is the heaviest option at 1,280g but rewards climbers on longer routes like the 9-day Northern Circuit or <a href="/kilimanjaro-climbing-gear/">climbers carrying heavier packs</a>. Break-in takes four to six weeks minimum.</p>

<h3>Merrell Moab 3 Mid WP — Best Budget-Friendly Option</h3>

<p>The Moab series has been a reliable mid-range workhorse for over a decade. The Moab 3 Mid WP is not as waterproof as Gore-Tex boots (Merrell's proprietary membrane is adequate but not as breathable), and ankle support is moderate rather than high. However, it fits a wide range of foot shapes out of the box, breaks in quickly, and costs significantly less than the premium options. For climbers on a budget who plan a single Kilimanjaro climb, the Moab 3 is a solid choice. Pair it with gaiters for the rainforest zone to compensate for the lower waterproofing.</p>

<h3>Columbia Newton Ridge Plus II WP — Budget Entry Point</h3>

<p>At $80-$110, the Newton Ridge Plus II is the most affordable boot we can recommend without reservation. It is not as durable or grippy as the premium options, and the Omni-Tech waterproofing is less reliable than Gore-Tex in sustained rain. But it provides adequate ankle support, the sole handles most terrain on standard routes (Marangu, Machame), and it breaks in fast. If budget is the primary constraint, this boot gets the job done. Replace the insoles with aftermarket options (Superfeet or Sole) for better arch support and cushioning.</p>

<h2>Breaking in Your Boots: The Non-Negotiable Step</h2>

<p>Buying the right boots and wearing them on Kilimanjaro without breaking them in is like buying a sports car and driving it on flat tyres. We cannot stress this enough: <strong>you must break in your boots for a minimum of four to six weeks before your climb.</strong> Our guides see at least two or three climbers per month who arrive at the gate in brand-new boots with the tags barely removed. By Day 2, they have blisters on their heels, and by summit day, they are in genuine pain.</p>

<h3>The Break-In Progression</h3>

<ul>
<li><strong>Week 1-2:</strong> Wear the boots around the house and on short walks (30-60 minutes) on pavement or flat trails. This lets the boot mould to your foot shape and reveals any pressure points early enough to exchange the boots if needed.</li>
<li><strong>Week 2-3:</strong> Increase to 2-3 hour walks on uneven terrain — trails with rocks, roots, and hills. Wear the socks you plan to use on the mountain (see sock system below). Start testing uphill and downhill sections.</li>
<li><strong>Week 3-4:</strong> Full day hikes (5-8 hours) with a loaded daypack (8-10kg) to simulate the weight you will carry on Kilimanjaro. Include significant elevation gain and descent. This tests the boots under realistic conditions and gives you time to address any issues.</li>
<li><strong>Week 4-6:</strong> Continue regular long walks. By now the boots should feel like an extension of your feet, with no hot spots, heel lift, or toe pressure on descents. If any issues remain at this stage, consider a different boot or consult a boot-fitting specialist. Build this progression into your <a href="/kilimanjaro-training-plan/">training plan</a> so the boots get broken in as part of your fitness preparation.</li>
</ul>

<h2>Common Boot Mistakes Our Guides See</h2>

<p>After thousands of guided climbs, our team has compiled a definitive list of boot mistakes. Every single one of these is avoidable:</p>

<ul>
<li><strong>New boots on summit day:</strong> Climbers who buy boots in Moshi the day before the climb and wear them straight out of the box. By the time they reach Stella Point at 5,756m, they are walking on raw, bleeding blisters. No boot performs well without break-in, regardless of price.</li>
<li><strong>Wrong size — too small:</strong> Buying boots in your normal street-shoe size instead of one size up. The descent destroys their toenails, and altitude-related foot swelling makes the boots feel like vices by Day 4.</li>
<li><strong>Wrong size — too large:</strong> Over-correcting with boots two sizes too large, which causes the foot to slide inside the boot and creates friction blisters on the heel and ball of the foot.</li>
<li><strong>Cotton socks:</strong> Cotton absorbs moisture, loses insulation when wet, and bunches into wrinkles that create blisters. We cover the proper sock system below — cotton has no place on Kilimanjaro.</li>
<li><strong>Low-cut trail runners:</strong> Trail running shoes are superb for day hikes on maintained trails. On Kilimanjaro's loose scree, muddy descents, and rock scrambles, they provide zero ankle support and fill with volcanic grit within hours.</li>
<li><strong>Not re-waterproofing old boots:</strong> Boots older than 18 months often have degraded DWR coating. Climbers assume their "waterproof" boots still work, then spend Day 1 in the rainforest with soaked feet. Test and re-treat before the trip.</li>
</ul>

<h2>The Sock System: Your Blister Prevention Strategy</h2>

<p>The best boots in the world will give you blisters with the wrong socks. Our recommended sock system for Kilimanjaro is a two-layer approach that eliminates friction between your skin and the boot:</p>

<h3>Layer 1: Liner Sock</h3>

<p>A thin, moisture-wicking liner sock worn directly against the skin. Liner socks serve two purposes: they wick sweat away from the skin (wet skin blisters faster than dry skin) and they absorb friction — the liner moves against the hiking sock instead of your skin moving against the sock. Injinji toe liner socks are excellent because they separate each toe, preventing inter-toe blisters on long descents. Alternatively, any thin merino wool or synthetic liner works.</p>

<h3>Layer 2: Hiking Sock</h3>

<p>A medium-weight, cushioned hiking sock in merino wool or a merino-synthetic blend. Merino wool is the superior material for Kilimanjaro: it regulates temperature (warm when cold, cool when warm), manages moisture far better than synthetic alternatives, and — crucially — resists odour across multiple days of wear. You will wear the same socks for two to three days between washing opportunities on the mountain. Merino handles this; polyester does not. Brands we trust: Darn Tough (lifetime guarantee), Smartwool, and Icebreaker.</p>

<p><strong>Critical rule: absolutely no cotton socks.</strong> Cotton absorbs moisture and holds it against your skin, creating the exact conditions for blisters, hot spots, and fungal infections. It also loses all insulation when wet — your feet will be cold, wet, and miserable from Day 1. This is the most common mistake in our <a href="/kilimanjaro-packing-mistakes/">packing mistakes guide</a>, and it is the easiest to fix.</p>

<h3>How Many Pairs to Bring</h3>

<p>For a 7-day climb: 3 pairs of hiking socks, 3 pairs of liner socks, and 1 pair of thick thermal socks for sleeping. Rotate socks daily, air-dry the previous day's pair clipped to the outside of your duffel bag during the hike. Your <a href="/kilimanjaro-layering-system/">layering system</a> for your feet matters just as much as for your body.</p>

<h2>When to Use Gaiters</h2>

<p>Gaiters are leg coverings that seal the gap between your boot top and your trouser leg, preventing debris, water, and mud from entering your boots. On Kilimanjaro, gaiters are not essential for every section but are highly valuable in two specific scenarios:</p>

<ul>
<li><strong>Rainforest zone (Day 1):</strong> The trail from Machame, Lemosho, and Umbwe gates passes through dense rainforest with muddy, root-crossed paths. Rain is frequent and heavy. Gaiters keep mud, water, and debris out of your boots for the first 6-8 hours of the climb, when conditions are wettest.</li>
<li><strong>Mweka descent in rain:</strong> The Mweka route descends through the same rainforest zone on the final day. After rain, this trail becomes a river of ankle-deep mud. Gaiters are the difference between arriving at the gate with dry boots and arriving with mud-filled boots, blistered feet, and a miserable final memory of the mountain.</li>
</ul>

<p>Lightweight trail gaiters (Outdoor Research Surge or similar) are sufficient — you do not need mountaineering gaiters designed for snow and crampons. They weigh under 100g and pack down to the size of a fist.</p>

<h2>Boot Rental in Moshi and Arusha</h2>

<p>Several gear shops in Moshi and Arusha offer boot rentals, typically for $5-$15 per day. Some tour operators include boot rental in their packages. While we understand the appeal — especially for one-time climbers who do not want to invest $150-$300 in boots they may never use again — we advise caution.</p>

<h3>Quality Concerns</h3>

<p>Rental boots have been worn by dozens of previous climbers. The midsole cushioning is compressed, the waterproof membrane is often compromised, the insoles are worn flat, and the tread may be smoothed down. You are essentially wearing someone else's broken-in boots that have moulded to someone else's feet.</p>

<h3>Fit Issues</h3>

<p>The most critical factor in boot selection is fit — and fit is personal. Rental shops stock limited sizes and widths. The chance of finding a boot that fits your foot as well as one you have broken in over four weeks is very low. A boot that is even slightly wrong in width, arch support, or heel grip will cause problems over seven days and 70 kilometres.</p>

<h3>When Rental Is Acceptable</h3>

<p>If your boots are lost or damaged during transit and you have no alternative, renting is better than climbing in trainers. In this situation: choose the highest-quality boot available, test the fit thoroughly in the shop (walk up and down stairs, stand on a slope), add aftermarket insoles, and wear two pairs of socks (liner + hiking) to compensate for imperfect fit. Treat it as emergency gear, not a planned strategy.</p>

<h2>Boot Care on the Mountain</h2>

<p>Your boots take a beating over seven days. Simple maintenance extends their performance and keeps your feet comfortable:</p>

<ul>
<li><strong>Drying:</strong> Remove insoles each evening and stuff boots with newspaper or a dry camp towel. Stand boots upright in the vestibule of your tent — never put them inside your sleeping bag (moisture and dirt) or leave them outside (they may freeze solid overnight above 4,000m). If your boots get soaked, loosen the laces fully and open the tongue to maximise airflow.</li>
<li><strong>Mud removal:</strong> Brush off mud at the end of each day using a stick or the edge of a rock. Mud left to dry on leather or synthetic uppers cracks the material and degrades waterproofing.</li>
<li><strong>Lace maintenance:</strong> Check laces each morning for fraying. A broken lace above 4,000m is a genuine problem — bring one spare set or a length of paracord as backup.</li>
<li><strong>Waterproof re-treatment:</strong> If your boots begin absorbing water rather than shedding it (you will notice darker patches where water soaks in), apply a travel-size DWR spray at camp. This is rare on a single climb if you pre-treated before departure, but worth carrying a small spray bottle for extended or wet-season climbs.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Can I climb Kilimanjaro in trail running shoes?</h3>
<p>We strongly advise against it. Trail runners lack the ankle support needed for the Barranco Wall scramble, the scree slopes above 4,500m, and the long Mweka descent through mud and roots. They also offer no waterproofing, fill with volcanic grit, and provide minimal insulation at high camp where ground temperatures drop below freezing. A small number of experienced fast-packers use trail runners on speed ascents, but for a standard 6-8 day climb, high-cut waterproof hiking boots are the right tool for the job.</p>

<h3>How much should I spend on Kilimanjaro boots?</h3>
<p>For a single Kilimanjaro climb, $130-$200 buys an excellent boot (Merrell Moab 3 Mid WP to Salomon X Ultra 4 Mid GTX range). Spending under $80 risks poor waterproofing, weak ankle support, and sole grip that fails on wet rock. Spending above $250 (SCARPA Zodiac Plus range) is worthwhile only if you plan additional mountaineering after Kilimanjaro. The sweet spot for most climbers is $150-$190 for a Gore-Tex, high-cut, Vibram-soled boot from a reputable brand.</p>

<h3>Should I bring two pairs of boots?</h3>
<p>No. One pair of well-broken-in, high-cut waterproof boots handles every terrain on Kilimanjaro. Bringing a second pair adds weight to your duffel (carried by porters, who already manage 20kg per person) and is unnecessary. The only additional footwear you need is a pair of lightweight camp sandals or slides for wearing around camp in the evening — giving your feet a break from boots after a full day of hiking.</p>

<h3>My boots are three years old — are they still good for Kilimanjaro?</h3>
<p>Potentially, but they need inspection. Check three things: (1) Press the midsole with your thumb — if it does not spring back, the cushioning is dead and you need new boots or aftermarket insoles. (2) Pour water on the upper — if it soaks in instead of beading off, re-treat with DWR spray or consider the waterproof membrane is compromised. (3) Check the sole lugs — if they are worn smooth, the boot will not grip on wet rock or loose scree. If all three pass, your broken-in boots may actually perform better than new ones because they are already moulded to your feet. If any fail, invest in new boots and start the break-in process at least six weeks before your climb.</p>
`;

const post2Content = `
<p>At Barafu Camp (4,673m), the temperature outside your tent drops to -10°C to -15°C between midnight and dawn. At Crater Camp inside the summit crater (5,729m), temperatures plunge to -20°C or colder. You are lying on frozen volcanic ground, exhausted from days of climbing, breathing thin air that makes everything harder — including staying warm while you sleep. Your sleeping bag is the single piece of equipment that determines whether you get the rest you need to summit or spend the night shivering, miserable, and depleted before the hardest day of the climb.</p>

<p>After guiding climbers on Kilimanjaro for over 15 years, our team has seen every sleeping bag mistake imaginable: bags rated too warm for tropical expectations, bags with compromised insulation from poor storage, rental bags so thin they belong on a summer campout. This guide gives you the specific knowledge to choose the right sleeping bag, whether you buy or rent, and the techniques to stay warm when the mountain tries to freeze you out.</p>

<h2>Why Sleeping Bag Choice Matters on Kilimanjaro</h2>

<p>Kilimanjaro sits almost on the equator, and first-time climbers often underestimate how cold the upper camps get. The mountain's altitude creates conditions more similar to the Himalayas than equatorial Africa. Here is what you are dealing with at each camp zone:</p>

<ul>
<li><strong>Rainforest camps (2,800-3,000m):</strong> Mild, 5-10°C overnight. Most sleeping bags handle this without effort.</li>
<li><strong>Moorland camps (3,400-3,800m):</strong> Cool, 0-5°C overnight. A three-season bag works, but you start to feel the chill.</li>
<li><strong>Alpine desert camps (4,000-4,600m):</strong> Cold, -5°C to -10°C overnight. This is where inadequate bags fail — climbers who were comfortable at Shira Camp suddenly cannot sleep at Barranco.</li>
<li><strong>High camps (4,600-5,700m):</strong> Extreme cold, -10°C to -20°C overnight. Barafu Camp, Kosovo Camp, and Crater Camp demand a bag rated well below freezing. Wind chill at exposed camps pushes the effective temperature even lower.</li>
</ul>

<p>A climber who sleeps poorly at high camp arrives at the summit push already exhausted. Our guides observe a direct correlation between sleep quality and summit success: climbers who sleep reasonably well at Barafu Camp have significantly higher summit rates than those who shiver through the night. Your sleeping bag is not a luxury — it is <a href="/kilimanjaro-climbing-gear/">essential climbing gear</a> that directly affects your summit chances.</p>

<h2>Temperature Rating System Explained</h2>

<p>Sleeping bag temperature ratings are one of the most misunderstood specifications in outdoor gear. Manufacturers use three ratings under the European EN/ISO 23537 standard, and understanding the difference prevents a dangerous mistake:</p>

<ul>
<li><strong>Comfort Rating:</strong> The temperature at which a standard adult woman can sleep comfortably in a relaxed position. This is the only rating you should use for planning.</li>
<li><strong>Limit Rating (Lower Limit):</strong> The temperature at which a standard adult man can sleep for eight hours in a curled position without waking from cold. This assumes a healthy, experienced user — not a sea-level dweller at 4,700m altitude.</li>
<li><strong>Extreme Rating:</strong> The temperature at which a standard woman can survive — not sleep, survive — for six hours. This is a hypothermia survival threshold, not a usable rating. Ignore it completely for trip planning.</li>
</ul>

<p><strong>Critical rule: always use the Comfort Rating for Kilimanjaro planning.</strong> At altitude, your body's ability to generate heat is reduced because you are expending energy just to breathe and function in thin air. Cold sleepers, smaller individuals, and exhausted climbers feel colder than the ratings suggest. If the comfort rating matches the expected low temperature, you will be cold. Build in a safety margin of at least 5°C below the lowest expected temperature.</p>

<h3>Recommended Comfort Rating for Kilimanjaro</h3>

<p>Based on the temperature ranges at high camps and the safety margin principle, we recommend a sleeping bag with a <strong>comfort rating between -10°C and -15°C</strong>. This provides:</p>

<ul>
<li>Comfortable sleep at Barafu Camp (-10°C to -15°C typical overnight low)</li>
<li>Adequate warmth at Crater Camp (-15°C to -20°C) when combined with proper <a href="/kilimanjaro-sleeping-tips/">sleeping techniques</a></li>
<li>Safety margin for unusually cold nights, wind chill, or cold sleepers</li>
<li>Versatility across all camp elevations without overheating at lower camps (you can unzip at warmer camps)</li>
</ul>

<p>A bag rated to -5°C comfort will leave you cold at Barafu. A bag rated to -25°C comfort will be excessively heavy and bulky, and you will overheat at lower camps. The -10°C to -15°C sweet spot handles the full range of <a href="/kilimanjaro-weather/">Kilimanjaro weather conditions</a> across all seasons.</p>

<h2>Down vs Synthetic: Which Fill for Kilimanjaro?</h2>

<p>This is the most debated topic in sleeping bag selection, and both options have legitimate strengths and weaknesses for Kilimanjaro specifically:</p>

<h3>Down Fill</h3>

<p><strong>Advantages:</strong> Superior warmth-to-weight ratio (a -10°C down bag weighs 30-40% less than an equivalent synthetic), compresses to a smaller packed size (critical when your duffel bag has a 15kg limit), and lasts longer if properly maintained (10+ years vs 3-5 for synthetic). High fill-power down (700+ FP) creates more loft — the trapped air that insulates you — per gram than any synthetic material.</p>

<p><strong>Disadvantages:</strong> Down loses virtually all insulating ability when wet. On Kilimanjaro, moisture comes from condensation inside your tent, rain during camp setup, and body moisture absorbed overnight. A wet down bag takes hours to dry and may not dry at all above 4,000m where humidity is low but temperatures prevent effective air drying. Down bags are also significantly more expensive than synthetic equivalents.</p>

<p><strong>Mitigating the moisture risk:</strong> Use a waterproof compression sack (Sea to Summit eVac or similar), a sleeping bag liner to absorb body moisture, and air the bag at camp each morning if conditions allow. Hydrophobic-treated down (like Nikwax Hydrophobic Down or DownTek) resists moisture better than untreated down and is increasingly common in quality bags.</p>

<h3>Synthetic Fill</h3>

<p><strong>Advantages:</strong> Retains insulating ability when damp — critical on a mountain where tent condensation is constant and rain is common. Dries faster than down, is significantly cheaper at equivalent temperature ratings, and is hypoallergenic. For climbers who are not experienced with down bag maintenance, synthetic is the safer, lower-risk choice.</p>

<p><strong>Disadvantages:</strong> Heavier and bulkier than down at equivalent ratings. A -10°C synthetic bag typically weighs 1.5-2.0kg and compresses to 10-15 litres, versus 0.9-1.3kg and 6-9 litres for down. Synthetic insulation also degrades faster with compression over time — a synthetic bag stored compressed for years will lose loft and warmth.</p>

<p><strong>Our recommendation for most Kilimanjaro climbers:</strong> Synthetic fill is the safer choice for first-time Kilimanjaro climbers. The moisture resilience outweighs the weight penalty on a mountain where porters carry your duffel and you do not need to fit your sleeping bag into a 40L pack. Experienced mountaineers who know how to manage moisture and own quality dry bags may prefer down for the weight savings.</p>

<h2>Shape: Mummy vs Rectangular</h2>

<p>Sleeping bag shape directly affects warmth efficiency and comfort:</p>

<h3>Mummy Shape (Recommended)</h3>

<p>Mummy bags taper from shoulders to feet and include a fitted hood. This design minimises internal air volume — there is less dead air space for your body to heat. A well-fitted mummy bag feels snug without being restrictive. The hood is essential at altitude: your head radiates 10-15% of body heat, and an unhooded bag loses warmth rapidly in sub-zero conditions. All of our recommended bags below are mummy-shaped.</p>

<h3>Rectangular Shape (Not Recommended)</h3>

<p>Rectangular bags offer more room to move but contain a large volume of air your body must heat. At -10°C, this extra air space means cold spots and drafts. Rectangular bags also lack hoods, draft collars, and the zipper draft tubes that prevent cold air infiltration. A rectangular bag rated to -10°C will feel at least 5°C colder than a mummy bag at the same rating. Do not bring a rectangular bag to Kilimanjaro.</p>

<h2>Key Features to Look For</h2>

<ul>
<li><strong>Draft collar:</strong> An insulated tube at the neck that prevents warm air from escaping upward when you shift in your sleep. Essential above 4,000m.</li>
<li><strong>Hood with drawcord:</strong> Cinches around your face to seal warmth in. On the coldest nights, only your nose and mouth should be exposed. Practice adjusting the drawcord with gloves on before the climb.</li>
<li><strong>Zipper draft tube:</strong> An insulated baffle behind the full-length zipper that blocks cold air from seeping through the zipper teeth. All quality mountaineering bags include this; budget bags often skip it.</li>
<li><strong>Compression sack:</strong> A stuff sack with compression straps that reduces the packed volume by 30-50%. Essential for fitting the bag into your duffel alongside clothing and other gear. Waterproof compression sacks protect down bags from moisture during transport.</li>
<li><strong>Full-length zipper:</strong> Allows ventilation at lower camps where a -10°C bag would otherwise overheat you. Unzip from the bottom for foot ventilation without losing upper-body warmth.</li>
</ul>

<h2>Top Sleeping Bag Recommendations</h2>

<p>These bags have been tested on Kilimanjaro by our guides and clients. Each meets our -10°C to -15°C comfort rating recommendation:</p>

<table>
<thead>
<tr>
<th>Sleeping Bag</th>
<th>Fill Type</th>
<th>Comfort Rating</th>
<th>Weight</th>
<th>Packed Size</th>
<th>Price Range</th>
</tr>
</thead>
<tbody>
<tr>
<td>Sea to Summit Trek TkII</td>
<td>Synthetic (Thermolite)</td>
<td>-10°C</td>
<td>1,680g</td>
<td>14L</td>
<td>$180-$220</td>
</tr>
<tr>
<td>Mountain Hardwear Lamina -9°C</td>
<td>Synthetic (Thermal.Q)</td>
<td>-9°C</td>
<td>1,590g</td>
<td>13L</td>
<td>$170-$210</td>
</tr>
<tr>
<td>Marmot Trestles Elite Eco -9°C</td>
<td>Synthetic (HL ElixR Eco)</td>
<td>-9°C</td>
<td>1,630g</td>
<td>13L</td>
<td>$160-$200</td>
</tr>
<tr>
<td>Kelty Cosmic 0°F (-18°C)</td>
<td>Down (DriDown 600FP)</td>
<td>-12°C</td>
<td>1,360g</td>
<td>9L</td>
<td>$200-$250</td>
</tr>
<tr>
<td>NEMO Forte -9°C</td>
<td>Synthetic (PrimaLoft Silver)</td>
<td>-9°C</td>
<td>1,560g</td>
<td>14L</td>
<td>$170-$220</td>
</tr>
</tbody>
</table>

<h3>Sea to Summit Trek TkII — Best Overall for Kilimanjaro</h3>

<p>The Trek TkII is our most-recommended bag for Kilimanjaro. Its Thermolite synthetic fill retains warmth even when damp from tent condensation, the -10°C comfort rating handles Barafu Camp without supplemental layers, and the design includes every feature on our checklist: draft collar, cinchable hood, zipper draft tube, and a compression sack that reduces packed volume to 14L. At 1,680g it is not the lightest bag on this list, but on a mountain where porters carry your duffel, weight matters less than reliable warmth. The internal comfort shell fabric feels soft against skin — a small detail that matters when you are spending 8-10 hours in the bag each night.</p>

<h3>Mountain Hardwear Lamina -9°C — Best for Cold Sleepers</h3>

<p>The Lamina uses a unique welded construction where the Thermal.Q insulation is bonded to the shell fabric rather than sewn through it. This eliminates cold spots at stitch lines — a problem with cheaper bags where the needle holes create tiny thermal bridges. The result is remarkably even warmth distribution. If you are a cold sleeper or have experienced cold spots in previous bags, the Lamina solves this problem. Pair it with a fleece liner to push the effective comfort rating to -14°C or below for the coldest Kilimanjaro nights.</p>

<h3>Marmot Trestles Elite Eco -9°C — Best Value</h3>

<p>Marmot's Trestles series has been a value leader for years, and the Elite Eco version adds recycled insulation (HL ElixR Eco) without compromising performance. The -9°C comfort rating handles most Kilimanjaro conditions, the SpiraFil construction maintains loft through multiple compression-decompression cycles (important for a bag stuffed into a duffel daily), and the price sits at the lowest end of our recommendation range. It lacks the premium feel of the Sea to Summit and Mountain Hardwear options, but it delivers the thermal performance that matters.</p>

<h3>Kelty Cosmic 0°F — Best Down Option</h3>

<p>For climbers who prefer down fill, the Kelty Cosmic 0°F uses 600-fill DriDown — down treated with a hydrophobic coating that resists moisture absorption. At 1,360g and compressing to 9L, it saves meaningful weight and space compared to synthetic alternatives. The -12°C comfort rating provides extra margin for Kilimanjaro's coldest nights. The trade-off: even DriDown is not as moisture-proof as synthetic, so pair it with a waterproof compression sack and a sleeping bag liner. This bag also serves well on future mountaineering trips where you carry your own gear and weight savings matter.</p>

<h2>Sleeping Bag Liners: The Low-Cost Warmth Boost</h2>

<p>A sleeping bag liner is a thin inner sheet that sits inside your sleeping bag. It is the single most cost-effective way to boost your bag's warmth and extend its life. Liners add 5-10°C to your bag's effective temperature rating depending on the material:</p>

<ul>
<li><strong>Silk liners (+5-8°C):</strong> Lightest option (100-150g), feels luxurious against skin, and adds meaningful warmth. Silk also wicks moisture away from your body, keeping the bag's insulation drier. The downside: silk is delicate and expensive ($40-$70). For Kilimanjaro, silk is our top liner recommendation.</li>
<li><strong>Fleece liners (+8-12°C):</strong> The warmest option, adding enough heat for a -5°C bag to function at -15°C or below. Heavier (300-500g) and bulkier than silk, but for climbers whose sleeping bag is marginally warm enough, a fleece liner closes the gap. Budget-friendly at $25-$40.</li>
<li><strong>Cotton liners (+2-3°C):</strong> Minimal warmth benefit, heavy, and absorb moisture. Not recommended for Kilimanjaro.</li>
<li><strong>Thermal reflective liners (+8-15°C, manufacturer claims):</strong> Thin liners with a reflective interior coating (like Sea to Summit Reactor Extreme). They work by reflecting radiated body heat. Real-world performance rarely matches the advertised rating, but even at half the claimed boost, they are useful for marginal bags. They also crinkle when you move, which can disturb light sleepers.</li>
</ul>

<p>Beyond warmth, liners protect your sleeping bag from body oils, sweat, and dirt — the main causes of insulation degradation over time. It is far easier to wash a liner than a sleeping bag, especially a down bag that requires specialist cleaning.</p>

<h2>Rental Sleeping Bags: What to Expect</h2>

<p>Most Kilimanjaro tour operators offer sleeping bag rental as part of their packages or as an add-on. Here is what our experience with rental bags has taught us:</p>

<h3>What Operators Typically Provide</h3>

<p>Rental bags from reputable operators are usually synthetic mummy bags rated to -10°C to -15°C — adequate for Kilimanjaro's temperature range. The quality varies significantly between operators. Premium operators (charging $2,500+ per person) typically provide well-maintained, branded bags that are cleaned between uses. Budget operators may provide bags with compressed, worn insulation that performs well below the rated temperature.</p>

<h3>How to Assess Rental Bag Quality</h3>

<p>When you receive your rental bag, check these indicators before accepting it:</p>

<ul>
<li><strong>Loft test:</strong> Unpack the bag and let it sit for 30 minutes. A healthy bag should puff up to 10-15cm of loft. If it remains flat or thin, the insulation is dead and the bag will not keep you warm.</li>
<li><strong>Smell test:</strong> A clean bag should have no strong odour. A bag that smells of mildew, body odour, or damp indicates poor maintenance and possible insulation degradation.</li>
<li><strong>Zipper test:</strong> Run the zipper from bottom to top and back. It should move smoothly without snagging. A broken zipper at 4,700m means a bag you cannot seal — cold air enters through the gap all night.</li>
<li><strong>Hood and drawcord:</strong> Test the hood drawcord. If it does not cinch properly, you lose the most critical heat-sealing feature of the bag.</li>
<li><strong>Check for rips or tears:</strong> Inspect the shell fabric for holes. Even small tears allow insulation to migrate and create cold spots.</li>
</ul>

<h3>Our Honest Advice on Rental</h3>

<p>If you are booking with a reputable operator who includes sleeping bag rental in a <a href="/kilimanjaro-luxury-climb/">premium or luxury package</a>, rental is a reasonable option. If you are on a budget climb or unsure of the operator's equipment quality, bring your own bag — the $170-$250 investment in a bag you can verify, test, and break in is worth the peace of mind. A bad night's sleep at Barafu Camp because of a thin rental bag can cost you the summit.</p>

<h2>The Sleeping Pad Factor: Insulation From the Ground</h2>

<p>Your sleeping bag insulates you from the cold air above and around you, but it does almost nothing against the cold ground below. Wherever your body weight compresses the bag's insulation flat — shoulders, hips, back — you lose that insulation. The ground at Barafu Camp is frozen volcanic rock. Without adequate pad insulation, the cold seeps up through the compressed bag and chills you from below, no matter how warm your bag is rated.</p>

<h3>R-Value: The Specification That Matters</h3>

<p>R-value measures a sleeping pad's resistance to heat transfer through it. Higher R-value = more insulation from the ground. For Kilimanjaro:</p>

<ul>
<li><strong>R-value 2.0-3.0:</strong> Minimum for Kilimanjaro. Adequate at lower camps but marginal at Barafu.</li>
<li><strong>R-value 3.5-5.0:</strong> Recommended. Provides comfortable ground insulation at all Kilimanjaro camps including Barafu and Crater Camp.</li>
<li><strong>R-value 5.0+:</strong> Excellent but heavier and bulkier. Worth it for cold sleepers or Crater Camp overnight stays.</li>
</ul>

<p>Most operators provide foam pads with an R-value of 2.0-2.5. If you are a cold sleeper or your <a href="/kilimanjaro-camping/">camping setup</a> is on exposed ground, supplement the operator's pad with a lightweight inflatable pad (Therm-a-Rest NeoAir XLite, R-value 4.2, 340g) placed on top. Two pads stack their R-values: operator pad (R-2.5) + personal pad (R-4.2) = R-6.7, which handles any ground temperature on Kilimanjaro.</p>

<h2>Tips for Staying Warm at Night</h2>

<p>Even with the right sleeping bag and pad, high-altitude sleeping requires technique. These strategies come from our guides' years of experience on the mountain:</p>

<h3>Hot Water Bottle</h3>

<p>Fill a Nalgene bottle with boiling water from the mess tent, seal it tightly, wrap it in a spare sock or camp towel, and place it in your sleeping bag 15-20 minutes before you get in. It pre-heats the interior and continues radiating warmth for 2-3 hours. At Barafu Camp, this single trick transforms your sleeping experience. Ensure the lid is sealed properly — a leaking hot water bottle in a down sleeping bag is a disaster. Use a wide-mouth Nalgene (withstands boiling water) rather than a narrow-mouth bottle.</p>

<h3>Dry Socks and Base Layer</h3>

<p>Change into dry, clean socks and a fresh base layer before getting into your bag. The socks and base layer you wore all day are damp with sweat, and damp fabric conducts body heat away from your skin 25x faster than dry fabric. Bring a dedicated set of thermal sleeping socks and a clean base layer reserved exclusively for sleeping. Keep them in your sleeping bag during the day so they are warm and dry when you need them — this is a key <a href="/kilimanjaro-sleeping-tips/">sleeping tip</a> our guides share with every client.</p>

<h3>Eat Before Sleep</h3>

<p>Your body generates heat through digestion. Eating a substantial dinner and a small snack just before bed gives your body fuel to burn overnight. Complex carbohydrates (porridge, bread, pasta) provide sustained energy release. A hot drink — tea, hot chocolate, or warm water with honey — adds warmth from the inside. Do not skip dinner to avoid nausea from altitude; even a partial meal is better than sleeping on an empty stomach in a freezing tent.</p>

<h3>Do Not Breathe Into Your Bag</h3>

<p>This is counterintuitive: when cold, the temptation is to pull your sleeping bag over your face and breathe into it. Do not do this. Each breath releases roughly 200ml of warm, moist air. That moisture condenses on the bag's insulation, wetting it from the inside. Over a single night, you can introduce 500ml+ of moisture into the bag. Wet insulation — whether down or synthetic — loses thermal efficiency. Instead, cinch the hood drawcord so only your nose and mouth are exposed. Breathe outward, not downward into the bag. Your <a href="/the-ultimate-kilimanjaro-packing-list/">packing list</a> should include a buff or balaclava that covers your face while directing breath away from the bag interior.</p>

<h3>Wear the Right Amount of Clothing</h3>

<p>A common mistake is wearing too many layers inside the sleeping bag. Your bag works by trapping air heated by your body. If you wear so many layers that your body heat cannot reach the bag's insulation, the bag cannot do its job. The ideal sleeping kit is: thermal base layer (top and bottom), dry hiking socks, and a lightweight beanie. If you are still cold, add a fleece mid-layer — but avoid wearing a puffy jacket inside the bag, as it compresses the bag's insulation where it presses against it.</p>

<h2>Sleeping Bag Care on the Mountain</h2>

<ul>
<li><strong>Air it daily:</strong> Each morning, turn your sleeping bag inside out and drape it over your tent or a rock for 20-30 minutes while you eat breakfast. This evaporates overnight moisture from body vapour. Skip this only if it is raining.</li>
<li><strong>Do not stuff it wet:</strong> If your bag feels damp from condensation, air it before packing. Stuffing a wet bag into a compression sack traps moisture and degrades insulation over subsequent days.</li>
<li><strong>Use the compression sack properly:</strong> Stuff (do not roll) your sleeping bag into its compression sack. Stuffing distributes stress randomly across the insulation; rolling creates crease lines that become permanent cold spots over time.</li>
<li><strong>Keep it dry in transit:</strong> Use a waterproof compression sack or a large waterproof bag (trash bag as backup) inside your duffel. Duffel bags get wet from rain, river crossings, and ground moisture. Your sleeping bag must arrive at camp dry every night.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What temperature rating sleeping bag do I need for Kilimanjaro?</h3>
<p>We recommend a sleeping bag with a comfort rating between -10°C and -15°C. This handles the coldest conditions at Barafu Camp (-10°C to -15°C) and provides a safety margin for cold sleepers, wind chill, and unusually cold nights. Always use the comfort rating, not the limit or extreme rating — those assume ideal conditions and experienced sleepers, neither of which describes most climbers at altitude after days of physical exertion.</p>

<h3>Should I buy or rent a sleeping bag for Kilimanjaro?</h3>
<p>If you are climbing with a reputable operator who includes sleeping bag rental, renting is acceptable — but inspect the bag before accepting it (check loft, zippers, hood, and smell). If you are unsure of the rental quality, buying a reliable bag for $170-$250 is a worthwhile investment for guaranteed warmth and hygiene. Climbers who plan future camping or mountaineering trips will use the bag again, making purchase the better long-term value. See our guide on <a href="/kilimanjaro-packing-mistakes/">common packing mistakes</a> for more on rental equipment pitfalls.</p>

<h3>Is a down or synthetic sleeping bag better for Kilimanjaro?</h3>
<p>Synthetic is the safer choice for most Kilimanjaro climbers because it retains insulation when damp from tent condensation, rain, or body moisture. Down offers a superior warmth-to-weight ratio and packs smaller, but loses insulating ability when wet. Experienced mountaineers who can manage moisture (waterproof compression sack, daily airing, sleeping bag liner) may prefer down. First-time Kilimanjaro climbers should default to synthetic unless they have specific reasons to choose down.</p>

<h3>Can I use a sleeping bag liner to make a warmer-weather bag work on Kilimanjaro?</h3>
<p>Yes, with limits. A fleece liner adds 8-12°C and a silk liner adds 5-8°C to a bag's effective temperature. A bag rated to -3°C comfort plus a fleece liner can work at Barafu Camp. However, a bag rated to 0°C or warmer — even with a liner — will likely leave you cold at high camp. Do not rely on a liner to compensate for a fundamentally inadequate bag. The liner is a supplement, not a substitute. If your current bag is marginal, invest in a proper -10°C bag rather than gambling your summit night sleep on a liner pushing a warm bag beyond its design limits.</p>
`;

async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 17a)...\n");

  const posts = [
    {
      slug: "kilimanjaro-boots-guide",
      title:
        "Best Hiking Boots for Kilimanjaro: Selection, Break-In, and Rental Guide",
      excerpt:
        "Which hiking boots work on Kilimanjaro — boot types, key features (Gore-Tex, Vibram, ankle support), top recommendations with prices, break-in progression, sock systems, gaiter use, and rental warnings.",
      content: post1Content,
      metaTitle: "Best Kilimanjaro Hiking Boots: Complete Guide (2026)",
      metaDescription:
        "Best hiking boots for Kilimanjaro: high-cut waterproof boots compared (Salomon X Ultra 4 Mid GTX, La Sportiva Nucleo, SCARPA Zodiac, Merrell Moab 3), 4-6 week break-in plan, sock system, and rental advice.",
    },
    {
      slug: "kilimanjaro-sleeping-bags",
      title:
        "Sleeping Bags for Kilimanjaro: Temperature Ratings, Rental vs Buy, and Tips",
      excerpt:
        "What sleeping bag you need for Kilimanjaro — temperature ratings explained, comfort rating -10°C to -15°C recommended, down vs synthetic, top bags compared, liners, rental quality, sleeping pad R-values, and warmth tips.",
      content: post2Content,
      metaTitle: "Kilimanjaro Sleeping Bags: What Rating You Need (2026)",
      metaDescription:
        "Kilimanjaro sleeping bags: -10°C to -15°C comfort rating recommended, down vs synthetic compared, Sea to Summit Trek TkII and top bags reviewed, liner warmth boost, rental assessment, and high-camp warmth tips.",
    },
  ];

  for (const post of posts) {
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
    console.log(`✓ Upserted: ${result.slug}`);
  }

  console.log(`\nDone — ${posts.length} blog posts upserted.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
