import { Metadata } from "next";

const title: string = "Ivan Smiths - Photographies and Renders";
const description: string =
  "Step into my visual world, where moments come alive through a Sony full-frame mirrorless lens. This collection captures diverse scenes and creative renderings, showcasing my passion for photography and 3d modeling outside the coding world.";

export const craftsMetadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const rendersTitle: string =
  "Ivan Smiths - 3D Renders: Hard Surface Modeling & Sculpting";
const rendersDescription: string =
  "Explore my 3D renders, featuring detailed hard surface modeling and sculpting projects. This showcase my creativity and technical skills in 3D design, bringing intricate virtual models to life.";

export const rendersMetadata: Metadata = {
  title: rendersTitle,
  description: rendersDescription,
  openGraph: {
    title: rendersTitle,
    description: rendersDescription,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts/renders",
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};
