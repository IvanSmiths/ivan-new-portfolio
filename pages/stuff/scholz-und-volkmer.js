import React, { useEffect, useState } from "react";
import Head from "next/head";
import SuvFirstSection from "../../components/SUV/SuvFirstSection";
import Footer from "../../components/Footer";
import FooterSimple from "../../components/FooterSimple";
import SuvGallery from "../../components/SUV/SuvGallery";
import SuvHero from "../../components/SUV/SuvHero";
import SuvDesc from "../../components/SUV/SuvDesc";

function ScholzUndVolkmer() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 500) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
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
      <SuvFirstSection />
      {isDesktop ? (
        <Footer link="stuff/ideology" />
      ) : (
        <FooterSimple text="Ideology" link="/stuff/ideology" />
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  await waitload(1);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 200));
}

export default ScholzUndVolkmer;
