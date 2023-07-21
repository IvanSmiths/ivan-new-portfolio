import Link from "next/link";
import dynamic from "next/dynamic";
import {useHoverStore} from '../../utils/store';

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
});

const links = [
    {
        page: "home",
        link: "/"
    }, {
        page: "what i do",
        link: "/stuff"
    }, {
        page: "what i write",
        link: "/blog"
    },
]

function NavbarDesktop() {
    const {setHover} = useHoverStore();

    return (
        <nav className="fixed z-40 w-full top-small left-small navbar-desktop">
            <ul className="flex gap-medium">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.link} onMouseEnter={() => setHover('medium')}
                              onMouseLeave={() => setHover('small')}>
                            {link.page}
                        </Link>
                    </li>
                ))}
                <li><ThemeToggle/></li>
            </ul>
        </nav>
    )
}

export default NavbarDesktop