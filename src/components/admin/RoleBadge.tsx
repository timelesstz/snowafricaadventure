"use client";

import { type AdminRole, getRoleName, getRoleColor } from "@/lib/auth-types-client";
import { Shield, ShieldCheck, Edit, Eye } from "lucide-react";

interface RoleBadgeProps {
  role: AdminRole;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const roleIcons: Record<AdminRole, typeof Shield> = {
  SUPER_ADMIN: ShieldCheck,
  ADMIN: Shield,
  EDITOR: Edit,
  VIEWER: Eye,
};

export function RoleBadge({ role, showIcon = true, size = "md" }: RoleBadgeProps) {
  const Icon = roleIcons[role];
  const colorClasses = getRoleColor(role);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${colorClasses} ${sizeClasses[size]}`}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {getRoleName(role)}
    </span>
  );
}
