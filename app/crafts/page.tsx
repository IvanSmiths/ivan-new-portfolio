import type { Metadata } from "next";
import { FC, ReactNode } from "react";
import { getImages } from "../../utils/fetch/getImages";
import { craftsMetadata } from "../../utils/metadata/craftsMetadata";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../../components/crafts/Header";
import Images from "../../components/crafts/Images";
import { craftsHeaderProps } from "../../components/crafts/headerProps";
import { craftsSchema } from "../../utils/metadata/Schemas";
import Footer from "../../components/global/Footer/Footer";

export const metadata: Metadata = craftsMetadata;

type CraftsLayoutProps = {
  children?: ReactNode;
};

const CraftsLayout: FC<CraftsLayoutProps> = ({ children }) => (
  <>
    <Header
      h1={craftsHeaderProps.h1}
      h2={craftsHeaderProps.h2}
      paragraph={craftsHeaderProps.paragraph}
    />
    <Navbar position={Position.Fixed} />
    <Filter currentPage={Label.All} />
    {children}
    <Footer />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(craftsSchema) }}
    />
  </>
);

const Crafts: FC = async () => {
  try {
    const images = await getImages();
    return <CraftsLayout>{images && <Images images={images} />}</CraftsLayout>;
  } catch (error) {
    console.error("Failed to fetch crafts images from database.");
    return <CraftsLayout />;
  }
};

export default Crafts;
