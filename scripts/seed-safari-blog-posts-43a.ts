import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const soloSafariContent = `
<p>We get emails every week from solo travellers asking the same thing: is it safe? Will I be lonely? Can I afford it without paying double? After hosting hundreds of solo guests at Snow Africa Adventure — men and women, twentysomethings and retirees, first-timers and repeat visitors — we can answer all three with confidence. Tanzania is one of the best solo safari destinations in the world, and the concerns that keep people from booking are almost always unfounded.</p>

<h2>Is Tanzania Safe for Solo Travellers?</h2>

<p>Tanzania is very safe for solo tourists. The national parks are managed by TANAPA (Tanzania National Parks Authority), which controls access, patrols boundaries, and enforces strict visitor protocols. You're never alone in the bush — you always have a professional, licensed guide with you. Wildlife areas are controlled environments where vehicles follow established routes and rangers maintain order.</p>
<p>Outside the parks, Arusha and Moshi are small, walkable cities with a well-established tourism infrastructure. Petty crime exists (as it does in any city worldwide), but violent crime against tourists is extremely rare. Use standard travel sense: don't flash valuables, use reputable taxis, and stay in well-reviewed accommodation.</p>
<p>Tanzania has been politically stable since independence in 1961 — no civil wars, no coups, no significant unrest. The tourism industry is the country's second-largest foreign exchange earner, and Tanzanians understand that tourist safety directly affects livelihoods. People are genuinely welcoming.</p>

<h3>A Note for Solo Women Travellers</h3>
<p>About 25% of our solo guests are women travelling alone, and we host them year-round without incident. Tanzania is a conservative country, particularly in towns — cover your shoulders and knees when you're outside the lodge or camp. In the national parks, wear whatever is comfortable for game drives. Loose, breathable clothing in neutral colours works best.</p>
<p>Specific tips from our solo female guests:</p>
<ul>
<li><strong>Trust your guide.</strong> Professional Tanzanian safari guides are vetted, licensed, and accountable to their company and TATO. They are your translator, protector, and companion for the duration of your trip. If something feels off with any staff member at any point, tell your operator immediately — reputable companies take this seriously.</li>
<li><strong>Dress conservatively in towns.</strong> Arusha, Moshi, and Stone Town are predominantly Muslim and Christian communities with traditional values. A long skirt or trousers and a top covering your shoulders avoids unwanted attention. On safari and at lodges, normal activewear is fine.</li>
<li><strong>Join group departures.</strong> You'll be matched with other travellers — often other solo women. The social aspect is a bonus, not an afterthought. We've seen lifelong friendships form on shared game drives.</li>
<li><strong>Book with a TATO-registered operator.</strong> TATO (Tanzania Association of Tour Operators) membership requires minimum standards for vehicles, insurance, and guide certification. It's your baseline quality guarantee. <a href="/tanzania-safaris/">Snow Africa Adventure</a> is a TATO member based in Moshi.</li>
<li><strong>Solo Zanzibar is very safe.</strong> Stone Town is well-touristed, and the beach resorts on the north and east coasts are accustomed to solo travellers. Water sports, spice tours, and Stone Town walking tours are easy to arrange independently or through your hotel.</li>
</ul>

<h2>The Cost Question: Solo Supplements and How to Avoid Them</h2>

<p>This is the biggest practical concern for solo travellers, and it's legitimate. Most safari lodges and camps charge a single-occupancy supplement — typically 30–50% extra on the room rate — because you're occupying a room designed for two. On a 5-day mid-range safari, that supplement can add $300–$600 to your total cost.</p>
<p>But there are smart ways to manage solo safari costs:</p>

<h3>Option 1: Join a Group Safari (Best Value)</h3>
<p>Group joining safaris are the most cost-effective way to safari solo. Here's how they work:</p>
<ul>
<li>You're matched with other travellers (typically 4–6 per vehicle) departing on set dates</li>
<li>You share a modified Toyota Land Cruiser with a professional guide</li>
<li>The itinerary is fixed — usually the classic northern circuit (Tarangire, Ngorongoro, Serengeti)</li>
<li>You pay a per-person rate rather than a per-vehicle rate</li>
<li>Accommodation is shared twin rooms (you'll be paired with another same-gender solo traveller) or single rooms at a modest supplement</li>
</ul>
<p>Group joining safari pricing: <strong>$150–$250 per person per day</strong> for budget and mid-range options. That includes park fees, accommodation, meals, vehicle, guide, and airport transfers. Compare that to a private solo safari at $400–$600/day, and the savings are substantial.</p>
<p>We run <a href="/tanzania-safaris/">group departures on fixed dates</a> throughout the year, with guaranteed departures once a minimum of two guests book. Peak season (July–October) fills faster; green season (March–May) might have smaller groups, which actually means more space in the vehicle.</p>

<h3>Option 2: Private Solo Safari</h3>
<p>If budget allows, a private solo safari is worth every dollar. You get your own vehicle and guide. You control the pace — spend an hour watching a leopard in a sausage tree without worrying about other guests getting bored. Leave camp at 5:30 AM or sleep in until 7:00 AM. Skip the afternoon drive and read by the pool. It's your safari, on your terms.</p>
<p>Private solo pricing: <strong>$400–$600 per person per day</strong> for mid-range accommodation with a private vehicle and guide. Luxury private safaris run $800–$1,500/day. The cost is higher because you're absorbing the full vehicle and guide cost that would normally be split among 2–4 guests.</p>

<h3>Option 3: Budget Camping Safari</h3>
<p>For solo travellers on a tight budget, camping safaris bring costs down significantly. You stay in basic tented camps (think canvas tent, camp bed, communal shower facilities) rather than lodges. The wildlife is identical — you're in the same parks, with the same guide, seeing the same animals. The difference is comfort at the end of the day.</p>
<p>Budget camping rates for solo travellers in a group: <strong>$150–$200 per person per day</strong>. That's a 5-day Serengeti-Ngorongoro-Tarangire safari for $750–$1,000 total. Check our <a href="/budget-safari-tanzania/">budget safari options</a> for current group departure dates and pricing.</p>

<h2>The Social Side: Will I Be Lonely?</h2>

<p>This concern evaporates within hours of arriving. Safari is inherently social — here's why:</p>

<h3>Communal Dining</h3>
<p>Most safari lodges and camps serve meals at communal tables or buffet-style with shared seating. Breakfast before the morning drive, lunch around a long table, and dinner under the stars — you'll meet other travellers at every meal. Conversation flows naturally: "What did you see today?" is the universal safari icebreaker. By Day 2, you'll know half the camp.</p>

<h3>Shared Campfires</h3>
<p>The evening campfire is a safari tradition. After dinner, guests gather around the fire with a drink and share the day's highlights. Your guide might tell stories about the bush. Other guides share their sightings. Someone pulls out a star map and points out the Southern Cross. These are the moments solo travellers remember most — genuine connection without the forced socialising of a tour group.</p>

<h3>The Game Drive Bond</h3>
<p>If you're on a group joining safari, you'll spend 6–8 hours a day in a vehicle with 3–5 other travellers. You'll collectively hold your breath as a cheetah stalks an impala. You'll celebrate when the leopard finally shows itself. You'll argue about whether that shape on the horizon is a rock or a sleeping lion (it's usually a rock). Shared experiences like these create connections faster than any networking event.</p>

<h3>Multi-Activity Combinations</h3>
<p>Solo travellers often combine multiple activities, each with its own social dimension:</p>
<ul>
<li><strong>Kilimanjaro trek + safari:</strong> A <a href="/tanzania-safari-itinerary/">Kilimanjaro climb</a> is always done in a group with guides and porters. You'll bond intensely over 5–7 days on the mountain, then decompress on safari afterwards — often with the same people.</li>
<li><strong>Zanzibar extension:</strong> The beach phase of a safari-Zanzibar combo is perfect for solo travellers. Beach bars, dhow sailing trips, cooking classes, and Stone Town tours are all social by nature.</li>
<li><strong>Cultural visits:</strong> Maasai village visits and coffee farm tours near Moshi are done in small groups and create meaningful cross-cultural connections.</li>
</ul>

<h2>Best Parks for Solo Travellers</h2>

<p>All northern circuit parks work well for solo travellers, but some stand out:</p>

<h3>Serengeti National Park</h3>
<p>The Serengeti is the most popular park in Tanzania, which means the highest concentration of other travellers at lodges and camps. For solo visitors, this is a plus — more people to meet at meals, more shared vehicles for group safaris, and the best infrastructure (reliable camps, consistent vehicle access). The central Serengeti (Seronera) has the highest density of lodges and camps.</p>

<h3>Ngorongoro Crater</h3>
<p>The Ngorongoro Crater rim lodges — Ngorongoro Serena, Sopa, and the Wildlife Lodge — all have communal dining and social bars with sweeping crater views. The crater descent itself is a shared experience (most vehicles descend together in the morning), and the contained environment means you'll cross paths with the same vehicles throughout the day. It's sociable by design.</p>

<h3>Tarangire National Park</h3>
<p>Tarangire's lodges tend to be smaller and more intimate, which works beautifully for solo travellers who prefer deeper conversations over large-group dynamics. Tarangire Sopa Lodge, Tarangire Safari Lodge, and the various tented camps along the Tarangire River have 20–40 rooms rather than 75+, creating a more personal atmosphere.</p>

<h2>Practical Tips for Solo Safari Travellers</h2>

<h3>Before You Go</h3>
<ul>
<li><strong>Share your itinerary.</strong> Send a copy of your full itinerary — lodges, dates, operator contact details — to someone at home. Update them when you arrive at each new camp.</li>
<li><strong>Get a local SIM card.</strong> Buy a Vodacom or Airtel SIM at Kilimanjaro International Airport (JRO) or in Arusha. Data costs are cheap ($5–$10 for a week of data). Network coverage is surprisingly good in the Serengeti and Ngorongoro — patchy in Tarangire and non-existent in remote southern parks.</li>
<li><strong>Download offline maps.</strong> Google Maps or Maps.me offline maps for Tanzania. You won't need them for navigation (your guide handles that), but they're useful for understanding where you are and tracking your route.</li>
<li><strong>Carry copies of documents.</strong> Passport copy, visa confirmation, travel insurance policy, and emergency contacts — keep digital copies in your email and physical copies in your daypack. If your phone dies or gets lost, you need these accessible.</li>
<li><strong>Travel insurance is mandatory.</strong> Solo travellers especially need medical evacuation coverage. An air ambulance from the Serengeti to Nairobi costs $5,000–$15,000. A comprehensive 2-week policy costs $100–$300. World Nomads and SafetyWing are popular with solo travellers.</li>
</ul>

<h3>On Safari</h3>
<ul>
<li><strong>Tell your guide your interests.</strong> Birder? Photographer? Big cat obsessive? Your guide will tailor the experience. Solo travellers have an advantage here — no compromising with a partner or group who wants something different.</li>
<li><strong>Bring a good book.</strong> Midday rest periods (12–3 PM) are long. Lodges have pools and lounges, but a book transforms idle time into luxury time. Download audiobooks if you prefer — speakers work well at lodges.</li>
<li><strong>Charge your power bank overnight.</strong> Every camp has charging points, but outlets are sometimes limited. A 20,000mAh power bank keeps your phone, camera batteries, and headlamp charged across multiple days.</li>
<li><strong>Journal your experience.</strong> Solo safari, more than group travel, gives you the mental space to process what you're seeing. Many of our solo guests say keeping a journal was the highlight of their trip — a record of sightings, emotions, and reflections that photos alone can't capture.</li>
</ul>

<h2>Solo Safari Itinerary Ideas</h2>

<h3>5-Day Classic Northern Circuit (Group Joining)</h3>
<p>The most popular solo option. Day 1: Arusha to Tarangire (elephants, baobabs, tree-climbing pythons). Day 2: Tarangire to Ngorongoro (drive across the Rift Valley floor). Day 3: Ngorongoro Crater descent — Big Five in a single day. Days 4–5: Serengeti game drives, including the Seronera Valley for leopards and the Moru Kopjes for black rhino. Return to Arusha on Day 5 afternoon.</p>
<p>Group joining price: $1,250–$1,750 per person all-inclusive.</p>

<h3>7-Day Safari + Zanzibar Combo</h3>
<p>Days 1–4: Safari as above. Day 5: Fly from Serengeti to Zanzibar (1.5 hours via Arusha). Days 5–7: Stone Town exploration, beach time at Nungwi or Kendwa, snorkelling at Mnemba Atoll, sunset dhow cruise. Fly home from Zanzibar.</p>
<p>This combo is the single most requested itinerary from solo travellers. Bush and beach, adventure and relaxation, social and solitary — it covers every dimension of solo travel.</p>

<h3>10-Day Ultimate Solo Adventure</h3>
<p>Days 1–5: <a href="/tanzania-safari-itinerary/">Kilimanjaro Marangu Route</a> trek (5 days, group with guides and porters — intensely social). Day 6: Rest day in Moshi. Days 7–9: Safari — Ngorongoro and Serengeti. Day 10: Fly to Zanzibar or depart from JRO.</p>
<p>This is the itinerary for solo travellers who want the full Tanzania experience. Mountain, bush, and optionally beach — three completely different ecosystems in 10 days.</p>

<h2>How to Book a Solo Safari</h2>

<p>The booking process is straightforward:</p>
<ol>
<li><strong>Choose your dates and style.</strong> Group joining (cheapest, most social) or private (flexible, premium). Check our <a href="/first-time-safari-tips/">first-time safari guide</a> if you're new to this.</li>
<li><strong>Contact us directly.</strong> Email or WhatsApp is fastest. Tell us your dates, budget, interests, and whether you want group or private. We'll send a detailed itinerary and quote within 24 hours.</li>
<li><strong>Confirm with a deposit.</strong> Typically 30% upfront, balance 60 days before departure. We accept bank transfer and card payments.</li>
<li><strong>We handle everything.</strong> Airport pickup, all park fees, accommodation, meals, vehicle, guide, and internal transfers. You just show up at JRO with your bag.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<div itemscope itemtype="https://schema.org/FAQPage">

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is it safe to go on safari alone in Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — Tanzania is very safe for solo safari travellers. National parks are managed by TANAPA with strict visitor protocols. You're always accompanied by a professional licensed guide. The country has been politically stable since 1961. We host solo travellers every week, including women travelling alone, without safety incidents.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a solo safari in Tanzania cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Group joining safaris cost $150–$250 per person per day (shared vehicle, twin-share accommodation). Private solo safaris cost $400–$600/day for mid-range. A 5-day group safari runs $1,250–$1,750 total. Budget camping options start at $150–$200/day. The main cost factor is whether you join a group (cheapest) or go private.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is a group joining safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A group joining safari matches you with other travellers (4–6 per vehicle) on a shared itinerary with fixed departure dates. You share a Land Cruiser with a professional guide, pay a per-person rate instead of per-vehicle, and share accommodation (twin rooms with same-gender pairing). It's the most affordable and social way to safari solo.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I have to pay a single supplement on safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Most lodges charge a 30–50% single-occupancy supplement. You can avoid this by joining a group safari with twin-share accommodation (paired with another same-gender solo traveller). Budget camping safaris rarely charge single supplements. If you want a private room, expect to pay $30–$80 extra per night depending on the lodge.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is Tanzania safe for solo female travellers?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — about 25% of our solo guests are women. Tanzania's safari areas are well-managed and your guide is always present. In towns, dress conservatively (cover shoulders and knees) as Tanzania is culturally traditional. Book with a TATO-registered operator for quality assurance. Zanzibar is also safe and popular with solo women.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Will I feel lonely on a solo safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Unlikely. Safari lodges have communal dining where you meet other travellers at every meal. Evening campfires are social by nature. Group joining safaris put you in a vehicle with 3–5 other guests for 6–8 hours daily. Most solo travellers report making more connections on safari than on any other type of trip.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I climb Kilimanjaro solo?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Independent (unguided) Kilimanjaro climbs are not allowed — all climbers must have a licensed guide and crew. But you can book as a solo trekker and be part of a team with guides and porters. Many solo travellers combine a 5–7 day Kilimanjaro trek with a 3–5 day safari afterwards, making it the ultimate solo Tanzania adventure.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What's the best time of year for a solo safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Peak season (July–October) has the most group departures available and the most travellers at lodges — easiest to socialise. Green season (March–May) is cheapest but has fewer group options. Shoulder months (June, November–December) offer a balance of good weather, moderate pricing, and enough fellow travellers for social interaction.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need a visa for Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Most nationalities need a visa. The Tanzania e-visa costs $50, takes 3–5 business days to process, and is valid for 90 days. Apply online at least two weeks before travel. You'll need a passport valid for 6+ months, a passport photo, and your flight itinerary. Visa on arrival is available at JRO but can involve a 1–2 hour queue.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Should I get a local SIM card in Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — buy a Vodacom or Airtel SIM at Kilimanjaro International Airport or in Arusha. Data costs $5–$10 for a week. Network coverage is good in the Serengeti and Ngorongoro, patchy in Tarangire. Having a local number lets you WhatsApp your operator and share updates with home without expensive roaming charges.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I combine a solo safari with Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Absolutely — the safari-Zanzibar combo is the most requested itinerary from solo travellers. Fly from the Serengeti to Zanzibar in about 1.5 hours. Stone Town is safe for solo exploration, beach resorts welcome solo guests, and activities like snorkelling, dhow cruises, and spice tours are easy to arrange independently.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How do I book a group joining safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Contact a TATO-registered operator like Snow Africa Adventure with your preferred dates and budget. We'll match you with an existing group departure or create a new one. Group departures run on fixed dates with a minimum of 2 guests. Confirm with a 30% deposit, and we handle everything — park fees, accommodation, meals, vehicle, guide, and transfers.</p>
</div>
</div>

</div>
`;

