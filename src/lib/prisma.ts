import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Prisma 7: Use accelerateUrl for Prisma Postgres connections
  // The accelerate URL must start with prisma:// or prisma+postgres://
  const accelerateUrl = process.env.DATABASE_URL_ACCELERATE;

  if (!accelerateUrl) {
    throw new Error("DATABASE_URL_ACCELERATE environment variable is not set");
  }

  return new PrismaClient({
    accelerateUrl,
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
