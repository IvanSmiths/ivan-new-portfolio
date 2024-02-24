"use client";

import Header from "./Header";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

function Loader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(revealRef.current, {
        translateX: 0,
      });
      tl.to(imageRef.current, {
        translateX: 0,
      });
      tl.to(imageRef.current, {
        translateX: 0,
      });
      tl.to(containerRef.current, {
        display: "none",
      });
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="fixed w-full h-full top-0 left-0 bg-secondary z-20"
    >
      <div ref={revealRef}></div>
      <div ref={imageRef} className="w-full">
        <Header />
      </div>
    </div>
  );
}

export default Loader;
