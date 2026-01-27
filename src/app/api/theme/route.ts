import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    return NextResponse.json(
      { error: "Failed to fetch theme settings" },
      { status: 500 }
    );
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
