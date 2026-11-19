import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import { AdminRole } from "@prisma/client";
import {
  clearAuthFailures,
  getClientIp,
  isAuthThrottled,
  recordAuthFailure,
} from "./auth-rate-limit";

const LOGIN_SCOPE = "login";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: AdminRole;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: AdminRole;
    };
  }
}

// JWT token will include id and role through callbacks

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Password login provider
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email);
        const ip = getClientIp(request?.headers);
        if (isAuthThrottled(LOGIN_SCOPE, email, ip)) {
          console.warn(`[auth] login throttled for ${email} from ${ip}`);
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email },
        });

        if (!user || !user.isActive) {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        const isValid = await compare(
          String(credentials.password),
          user.passwordHash
        );

        if (!isValid) {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        clearAuthFailures(LOGIN_SCOPE, email);

        // Update last login time
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    // PIN login provider (admin only)
    Credentials({
      id: "pin",
      name: "pin",
      credentials: {
        email: { label: "Email", type: "email" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.pin) {
          return null;
        }

        const email = String(credentials.email);
        const pin = String(credentials.pin);
        const ip = getClientIp(request?.headers);
        if (isAuthThrottled(LOGIN_SCOPE, email, ip)) {
          console.warn(`[auth] PIN login throttled for ${email} from ${ip}`);
          return null;
        }

        // Existing 4-5 digit PINs still log in; new PINs must be 6 digits.
        if (!/^\d{4,6}$/.test(pin)) {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email },
        });

        if (!user || !user.isActive || !user.pin) {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        // Only allow PIN login for ADMIN and SUPER_ADMIN
        if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        const isValid = await compare(pin, user.pin);

        if (!isValid) {
          recordAuthFailure(LOGIN_SCOPE, email, ip);
          return null;
        }

        clearAuthFailures(LOGIN_SCOPE, email);
        if (pin.length < 6) {
          console.warn(
            `[auth] ${user.email} logged in with a legacy ${pin.length}-digit PIN; ask them to set a 6-digit PIN`
          );
        }

        // Update last login time
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as AdminRole;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});

/**
 * Get the current session with typed user
 */
export async function getSession() {
  return auth();
}

/**
 * Check if the current user has a specific role or higher
 */
export async function requireRole(minRole: AdminRole) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const roleHierarchy: Record<AdminRole, number> = {
    [AdminRole.SUPER_ADMIN]: 4,
    [AdminRole.ADMIN]: 3,
    [AdminRole.EDITOR]: 2,
    [AdminRole.VIEWER]: 1,
  };

  // Unknown or missing roles are denied (undefined < n is false, so check explicitly)
  const userLevel = roleHierarchy[session.user.role as AdminRole];
  if (typeof userLevel !== "number" || userLevel < roleHierarchy[minRole]) {
    throw new Error("Insufficient permissions");
  }

  return session;
}

/**
 * Non-throwing role check for server actions that report errors as form state.
 * Returns a user-facing error message when the user is signed out or lacks the role.
 */
export async function checkRole(
  minRole: AdminRole
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireRole(minRole);
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return { ok: false, error: "You are not signed in. Please log in and try again." };
    }
    return {
      ok: false,
      error: `You do not have permission to do this. It requires the ${minRole} role or higher.`,
    };
  }
}
