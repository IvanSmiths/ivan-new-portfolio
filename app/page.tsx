import type { Metadata } from "next";
import { getWorks } from "../utils/graphql";
import { Works } from "../utils/graphql/graphqlTypes";
import { homeMetadata } from "../utils/metadata/homeMetadata";
import { homeSchema } from "../utils/metadata/Schemas";
import Footer from "./components/global/Footer/Footer";
import HeroNew from "./components/home/Hero/HeroNew";
import OverlayNew from "./components/home/Loader/OverlayNew";
import LoaderWrapperNew from "./components/home/Loader/LoaderWrapperNew";
import AboutNew from "./components/home/About/AboutNew";
import WorksSection from "./components/home/Works/WorksSection";
import ExpertiseNew from "./components/home/Expertise/ExpertiseNew";

export const metadata: Metadata = homeMetadata;

const Home = async () => {
  const works: Works[] = await getWorks();

  return (
    <>
      <HeroNew />
      <OverlayNew />
      <LoaderWrapperNew />
      <AboutNew />
      <WorksSection works={works} />
      <ExpertiseNew />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </>
  );
};

export default Home;
