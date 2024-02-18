import Description from "../../../components/Work/Description";
import { RichTextContent } from "@graphcms/rich-text-types";
import Images from "../../../components/Work/Images";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../../components/Global/Footer";
import React from "react";

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

export type Work = {
  id: string;
  slug: string;
  title: string;
  company: string;
  description: RichTextContent;
  date: string;
  role: string;
  linkedinLink: string;
  websiteLink: string;
  stack: string;
  images: RichTextContent;
};

type QueryResult = {
  works: Work[];
};

type Response = {
  data: QueryResult;
};

async function getWorks(slug: string): Promise<Work[]> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Works($slug: String!) {
          works(where: {slug: $slug}) {
            id
            slug
            company
            date
            description {
                raw
            }
            role
            linkedinLink
            websiteLink
            stack
            images {
              raw
            }
            }
          }
        `,
      variables: {
        slug: slug,
      },
    }),
  });
  const { data }: Response = await response.json();

  return data.works;
}

export default async function Work({ params }) {
  const works: Work[] = await getWorks(params.slug);
  return (
    <>
      <Navbar />
      {works.map((work: Work) => (
        <div className="grid" key={work.id}>
          <Description work={work} />
          <Images work={work} />
        </div>
      ))}
      <Footer />
    </>
  );
}
