/**
 * seed-kilimanjaro-blog-posts-15b.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 15b):
 *  - kilimanjaro-trekking-poles
 *  - kilimanjaro-layering-system
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-15b.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const post1Content = `
<p>Trekking poles are the single most underrated piece of gear on Kilimanjaro. After guiding thousands of climbers across every route, our guides are unequivocal: trekking poles reduce knee stress by up to 25%, improve balance on loose volcanic scree, and save energy on the long descent days that destroy unprepared legs. You can summit without them, but the question is not whether you <em>can</em> — it is whether you <em>should</em>. The answer, for nearly every climber, is no. Bring poles.</p>

<h2>Are Trekking Poles Necessary for Kilimanjaro?</h2>

<p>Strictly necessary? No — Kilimanjaro is not a technical climb, and you will not encounter any section where poles are physically required. But "necessary" is the wrong framing. Our guides strongly recommend poles for every climber, and here is why:</p>

<ul>
<li><strong>Knee protection on descents:</strong> The descent from the summit to the final camp covers 1,400-2,800m of elevation loss in a single day. Without poles, your knees absorb the full impact of every downhill step on loose gravel. Poles redistribute 20-25% of that force to your arms and shoulders.</li>
<li><strong>Balance on scree:</strong> The approach to Stella Point and the path between high camps involves walking on volcanic scree — small, loose rocks that slide under your feet. Poles provide two additional points of contact and prevent stumbles that can lead to ankle injuries.</li>
<li><strong>Energy conservation:</strong> Poles engage your upper body in the walking motion, spreading effort across more muscle groups. Over 5-9 days of trekking, this distributed workload reduces leg fatigue meaningfully.</li>
<li><strong>Altitude stability:</strong> Above 4,500m, reduced oxygen impairs coordination. Even experienced hikers become clumsy at altitude. Poles provide a safety margin when your brain is running on 50% of its normal oxygen supply.</li>
<li><strong>River crossings and mud:</strong> The <a href="/kilimanjaro-climate-zones/">forest zone</a> on routes like Lemosho and Machame involves muddy trails and occasional stream crossings. Poles keep you upright when the ground is slick.</li>
</ul>

<p>The only climbers who sometimes skip poles are trail runners doing speed ascents. If you are reading this guide, you are not doing a speed ascent. Bring poles.</p>

<h2>Types of Trekking Poles</h2>

<p>Three main designs exist, each with trade-offs relevant to Kilimanjaro:</p>

<h3>Telescoping Aluminum Poles</h3>
<p>The workhorse choice. Two or three sections that slide into each other and lock at your desired height. Aluminum poles are heavier than carbon fibre but more durable — they bend under extreme stress rather than snapping. If you trip and fall on a pole, aluminum deforms; carbon fibre shatters. For the rocky terrain on Kilimanjaro, durability matters.</p>

<h3>Carbon Fibre Poles</h3>
<p>Lighter than aluminum by 20-30% (typically 200-250g per pole versus 280-350g for aluminum). Carbon fibre transmits less vibration to your hands, which is more comfortable over long days. The downside: carbon fibre is brittle. A hard impact against rock — common on the <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a> approach — can crack or shatter a carbon pole. If weight is your priority and you handle gear carefully, carbon is excellent. If you are rough on equipment, choose aluminum.</p>

<h3>Folding (Z-Pole) Design</h3>
<p>Three or four sections connected by an internal cord, folding down to 35-40cm. These pack into your <a href="/the-ultimate-kilimanjaro-packing-list/">daypack</a> or even a suitcase side pocket. The trade-off is that folding poles are generally not adjustable in length (they have a fixed deployed length) and the locking mechanism is less robust than telescoping poles. Best for climbers who value packability for air travel above all else.</p>

<h2>Aluminum vs Carbon Fibre: Comparison</h2>

<table>
<thead>
<tr><th>Feature</th><th>Aluminum</th><th>Carbon Fibre</th></tr>
</thead>
<tbody>
<tr><td><strong>Weight (per pole)</strong></td><td>280-350g</td><td>200-250g</td></tr>
<tr><td><strong>Durability</strong></td><td>Bends under stress — repairable</td><td>Shatters on hard impact — unrepairable</td></tr>
<tr><td><strong>Vibration</strong></td><td>More vibration transfer to hands</td><td>Dampens vibration — more comfortable</td></tr>
<tr><td><strong>Price range</strong></td><td>$30-$80</td><td>$80-$200</td></tr>
<tr><td><strong>Best for</strong></td><td>Rocky terrain, rough handling, budget-conscious</td><td>Long days, weight-sensitive, careful handlers</td></tr>
<tr><td><strong>Kilimanjaro verdict</strong></td><td>Recommended for most climbers</td><td>Good if you treat gear gently</td></tr>
</tbody>
</table>

<h2>Key Features to Look For</h2>

<h3>Grip Material</h3>
<ul>
<li><strong>Cork grips:</strong> Our top recommendation. Cork wicks moisture, moulds to your hand over time, and does not get slippery when wet. Cork also insulates against cold — your hands stay warmer than with rubber or foam at high altitude.</li>
<li><strong>Foam grips (EVA):</strong> Lighter than cork and comfortable, but absorbs sweat rather than wicking it. Adequate for Kilimanjaro. Most mid-range poles use foam.</li>
<li><strong>Rubber grips:</strong> Found on budget poles. Rubber causes blisters on long days because it does not breathe. Avoid for multi-day treks.</li>
</ul>

<h3>Locking Mechanisms</h3>
<ul>
<li><strong>Lever lock (FlickLock):</strong> External lever that clamps the pole at the desired length. Easy to adjust with gloves — critical on <a href="/kilimanjaro-summit-night/">summit night</a> when your fingers are numb. Our guides recommend lever locks for Kilimanjaro specifically because of the cold.</li>
<li><strong>Twist lock:</strong> You twist the pole sections to tighten them. Twist locks can slip under load and are difficult to adjust with cold hands or gloves. Not ideal for Kilimanjaro's summit push.</li>
<li><strong>Button lock (push-pin):</strong> Common on folding poles. Simple and reliable, but fixed to pre-set lengths.</li>
</ul>

<h3>Tips and Baskets</h3>
<ul>
<li><strong>Carbide tips:</strong> Standard on quality poles. These grip rock and hard ground effectively. Essential for Kilimanjaro's volcanic terrain.</li>
<li><strong>Rubber tip covers:</strong> Slide over the carbide tips for use on paved surfaces, airport floors, or when you do not want to damage soft ground. Bring them — you will use them at hotels and transfers.</li>
<li><strong>Trekking baskets:</strong> Small round discs above the tip that prevent the pole from sinking into soft ground. Use small baskets (not snow baskets) on Kilimanjaro. The scree fields and dust on the Marangu and Rongai routes will swallow a pole without baskets.</li>
</ul>

<h2>How to Use Trekking Poles Properly</h2>

<p>Most climbers use poles incorrectly. Proper technique multiplies the benefit; poor technique wastes energy or causes shoulder strain.</p>

<h3>Uphill Technique</h3>
<p>Shorten poles by 5-10cm from your flat-ground setting. Plant each pole slightly ahead and to the side of your body, pressing down and back to propel yourself upward. Keep your elbows close to your body — do not reach forward with extended arms, which wastes energy. Use your wrist straps so you push down through the straps rather than gripping tightly, which fatigues your forearms.</p>

<h3>Downhill Technique</h3>
<p>Lengthen poles by 5-10cm from your flat-ground setting. Plant poles ahead of you, wider than on flat terrain, and use them as brakes against gravity. On the steep descent from the summit to Mweka Camp, poles are your primary knee protection. Lean slightly into the poles and let them absorb the jarring impact that would otherwise transfer directly to your knees and quads. This is where poles earn their weight a hundred times over.</p>

<h3>Flat Terrain</h3>
<p>Set poles to a length where your elbows bend at approximately 90 degrees when the tip is on the ground beside your foot. Swing poles naturally in opposition to your legs — right pole forward with left foot, left pole forward with right foot. This mirrors your natural arm swing and costs almost no extra energy while providing continuous balance.</p>

<h3>The Barranco Wall</h3>
<p>The <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a> is the one section where poles become a hindrance. This 257m rock scramble requires both hands for scrambling over boulders and pulling yourself up ledges. Collapse your poles and strap them to the outside of your daypack before starting the wall. Your guide will tell you when to stow them. Attempting the Barranco Wall with poles in hand is dangerous — they catch on rock and unbalance you.</p>

<h2>Adjusting Pole Length by Terrain</h2>

<ul>
<li><strong>Flat terrain:</strong> Set so your elbow bends at 90 degrees (typically 110-125cm for most adults)</li>
<li><strong>Uphill:</strong> Shorten by 5-10cm to keep your hands at a comfortable height as the ground rises ahead of you</li>
<li><strong>Steep uphill (summit approach):</strong> Shorten by 10-15cm — you want the poles to plant near your feet, not far ahead</li>
<li><strong>Downhill:</strong> Lengthen by 5-10cm so you can reach the ground ahead without bending forward</li>
<li><strong>Steep downhill (summit descent):</strong> Lengthen by 10-15cm — the extended reach lets you brake effectively on the scree slope</li>
<li><strong>Traversing (side-slope):</strong> Set the uphill pole shorter and the downhill pole longer. Most climbers do not bother with this unless the traverse is extended, but it makes the walk across the Shira Plateau significantly more comfortable.</li>
</ul>

<h2>Rental vs Buying: What You Should Know</h2>

<p>You can rent trekking poles in Moshi and Arusha from gear shops and some operators. Our honest assessment:</p>

<ul>
<li><strong>Rental quality is inconsistent.</strong> Rental poles in Moshi are typically cheap aluminum models with twist-lock mechanisms that slip, worn rubber grips that cause blisters, and tips ground down from hundreds of rentals. Some are perfectly usable; many are not.</li>
<li><strong>Rental cost:</strong> $5-$15 for the full trek. At this price, the financial savings over buying are minimal.</li>
<li><strong>Our recommendation:</strong> Buy your own poles before the trip. A decent pair of aluminum telescoping poles costs $40-$60 and will last for years across multiple treks. You can practise with them during your <a href="/kilimanjaro-training-plan/">training hikes</a>, dial in your preferred length, and arrive on the mountain already comfortable with your gear.</li>
<li><strong>If you must rent:</strong> Test the poles at the rental shop. Extend them to your height, check the locking mechanism holds under downward pressure, verify both tips are intact, and confirm the wrist straps are not torn. Reject poles with slipping locks — you will regret it on descent day.</li>
</ul>

<h2>Top Pole Recommendations</h2>

<ul>
<li><strong>Black Diamond Trail (aluminum, $60):</strong> The most recommended pole for Kilimanjaro. FlickLock mechanism, foam grips, durable aluminum shafts, and interchangeable baskets. Our guides carry these personally.</li>
<li><strong>Leki Makalu Lite (aluminum, $80):</strong> Premium build quality, comfortable cork grips, speed-lock mechanism, and exceptional durability. Worth the extra cost if you plan multiple treks.</li>
<li><strong>Black Diamond Distance Carbon Z ($150):</strong> Best folding pole. Carbon fibre, packs to 40cm, 135g per pole. Outstanding for travel. Fixed length — order the correct size for your height.</li>
<li><strong>Cascade Mountain Tech Quick Lock ($35):</strong> Best budget option. Cork grips, lever lock, aluminum. Heavier than premium poles but reliable and excellent value. Widely available.</li>
<li><strong>Leki Cressida FX Carbon ($120):</strong> Best women's-specific pole with shorter grip length and slightly thinner shaft diameter. Carbon fibre with cork grip.</li>
</ul>

<h2>Travelling with Trekking Poles</h2>

<p>Trekking poles cannot go in carry-on luggage — airlines classify them as potential weapons. You must check them:</p>

<ul>
<li><strong>Telescoping poles:</strong> Collapse fully and pack inside your checked duffel or suitcase. Wrap the tips in tape or use rubber tip covers to prevent damage to other gear.</li>
<li><strong>Folding poles:</strong> Fold down and place in your checked bag or even a large daypack. Their compact size (35-40cm) makes packing straightforward.</li>
<li><strong>Pole bag:</strong> Some poles come with a fabric bag. This protects the poles and prevents them from scratching other items in your luggage.</li>
<li><strong>Tip protection:</strong> Always cover carbide tips before packing. They are sharp enough to puncture fabric, and airlines may charge for damaged bags.</li>
</ul>

<p>For a complete gear checklist including poles, see our <a href="/the-ultimate-kilimanjaro-packing-list/">Kilimanjaro packing list</a>. For common packing errors including gear choices, read our <a href="/kilimanjaro-packing-mistakes/">packing mistakes guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can I use one trekking pole instead of two?</h3>
<p>You can, but two poles are significantly better. A single pole creates an asymmetric gait that strains one shoulder and provides balance on only one side. On Kilimanjaro's uneven terrain, two poles give you four points of contact — critical on the scree slopes and during the summit descent. If you are considering one pole to save weight, the second pole adds only 250-350g. That is not enough savings to justify the reduced stability.</p>

<h3>Should I use wrist straps or not?</h3>
<p>Yes — and learn to use them properly. Thread your hand up through the strap from below, then grip the handle so the strap wraps over the back of your hand. This lets you push down through the strap rather than gripping the pole tightly. Proper strap use reduces forearm fatigue and prevents dropping poles on exposed sections. Remove the straps only during the <a href="/kilimanjaro-barranco-wall/">Barranco Wall</a> scramble — if you fall with straps attached to poles, they can torque your wrist.</p>

<h3>How much do trekking poles really help on the descent?</h3>
<p>The descent is where poles transform the experience. Without poles, the 14-22km descent from the summit to the final camp hammers your knees and quads until many climbers can barely walk by the end. With poles, you transfer a significant portion of the braking force to your arms and shoulders. Our guides report that climbers using poles consistently arrive at the final camp in notably better condition — less knee pain, fewer blisters from compensating for sore legs, and better morale. If you only use poles for one section of the entire trek, use them on the descent. See our <a href="/how-hard-is-kilimanjaro/">difficulty guide</a> for more on the descent challenge.</p>

<h3>Are the cheap rental poles at the gate good enough?</h3>
<p>Sometimes. Rental poles sold at the Kilimanjaro park gates are basic wooden or aluminum sticks — not proper trekking poles. They lack wrist straps, have no locking mechanism, and the length is not adjustable. They are better than nothing, but significantly worse than actual trekking poles. If you forgot to bring or rent real poles, gate poles are an emergency option. For planned climbs, invest in proper poles or rent quality ones from a reputable shop in Moshi. See our <a href="/kilimanjaro-prices/">pricing guide</a> for what to budget for gear, and our <a href="/kilimanjaro-climbing-gear/">complete gear guide</a> for all equipment recommendations.</p>
`;

const post2Content = `
<p>The difference between a comfortable Kilimanjaro climb and a miserable one often comes down to what you wear. Temperatures on the mountain range from +30°C in the rainforest to -20°C at the summit — an extraordinary 50-degree swing across a single trek. No single outfit handles that range. Instead, you need a layering system: multiple thin, functional layers that you add and remove as conditions change. Our guides dress in layers every day on the mountain, and after thousands of climbs, this is the system we recommend.</p>

<h2>The 3-Layer System Explained</h2>

<p>Every layering system is built on three functional layers. Each has a specific job. Combining them correctly means you stay warm when it is freezing, cool when it is hot, and dry in rain — all with the same set of clothes.</p>

<h3>Layer 1: Base Layer (Moisture Management)</h3>
<p>The base layer sits against your skin. Its only job is to move sweat away from your body and to the next layer. If sweat stays on your skin, it cools you through evaporation — pleasant in the heat, dangerous in the cold. A good base layer keeps you dry regardless of how much you sweat.</p>
<ul>
<li><strong>Material:</strong> Merino wool or synthetic polyester (avoid cotton — see below). Merino is naturally odour-resistant, which matters on a 5-9 day trek with no laundry. Synthetic dries faster.</li>
<li><strong>Weight:</strong> Lightweight (150g/m2) for the lower zones, midweight (200-250g/m2) for high camps and summit night. Bring both.</li>
<li><strong>Fit:</strong> Snug but not tight. The base layer must contact your skin to wick effectively. A loose base layer traps air pockets that defeat the purpose.</li>
<li><strong>Top picks:</strong> Icebreaker 200 Oasis (merino, excellent odour control), Smartwool Classic Thermal (merino, durable), Patagonia Capilene Midweight (synthetic, fastest drying)</li>
</ul>

<h3>Layer 2: Insulation Layer (Heat Retention)</h3>
<p>The insulation layer traps warm air close to your body. This is your thermostat — add insulation to get warmer, remove it to cool down. On Kilimanjaro, you will use different amounts of insulation at different altitudes and times of day.</p>
<ul>
<li><strong>Fleece (100-300 weight):</strong> Breathable, dries fast, works when wet, and available at every price point. A 200-weight fleece is the backbone of Kilimanjaro insulation. You will wear it almost every evening at camp and during morning starts above 3,500m.</li>
<li><strong>Down jacket (600-800 fill):</strong> Maximum warmth for minimum weight. Reserved for camp evenings at high altitude and summit night. Down loses all insulation when wet, so never wear it as your outer layer in rain. Pack it in a dry bag.</li>
<li><strong>Synthetic insulated jacket:</strong> Heavier than down but retains warmth when damp. A good alternative if you expect wet conditions or do not want to baby a down jacket.</li>
<li><strong>Layering combinations:</strong> Below 3,000m you need no insulation while hiking. At 3,500-4,500m, a fleece over your base layer handles most conditions. Above 4,500m and on summit night, you stack fleece + down jacket for maximum warmth.</li>
</ul>

<h3>Layer 3: Shell Layer (Weather Protection)</h3>
<p>The shell blocks wind and rain. On Kilimanjaro, wind is a constant factor above the tree line, and rain is possible in the forest zone and during the wet season. Your shell is your armour.</p>
<ul>
<li><strong>Waterproof/breathable jacket:</strong> A Gore-Tex or equivalent jacket with sealed seams, a hood that fits over a hat, and pit zips for ventilation. This is non-negotiable. Rain in the forest zone is heavy and sudden. Wind at the summit can drive wind chill to -30°C.</li>
<li><strong>Waterproof trousers:</strong> Full side-zip models are best — you can put them on over boots without removing anything. You may only need them 1-2 days, but when you need them, nothing else works.</li>
<li><strong>Softshell (optional):</strong> A wind-resistant softshell is more breathable than a hard shell and works well for hiking in dry but windy conditions above the tree line. Some climbers prefer a softshell for daily hiking and save the hard shell for rain and summit night.</li>
</ul>

<h2>What to Wear in Each Climate Zone</h2>

<p>Kilimanjaro passes through five distinct <a href="/kilimanjaro-climate-zones/">climate zones</a>, each with different temperature and weather conditions. Here is what to wear in each:</p>

<table>
<thead>
<tr><th>Zone</th><th>Altitude</th><th>Temperature Range</th><th>What to Wear</th></tr>
</thead>
<tbody>
<tr><td><strong>Rainforest</strong></td><td>1,800-2,800m</td><td>+15 to +30°C</td><td>Lightweight base layer, convertible trousers, waterproof shell (rain is frequent). No insulation needed while hiking. Sun hat.</td></tr>
<tr><td><strong>Moorland/Heath</strong></td><td>2,800-4,000m</td><td>+5 to +20°C</td><td>Lightweight base layer, light fleece for morning starts and evenings, softshell or shell for wind. Long trousers. Sun protection critical — UV increases sharply.</td></tr>
<tr><td><strong>Alpine Desert</strong></td><td>4,000-5,000m</td><td>-5 to +15°C</td><td>Midweight base layer, 200-weight fleece, shell for wind. Wide temperature swings between sun and shade. Carry insulation in your daypack for rest stops. Gloves and warm hat for mornings.</td></tr>
<tr><td><strong>Arctic Zone</strong></td><td>5,000-5,685m</td><td>-15 to +5°C</td><td>Midweight base layer, fleece, down jacket at camp. Full shell for wind. Warm gloves, balaclava. Serious cold at night.</td></tr>
<tr><td><strong>Summit (night)</strong></td><td>5,685-5,895m</td><td>-20 to -5°C</td><td>Full summit layering system — see next section.</td></tr>
</tbody>
</table>

<h2>Summit Night Layering: The Coldest Part</h2>

<p><a href="/kilimanjaro-summit-night/">Summit night</a> is the ultimate test of your layering system. You start hiking between midnight and 1am, in pitch darkness, at temperatures of -10 to -20°C with wind chill potentially reaching -30°C. You are also moving slowly — summit pace is deliberately slow for altitude management — which means your body generates less heat than during daytime hiking. This is the coldest you will be on the entire trek.</p>

<p>Here is the summit night layering stack our guides recommend:</p>

<h3>Upper Body (Summit Night)</h3>
<ul>
<li>Midweight merino or synthetic base layer</li>
<li>200-weight fleece mid-layer</li>
<li>Down jacket (600+ fill) or heavyweight synthetic jacket</li>
<li>Waterproof/windproof hard shell over everything</li>
</ul>
<p>Total: four layers. The shell is critical not for rain (it does not rain at summit altitude) but for wind protection. Wind at the summit rim can be fierce, and even the best down jacket leaks warmth in a 40km/h wind without a windproof shell over it.</p>

<h3>Lower Body (Summit Night)</h3>
<ul>
<li>Midweight base layer tights (merino or synthetic)</li>
<li>Fleece-lined trekking trousers or softshell trousers</li>
<li>Waterproof shell trousers over the top if windy</li>
</ul>
<p>Your legs generate significant heat while walking, so they need fewer layers than your torso. Two layers are usually sufficient; add waterproof trousers if the wind is strong.</p>

<h3>Managing Temperature on Summit Night</h3>
<p>You will be freezing when you start at midnight. By the time the sun rises at Stella Point (around 6am), you will begin warming up. Many climbers strip their shell and down jacket at Stella Point because the combination of sunrise warmth and the final push to Uhuru Peak generates enough body heat. The key is ventilation: unzip before you overheat, and zip up immediately when you stop. Sweat inside your layers at -15°C is dangerous — once you stop moving, wet layers will chill you rapidly.</p>

<h2>Materials to Avoid: Cotton Kills</h2>

<p>"Cotton kills" is a mountaineering truism that applies emphatically on Kilimanjaro. Cotton absorbs moisture, holds it against your skin, and takes hours to dry. In the cold zones above 4,000m, wet cotton against skin causes rapid heat loss through evaporative cooling. This is not theoretical — our guides have seen climbers forced to descend because they were wearing cotton base layers that became sweat-soaked and caused hypothermia symptoms.</p>

<ul>
<li><strong>Cotton t-shirts:</strong> Replace with merino or polyester base layers</li>
<li><strong>Cotton underwear:</strong> Replace with merino or synthetic boxer briefs/sports bras</li>
<li><strong>Denim jeans:</strong> Heavy, restrictive, absorbs water, takes forever to dry. Wear trekking trousers instead</li>
<li><strong>Cotton socks:</strong> Replace with merino wool hiking socks. Cotton socks cause blisters and cold feet — two of the most common complaints from unprepared climbers</li>
<li><strong>Cotton hoodies:</strong> Replace with a fleece or synthetic mid-layer</li>
</ul>

<p>The only place cotton is acceptable is the forest zone on day one when temperatures are warm and you are near camp. Even then, a synthetic shirt is objectively better. Check every item on your <a href="/the-ultimate-kilimanjaro-packing-list/">packing list</a> and eliminate cotton entirely. See our <a href="/kilimanjaro-packing-mistakes/">common packing mistakes</a> guide for more on this and other gear errors.</p>

<h2>Head, Hands, and Feet</h2>

<h3>Head</h3>
<ul>
<li><strong>Sun hat:</strong> Wide-brimmed hat for the lower zones and alpine desert. UV intensity at 4,000m+ is extreme, and sunburn on your ears and neck is common.</li>
<li><strong>Warm beanie:</strong> Merino or fleece beanie for camp evenings and all hiking above 4,000m. You lose significant heat through your head — a beanie can feel like adding an entire layer.</li>
<li><strong>Balaclava or buff:</strong> For summit night. Covers your face and neck from wind. A balaclava with a breathing hole is better than a neck gaiter at extreme cold because it seals around your face. Breathing through a buff at -15°C causes it to freeze from moisture.</li>
</ul>

<h3>Hands</h3>
<ul>
<li><strong>Liner gloves:</strong> Thin merino or synthetic gloves for the alpine desert zone and camp. These provide light warmth and sun protection while allowing dexterity for zippers, cameras, and eating.</li>
<li><strong>Insulated gloves:</strong> Warm, wind-resistant gloves for summit night. Ski gloves work well. Ensure they are large enough to fit over liner gloves — the two-glove system gives you flexibility.</li>
<li><strong>Mittens (optional):</strong> Mittens are warmer than gloves because your fingers share heat. Some climbers bring expedition mittens for summit night as a backup if their gloves are insufficient. Our guides say cold hands are the second most common complaint after headache at the summit.</li>
</ul>

<h3>Feet</h3>
<ul>
<li><strong>Hiking socks:</strong> Midweight merino wool hiking socks. Bring 3-4 pairs — one fresh pair per 2 days minimum. Merino socks manage moisture, reduce blisters, and insulate even when damp.</li>
<li><strong>Liner socks (optional):</strong> Thin synthetic socks worn under hiking socks reduce friction and help prevent blisters. Useful if you are blister-prone.</li>
<li><strong>Summit night socks:</strong> Heavyweight merino or expedition-weight socks for the summit push. Your feet are in contact with frozen ground for 6-8 hours — thick socks and well-insulated <a href="/kilimanjaro-climbing-gear/">boots</a> are essential.</li>
<li><strong>Camp footwear:</strong> Lightweight sandals or camp shoes for evenings. Letting your feet breathe and dry out at <a href="/kilimanjaro-camping/">camp</a> prevents blisters and fungal issues on longer routes.</li>
</ul>

<h2>Managing Temperature During the Trek</h2>

<p>The biggest layering mistake is not adjusting. Climbers put on their morning layers and keep them on all day, overheating during uphill sections and sweating into their base layers. Sweat management is temperature management on Kilimanjaro.</p>

<ul>
<li><strong>Start cool:</strong> Begin each day feeling slightly cool. Within 10-15 minutes of hiking, your body heat will bring you to a comfortable temperature. Starting warm means you overheat within minutes.</li>
<li><strong>Vent before you sweat:</strong> Open pit zips, unzip your jacket, remove your hat, or pull off a layer <em>before</em> you start sweating. Once your base layer is wet, you have lost the game — you will be cold at the next rest stop.</li>
<li><strong>Add layers at stops:</strong> Put on your insulating layer the moment you stop for a break. Your body cools rapidly when you stop moving, especially in wind. Waiting until you feel cold means you have already lost heat you need to recover.</li>
<li><strong>Anticipate transitions:</strong> The trail on Kilimanjaro frequently shifts between exposed ridgelines (windy, cold) and sheltered valleys (calm, warm). Add your shell before you crest a ridge, not after the wind hits you.</li>
<li><strong>Dry layers at camp:</strong> Hang damp base layers and socks inside your tent or on your pack during sunny afternoons. Merino and synthetic fabrics dry quickly in the thin, dry air above 3,500m. Starting the next day in dry layers is one of the simplest things you can do for comfort.</li>
</ul>

<p>For the complete gear list beyond clothing, see our <a href="/kilimanjaro-climbing-gear/">climbing gear guide</a>. For weather patterns and seasonal conditions, read our <a href="/kilimanjaro-weather/">Kilimanjaro weather guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>How many sets of clothes do I need for Kilimanjaro?</h3>
<p>Fewer than you think. Two base layers (rotate daily, wash and dry one while wearing the other), one fleece, one down jacket, one shell jacket, two pairs of trekking trousers, 3-4 pairs of socks, and your summit night extras. Total clothing weight should be 3-4kg. You do not need a fresh outfit each day — merino wool resists odour for multiple wears, and nobody on the mountain cares how you smell on day five.</p>

<h3>Is it really that cold at the summit?</h3>
<p>Yes. At 5,895m, the average summit-night temperature is -10 to -15°C, and wind chill can push the effective temperature to -25°C or colder. Combined with the slow pace (you are barely moving, generating minimal body heat), reduced oxygen (your body is less efficient at generating warmth), and the fact that you start at midnight after minimal sleep — it genuinely feels arctic. This is not a situation where you can tough it out in insufficient clothing. Proper layering is the difference between summiting and turning back. Read our <a href="/kilimanjaro-summit-night/">summit night guide</a> for full preparation details.</p>

<h3>Can I buy layering clothes in Moshi or Arusha?</h3>
<p>There are second-hand clothing markets and a few outdoor shops in Moshi and Arusha where you can buy fleeces, jackets, and trekking trousers at low prices. Quality varies enormously — some finds are excellent (barely-used branded gear), while others are worn out. Base layers and down jackets are harder to find locally. Our recommendation: bring your critical layers (base layers, down jacket, shell) from home where you can test the fit and quality. Buy supplementary items locally if needed.</p>

<h3>What about rain gear — do I really need waterproof trousers?</h3>
<p>If you are climbing during the rainy season (March-May, November), waterproof trousers are essential — you will use them daily in the forest zone. During the dry season (January-February, June-October), rain is less likely but still possible. Even in dry season, waterproof trousers serve double duty as a wind layer on summit night. They weigh 200-300g and take minimal space. Bring them. For seasonal <a href="/kilimanjaro-weather/">weather patterns</a>, see our dedicated guide.</p>
`;

async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 15b)...\n");

  const posts = [
    {
      slug: "kilimanjaro-trekking-poles",
      title:
        "Trekking Poles for Kilimanjaro: Essential Guide to Types, Technique, and Rental",
      excerpt:
        "Are trekking poles necessary for Kilimanjaro? Types, technique for uphill and downhill, rental vs buying, top recommendations, and when to stow poles on the Barranco Wall.",
      content: post1Content,
      metaTitle: "Kilimanjaro Trekking Poles: Buy, Rent, or Skip? (2026)",
      metaDescription:
        "Complete guide to trekking poles for Kilimanjaro: aluminum vs carbon fibre, proper technique, adjusting length by terrain, rental quality in Moshi, and top pole recommendations.",
    },
    {
      slug: "kilimanjaro-layering-system",
      title:
        "What to Wear on Kilimanjaro: The Complete Layering System Guide",
      excerpt:
        "The 3-layer system for Kilimanjaro explained: base layer, insulation, and shell for every climate zone from rainforest to summit night, with specific product recommendations.",
      content: post2Content,
      metaTitle: "What to Wear on Kilimanjaro: Layering Guide (2026)",
      metaDescription:
        "What to wear on Kilimanjaro: the 3-layer system for every climate zone, summit night layering stack, materials to avoid, head/hands/feet guide, and temperature management tips.",
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
