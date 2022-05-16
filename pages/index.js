import { useEffect, useState } from "react";
import Hero from "../components/HomePage/Hero";
import { motion } from "framer-motion";
import Loader from "../components/HomePage/Loader";
import Stuff from "../components/HomePage/Stuff";
import Head from "next/head";
import Marquee from "../components/HomePage/Marquee-innovation";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

const Home = () => {
  const Canvas = dynamic(() => import("../components/HomePage/Canvas"), {
    ssr: false,
  });
  let { t } = useTranslation();
  // LOADER  ANIMATION //
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  const [hasVisited, setHasVisited] = useState(false);
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setHasVisited({ hasVisitedBefore: false });
      localStorage.setItem("hasVisitedBefore", true);
    }
  }, []);

  const schemaData = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      name: "IvanSmiths",
      url: "https://www.ivansmiths.com",
      image: "https://www.ivansmiths.com/main-texture.jpg",
      description: `just another react developer`,
      brand: {
        "@type": "Brand",
        logo: "https://www.ivansmiths.com/logo-icon-white.svg",
      },
      sameAs: "https://www.ivansmiths.com",
      author: {
        "@type": "Person",
        name: "Ivan",
        familyName: "Smiths",
        url: "https://www.ivansmiths.com",
      },
      inLanguage: "en",
      copyrightYear: 2020,
      genre: "http://vocab.getty.edu/aat/300179434",
      headline: "speed, security & INNOVATION",
      keywords: "next.js, wiesbaden, react.js, frontend developer",
      locationCreated: "wiesbaden",
    },
  ];

  return (
    <>
      {loading ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <>
          <Head>
            <title> {t("home:title")}</title>
            <meta name="description" content={t("home:desc")} />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <meta
              name="msvalidate.01"
              content="4BBF8C331FF33E2E7BFD0EF4CDD32BEC"
            />
          </Head>
          <Hero />
          <div
            className="canvas-cnt-home"
            style={{ minHeight: "130vh", position: "relative" }}
          >
            <div className="background-innovation"></div>
            <Canvas />
          </div>
          <div className="innovation-cnt-home" style={{ display: "none" }}>
            <Marquee />
          </div>
          <Stuff />
        </>
      )}
    </>
  );
};

export default Home;
