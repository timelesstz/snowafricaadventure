import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminSessionProvider } from "@/components/admin/AdminSessionProvider";
import AdminPWA from "@/components/admin/AdminPWA";
import { AdminRole } from "@prisma/client";

import type { Viewport } from "next";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
  manifest: "/admin/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent" as const,
    title: "SA Admin",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e293b",
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
        <AdminPWA />
      </div>
    </AdminSessionProvider>
  );
}
