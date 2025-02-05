import { ElementNode, RichTextContent } from "@graphcms/rich-text-types";

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
  homeLogo: Media;
  id: string;
  slug: string;
  company: string;
  role: string;
  homeDescription: string;
  homeImage: Media;
};

export type ApiResponseWorks = {
  works: (WorkBase & { homeLogo: Media })[];
};

export type WorkPage = WorkBase & {
  title: string;
  description: { raw: RichTextContent };
  date: string;
  metaDescription: string;
  worksDone: { works: Link[] };
  linkedinLink: string;
  websiteLink: string;
  stack: string;
  images: { raw: { children: ElementNode[] } };
};

export type ApiResponseWorkPage = {
  works: WorkPage[];
};

export type ProjectBase = {
  homeLogo: Media;
  id: string;
  slug: string;
  project: string;
  homeDescription: string;
  homeImage: Media;
};

export type ApiResponseProjects = {
  projects: (ProjectBase & { homeLogo: Media })[];
};

export type ProjectPage = ProjectBase & {
  title: string;
  description: string;
  metaDescription: string;
  websiteLink: string;
  images: { raw: { children: ElementNode[] } };
  homeImage: Media;
};

export type ApiResponseProjectPage = {
  projects: ProjectPage[];
};
