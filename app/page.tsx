import type { Metadata } from "next";
import { homeMetadata } from "../utils/metadata/homeMetadata";
import { homeSchema } from "../utils/metadata/Schemas";
import About from "./components/home/About/About";
import Expertise from "./components/home/Expertise/Expertise";
import Hero from "./components/home/Hero/Hero";
import LoaderWrapper from "./components/home/Loader/LoaderWrapper";
import Overlay from "./components/home/Loader/Overlay";
import WorksSection from "./components/home/Works/WorksSection";
import { WorkBase } from "../utils/pages/types";
import Footer from "./components/global/Footer/Footer";
import worksData from "../utils/pages/works/works";

export const metadata: Metadata = homeMetadata;

const Home = () => {
  const works: WorkBase[] = worksData;

  return (
    <>
      <Hero />
      <Overlay />
      <LoaderWrapper />
      <About />
      <WorksSection works={works} />
      <Expertise />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </>
  );
};

export default Home;
