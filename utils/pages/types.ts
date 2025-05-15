export type Media = {
  url: string;
  height: number;
  width: number;
  fileName?: string;
};

export type Link = {
  label: string;
  link: string;
};

export type WorkProjectBase = {
  id: string;
  slug: string;
  name: string;
  homeImage: Media;
  role?: string;
  homeDescription?: string;
};

export type WorkProjectPage = WorkProjectBase & {
  title: string;
  description: string;
  metaDescription: string;
  images: string[];
  websiteLink: string;
  date?: string;
  worksDone?: { works: Link[] };
  linkedinLink?: string;
  stack?: string;
};
