import Description from "./components/Description";
import Images from "./components/Images";
import type { Metadata } from "next";
import Navbar, { Position } from "../../globalComponents/Navbar";
import Footer from "../../globalComponents/Footer";
import React from "react";
import { getWorksPage, WorkPage } from "../../../utils/graphql";

type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // @ts-ignore
  const product = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
      query Works() {
      works(where: {slug: "${params.slug}"}) {
      title
      metaDescription
    }
  }
  `,
      variables: {
        slug: params,
      },
    }),
  }).then((res) => res.json());
  return {
    title: product.data.works[0].title,
    description: product.data.works[0].metaDescription,
  };
}

export default async function Work({ params }) {
  const works: WorkPage[] = await getWorksPage(params.slug);
  return (
    <>
      <Navbar position={Position.FIXED} />
      {works.map((work: WorkPage) => (
        <div className="grid" key={work.id}>
          <Description work={work} />
          <Images work={work} />
        </div>
      ))}
      <Footer />
    </>
  );
}
