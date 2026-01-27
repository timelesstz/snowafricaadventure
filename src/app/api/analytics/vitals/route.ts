import { NextRequest, NextResponse } from "next/server";

interface WebVitalsPayload {
  name: "CLS" | "FID" | "LCP" | "TTFB" | "INP" | "FCP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType: string;
  url: string;
  userAgent: string;
  timestamp: number;
}

/**
 * POST /api/analytics/vitals
 * Receives Core Web Vitals data from the frontend
 *
 * In production, this would store metrics in:
 * - Database for long-term analysis
 * - External service (Google Analytics, Vercel Analytics, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const payload: WebVitalsPayload = await request.json();

    // Validate required fields
    const requiredFields = ["name", "value", "rating", "url", "timestamp"];
    for (const field of requiredFields) {
      if (!(field in payload)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate metric name
    const validMetrics = ["CLS", "FID", "LCP", "TTFB", "INP", "FCP"];
    if (!validMetrics.includes(payload.name)) {
      return NextResponse.json(
        { error: `Invalid metric name: ${payload.name}` },
        { status: 400 }
      );
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      const emoji =
        payload.rating === "good"
          ? "🟢"
          : payload.rating === "needs-improvement"
            ? "🟡"
            : "🔴";
      console.log(
        `${emoji} [Web Vitals] ${payload.name}: ${payload.value.toFixed(2)}ms (${payload.rating}) - ${payload.url}`
      );
    }

    // In production, store metrics
    // Example integrations:
    //
    // 1. Database storage:
    // await prisma.webVitals.create({
    //   data: {
    //     metric: payload.name,
    //     value: payload.value,
    //     rating: payload.rating,
    //     url: payload.url,
    //     userAgent: payload.userAgent,
    //   },
    // });
    //
    // 2. Forward to Google Analytics:
    // await fetch(`https://www.google-analytics.com/mp/collect?...`);
    //
    // 3. Forward to custom analytics service:
    // await fetch(process.env.ANALYTICS_ENDPOINT, { body: JSON.stringify(payload) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Web Vitals API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process vitals data" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics/vitals
 * Returns aggregated Web Vitals data (for admin dashboard)
 */
export async function GET() {
  // In a production app, this would query aggregated metrics
  // For now, return a placeholder response
  return NextResponse.json({
    message: "Web Vitals aggregation endpoint",
    metrics: {
      LCP: { good: 0, needsImprovement: 0, poor: 0, p75: null },
      FID: { good: 0, needsImprovement: 0, poor: 0, p75: null },
      CLS: { good: 0, needsImprovement: 0, poor: 0, p75: null },
      TTFB: { good: 0, needsImprovement: 0, poor: 0, p75: null },
      INP: { good: 0, needsImprovement: 0, poor: 0, p75: null },
      FCP: { good: 0, needsImprovement: 0, poor: 0, p75: null },
    },
    note: "Implement database storage to see aggregated metrics",
  });
}
