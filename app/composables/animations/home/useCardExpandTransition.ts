import type { WorkCard } from "~/domain/works/types";
import { isNavigationFailure } from "vue-router";
import { nextTick } from "vue";

export function useCardExpandTransition(opts: {
  gsap: typeof gsap;
  router: ReturnType<typeof useRouter>;
  works: readonly WorkCard[];
  cards: () => HTMLElement[];
  images: () => HTMLImageElement[];
  lock: { value: boolean };
}) {
  const { gsap: $gsap } = opts;
  const { $Flip } = useNuxtApp();

  const HERO_IMAGE_SELECTOR = "[data-work-hero-image]";
  const TARGET_IMAGE_WAIT_TIMEOUT_MS = 2000;

  let overlay: HTMLDivElement | null = null;
  let cover: HTMLDivElement | null = null;
  let labelWrap: HTMLDivElement | null = null;
  let deferDisposeCleanup = false;

  function cleanup() {
    overlay?.remove();
    overlay = null;
    cover?.remove();
    cover = null;
    labelWrap?.remove();
    labelWrap = null;
    $gsap.set(opts.cards(), { opacity: 1, filter: "none", scale: 1 });
  }

  function waitForWorkHeroImage() {
    const startTime = typeof performance !== "undefined" ? performance.now() : Date.now();

    return new Promise<HTMLImageElement | null>((resolve) => {
      const poll = () => {
        const targetImage = document.querySelector<HTMLImageElement>(HERO_IMAGE_SELECTOR);
        if (targetImage) {
          resolve(targetImage);
          return;
        }

        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now - startTime >= TARGET_IMAGE_WAIT_TIMEOUT_MS) {
          resolve(null);
          return;
        }

        requestAnimationFrame(poll);
      };

      poll();
    });
  }

  async function waitForFrames(frames: number) {
    for (let i = 0; i < frames; i += 1) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
  }

  onScopeDispose(() => {
    if (deferDisposeCleanup) return;
    cleanup();
  });

  async function onImageClick(_event: MouseEvent, index: number) {
    if (opts.lock.value) return;
    opts.lock.value = true;
    let shouldCleanup = true;

    try {
      const work = opts.works[index];
      const card = opts.cards()[index];
      const imageEl = opts.images()[index];
      const containerEl = (imageEl?.parentElement as HTMLElement | null) ?? null;

      if (!work || !card || !imageEl || !containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const containerStyles = window.getComputedStyle(containerEl);

      $gsap.to(
        opts.cards().filter((_, i) => i !== index),
        {
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.9,
          duration: 0.5,
          ease: "power2.inOut",
        },
      );

      overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: ${containerRect.top}px;
        left: ${containerRect.left}px;
        width: ${containerRect.width}px;
        height: ${containerRect.height}px;
        overflow: hidden;
        z-index: 999;
        pointer-events: none;
        border-radius: ${containerStyles.borderRadius};
      `;

      const cloned = document.createElement("img");
      cloned.src = imageEl.currentSrc || imageEl.src;
      cloned.alt = imageEl.alt;
      cloned.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
        user-select: none;
        transform-origin: center top;
        will-change: transform;
      `;
      $gsap.set(cloned, { scale: 1 });

      overlay.appendChild(cloned);
      document.body.appendChild(overlay);

      await new Promise<void>((resolve) => {
        const tl = $gsap.timeline({ onComplete: resolve });

        cover = document.createElement("div");
        cover.style.cssText = `
          position: fixed;
          inset: 0;
          background: black;
          z-index: 998;
          opacity: 0;
          pointer-events: none;
        `;
        document.body.appendChild(cover);

        labelWrap = document.createElement("div");
        labelWrap.style.cssText = `
          position: fixed;
          z-index: 1001;
          opacity: 0;
          pointer-events: none;
          left: ${containerRect.left}px;
          top: ${containerRect.top}px;
          width: ${containerRect.width}px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          color: var(--foreground);
          padding: 10px 12px;
          box-sizing: border-box;
          white-space: nowrap;
        `;
        document.body.appendChild(labelWrap);

        const title = document.createElement("div");
        title.textContent = work.title;
        title.style.cssText = `
          max-width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
        `;

        const role = document.createElement("div");
        role.textContent = (work as any).role ?? "";
        role.style.cssText = `
          max-width: 30%;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: right;
        `;

        labelWrap.appendChild(title);
        labelWrap.appendChild(role);

        const centerWidth = window.innerWidth * 0.5;
        const centerHeight = window.innerHeight * 0.5;
        const centerLeft = (window.innerWidth - centerWidth) / 2;
        const centerTop = (window.innerHeight - centerHeight) / 2;

        tl.set(labelWrap, { left: centerLeft, top: centerTop - 50, width: centerWidth });
        tl.to(cover, { opacity: 1, duration: 0.45, ease: "power2.inOut" });
        tl.to(
          overlay,
          {
            top: centerTop,
            left: centerLeft,
            width: centerWidth,
            height: centerHeight,
            duration: 1,
            ease: "power3.inOut",
          },
          "<",
        );
        tl.to(cloned, { scale: 1.3, duration: 0.6, ease: "power2.inOut" }, "<");
        tl.to(
          labelWrap,
          {
            opacity: 1,
            y: 0,
            top: centerTop - 20,
            width: centerWidth,
            duration: 0.45,
            ease: "power2.out",
          },
          "<+0.08",
        );
        tl.fromTo(title, { y: 8 }, { y: 0, duration: 0.25, ease: "power2.out" }, "<");
        tl.fromTo(role, { y: 8 }, { y: 0, duration: 0.25, ease: "power2.out" }, "<+0.05");
        tl.to(labelWrap, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in", delay: 0.15 });
      });

      deferDisposeCleanup = true;
      const navigationResult = await opts.router.push(`/works/${work.slug}`);
      if (!isNavigationFailure(navigationResult)) {
        await nextTick();
        await waitForFrames(2);

        const targetImage = await waitForWorkHeroImage();
        if (!targetImage) return;

        $gsap.set(targetImage, { autoAlpha: 0 });

        await new Promise<void>((resolve) => {
          const tl = $gsap.timeline({
            onComplete: () => {
              $gsap.set(targetImage, { autoAlpha: 1, clearProps: "opacity,visibility" });
              resolve();
            },
          });

          if (overlay) {
            const fitAnimation = $Flip.fit(overlay, targetImage, {
              absolute: true,
              duration: 1.1,
              ease: "power3.inOut",
            });
            if (fitAnimation && "eventCallback" in fitAnimation) {
              tl.add(fitAnimation as gsap.core.Tween, 0);
            }
          }

          tl.to(cloned, { scale: 1, duration: 1.1, ease: "power2.out" }, 0);
          if (cover) {
            tl.to(cover, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0.58);
          }
        });

        shouldCleanup = false;
        cleanup();
      }
    } finally {
      deferDisposeCleanup = false;
      if (shouldCleanup) cleanup();
      opts.lock.value = false;
    }
  }

  return { onImageClick };
}
