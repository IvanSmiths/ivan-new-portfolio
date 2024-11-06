import type { Metadata } from "next";
import { getWorks, Works } from "../utils/graphql";
import { homeMetadata } from "../utils/metadata/homeMetadata";
import { homeSchema } from "../utils/Schemas";
import About from "./components/About/About";
import Expertise from "./components/Expertise/Expertise";
import Hero from "./components/Hero/Hero";
import LoaderWrapper from "./components/Loader/LoaderWrapper";
import Overlay from "./components/Loader/Overlay";
import WorksSection from "./components/Works/WorksSection";
import Footer from "./globalComponents/Footer/Footer";

export const metadata: Metadata = homeMetadata;

const Home = async () => {
  const works: Works[] = await getWorks();

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
