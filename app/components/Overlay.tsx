"use client";

import React, { FC } from "react";
import { useOverlayStore } from "../../utils/store";

const Overlay: FC = () => {
  const { isHidden } = useOverlayStore();
  console.log(isHidden);
  return (
    <div
      className={`z-50 bg-gray-50 ${isHidden ? "" : "hidden"} fixed w-full h-full top-0 left-0`}
    ></div>
  );
};

export default Overlay;
