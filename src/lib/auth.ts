import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";
import { AdminRole } from "@prisma/client";

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
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const isValid = await compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          return null;
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

  if (roleHierarchy[session.user.role] < roleHierarchy[minRole]) {
    throw new Error("Insufficient permissions");
  }

  return session;
}
