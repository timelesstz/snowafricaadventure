import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  findUnique,
  findMany,
  departureFormMock,
  departureActionsMock,
  notFoundMock,
} = vi.hoisted(() => ({
  findUnique: vi.fn(),
  findMany: vi.fn(),
  departureFormMock: vi.fn<
    (props: {
      bookedSpots?: number;
      departure?: { earlyBirdPrice?: number | null };
    }) => null
  >(() => null),
  departureActionsMock: vi.fn(() => null),
  notFoundMock: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    groupDeparture: { findUnique },
    trekkingRoute: { findMany },
  },
}));

vi.mock("next/navigation", () => ({ notFound: notFoundMock }));

vi.mock("@/components/admin/departures/DepartureForm", () => ({
  DepartureForm: departureFormMock,
}));

vi.mock("@/components/admin/departures/DepartureActions", () => ({
  DepartureActions: departureActionsMock,
}));

import EditDeparturePage from "@/app/(admin)/admin/departures/[id]/page";

describe("EditDeparturePage booking details", () => {
  beforeEach(() => {
    findUnique.mockResolvedValue({
      id: "departure-1",
      routeId: "route-1",
      arrivalDate: new Date("2027-01-10T00:00:00.000Z"),
      startDate: new Date("2027-01-11T00:00:00.000Z"),
      summitDate: new Date("2027-01-16T00:00:00.000Z"),
      endDate: new Date("2027-01-17T00:00:00.000Z"),
      price: 3250,
      currency: "USD",
      earlyBirdPrice: 0,
      earlyBirdUntil: null,
      minParticipants: 2,
      maxParticipants: 8,
      isFullMoon: false,
      isGuaranteed: false,
      isFeatured: false,
      isManuallyFeatured: false,
      excludeFromRotation: false,
      status: "OPEN",
      internalNotes: null,
      publicNotes: null,
      _count: { bookings: 2 },
      bookings: [
        {
          id: "booking-inquiry",
          leadName: "Amina Mohamed",
          totalClimbers: 2,
          status: "INQUIRY",
          createdAt: new Date("2026-11-20T10:00:00.000Z"),
        },
        {
          id: "booking-confirmed",
          leadName: "Daniel Reynolds",
          totalClimbers: 3,
          status: "CONFIRMED",
          createdAt: new Date("2026-11-21T10:00:00.000Z"),
        },
      ],
    });
    findMany.mockResolvedValue([
      {
        id: "route-1",
        title: "Lemosho Route",
        slug: "lemosho-route",
        duration: "8 days",
        durationDays: 8,
      },
    ]);
  });

  it("shows every booking, counts only held spots, and preserves zero early-bird pricing", async () => {
    render(
      await EditDeparturePage({
        params: Promise.resolve({ id: "departure-1" }),
      })
    );

    const query = findUnique.mock.calls[0]?.[0] as {
      include: { bookings: Record<string, unknown> };
    };
    expect.soft(query.include.bookings).not.toHaveProperty("where");

    expect.soft(screen.queryByText("Amina Mohamed")).toBeInTheDocument();
    expect.soft(screen.queryByText("Daniel Reynolds")).toBeInTheDocument();
    expect.soft(screen.queryByText("INQUIRY")).toBeInTheDocument();
    expect.soft(screen.queryByText("CONFIRMED")).toBeInTheDocument();
    expect.soft(screen.queryByText("2 climbers")).toBeInTheDocument();
    expect.soft(screen.queryByText("3 climbers")).toBeInTheDocument();

    expect
      .soft(screen.queryByRole("link", { name: /Amina Mohamed/ }))
      .toHaveAttribute("href", "/admin/bookings/booking-inquiry");
    expect
      .soft(screen.queryByRole("link", { name: /Daniel Reynolds/ }))
      .toHaveAttribute("href", "/admin/bookings/booking-confirmed");

    expect
      .soft(screen.getByRole("heading", { name: /Current Bookings/ }))
      .toHaveTextContent("Current Bookings (3 / 8 spots)");

    const formProps = departureFormMock.mock.calls[0]?.[0] as
      | {
          bookedSpots?: number;
          departure?: { earlyBirdPrice?: number | null };
        }
      | undefined;
    expect.soft(formProps).toEqual(expect.objectContaining({ bookedSpots: 3 }));
    expect.soft(formProps?.departure).toEqual(
      expect.objectContaining({ earlyBirdPrice: 0 })
    );
  });
});
