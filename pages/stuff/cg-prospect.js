/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import FooterCgProspect from "../../components/Footers/FooterCgProspect";
import CgHero from "../../components/CGProspect/CgHero";
import CgInfo from "../../components/CGProspect/CgInfo";
import CgExp from "../../components/CGProspect/CgExp";
import CgRising from "../../components/CGProspect/CgRising";
import CgClimax from "../../components/CGProspect/CgClimax";
import CgFalling from "../../components/CGProspect/CgFalling";
import CgDenouement from "../../components/CGProspect/CgDenouement";
import CgCredits from "../../components/CGProspect/CgCredits";

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
        <title>Ivan Smiths | CG Prospect case studio</title>
        <meta
          name="description"
          content="I have built CG Prospect, in order to create the fastest website about 3d modeling."
        />
      </Head>
      <CgHero />
      <CgInfo />
      <CgExp />
      <CgRising />
      <CgClimax />
      <CgFalling />
      <CgDenouement />
      <CgCredits />
      <FooterCgProspect />
    </>
  );
};

export default Ideology;
