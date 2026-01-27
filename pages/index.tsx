import Head from "next/head";
import About from "../components/home/About/About";
import Expertise from "../components/home/Expertise/Expertise";
import Hero from "../components/home/Hero/Hero";
import LoaderWrapper from "../components/home/Loader/LoaderWrapper";
import Works from "../components/home/Works/Works";
import type { WorkProjectBase } from "../utils/data/types";
import worksData from "../utils/data/works";
import { description, keywords } from "../utils/marketing/seo/home/homeMetadata";
import { homeSchema } from "../utils/marketing/seo/home/homeSchema";

const title = "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience";

const Home = () => {
  const works: WorkProjectBase[] = worksData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ivan Smiths" />
        <meta property="og:url" content="https://ivansmiths.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@Ivansmiths" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
      </Head>
      <Hero />
      <LoaderWrapper />
      <About />
      <Works works={works} />
      <Expertise />
    </>
  );
};

export default Home;
