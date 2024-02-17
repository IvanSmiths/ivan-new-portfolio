import React from "react";

function Header() {
  return (
    <div className="grid-home-name pt-small flex gap-4 flex-col">
      <div className="h-6 w-full bg-primary"></div>
      <img className="w-full" src="/images/IVANSMITHS.svg" alt="ivan smiths" />
      <div className="h-6 w-full bg-primary"></div>
    </div>
  );
}

export default Header;
