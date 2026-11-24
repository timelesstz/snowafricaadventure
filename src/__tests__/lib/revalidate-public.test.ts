import { describe, it, expect, vi, beforeEach } from "vitest";

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));

import { revalidateRoutePages, revalidateDeparturePages, revalidateDestinationPages, revalidateBlogPages } from "@/lib/revalidate-public";

describe("revalidate-public", () => {
  beforeEach(() => revalidatePath.mockClear());

  it("refreshes every trekking route page", () => {
    revalidateRoutePages();
    expect(revalidatePath).toHaveBeenCalledExactlyOnceWith("/trekking/[routeSlug]", "page");
  });

  it("refreshes the join page and every route page after a departure change", () => {
    revalidateDeparturePages();
    expect(revalidatePath).toHaveBeenCalledWith("/kilimanjaro-join-group-departures/");
    expect(revalidatePath).toHaveBeenCalledWith("/trekking/[routeSlug]", "page");
    expect(revalidatePath).toHaveBeenCalledTimes(2);
  });

  it("refreshes every destination page and the listing", () => {
    revalidateDestinationPages();
    expect(revalidatePath).toHaveBeenCalledWith("/tanzania-destinations/[destSlug]", "page");
    expect(revalidatePath).toHaveBeenCalledWith("/tanzania-destinations/");
    expect(revalidatePath).toHaveBeenCalledTimes(2);
  });

  it("refreshes every blog post, the blog lists and category pages", () => {
    revalidateBlogPages();
    expect(revalidatePath).toHaveBeenCalledWith("/[postSlug]", "page");
    expect(revalidatePath).toHaveBeenCalledWith("/blog/");
    expect(revalidatePath).toHaveBeenCalledWith("/blog/page/[page]", "page");
    expect(revalidatePath).toHaveBeenCalledWith("/category/[categorySlug]", "page");
    expect(revalidatePath).toHaveBeenCalledTimes(4);
  });
});
