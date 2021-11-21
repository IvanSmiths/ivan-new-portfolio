/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { getPosts, getPostDetails } from '../../utils/index';
import PostCategories from '../../components/Blog/PostCategories';
import PostWidget from '../../components/Blog/PostWidget';
import moment from 'moment';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';
import SrcImage from '../../components/SrcImage';

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return 'loading';
  }

  const schemaData = [
    {
      '@context': 'https://schema.org/',
      '@type': 'Article',
      name: `${post.title}`,
      description: `${post.excerpt}`,
      headline: `${post.content.raw.children[1].children[0].text}`,
      image: `${post.image.url}`,
      datePublished: `${post.createdAt}`,
      dateModified: `${post.createdAt}`,
      articleBody: `${post.content.raw.children}`,
      articleSection: 'Tech',
      publisher: {
        '@type': 'Person',
        name: 'Ivan Smiths',
      },
      speakable: `${post.content.raw.children}`,
      keywords: `${post.title}, next.js, react.js`,
      mainEntityOfPage: `https://www.ivansmiths.com/post/${post.slug}.com`,
      author: {
        '@type': 'Person',
        name: 'Ivan Smiths',
        birthDate: '1993-09-16',
        birthPlace: {
          '@type': 'Place',
          address: 'Ragusa, Sicily, Italy',
        },
      },
      about: {
        '@type': 'CreativeWork',
        name: `${post.title}`,
      },
      contentReferenceTime: `${post.createdAt}`,
    },
    {
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      dependencies: 'React.js, Next.js',
      proficiencyLevel: 'Beginner',
    },
  ];
  console.log(post.content.raw.children);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <main className="single-post-cnt">
        <article className="post-cnt">
          <motion.h1
            layoutId={post.layoutid}
            className="impact impact-large large-font"
          >
            {post.title}
          </motion.h1>
          <div className="post-img-cnt">
            <SrcImage
              src={post.image.url}
              webp={post.imagewebp.url}
              height={500}
              width={500}
              alt={'image'}
            />
          </div>
          <div className="post-quick-info-cnt">
            <span className="lines"></span>
            <ul className="small-font post-quick-info">
              <li>
                Type: <br />
                {post.categories[0].name}
              </li>
              <li>
                Published: <br />
                <span> {moment(post.createdAt).format('MMM DD, YY')}</span>
              </li>
              <li>
                Author: <br />
                {post.author.name}
              </li>
              <li>
                Read time: <br />
                10 minutes (grab a beer)
              </li>
            </ul>
          </div>
          <div className="article-content-cnt">
            <RichText content={post.content.raw.children} />
          </div>
          {/* <PostWidget
            slug={post.slug}
            categories={post.categories.map((category) => category.slug)}
          />
          <PostCategories /> */}
        </article>
      </main>
    </>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
