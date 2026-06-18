/**
 * seed-kilimanjaro-blog-posts-6.ts
 *
 * Upserts 4 Kilimanjaro blog posts (batch 6):
 *  19. kilimanjaro-crater-camp
 *  20. kilimanjaro-full-moon-climb
 *  21. kilimanjaro-photography-guide
 *  22. kilimanjaro-fitness-test
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-6.ts
 */

import "dotenv/config";
import prisma from "../src/lib/prisma";

const post1Content = `
<p>Crater Camp is the highest campsite on Kilimanjaro — and one of the highest on Earth. At 5,729 metres (18,795 feet), it sits inside the volcanic caldera of Kibo, just 166 metres below <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a>. Sleeping in the crater is a rare, otherworldly experience reserved for a small number of climbers each year — fewer than 500 out of the 35,000+ who attempt Kilimanjaro annually. In our expeditions, Crater Camp has consistently been the most unforgettable night our climbers have ever spent on a mountain. This guide explains what it takes to get there and what you will experience when you do.</p>

<h2>What Is Crater Camp?</h2>

<p>Crater Camp occupies a flat section of volcanic ash inside the Kibo caldera, between the Furtwängler Glacier and the Reusch Crater. The campsite sits at approximately 5,729m on the caldera floor, surrounded by the ancient walls of the volcanic rim. To the south, the remaining fragments of the Southern Icefield tower overhead. To the north, the Reusch Crater's ash pit releases faint wisps of sulphurous gas — a reminder that Kilimanjaro is dormant, not extinct.</p>

<p>The campsite itself is stark. There is no vegetation, no wildlife, no colour beyond shades of grey, black, and white. The ground is volcanic ash and scree. The air contains roughly 48% of the oxygen available at sea level. It is, by any measure, one of the most extreme camping locations available to non-technical mountaineers anywhere in the world.</p>

<h2>Why Camp in the Crater?</h2>

<p>The reasons are experiential, not logistical:</p>

<ul>
<li><strong>Walk-up summit at dawn:</strong> Instead of the gruelling midnight summit push from Barafu (4,673m), Crater Camp climbers wake at dawn and walk just 166 vertical metres to <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a>. The summit push takes 30-60 minutes instead of 6-8 hours. You arrive fresh, rested, and able to fully absorb the moment.</li>
<li><strong>Furtwängler Glacier up close:</strong> Camp sits adjacent to the Furtwängler Glacier — the iconic ice formation in the centre of the crater. As these <a href="/kilimanjaro-glaciers/">glaciers disappear</a>, the opportunity to camp beside them becomes increasingly rare.</li>
<li><strong>Sunrise and sunset from 5,729m:</strong> Watching the sun rise and set from inside the caldera is an experience available nowhere else on the mountain. The play of light on the ice and volcanic walls is extraordinary.</li>
<li><strong>Bragging rights:</strong> Sleeping at 5,729m on Kilimanjaro is a genuine achievement that separates a Crater Camp expedition from a standard Kilimanjaro climb.</li>
</ul>

<h2>The Itinerary: How to Get There</h2>

<p>Crater Camp is not a separate route — it is an extension added to an existing route. The most common base routes are the <a href="/trekking/8-days-lemosho-route/">Lemosho</a> or Machame, extended by one day to include the crater overnight.</p>

<h3>Typical 8-Day Lemosho + Crater Camp Itinerary</h3>

<table>
<thead>
<tr><th>Day</th><th>Stage</th><th>Altitude</th><th>Hours</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Londorossi Gate → Big Tree Camp</td><td>2,100m → 2,780m</td><td>3-4h</td></tr>
<tr><td>2</td><td>Big Tree Camp → Shira 2 Camp</td><td>2,780m → 3,840m</td><td>5-6h</td></tr>
<tr><td>3</td><td>Shira 2 → Lava Tower → Barranco Camp</td><td>3,840m → 4,630m → 3,960m</td><td>6-7h</td></tr>
<tr><td>4</td><td>Barranco Camp → Karanga Camp</td><td>3,960m → 3,995m</td><td>4-5h</td></tr>
<tr><td>5</td><td>Karanga Camp → Barafu Camp</td><td>3,995m → 4,673m</td><td>3-4h</td></tr>
<tr><td>6</td><td>Barafu → Stella Point → <strong>Crater Camp</strong></td><td>4,673m → 5,756m → <strong>5,729m</strong></td><td>6-8h</td></tr>
<tr><td>7</td><td><strong>Crater Camp → Uhuru Peak</strong> → Millennium Camp</td><td>5,729m → <strong>5,895m</strong> → 3,100m</td><td>8-10h</td></tr>
<tr><td>8</td><td>Millennium Camp → Mweka Gate</td><td>3,100m → 1,640m</td><td>4-5h</td></tr>
</tbody>
</table>

<p>The critical day is Day 6: you ascend from Barafu Camp to Stella Point on the crater rim (the same route as a standard summit push), but instead of continuing to Uhuru Peak, you descend into the crater and make camp. Day 7, you walk to Uhuru Peak at sunrise, then descend all the way to Millennium Camp.</p>

<h2>Physical Requirements</h2>

<p>Crater Camp demands more from your body than a standard Kilimanjaro climb. You are spending a night at extreme altitude — 5,729m — where <a href="/kilimanjaro-acclimatization/">acclimatization</a> is critical and sleep is difficult. Requirements:</p>

<ul>
<li><strong>Prior altitude experience:</strong> While not strictly mandatory, we strongly recommend that Crater Camp climbers have previous experience above 4,000m. This could be a prior Kilimanjaro climb, Mount Kenya, Mount Meru, or high-altitude trekking in the Himalayas or Andes.</li>
<li><strong>Excellent fitness:</strong> You need the endurance to ascend from Barafu to the crater rim (same as a summit push), then descend into the crater, all while carrying the knowledge that you will spend the night at extreme altitude. A thorough <a href="/kilimanjaro-training-plan/">training plan</a> is essential.</li>
<li><strong>Strong acclimatization:</strong> The 8-day minimum itinerary provides adequate acclimatization for most climbers, but you must be acclimatizing well throughout the trek. If you are showing significant altitude sickness symptoms at Barafu, your guide will advise against the crater extension.</li>
<li><strong>Mental resilience:</strong> Sleep at 5,729m is minimal. The cold is extreme (-15°C to -25°C). The air is thin. You need to be comfortable with discomfort.</li>
</ul>

<h2>What to Expect at Crater Camp</h2>

<h3>The Environment</h3>
<p>Crater Camp is lunar. The ground is grey-black volcanic ash. The Furtwängler Glacier rises like a blue-white wall nearby. The caldera walls encircle you on all sides, blocking the wind but trapping the cold. Sound carries strangely in the thin air — voices seem both close and distant. At night, the stars are extraordinary — you are above most of the atmosphere, and the Milky Way arcs overhead with an intensity impossible at lower altitudes.</p>

<h3>Temperature</h3>
<p>Expect nighttime temperatures between -15°C and -25°C (5°F to -13°F). This is significantly colder than Barafu Camp due to the higher altitude and the caldera's cold-trapping geography. A sleeping bag rated to -20°C or lower is essential. Your <a href="/kilimanjaro-climbing-gear/">gear</a> must be summit-grade.</p>

<h3>Sleeping</h3>
<p>Genuine sleep at 5,729m is rare. Most climbers doze intermittently, waking frequently to breathe more deeply. This is normal — your body is working hard to oxygenate at half the sea-level oxygen concentration. The short summit walk the next morning means that imperfect sleep is far less consequential than on a standard summit night, where you need energy for a 6-8 hour push.</p>

<h3>Water</h3>
<p>There is no water source at Crater Camp. All water must be carried up by your porter team or melted from ice (when permitted by KINAPA). Hydration is critical at this altitude — dehydration accelerates altitude sickness. Ensure your team carries adequate water for cooking, drinking, and bottles.</p>

<h2>Cost</h2>

<p>Crater Camp adds approximately $400-600 to the cost of a standard Kilimanjaro climb. The premium covers the additional camping fees, extra porter wages for carrying gear to extreme altitude, and the specialized equipment required. See our <a href="/kilimanjaro-prices/">pricing page</a> for current rates.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Crater Camp safe?</h3>
<p>Yes, when properly managed. The risks are altitude-related: acute mountain sickness (AMS), high-altitude pulmonary edema (HAPE), and high-altitude cerebral edema (HACE). Our guides carry pulse oximeters, supplemental oxygen, and Gamow bags, and are trained in high-altitude emergency protocols. The key safeguard is thorough acclimatization — if you are not acclimatizing well, your guide will recommend skipping the crater extension and summiting via the standard route instead. <a href="/kilimanjaro-safety/">Safety</a> is never compromised.</p>

<h3>How many people camp in the crater each year?</h3>
<p>Fewer than 500. KINAPA limits the number of groups that can camp in the crater at any given time, and the logistical demands of carrying full camping equipment to 5,729m mean that only a small number of operators offer this option.</p>

<h3>Can I add Crater Camp to any route?</h3>
<p>In theory, yes — any route that summits via Stella Point can be extended to include a crater night. In practice, the <a href="/trekking/8-days-lemosho-route/">Lemosho</a> (8-9 days) and <a href="/kilimanjaro-northern-circuit/">Northern Circuit</a> (9-10 days) are the best base routes because they provide the strongest acclimatization before the crater night.</p>

<h3>Do I need special gear for Crater Camp?</h3>
<p>Your standard Kilimanjaro <a href="/kilimanjaro-climbing-gear/">gear</a> is sufficient, but your sleeping bag must be rated to at least -20°C. We also recommend an insulated sleeping pad with an R-value of 5+, chemical hand warmers, a balaclava, and expedition-weight base layers. Your feet will get cold — bring the warmest socks you own.</p>

<h3>What about the glacier — will it still be there?</h3>
<p>The Furtwängler Glacier is retreating rapidly. Scientists estimate it may disappear entirely within 10-20 years. If camping beside one of Kilimanjaro's last remaining <a href="/kilimanjaro-glaciers/">glaciers</a> is important to you, sooner is better than later.</p>

<h3>Can beginners do Crater Camp?</h3>
<p>We generally advise against it for <a href="/can-beginners-climb-kilimanjaro/">first-time high-altitude trekkers</a>. The extreme altitude of the overnight stay adds significant physiological stress. If you are determined, choose a 9-day itinerary for maximum acclimatization and discuss your fitness level and altitude history with our team before booking.</p>
`;

