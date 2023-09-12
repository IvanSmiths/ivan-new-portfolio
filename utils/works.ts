import Context = gsap.Context;

export interface Revert extends gsap.Context {
    revert(): void;
}

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
    nextWorkTitle: string;
    nextWorkLink: string;
    scope: Context | string;
}

export const works: Work[] = [
    {
        slug: "td-cowen",
        title: "Ivan Smiths - TD COWEN",
        description: "description",
        company: "TD COWEN",
        job: "ui/ux developer",
        mainImage: "/images/td/mockup.jpg",
        website: "https://www.cowen.com/",
        jobDates: ["april 2023 -", "ongoing"],
        jobStack: ["Figma", "TypeScript", "Angular", "RxJs", "Observable Plot", "eCharts"],
        jobLinkedin: "https://www.linkedin.com/company/td-cowen-continental-europe/",
        jobDescription: "Working at the CRM currently used at one of the biggest bank in the world.",
        images: ["/public"],
        nextWorkTitle: "SCHOLZ & VOLKMER",
        nextWorkLink: "/scholz-und-volkmer",
        scope: "scope-0",
    },
    {
        slug: "scholz-und-volkmer",
        title: "Ivan Smiths - SCHOLZ & VOLKMER",
        description: "description",
        company: "SCHOLZ & VOLKMER",
        job: "frontend developer",
        mainImage: "/images/suv/mockup.jpg",
        website: "https://www.s-v.de/en/",
        jobDates: ["marz 2022 -", "january 2023"],
        jobStack: ["TypeScript", "Vue (Nuxt)", "React (Next)", "Gsap"],
        jobLinkedin: "https://www.linkedin.com/company/scholzvolkmer/",
        jobDescription: "Mission: Typesafety (and coding jawdropping animations with Gsap and ScrollTrigger).",
        nextWorkTitle: "Ideology Creative Studio",
        nextWorkLink: "/ideology-creative-studio",
        scope: "scope-1",
    },
    {
        slug: "ideology-creative-studio",
        title: "Ivan Smiths - Ideology Creative Studio",
        description: "description",
        company: "Ideology Creative Studio",
        job: "ui/ux designer",
        mainImage: "/images/id/mockup.jpg",
        website: "https://www.ideology.it/",
        jobDates: ["october 2020 -", "febraury 2022"],
        jobStack: ["Adobe XD", "CSS", "JavaScript", "PHP", "WordPress"],
        jobLinkedin: "https://www.linkedin.com/company/ideology-creative-studio",
        jobDescription: "Taking boring WordPress websites to the next level.",
        images: ["/public"],
        nextWorkTitle: "TD Cowen",
        nextWorkLink: "/td-cowen",
        scope: "scope-2",
    },
]
