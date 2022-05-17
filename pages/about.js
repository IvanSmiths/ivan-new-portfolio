import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
const ModelMe = dynamic(() => import("../components/About/ModelMe"), {
  ssr: false,
});

const About = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("about:title")}</title>
        <meta
          name="description"
          content="Web developer, i help business owner from Ragusa to increasing their clients, by the creation of profitable websites."
        />
      </Head>
      <header>
        <div className="about-title-cnt">
          <motion.h1 layoutId="about" className="big-font impact">
            {t("about:title")}
          </motion.h1>
        </div>
      </header>
      <main>
        <section className="about-main-cnt">
          <ModelMe />
          <div className="about-main-works-cnt ">
            <p className="large-font impact">{t("about:experience")}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" }, // will be passed to the page component as props
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 700));
}

export default About;
