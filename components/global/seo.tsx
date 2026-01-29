import Head from "next/head";

type SeoProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedAt?: string;
  category?: string;
  tags?: string[];
  schema?: Record<string, any>;
  twitterHandle?: string;
};

export const Seo = ({
                      title,
                      description,
                      url,
                      image,
                      imageAlt,
                      type = "website",
                      publishedAt,
                      category,
                      tags = [],
                      schema,
                      twitterHandle
                    }: SeoProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {url && <link rel="canonical" href={url} />}
    <meta charSet="UTF-8" />
    <meta name="robots" content="index, follow" />

    {/* Open Graph */}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
    {url && <meta property="og:url" content={url} />}
    <meta property="og:site_name" content="Ivan Smiths" />
    <meta name="twitter:creator" content="@Ivansmiths" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
    {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

    {/* Article Specific Tags */}
    {publishedAt && (
      <meta property="article:published_time" content={publishedAt} />
    )}
    {category && <meta property="article:section" content={category} />}
    {tags.map((tag) => (
      <meta property="article:tag" content={tag} key={tag} />
    ))}

    {/* Schema.org */}
    {schema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    )}
  </Head>
);
