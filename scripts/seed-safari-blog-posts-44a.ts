import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const balloonSafariContent = `
<p>There's a moment — maybe thirty seconds after the burner goes quiet for the first time — when you realise you're floating above the Serengeti in complete silence. No engine noise. No tyres on dirt. Just the sound of wind brushing past the basket and, far below, the faint calls of wildebeest drifting across the plains. We've been sending guests up in Serengeti balloons for over a decade, and every single one comes back saying the same thing: it was the highlight of the entire trip.</p>

<h2>What Exactly Is a Serengeti Balloon Safari?</h2>

<p>A balloon safari is a one-hour hot air balloon flight over the Serengeti, launched before dawn and ending with a champagne bush breakfast in the middle of the savanna. It's been operating since 1991 when Serengeti Balloon Safaris became the first — and for years the only — operator licensed to fly over the park. Today, a handful of operators run flights from different launch sites across the Serengeti, but the experience follows the same format everywhere.</p>
<p>This isn't a sightseeing gimmick bolted onto a safari itinerary. It's a fundamentally different way of experiencing the Serengeti — one that reveals the scale and beauty of this ecosystem in a way that no game drive ever can. From 300 metres up, the Serengeti stops being a series of individual animal sightings and becomes what it actually is: one of the largest intact savanna ecosystems on Earth, stretching to the horizon in every direction.</p>

<h2>The Experience: Hour by Hour</h2>

<h3>Pre-Dawn Pickup (4:30–5:00 AM)</h3>
<p>Your lodge or camp arranges a pre-dawn transfer to the launch site. This means waking up around 4:00 AM — earlier than a standard game drive. The drive to the launch site takes 15–45 minutes depending on your accommodation's location. You'll arrive in the dark, and the crew will already be inflating the balloon with cold air from powerful fans, then heating it with the burner. The balloon laid out on the ground, slowly taking shape against a sky turning from black to deep blue — it's theatrical even before you're airborne.</p>

<h3>Safety Briefing (5:15–5:45 AM)</h3>
<p>The pilot — called a captain in balloon terminology — runs a mandatory safety briefing. This covers the landing position (knees bent, back against the padded compartment wall, hands gripping the rope handles), what to expect during the flight, and emergency procedures. The briefing is straightforward and takes about 10 minutes. The captain typically has 1,000+ flight hours over the Serengeti. These are experienced pilots who know the wind patterns, the terrain, and the wildlife movement below.</p>

<h3>Liftoff (5:30–6:00 AM)</h3>
<p>You climb into the basket — a standard 16-passenger design divided into four compartments of four people each. The basket is sturdy wicker reinforced with steel cables, and each compartment has padded walls and rope handles. You stand throughout the flight, which is more comfortable than it sounds — the basket rim hits at about chest height, giving you a natural leaning point and an unobstructed view.</p>
<p>Liftoff is gentle. There's no runway, no acceleration, no jolt. The ground simply drops away. One moment you're standing in the Serengeti grass; the next, you're rising above the acacia canopy. The timing is deliberate — launching at dawn catches the stable morning air before thermals build, and it means you're airborne for sunrise.</p>

<h3>The Flight (1 Hour)</h3>
<p>The balloon covers 10–20 kilometres depending on wind speed and direction. The captain controls altitude by adjusting the burner — more heat means ascent, letting air cool means descent. There's no steering in the traditional sense; the balloon goes where the wind takes it. Experienced captains exploit different wind directions at different altitudes to navigate roughly toward the desired landing area.</p>
<p>Flight altitude varies intentionally. The captain will take you up to 300–400 metres for panoramic views of the plains stretching to the horizon, then drop down to treetop level — sometimes just 5–10 metres above the ground — for close wildlife viewing. At low altitude, you're close enough to see individual animals clearly, and because there's no engine noise (the burner fires intermittently, not continuously), animals below are remarkably unbothered. We've seen elephants continue feeding, lions barely glance up, and giraffes maintain their stride as the balloon drifts silently overhead.</p>

<h3>Sunrise Over the Serengeti</h3>
<p>This is the moment. About 15–20 minutes into the flight, the sun breaks the eastern horizon. The Serengeti turns gold. Every blade of grass, every acacia tree, every animal casts a long shadow across the plains. From altitude, the light transforms the landscape into something that looks more like a painting than reality. Photographers live for this window — the warm, directional light lasts about 30 minutes before the sun climbs too high.</p>

<h3>Landing (6:30–7:00 AM)</h3>
<p>Landings are controlled but not always smooth. The captain selects a clear area of savanna, and the basket may drag along the ground for a few metres before stopping — this is normal and why you're briefed on the landing position. Wear closed-toe shoes (not sandals) and secure loose items. The ground crew follows the balloon in chase vehicles and arrives within minutes of touchdown to assist passengers out of the basket.</p>

<h3>Champagne Bush Breakfast (7:00–9:00 AM)</h3>
<p>After landing, the crew sets up a full bush breakfast in the middle of the savanna. White linen tablecloths. Proper silverware. Champagne (or sparkling wine, depending on the operator). A hot breakfast — eggs, sausages, fresh fruit, pastries, tea and coffee. You're sitting in camping chairs in the open savanna, sometimes with animals visible in the distance, toasting with champagne while the morning light is still golden. It's deliberately extravagant, and it works.</p>
<p>After breakfast, you're driven back to your lodge or camp, arriving by 10:00–11:00 AM — early enough to rest before an afternoon game drive. The balloon safari fills the morning without consuming the entire day.</p>

<h2>What You'll See from Above</h2>

<h3>During Migration Season (July–October)</h3>
<p>If your balloon flight coincides with the <a href="/serengeti-great-migration-guide/">Great Migration</a> in the northern or central Serengeti, the aerial perspective is transformative. From the ground, a herd of wildebeest stretches across your field of vision. From 300 metres up, you see the true scale — thousands upon thousands of animals moving in columns that stretch to the horizon, following routes etched into the landscape by millions of hooves over millions of years. It's a view that no game drive, no documentary, and no photograph fully captures. The sheer biomass visible from altitude during peak migration is one of the most extraordinary natural spectacles on the planet.</p>

<h3>Year-Round Wildlife</h3>
<p>Even outside migration season, the aerial view reveals what's invisible from ground level:</p>
<ul>
<li><strong>Hippo pools:</strong> From above, you can see hippos packed into river bends and pools — sometimes dozens in a single cluster, their barrel shapes clearly visible in the water.</li>
<li><strong>Elephant herds:</strong> Family groups moving across the plains, their shadows stretching beside them in the morning light. The matriarch's path is visible — a line through the grass that the rest of the herd follows precisely.</li>
<li><strong>Giraffe towers:</strong> Groups of giraffe are surprisingly hard to spot from ground level when they're in woodland. From above, their patterned necks moving through the acacia canopy are unmistakable.</li>
<li><strong>Predators at rest:</strong> Lions and leopards that would be invisible in thick bush from a vehicle are sometimes spotted from the balloon, their tawny shapes contrasting against green vegetation or rock outcrops. Animals are often more relaxed when approached from above — no vibration from an engine, no dust, just a silent shape passing overhead.</li>
<li><strong>Landscape patterns:</strong> Animal trails converging on water sources, termite mounds dotting the plains in geometric patterns, the serpentine paths of seasonal rivers — the Serengeti's infrastructure, built by nature over millennia, is readable only from altitude.</li>
</ul>

<h2>Operators and Booking</h2>

<h3>Serengeti Balloon Safaris</h3>
<p>The original operator, running since 1991. They have the longest track record and the most experienced pilot roster. Launch sites in the Seronera area (central Serengeti — year-round operations) and seasonal operations from other locations. They're the most established name and the one your lodge will likely recommend first.</p>

<h3>Miracle Experience</h3>
<p>A newer operator that has built a strong reputation. They operate from the central Serengeti and occasionally from the northern corridor during migration season. Competitive pricing and good service. They've become a legitimate alternative to Serengeti Balloon Safaris.</p>

<h3>Other Operators</h3>
<p>Several smaller operators have entered the market in recent years. Quality varies. We recommend sticking with established operators who have a documented safety record and experienced pilots. Your safari operator (that's us, if you're booking through <a href="/tanzania-safaris/">Snow Africa Adventure</a>) will recommend the best option based on your itinerary and camp location.</p>

<h3>Pricing</h3>
<p>A Serengeti balloon safari costs $500–$600 per person. This price has been remarkably stable for years and is consistent across operators. The price includes:</p>
<ul>
<li>Pre-dawn transfer from your lodge or camp to the launch site</li>
<li>Safety briefing and one-hour balloon flight</li>
<li>Champagne bush breakfast after landing</li>
<li>Return transfer to your lodge (arriving by 10:00–11:00 AM)</li>
</ul>
<p>What's not included: park fees (you're already paying those as part of your safari), tips for the balloon crew ($10–$20 per person is customary), and any personal expenses.</p>

<h3>How to Book</h3>
<p>Book through your safari operator when you're planning your itinerary — not independently. We coordinate with the balloon operators to ensure your pickup time, flight, and return align with your game drive schedule. Availability is limited to 1–2 flights per day (maximum 32 passengers per flight on the standard 2-balloon operation), and flights sell out during peak season.</p>
<p>For <a href="/best-time-safari-tanzania/">July–October departures</a>, book your balloon flight at least 2–3 months in advance. During shoulder season (June, November–December), 2–4 weeks is usually sufficient. Green season (March–May) rarely sells out — but flights are also most likely to be cancelled due to weather.</p>

<h2>Best Time for a Balloon Safari</h2>

<h3>Peak Migration (July–October)</h3>
<p>The best time if you want the migration from the air. The northern Serengeti (Kogatende area) has seasonal balloon operations specifically for migration viewing. Central Serengeti flights run year-round and catch the herds when they pass through. This is peak demand — book early.</p>

<h3>Calving Season (January–March)</h3>
<p>The southern Serengeti during calving season offers a different aerial spectacle — hundreds of thousands of wildebeest on the short-grass plains with newborn calves, predators actively hunting, and the Ngorongoro highlands as a dramatic backdrop. Some operators run seasonal flights from the Ndutu area during this period.</p>

<h3>Green Season (April–May)</h3>
<p>Lower prices, fewer passengers per flight (sometimes you'll share the basket with only 4–6 others instead of 16), and the landscape is lush green after the rains. The downside: April and May have the highest cancellation rates due to weather. Rain, low cloud, and strong winds all ground balloons. If your flight is cancelled, you get a full refund, but you don't get that morning back.</p>

<h3>Dry Season Outside Migration (June, November–December)</h3>
<p>Reliable flying weather, moderate demand, and excellent general wildlife viewing. The landscape is golden-brown in the dry season, which photographs beautifully from the air. This is arguably the best balance of conditions, price, and availability.</p>

<h2>Launch Sites</h2>

<h3>Central Serengeti (Seronera Area)</h3>
<p>The primary year-round launch site. Located in the heart of the Serengeti with the highest resident wildlife concentration outside migration season. If you're staying at Seronera, any of the central Serengeti lodges, or camps along the Grumeti River, this is your launch site. Driving distance from most central Serengeti accommodation is 15–30 minutes.</p>

<h3>Northern Serengeti (Kogatende)</h3>
<p>Seasonal operations during migration (typically August–November). This launch site puts you over the Mara River crossing areas — if herds are crossing during your flight, it's an experience that defies description. Limited capacity and high demand make this the hardest flight to book.</p>

<h3>Western Corridor</h3>
<p>Some operators run flights from the western Serengeti (June–July) when the migration herds pass through en route to the northern plains. Less established than the central and northern sites, but growing in popularity.</p>

<h2>What to Wear and Bring</h2>

<h3>Clothing</h3>
<p>Layer. At 4:30 AM in the Serengeti, temperatures can be 10–15°C. By the time breakfast ends at 9:00 AM, it's 25–30°C. Wear a warm fleece or jacket that you can remove and stow in the basket. Long trousers (not shorts — the basket edge can chafe during landing). Closed-toe shoes are mandatory, not optional. The landing can be bumpy, and you need ankle support. A hat and sunglasses for after sunrise.</p>

<h3>Photography Gear</h3>
<p>This is one of the best <a href="/photography-safari-tanzania/">photography experiences in Tanzania</a>, but it requires the right approach:</p>
<ul>
<li><strong>Wide-angle lens:</strong> Essential. A 16–35mm or 24–70mm captures the scale of the landscape and the basket-in-frame shots that tell the story. A telephoto is less useful — you're shooting landscapes and herds, not individual animal portraits.</li>
<li><strong>Fast shutter speed:</strong> The basket is stable but the burner creates vibration when it fires. Use 1/500s or faster to compensate. Bump your ISO if needed — modern cameras handle ISO 1600 cleanly.</li>
<li><strong>GoPro or action camera:</strong> Mount it on the basket edge for a continuous time-lapse of the entire flight. This produces stunning footage with zero effort. Bring a clamp mount or adhesive mount.</li>
<li><strong>Smartphone:</strong> Perfectly adequate for video. The wide-angle lens on modern smartphones captures the panoramic views well. Shoot in 4K if your phone supports it.</li>
<li><strong>Secure your gear:</strong> Attach camera straps and use wrist lanyards. A dropped camera from 300 metres is gone forever — and potentially dangerous to wildlife below.</li>
</ul>

<h2>Is It Worth $500+?</h2>

<p>In our honest opinion — and we have no financial incentive beyond wanting our guests to have the best possible trip — absolutely yes. It's one of those once-in-a-lifetime experiences that actually delivers on the promise.</p>
<p>The silence. The scale. The light. The absurdity of drinking champagne in the middle of the Serengeti at 8:00 AM while a herd of zebra grazes 200 metres away. Guests consistently rate the balloon safari as the single highlight of their entire Tanzania trip — above the crater, above the migration, above everything. We've never had a guest come back disappointed.</p>
<p>The <a href="/tanzania-safari-cost/">cost relative to your overall safari investment</a> is modest. If you're spending $3,000–$5,000 on a 5–7 day safari, the balloon adds 10–15% to your total budget for what most guests consider the best single experience of the trip. By that calculus, it's the highest-return $500 you'll spend.</p>

<h3>Alternatives for Budget-Conscious Travellers</h3>
<p>There are no cheap alternatives in the Serengeti. No helicopter tours, no small-plane scenic flights, no half-price balloon options. If $500+ is genuinely outside your budget, don't feel bad about skipping it — the Serengeti is extraordinary from ground level. A sunrise game drive to a scenic kopje (rocky outcrop) is included in your safari at no extra cost, and watching the sun rise over the plains from a kopje with your morning coffee is spectacular in its own right. It's not the same as the balloon — nothing is — but it's still a moment you'll remember.</p>

<h2>Safety</h2>
<p>Commercial balloon operations in the Serengeti have an excellent safety record. Balloons are inspected regularly, pilots are certified with hundreds or thousands of flight hours, and flights are cancelled proactively when weather conditions are marginal. The main risks are rough landings (minor bruising — follow the landing position instructions and you'll be fine) and weather-related cancellations (frustrating but the right call).</p>
<p>Passengers with mobility issues should discuss their situation with the operator in advance. You need to be able to climb into and out of the basket (a moderate physical effort) and adopt the landing position (seated with knees bent). Most operators can accommodate reasonable mobility limitations with advance notice.</p>

<h2>Frequently Asked Questions</h2>
<div itemscope itemtype="https://schema.org/FAQPage">

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a Serengeti balloon safari cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A Serengeti balloon safari costs $500–$600 per person. The price includes pre-dawn transfer from your lodge, a one-hour balloon flight, champagne bush breakfast after landing, and return transfer to your camp. This price is consistent across operators and has been stable for several years.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How long is a Serengeti balloon flight?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">The balloon flight itself lasts approximately one hour, covering 10–20 km depending on wind conditions. The entire experience — from pre-dawn pickup to return to your lodge — takes about 5–6 hours (4:30 AM departure, back by 10:00–11:00 AM).</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the best time of year for a Serengeti balloon safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">July–October is best for combining the balloon with Great Migration viewing. January–March catches calving season from the air. June and November–December offer reliable weather with moderate demand. April–May has the highest cancellation risk due to rain but the lowest prices and fewest passengers.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is a Serengeti balloon safari safe?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes. Commercial balloon operations in the Serengeti have an excellent safety record. Pilots typically have 1,000+ flight hours, balloons are regularly inspected, and flights are proactively cancelled in marginal weather. The main risk is a bumpy landing, which is managed through the pre-flight safety briefing and landing position instructions.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How far in advance should I book a Serengeti balloon safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">For peak season (July–October), book 2–3 months in advance — flights are limited to 1–2 per day and sell out. Shoulder season (June, November–December) needs 2–4 weeks. Green season (March–May) rarely sells out but has the highest weather cancellation risk.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What happens if my balloon safari is cancelled due to weather?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">You receive a full refund if your flight is cancelled due to weather (rain, low cloud, strong winds). The decision is made at the launch site on the morning of the flight. April–May has the highest cancellation rate. If possible, schedule your balloon for the earlier part of your Serengeti stay so there's time to rebook if cancelled.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What should I wear on a Serengeti balloon safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Dress in layers — it's cold at dawn (10–15°C) and warm by breakfast (25–30°C). Wear a fleece or jacket, long trousers, and closed-toe shoes (mandatory — the landing can be bumpy). Bring a hat and sunglasses for after sunrise. Avoid loose scarves or items that could catch on the basket.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can children go on a Serengeti balloon safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Most operators set a minimum age of 7–8 years. Children must be tall enough to see over the basket rim and strong enough to adopt the landing position. Children under 16 must be accompanied by a paying adult. Check with your specific operator for their age policy.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What camera gear should I bring on a balloon safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Bring a wide-angle lens (16–35mm or 24–70mm) rather than a telephoto — you're shooting landscapes and herds, not individual animals. Use fast shutter speeds (1/500s+) to compensate for burner vibration. A GoPro on a clamp mount produces excellent time-lapse footage. Smartphones work well for video. Always use a camera strap or wrist lanyard.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How many people are in the balloon basket?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Standard baskets hold 16 passengers divided into four compartments of four people each. During low season, you may share the basket with fewer passengers. Private balloon flights exist but at significantly higher cost. The compartment design means each group of four has its own section with unobstructed views.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Will I see the Great Migration from the balloon?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">If your flight is during migration season (July–October in the northern Serengeti, June–July in the western corridor, January–March in the southern Serengeti) and the herds are in range of your launch site, yes — the aerial view of the migration is one of the most spectacular sights in nature. Outside migration season, you'll see resident wildlife including elephants, giraffes, hippos, and predators.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is the Serengeti balloon safari worth the money?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">In our experience, overwhelmingly yes. Guests consistently rate it as the single highlight of their entire Tanzania trip. At $500–$600, it adds 10–15% to a typical safari budget for what most travellers consider the best individual experience of their trip. The silence, the scale of the landscape at sunrise, and the champagne breakfast in the savanna create a memory that justifies the cost.</p>
</div>
</div>

</div>
`;

