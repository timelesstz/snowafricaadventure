import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const LOGO_KEYS = ["site.logoUrl", "site.logoDarkUrl"] as const;

// Footer logos come from the Logo table. The footer is a client component fed
// by the theme provider, so they are resolved here rather than via <LogoStrip>.
async function getFooterLogos() {
  try {
    const logos = await prisma.logo.findMany({
      where: { isActive: true, placements: { has: "footer" } },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: { image: true, name: true },
    });
    return logos.map((l) => ({ url: l.image, alt: l.name }));
  } catch {
    return [];
  }
}

// GET - Fetch logo settings
export async function GET() {
  try {
    const [settings, certificationLogos] = await Promise.all([
      prisma.siteSetting.findMany({ where: { key: { in: [...LOGO_KEYS] } } }),
      getFooterLogos(),
    ]);

    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    return NextResponse.json({
      logoUrl: result["site.logoUrl"] || null,
      logoDarkUrl: result["site.logoDarkUrl"] || null,
      certificationLogos,
    });
  } catch (error) {
    console.error("Failed to fetch logo settings:", error);
    return NextResponse.json({
      logoUrl: null,
      logoDarkUrl: null,
      certificationLogos: [],
    });
  }
}

// PUT - Update logo settings (admin only)
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
