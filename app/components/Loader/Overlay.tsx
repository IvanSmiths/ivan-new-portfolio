"use client";

import React, { FC } from "react";
import { useOverlayStore } from "../../../utils/store";

const Overlay: FC = () => {
  const { isHidden } = useOverlayStore();
  return (
    <div
      className={`z-50 bg-gray-50 ${isHidden ? "" : "hidden"} fixed left-0 top-0 h-full w-full`}
    ></div>
  );
};

export default Overlay;
