import { Ideology } from "./data/ideology";
import { Suv } from "./data/suv";
import { Td } from "./data/td";
import { Neugelb } from "./data/neugelb";
import { Test } from "./data/test";
import type { WorkCard, WorkProjectPage } from "./types";

export const worksBySlug: Record<string, WorkProjectPage> = {
  [Ideology.slug]: Ideology,
  [Suv.slug]: Suv,
  [Td.slug]: Td,
  [Test.slug]: Test,
  [Neugelb.slug]: Neugelb,
};

export const orderedSlugs = [Ideology.slug, Suv.slug, Td.slug, Neugelb.slug, Test.slug] as const;

export const worksPages = Object.values(worksBySlug);

export const worksCards: WorkCard[] = worksPages.map((w) => ({
  slug: w.slug,
  title: w.name,
  role: w.role,
  clients: w.worksDone?.map((x) => x.label) ?? [],
  image: w.homeImage.url,
  type: w.type,
  url: w.url,
}));
