import type { Metadata } from "next";
import { homeMetadata } from "../utils/seo/home/homeMetadata";
import { homeSchema } from "../utils/seo/Schemas";
import Expertise from "../components/home/Expertise/Expertise";
import Hero from "../components/home/Hero/Hero";
import LoaderWrapper from "../components/home/Loader/LoaderWrapper";
import Overlay from "../components/home/Loader/Overlay";
import WorksSection from "../components/home/Works/WorksSection";
import { WorkProjectBase } from "../utils/pages/types";
import Footer from "../components/global/Footer/Footer";
import worksData from "../utils/pages/works";

export const metadata: Metadata = homeMetadata;

const Home = () => {
  const works: WorkProjectBase[] = worksData;

  return (
    <>
      <Hero />
      <Overlay />
      <LoaderWrapper />
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
