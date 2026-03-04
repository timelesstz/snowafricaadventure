import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fetchOrganicTraffic } from "@/lib/seo-dashboard/ga4-client";
import { isGoogleConfigured } from "@/lib/seo-dashboard/google-auth";

export async function POST(request: NextRequest) {
  try {
    await requireRole("ADMIN");

    if (!isGoogleConfigured()) {
      return NextResponse.json(
        { error: "Google service account not configured" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const days = body.days || 1;

    const propertyId =
      (
        await prisma.siteSetting.findUnique({
          where: { key: "ga4_property_id" },
        })
      )?.value || process.env.GA4_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: "GA4 property ID not configured" },
        { status: 400 }
      );
    }

    const syncLog = await prisma.seoSyncLog.create({
      data: { source: "GA4" },
    });

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
    const dateRange = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };

    let recordCount = 0;

    try {
      const rows = await fetchOrganicTraffic(propertyId, dateRange);

      for (const row of rows) {
        // GA4 dates come as YYYYMMDD format
        const dateStr = row.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

        await prisma.gaOrganicMetric.upsert({
          where: {
            date_landingPage: {
              date: new Date(dateStr),
              landingPage: row.landingPage || "",
            },
          },
          update: {
            sessions: row.sessions,
            users: row.users,
            newUsers: row.newUsers,
            bounceRate: row.bounceRate,
            avgSessionDuration: row.avgSessionDuration,
            conversions: row.conversions,
          },
          create: {
            date: new Date(dateStr),
            landingPage: row.landingPage,
            sessions: row.sessions,
            users: row.users,
            newUsers: row.newUsers,
            bounceRate: row.bounceRate,
            avgSessionDuration: row.avgSessionDuration,
            conversions: row.conversions,
          },
        });
        recordCount++;
      }

      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "COMPLETED",
          recordCount,
          completedAt: new Date(),
          metadata: dateRange,
        },
      });

      return NextResponse.json({ success: true, recordCount, dateRange });
    } catch (error) {
      await prisma.seoSyncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
          completedAt: new Date(),
        },
      });
      throw error;
    }
  } catch (error) {
    console.error("GA4 sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
