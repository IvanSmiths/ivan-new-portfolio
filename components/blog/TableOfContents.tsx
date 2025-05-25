"use client";

import { useTableOfContents } from "../../utils/hooks/useTableOfContents";

export default function TableOfContents() {
  const { headings, activeId } = useTableOfContents({});

  if (headings.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="top-2xl p-sm border-background-muted sticky right-8 hidden max-h-[calc(100vh-80px)] w-64 border lg:block">
        <span className="text-sm">In this page:</span>
        <ul className="pt-sm space-y-2">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`hover:text-foreground block border-l-1 pl-2 text-sm transition-colors ${
                  activeId === heading.id
                    ? "text-foreground border-foreground"
                    : "border-foreground-muted text-foreground-muted"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.pageYOffset - 50;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
