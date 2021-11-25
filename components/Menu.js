import { useState } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

const Menu = () => {
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const [dropdown, setDropdown] = useState(false);

  let { t } = useTranslation();
  return (
    <div onMouseLeave={onMouseLeave} className="nav-dropdown-cnt">
      <span onMouseEnter={onMouseEnter} className="tiny-font">
        {t('common:lazy')}
      </span>
      <div onMouseLeave={onMouseLeave} className="nav-dropdown lazy-menu">
        {dropdown && (
          <ul>
            <li>
              <Link href="/">
                <a> {t('common:nav-home')}</a>
              </Link>
            </li>
            <li>
              <Link href="/stuff">
                <a> {t('common:nav-stuff')}</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a> {t('common:nav-about')}</a>
              </Link>
            </li>
            <li>
              <Link href="/post">
                <a> {t('common:nav-post')}</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Menu;
