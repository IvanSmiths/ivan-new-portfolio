import Head from "next/head";
import BlogPost from "../../../utils/data/blog/add-open-graph-twitter-nextjs-app-router/index.mdx";
import { data, postSchema } from "../../../utils/data/blog/add-open-graph-twitter-nextjs-app-router/postMetadata";

const Page = () => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} key="desc" />
        <link rel="canonical" href={data.url} />
        <meta charSet="UTF-8" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.cover} />
        <meta property="og:image:alt" content={data.coverAlt} />
        <meta property="og:url" content={data.url} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.cover} />

        {/* Article Specific Tags */}
        <meta property="article:published_time" content={data.publishedAt} />
        <meta property="article:section" content={data.category} />
        {data.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        {/* Schema.org Tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      </Head>
      <BlogPost />
    </>
  );
};

export default Page;
