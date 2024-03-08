/* eslint-disable @next/next/no-img-element */
"use client";
import { useThemeStore } from "../../utils/store";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { activeTheme, setActiveTheme } = useThemeStore();

  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setActiveTheme(savedTheme);
  }, [setActiveTheme]);

  return (
    <>
      {activeTheme === "dark" ? (
        <span onClick={() => setActiveTheme(inactiveTheme)}>dark</span>
      ) : (
        <span onClick={() => setActiveTheme(inactiveTheme)}>light</span>
      )}
    </>
  );
};

export default ThemeToggle;
