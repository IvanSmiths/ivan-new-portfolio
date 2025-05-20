import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function useScrollPercentage() {
  const percentRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.set(percentRef.current, { innerText: 0 });
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100);
        if (percentRef.current) {
          gsap.to(percentRef.current, {
            innerText: progress,
            duration: 0.2,
            ease: "power1.out",
            snap: "innerText",
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  // call ScrollTrigger.refresh to refresh the end/start position when route changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return { percentRef };
}
