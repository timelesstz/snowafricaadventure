import Link from "next/link";

const COLUMNS = [
  {
    title: "Planning",
    links: [
      { href: "/climbing-kilimanjaro/", label: "Complete Climbing Guide" },
      { href: "/best-route-to-climb-kilimanjaro/", label: "Best Route to Climb" },
      { href: "/best-time-to-climb-kilimanjaro/", label: "Best Time to Climb" },
      { href: "/kilimanjaro-prices/", label: "Prices & Costs" },
      { href: "/kilimanjaro-join-group-departures/", label: "Group Departures" },
      { href: "/kilimanjaro-visa-tanzania/", label: "Tanzania Visa" },
      { href: "/kilimanjaro-airport-guide/", label: "Airport & Transfers" },
      { href: "/kilimanjaro-travel-insurance/", label: "Travel Insurance" },
    ],
  },
  {
    title: "Preparation",
    links: [
      { href: "/kilimanjaro-training-plan/", label: "12-Week Training Plan" },
      { href: "/kilimanjaro-climbing-gear/", label: "Gear & Packing List" },
      { href: "/kilimanjaro-altitude-sickness/", label: "Altitude Sickness" },
      { href: "/how-hard-is-kilimanjaro/", label: "How Hard Is It?" },
      { href: "/can-beginners-climb-kilimanjaro/", label: "Beginners Guide" },
      { href: "/kilimanjaro-food-meals/", label: "Food & Meals" },
      { href: "/kilimanjaro-tipping-guide/", label: "Tipping Guide" },
      { href: "/our-kilimanjaro-guides/", label: "Our Guides & Team" },
      { href: "/kilimanjaro-hygiene/", label: "Hygiene & Toilets" },
    ],
  },
  {
    title: "The Mountain",
    links: [
      { href: "/mount-kilimanjaro/", label: "Mount Kilimanjaro Overview" },
      { href: "/mount-kilimanjaro-height/", label: "Height & Elevation" },
      { href: "/kilimanjaro-climate-zones/", label: "5 Climate Zones" },
      { href: "/kilimanjaro-weather/", label: "Weather by Month" },
      { href: "/kilimanjaro-glaciers/", label: "Disappearing Glaciers" },
      { href: "/kilimanjaro-safety/", label: "Safety on the Mountain" },
      { href: "/kilimanjaro-deaths/", label: "Death Rate & Risks" },
      { href: "/kilimanjaro-success-rates/", label: "Success Rates by Route" },
    ],
  },
  {
    title: "Explore More",
    links: [
      { href: "/kilimanjaro-records/", label: "Records & Firsts" },
      { href: "/kilimanjaro-statistics/", label: "Statistics & Data" },
      { href: "/kilimanjaro-women-climbing/", label: "Women on Kilimanjaro" },
      { href: "/kilimanjaro-age-limits/", label: "Age Limits & Over 50s" },
      { href: "/kilimanjaro-solo-climb/", label: "Solo Climbing" },
      { href: "/kilimanjaro-day-hike/", label: "Day Hike Option" },
      { href: "/kilimanjaro-honeymoon/", label: "Honeymoon Climbs" },
      { href: "/kilimanjaro-paragliding/", label: "Summit Paragliding" },
    ],
  },
] as const;

