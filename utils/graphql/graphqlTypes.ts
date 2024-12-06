import { ElementNode, RichTextContent } from "@graphcms/rich-text-types";

export type Media = {
  url: string;
  height: number;
  width: number;
  fileName?: string;
};

type homeLogo = {
  url: string;
  height: number;
  width: number;
};

export type Link = {
  label: string;
  link: string;
};

export type WorkBase = {
  homeLogo: homeLogo;
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
