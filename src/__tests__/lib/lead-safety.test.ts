import { describe, it, expect } from "vitest";
import { isPlausibleHoneypotLead, containsSpamSignals } from "@/lib/notifications/lead-safety";

describe("isPlausibleHoneypotLead", () => {
  const human = { email: "ana@example.test", name: "Ana Lopez", message: "Kilimanjaro in February?" };

  it("accepts a real-looking traveller", () => {
    expect(isPlausibleHoneypotLead(human)).toBe(true);
  });

  it("accepts trip fields in place of a message, and a single 4+ char name", () => {
    expect(isPlausibleHoneypotLead({ email: "x@example.test", name: "Ahmed", hasTripFields: true })).toBe(true);
  });

  it("rejects invalid email, short name or an empty submission", () => {
    expect(isPlausibleHoneypotLead({ ...human, email: "nope" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, name: "Al" })).toBe(false);
    expect(isPlausibleHoneypotLead({ email: human.email, name: human.name })).toBe(false);
  });

  it("rejects URLs and B2B pitch phrases", () => {
    expect(isPlausibleHoneypotLead({ ...human, message: "visit www.cheap.example" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, message: "Need a website redesign?" })).toBe(false);
    expect(isPlausibleHoneypotLead({ ...human, message: "Guest post offer" })).toBe(false);
  });

  it("does not trip on words that merely contain a phrase", () => {
    expect(containsSpamSignals("Best season for a Serengeti safari")).toBe(false);
    expect(containsSpamSignals("SEO services")).toBe(true);
  });
});