const walkingSafariContent = `
<p>Most people experience the African bush through a windshield. They see animals from the elevated seat of a Land Cruiser, separated from the ecosystem by steel and glass. A walking safari removes that barrier entirely. You step out of the vehicle, into the bush, and everything changes — the scale, the sounds, the stakes, and the way you understand what it means to be a soft, slow, clawless primate in a world built for predators.</p>

<h2>What Is a Walking Safari?</h2>

<p>A walking safari is exactly what it sounds like: you walk through the African bush on foot with an armed ranger and an experienced guide. But it's not hiking. You move slowly — 2–4 kilometres per hour at most — stopping constantly to examine animal tracks pressed into the dust, to identify droppings and determine what passed through and when, to study the medicinal properties of a shrub your guide's grandmother used, to watch a dung beetle roll its improbable prize across the path.</p>
<p>You feel the bush in ways a vehicle can never deliver. The crunch of dry grass under your boots. The sweet, heavy smell of elephant dung (surprisingly pleasant — like fermenting hay). The sound of an oxpecker alarm call, which means something large is nearby. The electric tension when your guide raises a fist and the single-file line freezes, everyone scanning the scrub ahead, pulse suddenly audible in your own ears.</p>
<p>Walking safaris originated in Zambia's South Luangwa in the 1950s, pioneered by Norman Carr. Tanzania adopted the practice later but has some of the finest walking safari territory on the continent — vast, wild landscapes with low tourist density and extraordinary biodiversity.</p>

<h2>Where to Walk in Tanzania</h2>

<h3>Tarangire National Park</h3>
<p>Tarangire is one of the best walking safari locations in Tanzania, and we say this from years of guiding guests on foot here. The park has massive herds of elephants — 3,000+ during the dry season — and encountering them on foot is an experience that rewires your understanding of scale. An elephant that looks large from a vehicle is incomprehensibly enormous when you're standing at ground level, 50 metres away, watching it strip bark from a baobab with a trunk that could crush you without effort.</p>
<p>The <a href="/tarangire-national-park-guide/">Tarangire River corridor</a> during the dry season (June–October) concentrates wildlife along the water. Walking along the river's edge, you'll find fresh leopard tracks from overnight hunts, hippo highways (worn paths from water to grazing grounds), and the distinctive three-toed prints of ostriches heading to their dust-bathing spots. Several lodges and camps in Tarangire offer guided walking safaris: Oliver's Camp, Swala Safari Lodge, and Tarangire Treetops all run morning walks with armed rangers.</p>

<h3>Ngorongoro Highlands</h3>
<p>The Ngorongoro Conservation Area extends far beyond the famous crater, and the highlands offer some of Tanzania's most spectacular walking. The Olmoti Crater hike is a 3-hour round trip that takes you to the rim of a smaller volcanic caldera with a waterfall cascading into the crater floor — Maasai cattle graze the slopes, and buffalo frequently appear in the highland forest. The Empakaai Crater walk descends into a caldera containing a soda lake frequented by flamingos, with views across to Ol Doinyo Lengai (Tanzania's only active volcano) on clear days.</p>
<p>These walks take place outside the main crater, so the strict vehicle-only rules of the Ngorongoro Crater floor don't apply. You'll walk with a Maasai ranger and an NCA-licensed guide through montane forest and open grassland at 2,500–3,000 metres altitude. The air is cool, the scenery is dramatic, and the isolation is complete — you might not see another tourist all day.</p>

<h3>Ruaha National Park</h3>
<p>Ruaha is Tanzania's largest national park (20,226 km²) and one of the least visited. It's raw, remote, and perfect for walking. The <a href="/ruaha-national-park-guide/">Ruaha River</a> acts as a lifeline during the dry season, drawing elephants, hippos, crocodiles, lions, and wild dogs to its banks. Walking along the seasonal sand rivers — wide, dry riverbeds that flood during the rains — gives you a tracker's perspective: lion paw prints, hyena tracks, the distinctive parallel drag marks of a crocodile belly.</p>
<p>Several Ruaha camps specialise in walking safaris: Jongomero Camp, Kwihala Camp, and Mwagusi Safari Camp all offer multi-hour walks led by armed rangers and expert walking guides. The landscape is classic East African bushveld — baobab-studded hillsides, acacia woodland, and rocky kopjes (granite outcrops) that harbour klipspringers and rock hyrax.</p>

<h3>Nyerere National Park (formerly Selous Game Reserve)</h3>
<p>Nyerere is classic walking safari territory — it was one of the first places in Tanzania to permit walking. The reserve covers 30,893 km² (larger than Switzerland) and receives a fraction of the northern circuit's visitors. The Rufiji River system — Tanzania's largest — creates a network of lakes, channels, and floodplains that support massive concentrations of hippos, crocodiles, and waterbirds.</p>
<p>Walking here means traversing miombo woodland and palm-fringed river margins, often encountering elephant herds, giraffe, and sable antelope (a species rarely seen in the north). Sand Rivers Selous, Siwandu Camp, and Roho ya Selous all offer walking as a core activity, not an add-on.</p>

<h3>Arusha National Park</h3>
<p>Arusha National Park is small (552 km²) but permits walking safaris — one of the few parks in northern Tanzania where this is standard. Walks around the Momela Lakes and through the montane forest on the lower slopes of Mount Meru can yield encounters with colobus monkeys, giraffes, buffaloes, and occasionally leopard. It's an excellent introduction to walking safaris for guests who want to try it before committing to a multi-day walking experience in a more remote park.</p>

<h3>Private Conservancies</h3>
<p>Several private conservancies around the northern circuit offer walking safaris outside national park boundaries, where regulations are more flexible. The Lake Eyasi area (home to the Hadzabe hunter-gatherer community) combines walking with cultural immersion. The West Kilimanjaro corridor allows walks with Maasai pastoralists through wildlife-rich grasslands at the base of Kilimanjaro.</p>

<h2>Types of Walking Safari</h2>

<h3>Morning Bush Walk (2–3 Hours)</h3>
<p>The most common format. You leave camp at first light (6:00–6:30 AM), walk for 2–3 hours, and return to camp for a late breakfast or brunch. The focus is on tracking, plant identification, and close-range encounters with non-dangerous wildlife. You'll cover 4–8 km at a relaxed pace.</p>
<p>Cost: <strong>$50–$150 per person</strong>, often included in your lodge rate at camps that specialise in walking safaris. At lodges where walking is an add-on, expect a per-person charge for the armed ranger.</p>

<h3>Full-Day Walk (6–8 Hours)</h3>
<p>A full-day walking safari covers more ground and gives you a deeper immersion. You walk from early morning, stop for a bush lunch (your camp packs a picnic set up under an acacia tree by a support vehicle that drove ahead), and walk again in the afternoon. Total distance: 10–15 km. These are available in Ruaha, Nyerere, and some Tarangire camps.</p>
<p>Cost: <strong>$150–$300 per person</strong>, including bush lunch, armed ranger, and guide.</p>

<h3>Multi-Day Walking Safari (3–5 Days)</h3>
<p>The ultimate walking safari experience. You walk from camp to camp — mobile fly camps are set up each day by a support crew that moves ahead with donkeys or a vehicle. You carry only a daypack. Each night, you sleep in a simple tent in a new location, surrounded by wilderness sounds — hyena whoops, lion grunts, nightjar calls. You wake, eat, walk, and repeat.</p>
<p>Multi-day walking safaris are available in the Serengeti's remote western corridor, in Ruaha, and in Nyerere. They require moderate fitness (5–10 km per day on uneven terrain) and a genuine appetite for adventure. This is not luxury safari — it's raw, elemental, and transformative.</p>
<p>Cost: <strong>$300–$500 per person per day</strong>, including mobile camp, all meals, armed ranger, walking guide, and support crew.</p>

<h2>What You'll See Differently on Foot</h2>

<p>The walking safari's value isn't in seeing the same animals closer — it's in seeing what you'd never notice from a vehicle.</p>

<h3>Animal Tracks and Spoor</h3>
<p>Your guide reads the ground like a newspaper. Fresh lion tracks in soft sand — how many, which direction, how long ago (edges sharp and crumbling rate tells the story). Hyena tracks (round, dog-like) overlapping leopard tracks (round with retracted claws — no claw marks) — who was following whom? Buffalo hooves, deep and splayed, heading to water. Giraffe tracks, surprisingly small for a 1,200 kg animal. After a few hours of tracking instruction, you'll start reading sign yourself — and you'll never look at bare ground the same way again.</p>

<h3>Dung Identification</h3>
<p>This sounds unappetising, but it's genuinely fascinating. Elephant dung is a botanical record — break it apart and you can identify every plant the elephant ate in the last 24 hours (they digest very little, so seeds, bark, and grass are clearly visible). Rhino middens (communal dung piles) tell you a black rhino is territorial in this area. Hyena scat is white — high calcium content from crushing bones. Giraffe droppings look like large rabbit pellets. Your guide will pick up, break apart, and sniff dung with a connoisseur's enthusiasm. By Day 2, you'll be doing it too.</p>

<h3>Medicinal Plants</h3>
<p>Tanzanian walking guides carry decades of bush knowledge passed down through generations. The toothbrush tree (Salvadora persica) — break a twig and chew the fibrous end, which releases natural fluoride and antimicrobial compounds. Maasai use it daily. The African wormwood (Artemisia afra) — brewed as tea for respiratory infections. Wild sisal — fibres for rope, sap for treating wounds. Your guide knows dozens of plants and their traditional uses. This knowledge doesn't exist in a vehicle safari — you'd drive past these plants without a second glance.</p>

<h3>Bird Behaviour</h3>
<p>On foot, birds become your early warning system. The go-away bird's harsh call (it literally sounds like "go away") alerts you that a predator or large animal is nearby. Oxpeckers riding on the backs of buffalo or rhino tell you large mammals are in the area before you see them. Francolin partridges flushing from underfoot reveal the direction of disturbance ahead. A walking guide interprets these sounds in real time, and after a few hours, your own ears start picking up the cues.</p>

<h3>Insects</h3>
<p>The Lilliputian world underfoot is endlessly entertaining. Dung beetles (both rollers and tunnellers) processing elephant dung — a single elephant dropping can attract 4,000 beetles within 15 minutes. Safari ant columns — millions-strong rivers of insects that consume everything in their path. Termite mounds — some are 4+ metres tall, architecturally complex structures with internal temperature regulation. Butterflies — the <a href="/best-time-safari-tanzania/">wet season</a> brings clouds of them, species you'd never identify from a moving vehicle.</p>

<h2>Safety on Walking Safaris</h2>

<p>Walking safaris are safe when conducted by qualified professionals, and safety incidents are extremely rare. Here's how it works:</p>

<h3>Armed Ranger</h3>
<p>In Tanzania, an armed ranger (carrying a high-calibre rifle) is mandatory on all walking safaris. The ranger is employed by TANAPA or the conservation authority and is trained in firearm use and animal behaviour. The rifle is a last resort — in decades of walking safaris across Tanzania, shots fired at wildlife are almost unheard of. The rifle's presence is a deterrent and a psychological safety net, not a weapon of intent.</p>

<h3>Guide Training</h3>
<p>Walking safari guides undergo specific training beyond standard game-drive certification. They learn animal behaviour at close range — how to read an elephant's body language (ears back and trunk raised is an alarm signal, a mock charge involves dust-kicking and trumpeting, a real charge is silent and fast), how to judge a buffalo's intent (a lone dagga boy is the most dangerous — old males expelled from the herd with nothing to lose), and how to position the group for safety.</p>

<h3>Walking Protocols</h3>
<ul>
<li><strong>Single file.</strong> You walk in a line behind the guide, with the armed ranger at the rear. This presents the smallest possible profile to wildlife.</li>
<li><strong>Hand signals.</strong> The guide uses hand signals for "stop," "crouch," "be silent," and "back up slowly." These are briefed before every walk.</li>
<li><strong>Stay calm.</strong> The cardinal rule. Running triggers a chase response in predators. Standing still and following instructions keeps you safe. Your guide has done this hundreds of times — trust their judgment.</li>
<li><strong>No bright colours or strong perfume.</strong> Neutral clothing blends into the bush. Strong scents attract insects and can alert animals to your presence.</li>
<li><strong>Wind direction matters.</strong> Your guide walks into the wind whenever possible, keeping your scent behind you so animals ahead don't detect your approach.</li>
</ul>

<h3>What You Won't See Close Up</h3>
<p>Walking safaris rarely result in close encounters with large predators — and that's by design. If your guide spots lions ahead, you don't approach. You observe from a safe distance, or you detour. The same applies to hippos out of water, which are responsible for more human fatalities in Africa than any other large animal. The animals you'll encounter closely on foot are elephants (at a respectful 50+ metres), giraffes (curious and often approach), zebra, wildebeest, and various antelope species. These encounters, at ground level with no vehicle as a buffer, are profoundly more intimate than anything a game drive delivers.</p>

<h2>Fitness Requirements</h2>

<p>Walking safaris require moderate fitness. You need to be comfortable walking 5–10 km on uneven terrain — sandy riverbeds, rocky hillsides, dry grassland with hidden holes and roots. The pace is relaxed (this is tracking, not trekking), but the terrain is unpredictable and there are no maintained trails.</p>
<p>If you can walk for 2–3 hours at a comfortable pace on mixed terrain without needing to stop, you're fit enough for a morning walk. Full-day and multi-day walks require more stamina and decent knees — uneven ground at 30°C+ is harder than a flat 10 km at home.</p>
<p>Minimum age varies by camp and operator: most require guests to be 12–16 years old for walking safaris. This isn't about fitness — it's about the ability to follow instructions calmly under pressure if an animal encounter turns intense.</p>

<h2>Best Time for Walking Safaris</h2>

<p>The dry season (June–October) is the best time for walking safaris. The grass is short (burned or grazed down), which dramatically improves visibility — you can see animals from further away, and they can see you, which paradoxically makes encounters safer. Tracks in dry sand are clear and readable. Animals concentrate around remaining water sources, making them easier to find on foot. Check our <a href="/best-time-safari-tanzania/">seasonal guide</a> for detailed monthly conditions.</p>
<p>The wet season (November–May) makes walking more challenging: tall grass obscures visibility, trails become muddy and slippery, and some camps close their walking activities entirely during the heavy rains (March–May). The exception is the <a href="/tarangire-national-park-guide/">Ngorongoro highlands</a>, where walking is excellent year-round due to the altitude and terrain.</p>

<h2>What to Wear and Bring</h2>

<p>Walking safari attire is functional, not fashionable:</p>
<ul>
<li><strong>Sturdy closed-toe shoes.</strong> Ankle-supporting hiking boots or trail shoes. Not sandals, not trainers. The ground is rough, thorny, and occasionally home to things you don't want stepping on your bare toes.</li>
<li><strong>Long trousers.</strong> Thorns, grass seeds, and insects are constant. Lightweight, quick-dry hiking trousers in khaki or olive.</li>
<li><strong>Long-sleeve shirt.</strong> Sun protection and thorn protection. Neutral colours — no white, no bright colours, no camouflage (which is actually illegal to wear in some East African countries as it resembles military dress).</li>
<li><strong>Wide-brimmed hat.</strong> The equatorial sun at safari altitudes is intense. A hat with a neck flap or a wide brim is essential.</li>
<li><strong>Small daypack.</strong> Water bottle (1.5 litres minimum for a morning walk), sunscreen, camera, binoculars, snack bar.</li>
<li><strong>Gaiters (optional).</strong> If walking through tall grass, gaiters prevent grass seeds from entering your boots. Most camps lend them.</li>
</ul>
<p>Leave behind: perfume, aftershave, brightly coloured clothing, loose jewellery that jingles, and flip-flops. Check our <a href="/tanzania-safari-packing-list/">complete packing list</a> for a full safari gear guide.</p>

<h2>Combining Walking with Vehicle Safaris</h2>

<p>The ideal safari itinerary alternates between vehicle game drives and walking. Most guests on a 5–7 day safari include 1–2 walking activities — enough to experience the bush on foot without sacrificing the vehicle-based sightings (lion hunts, leopard in trees, cheetah chasing prey) that only a game drive delivers.</p>
<p>A well-designed combo itinerary might look like:</p>
<ul>
<li><strong>Days 1–2:</strong> <a href="/tarangire-national-park-guide/">Tarangire</a> — vehicle game drives in the morning, bush walk in the late afternoon along the Tarangire River</li>
<li><strong>Day 3:</strong> Ngorongoro Crater — full-day vehicle game drive on the crater floor (walking not permitted on the crater floor)</li>
<li><strong>Day 4:</strong> Ngorongoro highlands — Olmoti Crater hike in the morning, drive to Serengeti in the afternoon</li>
<li><strong>Days 5–6:</strong> Serengeti — vehicle game drives (walking opportunities in the western corridor with select camps)</li>
</ul>
<p>This gives you the best of both worlds: the big sightings and photographic opportunities of vehicle safaris, plus the intimate, sensory depth of walking.</p>

<h2>Frequently Asked Questions</h2>
<div itemscope itemtype="https://schema.org/FAQPage">

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is a walking safari in Tanzania safe?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — walking safaris are conducted with an armed TANAPA ranger and an experienced guide trained in animal behaviour. You walk in single file, communicate by hand signals, and avoid close encounters with large predators by design. Safety incidents are extremely rare across decades of walking safaris in Tanzania.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a walking safari cost in Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Morning bush walks cost $50–$150 per person (often included in lodge rates at specialist camps). Full-day walks cost $150–$300 per person including bush lunch. Multi-day walking safaris cost $300–$500 per person per day including mobile camp, meals, ranger, and guide.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How fit do I need to be for a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Moderate fitness is sufficient for morning walks (2–3 hours, 4–8 km). You should be comfortable walking on uneven terrain — sandy riverbeds, rocky ground, dry grassland. Full-day and multi-day walks require more stamina for 10–15 km per day. The pace is relaxed (tracking, not trekking), but terrain is unpredictable.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What's the minimum age for a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Most camps and operators set a minimum age of 12–16 years for walking safaris. This isn't about fitness — it's about the ability to follow instructions calmly during animal encounters. Each camp sets its own policy, so check when booking if you're travelling with younger guests.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Where are the best walking safaris in Tanzania?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Tarangire (elephant herds on foot), Ngorongoro highlands (Olmoti and Empakaai crater hikes), Ruaha (remote bushveld tracking), and Nyerere/Selous (classic walking safari territory). Arusha National Park offers beginner-friendly walks. Private conservancies around the northern circuit also permit walking.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">When is the best time for a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">The dry season (June–October) is ideal. Short grass improves visibility and safety, tracks are clear in dry sand, and animals concentrate around water sources. Wet season walking is possible but more challenging — tall grass reduces visibility and trails become muddy. Some camps close walking activities during the heavy rains (March–May).</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Will I see lions on a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">You might see lions at a distance, but your guide will not approach them on foot. Walking safaris deliberately avoid close encounters with large predators — if lions are spotted ahead, you observe from a safe distance or detour. The magic of walking is in tracking, plants, insects, and intimate encounters with elephants, giraffes, and antelope at ground level.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What should I wear on a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Sturdy closed-toe hiking boots or trail shoes, long trousers (khaki or olive), long-sleeve shirt in neutral colours, and a wide-brimmed hat. Bring a small daypack with 1.5 litres of water, sunscreen, camera, and binoculars. Avoid perfume, bright colours, white clothing, and loose jewellery.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I combine walking with vehicle game drives?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — this is the ideal approach. Most guests include 1–2 walking activities within a 5–7 day safari. Vehicle drives deliver big sightings (lion kills, leopards, cheetah hunts), while walking provides intimate, sensory depth. A well-designed itinerary alternates between both for the most complete safari experience.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is a walking safari the same as hiking?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">No. Hiking is about covering distance and reaching a destination. A walking safari is about observation — you move slowly (2–4 km/hour), stopping constantly to examine tracks, plants, insects, and animal signs. The pace is dictated by what you discover, not by a trail or summit. It's closer to a nature masterclass than a fitness activity.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need travel insurance for a walking safari?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes — travel insurance with medical evacuation cover is essential for any safari activity, including walking safaris. Walking takes place in remote areas where emergency evacuation by air ambulance may be necessary. A comprehensive policy costs $100–$300 for two weeks and covers medical evacuation, trip cancellation, and baggage.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What's the difference between a walking safari and a bush walk?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A bush walk is typically a 2–3 hour morning activity offered as an add-on at a lodge — you walk and return to the same camp. A walking safari implies a more immersive commitment: full-day walks or multi-day walks where you camp in different locations each night. Both involve an armed ranger and guide; the difference is duration and depth of immersion.</p>
</div>
</div>

</div>
`;

