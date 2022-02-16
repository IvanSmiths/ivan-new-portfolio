import React from 'react';
import SrcImage from '../components/SrcImage';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ModelMe = dynamic(() => import('../components/About/ModelMe'), {
  ssr: false,
});

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
          <motion.h1 layoutId="about" className="large-font impact">
            Mind of a developer & eyes of a ui/ux designer.
          </motion.h1>
        </div>
      </header>
      <main>
        <section className="about-main-cnt">
          <ModelMe />
          <div className="about-main-works-cnt ">
            <p className="large-font impact">
              Ivan Smiths, web developer with 2 years of experience who uses
              React with Next.js.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
