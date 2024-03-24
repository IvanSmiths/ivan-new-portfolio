import type { Metadata } from "next";
import Navbar, { Position } from "../../globalComponents/Navbar";
import Footer from "../../globalComponents/Footer";
import React from "react";
import { getWorksPage, WorkPage } from "../../../utils/graphql";
import Hero from "./components/Hero";
import Description from "./components/Description";

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
    title: product.data.works.title,
    description: product.data.works.metaDescription,
  };
}

export default async function Work({ params }) {
  const works: WorkPage = await getWorksPage(params.slug);
  return (
    <>
      <Navbar position={Position.FIXED} />
      <div className="grid">
        <Hero work={works} />
        <Description work={works} />
      </div>
      <Footer />
    </>
  );
}
