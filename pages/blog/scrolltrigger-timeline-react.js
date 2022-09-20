import React from "react";
import Head from "next/head";

function ScrollTlReact() {
  const snippetTitle = "How to use Scrolltrigger with timeline in React";
  const snippetExcerpt =
    "The following snippets allows you to use Gsap timeline with Scrolltrigger in React (Next.js)";
  const snippetDate = "09/20/2022";
  const snippetUrl = "/scrolltrigger-timeline-react";
  const snippetImport = `
  import React, { useRef, useEffect } from "react";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  `;

  const snippetImportSsr = `
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  `;

  const snippetRef = `
  <div ref={myRef}>
  </div>
  <img
     ref={mySecRef}
     src=""
     alt=""
    />
  `;

  const snippet = ` 
  gsap.registerPlugin(ScrollTrigger);

  const myRef = useRef(null);
  const mySecRef = useRef(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: myRef.current,
        start: "top top",
        end: "+=3500px bottom",
        scrub: true,
        pin: true,
      },
    });

    tl.to(myRef.current, {
      scale: 0.3,
    });
    tl.to(myRef.current, {
      x: "25%",
    });
    tl.fromTo(
      mySecRef.current,
      {
        opacity: 0,
      },
      { opacity: 1 }
    );
  });
  `;
  return (
    <>
      <Head>
        <title> {snippetTitle}</title>
        <meta name="description" content={snippetExcerpt} />
        <meta property="og:title" content={`Ivan Smiths - ${snippetTitle}`} />
        <meta property="og:description" content={`${snippetExcerpt}`} />
        <meta property="snippet:published_time" content={snippetDate} />
        <meta
          property="og:image"
          content={`https://www.ivansmiths.com/gsap-react.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`https://www.ivansmiths.com/gsap-react.png`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:url"
          content={`https://www.ivansmiths.com/blog/${snippetUrl}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta name="twitter:title" content={snippetTitle} />
        <meta name="twitter:description" content={snippetExcerpt} />
        <meta
          name="twitter:image"
          content="https://www.ivansmiths.com/react-gsap.png"
        />
      </Head>
      <div className="snippet blogpost__article-body-outer flex-center">
        <div className="blogpost__article-body ">
          <h1 className="medium-font">{snippetTitle}</h1>
          <pre className="blogpost__code">
            <code>{snippet}</code>
          </pre>
          <p>
            In the snippet above, i am referencing two elements as an example,
            but you can reference as many as you want, and add them accordingly
            to the Gsap timeline. Simply reference the elements in the DOM that
            you want to animate, and tweak the timeline as you prefer.
          </p>
          <pre className="blogpost__code">
            <code>{snippetRef}</code>
          </pre>
          <p>
            Make sure to import the React Hooks, Gsap and the Scrolltrigger
            plugin. If your react app is server side rendering (so if you are
            using Next.js, Gatsy, Remix, etc), you have to import it from the
            dist folder of the Scrolltrigger plugin.
          </p>
          <pre className="blogpost__code">
            <code>{snippetImport}</code>
          </pre>
          <pre className="blogpost__code">
            <code>{snippetImportSsr}</code>
          </pre>
        </div>
      </div>
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

export default ScrollTlReact;
