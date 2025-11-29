"use client";

import { useScrollPercentage } from "../../../utils/hooks/animations/useScrollPercentage";
import { dm_mono } from "../../../utils/style/fonts/fonts";

const ScrollPercentage = () => {
  const { percentRef } = useScrollPercentage();

  return (
    <div
      className={`absolute text-xs md:right-52 lg:right-72 ${dm_mono.className}`}
    >
      [<span ref={percentRef}></span>]
    </div>
  );
};

export default ScrollPercentage;
