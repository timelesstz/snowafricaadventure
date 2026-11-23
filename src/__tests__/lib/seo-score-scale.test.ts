import { describe, expect, it } from "vitest";
import { scoreRouteSeo } from "@/lib/seo-score";

const complete = {
  title: "8 Days Lemosho Route Kilimanjaro",
  metaTitle: "8-Day Lemosho Route: Kilimanjaro Climb Itinerary",
  metaDescription:
    "Climb Kilimanjaro on the 8-day Lemosho Route: day-by-day itinerary, camps, altitude profile, what is included and the best months to go.",
  overview: "The Lemosho Route crosses the Shira Plateau before joining the southern circuit. ".repeat(6),
  featuredImage: "https://cdn.snowafricaadventure.com/lemosho.jpg",
  gallery: ["a", "b", "c", "d", "e", "f"],
  highlights: ["Shira Plateau", "Barranco Wall", "Lava Tower", "Uhuru Peak"],
  inclusions: ["Park fees"],
  exclusions: ["Flights"],
  itinerary: [{ day: 1 }],
  faqs: [{ q: "How hard is it?" }],
  guideName: "Head guide",
};

describe("route SEO score", () => {
  it("is 100 for a complete page, never more", () => {
    // The route checks weigh 110 points in total; the score is scaled to 100.
    expect(scoreRouteSeo(complete).score).toBe(100);
  });
  it("stays in 0–100 when checks fail", () => {
    const { score } = scoreRouteSeo({ ...complete, faqs: null, guideName: null });
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(100);
    expect(scoreRouteSeo({ title: "x", overview: "" }).score).toBeGreaterThanOrEqual(0);
  });
});
