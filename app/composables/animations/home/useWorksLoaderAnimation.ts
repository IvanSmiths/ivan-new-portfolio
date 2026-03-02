import { nextTick, onMounted, onScopeDispose, ref, type Ref } from "vue";
import { useWorksLoaderSession } from "~/composables/animations/work/useWorksLoaderSession";

export function useWorksLoaderAnimation(onDone?: () => void, targetImageRefs?: Ref<HTMLElement[]>) {
  const { $gsap } = useNuxtApp();
  const { hasSeenLoader, markLoaderSeen, notifyLoaderDone } = useWorksLoaderSession();

  const loaderRef = ref<HTMLElement | null>(null);
  const cardRefs = ref<HTMLElement[]>([]);
  const isVisible = ref(true);
  const isLoading = ref(false);

  async function waitForImages(container: HTMLElement): Promise<void> {
    const images = Array.from(container.querySelectorAll<HTMLImageElement>("img"));

    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
            } else {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }
          }),
      ),
    );
  }

  function getTargetRects(maxCount: number): DOMRect[] {
    const targets = (targetImageRefs?.value ?? []).filter(Boolean).slice(0, maxCount);
    if (targets.length) return targets.map((el) => el.getBoundingClientRect());

    const fallback = Array.from(
      document.querySelectorAll<HTMLElement>(".work-item .work-img"),
    ).slice(0, maxCount);

    return fallback.map((el) => el.getBoundingClientRect());
  }

  let ctx: any = null;

  async function runAnimation() {
    await nextTick();

    const loader = loaderRef.value;
    if (!loader) return;

    const items = cardRefs.value.filter(Boolean);
    if (!items.length) return;

    ctx = $gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const THUMB_W = 28;
      const THUMB_H = 44;
      const THUMB_GAP = 10;
      const totalH = items.length * THUMB_H + (items.length - 1) * THUMB_GAP;
      const startY = (vh - totalH) / 2;

      const images = items
        .map((el) => el.querySelector<HTMLElement>("img"))
        .filter((x): x is HTMLElement => !!x);

      $gsap.set(items, {
        position: "fixed",
        width: THUMB_W,
        height: THUMB_H,
        left: vw / 2 - THUMB_W / 2,
        top: (i: number) => startY + i * (THUMB_H + THUMB_GAP),
        overflow: "hidden",
        zIndex: 50,
        opacity: 0,
        scale: 0.85,
      });

      $gsap.set(images, { scale: 3, transformOrigin: "center center" });

      const HORIZ_W = 140;
      const HORIZ_H = 166;
      const HORIZ_GAP = 12;
      const totalW = items.length * HORIZ_W + (items.length - 1) * HORIZ_GAP;
      const horizStartX = (vw - totalW) / 2;
      const horizY = vh / 2 - HORIZ_H / 2;

      const tl = $gsap.timeline({
        onComplete: () => {
          markLoaderSeen();
          $gsap.to(loader, {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              isVisible.value = false;
              onDone?.();
              notifyLoaderDone();
            },
          });
        },
      });

      tl.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      });

      tl.to({}, { duration: 0.5 });

      tl.to(
        items,
        {
          left: (i: number) => horizStartX + i * (HORIZ_W + HORIZ_GAP),
          top: horizY,
          width: HORIZ_W,
          height: HORIZ_H,
          duration: 0.9,
          stagger: 0.05,
          ease: "expo.inOut",
        },
        "spread",
      );

      tl.to(
        images,
        {
          scale: 2,
          duration: 0.9,
          stagger: 0.05,
          ease: "expo.inOut",
        },
        "spread",
      );

      tl.to({}, { duration: 0.5 });

      tl.add(() => {
        const rects = getTargetRects(items.length);

        rects.forEach((rect, i) => {
          const el = items[i];
          if (!el) return;

          $gsap.to(el, {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            borderRadius: 0,
            duration: 1.1,
            ease: "expo.inOut",
            delay: i * 0.04,
          });

          const img = images[i];
          if (!img) return;

          $gsap.to(img, {
            scale: 1,
            duration: 1.1,
            ease: "expo.inOut",
            delay: i * 0.04,
          });
        });
      });

      tl.to({}, { duration: 1.4 });
    }, loader);
  }

  onMounted(async () => {
    isLoading.value = true;
    if (hasSeenLoader()) {
      isVisible.value = false;
      onDone?.();
      return;
    }

    await nextTick();

    const loader = loaderRef.value;
    if (loader) await waitForImages(loader);

    isLoading.value = false;
    await runAnimation();
  });

  onScopeDispose(() => {
    ctx?.revert?.();
    ctx = null;
  });

  return {
    loaderRef,
    cardRefs,
    isLoading,
    isVisible,
  };
}
