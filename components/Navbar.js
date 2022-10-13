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
      .to(menuLine3.current, { rotate: "-45deg", y: "-1rem" }, "<");
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {" "}
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
                what i write
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
      <nav ref={navRef} className="overlay-burger-menu as-opened">
        <span className="close-nav"></span>
        <div className="links-socials-cnt">
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
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/IvanSmiths"
              >
                Github
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/ivan-fabbri/"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ivan_smiths"
              >
                Instagram
              </a>
            </li>
          </ul>
          <ul className="lang-cnt2">
            <li>
              <Link locale="en" href={router.asPath}>
                <a className="tiny-font">{router.locales[0]}</a>
              </Link>
            </li>
            <li className="tiny-font">/</li>
            <li>
              <Link locale="it" href={router.asPath}>
                <a className="tiny-font">{router.locales[1]}</a>
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
        <div className="burger-menu-info-cnt">
          <a
            href="mailto:info@ivansmiths.com"
            className="btn-big btn-email small-font"
          >
            info@ivansmiths.com
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
