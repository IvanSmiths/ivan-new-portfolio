"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function LoaderWrapper() {
  const [loader, setLoader] = useState(() => {
    const hasComponentRendered = sessionStorage.getItem("loader");
    return !hasComponentRendered;
  });

  useEffect(() => {
    if (loader) {
      sessionStorage.setItem("loader", "true");
    }
  }, [loader]);
  return (
    <>
      {loader ? (
        <div className={`hide-loader ${loader ? "display-loader" : "hidden"}`}>
          <Loader />
        </div>
      ) : null}
    </>
  );
}

export default LoaderWrapper;
