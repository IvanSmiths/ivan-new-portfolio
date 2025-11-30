"use client";

import { FC } from "react";
import { useOverlayStore } from "../../../utils/stores/overlay";

const Overlay: FC = () => {
  const { isHidden } = useOverlayStore();
  return (
    <div
      className={`bg-background z-50 ${isHidden ? "" : "hidden"} fixed top-0 left-0 h-full w-full`}
    ></div>
  );
};

export default Overlay;
