import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

/* ------------------------------------------------------------------ */
/*  Post 1: Stone Town Guide                                          */
/* ------------------------------------------------------------------ */

const stoneTownContent = `
<p>Stone Town hits you before you're ready for it. You step off the ferry or out of the taxi and immediately the narrow alleyways swallow you whole — the smell of cloves and cardamom mixing with salt air, carved wooden doors framing doorways that haven't changed in two centuries, and the call to prayer echoing off coral stone walls that have absorbed three continents of history. We've been bringing guests through Stone Town for years, and the ones who give it a full day or two always tell us it was one of the most memorable parts of their Zanzibar trip. The ones who skip it regret it.</p>

<p>Stone Town is the old quarter of Zanzibar City, and it earned its UNESCO World Heritage status in 2000 for good reason. This isn't a reconstructed tourist attraction — it's a living, breathing town where 16,000 people still live, trade, pray, and go about daily life inside the same coral ragstone buildings their families have occupied for generations. It's also the most complete example of a Swahili trading town in East Africa, a place where Omani sultans, Indian merchants, Persian traders, and European colonists all left their mark on the architecture, food, culture, and DNA of the island.</p>

<h2>A Brief History: How Stone Town Became Stone Town</h2>

<p>You can't understand Stone Town without understanding why it exists. In the early 19th century, Sultan Said bin Sultan of Oman moved his capital from Muscat to Zanzibar, making this small island the centre of a trading empire that stretched from the Persian Gulf to the African Great Lakes. The reason was commercial — Zanzibar sat at the crossroads of Indian Ocean trade routes, and whoever controlled it controlled the flow of ivory, spices, and enslaved people between Africa, Arabia, and India.</p>

<p>The wealth from that trade built Stone Town. Omani Arabs constructed grand houses with carved doors and inner courtyards. Indian merchants from Gujarat and Kutch brought their own architectural flourishes — ornate balconies, stained glass, and brass-studded doors designed to repel elephants (a tradition carried from India, not strictly necessary in Zanzibar, but the craftsmen built what they knew). Persian traders added bathhouses. The British, who established a protectorate in 1890, contributed colonial administrative buildings and the Anglican Cathedral.</p>

<p>The result is a town that looks like nowhere else on Earth. Every building carries DNA from at least two continents. A single street might show you Omani arched doorways, Indian carved balconies, Persian bath ventilation shafts, and British colonial shuttered windows — all within a fifty-metre stretch. This layered architectural identity is exactly what earned Stone Town its UNESCO designation.</p>

<h2>The Slave Trade: A History You Must Confront</h2>

<p>Zanzibar was the centre of the East African slave trade, and Stone Town was its marketplace. Between 1800 and 1873, an estimated 50,000 enslaved people passed through <a href="/zanzibar/">Zanzibar</a> annually — captured in the interior of present-day Tanzania, Mozambique, and Congo, marched to the coast, shipped to Zanzibar, and sold in Stone Town's slave market before being transported to plantations in Zanzibar itself, Oman, Persia, and India.</p>

<p>The slave market was closed in 1873 under British pressure, and the Anglican Cathedral Church of Christ was deliberately built on its exact site. Today, the Christ Church Cathedral and Old Slave Market is the most important historical site in Stone Town. The underground chambers where enslaved people were held before auction still exist — you can enter them. They're cramped, dark, airless spaces designed to hold 60-75 people in conditions we'd consider torture. There are stone posts with original shackles. It's harrowing, but it's real, and it's important. Entry is $5, and the guided tour takes about 45 minutes. Don't skip this.</p>

<h2>Key Sights: What to See in Stone Town</h2>

<h3>House of Wonders (Beit al-Ajaib)</h3>

<p>The largest building in Stone Town and the most iconic on the waterfront. Built in 1883 for Sultan Barghash, it was the first building in East Africa to have electricity and an elevator — hence the name. The multi-storey structure with its wide verandas and clock tower dominated the seafront for over a century. It served as the seat of the Sultanate, then as the Zanzibar National Museum. A partial collapse in 2020 triggered a major restoration project funded by the Aga Khan Trust for Culture, and the building is currently under restoration. You can't enter, but the exterior and the story are worth seeing from the waterfront. When the restoration completes, it will house a museum of Swahili civilisation.</p>

<h3>Old Fort (Ngome Kongwe)</h3>

<p>Built by Omani Arabs in the late 17th century on the foundations of a Portuguese church (the Portuguese were here first, briefly), the Old Fort is the oldest standing building in Stone Town. Its massive coral stone walls have served as a fortress, a prison, a railway depot, and now a cultural centre. The open-air amphitheatre inside hosts live music, dance performances, and the Zanzibar International Film Festival (ZIFF) events. Entry is free. There's a small craft market inside, a cafe, and exhibition spaces. It's a good orientation point — right next to the House of Wonders on the waterfront.</p>

<h3>Palace Museum (Beit el-Sahel)</h3>

<p>The former Sultan's residential palace, now a museum documenting the lives of Zanzibar's ruling dynasty. Period furniture, royal portraits, and personal artefacts from the Sultan's family fill the rooms. The building itself — with its seafront position and wide balconies — tells you everything about how the sultans lived. One floor is dedicated to Princess Salme (Emily Ruete), a Zanzibari princess who eloped with a German merchant in 1866 and wrote the first autobiography by an Arab woman. Her story is fascinating. Entry is $3.</p>

<h3>Forodhani Gardens Night Food Market</h3>

<p>This is where Stone Town comes alive after dark. Every evening at sunset, vendors set up stalls along the waterfront in Forodhani Gardens, and for the next four hours you can eat your way through Zanzibar's street food scene. The atmosphere is electric — smoke rising from dozens of grills, vendors shouting for your attention, locals and tourists mingling in the warm evening air with the ocean as backdrop.</p>

<p>What to eat: Zanzibar pizza (not Italian pizza — it's a stuffed flatbread filled with meat, cheese, egg, and vegetables, cooked on a hot griddle, $1-$3), urojo (Zanzibar mix soup — a tangy, spicy concoction unique to the island), seafood skewers (octopus, prawns, lobster tail — $2-$5 depending on size), sugar cane juice (freshly pressed, $0.50), and mishkaki (marinated grilled meat skewers). You can fill up for $3-$10. Go hungry. Arrive at sunset for the best atmosphere and freshest food. The market runs roughly 6:00 PM to 10:00 PM.</p>

<h3>Darajani Market (Estella Market)</h3>

<p>This is Stone Town's main public market, and it's an assault on every sense you have. The spice section alone is worth the visit — mountains of cloves, cinnamon bark, cardamom pods, black pepper, turmeric, and vanilla. The fish market in the adjacent building is chaotic and pungent — massive tuna, octopus, prawns, and reef fish laid out on concrete slabs, with auction-style selling starting early morning. The fruit section overflows with jackfruit, breadfruit, mangoes, passion fruit, and rambutans. Go early morning (7:00-9:00 AM) for the full experience. This is not a tourist market — it's where locals shop. Bring a camera but ask before photographing stallholders.</p>

<h3>Freddie Mercury's Birthplace</h3>

<p>Farrokh Bulsara — later Freddie Mercury, the legendary Queen frontman — was born in Stone Town on 5 September 1946 to Parsi Indian parents. His father worked as a cashier at the British Colonial Office in Zanzibar. The family lived in a modest house in the Shangani area of Stone Town. The building is now a small museum dedicated to Freddie's early life, with photographs, memorabilia, and context about the Parsi community in Zanzibar. Entry is $5. It's a small space — 20-30 minutes is enough — but for Queen fans, it's a pilgrimage. The house is on Kenyatta Road, well-signposted.</p>

<h3>The Carved Wooden Doors</h3>

<p>Stone Town has over 560 historically significant carved wooden doors, and they're one of the town's most distinctive features. Every door tells a story through its carvings, and the style reveals the owner's heritage. Indian doors feature brass studs — originally designed to prevent elephants from pushing doors open in India, the tradition was maintained in Zanzibar purely for decoration. Omani doors have geometric and floral patterns with Quranic inscriptions. Some doors have chain carvings representing the slave trade. Frankincense and date palm motifs indicate merchant wealth. You'll spot these throughout your walk — once you start noticing them, you can't stop. Some of the finest examples are on Kenyatta Road, Hurumzi Street, and around the Old Fort.</p>

<h3>Hammam (Persian Baths)</h3>

<p>Several historic hammams survive in Stone Town, a legacy of the Persian trading community. The Hamamni Persian Baths, built in the 1870s by Sultan Barghash for public use, are the most prominent — they were the first public baths in Zanzibar. While no longer operational for bathing, you can visit the restored structure to see the steam rooms, cold pools, and the ingenious water heating system. Some boutique hotels have restored smaller private hammams for guest use. The Hamamni Baths are on Hamamni Street — entry $1-$2.</p>

<h3>Tippu Tip's House</h3>

<p>Tippu Tip (Hamed bin Mohammed) was the most powerful slave and ivory trader in 19th-century East Africa. His trading network stretched from Zanzibar to the Congo River. His house in Stone Town — a large mansion with an ornately carved door — still stands, though it's in poor condition and not formally open as a museum. You can view the exterior and the famous door. The building represents the uncomfortable wealth that the slave and ivory trade generated — a useful counterpoint to the Cathedral and slave market memorial.</p>

<h2>Walking Tour: How to Explore Stone Town</h2>

<p>The best way to experience Stone Town is on foot with a licensed guide. A guided <a href="/zanzibar-things-to-do/">walking tour</a> covering the main sights takes 3-4 hours and costs $15-$30 per person depending on group size and guide quality. Start early morning — by 7:00 or 8:00 AM — before the heat builds. By midday, the narrow alleyways trap heat and humidity, and walking becomes uncomfortable.</p>

<p>What a standard walking tour covers: the slave market and cathedral, House of Wonders and Old Fort, Palace Museum, Forodhani Gardens, Darajani Market, Freddie Mercury's house, Tippu Tip's house, and a selection of the carved doors. A good guide doesn't just show you buildings — they tell you the stories behind them, introduce you to shopkeepers, and navigate the labyrinth of alleyways that would swallow you whole on your own.</p>

<p>Getting lost is part of the Stone Town experience — the alleyways are a genuine labyrinth, with over 50 streets crammed into an area you could walk across in 15 minutes. But here's the thing: Stone Town is small enough that you'll always find your way out. Head in any direction for five minutes and you'll hit either the waterfront or a main road. So let yourself get lost. The best discoveries — a hidden courtyard, a spice shop, a rooftop with a view — happen when you wander off the guided route.</p>

<h2>Where to Stay in Stone Town</h2>

<p>Stone Town accommodation ranges from budget guesthouses to serious luxury, and staying inside the old town is far superior to staying on the outskirts. You want to step out of your hotel and immediately be in the labyrinth. Here are our recommendations across budgets for your <a href="/zanzibar-where-to-stay/">Zanzibar stay</a>:</p>

<h3>Luxury ($200-$700)</h3>

<p><strong>Emerson Spice:</strong> The best boutique hotel in Stone Town. A restored merchant's house with individually designed rooms, each filled with antiques and Zanzibari art. The rooftop restaurant, The Secret Garden, serves a multi-course Swahili dinner with panoramic views over the rooftops to the ocean — book 24 hours ahead, it fills up. $200-$400 per night.</p>

<p><strong>Park Hyatt Zanzibar:</strong> Five-star waterfront hotel built around a historic building (Mambo Msiige). Modern luxury with Hyatt standards — pool, spa, ocean-view rooms, multiple restaurants. The best option if you want international hotel standards with a Stone Town address. $350-$700 per night.</p>

<h3>Mid-Range ($60-$200)</h3>

<p><strong>Tembo House Hotel:</strong> Colonial-era building right on the waterfront with a pool, restaurant, and rooms that mix traditional Zanzibari style with modern comfort. The beachfront location means you can swim before breakfast. Solid mid-range choice with character. $100-$200 per night.</p>

<p><strong>Dhow Palace Hotel:</strong> A converted Sultan's residence with an interior courtyard, rooftop restaurant, and rooms furnished with antiques and four-poster beds. Budget boutique at its best — you get the Stone Town atmosphere without the luxury price tag. $60-$120 per night.</p>

<h3>Budget ($40-$80)</h3>

<p><strong>Zanzibar Coffee House:</strong> Six rooms above a coffee roastery in the heart of Stone Town. Simple but beautifully done — each room is individually themed, the coffee is outstanding (they roast their own beans), and the location is perfect. At $40-$80 per night, it's the best value in Stone Town. Book early — only six rooms means it fills fast.</p>

<h2>Where to Eat in Stone Town</h2>

<p>Beyond Forodhani Gardens, Stone Town has a genuine restaurant scene that most visitors barely scratch:</p>

<p><strong>The Tea House at Emerson Spice:</strong> The best rooftop dinner in Zanzibar. A set multi-course Swahili menu served on the rooftop terrace at sunset. The food is excellent — but it's the setting that makes it extraordinary. Stone Town's rooftops spreading out below you, the ocean beyond, the call to prayer rising from the mosques. Book at least 24 hours ahead. Not cheap, but unforgettable.</p>

<p><strong>Lukmaan Restaurant:</strong> Where locals eat. Authentic Swahili food — pilau rice, biryani, grilled fish, coconut bean soup, chapati — served cafeteria-style. Point at what looks good, pile up your plate, and pay $3-$8 for a feast. Two locations in Stone Town. The food is fresh, flavourful, and the real deal. Don't overthink it — just go.</p>

<p><strong>Archipelago Cafe:</strong> Fusion cuisine in a restored building — Swahili flavours meeting international techniques. Good for a slightly more upscale lunch or dinner without the formality of the high-end hotels. Creative cocktails. Mid-range pricing.</p>

<p><strong>Lazuli:</strong> Seafood on the waterfront. Fresh catches grilled simply and served with views. Good for a relaxed lunch watching the dhows come and go. The seafood platter is generous and well-priced.</p>

<h2>How Long to Spend in Stone Town</h2>

<p>Our recommendation: 1-2 days for the main sights, 3 days if you want to truly immerse yourself.</p>

<p><strong>One day:</strong> Enough for a guided walking tour (3-4 hours), lunch at Lukmaan, the slave market and cathedral, and dinner at Forodhani Gardens. You'll see the highlights but you'll feel rushed.</p>

<p><strong>Two days:</strong> The sweet spot. Day one for the walking tour and main sights. Day two for the places you missed, a spice tour (half-day, $25-$35, worth it), shopping for souvenirs, and a leisurely rooftop dinner at Emerson Spice. Two days lets you absorb the atmosphere instead of just ticking off sights.</p>

<p><strong>Three days:</strong> Add a day trip to Prison Island (30-minute boat ride, giant Aldabra tortoises, snorkelling, $35-$50), or spend a half-day at Jozani Forest to see the endemic red colobus monkeys. Three days also lets you return to favourite spots — and in Stone Town, you will have favourites by day two.</p>

<p>Most of our guests combine Stone Town with <a href="/zanzibar-best-beaches/">beach time on the north or east coast</a> — typically 1-2 nights in Stone Town followed by 3-5 nights at a beach resort. That combination gives you the cultural depth and the relaxation that makes a <a href="/zanzibar-travel-guide/">Zanzibar trip</a> complete.</p>

<h2>Practical Tips</h2>

<ul>
<li><strong>Dress modestly:</strong> Stone Town is predominantly Muslim. Cover shoulders and knees when walking through town — especially near mosques. Swimwear is for the beach, not the streets.</li>
<li><strong>Currency:</strong> Tanzanian Shilling (TZS), but US dollars accepted everywhere. ATMs available but unreliable — bring cash as backup. Small denomination USD ($1, $5, $10) are useful for tips and small purchases.</li>
<li><strong>Haggling:</strong> Expected in markets and shops. Start at 40-50% of the asking price and negotiate from there. Be firm but friendly.</li>
<li><strong>Photography:</strong> Always ask before photographing people, especially in the market. Some will ask for a small tip ($0.50-$1). The carved doors and architecture are fair game.</li>
<li><strong>Safety:</strong> Stone Town is generally safe during the day. At night, stick to well-lit areas and avoid deserted alleyways. Petty theft (bag snatching, pickpocketing) occurs — keep valuables secure and leave expensive jewellery at the hotel.</li>
<li><strong>Best time to visit:</strong> June-October (dry season, comfortable temperatures) and December-February (hot but dry). Avoid the heavy rains of March-May.</li>
</ul>

<div itemscope itemtype="https://schema.org/FAQPage">
<h2>Frequently Asked Questions</h2>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is Stone Town worth visiting?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Absolutely. Stone Town is the cultural heart of Zanzibar and one of the most historically significant towns in East Africa. The UNESCO World Heritage Site offers a unique blend of Swahili, Arab, Indian, and European architecture and culture that exists nowhere else. Even guests who come to Zanzibar purely for beaches tell us Stone Town was an unexpected highlight. Give it at least one full day.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a Stone Town walking tour cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A licensed guide for a 3-4 hour walking tour costs $15-$30 per person. The price depends on group size and guide experience. We recommend booking through your hotel or a reputable operator rather than accepting offers from touts at the port. A good guide transforms the experience from sightseeing into storytelling.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How many days should I spend in Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">We recommend 1-2 days for the main sights, or 3 days if you want to immerse yourself fully. Most guests do 1-2 nights in Stone Town followed by 3-5 nights at a beach resort on the north or east coast. Two days is the sweet spot — enough for a guided tour, the slave market, Forodhani night market, a spice tour, and a rooftop dinner.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is Stone Town safe for tourists?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Stone Town is generally safe during the day. At night, stick to well-lit main streets and avoid deserted alleyways. Petty theft (bag snatching, pickpocketing) is the main risk — keep valuables secure and don't flash expensive electronics. Use common sense and you'll be fine. The tourist police have a presence in the main areas.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What should I wear in Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Dress modestly. Stone Town is predominantly Muslim, so cover your shoulders and knees when walking through town. Lightweight, loose-fitting clothing works best in the heat and humidity. Swimwear is for the beach only. Comfortable walking shoes are essential — the alleyways are uneven coral stone, and you'll walk a lot during a tour.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the best time to visit Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">June to October (dry season with comfortable temperatures of 25-28°C) and December to February (hot but dry). Avoid March to May when heavy rains make the narrow alleyways slippery and humid. Stone Town is a year-round destination, but the dry months are significantly more comfortable for walking tours.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Where is Freddie Mercury's house in Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Freddie Mercury's birthplace is on Kenyatta Road in the Shangani area of Stone Town. It's well-signposted and easy to find. The building is now a small museum with photographs and memorabilia from his early life. Entry costs $5 and a visit takes 20-30 minutes. Farrokh Bulsara (Freddie Mercury) was born here on 5 September 1946 to Parsi Indian parents.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is Zanzibar pizza?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Zanzibar pizza is not Italian pizza. It's a thin dough stuffed with a filling — typically minced meat, cheese, egg, onion, and peppers — then folded and cooked on a hot griddle until crispy. It costs $1-$3 and is the signature street food at Forodhani Gardens night market. Some vendors make sweet versions with Nutella and banana. It's Zanzibar's answer to a savoury crepe and it's addictive.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I visit the old slave market in Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes. The Christ Church Cathedral and Old Slave Market is open to visitors. Entry costs $5 and includes a guided tour of the Anglican Cathedral (built on the site of the former slave market), the underground chambers where enslaved people were held before auction, and the memorial sculpture. The tour takes about 45 minutes and is sobering but essential for understanding Zanzibar's history.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What are the carved doors of Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Stone Town has over 560 historically significant carved wooden doors. Each door's style reveals the owner's heritage: Indian doors feature brass studs (originally designed to deter elephants), Omani doors have geometric and floral patterns with Quranic inscriptions, and some feature chain motifs representing the slave trade. The finest examples are on Kenyatta Road, Hurumzi Street, and around the Old Fort. They're one of Stone Town's most photographed features.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Where should I eat in Stone Town?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">For street food, Forodhani Gardens night market (opens at sunset, $3-$10). For authentic Swahili food, Lukmaan Restaurant ($3-$8). For a special dinner, The Tea House at Emerson Spice (book 24 hours ahead — the rooftop sunset dinner is the best in Stone Town). For waterfront seafood, Lazuli. For fusion cuisine, Archipelago Cafe. Stone Town's food scene is genuine and well-priced.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How do I get to Stone Town from the airport?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Abeid Amani Karume International Airport is about 7 kilometres south of Stone Town. A taxi takes 15-20 minutes and costs $10-$15 (negotiate before getting in). Some hotels offer airport transfers — arrange this in advance. There's no reliable public transport from the airport. If arriving by ferry from Dar es Salaam, the port is right in Stone Town — most hotels are within walking distance or a short taxi ride.</p>
</div>
</div>

</div>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: Zanzibar Diving & Snorkelling                             */
/* ------------------------------------------------------------------ */

const divingContent = `
<p>The first time we took a guest snorkelling at Mnemba Atoll, she came out of the water and said she'd just had the best hour of her life. A green turtle had swum alongside her for five minutes, close enough to touch (she didn't — she knew the rules). A pod of bottlenose dolphins had appeared on the boat ride over. She'd floated above a coral garden teeming with parrotfish, angelfish, and clownfish in water so clear she could see the sandy bottom 15 metres below. And the whole experience cost her $40. That's <a href="/zanzibar/">Zanzibar's</a> underwater world — world-class marine life at a fraction of what you'd pay in the Maldives, the Red Sea, or the Great Barrier Reef.</p>

