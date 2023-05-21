/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { CursorContext } from '../CursorManager';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useTranslation from 'next-translate/useTranslation';
import SrcImage from '../SrcImage';

function Stuff() {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 500;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        const pin = gsap.fromTo(
          containerRef.current,
          {
            translateX: 0,
          },
          {
            translateX: '-200vw',
            ease: 'none',
            duration: 0.5,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: isDesktop ? '6000 top' : '1500 top',
              scrub: 0.6,
              pin: true,
            },
          }
        );
        return () => {
          pin.kill();
        };
      }
    );
  }, []);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  let { t } = useTranslation();

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
                  01 / {t('common:stuff-3')}
                  <br />
                </span>
                <Link className="medium-font box-title "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} href="/stuff/scholz-und-volkmer" passHref>
                  Scholz & Volkmer
                </Link>
                <ul>
                  <li>
                    {t('common:box-list')}
                    {t('common:box-list-dev')}
                  </li>
                  <li>
                    {t('common:box-list-2')}Vue.js, Nuxt.js,TypeScript, Gsap,
                    Sass
                  </li>
                  <li>2022 / {t('common:box-list-3')}</li>
                </ul>
                <div className="box-link-cnt">
                  <Link className="btn-small box-link" href="/stuff/scholz-und-volkmer" passHref>
                    {t('common:stuff')}
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
                  02 / {t('common:stuff-3')}
                  <br />
                </span>
                <Link className="medium-font box-title"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} href="/stuff/ideology" passHref>
                  Ideology
                </Link>
                <ul>
                  <li>{t('common:box-list')}UI/UX Designer</li>
                  <li>
                    {t('common:box-list-2')}Adobe XD, CSS, jQuery, WordPress
                  </li>
                  <li>2020 / 2022</li>
                </ul>
                <div className="box-link-cnt ">
                  <Link onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="btn-small box-link" href="/stuff/ideology" passHref>
                    {t('common:stuff')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div id="box3" className="scroll-section-3 scroll-section">
            <div className="box-image-cnt">
              <Link onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} href="/stuff/cg-prospect">
                <SrcImage
                  className="flex-center"
                  src="/cg-prospect-website-1.jpg"
                  webp="/cg-prospect-website-1.webp"
                  height="637"
                  width="448"
                  alt="ideology work"
                  lazyOff={true}
                />
              </Link>
            </div>
            <div className="box-informations-cnt">
              <div className="box__width">
                <span className="small-font box-subtitle">
                  03 / {t('common:stuff-4')}
                  <br />
                </span>
                <Link className="medium-font box-title"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} href="/stuff/cg-prospect" passHref>
                  CG Prospect
                </Link>
                <ul>
                  <li>
                    {t('common:box-list')}
                    {t('common:box-list-dev-2')}, UI/UX Designer,{' '}
                    {t('common:box-list-mod')}
                  </li>
                  <li>
                    {t('common:box-list-2')}React (Next.js), MongoDB, CSS,
                    MetaShape
                  </li>
                  <li>2021 / {t('common:box-list-3')}</li>
                </ul>
                <div className="box-link-cnt">
                  <Link onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="btn-small box-link" href="/stuff/cg-prospect" passHref>
                    {t('common:stuff')}
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
