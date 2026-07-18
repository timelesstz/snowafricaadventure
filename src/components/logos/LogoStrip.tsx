import Image from "next/image";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type LogoPlacement = "homepage" | "about" | "footer";

/**
 * Visual treatments, one per surface the strip appears on. These reproduce the
 * styling each surface used before logos moved into the database.
 *
 * - `inverted` — white-out, for dark backgrounds (homepage strip, footer)
 * - `muted`    — greyscale until hover (About "Our Commitment")
 * - `full`     — full colour with the logo name beneath (About "Trusted by")
 */
export type LogoVariant = "plain" | "inverted" | "muted" | "full";

const VARIANTS: Record<LogoVariant, { img: string; wrap: string; showName: boolean }> = {
  plain: {
    img: "h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity",
    wrap: "flex flex-wrap items-center justify-center gap-8",
    showName: false,
  },
  inverted: {
    img: "h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity",
    wrap: "flex flex-wrap items-center justify-center gap-8 md:gap-12",
    showName: false,
  },
  muted: {
    img: "h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all",
    wrap: "flex flex-wrap items-center justify-center gap-8 md:gap-12",
    showName: false,
  },
  full: {
    img: "h-16 md:h-20 w-auto object-contain",
    wrap: "flex flex-wrap items-start justify-center gap-10 md:gap-16",
    showName: true,
  },
};

const getLogos = cache(async function getLogos(placement: LogoPlacement) {
  try {
    return await prisma.logo.findMany({
      where: { isActive: true, placements: { has: placement } },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: { id: true, name: true, image: true, linkUrl: true },
    });
  } catch (error) {
    console.error("[LogoStrip] Failed to fetch logos:", error);
    return [];
  }
});

/** True when at least one active logo is assigned to this placement. Lets a
 *  page hide an entire section (heading, intro copy) rather than render an
 *  empty strip. Shares LogoStrip's per-request cache, so it costs no extra query. */
export async function hasLogos(placement: LogoPlacement): Promise<boolean> {
  return (await getLogos(placement)).length > 0;
}

export async function LogoStrip({
  placement,
  variant = "muted",
  className = "",
}: {
  placement: LogoPlacement;
  variant?: LogoVariant;
  className?: string;
}) {
  const logos = await getLogos(placement);
  if (logos.length === 0) return null;

  const style = VARIANTS[variant];

  return (
    <div className={`${style.wrap} ${className}`.trim()}>
      {logos.map((logo) => {
        const img = (
          <Image
            src={logo.image}
            alt={logo.name}
            width={160}
            height={80}
            className={style.img}
          />
        );

        return (
          <div key={logo.id} className="flex flex-col items-center gap-2">
            {logo.linkUrl ? (
              <a
                href={logo.linkUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={logo.name}
              >
                {img}
              </a>
            ) : (
              img
            )}
            {style.showName && (
              <span className="text-xs text-[var(--text-muted)] text-center max-w-[10rem]">
                {logo.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LogoStrip;
