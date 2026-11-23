import { describe, expect, it } from "vitest";
import { AdminRole } from "@prisma/client";
import { HOME_ITEM, NAV_GROUPS, findActiveHref, navForRole } from "@/components/admin/sidebar/nav-config";

const all = [HOME_ITEM, ...NAV_GROUPS.flatMap((g) => g.items)];
const active = (path: string, query = "") => findActiveHref(path, new URLSearchParams(query), all);

describe("findActiveHref", () => {
  it("lights up the dashboard with or without the trailing slash", () => {
    expect(active("/admin/")).toBe("/admin");
    expect(active("/admin")).toBe("/admin");
  });
  it("never lights up the dashboard for other pages", () => {
    expect(active("/admin/unknown/")).toBeNull();
  });
  it("matches sub-pages by path segment, not by prefix", () => {
    expect(active("/admin/routes/abc/")).toBe("/admin/routes");
    expect(active("/admin/routes-archive/")).toBeNull();
  });
  it("prefers the most specific item", () => {
    expect(active("/admin/commissions/payouts/")).toBe("/admin/commissions/payouts");
    expect(active("/admin/commissions/")).toBe("/admin/commissions");
    expect(active("/admin/seo/content-ideas/")).toBe("/admin/seo");
  });
  it("uses the query string for filtered views", () => {
    expect(active("/admin/inquiries/", "status=new")).toBe("/admin/inquiries?status=new");
    expect(active("/admin/inquiries/", "status=closed")).toBe("/admin/inquiries");
    expect(active("/admin/inquiries/")).toBe("/admin/inquiries");
  });
});

describe("navForRole", () => {
  it("hides what a role may not open and drops empty groups", () => {
    const viewer = navForRole(AdminRole.VIEWER).flatMap((g) => g.items.map((i) => i.href));
    expect(viewer).toContain("/admin/seo");
    expect(viewer).not.toContain("/admin/bookings");
    expect(navForRole(AdminRole.VIEWER).some((g) => g.id === "sales")).toBe(false);
    const superAdmin = navForRole(AdminRole.SUPER_ADMIN).flatMap((g) => g.items);
    expect(superAdmin).toHaveLength(NAV_GROUPS.flatMap((g) => g.items).length);
  });
  it("has no duplicate links", () => {
    const hrefs = all.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
