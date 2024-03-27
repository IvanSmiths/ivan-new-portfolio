"use client";

import { FC, useEffect } from "react";
import { ThemeMode, useThemeStore } from "../../../utils/store";

const ThemeToggle: FC = () => {
  const { activeTheme, setActiveTheme } = useThemeStore();

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const handleTheme = (): void => {
    setActiveTheme(
      activeTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
    );
  };

  return (
    <span className="cursor-pointer mono block min-w-28" onClick={handleTheme}>
      -{activeTheme === "dark" ? "light" : "dark"} mode-
    </span>
  );
};

export default ThemeToggle;
