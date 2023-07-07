/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useContext, useRef} from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CursorContext } from "../Cursor/CursorManager";
import {useHoverStore} from "../../utils/store";

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);

  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  const thirdRowRef = useRef(null);
  const headerRef = useRef(null);
  const speedRef = useRef(null);
  const securityRef = useRef(null);
  const andRef = useRef(null);
  const arrowRef = useRef(null);
  const copyRef = useRef(null);
  const linkRef = useRef(null);

  const {setUserScroll, userScroll} = useHoverStore()

    useEffect(() => {
        function updatePosition() {
            setUserScroll(window.scrollY)
        }

        window.addEventListener('scroll', updatePosition)
        updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    }, [setUserScroll])

  useEffect(() => {
    let ctx = gsap.context(() => {
      var timeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "10px top",
          end: "bottom top",
          ease: "power1",
          scrub: true,
        },
      });

      timeline.fromTo(
        headerRef.current,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 3,
        },
        0
      );

      timeline.to(
        headerRef.current,
        {
          position: "fixed",
        },
        0
      );

      timeline.fromTo(
        firstRowRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-5rem",

          duration: 3,
        },
        0
      );
      timeline.fromTo(
        secondRowRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "5rem",

          duration: 3,
        },
        0
      );
      timeline.fromTo(
        thirdRowRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-5rem",

          duration: 3,
        },
        0
      );
      timeline.to(
        headerRef.current,
        {
          position: "relative",
        },
        5
      );
    })
    return () => {
      ctx.revert()
    };
  }, []);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  return (
    <div className="header__wrapper">
      <header ref={headerRef} className="home-header-cnt">
        <div ref={firstRowRef} className="big-font title-1-cnt">
          <em ref={speedRef} className="title-1 ">
            Speed {userScroll}
          </em>
          <p ref={copyRef}>
            ivan smiths <br />
            frontend developer <br />
            3 years of working experience
          </p>
        </div>
        <div ref={secondRowRef} className="big-font title-2-cnt">
          <Link ref={linkRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="tiny-font desktop title-link btn-small btn-small-2" href="/stuff" passHref>
            what i do
          </Link>
          <em ref={securityRef} className="title-2 impact">
            Security
          </em>
        </div>
        <div ref={thirdRowRef} className="big-font  flex-center title-3-cnt">
          <em ref={andRef} className="title-3">
            &
          </em>
          <svg
            ref={arrowRef}
            height="120px"
            width="100px"
            className="title-arrow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 59.126 22.371"
          >
            <path
              id="Tracciato_22"
              data-name="Tracciato 22"
              d="M-4637.739,829.608l28.168,19.976,28.168-19.976"
              transform="translate(4639.134 -828.213)"
              fill="none"
              strokeLinecap="round"
              strokeWidth="1"
            />
          </svg>
        </div>
      </header>
    </div>
  );
};

export default Hero;
