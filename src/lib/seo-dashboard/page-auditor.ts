import * as cheerio from "cheerio";
import type { AuditResult, AuditIssue } from "./types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.snowafricaadventure.com";

/**
 * Audit a page's SEO by fetching its HTML and analyzing on-page factors.
 * Returns a score (0-100) and a list of issues.
 */
export async function auditPage(url: string): Promise<AuditResult> {
  // Normalize URL
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  const response = await fetch(fullUrl, {
    headers: {
      "User-Agent": "SnowAfricaSEOAuditor/1.0",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fullUrl}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const issues: AuditIssue[] = [];
  let score = 0;

  // --- Title ---
  const title = $("title").text().trim() || null;
  const titleLength = title?.length || 0;

  if (!title) {
    issues.push({ severity: "critical", field: "title", message: "Missing title tag" });
  } else if (titleLength < 30) {
    issues.push({ severity: "warning", field: "title", message: `Title too short (${titleLength} chars, aim for 30-60)`, value: titleLength });
    score += 5;
  } else if (titleLength > 60) {
    issues.push({ severity: "warning", field: "title", message: `Title too long (${titleLength} chars, aim for 30-60)`, value: titleLength });
    score += 5;
  } else {
    issues.push({ severity: "pass", field: "title", message: `Title length is good (${titleLength} chars)` });
    score += 10;
  }

  // --- Meta Description ---
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;
  const metaDescLength = metaDescription?.length || 0;

  if (!metaDescription) {
    issues.push({ severity: "critical", field: "metaDescription", message: "Missing meta description" });
  } else if (metaDescLength < 120) {
    issues.push({ severity: "warning", field: "metaDescription", message: `Meta description too short (${metaDescLength} chars, aim for 120-160)`, value: metaDescLength });
    score += 5;
  } else if (metaDescLength > 160) {
    issues.push({ severity: "warning", field: "metaDescription", message: `Meta description too long (${metaDescLength} chars, aim for 120-160)`, value: metaDescLength });
    score += 5;
  } else {
    issues.push({ severity: "pass", field: "metaDescription", message: `Meta description length is good (${metaDescLength} chars)` });
    score += 10;
  }

  // --- H1 ---
  const h1Elements = $("h1");
  const h1Count = h1Elements.length;
  const h1Text = h1Elements.first().text().trim() || null;

  if (h1Count === 0) {
    issues.push({ severity: "critical", field: "h1", message: "Missing H1 tag" });
  } else if (h1Count > 1) {
    issues.push({ severity: "warning", field: "h1", message: `Multiple H1 tags found (${h1Count})`, value: h1Count });
    score += 5;
  } else {
    issues.push({ severity: "pass", field: "h1", message: "Single H1 tag present" });
    score += 10;
  }

  // --- H2 Structure ---
  const h2Count = $("h2").length;
  if (h2Count < 2) {
    issues.push({ severity: "warning", field: "h2", message: `Only ${h2Count} H2 tags (aim for 2+)`, value: h2Count });
    score += h2Count > 0 ? 3 : 0;
  } else {
    issues.push({ severity: "pass", field: "h2", message: `Good heading structure (${h2Count} H2 tags)` });
    score += 5;
  }

  const h3Count = $("h3").length;

  // --- Word Count ---
  // Remove scripts, styles, nav, footer for content word count
  const contentClone = $.root().clone();
  contentClone.find("script, style, nav, footer, header, aside").remove();
  const bodyText = contentClone.find("body").text() || contentClone.text();
  const wordCount = bodyText.split(/\s+/).filter((w) => w.length > 0).length;

  if (wordCount < 300) {
    issues.push({ severity: "warning", field: "wordCount", message: `Thin content (${wordCount} words, aim for 300+)`, value: wordCount });
    score += Math.floor((wordCount / 300) * 10);
  } else {
    issues.push({ severity: "pass", field: "wordCount", message: `Good content length (${wordCount} words)` });
    score += 10;
  }

  // --- Schema Markup ---
  const jsonLdScripts = $('script[type="application/ld+json"]');
  const schemaTypes: string[] = [];
  jsonLdScripts.each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      if (data["@type"]) {
        schemaTypes.push(
          Array.isArray(data["@type"]) ? data["@type"].join(", ") : data["@type"]
        );
      }
    } catch {
      // ignore parse errors
    }
  });

  // Check microdata too
  $("[itemtype]").each((_, el) => {
    const type = $(el).attr("itemtype") || "";
    const typeName = type.split("/").pop();
    if (typeName && !schemaTypes.includes(typeName)) {
      schemaTypes.push(typeName);
    }
  });

  const hasSchema = schemaTypes.length > 0;
  if (!hasSchema) {
    issues.push({ severity: "warning", field: "schema", message: "No structured data (JSON-LD or microdata) found" });
  } else {
    issues.push({ severity: "pass", field: "schema", message: `Schema markup found: ${schemaTypes.join(", ")}` });
    score += 10;
  }

  // --- Canonical ---
  const canonical = $('link[rel="canonical"]').attr("href") || null;
  const hasCanonical = !!canonical;
  if (!hasCanonical) {
    issues.push({ severity: "warning", field: "canonical", message: "Missing canonical tag" });
  } else {
    issues.push({ severity: "pass", field: "canonical", message: "Canonical tag present" });
    score += 5;
  }

  // --- Internal & External Links ---
  let internalLinks = 0;
  let externalLinks = 0;
  const siteHost = new URL(SITE_URL).hostname;

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.startsWith("/") || href.startsWith("#")) {
      internalLinks++;
    } else {
      try {
        const linkHost = new URL(href).hostname;
        if (linkHost === siteHost || linkHost.endsWith(`.${siteHost}`)) {
          internalLinks++;
        } else {
          externalLinks++;
        }
      } catch {
        // relative or malformed link
        internalLinks++;
      }
    }
  });

  if (internalLinks < 3) {
    issues.push({ severity: "warning", field: "internalLinks", message: `Only ${internalLinks} internal links (aim for 3+)`, value: internalLinks });
    score += Math.min(internalLinks * 3, 10);
  } else {
    issues.push({ severity: "pass", field: "internalLinks", message: `Good internal linking (${internalLinks} links)` });
    score += 10;
  }

  if (externalLinks === 0) {
    issues.push({ severity: "info", field: "externalLinks", message: "No external links found" });
  } else {
    issues.push({ severity: "pass", field: "externalLinks", message: `${externalLinks} external links found` });
    score += 5;
  }

  // --- Images ---
  const images = $("img");
  const imagesTotal = images.length;
  let imagesMissingAlt = 0;
  images.each((_, el) => {
    const alt = $(el).attr("alt");
    if (!alt || alt.trim().length === 0) {
      imagesMissingAlt++;
    }
  });

  if (imagesTotal === 0) {
    issues.push({ severity: "info", field: "images", message: "No images found on page" });
    score += 10; // no images to have missing alt for
  } else if (imagesMissingAlt > 0) {
    issues.push({ severity: "warning", field: "images", message: `${imagesMissingAlt} of ${imagesTotal} images missing alt text`, value: imagesMissingAlt });
    score += Math.floor(((imagesTotal - imagesMissingAlt) / imagesTotal) * 10);
  } else {
    issues.push({ severity: "pass", field: "images", message: `All ${imagesTotal} images have alt text` });
    score += 10;
  }

  // --- Open Graph ---
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDesc = $('meta[property="og:description"]').attr("content");
  if (!ogTitle || !ogDesc) {
    issues.push({ severity: "info", field: "openGraph", message: "Missing Open Graph tags (og:title or og:description)" });
  } else {
    issues.push({ severity: "pass", field: "openGraph", message: "Open Graph tags present" });
    score += 5;
  }

  // --- HTTPS ---
  if (fullUrl.startsWith("https://")) {
    issues.push({ severity: "pass", field: "https", message: "Page uses HTTPS" });
    score += 5;
  } else {
    issues.push({ severity: "critical", field: "https", message: "Page not using HTTPS" });
  }

  // --- Robots Meta ---
  const robotsMeta = $('meta[name="robots"]').attr("content") || "";
  if (robotsMeta.includes("noindex")) {
    issues.push({ severity: "critical", field: "robots", message: "Page is set to noindex" });
  } else {
    issues.push({ severity: "pass", field: "robots", message: "Page is indexable" });
    score += 5;
  }

  // Cap score at 100
  score = Math.min(score, 100);

  return {
    url: fullUrl,
    score,
    title,
    titleLength,
    metaDescription,
    metaDescLength,
    h1Count,
    h1Text,
    h2Count,
    h3Count,
    wordCount,
    hasCanonical,
    canonicalUrl: canonical,
    hasSchema,
    schemaTypes,
    internalLinks,
    externalLinks,
    imagesTotal,
    imagesMissingAlt,
    issues,
  };
}
