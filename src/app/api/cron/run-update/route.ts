import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()).content as string;
  const slug = "kilimanjaro-group-climbs";

  const updated = await prisma.blogPost.update({
    where: { slug },
    data: { content },
  });

  return NextResponse.json({
    success: true,
    slug: updated.slug,
    contentLength: updated.content?.length,
  });
}
