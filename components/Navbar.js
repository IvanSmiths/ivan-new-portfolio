/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "./CursorManager";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

function Navbar() {
  const { setSize } = useContext(CursorContext);
  const navRef = useRef();
  const navLinksRef = useRef();
  const menuRef = useRef();
  const menuLine1 = useRef(null);
  const menuLine2 = useRef(null);
  const menuLine3 = useRef(null);
  let router = useRouter();
  let { t } = useTranslation();

  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  const animation = gsap.timeline({ paused: true, reversed: true });
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

  return (
    <>
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
      <div className="menu" ref={menuRef} onClick={handleMenuClick}>
        <div className="menu-line-wrapper">
          <div ref={menuLine1} className="menu-line menu-line-1"></div>
          <div ref={menuLine2} className="menu-line menu-line-2"></div>
          <div ref={menuLine3} className="menu-line menu-line-3"></div>
        </div>
      </div>
      <div className="mobile">
        <Link href="/">
          <a
            className="navbar__logo navbar__logo-mobile"
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
        <ThemeToggle />
      </div>

      <nav ref={navRef} className="overlay-burger-menu as-opened">
        <span className="close-nav"></span>
        <div ref={navLinksRef} className="links-socials-cnt">
          <ul className="burger-menu-links-cnt">
            <li>
              <Link href="/">
                <a onClick={handleNavLinkClick} className="impact big-font">
                  {t("common:nav-home")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/stuff">
                <a onClick={handleNavLinkClick} className="impact big-font">
                  {t("common:nav-stuff")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a onClick={handleNavLinkClick} className="impact big-font">
                  {t("common:nav-about")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a onClick={handleNavLinkClick} className="impact big-font">
                  {t("common:nav-post")}
                </a>
              </Link>
            </li>
          </ul>
          <ul className="nav-social-cnt">
            <li>
              <a
                onClick={handleNavLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/IvanSmiths"
              >
                Github
              </a>
            </li>
            <li>
              <a
                onClick={handleNavLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/ivan-fabbri/"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                onClick={handleNavLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ivan_smiths"
              >
                Instagram
              </a>
            </li>
          </ul>
          <ul className="lang-cnt">
            <li>
              <Link locale="en" href={router.asPath}>
                <a onClick={handleNavLinkClick} className="tiny-font">
                  {router.locales[0]}
                </a>
              </Link>
            </li>
            <li className="tiny-font">/</li>
            <li>
              <Link locale="it" href={router.asPath}>
                <a onClick={handleNavLinkClick} className="tiny-font">
                  {router.locales[1]}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
