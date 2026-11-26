import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("@/lib/analytics", () => ({
  trackFormStart: vi.fn(),
  trackFormSubmit: vi.fn(),
  trackBeginCheckout: vi.fn(),
}));
vi.mock("@/hooks/useFormAbandonment", () => ({ useFormAbandonment: vi.fn() }));
vi.mock("@/lib/client-tracking", () => ({
  collectClientTracking: vi.fn().mockResolvedValue({ gaClientId: null }),
}));
vi.mock("@/components/social/ShareButtons", () => ({
  PostSubmissionShare: () => null,
}));

import { InquiryForm } from "@/components/forms/InquiryForm";

const renewFormToken = vi.fn();
vi.mock("@/hooks/useFormGuard", () => ({
  useFormGuard: () => ({
    getGuardFields: async () => ({ formToken: "test-form-token", turnstileToken: "test-turnstile" }),
    renewFormToken,
    turnstileRef: () => {},
  }),
}));

const heroProps = {
  variant: "hero" as const,
  relatedTo: "8 Days Lemosho Route",
  tripType: "Kilimanjaro",
  heroTitle: "Get your free climb quote",
};

function fillRequired(container: HTMLElement) {
  const form = container.querySelector('[data-form-id="inquiry-hero"]')!;
  fireEvent.change(form.querySelector('input[name="fullName"]')!, { target: { value: "Amina Hassan" } });
  fireEvent.change(form.querySelector('input[name="email"]')!, { target: { value: "amina@example.org" } });
  return form as HTMLFormElement;
}

describe("InquiryForm hero variant (route page lead capture)", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows only the short lead fields, no invite or referral extras", () => {
    const { container } = render(<InquiryForm {...heroProps} />);
    expect(screen.getByRole("heading", { name: "Get your free climb quote" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toBeRequired();
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.getByLabelText(/Climbers/)).toBeInTheDocument();
    expect(container.querySelector('[name="country"]')).toBeNull();
    expect(container.querySelector('[name="additionalInfo"]')).toBeNull();
    expect(container.querySelector('[name="referralSource"]')).toBeNull();
    expect(screen.queryByText(/invite/i)).toBeNull();
  });

  it("keeps field ids unique when the hero and full forms share a page", () => {
    const { container } = render(
      <>
        <InquiryForm {...heroProps} />
        <InquiryForm variant="full" relatedTo="8 Days Lemosho Route" tripType="Kilimanjaro" />
      </>
    );
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    container.querySelectorAll("label[for]").forEach((label) => {
      expect(document.getElementById(label.getAttribute("for")!)).not.toBeNull();
    });
  });

  it("posts the lead to /api/inquiries/ tagged with the route and shows success", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const { container } = render(<InquiryForm {...heroProps} />);
    fireEvent.submit(fillRequired(container));

    await waitFor(() => expect(screen.getByText("Thank You!")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/inquiries/");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ formToken: "test-form-token", turnstileToken: "test-turnstile" });
    expect(body).toMatchObject({
      fullName: "Amina Hassan",
      email: "amina@example.org",
      relatedTo: "8 Days Lemosho Route",
      type: "Kilimanjaro",
      numAdults: "2",
      website: "",
    });
  });

  it("shows the API error and keeps the form when the server rejects it", async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({ message: "Too many requests" }) });
    const { container } = render(<InquiryForm {...heroProps} />);
    fireEvent.submit(fillRequired(container));

    expect(await screen.findByRole("alert")).toHaveTextContent("Too many requests");
    expect(screen.getByRole("button", { name: "Get My Free Quote" })).toBeEnabled();
  });
});
