import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useScrollPercentage() {
  const percentRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;

      // disable if the page is not scrollable
      if (maxScroll <= 5) return 0;
      if (scrollTop + windowHeight >= documentHeight - 5) return 100;
      return Math.max(
        0,
        Math.min(100, Math.round((scrollTop / maxScroll) * 100)),
      );
    };

    const updatePercentage = () => {
      if (percentRef.current) {
        percentRef.current.innerText = calculateScrollPercentage().toString();
      }
    };
    updatePercentage();
    window.addEventListener("scroll", updatePercentage, { passive: true });
    window.addEventListener("resize", updatePercentage, { passive: true });
    return () => {
      window.removeEventListener("scroll", updatePercentage);
      window.removeEventListener("resize", updatePercentage);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return { percentRef };
}
