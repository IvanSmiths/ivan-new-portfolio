"use client";

import { FC, useEffect, useState } from "react";
import Loader from "./Loader";
import Overlay from "./Overlay";

const LoaderWrapper: FC = () => {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const hasComponentRendered: string | null =
      sessionStorage.getItem("loader");

    if (!hasComponentRendered as boolean) {
      setLoader(true);
      sessionStorage.setItem("loader", "true");
    }
  }, []);

  return (
    <>
      {loader && <Loader />}
      <Overlay />;
    </>
  );
};

export default LoaderWrapper;
