export const baseUrl: string = "https://www.ivansmiths.com";
export const siteName: string = "Ivan Smiths";

export const twitter = {
  twitterCreator: "@Ivansmiths",
  twitterCreatorId: "1303746727594405894",
} as const;

export type LinkItem = {
  label: string;
  url: string;
};

export const routes = {
  home: "/",
  works: "/works",
  blog: "/blog",
  crafts: "/crafts",
} as const;

export const worksSubRoutes = [
  "neugelb",
  "scholz-und-volkmer",
  "ideology",
] as const;

export const projectsSubRoutes = [
  "cover-letter-builder-pro",
  "pika-prime",
] as const;

export const craftsSubRoutes = ["photos", "renders"] as const;

export const internalRoutes: LinkItem[] = [
  { label: "Home", url: routes.home },
  { label: "Works", url: routes.works },
  { label: "Blog", url: routes.blog },
  { label: "Crafts", url: routes.crafts },
];

export const socialLinks: LinkItem[] = [
  { label: "GitHub", url: "https://github.com/IvanSmiths" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ivan-fabbri" },
  { label: "YouTube", url: "https://youtube.com/@ivansmiths" },
  { label: "info@ivansmiths.com", url: "mailto:info@ivansmiths.com" },
] as const;
