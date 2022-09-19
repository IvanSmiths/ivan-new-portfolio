import React from "react";

function BlogLink({ href, text }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

export default BlogLink;
