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
          content="Scholz & Volkmer case studio. Two years of experience as UI/UX Designer and frontend developer"
        />
      </Head>
      <SuvHeader />
      <SuvFirstSection />
    </>
  );
}

export default ScholzUndVolkmer;
