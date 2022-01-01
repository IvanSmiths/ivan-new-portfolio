import React, { useContext } from 'react';
import Link from 'next/link';
import { CursorContext } from '../CursorManager';
import { motion } from 'framer-motion';

const FooterIdeology = () => {
  // MOUSE ZOOM HANDLER //
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };
  return (
    <div className="footer-home-cnt flex-center">
      <Link href="/stuff/cg-prospect">
        <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.em
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="big-font"
          >
            cg prospect
          </motion.em>
        </a>
      </Link>
    </div>
  );
};

export default FooterIdeology;
