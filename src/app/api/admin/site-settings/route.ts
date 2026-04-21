import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, requireRole } from "@/lib/auth";
import { AdminRole } from "@prisma/client";
import { ZodError } from "zod";
import { adminSiteSettingsPostSchema } from "@/lib/schemas";

// GET - Fetch site settings by prefix
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix");

    const settings = await prisma.siteSetting.findMany({
      where: prefix
        ? {
            key: { startsWith: prefix },
          }
        : undefined,
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST - Save multiple site settings
export async function POST(request: NextRequest) {
  try {
    try {
      await requireRole(AdminRole.ADMIN);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unauthorized";
      const status = msg === "Insufficient permissions" ? 403 : 401;
      return NextResponse.json({ error: msg }, { status });
    }

    const body = await request.json();
    const { settings } = adminSiteSettingsPostSchema.parse(body);

    // Upsert each setting
    const updates = Object.entries(settings).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value: String(value) },
        update: { value: String(value) },
      })
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to save site settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
