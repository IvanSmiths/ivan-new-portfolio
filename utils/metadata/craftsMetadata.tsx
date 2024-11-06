import { Metadata } from "next";

const craftsTitle: string = "Ivan Smiths - Photographies and Renders";
export const craftsDescription: string =
  "Step into my visual world, where moments come alive through a Sony full-frame mirrorless lens. This collection captures diverse scenes and creative renderings, showcasing my passion for photography and 3d modeling outside the coding world.";

export const craftsMetadata: Metadata = {
  title: craftsTitle,
  description: craftsDescription,
  openGraph: {
    title: craftsTitle,
    description: craftsDescription,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts",
  },
  twitter: {
    title: craftsTitle,
    description: craftsDescription,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const rendersTitle: string =
  "Ivan Smiths - 3D Renders: Hard Surface Modeling & Sculpting";
export const rendersDescription: string =
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
    title: rendersTitle,
    description: rendersDescription,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const photosTitle: string =
  "Ivan Smiths - Photographies: Capturing Moments & Inspirations";
export const photosDescription: string =
  "Discover my photographies, featuring images that capture personal passions and inspirations. Each photo reflects a unique perspective through the lens of a Sony full-frame mirrorless camera.";

export const photosMetadata: Metadata = {
  title: photosTitle,
  description: photosDescription,
  openGraph: {
    title: photosTitle,
    description: photosDescription,
    type: "website",
    siteName: "Ivan Smiths",
    url: "https://ivansmiths.com/crafts/photos",
  },
  twitter: {
    title: photosTitle,
    description: photosDescription,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};