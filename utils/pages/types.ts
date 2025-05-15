
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

export type WorkBase = {
  id: string;
  slug: string;
  company: string;
  role: string;
  homeImage: Media;
};

export type WorkPage = WorkBase & {
  title: string;
  description: string;
  date: string;
  metaDescription: string;
  worksDone: { works: Link[] };
  linkedinLink: string;
  websiteLink: string;
  stack: string;
  images: string[];
};

export type ProjectBase = {
  id: string;
  slug: string;
  project: string;
  homeDescription: string;
  homeImage: Media;
};

export type ProjectPage = ProjectBase & {
  title: string;
  description: string;
  metaDescription: string;
  websiteLink: string;
  images: string[];
  homeImage: Media;
};
