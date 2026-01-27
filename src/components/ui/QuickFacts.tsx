import {
  Clock,
  Users,
  MapPin,
  Mountain,
  Calendar,
  Activity,
} from "lucide-react";

interface Fact {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface QuickFactsProps {
  facts: Fact[];
}

export function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <div className="bg-[var(--surface)] rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">Quick Facts</h3>
      <div className="space-y-3">
        {facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--surface)] rounded-full flex items-center justify-center text-[var(--primary)] shrink-0">
              {fact.icon}
            </div>
            <div>
              <p className="text-xs text-[var(--text-light)] uppercase tracking-wide">
                {fact.label}
              </p>
              <p className="font-medium text-[var(--text)]">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RouteQuickFactsProps {
  duration: string;
  maxPeople?: number;
  startPoint?: string;
  endPoint?: string;
  ageRange?: string;
  physicalRating?: string;
}

export function RouteQuickFacts({
  duration,
  maxPeople,
  startPoint,
  endPoint,
  ageRange,
  physicalRating,
}: RouteQuickFactsProps) {
  const facts: Fact[] = [
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Duration",
      value: duration,
    },
  ];

  if (maxPeople) {
    facts.push({
      icon: <Users className="w-4 h-4" />,
      label: "Max Group Size",
      value: `${maxPeople} people`,
    });
  }

  if (startPoint) {
    facts.push({
      icon: <MapPin className="w-4 h-4" />,
      label: "Start Point",
      value: startPoint,
    });
  }

  if (endPoint) {
    facts.push({
      icon: <Mountain className="w-4 h-4" />,
      label: "End Point",
      value: endPoint,
    });
  }

  if (ageRange) {
    facts.push({
      icon: <Calendar className="w-4 h-4" />,
      label: "Age Range",
      value: ageRange,
    });
  }

  if (physicalRating) {
    facts.push({
      icon: <Activity className="w-4 h-4" />,
      label: "Physical Rating",
      value: physicalRating,
    });
  }

  return <QuickFacts facts={facts} />;
}
