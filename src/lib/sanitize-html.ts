import sanitizeHtml from "sanitize-html";

/**
 * Sanitiser for admin-authored rich HTML (blog posts, CMS text blocks).
 *
 * Keeps the structure existing posts rely on: headings with ids (table of
 * contents anchors), classes (styling), tables, figures and responsive images.
 * Removes scripts, styles, inline event handlers and dangerous URL schemes.
 * Iframes are kept only for YouTube, Vimeo and Google Maps embeds.
 */

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li", "dl", "dt", "dd",
  "a", "img", "figure", "figcaption", "picture", "source",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  "blockquote", "cite", "q",
  "strong", "em", "b", "i", "u", "s", "small", "sub", "sup", "mark", "abbr",
  "code", "pre", "kbd",
  "span", "div", "section", "article", "aside",
  "details", "summary",
  "iframe",
];

const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
  "www.google.com",
  "google.com",
  "maps.google.com",
];

/** Google embeds are only allowed for Maps, not arbitrary google.com pages. */
function isAllowedIframeSrc(src: string): boolean {
  let url: URL;
  try {
    url = new URL(src, "https://invalid.local");
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  if (!ALLOWED_IFRAME_HOSTS.includes(url.hostname)) return false;
  if (url.hostname.endsWith("google.com")) {
    return url.hostname === "maps.google.com" || url.pathname.startsWith("/maps");
  }
  return true;
}

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    // id + class on every allowed tag so TOC anchors and styling keep working
    "*": ["id", "class", "title", "lang", "dir"],
    a: ["href", "title", "target", "rel", "name"],
    img: ["src", "alt", "width", "height", "loading", "decoding", "srcset", "sizes"],
    source: ["srcset", "sizes", "type", "media"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    col: ["span"],
    colgroup: ["span"],
    ol: ["start", "reversed", "type"],
    blockquote: ["cite"],
    q: ["cite"],
    abbr: ["title"],
    details: ["open"],
    iframe: [
      "src", "width", "height", "title", "allow", "allowfullscreen",
      "frameborder", "loading", "referrerpolicy",
    ],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    img: ["http", "https", "data"],
  },
  allowedSchemesAppliedToAttributes: ["href", "src", "cite", "srcset"],
  allowProtocolRelative: false,
  allowedIframeHostnames: ALLOWED_IFRAME_HOSTS,
  // Drop the contents of these entirely rather than leaving their text behind
  nonTextTags: ["script", "style", "textarea", "option", "noscript"],
  exclusiveFilter: (frame) =>
    frame.tag === "iframe" && !isAllowedIframeSrc(frame.attribs.src || ""),
  transformTags: {
    // Links that open a new tab must not get window.opener
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        const rel = new Set((attribs.rel || "").split(/\s+/).filter(Boolean));
        rel.add("noopener");
        rel.add("noreferrer");
        return { tagName, attribs: { ...attribs, rel: Array.from(rel).join(" ") } };
      }
      return { tagName, attribs };
    },
  },
};

/** Sanitise admin-authored HTML before saving or rendering it. */
export function sanitizeContentHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, OPTIONS);
}

/** CMS block props that contain HTML, keyed by block type. */
const PUCK_HTML_PROPS: Record<string, string[]> = {
  TextBlock: ["body"],
  ImageTextBlock: ["body"],
};

interface PuckItem {
  type?: string;
  props?: Record<string, unknown>;
  [key: string]: unknown;
}

function sanitizeItem(item: unknown): unknown {
  if (!item || typeof item !== "object") return item;
  const it = item as PuckItem;
  const htmlProps = it.type ? PUCK_HTML_PROPS[it.type] : undefined;
  if (!htmlProps || !it.props) return item;
  const props = { ...it.props };
  for (const key of htmlProps) {
    if (typeof props[key] === "string") {
      props[key] = sanitizeContentHtml(props[key] as string);
    }
  }
  return { ...it, props };
}

/**
 * Sanitise the HTML props inside Puck page data (root content and drop zones).
 * Returns a new object; unknown shapes are passed through unchanged.
 */
export function sanitizePuckData<T>(data: T): T {
  if (!data || typeof data !== "object") return data;
  const d = data as Record<string, unknown>;
  const out: Record<string, unknown> = { ...d };
  if (Array.isArray(d.content)) out.content = d.content.map(sanitizeItem);
  if (d.zones && typeof d.zones === "object") {
    const zones: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(d.zones as Record<string, unknown>)) {
      zones[k] = Array.isArray(v) ? v.map(sanitizeItem) : v;
    }
    out.zones = zones;
  }
  return out as T;
}
