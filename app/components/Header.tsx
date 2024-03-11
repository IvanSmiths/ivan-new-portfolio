/* eslint-disable @next/next/no-img-element */
"use client";

import { FC } from "react";
import { useThemeStore } from "../../utils/store";

const Header: FC = () => {
  const { activeTheme } = useThemeStore();

  return (
    <div className="grid z-20 relative">
      <div className="col-start-1 col-end-13 pt-small flex gap-4 flex-col">
        <img
          className="w-full"
          src={
            activeTheme === "light"
              ? "/images/logo.svg"
              : "/images/logo-white.svg"
          }
          alt="ivan smiths"
          width="700"
          height="400"
        />
      </div>
    </div>
  );
};

export default Header;
