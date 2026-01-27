import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminRole } from "@prisma/client";
import { UserPlus, Mail, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { RoleBadge } from "@/components/admin/RoleBadge";

async function getUsers() {
  return prisma.adminUser.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function UsersPage() {
  const session = await auth();

  // Double-check SUPER_ADMIN access (middleware should catch this, but safety first)
  if (!session?.user || session.user.role !== AdminRole.SUPER_ADMIN) {
    redirect("/admin?error=insufficient_permissions");
  }

  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-600 mt-1">
            Manage admin users and their access levels
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                User
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Role
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Last Login
              </th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <RoleBadge role={user.role} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {user.lastLoginAt ? (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(user.lastLoginAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-slate-400">Never</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No users found</p>
          </div>
        )}
      </div>

      {/* Role Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Role Permissions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <RoleBadge role={AdminRole.SUPER_ADMIN} />
            <p className="text-sm text-slate-600 mt-2">
              Full access including user management
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <RoleBadge role={AdminRole.ADMIN} />
            <p className="text-sm text-slate-600 mt-2">
              Full access to content and operations
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <RoleBadge role={AdminRole.EDITOR} />
            <p className="text-sm text-slate-600 mt-2">
              Can edit content and view reports
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <RoleBadge role={AdminRole.VIEWER} />
            <p className="text-sm text-slate-600 mt-2">
              Read-only access to dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