const ARTICLES = [
  { href: "/kilimanjaro-meaning-name-origin/", label: 'Meaning of "Kilimanjaro"' },
  { href: "/where-is-mount-kilimanjaro/", label: "Where Is Kilimanjaro?" },
  { href: "/kilimanjaro-fun-facts/", label: "Fun Facts" },
  { href: "/kilimanjaro-vs-mount-kenya/", label: "Kilimanjaro vs Mount Kenya" },
  { href: "/kilimanjaro-barranco-wall/", label: "Barranco Wall Guide" },
  { href: "/kilimanjaro-vs-mount-meru/", label: "Kilimanjaro vs Mount Meru" },
  { href: "/kilimanjaro-shira-plateau/", label: "Shira Plateau" },
  { href: "/first-person-to-climb-kilimanjaro/", label: "First Ascent History" },
  { href: "/climbing-kilimanjaro-over-50/", label: "Climbing Over 50" },
  { href: "/kilimanjaro-safari-combo/", label: "Safari Combo Trips" },
  { href: "/kilimanjaro-summit-night/", label: "Summit Night Guide" },
  { href: "/kilimanjaro-porters/", label: "Porters & Crew" },
  { href: "/kilimanjaro-acclimatization/", label: "Acclimatization Science" },
  { href: "/kilimanjaro-lemosho-vs-machame/", label: "Lemosho vs Machame" },
  { href: "/kilimanjaro-machame-vs-rongai/", label: "Machame vs Rongai" },
  { href: "/kilimanjaro-northern-circuit/", label: "Northern Circuit Route" },
  { href: "/kilimanjaro-camping/", label: "Camping on Kilimanjaro" },
  { href: "/kilimanjaro-uhuru-peak/", label: "Uhuru Peak Guide" },
  { href: "/kilimanjaro-crater-camp/", label: "Crater Camp (5,729m)" },
  { href: "/kilimanjaro-full-moon-climb/", label: "Full Moon Climb" },
  { href: "/kilimanjaro-photography-guide/", label: "Photography Guide" },
  { href: "/kilimanjaro-fitness-test/", label: "Fitness Test" },
  { href: "/kilimanjaro-marangu-route-guide/", label: "Marangu Route Guide" },
  { href: "/kilimanjaro-umbwe-route/", label: "Umbwe Route Guide" },
  { href: "/kilimanjaro-rongai-route-guide/", label: "Rongai Route Guide" },
  { href: "/kilimanjaro-what-to-expect/", label: "What to Expect" },
  { href: "/kilimanjaro-budget-guide/", label: "Budget Guide" },
  { href: "/kilimanjaro-group-vs-private/", label: "Group vs Private" },
  { href: "/kilimanjaro-packing-mistakes/", label: "Packing Mistakes" },
  { href: "/kilimanjaro-after-summit/", label: "After the Summit" },
  { href: "/kilimanjaro-wildlife/", label: "Wildlife by Zone" },
  { href: "/kilimanjaro-vs-everest-base-camp/", label: "Kili vs Everest BC" },
  { href: "/kilimanjaro-rainy-season/", label: "Rainy Season Guide" },
  { href: "/kilimanjaro-with-kids/", label: "Climbing with Kids" },
  { href: "/kilimanjaro-drinking-water/", label: "Water & Hydration" },
  { href: "/kilimanjaro-certificates/", label: "Summit Certificates" },
  { href: "/kilimanjaro-night-sky/", label: "Night Sky & Stars" },
  { href: "/kilimanjaro-trail-running/", label: "Trail Running & FKTs" },
  { href: "/kilimanjaro-myths/", label: "12 Myths Debunked" },
  { href: "/kilimanjaro-phone-signal/", label: "Phone Signal Guide" },
  { href: "/kilimanjaro-sleeping-tips/", label: "Sleeping Tips" },
  { href: "/kilimanjaro-weight-loss/", label: "Weight Loss Science" },
  { href: "/kilimanjaro-volunteering/", label: "Charity & Volunteering" },
  { href: "/kilimanjaro-proposals/", label: "Summit Proposals" },
  { href: "/kilimanjaro-mental-preparation/", label: "Mental Preparation" },
  { href: "/kilimanjaro-summit-sunrise/", label: "Summit Sunrise" },
  { href: "/kilimanjaro-rescue-evacuation/", label: "Rescue & Evacuation" },
  { href: "/kilimanjaro-flora/", label: "Plants & Flora" },
  { href: "/kilimanjaro-diary/", label: "Day-by-Day Diary" },
  { href: "/kilimanjaro-vs-rainier/", label: "Kili vs Rainier" },
  { href: "/kilimanjaro-for-couples/", label: "Climbing as a Couple" },
  { href: "/kilimanjaro-photography-gear/", label: "Camera Gear Guide" },
  { href: "/kilimanjaro-returning-climbers/", label: "Returning Climbers" },
  { href: "/kilimanjaro-corporate-teams/", label: "Corporate Team Building" },
  { href: "/kilimanjaro-oxygen-levels/", label: "Oxygen Levels by Elevation" },
  { href: "/kilimanjaro-luxury-climb/", label: "Luxury Climb Packages" },
  { href: "/kilimanjaro-trekking-poles/", label: "Trekking Poles Guide" },
  { href: "/kilimanjaro-layering-system/", label: "Layering System Guide" },
  { href: "/kilimanjaro-headlamp-guide/", label: "Headlamp Guide" },
  { href: "/kilimanjaro-snacks-energy/", label: "Snacks & Energy Food" },
  { href: "/kilimanjaro-descent-tips/", label: "Descent Tips" },
  { href: "/kilimanjaro-stretching-guide/", label: "Stretching Routines" },
  { href: "/kilimanjaro-boots-guide/", label: "Hiking Boots Guide" },
  { href: "/kilimanjaro-sleeping-bags/", label: "Sleeping Bag Guide" },
  { href: "/kilimanjaro-backpack-daypack/", label: "Daypack Guide" },
  { href: "/kilimanjaro-sun-protection/", label: "Sun Protection" },
  { href: "/kilimanjaro-post-climb-recovery/", label: "Post-Climb Recovery" },
  { href: "/kilimanjaro-for-vegans/", label: "Vegan & Vegetarian Guide" },
  { href: "/kilimanjaro-christmas-new-year/", label: "Christmas & New Year Climbs" },
  { href: "/kilimanjaro-vs-elbrus/", label: "Kili vs Elbrus" },
  { href: "/kilimanjaro-from-usa/", label: "Climbing from the USA" },
  { href: "/kilimanjaro-altitude-training/", label: "Altitude Training" },
  { href: "/kilimanjaro-cooking-mountain-chef/", label: "Mountain Chefs" },
  { href: "/kilimanjaro-first-aid-kit/", label: "First Aid Kit" },
  { href: "/kilimanjaro-from-uk/", label: "Climbing from the UK" },
  { href: "/kilimanjaro-wildlife-encounters/", label: "Wildlife Encounters" },
  { href: "/kilimanjaro-helicopter-rescue/", label: "Helicopter Rescue" },
  { href: "/kilimanjaro-permits-park-fees/", label: "Park Fees & Permits" },
  { href: "/kilimanjaro-glacier-camp/", label: "Glacier Camp Guide" },
  { href: "/kilimanjaro-volunteer-clean-up/", label: "Clean-Up & Leave No Trace" },
  { href: "/kilimanjaro-stellas-point/", label: "Stella Point Guide" },
  { href: "/kilimanjaro-acclimatization-days/", label: "Acclimatization Days" },
  { href: "/kilimanjaro-lava-tower/", label: "Lava Tower Guide" },
  { href: "/kilimanjaro-mawenzi-peak/", label: "Mawenzi Peak" },
  { href: "/kilimanjaro-weather-forecast/", label: "Weather Forecast" },
  { href: "/kilimanjaro-gate-to-gate/", label: "Gate Registration" },
  { href: "/kilimanjaro-vs-mont-blanc/", label: "Kili vs Mont Blanc" },
  { href: "/kilimanjaro-geology/", label: "Geology & Formation" },
  { href: "/kilimanjaro-disabled-climbers/", label: "Disabled Climbers" },
  { href: "/kilimanjaro-history-timeline/", label: "History Timeline" },
  { href: "/kilimanjaro-arusha-guide/", label: "Arusha City Guide" },
  { href: "/kilimanjaro-group-dynamics/", label: "Group Dynamics" },
  { href: "/kilimanjaro-drone-rules/", label: "Drone Rules" },
  { href: "/kilimanjaro-charity-climbs/", label: "Charity Climbs" },
] as const;

export function KnowledgeBase({
  exclude,
  showArticles = true,
}: {
  exclude?: string;
  showArticles?: boolean;
}) {
  return (
    <section className="py-12 bg-white border-t border-[var(--border)]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-2 text-center">
            Kilimanjaro Knowledge Base
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-8">
            Everything you need to plan, prepare, and summit Africa&apos;s highest peak
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 text-sm">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-semibold text-[var(--primary)] mb-2 uppercase tracking-wide text-xs">
                  {col.title}
                </p>
                <ul className="space-y-1.5">
                  {col.links
                    .filter((link) => link.href !== exclude)
                    .map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-[var(--primary)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          {showArticles && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="font-semibold text-[var(--primary)] mb-3 uppercase tracking-wide text-xs">
                Featured Articles
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-1.5 text-sm">
                {ARTICLES.filter((a) => a.href !== exclude).map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    {article.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
