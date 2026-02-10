/**
 * Client-safe Authentication Types
 * =================================
 * These types can be safely imported in client components
 * without pulling in @prisma/client
 */

// Define AdminRole as a string union type (mirrors Prisma enum)
export type AdminRole = "VIEWER" | "EDITOR" | "ADMIN" | "SUPER_ADMIN";

/**
 * Get human-readable role name
 */
export function getRoleName(role: AdminRole): string {
  const names: Record<AdminRole, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Administrator",
    EDITOR: "Editor",
    VIEWER: "Viewer",
  };
  return names[role];
}

/**
 * Get role badge color for UI
 */
export function getRoleColor(role: AdminRole): string {
  const colors: Record<AdminRole, string> = {
    SUPER_ADMIN: "bg-purple-100 text-purple-800",
    ADMIN: "bg-blue-100 text-blue-800",
    EDITOR: "bg-green-100 text-green-800",
    VIEWER: "bg-gray-100 text-gray-800",
  };
  return colors[role];
}
