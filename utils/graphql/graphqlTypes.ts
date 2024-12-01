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

export type ApiResponseWorks = {
  works: Works[];
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

export type ApiResponseWorkPage = {
  works: WorkPage[];
};
