import React from "react";
import Head from "next/head";
import SuvTextImage from "../../components/SUV/SuvTextImage";
import SuvImageText from "../../components/SUV/SuvImageText";
import Footer from "../../components/Footer";
import SuvHero from "../../components/SUV/SuvHero";
import SuvDesc from "../../components/SUV/SuvDesc";
import SuvMobile from "../../components/SUV/SuvMobile";
import SuvTextBlock from "../../components/SUV/SuvTextBlock";

function ScholzUndVolkmer() {
  return (
    <>
      <Head>
        <title>Ivan Smiths | Scholz & Volkmer case studio</title>
        <meta
          name="description"
          content="Ivan Smiths | Scholz & Volkmer case studio. Frontend developer using Vue.js with Nuxt.js"
        />
        <meta
          property="og:description"
          content="Scholz & Volkmer case studio. Frontend developer using Vue.js with Nuxt.js"
        />
        <meta
          property="og:image"
          content="https://www.ivansmiths.com/scholz-und-volkmer-meta.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta
          name="twitter:title"
          content="Ivan Smiths | Scholz&Volkmer case studio"
        />
        <meta
          name="twitter:description"
          content="Scholz & Volkmer case studio. Frontend developer using Vue.js with Nuxt.js"
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/scholz-und-volkmer-meta.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of Scholz & Volkmer case studio"
        />
      </Head>
      <SuvHero />
      <SuvDesc />
      <SuvTextBlock />
      <SuvTextImage />
      <SuvMobile />
      <SuvImageText />
      <Footer link="stuff/ideology" />
    </>
  );
}

export default ScholzUndVolkmer;
