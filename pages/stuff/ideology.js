/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SrcImage from '../../components/SrcImage';
import Head from 'next/head';
import Marquee from '../../components/Marquee';
import { pageData } from '../../utils/sampleData';
import ProjectItem from '../../components/ProjectItem/ProjectItem';
import FooterIdeology from '../../components/Footers/FooterIdeology';
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
        <title>Ivan Smiths | Ideology case studio</title>
        <meta
          name="description"
          content="I have worked in Ideology for two years, and have used WebFlow in a production environment"
        />
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
              <motion.li layout="ideology-prologue" className="small-font">
                .{t('ideology:prologue')}
              </motion.li>
            </ul>
            <motion.h1 layoutId="ideology-title" className="big-font">
              Ideology
            </motion.h1>
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
              {t('ideology:type')}: <br />
              {t('ideology:type-2')}
            </li>
            <li>
              {t('ideology:year')}: <br />
              2020/2022
            </li>
            <li>
              {t('ideology:stack')}: <br />
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
                {t('ideology:web')}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <em className="small-font stuff-em">. {t('ideology:exposition')}</em>
          <h2 className="big-font">{t('ideology:exposition-2')}</h2>
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
      </div>
      <div className="rising-action-cnt skewElem">
        <em className="stuff-em">.{t('ideology:rising-action')}</em>
        <p>{t('ideology:rising-action-2')}</p>
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
          <p>{t('ideology:climax-2')}</p>
        </div>
      </main>
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
        <em className="stuff-em">. {t('ideology:falling-action')}</em>
        <p>{t('ideology:falling-action-2')}</p>
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
      </div>
      <div className="denouement-cnt skewElem">
        <em className="stuff-em">.{t('ideology:denouement')}</em>
        <h3 className="impact impact-large uppercase large-font">
          {t('ideology:denouement-2')}
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
        <h3 className="large-font">{t('ideology:credits')}</h3>
        <div className="credits-card-cnt flex-center">
          <ul className="credits-card">
            <li className="credits-card-title">Ideology</li>
            <li>
              {t('ideology:dev')}:{' '}
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
              {t('ideology:graphics')}:{' '}
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
              {t('ideology:videomaker')}:{' '}
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
              {t('ideology:illustrations')}:{' '}
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
              {t('ideology:photos')}:{' '}
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
              {t('ideology:dev')}:{' '}
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
              {t('ideology:graphics')}:{' '}
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
              {t('ideology:videomaker')}:{' '}
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
              {t('ideology:illustrations')}:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
              , {''}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ncherry_nf/"
              >
                NCherry
              </a>
            </li>
          </ul>
          <ul className="credits-card">
            <li className="credits-card-title">bionatur</li>
            <li>
              {t('ideology:dev')}:{' '}
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
              {t('ideology:graphics')}:{' '}
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
              {t('ideology:illustrations')}:{' '}
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
              {t('ideology:graphics')}:{' '}
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
              {t('ideology:videomaker')}:{' '}
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
              {t('ideology:illustrations')}:{' '}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/alessiaiacono1"
              >
                Alessia Iacono
              </a>
              , {''}
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ncherry_nf/"
              >
                NCherry
              </a>
            </li>
            <li>
              {t('ideology:photos')}:{' '}
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
