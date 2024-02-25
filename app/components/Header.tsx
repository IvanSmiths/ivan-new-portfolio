/* eslint-disable @next/next/no-img-element */
import React from "react";

function Header() {
  return (
    <div className="grid z-20 relative">
      <div className="grid-home-name pt-small flex gap-4 flex-col">
        <div className="h-6 w-full bg-black"></div>
        <img
          className="w-full"
          src="/images/IVANSMITHS.svg"
          alt="ivan smiths"
          width="700"
          height="400"
        />
        <div className="h-6 w-full bg-black"></div>
      </div>
    </div>
  );
}

export default Header;
