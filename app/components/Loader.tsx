"use client";

import Header from "./Header";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function Loader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faderRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function timeoutId() {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 3000);
    }

    timeoutId();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(imageRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
      });
      tl.to(imageRef.current, {
        width: "100%",
        ease: "back.in(1)",
        duration: 1,
      });
      tl.to(imageRef.current, {
        margin: 0,
        top: 0,
        duration: 1,
        ease: "back.inOut(1)",
      });
      tl.to(containerRef.current, {
        display: "none",
      });
      tl.to(faderRef.current, {
        opacity: 0,
        duration: 1,
      });
      tl.to(faderRef.current, {
        display: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <div
        ref={faderRef}
        className="absolute w-full h-[55%] bottom-0 left-0 bg-secondary z-20"
      ></div>
      <div
        ref={containerRef}
        className="fixed w-full h-full top-0 left-0 bg-secondary z-20"
      >
        <div
          ref={imageRef}
          className="w-1/4 h-fit inline opacity-0 absolute mx-auto my-auto inset-0"
        >
          <Header />
        </div>
      </div>
    </>
  );
}

export default Loader;
