"use client";

import { useScrollPercentage } from "../../../utils/hooks/useScrollPercentage";
import { dm_mono } from "../../../utils/fonts";

const ScrollPercentage = () => {
  const { percentRef } = useScrollPercentage();

  return (
    <div className={`absolute right-96 text-xs ${dm_mono.className}`}>
      [<span ref={percentRef}></span>]
    </div>
  );
};

export default ScrollPercentage;
