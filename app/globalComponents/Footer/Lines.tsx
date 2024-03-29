"use client";

import { FC } from "react";
import { ThemeColors, ThemeMode, useThemeStore } from "../../../utils/store";

const Lines: FC = () => {
  const { activeTheme } = useThemeStore();

  const theme =
    activeTheme === ThemeMode.Dark ? ThemeColors.Dark : ThemeColors.Light;

  return (
    <svg viewBox="0 0 1400 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1400 1.00012L0 1V0.5L1400 0.500122V1.00012ZM1400 4.00012L0 4V3.00006L1400 3.00018V4.00012ZM0 9L1400 9.00012V6.00018L0 6.00006V9ZM1400 18.0001L0 18V11.0001L1400 11.0002V18.0001ZM0 35.0005L1400 35.0006V20.0007L0 20.0005V35.0005ZM1400 65.0006L0 65.0005L2.44784e-06 37.0005L1400 37.0007V65.0006ZM0 118L1400 118.001V67.0007L4.45856e-06 67.0005L0 118Z"
        fill={theme}
      />
    </svg>
  );
};

export default Lines;
