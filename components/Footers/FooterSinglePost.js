import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from '../CursorManager';

const FooterIdeology = () => {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
  return (
    <div className="footer-home-cnt flex-center">
      <Link href="/post">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <em className="big-font">
            see all <br /> the guides
          </em>
        </a>
      </Link>
    </div>
  );
};

export default FooterIdeology;
