import { nextTick, onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";
import type { WorkCard } from "~/domain/works/types";

type Killable = { kill: () => void };

type UseHomeWorksRailOptions = {
  wrapperRef: Ref<HTMLElement | null>;
  works: readonly WorkCard[];
};

type HorizontalLoopConfig = {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number | string;
};

const WORK_ITEM_SELECTOR = ".work-item";
const WORK_IMAGE_SELECTOR = ".work-item .work-img";
const WORK_CLIENT_ITEM_SELECTOR = ".work-item .client-item";
const CARD_CLIENT_ITEM_SELECTOR = ".client-item";

export function useHomeWorksRail({ wrapperRef, works }: UseHomeWorksRailOptions) {
  const router = useRouter();
  const { notifyInteraction } = useCursorHelper();

  let gsapCtx: gsap.Context | null = null;
  let observer: Killable | null = null;
  let cards: HTMLElement[] = [];
  let images: HTMLImageElement[] = [];
  let cardClients: HTMLElement[][] = [];
  let overlayClone: HTMLDivElement | null = null;
  let isExpanding = false;
  let isDisposed = false;

  function queryAll<T extends Element>(selector: string): T[] {
    const root = wrapperRef.value;
    if (!root) return [];

    return Array.from(root.querySelectorAll(selector)) as T[];
  }

  function setClientsHidden() {
    const allClients = queryAll<HTMLElement>(WORK_CLIENT_ITEM_SELECTOR);
    gsap.set(allClients, { autoAlpha: 0, y: 8 });
  }

  function onHoverIn(index: number) {
    const hoveredCard = cards[index];
    if (!hoveredCard || isExpanding) return;

    images.forEach((image, imageIndex) => {
      gsap.to(image, {
        filter: imageIndex === index ? "blur(0px) saturate(1)" : "blur(6px) saturate(0)",
        duration: 0.25,
        scale: imageIndex === index ? 1.03 : 1,
        overwrite: true,
      });
    });

    cardClients.forEach((clients, clientsIndex) => {
      if (clientsIndex === index) return;

      gsap.to(clients, {
        autoAlpha: 0,
        y: 8,
        duration: 0.15,
        overwrite: true,
      });
    });

    gsap.to(cardClients[index] ?? [], {
      autoAlpha: 1,
      y: 0,
      duration: 0.28,
      stagger: 0.06,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function onHoverOut() {
    if (isExpanding) return;

    images.forEach((image) => {
      gsap.to(image, {
        filter: "blur(0px) saturate(1)",
        duration: 0.25,
        scale: 1,
        overwrite: true,
      });
    });

    gsap.to(queryAll<HTMLElement>(WORK_CLIENT_ITEM_SELECTOR), {
      autoAlpha: 0,
      y: 8,
      duration: 0.18,
      overwrite: true,
    });
  }

  async function onImageClick(event: MouseEvent, index: number) {
    if (isExpanding) return;

    isExpanding = true;

    try {
      const work = works[index];
      const target = event.currentTarget as HTMLElement | null;
      if (!work || !target) return;

      const imageElement = target.querySelector<HTMLImageElement>(".work-img");
      if (!imageElement) return;

      const imageRect = imageElement.getBoundingClientRect();

      gsap.to(
        cards.filter((_, cardIndex) => cardIndex !== index),
        {
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.97,
          duration: 0.5,
          ease: "power2.inOut",
        },
      );

      overlayClone = document.createElement("div");
      overlayClone.style.cssText = `
        position: fixed;
        top: ${imageRect.top}px;
        left: ${imageRect.left}px;
        width: ${imageRect.width}px;
        height: ${imageRect.height}px;
        overflow: hidden;
        z-index: 20;
        pointer-events: none;
      `;

      const clonedImage = document.createElement("img");
      clonedImage.src = imageElement.currentSrc || imageElement.src;
      clonedImage.alt = imageElement.alt;
      clonedImage.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        user-select: none;
      `;

      overlayClone.appendChild(clonedImage);
      document.body.appendChild(overlayClone);

      await new Promise((resolve) => {
        const tl = gsap.timeline({ onComplete: resolve });

        const coverDiv = document.createElement("div");
        coverDiv.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: black;
          z-index: 998;
          opacity: 0;
          pointer-events: none;
        `;
        gsap.set(overlayClone!, { zIndex: 999 });
        document.body.appendChild(coverDiv);

        const titleText = document.createElement("div");
        titleText.textContent = work.title;
        titleText.style.cssText = `
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1001;
          color: var(--foreground);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
        `;
        document.body.appendChild(titleText);

        const finalWidth = window.innerWidth * 0.5;
        const finalHeight = window.innerHeight * 0.5;
        const centeredLeft = (window.innerWidth - finalWidth) / 2;
        const centeredTop = (window.innerHeight - finalHeight) / 2;

        gsap.set(clonedImage, { objectPosition: "center top" });
        tl.to(coverDiv, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });

        tl.to(
          overlayClone!,
          {
            top: centeredTop,
            left: centeredLeft,
            width: finalWidth,
            height: finalHeight,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "<",
        );

        const textTop = centeredTop - titleText.offsetHeight - 10;
        gsap.set(titleText, { top: textTop });

        tl.fromTo(
          titleText,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        );

        tl.to(titleText, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.in",
          delay: 0.3,
        });

        tl.to(overlayClone!, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          duration: 1,
          ease: "expo.inOut",
        });

        tl.to(
          clonedImage,
          {
            objectPosition: "center top",
            duration: 1,
            ease: "expo.inOut",
          },
          "<",
        );

        tl.add(() => {
          titleText.remove();
          coverDiv.remove();
        });
      });

      await router.push(`/works/${work.slug}`);
    } finally {
      gsap.set(cards, { opacity: 1, filter: "none", scale: 1 });

      overlayClone?.remove();
      overlayClone = null;
      isExpanding = false;
    }
  }

  function createHorizontalLoop(targets: gsap.DOMTarget[], config: HorizontalLoopConfig = {}) {
    const loopTargets = gsap.utils.toArray(targets) as HTMLElement[];
    const pixelsPerSecond = (config.speed ?? 1) * 20;
    const snap =
      config.snap === false
        ? (value: number) => value
        : gsap.utils.snap((config.snap ?? 1) as number);

    const timeline = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        timeline.totalTime(timeline.rawTime() + timeline.duration() * 1000);
      },
    });

    const firstTarget = loopTargets[0];
    if (!firstTarget) return timeline;

    const startX = firstTarget.offsetLeft;
    const xPercents: number[] = [];
    const widths: number[] = [];

    gsap.set(loopTargets, {
      xPercent: (index, element) => {
        const width = (widths[index] = parseFloat(
          gsap.getProperty(element, "width", "px") as string,
        ));
        xPercents[index] = snap(
          (parseFloat(gsap.getProperty(element, "x", "px") as string) / width) * 100 +
            (gsap.getProperty(element, "xPercent") as number),
        );

        return xPercents[index];
      },
    });

    gsap.set(loopTargets, { x: 0 });

    const lastIndex = loopTargets.length - 1;
    const lastTarget = loopTargets[lastIndex];
    if (!lastTarget) return timeline;

    const lastXPercent = xPercents[lastIndex] ?? 0;
    const lastWidth = widths[lastIndex] ?? 0;

    const totalWidth =
      lastTarget.offsetLeft +
      (lastXPercent / 100) * lastWidth -
      startX +
      lastTarget.offsetWidth * (gsap.getProperty(lastTarget, "scaleX") as number) +
      (parseFloat(String(config.paddingRight ?? 0)) || 0);

    for (let index = 0; index < loopTargets.length; index++) {
      const target = loopTargets[index];
      const width = widths[index];
      const xPercent = xPercents[index];
      if (!target || width == null || xPercent == null) continue;

      const currentX = (xPercent / 100) * width;
      const distanceToStart = target.offsetLeft + currentX - startX;
      const distanceToLoop =
        distanceToStart + width * (gsap.getProperty(target, "scaleX") as number);

      timeline
        .to(
          target,
          {
            xPercent: snap(((currentX - distanceToLoop) / width) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0,
        )
        .fromTo(
          target,
          {
            xPercent: snap(((currentX - distanceToLoop + totalWidth) / width) * 100),
          },
          {
            xPercent,
            duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add(`label${index}`, distanceToStart / pixelsPerSecond);
    }

    return timeline;
  }

  function cleanup() {
    isDisposed = true;
    observer?.kill();
    observer = null;

    gsapCtx?.revert();
    gsapCtx = null;

    overlayClone?.remove();
    overlayClone = null;
  }

  onMounted(async () => {
    await nextTick();

    const root = wrapperRef.value;
    if (!root || isDisposed) return;

    const observerModule = await import("gsap/dist/Observer");
    if (isDisposed) return;

    const Observer = observerModule.default;
    gsap.registerPlugin(Observer);

    gsapCtx = gsap.context(() => {
      cards = queryAll<HTMLElement>(WORK_ITEM_SELECTOR);
      images = queryAll<HTMLImageElement>(WORK_IMAGE_SELECTOR);
      cardClients = cards.map((card) =>
        Array.from(card.querySelectorAll<HTMLElement>(CARD_CLIENT_ITEM_SELECTOR)),
      );

      setClientsHidden();

      const loop = createHorizontalLoop(cards, { repeat: -1, speed: 1 });
      loop.totalTime(loop.duration() * 1000);

      const slowDownTween = gsap.to(loop, { timeScale: 0, duration: 0.5 });
      loop.timeScale(0);

      observer = Observer.create({
        target: window,
        type: "touch,wheel",
        wheelSpeed: -1,
        onChange: (self: { deltaX: number; deltaY: number }) => {
          notifyInteraction();

          const dominantDelta =
            Math.abs(self.deltaX) > Math.abs(self.deltaY) ? self.deltaX : self.deltaY;
          loop.timeScale(-dominantDelta);
          slowDownTween.invalidate().restart();
        },
      });
    }, root);
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    onHoverIn,
    onHoverOut,
    onImageClick,
  };
}
