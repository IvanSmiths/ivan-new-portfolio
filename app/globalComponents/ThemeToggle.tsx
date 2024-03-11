/* eslint-disable @next/next/no-img-element */
"use client";
import { useThemeStore } from "../../utils/store";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { activeTheme, setActiveTheme } = useThemeStore();

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  const handleTheme = () => {
    setActiveTheme(activeTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-center items-center p-1.5 rounded-full border-[2px] w-10 h-10 border-primary cursor-pointer">
      <img
        height="40"
        width="40"
        onClick={handleTheme}
        src={activeTheme === "dark" ? "/icons/light.svg" : "/icons/dark.svg"}
        alt={activeTheme === "dark" ? "switch to light" : "switch to dark"}
      />
    </div>
  );
};

export default ThemeToggle;
