/**
 * seed-kilimanjaro-blog-posts-19b.ts
 *
 * Upserts 2 Kilimanjaro blog posts (batch 19b):
 *  1. kilimanjaro-cooking-mountain-chef
 *  2. kilimanjaro-first-aid-kit
 *
 * Run: npx tsx scripts/seed-kilimanjaro-blog-posts-19b.ts
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
/*  Post 1: kilimanjaro-cooking-mountain-chef                          */
/* ------------------------------------------------------------------ */
const post1Content = `
<p>When climbers return from Kilimanjaro, they talk about the sunrise from Stella Point, the glaciers on the crater rim, and the emotional moment they touched the sign at Uhuru Peak. Almost nobody talks about the person who made all of that possible — the mountain chef. While you were sleeping at 4,200m, your chef was already awake at 4:00 AM, boiling water, frying eggs, and preparing a three-course breakfast in a canvas tent with a portable gas stove and freezing fingers. The mountain chef is the most underrated and overworked member of your Kilimanjaro crew, and the quality of your food can make or break your summit attempt.</p>

<h2>Who Are Kilimanjaro Mountain Chefs?</h2>

<p>Mountain chefs on Kilimanjaro are local Tanzanian men — almost always from the Chagga community around Moshi and Marangu, the same communities that have lived on the lower slopes of Kilimanjaro for centuries. Most chefs start as porters, carrying 20kg loads up the mountain for years before graduating to the kitchen. A typical mountain chef has 5-15 years of experience cooking at altitude and has summited Kilimanjaro dozens, sometimes hundreds, of times — far more than the guides.</p>

<p>The best chefs are trained by their operators in food safety, menu planning, and dietary accommodations (vegetarian, vegan, gluten-free, halal). At <strong>Snow Africa Adventure</strong>, our head chef has been cooking on Kilimanjaro for over 12 years and can prepare a full roast chicken dinner at 4,600m in conditions that would shut down most professional kitchens.</p>

<p>Unlike restaurant chefs who work in temperature-controlled kitchens with unlimited water, electricity, and equipment, mountain chefs carry everything they need on their backs — or more accurately, on the backs of their porter team. Every ingredient, every pot, every spice is accounted for and packed by weight.</p>

<h2>Kitchen Setup at Altitude</h2>

<p>The mountain kitchen is a temporary structure that gets built and dismantled every single day. Here is what a typical Kilimanjaro kitchen looks like at camp:</p>

<ul>
<li><strong>Mess tent:</strong> A large canvas dining tent with a folding table, camping chairs, and a battery-powered lantern. This is where climbers eat. On premium treks, the mess tent includes tablecloths, condiment sets, and hot drink stations.</li>
<li><strong>Kitchen tent:</strong> A separate, smaller tent where all cooking happens. This keeps wind and dust out of the food and contains the heat from the stoves. The kitchen tent is off-limits to climbers — it is the chef's domain.</li>
<li><strong>Portable gas stoves:</strong> Two or three butane or propane camp stoves, carried by porters. Some operators use kerosene stoves, but gas is cleaner and more reliable at altitude.</li>
<li><strong>Folding tables:</strong> Lightweight aluminium tables for food preparation. Hygiene is critical — food poisoning at 4,000m can end your climb faster than altitude sickness.</li>
<li><strong>Water collection:</strong> Porters collect water from mountain streams and rivers. The chef boils all cooking and drinking water. At higher camps (Barafu, Karanga), water sources are further away and porters may need to carry water from lower elevations.</li>
<li><strong>Wash stations:</strong> A bowl of warm water with soap is provided before every meal for hand washing. Good operators also provide hand sanitiser.</li>
</ul>

<p>The entire kitchen — stoves, pots, utensils, tables, tents, and every gram of food — is carried by porters. This is why responsible operators limit the weight per porter to 20kg and ensure the kitchen crew has enough support. If you see a porter carrying an impossibly large load with kitchen equipment strapped on top, that operator is cutting corners.</p>

<h2>How Chefs Cook at 5,000m: The Science of Altitude Cooking</h2>

<p>Cooking at extreme altitude is genuinely difficult, and not just because of the cold. The biggest challenge is physics. At sea level, water boils at 100°C. At 3,700m (Shira Camp), it boils at roughly 87°C. At 4,600m (Barafu Camp), water boils at approximately 83°C. At 5,000m, it drops even further. This means:</p>

<ul>
<li><strong>Pasta and rice take 30-50% longer to cook</strong> because the lower boiling point means less heat energy is transferred to the food.</li>
<li><strong>Eggs cook unevenly</strong> — the water never reaches the temperature needed for a reliable hard boil, so chefs adjust timing by experience.</li>
<li><strong>Bread and pancakes behave differently</strong> because the lower air pressure affects how dough rises and how batters set.</li>
<li><strong>Soups need longer simmering times</strong> to develop flavour and to ensure all ingredients are fully cooked.</li>
<li><strong>Meat must be monitored carefully</strong> because internal temperatures are harder to reach, raising food safety concerns.</li>
</ul>

<p>On top of the boiling point issue, chefs work in freezing conditions. At Barafu Camp (4,673m), nighttime temperatures regularly drop to -10°C to -15°C. The chef is working with bare hands in these temperatures because gloves make it impossible to handle knives, stir pots, or crack eggs. Gas stoves also lose efficiency in extreme cold — butane struggles below -1°C, which is why experienced chefs use propane or isobutane blends at high camps.</p>

<p>Then there is the oxygen. At 5,000m, there is roughly 50% of the oxygen available at sea level. The chef is breathing hard just standing still, let alone lifting heavy pots, chopping vegetables, and working over a hot stove. Most chefs are well-acclimatised from years on the mountain, but it is still physically demanding work.</p>

<h2>A Day in the Life of a Kilimanjaro Chef</h2>

<p>To understand how hard mountain chefs work, here is a typical day during a Kilimanjaro trek. This schedule repeats every day for 5-9 days straight, depending on the route:</p>

<h3>4:00 AM — Wake Up Before Everyone</h3>
<p>The chef is the first person awake in camp. While climbers are still in sleeping bags and guides are reviewing the day's plan, the chef lights the stoves, boils water for hot drinks, and starts preparing breakfast. On summit night, the chef may wake as early as 11:00 PM to prepare a midnight meal for climbers departing at midnight.</p>

<h3>5:30 AM — Serve Hot Breakfast</h3>
<p>A full hot breakfast is served in the mess tent. This typically includes porridge or oatmeal, eggs (scrambled, fried, or omelette), toast or pancakes, fresh fruit, sausages, and hot drinks — coffee, tea, hot chocolate, or Milo. The chef also prepares packed snacks for the day's hike: trail mix, biscuits, chocolate bars, and fruit.</p>

<h3>7:00 AM — Break Down Kitchen</h3>
<p>After breakfast, the chef packs every single item back into porter loads. Pots are scrubbed, stoves are cooled and packed, leftover food is stored or disposed of responsibly, and the kitchen tent is collapsed. Nothing is left behind.</p>

<h3>8:00-10:00 AM — Race Ahead to Next Camp</h3>
<p>This is the remarkable part. While climbers walk at a slow "pole pole" (slowly, slowly) pace, the kitchen porters and chef must overtake the climbing group and reach the next camp first. They often take shorter, steeper routes to arrive 1-2 hours before the climbers. They are carrying kitchen equipment while moving faster than the people carrying daypacks.</p>

<h3>12:00 PM — Prepare Lunch</h3>
<p>Depending on the route and day, lunch is either a packed lunch eaten on the trail or a hot meal prepared at the next camp. Hot lunches include soup, sandwiches, pasta salad, fruit, juice, and hot drinks. Packed lunches include boxed juice, boiled eggs, sandwiches, fruit, biscuits, and chocolate.</p>

<h3>3:00 PM — Set Up Kitchen at New Camp</h3>
<p>The chef and kitchen crew arrive at the next camp, set up the kitchen tent and mess tent, collect water, and begin dinner preparations. By the time climbers arrive at camp (usually 3:00-5:00 PM), hot drinks and snacks — typically popcorn, biscuits, or roasted peanuts — are ready and waiting in the mess tent.</p>

<h3>6:00-7:00 PM — Serve Multi-Course Dinner</h3>
<p>Dinner is the main event. A good mountain chef serves a multi-course meal: starter soup, a main course with protein (chicken, beef, or fish), carbohydrates (rice, pasta, or potatoes), cooked vegetables, and a dessert (fruit, cake, or pancakes with honey). Hot drinks follow dinner.</p>

<h3>8:00-9:00 PM — Clean Up and Sleep</h3>
<p>The chef cleans every pot, utensil, and surface, disposes of waste properly, and prepares the ingredient list for tomorrow. By 9:00 PM, the chef finally sleeps — for roughly 7 hours before doing it all again.</p>

<h2>Sample Menu: What a Good Kilimanjaro Operator Serves</h2>

<p>The difference between a budget and premium operator often comes down to food quality. Here is a realistic sample of what <strong>Snow Africa Adventure</strong> serves on a typical Kilimanjaro trek:</p>

<h3>Breakfasts</h3>
<ul>
<li>Porridge with honey and cinnamon</li>
<li>Scrambled or fried eggs</li>
<li>Pancakes with Nutella or jam</li>
<li>Toast with butter and marmalade</li>
<li>Fresh fruit (bananas, oranges, watermelon, mango)</li>
<li>Sausages</li>
<li>Hot drinks: coffee, tea, hot chocolate, Milo</li>
</ul>

<h3>Lunches</h3>
<ul>
<li>Tomato or vegetable soup</li>
<li>Grilled cheese sandwiches or wraps</li>
<li>Pasta salad with vegetables</li>
<li>Fresh fruit and juice boxes</li>
<li>Biscuits and energy bars</li>
</ul>

<h3>Dinners</h3>
<ul>
<li>Starter: soup (pumpkin, carrot-ginger, tomato, or lentil)</li>
<li>Main: grilled chicken, beef stew, or fried fish with rice, pasta, or mashed potatoes</li>
<li>Sides: steamed vegetables, cooked spinach, beans, or coleslaw</li>
<li>Dessert: fresh fruit platter, banana fritters, or chocolate cake</li>
</ul>

<h3>Snacks (served at camp arrival)</h3>
<ul>
<li>Popcorn</li>
<li>Roasted peanuts</li>
<li>Biscuits and crackers</li>
<li>Hot chocolate or ginger tea</li>
</ul>

<h2>Budget vs Premium Operators: What They Actually Serve</h2>

<table>
<thead>
<tr><th>Meal</th><th>Budget Operator</th><th>Premium Operator (Snow Africa Adventure)</th></tr>
</thead>
<tbody>
<tr><td><strong>Breakfast</strong></td><td>Plain porridge, white bread, instant coffee</td><td>Porridge with honey, eggs, pancakes, fresh fruit, real coffee</td></tr>
<tr><td><strong>Lunch</strong></td><td>Packed sandwich (white bread, margarine), boiled egg</td><td>Hot soup, grilled sandwiches, pasta salad, juice, fruit</td></tr>
<tr><td><strong>Dinner</strong></td><td>Rice and beans, no dessert</td><td>Soup starter, chicken/fish main with sides, dessert, hot drinks</td></tr>
<tr><td><strong>Snacks</strong></td><td>None or basic biscuits</td><td>Popcorn, peanuts, biscuits, hot chocolate on arrival</td></tr>
<tr><td><strong>Dietary needs</strong></td><td>Rarely accommodated</td><td>Vegetarian, vegan, gluten-free, halal — all planned in advance</td></tr>
<tr><td><strong>Water</strong></td><td>Boiled only</td><td>Boiled and filtered, unlimited hot drinks</td></tr>
<tr><td><strong>Crew meals</strong></td><td>Crew eats basic ugali and beans</td><td>Crew eats the same quality food as climbers</td></tr>
</tbody>
</table>

<h2>Crew Meals: An Ethical Measure of Your Operator</h2>

<p>One of the most revealing questions you can ask a Kilimanjaro operator is: "What do your porters and crew eat?" Budget operators feed their porters the bare minimum — usually ugali (maize flour porridge) and beans, every single meal, for the entire trek. The crew that carries your equipment, sets up your camp, and makes your summit possible eats worse than a school cafeteria while doing the hardest physical labour on the mountain.</p>

<p>Ethical operators like <strong>Snow Africa Adventure</strong> feed their entire crew — <a href="/kilimanjaro-porters/">porters</a>, guides, cooks, and camp staff — the same quality food as the climbers. Our porters eat protein, vegetables, carbohydrates, and fruit at every meal. This is not just about morality (although it matters). Well-fed porters perform better, get sick less, and are happier — which directly improves your climbing experience.</p>

<p>When comparing <a href="/kilimanjaro-climbing-companies/">Kilimanjaro climbing companies</a>, ask about crew meals. If the operator hesitates or cannot give you specifics, that tells you something.</p>

<h2>Why Food Quality Directly Affects Summit Success</h2>

<p>Food is not a luxury on Kilimanjaro — it is a performance tool. Here is why:</p>

<ul>
<li><strong>Calorie demands are extreme:</strong> Climbers burn between 4,000 and 5,000 calories per day on Kilimanjaro, roughly double a normal active day. If you are not eating enough, your body burns muscle for energy and you fatigue faster.</li>
<li><strong>Appetite drops at altitude:</strong> Above 4,000m, most climbers experience reduced appetite, nausea, and food aversion. If the food is bland, cold, or unappealing, climbers eat even less. A skilled chef makes food that climbers actually want to eat, even when they feel terrible.</li>
<li><strong>Comfort food psychology matters:</strong> A hot, well-prepared meal after a gruelling day of hiking is an enormous morale boost. Climbers who eat well sleep better, recover faster, and maintain a more positive mindset — all of which contribute to summit success.</li>
<li><strong>Hydration is linked to eating:</strong> Soups, hot drinks, and water-rich foods help climbers stay hydrated. Dehydration worsens altitude sickness symptoms and reduces physical performance.</li>
<li><strong>Digestive issues end climbs:</strong> Poorly prepared food causes diarrhoea, vomiting, and stomach cramps. At 4,500m, these symptoms compound with altitude sickness and can force a climber off the mountain.</li>
</ul>

<p>Studies show that climbers who maintain adequate calorie intake above 4,000m have significantly higher summit success rates. The chef is, in many ways, as important to your summit as the guide.</p>

<h2>How Snow Africa Adventure Trains Its Chefs</h2>

<p>At Snow Africa Adventure, our mountain chefs undergo training that covers far more than cooking. Our chef training programme includes:</p>

<ul>
<li><strong>Menu planning:</strong> Designing balanced menus that provide 4,000-5,000 calories per day with the right mix of carbohydrates (60%), protein (20%), and fats (20%).</li>
<li><strong>Dietary accommodations:</strong> How to prepare <a href="/kilimanjaro-for-vegans/">vegan</a>, vegetarian, gluten-free, and halal meals without compromising nutrition or taste.</li>
<li><strong>Food safety at altitude:</strong> Proper water boiling, ingredient storage in varying temperatures, hand hygiene, and prevention of cross-contamination in field conditions.</li>
<li><strong>Altitude cooking techniques:</strong> Adjusting cooking times, temperatures, and methods for different elevations. Our chefs know that rice takes 25 minutes at Machame Camp (3,000m) but 40 minutes at Barafu (4,673m).</li>
<li><strong>Weight management:</strong> Packing the maximum nutrition into the minimum weight. Every kilogram matters when porters are carrying the kitchen.</li>
<li><strong>Waste management:</strong> Responsible disposal of food waste according to Kilimanjaro National Park regulations. Nothing is buried or left on the mountain.</li>
</ul>

<p>We also invest in quality equipment. Our kitchen kits include high-altitude propane stoves that work reliably at -15°C, insulated food carriers to keep meals warm, and proper food storage containers that seal against dust and moisture.</p>

<h2>Tipping the Chef</h2>

<p>The mountain chef deserves a generous tip. After 5-9 days of cooking three meals a day in extreme conditions, the chef has directly contributed to your safety, health, and summit success. Recommended tipping amounts for the chef:</p>

<ul>
<li><strong>Chef (head cook):</strong> USD $15-20 per day of the trek</li>
<li><strong>Assistant cook:</strong> USD $10-12 per day of the trek</li>
</ul>

<p>For a 7-day trek, this means approximately USD $105-140 for the head chef and USD $70-84 for the assistant cook. Tips are typically given during a tipping ceremony on the last day of the trek, where you meet the entire crew and express your gratitude personally. For a complete breakdown of who to tip and how much, read our <a href="/kilimanjaro-tipping-guide/">Kilimanjaro tipping guide</a>.</p>

<p>Tips represent a significant portion of crew income. The base wages paid by operators — even good ones — are modest by Western standards. Your tip is not a bonus; it is an essential part of the chef's compensation and is genuinely life-changing for their families.</p>

<h2>What to Tell Your Operator Before the Trek</h2>

<p>To help your chef prepare the best possible meals, communicate the following to your operator before departure:</p>

<ul>
<li><strong>Dietary restrictions:</strong> Vegetarian, vegan, gluten-free, lactose-intolerant, halal, kosher, or any food allergies.</li>
<li><strong>Food preferences:</strong> Strong dislikes, favourite foods, or comfort foods that help you eat when appetite is low.</li>
<li><strong>Medical dietary needs:</strong> Diabetic meal planning, low-sodium requirements, or other medical diets.</li>
<li><strong>Snack preferences:</strong> Favourite <a href="/kilimanjaro-snacks-energy/">trail snacks and energy foods</a> that you would like the chef to include.</li>
</ul>

<p>Good operators like Snow Africa Adventure build a custom <a href="/kilimanjaro-food-meals/">meal plan</a> for every group based on this information. The chef reviews the plan before the trek and adjusts ingredients accordingly.</p>

<h2>The Chef Makes the Mountain</h2>

<p>Next time you read a Kilimanjaro trip report or watch a summit video, remember the person who is never in the frame. The chef who woke up at 4:00 AM in the dark and cold. The chef who raced ahead on steeper trails carrying heavy pots so that hot soup was waiting when you arrived exhausted at camp. The chef who prepared a three-course dinner at 4,600m with a two-burner stove and a headlamp.</p>

<p>When you choose a <a href="/kilimanjaro-climbing-companies/">Kilimanjaro operator</a>, ask about the food. Ask about the chef. Ask what the <a href="/kilimanjaro-porters/">porters</a> eat. The answers will tell you more about the quality of your trek than any marketing brochure ever could.</p>
`;

