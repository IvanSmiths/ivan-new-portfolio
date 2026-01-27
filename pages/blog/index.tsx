import Head from "next/head";
import Blog from "../../components/blog/Blog";
import { blogsSchema } from "../../utils/marketing/seo/blogs/blogsSchema";

const title = "Ivan Smiths - Insights and Articles on Next.js, Tailwind CSS, and Frontend Development";
const description = "Explore blog posts on modern frontend technologies, including Next.js, Tailwind CSS, and advanced development techniques. Gain insights, tips, and tutorials to enhance your skills in building efficient, user-friendly web applications.";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ivan Smiths" />
        <meta property="og:url" content="https://ivansmiths.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@Ivansmiths" />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsSchema) }}
        />
      </Head>
      <div className="md:mt-3xl">
        <Blog />
      </div>
    </>
  );
}
