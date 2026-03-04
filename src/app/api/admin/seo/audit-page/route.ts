import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auditPage } from "@/lib/seo-dashboard/page-auditor";

export async function POST(request: NextRequest) {
  try {
    await requireRole("EDITOR");

    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const result = await auditPage(url);

    // Store audit result
    await prisma.seoPageAudit.create({
      data: {
        url: result.url,
        title: result.title,
        titleLength: result.titleLength,
        metaDescription: result.metaDescription,
        metaDescLength: result.metaDescLength,
        h1Count: result.h1Count,
        h1Text: result.h1Text,
        h2Count: result.h2Count,
        h3Count: result.h3Count,
        wordCount: result.wordCount,
        hasCanonical: result.hasCanonical,
        canonicalUrl: result.canonicalUrl,
        hasSchema: result.hasSchema,
        schemaTypes: result.schemaTypes,
        internalLinks: result.internalLinks,
        externalLinks: result.externalLinks,
        imagesTotal: result.imagesTotal,
        imagesMissingAlt: result.imagesMissingAlt,
        score: result.score,
        issues: result.issues as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Page audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}
