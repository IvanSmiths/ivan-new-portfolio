import { ElementNode, RichTextContent } from "@graphcms/rich-text-types";

export type Works = {
  id: string;
  slug: string;
  company: string;
  role: string;
  homeDescription: string;
  homeLogo: {
    url: string;
    height: number;
    width: number;
  };
  homeImage: {
    url: string;
    height: number;
    width: number;
  };
};

export type Projects = {
  id: string;
  slug: string;
  project: string;
  role: string;
  homeDescription: string;
  homeLogo: {
    url: string;
    height: number;
    width: number;
  };
  homeImage: {
    url: string;
    height: number;
    width: number;
  };
};

export type ApiResponseWorks = {
  data: {
    works: Works[];
  };
};

export type ApiResponseProjects = {
  data: {
    projects: Projects[];
  };
};

export type WorkPage = {
  id: string;
  slug: string;
  title: string;
  company: string;
  description: { raw: RichTextContent };
  date: string;
  role: string;
  homeDescription: string;
  metaDescription: string;
  worksDone: {
    works: { label: string; link: string }[];
  };
  linkedinLink: string;
  homeImage: {
    url: string;
    height: number;
    width: number;
    fileName: string;
  };
  websiteLink: string;
  stack: string;
  images: { raw: { children: ElementNode[] } };
};

export type ProjectPage = {
  id: string;
  slug: string;
  title: string;
  project: string;
  description: string;
  date: string;
  homeDescription: string;
  metaDescription: string;
  homeImage: {
    url: string;
    height: number;
    width: number;
    fileName: string;
  };
  websiteLink: string;
  images: { raw: { children: ElementNode[] } };
};

export type ApiResponseWorkPage = {
  data: {
    works: WorkPage[];
  };
};

export type ApiResponseProjectPage = {
  data: {
    projects: ProjectPage[];
  };
};