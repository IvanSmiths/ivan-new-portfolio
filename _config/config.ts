export const baseUrl: string = "https://www.ivansmiths.com";
export const siteName: string = "Ivan Smiths";

export const twitter = {
  twitterCreator: "@Ivansmiths",
  twitterCreatorId: "1303746727594405894",
};

export type LinkItem = {
  label: string;
  url: string;
};

export const internalRoutes: LinkItem[] = [
  { label: "Home", url: "/" },
  { label: "Works", url: "/works" },
  { label: "Projects", url: "/projects" },
  { label: "Blog", url: "/blog" },
  { label: "Crafts", url: "/crafts" },
];

export const socialLinks: LinkItem[] = [
  { label: "GitHub", url: "https://github.com/IvanSmiths" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ivan-fabbri" },
  { label: "YouTube", url: "https://youtube.com/@ivansmiths" },
  { label: "info@ivansmiths.com", url: "mailto:info@ivansmiths.com" },
];

export const worksSubRoutes: string[] = [
  "neugelb",
  "scholz-und-volkmer",
  "ideology",
];

export const projectsSubRoutes: string[] = [
  "cover-letter-builder-pro",
  "pika-prime",
];

export const craftsSubRoutes: string[] = ["photos", "renders"];
