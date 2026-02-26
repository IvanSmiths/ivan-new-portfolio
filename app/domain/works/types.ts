export type Media = { url: string; height: number; width: number };
export type Link = { label: string; link: string };

export type ImageGroup =
  | { layout: "single"; src: string }
  | { layout: "row"; src: [string, string] };

export type WorkProjectPage = {
  slug: string;
  name: string;
  homeImage: Media;
  role: string;

  title: string;
  type: "Work" | "Project";
  metaDescription: string;
  images: ImageGroup[];
  url: string;
  websiteLink: string;
  date: string;
  shortDescription: string;
  description: string;
  worksDone?: Link[];
  linkedinLink?: string;
  stack: string[];
};

export type WorkCard = {
  slug: string;
  title: string;
  role: string;
  clients: string[];
  image: string;
  type: "Work" | "Project";
  url: string;
};
