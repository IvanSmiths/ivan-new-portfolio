"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function LoaderWrapper() {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const hasComponentRendered = localStorage.getItem("loader");

    if (!hasComponentRendered) {
      setLoader(true);
      localStorage.setItem("loader", "true");
    }
  }, []);

  return <>{loader && <Loader />}</>;
}

export default LoaderWrapper;
