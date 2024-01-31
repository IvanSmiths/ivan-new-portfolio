export interface Work {
  slug: string;
  title: string;
  metaDescription: string;
  role: string;
  description: string[];
  mainImage: string;
  company: string;
  images?: string[];
  website: string;
  linkedin: string;
  stack: string[];
  dates: string[];
}

export const works: Work[] = [
  {
    slug: "td-cowen",
    title: "Ivan Smiths - TD Cowen",
    metaDescription: "meta description",
    company: "TD Cowen",
    role: "ui/ux frontend developer",
    description: [""],
    mainImage: "/images/td/mockup.jpg",
    website: "https://www.cowen.com/",
    linkedin: "https://www.linkedin.com/company/td-cowen-continental-europe/",
    dates: ["april 2023 -", "ongoing"],
    stack: ["Figma", "TypeScript", "Angular", "RxJs", "Prisma"],
    images: ["/public"],
  },
  {
    slug: "scholz-&-volkmer",
    title: "Ivan Smiths - Scholz & Volkmer",
    metaDescription: "meta description",
    company: "SCHOLZ & VOLKMER",
    role: "frontend developer",
    description: [""],
    mainImage: "/images/suv/mockup.jpg",
    website: "https://www.s-v.de/en/",
    linkedin: "https://www.linkedin.com/company/scholzvolkmer/",
    dates: ["marz 2022 -", "january 2023"],
    stack: ["TypeScript", "Vue (Nuxt)", "React (Next)", "Gsap"],
  },
  {
    slug: "ideology",
    title: "Ivan Smiths - Ideology",
    metaDescription: "meta description",
    company: "Ideology",
    role: "ui/ux designer",
    description: [""],
    mainImage: "/images/id/mockup.jpg",
    website: "https://www.ideology.it/",
    linkedin: "https://www.linkedin.com/company/ideology-creative-studio",
    dates: ["october 2020 -", "febraury 2022"],
    stack: ["Adobe XD", "CSS", "JavaScript", "PHP", "WordPress"],
  },
];
