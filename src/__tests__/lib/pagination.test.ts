/**
 * Pagination boundary tests
 */

import { describe, it, expect } from "vitest";
import { getPageBounds } from "@/lib/pagination";
import { getPageItems } from "@/components/ui/Pagination";

// Matches the safari list: 9 per page, page one holds a featured card + 9.
const PAGE_SIZE = 9;
const FIRST_PAGE_SIZE = 10;

const bounds = (total: number, page: number) =>
  getPageBounds(total, page, PAGE_SIZE, FIRST_PAGE_SIZE);

describe("getPageBounds", () => {
  it("covers every item exactly once across all pages", () => {
    const total = 20;
    const { totalPages } = bounds(total, 1);
    const seen: number[] = [];

    for (let p = 1; p <= totalPages; p++) {
      const { startIndex, endIndex } = bounds(total, p);
      for (let i = startIndex; i < Math.min(endIndex, total); i++) seen.push(i);
    }

    expect(seen).toEqual(Array.from({ length: total }, (_, i) => i));
  });

  it("splits 20 items into 10 + 9 + 1", () => {
    expect(bounds(20, 1)).toMatchObject({
      totalPages: 3,
      startIndex: 0,
      endIndex: 10,
    });
    expect(bounds(20, 2)).toMatchObject({ startIndex: 10, endIndex: 19 });
    expect(bounds(20, 3)).toMatchObject({ startIndex: 19, endIndex: 28 });
  });

  it("uses a single page when everything fits on page one", () => {
    expect(bounds(10, 1).totalPages).toBe(1);
    expect(bounds(1, 1).totalPages).toBe(1);
    expect(bounds(0, 1).totalPages).toBe(1);
  });

  it("adds a second page as soon as the first overflows", () => {
    expect(bounds(11, 1).totalPages).toBe(2);
    expect(bounds(11, 2)).toMatchObject({ startIndex: 10, endIndex: 19 });
  });

  it("clamps a page beyond the end, which is how a shrinking filter result is handled", () => {
    // Was on page 3, then a filter narrows results to 5 items.
    expect(bounds(5, 3)).toMatchObject({
      totalPages: 1,
      currentPage: 1,
      startIndex: 0,
    });
  });

  it("clamps non-positive page numbers to the first page", () => {
    expect(bounds(20, 0).currentPage).toBe(1);
    expect(bounds(20, -4).currentPage).toBe(1);
  });

  it("behaves like uniform paging when no first-page override is given", () => {
    expect(getPageBounds(20, 1, 10)).toMatchObject({
      totalPages: 2,
      startIndex: 0,
      endIndex: 10,
    });
    expect(getPageBounds(20, 2, 10)).toMatchObject({
      startIndex: 10,
      endIndex: 20,
    });
  });

  it("rejects a page size below one", () => {
    expect(() => getPageBounds(10, 1, 0)).toThrow();
  });
});

describe("getPageItems", () => {
  it("lists every page when the count is small", () => {
    expect(getPageItems(1, 3)).toEqual([1, 2, 3]);
    expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("keeps first and last page and collapses the rest", () => {
    expect(getPageItems(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("does not emit a leading ellipsis near the start", () => {
    expect(getPageItems(2, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
  });

  it("does not emit a trailing ellipsis near the end", () => {
    expect(getPageItems(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
  });
});
