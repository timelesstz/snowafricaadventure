import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
          "bg-[var(--muted)] text-[var(--text-muted)]": variant === "default",
          "bg-[var(--surface)] text-[var(--primary-dark)]": variant === "success",
          "bg-[var(--secondary-light)] text-[var(--secondary-dark)]": variant === "warning",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-blue-100 text-blue-700": variant === "info",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

interface AvailabilityBadgeProps {
  available: number;
  total: number;
  className?: string;
}

export function AvailabilityBadge({
  available,
  total,
  className,
}: AvailabilityBadgeProps) {
  const variant =
    available === 0 ? "danger" : available <= 3 ? "warning" : "success";

  const label =
    available === 0
      ? "Sold Out"
      : available <= 3
        ? `${available} Spots Left`
        : `${available} Spaces`;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}

interface SocialProofBadgeProps {
  bookedSpots: number;
  availableSpots: number;
  className?: string;
}

export function SocialProofBadge({
  bookedSpots,
  availableSpots,
  className,
}: SocialProofBadgeProps) {
  // Only show social proof if there's meaningful activity
  if (bookedSpots === 0) return null;

  const totalSpots = bookedSpots + availableSpots;
  const percentFilled = (bookedSpots / totalSpots) * 100;

  // "Filling fast" when >50% booked
  if (percentFilled >= 50 && availableSpots > 0) {
    return (
      <span className={cn(
        "text-xs text-[var(--secondary-dark)] font-medium animate-pulse",
        className
      )}>
        Filling Fast
      </span>
    );
  }

  return null;
}
