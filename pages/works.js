/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import First from "../components/Test/First";
import Second from "../components/Test/Second";
import Third from "../components/Test/Third";
import dynamic from "next/dynamic";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("stuff__page");
    return () => {
      document.body.classList.remove("stuff__page");
    };
  });

  return (
    <div>
      <Third />
    </div>
  );
}