const post2Content = `
<p>A full moon Kilimanjaro climb is the most magical way to summit Africa's highest peak. When the moon rises over the crater rim and illuminates the glaciers, the scree slopes, and the trail ahead in silver light, the <a href="/kilimanjaro-summit-night/">summit night</a> experience transforms from a headlamp-lit grind into something approaching the transcendent. In our 500+ expeditions, full moon summits consistently produce the most emotional reactions from our climbers. This guide explains how to plan your climb around the lunar calendar for the best possible experience.</p>

<h2>Why the Full Moon Matters on Summit Night</h2>

<p>Summit night on Kilimanjaro begins at midnight and ends at sunrise. For 5-7 hours, you trek through darkness — switchbacking up volcanic scree, watching your breath freeze in the beam of your headlamp. On a standard night, the world shrinks to the small cone of light ahead of your boots.</p>

<p>On a full moon night, everything changes:</p>

<ul>
<li><strong>You can see the entire mountain.</strong> The glaciers glow blue-white. The volcanic scree gleams silver. The trail stretches ahead in sharp definition. The scale of the mountain, invisible on dark nights, becomes viscerally apparent.</li>
<li><strong>The shadow of Kilimanjaro appears earlier.</strong> Even before sunrise, the moonlit landscape reveals the mountain's enormous triangular shadow stretching across the plains below.</li>
<li><strong>Navigation is easier.</strong> Guides and climbers can see the terrain clearly, reducing the stumbling and disorientation that sometimes affects climbers on dark summit nights.</li>
<li><strong>Photography improves dramatically.</strong> Long-exposure shots of the moonlit glaciers, the silhouetted climbers, and the star-filled sky above are possible without the blown-out effect of headlamp illumination.</li>
<li><strong>The psychological effect is powerful.</strong> Climbing in moonlight rather than darkness reduces the feeling of isolation and claustrophobia that dark summit nights can produce. Climbers report feeling more connected to the mountain and more present in the experience.</li>
</ul>

<h2>Full Moon Dates for Kilimanjaro Climbing</h2>

<p>The ideal summit night is the night of the full moon itself, or within 2 days either side (the moon is nearly full and the illumination is strong). Because summit night happens on a fixed day of your itinerary (the second-to-last day), you need to plan your start date backward from the full moon.</p>

<h3>2026 Full Moon Calendar for Kilimanjaro</h3>

<table>
<thead>
<tr><th>Month</th><th>Full Moon Date</th><th>Dry Season?</th><th>Recommended?</th></tr>
</thead>
<tbody>
<tr><td>January</td><td>January 13</td><td>Yes (short dry)</td><td>Yes</td></tr>
<tr><td>February</td><td>February 12</td><td>Yes (short dry)</td><td>Yes</td></tr>
<tr><td>March</td><td>March 14</td><td>No (long rains begin)</td><td>Caution</td></tr>
<tr><td>April</td><td>April 12</td><td>No (heavy rains)</td><td>No</td></tr>
<tr><td>May</td><td>May 12</td><td>No (rains tapering)</td><td>No</td></tr>
<tr><td>June</td><td>June 11</td><td>Yes (dry begins)</td><td>Yes</td></tr>
<tr><td>July</td><td>July 10</td><td>Yes (peak dry)</td><td>Best</td></tr>
<tr><td>August</td><td>August 9</td><td>Yes (peak dry)</td><td>Best</td></tr>
<tr><td>September</td><td>September 7</td><td>Yes (dry)</td><td>Yes</td></tr>
<tr><td>October</td><td>October 7</td><td>Transition</td><td>Yes</td></tr>
<tr><td>November</td><td>November 5</td><td>No (short rains)</td><td>Caution</td></tr>
<tr><td>December</td><td>December 5</td><td>Transition</td><td>Yes</td></tr>
</tbody>
</table>

<p><em>Note: Full moon dates shift by approximately one day each year. Check a lunar calendar for exact dates when booking.</em></p>

<h3>How to Calculate Your Start Date</h3>

<p>To summit on a full moon night, count backward from the full moon date by the number of days in your itinerary minus one:</p>

<ul>
<li><strong>7-day Machame:</strong> Start 5 days before the full moon (summit night is Day 6)</li>
<li><strong>7-day Lemosho:</strong> Start 5 days before the full moon (summit night is Day 6)</li>
<li><strong>8-day Lemosho:</strong> Start 6 days before the full moon (summit night is Day 7)</li>
<li><strong>9-day <a href="/kilimanjaro-northern-circuit/">Northern Circuit</a>:</strong> Start 7 days before the full moon (summit night is Day 8)</li>
<li><strong>7-day Rongai:</strong> Start 5 days before the full moon (summit night is Day 6)</li>
</ul>

<p>Example: If the full moon is July 10, 2026, and you are climbing the 8-day Lemosho, start on July 4 (Day 1 = July 4, summit night = Day 7 = July 10).</p>

<p>Our team handles this calculation when you book — just tell us you want a full moon summit and we will align your dates.</p>

<h2>Full Moon vs New Moon: The Stargazing Alternative</h2>

<p>Counterintuitively, some climbers deliberately choose a new moon summit night. Without moonlight, the stars and Milky Way are even more spectacular. The trade-off is real: navigation relies entirely on headlamps, and the immersive moonlit landscape disappears. But for astrophotography enthusiasts or climbers who have already summited by moonlight, a new moon climb offers a different kind of magic.</p>

<p>Our recommendation for first-time climbers is always the full moon. The moonlit summit experience is the single most beautiful version of the <a href="/kilimanjaro-summit-night/">summit night</a>, and on your first climb, you want every advantage — including the psychological boost of being able to see where you are going.</p>

<h2>Weather Considerations</h2>

<p>A full moon is only useful if you can see it. Cloud cover at summit altitude is uncommon during the dry season (June-October, January-February), but not impossible. During the shoulder months and rainy seasons, cloud cover is more frequent and may obscure the moon entirely.</p>

<p>The <a href="/best-time-to-climb-kilimanjaro/">best months for a full moon climb</a> are July, August, September (peak dry season) and January, February (short dry season). These months offer the highest probability of clear skies at summit altitude.</p>

<p>Even with partial cloud cover, a full moon night is brighter than a moonless night. High, thin clouds diffuse the moonlight rather than blocking it entirely, creating an ethereal glow across the mountain.</p>

<h2>Crowd Considerations</h2>

<p>Full moon dates are the busiest summit nights on Kilimanjaro. Experienced climbers and operators know the value of moonlight, and popular routes (particularly Machame and Lemosho) see higher-than-usual traffic on full moon summit nights during peak season.</p>

<p>If you want a full moon summit with fewer crowds, consider:</p>
<ul>
<li><strong>The <a href="/kilimanjaro-northern-circuit/">Northern Circuit</a></strong> — inherently quieter, even on full moon nights</li>
<li><strong>The Rongai route</strong> — <a href="/kilimanjaro-machame-vs-rongai/">fewer climbers than Machame</a>, and the northern approach is less congested</li>
<li><strong>Off-peak months</strong> — a full moon in January or February offers clear skies with significantly fewer climbers than July-August</li>
</ul>

<h2>Photography Tips for a Full Moon Summit</h2>

<p>A full moon summit night offers extraordinary <a href="/kilimanjaro-photography-guide/">photography</a> opportunities that are impossible on dark nights:</p>

<ul>
<li><strong>Set your ISO high (1600-3200)</strong> and use a wide aperture (f/2.8 or wider) for handheld moonlit landscape shots.</li>
<li><strong>Bring a mini tripod</strong> — even a Gorillapod allows long exposures (5-15 seconds) that capture the moonlit glaciers and climber headlamps.</li>
<li><strong>Shoot the moonrise</strong> if timing allows — the moon rising above the crater rim with glaciers in the foreground is one of the most iconic Kilimanjaro photographs.</li>
<li><strong>Use manual focus</strong> — autofocus struggles in low light. Pre-focus at infinity before the summit push and tape the focus ring.</li>
<li><strong>Keep your camera warm</strong> — batteries die fast at -15°C. Store your camera inside your jacket between shots.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Does the full moon make summit night easier?</h3>
<p>It does not reduce the physical difficulty — the altitude, cold, and distance are identical. But the psychological benefit is real. Being able to see the trail, the mountain, and your progress reduces the mental burden. Many climbers report that the beauty of the moonlit landscape provides a powerful distraction from the discomfort.</p>

<h3>Can I book a specific summit date?</h3>
<p>Yes. Private climbs can start on any date, so aligning with the full moon is straightforward. <a href="/kilimanjaro-join-group-departures/">Group departures</a> have fixed dates — check which ones align with the full moon calendar.</p>

<h3>What if clouds block the moon?</h3>
<p>At summit altitude (above 5,000m), you are often above the cloud layer. Low clouds that obscure the sky at camp may clear as you ascend. Even on partially cloudy nights, the moon provides significantly more ambient light than a moonless sky.</p>

<h3>Is the full moon important for the descent?</h3>
<p>The descent begins after sunrise, so moonlight is irrelevant. The moon matters exclusively for the pre-dawn summit push (midnight to ~6:00 AM).</p>

<h3>Do all routes benefit equally from a full moon?</h3>
<p>Routes with more exposed, open terrain benefit most. Machame (via Barafu) and Lemosho (via Barafu) have long, open scree slopes where moonlight transforms the experience. Marangu (via Kibo Hut) also benefits, though the approach is rockier. The Rongai approach has similar open terrain.</p>

<h3>Should I bring a headlamp even on a full moon night?</h3>
<p>Absolutely. A headlamp is mandatory safety equipment regardless of the moon. Use it selectively — many climbers prefer to switch it off on full moon nights to let their eyes adjust to the moonlight, then switch it on for technical sections or steep terrain.</p>
`;

