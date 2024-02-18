import React, { FC } from "react";
import type { Metadata } from "next";
import Header from "./components/Header";
import Text from "./components/Text";
import About from "./components/About";
import Works from "./components/Works";
import Navbar from "./globalComponents/Navbar";
import Footer from "./globalComponents/Footer";

export const metadata: Metadata = {
  title: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
  description:
    "Ivan Smiths - Frontend UI/UX Developer - 3 years of experience. Seeking the limit. Currently at TD Cowen",
};

const Home: FC = () => {
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

  return (
    <>
      <div className="min-h-[95vh]">
        <Header />
        <Text />
      </div>
      <Navbar />
      <About />
      <Works />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Footer />
    </>
  );
};

export default Home;
