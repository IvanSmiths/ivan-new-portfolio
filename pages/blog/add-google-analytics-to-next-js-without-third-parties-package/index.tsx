import Head from "next/head";
import { data } from "../../../utils/data/blog/add-google-analytics-to-next-js-without-third-parties-package/postMetadata";
import { generatePostMetadata } from "../../../utils/marketing/seo/blog/generatePostMetadata";

const { postMetadata, postSchema } = generatePostMetadata(data);

export default function BlogPost() {
	return (
		<>
			<Head>
				<title>{String(postMetadata.title)}</title>
				<meta name="description" content={String(postMetadata.description)} />
				<meta property="og:title" content={String(postMetadata.title)} />
				<meta
					property="og:description"
					content={String(postMetadata.description)}
				/>
				<meta property="og:type" content="article" />
				<meta property="og:site_name" content="Ivan Smiths" />
				<meta
					property="og:url"
					content={`https://ivansmiths.com/blog/add-google-analytics-to-next-js-without-third-parties-package`}
				/>
				<meta property="article:published_time" content={data.publishedAt} />
				<meta property="article:section" content={data.category} />
				{data.tags.map((tag) => (
					<meta key={tag} property="article:tag" content={tag} />
				))}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={String(postMetadata.title)} />
				<meta
					name="twitter:description"
					content={String(postMetadata.description)}
				/>
				<meta name="twitter:creator" content="@Ivansmiths" />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
					dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
				/>
			</Head>
			<div>
				{/* Blog post content will be rendered here */}
				<h1>{data.title}</h1>
				<p>{data.description}</p>
			</div>
		</>
	);
}
