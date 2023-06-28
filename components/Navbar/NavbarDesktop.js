import Link from "next/link";
import dynamic from "next/dynamic";
import {useHoverStore} from '../../utils/store';

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
});

function NavbarDesktop() {
    const {setHover} = useHoverStore();

    return (<nav className="navbar-desktop">
        <ul className="navbar-desktop__first-list">
            <li>
                <Link className="navbar__logo"
                      onMouseEnter={() => setHover('medium')}
                      onMouseLeave={() => setHover('small')} href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 45 45"
                    >
                        <g id="logo" fill="none" strokeWidth="6">
                            <circle cx="22.5" cy="22.5" r="22.5" stroke="none"/>
                            <circle cx="22.5" cy="22.5" r="19.5" fill="none"/>
                        </g>
                    </svg>
                    <span className="navbar__logo-line">/</span>
                    home
                </Link>
            </li>
            <li>
                <Link onMouseEnter={() => setHover('medium')}
                      onMouseLeave={() => setHover('small')} href="/stuff">
                    what i do
                </Link>
            </li>
        </ul>
        <ul className="navbar-desktop__second-list">
            <li>
                <Link onMouseEnter={() => setHover('medium')}
                      onMouseLeave={() => setHover('small')} href="/blog">
                    what i write
                </Link>
            </li>
            <li>
                <ThemeToggle/>
            </li>
        </ul>
    </nav>)
}

export default NavbarDesktop