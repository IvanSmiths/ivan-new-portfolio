"use client";

import { FC, useEffect } from "react";
import { useColorStore } from "../../../utils/store";

const About: FC = () => {
  const { backgroundColor, setBackgroundColor } = useColorStore();

  useEffect(() => {
    setBackgroundColor();
  }, [setBackgroundColor]);

  return (
    <main
      data-testid="homeAboutSection"
      style={{ backgroundColor }}
      className="flex h-[100vh] flex-col items-center justify-center"
    >
      <div className="grid">
        <div className="col-start-1 col-end-13 w-full md:col-start-2 md:col-end-12">
          <p className="text-blackPrimary indent-48 text-7xl font-bold leading-[80px]">
            Adept at translating creative ideas into user-centric, data-driven
            experiences. I seamlessly blend my design background with my
            development skills.
          </p>
          <span className="lato text-blackPrimary !important block pl-2 pt-small font-bold">
            (2022 / 2024)
          </span>
        </div>
      </div>
    </main>
  );
};

export default About;