const post3Content = `
<p>Kilimanjaro offers some of the most dramatic photography opportunities in outdoor adventure — five distinct <a href="/kilimanjaro-climate-zones/">climate zones</a>, otherworldly landscapes, ancient glaciers, and the raw emotion of summit night. Yet many climbers return home disappointed with their images. The challenges are real: extreme cold kills batteries, altitude dulls your creative instincts, and the best light happens when you are most exhausted. In our 500+ expeditions, we have watched thousands of climbers navigate these challenges. This guide distils that experience into practical advice that will help you capture images worthy of the mountain.</p>

<h2>Essential Camera Gear</h2>

<h3>Camera Choice</h3>
<p>Bring what you know how to use. A smartphone with a good camera is better than a DSLR you barely understand. That said, the best results come from:</p>

<ul>
<li><strong>Mirrorless camera (Sony, Fujifilm, Canon R, Nikon Z)</strong> — best image quality, lightest weight. The Sony A7C or Fujifilm X-T5 are excellent choices for mountain photography.</li>
<li><strong>High-end smartphone</strong> — modern flagship phones (iPhone 15 Pro, Samsung S24 Ultra, Pixel 8 Pro) produce remarkable results, especially in good light. Night mode handles moonlit landscapes surprisingly well.</li>
<li><strong>Action camera (GoPro)</strong> — useful for wide-angle summit shots and video, but limited manual control and poor low-light performance.</li>
</ul>

<p>Do not bring: heavy telephoto lenses (the weight is not justified), fragile equipment (drones are prohibited by KINAPA), or gear you have not tested.</p>

<h3>Lenses</h3>
<p>If using a mirrorless or DSLR, bring two lenses maximum:</p>
<ul>
<li><strong>Wide-angle zoom (16-35mm or 14-24mm)</strong> — for landscapes, glacier close-ups, summit panoramas, and night sky shots. This is your primary lens.</li>
<li><strong>Standard zoom (24-70mm or 24-105mm)</strong> — for portraits, camp life, detail shots, and mid-range landscapes. This is your secondary lens.</li>
</ul>

<p>If you can only bring one lens, make it a 24-70mm f/2.8 — the most versatile focal range for mountain photography.</p>

<h3>Accessories</h3>
<ul>
<li><strong>Spare batteries (3-4 minimum)</strong> — cold drains lithium batteries rapidly. At summit altitude (-15°C), a fully charged battery may last only 20-30 minutes of active shooting. Keep spares in your inside pocket against your body.</li>
<li><strong>Mini tripod or Gorillapod</strong> — essential for night sky photography and long exposures. Full-size tripods are too heavy and impractical.</li>
<li><strong>Lens cleaning cloth</strong> — dust, condensation, and fingerprints are constant challenges.</li>
<li><strong>Weatherproof camera bag or pouch</strong> — protects against rain in the forest zone and dust in the alpine desert.</li>
<li><strong>Memory cards (at least 64GB total)</strong> — shoot RAW format for maximum editing flexibility. Bring more than you think you need.</li>
</ul>

<h2>Photography by Climate Zone</h2>

<h3>Rainforest Zone (1,800-2,800m) — Days 1-2</h3>
<p>The forest zone is a photographer's dream and nightmare simultaneously. The light is soft and diffused (perfect for portraits), but the canopy blocks direct sunlight, requiring higher ISOs. Look for:</p>
<ul>
<li>Colobus monkeys in the canopy — use your longest focal length</li>
<li>Mossy tree trunks and hanging lichens — wide-angle close-ups</li>
<li>Shafts of light cutting through the canopy — patience required</li>
<li>Your porter team on the trail — context shots that tell the story</li>
</ul>
<p><strong>Settings:</strong> ISO 800-1600, wide aperture (f/2.8-4), matrix metering. The green canopy can fool auto white balance — shoot RAW to correct later.</p>

<h3>Moorland and Heath Zone (2,800-4,000m) — Days 2-4</h3>
<p>Above the treeline, the landscape opens up dramatically. Giant groundsel and lobelia plants create surreal foregrounds against the mountain backdrop. The light is excellent — clear, bright, and directional. Best opportunities:</p>
<ul>
<li>Giant groundsel silhouettes at sunset</li>
<li>The Shira Plateau with Kibo rising behind</li>
<li>Barranco Wall — shoot upward for scale, or from across the valley for context</li>
<li>Cloud inversions — looking down on a sea of clouds below</li>
</ul>
<p><strong>Settings:</strong> ISO 100-400, f/8-11 for landscapes, polarising filter to deepen blue skies and reduce haze.</p>

<h3>Alpine Desert Zone (4,000-5,000m) — Days 4-6</h3>
<p>Barren, monochromatic, and vast. The alpine desert is challenging to photograph well because the lack of colour and vegetation can make images feel flat. Strategies:</p>
<ul>
<li>Use people for scale — a lone climber against the vastness communicates what words cannot</li>
<li>Shoot during golden hour — the warm light adds colour that the landscape itself lacks</li>
<li>Focus on textures — volcanic rock patterns, scree formations, frost crystals on tent fabric</li>
<li>Shoot upward — the mountain dominates the sky from here, and wide-angle shots emphasise its mass</li>
</ul>
<p><strong>Settings:</strong> ISO 100-200, f/8-16 for maximum sharpness. The air is clear and contrast is high — avoid blowing highlights on snow and ice by using exposure compensation (-0.3 to -1.0 EV).</p>

<h3>Summit Zone (5,000-5,895m) — Summit Night</h3>
<p>This is where most photographers struggle. You are cold, exhausted, oxygen-deprived, and operating in darkness or the harsh light of early dawn. The images that matter most are the hardest to capture. Preparation is everything:</p>
<ul>
<li><strong>Pre-set your camera before leaving high camp.</strong> Choose your settings in the warmth of the tent and commit them to muscle memory. At the summit, your brain is too foggy for creative decisions.</li>
<li><strong>Headlamp trails:</strong> From a distance, the line of headlamps ascending the scree slope creates iconic long-exposure images. Set up your tripod early in the ascent for this shot.</li>
<li><strong>Sunrise at Stella Point:</strong> The moment the sun breaks the horizon at the crater rim is the single most photogenic moment of the entire climb. Be ready.</li>
<li><strong>The summit sign:</strong> Shoot fast. You have 10-20 minutes. Take the obligatory sign portrait, then turn around for the glacier and crater shots.</li>
<li><strong>The glaciers:</strong> The Southern Icefield walls glow in sunrise light. Get close — the texture and blue tones are extraordinary.</li>
</ul>
<p><strong>Settings:</strong> Pre-sunrise: ISO 1600-3200, f/2.8, manual focus at infinity. Sunrise: ISO 200-400, f/8, auto white balance (the natural warmth of the light is what you want). Summit sign: ISO 200, f/5.6-8, fill flash if available to avoid backlit silhouettes.</p>

<h2>Protecting Your Gear</h2>

<ul>
<li><strong>Cold:</strong> The biggest threat. Batteries fail, LCDs slow, and condensation forms when you bring cold gear into warm spaces (dining tent). Keep your camera in a sealed plastic bag when moving from cold to warm environments — the condensation forms on the bag, not the lens.</li>
<li><strong>Dust:</strong> The alpine desert and summit zones are extremely dusty. Keep your camera sealed when not shooting. Change lenses inside your tent with the door zipped. Clean your sensor before the climb if possible.</li>
<li><strong>Rain:</strong> The forest zone can be wet. A rain cover or gallon Ziploc bag protects your camera. Silica gel packets inside your camera bag absorb moisture.</li>
<li><strong>Impact:</strong> Trekking with a camera around your neck invites bumps against rocks and poles. Use a camera strap that keeps the camera tight against your chest (Peak Design Capture Clip or similar).</li>
</ul>

<h2>Composition Tips for Kilimanjaro</h2>

<ul>
<li><strong>People make the picture.</strong> Landscapes without human scale look like stock photos. Include climbers, <a href="/kilimanjaro-porters/">porters</a>, or guides to give the viewer a reference for the immense scale of the mountain.</li>
<li><strong>Shoot the quiet moments.</strong> Camp life — cooking, laughing, resting, gear preparation — tells a richer story than summit-sign selfies alone.</li>
<li><strong>Look behind you.</strong> The most photogenic view is often not ahead but behind. As you ascend, the views of lower zones, clouds, and the surrounding plains become increasingly dramatic.</li>
<li><strong>Golden hour is everything.</strong> The light on Kilimanjaro is harshly contrasty during midday. Sunrise and sunset transform the mountain. Plan your shooting around these windows.</li>
<li><strong>Vertical for social, horizontal for print.</strong> Shoot both orientations of your best compositions.</li>
</ul>

<h2>Smartphone Photography Tips</h2>

<p>If your smartphone is your primary camera, these tips will maximise your results:</p>
<ul>
<li>Clean your lens constantly — fingerprints kill sharpness</li>
<li>Use HDR mode for high-contrast scenes (snow + dark rock)</li>
<li>Enable RAW capture (ProRAW on iPhone, RAW+ on Samsung) for maximum editing flexibility</li>
<li>Use Night Mode for summit night and camp scenes — the computational photography is remarkably good</li>
<li>Bring a waterproof case for the forest zone</li>
<li>Keep your phone inside your jacket — cold kills phone batteries faster than camera batteries</li>
<li>Download a manual camera app (Halide, ProCam) for full control over ISO, shutter speed, and focus</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Should I bring a drone?</h3>
<p>No. Drones are prohibited in Kilimanjaro National Park by KINAPA regulations. Violation can result in confiscation of the drone and a fine. The restriction exists to protect wildlife and the experience of other climbers.</p>

<h3>Can I charge my camera on the mountain?</h3>
<p>There are no power outlets at any camp. Bring a portable power bank (20,000mAh minimum) to charge your camera via USB. Keep the power bank inside your sleeping bag at night to maintain its capacity in the cold.</p>

<h3>How many photos should I expect to take?</h3>
<p>Serious photographers shoot 200-500 images per day on Kilimanjaro. Budget for at least 64GB of storage total (more if shooting RAW + JPEG). A 7-day climb at 300 images per day in RAW format requires approximately 100-150GB.</p>

<h3>Will my guide take photos for me?</h3>
<p>Yes. Our guides are experienced mountain photographers and happy to take photos with your camera. On summit day, when your hands are cold and your brain is foggy, handing your camera to your guide is often the best strategy.</p>

<h3>Is there cell signal for uploading photos?</h3>
<p>Signal is available at lower camps (forest and moorland zones). Above 4,000m, signal is sporadic to absent. Plan to share your photos after the climb, not during it. The enforced disconnect is part of the experience.</p>

<h3>What about video — should I shoot video or photos?</h3>
<p>Both, but prioritise photos. Video is memory-intensive, battery-intensive, and requires more post-production. A GoPro mounted on your pack captures continuous video effortlessly, freeing your main camera for still photography. If you must choose, photos tell the story better in our experience.</p>
`;

