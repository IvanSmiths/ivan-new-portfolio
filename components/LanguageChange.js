import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CursorContext } from './CursorManager';

const LanguageChange = () => {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
  let router = useRouter();
  return (
    <ul className="lang-cnt">
      <li>
        <Link locale="en" href={router.asPath}>
          <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {router.locales[0]}
          </a>
        </Link>
      </li>
      <li>-</li>
      <li>
        <Link locale="it" href={router.asPath}>
          <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {router.locales[1]}
          </a>
        </Link>
      </li>
      <li>-</li>
      <li>
        <Link locale="de" href={router.asPath}>
          <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {router.locales[2]}
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LanguageChange;
