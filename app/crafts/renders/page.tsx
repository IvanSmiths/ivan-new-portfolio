import type { Metadata } from "next";
import { FC, ReactNode } from "react";
import { getRenders } from "../../../utils/fetch/getImages";
import { rendersMetadata } from "../../../utils/metadata/craftsMetadata";
import Navbar, { Position } from "../../../components/global/Navbar/Navbar";
import Filter, { Label } from "../../../components/crafts/Filter";
import Header from "../../../components/crafts/Header";
import Images from "../../../components/crafts/Images";
import { rendersHeaderProps } from "../../../components/crafts/headerProps";
import { rendersSchema } from "../../../utils/metadata/Schemas";
import Footer from "../../../components/global/Footer/Footer";

export const metadata: Metadata = rendersMetadata;

type RendersLayoutProps = {
  children?: ReactNode;
};

const RendersLayout: FC<RendersLayoutProps> = ({ children }) => (
  <>
    <Header
      h1={rendersHeaderProps.h1}
      h2={rendersHeaderProps.h2}
      paragraph={rendersHeaderProps.paragraph}
    />
    <Navbar position={Position.Fixed} />
    <Filter currentPage={Label.Renders} />
    {children}
    <Footer />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rendersSchema) }}
    />
  </>
);

const Renders: FC = async () => {
  try {
    const images = await getRenders();
    return (
      <RendersLayout>{images && <Images images={images} />}</RendersLayout>
    );
  } catch (error) {
    console.error("Failed to fetch renders:", error);
    return <RendersLayout />;
  }
};

export default Renders;
