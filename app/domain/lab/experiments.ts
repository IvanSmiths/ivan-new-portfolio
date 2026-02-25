export interface Experiment {
  title: string;
  description: string;
  category: string;
  year: number;
  link?: string;
  image: string;
  aspectRatio: "portrait" | "landscape";
}

export const experiments: Experiment[] = [
  {
    title: "Abstract Shapes",
    description: "An exploration of abstract geometric forms and their interactions.",
    category: "Digital Art",
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
  },
  {
    title: "Cyberpunk Cityscape",
    description: "A futuristic city rendered with vibrant neon lights.",
    category: "3D Render",
    year: 2024,
    link: "https://example.com/cyberpunk",
    image:
      "https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
  },
  {
    title: "Minimalist Architecture",
    description: "Capturing the beauty of modern minimalist buildings.",
    category: "Photography",
    year: 2022,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
  },
  {
    title: "Nature Macro",
    description: "Detailed close-ups of natural elements.",
    category: "Photography",
    year: 2023,
    link: "https://example.com/nature",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
  },
];
