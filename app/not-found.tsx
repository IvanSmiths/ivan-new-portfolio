"use client";

import { NextPage } from "next";
import dynamic from "next/dynamic";

const Counter = dynamic(() => import("./not-found/Counter"), { ssr: false });
const Main = dynamic(() => import("./not-found/Main"), { ssr: false });
const ImpossibleButton = dynamic(() => import("./not-found/ImpossibleButton"), {
  ssr: false,
});

const NotFound: NextPage = () => {
  return (
    <div>
      <Counter />
      <Main />
      <ImpossibleButton />
    </div>
  );
};

export default NotFound;
