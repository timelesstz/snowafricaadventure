import Image from "next/image";

export type GalleryAltMap = Record<string, { alt?: string; caption?: string }> | null | undefined;

interface PublicGalleryProps {
  title?: string;
  subtitle?: string;
  images: string[];
  alts?: GalleryAltMap;
  fallbackAltPrefix?: string;
  className?: string;
  sectionId?: string;
}

export function PublicGallery({
  title = "Gallery",
  subtitle,
  images,
  alts,
  fallbackAltPrefix,
  className,
  sectionId = "gallery",
}: PublicGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section
      id={sectionId}
      className={`py-16 bg-white ${className ?? ""}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[var(--surface)] rounded-xl flex items-center justify-center text-[var(--secondary)]">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--primary)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-[var(--text-muted)] mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, index) => {
            const meta = alts?.[img];
            const alt = meta?.alt || (fallbackAltPrefix ? `${fallbackAltPrefix} - Photo ${index + 1}` : `Photo ${index + 1}`);
            const caption = meta?.caption;
            const isLead = index === 0;
            return (
              <figure
                key={`${img}-${index}`}
                className={`relative overflow-hidden rounded-xl ${
                  isLead
                    ? "col-span-2 row-span-2 h-[300px] md:h-[400px]"
                    : "h-[180px] md:h-[200px]"
                }`}
              >
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes={isLead ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />
                {caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm px-3 py-2">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
