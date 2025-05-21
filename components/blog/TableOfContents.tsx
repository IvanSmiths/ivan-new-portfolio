"use client";

import { useTableOfContents } from "../../utils/hooks/useTableOfContents";

export default function TableOfContents() {
  const { headings, activeId } = useTableOfContents({});

  if (headings.length === 0) {
    return null;
  }

  return (
    <section className="sticky top-24 right-8 max-h-[calc(100vh-120px)] w-64 overflow-y-auto">
      <span className="mb-4 text-lg font-semibold">Table of Contents</span>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block border-l-2 py-1 pl-2 text-sm transition-colors hover:text-blue-600 ${
                activeId === heading.id
                  ? "border-blue-500 font-medium text-blue-500"
                  : "border-gray-200 text-gray-600"
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
    </section>
  );
}
