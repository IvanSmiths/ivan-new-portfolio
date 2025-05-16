"use client";

import { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimationStore } from "../../../../../utils/store";
import { dm_mono } from "../../../../../utils/fonts";

const Time: FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const timeRef = useRef<HTMLSpanElement | null>(null);
  const timeScopeRef = useRef<HTMLDivElement | null>(null);

  const { normal } = useAnimationStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      const time = today.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Rome",
      });
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useGSAP(
    () => {
      gsap
        .timeline()
        .to(timeRef.current, {
          opacity: 0,
          top: 20,
          duration: normal,
          ease: "circ.out",
        })
        .set(timeRef.current, { top: 0 })
        .to(timeRef.current, {
          opacity: 0,
          top: -20,
          duration: normal,
          ease: "circ.out",
        })
        .to(timeRef.current, {
          opacity: 1,
          top: 0,
          duration: normal,
          ease: "circ.out",
        });
    },
    { dependencies: [currentTime], scope: timeScopeRef },
  );

  return (
    <div
      ref={timeScopeRef}
      className="relative block h-[20px] w-[93px] overflow-hidden sm:h-[16px]"
    >
      <span
        className={`text-foreground-muted ${dm_mono.className} absolute top-0 right-0 bottom-0 left-0 mr-auto w-fit text-xs uppercase`}
        ref={timeRef}
      >
        {currentTime}
      </span>
    </div>
  );
};

export default Time;
