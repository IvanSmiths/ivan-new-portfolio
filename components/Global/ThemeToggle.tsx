/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from "react";
import { useAnimationStore, useHoverStore } from "../../utils/store";
import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);

const ThemeToggle: FC = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";
  const themeRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const { durationMedium, durationSlow } = useAnimationStore();

  const [theme, setTheme] = useState(
    activeTheme === "dark" ? "light mode" : "dark mode",
  );

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
    const timeoutId = setTimeout(() => {
      setTheme(activeTheme === "dark" ? "light mode" : "dark mode");
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [activeTheme]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setActiveTheme(savedTheme);
  }, []);

  const { setHover } = useHoverStore();

  const handleMouseEnter = () => {
    setHover("w-4 h-4");
  };
  const handleMouseLeave = () => {
    setHover("w-2 h-2");
  };

  const handleMouseClick = () => {
    setActiveTheme(inactiveTheme);
    setClicked(true);
  };

  useEffect(() => {
    const scope = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(themeRef.current, {
        top: 40,
        duration: durationMedium,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.766,0.76 0.612,0.694 0.988,0.648 0.988,0.69 1,0.824 1,1 ",
        ),
      });
      tl.set(themeRef.current, { top: -40 });
      tl.to(themeRef.current, {
        top: 0,
        duration: durationMedium,
        ease: "circ.out",
      });
      tl.pause();
      if (clicked) {
        tl.play();
        setTimeout(() => {
          setClicked(false);
        }, 600);
      }

      return () => scope.revert();
    });
  }, [themeRef, durationMedium, durationSlow, clicked]);

  return (
    <div className="relative pr-medium pl-medium overflow-hidden h-6 w-9">
      <span
        ref={themeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
        className="cursor-pointer absolute left-0 text-primary-light"
      >
        {theme}
      </span>
    </div>
  );
};

export default ThemeToggle;
