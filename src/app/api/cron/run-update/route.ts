import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const SLUG = "walking-safari-trekking-on-ngorongoro";

  try {
    const result = await prisma.safariPackage.update({
      where: { slug: SLUG },
      data: {
        title: "Walking Safari on Ngorongoro Highlands & Serengeti",
        metaTitle: "Walking Safari on Ngorongoro Highlands",
        metaDescription:
          "11-day walking safari on Ngorongoro Highlands with Serengeti game drives. Trek Olmoti & Empakaai Craters, visit Lake Natron, and spot the Big Five. From $950.",
      },
      select: { id: true, title: true, metaTitle: true, metaDescription: true },
    });

    return NextResponse.json({ success: true, updated: result });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
