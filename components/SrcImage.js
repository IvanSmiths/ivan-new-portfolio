/* eslint-disable @next/next/no-img-element */
import React from "react";

function SrcImage({ src, webp, alt, height, width, className, ...delegated }) {
  return (
    <picture className={className}>
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
  );
}

export default SrcImage;
