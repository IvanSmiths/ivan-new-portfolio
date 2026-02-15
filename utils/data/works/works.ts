export type Work = {
  role: string;
  clients: string[];
  title: string;
  url: string;
  image: string;
};

export const works: Work[] = [
  {
    role: "Frontend",
    clients: ["Commerzbank"],
    url: "neugelb",
    title: "Neugelb",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943424/portfolio/neugelb/coba_dmqn8n.png",
  },
  {
    role: "Fullstack",
    clients: ["TD Cowen", "TD Security"],
    url: "td-cowen",
    title: "TD Cowen",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943287/portfolio/td/td_ep0igm.png",
  },
  {
    role: "Frontend",
    clients: ["Deutsche Bahn ", "Adidas", "Nike"],
    url: "scholz-und-volkmer",
    title: "Scholz & Volkmer",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1748080455/portfolio/suv/suv_on7eq5.png",
  },
  {
    role: "Design/Frontend",
    clients: ["Lemon Soda", "RE/MAX"],
    url: "ideology",
    title: "Ideology",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943460/portfolio/ideology/id_qmk79w.png",
  },
  {
    role: "Design/Frontend",
    clients: ["Lemon Soda", "RE/MAX"],
    url: "ideology",
    title: "Ideology",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1747943460/portfolio/ideology/id_qmk79w.png",
  },
];
