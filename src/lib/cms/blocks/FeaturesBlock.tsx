import { Calendar, MapPin, Users, Star, Shield, Compass, Heart, Camera } from "lucide-react";

const ICONS: Record<string, typeof Calendar> = {
  calendar: Calendar,
  mappin: MapPin,
  users: Users,
  star: Star,
  shield: Shield,
  compass: Compass,
  heart: Heart,
  camera: Camera,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesBlockProps {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  features: Feature[];
  columns: number;
  bgColor: string;
}

export function FeaturesBlock({
  sectionLabel,
  heading,
  subtitle,
  features,
  columns,
  bgColor,
}: FeaturesBlockProps) {
  const bgClass = bgColor === "surface" ? "bg-[var(--surface)]" : bgColor === "muted" ? "bg-[var(--muted)]" : "";
  const colClass = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          {sectionLabel && (
            <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
              {sectionLabel}
            </span>
          )}
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          {subtitle && (
            <p className="text-[var(--text-muted)] text-lg">{subtitle}</p>
          )}
        </div>
        <div className={`grid ${colClass} gap-6`}>
          {features.map((feat, i) => {
            const IconComp = ICONS[feat.icon] || Star;
            return (
              <div
                key={i}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComp className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">{feat.title}</h3>
                <p className="text-sm text-[var(--text-muted)] text-center">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

FeaturesBlock.defaultProps = {
  sectionLabel: "",
  heading: "Why Choose Us",
  subtitle: "",
  features: [
    { icon: "calendar", title: "Feature One", description: "Description here" },
    { icon: "mappin", title: "Feature Two", description: "Description here" },
    { icon: "users", title: "Feature Three", description: "Description here" },
  ],
  columns: 3,
  bgColor: "none",
};
