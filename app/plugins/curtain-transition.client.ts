import type { RouteLocationNormalized } from "vue-router";
import { defineNuxtPlugin, useRouter } from "#app";
import { useCurtainTransition } from "~/composables/useCurtainTransition";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { beginCover, beginReveal } = useCurtainTransition();

  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.fullPath === from.fullPath) {
      return true;
    }

    await beginCover();
    return true;
  });

  router.afterEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.fullPath === from.fullPath) {
      return;
    }

    await beginReveal();
  });
});
