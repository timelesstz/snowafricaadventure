import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SidebarCard } from "@/components/tours/SidebarCard";
import { Smile, Car } from "lucide-react";

describe("SidebarCard", () => {
  const mockItems = [
    { icon: Smile, label: "Big Five guaranteed" },
    { icon: Car, label: "Private 4x4 Land Cruiser" },
  ];

  it("should render the title", () => {
    render(<SidebarCard title="Safari Highlights" items={mockItems} />);

    expect(screen.getByText("Safari Highlights")).toBeInTheDocument();
  });

  it("should render all items", () => {
    render(<SidebarCard title="Safari Highlights" items={mockItems} />);

    expect(screen.getByText("Big Five guaranteed")).toBeInTheDocument();
    expect(screen.getByText("Private 4x4 Land Cruiser")).toBeInTheDocument();
  });

  it("should render items with highlight text", () => {
    const itemsWithHighlight = [
      { icon: Smile, label: "Migration in Serengeti", highlight: "Jun-Oct:" },
    ];

    render(<SidebarCard title="Best Time to Visit" items={itemsWithHighlight} />);

    expect(screen.getByText("Jun-Oct:")).toBeInTheDocument();
    expect(screen.getByText("Migration in Serengeti")).toBeInTheDocument();
  });

  it("should render icons for each item", () => {
    render(<SidebarCard title="Safari Highlights" items={mockItems} />);

    // Check that there are SVG elements (Lucide icons render as SVGs)
    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBe(mockItems.length);
  });
});
