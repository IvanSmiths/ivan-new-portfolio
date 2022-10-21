/* eslint-disable @next/next/no-img-element */
import React from "react";

function SrcImage({ src, webp, alt, height, width, className, lazyOff }) {
  return (
    <>
      <picture className={className ? className : null}>
        <source
          alt={alt}
          decoding="async"
          loading={lazyOff === true ? null : "lazy"}
          height={height}
          width={width}
          srcSet={webp}
          type="image/webp"
        />
        <img
          alt={alt}
          loading={lazyOff === true ? null : "lazy"}
          decoding="async"
          src={src}
          height={height}
          width={width}
        />
      </picture>
    </>
  );
}

export default SrcImage;
