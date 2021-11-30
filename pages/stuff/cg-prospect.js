/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SrcImage from '../../components/SrcImage';
import Head from 'next/head';
import FooterCgProspect from '../../components/Footers/FooterCgProspect';
import { CursorContext } from '../../components/CursorManager';
import useTranslation from 'next-translate/useTranslation';

const Ideology = () => {
  // SKEW
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-0.5, 0.5);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.5,
            ease: 'circ',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set('.skewElem', { transformOrigin: 'right center', force3D: true });
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  let { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Ivan Smiths | CG Prospect case studio</title>
        <meta
          name="description"
          content="I have built CG Prospect, in order to create the fastest website about 3d modeling."
        />
      </Head>
      <header className="stuff-s-header-cnt skewElem">
        <div className="stuff-s-header-image-cnt skewElem">
          <AnimatePresence>
            <picture>
              <motion.source
                layoutId="cg-prospect-img-1"
                alt="image of a work"
                decoding="async"
                loading="lazy"
                height="600"
                width="400"
                srcSet="/cgprospect.webp"
                type="image/webp"
              />
              <motion.img
                layoutId="cg-prospect-img-2"
                alt="image of a work"
                loading="lazy"
                decoding="async"
                src="/cgprospect.jpg"
                height="600"
                width="400"
              />
            </picture>
          </AnimatePresence>
        </div>
        <div className="stuff-s-header-info-cnt skewElem">
          <div className="stuff-s-header-info-layout">
            <ul className="stuff-s-header-info">
              <motion.li layout="cg-prospect-prologue" className="small-font">
                .{t('cg-prospect:prologue')}
              </motion.li>
            </ul>
            <motion.h1 layoutId="cg-prospect-title" className="big-font">
              CG Prospect
            </motion.h1>
          </div>
        </div>
      </header>
      <section className="skewElem">
        <SrcImage
          src={'/cg-prospect-website-1.jpg'}
          webp={'/cg-prospect-website-1.webp'}
          height={'600'}
          width={'100%'}
          alt={'image'}
          className={'single-stuff-main-image'}
        />
        <div className="stuff-s-quick-info-cnt">
          <span className="lines"></span>
          <ul className="small-font stuff-s-quick-info">
            <li>
              Type: <br />
              Project
            </li>
            <li>
              Year: <br />
              2021
            </li>
            <li>
              Main technologies: <br />
              Next.js, PostgreSql, Prisma <br /> Stripe, MailChimp
            </li>
            <li>
              Link: <br />
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                href="https://www.cgprospect.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <em className="small-font stuff-em">.exposition</em>
          <h2 className="big-font">Make the fastest website about 3D.</h2>
        </div>
      </div>

      <div className="exposition-website-1-cnt skewElem">
        <SrcImage
          src={'/cg-prospect-website-2.jpg'}
          webp={'/cg-prospect-website-2.webp'}
          height={'60%'}
          width={'60%'}
          alt={'image'}
          className={'exposition-website-1'}
        />
      </div>
      <div className="rising-action-cnt skewElem">
        <em className="stuff-em">.Rising action</em>
        <p>
          I decided to make CG Prospect for giving a home for the 3d models and
          textures that i create.
        </p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <SrcImage
          src={'/cg-prospect-website-3.jpg'}
          webp={'/cg-prospect-website-3.webp'}
          height={'500px'}
          width={'100%'}
          alt={'image'}
          className={'falling-action-website-1'}
        />
      </div>
      <main className="climax-cnt flex-center skewElem">
        <div className="climax">
          <em className="stuff-em">.climax</em>
          <p>
            The website is made with Next.js in the fronted, and using Prisma as
            a ORM using Postgresql. I use MailChimp as a newsletter and it is
            hosted on Vercel.
          </p>
        </div>
      </main>
      <div className="falling-action-website-1-cnt falling-action-cg skewElem">
        <SrcImage
          src={'/cg-prospect-website-4.jpg'}
          webp={'/cg-prospect-website-4.webp'}
          height={'500px'}
          width={'100%'}
          alt={'image'}
          className={'falling-action-website-1'}
        />
      </div>
      <div className="falling-action-cnt skewElem">
        <em className="stuff-em">.falling action</em>
        <p>
          The assets are totally free to download, so i decided to take
          donations, via Stripe, developing a form that let the user decide the
          import to donate.
        </p>
      </div>
      <div className="denouement-cnt skewElem">
        <em className="stuff-em">.denouement</em>
        <h3 className="impact impact-large uppercase large-font">
          By far is my biggest project.
        </h3>
      </div>
      <section className="credits-cnt flex-center skewElem">
        <h3 className="large-font">Credits</h3>
        <div className="credits-card-cnt flex-center">
          <ul className="credits-card">
            <li className="credits-card-title">3D softwares</li>
            <li>
              PHOTOGRAMMETRY:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.agisoft.com/"
              >
                Agisoft Metashape
              </a>
            </li>
            <li>
              RENDERING:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.blender.org/"
              >
                Blender
              </a>
            </li>
            <li>
              MESH CLEAN-UP:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://pixologic.com/"
              >
                Zbrush
              </a>
            </li>
            <li>
              BAKING:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://pixologic.com/"
              >
                Zbrush
              </a>
            </li>
          </ul>
        </div>
      </section>
      <FooterCgProspect />
    </>
  );
};

export default Ideology;
