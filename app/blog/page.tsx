import Blog from "../components/Blog/Blog";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import type { Metadata } from "next";

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

export default async function BlogPage() {
  return (
    <div className="mt-large">
      <Navbar position={Position.Fixed} />
      <Blog />
    </div>
  );
}
