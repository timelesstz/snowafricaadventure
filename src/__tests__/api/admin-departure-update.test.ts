import { beforeEach, describe, expect, it, vi } from "vitest";

const tx = {
  $queryRaw: vi.fn(),
  groupDeparture: {
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  departureActionLog: { create: vi.fn() },
};

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    groupDeparture: {
      update: vi.fn(),
    },
    $transaction: vi.fn(async (fn: (transaction: typeof tx) => unknown) => fn(tx)),
  },
}));
vi.mock("@/lib/auth", () => ({ auth: vi.fn(), requireRole: vi.fn() }));
vi.mock("@/lib/services/departure-rotation", () => ({
  manuallyFeatureDeparture: vi.fn(),
}));

import { PUT } from "@/app/api/admin/departures/[id]/route";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { manuallyFeatureDeparture } from "@/lib/services/departure-rotation";
import { revalidatePath } from "next/cache";

const oldRoute = { title: "Old Route", slug: "old-route" };
const newRoute = { title: "New Route", slug: "new-route" };

const currentDeparture = {
  id: "dep_1",
  routeId: "route_old",
  status: "OPEN",
  startDate: new Date("2026-12-01T00:00:00Z"),
  isFeatured: false,
  isManuallyFeatured: false,
  route: oldRoute,
  bookings: [] as { totalClimbers: number }[],
};

const updatedDeparture = {
  ...currentDeparture,
  bookings: undefined,
};

