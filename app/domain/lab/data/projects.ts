export interface Experiment {
  title: string;
  description: string;
  category: string;
  year: number;
  link?: string;
  image: string;
  aspectRatio: "portrait" | "landscape";
}

export const projects: Experiment[] = [
  {
    title: "Hip Hop Archive",
    description:
      "A social account where I post daily throwbacks and sample studies about Hip Hop old school classics.",
    category: "Social",
    year: 2025,
    link: "https://www.tiktok.com/@hiphoparchiveofficial",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1772025649/portfolio/experiments/hip-hop-archive_rapabf.png",
    aspectRatio: "portrait",
  },
  {
    title: "ArtStation Gallery",
    description:
      "3D models I did over the years. Most of the hard surface are done in Blender, while the sculpts are sculpted in Zbrush. Most of the pieces are from 2018/2022",
    category: "3D Modeling",
    year: 2018,
    link: "https://www.artstation.com/ivansmiths",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1772025648/portfolio/experiments/3d-model_zok6ny.jpg",
    aspectRatio: "portrait",
  },
  {
    title: "Unsplash Gallery",
    description: "Collection of my best photos. Took with a Sony A7II, zoom lens 28-70mm.",
    category: "Photography",
    year: 2019,
    link: "https://unsplash.com/@ivansmiths",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1772025650/portfolio/experiments/photo_g0htpu.jpg",
    aspectRatio: "portrait",
  },
  {
    title: "YouTube dev channel",
    description: "YouTube channel where I post tutorials mostly about React, Next.js and Gsap.",
    category: "Social",
    year: 2022,
    link: "https://www.youtube.com/@ivansmithsdev",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1772025651/portfolio/experiments/youtube-channel_ow9p7p.png",
    aspectRatio: "landscape",
  },
];
