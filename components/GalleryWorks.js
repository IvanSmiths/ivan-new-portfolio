/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CursorContext } from './CursorManager';
import cn from 'classnames';
import { motion, AnimateSharedLayout } from 'framer-motion';
import Link from 'next/link';

const images = [
  {
    id: 'image',
    url: 'https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=100',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=100',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1580428180163-76ab1efe2aed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1300&q=100',
  },
];

function GalleryItem({ src, id }) {
  const refimage = useRef(null);
  const mouseContext = useContext(CursorContext);

  const [clipMaskRadius, setClipMaskRadius] = useState(0);
  const [clipMask, setClipMask] = useState({ x: 0, y: 0 });
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReveal(true);
    }, 100);
  }, []);

  useEffect(() => {
    function getCoordinates(mouse) {
      const imagePosition = {
        posX: refimage.current.offsetLeft,
        posY: refimage.current.offsetTop,
      };

      const posX = mouse.pageX - imagePosition.posX;
      const posY = mouse.pageY - imagePosition.posY;

      setClipMask({
        x: (posX / refimage.current.clientWidth) * 100,
        y: (posY / refimage.current.clientHeight) * 100,
      });
    }

    refimage.current.addEventListener('mousemove', (mouse) => {
      window.requestAnimationFrame(() => {
        getCoordinates(mouse);
      });
    });
  }, []);
  return (
    <div
      className={cn('gallery-works-item-wrapper', { 'is-reveal': reveal })}
      ref={refimage}
      onMouseEnter={() => {
        setClipMaskRadius(55);
        mouseContext.setSize('hide');
      }}
      onMouseLeave={() => {
        setClipMaskRadius(0);
        mouseContext.setSize('small');
      }}
    >
      <div className="gallery-works-item">
        <img
          className="gallery-works-item-image sepia"
          height={400}
          src={src}
          alt=""
        />

        <Link href="/works/ideology">
          <a>
            <motion.img
              layoutId={id}
              className="gallery-works-item-image masked"
              style={{
                clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)`,
              }}
              height={400}
              src={src}
              alt=""
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

const GalleryWorks = () => {
  return (
    <div className="gallery-works">
      {images.map((src) => (
        <GalleryItem key={src.id} id={src.id} src={src.url} />
      ))}
    </div>
  );
};

export default GalleryWorks;
