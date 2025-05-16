"use client";

import React, { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAnimationStore } from "../../../../../utils/store";

type WeatherProps = {
  temp: number;
  weather: string;
};

const Weather: FC<WeatherProps> = ({ temp, weather }) => {
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

  useEffect(() => {
    const weatherWidth = weatherRef.current?.offsetWidth;
    const weatherHeight = weatherRef.current?.offsetHeight;
    if (weatherWidth && weatherScopeRef.current) {
      weatherScopeRef.current.style.width = `${weatherWidth}px`;
      weatherScopeRef.current.style.height = `${weatherHeight}px`;
    }
  }, []);

  if (!weather) return;
  const temperature = Math.round(temp);

  return (
    <div
      ref={weatherScopeRef}
      className="relative flex h-[12px] items-center justify-center overflow-hidden sm:h-[18px]"
    >
      <span
        ref={weatherRef}
        className="absolute top-0 right-0 left-0 mr-auto flex w-fit gap-1 lowercase"
      >
        <span className="text-sm sm:text-lg">{temperature}°</span>
        <span className="text-sm capitalize sm:text-lg">{weather}</span>
      </span>
    </div>
  );
};
export default Weather;
