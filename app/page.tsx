import type { Metadata } from "next";
import About from "./components/About/About";
import LoaderWrapper from "./components/Loader/LoaderWrapper";
import { getWorks, Works } from "../utils/graphql";
import Hero from "./components/Hero/Hero";
import { homeSchema } from "../utils/Schemas";
import Overlay from "./components/Loader/Overlay";
import Footer from "./globalComponents/Footer/Footer";
import Expertise from "./components/Expertise/Expertise";
import WorksSection from "./components/Works/WorksSection";

const title: string = "Ivan Smiths, Frontend UI/UX Developer from Wiesbaden";
const description: string =
  "Ivan Smiths - Fullstack Developer - 3 years of experience. Seeking the limit.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: `https://ivansmiths.com`,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

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
