export type Media = {
  url: string;
  height: number;
  width: number;
};

export type Link = {
  label: string;
  link: string;
};

export type WorkProjectBase = {
  slug: string;
  name: string;
  homeImage: Media;
  role: string;
  homeDescription?: string;
};

export type WorkProjectPage = WorkProjectBase & {
  title: string;
  type: "Work" | "Project";
  shortDescription: string;
  metaDescription: string;
  images: string[];
  websiteLink: string;
  date: string;
  description: string;
  worksDone?: Link[];
  linkedinLink?: string;
  stack: string[];
};
