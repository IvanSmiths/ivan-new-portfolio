/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState, useContext } from "react";
import { CursorContext } from "../CursorManager";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";

function FooterCounter() {
  gsap.registerPlugin(ScrollTrigger);
  const router = useRouter();

  const [complete, setComplete] = useState(false);
  const [num, setNum] = useState(0);

  const numberRef = useRef(null);
  const triggerRef = useRef(null);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  useEffect(() => {
    const footerNum = gsap.fromTo(
      numberRef.current,
      { scale: 1 },
      {
        scale: 2,
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          end: "+=20000px bottom",
          pin: true,
          onUpdate: (self) => {
            setNum(Math.min(Math.ceil(self.progress * 100), 100));
          },
          onLeave: function () {
            setComplete(true);
          },
        },
      }
    );

    return () => {
      footerNum.kill();
    };
  }, []);

  useEffect(() => {
    if (complete === true) {
      router.push("/about");
    }
    return () => {
      setComplete(false);
    };
  }, [router, complete]);

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
            <span className="big-font" ref={numberRef}>
              {num}
            </span>
          </div>
        </div>
        <div className="spacer-small"></div>
      </footer>
    </>
  );
}
export default FooterCounter;
