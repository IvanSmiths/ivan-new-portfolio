import { ElementNode, RichTextContent } from "@graphcms/rich-text-types";

export type GraphQLResponse<T> = {
  data: T;
  errors?: any[];
};

export type Image = {
  url: string;
  height: number;
  width: number;
  fileName?: string;
};

export type Logo = Omit<Image, "fileName">;

export type Works = {
  id: string;
  slug: string;
  company: string;
  role: string;
  homeDescription: string;
  homeLogo: Logo;
  homeImage: Image;
};

export type Projects = Omit<Works, "company"> & {
  project: string;
};

export type WorksDone = {
  label: string;
  link: string;
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
    works: WorksDone[];
  };
  linkedinLink: string;
  homeImage: Image;
  websiteLink: string;
  stack: string;
  images: { raw: { children: ElementNode[] } };
};

export type ProjectPage = Omit<
  WorkPage,
  "company" | "role" | "worksDone" | "stack" | "description"
> & {
  project: string;
  description: string;
};
