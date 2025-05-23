import { blogsMetadata } from "../../utils/seo/blogs/blogsMetadata";
import Blog from "../../components/blog/Blog";
import { blogsSchema } from "../../utils/seo/blogs/blogsSchema";

export const metadata = blogsMetadata;

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
