"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content-processor";

interface ArticleTocProps {
  items: TocItem[];
}

/**
 * Sidebar table of contents. Lists the article's sections (h2). Posts with
 * fewer than two sections fall back to their subheadings, so short posts
 * still get a useful list. Highlights the section in view.
 */
export function ArticleToc({ items }: ArticleTocProps) {
  const sections = items.filter((i) => i.level === 2);
  const list = sections.length >= 2 ? sections : items.filter((i) => i.level === 3);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = list
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
    // list is derived from items; re-run only when the items change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (list.length === 0) return null;

  return (
    <nav aria-labelledby="toc-heading" className="flex min-h-0 flex-col rounded-2xl border border-[var(--border)] bg-white p-5">
      <p
        id="toc-heading"
        className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]"
      >
        In this article
      </p>
      <ol className="min-h-0 max-h-[26rem] space-y-0.5 overflow-y-auto overscroll-contain border-l border-[var(--border)]">
        {list.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] ${
                  active
                    ? "border-[var(--secondary)] font-medium text-[var(--text)]"
                    : "border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:text-[var(--text)]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
