/* eslint-disable @next/next/no-img-element */
"use client";
import { useThemeStore } from "../../utils/store";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { activeTheme, setActiveTheme } = useThemeStore();

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  return (
    <>
      {activeTheme === "dark" ? (
        <span onClick={() => setActiveTheme("light")}>dark</span>
      ) : (
        <span onClick={() => setActiveTheme("dark")}>light</span>
      )}
    </>
  );
};

export default ThemeToggle;
