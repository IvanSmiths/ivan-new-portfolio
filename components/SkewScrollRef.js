/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import photos from '../utils/data';
import GridItem from './GridItem';

const clamp = (value, min, max) =>
  value <= min ? min : value >= max ? max : value;

function SkewScrollRef() {
  const ref = useRef(null);
  const columnRef = useRef(null);
  const scroll = useRef({
    cache: 0,
    current: 0,
  });
  useEffect(() => {
    // if (ref) {
    //   if (typeof window === "undefined" || !window.document) {
    //     return;
    //   }
    const scrollElement = new LocomotiveScroll({
      el: ref.current,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      // direction: "horizontal",
      // multiplier: 0.5,
      getDirection: true,
      getSpeed: true,
      // lerp: 0.5
    });
    scrollElement.on('scroll', (obj) => {
      // Find distance between scroll updates
      scroll.current.current = obj.scroll.y;
      const distance = scroll.current.current - scroll.current.cache;
      scroll.current.cache = scroll.current.current;

      columnRef.current.style.transform = `skewY(${clamp(distance, -2, 2)}deg)`;
    });
  }, []);

  const leftChunk = [...photos].splice(0, 5);

  return (
    <>
      <div
        className="main-container"
        id="main-container"
        data-scroll-container
        ref={ref}
      >
        <div ref={columnRef}>
          <div className="grid-wrap">
            <div className="left-column">
              {leftChunk.map(({ url, description }, index) => (
                <GridItem
                  key={url}
                  url={url}
                  description={description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkewScrollRef;
