export interface Work {
    slug: string;
    title: string;
    description: string;
    company: string;
    images?: string[];
}

export const works: Work[] = [
    {
        slug: "td-cowen",
        title: "Ivan Smiths - TD COWEN",
        description: "description",
        company: "TD COWEN",
        images: ["/public"],
    },
    {
        slug: "scholz-und-volkmer",
        title: "Ivan Smiths - SCHOLZ&VOLKMER",
        description: "description",
        company: "SCHOLZ&VOLKMER",
    },
    {
        slug: "ideology-creative-studio",
        title: "Ivan Smiths - Ideology Creative Studio",
        description: "description",
        company: "Ideology Creative Studio",
        images: ["/public"],
    },
]