async function main() {
  console.log("Seeding 2 Tanzania Safari blog posts (solo safari + walking safari)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "safari" },
    update: { name: "Safari" },
    create: { slug: "safari", name: "Safari" },
  });

  // Post 1 tags
  const tagSoloSafari = await prisma.tag.upsert({
    where: { slug: "solo-safari" },
    update: { name: "Solo Safari" },
    create: { slug: "solo-safari", name: "Solo Safari" },
  });
  const tagTanzaniaSafari = await prisma.tag.upsert({
    where: { slug: "tanzania-safari" },
    update: { name: "Tanzania Safari" },
    create: { slug: "tanzania-safari", name: "Tanzania Safari" },
  });
  const tagSoloTravel = await prisma.tag.upsert({
    where: { slug: "solo-travel" },
    update: { name: "Solo Travel" },
    create: { slug: "solo-travel", name: "Solo Travel" },
  });
  const tagSafariPlanning = await prisma.tag.upsert({
    where: { slug: "safari-planning" },
    update: { name: "Safari Planning" },
    create: { slug: "safari-planning", name: "Safari Planning" },
  });

  // Post 2 tags
  const tagWalkingSafari = await prisma.tag.upsert({
    where: { slug: "walking-safari" },
    update: { name: "Walking Safari" },
    create: { slug: "walking-safari", name: "Walking Safari" },
  });
  const tagSafariExperience = await prisma.tag.upsert({
    where: { slug: "safari-experience" },
    update: { name: "Safari Experience" },
    create: { slug: "safari-experience", name: "Safari Experience" },
  });
  const tagBushWalk = await prisma.tag.upsert({
    where: { slug: "bush-walk" },
    update: { name: "Bush Walk" },
    create: { slug: "bush-walk", name: "Bush Walk" },
  });

  // Post 1: Solo Safari Tanzania
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "solo-safari-tanzania" },
    update: {
      title: "Solo Safari Tanzania: The Complete Guide for Solo Travellers",
      excerpt:
        "Everything solo travellers need to know about safari in Tanzania — safety, costs, group joining vs private, single supplements, social dynamics, women-specific tips, itinerary ideas, and practical advice from operators who host solo guests every week.",
      content: soloSafariContent,
      metaTitle: "Solo Safari Tanzania | Guide for Solo Travellers",
      metaDescription:
        "Solo safari Tanzania guide. Safety, costs ($150–$600/day), group joining vs private, solo female tips, single supplements, and itinerary ideas from a Moshi operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "solo-safari-tanzania",
      title: "Solo Safari Tanzania: The Complete Guide for Solo Travellers",
      excerpt:
        "Everything solo travellers need to know about safari in Tanzania — safety, costs, group joining vs private, single supplements, social dynamics, women-specific tips, itinerary ideas, and practical advice from operators who host solo guests every week.",
      content: soloSafariContent,
      metaTitle: "Solo Safari Tanzania | Guide for Solo Travellers",
      metaDescription:
        "Solo safari Tanzania guide. Safety, costs ($150–$600/day), group joining vs private, solo female tips, single supplements, and itinerary ideas from a Moshi operator.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagSoloSafari, tagTanzaniaSafari, tagSoloTravel, tagSafariPlanning]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: solo-safari-tanzania");

  // Post 2: Walking Safari Tanzania
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "walking-safari-tanzania" },
    update: {
      title: "Walking Safari Tanzania: Experience the Bush on Foot",
      excerpt:
        "Complete guide to Tanzania's walking safaris — where to walk (Tarangire, Ngorongoro highlands, Ruaha, Nyerere), types (morning walk, full-day, multi-day), what you'll see differently on foot, safety protocols, fitness requirements, and costs.",
      content: walkingSafariContent,
      metaTitle: "Walking Safari Tanzania | Bush on Foot Guide",
      metaDescription:
        "Walking safari Tanzania guide. Where to walk, costs ($50–$500/day), safety, fitness level, what you see on foot vs vehicle, and the best parks for walking safaris.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "walking-safari-tanzania",
      title: "Walking Safari Tanzania: Experience the Bush on Foot",
      excerpt:
        "Complete guide to Tanzania's walking safaris — where to walk (Tarangire, Ngorongoro highlands, Ruaha, Nyerere), types (morning walk, full-day, multi-day), what you'll see differently on foot, safety protocols, fitness requirements, and costs.",
      content: walkingSafariContent,
      metaTitle: "Walking Safari Tanzania | Bush on Foot Guide",
      metaDescription:
        "Walking safari Tanzania guide. Where to walk, costs ($50–$500/day), safety, fitness level, what you see on foot vs vehicle, and the best parks for walking safaris.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagWalkingSafari, tagTanzaniaSafari, tagSafariExperience, tagBushWalk]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: walking-safari-tanzania");

  console.log("\nDone — 2 safari blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
