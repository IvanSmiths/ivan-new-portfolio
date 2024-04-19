import type { Metadata } from "next";
import About from "./components/About/About";
import Works from "./components/Works/Works";
import Footer from "./globalComponents/Footer/Footer";
import LoaderWrapper from "./components/Loader/LoaderWrapper";
import { getWorks } from "../utils/graphql";
import Hero from "./components/Hero/Hero";
import { homeSchema } from "../utils/Schemas";
import Blog from "./components/Blog/Blog";

export const metadata: Metadata = {
  title: "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden",
  description:
    "Ivan Smiths - Frontend UI/UX Developer - 3 years of experience. Seeking the limit. Currently at TD Cowen",
};

const Home = async () => {
  const works: Works[] = await getWorks();

  return (
    <>
      <Hero />
      <LoaderWrapper />
      <About />
      <Works works={works} />
      <Blog />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Footer />
    </>
  );
};

export default Home;
