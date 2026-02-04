"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] focus:ring-[var(--primary)]":
            variant === "primary",
          "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary-dark)] focus:ring-[var(--secondary)]":
            variant === "secondary",
          "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--surface)] focus:ring-[var(--primary)]":
            variant === "outline",
          "text-[var(--text-muted)] hover:bg-[var(--surface)] focus:ring-[var(--muted)]":
            variant === "ghost",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-colors",
        {
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]": variant === "primary",
          "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--secondary-dark)]": variant === "secondary",
          "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--surface)]":
            variant === "outline",
          "text-[var(--text-muted)] hover:bg-[var(--surface)]": variant === "ghost",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
    >
      {children}
    </Link>
  );
}
