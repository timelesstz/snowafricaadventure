import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    trekkingRoute: {
      findMany: vi.fn(),
    },
    safariPackage: {
      findMany: vi.fn(),
    },
    destination: {
      findMany: vi.fn(),
    },
    blogPost: {
      findMany: vi.fn(),
    },
  },
}));

// Import after mocking
import { GET } from "@/app/api/search/route";
import prisma from "@/lib/prisma";

describe("Search API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return error for query less than 2 characters", async () => {
    const request = new NextRequest("http://localhost:3000/api/search?q=a");
    const response = await GET(request);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.message).toBe("Search query must be at least 2 characters");
    expect(data.results).toEqual([]);
  });

  it("should return error for empty query", async () => {
    const request = new NextRequest("http://localhost:3000/api/search?q=");
    const response = await GET(request);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.results).toEqual([]);
  });

  it("should search all content types by default", async () => {
    const mockRoutes = [
      { slug: "machame-route", title: "Machame Route", overview: "A popular route..." },
    ];
    const mockSafaris = [
      { slug: "serengeti-safari", title: "Serengeti Safari", overview: "Experience the migration..." },
    ];
    const mockDestinations = [
      { slug: "serengeti", name: "Serengeti", description: "The endless plains..." },
    ];
    const mockBlog = [
      { slug: "best-time-visit", title: "Best Time to Visit", excerpt: "Planning your trip..." },
    ];

    vi.mocked(prisma.trekkingRoute.findMany).mockResolvedValue(mockRoutes as never);
    vi.mocked(prisma.safariPackage.findMany).mockResolvedValue(mockSafaris as never);
    vi.mocked(prisma.destination.findMany).mockResolvedValue(mockDestinations as never);
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue(mockBlog as never);

    const request = new NextRequest("http://localhost:3000/api/search?q=serengeti");
    const response = await GET(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.query).toBe("serengeti");
    expect(data.totalResults).toBe(4);
    expect(prisma.trekkingRoute.findMany).toHaveBeenCalled();
    expect(prisma.safariPackage.findMany).toHaveBeenCalled();
    expect(prisma.destination.findMany).toHaveBeenCalled();
    expect(prisma.blogPost.findMany).toHaveBeenCalled();
  });

  it("should filter by type when specified", async () => {
    const mockSafaris = [
      { slug: "serengeti-safari", title: "Serengeti Safari", overview: "Experience the migration..." },
    ];

    vi.mocked(prisma.safariPackage.findMany).mockResolvedValue(mockSafaris as never);

    const request = new NextRequest("http://localhost:3000/api/search?q=safari&type=safaris");
    const response = await GET(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.results.safaris).toHaveLength(1);
    expect(data.results.routes).toHaveLength(0);
    expect(data.results.destinations).toHaveLength(0);
    expect(data.results.blog).toHaveLength(0);
    expect(prisma.trekkingRoute.findMany).not.toHaveBeenCalled();
    expect(prisma.destination.findMany).not.toHaveBeenCalled();
    expect(prisma.blogPost.findMany).not.toHaveBeenCalled();
  });

  it("should respect limit parameter", async () => {
    const mockRoutes = Array(20).fill({
      slug: "route",
      title: "Route",
      overview: "Description..."
    });

    vi.mocked(prisma.trekkingRoute.findMany).mockResolvedValue(mockRoutes as never);
    vi.mocked(prisma.safariPackage.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.destination.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue([] as never);

    const request = new NextRequest("http://localhost:3000/api/search?q=route&limit=5");
    await GET(request);

    expect(prisma.trekkingRoute.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 5,
      })
    );
  });

  it("should cap limit at 50", async () => {
    vi.mocked(prisma.trekkingRoute.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.safariPackage.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.destination.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue([] as never);

    const request = new NextRequest("http://localhost:3000/api/search?q=test&limit=100");
    await GET(request);

    expect(prisma.trekkingRoute.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 50,
      })
    );
  });

  it("should truncate overview text", async () => {
    const longOverview = "A".repeat(200);
    const mockRoutes = [
      { slug: "route", title: "Route", overview: longOverview },
    ];

    vi.mocked(prisma.trekkingRoute.findMany).mockResolvedValue(mockRoutes as never);
    vi.mocked(prisma.safariPackage.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.destination.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue([] as never);

    const request = new NextRequest("http://localhost:3000/api/search?q=route");
    const response = await GET(request);
    const data = await response.json();

    expect(data.results.routes[0].overview.length).toBeLessThanOrEqual(154); // 150 + "..."
    expect(data.results.routes[0].overview.endsWith("...")).toBe(true);
  });

  it("should handle database errors gracefully", async () => {
    vi.mocked(prisma.trekkingRoute.findMany).mockRejectedValue(new Error("Database error"));

    const request = new NextRequest("http://localhost:3000/api/search?q=test");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Search failed");
  });
});
