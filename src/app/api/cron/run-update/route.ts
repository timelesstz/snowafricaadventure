import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === "fetch") {
      const post = await prisma.blogPost.findUnique({
        where: { slug: "kilimanjaro-group-climbs" },
        select: { id: true, title: true, metaTitle: true, content: true },
      });
      return NextResponse.json({ post: post ? { id: post.id, title: post.title, metaTitle: post.metaTitle, contentLength: post.content?.length } : null });
    }

    if (action === "update") {
      const { slug, data } = body;
      const updated = await prisma.blogPost.update({
        where: { slug },
        data,
      });
      return NextResponse.json({ success: true, slug: updated.slug });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[RunUpdate] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
