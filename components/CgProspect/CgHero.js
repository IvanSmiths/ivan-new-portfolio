import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";

function CgHero() {
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

  let { t } = useTranslation();

  return (
    <header>
      <div ref={videoTriggerRef} className="cs__video-outer">
        <div className="cs__video-inner">
          <div ref={companyRef} className="cs__video-h1">
            <h1 className="big-font impact">CG Prospect</h1>
          </div>
          <div className="cs__video-cnt" ref={videoRef}>
            <div className="desktop-video">
              <video
                preload="none"
                poster="/cg-prospect-website.jpg"
                muted
                autoPlay
                loop
              >
                <source src="/cg-prospect.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mobile-video">
              <video
                preload="none"
                poster="/cg-prospect-website.jpg"
                muted
                autoPlay
                loop
              >
                <source src="/cg-prospect-mobile.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="cs__video-h1 cs__video-h2">
            <h2 className="big-font impact">{t("suv:role")}</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CgHero;
