import type { Metadata } from "next";
import About from "./components/About/About";
import Works from "./components/Works/Works";
import Footer from "./globalComponents/Footer";
import LoaderWrapper from "./components/Loader/LoaderWrapper";
import { getWorks, WorkType } from "../utils/graphql";
import Overlay from "./components/Loader/Overlay";
import Hero from "./components/Hero/Hero";
import { homeSchema } from "../utils/Schemas";

export const metadata: Metadata = {
  title: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
  description:
    "Ivan Smiths - Frontend UI/UX Developer - 3 years of experience. Seeking the limit. Currently at TD Cowen",
};

const Home = async () => {
  const works: WorkType[] = await getWorks();

  return (
    <>
      <Overlay />
      <Hero />
      <LoaderWrapper />
      <About />
      <Works works={works} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Footer />
    </>
  );
};

export default Home;
