import { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const [dropdown, setDropdown] = useState(false);

  return (
    <div onMouseLeave={onMouseLeave} className="nav-dropdown-cnt">
      <span onMouseEnter={onMouseEnter} className="tiny-font">
        lazy menu
      </span>
      <div onMouseLeave={onMouseLeave} className="nav-dropdown lazy-menu">
        {dropdown && (
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/stuff">
                <a>What i do</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>Who i am</a>
              </Link>
            </li>
            <li>
              <Link href="/post">
                <a>What i write</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Menu;
