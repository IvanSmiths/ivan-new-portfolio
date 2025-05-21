"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents({} = {}) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

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

    let filteredItems = [...items];

    // Filter out the first h1 and h2 as they are in the Hero section
    const firstH1Index = filteredItems.findIndex((item) => item.level === 1);
    if (firstH1Index !== -1) {
      filteredItems.splice(firstH1Index, 1);
    }

    const firstH2Index = filteredItems.findIndex((item) => item.level === 2);
    if (firstH2Index !== -1) {
      filteredItems.splice(firstH2Index, 1);
    }

    setHeadings(filteredItems);

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

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return {
    headings,
    activeId,
    scrollToHeading,
  };
}
