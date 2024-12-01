import { Metadata } from "next";

const title: string =
  "Ivan Smiths - Portfolio of Fullstack and UI/UX Development Projects";
export const description: string =
  "Discover a diverse range of projects in UI/UX and Fullstack Development. Explore award-winning websites, high-traffic landing pages, and innovative e-commerce platforms crafted for clients like Deutsche Bahn, R+V, Adidas, and WMF.";

export const generateMetadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: `https://ivansmiths.com/works`,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};
