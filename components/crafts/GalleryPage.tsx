import { FC, ReactNode } from "react";
import Filter, { Label } from "../../components/crafts/Filter";

type GalleryPageProps = {
  children?: ReactNode;
  label: Label;
  schema: Record<string, any>;
};

const GalleryPage: FC<GalleryPageProps> = ({ children, label, schema }) => (
  <>
    <Filter currentPage={label} />
    {children}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  </>
);

export default GalleryPage;
