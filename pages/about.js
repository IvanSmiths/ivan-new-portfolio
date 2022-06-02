import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import Footer from "../components/Footer";
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
          <motion.h1 className="large-font impact">
            {t("about:title")}
          </motion.h1>
        </div>
      </header>
      <main>
        <section className="about-main-cnt">
          <ModelMe />
          <div className="about-main-works-cnt">
            <div className="about-presentation-cnt">
              <h2 className="tiny-font">{t("about:presentation")}</h2>
              <p className="small-font">
                {t("about:presentation-1")}
                <br />
                <br />
                {t("about:presentation-2")}
              </p>
            </div>
            <div className="about-presentation-cnt about-2">
              <h2 className="tiny-font">{t("about:stuff")}</h2>
              <ul>
                <Link href="/stuff/ideology">
                  <a>
                    <li className="small-font">{t("about:work")} - Ideology</li>
                  </a>
                </Link>
                <Link href="/stuff/cg-prospect">
                  <a>
                    <li className="small-font">
                      {t("about:project")} - CG Prospect
                    </li>
                  </a>
                </Link>
                <Link href="/stuff/old-portfolio">
                  <a>
                    <li className="small-font">
                      {t("about:project")} - Old Portfolio
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
            <div className="about-presentation-cnt about-2">
              <h2 className="tiny-font">{t("about:contact")}</h2>
              <h3 className="small-font">info@ivansmiths.com</h3>
            </div>
          </div>
        </section>
      </main>
      <Footer />
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
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default About;
