import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import { useRef } from "react";

export const useRouteTransition = () => {
  const router = useRouter();
  const nodeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useGSAP(
    () => {
      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          t.kill();
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [router.pathname]
    }
  );

  const handleEnter = () => {
    if (!nodeRef.current) return;
    window.scrollTo(0, 0);

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
        // Remove all GSAP-applied styles so the stacking context is reset
        gsap.set(nodeRef.current, { clearProps: "all" });
        ScrollTrigger.refresh();
      }
    });
  };

  const handleExit = () => {
    if (!nodeRef.current) return;

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
