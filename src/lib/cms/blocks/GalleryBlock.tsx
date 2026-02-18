import Image from "next/image";

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

interface GalleryBlockProps {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  items: GalleryItem[];
  columns: number;
}

export function GalleryBlock({ sectionLabel, heading, subtitle, items, columns }: GalleryBlockProps) {
  const colClass = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {sectionLabel && (
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            {sectionLabel}
          </span>
        )}
        {heading && (
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className={`grid ${colClass} gap-6`}>
          {items.map((item, i) => (
            <div
              key={i}
              className="group bg-white border border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={`(max-width: 768px) 100vw, ${Math.floor(100 / columns)}vw`}
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {(item.title || item.description) && (
                <div className="p-6">
                  {item.title && <h3 className="font-semibold text-lg mb-2">{item.title}</h3>}
                  {item.description && (
                    <p className="text-[var(--text-muted)] text-sm">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

GalleryBlock.defaultProps = {
  sectionLabel: "",
  heading: "Gallery",
  subtitle: "",
  items: [
    { image: "", title: "Item One", description: "Description here" },
    { image: "", title: "Item Two", description: "Description here" },
    { image: "", title: "Item Three", description: "Description here" },
  ],
  columns: 3,
};
