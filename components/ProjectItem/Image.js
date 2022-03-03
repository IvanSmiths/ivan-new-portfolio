/* eslint-disable @next/next/no-img-element */
import React from 'react';

function Image({ url, opacity, parallaxPos, scale, rotationPosition, id }) {
  return (
    <img
      className={id}
      height="auto"
      width="100px"
      style={{
        opacity,
        transform: `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0px) rotate(${rotationPosition}deg) scale(${scale})`,
      }}
      src={url}
      alt="project"
    />
  );
}

export default Image;
