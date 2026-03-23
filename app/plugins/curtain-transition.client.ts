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

function toRouteLabelKey(route: RouteLocationNormalized) {
  if (isHome(route)) return "common.transitions.home";

  const baseName = baseRouteName(route);

  if (baseName === "about") return "common.transitions.about";
  if (baseName === "lab") return "common.transitions.lab";
  if (isWorks(route)) return "common.transitions.works";

  return "common.transitions.home";
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { beginCover, beginReveal, setDestinationRouteLabel } = useCurtainTransition();

  router.beforeEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return true;
    if (shouldSkip(from, to)) return true;

    setDestinationRouteLabel(toRouteLabelKey(to));
    await beginCover();
    return true;
  });

  router.afterEach(async (to, from) => {
    if (to.fullPath === from.fullPath) return;
    if (shouldSkip(from, to)) return;

    await beginReveal();
  });
});
