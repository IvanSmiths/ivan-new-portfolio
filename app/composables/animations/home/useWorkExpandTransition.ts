import type { WorkCard } from "~/domain/works/types";
import { isNavigationFailure } from "vue-router";
import { nextTick } from "vue";

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
  let cover: HTMLDivElement | null = null;
  let deferDisposeCleanup = false;

  function cleanup() {
    overlay?.remove();
    overlay = null;
    cover?.remove();
    cover = null;
    $gsap.set(opts.cards(), { opacity: 1, filter: "none", scale: 1 });
  }

  onScopeDispose(() => {
    if (deferDisposeCleanup) return;
    cleanup();
  });

  async function onImageClick(event: MouseEvent, index: number) {
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

        const labelWrap = document.createElement("div");
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

        const finalW = window.innerWidth * 0.5;
        const finalH = window.innerHeight * 0.5;
        const left = (window.innerWidth - finalW) / 2;
        const top = (window.innerHeight - finalH) / 2;

        tl.set(labelWrap, { left, top: top - 50, width: finalW });
        tl.to(cover, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
        tl.to(
          overlay!,
          { top, left, width: finalW, height: finalH, duration: 0.6, ease: "power2.inOut" },
          "<",
        );
        tl.to(cloned, { scale: 1.3, duration: 0.6, ease: "power2.inOut" }, "<");

        tl.to(labelWrap, {
          left,
          top: top - 50,
          width: finalW,
          duration: 0.6,
          opacity: 1,
          y: 0,
        });
        tl.fromTo(title, { y: 8 }, { y: 0, duration: 0.25, ease: "power2.out" }, "<");
        tl.fromTo(role, { y: 8 }, { y: 0, duration: 0.25, ease: "power2.out" }, "<+0.05");
        tl.to(labelWrap, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in", delay: 0.25 });
        tl.to(overlay!, {
          duration: 1.25,
          translateY: `70%`,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          paddingLeft: 20,
          paddingRight: 20,
          ease: "power3.inOut",
        });
        tl.to(cloned, { scale: 1, duration: 1, ease: "power2.out" }, "<");

        tl.add(() => {
          labelWrap.remove();
        });
      });

      deferDisposeCleanup = true;
      const navigationResult = await opts.router.push(`/works/${work.slug}`);
      if (!isNavigationFailure(navigationResult)) {
        shouldCleanup = false;

        await nextTick();
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });

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
