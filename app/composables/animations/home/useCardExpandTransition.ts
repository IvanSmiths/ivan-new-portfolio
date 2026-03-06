import type { WorkCard } from "~/domain/works/types";
import { isNavigationFailure } from "vue-router";
import { nextTick } from "vue";
import { useWorkExpandLayer } from "~/composables/animations/home/useWorkExpandLayer";

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
  const { layerRef, coverRef, stageRef, labelRef, roleRef } = useWorkExpandLayer();

  const HERO_IMAGE_SELECTOR = "[data-work-hero-image]";
  const TARGET_IMAGE_WAIT_TIMEOUT_MS = 2000;

  let movedImage: HTMLImageElement | null = null;
  let movedImageOriginalParent: HTMLElement | null = null;
  let movedImageOriginalNextSibling: ChildNode | null = null;
  let deferDisposeCleanup = false;

  function restoreMovedImage() {
    if (!movedImage) return;

    $gsap.set(movedImage, { clearProps: "all" });

    const originalParent = movedImageOriginalParent;
    const originalNextSibling = movedImageOriginalNextSibling;

    if (originalParent?.isConnected) {
      if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
        originalParent.insertBefore(movedImage, originalNextSibling);
      } else {
        originalParent.appendChild(movedImage);
      }
    } else {
      movedImage.remove();
    }

    movedImage = null;
    movedImageOriginalParent = null;
    movedImageOriginalNextSibling = null;
  }

  function cleanup() {
    restoreMovedImage();

    const layer = layerRef.value;
    const cover = coverRef.value;
    const stage = stageRef.value;
    const label = labelRef.value;
    const role = roleRef.value;

    if (role) {
      role.textContent = "";
      $gsap.set(role, { clearProps: "all" });
    }
    if (label) {
      $gsap.set(label, { clearProps: "all" });
    }
    if (cover) {
      $gsap.set(cover, { clearProps: "all" });
    }
    if (stage) {
      while (stage.firstChild) {
        stage.removeChild(stage.firstChild);
      }
      $gsap.set(stage, { clearProps: "all" });
    }
    if (layer) {
      $gsap.set(layer, { clearProps: "all" });
    }

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
      const layer = layerRef.value;
      const cover = coverRef.value;
      const stage = stageRef.value;
      const labelWrap = labelRef.value;
      const role = roleRef.value;

      if (!work || !card || !imageEl || !containerEl || !layer || !cover || !stage || !labelWrap || !role) {
        return;
      }

      const containerRect = containerEl.getBoundingClientRect();
      const containerStyles = window.getComputedStyle(containerEl);
      const imageX = Number($gsap.getProperty(imageEl, "x")) || 0;
      const imageScale = Number($gsap.getProperty(imageEl, "scale")) || 1;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

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

      movedImage = imageEl;
      movedImageOriginalParent = imageEl.parentElement;
      movedImageOriginalNextSibling = imageEl.nextSibling;
      stage.appendChild(imageEl);

      role.textContent = work.role;
      $gsap.set(layer, { autoAlpha: 1, visibility: "visible", pointerEvents: "none" });
      $gsap.set(cover, { opacity: 0 });
      $gsap.set(labelWrap, { opacity: 0 });
      $gsap.set(stage, {
        x: containerRect.left + containerRect.width / 2 - viewportCenterX,
        y: containerRect.top + containerRect.height / 2 - viewportCenterY,
        width: containerRect.width,
        height: containerRect.height,
        borderRadius: containerStyles.borderRadius,
        transformOrigin: "center center",
      });
      $gsap.set(imageEl, {
        x: imageX,
        scale: imageScale,
        force3D: true,
        willChange: "transform",
      });

      await new Promise<void>((resolve) => {
        const tl = $gsap.timeline({ onComplete: resolve });

        const centerWidth = window.innerWidth * 0.5;
        const centerHeight = window.innerHeight * 0.5;
        const centerLeft = (window.innerWidth - centerWidth) / 2;
        const centerTop = (window.innerHeight - centerHeight) / 2;

        tl.set(labelWrap, {
          x: centerLeft - viewportCenterX,
          y: centerTop - 6 - viewportCenterY,
          width: centerWidth,
        });
        tl.to(cover, { opacity: 1, duration: 0.45, ease: "power2.inOut" });
        tl.to(
          stage,
          {
            x: centerLeft + centerWidth / 2 - viewportCenterX,
            y: centerTop + centerHeight / 2 - viewportCenterY,
            width: centerWidth,
            height: centerHeight,
            duration: 0.95,
            ease: "power3.out",
            force3D: true,
          },
          "<",
        );
        tl.to(imageEl, { x: 0, scale: 1.3, duration: 0.95, ease: "power3.out", force3D: true }, "<");
        tl.fromTo(
          labelWrap,
          {
            opacity: 0,
            y: centerTop - 4 - viewportCenterY,
          },
          {
            opacity: 1,
            y: centerTop - 12 - viewportCenterY,
            duration: 0.25,
            ease: "power2.out",
          },
          "<+0.62",
        );
        tl.fromTo(role, { y: 8 }, { y: 0, duration: 0.25, ease: "power2.out" }, "<+0.05");
        tl.to(labelWrap, {
          opacity: 0,
          y: centerTop - 18 - viewportCenterY,
          duration: 0.2,
          ease: "power2.in",
          delay: 0.08,
        });
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

          const fitAnimation = $Flip.fit(stage, targetImage, {
            absolute: true,
            duration: 1.1,
            ease: "power3.inOut",
          });
          if (fitAnimation && "eventCallback" in fitAnimation) {
            tl.add(fitAnimation as gsap.core.Tween, 0);
          }

          tl.to(imageEl, { scale: 1, duration: 1.1, ease: "power2.out" }, 0);
          tl.to(cover, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0.58);
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
