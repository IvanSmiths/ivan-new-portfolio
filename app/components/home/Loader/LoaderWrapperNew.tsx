"use client";

import { FC, useEffect, useState } from "react";
import LoaderNew from "./LoaderNew";

const LoaderWrapperNew: FC = () => {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const hasComponentRendered: string | null =
      sessionStorage.getItem("loader");

    if (!hasComponentRendered as boolean) {
      setLoader(true);
      sessionStorage.setItem("loader", "true");
    }
  }, []);

  return <>{loader && <LoaderNew />}</>;
};

export default LoaderWrapperNew;
