import Link from "next/link";
import { Shield, Award, Heart, Star, Users } from "lucide-react";

interface CredentialsBadgesProps {
  variant?: "full" | "compact";
}

const credentials = [
  {
    icon: Shield,
    label: "TATO",
    sublabel: "Licensed Operator",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Award,
    label: "KINAPA",
    sublabel: "Certified Guides",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Heart,
    label: "KPAP",
    sublabel: "Porter Welfare Partner",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: Star,
    label: "93%",
    sublabel: "Summit Success Rate",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: Users,
    label: "800+",
    sublabel: "Successful Summits",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export function CredentialsBadges({ variant = "full" }: CredentialsBadgesProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {credentials.map((cred) => (
          <span
            key={cred.label}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${cred.color}`}
          >
            <cred.icon className="w-3.5 h-3.5" />
            {cred.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <section className="py-8 bg-white border-y border-[var(--border)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {credentials.map((cred) => (
            <div
              key={cred.label}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${cred.color}`}
            >
              <cred.icon className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm leading-none">{cred.label}</p>
                <p className="text-[10px] leading-tight opacity-70">{cred.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-3">
          <Link href="/our-guides/" className="hover:underline">Meet our certified guides</Link>
          {" · "}
          <Link href="/kilimanjaro-safety/" className="hover:underline">Safety standards</Link>
          {" · "}
          <Link href="/kilimanjaro-climbing-companies/" className="hover:underline">How to choose an operator</Link>
        </p>
      </div>
    </section>
  );
}
