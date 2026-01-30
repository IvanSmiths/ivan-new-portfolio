import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

export const useRouteTransition = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const killAllScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((t) => {
      t.kill(true);
    });
    ScrollTrigger.clearMatchMedia();
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  killAllScrollTriggers();

  const handleEnter = () => {
    if (!nodeRef.current) return;
    document.documentElement.classList.remove("route-transitioning");
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    gsap.set(nodeRef.current, {
      y: 80,
      scale: 0.95,
      autoAlpha: 0
    });

    gsap.to(nodeRef.current, {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(nodeRef.current, { clearProps: "all" });
        ScrollTrigger.refresh();
      }
    });
  };

  const handleExit = () => {
    if (!nodeRef.current) return;
    document.documentElement.classList.add("route-transitioning");
    killAllScrollTriggers();

    gsap.to(nodeRef.current, {
      y: 40,
      scale: 0.9,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power3.inOut"
    });
  };

  return {
    nodeRef,
    containerRef,
    handleEnter,
    handleExit
  };
};
