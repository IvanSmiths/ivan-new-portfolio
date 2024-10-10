"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={theme}
      className="bg-light dark:bg-dark border-none"
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default ThemeToggle;
