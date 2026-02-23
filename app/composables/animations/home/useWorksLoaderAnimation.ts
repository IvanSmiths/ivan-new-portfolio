import { nextTick, onMounted, onScopeDispose, ref } from "vue";

export function useWorksLoaderAnimation(onDone?: () => void) {
  const { $gsap } = useNuxtApp();

  const loaderRef = ref<HTMLElement | null>(null);
  const itemRefs = ref<HTMLElement[]>([]);
  const isVisible = ref(true);

  const STORAGE_KEY = "works_loader_seen";

  function hasSeenLoader(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function markLoaderSeen() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* empty */
    }
  }

  function getCardImageRects(): DOMRect[] {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".work-item .work-img"));
    return images.map((el) => el.getBoundingClientRect());
  }

  let ctx: any = null;

  async function runAnimation() {
    await nextTick();

    const loader = loaderRef.value;
    if (!loader) return;

    const items = itemRefs.value;
    if (!items.length) return;

    ctx = $gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const THUMB_W = 28;
      const THUMB_H = 44;
      const THUMB_GAP = 10;
      const totalH = items.length * THUMB_H + (items.length - 1) * THUMB_GAP;
      const startY = (vh - totalH) / 2;

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

      const HORIZ_W = 140;
      const HORIZ_H = 166;
      const HORIZ_GAP = 12;
      const totalW = items.length * HORIZ_W + (items.length - 1) * HORIZ_GAP;
      const horizStartX = (vw - totalW) / 2;
      const horizY = vh / 2 - HORIZ_H / 2;

      tl.to(items, {
        left: (i: number) => horizStartX + i * (HORIZ_W + HORIZ_GAP),
        top: horizY,
        width: HORIZ_W,
        height: HORIZ_H,
        duration: 0.9,
        stagger: 0.05,
        ease: "expo.inOut",
      });

      tl.to({}, { duration: 0.5 });

      tl.add(() => {
        const rects = getCardImageRects();

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
        });
      });

      tl.to({}, { duration: 1.4 });
    }, loader);
  }

  onMounted(async () => {
    if (hasSeenLoader()) {
      isVisible.value = false;
      onDone?.();
      return;
    }
    await runAnimation();
  });

  onScopeDispose(() => {
    ctx?.revert?.();
    ctx = null;
  });

  return {
    loaderRef,
    itemRefs,
    isVisible,
  };
}
