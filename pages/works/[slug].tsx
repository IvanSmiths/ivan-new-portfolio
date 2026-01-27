import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Details from "../../components/work-project/Details/Details";
import Images from "../../components/work-project/Images";
import PageTemplate from "../../components/work-project/PageTemplate";
import type { WorkProjectPage } from "../../utils/data/types";
import worksData from "../../utils/data/works";
import { generatePageMetadata } from "../../utils/marketing/seo/work-project/pageMetadata";
import { pageSchema } from "../../utils/marketing/seo/work-project/pageSchema";

interface WorkProps {
	entry: WorkProjectPage;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = (worksData as WorkProjectPage[]).map((work) => ({
		params: { slug: work.slug },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<WorkProps> = async ({ params }) => {
	const slug = params?.slug as string;
	const entry = worksData.find((work) => work.slug === slug);

	if (!entry) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			entry,
		},
	};
};

const Work: React.FC<WorkProps> = ({ entry }) => {
	const metadata = generatePageMetadata(
		entry.slug,
		worksData,
		"work",
		"Work Not Found",
	);

	return (
		<>
			<Head>
				<title>{String(metadata.title)}</title>
				<meta name="description" content={String(metadata.description || "")} />
				<meta property="og:title" content={String(metadata.title)} />
				<meta
					property="og:description"
					content={String(metadata.description || "")}
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`https://ivansmiths.com/works/${entry.slug}`}
				/>
				{Array.isArray(metadata.openGraph?.images) &&
					metadata.openGraph.images.map((image: any, index: number) => (
						<meta key={index} property="og:image" content={image.url} />
					))}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={String(metadata.title)} />
				<meta
					name="twitter:description"
					content={String(metadata.description || "")}
				/>
				<meta name="twitter:creator" content="@Ivansmiths" />
				{Array.isArray(metadata.twitter?.images) &&
					metadata.twitter.images.map((image: any, index: number) => (
						<meta key={index} name="twitter:image" content={image.url} />
					))}
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(pageSchema(entry, "works")),
					}}
				/>
			</Head>
			<PageTemplate
				entry={entry}
				schema={pageSchema(entry, "works")}
				renderContent={(work) => (
					<>
						<Details work={work} />
						<Images work={work} />
					</>
				)}
			/>
		</>
	);
};

export default Work;
