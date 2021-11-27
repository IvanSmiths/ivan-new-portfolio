import Head from 'next/head';
import Link from 'next/link';

const Nextjs3dModelWebsite = () => {
  return (
    <>
      <Head>
        <title>How to put 3d a model on Next.js</title>
        <meta
          name="description"
          content="In this tutorial, we will see how to put a 3d model in a Next.js website. The 3d model will be visible in your space in augmented reality"
        />
        <meta
          property="og:title"
          content="How to put a 3d model on a Next.js website"
        />
        <meta
          property="og:description"
          content="In this tutorial, we will see how to put a 3d model, visible in augmented reality, in a Next.js website."
        />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="446" />
        <meta property="og:image:height" content="384" />
        <meta
          property="og:url"
          content="https://www.ivansmiths.com/it/3d-model-nextjs-website"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/yPY43j4/Immagine-2021-05-14-212905.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
      <main className="guide-cnt">
        <h1 className="big-font">
          The tutorial about adding a 3d model on a Next.js {''}
          <Link href="/post/3d-model-react-nextjs">
            <a>has been moved here.</a>
          </Link>
        </h1>
        <h2 className="small-font">sorry for the inconvenience.</h2>
      </main>
    </>
  );
};

export default Nextjs3dModelWebsite;
