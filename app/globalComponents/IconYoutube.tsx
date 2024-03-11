"use client";

import { FC } from "react";
import { useIconDimensionStore, useThemeStore } from "../../utils/store";

const IconYoutube: FC = () => {
  const { activeTheme } = useThemeStore();
  const { normal } = useIconDimensionStore();
  return (
    <svg
      width={normal}
      height={normal - 10}
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.1636 5.35207C38.7027 3.62639 37.3493 2.27025 35.6272 1.80831C32.5091 0.970215 19.9999 0.970215 19.9999 0.970215C19.9999 0.970215 7.49094 0.970215 4.37273 1.80831C2.65065 2.27025 1.29733 3.62639 0.836351 5.35207C2.50351e-07 8.47677 0 15.0001 0 15.0001C0 15.0001 2.50351e-07 21.5234 0.836351 24.6481C1.29733 26.3738 2.65065 27.7299 4.37273 28.1918C7.49094 29.0299 19.9999 29.0299 19.9999 29.0299C19.9999 29.0299 32.5091 29.0299 35.6272 28.1918C37.3493 27.7299 38.7027 26.3738 39.1636 24.6481C40 21.5234 40 15.0001 40 15.0001C40 15.0001 39.9966 8.47677 39.1636 5.35207Z"
        fill={activeTheme === "dark" ? "#ffffff" : "#09090B"}
      />
      <path
        d="M16 21.0124L26.3918 15.0007L16 8.98877V21.0124Z"
        fill={activeTheme === "dark" ? "#09090B" : "#ffffff"}
      />
    </svg>
  );
};

export default IconYoutube;
