import { useEffect, useState } from "react";
import Hero from "../components/HomePage/Hero";
import Loader from "../components/HomePage/Loader";
import Stuff from "../components/HomePage/Stuff";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Innovation from "../components/HomePage/Innovation";
import Footer from "../components/Footer";
import About from "../components/HomePage/About";

const Home = () => {
  let { t } = useTranslation();

  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setHasVisited({ hasVisitedBefore: false });
      localStorage.setItem("hasVisitedBefore", true);
    }
  }, []);

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "IvanSmiths",
    url: "https://www.ivansmiths.com",
    image: "https://www.ivansmiths.com/main-texture.jpg",
    description: "Frontend developer with 2 years of experience",
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
    headline: "Speed, security & INNOVATION",
    keywords: "next.js, wiesbaden, react.js, frontend developer",
    locationCreated: "Wiesbaden",
  };

  useEffect(() => {
    const onPageLoad = () => {
      
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <>
      {hasVisited ? (
        <Loader setHasVisited={setHasVisited} />
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
          <Innovation />
          <About />
          <Stuff />
          <Footer link={"about"} />
        </>
      )}
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
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Home;
