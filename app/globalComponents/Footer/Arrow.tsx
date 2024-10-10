"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

enum ThemeColor {
  Light = "#1e1e1e",
  Dark = "#E6E8E0",
}

const Arrow = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect((): void => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const fillColor: ThemeColor =
    theme === "dark" ? ThemeColor.Dark : ThemeColor.Light;

  return (
    <svg
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="group-hover:fill-light dark:group-hover:fill-dark fill-dark dark:fill-light transition"
        d="M4.80241 57L0 52.1976L45.2555 6.89836H4.11257V0H57V52.8874H50.1016V11.7445L4.80241 57Z"
      />
    </svg>
  );
};

export default Arrow;
