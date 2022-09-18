/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

function NextModel() {
  const articleTitle = "How to put a model on a Next js website";
  const articleDescription = "How to put a model on a Next js website";
  const articleDate = "07/16/2022";
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: `${articleTitle}`,
      image: [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg",
      ],
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
      </Head>
      <article className="blogpost">
        <h1 className="blogpost__title large-font upper impact">
          {articleTitle}
        </h1>
        <div ref={mainImageOuterRef} className="blogpost__main-imag-outer">
          <img
            ref={mainImageRef}
            className="blogpost__main-image"
            src="/cg-prospect-website-1.jpg"
            alt=""
          />
          <p ref={excerptRef} className="blogpost__excerpt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sequi
            in error suscipit laudantium, culpa eius saepe pariatur tempore,
            quos est provident voluptates facere ut recusandae at, eveniet sint
            itaque.
          </p>
        </div>
        <time dateTime={articleDate}>{articleDate}</time>
      </article>
    </>
  );
}

export default NextModel;
