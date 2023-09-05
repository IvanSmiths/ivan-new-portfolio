export interface Work {
    title: string;
    description: string;
    images?: string[];
}

export const works: Work[] = [
    {
        title: "title-1",
        description: "description",
        images: ["/public"],
    }, {
        title: "title-2",
        description: "description",
    }, {
        title: "title-3",
        description: "description",
        images: ["/public"],
    },
]
