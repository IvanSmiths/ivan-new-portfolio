/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import BlogLink from "../../components/Blog/BlogLink";
import SrcImage from "../../components/SrcImage";
import Footer from "../../components/Footer";

function NextModel() {
  const articleTitle = "How to add 3d models on a Next.js website";
  const articleExcerpt =
    "Today, i want to write about my method to display a 3D model in a React/Next.js website, and make it visibile in your space thanks to the Augmented reality.";
  const articleDate = "09/20/2022";
  const articleMainImage = "/next-js-3d-model-ar.jpg";
  const articleUrl = "/3d-model-react-nextjs";
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

  const next = `npx create-next-app`;
  const model = `npm i @google/model-viewer`;
  const modelViewer = ` 
  import '@google/model-viewer';
  
  const ModelTree = () => {
    return (
      <div>
        <model-viewer
          src="3d-model.glb"
          camera-controls
          ar
          auto-rotate
          camera-orbit="-9.511deg 86.41deg 1.755m"
          poster="poster.png"
        ></model-viewer>
      </div>
    );
  };
  
  export default ModelTree;`;

  const importModel = `import styles from '../styles/Home.module.css';
   import dynamic from 'next/dynamic';
   const ModelTree = dynamic(
     () => {
       return import('../components/ModelTree');
     },
     { ssr: false }
   );
   
   export default function Home() {
     return (
       <div className={styles.container}>        
         <div>           
           <ModelTree />         
         </div>       
        </div>      
       );
   }`;

  gsap.registerPlugin(ScrollTrigger);

  const mainImageInnerRef = useRef(null);
  const mainImageRef = useRef(null);
  const excerptRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {


      let mm = gsap.matchMedia(),
        breakPoint = 500;

      mm.add(
        {
          isDesktop: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
        },
        (context) => {
          let { isDesktop } = context.conditions;
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainImageInnerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              pin: true,
            },
          });

          tl.to(mainImageRef.current, {
            scale: 0.3,
            opacity: isDesktop ? 1 : 0,
            ease: "power3",
          });

          tl.to(mainImageRef.current, {
            x: isDesktop ? "25%" : 0,
          });

          tl.fromTo(
            excerptRef.current,
            {
              opacity: 0,
            },
            { opacity: 1 }
          );

        }
      );
    })
    return () => ctx.revert();
  }, []);


  const opacityRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(opacityRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        delay: 0.5,
        duration: 1
      })
    })
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title> {articleTitle}</title>
        <meta name="description" content={articleExcerpt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Ivan Smiths - ${articleTitle}`} />
        <meta property="og:description" content={`${articleExcerpt}`} />
        <meta property="article:published_time" content={articleDate} />
        <meta
          property="og:image"
          content={`https://www.ivansmiths.com/${articleMainImage}`}
        />
        <meta
          property="og:image:secure_url"
          content={`https://www.ivansmiths.com/${articleMainImage}`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:url"
          content={`https://www.ivansmiths.com/blog/${articleUrl}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IvanSmiths" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleExcerpt} />
        <meta
          name="twitter:image"
          content={`https://www.ivansmiths.com/${articleMainImage}`}
        />
      </Head>
      <article className="blogpost">
        <h1 style={{opacity: 0}} ref={opacityRef} className="blogpost__title  upper impact">{articleTitle}</h1>
        <div className="blogpost__main-image-outer">
          <div ref={mainImageInnerRef} className="blogpost__main-image-inner">
            <div className="blogpost__main-image-inner-absolute">
              <div ref={mainImageRef} className="blogpost__main-image">
                <img
                  src={articleMainImage}
                  alt="tutorial"
                  width="1423px"
                  height="754px"
                />
              </div>
              <div ref={excerptRef} className="blogpost__excerpt">
                <time dateTime={articleDate}>{articleDate}</time> <br />
                <h2 className="bold medium-font">{articleExcerpt}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="blogpost__article-body-outer flex-center">
          <div className="blogpost__article-body ">
            <h3>Why you should have a 3D model on your React website</h3>
            <p>
              3D models are becoming more and more presents on websites. They
              can massively increase the user interaction, and the whole user
              experience on your website. Today, i want to write about my method
              on <strong> how to add a 3d model on a next.js website </strong>,
              and make it visibile in your space (if your phone supports
              augmented reality).
            </p>
            <h3>Get a 3D model</h3>
            <p>
              First, we need a 3D model, if you want to follow along,{" "}
              <BlogLink
                href="https://github.com/IvanSmiths/tutorial-nextjs-3d-model"
                text="check the complete repo"
              />{" "}
              of this guide and download the model from the public folder (is
              the only .glb file). Feel free to use whatever model you want,
              just make sure that the extension is .glb.
            </p>
            <h3>First steps with model-viewer</h3>
            <p>
              In order to display the 3d model, we are using model-viewer, an
              API from Google, that handles the display of the model, mouse
              interactions, augmented reality, and other really complex stuff
              out of the box.{" "}
              <BlogLink href="https://modelviewer.dev/" text="Go here" />,
              scroll down a bit. and click on Editor, then select your model.
              You should see it right away! Now we are ready to customize it.
            </p>
            <SrcImage
              alt="model viewer"
              scr="/next-js-3d.jpg"
              webp="/next-js-3d.webp"
              width="1423px"
              height="754px"
            />
            <p>
              From here, scroll down, enable &quot;Ar&quot; in order to enable
              augmented reality, then scroll a little bit more and disable the
              &quot;use custom&quot; check (this last one is just for
              customizing the progress bar and the button, in this tutorial we
              are keeping things simple).{" "}
            </p>
            <SrcImage
              scr="/nextjs-3d-model-2.jpg"
              webp="/nextjs-3d-model-2.webp"
              alt="3d model"
              width="715px"
              height="379px"
            />
            <p>
              In the other tabs on the right, you can customize the textures of
              the 3d model (this 3d model have 3 textures in it), or the scene
              it self, like the lightning, skybox and many others. But i do
              recommend to go in the second list, and clicking on &quot;generate
              poster&quot; button, then click on download poster. This will
              create an image, to display in the website, while the 3D model is
              till loading, in order to show at least something to the user.
              <br />
              <br />
              In addition to that, go in the next tab and click on auto-rotate,
              in order to make the 3d model auto rotating (you can also set the
              speed and go crazy with it!), so it doesn&quot;t feel like a plain
              image.
              <br />
              <br />
              Once you&quot;re finished to customize your 3d model, copy the
              model-viewer snippet somewhere, and get ready to finally write
              some code!
            </p>
            <h3>Create a Next.js boilerplate</h3>
            <p>
              Open your terminal and create a Next.js boilerplate with the
              command &quot;npx create-next-app&quot; (you need node and
              npm/yarn installed on your machine). Go into the folder, and
              install model-viewer itself. Then, put both the 3d model and the
              poster image inside the &quot;public&quot; folder.
            </p>
            <pre className="blogpost__code">
              <code>{next}</code>
            </pre>
            <pre className="blogpost__code">
              <code>{model}</code>
            </pre>
            <p>
              Create a folder called &quot;components&quot; in the root of the
              directory and inside of it, create a file called ModelTree.js. In
              here, import the package, create a function and put the snippet
              that we previosly saved from model-viewer.
            </p>
            <pre className="blogpost__code">
              <code>{modelViewer}</code>
            </pre>
            <p>
              In the case of the 3d model, we have to import it from the client
              dynamically in order to avoid the server side rendering, or
              we&quot;ll get an error.
            </p>
            <pre className="blogpost__code">
              <code>{importModel}</code>
            </pre>
            <p className="blogpost__last-paragraph">
              Now, we&quot;re ready to display our model. Go to the index.js
              file, and import the component. Notice that we need to import it
              with the dynamic import, and not as a regular component. Get rid
              of the footer, the head tag, and everything inside the main tag,
              then display the component as it would be normally. Et voilà! You
              have a <strong>3d model on your next js</strong> website. The 3d
              model shows perfectly, is fully responsive and ready to be seeing
              in your space thanks to the augmented reality. Now, it&quot;s just
              a 3d model in a blank page, soon i&quot;ll write about making a
              full functional landing page with 3d models.
            </p>
          </div>
        </div>
      </article>
      <Footer link="blog" />
    </>
  );
}

export default NextModel;
