/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState, useContext } from "react";
import { CursorContext } from "./CursorManager";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import Link from "next/link";

function Footer({ link, text }) {
  gsap.registerPlugin(ScrollTrigger);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  return (
    <>
      <footer>
        <div>
          <div className="footer-counter-inner">
            <div className="footer-counter__contact">
              <ul className="footer__icon">
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/IvanSmiths"
                  >
                    <img
                      src="/github-icon.svg"
                      alt="github icon"
                      height="25px"
                      width="25px"
                    />
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/ivan-fabbri/"
                  >
                    <img
                      src="/linkedin-icon.svg"
                      alt="linkedin icon"
                      height="25px"
                      width="25px"
                    />
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/ivan_smiths/"
                  >
                    <img
                      src="/instagram-icon.svg"
                      alt="instagram icon"
                      height="25px"
                      width="25px"
                    />
                  </a>
                </li>
              </ul>
              <div>
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  href="mailto:ivansmiths.com"
                  className="medium-font"
                >
                  info@ivansmiths.com
                </a>
              </div>
            </div>
            <Link href={link}>
              <a>
                <span className="big-font">{text}</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="spacer-small"></div>
      </footer>
    </>
  );
}
export default Footer;
