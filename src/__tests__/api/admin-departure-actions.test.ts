import { describe, it, expect, vi, beforeEach } from "vitest";

const tx = {
  groupDeparture: {
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    delete: vi.fn(),
  },
  departureActionLog: { create: vi.fn() },
};

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    groupDeparture: {
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $transaction: vi.fn(async (fn: (t: typeof tx) => unknown) => fn(tx)),
  },
}));
vi.mock("@/lib/auth", () => ({ auth: vi.fn(), requireRole: vi.fn() }));
vi.mock("@/lib/services/departure-rotation", () => ({
  manuallyFeatureDeparture: vi.fn(),
}));

import { PUT, DELETE } from "@/app/api/admin/departures/[id]/route";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const currentDeparture = {
  id: "dep_1",
  status: "OPEN",
  startDate: new Date("2026-12-01T00:00:00Z"),
  route: { title: "8 Days Lemosho Route", slug: "8-days-lemosho-route" },
  _count: { bookings: 0 },
};

function request(method: "PUT" | "DELETE", body: unknown) {
  return new Request("http://localhost:3000/api/admin/departures/dep_1", {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const context = { params: Promise.resolve({ id: "dep_1" }) };

describe("Admin departure actions", () => {
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
    vi.mocked(prisma.groupDeparture.findUnique).mockResolvedValue(
      currentDeparture as never
    );
    tx.groupDeparture.findUnique.mockResolvedValue(currentDeparture);
    tx.groupDeparture.update.mockResolvedValue({
      id: "dep_1",
      route: currentDeparture.route,
    });
    tx.groupDeparture.updateMany.mockResolvedValue({ count: 1 });
    tx.groupDeparture.delete.mockResolvedValue({ id: "dep_1" });
  });

  it("rejects a new switch-off without a reason", async () => {
    const res = await PUT(request("PUT", { status: "CANCELLED" }), context);

    expect(res.status).toBe(400);
    expect(tx.groupDeparture.update).not.toHaveBeenCalled();
    expect(tx.departureActionLog.create).not.toHaveBeenCalled();
  });

  it("switches off and audits with the trimmed reason and authenticated actor", async () => {
    const res = await PUT(
      request("PUT", {
        status: "CANCELLED",
        reason: "  Minimum numbers were not reached  ",
      }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "dep_1", status: { not: "CANCELLED" } },
        data: {
          status: "CANCELLED",
          isFeatured: false,
          isManuallyFeatured: false,
        },
      })
    );
    expect(tx.departureActionLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        departureId: "dep_1",
        action: "SWITCH_OFF",
        reason: "Minimum numbers were not reached",
        actorId: "admin_1",
        actorEmail: "admin@example.test",
        routeTitle: "8 Days Lemosho Route",
        status: "OPEN",
      }),
    });
    expect(revalidatePath).toHaveBeenCalledWith(
      "/kilimanjaro-join-group-departures/"
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      "/trekking/8-days-lemosho-route/"
    );
    expect(revalidatePath).toHaveBeenCalledWith("/trekking/");
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });

  it("allows ordinary edits of an already-cancelled departure without another reason", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue({
      ...currentDeparture,
      status: "CANCELLED",
    });
    vi.mocked(prisma.groupDeparture.update).mockResolvedValue({
      id: "dep_1",
    } as never);

    const res = await PUT(
      request("PUT", {
        status: "CANCELLED",
        publicNotes: "Updated note",
      }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.groupDeparture.findUnique).toHaveBeenCalledTimes(2);
    expect(tx.groupDeparture.update).toHaveBeenCalledTimes(1);
    expect(prisma.groupDeparture.update).not.toHaveBeenCalled();
    expect(tx.departureActionLog.create).not.toHaveBeenCalled();
  });

  it("does not duplicate the audit when a concurrent switch-off wins", async () => {
    tx.groupDeparture.updateMany.mockResolvedValue({ count: 0 });

    const res = await PUT(
      request("PUT", {
        status: "CANCELLED",
        reason: "Minimum numbers were not reached",
      }),
      context
    );

    expect(res.status).toBe(409);
    expect(tx.departureActionLog.create).not.toHaveBeenCalled();
  });

  it("rejects mixing a new switch-off with ordinary edits", async () => {
    const res = await PUT(
      request("PUT", {
        status: "CANCELLED",
        reason: "Created in error",
        publicNotes: "Must be saved separately",
      }),
      context
    );

    expect(res.status).toBe(400);
    expect(tx.groupDeparture.update).not.toHaveBeenCalled();
  });

  it("requires a reason before deletion", async () => {
    const res = await DELETE(request("DELETE", {}), context);

    expect(res.status).toBe(400);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("blocks deletion when any booking exists", async () => {
    const bookedDeparture = {
      ...currentDeparture,
      _count: { bookings: 1 },
    };
    tx.groupDeparture.findUnique.mockResolvedValue(bookedDeparture);
    vi.mocked(prisma.groupDeparture.findUnique).mockResolvedValue(
      bookedDeparture as never
    );
    const res = await DELETE(
      request("DELETE", { reason: "Created in error" }),
      context
    );

    expect(res.status).toBe(409);
    expect(tx.departureActionLog.create).not.toHaveBeenCalled();
    expect(tx.groupDeparture.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("audits before permanently deleting an unbooked departure", async () => {
    const res = await DELETE(
      request("DELETE", { reason: "  Created in error  " }),
      context
    );

    expect(res.status).toBe(200);
    expect(tx.departureActionLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        departureId: "dep_1",
        action: "DELETE",
        reason: "Created in error",
        actorId: "admin_1",
        actorEmail: "admin@example.test",
        routeTitle: "8 Days Lemosho Route",
        status: "OPEN",
      }),
    });
    expect(tx.groupDeparture.delete).toHaveBeenCalledWith({
      where: { id: "dep_1" },
    });
    expect(
      tx.departureActionLog.create.mock.invocationCallOrder[0]
    ).toBeLessThan(tx.groupDeparture.delete.mock.invocationCallOrder[0]);
    expect(revalidatePath).toHaveBeenCalledWith(
      "/trekking/8-days-lemosho-route/"
    );
  });

  it("returns 409 when a concurrent booking blocks deletion", async () => {
    tx.groupDeparture.delete.mockRejectedValue({ code: "P2003" });

    const res = await DELETE(
      request("DELETE", { reason: "Created in error" }),
      context
    );

    expect(res.status).toBe(409);
  });

  it("reports committed deletion when cache revalidation fails", async () => {
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw new Error("Cache unavailable");
    });

    const res = await DELETE(
      request("DELETE", { reason: "Created in error" }),
      context
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(
      expect.objectContaining({ success: true })
    );
  });

  it("returns 404 without deleting when the departure is missing", async () => {
    tx.groupDeparture.findUnique.mockResolvedValue(null);
    vi.mocked(prisma.groupDeparture.findUnique).mockResolvedValue(null);
    const res = await DELETE(
      request("DELETE", { reason: "Created in error" }),
      context
    );

    expect(res.status).toBe(404);
    expect(tx.groupDeparture.delete).not.toHaveBeenCalled();
  });
});
