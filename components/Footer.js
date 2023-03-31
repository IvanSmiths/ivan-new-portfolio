/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState, useContext } from "react";
import { CursorContext } from "./CursorManager";
import { gsap } from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";

function Footer({ link }) {
  gsap.registerPlugin(ScrollTrigger);
  const router = useRouter();

  const [complete, setComplete] = useState(false);
  const [num, setNum] = useState(0);

  const numberRef = useRef(null);
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  useEffect(() => {
    const showAnim = gsap.fromTo(scrollRef.current, {
      opacity: 0,
    }, {
      opacity: 1,
      paused: true,
      duration: 0.2
    }).progress(1);
    const footerNum = gsap.fromTo(
      numberRef.current,
      { scale: 1 },
      {
        scale: 2,
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          end: "+=2000px bottom",
          pin: true,

          onUpdate: (self) => {
            setNum(Math.min(Math.ceil(self.progress * 100), 100));
            self.direction === -1 ? showAnim.play() : showAnim.reverse()
          },
          onLeave: function () {
            setComplete(true);
          },
        },
      }
    );

    return () => {
      footerNum.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    if (complete === true) {
      router.push(`/${link}`);
    }
    return () => {
      setComplete(false);
    };
  }, [router, complete, link]);

  return (
    <>
      <footer>
        <div ref={triggerRef}>
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
                    href="https://twitter.com/IvanSmiths"
                  >
                    <img
                      src="/icon-twitter.svg"
                      alt="twitter icon"
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
                <ul className="lang-cnt-footer">
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
              </div>
            </div>
            <span className="big-font" ref={numberRef}>
              {num}
            </span>
            <span ref={scrollRef} className="footer__scroll">
              scroll.
            </span>
          </div>
        </div>
        <div className="spacer-small"></div>
      </footer>
    </>
  );
}
export default Footer;
