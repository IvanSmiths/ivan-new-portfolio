export interface Work {
  slug: string;
  title: string;
  metaDescription: string;
  role: string;
  description: string[];
  company: string;
  images?: string[];
  website: string;
  linkedin: string;
  warning?: string;
  stack: string[];
  date: string;
}

export const works: Work[] = [
  {
    slug: "td-cowen",
    title: "Ivan Smiths - TD Cowen",
    metaDescription: "meta description",
    company: "TD Cowen",
    role: "UI/UX Frontend Developer",
    description: [
      "Develop and implement highly data-driven dashboard features using TypeScript to enhance user decision-making capabilities.",
      "Execute comprehensive testing for every added functionality using Cypress to ensure robustness and reliability.",
      "Completely redesigned the mobile app, focusing on intuitive user interfaces and seamless user experiences.",
      "Conduct user interviews to gather feedback and insights for refining existing features.",
    ],
    warning:
      "As the CRM is private and only the people working in TD are allowed to see it, I am not allowed to show any screenshots of the CRM.",
    website: "https://www.cowen.com/",
    linkedin: "https://www.linkedin.com/company/td-cowen",
    date: "april 2023 - ongoing",
    stack: ["TypeScript, ", "Angular, ", "RxJs, ", "Prisma, ", "Figma."],
  },
  {
    slug: "scholz-&-volkmer",
    title: "Ivan Smiths - Scholz & Volkmer",
    metaDescription: "meta description",
    company: "SCHOLZ & VOLKMER",
    role: "Frontend Developer",
    description: [
      "Provided mentorship and guidance to colleagues on utilising Next.js, facilitating their proficiency in the framework.",
      "Developed cutting-edge animations for Wmf, enhancing the brand's website with a distinctive user experience.",
      "Successfully migrated legacy JavaScript code to the latest ECMAScript standards, improving code efficiency and maintainability.",
      "Resolved a wide range of issues using TypeScript in conjunction with Next.js, ensuring robust type safe web applications.",
    ],
    website: "https://www.s-v.de/en/",
    linkedin: "https://www.linkedin.com/company/scholzvolkmer/",
    date: "Marz 2022 - January 2023",
    stack: [
      "TypeScript, ",
      "React, ",
      "Next.js, ",
      "Vue, ",
      "Gsap, ",
      "Docker.",
    ],
    images: [
      "/images/suv/scholz-und-volkmer-website-1.jpg",
      "/images/suv/scholz-und-volkmer-website-2.jpg",
      "/images/suv/scholz-und-volkmer-website-3.jpg",
      "/images/suv/scholz-und-volkmer-website-4.jpg",
      "/images/suv/scholz-und-volkmer-website-5.jpg",
    ],
  },
  {
    slug: "ideology-creative-studio",
    title: "Ivan Smiths - Ideology Creative Studio",
    metaDescription: "meta description",
    company: "Ideology Creative Studio",
    role: "UI/UX Designer",
    description: [
      "Awarded the design contract by LemonSoda over 15 competing companies, showcasing my design vision.",
      "Leveraged CSS extensively to create cohesive and visually appealing website styles across multiple projects.",
      "Revamped third-party plugins using PHP to ensure seamless compatibility with the selected WordPress theme, enhancing functionality and user experience.",
      "Elevated the SEO performance of the RE/MAX website, increasing monthly visitor traffic by 7% through strategic optimisation of JavaScript code and implementation of semantic HTML, as validated by their Google Analytics data.",
    ],
    website: "https://www.ideology.it/",
    linkedin: "https://www.linkedin.com/company/ideology-creative-studio",
    date: "October 2020 - February 2022",
    stack: ["Adobe XD, ", "CSS, ", "JavaScript, ", "PHP, ", "WordPress."],
    images: [
      "/images/id/ideology-website-1.jpg",
      "/images/id/ideology-website-2.jpg",
      "/images/id/ideology-website-3.jpg",
      "/images/id/ideology-website-4.png",
      "/images/id/ideology-website-5.png",
      "/images/id/ideology-website-6.png",
      "/images/id/ideology-website-7.png",
      "/images/id/ideology-website-8.png",
      "/images/id/ideology-website-9.png",
      "/images/id/ideology-website-10.png",
      "/images/id/ideology-website-12.png",
    ],
  },
];
