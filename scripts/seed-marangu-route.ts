import "dotenv/config";
import prisma from "../src/lib/prisma";

/**
 * Complete Marangu Route Seed Data
 * This provides a complete reference implementation for route details page
 */
async function seedMaranguRoute() {
  console.log("🏔️ Seeding Marangu Route with complete data...");

  // Get the Kilimanjaro category
  const category = await prisma.category.findFirst({
    where: { slug: "kilimanjaro-routes" },
  });

  if (!category) {
    console.error("❌ Kilimanjaro routes category not found. Run main seed first.");
    return;
  }

  // Complete itinerary data for 5-Day Marangu Route
  const itinerary = [
    {
      day: 1,
      title: "Marangu Gate to Mandara Hut",
      description:
        "After breakfast, drive to Marangu Gate (1,860m) for registration. Begin your trek through lush montane rainforest alive with colobus monkeys and exotic birds. The well-maintained trail offers a gentle introduction to high-altitude trekking. Arrive at Mandara Hut in time for hot lunch.",
      elevation: "1,860m → 2,720m",
      distance: "8km",
      camp: "2,720m",
      meals: "Lunch, Dinner",
      duration: "3-4 hrs",
      image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&h=400&fit=crop",
      tags: ["Rainforest", "Wildlife", "First Camp"],
    },
    {
      day: 2,
      title: "Mandara Hut to Horombo Hut",
      description:
        "Trek through the heather and moorland zone with stunning views of Mawenzi Peak and Kibo. The landscape transforms dramatically as you ascend above the tree line. Horombo Hut sits in a valley between the two peaks, offering spectacular sunset views.",
      elevation: "2,720m → 3,720m",
      distance: "12km",
      camp: "3,720m",
      meals: "Breakfast, Lunch, Dinner",
      duration: "5-7 hrs",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
      tags: ["Moorland", "Scenic Views", "Moderate"],
    },
    {
      day: 3,
      title: "Horombo Hut to Kibo Hut",
      description:
        "Cross the lunar-like alpine desert known as 'The Saddle' between Mawenzi and Kibo peaks. The terrain becomes rocky and barren as you approach Kibo Hut at the base of the final summit cone. Early dinner and rest before the midnight summit attempt.",
      elevation: "3,720m → 4,700m",
      distance: "10km",
      camp: "4,700m",
      meals: "Breakfast, Lunch, Dinner",
      duration: "5-6 hrs",
      image: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=600&h=400&fit=crop",
      tags: ["Alpine Desert", "Acclimatization", "The Saddle"],
    },
    {
      day: 4,
      title: "Summit Day - Uhuru Peak & Descent to Horombo",
      description:
        "Begin the summit push at midnight under starlit skies. Climb through volcanic scree to Gilman's Point (5,685m) on the crater rim, then traverse to Uhuru Peak (5,895m) - the Roof of Africa! Watch the sunrise paint the glaciers gold. Descend all the way to Horombo Hut for overnight rest.",
      elevation: "4,700m → 5,895m → 3,720m",
      distance: "21km",
      camp: "3,720m",
      meals: "Breakfast, Lunch, Dinner",
      duration: "12-16 hrs",
      image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=600&h=400&fit=crop",
      tags: ["Summit", "Uhuru Peak", "Challenging"],
    },
    {
      day: 5,
      title: "Descent to Marangu Gate",
      description:
        "Final descent through all vegetation zones back to Marangu Gate. Receive your summit certificates and celebrate with your crew. Transfer to your hotel in Moshi for a well-deserved hot shower and celebration dinner.",
      elevation: "3,720m → 1,860m",
      distance: "20km",
      camp: "End",
      meals: "Breakfast, Lunch",
      duration: "5-6 hrs",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
      tags: ["Descent", "Certificates", "Celebration"],
    },
  ];

  // Elevation profile data for the route visualization
  const elevationProfile = [
    { day: 1, elevation: 2720, camp: "Mandara" },
    { day: 2, elevation: 3720, camp: "Horombo" },
    { day: 3, elevation: 4700, camp: "Kibo" },
    { day: 4, elevation: 5895, camp: "Summit" },
    { day: 5, elevation: 1860, camp: "Gate" },
  ];

  // FAQs specific to Marangu Route
  const faqs = [
    {
      question: "Why is the Marangu Route called the 'Coca-Cola Route'?",
      answer:
        "The Marangu Route earned its nickname because it's the oldest and most established route on Kilimanjaro, and historically Coca-Cola was sold at the huts along the way. It's also considered the most 'comfortable' route due to its hut accommodation and gentler gradient.",
    },
    {
      question: "What type of accommodation is provided on Marangu Route?",
      answer:
        "Unlike other Kilimanjaro routes, Marangu is the only route offering dormitory-style hut accommodation. Huts have bunk beds with mattresses, dining halls, and basic toilet facilities. This makes it popular for trekkers who prefer sleeping in beds rather than tents.",
    },
    {
      question: "Is the 5-day Marangu itinerary enough for acclimatization?",
      answer:
        "The 5-day itinerary is the minimum for Marangu Route. While achievable for fit trekkers, we recommend the 6-day option with an extra acclimatization day at Horombo Hut for better summit success rates. The extra day increases success rates from around 65% to 85%.",
    },
    {
      question: "What is the success rate on Marangu Route?",
      answer:
        "The Marangu Route has a success rate of approximately 65% for 5-day itineraries and 85% for 6-day itineraries. The shorter itineraries have lower success rates due to less acclimatization time. Proper preparation and fitness significantly improve your chances.",
    },
    {
      question: "What should I pack for the Marangu Route?",
      answer:
        "Essential items include layered clothing (thermal base, fleece mid-layer, waterproof outer shell), sturdy hiking boots, warm sleeping bag (-20°C rated), headlamp, trekking poles, and personal toiletries. We provide a detailed packing list upon booking. Since huts are provided, you don't need to carry a tent.",
    },
    {
      question: "What is the best time to climb via Marangu Route?",
      answer:
        "The best months are January-March and June-October during the dry seasons. January-March offers clearer skies and fewer crowds. June-October is peak season with colder temperatures but stable weather. We operate year-round but recommend avoiding April-May (long rains).",
    },
    {
      question: "How difficult is the Marangu Route compared to other routes?",
      answer:
        "Marangu is often considered the 'easiest' route due to its gradual slopes and hut accommodation. However, the same ascent and descent path means less varied scenery and altitude exposure. Technically easier, but don't underestimate altitude challenges.",
    },
    {
      question: "Are there toilets and water on the Marangu Route?",
      answer:
        "Yes, each hut has basic toilet facilities and running water (cold). Hot water for washing can be provided by our crew. We recommend bringing water purification tablets or a filter as backup. Our crew provides safe drinking water throughout the trek.",
    },
  ];

  // Group pricing tiers
  const pricingTiers = [
    { groupSize: "1 Person", price: 2450, description: "Private climb experience" },
    { groupSize: "2-4 People", price: 1950, description: "Small group adventure", savings: 500 },
    { groupSize: "5-7 People", price: 1750, description: "Medium group savings", savings: 700 },
    { groupSize: "8-10 People", price: 1650, description: "Large group discount", savings: 800 },
    { groupSize: "11 & Above", price: 1550, description: "Best value for groups", savings: 900 },
  ];

  // Upsert the Marangu Route with complete data
  const route = await prisma.trekkingRoute.upsert({
    where: { slug: "5-days-marangu-route" },
    update: {
      title: "5-Day Marangu Route",
      metaTitle: "5-Day Marangu Route - Kilimanjaro's Classic 'Coca-Cola Route' | Snow Africa",
      metaDescription:
        "Climb Kilimanjaro via the classic Marangu Route with hut accommodation. 5-day trek from $1,550. The most comfortable route with dormitory-style huts. Book now!",
      duration: "5 Days",
      durationDays: 5,
      maxPeople: 12,
      startPoint: "Marangu Gate (1,860m)",
      endPoint: "Marangu Gate (1,860m)",
      ageRange: "12 - 70+",
      physicalRating: "Moderate",
      successRate: 65,
      overview: `The Marangu Route, affectionately known as the "Coca-Cola Route," is Kilimanjaro's oldest and most established climbing path. It's the only route offering dormitory-style hut accommodation, making it the most comfortable option for trekkers who prefer sleeping in beds rather than tents.

This classic route approaches the summit from the southeast, following the same path for both ascent and descent. The well-maintained trail passes through diverse ecological zones - from lush montane rainforest teeming with colobus monkeys and exotic birds, through the atmospheric heather and moorland zone, across the stark alpine desert, and finally to the snow-capped summit.

While often described as the "easiest" route due to its gradual slopes and comfortable huts, the Marangu Route should not be underestimated. The shorter standard itinerary means less time for acclimatization, which is why we offer both 5-day and 6-day options. The 6-day itinerary includes an extra acclimatization day at Horombo Hut, significantly improving summit success rates.

Perfect for first-time high-altitude trekkers and those who value comfort, the Marangu Route offers an authentic Kilimanjaro experience with all the essential mountain infrastructure in place.`,
      highlights: [
        "Only route with hut accommodation (beds provided)",
        "Most comfortable trekking experience",
        "Well-maintained, gradual trail",
        "Same scenic ascent and descent path",
        "Rich biodiversity in rainforest zone",
        "Stunning views of Mawenzi Peak",
        "Historic route with mountain heritage",
        "Ideal for first-time high-altitude trekkers",
      ],
      itinerary: itinerary,
      inclusions: [
        "Park entrance fees (KINAPA fees)",
        "Professional KINAPA-licensed mountain guides",
        "Experienced porters and cook team",
        "All meals on the mountain (breakfast, lunch, dinner)",
        "Hut accommodation fees",
        "Filtered drinking water",
        "Emergency oxygen cylinder",
        "First aid kit and pulse oximeter",
        "Airport pickup and drop-off",
        "Pre-trek hotel accommodation (1 night)",
        "Post-trek hotel accommodation (1 night)",
        "Summit certificates",
        "All local taxes",
      ],
      exclusions: [
        "International flights",
        "Tanzania visa fees",
        "Travel and medical insurance (mandatory)",
        "Personal trekking gear and equipment",
        "Sleeping bag rental ($30 if needed)",
        "Tips for mountain crew (suggested $150-200)",
        "Personal expenses and snacks",
        "Optional crater camping ($50 extra)",
        "Alcoholic beverages",
      ],
      faqs: faqs,
      featuredImage: "/images/routes/marangu-hero.jpg",
      gallery: [
        "/images/routes/marangu/gallery-1.jpg",
        "/images/routes/marangu/gallery-2.jpg",
        "/images/routes/marangu/gallery-3.jpg",
        "/images/routes/marangu/gallery-4.jpg",
        "/images/routes/marangu/gallery-5.jpg",
        "/images/routes/marangu/gallery-6.jpg",
      ],
      routeMapImage: "/images/routes/marangu-map.jpg",
      isActive: true,
      categoryId: category.id,
    },
    create: {
      slug: "5-days-marangu-route",
      title: "5-Day Marangu Route",
      metaTitle: "5-Day Marangu Route - Kilimanjaro's Classic 'Coca-Cola Route' | Snow Africa",
      metaDescription:
        "Climb Kilimanjaro via the classic Marangu Route with hut accommodation. 5-day trek from $1,550. The most comfortable route with dormitory-style huts. Book now!",
      duration: "5 Days",
      durationDays: 5,
      maxPeople: 12,
      startPoint: "Marangu Gate (1,860m)",
      endPoint: "Marangu Gate (1,860m)",
      ageRange: "12 - 70+",
      physicalRating: "Moderate",
      successRate: 65,
      overview: `The Marangu Route, affectionately known as the "Coca-Cola Route," is Kilimanjaro's oldest and most established climbing path. It's the only route offering dormitory-style hut accommodation, making it the most comfortable option for trekkers who prefer sleeping in beds rather than tents.

This classic route approaches the summit from the southeast, following the same path for both ascent and descent. The well-maintained trail passes through diverse ecological zones - from lush montane rainforest teeming with colobus monkeys and exotic birds, through the atmospheric heather and moorland zone, across the stark alpine desert, and finally to the snow-capped summit.

While often described as the "easiest" route due to its gradual slopes and comfortable huts, the Marangu Route should not be underestimated. The shorter standard itinerary means less time for acclimatization, which is why we offer both 5-day and 6-day options. The 6-day itinerary includes an extra acclimatization day at Horombo Hut, significantly improving summit success rates.

Perfect for first-time high-altitude trekkers and those who value comfort, the Marangu Route offers an authentic Kilimanjaro experience with all the essential mountain infrastructure in place.`,
      highlights: [
        "Only route with hut accommodation (beds provided)",
        "Most comfortable trekking experience",
        "Well-maintained, gradual trail",
        "Same scenic ascent and descent path",
        "Rich biodiversity in rainforest zone",
        "Stunning views of Mawenzi Peak",
        "Historic route with mountain heritage",
        "Ideal for first-time high-altitude trekkers",
      ],
      itinerary: itinerary,
      inclusions: [
        "Park entrance fees (KINAPA fees)",
        "Professional KINAPA-licensed mountain guides",
        "Experienced porters and cook team",
        "All meals on the mountain (breakfast, lunch, dinner)",
        "Hut accommodation fees",
        "Filtered drinking water",
        "Emergency oxygen cylinder",
        "First aid kit and pulse oximeter",
        "Airport pickup and drop-off",
        "Pre-trek hotel accommodation (1 night)",
        "Post-trek hotel accommodation (1 night)",
        "Summit certificates",
        "All local taxes",
      ],
      exclusions: [
        "International flights",
        "Tanzania visa fees",
        "Travel and medical insurance (mandatory)",
        "Personal trekking gear and equipment",
        "Sleeping bag rental ($30 if needed)",
        "Tips for mountain crew (suggested $150-200)",
        "Personal expenses and snacks",
        "Optional crater camping ($50 extra)",
        "Alcoholic beverages",
      ],
      faqs: faqs,
      featuredImage: "/images/routes/marangu-hero.jpg",
      gallery: [
        "/images/routes/marangu/gallery-1.jpg",
        "/images/routes/marangu/gallery-2.jpg",
        "/images/routes/marangu/gallery-3.jpg",
        "/images/routes/marangu/gallery-4.jpg",
        "/images/routes/marangu/gallery-5.jpg",
        "/images/routes/marangu/gallery-6.jpg",
      ],
      routeMapImage: "/images/routes/marangu-map.jpg",
      isActive: true,
      categoryId: category.id,
    },
  });

  console.log(`✅ Created/Updated Marangu Route: ${route.id}`);

  // Create sample departures for the route
  // For 5-day Marangu: Day 0 = arrival, Day 1-5 = trek, Day 5 = summit
  const now = new Date();
  const year = now.getFullYear();

  const departures = [
    {
      arrivalDate: new Date(year, now.getMonth() + 1, 14),
      startDate: new Date(year, now.getMonth() + 1, 15),
      summitDate: new Date(year, now.getMonth() + 1, 19),
      endDate: new Date(year, now.getMonth() + 1, 20),
      price: 1950,
      maxParticipants: 12,
      status: "OPEN" as const,
      year: year,
      month: now.getMonth() + 2, // JS months are 0-indexed, so add 2
    },
    {
      arrivalDate: new Date(year, now.getMonth() + 1, 28),
      startDate: new Date(year, now.getMonth() + 2, 1),
      summitDate: new Date(year, now.getMonth() + 2, 5),
      endDate: new Date(year, now.getMonth() + 2, 6),
      price: 1950,
      maxParticipants: 12,
      status: "OPEN" as const,
      year: year,
      month: now.getMonth() + 3,
    },
    {
      arrivalDate: new Date(year, now.getMonth() + 2, 14),
      startDate: new Date(year, now.getMonth() + 2, 15),
      summitDate: new Date(year, now.getMonth() + 2, 19),
      endDate: new Date(year, now.getMonth() + 2, 20),
      price: 1850,
      maxParticipants: 12,
      status: "OPEN" as const,
      isGuaranteed: true,
      year: year,
      month: now.getMonth() + 3,
    },
    {
      arrivalDate: new Date(year, now.getMonth() + 2, 28),
      startDate: new Date(year, now.getMonth() + 3, 1),
      summitDate: new Date(year, now.getMonth() + 3, 5),
      endDate: new Date(year, now.getMonth() + 3, 6),
      price: 1950,
      maxParticipants: 12,
      status: "OPEN" as const,
      year: year,
      month: now.getMonth() + 4,
    },
  ];

  // Delete existing departures for this route and create new ones
  await prisma.groupDeparture.deleteMany({
    where: { routeId: route.id },
  });

  for (const departure of departures) {
    await prisma.groupDeparture.create({
      data: {
        ...departure,
        routeId: route.id,
      },
    });
  }

  console.log(`✅ Created ${departures.length} departures for Marangu Route`);

  console.log("\n🎉 Marangu Route seeding complete!");
  console.log(`   View at: /trekking/5-days-marangu-route/`);
}

seedMaranguRoute()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
