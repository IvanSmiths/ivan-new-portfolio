import React, { useEffect } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import SuvHeader from "../../components/SUV/SuvHeader";
import SuvFirstSection from "../../components/SUV/SuvFirstSection";

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
      <SuvHeader />
      <SuvFirstSection />
    </>
  );
}
export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default ScholzUndVolkmer;
