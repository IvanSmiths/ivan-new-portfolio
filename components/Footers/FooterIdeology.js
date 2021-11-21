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
      <Link href="/">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <em className="big-font">cg prospect</em>
        </a>
      </Link>
    </div>
  );
};

export default FooterIdeology;
