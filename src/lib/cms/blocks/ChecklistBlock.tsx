import { Check } from "lucide-react";

interface ChecklistBlockProps {
  sectionLabel: string;
  heading: string;
  items: string[];
  columns: number;
  bgColor: string;
}

export function ChecklistBlock({ sectionLabel, heading, items, columns, bgColor }: ChecklistBlockProps) {
  const bgClass = bgColor === "surface" ? "bg-[var(--surface)]" : bgColor === "muted" ? "bg-[var(--muted)]" : "";
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {sectionLabel && (
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            {sectionLabel}
          </span>
        )}
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
          {heading}
        </h2>
        <div className={`grid ${colClass} gap-4 max-w-4xl mx-auto`}>
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[var(--border)] shadow-sm"
            >
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[var(--text)]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ChecklistBlock.defaultProps = {
  sectionLabel: "",
  heading: "What's Included",
  items: ["Item one", "Item two", "Item three", "Item four", "Item five", "Item six"],
  columns: 3,
  bgColor: "surface",
};
