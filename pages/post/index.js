import React from "react";
import PostCard from "../../components/Blog/PostCard";
import PostCategories from "../../components/Blog/PostCategories";
import Head from "next/head";
import { getPosts } from "../../utils/index";

const schemaData = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "IvanSmiths",
  url: "https://www.ivansmiths.com",
  image: "https://www.ivansmiths.com/main-texture.jpg",
  description: `React developer from Wiesbaden`,
  brand: {
    "@type": "Brand",
    logo: "https://www.ivansmiths.com/logo-icon-white.svg",
  },
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
  headline: "speed, security & INNOVATION",
  keywords: "next.js, wiesbaden, react.js, frontend developer",
  locationCreated: "wiesbaden",
};

function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Tutorials and guides about Next.js</title>
        <meta
          name="description"
          content="This is my personal blog, where i write tutorials and guides about Next.js and the React world in general"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <section className="blog-cnt">
        <main className="blog-posts-cnt">
          {posts.map((post, index) => (
            <PostCard key={post.node.title} post={post.node} />
          ))}
        </main>

        <PostCategories />
        {/* <PostWidget /> */}
      </section>
    </>
  );
}
export const getStaticProps = async (ctx) => {
  const posts = await getPosts();
  await waitload(2);
  return {
    props: {
      posts: posts,
      load: "load",
    },
  };
};

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 700));
}

export default Blog;
