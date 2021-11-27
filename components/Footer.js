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
        <span className="lines"></span>
        <div className="footer">
          <em className="small-font">@2021</em>
          <Link href="/">
            <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <em className="footer-ivan-smiths" onClick={Replay}>
                ivan smiths
              </em>
            </a>
          </Link>
          <em className="small-font based">{t('common:based')}</em>
        </div>
        <span className="lines"></span>
      </div>
    </footer>
  );
};

export default Footer;
