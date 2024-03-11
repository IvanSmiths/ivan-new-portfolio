/* eslint-disable @next/next/no-img-element */
"use client";
import { ThemeMode, useThemeStore } from "../../utils/store";
import { useEffect } from "react";

const ThemeToggle = () => {
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
    <div
      onClick={handleTheme}
      className="flex justify-center items-center p-1.5 rounded-full border-[2px] w-10 h-10 border-primary cursor-pointer"
    >
      <img
        height="40"
        width="40"
        src={activeTheme === "dark" ? "/icons/light.svg" : "/icons/dark.svg"}
        alt={activeTheme === "dark" ? "switch to light" : "switch to dark"}
      />
    </div>
  );
};

export default ThemeToggle;
