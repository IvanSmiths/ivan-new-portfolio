import { Metadata } from "next";

const title: string =
  "Ivan Smiths - Insights and Articles on Next.js, Tailwind CSS, and Frontend Development";
const description: string =
  "Explore blog posts on modern frontend technologies, including Next.js, Tailwind CSS, and advanced development techniques. Gain insights, tips, and tutorials to enhance your skills in building efficient, user-friendly web applications.";

export const blogMetadata: Metadata = {
  title: title,
  description: description,
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
