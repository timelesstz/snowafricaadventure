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
  },
  {
    icon: Award,
    label: "KINAPA",
    sublabel: "Certified Guides",
  },
  {
    icon: Heart,
    label: "KPAP",
    sublabel: "Porter Welfare Partner",
  },
  {
    icon: Star,
    label: "93%",
    sublabel: "Summit Success Rate",
  },
  {
    icon: Users,
    label: "800+",
    sublabel: "Successful Summits",
  },
];

export function CredentialsBadges({ variant = "full" }: CredentialsBadgesProps) {
  if (variant === "compact") {
    return (
      <section aria-label="Our credentials" className="bg-white border-b border-[var(--border)]">
        <ul className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-0 md:divide-x md:divide-[var(--border)]">
          {credentials.map((cred) => (
            <li key={cred.label} className="flex items-center gap-2 md:px-6">
              <cred.icon className="w-4 h-4 shrink-0 text-[var(--secondary-ink)]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[var(--text)]">{cred.label}</span>
              <span className="hidden xl:inline text-xs text-[var(--text-muted)]">{cred.sublabel}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white border-y border-[var(--border)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {credentials.map((cred) => (
            <div
              key={cred.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white"
            >
              <cred.icon className="w-5 h-5 shrink-0 text-[var(--secondary-ink)]" aria-hidden="true" />
              <div>
                <p className="font-bold text-sm leading-none text-[var(--text)]">{cred.label}</p>
                <p className="text-[11px] leading-tight text-[var(--text-muted)] mt-0.5">{cred.sublabel}</p>
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
