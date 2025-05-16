enum LinkItem {
  Home = "Home",
  Works = "Works",
  Projects = "Projects",
  Blog = "Blog",
  Crafts = "Crafts",
}

enum LinkUrl {
  Home = "/",
  Works = "/works",
  Projects = "/projects",
  Blog = "/blog",
  Crafts = "/crafts",
}

export type Links = {
  label: LinkItem;
  url: LinkUrl;
  dataCy?: Lowercase<LinkItem>;
};

export const internalLinks: Links[] = [
  { label: LinkItem.Home, url: LinkUrl.Home, dataCy: "home" },
  { label: LinkItem.Works, url: LinkUrl.Works, dataCy: "works" },
  { label: LinkItem.Projects, url: LinkUrl.Projects, dataCy: "projects" },
  { label: LinkItem.Blog, url: LinkUrl.Blog, dataCy: "blog" },
  { label: LinkItem.Crafts, url: LinkUrl.Crafts, dataCy: "crafts" },
];
