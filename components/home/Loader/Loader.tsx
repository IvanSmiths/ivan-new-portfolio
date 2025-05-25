"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FC, useEffect, useRef } from "react";
import { useOverlayStore } from "../../../utils/stores/overlay";
import Header from "../Hero/TopHero/Header";

const Loader: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faderRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { hide } = useOverlayStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timeoutId = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(imageRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        onStart: () => hide(),
      });
      tl.to(imageRef.current, {
        margin: 0,
        top: 0,
        duration: 1.5,
        ease: "power4.inOut",
      });
      tl.to(containerRef.current, {
        display: "none",
      });
      tl.to(faderRef.current, {
        opacity: 0,
        duration: 0.6,
      });
      tl.to(faderRef.current, {
        display: "none",
      });
    },
    { scope: containerRef, dependencies: [hide] },
  );

  return (
    <>
      <div
        ref={faderRef}
        className="bg-background absolute bottom-0 left-0 z-10 h-full w-full"
      ></div>
      <div
        ref={containerRef}
        className="bg-background fixed top-0 left-0 z-20 h-full w-full"
      >
        <div
          ref={imageRef}
          className="px-sm pt-sm md:pt-xl absolute inset-0 z-20 mx-auto my-auto h-fit w-full opacity-0 blur-2xl"
        >
          <Header />
        </div>
      </div>
    </>
  );
};

export default Loader;
