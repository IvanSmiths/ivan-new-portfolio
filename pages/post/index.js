import React from 'react';
import PostCard from '../../components/Blog/PostCard';
import PostCategories from '../../components/Blog/PostCategories';
import PostWidget from '../../components/Blog/PostWidget';
import { getPosts } from '../../utils/index';

function Blog({ posts }) {
  return (
    <section className="blog-cnt">
      <main className="blog-posts-cnt">
        {posts.map((post, index) => (
          <PostCard key={post.node.title} post={post.node} />
        ))}
      </main>

      <PostCategories />
      {/* <PostWidget /> */}
    </section>
  );
}
export const getStaticProps = async (ctx) => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
