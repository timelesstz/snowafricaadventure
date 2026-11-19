import { describe, it, expect } from "vitest";
import { pickFeaturedTrip, splitForCard } from "@/lib/featured-trip";

const routes = [
  { slug: "7-days-rongai-route" },
  { slug: "6-days-marangu-route" },
  { slug: "8-days-lemosho-route" },
  { slug: "7-days-machame-route" },
  { slug: "4-days-mount-meru-climbing" },
];
const KILI = ["8-days-lemosho-route", "7-days-machame-route", "6-days-marangu-route"];

const safaris = [
  { slug: "4-days-safari-to-ngorongoro-and-serengeti" },
  { slug: "10-day-adventure-in-tanzania-safari-zanzibar" },
  { slug: "9-days-tanzania-wildlife-safari-migration" },
  { slug: "3-days-tanzania-budget-camping-safari-tarangire-lake-manyara-and-ngorongoro-crater" },
];
const SAFARI = ["9-days-tanzania-wildlife-safari-migration", "4-days-safari-to-ngorongoro-and-serengeti"];

describe("pickFeaturedTrip", () => {
  it("picks the route named in the title", () => {
    const post = { slug: "kilimanjaro-marangu-route-guide", title: "Marangu Route Guide", body: "Machame is busier." };
    expect(pickFeaturedTrip(post, routes, KILI)?.slug).toBe("6-days-marangu-route");
  });

  it("lets the title outweigh many body mentions of another route", () => {
    const post = { slug: "lemosho", title: "Lemosho route", body: "machame ".repeat(20) };
    expect(pickFeaturedTrip(post, routes, KILI)?.slug).toBe("8-days-lemosho-route");
  });

  it("uses body mentions when the title names no trip", () => {
    const post = { slug: "kilimanjaro-headlamp-guide", title: "Headlamp guide", body: "<p>On Meru and on Meru again</p>" };
    expect(pickFeaturedTrip(post, routes, KILI)?.slug).toBe("4-days-mount-meru-climbing");
  });

  it("falls back to the preferred order when nothing matches", () => {
    const post = { slug: "kilimanjaro-certificates", title: "Summit certificates", body: "Stella Point and Uhuru Peak." };
    expect(pickFeaturedTrip(post, routes, KILI)?.slug).toBe("8-days-lemosho-route");
  });

  it("matches multi-word safari terms and park names", () => {
    const post = { slug: "zanzibar-after-safari", title: "Zanzibar after a safari", body: "" };
    expect(pickFeaturedTrip(post, safaris, SAFARI)?.slug).toBe("10-day-adventure-in-tanzania-safari-zanzibar");
    const lions = { slug: "lions", title: "Lions of the Serengeti", body: "" };
    expect(pickFeaturedTrip(lions, safaris, SAFARI)?.slug).toBe("4-days-safari-to-ngorongoro-and-serengeti");
  });

  it("does not match a word inside another word", () => {
    // "merus" / "camerupt" must not count as Meru
    const post = { slug: "x", title: "Camerupt", body: "merus" };
    expect(pickFeaturedTrip(post, routes, KILI)?.slug).toBe("8-days-lemosho-route");
  });

  it("returns null for no candidates", () => {
    expect(pickFeaturedTrip({ slug: "", title: "", body: "" }, [], KILI)).toBeNull();
  });
});

describe("splitForCard", () => {
  const para = "<p>" + "word ".repeat(80) + "</p>";

  it("splits before the h2 nearest the middle", () => {
    const html = `${para}<h2 id="a">A</h2>${para}<h2 id="b">B</h2>${para}<h2 id="c">C</h2>${para}`;
    const halves = splitForCard(html);
    expect(halves).not.toBeNull();
    expect(halves![0] + halves![1]).toBe(html);
    expect(halves![1].startsWith('<h2 id="b">')).toBe(true);
  });

  it("never places the card after the FAQ heading", () => {
    const faq = `<h2 id="faq">Frequently Asked Questions</h2><div class="faq-container">${para}<h2>Late</h2>${para}${para}${para}</div>`;
    const html = `${para}${para}<h2>A</h2>${para}${faq}`;
    const [, second] = splitForCard(html)!;
    expect(second).toContain("Frequently Asked Questions");
    expect(second.indexOf("<h2>Late</h2>")).toBeGreaterThan(second.indexOf("Frequently"));
  });

  it("does not let a long combo slug win by naming more places", () => {
    const post = { slug: "machame-tips", title: "Machame route tips", body: "northern circuit northern circuit" };
    const withCombo = [...routes, { slug: "kilimanjaro-trek-machame-route-and-tanzania-safari-northern-circuit" }];
    expect(pickFeaturedTrip(post, withCombo, KILI)?.slug).toBe("7-days-machame-route");
  });

  it("never splits inside an open div", () => {
    const html = `${para}<div class="faq-container">${para}<h2>Inside</h2>${para}</div><h2>Outside</h2>${para}`;
    expect(splitForCard(html)![1].startsWith("<h2>Outside</h2>")).toBe(true);
  });

  it("returns null when there is no h2 after the opening", () => {
    expect(splitForCard(`<h2>Intro</h2>${para}${para}`)).toBeNull();
    expect(splitForCard(para)).toBeNull();
  });
});
