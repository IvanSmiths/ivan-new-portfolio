import { blogsSchema } from "../../utils/Schemas";
import { blogMetadata } from "../../utils/metadata/blogMetadata";
import Blog from "../components/Blog/Blog";
import Header from "../crafts/components/Header";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";

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
