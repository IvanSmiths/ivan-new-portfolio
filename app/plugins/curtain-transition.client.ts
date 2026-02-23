import type { RouteLocationNormalized } from "vue-router";
import { defineNuxtPlugin, useRouter } from "#app";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

function shouldSkip(from: RouteLocationNormalized, to: RouteLocationNormalized): boolean {
  const isFromHome = from.name === "index";
  const isToWorks = String(to.name).startsWith("works-");
  return isFromHome && isToWorks;
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { beginCover, beginReveal } = useCurtainTransition();

  router.beforeEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return true;
    if (shouldSkip(from, to)) return true;

    await beginCover();
    return true;
  });

  router.afterEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return;
    if (shouldSkip(from, to)) return;

    await beginReveal();
  });
});
