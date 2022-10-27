import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function SuvHero() {
  gsap.registerPlugin(ScrollTrigger);

  const videoTriggerRef = useRef(null);
  const videoRef = useRef(null);
  const companyRef = useRef(null);
  const workRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoTriggerRef.current,
        start: "top top",
        end: "+=" + 4000,
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      videoRef.current,
      {
        scale: 0.6,
        duration: 0.3,
      },
      0
    );
    tl.to(
      videoRef.current,
      {
        opacity: 1,
        duration: 0.3,
      },
      0
    );
    tl.to(
      companyRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      0
    );
    tl.to(
      videoRef.current,
      {
        translateY: 100,
        duration: 0.2,
      },
      0.2
    );
    tl.fromTo(
      workRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.2,
      },
      0.2
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
            <h1 className="big-font">Scholz & Volkmer</h1>
          </div>
          <div className="cs__video-cnt" ref={videoRef}>
            <div className="desktop">
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
            <div className="mobile">
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
          <div ref={workRef} className="cs__video-h1 cs__video-h2">
            <h2 className="medium-font">Frontend developer</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SuvHero;
