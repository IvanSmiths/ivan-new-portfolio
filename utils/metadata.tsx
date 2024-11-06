import { Metadata } from "next";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

const title: string =
  "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience";
const description: string =
  "Fullstack Developer with over 3 years of experience in building user-centered websites and applications for clients like Deutsche Bahn, R+V, Adidas, and WMF. Skilled in Next.js, TypeScript, and UX design, I enhances digital experiences through innovative, data-driven solutions and seamless functionality.";
const keywords: string[] = [
  "next.js",
  "react.js",
  "gsap",
  "frontend developer",
  "fullstack developer",
  "ui/ux developer",
  "wiesbaden",
];
const authors: Author[] = [
  { name: "Ivan Smiths", url: "https://ivansmiths.com" },
];
const generator: string = "Next.js";
const applicationName: string = "Ivan Smiths Portfolio";
const creator: string = "Ivan Smiths";
const robots: string = "index, follow";
const category: string = "Technology & Computing";

export const homeMetadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  authors: authors,
  generator: generator,
  applicationName: applicationName,
  creator: creator,
  publisher: creator,
  robots: robots,
  category: category,
  appleWebApp: {
    capable: true,
    title: title,
    statusBarStyle: "black-translucent",
  },
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
