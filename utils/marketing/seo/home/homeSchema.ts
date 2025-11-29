import { description, keywords } from "./homeMetadata";

export const homeSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "IvanSmiths",
  url: "https://www.ivansmiths.com",
  image: "https://www.ivansmiths.com/home.png",
  description,
  sameAs: "https://www.ivansmiths.com",
  author: {
    "@type": "Person",
    name: "Ivan",
    familyName: "Smiths",
    url: "https://www.ivansmiths.com",
  },
  inLanguage: "en",
  copyrightYear: 2020,
  genre: "http://vocab.getty.edu/aat/300179434",
  headline: "Fullstack developer specialized in design and user experience.",
  keywords,
  locationCreated: "Wiesbaden",
};
