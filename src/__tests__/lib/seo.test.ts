import { describe, it, expect } from "vitest";
import {
  generateMetadata,
  generateTripSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";

describe("SEO utilities", () => {
  describe("generateMetadata", () => {
    it("should generate basic metadata", () => {
      const meta = generateMetadata({
        title: "Test Page",
        description: "Test description",
        url: "/test/",
      });

      expect(meta.title).toBe("Test Page | Snow Africa Adventure");
      expect(meta.description).toBe("Test description");
    });

    it("should include OpenGraph data", () => {
      const meta = generateMetadata({
        title: "Safari Tour",
        description: "Best safari experience",
        url: "/safari/",
      });

      expect(meta.openGraph?.title).toBe("Safari Tour | Snow Africa Adventure");
      // Type is part of the OpenGraph object but TypeScript union types make it harder to access
      expect((meta.openGraph as { type?: string })?.type).toBe("website");
    });

    it("should include Twitter card data", () => {
      const meta = generateMetadata({
        title: "Kilimanjaro",
        description: "Climb Mount Kilimanjaro",
        url: "/kilimanjaro/",
      });

      // Twitter card type is a union type in Next.js metadata
      expect((meta.twitter as { card?: string })?.card).toBe("summary_large_image");
      expect(meta.twitter?.title).toBe("Kilimanjaro | Snow Africa Adventure");
    });
  });

  describe("generateTripSchema", () => {
    it("should generate valid TouristTrip schema", () => {
      const schema = generateTripSchema({
        name: "7-Day Serengeti Safari",
        description: "Experience the migration",
        url: "/safaris/serengeti/",
        duration: "P7D",
        price: 3500,
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("TouristTrip");
      expect(schema.name).toBe("7-Day Serengeti Safari");
      expect(schema.touristType).toBe("Adventure");
    });

    it("should include optional fields when provided", () => {
      const schema = generateTripSchema({
        name: "Safari",
        description: "Description",
        url: "/safari/",
        image: "https://example.com/image.jpg",
      });

      expect(schema.image).toBe("https://example.com/image.jpg");
    });
  });

  describe("generateProductSchema", () => {
    it("should generate valid Product schema", () => {
      const schema = generateProductSchema({
        name: "Machame Route",
        description: "7-day climb",
        url: "/trekking/machame/",
        price: 2500,
      });

      expect(schema["@type"]).toBe("Product");
      expect(schema.brand).toEqual({
        "@type": "Brand",
        name: "Snow Africa Adventure",
      });
      expect(schema.offers.price).toBe(2500);
      expect(schema.offers.priceCurrency).toBe("USD");
    });

    it("should include aggregate rating when provided", () => {
      const schema = generateProductSchema({
        name: "Tour",
        description: "Tour description",
        url: "/tour/",
        price: 1000,
        ratingValue: 4.8,
        reviewCount: 50,
      });

      expect(schema.aggregateRating?.ratingValue).toBe(4.8);
      expect(schema.aggregateRating?.reviewCount).toBe(50);
    });
  });

  describe("generateBreadcrumbSchema", () => {
    it("should generate valid BreadcrumbList schema", () => {
      const items = [
        { name: "Home", url: "/" },
        { name: "Safaris", url: "/safaris/" },
        { name: "Serengeti", url: "/safaris/serengeti/" },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[2].position).toBe(3);
    });
  });

  describe("generateFAQSchema", () => {
    it("should generate valid FAQPage schema", () => {
      const faqs = [
        { question: "How long is the trek?", answer: "7 days" },
        { question: "What is included?", answer: "All meals and accommodation" },
      ];

      const schema = generateFAQSchema(faqs);

      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0]["@type"]).toBe("Question");
      expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    });
  });
});