const post4Content = `
<p>How do you know if you are fit enough to climb Kilimanjaro? It is the question we are asked most frequently, and the answer matters — your fitness level directly correlates with your enjoyment on the mountain, your <a href="/kilimanjaro-acclimatization/">acclimatization</a> response, and ultimately your chances of reaching <a href="/kilimanjaro-uhuru-peak/">Uhuru Peak</a>. In our 500+ expeditions, we have seen the full spectrum: elite athletes who struggle and casual hikers who sail to the summit. Fitness is not about being an athlete — it is about specific preparation for the specific demands of Kilimanjaro. This guide provides a practical fitness assessment you can do at home, plus the benchmarks we use to evaluate climber readiness.</p>

<h2>The Physical Demands of Kilimanjaro</h2>

<p>Before we test your fitness, you need to understand what Kilimanjaro actually demands from your body:</p>

<ul>
<li><strong>Sustained low-intensity effort:</strong> You walk 4-8 hours per day for 5-9 consecutive days. The pace is slow (1-2 km/h at altitude), but the cumulative fatigue is significant.</li>
<li><strong>Elevation gain:</strong> You gain approximately 4,000 metres of elevation over the course of the trek. The daily gains range from 600m to 1,200m.</li>
<li><strong>Summit night endurance:</strong> The <a href="/kilimanjaro-summit-night/">summit push</a> is 12-16 hours of continuous effort, including 6-8 hours of ascending in darkness at extreme altitude. This is the single most demanding physical challenge.</li>
<li><strong>Load carrying:</strong> You carry a daypack weighing 5-8 kg containing water, snacks, rain gear, and warm layers. Your <a href="/kilimanjaro-porters/">porters</a> carry the rest.</li>
<li><strong>Uneven terrain:</strong> Steep rocky trails, loose scree, the Barranco Wall scramble, and volcanic gravel — this is not pavement walking.</li>
<li><strong>Altitude effects:</strong> Above 4,000m, reduced oxygen makes every physical effort feel 30-50% harder than it would at sea level.</li>
</ul>

<h2>The Snow Africa Fitness Assessment</h2>

<p>We have developed a 6-test fitness assessment based on the actual physical demands of Kilimanjaro. Complete these tests honestly — the results help us advise you on route selection, training focus, and timeline.</p>

<h3>Test 1: The Stair Test</h3>
<p><strong>What it measures:</strong> Leg endurance and cardiovascular fitness — the two most critical fitness components for Kilimanjaro.</p>
<p><strong>How to do it:</strong> Find a staircase with at least 20 steps (or use a stair climber machine). Climb stairs continuously for 30 minutes at a steady, moderate pace. Wear a daypack loaded with 7 kg of weight (books, water bottles).</p>

<table>
<thead>
<tr><th>Result</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>Completed easily, could continue</td><td>Excellent</td><td>Ready for any route, including 6-day options</td></tr>
<tr><td>Completed, moderately tired</td><td>Good</td><td>Ready for 7-8 day routes with adequate training</td></tr>
<tr><td>Completed, very tired</td><td>Fair</td><td>Choose a 7+ day route, intensify training</td></tr>
<tr><td>Could not complete 30 minutes</td><td>Needs Work</td><td>Begin 12-16 week training programme before booking</td></tr>
</tbody>
</table>

<h3>Test 2: The Long Walk</h3>
<p><strong>What it measures:</strong> Multi-hour endurance — your ability to sustain effort over the long days required on the mountain.</p>
<p><strong>How to do it:</strong> Walk for 5-6 hours on hilly terrain (trails, not pavement) carrying a 7 kg daypack. Note how you feel afterward.</p>

<table>
<thead>
<tr><th>Result</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>Felt good, legs fresh next day</td><td>Excellent</td><td>Your endurance base is solid</td></tr>
<tr><td>Tired but recovered overnight</td><td>Good</td><td>Adequate base, keep building</td></tr>
<tr><td>Very tired, sore for 2+ days</td><td>Fair</td><td>Need more long walks in training</td></tr>
<tr><td>Could not complete</td><td>Needs Work</td><td>Start with shorter walks, build gradually</td></tr>
</tbody>
</table>

<h3>Test 3: The Core Test</h3>
<p><strong>What it measures:</strong> Core stability — essential for balance on uneven terrain and for the Barranco Wall scramble.</p>
<p><strong>How to do it:</strong> Hold a front plank position for as long as possible. Time yourself.</p>

<table>
<thead>
<tr><th>Duration</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>3+ minutes</td><td>Excellent</td><td>Core strength well above requirements</td></tr>
<tr><td>2-3 minutes</td><td>Good</td><td>Adequate core strength</td></tr>
<tr><td>1-2 minutes</td><td>Fair</td><td>Add core exercises to training</td></tr>
<tr><td>Under 1 minute</td><td>Needs Work</td><td>Prioritise core training</td></tr>
</tbody>
</table>

<h3>Test 4: The Leg Strength Test</h3>
<p><strong>What it measures:</strong> Quadriceps and glute strength — critical for the descent, which is harder on your legs than the ascent.</p>
<p><strong>How to do it:</strong> Perform wall sits. Lean your back against a wall, lower to a 90-degree knee angle, and hold.</p>

<table>
<thead>
<tr><th>Duration</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>3+ minutes</td><td>Excellent</td><td>Descent will be manageable</td></tr>
<tr><td>2-3 minutes</td><td>Good</td><td>Adequate, keep training</td></tr>
<tr><td>1-2 minutes</td><td>Fair</td><td>Add squats and lunges to training</td></tr>
<tr><td>Under 1 minute</td><td>Needs Work</td><td>Leg strength is a priority</td></tr>
</tbody>
</table>

<h3>Test 5: The Recovery Test</h3>
<p><strong>What it measures:</strong> How quickly your body recovers — crucial when you trek for multiple consecutive days without rest.</p>
<p><strong>How to do it:</strong> Complete a challenging hike or exercise session, then assess how you feel 24 hours later.</p>

<table>
<thead>
<tr><th>Recovery</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>Fully recovered, ready to repeat</td><td>Excellent</td><td>Multi-day endurance is solid</td></tr>
<tr><td>Slightly stiff but functional</td><td>Good</td><td>Back-to-back days are feasible</td></tr>
<tr><td>Significantly sore and tired</td><td>Fair</td><td>Recovery is a concern — train more frequently</td></tr>
<tr><td>Unable to exercise next day</td><td>Needs Work</td><td>Build recovery capacity with consistent training</td></tr>
</tbody>
</table>

<h3>Test 6: The Mental Endurance Test</h3>
<p><strong>What it measures:</strong> Your ability to push through discomfort — arguably the most important factor on summit night.</p>
<p><strong>How to do it:</strong> Set your alarm for 1:00 AM. Get up, get dressed in cold weather layers, and walk briskly for 2 hours in the dark. This simulates the first hours of summit night. How did it feel?</p>

<table>
<thead>
<tr><th>Response</th><th>Score</th><th>What It Means</th></tr>
</thead>
<tbody>
<tr><td>Uncomfortable but manageable</td><td>Excellent</td><td>Summit night mentality is solid</td></tr>
<tr><td>Difficult but completed</td><td>Good</td><td>You will cope with summit night</td></tr>
<tr><td>Very difficult, wanted to quit</td><td>Fair</td><td>Mental preparation is as important as physical</td></tr>
<tr><td>Could not complete</td><td>Needs Work</td><td>Practice discomfort tolerance</td></tr>
</tbody>
</table>

<h2>Interpreting Your Results</h2>

<h3>Overall Score: Mostly Excellent</h3>
<p>You are physically ready for Kilimanjaro. Any route and itinerary length is appropriate. You have the option of more challenging routes like the <a href="/kilimanjaro-machame-vs-rongai/">Machame</a> or adding a <a href="/kilimanjaro-crater-camp/">Crater Camp</a> extension.</p>

<h3>Overall Score: Mostly Good</h3>
<p>You are in a good position. Continue your <a href="/kilimanjaro-training-plan/">training programme</a> and choose a route with adequate acclimatization time (7-8 days). Focus on addressing any "Fair" or "Needs Work" areas.</p>

<h3>Overall Score: Mixed (Fair and Good)</h3>
<p>You are not quite ready but can get there with 8-12 weeks of focused training. Choose a longer route (8-9 days) for more gradual ascent and better acclimatization. Train specifically for your weak areas.</p>

<h3>Overall Score: Mostly Fair or Needs Work</h3>
<p>You need 12-16 weeks of dedicated training before booking. Consider starting with a lower-altitude trek (Mount Meru at 4,566m or Mount Kenya's Point Lenana at 4,985m) to build altitude experience, then return for Kilimanjaro. Read our full <a href="/kilimanjaro-training-plan/">12-week training plan</a> for a structured programme.</p>

<h2>Age and Fitness</h2>

<p>Age is not a barrier — fitness is. We have guided climbers in their 70s to the summit, and we have turned back 25-year-olds who were not physically prepared. The key difference is that <a href="/climbing-kilimanjaro-over-50/">older climbers</a> typically need more acclimatization time and a more gradual training ramp-up, but their mental resilience — the ability to push through discomfort without panicking — is often superior to younger climbers.</p>

<p>If you are over 50, we recommend:</p>
<ul>
<li>A longer route (8-9 days) for optimal acclimatization</li>
<li>Medical clearance from your doctor, including a stress test</li>
<li>A 16-week training programme rather than 12</li>
<li>Prior altitude experience if possible</li>
</ul>

<h2>When to Start Training</h2>

<table>
<thead>
<tr><th>Current Fitness Level</th><th>Minimum Training Lead Time</th><th>Recommended</th></tr>
</thead>
<tbody>
<tr><td>Already active (runs/hikes 3x/week)</td><td>8 weeks</td><td>12 weeks</td></tr>
<tr><td>Moderately active (exercises 1-2x/week)</td><td>12 weeks</td><td>16 weeks</td></tr>
<tr><td>Sedentary (little regular exercise)</td><td>16 weeks</td><td>20-24 weeks</td></tr>
</tbody>
</table>

<p>Start your <a href="/kilimanjaro-training-plan/">training programme</a> as early as possible. The fitter you are, the more you will enjoy the climb. Fitness does not guarantee summit success (altitude affects everyone differently), but it dramatically improves your odds and your experience.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Kilimanjaro harder than I think?</h3>
<p>For most people, yes. The altitude makes everything harder than training at sea level can simulate. The 12-16 hour summit night is the most physically and mentally demanding day most climbers have ever experienced. Being over-prepared is better than being under-prepared. Read our <a href="/how-hard-is-kilimanjaro/">difficulty guide</a> for a complete assessment.</p>

<h3>I run marathons — am I automatically ready?</h3>
<p>Running fitness helps but does not guarantee Kilimanjaro fitness. Marathons test cardiovascular endurance on flat terrain. Kilimanjaro tests sustained effort at altitude, on uneven terrain, over multiple consecutive days. Marathon runners often under-train for the specific demands. Add hiking with a weighted pack and altitude simulation if possible.</p>

<h3>Can I train without hills?</h3>
<p>Yes, but it is harder. A stair climber machine is the best flat-terrain substitute for hill walking. Treadmill incline (10-15%) with a weighted pack is also effective. If you live at sea level with no hills, consider a weekend training trip to mountainous terrain 4-6 weeks before your climb.</p>

<h3>Does prior altitude experience help?</h3>
<p>Enormously. If you have successfully been above 4,000m before, you know how your body responds to altitude. This knowledge — and the confidence it brings — is invaluable. If you have never been at altitude, consider <a href="/kilimanjaro-vs-mount-meru/">Mount Meru</a> (4,566m, 4 days) before Kilimanjaro as a test run.</p>

<h3>What if I fail the fitness tests?</h3>
<p>Failing is not permanent — it means you need more time. Every "Needs Work" score can become "Good" or "Excellent" with consistent training. Many of our most successful summiteers started from a low fitness base but gave themselves adequate time to prepare. The mountain will always be there — better to delay and prepare properly than to attempt prematurely.</p>

<h3>Should I see a doctor before climbing?</h3>
<p>Yes. We recommend a medical check-up including: blood pressure, resting heart rate, basic blood work, and a conversation about altitude risks. If you are over 50, have a pre-existing heart or lung condition, or take regular medication, a stress ECG is advisable. Your doctor should be aware that you will be sleeping at altitudes up to 4,800m and exerting yourself at up to 5,895m.</p>
`;

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