/* ------------------------------------------------------------------ */
/*  Post 2: kilimanjaro-first-aid-kit                                  */
/* ------------------------------------------------------------------ */
const post2Content = `
<p>A well-stocked personal first aid kit is one of the most important items in your Kilimanjaro daypack — and one of the most commonly overlooked. Your operator carries emergency medical equipment, but their kit is designed for serious incidents: emergency oxygen, stretchers, and evacuation. The everyday ailments that actually threaten your summit — blisters, headaches, stomach trouble, sunburn, and minor cuts — are your responsibility to manage. Here is a complete, practical first aid kit checklist for Kilimanjaro, including what medications to bring, how to use them, and what your operator already carries so you do not duplicate unnecessarily.</p>

<h2>What Your Operator Carries (So You Do Not Have To)</h2>

<p>Before you pack your personal kit, understand what a responsible operator like <strong>Snow Africa Adventure</strong> already provides on every trek:</p>

<ul>
<li><strong>Emergency oxygen:</strong> Bottled oxygen with mask and regulator, carried from the first day. Used for severe <a href="/kilimanjaro-altitude-sickness/">altitude sickness</a>, HACE, or HAPE as a stabilising measure during descent or evacuation.</li>
<li><strong>Pulse oximeters:</strong> Handheld devices that measure blood oxygen saturation (SpO2) and heart rate. Guides check climbers twice daily — morning and evening — to monitor acclimatisation. A reading below 70% SpO2 at rest triggers mandatory descent.</li>
<li><strong>Portable stretcher:</strong> A collapsible wheeled stretcher for emergency evacuation. On steep sections, porters carry the stretcher manually.</li>
<li><strong>WFR-trained guides:</strong> Our lead guides hold Wilderness First Responder (WFR) certification, the gold standard for backcountry medical training. They can assess and manage altitude illness, fractures, hypothermia, and other wilderness emergencies.</li>
<li><strong>Operator first aid kit:</strong> A comprehensive medical kit containing wound dressings, splints, SAM splints, emergency blankets, CPR mask, injectable epinephrine (for anaphylaxis), and basic surgical instruments for wound closure.</li>
<li><strong>Emergency evacuation protocol:</strong> A pre-established <a href="/kilimanjaro-rescue-evacuation/">rescue and evacuation</a> plan with helicopter evacuation contacts, the nearest hospital coordinates (KCMC in Moshi), and a communication system (satellite phone or radio) for contacting park rescue teams.</li>
</ul>

<p>Your personal first aid kit complements this. You are packing for the common, non-emergency issues that you can self-manage on the trail.</p>

<h2>Your Personal First Aid Kit: Complete Checklist</h2>

<p>This checklist is organised by category. Every item has been selected based on what climbers actually need on Kilimanjaro — not a generic hiking first aid list.</p>

<h3>Blister Prevention and Treatment</h3>

<p>Blisters are the single most common medical issue on Kilimanjaro. They are also the most preventable. Blisters form from friction, moisture, and pressure — all three of which are constant on a multi-day trek. The most common blister locations on Kilimanjaro are the heels, the balls of the feet, the pinky toes (from downhill pressure), and the tops of the toes (from boot pressure at altitude when feet swell).</p>

<ul>
<li><strong>Moleskin sheets (2-3 sheets):</strong> Cut to size and apply over hot spots before blisters form. Moleskin stays on better than standard plasters during long hiking days.</li>
<li><strong>Hydrocolloid blister pads (6-8 pads):</strong> Compeed or similar. These are the gold standard for active blisters — they cushion, protect, and promote healing while you keep walking. Do not remove them until they fall off on their own.</li>
<li><strong>Zinc oxide tape (1 roll):</strong> For securing moleskin, reinforcing hot spots, and taping toes to prevent friction. More adhesive than standard medical tape in wet and dusty conditions.</li>
<li><strong>Small safety pin or sterile needle:</strong> For draining fluid-filled blisters. Sterilise with antiseptic first, drain from the edge, leave the skin intact as a natural bandage, then cover with a hydrocolloid pad.</li>
<li><strong>Antiseptic wipes (10 individually wrapped):</strong> For cleaning skin before and after blister treatment.</li>
</ul>

<h3>Pain Relief</h3>
<ul>
<li><strong>Ibuprofen 400mg (20 tablets):</strong> Your primary pain reliever on Kilimanjaro. Ibuprofen is superior to paracetamol at altitude because it is both an anti-inflammatory and an analgesic. Research suggests ibuprofen may also help reduce the severity of altitude headaches by decreasing brain inflammation. Take with food to protect your stomach. Do not exceed 1,200mg per day.</li>
<li><strong>Paracetamol / acetaminophen 500mg (10 tablets):</strong> Backup pain reliever. Can be alternated with ibuprofen for severe headaches. Easier on the stomach than ibuprofen for climbers with gastric sensitivity.</li>
<li><strong>Aspirin 300mg (6 tablets):</strong> Backup option. Some climbers prefer aspirin because it also thins the blood slightly, which may theoretically help with circulation at altitude. Avoid if you have any bleeding tendency.</li>
</ul>

<h3>Altitude Medications</h3>
<ul>
<li><strong>Acetazolamide / Diamox 125mg (20 tablets):</strong> The most widely used altitude sickness prevention medication. Requires a prescription — discuss with your doctor before the trek. Standard prophylactic dose is 125mg twice daily, starting 24 hours before ascent.</li>
<li><strong>Dexamethasone 4mg (4 tablets):</strong> Emergency medication for severe altitude sickness, HACE, or HAPE. Prescription only. This is a powerful corticosteroid that reduces brain swelling. It is NOT for prevention — it masks symptoms while the underlying condition worsens. Only use while descending. Carry it, hope you never need it.</li>
</ul>

<h3>Gastrointestinal</h3>
<ul>
<li><strong>Loperamide / Imodium 2mg (8 capsules):</strong> For diarrhoea. Traveller's diarrhoea on Kilimanjaro is usually caused by unfamiliar foods or inadequate hand hygiene, not contaminated water (which your operator boils). Loperamide controls symptoms so you can keep hiking, but does not treat the underlying cause.</li>
<li><strong>Oral rehydration salts (4-6 sachets):</strong> Critical if you experience vomiting or diarrhoea. Dehydration at altitude compounds altitude sickness and can become dangerous quickly. Mix with 1 litre of safe water and sip throughout the day.</li>
<li><strong>Antacid tablets (10 tablets):</strong> Heartburn and acid reflux are common at altitude due to increased gastric acid production and changes in digestive motility. Chewable calcium carbonate tablets (Tums, Rennie) provide fast relief.</li>
</ul>

<h3>Wound Care</h3>
<ul>
<li><strong>Antiseptic wipes (included above with blister kit)</strong></li>
<li><strong>Adhesive bandages / plasters (assorted sizes, 10-15):</strong> For minor cuts, scrapes, and abrasions from rocks or equipment.</li>
<li><strong>Sterile gauze pads 5x5cm (4 pads):</strong> For larger wounds that need coverage.</li>
<li><strong>Medical tape (1 small roll):</strong> For securing gauze. Micropore tape works well for sensitive skin.</li>
<li><strong>Small scissors or trauma shears:</strong> For cutting tape, gauze, or moleskin. A small folding pair saves weight.</li>
</ul>

<h3>Sun and Cold Protection</h3>
<ul>
<li><strong>Lip balm with SPF 30+ (2 sticks):</strong> Your lips will crack and burn above 4,000m. The UV intensity at altitude is brutal — UV radiation increases approximately 10-12% for every 1,000m of elevation gain. Apply every 2 hours, and again after eating or drinking. Read our full <a href="/kilimanjaro-sun-protection/">Kilimanjaro sun protection guide</a>.</li>
<li><strong>Sunscreen SPF 50+ (small tube, 50-100ml):</strong> Apply to face, ears, neck, and the backs of hands every 2 hours. Snow and ice on the upper mountain reflect UV and cause burns on the underside of the chin and nose.</li>
<li><strong>Chemical hand warmers (4-6 pairs):</strong> Single-use air-activated warmers. Essential for summit night when temperatures drop to -15°C to -25°C. Place inside gloves and <a href="/kilimanjaro-boots-guide/">boots</a> to prevent frostbite on fingers and toes.</li>
</ul>

<h3>Personal Medications</h3>
<ul>
<li><strong>Daily prescriptions:</strong> Bring your full supply plus 3 extra days in case of weather delays or extended itineraries. Keep medications in original labelled containers for customs.</li>
<li><strong>EpiPen (if applicable):</strong> If you have known severe allergies (bee stings, food allergies), carry your auto-injector in your daypack — not in your duffel bag that porters carry separately.</li>
<li><strong>Antihistamines (10 tablets):</strong> Cetirizine or loratadine for allergic reactions, insect bites, or unexpected allergies to unfamiliar plants or foods. Non-drowsy formulations are preferred.</li>
</ul>

<h2>Complete Kilimanjaro First Aid Kit Checklist</h2>

<table>
<thead>
<tr><th>Item</th><th>Quantity</th><th>Purpose</th><th>Weight</th></tr>
</thead>
<tbody>
<tr><td>Moleskin sheets</td><td>2-3 sheets</td><td>Blister hot spot prevention</td><td>30g</td></tr>
<tr><td>Hydrocolloid blister pads</td><td>6-8 pads</td><td>Active blister treatment</td><td>20g</td></tr>
<tr><td>Zinc oxide tape</td><td>1 roll</td><td>Securing dressings, taping toes</td><td>40g</td></tr>
<tr><td>Sterile needle / safety pin</td><td>1</td><td>Blister drainage</td><td>2g</td></tr>
<tr><td>Antiseptic wipes</td><td>10 wipes</td><td>Wound and blister cleaning</td><td>30g</td></tr>
<tr><td>Ibuprofen 400mg</td><td>20 tablets</td><td>Pain, inflammation, altitude headache</td><td>15g</td></tr>
<tr><td>Paracetamol 500mg</td><td>10 tablets</td><td>Backup pain relief</td><td>10g</td></tr>
<tr><td>Aspirin 300mg</td><td>6 tablets</td><td>Pain relief, mild blood thinning</td><td>5g</td></tr>
<tr><td>Diamox 125mg</td><td>20 tablets</td><td>Altitude sickness prevention</td><td>10g</td></tr>
<tr><td>Dexamethasone 4mg</td><td>4 tablets</td><td>Emergency HACE/HAPE treatment</td><td>5g</td></tr>
<tr><td>Loperamide 2mg</td><td>8 capsules</td><td>Diarrhoea control</td><td>5g</td></tr>
<tr><td>Oral rehydration salts</td><td>4-6 sachets</td><td>Rehydration after vomiting/diarrhoea</td><td>30g</td></tr>
<tr><td>Antacid tablets</td><td>10 tablets</td><td>Heartburn and acid reflux</td><td>15g</td></tr>
<tr><td>Adhesive bandages (assorted)</td><td>10-15</td><td>Minor cuts and scrapes</td><td>20g</td></tr>
<tr><td>Sterile gauze pads 5x5cm</td><td>4 pads</td><td>Wound coverage</td><td>10g</td></tr>
<tr><td>Medical tape</td><td>1 roll</td><td>Securing gauze and dressings</td><td>15g</td></tr>
<tr><td>Small scissors</td><td>1 pair</td><td>Cutting tape, gauze, moleskin</td><td>20g</td></tr>
<tr><td>Lip balm SPF 30+</td><td>2 sticks</td><td>Lip protection from UV and cold</td><td>15g</td></tr>
<tr><td>Sunscreen SPF 50+</td><td>1 tube (50-100ml)</td><td>Skin UV protection</td><td>80g</td></tr>
<tr><td>Chemical hand warmers</td><td>4-6 pairs</td><td>Frostbite prevention on summit night</td><td>120g</td></tr>
<tr><td>Antihistamines</td><td>10 tablets</td><td>Allergic reactions, insect bites</td><td>8g</td></tr>
<tr><td><strong>Total estimated weight</strong></td><td></td><td></td><td><strong>~505g</strong></td></tr>
</tbody>
</table>

<p>The entire personal first aid kit weighs approximately 500g — about the same as a water bottle. It fits easily into a gallon-size ziplock bag in your daypack. There is no excuse not to carry it.</p>

<h2>Blister Prevention Masterclass</h2>

<p>Blisters deserve their own section because they are, statistically, the most common medical issue on Kilimanjaro. More climbers are slowed or stopped by blisters than by altitude sickness. Here is how to prevent them entirely:</p>

<h3>Where Blisters Form on Kilimanjaro</h3>
<ul>
<li><strong>Heels:</strong> From boot slip on steep ascents (Barranco Wall, summit approach). Tighten your heel lock lacing.</li>
<li><strong>Balls of feet:</strong> From extended walking on uneven terrain, especially volcanic scree on descent days.</li>
<li><strong>Pinky toes:</strong> From lateral pressure during long downhill sections (descent from summit to Mweka). Your feet swell at altitude, increasing pressure against the boot walls.</li>
<li><strong>Tops of toes:</strong> From the boot toe box pressing down, especially when feet swell above 4,000m. Ensure your <a href="/kilimanjaro-boots-guide/">boots</a> have a roomy toe box.</li>
</ul>

<h3>Prevention Techniques</h3>
<ol>
<li><strong>Break in your boots:</strong> Wear your trekking boots on at least 5-10 day hikes before Kilimanjaro. Never wear new boots on the mountain.</li>
<li><strong>Double-layer socks:</strong> A thin liner sock under a thick wool or synthetic hiking sock. The friction happens between the sock layers instead of against your skin.</li>
<li><strong>Pre-tape known hot spots:</strong> If you know you blister on your heels, tape them with zinc oxide tape every morning before you start hiking. Prevention is 10 times easier than treatment.</li>
<li><strong>Keep feet dry:</strong> Change socks at lunch if your feet are sweating. Damp skin blisters faster than dry skin. Bring 4-5 pairs of hiking socks.</li>
<li><strong>Act at the first sign of a hot spot:</strong> If you feel rubbing, stop immediately. Remove your boot, dry the area, and apply moleskin or tape. A hot spot takes 30 seconds to fix. A blister takes 5 days to heal.</li>
</ol>

<h3>Treatment on the Trail</h3>
<p>If a blister does form, here is the mountain treatment protocol:</p>
<ol>
<li>Clean the blister and surrounding skin with an antiseptic wipe.</li>
<li>If the blister is small and not painful, leave it intact and cover with a hydrocolloid pad.</li>
<li>If the blister is large, tense, and painful, sterilise your needle with antiseptic, pierce the edge of the blister (not the centre), gently press out the fluid, and leave the roof of skin in place.</li>
<li>Apply a hydrocolloid blister pad (Compeed) over the drained blister. Do not remove the pad — let it fall off naturally over 3-5 days.</li>
<li>Monitor for infection: increasing redness, warmth, pus, or red streaks spreading from the blister. If you see any of these signs, tell your guide immediately.</li>
</ol>

<h2>Altitude Medication Deep Dive</h2>

<h3>Diamox (Acetazolamide): How It Works</h3>

<p>Diamox is the most widely studied and prescribed altitude sickness medication. It works by inhibiting the enzyme carbonic anhydrase in your kidneys, which causes your body to excrete more bicarbonate in your urine. This makes your blood slightly more acidic, which triggers your brain to increase your breathing rate and depth. The result: you take in more oxygen, even while sleeping.</p>

<p><strong>Dosage:</strong> The standard prophylactic dose is 125mg twice daily (morning and evening). Some doctors prescribe 250mg twice daily, but studies show 125mg is equally effective with fewer side effects. Start taking Diamox 24 hours before you begin ascending — for most Kilimanjaro treks, this means the day before you arrive at the gate.</p>

<p><strong>Side effects:</strong> Tingling in fingers, toes, and lips (paraesthesia) — this is normal and harmless. Frequent urination — your body is excreting bicarbonate and water. Carbonated drinks taste flat or metallic — Diamox alters taste receptors. Mild nausea in some people, usually in the first 24 hours.</p>

<p><strong>Important:</strong> Diamox is a sulfonamide derivative. If you have a sulfa drug allergy, do not take Diamox. Discuss alternatives with your doctor. Also note that Diamox is a diuretic — you must increase your water intake to compensate for the extra fluid loss. Aim for 3-4 litres per day on the mountain.</p>

<h3>Ibuprofen for Altitude Headaches</h3>

<p>Recent research has shown that ibuprofen (600mg three times daily) may be effective at preventing altitude sickness in some climbers, though it is not a substitute for proper acclimatisation or Diamox. For treating altitude headaches specifically, ibuprofen is more effective than paracetamol because it reduces the inflammation component of the headache, not just the pain signal. Take 400mg with food at the first sign of a headache. If the headache persists after 2 hours, you can take another 400mg.</p>

<h3>Nifedipine: Emergency HAPE Treatment</h3>

<p>Nifedipine is a calcium channel blocker that reduces pulmonary artery pressure. It is the frontline emergency treatment for High Altitude Pulmonary Edema (HAPE) — fluid accumulation in the lungs. HAPE is rare on Kilimanjaro but can be fatal if untreated. Symptoms include persistent cough, pink or frothy sputum, extreme breathlessness at rest, and crackling sounds when breathing. Nifedipine is prescription-only and should only be used while descending. It buys time during evacuation — it does not cure HAPE. Descent is the cure.</p>

<h2>Common Medical Issues on Kilimanjaro</h2>

<table>
<thead>
<tr><th>Issue</th><th>Frequency</th><th>Typical Onset</th><th>Self-Treatment</th><th>Tell Your Guide?</th></tr>
</thead>
<tbody>
<tr><td>Blisters</td><td>Very common</td><td>Day 1-2</td><td>Moleskin, blister pads, tape</td><td>Only if infected</td></tr>
<tr><td>Headache</td><td>Very common</td><td>Above 3,500m</td><td>Ibuprofen 400mg, hydration</td><td>If persistent after medication</td></tr>
<tr><td>Nausea</td><td>Common</td><td>Above 4,000m</td><td>Ginger tea, small frequent meals</td><td>If vomiting repeatedly</td></tr>
<tr><td>Diarrhoea</td><td>Common</td><td>Any day</td><td>Loperamide, rehydration salts</td><td>If lasting more than 24 hours</td></tr>
<tr><td>Insomnia</td><td>Common</td><td>Above 3,500m</td><td>Diamox helps, avoid sleeping pills</td><td>If not sleeping at all for 2+ nights</td></tr>
<tr><td>Sunburn</td><td>Common</td><td>Day 1 onwards</td><td>SPF 50+, lip balm, hat, buff</td><td>If blistering sunburn occurs</td></tr>
<tr><td>Minor cuts / scrapes</td><td>Uncommon</td><td>Any day</td><td>Antiseptic, bandage</td><td>If deep or won't stop bleeding</td></tr>
<tr><td>Frostbite</td><td>Rare</td><td>Summit night</td><td>Hand warmers, rewarm slowly</td><td>Yes — always</td></tr>
<tr><td>HACE (cerebral edema)</td><td>Very rare</td><td>Above 4,500m</td><td>Dexamethasone + immediate descent</td><td>Yes — emergency</td></tr>
<tr><td>HAPE (pulmonary edema)</td><td>Very rare</td><td>Above 4,000m</td><td>Nifedipine + immediate descent</td><td>Yes — emergency</td></tr>
</tbody>
</table>

<h2>When to Tell Your Guide</h2>

<p>Many climbers try to hide symptoms because they fear being told to descend. This is dangerous. Your guide is trained to assess whether symptoms are normal acclimatisation responses or warning signs of serious illness. Tell your guide immediately if you experience any of the following:</p>

<ul>
<li><strong>Headache that does not respond to ibuprofen</strong> after 2 hours and adequate hydration</li>
<li><strong>Persistent vomiting</strong> — more than 2-3 episodes, or inability to keep fluids down</li>
<li><strong>Confusion, disorientation, or unusual behaviour</strong> — these are signs of HACE (cerebral edema) and constitute a medical emergency</li>
<li><strong>Severe breathlessness at rest</strong> — breathing difficulty that does not improve after sitting and resting for 10 minutes</li>
<li><strong>Persistent cough producing pink or frothy sputum</strong> — a sign of HAPE (pulmonary edema)</li>
<li><strong>Loss of coordination or inability to walk in a straight line</strong> (ataxia) — another HACE indicator</li>
<li><strong>Chest pain or pressure</strong></li>
<li><strong>Vision changes</strong> — blurred vision, double vision, or seeing spots</li>
<li><strong>Numbness in extremities that does not resolve</strong> with warming</li>
<li><strong>Any wound showing signs of infection:</strong> increasing redness, swelling, warmth, pus, or red streaks</li>
</ul>

<p>Your guide will never judge you for reporting symptoms. A responsible guide from a quality operator like Snow Africa Adventure would rather descend with a healthy client than push a sick one toward a dangerous summit attempt. Read more about <a href="/kilimanjaro-safety/">Kilimanjaro safety protocols</a>.</p>

<h2>Pre-Trek Doctor Visit</h2>

<p>Visit your doctor at least 4-6 weeks before your Kilimanjaro trek. This gives time for prescriptions to be filled and for any vaccinations to take effect. Discuss the following with your doctor:</p>

<ul>
<li><strong>Diamox prescription:</strong> Ask for 125mg tablets, enough for 2 tablets per day for the duration of your trek plus 2 extra days. Discuss whether you have any contraindications (sulfa allergy, kidney disease, liver disease).</li>
<li><strong>Dexamethasone prescription:</strong> Ask for 4mg tablets as an emergency supply. Your doctor may want to discuss when and how to use it.</li>
<li><strong>Nifedipine prescription:</strong> For HAPE-prone individuals or those with a history of altitude illness. Not everyone needs this.</li>
<li><strong>Current medications at altitude:</strong> Some medications behave differently at altitude. Beta-blockers can mask tachycardia (an altitude sickness symptom). Oral contraceptives may slightly increase blood clot risk at altitude. Sleeping pills suppress breathing — dangerous above 4,000m.</li>
<li><strong>Fitness assessment:</strong> A basic cardiovascular check (blood pressure, resting heart rate, ECG if you are over 50 or have risk factors).</li>
<li><strong>Vaccinations:</strong> Yellow fever (required if transiting through an endemic country), hepatitis A, typhoid, and routine boosters. Malaria prophylaxis is not needed on the mountain (too high for mosquitoes) but is recommended for time spent in Moshi, Arusha, or on safari before/after the trek.</li>
</ul>

<p>Bring a copy of any prescriptions with you. Tanzanian customs may ask to see documentation for prescription medications, particularly controlled substances.</p>

<h2>Pack Smart, Climb Safe</h2>

<p>Your personal first aid kit weighs about 500g and takes up less space than a paperback book. It cannot replace a <a href="/kilimanjaro-rescue-evacuation/">proper evacuation plan</a> or experienced, <a href="/kilimanjaro-safety/">safety-focused guides</a>, but it handles the 95% of medical issues that are minor, manageable, and common. Pack it. Know what everything does. Tell your guide when something is wrong. And make sure your <a href="/kilimanjaro-climbing-gear/">climbing gear</a> includes this kit as a non-negotiable item — not buried in your duffel with the porters, but in your daypack, within arm's reach, every single day on the mountain.</p>
`;

