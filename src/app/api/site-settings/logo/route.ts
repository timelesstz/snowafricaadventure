import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const LOGO_KEYS = ["site.logoUrl", "site.logoDarkUrl"] as const;

const CERTIFICATION_ENTRIES = [
  { key: "about.commitment.logo1", alt: "TATO Licensed Operator" },
  { key: "about.commitment.logo2", alt: "KPAP Certified Partner" },
  { key: "about.commitment.logo3", alt: "IMEC International Mountain Explorers Connection" },
  { key: "about.commitment.logo4", alt: "Certification" },
  { key: "about.commitment.logo5", alt: "Certification" },
] as const;

// GET - Fetch logo settings
export async function GET() {
  try {
    const certKeys = CERTIFICATION_ENTRIES.map((c) => c.key);
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: [...LOGO_KEYS, ...certKeys] } },
    });

    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    const certificationLogos = CERTIFICATION_ENTRIES
      .filter((c) => result[c.key])
      .map((c) => ({ url: result[c.key], alt: c.alt }));

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
