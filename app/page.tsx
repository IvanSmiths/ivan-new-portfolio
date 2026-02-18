import type { Metadata } from "next";
import About from "../components/home/About/About";
import Expertise from "../components/home/Expertise/Expertise";
import Hero from "../components/home/Hero/Hero";
import LoaderWrapper from "../components/home/Loader/LoaderWrapper";
import Works from "../components/home/Works/Works";
import type { WorkProjectBase } from "../utils/data/types";
import worksData from "../utils/data/works";
import { homeMetadata } from "../utils/marketing/seo/home/homeMetadata";
import { homeSchema } from "../utils/marketing/seo/home/homeSchema";

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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </>
  );
};

export default Home;
