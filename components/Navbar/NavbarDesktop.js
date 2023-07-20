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