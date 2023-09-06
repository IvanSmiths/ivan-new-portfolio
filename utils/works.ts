export interface Work {
    slug: string;
    title: string;
    description: string;
    job: string;
    mainImage: string;
    company: string;
    images?: string[];
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
    },
    {
        slug: "scholz-und-volkmer",
        title: "Ivan Smiths - SCHOLZ&VOLKMER",
        description: "description",
        company: "SCHOLZ&VOLKMER",
        job: "frontend developer",
        mainImage: "/images/suv/suv-website-1.png",
    },
    {
        slug: "ideology-creative-studio",
        title: "Ivan Smiths - Ideology Creative Studio",
        description: "description",
        company: "Ideology Creative Studio",
        job: "ui/ux designer",
        images: ["/public"],
        mainImage: "/images/id/id-website-1.png",
    },
]
