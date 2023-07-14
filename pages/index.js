import {useEffect, useState} from "react";
import Hero from "../components/HomePage/Hero";
import Loader from "../components/HomePage/Loader";
import Stuff from "../components/HomePage/Stuff";
import Head from "next/head";
import Innovation from "../components/HomePage/Innovation";
import Footer from "../components/Footer";
import About from "../components/HomePage/About";
import {useHoverStore} from "../utils/store";

const Home = () => {
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
    if (typeof window !== "undefined") {
      const loader = document.getElementById("homeLoader");
      if (loader) {
        loader.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hasVisited]);


  const {setScrollHint} = useHoverStore();

  setTimeout( () =>
      setScrollHint(false),4000
  )

  return (
    <>
      {hasVisited ? (
        <Loader setHasVisited={setHasVisited} />
      ) : (
        <>
          <Head>
            <title>React/Frontend developer from Wiesbaden</title>
            <meta name="description" content="React/Frontend developer & UI/UX designer with three years of experience, based and currently living in Wiesbaden" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <meta
              name="msvalidate.01"
              content="4BBF8C331FF33E2E7BFD0EF4CDD32BEC"
            />
          </Head>
          <div id="homeLoader"></div>
          <Hero />
          <Innovation />
          <About />
          <Stuff />
          <Footer link="stuff" />
        </>
      )}
    </>
  );
};

export default Home;