const groupSafariContent = `
<p>We'll be honest upfront: as a safari operator based in Moshi, we run both private safaris and group joining safaris. We make more money on private bookings. But we'd be doing you a disservice if we didn't tell you that a group joining safari is one of the best ways to experience Tanzania's wildlife — especially if you're travelling solo, on a budget, or simply enjoy meeting people from around the world. Here's everything you need to know.</p>

<h2>What Is a Group Joining Safari?</h2>

<p>A group joining safari — also called a shared safari, budget joining safari, or seat-in-vehicle safari — is exactly what it sounds like. Instead of booking an entire vehicle for your private party ($300–$500 per day for the vehicle alone), you book a single seat in a shared vehicle with other travellers. You're grouped with 3–5 other people heading to the same parks on the same dates, sharing the vehicle, guide, accommodation, and meals.</p>
<p>The travellers in your vehicle might be from Germany, Australia, Japan, Brazil, Canada, or anywhere else. They booked independently, just like you. The operator groups everyone together based on dates and itinerary. You share the cost of the vehicle, the guide, and the infrastructure — which is why it's dramatically cheaper than going private.</p>
<p>This is the standard way that budget-conscious travellers, solo adventurers, and backpackers experience <a href="/tanzania-safaris/">Tanzania's national parks</a>. It's also how many first-time safari visitors discover that the social aspect — sharing sundowner drinks with a stranger from Copenhagen while a herd of elephants crosses in front of your vehicle — is one of the best parts of the whole experience.</p>

<h2>How Group Joining Safaris Work</h2>

<h3>The Booking Process</h3>
<p>Operators set fixed departure dates for group joining safaris. During peak season (July–October), most operators run daily departures on popular itineraries. During shoulder season (June, November–December), departures run 3–5 times per week. In low season (March–May), expect 2–3 departures per week for standard itineraries.</p>
<p>You book a seat — not a vehicle. You choose your dates, your itinerary length (3, 4, 5, or 7 days are the most common options), and your accommodation level (camping or lodge). The operator confirms your seat and groups you with other travellers on the same departure.</p>
<p>Most operators guarantee departures with a minimum of 2 passengers. If only you and one other person book, the safari still runs. If you're the only person booked and the operator can't find others, they'll either move you to the nearest departure date with other passengers (with your agreement) or run the safari as a private trip at no extra charge — though this varies by operator.</p>

<h3>The Vehicle</h3>
<p>Standard group joining safaris use Toyota Land Cruisers or extended safari vans (Toyota HiAce conversions with pop-up roofs). Land Cruisers seat 4–6 passengers; safari vans seat 6–8. The seating arrangement matters — whoever sits in the middle of a three-person row has compromised views and photography angles. Reputable operators cap vehicles at 6 passengers maximum to ensure everyone has a window seat.</p>
<p>We cap our group joining vehicles at 6 passengers in a Land Cruiser (2 per row, 3 rows) so that every seat is a window seat. Some budget operators squeeze 7–8 passengers into a van. Ask before you book.</p>

<h3>Your Guide</h3>
<p>You share the guide with your group. This is the same TATO-certified, professionally trained guide you'd get on a private safari — the guide quality doesn't drop because it's a group departure. Your guide drives, spots wildlife, explains animal behaviour, handles logistics, and navigates between parks. The difference from a private safari is that the guide must balance the interests of 4–6 people instead of tailoring the day to a single party.</p>

<h3>Set Itineraries</h3>
<p>Group joining safaris follow fixed routes. The most common options on Tanzania's northern circuit:</p>
<ul>
<li><strong>3-day safari:</strong> Tarangire → Ngorongoro Crater. Quick but covers two of Tanzania's best parks.</li>
<li><strong>4-day safari:</strong> Tarangire → Serengeti → Ngorongoro. The classic northern circuit loop. This is the most popular group joining itinerary — it covers the three essential parks in a tight but manageable schedule.</li>
<li><strong>5-day safari:</strong> Lake Manyara → Serengeti (2 nights) → Ngorongoro. More time in the Serengeti means better wildlife odds and less rushing. This is our recommended minimum for a satisfying experience.</li>
<li><strong>7-day safari:</strong> Lake Manyara → Serengeti (3 nights) → Ngorongoro → Tarangire. The full circuit. Three nights in the Serengeti lets you explore different zones — central, northern, and western — and dramatically increases your chances of exceptional sightings.</li>
</ul>
<p>You can't customise the itinerary. If the group is heading to the Serengeti today, that's where you're going — even if yesterday's guide radio mentioned a leopard with cubs in Tarangire. This inflexibility is the primary trade-off for the lower price. For most travellers, the set itineraries are well-designed and hit the right parks in the right order. See our <a href="/tanzania-safari-itinerary/">detailed itinerary options</a>.</p>

<h2>Cost Comparison: Group vs Private</h2>

<p>This is the core reason group joining safaris exist. The savings are substantial:</p>

<h3>Group Joining Safari Costs</h3>
<ul>
<li><strong>3-day group joining (camping):</strong> $600–$800 per person</li>
<li><strong>4-day group joining (camping):</strong> $800–$1,200 per person</li>
<li><strong>5-day group joining (camping):</strong> $1,100–$1,500 per person</li>
<li><strong>7-day group joining (camping):</strong> $1,600–$2,200 per person</li>
<li><strong>Per-day average:</strong> $150–$250 per person per day (all-inclusive)</li>
</ul>

<h3>Private Safari Costs</h3>
<ul>
<li><strong>3-day private (camping):</strong> $1,200–$1,800 per person (for 2 people sharing)</li>
<li><strong>4-day private (camping):</strong> $1,500–$2,500 per person</li>
<li><strong>5-day private (camping):</strong> $2,000–$3,200 per person</li>
<li><strong>7-day private (camping):</strong> $3,000–$4,500 per person</li>
<li><strong>Per-day average:</strong> $300–$500 per person per day (all-inclusive)</li>
</ul>

<p>That's a 40–60% saving on a group joining safari compared to private. On a 5-day safari, you're saving $800–$1,700 per person. For a couple, that's $1,600–$3,400 saved — enough to add a Zanzibar beach extension or a <a href="/balloon-safari-serengeti/">Serengeti balloon safari</a> to your trip. The full <a href="/tanzania-safari-cost/">cost breakdown is in our pricing guide</a>.</p>

<h3>What's Included</h3>
<ul>
<li>Safari vehicle with professional guide/driver</li>
<li>All national park and conservation area fees</li>
<li>Accommodation (camping or lodges, depending on your booking)</li>
<li>All meals (breakfast, lunch, dinner) and drinking water</li>
<li>Airport/hotel pickup and drop-off in Arusha or Moshi</li>
</ul>

<h3>What's NOT Included</h3>
<ul>
<li>Tips for guide and camp staff ($15–$20 per day total is customary)</li>
<li>Drinks beyond water (soft drinks, beer, wine)</li>
<li>Personal expenses (souvenirs, laundry)</li>
<li>Travel insurance (mandatory — buy before you arrive)</li>
<li>International flights to Tanzania</li>
<li>Optional activities (balloon safari, walking safari, night drive)</li>
</ul>

<h2>Accommodation on Group Joining Safaris</h2>

<h3>Budget Camping (Standard Group Joining)</h3>
<p>The default accommodation for group joining safaris. You stay in designated public campsites inside or adjacent to the national parks. The operator provides tents (usually 2-person dome tents), sleeping bags or blankets, foam mattresses, and a cook who prepares all meals at the campsite. Facilities are basic: shared toilets (pit latrines or flush toilets depending on the campsite), shared cold-water showers (some campsites have solar-heated water), and communal cooking areas.</p>
<p>This isn't glamping. It's proper camping — close to the ground, close to the sounds of the bush at night (hyenas whooping, hippos grunting, lions distant-roaring). For many guests, the camping experience is as memorable as the game drives. For others, it's a compromise they tolerate for the price savings.</p>

<h3>Mid-Range Group Joining (Lodge-Based)</h3>
<p>Some operators — including us — offer lodge-based group joining safaris at a higher price point. Instead of camping, you stay in mid-range lodges or permanent tented camps with en-suite bathrooms, hot water, proper beds, and restaurant dining. Prices are typically $50–$100 per person per day more than the camping option. This gives you the social and cost benefits of group joining without the basic-camping trade-off.</p>

<h2>Pros and Cons: Honest Assessment</h2>

<h3>The Genuine Pros</h3>
<ul>
<li><strong>Significantly cheaper:</strong> 40–60% less than private safari. This isn't a marginal saving — it's the difference between affording a safari and not.</li>
<li><strong>Social experience:</strong> You'll meet travellers from around the world. We've seen friendships form on group safaris that last years — people who met in a Land Cruiser in the Serengeti and later attended each other's weddings. The shared experience of seeing your first lion or witnessing a river crossing creates a bond.</li>
<li><strong>No minimum group size stress:</strong> Reputable operators guarantee departures. You book your seat and show up. You don't need to recruit friends or worry about the trip being cancelled because you're only two people.</li>
<li><strong>Proven itineraries:</strong> The routes are optimised from years of running them. The guide knows exactly where to stop for the best viewpoints, which camp has the best showers, and which route avoids the worst road conditions.</li>
<li><strong>Solo-traveller friendly:</strong> If you're a <a href="/solo-safari-tanzania/">solo traveller</a>, group joining eliminates the dreaded single-supplement charge that private safari operators add (typically 20–30% on top). You share a tent or room with another same-gender solo traveller, or pay a small single-supplement ($20–$30/night) for your own tent.</li>
</ul>

<h3>The Honest Cons</h3>
<ul>
<li><strong>Less flexibility:</strong> If you want to spend an extra 30 minutes watching a leopard, but the rest of the group is ready to move on, the guide makes a judgment call — and it usually means moving on. On a private safari, you sit there as long as you want.</li>
<li><strong>Fixed schedule:</strong> Departure times, meal times, and park-to-park transit are set. You can't sleep in and skip the morning drive. You can't extend your Serengeti stay by a day because the sightings are exceptional.</li>
<li><strong>Vehicle might be full:</strong> Six people in a vehicle means compromised photography angles and less space to spread out. If you're a serious photographer, this is a real limitation — you can't always get the angle you need because someone's head is in the way.</li>
<li><strong>Personality dynamics:</strong> Most groups gel naturally — people who choose a Tanzania safari tend to share similar interests and attitudes. But occasionally you get a personality clash. The guest who complains about everything, the couple who argues loudly, the photographer who blocks the window for 20 minutes at every sighting. It's rare, but it happens, and there's no escape for 4–7 days. Your guide manages these situations, but they can't fix fundamental incompatibility.</li>
<li><strong>Usually budget accommodation:</strong> Standard group joining means camping. If you want luxury lodges, group joining options are limited — most are camping or basic-to-mid-range lodges.</li>
</ul>

<h2>Who Should Book a Group Joining Safari</h2>

<ul>
<li><strong>Solo travellers:</strong> The best option if you're travelling alone. No single supplement, social company, and shared costs. Many of our solo guests tell us the group safari was the best decision of their trip.</li>
<li><strong>Backpackers and students:</strong> If you're travelling East Africa on a budget, a group joining safari is how you experience the Serengeti without breaking your budget. At $150–$250/day all-inclusive, it's the most affordable way to do it properly.</li>
<li><strong>Budget-conscious travellers of any age:</strong> You don't have to be 22 and carrying a rucksack. We've had retired couples, families, and mid-career professionals on group joining safaris who simply preferred to spend their money on experiences rather than paying a premium for a private vehicle.</li>
<li><strong>Social travellers:</strong> If you genuinely enjoy meeting new people and don't mind compromise, group joining delivers an experience that private safari can't — the camaraderie of a shared adventure.</li>
</ul>

<h2>Who Should Book Private Instead</h2>

<ul>
<li><strong>Families with young children:</strong> Kids under 8 change the dynamic of a group vehicle. They need bathroom stops, get restless during long drives, and may disrupt other guests' experience. A private vehicle lets you go at your family's pace.</li>
<li><strong>Serious photographers:</strong> If photography is the primary purpose of your safari, you need control — control over the vehicle position, the duration at each sighting, and the angle. Group safaris compromise all three. Consider our <a href="/photography-safari-tanzania/">photography-focused private safaris</a> instead.</li>
<li><strong>Elderly travellers prioritising comfort:</strong> Long days in a shared vehicle, basic camping, and early starts are manageable but uncomfortable for some older travellers. A private safari with lodge accommodation and flexible scheduling is worth the premium.</li>
<li><strong>Honeymooners:</strong> You're celebrating something intimate. Sharing that with four strangers in a tent camp doesn't fit the occasion. Book private with luxury lodges.</li>
<li><strong>Travellers with specific interests:</strong> Birding enthusiasts who want to stop at every wetland, or guests who want walking safaris and night drives (not available on standard group itineraries), need the flexibility that only a private booking provides.</li>
</ul>

<h2>How to Book: Smart and Safe</h2>

<h3>Book Directly with Local Operators</h3>
<p>The best prices come from booking directly with a reputable local operator based in Arusha or Moshi. No middleman markup, direct communication, and the ability to ask detailed questions about vehicles, guides, and itineraries. We run group departures on the 3, 5, and 7-day northern circuit itineraries with guaranteed departures — <a href="/tanzania-safaris/">see our options</a>.</p>

<h3>Booking Platforms</h3>
<p>SafariBookings, TourRadar, and GetYourGuide aggregate multiple operators and allow you to compare reviews and prices. Prices are typically 10–20% higher than booking direct (the platform takes a commission), but the review system helps you filter out unreliable operators. If you're uncomfortable booking directly with a company in Tanzania, platforms offer an additional layer of accountability.</p>

<h3>Red Flags: When to Walk Away</h3>
<ul>
<li><strong>Prices below $120/day all-inclusive:</strong> This is unsustainable. Park fees alone for the Serengeti are $82/person/day. Add vehicle fuel, guide salary, food, and accommodation — the maths doesn't work below $120/day. Operators charging this will cut corners: old vehicles, unregistered guides, skipping parks to save on fees, or adding hidden charges after arrival.</li>
<li><strong>No TATO registration:</strong> The Tanzania Association of Tour Operators requires minimum standards — insurance, vehicle maintenance, licensed guides. If an operator isn't a TATO member, they're operating outside the regulatory framework. Ask for their TATO number.</li>
<li><strong>No online reviews:</strong> Any legitimate operator running group safaris has reviews on TripAdvisor, Google, or SafariBookings. Zero reviews means either a brand-new operation (risky) or one that's been operating below the radar (riskier).</li>
<li><strong>Full payment via Western Union or wire transfer:</strong> Reputable operators accept credit cards, PayPal, or bank transfers with clear invoicing. Western Union payment to an individual (not a registered company) is a scam indicator. A deposit (30–50%) is normal; demanding 100% upfront via untraceable channels is not.</li>
<li><strong>Vague inclusions:</strong> If the quote says "all-inclusive" but the operator can't itemise exactly what's included (park fees, meals, accommodation type, vehicle type, number of game drives per day), the "inclusive" part will shrink once you arrive.</li>
</ul>

<h3>Hotel and Airport Touts</h3>
<p>If you arrive at Kilimanjaro International Airport or Arusha and someone approaches you offering a "special deal" on a safari departing tomorrow, be cautious. Some touts represent legitimate operators, but many are freelancers who will pass you to the cheapest available operator for a commission — regardless of quality. Book before you arrive. If you absolutely must book last-minute in Arusha, visit the TATO office or walk into the office of a recommended operator during business hours — don't book through someone who approaches you on the street.</p>

<h2>Our Group Joining Options</h2>

<p>At Snow Africa Adventure, we run group departures on the northern circuit with guaranteed departures year-round:</p>
<ul>
<li><strong>3-day Tarangire and Ngorongoro:</strong> Departures 4–5 times per week. Perfect for travellers with limited time.</li>
<li><strong>5-day Northern Circuit:</strong> Lake Manyara → Serengeti (2 nights) → Ngorongoro. Departures 3–4 times per week. Our most popular group joining itinerary.</li>
<li><strong>7-day Grand Circuit:</strong> Lake Manyara → Serengeti (3 nights) → Ngorongoro → Tarangire. Departures 2–3 times per week. The complete northern Tanzania experience.</li>
</ul>
<p>All group joining safaris include Land Cruiser with pop-up roof (maximum 6 guests), TATO-certified guide, all park fees, camping or lodge accommodation, all meals and drinking water, and airport/hotel transfers. Check our <a href="/budget-safari-tanzania/">budget safari options</a> for current pricing and departure dates.</p>

<h2>Frequently Asked Questions</h2>
<div itemscope itemtype="https://schema.org/FAQPage">

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a group joining safari in Tanzania cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Group joining safaris cost $150–$250 per person per day all-inclusive. A 4-day group safari costs $800–$1,200 per person; a 5-day costs $1,100–$1,500; and a 7-day costs $1,600–$2,200. This is 40–60% cheaper than equivalent private safari pricing.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How many people are in a group joining safari vehicle?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Standard group joining vehicles carry 4–6 passengers in a Toyota Land Cruiser or 6–8 in a safari van. Reputable operators cap at 6 passengers to ensure everyone has a window seat. Ask about maximum vehicle occupancy before booking — avoid operators who squeeze 7–8 passengers into a single vehicle.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is a group joining safari good for solo travellers?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Group joining safaris are ideal for solo travellers. You avoid the single-supplement charge that private safaris add (20–30% premium), you share costs with other travellers, and the social aspect means you're not alone for 5–7 days in the bush. You'll share a tent or room with another same-gender solo traveller unless you pay a small single supplement ($20–$30/night).</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What's the difference between a group joining and a private safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Group joining: you share a vehicle with 4–6 other travellers on a fixed itinerary at $150–$250/day. Private: your own vehicle and guide with a customisable itinerary at $300–$500/day. Same parks, same wildlife, same guide quality — the difference is flexibility, privacy, and price.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Are group joining safaris safe?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — group joining safaris with reputable operators use the same vehicles, guides, parks, and camps as private safaris. Safety standards are identical. The key is choosing a TATO-registered operator with established reviews. Avoid operators charging below $120/day — unsustainably low prices mean cut corners on vehicle maintenance and safety.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I choose who I share the safari vehicle with?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">No — the operator groups passengers based on departure dates and itineraries, not personal preferences. You'll be with a random mix of travellers from around the world. In practice, most groups gel naturally. If you're travelling with friends and want guaranteed placement together, book your seats on the same departure and inform the operator.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What accommodation do group joining safaris use?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Standard group joining safaris use budget camping — operator-provided tents at public campsites with shared facilities. Some operators offer mid-range lodge-based group joining at $50–$100/day extra, with en-suite bathrooms, hot water, and proper beds. Luxury group joining options are rare — most luxury travellers book private.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How do I avoid scam safari operators in Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Check for TATO registration (ask for their number), read reviews on TripAdvisor, Google, and SafariBookings, avoid prices below $120/day all-inclusive (unsustainable and means cut corners), never pay full amount via Western Union to an individual, and book before arriving rather than through airport or street touts.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What should I tip on a group joining safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Tip $15–$20 per day total: $10–$15/day for the guide/driver (contributed collectively from the group, not per person) and $5–$10/day per person for camp staff via the communal tip box. Tip at the end of the safari in US dollars (clean, post-2006 bills). For exceptional guide service, individual tips of $20–$30 total from each guest are appreciated.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do group joining safaris have guaranteed departures?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Reputable operators guarantee departures with a minimum of 2 passengers. If only you book, the operator will either offer to move you to a nearby date with confirmed passengers or run the safari as a private trip at the group price. Always confirm the departure guarantee policy before booking and paying.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can families with children join a group safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Families with children over 8 generally work fine on group joining safaris. Children under 8 may find long game drives (6–8 hours) difficult, and their needs (bathroom stops, snack breaks) can impact the group experience. For families with young children, a private safari with flexible pacing is usually a better choice.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What's included in a group joining safari price?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A standard group joining safari price includes: safari vehicle with professional guide, all national park and conservation fees, accommodation (camping or lodge), all meals and drinking water, and airport/hotel transfers. Not included: tips ($15–$20/day), drinks beyond water, personal expenses, travel insurance, international flights, and optional activities like balloon safaris.</p>
</div>
</div>

</div>
`;

