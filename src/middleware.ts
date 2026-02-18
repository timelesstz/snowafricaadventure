import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { AdminRole } from "@prisma/client";
import { checkRedirect, logRedirectHit } from "@/lib/redirect-cache";
import { detectBot } from "@/lib/bot-detector";
import { isRateLimited, RATE_LIMITS } from "@/lib/rate-limiter";

// Role hierarchy for comparison
const ROLE_HIERARCHY: Record<AdminRole, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

// Route protection configuration
const ROUTE_PERMISSIONS: Record<string, AdminRole> = {
  // Super Admin only routes
  "/admin/users": "SUPER_ADMIN" as AdminRole,
  "/api/admin/users": "SUPER_ADMIN" as AdminRole,

  // Admin+ routes (partners, commissions, payouts, settings)
  "/admin/partners": "ADMIN" as AdminRole,
  "/admin/partners/new": "ADMIN" as AdminRole,
  "/admin/commissions/payouts": "ADMIN" as AdminRole,
  "/admin/settings": "ADMIN" as AdminRole,
  "/api/admin/partners": "ADMIN" as AdminRole,
  "/api/admin/payouts": "ADMIN" as AdminRole,

  // Editor+ routes (commissions viewing, 404 monitor, redirects)
  "/admin/commissions": "EDITOR" as AdminRole,
  "/api/admin/commissions": "EDITOR" as AdminRole,
  "/admin/404-monitor": "EDITOR" as AdminRole,
  "/api/admin/404-monitor": "EDITOR" as AdminRole,
  "/admin/redirects": "EDITOR" as AdminRole,
  "/api/admin/redirects": "EDITOR" as AdminRole,

  // Viewer+ routes (dashboard, analytics)
  "/admin": "VIEWER" as AdminRole,
  "/admin/analytics": "VIEWER" as AdminRole,
  "/admin/theme": "VIEWER" as AdminRole,
};

function hasMinRole(userRole: AdminRole, minRole: AdminRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

function getRequiredRole(pathname: string): AdminRole | null {
  // Check exact match first
  if (ROUTE_PERMISSIONS[pathname]) {
    return ROUTE_PERMISSIONS[pathname];
  }

  // Check for dynamic routes (e.g., /admin/partners/[id])
  for (const [route, role] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route + "/")) {
      return role;
    }
  }

  // Default to VIEWER for any admin route not explicitly listed
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return "VIEWER" as AdminRole;
  }

  return null;
}

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  // --- Bot Protection (public routes only) ---
  const isAdminOrApi =
    pathname.startsWith("/admin") || pathname.startsWith("/api/");

  if (!isAdminOrApi) {
    const userAgent = req.headers.get("user-agent");
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { isBot, category } = detectBot(userAgent);

    // Block bad bots immediately
    if (isBot && category === "bad") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Rate limiting for suspicious traffic
    if (!userAgent || (isBot && category === "unknown")) {
      if (isRateLimited(ip, RATE_LIMITS.suspicious)) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } else if (!isBot) {
      // Normal visitors — standard rate limit
      if (isRateLimited(ip, RATE_LIMITS.normal)) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    }
    // Good bots pass through freely
  }

  // Skip redirect logic for admin routes, API routes, and static files
  const shouldCheckRedirects =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/favicon") &&
    !pathname.includes(".");

  // Check for redirects on public routes
  if (shouldCheckRedirects) {
    try {
      const redirect = await checkRedirect(pathname);
      if (redirect) {
        // Log hit asynchronously (don't wait)
        logRedirectHit(redirect.id).catch(() => {});

        const statusCode = redirect.type === "PERMANENT" ? 301 : 302;
        return NextResponse.redirect(
          new URL(redirect.destinationUrl, req.url),
          statusCode
        );
      }
    } catch (error) {
      // Log error but don't block the request
      console.error("Redirect check error:", error);
    }
  }

  // Admin authentication logic
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as AdminRole | undefined;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
  const isAdminApi = pathname.startsWith("/api/admin");

  // Allow login page without auth
  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/", req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdminRoute || isAdminApi) {
    // Check if logged in
    if (!isLoggedIn) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: "Unauthorized", message: "Authentication required" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/admin/login/", req.url));
    }

    // Check role permissions
    const requiredRole = getRequiredRole(pathname);
    if (requiredRole && userRole) {
      if (!hasMinRole(userRole, requiredRole)) {
        if (isAdminApi) {
          return NextResponse.json(
            {
              error: "Forbidden",
              message: `This action requires ${requiredRole} role or higher`,
            },
            { status: 403 }
          );
        }
        // Redirect to dashboard with error
        const url = new URL("/admin/", req.url);
        url.searchParams.set("error", "insufficient_permissions");
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    // Match public routes for redirect checking (exclude static files and API routes)
    "/((?!_next|api|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
