import "../styles/globals.css";
import React, { useEffect } from "react";
import CursorManager from "../components/Global/Cursor/CursorManager";
import CustomCursor from "../components/Global/Cursor/CustomCursor";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
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
        <meta name="author" content="Ivan Smiths" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
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
          content="Ivan Smiths portfolio. React developer with 2 years of professional experience, based in Wiesbaden."
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/card.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of Ivan Smiths website"
        />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta name="application-name" content="Ivan Smiths Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <CursorManager>
        <CustomCursor />
        <Component {...pageProps} />
      </CursorManager>
    </>
  );
}

export default MyApp;
