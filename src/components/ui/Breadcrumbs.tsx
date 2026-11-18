import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** "dark" for breadcrumbs placed on a photo or dark panel. */
  tone?: "light" | "dark";
}

const TONES = {
  light: {
    link: "text-[var(--text-light)] hover:text-[var(--primary)]",
    separator: "text-[var(--text-light)]",
    current: "text-[var(--text)]",
  },
  dark: {
    link: "text-white/75 hover:text-white",
    separator: "text-white/50",
    current: "text-white",
  },
} as const;

export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  const t = TONES[tone];
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex min-w-0 items-center flex-wrap gap-1 text-sm">
        <li>
          <Link href="/" className={`${t.link} transition-colors flex items-center`}>
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex min-w-0 items-center gap-1">
            <ChevronRight className={`w-4 h-4 shrink-0 ${t.separator}`} aria-hidden="true" />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className={`${t.link} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={`${t.current} font-medium truncate max-w-[18rem] sm:max-w-md`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
