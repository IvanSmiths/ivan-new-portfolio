import '../styles/globals.css';
import '../styles/style.scss';
import React, { useEffect, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import ScrollPercentage from '../components/ScrollPercentage';
import CursorManager from '../components/CursorManager';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import dynamic from 'next/dynamic';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <>
      <Menu />
      <Navbar />
      <AnimateSharedLayout>
        <CursorManager>
          <CustomCursor />
          <ScrollPercentage />
          <ThemeToggle />
          <div onClick={scrollToTop} className="scroll-to-top">
            {isVisible && <div onClick={scrollToTop}>{''}</div>}
          </div>
          <Contact />
          <Component {...pageProps} />
          <Footer />
        </CursorManager>
      </AnimateSharedLayout>
    </>
  );
}

export default MyApp;
