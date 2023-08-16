/* eslint-disable @next/next/no-img-element */
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import Link from "next/link";
import dynamic from "next/dynamic";
import {icons} from "../../utils/icons";

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
        {paused: true, reversed: true}
    );

    useEffect(() => {
        animation
            .to(navRef.current, {x: "0%", ease: "expo.inOut"}, "<")
            .to(menuLine1.current, {rotate: "45deg", y: "5px"}, "<")
            .to(menuLine2.current, {x: "-200%"}, "<")
            .to(menuLine3.current, {rotate: "-45deg", y: "-5px"}, "<")
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
            <div className="menu fixed bottom-small right-small z-40 flex justify-stretch items-center" ref={menuRef}
                 onClick={handleMenuClick}>
                <div
                    className="menu-line-wrapper rounded-full p-4 pt-[1.4rem] pb-[1.4rem] bg-primary w-14 h-14 ml-1 flex flex-col justify-between overflow-hidden z-50">
                    <div ref={menuLine1}
                         className="menu-line w-full h-[1px] bg-secondary origin-center menu-line-1"></div>
                    <div ref={menuLine2}
                         className="menu-line menu-line w-full h-[1px] bg-secondary origin-center menu-line-2"></div>
                    <div ref={menuLine3}
                         className="menu-line menu-line w-full h-[1px] bg-secondary origin-center menu-line-3"></div>
                </div>
            </div>
            <nav ref={navRef} className="overlay-burger-menu as-opened">
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
                                    <img src={icon.icon} alt={icon.alt} height={iconWidth} width={iconWidth}/>
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