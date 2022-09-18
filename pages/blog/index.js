/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useRef } from "react";
import BlogPost from "../../components/Blog/BlogPost";

function Blog() {
  const [showAll, setShowAll] = useState(true);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);

  return (
    <div className="blog">
      <div className="blog__filters">
        <button
          onClick={() => [
            setShowAll(true),
            setShowSnippets(false),
            setShowTutorials(false),
          ]}
        >
          All
        </button>
        <button
          onClick={() => [
            setShowAll(false),
            setShowTutorials(true),
            setShowSnippets(false),
          ]}
        >
          Tutorials
        </button>
        <button
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
              link="/"
              image="cg-prospect-website-1.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                      They can massively increase the user interaction, and the
                      whole user experience on your website. Today, i want to
                      write about my method to display a 3D model in a Next.js
                      website, and make it visibile in your space thanks to the
                      Augmented reality."
              date="13 October, 2022"
            />
            <BlogPost
              link="/"
              image="scholz-und-volkmer-website-2.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                      They can massively increase the user interaction, and the
                      whole user experience on your website. Today, i want to
                      write about my method to display a 3D model in a Next.js
                      website, and make it visibile in your space thanks to the
                      Augmented reality."
              date="13 October, 2022"
            />
            <BlogPost
              link="/"
              image="scholz-und-volkmer-website-2.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                      They can massively increase the user interaction, and the
                      whole user experience on your website. Today, i want to
                      write about my method to display a 3D model in a Next.js
                      website, and make it visibile in your space thanks to the
                      Augmented reality."
              date="13 October, 2022"
            />
            <BlogPost
              link="/"
              image="scholz-und-volkmer-website-2.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                      They can massively increase the user interaction, and the
                      whole user experience on your website. Today, i want to
                      write about my method to display a 3D model in a Next.js
                      website, and make it visibile in your space thanks to the
                      Augmented reality."
              date="13 October, 2022"
            />
          </>
        ) : null}
        {showSnippets === true ? (
          <>
            <BlogPost
              link="/"
              image="cg-prospect-website-1.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                         They can massively increase the user interaction, and the
                         whole user experience on your website. Today, i want to
                         write about my method to display a 3D model in a Next.js
                         website, and make it visibile in your space thanks to the
                         Augmented reality."
              date="13 October, 2022"
            />
          </>
        ) : null}
        {showTutorials === true ? (
          <>
            <BlogPost
              link="/"
              image="scholz-und-volkmer-website-2.jpg"
              title="How to put a 3d model on a Next.js website"
              excerpt="           3D models are becoming more and more presents on websites.
                      They can massively increase the user interaction, and the
                      whole user experience on your website. Today, i want to
                      write about my method to display a 3D model in a Next.js
                      website, and make it visibile in your space thanks to the
                      Augmented reality."
              date="13 October, 2022"
            />
          </>
        ) : null}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  await waitload(2);
  return {
    props: { load: "load" }, // will be passed to the page component as props
  };
}

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default Blog;
