import { WorkProjectPage } from "../types";

export const pikaPrime: WorkProjectPage = {
  type: "Project",
  slug: "pika-prime",
  name: "Pika Prime",
  role: "Frontend Developer",
  date: "March 2025 - Current",
  title: "Ivan Smiths - Cover Letter Builder Pro",
  description: [
    "Built a Pokémon card tracking platform that scrapes multiple shops daily using Playwright to monitor stock updates and new set releases.",
    "Automated scraping process to run once per day, ensuring up-to-date listings while minimizing server load.",
    "Displayed static data using TanStack Table for efficient sorting and filtering; also integrated a static blog powered by MDX for SEO-friendly content.",
  ],
  websiteLink: "https://www.pikaprime.com/",
  metaDescription:
    "Track the latest Pokémon card set releases and stock updates with Pika Prime. Our automated scraper checks top shops daily, displaying real-time data in a sortable table—featuring a static MDX blog for news and tips.",
  homeDescription: "Cover Letter Builder Pro",
  stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Docker"],
  images: [
    "https://res.cloudinary.com/deino2cjx/image/upload/v1747342590/portfolio/pikaprime/Screenshot_2025-05-15_at_22.55.27_orfhhh.png",
    "https://res.cloudinary.com/deino2cjx/image/upload/v1747342588/portfolio/pikaprime/Screenshot_2025-05-15_at_22.55.07_chlyqj.png",
    "https://res.cloudinary.com/deino2cjx/image/upload/v1747342587/portfolio/pikaprime/Screenshot_2025-05-15_at_22.54.42_r6k82d.png",
  ],
  homeImage: {
    url: "https://res.cloudinary.com/deino2cjx/image/upload/v1747998193/portfolio/pikaprime/pikaprime_mefbqo.png",
    height: 600,
    width: 420,
  },
};
