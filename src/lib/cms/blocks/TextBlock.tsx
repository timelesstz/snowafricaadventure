interface TextBlockProps {
  sectionLabel: string;
  heading: string;
  body: string;
  textAlign: string;
  bgColor: string;
}

export function TextBlock({ sectionLabel, heading, body, textAlign, bgColor }: TextBlockProps) {
  const bgClass = bgColor === "surface" ? "bg-[var(--surface)]" : bgColor === "muted" ? "bg-[var(--muted)]" : "";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl ${textAlign === "center" ? "mx-auto text-center" : ""}`}>
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
      </div>
    </section>
  );
}

TextBlock.defaultProps = {
  sectionLabel: "",
  heading: "Section Heading",
  body: "<p>Add your content here. HTML is supported.</p>",
  textAlign: "center",
  bgColor: "none",
};
