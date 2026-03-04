import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Default theme values used when database is unavailable
const DEFAULT_THEME = {
  id: "default",
  name: "Modern Adventure",
  description: "Clean slate grays with warm amber accents",
  isActive: true,
  primaryColor: "#d97706",
  primaryDark: "#b45309",
  primaryLight: "#fef3c7",
  secondaryColor: "#059669",
  secondaryDark: "#047857",
  secondaryLight: "#d1fae5",
  accentColor: "#f59e0b",
  accentLight: "#fef3c7",
  backgroundColor: "#ffffff",
  foregroundColor: "#0f172a",
  surfaceColor: "#f8fafc",
  mutedColor: "#f1f5f9",
  borderColor: "#e2e8f0",
  textColor: "#1e293b",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  headingFont: "Outfit",
  bodyFont: "Sora",
  borderRadius: "0.75rem",
};

// GET - Fetch active theme settings
export async function GET() {
  try {
    let theme = await prisma.themeSetting.findFirst({
      where: { isActive: true },
    });

    // If no theme exists, create default one
    if (!theme) {
      theme = await prisma.themeSetting.create({
        data: {
          name: "Modern Adventure",
          description: "Clean slate grays with warm amber accents",
          isActive: true,
        },
      });
    }

    return NextResponse.json(theme);
  } catch (error) {
    console.error("Failed to fetch theme:", error);
    // Return default theme instead of 500 to prevent page render failures
    return NextResponse.json(DEFAULT_THEME);
  }
}

// PUT - Update theme settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Theme ID is required" },
        { status: 400 }
      );
    }

    const theme = await prisma.themeSetting.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(theme);
  } catch (error) {
    console.error("Failed to update theme:", error);
    return NextResponse.json(
      { error: "Failed to update theme settings" },
      { status: 500 }
    );
  }
}
