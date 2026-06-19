import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL_ACCELERATE,
});

const FEATURED_IMAGE =
  "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp";

const historyContent = `
<p>Zanzibar's history is one of the most extraordinary of any island on earth — a story of monsoon trade winds, Omani sultans, the world's worst slave trade, a spice empire, the shortest war in recorded history, and a revolution that overthrew a centuries-old monarchy in a single day. Understanding this history transforms your visit from a beach holiday into something deeper. Every carved door in <a href="/stone-town-guide/">Stone Town</a>, every crumbling palace, and every spice farm tells a chapter of this story.</p>

<h2>Early Settlement (1st–10th Century)</h2>
<p>The earliest inhabitants of Zanzibar were Bantu-speaking peoples who migrated from the African mainland around the 1st millennium AD. They were farmers and fishermen who established small settlements along the coast. Archaeological evidence at sites like Unguja Ukuu (on Zanzibar's southeast coast) shows trade connections with the Persian Gulf, India, and China dating back to at least the 6th century.</p>
<p>By the 8th–10th century, Zanzibar was part of the Swahili coast trading network — a chain of city-states stretching from Mogadishu to Mozambique. These coastal communities traded ivory, gold, and enslaved people from the interior for cloth, pottery, glass beads, and metalwork from the Arabian Peninsula and India. The Swahili language itself emerged from this cultural exchange — a Bantu language with heavy Arabic and Persian vocabulary.</p>

<h2>Persian Shirazi Influence (10th–15th Century)</h2>
<p>Legend holds that Shirazi merchants from Persia (modern Iran) arrived in the 10th century and intermarried with local Bantu populations, creating a mixed Afro-Persian ruling class. While the historical accuracy of the "Shirazi migration" is debated by scholars, the Persian influence is undeniable: in architecture, in cuisine (the biryani and pilau that are now Zanzibar staples), in the Islamic faith that took root, and in the DNA of Zanzibar's population.</p>
<p>During this period, Zanzibar was not yet the dominant power in the region — that role belonged to Kilwa Kisiwani, a city-state further south that controlled the gold trade from Great Zimbabwe. But Zanzibar's natural harbour and central position on the coast made it an increasingly important stop for monsoon-driven trade.</p>

<h2>Portuguese Era (1498–1698)</h2>
<p>Vasco da Gama's arrival on the East African coast in 1498 changed everything. The Portuguese, seeking to control the lucrative Indian Ocean spice trade, systematically conquered the Swahili coast city-states. Zanzibar fell under Portuguese control by 1503. They built Fort Jesus in Mombasa (1593) and maintained a presence on Zanzibar, though their control was often contested.</p>
<p>The Portuguese period was characterised by extraction rather than development. They imposed taxes on trade, disrupted existing commercial networks, and introduced Christianity (with limited success on the Muslim coast). Their architectural legacy in Zanzibar is minimal — unlike in Mombasa, where Fort Jesus still stands. After nearly 200 years, the Portuguese were expelled from Zanzibar by Omani Arabs in 1698.</p>

<h2>Omani Arab Rule (1698–1890)</h2>
<p>The Sultanate of Oman had been a maritime power in the Indian Ocean for centuries, and the expulsion of the Portuguese from East Africa brought Zanzibar firmly into the Omani sphere. The pivotal moment came in 1832, when Sultan Seyyid Said moved his entire court from Muscat to Stone Town — making Zanzibar the capital of the Omani Empire.</p>

<h3>The Spice Empire</h3>
<p>Sultan Said transformed Zanzibar into the world's largest clove producer, ordering plantations established across Unguja and Pemba Island. Within decades, Zanzibar supplied over 90% of the world's cloves. The spice wealth financed the construction of Stone Town's grand merchant houses, the Sultan's palaces, and a thriving cosmopolitan city. Visit a <a href="/zanzibar-spice-tour-guide/">spice farm today</a> to see the living legacy.</p>

<h3>The Slave Trade</h3>
<p>The darkest chapter in Zanzibar's history is inseparable from its most prosperous. The same trade winds that carried spices to the world also carried enslaved people. Zanzibar was the centre of the East African slave trade from the 17th to 19th centuries. At its peak in the mid-1800s, an estimated 50,000 enslaved people passed through Zanzibar's markets annually.</p>
<p>Enslaved men, women, and children were captured from the interior of the African continent — from as far as present-day Congo, Malawi, and Mozambique — and marched to the coast in coffles (chained groups). Many died on the journey. Those who survived were brought to Zanzibar, held in underground chambers, and sold at public auction. They were sent to clove plantations on Zanzibar and Pemba, to Oman and the Persian Gulf, and to plantations across the Indian Ocean world.</p>
<p>The slave market operated openly in Stone Town until 1873, when Sultan Barghash was pressured by the British to close it. The Anglican Cathedral (Christ Church) was deliberately built on the site of the former market — its altar stands on the exact spot of the whipping post where enslaved people were beaten to demonstrate their "resilience" to potential buyers. The underground chambers where people were held can still be visited — a sobering, essential experience.</p>

<h2>British Protectorate (1890–1963)</h2>
<p>Britain declared Zanzibar a protectorate in 1890, maintaining the Sultan as a figurehead while exercising real control. The British period saw the abolition of slavery (formally in 1897, though it persisted underground for years), the construction of roads and basic infrastructure, and the introduction of modern education.</p>

<h3>The Shortest War in History</h3>
<p>When Sultan Hamad bin Thuwaini died on 25 August 1896, his nephew Khalid bin Barghash seized the palace without British approval. The British issued an ultimatum: stand down by 9:00 AM on 27 August. Khalid refused. At 9:02 AM, five British warships opened fire on the palace. By 9:40 AM — 38 minutes later — it was over. The Anglo-Zanzibar War remains the shortest recorded war in history. Khalid fled to the German consulate and eventually to Dar es Salaam.</p>

<h2>Independence and Revolution (1963–1964)</h2>
<p>Zanzibar gained independence from Britain on 10 December 1963 as a constitutional monarchy under Sultan Jamshid bin Abdullah. The independence was short-lived. On 12 January 1964 — barely a month later — a violent revolution overthrew the Sultan.</p>
<p>The revolution was led by John Okello, a Ugandan-born activist, and supported by the Afro-Shirazi Party representing the African majority. The Arab and Indian merchant class who had dominated Zanzibar's economy for centuries were targeted. An estimated 5,000-20,000 people were killed (numbers are disputed), and thousands more fled. The Sultan escaped by yacht to exile in Britain, where his family still lives.</p>
<p>The revolution remains a sensitive topic in Zanzibar. It's celebrated annually on 12 January as Zanzibar Revolution Day, but the violence and ethnic dimensions make it uncomfortable history. You won't see much about it in museums — the Peace Memorial Museum touches on it lightly, and locals will discuss it if asked, but it's not commemorated the way the slave trade is.</p>

<h2>Union with Tanganyika (1964–Present)</h2>
<p>On 26 April 1964, Zanzibar merged with mainland Tanganyika to form the United Republic of Tanzania. The merger was driven by Cold War politics — both the Soviet Union and China had shown interest in revolutionary Zanzibar, and the union was partly a move to anchor the islands within a pro-Western framework.</p>
<p>Zanzibar today is semi-autonomous: it has its own president, legislature, and government for internal affairs (education, health, land, trade), while defence, foreign policy, and immigration are handled by the union government in Dodoma. The same visa covers both mainland Tanzania and Zanzibar. Zanzibaris have a distinct identity — the culture, food, religion (95%+ Muslim vs mainland Christianity/Islam mix), and architecture are noticeably different from the mainland.</p>

<h2>Historical Sites to Visit</h2>

<h3>Slave Market Memorial & Anglican Cathedral</h3>
<p>The most important historical site in Zanzibar. The underground slave chambers, the memorial sculpture, and the cathedral built on the former market site. Entry: $8, includes a guide. Plan 45-60 minutes. Emotionally heavy but essential.</p>

<h3>Old Fort (Ngome Kongwe)</h3>
<p>Built by Omani Arabs in 1699 on the site of a Portuguese chapel, the Old Fort is Stone Town's most recognisable landmark. Today it hosts cultural events, a small amphitheatre, craft vendors, and a café. Free entry. Worth 30 minutes.</p>

<h3>Palace Museum (Beit el-Sahel)</h3>
<p>The Sultan's former palace, now a museum documenting the royal family's life and the sultanate era. Furniture, clothing, photographs, and ceremonial objects from the 19th and early 20th centuries. Entry: $3-$5. Plan 45 minutes.</p>

<h3>House of Wonders (Beit el-Ajaib)</h3>
<p>Once the largest building in East Africa and the first in Zanzibar to have electricity and an elevator (hence the "wonder"). Badly damaged by a partial collapse in 2020, it's currently under restoration funded by the Aga Khan Trust for Culture. You can view the exterior and restoration progress. When complete, it will be a world-class museum.</p>

<h3>Livingstone's House</h3>
<p>The building where Dr David Livingstone stayed before his final expedition into the African interior in 1866. A small plaque marks the spot on the upper floor. Now houses the Zanzibar Tourism Commission offices. Quick visit — 10 minutes.</p>

<h3>Maruhubi Palace Ruins</h3>
<p>The ruins of Sultan Barghash's harem palace, built in 1882 and destroyed by fire in 1899. The Persian-style bathhouses and carved columns are still visible among the tropical vegetation. 3 km north of Stone Town. Entry: $3. Atmospheric and uncrowded.</p>

<h3>Freddie Mercury's Birthplace</h3>
<p>Farrokh Bulsara — later known as Freddie Mercury of Queen — was born in Stone Town on 5 September 1946 to Parsi Indian parents. The building on Kenyatta Road is now marked with a small plaque. A small museum/shop nearby sells Queen memorabilia. Mercury left Zanzibar at age 17 and never returned, but his birthplace is one of Stone Town's most photographed spots.</p>

<h2>Frequently Asked Questions</h2>

<h3>Was Zanzibar part of Oman?</h3>
<p>Yes — from 1698 to 1856, Zanzibar was governed by the Sultanate of Oman, and from 1832 to 1856, it served as the Omani Empire's capital. After Sultan Said's death in 1856, the empire split into the Sultanate of Zanzibar and the Sultanate of Muscat and Oman. Zanzibar became a British protectorate in 1890.</p>

<h3>What happened in the Zanzibar Revolution?</h3>
<p>On 12 January 1964, the African-majority Afro-Shirazi Party overthrew the Arab Sultan and the ruling class in a violent revolution. An estimated 5,000-20,000 people were killed, thousands fled, and the centuries-old Arab-Indian mercantile elite was displaced. The revolution led directly to the union with Tanganyika to form Tanzania.</p>

<h3>Is Zanzibar part of Tanzania?</h3>
<p>Yes — since 26 April 1964. Zanzibar is a semi-autonomous region with its own president and government for local affairs, but foreign policy, defence, and immigration are managed by the union government. The same visa covers both mainland Tanzania and Zanzibar.</p>

<h3>Who was Freddie Mercury?</h3>
<p>Born Farrokh Bulsara in Stone Town on 5 September 1946, he became the legendary lead singer of Queen. His parents were Parsi Indians from British-ruled India who had settled in Zanzibar. He attended school in India from age 8 and moved to England at age 17. He never returned to Zanzibar.</p>

<h3>What was the slave trade in Zanzibar?</h3>
<p>Zanzibar was the centre of the East African slave trade from the 17th to 19th centuries. At its peak, 50,000 enslaved people passed through Zanzibar's markets annually. They were captured from the African interior and sold to work on Zanzibar's clove plantations, in Oman and the Persian Gulf, and across the Indian Ocean. The slave market was closed in 1873 under British pressure.</p>

<h3>What is the shortest war in history?</h3>
<p>The Anglo-Zanzibar War on 27 August 1896 lasted 38 minutes. It was fought between the British Empire and the Sultan of Zanzibar over a disputed succession. Five British warships bombarded the Sultan's palace; the Sultan surrendered and fled. It remains the shortest recorded war.</p>

<h3>Should I visit the slave chambers?</h3>
<p>Yes — if you can handle the emotional weight. The underground chambers where enslaved people were held before auction are preserved as a memorial. Guided tours provide essential context about the scale and horror of the trade. It's one of the most important historical sites in East Africa and fundamental to understanding Zanzibar.</p>

<h3>What language do they speak in Zanzibar?</h3>
<p>Swahili (Kiswahili) — it's the first language for nearly all Zanzibaris. English is widely spoken in tourist areas. Some older residents speak Arabic (reflecting the Omani heritage). Hindi and Gujarati are spoken by the remaining Indian community. Swahili itself emerged as a trade language on this coast — a Bantu language with extensive Arabic, Persian, and Portuguese vocabulary.</p>

<h3>When is the best time to visit historical sites?</h3>
<p>Year-round — historical sites are indoors or sheltered. However, <a href="/zanzibar-things-to-do/">Stone Town walking tours</a> are more comfortable in the dry season (June-October) when it's less humid. Early morning is best for photography (soft light, fewer people in the alleys).</p>

<h3>Are there any good books about Zanzibar's history?</h3>
<p>"Zanzibar: City, Island, and Coast" by Richard Burton (1872) is the classic colonial-era account. For the slave trade, "The Last Slave Market" by Alastair Hazell. For the revolution, "Memoirs of an Arabian Princess" by Princess Emily Ruete (a Sultan's daughter who eloped with a German merchant) gives a fascinating insider view of 19th-century court life. "Zanzibar" by Giles Foden is an excellent modern history.</p>
`;

