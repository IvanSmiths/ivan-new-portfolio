import React from 'react';
import SrcImage from '../components/SrcImage';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  return (
    <>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
              autem, incidunt, vero accusantium cupiditate repellat tenetur id
              voluptatibus, iusto officiis dolorum architecto praesentium
              distinctio quae perferendis? <br /> <br /> Quo cumque sequi
              impedit perspiciatis! Asperiores quos animi nulla! Sint cupiditate
              natus, autem voluptate excepturi architecto est aliquid iste
              repudiandae, laudantium veritatis eaque laborum!
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
