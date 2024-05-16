"use client";

import { FC, MouseEventHandler } from "react";
import {
  ThemeColors,
  ThemeMode,
  useIconDimensionStore,
  useThemeStore,
} from "../../../../../utils/store";

type ResizeProps = {
  handleMouseDown: MouseEventHandler<HTMLDivElement>;
};
const Resize: FC<ResizeProps> = ({ handleMouseDown }) => {
  const { activeTheme } = useThemeStore();
  const { regular } = useIconDimensionStore();

  const theme =
    activeTheme === ThemeMode.Dark ? ThemeColors.Light : ThemeColors.Dark;

  return (
    <div
      onMouseDown={handleMouseDown}
      className="absolute bottom-0 right-0 cursor-nw-resize p-2 transition-all duration-200 hover:scale-125"
    >
      <svg
        className="rotate-45"
        width={regular}
        height={regular}
        viewBox="0 0 20 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 8L0 4L4 0L5.425 1.4L3.825 3H14.175L12.6 1.4L14 0L18 4L14 8L12.6 6.6L14.175 5H3.825L5.4 6.6L4 8Z"
          fill={theme}
        />
      </svg>
    </div>
  );
};
export default Resize;
