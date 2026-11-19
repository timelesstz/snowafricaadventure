/**
 * Serialise an object for a <script type="application/ld+json"> tag.
 * Escapes "<" so stored content containing "</script>" cannot break out of the tag.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
