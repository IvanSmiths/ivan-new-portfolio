import React from 'react';
import Link from 'next/link';

const LinksGlobal = () => {
  return (
    <ul className="navbar-links-cnt">
      <li>
        <Link href="/tutorials">
          <a>Tutorials</a>
        </Link>
      </li>
      <li>
        <Link href="/works">
          <a>Works</a>
        </Link>
      </li>
      <li>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>Who am i?</a>
        </Link>
      </li>
      <li className="link-global">
        <Link href="/contact">
          <a>Lets talk</a>
        </Link>
      </li>
    </ul>
  );
};

export default LinksGlobal;
