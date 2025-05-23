import { blogsSchema } from "../../utils/seo/Schemas";
import { blogMetadata } from "../../utils/seo/blog/blogMetadata";
import Blog from "../../components/blog/Blog";

export const metadata = blogMetadata;

export default function BlogPage() {
  return (
    <div className="md:mt-3xl">
      <Blog />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsSchema) }}
      />
    </div>
  );
}
