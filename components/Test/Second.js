/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Second() {
  gsap.registerPlugin(ScrollTrigger);
  const triggerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "max",
        markers: true,
        scrub: true,
        onLeave: (self) => {
          self.scroll(1);
          ScrollTrigger.update();
        },
        onLeaveBack: (self) => {
          self.scroll(ScrollTrigger.maxScroll(window) - 1);
          ScrollTrigger.update();
        },
      },
    });
    tl.to(
      textRef.current,
      {
        color: "red",
      },
      0
    );
  }, []);

  return (
    <div ref={triggerRef}>
      <div className="works__outer">
        <div className="works__inner">
          <div className="works__company">
            <div className="works__mask-top"></div>
            <h1 ref={textRef}>Suv</h1>
            <div className="works__mask-bottom"></div>
          </div>
          <div className="works__image">
            <img
              src="scholz-und-volkmer-website-mobile-4.jpg"
              height="805px"
              with="469px"
              alt="work"
            />
          </div>
          <div className="works__desc">
            <div className="works__mask-top"></div>
            <ul>
              <li>Frontend developer</li>
              <li>Stack used</li>
              <li>Date</li>
            </ul>
            <div className="works__mask-bottom"></div>
          </div>
        </div>
        <div className="works__inner">
          <div className="works__company">
            <h1>Suv</h1>
          </div>
          <div className="works__image">
            <img
              src="ideology-website-mobile-1.png"
              height="805px"
              with="469px"
              alt="work"
            />
          </div>
          <div className="works__desc">
            <ul>
              <li>Frontend developer</li>
              <li>Stack used</li>
              <li>Date</li>
            </ul>
          </div>
        </div>
        <div className="works__inner">
          <div className="works__company">
            <h1>Suv</h1>
          </div>
          <div className="works__image">
            <img
              src="scholz-und-volkmer-website-mobile-4.jpg"
              height="805px"
              with="469px"
              alt="work"
            />
          </div>
          <div className="works__desc">
            <ul>
              <li>Frontend developer</li>
              <li>Stack used</li>
              <li>Date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;
