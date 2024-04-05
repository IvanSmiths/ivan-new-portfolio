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
      className="hidden sm:block cursor-pointer mono min-w-28"
      onClick={handleTheme}
    >
      -{theme} mode-
    </span>
  );
};

export default ThemeToggle;
