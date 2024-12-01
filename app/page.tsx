import type { Metadata } from "next";
import { getWorks } from "../utils/graphql";
import { Works } from "../utils/graphql/graphqlTypes";
import { homeMetadata } from "../utils/metadata/homeMetadata";
import { homeSchema } from "../utils/metadata/Schemas";
import Footer from "./components/global/Footer/Footer";
import LoaderWrapper from "./components/home/loader/LoaderWrapper";
import Overlay from "./components/home/loader/Overlay";
import WorksSection from "./components/home/works/WorksSection";

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
