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
export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" }, // will be passed to the page component as props
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default ScholzUndVolkmer;
