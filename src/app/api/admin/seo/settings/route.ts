import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  isGoogleConfigured,
  getServiceAccountEmail,
} from "@/lib/seo-dashboard/google-auth";
import { listSites } from "@/lib/seo-dashboard/gsc-client";

export async function GET() {
  try {
    await requireRole("ADMIN");

    const gscSiteUrl = await prisma.siteSetting.findUnique({
      where: { key: "gsc_site_url" },
    });
    const ga4PropertyId = await prisma.siteSetting.findUnique({
      where: { key: "ga4_property_id" },
    });

    const configured = isGoogleConfigured();
    let availableSites: string[] = [];

    if (configured) {
      try {
        availableSites = await listSites();
      } catch {
        // Service account might not have access yet
      }
    }

    const lastGscSync = await prisma.seoSyncLog.findFirst({
      where: { source: "GSC" },
      orderBy: { startedAt: "desc" },
    });

    const lastGaSync = await prisma.seoSyncLog.findFirst({
      where: { source: "GA4" },
      orderBy: { startedAt: "desc" },
    });

    return NextResponse.json({
      gscSiteUrl: gscSiteUrl?.value || null,
      ga4PropertyId: ga4PropertyId?.value || null,
      isGoogleConfigured: configured,
      serviceAccountEmail: getServiceAccountEmail(),
      availableSites,
      lastGscSync: lastGscSync
        ? {
            status: lastGscSync.status,
            startedAt: lastGscSync.startedAt,
            completedAt: lastGscSync.completedAt,
            recordCount: lastGscSync.recordCount,
            error: lastGscSync.error,
          }
        : null,
      lastGaSync: lastGaSync
        ? {
            status: lastGaSync.status,
            startedAt: lastGaSync.startedAt,
            completedAt: lastGaSync.completedAt,
            recordCount: lastGaSync.recordCount,
            error: lastGaSync.error,
          }
        : null,
    });
  } catch (error) {
    console.error("SEO settings error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole("SUPER_ADMIN");

    const { gscSiteUrl, ga4PropertyId } = await request.json();

    if (gscSiteUrl !== undefined) {
      await prisma.siteSetting.upsert({
        where: { key: "gsc_site_url" },
        update: { value: gscSiteUrl },
        create: { key: "gsc_site_url", value: gscSiteUrl },
      });
    }

    if (ga4PropertyId !== undefined) {
      await prisma.siteSetting.upsert({
        where: { key: "ga4_property_id" },
        update: { value: ga4PropertyId },
        create: { key: "ga4_property_id", value: ga4PropertyId },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SEO settings update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings" },
      { status: 500 }
    );
  }
}
