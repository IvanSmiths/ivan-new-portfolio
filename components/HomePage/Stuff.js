/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CursorContext } from '../Cursor/CursorManager';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SrcImage from '../SrcImage';

function Stuff() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          translateX: 0,
        },
        {
          translateX: '-100vw',
          ease: 'none',
          duration: 0.5,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=4000 top',
            scrub: 0.6,
            pin: true,
          },
        }
      )
    })
    return () => ctx.revert();
  }, []);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  return (
    <div>
      <section ref={triggerRef} className="scroll-container-outer">
        <div id="box" ref={containerRef} className="scroll-container ">
          <div id="box1" className="scroll-section-1 scroll-section">
            <div className="box-image-cnt">
              <Link onClick={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} href="/stuff/scholz-und-volkmer">
                <SrcImage
                  className="flex-center"
                  src="/scholz-und-volkmer-website-2.jpg"
                  webp="/scholz-und-volkmer-website-2.webp"
                  height="563"
                  width="337"
                  alt="s-v work"
                  lazyOff={true}
                />
              </Link>
            </div>
            <div className="box-informations-cnt">
              <div className="box__width">
                <span className="small-font box-subtitle">
                  01 / Work
                  <br />
                </span>
                <Link className="medium-font box-title "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} href="/stuff/scholz-und-volkmer" passHref>
                  Scholz & Volkmer
                </Link>
                <ul>
                  <li>
                    Main role
                    Frontend developer
                  </li>
                  <li>
                    Frontend/backend developer: Vue.js, Nuxt.js,TypeScript, Gsap,
                    Sass
                  </li>
                  <li>2022 / Current</li>
                </ul>
                <div className="box-link-cnt">
                  <Link className="btn-small box-link" href="/stuff/scholz-und-volkmer" passHref>
                    Find out
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div id="box2" className="scroll-section-2 scroll-section">
            <div className="box-image-cnt">
              <Link onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} href="/stuff/ideology">
                <SrcImage
                  className="flex-center"
                  src="/ideology-website-5.jpg"
                  webp="/ideology-website-5.webp"
                  height="572"
                  width="343"
                  alt="ideology work"
                  lazyOff={true}
                />
              </Link>
            </div>
            <div className="box-informations-cnt">
              <div className="box__width">
                <span className="small-font box-subtitle">
                  02 / Work
                  <br />
                </span>
                <Link className="medium-font box-title"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} href="/stuff/ideology" passHref>
                  Ideology
                </Link>
                <ul>
                  <li>Main role: UI/UX Designer</li>
                  <li>
                    Main technologies: Adobe XD, CSS, jQuery, WordPress
                  </li>
                  <li>2020 / 2022</li>
                </ul>
                <div className="box-link-cnt ">
                  <Link onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="btn-small box-link" href="/stuff/ideology" passHref>
                    Find out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stuff;
