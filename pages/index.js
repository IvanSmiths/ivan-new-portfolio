import { useEffect, useState } from "react";
import Hero from "../components/HomePage/Hero";
import Loader from "../components/HomePage/Loader";
import Stuff from "../components/HomePage/Stuff";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Innovation from "../components/HomePage/Innovation";

const Home = () => {
  let { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
    return () => {
      document.querySelector("body").classList.remove("loading");
    };
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
      {loading && hasVisited ? (
        <Loader setLoading={setLoading} />
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
          <Stuff />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Home;
