"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    const items = elements.map((element) => {
      const level = parseInt(element.tagName[1]);
      return {
        id: element.id,
        text: element.textContent || "",
        level: level,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <nav className="toc fixed top-24 right-8 max-h-[calc(100vh-120px)] w-64 overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold">Table of Contents</h2>
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
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
