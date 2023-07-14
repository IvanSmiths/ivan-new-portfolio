/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import dynamic from "next/dynamic";
import { icons } from "../../utils/icons";

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
});

function NavbarMobile() {
    const navRef = useRef();
    const navLinksRef = useRef();
    const menuRef = useRef();
    const menuLine1 = useRef(null);
    const menuLine2 = useRef(null);
    const menuLine3 = useRef(null);
    const animation = gsap.timeline(
        { paused: true, reversed: true }
    );

    useEffect(() => {
        animation
            .to(navRef.current, { x: "0%", ease: "expo.inOut" })
            .to(menuLine1.current, { rotate: "45deg", y: "1rem" }, "<")
            .to(menuLine2.current, { x: "-100%" }, "<")
            .to(menuLine3.current, { rotate: "-45deg", y: "-1rem" }, "<")
            .fromTo(
                navLinksRef.current,
                { opacity: 0 },
                { delay: 0.3, opacity: 1, stagger: 0.2 },
                "<"
            );
    }, [animation]);

    const handleMenuClick = () => {
        animation.reversed() ? animation.play() : animation.reverse();
    };

    const handleNavLinkClick = () => {
        animation.reverse();
    };

    const iconWidth = "25px"

    return (
        <>
            <div className="menu" ref={menuRef} onClick={handleMenuClick}>
                <div className="menu-line-wrapper">
                    <div ref={menuLine1} className="menu-line menu-line-1"></div>
                    <div ref={menuLine2} className="menu-line menu-line-2"></div>
                    <div ref={menuLine3} className="menu-line menu-line-3"></div>
                </div>
            </div>
            <div className="mobile">
                <Link className="navbar__logo navbar__logo-mobile" href="/">
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
                    home
                </Link>
                <ThemeToggle />
            </div>
            <nav ref={navRef} className="overlay-burger-menu as-opened">
                <span className="close-nav"></span>
                <div ref={navLinksRef} className="links-socials-cnt">
                    <ul className="burger-menu-links-cnt">
                        <li>
                            <Link onClick={handleNavLinkClick} className="impact big-font" href="/">
                                home
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleNavLinkClick} className="impact big-font" href="/stuff">
                                what i do
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleNavLinkClick} className="impact big-font" href="/blog">
                                what i write
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav-social-cnt">
                        {icons.map((icon, index) => (
                            <li key={index}>
                                <a href={icon.link}
                                    onClick={handleNavLinkClick}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img src={icon.icon} alt={icon.alt} height={iconWidth} width={iconWidth} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavbarMobile