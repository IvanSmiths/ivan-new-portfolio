/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { CursorContext } from "../../components/CursorManager";

function BlogPost({ title, excerpt, date, image, link }) {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  return (
    <div className="blog__posts-single">
      <Link href={link}>
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src={image} alt="tutorial" />
          <span className="small-font blog__date">{date}</span>
          <div className="blog__posts__text">
            <h2 className="bold">{title}</h2>

            <h3 className="small-font">{excerpt}</h3>

            <span className="blog__link bold">Read more</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default BlogPost;
