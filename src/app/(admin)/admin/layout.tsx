import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";
import { AdminRole } from "@prisma/client";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If no session, just render children (for login page)
  // Middleware handles redirecting unauthenticated users from protected routes
  if (!session) {
    return <>{children}</>;
  }

  const user = {
    name: session.user?.name || null,
    email: session.user?.email || null,
    role: (session.user?.role as AdminRole) || AdminRole.VIEWER,
  };

  return (
    <AdminSessionProvider>
      <div className="min-h-screen bg-slate-100">
        <AdminSidebar user={user} />
        <main className="lg:pl-64 pt-16 lg:pt-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </AdminSessionProvider>
  );
}
