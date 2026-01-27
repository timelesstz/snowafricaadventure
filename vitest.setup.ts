import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock Next.js image
vi.mock("next/image", () => ({
  default: vi.fn().mockImplementation(({ src, alt, ...props }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    Object.assign(img, props);
    return img;
  }),
}));

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
