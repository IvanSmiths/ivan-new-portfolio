/* eslint-disable @next/next/no-img-element */
import React from "react";

function Header() {
  return (
    <div className="grid z-20 relative">
      <div className="grid-home-name pt-small flex gap-4 flex-col">
        <img
          className="w-full"
          src="/images/full-logo.svg"
          alt="ivan smiths"
          width="700"
          height="400"
        />
      </div>
    </div>
  );
}

export default Header;
