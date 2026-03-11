export function useCardHover(opts: {
  gsap: typeof gsap;
  images: () => HTMLImageElement[];
  isLocked: () => boolean;
}) {
  const { gsap: $gsap } = opts;

  function hoverIn(index: number) {
    if (opts.isLocked()) return;

    const images = opts.images();

    images.forEach((img, i) => {
      $gsap.to(img, {
        filter: i === index ? "blur(0px) saturate(1)" : "blur(6px) saturate(0)",
        duration: 0.25,
        scale: i === index ? 1.03 : 1,
        overwrite: "auto",
      });
    });
  }

  function hoverOut() {
    if (opts.isLocked()) return;

    opts.images().forEach((img) => {
      $gsap.to(img, {
        filter: "blur(0px) saturate(1)",
        duration: 0.25,
        scale: 1,
        overwrite: "auto",
      });
    });
  }

  return { hoverIn, hoverOut };
}
