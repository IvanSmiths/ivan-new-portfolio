import { FC, ReactNode } from "react";
import Filter, { Label } from "../../components/crafts/Filter";
import Header from "../global/header/Header";
import Footer from "../../components/global/Footer/Footer";

type GalleryPageProps = {
  children?: ReactNode;
  header: { h1: string; h2: string; paragraph: string };
  label: Label;
  schema: Record<string, any>;
};

const GalleryPage: FC<GalleryPageProps> = ({
  children,
  header,
  label,
  schema,
}) => (
  <>
    <Header {...header} />
    <Filter currentPage={label} />
    {children}
    <Footer />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  </>
);

export default GalleryPage;
