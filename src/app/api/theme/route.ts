import { NextResponse } from "next/server";
import { z } from "zod";
import { AdminRole } from "@prisma/client";
import { requireRole } from "@/lib/auth";
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

// Allowed values for theme fields. These end up inside a <style> tag, so the
// patterns deliberately exclude < > { } ; and quotes.
const COLOR_RE = /^#[0-9a-fA-F]{3,8}$|^rgba?\([\d\s.,%]+\)$|^hsla?\([\d\s.,%deg]+\)$/;
const FONT_RE = /^[A-Za-z0-9 _-]{1,64}$/;
const RADIUS_RE = /^\d{1,4}(\.\d{1,3})?(px|rem|em|%)?$/;

const color = z.string().trim().regex(COLOR_RE, "Invalid color value");

const themeUpdateSchema = z
  .object({
    id: z.string().min(1).max(64),
    name: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().max(300).optional(),
    primaryColor: color.optional(),
    primaryDark: color.optional(),
    primaryLight: color.optional(),
    secondaryColor: color.optional(),
    secondaryDark: color.optional(),
    secondaryLight: color.optional(),
    accentColor: color.optional(),
    accentLight: color.optional(),
    backgroundColor: color.optional(),
    foregroundColor: color.optional(),
    surfaceColor: color.optional(),
    mutedColor: color.optional(),
    borderColor: color.optional(),
    textColor: color.optional(),
    textMuted: color.optional(),
    textLight: color.optional(),
    headingFont: z.string().trim().regex(FONT_RE, "Invalid font name").optional(),
    bodyFont: z.string().trim().regex(FONT_RE, "Invalid font name").optional(),
    borderRadius: z.string().trim().regex(RADIUS_RE, "Invalid radius").optional(),
  })
  // Unknown keys (isActive, createdAt, ...) are dropped by z.object's default strip mode
  ;

// PUT - Update theme settings (admin only)
export async function PUT(request: Request) {
  try {
    await requireRole(AdminRole.ADMIN);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json(
      { error: message === "Unauthorized" ? "Unauthorized" : "Forbidden" },
      { status: message === "Unauthorized" ? 401 : 403 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = themeUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid theme settings",
          details: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const { id, ...data } = parsed.data;

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
