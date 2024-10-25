export type AccordionItem = {
  title: string;
  rotation: number;
  left: number;
  top: number;
  content: string;
};

export const accordionItems: AccordionItem[] = [
  {
    title: "Frontend",
    rotation: 10,
    left: 20,
    top: 30,
    content:
      "Mission type safety. I’ve crafted 20+ data-driven features using Angular, RxJS, and TypeScript, for one of the biggest banks in the world. Mentored colleagues on Next.js helped cut development time by 30%. I’m all about creating dynamic, fast, and user-centric experiences.",
  },
  {
    title: "Backend",
    rotation: -6,
    left: 40,
    top: 60,
    content:
      "Using PostgreSQL, Prisma, and Nest.js, I build solid backend systems that deliver. My work ensures data reliability, scalability, and the backend power to drive front-end engagement.",
  },
  {
    title: "Design",
    rotation: 8,
    left: 55,
    top: 35,
    content:
      "Armed with Figma and a knack for UX, I’ve designed 20+ websites that slaps. Interviewing users, my insights led to a checkout flow overhaul, slashing cart abandonment by 15%. Plus, I secured major contracts with innovative, user-centered designs that deliver both style and substance.",
  },
  {
    title: "Testing",
    rotation: -8,
    left: 70,
    top: 55,
    content:
      "Fear no more deploying on a friday. With Cypress, Playwright, and solid GitHub CI/CD setup knowledge, I ensure flawless and stable releases. My 40+ automated tests across the stack for TD Cowen cut post-launch issues by 30%, making every deployment solid, reliable, and user-ready.",
  },
];
