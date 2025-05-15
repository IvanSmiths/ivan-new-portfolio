import { blogsSchema } from "../../utils/metadata/Schemas";
import { blogMetadata } from "../../utils/metadata/blogMetadata";
import Blog from "../../components/home/Blog/Blog";
import Header from "../../components/crafts/Header";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Footer from "../../components/global/Footer/Footer";

export const metadata = blogMetadata;

const headerProps = {
  h1: "Blog",
  h2: "All my blogposts",
  paragraph:
    "I write about frontend technologies, such as Next.js, Tailwind, and other frontend technologies.",
};

export default async function BlogPage() {
  return (
    <div className="md:mt-large">
      <Header
        h1={headerProps.h1}
        h2={headerProps.h2}
        paragraph={headerProps.paragraph}
      />
      <Navbar position={Position.Fixed} />
      <Blog />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsSchema) }}
      />
    </div>
  );
}
