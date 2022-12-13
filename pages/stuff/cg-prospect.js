import React from "react";
import Head from "next/head";
import CgHero from "../../components/CgProspect/CgHero";
import Footer from "../../components/Footer";
import CgDesc from "../../components/CgProspect/CgDesc";
import CgImageText from "../../components/CgProspect/CgImageText";
import CgTextBlock from "../../components/CgProspect/CgTextBlock";

const CgProspect = () => {
  return (
    <>
      <Head>
        <title>Ivan Smiths | CG Prospect case studio</title>
        <meta
          name="description"
          content="CG Prospect case studio. A really, really fast website about 3d modeling coded with Next.js."
        />
        <meta
          property="og:description"
          content="CG Prospect case studio. A really, really fast website about 3d modeling coded with Next.js"
        />
        <meta
          property="og:image"
          content="https://www.ivansmiths.com/cg-prospect-website-1.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta
          name="twitter:title"
          content="Ivan Smiths | CG Prospect case studio"
        />
        <meta
          name="twitter:description"
          content="CG Prospect case studio. A really, really fast website about 3d modeling coded with Next.js"
        />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/cgprospect.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="preview of CG Prospect case studio"
        />
      </Head>
      <CgHero />
      <CgDesc />
      <CgTextBlock />
      <CgImageText />

      <Footer link="blog" />
    </>
  );
};
export async function getStaticProps(context) {
  await waitload(1);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 100));
}

export default CgProspect;
