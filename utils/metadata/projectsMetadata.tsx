import { Metadata } from "next";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Projects";
export const description: string =
  "Here I share all the new projects that are at least in a beta stage.";

export const projectsMetadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: `https://ivansmiths.com/projects`,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};
