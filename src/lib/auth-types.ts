/**
 * Authentication and Role-Based Access Control Types
 * ===================================================
 */

import { AdminRole } from "@prisma/client";

// Re-export AdminRole for convenience
export { AdminRole };

/**
 * Extended user type with role information
 */
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

/**
 * Session user type
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

/**
 * Permission definitions for each role
 */
export const ROLE_PERMISSIONS = {
  [AdminRole.SUPER_ADMIN]: {
    canManageAdmins: true,
    canManagePartners: true,
    canManageCommissions: true,
    canManagePayouts: true,
    canEditContent: true,
    canViewReports: true,
    canViewDashboard: true,
    canManageSettings: true,
    canExportData: true,
  },
  [AdminRole.ADMIN]: {
    canManageAdmins: false,
    canManagePartners: true,
    canManageCommissions: true,
    canManagePayouts: true,
    canEditContent: true,
    canViewReports: true,
    canViewDashboard: true,
    canManageSettings: true,
    canExportData: true,
  },
  [AdminRole.EDITOR]: {
    canManageAdmins: false,
    canManagePartners: false,
    canManageCommissions: false,
    canManagePayouts: false,
    canEditContent: true,
    canViewReports: true,
    canViewDashboard: true,
    canManageSettings: false,
    canExportData: false,
  },
  [AdminRole.VIEWER]: {
    canManageAdmins: false,
    canManagePartners: false,
    canManageCommissions: false,
    canManagePayouts: false,
    canEditContent: false,
    canViewReports: true,
    canViewDashboard: true,
    canManageSettings: false,
    canExportData: false,
  },
} as const;

export type Permission = keyof typeof ROLE_PERMISSIONS["SUPER_ADMIN"];

/**
 * Route protection configuration
 */
export const PROTECTED_ROUTES: Record<string, { minRole: AdminRole; permission?: Permission }> = {
  // Admin management - SUPER_ADMIN only
  "/admin/users": { minRole: AdminRole.SUPER_ADMIN, permission: "canManageAdmins" },
  "/api/admin/users": { minRole: AdminRole.SUPER_ADMIN, permission: "canManageAdmins" },

  // Partner management - ADMIN+
  "/admin/partners": { minRole: AdminRole.ADMIN, permission: "canManagePartners" },
  "/api/admin/partners": { minRole: AdminRole.ADMIN, permission: "canManagePartners" },

  // Commission management - ADMIN+
  "/admin/commissions": { minRole: AdminRole.ADMIN, permission: "canManageCommissions" },
  "/api/admin/commissions": { minRole: AdminRole.ADMIN, permission: "canManageCommissions" },

  // Payout management - ADMIN+
  "/admin/commissions/payouts": { minRole: AdminRole.ADMIN, permission: "canManagePayouts" },
  "/api/admin/payouts": { minRole: AdminRole.ADMIN, permission: "canManagePayouts" },

  // Settings - ADMIN+
  "/admin/settings": { minRole: AdminRole.ADMIN, permission: "canManageSettings" },

  // Dashboard and analytics - all roles can view
  "/admin": { minRole: AdminRole.VIEWER, permission: "canViewDashboard" },
  "/admin/analytics": { minRole: AdminRole.VIEWER, permission: "canViewReports" },
};

/**
 * Role hierarchy for comparison
 * Higher number = more permissions
 */
export const ROLE_HIERARCHY: Record<AdminRole, number> = {
  [AdminRole.SUPER_ADMIN]: 4,
  [AdminRole.ADMIN]: 3,
  [AdminRole.EDITOR]: 2,
  [AdminRole.VIEWER]: 1,
};

/**
 * Check if a role has at least the minimum required role level
 */
export function hasMinRole(userRole: AdminRole, minRole: AdminRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role][permission];
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: AdminRole) {
  return ROLE_PERMISSIONS[role];
}

/**
 * Get human-readable role name
 */
export function getRoleName(role: AdminRole): string {
  const names: Record<AdminRole, string> = {
    [AdminRole.SUPER_ADMIN]: "Super Admin",
    [AdminRole.ADMIN]: "Administrator",
    [AdminRole.EDITOR]: "Editor",
    [AdminRole.VIEWER]: "Viewer",
  };
  return names[role];
}

/**
 * Get role badge color for UI
 */
export function getRoleColor(role: AdminRole): string {
  const colors: Record<AdminRole, string> = {
    [AdminRole.SUPER_ADMIN]: "bg-purple-100 text-purple-800",
    [AdminRole.ADMIN]: "bg-blue-100 text-blue-800",
    [AdminRole.EDITOR]: "bg-green-100 text-green-800",
    [AdminRole.VIEWER]: "bg-gray-100 text-gray-800",
  };
  return colors[role];
}
