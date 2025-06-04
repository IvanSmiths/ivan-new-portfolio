"use client";

import { useEffect, useRef } from "react";
import Header from "../Hero/TopHero/Header";
import { useOverlayStore } from "../../../utils/stores/overlay";
import { useLoader } from "../../../utils/hooks/animations/useLoader";

const Loader = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faderRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { hide } = useOverlayStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timeoutId = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useLoader({ containerRef, faderRef, imageRef }, { onHide: hide });

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
