import React, { useContext } from "react";
import Link from "next/link";
import { CursorContext } from "../CursorManager";

const FooterStuff = () => {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  return (
    <div className="footer-home-cnt flex-center">
      <Link href="/post">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <em className="big-font">
            find <br /> a solution
          </em>
        </a>
      </Link>
    </div>
  );
};

export default FooterStuff;
