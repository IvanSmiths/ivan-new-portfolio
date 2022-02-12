/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect, useRef } from 'react';
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

  const [work, setWork] = useState(`${t('ideology:work-hard')}`);

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
            <motion.h1 layoutId="ideology-title" className="impact big-font">
              Ideology
            </motion.h1>
          </div>
        </div>
      </header>

      <div className="info-cnt">
        <h2
          onMouseEnter={() => setWork(`${t('ideology:work-harder')}`)}
          onMouseLeave={() => setWork(`${t('ideology:work-hard')}`)}
          className="info-sticky"
        >
          {work}
        </h2>
        <ul>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font impact"
          >
            Tech
            <motion.em
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font serif"
            >
              - Webflow, WordPress, Html, Css, JavaScript
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font impact"
          >
            {t('ideology:type')}
            <motion.em
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font serif"
            >
              - {t('ideology:type-2')}
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font impact"
          >
            {t('ideology:year')}
            <motion.em
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font serif"
            >
              - 2021/2022
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font impact"
          >
            602,3
            <motion.em
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font serif"
            >
              {t('ideology:hours')}
            </motion.em>
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font impact"
          >
            17
            <motion.em
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="small-font serif"
            >
              {t('ideology:parties')}
            </motion.em>
          </motion.li>
        </ul>
        <div className="info-link">
          <motion.a
            target="_blank"
            rel="noreferrer noopener"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { y: 0, rotateZ: '0deg' },
              visible: { y: 0, rotateZ: '11deg' },
            }}
            className="big-font btn-big"
            href="https://www.ideology.it/"
          >
            Website
          </motion.a>
        </div>
      </div>

      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="small-font stuff-em"
          >
            . {t('ideology:exposition')}
          </motion.em>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="large-font impact uppercase"
          >
            {t('ideology:exposition-2')}
          </motion.h2>
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
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="stuff-em"
        >
          .{t('ideology:rising-action')}
        </motion.em>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {t('ideology:rising-action-2')}
        </motion.p>
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
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="stuff-em"
          >
            .climax
          </motion.em>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {t('ideology:climax-2')}
          </motion.p>
        </div>
      </main>
      <div className="climax-website-cnt skewElem">
        <ul className="climax-website">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={'/ideology-website-mobile-4.jpg'}
              webp={'/ideology-website-mobile-4.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={'/ideology-website-mobile-7.jpg'}
              webp={'/ideology-website-mobile-7.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={'/ideology-website-mobile-6.jpg'}
              webp={'/ideology-website-mobile-6.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
        </ul>
        <ul className="climax-website climax-website-2">
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={'/ideology-website-mobile-5.jpg'}
              webp={'/ideology-website-mobile-5.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center climax-website-margin"
          >
            <SrcImage
              src={'/ideology-website-mobile-1.jpg'}
              webp={'/ideology-website-mobile-1.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
          <motion.li
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex-center"
          >
            <SrcImage
              src={'/ideology-website-mobile-8.jpg'}
              webp={'/ideology-website-mobile-8.webp'}
              height={'130px'}
              width={'500px'}
              alt={'image'}
            />
          </motion.li>
        </ul>
      </div>
      <div className="falling-action-cnt skewElem">
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="stuff-em"
        >
          . {t('ideology:falling-action')}
        </motion.em>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {t('ideology:falling-action-2')}
        </motion.p>
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
        <motion.em
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="stuff-em"
        >
          .{t('ideology:denouement')}
        </motion.em>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="impact impact-large uppercase large-font"
        >
          {t('ideology:denouement-2')}
        </motion.h3>
      </div>
      <Marquee />
      <div className="gallery-container skewElem" id="gallery-container"></div>
      <section>
        <div className="main-container" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
      <section className="credits-cnt flex-center skewElem">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          className="large-font"
        >
          {t('ideology:credits')}
        </motion.h3>
        <div className="credits-card-cnt flex-center">
          <ul className="credits-card">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="credits-card-title"
            >
              Ideology
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
          </ul>
          <ul className="credits-card">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="credits-card-title"
            >
              mabù
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
          </ul>
          <ul className="credits-card">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="credits-card-title"
            >
              bionatur
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
          </ul>
          <ul className="credits-card">
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="credits-card-title"
            >
              Base
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
            <motion.li
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
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
            </motion.li>
          </ul>
        </div>
      </section>
      <FooterIdeology />
    </>
  );
};

export default Ideology;