<p>Zanzibar sits on the edge of the East African continental shelf, surrounded by coral reefs that support over 600 species of fish, five species of marine turtle, dolphins, whale sharks, humpback whales (seasonally), and some of the healthiest coral formations in the western Indian Ocean. Whether you're a certified diver chasing pelagics on deep walls or a complete beginner who just wants to float above a reef and watch the show, Zanzibar delivers. Here's everything we know from years of sending guests underwater.</p>

<h2>Mnemba Atoll: Zanzibar's Crown Jewel</h2>

<p>Mnemba Atoll is a small, privately owned island about 3 kilometres off the northeast coast of Zanzibar, surrounded by a fringing coral reef that drops into deep blue water. It's Zanzibar's most famous underwater destination for good reason — the reef is healthy, the marine life is abundant, and the visibility is consistently excellent. The island itself belongs to the &Beyond Mnemba Island Lodge (one of East Africa's most exclusive resorts), but the surrounding waters are open to everyone.</p>

<h3>Snorkelling at Mnemba</h3>

<p>You don't need any experience or certification to snorkel at Mnemba. Half-day trips leave from Matemwe, Nungwi, and Kendwa — Matemwe is closest at about 20 minutes by boat. The trip costs $30-$50 per person including boat transfer, snorkelling gear, and a guide. Life jackets are provided and encouraged, especially if you're not a confident swimmer. The reef starts at just 1-2 metres depth in places, so you're floating right above the action.</p>

<p>What you'll see is remarkable for how little effort it takes. Green and hawksbill turtles are almost guaranteed — the reef is a known feeding and resting area for both species, and our guests see turtles on roughly 9 out of 10 trips. Bottlenose dolphins are regularly spotted on the boat ride to and from the atoll. The coral itself is vibrant — table corals, brain corals, and branching corals in blues, purples, and yellows providing habitat for hundreds of species of reef fish. Look for lionfish hovering near coral overhangs, moray eels peering out of crevices, octopus changing colour against the reef, and clouds of anthias and damselfish swarming the shallow coral heads.</p>

<h3>Diving at Mnemba</h3>

<p>For certified divers, Mnemba offers a different dimension. The reef wall drops to 30+ metres on the seaward side, and the deeper water attracts larger marine life — reef sharks (whitetip and blacktip), eagle rays, barracuda, Napoleon wrasse, and during migration season (July-September), humpback whales. A two-tank dive costs $80-$130 depending on the operator and your departure point. Visibility typically ranges from 15 to 30 metres, reaching 40+ metres on exceptional days during the calm season (October-March).</p>

<p>If you're not yet certified, most operators at Mnemba offer PADI Discover Scuba Diving — a supervised introductory dive that requires no prior experience. You get a pool or confined water session, a theory briefing, and one open-water dive to about 12 metres depth, all in a single day. Cost: $80-$120. It's not a certification (you can't dive independently afterwards), but it's the fastest way to experience what diving feels like without committing to a full course.</p>

<h2>Other Dive and Snorkel Sites Around Zanzibar</h2>

<h3>Chumbe Island</h3>

<p>If Mnemba is Zanzibar's most famous reef, Chumbe is its healthiest. Chumbe Island Coral Park is a UNESCO-protected marine sanctuary about 12 kilometres southwest of Stone Town, and it contains one of the most pristine coral reef ecosystems in Tanzania. The reef has been protected since 1994, and it shows — coral coverage is dense, fish populations are thriving, and the overall reef health is what marine biologists wish every reef looked like.</p>

<p>Day trips to Chumbe cost around $100 per person including boat transfer, a guided snorkel safari, lunch, and a nature walk on the island. It's not cheap, but the marine life density is noticeably higher than at less-protected sites. The guides are marine biologists or trained naturalists who can identify species and explain reef ecology. Diving is not permitted in the sanctuary — snorkelling only, which actually works in Chumbe's favour because the shallow reef (1-8 metres) is where the best coral and fish life concentrate.</p>

<h3>Tumbatu Island</h3>

<p>North of Zanzibar, Tumbatu Island offers wall diving for experienced divers. The underwater topography is dramatic — vertical walls dropping into deep water, swim-throughs, and overhangs that attract larger pelagic species. This site sees far fewer visitors than Mnemba, making it appealing if you want to dive without crowds. Access is from Nungwi, and conditions can be more challenging (stronger currents, deeper dives), so it's best suited for Advanced Open Water certified divers or above.</p>

<h3>Leven Bank</h3>

<p>An offshore submerged reef system that's Zanzibar's premier big-fish destination. Barracuda schools, yellowfin tuna, reef sharks (grey reef, whitetip), and occasionally whale sharks draw experienced divers to this site. It's deeper (20-40 metres), currents can be strong, and it requires a longer boat ride — this is advanced diving, not for beginners. But for divers who've seen enough reef fish and want pelagic encounters, Leven Bank delivers.</p>

<h3>Pange Sandbank</h3>

<p>A shallow sandbank near Stone Town that's perfect for easy snorkelling, often combined with a <a href="/zanzibar-things-to-do/">Prison Island trip</a>. The water is calm and shallow (1-3 metres), making it ideal for families with children or nervous snorkellers. Half-day trips cost $25-$40 including the sandbank visit, snorkelling gear, and sometimes a Prison Island stop (giant tortoises). The coral here isn't as spectacular as Mnemba or Chumbe, but the accessibility and calm conditions make it a good choice for beginners.</p>

<h3>Bawe Island</h3>

<p>Close to Stone Town and easy to reach, Bawe Island has a coral reef on its western side that offers decent snorkelling without the travel time required for Mnemba or Chumbe. It's a quieter alternative to the more famous sites and can be combined with a beach day on the island's sandy shores. The reef is shallower and more accessible than Mnemba, making it suitable for families and casual snorkellers.</p>

<h2>Dive Operators We Recommend</h2>

<p>Zanzibar has dozens of dive operators, and quality varies significantly. We send our guests to operators with PADI certification, proper insurance, well-maintained equipment, and experienced divemasters. Here are the operators we know and trust:</p>

<p><strong>One Ocean:</strong> PADI 5-Star IDC Centre with locations in Nungwi, Kendwa, Paje, and Stone Town. They're the largest and most established operator on the island, with the widest range of dive sites and courses. Equipment is well-maintained, boats are proper dive boats (not converted fishing dhows), and their divemasters have serious experience. They also run snorkel trips to Mnemba. If you're doing a PADI course in Zanzibar, One Ocean is our first recommendation.</p>

<p><strong>Zanzibar Dive Centre:</strong> Based in Nungwi, specialising in north coast sites including Mnemba Atoll. Smaller operation than One Ocean, which means more personalised attention. Good reputation, well-maintained equipment, experienced local divemasters who know the reefs intimately.</p>

<p><strong>Diving Poseidon:</strong> Based in Paje on the east coast. Covers the southeast dive sites that the Nungwi operators don't easily reach. If you're staying on the east coast and want to avoid the long drive to Nungwi for every dive, Diving Poseidon is your best option.</p>

<p><strong>Spanish Dancer Divers:</strong> Based in Stone Town with a focus on south and west coast sites — Chumbe, Bawe, Pange, and the channel sites. Good for guests staying in Stone Town who want to dive without the 1-2 hour transfer to the north coast.</p>

<h2>PADI Courses in Zanzibar</h2>

<p>Zanzibar is an excellent place to learn to dive. Warm water (25-29°C year-round), good visibility, calm conditions during the best season, and lower prices than most tropical dive destinations make it ideal for courses.</p>

<p><strong>PADI Open Water Diver:</strong> $400-$500. The full beginner certification — 3-4 days of theory, confined water skills, and four open-water dives. Once certified, you can dive independently anywhere in the world to 18 metres. This is the course to do if you're serious about diving.</p>

<p><strong>PADI Advanced Open Water:</strong> $300-$400. A 2-day course for certified Open Water divers. Five adventure dives including deep (30 metres) and navigation, plus three electives (night diving, drift diving, underwater photography are popular choices in Zanzibar). Extends your depth limit to 30 metres and opens up sites like Tumbatu and Leven Bank.</p>

<p><strong>PADI Discover Scuba Diving:</strong> $80-$120. A one-day introductory experience — theory, confined water, and one open-water dive to 12 metres. No certification issued, but it's the fastest way to find out if diving is for you. Available at all the operators listed above.</p>

<h2>Best Time for Diving and Snorkelling</h2>

<p>Zanzibar's diving seasons are distinct, and timing your trip matters:</p>

<p><strong>October to March — Best overall conditions.</strong> This is the prime diving season. Visibility reaches 20-40 metres (sometimes more), the sea is calm with minimal current, and water temperature is warm at 27-29°C. The northeast monsoon (kaskazi) brings settled weather and flat seas. Coral spawning events occur in October-November, attracting whale sharks to some sites. December to February is peak tourist season, so book operators and courses in advance.</p>

<p><strong>July to September — Whale season.</strong> Humpback whales pass through Zanzibar's waters on their annual migration from the Antarctic feeding grounds to the warm breeding waters of the western Indian Ocean. Sightings from boats are reasonably common; underwater encounters are rare but possible on deeper dives. The trade-off: the southeast monsoon (kusi) brings rougher seas, stronger currents, and reduced visibility (10-20 metres). Some dive sites — particularly exposed offshore sites like Leven Bank — may be inaccessible during this period. Snorkelling at Mnemba is still possible but conditions are less ideal.</p>

<p><strong>April to June — Rainy season.</strong> Heavy rains reduce visibility significantly (sometimes below 10 metres), and rough seas can cancel boat trips entirely. Most dive operators scale back their schedules. We don't recommend planning a dive-focused trip during these months unless you have flexible dates and can wait for weather windows.</p>

<h2>Pemba Island: For Serious Divers</h2>

<p>If you've dived Zanzibar's main sites and want something more remote, Pemba Island — Zanzibar's lesser-known northern sister island — offers some of the best diving in the Indian Ocean. Misali Island, a marine conservation area off Pemba's west coast, has pristine coral walls dropping into deep channels, pelagic fish encounters, and virtually no other divers. The coral here is among the healthiest in the western Indian Ocean — marine biologists consider it a reference site for what healthy reef ecosystems should look like.</p>

<p>Getting to Pemba: fly from Zanzibar (20 minutes on a small charter or scheduled Auric Air flight) or take the ferry (3-5 hours, departing from Stone Town, not always reliable in rough weather). The infrastructure on Pemba is less developed than Zanzibar — fewer hotels, fewer restaurants, fewer dive operators — which is part of the appeal. Fundu Lagoon and The Aiyana are the standout resorts, both with their own dive centres.</p>

<p>We recommend Pemba for experienced divers (Advanced Open Water or above) who have already explored <a href="/zanzibar-best-beaches/">Zanzibar's main sites</a> and want to step up to more challenging, more remote, and more rewarding diving.</p>

<h2>What to Bring for Underwater Activities</h2>

<ul>
<li><strong>Own mask and snorkel:</strong> If you have them, bring them. Rental gear from operators is functional but your own mask fits your face better, won't leak, and won't fog as much. If you don't own gear, rental is included in all trip prices — it's perfectly fine.</li>
<li><strong>Reef-safe sunscreen:</strong> This is mandatory, not optional. Chemical sunscreens (oxybenzone, octinoxate) kill coral. Use mineral-based sunscreen (zinc oxide, titanium dioxide) or wear a UV rashguard instead. Protect the reef that you came to see.</li>
<li><strong>Underwater camera or GoPro:</strong> Mnemba's turtles, Chumbe's coral gardens, and the colours of the reef are worth capturing. A GoPro with a red filter (corrects the blue colour cast underwater) works well to 10-15 metres. Serious underwater photographers should bring a housing for their main camera.</li>
<li><strong>Rashguard or wetsuit top:</strong> Water is warm (25-29°C) but after 45-60 minutes you can get cold, especially on windier days. A thin rashguard also protects against sunburn and jellyfish stings.</li>
<li><strong>Motion sickness medication:</strong> The boat ride to Mnemba can be choppy, especially July-September. Take Dramamine or similar 30 minutes before boarding if you're prone to seasickness.</li>
</ul>

<h2>Marine Conservation: The Rules</h2>

<p>Zanzibar's reefs are beautiful because they're still relatively healthy. Keep them that way:</p>

<ul>
<li><strong>Don't touch coral.</strong> A single touch can kill years of growth. Coral is a living animal, not a rock.</li>
<li><strong>Don't stand on the reef.</strong> Even in shallow water, find a sandy patch if you need to stand. Standing on coral crushes and kills it.</li>
<li><strong>Don't chase turtles.</strong> Keep a 3-metre distance from all marine life. Turtles at Mnemba are habituated to snorkellers but that doesn't mean they want to be crowded. If a turtle approaches you, stay still and let it set the terms.</li>
<li><strong>Don't feed fish.</strong> It disrupts natural feeding behaviour and can make fish aggressive toward snorkellers.</li>
<li><strong>Take nothing.</strong> No shells, no coral fragments, no starfish. Leave everything in the ocean where it belongs.</li>
<li><strong>Use reef-safe sunscreen.</strong> Worth repeating. Chemical sunscreen is the single biggest human-caused threat to coral reefs worldwide.</li>
</ul>

<p>Every guest we send underwater gets this briefing. The operators we recommend give their own conservation briefing before every trip. Zanzibar's marine economy depends on healthy reefs — and healthy reefs depend on responsible visitors. Be one of the good ones.</p>

<p>Ready to explore what's under the surface? <a href="/zanzibar-travel-guide/">Our Zanzibar travel guide</a> covers everything above water, and <a href="/zanzibar-where-to-stay/">our accommodation guide</a> helps you pick the right base for your underwater adventures.</p>

<div itemscope itemtype="https://schema.org/FAQPage">
<h2>Frequently Asked Questions</h2>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does snorkelling at Mnemba Atoll cost?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A half-day snorkelling trip to Mnemba Atoll costs $30-$50 per person including boat transfer, snorkelling gear, and a guide. Trips depart from Matemwe (closest, 20 minutes by boat), Nungwi, or Kendwa. No experience is needed and life jackets are provided. It's the best value underwater experience in Zanzibar.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I see turtles when snorkelling at Mnemba?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Green and hawksbill turtles are almost guaranteed at Mnemba Atoll — the reef is a known feeding and resting area. Our guests see turtles on roughly 9 out of 10 trips. The turtles are habituated to snorkellers and often swim very close. Keep a 3-metre distance and never touch them.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need a PADI certification to dive in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">For independent diving, yes — you need at least a PADI Open Water certification. For beginners, PADI Discover Scuba Diving ($80-$120) lets you do a supervised dive to 12 metres without certification. If you want to get certified, the full PADI Open Water course takes 3-4 days and costs $400-$500 in Zanzibar — warm water and good visibility make it an excellent place to learn.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is the best time of year for diving in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">October to March offers the best diving conditions — visibility of 20-40 metres, calm seas, and warm water (27-29°C). July to September is whale season (humpback whales migrate through) but brings rougher seas and lower visibility. Avoid April to June when heavy rains reduce visibility significantly and rough seas cancel boat trips.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How much does a PADI Open Water course cost in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">A PADI Open Water course in Zanzibar costs $400-$500 and takes 3-4 days. This includes theory sessions, confined water skills practice, four open-water dives, all equipment rental, and your certification card. Once certified, you can dive independently anywhere in the world to 18 metres depth. We recommend One Ocean as the best operator for courses.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What is Chumbe Island and is it worth visiting?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Chumbe Island Coral Park is a UNESCO-protected marine sanctuary with the healthiest coral reef in Tanzania. Day trips cost about $100 including boat transfer, guided snorkel safari, lunch, and a nature walk. It's pricier than Mnemba snorkelling but the marine life density is noticeably higher. Only snorkelling is allowed (no diving), and the guides are trained marine naturalists. Worth the investment if reef ecology interests you.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I see whale sharks in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Whale sharks visit Zanzibar's waters, primarily between October and March. Sightings are not guaranteed — they're more reliable around Mafia Island (south of Zanzibar). Some dive operators run dedicated whale shark snorkelling trips when sightings are reported. For the best chance, visit during October-November when coral spawning attracts plankton, which attracts whale sharks.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is Pemba Island worth visiting for diving?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Pemba Island offers some of the best diving in the Indian Ocean — pristine coral walls at Misali Island, pelagic encounters, and virtually no other divers. It's worth the trip for experienced divers (Advanced Open Water or above) who've already explored Zanzibar's main sites. Getting there takes 20 minutes by small plane or 3-5 hours by ferry from Stone Town.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">What marine life can I see in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Zanzibar's waters support over 600 fish species, five turtle species (green and hawksbill most common), bottlenose and spinner dolphins, reef sharks (whitetip, blacktip), eagle rays, octopus, moray eels, barracuda, Napoleon wrasse, lionfish, and seasonal visitors including humpback whales (July-September) and whale sharks (October-March). Even a basic snorkelling trip to Mnemba will show you dozens of species.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need to bring my own snorkelling gear?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">No — all operators include snorkelling gear (mask, snorkel, fins) in the trip price. That said, bringing your own mask is recommended if you own one, as it'll fit your face better and won't fog or leak. Rental fins and snorkels work fine. Don't forget reef-safe sunscreen (mineral-based, not chemical) — it's mandatory for protecting the coral.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Which dive operator should I use in Zanzibar?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">We recommend One Ocean (PADI 5-Star, locations in Nungwi, Kendwa, Paje, Stone Town — best all-rounder), Zanzibar Dive Centre (Nungwi — personalised service), Diving Poseidon (Paje — best for east coast), and Spanish Dancer Divers (Stone Town — best for south/west sites). All have proper PADI certification, insurance, and well-maintained equipment.</p>
</div>
</div>

<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Is it safe to snorkel if I'm not a strong swimmer?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes. Life jackets are provided on all snorkelling trips and you can wear them throughout. You don't need to swim — just float face-down and kick gently. Pange Sandbank near Stone Town is the best site for nervous snorkellers (calm, shallow water, 1-3 metres deep). Mnemba trips work for non-swimmers with life jackets, but the open ocean boat ride can be intimidating in rough conditions (July-September).</p>
</div>
</div>

</div>
`;

/* ------------------------------------------------------------------ */
/*  Main — seed both posts                                            */
/* ------------------------------------------------------------------ */

async function main() {
  console.log("Seeding 2 Zanzibar blog posts...\n");

  // Category
  const category = await prisma.category.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });
  console.log("  Category: zanzibar");

  // Tags — Post 1
  const tagStoneTown = await prisma.tag.upsert({
    where: { slug: "stone-town" },
    update: { name: "Stone Town" },
    create: { slug: "stone-town", name: "Stone Town" },
  });
  const tagZanzibar = await prisma.tag.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });
  const tagUNESCO = await prisma.tag.upsert({
    where: { slug: "unesco" },
    update: { name: "UNESCO" },
    create: { slug: "unesco", name: "UNESCO" },
  });
  const tagHeritage = await prisma.tag.upsert({
    where: { slug: "heritage" },
    update: { name: "Heritage" },
    create: { slug: "heritage", name: "Heritage" },
  });

  // Tags — Post 2
  const tagZanzibarDiving = await prisma.tag.upsert({
    where: { slug: "zanzibar-diving" },
    update: { name: "Zanzibar Diving" },
    create: { slug: "zanzibar-diving", name: "Zanzibar Diving" },
  });
  const tagSnorkelling = await prisma.tag.upsert({
    where: { slug: "snorkelling" },
    update: { name: "Snorkelling" },
    create: { slug: "snorkelling", name: "Snorkelling" },
  });
  const tagMnembaAtoll = await prisma.tag.upsert({
    where: { slug: "mnemba-atoll" },
    update: { name: "Mnemba Atoll" },
    create: { slug: "mnemba-atoll", name: "Mnemba Atoll" },
  });
  const tagMarineLife = await prisma.tag.upsert({
    where: { slug: "marine-life" },
    update: { name: "Marine Life" },
    create: { slug: "marine-life", name: "Marine Life" },
  });
  console.log("  Tags upserted");

  // ── Post 1: Stone Town Guide ──────────────────────────────────────
  const post1 = await prisma.blogPost.upsert({
    where: { slug: "stone-town-guide" },
    update: {
      title: "Stone Town Guide: Zanzibar's UNESCO World Heritage Gem",
      excerpt:
        "Complete guide to Stone Town — Zanzibar's UNESCO World Heritage old quarter. History, slave market, House of Wonders, Forodhani night market, carved doors, Freddie Mercury's birthplace, walking tour tips, where to stay ($40-$700), where to eat, and practical advice from a Zanzibar operator.",
      content: stoneTownContent,
      metaTitle: "Stone Town Guide | Walking Tour & Tips 2026",
      metaDescription:
        "Stone Town Zanzibar guide. UNESCO heritage walking tour, slave market, Forodhani food market, carved doors, where to stay and eat. Local operator tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "stone-town-guide",
      title: "Stone Town Guide: Zanzibar's UNESCO World Heritage Gem",
      excerpt:
        "Complete guide to Stone Town — Zanzibar's UNESCO World Heritage old quarter. History, slave market, House of Wonders, Forodhani night market, carved doors, Freddie Mercury's birthplace, walking tour tips, where to stay ($40-$700), where to eat, and practical advice from a Zanzibar operator.",
      content: stoneTownContent,
      metaTitle: "Stone Town Guide | Walking Tour & Tips 2026",
      metaDescription:
        "Stone Town Zanzibar guide. UNESCO heritage walking tour, slave market, Forodhani food market, carved doors, where to stay and eat. Local operator tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post1.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagStoneTown, tagZanzibar, tagUNESCO, tagHeritage]) {
    await prisma.postTag
      .create({ data: { postId: post1.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: stone-town-guide");

  // ── Post 2: Zanzibar Diving & Snorkelling ─────────────────────────
  const post2 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-diving-snorkelling" },
    update: {
      title: "Zanzibar Diving & Snorkelling: Underwater Paradise Guide",
      excerpt:
        "Complete guide to diving and snorkelling in Zanzibar. Mnemba Atoll, Chumbe Island, Pemba Island, dive operators (One Ocean, Zanzibar Dive Centre), PADI courses ($80-$500), best season, marine life (turtles, dolphins, whales), and conservation rules from a Zanzibar operator.",
      content: divingContent,
      metaTitle: "Zanzibar Diving & Snorkelling Guide 2026",
      metaDescription:
        "Zanzibar diving and snorkelling guide. Mnemba Atoll, Chumbe Island, PADI courses, dive operators, best season, turtles, dolphins, prices and tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-diving-snorkelling",
      title: "Zanzibar Diving & Snorkelling: Underwater Paradise Guide",
      excerpt:
        "Complete guide to diving and snorkelling in Zanzibar. Mnemba Atoll, Chumbe Island, Pemba Island, dive operators (One Ocean, Zanzibar Dive Centre), PADI courses ($80-$500), best season, marine life (turtles, dolphins, whales), and conservation rules from a Zanzibar operator.",
      content: divingContent,
      metaTitle: "Zanzibar Diving & Snorkelling Guide 2026",
      metaDescription:
        "Zanzibar diving and snorkelling guide. Mnemba Atoll, Chumbe Island, PADI courses, dive operators, best season, turtles, dolphins, prices and tips.",
      featuredImage: FEATURED_IMAGE,
      isPublished: true,
      author: "Emmanuel Moshi",
      publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory
    .create({ data: { postId: post2.id, categoryId: category.id } })
    .catch(() => {});
  for (const tag of [tagZanzibarDiving, tagSnorkelling, tagMnembaAtoll, tagMarineLife]) {
    await prisma.postTag
      .create({ data: { postId: post2.id, tagId: tag.id } })
      .catch(() => {});
  }
  console.log("  Upserted: zanzibar-diving-snorkelling");

  console.log("\nDone — 2 Zanzibar blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
