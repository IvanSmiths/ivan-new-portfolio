import "../styles/globals.css";
import "../styles/style.scss";
import React, { useEffect } from "react";
import CursorManager from "../components/CursorManager";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";
import Head from "next/head";
import PageTransition from "../components/PageTransition";

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
      <CursorManager>
        <PageTransition />
        <CustomCursor />
        <Navbar />
        <Component {...pageProps} />
      </CursorManager>
    </>
  );
}

export default MyApp;
