import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from '../CursorManager';

const FooterCGProspect = () => {
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
      <Link href="/stuff/ideology">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <em className="big-font">ideology</em>
        </a>
      </Link>
    </div>
  );
};

export default FooterCGProspect;