async function main() {
  console.log("Seeding 4 Kilimanjaro blog posts (batch 6)...\n");

  const p1 = await prisma.blogPost.upsert({
    where: { slug: "kilimanjaro-crater-camp" },
    create: {
      slug: "kilimanjaro-crater-camp",
      title: "Crater Camp: Sleeping at 5,729m Inside Kilimanjaro's Caldera",
      metaTitle: "Kilimanjaro Crater Camp: Sleep at 5,729m",
      metaDescription:
        "Crater Camp on Kilimanjaro at 5,729m — itinerary, requirements, what to expect, cost, and why sleeping inside the caldera next to Furtwängler Glacier is the ultimate mountain experience.",
      excerpt:
        "Crater Camp is Kilimanjaro's highest campsite at 5,729m, inside the volcanic caldera next to the Furtwängler Glacier. This guide covers the itinerary, physical requirements, what to expect, and how to add it to your climb.",
      content: post1Content.trim(),
      author: "Hamisi Mnaro",
      isPublished: true,
      publishedAt: new Date("2026-06-18"),
      featuredImage: FEATURED_IMAGE,
    },
    update: {
      title: "Crater Camp: Sleeping at 5,729m Inside Kilimanjaro's Caldera",
      metaTitle: "Kilimanjaro Crater Camp: Sleep at 5,729m",
      metaDescription:
        "Crater Camp on Kilimanjaro at 5,729m — itinerary, requirements, what to expect, cost, and why sleeping inside the caldera next to Furtwängler Glacier is the ultimate mountain experience.",
      excerpt:
        "Crater Camp is Kilimanjaro's highest campsite at 5,729m, inside the volcanic caldera next to the Furtwängler Glacier. This guide covers the itinerary, physical requirements, what to expect, and how to add it to your climb.",
      content: post1Content.trim(),
      author: "Hamisi Mnaro",
      featuredImage: FEATURED_IMAGE,
    },
  });
  console.log(`  [1/4] Upserted: "${p1.title}" (id: ${p1.id})`);

  const p2 = await prisma.blogPost.upsert({
    where: { slug: "kilimanjaro-full-moon-climb" },
    create: {
      slug: "kilimanjaro-full-moon-climb",
      title: "Full Moon Kilimanjaro Climb: How to Summit Under Moonlight",
      metaTitle: "Full Moon Kilimanjaro: Summit Night Under Moonlight",
      metaDescription:
        "Plan a full moon Kilimanjaro climb — 2026 full moon dates, how to calculate start dates, photography tips, crowd levels, and why moonlit summit nights are the most magical.",
      excerpt:
        "A full moon summit night transforms the Kilimanjaro experience. This guide covers 2026 full moon dates, how to plan your start date, photography tips, and why moonlit summits produce the most emotional climbs.",
      content: post2Content.trim(),
      author: "Hamisi Mnaro",
      isPublished: true,
      publishedAt: new Date("2026-06-18"),
      featuredImage: FEATURED_IMAGE,
    },
    update: {
      title: "Full Moon Kilimanjaro Climb: How to Summit Under Moonlight",
      metaTitle: "Full Moon Kilimanjaro: Summit Night Under Moonlight",
      metaDescription:
        "Plan a full moon Kilimanjaro climb — 2026 full moon dates, how to calculate start dates, photography tips, crowd levels, and why moonlit summit nights are the most magical.",
      excerpt:
        "A full moon summit night transforms the Kilimanjaro experience. This guide covers 2026 full moon dates, how to plan your start date, photography tips, and why moonlit summits produce the most emotional climbs.",
      content: post2Content.trim(),
      author: "Hamisi Mnaro",
      featuredImage: FEATURED_IMAGE,
    },
  });
  console.log(`  [2/4] Upserted: "${p2.title}" (id: ${p2.id})`);

  const p3 = await prisma.blogPost.upsert({
    where: { slug: "kilimanjaro-photography-guide" },
    create: {
      slug: "kilimanjaro-photography-guide",
      title: "Kilimanjaro Photography Guide: Capture the Mountain Like a Pro",
      metaTitle: "Kilimanjaro Photography: Complete Camera Guide",
      metaDescription:
        "Complete Kilimanjaro photography guide — gear, settings by climate zone, summit night tips, smartphone techniques, and how to protect your camera at extreme altitude.",
      excerpt:
        "How to photograph Kilimanjaro like a pro. Covers essential gear, camera settings for each climate zone, summit night techniques, smartphone tips, and gear protection in extreme cold and dust.",
      content: post3Content.trim(),
      author: "Hamisi Mnaro",
      isPublished: true,
      publishedAt: new Date("2026-06-18"),
      featuredImage: FEATURED_IMAGE,
    },
    update: {
      title: "Kilimanjaro Photography Guide: Capture the Mountain Like a Pro",
      metaTitle: "Kilimanjaro Photography: Complete Camera Guide",
      metaDescription:
        "Complete Kilimanjaro photography guide — gear, settings by climate zone, summit night tips, smartphone techniques, and how to protect your camera at extreme altitude.",
      excerpt:
        "How to photograph Kilimanjaro like a pro. Covers essential gear, camera settings for each climate zone, summit night techniques, smartphone tips, and gear protection in extreme cold and dust.",
      content: post3Content.trim(),
      author: "Hamisi Mnaro",
      featuredImage: FEATURED_IMAGE,
    },
  });
  console.log(`  [3/4] Upserted: "${p3.title}" (id: ${p3.id})`);

  const p4 = await prisma.blogPost.upsert({
    where: { slug: "kilimanjaro-fitness-test" },
    create: {
      slug: "kilimanjaro-fitness-test",
      title: "Kilimanjaro Fitness Test: Are You Ready to Climb?",
      metaTitle: "Kilimanjaro Fitness Test: 6 Tests Before You Climb",
      metaDescription:
        "Take our 6-part Kilimanjaro fitness test — stair endurance, long walk, core strength, leg power, recovery, and mental grit. Know if you're ready before you book.",
      excerpt:
        "Are you fit enough to climb Kilimanjaro? Our 6-test fitness assessment covers stair endurance, long walk capacity, core strength, leg power, recovery, and mental endurance. Take it before you book.",
      content: post4Content.trim(),
      author: "Hamisi Mnaro",
      isPublished: true,
      publishedAt: new Date("2026-06-18"),
      featuredImage: FEATURED_IMAGE,
    },
    update: {
      title: "Kilimanjaro Fitness Test: Are You Ready to Climb?",
      metaTitle: "Kilimanjaro Fitness Test: 6 Tests Before You Climb",
      metaDescription:
        "Take our 6-part Kilimanjaro fitness test — stair endurance, long walk, core strength, leg power, recovery, and mental grit. Know if you're ready before you book.",
      excerpt:
        "Are you fit enough to climb Kilimanjaro? Our 6-test fitness assessment covers stair endurance, long walk capacity, core strength, leg power, recovery, and mental endurance. Take it before you book.",
      content: post4Content.trim(),
      author: "Hamisi Mnaro",
      featuredImage: FEATURED_IMAGE,
    },
  });
  console.log(`  [4/4] Upserted: "${p4.title}" (id: ${p4.id})`);

  console.log("\nAll 4 blog posts seeded successfully.");
  console.log("  /kilimanjaro-crater-camp/");
  console.log("  /kilimanjaro-full-moon-climb/");
  console.log("  /kilimanjaro-photography-guide/");
  console.log("  /kilimanjaro-fitness-test/");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
