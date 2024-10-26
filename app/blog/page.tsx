import Blog from "../components/Blog/Blog";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import type { Metadata } from "next";
import Footer from "../globalComponents/Footer/Footer";
import Header from "../crafts/components/Header";

const title: string = "Ivan Smiths, all blog posts";
const description: string =
  "Blogposts about next.js, tailwind and other frontend technologies";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Ivan Smiths",
    url: `https://ivansmiths.com`,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@Ivansmiths",
    creatorId: "1303746727594405894",
  },
};

const headerProps = {
  h1: "Blog",
  h2: "All my blogposts",
  paragraph:
    "I write about frontend technologies, such as Next.js, Tailwind, and other frontend technologies.",
};

export default async function BlogPage() {
  return (
    <div className="mt-large">
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Blog />
      <Footer />
    </div>
  );
}
