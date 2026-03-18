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

function capitalizeFirst(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function toRouteLabel(route: RouteLocationNormalized) {
  if (route.path === "/") return "Home";
  const normalizedPath = route.path.replace(/^\/+|\/+$/g, "");
  if (!normalizedPath) return "Home";

  const lastSegment = normalizedPath.split("/").filter(Boolean).at(-1) ?? normalizedPath;
  const humanReadable = decodeSegment(lastSegment).replace(/[-_]+/g, " ");
  return capitalizeFirst(humanReadable);
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { beginCover, beginReveal, setDestinationRouteLabel } = useCurtainTransition();

  router.beforeEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return true;
    if (shouldSkip(from, to)) return true;

    setDestinationRouteLabel(toRouteLabel(to));
    await beginCover();
    return true;
  });

  router.afterEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return;
    if (shouldSkip(from, to)) return;

    await beginReveal();
  });
});
