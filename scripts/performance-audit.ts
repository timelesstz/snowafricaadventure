#!/usr/bin/env npx tsx
/**
 * Performance Audit Script
 * Measures Core Web Vitals and performance metrics for key pages
 *
 * Usage: npx tsx scripts/performance-audit.ts [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

import "dotenv/config";

const BASE_URL = process.argv[2] || "http://localhost:3000";

// Pages to audit for performance
const PAGES_TO_AUDIT = [
  { path: "/", name: "Homepage" },
  { path: "/trekking/", name: "Trekking Index" },
  { path: "/tanzania-safaris/", name: "Safaris Index" },
  { path: "/tanzania-destinations/", name: "Destinations Index" },
  { path: "/blog/", name: "Blog Index" },
  { path: "/contact-us/", name: "Contact Page" },
  { path: "/search/", name: "Search Page" },
];

interface PerformanceMetrics {
  page: string;
  url: string;
  ttfb: number; // Time to First Byte
  documentSize: number;
  compressed: boolean;
  cacheControl: string | null;
  contentType: string | null;
  statusCode: number;
}

interface AuditResult {
  metrics: PerformanceMetrics;
  issues: string[];
  suggestions: string[];
}

async function auditPage(path: string, name: string): Promise<AuditResult> {
  const url = `${BASE_URL}${path}`;
  const startTime = Date.now();
  const issues: string[] = [];
  const suggestions: string[] = [];

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "Snow Africa Performance Audit/1.0",
      },
    });

    const ttfb = Date.now() - startTime;
    const body = await response.text();
    const documentSize = new TextEncoder().encode(body).length;

    const metrics: PerformanceMetrics = {
      page: name,
      url: path,
      ttfb,
      documentSize,
      compressed: response.headers.get("content-encoding") !== null,
      cacheControl: response.headers.get("cache-control"),
      contentType: response.headers.get("content-type"),
      statusCode: response.status,
    };

    // Analyze TTFB
    if (ttfb > 800) {
      issues.push(`High TTFB: ${ttfb}ms (should be < 800ms)`);
    } else if (ttfb > 500) {
      suggestions.push(`TTFB is ${ttfb}ms - consider server-side optimizations`);
    }

    // Analyze document size
    const sizeKB = documentSize / 1024;
    if (sizeKB > 200) {
      issues.push(`Large document: ${sizeKB.toFixed(1)}KB (should be < 200KB)`);
    } else if (sizeKB > 100) {
      suggestions.push(
        `Document is ${sizeKB.toFixed(1)}KB - consider reducing HTML size`
      );
    }

    // Check compression
    if (!metrics.compressed && documentSize > 1024) {
      issues.push("Response is not compressed - enable gzip/brotli");
    }

    // Check caching
    if (!metrics.cacheControl) {
      suggestions.push("No Cache-Control header - consider adding caching");
    } else if (!metrics.cacheControl.includes("max-age")) {
      suggestions.push("Cache-Control missing max-age directive");
    }

    // Check content type
    if (!metrics.contentType?.includes("text/html")) {
      issues.push(`Unexpected content type: ${metrics.contentType}`);
    }

    // Check status code
    if (metrics.statusCode !== 200) {
      issues.push(`Non-200 status code: ${metrics.statusCode}`);
    }

    // Check HTML content for common performance issues
    if (body.includes("data:image") && body.match(/data:image/g)!.length > 5) {
      suggestions.push("Multiple inline data URIs found - consider external images");
    }

    if (!body.includes('rel="preconnect"')) {
      suggestions.push("Consider adding preconnect hints for external domains");
    }

    if (!body.includes('fetchpriority="high"')) {
      suggestions.push("Consider using fetchpriority for LCP images");
    }

    return { metrics, issues, suggestions };
  } catch (error) {
    return {
      metrics: {
        page: name,
        url: path,
        ttfb: -1,
        documentSize: 0,
        compressed: false,
        cacheControl: null,
        contentType: null,
        statusCode: 0,
      },
      issues: [
        `Failed to fetch: ${error instanceof Error ? error.message : "Unknown error"}`,
      ],
      suggestions: [],
    };
  }
}

async function checkImageOptimization(): Promise<{
  issues: string[];
  suggestions: string[];
}> {
  const issues: string[] = [];
  const suggestions: string[] = [];

  try {
    // Check if Next.js image optimization is working
    const testImageUrl = `${BASE_URL}/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75`;
    const response = await fetch(testImageUrl);

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("webp") || contentType?.includes("avif")) {
        suggestions.push("Next.js image optimization is working correctly");
      }
    }
  } catch {
    suggestions.push("Could not verify image optimization");
  }

  return { issues, suggestions };
}

async function checkResourceHints(): Promise<{
  found: string[];
  missing: string[];
}> {
  const found: string[] = [];
  const missing: string[] = [];

  try {
    const response = await fetch(`${BASE_URL}/`);
    const html = await response.text();

    // Check for common resource hints
    const hints = [
      { pattern: 'rel="preconnect"', name: "Preconnect hints" },
      { pattern: 'rel="dns-prefetch"', name: "DNS prefetch hints" },
      { pattern: 'rel="preload"', name: "Preload directives" },
      { pattern: "loading=\"lazy\"", name: "Lazy loading" },
      { pattern: 'fetchpriority="high"', name: "Fetch priority" },
    ];

    for (const hint of hints) {
      if (html.includes(hint.pattern)) {
        found.push(hint.name);
      } else {
        missing.push(hint.name);
      }
    }
  } catch {
    missing.push("Could not check resource hints");
  }

  return { found, missing };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          Snow Africa - Performance Audit                      ║
╚══════════════════════════════════════════════════════════════╝

Base URL: ${BASE_URL}
`);

  // Audit each page
  console.log("📊 Page Performance Metrics\n");
  console.log("─".repeat(70));
  console.log(
    `${"Page".padEnd(20)} ${"TTFB".padEnd(10)} ${"Size".padEnd(12)} ${"Status".padEnd(10)} Issues`
  );
  console.log("─".repeat(70));

  const results: AuditResult[] = [];
  let totalIssues = 0;
  let totalSuggestions = 0;

  for (const page of PAGES_TO_AUDIT) {
    const result = await auditPage(page.path, page.name);
    results.push(result);
    totalIssues += result.issues.length;
    totalSuggestions += result.suggestions.length;

    const { metrics, issues } = result;
    const ttfbStr =
      metrics.ttfb >= 0 ? `${metrics.ttfb}ms` : "Error";
    const sizeStr =
      metrics.documentSize > 0
        ? `${(metrics.documentSize / 1024).toFixed(1)}KB`
        : "N/A";
    const statusStr =
      metrics.statusCode > 0 ? metrics.statusCode.toString() : "Error";
    const issueCount = issues.length > 0 ? `⚠️ ${issues.length}` : "✅";

    console.log(
      `${metrics.page.padEnd(20)} ${ttfbStr.padEnd(10)} ${sizeStr.padEnd(12)} ${statusStr.padEnd(10)} ${issueCount}`
    );
  }

  console.log("─".repeat(70));

  // Resource hints check
  console.log("\n🔗 Resource Hints Analysis\n");
  const { found, missing } = await checkResourceHints();

  if (found.length > 0) {
    console.log("  Found:");
    found.forEach((hint) => console.log(`    ✅ ${hint}`));
  }

  if (missing.length > 0) {
    console.log("  Missing (consider adding):");
    missing.forEach((hint) => console.log(`    ⚠️  ${hint}`));
  }

  // Image optimization check
  console.log("\n🖼️  Image Optimization\n");
  const imageCheck = await checkImageOptimization();
  imageCheck.suggestions.forEach((s) => console.log(`  ${s}`));

  // Detailed issues and suggestions
  if (totalIssues > 0 || totalSuggestions > 0) {
    console.log("\n📋 Detailed Findings\n");

    for (const result of results) {
      if (result.issues.length > 0 || result.suggestions.length > 0) {
        console.log(`  ${result.metrics.page} (${result.metrics.url})`);

        result.issues.forEach((issue) => console.log(`    ❌ ${issue}`));
        result.suggestions.forEach((suggestion) =>
          console.log(`    💡 ${suggestion}`)
        );
        console.log();
      }
    }
  }

  // Summary
  console.log(`
══════════════════════════════════════════════════════════════

📊 SUMMARY

  Pages Audited:    ${results.length}
  Issues Found:     ${totalIssues}
  Suggestions:      ${totalSuggestions}

  Performance Tips:
  • Keep TTFB under 800ms for good Core Web Vitals
  • Enable gzip/brotli compression for all text resources
  • Use Next.js Image component for automatic optimization
  • Add preconnect hints for external domains (fonts, CDN)
  • Implement lazy loading for below-the-fold images

══════════════════════════════════════════════════════════════
`);

  // Exit with error if critical issues
  if (totalIssues > 3) {
    process.exit(1);
  }
}

main().catch(console.error);
