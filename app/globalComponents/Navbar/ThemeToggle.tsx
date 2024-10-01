"use client";

import { FC, useEffect } from "react";
import { ThemeMode, useThemeStore } from "../../../utils/store";

const ThemeToggle: FC = () => {
  const { activeTheme, setActiveTheme } = useThemeStore();

  const theme =
    activeTheme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const handleTheme = (): void => {
    setActiveTheme(theme);
  };

  return (
    <span
      data-cy={theme}
      className="lato text-md min-w-20 cursor-pointer text-right font-semibold sm:text-xl"
      onClick={handleTheme}
    >
      {theme} Mode
    </span>
  );
};

export default ThemeToggle;
