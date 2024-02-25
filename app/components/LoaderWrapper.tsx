"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function LoaderWrapper() {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const hasComponentRendered = sessionStorage.getItem("loader");

    if (!hasComponentRendered) {
      setLoader(true);
      sessionStorage.setItem("loader", "true");
    }
  }, []);

  return (
    <>
      {loader ? (
        <div className={loader ? "block" : "hidden"}>
          <Loader />
        </div>
      ) : null}
    </>
  );
}

export default LoaderWrapper;