const nightlifeContent = `
<p>Let's set expectations: Zanzibar is not Ibiza, Bali, or even Dar es Salaam. It's a predominantly Muslim island where 95% of the population doesn't drink alcohol. But within the tourist ecosystem — <a href="/zanzibar-best-beaches/">beach bars</a>, hotel lounges, rooftop terraces, and the legendary Full Moon party — there's a genuine nightlife scene that ranges from mellow sunset drinks to dancing on the sand until 3am. Here's what to expect and where to go.</p>

<h2>Understanding the Context</h2>
<p>Alcohol is available in Zanzibar, but it exists within a specific context. Tourist hotels, beach bars, and licensed restaurants serve beer, cocktails, and wine freely. Local establishments in villages and residential areas generally do not. This isn't a legal restriction — alcohol is legal in Tanzania — but a cultural norm. Respect it: don't walk through villages visibly drunk, don't drink in the street, and dress modestly when you're not at a resort.</p>
<p>The nightlife scene is concentrated in three areas: Nungwi (the liveliest), Kendwa (home of the Full Moon party), and Stone Town (rooftop bars and cultural experiences). The east coast (Paje, Jambiani) has a quieter bar scene that caters to kite surfers and backpackers.</p>

<h2>Nungwi: The Party Coast</h2>
<p>Nungwi has the most developed nightlife on the island — not wild by international standards, but lively enough that you'll always find somewhere open and buzzing.</p>

<h3>Top Spots</h3>
<ul>
<li><strong>Z Bar (Z Hotel):</strong> The sunset bar at Z Hotel is Nungwi's social epicentre. Beautiful infinity pool backdrop, craft cocktails ($8-$12), DJ sets on weekends, and a crowd that's a mix of hotel guests and walk-ins. Dress: smart-casual. Open until midnight most nights, later on weekends.</li>
<li><strong>Cholo's Bar:</strong> Right on the beach, more relaxed than Z Bar. Cold beer ($3-$5), Swahili food, live music some evenings, and a sand-floor vibe that captures the barefoot Zanzibar spirit. Popular with long-stay visitors and locals who work in tourism.</li>
<li><strong>Langi Langi Beach Bar:</strong> Beachfront bar with sunset views, reasonably priced drinks ($3-$6 for beer, $6-$10 cocktails), and a relaxed crowd. Good for early evening drinks before dinner.</li>
<li><strong>Jambo Brothers:</strong> More local-feeling, with regular live music nights featuring taarab (traditional Zanzibari music combining Arab melodies with African rhythms). Beer is cheapest here ($2-$3). Authentic atmosphere.</li>
</ul>
<p><strong>The Nungwi pattern:</strong> Sunset drinks at Z Bar or on the beach → dinner at a beachfront restaurant → back to a bar for live music or DJ sets → beach bonfire (some spots do these on weekends). Things wind down by 1-2am most nights.</p>

<h2>Kendwa: The Full Moon Party</h2>
<p>Kendwa Rocks has hosted Zanzibar's most famous party for over two decades. Once a month, on or near the full moon, the beach transforms into an all-night celebration with DJs, fire dancers, acrobats, live bands, and hundreds of partygoers from across the island.</p>

<h3>Full Moon Party Details</h3>
<table>
<thead><tr><th>Detail</th><th>Info</th></tr></thead>
<tbody>
<tr><td>When</td><td>Monthly, 1-2 days around the full moon (check Kendwa Rocks social media for dates)</td></tr>
<tr><td>Time</td><td>Starts at sunset (~6pm), peaks 10pm-2am, goes until 4-5am</td></tr>
<tr><td>Entry</td><td>Free for Kendwa Rocks guests, $5-$10 for non-guests</td></tr>
<tr><td>Drinks</td><td>Beer $3-$5, cocktails $6-$10, available from multiple bars</td></tr>
<tr><td>Music</td><td>Mix of house, afrobeats, reggae, and live percussion</td></tr>
<tr><td>Crowd</td><td>200-500 people on busy nights (peak season), 50-150 off-season</td></tr>
<tr><td>Vibe</td><td>Beach party, not nightclub. Barefoot, sandy, under the moonlight</td></tr>
</tbody>
</table>

<p><strong>Tips for the Full Moon party:</strong></p>
<ul>
<li>Arrive by sunset for the best spot and to watch the fire dancers during golden hour</li>
<li>Bring only what you need (phone, cash, room key) — leave valuables at the hotel</li>
<li>Cash only at most drink stations</li>
<li>Arrange transport back to your hotel in advance if you're not staying at Kendwa Rocks — taxis are scarce after midnight</li>
<li>Pace yourself — the party goes all night and the equatorial heat + alcohol is a potent combination</li>
</ul>

<h3>Beyond Full Moon</h3>
<p>On non-party nights, Kendwa is quiet. Sunset drinks at Kendwa Rocks beach bar are pleasant, and the hotel restaurants are good, but there's no nightlife scene comparable to Nungwi. If you want evening entertainment between Full Moons, stay in Nungwi and visit Kendwa for the party itself (15 minutes by taxi, $10-$15).</p>

<h2>Stone Town: Culture After Dark</h2>
<p>Stone Town's evening scene is completely different from the beach — sophisticated, cultural, and centred around rooftop terraces and historic venues.</p>

<h3>Sunset Spots</h3>
<ul>
<li><strong>Africa House Hotel Terrace:</strong> Stone Town's most famous sunset venue. The wide terrace overlooks the ocean, and watching the sun drop behind the dhow harbour with a cold Kilimanjaro beer ($3-$4) is a daily ritual for visitors and residents alike. Arrive by 5:30pm for a good seat. Cocktails $6-$10.</li>
<li><strong>Emerson Spice Rooftop:</strong> The rooftop at Emerson Spice hosts a nightly multi-course dinner experience with harbour views. Not a bar in the traditional sense — it's a curated dining event — but one of the most atmospheric evening experiences in Zanzibar. Book in advance.</li>
<li><strong>Tea House Rooftop:</strong> Less famous than Africa House, so easier to get a table. Good cocktails, sunset views, and a quieter atmosphere. A hidden gem.</li>
</ul>

<h3>Evening Bars & Venues</h3>
<ul>
<li><strong>Mercury's:</strong> Named after Freddie Mercury (born in Stone Town). A waterfront restaurant and bar that's one of the few late-night options in Stone Town. Live music on some evenings, decent cocktails, open until midnight or later. The Freddie Mercury connection is loosely interpreted — don't expect a Queen tribute night.</li>
<li><strong>Livingstone's Beach Restaurant:</strong> Set on the beach south of Stone Town, with live music, seafood, and a more relaxed bar atmosphere than the central Stone Town venues. Good sunset and evening option if you want sand under your feet.</li>
<li><strong>Tatu:</strong> A bar-restaurant in a restored Stone Town building. Cocktails are among the best on the island ($8-$12), and the interior design is striking. More upscale than most Stone Town options.</li>
</ul>

<h3>Forodhani Gardens</h3>
<p>Not nightlife in the conventional sense, but Stone Town's legendary night food market is the evening experience that most visitors remember best. From sunset until about 10pm, vendors grill seafood, serve Zanzibar pizza, and offer fresh juices on the waterfront. It's social, delicious, and atmospheric. Budget $5-$15 for a feast. See our <a href="/zanzibar-food-guide/">food guide</a> for what to order.</p>

<h2>East Coast: Kite Surfer Vibes</h2>
<p>Paje and Jambiani have a quieter, more laid-back bar scene that revolves around the kite surfing community.</p>
<ul>
<li><strong>Paje by Night:</strong> The social hub of Paje. Pool, bar, dorm rooms, and a crowd of international kite surfers. Live music and DJ nights weekly during peak season. Beer $3-$4, cocktails $6-$8. Open late.</li>
<li><strong>Mr Kahawa:</strong> A quirky beachfront bar-restaurant in Paje with fire pits, hammocks, and a more mellow vibe. Great for sunset drinks.</li>
<li><strong>Jambiani:</strong> Very quiet after dark. A few guesthouse bars serve drinks, but don't come to Jambiani expecting nightlife. It's a place to sleep deeply after a day of walking the tidal flats.</li>
</ul>

<h2>Live Music & Cultural Performances</h2>

<h3>Taarab Music</h3>
<p>Taarab is Zanzibar's signature musical tradition — a fusion of Arab melodic structures, Indian instruments (harmonium, tabla), and African rhythms. Performances feature a large orchestra with a female vocalist singing poetry about love, loss, and social commentary. The Dhow Countries Music Academy in Stone Town hosts regular performances ($5-$10). It's unlike anything you'll hear elsewhere — deeply emotional and genuinely beautiful.</p>

<h3>Old Fort Performances</h3>
<p>The Old Fort in Stone Town hosts cultural events, including live music, dance, and film screenings, particularly during the Zanzibar International Film Festival (ZIFF, held in July). Check the schedule at the fort entrance. Events are often free or $3-$5.</p>

<h2>Drink Prices</h2>
<table>
<thead><tr><th>Drink</th><th>Local Bar</th><th>Beach Bar</th><th>Hotel Bar</th></tr></thead>
<tbody>
<tr><td>Safari Lager (beer)</td><td>$2-$3</td><td>$3-$5</td><td>$4-$6</td></tr>
<tr><td>Kilimanjaro (beer)</td><td>$2-$3</td><td>$3-$5</td><td>$4-$6</td></tr>
<tr><td>Cocktail</td><td>$4-$6</td><td>$6-$10</td><td>$8-$14</td></tr>
<tr><td>Glass of wine</td><td>$5-$8</td><td>$6-$10</td><td>$8-$15</td></tr>
<tr><td>Fresh juice</td><td>$1-$2</td><td>$3-$5</td><td>$4-$6</td></tr>
<tr><td>Zanzibar coffee</td><td>$0.25-$0.50</td><td>$2-$3</td><td>$3-$5</td></tr>
</tbody>
</table>
<p>Local beers (Safari, Kilimanjaro, Serengeti) are good quality lagers. Imported beers and wines are significantly more expensive. Spirits are available but quality varies — stick to known brands. Fresh fruit cocktails (passion fruit, mango, coconut) are a highlight and often better than the spirit-based options.</p>

<h2>Safety at Night</h2>
<ul>
<li>Stick to well-lit, populated areas — especially in Stone Town's narrow alleys</li>
<li>Use a reputable taxi to and from venues (your hotel can arrange)</li>
<li>Don't walk on empty beaches alone at night</li>
<li>Keep valuables at the hotel — carry only what you need</li>
<li>Drink responsibly — equatorial heat intensifies alcohol's effects</li>
<li>Be cautious with beach boys who may approach you at night offering various services</li>
<li>Solo women should exercise standard precautions — trust instincts, tell someone where you're going</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Is there nightlife in Zanzibar?</h3>
<p>Yes, but calibrate your expectations. Nungwi has beach bars open until 1-2am. Kendwa has the monthly Full Moon party. Stone Town has rooftop bars and cultural experiences. It's not a party island — it's a beach island with some nightlife options.</p>

<h3>When is the Full Moon party in Zanzibar?</h3>
<p>Monthly at Kendwa Rocks, on or near the full moon. Dates shift each month — check Kendwa Rocks' social media or website for the exact schedule. The biggest parties are during peak season (July-August, December-January).</p>

<h3>Can you drink alcohol in Zanzibar?</h3>
<p>Yes — alcohol is legal and available at tourist hotels, beach bars, and licensed restaurants. It's not available in most local establishments or in village areas. Zanzibar is predominantly Muslim, so drink respectfully: don't carry open containers in public, don't drink visibly in non-tourist areas, and don't walk through villages intoxicated.</p>

<h3>What is the best sunset bar in Zanzibar?</h3>
<p>Africa House Hotel Terrace in Stone Town for historic atmosphere. Z Bar at Z Hotel in Nungwi for modern sophistication. Kendwa Rocks for beach vibes. All three face west and offer spectacular sunsets over the Indian Ocean.</p>

<h3>Is Zanzibar safe at night?</h3>
<p>Tourist areas (Nungwi, Kendwa, hotel beaches) are very safe at night. Stone Town requires more awareness — stick to main streets, use taxis in the narrow alleys after dark, and be cautious of your surroundings. Avoid empty beaches at night anywhere on the island. See our <a href="/zanzibar-travel-guide/">travel guide</a> for general safety advice.</p>

<h3>What should I wear to go out in Zanzibar?</h3>
<p>Beach bars: casual (shorts, t-shirt, flip-flops). Hotel bars: smart-casual (no swimwear). Stone Town: cover shoulders and knees as a baseline — the bars themselves are relaxed but you'll walk through residential areas to reach them. The Full Moon party: whatever you'd wear to a beach party (you'll end up sandy).</p>

<h3>What is taarab music?</h3>
<p>Zanzibar's traditional musical form, blending Arab melodic structures with African rhythms and Indian instruments. Performed by large orchestras with female vocalists singing Swahili poetry. The Dhow Countries Music Academy in Stone Town hosts regular performances. It's one of Zanzibar's most authentic cultural experiences.</p>

<h3>Where is the cheapest drinking in Zanzibar?</h3>
<p>Paje and Jambiani on the east coast have the lowest drink prices ($2-$3 beer). In Nungwi, Cholo's and Jambo Brothers are cheaper than hotel bars. In Stone Town, the rooftop bars charge moderate prices ($3-$5 beer). The cheapest option everywhere: buy from a shop ($1-$1.50 per bottle) and drink at your guesthouse.</p>

<h3>Are there clubs in Zanzibar?</h3>
<p>No dedicated nightclubs in the Western sense. The closest experience is the Full Moon party at Kendwa Rocks. Some Nungwi beach bars bring in DJs and create a club-like atmosphere on weekends during peak season. If you want proper club nightlife, Dar es Salaam (a ferry ride away) has a vibrant scene.</p>

<h3>Can I go out alone in Zanzibar?</h3>
<p>Yes, with normal precautions. Nungwi's beach bars are social and welcoming to solo visitors. Stone Town's rooftop bars are comfortable for solo drinks. The Full Moon party is very solo-friendly — you'll meet people. <a href="/zanzibar-where-to-stay/">Hostels in Paje</a> and Stone Town are great for connecting with other solo travellers.</p>
`;

