"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { dm_mono } from "../../../utils/fonts/fonts";

const ThemeToggle: FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect((): void => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <span
      className={`cursor-pointer text-xs uppercase ${dm_mono.className}`}
      onClick={toggleTheme}
    >
      [{theme === "light" ? "Dark" : "Light"} Mode]
    </span>
  );
};

export default ThemeToggle;
