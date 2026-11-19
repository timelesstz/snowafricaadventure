import { describe, it, expect } from "vitest";
import { sanitizeContentHtml, sanitizePuckData } from "@/lib/sanitize-html";

describe("sanitizeContentHtml", () => {
  it("removes script tags and their contents", () => {
    const out = sanitizeContentHtml('<p>Hi</p><script>alert(1)</script>');
    expect(out).toBe("<p>Hi</p>");
  });

  it("removes style tags and inline event handlers", () => {
    const out = sanitizeContentHtml(
      '<style>body{display:none}</style><img src="https://cdn.snowafricaadventure.com/a.jpg" alt="Kibo" onerror="alert(1)">'
    );
    expect(out).not.toContain("onerror");
    expect(out).not.toContain("<style");
    expect(out).toContain('src="https://cdn.snowafricaadventure.com/a.jpg"');
    expect(out).toContain('alt="Kibo"');
  });

  it("strips javascript: and data: hrefs", () => {
    const out = sanitizeContentHtml(
      '<a href="javascript:alert(1)">x</a><a href="data:text/html,<script>">y</a>'
    );
    expect(out).not.toMatch(/javascript:/i);
    expect(out).not.toMatch(/href="data:/i);
  });

  it("keeps mailto, tel and https links", () => {
    const out = sanitizeContentHtml(
      '<a href="mailto:info@example.com">m</a><a href="tel:+255">t</a><a href="https://example.com/">h</a>'
    );
    expect(out).toContain('href="mailto:info@example.com"');
    expect(out).toContain('href="tel:+255"');
    expect(out).toContain('href="https://example.com/"');
  });

  it("adds noopener to target=_blank links", () => {
    const out = sanitizeContentHtml('<a href="https://example.com" target="_blank">x</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toMatch(/rel="[^"]*noopener[^"]*"/);
  });

  it("keeps ids and classes used by the TOC and styling", () => {
    const html =
      '<h2 id="best-time-to-climb" class="toc-heading">Best time</h2><div class="callout tip"><p class="lead">Text</p></div>';
    expect(sanitizeContentHtml(html)).toBe(html);
  });

  it("keeps tables", () => {
    const html =
      '<table class="price-table"><thead><tr><th scope="col">Route</th></tr></thead><tbody><tr><td colspan="2">Machame</td></tr></tbody></table>';
    expect(sanitizeContentHtml(html)).toBe(html);
  });

  it("keeps YouTube, Vimeo and Google Maps iframes", () => {
    const yt =
      '<iframe src="https://www.youtube.com/embed/abc123" width="560" height="315" allowfullscreen></iframe>';
    expect(sanitizeContentHtml(yt)).toContain('src="https://www.youtube.com/embed/abc123"');
    expect(
      sanitizeContentHtml('<iframe src="https://www.youtube-nocookie.com/embed/abc"></iframe>')
    ).toContain("youtube-nocookie.com");
    expect(
      sanitizeContentHtml('<iframe src="https://player.vimeo.com/video/1"></iframe>')
    ).toContain("player.vimeo.com");
    expect(
      sanitizeContentHtml('<iframe src="https://www.google.com/maps/embed?pb=x"></iframe>')
    ).toContain("google.com/maps/embed");
  });

  it("removes iframes from other hosts and non-maps Google pages", () => {
    expect(sanitizeContentHtml('<iframe src="https://evil.example/x"></iframe>')).toBe("");
    expect(sanitizeContentHtml('<iframe src="https://www.google.com/search?q=x"></iframe>')).toBe("");
    expect(sanitizeContentHtml('<iframe src="javascript:alert(1)"></iframe>')).toBe("");
  });

  it("handles empty input", () => {
    expect(sanitizeContentHtml("")).toBe("");
    expect(sanitizeContentHtml(null)).toBe("");
  });
});

describe("sanitizePuckData", () => {
  it("sanitises HTML props of text blocks and leaves other props alone", () => {
    const data = {
      root: { props: {} },
      content: [
        { type: "TextBlock", props: { id: "t1", heading: "<b>x</b>", body: '<p onclick="x()">ok</p><script>1</script>' } },
        { type: "HeroBlock", props: { id: "h1", title: "<script>kept as text prop</script>" } },
      ],
      zones: {
        "z:1": [{ type: "ImageTextBlock", props: { id: "i1", body: '<img src="x" onerror="y">' } }],
      },
    };
    const out = sanitizePuckData(data);
    expect(out.content[0].props.body).toBe("<p>ok</p>");
    expect(out.content[0].props.heading).toBe("<b>x</b>");
    expect(out.content[1].props.title).toBe("<script>kept as text prop</script>");
    expect(out.zones["z:1"][0].props.body).not.toContain("onerror");
    // input is not mutated
    expect(data.content[0].props.body).toContain("<script>");
  });
});
