import Link from "next/link";
import {
  Mountain,
  TrendingUp,
  Heart,
  Shield,
  Activity,
  Users,
  DollarSign,
  BarChart3,
  Calendar,
  Backpack,
  Award,
  Thermometer,
  Utensils,
  AlertTriangle,
  Globe,
  HandCoins,
  TreePine,
  Snowflake,
  Trophy,
  FileCheck,
  Plane,
  MapPin,
  Footprints,
  UserCheck,
  Map,
  type LucideIcon,
} from "lucide-react";

interface GuideLink {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const allGuides: GuideLink[] = [
  { href: "/climbing-kilimanjaro/", icon: Mountain, title: "Climbing Kilimanjaro", subtitle: "Complete guide" },
  { href: "/how-hard-is-kilimanjaro/", icon: TrendingUp, title: "How Hard Is It?", subtitle: "Honest difficulty assessment" },
  { href: "/can-beginners-climb-kilimanjaro/", icon: Heart, title: "Beginners Guide", subtitle: "First-time climbers" },
  { href: "/kilimanjaro-altitude-sickness/", icon: AlertTriangle, title: "Altitude Sickness", subtitle: "Prevention & treatment" },
  { href: "/kilimanjaro-safety/", icon: Shield, title: "Safety Guide", subtitle: "Risks & how we manage them" },
  { href: "/kilimanjaro-deaths/", icon: BarChart3, title: "Death Statistics", subtitle: "Fatality data & context" },
  { href: "/kilimanjaro-training-plan/", icon: Activity, title: "Training Plan", subtitle: "12-week preparation" },
  { href: "/best-route-to-climb-kilimanjaro/", icon: Mountain, title: "Best Route Guide", subtitle: "Compare all routes" },
  { href: "/kilimanjaro-prices/", icon: DollarSign, title: "Prices & Costs", subtitle: "What it really costs" },
  { href: "/kilimanjaro-climbing-gear/", icon: Backpack, title: "Gear Checklist", subtitle: "What to pack" },
  { href: "/kilimanjaro-success-rates/", icon: Award, title: "Success Rates", subtitle: "Route-by-route data" },
  { href: "/kilimanjaro-statistics/", icon: BarChart3, title: "Statistics & Facts", subtitle: "50+ verified facts" },
  { href: "/best-time-to-climb-kilimanjaro/", icon: Calendar, title: "Best Time to Climb", subtitle: "Month-by-month guide" },
  { href: "/kilimanjaro-weather/", icon: Thermometer, title: "Weather Guide", subtitle: "Temperatures & rainfall" },
  { href: "/kilimanjaro-food-meals/", icon: Utensils, title: "Food & Meals", subtitle: "What you eat daily" },
  { href: "/kilimanjaro-climbing-companies/", icon: Globe, title: "Climbing Companies", subtitle: "How to choose" },
  { href: "/kilimanjaro-join-group-departures/", icon: Users, title: "Group Departures", subtitle: "Join a scheduled climb" },
  { href: "/mount-kilimanjaro-height/", icon: Mountain, title: "Kilimanjaro Height", subtitle: "Elevation & peaks" },
  { href: "/kilimanjaro-tipping-guide/", icon: HandCoins, title: "Tipping Guide", subtitle: "How much to tip" },
  { href: "/kilimanjaro-climate-zones/", icon: TreePine, title: "Climate Zones", subtitle: "5 worlds in one mountain" },
  { href: "/kilimanjaro-glaciers/", icon: Snowflake, title: "Glaciers", subtitle: "Why they're disappearing" },
  { href: "/kilimanjaro-records/", icon: Trophy, title: "Records & Firsts", subtitle: "Fastest climbs & history" },
  { href: "/kilimanjaro-travel-insurance/", icon: FileCheck, title: "Travel Insurance", subtitle: "What coverage you need" },
  { href: "/kilimanjaro-visa-tanzania/", icon: Globe, title: "Tanzania Visa", subtitle: "Requirements & e-Visa" },
  { href: "/kilimanjaro-airport-guide/", icon: Plane, title: "Airport Guide", subtitle: "JRO arrivals & transfers" },
  { href: "/kilimanjaro-day-hike/", icon: Footprints, title: "Day Hike", subtitle: "Trek without the summit" },
  { href: "/kilimanjaro-women-climbing/", icon: UserCheck, title: "Women's Guide", subtitle: "Tips for female climbers" },
  { href: "/kilimanjaro-solo-climb/", icon: Users, title: "Solo Climbing", subtitle: "Guide for solo trekkers" },
  { href: "/kilimanjaro-age-limits/", icon: Heart, title: "Age Limits", subtitle: "Minimum & maximum age" },
  { href: "/kilimanjaro-map/", icon: Map, title: "Route Map", subtitle: "Routes, camps & gates" },
  { href: "/our-guides/", icon: Users, title: "Our Guides", subtitle: "Meet the team" },
];

interface RelatedGuidesProps {
  currentPath: string;
  maxItems?: number;
  bgClass?: string;
}

export function RelatedGuides({ currentPath, maxItems = 7, bgClass = "bg-white" }: RelatedGuidesProps) {
  const guides = allGuides
    .filter((g) => g.href !== currentPath)
    .slice(0, maxItems);

  return (
    <section className={`py-12 ${bgClass} border-t border-[var(--border)]`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-xl font-bold mb-6 text-center">
            Related Guides
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="bg-[var(--surface)] rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <Icon className="w-6 h-6 text-[var(--secondary)] mb-2" />
                  <p className="font-semibold text-sm">{guide.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{guide.subtitle}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
