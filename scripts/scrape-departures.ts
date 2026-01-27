/**
 * Scrape Group Departures from Snow Africa Adventure website
 *
 * This script fetches live departure data from the website and outputs JSON
 * that can be used to seed the database.
 *
 * Usage: npx tsx scripts/scrape-departures.ts
 */

import * as fs from "fs";
import * as path from "path";

interface ScrapedDeparture {
  route: string;
  arrivalDate: string;
  departureDate: string;
  price: number;
  maxParticipants: number;
  isFullMoon: boolean;
  spotsLeft?: number;
}

const DEPARTURES_URL = "https://snowafricaadventure.com/kilimanjaro-join-group-departures/";

async function scrapeDepartures(): Promise<ScrapedDeparture[]> {
  console.log("🔍 Fetching departures from:", DEPARTURES_URL);

  try {
    const response = await fetch(DEPARTURES_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SnowAfricaScraper/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`📄 Received ${html.length} bytes of HTML`);

    // Parse the HTML to extract departure data
    const departures = parseHtmlForDepartures(html);

    return departures;
  } catch (error) {
    console.error("❌ Failed to fetch departures:", error);
    throw error;
  }
}

function parseHtmlForDepartures(html: string): ScrapedDeparture[] {
  const departures: ScrapedDeparture[] = [];

  // Look for departure cards/blocks in the HTML
  // This is a simplified parser - adjust based on actual HTML structure

  // Pattern 1: Look for date patterns like "Jan 2, 2026" or "2026-01-02"
  const datePatterns = [
    // ISO format
    /(\d{4}-\d{2}-\d{2})/g,
    // Month Day, Year format
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s*(\d{4})/gi,
  ];

  // Pattern 2: Look for price patterns like "$2,680" or "USD 2680"
  const pricePattern = /\$?\s*([\d,]+)\s*(?:USD|per person)?/gi;

  // Pattern 3: Look for route names
  const routePatterns = [
    /8[-\s]?day\s+lemosho/gi,
    /7[-\s]?day\s+machame/gi,
    /6[-\s]?day\s+rongai/gi,
    /lemosho\s+route/gi,
    /machame\s+route/gi,
    /rongai\s+route/gi,
  ];

  // Pattern 4: Look for full moon indicators
  const fullMoonPattern = /full\s*moon/gi;

  // Pattern 5: Look for spots/capacity
  const spotsPattern = /(\d+)\s*(?:spots?|spaces?|available|left)/gi;

  // Try to extract structured data from common HTML patterns
  // Look for table rows, cards, or list items

  // Pattern for div/section blocks that might contain departure info
  const blockPattern = /<(?:div|section|article|tr)[^>]*class="[^"]*(?:departure|trip|climb|group)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|section|article|tr)>/gi;

  let match;
  while ((match = blockPattern.exec(html)) !== null) {
    const block = match[1];

    // Extract route from block
    let route = "";
    for (const pattern of routePatterns) {
      const routeMatch = block.match(pattern);
      if (routeMatch) {
        route = normalizeRouteName(routeMatch[0]);
        break;
      }
    }

    if (!route) continue;

    // Extract dates
    const dates: string[] = [];
    for (const pattern of datePatterns) {
      let dateMatch;
      while ((dateMatch = pattern.exec(block)) !== null) {
        dates.push(dateMatch[0]);
      }
    }

    // Extract price
    const priceMatch = block.match(pricePattern);
    const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, "")) : 0;

    // Check for full moon
    const isFullMoon = fullMoonPattern.test(block);

    // Extract spots
    const spotsMatch = block.match(spotsPattern);
    const spotsLeft = spotsMatch ? parseInt(spotsMatch[1]) : undefined;

    if (dates.length >= 2 && price > 0) {
      departures.push({
        route,
        arrivalDate: normalizeDate(dates[0]),
        departureDate: normalizeDate(dates[1]),
        price,
        maxParticipants: spotsLeft || 10,
        isFullMoon,
        spotsLeft,
      });
    }
  }

  // If no structured data found, fall back to pattern matching across entire HTML
  if (departures.length === 0) {
    console.log("⚠️ No structured departure blocks found, attempting pattern extraction...");

    // This is a fallback - the actual parsing would need to be customized
    // based on the real HTML structure of the page
  }

  return departures;
}

function normalizeRouteName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("lemosho")) return "8-day Lemosho";
  if (lower.includes("machame")) return "7-day Machame";
  if (lower.includes("rongai")) return "6-day Rongai";
  return name;
}

function normalizeDate(dateStr: string): string {
  // If already in ISO format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // Parse "Jan 2, 2026" format
  const months: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04",
    may: "05", jun: "06", jul: "07", aug: "08",
    sep: "09", oct: "10", nov: "11", dec: "12",
  };

  const match = dateStr.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2}),?\s*(\d{4})/i);
  if (match) {
    const month = months[match[1].toLowerCase()];
    const day = match[2].padStart(2, "0");
    const year = match[3];
    return `${year}-${month}-${day}`;
  }

  return dateStr;
}

async function main() {
  console.log("🏔️ Snow Africa Departure Scraper\n");

  try {
    const departures = await scrapeDepartures();

    if (departures.length === 0) {
      console.log("\n⚠️ No departures found. The HTML structure may have changed.");
      console.log("Please check the website manually and update the parsing logic.");

      // Output sample data structure for reference
      console.log("\n📋 Expected data structure:");
      console.log(JSON.stringify([{
        route: "8-day Lemosho",
        arrivalDate: "2026-01-02",
        departureDate: "2026-01-11",
        price: 2680,
        maxParticipants: 10,
        isFullMoon: false,
      }], null, 2));
    } else {
      console.log(`\n✅ Found ${departures.length} departures\n`);

      // Group by route for summary
      const byRoute = departures.reduce((acc, dep) => {
        acc[dep.route] = (acc[dep.route] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log("📊 Summary by route:");
      Object.entries(byRoute).forEach(([route, count]) => {
        console.log(`   ${route}: ${count} departures`);
      });

      // Save to JSON file
      const outputPath = path.join(__dirname, "scraped-departures.json");
      fs.writeFileSync(outputPath, JSON.stringify(departures, null, 2));
      console.log(`\n💾 Saved to: ${outputPath}`);

      // Output TypeScript array format for direct use in seed script
      console.log("\n📝 TypeScript array format:\n");
      console.log("const departures: DepartureData[] = [");
      departures.forEach((dep) => {
        const fullMoon = dep.isFullMoon ? ", isFullMoon: true" : "";
        console.log(`  { route: "${dep.route}", arrivalDate: "${dep.arrivalDate}", departureDate: "${dep.departureDate}", price: ${dep.price}, maxParticipants: ${dep.maxParticipants}${fullMoon} },`);
      });
      console.log("];");
    }
  } catch (error) {
    console.error("\n❌ Scraping failed:", error);
    process.exit(1);
  }
}

main();
