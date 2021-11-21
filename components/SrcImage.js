/* eslint-disable @next/next/no-img-element */
import React from 'react';

function SrcImage({ src, webp, alt, height, width, className, ...delegated }) {
  return (
    <picture className={className}>
      {/* <source
        alt={'dw'}
        height={100}
        width={100}
        srcSet="/images/cloudflare-stats.avif"
        type="image/avif"
      /> */}
      <source
        alt={alt}
        decoding={'async'}
        loading={'lazy'}
        height={height}
        width={width}
        srcSet={webp}
        type="image/webp"
      />
      <img
        alt={alt}
        loading={'lazy'}
        decoding={'async'}
        src={src}
        height={height}
        width={width}
        {...delegated}
      />
    </picture>
  );
}

export default SrcImage;
