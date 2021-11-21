import React from 'react';
import Link from 'next/link';

function Title({ title, handleMouseEnter, handleMouseLeave, page }) {
  return (
    <Link href={page}>
      <a>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="title-item"
        >
          <p className="menu-title impact">{title}</p>
          <p className="menu-title impact clone">{title}</p>
        </div>
      </a>
    </Link>
  );
}

export default Title;
