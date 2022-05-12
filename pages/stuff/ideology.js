/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Marquee from "../../components/Ideology/Marquee";
import { pageData } from "../../utils/sampleData";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import FooterIdeology from "../../components/Footers/FooterIdeology";
import IdCredits from "../../components/Ideology/IdCredits";
import IdHero from "../../components/Ideology/IdHero";
import IdInfo from "../../components/Ideology/IdInfo";
import IdExp from "../../components/Ideology/IdExp";
import IdRising from "../../components/Ideology/IdRising";
import IdFalling from "../../components/Ideology/IdFalling";
import IdClimax from "../../components/Ideology/IdClimax";
import IdDenouement from "../../components/Ideology/IdDenouement";

const Ideology = () => {
  // SKEW
  useEffect(() => {
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
      clamp = gsap.utils.clamp(-0.5, 0.5);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -2);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.5,
            ease: "circ",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  return (
    <>
      <Head>
        <title>Ivan Smiths | Ideology case studio</title>
        <meta
          name="description"
          content="Ideology case studio. Two years of experience as UI/UX Designer and frontend developer"
        />
      </Head>
      <IdHero />
      <IdInfo />
      <IdExp />
      <IdRising />
      <IdClimax />
      <IdFalling />
      <IdDenouement />
      <Marquee />
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container skewElem" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
      <IdCredits skewElem="skewElem" />
      <FooterIdeology />
    </>
  );
};

export default Ideology;
