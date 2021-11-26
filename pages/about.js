import React from 'react';
import SrcImage from '../components/SrcImage';
import { motion } from 'framer-motion';
import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title> Mind of a developer & eyes of a ui/ux designer.</title>
        <meta
          name="description"
          content="Web developer, i help business owner from Ragusa to increasing their clients, by the creation of profitable websites."
        />
      </Head>
      <header>
        <div className="about-title-cnt">
          <motion.h1 layoutId="about" className="big-font impact">
            Mind of a developer & eyes of a ui/ux designer.
          </motion.h1>
        </div>
      </header>
      <main>
        <section className="about-main-cnt">
          <div className="about-main-img-cnt">
            <SrcImage
              src="myself.png"
              webp="myself.webp"
              alt="image of me"
              height="500px"
              width="200px"
            />
          </div>
          <div className="about-main-subtitle-cnt flex-center">
            <h2 className="small-font">
              speed <br />
              security & <br />
              <em className="impact">INNOVATION</em>
            </h2>
          </div>
        </section>
        <section className="about-paragraph-cnt flex-center">
          <div>
            <p className="small-font">
              Web developer, i help business owner from Ragusa to increasing
              their clients, by the creation of profitable websites.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
