/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Ok, this is embarassing.</title>
        <meta
          name="description"
          content="DAAAAAAMN how did you ened up here?!"
        />
      </Head>
      <div className="cnt-404 flex-center">
        <img src="/404-image.jpg" height="600" width="500" alt="404 image" />
        <Link href="/">
          <a>GTFOH BUTTON</a>
        </Link>
      </div>
    </>
  );
}
