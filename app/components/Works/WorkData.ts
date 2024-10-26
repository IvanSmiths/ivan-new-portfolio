export type Works = {
  text: string;
  image: string;
  id: string;
  class: string;
};

export const works: Works[] = [
  {
    id: "first",
    text: "Lorem ipsum dolor sit amet",
    image: "project-1.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 left-[30%]",
  },
  {
    id: "second",
    text: "Lorem ipsum dolor sit amet",
    image: "project-2.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 right-[30%]",
  },
  {
    id: "third",
    text: "Lorem ipsum dolor sit amet",
    image: "project-3.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 left-[30%]",
  },
];
