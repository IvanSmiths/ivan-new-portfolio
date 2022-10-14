/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import Head from "next/head";
import BlogPost from "../../components/Blog/BlogPost";
import { CursorContext } from "../../components/CursorManager";
import Footer from "../../components/Footer";

function Blog() {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  const [showAll, setShowAll] = useState(true);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);

  return (
    <>
      <Head>
        <title>Ivan Smiths`s Blog. I usually write about Next.js.</title>
        <meta
          name="description"
          content="From tutorials to snippets, i publish all my contant in this page"
        />
      </Head>
      <div className="blog">
        <div className="blog__filters">
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => [
              setShowAll(true),
              setShowSnippets(false),
              setShowTutorials(false),
            ]}
          >
            All
          </button>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => [
              setShowAll(false),
              setShowTutorials(true),
              setShowSnippets(false),
            ]}
          >
            Tutorials
          </button>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => [
              setShowSnippets(true),
              setShowAll(false),
              setShowTutorials(false),
            ]}
          >
            Snippets
          </button>
        </div>
        <main className="blog__posts">
          {showAll === true ? (
            <>
              <BlogPost
                link="/blog/3d-model-react-nextjs"
                image="/nextjs-3d-model-2.jpg"
                title="How to put a 3d model on a Next.js website"
                excerpt="Today, i want to write about my method to display a 3D model in a React/Next.js website, and make it visibile in your space thanks to the Augmented reality."
                date="20 September, 2022"
              />
              <BlogPost
                link="/blog/scrolltrigger-timeline-react"
                image="gsap-react.png"
                title="How to use Scrolltrigger with timeline in React"
                excerpt="The following snippets allows you to use Gsap timelines with Scrolltrigger in React (Next.js)"
                date="20 September, 2022"
              />
            </>
          ) : null}
          {showSnippets === true ? (
            <>
              <BlogPost
                link="/blog/scrolltrigger-timeline-react"
                image="gsap-react.png"
                title="How to use Scrolltrigger with timeline in React"
                excerpt="The following snippets allows you to use Gsap timelines with Scrolltrigger in React (Next.js)"
                date="20 September, 2022"
              />
            </>
          ) : null}
          {showTutorials === true ? (
            <>
              <BlogPost
                link="/blog/3d-model-react-nextjs"
                image="/nextjs-3d-model-2.jpg"
                title="How to put a 3d model on a Next.js website"
                excerpt="Today, i want to write about my method to display a 3D model in a React/Next.js website, and make it visibile in your space thanks to the Augmented reality."
                date="20 September, 2022"
              />
            </>
          ) : null}
        </main>
      </div>
      <Footer link={""} />
    </>
  );
}

export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" },
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Blog;
