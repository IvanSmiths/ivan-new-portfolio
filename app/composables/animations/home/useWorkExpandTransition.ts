import type gsap from "gsap";
import type { WorkCard } from "~/domain/works/types";

export function useWorkExpandTransition(opts: {
  gsap: typeof gsap;
  router: ReturnType<typeof useRouter>;
  works: readonly WorkCard[];
  cards: () => HTMLElement[];
  images: () => HTMLImageElement[];
  lock: { value: boolean };
}) {
  const { gsap: $gsap } = opts;
  let overlay: HTMLDivElement | null = null;

  function cleanup() {
    overlay?.remove();
    overlay = null;
    $gsap.set(opts.cards(), { opacity: 1, filter: "none", scale: 1 });
  }

  onScopeDispose(cleanup);

  async function onImageClick(event: MouseEvent, index: number) {
    if (opts.lock.value) return;
    opts.lock.value = true;

    try {
      const work = opts.works[index];
      const card = opts.cards()[index];
      const imageEl = opts.images()[index];
      if (!work || !card || !imageEl) return;

      const imageRect = imageEl.getBoundingClientRect();

      $gsap.to(
        opts.cards().filter((_, i) => i !== index),
        {
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.97,
          duration: 0.5,
          ease: "power2.inOut",
        },
      );

      overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: ${imageRect.top}px;
        left: ${imageRect.left}px;
        width: ${imageRect.width}px;
        height: ${imageRect.height}px;
        overflow: hidden;
        z-index: 999;
        pointer-events: none;
      `;

      const cloned = document.createElement("img");
      $gsap.set(cloned, { objectPosition: "center top" });

      cloned.src = imageEl.currentSrc || imageEl.src;
      cloned.alt = imageEl.alt;
      cloned.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
        user-select: none;
      `;
      overlay.appendChild(cloned);
      document.body.appendChild(overlay);

      await new Promise<void>((resolve) => {
        const tl = $gsap.timeline({ onComplete: resolve });

        const cover = document.createElement("div");
        cover.style.cssText = `
          position: fixed;
          inset: 0;
          background: black;
          z-index: 998;
          opacity: 0;
          pointer-events: none;
        `;
        document.body.appendChild(cover);

        const title = document.createElement("div");
        title.textContent = work.title;
        title.style.cssText = `
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1001;
          color: var(--foreground);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
        `;
        document.body.appendChild(title);

        const finalW = window.innerWidth * 0.5;
        const finalH = window.innerHeight * 0.5;
        const left = (window.innerWidth - finalW) / 2;
        const top = (window.innerHeight - finalH) / 2;

        tl.to(cover, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
        tl.to(
          overlay!,
          {
            top,
            left,
            objectPosition: "center top",
            width: finalW,
            height: finalH,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "<",
        );

        const textTop = top - title.offsetHeight - 10;
        $gsap.set(title, { top: textTop });

        tl.fromTo(
          title,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        );
        tl.to(title, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in", delay: 0.3 });

        tl.to(overlay!, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          duration: 1,
          ease: "expo.inOut",
        });
        tl.to(cloned, { objectPosition: "center top", duration: 1, ease: "expo.inOut" }, "<");

        tl.add(() => {
          title.remove();
          cover.remove();
        });
      });

      await opts.router.push(`/works/${work.slug}`);
    } finally {
      cleanup();
      opts.lock.value = false;
    }
  }

  return { onImageClick };
}