async function main() {
  console.log("Seeding 2 Zanzibar blog posts (history + nightlife)...\n");

  const category = await prisma.category.upsert({
    where: { slug: "zanzibar" },
    update: { name: "Zanzibar" },
    create: { slug: "zanzibar", name: "Zanzibar" },
  });

  const tagZanzibar = await prisma.tag.upsert({ where: { slug: "zanzibar" }, update: { name: "Zanzibar" }, create: { slug: "zanzibar", name: "Zanzibar" } });
  const tagHistory = await prisma.tag.upsert({ where: { slug: "zanzibar-history" }, update: { name: "Zanzibar History" }, create: { slug: "zanzibar-history", name: "Zanzibar History" } });
  const tagCulture = await prisma.tag.upsert({ where: { slug: "culture" }, update: { name: "Culture" }, create: { slug: "culture", name: "Culture" } });
  const tagStoneTown = await prisma.tag.upsert({ where: { slug: "stone-town" }, update: { name: "Stone Town" }, create: { slug: "stone-town", name: "Stone Town" } });
  const tagNightlife = await prisma.tag.upsert({ where: { slug: "nightlife" }, update: { name: "Nightlife" }, create: { slug: "nightlife", name: "Nightlife" } });
  const tagBeachBars = await prisma.tag.upsert({ where: { slug: "beach-bars" }, update: { name: "Beach Bars" }, create: { slug: "beach-bars", name: "Beach Bars" } });
  const tagFullMoon = await prisma.tag.upsert({ where: { slug: "full-moon-party" }, update: { name: "Full Moon Party" }, create: { slug: "full-moon-party", name: "Full Moon Party" } });

  const post1 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-history-guide" },
    update: {
      title: "A Brief History of Zanzibar: From Spice Trade to Independence",
      excerpt: "Zanzibar's fascinating history — Omani sultans, the spice empire, the slave trade, the shortest war ever, revolution, and the sites where this history lives today.",
      content: historyContent,
      metaTitle: "History of Zanzibar | Spice Trade to Revolution",
      metaDescription: "Zanzibar's history from Omani sultans and the slave trade to the 38-minute war and 1964 revolution. Historical sites to visit in Stone Town.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-history-guide",
      title: "A Brief History of Zanzibar: From Spice Trade to Independence",
      excerpt: "Zanzibar's fascinating history — Omani sultans, the spice empire, the slave trade, the shortest war ever, revolution, and the sites where this history lives today.",
      content: historyContent,
      metaTitle: "History of Zanzibar | Spice Trade to Revolution",
      metaDescription: "Zanzibar's history from Omani sultans and the slave trade to the 38-minute war and 1964 revolution. Historical sites to visit in Stone Town.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post1.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagHistory, tagCulture, tagStoneTown]) {
    await prisma.postTag.create({ data: { postId: post1.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-history-guide");

  const post2 = await prisma.blogPost.upsert({
    where: { slug: "zanzibar-nightlife-guide" },
    update: {
      title: "Zanzibar Nightlife: Beach Bars, Full Moon Parties & Sunset Spots",
      excerpt: "Guide to Zanzibar nightlife — Nungwi beach bars, Kendwa Full Moon party, Stone Town rooftop terraces, drink prices, live music, and what to expect after dark.",
      content: nightlifeContent,
      metaTitle: "Zanzibar Nightlife | Bars & Full Moon Party",
      metaDescription: "Zanzibar nightlife guide: Nungwi beach bars, Kendwa Full Moon party, Stone Town rooftops, taarab music, drink prices, and safety tips.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
    create: {
      slug: "zanzibar-nightlife-guide",
      title: "Zanzibar Nightlife: Beach Bars, Full Moon Parties & Sunset Spots",
      excerpt: "Guide to Zanzibar nightlife — Nungwi beach bars, Kendwa Full Moon party, Stone Town rooftop terraces, drink prices, live music, and what to expect after dark.",
      content: nightlifeContent,
      metaTitle: "Zanzibar Nightlife | Bars & Full Moon Party",
      metaDescription: "Zanzibar nightlife guide: Nungwi beach bars, Kendwa Full Moon party, Stone Town rooftops, taarab music, drink prices, and safety tips.",
      featuredImage: FEATURED_IMAGE, isPublished: true, author: "Emmanuel Moshi", publishedAt: new Date("2026-06-19"),
    },
  });

  await prisma.postCategory.create({ data: { postId: post2.id, categoryId: category.id } }).catch(() => {});
  for (const tag of [tagZanzibar, tagNightlife, tagBeachBars, tagFullMoon]) {
    await prisma.postTag.create({ data: { postId: post2.id, tagId: tag.id } }).catch(() => {});
  }
  console.log("  Upserted: zanzibar-nightlife-guide");

  console.log("\nDone — 2 Zanzibar blog posts seeded.");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
