import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";

const { push, refresh, toastWarning, toastError } = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  toastWarning: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: toastError, warning: toastWarning },
}));

import { DepartureForm } from "@/components/admin/departures/DepartureForm";

const routes = [
  {
    id: "route_1",
    title: "Machame Route",
    slug: "machame-route",
    duration: "7 days",
    durationDays: 7,
  },
];

type Departure = NonNullable<ComponentProps<typeof DepartureForm>["departure"]>;

const baseDeparture: Departure = {
  id: "dep_1",
  routeId: "route_1",
  arrivalDate: "2027-01-01",
  startDate: "2027-01-02",
  summitDate: "2027-01-07",
  endDate: "2027-01-08",
  price: 2695,
  currency: "USD",
  earlyBirdPrice: null,
  earlyBirdUntil: "",
  minParticipants: 2,
  maxParticipants: 10,
  isFullMoon: false,
  isGuaranteed: false,
  isFeatured: false,
  isManuallyFeatured: false,
  excludeFromRotation: false,
  status: "OPEN",
  internalNotes: "",
  publicNotes: "",
};

const fetchMock = vi.fn();

function renderEdit(overrides: Partial<Departure> = {}) {
  return render(
    <DepartureForm
      departure={{ ...baseDeparture, ...overrides }}
      routes={routes}
      mode="edit"
    />
  );
}

async function submitEdit() {
  fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  return JSON.parse(fetchMock.mock.calls[0][1].body);
}

describe("DepartureForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: "dep_1" }),
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("preserves and submits zero regular and early-bird prices", async () => {
    renderEdit({ price: 0, earlyBirdPrice: 0 });

    expect(screen.getByLabelText(/Price \(USD\)/)).toHaveValue(0);
    expect(screen.getByLabelText("Early Bird Price")).toHaveValue(0);

    const body = await submitEdit();
    expect(body.price).toBe(0);
    expect(body.earlyBirdPrice).toBe(0);
  });

  it("supports decimal regular and early-bird prices", async () => {
    renderEdit();
    const price = screen.getByLabelText(/Price \(USD\)/);
    const earlyBirdPrice = screen.getByLabelText("Early Bird Price");

    expect(price).toHaveAttribute("step", "0.01");
    expect(earlyBirdPrice).toHaveAttribute("step", "0.01");

    fireEvent.change(price, { target: { value: "2695.50" } });
    fireEvent.change(earlyBirdPrice, { target: { value: "1999.99" } });
    const body = await submitEdit();
    expect(body.price).toBe(2695.5);
    expect(body.earlyBirdPrice).toBe(1999.99);
  });

  it("preserves zero minimum and maximum participant values", () => {
    renderEdit({ minParticipants: 0, maxParticipants: 0 });

    expect(screen.getByLabelText("Minimum Participants")).toHaveValue(0);
    expect(screen.getByLabelText("Maximum Participants")).toHaveValue(0);
  });

  it("marks all trek date inputs and labels as required", () => {
    renderEdit();

    for (const label of [
      /Arrival Date \(Day 0\)/,
      /Trek Start \(Day 1\)/,
      /Summit Date/,
      /Trek End Date/,
    ]) {
      const input = screen.getByLabelText<HTMLInputElement>(label);
      expect(input).toBeRequired();
      expect(input.labels?.[0]?.textContent).toContain("*");
    }
  });

  it("only offers cancelled status for an already-cancelled departure", () => {
    const { rerender } = renderEdit({ status: "CANCELLED" });
    expect(screen.getByRole("option", { name: "Cancelled" })).toHaveValue(
      "CANCELLED"
    );
    expect(
      screen.getByRole("checkbox", { name: /Manual Feature/ })
    ).toBeDisabled();

    rerender(
      <DepartureForm
        departure={{ ...baseDeparture, status: "OPEN" }}
        routes={routes}
        mode="edit"
      />
    );
    expect(screen.queryByRole("option", { name: "Cancelled" })).not.toBeInTheDocument();
    expect(
      screen.getByText(/separate Switch off departure action/i)
    ).toBeInTheDocument();
  });

  it("prevents reducing capacity below booked spots", () => {
    render(
      <DepartureForm
        departure={baseDeparture}
        routes={routes}
        mode="edit"
        bookedSpots={6}
      />
    );

    expect(screen.getByLabelText("Maximum Participants")).toHaveAttribute(
      "min",
      "6"
    );
  });

  it("shows the first validation issue instead of the generic API error", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Validation failed",
        issues: [
          { message: "End date must be after the start date" },
          { message: "A later issue" },
        ],
      }),
    });
    renderEdit();

    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "End date must be after the start date"
    );
    expect(toastError).toHaveBeenCalledWith(
      "End date must be after the start date"
    );
  });

  it("shows the fallback error for a non-JSON error response", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("Unexpected end of JSON input");
      },
    });
    renderEdit();

    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to save departure"
    );
    expect(toastError).toHaveBeenCalledWith("Failed to save departure");
  });

  it("surfaces a successful response warning", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "dep_1",
        warning: "Saved, but the public page could not be refreshed",
      }),
    });
    renderEdit();

    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() =>
      expect(toastWarning).toHaveBeenCalledWith(
        "Saved, but the public page could not be refreshed"
      )
    );
    expect(push).toHaveBeenCalledWith("/admin/departures");
  });
});
