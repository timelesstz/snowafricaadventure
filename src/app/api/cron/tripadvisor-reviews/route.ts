import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  isTripAdvisorConfigured,
  fetchLocationDetails,
  fetchLocationReviews,
} from "@/lib/tripadvisor";

// Allow time for the two external API calls plus DB writes.
export const maxDuration = 60;

function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  return authHeader.replace("Bearer ", "") === process.env.CRON_SECRET;
}

// Authorized when called by Vercel Cron (secret) OR a signed-in admin, so the
// sync can be triggered on demand from the admin after adding the API key.
async function isAuthorized(request: NextRequest): Promise<boolean> {
  if (verifyCronSecret(request)) return true;
  const session = await auth();
  return Boolean(session);
}

async function setSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isTripAdvisorConfigured()) {
    // No key yet — succeed quietly so the scheduled cron isn't a red error.
    return NextResponse.json({
      success: true,
      skipped: true,
      message:
        "TRIPADVISOR_API_KEY not set — add it (and register the key for your domain) to enable review sync.",
    });
  }

  try {
    const [details, reviews] = await Promise.all([
      fetchLocationDetails(),
      fetchLocationReviews(),
    ]);

    // 1) Store the aggregate where the homepage already reads it.
    if (details.ratingDecimal > 0) {
      await setSetting(
        "homepage.tripadvisor.rating",
        String(Math.round(details.ratingDecimal))
      );
      await setSetting("homepage.stats.rating", details.ratingDecimal.toFixed(1));
      await setSetting(
        "tripadvisor.ratingDecimal",
        details.ratingDecimal.toFixed(1)
      );
    }
    if (details.reviewCount > 0) {
      await setSetting(
        "homepage.tripadvisor.reviews",
        String(details.reviewCount)
      );
    }
    if (details.webUrl) {
      await setSetting("homepage.tripadvisor.url", details.webUrl);
    }

    // 2) Upsert review snippets into the Review model (no external-id column,
    //    so dedup on source + author + published date).
    let created = 0;
    let updated = 0;
    const syncedIds: string[] = [];

    for (const r of reviews) {
      const existing = await prisma.review.findFirst({
        where: {
          source: "TripAdvisor",
          authorName: r.authorName,
          publishedAt: r.publishedAt,
        },
        select: { id: true },
      });

      if (existing) {
        await prisma.review.update({
          where: { id: existing.id },
          data: {
            authorImage: r.authorImage,
            rating: r.rating,
            title: r.title,
            content: r.text,
            tripType: r.tripType,
            verified: true,
          },
        });
        syncedIds.push(existing.id);
        updated++;
      } else {
        const row = await prisma.review.create({
          data: {
            source: "TripAdvisor",
            authorName: r.authorName,
            authorImage: r.authorImage,
            rating: r.rating,
            title: r.title,
            content: r.text,
            tripType: r.tripType,
            verified: true,
            isFeatured: false,
            publishedAt: r.publishedAt,
          },
          select: { id: true },
        });
        syncedIds.push(row.id);
        created++;
      }
    }

    // 3) Feature the 3 strongest 5-star TripAdvisor reviews for the homepage,
    //    without disturbing any non-TripAdvisor reviews an admin featured.
    const featurable = reviews
      .map((r, i) => ({ r, id: syncedIds[i] }))
      .filter((x) => x.id && x.r.rating >= 5 && x.r.text.length >= 80)
      .sort((a, b) => b.r.text.length - a.r.text.length)
      .slice(0, 3)
      .map((x) => x.id);

    await prisma.review.updateMany({
      where: { source: "TripAdvisor" },
      data: { isFeatured: false },
    });
    if (featurable.length > 0) {
      await prisma.review.updateMany({
        where: { id: { in: featurable } },
        data: { isFeatured: true },
      });
    }

    await setSetting("tripadvisor.lastSync", new Date().toISOString());

    return NextResponse.json({
      success: true,
      rating: details.ratingDecimal,
      totalReviews: details.reviewCount,
      reviewsFetched: reviews.length,
      created,
      updated,
      featured: featurable.length,
    });
  } catch (error) {
    console.error("TripAdvisor review sync failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
