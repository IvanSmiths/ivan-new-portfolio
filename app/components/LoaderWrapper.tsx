"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function LoaderWrapper() {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const hasComponentRendered: string | null = localStorage.getItem("loader");

    if (!hasComponentRendered as boolean) {
      setLoader(true);
      localStorage.setItem("loader", "true");
    }
  }, []);

  return <>{loader && <Loader />}</>;
}

export default LoaderWrapper;
