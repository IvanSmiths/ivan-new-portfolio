<script lang="ts" setup>
import { useHead } from "#imports";

type SeoProps = {
  title: string
  description: string
  url?: string
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  publishedAt?: string
  category?: string
  tags?: string[]
  schema?: Record<string, any>
  twitterHandle?: string
}

const props = withDefaults(defineProps<SeoProps>(), {
  type: "website",
  tags: () => []
});

useHead({
  title: props.title,
  meta: [
    { name: "description", content: props.description },
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },

    // Open Graph
    { property: "og:type", content: props.type },
    { property: "og:title", content: props.title },
    { property: "og:description", content: props.description },
    props.image && { property: "og:image", content: props.image },
    props.imageAlt && { property: "og:image:alt", content: props.imageAlt },
    props.url && { property: "og:url", content: props.url },
    { property: "og:site_name", content: "Ivan Smiths" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: props.title },
    { name: "twitter:description", content: props.description },
    props.image && { name: "twitter:image", content: props.image },
    props.twitterHandle && {
      name: "twitter:creator",
      content: props.twitterHandle
    },

    // Article specific
    props.publishedAt && {
      property: "article:published_time",
      content: props.publishedAt
    },
    props.category && {
      property: "article:section",
      content: props.category
    },
    ...props.tags.map((tag) => ({
      property: "article:tag",
      content: tag
    }))
  ].filter(Boolean),

  link: props.url
      ? [{ rel: "canonical", href: props.url }]
      : [],

  script: props.schema
      ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(props.schema)
        }
      ]
      : []
});
</script>
