import type { RouteLocationNormalized } from "vue-router";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

type ParsedRouteName = {
  baseName: string;
  locale: string | null;
};

function parseRouteName(route: RouteLocationNormalized): ParsedRouteName {
  const name = route.name ? String(route.name) : "";
  if (!name) return { baseName: "", locale: null };

  // nuxt-i18n appends `___<locale>` to the route name.
  const [baseName = "", locale] = name.split("___");
  return { baseName, locale: locale ?? null };
}

function baseRouteName(route: RouteLocationNormalized) {
  return parseRouteName(route).baseName;
}

function routeLocale(route: RouteLocationNormalized) {
  return parseRouteName(route).locale;
}

function isWorks(route: RouteLocationNormalized) {
  return baseRouteName(route).startsWith("works-");
}

function isHome(route: RouteLocationNormalized) {
  return baseRouteName(route) === "index";
}

function shouldSkip(from: RouteLocationNormalized, to: RouteLocationNormalized): boolean {
  const isFromHome = isHome(from);
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
  if (isHome(route)) return "Home";

  const locale = routeLocale(route);
  let path = route.path;
  if (locale && (path === `/${locale}` || path.startsWith(`/${locale}/`))) {
    path = path.slice(locale.length + 1) || "/";
  }

  if (path === "/") return "Home";
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
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
