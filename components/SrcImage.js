/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function SrcImage({ src, webp, alt, height, width, className, ...delegated }) {
  gsap.registerPlugin(ScrollTrigger);

  const imageTriggerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      width: 0,
      duration: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: imageTriggerRef.current,
        start: "50px bottom",
        ease: "power4.inOut",
      },
    });
  }, []);
  return (
    <div ref={imageTriggerRef} className="picture-tag">
      <div ref={imageRef} className="picture-tag__mask"></div>
      <picture className={` ${className}`}>
        <source
          alt={alt}
          decoding={"async"}
          loading={"lazy"}
          height={height}
          width={width}
          srcSet={webp}
          type="image/webp"
        />
        <img
          alt={alt}
          loading={"lazy"}
          decoding={"async"}
          src={src}
          height={height}
          width={width}
          {...delegated}
        />
      </picture>
    </div>
  );
}

export default SrcImage;
