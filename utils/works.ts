export interface Work {
    slug: string;
    title: string;
    description: string;
    job: string;
    mainImage: string;
    company: string;
    images?: string[];
    website: string;
    jobDescription: string;
    jobStack: string[];
    jobDates: string[];
    jobLinkedin: string;
}

export const works: Work[] = [
    {
        slug: "td-cowen",
        title: "Ivan Smiths - TD COWEN",
        description: "description",
        company: "TD COWEN",
        job: "ui/ux developer",
        images: ["/public"],
        mainImage: "/images/td/td-website-1.png",
        website: "https://www.cowen.com/",
        jobDates: ["febraury 2022 -", "january 2023"],
        jobStack: ["VUE.JS (NUXT.JS)", "REACT.JS (NEXT.JS)", "TYPESCRIPT", "GSAP"],
        jobLinkedin: "https://www.linkedin.com/company/td-cowen-continental-europe/",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        slug: "scholz-und-volkmer",
        title: "Ivan Smiths - SCHOLZ&VOLKMER",
        description: "description",
        company: "SCHOLZ&VOLKMER",
        job: "frontend developer",
        mainImage: "/images/suv/suv-website-1.png",
        website: "https://www.s-v.de/en/",
        jobDates: ["febraury 2022 -", "january 2023"],
        jobStack: ["VUE.JS (NUXT.JS)", "REACT.JS (NEXT.JS)", "TYPESCRIPT", "GSAP"],
        jobLinkedin: "https://www.linkedin.com/company/scholzvolkmer/",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        slug: "ideology-creative-studio",
        title: "Ivan Smiths - Ideology Creative Studio",
        description: "description",
        company: "Ideology Creative Studio",
        job: "ui/ux designer",
        images: ["/public"],
        mainImage: "/images/id/id-website-1.png",
        website: "https://www.ideology.it/",
        jobDates: ["febraury 2022 -", "january 2023"],
        jobStack: ["VUE.JS (NUXT.JS)", "REACT.JS (NEXT.JS)", "TYPESCRIPT", "GSAP"],
        jobLinkedin: "https://www.linkedin.com/company/ideology-creative-studio",
        jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
]
