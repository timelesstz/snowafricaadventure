const CDN_PREFIX = "https://cdn.snowafricaadventure.com/";

/**
 * True when a site-wide asset URL (logo, favicon) points at our own CDN, the
 * configured R2 public URL, or a same-origin relative path. Empty string is
 * allowed and means "clear the setting".
 */
export function isAllowedAssetUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (v === "") return true;
  if (v.length > 2048 || /[\s"'<>\\]/.test(v)) return false;

  // Relative same-origin path; "//host" would be protocol-relative
  if (v.startsWith("/") && !v.startsWith("//")) return true;

  const prefixes = [CDN_PREFIX];
  const r2 = process.env.R2_PUBLIC_URL?.trim();
  if (r2 && /^https:\/\//.test(r2)) {
    prefixes.push(r2.endsWith("/") ? r2 : `${r2}/`);
  }
  return prefixes.some((p) => v.startsWith(p));
}
