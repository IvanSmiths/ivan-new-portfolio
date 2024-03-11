"use client";

import React, { FC, useEffect, useRef } from "react";
import { useAnimationStore } from "../../utils/store";
import { gsap } from "gsap";

type WeatherProps = {
  temp: number;
  weather: string;
};

const Weather: FC = ({ temp, weather }: WeatherProps) => {
  const weatherScopeRef = useRef<HTMLDivElement | null>(null);
  const weatherRef = useRef<HTMLSpanElement | null>(null);
  const { normal } = useAnimationStore();

  useEffect((): void => {
    if (weather) {
      const scope = gsap.context(() => {
        gsap
          .timeline()
          .set(weatherRef.current, { opacity: 0 })
          .to(weatherRef.current, {
            opacity: 0,
            top: 20,
            duration: normal,
            ease: "circ.out",
          })
          .set(weatherRef.current, { top: 0 })
          .to(weatherRef.current, {
            opacity: 0,
            top: -20,
            duration: normal,
            ease: "circ.out",
          })
          .to(weatherRef.current, {
            opacity: 1,
            top: 0,
            duration: normal,
            ease: "circ.out",
          });
        return () => scope.revert();
      }, weatherScopeRef);
    }
  }, [normal, weather]);

  if (!weather) return;
  const temperature = Math.round(temp);

  return (
    <div
      ref={weatherScopeRef}
      className="relative overflow-hidden w-[100px] h-7"
    >
      <span
        ref={weatherRef}
        className="lowercase w-fit absolute mr-auto top-0 left-0 right-0"
      >
        {temperature}° {weather}
      </span>
    </div>
  );
};
export default Weather;
