import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Work, works } from "../utils/works";
import Description from "../components/Work/Description";
import Images from "../components/Work/Images";
import React, { useEffect } from "react";
import Head from "next/head";

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface WorkPageProps {
  work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({ work }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{work.title}</title>
        <meta name="description" content={work.metaDescription} />
      </Head>
      <div className="grid">
        <Description work={work} />
        <Images work={work} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<WorkPageProps, Params> = async ({
  params,
}) => {
  await waitload(2.6);
  const slug = params?.slug;
  const work = works.find((work) => work.slug === slug);

  return {
    props: {
      work,
      load: "load",
    },
  };
};

function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 200));
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = works.map((work) => ({
    params: {
      slug: work.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default WorkPage;
