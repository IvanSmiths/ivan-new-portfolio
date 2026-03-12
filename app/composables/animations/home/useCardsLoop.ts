import { nextTick, onScopeDispose, type Ref } from "vue";

type ScrollTriggerInstance = {
  direction: number;
  end: number;
  getVelocity?: () => number;
  kill: () => void;
  progress: number;
  scroll: (value?: number) => number;
  start: number;
  wrapping?: boolean;
};

type UseHomeCardsLoopAnimationOptions = {
  cardsRef: Ref<HTMLElement | null>;
  galleryRef: Ref<HTMLElement | null>;
  cardGapPx?: number;
  getCards?: () => HTMLElement[];
  getImages?: () => HTMLImageElement[];
  onCenterPass?: (index: number) => void;
  onSnap?: (index: number) => void;
  onScrollActivityChange?: (isScrolling: boolean) => void;
  onSnappedIndexChange?: (index: number) => void;
  onVisualIndexChange?: (index: number) => void;
  scrollDistancePx?: number;
};

export function useCardsLoop(options: UseHomeCardsLoopAnimationOptions) {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  /* ===============================
     Animation tuning variables
  =============================== */

  const DEFAULT_LOOP_TIMELINE_SPACING = 0.09;
  const DEFAULT_CARD_GAP_PX = 20;
  const DEFAULT_SCROLL_DISTANCE = 3000;
  const SCRUB_DURATION = 0.5;
  const SCRUB_EASE = "power3";
  const SNAP_DELAY = 0.3;
  const EDGE_SCROLL_OFFSET = 2;
  const SCROLL_ACTIVITY_VELOCITY_THRESHOLD = 5;
  const MOVE_DURATION = 1;
  const INITIAL_X_PERCENT = 400;
  const FROM_X_PERCENT = 600;
  const TO_X_PERCENT = -600;
  const IMAGE_SHIFT_X_MAX = 24;
  const IMAGE_SHIFT_MIN_VELOCITY = 12;
  const FORCE_TO_IMAGE_SHIFT_X = 0.05;
  const IMAGE_SHIFT_SMOOTH_DURATION = 0.4;
  const FORCE_EFFECT_SUPPRESS_AFTER_WRAP_MS = 90;

  /* =============================== */

  let ctx: gsap.Context | null = null;
  let loopTimelineSpacing = DEFAULT_LOOP_TIMELINE_SPACING;
  let scrubToLoop: ((totalTime: number) => void) | null = null;
  let getCurrentTime: (() => number) | null = null;
  let initFrameId: number | null = null;
  let removeEdgeWheelListener: (() => void) | null = null;

  function getCards() {
    if (options.getCards) return options.getCards();

    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);
  }

  function getImages() {
    if (options.getImages) return options.getImages();

    return Array.from(
      options.cardsRef.value?.querySelectorAll<HTMLImageElement>("[data-work-image]") ?? [],
    );
  }

  function getTimelineSpacingFromGap(cardWidthPx: number, gapPx: number) {
    const safeCardWidth = Math.max(cardWidthPx, 1);
    const safeGap = Math.max(gapPx, 0);
    const travelPercent = Math.abs(TO_X_PERCENT - FROM_X_PERCENT);
    if (travelPercent <= 0 || MOVE_DURATION <= 0) return DEFAULT_LOOP_TIMELINE_SPACING;

    const requiredOffsetPx = safeCardWidth + safeGap;
    const requiredOffsetPercent = (requiredOffsetPx / safeCardWidth) * 100;
    const velocityPercentPerTimeUnit = travelPercent / MOVE_DURATION;

    return Math.max(0.001, requiredOffsetPercent / velocityPercentPerTimeUnit);
  }

  function cancelScheduledInit() {
    if (initFrameId === null || typeof window === "undefined") return;
    cancelAnimationFrame(initFrameId);
    initFrameId = null;
  }

  function cleanupLoopContext() {
    removeEdgeWheelListener?.();
    removeEdgeWheelListener = null;
    ctx?.revert();
    ctx = null;
    scrubToLoop = null;
    getCurrentTime = null;
  }

  function cleanup() {
    cancelScheduledInit();
    cleanupLoopContext();
  }

  function cleanupForRouteLeave() {
    cancelScheduledInit();
    removeEdgeWheelListener?.();
    removeEdgeWheelListener = null;
    $gsap.set(getImages(), { x: 0 });
    ctx?.kill(false);
    ctx = null;
    scrubToLoop = null;
    getCurrentTime = null;
  }

  function getSnappedIndex(totalTime: number, itemsCount: number) {
    const rawIndex = Math.round(totalTime / loopTimelineSpacing);
    return ((rawIndex % itemsCount) + itemsCount) % itemsCount;
  }

  function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;

    const rawSequence = $gsap.timeline({ paused: true });

    const seamlessLoop = $gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        if (this._time === this._dur) {
          this._tTime += this._dur - 0.01;
        }
      },
    });

    const totalAnimations = items.length + overlap * 2;

    $gsap.set(items, { xPercent: INITIAL_X_PERCENT });

    for (let i = 0; i < totalAnimations; i += 1) {
      const index = i % items.length;
      const item = items[index];
      if (!item) continue;

      const time = i * spacing;

      rawSequence.fromTo(
        item,
        { xPercent: FROM_X_PERCENT },
        {
          xPercent: TO_X_PERCENT,
          duration: MOVE_DURATION,
          ease: "none",
          immediateRender: false,
        },
        time,
      );

      if (i <= items.length) {
        seamlessLoop.add(`label${i}`, time);
      }
    }

    rawSequence.time(startTime);

    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none",
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: "none",
        },
      );

    return seamlessLoop;
  }

  function init() {
    if (!options.galleryRef.value || !options.cardsRef.value) return;

    cleanupLoopContext();

    ctx = $gsap.context(() => {
      const cards = getCards();
      if (!cards.length) return;
      const cardGapPx =
        typeof options.cardGapPx === "number" ? options.cardGapPx : DEFAULT_CARD_GAP_PX;
      const cardWidth = cards[0]?.getBoundingClientRect().width ?? 0;
      loopTimelineSpacing = getTimelineSpacingFromGap(cardWidth, cardGapPx);
      const scrollDistance =
        typeof options.scrollDistancePx === "number" && options.scrollDistancePx > 0
          ? options.scrollDistancePx
          : DEFAULT_SCROLL_DISTANCE;
      const images = getImages();
      const setImagesShiftX = $gsap.quickTo(images, "x", {
        duration: IMAGE_SHIFT_SMOOTH_DURATION,
        ease: "power2.out",
        overwrite: true,
      });
      const applyScrollForceImageShift = (force: number) => {
        if (Math.abs(force) < IMAGE_SHIFT_MIN_VELOCITY) {
          setImagesShiftX(0);
          return;
        }

        const clampedShift = $gsap.utils.clamp(
          -IMAGE_SHIFT_X_MAX,
          IMAGE_SHIFT_X_MAX,
          force * FORCE_TO_IMAGE_SHIFT_X,
        );

        setImagesShiftX(clampedShift);
      };
      const resetImagesShift = () => {
        setImagesShiftX(0);
      };
      const getNow = () => (typeof performance !== "undefined" ? performance.now() : Date.now());
      let suppressForceEffectUntil = 0;
      const suppressForceEffect = () => {
        suppressForceEffectUntil = getNow() + FORCE_EFFECT_SUPPRESS_AFTER_WRAP_MS;
        resetImagesShift();
      };

      const syncSnappedIndex = (totalTime: number) => {
        const snappedIndex = getSnappedIndex(totalTime, cards.length);
        options.onSnappedIndexChange?.(snappedIndex);
        return snappedIndex;
      };
      const syncVisualIndex = (totalTime: number) => {
        const rawIndex = totalTime / loopTimelineSpacing;
        const wrappedIndex = ((rawIndex % cards.length) + cards.length) % cards.length;
        options.onVisualIndexChange?.(wrappedIndex);
      };
      const wrapCardIndex = (index: number) =>
        ((index % cards.length) + cards.length) % cards.length;
      const getCenteredCardIndex = (totalTime: number) => getSnappedIndex(totalTime, cards.length);
      const maybeEmitCenterPass = (
        previousCenteredIndex: number,
        currentCenteredIndex: number,
        direction: number,
        isUserScrollUpdate: boolean,
      ) => {
        if (previousCenteredIndex === currentCenteredIndex || !isUserScrollUpdate) {
          return currentCenteredIndex;
        }

        const stepDirection = direction >= 0 ? 1 : -1;
        let nextCenteredIndex = previousCenteredIndex;
        let safety = 0;

        while (nextCenteredIndex !== currentCenteredIndex && safety < cards.length) {
          nextCenteredIndex = wrapCardIndex(nextCenteredIndex + stepDirection);
          options.onCenterPass?.(nextCenteredIndex);
          safety += 1;
        }

        return nextCenteredIndex;
      };

      let iteration = 0;
      let skipProgrammaticUpdate = false;
      let lastCenteredIndex = 0;

      const snap = $gsap.utils.snap(loopTimelineSpacing);
      const seamlessLoop = buildSeamlessLoop(cards, loopTimelineSpacing);

      const scrub = $gsap.to(seamlessLoop, {
        totalTime: 0,
        duration: SCRUB_DURATION,
        ease: SCRUB_EASE,
        paused: true,
      });

      const wrapForward = (activeTrigger: ScrollTriggerInstance) => {
        iteration += 1;
        activeTrigger.wrapping = true;
        suppressForceEffect();
        activeTrigger.scroll(activeTrigger.start + 1);
      };

      const wrapBackward = (activeTrigger: ScrollTriggerInstance) => {
        iteration -= 1;

        if (iteration < 0) {
          iteration = 9;
          seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
          scrub.pause();
        }

        activeTrigger.wrapping = true;
        suppressForceEffect();
        activeTrigger.scroll(activeTrigger.end - 1);
      };

      let trigger: ScrollTriggerInstance | null = null;

      const scrubTo = (totalTime: number) => {
        if (!trigger) return;

        const progress =
          (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();

        if (progress > 1) wrapForward(trigger);
        else if (progress < 0) wrapBackward(trigger);
        else {
          const range = Math.max(trigger.end - trigger.start, 1);
          const edgeProgress = EDGE_SCROLL_OFFSET / range;
          const safeProgress = $gsap.utils.clamp(edgeProgress, 1 - edgeProgress, progress);

          skipProgrammaticUpdate = true;
          suppressForceEffect();
          trigger.scroll(trigger.start + safeProgress * range);
          syncVisualIndex(totalTime);
          lastCenteredIndex = getCenteredCardIndex(totalTime);
        }
      };

      const snapCall = $gsap
        .delayedCall(SNAP_DELAY, () => {
          if (!trigger) return;

          const rawTotalTime = (iteration + trigger.progress) * seamlessLoop.duration();

          const snappedTotalTime = snap(rawTotalTime);

          scrub.vars.totalTime = snappedTotalTime;
          scrub.invalidate().restart();

          const snappedIndex = syncSnappedIndex(snappedTotalTime);
          options.onSnap?.(snappedIndex);
          syncVisualIndex(snappedTotalTime);
          resetImagesShift();
          options.onScrollActivityChange?.(false);
          scrubTo(snappedTotalTime);
        })
        .pause();

      trigger = $ScrollTrigger.create({
        trigger: options.galleryRef.value,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        invalidateOnRefresh: true,
        onLeave(self: ScrollTriggerInstance) {
          if (self.direction > 0 && !self.wrapping) {
            wrapForward(self);
          }
        },
        onLeaveBack(self: ScrollTriggerInstance) {
          if (self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
          }
        },
        onUpdate(self: ScrollTriggerInstance) {
          if (skipProgrammaticUpdate) {
            skipProgrammaticUpdate = false;
            self.wrapping = false;
            suppressForceEffect();
            const totalTime = (iteration + self.progress) * seamlessLoop.duration();
            syncVisualIndex(totalTime);
            lastCenteredIndex = getCenteredCardIndex(totalTime);
            return;
          }

          if (self.wrapping || getNow() < suppressForceEffectUntil) {
            resetImagesShift();
          } else {
            applyScrollForceImageShift(self.getVelocity?.() ?? 0);
          }

          const edgeProgress = EDGE_SCROLL_OFFSET / Math.max(self.end - self.start, 1);

          if (self.progress >= 1 - edgeProgress && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
            return;
          }

          if (self.progress <= edgeProgress && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
            return;
          }

          const liveTotalTime = (iteration + self.progress) * seamlessLoop.duration();
          scrub.vars.totalTime = liveTotalTime;
          scrub.invalidate().restart();

          self.wrapping = false;
          syncVisualIndex(liveTotalTime);
          lastCenteredIndex = maybeEmitCenterPass(
            lastCenteredIndex,
            getCenteredCardIndex(liveTotalTime),
            self.direction,
            true,
          );

          const velocity = Math.abs(self.getVelocity?.() ?? 0);
          if (velocity > SCROLL_ACTIVITY_VELOCITY_THRESHOLD) {
            options.onScrollActivityChange?.(true);
            snapCall.restart(true);
          }
        },
      });

      let wheelWrapLock = false;
      const onWheel = (event: WheelEvent) => {
        if (!trigger || trigger.wrapping || wheelWrapLock) return;
        if (Math.abs(event.deltaY) < 0.5) return;

        const edgeProgress = EDGE_SCROLL_OFFSET / Math.max(trigger.end - trigger.start, 1);

        if (event.deltaY < 0 && trigger.progress <= edgeProgress) {
          wheelWrapLock = true;
          snapCall.pause();
          wrapBackward(trigger);
          requestAnimationFrame(() => {
            wheelWrapLock = false;
          });
          return;
        }

        if (event.deltaY > 0 && trigger.progress >= 1 - edgeProgress) {
          wheelWrapLock = true;
          snapCall.pause();
          wrapForward(trigger);
          requestAnimationFrame(() => {
            wheelWrapLock = false;
          });
        }
      };

      window.addEventListener("wheel", onWheel, { passive: true });
      removeEdgeWheelListener = () => {
        window.removeEventListener("wheel", onWheel);
      };

      scrubToLoop = scrubTo;
      getCurrentTime = () => seamlessLoop.totalTime();
      options.onScrollActivityChange?.(false);
      syncSnappedIndex(0);
      syncVisualIndex(0);
      lastCenteredIndex = 0;
    }, options.galleryRef.value);

    $ScrollTrigger.refresh();
  }

  async function initAfterLayout() {
    await nextTick();
    if (!options.galleryRef.value || !options.cardsRef.value) return;
    init();
  }

  function stepBy(delta: number) {
    if (!scrubToLoop || !getCurrentTime) return;
    scrubToLoop(getCurrentTime() + delta);
  }

  onScopeDispose(() => cleanup());

  return {
    cleanupForRouteLeave,
    initAfterLayout,
    stepBy,
  };
}
