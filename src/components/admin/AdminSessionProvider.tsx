"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

// Redirects to login when a long-idle tab's session expires, instead of
// leaving a dead UI where every action silently 401s.
function SessionExpiryWatcher() {
  const { status } = useSession();

  useEffect(() => {
    const path = window.location.pathname;
    const isAuthPage =
      path.startsWith("/admin/login") ||
      path.startsWith("/admin/forgot-password") ||
      path.startsWith("/admin/reset-password") ||
      path.startsWith("/admin/reset-pin");
    if (status === "unauthenticated" && !isAuthPage) {
      window.location.href = "/admin/login/";
    }
  }, [status]);

  return null;
}

export function AdminSessionProvider({ children }: Props) {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      <SessionExpiryWatcher />
      {children}
    </SessionProvider>
  );
}
