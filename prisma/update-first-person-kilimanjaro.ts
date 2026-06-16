import "dotenv/config";
import prisma from "../src/lib/prisma";

const content = `
<p class="lead">On October 6, 1889, German geographer Hans Meyer and Austrian mountaineer Ludwig Purtscheller stood on the highest point in Africa. Their successful summit of Mount Kilimanjaro came after two failed expeditions, a kidnapping, and years of obsession. The story of who truly got there first remains contested to this day.</p>

<h2>Why the First Ascent Matters</h2>

<p>Kilimanjaro had repelled every European attempt for four decades before Meyer's 1889 triumph. Standing at 5,895 meters, the mountain's equatorial glaciers, unpredictable weather, and altitude sickness made it one of the great unsolved challenges of 19th-century exploration. The first successful ascent proved that Africa's highest peak could be climbed without technical rope systems&mdash;a fact that opened the mountain to generations of climbers who followed.</p>

<p>Understanding this history matters for anyone planning to climb Kilimanjaro today. The routes, strategies, and even the glaciers you'll encounter connect directly back to those first expeditions over 135 years ago.</p>

<h2>The Expedition Team</h2>

<h3>Hans Meyer (1858&ndash;1929)</h3>

<p>Hans Heinrich Joseph Meyer was a German geographer, publisher, and professor at the University of Leipzig. Born into the wealthy Meyer publishing family (Bibliographisches Institut), he had both the intellectual curiosity and financial resources to fund major expeditions. Meyer's fascination with East African geography drove him to attempt Kilimanjaro three separate times before succeeding.</p>

<p>In his 1891 book <em>Across East African Glaciers: An Account of the First Ascent of Kilimanjaro</em>, Meyer openly acknowledged a nationalistic motivation. He wrote that "it seemed to me to be almost a national duty that a German should be the first to tread the summit of this mountain, probably the loftiest in Africa, and certainly the highest in the German Empire."</p>

<h3>Ludwig Purtscheller (1849&ndash;1900)</h3>

<p>Ludwig Purtscheller was an Austrian teacher, mountaineer, and guidebook author with more than 1,600 peaks on his record&mdash;making him one of the most experienced alpinists alive at the time. Meyer specifically recruited Purtscheller for the 1889 expedition because previous attempts had failed at the glacier barrier. Purtscheller brought the ice-climbing expertise that Meyer lacked.</p>

<p>Remarkably, the team reached the summit on October 6, 1889&mdash;Purtscheller's 40th birthday.</p>

<h3>The Guide Controversy: Muini Amani vs. Yohani Kinyala Lauwo</h3>

<p>The identity of the local guide who accompanied Meyer highest on the mountain is one of Kilimanjaro's most enduring historical disputes.</p>

<p><strong>The official Tanzanian position</strong> credits Yohani Kinyala Lauwo, a young Chagga man from Marangu, as the first African to reach the summit. In 1989, the centennial organizing committee formally recognized Lauwo, and a memorial plaque was installed at Marangu Gate in 2015.</p>

<p><strong>The documentary evidence</strong> tells a different story. In every original account published by both Meyer and Purtscheller, only one local companion is named at the high camps: <strong>Muini Amani</strong>, a man from Pangani. Purtscheller's detailed description of October 6, 1889, specifically identifies Amani as the porter who accompanied them to the highest bivouac sites, where he cooked and supplied them with water and firewood while they made their crater ascents.</p>

<p>The case against Lauwo rests on several inconsistencies. His claimed birth year of 1871 would make him 125 years old at his death in 1996&mdash;which would make him the oldest person who ever lived. Lauwo himself could not recall the names Meyer or Purtscheller during interviews, though he remembered joining a Kilimanjaro expedition. He once claimed that Johannes Notch was named after him, though Meyer documented naming it after Captain Johannes, the governor of Moshi.</p>

<p>What is not disputed: Meyer's expedition employed a team of 16 Chagga porters, two local headmen, a cook, and additional guides. Local knowledge was essential to the success of every attempt. Regardless of which individual reached the highest point, the Chagga community's support made the ascent possible.</p>

<h2>Failed Attempts Before 1889</h2>

<h3>The First Europeans to See Kilimanjaro</h3>

<p>In 1848, German missionary <strong>Johannes Rebmann</strong> became the first European to see Kilimanjaro and report its snow cap. His account was initially ridiculed by the Royal Geographical Society in London&mdash;armchair geographers refused to believe a snow-capped mountain could exist so near the equator. It took over a decade for his observation to be accepted.</p>

<h3>Baron Carl Claus von der Decken (1861&ndash;1862)</h3>

<p>The German-Baltic baron made two serious attempts in 1861 and 1862, reaching approximately 4,200 meters. He was the first to confirm the mountain's great height through barometric measurements and established that climbing beyond the forest zone was physically possible.</p>

<h3>Charles New (1871)</h3>

<p>British missionary Charles New reached the snow line at roughly 4,000 meters in 1871, becoming the first European to touch Kilimanjaro's ice. He provided the first detailed description of the mountain's ecological zones.</p>

<h3>Count Samuel Teleki (1887)</h3>

<p>Hungarian Count Samuel Teleki made the most serious pre-Meyer assault in 1887. Leading an expedition of over 300 porters, Teleki pushed alone beyond his companion Lieutenant Ludwig von H&ouml;hnel (who stopped at 4,950m) and reached the snow at 5,300 meters. He was forced to retreat when his lips bled freely and sleep nearly overcame him at altitude.</p>

<p>Teleki's contribution to the eventual first ascent was indirect but crucial: he encountered Meyer by chance during Meyer's own 1887 expedition and shared detailed information about the approach and conditions above the forest line.</p>

<h3>Dr. Abbott and Otto Ehlers (1888)</h3>

<p>American naturalist Dr. Abbott and German explorer Otto Ehrenfried Ehlers attempted the summit in late 1888. Abbott fell ill early in the climb, but Ehlers pushed on alone and later claimed to have reached 5,904 meters&mdash;a figure that is actually higher than the mountain's true summit.</p>

<p>Meyer publicly exposed this deception in his 1891 book, noting that Ehlers' descriptions of the summit contradicted what was actually there. Under pressure, Ehlers was forced to recant his claim. Abbott, despite his failed summit, contributed to Meyer's eventual success by providing accommodation in Moshi for the 1889 expedition team.</p>

<h3>Meyer's First Attempt (1887)</h3>

<p>Hans Meyer's own first attempt reached the edge of the ice cap at approximately 5,500 meters. Without proper ice-climbing equipment, the glacier barrier proved impassable. This failure taught Meyer the crucial lesson that led to recruiting Purtscheller.</p>

<h3>Meyer's Second Attempt (1888)</h3>

<p>Meyer returned better equipped in 1888, but the Abushiri Revolt&mdash;an uprising against German colonial rule&mdash;derailed the expedition entirely. Meyer and his companion Oscar Baumann were captured by Sheikh Abushiri's forces, clapped in chains, and held hostage. They were released only after a ransom of 10,000 rupees was paid. Meyer was forced to return to Germany empty-handed a second time.</p>

<h2>The Successful 1889 Expedition</h2>

<h3>Planning and Preparation</h3>

<p>Meyer's third expedition cost approximately <strong>30,000 German marks</strong>&mdash;a substantial fortune equivalent to decades of an average worker's salary. Learning from both his own failures and the experiences of Teleki, Abbott, and Ehlers, Meyer's preparation was meticulous:</p>

<ul>
<li>Recruited Purtscheller specifically for his ice-climbing expertise</li>
<li>Brought proper ice axes, crampons, and Alpine climbing equipment</li>
<li>Planned a progressive camp strategy to allow altitude acclimatization</li>
<li>Hired 16 experienced Chagga porters and local guides</li>
<li>Budgeted for multiple summit attempts rather than a single do-or-die push</li>
<li>Brought scientific instruments for geological and meteorological observations</li>
</ul>

<h3>The Approach Route</h3>

<p>The expedition approached from the south, roughly following what would become the Marangu Route. They established camps progressively higher on the mountain&mdash;a staged strategy that is still the fundamental approach used on all Kilimanjaro routes today. Their highest bivouac was positioned near what is now the crater rim, from which they launched summit attempts.</p>

<h3>Summit Day: October 6, 1889</h3>

<p>After establishing their high camp, Meyer and Purtscheller made their final summit bid through extensive glaciers and ice cliffs that covered far more of the summit than they do today. The ice fields required hours of step-cutting with axes.</p>

<p>At approximately 1:00 PM local time, they stood on the highest point of Kibo's southern crater rim. In his book, Meyer described the moment: he took a small German flag from his knapsack and planted it on the "weatherbeaten lava summit with three ringing cheers," christening the peak <strong>"Kaiser Wilhelm Spitze"</strong>&mdash;"the loftiest spot in Africa and in the German Empire."</p>

<p>Meyer initially estimated the height at 6,010 meters. This figure stood for over sixty years until a precise survey in 1952 corrected the official height to 5,895 meters (19,341 feet).</p>

<h3>Scientific Results</h3>

<p>Beyond the summit achievement, the 1889 expedition produced extensive scientific documentation:</p>

<ul>
<li>First confirmed measurement of the mountain's height</li>
<li>Proof of Kilimanjaro's volcanic origin and crater structure</li>
<li>Detailed mapping of the glacier extent (crucial baseline for measuring modern retreat)</li>
<li>Botanical, geological, and meteorological observations across all climate zones</li>
<li>First accurate maps of the summit region</li>
</ul>

<p>Meyer published his findings as <em>Across East African Glaciers</em> in 1891 (London: George Philip &amp; Son), a 404-page account with 40 illustrations and three maps. The book remains a primary historical source and is available on the Internet Archive.</p>

<h2>After Meyer: Kilimanjaro's Climbing Milestones</h2>

<p>The first ascent was not immediately repeated. The mountain's remoteness and the technical challenge of its glaciers kept climbers away for two full decades.</p>

<table>
<thead>
<tr><th>Year</th><th>Milestone</th><th>Climber(s)</th></tr>
</thead>
<tbody>
<tr><td>1889</td><td>First confirmed summit of Kibo</td><td>Hans Meyer &amp; Ludwig Purtscheller</td></tr>
<tr><td>1898</td><td>Meyer returns, reaches crater rim only</td><td>Hans Meyer</td></tr>
<tr><td>1909</td><td>Second person to summit (20 years later)</td><td>M. Lange (surveyor)</td></tr>
<tr><td>1909</td><td>First woman on Mawenzi peak</td><td>Gertrude Benham (solo, after porters refused)</td></tr>
<tr><td>1912</td><td>Mawenzi summit conquered; third Kibo ascent</td><td>Edward Oehler &amp; Fritz Klute</td></tr>
<tr><td>1912</td><td>Fourth Kibo ascent + first ski descent</td><td>Walter Furtwangler &amp; Ziegfried Koenig</td></tr>
<tr><td>1924</td><td>Mawenzi South Peak (by accident)</td><td>George Londt (South Africa)</td></tr>
<tr><td>1927</td><td>First woman to summit Kibo (Uhuru Peak)</td><td>Sheila MacDonald</td></tr>
<tr><td>1961</td><td>Summit renamed "Uhuru Peak" at independence</td><td>Tanganyika government</td></tr>
<tr><td>1987</td><td>UNESCO World Heritage Site designation</td><td>&mdash;</td></tr>
</tbody>
</table>

<h3>The First Woman to Summit: Sheila MacDonald (1927)</h3>

<p>On July 31, 1927, 22-year-old Sheila MacDonald became the first woman to stand on Kilimanjaro's highest point. Born in Australia in 1901, MacDonald was the daughter of the Alpine Club's vice-president and had already climbed extensively in Scotland and the Alps.</p>

<p>MacDonald hadn't planned to climb Kilimanjaro at all&mdash;she'd traveled to Africa to visit her cousin, Kenya's chief game warden, for a safari. But when the opportunity arose, she seized it. According to The Guardian's September 1927 report, she "set the pace" for her two male companions and pressed on when one man "couldn't go on." In a sign of the times, she had to plead with the men to be "allowed to finish the ascent."</p>

<h3>From Kaiser Wilhelm to Uhuru Peak</h3>

<p>Meyer's name for the summit&mdash;Kaiser Wilhelm Spitze&mdash;lasted through German colonial rule and the subsequent British mandate. When Tanganyika gained independence on December 9, 1961, the summit was renamed <strong>Uhuru Peak</strong> ("Freedom Peak" in Swahili). A torch was carried to the summit to symbolize the new nation's independence&mdash;that torch now appears on the Tanzanian coat of arms.</p>

<h2>The Legacy: What Meyer's Expedition Means Today</h2>

<h3>Scientific Baseline for Climate Research</h3>

<p>Meyer returned to Kilimanjaro in 1898, conducting extensive glaciological studies and photography. His measurements and images provide the earliest scientific baseline for tracking glacier retreat. When researchers today report that Kilimanjaro has lost over 80% of its ice since the late 1800s, they're comparing against Meyer's original documentation.</p>

<p>Scientists estimate the remaining glaciers could vanish entirely between 2040 and 2050. The ice fields that required Meyer and Purtscheller to spend hours cutting steps with axes are now thin remnants that climbers walk past without technical equipment.</p>

<h3>UNESCO World Heritage Recognition (1987)</h3>

<p>Kilimanjaro's designation as a UNESCO World Heritage Site acknowledged its "outstanding universal value"&mdash;the snow-capped summit, unique succession of ecological zones from tropical to arctic, and the glaciers that first drew explorers like Meyer. The designation protects the same landscapes documented by those 1889 explorers while preserving Chagga cultural heritage.</p>

<h3>From 3 Climbers to 35,000</h3>

<p>The transformation from Meyer's era to today is staggering:</p>

<table>
<thead>
<tr><th>Aspect</th><th>1889</th><th>Today</th></tr>
</thead>
<tbody>
<tr><td>Climbers per year</td><td>~3</td><td>~35,000+</td></tr>
<tr><td>Routes available</td><td>1 (unmarked)</td><td>7 official routes</td></tr>
<tr><td>Technical gear required</td><td>Ice axes, crampons</td><td>None for standard routes</td></tr>
<tr><td>Glacier coverage</td><td>Extensive ice fields</td><td>~80% melted since 1889</td></tr>
<tr><td>Typical duration</td><td>Weeks of exploration</td><td>5&ndash;9 days</td></tr>
<tr><td>Summit success rate</td><td>33% (1 in 3 attempts)</td><td>65&ndash;90% (route dependent)</td></tr>
<tr><td>Expedition cost (adjusted)</td><td>~30,000 marks (fortune)</td><td>$2,000&ndash;$6,000</td></tr>
<tr><td>Support infrastructure</td><td>None</td><td>Huts, rescue teams, helicopters</td></tr>
</tbody>
</table>

<h2>Climbing Kilimanjaro Today: Following in Their Footsteps</h2>

<p>You no longer need ice axes, weeks of supplies, or a 300-porter caravan to climb Kilimanjaro. But the fundamental challenge remains: altitude. The same thin air that forced Count Teleki to retreat and drove Meyer back twice still affects modern climbers. Success today depends on the same principle Meyer eventually mastered&mdash;gradual acclimatization through staged ascent.</p>

<p>The <a href="/trekking/6-days-marangu-route/">Marangu Route</a> most closely follows Meyer's 1889 path and is the only route with hut accommodation. For higher summit success rates, longer routes like the <a href="/trekking/7-days-lemosho-route/">Lemosho</a> (7&ndash;8 days) or <a href="/trekking/8-days-northern-circuit-route/">Northern Circuit</a> (8&ndash;9 days) provide better acclimatization&mdash;the same lesson Meyer learned the hard way across three expeditions.</p>

<p>Standing on Uhuru Peak, you join a tradition that began with those first climbers over 135 years ago. The view from the summit&mdash;across the African plains to the horizon&mdash;is unchanged from what Meyer and Purtscheller saw on that October morning in 1889.</p>

<p>Ready to make your own Kilimanjaro history? <a href="/kilimanjaro-join-group-departures/">View upcoming group departures</a> or <a href="/contact-us/">contact us</a> to start planning your climb.</p>

<h2>Frequently Asked Questions</h2>

<h3>Who was the first person to reach the summit of Kilimanjaro?</h3>
<p>German geographer Hans Meyer and Austrian mountaineer Ludwig Purtscheller reached the summit together on October 6, 1889. It was Meyer's third attempt after failures in 1887 and 1888. The identity of the local guide who accompanied them highest remains disputed between Muini Amani (named in all original expedition accounts) and Yohani Kinyala Lauwo (officially recognized by Tanzania since 1989).</p>

<h3>How many attempts did it take to first climb Kilimanjaro?</h3>
<p>Hans Meyer personally attempted Kilimanjaro three times before succeeding. His first attempt (1887) was stopped by glaciers at 5,500m without proper ice equipment. His second attempt (1888) was abandoned when he was captured and held hostage during the Abushiri Revolt. For his successful third attempt in 1889, he recruited expert Alpine climber Ludwig Purtscheller, whose ice-climbing skills proved decisive.</p>

<h3>Who was the first woman to climb Kilimanjaro?</h3>
<p>Sheila MacDonald, a 22-year-old Australian-born climber, became the first woman to reach Kilimanjaro's highest point (then called Kaiser Wilhelm Spitze, now Uhuru Peak) on July 31, 1927. According to The Guardian's report, she "set the pace" for her two male companions and had to plead to be "allowed to finish the ascent."</p>

<h3>How did early Kilimanjaro expeditions differ from modern climbs?</h3>
<p>Meyer's 1889 expedition cost approximately 30,000 German marks, employed 16 Chagga porters, took weeks of exploration, and required ice axes and crampons to cross extensive glaciers. Today, standard routes require no technical gear, take 5&ndash;9 days, cost $2,000&ndash;$6,000, and have a 65&ndash;90% success rate compared to Meyer's 33%. The biggest physical change is the glaciers&mdash;over 80% of the ice Meyer navigated has melted.</p>

<h3>What role did local guides play in the first Kilimanjaro ascent?</h3>
<p>Local Chagga guides and porters were essential to every serious attempt on Kilimanjaro. Meyer's successful 1889 expedition employed 16 Chagga porters, two headmen, a cook, and guides who provided route knowledge, logistics, and survival support. Without this local infrastructure, no European expedition could have progressed beyond the lower slopes.</p>

<h3>When was Kilimanjaro's summit renamed Uhuru Peak?</h3>
<p>The summit was originally named Kaiser Wilhelm Spitze by Hans Meyer in 1889, honoring the German Emperor. It kept this name through German colonial rule and the subsequent British mandate. When Tanganyika gained independence on December 9, 1961, the summit was renamed Uhuru Peak ("Freedom Peak" in Swahili). A torch was carried to the summit to symbolize independence&mdash;that torch now appears on the Tanzanian coat of arms.</p>
`;

const metaTitle = "First Person to Climb Kilimanjaro: The Complete History (1889-Today)";
const metaDescription = "Hans Meyer needed 3 failed attempts, a kidnapping, and 30,000 marks to summit Kilimanjaro in 1889. The true story — including the guide controversy historians still debate.";

async function main() {
  console.log("Updating 'first-person-to-climb-kilimanjaro' blog post...\n");

  const post = await prisma.blogPost.findFirst({
    where: { slug: "first-person-to-climb-kilimanjaro" },
  });

  if (!post) {
    console.log("Post not found!");
    return;
  }

  console.log(`Found post: ${post.title} (ID: ${post.id})`);
  console.log(`Current word count: ~${post.content?.split(/\s+/).length || 0}`);

  const result = await prisma.blogPost.update({
    where: { id: post.id },
    data: {
      content: content.trim(),
      metaTitle,
      metaDescription,
    },
  });

  const newWordCount = result.content?.split(/\s+/).length || 0;
  console.log(`\nUpdated successfully!`);
  console.log(`New word count: ~${newWordCount}`);
  console.log(`Meta title: ${metaTitle}`);
  console.log(`Meta description: ${metaDescription}`);
}

main()
  .catch(console.error);
