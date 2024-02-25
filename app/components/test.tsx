"use client";

import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return <div className="absolute h-full pointer-events-none -z-20"></div>;
}

export default Test;
