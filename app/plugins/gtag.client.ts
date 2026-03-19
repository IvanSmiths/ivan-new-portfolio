declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default defineNuxtPlugin(() => {
  const { gtagId } = useRuntimeConfig().public;

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  gtag("js", new Date());
  gtag("config", gtagId);

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  });
});
