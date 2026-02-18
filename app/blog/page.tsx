import type { Metadata } from "next";
import Blog from "../../components/blog/Blog";
import { blogsMetadata } from "../../utils/marketing/seo/blogs/blogsMetadata";
import { blogsSchema } from "../../utils/marketing/seo/blogs/blogsSchema";

export const metadata: Metadata = blogsMetadata;

export default function BlogPage() {
  return (
    <div className="md:mt-3xl">
      <Blog />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsSchema) }}
      />
    </div>
  );
}
