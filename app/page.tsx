import type { Metadata } from "next";
import { getWorks } from "../utils/graphql";
import { Works } from "../utils/graphql/graphqlTypes";
import { homeMetadata } from "../utils/metadata/homeMetadata";
import { homeSchema } from "../utils/metadata/Schemas";
import Footer from "./components/global/Footer/Footer";
import About from "./components/home/About/About";
import Expertise from "./components/home/Expertise/Expertise";
import Hero from "./components/home/Hero/Hero";
import LoaderWrapper from "./components/home/Loader/LoaderWrapper";
import Overlay from "./components/home/Loader/Overlay";
import WorksSection from "./components/home/Works/WorksSection";

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
