import type { WorkCard } from "~/domain/works/types";
import { isNavigationFailure } from "vue-router";
import { nextTick } from "vue";
import { useCardExpandLayer } from "~/composables/animations/home/useCardExpandLayer";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

type ExpandOriginSnapshot = {
  borderRadius: string;
  containerRect: Pick<DOMRect, "height" | "left" | "top" | "width">;
  imageEl: HTMLImageElement | null;
  imageScale: number;
  imageX: number;
};

export function useCardExpandTransition(opts: {
  gsap: typeof gsap;
  router: ReturnType<typeof useRouter>;
  works: readonly WorkCard[];
  cards: () => HTMLElement[];
  images: () => HTMLImageElement[];
  lock: { value: boolean };
}) {
  const { gsap: $gsap } = opts;
  const { $Flip, $CustomEase } = useNuxtApp();
  const { prepareSplitReveal } = useSplitTextAnimation();
  const { layerRef, coverRef, stageRef, labelRef, roleRef } = useCardExpandLayer();

  const HERO_TARGET_SELECTOR = "[data-work-hero-target]";
  const HERO_IMAGE_SELECTOR = "[data-work-hero-image]";
  const TARGET_WAIT_TIMEOUT_MS = 500;
  const PRE_EXPAND_HOLD_DURATION = 0.1;
  const LABEL_GAP_FROM_IMAGE_TOP_PX = 0;

  let movedImage: HTMLImageElement | null = null;
  let movedImageOriginalParent: HTMLElement | null = null;
  let movedImageOriginalNextSibling: ChildNode | null = null;
  let restoreRoleSplit: (() => void) | null = null;
  let deferDisposeCleanup = false;

  function cleanupRoleSplit() {
    restoreRoleSplit?.();
    restoreRoleSplit = null;
  }

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
    cleanupRoleSplit();

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

    const cards = opts.cards();
    if (cards.length) {
      $gsap.set(cards, { opacity: 1, filter: "none", scale: 1 });
    }
  }

  function waitForWorkHeroTarget() {
    const startTime = typeof performance !== "undefined" ? performance.now() : Date.now();

    return new Promise<HTMLElement | null>((resolve) => {
      const poll = () => {
        const target =
          document.querySelector<HTMLElement>(HERO_TARGET_SELECTOR) ??
          document.querySelector<HTMLElement>(HERO_IMAGE_SELECTOR);
        if (target) {
          resolve(target);
          return;
        }

        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now - startTime >= TARGET_WAIT_TIMEOUT_MS) {
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

  async function onImageClick(
    _event: MouseEvent,
    index: number,
    originSnapshot?: ExpandOriginSnapshot,
  ) {
    if (opts.lock.value) return;
    opts.lock.value = true;
    let shouldCleanup = true;

    try {
      const work = opts.works[index];
      const card = opts.cards()[index];
      const fallbackImage = opts.images()[index];
      const imageEl = originSnapshot?.imageEl ?? fallbackImage;
      const containerEl = (imageEl?.parentElement as HTMLElement | null) ?? null;
      const layer = layerRef.value;
      const cover = coverRef.value;
      const stage = stageRef.value;
      const labelWrap = labelRef.value;
      const role = roleRef.value;

      if (
        !work ||
        !card ||
        !imageEl ||
        !containerEl ||
        !layer ||
        !cover ||
        !stage ||
        !labelWrap ||
        !role
      ) {
        return;
      }

      const fallbackContainerRect = containerEl.getBoundingClientRect();
      const containerRect = originSnapshot?.containerRect ?? fallbackContainerRect;
      const borderRadius =
        originSnapshot?.borderRadius ?? window.getComputedStyle(containerEl).borderRadius;
      const imageX = originSnapshot?.imageX ?? (Number($gsap.getProperty(imageEl, "x")) || 0);
      const imageScale =
        originSnapshot?.imageScale ?? (Number($gsap.getProperty(imageEl, "scale")) || 1);
      const layerRect = layer.getBoundingClientRect();
      const viewportCenterX = layerRect.left + layerRect.width / 2;
      const viewportCenterY = layerRect.top + layerRect.height / 2;

      $gsap.to(
        opts.cards().filter((_, i) => i !== index),
        {
          opacity: 0,
          stagger: 0.002,
          filter: "blur(12px)",
          scale: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
      );

      movedImage = imageEl;
      movedImageOriginalParent = imageEl.parentElement;
      movedImageOriginalNextSibling = imageEl.nextSibling;
      stage.appendChild(imageEl);

      role.textContent = work.role;
      cleanupRoleSplit();
      const roleReveal = prepareSplitReveal(role, {
        splitBy: "chars",
        duration: 1,
        stagger: 0.01,
        yPercent: 120,
        ease: "power3.out",
        clipLines: false,
        autoAlpha: 0,
      });
      restoreRoleSplit = roleReveal.revert;
      $gsap.set(layer, { autoAlpha: 1, visibility: "visible", pointerEvents: "none" });
      $gsap.set(cover, { opacity: 0 });
      $gsap.set(labelWrap, { opacity: 0 });
      $gsap.set(stage, {
        x: containerRect.left + containerRect.width / 2 - viewportCenterX,
        y: containerRect.top + containerRect.height / 2 - viewportCenterY,
        xPercent: -50,
        yPercent: -50,
        width: containerRect.width,
        height: containerRect.height,
        borderRadius,
        transformOrigin: "center center",
        willChange: "transform,width,height",
        backfaceVisibility: "hidden",
      });
      $gsap.set(imageEl, {
        x: imageX,
        scale: imageScale,
        force3D: true,
        willChange: "transform",
      });

      await new Promise<void>((resolve) => {
        const tl = $gsap.timeline({ onComplete: resolve });

        const centerWidth = layerRect.width * 0.4;
        const centerHeight = layerRect.height * 0.4;
        const centerLeft = layerRect.left + (layerRect.width - centerWidth) / 2;
        const centerTop = layerRect.top + (layerRect.height - centerHeight) / 2;
        const centerX = centerLeft + centerWidth / 2;
        const labelBottomY = centerTop - LABEL_GAP_FROM_IMAGE_TOP_PX;

        tl.set(labelWrap, {
          left: centerX,
          top: labelBottomY,
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -100,
          width: centerWidth,
        });
        tl.to(cover, { opacity: 1, duration: 0.45, ease: "power2.inOut", delay: 0.2 });
        tl.to({}, { duration: PRE_EXPAND_HOLD_DURATION });
        tl.to(
          stage,
          {
            x: centerLeft + centerWidth / 2 - viewportCenterX,
            y: centerTop + centerHeight / 2 - viewportCenterY,
            width: centerWidth / 2,
            duration: 1.25,
            ease: "power4.inOut",
            force3D: true,
          },
          "<-0.45",
        );
        tl.to(
          imageEl,
          { x: 0, scale: 1.3, duration: 0.95, ease: "power3.out", force3D: true },
          "<",
        );
        tl.fromTo(
          labelWrap,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.36,
            ease: "power2.out",
          },
          "<+0.56",
        );
        roleReveal.addToTimeline(tl, "<+0.02");
        tl.to(labelWrap, {
          opacity: 0,
          y: -8,
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

        const target = await waitForWorkHeroTarget();
        if (!target) return;

        $gsap.set(target, { autoAlpha: 0 });

        await new Promise<void>((resolve) => {
          const tl = $gsap.timeline({
            onComplete: () => {
              $gsap.set(target, { autoAlpha: 1, clearProps: "opacity,visibility" });
              resolve();
            },
          });

          const fitAnimation = $Flip.fit(stage, target, {
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
