"use client";

import { AdminRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { hasMinRole, hasPermission, Permission } from "@/lib/auth-types";

interface PermissionGateProps {
  children: React.ReactNode;
  minRole?: AdminRole;
  permission?: Permission;
  fallback?: React.ReactNode;
}

/**
 * Conditionally renders children based on user role/permissions
 * Use this for hiding UI elements that the user doesn't have access to
 */
export function PermissionGate({
  children,
  minRole,
  permission,
  fallback = null,
}: PermissionGateProps) {
  const { data: session, status } = useSession();

  // Still loading
  if (status === "loading") {
    return null;
  }

  // Not authenticated
  if (!session?.user?.role) {
    return <>{fallback}</>;
  }

  const userRole = session.user.role as AdminRole;

  // Check minimum role
  if (minRole && !hasMinRole(userRole, minRole)) {
    return <>{fallback}</>;
  }

  // Check specific permission
  if (permission && !hasPermission(userRole, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to check permissions in components
 */
export function usePermissions() {
  const { data: session } = useSession();
  const userRole = session?.user?.role as AdminRole | undefined;

  return {
    role: userRole,
    hasMinRole: (minRole: AdminRole) =>
      userRole ? hasMinRole(userRole, minRole) : false,
    hasPermission: (permission: Permission) =>
      userRole ? hasPermission(userRole, permission) : false,
    isAuthenticated: !!session?.user,
    isSuperAdmin: userRole === AdminRole.SUPER_ADMIN,
    isAdmin: userRole ? hasMinRole(userRole, AdminRole.ADMIN) : false,
    isEditor: userRole ? hasMinRole(userRole, AdminRole.EDITOR) : false,
  };
}
