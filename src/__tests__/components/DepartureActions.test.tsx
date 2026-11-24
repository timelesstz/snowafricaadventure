import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const { push, refresh, toastWarning } = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  toastWarning: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: toastWarning },
}));

import { DepartureActions } from "@/components/admin/departures/DepartureActions";

const fetchMock = vi.fn();

describe("DepartureActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: "dep_1" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = false;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("requires at least five non-space characters before switching off", async () => {
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch off departure" })
    );
    fireEvent.change(screen.getByLabelText("Switch-off reason"), {
      target: { value: " no " },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm switch off" })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /at least 5 characters/i
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits a trimmed switch-off reason and redirects", async () => {
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch off departure" })
    );
    fireEvent.change(screen.getByLabelText("Switch-off reason"), {
      target: { value: "  Minimum numbers were not reached  " },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm switch off" })
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/admin/departures/dep_1");
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body)).toEqual({
      status: "CANCELLED",
      reason: "Minimum numbers were not reached",
    });
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/admin/departures")
    );
  });

  it("keeps the dialog and reason after a server error", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Permission denied" }),
    });
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete departure" }));
    fireEvent.change(screen.getByLabelText("Deletion reason"), {
      target: { value: "Created in error" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm deletion" })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Permission denied"
    );
    expect(screen.getByLabelText("Deletion reason")).toHaveValue(
      "Created in error"
    );
  });

  it("prevents Escape from dismissing the dialog while submitting", async () => {
    let resolveRequest!: (value: {
      ok: boolean;
      json: () => Promise<{ id: string }>;
    }) => void;
    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch off departure" })
    );
    fireEvent.change(screen.getByLabelText("Switch-off reason"), {
      target: { value: "Minimum numbers were not reached" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm switch off" })
    );

    const dialog = screen.getByRole("dialog");
    expect(
      fireEvent(dialog, new Event("cancel", { cancelable: true }))
    ).toBe(false);
    expect(
      screen.getByRole("button", { name: "Confirm switch off" })
    ).toBeDisabled();
    expect(dialog).toHaveAttribute("open");

    resolveRequest({ ok: true, json: async () => ({ id: "dep_1" }) });
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/admin/departures")
    );
  });

  it("shows an action error for a non-JSON server response", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("Unexpected end of JSON input");
      },
    });
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete departure" }));
    fireEvent.change(screen.getByLabelText("Deletion reason"), {
      target: { value: "Created in error" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm deletion" })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to delete departure"
    );
  });

  it("shows the first validation issue instead of the generic API error", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Validation failed",
        issues: [
          { message: "Switch-off reason is too short" },
          { message: "A later issue" },
        ],
      }),
    });
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch off departure" })
    );
    fireEvent.change(screen.getByLabelText("Switch-off reason"), {
      target: { value: "Minimum numbers were not reached" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm switch off" })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Switch-off reason is too short"
    );
  });

  it("surfaces a successful response warning", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "dep_1",
        warning: "Switched off, but the public page could not be refreshed",
      }),
    });
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={0} />
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Switch off departure" })
    );
    fireEvent.change(screen.getByLabelText("Switch-off reason"), {
      target: { value: "Minimum numbers were not reached" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Confirm switch off" })
    );

    await waitFor(() =>
      expect(toastWarning).toHaveBeenCalledWith(
        "Switched off, but the public page could not be refreshed"
      )
    );
    expect(push).toHaveBeenCalledWith("/admin/departures");
  });

  it("disables deletion when bookings exist", () => {
    render(
      <DepartureActions departureId="dep_1" status="OPEN" bookingCount={2} />
    );

    expect(
      screen.getByRole("button", { name: "Delete departure" })
    ).toBeDisabled();
    expect(screen.getByText(/switch it off instead/i)).toBeInTheDocument();
  });
});
