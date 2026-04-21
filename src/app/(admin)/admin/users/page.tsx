import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminRole } from "@prisma/client";
import { UserPlus, Mail, Clock, Users } from "lucide-react";
import Link from "next/link";
import { RoleBadge } from "@/components/admin/RoleBadge";
import {
  AdminPageHeader,
  EmptyState,
  DataTable,
  StatusBadge,
  type Column,
} from "@/components/admin/ui";

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

type UserRow = Awaited<ReturnType<typeof getUsers>>[number];

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== AdminRole.SUPER_ADMIN) {
    redirect("/admin?error=insufficient_permissions");
  }

  const users = await getUsers();

  const addUserButton = (
    <Link
      href="/admin/users/new"
      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
    >
      <UserPlus className="w-4 h-4" aria-hidden="true" />
      Add User
    </Link>
  );

  const columns: Column<UserRow>[] = [
    {
      key: "user",
      header: "User",
      render: (u) => (
        <div>
          <p className="font-medium text-slate-900">{u.name}</p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            <Mail className="w-3 h-3" aria-hidden="true" />
            {u.email}
          </p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (u) => <RoleBadge role={u.role} size="sm" />,
    },
    {
      key: "status",
      header: "Status",
      render: (u) => (
        <StatusBadge
          label={u.isActive ? "Active" : "Inactive"}
          tone={u.isActive ? "success" : "danger"}
          size="sm"
        />
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (u) =>
        u.lastLoginAt ? (
          <span className="text-sm text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {new Date(u.lastLoginAt).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-sm text-slate-400">Never</span>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (u) => (
        <Link
          href={`/admin/users/${u.id}`}
          className="text-amber-600 hover:text-amber-700 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 px-2 py-1"
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="User Management"
        description="Manage admin users and their access levels"
        actions={addUserButton}
      />

      {users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          message="Add your first admin user to get started"
          action={addUserButton}
        />
      ) : (
        <DataTable columns={columns} rows={users} getRowKey={(u) => u.id} />
      )}

      {/* Role Legend */}
      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-6">
        <h2 className="text-h3 mb-4">Role Permissions</h2>
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
      </section>
    </div>
  );
}
