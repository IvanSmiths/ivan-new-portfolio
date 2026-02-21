import type gsap from "gsap";

export function useWorkHover(opts: {
  gsap: typeof gsap;
  images: () => HTMLImageElement[];
  clientsByIndex: () => HTMLElement[][];
  isLocked: () => boolean;
}) {
  const { gsap: $gsap } = opts;

  function hideAllClients() {
    const all = opts.clientsByIndex().flat();
    $gsap.set(all, { autoAlpha: 0, y: -8 });
  }

  function hoverIn(index: number) {
    if (opts.isLocked()) return;

    const imgs = opts.images();
    const clients = opts.clientsByIndex();

    imgs.forEach((img, i) => {
      $gsap.to(img, {
        filter: i === index ? "blur(0px) saturate(1)" : "blur(6px) saturate(0)",
        duration: 0.25,
        scale: i === index ? 1.03 : 1,
        overwrite: true,
      });
    });

    clients.forEach((list, i) => {
      if (i === index) return;
      $gsap.to(list, { autoAlpha: 0, y: 8, duration: 0.15, overwrite: true });
    });

    $gsap.to(clients[index] ?? [], {
      autoAlpha: 1,
      y: 0,
      duration: 0.28,
      stagger: 0.06,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function hoverOut() {
    if (opts.isLocked()) return;

    opts.images().forEach((img) => {
      $gsap.to(img, {
        filter: "blur(0px) saturate(1)",
        duration: 0.25,
        scale: 1,
        overwrite: true,
      });
    });

    $gsap.to(opts.clientsByIndex().flat(), {
      autoAlpha: 0,
      y: -8,
      duration: 0.18,
      overwrite: true,
    });
  }

  return { hideAllClients, hoverIn, hoverOut };
}
