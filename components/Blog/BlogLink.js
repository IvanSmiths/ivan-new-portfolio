import React, { useContext } from "react";
import { CursorContext } from "../../components/CursorManager";

function BlogLink({ href, text }) {
  const { setSize } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}

export default BlogLink;
