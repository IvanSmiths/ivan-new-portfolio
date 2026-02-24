import type { RouteLocationNormalized } from "vue-router";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

function isWorks(route: RouteLocationNormalized) {
  return String(route.name).startsWith("works-");
}

function shouldSkip(from: RouteLocationNormalized, to: RouteLocationNormalized): boolean {
  const isFromHome = from.name === "index";
  const isToWorks = isWorks(to);

  if (isFromHome && isToWorks) return true;
  return isWorks(from) && isWorks(to);
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
