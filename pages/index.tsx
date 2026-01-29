import { Seo } from "../components/global/seo";
import About from "../components/home/About/About";
import Expertise from "../components/home/Expertise/Expertise";
import Hero from "../components/home/Hero/Hero";
import LoaderWrapper from "../components/home/Loader/LoaderWrapper";
import Works from "../components/home/Works/Works";
import type { WorkProjectBase } from "../utils/data/types";
import worksData from "../utils/data/works";
import { url } from "../utils/marketing/seo/blog/blogMetadata";
import { description, title } from "../utils/marketing/seo/home/homeMetadata";
import { homeSchema } from "../utils/marketing/seo/home/homeSchema";

const Home = () => {
  const works: WorkProjectBase[] = worksData;

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={url}
        type="website"
        schema={homeSchema}
      />
      <Hero />
      <LoaderWrapper />
      <About />
      <Works works={works} />
      <Expertise />
    </>
  );
};

export default Home;
