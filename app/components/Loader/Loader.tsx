"use client";

import Header from "../../components/Hero/Header";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FC, useEffect, useRef } from "react";
import { useAnimationStore, useOverlayStore } from "../../../utils/store";

const Loader: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faderRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { normal, slow } = useAnimationStore();
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
      tl.set(imageRef.current, {
        scale: 0.3,
        // @ts-ignore
        onStart: hide(),
      });
      tl.to(imageRef.current, {
        opacity: 1,
        duration: normal,
      });
      tl.to(imageRef.current, {
        scale: 1,
        ease: "back.inOut(1.3)",
        duration: slow,
      });
      tl.to(imageRef.current, {
        margin: 0,
        top: 0,
        duration: slow,
        ease: "expo.inOut",
      });
      tl.to(containerRef.current, {
        display: "none",
      });
      tl.to(faderRef.current, {
        opacity: 0,
        duration: normal,
      });
      tl.to(faderRef.current, {
        display: "none",
      });
    },
    { scope: containerRef, dependencies: [hide, slow, normal] },
  );

  return (
    <>
      <div
        ref={faderRef}
        className="bg-light dark:bg-dark absolute bottom-0 left-0 z-10 h-full w-full"
      ></div>
      <div
        ref={containerRef}
        className="bg-light dark:bg-dark fixed left-0 top-0 z-20 h-full w-full"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 z-20 mx-auto my-auto h-fit w-full opacity-0"
        >
          <Header />
        </div>
      </div>
    </>
  );
};

export default Loader;
