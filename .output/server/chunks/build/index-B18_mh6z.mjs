import { defineComponent, ref, mergeProps, resolveDirective, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-Dk7IsXAh.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useSeoMeta } from './composables-DGuTFNfb.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const hoveredCompany = ref(null);
    const plusPositions = [
      "top-0 -left-1",
      "top-0 -right-1",
      "bottom-0 -left-1",
      "bottom-0 -right-1"
    ];
    const logos = [
      { src: "coba-logo.png", name: "Commerzbank", slug: "neugelb" },
      { src: "td-cowen.svg", name: "TD COWEN", slug: "td-cowen" },
      { src: "remax-logo.png", name: "re/max", slug: "ideology" },
      { src: "suv-logo.png", name: "Scholz & Volkmer", slug: "scholz-und-volkmer" },
      { src: "adidas-logo.svg", name: "Adidas", slug: "scholz-und-volkmer" },
      { src: "db-logo.svg", name: "Deutsche Bahn", slug: "scholz-und-volkmer" },
      { src: "id-logo.png", name: "Ideology", slug: "ideology" },
      { src: "lemon-soda-logo.png", name: "LemonSoda", slug: "ideology" },
      { src: "neugelb-logo.svg", name: "NeuGelb", slug: "neugelb" },
      { src: "rv-logo.png", name: "R+V", slug: "scholz-und-volkmer" },
      { src: "wmf-logo.svg", name: "WMF", slug: "scholz-und-volkmer" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_text_swap = resolveDirective("text-swap");
      let _temp0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "relative z-20 flex flex-col gap-sm" }, _attrs))} data-v-8eb4d129><div class="flex" data-v-8eb4d129><svg fill="none" viewBox="0 0 1472 310" xmlns="http://www.w3.org/2000/svg" data-v-8eb4d129><title data-v-8eb4d129>Logo</title><path class="fill-foreground transition" d="M0 310V0H72.9995V310H0ZM139.992 310C128.149 310 118.416 309.704 110.792 309.114C103.329 308.229 97.4893 306.161 93.272 302.914C89.0543 299.667 86.0532 294.204 84.2687 286.529C82.4843 278.853 81.3488 268.224 80.8621 254.643C80.5377 240.767 80.3754 223.053 80.3754 201.5V0H153.375V168.286C153.375 171.829 153.456 174.19 153.618 175.371C153.942 176.257 154.672 176.848 155.808 177.143H158.241V0H231.241V201.5C231.241 223.053 230.998 240.767 230.511 254.643C230.187 268.224 229.132 278.853 227.348 286.529C225.563 294.204 222.562 299.667 218.344 302.914C214.127 306.161 208.287 308.229 200.824 309.114C193.362 309.704 183.629 310 171.625 310H139.992Z" data-v-8eb4d129></path></svg></div><p class="text-foreground-muted pb-1 text-xs uppercase font-dm-mono" data-v-8eb4d129> Trusted by <span${ssrRenderAttrs(_temp0 = mergeProps({ class: "inline-block transition-opacity duration-200" }, ssrGetDirectiveProps(_ctx, _directive_text_swap, { value: hoveredCompany.value, fallback: "Pioneers" })))} data-v-8eb4d129>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</span></p><div class="gap-md flex w-full flex-wrap justify-start" data-v-8eb4d129><!--[-->`);
      ssrRenderList(logos, (logo, index) => {
        _push(`<div style="${ssrRenderStyle({ animationDelay: `${index * 80}ms` })}" class="animate-fadeInUp flex w-20 opacity-0 lg:flex-1" data-v-8eb4d129>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          scroll: false,
          to: `/works/${logo.slug}`,
          class: "group hover:bg-foreground border-background-muted relative flex w-20 items-center justify-center border p-4 transition duration-300 lg:flex-1",
          onMouseenter: ($event) => hoveredCompany.value = logo.name,
          onMouseleave: ($event) => hoveredCompany.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(plusPositions, (pos, i) => {
                _push2(`<span class="${ssrRenderClass(`absolute ${pos} text-foreground-muted text-xs leading-0 font-bold`)}" data-v-8eb4d129${_scopeId}>+</span>`);
              });
              _push2(`<!--]--><img${ssrRenderAttr("alt", logo.name)}${ssrRenderAttr("src", `/logo/${logo.src}`)} class="h-8 w-fit object-contain grayscale transition duration-300 group-hover:grayscale-0 lg:h-12" height="32" width="32" data-v-8eb4d129${_scopeId}>`);
            } else {
              return [
                (openBlock(), createBlock(Fragment, null, renderList(plusPositions, (pos, i) => {
                  return createVNode("span", {
                    key: i,
                    class: `absolute ${pos} text-foreground-muted text-xs leading-0 font-bold`
                  }, "+", 2);
                }), 64)),
                createVNode("img", {
                  alt: logo.name,
                  src: `/logo/${logo.src}`,
                  class: "h-8 w-fit object-contain grayscale transition duration-300 group-hover:grayscale-0 lg:h-12",
                  height: "32",
                  width: "32"
                }, null, 8, ["alt", "src"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-8eb4d129"]]), { __name: "HomeHeader" });
function useHorizontalScroll(containerRef, triggerRef) {
  ref(null);
}
const title = "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience";
const description = "Fullstack Developer with over 4 years of experience in building user-centered websites and applications for clients like Deutsche Bahn, R+V, Adidas, and WMF. Skilled in Next.js, TypeScript, and UX design, I enhance digital experiences through innovative, data-driven solutions and seamless functionality.";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogType: "website",
      ogUrl: "https://example.com",
      ogSiteName: title,
      ogImage: "https://example.com/image.png",
      ogImageAlt: "Preview image for My Amazing Site",
      twitterCard: "summary_large_image",
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: "https://example.com/image.png",
      twitterCreator: "@mytwitterhandle",
      twitterSite: "@mytwitterhandle",
      author: "Ivan Smiths",
      applicationName: "Ivan Smiths Portfolio",
      generator: "Nuxt",
      robots: "index, follow",
      charset: "utf-8"
    });
    ref(null);
    ref(null);
    useHorizontalScroll();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-sm md:pt-xl pt-sm gap-xl flex min-h-[100vh] flex-col justify-between" }, _attrs))}>`);
      _push(ssrRenderComponent(Header, null, null, _parent));
      _push(`<div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B18_mh6z.mjs.map
