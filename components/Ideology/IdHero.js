import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SrcImage from "../SrcImage";

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
        end: "5000 bottom",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      videoRef.current,
      {
        scale: 0.5,
        duration: 1,
        ease: "power4",
      },
      1
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
            <h1 className="big-font impact">Ideology</h1>
          </div>
          <div className="cs__video-cnt" ref={videoRef}>
            <div className="desktop">
              <SrcImage
                src="/ideology-website-2.jpg"
                webp="/ideology-website-2.webp"
                height="755px"
                width="1424px"
                alt="image of a website"
              />
            </div>
            <div className="mobile">
              <SrcImage
                src="/ideology-website-mobile-6.jpg"
                webp="/ideology-website-mobile-6.webp"
                height="755px"
                width="1424px"
                alt="image of a website"
              />
            </div>
          </div>
          <div className="cs__video-h1 cs__video-h2">
            <h2 className="big-font impact">UI/UX Designer</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SuvHero;
