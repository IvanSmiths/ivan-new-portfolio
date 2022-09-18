/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

function NextModel() {
  const articleTitle = "How to put a 3D model on a Next js website";
  const articleDescription = "How to put a model on a Next js website";
  const articleDate = "07/16/2022";
  const articleMainImage = "/cg-prospect-website-1.jpg";
  const articleUrl = "/3d-model-next-js";
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: `${articleTitle}`,
      image: `${articleMainImage}`,
      datePublished: `${articleDate}`,
      author: {
        "@type": "Person",
        name: "Ivan Smiths",
        url: "http://ivansmiths.com/about/",
      },
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  const mainImageOuterRef = useRef(null);
  const mainImageRef = useRef(null);
  const excerptRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainImageOuterRef.current,
        start: "top top",
        end: "+=2900px bottom",
        scrub: true,
        pin: true,
      },
    });

    tl.to(mainImageRef.current, {
      scale: 0.3,
    });
    tl.to(mainImageRef.current, {
      x: "25%",
    });
    tl.fromTo(
      excerptRef.current,
      {
        opacity: 0,
      },
      { opacity: 1 }
    );
  });
  return (
    <>
      <Head>
        <title> {articleTitle}</title>
        <meta name="description" content={articleDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Ivan Smiths - ${articleTitle}`} />
        <meta property="og:description" content={`${articleDescription}`} />
        <meta property="article:published_time" content={articleDate} />
        <meta
          property="og:image"
          content={`https://www.ivansmiths.com/${articleDescription}`}
        />
        <meta
          property="og:image:secure_url"
          content={`https://www.ivansmiths.com/${articleDescription}`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:url"
          content={`https://www.ivansmiths.com/blog/${articleUrl}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={articleMainImage} />
      </Head>
      <article className="blogpost">
        <h1 className="blogpost__title large-font upper impact">
          {articleTitle}
        </h1>
        <div ref={mainImageOuterRef} className="blogpost__main-imag-outer">
          <img
            ref={mainImageRef}
            className="blogpost__main-image"
            src={articleMainImage}
            alt="tutorial"
          />
          <p ref={excerptRef} className="blogpost__excerpt">
            <time dateTime={articleDate}>{articleDate}</time> <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sequi
            in error suscipit laudantium, culpa eius saepe pariatur tempore,
            quos est provident voluptates facere ut recusandae at, eveniet sint
            itaque.
          </p>
        </div>
      </article>
    </>
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

export default NextModel;
