/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SrcImage from '../../components/SrcImage';
import Link from 'next/link';
import Head from 'next/head';
import Marquee from '../../components/Marquee';
import { pageData } from '../../utils/sampleData';
import ProjectItem from '../../components/ProjectItem/ProjectItem';
import FooterIdeology from '../../components/Footers/FooterIdeology';
import { CursorContext } from '../../components/CursorManager';

const Ideology = () => {
  // gsap.registerPlugin(ScrollTrigger);

  // const ref2 = useRef(null);

  // useEffect(() => {
  //   const element = ref2.current;
  //   gsap.fromTo(
  //     element.querySelector('#boxId'),
  //     {
  //       x: 0,
  //       opacity: 1,
  //     },
  //     {
  //       x: '-200vw',
  //       opacity: 1,
  //       ease: 'none',
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: element.querySelector('#boxId'),
  //         start: 'top top',
  //         end: 'bottom top',
  //         scrub: true,
  //         toggleClass: 'box-fixed',
  //       },
  //     }
  //   );
  // }, []);

  // SKEW
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.skewElem', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-0.4, 0.4);

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

  return (
    <>
      <Head>
        <title>Ivan Smiths | Ideology</title>
        <meta name="description" content="just another react developer" />
      </Head>
      <header className="stuff-s-header-cnt skewElem">
        <div className="stuff-s-header-image-cnt skewElem">
          <AnimatePresence>
            <picture>
              <motion.source
                layoutId="ideology-img-1"
                alt="image of a work"
                decoding="async"
                loading="lazy"
                height="600"
                width="400"
                srcSet="/ideology-website-mobile-4.webp"
                type="image/webp"
              />
              <motion.img
                layoutId="ideology-img-2"
                alt="image of a work"
                loading="lazy"
                decoding="async"
                src="/ideology-website-mobile-4.jpg"
                height="600"
                width="400"
              />
            </picture>
          </AnimatePresence>
        </div>
        <div className="stuff-s-header-info-cnt skewElem">
          <div className="stuff-s-header-info-layout">
            <ul className="stuff-s-header-info">
              <motion.li layout="ideology-stuff" className="small-font">
                work
              </motion.li>
              <motion.li layout="ideology-prologue" className="small-font">
                .prologue
              </motion.li>
            </ul>
            <motion.h1 layoutId="ideology-title" className="big-font">
              Ideology
            </motion.h1>
            <motion.h2 layoutId="ideology-play" className="small-font">
              webflow & frontend
            </motion.h2>
          </div>
        </div>
      </header>
      <section className="skewElem">
        <SrcImage
          src={'/ideology-website-2.jpg'}
          webp={'/ideology-website-2.webp'}
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
              Employee
            </li>
            <li>
              Year: <br />
              2020/2022
            </li>
            <li>
              Main technologies: <br />
              Webflow, Html, Css, <br /> JavaScript, WordPress
            </li>
            <li>
              Link: <br />
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                href="https://www.ideology.it"
                target="_blank"
                rel="noopener noreferrer nofollow"
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
          <h2 className="big-font">Make cool websites with WebFlow.</h2>
        </div>
      </div>

      <div className="exposition-website-1-cnt skewElem">
        <SrcImage
          src={'/ideology-website-3.jpg'}
          webp={'/ideology-website-3.webp'}
          height={'60%'}
          width={'60%'}
          alt={'image'}
          className={'exposition-website-1'}
        />
        {/* <div className="exposition-website-1">
        <SrcImage
        src={'/ideology-website-1.jpg'}
        webp={'/ideology-website-1.webp'}
        height={'auto'}
        width={'60%'}
        alt={'image'}
        />
        <SrcImage
        src={'/ideology-website-1.jpg'}
        webp={'/ideology-website-1.webp'}
        height={'auto'}
        width={'60%'}
        alt={'image'}
        />
      </div> */}
      </div>
      <div className="rising-action-cnt">
        <em className="stuff-em">.Rising action</em>
        <p>
          My mission was simple. Developing websites with WebFlow and adding css
          & Javascript code in order to avoid the inflexibility of some
          WordPress themes and plug-ins.
        </p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <SrcImage
          src={'/ideology-website-5.jpg'}
          webp={'/ideology-website-5.webp'}
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
            In the crisis moments, i also wrote some PHP code, despite my
            knowledge stops at arrays, i learned how to fix common bugs, or the
            infamous {`"`}white screen of death{`"`}.
          </p>
        </div>
      </main>
      {/* <section ref={ref2}>
        <div className="box-cnt" id="box-cnt">
          <div id="boxId" className="box">
            <div className="box1">
              <div className="box-image-title-cnt">
                <h2 className="big-font">IDEOLOGY</h2>
                <Link href="/stuff/ideology">
                  <a>
                    <picture>
                      <source
                        alt="image of a work"
                        decoding="async"
                        loading="lazy"
                        height="750"
                        width="600"
                        srcSet="/image.webp"
                        type="image/webp"
                      />
                      <img
                        alt="image of a work"
                        loading="lazy"
                        decoding="async"
                        src="/image.jpg"
                        height="750"
                        width="600"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
              <div className="box-info-cnt">
                <ul className="small-font">
                  <li>.01</li>
                  <li>work - employee</li>
                  <li>weblow & frontend</li>
                  <li>2020/2022</li>
                </ul>
                <Link href="/stuff/ideology">
                  <a className="medium-font impact">PLAY</a>
                </Link>
              </div>
            </div>
            <div className="box2">
              <div className="box-image-title-cnt">
                <h2 className="big-font">CG PROSPECT</h2>
                <picture>
                  <source
                    alt="image of a work"
                    decoding="async"
                    loading="lazy"
                    height="750"
                    width="600"
                    srcSet="/image.webp"
                    type="image/webp"
                  />
                  <img
                    alt="image of a work"
                    loading="lazy"
                    decoding="async"
                    src="/image.jpg"
                    height="750"
                    width="600"
                  />
                </picture>
              </div>
              <div>
                <ul>
                  <li>ajaj</li>
                  <li>ajaj</li>
                  <li>ajaj</li>
                </ul>
              </div>
            </div>
            <div className="box3">
              <div className="box-image-cnt">
                <picture>
                  <source
                    alt="image of a work"
                    decoding="async"
                    loading="lazy"
                    height="750"
                    width="600"
                    srcSet="/image.webp"
                    type="image/webp"
                  />
                  <img
                    alt="image of a work"
                    loading="lazy"
                    decoding="async"
                    src="/image.jpg"
                    height="750"
                    width="600"
                  />
                </picture>
              </div>
              <div className="box-informations-cnt">
                <h2 className="big-font">IDEOLOGY</h2>
                <ul>
                  <li>ajaj</li>
                  <li>ajaj</li>
                  <li>ajaj</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="box-cnt-2">
            <div className="box3-2">
              <div className="box-image-cnt">
                <picture>
                  <source
                    alt="image of a work"
                    decoding="async"
                    loading="lazy"
                    height="750"
                    width="600"
                    srcSet="/image.webp"
                    type="image/webp"
                  />
                  <img
                    alt="image of a work"
                    loading="lazy"
                    decoding="async"
                    src="/image.jpg"
                    height="750"
                    width="600"
                  />
                </picture>
              </div>
              <div className="box-informations-cnt">
                <h2 className="big-font">IDEOLOGY</h2>
                <ul>
                  <li>ajaj</li>
                  <li>ajaj</li>
                  <li>ajaj</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="climax-website-cnt skewElem">
        <ul className="climax-website">
          <li className="flex-center">
            <SrcImage
              src={'/ideology-website-mobile-4.jpg'}
              webp={'/ideology-website-mobile-4.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              src={'/ideology-website-mobile-7.jpg'}
              webp={'/ideology-website-mobile-7.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              src={'/ideology-website-mobile-6.jpg'}
              webp={'/ideology-website-mobile-6.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
        </ul>
        <ul className="climax-website climax-website-2">
          <li className="flex-center">
            <SrcImage
              src={'/ideology-website-mobile-5.jpg'}
              webp={'/ideology-website-mobile-5.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
          <li className="flex-center climax-website-margin">
            <SrcImage
              src={'/ideology-website-mobile-1.jpg'}
              webp={'/ideology-website-mobile-1.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
          <li className="flex-center">
            <SrcImage
              src={'/ideology-website-mobile-8.jpg'}
              webp={'/ideology-website-mobile-8.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </li>
        </ul>
      </div>
      <div className="falling-action-cnt skewElem">
        <em className="stuff-em">.falling action</em>
        <p>
          Working in one of the biggest studio of Ragusa taught me how to
          efficiently work and communicate in a team.
        </p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <SrcImage
          src={'/ideology-website-1.jpg'}
          webp={'/ideology-website-1.webp'}
          height={'500px'}
          width={'100%'}
          alt={'image'}
          className={'falling-action-website-1'}
        />
        {/* <div className="exposition-website-1">
        <SrcImage
        src={'/ideology-website-1.jpg'}
        webp={'/ideology-website-1.webp'}
        height={'auto'}
        width={'60%'}
        alt={'image'}
        />
        <SrcImage
        src={'/ideology-website-1.jpg'}
        webp={'/ideology-website-1.webp'}
        height={'auto'}
        width={'60%'}
        alt={'image'}
        />
      </div> */}
      </div>
      <div className="denouement-cnt skewElem">
        <em className="stuff-em">.denouement</em>
        <h3 className="impact impact-large uppercase large-font">
          I got production experince using WebFlow, WordPress and frontend in
          general.
        </h3>
      </div>
      <Marquee />
      <div className="gallery-container skewElem" id="gallery-container"></div>
      <section>
        <div className="main-container" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
          </ul>
        </div>
      </section>
      <section className="credits-cnt flex-center skewElem">
        <h3 className="large-font">Credits</h3>
        <div className="credits-card-cnt flex-center">
          <ul className="credits-card">
            <li className="credits-card-title">Ideology</li>
            <li>
              DEV CO-WORKERS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/iryna-sachko-319a54220"
              >
                Iryna Sachko
              </a>
            </li>
            <li>
              GRAPHICS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/simona-pulino-536539146"
              >
                Simona Pulino
              </a>
            </li>
            <li>
              VIDEOMAKER:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mr.peppeocchipinti/"
              >
                Mr. Peppe Occhipinti
              </a>
            </li>
            <li>
              ILLUSTRATIONS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
            </li>
            <li>
              PHOTOS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/irenenobile.fotografia/"
              >
                Irene Nobile
              </a>
            </li>
          </ul>
          <ul className="credits-card">
            <li className="credits-card-title">mabù</li>
            <li>
              DEV CO-WORKERS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/iryna-sachko-319a54220"
              >
                Iryna Sachko
              </a>
            </li>
            <li>
              GRAPHICS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/simona-pulino-536539146"
              >
                Simona Pulino
              </a>
            </li>
            <li>
              VIDEOMAKER:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mr.peppeocchipinti/"
              >
                Mr. Peppe Occhipinti
              </a>
            </li>
            <li>
              ILLUSTRATIONS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
            </li>
          </ul>
          <ul className="credits-card">
            <li className="credits-card-title">bionatur</li>
            <li>
              DEV CO-WORKERS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/iryna-sachko-319a54220"
              >
                Iryna Sachko
              </a>
              , {''}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/danielvello"
              >
                Daniel Vello
              </a>
            </li>
            <li>
              GRAPHICS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/simona-pulino-536539146"
              >
                Simona Pulino
              </a>
            </li>
            <li>
              ILLUSTRATIONS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
            </li>
            <li>
              PHOTOS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/irenenobile.fotografia/"
              >
                Irene Nobile
              </a>
            </li>
          </ul>
          <ul className="credits-card">
            <li className="credits-card-title">Base</li>
            <li>
              UI/UX:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/virginia-boncoraglio-6386091aa"
              >
                Virginia Boncoraglio
              </a>
            </li>
            <li>
              GRAPHICS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://it.linkedin.com/in/simona-pulino-536539146"
              >
                Simona Pulino
              </a>
            </li>
            <li>
              VIDEOMAKER:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mr.peppeocchipinti/"
              >
                Mr. Peppe Occhipinti
              </a>
            </li>
            <li>
              ILLUSTRATIONS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
            </li>
            <li>
              PHOTOS:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/irenenobile.fotografia/"
              >
                Irene Nobile
              </a>
            </li>
          </ul>
        </div>
      </section>
      <FooterIdeology />
    </>
  );
};

export default Ideology;
