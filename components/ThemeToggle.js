/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useContext } from "react";
import { CursorContext } from "./Cursor/CursorManager";

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setActiveTheme(savedTheme);
  }, []);

  const { setSize } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  return (
    <>
      <img
        height="25px"
        width="25px"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="theme-toggle"
        onClick={() => setActiveTheme(inactiveTheme)}
        src={activeTheme === "dark" ? "/moon.svg" : "/sun.svg"}
        alt={`Change to ${inactiveTheme}`}
      />
    </>
  );
};

export default ThemeToggle;
