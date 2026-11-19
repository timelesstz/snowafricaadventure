import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("@/lib/analytics", () => ({
  trackFormStart: vi.fn(),
  trackFormStep: vi.fn(),
  trackFormSubmit: vi.fn(),
  trackBeginCheckout: vi.fn(),
}));
vi.mock("@/hooks/useFormAbandonment", () => ({ useFormAbandonment: vi.fn() }));
vi.mock("@/lib/client-tracking", () => ({
  collectClientTracking: vi.fn().mockResolvedValue({ gaClientId: null }),
}));

import { GuideQuoteSection } from "@/components/forms/GuideQuoteSection";
import { SITE_CONFIG } from "@/lib/constants";

describe("GuideQuoteSection", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("links WhatsApp to the real business number", () => {
    render(<GuideQuoteSection kind="kilimanjaro" relatedTo="Guide: /kilimanjaro-prices/" />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    const digits = SITE_CONFIG.phone.replace(/\D/g, "");
    expect(link.getAttribute("href")).toBe(`https://wa.me/${digits}`);
    expect(digits).toMatch(/^255\d{9}$/);
  });

  it("sends the guide path with the enquiry so admins see where it came from", async () => {
    const { container } = render(
      <GuideQuoteSection kind="kilimanjaro" relatedTo="Guide: /kilimanjaro-prices/" />
    );
    const form = container.querySelector("form")!;

    // Step 1 (trip) is preselected for a Kilimanjaro guide; step 2 (dates) is optional.
    fireEvent.submit(form);
    fireEvent.submit(form);

    fireEvent.change(await screen.findByLabelText(/name/i), { target: { value: "Amina Hassan" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "amina@example.org" } });
    fireEvent.submit(form);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/inquiries/");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      relatedTo: "Guide: /kilimanjaro-prices/",
      tripType: "Kilimanjaro",
      type: "trekking",
      fullName: "Amina Hassan",
      email: "amina@example.org",
    });
  });

  it("preselects a safari on safari guides", async () => {
    const { container } = render(<GuideQuoteSection kind="safari" relatedTo="Guide: /african-safaris/" />);
    const checked = container.querySelector<HTMLInputElement>('input[name="tripChoice"]:checked');
    expect(checked?.value).toBe("Wildlife Safari");
  });
});
