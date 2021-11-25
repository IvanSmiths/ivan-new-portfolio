import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from '../CursorManager';
import useTranslation from 'next-translate/useTranslation';

const FooterHome = () => {
  let { t } = useTranslation();
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
            {t('home:home-footer')} <br /> {t('home:home-footer-2')}
          </em>
        </a>
      </Link>
    </div>
  );
};

export default FooterHome;
