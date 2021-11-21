import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from '../CursorManager';

const FooterHome = () => {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
  return (
    <div className="footer-home-cnt flex-center">
      <Link href="/stuff">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <em className="big-font">
            see all <br /> the works
          </em>
        </a>
      </Link>
    </div>
  );
};

export default FooterHome;
