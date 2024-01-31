import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Work, works } from "../utils/works";
import Description from "../components/Work/Description";
import React from "react";

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface WorkPageProps {
  work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({ work }) => {
  return (
    <>
      <Description work={work} />
    </>
  );
};

export const getStaticProps: GetStaticProps<WorkPageProps, Params> = async ({
  params,
}) => {
  await waitload(2);
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