function request(body: unknown) {
  return new Request("http://localhost:3000/api/admin/departures/dep_1", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const context = { params: Promise.resolve({ id: "dep_1" }) };

function expectDepartureLock() {
  expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
  const [query, departureId] = tx.$queryRaw.mock.calls[0];
  expect(query.join(" ")).toContain('SELECT id FROM "GroupDeparture" WHERE id =');
  expect(query.join(" ")).toContain("FOR UPDATE");
  expect(departureId).toBe("dep_1");
}

describe("Admin ordinary departure updates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(revalidatePath).mockReset();
    vi.mocked(requireRole).mockResolvedValue({
      user: {
        id: "admin_1",
        email: "admin@example.test",
        name: "Admin",
        role: "EDITOR",
      },
    } as never);
    tx.$queryRaw.mockResolvedValue([{ id: "dep_1" }]);
    tx.groupDeparture.findUnique.mockResolvedValue(currentDeparture);
    tx.groupDeparture.update.mockResolvedValue(updatedDeparture);
    tx.groupDeparture.updateMany.mockResolvedValue({ count: 0 });
    vi.mocked(prisma.groupDeparture.update).mockResolvedValue(updatedDeparture as never);
  });

  it("rejects mixed switch-off edits before requiring a reason", async () => {
    const res = await PUT(
      request({ status: "CANCELLED", publicNotes: "Save this separately" }),
      context
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Save ordinary edits before switching off the departure",
    });
    expect(tx.groupDeparture.updateMany).not.toHaveBeenCalled();
    expect(tx.departureActionLog.create).not.toHaveBeenCalled();
  });

  it("rejects capacity below booked spots without writing", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      bookings: [{ totalClimbers: 3 }, { totalClimbers: 4 }],
    });

    const res = await PUT(request({ maxParticipants: 6 }), context);

    expect(res.status).toBe(409);
    expect((await res.json()).error).toMatch(/7.*booked|booked.*7/i);
    expectDepartureLock();
    expect(tx.groupDeparture.update).not.toHaveBeenCalled();
    expect(prisma.groupDeparture.update).not.toHaveBeenCalled();
    expect(tx.groupDeparture.updateMany).not.toHaveBeenCalled();
  });

  it("allows capacity equal to booked spots", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      bookings: [{ totalClimbers: 3 }, { totalClimbers: 4 }],
    });

    const res = await PUT(request({ maxParticipants: 7 }), context);

    expect(res.status).toBe(200);
    expectDepartureLock();
    expect(tx.groupDeparture.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "dep_1" },
        data: expect.objectContaining({ maxParticipants: 7 }),
      })
    );
    expect(prisma.groupDeparture.update).not.toHaveBeenCalled();
  });

  it("locks the departure before reading its current capacity", async () => {
    const events: string[] = [];
    tx.$queryRaw.mockImplementation(async () => {
      events.push("lock");
      return [{ id: "dep_1" }];
    });
    tx.groupDeparture.findUnique.mockImplementation(async () => {
      events.push("current");
      return currentDeparture;
    });

    const res = await PUT(request({ maxParticipants: 10 }), context);

    expect(res.status).toBe(200);
    expectDepartureLock();
    expect(events.slice(0, 2)).toEqual(["lock", "current"]);
  });

  it("returns 404 without a capacity read when the departure lock finds no row", async () => {
    tx.$queryRaw.mockResolvedValue([]);

    const res = await PUT(request({ maxParticipants: 10 }), context);

    expect(res.status).toBe(404);
    expectDepartureLock();
    expect(tx.groupDeparture.findUnique).not.toHaveBeenCalled();
    expect(tx.groupDeparture.update).not.toHaveBeenCalled();
  });

  it("unfeatures other departures on the target route when featuring", async () => {
    tx.groupDeparture.update.mockResolvedValue({
      ...updatedDeparture,
      routeId: "route_new",
      isFeatured: true,
      isManuallyFeatured: true,
      route: newRoute,
    });

    const res = await PUT(
      request({
        routeId: "route_new",
        isFeatured: true,
        isManuallyFeatured: true,
      }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.updateMany).toHaveBeenCalledWith({
      where: {
        routeId: "route_new",
        isFeatured: true,
        id: { not: "dep_1" },
      },
      data: { isFeatured: false, isManuallyFeatured: false },
    });
    expect(tx.groupDeparture.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          route: { connect: { id: "route_new" } },
          isFeatured: true,
          isManuallyFeatured: true,
        }),
      })
    );
    expect(manuallyFeatureDeparture).not.toHaveBeenCalled();
    expect(prisma.groupDeparture.update).not.toHaveBeenCalled();
  });

  it("keeps an auto-featured departure featured when a full form sends manual false", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      isFeatured: true,
      isManuallyFeatured: false,
    });
    tx.groupDeparture.update.mockResolvedValue({
      ...updatedDeparture,
      isFeatured: true,
      isManuallyFeatured: false,
    });

    const res = await PUT(
      request({
        publicNotes: "Unrelated edit",
        isFeatured: true,
        isManuallyFeatured: false,
      }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          isFeatured: true,
          isManuallyFeatured: false,
        }),
      })
    );
    expect(tx.groupDeparture.updateMany).toHaveBeenCalledWith({
      where: {
        routeId: "route_old",
        isFeatured: true,
        id: { not: "dep_1" },
      },
      data: { isFeatured: false, isManuallyFeatured: false },
    });
  });

  it("keeps a cancelled departure unfeatured when a full form attempts to feature it", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      status: "CANCELLED",
      isFeatured: true,
      isManuallyFeatured: true,
    });
    tx.groupDeparture.update.mockResolvedValue({
      ...updatedDeparture,
      status: "CANCELLED",
      isFeatured: false,
      isManuallyFeatured: false,
    });

    const res = await PUT(
      request({
        status: "CANCELLED",
        publicNotes: "Cancelled full-form save",
        isFeatured: true,
        isManuallyFeatured: true,
      }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "CANCELLED",
          isFeatured: false,
          isManuallyFeatured: false,
        }),
      })
    );
    expect(tx.groupDeparture.updateMany).not.toHaveBeenCalled();
  });

  it("reconciles the target route for a route-only move of a featured departure", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      isFeatured: true,
      isManuallyFeatured: true,
    });
    tx.groupDeparture.update.mockResolvedValue({
      ...updatedDeparture,
      routeId: "route_new",
      isFeatured: true,
      isManuallyFeatured: true,
      route: newRoute,
    });

    const res = await PUT(request({ routeId: "route_new" }), context);

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.updateMany).toHaveBeenCalledWith({
      where: {
        routeId: "route_new",
        isFeatured: true,
        id: { not: "dep_1" },
      },
      data: { isFeatured: false, isManuallyFeatured: false },
    });
    expect(manuallyFeatureDeparture).not.toHaveBeenCalled();
  });

  it("revalidates collections and both previous and new route pages", async () => {
    tx.groupDeparture.update.mockResolvedValue({
      ...updatedDeparture,
      routeId: "route_new",
      route: newRoute,
    });

    const res = await PUT(
      request({ routeId: "route_new", publicNotes: "Moved route" }),
      context
    );

    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith("/kilimanjaro-join-group-departures/");
    expect(revalidatePath).toHaveBeenCalledWith("/trekking/");
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(revalidatePath).toHaveBeenCalledWith("/trekking/old-route/");
    expect(revalidatePath).toHaveBeenCalledWith("/trekking/new-route/");
  });

  it("returns a cache warning after a committed ordinary update", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw new Error("Cache unavailable");
    });

    const res = await PUT(request({ publicNotes: "Saved" }), context);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(
      expect.objectContaining({
        warning: "The departure was saved, but public pages may take a moment to refresh.",
      })
    );
    consoleError.mockRestore();
  });
});
