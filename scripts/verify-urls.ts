#!/usr/bin/env npx tsx
/**
 * URL Verification Script
 * Verifies all critical URLs return 200 status codes
 *
 * Usage: npx tsx scripts/verify-urls.ts [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

import "dotenv/config";

const BASE_URL = process.argv[2] || "http://localhost:3000";

// Critical URLs that must work
const CRITICAL_URLS = [
  // Homepage
  "/",

  // Main sections
  "/trekking/",
  "/tanzania-safaris/",
  "/tanzania-destinations/",
  "/tanzania-day-tours/",
  "/zanzibar/",
  "/blog/",

  // Key pages
  "/about-us/",
  "/contact-us/",
  "/kilimanjaro-join-group-departures/",
  "/tailor-made-safari/",
  "/terms-and-conditions/",
  "/privacy-policy/",
  "/search/",

  // SEO files
  "/sitemap.xml",
  "/robots.txt",

  // API health
  "/api/health",
];

// URLs that should return dynamic content
const DYNAMIC_URLS = [
  "/api/search?q=safari",
];

interface UrlResult {
  url: string;
  status: number;
  ok: boolean;
  error?: string;
  responseTime: number;
}

async function checkUrl(path: string): Promise<UrlResult> {
  const url = `${BASE_URL}${path}`;
  const startTime = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    const responseTime = Date.now() - startTime;

    return {
      url: path,
      status: response.status,
      ok: response.ok,
      responseTime,
    };
  } catch (error) {
    return {
      url: path,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
      responseTime: Date.now() - startTime,
    };
  }
}

async function verifySitemap(): Promise<string[]> {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;

  try {
    const response = await fetch(sitemapUrl);
    const xml = await response.text();

    // Extract URLs from sitemap
    const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const urls = urlMatches.map(match => {
      const url = match.replace(/<\/?loc>/g, "");
      return url.replace(/https?:\/\/[^/]+/, ""); // Convert to relative path
    });

    return urls;
  } catch (error) {
    console.error("Failed to fetch sitemap:", error);
    return [];
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          Snow Africa - URL Verification Script                ║
╚══════════════════════════════════════════════════════════════╝

Base URL: ${BASE_URL}
`);

  // Check critical URLs
  console.log("📋 Checking Critical URLs...\n");

  const results: UrlResult[] = [];
  let passed = 0;
  let failed = 0;

  for (const url of CRITICAL_URLS) {
    const result = await checkUrl(url);
    results.push(result);

    const status = result.ok ? "✅" : "❌";
    const time = `${result.responseTime}ms`;

    if (result.ok) {
      passed++;
      console.log(`  ${status} ${result.url} (${result.status}) - ${time}`);
    } else {
      failed++;
      console.log(`  ${status} ${result.url} (${result.status}) - ${result.error || "Failed"}`);
    }
  }

  // Check dynamic URLs
  console.log("\n📡 Checking API Endpoints...\n");

  for (const url of DYNAMIC_URLS) {
    const result = await checkUrl(url);
    results.push(result);

    const status = result.ok ? "✅" : "❌";
    const time = `${result.responseTime}ms`;

    if (result.ok) {
      passed++;
      console.log(`  ${status} ${result.url} (${result.status}) - ${time}`);
    } else {
      failed++;
      console.log(`  ${status} ${result.url} (${result.status}) - ${result.error || "Failed"}`);
    }
  }

  // Verify sitemap URLs
  console.log("\n🗺️  Verifying Sitemap URLs...\n");

  const sitemapUrls = await verifySitemap();
  console.log(`  Found ${sitemapUrls.length} URLs in sitemap`);

  // Sample check some sitemap URLs (first 10)
  const sampleUrls = sitemapUrls.slice(0, 10);
  let sitemapPassed = 0;
  let sitemapFailed = 0;

  for (const url of sampleUrls) {
    const result = await checkUrl(url);

    if (result.ok) {
      sitemapPassed++;
    } else {
      sitemapFailed++;
      console.log(`  ❌ ${url} (${result.status})`);
    }
  }

  if (sitemapFailed === 0 && sampleUrls.length > 0) {
    console.log(`  ✅ All ${sampleUrls.length} sampled URLs responding correctly`);
  }

  // Summary
  console.log(`
══════════════════════════════════════════════════════════════

📊 SUMMARY

  Critical URLs:  ${passed}/${CRITICAL_URLS.length + DYNAMIC_URLS.length} passed
  Sitemap URLs:   ${sitemapPassed}/${sampleUrls.length} sampled passed

  Total Checked:  ${results.length + sampleUrls.length}
  Passed:         ${passed + sitemapPassed}
  Failed:         ${failed + sitemapFailed}

══════════════════════════════════════════════════════════════
`);

  // Check for trailing slashes
  console.log("🔗 Trailing Slash Check...\n");

  const trailingSlashUrls = ["/trekking", "/tanzania-safaris", "/about-us"];
  let redirectsCorrectly = true;

  for (const url of trailingSlashUrls) {
    try {
      const response = await fetch(`${BASE_URL}${url}`, { redirect: "manual" });
      const location = response.headers.get("location");

      if (response.status === 308 || response.status === 307 || response.status === 301) {
        if (location?.endsWith("/")) {
          console.log(`  ✅ ${url} → ${location} (redirects correctly)`);
        } else {
          console.log(`  ⚠️  ${url} → ${location} (unexpected redirect)`);
          redirectsCorrectly = false;
        }
      } else if (response.status === 200) {
        console.log(`  ⚠️  ${url} returns 200 (should redirect to ${url}/)`);
        redirectsCorrectly = false;
      }
    } catch (error) {
      console.log(`  ❌ ${url} - Error checking redirect`);
      redirectsCorrectly = false;
    }
  }

  if (redirectsCorrectly) {
    console.log("\n  ✅ Trailing slash redirects configured correctly");
  }

  // Exit with error code if any failures
  if (failed + sitemapFailed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
