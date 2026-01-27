import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { AdminRole } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditUserForm } from "./EditUserForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function getUser(id: string) {
  return prisma.adminUser.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });
}

export default async function EditUserPage({ params }: Props) {
  const session = await auth();

  // Double-check SUPER_ADMIN access
  if (!session?.user || session.user.role !== AdminRole.SUPER_ADMIN) {
    redirect("/admin?error=insufficient_permissions");
  }

  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  const isCurrentUser = session.user.id === user.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>
          <p className="text-slate-600 mt-1">
            Update user details and permissions
          </p>
        </div>
      </div>

      <EditUserForm user={user} isCurrentUser={isCurrentUser} />
    </div>
  );
}
