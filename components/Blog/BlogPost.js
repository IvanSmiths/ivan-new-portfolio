/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function BlogPost({ title, excerpt, date, image, link }) {
  return (
    <div className="blog__posts-single">
      <Link href={link}>
        <a>
          <img src={image} alt="tutorial" />
          <span className="small-font blog__date">{date}</span>
          <div className="blog__posts__text">
            <h2 className="small-font bold">{title}</h2>

            <h3 className="small-font">{excerpt}</h3>

            <span className="blog__link bold">Read more</span>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default BlogPost;
