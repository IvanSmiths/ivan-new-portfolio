export interface Experiment {
  title: string;
  description: string;
  category: string;
  year: number;
  link: string;
  image: string;
  aspectRatio: "portrait" | "landscape";
  video?: string;
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
      "https://res.cloudinary.com/deino2cjx/image/upload/v1773750724/hharchive_tp0ezv_yvhi8m.jpg",
    video:
      "https://res.cloudinary.com/deino2cjx/video/upload/v1773749061/hip-hop-archive_lazlyy.mp4",
    aspectRatio: "portrait",
  },
  {
    title: "ArtStation Gallery",
    description:
      "3D models I did over the years. Most of the hard surface are done in Blender, while the sculpts are sculpted in ZBrush. Most of the pieces are from 2018/2022.",
    category: "3D Modeling",
    year: 2018,
    link: "https://www.artstation.com/ivansmiths",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1773750723/3d-model_zok6ny_1_qovcwc.jpg",
    aspectRatio: "portrait",
  },
  {
    title: "YouTube Music Channel",
    description: "Old YouTube channel where I used to post HipHop instrumentals and guitar covers.",
    category: "Social",
    year: 2015,
    link: "https://www.youtube.com/@ivansmiths1388",
    image:
      "https://res.cloudinary.com/deino2cjx/image/upload/v1773750724/Screenshot_2026-03-17_at_13.27.46_1_iv007w.jpg",
    video: "https://res.cloudinary.com/deino2cjx/video/upload/v1773147912/guitar_u6wnvh.mp4",
    aspectRatio: "landscape",
  },
  {
    title: "Unsplash Gallery",
    description: "Collection of my best photos, took with a Sony A7II, zoom lens 28-70mm.",
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
    image: "https://res.cloudinary.com/deino2cjx/image/upload/v1773748692/youtube_tcnmom.png",
    video: "https://res.cloudinary.com/deino2cjx/video/upload/v1773748692/youtube_vx8tqg.mp4",
    aspectRatio: "landscape",
  },
];
