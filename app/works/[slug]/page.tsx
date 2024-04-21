import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import { getWorksPage, WorkPage } from "../../../utils/graphql";
import Hero from "./components/Hero";
import Description from "./components/Description";
import Images from "./components/Images";
import { Metadata } from "next";
import { workSchema } from "../../../utils/Schemas";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work: WorkPage = await getWorksPage(params.slug);
  const ogImage = [
    {
      url: work.homeImage.url,
      width: work.homeImage.width,
      height: work.homeImage.height,
      alt: work.company,
    },
  ];
  return {
    title: work.title,
    description: work.metaDescription,
    openGraph: {
      title: work.title,
      type: "website",
      description: work.metaDescription,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: work.metaDescription,
      images: ogImage,
    },
  };
}

export default async function Work({ params }: Props) {
  const works: WorkPage = await getWorksPage(params.slug);
  return (
    <>
      <Navbar position={Position.Fixed} />
      <div className="grid">
        <Hero work={works} />
        <Description work={works} />
        <Images work={works} />
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workSchema(works)),
        }}
      />
    </>
  );
}
