import { useContext } from "react";
import { CursorContext } from "../CursorManager";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
});

function NavbarDesktop() {
    const { setSize } = useContext(CursorContext);

    const handleMouseEnter = () => {
        setSize("medium");
    };
    const handleMouseLeave = () => {
        setSize("small");
    };
    let { t } = useTranslation();

    return (
        <nav className="navbar-desktop">
            <ul className="navbar-desktop__first-list">
                <li>
                    <Link href="/">
                        <a
                            className="navbar__logo"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                viewBox="0 0 45 45"
                            >
                                <g id="logo" fill="none" strokeWidth="6">
                                    <circle cx="22.5" cy="22.5" r="22.5" stroke="none" />
                                    <circle cx="22.5" cy="22.5" r="19.5" fill="none" />
                                </g>
                            </svg>
                            <span className="navbar__logo-line">/</span>
                            {t("common:nav-home")}
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/stuff">
                        <a
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {t("common:nav-stuff")}
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className="navbar-desktop__second-list">
                <li>
                    <Link href="/about">
                        <a
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {t("common:nav-about")}
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/blog">
                        <a
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {t("common:nav-post")}
                        </a>
                    </Link>
                </li>
                <li>
                    <ThemeToggle />
                </li>
            </ul>
        </nav>
    )
}

export default NavbarDesktop