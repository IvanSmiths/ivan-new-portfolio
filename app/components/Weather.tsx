"use client";

import React, { FC, useEffect, useRef } from "react";
import { useAnimationStore } from "../../utils/store";
import { gsap } from "gsap";

type WeatherProps = {
  data: any;
};

const Weather: FC = ({ data }: WeatherProps) => {
  const weatherScopeRef = useRef<HTMLDivElement | null>(null);
  const weatherRef = useRef<HTMLSpanElement | null>(null);
  const { durationMedium } = useAnimationStore();

  useEffect((): void => {
    if (data) {
      const scope = gsap.context(() => {
        gsap
          .timeline()
          .set(weatherRef.current, { opacity: 0 })
          .to(weatherRef.current, {
            opacity: 0,
            top: 20,
            duration: durationMedium,
            ease: "circ.out",
          })
          .set(weatherRef.current, { top: 0 })
          .to(weatherRef.current, {
            opacity: 0,
            top: -20,
            duration: durationMedium,
            ease: "circ.out",
          })
          .to(weatherRef.current, {
            opacity: 1,
            top: 0,
            duration: durationMedium,
            ease: "circ.out",
          });
        return () => scope.revert();
      }, weatherScopeRef);
    }
  }, [durationMedium, data]);

  if (!data) return;
  // @ts-ignore
  const temperature = Math.round(data.main.temp);
  // @ts-ignore
  let weather = data.weather[0].main;

  return (
    <div
      ref={weatherScopeRef}
      className="relative overflow-hidden w-[100px] h-[21px]"
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