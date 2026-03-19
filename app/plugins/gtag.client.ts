declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default defineNuxtPlugin(() => {
  const { gtagId } = useRuntimeConfig().public;

  if (!gtagId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  });

  window.gtag("js", new Date());
  window.gtag("config", gtagId, { send_page_view: false });

  const router = useRouter();
  let lastTrackedPath: string | null = null;

  function trackPageView(path: string) {
    if (!path) return;
    if (path === lastTrackedPath) return;
    lastTrackedPath = path;

    window.gtag?.("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  router.isReady().then(() => {
    trackPageView(router.currentRoute.value.fullPath);
  });

  router.afterEach((to, from) => {
    if (to.fullPath === from.fullPath) return;
    requestAnimationFrame(() => trackPageView(to.fullPath));
  });
});
