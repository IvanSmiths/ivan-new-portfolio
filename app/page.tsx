import type { Metadata } from "next";
import { homeMetadata } from "../utils/seo/home/homeMetadata";
import { homeSchema } from "../utils/seo/Schemas";
import Expertise from "../components/home/Expertise/Expertise";
import Hero from "../components/home/Hero/Hero";
import LoaderWrapper from "../components/home/Loader/LoaderWrapper";
import worksData from "../utils/pages/works";
import About from "../components/home/About/About";
import Works from "../components/home/Works/Works";
import { WorkProjectBase } from "../utils/pages/types";

export const metadata: Metadata = homeMetadata;

const Home = () => {
  const works: WorkProjectBase[] = worksData;

  return (
    <>
      <Hero />
      <LoaderWrapper />
      <About />
      <Works works={works} />
      <Expertise />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </>
  );
};

export default Home;
