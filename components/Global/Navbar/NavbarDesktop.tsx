import Link from "next/link";
import dynamic from "next/dynamic";
import { useHoverStore } from '../../../utils/store';
import { FC } from "react";

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
});

interface LinkType {
    page: string;
    link: string;
}

const links: LinkType[] = [
    {
        page: "home",
        link: "/"
    }, {
        page: "what i do",
        link: "/about"
    }, {
        page: "what i write",
        link: "/blog"
    },
]

const NavbarDesktop: FC = () => {
    const {setHover} = useHoverStore();

    return (
        <nav className="fixed z-40 w-full top-2 left-small navbar-desktop">
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