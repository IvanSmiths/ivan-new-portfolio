"use client";

import { FC } from "react";
import { useButtonStore } from "../../utils/store";
import Button from "../global/Button";

const Main: FC = () => {
  const { attempts } = useButtonStore();
  return (
    <>
      <h1 className="absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-extrabold uppercase md:text-5xl lg:text-7xl">
        How did you get here?
      </h1>
      {attempts >= 3 && (
        <div className="fade-in absolute left-1/2 top-[60%] z-30 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer">
          <Button label="Easy home button" link="/" />
        </div>
      )}
    </>
  );
};

export default Main;
