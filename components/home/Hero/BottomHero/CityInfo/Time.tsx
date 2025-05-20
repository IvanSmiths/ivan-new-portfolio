"use client";

import { FC, useEffect, useRef, useState } from "react";
import { dm_mono } from "../../../../../utils/fonts";
import { useTextSwap } from "../../../../../utils/hooks/animations/useTextSwap";

const Time: FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const timeRef = useRef<HTMLSpanElement | null>(null);

  useTextSwap(timeRef, currentTime, "");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      const time = today.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Rome",
      });
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      ref={timeRef}
      className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
    >
      {currentTime}
    </span>
  );
};

export default Time;
