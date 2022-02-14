import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from './CursorManager';
import useTranslation from 'next-translate/useTranslation';

const Footer = () => {
  const Replay = () => {
    localStorage.removeItem('hasVisitedBefore', true);
  };

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
  let { t } = useTranslation();

  return (
    <footer className="footer-cnt flex-center">
      <div className="footer-layout-cnt medium-font">
        <Link href="/">
          <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <em className="footer-ivan-smiths tiny-font" onClick={Replay}>
              2022©ivan smiths
            </em>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
