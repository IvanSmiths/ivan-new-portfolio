import "../styles/globals.css";
import "../styles/style.scss";
import React, { useEffect, useState } from "react";
import { AnimateSharedLayout } from "framer-motion";
import ScrollPercentage from "../components/ScrollPercentage";
import CursorManager from "../components/CursorManager";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import dynamic from "next/dynamic";
import Contact from "../components/Contact";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import LanguageChange from "../components/LanguageChange";

const ThemeToggle = dynamic(() => import("../components/ThemeToggle"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Ivan Smiths" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ww.ivansmiths.com" />
        <meta
          property="og:title"
          content="Ivan Smiths | React developer portfolio"
        />
        <meta
          property="og:description"
          content="Ivan smiths's portfolio. React developer with 2 years of professional exprerience, based in Wisbaden."
        />
        <meta
          property="og:image"
          content="https://www.ivansmiths.com/card.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta
          name="twitter:title"
          content="Ivan Smiths | React developer portfolio"
        />
        <meta
          name="twitter:description"
          content="Ivan smiths's portfolio. React developer with 2 years of professional exprerience, based in Wisbaden."
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/card.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of ivan smiths's website"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d7f21d" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="#d7f21d" name="theme-color" />
        <meta name="application-name" content="Ivan Smiths's Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#d7f21d" />
      </Head>
      <Menu />
      <Navbar />
      <AnimateSharedLayout>
        <CursorManager>
          <CustomCursor />
          <ScrollPercentage />
          <ThemeToggle />
          <LanguageChange />
          <div onClick={scrollToTop} className="scroll-to-top">
            {isVisible && <div onClick={scrollToTop}>{""}</div>}
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