async function main() {
  console.log("Seeding 2 Tanzania Safari blog posts (balloon safari + group safari)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "safari" },
    update: { name: "Safari" },
    create: { slug: "safari", name: "Safari" },
  });

  // Post 1 tags
  const tagBalloonSafari = await prisma.tag.upsert({
    where: { slug: "balloon-safari" },
    update: { name: "Balloon Safari" },
    create: { slug: "balloon-safari", name: "Balloon Safari" },
  });
  const tagSerengeti = await prisma.tag.upsert({
    where: { slug: "serengeti" },
    update: { name: "Serengeti" },
    create: { slug: "serengeti", name: "Serengeti" },
  });
  const tagTanzaniaSafari = await prisma.tag.upsert({
    where: { slug: "tanzania-safari" },
    update: { name: "Tanzania Safari" },
    create: { slug: "tanzania-safari", name: "Tanzania Safari" },
  });
  const tagSafariExperience = await prisma.tag.upsert({
    where: { slug: "safari-experience" },
    update: { name: "Safari Experience" },
    create: { slug: "safari-experience", name: "Safari Experience" },
  });

  // Post 2 tags
  const tagGroupSafari = await prisma.tag.upsert({
    where: { slug: "group-safari" },
    update: { name: "Group Safari" },
    create: { slug: "group-safari", name: "Group Safari" },
  });
  const tagBudgetSafari = await prisma.tag.upsert({
    where: { slug: "budget-safari" },
    update: { name: "Budget Safari" },
    create: { slug: "budget-safari", name: "Budget Safari" },
  });
  const tagSafariPlanning = await prisma.tag.upsert({
    where: { slug: "safari-planning" },
    update: { name: "Safari Planning" },
    create: { slug: "safari-planning", name: "Safari Planning" },
  });

  // Post 1: Balloon Safari Serengeti
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "balloon-safari-serengeti" },
    update: {
      title: "Balloon Safari Serengeti: Your Guide to Flying Over the Savanna",
      excerpt:
        "Complete guide to the Serengeti hot air balloon safari from a Moshi-based operator. Pre-dawn liftoff, one-hour flight, champagne bush breakfast, what you'll see from above, operators, pricing ($500-$600), best season, launch sites, photography tips, and honest value assessment.",
      content: balloonSafariContent,
      metaTitle: "Balloon Safari Serengeti | Prices & Guide 2026",
      metaDescription:
        "Serengeti balloon safari guide. $500-$600 per person, 1-hour dawn flight, champagne breakfast. Operators, best time, launch sites, and photography tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "balloon-safari-serengeti",
      title: "Balloon Safari Serengeti: Your Guide to Flying Over the Savanna",
      excerpt:
        "Complete guide to the Serengeti hot air balloon safari from a Moshi-based operator. Pre-dawn liftoff, one-hour flight, champagne bush breakfast, what you'll see from above, operators, pricing ($500-$600), best season, launch sites, photography tips, and honest value assessment.",
      content: balloonSafariContent,
      metaTitle: "Balloon Safari Serengeti | Prices & Guide 2026",
      metaDescription:
        "Serengeti balloon safari guide. $500-$600 per person, 1-hour dawn flight, champagne breakfast. Operators, best time, launch sites, and photography tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagBalloonSafari, tagSerengeti, tagTanzaniaSafari, tagSafariExperience]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: balloon-safari-serengeti");

  // Post 2: Group Safari Tanzania
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "group-safari-tanzania" },
    update: {
      title: "Group Safari Tanzania: Join Others & Share the Adventure",
      excerpt:
        "Complete guide to group joining safaris in Tanzania. How shared vehicle safaris work, cost comparison (40-60% cheaper than private), set itineraries, accommodation types, pros and cons, who it's best for, how to avoid scams, and our group departure options.",
      content: groupSafariContent,
      metaTitle: "Group Safari Tanzania | Shared Safaris 2026",
      metaDescription:
        "Group joining safari Tanzania guide. $150-$250/day vs $300-$500 private. How it works, itineraries, what's included, who should book, and scam red flags.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "group-safari-tanzania",
      title: "Group Safari Tanzania: Join Others & Share the Adventure",
      excerpt:
        "Complete guide to group joining safaris in Tanzania. How shared vehicle safaris work, cost comparison (40-60% cheaper than private), set itineraries, accommodation types, pros and cons, who it's best for, how to avoid scams, and our group departure options.",
      content: groupSafariContent,
      metaTitle: "Group Safari Tanzania | Shared Safaris 2026",
      metaDescription:
        "Group joining safari Tanzania guide. $150-$250/day vs $300-$500 private. How it works, itineraries, what's included, who should book, and scam red flags.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagGroupSafari, tagTanzaniaSafari, tagBudgetSafari, tagSafariPlanning]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: group-safari-tanzania");

  console.log("\nDone — 2 safari blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
