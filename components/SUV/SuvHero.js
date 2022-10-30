import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function SuvHero() {
  gsap.registerPlugin(ScrollTrigger);

  const videoTriggerRef = useRef(null);
  const videoRef = useRef(null);
  const companyRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoTriggerRef.current,
        start: "top top",
        end: "3500 bottom",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      videoRef.current,
      {
        scale: 0.5,
        duration: 1,
      },
      0.8
    );
    tl.to(
      videoRef.current,
      {
        filter: "brightness(1)",
        duration: 0.3,
      },
      0.3
    );
    tl.to(
      companyRef.current,
      {
        opacity: 0,
        translateY: -20,
        duration: 0.1,
      },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <header>
      <div ref={videoTriggerRef} className="cs__video-outer">
        <div className="cs__video-inner">
          <div ref={companyRef} className="cs__video-h1">
            <h1 className="big-font impact">Scholz & Volkmer</h1>
          </div>
          <div className="cs__video-cnt" ref={videoRef}>
            <div className="desktop-video">
              <video
                preload="none"
                poster="/scholz-und-volkmer-website-2.jpg"
                muted
                autoPlay
                loop
              >
                <source src="/suv.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mobile-video">
              <video
                preload="none"
                poster="/scholz-und-volkmer-website-2.jpg"
                muted
                autoPlay
                loop
              >
                <source src="/suv-mobile.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="cs__video-h1 cs__video-h2">
            <h2 className="medium-font">Frontend developer</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SuvHero;
