import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const LOGO_KEYS = ["site.logoUrl", "site.logoDarkUrl"] as const;

// GET - Fetch logo settings
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: [...LOGO_KEYS] } },
    });

    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    return NextResponse.json({
      logoUrl: result["site.logoUrl"] || null,
      logoDarkUrl: result["site.logoDarkUrl"] || null,
    });
  } catch (error) {
    console.error("Failed to fetch logo settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch logo settings" },
      { status: 500 }
    );
  }
}

// PUT - Update logo settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { logoUrl, logoDarkUrl } = body;

    const updates: { key: string; value: string }[] = [];
    if (logoUrl !== undefined) updates.push({ key: "site.logoUrl", value: logoUrl || "" });
    if (logoDarkUrl !== undefined) updates.push({ key: "site.logoDarkUrl", value: logoDarkUrl || "" });

    for (const { key, value } of updates) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }

    return NextResponse.json({ success: true, logoUrl, logoDarkUrl });
  } catch (error) {
    console.error("Failed to update logo settings:", error);
    return NextResponse.json(
      { error: "Failed to update logo settings" },
      { status: 500 }
    );
  }
}
