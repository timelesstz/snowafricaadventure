import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FAVICON_KEYS = ["site.faviconUrl", "site.appleTouchIconUrl"] as const;

// GET - Fetch favicon settings
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: [...FAVICON_KEYS] } },
    });

    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    return NextResponse.json({
      faviconUrl: result["site.faviconUrl"] || null,
      appleTouchIconUrl: result["site.appleTouchIconUrl"] || null,
    });
  } catch (error) {
    console.error("Failed to fetch favicon settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch favicon settings" },
      { status: 500 }
    );
  }
}

// PUT - Update favicon settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { faviconUrl, appleTouchIconUrl } = body;

    const updates: { key: string; value: string }[] = [];
    if (faviconUrl !== undefined) updates.push({ key: "site.faviconUrl", value: faviconUrl || "" });
    if (appleTouchIconUrl !== undefined) updates.push({ key: "site.appleTouchIconUrl", value: appleTouchIconUrl || "" });

    for (const { key, value } of updates) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }

    return NextResponse.json({ success: true, faviconUrl, appleTouchIconUrl });
  } catch (error) {
    console.error("Failed to update favicon settings:", error);
    return NextResponse.json(
      { error: "Failed to update favicon settings" },
      { status: 500 }
    );
  }
}
