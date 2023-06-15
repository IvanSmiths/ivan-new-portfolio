/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import Stuff from "../../components/HomePage/Stuff";

const Index = () => {
  return (
    <>
      <Head>
        <title>Ivan Smiths | All my works and projects</title>
        <meta
          name="description"
          content="All my works and projects, made all with React, Postgresql and Next,js."
        />
      </Head>
      <Stuff />
      <Footer link="/blog" />
    </>
  );
};

export default Index;
