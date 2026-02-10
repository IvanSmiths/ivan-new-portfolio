import { defineComponent, useSSRContext } from 'vue';
import { a as useHead } from './composables-DGuTFNfb.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Seo",
  props: {
    title: {},
    description: {},
    url: {},
    image: {},
    imageAlt: {},
    type: { default: "website" },
    publishedAt: {},
    category: {},
    tags: { default: () => [] },
    schema: {},
    twitterHandle: {}
  },
  setup(__props) {
    const props = __props;
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
      link: props.url ? [{ rel: "canonical", href: props.url }] : [],
      script: props.schema ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(props.schema)
        }
      ] : []
    });
    return () => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Seo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Seo = Object.assign(_sfc_main, { __name: "Seo" });

export { Seo as default };
//# sourceMappingURL=Seo-CrGYVO9U.mjs.map
