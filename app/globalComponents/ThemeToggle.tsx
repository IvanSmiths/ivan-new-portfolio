/* eslint-disable @next/next/no-img-element */
"use client";
import { ThemeMode, useThemeStore } from "../../utils/store";
import { FC, useEffect } from "react";

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
    <span className="cursor-pointer mono" onClick={handleTheme}>
      -{activeTheme === "dark" ? "light" : "dark"} mode-
    </span>
  );
};

export default ThemeToggle;