/* ------------------------------------------------------------------ */
/*  Posts array                                                        */
/* ------------------------------------------------------------------ */
const posts = [
  {
    slug: "kilimanjaro-cooking-mountain-chef",
    title: "Kilimanjaro Mountain Chefs: The Unsung Heroes Behind Every Summit",
    metaTitle: "Kilimanjaro Mountain Chefs & Cooking at 5,000m",
    metaDescription:
      "Meet the mountain chefs who cook 3 hot meals a day at 5,000m on Kilimanjaro. How they work, what they cook, kitchen setup, crew meals, and why food quality determines summit success.",
    excerpt:
      "The mountain chef is the most underrated member of your Kilimanjaro crew. Learn how they cook three hot meals a day at 5,000m, what they serve, and why food quality determines summit success.",
    content: post1Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "Mountain Chef", slug: "mountain-chef" },
      { name: "Crew", slug: "crew" },
      { name: "Food", slug: "food" },
    ],
  },
  {
    slug: "kilimanjaro-first-aid-kit",
    title: "Kilimanjaro First Aid Kit: What to Pack for Medical Emergencies",
    metaTitle: "Kilimanjaro First Aid Kit Checklist 2026",
    metaDescription:
      "Complete first aid kit checklist for Kilimanjaro. What medications to bring, blister treatment, altitude sickness remedies, wound care, and what your operator carries for emergencies.",
    excerpt:
      "A complete, practical first aid kit checklist for Kilimanjaro. What medications to bring, blister prevention, altitude medication dosages, and what your operator already carries.",
    content: post2Content,
    categorySlug: "kilimanjaro",
    categoryName: "Kilimanjaro",
    tags: [
      { name: "First Aid", slug: "first-aid" },
      { name: "Safety", slug: "safety" },
      { name: "Health", slug: "health" },
      { name: "Medications", slug: "medications" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Main seeder                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  console.log("Seeding 2 Kilimanjaro blog posts (batch 19b)...\n");

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
