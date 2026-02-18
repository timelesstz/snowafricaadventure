import Image from "next/image";

interface ImageTextBlockProps {
  sectionLabel: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  layout: string;
  bgColor: string;
}

export function ImageTextBlock({
  sectionLabel,
  heading,
  body,
  image,
  imageAlt,
  layout,
  bgColor,
}: ImageTextBlockProps) {
  const bgClass = bgColor === "surface" ? "bg-[var(--surface)]" : bgColor === "muted" ? "bg-[var(--muted)]" : "";
  const isReversed = layout === "image-right";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? "" : "md:[&>*:first-child]:order-2"}`}>
          <div>
            {sectionLabel && (
              <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider mb-2">
                {sectionLabel}
              </span>
            )}
            {heading && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {heading}
              </h2>
            )}
            {body && (
              <div
                className="text-[var(--text-muted)] text-lg leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            {image ? (
              <Image
                src={image}
                alt={imageAlt || heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                No image
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

ImageTextBlock.defaultProps = {
  sectionLabel: "",
  heading: "Section Heading",
  body: "<p>Add your content here.</p>",
  image: "",
  imageAlt: "",
  layout: "image-right",
  bgColor: "none",
};
