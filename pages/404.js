import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  useEffect(() => {
    document.body.classList.add("page__404");
    return () => {
      document.body.classList.remove("page__404");
    };
  });
  return (
    <>
      <Head>
        <title>Ok, this is embarassing.</title>
        <meta name="description" content="How did you ended up here?!" />
      </Head>
      <div className="page-404 flex-center">
        <h1 className="big-font impact">Ok, this is embarassing.</h1>
        <Link href="/">
          <a className="btn-small">home</a>
        </Link>
      </div>
    </>
  );
}
